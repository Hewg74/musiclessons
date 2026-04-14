import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Play, Pause, Volume2, Eye, EyeOff, Settings, RotateCcw, ChevronDown, ChevronUp, Ear, Lock, Check, X } from 'lucide-react';
import { playWarmNote, normalizeNote, getColorForNote, LivePitchDetector } from './JungleTools.jsx';
import { CHROMATIC, generateScale } from './ColorMusicTrainer.jsx';
import { CompactDroneWheel } from './CompactDroneWheel.jsx';

// ═══════════════════════════════════════════════════════════════════════════
// PitchHunter — Al's ear training method
// ═══════════════════════════════════════════════════════════════════════════
//
// Inspired by ear training methods from Al, a professional NYC guitarist.
// Close your eyes. A note plays. Slide to match it.
//
// Progressive levels:
//   L1  Pentatonic Hunt (5 notes, 1 octave)
//   L2  Chromatic Hunt (12 notes, 1 octave)
//   L3  Wide Range (12 notes, 2 octaves)
//   L4  Two-Note Sequence
//   L5  Three-Note Sequence
//   L6  Broken Chord — Slow (800ms)
//   L7  Broken Chord — Fast (200-400ms)
//   L8  Chord Quality Recognition
//   L9  Harmonized Scale
//
// False-positive prevention: 5-gate pipeline
//   Gate 1: LivePitchDetector's built-in smoothing (RMS, median, EMA, hysteresis)
//   Gate 2: Sustained match (±threshold for duration ms)
//   Gate 3: State machine (IDLE → LISTENING → CONVERGING → LOCKED → SUCCESS)
//   Gate 4: Between-note silence gap (multi-note levels)
//   Gate 5: Replay isolation (pause mic during playback)
// ═══════════════════════════════════════════════════════════════════════════

// ─── Mobile hook ───
function useIsMobile(bp = 640) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setM(e.matches);
    mq.addEventListener('change', h); setM(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return m;
}

// ─── Constants ───
const PENTATONIC = ['A', 'C', 'D', 'E', 'G'];
const ALL_CHROMATIC = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];

// Chord quality definitions for levels 6-9
const CHORD_TYPES = {
  major:   { label: 'Major',    intervals: [0, 4, 7],     short: 'MAJ' },
  minor:   { label: 'Minor',    intervals: [0, 3, 7],     short: 'MIN' },
  maj7:    { label: 'Maj7',     intervals: [0, 4, 7, 11], short: 'MAJ7' },
  min7:    { label: 'Min7',     intervals: [0, 3, 7, 10], short: 'MIN7' },
  dom7:    { label: 'Dom7',     intervals: [0, 4, 7, 10], short: 'DOM7' },
  dim:     { label: 'Dim',      intervals: [0, 3, 6],     short: 'DIM' },
  halfdim: { label: 'Half-dim', intervals: [0, 3, 6, 10], short: 'HDIM' },
};

// Harmonized major scale — chord quality for each degree
const HARMONIZED_SCALE = [
  { degree: 'I',   quality: 'maj7',    label: 'MAJ7' },
  { degree: 'ii',  quality: 'min7',    label: 'MIN7' },
  { degree: 'iii', quality: 'min7',    label: 'MIN7' },
  { degree: 'IV',  quality: 'maj7',    label: 'MAJ7' },
  { degree: 'V',   quality: 'dom7',    label: 'DOM7' },
  { degree: 'vi',  quality: 'min7',    label: 'MIN7' },
  { degree: 'vii°',quality: 'halfdim', label: 'HDIM' },
];

// Level definitions
const LEVELS = [
  { id: 1, name: 'Pentatonic Hunt',   roman: 'i',    desc: 'Match random pentatonic notes', notePool: 'pentatonic', noteCount: 1, octaves: 1, rounds: 10, type: 'match' },
  { id: 2, name: 'Chromatic Hunt',    roman: 'ii',   desc: 'All 12 notes, pure randomness',  notePool: 'chromatic',  noteCount: 1, octaves: 1, rounds: 10, type: 'match' },
  { id: 3, name: 'Wide Range',        roman: 'iii',  desc: 'Chromatic across 2 octaves',     notePool: 'chromatic',  noteCount: 1, octaves: 2, rounds: 10, type: 'match' },
  { id: 4, name: 'Two-Note',          roman: 'iv',   desc: 'Match two notes in sequence',    notePool: 'chromatic',  noteCount: 2, octaves: 1, rounds: 8,  type: 'match' },
  { id: 5, name: 'Three-Note',        roman: 'v',    desc: 'Match three notes in sequence',  notePool: 'chromatic',  noteCount: 3, octaves: 1, rounds: 6,  type: 'match' },
  { id: 6, name: 'Broken Chord Slow', roman: 'vi',   desc: 'Chord arpeggiated at 800ms',     notePool: 'chord',      noteCount: 3, octaves: 1, rounds: 8,  type: 'broken', arpSpeed: 800 },
  { id: 7, name: 'Broken Chord Fast', roman: 'vii',  desc: 'Chord arpeggiated at 200-400ms', notePool: 'chord',      noteCount: 3, octaves: 1, rounds: 8,  type: 'broken', arpSpeed: 300 },
  { id: 8, name: 'Chord Quality',     roman: 'viii', desc: 'Identify chord quality by ear',   notePool: 'chord',      noteCount: 0, octaves: 1, rounds: 10, type: 'recognize' },
  { id: 9, name: 'Harmonized Scale',  roman: 'ix',   desc: 'Degree + quality identification', notePool: 'harmonized', noteCount: 0, octaves: 1, rounds: 7,  type: 'harmonized' },
];

// Difficulty presets
const DIFFICULTIES = {
  forgiving: { label: 'Forgiving', cents: 25, sustainMs: 300, silenceGapMs: 200 },
  standard:  { label: 'Standard',  cents: 15, sustainMs: 500, silenceGapMs: 300 },
  strict:    { label: 'Strict',    cents: 8,  sustainMs: 700, silenceGapMs: 400 },
};

// Instrument ranges — by MIDI number to respect true pitch boundaries
// Voice: E3 (52) - A4 (69) — Gene's tenor sweet spot
// Guitar: E2 (40) - E5 (76) — standard 12-fret range
const RANGES = {
  voice:  { minMidi: 52, maxMidi: 69, label: 'Voice (E3–A4)' },
  guitar: { minMidi: 40, maxMidi: 76, label: 'Guitar (E2–E5)' },
};

// State machine states
const S = { IDLE: 'idle', LISTENING: 'listening', CONVERGING: 'converging', LOCKED: 'locked', SUCCESS: 'success', WRONG: 'wrong' };

// ─── Storage ───
const STORE_KEY = 'pitchHunter';
function loadData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}
function saveData(d) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch {}
}
function defaultData() {
  return {
    unlockedLevel: 1,
    instrument: 'voice',
    difficulty: 'standard',
    blindMode: true,
    droneEnabled: false,
    sessions: [],
    srs: {}, // note -> { correct, total, lastSeen }
  };
}

// ─── Note generation helpers ───
// Generate a random note within a MIDI range, respecting the instrument's actual pitch bounds
function randomNoteInRange(pool, minMidi, maxMidi) {
  // Narrow levels (1 octave scope) pick from first half of range; wide levels use full range
  // Build list of valid MIDI numbers whose pitch class is in pool
  const poolMidiClasses = new Set(pool.map(n => noteToMidi(n, 0) % 12));
  const candidates = [];
  for (let m = minMidi; m <= maxMidi; m++) {
    if (poolMidiClasses.has(m % 12)) candidates.push(m);
  }
  if (candidates.length === 0) return null;
  const midi = candidates[Math.floor(Math.random() * candidates.length)];
  const n = midiToNote(midi);
  return { note: n.note, octave: n.octave, full: n.full };
}

function generateTargets(level, range) {
  const ldef = LEVELS[level - 1];
  if (ldef.type === 'recognize' || ldef.type === 'harmonized') return generateChordTarget(level, range);
  if (ldef.type === 'broken') return generateBrokenChordTarget(level, range);

  const pool = ldef.notePool === 'pentatonic' ? PENTATONIC : ALL_CHROMATIC;
  // For narrow levels (octaves=1), restrict to lower octave of range; wide (octaves=2) uses full range
  const fullRange = range.maxMidi - range.minMidi;
  const narrow = ldef.octaves === 1 && fullRange > 12;
  const minMidi = range.minMidi;
  const maxMidi = narrow ? range.minMidi + 12 : range.maxMidi;

  const targets = [];
  for (let i = 0; i < ldef.noteCount; i++) {
    const t = randomNoteInRange(pool, minMidi, maxMidi);
    if (t) targets.push(t);
  }
  return { targets, chordType: null, degree: null };
}

function generateBrokenChordTarget(level, range) {
  const types = ['major', 'minor'];
  const type = types[Math.floor(Math.random() * types.length)];
  const root = ALL_CHROMATIC[Math.floor(Math.random() * ALL_CHROMATIC.length)];
  // Pick root octave so full chord (root + 7 semitones above) fits in range
  const minOct = Math.max(0, Math.floor(range.minMidi / 12) - 1);
  const maxOct = Math.max(minOct, Math.floor((range.maxMidi - 7) / 12) - 1);
  const oct = minOct + Math.floor(Math.random() * Math.max(1, maxOct - minOct + 1));
  const intervals = CHORD_TYPES[type].intervals;
  const rootMidi = noteToMidi(root, oct);
  const targets = intervals.map(iv => {
    const m = rootMidi + iv;
    const n = midiToNote(m);
    return { note: n.note, octave: n.octave, full: n.full };
  });
  return { targets, chordType: type, degree: null };
}

function generateChordTarget(level, range) {
  const chordOct = Math.max(3, Math.floor(range.minMidi / 12) - 1); // Keep chord in mid register
  if (level === 9) {
    // Harmonized scale — pick random degree
    const key = ALL_CHROMATIC[Math.floor(Math.random() * ALL_CHROMATIC.length)];
    const degIdx = Math.floor(Math.random() * 7);
    const deg = HARMONIZED_SCALE[degIdx];
    const rootMidi = noteToMidi(key, chordOct) + [0, 2, 4, 5, 7, 9, 11][degIdx];
    const intervals = CHORD_TYPES[deg.quality].intervals;
    const notes = intervals.map(iv => midiToNote(rootMidi + iv).full);
    return { targets: [], chordNotes: notes, chordType: deg.quality, degree: deg.degree, key };
  }
  // Level 8 — chord quality recognition
  const types = Object.keys(CHORD_TYPES);
  const type = types[Math.floor(Math.random() * types.length)];
  const root = ALL_CHROMATIC[Math.floor(Math.random() * ALL_CHROMATIC.length)];
  const oct = chordOct;
  const rootMidi = noteToMidi(root, oct);
  const intervals = CHORD_TYPES[type].intervals;
  const notes = intervals.map(iv => midiToNote(rootMidi + iv).full);
  return { targets: [], chordNotes: notes, chordType: type, degree: null };
}

// ─── MIDI helpers ───
function noteToMidi(note, oct) {
  const n = note.replace('♭', 'b');
  const map = { 'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11 };
  return (oct + 1) * 12 + (map[n] ?? 0);
}

function midiToNote(midi) {
  const noteNames = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const note = noteNames[midi % 12];
  return { note, octave, full: `${note}${octave}` };
}

function noteToCents(detectedNote, detectedCents, targetNote, targetOctave) {
  // Compare detected pitch to target in cents
  const targetFull = `${targetNote}${targetOctave}`;
  const targetMidi = noteToMidi(targetNote, targetOctave);
  const detectedNoteClean = detectedNote.replace(/[0-9]/g, '');
  const detectedOctave = parseInt(detectedNote.match(/[0-9]/)?.[0] || '4');
  const detectedMidi = noteToMidi(detectedNoteClean, detectedOctave);
  const semitoneDiff = detectedMidi - targetMidi;
  return semitoneDiff * 100 + detectedCents;
}

// ─── Screw (from CompactDroneWheel aesthetic) ───
function Screw({ top, left, right, bottom }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', zIndex: 5,
        ...(top != null && { top }), ...(left != null && { left }),
        ...(right != null && { right }), ...(bottom != null && { bottom }),
        width: 6, height: 6, borderRadius: '50%',
        background: '#B0A898',
        boxShadow: 'inset 0 1px 2px rgba(44, 40, 37, 0.15), 0 1px 0 rgba(255, 255, 255, 0.6)',
      }}
    />
  );
}

// ─── Play chord via PolySynth ───
let chordSynth = null;
async function playChord(notes, duration = '2n') {
  if (Tone.context.state !== 'running') await Tone.context.resume();
  if (chordSynth) { try { chordSynth.dispose(); } catch {} }
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 1.2 },
  }).toDestination();
  chordSynth.volume.value = -10;
  const cleaned = notes.map(n => n.replace('♭', 'b'));
  chordSynth.triggerAttackRelease(cleaned, duration);
  setTimeout(() => { try { chordSynth?.dispose(); chordSynth = null; } catch {} }, 3000);
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════
export function PitchHunter({ theme: T, metro, onBack }) {
  const isMobile = useIsMobile();

  // ─── Persisted state ───
  const [data, setData] = useState(() => loadData() || defaultData());
  const updateData = useCallback((fn) => {
    setData(prev => {
      const next = fn(prev);
      saveData(next);
      return next;
    });
  }, []);

  // ─── Session state ───
  const [currentLevel, setCurrentLevel] = useState(data.unlockedLevel);
  const [phase, setPhase] = useState('menu'); // menu | playing | summary
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [roundResults, setRoundResults] = useState([]); // { correct, convergenceMs, target }
  const [settingsOpen, setSettingsOpen] = useState(false);

  // ─── Round state ───
  const [targets, setTargets] = useState(null); // { targets: [{note, octave, full}], chordType, degree, key, chordNotes }
  const [currentTargetIdx, setCurrentTargetIdx] = useState(0);
  const [state, setState] = useState(S.IDLE);
  const [centsOffset, setCentsOffset] = useState(0); // -100 to +100 for needle
  const [lockProgress, setLockProgress] = useState(0); // 0-100 for ring fill
  const [micActive, setMicActive] = useState(false);
  const [playbackPaused, setPlaybackPaused] = useState(false);
  const [chordGuess, setChordGuess] = useState(null);
  const [degreeGuess, setDegreeGuess] = useState(null);
  const [showResult, setShowResult] = useState(null); // 'correct' | 'wrong' | null

  // ─── Refs for detection pipeline ───
  const lockStartRef = useRef(null);
  const roundStartRef = useRef(null);
  const silenceGapRef = useRef(false);
  const lastPitchRef = useRef(null);
  const animFrameRef = useRef(null);

  const ldef = LEVELS[currentLevel - 1];
  const diff = DIFFICULTIES[data.difficulty];
  const range = RANGES[data.instrument]; // { minMidi, maxMidi, label }

  // ─── Mic control ───
  const pitchCallbackRef = useRef(null);
  const micShouldRun = phase === 'playing' && (ldef.type === 'match' || ldef.type === 'broken');
  const [micMuted, setMicMuted] = useState(false);
  const micMuteTimerRef = useRef(null);
  const muteMic = useCallback((ms) => {
    setMicMuted(true);
    if (micMuteTimerRef.current) clearTimeout(micMuteTimerRef.current);
    micMuteTimerRef.current = setTimeout(() => setMicMuted(false), ms);
  }, []);
  useEffect(() => { setMicActive(micShouldRun && !micMuted); }, [micShouldRun, micMuted]);

  // ─── Cleanup on unmount ───
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (chordSynth) { try { chordSynth.dispose(); } catch {} }
    };
  }, []);

  // ─── Start a round ───
  const startRound = useCallback(() => {
    const gen = generateTargets(currentLevel, range);
    setTargets(gen);
    setCurrentTargetIdx(0);
    setState(S.LISTENING);
    setLockProgress(0);
    setCentsOffset(0);
    setShowResult(null);
    setChordGuess(null);
    setDegreeGuess(null);
    lockStartRef.current = null;
    roundStartRef.current = Date.now();
    silenceGapRef.current = false;

    // Play the target(s) — mute mic during playback + deaf period after
    const DEAF_MS = 900; // Enough for release tail to fade before mic activates
    setTimeout(() => {
      setPlaybackPaused(true);
      if (ldef.type === 'match') {
        // Notes play at 0, 600, 1200... last note duration is ~1s
        gen.targets.forEach((t, i) => {
          setTimeout(() => playWarmNote(t.full, '2n', data.instrument), i * 600);
        });
        const lastNoteEnds = (gen.targets.length - 1) * 600 + 1000;
        const totalMs = lastNoteEnds + DEAF_MS;
        muteMic(totalMs);
        setTimeout(() => setPlaybackPaused(false), totalMs);
      } else if (ldef.type === 'broken') {
        const speed = ldef.arpSpeed || 800;
        gen.targets.forEach((t, i) => {
          setTimeout(() => playWarmNote(t.full, '4n', data.instrument), i * speed);
        });
        const lastNoteEnds = (gen.targets.length - 1) * speed + 500;
        const totalMs = lastNoteEnds + DEAF_MS;
        muteMic(totalMs);
        setTimeout(() => setPlaybackPaused(false), totalMs);
      } else if (ldef.type === 'recognize' || ldef.type === 'harmonized') {
        playChord(gen.chordNotes, '2n');
        const totalMs = 1000 + DEAF_MS;
        muteMic(totalMs);
        setTimeout(() => setPlaybackPaused(false), totalMs);
      }
    }, 200);
  }, [currentLevel, range, ldef]);

  // ─── Start session ───
  const startSession = useCallback(() => {
    setPhase('playing');
    setRound(0);
    setScore(0);
    setRoundResults([]);
    // First round starts after a beat
    setTimeout(() => {
      setRound(1);
      startRound();
    }, 500);
  }, [startRound]);

  // ─── Advance to next round or finish ───
  const advanceRound = useCallback((correct) => {
    const convergenceMs = Date.now() - (roundStartRef.current || Date.now());
    setRoundResults(prev => [...prev, { correct, convergenceMs, target: targets }]);
    if (correct) setScore(prev => prev + 1);

    // SRS update
    if (targets?.targets?.[0]) {
      const noteKey = targets.targets[0].note;
      updateData(d => {
        const srs = { ...d.srs };
        const entry = srs[noteKey] || { correct: 0, total: 0 };
        srs[noteKey] = { correct: entry.correct + (correct ? 1 : 0), total: entry.total + 1, lastSeen: Date.now() };
        return { ...d, srs };
      });
    }

    setShowResult(correct ? 'correct' : 'wrong');
    setState(S.IDLE);

    setTimeout(() => {
      setShowResult(null);
      if (round >= ldef.rounds) {
        // Session complete
        const finalScore = score + (correct ? 1 : 0);
        const pct = Math.round((finalScore / ldef.rounds) * 100);
        // Unlock next level at 80%
        if (pct >= 80 && currentLevel < 9) {
          updateData(d => ({
            ...d,
            unlockedLevel: Math.max(d.unlockedLevel, currentLevel + 1),
          }));
        }
        setPhase('summary');
      } else {
        setRound(prev => prev + 1);
        startRound();
      }
    }, correct ? 800 : 1200);
  }, [round, ldef, score, targets, currentLevel, startRound, updateData]);

  // ─── Replay target ───
  const replay = useCallback(() => {
    if (!targets) return;
    setPlaybackPaused(true);
    const deafMs = 1900; // note (1s) + deaf (900ms)
    muteMic(deafMs);
    if (ldef.type === 'match' || ldef.type === 'broken') {
      const t = targets.targets[currentTargetIdx];
      if (t) playWarmNote(t.full, '2n', data.instrument);
    } else if (targets.chordNotes) {
      playChord(targets.chordNotes, '2n');
    }
    setTimeout(() => setPlaybackPaused(false), deafMs);
  }, [targets, ldef, currentTargetIdx, data.instrument, muteMic]);

  // ─── Pitch detection callback (Gate 2-4) ───
  const handlePitch = useCallback(({ note, cents, freq }) => {
    if (phase !== 'playing' || !targets || playbackPaused) return;
    if (state === S.IDLE || state === S.SUCCESS) return;
    if (ldef.type === 'recognize' || ldef.type === 'harmonized') return; // No mic for recognition levels

    const target = targets.targets[currentTargetIdx];
    if (!target) return;

    // Calculate offset from target in cents
    const totalCents = noteToCents(note, cents, target.note, target.octave);
    setCentsOffset(Math.max(-100, Math.min(100, totalCents)));
    lastPitchRef.current = { note, cents, freq, time: Date.now() };

    const absCents = Math.abs(totalCents);

    // Gate 3: State transitions
    if (absCents <= diff.cents * 2) {
      // Within 2x threshold — converging
      if (state === S.LISTENING) setState(S.CONVERGING);

      if (absCents <= diff.cents) {
        // Within threshold — start or continue lock
        if (state !== S.LOCKED) {
          setState(S.LOCKED);
          lockStartRef.current = Date.now();
        }
        // Gate 2: Sustained match
        const elapsed = Date.now() - (lockStartRef.current || Date.now());
        const progress = Math.min(100, (elapsed / diff.sustainMs) * 100);
        setLockProgress(progress);

        if (elapsed >= diff.sustainMs) {
          // SUCCESS — note matched!
          setState(S.SUCCESS);
          setLockProgress(100);

          // Multi-note: advance to next target
          if (currentTargetIdx < targets.targets.length - 1) {
            setTimeout(() => {
              setCurrentTargetIdx(prev => prev + 1);
              setState(S.LISTENING);
              setLockProgress(0);
              setCentsOffset(0);
              lockStartRef.current = null;
              silenceGapRef.current = true;
              // Gate 4: silence gap, then play next target with deaf period
              setTimeout(() => {
                silenceGapRef.current = false;
                const nextTarget = targets.targets[currentTargetIdx + 1];
                if (nextTarget) {
                  setPlaybackPaused(true);
                  muteMic(1900); // note (1s) + deaf (900ms)
                  playWarmNote(nextTarget.full, '2n', data.instrument);
                  setTimeout(() => setPlaybackPaused(false), 1900);
                }
              }, diff.silenceGapMs);
            }, 300);
          } else {
            // All notes matched
            advanceRound(true);
          }
        }
      } else {
        // Drifted outside threshold — reset lock
        if (state === S.LOCKED) {
          setState(S.CONVERGING);
          lockStartRef.current = null;
          setLockProgress(0);
        }
      }
    } else {
      // Far from target
      if (state === S.LOCKED || state === S.CONVERGING) {
        setState(S.LISTENING);
        lockStartRef.current = null;
        setLockProgress(0);
      }
    }
  }, [phase, targets, currentTargetIdx, state, ldef, diff, playbackPaused, advanceRound]);
  pitchCallbackRef.current = handlePitch;

  // ─── Chord quality guess (L8) ───
  const handleChordGuess = useCallback((type) => {
    if (!targets) return;
    setChordGuess(type);
    const correct = type === targets.chordType;
    advanceRound(correct);
  }, [targets, advanceRound]);

  // ─── Harmonized scale guess (L9) ───
  const handleDegreeGuess = useCallback((quality, degree) => {
    if (!targets) return;
    setChordGuess(quality);
    setDegreeGuess(degree);
    const correct = quality === targets.chordType && degree === targets.degree;
    advanceRound(correct);
  }, [targets, advanceRound]);

  // ─── Session summary stats ───
  const sessionStats = useMemo(() => {
    if (roundResults.length === 0) return null;
    const correct = roundResults.filter(r => r.correct).length;
    const avgTime = Math.round(roundResults.reduce((a, r) => a + r.convergenceMs, 0) / roundResults.length / 100) / 10;
    return {
      correct,
      total: roundResults.length,
      pct: Math.round((correct / roundResults.length) * 100),
      avgTime,
      unlocked: correct / roundResults.length >= 0.8 && currentLevel < 9,
    };
  }, [roundResults, currentLevel]);

  // ─── Needle angle from cents ───
  const needleAngle = useMemo(() => {
    // Map -100..+100 cents to -60..+60 degrees
    return (centsOffset / 100) * 60;
  }, [centsOffset]);

  // ─── Needle color ───
  // Color feedback: green when locked (hitting the note), red-ish when far, gold when converging
  const needleColor = state === S.LOCKED ? '#4CAF50'
    : state === S.SUCCESS ? '#4CAF50'
    : state === S.CONVERGING ? T.gold
    : Math.abs(centsOffset) > 50 ? '#D4615E'
    : T.textDark;
  const activeColor = getColorForNote(targets?.targets?.[currentTargetIdx]?.note || 'A') || T.gold;

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════
  const maxW = 720;

  return (
    <div style={{
      maxWidth: maxW, margin: '0 auto', padding: isMobile ? 16 : 32,
      fontFamily: T.sans, color: T.textDark, minHeight: '100vh',
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes phNeedleSpring {
          0% { transform: rotate(var(--ph-angle)); }
          50% { transform: rotate(calc(var(--ph-angle) + 2deg)); }
          100% { transform: rotate(var(--ph-angle)); }
        }
        @keyframes phLockPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes phSuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes phFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes phAuraBreathe {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes phNeedleSpring { from, to { transform: rotate(var(--ph-angle)); } }
          @keyframes phLockPulse { from, to { opacity: 1; } }
          @keyframes phSuccess { from, to { transform: scale(1); } }
          @keyframes phFadeIn { from, to { opacity: 1; transform: none; } }
          @keyframes phAuraBreathe { from, to { opacity: 0.5; } }
        }
      `}</style>

      {/* ═══ Header ═══ */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onBack}
            aria-label="Back to tools"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: T.textMed, display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontFamily: T.serif, fontSize: isMobile ? 22 : 28, fontWeight: 500, color: T.textDark, margin: 0, letterSpacing: -0.5 }}>
              Pitch Hunter
            </h1>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.textLight || T.textMed, marginTop: 2 }}>
              Aural Focus Environment
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {phase === 'playing' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 600, color: T.gold,
              animation: micActive ? 'phLockPulse 2s ease-in-out infinite' : 'none',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: micActive ? T.gold : T.textMuted }} />
              {micActive ? 'Listening…' : 'Mic off'}
            </div>
          )}
          <button
            onClick={() => setSettingsOpen(prev => !prev)}
            aria-label="Settings"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: T.textMed, display: 'flex' }}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* ═══ Settings Panel ═══ */}
      {settingsOpen && (
        <div style={{
          background: T.bgCard || T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          animation: 'phFadeIn 0.3s ease-out',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.textMuted || T.textMed, marginBottom: 14 }}>
            Parameters
          </div>

          {/* Instrument */}
          <SettingRow label="Instrument" T={T}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['voice', 'guitar'].map(inst => (
                <button key={inst} onClick={() => updateData(d => ({ ...d, instrument: inst }))} style={{
                  padding: '6px 14px', borderRadius: 8, border: `1px solid ${T.border}`, cursor: 'pointer',
                  background: data.instrument === inst ? T.gold : 'transparent',
                  color: data.instrument === inst ? '#fff' : T.textMed,
                  fontSize: 12, fontWeight: 600, fontFamily: T.sans, textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}>{inst}</button>
              ))}
            </div>
          </SettingRow>

          {/* Difficulty */}
          <SettingRow label="Difficulty" T={T}>
            <div style={{ display: 'flex', gap: 4 }}>
              {Object.entries(DIFFICULTIES).map(([k, v]) => (
                <button key={k} onClick={() => updateData(d => ({ ...d, difficulty: k }))} style={{
                  padding: '6px 14px', borderRadius: 8, border: `1px solid ${T.border}`, cursor: 'pointer',
                  background: data.difficulty === k ? T.gold : 'transparent',
                  color: data.difficulty === k ? '#fff' : T.textMed,
                  fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  transition: 'all 0.15s ease',
                }}>{v.label}</button>
              ))}
            </div>
          </SettingRow>

          {/* Blind Mode */}
          <SettingRow label="Blind Mode" T={T}>
            <Toggle value={data.blindMode} onChange={v => updateData(d => ({ ...d, blindMode: v }))} T={T} />
          </SettingRow>

          {/* Drone */}
          <SettingRow label="Reference Drone" T={T}>
            <Toggle value={data.droneEnabled} onChange={v => updateData(d => ({ ...d, droneEnabled: v }))} T={T} />
          </SettingRow>
        </div>
      )}

      {/* ═══ MENU PHASE ═══ */}
      {phase === 'menu' && (
        <div style={{ animation: 'phFadeIn 0.4s ease-out' }}>
          {/* Level Selector — brass panel style */}
          <div style={{
            background: T.bgCard || T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 28,
            padding: isMobile ? 20 : 28,
            position: 'relative',
            boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
            overflow: 'hidden',
          }}>
            <Screw top={12} left={12} />
            <Screw top={12} right={12} />
            <Screw bottom={12} left={12} />
            <Screw bottom={12} right={12} />

            {/* Eyebrow */}
            <div style={{
              textAlign: 'center', marginBottom: 24,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
                color: T.textLight || T.textMed,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              }}>
                <span style={{ width: 32, height: 1, background: T.border }} />
                Curriculum
                <span style={{ width: 32, height: 1, background: T.border }} />
              </div>
            </div>

            {/* Level list */}
            {LEVELS.map((lvl, i) => {
              const unlocked = lvl.id <= data.unlockedLevel;
              const active = lvl.id === currentLevel;
              return (
                <button
                  key={lvl.id}
                  onClick={() => unlocked && setCurrentLevel(lvl.id)}
                  disabled={!unlocked}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    width: '100%', textAlign: 'left',
                    padding: '12px 8px',
                    background: 'transparent',
                    border: 'none', borderBottom: i < LEVELS.length - 1 ? `1px solid ${T.border}40` : 'none',
                    cursor: unlocked ? 'pointer' : 'default',
                    opacity: unlocked ? 1 : 0.35,
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {/* Active dot */}
                  {active && (
                    <div style={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 4, height: 4, borderRadius: '50%', background: T.gold,
                    }} />
                  )}

                  {/* Roman numeral */}
                  <span style={{
                    fontFamily: T.serif, fontStyle: 'italic', fontSize: 14,
                    color: active ? T.gold : T.textMed,
                    minWidth: 28,
                  }}>
                    {lvl.roman}
                  </span>

                  {/* Name */}
                  <span style={{
                    fontFamily: T.sans, fontSize: 14,
                    fontWeight: active ? 700 : 400,
                    color: active ? T.textDark : T.textMed,
                    flex: 1,
                  }}>
                    {lvl.name}
                  </span>

                  {/* Lock icon for locked levels */}
                  {!unlocked && <Lock size={12} color={T.textMuted || T.textMed} />}
                </button>
              );
            })}

            {/* Start button */}
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <button
                onClick={startSession}
                style={{
                  padding: '14px 40px', borderRadius: 40, border: 'none', cursor: 'pointer',
                  background: `radial-gradient(circle at 40% 35%, ${T.gold}, ${T.goldDark || '#A08530'})`,
                  color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: T.sans,
                  letterSpacing: 1, textTransform: 'uppercase',
                  boxShadow: `0 4px 18px ${T.gold}44, inset 0 2px 6px rgba(255,255,255,0.2)`,
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Play size={14} style={{ marginRight: 8, marginBottom: -2 }} />
                Begin Level {currentLevel}
              </button>
            </div>
          </div>

          {/* Attribution */}
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: T.textMuted || T.textMed, fontStyle: 'italic' }}>
            Inspired by ear training methods from Al, a professional NYC guitarist
          </div>
        </div>
      )}

      {/* ═══ PLAYING PHASE ═══ */}
      {phase === 'playing' && (
        <div style={{ animation: 'phFadeIn 0.4s ease-out' }}>
          {/* Level indicator */}
          <div style={{ textAlign: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.textMuted || T.textMed }}>
              Level {currentLevel} · {ldef.name}
            </span>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            {Array.from({ length: ldef.rounds }, (_, i) => {
              const done = i < round - 1 || (i === round - 1 && (state === S.SUCCESS || showResult));
              const current = i === round - 1 && !done;
              const result = roundResults[i];
              return (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: result?.correct ? T.gold : result ? '#D4615E' : current ? `${T.gold}60` : 'transparent',
                  border: `1.5px solid ${result?.correct ? T.gold : result ? '#D4615E' : current ? T.gold : T.textMed}40`,
                  transition: 'all 0.3s ease',
                }} />
              );
            })}
          </div>

          {/* Tuner Stage — matching levels (1-7) */}
          {(ldef.type === 'match' || ldef.type === 'broken') && (
            <div style={{
              background: T.bgCard || T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 28,
              padding: isMobile ? 24 : 40,
              position: 'relative',
              boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
              marginBottom: 20,
              overflow: 'hidden',
            }}>
              <Screw top={12} left={12} />
              <Screw top={12} right={12} />
              <Screw bottom={12} left={12} />
              <Screw bottom={12} right={12} />

              {/* Breathing aura */}
              {state === S.LOCKED && (
                <div aria-hidden="true" style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%', height: 200, borderRadius: '50%',
                  background: `radial-gradient(circle, ${activeColor}22 0%, ${activeColor}00 60%)`,
                  filter: 'blur(20px)', pointerEvents: 'none', zIndex: 0,
                  animation: 'phAuraBreathe 2s ease-in-out infinite',
                }} />
              )}

              {/* Multi-note indicators */}
              {targets && targets.targets.length > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  {targets.targets.map((t, i) => (
                    <div key={i} style={{
                      width: 24, height: 24, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, fontFamily: T.sans,
                      background: i < currentTargetIdx ? T.gold : i === currentTargetIdx ? `${T.gold}30` : 'transparent',
                      color: i < currentTargetIdx ? '#fff' : i === currentTargetIdx ? T.gold : T.textMed,
                      border: `1.5px solid ${i <= currentTargetIdx ? T.gold : T.border}`,
                      transition: 'all 0.3s ease',
                    }}>
                      {i < currentTargetIdx ? <Check size={12} /> : i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Pitch Gauge — same style as LivePitchDetector */}
              {(() => {
                const absCents = Math.abs(centsOffset);
                const gaugeColor = state === S.LOCKED || state === S.SUCCESS ? '#4CAF50'
                  : state === S.CONVERGING ? T.gold
                  : absCents > 50 ? (T.coral || '#D4615E')
                  : (T.textMed || '#6B6B6B');
                const isActive = state !== S.IDLE && state !== S.SUCCESS && !playbackPaused && !micMuted;
                // Map centsOffset (-100..+100) to dot position (0%..100%)
                const clampedCents = Math.max(-50, Math.min(50, centsOffset));
                const dotPos = `${50 + clampedCents}%`;
                return (
                  <div style={{ position: 'relative', zIndex: 1, padding: '0 8px' }}>
                    {/* Lock progress ring */}
                    {lockProgress > 0 && (
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%', margin: '0 auto 16px',
                        border: `3px solid ${T.border}20`,
                        position: 'relative',
                      }}>
                        <svg viewBox="0 0 48 48" width="48" height="48" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                          <circle cx="24" cy="24" r="20" fill="none" stroke={gaugeColor} strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={`${Math.PI * 40}`}
                            strokeDashoffset={`${Math.PI * 40 * (1 - lockProgress / 100)}`}
                            style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                          />
                        </svg>
                        <div style={{
                          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, color: gaugeColor, fontFamily: T.sans,
                        }}>
                          {Math.round(lockProgress)}%
                        </div>
                      </div>
                    )}

                    {/* Flat / 0 / Sharp labels */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textMuted || T.textMed, fontFamily: T.sans, marginBottom: 6 }}>
                      <span style={{ letterSpacing: 0.5 }}>♭ Flat</span>
                      <span style={{
                        color: isActive && absCents <= 10 ? '#4CAF50' : (T.textMuted || T.textMed),
                        fontWeight: 700, fontSize: 11, transition: 'color 0.3s',
                      }}>0</span>
                      <span style={{ letterSpacing: 0.5 }}>Sharp ♯</span>
                    </div>

                    {/* Gauge track */}
                    <div style={{
                      height: 6, borderRadius: 3, position: 'relative', overflow: 'visible',
                      background: `linear-gradient(90deg, ${T.coral || '#D4615E'}20 0%, #4CAF5020 45%, #4CAF5030 50%, #4CAF5020 55%, ${T.coral || '#D4615E'}20 100%)`,
                    }}>
                      {/* Tick marks */}
                      {[0, 25, 50, 75, 100].map(pct => (
                        <div key={pct} style={{
                          position: 'absolute', left: `${pct}%`, top: pct === 50 ? -5 : -3,
                          width: pct === 50 ? 2 : 1,
                          height: pct === 50 ? 16 : 12,
                          background: pct === 50 ? (T.textMed || '#6B6B6B') : (T.textMuted || '#999') + '60',
                          transform: 'translateX(-50%)', borderRadius: 1,
                        }} />
                      ))}

                      {/* Gauge dot */}
                      <div style={{
                        position: 'absolute', top: -8, left: dotPos,
                        width: 22, height: 22, borderRadius: '50%',
                        background: isActive ? gaugeColor : (T.bgCard || '#FAF5EE'),
                        border: isActive ? `2px solid ${T.bgCard || '#FAF5EE'}` : `2px solid ${T.textMuted || '#999'}`,
                        transform: 'translateX(-50%)',
                        transition: 'left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease, opacity 0.3s ease, box-shadow 0.4s ease',
                        opacity: isActive ? 1 : 0.3,
                        zIndex: 2,
                        boxShadow: isActive && absCents <= 10
                          ? `0 0 14px #4CAF5050, 0 2px 4px rgba(0,0,0,0.12)`
                          : '0 2px 4px rgba(0,0,0,0.12)',
                      }} />
                    </div>

                    {/* Cents readout */}
                    <div style={{
                      textAlign: 'center', fontSize: 13, fontFamily: T.sans, fontWeight: 700,
                      color: isActive ? gaugeColor : (T.textMuted || T.textMed),
                      minHeight: 20, marginTop: 8, transition: 'color 0.3s', letterSpacing: 0.5,
                    }}>
                      {isActive ? `${centsOffset > 0 ? '+' : ''}${centsOffset} ¢` : micMuted ? 'Listen…' : ''}
                    </div>

                    {/* Blind mode / note name */}
                    <div style={{ textAlign: 'center', marginTop: 8 }}>
                      {data.blindMode ? (
                        <div style={{
                          fontFamily: T.serif, fontStyle: 'italic', fontSize: 13, color: T.textLight || T.textMed,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}>
                          <EyeOff size={13} /> Blind Mode
                        </div>
                      ) : (
                        <div style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 500, color: T.textDark, letterSpacing: -1 }}>
                          {targets?.targets?.[currentTargetIdx]?.note || '—'}
                          <span style={{ fontSize: 16, color: T.textMed }}>{targets?.targets?.[currentTargetIdx]?.octave || ''}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Success / Wrong flash */}
              {showResult && (
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 28,
                  background: showResult === 'correct' ? `${T.gold}15` : 'rgba(212, 97, 94, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'phSuccess 0.4s ease-out',
                  zIndex: 10, pointerEvents: 'none',
                }}>
                  {showResult === 'correct'
                    ? <Check size={48} color={T.gold} strokeWidth={3} />
                    : <X size={48} color="#D4615E" strokeWidth={3} />
                  }
                </div>
              )}

              {/* Replay + skip buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, position: 'relative', zIndex: 1 }}>
                <button onClick={replay} aria-label="Replay target" style={{
                  background: 'none', border: `1px solid ${T.border}`, borderRadius: 12, padding: '8px 20px',
                  cursor: 'pointer', color: T.textMed, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s ease',
                }}>
                  <Volume2 size={14} /> Replay
                </button>
                <button onClick={() => advanceRound(false)} aria-label="Skip this round" style={{
                  background: 'none', border: `1px solid ${T.border}`, borderRadius: 12, padding: '8px 20px',
                  cursor: 'pointer', color: T.textMed, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s ease',
                }}>
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* Chord Quality Grid — L8 */}
          {ldef.type === 'recognize' && (
            <div style={{
              background: T.bgCard || T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 28,
              padding: isMobile ? 20 : 28,
              position: 'relative',
              boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
              marginBottom: 20,
            }}>
              <Screw top={12} left={12} />
              <Screw top={12} right={12} />

              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.textMuted || T.textMed, marginBottom: 16, textAlign: 'center' }}>
                What chord quality do you hear?
              </div>

              {/* Replay */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <button onClick={replay} style={{
                  background: 'none', border: `1px solid ${T.border}`, borderRadius: 12, padding: '8px 20px',
                  cursor: 'pointer', color: T.textMed, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto', transition: 'all 0.15s ease',
                }}>
                  <Volume2 size={14} /> Replay Chord
                </button>
              </div>

              {/* Button grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                background: `${T.textMed}20`,
                borderRadius: 12,
                overflow: 'hidden',
              }}>
                {Object.entries(CHORD_TYPES).map(([key, ct]) => (
                  <button key={key} onClick={() => handleChordGuess(key)} style={{
                    padding: '16px 12px', border: 'none', cursor: 'pointer',
                    background: chordGuess === key ? (chordGuess === targets?.chordType ? `${T.gold}20` : 'rgba(212,97,94,0.1)') : (T.bgCard || T.bg),
                    color: chordGuess === key ? T.gold : T.textMed,
                    fontSize: 14, fontWeight: 500, fontFamily: T.sans,
                    transition: 'all 0.15s ease',
                  }}>
                    {ct.label}
                  </button>
                ))}
              </div>

              {showResult && (
                <div style={{
                  textAlign: 'center', marginTop: 16, fontSize: 14, fontWeight: 700,
                  color: showResult === 'correct' ? T.gold : '#D4615E',
                  fontFamily: T.serif,
                }}>
                  {showResult === 'correct' ? 'Correct!' : `It was ${CHORD_TYPES[targets?.chordType]?.label || '?'}`}
                </div>
              )}
            </div>
          )}

          {/* Harmonized Scale — L9 */}
          {ldef.type === 'harmonized' && (
            <div style={{
              background: T.bgCard || T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 28,
              padding: isMobile ? 20 : 28,
              position: 'relative',
              boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
              marginBottom: 20,
            }}>
              <Screw top={12} left={12} />
              <Screw top={12} right={12} />

              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.textMuted || T.textMed, marginBottom: 8, textAlign: 'center' }}>
                Harmonized Scale
              </div>

              {targets?.key && (
                <div style={{ textAlign: 'center', fontFamily: T.serif, fontSize: 28, fontWeight: 500, color: T.textDark, marginBottom: 16 }}>
                  Key of {targets.key}
                </div>
              )}

              {/* Replay */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <button onClick={replay} style={{
                  background: 'none', border: `1px solid ${T.border}`, borderRadius: 12, padding: '8px 20px',
                  cursor: 'pointer', color: T.textMed, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto',
                }}>
                  <Volume2 size={14} /> Replay Chord
                </button>
              </div>

              {/* Reference card */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 6, marginBottom: 20,
              }}>
                {HARMONIZED_SCALE.map((deg, i) => (
                  <button key={i} onClick={() => handleDegreeGuess(deg.quality, deg.degree)} style={{
                    padding: '12px 4px', border: `1px solid ${T.border}`, borderRadius: 10,
                    background: degreeGuess === deg.degree ? `${T.gold}20` : 'transparent',
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s ease',
                  }}>
                    <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 16, color: degreeGuess === deg.degree ? T.gold : T.textDark }}>
                      {deg.degree}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.textMuted || T.textMed, marginTop: 2 }}>
                      {deg.label}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div style={{
                  textAlign: 'center', marginTop: 12, fontSize: 14, fontWeight: 700,
                  color: showResult === 'correct' ? T.gold : '#D4615E',
                  fontFamily: T.serif,
                }}>
                  {showResult === 'correct' ? 'Correct!' : `It was ${targets?.degree} (${CHORD_TYPES[targets?.chordType]?.label || '?'})`}
                </div>
              )}
            </div>
          )}

          {/* Real LivePitchDetector — headless, auto-starts when playing */}
          <LivePitchDetector
            theme={T}
            headless={true}
            autoStart={micShouldRun && !micMuted}
            onPitchDetected={micMuted ? null : (p => pitchCallbackRef.current?.(p))}
          />

          {/* Drone (optional) */}
          {data.droneEnabled && targets && (
            <div style={{ marginTop: 8 }}>
              <CompactDroneWheel
                theme={T}
                rootKey={targets?.targets?.[0]?.note || targets?.key || 'A'}
              />
            </div>
          )}
        </div>
      )}

      {/* ═══ SUMMARY PHASE ═══ */}
      {phase === 'summary' && sessionStats && (
        <div style={{ animation: 'phFadeIn 0.5s ease-out' }}>
          <div style={{
            background: T.bgCard || T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 28,
            padding: isMobile ? 24 : 36,
            position: 'relative',
            boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
          }}>
            <Screw top={12} left={12} />
            <Screw top={12} right={12} />
            <Screw bottom={12} left={12} />
            <Screw bottom={12} right={12} />

            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.textLight || T.textMed, textAlign: 'center', marginBottom: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
            }}>
              <span style={{ width: 32, height: 1, background: T.border }} />
              Session Complete
              <span style={{ width: 32, height: 1, background: T.border }} />
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: T.serif, fontSize: 42, fontWeight: 400, color: T.textDark, letterSpacing: -1 }}>
                  {sessionStats.pct}<span style={{ fontSize: 20, color: T.textMed }}>%</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: T.textMuted || T.textMed }}>
                  Accuracy
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: T.serif, fontSize: 42, fontWeight: 400, color: T.textDark, letterSpacing: -1 }}>
                  {sessionStats.avgTime}<span style={{ fontSize: 20, color: T.textMed }}>s</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: T.textMuted || T.textMed }}>
                  Avg Convergence
                </div>
              </div>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: T.serif, fontSize: 18, color: T.textDark }}>
                {sessionStats.correct} / {sessionStats.total} correct
              </div>
            </div>

            {/* Unlock message */}
            {sessionStats.unlocked && (
              <div style={{
                textAlign: 'center', padding: '12px 20px', marginBottom: 20,
                background: `${T.gold}12`, borderRadius: 12, border: `1px solid ${T.gold}30`,
              }}>
                <div style={{ fontFamily: T.serif, fontSize: 16, color: T.gold, fontWeight: 500 }}>
                  Level {currentLevel + 1} Unlocked
                </div>
                <div style={{ fontSize: 12, color: T.textMed, marginTop: 4 }}>
                  {LEVELS[currentLevel]?.name}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => { startSession(); }} style={{
                padding: '12px 28px', borderRadius: 40, border: 'none', cursor: 'pointer',
                background: `radial-gradient(circle at 40% 35%, ${T.gold}, ${T.goldDark || '#A08530'})`,
                color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: T.sans,
                letterSpacing: 0.5, textTransform: 'uppercase',
                boxShadow: `0 4px 18px ${T.gold}44, inset 0 2px 6px rgba(255,255,255,0.2)`,
              }}>
                <RotateCcw size={13} style={{ marginRight: 6, marginBottom: -2 }} /> Play Again
              </button>

              {sessionStats.unlocked && (
                <button onClick={() => { setCurrentLevel(prev => prev + 1); setPhase('menu'); }} style={{
                  padding: '12px 28px', borderRadius: 40, border: `1px solid ${T.gold}`, cursor: 'pointer',
                  background: 'transparent', color: T.gold, fontSize: 13, fontWeight: 700, fontFamily: T.sans,
                  letterSpacing: 0.5, textTransform: 'uppercase',
                }}>
                  Next Level →
                </button>
              )}

              <button onClick={() => setPhase('menu')} style={{
                padding: '12px 28px', borderRadius: 40, border: `1px solid ${T.border}`, cursor: 'pointer',
                background: 'transparent', color: T.textMed, fontSize: 13, fontWeight: 600, fontFamily: T.sans,
              }}>
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small UI components ───
function SettingRow({ label, T, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 0', borderBottom: `1px solid ${T.border}40`,
    }}>
      <span style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans }}>{label}</span>
      {children}
    </div>
  );
}

function Toggle({ value, onChange, T }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      style={{
        width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
        background: value ? T.gold : `${T.textMed}33`,
        position: 'relative', transition: 'background 0.2s ease',
        padding: 0,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        background: T.bgCard || '#fff',
        border: `1px solid ${T.bg}`,
        position: 'absolute', top: 2,
        left: value ? 18 : 2,
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }} />
    </button>
  );
}
