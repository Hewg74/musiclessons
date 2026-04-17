// Resolve scale-degree progressions (Roman numerals) to concrete chord names
// for a given key + scale. Output chord names use sharp-only spelling so they
// match the chord detector engine's chord.root convention.
//
// parseDegree('bVII')        → { position: 6, semitoneShift: -1, override: null }
// parseDegree('iim7')        → { position: 1, semitoneShift:  0, override: 'm7' }
// parseDegree('#IV')         → { position: 3, semitoneShift:  1, override: null }
// resolveDegree('bVII','A','natural-minor') → { name: 'G', root: 'G', roman: 'bVII' }
// resolveProgression(prog,'A','harmonic-minor') → [{name:'Am',...}, {name:'G',...}, ...]

import { SCALE_TYPES } from './ColorMusicTrainer.jsx';
import { SCALES_WITHOUT_PROGRESSIONS } from './data/chordProgressions.js';

// ─── Root-math (sharp-only to match engine chord.root) ───
const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const PC_INDEX = {
  C: 0, 'C#': 1, Db: 1, 'D♭': 1, D: 2, 'D#': 3, Eb: 3, 'E♭': 3,
  E: 4, F: 5, 'F#': 6, Gb: 6, 'G♭': 6, G: 7, 'G#': 8, Ab: 8, 'A♭': 8,
  A: 9, 'A#': 10, Bb: 10, 'B♭': 10, B: 11,
};

function pcAdd(root, semitones) {
  const idx = PC_INDEX[root];
  if (idx === undefined) return root;
  return CHROMATIC_SHARP[(idx + semitones + 144) % 12];
}

// ─── Scale-degree native qualities ───
// Position index 0..6 = I..VII. Each scale lists the native triad quality
// ('maj' | 'min' | 'dim' | 'aug') at each position. Used when a degree in a
// progression has no explicit quality suffix (e.g. "V" vs "V7").
//
// 6-note scales (blues) and symmetric scales (whole-tone) are not listed — no
// progressions are compatible with them. See SCALES_WITHOUT_PROGRESSIONS.
const SCALE_DEGREE_QUALITIES = {
  // 7-note diatonic modes
  'major':             ['maj','min','min','maj','maj','min','dim'],
  'natural-minor':     ['min','dim','maj','min','min','maj','maj'],
  'harmonic-minor':    ['min','dim','aug','min','maj','maj','dim'],
  'melodic-minor':     ['min','min','aug','maj','maj','dim','dim'],
  'dorian':            ['min','min','maj','maj','min','dim','maj'],
  'phrygian':          ['min','maj','maj','min','dim','maj','min'],
  'lydian':            ['maj','maj','min','dim','maj','min','min'],
  'mixolydian':        ['maj','min','dim','maj','min','min','maj'],
  'locrian':           ['dim','maj','min','min','maj','maj','min'],
  // Synthetic / exotic — approximations; progressions on these almost always
  // carry explicit quality overrides so the fallback is rarely consulted.
  'phrygian-dominant': ['maj','maj','dim','min','dim','maj','min'],
  'hungarian-minor':   ['min','maj','min','dim','maj','maj','dim'],
  'double-harmonic':   ['maj','maj','min','min','maj','maj','dim'],
};

// Progressions tagged as compatible with scales that don't have 7 scale
// degrees (notably `blues`) fall back to the major scale's root positioning.
// Blues progressions are always written with explicit 7 overrides (I7/IV7/V7)
// so only root math is needed — native quality is never consulted.
const FALLBACK_INTERVALS = {
  'blues': [0, 2, 4, 5, 7, 9, 11],  // treat blues as major-rooted for I/IV/V
};

// ─── Parsing ───
const ROMAN_POSITION = {
  I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6,
  i: 0, ii: 1, iii: 2, iv: 3, v: 4, vi: 5, vii: 6,
};

// Override strings that pin triad quality without appending to the chord
// name. Used when a progression must force a quality that differs from the
// scale-native lookup (e.g. flamenco V over phrygian-dominant).
const QUALITY_PINS = new Set(['maj', 'min', 'dim', 'aug']);

export function parseDegree(deg) {
  const m = String(deg).match(/^([b#]?)([IiVv]+)(.*)$/);
  if (!m) return null;
  const [, accidental, roman, rest] = m;
  if (!(roman in ROMAN_POSITION)) return null;
  const position = ROMAN_POSITION[roman];
  const semitoneShift = accidental === 'b' ? -1 : accidental === '#' ? 1 : 0;
  const override = rest ? rest.trim() : null;
  return { position, semitoneShift, override: override || null, roman };
}

// ─── Resolution ───
// Accidentals (b*, #*) reference the MAJOR scale's positions — "bVII" means
// the flat-7th relative to major (10 semitones), regardless of whether the
// current scale's native 7th happens to be at 10 or 11. Bare degrees (no
// accidental) use the current scale's own intervals.
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

function intervalsFor(scale) {
  const scaleDef = SCALE_TYPES[scale];
  if (scaleDef?.intervals && scaleDef.intervals.length >= 7) return scaleDef.intervals;
  if (FALLBACK_INTERVALS[scale]) return FALLBACK_INTERVALS[scale];
  return null;
}

function nativeQualityFor(scale, position) {
  const row = SCALE_DEGREE_QUALITIES[scale];
  if (!row) return 'maj'; // safe default — bare degrees on fallback scales are rare
  return row[position] || 'maj';
}

// Build the bare chord name for a root + quality.
//   'maj' → 'G'    'min' → 'Gm'    'dim' → 'Gdim'    'aug' → 'Gaug'
function bareNameFor(root, quality) {
  if (quality === 'min') return root + 'm';
  if (quality === 'dim') return root + 'dim';
  if (quality === 'aug') return root + 'aug';
  return root;
}

export function resolveDegree(deg, key, scale) {
  const parsed = parseDegree(deg);
  if (!parsed) return null;
  const { position, semitoneShift, override, roman } = parsed;

  let semitones;
  if (semitoneShift !== 0) {
    // Accidentals resolve against major-scale positions then shift.
    if (position >= MAJOR_INTERVALS.length) return null;
    semitones = MAJOR_INTERVALS[position] + semitoneShift;
  } else {
    // Bare degrees index the current scale's own intervals.
    const intervals = intervalsFor(scale);
    if (!intervals || position >= intervals.length) return null;
    semitones = intervals[position];
  }
  const root = pcAdd(key, semitones);
  if (override) {
    // Quality-pin overrides ('maj', 'min', 'dim', 'aug') let a progression
    // force a triad quality that the scale-native lookup would otherwise
    // compute differently — e.g. V in phrygian-dominant is natively dim, but
    // flamenco progressions play a V major chord (inherited from parent
    // harmonic minor). 'Vmaj' in the library resolves to bare 'E', not
    // 'Emaj' (which isn't a valid chord name).
    if (QUALITY_PINS.has(override)) {
      return { name: bareNameFor(root, override), root, roman: deg, quality: override };
    }
    // Everything else is appended verbatim as an engine-vocabulary quality
    // string: 'm7', 'maj7', '7', 'sus4', 'm7b5', '7b5', '6', 'add9', etc.
    return { name: root + override, root, roman: deg };
  }

  // Quality:
  //   accidentals (bVII, #IV) → case-based: uppercase = maj, lowercase = min
  //                              (chromatic alterations step outside the scale,
  //                               so native-quality lookup doesn't apply)
  //   bare degrees             → scale-native quality from SCALE_DEGREE_QUALITIES
  let quality;
  if (semitoneShift !== 0) {
    quality = roman === roman.toUpperCase() ? 'maj' : 'min';
  } else {
    quality = nativeQualityFor(scale, position);
  }
  return { name: bareNameFor(root, quality), root, roman: deg, quality };
}

export function resolveProgression(prog, key, scale) {
  if (!prog || !prog.degrees || !key || !scale) return [];
  if (SCALES_WITHOUT_PROGRESSIONS.has(scale)) return [];
  const out = [];
  for (const deg of prog.degrees) {
    const resolved = resolveDegree(deg, key, scale);
    if (!resolved) return []; // any unresolvable degree invalidates the whole progression
    out.push(resolved);
  }
  return out;
}

// Util: dedupe the chord names for a progression — useful for the chord
// listener checklist where the same chord across multiple bars only needs
// to be confirmed once.
export function uniqueChordNames(resolvedChords) {
  const seen = new Set();
  const out = [];
  for (const c of resolvedChords) {
    if (seen.has(c.name)) continue;
    seen.add(c.name);
    out.push(c.name);
  }
  return out;
}
