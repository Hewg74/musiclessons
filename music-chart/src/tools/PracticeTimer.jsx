import React, { useState } from 'react';
import { T } from '../theme.js';
import { useTimer, TimerRing } from './Metronome.jsx';

function TimerInner({ mins, theme: T }) {
  const timer = useTimer(mins);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TimerRing pct={timer.pct} fmt={timer.fmt} size={160} textSize={36} />
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <button onClick={timer.toggle} style={{
          background: timer.on ? T.coral : T.gold, border: "none", color: "#fff",
          padding: "14px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
          fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase", width: 120, transition: "all 0.2s"
        }}>
          {timer.on ? "Pause" : "Start"}
        </button>
        <button onClick={timer.reset} style={{
          background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
          padding: "14px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
          fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase", width: 120, transition: "all 0.2s"
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default function PracticeTimerTool({ theme: T }) {
  const [inputMins, setInputMins] = useState(5);
  const [activeMins, setActiveMins] = useState(5);
  const [key, setKey] = useState(0);

  return (
    <div style={{ padding: "10px 0", textAlign: "center" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>Set Duration (Min)</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 5, 10, 15, 20].map(m => (
            <button key={m} onClick={() => { setActiveMins(m); setInputMins(m); setKey(k => k + 1); }} style={{
              background: inputMins === m ? T.gold : "transparent",
              border: `1px solid ${inputMins === m ? T.gold : T.borderSoft}`,
              color: inputMins === m ? "#fff" : T.textMed,
              padding: "8px 16px", borderRadius: T.radius, cursor: "pointer",
              fontFamily: T.sans, fontWeight: 600, fontSize: 13, transition: "all 0.2s"
            }}>{m}</button>
          ))}
        </div>
      </div>
      <TimerInner key={key} mins={activeMins} theme={T} />
    </div>
  );
}
