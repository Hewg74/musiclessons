import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';

// We'll accept the theme object `T` from App.jsx via props or just hardcode some shared colors for now.
// For simplicity, we can just pass the theme object to these components.

// --- 1. Audio Player ---
export function AudioPlayer({ theme: T }) {
  const tracks = [
    { id: 'surf', name: 'Surf Rock Beat 120 BPM', src: '/surf-rock-120.mp3' },
    { id: 'groove', name: 'Groove Beat 90 BPM', src: '/groove-beat-90.mp3' },
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
export function OfflineTabs({ theme: T }) {
  const [activeTab, setActiveTab] = useState('sol');

  const solDelSurTab = `
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
Somewhere south, far away
F#                   E
Down the coast is where I'll stay
C#m                  B
Sun baked skin and salty hair
F#                   E
I don't have a single care

[Chorus]
C#m    B     F#    E
Sol del Sur
C#m    B     F#    E
Sol del Sur

[Bridge/Lead Section]
(Play the main lead riff while rhythm plays C#m B F# E)

[Verse 2]
C#m                  B
Wake up early, catch the tide
F#                   E
Ain't got nowhere to hide
C#m                  B
Living easy, living free
F#                   E
Just the ocean, you, and me

[Chorus]
C#m    B     F#    E
Sol del Sur
C#m    B     F#    E
Sol del Sur

(Play slow and precise. Accuracy over speed. Rhythm is syncopated.)
  `;

  const iltwywLyrics = `
I Like The Way You Walk - The Donkeys
Key syncopation note: The last word of each line falls BETWEEN beats.

[Verse 1]
Well I like the way you... [walk]
And I like the way you... [talk]
And I like the way you... [smile]
When you're walking down the... [aisle]

[Chorus]
'Cause I love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]

[Verse 2]
Well I like the way you... [are]
In all the things that you... [do]
You're like honey, all the bees are around... [you]
There's a house on the... [hill]
I got a room to fill, with... [you]
We'll get out on the... [road]
No more being... [alone]
Ooh...

[Chorus]
'Cause I love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]
Love you with all my... [heart]

(Nod on the metronome clicks, sing the bracketed words on the UP-nod.)
  `;

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button onClick={() => setActiveTab('sol')} style={{
          background: activeTab === 'sol' ? T.gold : T.bgCard,
          color: activeTab === 'sol' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radiusMd, cursor: 'pointer'
        }}>Sol Del Sur</button>
        <button onClick={() => setActiveTab('iltwyw')} style={{
          background: activeTab === 'iltwyw' ? T.gold : T.bgCard,
          color: activeTab === 'iltwyw' ? '#fff' : T.textMed,
          border: `1px solid ${T.border}`, padding: '8px 16px', borderRadius: T.radiusMd, cursor: 'pointer'
        }}>I Like The Way You Walk</button>
      </div>
      <pre style={{
        background: T.bgSoft, padding: 20, border: `1px solid ${T.border}`,
        borderRadius: T.radiusMd, overflowX: 'auto', fontFamily: 'monospace', fontSize: 13,
        color: T.textDark, lineHeight: 1.5
      }}>
        {activeTab === 'sol' ? solDelSurTab.trim() : iltwywLyrics.trim()}
      </pre>
    </div>
  );
}

// --- 4. Audio Recorder ---
export function AudioRecorder({ theme: T }) {
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

  return (
    <div>
      <p style={{ fontSize: 14, color: T.textMed, marginBottom: 16 }}>
        Record yourself and listen back immediately. (Saved temporarily in memory).
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {!isRecording ? (
          <button onClick={startRecording} style={{
            background: T.coral, color: '#fff', border: 'none', padding: '12px 24px',
            borderRadius: 30, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />
            REC
          </button>
        ) : (
          <button onClick={stopRecording} style={{
            background: T.textDark, color: '#fff', border: 'none', padding: '12px 24px',
            borderRadius: 30, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8,
            animation: 'pulse-ring 2s infinite'
          }}>
            <div style={{ width: 12, height: 12, background: '#fff', borderRadius: 2 }} />
            STOP
          </button>
        )}
        
        {isRecording && <span style={{ color: T.coral, fontSize: 14, fontWeight: 600 }}>Recording...</span>}
      </div>

      {audioURL && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, color: T.textLight, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Latest Take</div>
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
      <p style={{ fontSize: 14, color: T.textMed, marginBottom: 16 }}>Standard Tuning (E A D G B E)</p>
      
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {strings.map(s => (
          <button
            key={s.note}
            onClick={() => playNote(s.note)}
            style={{
              flex: '1 1 calc(33% - 10px)', minWidth: 80,
              padding: '20px 0', border: `1px solid ${activeNote === s.note ? T.gold : T.border}`,
              background: activeNote === s.note ? T.goldSoft : T.bgCard,
              color: activeNote === s.note ? T.goldDark : T.textDark,
              borderRadius: T.radiusMd, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 700, fontFamily: T.sans }}>{s.label}</span>
            <span style={{ fontSize: 12, color: T.textMuted }}>{s.string} string</span>
          </button>
        ))}
      </div>
    </div>
  );
}
