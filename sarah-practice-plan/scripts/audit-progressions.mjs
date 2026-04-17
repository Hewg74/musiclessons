// Audit every ex.chordProgression spec across the curriculum.
// For each spec: verify pool ids exist, verify scale compat, resolve each
// progression against (key, scale), and for guitar specs verify every
// resolved chord has a voicing in CHORD_VOICINGS_MULTI.

import { readFileSync } from 'node:fs';

// ─── Replicate the resolver math inline (Node can't import JSX) ───
const SCALE_TYPES = {
  'major':             { intervals: [0, 2, 4, 5, 7, 9, 11] },
  'natural-minor':     { intervals: [0, 2, 3, 5, 7, 8, 10] },
  'harmonic-minor':    { intervals: [0, 2, 3, 5, 7, 8, 11] },
  'melodic-minor':     { intervals: [0, 2, 3, 5, 7, 9, 11] },
  'dorian':            { intervals: [0, 2, 3, 5, 7, 9, 10] },
  'phrygian':          { intervals: [0, 1, 3, 5, 7, 8, 10] },
  'lydian':            { intervals: [0, 2, 4, 6, 7, 9, 11] },
  'mixolydian':        { intervals: [0, 2, 4, 5, 7, 9, 10] },
  'locrian':           { intervals: [0, 1, 3, 5, 6, 8, 10] },
  'phrygian-dominant': { intervals: [0, 1, 4, 5, 7, 8, 10] },
  'hungarian-minor':   { intervals: [0, 2, 3, 6, 7, 8, 11] },
  'double-harmonic':   { intervals: [0, 1, 4, 5, 7, 8, 11] },
  'blues':             { intervals: [0, 3, 5, 6, 7, 10] },
};
const SCALES_WITHOUT_PROGRESSIONS = new Set(['minor-pentatonic','major-pentatonic','hirajoshi','whole-tone','locrian']);
const SCALE_DEGREE_QUALITIES = {
  'major':             ['maj','min','min','maj','maj','min','dim'],
  'natural-minor':     ['min','dim','maj','min','min','maj','maj'],
  'harmonic-minor':    ['min','dim','aug','min','maj','maj','dim'],
  'melodic-minor':     ['min','min','aug','maj','maj','dim','dim'],
  'dorian':            ['min','min','maj','maj','min','dim','maj'],
  'phrygian':          ['min','maj','maj','min','dim','maj','min'],
  'lydian':            ['maj','maj','min','dim','maj','min','min'],
  'mixolydian':        ['maj','min','dim','maj','min','min','maj'],
  'locrian':           ['dim','maj','min','min','maj','maj','min'],
  'phrygian-dominant': ['maj','maj','dim','min','dim','maj','min'],
  'hungarian-minor':   ['min','maj','min','dim','maj','maj','dim'],
  'double-harmonic':   ['maj','maj','min','min','maj','maj','dim'],
};
const FALLBACK_INTERVALS = { 'blues': [0, 2, 4, 5, 7, 9, 11] };
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const PC_INDEX = { C:0,'C#':1,Db:1,'D♭':1,D:2,'D#':3,Eb:3,'E♭':3,E:4,F:5,'F#':6,Gb:6,'G♭':6,G:7,'G#':8,Ab:8,'A♭':8,A:9,'A#':10,Bb:10,'B♭':10,B:11 };
const ROMAN_POSITION = { I:0,II:1,III:2,IV:3,V:4,VI:5,VII:6,i:0,ii:1,iii:2,iv:3,v:4,vi:5,vii:6 };
const QUALITY_PINS = new Set(['maj','min','dim','aug']);

function pcAdd(root, st) {
  const i = PC_INDEX[root];
  if (i === undefined) return root;
  return CHROMATIC_SHARP[(i + st + 144) % 12];
}
function bareNameFor(root, q) {
  if (q === 'min') return root + 'm';
  if (q === 'dim') return root + 'dim';
  if (q === 'aug') return root + 'aug';
  return root;
}
function parseDegree(deg) {
  const m = String(deg).match(/^([b#]?)([IiVv]+)(.*)$/);
  if (!m) return null;
  const [, acc, rom, rest] = m;
  if (!(rom in ROMAN_POSITION)) return null;
  return { position: ROMAN_POSITION[rom], semitoneShift: acc==='b'?-1:acc==='#'?1:0, override: rest?rest.trim()||null:null, roman: rom };
}
function intervalsFor(s) {
  const def = SCALE_TYPES[s];
  if (def?.intervals && def.intervals.length >= 7) return def.intervals;
  return FALLBACK_INTERVALS[s] || null;
}
function resolveDegree(deg, key, scale) {
  const p = parseDegree(deg);
  if (!p) return null;
  let st;
  if (p.semitoneShift !== 0) {
    if (p.position >= MAJOR_INTERVALS.length) return null;
    st = MAJOR_INTERVALS[p.position] + p.semitoneShift;
  } else {
    const iv = intervalsFor(scale);
    if (!iv || p.position >= iv.length) return null;
    st = iv[p.position];
  }
  const root = pcAdd(key, st);
  if (p.override) {
    if (QUALITY_PINS.has(p.override)) return { name: bareNameFor(root, p.override), root, roman: deg };
    return { name: root + p.override, root, roman: deg };
  }
  const q = p.semitoneShift !== 0
    ? (p.roman === p.roman.toUpperCase() ? 'maj' : 'min')
    : (SCALE_DEGREE_QUALITIES[scale]?.[p.position] || 'maj');
  return { name: bareNameFor(root, q), root, roman: deg, quality: q };
}
function resolveProgression(prog, key, scale) {
  if (!prog?.degrees || !key || !scale) return [];
  if (SCALES_WITHOUT_PROGRESSIONS.has(scale)) return [];
  const out = [];
  for (const d of prog.degrees) {
    const r = resolveDegree(d, key, scale);
    if (!r) return [];
    out.push(r);
  }
  return out;
}

// ─── Parse the progressions library ───
const progSrc = readFileSync('src/data/chordProgressions.js', 'utf8');
// Extract each { id:..., ..., degrees:[...], scales:[...], ...} entry.
const entryRe = /\{\s*id:\s*'([^']+)'[\s\S]*?degrees:\s*\[([^\]]+)\]\s*,\s*scales:\s*\[([^\]]+)\]/g;
const PROGS = {};
let m;
while ((m = entryRe.exec(progSrc)) !== null) {
  const id = m[1];
  const degrees = m[2].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
  const scales = m[3].split(',').map(s => s.trim().replace(/^'|'$/g, '')).filter(Boolean);
  PROGS[id] = { id, degrees, scales };
}

// ─── Parse CHORD_VOICINGS_MULTI keys ───
const toolsSrc = readFileSync('src/JungleTools.jsx', 'utf8');
const voicingKeys = new Set();
const vkRe = /^\s*"([^"]+)":\s*\[/gm;
let vm;
while ((vm = vkRe.exec(toolsSrc)) !== null) voicingKeys.add(vm[1]);

const ENHARMONIC_FLAT = { 'A#': 'Bb', 'D#': 'Eb', 'G#': 'Ab' };
function hasVoicing(name) {
  if (voicingKeys.has(name)) return true;
  const root = name.match(/^[A-G][#b]?/)?.[0];
  if (!root) return false;
  const flat = ENHARMONIC_FLAT[root];
  if (flat && voicingKeys.has(flat + name.slice(root.length))) return true;
  return false;
}

// ─── Extract every ex.chordProgression spec from curriculum files ───
const files = [
  'src/data/guitarStudy/level-07-chord-tone-soloing.js',
  'src/data/guitarStudy/level-11-extended-harmony.js',
  'src/data/guitarStudy/level-13-fingerpicking.js',
  'src/data/singerSongwriter/level-06-voice-combines.js',
  'src/data/singerSongwriter/level-07-voice-flows.js',
  'src/data/singerSongwriter/level-08-melody-building.js',
  'src/data/singerSongwriter/level-10-hearing-harmony.js',
  'src/data/singerSongwriter/level-11-originals-genre-craft.js',
];

function extractSpecs(path) {
  const src = readFileSync(path, 'utf8');
  const out = [];
  // Find id: "..." near each chordProgression: {
  const re = /chordProgression:\s*\{([^}]+)\}/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const body = match[1];
    const keyM = body.match(/key:\s*["']([^"']+)["']/);
    const scaleM = body.match(/scale:\s*["']([^"']+)["']/);
    const poolM = body.match(/pool:\s*\[([^\]]+)\]/);
    const instrumentM = body.match(/instrument:\s*["']([^"']+)["']/);
    if (!keyM || !scaleM || !poolM) continue;
    const pool = poolM[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    // Find the exercise id — look backwards for 'id: "..."'
    const before = src.slice(0, match.index);
    const idMatch = [...before.matchAll(/id:\s*["']([^"']+)["']/g)].pop();
    out.push({
      file: path,
      exerciseId: idMatch?.[1] || '?',
      key: keyM[1],
      scale: scaleM[1],
      pool,
      instrument: instrumentM?.[1] || null,
    });
  }
  return out;
}

const allSpecs = files.flatMap(extractSpecs);
console.log(`\n${allSpecs.length} chordProgression specs across ${files.length} files\n`);

// ─── Audit ───
let errors = 0;
let warnings = 0;
for (const spec of allSpecs) {
  const lbl = `${spec.exerciseId} (${spec.file.split('/').pop()})`;
  console.log(`\n▸ ${lbl}`);
  console.log(`    key=${spec.key}  scale=${spec.scale}  instrument=${spec.instrument || 'voice'}`);
  let anyCompatible = 0;
  for (const pid of spec.pool) {
    const p = PROGS[pid];
    if (!p) {
      console.log(`    ✗ MISSING progression id: "${pid}"`);
      errors++;
      continue;
    }
    const compat = p.scales.includes(spec.scale);
    if (!compat) {
      console.log(`    ⚠ "${pid}" not tagged compatible with ${spec.scale} (its scales: ${p.scales.join(',')})`);
      warnings++;
      continue;
    }
    const resolved = resolveProgression(p, spec.key, spec.scale);
    if (resolved.length === 0) {
      console.log(`    ✗ "${pid}" resolved empty for ${spec.key} ${spec.scale}`);
      errors++;
      continue;
    }
    anyCompatible++;
    const names = resolved.map(c => c.name).join('-');
    const missing = resolved.filter(c => !hasVoicing(c.name)).map(c => c.name);
    if (spec.instrument === 'guitar' && missing.length) {
      console.log(`    ⚠ "${pid}" → ${names}  (no voicing: ${missing.join(',')})`);
      warnings++;
    } else {
      console.log(`    ✓ "${pid}" → ${names}`);
    }
  }
  if (anyCompatible === 0) {
    console.log(`    !!! NO COMPATIBLE PROGRESSIONS IN POOL — widget will show fallback message`);
    errors++;
  }
}

console.log(`\n\n═══════════════════════════════════════════`);
console.log(`SUMMARY: ${allSpecs.length} specs, ${errors} errors, ${warnings} warnings`);
console.log(`═══════════════════════════════════════════`);
process.exit(errors ? 1 : 0);
