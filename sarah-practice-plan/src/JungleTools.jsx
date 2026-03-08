import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';

// We'll accept the theme object `T` from App.jsx via props or just hardcode some shared colors for now.
// For simplicity, we can just pass the theme object to these components.

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
    { id: 'soldelsur', name: 'Sol Del Sur (Original)', src: '/sol-del-sur.mp3' },
    { id: 'iltwyw', name: 'I Like The Way You Walk', src: '/iltwyw.mp3' }
  ];

  return (
    <div>
      <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 16 }}>
        Place these MP3 files in the <code>public/</code> folder. The PWA will cache them automatically for offline use.
      </p>
      {tracks.map(t => (
        <div key={t.id} style={{ background: T.bgCard, padding: 16, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.name}</div>
          <audio controls src={t.src} style={{ width: '100%', height: 40 }} />
        </div>
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    } catch (e) {
      console.error('Microphone access denied', e);
      alert('Microphone access denied. Please allow mic permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Cleanup on unmount: stop recording and release mic
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      // Stop all mic tracks
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div style={inline ? { background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16 } : {}}>
      {!inline && <p style={{ fontSize: 14, color: T.textMed, marginBottom: 16 }}>
        Record yourself and listen back immediately. (Saved temporarily in memory).
      </p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: inline ? 10 : 16 }}>
        {!isRecording ? (
          <button onClick={startRecording} style={{
            background: T.coral, color: '#fff', border: 'none', padding: inline ? '8px 16px' : '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
            fontSize: inline ? 12 : 14
          }}>
            <div style={{ width: inline ? 8 : 10, height: inline ? 8 : 10, borderRadius: '50%', background: '#fff' }} />
            REC
          </button>
        ) : (
          <button onClick={stopRecording} style={{
            background: T.textDark, color: '#fff', border: 'none', padding: inline ? '8px 16px' : '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
            animation: 'pulse-ring 2s infinite', fontSize: inline ? 12 : 14
          }}>
            <div style={{ width: inline ? 10 : 12, height: inline ? 10 : 12, background: '#fff', borderRadius: 2 }} />
            STOP
          </button>
        )}

        {isRecording && <span style={{ color: T.coral, fontSize: inline ? 12 : 14, fontWeight: 600 }}>Recording...</span>}

        {audioURL && inline && <audio controls src={audioURL} style={{ flex: 1, height: 32 }} />}
      </div>

      {audioURL && !inline && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.5, fontFamily: T.sans }}>Latest Take</div>
          <audio controls src={audioURL} style={{ width: '100%', height: 40 }} />
        </div>
      )}
    </div>
  );
}

// --- 5. Pitch Pipe (Tone.js) ---
export function PitchPipe({ theme: T }) {
  const [activeNote, setActiveNote] = useState(null);
  const synthRef = useRef(null);

  const strings = [
    { note: 'E2', label: 'E', string: 6 },
    { note: 'A2', label: 'A', string: 5 },
    { note: 'D3', label: 'D', string: 4 },
    { note: 'G3', label: 'G', string: 3 },
    { note: 'B3', label: 'B', string: 2 },
    { note: 'E4', label: 'E', string: 1 }
  ];

  const playNote = async (note) => {
    if (Tone.context.state !== 'running') {
      await Tone.context.resume();
    }

    if (!synthRef.current) {
      // Use an oscillator with some rich harmonics so it's audible on phone speakers
      synthRef.current = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
      }).toDestination();
      synthRef.current.volume.value = -8;
    }

    // Stop current note if it's playing
    synthRef.current.triggerRelease();

    if (activeNote === note) {
      setActiveNote(null);
      return;
    }

    setActiveNote(note);
    synthRef.current.triggerAttack(note);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.triggerRelease();
        synthRef.current.dispose();
      }
    };
  }, []);

  return (
    <div>
      <p style={{ fontSize: 13, color: T.textMed, marginBottom: 24, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5 }}>
        Standard Tuning (E A D G B E)
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)", gap: 12, justifyContent: 'center', maxWidth: 280, margin: "0 auto" }}>
        {strings.map(s => (
          <button
            key={s.note}
            onClick={() => playNote(s.note)}
            style={{
              aspectRatio: "1/1", width: "100%", maxWidth: 80, margin: "0 auto",
              borderRadius: "50%",
              border: activeNote === s.note ? `2px solid ${T.gold}` : `1px solid ${T.border}`,
              background: activeNote === s.note ? T.goldSoft : T.bgCard,
              color: activeNote === s.note ? T.goldDark : T.textDark,
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: 0,
              transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onPointerDown={e => { e.currentTarget.style.transform = "scale(0.92)"; }}
            onPointerUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
            onPointerLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span style={{ fontSize: 24, fontWeight: 600, fontFamily: T.sans, lineHeight: 1 }}>{s.label}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, marginTop: 2 }}>{s.string}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- 6. Live Pitch Detector ---
const MIN_FREQ = 65; // ~C2
const MAX_FREQ = 1046; // ~C6

function autoCorrelate(buffer, sampleRate) {
  // Perform a quick root-mean-square to check for silence
  let rms = 0;
  for (let i = 0; i < buffer.length; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / buffer.length);
  if (rms < 0.01) // Not enough signal
    return null;

  // Find a range in the buffer where the values are below a given threshold.
  let r1 = 0, r2 = buffer.length - 1, thres = 0.2;
  for (let i = 0; i < buffer.length / 2; i++)
    if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
  for (let i = 1; i < buffer.length / 2; i++)
    if (Math.abs(buffer[buffer.length - i]) < thres) { r2 = buffer.length - i; break; }

  buffer = buffer.slice(r1, r2);
  let c = new Array(buffer.length).fill(0);
  for (let i = 0; i < buffer.length; i++)
    for (let j = 0; j < buffer.length - i; j++)
      c[i] = c[i] + buffer[j] * buffer[j + i];

  let d = 0; while (c[d] > c[d + 1]) d++;
  let maxval = -1, maxpos = -1;
  for (let i = d; i < buffer.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  let x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
  let a = (x1 + x3 - 2 * x2) / 2;
  let b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

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
  const requestRef = useRef(null);
  const contourRef = useRef([]);
  const contourLastUpdate = useRef(0);

  // Smoothing state
  const emaFreqRef = useRef(null);
  const lastNoteUpdateRef = useRef(Date.now());
  const stableMidiRef = useRef(null);

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
      analyser.fftSize = 2048;
      // Smoothing time constant for the raw audio buffer (not the pitch output)
      analyser.smoothingTimeConstant = 0.5;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
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
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    analyserRef.current = null;
  };

  useEffect(() => {
    return stopDetection; // Cleanup on unmount
  }, []);

  const detectPitch = () => {
    if (!analyserRef.current) return;

    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);

    // Calculate RMS to filter out silence
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    if (rms > 0.005) { // Audibility threshold
      // Use advanced autocorrelation instead of YIN for a smoother, less jumpy experience 
      const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

      if (freq) {
        // 1. Exponential Moving Average (EMA) on Frequency
        const alpha = 0.08; // Even heavier smoothing (lower = smoother but more lag)
        if (!emaFreqRef.current || Math.abs(emaFreqRef.current - freq) > 100) {
          emaFreqRef.current = freq; // Immediate jump if too far off (prevents long slides between notes)
        } else {
          emaFreqRef.current = alpha * freq + (1 - alpha) * emaFreqRef.current;
        }

        const smoothedFreq = emaFreqRef.current;
        const midi = freqToMidi(smoothedFreq);
        const cents = getCentsOffset(smoothedFreq, midi);
        const noteStr = midiToNoteString(midi);

        // 2. Hysteresis for Note Display (don't flicker between notes quickly)
        const now = Date.now();
        if (midi !== stableMidiRef.current) {
          if (now - lastNoteUpdateRef.current > 120) { // Require note to be stable for ~120ms
            stableMidiRef.current = midi;
            lastNoteUpdateRef.current = now;
          }
        } else {
          lastNoteUpdateRef.current = now; // reset stability timer while holding note
        }

        // Figure out closest reference pitch (if any)
        let closestRef = null;
        let refFeedback = '';
        if (referencePitches && referencePitches.length > 0) {
          // Parse references to find minimum distance
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
                const d = Math.abs(midi - rMidi);
                if (d < minMidiDist) {
                  minMidiDist = d;
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
          } else if (minMidiDist <= 2) { // Show if within 2 semitones
            closestRef = bestRefStr;
            // Determine direction: compare detected midi to the closest reference midi
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
          const now = Date.now();
          contourRef.current.push({ t: now, midi: displayMidi });
          // Keep last 10 seconds
          const cutoff = now - 10000;
          contourRef.current = contourRef.current.filter(p => p.t > cutoff);
          // Update state every ~100ms to avoid excessive renders
          if (!contourLastUpdate.current || now - contourLastUpdate.current > 100) {
            setContourData([...contourRef.current]);
            contourLastUpdate.current = now;
          }
        }
      } else {
        // No pitch found (e.g. unvoiced consonant, breathing)
        emaFreqRef.current = null;
        stableMidiRef.current = null;
        setPitchState(prev => ({ ...prev, active: false }));
      }
    } else {
      // Silence
      emaFreqRef.current = null;
      stableMidiRef.current = null;
      setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });
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
      <button
        onClick={startDetection}
        className="interactive-btn"
        style={{
          background: "transparent", border: `1px solid ${T.border}`,
          color: T.textDark, padding: inline ? "8px 16px" : "12px 24px",
          borderRadius: 30, cursor: "pointer", fontWeight: 600,
          fontFamily: T.sans, display: "inline-flex", alignItems: "center", gap: 8,
          transition: "all 0.2s", fontSize: inline ? 13 : 14,
          boxShadow: T.sm
        }}
      >
        <span style={{ fontSize: 16 }}>🎤</span> Live Pitch
      </button>
    );
  }

  return (
    <div style={{
      background: bgTint, border: `1px solid ${borderTint}`,
      borderRadius: T.radius, padding: "16px",
      marginTop: inline ? 12 : 0, marginBottom: 16, transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      animation: "fade-in-up 0.3s ease-out forwards"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: pitchState.active ? T.coral : T.border,
            boxShadow: pitchState.active ? `0 0 8px ${T.coral}80` : 'none',
            // Simple opacity pulse to avoid clashing with global pulse-ring
            animation: pitchState.active ? "pulse-ring 2s infinite" : "none"
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase" }}>
            {audioPaused ? 'Paused — Audio Playing' : 'Live Pitch'}
          </span>
        </div>

        <button
          onClick={stopDetection}
          style={{
            background: "transparent", border: "none", color: T.textMuted,
            fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
            padding: "4px 8px", borderRadius: T.radius
          }}
        >
          ✕ STOP
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{
          fontSize: 48, fontWeight: 400, fontFamily: T.serif,
          color: pitchState.active ? T.textDark : T.textMuted,
          lineHeight: 1.1, minHeight: 52, transition: "color 0.2s"
        }}>
          {pitchState.note}
        </div>
      </div>

      {/* Cents Gauge */}
      <div style={{ position: "relative", width: "100%", height: 32, marginBottom: 8 }}>
        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.textMuted, fontFamily: T.sans, marginBottom: 4 }}>
          <span>♭ Flat</span>
          <span style={{ color: absCents <= 10 && pitchState.active ? T.success : T.textMuted, fontWeight: 600 }}>0</span>
          <span>Sharp ♯</span>
        </div>

        {/* Track */}
        <div style={{ height: 4, background: T.border, borderRadius: 2, position: "relative", top: 4, overflow: "visible" }}>
          {/* Center mark */}
          <div style={{ position: "absolute", left: "50%", top: -4, width: 2, height: 12, background: T.textMuted, transform: "translateX(-50%)", borderRadius: 1 }} />

          <div style={{
            position: "absolute",
            top: -6,
            left: dotPosition,
            width: 16, height: 16, borderRadius: "50%",
            background: pitchState.active ? statusColor : T.bgCard,
            border: pitchState.active ? "none" : `2px solid ${T.textMuted}`,
            transform: "translateX(-50%)",
            transition: "left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease, opacity 0.3s ease",
            opacity: pitchState.active ? 1 : 0,
            zIndex: 2
          }} />
        </div>
      </div>

      <div style={{
        textAlign: "center", fontSize: 14, color: pitchState.active ? statusColor : T.textMuted,
        fontFamily: T.sans, fontWeight: 700, minHeight: 20, transition: "color 0.3s"
      }}>
        {pitchState.active ? `${cents > 0 ? '+' : ''}${cents} ¢` : ''}
      </div>

      {/* Reference Feedback (if applicable) */}
      {pitchState.closestRef && pitchState.active && (
        <div style={{
          marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 13, fontFamily: T.sans
        }}>
          <span style={{ color: T.textMuted }}>Target: <span style={{ color: T.textDark, fontWeight: 700 }}>{pitchState.closestRef}</span></span>
          <span style={{ color: statusColor, fontWeight: 600 }}>{pitchState.refFeedback}</span>
        </div>
      )}

      {/* Pitch Contour Graph */}
      {pitchContour && contourData.length > 1 && (() => {
        const W = 300, H = 80, PAD = 4;
        const midiVals = contourData.map(p => p.midi);
        const minM = Math.min(...midiVals) - 2;
        const maxM = Math.max(...midiVals) + 2;
        const rangeM = maxM - minM || 1;
        const now = Date.now();
        const points = contourData.map(p => {
          const x = PAD + ((p.t - (now - 10000)) / 10000) * (W - PAD * 2);
          const y = H - PAD - ((p.midi - minM) / rangeM) * (H - PAD * 2);
          return `${x},${y}`;
        }).join(" ");

        // Reference pitch lines
        const refNotesObj = [
          { n: "C", m: 0 }, { n: "C#", m: 1 }, { n: "D", m: 2 }, { n: "E♭", m: 3 }, { n: "E", m: 4 }, { n: "F", m: 5 },
          { n: "F#", m: 6 }, { n: "G", m: 7 }, { n: "A♭", m: 8 }, { n: "A", m: 9 }, { n: "B♭", m: 10 }, { n: "B", m: 11 }
        ];
        const refLines = referencePitches.map(ref => {
          const match = ref.match(/([A-G][b♭#]?)([0-9])/);
          if (!match) return null;
          const pClass = match[1].replace('b', '♭');
          const oct = parseInt(match[2]);
          const pobj = refNotesObj.find(x => x.n === pClass);
          if (!pobj) return null;
          const rMidi = (oct + 1) * 12 + pobj.m;
          if (rMidi < minM || rMidi > maxM) return null;
          const y = H - PAD - ((rMidi - minM) / rangeM) * (H - PAD * 2);
          return { y, label: ref };
        }).filter(Boolean);

        return (
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 6 }}>Pitch Contour (10s)</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 80, background: T.bgSoft, borderRadius: 4, border: `1px solid ${T.border}` }}>
              {refLines.map((rl, i) => (
                <g key={i}>
                  <line x1={PAD} y1={rl.y} x2={W - PAD} y2={rl.y} stroke={T.gold + "60"} strokeWidth="0.5" strokeDasharray="4,3" />
                  <text x={W - PAD - 2} y={rl.y - 3} textAnchor="end" fontSize="7" fill={T.gold} fontFamily={T.sans}>{rl.label}</text>
                </g>
              ))}
              <polyline points={points} fill="none" stroke={statusColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
    notes: ["A", "C", "D", "E", "G"]
  },
  "am-blues": {
    name: "Am Blues",
    notes: ["A", "C", "D", "E♭", "E", "G"]
  },
  "g-mixolydian": {
    name: "G Mixolydian",
    notes: ["G", "A", "B", "C", "D", "E", "F"]
  },
  "a-sus-pentatonic": {
    name: "A Sus Pentatonic",
    notes: ["A", "B", "D", "E", "G"]
  },
  "a-phrygian": {
    name: "A Phrygian",
    notes: ["A", "B♭", "C", "D", "E", "F", "G"]
  },
  "a-phrygian-dominant": {
    name: "A Phrygian Dominant",
    notes: ["A", "B♭", "C#", "D", "E", "F", "G"]
  },
  "a-dorian": {
    name: "A Dorian",
    notes: ["A", "B", "C", "D", "E", "F#", "G"]
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

const POSITION_RANGES = {
  1: [5, 8],
  2: [7, 10],
  3: [9, 12],
  4: [12, 15],
  5: [0, 3],
};

const FRET_MARKERS = [3, 5, 7, 9, 12, 15];

function midiToNote(midi) {
  const noteName = CHROMATIC[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { noteName, octave, full: `${noteName}${octave}` };
}

export function FretboardDiagram({ theme: T, scale, position, highlight = [] }) {
  const scaleData = SCALES[scale] || SCALES["am-pentatonic"];
  const [lo, hi] = POSITION_RANGES[position] || POSITION_RANGES[1];

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
        const isRoot = noteName === 'A';
        const isHighlighted = highlight.some(h => {
          // Normalize the highlight note for comparison
          const hNorm = h.replace('b', '♭');
          return hNorm === full;
        });
        dots.push({ stringIdx, fret, noteName, full, midi, isRoot, isHighlighted });
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
        marginBottom: 12, fontFamily: T.sans
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: T.textDark }}>
          {scaleData.name}
        </span>
        <span style={{ fontSize: 12, color: T.textMed }}>
          Position {position} (frets {lo}–{hi})
        </span>
      </div>

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', minHeight: 160, maxWidth: '100%', display: 'block' }}
      >
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

        {/* Fret lines (vertical) */}
        {Array.from({ length: totalFrets + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1={leftPad + i * fretSpacing}
            y1={topPad - 4}
            x2={leftPad + i * fretSpacing}
            y2={topPad + (numStrings - 1) * stringSpacing + 4}
            stroke={i === 0 ? T.textDark : T.border}
            strokeWidth={i === 0 ? 3 : 1}
          />
        ))}

        {/* Fret numbers along the top */}
        {Array.from({ length: totalFrets }, (_, i) => (
          <text
            key={`fnum-${i}`}
            x={fretX(i)}
            y={topPad - 14}
            textAnchor="middle"
            fontSize={10}
            fontFamily={T.sans}
            fill={i >= lo && i <= hi ? T.textDark : T.textLight}
            fontWeight={i >= lo && i <= hi ? 700 : 400}
          >
            {i}
          </text>
        ))}

        {/* String lines (horizontal) */}
        {STRING_MIDI.map((s, idx) => (
          <line
            key={`str-${idx}`}
            x1={leftPad}
            y1={stringY(idx)}
            x2={leftPad + totalFrets * fretSpacing}
            y2={stringY(idx)}
            stroke={T.textLight}
            strokeWidth={stringWidths[idx]}
            opacity={0.7}
          />
        ))}

        {/* Fret markers (dots at frets 3,5,7,9,12,15) */}
        {FRET_MARKERS.map(f => (
          <React.Fragment key={`marker-${f}`}>
            {f === 12 ? (
              <>
                <circle cx={fretX(f)} cy={topPad + 1.5 * stringSpacing} r={3} fill={T.textLight} opacity={0.3} />
                <circle cx={fretX(f)} cy={topPad + 3.5 * stringSpacing} r={3} fill={T.textLight} opacity={0.3} />
              </>
            ) : (
              <circle cx={fretX(f)} cy={topPad + 2.5 * stringSpacing} r={3} fill={T.textLight} opacity={0.3} />
            )}
          </React.Fragment>
        ))}

        {/* Scale note dots */}
        {dots.map((d, i) => {
          const cx = fretX(d.fret);
          const cy = stringY(d.stringIdx);
          let fill = T.textMed;
          if (d.isHighlighted) fill = T.coral;
          else if (d.isRoot) fill = T.gold;

          return (
            <g
              key={`dot-${i}`}
              style={{ cursor: 'pointer' }}
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
                {d.noteName}
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

      {/* Horizontal Bar */}
      <div style={{
        width: '100%', height: inline ? 16 : 24,
        background: T.border, borderRadius: T.radius,
        overflow: 'hidden', marginBottom: 12
      }}>
        <div style={{
          width: `${barWidth}%`, height: '100%',
          background: barColor, borderRadius: T.radius,
          transition: 'width 0.05s linear, background-color 0.15s ease'
        }} />
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
