import React from 'react';
import { X } from 'lucide-react';
import { T } from '../theme.js';

// ─── ChordDiagram ───────────────────────────────────────────────────────────
export function ChordDiagram({ theme: T, frets, name, onClose }) {
  if (!frets) return null;
  const f = frets.split("").map(c => c === "x" ? -1 : c === "0" ? 0 : parseInt(c, 10));
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

export default ChordDiagram;
