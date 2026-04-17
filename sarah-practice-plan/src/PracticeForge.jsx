import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { ArrowLeft, RotateCcw, SkipForward, Lock, Unlock, Shuffle, ChevronDown, ChevronUp, Music, Play, Pause } from 'lucide-react';
import {
  normalizeNote, COLOR_MUSIC, getColorForNote, playWarmNote,
  FretboardDiagram, VolumeMeter, MiniAudioPlayer, AudioRecorder,
  ChordDiagram, CHORD_VOICINGS_MULTI,
} from './JungleTools.jsx';
import { CHROMATIC, CIRCLE_OF_FIFTHS, SCALE_TYPES, generateScale } from './ColorMusicTrainer.jsx';
import GUIDANCE_CACHE from './data/practiceForgeGuidance.json';
import { CompactDroneWheel } from './CompactDroneWheel.jsx';
import { useChordEngine, useChordTargetChecklist, CONFIRM_MS as CHORD_CONFIRM_MS, MIN_CONFIDENCE as CHORD_MIN_CONF } from './chordDetectorReact.js';
import { CHORD_PROGRESSIONS, SCALES_WITHOUT_PROGRESSIONS } from './data/chordProgressions.js';
import { resolveProgression, uniqueChordNames } from './chordProgressionResolver.js';

// Canonical order used to build combo-mode keys so lookups are deterministic
// regardless of draw order. Positions of the legacy dims (pitch, rhythm,
// dynamics, articulation, phrase, register, pickingHand) are preserved so
// the v1 guidance cache (553 combos keyed on value IDs like `leaps_chest`
// and `leaps_downstrokes`) keeps working unchanged — the cache is indexed
// on value IDs, not dim IDs, so renaming `vocalTechnique` → `register` and
// `guitarTechnique` → `pickingHand` is safe as long as the relative order
// of dims in this array stays identical.
//
// Foundational dims (texture, vowel) are NEW in v2 and don't have cache
// entries yet — their combos fall through to per-dim `desc` until Phase E
// seeds hand-crafted overlays.
const DIM_ORDER = [
  'pitchConstraint', 'rhythmConstraint', 'dynamics',
  'articulation', 'phraseLength',
  'register',        // was vocalTechnique — position 5 preserved
  'pickingHand',     // was guitarTechnique — position 6 preserved
  'texture',         // Phase A foundational (guitar)
  'vowel',           // Phase A foundational (voice)
  'harmonicTarget',  // Phase B shared random
  'phraseStructure', // Phase B shared random
  'neckZone',        // Phase C guitar branch
  'noteTransition',  // Phase C guitar branch
  'vibrato',         // Phase C guitar branch
  'onset',           // Phase D voice branch
];

// Route a card's guidance lookup by its mode.
//
// Cache keys are NAMESPACED by dim:value to prevent value-id collisions
// across dims. Examples:
//   focus['pitchConstraint:leaps']
//   combos['pitchConstraint:leaps_rhythmConstraint:river']
//   matrix['pitchConstraint:leaps_rhythmConstraint:river_dynamics:swell']
//
// The bare-value-id format used in v1 (e.g. `leaps_river`, `mixed`) was
// silently broken once Phase A added new dims with overlapping value IDs:
// `texture:mixed` would collide with v1 `register:mixed`, returning the
// wrong content. The cache file was migrated to namespaced keys via
// namespace_cache.py — _meta.keyFormat === "dim:value" indicates v3 format.
//
//   scales → null (no guidance)
//   focus  → GUIDANCE_CACHE.focus[`${dimId}:${valueId}`]
//   combo  → GUIDANCE_CACHE.combos[`${dimA}:${valA}_${dimB}:${valB}`] (canon order)
//   matrix → GUIDANCE_CACHE.matrix[`${dimA}:${valA}_${dimB}:${valB}_${dimC}:${valC}`]
function lookupGuidance(card) {
  const c = card.constraints;
  const mode = card.mode || 'matrix'; // default to matrix for legacy cards
  const inst = card.instrument || 'voice';

  // Foundational dims (texture/register/vowel) are ALWAYS on every v3 card.
  // Exclude them from the guidance-lookup count — the cache was generated for
  // RANDOM dims only. Foundational × random pairs are handled separately by
  // lookupPhaseECombo().
  const _FSET = new Set(['texture', 'register', 'vowel']);
  const randomDrawn = () => DIM_ORDER.filter(d => c[d] && typeof c[d] === 'object' && c[d].id && !_FSET.has(d));

  // Guitar-keyed entries take precedence when instrument is guitar.
  // Falls back to the default (voice) entry if no guitar-specific one exists.
  const focusLookup = (key) => {
    if (inst === 'guitar') {
      const gEntry = GUIDANCE_CACHE.focus?.[`guitar:${key}`];
      if (gEntry) return gEntry;
    }
    return GUIDANCE_CACHE.focus?.[key] || null;
  };
  const comboLookup = (key) => {
    if (inst === 'guitar') {
      const gEntry = GUIDANCE_CACHE.combos?.[`guitar:${key}`];
      if (gEntry) return gEntry;
    }
    return GUIDANCE_CACHE.combos?.[key] || null;
  };
  const matrixLookup = (key) => {
    if (inst === 'guitar') {
      const gEntry = GUIDANCE_CACHE.matrix?.[`guitar:${key}`];
      if (gEntry) return gEntry;
    }
    return GUIDANCE_CACHE.matrix?.[key] || null;
  };

  if (mode === 'focus') {
    const drawnIds = randomDrawn();
    if (drawnIds.length !== 1) return null;
    const dimId = drawnIds[0];
    const valId = c[dimId].id;
    return focusLookup(`${dimId}:${valId}`);
  }

  if (mode === 'combo') {
    const drawnIds = randomDrawn();
    if (drawnIds.length !== 2) return null;
    const dim1 = drawnIds[0], dim2 = drawnIds[1];
    const id1 = c[dim1].id, id2 = c[dim2].id;
    return comboLookup(`${dim1}:${id1}_${dim2}:${id2}`);
  }

  if (mode === 'matrix') {
    // Collect whichever qualitative constraints were actually drawn, in canonical order
    const drawnIds = randomDrawn();
    if (drawnIds.length < 2) return null;

    // Classic pitch × rhythm × dynamics trio → use the bespoke 210-entry matrix cache
    const isClassicTrio =
      drawnIds.length === 3 &&
      drawnIds.includes('pitchConstraint') &&
      drawnIds.includes('rhythmConstraint') &&
      drawnIds.includes('dynamics');
    if (isClassicTrio) {
      const key =
        `pitchConstraint:${c.pitchConstraint.id}` +
        `_rhythmConstraint:${c.rhythmConstraint.id}` +
        `_dynamics:${c.dynamics.id}`;
      const entry = matrixLookup(key);
      if (entry) return entry;
    }

    // Non-classic or missing trio entry → decompose into pair lookups from the combos cache
    const labelFor = (dimId) => ({
      pitchConstraint: 'Pitch',
      rhythmConstraint: 'Rhythm',
      dynamics: 'Dynamics',
      articulation: 'Articulation',
      phraseLength: 'Phrase',
      register: 'Register',
      pickingHand: 'Picking',
      texture: 'Texture',
      vowel: 'Vowel',
      harmonicTarget: 'Harmonic',
      phraseStructure: 'Form',
      neckZone: 'Neck Zone',
      noteTransition: 'Transition',
      vibrato: 'Vibrato',
      onset: 'Onset',
    }[dimId] || dimId);
    const pairs = [];
    for (let i = 0; i < drawnIds.length; i++) {
      for (let j = i + 1; j < drawnIds.length; j++) {
        const dimA = drawnIds[i], dimB = drawnIds[j];
        const idA = c[dimA].id, idB = c[dimB].id;
        const entry = comboLookup(`${dimA}:${idA}_${dimB}:${idB}`);
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

// ─── Phase E: Lock-set presets ───
// Curated "drill day" setups that pin specific values to isolate a single
// skill focus. Applied by the preset button in the settings panel — it
// replaces `lockedDimensions` with the preset's locks. User can still add
// additional locks on top.
//
// Each preset lists `instrument` (which mode it's designed for), a human
// label + description, and a `locks` map. The value objects match the
// shape that lockedDimensions expects (same structure as a drawn value).
const LOCK_PRESETS = [
  {
    id: 'triad-tuesday',
    instrument: 'guitar',
    label: 'Triad Tuesday',
    desc: 'Upper-register 3-string triad partials drilling arpeggio outlines. Reggae skanks, jazz comping, pop voicings.',
    locks: {
      texture: { id: 'triadPartial', name: 'Triad Partials' },
      harmonicTarget: { id: 'arpeggio135', name: 'Arpeggio 1-3-5' },
      neckZone: { id: 'high', name: 'High Neck' },
    },
  },
  {
    id: 'comp-sunday',
    instrument: 'guitar',
    label: 'Comp Sunday',
    desc: 'Chord comping with color tones — 7ths, 9ths, 11ths. Jazz, bossa, Khruangbin territory.',
    locks: {
      texture: { id: 'fullChord', name: 'Full Chord' },
      harmonicTarget: { id: 'colorTone79', name: 'Color Tones 7/9/11' },
    },
  },
  {
    id: 'desert-solo',
    instrument: 'guitar',
    label: 'Desert Solo',
    desc: 'Single-line melodic soloing targeting chord tones over a backing progression. Khruangbin, Tinariwen, desert blues.',
    locks: {
      texture: { id: 'singleLine', name: 'Single Line' },
      harmonicTarget: { id: 'chordToneLanding', name: 'Chord-Tone Landing' },
      noteTransition: { id: 'slideConnect', name: 'Slide Connect' },
    },
  },
  {
    id: 'vowel-friday',
    instrument: 'voice',
    label: 'Vowel Friday',
    desc: 'Scat-syllable improvisation in mixed voice — pure melodic freedom without lyric responsibility.',
    locks: {
      vowel: { id: 'scatSyllables', name: 'Scat Syllables' },
      register: { id: 'mixed', name: 'Mixed Voice' },
    },
  },
  {
    id: 'song-work',
    instrument: 'voice',
    label: 'Song Work',
    desc: 'Real lyrics from your "Songs 2 Learn" list, in the register that fits the song. The brief should fit the words.',
    locks: {
      vowel: { id: 'realLyrics', name: 'Real Lyrics' },
    },
  },
  {
    id: 'head-voice-drill',
    instrument: 'voice',
    label: 'Head Voice Drill',
    desc: 'Every card locks head voice — isolate the mechanism and let rhythm, dynamics, and phrase shape do the variation.',
    locks: {
      register: { id: 'head', name: 'Head Voice' },
    },
  },
];

// ─── Phase E: Mood overlay library ───
// One-sentence overlay per mood. Colors every card in a round with the
// session mood's intent WITHOUT overriding mechanical dims — mood fights
// the mechanics productively rather than dictating them. Launch list
// mirrors MOOD_LIBRARY (25 entries). If a mood isn't in this map, the
// overlay falls back to a generic "Bring a sense of {mood}." sentence.
const MOOD_OVERLAYS = {
  // Outward longing
  longing:     'Play like you\'re reaching for something just out of reach — every phrase pulls forward, nothing fully lands.',
  yearning:    'Hold every resolution one beat longer than you want to. Let the hunger for the home note do the work.',
  nostalgic:   'Every phrase is a half-remembered melody from a decade ago. Let the wobble and imperfection carry the weight.',
  wistful:     'Gentle, unhurried, looking sideways. Nothing argues with anything else — the whole round is a quiet exhale.',
  // Inward warmth
  tender:      'Close-mic intimacy. Nothing above mezzo-forte. Every note is a hand on a shoulder, not a declaration.',
  intimate:    'Sing this like the room has three people in it and you mean only one of them. Distance is the enemy.',
  serene:      'The pulse should feel optional — let the notes settle into the air before the next one arrives.',
  // Light
  playful:     'Let mistakes become jokes. Change your mind mid-phrase. Keep the eyebrow raised throughout.',
  mischievous: 'Set an expectation then refuse to deliver it. Land somewhere the listener wasn\'t ready for.',
  joyous:      'Forward lean, bright attack, no apologies. The room should feel louder with you in it.',
  // Heavy
  melancholy:  'Everything slightly late, slightly behind the beat. Let gravity pull the phrases down.',
  elegiac:     'Play as if this is the last time. Each note is final. No ornament is casual.',
  weary:       'The voice that can\'t quite summon full engagement. Half-committed onsets, dropped final consonants, space where power should be.',
  // Trance
  hypnotic:    'Never leave the center of gravity — every phrase circles back to the same note like a pendulum. No dramatic arcs.',
  dreamy:      'Soft onsets, long tails, fuzzy pitch centers. Blur the edges of every note.',
  floating:    'Remove the weight from the downbeats. Everything hangs suspended — no firm landings, no clear takeoffs.',
  // Fire
  defiant:     'Lean into dissonance. Don\'t apologize for any note. The phrases push back against the backing, not with it.',
  fierce:      'Maximum commitment at all volumes. Even whispers have teeth. No neutral moments.',
  driven:      'Every phrase is headed somewhere. Don\'t let the groove settle — always pushing the next beat.',
  // Gene's world
  'sun-bleached':     'Dry, mid-tempo, slightly detached. Think palm shade and an iced tea. Nothing urgent ever happens here.',
  'bourbon-warm':     'Slow-burn tenor warmth. Every phrase has a slight growl under it. Laid-back but never lazy.',
  'highway-hypnosis': 'Repetitive, hypnotic, forward-moving. Like six hours of empty desert at 75 mph. Small changes matter more than big ones.',
  'motel-neon':       'Late-night, flickering, slightly unstable. Pitch that drifts just a shade. Reverb in the mind, not the signal.',
  'slow-sunday':      'No hurry, no struggle. Every phrase finishes itself. The only enemy is trying too hard.',
  // Phase F — Outward longing additions
  'homesick':         'Play for the place you can\'t go back to. Every phrase bends toward a resolution that keeps drifting further away.',
  'searching':        'Nothing settles. Every phrase opens a new door instead of closing the last one. Forward motion with no destination.',
  'unrequited':       'Give everything to each phrase and let it fall. Maximum commitment, zero return. The beauty is in the offering.',
  // Inward warmth additions
  'reverent':         'Handle each note like something borrowed. Hushed dynamics, deliberate placement — nothing casual, nothing loud.',
  'content':          'Settle into the center of every phrase. No pushing, no pulling — just the quiet satisfaction of being exactly here.',
  'loving':           'Warm, unhurried, and generous. Let every note ring longer than necessary. Give the listener more than they expect.',
  // Light additions
  'whimsical':        'Change direction mid-phrase like a thought you didn\'t finish. Light touch, quick pivots, no commitment to any one idea.',
  'buoyant':          'Everything lifts. Push the onsets slightly ahead of the beat — not rushing, just eager. The air under each note matters.',
  'celebratory':      'Full commitment, bright attacks, nothing held back. This is the victory lap — play like the hard part is already over.',
  // Heavy additions
  'haunted':          'Something follows every phrase. Let the silence after each note carry more weight than the note itself.',
  'bruised':          'Tender but damaged. Every note works but none of them feel easy. Play through the resistance, not around it.',
  'ashen':            'Drained of color. Flat dynamics, narrow range, minimal ornament. The emptiness IS the expression.',
  // Trance additions
  'mystical':         'Blurred edges, no clear attack. Let notes emerge from silence and dissolve back into it — nothing starts or ends cleanly.',
  'meditative':       'One breath per phrase. Long tones, minimal movement, absolute attention to the space between each note.',
  'hallucinated':     'Nothing is quite where it should be. Drift off the center of each pitch by a shade — not wrong, just uncertain.',
  'ritual':           'Cyclical and deliberate. Every phrase returns to the same anchor note. Repetition is the point, not the problem.',
  'astral':           'Weightless. Remove all rhythmic gravity — let phrases float without downbeats, land without impact.',
  // Fire additions
  'triumphant':       'The stakes are over and you won. Big intervals, strong arrivals, no hedging. Plant each phrase like a flag.',
  'vengeful':         'Controlled aggression. Sharp attacks, clipped releases, every note aimed at something. Precision over volume.',
  'urgent':           'Push. Every phrase crowds the next one. No space between ideas — the tempo feels too slow no matter what.',
  // Gene's world additions
  'dawn-patrol':      'First light, cold water, no one else out. Clean, sparse, wide-open. Every note has the whole ocean behind it.',
  'riptide':          'Strong undercurrent beneath a calm surface. The groove pulls harder than it sounds. Resist and ride at the same time.',
  'cactus-bloom':     'Unexpected beauty in a harsh landscape. One bright melodic idea surrounded by dry, sparse accompaniment.',
  'last-ferry':       'Running out of time but too proud to rush. Each phrase is deliberate and final — you get one shot at each note.',
  'summer-squall':    'Short burst of intensity, then clear sky. Build fast, peak hard, let the silence after the storm do the talking.',
  'red-rock':         'Wide, ancient, sun-baked. Long sustained tones, desert reverb, nothing moves fast. The landscape plays you.',
  'siesta':           'Half-asleep in afternoon heat. Lazy bends, dropped endings, phrases that trail off before finishing.',
  'after-party':      'The energy is still in the room but everyone\'s gone quiet. Play the afterglow — warm, slightly sloppy, grateful.',
  'porch-swing':      'Pendulum groove. Every phrase rocks between two notes, two chords, two ideas. The sway is the whole song.',
  'palm-shade':       'Dappled and easy. Nothing harsh, nothing direct — everything filtered through something softer.',
  'saltwater':        'Briny and bright. Open intervals, surf-tremolo shimmer, phrases that break and reform like waves.',
  'fogbank':          'Muffled, close, no horizon. Soft attacks, rolled-off highs, everything sounds like it\'s coming through cotton.',
  'gold-hour':        'Warm light on everything. Rich low-mids, gentle saturation, the kind of tone that makes average phrases beautiful.',
  'backroad':         'Dusty, unhurried, no traffic. Simple motifs repeated with small variations — the scenery changes, the speed doesn\'t.',
  'agave-sun':        'Dry heat, slow burn, sweet underneath. Sparse phrases with one honeyed note that makes the whole thing worthwhile.',
  // Cosmic
  'vast':             'Scale up. Every interval should feel like a canyon. Wide leaps, long sustains, nothing small or fussy.',
  'oceanic':          'Deep, slow swells. Phrases rise gradually, crest, and dissolve. No sharp edges — everything is tide.',
  'interstellar':     'Cold beauty. Precise intervals, crystalline tone, zero vibrato. Each note hangs in vacuum.',
  'sublime':          'Overwhelmingly beautiful. Push the dynamic range to its edges — whisper and roar in the same phrase.',
  'luminous':         'Radiant, even tone. No shadows, no grit — pure signal. Let the clarity do the emotional work.',
  'gravitational':    'Everything pulls toward one center note. Build orbits around it — close passes, wide swings, always returning.',
  // Edge
  'anxious':          'Short, clipped phrases with too-quick breathing. The rests between notes are tense, not restful.',
  'restless':         'Can\'t stay in one register or rhythm for more than two bars. Keep moving — stillness feels wrong.',
  'electric':         'Crackling, on-edge energy. Bright attacks, sharp dynamics, every note slightly too loud for comfort.',
  'paranoid':         'Creeping. Quiet phrases that flinch at their own sound. Play like you\'re being watched.',
  // Cold
  'icy':              'Brittle, precise, and distant. No warmth in the tone — crystalline attacks with immediate decay.',
  'aloof':            'Play past the listener, not to them. Emotionally detached phrasing — technically present, personally absent.',
  'clinical':         'Mechanical precision. Equal dynamics, metronomic time, zero expression. Let the pattern speak.',
  'alienated':        'Disconnected from the groove. Phrases that ignore the backing track\'s pulse — you\'re in a different room.',
  // Grit
  'smoldering':       'Low heat, high tension. Barely-there dynamics with an edge underneath. The restraint IS the intensity.',
  'sensual':          'Slow, deliberate, tactile. Feel the physical vibration of each note — let the instrument\'s body resonate.',
  'weathered':        'Worn-in and comfortable with imperfection. Cracked tone, wobbly pitch, phrases shaped by years not lessons.',
  'repressed':        'Hold back. Everything at half the volume and half the range you want. The constraint creates the pressure.',
  'stoic':            'Unmoved by anything. Even, measured phrases with zero dynamic variation. Endurance over expression.',
};

// ─── Phase F: Mood → musical context affinities ───
// Each mood maps to key/scale/tempo preferences that bias drawContext().
// Keys use CHROMATIC symbols (♭ not 'b'). Unlisted keys get baseline × 0.5.
// scaleWeights replace (not multiply) getScaleWeights when mood is active.
// tempoRange replaces the default gaussianRange params entirely.
const MOOD_AFFINITY = {
  // ── Outward longing ──
  'longing':     { keyWeights: { A: 4, E: 3, D: 3, 'F#': 2 }, scaleWeights: { 'minor-pentatonic': 4, 'natural-minor': 3, dorian: 3, 'harmonic-minor': 2 }, tempoRange: { min: 65, max: 100, sweetMin: 72, sweetMax: 90 } },
  'yearning':    { keyWeights: { E: 4, A: 3, B: 3, 'F#': 2 }, scaleWeights: { 'natural-minor': 4, 'harmonic-minor': 3, 'melodic-minor': 3, dorian: 2 }, tempoRange: { min: 60, max: 95, sweetMin: 70, sweetMax: 85 } },
  'nostalgic':   { keyWeights: { G: 4, D: 3, A: 3, C: 2 }, scaleWeights: { dorian: 4, 'major-pentatonic': 3, mixolydian: 3, 'minor-pentatonic': 2 }, tempoRange: { min: 68, max: 98, sweetMin: 75, sweetMax: 90 } },
  'wistful':     { keyWeights: { D: 4, G: 3, A: 3, E: 2 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, 'natural-minor': 3, mixolydian: 2 }, tempoRange: { min: 65, max: 95, sweetMin: 75, sweetMax: 88 } },
  'homesick':    { keyWeights: { A: 4, D: 3, G: 3, E: 2 }, scaleWeights: { 'minor-pentatonic': 4, 'natural-minor': 3, dorian: 2, blues: 2 }, tempoRange: { min: 60, max: 90, sweetMin: 68, sweetMax: 82 } },
  'searching':   { keyWeights: { E: 4, A: 3, 'F#': 3, B: 2 }, scaleWeights: { dorian: 4, 'melodic-minor': 3, 'natural-minor': 3, mixolydian: 2 }, tempoRange: { min: 65, max: 98, sweetMin: 72, sweetMax: 88 } },
  'unrequited':  { keyWeights: { D: 4, A: 3, F: 3, 'B♭': 2 }, scaleWeights: { 'natural-minor': 4, 'harmonic-minor': 3, 'minor-pentatonic': 3, phrygian: 2 }, tempoRange: { min: 55, max: 85, sweetMin: 62, sweetMax: 78 } },
  // ── Inward warmth ──
  'tender':      { keyWeights: { A: 4, E: 4, D: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, dorian: 3, 'natural-minor': 3, 'major-pentatonic': 2 }, tempoRange: { min: 60, max: 88, sweetMin: 68, sweetMax: 80 } },
  'intimate':    { keyWeights: { E: 4, A: 3, D: 3, 'F#': 2 }, scaleWeights: { 'minor-pentatonic': 4, dorian: 3, blues: 3, 'natural-minor': 2 }, tempoRange: { min: 55, max: 85, sweetMin: 65, sweetMax: 78 } },
  'serene':      { keyWeights: { G: 4, D: 4, C: 3, A: 2 }, scaleWeights: { 'major-pentatonic': 4, major: 3, lydian: 3, dorian: 2 }, tempoRange: { min: 55, max: 82, sweetMin: 62, sweetMax: 75 } },
  'reverent':    { keyWeights: { D: 4, G: 3, A: 3, E: 2 }, scaleWeights: { major: 4, lydian: 3, 'major-pentatonic': 3, 'natural-minor': 2 }, tempoRange: { min: 50, max: 78, sweetMin: 58, sweetMax: 72 } },
  'content':     { keyWeights: { A: 4, D: 3, G: 3, E: 2 }, scaleWeights: { 'major-pentatonic': 4, dorian: 3, major: 3, lydian: 2 }, tempoRange: { min: 72, max: 100, sweetMin: 80, sweetMax: 92 } },
  'loving':      { keyWeights: { A: 4, E: 3, D: 3, G: 2 }, scaleWeights: { 'major-pentatonic': 4, major: 3, dorian: 3, lydian: 2 }, tempoRange: { min: 60, max: 90, sweetMin: 70, sweetMax: 82 } },
  // ── Light ──
  'playful':     { keyWeights: { G: 4, D: 4, A: 3, C: 3 }, scaleWeights: { 'major-pentatonic': 4, major: 4, lydian: 2, mixolydian: 2 }, tempoRange: { min: 100, max: 130, sweetMin: 108, sweetMax: 122 } },
  'mischievous': { keyWeights: { A: 4, D: 3, G: 3, E: 2 }, scaleWeights: { mixolydian: 4, blues: 3, 'major-pentatonic': 3, dorian: 2 }, tempoRange: { min: 95, max: 130, sweetMin: 105, sweetMax: 120 } },
  'joyous':      { keyWeights: { G: 4, D: 4, A: 3, C: 3 }, scaleWeights: { major: 4, 'major-pentatonic': 4, lydian: 3, mixolydian: 2 }, tempoRange: { min: 105, max: 135, sweetMin: 112, sweetMax: 128 } },
  'whimsical':   { keyWeights: { D: 4, G: 3, A: 3, 'F#': 2 }, scaleWeights: { lydian: 4, 'major-pentatonic': 3, major: 3, 'whole-tone': 2 }, tempoRange: { min: 90, max: 125, sweetMin: 100, sweetMax: 115 } },
  'buoyant':     { keyWeights: { G: 4, A: 4, D: 3, C: 2 }, scaleWeights: { 'major-pentatonic': 4, major: 3, mixolydian: 3, lydian: 2 }, tempoRange: { min: 100, max: 128, sweetMin: 108, sweetMax: 120 } },
  'celebratory': { keyWeights: { A: 4, D: 4, G: 3, E: 3 }, scaleWeights: { major: 4, 'major-pentatonic': 4, mixolydian: 3, lydian: 2 }, tempoRange: { min: 108, max: 140, sweetMin: 115, sweetMax: 132 } },
  // ── Heavy ──
  'melancholy':  { keyWeights: { D: 4, A: 3, F: 3, B: 2 }, scaleWeights: { 'natural-minor': 4, 'minor-pentatonic': 3, 'harmonic-minor': 3, dorian: 2 }, tempoRange: { min: 55, max: 82, sweetMin: 62, sweetMax: 75 } },
  'elegiac':     { keyWeights: { D: 4, F: 3, 'B♭': 3, A: 2 }, scaleWeights: { 'natural-minor': 4, 'harmonic-minor': 3, phrygian: 3, 'minor-pentatonic': 2 }, tempoRange: { min: 50, max: 78, sweetMin: 58, sweetMax: 70 } },
  'weary':       { keyWeights: { A: 4, D: 3, E: 3, G: 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 4, dorian: 2, 'natural-minor': 2 }, tempoRange: { min: 55, max: 80, sweetMin: 62, sweetMax: 75 } },
  'haunted':     { keyWeights: { 'C#': 4, F: 3, B: 3, 'E♭': 2 }, scaleWeights: { 'harmonic-minor': 4, phrygian: 3, locrian: 3, 'natural-minor': 2 }, tempoRange: { min: 50, max: 78, sweetMin: 55, sweetMax: 68 } },
  'bruised':     { keyWeights: { D: 4, A: 3, F: 3, 'B♭': 2 }, scaleWeights: { 'natural-minor': 4, blues: 3, 'minor-pentatonic': 3, dorian: 2 }, tempoRange: { min: 58, max: 85, sweetMin: 65, sweetMax: 78 } },
  'ashen':       { keyWeights: { B: 4, 'E♭': 3, 'C#': 3, F: 2 }, scaleWeights: { phrygian: 4, locrian: 3, 'natural-minor': 3, 'whole-tone': 2 }, tempoRange: { min: 45, max: 72, sweetMin: 52, sweetMax: 65 } },
  // ── Trance ──
  'hypnotic':    { keyWeights: { E: 4, A: 3, D: 3 }, scaleWeights: { dorian: 4, 'phrygian-dominant': 3, 'whole-tone': 3, phrygian: 2 }, tempoRange: { min: 75, max: 100, sweetMin: 80, sweetMax: 92 } },
  'dreamy':      { keyWeights: { D: 4, G: 3, A: 3, E: 2 }, scaleWeights: { 'major-pentatonic': 4, lydian: 3, dorian: 3, mixolydian: 2 }, tempoRange: { min: 60, max: 88, sweetMin: 68, sweetMax: 80 } },
  'floating':    { keyWeights: { 'E♭': 4, 'B♭': 3, 'F#': 3, D: 2 }, scaleWeights: { 'whole-tone': 4, lydian: 3, hirajoshi: 3, 'melodic-minor': 2 }, tempoRange: { min: 50, max: 78, sweetMin: 58, sweetMax: 70 } },
  'mystical':    { keyWeights: { E: 4, 'C#': 3, 'A♭': 3, B: 2 }, scaleWeights: { 'harmonic-minor': 4, 'phrygian-dominant': 3, hirajoshi: 3, 'double-harmonic': 2 }, tempoRange: { min: 60, max: 90, sweetMin: 68, sweetMax: 82 } },
  'meditative':  { keyWeights: { D: 4, A: 4, E: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, dorian: 3, hirajoshi: 3, 'major-pentatonic': 2 }, tempoRange: { min: 50, max: 78, sweetMin: 58, sweetMax: 70 } },
  'hallucinated':{ keyWeights: { 'E♭': 4, 'F#': 3, 'B♭': 3, 'C#': 2 }, scaleWeights: { 'whole-tone': 4, lydian: 3, 'phrygian-dominant': 3, 'harmonic-minor': 2 }, tempoRange: { min: 58, max: 88, sweetMin: 65, sweetMax: 80 } },
  'ritual':      { keyWeights: { E: 4, A: 4, D: 3 }, scaleWeights: { 'phrygian-dominant': 4, phrygian: 3, 'hungarian-minor': 3, 'harmonic-minor': 2 }, tempoRange: { min: 70, max: 100, sweetMin: 78, sweetMax: 92 } },
  'astral':      { keyWeights: { 'E♭': 4, 'A♭': 3, 'B♭': 3, 'F#': 2 }, scaleWeights: { 'whole-tone': 4, lydian: 4, 'melodic-minor': 3, hirajoshi: 2 }, tempoRange: { min: 55, max: 82, sweetMin: 62, sweetMax: 75 } },
  // ── Fire ──
  'defiant':     { keyWeights: { A: 4, E: 4, D: 3 }, scaleWeights: { phrygian: 4, blues: 3, 'harmonic-minor': 3, 'phrygian-dominant': 2 }, tempoRange: { min: 100, max: 140, sweetMin: 112, sweetMax: 132 } },
  'fierce':      { keyWeights: { E: 4, A: 3, D: 3, 'F#': 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 3, 'harmonic-minor': 3, 'phrygian-dominant': 2 }, tempoRange: { min: 105, max: 140, sweetMin: 115, sweetMax: 135 } },
  'driven':      { keyWeights: { A: 4, E: 4, D: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, blues: 3, mixolydian: 3, dorian: 2 }, tempoRange: { min: 100, max: 135, sweetMin: 110, sweetMax: 125 } },
  'triumphant':  { keyWeights: { D: 4, A: 4, G: 3, E: 3 }, scaleWeights: { major: 4, mixolydian: 3, 'major-pentatonic': 3, lydian: 2 }, tempoRange: { min: 108, max: 140, sweetMin: 118, sweetMax: 135 } },
  'vengeful':    { keyWeights: { E: 4, 'C#': 3, A: 3, 'F#': 2 }, scaleWeights: { 'harmonic-minor': 4, phrygian: 3, 'hungarian-minor': 3, 'phrygian-dominant': 2 }, tempoRange: { min: 110, max: 140, sweetMin: 120, sweetMax: 138 } },
  'urgent':      { keyWeights: { A: 4, E: 4, D: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, blues: 3, dorian: 3, phrygian: 2 }, tempoRange: { min: 115, max: 140, sweetMin: 122, sweetMax: 138 } },
  // ── Gene's world ──
  'sun-bleached':     { keyWeights: { A: 4, E: 4, G: 3, D: 2 }, scaleWeights: { 'minor-pentatonic': 4, mixolydian: 3, dorian: 3, blues: 2 }, tempoRange: { min: 78, max: 108, sweetMin: 85, sweetMax: 98 } },
  'bourbon-warm':     { keyWeights: { A: 4, E: 4, G: 3, D: 2 }, scaleWeights: { 'minor-pentatonic': 4, blues: 4, dorian: 2, 'natural-minor': 2 }, tempoRange: { min: 70, max: 95, sweetMin: 75, sweetMax: 88 } },
  'highway-hypnosis': { keyWeights: { E: 4, A: 4, D: 3 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, mixolydian: 3, 'phrygian-dominant': 2 }, tempoRange: { min: 78, max: 105, sweetMin: 85, sweetMax: 98 } },
  'motel-neon':       { keyWeights: { 'C#': 3, 'E♭': 3, 'B♭': 3, F: 2 }, scaleWeights: { dorian: 4, phrygian: 3, 'natural-minor': 3, 'harmonic-minor': 2 }, tempoRange: { min: 80, max: 105, sweetMin: 85, sweetMax: 98 } },
  'slow-sunday':      { keyWeights: { G: 4, D: 4, C: 3, A: 2 }, scaleWeights: { 'major-pentatonic': 4, blues: 3, mixolydian: 3, dorian: 2 }, tempoRange: { min: 55, max: 78, sweetMin: 62, sweetMax: 72 } },
  'dawn-patrol':      { keyWeights: { E: 4, A: 3, D: 3, B: 2 }, scaleWeights: { 'minor-pentatonic': 4, hirajoshi: 3, dorian: 3, 'natural-minor': 2 }, tempoRange: { min: 68, max: 92, sweetMin: 75, sweetMax: 85 } },
  'riptide':          { keyWeights: { E: 4, A: 4, D: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, blues: 3, mixolydian: 3, dorian: 2 }, tempoRange: { min: 85, max: 115, sweetMin: 92, sweetMax: 108 } },
  'cactus-bloom':     { keyWeights: { A: 4, E: 3, G: 3, D: 2 }, scaleWeights: { 'major-pentatonic': 4, mixolydian: 3, dorian: 3, lydian: 2 }, tempoRange: { min: 78, max: 105, sweetMin: 85, sweetMax: 98 } },
  'last-ferry':       { keyWeights: { D: 4, A: 3, G: 3, E: 2 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, 'natural-minor': 3, blues: 2 }, tempoRange: { min: 72, max: 98, sweetMin: 80, sweetMax: 92 } },
  'summer-squall':    { keyWeights: { A: 4, E: 4, D: 3, G: 2 }, scaleWeights: { 'minor-pentatonic': 4, blues: 3, phrygian: 3, 'phrygian-dominant': 2 }, tempoRange: { min: 95, max: 130, sweetMin: 105, sweetMax: 122 } },
  'red-rock':         { keyWeights: { E: 4, A: 4, D: 3 }, scaleWeights: { 'phrygian-dominant': 4, 'minor-pentatonic': 3, blues: 3, 'hungarian-minor': 2 }, tempoRange: { min: 70, max: 98, sweetMin: 78, sweetMax: 90 } },
  'siesta':           { keyWeights: { A: 4, D: 4, G: 3, E: 2 }, scaleWeights: { dorian: 4, 'major-pentatonic': 3, mixolydian: 3, 'minor-pentatonic': 2 }, tempoRange: { min: 60, max: 85, sweetMin: 68, sweetMax: 78 } },
  'after-party':      { keyWeights: { A: 4, G: 3, D: 3, E: 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 4, mixolydian: 2, dorian: 2 }, tempoRange: { min: 72, max: 100, sweetMin: 80, sweetMax: 92 } },
  'porch-swing':      { keyWeights: { G: 4, D: 4, A: 3, C: 2 }, scaleWeights: { 'major-pentatonic': 4, mixolydian: 3, dorian: 3, major: 2 }, tempoRange: { min: 68, max: 95, sweetMin: 75, sweetMax: 88 } },
  'palm-shade':       { keyWeights: { A: 4, E: 3, G: 3, D: 2 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, mixolydian: 3, 'major-pentatonic': 2 }, tempoRange: { min: 70, max: 95, sweetMin: 78, sweetMax: 90 } },
  'saltwater':        { keyWeights: { E: 4, A: 4, G: 3, D: 2 }, scaleWeights: { 'minor-pentatonic': 4, mixolydian: 3, dorian: 3, hirajoshi: 2 }, tempoRange: { min: 82, max: 112, sweetMin: 90, sweetMax: 105 } },
  'fogbank':          { keyWeights: { D: 4, G: 3, 'E♭': 3, A: 2 }, scaleWeights: { dorian: 4, 'whole-tone': 3, lydian: 3, hirajoshi: 2 }, tempoRange: { min: 58, max: 85, sweetMin: 65, sweetMax: 78 } },
  'gold-hour':        { keyWeights: { A: 4, E: 4, G: 3, D: 2 }, scaleWeights: { 'major-pentatonic': 4, mixolydian: 3, dorian: 3, major: 2 }, tempoRange: { min: 75, max: 100, sweetMin: 82, sweetMax: 95 } },
  'backroad':         { keyWeights: { D: 4, G: 4, A: 3, E: 2 }, scaleWeights: { mixolydian: 4, 'major-pentatonic': 3, blues: 3, dorian: 2 }, tempoRange: { min: 72, max: 95, sweetMin: 78, sweetMax: 88 } },
  'agave-sun':        { keyWeights: { A: 4, E: 3, D: 3, G: 2 }, scaleWeights: { mixolydian: 4, 'major-pentatonic': 3, dorian: 3, 'minor-pentatonic': 2 }, tempoRange: { min: 72, max: 98, sweetMin: 80, sweetMax: 92 } },
  // ── Cosmic ──
  'vast':         { keyWeights: { 'E♭': 4, 'B♭': 3, 'F#': 3, A: 2 }, scaleWeights: { lydian: 4, 'whole-tone': 3, 'melodic-minor': 3, major: 2 }, tempoRange: { min: 55, max: 82, sweetMin: 62, sweetMax: 75 } },
  'oceanic':      { keyWeights: { E: 4, A: 3, D: 3, 'E♭': 2 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, lydian: 3, 'whole-tone': 2 }, tempoRange: { min: 60, max: 88, sweetMin: 68, sweetMax: 80 } },
  'interstellar': { keyWeights: { 'F#': 4, 'C#': 3, 'E♭': 3, B: 2 }, scaleWeights: { lydian: 4, 'whole-tone': 4, hirajoshi: 3, 'melodic-minor': 2 }, tempoRange: { min: 55, max: 80, sweetMin: 60, sweetMax: 72 } },
  'sublime':      { keyWeights: { A: 4, 'E♭': 3, D: 3, 'B♭': 2 }, scaleWeights: { major: 4, lydian: 3, 'harmonic-minor': 3, 'natural-minor': 2 }, tempoRange: { min: 58, max: 90, sweetMin: 65, sweetMax: 82 } },
  'luminous':     { keyWeights: { G: 4, D: 4, A: 3, 'E♭': 2 }, scaleWeights: { major: 4, lydian: 4, 'major-pentatonic': 3, 'melodic-minor': 2 }, tempoRange: { min: 62, max: 92, sweetMin: 70, sweetMax: 85 } },
  'gravitational':{ keyWeights: { E: 4, A: 4, D: 3 }, scaleWeights: { 'minor-pentatonic': 4, dorian: 3, 'phrygian-dominant': 3, 'natural-minor': 2 }, tempoRange: { min: 60, max: 88, sweetMin: 68, sweetMax: 80 } },
  // ── Edge ──
  'anxious':      { keyWeights: { 'C#': 4, 'F#': 3, B: 3, 'B♭': 2 }, scaleWeights: { 'harmonic-minor': 4, phrygian: 3, locrian: 3, 'natural-minor': 2 }, tempoRange: { min: 100, max: 132, sweetMin: 108, sweetMax: 125 } },
  'restless':     { keyWeights: { A: 4, E: 3, 'F#': 3, D: 2 }, scaleWeights: { dorian: 4, 'melodic-minor': 3, mixolydian: 3, blues: 2 }, tempoRange: { min: 95, max: 130, sweetMin: 105, sweetMax: 122 } },
  'electric':     { keyWeights: { E: 4, A: 4, D: 3, G: 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 3, 'phrygian-dominant': 3, mixolydian: 2 }, tempoRange: { min: 105, max: 140, sweetMin: 115, sweetMax: 132 } },
  'paranoid':     { keyWeights: { 'C#': 4, F: 3, B: 3, 'E♭': 2 }, scaleWeights: { phrygian: 4, locrian: 3, 'harmonic-minor': 3, 'hungarian-minor': 2 }, tempoRange: { min: 88, max: 120, sweetMin: 95, sweetMax: 112 } },
  // ── Cold ──
  'icy':          { keyWeights: { B: 4, 'C#': 3, 'E♭': 3, 'F#': 2 }, scaleWeights: { lydian: 4, 'whole-tone': 3, 'melodic-minor': 3, locrian: 2 }, tempoRange: { min: 50, max: 78, sweetMin: 55, sweetMax: 68 } },
  'aloof':        { keyWeights: { 'F#': 4, 'C#': 3, B: 3, 'E♭': 2 }, scaleWeights: { dorian: 4, lydian: 3, 'whole-tone': 3, 'melodic-minor': 2 }, tempoRange: { min: 62, max: 90, sweetMin: 70, sweetMax: 82 } },
  'clinical':     { keyWeights: { C: 4, 'E♭': 3, 'A♭': 3, F: 2 }, scaleWeights: { major: 4, lydian: 3, 'whole-tone': 3, 'melodic-minor': 2 }, tempoRange: { min: 80, max: 115, sweetMin: 90, sweetMax: 105 } },
  'alienated':    { keyWeights: { 'E♭': 4, 'B♭': 3, 'C#': 3, 'A♭': 2 }, scaleWeights: { locrian: 4, 'whole-tone': 3, phrygian: 3, 'harmonic-minor': 2 }, tempoRange: { min: 55, max: 82, sweetMin: 62, sweetMax: 75 } },
  // ── Grit ──
  'smoldering':   { keyWeights: { A: 4, E: 4, D: 3, 'F#': 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 3, dorian: 3, 'phrygian-dominant': 2 }, tempoRange: { min: 72, max: 100, sweetMin: 80, sweetMax: 92 } },
  'sensual':      { keyWeights: { A: 4, D: 4, E: 3, G: 2 }, scaleWeights: { dorian: 4, 'minor-pentatonic': 3, blues: 3, mixolydian: 2 }, tempoRange: { min: 65, max: 92, sweetMin: 72, sweetMax: 85 } },
  'weathered':    { keyWeights: { E: 4, A: 4, D: 3, G: 2 }, scaleWeights: { blues: 4, 'minor-pentatonic': 4, dorian: 2, mixolydian: 2 }, tempoRange: { min: 70, max: 98, sweetMin: 78, sweetMax: 90 } },
  'repressed':    { keyWeights: { D: 4, F: 3, B: 3, 'C#': 2 }, scaleWeights: { 'natural-minor': 4, 'harmonic-minor': 3, phrygian: 3, 'minor-pentatonic': 2 }, tempoRange: { min: 58, max: 85, sweetMin: 65, sweetMax: 78 } },
  'stoic':        { keyWeights: { A: 4, E: 3, D: 3, B: 2 }, scaleWeights: { 'minor-pentatonic': 4, 'natural-minor': 3, dorian: 3, blues: 2 }, tempoRange: { min: 68, max: 95, sweetMin: 75, sweetMax: 88 } },
};

// ─── Phase E: High-value pairwise overlays for the new dims ───
// Hand-crafted guidance snippets for combos where texture × harmonic-target
// (or other pairs) produce something more than the sum of parts. Keys are
// `${dimId1}:${valueId1}|${dimId2}:${valueId2}` with dims sorted alphabetically.
// ChallengeCard consults these AFTER the main guidance and renders them as
// a highlight if any match the current card's drawn dims.
const PHASE_E_COMBO_OVERLAYS = {
  // Texture × Harmonic target — the highest-leverage pairs for guitar mastery
  'harmonicTarget:arpeggio135|texture:fullChord':    'Play the triad as a block voicing on the downbeat, then arpeggiate through 1-3-5 on the upbeats. The chord and the arpeggio are the same three notes — this drills your ability to hear them as one thing.',
  'harmonicTarget:arpeggio135|texture:triadPartial': 'Use upper-register 3-string partials (top three strings) — the triad IS the texture. Each strum is the full arpeggio. No wasted motion.',
  'harmonicTarget:arpeggio135|texture:doubleStops':  'Play thirds and sixths — any two of root/3rd/5th at a time. 3rds are tight, 6ths are open; alternating them is how you build harmonized lines.',
  'harmonicTarget:chordToneLanding|texture:mixedTextures': 'Stab a chord, then land a single-note fill on the 3rd or 5th of whatever chord is sounding. The chord stab is your reminder of WHERE to aim the fill.',
  'harmonicTarget:colorTone79|texture:fullChord':    'Build voicings that include the 7th and/or 9th — no plain triads. Jazz and bossa territory. Let the extension be the loudest note in the voicing.',
  'harmonicTarget:colorTone79|texture:triadPartial': 'Play upper-string partials that hit a 7th or 9th against the root on a lower string. The classic Khruangbin/jazz comping sound — small voicings, wide harmony.',
  // Texture × Note transition
  'noteTransition:slideConnect|texture:fullChord':   'Slide entire chord shapes between positions — like reggae upstrokes with sliding triads or surf-rock parallel sixth chords. The slide IS the groove.',
  'noteTransition:hammerPull|texture:fullChord':     'Chord hammers — pick the bass string, hammer the rest into the chord. Pop/country ornamentation. The left hand builds the chord after the attack starts.',
  // Texture × Picking hand — strumming patterns emerge compositionally
  'pickingHand:fingerpick|texture:fullChord':        'Arpeggiate the chord with independent fingers. Travis, PIMA, clawhammer — the pattern emerges from your wrist, not a rule.',
  'pickingHand:alternate|texture:fullChord':         'Alternating down-up strums. The "and" between each beat gets an upstroke. Standard rock, punk, ska rhythm guitar.',
  'pickingHand:downstrokes|texture:triadPartial':    'Downstroke-only partial voicings — reggae skank territory. The accent lands on 2 and 4, never on 1 or 3. Let the space between hits do most of the work.',
  // Vowel × Onset — voice-specific pedagogically rich combos
  'onset:breathyOnset|vowel:ee':                     '/ee/ is the tightest vowel — forcing a breathy onset on it trains glottal release. Start with air, let pitch arrive second.',
  'onset:slideIn|vowel:ah':                          'Slide up into an open /ah/ from a half-step below. The mouth is already in the right shape; only pitch has to travel.',
  // Vibrato × Note transition
  'noteTransition:bendTarget|vibrato:lateEntry':     'Bend to the target, land, hold straight for one beat, then let vibrato bloom in. The classic blues/rock lead vocabulary.',
};

// Look up a pairwise overlay for the current card's drawn dims. Returns
// the first match found, or null. Called from ChallengeCard alongside the
// existing guidance lookup.
function lookupPhaseECombo(card) {
  const c = card.constraints;
  // Gather drawn dim:value pairs in the Phase B+C+D dim set.
  const drawn = [];
  for (const dimId of ['harmonicTarget', 'phraseStructure', 'texture', 'vowel', 'onset', 'pickingHand', 'neckZone', 'noteTransition', 'vibrato']) {
    const v = c[dimId];
    if (v && v.id) drawn.push(`${dimId}:${v.id}`);
  }
  // Try all alphabetically-sorted pairs.
  const hits = [];
  for (let i = 0; i < drawn.length; i++) {
    for (let j = i + 1; j < drawn.length; j++) {
      const key = [drawn[i], drawn[j]].sort().join('|');
      if (PHASE_E_COMBO_OVERLAYS[key]) hits.push({ key, text: PHASE_E_COMBO_OVERLAYS[key] });
    }
  }
  return hits;
}

function lookupMoodOverlay(mood) {
  if (!mood) return null;
  return MOOD_OVERLAYS[mood] || `Bring a sense of ${mood} to every phrase — let the mood color your choices without changing the mechanical constraints.`;
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
// Compose a single-sentence practice prompt that synthesizes the chord
// progression with the other drawn dims (texture/picking on guitar,
// register/vowel on voice, harmonicTarget everywhere). Renders inside the
// progression banner so the reader gets a coherent instruction —
// "fingerpick double-stops over the Andalusian, landing on chord tones
// of each chord as it passes" — instead of four disconnected stickers.
// Returns null if no progression is on the card or nothing meaningful to
// compose with.
function composeProgressionSynthesis(card) {
  const cp = card?.constraints?.chordProgression;
  if (!cp?.resolvedChords?.length) return null;

  // Short-name strips the parenthetical notation from the progression label
  // so "Pop axis (I–V–vi–IV)" reads as "Pop axis" in running prose.
  const progShort = cp.name.replace(/\s*\([^)]*\)\s*/, '').trim();

  const GUITAR_TEXTURE_WORDS = {
    singleLine: 'single-note lines',
    doubleStops: 'double-stops',
    triadPartial: 'triad partials',
    fullChord: 'full chord voicings',
    mixedTextures: 'mixed textures — chord stabs with single-note fills',
  };
  const GUITAR_PICKING_WORDS = {
    downstrokes: ', all downstrokes,',
    alternate: ', alternate-picked,',
    fingerpick: ', fingerpicked,',
    hybrid: ', hybrid-picked,',
  };
  const VOICE_REGISTER_WORDS = {
    chest: 'chest voice',
    head: 'head voice',
    mixed: 'mixed voice',
    falsetto: 'falsetto',
    breathy: 'breathy voice',
  };
  const VOICE_VOWEL_WORDS = {
    ah: 'open /ah/',
    eh: '/eh/',
    ee: '/ee/',
    oh: '/oh/',
    oo: '/oo/',
    hum: 'a hum',
    scatSyllables: 'scat syllables',
    realLyrics: 'real lyrics',
  };

  const c = card.constraints;
  const parts = [];
  let hasLead = false;

  // Opening: "Do X over the [progName]."
  if (card.instrument === 'guitar') {
    const textureWord = GUITAR_TEXTURE_WORDS[c.texture?.id];
    const pickingWord = GUITAR_PICKING_WORDS[c.pickingHand?.id] || '';
    if (textureWord) {
      parts.push(`Play ${textureWord}${pickingWord} over the ${progShort}.`);
      hasLead = true;
    } else if (pickingWord) {
      const pickingOpener = pickingWord.replace(/,/g, '').trim();
      parts.push(`Play ${pickingOpener} over the ${progShort}.`);
      hasLead = true;
    }
  } else {
    const registerWord = VOICE_REGISTER_WORDS[c.register?.id];
    const vowelWord = VOICE_VOWEL_WORDS[c.vowel?.id];
    if (registerWord || vowelWord) {
      const regPart = registerWord || 'your voice';
      const vowelPart = vowelWord ? ` on ${vowelWord}` : '';
      parts.push(`Sing in ${regPart}${vowelPart} over the ${progShort}.`);
      hasLead = true;
    }
  }

  // Harmonic target × progression — the main "how to compose with the
  // changes" directive. The standalone harmonicTarget desc talks about a
  // backing track or the tonic triad, which reads stale once a progression
  // is the live harmonic context; this line restates the target against
  // the cycle.
  switch (c.harmonicTarget?.id) {
    case 'chordToneLanding':
      parts.push('Land each phrase on a chord tone (root, 3rd, or 5th) of whichever chord of the cycle is sounding.');
      break;
    case 'arpeggio135':
      parts.push('Outline the 1-3-5 of the current chord as each one passes — the arpeggio follows the changes.');
      break;
    case 'colorTone79':
      parts.push('Reach for 7ths, 9ths, and 11ths of whichever chord is active — extensions, not just the tonic.');
      break;
    case 'scaleShape':
      // scaleShape is the default "no harmonic target" — skip unless we
      // otherwise have nothing to say.
      if (!hasLead) parts.push(`Improvise freely through the ${progShort}, staying inside the scale.`);
      break;
    default:
      break;
  }

  // If nothing composable fired (no texture/picking/register/vowel/harmonic),
  // the banner's own subtitle already tells the player the vibe + bars —
  // returning null lets the banner stay compact.
  if (parts.length === 0) return null;
  return parts.join(' ');
}

// A short "how to actually practice this" nudge that appears below the
// synthesis line. Combo-aware — picks the tip whose dim combo is on the
// card so the player gets a concrete rep suggestion, not generic advice.
// Returns null if the combo is uninteresting (card relies on the vibe
// subtitle's "cycle through the changes" default).
function composeProgressionPracticeTip(card) {
  const cp = card?.constraints?.chordProgression;
  if (!cp?.resolvedChords?.length) return null;
  const c = card.constraints;
  const texture = c.texture?.id;
  const picking = c.pickingHand?.id;
  const ht = c.harmonicTarget?.id;
  const hasBlues = /^blues/.test(cp.id);
  const barCount = cp.bars || cp.resolvedChords.length;

  // Most specific combos first.
  if (texture === 'singleLine' && ht === 'chordToneLanding') {
    return 'Pro tip: use the BAR BEFORE a chord change to announce the next chord\'s target note. That anticipation is the whole skill here.';
  }
  if (texture === 'singleLine' && ht === 'arpeggio135') {
    return 'Pro tip: arpeggiate the CURRENT chord — your triad shifts every bar, so the phrase shape rotates with it.';
  }
  if (texture === 'singleLine' && ht === 'colorTone79') {
    return 'Pro tip: hit the 7th or 9th of each chord on the downbeat of that chord\'s bar — color tones are strongest when they land on a change.';
  }
  if (texture === 'triadPartial') {
    return 'Pro tip: find the SMALLEST motion between chord shapes (top three strings on the same frets whenever possible). Tight voice-leading is the sound of pro comping.';
  }
  if (texture === 'fullChord') {
    return 'Pro tip: don\'t rush chord changes — place each change on the downbeat with intention. The groove lives in HOW you land each one.';
  }
  if (texture === 'doubleStops') {
    return 'Pro tip: pick pairs that share one note between chords — that common tone keeps the line connected across changes.';
  }
  if (texture === 'mixedTextures') {
    return 'Pro tip: stabs on the chord change, fills in the space between. The chord is the anchor; the fill is the sentence.';
  }
  if (picking === 'fingerpick') {
    return 'Pro tip: let the thumb trace the root of whichever chord is sounding. Fingers handle the triad above, thumb narrates the progression underneath.';
  }
  if (ht === 'chordToneLanding') {
    return 'Pro tip: if your phrase lands on a root it feels grounded, on a 3rd it feels bright, on a 5th it feels open. Mix the landings.';
  }
  if (ht === 'arpeggio135') {
    return 'Pro tip: the same 1-3-5 shape shifts up and down the neck as chords change — find the shape, then just move it.';
  }
  // Big cycles (blues + 8+ chord forms) benefit from timing practice over engagement tips.
  if (hasBlues || barCount >= 8) {
    return 'Pro tip: loop it first at half tempo, locked to the metronome, until every change feels automatic. Then turn the loop into music.';
  }
  if (card.instrument === 'voice') {
    return 'Pro tip: hum the root of each chord before singing over it — your body needs to HEAR the change to phrase naturally across it.';
  }
  return 'Pro tip: play the progression once as chord stabs to feel the changes, then once with your target texture on top. Two passes = one learning round.';
}

// Surface the characteristic interval(s) that make a mode sound like
// itself. Shown below the synthesis so the player knows WHICH note to
// actively listen for — "modal sound" is always just a few specific
// color tones. Returns null for non-distinctive scales.
const MODAL_CHARACTER_CALLOUTS = {
  'dorian':            'Dorian color: the natural 6. Major-6 against a minor tonic — that\'s the whole sound.',
  'mixolydian':        'Mixolydian color: the flat 7. It turns V minor and makes bVII a native chord — not borrowed.',
  'lydian':            'Lydian color: the raised 4. The "lift" that makes Lydian sound brighter than major.',
  'phrygian':          'Phrygian color: the flat 2. That half-step above the tonic is the Spanish/metal signature.',
  'phrygian-dominant': 'Phrygian-dominant color: flat 2 + major 3. Aug-2nd between them = flamenco fire.',
  'harmonic-minor':    'Harmonic-minor color: the raised 7 (leading tone). The pull into the tonic that makes this NOT natural minor.',
  'melodic-minor':     'Melodic-minor color: major 6 AND 7. Jazz\'s sweetest minor — minor root, major top.',
  'hungarian-minor':   'Hungarian-minor color: raised 4 AND raised 7 — two augmented-2nd jumps, full gypsy bite.',
  'double-harmonic':   'Double-harmonic color: flat 2 AND raised 7 — Byzantine signature, two aug 2nds.',
  'locrian':           'Locrian color: flat 2 AND flat 5. The only diminished-tonic mode — unstable by design.',
};

function droneRootFromCard(key, scale) {
  const minorScales = [
    'minor-pentatonic', 'natural-minor', 'blues', 'dorian', 'phrygian',
    // Phase F additions (minor-quality: have ♭3)
    'harmonic-minor', 'melodic-minor', 'hungarian-minor', 'locrian', 'hirajoshi',
  ];
  return minorScales.includes(scale) ? `${key}m` : key;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ─── Backing tracks ───
//
// Phase B: each track now carries an optional `progression` sidecar with:
//   - trackKey: the tonal center of the loop (pitch class)
//   - mode: 'major' | 'minor' | 'modal'
//   - chords: array of roman-numeral chords in loop order (one per bar/hit)
//
// The `harmonicTarget = chord-tone-landing` value uses this metadata to tell
// the player which chord tones to target. If a track has no `progression`,
// chord-tone-landing falls back to `arpeggio-1-3-5` (which targets the tonic
// triad and works over a drone — no chord changes required).
//
// Chord annotations are approximate — they describe the harmonic feel of the
// loop, not a transcription. For Gene's practice context this is enough: the
// goal is to learn to TARGET the 3rd of whatever chord is sounding, not to
// analyze the exact voicing. Progressions below were informed by the track
// names (reggae one-drop = I-V / I-IV typical, bossa = ii-V-I, etc.) and are
// transposable to any key via the normal Roman numeral mapping.
const BACKING_TRACKS = [
  { src: '/reggae-one-drop-85.mp3', genre: 'reggae', bpm: 85, name: 'Reggae One Drop',
    progression: { mode: 'minor', chords: ['i', 'VII', 'VI', 'VII'] } },
  { src: '/khruangbin-style-80.mp3', genre: 'desert-blues', bpm: 80, name: 'Khruangbin Style',
    progression: { mode: 'minor', chords: ['i', 'iv', 'v', 'i'] } },
  { src: '/desert-blues-75.mp3', genre: 'desert-blues', bpm: 75, name: 'Desert Blues',
    progression: { mode: 'minor', chords: ['i', 'iv', 'i', 'v'] } },
  { src: '/surf-rock-120.mp3', genre: 'surf', bpm: 120, name: 'Surf Rock',
    progression: { mode: 'minor', chords: ['i', 'VI', 'III', 'VII'] } },
  { src: '/soul-funk-groove-90.mp3', genre: 'soul', bpm: 90, name: 'Soul Funk Groove',
    progression: { mode: 'minor', chords: ['i7', 'iv7', 'i7', 'v7'] } },
  { src: '/groove-beat-90.mp3', genre: null, bpm: 90, name: 'Groove Beat' /* no progression → drone only */ },
  { src: '/psych-rock-120.mp3', genre: 'surf', bpm: 120, name: 'Psych Rock',
    progression: { mode: 'minor', chords: ['i', 'bVII', 'VI', 'V'] } },
  { src: '/deep-soul-groove-80.mp3', genre: 'soul', bpm: 80, name: 'Deep Soul Groove',
    progression: { mode: 'minor', chords: ['i7', 'IV7', 'i7', 'iv7'] } },
  { src: '/dub-reggae-85.mp3', genre: 'reggae', bpm: 85, name: 'Dub Reggae',
    progression: { mode: 'minor', chords: ['i', 'iv'] } },
  { src: '/bossa-nova-75.mp3', genre: null, bpm: 75, name: 'Bossa Nova',
    progression: { mode: 'minor', chords: ['ii7', 'V7', 'i7', 'i7'] } },
  { src: '/afrobeat-100.mp3', genre: null, bpm: 100, name: 'Afrobeat',
    progression: { mode: 'minor', chords: ['i', 'iv', 'i', 'iv'] } },
  { src: '/ska-upbeat-95.mp3', genre: 'reggae', bpm: 95, name: 'Ska Upbeat',
    progression: { mode: 'major', chords: ['I', 'IV', 'V', 'IV'] } },
  { src: '/cinematic-western-80.mp3', genre: 'desert-blues', bpm: 80, name: 'Cinematic Western',
    progression: { mode: 'minor', chords: ['i', 'VI', 'VII', 'i'] } },
  { src: '/reggae-rock-100.mp3', genre: 'reggae', bpm: 100, name: 'Reggae Rock',
    progression: { mode: 'minor', chords: ['i', 'VII', 'VI', 'V'] } },
];

function suggestTrack(card) {
  // Match by tempo proximity only — genre is no longer a separate constraint
  // (it emerges from the combination of rhythm + dynamics + articulation choices)
  const tempo = card.constraints.tempo;
  const candidates = [...BACKING_TRACKS].sort((a, b) => Math.abs(a.bpm - tempo) - Math.abs(b.bpm - tempo));
  return candidates[0] || null;
}

// Does a given track have usable chord-progression metadata for
// chord-tone-landing? Used by the fallback logic in drawRandom.
function trackHasProgression(track) {
  return !!(track && track.progression && Array.isArray(track.progression.chords) && track.progression.chords.length > 0);
}

// ─── Constraint Dimensions ───
const KEY_WEIGHTS = {
  'A': 4, 'E': 3, 'G': 3, 'D': 2, 'C': 2, 'F': 1, 'B♭': 1,
  'F#': 1, 'B': 1, 'C#': 0.5, 'A♭': 0.5, 'E♭': 0.5,
};

// ─── Phase F: Mood-aware context resolution ───
const MOOD_COHERENCE_RATE = 0.7; // 70% chance to keep previous card's mood

function drawMood(previousMood, lockedMood) {
  if (lockedMood) return lockedMood;
  if (previousMood && Math.random() < MOOD_COHERENCE_RATE) return previousMood;
  return MOOD_FLAT[Math.floor(Math.random() * MOOD_FLAT.length)];
}

function resolveKeyWeights(mood) {
  const affinity = mood && MOOD_AFFINITY[mood] && MOOD_AFFINITY[mood].keyWeights;
  if (!affinity) return CHROMATIC.map(k => KEY_WEIGHTS[k] || 1);
  return CHROMATIC.map(k => {
    const baseline = KEY_WEIGHTS[k] || 1;
    const boost = affinity[k];
    return boost !== undefined ? boost : baseline * 0.5;
  });
}

function resolveScaleWeights(mood, tier) {
  const base = getScaleWeights(tier);
  const affinity = mood && MOOD_AFFINITY[mood] && MOOD_AFFINITY[mood].scaleWeights;
  if (!affinity) return base;
  return Object.keys(SCALE_TYPES).map((k, i) => {
    if (base[i] === 0) return 0; // tier gate still wins
    const boost = affinity[k];
    return boost !== undefined ? boost : base[i] * 0.5;
  });
}

function resolveTempoRange(mood) {
  const range = mood && MOOD_AFFINITY[mood] && MOOD_AFFINITY[mood].tempoRange;
  if (!range) return { min: 60, max: 140, sweetMin: 85, sweetMax: 120 };
  return range;
}

// Pitch contour = pure shape constraint. `questionAnswer` was moved to the
// PHRASE_STRUCTURE_CONSTRAINTS dim in Phase B (v2) — it's a phrase-level form,
// not a note-level contour, and keeping it here overloaded the axis.
// v1 cards with `questionAnswer` migrate to `phraseStructure:question-answer`
// via migrateForgeDataV1ToV2.
const PITCH_CONSTRAINTS = [
  { id: 'leaps', name: 'Leaps Only', desc: 'Never sing two neighboring notes in a row. Always skip at least one note in the scale when moving. This forces big, dramatic jumps instead of smooth walking.',
    descGuitar: 'Never play two neighboring notes in a row. Always skip at least one note in the scale when moving. This forces big, dramatic jumps instead of smooth walking.', icon: '↗',
    example: (notes) => notes.length >= 5 ? `Your notes: ${notes.join(', ')}. Try: ${notes[0]}→${notes[2]}→${notes[4]}→${notes[1]} (skipping at least one each time)` : '' },
  { id: 'stepwise', name: 'Stepwise Only', desc: 'Always move to a neighboring note in the scale — never skip. Walking melodies, no jumps allowed. Trains the smooth voice-leading every great melody depends on.',
    descGuitar: 'Always move to a neighboring note in the scale — never skip. Walking melodies, no jumps allowed. Trains smooth stepwise motion every great melody depends on.', icon: '↘',
    example: (notes) => notes.length >= 5 ? `Your notes: ${notes.join(', ')}. Try: ${notes[0]}→${notes[1]}→${notes[2]}→${notes[1]}→${notes[0]} (only neighbors)` : '' },
  { id: 'arch', name: 'Arch Contour', desc: 'Every phrase must climb up to a peak note and then come back down. The shape is a hill — go up, come down. No flat or downward-only phrases.', icon: '⌢',
    example: (notes) => notes.length >= 5 ? `Try: ${notes[0]}→${notes[2]}→${notes[4]}→${notes[2]}→${notes[0]} (up to ${notes[4]}, back to ${notes[0]})` : '' },
  { id: 'seed', name: 'Seed + Variations', desc: 'Pick any 3 notes as your "seed" idea. Repeat it again and again, but change exactly ONE note each time. The shape stays recognizable while the melody slowly evolves.', icon: '🌱',
    example: (notes) => notes.length >= 4 ? `Seed: ${notes[0]}-${notes[1]}-${notes[2]}. Var 1: ${notes[0]}-${notes[1]}-${notes[3]}. Var 2: ${notes[0]}-${notes[3]}-${notes[2]}.` : '' },
  { id: 'forbidden', name: 'Forbidden Notes', desc: 'Some notes from the scale are off-limits — pretend they don\'t exist. The fewer notes you have, the more rhythm, dynamics, and phrasing have to do the melodic work. This is mastery training.', icon: '🚫', hasExtra: true },
  { id: 'targetLanding', name: 'Target Landing', desc: 'Wander freely through any notes you want, but every phrase MUST end on one specific target note. The journey changes; the destination never does.', icon: '🎯', hasExtra: true },
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
    example: (notes, tempo, instrument) => `At ${tempo} BPM: 1 bar = ${(4*60/tempo).toFixed(1)}s. ${instrument === 'guitar' ? 'Play' : 'Sing'} for 2 beats, rest for 2+ beats.` },
  { id: 'offbeat', name: 'Offbeat', desc: 'Notes land between the beats, never on 1 or 3. Feel the groove push and pull against the metronome.', icon: '⚡',
    example: (notes, tempo, instrument) => `At ${tempo} BPM: metronome clicks on 1,2,3,4 — you ${instrument === 'guitar' ? 'play' : 'sing'} on the "&" between each click (every ${(30/tempo).toFixed(2)}s offset).` },
  { id: 'rhythmSeed', name: 'Rhythmic Seed', desc: 'Pick a short cell (long-short-short or short-long-rest) and repeat it, varying the pitches each time.', icon: '🔄',
    example: (notes, tempo) => `Seed: quarter-eighth-eighth (${(60/tempo).toFixed(2)}s + ${(30/tempo).toFixed(2)}s + ${(30/tempo).toFixed(2)}s). Keep the rhythm, change the notes.` },
  { id: 'triplets', name: 'Triplets Only', desc: 'Three notes per beat instead of the usual two or four. Forces a different internal pulse — the swung, rolling feel of triplet subdivision instead of the straight square of duple time.', icon: '⋯',
    example: (notes, tempo) => `At ${tempo} BPM: 1 beat = ${(60/tempo).toFixed(2)}s. Each triplet note = ${(20/tempo).toFixed(2)}s. Count "tri-pl-et, tri-pl-et" instead of "1-and-2-and".` },
  { id: '3-3-2', name: '3-3-2 Tresillo', desc: 'Divide 8 eighth-notes into groups of 3 + 3 + 2. Accents land on beats 1, the "&" of 2, and beat 4. The backbone of clave, habanera, reggaeton, and a huge swath of Latin/Afro-Cuban music. Mathematically pure — it\'s not a genre preset, it\'s a subdivision pattern you can overlay on any groove.', icon: '▞',
    example: (notes, tempo) => `At ${tempo} BPM over 1 bar: accent on beat 1, accent on the "&" of 2, accent on beat 4. Play/rest between. Count "1-2-3, 1-2-3, 1-2".` },
];

const DYNAMICS_CONSTRAINTS = [
  { id: 'swell', name: 'The Swell', desc: 'Start barely audible, slowly grow to full voice, then drop instantly to silence. Like a wave: build, crest, vanish.',
    descGuitar: 'Start barely audible, slowly grow to full volume, then drop instantly to silence. Like a wave: build, crest, vanish.', icon: '🌊',
    example: (notes, tempo) => `At ${tempo} BPM: 4 bars = ${(16*60/tempo).toFixed(0)}s. Build for ${(12*60/tempo).toFixed(0)}s, hold peak 1 beat, then silence.` },
  { id: 'terraces', name: 'Terraces', desc: 'Jump suddenly between volume levels — quiet for 2 bars, then medium, then loud. No fading between, just hard switches like climbing stairs.', icon: '🪜',
    example: (notes, tempo) => `Each plateau is 2 bars = ${(8*60/tempo).toFixed(0)}s. Switch dynamic instantly on the downbeat — no fades.` },
  { id: 'whisper', name: 'Whisper', desc: 'Sing the entire round at the quietest volume you can manage — almost inaudible, like telling a secret. Requires MORE breath control, not less.',
    descGuitar: 'Play the entire round at the quietest volume you can manage — almost inaudible, like telling a secret. Requires MORE touch control, not less.', icon: '🤫' },
  { id: 'accentMap', name: 'Accent Map', desc: 'Sing quietly, but punch one note per bar suddenly loud — then back to quiet. The loud note stands out like a highlighted word.',
    descGuitar: 'Play quietly, but punch one note per bar suddenly loud — then back to quiet. The loud note stands out like a highlighted word.', icon: '🎯',
    example: (notes, tempo) => `1 accent per bar (${(4*60/tempo).toFixed(1)}s window). Try: bar 1 accent on beat 1, bar 2 on beat 3, bar 3 on the "&" of 2.` },
  { id: 'forte', name: 'Constant Forte', desc: 'Sing at full volume throughout — fill the room. No holding back, no quiet moments. Pure power.',
    descGuitar: 'Play at full volume throughout — fill the room. No holding back, no quiet moments. Pure power.', icon: '🔊' },
];

const ARTICULATION_CONSTRAINTS = [
  { id: 'legato', name: 'All Legato', desc: 'Smooth and connected — each note flows into the next with no gap between them. One continuous breath of sound, like singing on a single sustained vowel.',
    descGuitar: 'Smooth and connected — each note flows into the next with no gap between them. One continuous legato phrase with hammer-ons and pull-offs connecting each note.', icon: '〰️' },
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

// Register = physical voice production mechanism (what WAS vocalTechnique).
// Foundational for voice — every sung note has a register. Values preserved
// from v1 so the 130-entry guidance cache continues to work unchanged.
const REGISTER_CONSTRAINTS = [
  { id: 'chest', name: 'Chest Voice', desc: 'Stay in chest register — feel the vibration in your sternum and ribs.', icon: '🫁' },
  { id: 'head', name: 'Head Voice', desc: 'Light, heady placement — vibration in the mask (cheeks, bridge of nose). Floaty and ethereal.', icon: '💭' },
  { id: 'mixed', name: 'Mixed Voice', desc: 'Bridge chest and head seamlessly — no audible "break" as you move through your range.', icon: '🔀' },
  { id: 'falsetto', name: 'Falsetto', desc: 'Airy top register — breathy and detached from chest resonance.', icon: '🎈' },
  { id: 'breathy', name: 'Breathy', desc: 'More breath than voice. Intimate, close-mic energy.', icon: '💨' },
];

// Vowel/Text = what sound comes out of your mouth. Foundational for voice —
// every vocal sound has a shape. NEW in v2. Guidance entries don't exist yet;
// they fall back to the per-dim `desc` string on every card until Phase E.
const VOWEL_CONSTRAINTS = [
  { id: 'ah', name: '/ah/ (father)', desc: 'Open throat, dropped jaw. Warmest, most resonant vowel — the default for power singing.', icon: 'â' },
  { id: 'eh', name: '/eh/ (bed)', desc: 'Mid-open mouth, tongue slightly forward. Bright, forward placement.', icon: 'ê' },
  { id: 'ee', name: '/ee/ (feet)', desc: 'Narrow mouth, high tongue. Tight and focused — easiest for clean pitch, hardest for power.', icon: 'î' },
  { id: 'oh', name: '/oh/ (boat)', desc: 'Rounded lips, lifted soft palate. Dark and ringing — great for sustaining.', icon: 'ô' },
  { id: 'oo', name: '/oo/ (boot)', desc: 'Tightly rounded lips, low jaw. Dark, hollow, trance-friendly.', icon: 'û' },
  { id: 'hum', name: 'Hum (mouth closed)', desc: 'Lips sealed, sound resonates through the nose and mask. Forces interoception — you feel the vibration instead of hearing it.', icon: '🫦' },
  { id: 'scatSyllables', name: 'Scat Syllables', desc: 'Nonsense syllables — "doo bee da", "skoo bi dap", your own syllables. Frees you from lyric responsibility to practice pure melodic improvisation.', icon: '🎤' },
  { id: 'realLyrics', name: 'Real Lyrics', desc: 'Use words from an actual song you\'re working on. The constraint is: make the brief fit the lyrics. Pull from your "Songs 2 Learn" list if stuck.', icon: '📜' },
];

// Texture = how many notes at once. Foundational for guitar — every guitar
// moment has a texture (single-line vs chord vs partial vs mixed). NEW in v2.
// This is the axis that absorbs chords, double-stops, triad-partial comping,
// and mixed rhythm/lead work. Strumming patterns emerge from texture × picking
// × rhythm, not from a separate dim.
const TEXTURE_CONSTRAINTS = [
  { id: 'singleLine', name: 'Single Line', desc: 'One note at a time — melodic thinking only. Solos, basslines, melodic fills. No chords, no doubles.', icon: '│' },
  { id: 'doubleStops', name: 'Double Stops', desc: 'Two notes at once — harmonized lines. Thirds, sixths, octaves. Forces harmonic awareness while still playing a line.', icon: '║' },
  { id: 'triadPartial', name: 'Triad Partials', desc: 'Three-string partial voicings (typically top 3 strings). Reggae skanks, pop comping, upper-register jazz voicings. Small, mobile, and rhythmic.', icon: '⫶' },
  { id: 'fullChord', name: 'Full Chord', desc: 'Four or more notes — full voicings. Strumming, arpeggiating chord shapes, comping with changes. The rhythm guitarist\'s mode.', icon: '▦' },
  // NOTE: value id is `mixedTextures` (not just `mixed`) to avoid collision
  // with register:mixed — the guidance cache is keyed on value ids only, so
  // both would hit the same entry. Unique ids everywhere, always.
  { id: 'mixedTextures', name: 'Mixed Textures', desc: 'Alternate between chord stabs and single-note fills within the phrase. Khruangbin, surf-rock, reggae-rock, psych territory. Rhythm and lead in one part.', icon: '◫' },
];

// Harmonic target = which notes you're aiming for. Shared dim — singers
// target chord tones and outline arpeggios exactly as guitarists do. Added
// in Phase B. Four orthogonal values compressed from the original 6 draft:
//   - scale-shape: use any scale notes freely (the "default" — no harmonic
//     constraint beyond staying in key)
//   - arpeggio-1-3-5: outline the root/3rd/5th of the tonic triad in sequence
//     (works over the drone; no chord changes required)
//   - chord-tone-landing: over a backing track with real changes, land on a
//     chord tone (1/3/5) of whatever chord is sounding at the phrase end.
//     Falls back to arpeggio-1-3-5 if no suggested track has chord metadata.
//   - color-tone-7-9-11: aim for extensions (7ths, 9ths, 11ths) — jazz color.
const HARMONIC_TARGET_CONSTRAINTS = [
  { id: 'scaleShape', name: 'Scale Shape', desc: 'Use any note from the active scale — no harmonic targeting. The "default" state: melody is governed by scale choice alone.', icon: '◌' },
  { id: 'arpeggio135', name: 'Arpeggio 1-3-5', desc: 'Outline the tonic triad — root, third, fifth — in sequence or any order. Every phrase spells the chord. Works over the drone; no backing changes needed.', icon: '△' },
  { id: 'chordToneLanding', name: 'Chord-Tone Landing', desc: 'Over the suggested backing track, every phrase must END on a chord tone (root, 3rd, or 5th) of whatever chord is sounding at that moment. Wander freely in between; land on strength.', icon: '⊙' },
  { id: 'colorTone79', name: 'Color Tones 7/9/11', desc: 'Emphasize chord extensions — 7ths, 9ths, 11ths — instead of the plain triad. The sound of jazz, bossa, Khruangbin-mellow, and modal color playing.', icon: '✦' },
];

// Chord progression = a cycle of chord changes to play over. Generated from
// the CHORD_PROGRESSIONS library, each entry stores scale-degree Roman
// numerals (I, bVII, iim7, V7, ...) that resolve to concrete chord names
// per-card against the active key + scale. When drawn alongside other dims
// (texture, harmonicTarget, picking), those dims compose ON TOP of the
// progression — "fingerpick double-stops over the Andalusian, landing on
// chord tones of each chord as it passes".
const CHORD_PROGRESSION_CONSTRAINTS = CHORD_PROGRESSIONS.map(p => ({
  id: p.id,
  name: p.name,
  desc: `${p.vibe}. ${p.bars} bar${p.bars === 1 ? '' : 's'} — cycle through the changes. Other constraints on this card (texture, picking, harmonic target) apply OVER the progression, not instead of it.`,
  icon: '⟳',
  degrees: p.degrees,
  scales: p.scales,
  bars: p.bars,
  vibe: p.vibe,
}));

// Phrase structure = how phrases relate to each other across time. Added in
// Phase B. Absorbs the `questionAnswer` value from v1's pitchConstraint dim
// (which was always a phrase-level form, not a note-level contour). Soft-gated
// to phraseLength ≥ 2 bars — call-response in a 1-bar phrase is cramped.
const PHRASE_STRUCTURE_CONSTRAINTS = [
  { id: 'question-answer', name: 'Question & Answer', desc: 'Pairs of phrases. First asks (rising, unresolved), second answers (descending, home). Musical conversation with yourself.', icon: '❓' },
  { id: 'call-response', name: 'Call & Response', desc: 'Statement then echo or answer. The second phrase responds to the first — could be a variation, a rebuttal, or a completion. Gospel, blues, West African music.', icon: '↔' },
  { id: 'theme-variation', name: 'Theme & Variation', desc: 'Play a simple theme in the first phrase, then vary it in each subsequent phrase. Keep the contour recognizable while the details evolve.', icon: '♲' },
  { id: 'ostinato', name: 'Ostinato', desc: 'Repeat the same short phrase throughout. Hypnotic, trance-inducing. The melodic commitment is a statement — "this is the idea; sit with it."', icon: '↻' },
];

// Picking hand = attack method. Phase C compresses this to 4 orthogonal
// values: how the picking hand CHOOSES to attack each note. Dropped:
//   - muted (v1): damping, not a picking-hand choice — migrated to downstrokes
//     (muted strums are overwhelmingly downstroke-driven)
//   - slide (v1): a note-transition gesture, not a picking choice —
//     migrated to noteTransition:slideConnect
//   - bends (v1): a note-transition gesture, not a picking choice —
//     migrated to noteTransition:bendTarget
// See migrateV2ToV3 for the weight/lock translations.
const PICKING_HAND_CONSTRAINTS = [
  { id: 'downstrokes', name: 'Downstrokes Only', desc: 'All downstrokes — heavier attack, driving energy. No upstrokes allowed. Builds wrist endurance and a more aggressive groove.', icon: '⬇' },
  { id: 'alternate', name: 'Alternate Picking', desc: 'Strict down-up alternation on every note. The economy-of-motion default for fast single-line playing. On chords it becomes alternating strum direction.', icon: '⇅' },
  { id: 'fingerpick', name: 'Fingerpick', desc: 'No pick — fingers only. Softer attack, independent control over each string. Opens up simultaneous bass + melody patterns.', icon: '🤚' },
  { id: 'hybrid', name: 'Hybrid Picking', desc: 'Pick + fingers simultaneously — pick handles bass strings, fingers pluck the upper strings. Country, jazz, and surf technique.', icon: '🤙' },
];

// Neck zone = where on the fretboard you play. Pure spatial axis. Every
// scale in every key can be played in any zone. Phase C.
const NECK_ZONE_CONSTRAINTS = [
  { id: 'open', name: 'Open Position', desc: 'Frets 0–5. Open strings ringing out, cowboy chords, folk voicings. Bright, resonant, sometimes ragged.', icon: '◖' },
  { id: 'mid', name: 'Mid Neck', desc: 'Frets 5–9. The core barre/power-chord territory. Fatter and more compressed than open, but still weighty.', icon: '◐' },
  { id: 'high', name: 'High Neck', desc: 'Frets 9–15. Thin, vocal, soaring. Triad partials and upper-register solos live here.', icon: '◗' },
  { id: 'fullRange', name: 'Full Range', desc: 'Use the whole neck — move between zones within the phrase. Trains left-hand navigation and horizontal thinking.', icon: '◉' },
];

// Note transition = how one note connects to the next. Every transition
// uses exactly one of these mechanisms. Orthogonal to picking hand (attack
// happens at note ONSET; transition happens BETWEEN notes). Phase C.
const NOTE_TRANSITION_CONSTRAINTS = [
  { id: 'cleanAttack', name: 'Clean Attack', desc: 'Every note freshly fretted and struck. No connection sounds between notes — each one is its own event. The "default" state.', icon: '┃' },
  { id: 'hammerPull', name: 'Hammer-On / Pull-Off', desc: 'Legato phrasing — pick only the first note of each group, let hammer-ons and pull-offs do the rest. Left hand carries the phrase.', icon: 'ᜧ' },
  { id: 'slideConnect', name: 'Slide Connect', desc: 'Slide into the target note from below or above. Glides between pitches. Common in blues, desert blues, reggae, surf.', icon: '⟿' },
  { id: 'bendTarget', name: 'Bend to Target', desc: 'Reach the target note by bending up from a lower fret. Full bends, half bends, pre-bends all count. Expressive pitch-shaping.', icon: '↗' },
];

// Onset = how each phrase starts. Per-phrase gesture at the moment the
// voice first makes contact with the note. Orthogonal to register, vowel,
// and every shared dim. Phase D.
const ONSET_CONSTRAINTS = [
  { id: 'hardAttack', name: 'Hard Attack', desc: 'Clean, immediate onset — the note begins at full intended pitch and volume with no warmup. Assertive, declamatory, rock/pop idiom.', icon: '!' },
  { id: 'soft', name: 'Soft Onset', desc: 'Gentle rise into the note over a beat or so — breath first, then pitch, then full tone. The classical/art-song default.', icon: '◡' },
  // NOTE: value id is `breathyOnset` (not just `breathy`) to avoid collision
  // with register:breathy — guidance cache is keyed on value ids only.
  { id: 'breathyOnset', name: 'Breathy Onset', desc: 'Start with more air than tone — a whisper that resolves into pitch. Intimate, confessional, close-mic aesthetic.', icon: '∽' },
  { id: 'slideIn', name: 'Slide In', desc: 'Start the note a half-step or more below the target and slide up into it. Vocal expressiveness borrowed from blues, R&B, country.', icon: '↗' },
];

// Vibrato = sustain-time pitch modulation. Fretting-hand physical gesture
// on guitar. Phase C. Voice vibrato is a CONSEQUENCE of breath support and
// is not controllable on command, so this dim is guitar-only.
const VIBRATO_CONSTRAINTS = [
  { id: 'straight', name: 'Straight (no vibrato)', desc: 'No vibrato at all. Pure, held pitches. Focus on tone and sustain without modulation. Teaches you what vibrato ADDS by taking it away.', icon: '━' },
  { id: 'slow', name: 'Slow Vibrato', desc: 'Wide, slow oscillation — about 2–3 cycles per second. B.B. King, David Gilmour. Expressive and deliberate.', icon: '≈' },
  { id: 'fast', name: 'Fast Vibrato', desc: 'Narrow, quick oscillation — 5–7 cycles per second. Classical/flamenco style. Shimmers rather than wobbles.', icon: '∿' },
  { id: 'lateEntry', name: 'Late-Entry Vibrato', desc: 'Hold each note straight at first, then let vibrato bloom in at the end. The most common vocal-inspired guitar approach.', icon: '╌' },
];

// ─── Mood library (session-level overlay, not a random dim) ───
// ~79 moods across 11 families. Phase F: mood is auto-drawn per card
// (with 70% coherence bias) and biases key/scale/tempo via MOOD_AFFINITY.
// Picker becomes an optional lock.
const MOOD_LIBRARY = {
  'Outward longing':  ['longing', 'yearning', 'nostalgic', 'wistful', 'homesick', 'searching', 'unrequited'],
  'Inward warmth':    ['tender', 'intimate', 'serene', 'reverent', 'content', 'loving'],
  'Light':            ['playful', 'mischievous', 'joyous', 'whimsical', 'buoyant', 'celebratory'],
  'Heavy':            ['melancholy', 'elegiac', 'weary', 'haunted', 'bruised', 'ashen'],
  'Trance':           ['hypnotic', 'dreamy', 'floating', 'mystical', 'meditative', 'hallucinated', 'ritual', 'astral'],
  'Fire':             ['defiant', 'fierce', 'driven', 'triumphant', 'vengeful', 'urgent'],
  "Gene's world":     ['sun-bleached', 'bourbon-warm', 'highway-hypnosis', 'motel-neon', 'slow-sunday',
                        'dawn-patrol', 'riptide', 'cactus-bloom', 'last-ferry', 'summer-squall',
                        'red-rock', 'siesta', 'after-party', 'porch-swing', 'palm-shade',
                        'saltwater', 'fogbank', 'gold-hour', 'backroad', 'agave-sun'],
  'Cosmic':           ['vast', 'oceanic', 'interstellar', 'sublime', 'luminous', 'gravitational'],
  'Edge':             ['anxious', 'restless', 'electric', 'paranoid'],
  'Cold':             ['icy', 'aloof', 'clinical', 'alienated'],
  'Grit':             ['smoldering', 'sensual', 'weathered', 'repressed', 'stoic'],
};
const MOOD_FLAT = Object.values(MOOD_LIBRARY).flat();

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

// ─── Dimension Registry (v2 three-tier structure) ───
// Three tiers of presence:
//   1. Musical context (always set, auto-generated): key, scale, tempo
//   2. Foundational (always drawn per card, exempt from tier gating):
//      - texture for guitar; register + vowel for voice
//      - These are the inescapable facts of the instrument — you cannot play
//        guitar without choosing some texture, cannot sing without some register
//   3. Randomizable pool (drawn per user-selected N, tier soft-gated): everything else
//
// Foundational dims are marked with `foundational: 'guitar'` or `'voice'`.
// Randomizable instrument-branch dims use the `instrument` field as before.
// Shared randomizable dims have neither.
// Tier mapping (Phase B): how deep each dim sits in the soft-gate.
//   tier-2 (always eligible): pitch contour, rhythm, dynamics, harmonic target, picking hand
//   tier-3 (ideal mode+): articulation, phrase length, neck zone, note transition, onset
//   tier-4 (advanced): phrase structure, vibrato
// Tier determines how often a dim gets drawn relative to others — higher tier
// = drawn less often at default settings — not whether it appears at all.
const DIMENSIONS = [
  // Musical context (tier 1, quantitative, always set)
  { id: 'key',              label: 'Key',          tier: 1, type: 'quantitative', color: '#d4a373' },
  { id: 'scale',            label: 'Scale',        tier: 1, type: 'quantitative', color: '#9e829c' },
  { id: 'tempo',            label: 'Tempo',        tier: 1, type: 'quantitative', color: '#d97d54' },
  // Foundational — always drawn on every card (not optional via tier)
  { id: 'texture',          label: 'Texture',      tier: 2, type: 'qualitative',  options: TEXTURE_CONSTRAINTS,      color: '#b58454', foundational: 'guitar' },
  { id: 'register',         label: 'Register',     tier: 2, type: 'qualitative',  options: REGISTER_CONSTRAINTS,     color: '#d68383', foundational: 'voice' },
  { id: 'vowel',            label: 'Vowel',        tier: 2, type: 'qualitative',  options: VOWEL_CONSTRAINTS,        color: '#d6a5a5', foundational: 'voice' },
  // Shared randomizable pool — tier 2 (always eligible)
  { id: 'pitchConstraint',  label: 'Pitch',        tier: 2, type: 'qualitative',  options: PITCH_CONSTRAINTS,        color: '#d68383' },
  { id: 'rhythmConstraint', label: 'Rhythm',       tier: 2, type: 'qualitative',  options: RHYTHM_CONSTRAINTS,       color: '#d97d54' },
  { id: 'dynamics',         label: 'Dynamics',     tier: 2, type: 'qualitative',  options: DYNAMICS_CONSTRAINTS,     color: '#6b8e9f' },
  { id: 'harmonicTarget',   label: 'Harmonic',     tier: 2, type: 'qualitative',  options: HARMONIC_TARGET_CONSTRAINTS, color: '#a59e6b' },
  { id: 'chordProgression', label: 'Progression',  tier: 2, type: 'qualitative',  options: CHORD_PROGRESSION_CONSTRAINTS, color: '#8b6db5' },
  // Shared randomizable pool — tier 3 (ideal mode and up)
  { id: 'articulation',     label: 'Articulation', tier: 3, type: 'qualitative',  options: ARTICULATION_CONSTRAINTS, color: '#5b9e8f' },
  { id: 'phraseLength',     label: 'Phrase',       tier: 3, type: 'qualitative',  options: PHRASE_CONSTRAINTS,       color: '#9e829c' },
  // Shared randomizable pool — tier 4 (advanced)
  { id: 'phraseStructure',  label: 'Form',         tier: 4, type: 'qualitative',  options: PHRASE_STRUCTURE_CONSTRAINTS, color: '#9e6b9e' },
  // Instrument-branch randomizable dims (voice)
  { id: 'onset',            label: 'Onset',        tier: 3, type: 'qualitative',  options: ONSET_CONSTRAINTS,            color: '#d6a5a5', instrument: 'voice' },
  // Instrument-branch randomizable dims (guitar)
  { id: 'pickingHand',      label: 'Picking',      tier: 2, type: 'qualitative',  options: PICKING_HAND_CONSTRAINTS,     color: '#b58454', instrument: 'guitar' },
  { id: 'neckZone',         label: 'Neck Zone',    tier: 3, type: 'qualitative',  options: NECK_ZONE_CONSTRAINTS,        color: '#a58454', instrument: 'guitar' },
  { id: 'noteTransition',   label: 'Transition',   tier: 3, type: 'qualitative',  options: NOTE_TRANSITION_CONSTRAINTS,  color: '#a57454', instrument: 'guitar' },
  { id: 'vibrato',          label: 'Vibrato',      tier: 4, type: 'qualitative',  options: VIBRATO_CONSTRAINTS,          color: '#b56484', instrument: 'guitar' },
];

// Foundational dim IDs per instrument — drawn on every card regardless of N.
const FOUNDATIONAL_DIMS = {
  guitar: ['texture'],
  voice:  ['register', 'vowel'],
};

// Musical context dims — always set, auto-generated, not in the random pool.
const MUSICAL_CONTEXT_DIMS = ['key', 'scale', 'tempo'];

// Default exclusion sets per instrument — on reset (or fresh user), only core
// dims (Pitch, Rhythm, Dynamics) are active. Advanced shared dims and
// instrument-branch dims start excluded. Foundational dims (texture, register,
// vowel) are always drawn regardless and aren't affected by exclusions.
const DEFAULT_EXCLUDED = {
  guitar: new Set([
    'harmonicTarget', 'articulation', 'phraseLength', 'phraseStructure',
    'pickingHand', 'neckZone', 'noteTransition', 'vibrato',
  ]),
  voice: new Set([
    'harmonicTarget', 'articulation', 'phraseLength', 'phraseStructure',
    'onset',
  ]),
};

// Oblique modifiers are creative breakthrough prompts, NOT skill-building constraints.
// They're applied as an optional spice on top of any drawn card, not part of the
// random draw. Use them when you want to break out of a habit, not when you're
// trying to build technique.
const OBLIQUE_POOL = OBLIQUE_MODIFIERS;

function getDimensionsForTier(tier) {
  return DIMENSIONS.filter(d => d.tier <= tier).map(d => d.id);
}

// ─── Scale weights by tier ───
// Phase F: simplified to two real branches — tier 1 (Scales mode) and tier 4
// (everything else). The old tier 2/3 branches were dead code — no UI exposed them.
const SCALES_MODE_WHITELIST = new Set([
  'minor-pentatonic', 'major-pentatonic', 'blues', 'major', 'natural-minor',
]);
const EXOTIC_SCALES = new Set([
  'phrygian', 'phrygian-dominant', 'locrian', 'whole-tone',
  'hungarian-minor', 'double-harmonic', 'hirajoshi',
]);
function getScaleWeights(tier) {
  return Object.keys(SCALE_TYPES).map(k => {
    if (tier <= 1) {
      // Scales mode: conservative set only
      if (!SCALES_MODE_WHITELIST.has(k)) return 0;
      if (k === 'minor-pentatonic' || k === 'major-pentatonic') return 4;
      if (k === 'blues') return 3;
      return 2; // major, natural-minor
    }
    // Focus/Combo/Matrix (tier 4): all 17 available, weighted
    if (k === 'minor-pentatonic' || k === 'major-pentatonic') return 3;
    if (k === 'blues') return 3;
    if (EXOTIC_SCALES.has(k)) return 1;
    return 2; // dorian, mixolydian, major, natural-minor, lydian, harmonic-minor, melodic-minor
  });
}

// ─── Card Generation (v2 three-tier structure) ───
//
// Pipeline:
//   drawContext()       → always sets key, scale, tempo (musical context)
//   drawFoundational()  → always draws foundational dims for the active instrument
//                         (texture for guitar; register + vowel for voice)
//   drawRandom()        → draws up to maxConstraints from the randomizable pool
//   validateAndRepair() → catches entanglements via redraw; fails loud on lock conflicts
//
// SRS weight keys are scoped by instrument (`${instrument}:${dimId}:${valueId}`)
// so ratings on a voice card never affect guitar weights. Fallback to the v1
// unscoped key is used if the scoped key is missing (handles mid-migration reads).

// Instrument that a dim is "played on" — determines the SRS weight-key prefix.
// Foundational dims are instrument-specific; shared random dims take whatever
// instrument the card was drawn in.
function instrumentForDim(dimId, cardInstrument) {
  const dim = DIMENSIONS.find(d => d.id === dimId);
  if (!dim) return cardInstrument;
  if (dim.foundational) return dim.foundational;
  if (dim.instrument) return dim.instrument;
  return cardInstrument;
}

// SRS-weighted pick from a dim's options list. Accepts the card's instrument
// so weight keys can be scoped. Falls back to the v1 unscoped key if the scoped
// entry is missing (handles reads during migration or partial data).
function srsWeightedPick(dim, constraintWeights, cardInstrument) {
  const dimInstr = instrumentForDim(dim.id, cardInstrument);
  const weights = dim.options.map(opt => {
    const scopedKey = `${dimInstr}:${dim.id}:${opt.id}`;
    const legacyKey = `${dim.id}:${opt.id}`;
    const w = constraintWeights[scopedKey] || constraintWeights[legacyKey] || { easy: 0, good: 0, hard: 0 };
    return Math.max(0.5, 1 + w.hard * 0.5 - w.easy * 0.15);
  });
  return { ...weightedPick(dim.options, weights) };
}

// Dynamic-data enrichment for specific constraint values (forbidden notes,
// target landing). Mutates `chosen` in place based on the card's scaleNotes
// and key. Extracted from the old inline logic so both foundational and
// random draws go through the same enrichment.
function enrichDynamicConstraint(chosen, card, scaleNotes) {
  if (chosen.id === 'forbidden' && scaleNotes.length > 2) {
    const maxRemovable = Math.min(3, scaleNotes.length - 2);
    const removeCount = 1 + Math.floor(Math.random() * maxRemovable);
    const nonRoot = scaleNotes.filter(n => n !== card.constraints.key);
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
}

// Pass 1: musical context (key, scale, tempo). Always set.
function drawContext(card, activeDimensions, lockedDimensions, tier, mood) {
  if (activeDimensions.includes('key')) {
    if (lockedDimensions.key !== undefined) {
      card.constraints.key = lockedDimensions.key;
    } else {
      const keys = CHROMATIC;
      const weights = resolveKeyWeights(mood);
      card.constraints.key = weightedPick(keys, weights);
    }
  } else {
    card.constraints.key = 'A';
  }

  if (activeDimensions.includes('scale')) {
    if (lockedDimensions.scale !== undefined) {
      card.constraints.scale = lockedDimensions.scale;
    } else {
      const scaleKeys = Object.keys(SCALE_TYPES);
      const weights = resolveScaleWeights(mood, tier);
      card.constraints.scale = weightedPick(scaleKeys, weights);
    }
  } else {
    card.constraints.scale = 'minor-pentatonic';
  }

  if (activeDimensions.includes('tempo')) {
    if (lockedDimensions.tempo !== undefined) {
      card.constraints.tempo = lockedDimensions.tempo;
    } else {
      const { min, max, sweetMin, sweetMax } = resolveTempoRange(mood);
      card.constraints.tempo = gaussianRange(min, max, sweetMin, sweetMax);
    }
  } else {
    card.constraints.tempo = 90;
  }
}

// Pass 2: foundational dims. Always drawn for the active instrument, exempt
// from the random N count. Respects locks and per-value excludes. Returns the
// list of dim IDs that were drawn so the caller can track them in
// `drawnConstraints`.
function drawFoundational(card, instrument, lockedDimensions, constraintWeights, scaleNotes) {
  const drawn = [];
  const foundational = FOUNDATIONAL_DIMS[instrument] || [];
  for (const dimId of foundational) {
    const dim = DIMENSIONS.find(d => d.id === dimId);
    if (!dim || !dim.options || dim.options.length === 0) continue;

    let chosen;
    if (lockedDimensions[dimId] !== undefined) {
      // Lock wins — use the pinned value. Locked values are objects carrying the
      // same shape as a drawn value (id, name, desc).
      chosen = { ...lockedDimensions[dimId] };
    } else {
      chosen = srsWeightedPick(dim, constraintWeights, instrument);
    }
    enrichDynamicConstraint(chosen, card, scaleNotes);
    card.constraints[dimId] = chosen;
    drawn.push(dimId);
  }
  return drawn;
}

// Pass 3: random draws from the instrument's randomizable pool, up to
// maxConstraints. Locks inside the randomizable pool still count against the
// slot budget (unchanged from v1 behavior). Foundational dims are EXCLUDED
// from this pool because they were already drawn in pass 2.
function drawRandom(card, activeDimensions, lockedDimensions, constraintWeights, instrument, maxConstraints, scaleNotes) {
  const foundationalSet = new Set(FOUNDATIONAL_DIMS[instrument] || []);
  const lockedQualDims = [];
  const availableQualDims = [];

  // chordProgression compatibility gate: the scale must be one that supports
  // diatonic progressions, AND at least one progression in the library must
  // declare this scale as compatible. If not, the dim is silently removed
  // from the random pool — cards on pentatonic / whole-tone / locrian
  // scales draw one fewer random dim rather than forcing a progression that
  // wouldn't resolve.
  const scale = card.constraints.scale;
  const progCompatOptions = scale && !SCALES_WITHOUT_PROGRESSIONS.has(scale)
    ? CHORD_PROGRESSION_CONSTRAINTS.filter(o => o.scales.includes(scale))
    : [];

  for (const dimId of activeDimensions) {
    if (foundationalSet.has(dimId)) continue; // foundational already drawn
    const dim = DIMENSIONS.find(d => d.id === dimId);
    if (!dim || dim.type === 'quantitative') continue;
    if (!dim.options || dim.options.length === 0) continue;
    if (dimId === 'chordProgression' && progCompatOptions.length === 0) continue;
    if (lockedDimensions[dimId] !== undefined) {
      lockedQualDims.push(dimId);
    } else {
      availableQualDims.push(dimId);
    }
  }

  // Locked dims inside the random pool always get included.
  for (const dimId of lockedQualDims) {
    const chosen = { ...lockedDimensions[dimId] };
    enrichDynamicConstraint(chosen, card, scaleNotes);
    card.constraints[dimId] = chosen;
  }

  // Random pick for the remaining slots.
  const slotsLeft = Math.max(0, maxConstraints - lockedQualDims.length);
  const shuffled = [...availableQualDims].sort(() => Math.random() - 0.5);
  const selectedDims = shuffled.slice(0, slotsLeft);

  for (const dimId of selectedDims) {
    const dim = DIMENSIONS.find(d => d.id === dimId);
    // chordProgression: narrow options to scale-compatible entries only so
    // the weighted pick can never return an incompatible progression.
    const effectiveDim = dimId === 'chordProgression'
      ? { ...dim, options: progCompatOptions }
      : dim;
    const chosen = srsWeightedPick(effectiveDim, constraintWeights, instrument);
    enrichDynamicConstraint(chosen, card, scaleNotes);
    card.constraints[dimId] = chosen;
  }

  return [...lockedQualDims, ...selectedDims];
}

// Coherence validation. Catches entanglements between orthogonal dims that
// produce impossible or musically nonsense combinations. Redraws the affected
// dim in place. Redraw priority: NON-LOCKED dims go first. If every
// conflicting dim is locked, throws LockConflictError — the UI catches this
// and surfaces "These locks are incompatible" to the user. No silent retries.
class LockConflictError extends Error {
  constructor(message, locks) {
    super(message);
    this.name = 'LockConflictError';
    this.locks = locks;
  }
}

// Scales that have no stable 1-3-5 tonic triad — targeting the "third"
// or "fifth" of the tonic is either undefined or musically weird. Phase B
// mostly ships pentatonic/modal/minor scales that DO have a clear triad,
// so this set is minimal for now. Expand if/when chromatic or non-Western
// scales are added to SCALE_TYPES.
const ATONAL_SCALES = new Set([
  'whole-tone', // no perfect 5th, no stable tonic triad
]);

function validateAndRepair(card, lockedDimensions, constraintWeights, instrument) {
  // Phase B rules:
  //   Rule 1: atonal scale × arpeggio-1-3-5 / chord-tone-landing / color-tone →
  //           redraw harmonic target to scale-shape (the tonic is ambiguous,
  //           so targeting intervals of it produces nonsense). No-op as of
  //           Phase B because no atonal scales are in SCALE_TYPES yet; the
  //           rule is wired for when chromatic/whole-tone/octatonic land.
  //
  // Redraw priority (always): non-locked dims first. If all conflicting dims
  // are locked, throw LockConflictError — UI catches it and shows a banner
  // with a "Clear conflicting locks" button.
  const MAX_REPAIRS = 4;
  let repairs = 0;
  while (repairs < MAX_REPAIRS) {
    let didRepair = false;

    // Rule 1: scale × harmonic target
    const scale = card.constraints.scale;
    const ht = card.constraints.harmonicTarget;
    if (scale && ht && ATONAL_SCALES.has(scale)) {
      const incompatible = ht.id === 'arpeggio135' || ht.id === 'chordToneLanding' || ht.id === 'colorTone79';
      if (incompatible) {
        const htLocked = lockedDimensions.harmonicTarget !== undefined;
        const scaleLocked = lockedDimensions.scale !== undefined;
        if (!htLocked) {
          // Redraw harmonic target to scaleShape (the only sensible value
          // for an atonal scale).
          const htDim = DIMENSIONS.find(d => d.id === 'harmonicTarget');
          const fallback = htDim.options.find(o => o.id === 'scaleShape');
          if (fallback) {
            card.constraints.harmonicTarget = { ...fallback };
            didRepair = true;
          }
        } else if (!scaleLocked) {
          // Redraw scale to something with a clear tonic.
          const stableScales = ['minor-pentatonic', 'major-pentatonic', 'blues', 'major', 'natural-minor'];
          card.constraints.scale = randomPick(stableScales);
          didRepair = true;
        } else {
          throw new LockConflictError(
            `Harmonic target "${ht.name}" is incompatible with the ${scale} scale (no clear tonic). Adjust one of the locks.`,
            { harmonicTarget: ht.name, scale }
          );
        }
      }
    }

    // Rule 2: chordProgression × harmonicTarget:scaleShape → upgrade the
    // harmonic target to chordToneLanding (or arpeggio135 as a gentler
    // fallback). Rationale: if the card draws a real chord cycle AND the
    // melodic target is "just stay in the scale", the progression becomes
    // visual wallpaper — the player runs scale notes oblivious to the
    // changes. Nudging to chord-tone landing makes the cycle load-bearing
    // for the phrase without over-constraining. Locked HT is respected —
    // if the user explicitly pinned scaleShape, we leave it.
    // NOTE: validateAndRepair runs BEFORE Pass 5 resolution, so the
    // progression has .degrees but not yet .resolvedChords. Check presence
    // via .degrees.
    const prog = card.constraints.chordProgression;
    const ht2 = card.constraints.harmonicTarget;
    if (prog && prog.degrees?.length && ht2?.id === 'scaleShape'
        && lockedDimensions.harmonicTarget === undefined) {
      const htDim = DIMENSIONS.find(d => d.id === 'harmonicTarget');
      // 70% land on chordToneLanding (the "strong" engagement), 30% arpeggio135
      // (outline each chord's triad). Keeps some variance in how players
      // engage the progression without ever going back to scaleShape.
      const upgradeId = Math.random() < 0.7 ? 'chordToneLanding' : 'arpeggio135';
      const upgrade = htDim.options.find(o => o.id === upgradeId);
      if (upgrade) {
        card.constraints.harmonicTarget = { ...upgrade, _upgradedFromScaleShape: true };
        didRepair = true;
      }
    }

    if (!didRepair) break;
    repairs++;
  }
  return card;
}

// Top-level card generator. Assembles context → foundational → random → repair,
// then checks for a no-repeat collision against history. The activeDimensions
// argument must already include musical context + foundational + the random
// pool for the target instrument (the derived `activeDimensions` useMemo in
// the main component handles this).
function generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount = 0, maxConstraints = 3, mode = 'matrix', instrument = 'voice', mood = null) {
  const card = {
    id: generateId(),
    timestamp: Date.now(),
    constraints: {},
    activeDimensions: [...activeDimensions],
    instrument,
    tier,
    mode, // 'scales' | 'focus' | 'combo' | 'matrix' — drives guidance lookup
    mood, // Phase F: drawn mood for this card (biases key/scale/tempo)
  };

  // Pass 1: musical context (mood biases key/scale/tempo via MOOD_AFFINITY).
  drawContext(card, activeDimensions, lockedDimensions, tier, mood);
  const scaleData = generateScale(card.constraints.key, card.constraints.scale);
  const scaleNotes = scaleData.notes || [];

  // Pass 2: foundational dims (always drawn).
  const foundationalDrawn = drawFoundational(card, instrument, lockedDimensions, constraintWeights, scaleNotes);

  // Pass 3: random pool draws (up to maxConstraints).
  const randomDrawn = drawRandom(card, activeDimensions, lockedDimensions, constraintWeights, instrument, maxConstraints, scaleNotes);

  // Pass 3.5: suggest backing track early so Pass 4 can consult it for
  // chord-tone-landing fallback logic. suggestTrack depends only on tempo,
  // which was set in Pass 1, so it's safe to call here.
  card.suggestedTrack = suggestTrack(card);

  // Pass 3.6: chord-tone-landing fallback. If harmonicTarget drew
  // `chordToneLanding` but the suggested backing track has no chord
  // progression metadata, collapse to `arpeggio135` — which targets the
  // tonic triad and works over the drone alone. This is a targeted
  // value-level redraw, NOT a validateAndRepair rule, because it depends
  // on external state (the track library) rather than dim×dim entanglement.
  // Locked harmonicTarget values are respected — if the user explicitly
  // pinned chordToneLanding we leave it alone and trust them to pick a
  // track manually.
  const ht = card.constraints.harmonicTarget;
  const hasProgression = !!card.constraints.chordProgression?.degrees?.length;
  if (ht && ht.id === 'chordToneLanding'
      && !trackHasProgression(card.suggestedTrack)
      && !hasProgression  // chordProgression IS the chord metadata — no fallback needed
      && lockedDimensions.harmonicTarget === undefined) {
    const htDim = DIMENSIONS.find(d => d.id === 'harmonicTarget');
    const fallback = htDim.options.find(o => o.id === 'arpeggio135');
    if (fallback) {
      card.constraints.harmonicTarget = { ...fallback };
      card.constraints.harmonicTarget._fallbackFrom = 'chordToneLanding';
    }
  }

  // Pass 4: coherence repair. May throw LockConflictError if all conflicting
  // dims are locked — the UI handles that by displaying a lock-conflict banner
  // and is expected not to call generateCard again until the user adjusts.
  validateAndRepair(card, lockedDimensions, constraintWeights, instrument);

  // Pass 5: resolve chord progression degrees → concrete chord names against
  // the FINAL key + scale (validateAndRepair may have redrawn the scale). If
  // the resolver returns an empty list — e.g. the repaired scale is a
  // pentatonic — drop the dim cleanly. Track which qualitative dims were
  // drawn (foundational + random) for downstream guidance + coherence checks.
  let drawnList = [...foundationalDrawn, ...randomDrawn];
  if (card.constraints.chordProgression) {
    const cp = card.constraints.chordProgression;
    const resolved = resolveProgression(cp, card.constraints.key, card.constraints.scale);
    if (!resolved.length) {
      delete card.constraints.chordProgression;
      drawnList = drawnList.filter(id => id !== 'chordProgression');
    } else {
      card.constraints.chordProgression = {
        ...cp,
        resolvedChords: resolved,
        chordTargets: uniqueChordNames(resolved),
      };
    }
  }
  card.drawnConstraints = drawnList;

  // Derive drone root (unchanged from v1).
  card.droneRoot = droneRootFromCard(card.constraints.key, card.constraints.scale);

  // No-immediate-repeat check: if the new card is identical to the last one,
  // retry up to 5 times. Checks all drawn dims — foundational and random.
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
      return generateCard(activeDimensions, lockedDimensions, history, constraintWeights, tier, _retryCount + 1, maxConstraints, mode, instrument, mood);
    }
  }

  // (suggestedTrack was already set in Pass 3.5 so chord-tone-landing
  // fallback could consult it. No need to set again here.)

  return card;
}

// ─── Orthogonality simulation (Phase A exit gate) ───
// Generates N cards per instrument mode, measures how often
// validateAndRepair triggers a dim redraw, and logs the result.
// Must pass <10% redraw rate before Phase B starts.
//
// Invocation: open the browser console on the Practice Forge page and run
//   window.__forgeOrthogonalityTest({ perInstrument: 500 })
// Pure JS — no UI state touched. Safe to run anytime.
function runOrthogonalityTest({ perInstrument = 500 } = {}) {
  const instruments = ['voice', 'guitar'];
  const results = {};

  const SHARED_RANDOM = [
    'pitchConstraint', 'rhythmConstraint', 'dynamics',
    'harmonicTarget', 'chordProgression',
    'articulation', 'phraseLength',
    'phraseStructure',
  ];
  const GUITAR_RANDOM = [...SHARED_RANDOM, 'pickingHand', 'neckZone', 'noteTransition', 'vibrato'];
  const VOICE_RANDOM  = [...SHARED_RANDOM, 'onset'];

  for (const inst of instruments) {
    const pool = inst === 'guitar' ? GUITAR_RANDOM : VOICE_RANDOM;
    const activeDimensions = [
      ...MUSICAL_CONTEXT_DIMS,
      ...(FOUNDATIONAL_DIMS[inst] || []),
      ...pool,
    ];

    let repairs = 0;
    let lockConflicts = 0;
    let otherErrors = 0;
    const foundationalHits = {};

    for (let i = 0; i < perInstrument; i++) {
      try {
        // Track whether validateAndRepair changes the card by capturing
        // pre/post register values (the only repair rule in Phase A).
        const card = generateCard(
          activeDimensions, /* lockedDimensions */ {},
          /* history */ [], /* constraintWeights */ {},
          /* tier */ 4, /* _retryCount */ 0,
          /* maxConstraints */ 3, /* mode */ 'matrix', inst
        );
        // Track which foundational values showed up
        for (const fid of FOUNDATIONAL_DIMS[inst] || []) {
          const v = card.constraints[fid]?.id;
          if (v) {
            const key = `${fid}:${v}`;
            foundationalHits[key] = (foundationalHits[key] || 0) + 1;
          }
        }
      } catch (err) {
        if (err && err.name === 'LockConflictError') lockConflicts++;
        else otherErrors++;
      }
    }

    // Second pass: directly measure repair rate by instrumenting the repair
    // function. We re-simulate with forced-eligible cards and count how often
    // the rule at the head of validateAndRepair fires. A cheaper proxy: force
    // 100 low-pitch keys + head register and measure repair rate in isolation.
    let directRepairs = 0;
    const LOW_KEYS = ['F', 'E', 'E♭', 'D', 'C#', 'C'];
    if (inst === 'voice') {
      for (let i = 0; i < 100; i++) {
        const testCard = {
          id: 'test',
          constraints: {
            key: LOW_KEYS[i % LOW_KEYS.length],
            scale: 'minor-pentatonic',
            tempo: 90,
            register: { id: i % 2 === 0 ? 'head' : 'falsetto', name: 'Test' },
          },
        };
        const before = testCard.constraints.register.id;
        try {
          validateAndRepair(testCard, {}, {}, 'voice');
          if (testCard.constraints.register.id !== before) directRepairs++;
        } catch (e) { /* lock conflict impossible with empty locks */ }
      }
    }

    results[inst] = {
      perInstrument,
      lockConflicts,
      otherErrors,
      directRepairRate: inst === 'voice' ? `${directRepairs}/100 (${directRepairs}%)` : 'n/a (no guitar rules yet)',
      foundationalHits,
    };
  }

  // eslint-disable-next-line no-console
  console.table(results);
  // eslint-disable-next-line no-console
  console.log('[Phase A exit gate] Target: direct repair rate < 10%. Current:', results);
  return results;
}

// Expose to window for manual invocation from the browser console.
if (typeof window !== 'undefined') {
  window.__forgeOrthogonalityTest = runOrthogonalityTest;
}

// ─── Session generation ───
function generateSession(count, activeDimensions, lockedDimensions, constraintWeights, tier, maxConstraints = 3, mode = 'matrix', instrument = 'voice', lockedMood = null) {
  const cards = [];
  const keyCount = {};
  for (let i = 0; i < count; i++) {
    // Phase F: draw mood per card with coherence bias
    const previousMood = i > 0 ? cards[i - 1].mood : null;
    const cardMood = drawMood(previousMood, lockedMood);
    let card;
    let attempts = 0;
    do {
      card = generateCard(activeDimensions, lockedDimensions, cards, constraintWeights, tier, 0, maxConstraints, mode, instrument, cardMood);
      attempts++;
    } while ((keyCount[card.constraints.key] || 0) >= 2 && attempts < 10);
    keyCount[card.constraints.key] = (keyCount[card.constraints.key] || 0) + 1;
    cards.push(card);
  }
  return cards;
}

// ─── localStorage ───
const STORAGE_KEY = 'practiceforge-data';
const V1_BACKUP_KEY = 'practiceforge-data-v1-backup';
const CURRENT_SCHEMA_VERSION = 5;

// v3 → v4 migration. Renames two value ids that collided with existing
// v1 register values:
//   guitar:texture:mixed   → guitar:texture:mixedTextures
//   voice:onset:breathy    → voice:onset:breathyOnset
// The guidance cache is keyed on value id only, so `leaps_mixed` would
// v4 → v5: Phase F — mood is now auto-drawn per card. Clear any legacy
// user-selected mood so they get the new random-draw experience by default.
function migrateForgeDataV4ToV5(v4Data) {
  if (!v4Data || typeof v4Data !== 'object') return v4Data;
  if ((v4Data.version || 0) >= 5) return v4Data;
  if (v4Data.settings) {
    v4Data.settings.mood = null; // Phase F: mood is now auto-drawn
    v4Data.settings.excludedDimensions = []; // Reset draw pool — all dims enabled
  }
  v4Data.version = 5;
  return v4Data;
}

// hit the v1 register:mixed entry when the card actually drew texture:mixed.
// Renaming the new ids to unique strings removes the collision. The
// register:mixed and register:breathy values are untouched — those still
// own their short ids. Idempotent; a v4 blob passes through unchanged.
function migrateForgeDataV3ToV4(v3Data) {
  if (!v3Data || typeof v3Data !== 'object') return v3Data;
  if ((v3Data.version || 0) >= 4) return v3Data;

  const VALUE_REMAP = {
    // [instrument, dim, oldValue] → newValue
    'guitar:texture:mixed':   'mixedTextures',
    'voice:onset:breathy':    'breathyOnset',
  };

  // 1. Weights — rewrite matching keys, merge counts if target already exists.
  const oldWeights = v3Data.constraintWeights || {};
  const newWeights = { ...oldWeights };
  for (const [key, weights] of Object.entries(oldWeights)) {
    const parts = key.split(':');
    if (parts.length !== 3) continue;
    const [inst, dim, val] = parts;
    const lookupKey = `${inst}:${dim}:${val}`;
    const newVal = VALUE_REMAP[lookupKey];
    if (!newVal) continue;
    const newKey = `${inst}:${dim}:${newVal}`;
    delete newWeights[key];
    const existing = newWeights[newKey];
    if (existing) {
      newWeights[newKey] = {
        easy: (existing.easy || 0) + (weights.easy || 0),
        good: (existing.good || 0) + (weights.good || 0),
        hard: (existing.hard || 0) + (weights.hard || 0),
      };
    } else {
      newWeights[newKey] = { ...weights };
    }
  }

  // 2. Locks — rewrite the value object if the old id was pinned.
  const oldLocks = (v3Data.settings && v3Data.settings.lockedDimensions) || {};
  const newLocks = { ...oldLocks };
  const textureLock = oldLocks.texture;
  if (textureLock && textureLock.id === 'mixed') {
    const dimDef = DIMENSIONS.find(d => d.id === 'texture');
    const valObj = dimDef && dimDef.options.find(o => o.id === 'mixedTextures');
    newLocks.texture = valObj ? { ...valObj } : { id: 'mixedTextures', name: 'Mixed Textures' };
  }
  const onsetLock = oldLocks.onset;
  if (onsetLock && onsetLock.id === 'breathy') {
    const dimDef = DIMENSIONS.find(d => d.id === 'onset');
    const valObj = dimDef && dimDef.options.find(o => o.id === 'breathyOnset');
    newLocks.onset = valObj ? { ...valObj } : { id: 'breathyOnset', name: 'Breathy Onset' };
  }

  return {
    ...v3Data,
    version: 4,
    constraintWeights: newWeights,
    settings: {
      ...(v3Data.settings || {}),
      lockedDimensions: newLocks,
    },
  };
}

// v2 → v3 migration (Phase C). Remaps deprecated picking-hand values that
// were compressed out of the dim:
//   guitar:pickingHand:muted  → guitar:pickingHand:downstrokes   (muted
//                               strums are downstroke-dominant)
//   guitar:pickingHand:slide  → guitar:noteTransition:slideConnect
//   guitar:pickingHand:bends  → guitar:noteTransition:bendTarget
//
// Same mapping is applied to lockedDimensions. If the target key already
// exists in weights (unlikely but possible for a merge), counts are summed
// conservatively rather than overwriting. Idempotent — a v3 blob passes
// through unchanged.
function migrateForgeDataV2ToV3(v2Data) {
  if (!v2Data || typeof v2Data !== 'object') return v2Data;
  if ((v2Data.version || 0) >= 3) return v2Data;

  const PICKING_HAND_REMAP = {
    // [legacyDim, legacyValue] → [newDim, newValue]
    'pickingHand:muted':  ['pickingHand',     'downstrokes'],
    'pickingHand:slide':  ['noteTransition',  'slideConnect'],
    'pickingHand:bends':  ['noteTransition',  'bendTarget'],
  };

  // 1. Weights — iterate v2-format keys "instrument:dim:value" and remap
  //    the (dim, value) pair when it matches a deprecated picking-hand value.
  const oldWeights = v2Data.constraintWeights || {};
  const newWeights = { ...oldWeights };
  for (const [key, weights] of Object.entries(oldWeights)) {
    const parts = key.split(':');
    if (parts.length !== 3) continue; // skip unscoped or malformed
    const [inst, dim, val] = parts;
    const remap = PICKING_HAND_REMAP[`${dim}:${val}`];
    if (!remap) continue;
    if (inst !== 'guitar') continue; // these values only existed on guitar
    const [newDim, newVal] = remap;
    const newKey = `${inst}:${newDim}:${newVal}`;
    // Delete the legacy key (unconditionally) and merge weights into the
    // new key — if a target already exists, sum the counts.
    delete newWeights[key];
    const existing = newWeights[newKey];
    if (existing) {
      newWeights[newKey] = {
        easy: (existing.easy || 0) + (weights.easy || 0),
        good: (existing.good || 0) + (weights.good || 0),
        hard: (existing.hard || 0) + (weights.hard || 0),
      };
    } else {
      newWeights[newKey] = { ...weights };
    }
  }

  // 2. Locks — pickingHand can be locked to a value that no longer exists.
  //    If so, move the lock onto the new dim with the remapped value.
  //    The value objects are our own constant lookups (so the lock UI
  //    continues to read proper name/desc/icon from the new dim's options).
  const oldLocks = (v2Data.settings && v2Data.settings.lockedDimensions) || {};
  const newLocks = { ...oldLocks };
  const pickingLock = oldLocks.pickingHand;
  if (pickingLock && pickingLock.id) {
    const remap = PICKING_HAND_REMAP[`pickingHand:${pickingLock.id}`];
    if (remap) {
      const [newDim, newVal] = remap;
      delete newLocks.pickingHand;
      // Pull the target value object from the new dim's options so the lock
      // chip renders the right label/icon/desc after migration.
      const newDimDef = DIMENSIONS.find(d => d.id === newDim);
      const newValObj = newDimDef && newDimDef.options.find(o => o.id === newVal);
      newLocks[newDim] = newValObj ? { ...newValObj } : { id: newVal };
    }
  }

  return {
    ...v2Data,
    version: 3,
    constraintWeights: newWeights,
    settings: {
      ...(v2Data.settings || {}),
      lockedDimensions: newLocks,
    },
  };
}

// v1 → v2 migration. Called from loadForgeData on any blob that doesn't
// have `version === CURRENT_SCHEMA_VERSION`. Atomic: constructs the full
// v2 structure, backs up the v1 blob, then writes the v2 blob. If anything
// throws, the v1 data is still intact in localStorage (we haven't mutated
// the original raw until the last line).
//
// What changes in v2:
//   - `version: 2` tag added
//   - `constraintWeights` keys rewritten from `"${dimId}:${valueId}"` to
//     `"${instrument}:${dimId}:${valueId}"`:
//       * `vocalTechnique:X` → `voice:register:X`
//       * `guitarTechnique:X` → `guitar:pickingHand:X`
//       * shared dim keys (pitch/rhythm/dynamics/articulation/phraseLength)
//         get BOTH `voice:${dimId}:X` and `guitar:${dimId}:X` entries seeded
//         with the v1 count so practice history carries over to both modes
//   - `settings.lockedDimensions` keys translated:
//       * `vocalTechnique` → `register`
//       * `guitarTechnique` → `pickingHand`
//       * others unchanged
//   - `settings.excludedDimensions` array: `vocalTechnique` → `register`,
//     `guitarTechnique` → `pickingHand`
//   - `sessions[]` frozen in v1 format with `schemaVersion: 1` tag per session;
//     historical cards render in a legacy read-only mode, not translated
//   - Defensive: missing/corrupt/undefined version → treat as fresh install
function migrateForgeDataV1ToV2(v1Data) {
  // Defensive init: if the blob is missing essential fields, return a fresh v2.
  if (!v1Data || typeof v1Data !== 'object') {
    return { version: CURRENT_SCHEMA_VERSION, sessions: [], constraintWeights: {}, settings: null };
  }

  // Already v2? No-op.
  if (v1Data.version === CURRENT_SCHEMA_VERSION) return v1Data;

  // Back up the v1 blob once (idempotent — don't overwrite if already backed up).
  try {
    if (!localStorage.getItem(V1_BACKUP_KEY)) {
      localStorage.setItem(V1_BACKUP_KEY, JSON.stringify({
        ...v1Data,
        _backedUpAt: new Date().toISOString(),
      }));
    }
  } catch {}

  // 1. Migrate constraintWeights.
  const oldWeights = v1Data.constraintWeights || {};
  const newWeights = {};
  // Dim → new scoped prefix mapping
  const DIM_RENAME = { vocalTechnique: 'register', guitarTechnique: 'pickingHand' };
  const GUITAR_DIM_INSTR = new Set(['pickingHand', 'texture']);
  const VOICE_DIM_INSTR  = new Set(['register', 'vowel']);
  for (const [oldKey, weights] of Object.entries(oldWeights)) {
    if (typeof oldKey !== 'string') continue;
    const parts = oldKey.split(':');
    if (parts.length !== 2) {
      // Already scoped or malformed — preserve as-is.
      newWeights[oldKey] = weights;
      continue;
    }
    let [oldDim, valueId] = parts;

    // Phase B: questionAnswer value moved from pitchConstraint to phraseStructure.
    // Translate the value id to the new kebab-case form and retarget the dim.
    if (oldDim === 'pitchConstraint' && valueId === 'questionAnswer') {
      oldDim = 'phraseStructure';
      valueId = 'question-answer';
    }

    const newDim = DIM_RENAME[oldDim] || oldDim;
    if (GUITAR_DIM_INSTR.has(newDim)) {
      newWeights[`guitar:${newDim}:${valueId}`] = { ...weights };
    } else if (VOICE_DIM_INSTR.has(newDim)) {
      newWeights[`voice:${newDim}:${valueId}`] = { ...weights };
    } else {
      // Shared dim: seed both instruments so practice history carries over.
      newWeights[`voice:${newDim}:${valueId}`] = { ...weights };
      newWeights[`guitar:${newDim}:${valueId}`] = { ...weights };
    }
  }

  // 2. Migrate lockedDimensions.
  // Special case: if pitchConstraint was locked to the `questionAnswer` value,
  // the lock needs to move to phraseStructure (where that value now lives) and
  // the value object needs to be rewritten with the new id.
  const oldLocks = (v1Data.settings && v1Data.settings.lockedDimensions) || {};
  const newLocks = {};
  for (const [oldKey, value] of Object.entries(oldLocks)) {
    if (oldKey === 'pitchConstraint' && value && value.id === 'questionAnswer') {
      newLocks.phraseStructure = {
        id: 'question-answer',
        name: 'Question & Answer',
        desc: value.desc || 'Pairs of phrases. First asks, second answers.',
        icon: '❓',
      };
      continue;
    }
    const newKey = DIM_RENAME[oldKey] || oldKey;
    newLocks[newKey] = value;
  }

  // 3. Migrate excludedDimensions.
  const oldExcludes = (v1Data.settings && v1Data.settings.excludedDimensions) || [];
  const newExcludes = oldExcludes.map(id => DIM_RENAME[id] || id);

  // 4. Freeze sessions with schemaVersion: 1 (don't translate historical cards).
  const frozenSessions = (v1Data.sessions || []).map(s => ({
    ...s,
    schemaVersion: s.schemaVersion || 1,
  }));

  // 5. Assemble v2 blob. Hard-coded `version: 2` (not CURRENT_SCHEMA_VERSION)
  //    because this migration step only upgrades v1 → v2. The migrateForgeData
  //    chain will then pass the result to migrateForgeDataV2ToV3 if needed.
  return {
    ...v1Data,
    version: 2,
    sessions: frozenSessions,
    constraintWeights: newWeights,
    settings: {
      ...(v1Data.settings || {}),
      lockedDimensions: newLocks,
      excludedDimensions: newExcludes,
      mood: (v1Data.settings && v1Data.settings.mood) || null, // v2 addition, default unset
    },
  };
}

// Age-out the v1 backup after 14 days. Called from loadForgeData on every
// read — cheap, so users don't need an explicit cleanup step.
function ageOutV1Backup() {
  try {
    const raw = localStorage.getItem(V1_BACKUP_KEY);
    if (!raw) return;
    const backup = JSON.parse(raw);
    if (!backup._backedUpAt) return;
    const ageMs = Date.now() - new Date(backup._backedUpAt).getTime();
    const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
    if (ageMs > FOURTEEN_DAYS) {
      localStorage.removeItem(V1_BACKUP_KEY);
    }
  } catch {}
}

// Run the full migration chain on any blob that isn't at the current
// schema version. Chains: v1 → v2 → v3. Idempotent — each step is a no-op
// when the blob is already at or past that version. New migration steps
// go here when bumped: add the callable and chain it at the end.
function migrateForgeData(data) {
  if (!data || typeof data !== 'object') return data;
  if (data.version === CURRENT_SCHEMA_VERSION) return data;
  let cur = data;
  if ((cur.version || 0) < 2) cur = migrateForgeDataV1ToV2(cur);
  if ((cur.version || 0) < 3) cur = migrateForgeDataV2ToV3(cur);
  if ((cur.version || 0) < 4) cur = migrateForgeDataV3ToV4(cur);
  if ((cur.version || 0) < 5) cur = migrateForgeDataV4ToV5(cur);
  return cur;
}

function loadForgeData() {
  ageOutV1Backup();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Run migration on every read if the blob isn't current. Each step
      // is idempotent. First-run migration is also written back to
      // localStorage via the caller (the settings-persist useEffect).
      if (parsed && parsed.version !== CURRENT_SCHEMA_VERSION) {
        return migrateForgeData(parsed);
      }
      return parsed;
    }
  } catch {}
  return {
    version: CURRENT_SCHEMA_VERSION,
    sessions: [],
    constraintWeights: {},
    settings: null,
  };
}

function saveForgeData(data) {
  try {
    // Cap at 100 sessions
    if (data.sessions.length > 100) data.sessions = data.sessions.slice(-100);
    // Always tag with current schema version on write.
    const toWrite = { ...data, version: CURRENT_SCHEMA_VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toWrite));
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
  mood = null,
}) {
  const moodOverlay = lookupMoodOverlay(card.mood || mood);
  const phaseECombos = lookupPhaseECombo(card);
  const keyColor = getColorForNote(card.constraints.key) || T.gold;
  const scaleName = SCALE_TYPES[card.constraints.scale]?.name || card.constraints.scale;
  const scaleData = generateScale(card.constraints.key, card.constraints.scale);
  const scaleNotes = scaleData.notes || [];
  const scaleDesc = SCALE_TYPES[card.constraints.scale]?.desc || '';

  // Collect active qualitative constraints for display.
  // Foundational dims (texture / register / vowel) are drawn on every card and
  // get their own visual zone — "the ground" — separated from the N random draws.
  const FOUNDATIONAL_DIM_IDS = ['texture', 'register', 'vowel'];
  const RANDOM_DIM_IDS = [
    'pitchConstraint', 'rhythmConstraint', 'dynamics',
    'harmonicTarget', 'chordProgression',
    'articulation', 'phraseLength',
    'phraseStructure',
    'onset',
    'pickingHand', 'neckZone', 'noteTransition', 'vibrato',
  ];
  const foundationalLines = [];
  const constraintLines = [];
  for (const dimId of FOUNDATIONAL_DIM_IDS) {
    const c = card.constraints[dimId];
    if (!c) continue;
    const dim = DIMENSIONS.find(d => d.id === dimId);
    foundationalLines.push({ dim, constraint: c });
  }
  for (const dimId of RANDOM_DIM_IDS) {
    const c = card.constraints[dimId];
    if (!c) continue;
    // chordProgression gets its own banner below the foundation rather than
    // a generic constraint line — it's a cycle of chords, not a single
    // technique value, so rendering it with the same chrome as the other
    // dims would flatten its musical role.
    if (dimId === 'chordProgression') continue;
    const dim = DIMENSIONS.find(d => d.id === dimId);
    constraintLines.push({ dim, constraint: c });
  }
  const progressionLine = card.constraints.chordProgression?.resolvedChords?.length
    ? { dim: DIMENSIONS.find(d => d.id === 'chordProgression'), constraint: card.constraints.chordProgression }
    : null;

  // Oblique modifier is rendered separately with italic styling — it's a creative spice, not a constraint
  const oblique = card.constraints.obliqueModifier;

  // Pre-generated LLM guidance — mode-aware routing inside lookupGuidance
  const guidance = lookupGuidance(card);
  const scaleChar = lookupScaleCharacter(card.constraints.scale);

  // Per-constraint focus guidance for combo/matrix — lets users drill each component in isolation.
  // Looks up each drawn constraint's individual focus entry from the guidance cache.
  const perConstraintFocus = (card.mode === 'combo' || card.mode === 'matrix')
    ? Object.fromEntries(
        constraintLines
          .map(({ dim, constraint }) => [dim.id, GUIDANCE_CACHE.focus?.[`${dim.id}:${constraint.id}`] || null])
          .filter(([, v]) => v)
      )
    : {};
  const [expandedFocus, setExpandedFocus] = useState({});

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
      {/* Phase E: Mood overlay banner. Sits above the key/scale as the
          emotional "ground" that colors every card this round. Null when
          no mood is picked. */}
      {moodOverlay && (
        <div style={{
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: `1px dashed ${T.border}`,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: T.goldDark || T.textMuted,
            letterSpacing: 1.6, textTransform: 'uppercase', fontFamily: T.sans,
            marginBottom: 6,
          }}>
            Mood · {mood}
          </div>
          <div style={{
            fontFamily: T.serif, fontSize: 14, color: T.textDark,
            lineHeight: 1.55, fontStyle: 'italic',
          }}>
            {moodOverlay}
          </div>
        </div>
      )}

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

      {/* Foundational dim zone — "the ground" the random constraints rest on.
          Texture for guitar; register + vowel for voice. Always present on
          every card regardless of mode/N. Visually distinct: subtle gold tint
          background, labeled as FOUNDATION, sitting above the random draws. */}
      {foundationalLines.length > 0 && (
        <div style={{
          marginTop: 18,
          padding: '14px 16px',
          background: `${T.goldSoft || 'rgba(212, 163, 115, 0.08)'}`,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          opacity: 0.98,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: T.goldDark || T.textMuted,
            textTransform: 'uppercase', letterSpacing: 1.6, fontFamily: T.sans,
            marginBottom: 10,
          }}>
            Foundation
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {foundationalLines.map(({ dim, constraint }) => {
              const exampleText = constraint.dynamicExample || (constraint.example ? constraint.example(scaleNotes, card.constraints.tempo, card.instrument) : null);
              return (
                <div key={dim.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 3, alignSelf: 'stretch', borderRadius: 4,
                    background: dim.color, opacity: 0.9, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      {constraint.icon && <span style={{ fontSize: 14 }}>{constraint.icon}</span>}
                      <span style={{
                        fontFamily: T.serif, fontSize: 16, fontWeight: 500, color: T.textDark,
                        lineHeight: 1.3,
                      }}>
                        {constraint.name}
                      </span>
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: dim.color, textTransform: 'uppercase',
                        letterSpacing: 0.8, fontFamily: T.sans, opacity: 0.75,
                      }}>
                        {dim.label}
                      </span>
                      {onToggleLock && (
                        <span style={{ marginLeft: 'auto' }}>
                          <LockChip dimId={dim.id} currentValue={constraint} label={dim.label} />
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontFamily: T.sans, fontSize: 12.5, color: T.textMed, lineHeight: 1.55,
                    }}>
                      {(card.instrument === 'guitar' && constraint.descGuitar) || constraint.desc}
                    </div>
                    {exampleText && (
                      <div style={{
                        fontFamily: T.sans, fontSize: 11.5, color: T.textLight, lineHeight: 1.5,
                        marginTop: 3, fontStyle: 'italic',
                      }}>
                        {exampleText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chord progression banner — the harmonic cycle other constraints play
          over. Unique chord chips read as discrete targets (matches the chord
          detector's checklist granularity). If the progression has >5 chords
          (e.g. 12-bar blues), a subtitle shows the full form. A synthesis
          line composes progression × texture/picking × harmonic target into
          one coherent prompt so the card reads as a practice instruction,
          not a stack of disconnected stickers. */}
      {progressionLine && (() => {
        const prog = progressionLine.constraint;
        const allChords = prog.resolvedChords || [];
        const uniqueChords = [];
        const seen = new Set();
        for (const c of allChords) {
          if (seen.has(c.name)) continue;
          seen.add(c.name);
          uniqueChords.push(c);
        }
        const showForm = allChords.length > 5;
        const progColor = progressionLine.dim.color;
        const synthesis = composeProgressionSynthesis(card);
        const practiceTip = composeProgressionPracticeTip(card);
        const modalCallout = MODAL_CHARACTER_CALLOUTS[card.constraints.scale];

        // Strip quality-pin suffixes (Vmaj → V, ivmin → iv) from degree
        // labels since those are resolver hints, not performer-facing notation.
        // Keep explicit jazz notation (V7, iim7, Imaj7, iim7b5) — they carry a digit.
        const displayRoman = (r) => r && !/\d/.test(r)
          ? r.replace(/(maj|min|dim|aug)$/, '')
          : r;

        // Guitar fingerings: look up each unique chord's voicing, with an
        // enharmonic fallback (A# → Bb, D# → Eb, G# → Ab) because the
        // voicing library uses mixed sharp/flat spellings.
        const ENHARMONIC_FLAT = { 'A#': 'Bb', 'D#': 'Eb', 'G#': 'Ab' };
        const lookupVoicing = (name) => {
          if (CHORD_VOICINGS_MULTI[name]) return CHORD_VOICINGS_MULTI[name][0];
          const root = name.match(/^[A-G][#b]?/)?.[0];
          const rest = name.slice(root?.length || 0);
          const flat = ENHARMONIC_FLAT[root];
          if (flat && CHORD_VOICINGS_MULTI[flat + rest]) return CHORD_VOICINGS_MULTI[flat + rest][0];
          return null;
        };
        const showFingerings = card.instrument === 'guitar';
        return (
          <div style={{
            marginTop: 18,
            padding: '14px 16px 16px',
            background: `${progColor}0f`,
            border: `1px solid ${progColor}40`,
            borderRadius: 10,
          }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 8,
              fontSize: 9, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase',
              color: progColor, marginBottom: 10, fontFamily: T.sans,
            }}>
              <span>Progression</span>
              <span style={{ color: T.textLight, fontWeight: 500, letterSpacing: 0.4, textTransform: 'none' }}>
                · {prog.name}
              </span>
              <span style={{ flex: 1 }} />
              {onToggleLock && (
                <LockChip dimId="chordProgression" currentValue={prog} label="Progression" />
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {uniqueChords.map((c, i) => {
                const cc = getColorForNote(normalizeNote(c.root)) || progColor;
                const roman = displayRoman(c.roman);
                return (
                  <React.Fragment key={c.name}>
                    {i > 0 && (
                      <span style={{ color: T.textLight, fontFamily: T.sans, fontSize: 13, opacity: 0.6, paddingTop: 9 }}>→</span>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <span style={{
                        padding: '5px 12px', borderRadius: 6,
                        border: `1.5px solid ${cc}`,
                        color: cc, background: `${cc}10`,
                        fontFamily: T.serif, fontWeight: 600, fontSize: 17,
                        lineHeight: 1, letterSpacing: 0.3,
                      }}>{c.name}</span>
                      {roman && (
                        <span style={{
                          fontFamily: T.sans, fontSize: 9, fontWeight: 600,
                          color: T.textLight, letterSpacing: 0.5,
                        }}>{roman}</span>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Chord fingerings — guitar only. Mini-diagrams show the
                canonical voicing for each unique chord so a player who's
                never seen "Gmaj7" or "F#m" can play it without leaving the
                card. Voicings missing from the library are silently omitted
                (e.g. dim/aug/extension chords like "C#dim" may not resolve). */}
            {showFingerings && uniqueChords.length > 0 && (() => {
              const shapes = uniqueChords
                .map(c => ({ name: c.name, voicing: lookupVoicing(c.name) }))
                .filter(s => s.voicing);
              if (shapes.length === 0) return null;
              return (
                <div style={{
                  display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14,
                  paddingTop: 12, borderTop: `1px dashed ${progColor}20`,
                }}>
                  {shapes.map(s => (
                    <div key={s.name} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>
                      <ChordDiagram T={T} frets={s.voicing.frets} name={s.name} />
                      {s.voicing.pos && s.voicing.pos !== 'Open' && (
                        <span style={{
                          fontFamily: T.sans, fontSize: 9, color: T.textLight,
                          marginTop: -4, letterSpacing: 0.3,
                        }}>{s.voicing.pos}</span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
            {showForm && (() => {
              // Compress consecutive repeats so 12-bar blues reads
              // "I7 ×4 · IV7 ×2 · I7 ×2 · V7 · IV7 · I7 · V7" instead of
              // dragging the player through twelve identical-looking entries.
              // Uses Roman numerals — the abstract form is what's useful at
              // this density; the concrete chord names are already above.
              const runs = [];
              for (const c of allChords) {
                const label = c.roman || c.name;
                if (runs.length && runs[runs.length - 1].label === label) {
                  runs[runs.length - 1].count += 1;
                } else {
                  runs.push({ label, count: 1 });
                }
              }
              return (
                <div style={{
                  marginTop: 10, fontSize: 11, color: T.textMed,
                  fontFamily: T.sans, lineHeight: 1.5,
                }}>
                  <span style={{ color: T.textLight, fontWeight: 600, marginRight: 6 }}>Form:</span>
                  {runs.map(r => r.count > 1 ? `${r.label} ×${r.count}` : r.label).join(' · ')}
                </div>
              );
            })()}
            {synthesis && (
              <div style={{
                marginTop: 12, paddingTop: 10,
                borderTop: `1px dashed ${progColor}30`,
                fontFamily: T.serif, fontSize: 14, color: T.textDark,
                lineHeight: 1.55,
              }}>
                {synthesis}
              </div>
            )}
            {practiceTip && (
              <div style={{
                marginTop: 8, padding: '8px 10px',
                background: `${progColor}08`,
                borderLeft: `2.5px solid ${progColor}80`,
                borderRadius: 3,
                fontFamily: T.sans, fontSize: 12, color: T.textDark,
                lineHeight: 1.55,
              }}>
                {practiceTip}
              </div>
            )}
            {modalCallout && (
              <div style={{
                marginTop: 8, fontSize: 11, color: T.textMed,
                fontFamily: T.sans, lineHeight: 1.5,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 0.8, textTransform: 'uppercase', marginRight: 6 }}>Ear:</span>
                {modalCallout}
              </div>
            )}
            <div style={{
              marginTop: 8, fontSize: 11.5, color: T.textMed,
              fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.5,
            }}>
              {prog.vibe} · {prog.bars} bar{prog.bars === 1 ? '' : 's'} — cycle through the changes.
            </div>
          </div>
        );
      })()}

      {/* Divider */}
      {(constraintLines.length > 0 || progressionLine) && (
        <div style={{ height: 1, background: T.border, margin: '20px 0', opacity: 0.6 }} />
      )}

      {/* Constraint lines — grouped with a single left accent */}
      {constraintLines.length > 0 && (
        <div style={{
          borderLeft: `3px solid ${constraintLines.length === 1
            ? constraintLines[0].dim.color
            : `${T.gold}80`}`,
          paddingLeft: 16,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {constraintLines.map(({ dim, constraint }) => {
            const exampleText = constraint.dynamicExample || (constraint.example ? constraint.example(scaleNotes, card.constraints.tempo, card.instrument) : null);
            return (
              <div key={dim.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: dim.color, flexShrink: 0,
                  }} />
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
                  {(card.instrument === 'guitar' && constraint.descGuitar) || constraint.desc}
                </div>
                {exampleText && (
                  <div style={{
                    fontFamily: T.sans, fontSize: 12, color: T.textLight, lineHeight: 1.5,
                    marginTop: 4, fontStyle: 'italic', paddingLeft: 2,
                  }}>
                    {exampleText}
                  </div>
                )}
                {/* Collapsible focus guidance — combo/matrix only. Shows the individual
                    focus-mode guidance for this constraint so users can work on it in isolation. */}
                {perConstraintFocus[dim.id] && (() => {
                  const fg = perConstraintFocus[dim.id];
                  const isOpen = !!expandedFocus[dim.id];
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpandedFocus(prev => ({ ...prev, [dim.id]: !prev[dim.id] }))}
                        aria-expanded={isOpen}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          marginTop: 8, padding: '5px 10px', borderRadius: 8,
                          background: isOpen ? `${dim.color}12` : 'transparent',
                          border: `1px solid ${isOpen ? `${dim.color}40` : T.border}`,
                          color: isOpen ? dim.color : T.textLight,
                          fontSize: 11, fontWeight: 600, fontFamily: T.sans,
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        <ChevronDown size={12} style={{
                          transform: isOpen ? 'rotate(180deg)' : '',
                          transition: 'transform 0.2s',
                        }} />
                        Focus on this alone
                      </button>
                      {isOpen && (
                        <div style={{
                          marginTop: 10, padding: '14px 16px',
                          background: T.bgSoft,
                          border: `1px solid ${T.borderSoft || T.border}`,
                          borderLeft: `3px solid ${dim.color}`,
                          borderRadius: '0 8px 8px 0',
                          display: 'flex', flexDirection: 'column', gap: 14,
                          animation: 'forgeGuidanceExpand 0.3s ease-out both',
                        }}>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Character</div>
                            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textDark, lineHeight: 1.6 }}>{fg.character}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Why practice this</div>
                            <div style={{ fontFamily: T.sans, fontSize: 13.5, color: T.textDark, lineHeight: 1.6 }}>{fg.whyPractice}</div>
                          </div>
                          {fg.steps && fg.steps.length > 0 && (
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Steps</div>
                              <ol style={{ margin: 0, paddingLeft: 20, fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.65 }}>
                                {fg.steps.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
                              </ol>
                            </div>
                          )}
                          {fg.progression && fg.progression.length > 0 && (
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Progression</div>
                              <ol style={{ margin: 0, paddingLeft: 20, fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.65 }}>
                                {fg.progression.map((p, i) => <li key={i} style={{ marginBottom: 4 }}>{p}</li>)}
                              </ol>
                            </div>
                          )}
                          {fg.examples && fg.examples.length > 0 && (
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Try these phrases</div>
                              <ul style={{ margin: 0, paddingLeft: 0, listStyleType: 'none', fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.65 }}>
                                {fg.examples.map((e, i) => (
                                  <li key={i} style={{ marginBottom: 4, paddingLeft: 16, position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: T.gold, fontSize: 12 }}>♪</span>
                                    {e}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {fg.etude && (
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Etude</div>
                              <div style={{ fontFamily: T.serif, fontSize: 13, fontStyle: 'italic', color: T.textMed, lineHeight: 1.6 }}>{fg.etude}</div>
                            </div>
                          )}
                          {fg.watchOut && (
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: T.warm, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: T.sans, marginBottom: 6 }}>Watch out</div>
                              <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textMed, lineHeight: 1.6 }}>{fg.watchOut}</div>
                            </div>
                          )}
                          {fg.listenTo && (
                            <div style={{ borderTop: `1px dashed ${T.border}`, paddingTop: 12, fontFamily: T.sans, fontSize: 12, color: T.textLight }}>
                              <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, fontSize: 10, color: T.goldDark, marginRight: 8 }}>Listen to</span>
                              {fg.listenTo}
                            </div>
                          )}
                          {fg.deeperInsight && (
                            <div style={{ borderTop: `1px dashed ${T.border}`, paddingTop: 12, fontFamily: T.serif, fontSize: 13, fontStyle: 'italic', color: T.textLight, lineHeight: 1.65 }}>
                              {fg.deeperInsight}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}

      {/* Phase E: Pairwise combo overlays for Phase B–D dims. Rendered as
          highlighted tips above the main LLM guidance block. Only shows if
          the current card's drawn dims match a hand-crafted pair in
          PHASE_E_COMBO_OVERLAYS. Typically 0-2 hits per card. */}
      {phaseECombos && phaseECombos.length > 0 && (
        <div style={{
          marginTop: 24,
          padding: '16px 18px',
          background: `${T.goldSoft || 'rgba(212, 163, 115, 0.08)'}`,
          border: `1px solid ${T.gold || '#d4a373'}`,
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, color: T.goldDark || T.textMuted,
            letterSpacing: 1.6, textTransform: 'uppercase', fontFamily: T.sans,
            marginBottom: 10,
          }}>
            Pairwise Insight
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {phaseECombos.map((h, i) => (
              <div key={i} style={{
                fontFamily: T.sans, fontSize: 13, color: T.textDark, lineHeight: 1.6,
              }}>
                {h.text}
              </div>
            ))}
          </div>
        </div>
      )}

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
// ─── Forge chord listener (Phase 6) ───
// ═══════════════════════════════════════════
// Sixth auto-wired tool. Surfaces the detected chord live plus a one-shot
// "matches the card key" verification signal the player can use to inform
// their Easy/Good/Hard rating. Engine plumbing lives in chordDetectorReact.js
// — the engine is a refcounted singleton shared by the Tools panel, the
// in-exercise listener, and this listener.

function ForgeChordListener({ T, keyRoot, progressionTargets, progressionName, cardId }) {
  const { chord, listening, signalLevel, signalDb, error, isReady, toggle: handleToggle } = useChordEngine();
  const hasProgression = !!(progressionTargets && progressionTargets.length);

  // Progression-aware checklist. Hook is always called so the hook order stays
  // stable; it's a no-op when targets is null/empty (no matches will tick).
  const { confirmed, reset: resetChecklist } = useChordTargetChecklist(
    hasProgression ? progressionTargets : null,
    chord
  );

  // Reset checklist when the card changes — confirmed state is sticky across
  // target-list changes inside the hook, so a new card with different chords
  // must explicitly clear the old ticks.
  useEffect(() => {
    resetChecklist();
  }, [cardId, resetChecklist]);

  // Fallback narrow key-match verification — only used when the card has NO
  // progression drawn. Preserves the pre-Phase-4 behavior (play the tonic
  // chord for ≥600 ms to confirm) for every card that doesn't pin a cycle.
  const [keyMatchConfirmed, setKeyMatchConfirmed] = useState(false);
  const sustainStartRef = useRef(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyMatchConfirmed(false);
    sustainStartRef.current = 0;
  }, [keyRoot, hasProgression, cardId]);
  useEffect(() => {
    if (hasProgression) return; // progression mode handles its own verification
    if (!chord || !keyRoot || chord.confidence < CHORD_MIN_CONF) {
      sustainStartRef.current = 0;
      return;
    }
    if (normalizeNote(chord.root) !== normalizeNote(keyRoot)) {
      sustainStartRef.current = 0;
      return;
    }
    if (keyMatchConfirmed) return;
    const now = performance.now();
    if (sustainStartRef.current === 0) sustainStartRef.current = now;
    else if (now - sustainStartRef.current >= CHORD_CONFIRM_MS) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setKeyMatchConfirmed(true);
    }
  }, [chord, keyRoot, keyMatchConfirmed, hasProgression]);

  const meterPct = Math.max(0, Math.min(100, signalLevel * 100));
  const dbLabel = signalDb && isFinite(signalDb) ? `${Math.round(signalDb)} dB` : '— dB';
  const chordColor = chord ? getColorForNote(chord.root) : T.textMuted;

  const progressionConfirmedCount = hasProgression
    ? progressionTargets.filter(t => confirmed[t]).length
    : 0;
  const progressionComplete = hasProgression && progressionConfirmedCount === progressionTargets.length;

  return (
    <div>
      {/* Top: live chord readout + listen button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: T.serif, fontSize: 32, lineHeight: 1, color: chordColor, fontWeight: 600 }}>
            {chord ? chord.name : '—'}
          </span>
          {chord && (
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMed }}>
              {Math.round(chord.confidence * 100)}%
            </span>
          )}
          <span style={{ flex: 1 }} />
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: T.sans, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
            color: listening ? T.textDark : T.textMuted,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: listening ? '#22c55e' : T.textMuted,
              boxShadow: listening ? '0 0 5px #22c55e' : 'none',
            }} />
            {listening ? 'LIVE' : 'IDLE'}
          </span>
        </div>
        <button onClick={handleToggle} disabled={!isReady} style={{
          background: listening ? T.gold : 'transparent', color: listening ? '#fff' : T.goldDark,
          border: `1.5px solid ${T.gold}`, borderRadius: 8, padding: '7px 14px',
          fontFamily: T.sans, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2,
          cursor: isReady ? 'pointer' : 'wait', whiteSpace: 'nowrap',
        }}>{listening ? 'Listening' : 'Listen'}</button>
      </div>

      {/* Signal meter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 5, background: T.goldSoft, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${meterPct}%`, background: T.gold, transition: 'width 80ms linear' }} />
        </div>
        <span style={{ fontFamily: T.sans, fontSize: 9, color: T.textMed, whiteSpace: 'nowrap', minWidth: 38, textAlign: 'right' }}>{dbLabel}</span>
      </div>

      {/* Verification: progression-aware checklist if a progression is drawn,
          narrow key-match strip otherwise. The checklist reuses
          useChordTargetChecklist's 600ms sustain + 200ms drift-grace logic so
          brief detection blips don't reset in-flight chord timers. */}
      {hasProgression ? (
        <div style={{
          padding: '10px 12px 12px',
          background: progressionComplete ? T.successSoft : T.bgSoft,
          border: `1px solid ${progressionComplete ? T.success + '40' : T.borderSoft}`,
          borderRadius: 8,
        }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8,
            fontSize: 10, fontWeight: 700, color: T.textDark,
            fontFamily: T.sans, letterSpacing: 0.4,
          }}>
            <strong style={{ letterSpacing: 1.0, textTransform: 'uppercase', fontSize: 9, color: T.goldDark }}>
              Progression check
            </strong>
            {progressionName && (
              <span style={{ color: T.textMed, fontWeight: 500 }}>
                {progressionName}
              </span>
            )}
            <span style={{ flex: 1 }} />
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
              color: progressionComplete ? T.success : T.textMed,
            }}>
              {progressionConfirmedCount} / {progressionTargets.length} confirmed
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {progressionTargets.map(name => {
              const root = name.match(/^[A-G][#b]?/)?.[0];
              const cc = (root && getColorForNote(normalizeNote(root))) || T.textMuted;
              const isConfirmed = !!confirmed[name];
              return (
                <span key={name} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 9px', borderRadius: 6,
                  border: `1.5px solid ${isConfirmed ? cc : `${cc}55`}`,
                  background: isConfirmed ? `${cc}1f` : 'transparent',
                  color: isConfirmed ? cc : T.textMed,
                  fontFamily: T.serif, fontWeight: 600, fontSize: 13,
                  opacity: isConfirmed ? 1 : 0.75,
                  transition: 'all 0.2s',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: isConfirmed ? cc : 'transparent',
                    border: isConfirmed ? 'none' : `1.2px solid ${cc}80`,
                    boxShadow: isConfirmed ? `0 0 4px ${cc}80` : 'none',
                    flexShrink: 0,
                  }} />
                  {name}
                </span>
              );
            })}
          </div>
          <div style={{
            marginTop: 8, fontSize: 10.5, color: T.textLight,
            fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.4,
          }}>
            Play each chord for ≥600 ms to tick it off. Bare letters accept any quality (G matches G, G7, Gmaj7). Explicit targets (G7) demand exact match.
          </div>
        </div>
      ) : keyRoot && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
          background: keyMatchConfirmed ? T.successSoft : T.bgSoft,
          border: `1px solid ${keyMatchConfirmed ? T.success + '40' : T.borderSoft}`,
          borderRadius: 8,
        }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: keyMatchConfirmed ? T.success : T.textMuted,
            boxShadow: keyMatchConfirmed ? `0 0 6px ${T.success}80` : 'none',
            flexShrink: 0,
          }} />
          <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textDark, flex: 1 }}>
            <strong>Key match:</strong> {keyMatchConfirmed
              ? `${keyRoot} confirmed (held ≥600 ms)`
              : `play ${keyRoot} (any quality) for ≥600 ms to confirm`}
          </span>
          {keyMatchConfirmed && (
            <span style={{
              fontFamily: T.sans, fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
              textTransform: 'uppercase', color: T.success,
            }}>verified</span>
          )}
        </div>
      )}

      {error && (
        <div style={{ marginTop: 10, fontSize: 11, color: T.coral, fontFamily: T.sans }}>
          ⚠ {error}
        </div>
      )}
      <div style={{ marginTop: 10, fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.5 }}>
        Strums + open chords detect best. Single-note phrases will read as the dominant chord they imply.
      </div>
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
  // Phase F: mood is auto-drawn per card (see drawMood). When non-null here,
  // it acts as a LOCK — the user pinned a mood via the picker. Null = auto-draw.
  const [mood, setMood] = useState(() => forgeData.settings?.mood ?? null);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  // Timer duration: 0 means UNLIMITED (stopwatch, user ends manually). This is the default now —
  // counting down from 3 minutes was interrupting deep practice rounds.
  const [timerDuration, setTimerDuration] = useState(() => forgeData.settings?.timerDuration ?? 0);
  const [lockedDimensions, setLockedDimensions] = useState(() =>
    forgeData.settings?.lockedDimensions ?? {}
  );
  const [sessionCardCount, setSessionCardCount] = useState(() => forgeData.settings?.sessionCardCount ?? 1);
  // Excluded qualitative dims — user-toggleable from the Draw Pool chip row in the
  // overflow menu. Clicking a chip removes that dim from the random pool; clicking
  // again restores it. Persisted across sessions. The toggle handler prevents
  // disabling below the current mode's maxConstraints so generation can't fail.
  const [excludedDimensions, setExcludedDimensions] = useState(() => {
    const saved = forgeData.settings?.excludedDimensions;
    if (saved && saved.length > 0) return new Set(saved);
    return new Set(DEFAULT_EXCLUDED[instrument] || []);
  });

  // Derived: tier, maxConstraints, activeDimensions all come from mode + instrument.
  //
  // Three-tier dim structure (v2):
  //   1. Musical context (always set): key, scale, tempo
  //   2. Foundational (always drawn per card): texture for guitar; register + vowel for voice
  //   3. Randomizable pool (drawn per mode's maxConstraints): shared dims + instrument-branch
  //      non-foundational dims, excluding the OTHER instrument's branch dims
  //
  // maxConstraints counts ONLY the randomizable-pool draws. Foundational dims
  // are drawn in addition, not instead — a "2-constraint" card in guitar mode
  // shows 2 random + texture = 3 qualitative dims above the musical context.
  const { tier, maxConstraints, activeDimensions } = useMemo(() => {
    // Randomizable pool per instrument: shared dims + instrument-branch dims,
    // excluding foundational dims (those are drawn separately, always).
    // Phase B adds harmonicTarget and phraseStructure to the shared pool.
    // Phase C adds neckZone/noteTransition/vibrato to the guitar branch.
    const SHARED_RANDOM = [
      'pitchConstraint', 'rhythmConstraint', 'dynamics',
      'harmonicTarget', 'chordProgression',
      'articulation', 'phraseLength',
      'phraseStructure',
    ];
    const GUITAR_RANDOM = [...SHARED_RANDOM, 'pickingHand', 'neckZone', 'noteTransition', 'vibrato'];
    const VOICE_RANDOM  = [...SHARED_RANDOM, 'onset'];
    const randomPool = instrument === 'guitar' ? GUITAR_RANDOM : VOICE_RANDOM;
    const foundationalForInstrument = FOUNDATIONAL_DIMS[instrument] || [];
    // activeDimensions is what generateCard iterates. It must include:
    //   - musical context (always set)
    //   - foundational dims (always drawn)
    //   - the randomizable pool (drawn up to maxConstraints)
    // Foundational dims ride alongside the random pool so generateCard's loop
    // over activeDimensions covers them. drawFoundational() inside generateCard
    // handles them specially.
    const buildDims = () => [
      ...MUSICAL_CONTEXT_DIMS,
      ...foundationalForInstrument,
      ...randomPool,
    ];

    if (mode === 'scales') {
      // Scales mode: musical context only, no foundational, no random. Preserved from v1.
      return { tier: 1, maxConstraints: 0, activeDimensions: [...MUSICAL_CONTEXT_DIMS] };
    }
    if (mode === 'focus') {
      return { tier: 4, maxConstraints: 1, activeDimensions: buildDims() };
    }
    if (mode === 'combo') {
      return { tier: 4, maxConstraints: 2, activeDimensions: buildDims() };
    }
    // Matrix mode: 3 random draws + foundational. The classic pitch × rhythm × dynamics
    // trio is still a possible draw; guidance lookup handles it via the 210-entry matrix
    // cache when the trio comes up.
    return { tier: 4, maxConstraints: 3, activeDimensions: buildDims() };
  }, [mode, instrument]);

  // Apply user-toggled exclusions to produce the actual pool used for draws.
  // Base dims (key/scale/tempo) are never excluded — they're always required.
  // If exclusions would drop the qualitative count below maxConstraints,
  // ignore them entirely so generation can't fail (toggle handler also guards).
  const effectiveActiveDimensions = useMemo(() => {
    const qualDims = activeDimensions.filter(id =>
      DIMENSIONS.find(d => d.id === id)?.type === 'qualitative'
    );
    const baseDims = activeDimensions.filter(id =>
      DIMENSIONS.find(d => d.id === id)?.type !== 'qualitative'
    );
    const remainingQual = qualDims.filter(id => !excludedDimensions.has(id));
    if (remainingQual.length < maxConstraints) {
      return activeDimensions;
    }
    return [...baseDims, ...remainingQual];
  }, [activeDimensions, excludedDimensions, maxConstraints]);

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
    backingTrack: false,
    chordDetector: false,
  });
  const toggleTool = useCallback((toolId) => {
    setExpandedTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  }, []);

  // Guidance expand state — persisted across card draws. Default to EXPANDED so the
  // full pedagogical depth is visible on every card without the user hunting for a toggle.
  // They can still collapse it if they want a cleaner surface mid-practice.
  const [showFullGuidance, setShowFullGuidance] = useState(true);

  // History
  const [showHistory, setShowHistory] = useState(false);

  // Persist settings — mode + instrument + mood are the primary user-facing state.
  // tier/maxConstraints/activeDimensions are derived so they're not persisted separately.
  useEffect(() => {
    const updated = {
      ...forgeData,
      version: CURRENT_SCHEMA_VERSION,
      settings: {
        mode, instrument, mood, timerDuration, lockedDimensions, sessionCardCount,
        excludedDimensions: Array.from(excludedDimensions),
      },
    };
    saveForgeData(updated);
  }, [mode, instrument, mood, timerDuration, lockedDimensions, sessionCardCount, excludedDimensions]);

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

  // Lock-conflict banner state — populated when validateAndRepair throws.
  // The user sees a message and a "Clear conflicting locks" button; no card
  // is rendered until they resolve the conflict.
  const [lockConflict, setLockConflict] = useState(null);

  // Draw a new card — Phase F: mood is auto-drawn per card with coherence bias
  const drawCard = useCallback(() => {
    setShowRating(false);
    setTimerRunning(false);
    setLockConflict(null);

    try {
      if (sessionCardCount > 1) {
        // generateSession handles per-card mood draw with coherence internally
        const cards = generateSession(sessionCardCount, effectiveActiveDimensions, lockedDimensions, forgeData.constraintWeights, tier, maxConstraints, mode, instrument, mood);
        setSessionCards(cards);
        setSessionIndex(0);
        setCurrentCard(cards[0]);
      } else {
        // Single card: draw mood from previous card (coherence) or fresh
        const lastCards = forgeData.sessions.flatMap(s => s.cards || []);
        const previousMood = sessionCards.length > 0 ? sessionCards[sessionCards.length - 1]?.mood : null;
        const cardMood = drawMood(previousMood, mood);
        const card = generateCard(effectiveActiveDimensions, lockedDimensions,
          lastCards, forgeData.constraintWeights, tier, 0, maxConstraints, mode, instrument, cardMood);
        setCurrentCard(card);
        setSessionCards([card]);
        setSessionIndex(0);
      }

      setCardEntering(true);
      setTimeout(() => setCardEntering(false), 700);
      setTimerKey(k => k + 1);
    } catch (err) {
      if (err instanceof LockConflictError) {
        setLockConflict({ message: err.message, locks: err.locks });
        setCurrentCard(null);
      } else {
        throw err;
      }
    }
  }, [effectiveActiveDimensions, lockedDimensions, forgeData, tier, sessionCardCount, maxConstraints, mode, instrument, mood, sessionCards]);

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

  // Auto-expand chord detector in guitar mode when a chord progression is
  // drawn — the per-chord checklist is the primary feedback surface for the
  // progression, so landing it under the fold hides the point. Keyed on the
  // progression id so it only re-fires across distinct progressions, not on
  // every card-level re-render.
  useEffect(() => {
    if (instrument !== 'guitar') return;
    if (currentCard?.constraints?.chordProgression?.chordTargets?.length) {
      setExpandedTools(prev => ({ ...prev, chordDetector: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard?.constraints?.chordProgression?.id, instrument]);

  // Phase C: auto-expand fretboard in guitar mode when any dim that benefits
  // from visual neck context is drawn — texture (especially chord/triad/pair),
  // harmonic target (arpeggio/chord-tone/color-tone), neck zone, or note
  // transition. This gives the player a live reference for where the shapes
  // and targets sit on the neck. Voice mode leaves the fretboard collapsed.
  useEffect(() => {
    if (!currentCard || instrument !== 'guitar') return;
    const c = currentCard.constraints;
    const texture = c.texture?.id;
    const ht = c.harmonicTarget?.id;
    const hasTextureNeedingBoard = texture && texture !== 'singleLine';
    const hasHarmonicTarget = ht && ht !== 'scaleShape';
    const hasNeckZone = !!c.neckZone;
    const hasNoteTransition = !!c.noteTransition;
    if (hasTextureNeedingBoard || hasHarmonicTarget || hasNeckZone || hasNoteTransition) {
      setExpandedTools(prev => ({ ...prev, fretboard: true }));
    }
  }, [
    currentCard?.constraints?.texture?.id,
    currentCard?.constraints?.harmonicTarget?.id,
    currentCard?.constraints?.neckZone?.id,
    currentCard?.constraints?.noteTransition?.id,
    instrument,
  ]);

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

    // Update constraint weights. Keys are scoped by instrument in v2:
    //   "${instrument}:${dimId}:${valueId}"
    // Foundational dims (texture for guitar; register + vowel for voice) use
    // their foundational instrument; other dims use the CARD's instrument.
    // This prevents voice ratings from polluting guitar weights and vice versa.
    const cardInstrument = currentCard.instrument || instrument;
    const newWeights = { ...forgeData.constraintWeights };
    for (const dimId of currentCard.activeDimensions) {
      const c = currentCard.constraints[dimId];
      if (c && typeof c === 'object' && c.id) {
        const dimInstr = instrumentForDim(dimId, cardInstrument);
        const wKey = `${dimInstr}:${dimId}:${c.id}`;
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

  // Advanced tool descriptors for the expand-on-demand bar.
  // Note: the color wheel is no longer a separate tool — it's merged into the
  // CompactDroneWheel row (premium inline object, one of the Tier-1 controls).
  const advancedTools = [
    { id: 'fretboard',     label: 'Fretboard',  icon: '⛶',  available: !!scaleData },
    { id: 'volumeMeter',   label: 'Meter',      icon: '◉',  available: true },
    { id: 'chordDetector', label: 'Chord',      icon: '♭',  available: instrument === 'guitar' },
    { id: 'backingTrack',  label: 'Track',      icon: '♫',  available: !!currentCard?.suggestedTrack },
    { id: 'recorder',      label: 'Record',     icon: '●',  available: true },
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
        @keyframes forgeDroneOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes forgeDroneOrbitCounter {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes forgeDronePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 transparent); }
          50% { transform: scale(1.18); filter: drop-shadow(0 0 6px rgba(212, 163, 115, 0.5)); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes forgeCardEnter { from { opacity: 0; } to { opacity: 1; } }
          @keyframes forgeGuidanceExpand { from { opacity: 0; } to { opacity: 1; } }
          @keyframes forgeToolExpand { from { opacity: 0; } to { opacity: 1; } }
          @keyframes forgeDroneOrbit { from { transform: rotate(0); } to { transform: rotate(0); } }
          @keyframes forgeDroneOrbitCounter { from { transform: rotate(0); } to { transform: rotate(0); } }
          @keyframes forgeDronePulse { from { transform: scale(1); } to { transform: scale(1); } }
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
                onClick={() => { setInstrument(inst); setExcludedDimensions(new Set()); }}
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

          {/* Mood — auto-drawn per card (Phase F). Pill shows drawn mood.
              Picker is an optional lock: pick a mood to pin it across draws.
              Clear to return to auto-draw mode. */}
          <button
            onClick={() => setMoodPickerOpen(o => !o)}
            aria-label="Session mood"
            aria-expanded={moodPickerOpen}
            title={mood ? `Mood locked: ${mood} (click to change or clear)` : 'Auto-drawing mood — click to lock one'}
            style={{
              padding: '6px 12px', borderRadius: 8,
              background: mood ? T.goldSoft : 'transparent',
              border: `1px solid ${mood ? T.gold : T.border}`,
              color: mood ? T.goldDark : T.textMed,
              fontSize: 11, fontWeight: 600, fontFamily: T.sans,
              textTransform: 'capitalize', cursor: 'pointer',
              letterSpacing: 0.3, transition: 'all 0.15s',
              maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {currentCard?.mood || mood || 'Mood'}
          </button>

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

      {/* Mood picker panel — opens via the Mood chip in the header. Family-
          organized two-column grid for quick browsing. Clicking a mood sets it
          and closes the picker. Clicking "Clear" removes the mood. */}
      {moodPickerOpen && (
        <div
          role="menu"
          style={{
            marginBottom: 22, padding: 16,
            background: T.bgSoft, borderRadius: 10,
            border: `1px solid ${T.borderSoft}`,
            animation: 'forgeToolExpand 0.25s ease-out both',
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: T.textLight,
              letterSpacing: 1.4, textTransform: 'uppercase',
            }}>
              Session Mood {mood && <span style={{ color: T.goldDark }}>· {mood}</span>}
            </div>
            {mood && (
              <button
                onClick={() => { setMood(null); }}
                style={{
                  background: 'transparent', border: `1px solid ${T.border}`,
                  borderRadius: 6, padding: '3px 8px', fontSize: 10,
                  color: T.textMuted, cursor: 'pointer', fontFamily: T.sans,
                  textTransform: 'uppercase', letterSpacing: 0.6,
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div style={{
            fontSize: 11, color: T.textLight, fontStyle: 'italic',
            fontFamily: T.sans, marginBottom: 12, lineHeight: 1.5,
          }}>
            Mood is auto-drawn each shuffle. Pin one here to lock it across all draws. Clear to return to random.
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 14,
            maxHeight: '60vh', overflowY: 'auto',
          }}>
            {Object.entries(MOOD_LIBRARY).map(([family, moods]) => (
              <div key={family}>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: T.goldDark,
                  letterSpacing: 1.2, textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  {family}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {moods.map(m => {
                    const active = mood === m;
                    return (
                      <button
                        key={m}
                        onClick={() => { setMood(m); setMoodPickerOpen(false); }}
                        style={{
                          padding: '5px 10px', borderRadius: 14,
                          background: active ? T.gold : T.bgCard,
                          border: `1px solid ${active ? T.gold : T.borderSoft}`,
                          color: active ? '#fff' : T.textMed,
                          fontSize: 11, fontWeight: 500, fontFamily: T.sans,
                          cursor: 'pointer', textTransform: 'lowercase',
                          letterSpacing: 0.2, transition: 'all 0.15s',
                        }}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lock-conflict banner — shown when validateAndRepair throws because
          every conflicting dim is locked. User must adjust or clear a lock. */}
      {lockConflict && (
        <div style={{
          marginBottom: 18, padding: 16,
          background: `${T.warm || '#d97d54'}14`,
          border: `1px solid ${T.warm || '#d97d54'}`,
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: T.warm || '#d97d54',
            textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6, fontFamily: T.sans,
          }}>
            Lock Conflict
          </div>
          <div style={{ fontSize: 13, color: T.textDark, lineHeight: 1.5, fontFamily: T.sans, marginBottom: 10 }}>
            {lockConflict.message}
          </div>
          <button
            onClick={() => {
              // Clear the conflicting locks and retry.
              setLockedDimensions(prev => {
                const next = { ...prev };
                for (const key of Object.keys(lockConflict.locks || {})) {
                  delete next[key];
                }
                return next;
              });
              setLockConflict(null);
            }}
            style={{
              padding: '6px 12px', borderRadius: 6,
              background: T.bgCard, border: `1px solid ${T.border}`,
              color: T.textDark, fontSize: 11, fontWeight: 600,
              fontFamily: T.sans, cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}
          >
            Clear conflicting locks
          </button>
        </div>
      )}

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
          {/* Phase E: Lock-set presets — one-click drill-day setups that
              pin specific values to isolate a skill focus. Filters by the
              active instrument so only guitar presets show in guitar mode
              and vice versa. */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Drill Day Presets
            </div>
            <div style={{
              fontSize: 11, color: T.textLight, fontStyle: 'italic',
              fontFamily: T.sans, marginBottom: 10, lineHeight: 1.4,
            }}>
              One-click lock sets. Tap a preset to pin its values; tap the matching preset again to clear.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LOCK_PRESETS.filter(p => p.instrument === instrument).map(preset => {
                // Detect "active" by checking whether every lock in the preset
                // currently matches the user's lockedDimensions state.
                const active = Object.entries(preset.locks).every(([dimId, val]) => {
                  const cur = lockedDimensions[dimId];
                  return cur && cur.id === val.id;
                });
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      if (active) {
                        // Toggle off: clear the locks this preset sets
                        setLockedDimensions(prev => {
                          const next = { ...prev };
                          for (const dimId of Object.keys(preset.locks)) delete next[dimId];
                          return next;
                        });
                      } else {
                        // Apply: merge the preset locks on top of existing
                        setLockedDimensions(prev => ({ ...prev, ...preset.locks }));
                      }
                    }}
                    style={{
                      textAlign: 'left', padding: '10px 14px',
                      borderRadius: 8,
                      background: active ? T.goldSoft : T.bgCard,
                      border: `1px solid ${active ? T.gold : T.border}`,
                      color: active ? T.goldDark : T.textDark,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontFamily: T.sans,
                    }}
                  >
                    <div style={{
                      fontSize: 13, fontWeight: 700, marginBottom: 3,
                    }}>
                      {preset.label}{active && ' ·  active'}
                    </div>
                    <div style={{
                      fontSize: 11, color: active ? T.goldDark : T.textMed,
                      lineHeight: 1.45, opacity: 0.85,
                    }}>
                      {preset.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

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

          {/* Draw pool readout — chips are toggleable. Click to exclude/include
              a qualitative dimension from the random pool. Greyed-out + struck-
              through means excluded. Can't disable below mode's maxConstraints. */}
          <div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: T.textLight, letterSpacing: 1.2,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Draw Pool ({MODE_LABELS[mode]}, {instrument})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(() => {
                const qualInPool = DIMENSIONS.filter(d =>
                  d.type === 'qualitative' && activeDimensions.includes(d.id)
                );
                const enabledCount = qualInPool.filter(d => !excludedDimensions.has(d.id)).length;
                return qualInPool.map(dim => {
                  const excluded = excludedDimensions.has(dim.id);
                  const isLocked = lockedDimensions[dim.id] !== undefined;
                  // If currently enabled, turning it off must leave >= maxConstraints enabled.
                  const wouldBreak = !excluded && enabledCount - 1 < maxConstraints;
                  // Locked dims can't be excluded — exclusion would silently orphan
                  // the lock. User must unlock from the card header first.
                  const blocked = wouldBreak || isLocked;
                  return (
                    <button
                      key={dim.id}
                      onClick={() => {
                        if (blocked) return;
                        setExcludedDimensions(prev => {
                          const next = new Set(prev);
                          if (next.has(dim.id)) next.delete(dim.id);
                          else next.add(dim.id);
                          return next;
                        });
                      }}
                      disabled={blocked}
                      title={
                        isLocked
                          ? `${dim.label} is pinned — unlock it from the card header to exclude.`
                          : wouldBreak
                            ? `${MODE_LABELS[mode]} mode needs ${maxConstraints} qualitative dimensions — can't disable any more.`
                            : excluded
                              ? `Tap to include ${dim.label} in the draw pool`
                              : `Tap to exclude ${dim.label} from the draw pool`
                      }
                      style={{
                        padding: '6px 11px', borderRadius: 14, fontSize: 11, fontWeight: 600,
                        fontFamily: T.sans,
                        border: `1px solid ${excluded ? T.border : `${dim.color}60`}`,
                        background: excluded ? 'transparent' : `${dim.color}12`,
                        color: excluded ? T.textMuted : dim.color,
                        textDecoration: excluded ? 'line-through' : 'none',
                        cursor: blocked ? 'not-allowed' : 'pointer',
                        opacity: blocked ? 0.55 : 1,
                        transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
                      }}
                    >
                      {isLocked ? '📌 ' : ''}{dim.label}
                    </button>
                  );
                });
              })()}
              {activeDimensions.filter(id => DIMENSIONS.find(d => d.id === id)?.type === 'qualitative').length === 0 && (
                <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic' }}>
                  No qualitative constraints — pure scale practice.
                </div>
              )}
            </div>
            {DIMENSIONS.some(d => d.type === 'qualitative' && activeDimensions.includes(d.id)) && (
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6, lineHeight: 1.5 }}>
                Tap a chip to exclude it from random draws.
                {(() => { const dflt = DEFAULT_EXCLUDED[instrument] || new Set(); return excludedDimensions.size !== dflt.size || Array.from(excludedDimensions).some(id => !dflt.has(id)); })() && (
                  <>
                    {' '}
                    <button
                      onClick={() => setExcludedDimensions(new Set(DEFAULT_EXCLUDED[instrument] || []))}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        color: T.gold, fontSize: 11, fontFamily: T.sans,
                        cursor: 'pointer', textDecoration: 'underline', fontWeight: 600,
                      }}
                    >
                      Reset
                    </button>
                  </>
                )}
              </div>
            )}
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
            mood={mood}
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

          {/* Brass astrolabe drone — full circle-of-fifths interactive drone.
              Embedded mode: seeds from the card's droneRoot but the user can
              override by tapping any chord on the wheel. */}
          <div style={{ marginTop: 8 }}>
            <CompactDroneWheel
              theme={T}
              rootKey={currentCard.droneRoot}
            />
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
            {expandedTools.chordDetector && instrument === 'guitar' && (
              <div style={{
                marginTop: 10, background: T.bgCard,
                border: `1px solid ${T.border}`, borderRadius: 10, padding: 14,
                animation: 'forgeToolExpand 0.25s ease-out both',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 1.2,
                  textTransform: 'uppercase', marginBottom: 6,
                }}>
                  Chord Detector
                </div>
                <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10, fontStyle: 'italic' }}>
                  Strum any chord — the engine names it and confirms when you land on the card&apos;s key.
                </div>
                <ForgeChordListener
                  T={T}
                  keyRoot={currentCard.constraints.key}
                  progressionTargets={currentCard.constraints.chordProgression?.chordTargets || null}
                  progressionName={currentCard.constraints.chordProgression?.name || null}
                  cardId={currentCard.id}
                />
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

// MiniColorWheel was removed when its logic merged into CompactDroneWheel above.
