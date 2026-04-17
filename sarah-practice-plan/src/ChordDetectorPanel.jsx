import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ArrowLeft, Mic, MicOff, ChevronRight, ChevronDown } from 'lucide-react';
import { COLOR_MUSIC, getColorForNote, normalizeNote, FretboardDiagram, CHORD_VOICINGS_MULTI } from './JungleTools.jsx';
import { subscribeToChord, startEngine, stopEngine, isEngineRunning } from './chordDetectorEngine.js';

// ─── Music helpers ──────────────────────────────────────────────────────────
const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// Per-position string base note for the fret string (position 0 = low E string at top of diagram conceptually,
// but voicing strings are read low-to-high here: pos 0 → low E, pos 5 → high E).
const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];
const PC_INDEX = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };

function pcAdd(root, semitones) {
  const idx = PC_INDEX[root];
  if (idx === undefined) return root;
  return CHROMATIC_SHARP[(idx + semitones + 144) % 12];
}

function fretToNote(stringIdx, fret) {
  if (fret < 0) return null;
  const base = STANDARD_TUNING[stringIdx];
  return pcAdd(base, fret);
}

// Parse a 6-char fret string. 'x'/'X' = muted (-1), 0-9 = fret, a-f = 10-15 (hex-style).
function parseFretString(frets) {
  if (!frets || typeof frets !== 'string') return [-1, -1, -1, -1, -1, -1];
  const out = [];
  for (let i = 0; i < 6; i++) {
    const c = (frets[i] || 'x').toLowerCase();
    if (c === 'x' || c === '-') { out.push(-1); continue; }
    const n = parseInt(c, 16);
    out.push(isNaN(n) ? -1 : n);
  }
  return out;
}

// Quality buckets for downstream display + suggestion.
const MAJOR_QUALITIES = new Set(['maj', '7', 'maj7', 'maj7no5', '7no5', '6', 'add9', '9', 'maj9', '9no5', 'maj9no5', '6/9', 'sus2', 'sus4', '7sus4']);
const MINOR_QUALITIES = new Set(['min', 'm7', 'mMaj7', 'mMaj7no5', 'm7no5', 'm6', 'mAdd9', 'm9', 'm9no5', 'm7b5']);
const DIM_QUALITIES = new Set(['dim', 'dim7']);
const AUG_QUALITIES = new Set(['aug', '7#5', '7b5']);

function qualityBucket(quality) {
  if (MINOR_QUALITIES.has(quality)) return 'min';
  if (DIM_QUALITIES.has(quality)) return 'dim';
  if (AUG_QUALITIES.has(quality)) return 'aug';
  return 'maj';
}

// Triad intervals from root, used for the NOTES chip row.
const QUALITY_INTERVALS = {
  maj: [0, 4, 7], min: [0, 3, 7], sus2: [0, 2, 7], sus4: [0, 5, 7], dim: [0, 3, 6], aug: [0, 4, 8],
  '5': [0, 7],
  '7': [0, 4, 7, 10], m7: [0, 3, 7, 10], maj7: [0, 4, 7, 11], mMaj7: [0, 3, 7, 11],
  maj7no5: [0, 4, 11], '7no5': [0, 4, 10], m7no5: [0, 3, 10], mMaj7no5: [0, 3, 11],
  '7b5': [0, 4, 6, 10], '7#5': [0, 4, 8, 10],
  '6': [0, 4, 7, 9], m6: [0, 3, 7, 9], '6/9': [0, 4, 7, 9, 2],
  add9: [0, 4, 7, 2], mAdd9: [0, 3, 7, 2],
  '9': [0, 4, 7, 10, 2], m9: [0, 3, 7, 10, 2], maj9: [0, 4, 7, 11, 2],
  '9no5': [0, 4, 10, 2], m9no5: [0, 3, 10, 2], maj9no5: [0, 4, 11, 2],
  m7b5: [0, 3, 6, 10], dim7: [0, 3, 6, 9], '7sus4': [0, 5, 7, 10],
};

function chordNotes(root, quality) {
  const intervals = QUALITY_INTERVALS[quality] || QUALITY_INTERVALS.maj;
  return intervals.slice(0, 4).map(s => pcAdd(root, s));
}

const QUALITY_SUBTITLE = {
  maj: 'Major triad', min: 'Minor triad', sus2: 'Suspended 2nd', sus4: 'Suspended 4th', dim: 'Diminished', aug: 'Augmented',
  '5': 'Power chord',
  '7': 'Dominant 7', m7: 'Minor 7', maj7: 'Major 7', mMaj7: 'Minor-major 7',
  maj7no5: 'Major 7 (no 5)', '7no5': 'Dominant 7 (no 5)', m7no5: 'Minor 7 (no 5)', mMaj7no5: 'Minor-major 7 (no 5)',
  '7b5': 'Dominant 7 ♭5', '7#5': 'Dominant 7 ♯5',
  '6': 'Major 6', m6: 'Minor 6', '6/9': '6/9',
  add9: 'add9', mAdd9: 'Minor add9',
  '9': 'Dominant 9', m9: 'Minor 9', maj9: 'Major 9',
  '9no5': '9 (no 5)', m9no5: 'm9 (no 5)', maj9no5: 'Maj9 (no 5)',
  m7b5: 'Half-diminished', dim7: 'Diminished 7', '7sus4': '7sus4',
};

// Display name: the engine returns short names like 'G' / 'Gm' / 'G7'. For majors, render as 'G' but with a soft 'maj' suffix in the hero.
function displaySuffix(quality) {
  if (quality === 'maj') return 'maj';
  if (quality === 'min') return 'm';
  if (quality === '5') return '5';
  if (quality === 'maj7' || quality === 'maj7no5') return 'maj7';
  if (quality === '7' || quality === '7no5') return '7';
  if (quality === 'm7' || quality === 'm7no5') return 'm7';
  if (quality === 'mMaj7' || quality === 'mMaj7no5') return 'mMaj7';
  if (quality === 'sus2') return 'sus2';
  if (quality === 'sus4') return 'sus4';
  if (quality === 'dim') return 'dim';
  if (quality === 'aug') return 'aug';
  if (quality === '6') return '6';
  if (quality === 'm6') return 'm6';
  if (quality === '6/9') return '6/9';
  if (quality === 'add9') return 'add9';
  if (quality === 'mAdd9') return 'm(add9)';
  if (quality === '9' || quality === '9no5') return '9';
  if (quality === 'm9' || quality === 'm9no5') return 'm9';
  if (quality === 'maj9' || quality === 'maj9no5') return 'maj9';
  if (quality === 'm7b5') return 'm7♭5';
  if (quality === 'dim7') return 'dim7';
  if (quality === '7sus4') return '7sus4';
  return '';
}

// Diatonic suggestions: 4 follow-up chords with role labels.
function suggestNext(root, quality) {
  const bucket = qualityBucket(quality);
  if (bucket === 'min') {
    // Natural minor: i ii° III iv v VI VII. Show iv, v, VI, III.
    return [
      { name: pcAdd(root, 5) + 'm', role: 'iv' },
      { name: pcAdd(root, 7) + 'm', role: 'v' },
      { name: pcAdd(root, 8), role: 'VI' },
      { name: pcAdd(root, 3), role: 'III' },
    ];
  }
  // Major bucket (incl. 7ths, sus, etc.) — show IV, V, vi, ii of the major key with this root as I.
  return [
    { name: pcAdd(root, 5), role: 'IV' },
    { name: pcAdd(root, 7), role: 'V' },
    { name: pcAdd(root, 9) + 'm', role: 'vi' },
    { name: pcAdd(root, 2) + 'm', role: 'ii' },
  ];
}

// Function-of analysis for the FUNCTION accordion row.
function functionRoles(root, quality) {
  const bucket = qualityBucket(quality);
  const display = root + (bucket === 'min' ? 'm' : '');
  // V of (root - 5 semitones), I of root, IV of (root - 5 semitones from V perspective)
  if (bucket === 'min') {
    return [
      `i of ${display}`,
      `iv of ${pcAdd(root, 7)}m`,
      `vi of ${pcAdd(root, 3)}`,
    ];
  }
  return [
    `V of ${pcAdd(root, 5)}`,
    `I of ${root}`,
    `IV of ${pcAdd(root, 7)}`,
  ];
}

// Voicing lookup: try the engine name first, then the bucket-based fallback.
function lookupVoicings(name, root, quality) {
  if (CHORD_VOICINGS_MULTI[name]) return CHORD_VOICINGS_MULTI[name];
  // Try simpler forms
  const bucket = qualityBucket(quality);
  const simple = root + (bucket === 'min' ? 'm' : '');
  if (CHORD_VOICINGS_MULTI[simple]) return CHORD_VOICINGS_MULTI[simple];
  if (CHORD_VOICINGS_MULTI[root]) return CHORD_VOICINGS_MULTI[root];
  return [];
}

// ─── Color-coded chord box ──────────────────────────────────────────────────
// Renders a single chord voicing. Each fingered-position dot is colored by the
// note that position produces (using getColorForNote). Open and muted strings
// shown above the nut.
function ColoredChordBox({ T, frets, size = 'large', highlight = false }) {
  if (!frets) return null;
  const f = parseFretString(frets);
  const playable = f.filter(v => v > 0);
  const minFret = playable.length ? Math.min(...playable) : 1;
  const maxFret = playable.length ? Math.max(...playable) : 1;
  const startFret = maxFret <= 4 ? 1 : minFret;
  const numFrets = 4;

  // Layout knobs
  const SIZE = size === 'large'
    ? { strGap: 32, fretGap: 40, padX: 20, padTop: 40, dotR: 12, fontDot: 12, fontMark: 12, strokeStr: 1.5, strokeNut: 4 }
    : { strGap: 22, fretGap: 18, padX: 10, padTop: 20, dotR: 7, fontDot: 8, fontMark: 9, strokeStr: 1, strokeNut: 3 };

  const w = SIZE.padX * 2 + SIZE.strGap * 5;
  const h = SIZE.padTop + SIZE.fretGap * numFrets + 4;

  // String index in the frets string (0..5) maps left-to-right to STANDARD_TUNING low E → high E
  // i.e. visual left = 6th string (low E)
  const strX = (i) => SIZE.padX + i * SIZE.strGap;
  const fretY = (fretNum) => SIZE.padTop + (fretNum - startFret + 0.5) * SIZE.fretGap;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {/* Strings */}
      {STANDARD_TUNING.map((_, i) => (
        <line key={`s${i}`} x1={strX(i)} y1={SIZE.padTop} x2={strX(i)} y2={SIZE.padTop + numFrets * SIZE.fretGap} stroke={T.textDark} strokeWidth={SIZE.strokeStr} opacity={0.85} />
      ))}
      {/* Frets */}
      {Array.from({ length: numFrets }, (_, i) => (
        <line key={`f${i}`} x1={SIZE.padX} y1={SIZE.padTop + (i + 1) * SIZE.fretGap} x2={SIZE.padX + 5 * SIZE.strGap} y2={SIZE.padTop + (i + 1) * SIZE.fretGap} stroke={T.textLight} strokeWidth={1} />
      ))}
      {/* Nut (only at fret 1) */}
      {startFret === 1 && (
        <line x1={SIZE.padX - 1} y1={SIZE.padTop} x2={SIZE.padX + 5 * SIZE.strGap + 1} y2={SIZE.padTop} stroke={T.textDark} strokeWidth={SIZE.strokeNut} />
      )}
      {/* Start fret label */}
      {startFret > 1 && (
        <text x={SIZE.padX - 8} y={fretY(startFret)} textAnchor="end" fontSize={SIZE.fontMark} fill={T.textMed} fontFamily={T.sans}>{startFret}</text>
      )}
      {/* Open / muted markers above nut */}
      {f.map((fretNum, i) => {
        const x = strX(i);
        const y = SIZE.padTop - (size === 'large' ? 16 : 10);
        if (fretNum === -1) {
          return <text key={`m${i}`} x={x} y={y + 2} textAnchor="middle" fontSize={SIZE.fontMark} fill={T.textMuted} fontFamily={T.sans}>×</text>;
        }
        if (fretNum === 0) {
          const note = fretToNote(i, 0);
          const c = getColorForNote(note);
          return <circle key={`o${i}`} cx={x} cy={y} r={size === 'large' ? 5 : 3.5} fill="none" stroke={c} strokeWidth={1.5} />;
        }
        return null;
      })}
      {/* Fingered positions — color-coded dots */}
      {f.map((fretNum, i) => {
        if (fretNum <= 0) return null;
        const x = strX(i);
        const y = fretY(fretNum);
        const note = fretToNote(i, fretNum);
        const color = getColorForNote(note);
        return (
          <g key={`d${i}`}>
            <circle cx={x} cy={y} r={SIZE.dotR} fill={color} stroke={highlight ? T.gold : 'none'} strokeWidth={highlight ? 2 : 0} />
            <text x={x} y={y + (size === 'large' ? 4 : 3)} textAnchor="middle" fontSize={SIZE.fontDot} fill="#fff" fontFamily={T.sans} fontWeight={700}>{note}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Voicing dot indicator (●○○ style) ──────────────────────────────────────
function VoicingDots({ T, count, active }) {
  if (count <= 1) return null;
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: i === active ? T.textDark : 'transparent',
          border: `1px solid ${i === active ? T.textDark : T.textLight}`,
        }} />
      ))}
    </span>
  );
}

// ─── Suggested-next mini card with cycling voicing ──────────────────────────
function SuggestedCard({ T, name, role }) {
  const voicings = useMemo(() => CHORD_VOICINGS_MULTI[name] || [], [name]);
  const [idx, setIdx] = useState(0);
  const active = voicings[idx] || null;
  const root = name.replace(/m$|maj7$|m7$|7$|sus.*$|dim.*$|aug$/, '') || name[0];
  const tintColor = getColorForNote(root);
  return (
    <button
      onClick={() => voicings.length > 1 && setIdx((idx + 1) % voicings.length)}
      style={{
        background: T.bgCard, border: `1px solid ${T.gold}40`, borderRadius: 4,
        padding: 12, height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        cursor: voicings.length > 1 ? 'pointer' : 'default', textAlign: 'left', width: '100%', minWidth: 0,
        boxShadow: '0 1px 2px rgba(44,40,37,0.04)',
      }}
      aria-label={`${name} chord (${role})${voicings.length > 1 ? ` — tap to cycle ${voicings.length} voicings` : ''}`}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: T.serif, fontSize: 26, color: tintColor, lineHeight: 1, fontWeight: 600 }}>{name}</span>
        <span style={{ fontFamily: T.sans, fontSize: 10, textTransform: 'uppercase', color: T.textMed, letterSpacing: 0.5 }}>{role}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {active ? <ColoredChordBox T={T} frets={active.frets} size="small" /> : <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMuted }}>no voicing</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: T.sans, fontSize: 10, color: T.textMed }}>
        <span style={{ fontStyle: 'italic' }}>{active?.pos ? `${active.pos} pos.` : (active?.name || '\u00a0')}</span>
        <VoicingDots T={T} count={voicings.length} active={idx} />
      </div>
    </button>
  );
}

// ─── Accordion row ──────────────────────────────────────────────────────────
function AccordionRow({ T, label, summary, expanded, onToggle, children }) {
  return (
    <div style={{ background: T.bgCard, border: `1px solid ${T.gold}30`, borderRadius: 2, marginBottom: 8 }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          color: T.textDark, fontFamily: T.sans,
        }}
        aria-expanded={expanded}
      >
        <span style={{ color: T.goldDark, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>{label}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: T.textMed, fontSize: 14 }}>
          <span style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{summary}</span>
          {expanded ? <ChevronDown size={16} color={T.goldDark} /> : <ChevronRight size={16} color={T.goldDark} />}
        </span>
      </button>
      {expanded && (
        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${T.borderSoft}` }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Mini circle-of-fifths wheel with halo on detected root ─────────────────
const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
function ChordWheel({ T, root }) {
  const size = 200;
  const cx = size / 2, cy = size / 2;
  const rOuter = 88, rInner = 62;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '12px auto' }}>
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={T.gold + '40'} strokeWidth={1} />
      {CIRCLE_OF_FIFTHS.map((note, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const px = cx + Math.cos(angle) * (rOuter - 14);
        const py = cy + Math.sin(angle) * (rOuter - 14);
        const isActive = normalizeNote(note) === normalizeNote(root || '');
        const color = getColorForNote(note);
        return (
          <g key={note}>
            {isActive && (
              <circle cx={px} cy={py} r={16} fill={color} opacity={0.18} />
            )}
            <circle cx={px} cy={py} r={isActive ? 11 : 8} fill={isActive ? color : T.bgCard} stroke={color} strokeWidth={isActive ? 0 : 1.5} />
            <text x={px} y={py + 4} textAnchor="middle" fontSize={11} fontFamily={T.sans} fontWeight={700} fill={isActive ? '#fff' : T.textDark}>{note}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={rInner - 4} fill={T.bgSoft} stroke={T.borderSoft} strokeWidth={1} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily={T.serif} fontSize={20} fill={T.textDark}>{root || '—'}</text>
    </svg>
  );
}

// ─── Sticky bottom bar (signal meter + LISTENING button + latency) ──────────
function StickyBottomBar({ T, listening, signalLevel, signalDb, onToggle, error }) {
  const meterPct = Math.max(0, Math.min(100, signalLevel * 100));
  const dbLabel = signalDb && isFinite(signalDb) ? `${Math.round(signalDb)} dB` : '— dB';
  const status = error ? `⚠ ${String(error).slice(0, 40)}` : (listening ? 'LISTENING' : 'TAP TO LISTEN');
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 10, width: '100%',
      background: T.bgCard, borderTop: `1px solid ${T.gold}50`,
      padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 -4px 12px rgba(212,163,115,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, background: T.goldSoft, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${meterPct}%`, background: T.gold, transition: 'width 80ms linear' }} />
        </div>
        <span style={{ fontFamily: T.sans, fontSize: 10, color: T.textMed, whiteSpace: 'nowrap', minWidth: 42, textAlign: 'right' }}>{dbLabel}</span>
      </div>
      <button
        onClick={onToggle}
        style={{
          width: '100%', minHeight: 56, background: listening ? T.gold : T.bgCard,
          color: listening ? '#fff' : T.goldDark, border: `2px solid ${T.gold}`,
          borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          fontFamily: T.sans, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5,
          cursor: 'pointer', boxShadow: listening ? T.md : T.sm,
        }}
        aria-pressed={listening}
      >
        {listening ? <Mic size={18} /> : <MicOff size={18} />}
        {status}
      </button>
      {!error && <div style={{ textAlign: 'center', fontFamily: T.sans, fontSize: 9, color: T.textLight, textTransform: 'uppercase', letterSpacing: 1 }}>~300 ms latency · standard tuning</div>}
    </div>
  );
}

// ─── Hook: window-width awareness for desktop two-column layout ─────────────
function useIsWideViewport(breakpoint = 768) {
  const [isWide, setIsWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= breakpoint);
  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isWide;
}

// ─── Auto-tick state machine for CHORDS TO PLAY chip row ────────────────────
// Per-chord states: pending → confirmed (sustained ≥600ms continuous at ≥0.7 confidence).
// Once confirmed, sticks. Resets only when caller clears.
const CONFIRM_MS = 600;
const CONFIRM_CONF = 0.7;
function useChordChecklist(targetChords, currentChord) {
  const [confirmed, setConfirmed] = useState({});
  const sustainStartRef = useRef({});

  useEffect(() => {
    if (!targetChords || targetChords.length === 0) return;
    if (!currentChord || !currentChord.name) return;
    if (currentChord.confidence < CONFIRM_CONF) return;
    const matchKey = targetChords.find(t => matchesChord(t, currentChord));
    if (!matchKey) {
      // Different chord — reset sustain timers for unconfirmed targets
      sustainStartRef.current = {};
      return;
    }
    if (confirmed[matchKey]) return;
    const now = performance.now();
    if (!sustainStartRef.current[matchKey]) {
      sustainStartRef.current[matchKey] = now;
    } else if (now - sustainStartRef.current[matchKey] >= CONFIRM_MS) {
      // Time-driven transition: candidate → confirmed when sustained ≥600ms.
      // Guarded by the confirmed[matchKey] check above so this fires exactly once per target.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmed(prev => ({ ...prev, [matchKey]: true }));
    }
  }, [currentChord, targetChords, confirmed]);

  const reset = useCallback(() => {
    setConfirmed({});
    sustainStartRef.current = {};
  }, []);
  return { confirmed, reset };
}

// Returns true if a target chord (e.g. "G", "Am", "C7") matches the detected chord name.
function matchesChord(target, chord) {
  if (!chord || !chord.name) return false;
  if (target === chord.name) return true;
  // Engine returns plain root for major (e.g. "G"); accept the same target form
  // For minor: target "Am" matches name "Am"
  // For 7ths: target "G7" matches name "G7"
  // Allow tolerance: target "G" also matches "Gmaj7", "G7", "G6" (same root, major bucket)
  // and target "Am" matches "Am7", "Am9" (same root, minor bucket)
  const targetRoot = target.match(/^[A-G][#b]?/)?.[0];
  if (!targetRoot || targetRoot !== chord.root) return false;
  const targetIsMinor = /^[A-G][#b]?m(?!aj)/.test(target);
  const targetIsExplicit = /\d|sus|dim|aug|maj/.test(target);
  if (targetIsExplicit) return false; // explicit 7/9/sus must match exactly
  const chordBucket = qualityBucket(chord.quality);
  // Bare-letter targets ignore dim/aug — those rare qualities show up on
  // transient noise and shouldn't credit the player. Major bucket only.
  if (chordBucket === 'dim' || chordBucket === 'aug') return false;
  if (targetIsMinor) return chordBucket === 'min';
  return chordBucket === 'maj';
}

// ─── Main panel ─────────────────────────────────────────────────────────────
export function ChordDetectorPanel({ theme: T, onBack, targetChords = null }) {
  const [engineState, setEngineState] = useState({
    isListening: false, currentChord: null, signalLevel: 0, signalDb: -Infinity,
  });
  const [error, setError] = useState(null);
  const [heroVoicingIdx, setHeroVoicingIdx] = useState(0);
  const [recent, setRecent] = useState([]);
  const lastChordNameRef = useRef(null);
  const [expanded, setExpanded] = useState({ neck: false, wheel: false, function: false, recent: false });
  const isWide = useIsWideViewport(768);

  useEffect(() => {
    const unsub = subscribeToChord((u) => {
      setEngineState(u);
      if (u.error) setError(u.error.message || String(u.error));
      else setError(null);
      // Track recent chords (dedup consecutive)
      if (u.currentChord && u.currentChord.name !== lastChordNameRef.current) {
        lastChordNameRef.current = u.currentChord.name;
        setRecent(prev => {
          const next = [u.currentChord.name, ...prev.filter(n => n !== u.currentChord.name)];
          return next.slice(0, 6);
        });
        setHeroVoicingIdx(0); // reset voicing when chord changes
      }
    });
    return unsub;
  }, []);

  const handleToggle = useCallback(async () => {
    setError(null);
    try {
      if (isEngineRunning()) await stopEngine();
      else await startEngine();
    } catch (e) {
      setError(e?.message || String(e));
    }
  }, []);

  const chord = engineState.currentChord;
  const root = chord?.root || 'G';
  const quality = chord?.quality || 'maj';
  const name = chord?.name || 'G';
  const conf = chord ? Math.round(chord.confidence * 100) : 0;
  const subtitle = QUALITY_SUBTITLE[quality] || '';
  const notes = chordNotes(root, quality);
  const voicings = useMemo(() => lookupVoicings(name, root, quality), [name, root, quality]);
  const heroVoicing = voicings[heroVoicingIdx] || voicings[0] || null;
  const suggestions = useMemo(() => suggestNext(root, quality), [root, quality]);
  const functions = useMemo(() => functionRoles(root, quality), [root, quality]);

  const checklist = useChordChecklist(targetChords, chord);

  // ── Reusable section blocks ─────────────────────────────────────────────
  const StickyTop = (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: T.bgCard, borderBottom: `1px solid ${T.gold}50`,
      minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: T.textMed,
            display: 'flex', alignItems: 'center', padding: 6, borderRadius: 4,
          }} aria-label="Back"><ArrowLeft size={18} /></button>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 600 }}>
            <span style={{ color: getColorForNote(root) }}>{root}</span>
            <span style={{ color: T.textDark }}>{displaySuffix(quality)}</span>
          </span>
          {chord && <span style={{ fontFamily: T.sans, fontSize: 13, color: T.textMed }}>{conf}%</span>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: T.sans, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, color: T.textDark }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: engineState.isListening ? '#22c55e' : T.textMuted,
          boxShadow: engineState.isListening ? '0 0 6px #22c55e' : 'none',
        }} />
        {engineState.isListening ? 'LIVE' : 'IDLE'}
      </div>
    </div>
  );

  const HeroCard = (
    <section style={{
      background: T.bgCard, border: `1px solid ${T.goldSoft}`, padding: '24px 20px',
      margin: '16px', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ color: T.goldDark, fontSize: 10, fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 1.2 }}>CURRENT CHORD</div>
      <div style={{ fontFamily: T.serif, fontSize: 88, lineHeight: 1, marginTop: 4 }}>
        <span style={{ color: getColorForNote(root) }}>{root}</span>
        <span style={{ color: T.textDark, fontSize: 56 }}>{displaySuffix(quality)}</span>
      </div>
      {subtitle && <div style={{ fontFamily: T.sans, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: T.textMed, marginTop: 8 }}>{subtitle}</div>}

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontFamily: T.sans, fontSize: 10, letterSpacing: 1, color: T.textLight, textTransform: 'uppercase' }}>NOTES</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {notes.map((n, i) => {
            const c = getColorForNote(n);
            return (
              <React.Fragment key={`${n}-${i}`}>
                {i > 0 && <span style={{ color: T.textLight, fontSize: 12 }}>·</span>}
                <span style={{
                  minWidth: 32, height: 28, borderRadius: 999, border: `1px solid ${c}`, color: c,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: T.sans, fontSize: 13, padding: '0 8px', fontWeight: 600,
                }}>{n}</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', minHeight: 240 }}>
        {heroVoicing ? (
          <ColoredChordBox T={T} frets={heroVoicing.frets} size="large" highlight={engineState.isListening} />
        ) : (
          <div style={{
            width: 200, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.textMuted, fontFamily: T.sans, fontSize: 12, textAlign: 'center', padding: 16,
          }}>
            {chord ? `No fingering chart for ${name} yet` : 'Press LISTEN below and play a chord to see its fingering here.'}
          </div>
        )}
      </div>

      {voicings.length > 0 && (
        <>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textDark, marginTop: 16 }}>
            {heroVoicing?.pos ? `${heroVoicing.pos} position` : (heroVoicing?.name || name)}
          </div>
          <button
            onClick={() => setHeroVoicingIdx((heroVoicingIdx + 1) % voicings.length)}
            disabled={voicings.length <= 1}
            style={{
              marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
              cursor: voicings.length > 1 ? 'pointer' : 'default', color: T.textLight,
              fontFamily: T.sans, fontSize: 11,
            }}
          >
            <VoicingDots T={T} count={voicings.length} active={heroVoicingIdx} />
            <span>{heroVoicingIdx + 1} of {voicings.length} voicing{voicings.length !== 1 ? 's' : ''}{voicings.length > 1 ? ' · tap to cycle' : ''}</span>
          </button>
        </>
      )}
    </section>
  );

  const SuggestedGrid = (
    <section style={{ padding: '0 16px', marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ color: T.goldDark, textTransform: 'uppercase', fontFamily: T.sans, fontSize: 10, letterSpacing: 1.2, fontWeight: 700, margin: 0 }}>SUGGESTED NEXT</h2>
        <span style={{ color: T.textLight, fontSize: 11, fontFamily: T.sans, fontStyle: 'italic' }}>tap to cycle voicings</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {suggestions.map(s => <SuggestedCard key={s.name + s.role} T={T} name={s.name} role={s.role} />)}
      </div>
    </section>
  );

  const Accordion = (
    <section style={{ padding: '0 16px', marginTop: 24 }}>
      <AccordionRow T={T} label="ON THE NECK" summary={notes.slice(0, 3).join(' · ') + ' lit'} expanded={expanded.neck} onToggle={() => setExpanded(s => ({ ...s, neck: !s.neck }))}>
        <div style={{ paddingTop: 12 }}>
          <FretboardDiagram theme={T} chordToneNotes={notes} oneNoteFilter={null} colorMode={true} instrument="guitar" />
        </div>
      </AccordionRow>
      <AccordionRow T={T} label="WHEEL" summary={`${root}${displaySuffix(quality)}`} expanded={expanded.wheel} onToggle={() => setExpanded(s => ({ ...s, wheel: !s.wheel }))}>
        <ChordWheel T={T} root={root} />
      </AccordionRow>
      <AccordionRow T={T} label="FUNCTION" summary={functions.join(' · ')} expanded={expanded.function} onToggle={() => setExpanded(s => ({ ...s, function: !s.function }))}>
        <div style={{ padding: '12px 0', fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.7 }}>
          {functions.map(f => <div key={f}>{f}</div>)}
          <div style={{ marginTop: 8, fontStyle: 'italic', color: T.textLight, fontSize: 11 }}>
            How {name} sits in nearby keys.
          </div>
        </div>
      </AccordionRow>
      <AccordionRow T={T} label="RECENT" summary={recent.length ? '...' + recent.slice(0, 4).reverse().join(' → ') : '—'} expanded={expanded.recent} onToggle={() => setExpanded(s => ({ ...s, recent: !s.recent }))}>
        <div style={{ padding: '12px 0', fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textMed }}>
          {recent.length === 0 ? 'No chords detected yet.' : recent.map((n, i) => (
            <span key={`${n}-${i}`}>
              {i > 0 && <span style={{ color: T.textLight }}> ← </span>}
              <span style={{ color: getColorForNote(n[0]) }}>{n}</span>
            </span>
          ))}
        </div>
      </AccordionRow>
    </section>
  );

  const ChipsRow = targetChords && targetChords.length > 0 && (
    <section style={{ padding: '0 16px', marginTop: 24, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{ color: T.goldDark, textTransform: 'uppercase', fontFamily: T.sans, fontSize: 10, letterSpacing: 1.2, fontWeight: 700, margin: 0 }}>CHORDS TO PLAY</h2>
        {Object.keys(checklist.confirmed).length > 0 && (
          <button onClick={checklist.reset} style={{
            background: 'none', border: `1px solid ${T.borderSoft}`, padding: '4px 10px', borderRadius: 12,
            fontFamily: T.sans, fontSize: 10, color: T.textMed, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5,
          }}>reset</button>
        )}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {targetChords.map(t => {
          const isOk = !!checklist.confirmed[t];
          const tintColor = getColorForNote(t.match(/^[A-G][#b]?/)?.[0] || 'C');
          return (
            <div key={t} style={{
              minWidth: 100, height: 60, background: isOk ? T.gold : T.bgCard,
              border: `1.5px solid ${T.gold}`, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, boxShadow: T.sm,
            }}>
              <span style={{ fontFamily: T.serif, fontSize: 22, color: isOk ? '#fff' : tintColor, fontWeight: 600 }}>{t}</span>
              {isOk ? (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <span style={{ width: 14, height: 14, borderRadius: '50%', border: `1.5px solid ${T.gold}` }} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );

  const StickyBottom = (
    <StickyBottomBar
      T={T}
      listening={engineState.isListening}
      signalLevel={engineState.signalLevel || 0}
      signalDb={engineState.signalDb}
      onToggle={handleToggle}
      error={error}
    />
  );

  // ── Layout: mobile = single column, desktop = two-column over a max-width ─
  if (isWide) {
    return (
      <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {StickyTop}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 8px', flex: 1 }}>
          <div>
            {HeroCard}
            {SuggestedGrid}
            {ChipsRow}
          </div>
          <div>
            <div style={{ marginTop: 16 }}>{Accordion}</div>
          </div>
        </div>
        {StickyBottom}
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: 480, margin: '0 auto' }}>
      {StickyTop}
      <div style={{ flex: 1 }}>
        {HeroCard}
        {SuggestedGrid}
        {Accordion}
        {ChipsRow}
      </div>
      {StickyBottom}
    </div>
  );
}

export default ChordDetectorPanel;
