import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Play, Pause, RotateCcw, SkipForward, Lock, Unlock, Shuffle, ChevronDown, ChevronUp, Music } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, DroneGenerator, VolumeMeter, MiniAudioPlayer, AudioRecorder,
} from './JungleTools.jsx';
import { CHROMATIC, CIRCLE_OF_FIFTHS, SCALE_TYPES, generateScale } from './ColorMusicTrainer.jsx';
import GUIDANCE_CACHE from './data/practiceForgeGuidance.json';

// Canonical order used to build combo-mode keys so lookups are deterministic
// regardless of draw order.
const DIM_ORDER = ['pitchConstraint','rhythmConstraint','dynamics','articulation','phraseLength','vocalTechnique','guitarTechnique'];

// Route a card's guidance lookup by its mode.
//   scales → null (no guidance)
//   focus  → GUIDANCE_CACHE.focus[constraintId]
//   combo  → GUIDANCE_CACHE.combos[dim1id_dim2id] (canonically ordered)
//   matrix → GUIDANCE_CACHE.matrix[pitch_rhythm_dynamics]
function lookupGuidance(card) {
  const c = card.constraints;
  const mode = card.mode || 'matrix'; // default to matrix for legacy cards

  if (mode === 'focus') {
    // Find the single qualitative constraint that was actually drawn
    const drawnIds = DIM_ORDER.filter(d => c[d] && typeof c[d] === 'object' && c[d].id);
    if (drawnIds.length !== 1) return null;
    return GUIDANCE_CACHE.focus?.[c[drawnIds[0]].id] || null;
  }

  if (mode === 'combo') {
    const drawnIds = DIM_ORDER.filter(d => c[d] && typeof c[d] === 'object' && c[d].id);
    if (drawnIds.length !== 2) return null;
    const id1 = c[drawnIds[0]].id;
    const id2 = c[drawnIds[1]].id;
    return GUIDANCE_CACHE.combos?.[`${id1}_${id2}`] || null;
  }

  if (mode === 'matrix') {
    // Collect whichever qualitative constraints were actually drawn, in canonical order
    const drawnIds = DIM_ORDER.filter(d => c[d] && typeof c[d] === 'object' && c[d].id);
    if (drawnIds.length < 2) return null;

    // Classic pitch × rhythm × dynamics trio → use the bespoke 210-entry matrix cache
    // Returns the raw entry so rendering is identical to combo mode.
    const isClassicTrio =
      drawnIds.length === 3 &&
      drawnIds.includes('pitchConstraint') &&
      drawnIds.includes('rhythmConstraint') &&
      drawnIds.includes('dynamics');
    if (isClassicTrio) {
      const key = `${c.pitchConstraint.id}_${c.rhythmConstraint.id}_${c.dynamics.id}`;
      const entry = GUIDANCE_CACHE.matrix?.[key];
      if (entry) return entry;
    }

    // Non-classic or missing trio entry → decompose into pair lookups from the combos cache
    const labelFor = (dimId) => ({
      pitchConstraint: 'Pitch',
      rhythmConstraint: 'Rhythm',
      dynamics: 'Dynamics',
      articulation: 'Articulation',
      phraseLength: 'Phrase',
      vocalTechnique: 'Vocal',
      guitarTechnique: 'Guitar',
    }[dimId] || dimId);
    const pairs = [];
    for (let i = 0; i < drawnIds.length; i++) {
      for (let j = i + 1; j < drawnIds.length; j++) {
        const dimA = drawnIds[i], dimB = drawnIds[j];
        const idA = c[dimA].id, idB = c[dimB].id;
        const entry = GUIDANCE_CACHE.combos?.[`${idA}_${idB}`];
        if (entry) {
          pairs.push({ labelA: labelFor(dimA), labelB: labelFor(dimB), entry });
        }
      }
    }
    if (pairs.length === 0) return null;
    // Return a special wrapper object; ChallengeCard detects `.pairs` and renders a multi-pair layout.
    return { _pairs: pairs };
  }

  return null;
}

function lookupScaleCharacter(scaleId) {
  return GUIDANCE_CACHE.scales?.[scaleId] || null;
}

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

// ─── Utilities ───
function weightedPick(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  if (total === 0) return items[Math.floor(Math.random() * items.length)];
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

function gaussianRange(min, max, sweetMin, sweetMax) {
  // 70% chance to land in sweet spot, 30% full range
  if (Math.random() < 0.7) {
    return Math.round(sweetMin + Math.random() * (sweetMax - sweetMin));
  }
  return Math.round(min + Math.random() * (max - min));
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId() {
  return `forge-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// Derive drone chord root from key + scale (Am vs A)
function droneRootFromCard(key, scale) {
  const minorScales = ['minor-pentatonic', 'natural-minor', 'blues', 'dorian', 'phrygian'];
  return minorScales.includes(scale) ? `${key}m` : key;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Backing tracks ───
const BACKING_TRACKS = [
  { src: '/reggae-one-drop-85.mp3', genre: 'reggae', bpm: 85, name: 'Reggae One Drop' },
  { src: '/khruangbin-style-80.mp3', genre: 'desert-blues', bpm: 80, name: 'Khruangbin Style' },
  { src: '/desert-blues-75.mp3', genre: 'desert-blues', bpm: 75, name: 'Desert Blues' },
  { src: '/surf-rock-120.mp3', genre: 'surf', bpm: 120, name: 'Surf Rock' },
  { src: '/soul-funk-groove-90.mp3', genre: 'soul', bpm: 90, name: 'Soul Funk Groove' },
  { src: '/groove-beat-90.mp3', genre: null, bpm: 90, name: 'Groove Beat' },
  { src: '/psych-rock-120.mp3', genre: 'surf', bpm: 120, name: 'Psych Rock' },
  { src: '/deep-soul-groove-80.mp3', genre: 'soul', bpm: 80, name: 'Deep Soul Groove' },
  { src: '/dub-reggae-85.mp3', genre: 'reggae', bpm: 85, name: 'Dub Reggae' },
  { src: '/bossa-nova-75.mp3', genre: null, bpm: 75, name: 'Bossa Nova' },
  { src: '/afrobeat-100.mp3', genre: null, bpm: 100, name: 'Afrobeat' },
  { src: '/ska-upbeat-95.mp3', genre: 'reggae', bpm: 95, name: 'Ska Upbeat' },
  { src: '/cinematic-western-80.mp3', genre: 'desert-blues', bpm: 80, name: 'Cinematic Western' },
  { src: '/reggae-rock-100.mp3', genre: 'reggae', bpm: 100, name: 'Reggae Rock' },
];

function suggestTrack(card) {
  // Match by tempo proximity only — genre is no longer a separate constraint
  // (it emerges from the combination of rhythm + dynamics + articulation choices)
  const tempo = card.constraints.tempo;
  const candidates = [...BACKING_TRACKS].sort((a, b) => Math.abs(a.bpm - tempo) - Math.abs(b.bpm - tempo));
  return candidates[0] || null;
}

// ─── Constraint Dimensions ───
const KEY_WEIGHTS = {
  'A': 4, 'E': 3, 'G': 3, 'D': 2, 'C': 2, 'F': 1, 'B♭': 1,
  'F#': 1, 'B': 1, 'C#': 0.5, 'A♭': 0.5, 'E♭': 0.5,
};

const PITCH_CONSTRAINTS = [
  { id: 'leaps', name: 'Leaps Only', desc: 'Never sing two neighboring notes in a row. Always skip at least one note in the scale when moving. This forces big, dramatic jumps instead of smooth walking.', icon: '↗',
    example: (notes) => notes.length >= 5 ? `Your notes: ${notes.join(', ')}. Try: ${notes[0]}→${notes[2]}→${notes[4]}→${notes[1]} (skipping at least one each time)` : '' },
  { id: 'stepwise', name: 'Stepwise Only', desc: 'Always move to a neighboring note in the scale — never skip. Walking melodies, no jumps allowed. Trains the smooth voice-leading every great melody depends on.', icon: '↘',
    example: (notes) => notes.length >= 5 ? `Your notes: ${notes.join(', ')}. Try: ${notes[0]}→${notes[1]}→${notes[2]}→${notes[1]}→${notes[0]} (only neighbors)` : '' },
  { id: 'arch', name: 'Arch Contour', desc: 'Every phrase must climb up to a peak note and then come back down. The shape is a hill — go up, come down. No flat or downward-only phrases.', icon: '⌢',
    example: (notes) => notes.length >= 5 ? `Try: ${notes[0]}→${notes[2]}→${notes[4]}→${notes[2]}→${notes[0]} (up to ${notes[4]}, back to ${notes[0]})` : '' },
  { id: 'seed', name: 'Seed + Variations', desc: 'Pick any 3 notes as your "seed" idea. Repeat it again and again, but change exactly ONE note each time. The shape stays recognizable while the melody slowly evolves.', icon: '🌱',
    example: (notes) => notes.length >= 4 ? `Seed: ${notes[0]}-${notes[1]}-${notes[2]}. Var 1: ${notes[0]}-${notes[1]}-${notes[3]}. Var 2: ${notes[0]}-${notes[3]}-${notes[2]}.` : '' },
  { id: 'forbidden', name: 'Forbidden Notes', desc: 'Some notes from the scale are off-limits — pretend they don\'t exist. The fewer notes you have, the more rhythm, dynamics, and phrasing have to do the melodic work. This is mastery training.', icon: '🚫', hasExtra: true },
  { id: 'targetLanding', name: 'Target Landing', desc: 'Wander freely through any notes you want, but every phrase MUST end on one specific target note. The journey changes; the destination never does.', icon: '🎯', hasExtra: true },
  { id: 'questionAnswer', name: 'Question & Answer', desc: 'Sing in pairs of phrases. First phrase asks a question (rising or ending unresolved). Second phrase answers (descending, ending on a stable note). Like a musical conversation with yourself.', icon: '❓',
    example: (notes) => notes.length >= 4 ? `Q: ${notes[1]}→${notes[2]}→${notes[3]}? (rising, unfinished) A: ${notes[3]}→${notes[1]}→${notes[0]}. (falling, home)` : '' },
];

// Tempo-aware helper: returns seconds per beat and seconds per bar (4/4)
function tempoTimings(bpm) {
  const beatSec = 60 / bpm;
  return { beatSec, barSec: beatSec * 4 };
}

const RHYTHM_CONSTRAINTS = [
  { id: 'river', name: 'River', desc: 'Even quarter-note flow — one note per beat. Rhythm becomes invisible so melody carries everything.', icon: '🌊',
    example: (notes, tempo) => `At ${tempo} BPM: one note every ${(60/tempo).toFixed(2)}s. Play through all ${notes.length} scale notes in order, then reverse.` },
  { id: 'burst', name: 'Burst', desc: 'Pack 4-6 quick notes at the start of each phrase, then leave 2-3 beats of silence.', icon: '💥',
    example: (notes, tempo) => `At ${tempo} BPM: burst 4 eighth-notes in ~${(2*60/tempo).toFixed(1)}s, then rest ~${(3*60/tempo).toFixed(1)}s.` },
  { id: 'space', name: 'Space', desc: 'At least half of every bar is rest. Each note is precious because there are so few.', icon: '🏝',
    example: (notes, tempo) => `At ${tempo} BPM: 1 bar = ${(4*60/tempo).toFixed(1)}s. Sing for 2 beats, rest for 2+ beats.` },
  { id: 'offbeat', name: 'Offbeat', desc: 'Notes land between the beats, never on 1 or 3. Feel the groove push and pull against the metronome.', icon: '⚡',
    example: (notes, tempo) => `At ${tempo} BPM: metronome clicks on 1,2,3,4 — you sing on the "&" between each click (every ${(30/tempo).toFixed(2)}s offset).` },
  { id: 'rhythmSeed', name: 'Rhythmic Seed', desc: 'Pick a short cell (long-short-short or short-long-rest) and repeat it, varying the pitches each time.', icon: '🔄',
    example: (notes, tempo) => `Seed: quarter-eighth-eighth (${(60/tempo).toFixed(2)}s + ${(30/tempo).toFixed(2)}s + ${(30/tempo).toFixed(2)}s). Keep the rhythm, change the notes.` },
  { id: 'triplets', name: 'Triplets Only', desc: 'Three notes per beat instead of the usual two or four. Forces a different internal pulse — the swung, rolling feel of triplet subdivision instead of the straight square of duple time.', icon: '⋯',
    example: (notes, tempo) => `At ${tempo} BPM: 1 beat = ${(60/tempo).toFixed(2)}s. Each triplet note = ${(20/tempo).toFixed(2)}s. Count "tri-pl-et, tri-pl-et" instead of "1-and-2-and".` },
];

const DYNAMICS_CONSTRAINTS = [
  { id: 'swell', name: 'The Swell', desc: 'Start barely audible, slowly grow to full voice, then drop instantly to silence. Like a wave: build, crest, vanish.', icon: '🌊',
    example: (notes, tempo) => `At ${tempo} BPM: 4 bars = ${(16*60/tempo).toFixed(0)}s. Build for ${(12*60/tempo).toFixed(0)}s, hold peak 1 beat, then silence.` },
  { id: 'terraces', name: 'Terraces', desc: 'Jump suddenly between volume levels — quiet for 2 bars, then medium, then loud. No fading between, just hard switches like climbing stairs.', icon: '🪜',
    example: (notes, tempo) => `Each plateau is 2 bars = ${(8*60/tempo).toFixed(0)}s. Switch dynamic instantly on the downbeat — no fades.` },
  { id: 'whisper', name: 'Whisper', desc: 'Sing the entire round at the quietest volume you can manage — almost inaudible, like telling a secret. Requires MORE breath control, not less.', icon: '🤫' },
  { id: 'accentMap', name: 'Accent Map', desc: 'Sing quietly, but punch one note per bar suddenly loud — then back to quiet. The loud note stands out like a highlighted word.', icon: '🎯',
    example: (notes, tempo) => `1 accent per bar (${(4*60/tempo).toFixed(1)}s window). Try: bar 1 accent on beat 1, bar 2 on beat 3, bar 3 on the "&" of 2.` },
  { id: 'forte', name: 'Constant Forte', desc: 'Sing at full volume throughout — fill the room. No holding back, no quiet moments. Pure power.', icon: '🔊' },
];

const ARTICULATION_CONSTRAINTS = [
  { id: 'legato', name: 'All Legato', desc: 'Smooth and connected — each note flows into the next with no gap between them. One continuous breath of sound, like singing on a single sustained vowel.', icon: '〰️' },
  { id: 'staccato', name: 'All Staccato', desc: 'Short and detached — every note bounces with clear space after it. Like speaking in single syllables with little pauses between each one.', icon: '·' },
  { id: 'slurredPairs', name: 'Slurred Pairs', desc: 'Group every two notes together as a smooth pair, then leave a tiny gap before the next pair. Da-DA, da-DA. Creates a swinging, lilted feel.', icon: '⌒' },
  { id: 'tenuto', name: 'Tenuto', desc: 'Hold every note for its full value — no clipping, no early release. Each note gets its complete time slice, slightly emphasized but still distinct from the next.', icon: '—' },
];

const PHRASE_CONSTRAINTS = [
  { id: '1bar', name: '1-Bar Phrases', desc: 'Fragments — short, punchy ideas. Say one thing and stop. Let the silence respond before you start the next fragment.', bars: 1 },
  { id: '2bar', name: '2-Bar Phrases', desc: 'Sentences — complete musical thoughts with a beginning and end. The natural phrase length for most melodies.', bars: 2 },
  { id: '4bar', name: '4-Bar Phrases', desc: 'Paragraphs — developed melodic arcs with internal shape. Rise, peak, fall, resolve. Room for a real story.', bars: 4 },
  { id: '8bar', name: '8-Bar Phrases', desc: 'Epics — full stories with a beginning, middle, climax, and conclusion. Requires sustained breath and intention across a long arc.', bars: 8 },
];

const VOCAL_CONSTRAINTS = [
  { id: 'chest', name: 'Chest Voice', desc: 'Stay in chest register — feel the vibration in your sternum and ribs.', icon: '🫁' },
  { id: 'head', name: 'Head Voice', desc: 'Light, heady placement — vibration in the mask (cheeks, bridge of nose). Floaty and ethereal.', icon: '💭' },
  { id: 'mixed', name: 'Mixed Voice', desc: 'Bridge chest and head seamlessly — no audible "break" as you move through your range.', icon: '🔀' },
  { id: 'falsetto', name: 'Falsetto', desc: 'Airy top register — breathy and detached from chest resonance.', icon: '🎈' },
  { id: 'breathy', name: 'Breathy', desc: 'More breath than voice. Intimate, close-mic energy.', icon: '💨' },
];

const GUITAR_CONSTRAINTS = [
  { id: 'downstrokes', name: 'Downstrokes Only', desc: 'All downstrokes — heavier attack, driving energy. No upstrokes allowed. Builds wrist endurance and a more aggressive groove.', icon: '⬇' },
  { id: 'fingerpick', name: 'Fingerpick', desc: 'No pick — fingers only. Softer attack, more independent control over each string. Opens up simultaneous bass + melody patterns.', icon: '🤚' },
  { id: 'muted', name: 'Muted', desc: 'Palm-muted or ghost notes throughout — the guitar becomes a percussion instrument. Rhythmic texture with pitched undertones.', icon: '✋' },
  { id: 'hybrid', name: 'Hybrid Picking', desc: 'Pick + fingers simultaneously — pick handles bass strings, fingers pluck the upper strings. Country, jazz, and surf technique.', icon: '🤙' },
  { id: 'slide', name: 'Slide', desc: 'Use a slide for everything — no fretted notes. Forces gliding between pitches and trains pitch accuracy by ear since there are no frets to lock onto.', icon: '➡' },
  { id: 'bends', name: 'Bends Only', desc: 'Every pitch movement happens via string bending instead of moving to a different fret. Trains pitch accuracy by ear and forces expressive note shaping.', icon: '↪' },
];

const OBLIQUE_MODIFIERS = [
  { id: 'honorError', name: 'Honor Thy Error', desc: 'If you play a "wrong" note, build on it — make it the start of something new. Mistakes are doorways.' },
  { id: 'fewerNotes', name: 'Use Fewer Notes', desc: 'Whatever you\'re about to play, use half the notes. Then halve it again. What\'s left is the essence.' },
  { id: 'justLearned', name: 'Just Learned', desc: 'Pretend you just picked up this instrument for the first time. No habits, no shortcuts, pure curiosity.' },
  { id: 'underwater', name: 'Play It Underwater', desc: 'Everything slower, heavier, dreamier. Time moves at half speed. Each note sinks through water.' },
  { id: 'lastTime', name: 'Last Time Ever', desc: 'Play as if you\'ll never play this again. Every note matters. Maximum intention, zero waste.' },
  { id: 'robot', name: 'Mechanical', desc: 'Perfectly even, no expression, robotic — then at the 1-minute mark, rebel. Let the human flood back in.' },
  { id: 'blindfolded', name: 'Eyes Closed', desc: 'Close your eyes for the entire round. Navigate by ear and feel alone. Your fingers know more than you think.' },
  { id: 'storyteller', name: 'The Storyteller', desc: 'Every phrase is a sentence in a story. The melody has a plot: introduction, tension, climax, resolution.' },
];

// ─── Dimension Registry ───
// Each dimension is something the user can practice INDEPENDENTLY of the others.
// Genre/emotion/density were dropped because they emerge from combinations of
// the other dimensions (genre = rhythm + dynamics + articulation, etc.) — they
// aren't primary, orthogonal practice axes.
// Oblique modifiers live in a separate "creative spice" mode, not in the random pool.
const DIMENSIONS = [
  { id: 'key',              label: 'Key',          tier: 1, type: 'quantitative', color: '#d4a373' },
  { id: 'scale',            label: 'Scale',        tier: 1, type: 'quantitative', color: '#9e829c' },
  { id: 'tempo',            label: 'Tempo',        tier: 1, type: 'quantitative', color: '#d97d54' },
  { id: 'pitchConstraint',  label: 'Pitch',        tier: 2, type: 'qualitative',  options: PITCH_CONSTRAINTS,        color: '#d68383' },
  { id: 'rhythmConstraint', label: 'Rhythm',       tier: 2, type: 'qualitative',  options: RHYTHM_CONSTRAINTS,       color: '#d97d54' },
  { id: 'dynamics',         label: 'Dynamics',     tier: 2, type: 'qualitative',  options: DYNAMICS_CONSTRAINTS,     color: '#6b8e9f' },
  { id: 'articulation',     label: 'Articulation', tier: 3, type: 'qualitative',  options: ARTICULATION_CONSTRAINTS, color: '#5b9e8f' },
  { id: 'phraseLength',     label: 'Phrase',       tier: 3, type: 'qualitative',  options: PHRASE_CONSTRAINTS,       color: '#9e829c' },
  { id: 'vocalTechnique',   label: 'Vocal',        tier: 4, type: 'qualitative',  options: VOCAL_CONSTRAINTS,        color: '#d68383', instrument: 'voice' },
  { id: 'guitarTechnique',  label: 'Guitar',       tier: 4, type: 'qualitative',  options: GUITAR_CONSTRAINTS,       color: '#b58454', instrument: 'guitar' },
];

// Oblique modifiers are creative breakthrough prompts, NOT skill-building constraints.
// They're applied as an optional spice on top of any drawn card, not part of the
// random draw. Use them when you want to break out of a habit, not when you're
// trying to build technique.
const OBLIQUE_POOL = OBLIQUE_MODIFIERS;

function getDimensionsForTier(tier) {
  return DIMENSIONS.filter(d => d.tier <= tier).map(d => d.id);
}

// ─── Scale weights by tier ───
function getScaleWeights(tier) {
  return Object.keys(SCALE_TYPES).map(k => {
    if (tier <= 2 && (k === 'dorian' || k === 'mixolydian' || k === 'phrygian')) return 0;
    if (tier <= 3 && k === 'phrygian') return 0;
    if (k === 'minor-pentatonic' || k === 'major-pentatonic') return tier <= 2 ? 4 : 2;
    if (k === 'blues') return 3;
    return 2;
  });
}

// ─── Card Generation ───
// maxConstraints limits how many qualitative constraints appear per card.
// Key, scale, and tempo are always generated. The qualitative pool is shuffled
// and only the first N are drawn — this keeps cognitive load manageable.
function generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount = 0, maxConstraints = 3, mode = 'matrix') {
  const card = {
    id: generateId(),
    timestamp: Date.now(),
    constraints: {},
    activeDimensions: [...activeDimensions],
    tier,
    mode, // 'scales' | 'focus' | 'combo' | 'matrix' — drives guidance lookup
  };

  // Generate key first (needed for forbidden note, target landing, etc.)
  if (activeDimensions.includes('key')) {
    if (lockedDimensions.key !== undefined) {
      card.constraints.key = lockedDimensions.key;
    } else {
      const keys = CHROMATIC;
      const weights = keys.map(k => KEY_WEIGHTS[k] || 1);
      card.constraints.key = weightedPick(keys, weights);
    }
  } else {
    card.constraints.key = 'A'; // fallback
  }

  // Generate scale
  if (activeDimensions.includes('scale')) {
    if (lockedDimensions.scale !== undefined) {
      card.constraints.scale = lockedDimensions.scale;
    } else {
      const scaleKeys = Object.keys(SCALE_TYPES);
      const weights = getScaleWeights(tier);
      card.constraints.scale = weightedPick(scaleKeys, weights);
    }
  } else {
    card.constraints.scale = 'minor-pentatonic';
  }

  // Generate tempo
  if (activeDimensions.includes('tempo')) {
    if (lockedDimensions.tempo !== undefined) {
      card.constraints.tempo = lockedDimensions.tempo;
    } else {
      card.constraints.tempo = gaussianRange(60, 140, 85, 120);
    }
  } else {
    card.constraints.tempo = 90;
  }

  // Collect available qualitative dimensions, separating locked from random
  const scaleData = generateScale(card.constraints.key, card.constraints.scale);
  const scaleNotes = scaleData.notes || [];

  const lockedQualDims = [];
  const availableQualDims = [];
  for (const dimId of activeDimensions) {
    const dim = DIMENSIONS.find(d => d.id === dimId);
    if (!dim || dim.type === 'quantitative') continue;
    if (!dim.options || dim.options.length === 0) continue;
    if (lockedDimensions[dimId] !== undefined) {
      lockedQualDims.push(dimId);
    } else {
      availableQualDims.push(dimId);
    }
  }

  // Locked dims always get included
  for (const dimId of lockedQualDims) {
    card.constraints[dimId] = lockedDimensions[dimId];
  }

  // From the remaining pool, shuffle and pick up to maxConstraints
  const slotsLeft = Math.max(0, maxConstraints - lockedQualDims.length);
  const shuffled = [...availableQualDims].sort(() => Math.random() - 0.5);
  const selectedDims = shuffled.slice(0, slotsLeft);

  for (const dimId of selectedDims) {
    const dim = DIMENSIONS.find(d => d.id === dimId);

    // SRS-weighted pick from the dimension's options
    const weights = dim.options.map(opt => {
      const wKey = `${dimId}:${opt.id}`;
      const w = constraintWeights[wKey] || { easy: 0, good: 0, hard: 0 };
      return Math.max(0.5, 1 + w.hard * 0.5 - w.easy * 0.15);
    });
    const chosen = { ...weightedPick(dim.options, weights) };

    // Generate extra data for specific constraints
    if (chosen.id === 'forbidden' && scaleNotes.length > 2) {
      // Dynamic count: remove 1, 2, or 3 notes — but always leave at least 2 notes remaining.
      // Pentatonic (5 notes): max remove = 3 → leaves 2
      // 7-note scales: max remove = 3 → leaves 4
      const maxRemovable = Math.min(3, scaleNotes.length - 2);
      const removeCount = 1 + Math.floor(Math.random() * maxRemovable);
      const nonRoot = scaleNotes.filter(n => n !== card.constraints.key);
      // Shuffle and take the first N
      const shuffled = [...nonRoot].sort(() => Math.random() - 0.5);
      chosen.forbiddenNotes = shuffled.slice(0, removeCount);
      const allowed = scaleNotes.filter(n => !chosen.forbiddenNotes.includes(n));
      const removeWord = removeCount === 1 ? 'note is' : 'notes are';
      chosen.desc = `${removeCount} scale ${removeWord} off-limits: avoid ${chosen.forbiddenNotes.join(', ')}. Use only the remaining ${allowed.length} notes (${allowed.join(', ')}) to build phrases. The fewer notes you have, the more rhythm, dynamics, and phrasing must carry the melody.`;
      chosen.dynamicExample = `Example phrase using only allowed notes: ${allowed.slice(0, Math.min(4, allowed.length)).join('→')}`;
    }
    if (chosen.id === 'targetLanding' && scaleNotes.length > 0) {
      chosen.targetNote = randomPick(scaleNotes);
      chosen.desc = `Every phrase must resolve to ${chosen.targetNote}. Wander freely through the scale but always land on this note.`;
      const others = scaleNotes.filter(n => n !== chosen.targetNote);
      if (others.length >= 3) {
        chosen.dynamicExample = `Try: ${others[0]}→${others[1]}→${others[2]}→${chosen.targetNote} (wander, then home)`;
      }
    }

    card.constraints[dimId] = chosen;
  }

  // Track which qualitative dims were actually drawn
  card.drawnConstraints = [...lockedQualDims, ...selectedDims];

  // Derive drone root
  card.droneRoot = droneRootFromCard(card.constraints.key, card.constraints.scale);

  // No-immediate-repeat check: compare all drawn constraints, not just pitch+rhythm
  // (higher tiers may not draw those specific dimensions)
  if (history.length > 0 && _retryCount < 5) {
    const last = history[history.length - 1];
    const sameKey = card.constraints.key === last.constraints.key;
    const sameScale = card.constraints.scale === last.constraints.scale;
    let sameConstraints = true;
    const allDimsToCheck = new Set([...(card.drawnConstraints || []), ...(last.drawnConstraints || [])]);
    for (const dimId of allDimsToCheck) {
      const a = card.constraints[dimId]?.id;
      const b = last.constraints[dimId]?.id;
      if (a !== b) { sameConstraints = false; break; }
    }
    if (sameKey && sameScale && sameConstraints) {
      return generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount + 1, maxConstraints);
    }
  }

  // Suggest backing track
  card.suggestedTrack = suggestTrack(card);

  return card;
}

// ─── Session generation ───
function generateSession(count, activeDimensions, lockedDimensions, constraintWeights, tier, maxConstraints = 3, mode = 'matrix') {
  const cards = [];
  const keyCount = {};
  for (let i = 0; i < count; i++) {
    let card;
    let attempts = 0;
    do {
      card = generateCard(activeDimensions, lockedDimensions, cards, constraintWeights, tier, 0, maxConstraints, mode);
      attempts++;
    } while ((keyCount[card.constraints.key] || 0) >= 2 && attempts < 10);
    keyCount[card.constraints.key] = (keyCount[card.constraints.key] || 0) + 1;
    cards.push(card);
  }
  return cards;
}

// ─── localStorage ───
const STORAGE_KEY = 'practiceforge-data';
function loadForgeData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { sessions: [], constraintWeights: {}, settings: null };
}
function saveForgeData(data) {
  try {
    // Cap at 100 sessions
    if (data.sessions.length > 100) data.sessions = data.sessions.slice(-100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ─── Timer Chime ───
let chimeSynth = null;
async function playChime() {
  try {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    if (!chimeSynth || chimeSynth.disposed) {
      chimeSynth = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 1.5, sustain: 0, release: 0.5 },
        volume: -12,
      }).toDestination();
    }
    chimeSynth.triggerAttackRelease('C5', '4n');
    setTimeout(() => chimeSynth.triggerAttackRelease('E5', '4n'), 200);
    setTimeout(() => chimeSynth.triggerAttackRelease('G5', '4n'), 400);
  } catch {}
}

// ═══════════════════════════════════════════
// ─── ChallengeCard ───
// ═══════════════════════════════════════════
function ChallengeCard({
  card, T, entering,
  lockedDimensions = {},
  onToggleLock,
  showFullGuidance = false,
  onToggleFullGuidance,
}) {
  const keyColor = getColorForNote(card.constraints.key) || T.gold;
  const scaleName = SCALE_TYPES[card.constraints.scale]?.name || card.constraints.scale;
  const scaleData = generateScale(card.constraints.key, card.constraints.scale);
  const scaleNotes = scaleData.notes || [];
  const scaleDesc = SCALE_TYPES[card.constraints.scale]?.desc || '';

  // Collect active qualitative constraints for display
  const constraintLines = [];
  const qualDimIds = ['pitchConstraint', 'rhythmConstraint', 'dynamics', 'articulation', 'phraseLength', 'vocalTechnique', 'guitarTechnique'];
  for (const dimId of qualDimIds) {
    const c = card.constraints[dimId];
    if (!c) continue;
    const dim = DIMENSIONS.find(d => d.id === dimId);
    constraintLines.push({ dim, constraint: c });
  }

  // Oblique modifier is rendered separately with italic styling — it's a creative spice, not a constraint
  const oblique = card.constraints.obliqueModifier;

  // Pre-generated LLM guidance — mode-aware routing inside lookupGuidance
  const guidance = lookupGuidance(card);
  const scaleChar = lookupScaleCharacter(card.constraints.scale);

  // Lock chip: small pill at the end of header rows. onToggleLock is a parent callback
  // that adds/removes from lockedDimensions. Tapping an unlocked chip locks the CURRENT
  // drawn value; tapping a locked chip unlocks it.
  const LockChip = ({ dimId, currentValue, label }) => {
    if (!onToggleLock) return null;
    const isLocked = lockedDimensions[dimId] !== undefined;
    const Icon = isLocked ? Lock : Unlock;
    return (
      <button
        type="button"
        onClick={() => onToggleLock(dimId, currentValue)}
        aria-label={isLocked ? `Unlock ${label}` : `Lock ${label} at ${currentValue}`}
        title={isLocked ? `${label} is locked — tap to unlock` : `Lock ${label} at ${currentValue} for future draws`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 7px', borderRadius: 10,
          background: isLocked ? T.goldSoft : 'transparent',
          border: `1px solid ${isLocked ? T.gold : T.border}`,
          color: isLocked ? T.goldDark : T.textMuted,
          fontSize: 10, fontWeight: 600, fontFamily: T.sans,
          textTransform: 'uppercase', letterSpacing: 0.5,
          cursor: 'pointer', transition: 'all 0.15s',
        }}
      >
        <Icon size={10} strokeWidth={2.5} />
        {label}
      </button>
    );
  };

  return (
    <div style={{
      background: T.bgCard,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: '28px 24px',
      boxShadow: `0 2px 12px rgba(181, 132, 84, 0.06), 0 12px 32px rgba(181, 132, 84, 0.04)`,
      position: 'relative',
      overflow: 'hidden',
      animation: entering ? 'forgeCardEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both' : undefined,
    }}>
      {/* Header: Key + Scale */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: keyColor,
            boxShadow: `0 0 8px ${keyColor}40`,
          }} />
          <span style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 500, color: T.textDark, letterSpacing: -0.5 }}>
            {card.constraints.key} {scaleName}
          </span>
        </div>
        {/* Scale description + notes */}
        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.5, marginBottom: 6 }}>
            {scaleDesc}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {scaleNotes.map((note, i) => {
              const nc = getColorForNote(note) || T.textMed;
              return (
                <span key={i} style={{
                  fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  padding: '2px 8px', borderRadius: 10,
                  background: `${nc}18`, color: nc,
                  border: `1px solid ${nc}30`,
                }}>
                  {note}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tempo + lock cluster */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 20,
        color: T.textLight, fontSize: 14, marginBottom: 4, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Music size={14} />
          <span style={{ fontFamily: T.sans, fontWeight: 500 }}>{card.constraints.tempo} BPM</span>
        </div>
        {onToggleLock && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto',
            paddingLeft: 8,
          }}>
            <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, letterSpacing: 0.4 }}>
              PIN
            </span>
            <LockChip dimId="key"   currentValue={card.constraints.key}   label="Key" />
            <LockChip dimId="scale" currentValue={card.constraints.scale} label="Scale" />
            <LockChip dimId="tempo" currentValue={card.constraints.tempo} label="Tempo" />
          </div>
        )}
      </div>

      {/* Divider */}
      {constraintLines.length > 0 && (
        <div style={{ height: 1, background: T.border, margin: '20px 0', opacity: 0.6 }} />
      )}

      {/* Constraint lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {constraintLines.map(({ dim, constraint }) => {
          // Dynamic example: either a pre-computed one from generateCard (forbidden, targetLanding)
          // or computed here from the example() function (uses scaleNotes + tempo where relevant)
          const exampleText = constraint.dynamicExample || (constraint.example ? constraint.example(scaleNotes, card.constraints.tempo) : null);
          return (
            <div key={dim.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              {/* Left color bar */}
              <div style={{
                width: 3, alignSelf: 'stretch', borderRadius: 4,
                background: dim.color, opacity: 0.8, flexShrink: 0,
              }} />
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  {constraint.icon && <span style={{ fontSize: 15 }}>{constraint.icon}</span>}
                  <span style={{
                    fontFamily: T.serif, fontSize: 17, fontWeight: 400, color: T.textDark,
                    lineHeight: 1.3,
                  }}>
                    {constraint.name}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: dim.color, textTransform: 'uppercase',
                    letterSpacing: 0.8, fontFamily: T.sans, opacity: 0.7,
                  }}>
                    {dim.label}
                  </span>
                </div>
                <div style={{
                  fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.6,
                }}>
                  {constraint.desc}
                </div>
                {exampleText && (
                  <div style={{
                    fontFamily: T.sans, fontSize: 12, color: T.textLight, lineHeight: 1.5,
                    marginTop: 4, fontStyle: 'italic', paddingLeft: 2,
                  }}>
                    {exampleText}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LLM-generated guidance — mode-aware with primary + expand-full progressive disclosure.
          - Primary (always visible): scale character italic + headline paragraph
            * focus:  character + whyPractice
            * combo/matrix-trio: interaction
            * matrix-pairs: intro note + first pair's interaction
          - Expanded (behind toggle): steps, examples, etude, watchOut, deeperInsight, etc.
          The expand state is controlled by parent so it persists across card draws.
       */}
      {guidance && (() => {
        const isFocus = card.mode === 'focus';
        const isPairs = !!guidance._pairs;
        const eyebrowStyle = {
          fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase',
          letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6,
        };
        const bodyStyle = { fontFamily: T.sans, fontSize: 13.5, color: T.textDark, lineHeight: 1.6 };
        const listStyle = { margin: 0, paddingLeft: 20, fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.65 };

        // Helper: the DEEP section of a combo-shaped entry (everything after the interaction paragraph)
        const renderComboDeep = (entry) => (
          <>
            <div>
              <div style={eyebrowStyle}>Steps</div>
              <ol style={listStyle}>
                {(entry.steps || []).map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
              </ol>
            </div>
            <div>
              <div style={eyebrowStyle}>Try these phrases</div>
              <ul style={{ ...listStyle, paddingLeft: 0, listStyleType: 'none' }}>
                {(entry.examples || []).map((e, i) => (
                  <li key={i} style={{ marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: T.gold, fontSize: 12 }}>♪</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ ...eyebrowStyle, color: T.warm }}>Watch out</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.6 }}>
                {entry.watchOut}
              </div>
            </div>
            {entry.deeperInsight && (
              <div style={{
                borderTop: `1px dashed ${T.border}`,
                paddingTop: 12,
                fontFamily: T.serif,
                fontSize: 13,
                fontStyle: 'italic',
                color: T.textLight,
                lineHeight: 1.65,
              }}>
                {entry.deeperInsight}
              </div>
            )}
          </>
        );

        // Primary content — the single most important pedagogical sentence(s) for this card
        const primary = isFocus ? (
          <>
            <div>
              <div style={eyebrowStyle}>Character</div>
              <div style={bodyStyle}>{guidance.character}</div>
            </div>
            <div>
              <div style={eyebrowStyle}>Why practice this</div>
              <div style={bodyStyle}>{guidance.whyPractice}</div>
            </div>
          </>
        ) : isPairs ? (
          <>
            <div style={{
              fontFamily: T.sans, fontSize: 12, color: T.textLight,
              fontStyle: 'italic',
            }}>
              Matrix drew three constraints at once — here's how the first pair interacts. Expand to see how every pair plays against the others.
            </div>
            {guidance._pairs[0] && (
              <div>
                <div style={{
                  fontFamily: T.serif, fontSize: 13, fontWeight: 500, color: T.goldDark,
                  letterSpacing: 0.3, marginBottom: 6,
                }}>
                  {guidance._pairs[0].labelA} × {guidance._pairs[0].labelB}
                </div>
                <div style={bodyStyle}>{guidance._pairs[0].entry.interaction}</div>
              </div>
            )}
          </>
        ) : (
          <div>
            <div style={eyebrowStyle}>How they work together</div>
            <div style={bodyStyle}>{guidance.interaction}</div>
          </div>
        );

        // Expanded content
        const expanded = isFocus ? (
          <>
            <div>
              <div style={eyebrowStyle}>Steps</div>
              <ol style={listStyle}>
                {(guidance.steps || []).map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
              </ol>
            </div>
            {guidance.progression && guidance.progression.length > 0 && (
              <div>
                <div style={eyebrowStyle}>Progression</div>
                <ol style={listStyle}>
                  {guidance.progression.map((p, i) => <li key={i} style={{ marginBottom: 4 }}>{p}</li>)}
                </ol>
              </div>
            )}
            <div>
              <div style={eyebrowStyle}>Try these phrases</div>
              <ul style={{ ...listStyle, paddingLeft: 0, listStyleType: 'none' }}>
                {(guidance.examples || []).map((e, i) => (
                  <li key={i} style={{ marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: T.gold, fontSize: 12 }}>♪</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            {guidance.etude && (
              <div>
                <div style={eyebrowStyle}>Etude</div>
                <div style={{ ...bodyStyle, fontFamily: T.serif, fontSize: 13, fontStyle: 'italic', color: T.textMed }}>
                  {guidance.etude}
                </div>
              </div>
            )}
            <div>
              <div style={{ ...eyebrowStyle, color: T.warm }}>Watch out</div>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.6 }}>
                {guidance.watchOut}
              </div>
            </div>
            {guidance.listenTo && (
              <div style={{
                borderTop: `1px dashed ${T.border}`,
                paddingTop: 12,
                fontFamily: T.sans,
                fontSize: 12,
                color: T.textLight,
              }}>
                <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 10, color: T.goldDark, marginRight: 8 }}>
                  Listen to
                </span>
                {guidance.listenTo}
              </div>
            )}
          </>
        ) : isPairs ? (
          <>
            {/* First pair's full content */}
            {guidance._pairs[0] && renderComboDeep(guidance._pairs[0].entry)}
            {/* Remaining pairs */}
            {guidance._pairs.slice(1).map((pair, i) => (
              <div key={i} style={{
                paddingTop: 16,
                borderTop: `1px solid ${T.border}`,
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <div style={{
                  fontFamily: T.serif, fontSize: 14, fontWeight: 500, color: T.goldDark,
                  letterSpacing: 0.3,
                }}>
                  {pair.labelA} × {pair.labelB}
                </div>
                <div>
                  <div style={eyebrowStyle}>How they work together</div>
                  <div style={bodyStyle}>{pair.entry.interaction}</div>
                </div>
                {renderComboDeep(pair.entry)}
              </div>
            ))}
          </>
        ) : (
          renderComboDeep(guidance)
        );

        const hasExpandable = !!expanded;

        return (
          <>
            <div style={{ height: 1, background: T.border, margin: '24px 0 20px', opacity: 0.5 }} />
            <div style={{
              background: T.bgSoft,
              border: `1px solid ${T.borderSoft || T.border}`,
              borderRadius: 10,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {scaleChar && (
                <div style={{
                  fontFamily: T.sans, fontSize: 12, color: T.textLight, lineHeight: 1.6,
                  fontStyle: 'italic', paddingBottom: 10, borderBottom: `1px dashed ${T.border}`,
                }}>
                  {scaleChar.character} <span style={{ opacity: 0.85 }}>{scaleChar.watchPoint}</span>
                </div>
              )}

              {primary}

              {showFullGuidance && (
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 16,
                  paddingTop: 12, borderTop: `1px dashed ${T.border}`,
                  animation: 'forgeGuidanceExpand 0.3s ease-out both',
                }}>
                  {expanded}
                </div>
              )}

              {hasExpandable && (
                <button
                  type="button"
                  onClick={onToggleFullGuidance}
                  aria-expanded={showFullGuidance}
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: showFullGuidance ? 4 : 0,
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: 'transparent',
                    border: `1px solid ${T.border}`,
                    color: T.goldDark,
                    fontSize: 11, fontWeight: 600,
                    fontFamily: T.sans, letterSpacing: 0.8, textTransform: 'uppercase',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                >
                  {showFullGuidance ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {showFullGuidance ? 'Hide full guidance' : 'Show full guidance'}
                </button>
              )}
            </div>
          </>
        );
      })()}

      {/* Oblique modifier */}
      {oblique && (
        <>
          <div style={{ height: 1, background: T.border, margin: '20px 0', opacity: 0.4 }} />
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 15, color: T.textLight,
            textAlign: 'center', lineHeight: 1.6, padding: '4px 8px',
          }}>
            "{oblique.desc}"
          </div>
        </>
      )}

    </div>
  );
}

// ═══════════════════════════════════════════
// ─── CompactTimerStrip ───
// Horizontal, music-object feel. Thin progress bar + digital time + label + inline controls.
// Replaces the old 144×144 circular ForgeTimer — vertical real estate was too precious
// during practice flow to spend on stopwatch decoration.
//
// Behavior:
//   duration === 0 (or falsy) → UNLIMITED stopwatch (counts up, never auto-completes)
//   duration > 0               → countdown that calls onComplete at 0
//
// Also pauses on tab blur when fixed-duration (Page Visibility API). Unlimited mode
// keeps running when the tab is hidden — user may have tabbed away deliberately.
// ═══════════════════════════════════════════
function CompactTimerStrip({ duration, running, onComplete, onToggle, onReset, onEnd, T, isMobile }) {
  const unlimited = !duration || duration <= 0;
  const [remaining, setRemaining] = useState(duration || 0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (unlimited) setElapsed(0);
    else setRemaining(duration);
  }, [duration, unlimited]);

  useEffect(() => {
    if (running) {
      if (unlimited) {
        startTimeRef.current = Date.now() - elapsed * 1000;
        intervalRef.current = setInterval(() => {
          const e = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setElapsed(e);
        }, 250);
      } else {
        startTimeRef.current = Date.now() - (duration - remaining) * 1000;
        intervalRef.current = setInterval(() => {
          const el = Math.floor((Date.now() - startTimeRef.current) / 1000);
          const r = Math.max(0, duration - el);
          setRemaining(r);
          if (r <= 0) {
            clearInterval(intervalRef.current);
            onComplete();
          }
        }, 250);
      }
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, duration, unlimited]);

  // Pause on tab blur for FIXED durations only. Unlimited keeps running.
  useEffect(() => {
    if (unlimited) return;
    const handleVis = () => {
      if (document.visibilityState === 'hidden' && running) {
        onToggle && onToggle();
      }
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, [unlimited, running, onToggle]);

  const progress = unlimited
    ? Math.min(1, elapsed / 600)      // fills over a notional 10-min arc
    : (duration > 0 ? (duration - remaining) / duration : 0);
  const displayTime = unlimited ? elapsed : remaining;
  const label = unlimited ? 'ELAPSED' : 'REMAINING';

  // Deep flow marker — gentle nudge at 30/60 min when unlimited
  const deepFlowNote = unlimited && elapsed >= 1800
    ? elapsed >= 3600 ? 'You\'re deep in flow — over an hour elapsed' : 'You\'re in deep flow — 30+ minutes elapsed'
    : null;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${label} ${formatTime(displayTime)}`}
      style={{
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        padding: '14px 18px',
        boxShadow: `0 1px 6px rgba(181, 132, 84, 0.04)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient progress fill — gold wash behind the row as the round elapses */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(90deg, ${T.goldSoft} 0%, ${T.goldSoft} ${progress * 100}%, transparent ${progress * 100}%)`,
        opacity: 0.6,
        transition: 'all 0.4s linear',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}>
        {/* Time + label (left side, vertical pair) */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flex: isMobile ? '1 1 100%' : '0 0 auto' }}>
          <div style={{
            fontFamily: T.serif, fontSize: 34, fontWeight: 400, color: T.textDark,
            letterSpacing: -1, lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          }}>
            {formatTime(displayTime)}
          </div>
          <div style={{
            fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: T.textLight,
            letterSpacing: 2, textTransform: 'uppercase',
          }}>
            {label}
          </div>
        </div>

        {/* Spacer fills remaining space on desktop */}
        {!isMobile && <div style={{ flex: 1 }} />}

        {/* Control cluster (right side) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: isMobile ? '1 1 100%' : '0 0 auto', justifyContent: isMobile ? 'center' : 'flex-end' }}>
          <button
            onClick={onReset}
            aria-label="Reset timer"
            title="Reset timer"
            style={{
              width: 38, height: 38, borderRadius: 8,
              background: 'transparent', border: `1px solid ${T.border}`,
              color: T.textMuted, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={onToggle}
            aria-label={running ? 'Pause round' : 'Start round'}
            title={running ? 'Pause (Space)' : 'Start round (Space)'}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: T.gold, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 3px 10px rgba(212, 163, 115, 0.35)`,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {running ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" style={{ marginLeft: 2 }} />}
          </button>

          <button
            onClick={onEnd}
            aria-label="End round"
            title="End round"
            style={{
              width: 38, height: 38, borderRadius: 8,
              background: 'transparent', border: `1px solid ${T.border}`,
              color: T.textMuted, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      {deepFlowNote && (
        <div style={{
          marginTop: 8, fontSize: 11, color: T.textLight, fontStyle: 'italic',
          textAlign: 'center', position: 'relative',
        }}>
          {deepFlowNote}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── Main Component ───
// ═══════════════════════════════════════════
export function PracticeForge({ theme: T, metro, onBack, defaultTier = 2 }) {
  const isMobile = useIsMobile();
  const [forgeData, setForgeData] = useState(() => loadForgeData());
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Cleanup chimeSynth on unmount
  useEffect(() => {
    return () => {
      if (chimeSynth && !chimeSynth.disposed) {
        try { chimeSynth.dispose(); } catch {}
        chimeSynth = null;
      }
    };
  }, []);

  // Settings state
  // Mode is the primary user-facing selector. Tier/maxConstraints/activeDimensions
  // are derived from it. Migration: if a persisted mode exists use it, otherwise
  // map the legacy tier setting to a reasonable mode.
  const legacyTier = forgeData.settings?.tier ?? defaultTier;
  const tierToMode = (t) => (t === 1 ? 'scales' : t === 2 ? 'matrix' : 'combo');
  const [mode, setMode] = useState(() => forgeData.settings?.mode ?? tierToMode(legacyTier));
  const [instrument, setInstrument] = useState(() => forgeData.settings?.instrument ?? 'voice');
  // Timer duration: 0 means UNLIMITED (stopwatch, user ends manually). This is the default now —
  // counting down from 3 minutes was interrupting deep practice rounds.
  const [timerDuration, setTimerDuration] = useState(() => forgeData.settings?.timerDuration ?? 0);
  const [lockedDimensions, setLockedDimensions] = useState(() =>
    forgeData.settings?.lockedDimensions ?? {}
  );
  const [sessionCardCount, setSessionCardCount] = useState(() => forgeData.settings?.sessionCardCount ?? 1);

  // Derived: tier, maxConstraints, activeDimensions all come from mode + instrument.
  // This replaces the old user-facing tier/constraints/dimension toggles.
  const { tier, maxConstraints, activeDimensions } = useMemo(() => {
    // Instrument-specific technique dim
    const techDim = instrument === 'guitar' ? 'guitarTechnique' : 'vocalTechnique';
    // Full qualitative pool excluding the OTHER instrument's technique
    const fullQualPool = [
      'pitchConstraint', 'rhythmConstraint', 'dynamics',
      'articulation', 'phraseLength', techDim,
    ];
    const baseDims = ['key', 'scale', 'tempo'];

    if (mode === 'scales') {
      return { tier: 1, maxConstraints: 0, activeDimensions: baseDims };
    }
    if (mode === 'focus') {
      // Draw exactly 1 qualitative constraint from any dimension in the full pool
      return {
        tier: 4,
        maxConstraints: 1,
        activeDimensions: [...baseDims, ...fullQualPool],
      };
    }
    if (mode === 'combo') {
      // Draw exactly 2 qualitative constraints (always from different dims)
      return {
        tier: 4,
        maxConstraints: 2,
        activeDimensions: [...baseDims, ...fullQualPool],
      };
    }
    // Matrix mode — draw 3 constraints from the FULL pool (not just pitch/rhythm/dynamics).
    // The classic pitch×rhythm×dynamics trio is still possible; it's now just one of many
    // possible trios. Guidance lookup handles both: if the classic trio comes up it uses
    // the bespoke 210-entry matrix cache, otherwise it decomposes into 3 pair entries.
    return {
      tier: 4,
      maxConstraints: 3,
      activeDimensions: [...baseDims, ...fullQualPool],
    };
  }, [mode, instrument]);

  // Card state
  const [currentCard, setCurrentCard] = useState(null);
  const [cardEntering, setCardEntering] = useState(false);
  const [sessionCards, setSessionCards] = useState([]);
  const [sessionIndex, setSessionIndex] = useState(0);

  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // force timer reset

  // Post-round state
  const [showRating, setShowRating] = useState(false);
  const [roundStartTime, setRoundStartTime] = useState(null);

  // Advanced tools: expand-on-demand panel state
  // Each key is a tool ID; value is boolean "expanded".
  // Volume meter auto-expands when dynamics constraint is present.
  const [expandedTools, setExpandedTools] = useState({
    fretboard: false,
    volumeMeter: false,
    recorder: false,
    colorWheel: false,
    backingTrack: false,
  });
  const toggleTool = useCallback((toolId) => {
    setExpandedTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  }, []);

  // Guidance expand state — persisted across card draws so power users don't have to
  // click "Show full" every time they flip a card.
  const [showFullGuidance, setShowFullGuidance] = useState(false);

  // History
  const [showHistory, setShowHistory] = useState(false);

  // Persist settings — mode + instrument are the primary user-facing state.
  // tier/maxConstraints/activeDimensions are derived so they're not persisted separately.
  useEffect(() => {
    const updated = { ...forgeData, settings: { mode, instrument, timerDuration, lockedDimensions, sessionCardCount } };
    saveForgeData(updated);
  }, [mode, instrument, timerDuration, lockedDimensions, sessionCardCount]);

  // Lock/unlock a dimension
  const toggleLock = useCallback((dimId, value) => {
    setLockedDimensions(prev => {
      if (prev[dimId] !== undefined) {
        const next = { ...prev };
        delete next[dimId];
        return next;
      }
      return { ...prev, [dimId]: value };
    });
  }, []);

  // Draw a new card
  const drawCard = useCallback(() => {
    setShowRating(false);
    setTimerRunning(false);

    if (sessionCardCount > 1) {
      const cards = generateSession(sessionCardCount, activeDimensions, lockedDimensions, forgeData.constraintWeights, tier, maxConstraints, mode);
      setSessionCards(cards);
      setSessionIndex(0);
      setCurrentCard(cards[0]);
    } else {
      const card = generateCard(activeDimensions, lockedDimensions,
        forgeData.sessions.flatMap(s => s.cards || []), forgeData.constraintWeights, tier, 0, maxConstraints, mode);
      setCurrentCard(card);
      setSessionCards([card]);
      setSessionIndex(0);
    }

    setCardEntering(true);
    setTimeout(() => setCardEntering(false), 700);
    setTimerKey(k => k + 1);
  }, [activeDimensions, lockedDimensions, forgeData, tier, sessionCardCount, maxConstraints, mode]);

  // Sync metro BPM when card changes
  useEffect(() => {
    if (currentCard && metro) {
      metro.changeBpm(currentCard.constraints.tempo);
    }
  }, [currentCard?.constraints?.tempo]);

  // Auto-expand volume meter when dynamics constraint is active
  useEffect(() => {
    if (currentCard?.constraints?.dynamics) {
      setExpandedTools(prev => ({ ...prev, volumeMeter: true }));
    }
  }, [currentCard?.constraints?.dynamics]);

  // Start timer
  const startTimer = useCallback(() => {
    setTimerRunning(true);
    setRoundStartTime(Date.now());
  }, []);

  // Pause/resume
  const toggleTimer = useCallback(() => {
    setTimerRunning(prev => !prev);
  }, []);

  // Timer complete
  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);
    setShowRating(true);
    playChime();
  }, []);

  // Rate round
  const rateRound = useCallback((rating) => {
    if (!currentCard) return;

    const timeUsed = roundStartTime ? Math.floor((Date.now() - roundStartTime) / 1000) : (timerDuration || 0);

    // Update constraint weights
    const newWeights = { ...forgeData.constraintWeights };
    for (const dimId of currentCard.activeDimensions) {
      const c = currentCard.constraints[dimId];
      if (c && typeof c === 'object' && c.id) {
        const wKey = `${dimId}:${c.id}`;
        if (!newWeights[wKey]) newWeights[wKey] = { easy: 0, good: 0, hard: 0 };
        newWeights[wKey][rating]++;
      }
    }

    // Save session
    const cardResult = { ...currentCard, timerDuration, timeUsed, rating };
    const sessions = [...forgeData.sessions];
    const today = new Date().toISOString().split('T')[0];
    let todaySession = sessions.find(s => s.date === today);
    if (!todaySession) {
      todaySession = { id: `session-${Date.now()}`, date: today, tier, cards: [], totalTime: 0 };
      sessions.push(todaySession);
    }
    todaySession.cards.push(cardResult);
    todaySession.totalTime += timeUsed;

    const updated = { ...forgeData, sessions, constraintWeights: newWeights };
    setForgeData(updated);
    saveForgeData(updated);
    setShowRating(false);

    // Advance to next card in session or finish
    if (sessionIndex < sessionCards.length - 1) {
      const nextIdx = sessionIndex + 1;
      setSessionIndex(nextIdx);
      setCurrentCard(sessionCards[nextIdx]);
      setCardEntering(true);
      setTimeout(() => setCardEntering(false), 700);
      setTimerKey(k => k + 1);
    } else {
      // Session complete
      setCurrentCard(null);
      setSessionCards([]);
      setSessionIndex(0);
    }
  }, [currentCard, forgeData, timerDuration, roundStartTime, sessionCards, sessionIndex, tier]);

  // End early
  const endEarly = useCallback(() => {
    setTimerRunning(false);
    setShowRating(true);
  }, []);

  // One more round — re-run the timer on the SAME card (no re-draw).
  // Clears the rating panel and resets the timer.
  const oneMoreRound = useCallback(() => {
    setShowRating(false);
    setTimerRunning(false);
    setTimerKey(k => k + 1);
    setRoundStartTime(null);
  }, []);

  // End session — bail out of a multi-card session early.
  const endSession = useCallback(() => {
    setCurrentCard(null);
    setSessionCards([]);
    setSessionIndex(0);
    setShowRating(false);
    setTimerRunning(false);
  }, []);

  // Back handler with audio cleanup
  const handleBack = useCallback(() => {
    setTimerRunning(false);
    if (chimeSynth && !chimeSynth.disposed) {
      try { chimeSynth.dispose(); } catch {}
      chimeSynth = null;
    }
    onBack();
  }, [onBack]);

  // Keyboard shortcuts:
  //   Space       → toggle timer play/pause (when a card is active, not typing in a field)
  //   1/2/3       → Easy/Good/Hard (when rating panel is showing)
  //   Escape      → close overflow menu
  //   n           → draw new card (when no timer running)
  useEffect(() => {
    const handleKey = (e) => {
      // Ignore if user is typing in an input
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;

      if (showRating) {
        if (e.key === '1') { e.preventDefault(); rateRound('easy'); return; }
        if (e.key === '2') { e.preventDefault(); rateRound('good'); return; }
        if (e.key === '3') { e.preventDefault(); rateRound('hard'); return; }
      }

      if (currentCard && e.code === 'Space' && !showRating) {
        e.preventDefault();
        if (timerRunning) toggleTimer();
        else startTimer();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentCard, showRating, timerRunning, rateRound, toggleTimer, startTimer]);

  // Scale data for fretboard
  const scaleData = useMemo(() => {
    if (!currentCard) return null;
    return generateScale(currentCard.constraints.key, currentCard.constraints.scale);
  }, [currentCard?.constraints?.key, currentCard?.constraints?.scale]);

  // Recent history (last 10)
  const recentHistory = useMemo(() => {
    const allCards = forgeData.sessions.flatMap(s => (s.cards || []).map(c => ({ ...c, date: s.date })));
    return allCards.slice(-10).reverse();
  }, [forgeData.sessions]);

  // ─── Mode descriptions ───
  const MODE_DESCRIPTIONS = {
    scales:  'Scale Runner — just key, scale, and tempo. No constraints. Noodle freely and internalize the palette.',
    focus:   'Focus — ONE constraint at a time. Deep single-target practice. This is where real instincts get rewired. Most serious practice lives here.',
    combo:   'Combo — TWO constraints from different categories. Balanced integration practice. Pair a melodic rule with a delivery rule and hear how they interact.',
    matrix:  'Matrix — THREE constraints at once from the full pool. Composition-pressure mode: any trio of pitch, rhythm, dynamics, articulation, phrase, or technique. Harder; save it for occasional creative challenge, not daily drilling.',
  };
  const MODE_LABELS = { scales: 'Scales', focus: 'Focus', combo: 'Combo', matrix: 'Matrix' };

  // ─── Render ───
  // Wider than the default 480 — the guidance block has a lot of text per card
  // and the old width wasted ~40% of a desktop viewport on empty margins.
  const maxW = 820;
  const MODES = ['scales', 'focus', 'combo', 'matrix'];

  // Advanced tool descriptors for the expand-on-demand bar
  const advancedTools = [
    { id: 'fretboard',    label: 'Fretboard',  icon: '⛶',  available: !!scaleData },
    { id: 'volumeMeter',  label: 'Meter',      icon: '◉',  available: true },
    { id: 'colorWheel',   label: 'Wheel',      icon: '◐',  available: !!scaleData },
    { id: 'backingTrack', label: 'Track',      icon: '♫',  available: !!currentCard?.suggestedTrack },
    { id: 'recorder',     label: 'Record',     icon: '●',  available: true },
  ];

  return (
    <div
      style={{
        maxWidth: maxW, margin: '0 auto',
        padding: isMobile ? '14px 14px 120px' : '20px 20px 120px',
        fontFamily: T.sans,
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes forgeCardEnter {
          from { opacity: 0; transform: translateY(40px) scale(0.95) rotate(-2deg); }
          to { opacity: 1; transform: translateY(0) scale(1) rotate(0); }
        }
        @keyframes forgeGuidanceExpand {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 4000px; }
        }
        @keyframes forgeToolExpand {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes forgeCardEnter { from { opacity: 0; } to { opacity: 1; } }
          @keyframes forgeGuidanceExpand { from { opacity: 0; } to { opacity: 1; } }
          @keyframes forgeToolExpand { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>

      {/* ═══ Header: back arrow + title + ⋮ overflow ═══ */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleBack}
            aria-label="Back to tools"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, color: T.textMed, display: 'flex', alignItems: 'center',
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{
            fontFamily: T.serif, fontSize: isMobile ? 20 : 24, fontWeight: 500,
            color: T.textDark, margin: 0, letterSpacing: -0.5,
          }}>
            Practice Forge
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Instrument toggle — voice/guitar pill */}
          <div
            role="tablist"
            aria-label="Instrument"
            style={{
              display: 'flex', padding: 3, borderRadius: 8,
              background: T.bgSoft, border: `1px solid ${T.border}`,
            }}
          >
            {['voice', 'guitar'].map(inst => (
              <button
                key={inst}
                role="tab"
                aria-selected={instrument === inst}
                onClick={() => setInstrument(inst)}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: 'none',
                  background: instrument === inst ? T.goldSoft : 'transparent',
                  color: instrument === inst ? T.goldDark : T.textMed,
                  fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                  textTransform: 'capitalize', cursor: 'pointer',
                  letterSpacing: 0.3, transition: 'all 0.15s',
                }}
              >
                {inst}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            aria-label="More options"
            aria-expanded={settingsOpen}
            style={{
              background: settingsOpen ? T.goldSoft : 'transparent',
              border: `1px solid ${settingsOpen ? T.gold : T.border}`,
              borderRadius: 8, width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: settingsOpen ? T.goldDark : T.textMed,
              transition: 'all 0.15s',
            }}
          >
            {/* Three-dot overflow glyph */}
            <span style={{ fontSize: 20, letterSpacing: 1, lineHeight: 0.5 }}>⋮</span>
          </button>
        </div>
      </div>

      {/* ═══ Mode chip row (Tier 1 — always visible) ═══ */}
      <div
        role="tablist"
        aria-label="Practice mode"
        style={{
          display: 'flex', gap: isMobile ? 4 : 6, marginBottom: 8,
        }}
      >
        {MODES.map(m => {
          const active = mode === m;
          return (
            <button
              key={m}
              role="tab"
              aria-selected={active}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: isMobile ? '10px 4px' : '12px 8px',
                borderRadius: 10,
                border: `1px solid ${active ? T.gold : T.border}`,
                background: active ? T.goldSoft : T.bgCard,
                color: active ? T.goldDark : T.textMed,
                fontSize: isMobile ? 12 : 13,
                fontWeight: active ? 700 : 500,
                fontFamily: T.sans, cursor: 'pointer',
                letterSpacing: 0.3,
                transition: 'all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transform: active ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: active ? `0 3px 10px rgba(212, 163, 115, 0.22)` : 'none',
              }}
            >
              {MODE_LABELS[m]}
            </button>
          );
        })}
      </div>

      {/* Mode hint — always visible, one-line contextual explainer */}
      <div style={{
        fontSize: isMobile ? 11 : 12, color: T.textLight, lineHeight: 1.5,
        fontFamily: T.sans, marginBottom: 18,
        padding: '0 2px',
      }}>
        {MODE_DESCRIPTIONS[mode]}
      </div>

      {/* ═══ Overflow menu (⋮) — duration, session count, draw pool readout ═══ */}
      {settingsOpen && (
        <div
          role="menu"
          style={{
            marginBottom: 22, padding: 18,
            background: T.bgSoft, borderRadius: 10,
            border: `1px solid ${T.borderSoft}`,
            animation: 'forgeToolExpand 0.25s ease-out both',
          }}
        >
          {/* Timer duration */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Round Duration
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { s: 0, l: '∞' }, { s: 90, l: '1:30' }, { s: 120, l: '2:00' },
                { s: 180, l: '3:00' }, { s: 300, l: '5:00' },
              ].map(({ s, l }) => (
                <button
                  key={s}
                  onClick={() => setTimerDuration(s)}
                  style={{
                    flex: '1 1 60px', padding: '9px 0',
                    border: `1px solid ${timerDuration === s ? T.gold : T.border}`,
                    borderRadius: 6,
                    fontSize: 13, fontWeight: timerDuration === s ? 700 : 400,
                    fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.15s',
                    background: timerDuration === s ? T.goldSoft : 'transparent',
                    color: timerDuration === s ? T.goldDark : T.textMed,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6, lineHeight: 1.5 }}>
              ∞ is the stopwatch default — end the round when you're ready. Fixed durations pause on tab blur so you don't lose time to a notification.
            </div>
          </div>

          {/* Session card count */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Cards per Session
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 3, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setSessionCardCount(n)}
                  style={{
                    flex: 1, padding: '9px 0',
                    border: `1px solid ${sessionCardCount === n ? T.gold : T.border}`,
                    borderRadius: 6,
                    fontSize: 13, fontWeight: sessionCardCount === n ? 700 : 400,
                    fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.15s',
                    background: sessionCardCount === n ? T.goldSoft : 'transparent',
                    color: sessionCardCount === n ? T.goldDark : T.textMed,
                  }}
                >
                  {n === 1 ? 'Single' : `${n} cards`}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6, lineHeight: 1.5 }}>
              Multi-card sessions enforce key variety — nothing repeats more than twice.
            </div>
          </div>

          {/* Draw pool readout */}
          <div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Draw Pool ({MODE_LABELS[mode]}, {instrument})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {DIMENSIONS
                .filter(dim => activeDimensions.includes(dim.id) && dim.type === 'qualitative')
                .map(dim => (
                  <div key={dim.id} style={{
                    padding: '6px 11px', borderRadius: 14, fontSize: 11, fontWeight: 600,
                    fontFamily: T.sans,
                    border: `1px solid ${dim.color}60`,
                    background: `${dim.color}12`,
                    color: dim.color,
                  }}>
                    {dim.label}
                  </div>
                ))}
              {activeDimensions.filter(id => DIMENSIONS.find(d => d.id === id)?.type === 'qualitative').length === 0 && (
                <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic' }}>
                  No qualitative constraints — pure scale practice.
                </div>
              )}
            </div>
          </div>

          {/* Clear all locks (only shown when some are set) */}
          {Object.keys(lockedDimensions).length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Pinned: {Object.keys(lockedDimensions).join(', ')}
              </div>
              <button
                onClick={() => setLockedDimensions({})}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: `1px solid ${T.border}`,
                  background: 'transparent', color: T.textMed, fontSize: 11,
                  fontFamily: T.sans, cursor: 'pointer', fontWeight: 600,
                }}
              >
                Clear all pins
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══ IDLE state: draw panel + recent history ═══ */}
      {!currentCard && (
        <>
          {/* Primary draw button */}
          <button
            onClick={drawCard}
            style={{
              width: '100%',
              padding: isMobile ? '18px 24px' : '22px 28px',
              borderRadius: 12,
              background: `linear-gradient(135deg, ${T.gold} 0%, ${T.goldDark} 100%)`,
              color: '#fff', border: 'none',
              fontSize: isMobile ? 15 : 17, fontWeight: 600, fontFamily: T.sans,
              cursor: 'pointer', letterSpacing: 0.8,
              boxShadow: `0 4px 14px rgba(212, 163, 115, 0.32)`,
              marginBottom: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 6px 18px rgba(212, 163, 115, 0.4)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 14px rgba(212, 163, 115, 0.32)`;
            }}
          >
            <Shuffle size={20} />
            Draw {MODE_LABELS[mode]} Card
          </button>

          {/* Recent history */}
          {recentHistory.length > 0 ? (
            <div>
              <div style={{
                fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
                textTransform: 'uppercase', marginBottom: 10, paddingLeft: 2,
              }}>
                Recently Practiced
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {recentHistory.slice(0, 5).map((card, i) => {
                  const kc = getColorForNote(card.constraints?.key) || T.gold;
                  const ratingColor = card.rating === 'easy' ? T.success : card.rating === 'hard' ? T.coral : T.goldDark;
                  const drawnLabels = (card.drawnConstraints || [])
                    .map(dimId => {
                      const c = card.constraints?.[dimId];
                      return c?.name;
                    })
                    .filter(Boolean)
                    .slice(0, 3)
                    .join(' · ');
                  return (
                    <div
                      key={card.id || i}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 13px',
                        background: T.bgCard, border: `1px solid ${T.borderSoft}`,
                        borderRadius: 8,
                      }}
                    >
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: kc, flexShrink: 0,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, color: T.textDark,
                          fontFamily: T.sans, fontWeight: 600,
                        }}>
                          {card.constraints?.key} {SCALE_TYPES[card.constraints?.scale]?.name || ''}
                        </div>
                        {drawnLabels && (
                          <div style={{
                            fontSize: 11, color: T.textLight,
                            fontFamily: T.sans,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {drawnLabels}
                          </div>
                        )}
                      </div>
                      {card.rating && (
                        <div style={{
                          fontSize: 10, fontWeight: 700, color: ratingColor,
                          textTransform: 'uppercase', letterSpacing: 0.6,
                        }}>
                          {card.rating}
                        </div>
                      )}
                      <div style={{ fontSize: 10, color: T.textMuted }}>
                        {card.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* First-ever open onboarding */
            <div style={{
              textAlign: 'center', padding: '36px 24px', color: T.textMuted,
              fontFamily: T.sans, fontSize: 14, background: T.bgSoft,
              borderRadius: 10, border: `1px dashed ${T.border}`,
            }}>
              <div style={{
                fontFamily: T.serif, fontSize: 18, color: T.textLight, marginBottom: 8,
              }}>
                Your first round
              </div>
              <div style={{ lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
                <strong style={{ color: T.goldDark }}>Start with Focus</strong> — one constraint at a time.
                Deep single-target practice is where real musical instincts get rewired. Hit Draw above and follow the card.
              </div>
            </div>
          )}
        </>
      )}

      {/* ═══ ACTIVE state: card + timer + inline tools + advanced bar ═══ */}
      {currentCard && (
        <>
          {/* Session progress indicator */}
          {sessionCards.length > 1 && (
            <div style={{
              display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center',
              marginBottom: 14,
            }}>
              {sessionCards.map((_, i) => (
                <div key={i} style={{
                  width: i === sessionIndex ? 18 : 9, height: 9, borderRadius: 6,
                  background: i === sessionIndex ? T.gold : i < sessionIndex ? T.success : T.border,
                  transition: 'all 0.3s',
                }} />
              ))}
              <button
                onClick={endSession}
                style={{
                  marginLeft: 12, padding: '4px 10px', borderRadius: 6,
                  background: 'transparent', border: `1px solid ${T.border}`,
                  color: T.textMuted, fontSize: 10, fontWeight: 600,
                  fontFamily: T.sans, cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}
              >
                End Session
              </button>
            </div>
          )}

          {/* The card */}
          <ChallengeCard
            card={currentCard}
            T={T}
            entering={cardEntering}
            lockedDimensions={lockedDimensions}
            onToggleLock={toggleLock}
            showFullGuidance={showFullGuidance}
            onToggleFullGuidance={() => setShowFullGuidance(v => !v)}
          />

          {/* Compact timer strip (directly below the card — no scrolling) */}
          <div style={{ marginTop: 16 }}>
            <CompactTimerStrip
              key={timerKey}
              duration={timerDuration}
              running={timerRunning}
              onComplete={handleTimerComplete}
              onToggle={timerRunning ? toggleTimer : startTimer}
              onReset={() => { setTimerKey(k => k + 1); setTimerRunning(false); }}
              onEnd={endEarly}
              T={T}
              isMobile={isMobile}
            />
          </div>

          {/* Inline Metronome row — Tier 1, always visible, no scroll */}
          {metro && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', marginTop: 10,
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
            }}>
              <div style={{
                fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: T.textLight,
                textTransform: 'uppercase', letterSpacing: 1, minWidth: 72,
              }}>
                Metronome
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))}
                  aria-label="Decrease BPM"
                  style={{
                    width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`,
                    background: T.bgSoft, fontSize: 16, color: T.textMed, cursor: 'pointer',
                  }}
                >−</button>
                <div style={{
                  fontFamily: T.serif, fontSize: 18, fontWeight: 500, color: T.textDark,
                  minWidth: 40, textAlign: 'center', fontVariantNumeric: 'tabular-nums',
                }}>{metro.bpm}</div>
                <button
                  onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))}
                  aria-label="Increase BPM"
                  style={{
                    width: 28, height: 28, borderRadius: 6, border: `1px solid ${T.border}`,
                    background: T.bgSoft, fontSize: 16, color: T.textMed, cursor: 'pointer',
                  }}
                >+</button>
                {metro.bpm !== currentCard.constraints.tempo && (
                  <button
                    onClick={() => metro.changeBpm(currentCard.constraints.tempo)}
                    title={`Reset to ${currentCard.constraints.tempo}`}
                    style={{
                      marginLeft: 4, padding: '4px 8px', borderRadius: 6, border: 'none',
                      background: T.goldSoft, color: T.goldDark,
                      fontSize: 9, fontWeight: 700, fontFamily: T.sans, cursor: 'pointer',
                      textTransform: 'uppercase', letterSpacing: 0.5,
                    }}
                  >
                    {currentCard.constraints.tempo}
                  </button>
                )}
              </div>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => metro.playing ? metro.stop() : metro.start()}
                style={{
                  padding: '7px 16px', borderRadius: 6, border: 'none',
                  background: metro.playing ? T.coral : T.gold, color: '#fff',
                  fontSize: 11, fontWeight: 700, fontFamily: T.sans, cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}
              >
                {metro.playing ? 'Stop' : 'Start'}
              </button>
            </div>
          )}

          {/* Inline Drone row — Tier 1 */}
          <div style={{
            padding: '12px 16px', marginTop: 8,
            background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <div style={{
                fontFamily: T.sans, fontSize: 12, fontWeight: 700, color: T.textLight,
                textTransform: 'uppercase', letterSpacing: 1, minWidth: 72,
              }}>
                Drone
              </div>
              <div style={{
                fontFamily: T.serif, fontSize: 15, fontWeight: 500, color: T.textDark,
              }}>
                {currentCard.droneRoot}
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontStyle: 'italic' }}>
                root tone reference
              </div>
            </div>
            <DroneGenerator theme={T} inline={true} defaultRoot={currentCard.droneRoot} />
          </div>

          {/* Advanced tools bar — toggle chips */}
          <div style={{ marginTop: 14 }}>
            <div style={{
              display: 'flex', gap: 6, flexWrap: isMobile ? 'nowrap' : 'wrap',
              overflowX: isMobile ? 'auto' : 'visible',
              paddingBottom: isMobile ? 4 : 0,
            }}>
              {advancedTools.filter(t => t.available).map(tool => {
                const expanded = expandedTools[tool.id];
                return (
                  <button
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    aria-expanded={expanded}
                    aria-label={`${expanded ? 'Hide' : 'Show'} ${tool.label}`}
                    style={{
                      flexShrink: 0,
                      padding: '8px 14px', borderRadius: 20,
                      border: `1px solid ${expanded ? T.gold : T.border}`,
                      background: expanded ? T.goldSoft : T.bgCard,
                      color: expanded ? T.goldDark : T.textMed,
                      fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                      textTransform: 'uppercase', letterSpacing: 0.6,
                      cursor: 'pointer', transition: 'all 0.15s',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 12 }}>{tool.icon}</span>
                    {tool.label}
                  </button>
                );
              })}
            </div>

            {/* Expanded tool panels */}
            {expandedTools.fretboard && scaleData && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 8,
                }}>
                  Fretboard — {scaleData.name}
                </div>
                <div style={{ margin: '0 -6px' }}>
                  <FretboardDiagram theme={T} scaleData={scaleData} colorMode={true} />
                </div>
              </div>
            )}
            {expandedTools.volumeMeter && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Volume Meter
                </div>
                {currentCard.constraints.dynamics && (
                  <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10, fontStyle: 'italic' }}>
                    Watch your range while working {currentCard.constraints.dynamics.name}.
                  </div>
                )}
                <VolumeMeter theme={T} inline={true} />
              </div>
            )}
            {expandedTools.colorWheel && scaleData && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 6, textAlign: 'center',
                }}>
                  Circle of Fifths
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MiniColorWheel notes={scaleData.notes} root={currentCard.constraints.key} T={T} />
                </div>
              </div>
            )}
            {expandedTools.backingTrack && currentCard.suggestedTrack && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 4,
                }}>
                  Backing Track — {currentCard.suggestedTrack.name}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10, fontStyle: 'italic' }}>
                  {currentCard.suggestedTrack.bpm} BPM · loop under your improvisation for groove and harmonic context.
                </div>
                <MiniAudioPlayer
                  src={currentCard.suggestedTrack.src}
                  theme={T}
                  title={currentCard.suggestedTrack.name}
                />
              </div>
            )}
            {expandedTools.recorder && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Recorder
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10, fontStyle: 'italic' }}>
                  Listening back is the fastest way to spot what worked.
                </div>
                <AudioRecorder theme={T} inline={true} />
              </div>
            )}
          </div>

          {/* Post-round panel: rating + continue actions */}
          {showRating && (
            <div
              style={{
                marginTop: 22, padding: 18,
                background: T.bgSoft, border: `1px solid ${T.goldSoft}`,
                borderRadius: 12, textAlign: 'center',
                animation: 'forgeCardEnter 0.3s ease-out both',
              }}
              role="dialog"
              aria-label="Rate this round"
            >
              <div style={{
                fontSize: 11, fontWeight: 600, color: T.textLight, letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 12,
              }}>
                How was that? <span style={{ opacity: 0.5 }}>(1 / 2 / 3)</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[
                  { rating: 'easy', label: 'Easy', sub: 'I owned it',     color: T.success,   bg: T.successSoft, key: '1' },
                  { rating: 'good', label: 'Good', sub: 'Solid work',     color: T.goldDark,  bg: T.goldSoft,    key: '2' },
                  { rating: 'hard', label: 'Hard', sub: 'Stretched me',   color: T.coral,     bg: T.coralSoft,   key: '3' },
                ].map(({ rating, label, sub, color, bg, key }) => (
                  <button
                    key={rating}
                    onClick={() => rateRound(rating)}
                    style={{
                      flex: 1, padding: '14px 0', borderRadius: 10,
                      background: bg, border: `1px solid ${color}30`,
                      color, fontSize: 14, fontWeight: 700, fontFamily: T.sans,
                      cursor: 'pointer', transition: 'all 0.15s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{sub}</span>
                  </button>
                ))}
              </div>
              {/* Skip-rating actions — bypass SRS weighting */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={oneMoreRound}
                  title="Reset the timer and keep this exact card"
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 8,
                    background: 'transparent', border: `1px solid ${T.border}`,
                    color: T.textMed, fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    textTransform: 'uppercase', letterSpacing: 0.4,
                  }}
                >
                  <RotateCcw size={12} /> One more round
                </button>
                <button
                  onClick={() => {
                    // Skip rating — dismiss panel and draw a fresh card without affecting SRS weights.
                    setShowRating(false);
                    drawCard();
                  }}
                  title="Draw a new card without rating this one (SRS weights unchanged)"
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 8,
                    background: 'transparent', border: `1px solid ${T.border}`,
                    color: T.textMed, fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    textTransform: 'uppercase', letterSpacing: 0.4,
                  }}
                >
                  <Shuffle size={12} /> Skip & new card
                </button>
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 10, fontStyle: 'italic', lineHeight: 1.5 }}>
                Rate to affect SRS weighting — hard-rated constraints appear more often. The bottom row skips rating.
              </div>
            </div>
          )}

          {/* Bottom action row (when no rating showing, timer idle) — draw new card */}
          {!showRating && !timerRunning && (
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <button
                onClick={drawCard}
                style={{
                  flex: 1, padding: '12px 0', borderRadius: 8,
                  background: 'transparent', border: `1px solid ${T.border}`,
                  color: T.textMed, fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}
              >
                <Shuffle size={13} /> New Card
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── Mini Color Wheel ───
// ═══════════════════════════════════════════
function MiniColorWheel({ notes, root, T }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {CIRCLE_OF_FIFTHS.map((note, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const inScale = notes.includes(normalizeNote(note));
        const isRoot = normalizeNote(note) === normalizeNote(root);
        const color = getColorForNote(note) || T.textMuted;

        return (
          <g key={note}>
            <circle
              cx={x} cy={y}
              r={isRoot ? 16 : inScale ? 13 : 8}
              fill={inScale ? color : 'transparent'}
              stroke={inScale ? color : T.border}
              strokeWidth={inScale ? 0 : 1}
              opacity={inScale ? 1 : 0.2}
            />
            <text
              x={x} y={y + 1}
              textAnchor="middle" dominantBaseline="central"
              style={{
                fontSize: isRoot ? 11 : 10,
                fontFamily: T.sans,
                fontWeight: isRoot ? 700 : 500,
                fill: inScale ? '#fff' : T.textMuted,
                opacity: inScale ? 1 : 0.3,
              }}
            >
              {note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
