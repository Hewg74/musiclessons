import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, LivePitchDetector,
} from './JungleTools.jsx';

// ─── Hooks ───
function useIsMobile(bp = 640) {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setMobile(e.matches);
    mq.addEventListener('change', h); setMobile(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return mobile;
}

// ─── Constants ───
const CHROMATIC = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];
const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'A♭', 'E♭', 'B♭', 'F'];

const SCALE_TYPES = {
  'minor-pentatonic': { name: 'Min Pent',    intervals: [0, 3, 5, 7, 10], desc: '5 notes, zero tension. The backbone.' },
  'major-pentatonic': { name: 'Maj Pent',    intervals: [0, 2, 4, 7, 9], desc: 'Happy pentatonic. Uplifting.' },
  'blues':            { name: 'Blues',        intervals: [0, 3, 5, 6, 7, 10], desc: 'Pentatonic + blue note. Raw.' },
  'major':            { name: 'Major',        intervals: [0, 2, 4, 5, 7, 9, 11], desc: 'The foundation. Bright and resolved.' },
  'natural-minor':    { name: 'Minor',        intervals: [0, 2, 3, 5, 7, 8, 10], desc: 'Melancholy depth. The relative minor.' },
  'dorian':           { name: 'Dorian',       intervals: [0, 2, 3, 5, 7, 9, 10], desc: 'Minor with a bright 6th. Jazz, funk, soul.' },
  'mixolydian':       { name: 'Mixolydian',   intervals: [0, 2, 4, 5, 7, 9, 10], desc: 'Major with flat 7. Laid-back, bluesy.' },
  'phrygian':         { name: 'Phrygian',     intervals: [0, 1, 3, 5, 7, 8, 10], desc: 'Dark and exotic. Desert and flamenco.' },
};

const MODES = [
  { id: 'explore',      label: 'Explore' },
  { id: 'voice',        label: 'Voice' },
  { id: 'hearFind',     label: 'Hear\u2192Find' },
  { id: 'callResponse', label: 'Call\u00A0&\u00A0Resp' },
  { id: 'intervals',    label: 'Intervals' },
  { id: 'scaleRunner',  label: 'Scale Run' },
  { id: 'chordTones',   label: 'Chord Tones' },
  { id: 'oneNote',      label: 'One Note' },
  { id: 'melodyEcho',   label: 'Melody Echo' },
  { id: 'guided',       label: 'Guided' },
];

// ─── Chord definitions (intervals from root) ───
const CHORD_FORMULAS = {
  'maj':   { name: 'Major',     intervals: [0, 4, 7] },
  'min':   { name: 'Minor',     intervals: [0, 3, 7] },
  '7':     { name: 'Dom 7',     intervals: [0, 4, 7, 10] },
  'min7':  { name: 'Min 7',     intervals: [0, 3, 7, 10] },
  'maj7':  { name: 'Maj 7',     intervals: [0, 4, 7, 11] },
  'sus4':  { name: 'Sus 4',     intervals: [0, 5, 7] },
  'dim':   { name: 'Dim',       intervals: [0, 3, 6] },
};

// Common diatonic chords for a key (minor key context since Gene plays mostly minor)
function getDiatonicChords(root) {
  const ri = CHROMATIC.indexOf(normalizeNote(root));
  if (ri < 0) return [];
  // i, III, iv, v, VI, VII for natural minor
  return [
    { root: CHROMATIC[ri], type: 'min', label: 'i' },
    { root: CHROMATIC[(ri + 3) % 12], type: 'maj', label: 'III' },
    { root: CHROMATIC[(ri + 5) % 12], type: 'min', label: 'iv' },
    { root: CHROMATIC[(ri + 7) % 12], type: 'min', label: 'v' },
    { root: CHROMATIC[(ri + 8) % 12], type: 'maj', label: 'VI' },
    { root: CHROMATIC[(ri + 10) % 12], type: 'maj', label: 'VII' },
  ];
}

function getChordTones(chordRoot, chordType) {
  const formula = CHORD_FORMULAS[chordType] || CHORD_FORMULAS['min'];
  const ri = CHROMATIC.indexOf(normalizeNote(chordRoot));
  if (ri < 0) return [];
  return formula.intervals.map(i => CHROMATIC[(ri + i) % 12]);
}

// ─── Interval names for each semitone distance ───
const INTERVAL_NAMES = {
  0: 'Unison', 1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3', 5: 'P4',
  6: 'Tritone', 7: 'P5', 8: 'm6', 9: 'M6', 10: 'm7', 11: 'M7',
};

// ─── Musical principle data ───

// Scale degree context: what each degree DOES in music (for Hear→Find "why" feedback)
const DEGREE_CONTEXT = {
  0: { name: 'Root', feel: 'Home. Total resolution. Everything pulls toward here.' },
  1: { name: 'b2', feel: 'Exotic tension. Wants to fall back to root.' },
  2: { name: '2nd', feel: 'Gentle lift. Passing tone — wants to keep moving.' },
  3: { name: 'b3', feel: 'The minor color. Ache, longing. Defines the mood.' },
  4: { name: '3rd', feel: 'Brightness. Major optimism. Defines major/minor.' },
  5: { name: '4th', feel: 'Suspension. Floating. Wants to resolve to 3rd or 5th.' },
  6: { name: 'b5', feel: 'The blue note. Maximum tension. Grit and soul.' },
  7: { name: '5th', feel: 'Open, stable, powerful. The second pillar after root.' },
  8: { name: 'b6', feel: 'Dark color. Phrygian/harmonic minor flavor.' },
  9: { name: '6th', feel: 'Sweet brightness. Dorian character.' },
  10: { name: 'b7', feel: 'Dominant pull. Bluesy, wants to resolve down to 5th or up to root.' },
  11: { name: '7th', feel: 'Leading tone. Strong pull UP to root. One semitone away from home.' },
};

// Interval resolution tendencies (for Interval Trainer)
const INTERVAL_RESOLUTION = {
  0: 'Unison — no tension, pure stability.',
  1: 'Half step — extreme tension. Resolves outward.',
  2: 'Whole step — gentle tension. Resolves either direction.',
  3: 'Minor 3rd — the sad interval. Stable within minor keys.',
  4: 'Major 3rd — the happy interval. Stable within major keys.',
  5: 'Perfect 4th — suspended, floating. Wants to fall to the 3rd.',
  6: 'Tritone — maximum dissonance. The devil\'s interval. Must resolve.',
  7: 'Perfect 5th — open, powerful, completely stable. The rock interval.',
  8: 'Minor 6th — rich and dark. Cinematic.',
  9: 'Major 6th — sweet and warm. The "my bonnie" interval.',
  10: 'Minor 7th — bluesy dominant pull. Wants to resolve down.',
  11: 'Major 7th — dreamy tension. Jazz. One step from home.',
};

// Musical lick patterns for Scale Runner (indices into scale notes array)
const LICK_PATTERNS = [
  { name: 'Ascending', pattern: (n) => [...Array(n)].map((_, i) => i) },
  { name: 'Descending', pattern: (n) => [...Array(n)].map((_, i) => n - 1 - i) },
  { name: '1-b3-4-5', pattern: (n) => n >= 4 ? [0, 1, 2, 3] : [0, 1, 2] },
  { name: '5-4-b3-1', pattern: (n) => n >= 4 ? [3, 2, 1, 0] : [2, 1, 0] },
  { name: 'Root-5th-Oct', pattern: (n) => n >= 5 ? [0, 3, 4, 3, 0] : [0, 2, 0] },
  { name: 'Zigzag', pattern: (n) => { const p = []; for (let i = 0; i < n; i++) p.push(i % 2 === 0 ? Math.floor(i/2) : n - 1 - Math.floor(i/2)); return p; } },
  { name: 'Thirds', pattern: (n) => { const p = []; for (let i = 0; i < n - 1; i++) p.push(i, i + 1 < n ? i + 1 : i); return [...new Set(p)]; } },
  { name: 'Random', pattern: (n) => { const p = [...Array(n)].map((_, i) => i); for (let i = p.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } return p; } },
];

// Common chord progressions for Chord Tones progression mode
const CHORD_PROGRESSIONS = {
  'i-iv-v':      { name: 'i - iv - v',      label: 'Basic Minor' },
  'i-VI-III-VII': { name: 'i - VI - III - VII', label: 'Andalusian' },
  'i-III-VI-v':  { name: 'i - III - VI - v', label: 'Pop Minor' },
  'I-IV-V':      { name: 'I - IV - V',       label: 'Basic Major' },
};

// ─── Guided exercise definitions ───
const GUIDED_EXERCISES = [
  {
    id: 'ground', title: 'Ground', desc: 'Find your home base.',
    steps: [
      { text: 'Close your eyes. Take a slow breath in.', dur: 4000, action: 'breathe' },
      { text: 'Exhale and hum any comfortable pitch.', dur: 5000, action: 'hum' },
      { text: 'Now listen to the root note.', dur: 3000, action: 'play_root' },
      { text: 'Match it with your voice. Feel where it sits in your chest.', dur: 8000, action: 'sing' },
      { text: 'Good. The root is home. Remember that feeling.', dur: 3000 },
    ]
  },
  {
    id: 'fifth', title: 'Find the Fifth', desc: 'The two pillars of every key.',
    steps: [
      { text: 'Listen to the root.', dur: 3000, action: 'play_root' },
      { text: 'Now listen to the fifth above it.', dur: 3000, action: 'play_fifth' },
      { text: 'Hear how it opens up? Like your ribcage expanding.', dur: 4000 },
      { text: 'Sing the root. Then slide up to the fifth.', dur: 8000, action: 'sing' },
      { text: 'Now find both notes on the fretboard.', dur: 5000 },
    ]
  },
  {
    id: 'penta', title: 'Pentatonic Feel', desc: 'The language of improvisation.',
    steps: [
      { text: 'Listen to each note of the pentatonic scale.', dur: 6000, action: 'play_scale' },
      { text: 'Again, slower. Notice how each note feels different.', dur: 8000, action: 'play_scale_slow' },
      { text: 'Sing back just the first 3 notes.', dur: 6000, action: 'sing' },
      { text: 'Now all 5. Take your time.', dur: 10000, action: 'sing' },
      { text: 'Your body knows these notes now. Trust it.', dur: 3000 },
    ]
  },
  {
    id: 'bodymap', title: 'Body Map', desc: 'Each note has a home in your body.',
    steps: [
      { text: 'Drone on. Sing the root. Feel it in your chest \u2014 grounding, stable.', dur: 6000, action: 'play_root' },
      { text: 'Now sing the minor third. It moves up to your upper chest \u2014 an ache, a longing.', dur: 6000, action: 'play_third' },
      { text: 'The fourth. Throat area. A bridge between worlds.', dur: 6000, action: 'play_fourth' },
      { text: 'The fifth. Clarity, openness. Feel it in the mask of your face.', dur: 6000, action: 'play_fifth' },
      { text: 'Back to root. Home. Feel the journey you just took through your body.', dur: 5000, action: 'play_root' },
      { text: 'When you improvise, you\'re navigating this internal map.', dur: 3000 },
    ]
  },
  {
    id: 'silent', title: 'Silent Hold', desc: 'The audiation muscle.',
    steps: [
      { text: 'Listen to the drone. Let the root saturate your hearing.', dur: 5000, action: 'play_root' },
      { text: 'Sing the root along with the drone. Match it perfectly.', dur: 5000, action: 'sing' },
      { text: 'Now the drone stops. Hold the note internally for 5 seconds. Don\'t sing yet.', dur: 6000 },
      { text: 'Sing it now. Did you stay on pitch?', dur: 5000, action: 'sing' },
      { text: 'Again \u2014 hold for 10 seconds this time. Feel it inside before you produce it.', dur: 12000 },
      { text: 'Improvisation is just audiation at speed. This is the muscle.', dur: 3000 },
    ]
  },
  {
    id: 'neighborhoods', title: 'Color Neighborhoods', desc: 'See the harmony.',
    steps: [
      { text: 'Look at the color wheel. Your scale notes cluster on one side. That\u2019s your key\u2019s neighborhood.', dur: 5000 },
      { text: 'Tap each scale note on the wheel. Hear how close they sound.', dur: 6000 },
      { text: 'Now imagine tapping a note from the opposite side of the wheel \u2014 that\u2019s the tritone. Maximum tension.', dur: 5000 },
      { text: 'Adjacent colors = harmonic family. This is why some notes \u201Cwant\u201D to go to others.', dur: 5000 },
      { text: 'Play root, then an adjacent color, then back. Feel the pull.', dur: 6000, action: 'play_root' },
    ]
  },
  {
    id: 'freeflow', title: 'Free Flow', desc: 'Your first improv.',
    steps: [
      { text: 'Drone on. Play any scale note. Let the color guide you.', dur: 6000, action: 'play_root' },
      { text: 'Play adjacent colors for smooth, stepwise motion.', dur: 8000 },
      { text: 'Now jump to a far color. Feel the tension. Then resolve back toward the root.', dur: 8000 },
      { text: 'There are no wrong notes \u2014 only different levels of tension. You choose when to resolve.', dur: 5000 },
      { text: 'Keep going. Let the colors guide your ear. When it sounds right, it IS right.', dur: 10000 },
      { text: 'You\u2019re improvising now.', dur: 3000 },
    ]
  },
];

// ─── Dynamic scale generator ───
function generateScale(root, scaleType) {
  const type = SCALE_TYPES[scaleType] || SCALE_TYPES['minor-pentatonic'];
  const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
  if (rootIdx < 0) return { name: `${root} ${type.name}`, root: normalizeNote(root), notes: [], positions: { 1: [0, 4] } };
  const notes = type.intervals.map(i => CHROMATIC[(rootIdx + i) % 12]);
  const lowEFrets = { 'E': 0, 'F': 1, 'F#': 2, 'G': 3, 'A♭': 4, 'A': 5, 'B♭': 6, 'B': 7, 'C': 8, 'C#': 9, 'D': 10, 'E♭': 11 };
  const rootFret = lowEFrets[normalizeNote(root)] || 5;
  const clamp = (v) => Math.max(0, Math.min(15, v));
  const positions = {
    1: [clamp(rootFret), clamp(rootFret + 3)],
    2: [clamp(rootFret + 2), clamp(rootFret + 5)],
    3: [clamp(rootFret + 4), clamp(rootFret + 7)],
    4: [clamp(rootFret + 7), clamp(rootFret + 10)],
    5: [clamp(Math.max(0, rootFret - 3)), clamp(rootFret)],
  };
  return { name: `${root} ${type.name}`, root: normalizeNote(root), notes, positions };
}

// ─── Guitar-realistic note generation ───
// Standard guitar (15 frets): E2 to G5 — MIDI 40 to 79
// That's ~40 unique pitches across ~3.3 octaves
const GUITAR_LO = 40; // E2
const GUITAR_HI = 79; // G5
const noteToMidi = (note, oct) => CHROMATIC.indexOf(normalizeNote(note)) + (oct + 1) * 12;
const midiToOctave = (note, midi) => Math.floor((midi - CHROMATIC.indexOf(normalizeNote(note))) / 12) - 1;

// Assign ascending octaves to a scale, spanning the guitar range naturally
function assignGuitarOctaves(notes, rootNote) {
  const ri = CHROMATIC.indexOf(normalizeNote(rootNote));
  // Find lowest valid octave for root on guitar
  let rootOct = 2;
  while (noteToMidi(rootNote, rootOct) < GUITAR_LO) rootOct++;

  const result = [];
  let lastMidi = noteToMidi(rootNote, rootOct) - 1;
  for (const n of notes) {
    const ni = CHROMATIC.indexOf(normalizeNote(n));
    let oct = rootOct;
    while (noteToMidi(n, oct) <= lastMidi) oct++;
    let midi = noteToMidi(n, oct);
    // Clamp to guitar range
    if (midi > GUITAR_HI) { oct--; midi = noteToMidi(n, oct); }
    if (midi < GUITAR_LO) { oct++; midi = noteToMidi(n, oct); }
    result.push(n + Math.max(2, Math.min(5, oct)));
    lastMidi = midi;
  }
  return result;
}

// Pick a random note+octave for a pitch class, staying within ±1 octave of prev
// and within guitar range. Truly random — each call picks from valid octaves.
function randomGuitarNote(note, prevMidi) {
  const ni = CHROMATIC.indexOf(normalizeNote(note));
  // All valid octaves for this note on guitar
  const validOcts = [];
  for (let o = 2; o <= 5; o++) {
    const m = ni + (o + 1) * 12;
    if (m >= GUITAR_LO && m <= GUITAR_HI) validOcts.push(o);
  }
  if (!validOcts.length) return note + '3';

  if (prevMidi) {
    // Filter to octaves within ~14 semitones (just over 1 octave) of previous note
    const close = validOcts.filter(o => Math.abs(ni + (o + 1) * 12 - prevMidi) <= 14);
    if (close.length) {
      const oct = close[Math.floor(Math.random() * close.length)];
      return note + oct;
    }
  }
  // No prev or no close options — pick any valid
  return note + validOcts[Math.floor(Math.random() * validOcts.length)];
}

// ─── ColorWheel ───
function ColorWheel({ theme: T, root, scaleNotes = [], voiceNote = null, activeNote = null, size = 160, onRootChange = null }) {
  const r = size / 2 - 16;
  const center = size / 2;
  const rootIdx = CIRCLE_OF_FIFTHS.indexOf(normalizeNote(root));
  const rotationDeg = rootIdx >= 0 ? -rootIdx * 30 : 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%' }}>
        {CIRCLE_OF_FIFTHS.map((note, i) => {
          const angle = (i * 30 - 90 + rotationDeg) * Math.PI / 180;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          const color = getColorForNote(note);
          const inScale = scaleNotes.includes(normalizeNote(note));
          const isRoot = normalizeNote(note) === normalizeNote(root);
          const isVoice = voiceNote && normalizeNote(voiceNote) === normalizeNote(note);
          const isActive = activeNote && normalizeNote(activeNote) === normalizeNote(note);
          const dotSize = isRoot ? 13 : 10;
          return (
            <g key={note} style={{ cursor: onRootChange || inScale ? 'pointer' : 'default', transition: 'all 0.4s ease' }}
              onClick={() => {
                if (onRootChange) { onRootChange(note); playWarmNote(note + '4'); }
                else if (inScale) playWarmNote(note + '4');
              }}>
              <circle cx={x} cy={y} r={dotSize} fill={color}
                opacity={inScale ? 1 : (onRootChange ? 0.25 : 0.08)}
                style={{ transition: 'all 0.3s' }} />
              {isRoot && <circle cx={x} cy={y} r={dotSize + 2} fill="none" stroke={T.textDark} strokeWidth={2} opacity={0.6} />}
              {(isVoice || isActive) && (
                <circle cx={x} cy={y} r={dotSize + 4} fill="none" stroke={color} strokeWidth={1.5} opacity={0.6}
                  style={{ animation: 'wheelPulse 0.8s ease-in-out infinite' }} />
              )}
              {(inScale || onRootChange) && (
                <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="central"
                  fontSize={7} fontWeight={isRoot ? 800 : 600} fill="#fff"
                  opacity={inScale ? 1 : 0.6}
                  fontFamily={T.sans} style={{ pointerEvents: 'none' }}>{note}</text>
              )}
            </g>
          );
        })}
        <text x={center} y={center - 4} textAnchor="middle" dominantBaseline="central"
          fontSize={22} fontWeight={700} fill={getColorForNote(root)} fontFamily={T.serif}>{root}</text>
        <text x={center} y={center + 14} textAnchor="middle" dominantBaseline="central"
          fontSize={8} fill={T.textMuted} fontFamily={T.sans}
          style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}>ROOT</text>
      </svg>
    </div>
  );
}

// ─── Quick Drone ───
function useQuickDrone() {
  const synthRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = useCallback(async (root) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    if (synthRef.current) { try { synthRef.current.stop(); synthRef.current.dispose(); } catch {} }
    if (gainRef.current) { try { gainRef.current.dispose(); } catch {} }
    if (filterRef.current) { try { filterRef.current.dispose(); } catch {} }
    const synth = new Tone.Oscillator({ type: 'triangle', frequency: Tone.Frequency(root + '2').toFrequency() });
    const lp = new Tone.Filter(350, 'lowpass');
    const gain = new Tone.Gain(0);
    synth.connect(lp); lp.connect(gain); gain.toDestination();
    synth.start(); gain.gain.rampTo(0.07, 0.5);
    synthRef.current = synth; gainRef.current = gain; filterRef.current = lp;
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    if (gainRef.current) {
      gainRef.current.gain.rampTo(0, 0.3);
      setTimeout(() => {
        try { synthRef.current?.stop(); synthRef.current?.dispose(); } catch {}
        try { filterRef.current?.dispose(); } catch {}
        try { gainRef.current?.dispose(); } catch {}
        synthRef.current = null; gainRef.current = null; filterRef.current = null;
      }, 400);
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    const handleMicReleased = async () => {
      if (!synthRef.current || !gainRef.current) return;
      try { await Tone.context.rawContext.suspend(); await Tone.context.rawContext.resume(); gainRef.current.gain.rampTo(0.07, 0.3); } catch {}
    };
    window.addEventListener('micReleased', handleMicReleased);
    return () => window.removeEventListener('micReleased', handleMicReleased);
  }, []);

  useEffect(() => () => { if (playing) stop(); }, []);

  return { playing, start, stop };
}

// ─── Main Component ───
export function ColorMusicTrainer({ theme: T, defaultRoot, defaultScale, defaultMode, embedded = false, onBack }) {
  const isMobile = useIsMobile(640);
  const [root, setRoot] = useState(defaultRoot || 'A');
  const [scaleType, setScaleType] = useState(defaultScale || 'minor-pentatonic');
  const [mode, setMode] = useState(defaultMode || 'explore');
  const [settingsOpen, setSettingsOpen] = useState(true); // root/scale selector open by default
  const [wheelVisible, setWheelVisible] = useState(false); // color wheel toggle on mobile
  const drone = useQuickDrone();

  // Hear→Find state
  const [hfTarget, setHfTarget] = useState(null);
  const [hfFeedback, setHfFeedback] = useState(null);
  const [hfScore, setHfScore] = useState({ hit: 0, total: 0 });
  const [hfStreak, setHfStreak] = useState(0);
  const [hfRevealed, setHfRevealed] = useState(false);
  const [hfAudiateMode, setHfAudiateMode] = useState(false); // Forces audiation before tapping
  const [hfAudiatePhase, setHfAudiatePhase] = useState(null); // 'listen' | 'audiate' | 'find' | null

  // One Note state
  const [oneNote, setOneNote] = useState(null);

  // Voice state
  const [voiceNote, setVoiceNote] = useState(null);
  const [voiceCents, setVoiceCents] = useState(0);
  const [voiceFreq, setVoiceFreq] = useState(null);
  const [micActive, setMicActive] = useState(false);

  // Call & Response state
  const [crPhrase, setCrPhrase] = useState([]);
  const [crGuess, setCrGuess] = useState([]);
  const [crLength, setCrLength] = useState(2);
  const [crFeedback, setCrFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [crScore, setCrScore] = useState({ hit: 0, total: 0 });
  const [crStreak, setCrStreak] = useState(0);

  // Interval Trainer state
  const [intTarget, setIntTarget] = useState(null); // { note1, note2, semitones, intervalName }
  const [intRevealed, setIntRevealed] = useState(false);
  const [intFeedback, setIntFeedback] = useState(null);
  const [intScore, setIntScore] = useState({ hit: 0, total: 0 });

  // Scale Runner state
  const [srActive, setSrActive] = useState(false);
  const [srBpm, setSrBpm] = useState(60);
  const [srIdx, setSrIdx] = useState(-1); // current note index
  const [srDirection, setSrDirection] = useState('up'); // 'up' | 'down' | 'both' | 'random'
  const srTimerRef = useRef(null);

  // Melody Echo state
  const [mePhrase, setMePhrase] = useState([]);
  const [meSung, setMeSung] = useState([]);
  const [meLength, setMeLength] = useState(3);
  const [meListening, setMeListening] = useState(false);
  const [meFeedback, setMeFeedback] = useState(null);
  const [meCorrectStreak, setMeCorrectStreak] = useState(0);
  const [meFreeVariation, setMeFreeVariation] = useState(false); // prompt to change one note
  const meLastNoteRef = useRef(null);

  // Chord Tone state
  const [ctChord, setCtChord] = useState(null); // { root, type, label }
  const [ctProgActive, setCtProgActive] = useState(false); // progression playing?
  const [ctProgStep, setCtProgStep] = useState(0);
  const [ctProgKey, setCtProgKey] = useState('i-iv-v');
  const ctProgTimerRef = useRef(null);
  const ctChordTones = useMemo(() => ctChord ? getChordTones(ctChord.root, ctChord.type) : [], [ctChord]);
  const diatonicChords = useMemo(() => getDiatonicChords(root), [root]);

  // Build chord progression from diatonic chords
  const ctProgression = useMemo(() => {
    const dc = diatonicChords;
    if (!dc.length) return [];
    const map = {}; dc.forEach(c => map[c.label] = c);
    const progDef = {
      'i-iv-v': ['i', 'iv', 'v', 'i'],
      'i-VI-III-VII': ['i', 'VI', 'III', 'VII'],
      'i-III-VI-v': ['i', 'III', 'VI', 'v'],
      'I-IV-V': ['i', 'III', 'VI', 'i'], // approximation for minor key
    };
    return (progDef[ctProgKey] || progDef['i-iv-v']).map(l => map[l]).filter(Boolean);
  }, [diatonicChords, ctProgKey]);

  // Guided state
  const [guidedEx, setGuidedEx] = useState(null);
  const [guidedStep, setGuidedStep] = useState(0);
  const [guidedActive, setGuidedActive] = useState(false);
  const [guidedComplete, setGuidedComplete] = useState(false); // show completion message

  // Stats + persistence
  const [sessionStart] = useState(Date.now());
  const [bestStats, setBestStats] = useState(() => {
    try { return JSON.parse(localStorage.getItem('colormusic-stats') || '{}'); } catch { return {}; }
  });
  // Save best scores on unmount or when scores change meaningfully
  const saveStatsRef = useRef(null);
  useEffect(() => {
    // Debounce: only save 1s after last score change
    if (saveStatsRef.current) clearTimeout(saveStatsRef.current);
    saveStatsRef.current = setTimeout(() => {
      const totalPlayed = hfScore.total + crScore.total + intScore.total;
      if (totalPlayed === 0) return;
      try {
        const stats = JSON.parse(localStorage.getItem('colormusic-stats') || '{}');
        const hfPct = hfScore.total > 0 ? Math.round(hfScore.hit / hfScore.total * 100) : 0;
        const crPct = crScore.total > 0 ? Math.round(crScore.hit / crScore.total * 100) : 0;
        const intPct = intScore.total > 0 ? Math.round(intScore.hit / intScore.total * 100) : 0;
        if (hfPct > (stats.hearFind?.bestPct || 0)) stats.hearFind = { bestPct: hfPct, bestStreak: Math.max(hfStreak, stats.hearFind?.bestStreak || 0) };
        if (crPct > (stats.callResponse?.bestPct || 0)) stats.callResponse = { bestPct: crPct };
        if (intPct > (stats.intervals?.bestPct || 0)) stats.intervals = { bestPct: intPct };
        stats.lastSession = new Date().toISOString();
        localStorage.setItem('colormusic-stats', JSON.stringify(stats));
      } catch {}
    }, 1000);
    return () => { if (saveStatsRef.current) clearTimeout(saveStatsRef.current); };
  }, [hfScore, crScore, intScore, hfStreak]);

  const scaleData = useMemo(() => generateScale(root, scaleType), [root, scaleType]);
  const scaleNotes = scaleData.notes;
  const typeInfo = SCALE_TYPES[scaleType] || SCALE_TYPES['minor-pentatonic'];
  const rootColor = getColorForNote(root);

  // Drone follows root
  const prevRootRef = useRef(root);
  useEffect(() => {
    if (drone.playing && root !== prevRootRef.current) {
      drone.stop(); setTimeout(() => drone.start(root), 350);
    }
    prevRootRef.current = root;
  }, [root]);

  // ─── Hear→Find ───
  const hfPrevMidiRef = useRef(null);
  const newChallenge = useCallback(() => {
    const notes = scaleData.notes;
    const note = notes[Math.floor(Math.random() * notes.length)];
    const full = randomGuitarNote(note, hfPrevMidiRef.current);
    const oct = parseInt(full.slice(-1));
    hfPrevMidiRef.current = CHROMATIC.indexOf(normalizeNote(note)) + (oct + 1) * 12;
    setHfTarget({ note, full });
    setHfFeedback(null); setHfRevealed(false);
    if (hfAudiateMode) {
      // Audiation mode: hear → internal hold → then find
      setHfAudiatePhase('listen');
      playWarmNote(note + oct, '2n');
      setTimeout(() => {
        setHfAudiatePhase('audiate'); // Silence — hold internally
        setTimeout(() => setHfAudiatePhase('find'), 3000); // 3s internal hold, then find
      }, 1500);
    } else {
      playWarmNote(note + oct, '2n');
    }
  }, [scaleData, hfAudiateMode]);

  const checkHfGuess = useCallback((tapInfo) => {
    if (!hfTarget) return;
    // Block tapping during audiation listen/hold phases
    if (hfAudiateMode && hfAudiatePhase && hfAudiatePhase !== 'find') return;
    if (normalizeNote(tapInfo.noteName) === normalizeNote(hfTarget.note)) {
      setHfFeedback('yes'); setHfScore(p => ({ hit: p.hit + 1, total: p.total + 1 })); setHfStreak(p => p + 1); setHfRevealed(true);
      setTimeout(() => newChallenge(), 1400);
    } else {
      setHfFeedback('no'); setHfScore(p => ({ ...p, total: p.total + 1 })); setHfStreak(0);
      setTimeout(() => setHfFeedback(null), 1000);
    }
  }, [hfTarget, newChallenge, hfAudiateMode, hfAudiatePhase]);

  // ─── Voice ───
  const handlePitchDetected = useCallback(({ note, cents, freq }) => {
    setVoiceNote(note); setVoiceCents(cents); setVoiceFreq(Math.round(freq));
  }, []);

  // ─── Call & Response ───
  const generatePhrase = useCallback((len) => {
    const notes = scaleData.notes;
    const phrase = [];
    let prev = Math.floor(Math.random() * notes.length);
    for (let i = 0; i < len; i++) {
      // Favor stepwise motion (adjacent scale degrees)
      const step = Math.random() < 0.7 ? (Math.random() > 0.5 ? 1 : -1) : Math.floor(Math.random() * 3) - 1;
      const idx = Math.max(0, Math.min(notes.length - 1, prev + step));
      phrase.push(notes[idx]);
      prev = idx;
    }
    return phrase;
  }, [scaleData]);

  const playCrPhrase = useCallback((phrase) => {
    const withOctaves = assignGuitarOctaves(phrase, phrase[0]);
    phrase.forEach((note, i) => {
      setTimeout(() => playWarmNote(withOctaves[i], '4n'), i * 400);
    });
  }, []);

  const newCrPhrase = useCallback(() => {
    const phrase = generatePhrase(crLength);
    setCrPhrase(phrase); setCrGuess([]); setCrFeedback(null);
    setTimeout(() => playCrPhrase(phrase), 200);
  }, [crLength, generatePhrase, playCrPhrase]);

  const handleCrTap = useCallback((tapInfo) => {
    if (!crPhrase.length || crFeedback) return;
    const newGuess = [...crGuess, tapInfo.noteName];
    setCrGuess(newGuess);
    if (newGuess.length === crPhrase.length) {
      const correct = newGuess.every((n, i) => normalizeNote(n) === normalizeNote(crPhrase[i]));
      setCrFeedback(correct ? 'correct' : 'wrong');
      if (correct) {
        setCrScore(p => ({ hit: p.hit + 1, total: p.total + 1 }));
        setCrStreak(p => {
          const next = p + 1;
          // Auto-increase difficulty
          if (next >= 3 && crLength < 4) setTimeout(() => setCrLength(l => Math.min(4, l + 1)), 800);
          return next;
        });
        setTimeout(newCrPhrase, 1400);
      } else {
        setCrScore(p => ({ ...p, total: p.total + 1 })); setCrStreak(0);
        // Reset guess after showing wrong feedback so user can retry same phrase
        setTimeout(() => { setCrFeedback(null); setCrGuess([]); playCrPhrase(crPhrase); }, 1500);
      }
    }
  }, [crPhrase, crGuess, crFeedback, crLength, newCrPhrase]);

  // ─── Chord Progression Player ───
  const startProgression = useCallback(() => {
    if (!ctProgression.length) return;
    setCtProgActive(true); setCtProgStep(0);
    setCtChord(ctProgression[0]);
    if (!drone.playing) drone.start(root);
  }, [ctProgression, drone, root]);

  const stopProgression = useCallback(() => {
    setCtProgActive(false); setCtProgStep(0);
    if (ctProgTimerRef.current) clearInterval(ctProgTimerRef.current);
  }, []);

  useEffect(() => {
    if (!ctProgActive || !ctProgression.length) return;
    const ms = 2000; // 2 seconds per chord
    ctProgTimerRef.current = setInterval(() => {
      setCtProgStep(prev => {
        const next = (prev + 1) % ctProgression.length;
        setCtChord(ctProgression[next]);
        return next;
      });
    }, ms);
    return () => clearInterval(ctProgTimerRef.current);
  }, [ctProgActive, ctProgression]);

  // ─── Hear→Find: degree context for "why" feedback ───
  const getDegreeFeedback = useCallback((noteName) => {
    const ri = CHROMATIC.indexOf(normalizeNote(root));
    const ni = CHROMATIC.indexOf(normalizeNote(noteName));
    if (ri < 0 || ni < 0) return null;
    const semitones = ((ni - ri) + 12) % 12;
    return DEGREE_CONTEXT[semitones] || null;
  }, [root]);

  // ─── Guided ───
  const startGuided = useCallback((idx) => {
    setGuidedEx(idx); setGuidedStep(0); setGuidedActive(true);
    if (!drone.playing) drone.start(root);
    // Trigger first step's action
    const step = GUIDED_EXERCISES[idx].steps[0];
    const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
    if (step.action === 'play_root') setTimeout(() => playWarmNote(root + '3', '2n'), 300);
    if (step.action === 'play_fifth') setTimeout(() => playWarmNote(CHROMATIC[(rootIdx + 7) % 12] + '3', '2n'), 300);
    if (step.action === 'play_scale') {
      const withOct = assignGuitarOctaves(scaleData.notes, root);
      withOct.forEach((n, i) => setTimeout(() => playWarmNote(n, '4n'), 300 + i * 500));
    }
  }, [drone, root, scaleData]);

  const advanceGuided = useCallback(() => {
    if (guidedEx === null) return;
    const ex = GUIDED_EXERCISES[guidedEx];
    const next = guidedStep + 1;
    if (next >= ex.steps.length) { setGuidedActive(false); setGuidedComplete(true); return; }
    setGuidedStep(next);
    const step = ex.steps[next];
    const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
    const rootFreqNote = root + '3';
    if (step.action === 'play_root') playWarmNote(rootFreqNote, '2n');
    if (step.action === 'play_fifth') { const fifth = CHROMATIC[(rootIdx + 7) % 12]; playWarmNote(fifth + '3', '2n'); }
    if (step.action === 'play_third') { const third = CHROMATIC[(rootIdx + 3) % 12]; playWarmNote(third + '3', '2n'); }
    if (step.action === 'play_fourth') { const fourth = CHROMATIC[(rootIdx + 5) % 12]; playWarmNote(fourth + '3', '2n'); }
    if (step.action === 'play_scale') {
      const withOct = assignGuitarOctaves(scaleData.notes, root);
      withOct.forEach((n, i) => setTimeout(() => playWarmNote(n, '4n'), i * 500));
    }
    if (step.action === 'play_scale_slow') {
      const withOct = assignGuitarOctaves(scaleData.notes, root);
      withOct.forEach((n, i) => setTimeout(() => playWarmNote(n, '2n'), i * 900));
    }
  }, [guidedEx, guidedStep, root, scaleData]);

  // ─── Interval Trainer ───
  const newInterval = useCallback(() => {
    const notes = scaleData.notes;
    const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
    // Pick two different scale notes
    const i1 = 0; // always start from root
    let i2 = Math.floor(Math.random() * (notes.length - 1)) + 1;
    const n1 = notes[i1], n2 = notes[i2];
    const idx1 = CHROMATIC.indexOf(normalizeNote(n1));
    const idx2 = CHROMATIC.indexOf(normalizeNote(n2));
    const semitones = ((idx2 - idx1) + 12) % 12;
    // Pick octaves: root at 3, second note in same or next octave (ascending interval)
    const oct1 = 3;
    const oct2 = (idx2 > idx1) ? oct1 : oct1 + 1; // if chromatic index wraps, go up an octave
    setIntTarget({ note1: n1, note2: n2, semitones, intervalName: INTERVAL_NAMES[semitones] || `${semitones}st`, oct1, oct2 });
    setIntRevealed(false); setIntFeedback(null);
    playWarmNote(n1 + oct1, '4n');
    setTimeout(() => playWarmNote(n2 + oct2, '4n'), 500);
  }, [scaleData, root]);

  const checkInterval = useCallback((guessedSemitones) => {
    if (!intTarget) return;
    if (guessedSemitones === intTarget.semitones) {
      setIntFeedback('correct'); setIntRevealed(true);
      setIntScore(p => ({ hit: p.hit + 1, total: p.total + 1 }));
      setTimeout(newInterval, 1400);
    } else {
      setIntFeedback('wrong');
      setIntScore(p => ({ ...p, total: p.total + 1 }));
      // Auto-replay the same interval after brief feedback
      setTimeout(() => {
        setIntFeedback(null);
        if (intTarget) {
          playWarmNote(intTarget.note1 + (intTarget.oct1 || 3), '4n');
          setTimeout(() => playWarmNote(intTarget.note2 + (intTarget.oct2 || 4), '4n'), 500);
        }
      }, 1200);
    }
  }, [intTarget, newInterval]);

  // Available intervals in current scale (relative to root)
  const scaleIntervals = useMemo(() => {
    const rootIdx = CHROMATIC.indexOf(normalizeNote(root));
    return scaleData.notes.slice(1).map(n => {
      const idx = CHROMATIC.indexOf(normalizeNote(n));
      const semi = ((idx - rootIdx) + 12) % 12;
      return { semitones: semi, name: INTERVAL_NAMES[semi] || `${semi}` };
    });
  }, [scaleData, root]);

  // ─── Scale Runner ───
  const [srPattern, setSrPattern] = useState(0); // index into LICK_PATTERNS
  const srSequence = useMemo(() => {
    const notes = scaleData.notes;
    if (srDirection === 'up') return [...notes];
    if (srDirection === 'down') return [...notes].reverse();
    if (srDirection === 'both') return [...notes, ...[...notes].reverse().slice(1)];
    if (srDirection === 'licks') {
      // Use musical lick patterns
      const pat = LICK_PATTERNS[srPattern];
      const indices = pat.pattern(notes.length);
      return indices.map(i => notes[Math.min(i, notes.length - 1)]);
    }
    // random
    const shuffled = [...notes];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    return shuffled;
  }, [scaleData, srDirection, srPattern]);

  // Scale runner with guitar octaves
  const srWithOctaves = useMemo(() => assignGuitarOctaves(srSequence, root), [srSequence, root]);

  const startScaleRunner = useCallback(() => {
    setSrActive(true); setSrIdx(0);
    playWarmNote(srWithOctaves[0], '8n');
  }, [srWithOctaves]);

  const stopScaleRunner = useCallback(() => {
    setSrActive(false); setSrIdx(-1);
    if (srTimerRef.current) clearInterval(srTimerRef.current);
  }, []);

  // Advance scale runner on interval — also plays first note on start
  useEffect(() => {
    if (!srActive) return;
    // Play first note when starting/restarting
    if (srIdx === 0 && srWithOctaves.length) playWarmNote(srWithOctaves[0], '8n');
    const ms = 60000 / srBpm;
    srTimerRef.current = setInterval(() => {
      setSrIdx(prev => {
        const next = prev + 1;
        if (next >= srSequence.length) {
          // Completed a run — bump BPM, auto-restart after brief pause
          clearInterval(srTimerRef.current);
          setSrBpm(b => b + 5);
          setSrActive(false);
          // Auto-start next run after 1.5s pause
          setTimeout(() => {
            setSrActive(true); setSrIdx(0);
            // Play first note of new sequence (srWithOctaves may have changed due to BPM bump)
          }, 1500);
          return -1;
        }
        playWarmNote(srWithOctaves[next] || srSequence[next] + '4', '8n');
        return next;
      });
    }, ms);
    return () => { if (srTimerRef.current) clearInterval(srTimerRef.current); };
  }, [srActive, srBpm, srSequence]);

  // ─── Melody Echo ───
  const playMelodyPhrase = useCallback((phrase) => {
    // Assign guitar-realistic octaves to the phrase
    const withOctaves = assignGuitarOctaves(phrase, phrase[0]);
    const durations = ['8n', '4n', '4n', '2n'];
    let time = 0;
    phrase.forEach((n, i) => {
      const dur = durations[Math.floor(Math.random() * durations.length)];
      const gap = 200 + Math.floor(Math.random() * 300);
      if (i > 0 && Math.random() < 0.2) time += 200 + Math.floor(Math.random() * 200);
      setTimeout(() => playWarmNote(withOctaves[i], dur), time);
      time += gap;
    });
    return time;
  }, []);

  const newMelody = useCallback(() => {
    const notes = scaleData.notes;
    const phrase = [];
    let prev = Math.floor(Math.random() * notes.length);
    for (let i = 0; i < meLength; i++) {
      const step = Math.random() < 0.7 ? (Math.random() > 0.5 ? 1 : -1) : Math.floor(Math.random() * 3) - 1;
      const idx = Math.max(0, Math.min(notes.length - 1, prev + step));
      phrase.push(notes[idx]);
      prev = idx;
    }
    setMePhrase(phrase); setMeSung([]); setMeListening(false); setMeFeedback(null);
    meLastNoteRef.current = null;
    const totalTime = playMelodyPhrase(phrase);
    setTimeout(() => setMeListening(true), totalTime + 400);
  }, [scaleData, meLength, playMelodyPhrase]);

  const retryMelody = useCallback(() => {
    if (!mePhrase.length) return;
    setMeSung([]); setMeListening(false); setMeFeedback(null);
    meLastNoteRef.current = null;
    const totalTime = playMelodyPhrase(mePhrase);
    setTimeout(() => setMeListening(true), totalTime + 400);
  }, [mePhrase, playMelodyPhrase]);

  // Capture sung notes for melody echo
  const handleMePitch = useCallback(({ note }) => {
    if (!meListening || !mePhrase.length) return;
    const normalized = normalizeNote(note);
    // Only register if it's a new note (different from last)
    if (normalized === meLastNoteRef.current) return;
    meLastNoteRef.current = normalized;
    setMeSung(prev => {
      const next = [...prev, normalized];
      if (next.length >= mePhrase.length) {
        // Check match
        setMeListening(false);
        const correct = next.every((n, i) => normalizeNote(n) === normalizeNote(mePhrase[i]));
        setMeFeedback(correct ? 'correct' : 'wrong');
        if (correct) {
          setMeCorrectStreak(p => {
            const s = p + 1;
            if (s >= 3 && !meFreeVariation) setMeFreeVariation(true);
            return s;
          });
        } else { setMeCorrectStreak(0); }
      }
      return next;
    });
  }, [meListening, mePhrase]);

  // Auto-advance melody echo after feedback
  useEffect(() => {
    if (!meFeedback) return;
    const delay = meFeedback === 'correct' ? 2000 : 2500;
    const timer = setTimeout(() => {
      if (meFeedback === 'correct') newMelody();
      else retryMelody(); // Wrong → auto-retry same phrase
    }, delay);
    return () => clearTimeout(timer);
  }, [meFeedback]);

  // Combine voice handler for melody echo mode
  const handlePitchDetectedAll = useCallback((data) => {
    handlePitchDetected(data);
    if (mode === 'melodyEcho') handleMePitch(data);
  }, [handlePitchDetected, mode, handleMePitch]);

  // ─── Mode-specific tap handler ───
  const handleNoteTap = useCallback((tapInfo) => {
    if (mode === 'hearFind') checkHfGuess(tapInfo);
    else if (mode === 'callResponse') handleCrTap(tapInfo);
    else if (mode === 'oneNote' && !oneNote) setOneNote(tapInfo.noteName);
  }, [mode, checkHfGuess, handleCrTap, oneNote]);

  useEffect(() => {
    if (mode === 'hearFind') setTimeout(newChallenge, 300);
    if (mode === 'callResponse') setTimeout(newCrPhrase, 300);
    if (mode === 'intervals') setTimeout(newInterval, 300);
    if (mode === 'oneNote') setOneNote(null);
    if (mode !== 'voice' && mode !== 'melodyEcho') { setVoiceNote(null); setMicActive(false); }
    if (mode === 'voice' || mode === 'melodyEcho') setMicActive(true);
    if (mode === 'guided') { setGuidedActive(false); setGuidedEx(null); }
    if (mode === 'scaleRunner') { stopScaleRunner(); }
    if (mode !== 'scaleRunner') stopScaleRunner();
    if (mode !== 'chordTones') stopProgression();
    setVoiceNote(null);
  }, [mode]);

  // ─── Styles ───
  const modeTabStyle = (id) => {
    const active = mode === id;
    return {
      padding: '8px 12px',
      borderRadius: 20, border: 'none', cursor: 'pointer',
      background: active ? rootColor : 'transparent',
      color: active ? '#fff' : T.textMuted,
      fontSize: 11, fontWeight: active ? 700 : 500, fontFamily: T.sans,
      letterSpacing: 0.5,
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      whiteSpace: 'nowrap',
      textShadow: active ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
    };
  };

  const btnStyle = (active, color) => ({
    padding: isMobile ? '10px 16px' : '8px 14px',
    borderRadius: 20, cursor: 'pointer', fontFamily: T.sans,
    fontSize: 12, fontWeight: 600, minHeight: 40,
    background: active ? color : T.bgCard,
    color: active ? '#fff' : T.textMed,
    border: active ? 'none' : `1px solid ${T.border}`,
    display: 'flex', alignItems: 'center', gap: 5,
    transition: 'all 0.2s',
    textShadow: active ? '0 1px 2px rgba(0,0,0,0.15)' : 'none',
    boxShadow: active ? `0 2px 8px ${color}30` : 'none',
  });

  return (
    <div style={{
      fontFamily: T.sans, color: T.textDark,
      padding: embedded ? '12px 0' : '0 16px',
      paddingBottom: embedded ? 12 : 140,
      maxWidth: 960, margin: '0 auto',
    }}>
      <style>{`
        @keyframes wheelPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        @keyframes droneGlow { 0%,100%{box-shadow:0 0 4px ${rootColor}40} 50%{box-shadow:0 0 12px ${rootColor}80} }
        .cm-tabs::-webkit-scrollbar { display: none; }
        .cm-tabs { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── HEADER ── */}
      {!embedded && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 0', borderBottom: `1px solid ${T.borderSoft}`, marginBottom: 12,
        }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              color: T.textMed, display: 'flex', alignItems: 'center',
            }}><ArrowLeft size={20} /></button>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif, margin: 0, color: T.textDark }}>
              Color Music
            </h1>
            <div style={{ fontSize: 10, color: T.textMuted, marginTop: 1, fontFamily: T.sans }}>
              {root} {typeInfo.name} \u00B7 {scaleNotes.length} notes
            </div>
          </div>
          <button onClick={() => drone.playing ? drone.stop() : drone.start(root)} style={{
            ...btnStyle(drone.playing, rootColor),
            animation: drone.playing ? 'droneGlow 3s ease-in-out infinite' : 'none',
          }}>
            <Volume2 size={14} />
            {drone.playing ? 'On' : 'Drone'}
          </button>
        </div>
      )}

      {/* ── MODE TABS (pill bar, scrollable) ── */}
      {!embedded && (
        <div className="cm-tabs" style={{
          display: 'flex', gap: 6, marginBottom: 16,
          overflowX: 'auto', paddingBottom: 4,
          WebkitOverflowScrolling: 'touch',
        }}>
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={modeTabStyle(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* ── MODE PANEL ── */}
      <div style={{
        padding: '14px 16px',
        borderRadius: T.radiusMd, marginBottom: 16,
        background: T.bgCard, border: `1px solid ${T.border}`,
        boxShadow: T.sm,
      }}>

        {/* EXPLORE */}
        {mode === 'explore' && (
          <div style={{ fontSize: 13, color: T.textMed, lineHeight: 1.6, fontStyle: 'italic', fontFamily: T.serif }}>
            Tap notes. Listen. Adjacent colors = harmonic neighbors.
            {!drone.playing && ' Turn on the drone to hear each note against the root.'}
            <div style={{ fontSize: 9, color: T.textLight, marginTop: 6, fontStyle: 'normal', fontFamily: T.sans }}>
              \u25A0 = name &nbsp; \u25CF = function &nbsp; toggle above fretboard
            </div>
          </div>
        )}

        {/* HEAR→FIND */}
        {mode === 'hearFind' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <button onClick={newChallenge} style={btnStyle(true, rootColor)}>New Note</button>
              <button onClick={() => hfTarget && playWarmNote(hfTarget.full, '2n')} style={btnStyle(false, rootColor)}>Replay</button>
              <button onClick={() => setHfRevealed(true)} style={{ ...btnStyle(false, T.textMuted), fontSize: 10 }}>Reveal</button>
              <div style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: rootColor, fontWeight: 700 }}>{hfScore.hit}</span>
                <span style={{ color: T.textMuted }}>/{hfScore.total}</span>
                {hfStreak >= 3 && <span style={{ color: '#E8D830', marginLeft: 6 }}>{hfStreak}</span>}
              </div>
            </div>
            {hfFeedback && (
              <div style={{
                padding: '8px 12px', borderRadius: T.radius, fontSize: 13, fontWeight: 600,
                background: hfFeedback === 'yes' ? T.successSoft : T.coralSoft,
                color: hfFeedback === 'yes' ? T.success : T.coral,
                marginBottom: 6,
              }}>
                {hfFeedback === 'yes'
                  ? (() => {
                      const deg = hfTarget ? getDegreeFeedback(hfTarget.note) : null;
                      return `\u2713 ${hfTarget?.note}${deg ? ` \u2014 the ${deg.name}. ${deg.feel}` : '. Nice.'}`;
                    })()
                  : '\u2717 Listen again. Feel where it lives in the scale.'}
              </div>
            )}
            {hfRevealed && hfTarget && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 4,
                  background: getColorForNote(hfTarget.note),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  boxShadow: `0 0 10px ${getColorForNote(hfTarget.note)}60`,
                }}>{hfTarget.note}</div>
                <span style={{ fontSize: 12, color: T.textMed }}>was the note</span>
              </div>
            )}
            {/* Audiation mode toggle + phase indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <button onClick={() => setHfAudiateMode(!hfAudiateMode)} style={{
                padding: '6px 12px', borderRadius: T.radius,
                background: hfAudiateMode ? `${rootColor}12` : T.bgCard,
                border: `1px solid ${hfAudiateMode ? rootColor : T.borderSoft}`,
                color: hfAudiateMode ? rootColor : T.textMuted,
                fontSize: 10, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
                minHeight: 36,
              }}>
                {hfAudiateMode ? '\u25C9 Audiate Mode ON' : '\u25CB Audiate Mode'}
              </button>
              {hfAudiateMode && hfAudiatePhase && (
                <span style={{
                  fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                  color: hfAudiatePhase === 'listen' ? rootColor
                    : hfAudiatePhase === 'audiate' ? T.plum
                    : T.success,
                  animation: hfAudiatePhase === 'audiate' ? 'wheelPulse 1s ease-in-out infinite' : 'none',
                }}>
                  {hfAudiatePhase === 'listen' && 'Listening...'}
                  {hfAudiatePhase === 'audiate' && 'Hold it internally \u2014 3 seconds of silence...'}
                  {hfAudiatePhase === 'find' && 'Now find it.'}
                </span>
              )}
            </div>
            {hfAudiateMode && !hfAudiatePhase && (
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4, fontStyle: 'italic', fontFamily: T.serif }}>
                Hear the note \u2192 hold it internally for 3 seconds \u2192 then find it. Forces audiation before action.
              </div>
            )}
          </div>
        )}

        {/* VOICE */}
        {mode === 'voice' && (
          <div>
            {/* Detected note display (above the detector) */}
            {voiceNote && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: getColorForNote(voiceNote),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  boxShadow: `0 0 16px ${getColorForNote(voiceNote)}60`,
                  transition: 'all 0.15s',
                }}>{voiceNote}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.textMuted, fontFamily: 'monospace' }}>{voiceFreq}Hz</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <div style={{ width: 60, height: 4, borderRadius: 2, background: T.borderSoft, position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '50%', top: -1, width: 1, height: 6, background: T.textMuted }} />
                      <div style={{
                        position: 'absolute', left: `${Math.max(0, Math.min(100, 50 + voiceCents / 2))}%`, top: -2,
                        width: 6, height: 8, borderRadius: 3,
                        background: Math.abs(voiceCents) < 10 ? T.success : Math.abs(voiceCents) < 25 ? '#F5C518' : T.coral,
                        transition: 'left 0.1s',
                      }} />
                    </div>
                    <span style={{ fontSize: 9, color: T.textMuted, fontFamily: 'monospace' }}>
                      {voiceCents > 0 ? '+' : ''}{voiceCents}\u00A2
                    </span>
                  </div>
                </div>
                {scaleNotes.includes(normalizeNote(voiceNote)) && (
                  <span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>\u2713 in scale</span>
                )}
              </div>
            )}
            {/* Inline LivePitchDetector — user clicks its own Start button */}
            <LivePitchDetector theme={T} inline={true} onPitchDetected={handlePitchDetectedAll} />
            <div style={{ fontSize: 12, color: T.textMed, fontStyle: 'italic', fontFamily: T.serif, marginTop: 8 }}>
              Sing or hum \u2014 watch the fretboard light up. Your voice paints the guitar.
            </div>
          </div>
        )}

        {/* CALL & RESPONSE */}
        {mode === 'callResponse' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              <button onClick={newCrPhrase} style={btnStyle(true, rootColor)}>New Phrase</button>
              <button onClick={() => crPhrase.length && playCrPhrase(crPhrase)} style={btnStyle(false, rootColor)}>Replay</button>
              <button onClick={() => { setCrGuess([]); setCrFeedback(null); crPhrase.length && playCrPhrase(crPhrase); }}
                style={btnStyle(false, T.textMed)}>Retry</button>
              <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
                {[2, 3, 4].map(n => (
                  <button key={n} onClick={() => { setCrLength(n); }} style={{
                    width: 28, height: 28, borderRadius: T.radius, border: `1px solid ${crLength === n ? rootColor : T.borderSoft}`,
                    background: crLength === n ? `${rootColor}12` : 'transparent',
                    color: crLength === n ? rootColor : T.textMuted, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', fontFamily: T.sans,
                  }}>{n}</button>
                ))}
              </div>
              <div style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: rootColor, fontWeight: 700 }}>{crScore.hit}</span>
                <span style={{ color: T.textMuted }}>/{crScore.total}</span>
              </div>
            </div>
            {/* Phrase display */}
            {crPhrase.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Phrase</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {crPhrase.map((note, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: 4,
                      background: getColorForNote(note),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      opacity: crFeedback === 'wrong' ? 1 : (crGuess.length > i ? 0.5 : 1),
                      boxShadow: `0 0 6px ${getColorForNote(note)}40`,
                    }}>{note}</div>
                  ))}
                </div>
              </div>
            )}
            {/* Guess display */}
            {crGuess.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Your answer</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {crGuess.map((note, i) => {
                    const correct = normalizeNote(note) === normalizeNote(crPhrase[i]);
                    return (
                      <div key={i} style={{
                        width: 36, height: 36, borderRadius: 4,
                        background: getColorForNote(note),
                        border: `2px solid ${correct ? T.success : T.coral}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      }}>{note}</div>
                    );
                  })}
                </div>
              </div>
            )}
            {crFeedback && (
              <div style={{
                padding: '6px 12px', borderRadius: T.radius, fontSize: 12, fontWeight: 600,
                background: crFeedback === 'correct' ? T.successSoft : T.coralSoft,
                color: crFeedback === 'correct' ? T.success : T.coral,
              }}>
                {crFeedback === 'correct' ? '\u2713 Perfect echo!' : '\u2717 Not quite \u2014 listen again.'}
              </div>
            )}
            {!crPhrase.length && (
              <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap "New Phrase" to hear a melodic pattern. Echo it back by tapping the fretboard.
              </div>
            )}
          </div>
        )}

        {/* INTERVALS */}
        {mode === 'intervals' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              <button onClick={newInterval} style={btnStyle(true, rootColor)}>New Interval</button>
              <button onClick={() => intTarget && (() => {
                playWarmNote(intTarget.note1 + (intTarget.oct1 || 3), '4n');
                setTimeout(() => playWarmNote(intTarget.note2 + (intTarget.oct2 || 4), '4n'), 500);
              })()} style={btnStyle(false, rootColor)}>Replay</button>
              <div style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 13 }}>
                <span style={{ color: rootColor, fontWeight: 700 }}>{intScore.hit}</span>
                <span style={{ color: T.textMuted }}>/{intScore.total}</span>
              </div>
            </div>
            {/* Interval answer buttons */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
              {scaleIntervals.map(({ semitones, name }) => (
                <button key={semitones} onClick={() => checkInterval(semitones)} style={{
                  padding: isMobile ? '10px 14px' : '6px 12px', borderRadius: T.radius,
                  background: T.bgCard, border: `1px solid ${T.border}`,
                  color: T.textDark, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  cursor: 'pointer', minHeight: 44, transition: 'all 0.2s',
                }}>{name}</button>
              ))}
            </div>
            {intFeedback && (
              <div style={{
                padding: '8px 12px', borderRadius: T.radius, fontSize: 13, fontWeight: 600,
                background: intFeedback === 'correct' ? T.successSoft : T.coralSoft,
                color: intFeedback === 'correct' ? T.success : T.coral,
                marginBottom: 6,
              }}>
                {intFeedback === 'correct'
                  ? `\u2713 ${intTarget?.intervalName}! ${intTarget?.note1} \u2192 ${intTarget?.note2}. ${INTERVAL_RESOLUTION[intTarget?.semitones] || ''}`
                  : `\u2717 Not that one. Listen to the distance between the colors.`}
              </div>
            )}
            {intRevealed && intTarget && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <div style={{ width: 32, height: 32, borderRadius: 4, background: getColorForNote(intTarget.note1),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}>{intTarget.note1}</div>
                <span style={{ fontSize: 12, color: T.textMuted, fontFamily: T.serif, fontStyle: 'italic' }}>{intTarget.intervalName}</span>
                <div style={{ width: 32, height: 32, borderRadius: 4, background: getColorForNote(intTarget.note2),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                }}>{intTarget.note2}</div>
              </div>
            )}
            {!intTarget && (
              <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap "New Interval" to hear two notes. Identify the distance between them.
              </div>
            )}
            {intTarget && (
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 8, fontStyle: 'italic', fontFamily: T.serif }}>
                Close colors on the wheel = small interval. Far colors = big leap.
              </div>
            )}
          </div>
        )}

        {/* SCALE RUNNER */}
        {mode === 'scaleRunner' && (
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              {!srActive ? (
                <button onClick={startScaleRunner} style={btnStyle(true, rootColor)}>Start</button>
              ) : (
                <button onClick={stopScaleRunner} style={btnStyle(false, T.coral)}>Stop</button>
              )}
              <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: rootColor, minWidth: 60 }}>
                {srBpm} <span style={{ fontSize: 10, fontWeight: 400, color: T.textMuted }}>BPM</span>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[
                  { id: 'up', label: 'Up' },
                  { id: 'down', label: 'Down' },
                  { id: 'both', label: 'Both' },
                  { id: 'licks', label: 'Licks' },
                  { id: 'random', label: 'Rnd' },
                ].map(d => (
                  <button key={d.id} onClick={() => setSrDirection(d.id)} style={{
                    padding: '4px 8px', height: 32, borderRadius: T.radius,
                    border: `1px solid ${srDirection === d.id ? rootColor : T.borderSoft}`,
                    background: srDirection === d.id ? `${rootColor}12` : 'transparent',
                    color: srDirection === d.id ? rootColor : T.textMuted,
                    fontSize: 10, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: T.sans,
                  }}>{d.label}</button>
                ))}
              </div>
            </div>
            {/* Lick pattern selector */}
            {srDirection === 'licks' && !srActive && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {LICK_PATTERNS.map((lp, i) => (
                  <button key={i} onClick={() => setSrPattern(i)} style={{
                    padding: '6px 10px', borderRadius: T.radius,
                    background: srPattern === i ? `${rootColor}12` : T.bgCard,
                    border: `1px solid ${srPattern === i ? rootColor : T.borderSoft}`,
                    color: srPattern === i ? rootColor : T.textMuted,
                    fontSize: 10, fontFamily: T.sans, cursor: 'pointer', minHeight: 32,
                  }}>{lp.name}</button>
                ))}
              </div>
            )}
            {/* Current note highlight */}
            {srActive && srIdx >= 0 && srIdx < srSequence.length && (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 8 }}>
                {srSequence.map((note, i) => (
                  <div key={i} style={{
                    width: i === srIdx ? 36 : 24, height: i === srIdx ? 36 : 24,
                    borderRadius: 4, background: getColorForNote(note),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: i === srIdx ? 11 : 8, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    opacity: i < srIdx ? 0.3 : i === srIdx ? 1 : 0.5,
                    boxShadow: i === srIdx ? `0 0 12px ${getColorForNote(note)}60` : 'none',
                    transition: 'all 0.15s',
                  }}>{i === srIdx ? note : ''}</div>
                ))}
              </div>
            )}
            {!srActive && (
              <div style={{ fontSize: 11, color: srBpm > 60 ? T.success : T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                {srBpm > 60
                  ? `Run complete! Now at ${srBpm} BPM. Hit Start to go again.`
                  : 'Notes light up in sequence. Follow along. Each completed run bumps the tempo by 5 BPM.'}
              </div>
            )}
          </div>
        )}

        {/* MELODY ECHO */}
        {mode === 'melodyEcho' && (
          <div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10 }}>
              <button onClick={newMelody} style={btnStyle(true, rootColor)}>New Melody</button>
              <button onClick={() => mePhrase.length && playMelodyPhrase(mePhrase)}
                style={btnStyle(false, rootColor)}>Replay</button>
              <button onClick={retryMelody}
                style={btnStyle(false, T.textMed)}>Retry</button>
              <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
                {[3, 4, 5].map(n => (
                  <button key={n} onClick={() => setMeLength(n)} style={{
                    width: 28, height: 28, borderRadius: T.radius,
                    border: `1px solid ${meLength === n ? rootColor : T.borderSoft}`,
                    background: meLength === n ? `${rootColor}12` : 'transparent',
                    color: meLength === n ? rootColor : T.textMuted, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', fontFamily: T.sans,
                  }}>{n}</button>
                ))}
              </div>
            </div>
            {/* Target melody display */}
            {mePhrase.length > 0 && (
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Target</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {mePhrase.map((note, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: getColorForNote(note),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      boxShadow: `0 0 6px ${getColorForNote(note)}40`,
                    }}>{note}</div>
                  ))}
                </div>
              </div>
            )}
            {/* Sung notes display */}
            {meSung.length > 0 && (
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>You sang</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {meSung.map((note, i) => {
                    const correct = i < mePhrase.length && normalizeNote(note) === normalizeNote(mePhrase[i]);
                    return (
                      <div key={i} style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: getColorForNote(note),
                        border: `2px solid ${correct ? T.success : T.coral}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      }}>{note}</div>
                    );
                  })}
                </div>
              </div>
            )}
            {meFeedback && (
              <div style={{
                padding: '8px 12px', borderRadius: T.radius, fontSize: 13, fontWeight: 600,
                background: meFeedback === 'correct' ? T.successSoft : T.coralSoft,
                color: meFeedback === 'correct' ? T.success : T.coral,
                marginBottom: 6,
              }}>
                {meFeedback === 'correct' ? '\u2713 Perfect echo!' : '\u2717 Not quite \u2014 try again.'}
              </div>
            )}
            {meListening && (
              <div style={{ fontSize: 12, color: rootColor, fontWeight: 600, animation: 'wheelPulse 1s ease-in-out infinite' }}>
                Listening... sing now
              </div>
            )}
            {/* Free Variation prompt */}
            {meFreeVariation && meFeedback === 'correct' && (
              <div style={{
                padding: '8px 12px', borderRadius: T.radius, marginTop: 6,
                background: `${rootColor}08`, border: `1px solid ${rootColor}30`,
                fontSize: 12, color: rootColor, fontWeight: 600, fontFamily: T.serif,
              }}>
                Free Variation: echo the next phrase but change ONE note. Keep the shape, alter the color.
                This is the first step from imitation to creation.
              </div>
            )}
            {/* LivePitchDetector for melody echo */}
            {(mode === 'melodyEcho') && (
              <div style={{ marginTop: 8 }}>
                <LivePitchDetector theme={T} inline={true} onPitchDetected={handlePitchDetectedAll} />
              </div>
            )}
            {!mePhrase.length && (
              <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap "New Melody" to hear a phrase. Then sing it back \u2014 the pitch detector verifies each note.
              </div>
            )}
          </div>
        )}

        {/* GUIDED */}
        {mode === 'guided' && !guidedActive && (
          <div>
            {/* Completion message */}
            {guidedComplete && guidedEx !== null && (
              <div style={{
                padding: '12px 16px', borderRadius: T.radiusMd, marginBottom: 12,
                background: T.successSoft, border: `1px solid ${T.success}30`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.success, fontFamily: T.serif, marginBottom: 4 }}>
                  {GUIDED_EXERCISES[guidedEx].title} complete.
                </div>
                <div style={{ fontSize: 11, color: T.textMed }}>
                  Well done. Try another exercise or switch to a different mode to practice what you just learned.
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GUIDED_EXERCISES.map((ex, i) => (
                <button key={ex.id} onClick={() => { setGuidedComplete(false); startGuided(i); }} style={{
                  padding: '10px 14px', borderRadius: T.radiusMd,
                  background: T.bgCard, border: `1px solid ${T.border}`,
                  color: T.textMed, fontSize: 12, textAlign: 'left',
                  cursor: 'pointer', flex: '1 1 140px', minHeight: 44,
                  transition: 'all 0.2s',
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 2, fontFamily: T.serif }}>{ex.title}</div>
                  <div style={{ fontSize: 10, color: T.textMuted }}>{ex.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {mode === 'guided' && guidedActive && guidedEx !== null && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: T.textMuted, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 1 }}>
                {GUIDED_EXERCISES[guidedEx].title} \u2014 {guidedStep + 1}/{GUIDED_EXERCISES[guidedEx].steps.length}
              </span>
              <button onClick={() => { setGuidedActive(false); setGuidedEx(null); }}
                style={{ ...btnStyle(false, T.textMuted), fontSize: 9, padding: '4px 8px', minHeight: 32 }}>Exit</button>
            </div>
            <div style={{
              fontSize: 15, color: T.textDark, lineHeight: 1.6,
              padding: '12px 0', minHeight: 50, fontFamily: T.serif,
            }}>
              {GUIDED_EXERCISES[guidedEx].steps[guidedStep].text}
            </div>
            {/* Progress bar */}
            <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
              {GUIDED_EXERCISES[guidedEx].steps.map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= guidedStep ? rootColor : T.borderSoft,
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
            <button onClick={advanceGuided} style={btnStyle(true, rootColor)}>
              {guidedStep >= GUIDED_EXERCISES[guidedEx].steps.length - 1 ? 'Finish' : 'Next \u2192'}
            </button>
          </div>
        )}

        {/* CHORD TONES */}
        {mode === 'chordTones' && (
          <div>
            <div style={{ fontSize: 12, color: T.textMed, marginBottom: 10, fontStyle: 'italic', fontFamily: T.serif }}>
              {ctChord
                ? `${ctChord.root} ${CHORD_FORMULAS[ctChord.type].name} \u2014 land on these notes on strong beats.`
                : 'Select a chord. Its tones will be highlighted on the fretboard with dashed rings.'}
            </div>
            {/* Diatonic chord buttons */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
              {diatonicChords.map((ch, i) => {
                const sel = ctChord && ctChord.root === ch.root && ctChord.type === ch.type;
                const color = getColorForNote(ch.root);
                return (
                  <button key={i} onClick={() => setCtChord(sel ? null : ch)} style={{
                    padding: isMobile ? '10px 12px' : '6px 10px', borderRadius: T.radius,
                    background: sel ? `${color}15` : T.bgCard,
                    border: `1px solid ${sel ? color : T.borderSoft}`,
                    color: sel ? color : T.textMed, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', fontFamily: T.sans, minHeight: 44,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    transition: 'all 0.2s',
                  }}>
                    <span>{ch.root}{ch.type === 'min' ? 'm' : ''}</span>
                    <span style={{ fontSize: 9, color: T.textMuted }}>{ch.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Chord tone display */}
            {ctChord && ctChordTones.length > 0 && (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: T.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Tones:</span>
                {ctChordTones.map((note, i) => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: getColorForNote(note),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    border: i === 0 ? '2px solid #fff' : '1px dashed rgba(255,255,255,0.6)',
                  }}>{note}</div>
                ))}
                <span style={{ fontSize: 10, color: T.textMuted, marginLeft: 4 }}>
                  = strong beats over {ctChord.root}{ctChord.type === 'min' ? 'm' : ''}
                </span>
              </div>
            )}
            {/* Progression player */}
            <div style={{ borderTop: `1px solid ${T.borderSoft}`, paddingTop: 10, marginTop: 6 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap', marginBottom: 6 }}>
                {!ctProgActive ? (
                  <button onClick={startProgression} style={btnStyle(true, rootColor)}>Play Progression</button>
                ) : (
                  <button onClick={stopProgression} style={btnStyle(false, T.coral)}>Stop</button>
                )}
                <div style={{ display: 'flex', gap: 3 }}>
                  {Object.entries(CHORD_PROGRESSIONS).map(([key, prog]) => (
                    <button key={key} onClick={() => { setCtProgKey(key); if (ctProgActive) stopProgression(); }} style={{
                      padding: '4px 8px', borderRadius: T.radius,
                      background: ctProgKey === key ? `${rootColor}12` : 'transparent',
                      border: `1px solid ${ctProgKey === key ? rootColor + '60' : T.borderSoft}`,
                      color: ctProgKey === key ? T.textDark : T.textMuted,
                      fontSize: 9, fontFamily: T.sans, cursor: 'pointer',
                    }}>{prog.label}</button>
                  ))}
                </div>
              </div>
              {ctProgActive && (
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {ctProgression.map((ch, i) => {
                    const active = i === ctProgStep;
                    const color = getColorForNote(ch.root);
                    return (
                      <div key={i} style={{
                        padding: '6px 10px', borderRadius: T.radius,
                        background: active ? `${color}20` : 'transparent',
                        border: active ? `2px solid ${color}` : `1px solid ${T.borderSoft}`,
                        color: active ? color : T.textMuted,
                        fontSize: 12, fontWeight: active ? 700 : 400, fontFamily: T.sans,
                        transition: 'all 0.2s',
                      }}>{ch.root}{ch.type === 'min' ? 'm' : ''}</div>
                    );
                  })}
                  <span style={{ fontSize: 10, color: T.textMuted, marginLeft: 6, fontStyle: 'italic' }}>
                    Chord tones update as chords change — adapt your playing!
                  </span>
                </div>
              )}
              {!ctProgActive && (
                <div style={{ fontSize: 10, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                  Play a chord progression and watch the strong notes shift. This is how you improvise over changes — not just over a static scale.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ONE NOTE */}
        {mode === 'oneNote' && (
          <div>
            {oneNote ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 4,
                  background: getColorForNote(oneNote),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: T.serif,
                  boxShadow: `0 0 14px ${getColorForNote(oneNote)}50`,
                }}>{oneNote}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: T.textMed, fontStyle: 'italic', fontFamily: T.serif }}>
                    Express everything with timing and feel.
                  </div>
                </div>
                <button onClick={() => setOneNote(null)} style={btnStyle(false, T.textMuted)}>Reset</button>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: T.textMuted, fontStyle: 'italic', fontFamily: T.serif }}>
                Tap any scale note to choose your one note.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── WHEEL + FRETBOARD ── */}
      <div style={{
        display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Color Wheel */}
        <div style={{
          display: 'flex', justifyContent: 'center', flexShrink: 0,
          alignSelf: isMobile ? 'center' : 'flex-start',
        }}>
          <ColorWheel
            theme={T} root={root} scaleNotes={scaleNotes}
            voiceNote={voiceNote}
            activeNote={hfRevealed ? hfTarget?.note : null}
            size={isMobile ? 140 : 160}
            onRootChange={setRoot}
          />
        </div>

        {/* Fretboard */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <FretboardDiagram
            theme={T}
            scaleData={scaleData}
            colorMode={true}
            richTone={true}
            voiceNote={voiceNote || (srActive && srIdx >= 0 && srIdx < srSequence.length ? srSequence[srIdx] : null) || (mode === 'hearFind' && hfRevealed && hfTarget ? hfTarget.note : null)}
            oneNoteFilter={mode === 'oneNote' ? oneNote : null}
            chordToneNotes={mode === 'chordTones' && ctChordTones.length ? ctChordTones : null}
            onNoteTap={handleNoteTap}
          />
        </div>
      </div>

      {/* ── SCALE SELECTOR (compact bottom bar) ── */}
      {!embedded && (
        <div style={{
          padding: '10px 14px', borderRadius: T.radiusMd, marginBottom: 12,
          background: T.bgCard, border: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: settingsOpen ? 10 : 0 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 4,
              background: rootColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: 'monospace', textShadow: '0 1px 3px rgba(0,0,0,0.5)',
              flexShrink: 0,
            }}>{root}</div>
            <span style={{ fontSize: 12, color: T.textDark, fontWeight: 600, fontFamily: T.sans, flex: 1 }}>
              {root} {typeInfo.name}
            </span>
            <button onClick={() => setSettingsOpen(!settingsOpen)} style={{
              background: 'none', border: `1px solid ${T.borderSoft}`, borderRadius: 16,
              padding: '4px 12px', cursor: 'pointer',
              fontSize: 10, color: T.textMuted, fontFamily: T.sans,
            }}>
              {settingsOpen ? 'Done' : 'Change'}
            </button>
          </div>
          {settingsOpen && (
            <div>
              <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 8, fontFamily: T.sans }}>
                Tap the color wheel to change key. Choose a scale below.
              </div>
              <div className="cm-tabs" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
                {Object.entries(SCALE_TYPES).map(([key, info]) => {
                  const sel = key === scaleType;
                  return (
                    <button key={key} onClick={() => setScaleType(key)} style={{
                      padding: '6px 12px', borderRadius: 16,
                      background: sel ? rootColor : 'transparent',
                      border: sel ? 'none' : `1px solid ${T.borderSoft}`,
                      color: sel ? '#fff' : T.textMuted,
                      fontSize: 11, fontFamily: T.sans, cursor: 'pointer',
                      whiteSpace: 'nowrap', fontWeight: sel ? 600 : 400,
                      transition: 'all 0.2s',
                      textShadow: sel ? '0 1px 2px rgba(0,0,0,0.15)' : 'none',
                    }}>{info.name}</button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Session Stats ── */}
      {!embedded && (hfScore.total > 0 || crScore.total > 0 || intScore.total > 0) && (
        <div style={{
          padding: '8px 14px', borderRadius: T.radiusMd,
          background: T.bgCard, border: `1px solid ${T.borderSoft}`,
          display: 'flex', gap: 20, alignItems: 'center',
          fontSize: 11, color: T.textMuted, fontFamily: T.sans,
        }}>
          {hfScore.total > 0 && (
            <div>
              <span style={{ fontWeight: 700, color: rootColor }}>{Math.round(hfScore.hit / hfScore.total * 100)}%</span>
              <span style={{ fontSize: 9, marginLeft: 4 }}>accuracy</span>
            </div>
          )}
          {hfStreak > 0 && (
            <div>
              <span style={{ fontWeight: 700, color: T.textDark }}>{hfStreak}</span>
              <span style={{ fontSize: 9, marginLeft: 4 }}>streak</span>
            </div>
          )}
          <div style={{ marginLeft: 'auto', fontSize: 10, color: T.textLight }}>
            {Math.floor((Date.now() - sessionStart) / 60000)}m session
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorMusicTrainer;
