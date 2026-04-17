import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import { Play, Pause, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { getColorForNote, normalizeNote } from './JungleTools.jsx';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from './audioKeepalive.js';

// ─── Web Worker timer — background-tab-safe interval ────────────────────────
// Browsers throttle setInterval to ~1Hz in hidden tabs and on locked phones,
// which destroys sequence-mode timing for long practice rounds. Worker timers
// are NOT throttled, so a cycle progression stays in lockstep even when the
// screen is off. Duplicated from JungleTools to keep this file self-contained.
function createTimerWorker() {
  const blob = new Blob([`
    let tid = null;
    self.onmessage = (e) => {
      if (e.data.cmd === 'start')  { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
      else if (e.data.cmd === 'stop')   { clearInterval(tid); tid = null; }
      else if (e.data.cmd === 'update') { clearInterval(tid); tid = setInterval(() => self.postMessage('tick'), e.data.ms); }
    };
  `], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker._blobUrl = url;
  return worker;
}
function terminateWorker(worker) {
  if (!worker) return;
  try { URL.revokeObjectURL(worker._blobUrl); } catch {}
  try { worker.terminate(); } catch {}
}

// ═══════════════════════════════════════════════════════════════════════════
// CompactDroneWheel — brass astrolabe circle-of-fifths drone
// ═══════════════════════════════════════════════════════════════════════════
//
// A single component used in two modes:
//   1. EMBEDDED (default): lives inside a Practice Forge card, takes a
//      rootKey hint. Lightweight chord picker.
//   2. STANDALONE (standalone={true}): replaces the old DroneGenerator in the
//      Tools tab. Full feature set — sequence mode, presets, 14 textures.
//
// Feature set (brought forward from the big DroneGenerator):
//   • 14 texture presets with effect chains (warm, analog, choir, organ,
//     pure, strings, tanpura, crystal, lofi-tape, surf-tremolo, vintage-keys,
//     dub-sub, ocean, breath)
//   • Manual mode — hold a chord
//   • Sequence mode — cycle through a chord progression on a timer
//   • 8 preset progressions (Surf Garage, Psych Vamp, Reggae Drop,
//     Coastal Soul, Desert Blues, Thai Funk, Reggae Rock, Cinematic Sky)
//   • BPM + step-duration controls
//   • Extensions (none/7/maj7/sus2/sus4/dim/aug) in manual mode
//   • Octave, volume
//   • Click wheel labels to override chord (manual mode)
//
// GEOMETRY — designed from first principles so alignment is mathematically
// guaranteed. 12 positions at 30° intervals, position 0 at 12 o'clock.
// For W=420: play hub r=0..60, minor labels r=100, dots r=140, major labels
// r=180. Every element centers on its spoke via translate(-50%, -50%).
//
// COLORS — spoke-based from COLOR_MUSIC via getColorForNote(). Am and C both
// pull #E83A30 red because they share the 12 o'clock spoke.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Circle of fifths positions (clockwise from 12 o'clock) ───
// noteLetter   — major chord's root (drives the spoke color via getColorForNote)
// minorLetter  — minor chord's actual root (the note that should sound when you
//                click the minor label, not the spoke's major letter)
const WHEEL_POSITIONS = [
  { major: 'C',  minor: 'Am',  noteLetter: 'C',  minorLetter: 'A'  },
  { major: 'G',  minor: 'Em',  noteLetter: 'G',  minorLetter: 'E'  },
  { major: 'D',  minor: 'Bm',  noteLetter: 'D',  minorLetter: 'B'  },
  { major: 'A',  minor: 'F♯m', noteLetter: 'A',  minorLetter: 'F#' },
  { major: 'E',  minor: 'C♯m', noteLetter: 'E',  minorLetter: 'C#' },
  { major: 'B',  minor: 'G♯m', noteLetter: 'B',  minorLetter: 'G#' },
  { major: 'F♯', minor: 'D♯m', noteLetter: 'F#', minorLetter: 'D#' },
  { major: 'D♭', minor: 'B♭m', noteLetter: 'C#', minorLetter: 'A#' },
  { major: 'A♭', minor: 'Fm',  noteLetter: 'A♭', minorLetter: 'F'  },
  { major: 'E♭', minor: 'Cm',  noteLetter: 'E♭', minorLetter: 'C'  },
  { major: 'B♭', minor: 'Gm',  noteLetter: 'B♭', minorLetter: 'G'  },
  { major: 'F',  minor: 'Dm',  noteLetter: 'F',  minorLetter: 'D'  },
];

// ─── Chord extensions ───
const EXTENSIONS = [
  { id: 'none', label: 'None', suffix: '' },
  { id: '7',    label: '7',    suffix: '7' },
  { id: 'maj7', label: 'maj7', suffix: 'maj7' },
  { id: 'sus2', label: 'sus2', suffix: 'sus2' },
  { id: 'sus4', label: 'sus4', suffix: 'sus4' },
  { id: 'dim',  label: 'dim',  suffix: 'dim' },
  { id: 'aug',  label: 'aug',  suffix: 'aug' },
];
const MINOR_INCOMPATIBLE = new Set(['maj7', 'aug']);

// ─── Texture presets ───
// Each texture is a full effect chain ported from the old DroneGenerator.
// Descriptions are short enough to fit in a chip label.
const TEXTURES = [
  { id: 'warm',         label: 'Warm',      desc: 'triangle pad + chorus' },
  { id: 'analog',       label: 'Analog',    desc: 'sawtooth synth + LFO' },
  { id: 'choir',        label: 'Choir',     desc: 'detuned sines, breathy' },
  { id: 'organ',        label: 'Organ',     desc: 'harmonium drawbars' },
  { id: 'pure',         label: 'Pure',      desc: 'clean sine tone' },
  { id: 'strings',      label: 'Strings',   desc: 'fat sawtooth ensemble' },
  { id: 'tanpura',      label: 'Tanpura',   desc: 'FM beating + phaser' },
  { id: 'crystal',      label: 'Crystal',   desc: 'FM shimmer + reverb' },
  { id: 'lofi-tape',    label: 'Lo-Fi Tape',desc: 'warm triangle wobble' },
  { id: 'surf-tremolo', label: 'Surf',      desc: 'triangle tremolo' },
  { id: 'vintage-keys', label: 'Vintage',   desc: 'FM electric piano' },
  { id: 'dub-sub',      label: 'Dub Sub',   desc: 'FM sub bass' },
  { id: 'ocean',        label: 'Ocean',     desc: 'ambient wash' },
  { id: 'breath',       label: 'Breath',    desc: 'meditation sine' },
];

// ─── Preset progressions ───
const PROGRESSION_PRESETS = [
  { id: 'surf-garage',    label: 'Surf Garage',    chords: ['Am', 'G', 'F', 'E'],               bpm: 120, stepDuration: '1m' },
  { id: 'psych-vamp',     label: 'Psych Vamp',     chords: ['Em', 'A', 'Em', 'A'],              bpm: 90,  stepDuration: '2m' },
  { id: 'reggae-drop',    label: 'Reggae Drop',    chords: ['Am', 'Am', 'G', 'G'],              bpm: 85,  stepDuration: '1m' },
  { id: 'coastal-soul',   label: 'Coastal Soul',   chords: ['Cmaj7', 'Bm7', 'Am7', 'Gmaj7'],    bpm: 75,  stepDuration: '2m' },
  { id: 'desert-blues',   label: 'Desert Blues',   chords: ['Dm', 'C', 'Am', 'Dm'],             bpm: 75,  stepDuration: '2m' },
  { id: 'thai-funk',      label: 'Thai Funk',      chords: ['Em7', 'Bm7', 'Am7', 'Bm7'],        bpm: 80,  stepDuration: '1m' },
  { id: 'reggae-rock',    label: 'Reggae Rock',    chords: ['A', 'Bm', 'C#m', 'Bm'],            bpm: 85,  stepDuration: '1m' },
  { id: 'cinematic-sky',  label: 'Cinematic Sky',  chords: ['Fmaj7', 'G', 'Em', 'Am'],          bpm: 80,  stepDuration: '2m' },
];

const STEP_DURATIONS = [
  { id: '1m', label: '1 bar',  beats: 4  },
  { id: '2m', label: '2 bars', beats: 8  },
  { id: '4m', label: '4 bars', beats: 16 },
];

// ─── Chromatic utilities ───
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
function noteToIndex(letter) {
  if (!letter) return -1;
  const n = String(letter)
    .replace('♭', 'b')
    .replace(/^Db$/i, 'C#')
    .replace(/^Eb$/i, 'D#')
    .replace(/^Gb$/i, 'F#')
    .replace(/^Ab$/i, 'G#')
    .replace(/^Bb$/i, 'A#');
  return CHROMATIC.indexOf(n);
}

// ─── Chord voicing parser (root+quality+extension+octave) ───
// `type` can be 'chord' (default, full triad voicing) or 'single' (root note
// only, spread across three octaves — a pure pedal tone with no third or fifth).
function parseChordVoicing(rootLetter, quality, extensionId, octave, type = 'chord') {
  const rootIdx = noteToIndex(rootLetter);
  if (rootIdx === -1) return { notes: [], spelling: [] };

  const tone = (interval, octOffset) => {
    const raw = rootIdx + interval;
    const wrap = Math.floor(raw / 12);
    const name = CHROMATIC[((raw % 12) + 12) % 12];
    return `${name}${octave + octOffset + wrap}`;
  };
  const pitchClass = (interval) => CHROMATIC[((rootIdx + interval) % 12 + 12) % 12];

  // Single mode — just the root across 3 octaves (tanpura-style pure pedal)
  if (type === 'single') {
    return {
      notes: [...new Set([tone(0, -1), tone(0, 0), tone(0, 1)])],
      spelling: [pitchClass(0)],
    };
  }

  let third = quality === 'minor' ? 3 : 4;
  let fifth = 7;
  let seventh = null;

  if (extensionId === 'sus2') third = 2;
  if (extensionId === 'sus4') third = 5;
  if (extensionId === 'dim')  { third = 3; fifth = 6; }
  if (extensionId === 'aug')  { third = 4; fifth = 8; }
  if (extensionId === '7')    seventh = 10;
  if (extensionId === 'maj7') seventh = 11;

  const notes = [
    tone(0, -1),
    tone(0, 0),
    tone(fifth, 0),
    tone(0, 1),
    tone(third, 1),
  ];
  if (seventh !== null) notes.push(tone(seventh, 1));

  const spellingIntervals = [0, third, fifth];
  if (seventh !== null) spellingIntervals.push(seventh);
  const spelling = spellingIntervals.map(iv => pitchClass(iv));

  return { notes: [...new Set(notes)], spelling };
}

// ─── Build a chord string from its parts ───
// The inverse of parseChordString. Takes (rootLetter, isMinor, extensionId)
// and produces e.g. "Am", "Cmaj7", "F#sus4". Used by the progression editor
// when writing back to sequenceChords.
function buildChordString(rootLetter, isMinor, extensionId) {
  const suffix = EXTENSIONS.find(e => e.id === extensionId)?.suffix || '';
  return `${rootLetter}${isMinor ? 'm' : ''}${suffix}`;
}

// ─── Transpose a chord string by N semitones ───
// Preserves quality + extension, only shifts the root. Used by the sequence
// transpose ± buttons so users can move a whole progression into their key.
function transposeChordString(chordStr, steps) {
  const parsed = parseChordString(chordStr);
  const idx = noteToIndex(parsed.rootLetter);
  if (idx === -1) return chordStr;
  const newIdx = ((idx + steps) % 12 + 12) % 12;
  const newRoot = CHROMATIC[newIdx];
  return buildChordString(newRoot, parsed.quality === 'minor', parsed.extensionId);
}

// ─── Chord STRING parser (for sequence mode presets) ───
// Parses "Am", "Cmaj7", "F#m7", "Dsus4" etc. into { rootLetter, quality,
// extensionId } so we can reuse parseChordVoicing.
function parseChordString(chordStr) {
  const s = String(chordStr || '').trim();
  const match = s.match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return { rootLetter: 'C', quality: 'major', extensionId: 'none' };
  let rootLetter = match[1].replace('b', '♭').replace(/^([A-G])♭$/i, (_, p) => {
    // Convert unicode flat back to a letter the rest of the pipeline normalizes
    return `${p}♭`;
  });
  // Normalize case
  rootLetter = rootLetter[0].toUpperCase() + rootLetter.slice(1);
  const q = match[2].toLowerCase();

  let quality = 'major';
  if (/^m(?!aj)/.test(q) || q.includes('min')) quality = 'minor';

  let extensionId = 'none';
  if (q.includes('dim')) extensionId = 'dim';
  else if (q.includes('aug')) extensionId = 'aug';
  else if (q.includes('sus2')) extensionId = 'sus2';
  else if (q.includes('sus4')) extensionId = 'sus4';
  else if (q.includes('maj7')) extensionId = 'maj7';
  else if (q.includes('7')) extensionId = '7';

  return { rootLetter, quality, extensionId };
}

// ═══════════════════════════════════════════════════════════════════════════
// Texture chain builder — ports all 14 effect configs from DroneGenerator
// ═══════════════════════════════════════════════════════════════════════════
// Returns { synth, userGain, allNodes }
//   synth     — the PolySynth to call triggerAttack/releaseAll on
//   userGain  — the Tone.Gain to ramp for live volume control
//   allNodes  — array of every Tone node created, for disposal on teardown
function buildTextureChain(textureId, volumeDb) {
  const newNodes = [];

  // Master bus — gain staging balanced for loudness without clipping.
  const masterGain = new Tone.Gain(0.65);
  const userGain = new Tone.Gain(Tone.dbToGain(volumeDb));
  const lowcut = new Tone.Filter(40, 'highpass');
  const limiter = new Tone.Limiter(-3).toDestination();
  masterGain.chain(userGain, lowcut, limiter);
  newNodes.push(masterGain, userGain, lowcut, limiter);

  // Shared reverb bus — one Freeverb for all textures.
  const reverbReturn = new Tone.Gain(0.5).connect(masterGain);
  const reverb = new Tone.Freeverb({ roomSize: 0.6, dampening: 2500 }).connect(reverbReturn);
  const reverbSend = new Tone.Gain(0);
  reverbSend.connect(reverb);
  newNodes.push(reverbReturn, reverb, reverbSend);

  const connectWithReverb = (source, sendLevel, roomSz, damp) => {
    source.connect(masterGain);
    source.connect(reverbSend);
    reverbSend.gain.value = sendLevel;
    reverb.roomSize.value = roomSz;
    reverb.dampening = damp;
  };

  let synth;

  if (textureId === 'analog') {
    const chorus = new Tone.Chorus({ frequency: 0.5, delayTime: 3, depth: 0.4 }).start();
    const filter = new Tone.Filter(600, 'lowpass').connect(chorus);
    connectWithReverb(chorus, 0.3, 0.5, 3000);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -14,
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 2.5, decay: 0.1, sustain: 1, release: 2 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    const lfo = new Tone.LFO(0.05, 350, 650).connect(filter.frequency).start();
    newNodes.push(chorus, filter, lfo);
  }
  else if (textureId === 'choir') {
    const filter = new Tone.Filter(1800, 'lowpass');
    connectWithReverb(filter, 0.55, 0.85, 1500);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -17,
      oscillator: { type: 'fatsine', spread: 30, count: 3 },
      envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2.5 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(filter);
  }
  else if (textureId === 'organ') {
    const chorus = new Tone.Chorus({ frequency: 1, delayTime: 3, depth: 0.4 }).start();
    const filter = new Tone.Filter(2500, 'lowpass').connect(chorus);
    connectWithReverb(chorus, 0.4, 0.5, 3500);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -16,
      oscillator: { type: 'custom', partials: [1, 0.8, 0, 0.4, 0, 0.2, 0, 0.1] },
      envelope: { attack: 1.5, decay: 0.1, sustain: 1, release: 1.5 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(chorus, filter);
  }
  else if (textureId === 'pure') {
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -12,
      oscillator: { type: 'sine' },
      envelope: { attack: 1, decay: 0, sustain: 1, release: 2 },
    }).connect(masterGain);
    synth.maxPolyphony = 10;
  }
  else if (textureId === 'strings') {
    const filter = new Tone.Filter(500, 'lowpass');
    connectWithReverb(filter, 0.5, 0.7, 2500);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -17,
      oscillator: { type: 'fatsawtooth', spread: 25, count: 3 },
      envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2.5 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    const lfo = new Tone.LFO(0.04, 350, 600).connect(filter.frequency).start();
    newNodes.push(filter, lfo);
  }
  else if (textureId === 'tanpura') {
    const phaser = new Tone.Phaser({ frequency: 0.08, octaves: 2, baseFrequency: 200 });
    const filter = new Tone.Filter(1500, 'lowpass').connect(phaser);
    connectWithReverb(phaser, 0.35, 0.5, 3000);
    synth = new Tone.PolySynth(Tone.FMSynth, {
      volume: -14,
      harmonicity: 1.003, modulationIndex: 0.8,
      oscillator: { type: 'sine' },
      modulation: { type: 'sine' },
      envelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 },
      modulationEnvelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(phaser, filter);
  }
  else if (textureId === 'crystal') {
    synth = new Tone.PolySynth(Tone.FMSynth, {
      volume: -14,
      harmonicity: 1.005, modulationIndex: 1.5,
      oscillator: { type: 'sine' },
      modulation: { type: 'sine' },
      envelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 },
      modulationEnvelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 },
    });
    connectWithReverb(synth, 0.7, 0.95, 1000);
    synth.maxPolyphony = 10;
  }
  else if (textureId === 'lofi-tape') {
    const vibrato = new Tone.Vibrato({ frequency: 0.5, depth: 0.06 });
    const filter = new Tone.Filter(900, 'lowpass').connect(vibrato);
    connectWithReverb(vibrato, 0.25, 0.4, 2000);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -15,
      oscillator: { type: 'fattriangle', spread: 15, count: 2 },
      envelope: { attack: 1.5, decay: 0.3, sustain: 0.85, release: 2 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(vibrato, filter);
  }
  else if (textureId === 'surf-tremolo') {
    const tremolo = new Tone.Tremolo(3, 0.3).start();
    const filter = new Tone.Filter(1200, 'lowpass').connect(tremolo);
    connectWithReverb(tremolo, 0.5, 0.8, 4000);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -12,
      oscillator: { type: 'triangle' },
      envelope: { attack: 1.5, decay: 0.1, sustain: 1, release: 2 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(tremolo, filter);
  }
  else if (textureId === 'vintage-keys') {
    const chorus = new Tone.Chorus({ frequency: 0.6, delayTime: 4, depth: 0.5 }).start();
    const filter = new Tone.Filter(1200, 'lowpass').connect(chorus);
    connectWithReverb(chorus, 0.35, 0.5, 3000);
    synth = new Tone.PolySynth(Tone.FMSynth, {
      volume: -14,
      harmonicity: 3, modulationIndex: 0.6,
      oscillator: { type: 'sine' },
      modulation: { type: 'sine' },
      envelope: { attack: 1, decay: 0.4, sustain: 0.7, release: 2 },
      modulationEnvelope: { attack: 1, decay: 0.8, sustain: 0.3, release: 2 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(chorus, filter);
  }
  else if (textureId === 'dub-sub') {
    const filter = new Tone.Filter(300, 'lowpass', -12);
    connectWithReverb(filter, 0.15, 0.3, 2000);
    synth = new Tone.PolySynth(Tone.FMSynth, {
      volume: -14,
      harmonicity: 1, modulationIndex: 1.2,
      oscillator: { type: 'sine' },
      modulation: { type: 'triangle' },
      envelope: { attack: 0.8, decay: 0.2, sustain: 1, release: 1 },
      modulationEnvelope: { attack: 0.8, decay: 0.2, sustain: 1, release: 1 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(filter);
  }
  else if (textureId === 'ocean') {
    const filter = new Tone.Filter(500, 'lowpass');
    connectWithReverb(filter, 0.7, 0.95, 800);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -17,
      oscillator: { type: 'fattriangle', spread: 40, count: 3 },
      envelope: { attack: 4, decay: 0.1, sustain: 1, release: 3 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    const lfo = new Tone.LFO(0.03, 300, 600).connect(filter.frequency).start();
    newNodes.push(filter, lfo);
  }
  else if (textureId === 'breath') {
    const filter = new Tone.Filter(400, 'lowpass');
    connectWithReverb(filter, 0.65, 0.9, 1000);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -14,
      oscillator: { type: 'sine' },
      envelope: { attack: 5, decay: 0.1, sustain: 1, release: 4 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    newNodes.push(filter);
  }
  else {
    // Default "warm" — triangle pad with chorus + slow LFO
    const chorus = new Tone.Chorus({ frequency: 0.8, delayTime: 4, depth: 0.6 }).start();
    const filter = new Tone.Filter(700, 'lowpass').connect(chorus);
    connectWithReverb(chorus, 0.4, 0.6, 2500);
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -12,
      oscillator: { type: 'triangle' },
      envelope: { attack: 2.5, decay: 0.3, sustain: 0.9, release: 2.5 },
    }).connect(filter);
    synth.maxPolyphony = 10;
    const lfo = new Tone.LFO(0.06, 400, 800).connect(filter.frequency).start();
    newNodes.push(chorus, filter, lfo);
  }

  return { synth, userGain, allNodes: [synth, ...newNodes] };
}

// ─── Step duration → milliseconds at a given BPM ───
function stepMsFromDuration(stepDuration, bpm) {
  const beatMs = 60000 / (bpm || 80);
  if (stepDuration === '1m') return beatMs * 4;
  if (stepDuration === '2m') return beatMs * 8;
  if (stepDuration === '4m') return beatMs * 16;
  return beatMs * 4;
}

// ─── Prefs persistence ───
const PREFS_KEY = 'compactdronewheel-prefs';
function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function savePrefs(p) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch {}
}

// ─── Hooks ───
function useIsMobile(bp = 640) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setM(e.matches);
    mq.addEventListener('change', h);
    setM(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return m;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const h = (e) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

// ═══════════════════════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════════════════════
export function CompactDroneWheel({
  theme: T,
  standalone = false,
  rootKey: rootKeyHint,
  // ─── Embedded exercise props ───
  // When this wheel is dropped into a skill-tab ExerciseCard, the exercise JSON
  // can seed any of these to pre-configure the drone for that specific practice
  // round. onActiveNotesChange lets the parent card light up its PianoKeysDiagram
  // with whatever voicing the drone is currently holding. Mode tabs (manual /
  // single / sequence) become available when the exercise specifies a non-manual
  // defaultMode, a defaultPreset, or an explicit defaultProgression — simple
  // "hold an A drone" exercises stay locked to manual for a cleaner surface.
  onActiveNotesChange,
  defaultRoot,
  defaultOctave,
  defaultTexture,
  defaultMode,
  defaultPreset,
  defaultProgression,
  defaultBpm,
  defaultStepDuration,
  // Legacy prop from the old DroneGenerator API — accepted for parity but
  // has no visual effect; the embedded layout here is the default.
  inline = false, // eslint-disable-line no-unused-vars
}) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  // ─── Geometry ───
  const W = isMobile ? 320 : 420;
  const C = W / 2;
  const R_MINOR = isMobile ?  78 : 100;
  const R_DOT   = isMobile ? 108 : 140;
  const R_MAJOR = isMobile ? 140 : 180;
  const PLAY_SIZE = isMobile ? 92 : 120;

  // ─── Initial state ───
  const prefs = useMemo(() => loadPrefs(), []);

  const seedFromHint = (hint) => {
    const s = String(hint || 'A').trim();
    const minorMatch = /^([A-G][#b♭]?)(?:m(?!aj)|min)/i.exec(s);
    if (minorMatch) return { root: minorMatch[1], isMinor: true };
    const majorMatch = /^([A-G][#b♭]?)/i.exec(s);
    return { root: majorMatch ? majorMatch[1] : 'A', isMinor: false };
  };

  // Normalize legacy mode name — lesson data predates this component and uses
  // "cycle", the old DroneGenerator's name for sequence mode.
  const normalizeMode = (m) => (m === 'cycle' ? 'sequence' : m);

  const initial = useMemo(() => {
    if (standalone) {
      if (prefs.rootLetter) return { root: prefs.rootLetter, isMinor: prefs.isMinor ?? false };
      return { root: 'A', isMinor: false };
    }
    // Embedded: defaultRoot from the exercise wins over the live card hint.
    // This lets lessons like "hold an A drone" pin the voicing explicitly.
    return seedFromHint(defaultRoot || rootKeyHint);
  }, [standalone, defaultRoot, rootKeyHint, prefs]);

  // Chord (manual mode)
  const [rootLetter, setRootLetter]     = useState(initial.root);
  const [isMinor, setIsMinor]           = useState(initial.isMinor);
  const [extensionId, setExtensionId]   = useState(() =>
    EXTENSIONS.find(e => e.id === prefs.extensionId) ? prefs.extensionId : 'none'
  );

  // Playback — widened ranges match legacy DroneGenerator (octave 1-5, volume -40 to +6)
  // so exercises that pass the old defaults land in range.
  const [octave, setOctave]             = useState(() => {
    // Embedded exercise default wins
    if (!standalone && typeof defaultOctave === 'number' && defaultOctave >= 1 && defaultOctave <= 5) {
      return defaultOctave;
    }
    return typeof prefs.octave === 'number' && prefs.octave >= 1 && prefs.octave <= 5 ? prefs.octave : 3;
  });
  const [volume, setVolume]             = useState(() =>
    typeof prefs.volume === 'number' && prefs.volume >= -40 && prefs.volume <= 6 ? prefs.volume : -12
  );
  const [textureId, setTextureId]       = useState(() => {
    if (!standalone && TEXTURES.find(t => t.id === defaultTexture)) return defaultTexture;
    return TEXTURES.find(t => t.id === prefs.textureId) ? prefs.textureId : 'warm';
  });
  const [playing, setPlaying]           = useState(false);

  // Mode + sequence. Embedded exercises can seed a specific mode (manual/single/
  // sequence — or the legacy alias "cycle"). Defaults to manual when nothing
  // specified so simple drone exercises stay clean.
  const [mode, setMode]                           = useState(() => {
    if (!standalone) {
      const seeded = normalizeMode(defaultMode);
      if (['manual', 'single', 'sequence'].includes(seeded)) return seeded;
      return 'manual';
    }
    if (['manual', 'single', 'sequence'].includes(prefs.mode)) return prefs.mode;
    return 'manual';
  });
  const [activePreset, setActivePreset]           = useState(() => {
    if (!standalone && defaultPreset && PROGRESSION_PRESETS.find(p => p.id === defaultPreset)) {
      return defaultPreset;
    }
    return prefs.activePreset || null;
  });
  const [sequenceChords, setSequenceChords]       = useState(() => {
    if (!standalone) {
      if (Array.isArray(defaultProgression) && defaultProgression.length > 0) {
        return [...defaultProgression];
      }
      if (defaultPreset) {
        const p = PROGRESSION_PRESETS.find(pp => pp.id === defaultPreset);
        if (p) return [...p.chords];
      }
    }
    const p = PROGRESSION_PRESETS.find(pp => pp.id === prefs.activePreset);
    return p ? [...p.chords] : ['Am', 'G', 'F', 'E'];
  });
  const [sequenceBpm, setSequenceBpm]             = useState(() => {
    if (!standalone && typeof defaultBpm === 'number' && defaultBpm >= 40 && defaultBpm <= 240) {
      return defaultBpm;
    }
    // If an exercise provided a defaultPreset, inherit its bpm
    if (!standalone && defaultPreset) {
      const p = PROGRESSION_PRESETS.find(pp => pp.id === defaultPreset);
      if (p) return p.bpm;
    }
    return typeof prefs.sequenceBpm === 'number' && prefs.sequenceBpm >= 40 && prefs.sequenceBpm <= 240
      ? prefs.sequenceBpm : 85;
  });
  const [sequenceStepDuration, setSequenceStepDuration] = useState(() => {
    if (!standalone && STEP_DURATIONS.find(s => s.id === defaultStepDuration)) {
      return defaultStepDuration;
    }
    if (!standalone && defaultPreset) {
      const p = PROGRESSION_PRESETS.find(pp => pp.id === defaultPreset);
      if (p && STEP_DURATIONS.find(s => s.id === p.stepDuration)) return p.stepDuration;
    }
    return STEP_DURATIONS.find(s => s.id === prefs.sequenceStepDuration) ? prefs.sequenceStepDuration : '1m';
  });
  const [sequenceStep, setSequenceStep]           = useState(0);

  // Options drawer — hides texture + presets + bpm + step duration behind a toggle
  // so the main surface stays clean. Persisted per session.
  const [showOptions, setShowOptions] = useState(() => Boolean(prefs.showOptions));

  // Progression editor — which step in the chord chain is currently being edited.
  // null = not editing. number = the index (0..len-1) of the chord being edited.
  // Reset to null whenever we leave sequence mode or load a preset.
  const [editingStep, setEditingStep] = useState(null);

  // Derived: in sequence mode, the currently-playing chord drives everything
  const currentSequenceChord = sequenceChords[sequenceStep] || 'Am';

  // ─── Refs for async handlers ───
  const synthRef        = useRef(null);
  const userGainRef     = useRef(null);
  const allNodesRef     = useRef([]);
  const playingRef      = useRef(false);
  const modeRef         = useRef(mode);
  const sequenceChordsRef = useRef(sequenceChords);
  const sequenceStepRef = useRef(sequenceStep);
  const sequenceBpmRef  = useRef(sequenceBpm);
  const sequenceStepDurationRef = useRef(sequenceStepDuration);
  const rootLetterRef = useRef(rootLetter);
  const isMinorRef    = useRef(isMinor);
  const extensionIdRef = useRef(extensionId);
  const octaveRef     = useRef(octave);
  const volumeRef     = useRef(volume);
  const textureIdRef  = useRef(textureId);
  // Worker-based sequence timer — survives background tab throttling.
  // Holds a Worker instance or null. Stopped (but not terminated) during
  // visibility hidden so it can restart fresh when the tab returns.
  const sequenceTimerRef = useRef(null);
  // Periodic 3-min chord re-trigger for manual/single modes — prevents voice
  // drift on long-held drones. Sequence mode already re-triggers via the worker.
  const refreshTimerRef = useRef(null);
  // Last voicing that was handed to the synth — used to restore the drone
  // after visibility-change / mic-release suspend cycles and to feed the
  // onActiveNotesChange callback when the parent card needs to light up piano keys.
  const previousNotesRef = useRef([]);
  // onActiveNotesChange is a parent callback that may churn identity across renders.
  // Hold the latest version in a ref so effects don't re-fire and so the audio
  // code can call it synchronously without stale closures.
  const onActiveNotesChangeRef = useRef(onActiveNotesChange);
  useEffect(() => { onActiveNotesChangeRef.current = onActiveNotesChange; }, [onActiveNotesChange]);
  // Track "stopped" across async handlers — mirrors legacy DroneGenerator's stoppedRef.
  // Used by the mic-release recovery + visibility resume paths so an in-flight
  // restore doesn't fire against a drone the user stopped in the meantime.
  const stoppedRef = useRef(false);

  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { sequenceChordsRef.current = sequenceChords; }, [sequenceChords]);
  useEffect(() => { sequenceStepRef.current = sequenceStep; }, [sequenceStep]);
  useEffect(() => { sequenceBpmRef.current = sequenceBpm; }, [sequenceBpm]);
  useEffect(() => { sequenceStepDurationRef.current = sequenceStepDuration; }, [sequenceStepDuration]);
  useEffect(() => { rootLetterRef.current = rootLetter; }, [rootLetter]);
  useEffect(() => { isMinorRef.current = isMinor; }, [isMinor]);
  useEffect(() => { extensionIdRef.current = extensionId; }, [extensionId]);
  useEffect(() => { octaveRef.current = octave; }, [octave]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { textureIdRef.current = textureId; }, [textureId]);

  // ─── Persist prefs ───
  // Only the standalone instance in the Tools tab writes to localStorage.
  // Exercise-embedded instances should NOT overwrite the user's standalone
  // prefs when a lesson happens to load them in Am with a different texture.
  useEffect(() => {
    if (!standalone) return;
    savePrefs({
      rootLetter, isMinor, extensionId, octave, volume, textureId,
      mode, activePreset, sequenceBpm, sequenceStepDuration, showOptions,
    });
  }, [standalone, rootLetter, isMinor, extensionId, octave, volume, textureId, mode, activePreset, sequenceBpm, sequenceStepDuration, showOptions]);

  // ─── Embedded mode: follow the card hint ───
  useEffect(() => {
    if (standalone) return;
    if (!rootKeyHint) return;
    const seed = seedFromHint(rootKeyHint);
    setRootLetter(seed.root);
    setIsMinor(seed.isMinor);
    setExtensionId('none');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootKeyHint, standalone]);

  // ─── Extension compatibility guard ───
  useEffect(() => {
    if (isMinor && MINOR_INCOMPATIBLE.has(extensionId)) setExtensionId('none');
  }, [isMinor, extensionId]);

  // ─── Display helpers ───
  const { spelling } = useMemo(() => {
    if (mode === 'sequence') {
      const parsed = parseChordString(currentSequenceChord);
      return parseChordVoicing(parsed.rootLetter, parsed.quality, parsed.extensionId, octave);
    }
    if (mode === 'single') {
      return parseChordVoicing(rootLetter, 'major', 'none', octave, 'single');
    }
    return parseChordVoicing(rootLetter, isMinor ? 'minor' : 'major', extensionId, octave);
  }, [mode, currentSequenceChord, rootLetter, isMinor, extensionId, octave]);

  const chordDisplayName = useMemo(() => {
    if (mode === 'sequence') return currentSequenceChord;
    if (mode === 'single') return rootLetter;
    const suffix = EXTENSIONS.find(e => e.id === extensionId)?.suffix || '';
    return `${rootLetter}${isMinor ? 'm' : ''}${suffix}`;
  }, [mode, currentSequenceChord, rootLetter, isMinor, extensionId]);

  // Which wheel spoke is active right now?
  // Disambiguates notes that appear as both a major and a minor (A is both the
  // major at position 3 and the minor Am at position 0) by checking isMinor.
  const activePosition = useMemo(() => {
    let targetLetter;
    let targetIsMinor;

    if (mode === 'sequence') {
      const parsed = parseChordString(currentSequenceChord);
      targetLetter = parsed.rootLetter;
      targetIsMinor = parsed.quality === 'minor';
    } else if (mode === 'single') {
      // In single mode, we still track major vs minor spoke so the visual
      // indicator matches whichever label the user clicked.
      targetLetter = rootLetter;
      targetIsMinor = isMinor;
    } else {
      targetLetter = rootLetter;
      targetIsMinor = isMinor;
    }

    const normalized = normalizeNote(targetLetter);

    if (targetIsMinor) {
      // Find the spoke where this note is the MINOR root
      const minorIdx = WHEEL_POSITIONS.findIndex(p => normalizeNote(p.minorLetter) === normalized);
      if (minorIdx >= 0) return minorIdx;
    }
    // Otherwise find the spoke where this note is the MAJOR root
    const majorIdx = WHEEL_POSITIONS.findIndex(p => normalizeNote(p.noteLetter) === normalized);
    return majorIdx >= 0 ? majorIdx : 0;
  }, [mode, currentSequenceChord, rootLetter, isMinor]);

  // Is the active spoke a minor? (for label highlight logic)
  const activeIsMinor = useMemo(() => {
    if (mode === 'sequence') {
      return parseChordString(currentSequenceChord).quality === 'minor';
    }
    return isMinor;
  }, [mode, currentSequenceChord, isMinor]);

  const activeColor = getColorForNote(WHEEL_POSITIONS[activePosition].noteLetter);

  // ═══════════════════════════════════════════════════════════════════════
  // Audio
  // ═══════════════════════════════════════════════════════════════════════

  // Tear down the current synth + effect chain (on texture change or unmount)
  const teardownChain = useCallback((fadeMs = 80) => {
    const g = userGainRef.current;
    const nodes = allNodesRef.current;
    try {
      if (g) {
        g.gain.cancelScheduledValues(Tone.now());
        g.gain.rampTo(0, fadeMs / 1000);
      }
    } catch {}
    const toDispose = [...nodes];
    allNodesRef.current = [];
    synthRef.current = null;
    userGainRef.current = null;
    setTimeout(() => {
      toDispose.forEach(n => {
        try { if (n.releaseAll) n.releaseAll(); } catch {}
        try { if (n.stop) n.stop(); } catch {}
        try { n.dispose(); } catch {}
      });
    }, fadeMs + 40);
  }, []);

  // Build a fresh chain for the current texture
  const buildChain = useCallback(() => {
    const { synth, userGain, allNodes } = buildTextureChain(textureIdRef.current, -40);
    synthRef.current = synth;
    userGainRef.current = userGain;
    allNodesRef.current = allNodes;
    // Start silent — togglePlay will ramp up to the real volume
    return { synth, userGain };
  }, []);

  // Label helper — the string the parent exercise card uses to caption the
  // piano-keys display next to the drone (e.g. "Am7", "C", or "Am" for
  // sequence chord at current step).
  const computeCurrentLabel = () => {
    if (modeRef.current === 'sequence') {
      return sequenceChordsRef.current[sequenceStepRef.current] || '';
    }
    if (modeRef.current === 'single') {
      return rootLetterRef.current;
    }
    const suffix = EXTENSIONS.find(e => e.id === extensionIdRef.current)?.suffix || '';
    return `${rootLetterRef.current}${isMinorRef.current ? 'm' : ''}${suffix}`;
  };

  // Compute the voicing notes for the current mode without side effects.
  // Lets visibility / mic-release handlers query "what should be playing right now"
  // without duplicating mode-routing logic.
  const computeCurrentVoicing = () => {
    if (modeRef.current === 'sequence') {
      const chordStr = sequenceChordsRef.current[sequenceStepRef.current] || 'Am';
      const parsed = parseChordString(chordStr);
      return parseChordVoicing(parsed.rootLetter, parsed.quality, parsed.extensionId, octaveRef.current).notes;
    }
    if (modeRef.current === 'single') {
      return parseChordVoicing(rootLetterRef.current, 'major', 'none', octaveRef.current, 'single').notes;
    }
    return parseChordVoicing(
      rootLetterRef.current,
      isMinorRef.current ? 'minor' : 'major',
      extensionIdRef.current,
      octaveRef.current,
    ).notes;
  };

  // Trigger the current chord on the existing synth. Also fires the parent
  // onActiveNotesChange callback so the exercise card's piano keys can light up.
  //
  // Smooth voice-leading: release only the pitches we're leaving, attack only
  // the pitches we're adding, let shared pitches sustain untouched. This avoids
  // a nasty bug where releaseAll + setTimeout(triggerAttack, 20ms) would drop
  // voices when consecutive chords shared pitches (e.g. D → Bm both contain
  // F#4). releaseAll killed the shared voice and the 20ms-later reattack
  // raced the synth's voice allocator while 5 old voices were still in their
  // 2.5-second release tail — at maxPolyphony: 10 some new voices got stolen
  // before they could sound, and the drone would go silent.
  const triggerCurrentChord = useCallback(() => {
    if (!synthRef.current || synthRef.current.disposed) return;
    const notes = computeCurrentVoicing();
    const label = computeCurrentLabel();
    if (notes.length === 0) return;
    const oldNotes = previousNotesRef.current || [];
    previousNotesRef.current = notes;
    try {
      const newSet = new Set(notes);
      const oldSet = new Set(oldNotes);
      const releasing = oldNotes.filter(n => !newSet.has(n));
      const attacking = notes.filter(n => !oldSet.has(n));
      if (releasing.length > 0) {
        try { synthRef.current.triggerRelease(releasing); } catch {}
      }
      if (attacking.length > 0) {
        synthRef.current.triggerAttack(attacking);
      }
    } catch {}
    try { onActiveNotesChangeRef.current?.({ notes, label }); } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sequence step advance — moves to next chord and re-triggers
  const advanceSequence = useCallback(() => {
    if (!playingRef.current || modeRef.current !== 'sequence') return;
    const len = sequenceChordsRef.current.length;
    if (len === 0) return;
    const next = (sequenceStepRef.current + 1) % len;
    setSequenceStep(next);
    sequenceStepRef.current = next;
    triggerCurrentChord();
  }, [triggerCurrentChord]);

  // Clear any running sequence timer — terminates the Worker if one exists.
  const clearSequenceTimer = useCallback(() => {
    if (sequenceTimerRef.current) {
      try { sequenceTimerRef.current.postMessage({ cmd: 'stop' }); } catch {}
      terminateWorker(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
  }, []);

  // Start the sequence timer — creates a Worker and cycles chords at the
  // current BPM + step duration. Worker-based so background tab throttling
  // doesn't break the progression clock.
  const startSequenceTimer = useCallback(() => {
    clearSequenceTimer();
    const ms = stepMsFromDuration(sequenceStepDurationRef.current, sequenceBpmRef.current);
    const worker = createTimerWorker();
    worker.onmessage = () => advanceSequence();
    worker.postMessage({ cmd: 'start', ms });
    sequenceTimerRef.current = worker;
  }, [clearSequenceTimer, advanceSequence]);

  // Clear the periodic manual-mode refresh timer (see startDrone for rationale).
  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  // ─── Stop the drone ───
  // Tears down timers + media session + keepalive, rolls the gain to zero,
  // releases voices, and tells the parent to clear its piano keys display.
  const stopDrone = useCallback((fadeMs = 120) => {
    stoppedRef.current = true;
    clearSequenceTimer();
    clearRefreshTimer();
    try {
      if (userGainRef.current) {
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(0, fadeMs / 1000);
      }
      setTimeout(() => {
        try { synthRef.current?.releaseAll(); } catch {}
        previousNotesRef.current = [];
      }, fadeMs + 20);
    } catch {}
    setPlaying(false);
    playingRef.current = false;
    try { onActiveNotesChangeRef.current?.({ notes: [], label: '' }); } catch {}
    try { releaseKeepalive(); } catch {}
    try { clearMediaSession(); } catch {}
  }, [clearSequenceTimer, clearRefreshTimer]);

  // ─── Start the drone ───
  // Boots the audio context, builds the chain if needed, fades in, fires the
  // first chord, starts the sequence worker (or the 3-min refresh timer for
  // manual/single), and acquires background audio keepalive + media session
  // so the drone keeps playing with the phone locked.
  const startDrone = useCallback(async () => {
    stoppedRef.current = false;
    try { if (Tone.context.state !== 'running') await Tone.context.resume(); } catch {}
    try { if (Tone.getContext().state !== 'running') await Tone.start(); } catch {}

    if (!synthRef.current || synthRef.current.disposed) {
      buildChain();
    }

    // Reset to step 0 if we're starting sequence mode fresh
    if (modeRef.current === 'sequence') {
      setSequenceStep(0);
      sequenceStepRef.current = 0;
    }

    // Fade the gain up to the user's target
    try {
      if (userGainRef.current) {
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(Tone.dbToGain(volumeRef.current), 0.4);
      }
    } catch {}

    // Trigger the first chord
    triggerCurrentChord();
    setPlaying(true);
    playingRef.current = true;

    // In sequence mode, start the step timer
    if (modeRef.current === 'sequence') {
      startSequenceTimer();
    } else {
      // Manual/single — periodic re-trigger every 3 min to prevent oscillator
      // drift on long held drones. PolySynth voices degrade after many minutes
      // of continuous attack; this cheap release+re-attack cycle resets them
      // transparently (the envelope handles the crossfade).
      clearRefreshTimer();
      refreshTimerRef.current = setInterval(() => {
        if (stoppedRef.current || !synthRef.current || synthRef.current.disposed) return;
        triggerCurrentChord();
      }, 3 * 60 * 1000);
    }

    // Background audio keepalive + OS-level media session (lock screen controls).
    // Togglers on the media session call togglePlay via the ref so they work
    // while this closure is stale.
    try { acquireKeepalive(); } catch {}
    try {
      setMediaSession('Harmonic Drone', 'Practice', {
        pause: () => stopDroneRef.current?.(),
        play:  () => startDroneRef.current?.(),
      });
    } catch {}
  }, [buildChain, triggerCurrentChord, startSequenceTimer, clearRefreshTimer]);

  // Refs for the media session handlers — need stable callables that always
  // hit the latest start/stop implementations.
  const startDroneRef = useRef(startDrone);
  const stopDroneRef  = useRef(stopDrone);
  useEffect(() => { startDroneRef.current = startDrone; }, [startDrone]);
  useEffect(() => { stopDroneRef.current  = stopDrone;  }, [stopDrone]);

  const togglePlay = useCallback(() => {
    if (playingRef.current) stopDrone(120);
    else startDrone();
  }, [stopDrone, startDrone]);

  // ─── Re-trigger when chord or octave changes during manual/single playback ───
  useEffect(() => {
    if (!playingRef.current) return;
    if (modeRef.current === 'sequence') return; // sequence handles its own stepping
    triggerCurrentChord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootLetter, isMinor, extensionId, octave]);

  // ─── Re-trigger when sequence state changes during sequence playback ───
  useEffect(() => {
    if (!playingRef.current) return;
    if (modeRef.current !== 'sequence') return;
    // Preset/chords/mode change: restart from step 0
    setSequenceStep(0);
    sequenceStepRef.current = 0;
    triggerCurrentChord();
    startSequenceTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activePreset, sequenceBpm, sequenceStepDuration]);

  // ─── Live volume updates ───
  useEffect(() => {
    if (playing && userGainRef.current) {
      try {
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.15);
      } catch {}
    }
  }, [volume, playing]);

  // ─── Rebuild chain when texture changes ───
  useEffect(() => {
    // Only rebuild if a chain already exists (i.e. the user has played at least once)
    if (!synthRef.current && allNodesRef.current.length === 0) return;
    const wasPlaying = playingRef.current;
    clearSequenceTimer();
    teardownChain(60);
    setTimeout(() => {
      buildChain();
      if (wasPlaying) {
        try {
          userGainRef.current.gain.cancelScheduledValues(Tone.now());
          userGainRef.current.gain.rampTo(Tone.dbToGain(volumeRef.current), 0.3);
        } catch {}
        triggerCurrentChord();
        if (modeRef.current === 'sequence') startSequenceTimer();
      }
    }, 140);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textureId]);

  // ─── Visibility change — survive screen-off / tab-switch ───
  // When the tab is hidden, ramp gain to near-zero and pause the sequence
  // worker so accumulated ticks don't fire a flurry of chord changes when
  // the tab returns. On visible, resume the audio context, restart the
  // worker fresh, restore volume, and re-trigger the held chord if the
  // synth dropped its voices during the suspend.
  useEffect(() => {
    const onVisibility = async () => {
      if (!playingRef.current) return;
      try {
        if (document.hidden) {
          if (userGainRef.current) {
            try {
              userGainRef.current.gain.cancelScheduledValues(Tone.now());
              userGainRef.current.gain.rampTo(0.001, 0.05);
            } catch {}
          }
          // Stop the worker (but don't terminate it — we'll restart when visible)
          if (sequenceTimerRef.current) {
            try { sequenceTimerRef.current.postMessage({ cmd: 'stop' }); } catch {}
          }
        } else {
          try { await Tone.getContext().rawContext.resume(); } catch {}
          if (Tone.getContext().state !== 'running') {
            try { await Tone.start(); } catch {}
            await new Promise(r => setTimeout(r, 300));
            try { await Tone.getContext().rawContext.resume(); } catch {}
          }
          // Restart the worker with fresh timing (no accumulated ticks)
          if (sequenceTimerRef.current && modeRef.current === 'sequence') {
            try {
              const ms = stepMsFromDuration(sequenceStepDurationRef.current, sequenceBpmRef.current);
              sequenceTimerRef.current.postMessage({ cmd: 'start', ms });
            } catch {}
          }
          // Restore volume + re-trigger chord if voices dropped
          setTimeout(() => {
            if (stoppedRef.current) return;
            try {
              if (userGainRef.current) {
                userGainRef.current.gain.cancelScheduledValues(Tone.now());
                userGainRef.current.gain.rampTo(Tone.dbToGain(volumeRef.current), 0.15);
              }
              if (synthRef.current && previousNotesRef.current.length > 0) {
                synthRef.current.releaseAll();
                synthRef.current.triggerAttack(previousNotesRef.current);
              }
            } catch {}
          }, 200);
        }
      } catch {}
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // ─── Mic release recovery ───
  // When LivePitchDetector closes its mic context, the OS keeps Tone.js's
  // context in "play-and-record" mode (~6-10dB ducked). The 'micReleased'
  // CustomEvent lets us cycle the raw AudioContext (suspend → resume) with a
  // smooth fade, then re-trigger the held notes to recover full volume.
  // Without this, using the pitch detector mid-drone permanently quiets it.
  useEffect(() => {
    const onMicReleased = async () => {
      if (!playingRef.current || !synthRef.current || !userGainRef.current) return;
      try {
        const savedNotes = previousNotesRef.current;
        const savedVolume = volumeRef.current;
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(0, 0.05);
        await new Promise(r => setTimeout(r, 80));
        if (!synthRef.current || stoppedRef.current) return;
        try { synthRef.current.releaseAll(); } catch {}
        const rawCtx = Tone.getContext()?.rawContext;
        if (rawCtx && rawCtx.state === 'running') {
          await rawCtx.suspend();
          await new Promise(r => setTimeout(r, 150));
          await rawCtx.resume();
        }
        await new Promise(r => setTimeout(r, 100));
        if (!synthRef.current || stoppedRef.current) return;
        if (savedNotes.length > 0) {
          synthRef.current.triggerAttack(savedNotes);
        }
        userGainRef.current.gain.cancelScheduledValues(Tone.now());
        userGainRef.current.gain.rampTo(Tone.dbToGain(savedVolume), 0.15);
      } catch {}
    };
    window.addEventListener('micReleased', onMicReleased);
    return () => window.removeEventListener('micReleased', onMicReleased);
  }, []);

  // ─── Cleanup on unmount ───
  // Tear down the audio chain + timers + media session + keepalive so a
  // drone embedded in an exercise card doesn't leave audio + lock-screen
  // artifacts behind when the user navigates away.
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      clearSequenceTimer();
      clearRefreshTimer();
      try { releaseKeepalive(); } catch {}
      try { clearMediaSession(); } catch {}
      // Fire callback one final time so the parent clears its display
      try { onActiveNotesChangeRef.current?.({ notes: [], label: '' }); } catch {}
      teardownChain(40);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Handlers ───
  // Clicking a major label sets the root to that spoke's major note.
  // Clicking a minor label sets the root to that minor's ACTUAL root (A for Am,
  // not C). This produces correct chord audio AND correct wheel highlighting.
  // The activePosition useMemo below uses (rootLetter, isMinor) together to
  // disambiguate notes that appear as both a major and a minor on the wheel.
  const handlePickMajor = useCallback((pos) => {
    if (mode === 'sequence') return;
    setRootLetter(pos.noteLetter);
    setIsMinor(false);
  }, [mode]);

  const handlePickMinor = useCallback((pos) => {
    if (mode === 'sequence') return;
    setRootLetter(pos.minorLetter);
    setIsMinor(true);
  }, [mode]);

  const handlePickPreset = useCallback((preset) => {
    setActivePreset(preset.id);
    setSequenceChords([...preset.chords]);
    setSequenceBpm(preset.bpm);
    setSequenceStepDuration(preset.stepDuration);
    setSequenceStep(0);
    sequenceStepRef.current = 0;
    setEditingStep(null); // exit editor when loading a preset
  }, []);

  // ─── Progression editor handlers ───
  // Update the chord at a given index by merging its current parse with the
  // field the user just tapped (root / quality / extension).
  const updateStep = useCallback((stepIdx, updates) => {
    setSequenceChords(prev => {
      const next = [...prev];
      const current = parseChordString(next[stepIdx] || 'C');
      const rootLetter  = updates.rootLetter ?? current.rootLetter;
      const quality     = updates.quality    ?? current.quality;
      const extensionId = updates.extensionId ?? current.extensionId;
      next[stepIdx] = buildChordString(rootLetter, quality === 'minor', extensionId);
      return next;
    });
    setActivePreset(null); // custom edit breaks the preset link
  }, []);

  const addStep = useCallback(() => {
    setSequenceChords(prev => {
      const next = [...prev, 'C'];
      setEditingStep(next.length - 1);
      return next;
    });
    setActivePreset(null);
  }, []);

  const removeStep = useCallback((idx) => {
    setSequenceChords(prev => {
      if (prev.length <= 1) return prev; // keep at least one chord in the chain
      const next = prev.filter((_, i) => i !== idx);
      return next;
    });
    setEditingStep(null);
    setActivePreset(null);
    // If the removed step was before the current playback step, nudge the step back
    setSequenceStep(s => Math.max(0, s - (s >= idx ? 1 : 0)));
  }, []);

  const clearProgression = useCallback(() => {
    setSequenceChords(['C']);
    setSequenceStep(0);
    sequenceStepRef.current = 0;
    setEditingStep(null);
    setActivePreset(null);
  }, []);

  const transposeProgression = useCallback((steps) => {
    setSequenceChords(prev => prev.map(c => transposeChordString(c, steps)));
    setActivePreset(null);
  }, []);

  // Exit the editor when we leave sequence mode
  useEffect(() => {
    if (mode !== 'sequence') setEditingStep(null);
  }, [mode]);

  // ─── Wheel geometry ───
  const positionData = useMemo(() => {
    return WHEEL_POSITIONS.map((p, i) => {
      const angleDeg = i * 30 - 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);
      return {
        ...p,
        i,
        color: getColorForNote(p.noteLetter),
        majorXY: { x: C + R_MAJOR * cos, y: C + R_MAJOR * sin },
        dotXY:   { x: C + R_DOT   * cos, y: C + R_DOT   * sin },
        minorXY: { x: C + R_MINOR * cos, y: C + R_MINOR * sin },
        spoke: {
          x1: C + (PLAY_SIZE / 2 + 6) * cos,
          y1: C + (PLAY_SIZE / 2 + 6) * sin,
          x2: C + (R_MAJOR - 14) * cos,
          y2: C + (R_MAJOR - 14) * sin,
        },
      };
    });
  }, [C, R_MAJOR, R_DOT, R_MINOR, PLAY_SIZE]);

  // ─── Animations ───
  const styleBlock = `
    @keyframes cdwPulseRing {
      0%   { transform: translate(-50%, -50%) scale(0.9); opacity: 0.9; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0;   }
    }
    @keyframes cdwBreathAperture {
      0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0.1; }
    }
    @keyframes cdwDotBreathe {
      0%, 100% { filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 14px currentColor); }
      50%      { filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 22px currentColor); }
    }
    @keyframes cdwAuraBreathe {
      0%, 100% { opacity: 0.55; }
      50%      { opacity: 0.85; }
    }
    @media (prefers-reduced-motion: reduce) {
      @keyframes cdwPulseRing      { from { opacity: 0; } to { opacity: 0; } }
      @keyframes cdwBreathAperture { from { opacity: 0; } to { opacity: 0; } }
      @keyframes cdwDotBreathe     { from {} to {} }
      @keyframes cdwAuraBreathe    { from {} to {} }
    }
  `;

  const cardPadding = isMobile ? 22 : 36;

  const Screw = ({ top, left, right, bottom }) => (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top, left, right, bottom,
        width: 6, height: 6, borderRadius: '50%',
        background: T.border,
        boxShadow: `inset 0 1px 2px rgba(44, 40, 37, 0.15), 0 1px 0 rgba(255, 255, 255, 0.6)`,
      }}
    />
  );

  // ─── Render ───
  return (
    <div
      style={{
        position: 'relative',
        maxWidth: 720,
        margin: '0 auto',
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: 28,
        padding: cardPadding,
        fontFamily: T.sans,
        boxShadow: `0 24px 48px -12px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.border}`,
        overflow: 'hidden',
      }}
    >
      <style>{styleBlock}</style>

      <Screw top={12} left={12} />
      <Screw top={12} right={12} />
      <Screw bottom={12} left={12} />
      <Screw bottom={12} right={12} />

      {/* ─── HEADER ─── */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          paddingBottom: isMobile ? 24 : 36,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%', height: 150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${activeColor}22 0%, ${activeColor}00 60%)`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 0,
            animation: playing && !reducedMotion
              ? 'cdwAuraBreathe 3s ease-in-out infinite'
              : 'none',
          }}
        />

        <div
          style={{
            position: 'relative', zIndex: 1,
            fontSize: 10, fontWeight: 700,
            letterSpacing: 3, textTransform: 'uppercase',
            color: T.textLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 14,
            marginBottom: 12,
          }}
        >
          <span style={{ width: 32, height: 1, background: T.border }} />
          Harmonic Drone
          <span style={{ width: 32, height: 1, background: T.border }} />
        </div>

        <div
          aria-live="polite"
          style={{
            position: 'relative', zIndex: 1,
            fontFamily: T.serif,
            fontSize: isMobile ? 52 : 68,
            fontWeight: 500,
            color: T.textDark,
            lineHeight: 1.05,
            letterSpacing: -1.2,
            textShadow: `0 2px 14px ${activeColor}20`,
          }}
        >
          {chordDisplayName}
        </div>

        <div
          style={{
            position: 'relative', zIndex: 1,
            marginTop: 10,
            fontFamily: T.serif,
            fontStyle: 'italic',
            fontSize: 17,
            fontWeight: 400,
            color: T.textLight,
            letterSpacing: '0.35em',
          }}
        >
          {(spelling || []).join('  ')}
        </div>

        {mode === 'sequence' && sequenceChords.length > 0 && (
          <div
            style={{
              position: 'relative', zIndex: 1,
              marginTop: 10,
              fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: T.textMuted,
            }}
          >
            Step {sequenceStep + 1} of {sequenceChords.length}
            {activePreset && ` · ${PROGRESSION_PRESETS.find(p => p.id === activePreset)?.label || ''}`}
          </div>
        )}
      </div>

      {/* ─── WHEEL ─── */}
      <div
        style={{
          position: 'relative',
          width: W,
          height: W,
          margin: '0 auto',
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${W}`}
          width={W}
          height={W}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',  // keep everything inside the wheel bounds
          }}
          aria-hidden="true"
        >
          <defs>
            {/* Clip path — final safety net, nothing escapes the wheel */}
            <clipPath id="cdw-wheel-clip">
              <circle cx={C} cy={C} r={R_MAJOR + 16} />
            </clipPath>

            {/* Soft radial halo centered on the active dot. Organic — no
                directional shape, no beam, no cone. Just a gentle colored
                pool of light around the star. */}
            {playing && (
              <radialGradient
                id="cdw-active-halo"
                cx={positionData[activePosition].dotXY.x}
                cy={positionData[activePosition].dotXY.y}
                r={isMobile ? 34 : 44}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"  stopColor={activeColor} stopOpacity="0.35" />
                <stop offset="50%" stopColor={activeColor} stopOpacity="0.12" />
                <stop offset="100%" stopColor={activeColor} stopOpacity="0" />
              </radialGradient>
            )}
          </defs>

          <g clipPath="url(#cdw-wheel-clip)">
            {/* Guide rings — constant opacity regardless of play state.      */}
            {/* Always warm beige, never tinted by the active chord color.    */}
            <circle
              cx={C} cy={C} r={R_MINOR}
              fill="none" stroke={T.border} strokeWidth={1}
              opacity={0.32}
            />
            <circle
              cx={C} cy={C} r={R_DOT}
              fill="none" stroke={T.border} strokeWidth={1}
              opacity={0.22}
              strokeDasharray="2 4"
            />
            <circle
              cx={C} cy={C} r={R_MAJOR}
              fill="none" stroke={T.border} strokeWidth={1}
              opacity={0.32}
            />

            {/* 12 radial spokes — always warm beige, no active tint */}
            {positionData.map((p) => (
              <line
                key={`spoke-${p.i}`}
                x1={p.spoke.x1} y1={p.spoke.y1}
                x2={p.spoke.x2} y2={p.spoke.y2}
                stroke={T.border}
                strokeWidth={1}
                opacity={0.2}
              />
            ))}

            {/* ─── Active chord LIGHT-UP: soft radial halo around the dot ─── */}
            {/* A single circular pool of light centered on the active dot.    */}
            {/* No wedge, no beam, no thread — just a gentle star halo that    */}
            {/* breathes with the drone and stays contained.                   */}
            {playing && (
              <circle
                cx={positionData[activePosition].dotXY.x}
                cy={positionData[activePosition].dotXY.y}
                r={isMobile ? 34 : 44}
                fill="url(#cdw-active-halo)"
                style={{
                  animation: !reducedMotion
                    ? 'cdwAuraBreathe 3s ease-in-out infinite'
                    : 'none',
                }}
              />
            )}
          </g>
        </svg>

        {/* Major labels */}
        {positionData.map((p) => {
          const isActive = !activeIsMinor && p.i === activePosition;
          return (
            <button
              key={`major-${p.i}`}
              type="button"
              onClick={() => handlePickMajor(p)}
              disabled={mode === 'sequence'}
              aria-label={`${p.major} major`}
              aria-pressed={isActive}
              style={{
                position: 'absolute',
                left: p.majorXY.x,
                top:  p.majorXY.y,
                transform: `translate(-50%, -50%) ${isActive ? 'scale(1.08)' : 'scale(1)'}`,
                background: 'none',
                border: 'none',
                cursor: mode === 'sequence' ? 'default' : 'pointer',
                padding: 6,
                fontFamily: T.sans,
                fontSize: isMobile ? 14 : 16,
                fontWeight: isActive ? 800 : 700,
                color: p.color,
                textShadow: isActive
                  ? `0 0 12px ${p.color}, 0 0 24px ${p.color}80`
                  : 'none',
                transition: 'all 0.25s ease',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                opacity: mode === 'sequence' && !isActive ? 0.55 : 1,
              }}
            >
              {p.major}
            </button>
          );
        })}

        {/* Color dots — constellation points */}
        {positionData.map((p) => {
          const isActiveSpoke = p.i === activePosition;
          // Active dot grows slightly, picks up a 3-layer colored glow (no
          // hard inner ring — the SVG halo behind it carries the ambient
          // presence, the dot is the crisp center of the star).
          const size = isActiveSpoke ? (isMobile ? 16 : 19) : (isMobile ? 13 : 15);
          return (
            <div
              key={`dot-${p.i}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: p.dotXY.x,
                top:  p.dotXY.y,
                transform: 'translate(-50%, -50%)',
                width: size,
                height: size,
                borderRadius: '50%',
                background: p.color,
                color: p.color,
                boxShadow: isActiveSpoke
                  ? [
                      `0 0 6px 1px ${p.color}`,      // crisp core glow
                      `0 0 14px 2px ${p.color}b0`,    // mid halo
                      `0 0 28px 4px ${p.color}55`,    // faint outer bloom
                    ].join(', ')
                  : `0 0 5px ${p.color}66, 0 0 12px ${p.color}22`,
                transition: 'width 0.25s ease, height 0.25s ease, box-shadow 0.25s ease',
                zIndex: isActiveSpoke ? 8 : 2,
                animation: (isActiveSpoke && playing && !reducedMotion)
                  ? 'cdwDotBreathe 2.8s ease-in-out infinite'
                  : 'none',
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Minor labels */}
        {positionData.map((p) => {
          const isActive = activeIsMinor && p.i === activePosition;
          return (
            <button
              key={`minor-${p.i}`}
              type="button"
              onClick={() => handlePickMinor(p)}
              disabled={mode === 'sequence'}
              aria-label={`${p.minor}`}
              aria-pressed={isActive}
              style={{
                position: 'absolute',
                left: p.minorXY.x,
                top:  p.minorXY.y,
                transform: `translate(-50%, -50%) ${isActive ? 'scale(1.08)' : 'scale(1)'}`,
                background: isActive ? `${p.color}18` : 'transparent',
                border: isActive ? `1px solid ${p.color}70` : '1px solid transparent',
                borderRadius: 12,
                cursor: mode === 'sequence' ? 'default' : 'pointer',
                padding: isActive ? '3px 9px' : '4px 7px',
                fontFamily: T.sans,
                fontSize: isMobile ? 11 : 13,
                fontWeight: isActive ? 800 : 500,
                fontStyle: 'italic',
                color: isActive ? p.color : `${p.color}b3`,
                textShadow: isActive
                  ? `0 0 10px ${p.color}, 0 0 20px ${p.color}80`
                  : 'none',
                transition: 'all 0.25s ease',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                opacity: mode === 'sequence' && !isActive ? 0.55 : 1,
              }}
            >
              {p.minor}
            </button>
          );
        })}

        {/* Play button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Stop drone' : 'Start drone'}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: PLAY_SIZE,
            height: PLAY_SIZE,
            borderRadius: '50%',
            background: `radial-gradient(circle at 45% 40%, ${T.bgCard} 0%, ${T.bgCard} 62%, ${T.border} 100%)`,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 0 0 1px ${T.border},
              0 0 0 4px ${T.bgCard},
              0 0 0 5px ${T.border}80,
              inset 0 2px 6px rgba(44, 40, 37, 0.06),
              inset 0 0 0 1px rgba(255, 255, 255, 0.5),
              0 4px 14px rgba(44, 40, 37, 0.08)
            `,
            zIndex: 10,
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
        >
          <div
            style={{
              width: PLAY_SIZE * 0.52,
              height: PLAY_SIZE * 0.52,
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 35%, ${T.gold}, ${T.goldDark})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `inset 0 2px 8px rgba(255, 255, 255, 0.25), 0 3px 10px ${activeColor}44`,
            }}
          >
            {playing
              ? <Pause size={PLAY_SIZE * 0.22} color="#fff" strokeWidth={1.5} />
              : <Play  size={PLAY_SIZE * 0.22} color="#fff" strokeWidth={1.5} style={{ marginLeft: 2 }} />
            }
          </div>

          {playing && !reducedMotion && (
            <>
              {/* Breath aperture — slow soft halo emanating from the hub.
                  Runs at a different cadence (4s alternating) than the
                  wavefront rings (3s one-way) so breath + pulse layer as
                  two distinct rhythms. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  width: PLAY_SIZE * 0.55,
                  height: PLAY_SIZE * 0.55,
                  borderRadius: '50%',
                  background: `radial-gradient(circle,
                    ${activeColor}cc 0%,
                    ${activeColor}55 40%,
                    ${activeColor}00 72%
                  )`,
                  transform: 'translate(-50%, -50%) scale(1)',
                  animation: 'cdwBreathAperture 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite alternate',
                  pointerEvents: 'none',
                }}
              />
              {/* Wavefront pulse rings — feathered radial bands, not hard
                  strokes. A soft gradient concentrates color at the crest
                  radius and fades on both sides, so the ring rides outward
                  like a pond ripple. Two rings at 1.5s offset keep one
                  always mid-flight. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  width: PLAY_SIZE,
                  height: PLAY_SIZE,
                  borderRadius: '50%',
                  background: `radial-gradient(circle,
                    transparent 40%,
                    ${activeColor}66 50%,
                    transparent 62%
                  )`,
                  filter: 'blur(1.5px)',
                  transform: 'translate(-50%, -50%) scale(0.9)',
                  animation: 'cdwPulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '50%', top: '50%',
                  width: PLAY_SIZE,
                  height: PLAY_SIZE,
                  borderRadius: '50%',
                  background: `radial-gradient(circle,
                    transparent 40%,
                    ${activeColor}66 50%,
                    transparent 62%
                  )`,
                  filter: 'blur(1.5px)',
                  transform: 'translate(-50%, -50%) scale(0.9)',
                  animation: 'cdwPulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) 1.5s infinite',
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
        </button>
      </div>

      {/* ─── MODE TABS — MANUAL / SINGLE / SEQUENCE ───
          Always shows all three modes so every drone — standalone or embedded
          in a practice exercise — is a unified tool. If the exercise didn't
          pre-declare a progression, sequence mode falls back to the user's
          saved preset or Am-G-F-E (see sequenceChords initializer). */}
      {(() => {
        const modes = ['manual', 'single', 'sequence'];
        return (
        <div style={{ marginTop: isMobile ? 24 : 36, textAlign: 'center' }}>
          <div
            role="tablist"
            aria-label="Drone mode"
            style={{
              display: 'inline-flex',
              padding: 3,
              background: T.bgSoft,
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              gap: 2,
            }}
          >
            {modes.map(m => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    if (playingRef.current) stopDrone(80);
                    setMode(m);
                  }}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? T.bgCard : 'transparent',
                    color: active ? T.goldDark : T.textMed,
                    fontSize: 11,
                    fontWeight: active ? 700 : 600,
                    fontFamily: T.sans,
                    cursor: 'pointer',
                    boxShadow: active
                      ? `0 1px 3px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.gold}40`
                      : 'none',
                    transition: 'all 0.15s ease',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>
        );
      })()}

      {/* ─── MANUAL MODE: extensions row ─── */}
      {mode === 'manual' && (
        <div style={{ marginTop: isMobile ? 22 : 28, textAlign: 'center' }}>
          <div
            style={{
              fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: T.textMuted,
              marginBottom: 10,
            }}
          >
            Voicing
          </div>
          <div
            role="radiogroup"
            aria-label="Voicing extension"
            style={{
              display: 'inline-flex',
              padding: 4,
              background: T.bgSoft,
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              maxWidth: '100%',
              overflowX: 'auto',
              gap: 2,
            }}
          >
            {EXTENSIONS.map(ext => {
              const active = extensionId === ext.id;
              const disabled = isMinor && MINOR_INCOMPATIBLE.has(ext.id);
              return (
                <button
                  key={ext.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  disabled={disabled}
                  onClick={() => !disabled && setExtensionId(ext.id)}
                  style={{
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? T.bgCard : 'transparent',
                    color: disabled ? T.textMuted : active ? T.goldDark : T.textMed,
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: active ? 700 : 500,
                    fontFamily: T.sans,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    boxShadow: active
                      ? `0 1px 3px rgba(44, 40, 37, 0.08), 0 0 0 1px ${T.gold}40`
                      : 'none',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    opacity: disabled ? 0.4 : 1,
                    textDecoration: disabled ? 'line-through' : 'none',
                  }}
                >
                  {ext.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── SINGLE MODE: tiny explainer ─── */}
      {mode === 'single' && (
        <div
          style={{
            marginTop: isMobile ? 22 : 28,
            textAlign: 'center',
            fontSize: 11,
            fontStyle: 'italic',
            color: T.textLight,
            lineHeight: 1.5,
          }}
        >
          Pure pedal tone — tap any note on the wheel to drone on it
        </div>
      )}

      {/* ─── SEQUENCE MODE: progression chord-chain (clickable to edit) ─── */}
      {/* Click any chord → opens the inline editor. Presets, BPM, and step  */}
      {/* duration live in the Options drawer below.                        */}
      {mode === 'sequence' && sequenceChords.length > 0 && (
        <div
          style={{
            marginTop: isMobile ? 22 : 28,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {sequenceChords.map((ch, i) => {
            const parsed = parseChordString(ch);
            const color = getColorForNote(parsed.rootLetter);
            const current = playing && i === sequenceStep;
            const editing = editingStep === i;
            return (
              <React.Fragment key={`${ch}-${i}`}>
                <button
                  type="button"
                  onClick={() => setEditingStep(editing ? null : i)}
                  aria-label={`Edit step ${i + 1}: ${ch}`}
                  style={{
                    padding: '6px 13px',
                    borderRadius: 999,
                    background: editing
                      ? T.goldSoft
                      : current ? `${color}1a` : T.bgCard,
                    border: `${editing ? 2 : 1}px solid ${editing ? T.gold : (current ? color : T.border)}`,
                    color: editing ? T.goldDark : (current ? color : T.textMed),
                    fontSize: 12,
                    fontWeight: (current || editing) ? 800 : 600,
                    fontFamily: T.sans,
                    boxShadow: current ? `0 0 8px ${color}66` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {ch}
                </button>
                {i < sequenceChords.length - 1 && (
                  <span style={{ color: T.textMuted, fontSize: 11 }}>→</span>
                )}
              </React.Fragment>
            );
          })}
          {/* Add step button */}
          <button
            type="button"
            onClick={addStep}
            aria-label="Add chord step"
            title="Add chord"
            style={{
              padding: '6px 13px',
              borderRadius: 999,
              background: 'transparent',
              border: `1px dashed ${T.border}`,
              color: T.textMuted,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: T.sans,
              cursor: 'pointer',
              letterSpacing: 0.5,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.goldDark; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMuted; }}
          >
            + Add
          </button>
        </div>
      )}

      {/* ─── INLINE PROGRESSION EDITOR (sequence mode, when editingStep is set) ─── */}
      {mode === 'sequence' && editingStep !== null && sequenceChords[editingStep] && (() => {
        const current = parseChordString(sequenceChords[editingStep]);
        const currentIsMinor = current.quality === 'minor';
        return (
          <div
            style={{
              marginTop: 14,
              padding: 16,
              background: T.bgSoft,
              border: `1px solid ${T.goldSoft}`,
              borderRadius: 12,
              boxShadow: `0 1px 3px rgba(44, 40, 37, 0.04), inset 0 0 0 1px ${T.gold}30`,
            }}
          >
            {/* Editor header — step number + remove + close */}
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: T.goldDark,
                }}
              >
                Editing step {editingStep + 1} · {sequenceChords[editingStep]}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {sequenceChords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(editingStep)}
                    style={{
                      fontSize: 10, fontWeight: 700,
                      color: T.coral,
                      background: 'transparent',
                      border: `1px solid ${T.coral}40`,
                      borderRadius: 6,
                      padding: '4px 10px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      fontFamily: T.sans,
                    }}
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setEditingStep(null)}
                  style={{
                    fontSize: 10, fontWeight: 700,
                    color: T.goldDark,
                    background: T.bgCard,
                    border: `1px solid ${T.gold}60`,
                    borderRadius: 6,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontFamily: T.sans,
                  }}
                >
                  Done
                </button>
              </div>
            </div>

            {/* Root picker — 12 colored chips in circle-of-fifths order */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: T.textMuted,
                  marginBottom: 6,
                }}
              >
                Root
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {WHEEL_POSITIONS.map((pos) => {
                  const color = getColorForNote(pos.noteLetter);
                  const active = normalizeNote(current.rootLetter) === normalizeNote(pos.noteLetter);
                  return (
                    <button
                      key={`root-${pos.major}`}
                      type="button"
                      onClick={() => updateStep(editingStep, { rootLetter: pos.noteLetter })}
                      aria-pressed={active}
                      style={{
                        minWidth: 34,
                        padding: '5px 9px',
                        borderRadius: 8,
                        border: `1px solid ${active ? color : T.border}`,
                        background: active ? `${color}22` : T.bgCard,
                        color: active ? color : T.textMed,
                        fontSize: 11,
                        fontWeight: active ? 800 : 600,
                        fontFamily: T.sans,
                        cursor: 'pointer',
                        transition: 'all 0.12s',
                        boxShadow: active ? `0 0 6px ${color}55` : 'none',
                      }}
                    >
                      {pos.major}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality toggle — Major / Minor */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: T.textMuted,
                  marginBottom: 6,
                }}
              >
                Quality
              </div>
              <div
                role="radiogroup"
                aria-label="Chord quality"
                style={{
                  display: 'inline-flex',
                  padding: 3,
                  background: T.bgCard,
                  border: `1px solid ${T.border}`,
                  borderRadius: 999,
                  gap: 2,
                }}
              >
                {[{ id: 'major', label: 'Major' }, { id: 'minor', label: 'Minor' }].map(q => {
                  const active = current.quality === q.id;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => updateStep(editingStep, { quality: q.id })}
                      style={{
                        padding: '5px 18px',
                        borderRadius: 999,
                        border: 'none',
                        background: active ? T.goldSoft : 'transparent',
                        color: active ? T.goldDark : T.textMed,
                        fontSize: 10,
                        fontWeight: active ? 700 : 500,
                        fontFamily: T.sans,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        textTransform: 'uppercase',
                        letterSpacing: 0.8,
                      }}
                    >
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extension picker — None / 7 / maj7 / sus2 / sus4 / dim / aug */}
            <div>
              <div
                style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: T.textMuted,
                  marginBottom: 6,
                }}
              >
                Chord Type
              </div>
              <div
                role="radiogroup"
                aria-label="Chord extension"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 5,
                }}
              >
                {EXTENSIONS.map(ext => {
                  const active = current.extensionId === ext.id;
                  const disabled = currentIsMinor && MINOR_INCOMPATIBLE.has(ext.id);
                  return (
                    <button
                      key={`edit-ext-${ext.id}`}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      disabled={disabled}
                      onClick={() => !disabled && updateStep(editingStep, { extensionId: ext.id })}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 8,
                        border: `1px solid ${active ? T.gold : T.border}`,
                        background: active ? T.goldSoft : T.bgCard,
                        color: disabled ? T.textMuted : active ? T.goldDark : T.textMed,
                        fontSize: 11,
                        fontWeight: active ? 700 : 600,
                        fontFamily: T.sans,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.12s',
                        opacity: disabled ? 0.4 : 1,
                        textDecoration: disabled ? 'line-through' : 'none',
                      }}
                    >
                      {ext.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── LOWER CONSOLE — Octave + Volume only ─── */}
      {/* Texture, presets, BPM, and step duration now live in the Options   */}
      {/* drawer below so the main surface stays clean.                      */}
      <div
        style={{
          marginTop: isMobile ? 26 : 36,
          paddingTop: isMobile ? 22 : 28,
          borderTop: `1px solid ${T.border}`,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 36,
        }}
      >
        {/* Octave */}
        <div>
          <div
            style={{
              fontSize: 9, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: T.textMuted,
              marginBottom: 10,
            }}
          >
            Octave
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={() => setOctave(o => Math.max(2, o - 1))}
              aria-label="Drone octave down"
              disabled={octave <= 2}
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: `1px solid ${T.border}`,
                background: octave <= 2 ? T.bgSoft : T.bgCard,
                color: octave <= 2 ? T.textMuted : T.textMed,
                fontSize: 15, lineHeight: 1,
                cursor: octave <= 2 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: octave <= 2 ? 'none' : `0 1px 2px rgba(44, 40, 37, 0.06)`,
              }}
            >
              −
            </button>
            <div
              style={{
                minWidth: 34,
                textAlign: 'center',
                fontFamily: T.serif,
                fontSize: 22,
                fontWeight: 500,
                color: T.textDark,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {octave}
            </div>
            <button
              type="button"
              onClick={() => setOctave(o => Math.min(5, o + 1))}
              aria-label="Drone octave up"
              disabled={octave >= 5}
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: `1px solid ${T.border}`,
                background: octave >= 5 ? T.bgSoft : T.bgCard,
                color: octave >= 5 ? T.textMuted : T.textMed,
                fontSize: 15, lineHeight: 1,
                cursor: octave >= 5 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: octave >= 5 ? 'none' : `0 1px 2px rgba(44, 40, 37, 0.06)`,
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Volume */}
        <div>
          <div
            style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 9, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                color: T.textMuted,
              }}
            >
              Volume
            </span>
            <span
              style={{
                fontSize: 11, fontWeight: 600,
                color: T.textLight,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {volume} dB
            </span>
          </div>
          <input
            type="range"
            min={-30}
            max={0}
            step={1}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Drone master volume"
            style={{
              width: '100%',
              height: 4,
              cursor: 'pointer',
              accentColor: T.gold,
            }}
          />
        </div>
      </div>

      {/* ─── OPTIONS TOGGLE + DRAWER ─── */}
      {/* Hides the heavier knobs (texture, presets, BPM, step duration)      */}
      {/* so the main surface stays focused. Drawer contents are mode-aware.  */}
      <div style={{ marginTop: isMobile ? 22 : 28 }}>
        <button
          type="button"
          onClick={() => setShowOptions(v => !v)}
          aria-expanded={showOptions}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: `1px solid ${T.border}`,
            background: showOptions ? T.bgSoft : T.bgCard,
            color: showOptions ? T.goldDark : T.textMed,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontFamily: T.sans,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Sliders size={13} strokeWidth={2} />
          <span>Options</span>
          {showOptions
            ? <ChevronUp size={13} strokeWidth={2} />
            : <ChevronDown size={13} strokeWidth={2} />}
        </button>

        {showOptions && (
          <div
            style={{
              marginTop: 14,
              padding: isMobile ? 18 : 22,
              background: T.bgSoft,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {/* Texture picker — always in the drawer */}
            <div>
              <div
                style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  color: T.textMuted,
                  marginBottom: 10,
                }}
              >
                Texture
              </div>
              <div style={{ position: 'relative' }}>
                <select
                  value={textureId}
                  onChange={(e) => setTextureId(e.target.value)}
                  aria-label="Drone texture"
                  style={{
                    width: '100%',
                    padding: '10px 36px 10px 14px',
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    background: T.bgCard,
                    color: T.textDark,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: T.sans,
                    cursor: 'pointer',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    boxShadow: `0 1px 3px rgba(44, 40, 37, 0.05)`,
                  }}
                >
                  {TEXTURES.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.label} — {t.desc}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  color={T.textMed}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Sequence-only: preset gallery + BPM + step duration */}
            {mode === 'sequence' && (
              <>
                <div
                  style={{
                    height: 1,
                    background: T.border,
                    opacity: 0.6,
                  }}
                />

                {/* Presets */}
                <div>
                  <div
                    style={{
                      fontSize: 9, fontWeight: 700,
                      letterSpacing: 2, textTransform: 'uppercase',
                      color: T.textMuted,
                      marginBottom: 10,
                    }}
                  >
                    Presets
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {PROGRESSION_PRESETS.map(preset => {
                      const active = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handlePickPreset(preset)}
                          style={{
                            padding: '7px 14px',
                            borderRadius: 999,
                            border: `1px solid ${active ? T.gold : T.border}`,
                            background: active ? T.goldSoft : T.bgCard,
                            color: active ? T.goldDark : T.textMed,
                            fontSize: isMobile ? 10 : 11,
                            fontWeight: active ? 700 : 500,
                            fontFamily: T.sans,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progression utilities row — transpose ± + clear */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        fontSize: 9, fontWeight: 700,
                        letterSpacing: 2, textTransform: 'uppercase',
                        color: T.textMuted,
                        marginRight: 4,
                      }}
                    >
                      Transpose
                    </span>
                    <button
                      type="button"
                      onClick={() => transposeProgression(-1)}
                      title="Down a half step"
                      style={{
                        width: 28, height: 28, borderRadius: 6,
                        border: `1px solid ${T.border}`,
                        background: T.bgCard,
                        color: T.textMed,
                        fontSize: 14, lineHeight: 1,
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >−</button>
                    <button
                      type="button"
                      onClick={() => transposeProgression(1)}
                      title="Up a half step"
                      style={{
                        width: 28, height: 28, borderRadius: 6,
                        border: `1px solid ${T.border}`,
                        background: T.bgCard,
                        color: T.textMed,
                        fontSize: 14, lineHeight: 1,
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >+</button>
                  </div>
                  <button
                    type="button"
                    onClick={clearProgression}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      background: 'transparent',
                      border: `1px solid ${T.coral}40`,
                      color: T.coral,
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: T.sans,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                    }}
                  >
                    Clear
                  </button>
                </div>

                {/* BPM + step duration row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 20,
                  }}
                >
                  {/* BPM cluster */}
                  <div>
                    <div
                      style={{
                        fontSize: 9, fontWeight: 700,
                        letterSpacing: 2, textTransform: 'uppercase',
                        color: T.textMuted,
                        marginBottom: 8,
                      }}
                    >
                      BPM
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => setSequenceBpm(b => Math.max(40, b - 5))}
                        aria-label="Sequence BPM down"
                        style={{
                          width: 28, height: 28, borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.bgCard,
                          color: T.textMed,
                          fontSize: 14, lineHeight: 1,
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >−</button>
                      <div
                        style={{
                          minWidth: 36, textAlign: 'center',
                          fontFamily: T.serif, fontSize: 18, fontWeight: 500,
                          color: T.textDark, fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {sequenceBpm}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSequenceBpm(b => Math.min(200, b + 5))}
                        aria-label="Sequence BPM up"
                        style={{
                          width: 28, height: 28, borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          background: T.bgCard,
                          color: T.textMed,
                          fontSize: 14, lineHeight: 1,
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >+</button>
                    </div>
                  </div>

                  {/* Step duration */}
                  <div>
                    <div
                      style={{
                        fontSize: 9, fontWeight: 700,
                        letterSpacing: 2, textTransform: 'uppercase',
                        color: T.textMuted,
                        marginBottom: 8,
                      }}
                    >
                      Step Duration
                    </div>
                    <div
                      role="radiogroup"
                      aria-label="Step duration"
                      style={{
                        display: 'flex',
                        padding: 3,
                        background: T.bgCard,
                        border: `1px solid ${T.border}`,
                        borderRadius: 999,
                        gap: 2,
                      }}
                    >
                      {STEP_DURATIONS.map(s => {
                        const active = sequenceStepDuration === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setSequenceStepDuration(s.id)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 999,
                              border: 'none',
                              background: active ? T.goldSoft : 'transparent',
                              color: active ? T.goldDark : T.textMed,
                              fontSize: 10,
                              fontWeight: active ? 700 : 500,
                              fontFamily: T.sans,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
