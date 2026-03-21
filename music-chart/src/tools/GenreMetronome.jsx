import React, { useState, useRef, useEffect } from 'react';
import { T } from '../theme.js';

export default function GenreMetronome({ theme: T, mode = "standard", bpm = 80 }) {
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
    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
