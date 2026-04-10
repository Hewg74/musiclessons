import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Settings, Play, Pause, RotateCcw, SkipForward, Lock, Unlock, Shuffle, Timer, ChevronDown, ChevronUp, Zap, Music } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, DroneGenerator, VolumeMeter, MiniAudioPlayer, AudioRecorder,
} from './JungleTools.jsx';
import { CHROMATIC, CIRCLE_OF_FIFTHS, SCALE_TYPES, generateScale } from './ColorMusicTrainer.jsx';

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
  { id: 'arch', name: 'Arch Contour', desc: 'Every phrase must climb up to a peak note and then come back down. The shape is a hill — go up, come down. No flat or downward-only phrases.', icon: '⌢',
    example: (notes) => notes.length >= 5 ? `Try: ${notes[0]}→${notes[2]}→${notes[4]}→${notes[2]}→${notes[0]} (up to ${notes[4]}, back to ${notes[0]})` : '' },
  { id: 'seed', name: 'Seed + Variations', desc: 'Pick any 3 notes as your "seed" idea. Repeat it again and again, but change exactly ONE note each time. The shape stays recognizable while the melody slowly evolves.', icon: '🌱',
    example: (notes) => notes.length >= 4 ? `Seed: ${notes[0]}-${notes[1]}-${notes[2]}. Var 1: ${notes[0]}-${notes[1]}-${notes[3]}. Var 2: ${notes[0]}-${notes[3]}-${notes[2]}.` : '' },
  { id: 'forbidden', name: 'Forbidden Note', desc: 'One note in your scale is off-limits for the entire round. Pretend it doesn\'t exist. This forces you to find melodic paths you wouldn\'t normally take.', icon: '🚫', hasExtra: true },
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
function generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount = 0, maxConstraints = 3) {
  const card = {
    id: generateId(),
    timestamp: Date.now(),
    constraints: {},
    activeDimensions: [...activeDimensions],
    tier,
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
    if (chosen.id === 'forbidden' && scaleNotes.length > 1) {
      const nonRoot = scaleNotes.filter(n => n !== card.constraints.key);
      chosen.forbiddenNote = randomPick(nonRoot.length > 0 ? nonRoot : scaleNotes);
      const allowed = scaleNotes.filter(n => n !== chosen.forbiddenNote);
      chosen.desc = `One scale note is off-limits: avoid ${chosen.forbiddenNote}. Use only the remaining ${allowed.length} notes to build phrases.`;
      chosen.dynamicExample = `Allowed notes: ${allowed.join(', ')}. Example phrase: ${allowed.slice(0, 4).join('→')}`;
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
function generateSession(count, activeDimensions, lockedDimensions, constraintWeights, tier, maxConstraints = 3) {
  const cards = [];
  const keyCount = {};
  for (let i = 0; i < count; i++) {
    let card;
    let attempts = 0;
    do {
      card = generateCard(activeDimensions, lockedDimensions, cards, constraintWeights, tier, 0, maxConstraints);
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
function ChallengeCard({ card, T, entering }) {
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

      {/* Tempo + BPM */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 20,
        color: T.textLight, fontSize: 14, marginBottom: 4,
      }}>
        <Music size={14} />
        <span style={{ fontFamily: T.sans, fontWeight: 500 }}>{card.constraints.tempo} BPM</span>
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
// ─── ForgeTimer ───
// ═══════════════════════════════════════════
function ForgeTimer({ duration, running, onComplete, T }) {
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => { setRemaining(duration); }, [duration]);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - (duration - remaining) * 1000;
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const r = Math.max(0, duration - elapsed);
        setRemaining(r);
        if (r <= 0) {
          clearInterval(intervalRef.current);
          onComplete();
        }
      }, 250); // Check every 250ms for accuracy
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, duration]);

  const progress = duration > 0 ? remaining / duration : 0;
  const circumference = 2 * Math.PI * 60;
  const strokeOffset = circumference * (1 - progress);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={144} height={144} viewBox="0 0 144 144">
        {/* Track */}
        <circle cx={72} cy={72} r={60} fill="none" stroke={T.border} strokeWidth={3} />
        {/* Progress */}
        <circle cx={72} cy={72} r={60} fill="none" stroke={T.gold} strokeWidth={4}
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeOffset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.3s linear' }}
        />
        {/* Time text */}
        <text x={72} y={68} textAnchor="middle" dominantBaseline="central"
          style={{ fontFamily: T.serif, fontSize: 32, fill: T.textDark, fontWeight: 400, letterSpacing: -1 }}>
          {formatTime(remaining)}
        </text>
        <text x={72} y={90} textAnchor="middle"
          style={{ fontFamily: T.sans, fontSize: 10, fill: T.textLight, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' }}>
          REMAINING
        </text>
      </svg>
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
  const [tier, setTier] = useState(() => Math.min(4, forgeData.settings?.tier ?? defaultTier));
  const [timerDuration, setTimerDuration] = useState(() => forgeData.settings?.timerDuration ?? 180);
  const [activeDimensions, setActiveDimensions] = useState(() => {
    // Filter out any persisted dimensions that no longer exist (e.g. removed genreFeel, density, etc.)
    const validIds = new Set(DIMENSIONS.map(d => d.id));
    const persisted = forgeData.settings?.activeDimensions ?? getDimensionsForTier(defaultTier);
    return persisted.filter(id => validIds.has(id));
  });
  const [lockedDimensions, setLockedDimensions] = useState(() =>
    forgeData.settings?.lockedDimensions ?? {}
  );
  const [sessionCardCount, setSessionCardCount] = useState(() => forgeData.settings?.sessionCardCount ?? 1);
  const [maxConstraints, setMaxConstraints] = useState(() => forgeData.settings?.maxConstraints ?? 3);

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

  // Integration state
  const [showDrone, setShowDrone] = useState(false);
  const [showFretboard, setShowFretboard] = useState(false);
  const [showVolumeMeter, setShowVolumeMeter] = useState(false);

  // History
  const [showHistory, setShowHistory] = useState(false);

  // Persist settings
  useEffect(() => {
    const updated = { ...forgeData, settings: { tier, timerDuration, activeDimensions, lockedDimensions, sessionCardCount, maxConstraints } };
    saveForgeData(updated);
  }, [tier, timerDuration, activeDimensions, lockedDimensions, sessionCardCount, maxConstraints]);

  // Update active dimensions when tier changes
  const handleTierChange = useCallback((newTier) => {
    setTier(newTier);
    setActiveDimensions(getDimensionsForTier(newTier));
  }, []);

  // Toggle a dimension
  const toggleDimension = useCallback((dimId) => {
    setActiveDimensions(prev =>
      prev.includes(dimId) ? prev.filter(d => d !== dimId) : [...prev, dimId]
    );
  }, []);

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
      const cards = generateSession(sessionCardCount, activeDimensions, lockedDimensions, forgeData.constraintWeights, tier, maxConstraints);
      setSessionCards(cards);
      setSessionIndex(0);
      setCurrentCard(cards[0]);
    } else {
      const card = generateCard(activeDimensions, lockedDimensions,
        forgeData.sessions.flatMap(s => s.cards || []), forgeData.constraintWeights, tier, 0, maxConstraints);
      setCurrentCard(card);
      setSessionCards([card]);
      setSessionIndex(0);
    }

    setCardEntering(true);
    setTimeout(() => setCardEntering(false), 700);
    setTimerKey(k => k + 1);
  }, [activeDimensions, lockedDimensions, forgeData, tier, sessionCardCount, maxConstraints]);

  // Sync metro BPM when card changes
  useEffect(() => {
    if (currentCard && metro) {
      metro.changeBpm(currentCard.constraints.tempo);
    }
  }, [currentCard?.constraints?.tempo]);

  // Auto-show volume meter when dynamics constraint is active
  useEffect(() => {
    if (currentCard?.constraints?.dynamics) {
      setShowVolumeMeter(true);
    } else {
      setShowVolumeMeter(false);
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

    const timeUsed = roundStartTime ? Math.floor((Date.now() - roundStartTime) / 1000) : timerDuration;

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

  // Back handler with audio cleanup
  const handleBack = useCallback(() => {
    setTimerRunning(false);
    if (chimeSynth && !chimeSynth.disposed) {
      try { chimeSynth.dispose(); } catch {}
      chimeSynth = null;
    }
    onBack();
  }, [onBack]);

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

  // ─── Tier descriptions ───
  const TIER_DESCRIPTIONS = {
    1: 'Foundation — Key, scale, and tempo only. Get comfortable with the randomizer.',
    2: 'The Matrix — Adds pitch, rhythm, and dynamics constraints. This is the SS Level 4 combination matrix where most practice happens.',
    3: 'Expression — Adds articulation (how each note is shaped) and phrase length (how long each musical sentence is).',
    4: 'Mastery — Adds vocal or guitar technique constraints depending on your instrument.',
  };

  // ─── Render ───
  const maxW = 480;

  return (
    <div style={{ maxWidth: maxW, margin: '0 auto', padding: '20px 20px 120px', fontFamily: T.sans }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes forgeCardEnter {
          from { opacity: 0; transform: translateY(40px) scale(0.95) rotate(-2deg); }
          to { opacity: 1; transform: translateY(0) scale(1) rotate(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes forgeCardEnter {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={handleBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: T.textMed,
          }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, color: T.textDark, margin: 0, letterSpacing: -0.5 }}>
            Practice Forge
          </h1>
        </div>
        <button onClick={() => setSettingsOpen(!settingsOpen)} style={{
          background: 'none', border: `1px solid ${T.border}`, borderRadius: 8,
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: T.textMed,
        }}>
          <Settings size={16} />
        </button>
      </div>

      {/* Settings Panel */}
      {settingsOpen && (
        <div style={{ marginBottom: 24, padding: 20, background: T.bgSoft, borderRadius: 10, border: `1px solid ${T.borderSoft}` }}>
          {/* Tier selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Tier — Controls the Constraint Pool
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
              {[1, 2, 3, 4].map(t => (
                <button key={t} onClick={() => handleTierChange(t)} style={{
                  flex: 1, padding: '10px 0', border: `1px solid ${tier === t ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: tier === t ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: tier === t ? T.goldSoft : 'transparent',
                  color: tier === t ? T.goldDark : T.textMed,
                }}>
                  {['I', 'II', 'III', 'IV'][t - 1]}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: T.textLight, lineHeight: 1.5 }}>
              {TIER_DESCRIPTIONS[tier]}
            </div>
          </div>

          {/* Constraints per card */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Constraints per Card
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[2, 3, 4].map(n => (
                <button key={n} onClick={() => setMaxConstraints(n)} style={{
                  flex: 1, padding: '10px 0', border: `1px solid ${maxConstraints === n ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: maxConstraints === n ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: maxConstraints === n ? T.goldSoft : 'transparent',
                  color: maxConstraints === n ? T.goldDark : T.textMed,
                }}>
                  {n}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
              How many constraints to focus on per round. Higher tiers add more to the pool, but you always practice {maxConstraints} at a time. Working memory handles 3-4 constraints well.
            </div>
          </div>

          {/* Timer duration */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Round Duration
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ s: 90, l: '1:30' }, { s: 120, l: '2:00' }, { s: 180, l: '3:00' }, { s: 300, l: '5:00' }].map(({ s, l }) => (
                <button key={s} onClick={() => setTimerDuration(s)} style={{
                  flex: 1, padding: '10px 0', border: `1px solid ${timerDuration === s ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: timerDuration === s ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: timerDuration === s ? T.goldSoft : 'transparent',
                  color: timerDuration === s ? T.goldDark : T.textMed,
                }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
              Research suggests 3-minute rounds for optimal interleaved practice (Carter & Grahn 2016).
            </div>
          </div>

          {/* Session card count */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Cards per Session
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 3, 5].map(n => (
                <button key={n} onClick={() => setSessionCardCount(n)} style={{
                  flex: 1, padding: '10px 0', border: `1px solid ${sessionCardCount === n ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: sessionCardCount === n ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: sessionCardCount === n ? T.goldSoft : 'transparent',
                  color: sessionCardCount === n ? T.goldDark : T.textMed,
                }}>
                  {n === 1 ? 'Single' : `${n} Cards`}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
              Multiple cards enforce variety — no key repeated more than twice per session.
            </div>
          </div>

          {/* Dimension toggles */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Active Dimensions
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
              Tap to enable/disable. Changing tiers pre-selects recommended dimensions, but you can customize freely.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {DIMENSIONS.map(dim => {
                const active = activeDimensions.includes(dim.id);
                const locked = lockedDimensions[dim.id] !== undefined;
                return (
                  <button key={dim.id} onClick={() => toggleDimension(dim.id)} style={{
                    padding: '7px 12px', borderRadius: 16, fontSize: 12, fontWeight: 500,
                    fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                    border: `1px solid ${active ? dim.color : T.border}`,
                    background: active ? `${dim.color}15` : 'transparent',
                    color: active ? dim.color : T.textMuted,
                    opacity: active ? 1 : 0.5,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    {dim.label}
                    {locked && <Lock size={10} />}
                    <span style={{ fontSize: 9, opacity: 0.6 }}>T{dim.tier}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Current config summary (when no card active) */}
      {!currentCard && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: T.bgSoft, borderRadius: 8,
          marginBottom: 16, border: `1px solid ${T.borderSoft}`,
        }}>
          <div style={{ fontSize: 12, color: T.textMed, fontFamily: T.sans }}>
            Tier <strong style={{ color: T.goldDark }}>{['I', 'II', 'III', 'IV'][tier - 1]}</strong>
            {' '} &middot; {' '}
            <strong>{maxConstraints}</strong> constraints/card
            {' '} &middot; {' '}
            {formatTime(timerDuration)} rounds
          </div>
          <button onClick={() => setSettingsOpen(true)} style={{
            fontSize: 11, color: T.gold, background: 'none', border: 'none',
            cursor: 'pointer', fontWeight: 600, fontFamily: T.sans,
          }}>
            Change
          </button>
        </div>
      )}

      {/* Draw Button (when no card active) */}
      {!currentCard && (
        <button onClick={drawCard} style={{
          width: '100%', padding: '16px 24px', borderRadius: 8,
          background: T.gold, color: '#fff', border: 'none',
          fontSize: 16, fontWeight: 500, fontFamily: T.sans, cursor: 'pointer',
          transition: 'all 0.2s', letterSpacing: 0.5,
          boxShadow: `0 2px 8px rgba(212, 163, 115, 0.25)`,
          marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Shuffle size={18} />
          Draw Card
        </button>
      )}

      {/* Active Card */}
      {currentCard && (
        <div style={{ marginBottom: 28 }}>
          {/* Session progress indicator */}
          {sessionCards.length > 1 && (
            <div style={{
              display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16,
            }}>
              {sessionCards.map((_, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: i === sessionIndex ? T.gold : i < sessionIndex ? T.success : T.border,
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          )}

          <ChallengeCard card={currentCard} T={T} entering={cardEntering} />

          {/* Timer */}
          <div style={{ marginTop: 28 }}>
            <ForgeTimer
              key={timerKey}
              duration={timerDuration}
              running={timerRunning}
              onComplete={handleTimerComplete}
              T={T}
            />

            {/* Timer controls */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 16,
            }}>
              <button onClick={() => { setTimerKey(k => k + 1); setTimerRunning(false); }} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 10,
              }}>
                <RotateCcw size={20} />
              </button>

              <button onClick={timerRunning ? toggleTimer : startTimer} style={{
                width: 56, height: 56, borderRadius: '50%',
                background: T.gold, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px rgba(212, 163, 115, 0.3)`,
                transition: 'all 0.2s',
              }}>
                {timerRunning ? <Pause size={24} color="#fff" /> : <Play size={24} color="#fff" style={{ marginLeft: 2 }} />}
              </button>

              <button onClick={endEarly} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 10,
              }}>
                <SkipForward size={20} />
              </button>
            </div>
          </div>

          {/* Rating panel */}
          {showRating && (
            <div style={{
              marginTop: 28, textAlign: 'center',
              animation: 'forgeCardEnter 0.3s ease-out both',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 500, color: T.textLight, letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 14,
              }}>
                How was that?
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { rating: 'easy', label: 'Easy', sub: 'I owned it', color: T.success, bg: T.successSoft },
                  { rating: 'good', label: 'Good', sub: 'Solid work', color: T.goldDark, bg: T.goldSoft },
                  { rating: 'hard', label: 'Hard', sub: 'Stretched me', color: T.coral, bg: T.coralSoft },
                ].map(({ rating, label, sub, color, bg }) => (
                  <button key={rating} onClick={() => rateRound(rating)} style={{
                    flex: 1, padding: '14px 0', borderRadius: 8,
                    background: bg, border: `1px solid ${color}30`,
                    color, fontSize: 14, fontWeight: 600, fontFamily: T.sans,
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  }}>
                    {label}
                    <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>{sub}</span>
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 8 }}>
                Hard-rated constraints appear more often in future sessions (SRS weighting).
              </div>
            </div>
          )}

          {/* New card button */}
          {!showRating && !timerRunning && (
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={drawCard} style={{
                flex: 1, padding: '12px 0', borderRadius: 8,
                background: 'transparent', border: `1px solid ${T.border}`,
                color: T.textMed, fontSize: 13, fontWeight: 500, fontFamily: T.sans,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <Shuffle size={14} /> New Card
              </button>
            </div>
          )}
        </div>
      )}

      {/* Practice Tools — full-width, below the card */}
      {currentCard && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1.5,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            Practice Tools
          </div>

          {/* Metronome — editable, syncs to card BPM but user can override */}
          {metro && (
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              padding: 16, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
                Metronome — {metro.bpm} BPM
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
                Auto-set to the card's tempo. Tap −/+ to adjust, or reset to {currentCard.constraints.tempo} BPM. Hit Start to play.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{
                    width: 32, height: 32, borderRadius: 6, border: `1px solid ${T.border}`,
                    background: T.bgSoft, fontSize: 18, color: T.textMed, cursor: 'pointer',
                  }}>−</button>
                  <div style={{
                    fontFamily: T.serif, fontSize: 22, fontWeight: 500, color: T.textDark,
                    minWidth: 56, textAlign: 'center',
                  }}>{metro.bpm}</div>
                  <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{
                    width: 32, height: 32, borderRadius: 6, border: `1px solid ${T.border}`,
                    background: T.bgSoft, fontSize: 18, color: T.textMed, cursor: 'pointer',
                  }}>+</button>
                  <button onClick={() => metro.changeBpm(currentCard.constraints.tempo)} style={{
                    marginLeft: 6, padding: '6px 10px', borderRadius: 6, border: 'none',
                    background: T.goldSoft, color: T.goldDark, fontSize: 11, fontWeight: 600,
                    fontFamily: T.sans, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5,
                  }}>Reset</button>
                </div>
                <button onClick={() => metro.playing ? metro.stop() : metro.start()} style={{
                  padding: '8px 16px', borderRadius: 6, border: 'none',
                  background: metro.playing ? T.coral : T.gold, color: '#fff',
                  fontSize: 13, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
                }}>
                  {metro.playing ? 'Stop' : 'Start'}
                </button>
              </div>
            </div>
          )}

          {/* Drone — full width */}
          <div style={{
            background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
              Drone — {currentCard.droneRoot}
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
              Sustained root tone for pitch reference. Start the drone before you begin improvising.
            </div>
            <DroneGenerator theme={T} inline={true} defaultRoot={currentCard.droneRoot} />
          </div>

          {/* Fretboard — full width */}
          {scaleData && (
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              padding: 16, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
                Fretboard — {scaleData.name}
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
                Scale positions highlighted on the fretboard. Tap notes to hear them.
              </div>
              <div style={{ margin: '0 -8px' }}>
                <FretboardDiagram theme={T} scaleData={scaleData} colorMode={true} />
              </div>
            </div>
          )}

          {/* Volume Meter — full width, auto-shown for dynamics */}
          {showVolumeMeter && (
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              padding: 16, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
                Volume Meter
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
                Real-time mic volume feedback — use this to see your dynamic range while practicing the {currentCard.constraints.dynamics?.name || 'dynamics'} constraint.
              </div>
              <VolumeMeter theme={T} inline={true} />
            </div>
          )}

          {/* Backing Track — playable, suggested by genre + tempo */}
          {currentCard.suggestedTrack && (
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              padding: 16, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
                Backing Track — {currentCard.suggestedTrack.name}
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
                Suggested track at {currentCard.suggestedTrack.bpm} BPM. Loop it under your improvisation for groove and harmonic context.
              </div>
              <MiniAudioPlayer
                src={currentCard.suggestedTrack.src}
                theme={T}
                title={currentCard.suggestedTrack.name}
              />
            </div>
          )}

          {/* Recorder — capture your practice */}
          <div style={{
            background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
            padding: 16, marginBottom: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
              Recorder
            </div>
            <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
              Record yourself working through the constraints. Listening back is one of the fastest ways to spot what worked and what didn't.
            </div>
            <AudioRecorder theme={T} inline={true} />
          </div>

          {/* Color Wheel — full width */}
          {scaleData && (
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10,
              padding: 16, marginBottom: 12,
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.textDark, fontFamily: T.sans, marginBottom: 4 }}>
                Scale Colors — Circle of Fifths
              </div>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>
                Your available notes highlighted on the circle of fifths. Each note has a unique color to help you visualize the scale.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MiniColorWheel notes={scaleData.notes} root={currentCard.constraints.key} T={T} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {!currentCard && recentHistory.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1.5,
            textTransform: 'uppercase', marginBottom: 14,
          }}>
            Recent Sessions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentHistory.slice(0, 5).map((card, i) => {
              const kc = getColorForNote(card.constraints?.key) || T.gold;
              const ratingColor = card.rating === 'easy' ? T.success : card.rating === 'hard' ? T.coral : T.goldDark;
              return (
                <div key={card.id || i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  background: T.bgCard, border: `1px solid ${T.borderSoft}`, borderRadius: 8,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: kc, flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: 13, color: T.textMed, fontFamily: T.sans }}>
                    {card.constraints?.key} {SCALE_TYPES[card.constraints?.scale]?.name || ''}
                  </div>
                  {card.rating && (
                    <div style={{
                      fontSize: 11, fontWeight: 600, color: ratingColor, textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}>
                      {card.rating}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: T.textMuted }}>
                    {card.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!currentCard && recentHistory.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '48px 24px', color: T.textMuted,
          fontFamily: T.sans, fontSize: 14,
        }}>
          <div style={{ fontFamily: T.serif, fontSize: 18, color: T.textLight, marginBottom: 8 }}>
            No sessions yet
          </div>
          <div style={{ lineHeight: 1.6 }}>
            Draw a card to generate randomized practice constraints.
            Each card combines musical dimensions — pitch, rhythm, dynamics, and more —
            into a unique challenge for improvisation practice.
          </div>
        </div>
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
