/**
 * Backing Track Metadata — verified via transient analysis (librosa) + harmonic analysis (Gemini).
 *
 * bpm:            Quarter-note "felt" tempo — the rate a musician would tap their foot.
 *                 For reggae/ska, this is half the 8th-note pulse.
 * pulseBpm:       Raw transient pulse (may be 2x bpm for reggae/ska).
 * beatStability:  0-1, how steady the tempo is (>0.95 = rock solid).
 * grooveStartSec: Seconds from file start to the first musical downbeat.
 *                 Chord highlighting should begin HERE, not at 0:00.
 * key:            Detected key (may differ from filename — see notes).
 * chords:         Chord progression array. One cycle.
 * beatsPerChord:  Quarter-note beats before the next chord.
 *                 e.g. 8 = 2 bars of 4/4.
 * loops:          Whether the audio loops seamlessly end→start.
 * drumsOnly:      No pitched instruments — no chord data.
 * notes:          Anything unusual about this track.
 */

const CHROMATIC = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const ENHARMONIC = { 'Db': 'C#', 'Gb': 'F#', 'D#': 'Eb', 'G#': 'Ab', 'A#': 'Bb' };

/**
 * Parse a chord name into labeled pitch classes.
 * Returns { all: [...], root, third, fifth, seventh? } for interval-specific filtering.
 *
 * "Am7" → { all: ["A","C","E","G"], root: "A", third: "C", fifth: "E", seventh: "G" }
 * "D"   → { all: ["D","F#","A"],    root: "D", third: "F#", fifth: "A" }
 *
 * With target filter:
 *   chordToNotes("Am", "root")  → ["A"]
 *   chordToNotes("Am", "third") → ["C"]
 *   chordToNotes("Am", "triad") → ["A", "C", "E"]
 *   chordToNotes("Am")          → ["A", "C", "E"]   (all by default)
 */
export function chordToNotes(chordName, target) {
  if (!chordName) return [];
  const match = chordName.match(/^([A-G][#b]?)(.*)/);
  if (!match) return [];
  const root = ENHARMONIC[match[1]] || match[1];
  const q = match[2].toLowerCase();

  let third = 4, fifth = 7, seventh = null;
  if (q.match(/^m(?!aj)/) || q.includes('min')) third = 3;
  if (q.includes('dim')) { third = 3; fifth = 6; }
  if (q.includes('aug')) { third = 4; fifth = 8; }
  if (q.includes('sus2')) third = 2;
  if (q.includes('sus4')) third = 5;
  if (q.includes('maj7')) seventh = 11;
  else if (q.includes('7')) seventh = 10;
  if (q.includes('b5')) fifth = 6;

  const rootIdx = CHROMATIC.indexOf(root);
  if (rootIdx < 0) return [];
  const n = (i) => CHROMATIC[(rootIdx + i) % 12];

  const labeled = { root: n(0), third: n(third), fifth: n(fifth) };
  if (seventh !== null) labeled.seventh = n(seventh);
  labeled.all = [...new Set(Object.values(labeled))];

  // Target filter for interval-specific exercises
  if (!target || target === 'all') return labeled.all;
  if (target === 'root') return [labeled.root];
  if (target === 'third') return [labeled.third];
  if (target === 'fifth') return [labeled.fifth];
  if (target === 'seventh') return labeled.seventh ? [labeled.seventh] : [];
  if (target === 'triad') return [labeled.root, labeled.third, labeled.fifth];
  return labeled.all;
}

const TRACK_METADATA = {
  // ─── CONFIRMED BPM (transients match filename) ────────────────────

  'groove-beat-90': {
    bpm: 90,
    pulseBpm: 90,
    beatStability: 0.981,
    grooveStartSec: 2.74,
    drumsOnly: true,
    loops: false,
    notes: 'Count-in before groove. Drums only.',
  },

  'deep-soul-groove-80': {
    bpm: 80,
    pulseBpm: 80,
    beatStability: 0.985,
    grooveStartSec: 12.14,
    key: 'Cm',
    chords: ['Fm7', 'Gm7', 'Cm7'],
    beatsPerChord: 8,
    loops: true,
    notes: '12-second intro before beat locks in. 3-chord vamp.',
  },

  'cinematic-western-80': {
    bpm: 80,
    pulseBpm: 80,
    beatStability: 0.981,
    grooveStartSec: 1.07,
    key: 'F',
    chords: ['F', 'C', 'Dm', 'Bb'],
    beatsPerChord: 8,
    loops: false,
    notes: 'I-V-vi-IV in F major. Acoustic folk/pop.',
  },

  'a-major-folk-80': {
    bpm: 80,
    pulseBpm: 80,
    beatStability: 0.985,
    grooveStartSec: 0.21,
    key: 'D',  // ⚠️ NOT A major despite filename
    chords: ['D', 'A', 'Bm', 'G'],
    beatsPerChord: 8,
    loops: false,
    notes: 'FILENAME SAYS A MAJOR BUT TRACK IS IN D MAJOR (I-V-vi-IV).',
  },

  'psych-rock-120': {
    bpm: 120,
    pulseBpm: 120,
    beatStability: 0.974,
    grooveStartSec: 2.46,
    key: 'Am',
    chords: ['Am', 'F', 'C', 'G'],
    beatsPerChord: 8,
    loops: false,
    notes: 'High-energy indie rock. i-VI-III-VII in A minor.',
  },

  'surf-rock-120': {
    bpm: 120,
    pulseBpm: 120,
    beatStability: 0.976,
    grooveStartSec: 1.63,
    drumsOnly: true,
    loops: true,
    notes: 'Drums only. Steady rock groove.',
  },

  // ─── REGGAE/SKA — half-time feel (pulse ÷ 2 = felt BPM) ─────────

  'khruangbin-style-80': {
    bpm: 83,
    pulseBpm: 166,
    beatStability: 0.968,
    grooveStartSec: 1.79,
    key: 'Bm',
    chords: ['Bm7', 'Em7'],
    beatsPerChord: 4,  // 1 bar each at half-time
    loops: false,
    notes: 'Neo-soul/lo-fi. Pulse is 166 but felt at ~83 half-time. Filename 80 is close.',
  },

  'dub-reggae-85': {
    bpm: 65,
    pulseBpm: 130,
    beatStability: 0.978,
    grooveStartSec: 14.35,
    key: 'Cm',
    chords: ['Cm'],
    beatsPerChord: null,  // single chord drone
    loops: true,
    notes: 'Single Cm drone — no chord changes. Kick at 64.6 confirms one-drop at 65. Filename 85 is wrong (between pulse and half). 14s intro.',
  },

  'reggae-rock-100': {
    bpm: 68,
    pulseBpm: 135,
    beatStability: 0.978,
    grooveStartSec: 0.09,
    key: 'Cm',
    chords: ['Cm'],
    beatsPerChord: null,  // single chord drone
    loops: false,
    notes: 'Single Cm drone — no chord changes. Snare at 68 = half-time feel. Kick at 89 suggests a rock-reggae hybrid feel. Filename 100 is wrong. Ends with crowd noise/fade.',
  },

  'reggae-one-drop-85': {
    bpm: 85,
    pulseBpm: 170,
    beatStability: 0.972,
    grooveStartSec: 4.48,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. Pulse 170, half-time 85 matches filename exactly. 4.5s count-in.',
  },

  'drums-reggae-85': {
    bpm: 85,
    pulseBpm: 170,
    beatStability: 0.972,
    grooveStartSec: 4.48,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. Same pattern as reggae-one-drop-85.',
  },

  'a-major-reggae-85': {
    bpm: 80,
    pulseBpm: 160,
    beatStability: 0.975,
    grooveStartSec: 5.46,
    key: 'A',
    chords: ['A', 'E', 'F#m', 'D'],
    beatsPerChord: 8,  // 2 bars at 80 BPM half-time
    loops: true,
    notes: 'Driving ska/reggae. All bands at 160 — unusual for reggae (no half-time kick separation). Half-time = 80, not 85 as filename says. I-V-vi-IV in A. 5.5s intro.',
  },

  'e-major-reggae-85': {
    bpm: 70,
    pulseBpm: 140,
    beatStability: 0.968,
    grooveStartSec: 6.85,
    key: 'A',  // ⚠️ NOT E major despite filename
    chords: ['A', 'A', 'D', 'E'],
    beatsPerChord: [8, 8, 4, 4],  // variable: A=2bars, A=2bars, D=1bar, E=1bar
    loops: false,
    notes: 'FILENAME SAYS E MAJOR BUT TRACK IS IN A MAJOR. Kick at 70 = half-time feel. 4-bar drum intro before chords. Variable chord lengths.',
  },

  // ─── BPM CORRECTIONS (filename is wrong) ─────────────────────────

  'soul-funk-groove-90': {
    bpm: 105,
    pulseBpm: 105,
    beatStability: 0.979,
    grooveStartSec: 0.23,
    key: 'Cm',
    chords: ['Cm7', 'Fm7', 'Bb7', 'Ebmaj7', 'Abmaj7', 'Dm7b5', 'G7', 'Cm7'],
    beatsPerChord: 4,  // 1 bar each, 8-chord jazz cycle
    loops: false,
    notes: 'FILENAME SAYS 90 BUT ACTUALLY 105 BPM. Jazz circle-of-fifths in C minor (Autumn Leaves style). 8-bar cycle = 18.3s at true tempo.',
  },

  'afrobeat-100': {
    bpm: 105,
    pulseBpm: 105,
    beatStability: 0.961,
    grooveStartSec: 14.10,
    key: 'F#m',
    chords: ['F#m', 'D', 'A', 'E'],
    beatsPerChord: 4,  // 1 bar each
    loops: true,
    notes: 'FILENAME SAYS 100 BUT ACTUALLY 105 BPM. i-VI-III-VII in F# minor. 14-second layered intro before full groove.',
  },

  'ska-upbeat-95': {
    bpm: 100,
    pulseBpm: 100,
    beatStability: 0.981,
    grooveStartSec: 2.42,
    key: 'C',
    chords: ['C', 'G', 'Am', 'F'],
    beatsPerChord: 8,
    loops: false,
    notes: 'FILENAME SAYS 95 BUT ACTUALLY 100 BPM. I-V-vi-IV in C. Offbeat ska strokes at 200 (8th notes). 2.4s drumstick count-in.',
  },

  'e-major-surf-120': {
    bpm: 117,
    pulseBpm: 117,
    beatStability: 0.934,
    grooveStartSec: 1.35,
    key: 'E',
    chords: ['E', 'B', 'C#m', 'A'],
    beatsPerChord: 8,
    loops: false,
    notes: 'FILENAME SAYS 120 BUT ACTUALLY ~117 BPM. I-V-vi-IV in E major. Pop-punk/alt-rock with power chords. Lower stability (0.934) suggests slight tempo drift.',
  },

  // ─── AMBIGUOUS METER — best estimates ─────────────────────────────

  'desert-blues-75': {
    bpm: 110,
    pulseBpm: 110,
    beatStability: 0.914,
    grooveStartSec: 1.05,
    key: 'Bm',
    chords: ['Bm', 'G', 'D', 'A'],
    beatsPerChord: 8,
    loops: false,
    notes: 'FILENAME SAYS 75 BUT TRANSIENTS SAY ~110. Lowest stability of all tracks (0.914) — irregular fingerpicking creates ambiguous meter. i-VI-III-VII in B minor. The "75" may refer to a felt pulse at a different metric level.',
  },

  'bossa-nova-75': {
    bpm: 82,
    pulseBpm: 164,
    beatStability: 0.970,
    grooveStartSec: 10.47,
    key: 'Am',
    chords: ['Am7', 'Dm7', 'G7', 'Cmaj7', 'Fmaj7', 'Bm7b5', 'E7', 'Am7'],
    beatsPerChord: 8,  // 2 bars each in half-time
    loops: false,
    notes: 'Pulse 164, half-time 82. Filename 75 is low. 10.5-SECOND lead-in (silence + drum fill). Full jazz circle-of-fifths in A minor with 7th chords. 8-chord cycle = ~47s.',
  },

  // ─── DRUMS-ONLY ───────────────────────────────────────────────────

  'drums-afrobeat-110': {
    bpm: 110,
    pulseBpm: 110,
    beatStability: 0.972,
    grooveStartSec: 10.66,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. 10.7s intro buildup. Filename 110 confirmed.',
  },

  'drums-bossa-75': {
    bpm: 76,
    pulseBpm: 97,
    beatStability: 0.907,
    grooveStartSec: 0.09,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. Kick at 76 (closest to filename 75). Snare/hihat at 99 suggests cross-rhythm. Lowest stability (0.907) — characteristic bossa syncopation.',
  },

  'drums-soul-funk-90': {
    bpm: 90,
    pulseBpm: 90,
    beatStability: 0.980,
    grooveStartSec: 8.75,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. 8.75s intro. Filename 90 confirmed.',
  },

  'drums-surf-120': {
    bpm: 120,
    pulseBpm: 120,
    beatStability: 0.977,
    grooveStartSec: 5.25,
    drumsOnly: true,
    loops: false,
    notes: 'Drums only. 5.25s intro. Filename 120 confirmed.',
  },

  // ─── PRACTICE SONGS (reference recordings) ───────────────────────

  'sol-del-sur': {
    bpm: 122,
    pulseBpm: 122,
    beatStability: 0.965,
    grooveStartSec: 5.90,
    key: 'E',
    chords: ['E', 'A'],  // verse/intro
    chordsChorus: ['C#m', 'A', 'E', 'B'],  // chorus sections
    beatsPerChord: 8,
    loops: false,
    notes: 'Sun Room - Sol Del Sur. Verse=E-A (I-IV), Chorus=C#m-A-E-B (vi-IV-I-V). 5.9s vinyl crackle intro. Gemini says 130, transients say 122.',
  },

  'iltwyw': {
    bpm: 97,
    pulseBpm: 97,
    beatStability: 0.970,
    grooveStartSec: 8.13,
    key: 'D',
    chords: ['D', 'G', 'D', 'A'],
    beatsPerChord: 8,
    loops: false,
    notes: 'Reference recording in D (I-IV-I-V). Exercises teach it as Am-C-G-D — different key for Gene\'s vocal range. 8s intro. Gemini says 125, transients say 97.',
  },
};

/**
 * Look up track metadata from a src path like "/groove-beat-90.mp3".
 * Returns the metadata object or null if not found.
 */
export function getTrackMeta(src) {
  if (!src) return null;
  // Strip leading / and .mp3 extension
  const key = src.replace(/^\//, '').replace(/\.mp3$/, '');
  return TRACK_METADATA[key] || null;
}

/**
 * Get the current chord at a given playback time (seconds).
 * Accounts for groove start offset and handles looping progressions.
 *
 * @param {string} src - Track src path (e.g. "/khruangbin-style-80.mp3")
 * @param {number} currentTimeSec - Current audio playback position in seconds
 * @returns {{ chord: string, chordIndex: number, beatInChord: number, bar: number } | null}
 */
export function getChordAtTime(src, currentTimeSec) {
  const meta = getTrackMeta(src);
  if (!meta || !meta.chords || meta.chords.length === 0) return null;
  // Single-chord drones (e.g. Cm) — always return that chord
  if (meta.chords.length === 1) {
    return { chord: meta.chords[0], chordIndex: 0, beatInChord: 0, bar: 0 };
  }

  const elapsed = currentTimeSec - meta.grooveStartSec;
  if (elapsed < 0) return null;  // still in the intro

  const bpc = meta.beatsPerChord;
  // Handle variable beats-per-chord (array)
  if (Array.isArray(bpc)) {
    const totalBeatsInCycle = bpc.reduce((a, b) => a + b, 0);
    const secPerBeat = 60 / meta.bpm;
    const cycleSeconds = totalBeatsInCycle * secPerBeat;
    const posInCycle = elapsed % cycleSeconds;
    let accumulated = 0;
    for (let i = 0; i < meta.chords.length; i++) {
      const chordDuration = bpc[i] * secPerBeat;
      if (posInCycle < accumulated + chordDuration) {
        const beatInChord = (posInCycle - accumulated) / secPerBeat;
        return {
          chord: meta.chords[i],
          chordIndex: i,
          beatInChord: Math.floor(beatInChord),
          bar: Math.floor(elapsed / (4 * secPerBeat)),
        };
      }
      accumulated += chordDuration;
    }
  }

  // Uniform beats-per-chord
  const secPerBeat = 60 / meta.bpm;
  const secPerChord = bpc * secPerBeat;
  const totalCycleTime = secPerChord * meta.chords.length;
  const posInCycle = elapsed % totalCycleTime;
  const chordIndex = Math.floor(posInCycle / secPerChord);
  const beatInChord = Math.floor((posInCycle % secPerChord) / secPerBeat);

  return {
    chord: meta.chords[chordIndex],
    chordIndex,
    beatInChord,
    bar: Math.floor(elapsed / (4 * secPerBeat)),
  };
}

export default TRACK_METADATA;
