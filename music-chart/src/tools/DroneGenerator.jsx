import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { T } from '../theme.js';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from '../audioKeepalive.js';
import { createTimerWorker, terminateWorker } from '../workerTimer.js';

const DRONE_PRESETS = [
  { id: "surf-garage",    label: "Surf Garage",    chords: ["Am", "G", "F", "E"],               bpm: 120, stepDuration: "1m" },
  { id: "psych-vamp",     label: "Psych Vamp",     chords: ["Em", "A", "Em", "A"],              bpm: 90,  stepDuration: "2m" },
  { id: "reggae-drop",    label: "Reggae Drop",    chords: ["Am", "Am", "G", "G"],              bpm: 85,  stepDuration: "1m" },
  { id: "coastal-soul",   label: "Coastal Soul",   chords: ["Cmaj7", "Bm7", "Am7", "Gmaj7"],   bpm: 75,  stepDuration: "2m" },
  { id: "desert-blues",   label: "Desert Blues",   chords: ["Dm", "C", "Am", "Dm"],             bpm: 75,  stepDuration: "2m" },
  { id: "thai-funk",      label: "Thai Funk",      chords: ["Em7", "Bm7", "Am7", "Bm7"],       bpm: 80,  stepDuration: "1m" },
  { id: "reggae-rock",    label: "Reggae Rock",    chords: ["A", "Bm", "C#m", "Bm"],           bpm: 85,  stepDuration: "1m" },
  { id: "cinematic-sky",  label: "Cinematic Sky",  chords: ["Fmaj7", "G", "Em", "Am"],          bpm: 80,  stepDuration: "2m" },
];

const CIRCLE_OF_FIFTHS = [
  { major: "C", minor: "Am", angle: 0 },
  { major: "G", minor: "Em", angle: 30 },
  { major: "D", minor: "Bm", angle: 60 },
  { major: "A", minor: "F#m", angle: 90 },
  { major: "E", minor: "C#m", angle: 120 },
  { major: "B", minor: "G#m", angle: 150 },
  { major: "F#", minor: "D#m", angle: 180 },
  { major: "D♭", minor: "B♭m", angle: 210 },
  { major: "A♭", minor: "Fm", angle: 240 },
  { major: "E♭", minor: "Cm", angle: 270 },
  { major: "B♭", minor: "Gm", angle: 300 },
  { major: "F", minor: "Dm", angle: 330 },
];

const getChordSpelling = (chordStr) => {
  if (!chordStr) return "";
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return "";
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2].toLowerCase();

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return "";

  let third = 4;
  let fifth = 7;
  let seventh = null;

  if (q.match(/^m(?!aj)/i) || q.includes('min')) third = 3;
  if (q.includes('dim')) { third = 3; fifth = 6; }
  if (q.includes('aug')) { third = 4; fifth = 8; }
  if (q.includes('sus2')) third = 2;
  if (q.includes('sus4')) third = 5;

  if (q.includes('maj7')) seventh = 11;
  else if (q.includes('7')) seventh = 10;

  const getSpelling = (interval) => notes[(rootIdx + interval) % 12];

  let spelling = [getSpelling(0), getSpelling(third), getSpelling(fifth)];
  if (seventh !== null) spelling.push(getSpelling(seventh));
  
  return spelling.join(" ");
};

const transposeChord = (chordStr, steps) => {
  if (!chordStr) return "";
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return chordStr;
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2];

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return chordStr;

  let newIdx = (rootIdx + steps) % 12;
  if (newIdx < 0) newIdx += 12;

  return notes[newIdx] + q;
};

const parseChordToNotes = (chordStr, baseOct, type = "chord") => {
  const match = chordStr.trim().match(/^([A-G][#b♭]?)(.*)$/i);
  if (!match) return null;
  let root = match[1].replace('b', '♭').toUpperCase();
  let q = match[2].toLowerCase();

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const normalize = { "D♭": "C#", "D#": "E♭", "G♭": "F#", "G#": "A♭", "A#": "B♭" };
  const searchRoot = normalize[root] || root;
  let rootIdx = notes.indexOf(searchRoot);
  if (rootIdx === -1) return null;

  const getNote = (interval, octOffset) => {
    let idx = (rootIdx + interval) % 12;
    let wrap = Math.floor((rootIdx + interval) / 12);
    return `${notes[idx].replace('♭', 'b')}${baseOct + octOffset + wrap}`;
  };

  if (type === "single") {
    // Pure massive single note drone across 3 octaves
    return [...new Set([getNote(0, -1), getNote(0, 0), getNote(0, 1)])];
  }

  // Full lush pad chord voicing
  let third = 4;
  let fifth = 7;
  let seventh = null;

  if (q.match(/^m(?!aj)/i) || q.includes('min')) third = 3;
  if (q.includes('dim')) { third = 3; fifth = 6; }
  if (q.includes('aug')) { third = 4; fifth = 8; }
  if (q.includes('sus2')) third = 2;
  if (q.includes('sus4')) third = 5;

  if (q.includes('maj7')) seventh = 11;
  else if (q.includes('7')) seventh = 10;

  let voicing = [
    getNote(0, -1),    // Sub bass
    getNote(0, 0),     // Root
    getNote(fifth, 0), // Fifth
    getNote(third, 1)  // Third (spread up an octave)
  ];
  if (seventh !== null) voicing.push(getNote(seventh, 1));
  
  return [...new Set(voicing)];
};

export default function DroneGenerator({ theme: T, defaultRoot, defaultOctave, defaultTexture, defaultMode, defaultPreset, defaultProgression, defaultBpm, defaultStepDuration, inline, onActiveNotesChange }) {
  // Resolve preset defaults
  const preset = defaultPreset ? DRONE_PRESETS.find(p => p.id === defaultPreset) : null;

  const [playing, setPlaying] = useState(false);
  const [root, setRoot] = useState(defaultRoot || "C");
  const [octave, setOctave] = useState(defaultOctave || 2);
  const [volume, setVolume] = useState(-6);
  const [texture, setTexture] = useState(defaultTexture || "analog");
  const [mode, setMode] = useState(defaultMode || (preset ? "cycle" : "manual"));
  const [progression, setProgression] = useState(defaultProgression || (preset ? preset.chords : ["C", "C", "F", "G", "Am", "Am", "F", "G"]));
  const [stepDuration, setStepDuration] = useState(defaultStepDuration || (preset ? preset.stepDuration : "2n"));
  const [bpm, setBpm] = useState(defaultBpm || (preset ? preset.bpm : 80));
  const [activeStep, setActiveStep] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [activePreset, setActivePreset] = useState(defaultPreset || null);

  const synthRef = useRef(null);
  const lastWorkerTickRef = useRef(0);
  const refreshRef = useRef(null);
  const octaveRef = useRef(octave);
  const textureRef = useRef(texture);
  const progressionRef = useRef(progression);
  const stepDurationRef = useRef(stepDuration);
  const previousNotesRef = useRef([]);
  const stoppedRef = useRef(false);
  const onActiveNotesChangeRef = useRef(onActiveNotesChange);
  const stepCountRef = useRef(0);
  const userGainRef = useRef(null);
  const workerRef = useRef(null);

  const notes = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

  // Sync props → state when exercise changes (React reuses component, doesn't remount)
  // Intentionally only depends on the prop — setting same value is a React no-op
  useEffect(() => { if (defaultRoot) setRoot(defaultRoot); }, [defaultRoot]);
  useEffect(() => { if (defaultOctave) setOctave(defaultOctave); }, [defaultOctave]);
  useEffect(() => { if (defaultTexture) setTexture(defaultTexture); }, [defaultTexture]);

  useEffect(() => { octaveRef.current = octave; }, [octave]);
  useEffect(() => { textureRef.current = texture; }, [texture]);
  useEffect(() => { progressionRef.current = progression; }, [progression]);
  useEffect(() => { onActiveNotesChangeRef.current = onActiveNotesChange; });
  // Convert step duration string to milliseconds
  const stepToMs = (sd) => {
    const bpmVal = bpm || 80;
    const beatMs = 60000 / bpmVal;
    if (sd === "4m") return beatMs * 16;
    if (sd === "2m") return beatMs * 8;
    if (sd === "1m") return beatMs * 4;
    if (sd === "2n") return beatMs * 2;
    if (sd === "4n") return beatMs;
    return beatMs * 4;
  };

  useEffect(() => {
    stepDurationRef.current = stepDuration;
    // Update worker interval if sequence is playing
    if (workerRef.current && playing && mode === "cycle") {
      workerRef.current.postMessage({ cmd: 'update', ms: stepToMs(stepDuration) });
    }
  }, [stepDuration]);

  // Handle screen off / app switch — graceful suspend and clean recovery
  useEffect(() => {
    const handleVisibility = async () => {
      if (!playing) return;
      try {
        if (document.hidden) {
          // Screen off — ramp to near-zero so if context freezes, no pop on resume
          if (userGainRef.current) {
            try {
              userGainRef.current.gain.cancelScheduledValues(Tone.now());
              userGainRef.current.gain.rampTo(0.001, 0.05);
            } catch {}
          }
          // Pause worker timer to prevent accumulated ticks during suspension
          if (workerRef.current) {
            workerRef.current.postMessage({ cmd: 'stop' });
          }
        } else {
          // Screen back on — resume AudioContext
          try { await Tone.getContext().rawContext.resume(); } catch {}
          if (Tone.getContext().state !== "running") {
            try { await Tone.start(); } catch {}
            await new Promise(r => setTimeout(r, 300));
            try { await Tone.getContext().rawContext.resume(); } catch {}
          }
          // Restart worker timer fresh (no accumulated ticks)
          if (workerRef.current) {
            lastWorkerTickRef.current = performance.now();
            workerRef.current.postMessage({ cmd: 'start', ms: stepToMs(stepDurationRef.current) });
          }
          // Restore volume and re-trigger chord if it died
          setTimeout(() => {
            try {
              if (userGainRef.current) {
                userGainRef.current.gain.cancelScheduledValues(Tone.now());
                userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.15);
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
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing, volume]);

  // Cleanup on unmount — immediate silence + dispose
  useEffect(() => {
    return () => {
      // Immediate fade-out so navigating exercises doesn't leave audio hanging
      if (userGainRef.current) {
        try {
          userGainRef.current.gain.cancelScheduledValues(Tone.now());
          userGainRef.current.gain.rampTo(0, 0.05);
        } catch {}
      }
      if (synthRef.current) {
        setTimeout(() => { try { synthRef.current.releaseAll(); } catch {} }, 80);
      }
      if (workerRef.current) { workerRef.current.postMessage({ cmd: 'stop' }); terminateWorker(workerRef.current); workerRef.current = null; }
      if (refreshRef.current) { clearInterval(refreshRef.current); refreshRef.current = null; }
      releaseKeepalive();
      clearMediaSession();
    };
  }, []);

  useEffect(() => {
    let effectSynth = null;
    let effectNodes = [];

    let synth;
    let newNodes = [];

    // Master bus — static gain staging, no dynamic compression (compressors pump on sustained drones)
    const masterGain = new Tone.Gain(0.35);
    // User volume control — AFTER effects, signal is already at safe levels
    const userGain = new Tone.Gain(Tone.dbToGain(volume));
    // Highpass to kill sub-rumble
    const lowcut = new Tone.Filter(40, "highpass");
    // Safety limiter — true safety net only, should rarely engage
    const limiter = new Tone.Limiter(-3).toDestination();

    masterGain.chain(userGain, lowcut, limiter);
    userGainRef.current = userGain;
    newNodes.push(masterGain, userGain, lowcut, limiter);

    // FIX: Replaced async Tone.Reverb with synchronous Tone.Freeverb to prevent Web Audio crashes on rapid switching
    if (texture === "analog") {
      const chorus = new Tone.Chorus({ frequency: 2, delayTime: 3, depth: 0.6 }).connect(masterGain).start();
      const filter = new Tone.Filter(800, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "sawtooth" },
        envelope: { attack: 2.5, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.1, 400, 1200).connect(filter.frequency).start();
      newNodes.push(chorus, filter, lfo);
    }
    else if (texture === "choir") {
      const reverb = new Tone.Freeverb({ roomSize: 0.9, dampening: 2000 }).connect(masterGain);
      const filter = new Tone.Filter(1500, "lowpass").connect(reverb);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 1.01, modulationIndex: 2,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(reverb, filter);
    }
    else if (texture === "organ") {
      const chorus = new Tone.Chorus(2, 4, 0.8).connect(masterGain).start();
      const eq = new Tone.EQ3(2, -2, -6).connect(chorus);
      synth = new Tone.PolySynth(Tone.AMSynth, {
        volume: -14,
        harmonicity: 1.005,
        oscillator: { type: "square" },
        modulation: { type: "square" },
        envelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 },
        modulationEnvelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 }
      }).connect(eq);
      synth.maxPolyphony = 10;
      newNodes.push(chorus, eq);
    }
    else if (texture === "pure") {
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 10;
    }
    else if (texture === "strings") {
      const reverb = new Tone.Freeverb({ roomSize: 0.7, dampening: 3000 }).connect(masterGain);
      const chorus = new Tone.Chorus({ frequency: 1.5, delayTime: 3, depth: 0.7 }).connect(reverb).start();
      const filter = new Tone.Filter(1200, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "sawtooth" },
        envelope: { attack: 3, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.1, 800, 1500).connect(filter.frequency).start();
      newNodes.push(reverb, chorus, filter, lfo);
    }
    else if (texture === "tanpura") {
      const phaser = new Tone.Phaser({ frequency: 0.2, octaves: 3, baseFrequency: 200 }).connect(masterGain);
      const filter = new Tone.Filter(3000, "lowpass").connect(phaser);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 2.01, modulationIndex: 3,
        oscillator: { type: "sawtooth" },
        modulation: { type: "sine" },
        envelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 2, decay: 0.1, sustain: 1, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(phaser, filter);
    }
    else if (texture === "crystal") {
      const reverb = new Tone.Freeverb({ roomSize: 0.95, dampening: 1000 }).connect(masterGain);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 1.005, modulationIndex: 1.5,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 },
        modulationEnvelope: { attack: 4, decay: 0.1, sustain: 1, release: 2 }
      }).connect(reverb);
      synth.maxPolyphony = 10;
      newNodes.push(reverb);
    }
    else if (texture === "lofi-tape") {
      const vibrato = new Tone.Vibrato({ frequency: 2, depth: 0.1 }).connect(masterGain);
      const filter = new Tone.Filter(1000, "lowpass").connect(vibrato);
      const chorus = new Tone.Chorus(4, 2.5, 0.4).connect(filter).start();
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "triangle" },
        envelope: { attack: 1.5, decay: 0.5, sustain: 0.8, release: 2 }
      }).connect(chorus);
      synth.maxPolyphony = 10;
      newNodes.push(vibrato, filter, chorus);
    }
    else if (texture === "surf-tremolo") {
      const reverb = new Tone.Freeverb({ roomSize: 0.8, dampening: 4000 }).connect(masterGain);
      const tremolo = new Tone.Tremolo(4, 0.8).connect(reverb).start();
      const filter = new Tone.Filter(1500, "lowpass").connect(tremolo);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "triangle" },
        envelope: { attack: 0.8, decay: 0.2, sustain: 0.8, release: 2 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(reverb, tremolo, filter);
    }
    else if (texture === "vintage-keys") {
      const phaser = new Tone.Phaser({ frequency: 0.5, octaves: 2, baseFrequency: 400 }).connect(masterGain);
      const chorus = new Tone.Chorus(2, 3, 0.6).connect(phaser).start();
      const filter = new Tone.Filter(800, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 2,
        modulationIndex: 1.5,
        oscillator: { type: "sine" },
        modulation: { type: "square" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1.5 },
        modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(phaser, chorus, filter);
    }
    else if (texture === "dub-sub") {
      const filter = new Tone.Filter(150, "lowpass", -24).connect(masterGain);
      synth = new Tone.PolySynth(Tone.FMSynth, {
        volume: -14,
        harmonicity: 1, modulationIndex: 0.5,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 0.5, decay: 0.2, sustain: 1, release: 1 },
        modulationEnvelope: { attack: 0.5, decay: 0.2, sustain: 1, release: 1 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      newNodes.push(filter);
    }
    else if (texture === "warm") {
      // Warm pad: rich sound with minimal CPU — single oscillator + chorus for width
      const reverb = new Tone.Freeverb({ roomSize: 0.6, dampening: 2500 }).connect(masterGain);
      const chorus = new Tone.Chorus({ frequency: 0.8, delayTime: 4, depth: 0.6 }).connect(reverb).start();
      const filter = new Tone.Filter(700, "lowpass").connect(chorus);
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "triangle" },
        envelope: { attack: 2.5, decay: 0.3, sustain: 0.9, release: 2.5 }
      }).connect(filter);
      synth.maxPolyphony = 10;
      const lfo = new Tone.LFO(0.06, 400, 800).connect(filter.frequency).start();
      newNodes.push(reverb, chorus, filter, lfo);
    }

    // Fallback for unknown textures — default to pure sine
    if (!synth) {
      synth = new Tone.PolySynth(Tone.Synth, {
        volume: -14,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 0, sustain: 1, release: 2 }
      }).connect(masterGain);
      synth.maxPolyphony = 10;
    }

    effectSynth = synth;
    effectNodes = newNodes;
    synthRef.current = synth;

    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
      if (chordNotes) synth.triggerAttack(chordNotes);
      previousNotesRef.current = chordNotes || [];
    }

    return () => {
      // Fade out the old chain smoothly before disposing to prevent clicks
      const oldUserGain = userGainRef.current;
      if (oldUserGain) {
        try {
          oldUserGain.gain.cancelScheduledValues(Tone.now());
          oldUserGain.gain.rampTo(0, 0.05);
        } catch {}
      }
      if (effectSynth) {
        // Wait for fade, then release voices
        setTimeout(() => {
          try { effectSynth.releaseAll(); } catch {}
        }, 80);
        // Wait for release tails to decay, then stop + dispose everything
        setTimeout(() => {
          try { effectSynth.dispose(); } catch {}
          effectNodes.forEach(node => {
            // Stop effects with internal oscillators (Chorus, Tremolo, LFO) before disposal
            try { if (node.stop) node.stop(); } catch {}
            try { node.dispose(); } catch {}
          });
        }, 2500);
      }
    };
  }, [texture]); // re-run only when texture changes

  useEffect(() => {
    if (userGainRef.current) {
      try { userGainRef.current.gain.cancelScheduledValues(Tone.now()); } catch {}
      userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.1);
    }
  }, [volume]);

  const toggleDrone = async () => {
    if (!synthRef.current) return;
    // Ensure audio context is running (may need user gesture on mobile)
    if (Tone.context.state !== "running") {
      try { await Tone.start(); } catch {}
      try { await Tone.context.resume(); } catch {}
    }

    if (playing) {
      stoppedRef.current = true;
      // Stop worker timer (NOT Tone.Transport — drone uses its own timer)
      if (workerRef.current) {
        workerRef.current.postMessage({ cmd: 'stop' });
        terminateWorker(workerRef.current);
        workerRef.current = null;
      }
      // Stop periodic refresh
      if (refreshRef.current) { clearInterval(refreshRef.current); refreshRef.current = null; }
      // Smooth fade out to prevent click, then release voices
      if (userGainRef.current) {
        try {
          userGainRef.current.gain.cancelScheduledValues(Tone.now());
          userGainRef.current.gain.rampTo(0, 0.1);
        } catch {}
      }
      setTimeout(() => {
        try { synthRef.current?.releaseAll(); } catch {}
        previousNotesRef.current = [];
      }, 120);
      // Stop background audio keepalive and clear media session
      releaseKeepalive();
      clearMediaSession();
      setPlaying(false);
      onActiveNotesChangeRef.current?.({ notes: [], label: "" });
      setActiveStep(-1);
    } else {
      stoppedRef.current = false;
      setEditingIndex(null);
      if (mode === "cycle") {
        const pRef = progressionRef.current;
        if (pRef.length === 0) return;

        previousNotesRef.current = [];
        stepCountRef.current = 0;

        // Play a chord at the current step (reads from refs, always current)
        const playStep = () => {
          if (stoppedRef.current || !synthRef.current || synthRef.current.disposed) return;
          const currentProg = progressionRef.current;
          if (currentProg.length === 0) return;

          const idx = stepCountRef.current % currentProg.length;
          const rawChord = currentProg[idx];
          const match = rawChord.match(/^[A-G][#♭b]?/);
          const r = match ? match[0].replace('b', '♭') : "C";
          const chordNotes = parseChordToNotes(rawChord, octaveRef.current, "chord");

          if (chordNotes) {
            // Release all → immediately attack new chord. The envelope handles
            // the crossfade: old notes fade via release tail, new notes ramp via attack.
            // Works for ANY chord combination — no note diffing needed.
            synthRef.current.releaseAll();
            synthRef.current.triggerAttack(chordNotes);
            previousNotesRef.current = chordNotes;
          } else {
            synthRef.current.releaseAll();
            previousNotesRef.current = [];
          }

          // Visual update
          setRoot(r);
          setActiveStep(idx);
          onActiveNotesChangeRef.current?.({ notes: chordNotes || [], label: rawChord });

          stepCountRef.current++;
        };

        // Smooth fade in to prevent click
        if (userGainRef.current) { userGainRef.current.gain.value = 0; }
        // Play first chord immediately
        playStep();
        if (userGainRef.current) { userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.05); }
        // Web Worker timer — immune to background tab throttling, independent of Tone.Transport
        workerRef.current = createTimerWorker();
        lastWorkerTickRef.current = performance.now();
        workerRef.current.onmessage = () => {
          // Debounce: skip rapid-fire catch-up ticks after screen-off resume
          const now = performance.now();
          const minGap = stepToMs(stepDurationRef.current) * 0.5;
          if (now - lastWorkerTickRef.current < minGap) return;
          lastWorkerTickRef.current = now;
          playStep();
        };
        workerRef.current.postMessage({ cmd: 'start', ms: stepToMs(stepDurationRef.current) });

      } else {
        // Smooth fade in to prevent click
        if (userGainRef.current) { userGainRef.current.gain.value = 0; }
        const chordNotes = parseChordToNotes(root, octaveRef.current, mode === "single" ? "single" : "chord");
        if (chordNotes) synthRef.current.triggerAttack(chordNotes);
        if (userGainRef.current) { userGainRef.current.gain.rampTo(Tone.dbToGain(volume), 0.05); }
        previousNotesRef.current = chordNotes || [];
        onActiveNotesChangeRef.current?.({ notes: chordNotes || [], label: root });
      }
      // Periodic refresh: re-trigger held notes every 3 min to prevent oscillator drift / voice degradation.
      // In cycle mode the Worker already re-triggers regularly, so this is only for manual/single.
      if (refreshRef.current) clearInterval(refreshRef.current);
      if (mode !== "cycle") {
        refreshRef.current = setInterval(() => {
          if (stoppedRef.current || !synthRef.current || synthRef.current.disposed) return;
          const notes = previousNotesRef.current;
          if (notes.length > 0) {
            synthRef.current.releaseAll();
            synthRef.current.triggerAttack(notes);
          }
        }, 3 * 60 * 1000);
      }
      // Start background audio keepalive so screen-off doesn't kill the AudioContext
      acquireKeepalive();
      setMediaSession('Harmonic Drone', 'Practice', {
        pause: () => toggleDrone(),
        play: () => toggleDrone(),
      });
      setPlaying(true);
    }
  };

  const changeRoot = (n) => {
    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(n, octaveRef.current, mode === "single" ? "single" : "chord");
      if (chordNotes && synthRef.current) {
        try {
          synthRef.current.releaseAll();
          synthRef.current.triggerAttack(chordNotes);
          previousNotesRef.current = chordNotes;
        } catch {}
        onActiveNotesChangeRef.current?.({ notes: chordNotes, label: n });
      }
    }
    setRoot(n);
  };

  const changeOctave = (oct) => {
    setOctave(oct);
    if (playing && (mode === "manual" || mode === "single")) {
      const chordNotes = parseChordToNotes(root, oct, mode === "single" ? "single" : "chord");
      if (chordNotes && synthRef.current) {
        try {
          synthRef.current.releaseAll();
          synthRef.current.triggerAttack(chordNotes);
          previousNotesRef.current = chordNotes;
        } catch {}
        onActiveNotesChangeRef.current?.({ notes: chordNotes, label: root });
      }
    }
  };

  const getParsedChord = (chordStr) => {
    if (!chordStr) return { base: "C", ext: "" };
    // match base like C, F#m, Bbm. Exclude 'm' if it's part of 'maj'
    const match = chordStr.trim().match(/^([A-G][#b♭]?(?:m(?!aj))?)(.*)$/i);
    if (match) {
      return { base: match[1], ext: match[2] || "" };
    }
    return { base: "C", ext: "" };
  };

  return (
    <div style={{
      position: "relative",
      background: playing ? T.bgSoft : T.bgCard, 
      border: `1px solid ${playing ? T.plum : T.borderSoft}`,
      boxShadow: playing ? `inset 0 2px 10px ${T.bgSoft}, 0 0 20px ${T.plum}20` : T.shadow,
      padding: "40px 24px", textAlign: "center", borderRadius: T.radius,
      transition: "all 0.4s", overflow: "hidden", margin: "10px 0"
    }}>
      {/* Subtle SVG Grid Background */}
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.08 }}>
        <pattern id="drone-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={T.plum} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#drone-grid)" />
      </svg>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 10, color: playing ? T.plum : T.textMuted, fontWeight: 800, letterSpacing: 3, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 12, transition: "color 0.4s" }}>
          Harmonic Drone Engine
        </div>
        <div style={{ fontSize: 12, color: T.textMed, fontFamily: T.sans, marginBottom: 24, fontStyle: "italic" }}>
          Continuous harmonic foundation for ear training.
        </div>
        
        {/* Texture Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", maxWidth: 500, margin: "0 auto 24px" }}>
          {[
            { id: "analog", label: "Analog Pad" },
            { id: "choir", label: "Ethereal Choir" },
            { id: "organ", label: "Harmonium" },
            { id: "pure", label: "Pure Sine" },
            { id: "strings", label: "Strings" },
            { id: "tanpura", label: "Tanpura" },
            { id: "crystal", label: "Crystal Bowl" },
            { id: "lofi-tape", label: "Lo-Fi Tape" },
            { id: "surf-tremolo", label: "Surf Tremolo" },
            { id: "vintage-keys", label: "Vintage Keys" },
            { id: "dub-sub", label: "Dub Sub" },
            { id: "warm", label: "Warm Pad" }
          ].map(t => (
            <button key={t.id} onClick={() => setTexture(t.id)} style={{
              background: texture === t.id ? T.plum : T.bgSoft,
              border: `1px solid ${texture === t.id ? T.plum : T.border}`,
              color: texture === t.id ? "#fff" : T.textMed,
              padding: "8px 16px", borderRadius: T.radius, fontSize: 11, fontWeight: 700,
              cursor: "pointer", fontFamily: T.sans, letterSpacing: 0.5,
              boxShadow: texture === t.id ? `0 4px 12px ${T.plum}40` : "none",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseOver={e => { if(texture !== t.id) { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; } }}
            onMouseOut={e => { if(texture !== t.id) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMed; } }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Mode Selector */}
        <div style={{ display: "inline-flex", background: T.bgSoft, borderRadius: T.radiusMd, padding: 4, border: `1px solid ${T.border}`, marginBottom: 32 }}>
          <button onClick={() => { setMode("single"); if(playing) toggleDrone(); }} style={{
            background: mode === "single" ? T.bgCard : "transparent",
            color: mode === "single" ? T.textDark : T.textMed,
            boxShadow: mode === "single" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Single Note</button>
          <button onClick={() => { setMode("manual"); if(playing) toggleDrone(); }} style={{
            background: mode === "manual" ? T.bgCard : "transparent",
            color: mode === "manual" ? T.textDark : T.textMed,
            boxShadow: mode === "manual" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Chords</button>
          <button onClick={() => { setMode("cycle"); if(playing) toggleDrone(); }} style={{
            background: mode === "cycle" ? T.bgCard : "transparent",
            color: mode === "cycle" ? T.textDark : T.textMed,
            boxShadow: mode === "cycle" ? T.sm : "none",
            border: "none", padding: "8px 20px", borderRadius: T.radius, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s"
          }}>Sequence</button>
        </div>

      {mode === "single" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, maxWidth: 360, margin: "0 auto 24px" }}>
          {notes.map(n => {
            const isActive = root === n;
            return (
              <button key={n} onClick={() => changeRoot(n)} style={{
                width: "100%", aspectRatio: "1", borderRadius: T.radius,
                background: isActive ? T.plum : T.bgSoft,
                border: `1px solid ${isActive ? T.plum : T.borderSoft}`,
                color: isActive ? "#fff" : T.textMed,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: isActive ? `0 4px 12px ${T.plum}40` : "none"
              }}
              onMouseOver={e => { if(!isActive) { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; } e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseOut={e => { if(!isActive) { e.currentTarget.style.borderColor = T.borderSoft; e.currentTarget.style.color = T.textMed; } e.currentTarget.style.transform = "scale(1)"; }}
              >
                {n}
              </button>
            );
          })}
        </div>
      ) : mode === "manual" ? (
        <div style={{ marginBottom: 40 }}>
          <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto 40px" }}>
            {/* SVG Background for aesthetic celestial map look */}
            <svg width="280" height="280" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.2 }}>
              <circle cx="140" cy="140" r="115" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="140" cy="140" r="70" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="2 4" />
              {CIRCLE_OF_FIFTHS.map((_, i) => {
                const rad = ((i * 30) - 90) * (Math.PI / 180);
                return (
                  <line 
                    key={i}
                    x1={140 + Math.cos(rad) * 70} 
                    y1={140 + Math.sin(rad) * 70} 
                    x2={140 + Math.cos(rad) * 115} 
                    y2={140 + Math.sin(rad) * 115} 
                    stroke={T.textMed} strokeWidth="1" 
                  />
                );
              })}
            </svg>

            <div style={{ 
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
              width: 86, height: 86, borderRadius: "50%", background: playing ? T.bgSoft : T.bgCard,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: playing ? `inset 0 2px 10px ${T.bgSoft}, 0 0 24px ${T.plum}50` : `inset 0 2px 10px ${T.bgSoft}, 0 4px 16px rgba(0,0,0,0.1)`,
              border: `2px solid ${playing ? T.plum : T.borderSoft}`,
              transition: "all 0.4s"
            }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: playing ? T.plum : T.textMed, fontFamily: T.sans, lineHeight: 1.1 }}>{root}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textAlign: "center", padding: "0 4px" }}>
                {getChordSpelling(root)}
              </div>
            </div>

            {CIRCLE_OF_FIFTHS.map(({ major, minor, angle }) => {
              const rad = (angle - 90) * (Math.PI / 180);
              const outerX = 140 + Math.cos(rad) * 115;
              const outerY = 140 + Math.sin(rad) * 115;
              const innerX = 140 + Math.cos(rad) * 70;
              const innerY = 140 + Math.sin(rad) * 70;
              
              const { base: currentBase, ext: currentExt } = getParsedChord(root);
              const isMajorActive = currentBase === major;
              const isMinorActive = currentBase === minor;

              return (
                <React.Fragment key={major}>
                  <button onClick={() => changeRoot(`${major}${currentExt}`)} style={{
                    position: "absolute", left: outerX, top: outerY, transform: "translate(-50%, -50%)",
                    width: 42, height: 42, borderRadius: "50%",
                    background: isMajorActive ? T.plum : T.bgSoft,
                    color: isMajorActive ? "#fff" : T.textDark,
                    border: `1px solid ${isMajorActive ? T.plum : T.border}`,
                    fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: isMajorActive ? `0 0 16px ${T.plum}80, 0 4px 8px rgba(0,0,0,0.2)` : `0 2px 6px rgba(0,0,0,0.05)`,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: isMajorActive ? 10 : 1
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                  >{major}</button>
                  
                  <button onClick={() => {
                    let validExt = currentExt;
                    if (validExt === 'maj7' || validExt === 'aug') validExt = '';
                    changeRoot(`${minor}${validExt}`)
                  }} style={{
                    position: "absolute", left: innerX, top: innerY, transform: "translate(-50%, -50%)",
                    width: 36, height: 36, borderRadius: "50%",
                    background: isMinorActive ? T.coral : T.bgCard,
                    color: isMinorActive ? "#fff" : T.textMed,
                    border: `1px solid ${isMinorActive ? T.coral : T.borderSoft}`,
                    fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: isMinorActive ? `0 0 12px ${T.coral}80, 0 4px 6px rgba(0,0,0,0.2)` : `0 2px 4px rgba(0,0,0,0.05)`,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: isMinorActive ? 10 : 1
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                  onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                  >{minor}</button>
                </React.Fragment>
              )
            })}
          </div>

          {/* Quality Extenders */}
          <div style={{ textAlign: "center", marginBottom: 12, fontSize: 11, fontWeight: 800, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
            Extensions / Modifications
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {(() => {
              const { base: currentBase, ext: currentExt } = getParsedChord(root);
              const isMinor = currentBase.endsWith('m');
              const exts = isMinor ? [
                { label: "None", val: "" },
                { label: "7", val: "7" },
                { label: "Sus2", val: "sus2" },
                { label: "Sus4", val: "sus4" },
                { label: "Dim", val: "dim" }
              ] : [
                { label: "None", val: "" },
                { label: "7", val: "7" },
                { label: "Maj7", val: "maj7" },
                { label: "Sus2", val: "sus2" },
                { label: "Sus4", val: "sus4" },
                { label: "Dim", val: "dim" },
                { label: "Aug", val: "aug" }
              ];
              return exts.map(ext => {
                const isExtActive = currentExt === ext.val;
                return (
                  <button key={ext.label} onClick={() => {
                    changeRoot(`${currentBase}${ext.val}`);
                  }} style={{
                    padding: "8px 16px", borderRadius: T.radius,
                    background: isExtActive ? T.textDark : T.bgSoft, 
                    color: isExtActive ? "#ffffff" : T.textDark, 
                    border: `1px solid ${isExtActive ? T.textDark : T.border}`,
                    fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                    transition: "all 0.2s", boxShadow: isExtActive ? T.sm : "none"
                  }}>
                    {ext.label}
                  </button>
                )
              });
            })()}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 460, margin: "0 auto 24px", background: "#ffffff", padding: "24px", borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow }}>

          {/* Genre Preset Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12, textAlign: "center" }}>
              Presets
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {DRONE_PRESETS.map(p => {
                const isActive = activePreset === p.id;
                return (
                  <button key={p.id} onClick={() => {
                    if (playing) return;
                    setProgression([...p.chords]);
                    setBpm(p.bpm);
                    setStepDuration(p.stepDuration);
                    setActivePreset(p.id);
                    setEditingIndex(null);
                  }} style={{
                    padding: "8px 16px", borderRadius: T.radius, fontSize: 11, fontWeight: 700,
                    background: isActive ? T.plum : T.bgSoft,
                    color: isActive ? "#fff" : T.textDark,
                    border: `1px solid ${isActive ? T.plum : T.border}`,
                    cursor: playing ? "not-allowed" : "pointer", fontFamily: T.sans,
                    opacity: playing ? 0.5 : 1,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isActive ? `0 4px 12px ${T.plum}40` : "none"
                  }}
                  onMouseOver={e => { if(!isActive && !playing) { e.currentTarget.style.borderColor = T.textMed; } }}
                  onMouseOut={e => { if(!isActive && !playing) { e.currentTarget.style.borderColor = T.border; } }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progression Sequence Visualizer */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16, minHeight: 40 }}>
            {progression.length === 0 ? (
              <div style={{ fontSize: 13, color: T.textMuted, fontStyle: "italic", fontFamily: T.sans, width: "100%", textAlign: "center", alignSelf: "center" }}>Empty sequence. Add a chord.</div>
            ) : (
              progression.map((chord, i) => {
                const isActive = playing && i === activeStep;
                const isEditing = i === editingIndex;
                return (
                  <button key={i} onClick={() => setEditingIndex(isEditing ? null : i)} style={{
                    padding: "10px 16px", borderRadius: T.radius, fontSize: 15, fontWeight: 800, fontFamily: T.sans,
                    background: isActive ? T.plum : (isEditing ? "#ffffff" : T.bgSoft),
                    color: isActive ? "#fff" : (isEditing ? T.textDark : T.textDark),
                    border: `2px solid ${isActive ? T.plum : (isEditing ? T.coral : T.border)}`,
                    boxShadow: isActive ? `0 4px 16px ${T.plum}60` : "none",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}>
                    {chord}
                  </button>
                );
              })
            )}
            <button onClick={() => {
               const newProg = [...progression, "C"];
               setProgression(newProg);
               setEditingIndex(newProg.length - 1);
               setActivePreset(null);
            }} style={{
               padding: "10px 16px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
               background: T.bgSoft, color: T.textDark, border: `2px dashed ${T.border}`, cursor: "pointer",
               transition: "all 0.2s"
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = T.textMed; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = T.border; }}
            >+ Add</button>

            {progression.length > 0 && (
              <button onClick={() => {
                setProgression([]);
                setEditingIndex(null);
                setActivePreset(null);
              }} style={{
                padding: "10px 16px", borderRadius: T.radius, fontSize: 12, fontWeight: 800, fontFamily: T.sans,
                background: "transparent", color: T.coral, border: `1px solid ${T.coral}40`, cursor: "pointer",
                transition: "all 0.2s", letterSpacing: 1, textTransform: "uppercase"
              }}
              onMouseOver={e => { e.currentTarget.style.background = T.coral + "10"; e.currentTarget.style.borderColor = T.coral; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.coral + "40"; }}
              >Clear</button>
            )}

            {progression.length > 0 && (
              <div style={{ display: "flex", gap: 4, marginLeft: "auto", alignSelf: "center", borderLeft: `1px solid ${T.border}`, paddingLeft: 12 }}>
                <button onClick={() => {
                  setProgression(progression.map(c => transposeChord(c, -1)));
                  setActivePreset(null);
                }} style={{
                  padding: "8px 12px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
                  background: T.bgSoft, color: T.textMed, border: `1px solid ${T.border}`, cursor: "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                }} title="Transpose Down (Half-Step)">-</button>
                <div style={{ fontSize: 11, fontWeight: 800, color: T.textMuted, alignSelf: "center", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: T.sans, margin: "0 4px" }}>Key</div>
                <button onClick={() => {
                  setProgression(progression.map(c => transposeChord(c, 1)));
                  setActivePreset(null);
                }} style={{
                  padding: "8px 12px", borderRadius: T.radius, fontSize: 14, fontWeight: 800, fontFamily: T.sans,
                  background: T.bgSoft, color: T.textMed, border: `1px solid ${T.border}`, cursor: "pointer",
                  transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center"
                }} title="Transpose Up (Half-Step)">+</button>
              </div>
            )}
          </div>
          

          <div style={{ fontSize: 12, color: T.textMuted, textAlign: "center", marginBottom: editingIndex !== null ? 24 : 0, fontFamily: T.sans, fontStyle: "italic" }}>
             {editingIndex === null ? "Click a chord block above to edit it" : ""}
          </div>

          {/* Inline Chord Editor Modal */}
          {editingIndex !== null && (
            <div ref={el => { if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100); }} style={{ marginBottom: 24, background: T.bgSoft, padding: "24px", borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
                  Editing Step {editingIndex + 1}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => {
                    const newProg = [...progression];
                    newProg.splice(editingIndex, 1);
                    setProgression(newProg);
                    setEditingIndex(null);
                    setActivePreset(null);
                  }} style={{ fontSize: 12, color: T.coral, background: T.bgSoft, border: "none", cursor: "pointer", fontWeight: 800, fontFamily: T.sans, padding: "6px 12px", borderRadius: T.radius }}>
                    Remove
                  </button>
                  <button onClick={() => setEditingIndex(null)} style={{ fontSize: 12, color: T.plum, background: T.bgSoft, border: "none", cursor: "pointer", fontWeight: 800, fontFamily: T.sans, padding: "6px 12px", borderRadius: T.radius }}>
                    Done
                  </button>
                </div>
              </div>
              
              {/* Circle of Fifths Selector */}
              <div style={{ position: "relative", width: 280, height: 280, margin: "0 auto 40px" }}>
                
                {/* SVG Background for aesthetic celestial map look */}
                <svg width="280" height="280" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.2 }}>
                  <circle cx="140" cy="140" r="115" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="140" cy="140" r="70" fill="none" stroke={T.textMed} strokeWidth="1" strokeDasharray="2 4" />
                  {CIRCLE_OF_FIFTHS.map((_, i) => {
                    const rad = ((i * 30) - 90) * (Math.PI / 180);
                    return (
                      <line 
                        key={i}
                        x1={140 + Math.cos(rad) * 70} 
                        y1={140 + Math.sin(rad) * 70} 
                        x2={140 + Math.cos(rad) * 115} 
                        y2={140 + Math.sin(rad) * 115} 
                        stroke={T.textMed} strokeWidth="1" 
                      />
                    );
                  })}
                </svg>

                <div style={{ 
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
                  width: 86, height: 86, borderRadius: "50%", background: "#ffffff",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  boxShadow: `inset 0 2px 10px ${T.bgSoft}, 0 4px 16px rgba(0,0,0,0.1)`,
                  border: `2px solid ${T.borderSoft}`
                }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: T.plum, fontFamily: T.sans, lineHeight: 1.1 }}>{progression[editingIndex] || "C"}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textAlign: "center", padding: "0 4px" }}>
                    {getChordSpelling(progression[editingIndex] || "C")}
                  </div>
                </div>

                {CIRCLE_OF_FIFTHS.map(({ major, minor, angle }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const outerX = 140 + Math.cos(rad) * 115;
                  const outerY = 140 + Math.sin(rad) * 115;
                  const innerX = 140 + Math.cos(rad) * 70;
                  const innerY = 140 + Math.sin(rad) * 70;
                  
                  const currentChord = progression[editingIndex] || "C";
                  const { base: currentBase, ext: currentExt } = getParsedChord(currentChord);
                  
                  const isMajorActive = currentBase === major;
                  const isMinorActive = currentBase === minor;

                  return (
                    <React.Fragment key={major}>
                      <button onClick={() => {
                        const newProg = [...progression];
                        newProg[editingIndex] = `${major}${currentExt}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        position: "absolute", left: outerX, top: outerY, transform: "translate(-50%, -50%)",
                        width: 42, height: 42, borderRadius: "50%",
                        background: isMajorActive ? T.plum : T.bgSoft,
                        color: isMajorActive ? "#fff" : T.textDark,
                        border: `1px solid ${isMajorActive ? T.plum : T.border}`,
                        fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                        boxShadow: isMajorActive ? `0 0 16px ${T.plum}80, 0 4px 8px rgba(0,0,0,0.2)` : `0 2px 6px rgba(0,0,0,0.05)`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: isMajorActive ? 10 : 1
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                      >{major}</button>
                      
                      <button onClick={() => {
                        const newProg = [...progression];
                        let validExt = currentExt;
                        if (validExt === 'maj7' || validExt === 'aug') validExt = '';
                        newProg[editingIndex] = `${minor}${validExt}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        position: "absolute", left: innerX, top: innerY, transform: "translate(-50%, -50%)",
                        width: 36, height: 36, borderRadius: "50%",
                        background: isMinorActive ? T.coral : T.bgSoft,
                        color: isMinorActive ? "#fff" : T.textDark,
                        border: `1px solid ${isMinorActive ? T.coral : T.borderSoft}`,
                        fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                        boxShadow: isMinorActive ? `0 0 12px ${T.coral}80, 0 4px 6px rgba(0,0,0,0.2)` : `0 2px 4px rgba(0,0,0,0.05)`,
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        zIndex: isMinorActive ? 10 : 1
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.15)"}
                      onMouseOut={e => e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)"}
                      >{minor}</button>
                    </React.Fragment>
                  )
                })}
              </div>

              {/* Quality Extenders */}
              <div style={{ textAlign: "center", marginBottom: 12, fontSize: 11, fontWeight: 800, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>
                Extensions / Modifications
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {(() => {
                  const currentChord = progression[editingIndex] || "C";
                  const { base: currentBase, ext: currentExt } = getParsedChord(currentChord);
                  const isMinor = currentBase.endsWith('m');
                  const exts = isMinor ? [
                    { label: "None", val: "" },
                    { label: "7", val: "7" },
                    { label: "Sus2", val: "sus2" },
                    { label: "Sus4", val: "sus4" },
                    { label: "Dim", val: "dim" }
                  ] : [
                    { label: "None", val: "" },
                    { label: "7", val: "7" },
                    { label: "Maj7", val: "maj7" },
                    { label: "Sus2", val: "sus2" },
                    { label: "Sus4", val: "sus4" },
                    { label: "Dim", val: "dim" },
                    { label: "Aug", val: "aug" }
                  ];
                  return exts.map(ext => {
                    const isExtActive = currentExt === ext.val;
                    return (
                      <button key={ext.label} onClick={() => {
                        const newProg = [...progression];
                        newProg[editingIndex] = `${currentBase}${ext.val}`;
                        setProgression(newProg);
                        setActivePreset(null);
                      }} style={{
                        padding: "8px 16px", borderRadius: T.radius,
                        background: isExtActive ? T.textDark : T.bgSoft, 
                        color: isExtActive ? "#ffffff" : T.textDark, 
                        border: `1px solid ${isExtActive ? T.textDark : T.border}`,
                        fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
                        transition: "all 0.2s", boxShadow: isExtActive ? T.sm : "none"
                      }}>
                        {ext.label}
                      </button>
                    )
                  });
                })()}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Universal Control Deck & Engine Starter */}
      <div style={{ maxWidth: 460, margin: "0 auto", background: T.bgCard, borderRadius: T.radiusLg, border: `1px solid ${T.borderSoft}`, boxShadow: T.shadow, overflow: 'hidden' }}>
        
        {/* Settings Deck */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {/* Octave Base */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 }}>Octave</div>
              <div style={{ display: "flex", background: T.bgSoft, borderRadius: T.radius, padding: 4, border: `1px solid ${T.borderSoft}` }}>
                {[1, 2, 3, 4].map(o => (
                  <button key={o} onClick={() => changeOctave(o)} style={{
                    flex: 1, background: octave === o ? T.textDark : "transparent",
                    color: octave === o ? "#fff" : T.textMed,
                    border: "none",
                    borderRadius: T.radius - 2, padding: "8px 0", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                    boxShadow: octave === o ? T.sm : "none", transition: "all 0.2s"
                  }}>{o}</button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 2 }}>Volume</div>
                <div style={{ fontSize: 11, color: playing ? T.plum : T.textMuted, fontWeight: 800, fontFamily: T.sans, fontVariantNumeric: "tabular-nums", transition: "color 0.4s" }}>{volume} dB</div>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: T.bgSoft, borderRadius: 3, border: `1px solid ${T.borderSoft}`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", left: 0, width: `${(volume + 40) / 40 * 100}%`, height: 6, background: playing ? T.plum : T.textMed, borderRadius: 3, pointerEvents: "none", transition: "background 0.4s" }} />
                <input type="range" min={-40} max={0} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  style={{ width: "100%", opacity: 0, height: 24, cursor: "pointer", position: "relative", zIndex: 10 }} />
                {/* Custom Thumb */}
                <div style={{
                  position: "absolute", left: `calc(${(volume + 40) / 40 * 100}% - 8px)`, width: 16, height: 16,
                  background: "#fff", border: `2px solid ${playing ? T.plum : T.textMed}`, borderRadius: "50%", 
                  pointerEvents: "none", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", transition: "border-color 0.4s"
                }} />
              </div>
            </div>
          </div>

          {mode === "cycle" && (
            <>
              <div style={{ height: 1, background: T.borderSoft, width: "100%", margin: "0" }} />
              <div style={{ display: "flex", gap: 24 }}>
                {/* Step Duration */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Step Length</div>
                  <div style={{ display: "flex", background: T.bgSoft, borderRadius: T.radius, padding: 3, border: `1px solid ${T.borderSoft}`, gap: 2 }}>
                    {[
                      { value: "4n", label: "Beat" },
                      { value: "2n", label: "½ Bar" },
                      { value: "1m", label: "1 Bar" },
                      { value: "2m", label: "2 Bar" },
                      { value: "4m", label: "4 Bar" }
                    ].map(opt => (
                      <button key={opt.value} onClick={() => setStepDuration(opt.value)} style={{
                        flex: 1, background: stepDuration === opt.value ? T.plum : "transparent",
                        color: stepDuration === opt.value ? "#fff" : T.textMed,
                        border: "none", borderRadius: T.radius - 2, padding: "7px 2px",
                        fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: T.sans,
                        letterSpacing: 0.5, transition: "all 0.2s",
                        boxShadow: stepDuration === opt.value ? `0 2px 8px ${T.plum}40` : "none"
                      }}>{opt.label}</button>
                    ))}
                  </div>
                </div>
                {/* Tempo */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 800, fontFamily: T.sans, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>Tempo</div>
                  <div style={{ position: "relative" }}>
                    <input type="number" min={40} max={240} value={bpm} onChange={e => setBpm(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: T.radius, border: `1px solid ${T.borderSoft}`, background: T.bgSoft, color: T.textDark, fontFamily: T.sans, fontSize: 13, outline: "none", fontWeight: 700, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)", paddingRight: 40 }} />
                    <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 800, color: T.textMuted, pointerEvents: "none" }}>BPM</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Huge Ignition Button */}
        <button onClick={toggleDrone} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          background: playing ? T.coral : T.plum, color: "#fff",
          padding: "24px", fontSize: 16, fontWeight: 800, cursor: "pointer", border: "none", borderTop: `1px solid ${playing ? T.coral : T.plum}`,
          fontFamily: T.sans, letterSpacing: 3, textTransform: "uppercase",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        onMouseOver={e => e.currentTarget.style.filter = "brightness(1.1)"}
        onMouseOut={e => e.currentTarget.style.filter = "brightness(1)"}
        >
          {playing ? (
            <><div style={{ width: 12, height: 12, background: "#fff", borderRadius: 2 }} /> STOP ENGINE</>
          ) : (
            <><div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid #fff" }} /> IGNITE {mode === "cycle" ? "SEQUENCE" : "DRONE"}</>
          )}
        </button>
      </div>
    </div>
    </div>
  );
}
