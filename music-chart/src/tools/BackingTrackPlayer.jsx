import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, RotateCcw, Scissors } from 'lucide-react';
import { T } from '../theme.js';
import { formatTime } from './shared.jsx';
import { claimAudioMutex } from './youtube.jsx';
import useIsWide from '../hooks/useIsWide.js';

// --- Shared button styles for loop tray ---
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

// --- TimeInput helper ---
const TimeInput = ({ time, onChange, T }) => {
  const [val, setVal] = useState(formatTime(time));
  useEffect(() => { setVal(formatTime(time)); }, [time]);

  return (
    <input
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => {
        let t = parseFloat(val);
        if (val.includes(':')) {
          const parts = val.split(':');
          t = parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
        }
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

// --- Custom Audio Player Component ---
export function MiniAudioPlayer({ src, theme: T, title, playbackRate = 1 }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const mutexIdRef = useRef(null);
  const isWide = useIsWide(900);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const syncRafRef = useRef(null);

  const [isLooping, setIsLooping] = useState(false);
  const [showLoopSettings, setShowLoopSettings] = useState(false);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);

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

  useEffect(() => {
    if (duration > 0 && loopEnd === 0) setLoopEnd(duration);
  }, [duration, loopEnd]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed * playbackRate;
    }
  }, [playbackRate, speed]);

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
        mutexIdRef.current = claimAudioMutex();
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
      if (!isPlaying) togglePlay();
    }
  };

  const setBoundary = (type) => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    if (type === 'A') {
      const newStart = Math.max(0, Math.min(current, loopEnd - 1));
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

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {title && <div style={{ fontSize: 13, fontWeight: 600, color: T.textDark, fontFamily: T.sans }}>{title}</div>}

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {formatTime(currentTime)}
            </span>

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

      {showLoopSettings && (
        <div style={{
          borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12, marginTop: -4,
          display: "flex", flexDirection: "column", gap: isWide ? 8 : 12,
          animation: 'fade-in-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
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

// --- 1. Audio Player (full track list) ---
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
    { id: 'drumsReggae', name: 'Drums Only \u2014 Reggae 85 BPM', src: '/drums-reggae-85.mp3' },
    { id: 'drumsBossa', name: 'Drums Only \u2014 Bossa Nova 75 BPM', src: '/drums-bossa-75.mp3' },
    { id: 'drumsSoulFunk', name: 'Drums Only \u2014 Soul Funk 90 BPM', src: '/drums-soul-funk-90.mp3' },
    { id: 'drumsSurf', name: 'Drums Only \u2014 Surf Rock 120 BPM', src: '/drums-surf-120.mp3' },
    { id: 'drumsAfrobeat', name: 'Drums Only \u2014 Afrobeat 110 BPM', src: '/drums-afrobeat-110.mp3' },
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
