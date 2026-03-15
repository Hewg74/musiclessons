import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';

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

// --- Custom Audio Player Component ---
export function MiniAudioPlayer({ src, theme: T, title, playbackRate = 1 }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Apply playback rate globally when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Looping state
  const [isLooping, setIsLooping] = useState(false);
  const [showLoopSettings, setShowLoopSettings] = useState(false);
  const [loopStart, setLoopStart] = useState(0); // seconds
  const [loopEnd, setLoopEnd] = useState(0); // seconds

  // Initialize loopEnd when duration loads
  useEffect(() => {
    if (duration > 0 && loopEnd === 0) setLoopEnd(duration);
  }, [duration, loopEnd]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Stop any other `<audio>` elements playing by dispatching an event that LivePitchDetector also listens to
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
          background: "transparent", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: "50%",
          boxShadow: `0 0 0 1px ${T.border}`,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          color: T.textDark
        }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
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

        {/* Inline Transport Controls (Right Side) */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => setShowLoopSettings(!showLoopSettings)} title="Loop Settings" style={{
            background: isLooping || showLoopSettings ? T.bgSoft : "transparent",
            border: `1px solid ${isLooping ? T.gold : showLoopSettings ? T.border : "transparent"}`,
            color: isLooping || showLoopSettings ? T.gold : T.textMed, cursor: "pointer",
            padding: 6, borderRadius: T.radius, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            marginLeft: 4
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Loop Tray */}
      {showLoopSettings && (
        <div style={{
          borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12, marginTop: -4,
          display: "flex", flexDirection: "column", gap: 12,
          animation: 'fade-in-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: T.textDark, fontFamily: T.sans }}>A/B Loop Mode</span>
              {/* Relocated Transport Controls */}
              <div style={{ display: "flex", gap: 6, paddingLeft: 12, borderLeft: `1px solid ${T.borderSoft}` }}>
                <button onClick={skipBack} title="Rewind 10s" style={trayNavBtnStyle(T)}
                  onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                  onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                  </svg>
                </button>
                <button onClick={resetSong} title="Restart" style={trayNavBtnStyle(T)}
                  onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
                  onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </button>
              </div>
            </div>
            {/* Beautiful Pill Toggle */}
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
            {/* Start A */}
            <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>Start (A)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TimeInput time={loopStart} onChange={(t) => {
                  let newStart = Math.max(0, t);
                  if (newStart >= loopEnd) newStart = Math.max(0, loopEnd - 1);
                  setLoopStart(newStart);
                }} T={T} />
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => nudgeBoundary('A', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                  <button onClick={() => nudgeBoundary('A', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                  <button onClick={() => setBoundary('A')} style={setBtnStyle(T)}>Set</button>
                </div>
              </div>
            </div>
            {/* End B */}
            <div style={{ flex: 1, background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: "8px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>End (B)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TimeInput time={loopEnd} onChange={(t) => {
                  let newEnd = Math.min(duration, t);
                  if (newEnd <= loopStart) newEnd = Math.min(duration, loopStart + 1);
                  setLoopEnd(newEnd);
                }} T={T} />
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => nudgeBoundary('B', -0.5)} style={nudgeBtnStyle(T)}>-</button>
                  <button onClick={() => nudgeBoundary('B', 0.5)} style={nudgeBtnStyle(T)}>+</button>
                  <button onClick={() => setBoundary('B')} style={setBtnStyle(T)}>Set</button>
                </div>
              </div>
            </div>
          </div>
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

      // Setup audio visualization
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(console.error);
      }
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
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(console.error);
      }
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
const CONFIDENCE_GATE = 0.30; // Reject frames where CMND dip > this (low confidence)

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
  // Round to nearest 5 to prevent jitter
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

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

  const stopDetection = () => {
    setIsActive(false);
    setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (hpFilterRef.current) hpFilterRef.current.disconnect();
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    analyserRef.current = null;
    pitchBufRef.current = null;
    contourRangeRef.current = { min: null, max: null };
  };

  useEffect(() => {
    return stopDetection; // Cleanup on unmount
  }, []);

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

        // 4. EMA smoothing — alpha 0.4 balances responsiveness + stability
        const alpha = 0.4;
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

        // 3. Hysteresis for Note Display — 120ms for singing responsiveness
        const now = Date.now();
        if (midi !== stableMidiRef.current) {
          if (now - lastNoteUpdateRef.current > 120) {
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

    if (analyserRef.current) {
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
  const scaleData = SCALES[scale] || SCALES["am-pentatonic"];
  const positionsConfig = scaleData.positions || { 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [12, 15], 5: [0, 3] };
  const [lo, hi] = positionsConfig[selectedPos] || positionsConfig[1];

  // Expand render range by 1 fret on each side for dot rendering
  const renderLo = Math.max(0, lo - 1);
  const renderHi = Math.min(15, hi + 1);

  const totalFrets = 16; // 0-15
  const numStrings = 6;

  // SVG layout constants
  const leftPad = 36;
  const rightPad = 16;
  const topPad = 28;
  const bottomPad = 20;
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
    setTimeout(() => synth.dispose(), 2000);
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
            Pos {selectedPos} &middot; Frets {lo}–{hi}
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
              onClick={() => setSelectedPos(p)}
              style={{
                background: selectedPos === p ? T.gold : "transparent",
                color: selectedPos === p ? "#fff" : T.textMed,
                border: `1px solid ${selectedPos === p ? T.gold : T.borderSoft}`,
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
        {/* Position highlight rectangle */}
        <rect
          x={leftPad + lo * fretSpacing}
          y={topPad - 12}
          width={(hi - lo + 1) * fretSpacing}
          height={(numStrings - 1) * stringSpacing + 24}
          rx={6}
          fill={T.gold}
          opacity={0.08}
        />

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
            fill={i >= lo && i <= hi ? T.textDark : T.textLight}
            fontWeight={i >= lo && i <= hi ? 700 : 500}
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
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    analyserRef.current = null;
    setDbLevel(-60);
    setHistory([]);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  // Determine bar color based on dB level
  const barColor = dbLevel >= -6 ? T.coral : dbLevel >= -20 ? T.gold : T.success;
  // Bar width as percentage (maps -60..0 to 0..100%)
  const barWidth = ((dbLevel + 60) / 60) * 100;

  if (!isActive) {
    return (
      <div style={{
        background: T.bgSoft, border: `1px solid ${T.border}`,
        borderRadius: T.radius, padding: inline ? 16 : 16, marginBottom: 16
      }}>
        <button
          onClick={startMeter}
          style={{
            background: T.gold, color: '#fff', border: 'none',
            padding: inline ? '8px 16px' : '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 600,
            fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 1,
            fontSize: inline ? 13 : 14
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
      background: T.bgSoft, border: `1px solid ${T.border}`,
      borderRadius: T.radius, padding: inline ? 16 : 16, marginBottom: 16
    }}>
      {/* dB Readout */}
      <div style={{
        fontSize: inline ? 28 : 36, fontWeight: 700, textAlign: 'center',
        color: barColor, fontFamily: T.sans, marginBottom: 12,
        transition: 'color 0.15s ease'
      }}>
        {Math.round(dbLevel)} dB
      </div>

      {/* LED-style VU Meter */}
      <div style={{
        display: "flex", gap: inline ? 2 : 3, marginBottom: 12, height: inline ? 12 : 20,
        padding: "4px", background: "#000", borderRadius: 4,
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)"
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
              background: isOn ? color : "#222",
              borderRadius: 1,
              boxShadow: isOn ? `0 0 8px ${glowColor}90` : "none",
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

  // Full lush pad chord voicing
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
    getNote(0, -1),    // Sub bass
    getNote(0, 0),     // Root
    getNote(fifth, 0), // Fifth
    getNote(third, 1)  // Third (spread up an octave)
  ];
  if (seventh !== null) voicing.push(getNote(seventh, 1));
  
  return [...new Set(voicing)];
};

// --- Drone Generator Component ---
export function DroneGenerator({ theme: T, defaultRoot, defaultOctave, defaultTexture, defaultMode, defaultPreset, defaultProgression, defaultBpm, defaultStepDuration, inline }) {
  // Resolve preset defaults
  const preset = defaultPreset ? DRONE_PRESETS.find(p => p.id === defaultPreset) : null;

  const [playing, setPlaying] = useState(false);
  const [root, setRoot] = useState(defaultRoot || "C");
  const [octave, setOctave] = useState(defaultOctave || 2);
  const [volume, setVolume] = useState(-12);
  const [texture, setTexture] = useState(defaultTexture || "analog");
  const [mode, setMode] = useState(defaultMode || (preset ? "cycle" : "manual"));
  const [progression, setProgression] = useState(defaultProgression || (preset ? preset.chords : ["C", "C", "F", "G", "Am", "Am", "F", "G"]));
  const [stepDuration, setStepDuration] = useState(defaultStepDuration || (preset ? preset.stepDuration : "2n"));
  const [bpm, setBpm] = useState(defaultBpm || (preset ? preset.bpm : 80));
  const [activeStep, setActiveStep] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activePreset, setActivePreset] = useState(defaultPreset || null);

  const synthRef = useRef(null);
  const loopRef = useRef(null);
  const octaveRef = useRef(octave);
  const textureRef = useRef(texture);
  const progressionRef = useRef(progression);
  const previousNotesRef = useRef([]);

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

  // Sync props → state when exercise changes (React reuses component, doesn't remount)
  useEffect(() => {
    if (defaultRoot && defaultRoot !== root) setRoot(defaultRoot);
  }, [defaultRoot]);
  useEffect(() => {
    if (defaultOctave && defaultOctave !== octave) setOctave(defaultOctave);
  }, [defaultOctave]);
  useEffect(() => {
    if (defaultTexture && defaultTexture !== texture) setTexture(defaultTexture);
  }, [defaultTexture]);

  useEffect(() => { octaveRef.current = octave; }, [octave]);
  useEffect(() => { textureRef.current = texture; }, [texture]);
  useEffect(() => { progressionRef.current = progression; }, [progression]);

  // Handle screen off / visibility change — pause audio context to prevent crackling
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && Tone.getContext().state === "running") {
        Tone.getContext().rawContext.suspend();
      } else if (!document.hidden && playing) {
        Tone.getContext().rawContext.resume();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing]);

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    let effectSynth = null;
    let effectNodes = [];

    let synth;
    let newNodes = [];

    // Master bus to prevent clipping and manage dynamics
    const masterGain = new Tone.Gain(0.5);
    // Highpass filter to kill sub-rumble below 30Hz that eats headroom and causes compressor distortion
    const lowcut = new Tone.Filter(30, "highpass");
    const compressor = new Tone.Compressor({
      threshold: -24,
      ratio: 4,
      attack: 0.1,
      release: 0.5
    });
    // Final safety limiter to guarantee no digital clipping 
    const limiter = new Tone.Limiter(-1).toDestination();
    
    masterGain.chain(lowcut, compressor, limiter);
    newNodes.push(masterGain, lowcut, compressor, limiter);

    // FIX: Replaced async Tone.Reverb with synchronous Tone.Freeverb to prevent Web Audio crashes on rapid switching
    if (texture === "analog") {
      const chorus = new Tone.Chorus(4, 2.5, 0.5).connect(masterGain).start();
      const filter = new Tone.Filter(800, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "fatsawtooth", count: 3, spread: 25 },
        envelope: { attack: 2.5, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      const lfo = new Tone.LFO(0.1, 400, 1200).connect(filter.frequency).start();
      newNodes.push(chorus, filter, lfo);
    } 
    else if (texture === "choir") {
      const reverb = new Tone.Freeverb({ roomSize: 0.9, dampening: 2000 }).connect(masterGain);
      const filter = new Tone.Filter(1500, "lowpass").connect(reverb);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -12,
        harmonicity: 1.01, modulationIndex: 2,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      newNodes.push(reverb, filter);
    }
    else if (texture === "organ") {
      const chorus = new Tone.Chorus(2, 4, 0.8).connect(masterGain).start();
      const eq = new Tone.EQ3(2, -2, -6).connect(chorus);
      synth = new Tone.PolySynth(Tone.AMSynth, {
        volume: -12,
        harmonicity: 1.005,
        oscillator: { type: "square" },
        modulation: { type: "square" },
        envelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 },
        modulationEnvelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 }
      }).connect(eq);
      synth.maxPolyphony = 32;
      newNodes.push(chorus, eq);
    }
    else if (texture === "pure") {
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -10,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 32;
    }
    else if (texture === "strings") {
      const reverb = new Tone.Freeverb({ roomSize: 0.8, dampening: 3000 }).connect(masterGain);
      const chorus = new Tone.Chorus(2, 2.5, 0.6).connect(reverb).start();
      const filter = new Tone.Filter(1200, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "fatsawtooth", count: 3, spread: 20 },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      const lfo = new Tone.LFO(0.1, 800, 1500).connect(filter.frequency).start();
      newNodes.push(reverb, chorus, filter, lfo);
    }
    else if (texture === "tanpura") {
      const phaser = new Tone.Phaser({ frequency: 0.2, octaves: 3, baseFrequency: 200 }).connect(masterGain);
      const filter = new Tone.Filter(3000, "lowpass").connect(phaser);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 2.01, modulationIndex: 3,
        oscillator: { type: "sawtooth" },
        modulation: { type: "sine" },
        envelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      newNodes.push(phaser, filter);
    }
    else if (texture === "crystal") {
      const reverb = new Tone.Freeverb({ roomSize: 0.95, dampening: 1000 }).connect(masterGain);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 1.005, modulationIndex: 1.5,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 }
      }).connect(reverb);
      synth.maxPolyphony = 32;
      newNodes.push(reverb);
    }
    else if (texture === "lofi-tape") {
      const vibrato = new Tone.Vibrato({ frequency: 2, depth: 0.1 }).connect(masterGain);
      const filter = new Tone.Filter(1000, "lowpass").connect(vibrato);
      const chorus = new Tone.Chorus(4, 2.5, 0.4).connect(filter).start();
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "triangle" },
        envelope: { attack: 1.5, decay: 0.5, sustain: 0.8, release: 2 }
      }).connect(chorus);
      synth.maxPolyphony = 32;
      newNodes.push(vibrato, filter, chorus);
    }
    else if (texture === "surf-tremolo") {
      const reverb = new Tone.Freeverb({ roomSize: 0.8, dampening: 4000 }).connect(masterGain);
      const tremolo = new Tone.Tremolo(4, 0.8).connect(reverb).start();
      const filter = new Tone.Filter(1500, "lowpass").connect(tremolo);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "triangle" },
        envelope: { attack: 0.8, decay: 0.2, sustain: 0.8, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      newNodes.push(reverb, tremolo, filter);
    }
    else if (texture === "vintage-keys") {
      const phaser = new Tone.Phaser({ frequency: 0.5, octaves: 2, baseFrequency: 400 }).connect(masterGain);
      const chorus = new Tone.Chorus(2, 3, 0.6).connect(phaser).start();
      const filter = new Tone.Filter(800, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -12,
        harmonicity: 2,
        modulationIndex: 1.5,
        oscillator: { type: "sine" },
        modulation: { type: "square" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1.5 },
        modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1.5 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      newNodes.push(phaser, chorus, filter);
    }
    else if (texture === "dub-sub") {
      const filter = new Tone.Filter(150, "lowpass", -24).connect(masterGain);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -8,
        harmonicity: 1, modulationIndex: 0.5,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 0.5, decay: 0.2, sustain: 1, release: 1 },
        modulationEnvelope: { attack: 0.5, decay: 0.2, sustain: 1, release: 1 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      newNodes.push(filter);
    }
    else if (texture === "warm") {
      const reverb = new Tone.Freeverb({ roomSize: 0.6, dampening: 2500 }).connect(masterGain);
      const chorus = new Tone.Chorus(1.5, 3, 0.4).connect(reverb).start();
      const filter = new Tone.Filter(600, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -12,
        oscillator: { type: "fattriangle", count: 2, spread: 15 },
        envelope: { attack: 2, decay: 0.3, sustain: 0.9, release: 3 }
      }).connect(filter);
      synth.maxPolyphony = 32;
      const lfo = new Tone.LFO(0.08, 400, 700).connect(filter.frequency).start();
      newNodes.push(reverb, chorus, filter, lfo);
    }

    // Fallback for unknown textures — default to pure sine
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -10,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 32;
    }

    synth.volume.value = volume;
    effectSynth = synth;
    effectNodes = newNodes;
    synthRef.current = synth;

    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
      if (chordNotes) synth.triggerAttack(chordNotes);
      previousNotesRef.current = chordNotes || [];
    }

    return () => {
      if (effectSynth) {
        try { effectSynth.releaseAll(); } catch (e) {}
        setTimeout(() => {
          try { effectSynth.dispose(); } catch(e) {}
          effectNodes.forEach(node => {
            try { node.dispose(); } catch(e) {}
          });
        }, 2000);
      }
    };
  }, [texture]); // re-run only when texture changes

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.rampTo(volume, 0.1);
    }
  }, [volume]);

  const toggleDrone = async () => {
    if (!synthRef.current) return;
    if (Tone.context.state !== "running") await Tone.context.resume();

    if (playing) {
      synthRef.current.releaseAll();
      previousNotesRef.current = [];
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
        loopRef.current = null;
      }
      setPlaying(false);
      setActiveStep(-1);
    } else {
      setEditingIndex(null); // Close editor when starting
      if (mode === "cycle") {
        const pRef = progressionRef.current;
        if (pRef.length === 0) return;
        
        let step = 0;
        Tone.Transport.bpm.value = bpm;
        
        loopRef.current = new Tone.Loop((time) => {
          const currentProg = progressionRef.current;
          if (currentProg.length === 0) return;
          
          const rawChord = currentProg[step % currentProg.length];
          const match = rawChord.match(/^[A-G][#♭b]?/);
          const r = match ? match[0].replace('b', '♭') : "C";
          
          Tone.Draw.schedule(() => {
            setRoot(r);
            setActiveStep(step % currentProg.length);
          }, time);

          const chordNotes = parseChordToNotes(rawChord, octaveRef.current, "chord"); // Full Chord
          
          if (chordNotes) {
            const currentNotes = previousNotesRef.current;
            const notesToRelease = currentNotes.filter(n => !chordNotes.includes(n));
            const notesToAttack = chordNotes.filter(n => !currentNotes.includes(n));
            
            if (notesToRelease.length > 0) synthRef.current.triggerRelease(notesToRelease, time);
            if (notesToAttack.length > 0) synthRef.current.triggerAttack(notesToAttack, time + 0.05); // Crossfade envelope
            
            previousNotesRef.current = chordNotes;
          } else {
            synthRef.current.releaseAll(time);
            previousNotesRef.current = [];
          }
          step++;
        }, stepDuration).start(0);
        
        if (Tone.Transport.state !== "started") Tone.Transport.start();
      } else {
        const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
        if (chordNotes) synthRef.current.triggerAttack(chordNotes);
        previousNotesRef.current = chordNotes || [];
      }
      setPlaying(true);
    }
  };

  const changeRoot = (n) => {
    if (playing && (mode === "manual" || mode === "single") && root !== n) {
      const chordNotes = parseChordToNotes(n, octaveRef.current, mode === "single" ? "single" : "chord");
      if (chordNotes) {
        const currentNotes = previousNotesRef.current || [];
        const notesToRelease = currentNotes.filter(note => !chordNotes.includes(note));
        const notesToAttack = chordNotes.filter(note => !currentNotes.includes(note));
        
        if (notesToRelease.length > 0) synthRef.current.triggerRelease(notesToRelease);
        if (notesToAttack.length > 0) synthRef.current.triggerAttack(notesToAttack, "+0.05"); // slight delay for crossfade
        
        previousNotesRef.current = chordNotes;
      }
    }
    setRoot(n);
  };

  const changeOctave = (oct) => {
    setOctave(oct);
    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(root, oct, mode === "single" ? "single" : "chord");
      if (chordNotes) {
        const currentNotes = previousNotesRef.current || [];
        const notesToRelease = currentNotes.filter(note => !chordNotes.includes(note));
        const notesToAttack = chordNotes.filter(note => !currentNotes.includes(note));
        
        if (notesToRelease.length > 0) synthRef.current.triggerRelease(notesToRelease);
        if (notesToAttack.length > 0) synthRef.current.triggerAttack(notesToAttack, "+0.05");
        
        previousNotesRef.current = chordNotes;
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
      padding: "40px 24px", textAlign: "center", borderRadius: T.radius,
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
        <div style={{ fontSize: 10, color: playing ? T.plum : T.textMuted, fontWeight: 800, letterSpacing: 3, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 12, transition: "color 0.4s" }}>
          Harmonic Drone Engine
        </div>
        <div style={{ fontSize: 12, color: T.textMed, fontFamily: T.sans, marginBottom: 24, fontStyle: "italic" }}>
          Continuous harmonic foundation for ear training.
        </div>
        
        {/* Texture Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", maxWidth: 500, margin: "0 auto 24px" }}>
          {[
            { id: "analog", label: "Analog Pad" },
            { id: "choir", label: "Ethereal Choir" },
            { id: "organ", label: "Harmonium" },
            { id: "pure", label: "Pure Sine" },
            { id: "strings", label: "Strings" },
            { id: "tanpura", label: "Tanpura" },
            { id: "crystal", label: "Crystal Bowl" },
            { id: "lofi-tape", label: "Lo-Fi Tape" },
            { id: "surf-tremolo", label: "Surf Tremolo" },
            { id: "vintage-keys", label: "Vintage Keys" },
            { id: "dub-sub", label: "Dub Sub" },
            { id: "warm", label: "Warm Pad" }
          ].map(t => (
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
            <div style={{ marginBottom: 24, background: T.bgSoft, padding: "24px", borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow }}>
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
                <div style={{ position: "absolute", left: 0, width: `${(volume + 40) / 40 * 100}%`, height: 6, background: playing ? T.plum : T.textMed, borderRadius: 3, pointerEvents: "none", transition: "background 0.4s" }} />
                <input type="range" min={-40} max={0} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  style={{ width: "100%", opacity: 0, height: 24, cursor: "pointer", position: "relative", zIndex: 10 }} />
                {/* Custom Thumb */}
                <div style={{ 
                  position: "absolute", left: `calc(${(volume + 40) / 40 * 100}% - 8px)`, width: 16, height: 16, 
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
                  <select value={stepDuration} onChange={e => setStepDuration(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: T.radius, border: `1px solid ${T.borderSoft}`, background: T.bgSoft, color: T.textDark, fontFamily: T.sans, fontSize: 13, outline: "none", cursor: "pointer", fontWeight: 700, appearance: "none", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)" }}>
                    <option value="4m">4 Bars</option>
                    <option value="2m">2 Bars</option>
                    <option value="1m">1 Bar</option>
                    <option value="2n">1/2 Bar</option>
                    <option value="4n">1 Beat</option>
                  </select>
                </div>
                {/* Tempo */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Tempo</div>
                  <div style={{ position: "relative" }}>
                    <input type="number" min={40} max={240} value={bpm} onChange={e => { setBpm(Number(e.target.value)); if (playing) Tone.Transport.bpm.value = Number(e.target.value); }} 
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

  const highlightSet = new Set(highlightNotes);

  const playNote = async (n) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(n.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
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
  const blackGradActive = `linear-gradient(180deg, #4a423e 0%, #38312e 100%)`;
  const blackBorder = `1px solid #1a1817`;

  return (
    <div style={{
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
            const isHighlight = highlightSet.has(note);
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
            const isHighlight = highlightSet.has(note);
            const left = (afterWhite + 1) * 44 - 15;
            const zone = zoneMap.find(z => index >= z.range[0] && index < z.range[1]);

            return (
              <div key={note} onClick={() => playNote(note)} style={{
                position: "absolute", left, top: 0, width: 30, height: 85,
                background: isHighlight ? blackGradActive : (zone ? zone.color : blackGradNormal),
                border: blackBorder,
                borderTop: "none",
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
  const [loopingIdx, setLoopingIdx] = useState(null);
  const [localBpm, setLocalBpm] = useState(bpm);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [currentNoteIdx, setCurrentNoteIdx] = useState(-1);
  const timeoutsRef = useRef([]);
  const synthsRef = useRef([]);
  const loopTimeoutRef = useRef(null);
  const clickSynthRef = useRef(null);
  const isLoopingRef = useRef(false);
  const playCellRef = useRef(null);

  const stopAll = useCallback(() => {
    isLoopingRef.current = false;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (loopTimeoutRef.current) { clearTimeout(loopTimeoutRef.current); loopTimeoutRef.current = null; }
    synthsRef.current.forEach(s => { try { s.dispose(); } catch (_) {} });
    synthsRef.current = [];
    setPlayingIdx(null);
    setLoopingIdx(null);
    setCurrentNoteIdx(-1);
  }, []);

  const playCell = useCallback((cell, idx, loop = false) => {
    // Clear any existing playback
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (loopTimeoutRef.current) { clearTimeout(loopTimeoutRef.current); loopTimeoutRef.current = null; }
    synthsRef.current.forEach(s => { try { s.dispose(); } catch (_) {} });
    synthsRef.current = [];
    setPlayingIdx(idx);
    if (loop) { setLoopingIdx(idx); isLoopingRef.current = true; }
    setCurrentNoteIdx(0);

    const beatMs = 60000 / localBpm;
    let offset = 0;
    const totalBeats = cell.pattern.reduce((a, b) => a + b, 0);

    // Schedule click track on beat boundaries
    if (clickEnabled || loop) {
      const numBeats = Math.ceil(totalBeats);
      for (let b = 0; b < numBeats; b++) {
        const ct = setTimeout(async () => {
          if (Tone.context.state !== 'running') await Tone.context.resume();
          if (!clickSynthRef.current) {
            clickSynthRef.current = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 } }).toDestination();
            clickSynthRef.current.volume.value = -12;
          }
          try { clickSynthRef.current.triggerAttackRelease("C5", "32n", Tone.now()); } catch (_) {}
        }, b * beatMs);
        timeoutsRef.current.push(ct);
      }
    }

    // Schedule pattern notes
    cell.pattern.forEach((dur, i) => {
      const t = setTimeout(async () => {
        if (Tone.context.state !== 'running') await Tone.context.resume();
        setCurrentNoteIdx(i);
        const synth = new Tone.Synth({
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.2 }
        }).toDestination();
        synth.volume.value = -6;
        synthsRef.current.push(synth);
        synth.triggerAttackRelease("A3", dur * beatMs / 1000, Tone.now());
        setTimeout(() => { synth.dispose(); synthsRef.current = synthsRef.current.filter(s2 => s2 !== synth); }, 2000);
      }, offset);
      timeoutsRef.current.push(t);
      offset += dur * beatMs;
    });

    // After pattern ends: loop or stop
    const endTimeout = setTimeout(() => {
      setCurrentNoteIdx(-1);
      if (isLoopingRef.current) {
        // 1-beat rest gap then re-trigger
        loopTimeoutRef.current = setTimeout(() => {
          if (isLoopingRef.current && playCellRef.current) playCellRef.current(cell, idx, true);
        }, beatMs);
      } else {
        setPlayingIdx(null);
      }
    }, offset + 100);
    timeoutsRef.current.push(endTimeout);
  }, [localBpm, clickEnabled]);
  playCellRef.current = playCell;

  const handleCellTap = useCallback((cell, idx) => {
    if (loopingIdx === idx) {
      // Currently looping this cell — stop
      stopAll();
    } else if (playingIdx === idx) {
      // Currently playing once — switch to loop
      playCell(cell, idx, true);
    } else {
      // Not playing — start single play (playCell already clears previous)
      playCell(cell, idx, false);
    }
  }, [playingIdx, loopingIdx, playCell, stopAll]);

  useEffect(() => {
    return () => {
      isLoopingRef.current = false;
      timeoutsRef.current.forEach(clearTimeout);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      synthsRef.current.forEach(s => { try { s.dispose(); } catch (_) {} });
      if (clickSynthRef.current) { try { clickSynthRef.current.dispose(); } catch (_) {} }
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

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>Click Track</span>
          <button onClick={() => setClickEnabled(!clickEnabled)} style={{
              background: clickEnabled ? T.success : T.border, border: "none",
              width: 44, height: 24, borderRadius: 12, position: "relative",
              cursor: "pointer", transition: "background 0.3s ease"
          }}>
              <div style={{
                  position: "absolute", top: 2, left: clickEnabled ? 22 : 2,
                  width: 20, height: 20, borderRadius: "50%", background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }} />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cells.map((cell, i) => {
          const isPlaying = playingIdx === i;
          const isLooping = loopingIdx === i;
          return (
            <div key={i} onClick={() => handleCellTap(cell, i)} style={{
              flex: "1 1 140px", maxWidth: 200, cursor: "pointer",
              background: isPlaying || isLooping ? T.goldSoft : T.bgCard,
              border: `1px solid ${isLooping ? T.gold : isPlaying ? T.gold + "80" : T.border}`,
              borderRadius: T.radiusMd || 8, padding: "14px",
              boxShadow: isPlaying || isLooping ? `0 0 0 1px ${T.gold}40, ${T.sm}` : T.sm,
              transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: isPlaying || isLooping ? "translateY(-2px)" : "translateY(0)"
            }}
            onPointerEnter={e => {
              if (!isPlaying && !isLooping) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(44, 40, 37, 0.06)`;
                e.currentTarget.style.borderColor = T.borderSoft;
              }
            }}
            onPointerLeave={e => {
              if (!isPlaying && !isLooping) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = T.sm;
                e.currentTarget.style.borderColor = T.border;
              }
            }}
            onPointerDown={e => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onPointerUp={e => {
              e.currentTarget.style.transform = isPlaying || isLooping ? "translateY(-2px)" : "translateY(0)";
            }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: (isPlaying || isLooping) ? T.goldDark : T.textDark, fontFamily: T.serif, marginBottom: 4, transition: "color 0.2s" }}>{cell.name}</div>
              <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginBottom: 10, lineHeight: 1.4 }}>{cell.description}</div>
              <div style={{ marginBottom: 6 }}>
                {renderPattern(cell.pattern, isPlaying ? currentNoteIdx : -1)}
              </div>
              <div style={{ 
                fontSize: 9, 
                color: isLooping ? T.goldDark : isPlaying ? T.textMed : T.textMuted, 
                fontFamily: T.sans, 
                marginTop: 8, 
                textTransform: "uppercase", 
                letterSpacing: 1,
                fontWeight: isLooping || isPlaying ? 700 : 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                {isLooping ? (
                  <><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.goldDark, display: "inline-block", animation: "pulse-ring 2s infinite" }} /> Looping &middot; tap to stop</>
                ) : isPlaying ? (
                  <><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.textMed, display: "inline-block" }} /> Playing &middot; tap to loop</>
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
