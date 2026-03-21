import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, RotateCcw, Scissors } from 'lucide-react';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from '../audioKeepalive.js';
import useIsWide from '../hooks/useIsWide.js';
import { formatTime, TimeInput } from './shared.jsx';

// --- YouTube API utilities ---
export function loadYouTubeAPI() {
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

export function extractYouTubeId(url) {
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
export function claimAudioMutex() {
  const id = ++audioMutexId;
  window.dispatchEvent(new CustomEvent("audioSourceChange", { detail: { id } }));
  return id;
}

// --- Style helpers ---
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

// --- YouTube Audio Player Component ---
export function YouTubeAudioPlayer({ videoId, theme: T, title }) {
  const containerRef = useRef(null);
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
  useEffect(() => {
    if (!videoId) return;
    let destroyed = false;
    setError(null);
    setIsReady(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);

    loadYouTubeAPI().then(() => {
      if (destroyed) return;
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
      }
      playerRef.current = new window.YT.Player(containerRef.current, {
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
      {/* Hidden YouTube player */}
      <div style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div ref={containerRef} />
      </div>

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
