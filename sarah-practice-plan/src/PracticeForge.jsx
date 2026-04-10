import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, Settings, Play, Pause, RotateCcw, SkipForward, Lock, Unlock, Shuffle, Timer, ChevronDown, ChevronUp, Zap, Music } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, DroneGenerator, VolumeMeter,
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
  const genre = card.constraints.genreFeel?.genre || null;
  const tempo = card.constraints.tempo;
  let candidates = BACKING_TRACKS;
  if (genre) {
    const genreMatches = candidates.filter(t => t.genre === genre);
    if (genreMatches.length > 0) candidates = genreMatches;
  }
  // Sort by tempo proximity
  candidates = [...candidates].sort((a, b) => Math.abs(a.bpm - tempo) - Math.abs(b.bpm - tempo));
  return candidates[0] || null;
}

// ─── Constraint Dimensions ───
const KEY_WEIGHTS = {
  'A': 4, 'E': 3, 'G': 3, 'D': 2, 'C': 2, 'F': 1, 'B♭': 1,
  'F#': 1, 'B': 1, 'C#': 0.5, 'A♭': 0.5, 'E♭': 0.5,
};

const PITCH_CONSTRAINTS = [
  { id: 'leaps', name: 'Leaps Only', desc: 'Only non-adjacent scale tones — no stepwise motion', icon: '↗' },
  { id: 'arch', name: 'Arch Contour', desc: 'Rise to a peak, then descend', icon: '⌢' },
  { id: 'seed', name: 'Seed + Variations', desc: '3-note motif — then develop it', icon: '🌱' },
  { id: 'forbidden', name: 'Forbidden Note', desc: 'One scale note is off-limits', icon: '🚫', hasExtra: true },
  { id: 'targetLanding', name: 'Target Landing', desc: 'Every phrase must end on one note', icon: '🎯', hasExtra: true },
  { id: 'questionAnswer', name: 'Question / Answer', desc: 'Phrases alternate: tension then resolution', icon: '❓' },
];

const RHYTHM_CONSTRAINTS = [
  { id: 'river', name: 'River', desc: 'Even quarter-note flow — metronome-like regularity', icon: '🌊' },
  { id: 'burst', name: 'Burst', desc: 'Front-loaded density — quick climb, then space', icon: '💥' },
  { id: 'space', name: 'Space', desc: 'Silence-heavy — notes as islands in an ocean of rest', icon: '🏝' },
  { id: 'offbeat', name: 'Offbeat', desc: 'Syncopated — notes land between the beats', icon: '⚡' },
  { id: 'rhythmSeed', name: 'Rhythmic Seed', desc: 'A short rhythmic cell — repeat and vary', icon: '🔄' },
];

const DYNAMICS_CONSTRAINTS = [
  { id: 'swell', name: 'Swell', desc: 'pp → f → pp — a wave of energy', icon: '🌊' },
  { id: 'terraces', name: 'Terraces', desc: 'Sudden level jumps — flat plateaus, no fades', icon: '🪜' },
  { id: 'whisper', name: 'Whisper', desc: 'Sustained pianissimo — intimate, controlled', icon: '🤫' },
  { id: 'accentMap', name: 'Accent Map', desc: 'One note per phrase pops loud — the rest whisper', icon: '🎯' },
  { id: 'forte', name: 'Constant Forte', desc: 'Full power throughout — no holding back', icon: '🔊' },
];

const ARTICULATION_CONSTRAINTS = [
  { id: 'legato', name: 'All Legato', desc: 'Smooth and connected — no gaps between notes', icon: '〰️' },
  { id: 'staccato', name: 'All Staccato', desc: 'Short and detached — notes bounce', icon: '·' },
  { id: 'mixed', name: 'Mixed', desc: 'Alternate legato phrases with staccato bursts', icon: '⟿' },
  { id: 'accentedFirst', name: 'Accented Firsts', desc: 'Punch the first beat of every bar', icon: '▶' },
];

const GENRE_CONSTRAINTS = [
  { id: 'reggae', name: 'Reggae', desc: 'Behind the beat + offbeat emphasis + space', icon: '🇯🇲', genre: 'reggae' },
  { id: 'surf', name: 'Surf / Psych', desc: 'Ahead of beat + legato sustains + mask float', icon: '🏄', genre: 'surf' },
  { id: 'desertBlues', name: 'Desert Blues', desc: 'Patient + drone-centered + sternum depth', icon: '🏜️', genre: 'desert-blues' },
  { id: 'soul', name: 'Soul', desc: 'On the beat + dynamic swells + melisma', icon: '🎷', genre: 'soul' },
];

const EMOTIONAL_CONSTRAINTS = [
  { id: 'stormy', name: 'Stormy', desc: 'Turbulent, aggressive, dark energy', icon: '⛈' },
  { id: 'sunny', name: 'Sunny', desc: 'Bright, optimistic, warm and open', icon: '☀️' },
  { id: 'foggy', name: 'Foggy', desc: 'Ambiguous, drifting, uncertain and hazy', icon: '🌫' },
  { id: 'arid', name: 'Arid', desc: 'Sparse, dry, shimmering desert heat', icon: '🌵' },
  { id: 'goldenHour', name: 'Golden Hour', desc: 'Nostalgic, warm, fading light', icon: '🌅' },
  { id: 'midnight', name: 'Midnight', desc: 'Dark, introspective, still and deep', icon: '🌙' },
];

const PHRASE_CONSTRAINTS = [
  { id: '1bar', name: '1-Bar Phrases', desc: 'Fragments — short, punchy ideas', bars: 1 },
  { id: '2bar', name: '2-Bar Phrases', desc: 'Sentences — complete musical thoughts', bars: 2 },
  { id: '4bar', name: '4-Bar Phrases', desc: 'Paragraphs — developed melodic arcs', bars: 4 },
  { id: '8bar', name: '8-Bar Phrases', desc: 'Epics — full stories with beginning, middle, end', bars: 8 },
];

const DENSITY_CONSTRAINTS = [
  { id: 'sparse', name: 'Sparse', desc: 'Max 3 notes per bar — silence is the instrument', icon: '○' },
  { id: 'medium', name: 'Medium', desc: 'Balanced density — breath between ideas', icon: '◐' },
  { id: 'dense', name: 'Dense', desc: 'No empty beats — fill every moment', icon: '●' },
];

const VOCAL_CONSTRAINTS = [
  { id: 'chest', name: 'Chest Voice', desc: 'Stay in chest register — grounded, warm', icon: '🫁' },
  { id: 'head', name: 'Head Voice', desc: 'Light, heady placement — floating', icon: '💭' },
  { id: 'mixed', name: 'Mixed Voice', desc: 'Bridge the registers seamlessly', icon: '🔀' },
  { id: 'falsetto', name: 'Falsetto', desc: 'Airy, floaty top register', icon: '🎈' },
  { id: 'breathy', name: 'Breathy', desc: 'Air-forward, intimate whispered tone', icon: '💨' },
];

const GUITAR_CONSTRAINTS = [
  { id: 'downstrokes', name: 'Downstrokes Only', desc: 'All downstrokes — punk energy', icon: '⬇' },
  { id: 'fingerpick', name: 'Fingerpick', desc: 'No pick — fingers only', icon: '🤚' },
  { id: 'muted', name: 'Muted', desc: 'Palm-muted or ghost notes only', icon: '✋' },
  { id: 'harmonics', name: 'Harmonics', desc: 'Natural or artificial harmonics', icon: '✨' },
  { id: 'hybrid', name: 'Hybrid Picking', desc: 'Pick + fingers simultaneously', icon: '🤙' },
];

const OBLIQUE_MODIFIERS = [
  { id: 'honorError', name: 'Honor Thy Error', desc: 'If you play a "wrong" note, build on it' },
  { id: 'fewerNotes', name: 'Use Fewer Notes', desc: 'Half the notes you think you need' },
  { id: 'justLearned', name: 'Just Learned', desc: 'Pretend you just picked up this instrument' },
  { id: 'underwater', name: 'Play It Underwater', desc: 'Everything slower, heavier, dreamier' },
  { id: 'lastTime', name: 'Last Time Ever', desc: 'Play as if you\'ll never play this again' },
  { id: 'robot', name: 'Mechanical', desc: 'Perfectly even, no expression — then rebel' },
  { id: 'blindfolded', name: 'Eyes Closed', desc: 'Close your eyes — feel, don\'t see' },
  { id: 'storyteller', name: 'The Storyteller', desc: 'Every phrase is a sentence in a story' },
];

// ─── Dimension Registry ───
const DIMENSIONS = [
  { id: 'key', label: 'Key', tier: 1, type: 'quantitative', color: '#d4a373' },
  { id: 'scale', label: 'Scale', tier: 1, type: 'quantitative', color: '#9e829c' },
  { id: 'tempo', label: 'Tempo', tier: 1, type: 'quantitative', color: '#d97d54' },
  { id: 'pitchConstraint', label: 'Pitch', tier: 2, type: 'qualitative', options: PITCH_CONSTRAINTS, color: '#d68383' },
  { id: 'rhythmConstraint', label: 'Rhythm', tier: 2, type: 'qualitative', options: RHYTHM_CONSTRAINTS, color: '#d97d54' },
  { id: 'dynamics', label: 'Dynamics', tier: 2, type: 'qualitative', options: DYNAMICS_CONSTRAINTS, color: '#6b8e9f' },
  { id: 'articulation', label: 'Articulation', tier: 3, type: 'qualitative', options: ARTICULATION_CONSTRAINTS, color: '#5b9e8f' },
  { id: 'genreFeel', label: 'Genre Feel', tier: 3, type: 'qualitative', options: GENRE_CONSTRAINTS, color: '#b58454' },
  { id: 'emotionalIntent', label: 'Emotion', tier: 4, type: 'qualitative', options: EMOTIONAL_CONSTRAINTS, color: '#d4a373' },
  { id: 'phraseLength', label: 'Phrase', tier: 4, type: 'qualitative', options: PHRASE_CONSTRAINTS, color: '#9e829c' },
  { id: 'density', label: 'Density', tier: 4, type: 'qualitative', options: DENSITY_CONSTRAINTS, color: '#7f9e88' },
  { id: 'vocalTechnique', label: 'Vocal', tier: 5, type: 'qualitative', options: VOCAL_CONSTRAINTS, color: '#d68383' },
  { id: 'guitarTechnique', label: 'Guitar', tier: 5, type: 'qualitative', options: GUITAR_CONSTRAINTS, color: '#b58454' },
  { id: 'obliqueModifier', label: 'Oblique', tier: 5, type: 'qualitative', options: OBLIQUE_MODIFIERS, color: '#9e829c' },
];

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
function generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount = 0) {
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

  // Generate qualitative constraints
  const scaleData = generateScale(card.constraints.key, card.constraints.scale);
  const scaleNotes = scaleData.notes || [];

  for (const dimId of activeDimensions) {
    const dim = DIMENSIONS.find(d => d.id === dimId);
    if (!dim || dim.type === 'quantitative') continue;
    if (lockedDimensions[dimId] !== undefined) {
      card.constraints[dimId] = lockedDimensions[dimId];
      continue;
    }
    if (!dim.options || dim.options.length === 0) continue;

    // SRS-weighted pick
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
      chosen.desc = `One scale note is off-limits: avoid ${chosen.forbiddenNote}`;
    }
    if (chosen.id === 'targetLanding' && scaleNotes.length > 0) {
      chosen.targetNote = randomPick(scaleNotes);
      chosen.desc = `Every phrase must end on ${chosen.targetNote}`;
    }

    card.constraints[dimId] = chosen;
  }

  // Derive drone root
  card.droneRoot = droneRootFromCard(card.constraints.key, card.constraints.scale);

  // No-immediate-repeat check
  if (history.length > 0 && _retryCount < 5) {
    const last = history[history.length - 1];
    const sameKey = card.constraints.key === last.constraints.key;
    const sameScale = card.constraints.scale === last.constraints.scale;
    const samePitch = card.constraints.pitchConstraint?.id === last.constraints.pitchConstraint?.id;
    const sameRhythm = card.constraints.rhythmConstraint?.id === last.constraints.rhythmConstraint?.id;
    if (sameKey && sameScale && samePitch && sameRhythm) {
      return generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount + 1);
    }
  }

  // Suggest backing track
  card.suggestedTrack = suggestTrack(card);

  return card;
}

// ─── Session generation ───
function generateSession(count, activeDimensions, lockedDimensions, constraintWeights, tier) {
  const cards = [];
  const keyCount = {};
  for (let i = 0; i < count; i++) {
    let card;
    let attempts = 0;
    do {
      card = generateCard(activeDimensions, lockedDimensions, cards, constraintWeights, tier);
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

  // Collect active qualitative constraints for display
  const constraintLines = [];
  const qualDimIds = ['pitchConstraint', 'rhythmConstraint', 'dynamics', 'articulation', 'genreFeel',
    'emotionalIntent', 'phraseLength', 'density', 'vocalTechnique', 'guitarTechnique'];
  for (const dimId of qualDimIds) {
    const c = card.constraints[dimId];
    if (!c) continue;
    const dim = DIMENSIONS.find(d => d.id === dimId);
    constraintLines.push({ dim, constraint: c });
  }

  const oblique = card.constraints.obliqueModifier;

  return (
    <div style={{
      background: T.bgCard,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: 24,
      boxShadow: `0 2px 12px rgba(181, 132, 84, 0.06), 0 12px 32px rgba(181, 132, 84, 0.04)`,
      position: 'relative',
      overflow: 'hidden',
      animation: entering ? 'forgeCardEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both' : undefined,
    }}>
      {/* Header: Key + Scale + BPM */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%', background: keyColor,
            boxShadow: `0 0 6px ${keyColor}40`,
          }} />
          <span style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 500, color: T.textDark, letterSpacing: -0.5 }}>
            {card.constraints.key} {scaleName}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.textLight, fontSize: 14 }}>
          <Music size={14} />
          <span style={{ fontFamily: T.sans, fontWeight: 500 }}>{card.constraints.tempo} BPM</span>
        </div>
      </div>

      {/* Divider */}
      {constraintLines.length > 0 && (
        <div style={{ height: 1, background: T.border, margin: '16px 0', opacity: 0.6 }} />
      )}

      {/* Constraint lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {constraintLines.map(({ dim, constraint }, i) => (
          <div key={dim.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {/* Left color bar */}
            <div style={{
              width: 3, minHeight: 36, borderRadius: 4,
              background: dim.color, opacity: 0.8, flexShrink: 0, marginTop: 2,
            }} />
            {/* Icon + text */}
            <div>
              <div style={{
                fontFamily: T.serif, fontSize: 16, fontWeight: 400, color: T.textDark,
                lineHeight: 1.3, marginBottom: 2,
              }}>
                {constraint.icon && <span style={{ marginRight: 6 }}>{constraint.icon}</span>}
                {constraint.name}
              </div>
              <div style={{
                fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.5,
              }}>
                {constraint.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Oblique modifier */}
      {oblique && (
        <>
          <div style={{ height: 1, background: T.border, margin: '16px 0', opacity: 0.4 }} />
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 14, color: T.textLight,
            textAlign: 'center', lineHeight: 1.5,
          }}>
            "{oblique.desc}"
          </div>
        </>
      )}

      {/* Suggested track */}
      {card.suggestedTrack && (
        <div style={{
          marginTop: 12, padding: '6px 10px', background: T.bgSoft, borderRadius: 6,
          fontSize: 12, color: T.textLight, fontFamily: T.sans, textAlign: 'center',
        }}>
          Suggested: {card.suggestedTrack.name} ({card.suggestedTrack.bpm} BPM)
        </div>
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
  const [tier, setTier] = useState(() => forgeData.settings?.tier ?? defaultTier);
  const [timerDuration, setTimerDuration] = useState(() => forgeData.settings?.timerDuration ?? 180);
  const [activeDimensions, setActiveDimensions] = useState(() =>
    forgeData.settings?.activeDimensions ?? getDimensionsForTier(defaultTier)
  );
  const [lockedDimensions, setLockedDimensions] = useState(() =>
    forgeData.settings?.lockedDimensions ?? {}
  );
  const [sessionCardCount, setSessionCardCount] = useState(() => forgeData.settings?.sessionCardCount ?? 1);

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
    const updated = { ...forgeData, settings: { tier, timerDuration, activeDimensions, lockedDimensions, sessionCardCount } };
    saveForgeData(updated);
  }, [tier, timerDuration, activeDimensions, lockedDimensions, sessionCardCount]);

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
      const cards = generateSession(sessionCardCount, activeDimensions, lockedDimensions, forgeData.constraintWeights, tier);
      setSessionCards(cards);
      setSessionIndex(0);
      setCurrentCard(cards[0]);
    } else {
      const card = generateCard(activeDimensions, lockedDimensions,
        forgeData.sessions.flatMap(s => s.cards || []), forgeData.constraintWeights, tier);
      setCurrentCard(card);
      setSessionCards([card]);
      setSessionIndex(0);
    }

    setCardEntering(true);
    setTimeout(() => setCardEntering(false), 700);
    setTimerKey(k => k + 1);
  }, [activeDimensions, lockedDimensions, forgeData, tier, sessionCardCount]);

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

  // ─── Render ───
  const maxW = 420;

  return (
    <div style={{ maxWidth: maxW, margin: '0 auto', padding: '16px 16px 100px', fontFamily: T.sans }}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
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
        <div style={{ marginBottom: 20, padding: 16, background: T.bgSoft, borderRadius: 8, border: `1px solid ${T.borderSoft}` }}>
          {/* Tier selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Tier
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map(t => (
                <button key={t} onClick={() => handleTierChange(t)} style={{
                  flex: 1, padding: '8px 0', border: `1px solid ${tier === t ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: tier === t ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: tier === t ? T.goldSoft : 'transparent',
                  color: tier === t ? T.goldDark : T.textMed,
                }}>
                  {['I', 'II', 'III', 'IV', 'V'][t - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Timer duration */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Timer
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[{ s: 90, l: '1:30' }, { s: 120, l: '2:00' }, { s: 180, l: '3:00' }, { s: 300, l: '5:00' }].map(({ s, l }) => (
                <button key={s} onClick={() => setTimerDuration(s)} style={{
                  flex: 1, padding: '8px 0', border: `1px solid ${timerDuration === s ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: timerDuration === s ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: timerDuration === s ? T.goldSoft : 'transparent',
                  color: timerDuration === s ? T.goldDark : T.textMed,
                }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Session card count */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Cards per Session
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 3, 5].map(n => (
                <button key={n} onClick={() => setSessionCardCount(n)} style={{
                  flex: 1, padding: '8px 0', border: `1px solid ${sessionCardCount === n ? T.gold : T.border}`,
                  borderRadius: 6, fontSize: 13, fontWeight: sessionCardCount === n ? 600 : 400,
                  fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                  background: sessionCardCount === n ? T.goldSoft : 'transparent',
                  color: sessionCardCount === n ? T.goldDark : T.textMed,
                }}>
                  {n === 1 ? 'Single' : n}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension toggles */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
              Active Dimensions
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {DIMENSIONS.map(dim => {
                const active = activeDimensions.includes(dim.id);
                const locked = lockedDimensions[dim.id] !== undefined;
                return (
                  <button key={dim.id} onClick={() => toggleDimension(dim.id)} style={{
                    padding: '6px 10px', borderRadius: 16, fontSize: 12, fontWeight: 500,
                    fontFamily: T.sans, cursor: 'pointer', transition: 'all 0.2s',
                    border: `1px solid ${active ? dim.color : T.border}`,
                    background: active ? `${dim.color}15` : 'transparent',
                    color: active ? dim.color : T.textMuted,
                    opacity: active ? 1 : 0.6,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    {dim.label}
                    {locked && <Lock size={10} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Draw Button (when no card active) */}
      {!currentCard && (
        <button onClick={drawCard} style={{
          width: '100%', padding: '14px 24px', borderRadius: 8,
          background: T.gold, color: '#fff', border: 'none',
          fontSize: 16, fontWeight: 500, fontFamily: T.sans, cursor: 'pointer',
          transition: 'all 0.2s', letterSpacing: 0.5,
          boxShadow: `0 2px 8px rgba(212, 163, 115, 0.25)`,
          marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Shuffle size={18} />
          Draw Card
        </button>
      )}

      {/* Active Card */}
      {currentCard && (
        <div style={{ marginBottom: 20 }}>
          {/* Session progress indicator */}
          {sessionCards.length > 1 && (
            <div style={{
              display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 12,
            }}>
              {sessionCards.map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: i === sessionIndex ? T.gold : i < sessionIndex ? T.success : T.border,
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          )}

          <ChallengeCard card={currentCard} T={T} entering={cardEntering} />

          {/* Timer */}
          <div style={{ marginTop: 20 }}>
            <ForgeTimer
              key={timerKey}
              duration={timerDuration}
              running={timerRunning}
              onComplete={handleTimerComplete}
              T={T}
            />

            {/* Timer controls */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 12,
            }}>
              <button onClick={() => { setTimerKey(k => k + 1); setTimerRunning(false); }} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 8,
              }}>
                <RotateCcw size={20} />
              </button>

              <button onClick={timerRunning ? toggleTimer : startTimer} style={{
                width: 52, height: 52, borderRadius: '50%',
                background: T.gold, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px rgba(212, 163, 115, 0.3)`,
                transition: 'all 0.2s',
              }}>
                {timerRunning ? <Pause size={22} color="#fff" /> : <Play size={22} color="#fff" style={{ marginLeft: 2 }} />}
              </button>

              <button onClick={endEarly} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 8,
              }}>
                <SkipForward size={20} />
              </button>
            </div>
          </div>

          {/* Rating panel */}
          {showRating && (
            <div style={{
              marginTop: 20, textAlign: 'center',
              animation: 'forgeCardEnter 0.3s ease-out both',
            }}>
              <div style={{
                fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1.5,
                textTransform: 'uppercase', marginBottom: 12,
              }}>
                How was that?
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { rating: 'easy', label: 'Easy', color: T.success, bg: T.successSoft },
                  { rating: 'good', label: 'Good', color: T.goldDark, bg: T.goldSoft },
                  { rating: 'hard', label: 'Hard', color: T.coral, bg: T.coralSoft },
                ].map(({ rating, label, color, bg }) => (
                  <button key={rating} onClick={() => rateRound(rating)} style={{
                    flex: 1, padding: '12px 0', borderRadius: 8,
                    background: bg, border: `1px solid ${color}30`,
                    color, fontSize: 14, fontWeight: 600, fontFamily: T.sans,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* New card / back buttons */}
          {!showRating && !timerRunning && (
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button onClick={drawCard} style={{
                flex: 1, padding: '10px 0', borderRadius: 8,
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

      {/* Tool Integration (collapsible) */}
      {currentCard && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {/* Drone */}
          <details style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8 }}>
            <summary style={{
              padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
              color: T.textMed, fontFamily: T.sans, listStyle: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>🌫 Drone — {currentCard.droneRoot}</span>
              <ChevronDown size={14} />
            </summary>
            <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${T.borderSoft}` }}>
              <DroneGenerator theme={T} inline={true} defaultRoot={currentCard.droneRoot} />
            </div>
          </details>

          {/* Fretboard */}
          {scaleData && (
            <details style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <summary style={{
                padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                color: T.textMed, fontFamily: T.sans, listStyle: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span>🎸 Fretboard — {scaleData.name}</span>
                <ChevronDown size={14} />
              </summary>
              <div style={{ padding: '8px 4px 14px', borderTop: `1px solid ${T.borderSoft}` }}>
                <FretboardDiagram theme={T} scaleData={scaleData} colorMode={true} />
              </div>
            </details>
          )}

          {/* Volume Meter (auto-shown for dynamics constraints) */}
          {showVolumeMeter && (
            <details open style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <summary style={{
                padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                color: T.textMed, fontFamily: T.sans, listStyle: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span>📢 Volume Meter</span>
                <ChevronDown size={14} />
              </summary>
              <div style={{ padding: '8px 14px 14px', borderTop: `1px solid ${T.borderSoft}` }}>
                <VolumeMeter theme={T} inline={true} />
              </div>
            </details>
          )}

          {/* Mini Color Wheel */}
          {scaleData && (
            <details style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 8 }}>
              <summary style={{
                padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                color: T.textMed, fontFamily: T.sans, listStyle: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span>🎨 Scale Colors</span>
                <ChevronDown size={14} />
              </summary>
              <div style={{ padding: '8px 14px 14px', borderTop: `1px solid ${T.borderSoft}`, display: 'flex', justifyContent: 'center' }}>
                <MiniColorWheel notes={scaleData.notes} root={currentCard.constraints.key} T={T} />
              </div>
            </details>
          )}
        </div>
      )}

      {/* History */}
      {!currentCard && recentHistory.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: T.textLight, letterSpacing: 1.5,
            textTransform: 'uppercase', marginBottom: 12,
          }}>
            Recent Sessions
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentHistory.slice(0, 5).map((card, i) => {
              const keyColor = getColorForNote(card.constraints?.key) || T.gold;
              const ratingColor = card.rating === 'easy' ? T.success : card.rating === 'hard' ? T.coral : T.goldDark;
              return (
                <div key={card.id || i} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                  background: T.bgCard, border: `1px solid ${T.borderSoft}`, borderRadius: 8,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: keyColor, flexShrink: 0 }} />
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
          textAlign: 'center', padding: '40px 20px', color: T.textMuted,
          fontFamily: T.sans, fontSize: 14, fontStyle: 'italic',
        }}>
          No sessions recorded yet. Draw a card to begin.
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
