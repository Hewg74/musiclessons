import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import {
  Play, Pause, RotateCcw, SkipBack, Scissors, Check,
  Volume2, Mic, Headphones, Music, Piano, Guitar, Drum,
  Plus, Trash2, Share2, Undo2, ChevronDown, ChevronUp, X, Edit3, Upload
} from 'lucide-react';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from './audioKeepalive.js';
import { splitSyllables, chipText, chipGroup } from './syllableUtil.js';

// ─── Mic AudioContext helper ──────────────────────────────────────────
// Mic features use a SEPARATE AudioContext from Tone.js's playback context.
// This is critical: if the mic shares Tone's context, the browser keeps the audio
// session in "play-and-record" mode even after the mic stream is stopped (because
// the context is still alive playing the drone). A separate context lets us close
// it completely when the mic stops, which signals the OS to exit "play-and-record"
// and restore full playback quality on Bluetooth.
//
// The key to avoiding the old bugs: close the mic context IMMEDIATELY and
// SYNCHRONOUSLY when stopping — don't defer, don't try resume-then-close.
function createMicContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

// Close a mic AudioContext immediately, then signal other audio components
// to recover from OS-level ducking. The 'micReleased' event tells the drone
// to cycle Tone.js's context (suspend→resume) so the OS exits "play-and-record"
// mode and restores full playback volume on Bluetooth/speakers.
function closeMicContext(ctx) {
  if (!ctx || ctx.state === 'closed') return;
  try { ctx.close(); } catch {}
  // Fire after a tick so the context.close() has begun processing
  setTimeout(() => window.dispatchEvent(new CustomEvent('micReleased')), 50);
}

// ─── Web Worker timer for background-safe intervals ───────────────────
// Browser throttles setInterval to ~1Hz in background tabs.
// Web Worker timers are NOT throttled, so drone cycle mode stays accurate.
function createTimerWorker() {
  const blob = new Blob([`
    let tid = null;
    self.onmessage = (e) => {
      if (e.data.cmd === 'start') { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
      else if (e.data.cmd === 'stop') { clearInterval(tid); tid = null; }
      else if (e.data.cmd === 'update') { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
    };
  `], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker._blobUrl = url;
  return worker;
}
function terminateWorker(worker) {
  if (!worker) return;
  URL.revokeObjectURL(worker._blobUrl);
  worker.terminate();
}

// We'll accept the theme object `T` from App.jsx via props or just hardcode some shared colors for now.
// For simplicity, we can just pass the theme object to these components.

// --- Helper Functions & Components ---
export const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const parseTime = (str) => {
  if (!str) return 0;
  if (!str.includes(':')) return parseFloat(str) || 0;
  const parts = str.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  }
  return 0;
};

const TimeInput = ({ time, onChange, T }) => {
  const [val, setVal] = useState(formatTime(time));
  useEffect(() => { setVal(formatTime(time)); }, [time]);

  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => {
        let t = parseTime(val);
        if (isNaN(t)) t = 0;
        onChange(t);
        setVal(formatTime(t));
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') e.target.blur();
      }}
      style={{
        width: 44, background: 'transparent', border: 'none', borderBottom: `1px solid transparent`,
        color: T.textDark, fontFamily: T.sans, fontSize: 15, fontWeight: 600, textAlign: 'center', padding: "0 0 2px 0",
        outline: 'none', fontVariantNumeric: "tabular-nums", transition: "border-color 0.2s"
      }}
      onFocus={e => e.target.style.borderBottom = `1px solid ${T.gold}`}
      onBlurCapture={e => e.target.style.borderBottom = `1px solid transparent`}
    />
  );
};

// --- Desktop breakpoint hook ---
function useIsWide(breakpoint = 900) {
  const [wide, setWide] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth >= breakpoint
  );
  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setWide(e.matches);
    mq.addEventListener('change', handler);
    setWide(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return wide;
}

// --- YouTube API utilities ---
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) { resolve(); return; }
    if (document.getElementById('yt-iframe-api')) {
      const existing = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { existing?.(); resolve(); };
      return;
    }
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    window.onYouTubeIframeAPIReady = () => resolve();
    document.head.appendChild(tag);
  });
}

function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// --- Global audio mutex ---
let audioMutexId = 0;
function claimAudioMutex() {
  const id = ++audioMutexId;
  window.dispatchEvent(new CustomEvent("audioSourceChange", { detail: { id } }));
  return id;
}

// --- YouTube Audio Player Component ---
export function YouTubeAudioPlayer({ videoId, theme: T, title }) {
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const mutexIdRef = useRef(null);
  const syncRafRef = useRef(null);
  const isWide = useIsWide(900);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [showLoopSettings, setShowLoopSettings] = useState(false);

  // Initialize loopEnd when duration loads
  useEffect(() => {
    if (duration > 0 && loopEnd === 0) setLoopEnd(duration);
  }, [duration, loopEnd]);

  // Load YouTube API and create player
  // IMPORTANT: The YT.Player constructor replaces its target element with an iframe.
  // We must create the target div imperatively so React doesn't track it — otherwise
  // React's removeChild crashes when it can't find the original div.
  useEffect(() => {
    if (!videoId || !wrapperRef.current) return;
    let destroyed = false;
    setError(null);
    setIsReady(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    // Create a disposable div for the YT API — React never sees this node
    const ytTarget = document.createElement('div');
    wrapperRef.current.appendChild(ytTarget);

    loadYouTubeAPI().then(() => {
      if (destroyed) return;
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
      }
      playerRef.current = new window.YT.Player(ytTarget, {
        videoId,
        width: 1,
        height: 1,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1 },
        events: {
          onReady: (e) => {
            if (destroyed) return;
            const dur = e.target.getDuration();
            setDuration(dur);
            setLoopEnd(prev => prev === 0 ? dur : prev);
            setIsReady(true);
          },
          onStateChange: (e) => {
            if (destroyed) return;
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
          },
          onError: (e) => {
            if (destroyed) return;
            const codes = { 2: "Invalid video ID", 5: "Video not supported in HTML5", 100: "Video not found or removed", 101: "Embedding disabled by owner", 150: "Embedding disabled by owner" };
            setError(codes[e.data] || "Playback error");
          }
        }
      });
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(syncRafRef.current);
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
      // Clean up any leftover DOM nodes the YT API created
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = '';
      }
    };
  }, [videoId]);

  // Audio mutex — stop if another source claims
  useEffect(() => {
    const handler = (e) => {
      if (mutexIdRef.current && e.detail.id !== mutexIdRef.current) {
        if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
          try { playerRef.current.pauseVideo(); } catch {}
        }
        setIsPlaying(false);
      }
    };
    window.addEventListener("audioSourceChange", handler);
    return () => window.removeEventListener("audioSourceChange", handler);
  }, []);

  // rAF sync loop — dispatch songTimeUpdate events
  useEffect(() => {
    const dispatch = () => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const ct = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration() || duration;

        // Enforce loop boundary
        if (isLooping && loopEnd > 0 && ct >= loopEnd) {
          playerRef.current.seekTo(loopStart, true);
        }

        setCurrentTime(ct);
        if (dur > 0) setProgress(ct / dur);

        window.dispatchEvent(new CustomEvent("songTimeUpdate", {
          detail: { currentTime: ct, isLooping, loopStart, loopEnd, playing: true }
        }));
      }
      syncRafRef.current = requestAnimationFrame(dispatch);
    };
    if (isPlaying) {
      syncRafRef.current = requestAnimationFrame(dispatch);
    } else {
      cancelAnimationFrame(syncRafRef.current);
      window.dispatchEvent(new CustomEvent("songTimeUpdate", { detail: { playing: false } }));
    }
    return () => cancelAnimationFrame(syncRafRef.current);
  }, [isPlaying, isLooping, loopStart, loopEnd, duration]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      // Claim audio mutex
      mutexIdRef.current = claimAudioMutex();
      playerRef.current.playVideo();
    }
  };

  const handleScrub = (e) => {
    if (!playerRef.current || !isReady || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newProgress * duration;
    playerRef.current.seekTo(newTime, true);
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const skipBack = () => {
    if (!playerRef.current || !isReady) return;
    let newTime = Math.max(0, (playerRef.current.getCurrentTime() || 0) - 10);
    if (isLooping && newTime < loopStart) newTime = loopStart;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const resetSong = () => {
    if (!playerRef.current || !isReady) return;
    const startT = isLooping ? loopStart : 0;
    playerRef.current.seekTo(startT, true);
    setCurrentTime(startT);
    if (!isPlaying) togglePlay();
  };

  const setBoundary = (type) => {
    if (!playerRef.current || !isReady) return;
    const current = playerRef.current.getCurrentTime();
    if (type === 'A') {
      setLoopStart(Math.max(0, Math.min(current, loopEnd - 1)));
    } else {
      setLoopEnd(Math.max(loopStart + 1, Math.min(current, duration)));
    }
  };

  const nudgeBoundary = (type, amount) => {
    if (type === 'A') {
      setLoopStart(prev => Math.max(0, Math.min(prev + amount, loopEnd - 0.5)));
    } else {
      setLoopEnd(prev => Math.max(loopStart + 0.5, Math.min(prev + amount, duration)));
    }
  };

  // Apply speed
  useEffect(() => {
    if (playerRef.current && isReady && typeof playerRef.current.setPlaybackRate === 'function') {
      try { playerRef.current.setPlaybackRate(speed); } catch {}
    }
  }, [speed, isReady]);

  // Error state — show message + link
  if (error) {
    return (
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        borderRadius: T.radiusMd, padding: "14px 16px", marginBottom: 12,
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <div style={{ fontSize: 12, color: T.coral, fontFamily: T.sans, fontWeight: 600 }}>
          YouTube: {error}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11, color: T.gold, fontFamily: T.sans, fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Open in YouTube
        </a>
      </div>
    );
  }

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: T.radiusMd, padding: "14px 16px", marginBottom: 12,
      display: "flex", flexDirection: "column", gap: 12,
      boxShadow: "0 2px 8px rgba(44,40,37,0.03)"
    }}>
      {/* Hidden YouTube player — wrapper ref only, inner div created imperatively */}
      <div ref={wrapperRef} style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={togglePlay} disabled={!isReady} style={{
          background: isPlaying ? "transparent" : (isReady ? T.gold : T.borderSoft),
          border: isPlaying ? `1px solid ${T.gold}` : "none",
          cursor: isReady ? "pointer" : "default",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: "50%",
          boxShadow: isPlaying ? "none" : (isReady ? `0 4px 12px ${T.gold}30` : "none"),
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          color: isPlaying ? T.gold : "#fff",
          opacity: isReady ? 1 : 0.5,
        }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />}
        </button>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.textDark, fontFamily: T.sans }}>{title}</div>}
          {!isReady && <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>Loading YouTube...</div>}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(currentTime)}
            </span>

            <div
              onPointerDown={(e) => {
                handleScrub(e);
                const onMove = (moveEvent) => handleScrub(moveEvent);
                const onUp = () => {
                  window.removeEventListener('pointermove', onMove);
                  window.removeEventListener('pointerup', onUp);
                };
                window.addEventListener('pointermove', onMove);
                window.addEventListener('pointerup', onUp);
              }}
              style={{ flex: 1, height: 24, display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <div style={{ width: "100%", height: 3, background: T.border, borderRadius: 2, position: "relative" }}>
                {isLooping && duration > 0 && (
                  <div style={{
                    position: "absolute", left: `${(loopStart / duration) * 100}%`, right: `${100 - (loopEnd / duration) * 100}%`,
                    top: -2, bottom: -2, background: T.gold, opacity: 0.2, borderRadius: 2
                  }} />
                )}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${progress * 100}%`, background: isLooping ? T.textMed : T.gold, borderRadius: 2
                }} />
                <div style={{
                  position: "absolute", top: "50%", left: `${progress * 100}%`,
                  width: 10, height: 10, borderRadius: "50%", background: isLooping ? T.textDark : T.gold,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
                }} />
              </div>
            </div>

            <span style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right side controls + Speed on desktop */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {isWide && isReady && (
            <>
              {[0.5, 0.75, 1].map(s => (
                <button key={s} onClick={() => setSpeed(s)} style={{
                  fontSize: 10, padding: "4px 8px", borderRadius: T.radius, cursor: "pointer",
                  fontWeight: 700, fontFamily: T.sans,
                  background: speed === s ? T.gold : T.bgSoft,
                  color: speed === s ? "#fff" : T.textMed,
                  border: `1px solid ${speed === s ? T.gold : T.border}`,
                  transition: "all 0.15s",
                }}>{s}x</button>
              ))}
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
            </>
          )}
          <button onClick={() => setShowLoopSettings(!showLoopSettings)} title="Loop Settings" style={{
            background: isLooping || showLoopSettings ? T.bgSoft : "transparent",
            border: `1px solid ${isLooping ? T.gold : showLoopSettings ? T.border : "transparent"}`,
            color: isLooping || showLoopSettings ? T.gold : T.textMed, cursor: "pointer",
            padding: 6, borderRadius: T.radius, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            marginLeft: 4
          }}>
            <Scissors size={18} />
          </button>
        </div>
      </div>

      {/* Speed Control — mobile only */}
      {!isWide && isReady && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans, marginRight: 2 }}>Speed:</span>
          {[0.5, 0.75, 1].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              fontSize: 10, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans,
              background: speed === s ? T.gold : T.bgSoft,
              color: speed === s ? "#fff" : T.textMed,
              border: `1px solid ${speed === s ? T.gold : T.border}`,
              transition: "all 0.15s",
            }}>{s}x</button>
          ))}
        </div>
      )}

      {/* Loop Settings */}
      {showLoopSettings && (
        <div style={{
          borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12, marginTop: -4,
          display: "flex", flexDirection: "column", gap: isWide ? 8 : 12,
          animation: 'fade-in-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          {isWide ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.textDark, fontFamily: T.sans, flexShrink: 0 }}>A/B Loop</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={skipBack} title="Rewind 10s" style={trayNavBtnStyle(T)}><SkipBack size={14} /></button>
                <button onClick={resetSong} title="Restart" style={trayNavBtnStyle(T)}><RotateCcw size={14} /></button>
              </div>
              <button onClick={() => setIsLooping(!isLooping)} style={{
                background: isLooping ? T.success : T.border, border: "none",
                width: 36, height: 20, borderRadius: 10, position: "relative",
                cursor: "pointer", transition: "background 0.3s ease", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", top: 2, left: isLooping ? 18 : 2,
                  width: 16, height: 16, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                }} />
              </button>
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>A</span>
                <TimeInput time={loopStart} onChange={(t) => { let s = Math.max(0, t); if (s >= loopEnd) s = Math.max(0, loopEnd - 1); setLoopStart(s); }} T={T} />
                <button onClick={() => nudgeBoundary('A', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                <button onClick={() => nudgeBoundary('A', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                <button onClick={() => setBoundary('A')} style={setBtnStyle(T)}>Set</button>
              </div>
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>B</span>
                <TimeInput time={loopEnd} onChange={(t) => { let e = Math.min(duration, t); if (e <= loopStart) e = Math.min(duration, loopStart + 1); setLoopEnd(e); }} T={T} />
                <button onClick={() => nudgeBoundary('B', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                <button onClick={() => nudgeBoundary('B', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                <button onClick={() => setBoundary('B')} style={setBtnStyle(T)}>Set</button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.textDark, fontFamily: T.sans }}>A/B Loop Mode</span>
                  <div style={{ display: "flex", gap: 6, paddingLeft: 12, borderLeft: `1px solid ${T.borderSoft}` }}>
                    <button onClick={skipBack} title="Rewind 10s" style={trayNavBtnStyle(T)}
                      onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                      onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                    ><SkipBack size={14} /></button>
                    <button onClick={resetSong} title="Restart" style={trayNavBtnStyle(T)}
                      onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                      onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                    ><RotateCcw size={14} /></button>
                  </div>
                </div>
                <button onClick={() => setIsLooping(!isLooping)} style={{
                  background: isLooping ? T.success : T.border, border: "none",
                  width: 44, height: 24, borderRadius: 12, position: "relative",
                  cursor: "pointer", transition: "background 0.3s ease"
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: isLooping ? 22 : 2,
                    width: 20, height: 20, borderRadius: "50%", background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  }} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>Start (A)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TimeInput time={loopStart} onChange={(t) => { let s = Math.max(0, t); if (s >= loopEnd) s = Math.max(0, loopEnd - 1); setLoopStart(s); }} T={T} />
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => nudgeBoundary('A', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                      <button onClick={() => nudgeBoundary('A', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                      <button onClick={() => setBoundary('A')} style={setBtnStyle(T)}>Set</button>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>End (B)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TimeInput time={loopEnd} onChange={(t) => { let e = Math.min(duration, t); if (e <= loopStart) e = Math.min(duration, loopStart + 1); setLoopEnd(e); }} T={T} />
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => nudgeBoundary('B', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                      <button onClick={() => nudgeBoundary('B', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                      <button onClick={() => setBoundary('B')} style={setBtnStyle(T)}>Set</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// --- Custom Audio Player Component ---
export function MiniAudioPlayer({ src, theme: T, title, playbackRate = 1 }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const mutexIdRef = useRef(null);
  const isWide = useIsWide(900);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const syncRafRef = useRef(null);

  // Looping state — declared before effects that reference them
  const [isLooping, setIsLooping] = useState(false);
  const [showLoopSettings, setShowLoopSettings] = useState(false);
  const [loopStart, setLoopStart] = useState(0); // seconds
  const [loopEnd, setLoopEnd] = useState(0); // seconds

  // Audio mutex — stop if another source claims
  useEffect(() => {
    const handler = (e) => {
      if (mutexIdRef.current && e.detail.id !== mutexIdRef.current) {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("audioSourceChange", handler);
    return () => window.removeEventListener("audioSourceChange", handler);
  }, []);

  // Initialize loopEnd when duration loads
  useEffect(() => {
    if (duration > 0 && loopEnd === 0) setLoopEnd(duration);
  }, [duration, loopEnd]);

  // Apply playback rate when speed or prop changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed * playbackRate;
    }
  }, [playbackRate, speed]);

  // rAF-based songTimeUpdate dispatch for smooth audio sync
  useEffect(() => {
    const dispatchSync = () => {
      if (audioRef.current && !audioRef.current.paused) {
        window.dispatchEvent(new CustomEvent("songTimeUpdate", {
          detail: {
            currentTime: audioRef.current.currentTime,
            isLooping, loopStart, loopEnd,
            playing: true
          }
        }));
        syncRafRef.current = requestAnimationFrame(dispatchSync);
      }
    };
    if (isPlaying) {
      syncRafRef.current = requestAnimationFrame(dispatchSync);
    } else {
      cancelAnimationFrame(syncRafRef.current);
      window.dispatchEvent(new CustomEvent("songTimeUpdate", { detail: { playing: false } }));
    }
    return () => cancelAnimationFrame(syncRafRef.current);
  }, [isPlaying, isLooping, loopStart, loopEnd]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Stop any other audio sources (including YouTube players) via mutex
        mutexIdRef.current = claimAudioMutex();
        // Also stop other <audio> elements
        document.querySelectorAll('audio').forEach(a => {
          if (a !== audioRef.current && !a.paused) a.pause();
        });
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      let current = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 0;

      // Enforce loop boundary
      if (isLooping && loopEnd > 0 && current >= loopEnd) {
        audioRef.current.currentTime = loopStart;
        current = loopStart;
      }

      setCurrentTime(current);
      if (dur > 0) setProgress(current / dur);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleScrub = (e) => {
    if (progressRef.current && audioRef.current && duration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
      let newTime = newProgress * duration;

      // If looping, ensure scrub doesn't break out of bounds if they click outside (optional strictness, but let's allow jumping anywhere, it will simply loop back if it passes end)
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
      setCurrentTime(newTime);
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      let newTime = Math.max(0, audioRef.current.currentTime - 10);
      if (isLooping && newTime < loopStart) newTime = loopStart;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const resetSong = () => {
    if (audioRef.current) {
      const startT = isLooping ? loopStart : 0;
      audioRef.current.currentTime = startT;
      setCurrentTime(startT);
      if (!isPlaying) togglePlay(); // Auto-play on reset
    }
  };

  const setBoundary = (type) => { // type: 'A' or 'B'
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    if (type === 'A') {
      const newStart = Math.max(0, Math.min(current, loopEnd - 1)); // At least 1s gap
      setLoopStart(newStart);
      if (current < newStart) audioRef.current.currentTime = newStart;
    } else {
      const newEnd = Math.max(loopStart + 1, Math.min(current, duration));
      setLoopEnd(newEnd);
      if (current > newEnd) audioRef.current.currentTime = loopStart;
    }
  };

  const nudgeBoundary = (type, amount) => {
    if (type === 'A') {
      setLoopStart(prev => Math.max(0, Math.min(prev + amount, loopEnd - 0.5)));
    } else {
      setLoopEnd(prev => Math.max(loopStart + 0.5, Math.min(prev + amount, duration)));
    }
  };

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: T.radiusMd, padding: "14px 16px", marginBottom: 12,
      display: "flex", flexDirection: "column", gap: 12,
      boxShadow: "0 2px 8px rgba(44,40,37,0.03)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />

        <button onClick={togglePlay} style={{
          background: isPlaying ? "transparent" : T.gold, 
          border: isPlaying ? `1px solid ${T.gold}` : "none",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: "50%",
          boxShadow: isPlaying ? "none" : `0 4px 12px ${T.gold}30`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          color: isPlaying ? T.gold : "#fff"
        }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: 2 }} />}
        </button>

        {/* Main Track Info & Scrub */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.textDark, fontFamily: T.sans }}>{title}</div>}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(currentTime)}
            </span>

            {/* Thick hit area wrapper for easy scrubbing */}
            <div
              ref={progressRef}
              onPointerDown={(e) => {
                handleScrub(e);
                const onMove = (moveEvent) => handleScrub(moveEvent);
                const onUp = () => {
                  window.removeEventListener('pointermove', onMove);
                  window.removeEventListener('pointerup', onUp);
                };
                window.addEventListener('pointermove', onMove);
                window.addEventListener('pointerup', onUp);
              }}
              style={{
                flex: 1, height: 24, display: "flex", alignItems: "center", cursor: "pointer"
              }}
            >
              {/* Visual thin track */}
              <div style={{ width: "100%", height: 3, background: T.border, borderRadius: 2, position: "relative" }}>
                {/* Loop Region Highlight */}
                {isLooping && duration > 0 && (
                  <div style={{
                    position: "absolute", left: `${(loopStart / duration) * 100}%`, right: `${100 - (loopEnd / duration) * 100}%`,
                    top: -2, bottom: -2, background: T.gold, opacity: 0.2, borderRadius: 2
                  }} />
                )}
                {/* Visual progress fill */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: `${progress * 100}%`, background: isLooping ? T.textMed : T.gold, borderRadius: 2
                }} />
                {/* Playhead dot */}
                <div style={{
                  position: "absolute", top: "50%", left: `${progress * 100}%`,
                  width: 10, height: 10, borderRadius: "50%", background: isLooping ? T.textDark : T.gold,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
                }} />
              </div>
            </div>

            <span style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Inline Transport Controls (Right Side) + Speed on desktop */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {isWide && duration > 0 && (
            <>
              {[0.5, 0.75, 1].map(s => (
                <button key={s} onClick={() => setSpeed(s)} style={{
                  fontSize: 10, padding: "4px 8px", borderRadius: T.radius, cursor: "pointer",
                  fontWeight: 700, fontFamily: T.sans,
                  background: speed === s ? T.gold : T.bgSoft,
                  color: speed === s ? "#fff" : T.textMed,
                  border: `1px solid ${speed === s ? T.gold : T.border}`,
                  transition: "all 0.15s",
                }}>{s}x</button>
              ))}
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
            </>
          )}
          <button onClick={() => setShowLoopSettings(!showLoopSettings)} title="Loop Settings" style={{
            background: isLooping || showLoopSettings ? T.bgSoft : "transparent",
            border: `1px solid ${isLooping ? T.gold : showLoopSettings ? T.border : "transparent"}`,
            color: isLooping || showLoopSettings ? T.gold : T.textMed, cursor: "pointer",
            padding: 6, borderRadius: T.radius, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            marginLeft: 4
          }}>
            <Scissors size={18} />
          </button>
        </div>
      </div>

      {/* Speed Control — mobile only (on desktop it's inline above) */}
      {!isWide && duration > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans, marginRight: 2 }}>Speed:</span>
          {[0.5, 0.75, 1].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              fontSize: 10, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans,
              background: speed === s ? T.gold : T.bgSoft,
              color: speed === s ? "#fff" : T.textMed,
              border: `1px solid ${speed === s ? T.gold : T.border}`,
              transition: "all 0.15s",
            }}>{s}x</button>
          ))}
        </div>
      )}

      {/* Expandable Loop Tray */}
      {showLoopSettings && (
        <div style={{
          borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12, marginTop: -4,
          display: "flex", flexDirection: "column", gap: isWide ? 8 : 12,
          animation: 'fade-in-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          {/* Desktop: all on one row — Label + transport + toggle + A/B boundaries */}
          {isWide ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.textDark, fontFamily: T.sans, flexShrink: 0 }}>A/B Loop</span>
              <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                <button onClick={skipBack} title="Rewind 10s" style={trayNavBtnStyle(T)}><SkipBack size={14} /></button>
                <button onClick={resetSong} title="Restart" style={trayNavBtnStyle(T)}><RotateCcw size={14} /></button>
              </div>
              <button onClick={() => setIsLooping(!isLooping)} style={{
                background: isLooping ? T.success : T.border, border: "none",
                width: 36, height: 20, borderRadius: 10, position: "relative",
                cursor: "pointer", transition: "background 0.3s ease", flexShrink: 0,
              }}>
                <div style={{
                  position: "absolute", top: 2, left: isLooping ? 18 : 2,
                  width: 16, height: 16, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                }} />
              </button>
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>A</span>
                <TimeInput time={loopStart} onChange={(t) => { let s = Math.max(0, t); if (s >= loopEnd) s = Math.max(0, loopEnd - 1); setLoopStart(s); }} T={T} />
                <button onClick={() => nudgeBoundary('A', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                <button onClick={() => nudgeBoundary('A', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                <button onClick={() => setBoundary('A')} style={setBtnStyle(T)}>Set</button>
              </div>
              <div style={{ width: 1, height: 18, background: T.borderSoft, flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>B</span>
                <TimeInput time={loopEnd} onChange={(t) => { let e = Math.min(duration, t); if (e <= loopStart) e = Math.min(duration, loopStart + 1); setLoopEnd(e); }} T={T} />
                <button onClick={() => nudgeBoundary('B', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                <button onClick={() => nudgeBoundary('B', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                <button onClick={() => setBoundary('B')} style={setBtnStyle(T)}>Set</button>
              </div>
            </div>
          ) : (
            /* Mobile: original stacked layout */
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.textDark, fontFamily: T.sans }}>A/B Loop Mode</span>
                  <div style={{ display: "flex", gap: 6, paddingLeft: 12, borderLeft: `1px solid ${T.borderSoft}` }}>
                    <button onClick={skipBack} title="Rewind 10s" style={trayNavBtnStyle(T)}
                      onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                      onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                    ><SkipBack size={14} /></button>
                    <button onClick={resetSong} title="Restart" style={trayNavBtnStyle(T)}
                      onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                      onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                    ><RotateCcw size={14} /></button>
                  </div>
                </div>
                <button onClick={() => setIsLooping(!isLooping)} style={{
                  background: isLooping ? T.success : T.border, border: "none",
                  width: 44, height: 24, borderRadius: 12, position: "relative",
                  cursor: "pointer", transition: "background 0.3s ease"
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: isLooping ? 22 : 2,
                    width: 20, height: 20, borderRadius: "50%", background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  }} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>Start (A)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TimeInput time={loopStart} onChange={(t) => { let s = Math.max(0, t); if (s >= loopEnd) s = Math.max(0, loopEnd - 1); setLoopStart(s); }} T={T} />
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => nudgeBoundary('A', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                      <button onClick={() => nudgeBoundary('A', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                      <button onClick={() => setBoundary('A')} style={setBtnStyle(T)}>Set</button>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>End (B)</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TimeInput time={loopEnd} onChange={(t) => { let e = Math.min(duration, t); if (e <= loopStart) e = Math.min(duration, loopStart + 1); setLoopEnd(e); }} T={T} />
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button onClick={() => nudgeBoundary('B', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                      <button onClick={() => nudgeBoundary('B', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                      <button onClick={() => setBoundary('B')} style={setBtnStyle(T)}>Set</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}

const nudgeBtnStyle = (T) => ({
  background: T.borderSoft, border: "none", color: T.textMed,
  width: 20, height: 20, borderRadius: 4, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600
});

const setBtnStyle = (T) => ({
  background: T.gold, color: "#fff", border: "none",
  padding: "2px 8px", borderRadius: 4, cursor: "pointer",
  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.sans
});

const trayNavBtnStyle = (T) => ({
  background: T.borderSoft, border: `1px solid ${T.borderSoft}`, color: T.textDark, cursor: "pointer",
  width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
  transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
});

// --- 1. Audio Player ---
export function AudioPlayer({ theme: T }) {
  const tracks = [
    { id: 'surf', name: 'Surf Rock Beat 120 BPM', src: '/surf-rock-120.mp3' },
    { id: 'groove', name: 'Groove Beat 90 BPM', src: '/groove-beat-90.mp3' },
    { id: 'psych', name: 'Psych Rock Beat 120 BPM', src: '/psych-rock-120.mp3' },
    { id: 'reggae', name: 'Reggae One Drop 85 BPM', src: '/reggae-one-drop-85.mp3' },
    { id: 'dub', name: 'Dub Reggae 85 BPM', src: '/dub-reggae-85.mp3' },
    { id: 'desert', name: 'Desert Blues 75 BPM', src: '/desert-blues-75.mp3' },
    { id: 'khruangbin', name: 'Khruangbin Style 80 BPM', src: '/khruangbin-style-80.mp3' },
    { id: 'western', name: 'Cinematic Western 80 BPM', src: '/cinematic-western-80.mp3' },
    { id: 'deepsoul', name: 'Deep Soul Groove 80 BPM', src: '/deep-soul-groove-80.mp3' },
    { id: 'soulfunk', name: 'Soul Funk Groove 90 BPM', src: '/soul-funk-groove-90.mp3' },
    { id: 'reggaerock', name: 'Reggae Rock 100 BPM', src: '/reggae-rock-100.mp3' },
    { id: 'bossanova', name: 'Bossa Nova 75 BPM', src: '/bossa-nova-75.mp3' },
    { id: 'afrobeat', name: 'Afrobeat 100 BPM', src: '/afrobeat-100.mp3' },
    { id: 'ska', name: 'Ska Upbeat 95 BPM', src: '/ska-upbeat-95.mp3' },
    { id: 'drumsReggae', name: 'Drums Only — Reggae 85 BPM', src: '/drums-reggae-85.mp3' },
    { id: 'drumsBossa', name: 'Drums Only — Bossa Nova 75 BPM', src: '/drums-bossa-75.mp3' },
    { id: 'drumsSoulFunk', name: 'Drums Only — Soul Funk 90 BPM', src: '/drums-soul-funk-90.mp3' },
    { id: 'drumsSurf', name: 'Drums Only — Surf Rock 120 BPM', src: '/drums-surf-120.mp3' },
    { id: 'drumsAfrobeat', name: 'Drums Only — Afrobeat 110 BPM', src: '/drums-afrobeat-110.mp3' },
    { id: 'soldelsur', name: 'Sol Del Sur (Original)', src: '/sol-del-sur.mp3' },
    { id: 'iltwyw', name: 'I Like The Way You Walk', src: '/iltwyw.mp3' }
  ];

  return (
    <div>
      <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 16 }}>
        Place these MP3 files in the <code>public/</code> folder. The PWA will cache them automatically for offline use.
      </p>
      {tracks.map(t => (
        <MiniAudioPlayer key={t.id} theme={T} src={t.src} title={t.name} />
      ))}
    </div>
  );
}

// --- 2. Flight Check ---
export function FlightCheck({ theme: T }) {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState([]);

  const expectedAssets = [
    '/index.html',
    '/surf-rock-120.mp3',
    '/groove-beat-90.mp3',
    '/sol-del-sur.mp3',
    '/iltwyw.mp3'
  ];

  const checkCaches = async () => {
    setStatus('checking');
    try {
      const cacheNames = await window.caches.keys();
      const logs = [];

      for (const asset of expectedAssets) {
        let found = false;
        for (const cName of cacheNames) {
          const cache = await window.caches.open(cName);
          // Check for exact match or matching pathname (ignores domain)
          const keys = await cache.keys();
          const match = keys.find(req => {
            try {
              const url = new URL(req.url);
              return url.pathname === asset || url.pathname === `/sarah-practice-plan${asset}`;
            } catch {
              return req.url.includes(asset);
            }
          });

          if (match) {
            found = true;
            break;
          }
        }
        logs.push({ asset, found });
      }
      setResults(logs);
      setStatus('done');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div>
      <p style={{ fontSize: 14, color: T.textMed, marginBottom: 16 }}>
        Verify that all media is successfully cached by the Service Worker before going off-grid.
      </p>
      <button
        onClick={checkCaches}
        style={{
          background: T.gold, color: '#fff', border: 'none', padding: '10px 20px',
          borderRadius: T.radius, cursor: 'pointer', fontFamily: T.sans, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16
        }}
      >
        {status === 'checking' ? 'Checking...' : 'Run Diagnostics'}
      </button>

      {status === 'done' && (
        <div style={{ marginTop: 12 }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: r.found ? T.success : T.coral, marginRight: 10, fontSize: 18 }}>
                {r.found ? '✅' : '❌'}
              </span>
              <span style={{ fontFamily: 'monospace', color: r.found ? T.textMed : T.coral }}>
                {r.asset}
              </span>
            </div>
          ))}
          {results.some(r => !r.found) && (
            <div style={{ marginTop: 12, fontSize: 12, color: T.coral }}>
              Warning: Some assets are missing! Ensure you have placed the files in the public folder and refreshed the app while online.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- 3. Offline Tabs & Lyrics ---
export const TAB_CONTENT = {
  soldelsur: `
Sol Del Sur - Sun Room
Standard Tuning

[Intro / Main Lead Riff]
E |---12--12--9-7-9-------------------|
B |-------------------5-7-------------|
G |-----------------------------------|
D |-----------------------------------|
A |-----------------------------------|
E |-----------------------------------|

[Rhythm Chords]
The main chord progression throughout the song is:
C#m  ->  B  ->  F#  ->  E

[Verse 1]
C#m                  B
I once heard
F#                   E
'Bout a place
C#m                  B
I want to go but there ain't steps you can retrace
F#                   E

[Verse 2]
C#m                  B
Somewhere south
F#                   E
Far away
C#m                  B
I heard the sun don't leave
F#                   E

[Chorus]
C#m    B     F#    E
It stays
And it shines
All day
All the time
Sol del Sur

[Bridge/Lead Section]
(Play the main lead riff while rhythm plays C#m B F# E)

[Verse 3]
C#m                  B
Miles from here
F#                   E
The waters blue
C#m                  B
I want to go there but the way I never knew
F#                   E

[Verse 2]
C#m                  B
Somewhere south
F#                   E
Far away
C#m                  B
I heard the sun don't leave
F#                   E

[Chorus]
C#m    B     F#    E
It stays
And it shines
All day
All the time
Sol del Sur

(Play slow and precise. Accuracy over speed. Rhythm is syncopated.)
  `,
  iltwyw: `
I Like The Way You Walk - The Donkeys
Key syncopation note: The last word of each line falls BETWEEN beats.

[Verse 1]
I like the way that you... [walk]
And all the things that you... [do]
You like honey... [dew]
Those bees are all around... [you]

[Verse 2]
You wrote a Brautigan... [letter]
Taped it on the... [mirror]
You cannot drive a... [shifter]
But you can always... [steer]

[Verse 3]
I like the way that you... [talk]
And all the things that you... [do]
You do like honey... [do]
Those bees are all around... [you]

[Outro]
There's a house on the... [hill]
I bought a Coupe de... [Ville]
We'll get out on that... [road]
With you I'm always... [home]
Ooh...

[Chorus]
'Cause I love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]

(Nod on the metronome clicks, sing the bracketed words on the UP-nod.)
  `
};

export function OfflineTabs({ theme: T }) {
  const [activeTab, setActiveTab] = useState('sol');

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button onClick={() => setActiveTab('sol')} style={{
          background: activeTab === 'sol' ? T.gold : T.bgCard,
          color: activeTab === 'sol' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radius, cursor: 'pointer'
        }}>Sol Del Sur</button>
        <button onClick={() => setActiveTab('iltwyw')} style={{
          background: activeTab === 'iltwyw' ? T.gold : T.bgCard,
          color: activeTab === 'iltwyw' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radius, cursor: 'pointer'
        }}>I Like The Way You Walk</button>
      </div>
      <pre style={{
        background: T.bgSoft, padding: 16, border: `1px solid ${T.border}`,
        borderRadius: T.radius, overflowX: 'auto', fontFamily: 'monospace', fontSize: 13,
        color: T.textDark, lineHeight: 1.5
      }}>
        {activeTab === 'sol' ? TAB_CONTENT.soldelsur.trim() : TAB_CONTENT.iltwyw.trim()}
      </pre>
    </div>
  );
}

// --- 4. Audio Recorder ---
export function AudioRecorder({ theme: T, inline = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Viz refs
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const requestRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach(t => t.stop()); // release mic
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioURL(null); // clear previous

      // Setup audio visualization — separate context so closing it exits play-and-record mode
      const audioCtx = createMicContext();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const drawWaveform = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;

        const ctx = canvas.getContext("2d");

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = T.coral;
        ctx.beginPath();

        const sliceWidth = width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * height / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        requestRef.current = requestAnimationFrame(drawWaveform);
      };

      // Start drawing immediately
      drawWaveform();

    } catch (e) {
      console.error('Microphone access denied', e);
      alert('Microphone access denied. Please allow mic permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      closeMicContext(audioCtxRef.current);
      audioCtxRef.current = null;
      analyserRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      closeMicContext(audioCtxRef.current);
      audioCtxRef.current = null;
      analyserRef.current = null;
    };
  }, []);

  return (
    <div style={inline ? { background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16 } : {}}>
      {!inline && <p style={{ fontSize: 13, color: T.textMed, marginBottom: 16 }}>
        Record yourself and listen back immediately. (Saved temporarily in memory).
      </p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: inline ? 10 : 16 }}>
        {!isRecording ? (
          <button onClick={startRecording} style={{
            background: T.coral, color: '#fff', border: 'none', padding: inline ? '8px 16px' : '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
            fontSize: inline ? 12 : 14, transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}>
            <div style={{ width: inline ? 8 : 10, height: inline ? 8 : 10, borderRadius: '50%', background: '#fff' }} />
            REC
          </button>
        ) : (
          <button onClick={stopRecording} style={{
            background: "rgba(214, 131, 131, 0.15)", color: T.coral, border: `1px solid ${T.coral}`, padding: inline ? '8px 16px' : '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
            fontSize: inline ? 12 : 14, transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}>
            <div style={{
              width: inline ? 10 : 12, height: inline ? 10 : 12, background: T.coral, borderRadius: "50%",
              boxShadow: `0 0 0 4px rgba(214, 131, 131, 0.2), 0 0 0 8px rgba(214, 131, 131, 0.1)`,
              animation: 'pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
            STOP
          </button>
        )}

        {/* We keep the canvas in the DOM so the ref is ready instantly */}
        <div style={{ display: isRecording ? 'block' : 'none', flex: 1, marginLeft: inline ? 4 : 16, height: inline ? 30 : 40 }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>

        {audioURL && inline && !isRecording && (
          <div style={{ flex: 1 }}>
            <MiniAudioPlayer theme={T} src={audioURL} />
          </div>
        )}
      </div>

      {audioURL && !inline && !isRecording && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: T.sans }}>Latest Take</div>
          <MiniAudioPlayer theme={T} src={audioURL} />
        </div>
      )}
    </div>
  );
}

// --- 5. Pitch Pipe (Tone.js) ---
export function PitchPipe({ theme: T }) {
  // Use InlineKeyboard as the Pitch Pipe
  return (
    <div>
      <p style={{ fontSize: 13, color: T.textMed, marginBottom: 24, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5 }}>
        Reference Keyboard
      </p>
      <InlineKeyboard theme={T} range={["C2", "C5"]} />
    </div>
  );
}

// --- 6. Live Pitch Detector ---
const MIN_FREQ = 70; // ~D2 — practical singing floor
const MAX_FREQ = 1050; // ~C6
const RMS_THRESHOLD = 0.01; // -40dB silence gate (research standard)
const YIN_THRESHOLD = 0.12; // CMND dip threshold — tighter = fewer false positives
const CONFIDENCE_GATE = 0.38; // Reject frames where CMND dip > this (loosened for soft singing / head voice)

function autoCorrelate(buffer, sampleRate) {
  // YIN pitch detection with confidence output
  const W = Math.floor(buffer.length / 2);
  const maxLag = Math.min(Math.floor(sampleRate / MIN_FREQ), W - 1);
  const minLag = Math.floor(sampleRate / MAX_FREQ);

  // Difference function
  const d = new Float32Array(maxLag + 1);
  d[0] = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    let sum = 0;
    for (let n = 0; n < W - tau; n++) {
      const diff = buffer[n] - buffer[n + tau];
      sum += diff * diff;
    }
    d[tau] = sum;
  }

  // Cumulative mean normalized difference (CMND)
  const dPrime = new Float32Array(maxLag + 1);
  dPrime[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    runningSum += d[tau];
    dPrime[tau] = runningSum > 0 ? d[tau] / (runningSum / tau) : 1;
  }

  // Absolute threshold — find first dip below YIN_THRESHOLD
  let bestTau = -1;
  for (let tau = minLag; tau <= maxLag; tau++) {
    if (dPrime[tau] < YIN_THRESHOLD) {
      while (tau + 1 <= maxLag && dPrime[tau + 1] < dPrime[tau]) tau++;
      bestTau = tau;
      break;
    }
  }

  if (bestTau < 0) return null;

  // Confidence gate — CMND value at best tau indicates periodicity strength
  // Lower = more periodic = higher confidence. Reject weak detections.
  const confidence = dPrime[bestTau];
  if (confidence > CONFIDENCE_GATE) return null;

  // Parabolic interpolation for sub-sample precision
  let T0 = bestTau;
  if (bestTau > 0 && bestTau < maxLag) {
    const x1 = dPrime[bestTau - 1], x2 = dPrime[bestTau], x3 = dPrime[bestTau + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = bestTau - b / (2 * a);
  }

  const freq = sampleRate / T0;
  return (freq >= MIN_FREQ && freq <= MAX_FREQ) ? freq : null;
}

function freqToMidi(freq) {
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

function midiToNoteString(midi) {
  const notes = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];
  const noteName = notes[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${noteName}${octave}`;
}

function getCentsOffset(freq, midi) {
  const targetFreq = 440 * Math.pow(2, (midi - 69) / 12);
  const cents = Math.round(1200 * Math.log2(freq / targetFreq));
  // Round to nearest 5 to reduce wobble in display
  return Math.round(cents / 5) * 5;
}

export function LivePitchDetector({ theme: T, referencePitches = [], inline = false, pitchContour = false }) {
  const [isActive, setIsActive] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [pitchState, setPitchState] = useState({
    note: '—',
    cents: 0,
    active: false,
    closestRef: null,
    refFeedback: ''
  });
  const [contourData, setContourData] = useState([]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);
  const hpFilterRef = useRef(null);
  const requestRef = useRef(null);
  const contourRef = useRef([]);
  const contourLastUpdate = useRef(0);
  const pitchBufRef = useRef(null); // Cached Float32Array to reduce GC in hot loop
  const contourRangeRef = useRef({ min: null, max: null }); // Smoothed Y-axis range for contour

  // Smoothing state
  const emaFreqRef = useRef(null);
  const lastNoteUpdateRef = useRef(Date.now());
  const stableMidiRef = useRef(null);
  const freqBufRef = useRef([]);
  const silenceStartRef = useRef(null); // Tracks silence duration for EMA hold
  const wasSilentRef = useRef(false); // For contour gap detection (push one null sentinel)

  // Auto-pause when any <audio> element plays
  useEffect(() => {
    if (!isActive) return;

    const onPlay = () => {
      setAudioPaused(true);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    const onStop = () => {
      // Only resume if no other audio is still playing
      const audios = document.querySelectorAll('audio');
      const anyPlaying = Array.from(audios).some(a => !a.paused);
      if (!anyPlaying) {
        setAudioPaused(false);
      }
    };

    document.addEventListener('play', onPlay, true);
    document.addEventListener('pause', onStop, true);
    document.addEventListener('ended', onStop, true);
    return () => {
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('pause', onStop, true);
      document.removeEventListener('ended', onStop, true);
    };
  }, [isActive]);

  // Resume pitch detection when audio stops
  useEffect(() => {
    if (isActive && !audioPaused && analyserRef.current) {
      detectPitch();
    }
  }, [audioPaused]);

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false
        }
      });
      streamRef.current = stream;

      // Separate AudioContext for mic — closing it fully exits "play-and-record"
      // mode so Bluetooth can return to high-quality A2DP playback
      const audioCtx = createMicContext();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048; // ~43ms at 48kHz — optimal for singing (lower latency than 4096)
      analyserRef.current = analyser;

      // High-pass filter at 60Hz to reject handling noise, room rumble, wind
      const hpFilter = audioCtx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.value = 60;
      hpFilter.Q.value = 0.7071; // Butterworth Q for flat passband
      hpFilterRef.current = hpFilter;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(hpFilter);
      hpFilter.connect(analyser);
      sourceRef.current = source;

      stoppedDetectionRef.current = false;
      setIsActive(true);
      emaFreqRef.current = null;
      stableMidiRef.current = null;
      lastNoteUpdateRef.current = Date.now();

      detectPitch();
    } catch (err) {
      console.error("Mic access denied or error:", err);
      alert("Could not access microphone for pitch detection. Please check permissions.");
    }
  };

  const stoppedDetectionRef = useRef(true);

  const stopDetection = () => {
    stoppedDetectionRef.current = true;
    setIsActive(false);
    setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = null;
    // Stop mic tracks — releases hardware immediately, lets Bluetooth return to A2DP
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    // Disconnect mic nodes and close the mic context immediately
    if (hpFilterRef.current) { try { hpFilterRef.current.disconnect(); } catch {} hpFilterRef.current = null; }
    if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch {} sourceRef.current = null; }
    closeMicContext(audioContextRef.current);
    audioContextRef.current = null;
    analyserRef.current = null;
    pitchBufRef.current = null;
    contourRangeRef.current = { min: null, max: null };
  };

  useEffect(() => {
    return stopDetection; // Cleanup on unmount
  }, []);

  // Stop mic when app goes to background — mic has no reason to run in background,
  // and leaving it open causes audio subsystem corruption on resume
  useEffect(() => {
    if (!isActive) return;
    const handleVisibility = () => {
      if (document.hidden) {
        // Fully stop — mic in background causes audio corruption on many mobile browsers
        stopDetection();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isActive]);

  const detectPitch = () => {
    if (!analyserRef.current) return;

    // Cached buffer to reduce GC pressure in hot loop
    const fftSize = analyserRef.current.fftSize;
    if (!pitchBufRef.current || pitchBufRef.current.length !== fftSize) {
      pitchBufRef.current = new Float32Array(fftSize);
    }
    const buffer = pitchBufRef.current;
    analyserRef.current.getFloatTimeDomainData(buffer);

    // Calculate RMS to filter out silence
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    // Shared silence handler for both "no pitch" and "RMS silence" branches
    const handleSilence = (isFullSilence) => {
      const now = Date.now();
      // Start silence timer — only reset EMA after 300ms of continuous silence
      if (!silenceStartRef.current) silenceStartRef.current = now;
      if (now - silenceStartRef.current > 300) {
        emaFreqRef.current = null;
        stableMidiRef.current = null;
      }
      // Push one null sentinel to contour on voice→silence transition
      if (pitchContour && !wasSilentRef.current) {
        contourRef.current.push({ t: now, midi: null });
        const cutoff = now - 10000;
        contourRef.current = contourRef.current.filter(p => p.t > cutoff);
        if (!contourLastUpdate.current || now - contourLastUpdate.current > 100) {
          setContourData([...contourRef.current]);
          contourLastUpdate.current = now;
        }
      }
      wasSilentRef.current = true;
      if (isFullSilence) {
        setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });
      } else {
        setPitchState(prev => ({ ...prev, active: false }));
      }
    };

    if (rms > RMS_THRESHOLD) {
      const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

      if (freq) {
        // Reset silence tracking
        silenceStartRef.current = null;
        wasSilentRef.current = false;

        // 1. Rolling median (5-sample) for outlier rejection
        freqBufRef.current.push(freq);
        if (freqBufRef.current.length > 5) freqBufRef.current.shift();
        const sorted = [...freqBufRef.current].sort((a, b) => a - b);
        const medianFreq = sorted[Math.floor(sorted.length / 2)];

        // 2. Smart-median: if raw freq deviates >1.5 semitones from median, use median
        const deviationSt = Math.abs(12 * Math.log2(freq / medianFreq));
        const cleanFreq = deviationSt > 1.5 ? medianFreq : freq;

        // 3. Octave correction — if freq is ~2x or ~0.5x the EMA, snap to correct octave
        let correctedFreq = cleanFreq;
        if (emaFreqRef.current) {
          const ratio = cleanFreq / emaFreqRef.current;
          if (ratio > 1.8 && ratio < 2.2) correctedFreq = cleanFreq / 2;
          else if (ratio > 0.45 && ratio < 0.55) correctedFreq = cleanFreq * 2;
        }

        // 4. EMA smoothing — alpha 0.28 for smoother display (less wobble, ~50ms more lag)
        const alpha = 0.28;
        const semitoneJump = emaFreqRef.current
          ? Math.abs(12 * Math.log2(correctedFreq / emaFreqRef.current))
          : Infinity;
        if (!emaFreqRef.current || semitoneJump > 3) {
          emaFreqRef.current = correctedFreq;
        } else {
          emaFreqRef.current = alpha * correctedFreq + (1 - alpha) * emaFreqRef.current;
        }

        const smoothedFreq = emaFreqRef.current;
        const midi = freqToMidi(smoothedFreq);
        const cents = getCentsOffset(smoothedFreq, midi);

        // 3. Hysteresis for Note Display — 180ms prevents flicker during slides/scoops
        const now = Date.now();
        if (midi !== stableMidiRef.current) {
          if (now - lastNoteUpdateRef.current > 180) {
            stableMidiRef.current = midi;
            lastNoteUpdateRef.current = now;
          }
        } else {
          lastNoteUpdateRef.current = now;
        }

        // Figure out closest reference pitch (if any)
        let closestRef = null;
        let refFeedback = '';
        if (referencePitches && referencePitches.length > 0) {
          const refNotesObj = [
            { n: "C", m: 0 }, { n: "C#", m: 1 }, { n: "D", m: 2 }, { n: "E♭", m: 3 }, { n: "E", m: 4 }, { n: "F", m: 5 },
            { n: "F#", m: 6 }, { n: "G", m: 7 }, { n: "A♭", m: 8 }, { n: "A", m: 9 }, { n: "B♭", m: 10 }, { n: "B", m: 11 }
          ];

          let minMidiDist = Infinity;
          let bestRefStr = null;
          let bestRefMidi = null;

          referencePitches.forEach(ref => {
            const match = ref.match(/([A-G][b♭#]?)([0-9])/);
            if (match) {
              const pClass = match[1].replace('b', '♭');
              const oct = parseInt(match[2]);
              const pobj = refNotesObj.find(x => x.n === pClass);
              if (pobj) {
                const rMidi = (oct + 1) * 12 + pobj.m;
                const dist = Math.abs(midi - rMidi);
                if (dist < minMidiDist) {
                  minMidiDist = dist;
                  bestRefStr = ref;
                  bestRefMidi = rMidi;
                }
              }
            }
          });

          if (minMidiDist === 0) {
            closestRef = bestRefStr;
            if (Math.abs(cents) <= 10) refFeedback = '✓ On target';
            else if (cents < 0) refFeedback = 'Flattening';
            else refFeedback = 'Sharpening';
          } else if (minMidiDist <= 2) {
            closestRef = bestRefStr;
            const targetMidi = bestRefMidi;
            if (midi < targetMidi) refFeedback = '↑ Go higher';
            else if (midi > targetMidi) refFeedback = '↓ Go lower';
            else refFeedback = 'Off target';
          }
        }

        const displayMidi = stableMidiRef.current || midi;
        setPitchState({
          note: midiToNoteString(displayMidi),
          cents: cents,
          active: true,
          closestRef,
          refFeedback
        });

        // Pitch contour: record data point
        if (pitchContour) {
          const now2 = Date.now();
          const midiFloat = 69 + 12 * Math.log2(smoothedFreq / 440);
          contourRef.current.push({ t: now2, midi: midiFloat });
          const cutoff = now2 - 10000;
          contourRef.current = contourRef.current.filter(p => p.t > cutoff);
          if (!contourLastUpdate.current || now2 - contourLastUpdate.current > 100) {
            setContourData([...contourRef.current]);
            contourLastUpdate.current = now2;
          }
        }
      } else {
        // No pitch found (e.g. unvoiced consonant, breathing)
        handleSilence(false);
      }
    } else {
      // Silence
      handleSilence(true);
    }

    if (analyserRef.current && !stoppedDetectionRef.current) {
      requestRef.current = requestAnimationFrame(detectPitch);
    }
  };

  // UI styling based on pitch accuracy
  const cents = pitchState.cents;
  const absCents = Math.abs(cents);
  let statusColor = T.textMed;
  if (pitchState.active) {
    if (absCents <= 10) statusColor = T.success;
    else if (absCents <= 25) statusColor = T.gold;
    else statusColor = T.coral;
  }

  // Gauge dot position (mapped from -50 to +50 cents to 0% to 100%)
  // Clamp value to prevent flowing off edges
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const dotPosition = `${50 + clampedCents}%`;

  const bgTint = pitchState.active ? statusColor + "05" : T.bgSoft;
  const borderTint = pitchState.active ? statusColor + "30" : T.border;

  if (!isActive) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: inline ? 12 : 0, marginBottom: 16 }}>
        <button
          onClick={startDetection}
          className="interactive-btn"
          style={{
            background: `linear-gradient(135deg, #fff 0%, ${T.bgSoft} 100%)`,
            border: `1px solid ${T.border}`,
            color: T.textDark, padding: inline ? "8px 20px" : "12px 28px",
            borderRadius: 40, cursor: "pointer", fontWeight: 600,
            fontFamily: T.sans, display: "inline-flex", alignItems: "center", gap: 10,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", fontSize: inline ? 13 : 14,
            boxShadow: "0 4px 12px rgba(44,40,37,0.04), inset 0 -2px 4px rgba(0,0,0,0.02)"
          }}
          onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
          onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Live Pitch
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${bgTint} 0%, ${T.bgCard} 100%)`,
      border: `1px solid ${borderTint}`,
      borderRadius: T.radiusMd, padding: "20px",
      marginTop: inline ? 12 : 0, marginBottom: 16,
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      animation: "fade-in-up 0.3s ease-out forwards",
      boxShadow: pitchState.active && absCents <= 10
        ? `0 4px 20px ${T.success}18, inset 0 1px 0 rgba(255,255,255,0.5)`
        : `0 2px 12px rgba(44,40,37,0.05), inset 0 1px 0 rgba(255,255,255,0.5)`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: pitchState.active ? T.coral : T.border,
            boxShadow: pitchState.active ? `0 0 8px ${T.coral}80` : 'none',
            animation: pitchState.active ? "pulse-ring 2s infinite" : "none"
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase" }}>
            {audioPaused ? 'Paused — Audio Playing' : 'Live Pitch'}
          </span>
        </div>

        <button
          onClick={stopDetection}
          style={{
            background: "transparent", border: `1px solid ${T.borderSoft}`, color: T.textMuted,
            fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
            padding: "4px 10px", borderRadius: 20, letterSpacing: 0.5,
            transition: "all 0.15s ease"
          }}
        >
          Stop
        </button>
      </div>

      {/* Note display with circular badge */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{
          position: "relative",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 104, height: 104, borderRadius: "50%",
          background: pitchState.active
            ? `linear-gradient(135deg, ${statusColor}15 0%, ${statusColor}30 100%)`
            : T.bgSoft,
          backdropFilter: pitchState.active ? "blur(4px)" : "none",
          border: `2px solid ${pitchState.active ? 'rgba(255,255,255,0.4)' : T.borderSoft}`,
          transition: "all 0.3s ease",
          boxShadow: pitchState.active
            ? `0 0 24px ${statusColor}40, inset 0 0 16px rgba(255,255,255,0.3)`
            : "none"
        }}>
          <div style={{
            fontSize: 48, fontWeight: 500, fontFamily: T.serif,
            color: pitchState.active ? T.textDark : T.textMuted,
            lineHeight: 1, transition: "color 0.2s", zIndex: 1,
            textShadow: pitchState.active && absCents <= 10 ? `0 0 12px ${T.success}60` : "none"
          }}>
            {pitchState.note}
          </div>
        </div>
      </div>

      {/* Cents Gauge */}
      <div style={{ position: "relative", width: "100%", height: 36, marginBottom: 6, padding: "0 4px" }}>
        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
          <span style={{ letterSpacing: 0.5 }}>♭ Flat</span>
          <span style={{
            color: absCents <= 10 && pitchState.active ? T.success : T.textMuted,
            fontWeight: 700, fontSize: 11,
            transition: "color 0.3s"
          }}>0</span>
          <span style={{ letterSpacing: 0.5 }}>Sharp ♯</span>
        </div>

        {/* Track with tick marks */}
        <div style={{ height: 6, background: `linear-gradient(90deg, ${T.coral}20 0%, ${T.success}20 45%, ${T.success}30 50%, ${T.success}20 55%, ${T.coral}20 100%)`, borderRadius: 3, position: "relative", top: 2, overflow: "visible" }}>
          {/* Tick marks at 25% intervals */}
          {[0, 25, 50, 75, 100].map(pct => (
            <div key={pct} style={{
              position: "absolute", left: `${pct}%`, top: pct === 50 ? -5 : -3,
              width: pct === 50 ? 2 : 1,
              height: pct === 50 ? 16 : 12,
              background: pct === 50 ? T.textMed : T.textMuted + '60',
              transform: "translateX(-50%)", borderRadius: 1
            }} />
          ))}

          {/* Gauge dot */}
          <div style={{
            position: "absolute",
            top: -8,
            left: dotPosition,
            width: 20, height: 20, borderRadius: "50%",
            background: pitchState.active ? statusColor : T.bgCard,
            border: pitchState.active ? `2px solid ${T.bgCard}` : `2px solid ${T.textMuted}`,
            transform: "translateX(-50%)",
            transition: "left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease, opacity 0.3s ease, box-shadow 0.4s ease",
            opacity: pitchState.active ? 1 : 0,
            zIndex: 2,
            boxShadow: pitchState.active && absCents <= 10
              ? `0 0 12px ${T.success}50, 0 2px 4px rgba(0,0,0,0.12)`
              : "0 2px 4px rgba(0,0,0,0.12)"
          }} />
        </div>
      </div>

      <div style={{
        textAlign: "center", fontSize: 13, color: pitchState.active ? statusColor : T.textMuted,
        fontFamily: T.sans, fontWeight: 700, minHeight: 20, transition: "color 0.3s",
        letterSpacing: 0.5
      }}>
        {pitchState.active ? `${cents > 0 ? '+' : ''}${cents} ¢` : ''}
      </div>

      {/* Reference Feedback - reserved height to prevent layout shift */}
      {referencePitches && referencePitches.length > 0 && (
        <div style={{
          marginTop: 14, padding: "10px 14px", borderRadius: T.radius,
          background: pitchState.closestRef && pitchState.active ? statusColor + '08' : 'transparent',
          border: `1px solid ${pitchState.closestRef && pitchState.active ? statusColor + '18' : 'transparent'}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 13, fontFamily: T.sans, transition: "all 0.3s ease",
          opacity: pitchState.closestRef && pitchState.active ? 1 : 0
        }}>
          <span style={{ color: T.textMed }}>Target: <span style={{ color: T.textDark, fontWeight: 700 }}>{pitchState.closestRef || "—"}</span></span>
          <span style={{ color: statusColor, fontWeight: 600 }}>{pitchState.refFeedback || "—"}</span>
        </div>
      )}

      {/* Pitch Contour Graph - dynamically zoomed to active range */}
      {pitchContour && (() => {
        const W = 300, H = 180, PAD_TOP = 6, PAD_BOT = 6, PAD_L = 32, PAD_R = 6;
        const refNotesObj = [
          { n: "C", m: 0 }, { n: "C#", m: 1 }, { n: "D", m: 2 }, { n: "E♭", m: 3 }, { n: "E", m: 4 }, { n: "F", m: 5 },
          { n: "F#", m: 6 }, { n: "G", m: 7 }, { n: "A♭", m: 8 }, { n: "A", m: 9 }, { n: "B♭", m: 10 }, { n: "B", m: 11 }
        ];
        const noteNames = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
        // Parse reference pitches to MIDI values
        const refMidis = (referencePitches || []).map(ref => {
          const match = ref.match(/([A-G][b♭#]?)([0-9])/);
          if (!match) return null;
          const pClass = match[1].replace('b', '♭');
          const oct = parseInt(match[2]);
          const pobj = refNotesObj.find(x => x.n === pClass);
          if (!pobj) return null;
          return { midi: (oct + 1) * 12 + pobj.m, label: ref };
        }).filter(Boolean);

        const midiVals = contourData.filter(p => p.midi !== null).map(p => p.midi);
        const refMidiNums = refMidis.map(r => r.midi);

        // Dynamic range: zoom to where the user is actually singing
        const MIN_RANGE = 12; // At least one octave visible
        const PADDING = 3;    // Semitones padding above/below
        const SMOOTH_EXPAND = 0.15;   // Fast expansion to follow singer
        const SMOOTH_CONTRACT = 0.04; // Slow contraction for stability

        let targetMin, targetMax;
        const activeMidis = [...midiVals, ...refMidiNums];

        if (activeMidis.length === 0) {
          targetMin = 48; targetMax = 60; // Default C3-C4 before any data
        } else {
          const rawMin = Math.min(...activeMidis) - PADDING;
          const rawMax = Math.max(...activeMidis) + PADDING;
          const rawRange = rawMax - rawMin;
          if (rawRange < MIN_RANGE) {
            const center = (rawMin + rawMax) / 2;
            targetMin = center - MIN_RANGE / 2;
            targetMax = center + MIN_RANGE / 2;
          } else {
            targetMin = rawMin; targetMax = rawMax;
          }
        }

        // Smooth range with asymmetric EMA (expand fast, contract slow = stable)
        const cr = contourRangeRef.current;
        if (cr.min === null || cr.max === null) {
          cr.min = targetMin; cr.max = targetMax;
        } else {
          cr.min += (targetMin - cr.min) * (targetMin < cr.min ? SMOOTH_EXPAND : SMOOTH_CONTRACT);
          cr.max += (targetMax - cr.max) * (targetMax > cr.max ? SMOOTH_EXPAND : SMOOTH_CONTRACT);
        }

        const minM = Math.floor(cr.min);
        const maxM = Math.ceil(cr.max);
        const rangeM = maxM - minM || 1;
        const now = Date.now();
        const toY = (m) => H - PAD_BOT - ((m - minM) / rangeM) * (H - PAD_TOP - PAD_BOT);

        // Split contour into segments at silence gaps
        const segments = [];
        let currentSeg = [];
        contourData.forEach(p => {
          if (p.midi === null) {
            if (currentSeg.length > 1) segments.push(currentSeg);
            currentSeg = [];
          } else {
            const x = PAD_L + ((p.t - (now - 10000)) / 10000) * (W - PAD_L - PAD_R);
            currentSeg.push(`${x},${toY(p.midi)}`);
          }
        });
        if (currentSeg.length > 1) segments.push(currentSeg);

        // Every semitone gets a grid line + note label
        const gridLines = [];
        for (let m = minM; m <= maxM; m++) gridLines.push(m);

        return (
          <div style={{ marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 8 }}>Pitch Contour (10s)</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{
              width: "100%", height: 200,
              background: `linear-gradient(180deg, ${T.bgSoft} 0%, ${T.bgCard} 100%)`,
              borderRadius: 8, border: `1px solid ${T.border}`,
              boxShadow: `inset 0 2px 8px rgba(0,0,0,0.06), 0 2px 6px ${T.bgSoft}`,
              overflow: "hidden"
            }}>
              {/* Semitone grid — every note labeled on Y axis */}
              {gridLines.map(m => {
                const name = noteNames[((m % 12) + 12) % 12];
                const oct = Math.floor(m / 12) - 1;
                const isC = name === "C";
                const isNatural = !name.includes("#") && !name.includes("♭");
                return (
                  <g key={`g${m}`}>
                    <line x1={PAD_L} y1={toY(m)} x2={W - PAD_R} y2={toY(m)}
                      stroke={isC ? T.textMuted + "40" : T.border} strokeWidth={isC ? "0.6" : "0.3"} />
                    <text x={PAD_L - 3} y={toY(m) + 3} textAnchor="end"
                      fontSize={isNatural ? "7" : "6"} fill={isC ? T.textDark : isNatural ? T.textMuted : T.textMuted + "80"} fontFamily={T.sans}
                      fontWeight={isC ? "700" : isNatural ? "600" : "400"}>
                      {name}{oct}
                    </text>
                  </g>
                );
              })}
              {/* Target zones & reference lines */}
              {refMidis.map((rl, i) => {
                const isTargeted = pitchState.active && pitchState.closestRef === rl.label && pitchState.cents > -35 && pitchState.cents < 35;
                const isNailed = pitchState.active && pitchState.closestRef === rl.label && pitchState.cents >= -15 && pitchState.cents <= 15;
                const hitColor = isNailed ? T.success : T.gold;
                return (
                  <g key={i}>
                    <rect x={PAD_L} y={toY(rl.midi + 0.4)} width={W - PAD_L - PAD_R}
                      height={toY(rl.midi - 0.4) - toY(rl.midi + 0.4)}
                      fill={isTargeted ? hitColor + "25" : T.success + "08"} rx="2"
                      style={{ transition: "all 0.3s ease" }} />
                    <line x1={PAD_L} y1={toY(rl.midi)} x2={W - PAD_R} y2={toY(rl.midi)}
                      stroke={isTargeted ? hitColor : T.gold} strokeWidth={isTargeted ? "2.5" : "0.5"} strokeDasharray={isTargeted ? "none" : "6,4"} opacity={isTargeted ? "0.9" : "0.4"}
                      style={{ transition: "all 0.3s ease" }} />
                    <text x={W - PAD_R - 4} y={toY(rl.midi) - 4} textAnchor="end"
                      fontSize={isTargeted ? "12" : "9"} fill={isTargeted ? hitColor : T.gold} fontFamily={T.sans} fontWeight="700" filter={isTargeted ? `drop-shadow(0 0 6px ${hitColor}50)` : "none"}
                      style={{ transition: "all 0.3s ease" }}>{rl.label}</text>
                  </g>
                );
              })}
              {/* Pitch lines — split at silence gaps */}
              {segments.map((seg, i) => (
                <polyline key={i} points={seg.join(" ")} fill="none" stroke={statusColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" filter={`drop-shadow(0 2px 6px ${statusColor}60)`} opacity={0.9} />
              ))}
            </svg>
          </div>
        );
      })()}
    </div>
  );
}

// --- 7. Fretboard Diagram ---
const CHROMATIC = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];

const SCALES = {
  "am-pentatonic": {
    name: "Am Pentatonic",
    root: "A",
    notes: ["A", "C", "D", "E", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3] /* or [2, 5] if you think of G to C shape but open is 0-3 */
    }
  },
  "am-blues": {
    name: "Am Blues",
    root: "A",
    notes: ["A", "C", "D", "E♭", "E", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3]
    }
  },
  "g-mixolydian": {
    name: "G Mixolydian",
    root: "G",
    notes: ["G", "A", "B", "C", "D", "E", "F"],
    positions: {
      1: [3, 6], // Root on 6th string, 3rd fret
      2: [5, 8],
      3: [7, 10],
      4: [10, 13],
      5: [12, 15]
    }
  },
  "a-sus-pentatonic": {
    name: "A Sus Pentatonic",
    root: "A",
    notes: ["A", "B", "D", "E", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3]
    }
  },
  "a-phrygian": {
    name: "A Phrygian",
    root: "A",
    notes: ["A", "B♭", "C", "D", "E", "F", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3]
    }
  },
  "a-phrygian-dominant": {
    name: "A Phrygian Dominant",
    root: "A",
    notes: ["A", "B♭", "C#", "D", "E", "F", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3]
    }
  },
  "a-dorian": {
    name: "A Dorian",
    root: "A",
    notes: ["A", "B", "C", "D", "E", "F#", "G"],
    positions: {
      1: [5, 8],
      2: [7, 10],
      3: [9, 12],
      4: [12, 15],
      5: [0, 3]
    }
  },
  "c#m-pentatonic": {
    name: "C#m Pentatonic",
    root: "C#",
    notes: ["C#", "E", "F#", "G#", "B"],
    positions: { 1: [9, 12], 2: [11, 14], 3: [2, 5], 4: [4, 7], 5: [6, 9] }
  },
  "gm-pentatonic": {
    name: "Gm Pentatonic",
    root: "G",
    notes: ["G", "B♭", "C", "D", "F"],
    positions: { 1: [3, 6], 2: [5, 8], 3: [7, 10], 4: [10, 13], 5: [0, 3] }
  },
  "a-natural-minor": {
    name: "A Natural Minor",
    root: "A",
    notes: ["A", "B", "C", "D", "E", "F", "G"],
    positions: { 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [12, 15], 5: [0, 3] }
  },
  "em-pentatonic": {
    name: "Em Pentatonic",
    root: "E",
    notes: ["E", "G", "A", "B", "D"],
    positions: { 1: [0, 3], 2: [2, 5], 3: [5, 8], 4: [7, 10], 5: [9, 12] }
  }
};

const STRING_MIDI = [
  { label: 'E', start: 52 }, // string 1 (high E) — E4
  { label: 'B', start: 47 }, // string 2 — B3
  { label: 'G', start: 43 }, // string 3 — G3
  { label: 'D', start: 38 }, // string 4 — D3
  { label: 'A', start: 33 }, // string 5 — A2
  { label: 'E', start: 28 }, // string 6 (low E) — E2
];



const FRET_MARKERS = [3, 5, 7, 9, 12, 15];

function midiToNote(midi) {
  const noteName = CHROMATIC[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { noteName, octave, full: `${noteName}${octave}` };
}

function getInterval(noteName, rootName) {
  if (!rootName) return noteName;
  const rootIdx = CHROMATIC.indexOf(rootName);
  const noteIdx = CHROMATIC.indexOf(noteName);
  if (rootIdx === -1 || noteIdx === -1) return noteName;

  let diff = noteIdx - rootIdx;
  if (diff < 0) diff += 12;

  const intervals = {
    0: "R",
    1: "b2",
    2: "2",
    3: "b3",
    4: "3",
    5: "4",
    6: "b5",
    7: "5",
    8: "b6",
    9: "6",
    10: "b7",
    11: "7"
  };
  return intervals[diff] || noteName;
}

export function FretboardDiagram({ theme: T, scale, position, highlight = [] }) {
  const [selectedPos, setSelectedPos] = useState(position || 1);
  const [viewMode, setViewMode] = useState("notes"); // 'notes' or 'intervals'
  const [fullNeck, setFullNeck] = useState(false);
  const scaleData = SCALES[scale] || SCALES["am-pentatonic"];
  const positionsConfig = scaleData.positions || { 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [12, 15], 5: [0, 3] };
  const [lo, hi] = fullNeck ? [0, 15] : (positionsConfig[selectedPos] || positionsConfig[1]);

  // In full neck mode, render everything; otherwise expand by 1 fret for dot rendering
  const renderLo = fullNeck ? 0 : Math.max(0, lo - 1);
  const renderHi = fullNeck ? 15 : Math.min(15, hi + 1);

  const totalFrets = 16; // 0-15
  const numStrings = 6;

  // SVG layout constants
  const leftPad = 36;
  const rightPad = 16;
  const topPad = 28;
  const bottomPad = 28;
  const fretSpacing = 52;
  const stringSpacing = 22;

  const svgWidth = leftPad + totalFrets * fretSpacing + rightPad;
  const svgHeight = topPad + (numStrings - 1) * stringSpacing + bottomPad;

  // String thicknesses: thickest for low E (string 6, index 5), thinnest for high E (string 1, index 0)
  const stringWidths = [1, 1.2, 1.6, 2, 2.5, 3];

  const playNote = async (noteStr) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(noteStr.replace('♭', 'b'), "2n");
    setTimeout(() => { try { synth.dispose(); } catch {} }, 2000);
  };

  // Build dots: for each string, for each fret in renderLo..renderHi, check if it's a scale note
  const dots = [];
  STRING_MIDI.forEach((s, stringIdx) => {
    for (let fret = renderLo; fret <= renderHi; fret++) {
      const midi = s.start + fret;
      const { noteName, full } = midiToNote(midi);
      if (scaleData.notes.includes(noteName)) {
        const isRoot = noteName === scaleData.root;
        const isHighlighted = highlight.some(h => {
          // Normalize the highlight note for comparison
          const hNorm = h.replace('b', '♭');
          return hNorm === full;
        });
        const intervalName = getInterval(noteName, scaleData.root);
        const displayLabel = viewMode === "intervals" ? intervalName : noteName;
        dots.push({ stringIdx, fret, displayLabel, noteName, full, midi, isRoot, isHighlighted });
      }
    }
  });

  // Fret x position: fret 0 is the nut, fret n center is between fret line n-1 and n
  const fretX = (fret) => {
    if (fret === 0) return leftPad + fretSpacing * 0.5;
    return leftPad + fret * fretSpacing + fretSpacing * 0.5;
  };
  const stringY = (idx) => topPad + idx * stringSpacing;

  return (
    <div style={{
      background: T.bgSoft, border: `1px solid ${T.border}`,
      borderRadius: T.radius, padding: 16, marginBottom: 16
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 12, fontFamily: T.sans, flexWrap: 'wrap', gap: 12
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.textDark }}>
            {scaleData.name}
          </span>
          <span style={{ fontSize: 11, color: T.textMed, letterSpacing: 1, textTransform: 'uppercase' }}>
            {fullNeck ? "Full Neck \u00B7 All Frets" : `Pos ${selectedPos} \u00B7 Frets ${lo}\u2013${hi}`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Notes vs Intervals Toggle */}
          <div style={{
            display: "flex", background: T.bgCard, border: `1px solid ${T.borderSoft}`,
            borderRadius: T.radius, overflow: "hidden", marginRight: 8
          }}>
            <button
              onClick={() => setViewMode("notes")}
              style={{
                background: viewMode === "notes" ? T.goldSoft : "transparent",
                color: viewMode === "notes" ? T.goldDark : T.textMed, border: "none",
                padding: "0 10px", fontSize: 11, fontWeight: 700, fontFamily: T.sans, cursor: "pointer",
                textTransform: 'uppercase', letterSpacing: 1, transition: "background 0.2s"
              }}>Notes</button>
            <button
              onClick={() => setViewMode("intervals")}
              style={{
                background: viewMode === "intervals" ? T.goldSoft : "transparent",
                color: viewMode === "intervals" ? T.goldDark : T.textMed, border: "none",
                padding: "0 10px", fontSize: 11, fontWeight: 700, fontFamily: T.sans, cursor: "pointer",
                textTransform: 'uppercase', letterSpacing: 1, transition: "background 0.2s",
                borderLeft: `1px solid ${T.borderSoft}`
              }}>Intervals</button>
          </div>

          {[1, 2, 3, 4, 5].map(p => (
            <button
              key={p}
              onClick={() => { setSelectedPos(p); setFullNeck(false); }}
              style={{
                background: !fullNeck && selectedPos === p ? T.gold : "transparent",
                color: !fullNeck && selectedPos === p ? "#fff" : T.textMed,
                border: `1px solid ${!fullNeck && selectedPos === p ? T.gold : T.borderSoft}`,
                width: 28, height: 28, borderRadius: T.radius,
                fontFamily: T.sans, fontSize: 12, fontWeight: 600,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }}
              onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
              onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setFullNeck(!fullNeck)}
            style={{
              background: fullNeck ? T.gold : "transparent",
              color: fullNeck ? "#fff" : T.textMed,
              border: `1px solid ${fullNeck ? T.gold : T.borderSoft}`,
              height: 28, borderRadius: T.radius, padding: "0 10px",
              fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              textTransform: "uppercase", letterSpacing: 1,
              transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
            onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Full
          </button>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', minHeight: 160, maxWidth: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="metal-string-plain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b5b5b5" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#8c8c8c" />
          </linearGradient>
          <linearGradient id="metal-string-wound" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a88b6a" />
            <stop offset="30%" stopColor="#d1b89d" />
            <stop offset="50%" stopColor="#f5ddc3" />
            <stop offset="70%" stopColor="#d1b89d" />
            <stop offset="100%" stopColor="#8f7356" />
          </linearGradient>
          <radialGradient id="pearl-inlay" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="70%" stopColor="#f4ece1" />
            <stop offset="100%" stopColor="#d6c6b3" />
          </radialGradient>
        </defs>
        {/* Position highlight rectangle (hidden in full-neck mode) */}
        {!fullNeck && <rect
          x={leftPad + lo * fretSpacing}
          y={topPad - 12}
          width={(hi - lo + 1) * fretSpacing}
          height={(numStrings - 1) * stringSpacing + 24}
          rx={6}
          fill={T.gold}
          opacity={0.08}
        />}

        {/* Fret lines (vertical) & Stylized Nut */}
        {Array.from({ length: totalFrets + 1 }, (_, i) => {
          if (i === 0) {
            // Nut
            return <rect key={`nut`} x={leftPad - 5} y={topPad - 5} width={10} height={(numStrings - 1) * stringSpacing + 10} rx={4} fill="#eee6de" stroke="#cfc0b2" strokeWidth="1" style={{ filter: "drop-shadow(3px 0 4px rgba(0,0,0,0.12))" }} />;
          }
          return (
            <line
              key={`fret-${i}`}
              x1={leftPad + i * fretSpacing}
              y1={topPad - 4}
              x2={leftPad + i * fretSpacing}
              y2={topPad + (numStrings - 1) * stringSpacing + 4}
              stroke="#b5aead"
              strokeWidth={2}
              style={{ filter: "drop-shadow(1px 0px 1px rgba(255,255,255,0.4))" }}
            />
          );
        })}

        {/* Fret markers (dots at frets 3,5,7,9,12,15) */}
        {/* We map the markers FIRST so they sit underneath the strings */}
        {FRET_MARKERS.map(f => (
          <React.Fragment key={`marker-${f}`}>
            {f === 12 ? (
              <>
                <circle cx={fretX(f)} cy={topPad + 1.5 * stringSpacing} r={5.5} fill="url(#pearl-inlay)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))" }} />
                <circle cx={fretX(f)} cy={topPad + 3.5 * stringSpacing} r={5.5} fill="url(#pearl-inlay)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))" }} />
              </>
            ) : (
              <circle cx={fretX(f)} cy={topPad + 2.5 * stringSpacing} r={5.5} fill="url(#pearl-inlay)" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))" }} />
            )}
          </React.Fragment>
        ))}

        {/* Fret numbers along the top */}
        {Array.from({ length: totalFrets }, (_, i) => (
          <text
            key={`fnum-${i}`}
            x={fretX(i)}
            y={topPad - 16}
            textAnchor="middle"
            fontSize={10}
            fontFamily={T.sans}
            fill={fullNeck ? T.textDark : (i >= lo && i <= hi ? T.textDark : T.textLight)}
            fontWeight={fullNeck ? 600 : (i >= lo && i <= hi ? 700 : 500)}
          >
            {i}
          </text>
        ))}

        {/* String lines (horizontal) */}
        {STRING_MIDI.map((s, idx) => {
          const isWound = idx >= 3; // E(5), A(4), D(3)
          return (
            <g key={`str-${idx}`}>
              {/* String shadow */}
              <line
                x1={leftPad} y1={stringY(idx) + 1.5}
                x2={leftPad + totalFrets * fretSpacing} y2={stringY(idx) + 1.5}
                stroke="rgba(0,0,0,0.18)" strokeWidth={stringWidths[idx]}
                strokeLinecap="round"
              />
              {/* actual string */}
              <line
                x1={leftPad} y1={stringY(idx)}
                x2={leftPad + totalFrets * fretSpacing} y2={stringY(idx)}
                stroke={isWound ? "url(#metal-string-wound)" : "url(#metal-string-plain)"}
                strokeWidth={stringWidths[idx]}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Side dots below the fretboard (like a real guitar neck edge) */}
        {[3, 5, 7, 9, 15].map(f => (
          <circle
            key={`side-dot-${f}`}
            cx={fretX(f)}
            cy={topPad + (numStrings - 1) * stringSpacing + 14}
            r={3}
            fill={T.textLight}
            opacity={0.5}
          />
        ))}
        {/* Double dot at fret 12 (octave) */}
        <circle cx={fretX(12) - 7} cy={topPad + (numStrings - 1) * stringSpacing + 14} r={3} fill={T.textLight} opacity={0.5} />
        <circle cx={fretX(12) + 7} cy={topPad + (numStrings - 1) * stringSpacing + 14} r={3} fill={T.textLight} opacity={0.5} />

        {/* Scale note dots */}
        {dots.map((d, i) => {
          const cx = fretX(d.fret);
          const cy = stringY(d.stringIdx);
          let fill = T.textMed;
          let filter = "drop-shadow(0 2px 4px rgba(44,40,37,0.2))";
          if (d.isHighlighted) { fill = T.coral; filter = `drop-shadow(0 0 8px ${T.coral})`; }
          else if (d.isRoot) { fill = T.gold; filter = `drop-shadow(0 0 8px ${T.gold})`; }

          return (
            <g
              key={`dot-${i}`}
              style={{ cursor: 'pointer', filter, transition: "filter 0.3s ease" }}
              onClick={() => playNote(d.full)}
            >
              <circle cx={cx} cy={cy} r={9} fill={fill} opacity={0.9} />
              <text
                x={cx}
                y={cy + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={8}
                fontWeight={700}
                fontFamily={T.sans}
                fill="#fff"
              >
                {d.displayLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// --- 8. Volume Meter ---
export function VolumeMeter({ theme: T, inline = false, volumeContour = false }) {
  const [isActive, setIsActive] = useState(false);
  const [dbLevel, setDbLevel] = useState(-60);
  const [history, setHistory] = useState([]);
  const maxHistoryRef = useRef(volumeContour ? 600 : 100);
  const bufferRef = useRef(null);

  useEffect(() => { maxHistoryRef.current = volumeContour ? 600 : 100; }, [volumeContour]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const lastHistoryUpdate = useRef(0);

  const startMeter = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
      });
      streamRef.current = stream;
      const audioCtx = createMicContext();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
      bufferRef.current = new Float32Array(analyser.fftSize);
      setIsActive(true);
      measureVolume();
    } catch (err) {
      alert("Could not access microphone.");
    }
  };

  const measureVolume = () => {
    if (!analyserRef.current || !bufferRef.current) return;
    analyserRef.current.getFloatTimeDomainData(bufferRef.current);
    let sum = 0;
    for (let i = 0; i < bufferRef.current.length; i++) sum += bufferRef.current[i] * bufferRef.current[i];
    const rms = Math.sqrt(sum / bufferRef.current.length);
    const db = rms > 0 ? 20 * Math.log10(rms) : -60;
    const clampedDb = Math.max(-60, Math.min(0, db));
    setDbLevel(clampedDb);
    const now = performance.now();
    if (now - lastHistoryUpdate.current > 100) {
      const max = maxHistoryRef.current;
      setHistory(h => [...h.slice(-(max - 1)), clampedDb]);
      lastHistoryUpdate.current = now;
    }
    requestRef.current = requestAnimationFrame(measureVolume);
  };

  const stopMeter = () => {
    setIsActive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = null;
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch {} sourceRef.current = null; }
    closeMicContext(audioContextRef.current);
    audioContextRef.current = null;
    analyserRef.current = null;
    setDbLevel(-60);
    setHistory([]);
  };

  useEffect(() => {
    return stopMeter; // Cleanup on unmount
  }, []);

  // Stop mic when app goes to background — prevents audio corruption on resume
  useEffect(() => {
    if (!isActive) return;
    const handleVisibility = () => {
      if (document.hidden) stopMeter();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isActive]);

  // Determine bar color based on dB level
  const barColor = dbLevel >= -6 ? T.coral : dbLevel >= -20 ? T.gold : T.success;
  // Bar width as percentage (maps -60..0 to 0..100%)
  const barWidth = ((dbLevel + 60) / 60) * 100;

  if (!isActive) {
    return (
      <div style={{
        background: T.getTint(T.gold, 0.03), border: `1px solid ${T.gold}15`,
        borderRadius: T.radius, padding: 24, marginBottom: 16,
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16
      }}>
        <div style={{ color: T.gold, opacity: 0.8 }}><Volume2 size={32} strokeWidth={1.5} /></div>
        <button
          onClick={startMeter}
          className="interactive-btn"
          style={{
            background: T.gold, color: '#fff', border: 'none',
            padding: '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 800,
            fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 2,
            fontSize: 10, boxShadow: T.getShadow(T.gold, 'sm')
          }}
        >
          Start Volume Meter
        </button>
      </div>
    );
  }

  // Build sparkline path from history
  const sparklinePoints = history.map((val, i) => {
    const x = history.length > 1 ? (i / (history.length - 1)) * 100 : 50;
    const y = 40 - ((val + 60) / 60) * 40;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: T.radiusMd, padding: 24, marginBottom: 16,
      boxShadow: T.sm
    }}>
      {/* dB Readout */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20
      }}>
        <Volume2 size={24} color={barColor} />
        <div style={{
          fontSize: 32, fontWeight: 700, textAlign: 'center',
          color: barColor, fontFamily: T.sans,
          transition: 'color 0.15s ease', fontVariantNumeric: "tabular-nums"
        }}>
          {Math.round(dbLevel)} <span style={{ fontSize: 14, opacity: 0.6 }}>dB</span>
        </div>
      </div>

      {/* LED-style VU Meter */}
      <div style={{
        display: "flex", gap: 2, marginBottom: 16, height: 14,
        padding: "4px", background: "#1a1816", borderRadius: 4,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
      }}>
        {Array.from({ length: 30 }).map((_, i) => {
          // Range: -60dB to +0dB -> 30 segments (2dB per segment)
          const thresholdDb = -60 + i * 2;
          const isOn = dbLevel >= thresholdDb;

          let color = T.success;
          let glowColor = T.success;
          if (thresholdDb >= -10) { color = T.gold; glowColor = T.gold; }
          if (thresholdDb >= -4) { color = T.coral; glowColor = T.coral; }

          return (
            <div key={i} style={{
              flex: 1, height: "100%",
              background: isOn ? color : "#2c2825",
              borderRadius: 1,
              boxShadow: isOn ? `0 0 6px ${glowColor}80` : "none",
              transition: "background 0.05s ease-out, box-shadow 0.05s ease-out"
            }} />
          );
        })}
      </div>

      {/* Sparkline (standard mode) */}
      {!volumeContour && history.length > 1 && (
        <svg
          width="100%" height="40"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          style={{ display: 'block', marginBottom: 12 }}
        >
          <polyline
            points={sparklinePoints}
            fill="none"
            stroke={T.textMed}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Volume Contour (enhanced scrolling graph) */}
      {volumeContour && history.length > 1 && (() => {
        const h = history;
        const w = 600, ht = 160;
        const points = h.map((val, i) => {
          const x = (i / (maxHistoryRef.current - 1)) * w;
          const y = ht - ((val + 60) / 60) * ht;
          return `${x},${y}`;
        }).join(' ');
        // Zone thresholds mapped to y
        const whisperY = ht - (((-40) + 60) / 60) * ht; // -40dB
        const mediumY = ht - (((-20) + 60) / 60) * ht;  // -20dB
        const fullY = ht - (((-6) + 60) / 60) * ht;     // -6dB
        return (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Volume Contour — {Math.round(h.length / 10)}s</div>
            <svg width="100%" height={ht} viewBox={`0 0 ${w} ${ht}`} preserveAspectRatio="none" style={{ display: 'block', background: '#0001', borderRadius: 6 }}>
              {/* Zone lines */}
              <line x1="0" y1={whisperY} x2={w} y2={whisperY} stroke={T.success} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={mediumY} x2={w} y2={mediumY} stroke={T.gold} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={fullY} x2={w} y2={fullY} stroke={T.coral} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              {/* Contour line */}
              <polyline points={points} fill="none" stroke={T.gold} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontFamily: T.sans, color: T.textLight, marginTop: 4 }}>
              <span style={{ color: T.success }}>Whisper</span>
              <span style={{ color: T.gold }}>Medium</span>
              <span style={{ color: T.coral }}>Full</span>
            </div>
          </div>
        );
      })()}

      {/* Stop Button */}
      <button
        onClick={stopMeter}
        style={{
          background: 'transparent', border: `1px solid ${T.border}`,
          color: T.textMed, padding: '8px 16px',
          borderRadius: T.radius, cursor: 'pointer', fontWeight: 600,
          fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 1,
          fontSize: 12
        }}
      >
        Stop
      </button>
    </div>
  );
}

const DRONE_PRESETS = [
  { id: "surf-garage",    label: "Surf Garage",    chords: ["Am", "G", "F", "E"],               bpm: 120, stepDuration: "1m" },
  { id: "psych-vamp",     label: "Psych Vamp",     chords: ["Em", "A", "Em", "A"],              bpm: 90,  stepDuration: "2m" },
  { id: "reggae-drop",    label: "Reggae Drop",    chords: ["Am", "Am", "G", "G"],              bpm: 85,  stepDuration: "1m" },
  { id: "coastal-soul",   label: "Coastal Soul",   chords: ["Cmaj7", "Bm7", "Am7", "Gmaj7"],   bpm: 75,  stepDuration: "2m" },
  { id: "desert-blues",   label: "Desert Blues",   chords: ["Dm", "C", "Am", "Dm"],             bpm: 75,  stepDuration: "2m" },
  { id: "thai-funk",      label: "Thai Funk",      chords: ["Em7", "Bm7", "Am7", "Bm7"],       bpm: 80,  stepDuration: "1m" },
  { id: "reggae-rock",    label: "Reggae Rock",    chords: ["A", "Bm", "C#m", "Bm"],           bpm: 85,  stepDuration: "1m" },
  { id: "cinematic-sky",  label: "Cinematic Sky",  chords: ["Fmaj7", "G", "Em", "Am"],          bpm: 80,  stepDuration: "2m" },
];

const CIRCLE_OF_FIFTHS = [
  { major: "C", minor: "Am", angle: 0 },
  { major: "G", minor: "Em", angle: 30 },
  { major: "D", minor: "Bm", angle: 60 },
  { major: "A", minor: "F#m", angle: 90 },
  { major: "E", minor: "C#m", angle: 120 },
  { major: "B", minor: "G#m", angle: 150 },
  { major: "F#", minor: "D#m", angle: 180 },
  { major: "D♭", minor: "B♭m", angle: 210 },
  { major: "A♭", minor: "Fm", angle: 240 },
  { major: "E♭", minor: "Cm", angle: 270 },
  { major: "B♭", minor: "Gm", angle: 300 },
  { major: "F", minor: "Dm", angle: 330 },
];

const getChordSpelling = (chordStr) => {
  if (!chordStr) return "";
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return "";
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2].toLowerCase();

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return "";

  let third = 4;
  let fifth = 7;
  let seventh = null;

  if (q.match(/^m(?!aj)/i) || q.includes('min')) third = 3;
  if (q.includes('dim')) { third = 3; fifth = 6; }
  if (q.includes('aug')) { third = 4; fifth = 8; }
  if (q.includes('sus2')) third = 2;
  if (q.includes('sus4')) third = 5;

  if (q.includes('maj7')) seventh = 11;
  else if (q.includes('7')) seventh = 10;

  const getSpelling = (interval) => notes[(rootIdx + interval) % 12];

  let spelling = [getSpelling(0), getSpelling(third), getSpelling(fifth)];
  if (seventh !== null) spelling.push(getSpelling(seventh));
  
  return spelling.join(" ");
};

const transposeChord = (chordStr, steps) => {
  if (!chordStr) return "";
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return chordStr;
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2];

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return chordStr;

  let newIdx = (rootIdx + steps) % 12;
  if (newIdx < 0) newIdx += 12;

  return notes[newIdx] + q;
};

const parseChordToNotes = (chordStr, baseOct, type = "chord") => {
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return null;
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2].toLowerCase();

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return null;

  const getNote = (interval, octOffset) => {
    let idx = (rootIdx + interval) % 12;
    let wrap = Math.floor((rootIdx + interval) / 12);
    return `${notes[idx].replace('♭', 'b')}${baseOct + octOffset + wrap}`;
  };

  if (type === "single") {
    // Pure massive single note drone across 3 octaves
    return [...new Set([getNote(0, -1), getNote(0, 0), getNote(0, 1)])];
  }

  // Full lush pad chord voicing — root-heavy for proper drone balance
  // Root is tripled across octaves so it dominates; color tones (3rd, 5th, 7th)
  // sit higher and thinner. This matches how real tanpura/shruti drones work.
  let third = 4;
  let fifth = 7;
  let seventh = null;

  if (q.match(/^m(?!aj)/i) || q.includes('min')) third = 3;
  if (q.includes('dim')) { third = 3; fifth = 6; }
  if (q.includes('aug')) { third = 4; fifth = 8; }
  if (q.includes('sus2')) third = 2;
  if (q.includes('sus4')) third = 5;

  if (q.includes('maj7')) seventh = 11;
  else if (q.includes('7')) seventh = 10;

  let voicing = [
    getNote(0, -1),    // Sub root (lowest)
    getNote(0, 0),     // Root (main)
    getNote(0, 1),     // Root octave (reinforces root dominance)
    getNote(fifth, 0), // Fifth (supports root, stays low)
    getNote(third, 1)  // Third (color, spread up — quieter perceptually at same gain because root has 3 voices)
  ];
  if (seventh !== null) voicing.push(getNote(seventh, 1));

  return [...new Set(voicing)];
};

// --- Chord Transition Timer ("One-Minute Changes") ---
export function ChordTransitionTimer({ theme: T, chords = ["Am", "G"], duration = 60 }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('chordTimerHistory') || '[]'); } catch { return []; }
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      const entry = { chords: chords.join('→'), count, date: new Date().toISOString().slice(0, 10) };
      const newHistory = [...history, entry].slice(-20);
      setHistory(newHistory);
      localStorage.setItem('chordTimerHistory', JSON.stringify(newHistory));
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const reset = () => { setIsRunning(false); setTimeLeft(duration); setCount(0); };
  const pairKey = chords.join('→');
  const pairHistory = history.filter(h => h.chords === pairKey);
  const best = pairHistory.length ? Math.max(...pairHistory.map(h => h.count)) : 0;

  return (
    <div style={{ background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, marginBottom: 16, fontFamily: T.sans }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>
        Chord Transition Timer — {chords.join(' → ')}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: timeLeft <= 10 && isRunning ? T.coral : T.textDark, fontVariantNumeric: 'tabular-nums', minWidth: 60, textAlign: 'center' }}>
          {timeLeft}
        </div>
        <div style={{ fontSize: 11, color: T.textMed }}>seconds left</div>
        <div style={{ flex: 1 }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: T.gold, lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 10, color: T.textMed, textTransform: 'uppercase', letterSpacing: 1 }}>changes</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {!isRunning && timeLeft === duration && (
          <button onClick={() => setIsRunning(true)} style={{ flex: 1, padding: '10px 0', background: T.gold, color: '#fff', border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer' }}>Start</button>
        )}
        {isRunning && (
          <button onClick={() => setCount(c => c + 1)} style={{ flex: 1, padding: '16px 0', background: T.goldSoft, color: T.goldDark, border: `2px solid ${T.gold}`, borderRadius: T.radius, fontWeight: 800, fontFamily: T.sans, fontSize: 18, cursor: 'pointer' }}>TAP — Clean Change!</button>
        )}
        {(isRunning || timeLeft < duration) && (
          <button onClick={reset} style={{ padding: '10px 16px', background: 'transparent', color: T.textMed, border: `1px solid ${T.borderSoft}`, borderRadius: T.radius, fontWeight: 600, fontFamily: T.sans, fontSize: 12, cursor: 'pointer' }}>Reset</button>
        )}
      </div>
      {timeLeft === 0 && <div style={{ marginTop: 12, padding: 12, background: T.bgCard, borderRadius: T.radius, textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.textDark }}>Done! {count} clean changes in {duration} seconds</div>
        {best > 0 && <div style={{ fontSize: 12, color: T.textMed, marginTop: 4 }}>Personal best: {best} {count > best ? '— NEW RECORD!' : ''}</div>}
      </div>}
      {pairHistory.length > 1 && (
        <div style={{ marginTop: 8, display: 'flex', gap: 4, alignItems: 'flex-end', height: 40 }}>
          {pairHistory.slice(-10).map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${Math.max(4, (h.count / Math.max(...pairHistory.map(x => x.count))) * 36)}px`, background: T.goldSoft, borderRadius: 2, position: 'relative' }} title={`${h.date}: ${h.count}`}>
              <span style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: T.textLight }}>{h.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Genre Metronome Accent Modes ---
export function GenreMetronome({ theme: T, mode = "standard", bpm = 80 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [selectedMode, setSelectedMode] = useState(mode);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const modes = {
    standard:     { label: "Standard",     pattern: [1, 1, 1, 1, 1, 1, 1, 1], desc: "Even clicks 1-2-3-4" },
    backbeat:     { label: "Backbeat",      pattern: [0.3, 0, 1, 0, 0.3, 0, 1, 0], desc: "Accent 2 & 4" },
    "reggae-skank": { label: "Reggae Skank", pattern: [0, 1, 0, 1, 0, 1, 0, 1], desc: "Click ONLY on the 'and'" },
    "one-drop":   { label: "One-Drop",     pattern: [0, 0, 0, 0, 1, 0, 0, 0], desc: "Accent ONLY beat 3" },
    shuffle:      { label: "Shuffle",       pattern: [1, 0, 0.5, 1, 0, 0.5, 1, 0], desc: "Triplet swing feel" }
  };

  const playClick = (volume) => {
    if (!audioCtxRef.current) audioCtxRef.current = Tone.getContext()?.rawContext || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = volume > 0.8 ? 1000 : 800;
    gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    if (isPlaying) {
      const pattern = modes[selectedMode].pattern;
      const msPerEighth = (60000 / bpm) / 2;
      let beat = 0;
      intervalRef.current = setInterval(() => {
        const vol = pattern[beat % pattern.length];
        if (vol > 0) playClick(vol);
        setCurrentBeat(beat % pattern.length);
        beat++;
      }, msPerEighth);
    }
    return () => { clearInterval(intervalRef.current); setCurrentBeat(-1); };
  }, [isPlaying, selectedMode, bpm]);

  const m = modes[selectedMode];
  return (
    <div style={{ background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, marginBottom: 16, fontFamily: T.sans }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>
        Genre Metronome — {m.label} ({bpm} BPM)
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
        {Object.entries(modes).map(([key, val]) => (
          <button key={key} onClick={() => setSelectedMode(key)} style={{
            background: selectedMode === key ? T.gold : 'transparent', color: selectedMode === key ? '#fff' : T.textMed,
            border: `1px solid ${selectedMode === key ? T.gold : T.borderSoft}`, borderRadius: T.radius,
            padding: '4px 10px', fontSize: 11, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer'
          }}>{val.label}</button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: T.textMed, marginBottom: 12 }}>{m.desc}</div>
      {/* Beat visualization */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
        {m.pattern.map((vol, i) => (
          <div key={i} style={{
            flex: 1, height: 24, borderRadius: 3,
            background: currentBeat === i ? (vol > 0 ? T.gold : T.coral + '40') : (vol > 0 ? T.goldSoft : T.bgCard),
            border: `1px solid ${vol > 0 ? T.borderSoft : 'transparent'}`,
            opacity: vol > 0 ? 1 : 0.4,
            transition: 'background 0.05s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, color: T.textLight, fontWeight: 600
          }}>
            {i % 2 === 0 ? (i / 2 + 1) : '&'}
          </div>
        ))}
      </div>
      <button onClick={() => setIsPlaying(!isPlaying)} style={{
        width: '100%', padding: '10px 0', background: isPlaying ? T.coral : T.gold, color: '#fff',
        border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer'
      }}>{isPlaying ? 'Stop' : 'Play'}</button>
    </div>
  );
}

// --- Silence Score (post-recording analysis) ---
export function SilenceScore({ theme: T, target = 0.4 }) {
  const [isRecording, setIsRecording] = useState(false);
  const [silencePercent, setSilencePercent] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const samplesRef = useRef([]);
  const frameRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const ctx = createMicContext();
    audioCtxRef.current = ctx;
    const source = ctx.createMediaStreamSource(stream);
    sourceRef.current = source;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;
    samplesRef.current = [];
    setSilencePercent(null);
    setRecordingTime(0);
    setIsRecording(true);

    const dataArray = new Float32Array(analyser.fftSize);
    const sampleLoop = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getFloatTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i] * dataArray[i];
      const rms = Math.sqrt(sum / dataArray.length);
      samplesRef.current.push(rms);
      frameRef.current = requestAnimationFrame(sampleLoop);
    };
    sampleLoop();
    timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
  };

  const stopRecording = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (sourceRef.current) { try { sourceRef.current.disconnect(); } catch {} sourceRef.current = null; }
    analyserRef.current = null;
    closeMicContext(audioCtxRef.current);
    audioCtxRef.current = null;
    setIsRecording(false);

    const samples = samplesRef.current;
    if (samples.length === 0) return;
    const threshold = 0.01; // RMS below this = silence
    const silentSamples = samples.filter(s => s < threshold).length;
    setSilencePercent(silentSamples / samples.length);
  };

  // Cleanup on unmount
  useEffect(() => { return stopRecording; }, []);

  // Stop mic when app goes to background
  useEffect(() => {
    if (!isRecording) return;
    const handleVisibility = () => { if (document.hidden) stopRecording(); };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isRecording]);

  const pct = silencePercent !== null ? Math.round(silencePercent * 100) : null;
  const targetPct = Math.round(target * 100);
  const hit = pct !== null && pct >= targetPct;

  return (
    <div style={{ background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, marginBottom: 16, fontFamily: T.sans }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>
        Silence Score — Target: {targetPct}%
      </div>
      {pct !== null && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: hit ? T.gold : T.coral, lineHeight: 1 }}>{pct}%</span>
            <span style={{ fontSize: 14, color: T.textMed }}>silence</span>
            {hit && <span style={{ fontSize: 14, color: T.gold, fontWeight: 700 }}>Target hit!</span>}
          </div>
          {/* Visual bar */}
          <div style={{ position: 'relative', height: 12, background: T.bgCard, borderRadius: 6, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', height: '100%', width: `${pct}%`, background: hit ? T.gold : T.coral, borderRadius: 6, transition: 'width 0.5s ease' }} />
            <div style={{ position: 'absolute', height: '100%', width: 2, left: `${targetPct}%`, background: T.textDark, opacity: 0.5 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textLight, marginTop: 2 }}>
            <span>0% (all sound)</span>
            <span style={{ marginLeft: `${targetPct - 5}%` }}>Target</span>
            <span>100% (all silence)</span>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        {!isRecording ? (
          <button onClick={startRecording} style={{ flex: 1, padding: '10px 0', background: T.gold, color: '#fff', border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer' }}>
            {pct !== null ? 'Record Again' : 'Start Recording'}
          </button>
        ) : (
          <button onClick={stopRecording} style={{ flex: 1, padding: '10px 0', background: T.coral, color: '#fff', border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer' }}>
            Stop ({recordingTime}s)
          </button>
        )}
      </div>
    </div>
  );
}

// --- Drone Generator Component ---
export function DroneGenerator({ theme: T, defaultRoot, defaultOctave, defaultTexture, defaultMode, defaultPreset, defaultProgression, defaultBpm, defaultStepDuration, inline, onActiveNotesChange }) {
  // Resolve preset defaults
  const preset = defaultPreset ? DRONE_PRESETS.find(p => p.id === defaultPreset) : null;

  const [playing, setPlaying] = useState(false);
  const [root, setRoot] = useState(defaultRoot || "C");
  const [octave, setOctave] = useState(defaultOctave || 2);
  const [volume, setVolume] = useState(0);
  const [texture, setTexture] = useState(defaultTexture || "analog");
  const [mode, setMode] = useState(defaultMode || (preset ? "cycle" : "manual"));
  const [progression, setProgression] = useState(defaultProgression || (preset ? preset.chords : ["C", "C", "F", "G", "Am", "Am", "F", "G"]));
  const [stepDuration, setStepDuration] = useState(defaultStepDuration || (preset ? preset.stepDuration : "2n"));
  const [bpm, setBpm] = useState(defaultBpm || (preset ? preset.bpm : 80));
  const [activeStep, setActiveStep] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activePreset, setActivePreset] = useState(defaultPreset || null);

  const synthRef = useRef(null);
  const lastWorkerTickRef = useRef(0);
  const refreshRef = useRef(null);
  const octaveRef = useRef(octave);
  const textureRef = useRef(texture);
  const progressionRef = useRef(progression);
  const stepDurationRef = useRef(stepDuration);
  const previousNotesRef = useRef([]);
  const stoppedRef = useRef(false);
  const onActiveNotesChangeRef = useRef(onActiveNotesChange);
  const stepCountRef = useRef(0);
  const userGainRef = useRef(null);
  const workerRef = useRef(null);
  const disposeTimersRef = useRef([]);  // Track pending synth disposal timeouts

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

  // Sync props → state when exercise changes (React reuses component, doesn't remount)
  // Intentionally only depends on the prop — setting same value is a React no-op
  useEffect(() => { if (defaultRoot) setRoot(defaultRoot); }, [defaultRoot]);
  useEffect(() => { if (defaultOctave) setOctave(defaultOctave); }, [defaultOctave]);
  useEffect(() => { if (defaultTexture) setTexture(defaultTexture); }, [defaultTexture]);

  useEffect(() => { octaveRef.current = octave; }, [octave]);
  useEffect(() => { textureRef.current = texture; }, [texture]);
  useEffect(() => { progressionRef.current = progression; }, [progression]);
  useEffect(() => { onActiveNotesChangeRef.current = onActiveNotesChange; });
  // Convert step duration string to milliseconds
  const stepToMs = (sd) => {
    const bpmVal = bpm || 80;
    const beatMs = 60000 / bpmVal;
    if (sd === "4m") return beatMs * 16;
    if (sd === "2m") return beatMs * 8;
    if (sd === "1m") return beatMs * 4;
    if (sd === "2n") return beatMs * 2;
    if (sd === "4n") return beatMs;
    return beatMs * 4;
  };

  useEffect(() => {
    stepDurationRef.current = stepDuration;
    // Update worker interval if sequence is playing
    if (workerRef.current && playing && mode === "cycle") {
      workerRef.current.postMessage({ cmd: 'update', ms: stepToMs(stepDuration) });
    }
  }, [stepDuration]);

  // Handle screen off / app switch — graceful suspend and clean recovery
  useEffect(() => {
    const handleVisibility = async () => {
      if (!playing) return;
      try {
        if (document.hidden) {
          // Screen off — ramp to near-zero so if context freezes, no pop on resume
          if (userGainRef.current) {
            try {
              userGainRef.current.gain.cancelScheduledValues(Tone.now());
              userGainRef.current.gain.rampTo(0.001, 0.05);
            } catch {}
          }
          // Pause worker timer to prevent accumulated ticks during suspension
          if (workerRef.current) {
            workerRef.current.postMessage({ cmd: 'stop' });
          }
        } else {
          // Screen back on — resume AudioContext
          try { await Tone.getContext().rawContext.resume(); } catch {}
          if (Tone.getContext().state !== "running") {
            try { await Tone.start(); } catch {}
            await new Promise(r => setTimeout(r, 300));
            try { await Tone.getContext().rawContext.resume(); } catch {}
          }
          // Restart worker timer fresh (no accumulated ticks)
          if (workerRef.current) {
            lastWorkerTickRef.current = performance.now();
            workerRef.current.postMessage({ cmd: 'start', ms: stepToMs(stepDurationRef.current) });
          }
          // Restore volume and re-trigger chord if it died
          setTimeout(() => {
            try {
              if (userGainRef.current) {
                userGainRef.current.gain.cancelScheduledValues(Tone.now());
                userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.15);
              }
              if (synthRef.current && previousNotesRef.current.length > 0) {
                synthRef.current.releaseAll();
                synthRef.current.triggerAttack(previousNotesRef.current);
              }
            } catch {}
          }, 200);
        }
      } catch {}
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing, volume]);

  // Cleanup on unmount — immediate silence + dispose
  useEffect(() => {
    return () => {
      // Immediate fade-out so navigating exercises doesn't leave audio hanging
      if (userGainRef.current) {
        try {
          userGainRef.current.gain.cancelScheduledValues(Tone.now());
          userGainRef.current.gain.rampTo(0, 0.05);
        } catch {}
      }
      if (synthRef.current) {
        setTimeout(() => { try { synthRef.current.releaseAll(); } catch {} }, 80);
      }
      if (workerRef.current) { workerRef.current.postMessage({ cmd: 'stop' }); terminateWorker(workerRef.current); workerRef.current = null; }
      if (refreshRef.current) { clearInterval(refreshRef.current); refreshRef.current = null; }
      releaseKeepalive();
      clearMediaSession();
    };
  }, []);

  // Recover from OS audio ducking after mic is released.
  // When getUserMedia runs, the OS ducks all output (~6-10dB). Even after the mic
  // context is closed, the OS keeps Tone.js's context in "play-and-record" mode.
  // Fix: briefly cycle Tone.js's context (suspend→resume) with a smooth fade to
  // avoid crackles, then re-trigger the chord at full volume.
  useEffect(() => {
    const handleMicReleased = async () => {
      if (!playing || !synthRef.current || !userGainRef.current) return;
      try {
        const savedNotes = previousNotesRef.current;
        const savedVolume = volume;
        // 1. Fade out smoothly (50ms — inaudible)
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(0, 0.05);
        // 2. After fade: release voices, suspend context
        await new Promise(r => setTimeout(r, 80));
        if (!synthRef.current || stoppedRef.current) return;
        try { synthRef.current.releaseAll(); } catch {}
        const rawCtx = Tone.getContext()?.rawContext;
        if (rawCtx && rawCtx.state === 'running') {
          await rawCtx.suspend();
          // 3. Brief pause so OS exits play-and-record mode
          await new Promise(r => setTimeout(r, 150));
          await rawCtx.resume();
        }
        // 4. Wait for context to stabilize
        await new Promise(r => setTimeout(r, 100));
        if (!synthRef.current || stoppedRef.current) return;
        // 5. Re-trigger chord and fade back in
        if (savedNotes.length > 0) {
          synthRef.current.triggerAttack(savedNotes);
          previousNotesRef.current = savedNotes;
        }
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(Tone.dbToGain(savedVolume), 0.15);
      } catch {}
    };
    window.addEventListener('micReleased', handleMicReleased);
    return () => window.removeEventListener('micReleased', handleMicReleased);
  }, [playing, volume]);

  useEffect(() => {
    let effectSynth = null;
    let effectNodes = [];

    let synth;
    let newNodes = [];

    // Master bus — gain staging balanced for loudness without clipping.
    // 5 correlated voices at -12dB each ≈ -5dB peak → masterGain 0.65 → ~-9dB → 6dB headroom before limiter
    const masterGain = new Tone.Gain(0.65);
    // User volume control — AFTER effects, signal is already at safe levels
    const userGain = new Tone.Gain(Tone.dbToGain(volume));
    // Highpass to kill sub-rumble
    const lowcut = new Tone.Filter(40, "highpass");
    // Safety limiter — catches peaks from effects/resonance, keeps output clean
    const limiter = new Tone.Limiter(-3).toDestination();

    masterGain.chain(userGain, lowcut, limiter);
    userGainRef.current = userGain;
    newNodes.push(masterGain, userGain, lowcut, limiter);

    // Shared reverb bus — one Freeverb for all textures, saves CPU on mobile.
    // Reverb return has its own gain (0.5) to prevent wet signal from overloading masterGain.
    const reverbReturn = new Tone.Gain(0.5).connect(masterGain);
    const reverb = new Tone.Freeverb({ roomSize: 0.6, dampening: 2500 }).connect(reverbReturn);
    const reverbSend = new Tone.Gain(0); // default dry, each texture sets its level
    reverbSend.connect(reverb);
    newNodes.push(reverbReturn, reverb, reverbSend);

    // Helper: connect synth chain's last effect to both dry path and reverb send
    const connectWithReverb = (source, sendLevel, roomSz, damp) => {
      source.connect(masterGain);    // dry path
      source.connect(reverbSend);    // wet path
      reverbSend.gain.value = sendLevel;
      reverb.roomSize.value = roomSz;  // roomSize is a Signal — use .value
      reverb.dampening = damp;         // dampening is a plain setter — no .value
    };

    if (texture === "analog") {
      // Analog pad: classic synth — sawtooth through filter with slow sweep
      const chorus = new Tone.Chorus({ frequency: 0.5, delayTime: 3, depth: 0.4 }).start();
      const filter = new Tone.Filter(600, "lowpass").connect(chorus);
      connectWithReverb(chorus, 0.3, 0.5, 3000);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,  // sawtooth has more harmonic energy than sine/triangle
        oscillator: { type: "sawtooth" },
        envelope: { attack: 2.5, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.05, 350, 650).connect(filter.frequency).start();
      newNodes.push(chorus, filter, lfo);
    }
    else if (texture === "choir") {
      // Ethereal choir: multiple detuned sine voices = natural chorus, breathy
      const filter = new Tone.Filter(1800, "lowpass");
      connectWithReverb(filter, 0.55, 0.85, 1500);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -17,  // fat 3-copy: -5dB louder than single osc
        oscillator: { type: "fatsine", spread: 30, count: 3 },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(filter);
    }
    else if (texture === "organ") {
      // Harmonium: layered sine partials like organ drawbars (16', 8', 4', 2⅔')
      const chorus = new Tone.Chorus({ frequency: 1, delayTime: 3, depth: 0.4 }).start();
      const filter = new Tone.Filter(2500, "lowpass").connect(chorus);
      connectWithReverb(chorus, 0.4, 0.5, 3500);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -16,  // custom partials sum louder than single sine
        oscillator: { type: "custom", partials: [1, 0.8, 0, 0.4, 0, 0.2, 0, 0.1] },
        envelope: { attack: 1.5, decay: 0.1, sustain: 1, release: 1.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(chorus, filter);
    }
    else if (texture === "pure") {
      // Pure sine — clean reference tone, no processing
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 10;
    }
    else if (texture === "strings") {
      // String section: fat detuned sawtooths = instant ensemble, heavily filtered
      const filter = new Tone.Filter(500, "lowpass");
      connectWithReverb(filter, 0.5, 0.7, 2500);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -17,  // fat 3-copy sawtooth: very loud before filter
        oscillator: { type: "fatsawtooth", spread: 25, count: 3 },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.04, 350, 600).connect(filter.frequency).start();
      newNodes.push(filter, lfo);
    }
    else if (texture === "tanpura") {
      // Tanpura: gentle FM beating with phaser shimmer
      const phaser = new Tone.Phaser({ frequency: 0.08, octaves: 2, baseFrequency: 200 });
      const filter = new Tone.Filter(1500, "lowpass").connect(phaser);
      connectWithReverb(phaser, 0.35, 0.5, 3000);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,  // FM adds sidebands
        harmonicity: 1.003, modulationIndex: 0.8,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(phaser, filter);
    }
    else if (texture === "crystal") {
      // Crystal bowl: FM shimmer with massive reverb wash
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,  // FM adds sidebands
        harmonicity: 1.005, modulationIndex: 1.5,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 }
      });
      connectWithReverb(synth, 0.7, 0.95, 1000);
      synth.maxPolyphony = 10;
    }
    else if (texture === "lofi-tape") {
      // Lo-fi tape: warm triangle with noticeable pitch wobble + tape saturation
      const vibrato = new Tone.Vibrato({ frequency: 0.5, depth: 0.06 });
      const filter = new Tone.Filter(900, "lowpass").connect(vibrato);
      connectWithReverb(vibrato, 0.25, 0.4, 2000);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -15,  // fat 2-copy: ~3dB louder than single osc
        oscillator: { type: "fattriangle", spread: 15, count: 2 },
        envelope: { attack: 1.5, decay: 0.3, sustain: 0.85, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(vibrato, filter);
    }
    else if (texture === "surf-tremolo") {
      // Surf tremolo: triangle with gentle amplitude shimmer + spring reverb feel
      const tremolo = new Tone.Tremolo(3, 0.3).start();
      const filter = new Tone.Filter(1200, "lowpass").connect(tremolo);
      connectWithReverb(tremolo, 0.5, 0.8, 4000);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "triangle" },
        envelope: { attack: 1.5, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(tremolo, filter);
    }
    else if (texture === "vintage-keys") {
      // Vintage keys: FM electric piano character — bell-like overtones, chorus width
      const chorus = new Tone.Chorus({ frequency: 0.6, delayTime: 4, depth: 0.5 }).start();
      const filter = new Tone.Filter(1200, "lowpass").connect(chorus);
      connectWithReverb(chorus, 0.35, 0.5, 3000);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,  // FM adds sidebands
        harmonicity: 3, modulationIndex: 0.6,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: { attack: 1, decay: 0.4, sustain: 0.7, release: 2 },
        modulationEnvelope: { attack: 1, decay: 0.8, sustain: 0.3, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(chorus, filter);
    }
    else if (texture === "dub-sub") {
      // Dub sub: deep but audible — sub sine with harmonic overtone layer
      const filter = new Tone.Filter(300, "lowpass", -12);
      connectWithReverb(filter, 0.15, 0.3, 2000);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,  // FM adds sidebands
        harmonicity: 1, modulationIndex: 1.2,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 0.8, decay: 0.2, sustain: 1, release: 1 },
        modulationEnvelope: { attack: 0.8, decay: 0.2, sustain: 1, release: 1 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(filter);
    }
    else if (texture === "warm") {
      // Warm pad: triangle + slow LFO filter + chorus — the benchmark
      const chorus = new Tone.Chorus({ frequency: 0.8, delayTime: 4, depth: 0.6 }).start();
      const filter = new Tone.Filter(700, "lowpass").connect(chorus);
      connectWithReverb(chorus, 0.4, 0.6, 2500);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "triangle" },
        envelope: { attack: 2.5, decay: 0.3, sustain: 0.9, release: 2.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.06, 400, 800).connect(filter.frequency).start();
      newNodes.push(chorus, filter, lfo);
    }
    else if (texture === "ocean") {
      // Ocean: ambient wash — fat triangle for body, massive reverb, very low filter
      const filter = new Tone.Filter(500, "lowpass");
      connectWithReverb(filter, 0.7, 0.95, 800);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -17,  // fat 3-copy: -5dB louder than single osc
        oscillator: { type: "fattriangle", spread: 40, count: 3 },
        envelope: { attack: 4, decay: 0.1, sustain: 1, release: 3 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.03, 300, 600).connect(filter.frequency).start();
      newNodes.push(filter, lfo);
    }
    else if (texture === "breath") {
      // Breath: ultra-minimal meditation drone — soft sine, heavy reverb, barely there
      const filter = new Tone.Filter(400, "lowpass");
      connectWithReverb(filter, 0.65, 0.9, 1000);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "sine" },
        envelope: { attack: 5, decay: 0.1, sustain: 1, release: 4 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(filter);
    }

    // Fallback for unknown textures — default to pure sine
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 10;
    }

    effectSynth = synth;
    effectNodes = newNodes;
    synthRef.current = synth;

    // Re-trigger the sound on the new synth if currently playing.
    // Without this, switching textures mid-play causes silence until next trigger.
    if (playing) {
      if (mode === "cycle") {
        // In cycle mode, re-trigger whatever chord was playing before the switch
        const savedNotes = previousNotesRef.current;
        if (savedNotes && savedNotes.length > 0) {
          synth.triggerAttack(savedNotes);
        }
      } else {
        // Manual/single mode
        const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
        if (chordNotes) synth.triggerAttack(chordNotes);
        previousNotesRef.current = chordNotes || [];
      }
    }

    return () => {
      // Cancel any pending disposal timers from previous rapid switches
      disposeTimersRef.current.forEach(({ timer, synth: s, nodes }) => {
        clearTimeout(timer);
        try { s.releaseAll(); } catch {}
        try { s.dispose(); } catch {}
        nodes.forEach(node => {
          try { if (node.stop) node.stop(); } catch {}
          try { node.dispose(); } catch {}
        });
      });
      disposeTimersRef.current = [];

      // Immediate silence — release voices and disconnect everything right away.
      // The new texture's useEffect creates a fresh audio chain, so the old one
      // must be torn down quickly to avoid two chains fighting for the destination.
      if (effectSynth) {
        try { effectSynth.releaseAll(); } catch {}
      }
      // Quick dispose after a microtask to let releaseAll take effect
      const disposeTimer = setTimeout(() => {
        if (effectSynth) {
          try { effectSynth.dispose(); } catch {}
        }
        effectNodes.forEach(node => {
          try { if (node.stop) node.stop(); } catch {}
          try { node.dispose(); } catch {}
        });
        disposeTimersRef.current = disposeTimersRef.current.filter(e => e.timer !== disposeTimer);
      }, 100);
      disposeTimersRef.current.push({ timer: disposeTimer, synth: effectSynth, nodes: effectNodes });
    };
  }, [texture]); // re-run only when texture changes

  useEffect(() => {
    if (userGainRef.current) {
      try { userGainRef.current.gain.cancelScheduledValues(Tone.now()); } catch {}
      userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.1);
    }
  }, [volume]);

  const toggleDrone = async () => {
    if (!synthRef.current) return;
    // Ensure audio context is running (may need user gesture on mobile)
    if (Tone.context.state !== "running") {
      try { await Tone.start(); } catch {}
      try { await Tone.context.resume(); } catch {}
    }

    if (playing) {
      stoppedRef.current = true;
      // Stop worker timer (NOT Tone.Transport — drone uses its own timer)
      if (workerRef.current) {
        workerRef.current.postMessage({ cmd: 'stop' });
        terminateWorker(workerRef.current);
        workerRef.current = null;
      }
      // Stop periodic refresh
      if (refreshRef.current) { clearInterval(refreshRef.current); refreshRef.current = null; }
      // Smooth fade out to prevent click, then release voices
      if (userGainRef.current) {
        try {
          userGainRef.current.gain.cancelScheduledValues(Tone.now());
          userGainRef.current.gain.rampTo(0, 0.1);
        } catch {}
      }
      setTimeout(() => {
        try { synthRef.current?.releaseAll(); } catch {}
        previousNotesRef.current = [];
      }, 120);
      // Stop background audio keepalive and clear media session
      releaseKeepalive();
      clearMediaSession();
      setPlaying(false);
      onActiveNotesChangeRef.current?.({ notes: [], label: "" });
      setActiveStep(-1);
    } else {
      stoppedRef.current = false;
      setEditingIndex(null);
      if (mode === "cycle") {
        const pRef = progressionRef.current;
        if (pRef.length === 0) return;

        previousNotesRef.current = [];
        stepCountRef.current = 0;

        // Play a chord at the current step (reads from refs, always current)
        const playStep = () => {
          if (stoppedRef.current || !synthRef.current || synthRef.current.disposed) return;
          const currentProg = progressionRef.current;
          if (currentProg.length === 0) return;

          const idx = stepCountRef.current % currentProg.length;
          const rawChord = currentProg[idx];
          const match = rawChord.match(/^[A-G][#♭b]?/);
          const r = match ? match[0].replace('b', '♭') : "C";
          const chordNotes = parseChordToNotes(rawChord, octaveRef.current, "chord");

          if (chordNotes) {
            // Release all → immediately attack new chord. The envelope handles
            // the crossfade: old notes fade via release tail, new notes ramp via attack.
            // Works for ANY chord combination — no note diffing needed.
            synthRef.current.releaseAll();
            synthRef.current.triggerAttack(chordNotes);
            previousNotesRef.current = chordNotes;
          } else {
            synthRef.current.releaseAll();
            previousNotesRef.current = [];
          }

          // Visual update
          setRoot(r);
          setActiveStep(idx);
          onActiveNotesChangeRef.current?.({ notes: chordNotes || [], label: rawChord });

          stepCountRef.current++;
        };

        // Smooth fade in to prevent click
        if (userGainRef.current) { userGainRef.current.gain.value = 0; }
        // Play first chord immediately
        playStep();
        if (userGainRef.current) { userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.05); }
        // Web Worker timer — immune to background tab throttling, independent of Tone.Transport
        workerRef.current = createTimerWorker();
        lastWorkerTickRef.current = performance.now();
        workerRef.current.onmessage = () => {
          // Debounce: skip rapid-fire catch-up ticks after screen-off resume
          const now = performance.now();
          const minGap = stepToMs(stepDurationRef.current) * 0.5;
          if (now - lastWorkerTickRef.current < minGap) return;
          lastWorkerTickRef.current = now;
          playStep();
        };
        workerRef.current.postMessage({ cmd: 'start', ms: stepToMs(stepDurationRef.current) });

      } else {
        // Smooth fade in to prevent click
        if (userGainRef.current) { userGainRef.current.gain.value = 0; }
        const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
        if (chordNotes) synthRef.current.triggerAttack(chordNotes);
        if (userGainRef.current) { userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.05); }
        previousNotesRef.current = chordNotes || [];
        onActiveNotesChangeRef.current?.({ notes: chordNotes || [], label: root });
      }
      // Periodic refresh: re-trigger held notes every 3 min to prevent oscillator drift / voice degradation.
      // In cycle mode the Worker already re-triggers regularly, so this is only for manual/single.
      if (refreshRef.current) clearInterval(refreshRef.current);
      if (mode !== "cycle") {
        refreshRef.current = setInterval(() => {
          if (stoppedRef.current || !synthRef.current || synthRef.current.disposed) return;
          const notes = previousNotesRef.current;
          if (notes.length > 0) {
            synthRef.current.releaseAll();
            synthRef.current.triggerAttack(notes);
          }
        }, 3 * 60 * 1000);
      }
      // Start background audio keepalive so screen-off doesn't kill the AudioContext
      acquireKeepalive();
      setMediaSession('Harmonic Drone', 'Practice', {
        pause: () => toggleDrone(),
        play: () => toggleDrone(),
      });
      setPlaying(true);
    }
  };

  const changeRoot = (n) => {
    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(n, octaveRef.current, mode === "single" ? "single" : "chord");
      if (chordNotes && synthRef.current) {
        try {
          synthRef.current.releaseAll();
          synthRef.current.triggerAttack(chordNotes);
          previousNotesRef.current = chordNotes;
        } catch {}
        onActiveNotesChangeRef.current?.({ notes: chordNotes, label: n });
      }
    }
    setRoot(n);
  };

  const changeOctave = (oct) => {
    setOctave(oct);
    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(root, oct, mode === "single" ? "single" : "chord");
      if (chordNotes && synthRef.current) {
        try {
          synthRef.current.releaseAll();
          synthRef.current.triggerAttack(chordNotes);
          previousNotesRef.current = chordNotes;
        } catch {}
        onActiveNotesChangeRef.current?.({ notes: chordNotes, label: root });
      }
    }
  };

  const getParsedChord = (chordStr) => {
    if (!chordStr) return { base: "C", ext: "" };
    // match base like C, F#m, Bbm. Exclude 'm' if it's part of 'maj'
    const match = chordStr.trim().match(/^([A-G][#b♭]?(?:m(?!aj))?)(.*)$/i);
    if (match) {
      return { base: match[1], ext: match[2] || "" };
    }
    return { base: "C", ext: "" };
  };

  return (
    <div style={{
      position: "relative",
      background: playing ? T.bgSoft : T.bgCard, 
      border: `1px solid ${playing ? T.plum : T.borderSoft}`,
      boxShadow: playing ? `inset 0 2px 10px ${T.bgSoft}, 0 0 20px ${T.plum}20` : T.shadow,
      padding: "28px 24px", textAlign: "center", borderRadius: T.radius,
      transition: "all 0.4s", overflow: "hidden", margin: "10px 0"
    }}>
      {/* Subtle SVG Grid Background */}
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.08 }}>
        <pattern id="drone-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={T.plum} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#drone-grid)" />
      </svg>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 16, color: playing ? T.plum : T.textDark, fontWeight: 800, letterSpacing: 1, fontFamily: T.sans, marginBottom: 4, transition: "color 0.4s" }}>
          Drone
        </div>
        <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans, marginBottom: 24, fontStyle: "italic" }}>
          Harmonic foundation for ear training
        </div>
        
        {/* Texture Selector — Grouped */}
        <div style={{ maxWidth: 460, margin: "0 auto 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "FOUNDATIONAL", textures: [
              { id: "pure", label: "Pure Sine" },
              { id: "warm", label: "Warm Pad" },
              { id: "breath", label: "Breath" },
              { id: "ocean", label: "Ocean" }
            ]},
            { label: "TEXTURAL", textures: [
              { id: "analog", label: "Analog Pad" },
              { id: "strings", label: "Strings" },
              { id: "crystal", label: "Crystal Bowl" },
              { id: "lofi-tape", label: "Lo-Fi Tape" }
            ]},
            { label: "WORLD", textures: [
              { id: "tanpura", label: "Tanpura" },
              { id: "choir", label: "Ethereal Choir" },
              { id: "organ", label: "Harmonium" },
              { id: "surf-tremolo", label: "Surf Tremolo" }
            ]},
            { label: "KEYS & SUB", textures: [
              { id: "vintage-keys", label: "Vintage Keys" },
              { id: "dub-sub", label: "Dub Sub" }
            ]}
          ].map(group => (
            <div key={group.label}>
              <div style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, textAlign: "left" }}>
                {group.label}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {group.textures.map(t => (
                  <button key={t.id} onClick={() => setTexture(t.id)} style={{
                    background: texture === t.id ? T.plum : T.bgSoft,
                    border: `1px solid ${texture === t.id ? T.plum : T.border}`,
                    color: texture === t.id ? "#fff" : T.textMed,
                    padding: "8px 16px", borderRadius: T.radius, fontSize: 11, fontWeight: 700,
                    cursor: "pointer", fontFamily: T.sans, letterSpacing: 0.5,
                    boxShadow: texture === t.id ? `0 4px 12px ${T.plum}40` : "none",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                  onMouseOver={e => { if(texture !== t.id) { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; } }}
                  onMouseOut={e => { if(texture !== t.id) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMed; } }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mode Selector */}
        <div style={{ display: "inline-flex", background: T.bgSoft, borderRadius: T.radiusMd, padding: 4, border: `1px solid ${T.border}`, marginBottom: 32 }}>
          <button onClick={() => { setMode("single"); if(playing) toggleDrone(); }} style={{
            background: mode === "single" ? T.bgCard : "transparent",
            color: mode === "single" ? T.textDark : T.textMed,
            boxShadow: mode === "single" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Single Note</button>
          <button onClick={() => { setMode("manual"); if(playing) toggleDrone(); }} style={{
            background: mode === "manual" ? T.bgCard : "transparent",
            color: mode === "manual" ? T.textDark : T.textMed,
            boxShadow: mode === "manual" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Chords</button>
          <button onClick={() => { setMode("cycle"); if(playing) toggleDrone(); }} style={{
            background: mode === "cycle" ? T.bgCard : "transparent",
            color: mode === "cycle" ? T.textDark : T.textMed,
            boxShadow: mode === "cycle" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Sequence</button>
        </div>

      {mode === "single" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, maxWidth: 360, margin: "0 auto 24px" }}>
          {notes.map(n => {
            const isActive = root === n;
            return (
              <button key={n} onClick={() => changeRoot(n)} style={{
                width: "100%", aspectRatio: "1", borderRadius: T.radius,
                background: isActive ? T.plum : T.bgSoft,
                border: `1px solid ${isActive ? T.plum : T.borderSoft}`,
                color: isActive ? "#fff" : T.textMed,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isActive ? `0 4px 12px ${T.plum}40` : "none"
              }}
              onMouseOver={e => { if(!isActive) { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; } e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseOut={e => { if(!isActive) { e.currentTarget.style.borderColor = T.borderSoft; e.currentTarget.style.color = T.textMed; } e.currentTarget.style.transform = "scale(1)"; }}
              >
                {n}
              </button>
            );
          })}
        </div>
      ) : mode === "manual" ? (
        <div style={{ marginBottom: 40 }}>
          <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto 40px" }}>
            {/* SVG Background for aesthetic celestial map look */}
            <svg width="280" height="280" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.2 }}>
              <circle cx="140" cy="140" r="115" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="140" cy="140" r="70" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="2 4" />
              {CIRCLE_OF_FIFTHS.map((_, i) => {
                const rad = ((i * 30) - 90) * (Math.PI / 180);
                return (
                  <line 
                    key={i}
                    x1={140 + Math.cos(rad) * 70} 
                    y1={140 + Math.sin(rad) * 70} 
                    x2={140 + Math.cos(rad) * 115} 
                    y2={140 + Math.sin(rad) * 115} 
                    stroke={T.textMed} strokeWidth="1" 
                  />
                );
              })}
            </svg>

            <div style={{ 
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
              width: 86, height: 86, borderRadius: "50%", background: playing ? T.bgSoft : T.bgCard,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: playing ? `inset 0 2px 10px ${T.bgSoft}, 0 0 24px ${T.plum}50` : `inset 0 2px 10px ${T.bgSoft}, 0 4px 16px rgba(0,0,0,0.1)`,
              border: `2px solid ${playing ? T.plum : T.borderSoft}`,
              transition: "all 0.4s"
            }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: playing ? T.plum : T.textMed, fontFamily: T.sans, lineHeight: 1.1 }}>{root}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textAlign: "center", padding: "0 4px" }}>
                {getChordSpelling(root)}
              </div>
            </div>

            {CIRCLE_OF_FIFTHS.map(({ major, minor, angle }) => {
              const rad = (angle - 90) * (Math.PI / 180);
              const outerX = 140 + Math.cos(rad) * 115;
              const outerY = 140 + Math.sin(rad) * 115;
              const innerX = 140 + Math.cos(rad) * 70;
              const innerY = 140 + Math.sin(rad) * 70;
              
              const { base: currentBase, ext: currentExt } = getParsedChord(root);
              const isMajorActive = currentBase === major;
              const isMinorActive = currentBase === minor;

              return (
                <React.Fragment key={major}>
                  <button onClick={() => changeRoot(`${major}${currentExt}`)} style={{
                    position: "absolute", left: outerX, top: outerY, transform: "translate(-50%, -50%)",
                    width: 42, height: 42, borderRadius: "50%",
                    background: isMajorActive ? T.plum : T.bgSoft,
                    color: isMajorActive ? "#fff" : T.textDark,
                    border: `1px solid ${isMajorActive ? T.plum : T.border}`,
                    fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: isMajorActive ? `0 0 16px ${T.plum}80, 0 4px 8px rgba(0,0,0,0.2)` : `0 2px 6px rgba(0,0,0,0.05)`,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: isMajorActive ? 10 : 1
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                  >{major}</button>
                  
                  <button onClick={() => {
                    let validExt = currentExt;
                    if (validExt === 'maj7' || validExt === 'aug') validExt = '';
                    changeRoot(`${minor}${validExt}`)
                  }} style={{
                    position: "absolute", left: innerX, top: innerY, transform: "translate(-50%, -50%)",
                    width: 36, height: 36, borderRadius: "50%",
                    background: isMinorActive ? T.coral : T.bgCard,
                    color: isMinorActive ? "#fff" : T.textMed,
                    border: `1px solid ${isMinorActive ? T.coral : T.borderSoft}`,
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: isMinorActive ? `0 0 12px ${T.coral}80, 0 4px 6px rgba(0,0,0,0.2)` : `0 2px 4px rgba(0,0,0,0.05)`,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: isMinorActive ? 10 : 1
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                  >{minor}</button>
                </React.Fragment>
              )
            })}
          </div>

          {/* Quality Extenders */}
          <div style={{ textAlign: "center", marginBottom: 12, fontSize: 11, fontWeight: 800, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
            Extensions / Modifications
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {(() => {
              const { base: currentBase, ext: currentExt } = getParsedChord(root);
              const isMinor = currentBase.endsWith('m');
              const exts = isMinor ? [
                { label: "None", val: "" },
                { label: "7", val: "7" },
                { label: "Sus2", val: "sus2" },
                { label: "Sus4", val: "sus4" },
                { label: "Dim", val: "dim" }
              ] : [
                { label: "None", val: "" },
                { label: "7", val: "7" },
                { label: "Maj7", val: "maj7" },
                { label: "Sus2", val: "sus2" },
                { label: "Sus4", val: "sus4" },
                { label: "Dim", val: "dim" },
                { label: "Aug", val: "aug" }
              ];
              return exts.map(ext => {
                const isExtActive = currentExt === ext.val;
                return (
                  <button key={ext.label} onClick={() => {
                    changeRoot(`${currentBase}${ext.val}`);
                  }} style={{
                    padding: "8px 16px", borderRadius: T.radius,
                    background: isExtActive ? T.textDark : T.bgSoft, 
                    color: isExtActive ? "#ffffff" : T.textDark, 
                    border: `1px solid ${isExtActive ? T.textDark : T.border}`,
                    fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                    transition: "all 0.2s", boxShadow: isExtActive ? T.sm : "none"
                  }}>
                    {ext.label}
                  </button>
                )
              });
            })()}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 460, margin: "0 auto 24px", background: "#ffffff", padding: "24px", borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow }}>

          {/* Genre Preset Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, textAlign: "center" }}>
              Presets
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {DRONE_PRESETS.map(p => {
                const isActive = activePreset === p.id;
                return (
                  <button key={p.id} onClick={() => {
                    if (playing) return;
                    setProgression([...p.chords]);
                    setBpm(p.bpm);
                    setStepDuration(p.stepDuration);
                    setActivePreset(p.id);
                    setEditingIndex(null);
                  }} style={{
                    padding: "8px 16px", borderRadius: T.radius, fontSize: 11, fontWeight: 700,
                    background: isActive ? T.plum : T.bgSoft,
                    color: isActive ? "#fff" : T.textDark,
                    border: `1px solid ${isActive ? T.plum : T.border}`,
                    cursor: playing ? "not-allowed" : "pointer", fontFamily: T.sans,
                    opacity: playing ? 0.5 : 1,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isActive ? `0 4px 12px ${T.plum}40` : "none"
                  }}
                  onMouseOver={e => { if(!isActive && !playing) { e.currentTarget.style.borderColor = T.textMed; } }}
                  onMouseOut={e => { if(!isActive && !playing) { e.currentTarget.style.borderColor = T.border; } }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progression Sequence Visualizer */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16, minHeight: 40 }}>
            {progression.length === 0 ? (
              <div style={{ fontSize: 13, color: T.textMuted, fontStyle: "italic", fontFamily: T.sans, width: "100%", textAlign: "center", alignSelf: "center" }}>Empty sequence. Add a chord.</div>
            ) : (
              progression.map((chord, i) => {
                const isActive = playing && i === activeStep;
                const isEditing = i === editingIndex;
                return (
                  <button key={i} onClick={() => setEditingIndex(isEditing ? null : i)} style={{
                    padding: "10px 16px", borderRadius: T.radius, fontSize: 15, fontWeight: 800, fontFamily: T.sans,
                    background: isActive ? T.plum : (isEditing ? "#ffffff" : T.bgSoft),
                    color: isActive ? "#fff" : (isEditing ? T.textDark : T.textDark),
                    border: `2px solid ${isActive ? T.plum : (isEditing ? T.coral : T.border)}`,
                    boxShadow: isActive ? `0 4px 16px ${T.plum}60` : "none",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}>
                    {chord}
                  </button>
                );
              })
            )}
            <button onClick={() => {
               const newProg = [...progression, "C"];
               setProgression(newProg);
               setEditingIndex(newProg.length - 1);
               setActivePreset(null);
            }} style={{
               padding: "10px 16px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
               background: T.bgSoft, color: T.textDark, border: `2px dashed ${T.border}`, cursor: "pointer",
               transition: "all 0.2s"
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = T.textMed; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = T.border; }}
            >+ Add</button>

            {progression.length > 0 && (
              <button onClick={() => {
                setProgression([]);
                setEditingIndex(null);
                setActivePreset(null);
              }} style={{
                padding: "10px 16px", borderRadius: T.radius, fontSize: 12, fontWeight: 800, fontFamily: T.sans,
                background: "transparent", color: T.coral, border: `1px solid ${T.coral}40`, cursor: "pointer",
                transition: "all 0.2s", letterSpacing: 1, textTransform: "uppercase"
              }}
              onMouseOver={e => { e.currentTarget.style.background = T.coral + "10"; e.currentTarget.style.borderColor = T.coral; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.coral + "40"; }}
              >Clear</button>
            )}

            {progression.length > 0 && (
              <div style={{ display: "flex", gap: 4, marginLeft: "auto", alignSelf: "center", borderLeft: `1px solid ${T.border}`, paddingLeft: 12 }}>
                <button onClick={() => {
                  setProgression(progression.map(c => transposeChord(c, -1)));
                  setActivePreset(null);
                }} style={{
                  padding: "8px 12px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
                  background: T.bgSoft, color: T.textMed, border: `1px solid ${T.border}`, cursor: "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                }} title="Transpose Down (Half-Step)">-</button>
                <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, alignSelf: "center", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: T.sans, margin: "0 4px" }}>Key</div>
                <button onClick={() => {
                  setProgression(progression.map(c => transposeChord(c, 1)));
                  setActivePreset(null);
                }} style={{
                  padding: "8px 12px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
                  background: T.bgSoft, color: T.textMed, border: `1px solid ${T.border}`, cursor: "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                }} title="Transpose Up (Half-Step)">+</button>
              </div>
            )}
          </div>
          

          <div style={{ fontSize: 12, color: T.textMuted, textAlign: "center", marginBottom: editingIndex !== null ? 24 : 0, fontFamily: T.sans, fontStyle: "italic" }}>
             {editingIndex === null ? "Click a chord block above to edit it" : ""}
          </div>

          {/* Inline Chord Editor Modal */}
          {editingIndex !== null && (
            <div ref={el => { if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100); }} style={{ marginBottom: 24, background: T.bgSoft, padding: "24px", borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
                  Editing Step {editingIndex + 1}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => {
                    const newProg = [...progression];
                    newProg.splice(editingIndex, 1);
                    setProgression(newProg);
                    setEditingIndex(null);
                    setActivePreset(null);
                  }} style={{ fontSize: 12, color: T.coral, background: T.bgSoft, border: "none", cursor: "pointer", fontWeight: 800, fontFamily: T.sans, padding: "6px 12px", borderRadius: T.radius }}>
                    Remove
                  </button>
                  <button onClick={() => setEditingIndex(null)} style={{ fontSize: 12, color: T.plum, background: T.bgSoft, border: "none", cursor: "pointer", fontWeight: 800, fontFamily: T.sans, padding: "6px 12px", borderRadius: T.radius }}>
                    Done
                  </button>
                </div>
              </div>
              
              {/* Circle of Fifths Selector */}
              <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto 40px" }}>
                
                {/* SVG Background for aesthetic celestial map look */}
                <svg width="280" height="280" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.2 }}>
                  <circle cx="140" cy="140" r="115" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="140" cy="140" r="70" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="2 4" />
                  {CIRCLE_OF_FIFTHS.map((_, i) => {
                    const rad = ((i * 30) - 90) * (Math.PI / 180);
                    return (
                      <line 
                        key={i}
                        x1={140 + Math.cos(rad) * 70} 
                        y1={140 + Math.sin(rad) * 70} 
                        x2={140 + Math.cos(rad) * 115} 
                        y2={140 + Math.sin(rad) * 115} 
                        stroke={T.textMed} strokeWidth="1" 
                      />
                    );
                  })}
                </svg>

                <div style={{ 
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
                  width: 86, height: 86, borderRadius: "50%", background: "#ffffff",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  boxShadow: `inset 0 2px 10px ${T.bgSoft}, 0 4px 16px rgba(0,0,0,0.1)`,
                  border: `2px solid ${T.borderSoft}`
                }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: T.plum, fontFamily: T.sans, lineHeight: 1.1 }}>{progression[editingIndex] || "C"}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textAlign: "center", padding: "0 4px" }}>
                    {getChordSpelling(progression[editingIndex] || "C")}
                  </div>
                </div>

                {CIRCLE_OF_FIFTHS.map(({ major, minor, angle }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const outerX = 140 + Math.cos(rad) * 115;
                  const outerY = 140 + Math.sin(rad) * 115;
                  const innerX = 140 + Math.cos(rad) * 70;
                  const innerY = 140 + Math.sin(rad) * 70;
                  
                  const currentChord = progression[editingIndex] || "C";
                  const { base: currentBase, ext: currentExt } = getParsedChord(currentChord);
                  
                  const isMajorActive = currentBase === major;
                  const isMinorActive = currentBase === minor;

                  return (
                    <React.Fragment key={major}>
                      <button onClick={() => {
                        const newProg = [...progression];
                        newProg[editingIndex] = `${major}${currentExt}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        position: "absolute", left: outerX, top: outerY, transform: "translate(-50%, -50%)",
                        width: 42, height: 42, borderRadius: "50%",
                        background: isMajorActive ? T.plum : T.bgSoft,
                        color: isMajorActive ? "#fff" : T.textDark,
                        border: `1px solid ${isMajorActive ? T.plum : T.border}`,
                        fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                        boxShadow: isMajorActive ? `0 0 16px ${T.plum}80, 0 4px 8px rgba(0,0,0,0.2)` : `0 2px 6px rgba(0,0,0,0.05)`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: isMajorActive ? 10 : 1
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                      >{major}</button>
                      
                      <button onClick={() => {
                        const newProg = [...progression];
                        let validExt = currentExt;
                        if (validExt === 'maj7' || validExt === 'aug') validExt = '';
                        newProg[editingIndex] = `${minor}${validExt}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        position: "absolute", left: innerX, top: innerY, transform: "translate(-50%, -50%)",
                        width: 36, height: 36, borderRadius: "50%",
                        background: isMinorActive ? T.coral : T.bgSoft,
                        color: isMinorActive ? "#fff" : T.textDark,
                        border: `1px solid ${isMinorActive ? T.coral : T.borderSoft}`,
                        fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                        boxShadow: isMinorActive ? `0 0 12px ${T.coral}80, 0 4px 6px rgba(0,0,0,0.2)` : `0 2px 4px rgba(0,0,0,0.05)`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: isMinorActive ? 10 : 1
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                      >{minor}</button>
                    </React.Fragment>
                  )
                })}
              </div>

              {/* Quality Extenders */}
              <div style={{ textAlign: "center", marginBottom: 12, fontSize: 11, fontWeight: 800, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
                Extensions / Modifications
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {(() => {
                  const currentChord = progression[editingIndex] || "C";
                  const { base: currentBase, ext: currentExt } = getParsedChord(currentChord);
                  const isMinor = currentBase.endsWith('m');
                  const exts = isMinor ? [
                    { label: "None", val: "" },
                    { label: "7", val: "7" },
                    { label: "Sus2", val: "sus2" },
                    { label: "Sus4", val: "sus4" },
                    { label: "Dim", val: "dim" }
                  ] : [
                    { label: "None", val: "" },
                    { label: "7", val: "7" },
                    { label: "Maj7", val: "maj7" },
                    { label: "Sus2", val: "sus2" },
                    { label: "Sus4", val: "sus4" },
                    { label: "Dim", val: "dim" },
                    { label: "Aug", val: "aug" }
                  ];
                  return exts.map(ext => {
                    const isExtActive = currentExt === ext.val;
                    return (
                      <button key={ext.label} onClick={() => {
                        const newProg = [...progression];
                        newProg[editingIndex] = `${currentBase}${ext.val}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        padding: "8px 16px", borderRadius: T.radius,
                        background: isExtActive ? T.textDark : T.bgSoft, 
                        color: isExtActive ? "#ffffff" : T.textDark, 
                        border: `1px solid ${isExtActive ? T.textDark : T.border}`,
                        fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                        transition: "all 0.2s", boxShadow: isExtActive ? T.sm : "none"
                      }}>
                        {ext.label}
                      </button>
                    )
                  });
                })()}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Universal Control Deck & Engine Starter */}
      <div style={{ maxWidth: 460, margin: "0 auto", background: T.bgCard, borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow, overflow: 'hidden' }}>
        
        {/* Settings Deck */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {/* Octave Base */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Octave</div>
              <div style={{ display: "flex", background: T.bgSoft, borderRadius: T.radius, padding: 4, border: `1px solid ${T.borderSoft}` }}>
                {[1, 2, 3, 4].map(o => (
                  <button key={o} onClick={() => changeOctave(o)} style={{
                    flex: 1, background: octave === o ? T.textDark : "transparent",
                    color: octave === o ? "#fff" : T.textMed,
                    border: "none",
                    borderRadius: T.radius - 2, padding: "8px 0", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: octave === o ? T.sm : "none", transition: "all 0.2s"
                  }}>{o}</button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>Volume</div>
                <div style={{ fontSize: 11, color: playing ? T.plum : T.textMuted, fontWeight: 800, fontFamily: T.sans, fontVariantNumeric: "tabular-nums", transition: "color 0.4s" }}>{volume} dB</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: T.bgSoft, borderRadius: 3, border: `1px solid ${T.borderSoft}`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 0, width: `${(volume + 40) / 46 * 100}%`, height: 6, background: playing ? T.plum : T.textMed, borderRadius: 3, pointerEvents: "none", transition: "background 0.4s" }} />
                <input type="range" min={-40} max={6} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  style={{ width: "100%", opacity: 0, height: 24, cursor: "pointer", position: "relative", zIndex: 10 }} />
                {/* Custom Thumb */}
                <div style={{
                  position: "absolute", left: `calc(${(volume + 40) / 46 * 100}% - 8px)`, width: 16, height: 16,
                  background: "#fff", border: `2px solid ${playing ? T.plum : T.textMed}`, borderRadius: "50%", 
                  pointerEvents: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", transition: "border-color 0.4s"
                }} />
              </div>
            </div>
          </div>

          {mode === "cycle" && (
            <>
              <div style={{ height: 1, background: T.borderSoft, width: "100%", margin: "0" }} />
              <div style={{ display: "flex", gap: 24 }}>
                {/* Step Duration */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Step Length</div>
                  <div style={{ display: "flex", background: T.bgSoft, borderRadius: T.radius, padding: 3, border: `1px solid ${T.borderSoft}`, gap: 2 }}>
                    {[
                      { value: "4n", label: "Beat" },
                      { value: "2n", label: "½ Bar" },
                      { value: "1m", label: "1 Bar" },
                      { value: "2m", label: "2 Bar" },
                      { value: "4m", label: "4 Bar" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => setStepDuration(opt.value)} style={{
                        flex: 1, background: stepDuration === opt.value ? T.plum : "transparent",
                        color: stepDuration === opt.value ? "#fff" : T.textMed,
                        border: "none", borderRadius: T.radius - 2, padding: "7px 2px",
                        fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                        letterSpacing: 0.5, transition: "all 0.2s",
                        boxShadow: stepDuration === opt.value ? `0 2px 8px ${T.plum}40` : "none"
                      }}>{opt.label}</button>
                    ))}
                  </div>
                </div>
                {/* Tempo */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Tempo</div>
                  <div style={{ position: "relative" }}>
                    <input type="number" min={40} max={240} value={bpm} onChange={e => setBpm(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: T.radius, border: `1px solid ${T.borderSoft}`, background: T.bgSoft, color: T.textDark, fontFamily: T.sans, fontSize: 13, outline: "none", fontWeight: 700, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)", paddingRight: 40 }} />
                    <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 800, color: T.textMuted, pointerEvents: "none" }}>BPM</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Huge Ignition Button */}
        <button onClick={toggleDrone} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          background: playing ? T.coral : T.plum, color: "#fff",
          padding: "24px", fontSize: 16, fontWeight: 800, cursor: "pointer", border: "none", borderTop: `1px solid ${playing ? T.coral : T.plum}`,
          fontFamily: T.sans, letterSpacing: 3, textTransform: "uppercase",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onMouseOver={e => e.currentTarget.style.filter = "brightness(1.1)"}
        onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
        >
          {playing ? (
            <><div style={{ width: 12, height: 12, background: "#fff", borderRadius: 2 }} /> STOP ENGINE</>
          ) : (
            <><div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid #fff" }} /> IGNITE {mode === "cycle" ? "SEQUENCE" : "DRONE"}</>
          )}
        </button>
      </div>
    </div>
    </div>
  );
}

// --- 11. Inline Keyboard ---
export function InlineKeyboard({
  range = ["C3", "B4"],
  highlightNotes = [],
  label = "",
  theme,
  zoneMap = [] // optional: [{range: [minIdx, maxIdx], color: string}]
}) {
  const T = theme;
  const CHROMATIC = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const WHITE_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
  const BLACK_MAP = { "C": "C#", "D": "E♭", "F": "F#", "G": "A♭", "A": "B♭" };

  // Parse range
  const startOct = parseInt(range[0].slice(-1));
  const endOct = parseInt(range[1].slice(-1));

  const octaves = [];
  for (let o = startOct; o <= endOct; o++) octaves.push(o);

  // Build highlight matching using pitch classes — matches regardless of octave or flat format
  const normalizeToken = (n) => (n || "").trim().replace(/\u266D/g, 'b').replace(/\u266F/g, '#');
  const getPitchClass = (n) => { const m = normalizeToken(n).match(/^([A-Ga-g][#b]?)/); return m ? m[1].toUpperCase() : ""; };

  const highlightNoteSet = new Set();
  const highlightPCSet = new Set();
  (highlightNotes || []).forEach(n => {
    const norm = normalizeToken(n);
    highlightNoteSet.add(norm);
    // Also add unicode variant
    if (norm.includes('b')) highlightNoteSet.add(norm.replace(/b/g, '\u266D'));
    else if (norm.includes('\u266D')) highlightNoteSet.add(norm.replace(/\u266D/g, 'b'));
    // Add pitch class for octave-independent matching
    const pc = getPitchClass(n);
    if (pc) highlightPCSet.add(pc);
  });
  const isHighlighted = (note) => {
    const norm = normalizeToken(note);
    if (highlightNoteSet.has(norm)) return true;
    const pc = getPitchClass(note);
    return pc && highlightPCSet.has(pc);
  };

  const playNote = async (n) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -18;
    synth.triggerAttackRelease(n.replace('♭', 'b'), "2n");
    setTimeout(() => { try { synth.dispose(); } catch {} }, 2000);
  };

  const whiteKeys = [];
  const blackKeys = [];
  let absoluteIndex = 0;

  octaves.forEach(oct => {
    WHITE_NAMES.forEach(w => {
      const note = `${w}${oct}`;
      whiteKeys.push({ note, index: absoluteIndex });
      absoluteIndex++;

      const bName = BLACK_MAP[w];
      if (bName) {
        blackKeys.push({ note: `${bName}${oct}`, index: absoluteIndex, afterWhite: whiteKeys.length - 1 });
        absoluteIndex++;
      }
    });
  });

  // Default theme fallback if not provided
  const Th = T || {
    bgSoft: "#fdfbf9", bgCard: "#ffffff", border: "#eae1d9", borderSoft: "#f5f0ec",
    textDark: "#2c2825", textMed: "#59534e", textLight: "#8c867f", textMuted: "#b8b2ab",
    gold: "#d4a373", goldDark: "#b58454", goldSoft: "#f9f3ec", radiusMd: "6px", sans: "'Lato', sans-serif"
  };

  const bg = `linear-gradient(180deg, ${Th.bgSoft} 0%, ${Th.bgCard} 100%)`;
  const containerBorder = `1px solid ${Th.border}`;
  const labelColor = Th.textMuted;
  const keyBedBg = "linear-gradient(180deg, #e8e3de 0%, #dcd6d0 100%)";
  const keyBedBorder = `1px solid ${Th.borderSoft}`;

  // White Key styling
  const whiteGradNormal = "linear-gradient(180deg, #ffffff 0%, #f4f4f4 85%, #e6e6e6 100%)";
  const whiteGradActive = `linear-gradient(180deg, #ffffff 0%, ${Th.goldSoft} 100%)`;
  const whiteTextNormal = Th.textLight;

  // Black Key styling
  const blackGradNormal = "linear-gradient(180deg, #383330 0%, #2a2725 90%, #221f1d 100%)";
  const blackGradActive = `linear-gradient(180deg, ${Th.goldDark} 0%, ${Th.gold} 100%)`;
  const blackBorder = `1px solid #1a1817`;

  return (
    <div data-keyboard="true" style={{
      background: bg, border: containerBorder, borderRadius: Th.radiusMd,
      padding: "16px 16px 20px", marginBottom: 16,
      boxShadow: "0 4px 16px rgba(44,40,37,0.04)"
    }}>
      {label && <div style={{ fontSize: 10, fontWeight: 600, color: labelColor, marginBottom: 12, letterSpacing: 2, fontFamily: Th.sans, textTransform: "uppercase", textAlign: "center" }}>{label}</div>}

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 4, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", position: "relative", height: 140, borderRadius: "0 0 5px 5px",
          border: keyBedBorder, background: keyBedBg, margin: "0 auto", textAlign: "left",
          padding: "0 2px 3px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)"
        }}>
          {whiteKeys.map(({ note, index }) => {
            const isHighlight = isHighlighted(note);
            const isC = note.startsWith("C") && !note.startsWith("C#");
            const zone = zoneMap.find(z => index >= z.range[0] && index < z.range[1]);

            // Determine active/highlight visual state
            const visualStateBg = isHighlight
              ? whiteGradActive
              : (zone ? `${zone.color}20` : whiteGradNormal);

            const bottomBorder = isHighlight
              ? `3px solid ${Th.gold}`
              : (zone ? `4px solid ${zone.color}` : `1px solid #dcd6d0`);

            return (
              <div key={note} style={{ position: "relative", display: "flex" }}>
                <div onClick={() => playNote(note)} style={{
                  width: 44, height: "100%",
                  background: visualStateBg,
                  borderLeft: isC ? `2px solid #e8e3de` : `1px solid #efeae4`,
                  borderRight: `1px solid #efeae4`,
                  borderBottom: bottomBorder,
                  borderRadius: "0 0 4px 4px",
                  display: "flex", alignItems: "flex-end", justifyContent: "center",
                  paddingBottom: 10, cursor: "pointer", zIndex: 1,
                  boxShadow: isHighlight
                    ? `inset 0 -6px 16px ${Th.gold}15, 0 1px 3px rgba(0,0,0,0.05)`
                    : "inset 0 -2px 6px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)",
                  transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s, background 0.2s"
                }}
                  onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.background = whiteGradActive; }}
                  onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = visualStateBg; }}
                  onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = visualStateBg; }}
                >
                  <span style={{
                    fontSize: 10, fontWeight: isHighlight ? 700 : 600,
                    color: isHighlight ? Th.goldDark : whiteTextNormal,
                    fontFamily: Th.sans, letterSpacing: 0.5
                  }}>{note.replace('♭', 'b')}</span>
                </div>
              </div>
            );
          })}
          {blackKeys.map(({ note, index, afterWhite }) => {
            const isHighlight = isHighlighted(note);
            const left = (afterWhite + 1) * 44 - 15;
            const zone = zoneMap.find(z => index >= z.range[0] && index < z.range[1]);

            return (
              <div key={note} onClick={() => playNote(note)} style={{
                position: "absolute", left, top: 0, width: 30, height: 85,
                background: isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal),
                border: blackBorder,
                borderTop: "none",
                borderBottom: isHighlight ? `3px solid ${Th.gold}` : blackBorder,
                borderRadius: "0 0 4px 4px",
                zIndex: 2, cursor: "pointer",
                boxShadow: isHighlight
                  ? `0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(255,255,255,0.08), 0 0 12px ${Th.gold}20`
                  : "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.4)",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                paddingBottom: 8, transition: "transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s"
              }}
                onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.background = blackGradActive; }}
                onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal); }}
                onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal); }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: Th.sans, letterSpacing: 0.5 }}>{note.replace('♭', 'b')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── RHYTHM CELL CARDS ──────────────────────────────────────────────
// Visual + audio rhythm pattern cards for Kodály-style rhythm cell exercises
// Each cell: { name, pattern, description }
// pattern is an array of durations in beats, e.g. [1] = quarter, [0.5, 0.5] = two 8ths

export function RhythmCellCards({ theme: T, cells = [], bpm = 80 }) {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [localBpm, setLocalBpm] = useState(bpm);
  const [currentNoteIdx, setCurrentNoteIdx] = useState(-1);
  const [isMetroRunning, setIsMetroRunning] = useState(false);
  const [metroBeatVisual, setMetroBeatVisual] = useState(-1);
  const timeoutsRef = useRef([]);
  const synthsRef = useRef([]);
  const metroIntervalRef = useRef(null);
  const metroBeatRef = useRef(0);
  const metroStartTimeRef = useRef(null);
  const metroClickSynthRef = useRef(null);
  const activeCellRef = useRef(null); // { cell, idx, totalBeats }

  // Only clear visual timeouts — let audio nodes finish their scheduled stops naturally
  const clearVisualTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setCurrentNoteIdx(-1);
  }, []);

  // Kill everything — audio nodes + visual timeouts (for full stop)
  const killAllAudio = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    synthsRef.current.forEach(s => {
      try {
        if (s.osc) {
          s.osc.stop(); s.osc.disconnect(); s.gainNode.disconnect();
          if (s.clickOsc) { s.clickOsc.stop(); s.clickOsc.disconnect(); s.clickGain.disconnect(); }
        }
        else if (s.dispose) { s.dispose(); }
      } catch (_) {}
    });
    synthsRef.current = [];
    setCurrentNoteIdx(-1);
  }, []);

  const stopAll = useCallback(() => {
    killAllAudio();
    activeCellRef.current = null;
    setPlayingIdx(null);
    setIsMetroRunning(false);
    setMetroBeatVisual(-1);
    metroBeatRef.current = 0;
    metroStartTimeRef.current = null;
  }, [killAllAudio]);

  // Schedule a cell's pattern notes at an absolute audio-thread time
  // Schedule a cell's pattern using raw Web Audio for sample-accurate gapless playback.
  // Single oscillator runs continuously — gain automation creates articulation between notes.
  const schedulePattern = useCallback((cell, startTime) => {
    // Only clear visual timeouts — let old oscillators finish their scheduled gain ramp to 0
    // This prevents the gap between loop cycles (old osc crossfades with new osc)
    clearVisualTimeouts();
    const beatSec = 60 / localBpm;
    const beatMs = 60000 / localBpm;
    const now = Tone.now();
    const startDelayMs = Math.max(0, (startTime - now) * 1000);
    const ctx = Tone.getContext().rawContext;
    const totalDurSec = cell.pattern.reduce((a, b) => a + b, 0) * beatSec;

    // Two layers: warm tone (body) + click (attack transient)
    // Body: triangle wave — warm, not grating. The click layer provides sharpness.
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 262; // C4 — sits above drone range, easier to hear
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, startTime);

    // Click: short tick for attack definition (woodblock-like)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.value = 800; // lower tick — less piercing
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickGain.gain.setValueAtTime(0, startTime);

    // Schedule gain automation for each note
    let offsetSec = 0;
    let offsetMs = 0;
    const vol = 0.18; // body volume
    const clickVol = 0.05; // click volume — subtle definition, not piercing
    const articSec = 0.005; // 5ms articulation dip

    cell.pattern.forEach((dur, i) => {
      const noteStart = startTime + offsetSec;
      // Body: dip → ramp up → sustain
      gainNode.gain.setValueAtTime(0.005, noteStart);
      gainNode.gain.linearRampToValueAtTime(vol, noteStart + articSec);
      // Click transient: sharp spike that decays fast (15ms)
      clickGain.gain.setValueAtTime(clickVol, noteStart);
      clickGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.015);
      // Visual highlight
      const t = setTimeout(() => setCurrentNoteIdx(i), startDelayMs + offsetMs);
      timeoutsRef.current.push(t);
      offsetSec += dur * beatSec;
      offsetMs += dur * beatMs;
    });

    // Release after last note
    const endTime = startTime + totalDurSec;
    gainNode.gain.setValueAtTime(vol, endTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime + 0.05);

    // Start/stop both oscillators
    osc.start(startTime);
    osc.stop(endTime + 0.1);
    clickOsc.start(startTime);
    clickOsc.stop(endTime + 0.1);

    // Track for cleanup
    const nodeRef = { osc, gainNode, clickOsc, clickGain };
    synthsRef.current.push(nodeRef);

    // Reset visual after pattern ends
    const endTimeout = setTimeout(() => setCurrentNoteIdx(-1), startDelayMs + offsetMs + 50);
    timeoutsRef.current.push(endTimeout);

    // Cleanup after oscillators stop
    setTimeout(() => {
      try { osc.disconnect(); gainNode.disconnect(); clickOsc.disconnect(); clickGain.disconnect(); } catch {}
      synthsRef.current = synthsRef.current.filter(s => s !== nodeRef);
    }, startDelayMs + offsetMs + 2000);
  }, [localBpm, clearVisualTimeouts]);

  // Start a cell: begin metronome + quantize first pattern to next beat
  const startCell = useCallback(async (cell, idx) => {
    if (Tone.context.state !== 'running') {
      try { await Tone.start(); } catch {}
      try { await Tone.context.resume(); } catch {}
    }
    const totalBeats = cell.pattern.reduce((a, b) => a + b, 0);
    activeCellRef.current = { cell, idx, totalBeats };
    setPlayingIdx(idx);

    if (!isMetroRunning) {
      // Start fresh — metronome will play first beat + trigger pattern immediately
      setIsMetroRunning(true);
    } else {
      // Metronome already running — quantize to next beat boundary
      // Calculate the next beat time on the audio thread for precise alignment
      const beatSec = 60 / localBpm;
      const beatMs = 60000 / localBpm;
      const elapsed = performance.now() - (metroStartTimeRef.current || performance.now());
      const msIntoCurrentBeat = elapsed % beatMs;
      const msUntilNextBeat = beatMs - msIntoCurrentBeat;
      // The ideal audio-thread time for that next beat
      const nextBeatAudioTime = Tone.now() + msUntilNextBeat / 1000;
      // Schedule pattern at that exact audio time
      schedulePattern(cell, nextBeatAudioTime);
    }
  }, [isMetroRunning, localBpm, schedulePattern]);

  const handleCellTap = useCallback((cell, idx) => {
    if (activeCellRef.current?.idx === idx) {
      // Tap active cell → stop everything
      stopAll();
    } else {
      // Tap new cell → start or swap
      startCell(cell, idx);
    }
  }, [stopAll, startCell]);

  // Metronome engine — absolute-time scheduling (no drift)
  // Uses the "two clocks" pattern: setInterval for coarse timing, audio-thread for precision.
  // Even if setInterval fires late, beats land on the exact grid.
  useEffect(() => {
    if (!isMetroRunning) {
      if (metroIntervalRef.current) { clearInterval(metroIntervalRef.current); metroIntervalRef.current = null; }
      setMetroBeatVisual(-1);
      metroBeatRef.current = 0;
      metroStartTimeRef.current = null;
      return;
    }

    const beatSec = 60 / localBpm;
    const beatMs = 60000 / localBpm;
    // Absolute audio-context time of beat 0
    let nextBeatTime = Tone.now();
    metroStartTimeRef.current = performance.now();
    metroBeatRef.current = 0;

    // Create dedicated click synth
    const clickSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 }
    }).toDestination();
    clickSynth.volume.value = -10;
    metroClickSynthRef.current = clickSynth;

    const tick = () => {
      const beat = metroBeatRef.current;
      const beatInBar = beat % 4;
      setMetroBeatVisual(beatInBar);

      // Schedule click at the IDEAL beat time (not Tone.now() which may be late)
      try {
        const pitch = beatInBar === 0 ? "G5" : "C5";
        clickSynth.triggerAttackRelease(pitch, "32n", nextBeatTime);
      } catch {}

      // Re-trigger active cell pattern on its cycle boundary
      const ac = activeCellRef.current;
      if (ac) {
        const patternBeats = Math.ceil(ac.totalBeats);
        if (beat % patternBeats === 0) {
          // Pass the ideal beat time so pattern notes are grid-locked
          schedulePattern(ac.cell, nextBeatTime);
        }
      }

      // Advance to next beat — absolute, no drift accumulation
      nextBeatTime += beatSec;
      metroBeatRef.current++;
    };

    // First tick immediately
    tick();
    metroIntervalRef.current = setInterval(tick, beatMs);

    return () => {
      if (metroIntervalRef.current) { clearInterval(metroIntervalRef.current); metroIntervalRef.current = null; }
      try { clickSynth.dispose(); } catch {}
      metroClickSynthRef.current = null;
    };
  }, [isMetroRunning, localBpm, schedulePattern]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      if (metroIntervalRef.current) clearInterval(metroIntervalRef.current);
      synthsRef.current.forEach(s => { try { s.dispose(); } catch (_) {} });
      if (metroClickSynthRef.current) { try { metroClickSynthRef.current.dispose(); } catch (_) {} }
    };
  }, []);

  // Visual dot representation with beat numbers and active highlighting
  const renderPattern = (pattern, activeIdx) => {
    if (!pattern || pattern.length === 0) return null;
    const totalBeats = pattern.reduce((a, b) => a + b, 0);
    if (totalBeats === 0) return null;
    const width = 120;
    const numBeats = Math.ceil(totalBeats);
    let x = 0;
    return (
      <svg width={width} height="36" viewBox={`0 0 ${width} 36`} style={{ display: 'block' }}>
        {/* Beat grid lines */}
        {Array.from({ length: numBeats }).map((_, i) => (
          <React.Fragment key={`g${i}`}>
            <line x1={(i / totalBeats) * width} y1={0} x2={(i / totalBeats) * width} y2={24} stroke={T.border} strokeWidth={1} />
            <text x={(i / totalBeats) * width + ((1 / totalBeats) * width) / 2} y={33} textAnchor="middle" fontSize="8" fill={T.textMuted} fontFamily={T.sans}>{i + 1}</text>
          </React.Fragment>
        ))}
        {/* Pattern shapes */}
        {pattern.map((dur, i) => {
          const w = (dur / totalBeats) * width;
          const cx = x + w / 2;
          x += w;
          const isActive = activeIdx === i;
          const opacity = activeIdx >= 0 ? (isActive ? 1 : 0.4) : 0.8;
          if (dur <= 0.25) {
            return <circle key={i} cx={cx} cy={12} r={3} fill={T.gold} opacity={opacity} />;
          } else if (dur <= 0.5) {
            return <circle key={i} cx={cx} cy={12} r={4} fill={T.gold} opacity={opacity} />;
          } else {
            return <rect key={i} x={cx - w * 0.35} y={6} width={w * 0.7} height={12} rx={3} fill={T.gold} opacity={opacity} />;
          }
        })}
      </svg>
    );
  };

  const btnStyle = (active) => ({
    background: active ? T.gold : "transparent",
    border: `1px solid ${active ? T.gold : T.borderSoft}`,
    color: active ? "#fff" : T.textMed,
    borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: T.sans, minWidth: 32
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Rhythm Cells</div>

      {/* BPM adjuster row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.bgSoft, padding: "4px 6px", borderRadius: T.radius, border: `1px solid ${T.borderSoft}` }}>
          <button onClick={() => setLocalBpm(b => Math.max(40, b - 1))} style={{
            background: "transparent", border: "none", cursor: "pointer", color: T.textMed,
            width: 24, height: 24, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 44, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{localBpm}</div>
          
          <button onClick={() => setLocalBpm(b => Math.min(200, b + 1))} style={{
            background: "transparent", border: "none", cursor: "pointer", color: T.textMed,
            width: 24, height: 24, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <button onClick={() => setLocalBpm(bpm)} style={{ 
            marginLeft: 4, fontSize: 10, background: T.goldSoft, border: "none", 
            padding: "4px 8px", borderRadius: 4, color: T.goldDark, cursor: "pointer", 
            fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.sans,
            transition: "all 0.2s ease"
          }}
          onPointerEnter={e => e.currentTarget.style.background = T.gold + "30"}
          onPointerLeave={e => e.currentTarget.style.background = T.goldSoft}
          >Target: {bpm}</button>
        </div>

      </div>

      {/* Beat indicator — visible when metronome is running */}
      {isMetroRunning && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: "50%",
              background: metroBeatVisual === i ? T.gold : T.borderSoft,
              transition: "background 0.08s",
              boxShadow: metroBeatVisual === i ? `0 0 8px ${T.gold}80` : "none"
            }} />
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cells.map((cell, i) => {
          const isActive = playingIdx === i;
          return (
            <div key={i} onClick={() => handleCellTap(cell, i)} style={{
              flex: "1 1 140px", maxWidth: 200, cursor: "pointer",
              background: isActive ? T.goldSoft : T.bgCard,
              border: `1px solid ${isActive ? T.gold : T.border}`,
              borderRadius: T.radiusMd || 8, padding: "14px",
              boxShadow: isActive ? `0 0 0 1px ${T.gold}40, ${T.sm}` : T.sm,
              transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: isActive ? "translateY(-2px)" : "translateY(0)"
            }}
            onPointerEnter={e => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(44, 40, 37, 0.06)`;
                e.currentTarget.style.borderColor = T.borderSoft;
              }
            }}
            onPointerLeave={e => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = T.sm;
                e.currentTarget.style.borderColor = T.border;
              }
            }}
            onPointerDown={e => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onPointerUp={e => {
              e.currentTarget.style.transform = isActive ? "translateY(-2px)" : "translateY(0)";
            }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? T.goldDark : T.textDark, fontFamily: T.serif, marginBottom: 4, transition: "color 0.2s" }}>{cell.name}</div>
              <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginBottom: 10, lineHeight: 1.4 }}>{cell.description}</div>
              <div style={{ marginBottom: 6 }}>
                {renderPattern(cell.pattern, isActive ? currentNoteIdx : -1)}
              </div>
              <div style={{
                fontSize: 9,
                color: isActive ? T.goldDark : T.textMuted,
                fontFamily: T.sans,
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: isActive ? 700 : 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                {isActive ? (
                  <><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.goldDark, display: "inline-block", animation: "pulse-ring 2s infinite" }} /> Playing &middot; tap to stop</>
                ) : "Tap to hear"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PHRASE FORM GUIDE ──────────────────────────────────────────────
// Visual section indicator synced to metronome bar count
// form: { pattern: "AABA" | ["Intro","V","Ch","V","Ch","Br","Ch","Outro"], barsPerSection: 4 | [4,8,8,8,8,8,8,4], labels?: { A: "Verse", B: "Chorus" } }
// pattern: string of single chars OR array of section keys
// barsPerSection: single number (uniform) OR array matching pattern length

export function PhraseFormGuide({ theme: T, form }) {
  const [currentBar, setCurrentBar] = useState(-1);
  const [absBar, setAbsBar] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [barsOverride, setBarsOverride] = useState(null);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [currentSection, setCurrentSection] = useState(-1);
  const prevSectionAudioRef = useRef(-1);  // tracks section in audio thread (for chime)
  const prevSectionVisualRef = useRef(-1); // tracks section in visual thread (for UI)
  const chimeSynthRef = useRef(null);
  const chimeEnabledRef = useRef(true);
  const totalBarsRef = useRef(4);
  const barsArrRef = useRef([4]);

  // Bug fix: normalize form.pattern || form.sections
  const rawPattern = form.pattern || form.sections;
  const sections = rawPattern ? (Array.isArray(rawPattern) ? rawPattern : rawPattern.split('')) : [];

  const isUniformBars = !Array.isArray(form.barsPerSection);
  const defaultBars = form.barsPerSection || 4;
  const effectiveBarsPerSection = barsOverride !== null && isUniformBars ? barsOverride : defaultBars;
  const barsArr = sections.length > 0
    ? (Array.isArray(effectiveBarsPerSection) ? effectiveBarsPerSection : sections.map(() => effectiveBarsPerSection))
    : [4];
  const totalBars = barsArr.reduce((a, b) => a + b, 0);

  // Keep refs in sync for audio-thread handler
  totalBarsRef.current = totalBars;
  barsArrRef.current = barsArr;
  chimeEnabledRef.current = chimeEnabled;

  // Loop counter (derived from state, not ref)
  const loopCount = isActive && absBar >= 0 ? Math.floor(absBar / totalBars) + 1 : 0;

  // Chime synth — pre-create on mount, dispose on unmount
  useEffect(() => {
    chimeSynthRef.current = new Tone.FMSynth({
      harmonicity: 3, modulationIndex: 2,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.15 },
      modulation: { type: 'sine' },
      modulationEnvelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.1 }
    }).toDestination();
    chimeSynthRef.current.volume.value = -10;
    return () => {
      if (chimeSynthRef.current) { try { chimeSynthRef.current.dispose(); } catch (_) {} chimeSynthRef.current = null; }
    };
  }, []);

  // Audio-thread chime: listens to metroBeatAudio (fires immediately from Tone.Loop,
  // carries audio `time` for sample-accurate scheduling). Works with screen off.
  useEffect(() => {
    const handleAudioBeat = (e) => {
      const { bar, time, beat } = e.detail;
      if (bar === undefined || beat !== 0) return; // only check on downbeats (beat 0)
      const tb = totalBarsRef.current;
      const ba = barsArrRef.current;
      const localBar = bar % tb;
      // Compute which section this bar falls in
      let section = -1, remaining = localBar;
      for (let i = 0; i < ba.length; i++) {
        if (remaining < ba[i]) { section = i; break; }
        remaining -= ba[i];
      }
      if (section === -1) section = ba.length - 1;
      // Fire chime on section change (skip the very first beat)
      if (section !== prevSectionAudioRef.current && prevSectionAudioRef.current !== -1 && chimeEnabledRef.current) {
        if (chimeSynthRef.current) {
          try { chimeSynthRef.current.triggerAttackRelease("E5", "8n", time); } catch (_) {}
        }
      }
      prevSectionAudioRef.current = section;
    };
    window.addEventListener('metroBeatAudio', handleAudioBeat);
    return () => window.removeEventListener('metroBeatAudio', handleAudioBeat);
  }, []); // no deps — reads everything from refs

  // Visual-thread updates: listens to metroBeat (fires via rAF for smooth UI)
  useEffect(() => {
    const handleBeat = (e) => {
      const { bar } = e.detail;
      if (bar !== undefined) {
        setAbsBar(bar);
        const localBar = bar % totalBars;
        setCurrentBar(localBar);
        setIsActive(true);
        // Compute section for visual display
        let section = -1, remaining = localBar;
        for (let i = 0; i < barsArr.length; i++) {
          if (remaining < barsArr[i]) { section = i; break; }
          remaining -= barsArr[i];
        }
        if (section === -1) section = barsArr.length - 1;
        setCurrentSection(section);
      } else {
        setIsActive(false);
        setCurrentBar(-1);
        setAbsBar(0);
        setCurrentSection(-1);
        prevSectionAudioRef.current = -1;
        prevSectionVisualRef.current = -1;
      }
    };
    window.addEventListener('metroBeat', handleBeat);
    return () => window.removeEventListener('metroBeat', handleBeat);
  }, [totalBars, barsArr]);

  // Reset tracking when totalBars changes (user changed bars-per-section)
  useEffect(() => {
    prevSectionAudioRef.current = -1;
    prevSectionVisualRef.current = -1;
  }, [totalBars]);

  // Early return after all hooks
  if (!rawPattern || sections.length === 0) return null;

  const colorPalette = [
    T.gold || "#d4a373", T.coral || "#d68383",
    T.plum || "#9e829c", T.slate || "#6b8e9f",
    "#7fb685", "#c9a96e", "#8bb8d0", "#c07eb0"
  ];
  const singleCharColors = { A: colorPalette[0], B: colorPalette[1], C: colorPalette[2], D: colorPalette[3] };

  const uniqueKeys = [...new Set(sections)];
  const colorFor = (s) => {
    if (singleCharColors[s]) return singleCharColors[s];
    const idx = uniqueKeys.indexOf(s);
    return colorPalette[idx % colorPalette.length];
  };

  const labels = form.labels || {};

  // Derive bar-within-section from currentBar (pure computation, no hooks)
  let barInSection = 0, sectionBars = 0;
  if (currentBar >= 0 && currentSection >= 0) {
    let remaining = currentBar;
    for (let i = 0; i < currentSection; i++) remaining -= barsArr[i];
    barInSection = remaining + 1;
    sectionBars = barsArr[currentSection];
  }

  // Display pattern
  const patternDisplay = Array.isArray(rawPattern) ? rawPattern.join(" \u00b7 ") : rawPattern;

  const btnStyle = (active) => ({
    background: active ? T.gold : "transparent",
    border: `1px solid ${active ? T.gold : T.borderSoft}`,
    color: active ? "#fff" : T.textMed,
    borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: T.sans, minWidth: 32
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5 }}>
            Phrase Form &middot; <span style={{ color: T.textMuted }}>{patternDisplay}</span>
          </div>
          {/* Chime toggle */}
          <button onClick={() => setChimeEnabled(v => !v)} style={{
            background: chimeEnabled ? T.goldSoft : T.bgSoft, 
            border: `1px solid ${chimeEnabled ? T.gold : T.borderSoft}`, 
            cursor: "pointer", 
            width: 28, height: 28, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: chimeEnabled ? T.goldDark : T.textMuted,
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }} 
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          title={chimeEnabled ? "Section chime on" : "Section chime off"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              {!chimeEnabled && <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />}
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isActive && loopCount > 0 && (
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>
              Loop {loopCount}
            </div>
          )}
          {isActive && currentSection >= 0 && (
            <div style={{ fontSize: 12, fontWeight: 700, color: colorFor(sections[currentSection]), fontFamily: T.sans }}>
              {labels[sections[currentSection]] || sections[currentSection]} &middot; Bar {barInSection}/{sectionBars}
            </div>
          )}
        </div>
      </div>

      {/* Section bar visualization */}
      <div style={{ display: "flex", gap: 3, height: 36, borderRadius: 8, overflow: "hidden", background: T.borderSoft, padding: 3 }}>
        {sections.map((s, i) => {
          const color = colorFor(s);
          const active = currentSection === i;
          const secBars = barsArr[i];
          const fillPct = active ? (barInSection / secBars) * 100 : (currentSection > i ? 100 : 0);
          
          return (
            <div key={i} style={{
              flex: secBars, position: "relative",
              background: active ? T.bgCard : fillPct === 100 ? `${color}15` : `${color}08`,
              borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: active ? `0 2px 8px ${color}30, 0 0 0 1px ${color}` : "none",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              overflow: "hidden" // keep fill constrained
            }}>
              {/* Background Fill Layer */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${fillPct}%`, 
                background: active ? `linear-gradient(90deg, ${color}20 0%, ${color}40 100%)` : `${color}25`,
                transition: "width 0.2s linear"
              }} />
              
              <span style={{
                position: "relative", fontSize: sections.length > 6 ? 10 : 12, fontWeight: 800,
                color: active ? color : fillPct === 100 ? `${color}90` : `${color}60`,
                fontFamily: T.sans, letterSpacing: 1,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%",
                textShadow: active ? `0 1px 2px ${T.bgCard}` : "none",
                transition: "color 0.2s"
              }}>{labels[s] || s}</span>
            </div>
          );
        })}
      </div>

      {/* Bars-per-section adjuster — only for uniform bar counts */}
      {isUniformBars && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>Bars / Section</div>
          <div style={{ display: "flex", gap: 6, background: T.bgSoft, padding: "4px", borderRadius: T.radiusMd, border: `1px solid ${T.borderSoft}` }}>
            {[1, 2, 4, 8].map(n => {
              const isActive = (barsOverride !== null ? barsOverride : defaultBars) === n;
              return (
                <button key={n} onClick={() => setBarsOverride(n === defaultBars ? null : n)} style={{
                  background: isActive ? T.gold : "transparent",
                  color: isActive ? "#fff" : T.textMed,
                  border: "none",
                  padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                  borderRadius: T.radius, fontFamily: T.sans, transition: "all 0.2s",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                }}
                onPointerEnter={e => { if (!isActive) e.currentTarget.style.color = T.textDark; }}
                onPointerLeave={e => { if (!isActive) e.currentTarget.style.color = T.textMed; }}
                >{n}</button>
              );
            })}
          </div>
        </div>
      )}

      {!isActive && (
        <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginTop: 6, fontStyle: "italic" }}>
          Start the metronome to sync the phrase guide
        </div>
      )}
    </div>
  );
}

// ─── SONG PICKER ────────────────────────────────────────────────────────────
// Song selector + player for inside StrumChartBuilder. Only songs with lyrics.

const CHART_SONGS = [
  { id: "soldelsur", name: "Sol Del Sur", artist: "Sun Room", src: "/sol-del-sur.mp3", bpm: 120, key: "F#", tabId: "soldelsur" },
  { id: "iltwyw", name: "I Like The Way You Walk", artist: "The Donkeys", src: "/iltwyw.mp3", bpm: 97, key: "A", tabId: "iltwyw" },
  { id: "dope-and-smoke", name: "Dope & Smoke", artist: "DOPE LEMON", src: "/dope-and-smoke.mp3", bpm: 94, key: "Am" },
  { id: "close-my-eyes", name: "Close My Eyes", artist: "The Lagoons", src: "/close-my-eyes.mp3", bpm: 100, key: "D" },
  { id: "summer-heat", name: "Summer Heat", artist: "Sun Room", src: "/summer-heat.mp3", bpm: 130, key: "E" },
  { id: "gimme-love", name: "Gimme Love", artist: "The Elovaters", src: "/gimme-love.mp3", bpm: 85, key: "C" },
  { id: "jah-werx", name: "Jah Werx", artist: "Susto", src: "/jah-werx.mp3", bpm: 114, key: "B" },
  { id: "its-a-love", name: "It's a Love", artist: "Baskervillain", src: "/its-a-love.mp3", bpm: 95, key: "A" },
  { id: "surf-hat", name: "Surf Hat", artist: "Surf Hat", src: "/surf-hat.mp3", bpm: 90, key: "G" },
  { id: "island-fever", name: "Island Fever", artist: "Billy Changer", src: "/island-fever.mp3", bpm: 85, key: "Fm" },
  { id: "sunset-garage", name: "Sunset Garage", artist: "Sun Room", src: "/sunset-garage.mp3", bpm: 142, key: "G" },
  { id: "worship-the-sun", name: "Worship the Sun", artist: "Allah-Las", src: "/worship-the-sun.mp3", bpm: 120, key: "C" },
  { id: "friends", name: "Friends", artist: "levitation room", src: "/friends.mp3", bpm: 105, key: "Em" },
  { id: "geneva-strange", name: "Geneva Strangemod", artist: "Glyders", src: "/geneva-strange.mp3", bpm: 110, key: "G" },
  { id: "catamaran", name: "Catamaran", artist: "Allah-Las", src: "/catamaran.mp3", bpm: 120, key: "Am" },
  { id: "get-away", name: "Get Away", artist: "Babitha", src: "/get-away.mp3", bpm: 115, key: "E" },
  { id: "real-love-baby", name: "Real Love Baby", artist: "Father John Misty", src: "/real-love-baby.mp3", bpm: 102, key: "D" },
  { id: "baby-ariel-pink", name: "Baby", artist: "Ariel Pink", src: "/baby-ariel-pink.mp3", bpm: 90, key: "Am" },
  { id: "mexico-husbands", name: "Mexico", artist: "Husbands", src: "/mexico-husbands.mp3", bpm: 150, key: "F" },
  { id: "going-gets-tough", name: "Going Gets Tough", artist: "The Growlers", src: "/going-gets-tough.mp3", bpm: 158, key: "E" },
  { id: "something-about-you", name: "Something About You", artist: "Eyedress", src: "/something-about-you.mp3", bpm: 85, key: "Am" },
  { id: "1999-no-cigar", name: "1999", artist: "NO CIGAR", src: "/1999-no-cigar.mp3", bpm: 85, key: "G#m" },
  { id: "just-yesterday", name: "Just Yesterday", artist: "Sun Room", src: "/just-yesterday.mp3", bpm: 130, key: "E" },
  { id: "stormtrooper", name: "Stormtrooper", artist: "Pepper", src: "/stormtrooper.mp3", bpm: 150, key: "B" },
  { id: "warmth-of-the-sun", name: "Warmth of the Sun", artist: "levitation room", src: "/warmth-of-the-sun.mp3", bpm: 100, key: "D" },
  { id: "nannuflay", name: "Nànnuflày", artist: "Tinariwen", src: "/nannuflay.mp3", bpm: 90, key: "Am" },
  { id: "i-didnt-know", name: "I Didn't Know", artist: "Skinshape", src: "/i-didnt-know.mp3", bpm: 95, key: "Dm" },
  { id: "chewing-gum", name: "Chewing Gum", artist: "Cotton Jones", src: "/chewing-gum.mp3", bpm: 100, key: "Am" },
  { id: "texas-sun", name: "Texas Sun", artist: "Khruangbin & Leon Bridges", src: "/texas-sun.mp3", bpm: 80, key: "Dm" },
  { id: "abusey-junction", name: "Abusey Junction", artist: "Kokoroko", src: "/abusey-junction.mp3", bpm: 100, key: "Fm" },
  { id: "rules-khruangbin", name: "Rules", artist: "Khruangbin", src: "/rules-khruangbin.mp3", bpm: 90, key: "Am" },
  { id: "breakdown-jack-johnson", name: "Breakdown", artist: "Jack Johnson", src: "/breakdown-jack-johnson.mp3", bpm: 95, key: "C" },
  { id: "coastline", name: "Coastline", artist: "Hollow Coves", src: "/coastline.mp3", bpm: 85, key: "C" },
  { id: "marsha", name: "Marsha", artist: "Current Swell", src: "/marsha.mp3", bpm: 100, key: "Dm" },
  { id: "peace-blossom-boogy", name: "Peace Blossom Boogy", artist: "Babe Rainbow", src: "/peace-blossom-boogy.mp3", bpm: 110, key: "D" },
];

export function SongPicker({ theme: T, youtubeUrl, onYoutubeChange, hidePlayer, onSongChange }) {
  const [songId, setSongId] = useState("");
  const [showTabs, setShowTabs] = useState(false);
  const [ytInput, setYtInput] = useState(youtubeUrl || "");
  const song = CHART_SONGS.find(s => s.id === songId);
  const ytVideoId = extractYouTubeId(youtubeUrl || "");

  // When YouTube URL prop changes externally, sync local input
  useEffect(() => {
    if (youtubeUrl !== undefined) setYtInput(youtubeUrl || "");
  }, [youtubeUrl]);

  const handleYtInputChange = (val) => {
    setYtInput(val);
    const id = extractYouTubeId(val);
    if (id) {
      setSongId(""); // Clear dropdown when valid YT URL
      setShowTabs(false);
      if (onYoutubeChange) onYoutubeChange(val);
    } else if (!val.trim()) {
      if (onYoutubeChange) onYoutubeChange("");
    }
  };

  const handleSongChange = (newSongId) => {
    setSongId(newSongId);
    setShowTabs(false);
    if (newSongId && onYoutubeChange) {
      onYoutubeChange(""); // Clear YouTube when song selected
      setYtInput("");
    }
  };

  // Notify parent of song changes so it can render the player separately on desktop
  useEffect(() => {
    if (onSongChange) onSongChange(song || null);
  }, [songId]);

  return (
    <div style={{ marginBottom: hidePlayer ? 0 : 16 }}>
      {/* Song select or YouTube URL — unified row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: (!hidePlayer && (song || ytVideoId)) ? 8 : 0,
        flexWrap: "wrap",
      }}>
        <Music size={14} style={{ color: T.textMuted, flexShrink: 0 }} />

        {/* Song dropdown — hide when YouTube URL is active */}
        {!ytVideoId && (
          <select
            value={songId}
            onChange={e => handleSongChange(e.target.value)}
            style={{
              flex: 1, minWidth: 140, fontSize: 13, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
              background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
              padding: "7px 10px", cursor: "pointer", outline: "none",
              appearance: "auto",
            }}
          >
            <option value="">Choose a song...</option>
            {CHART_SONGS.map(s => (
              <option key={s.id} value={s.id}>{s.name} — {s.artist} ({s.bpm} BPM, {s.key})</option>
            ))}
          </select>
        )}

        {/* Divider — show when no song selected and no YouTube */}
        {!song && !ytVideoId && (
          <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontWeight: 500 }}>or</span>
        )}

        {/* YouTube URL input — compact when song dropdown visible, full-width when active */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flex: ytVideoId ? 1 : "0 1 auto", minWidth: ytVideoId ? 0 : 160 }}>
          <input
            type="text"
            value={ytInput}
            onChange={e => handleYtInputChange(e.target.value)}
            placeholder={ytVideoId ? "YouTube URL" : "YouTube URL..."}
            style={{
              flex: 1, fontSize: 12, fontFamily: T.sans, color: T.textDark,
              background: T.bgSoft, border: `1px solid ${ytVideoId ? T.gold + "60" : T.border}`,
              borderRadius: T.radius, padding: "7px 10px", outline: "none",
              transition: "border-color 0.15s",
              minWidth: 0,
            }}
          />
          {ytVideoId && (
            <button onClick={() => { setYtInput(""); if (onYoutubeChange) onYoutubeChange(""); }} style={{
              fontSize: 9, padding: "5px 8px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
              background: "transparent", color: T.textMuted, border: `1px solid ${T.border}`,
              flexShrink: 0,
            }}><X size={12} /></button>
          )}
        </div>

        {song && song.tabId && TAB_CONTENT[song.tabId] && (
          <button onClick={() => setShowTabs(!showTabs)} style={{
            background: showTabs ? T.getTint(T.gold, 0.1) : "none",
            border: `1px solid ${showTabs ? T.gold + "40" : T.borderSoft}`,
            borderRadius: T.radius, padding: "5px 10px", cursor: "pointer",
            fontSize: 9, fontWeight: 700, color: showTabs ? T.gold : T.textMuted,
            fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
            transition: "all 0.15s", flexShrink: 0,
          }}>Tabs</button>
        )}
      </div>

      {/* YouTube player or MiniAudioPlayer — rendered inline when not hidden */}
      {!hidePlayer && (ytVideoId ? (
        <YouTubeAudioPlayer videoId={ytVideoId} theme={T} title="YouTube" />
      ) : song ? (
        <MiniAudioPlayer src={song.src} theme={T} title={`${song.name} — ${song.artist}`} />
      ) : null)}

      {/* Tabs expansion */}
      {showTabs && song && song.tabId && TAB_CONTENT[song.tabId] && (
        <div style={{
          border: `1px solid ${T.borderSoft}`, borderRadius: T.radius,
          overflow: "hidden", marginTop: 8,
        }}>
          <pre style={{
            margin: 0, padding: "12px 16px", background: T.bgSoft,
            fontSize: 11, fontFamily: "'Courier New', monospace",
            color: T.textDark, whiteSpace: "pre", overflowX: "auto",
            maxHeight: 280, overflowY: "auto", lineHeight: 1.6,
          }}>{TAB_CONTENT[song.tabId].trim()}</pre>
        </div>
      )}
    </div>
  );
}

// ─── STRUM CHART BUILDER ─────────────────────────────────────────────────────
// Interactive grid for building strum/chord/lyric charts

const BEAT_LABELS_8 = ["1", "&", "2", "&", "3", "&", "4", "&"];
// 16th note labels used by interstitial slots inline — "e" and "a" rendered contextually

// Built-in chord voicings — multi-voicing: each chord maps to an array of { frets, name, pos }
// pos = short label for the voicing position (e.g., "Open", "5th", "Barre")
const CHORD_VOICINGS_MULTI = {
  // ─── Major chords ───
  "C":  [{ frets: "x32010", name: "C", pos: "Open" }, { frets: "x35553", name: "C", pos: "3rd" }, { frets: "8aa988", name: "C", pos: "8th" }],
  "Cm": [{ frets: "x35543", name: "Cm", pos: "3rd" }, { frets: "8aa888", name: "Cm", pos: "8th" }, { frets: "xx5543", name: "Cm", pos: "Partial" }],
  "D":  [{ frets: "xx0232", name: "D", pos: "Open" }, { frets: "x57775", name: "D", pos: "5th" }, { frets: "accbaa", name: "D", pos: "10th" }],
  "Dm": [{ frets: "xx0231", name: "Dm", pos: "Open" }, { frets: "x57765", name: "Dm", pos: "5th" }, { frets: "accaaa", name: "Dm", pos: "10th" }],
  "E":  [{ frets: "022100", name: "E", pos: "Open" }, { frets: "x79997", name: "E", pos: "7th" }, { frets: "xx9997", name: "E", pos: "Partial" }],
  "Em": [{ frets: "022000", name: "Em", pos: "Open" }, { frets: "x79987", name: "Em", pos: "7th" }, { frets: "079000", name: "Em", pos: "7th alt" }],
  "F":  [{ frets: "133211", name: "F", pos: "1st" }, { frets: "x8aaa8", name: "F", pos: "8th" }, { frets: "xx3211", name: "F", pos: "Partial" }],
  "Fm": [{ frets: "133111", name: "Fm", pos: "1st" }, { frets: "x8aa98", name: "Fm", pos: "8th" }, { frets: "xx3111", name: "Fm", pos: "Partial" }],
  "G":  [{ frets: "320003", name: "G", pos: "Open" }, { frets: "355433", name: "G", pos: "3rd" }, { frets: "xx5433", name: "G", pos: "Partial" }],
  "Gm": [{ frets: "355333", name: "Gm", pos: "3rd" }, { frets: "xx5333", name: "Gm", pos: "Partial" }, { frets: "3x0333", name: "Gm", pos: "Open" }],
  "A":  [{ frets: "x02220", name: "A", pos: "Open" }, { frets: "577655", name: "A", pos: "5th" }, { frets: "xx7655", name: "A", pos: "Partial" }],
  "Am": [{ frets: "x02210", name: "Am", pos: "Open" }, { frets: "577555", name: "Am", pos: "5th" }, { frets: "x07555", name: "Am", pos: "7th" }],
  "B":  [{ frets: "x24442", name: "B", pos: "2nd" }, { frets: "799877", name: "B", pos: "7th" }, { frets: "xx4442", name: "B", pos: "Partial" }],
  "Bm": [{ frets: "x24432", name: "Bm", pos: "2nd" }, { frets: "799777", name: "Bm", pos: "7th" }, { frets: "xx4432", name: "Bm", pos: "Partial" }],
  "C#": [{ frets: "x46664", name: "C#", pos: "4th" }, { frets: "9bba99", name: "C#", pos: "9th" }, { frets: "xx6664", name: "C#", pos: "Partial" }],
  "Db": [{ frets: "x46664", name: "Db", pos: "4th" }, { frets: "9bba99", name: "Db", pos: "9th" }, { frets: "xx6664", name: "Db", pos: "Partial" }],
  "D#": [{ frets: "x68886", name: "D#", pos: "6th" }, { frets: "bddcbb", name: "D#", pos: "11th" }, { frets: "xx8886", name: "D#", pos: "Partial" }],
  "Eb": [{ frets: "x68886", name: "Eb", pos: "6th" }, { frets: "bddcbb", name: "Eb", pos: "11th" }, { frets: "xx8886", name: "Eb", pos: "Partial" }],
  "F#": [{ frets: "244322", name: "F#", pos: "2nd" }, { frets: "x9bbb9", name: "F#", pos: "9th" }, { frets: "xx4322", name: "F#", pos: "Partial" }],
  "Gb": [{ frets: "244322", name: "Gb", pos: "2nd" }, { frets: "x9bbb9", name: "Gb", pos: "9th" }, { frets: "xx4322", name: "Gb", pos: "Partial" }],
  "Ab": [{ frets: "466544", name: "Ab", pos: "4th" }, { frets: "xx6544", name: "Ab", pos: "Partial" }],
  "Bb": [{ frets: "x13331", name: "Bb", pos: "1st" }, { frets: "688766", name: "Bb", pos: "6th" }, { frets: "xx3331", name: "Bb", pos: "Partial" }],
  // ─── Minor chords ───
  "C#m": [{ frets: "x46654", name: "C#m", pos: "4th" }, { frets: "9bb999", name: "C#m", pos: "9th" }],
  "Ebm": [{ frets: "x68876", name: "Ebm", pos: "6th" }, { frets: "bddbbb", name: "Ebm", pos: "11th" }, { frets: "xx8876", name: "Ebm", pos: "Partial" }],
  "F#m": [{ frets: "244222", name: "F#m", pos: "2nd" }, { frets: "x9bba9", name: "F#m", pos: "9th" }],
  "Bbm": [{ frets: "x13321", name: "Bbm", pos: "1st" }, { frets: "688666", name: "Bbm", pos: "6th" }, { frets: "xx3321", name: "Bbm", pos: "Partial" }],
  "G#m": [{ frets: "466444", name: "G#m", pos: "4th" }],
  "Abm": [{ frets: "466444", name: "Abm", pos: "4th" }],
  // ─── 7th chords ───
  "Am7":  [{ frets: "x02010", name: "Am7", pos: "Open" }, { frets: "575555", name: "Am7", pos: "5th" }, { frets: "x02013", name: "Am7", pos: "Open alt" }],
  "Dm7":  [{ frets: "xx0211", name: "Dm7", pos: "Open" }, { frets: "x57565", name: "Dm7", pos: "5th" }],
  "Em7":  [{ frets: "022030", name: "Em7", pos: "Open" }, { frets: "020000", name: "Em7", pos: "Easy" }, { frets: "x79787", name: "Em7", pos: "7th" }],
  "Cmaj7": [{ frets: "x32000", name: "Cmaj7", pos: "Open" }, { frets: "x35453", name: "Cmaj7", pos: "3rd" }, { frets: "xx5500", name: "Cmaj7", pos: "Partial" }],
  "Dmaj7": [{ frets: "xx0222", name: "Dmaj7", pos: "Open" }, { frets: "x57675", name: "Dmaj7", pos: "5th" }],
  "Gm7":  [{ frets: "353333", name: "Gm7", pos: "3rd" }, { frets: "xx5331", name: "Gm7", pos: "Partial" }, { frets: "3x3333", name: "Gm7", pos: "3rd alt" }],
  "C7":   [{ frets: "x32310", name: "C7", pos: "Open" }, { frets: "x35353", name: "C7", pos: "3rd" }, { frets: "8a8988", name: "C7", pos: "8th" }],
  "A7":   [{ frets: "x02020", name: "A7", pos: "Open" }, { frets: "575655", name: "A7", pos: "5th" }, { frets: "x02023", name: "A7", pos: "Open alt" }],
  "E7":   [{ frets: "020100", name: "E7", pos: "Open" }, { frets: "x79797", name: "E7", pos: "7th" }, { frets: "022130", name: "E7", pos: "Open alt" }],
  "B7":   [{ frets: "x21202", name: "B7", pos: "Open" }, { frets: "797877", name: "B7", pos: "7th" }, { frets: "x24242", name: "B7", pos: "2nd" }],
  "F#7":  [{ frets: "242322", name: "F#7", pos: "2nd" }, { frets: "xx4320", name: "F#7", pos: "Partial" }, { frets: "x9b9b9", name: "F#7", pos: "9th" }],
  "G7":   [{ frets: "320001", name: "G7", pos: "Open" }, { frets: "353433", name: "G7", pos: "3rd" }, { frets: "xx0001", name: "G7", pos: "Easy" }],
  "D7":   [{ frets: "xx0212", name: "D7", pos: "Open" }, { frets: "x57575", name: "D7", pos: "5th" }, { frets: "acabaa", name: "D7", pos: "10th" }],
  "F7":   [{ frets: "131211", name: "F7", pos: "1st" }, { frets: "x8a8a8", name: "F7", pos: "8th" }, { frets: "xx1211", name: "F7", pos: "Partial" }],
  "Bb7":  [{ frets: "x13131", name: "Bb7", pos: "1st" }, { frets: "686766", name: "Bb7", pos: "6th" }, { frets: "xx3334", name: "Bb7", pos: "Partial" }],
  "Eb7":  [{ frets: "x68686", name: "Eb7", pos: "6th" }, { frets: "xx1023", name: "Eb7", pos: "Partial" }],
  "C#7":  [{ frets: "x46464", name: "C#7", pos: "4th" }],
  "Ab7":  [{ frets: "464544", name: "Ab7", pos: "4th" }],
  "Ebm7": [{ frets: "x68676", name: "Ebm7", pos: "6th" }],
  // ─── Maj7 chords (additional) ───
  "Fmaj7": [{ frets: "133210", name: "Fmaj7", pos: "1st" }, { frets: "x03210", name: "Fmaj7", pos: "Open" }, { frets: "xx3210", name: "Fmaj7", pos: "Partial" }],
  "Gmaj7": [{ frets: "320002", name: "Gmaj7", pos: "Open" }, { frets: "355432", name: "Gmaj7", pos: "3rd" }, { frets: "xx5432", name: "Gmaj7", pos: "Partial" }],
  "Amaj7": [{ frets: "x02120", name: "Amaj7", pos: "Open" }, { frets: "577654", name: "Amaj7", pos: "5th" }, { frets: "x02124", name: "Amaj7", pos: "Open alt" }],
  "Emaj7": [{ frets: "021100", name: "Emaj7", pos: "Open" }, { frets: "xx9897", name: "Emaj7", pos: "Partial" }],
  "Bmaj7": [{ frets: "x24342", name: "Bmaj7", pos: "2nd" }, { frets: "799876", name: "Bmaj7", pos: "7th" }],
  "Bbmaj7": [{ frets: "x13231", name: "Bbmaj7", pos: "1st" }],
  "Ebmaj7": [{ frets: "x68786", name: "Ebmaj7", pos: "6th" }],
  "F#maj7": [{ frets: "244321", name: "F#maj7", pos: "2nd" }],
  "C#maj7": [{ frets: "x46564", name: "C#maj7", pos: "4th" }],
  "Abmaj7": [{ frets: "4x5544", name: "Abmaj7", pos: "4th" }],
  // ─── Minor 7th chords (additional) ───
  "Cm7":  [{ frets: "x35343", name: "Cm7", pos: "3rd" }, { frets: "8a8888", name: "Cm7", pos: "8th" }, { frets: "xx5343", name: "Cm7", pos: "Partial" }],
  "F#m7": [{ frets: "242222", name: "F#m7", pos: "2nd" }, { frets: "x9b9a9", name: "F#m7", pos: "9th" }],
  "Bm7":  [{ frets: "x20202", name: "Bm7", pos: "Open" }, { frets: "797777", name: "Bm7", pos: "7th" }, { frets: "x24232", name: "Bm7", pos: "2nd" }],
  "C#m7": [{ frets: "x46454", name: "C#m7", pos: "4th" }, { frets: "9b9999", name: "C#m7", pos: "9th" }],
  "G#m7": [{ frets: "464444", name: "G#m7", pos: "4th" }, { frets: "xx4444", name: "G#m7", pos: "Partial" }],
  "Fm7":  [{ frets: "131111", name: "Fm7", pos: "1st" }, { frets: "x8a898", name: "Fm7", pos: "8th" }],
  "Bbm7": [{ frets: "x13121", name: "Bbm7", pos: "1st" }, { frets: "686666", name: "Bbm7", pos: "6th" }],
  // ─── Sus chords ───
  "Dsus2": [{ frets: "xx0230", name: "Dsus2", pos: "Open" }, { frets: "x57755", name: "Dsus2", pos: "5th" }],
  "Dsus4": [{ frets: "xx0233", name: "Dsus4", pos: "Open" }, { frets: "x57785", name: "Dsus4", pos: "5th" }],
  "Asus2": [{ frets: "x02200", name: "Asus2", pos: "Open" }],
  "Asus4": [{ frets: "x02230", name: "Asus4", pos: "Open" }, { frets: "577755", name: "Asus4", pos: "5th" }],
  "Esus2": [{ frets: "024400", name: "Esus2", pos: "Open" }, { frets: "x79977", name: "Esus2", pos: "7th" }],
  "Esus4": [{ frets: "022200", name: "Esus4", pos: "Open" }, { frets: "x799a7", name: "Esus4", pos: "7th" }],
  "Gsus2": [{ frets: "300033", name: "Gsus2", pos: "Open" }, { frets: "355233", name: "Gsus2", pos: "3rd" }],
  "Gsus4": [{ frets: "330013", name: "Gsus4", pos: "Open" }, { frets: "355533", name: "Gsus4", pos: "3rd" }],
  "Csus2": [{ frets: "x30013", name: "Csus2", pos: "Open" }, { frets: "x35533", name: "Csus2", pos: "3rd" }],
  "Csus4": [{ frets: "x33011", name: "Csus4", pos: "Open" }, { frets: "x35563", name: "Csus4", pos: "3rd" }],
  "Fsus2": [{ frets: "xx3013", name: "Fsus2", pos: "Open" }],
  "Fsus4": [{ frets: "133311", name: "Fsus4", pos: "1st" }],
  "Bsus2": [{ frets: "x24422", name: "Bsus2", pos: "2nd" }],
  "Bsus4": [{ frets: "x24452", name: "Bsus4", pos: "2nd" }],
  "Cadd6": [{ frets: "x32210", name: "Cadd6", pos: "Open" }],
  // ─── Diminished chords ───
  "Cdim": [{ frets: "x3424x", name: "Cdim", pos: "3rd" }],
  "Ddim": [{ frets: "xx0131", name: "Ddim", pos: "Open" }],
  "Edim": [{ frets: "0120xx", name: "Edim", pos: "Open" }],
  "Fdim": [{ frets: "1231xx", name: "Fdim", pos: "1st" }],
  "Gdim": [{ frets: "3453xx", name: "Gdim", pos: "3rd" }],
  "Adim": [{ frets: "x0121x", name: "Adim", pos: "Open" }],
  "Bdim": [{ frets: "x2343x", name: "Bdim", pos: "2nd" }],
  // ─── Augmented chords ───
  "Caug": [{ frets: "x32110", name: "Caug", pos: "Open" }],
  "Daug": [{ frets: "xx0332", name: "Daug", pos: "Open" }],
  "Eaug": [{ frets: "032110", name: "Eaug", pos: "Open" }],
  "Faug": [{ frets: "143221", name: "Faug", pos: "1st" }],
  "Gaug": [{ frets: "321003", name: "Gaug", pos: "Open" }],
  "Aaug": [{ frets: "x03221", name: "Aaug", pos: "Open" }],
  "Baug": [{ frets: "x21003", name: "Baug", pos: "Open" }],
  // ─── Power chords ───
  "A5":  [{ frets: "x022xx", name: "A5", pos: "Open" }, { frets: "577xxx", name: "A5", pos: "5th" }],
  "D5":  [{ frets: "xx023x", name: "D5", pos: "Open" }, { frets: "x577xx", name: "D5", pos: "5th" }],
  "E5":  [{ frets: "022xxx", name: "E5", pos: "Open" }, { frets: "x799xx", name: "E5", pos: "7th" }],
  "B5":  [{ frets: "x244xx", name: "B5", pos: "2nd" }, { frets: "799xxx", name: "B5", pos: "7th" }],
  "G5":  [{ frets: "355xxx", name: "G5", pos: "3rd" }, { frets: "3x0xxx", name: "G5", pos: "Open" }],
  "C5":  [{ frets: "x355xx", name: "C5", pos: "3rd" }, { frets: "8aaxxx", name: "C5", pos: "8th" }],
  "F5":  [{ frets: "133xxx", name: "F5", pos: "1st" }, { frets: "x8aaxx", name: "F5", pos: "8th" }],
};

// Backward-compatible accessor: returns first voicing as { frets, name } for StrumChartBuilder
const CHORD_VOICINGS = new Proxy(CHORD_VOICINGS_MULTI, {
  get(target, prop) {
    if (prop === Symbol.toPrimitive || prop === Symbol.iterator || typeof prop === "symbol") return undefined;
    const arr = target[prop];
    return arr ? arr[0] : undefined;
  },
  has(target, prop) { return prop in target; },
});

function makeEmptyCell() { return { chord: null, strum: null, lyric: "" }; }
function makeEmptyMeasure() { return { cells: Array.from({ length: 8 }, makeEmptyCell), between: {}, sectionLabel: "" }; }

export function makeTemplateChart() {
  const m = makeEmptyMeasure();
  // Reggae offbeat template: ↓ _ ↓ _ ↑ ↓ _ ↑
  m.cells[0] = { chord: "G", strum: "D", lyric: "" };
  m.cells[1] = { chord: null, strum: null, lyric: "" };
  m.cells[2] = { chord: null, strum: "D", lyric: "" };
  m.cells[3] = { chord: null, strum: null, lyric: "" };
  m.cells[4] = { chord: null, strum: "U", lyric: "" };
  m.cells[5] = { chord: null, strum: "D", lyric: "" };
  m.cells[6] = { chord: null, strum: null, lyric: "" };
  m.cells[7] = { chord: null, strum: "U", lyric: "" };
  return {
    id: "chart_" + Date.now(),
    title: "",
    bpm: 80,
    activeSlots: [],
    barsPerGroup: 0,
    beatOffset: 0,
    measures: [m],
    lyricsPool: [],
    lyricsInput: "",
    youtubeUrl: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// Validate and sanitize an imported chart object
function validateAndSanitizeChart(obj) {
  if (!obj || typeof obj !== "object") return { error: "Invalid JSON — not an object" };
  if (!Array.isArray(obj.measures) || obj.measures.length === 0) return { error: "Chart must have at least one measure" };
  if (obj.measures.length > 200) return { error: "Chart too large — max 200 measures" };
  for (let i = 0; i < obj.measures.length; i++) {
    const m = obj.measures[i];
    if (!Array.isArray(m.cells) || m.cells.length !== 8) return { error: `Measure ${i + 1} must have exactly 8 cells` };
    m.between = m.between || {};
    m.sectionLabel = m.sectionLabel || "";
  }
  const bpm = typeof obj.bpm === "number" && obj.bpm >= 40 && obj.bpm <= 280 ? obj.bpm : 80;
  // Allowlist: only copy known fields to prevent prototype pollution from arbitrary JSON
  return {
    chart: {
      id: "chart_" + Date.now(),
      title: typeof obj.title === "string" ? obj.title.slice(0, 200) : "",
      bpm,
      activeSlots: Array.isArray(obj.activeSlots) ? obj.activeSlots : [],
      barsPerGroup: typeof obj.barsPerGroup === "number" ? obj.barsPerGroup : 0,
      beatOffset: typeof obj.beatOffset === "number" ? obj.beatOffset : 0,
      measures: obj.measures,
      lyricsPool: Array.isArray(obj.lyricsPool) ? obj.lyricsPool : [],
      lyricsInput: typeof obj.lyricsInput === "string" ? obj.lyricsInput.slice(0, 5000) : "",
      youtubeUrl: typeof obj.youtubeUrl === "string" && /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(obj.youtubeUrl) ? obj.youtubeUrl.slice(0, 500) : "",
      createdAt: obj.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
  };
}

// URL sharing — encode chart state as base64 in URL hash
function compressToURL(obj) {
  try {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    const binary = Array.from(bytes, b => String.fromCharCode(b)).join("");
    return btoa(binary);
  } catch { return null; }
}
function decompressFromURL(str) {
  try {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch { return null; }
}

// ─── ChordVoicingViewer (for exercise inline chord diagrams) ───────────────
export { CHORD_VOICINGS, CHORD_VOICINGS_MULTI };

// Auto-extract chord names from exercise text that exist in our voicing dictionary
export function extractChordsFromExercise(ex) {
  if (!ex) return [];
  // Collect all text fields from the exercise
  const textParts = [ex.what || "", ex.title || "", ex.setup || "", ex.sarah || ""];
  if (ex.steps) ex.steps.forEach(s => { textParts.push(s.text || ""); });
  const blob = textParts.join(" ");

  // Sort chord names longest-first so "C#m" matches before "C#" before "C"
  const chordNames = Object.keys(CHORD_VOICINGS_MULTI).sort((a, b) => b.length - a.length);

  // Match chord names that appear as whole "words" (preceded by space/start, followed by non-letter or chord boundary)
  const found = new Set();
  for (const ch of chordNames) {
    // Escape special regex chars in chord name (# is literal)
    const escaped = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/#/g, '\\#');
    // Match chord name preceded by space/punctuation/start and followed by non-alphanumeric (except # which is part of chord names)
    const re = new RegExp(`(?:^|[\\s,→\\-–—(/])${escaped}(?=[\\s,→\\-–—)/.:;!?]|$)`, 'g');
    if (re.test(blob)) found.add(ch);
  }
  // Return in a musically sensible order: preserve order of first appearance in text
  const ordered = [];
  for (const ch of chordNames) {
    if (found.has(ch) && !ordered.includes(ch)) {
      // Check first appearance position
      const idx = blob.indexOf(ch);
      if (idx >= 0) ordered.push({ ch, idx });
    }
  }
  ordered.sort((a, b) => a.idx - b.idx);
  return ordered.map(o => o.ch);
}

function playChordAudio(fretStr) {
  if (!fretStr) return;
  const resume = async () => { if (Tone.context.state !== 'running') await Tone.context.resume(); };
  resume();
  // Parse frets: digits 0-9 as frets, a-f as 10-15 (hex-style for high frets), x as muted
  const f = fretStr.split("").map(c => {
    if (c === "x") return -1;
    const n = parseInt(c, 16); // handles 0-9 and a-f
    return isNaN(n) ? -1 : n;
  });
  const stringMidi = [52, 57, 62, 67, 71, 76]; // E3-A3-D4-G4-B4-E5 (one octave up for clarity)
  f.forEach((fretNum, i) => {
    if (fretNum < 0) return;
    const midi = stringMidi[i] + fretNum;
    const noteNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    const note = noteNames[midi % 12] + (Math.floor(midi / 12) - 1);
    setTimeout(() => {
      const synth = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.04, decay: 0.25, sustain: 0.5, release: 1.5 }
      }).toDestination();
      synth.volume.value = -10;
      synth.triggerAttackRelease(note, "2n");
      setTimeout(() => synth.dispose(), 2500);
    }, i * 65);
  });
}

export function ChordVoicingViewer({ theme: T, chords = [], defaultChord }) {
  const [selectedChord, setSelectedChord] = useState(defaultChord || chords[0] || null);
  // Track which voicing index is active per chord
  const [voicingIdx, setVoicingIdx] = useState({});
  if (!chords.length) return null;

  const getVoicings = (ch) => CHORD_VOICINGS_MULTI[ch] || [];
  const getActiveVoicing = (ch) => {
    const voicings = getVoicings(ch);
    const idx = voicingIdx[ch] || 0;
    return voicings[Math.min(idx, voicings.length - 1)] || null;
  };

  return (
    <div style={{
      marginBottom: 24, background: T.bgSoft, border: `1px solid ${T.border}`,
      borderRadius: T.radiusMd || 4, padding: "16px 12px 12px", overflow: "hidden",
    }}>
      {/* Chord selector pills */}
      {chords.length > 1 && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14,
          justifyContent: "center", padding: "0 4px",
        }}>
          {chords.map(ch => {
            const isActive = ch === selectedChord;
            return (
              <button key={ch} onClick={() => setSelectedChord(ch)} style={{
                background: isActive ? T.gold : "transparent",
                color: isActive ? "#fff" : T.textDark,
                border: `1.5px solid ${isActive ? T.gold : T.border}`,
                borderRadius: 16, padding: "4px 14px", fontSize: 13,
                fontFamily: T.serif, fontWeight: isActive ? 700 : 500,
                cursor: "pointer", transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}>{ch}</button>
            );
          })}
        </div>
      )}

      {/* Selected chord: voicing position tabs + diagram */}
      {selectedChord && (() => {
        const voicings = getVoicings(selectedChord);
        if (!voicings.length) return (
          <div style={{ textAlign: "center", padding: 20, color: T.textMuted, fontFamily: T.sans, fontSize: 12 }}>
            {selectedChord} — no voicing data
          </div>
        );
        const activeIdx = Math.min(voicingIdx[selectedChord] || 0, voicings.length - 1);
        const active = voicings[activeIdx];

        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            {/* Position tabs — only show if multiple voicings */}
            {voicings.length > 1 && (
              <div style={{
                display: "flex", gap: 4, padding: "2px 4px",
                background: T.bgCard, borderRadius: 12, border: `1px solid ${T.border}`,
              }}>
                {voicings.map((v, i) => {
                  const isActive2 = i === activeIdx;
                  return (
                    <button key={i} onClick={() => {
                      setVoicingIdx(prev => ({ ...prev, [selectedChord]: i }));
                      playChordAudio(v.frets);
                    }} style={{
                      background: isActive2 ? T.gold : "transparent",
                      color: isActive2 ? "#fff" : T.textMed,
                      border: "none", borderRadius: 10,
                      padding: "3px 10px", fontSize: 11,
                      fontFamily: T.sans, fontWeight: isActive2 ? 700 : 400,
                      cursor: "pointer", transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}>{v.pos || `Pos ${i + 1}`}</button>
                  );
                })}
              </div>
            )}

            {/* The chord diagram — tap to play */}
            <div
              onClick={() => playChordAudio(active.frets)}
              role="button" tabIndex={0} aria-label={`Play ${selectedChord} chord, ${active.pos || ""} position`}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playChordAudio(active.frets); } }}
              style={{ cursor: "pointer", transition: "transform 0.1s ease" }}
              onPointerDown={e => e.currentTarget.style.transform = "scale(0.97)"}
              onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <ChordDiagram theme={T} frets={active.frets} name={active.name} />
            </div>

            {/* Hint text */}
            <div style={{
              fontSize: 10, color: T.textMuted, fontFamily: T.sans,
              textAlign: "center", letterSpacing: "0.03em", marginTop: -4,
            }}>
              tap to hear{voicings.length > 1 ? " · switch positions above" : ""}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── ChordDiagram ───────────────────────────────────────────────────────────
export function ChordDiagram({ theme: T, frets, name, onClose }) {
  if (!frets) return null;
  const f = frets.split("").map(c => c === "x" ? -1 : parseInt(c, 16)); // hex: 0-9 + a=10 b=11 etc.
  const playable = f.filter(v => v > 0);
  const minFret = playable.length ? Math.min(...playable) : 1;
  const maxFret = playable.length ? Math.max(...playable) : 1;
  const startFret = maxFret <= 4 ? 1 : minFret;
  const numFrets = 4;

  const w = 120, h = 140;
  const left = 28, top = 30, strGap = 14, fretGap = 22;

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      padding: 12, boxShadow: T.md, position: "relative", width: w + 24,
    }} onClick={e => e.stopPropagation()}>
      {onClose && (
        <button onClick={onClose} style={{
          position: "absolute", top: 4, right: 4, background: "none", border: "none",
          cursor: "pointer", color: T.textMuted, padding: 4,
        }}><X size={12} /></button>
      )}
      {name && (
        <div style={{
          textAlign: "center", fontFamily: T.serif, fontWeight: 700, fontSize: 14,
          color: T.gold, marginBottom: 4,
        }}>{name}</div>
      )}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Fret lines */}
        {Array.from({ length: numFrets + 1 }, (_, i) => (
          <line key={`f${i}`}
            x1={left} y1={top + i * fretGap}
            x2={left + 5 * strGap} y2={top + i * fretGap}
            stroke={i === 0 && startFret === 1 ? T.textDark : T.border}
            strokeWidth={i === 0 && startFret === 1 ? 3 : 1}
          />
        ))}
        {/* String lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`s${i}`}
            x1={left + i * strGap} y1={top}
            x2={left + i * strGap} y2={top + numFrets * fretGap}
            stroke={T.border} strokeWidth={1}
          />
        ))}
        {/* Start fret number */}
        {startFret > 1 && (
          <text x={left - 8} y={top + fretGap * 0.6} textAnchor="end"
            fontSize={9} fill={T.textMed} fontFamily={T.sans}>{startFret}</text>
        )}
        {/* Dots + X/O markers */}
        {f.map((fretNum, strIdx) => {
          const sx = left + strIdx * strGap;
          if (fretNum === -1) {
            return <text key={strIdx} x={sx} y={top - 8} textAnchor="middle"
              fontSize={10} fill={T.textMuted} fontFamily={T.sans}>×</text>;
          }
          if (fretNum === 0) {
            return <circle key={strIdx} cx={sx} cy={top - 8} r={4}
              fill="none" stroke={T.textMed} strokeWidth={1.5} />;
          }
          const fy = top + (fretNum - startFret + 0.5) * fretGap;
          return <circle key={strIdx} cx={sx} cy={fy} r={5}
            fill={T.gold} stroke="none" />;
        })}
      </svg>
    </div>
  );
}

// ─── Bottom Sheet ───────────────────────────────────────────────────────────
function BottomSheet({ theme: T, open, onClose, children }) {
  const isWide = useIsWide(900);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  // Desktop: side panel from right
  if (isWide) {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: animating ? "rgba(0,0,0,0.2)" : "transparent",
        transition: "background 0.25s",
      }} onClick={onClose}>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 340,
          background: T.bgCard, borderLeft: `1px solid ${T.border}`,
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          transform: animating ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
          overflowY: "auto",
          padding: "16px 20px 24px",
        }} onClick={e => e.stopPropagation()}>
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <button onClick={onClose} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 4,
            }}><X size={18} /></button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  // Mobile: bottom sheet
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: animating ? "rgba(0,0,0,0.3)" : "transparent",
      transition: "background 0.25s",
    }} onClick={onClose}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: T.bgCard, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        transform: animating ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
        maxHeight: "60vh", overflowY: "auto",
        padding: "12px 16px 24px",
      }} onClick={e => e.stopPropagation()}>
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 2, background: T.borderSoft,
          margin: "0 auto 12px",
        }} />
        {children}
      </div>
    </div>
  );
}

// ─── StrumChartBuilder ──────────────────────────────────────────────────────
export function StrumChartBuilder({ theme: T, metro, initialChart, onBack, onSave }) {
  const isWide = useIsWide(900);
  const [chart, setChart] = useState(() => initialChart || makeTemplateChart());
  const [undoStack, setUndoStack] = useState([]);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceMeasure, setPracticeMeasure] = useState(0); // current measure in practice auto-scroll
  const practiceBeatRef = useRef(0); // beat counter for practice mode auto-advance
  const [pickerSong, setPickerSong] = useState(null); // song object from SongPicker for desktop player
  const [activeChordCell, setActiveChordCell] = useState(null); // { m, c } measure + cell index
  const [selectedChip, setSelectedChip] = useState(null); // index in lyricsPool
  const [recentChords, setRecentChords] = useState([]);
  const [customChord, setCustomChord] = useState("");
  const [chordQuality, setChordQuality] = useState(""); // "", "m", "7", "m7", "maj7", "sus2", "sus4", "dim", "aug"
  const [savedShow, setSavedShow] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);
  const [chordVoicing, setChordVoicing] = useState(null); // { m, c }
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [currentBar, setCurrentBar] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsEditing, setLyricsEditing] = useState(!initialChart);
  const longPressRef = useRef(null);
  const savedTimerRef = useRef(null);

  // rAF-based 8th-note beat tracking
  const [eighthCol, setEighthCol] = useState(-1);
  const [eighthMeasure, setEighthMeasure] = useState(-1);
  const lastBeatTimeRef = useRef(0);
  const lastBeatRef = useRef(-1);
  const lastBarRef = useRef(-1);
  const beatRafRef = useRef(null);
  const bpmRef = useRef(80);
  const numMeasuresRef = useRef(1);

  // Countdown state — bar 0 is countdown, bar 1+ is real playback
  const [countdownBeat, setCountdownBeat] = useState(-1); // -1 = no countdown, 0-3 = counting
  const countdownActiveRef = useRef(false);

  // Section loop state
  const [loopStart, setLoopStart] = useState(null); // measure index or null
  const [loopEnd, setLoopEnd] = useState(null);
  const [loopSelecting, setLoopSelecting] = useState(false); // true when in loop selection mode
  const loopStartRef = useRef(null);
  const loopEndRef = useRef(null);

  // Note tone playback refs
  const noteSynthRef = useRef(null);
  const chartRef = useRef(chart);

  // Note picker state — tracks which cell's picker is open: { m: measureIdx, c: cellIdx, between: bool } or null
  const [notePicker, setNotePicker] = useState(null);
  const [noteOctave, setNoteOctave] = useState(4);
  const [showGroupPanel, setShowGroupPanel] = useState(false);
  const [notesMuted, setNotesMuted] = useState(false);
  const notesMutedRef = useRef(false);
  const notePickerRef = useRef(null);

  // Click-outside to dismiss note picker
  useEffect(() => {
    if (!notePicker) return;
    const handler = (e) => {
      if (notePickerRef.current && !notePickerRef.current.contains(e.target)) {
        setNotePicker(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler); };
  }, [notePicker]);

  // Audio sync state
  const [songPlaying, setSongPlaying] = useState(false);
  const [songLoopState, setSongLoopState] = useState({ isLooping: false, loopStart: 0, loopEnd: 0 });
  const latestSongTimeRef = useRef(0);

  // Tap tempo — taps stored in ref (never rendered), only detected BPM is state
  const tapsRef = useRef([]);
  const [tapBpm, setTapBpm] = useState(null);

  // Update chart with undo — defensive: if updater forgets to return, fall back to clone
  const updateChart = useCallback((updater) => {
    setChart(prev => {
      const clone = JSON.parse(JSON.stringify(prev));
      setUndoStack(s => [...s.slice(-9), clone]);
      const next = typeof updater === "function" ? updater(JSON.parse(JSON.stringify(prev))) : updater;
      const result = next || clone;
      result.updatedAt = Date.now();
      return result;
    });
  }, []);

  // Undo
  const undo = useCallback(() => {
    setUndoStack(stack => {
      if (stack.length === 0) return stack;
      const prev = stack[stack.length - 1];
      setChart(prev);
      return stack.slice(0, -1);
    });
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (!chart.id) return;
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      all[chart.id] = chart;
      localStorage.setItem("strumCharts", JSON.stringify(all));
    } catch { }
    if (onSave) onSave(chart);
    // Flash saved indicator
    setSavedShow(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedShow(false), 1500);
  }, [chart, onSave]);

  // Metronome listener — records timestamps for rAF interpolation
  useEffect(() => {
    const handler = (e) => {
      const { beat, bar } = e.detail;
      if (beat !== undefined) {
        setCurrentBeat(beat);
        lastBeatRef.current = beat;
        lastBeatTimeRef.current = performance.now();
      }
      if (bar !== undefined) {
        setCurrentBar(bar);
        lastBarRef.current = bar;
        // Countdown: bar 0 is count-in, bar 1+ is real playback
        if (bar === 0) {
          countdownActiveRef.current = true;
          setCountdownBeat(beat);
        } else if (countdownActiveRef.current) {
          countdownActiveRef.current = false;
          setCountdownBeat(-1);
        }
      }
      setIsPlaying(true);
    };
    const stopHandler = () => {
      setIsPlaying(false); setCurrentBeat(-1); setCurrentBar(-1);
      setEighthCol(-1); setEighthMeasure(-1);
      lastBeatRef.current = -1; lastBarRef.current = -1;
      countdownActiveRef.current = false; setCountdownBeat(-1);
      noteSynthRef.current?.releaseAll();
    };
    window.addEventListener("metroBeat", handler);
    let stopTimer;
    const resetStop = () => { clearTimeout(stopTimer); stopTimer = setTimeout(stopHandler, 1500); };
    window.addEventListener("metroBeat", resetStop);
    return () => {
      window.removeEventListener("metroBeat", handler);
      window.removeEventListener("metroBeat", resetStop);
      clearTimeout(stopTimer);
    };
  }, []);

  // Keep refs current so rAF loop always reads latest values
  bpmRef.current = chart.bpm || 80;
  numMeasuresRef.current = chart.measures.length;
  loopStartRef.current = loopStart;
  loopEndRef.current = loopEnd;
  notesMutedRef.current = notesMuted;
  chartRef.current = chart;

  // Note synth setup/cleanup
  useEffect(() => {
    noteSynthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.6 },
    }).toDestination();
    noteSynthRef.current.maxPolyphony = 8;
    noteSynthRef.current.volume.value = 4;
    return () => { noteSynthRef.current?.dispose(); noteSynthRef.current = null; };
  }, []);

  // Note playback via metroBeatAudio (sample-accurate timing)
  useEffect(() => {
    const handleNoteAudio = (e) => {
      const { beat, bar, time } = e.detail;
      if (bar === undefined || time === undefined) return;
      if (Tone.context.state !== "running") return;
      if (notesMutedRef.current) return;
      // Bar 0 = countdown, skip note playback
      const realBar = bar - 1;
      if (realBar < 0) return;
      const nm = numMeasuresRef.current;
      const ls = loopStartRef.current;
      const le = loopEndRef.current;
      let measure;
      if (ls !== null && le !== null && ls <= le) {
        measure = ls + (realBar % (le - ls + 1));
      } else {
        measure = realBar % nm;
      }
      const ch = chartRef.current;
      if (!ch?.measures?.[measure]) return;
      const bpm = bpmRef.current;
      const eighthDur = 60 / bpm / 2;
      // Downbeat: column = beat * 2
      const downCol = beat * 2;
      const downCell = ch.measures[measure].cells[downCol];
      if (downCell?.note && noteSynthRef.current) {
        try { noteSynthRef.current.triggerAttackRelease(downCell.note, "8n", time); } catch (e) { console.debug("note synth:", e); }
      }
      // "And" beat: column = beat * 2 + 1
      const andCol = downCol + 1;
      if (andCol < 8) {
        const andCell = ch.measures[measure].cells[andCol];
        if (andCell?.note && noteSynthRef.current) {
          try { noteSynthRef.current.triggerAttackRelease(andCell.note, "8n", time + eighthDur); } catch (e) { console.debug("note synth:", e); }
        }
      }
    };
    window.addEventListener("metroBeatAudio", handleNoteAudio);
    return () => window.removeEventListener("metroBeatAudio", handleNoteAudio);
  }, []);

  // rAF loop for 8th-note interpolation (when metronome plays, no song audio)
  useEffect(() => {
    if (!isPlaying || songPlaying) {
      cancelAnimationFrame(beatRafRef.current);
      return;
    }
    const animate = () => {
      if (lastBeatRef.current < 0) { beatRafRef.current = requestAnimationFrame(animate); return; }
      const elapsed = performance.now() - lastBeatTimeRef.current;
      const quarterMs = 60000 / bpmRef.current;
      const subBeat = elapsed >= quarterMs / 2 ? 1 : 0;
      const col = lastBeatRef.current * 2 + subBeat;
      const nm = numMeasuresRef.current;
      // Bar 0 = countdown (no chart highlight), bar 1+ = real playback
      const realBar = lastBarRef.current - 1;
      if (realBar < 0) {
        // During countdown — don't highlight any measure
        setEighthCol(-1);
        setEighthMeasure(-1);
      } else {
        // Loop-aware measure calculation
        const ls = loopStartRef.current;
        const le = loopEndRef.current;
        let measure;
        if (ls !== null && le !== null && ls <= le) {
          measure = ls + (realBar % (le - ls + 1));
        } else {
          measure = realBar % nm;
        }
        setEighthCol(col);
        setEighthMeasure(measure);
      }
      beatRafRef.current = requestAnimationFrame(animate);
    };
    beatRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(beatRafRef.current);
  }, [isPlaying, songPlaying]);

  // Audio sync listener — uses songTimeUpdate events from MiniAudioPlayer
  useEffect(() => {
    const handler = (e) => {
      const { currentTime, playing, isLooping, loopStart, loopEnd } = e.detail;
      if (!playing) { setSongPlaying(false); return; }
      setSongPlaying(true);
      latestSongTimeRef.current = currentTime;
      const loop = { isLooping: !!isLooping, loopStart: loopStart || 0, loopEnd: loopEnd || 0 };
      setSongLoopState(loop);

      if (chart.beatOffset > 0 && chart.bpm > 0) {
        let effectiveTime = currentTime;
        if (loop.isLooping && loop.loopEnd > loop.loopStart) {
          effectiveTime = loop.loopStart + ((currentTime - loop.loopStart) % (loop.loopEnd - loop.loopStart));
        }
        const eighthDur = 60 / chart.bpm / 2;
        const elapsed = effectiveTime - chart.beatOffset;
        const totalEighths = Math.floor(elapsed / eighthDur);
        const numMeasures = chart.measures.length;
        setEighthCol(((totalEighths % 8) + 8) % 8);
        setEighthMeasure(((Math.floor(totalEighths / 8) % numMeasures) + numMeasures) % numMeasures);
      }
    };
    window.addEventListener("songTimeUpdate", handler);
    return () => window.removeEventListener("songTimeUpdate", handler);
  }, [chart.beatOffset, chart.bpm, chart.measures.length]);

  // Strum cell handlers — cycle: D → U → X → null (rest/blank) → D
  const cycleStrum = (mIdx, cIdx) => {
    if (isPlaying) return;
    const cur = chart.measures[mIdx].cells[cIdx].strum;
    let next;
    if (!cur) next = "D";
    else if (cur === "D") next = "U";
    else if (cur === "U") next = "X";
    else next = null; // X → rest (blank)
    updateChart(c => { c.measures[mIdx].cells[cIdx].strum = next; return c; });
  };

  const clearStrumCell = (mIdx, cIdx) => {
    updateChart(c => { c.measures[mIdx].cells[cIdx].strum = null; return c; });
  };

  // Long-press handler for strum cells
  const startLongPress = (mIdx, cIdx, type) => {
    longPressRef.current = setTimeout(() => {
      if (type === "strum") clearStrumCell(mIdx, cIdx);
      if (type === "chord") {
        const chord = chart.measures[mIdx].cells[cIdx].chord;
        if (chord && CHORD_VOICINGS[chord]) {
          setChordVoicing({ m: mIdx, c: cIdx });
        }
      }
      longPressRef.current = "fired";
    }, 300);
  };
  const endLongPress = () => {
    if (longPressRef.current && longPressRef.current !== "fired") {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    } else if (longPressRef.current === "fired") {
      // Delay null-out so onClick handlers can still check "fired"
      setTimeout(() => { longPressRef.current = null; }, 50);
    }
  };

  // Chord handlers
  const selectChord = (chord) => {
    if (!activeChordCell) return;
    const { m, c } = activeChordCell;
    updateChart(ch => { ch.measures[m].cells[c].chord = chord; return ch; });
    setRecentChords(prev => {
      const next = [chord, ...prev.filter(x => x !== chord)].slice(0, 4);
      return next;
    });
  };
  const clearChord = () => {
    if (!activeChordCell) return;
    const { m, c } = activeChordCell;
    updateChart(ch => { ch.measures[m].cells[c].chord = null; return ch; });
  };

  // Chord tap handler — short tap opens picker, long press opens voicing
  const handleChordCellTap = (mIdx, cIdx) => {
    if (isPlaying) return;
    if (longPressRef.current === "fired") return; // was a long press
    setActiveChordCell({ m: mIdx, c: cIdx });
  };

  // Lyrics handlers
  const handleLyricsPaste = (text) => {
    updateChart(c => {
      c.lyricsInput = text;
      // Split on spaces and hyphens (keeping hyphens attached)
      const words = text.split(/\s+/).filter(w => w.length > 0).flatMap(w => {
        if (w.includes("-")) {
          return w.split(/(?<=-)/).filter(s => s.length > 0);
        }
        return [w];
      });
      c.lyricsPool = words;
      // Clear all placed lyrics
      c.measures.forEach(m => m.cells.forEach(cell => { cell.lyric = ""; cell.lyricGroupId = null; }));
      return c;
    });
    setLyricsEditing(false);
    setSelectedChip(null);
  };

  const placeLyric = (mIdx, cIdx) => {
    if (selectedChip === null) return;
    const item = chart.lyricsPool[selectedChip];
    if (!item) return;
    updateChart(c => {
      c.measures[mIdx].cells[cIdx].lyric = chipText(item);
      c.measures[mIdx].cells[cIdx].lyricGroupId = chipGroup(item);
      c.lyricsPool = c.lyricsPool.filter((_, i) => i !== selectedChip);
      return c;
    });
    setSelectedChip(null);
  };

  const removePlacedLyric = (mIdx, cIdx) => {
    const cell = chart.measures[mIdx].cells[cIdx];
    if (!cell.lyric) return;
    updateChart(c => {
      const text = c.measures[mIdx].cells[cIdx].lyric;
      const groupId = c.measures[mIdx].cells[cIdx].lyricGroupId;
      c.measures[mIdx].cells[cIdx].lyric = "";
      c.measures[mIdx].cells[cIdx].lyricGroupId = null;
      // Return as tagged fragment or plain string
      const returned = groupId ? { text, groupId } : text;
      // Re-insert at original position based on lyricsInput order
      const allWords = (c.lyricsInput || "").split(/\s+/).filter(w => w.length > 0).flatMap(w =>
        w.includes("-") ? w.split(/(?<=-)/).filter(s => s.length > 0) : [w]
      );
      const pool = [...c.lyricsPool, returned];
      pool.sort((a, b) => {
        const findIdx = (w) => {
          const t = chipText(w);
          const idx = allWords.indexOf(t);
          if (idx !== -1) return idx;
          const clean = t.replace(/-$/, '');
          return allWords.findIndex(aw => aw.toLowerCase().includes(clean.toLowerCase()));
        };
        return (findIdx(a) === -1 ? 999 : findIdx(a)) - (findIdx(b) === -1 ? 999 : findIdx(b));
      });
      c.lyricsPool = pool;
      return c;
    });
  };

  const splitChip = (chipIndex, e) => {
    e.stopPropagation();
    const item = chart.lyricsPool[chipIndex];
    const syllables = splitSyllables(item);
    if (!syllables) return;
    const groupId = Date.now();
    updateChart(c => {
      c.lyricsPool.splice(chipIndex, 1, ...syllables.map(s => ({ text: s, groupId })));
      return c;
    });
    setSelectedChip(null);
  };

  const joinChip = (chipIndex, e) => {
    e.stopPropagation();
    const item = chart.lyricsPool[chipIndex];
    const groupId = chipGroup(item);
    if (!groupId) return;
    updateChart(c => {
      // Collect all pool fragments with this groupId
      const poolIdxs = [];
      c.lyricsPool.forEach((p, i) => { if (chipGroup(p) === groupId) poolIdxs.push(i); });
      // Reconstruct word from all fragments (pool + placed)
      const allFragTexts = [];
      c.lyricsPool.forEach(p => { if (chipGroup(p) === groupId) allFragTexts.push(chipText(p)); });
      // Pull placed fragments with same groupId back from cells
      c.measures.forEach(m => {
        m.cells.forEach(cell => {
          if (cell.lyricGroupId === groupId) {
            allFragTexts.push(cell.lyric);
            cell.lyric = '';
            cell.lyricGroupId = null;
          }
        });
      });
      // Find original word by matching syllable splits (order-independent)
      const origWords = (c.lyricsInput || '').split(/\s+/).filter(Boolean);
      const fragsSorted = [...allFragTexts].map(f => f.toLowerCase()).sort().join('|');
      const originalWord = origWords.find(w => {
        const syls = splitSyllables(w);
        if (!syls || syls.length !== allFragTexts.length) return false;
        return [...syls].map(s => s.toLowerCase()).sort().join('|') === fragsSorted;
      }) || allFragTexts.map(f => f.replace(/-$/, '')).join('');
      // Remove pool fragments and insert original word at first fragment's position
      const insertAt = poolIdxs[0];
      // Count how many removed items are before insertAt to adjust index
      const removedBefore = poolIdxs.filter(idx => idx < insertAt).length;
      c.lyricsPool = c.lyricsPool.filter((_, i) => !poolIdxs.includes(i));
      c.lyricsPool.splice(insertAt - removedBefore, 0, originalWord);
      return c;
    });
    setSelectedChip(null);
  };

  // Measure management — new measures clone strum pattern from previous
  const addMeasure = () => {
    updateChart(c => {
      const newM = makeEmptyMeasure();
      const prev = c.measures[c.measures.length - 1];
      if (prev) {
        prev.cells.forEach((cell, i) => { newM.cells[i].strum = cell.strum; });
      }
      c.measures.push(newM);
      return c;
    });
  };

  const removeMeasure = (mIdx) => {
    if (chart.measures.length <= 1) return;
    const removed = JSON.parse(JSON.stringify(chart.measures[mIdx]));
    updateChart(c => { c.measures.splice(mIdx, 1); return c; });
    setDeleteToast({ measure: removed, index: mIdx });
    setTimeout(() => setDeleteToast(null), 4000);
  };

  const undoDeleteMeasure = () => {
    if (!deleteToast) return;
    updateChart(c => {
      c.measures.splice(deleteToast.index, 0, deleteToast.measure);
      return c;
    });
    setDeleteToast(null);
  };

  // Interstitial 16th note slots
  const toggleSlot = (slotIdx) => {
    updateChart(c => {
      if (c.activeSlots.includes(slotIdx)) {
        // Check if any measure has content at this slot
        const hasContent = c.measures.some(m => {
          const b = m.between[slotIdx];
          return b && (b.chord || b.strum || b.lyric);
        });
        if (!hasContent) {
          c.activeSlots = c.activeSlots.filter(s => s !== slotIdx);
          c.measures.forEach(m => delete m.between[slotIdx]);
        }
      } else {
        c.activeSlots = [...c.activeSlots, slotIdx].sort((a, b) => a - b);
      }
      return c;
    });
  };

  // Tap tempo
  const handleTapTempo = () => {
    const now = performance.now();
    const recent = [...tapsRef.current, now].filter(t => now - t < 3000);
    tapsRef.current = recent;
    if (recent.length >= 2) {
      const intervals = [];
      for (let i = 1; i < recent.length; i++) intervals.push(recent[i] - recent[i - 1]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const detected = Math.round(60000 / avg);
      if (detected >= 40 && detected <= 280) {
        setTapBpm(detected);
        updateChart(c => { c.bpm = detected; return c; });
        metro.changeBpm(detected);
      }
    }
  };

  // Mark beat 1 for audio sync
  const markBeatOne = () => {
    if (latestSongTimeRef.current > 0) {
      updateChart(c => { c.beatOffset = latestSongTimeRef.current; return c; });
    }
  };
  const nudgeBeatOffset = (amount) => {
    updateChart(c => { c.beatOffset = Math.max(0, (c.beatOffset || 0) + amount); return c; });
  };

  // Share
  const shareChart = async () => {
    const compressed = compressToURL(chart);
    if (!compressed) return;
    const url = window.location.origin + window.location.pathname + "#chart=" + compressed;
    if (url.length > 2000) {
      try { await navigator.clipboard.writeText(JSON.stringify(chart)); } catch { }
      setSavedShow(true); // reuse saved indicator as feedback
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSavedShow(false), 1500);
      return;
    }
    if (navigator.share) {
      try { await navigator.share({ title: chart.title || "Strum Chart", url }); } catch { }
    } else {
      try { await navigator.clipboard.writeText(url); } catch { }
      setSavedShow(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSavedShow(false), 1500);
    }
  };

  // Get strum display — D=down, U=up, X=chuck/mute, null=rest (blank)
  const strumDisplay = (val) => {
    if (!val) return null;
    if (val === "D") return { glyph: "↓", color: T.textDark, weight: 700 };
    if (val === "U") return { glyph: "↑", color: T.textMed, weight: 400 };
    if (val === "X") return { glyph: "×", color: T.coral, weight: 700 };
    return null;
  };

  // Check if lyric overflows — measure how many empty cells to the right
  const getLyricOverflow = (cells, cIdx) => {
    const word = cells[cIdx].lyric;
    if (!word || word.length <= 5) return 1; // fits in one cell
    let span = 1;
    for (let j = cIdx + 1; j < cells.length; j++) {
      if (cells[j].lyric) break;
      span++;
      if (span * 5 >= word.length) break; // rough char-per-cell estimate
    }
    return span;
  };

  // Beat tracking — uses rAF-interpolated 8th-note position
  const activeMeasure = eighthMeasure;
  const activeCol = eighthCol;

  // Practice mode auto-scroll — scroll active measure into view
  const practiceMeasureRefs = useRef([]);
  useEffect(() => {
    if (!practiceMode || activeMeasure < 0) return;
    const el = practiceMeasureRefs.current[activeMeasure];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [practiceMode, activeMeasure]);

  // ─── Practice Mode View ──────────────────────────────────────────────────
  if (practiceMode) {
    const strumGlyph = (val) => {
      if (!val) return null;
      if (val === "D") return "↓";
      if (val === "U") return "↑";
      if (val === "X") return "×";
      return null;
    };

    const anyNotes = chart.measures.some(m => m.cells.some(c => c?.note));

    return (
      <div style={{ fontFamily: T.sans, minHeight: "100vh", background: T.bg, padding: isWide ? "20px 40px" : "12px 16px 100px 16px" }}>
        {/* Practice header — minimal */}
        <div style={{
          position: "sticky", top: 0, zIndex: 100, background: T.bg,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 0", borderBottom: `1px solid ${T.borderSoft}`,
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onBack} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
            }}>← Back</button>
            <span style={{ fontSize: isWide ? 22 : 18, fontFamily: T.serif, fontWeight: 600, color: T.textDark }}>
              {chart.title || "Untitled Chart"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Loop button */}
            {loopStart !== null && loopEnd !== null ? (
              <span
                onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); }}
                style={{
                  fontSize: 10, fontWeight: 700, fontFamily: T.sans,
                  color: T.gold, background: T.getTint(T.gold, 0.1),
                  padding: "3px 8px", borderRadius: 10, cursor: "pointer",
                  border: `1px solid ${T.gold}40`, userSelect: "none",
                }}
              >
                Loop {loopStart + 1}–{loopEnd + 1} ×
              </span>
            ) : (
              <button onClick={() => {
                if (loopSelecting) {
                  setLoopSelecting(false); setLoopStart(null);
                } else {
                  setLoopSelecting(true);
                }
              }} style={{
                fontSize: 10, padding: "3px 10px", borderRadius: 10, cursor: "pointer",
                fontWeight: 700, fontFamily: T.sans,
                background: loopSelecting ? T.getTint(T.gold, 0.15) : "transparent",
                color: loopSelecting ? T.gold : T.textMed,
                border: `1px solid ${loopSelecting ? T.gold : T.border}`,
              }}>{loopSelecting ? "Cancel" : "Loop"}</button>
            )}
            <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 700, fontFamily: T.sans }}>
              {chart.bpm || 80} BPM
            </span>
            {metro && (
              <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
                fontSize: 10, padding: "6px 14px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: metro.playing ? "transparent" : T.gold,
                color: metro.playing ? T.coral : "#fff",
                border: `1px solid ${metro.playing ? T.coral : T.gold}`,
              }}>{metro.playing ? "Stop" : "▶ Play"}</button>
            )}
            <button onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); setPracticeMode(false); }} style={{
              fontSize: 10, padding: "6px 14px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1,
              background: "transparent", color: T.textMed, border: `1px solid ${T.border}`,
            }}>Edit</button>
          </div>
        </div>

        {/* Loop selection instruction bar */}
        {loopSelecting && loopStart === null && (
          <div style={{
            textAlign: "center", padding: "8px 12px", marginBottom: 8,
            background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
            border: `1px solid ${T.gold}30`,
            fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
          }}>Tap the start measure</div>
        )}
        {loopSelecting && loopStart !== null && loopEnd === null && (
          <div style={{
            textAlign: "center", padding: "8px 12px", marginBottom: 8,
            background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
            border: `1px solid ${T.gold}30`,
            fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
          }}>Tap the end measure</div>
        )}

        {/* Countdown overlay */}
        {countdownBeat >= 0 && (
          <div key={countdownBeat} style={{
            textAlign: "center", padding: "24px 0 16px",
            fontSize: 48, fontWeight: 800, fontFamily: T.sans,
            color: T.gold, letterSpacing: 4,
            animation: "fadeIn 0.15s ease-out",
          }}>
            {countdownBeat + 1}
          </div>
        )}

        {/* Practice measures — large, clean, read-only */}
        <div style={isWide ? {
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          border: `1px solid ${T.border}`, borderRadius: T.radiusMd, overflow: "hidden", paddingBottom: 8,
        } : {}}>
          {chart.measures.map((measure, mIdx) => {
            const isActive = activeMeasure === mIdx;
            // Build column template for practice mode
            let colTemplate = "";
            for (let i = 0; i < 8; i++) {
              colTemplate += "1fr ";
              if (chart.activeSlots.includes(i) && i < 7) colTemplate += "24px ";
            }
            const hasLyrics = measure.cells.some(c => c.lyric);

            const isInLoop = loopStart !== null && loopEnd !== null && mIdx >= loopStart && mIdx <= loopEnd;
            const isLoopStartOnly = loopStart !== null && loopEnd === null && mIdx === loopStart;

            return (
              <div
                key={mIdx}
                ref={el => practiceMeasureRefs.current[mIdx] = el}
                onClick={() => {
                  if (!loopSelecting) return;
                  if (loopStart === null) {
                    setLoopStart(mIdx);
                  } else if (loopEnd === null) {
                    if (mIdx < loopStart) { setLoopEnd(loopStart); setLoopStart(mIdx); }
                    else if (mIdx === loopStart) { setLoopStart(null); }
                    else { setLoopEnd(mIdx); }
                    setLoopSelecting(false);
                  }
                }}
                style={{
                  padding: isWide ? "12px 16px" : "10px 12px",
                  cursor: loopSelecting ? "pointer" : "default",
                  background: isActive ? T.getTint(T.gold, 0.08) : (isInLoop || isLoopStartOnly) ? T.getTint(T.gold, 0.04) : "transparent",
                  transition: "background 0.3s",
                  ...(isWide ? {
                    borderRight: mIdx % 2 === 0 && mIdx + 1 < chart.measures.length ? `1px solid ${T.borderSoft}` : "none",
                    borderBottom: mIdx + 2 < chart.measures.length ? `1px solid ${T.borderSoft}` : "none",
                  } : {
                    borderBottom: mIdx < chart.measures.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                  }),
                }}
              >
                {/* Measure number + section label */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, fontFamily: T.sans,
                    color: (isInLoop || isLoopStartOnly) ? T.gold : T.textMuted,
                  }}>{mIdx + 1}</span>
                  {measure.sectionLabel && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>
                      {measure.sectionLabel}
                    </span>
                  )}
                </div>

                {/* Grid — enlarged for readability */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: colTemplate,
                }}>
                  {/* Beat labels */}
                  {measure.cells.map((_, cIdx) => {
                    const label = BEAT_LABELS_8[cIdx];
                    const isDownbeat = cIdx % 2 === 0;
                    const isBeatActive = isActive && activeCol === cIdx;
                    return (
                      <React.Fragment key={`pb-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: 10, fontFamily: T.sans,
                          color: isDownbeat ? T.textMed : T.textMuted,
                          fontWeight: isDownbeat ? 700 : 400,
                          background: isBeatActive ? T.getTint(T.gold, 0.25) : "transparent",
                          borderRadius: T.radius, padding: "2px 0",
                          transition: "background 0.1s",
                        }}>{label}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{ textAlign: "center", fontSize: 8, color: T.textMuted, padding: "2px 0" }}>
                            {cIdx % 2 === 0 ? "e" : "a"}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Chord row — large */}
                  {measure.cells.map((cell, cIdx) => {
                    let displayChord = cell.chord;
                    let isSpanContinuation = false;
                    if (!displayChord) {
                      for (let j = cIdx - 1; j >= 0; j--) {
                        if (measure.cells[j].chord) { displayChord = measure.cells[j].chord; isSpanContinuation = true; break; }
                      }
                    }
                    return (
                      <React.Fragment key={`pc-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontFamily: T.serif,
                          fontSize: isWide ? 20 : 17, fontWeight: 700,
                          color: cell.chord ? T.gold : (isSpanContinuation ? T.gold + "30" : "transparent"),
                          padding: "4px 2px", minHeight: isWide ? 34 : 30,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {cell.chord ? displayChord : (isSpanContinuation ? "·" : "")}
                        </div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 16 : 14, fontFamily: T.serif,
                            color: T.gold + "60", minHeight: isWide ? 34 : 30,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{measure.between[cIdx]?.chord || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Strum row — large arrows */}
                  {measure.cells.map((cell, cIdx) => {
                    const glyph = strumGlyph(cell.strum);
                    const isBeatActive = isActive && activeCol === cIdx;
                    return (
                      <React.Fragment key={`ps-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 22 : 18,
                          fontWeight: cell.strum === "D" || cell.strum === "X" ? 700 : 400,
                          color: cell.strum === "X" ? T.coral : (glyph ? T.textDark : "transparent"),
                          minHeight: isWide ? 36 : 32,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isBeatActive ? T.getTint(T.gold, 0.15) : "transparent",
                          borderRadius: T.radius, transition: "background 0.1s",
                        }}>{glyph || ""}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 17 : 14, opacity: 0.7,
                            color: strumGlyph(measure.between[cIdx]?.strum) ? T.textDark : "transparent",
                            minHeight: isWide ? 36 : 32,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{strumGlyph(measure.between[cIdx]?.strum) || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Note row — show for all measures when any measure has notes (consistent height) */}
                  {anyNotes && measure.cells.map((cell, cIdx) => {
                    const isBeatActive = isActive && activeCol === cIdx;
                    const noteOct = cell?.note ? parseInt(cell.note.slice(-1)) || 4 : 4;
                    const pitchOpacity = cell?.note ? 0.4 + (noteOct - 2) * 0.15 : 0; // 0.4 at oct 2, 1.0 at oct 6
                    return (
                      <React.Fragment key={`pn-${cIdx}`}>
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 13 : 11,
                          fontFamily: T.sans, fontWeight: 600,
                          color: cell?.note ? T.note : "transparent",
                          opacity: cell?.note ? pitchOpacity : 1,
                          minHeight: isWide ? 24 : 20,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isBeatActive && cell?.note ? T.getTint(T.note, 0.15) : "transparent",
                          borderRadius: T.radius, transition: "background 0.1s, opacity 0.15s",
                        }}>{cell?.note || ""}</div>
                        {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                          <div style={{
                            textAlign: "center", fontSize: isWide ? 10 : 9, fontFamily: T.sans,
                            color: T.note, opacity: 0.6,
                            minHeight: isWide ? 24 : 20,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>{measure.between[cIdx]?.note || ""}</div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Lyric row — if any lyrics exist in this measure */}
                  {hasLyrics && measure.cells.map((cell, cIdx) => (
                    <React.Fragment key={`pl-${cIdx}`}>
                      <div style={{
                        textAlign: "center", fontSize: isWide ? 15 : 13,
                        fontFamily: T.serif, fontStyle: "italic", color: T.textDark,
                        minHeight: isWide ? 28 : 24,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "visible", whiteSpace: "nowrap", position: "relative",
                      }}>{cell.lyric || ""}</div>
                      {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                        <div style={{
                          textAlign: "center", fontSize: isWide ? 12 : 10, fontFamily: T.serif,
                          fontStyle: "italic", color: T.textDark, opacity: 0.7,
                          minHeight: isWide ? 28 : 24,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>{measure.between[cIdx]?.lyric || ""}</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: floating Play/Stop at bottom */}
        {!isWide && metro && (
          <div style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 8, zIndex: 200,
          }}>
            <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
              fontSize: 12, padding: "12px 24px", borderRadius: 24, cursor: "pointer",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
              background: metro.playing ? T.textDark : T.gold,
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}>{metro.playing ? "■ Stop" : "▶ Play"}</button>
            <button onClick={() => { setLoopStart(null); setLoopEnd(null); setLoopSelecting(false); setPracticeMode(false); }} style={{
              fontSize: 11, padding: "12px 18px", borderRadius: 24, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans,
              background: T.bgCard, color: T.textMed, border: `1px solid ${T.border}`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}>Edit</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: T.sans }}>
      {/* Sticky controls zone — breaks out of maxWidth container on desktop */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: T.bg, paddingBottom: 4, marginBottom: 4,
        borderBottom: `1px solid ${T.borderSoft}`,
        boxShadow: "0 2px 8px rgba(44,40,37,0.04)",
        ...(isWide ? {
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          paddingLeft: "calc(50vw - 50%)",
          paddingRight: "calc(50vw - 50%)",
        } : {}),
      }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
          }}>← Back</button>
        )}
        <input
          type="text"
          value={chart.title}
          onChange={e => setChart(c => ({ ...c, title: e.target.value, updatedAt: Date.now() }))}
          placeholder="Untitled Chart"
          style={{
            flex: 1, fontSize: 20, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
            border: "none", borderBottom: `1px solid ${T.borderSoft}`, background: "transparent",
            padding: "4px 0", outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {savedShow && (
            <span style={{
              fontSize: 9, color: T.success, fontWeight: 700, letterSpacing: 1,
              textTransform: "uppercase", fontFamily: T.sans,
              animation: "fade-in-up 0.3s ease",
            }}>Saved</span>
          )}
          <button onClick={undo} disabled={undoStack.length === 0} style={{
            background: "none", border: "none", cursor: undoStack.length ? "pointer" : "default",
            color: undoStack.length ? T.textMed : T.borderSoft, padding: 4,
          }}><Undo2 size={16} /></button>
          <button onClick={shareChart} style={{
            background: "none", border: "none", cursor: "pointer", color: T.textMed, padding: 4,
          }}><Share2 size={16} /></button>
          <button onClick={() => setPracticeMode(true)} style={{
            fontSize: 9, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
            fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
            background: T.getTint(T.gold, 0.1), color: T.gold,
            border: `1px solid ${T.gold}40`,
          }}>Practice</button>
        </div>
      </div>

      {/* Song picker + BPM controls — side by side on desktop */}
      <div style={isWide ? { display: "flex", gap: 24, alignItems: "flex-start" } : {}}>
        <div style={isWide ? { flex: 1 } : {}}>
          <SongPicker
            theme={T}
            youtubeUrl={chart.youtubeUrl || ""}
            onYoutubeChange={(url) => updateChart(c => { c.youtubeUrl = url; return c; })}
            hidePlayer={isWide}
            onSongChange={setPickerSong}
          />
        </div>
        <div style={isWide ? { flex: "0 0 auto" } : {}}>
          {/* Row 1: Playback — BPM + Play/Stop + Tap */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>BPM</span>
              <input
                type="text" inputMode="numeric" pattern="[0-9]*"
                value={chart.bpm === undefined ? "" : chart.bpm}
                onChange={e => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  if (raw === "") {
                    setChart(c => ({ ...c, bpm: undefined, updatedAt: Date.now() }));
                  } else {
                    const v = Math.min(280, parseInt(raw));
                    setChart(c => ({ ...c, bpm: v, updatedAt: Date.now() }));
                  }
                }}
                onBlur={() => {
                  if (!chart.bpm || chart.bpm < 40) setChart(c => ({ ...c, bpm: 80, updatedAt: Date.now() }));
                  if (metro) metro.changeBpm(chart.bpm || 80);
                }}
                style={{
                  width: 48, fontSize: 14, fontWeight: 700, textAlign: "center", color: T.textDark,
                  border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgSoft,
                  padding: "4px 2px", fontFamily: T.sans,
                }}
              />
              {metro && (
                <button onClick={() => { metro.changeBpm(chart.bpm || 80); metro.playing ? metro.stop() : metro.start(); }} style={{
                  fontSize: 9, padding: "5px 12px", borderRadius: T.radius, cursor: "pointer",
                  fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                  background: metro.playing ? "transparent" : T.gold,
                  color: metro.playing ? T.coral : "#fff",
                  border: `1px solid ${metro.playing ? T.coral : T.gold}`,
                }}>{metro.playing ? "Stop" : "▶ Play"}</button>
              )}
            </div>
            <button onClick={handleTapTempo} style={{
              fontSize: 9, padding: "5px 10px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
              background: tapBpm ? T.getTint(T.gold, 0.15) : "transparent",
              color: tapBpm ? T.gold : T.textMed,
              border: `1px solid ${tapBpm ? T.gold : T.border}`,
              transition: "all 0.15s",
            }}>Tap{tapBpm ? ` ${tapBpm}` : ""}</button>
          </div>

          {/* Row 2: Chart settings — pill group */}
          {(() => {
            const pillStyle = (active) => ({
              fontSize: 9, padding: "4px 10px", cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5,
              background: active ? T.getTint(T.gold, 0.1) : "transparent",
              color: active ? T.gold : T.textMuted,
              border: "none", borderRight: `1px solid ${T.borderSoft}`,
              transition: "all 0.15s",
            });
            return (
            <div style={{
              display: "inline-flex", borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
              overflow: "hidden", marginBottom: 8,
            }}>
              {/* 16th */}
              <button onClick={() => {
                updateChart(c => {
                  const allOn = [0, 1, 2, 3, 4, 5, 6].every(s => c.activeSlots.includes(s));
                  if (allOn) {
                    c.activeSlots = c.activeSlots.filter(s => c.measures.some(m => {
                      const b = m.between[s];
                      return b && (b.chord || b.strum || b.lyric || b.note);
                    }));
                  } else {
                    c.activeSlots = [0, 1, 2, 3, 4, 5, 6];
                  }
                  return c;
                });
              }} style={pillStyle(chart.activeSlots.length > 0)}>16th</button>

              {/* Loop */}
              <button onClick={() => {
                if (loopStart !== null && loopEnd !== null) {
                  setLoopStart(null); setLoopEnd(null); setLoopSelecting(false);
                } else if (loopSelecting) {
                  setLoopSelecting(false); setLoopStart(null);
                } else {
                  setLoopSelecting(true);
                }
              }} style={{
                ...pillStyle(loopStart !== null || loopSelecting),
                color: (loopStart !== null && loopEnd !== null) ? T.gold : loopSelecting ? T.gold : T.textMuted,
              }}>
                {loopStart !== null && loopEnd !== null ? `Loop ${loopStart + 1}–${loopEnd + 1}` : loopSelecting ? "Cancel" : "Loop"}
              </button>

              {/* Notes mute */}
              <button onClick={() => setNotesMuted(!notesMuted)} style={{
                ...pillStyle(!notesMuted && chart.measures.some(m => m.cells.some(c => c?.note))),
                color: notesMuted ? T.coral : chart.measures.some(m => m.cells.some(c => c?.note)) ? T.note : T.textMuted,
              }}>{notesMuted ? "Notes ✕" : "Notes"}</button>

              {/* Group */}
              <button onClick={() => setShowGroupPanel(!showGroupPanel)} style={{
                ...pillStyle((chart.barsPerGroup || 0) > 0 || showGroupPanel),
                borderRight: "none",
              }}>Group{(chart.barsPerGroup || 0) > 0 ? ` ${chart.barsPerGroup}` : ""}</button>
            </div>
            );
          })()}

          {/* Group panel — expands below */}
          {showGroupPanel && (
            <div style={{ display: "flex", gap: 4, marginBottom: 8, alignItems: "center", animation: "fade-in-up 0.15s ease" }}>
              <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans }}>Bars per group:</span>
              {[0, 2, 4, 8].map(g => (
                <button key={g} onClick={() => { updateChart(c => { c.barsPerGroup = g; return c; }); setShowGroupPanel(false); }} style={{
                  fontSize: 10, padding: "4px 10px", borderRadius: T.radius, cursor: "pointer",
                  fontWeight: 700, fontFamily: T.sans,
                  background: (chart.barsPerGroup || 0) === g ? T.gold : T.bgSoft,
                  color: (chart.barsPerGroup || 0) === g ? "#fff" : T.textMed,
                  border: `1px solid ${(chart.barsPerGroup || 0) === g ? T.gold : T.border}`,
                  transition: "all 0.15s",
                }}>{g === 0 ? "Off" : g}</button>
              ))}
            </div>
          )}

          {/* Loop selection instruction bar */}
          {loopSelecting && loopStart === null && (
            <div style={{
              textAlign: "center", padding: "8px 12px", marginBottom: 8,
              background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
              border: `1px solid ${T.gold}30`,
              fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
            }}>Tap the start measure</div>
          )}
          {loopSelecting && loopStart !== null && loopEnd === null && (
            <div style={{
              textAlign: "center", padding: "8px 12px", marginBottom: 8,
              background: T.getTint(T.gold, 0.08), borderRadius: T.radiusMd,
              border: `1px solid ${T.gold}30`,
              fontSize: 12, fontWeight: 600, fontFamily: T.sans, color: T.gold,
            }}>Tap the end measure</div>
          )}

          {/* Audio sync — Mark Beat 1 + nudge (only shows when song playing) */}
          {songPlaying && (
            <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
              <button onClick={markBeatOne} style={{
                fontSize: 9, padding: "5px 10px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: chart.beatOffset > 0 ? T.getTint(T.gold, 0.12) : "transparent",
                color: chart.beatOffset > 0 ? T.gold : T.textMed,
                border: `1px solid ${chart.beatOffset > 0 ? T.gold : T.border}`,
                transition: "all 0.15s",
              }}>Mark Beat 1</button>
              {chart.beatOffset > 0 && (
                <>
                  <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontVariantNumeric: "tabular-nums" }}>
                    {chart.beatOffset.toFixed(2)}s
                  </span>
                  <button onClick={() => nudgeBeatOffset(-0.01)} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: T.radius, cursor: "pointer",
                    background: T.bgSoft, border: `1px solid ${T.border}`, color: T.textMed,
                    fontWeight: 700, fontFamily: T.sans,
                  }}>-10ms</button>
                  <button onClick={() => nudgeBeatOffset(0.01)} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: T.radius, cursor: "pointer",
                    background: T.bgSoft, border: `1px solid ${T.border}`, color: T.textMed,
                    fontWeight: 700, fontFamily: T.sans,
                  }}>+10ms</button>
                  {songLoopState.isLooping && chart.beatOffset < songLoopState.loopStart && (
                    <span style={{ fontSize: 9, color: T.coral, fontFamily: T.sans, fontWeight: 600 }}>
                      Re-mark within loop
                    </span>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      </div>{/* end sticky controls zone */}

      {/* Desktop: full-width audio player below controls */}
      {isWide && (() => {
        const ytVideoId = extractYouTubeId(chart.youtubeUrl || "");
        if (ytVideoId) return <YouTubeAudioPlayer videoId={ytVideoId} theme={T} title="YouTube" />;
        if (pickerSong) return <MiniAudioPlayer src={pickerSong.src} theme={T} title={`${pickerSong.name} — ${pickerSong.artist}`} />;
        return null;
      })()}

      {/* Lyrics input */}
      <div style={{
        marginBottom: 16, padding: "12px 16px", background: T.bgSoft,
        border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Lyrics</span>
          {!lyricsEditing && chart.lyricsInput && (
            <button onClick={() => setLyricsEditing(true)} style={{
              fontSize: 9, background: "none", border: "none", color: T.gold, cursor: "pointer",
              fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
            }}><Edit3 size={10} style={{ marginRight: 3 }} />Edit</button>
          )}
        </div>
        {lyricsEditing ? (
          <div>
            <textarea
              value={chart.lyricsInput}
              onChange={e => setChart(c => ({ ...c, lyricsInput: e.target.value }))}
              placeholder="Paste your lyrics here — words become placeable chips"
              rows={2}
              style={{
                width: "100%", fontSize: 13, fontFamily: T.serif, color: T.textDark,
                border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgCard,
                padding: 8, resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => handleLyricsPaste(chart.lyricsInput)}
              disabled={!chart.lyricsInput?.trim()}
              style={{
                marginTop: 6, fontSize: 9, padding: "5px 14px", borderRadius: T.radius, cursor: "pointer",
                fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, fontFamily: T.sans,
                background: chart.lyricsInput?.trim() ? T.gold : T.borderSoft,
                color: chart.lyricsInput?.trim() ? "#fff" : T.textMuted,
                border: "none",
              }}
            >Set Lyrics</button>
          </div>
        ) : chart.lyricsInput ? (
          <div style={{ fontSize: 12, fontFamily: T.serif, color: T.textLight, fontStyle: "italic" }}>
            {chart.lyricsInput}
          </div>
        ) : (
          <button onClick={() => setLyricsEditing(true)} style={{
            fontSize: 11, color: T.textMuted, background: "none", border: `1px dashed ${T.border}`,
            borderRadius: T.radius, padding: "8px 12px", cursor: "pointer", width: "100%",
            fontFamily: T.sans,
          }}>+ Add Lyrics</button>
        )}

      </div>

      {/* Playback indicator */}
      {(isPlaying || songPlaying) && (
        <div style={{
          textAlign: "center", fontSize: 9, color: T.gold, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontFamily: T.sans,
        }}>♪ Playing — tap grid to pause</div>
      )}

      {/* Measures — grouped by barsPerGroup, 2-col on desktop when not playing */}
      {(() => {
        const bpg = chart.barsPerGroup || 0;
        const twoCol = isWide && !isPlaying && !songPlaying;
        const items = chart.measures.map((m, i) => ({ measure: m, globalIdx: i }));
        const groups = bpg > 0
          ? Array.from({ length: Math.ceil(items.length / bpg) }, (_, gi) => items.slice(gi * bpg, (gi + 1) * bpg))
          : [items];

        return (<div>
        {groups.map((group, gIdx) => (
          <div key={gIdx} style={{
            ...(bpg > 0 ? {
              borderLeft: `3px solid ${T.gold}`,
              paddingLeft: 10,
              paddingBottom: 4,
              marginBottom: gIdx < groups.length - 1 ? 28 : 8,
              position: "relative",
            } : {}),
            // Unified container on desktop: single outer border wrapping the grid
            ...(twoCol ? {
              borderTop: `1px solid ${T.border}`,
              borderRight: `1px solid ${T.border}`,
              borderBottom: `1px solid ${T.border}`,
              ...(bpg === 0 ? { borderLeft: `1px solid ${T.border}` } : {}),
              borderRadius: T.radiusMd,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              overflow: "hidden",
              marginBottom: bpg > 0 ? (gIdx < groups.length - 1 ? 28 : 8) : 12,
            } : {}),
          }}>
            {bpg > 0 && (
              <span style={{
                position: "absolute", top: -8, left: -1, fontSize: 8, color: T.gold,
                fontWeight: 700, fontFamily: T.sans, background: T.bg, padding: "0 4px",
              }}>{gIdx + 1}</span>
            )}
            {/* Dashed divider between groups */}
            {bpg > 0 && gIdx < groups.length - 1 && (
              <div style={{
                position: "absolute", bottom: -16, left: 0, right: 0,
                borderBottom: `1px dashed ${T.border}`,
              }} />
            )}
            {group.map(({ measure, globalIdx: mIdx }, itemIdx) => {
        const isActiveMeasure = activeMeasure === mIdx;

        // Build column template: for each main cell, add 1fr, then if slot is active add 24px
        let colTemplate = "";
        for (let i = 0; i < 8; i++) {
          colTemplate += "1fr ";
          if (chart.activeSlots.includes(i) && i < 7) {
            colTemplate += "24px ";
          }
        }

        // Desktop unified: use inner borders instead of per-card borders
        const isLeftCol = itemIdx % 2 === 0;
        const isLastRow = itemIdx >= group.length - 1 || (twoCol && itemIdx >= group.length - 2 && !isLeftCol);
        const isInEditLoop = loopStart !== null && loopEnd !== null && mIdx >= loopStart && mIdx <= loopEnd;
        const isEditLoopStart = loopStart !== null && loopEnd === null && mIdx === loopStart;
        const desktopStyle = twoCol ? {
          borderRight: isLeftCol && itemIdx + 1 < group.length ? `1px solid ${T.borderSoft}` : "none",
          borderBottom: (twoCol && itemIdx + 2 < group.length) ? `1px solid ${T.borderSoft}` : "none",
          background: isActiveMeasure ? T.getTint(T.gold, 0.04) : (isInEditLoop || isEditLoopStart) ? T.getTint(T.gold, 0.03) : "transparent",
          transition: "background 0.2s",
        } : {
          border: `1px solid ${isActiveMeasure ? T.gold : T.border}`,
          borderRadius: T.radiusMd,
          background: (isInEditLoop || isEditLoopStart) ? T.getTint(T.gold, 0.03) : undefined,
          boxShadow: isActiveMeasure ? `0 0 8px ${T.gold}40` : "none",
          transition: "box-shadow 0.2s, border-color 0.2s",
        };

        return (
          <div key={mIdx} onClick={() => {
            if (!loopSelecting) return;
            if (loopStart === null) {
              setLoopStart(mIdx);
            } else if (loopEnd === null) {
              if (mIdx < loopStart) { setLoopEnd(loopStart); setLoopStart(mIdx); }
              else if (mIdx === loopStart) { setLoopStart(null); }
              else { setLoopEnd(mIdx); }
              setLoopSelecting(false);
            }
          }} style={{
            marginBottom: twoCol ? 0 : 12, position: "relative",
            cursor: loopSelecting ? "pointer" : "default",
            ...desktopStyle,
          }}
          >
            {/* Measure number + section label + delete button */}
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: twoCol ? "6px 8px 0" : "0 4px",
              ...(twoCol ? {} : { position: "absolute", top: -8, left: 8, background: T.bg }),
            }}>
              <span style={{
                fontSize: 9, fontWeight: 700, fontFamily: T.sans,
                color: (isInEditLoop || isEditLoopStart) ? T.gold : T.textMuted,
              }}>{mIdx + 1}</span>
              <input
                type="text"
                value={measure.sectionLabel || ""}
                onChange={e => updateChart(c => { c.measures[mIdx].sectionLabel = e.target.value; return c; })}
                placeholder="section"
                style={{
                  fontSize: 9, fontWeight: 600, color: T.gold, fontFamily: T.sans,
                  textTransform: "uppercase", letterSpacing: 1,
                  border: "none", background: "transparent", padding: 0, outline: "none",
                  width: measure.sectionLabel ? Math.max(40, measure.sectionLabel.length * 7) : 40,
                  flex: 1,
                }}
              />
              {chart.measures.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); removeMeasure(mIdx); }} style={{
                  background: "none", border: "none",
                  cursor: "pointer", color: T.textMuted, padding: "0 4px", fontSize: 9,
                  fontFamily: T.sans, display: "flex", alignItems: "center", gap: 2,
                  ...(twoCol ? {} : { position: "absolute", top: 0, right: -4, background: T.bg }),
                }}><X size={10} /></button>
              )}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: `${twoCol && !isLeftCol ? "" : "40px "}${colTemplate}`,
              padding: "8px 4px 4px",
            }}>
              {/* Beat labels row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{ fontSize: 8, color: T.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }} />
              )}
              {measure.cells.map((_, cIdx) => {
                const label = BEAT_LABELS_8[cIdx];
                const isDownbeat = cIdx % 2 === 0;
                const isActive = isActiveMeasure && activeCol === cIdx;
                return (
                  <React.Fragment key={`beat-${cIdx}`}>
                    <div style={{
                      textAlign: "center", fontSize: 9, fontFamily: T.sans,
                      color: isDownbeat ? T.textMed : T.textMuted,
                      fontWeight: isDownbeat ? 700 : 400,
                      background: isActive ? T.getTint(T.gold, 0.2) : (isDownbeat ? T.getTint(T.gold, 0.03) : "transparent"),
                      borderRadius: T.radius, padding: "2px 0",
                      transition: "background 0.15s",
                    }}>{label}</div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 7, fontFamily: T.sans, color: T.textMuted,
                        padding: "2px 0",
                      }}>{cIdx % 2 === 0 ? "e" : "a"}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Chord row — each cell individually clickable */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Chord</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                // Find which chord is active at this position (could be from a previous cell spanning here)
                let displayChord = cell.chord;
                let isSpanContinuation = false;
                if (!displayChord) {
                  // Walk backwards to find spanning chord
                  for (let j = cIdx - 1; j >= 0; j--) {
                    if (measure.cells[j].chord) { displayChord = measure.cells[j].chord; isSpanContinuation = true; break; }
                  }
                }
                const hasChord = !!cell.chord;
                const inSpan = hasChord || isSpanContinuation;
                const isActiveChordTarget = activeChordCell && activeChordCell.m === mIdx && activeChordCell.c === cIdx;
                return (
                  <React.Fragment key={`c-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontFamily: T.serif, fontSize: 14, fontWeight: 700,
                        color: hasChord ? T.gold : (isSpanContinuation ? T.gold + "40" : "transparent"),
                        background: isActiveChordTarget ? T.getTint(T.gold, 0.2) : (inSpan ? T.getTint(T.gold, 0.05) : "transparent"),
                        borderRadius: T.radius, padding: "4px 2px", minHeight: 28,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        border: isActiveChordTarget ? `2px solid ${T.gold}` : (inSpan ? "none" : `1px dashed ${T.borderSoft}`),
                        transition: "background 0.15s, border-color 0.15s",
                        boxShadow: isActiveChordTarget ? `0 0 6px ${T.gold}40` : "none",
                      }}
                      onClick={() => handleChordCellTap(mIdx, cIdx)}
                      onTouchStart={() => startLongPress(mIdx, cIdx, "chord")}
                      onTouchEnd={endLongPress}
                      onMouseDown={() => startLongPress(mIdx, cIdx, "chord")}
                      onMouseUp={endLongPress}
                    >
                      {hasChord ? displayChord : (isSpanContinuation ? "·" : "·")}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 11, fontFamily: T.serif, color: T.gold,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0.7, cursor: "pointer",
                      }}
                        onClick={() => { setActiveChordCell({ m: mIdx, c: cIdx, between: true }); }}
                      >{measure.between[cIdx]?.chord || "·"}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Strum row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Strum</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const sd = strumDisplay(cell.strum);
                const isActive = isActiveMeasure && activeCol === cIdx;
                return (
                  <React.Fragment key={`s-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontSize: 16, minHeight: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius,
                        color: sd ? sd.color : "transparent",
                        fontWeight: sd ? sd.weight : 400,
                        border: cell.strum ? "none" : `1px dashed ${T.borderSoft}`,
                        background: isActive ? T.getTint(T.gold, 0.15) : "transparent",
                        transition: "background 0.15s",
                        userSelect: "none",
                      }}
                      onClick={() => cycleStrum(mIdx, cIdx)}
                      onTouchStart={() => startLongPress(mIdx, cIdx, "strum")}
                      onTouchEnd={endLongPress}
                      onMouseDown={() => startLongPress(mIdx, cIdx, "strum")}
                      onMouseUp={endLongPress}
                    >
                      {sd ? sd.glyph : "·"}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 13, minHeight: 32,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius, opacity: 0.7,
                        color: strumDisplay(measure.between[cIdx]?.strum)?.color || "transparent",
                      }}
                        onClick={() => {
                          // Cycle between strum for interstitial
                          updateChart(c => {
                            if (!c.measures[mIdx].between[cIdx]) c.measures[mIdx].between[cIdx] = makeEmptyCell();
                            const cur = c.measures[mIdx].between[cIdx].strum;
                            c.measures[mIdx].between[cIdx].strum = !cur ? "D" : cur === "D" ? "U" : cur === "U" ? "X" : null;
                            return c;
                          });
                        }}
                      >
                        {strumDisplay(measure.between[cIdx]?.strum)?.glyph || "·"}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Note row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.note, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Note</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const hasNote = !!cell?.note;
                const pickerOpen = notePicker && notePicker.m === mIdx && notePicker.c === cIdx && !notePicker.between;
                return (
                  <React.Fragment key={`n-${cIdx}`}>
                    <div ref={pickerOpen ? notePickerRef : null} style={{ position: "relative" }}>
                      <div
                        onClick={() => {
                          if (isPlaying) return;
                          if (pickerOpen) { setNotePicker(null); return; }
                          // Initialize octave from cell's current note
                          if (hasNote) {
                            const oct = parseInt(cell.note.slice(-1));
                            if (oct >= 2 && oct <= 6) setNoteOctave(oct);
                          }
                          setNotePicker({ m: mIdx, c: cIdx, between: false });
                        }}
                        style={{
                          textAlign: "center", fontSize: 11, fontFamily: T.sans, fontWeight: 600,
                          color: hasNote ? T.note : T.textMuted + "60",
                          minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer", borderRadius: T.radius,
                          background: pickerOpen ? T.getTint(T.note, 0.08) : hasNote ? T.getTint(T.note, 0.03 + (parseInt(cell.note?.slice(-1) || "4") - 2) * 0.02) : "transparent",
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        {hasNote ? cell.note : "·"}
                      </div>
                      {/* Note picker popover */}
                      {pickerOpen && (() => {
                        const xShift = cIdx >= 6 ? "translateX(-80%)" : cIdx <= 1 ? "translateX(-20%)" : "translateX(-50%)";
                        return (
                        <div style={{
                          position: "absolute", top: "100%", left: "50%", transform: xShift,
                          zIndex: 200, background: T.bgCard || T.bg, border: `1px solid ${T.border}`,
                          borderRadius: T.radiusMd, padding: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                          minWidth: 180,
                        }}>
                          {/* Octave selector */}
                          <div style={{ display: "flex", gap: 4, marginBottom: 6, justifyContent: "center" }}>
                            {[2, 3, 4, 5, 6].map(oct => (
                              <button key={oct} onClick={(e) => { e.stopPropagation(); setNoteOctave(oct); }} style={{
                                fontSize: 10, fontWeight: noteOctave === oct ? 800 : 400, fontFamily: T.sans,
                                padding: "2px 6px", borderRadius: 6, cursor: "pointer",
                                border: noteOctave === oct ? `1px solid ${T.note}` : `1px solid ${T.borderSoft}`,
                                background: noteOctave === oct ? T.getTint(T.note, 0.12) : "transparent",
                                color: noteOctave === oct ? T.note : T.textMuted,
                              }}>Oct {oct}</button>
                            ))}
                          </div>
                          {/* Note buttons */}
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
                            {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(n => {
                              const noteStr = n + noteOctave;
                              const isSelected = cell?.note === noteStr;
                              return (
                                <button key={n} onClick={async (e) => {
                                  e.stopPropagation();
                                  updateChart(c => {
                                    c.measures[mIdx].cells[cIdx].note = noteStr;
                                    return c;
                                  });
                                  try {
                                    await Tone.start();
                                    if (Tone.context.state !== "running") await Tone.context.resume();
                                    noteSynthRef.current?.triggerAttackRelease(noteStr, "8n");
                                  } catch (_) {}
                                  setNotePicker(null);
                                }} style={{
                                  fontSize: 10, fontWeight: 600, fontFamily: T.sans,
                                  padding: "4px 2px", borderRadius: 4, cursor: "pointer",
                                  border: isSelected ? `1px solid ${T.note}` : `1px solid ${T.borderSoft}`,
                                  background: isSelected ? T.note : "transparent",
                                  color: isSelected ? "#fff" : T.textDark,
                                }}>
                                  {n}
                                </button>
                              );
                            })}
                          </div>
                          {/* Clear button */}
                          {hasNote && (
                            <button onClick={(e) => {
                              e.stopPropagation();
                              updateChart(c => { delete c.measures[mIdx].cells[cIdx].note; return c; });
                              setNotePicker(null);
                            }} style={{
                              width: "100%", marginTop: 6, fontSize: 10, fontWeight: 600, fontFamily: T.sans,
                              padding: "4px 0", borderRadius: 4, cursor: "pointer",
                              border: `1px solid ${T.coral}`, background: "transparent", color: T.coral,
                            }}>× Clear</button>
                          )}
                        </div>
                        );
                      })()}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 9, fontFamily: T.sans,
                        color: T.note, opacity: 0.6,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>{measure.between[cIdx]?.note || ""}</div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Lyric row */}
              {(twoCol && !isLeftCol) ? null : (
                <div style={{
                  fontSize: 9, color: T.textMuted, fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center",
                }}>Lyric</div>
              )}
              {measure.cells.map((cell, cIdx) => {
                const hasLyric = cell.lyric && cell.lyric.length > 0;
                const isActive = isActiveMeasure && activeCol === cIdx;
                const isTarget = selectedChip !== null && !hasLyric;
                return (
                  <React.Fragment key={`l-${cIdx}`}>
                    <div
                      style={{
                        textAlign: "center", fontSize: hasLyric && cell.lyric.length > 5 ? 11 : 13,
                        fontFamily: T.serif, fontStyle: "italic", color: T.textDark,
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", borderRadius: T.radius,
                        border: isTarget ? `1px dashed ${T.gold}` : (hasLyric ? "none" : `1px dashed ${T.borderSoft}`),
                        background: isActive ? T.getTint(T.gold, 0.1) : (isTarget ? T.getTint(T.gold, 0.05) : "transparent"),
                        overflow: "visible", whiteSpace: "nowrap", position: "relative", zIndex: hasLyric ? 1 : 0,
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onClick={() => {
                        if (isPlaying) return;
                        if (hasLyric) { removePlacedLyric(mIdx, cIdx); }
                        else if (selectedChip !== null) { placeLyric(mIdx, cIdx); }
                      }}
                    >
                      {hasLyric ? cell.lyric : (isTarget ? "·" : "")}
                    </div>
                    {chart.activeSlots.includes(cIdx) && cIdx < 7 && (
                      <div style={{
                        textAlign: "center", fontSize: 10, fontFamily: T.serif, fontStyle: "italic",
                        minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0.7, color: T.textDark,
                      }}>{measure.between[cIdx]?.lyric || ""}</div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>
        );
            })}
          </div>
        ))}
        </div>);
      })()}

      {/* Add measure button */}
      <button onClick={addMeasure} style={{
        width: "100%", padding: "12px", background: T.bgSoft, border: `1px dashed ${T.border}`,
        borderRadius: T.radiusMd, cursor: "pointer", color: T.textMuted,
        fontSize: 12, fontFamily: T.sans, fontWeight: 600, marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}><Plus size={14} /> Add Measure</button>

      {/* Delete toast */}
      {deleteToast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: T.textDark, color: "#fff", padding: "10px 20px", borderRadius: T.radiusMd,
          fontSize: 12, fontFamily: T.sans, display: "flex", gap: 12, alignItems: "center",
          zIndex: 999, boxShadow: T.md,
        }}>
          <span>Measure deleted</span>
          <button onClick={undoDeleteMeasure} style={{
            background: T.gold, color: "#fff", border: "none", padding: "4px 12px",
            borderRadius: T.radius, cursor: "pointer", fontSize: 11, fontWeight: 700,
          }}>Undo</button>
        </div>
      )}

      {/* Chord voicing popup */}
      {chordVoicing && (() => {
        const chord = chart.measures[chordVoicing.m]?.cells[chordVoicing.c]?.chord;
        const voicing = chord ? CHORD_VOICINGS[chord] : null;
        if (!voicing) return null;
        return (
          <div style={{
            position: "fixed", inset: 0, zIndex: 1001, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
          }} onClick={() => setChordVoicing(null)}>
            <ChordDiagram theme={T} frets={voicing.frets} name={voicing.name} onClose={() => setChordVoicing(null)} />
          </div>
        );
      })()}

      {/* Sticky lyrics chips tray — pinned above BottomNav, full-width on desktop */}
      {chart.lyricsPool.length > 0 && !lyricsEditing && (
        <div style={{
          position: "sticky", bottom: isWide ? 0 : 60, zIndex: 99,
          background: T.bg, padding: "8px 12px",
          borderTop: `1px solid ${T.borderSoft}`,
          boxShadow: "0 -2px 8px rgba(44,40,37,0.04)",
          ...(isWide ? {
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            paddingLeft: "calc(50vw - 50%)",
            paddingRight: "calc(50vw - 50%)",
          } : {}),
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {chart.lyricsPool.map((item, i) => {
              const text = chipText(item);
              const group = chipGroup(item);
              const canSplit = !group && splitSyllables(item) !== null;
              return (
                <button key={i} onClick={() => setSelectedChip(selectedChip === i ? null : i)} style={{
                  fontSize: 12, fontFamily: T.serif, padding: "4px 10px",
                  borderRadius: 12, cursor: "pointer",
                  background: selectedChip === i ? T.getTint(T.gold, 0.15) : T.getTint(T.coral, 0.08),
                  border: selectedChip === i ? `2px solid ${T.gold}` : `1px solid ${T.coral}30`,
                  color: T.textDark, fontWeight: selectedChip === i ? 600 : 400,
                  transform: selectedChip === i ? "scale(1.05)" : "none",
                  transition: "all 0.15s",
                }}>
                  {text}
                  {canSplit && (
                    <span onClick={(e) => splitChip(i, e)} style={{
                      marginLeft: 4, opacity: 0.45, fontSize: 10, cursor: "pointer",
                    }} title="Split into syllables">✂</span>
                  )}
                  {group && (
                    <span onClick={(e) => joinChip(i, e)} style={{
                      marginLeft: 4, opacity: 0.45, fontSize: 10, cursor: "pointer",
                    }} title="Rejoin syllables">↩</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chord bottom sheet — root notes + quality toggles */}
      <BottomSheet theme={T} open={!!activeChordCell} onClose={() => setActiveChordCell(null)}>
        {/* Recently used */}
        {recentChords.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Recent</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {recentChords.map(ch => (
                <button key={ch} onClick={() => selectChord(ch)} style={{
                  minWidth: 44, minHeight: 40, fontSize: 13, fontFamily: T.serif, fontWeight: 700,
                  color: T.gold, background: T.getTint(T.gold, 0.08), border: `1px solid ${T.gold}30`,
                  borderRadius: T.radius, cursor: "pointer", padding: "0 10px",
                }}>{ch}</button>
              ))}
            </div>
          </div>
        )}

        {/* Root notes */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Root Note</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5, marginBottom: 6 }}>
            {["C", "D", "E", "F", "G", "A", "B"].map(note => (
              <button key={note} onClick={() => selectChord(note + chordQuality)} style={{
                minHeight: 44, fontSize: chordQuality ? 13 : 15, fontFamily: T.serif, fontWeight: 700,
                color: T.textDark, background: T.bgSoft, border: `1px solid ${T.border}`,
                borderRadius: T.radius, cursor: "pointer",
              }}>{note}{chordQuality && <span style={{ fontSize: 10, fontWeight: 500, color: T.textMed }}>{chordQuality}</span>}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
            {["C#", "Eb", "F#", "Ab", "Bb"].map(note => (
              <button key={note} onClick={() => selectChord(note + chordQuality)} style={{
                minHeight: 38, fontSize: chordQuality ? 11 : 13, fontFamily: T.serif, fontWeight: 600,
                color: T.textMed, background: T.bgSoft, border: `1px solid ${T.borderSoft}`,
                borderRadius: T.radius, cursor: "pointer",
              }}>{note}{chordQuality && <span style={{ fontSize: 9, fontWeight: 500 }}>{chordQuality}</span>}</button>
            ))}
          </div>
        </div>

        {/* Quality / Type toggles */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 8, color: T.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Type</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {[
              { label: "Major", val: "" },
              { label: "Minor", val: "m" },
              { label: "7", val: "7" },
              { label: "m7", val: "m7" },
              { label: "Maj7", val: "maj7" },
              { label: "Sus2", val: "sus2" },
              { label: "Sus4", val: "sus4" },
              { label: "Dim", val: "dim" },
              { label: "Aug", val: "aug" },
            ].map(q => (
              <button key={q.val} onClick={() => setChordQuality(q.val)} style={{
                padding: "6px 12px", borderRadius: T.radius, cursor: "pointer",
                fontSize: 11, fontWeight: 700, fontFamily: T.sans,
                background: chordQuality === q.val ? T.textDark : T.bgSoft,
                color: chordQuality === q.val ? "#fff" : T.textDark,
                border: `1px solid ${chordQuality === q.val ? T.textDark : T.border}`,
                transition: "all 0.15s",
              }}>{q.label}</button>
            ))}
          </div>
        </div>

        {/* Custom + Clear */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text" value={customChord} onChange={e => setCustomChord(e.target.value)}
            placeholder="Custom (e.g. Cadd9)"
            onKeyDown={e => { if (e.key === "Enter" && customChord.trim()) { selectChord(customChord.trim()); setCustomChord(""); } }}
            style={{
              flex: 1, fontSize: 13, fontFamily: T.serif, color: T.textDark,
              border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.bgCard,
              padding: "8px 12px", outline: "none",
            }}
          />
          <button onClick={() => { if (customChord.trim()) { selectChord(customChord.trim()); setCustomChord(""); } }} style={{
            minHeight: 36, padding: "0 12px", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
            background: T.gold, color: "#fff", border: "none", borderRadius: T.radius, cursor: "pointer",
            textTransform: "uppercase", letterSpacing: 1,
          }}>Add</button>
          <button onClick={clearChord} style={{
            minHeight: 36, padding: "0 12px", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
            background: "transparent", color: T.coral, border: `1px solid ${T.coral}40`,
            borderRadius: T.radius, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
          }}>Clear</button>
        </div>
      </BottomSheet>
    </div>
  );
}

// ─── Chart List View ────────────────────────────────────────────────────────
export function ChartListView({ theme: T, onSelect, onNew }) {
  const [charts, setCharts] = useState([]);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [deleteToast, setDeleteToast] = useState(null); // { id, chart, timer }
  const deleteToastRef = useRef(null);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      const list = Object.values(all).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      setCharts(list);
    } catch { setCharts([]); }
  }, []);

  // Commit a pending delete (actually remove from localStorage)
  const commitDelete = useCallback((id) => {
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      delete all[id];
      localStorage.setItem("strumCharts", JSON.stringify(all));
    } catch { }
  }, []);

  const deleteChart = (id) => {
    // If there's already a pending delete, commit it first
    if (deleteToastRef.current) {
      commitDelete(deleteToastRef.current.id);
      clearTimeout(deleteToastRef.current.timer);
    }

    const deletedChart = charts.find(c => c.id === id);
    // Remove from visible list immediately
    setCharts(prev => prev.filter(c => c.id !== id));

    // Set up undo toast with 5s timer
    const timer = setTimeout(() => {
      commitDelete(id);
      setDeleteToast(null);
      deleteToastRef.current = null;
    }, 5000);

    const toast = { id, chart: deletedChart, timer };
    setDeleteToast(toast);
    deleteToastRef.current = toast;
  };

  const undoDelete = () => {
    if (!deleteToastRef.current) return;
    clearTimeout(deleteToastRef.current.timer);
    const restored = deleteToastRef.current.chart;
    if (restored) {
      setCharts(prev => [restored, ...prev].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)));
    }
    setDeleteToast(null);
    deleteToastRef.current = null;
  };

  const handleImport = () => {
    setImportError("");
    if (importText.length > 500000) { setImportError("JSON too large — max 500KB"); return; }
    let obj;
    try { obj = JSON.parse(importText); } catch { setImportError("Invalid JSON — could not parse"); return; }
    const result = validateAndSanitizeChart(obj);
    if (result.error) { setImportError(result.error); return; }
    try {
      const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
      all[result.chart.id] = result.chart;
      localStorage.setItem("strumCharts", JSON.stringify(all));
      setShowImport(false);
      setImportText("");
      onSelect(result.chart);
    } catch { setImportError("Failed to save — localStorage may be full"); }
  };

  const getPreview = (chart) => {
    const n = chart.measures?.length || 0;
    const bpm = chart.bpm || 80;
    const sections = [...new Set((chart.measures || []).map(m => m.sectionLabel).filter(Boolean))];
    const sectionStr = sections.length ? sections.join(", ") : "";
    return `${bpm} BPM · ${n} measure${n !== 1 ? "s" : ""}${sectionStr ? " · " + sectionStr : ""}`;
  };

  return (
    <div>
      <button onClick={onNew} style={{
        width: "100%", padding: "16px", background: T.getTint(T.gold, 0.05),
        border: `1px dashed ${T.gold}60`, borderRadius: T.radiusMd, cursor: "pointer",
        color: T.gold, fontSize: 13, fontFamily: T.sans, fontWeight: 700, marginBottom: 8,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}><Plus size={16} /> New Chart</button>

      <button onClick={() => { setShowImport(!showImport); setImportError(""); }} style={{
        width: "100%", padding: "12px", background: showImport ? T.getTint(T.gold, 0.08) : "transparent",
        border: `1px dashed ${T.border}`, borderRadius: T.radiusMd, cursor: "pointer",
        color: T.textMed, fontSize: 12, fontFamily: T.sans, fontWeight: 600, marginBottom: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "all 0.15s",
      }}><Upload size={14} /> Import Chart</button>

      {showImport && (
        <div style={{
          marginBottom: 16, padding: "16px", background: T.bgCard,
          border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
          boxShadow: "0 2px 8px rgba(44,40,37,0.03)",
        }}>
          <div style={{ fontSize: 11, color: T.textMed, fontFamily: T.sans, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Paste chart JSON
          </div>
          <textarea
            value={importText}
            onChange={e => { setImportText(e.target.value); setImportError(""); }}
            placeholder='{"title":"My Chart","bpm":100,"measures":[...]}'
            style={{
              width: "100%", minHeight: 100, padding: "10px 12px", fontSize: 12, fontFamily: "'Courier New', monospace",
              background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
              color: T.textDark, resize: "vertical", outline: "none", boxSizing: "border-box",
            }}
          />
          {importError && (
            <div style={{ fontSize: 11, color: T.coral, fontFamily: T.sans, fontWeight: 600, marginTop: 6 }}>
              {importError}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={handleImport} style={{
              flex: 1, padding: "10px", fontSize: 11, fontWeight: 700, fontFamily: T.sans,
              background: T.gold, color: "#fff", border: "none", borderRadius: T.radius,
              cursor: "pointer", textTransform: "uppercase", letterSpacing: 1,
            }}>Load Chart</button>
            <button onClick={() => { setShowImport(false); setImportText(""); setImportError(""); }} style={{
              padding: "10px 16px", fontSize: 11, fontWeight: 600, fontFamily: T.sans,
              background: "transparent", color: T.textMed, border: `1px solid ${T.border}`,
              borderRadius: T.radius, cursor: "pointer",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {charts.length === 0 && !showImport && (
        <div style={{
          textAlign: "center", padding: "40px 20px", color: T.textLight,
          fontFamily: T.serif, fontStyle: "italic", fontSize: 14,
        }}>
          No charts yet — create your first one!
        </div>
      )}

      {charts.map(ch => (
        <div key={ch.id} onClick={() => onSelect(ch)} style={{
          padding: "16px 20px", background: T.bgCard, border: `1px solid ${T.border}`,
          borderRadius: T.radiusMd, marginBottom: 8, cursor: "pointer",
          transition: "box-shadow 0.15s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{
                fontSize: 15, fontFamily: T.serif, fontWeight: 600, color: T.textDark,
                marginBottom: 4,
              }}>{ch.title || "Untitled Chart"}</div>
              <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
                {getPreview(ch)} · {ch.measures?.length || 0} measure{(ch.measures?.length || 0) !== 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: 9, color: T.textMuted, fontFamily: T.sans, marginTop: 4 }}>
                {ch.updatedAt ? new Date(ch.updatedAt).toLocaleDateString() : ""}
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); deleteChart(ch.id); }} style={{
              background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 8,
            }}><Trash2 size={14} /></button>
          </div>
        </div>
      ))}

      {/* Delete undo toast */}
      {deleteToast && (
        <div style={{
          position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)",
          background: T.textDark, color: "#fff", padding: "10px 20px", borderRadius: T.radiusMd,
          fontSize: 12, fontFamily: T.sans, display: "flex", gap: 12, alignItems: "center",
          zIndex: 999, boxShadow: T.md,
        }}>
          <span>Chart deleted</span>
          <button onClick={undoDelete} style={{
            background: T.gold, color: "#fff", border: "none", padding: "4px 12px",
            borderRadius: T.radius, cursor: "pointer", fontSize: 11, fontWeight: 700,
          }}>Undo</button>
        </div>
      )}
    </div>
  );
}
