import React, { useState, useRef, useEffect } from 'react';
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
    { id: 'janglepsych', name: 'Jangle Psych 105 BPM', src: '/jangle-psych-105.mp3' },
    { id: 'reggaerock', name: 'Reggae Rock 100 BPM', src: '/reggae-rock-100.mp3' },
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
const MIN_FREQ = 40; // ~E1
const MAX_FREQ = 1046; // ~C6
const RMS_THRESHOLD = 0.008; // Unified silence gate
const YIN_THRESHOLD = 0.15; // CMND dip threshold — tune after real-device testing

function autoCorrelate(buffer, sampleRate) {
  // YIN pitch detection — uses CMND to eliminate octave errors
  // (RMS silence gate is handled by caller in detectPitch)
  const W = Math.floor(buffer.length / 2); // Use first half of buffer
  const maxLag = Math.min(Math.floor(sampleRate / MIN_FREQ), W - 1);
  const minLag = Math.floor(sampleRate / MAX_FREQ);

  // 2. Difference function: d[tau] = sum((buf[n] - buf[n+tau])^2)
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

  // 3. Cumulative mean normalized difference (CMND)
  const dPrime = new Float32Array(maxLag + 1);
  dPrime[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    runningSum += d[tau];
    dPrime[tau] = runningSum > 0 ? d[tau] / (runningSum / tau) : 1;
  }

  // 4. Absolute threshold — find first dip below YIN_THRESHOLD
  let bestTau = -1;
  for (let tau = minLag; tau <= maxLag; tau++) {
    if (dPrime[tau] < YIN_THRESHOLD) {
      // Walk to the local minimum
      while (tau + 1 <= maxLag && dPrime[tau + 1] < dPrime[tau]) tau++;
      bestTau = tau;
      break;
    }
  }

  // If no dip found below threshold, find the global minimum as fallback
  if (bestTau < 0) {
    let minVal = Infinity;
    for (let tau = minLag; tau <= maxLag; tau++) {
      if (dPrime[tau] < minVal) {
        minVal = dPrime[tau];
        bestTau = tau;
      }
    }
    // Only use global min if it's reasonably good
    if (minVal > 0.5) return null;
  }

  // 5. Parabolic interpolation for sub-sample precision
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
      analyser.fftSize = 4096;
      analyserRef.current = analyser;

      // High-pass filter at 40Hz to reject handling noise, room rumble, wind
      const hpFilter = audioCtx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.value = 40;
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

        // 1. Median filter to reject outliers (3-sample for YIN's cleaner output)
        freqBufRef.current.push(freq);
        if (freqBufRef.current.length > 3) freqBufRef.current.shift();
        const sorted = [...freqBufRef.current].sort((a, b) => a - b);
        const medianFreq = sorted[Math.floor(sorted.length / 2)];

        // 2. Exponential Moving Average (EMA) — tuned for singing responsiveness
        const alpha = 0.3;
        const semitoneJump = emaFreqRef.current
          ? Math.abs(12 * Math.log2(medianFreq / emaFreqRef.current))
          : Infinity;
        if (!emaFreqRef.current || semitoneJump > 3) {
          emaFreqRef.current = medianFreq;
        } else {
          emaFreqRef.current = alpha * medianFreq + (1 - alpha) * emaFreqRef.current;
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
export function VolumeMeter({ theme: T, inline = false }) {
  const [isActive, setIsActive] = useState(false);
  const [dbLevel, setDbLevel] = useState(-60);
  const [history, setHistory] = useState([]);

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
      setIsActive(true);
      measureVolume();
    } catch (err) {
      alert("Could not access microphone.");
    }
  };

  const measureVolume = () => {
    if (!analyserRef.current) return;
    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    const rms = Math.sqrt(sum / buffer.length);
    const db = rms > 0 ? 20 * Math.log10(rms) : -60;
    const clampedDb = Math.max(-60, Math.min(0, db));
    setDbLevel(clampedDb);
    const now = performance.now();
    if (now - lastHistoryUpdate.current > 100) {
      setHistory(h => [...h.slice(-99), clampedDb]);
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
    const x = (i / 99) * 100;
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

      {/* Sparkline */}
      {history.length > 1 && (
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

// --- Drone Generator Component ---
export function DroneGenerator({ theme: T }) {
  const [playing, setPlaying] = useState(false);
  const [root, setRoot] = useState("C");
  const [volume, setVolume] = useState(-12);
  const synthRef = useRef(null);

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

  useEffect(() => {
    // A lush, warm pad
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    // Use an LFO to modulate the filter frequency for a "breathing" living pad
    const filter = new Tone.Filter(800, "lowpass").connect(chorus);

    // Fat sawtooth with slow attack/release
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "fatsawtooth", count: 3, spread: 25 },
      envelope: { attack: 2.5, decay: 0.1, sustain: 1, release: 4 }
    }).connect(filter);

    // LFO is started after synth creation
    const lfo = new Tone.LFO(0.1, 400, 1200).connect(filter.frequency).start();

    synth.volume.value = volume;
    synthRef.current = synth;

    return () => {
      synth.dispose();
      filter.dispose();
      lfo.dispose();
      chorus.dispose();
    };
  }, []);

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
      setPlaying(false);
    } else {
      const n1 = `${root.replace('♭', 'b')}2`;
      const n2 = `${root.replace('♭', 'b')}3`;
      synthRef.current.triggerAttack([n1, n2]);
      setPlaying(true);
    }
  };

  const changeRoot = (n) => {
    if (playing && root !== n) {
      synthRef.current.releaseAll();
      const n1 = `${n.replace('♭', 'b')}2`;
      const n2 = `${n.replace('♭', 'b')}3`;
      synthRef.current.triggerAttack([n1, n2], "+0.5");
    }
    setRoot(n);
  };

  return (
    <div style={{ padding: "10px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, marginBottom: 8 }}>
          Warm, continuous analog pad for ear training.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, maxWidth: 360, margin: "0 auto 32px" }}>
        {notes.map(n => {
          const isActive = root === n;
          return (
            <button key={n} onClick={() => changeRoot(n)} style={{
              width: "100%", aspectRatio: "1", borderRadius: T.radius,
              background: isActive ? T.plum : "transparent",
              border: `1px solid ${isActive ? T.plum : T.border}`,
              color: isActive ? "#fff" : T.textMed,
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
              transition: "all 0.2s",
              boxShadow: isActive ? `0 4px 12px ${T.plum}40` : "none"
            }}>
              {n}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, maxWidth: 300, margin: "0 auto", marginBottom: 32, background: T.bgSoft, padding: "12px 20px", borderRadius: T.radiusMd, border: `1px solid ${T.borderSoft}` }}>
        <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans, fontWeight: 700, letterSpacing: 1 }}>VOL</span>
        <input type="range" min={-30} max={0} value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          style={{ flex: 1, accentColor: T.plum, height: 3 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={toggleDrone} style={{
          background: playing ? T.coral : T.plum, border: "none", color: "#fff",
          padding: "16px 40px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 30,
          fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
          boxShadow: playing ? `0 0 24px ${T.coral}60` : `0 8px 20px ${T.plum}40`,
          transition: "all 0.3s",
          animation: playing ? "pulse-ring 3s infinite" : "none"
        }}>
          {playing ? "Stop Drone" : "Start Drone"}
        </button>
      </div>
    </div>
  );
}

// --- 11. Inline Keyboard ---
export function InlineKeyboard({
  range = ["C3", "B4"],
  highlightNotes = [],
  label = "",
  theme: T, // Accept the theme prop explicitly
  zoneMap = [] // optional: [{range: [minIdx, maxIdx], color: string}]
}) {
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
