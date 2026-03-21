import React, { useState, useRef, useEffect } from 'react';
import { T } from '../theme.js';

export default function ChordTransitionTimer({ theme: T, chords = ["Am", "G"], duration = 60 }) {
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
      const entry = { chords: chords.join('\u2192'), count, date: new Date().toISOString().slice(0, 10) };
      const newHistory = [...history, entry].slice(-20);
      setHistory(newHistory);
      localStorage.setItem('chordTimerHistory', JSON.stringify(newHistory));
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const reset = () => { setIsRunning(false); setTimeLeft(duration); setCount(0); };
  const pairKey = chords.join('\u2192');
  const pairHistory = history.filter(h => h.chords === pairKey);
  const best = pairHistory.length ? Math.max(...pairHistory.map(h => h.count)) : 0;

  return (
    <div style={{ background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, marginBottom: 16, fontFamily: T.sans }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>
        Chord Transition Timer — {chords.join(' \u2192 ')}
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
        {best > 0 && <div style={{ fontSize: 12, color: T.textMed, marginTop: 4 }}>Personal best: {best} {count > best ? '\u2014 NEW RECORD!' : ''}</div>}
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
