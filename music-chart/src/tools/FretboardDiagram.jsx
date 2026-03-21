import React, { useState } from 'react';
import * as Tone from 'tone';
import { T } from '../theme.js';

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

export default function FretboardDiagram({ theme: T, scale, position, highlight = [] }) {
  const [selectedPos, setSelectedPos] = useState(position || 1);
  const [viewMode, setViewMode] = useState("notes"); // 'notes' or 'intervals'
  const [fullNeck, setFullNeck] = useState(false);
  const scaleData = SCALES[scale] || SCALES["am-pentatonic"];
  const positionsConfig = scaleData.positions || { 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [12, 15], 5: [0, 3] };
  const [lo, hi] = fullNeck ? [0, 15] : (positionsConfig[selectedPos] || positionsConfig[1]);

  // In full neck mode, render everything; otherwise expand by 1 fret for dot rendering
  const renderLo = fullNeck ? 0 : Math.max(0, lo - 1);
  const renderHi = fullNeck ? 15 : Math.min(15, hi + 1);

  const totalFrets = 16; // 0-15
  const numStrings = 6;

  // SVG layout constants
  const leftPad = 36;
  const rightPad = 16;
  const topPad = 28;
  const bottomPad = 28;
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
            {fullNeck ? "Full Neck \u00B7 All Frets" : `Pos ${selectedPos} \u00B7 Frets ${lo}\u2013${hi}`}
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
              onClick={() => { setSelectedPos(p); setFullNeck(false); }}
              style={{
                background: !fullNeck && selectedPos === p ? T.gold : "transparent",
                color: !fullNeck && selectedPos === p ? "#fff" : T.textMed,
                border: `1px solid ${!fullNeck && selectedPos === p ? T.gold : T.borderSoft}`,
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
          <button
            onClick={() => setFullNeck(!fullNeck)}
            style={{
              background: fullNeck ? T.gold : "transparent",
              color: fullNeck ? "#fff" : T.textMed,
              border: `1px solid ${fullNeck ? T.gold : T.borderSoft}`,
              height: 28, borderRadius: T.radius, padding: "0 10px",
              fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              textTransform: "uppercase", letterSpacing: 1,
              transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.92)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
            onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Full
          </button>
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
        {/* Position highlight rectangle (hidden in full-neck mode) */}
        {!fullNeck && <rect
          x={leftPad + lo * fretSpacing}
          y={topPad - 12}
          width={(hi - lo + 1) * fretSpacing}
          height={(numStrings - 1) * stringSpacing + 24}
          rx={6}
          fill={T.gold}
          opacity={0.08}
        />}

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
            fill={fullNeck ? T.textDark : (i >= lo && i <= hi ? T.textDark : T.textLight)}
            fontWeight={fullNeck ? 600 : (i >= lo && i <= hi ? 700 : 500)}
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

        {/* Side dots below the fretboard (like a real guitar neck edge) */}
        {[3, 5, 7, 9, 15].map(f => (
          <circle
            key={`side-dot-${f}`}
            cx={fretX(f)}
            cy={topPad + (numStrings - 1) * stringSpacing + 14}
            r={3}
            fill={T.textLight}
            opacity={0.5}
          />
        ))}
        {/* Double dot at fret 12 (octave) */}
        <circle cx={fretX(12) - 7} cy={topPad + (numStrings - 1) * stringSpacing + 14} r={3} fill={T.textLight} opacity={0.5} />
        <circle cx={fretX(12) + 7} cy={topPad + (numStrings - 1) * stringSpacing + 14} r={3} fill={T.textLight} opacity={0.5} />

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
