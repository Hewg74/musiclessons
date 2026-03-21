import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import confetti from "canvas-confetti";
import { 
  Drum, Guitar, Mic2, Ear, Music, Circle, Sparkles, Piano, Repeat, 
  ChevronDown, Play, Pause, RotateCcw, CheckCircle2, Clock, MapPin, Wrench,
  Mic, Headphones, Info, AlertCircle, Quote, ArrowRight, Check, 
  Volume2, Sun, Moon
} from 'lucide-react';
import { MiniAudioPlayer, AudioPlayer, FlightCheck, OfflineTabs, AudioRecorder, PitchPipe, LivePitchDetector, FretboardDiagram, ChordVoicingViewer, extractChordsFromExercise, VolumeMeter, ChordTransitionTimer, GenreMetronome, SilenceScore, DroneGenerator, TAB_CONTENT, InlineKeyboard, RhythmCellCards, PhraseFormGuide, StrumChartBuilder, ChartListView, makeTemplateChart } from './JungleTools.jsx';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from './audioKeepalive.js';
import { DAYS, KEYBOARD_LEVELS, LOOPER_LEVELS, LESSON_POOL, ALL_NOTES, getPitchRange } from './data/appData.js';
import { WEEKLY_PLANS, CURRENT_WEEK } from './data/weeklyPlans/index.js';
import { VOCAL_LEVELS } from './data/vocalLevels/index.js';
import { GUITAR_STUDY } from './data/guitarStudy/index.js';
import { SINGER_SONGWRITER_LEVELS } from './data/singerSongwriter/index.js';

// ─── AUDIO CONTEXT CONFIG ──
// lookAhead 0.1s buffers against main-thread jank (React re-renders) without perceptible latency
try { Tone.getContext().lookAhead = 0.1; } catch { }

// ─── DESIGN SYSTEM (sarahglassmusic.com) ────────────────────────────
let T = {
  bg: "#ffffff", bgSoft: "#fdfbf9", bgCard: "#ffffff",
  border: "#eae1d9", borderSoft: "#f5f0ec",
  textDark: "#2c2825", textMed: "#59534e", textLight: "#8c867f", textMuted: "#b8b2ab",
  gold: "#d4a373", goldDark: "#b58454", goldSoft: "#f9f3ec", goldMed: "#e8d1b7",
  success: "#7f9e88", successSoft: "#f0f5f2",
  warm: "#d97d54", warmSoft: "#f9f0ec",
  coral: "#d68383", coralSoft: "#f9f0f0",
  plum: "#9e829c", plumSoft: "#f5f0f4",
  slate: "#6b8e9f", slateSoft: "#f0f4f6",
  serif: "'Playfair Display',serif",
  sans: "'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
  // Square corners to match her elegant layout
  radius: "2px",
  radiusMd: "6px",

  sm: "0 4px 12px rgba(44, 40, 37, 0.03)",
  md: "0 12px 32px rgba(44, 40, 37, 0.06), 0 4px 12px rgba(44, 40, 37, 0.02)",
};

// Helper for dynamic tinted backgrounds
T.getTint = (color, opacity = 0.03) => {
  if (!color) return T.bgSoft;
  // If color is hex, convert to rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Helper for dynamic tinted shadows
T.getShadow = (color, strength = 'sm') => {
  const opacity = strength === 'sm' ? 0.1 : 0.2;
  const blur = strength === 'sm' ? 12 : 32;
  const spread = strength === 'sm' ? 0 : 4;
  if (color && color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `0 ${blur/3}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return T[strength];
};

const LIGHT_THEME = { ...T };
const DARK_THEME = {
  ...T,
  bg: "#121212", bgSoft: "#1e1e1e", bgCard: "#181818",
  border: "#333333", borderSoft: "#222222",
  textDark: "#f5f5f5", textMed: "#cccccc", textLight: "#999999", textMuted: "#666666",
  goldSoft: "#3a2e22",
  successSoft: "#1e2b22",
  warmSoft: "#3b2216",
  coralSoft: "#3b1f1f",
  plumSoft: "#2e202d",
  slateSoft: "#1e2a30",
  sm: "0 4px 12px rgba(0,0,0,0.3)",
  md: "0 12px 32px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.2)",
};

let ACCENT_CONFIG = {}; // Will be initialized below

export function applyTheme(isDark) {
  Object.assign(T, isDark ? DARK_THEME : LIGHT_THEME);
  ACCENT_CONFIG.accent = { velocity: 1.0, pitchOffset: 0, label: "Accent", color: T.gold };
  ACCENT_CONFIG.normal = { velocity: 0.5, pitchOffset: 12, label: "Normal", color: T.textMed };
  ACCENT_CONFIG.ghost = { velocity: 0.2, pitchOffset: 12, label: "Ghost", color: T.textMuted };
  ACCENT_CONFIG.mute = { velocity: 0.0, pitchOffset: 0, label: "Mute", color: T.border };
}
// Initialize
applyTheme(false);

// Exercise type config
const TYPE = {
  rhythm: { label: "Rhythm", color: "#d97d54", icon: Drum },
  guitar: { label: "Guitar", color: "#6b8e9f", icon: Guitar },
  vocal: { label: "Voice", color: "#9e829c", icon: Mic2 },
  listen: { label: "Listen", color: "#7f9e88", icon: Ear },
  song: { label: "Song", color: "#d68383", icon: Music },
  record: { label: "Record", color: "#d4a373", icon: Circle },
  play: { label: "Free", color: "#72a8a8", icon: Sparkles },
  keys: { label: "Keys", color: "#5b7fa5", icon: Piano },
  looper: { label: "Looper", color: "#3d8b6e", icon: Repeat },
};

const DAY_COLORS = ["#d68383", "#d97d54", "#d4a373", "#7f9e88", "#72a8a8", "#6b8e9f", "#9e829c"];

// ─── DATA (imported from ./data/appData.js) ───────────────────────

// ─── SOUND KITS ─────────────────────────────────────────────────────
// Each kit defines synth params for Tone.js — different timbres
const SOUND_KITS = {
  modernClick: { label: "Modern Click", isSample: true, urls: { "G5": "sounds/new_click_high.wav", "C5": "sounds/new_click_low.wav" }, volume: 6, pitchAccent: "G5", pitchNormal: "C5" },
  mechanical: { label: "Mechanical", isSample: true, urls: { "G5": "sounds/new_mech_high.wav", "C5": "sounds/new_mech_low.wav" }, volume: 6, pitchAccent: "G5", pitchNormal: "C5" },
  wood: { label: "Woodblock", isSample: true, urls: { "G5": "sounds/new_wood_high.wav", "C5": "sounds/new_wood_low.wav" }, volume: 5, pitchAccent: "G5", pitchNormal: "C5" },
  chime: { label: "Chimes", isSample: true, urls: { "G5": "sounds/new_chime_high.wav", "C5": "sounds/new_chime_low.wav" }, volume: 5, pitchAccent: "G5", pitchNormal: "C5" },
  drums: { label: "Drum Kit", isSample: true, urls: { "G5": "sounds/kick.mp3", "C5": "sounds/hihat.mp3" }, volume: 6, pitchAccent: "G5", pitchNormal: "C5" },
  cowbell: { label: "Cowbell", isSample: true, urls: { "G5": "sounds/cowbell.mp3", "C5": "sounds/cowbell.mp3" }, volume: -2, pitchAccent: "G5", pitchNormal: "C5" },
  shaker: { label: "Shaker", isSample: true, urls: { "G5": "sounds/shaker.mp3", "C5": "sounds/shaker.mp3" }, volume: 2, pitchAccent: "G5", pitchNormal: "C5" },
  softTick: { label: "Soft Tick", synthType: "synth", osc: "sine", attack: 0.005, decay: 0.02, volume: 2, pitchAccent: "E5", pitchNormal: "C5", duration: "64n" },
  hihat: { label: "Synth Hi-Hat", isSample: true, urls: { "G5": "sounds/new_synthhat_high.wav", "C5": "sounds/new_synthhat_low.wav" }, volume: -2, pitchAccent: "G5", pitchNormal: "C5" },
  quartz: { label: "Quartz", isSample: true, urls: { "G5": "sounds/new_quartz_high.wav", "C5": "sounds/new_quartz_low.wav" }, volume: 0, pitchAccent: "G5", pitchNormal: "C5" },
  digitalBeep: { label: "Digital Beep", isSample: true, urls: { "G5": "sounds/new_beep_high.wav", "C5": "sounds/new_beep_low.wav" }, volume: 0, pitchAccent: "G5", pitchNormal: "C5" },
  rimshot: { label: "Rimshot", synthType: "membrane", osc: "square", pitchDecay: 0.02, octaves: 4, attack: 0.001, decay: 0.04, volume: -2, pitchAccent: "E4", pitchNormal: "A3", duration: "32n" },
  clave: { label: "Clave", synthType: "fm", osc: "sine", modOsc: "sine", harmonicity: 3.5, modIndex: 1, attack: 0.001, decay: 0.06, volume: 5, pitchAccent: "G5", pitchNormal: "D5", duration: "32n" },
};

const KIT_KEYS = Object.keys(SOUND_KITS);

// accent levels handled dynamically by applyTheme
// accent = loud downbeat, normal = standard, ghost = quiet, mute = silent
const ACCENT_LEVELS = ["accent", "normal", "ghost", "mute"];

function createSynth(kit) {
  const k = SOUND_KITS[kit];
  if (k.isSample) {
    return new Tone.Sampler({
      urls: k.urls,
      // Provide an empty baseUrl so it uses relative paths correctly in production and dev
      baseUrl: import.meta.env.BASE_URL,
      onload: () => console.log(`Loaded samples for ${kit}`),
      volume: k.volume || 0
    }).toDestination();
  }
  if (k.synthType === "noise") {
    return new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: k.attack, decay: k.decay, sustain: 0 },
      volume: k.volume
    }).toDestination();
  }
  if (k.synthType === "metal") {
    return new Tone.MetalSynth({
      frequency: k.frequency || 400, envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.01 },
      harmonicity: k.harmonicity || 5.1, modulationIndex: k.modIndex || 32, resonance: k.resonance || 4000, octaves: k.octaves, volume: k.volume
    }).toDestination();
  }
  if (k.synthType === "fm") {
    return new Tone.FMSynth({
      harmonicity: k.harmonicity || 3,
      modulationIndex: k.modIndex || 10,
      oscillator: { type: k.osc },
      envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.1 },
      modulation: { type: k.modOsc || "square" },
      modulationEnvelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.1 },
      volume: k.volume
    }).toDestination();
  }
  if (k.synthType === "synth") {
    return new Tone.Synth({
      oscillator: { type: k.osc },
      envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.1 },
      volume: k.volume
    }).toDestination();
  }
  // membrane (default)
  return new Tone.MembraneSynth({
    pitchDecay: k.pitchDecay, octaves: k.octaves,
    oscillator: { type: k.osc },
    envelope: { attack: k.attack, decay: k.decay, sustain: 0, release: 0.05 },
    volume: k.volume
  }).toDestination();
}

function triggerSynth(synth, kit, pitchNote, accConfig, time) {
  const k = SOUND_KITS[kit];
  const velocity = accConfig.velocity;
  
  if (velocity === 0) return; // Mute

  const dur = k.duration || "32n";

  if (k.isSample) {
    // For samples (chimes, woodblocks, drums), let the full sample play out naturally.
    // Using triggerAttackRelease with a short duration like "32n" causes an abrupt cutoff (crackle).
    synth.triggerAttack(pitchNote, time, velocity);
  } else if (k.synthType === "noise") {
    synth.triggerAttackRelease(dur, time, velocity);
  } else if (k.synthType === "metal") {
    synth.triggerAttackRelease(dur, time, velocity);
  } else {
    synth.triggerAttackRelease(pitchNote, dur, time, velocity);
  }
}

// ─── METRONOME ENGINE ───────────────────────────────────────────────
function useMetronome() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const beat = 0; // Dummy beat to satisfy return signature; actual beat is managed via events to prevent App re-renders
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [soundKit, setSoundKit] = useState("modernClick");
  const [gapClickActive, setGapClickActive] = useState(false);
  const [gapClickPlay, setGapClickPlay] = useState(3);
  const [gapClickMute, setGapClickMute] = useState(1);
  const [subdivision, setSubdivision] = useState("4n"); // "4n", "8n", "16n", "8t"
  const [speedBuilder, setSpeedBuilder] = useState(false);
  const [speedIncrement, setSpeedIncrement] = useState(5); // BPM added each cycle
  const [speedBars, setSpeedBars] = useState(4); // bars between each increment
  const [speedCeiling, setSpeedCeiling] = useState(0); // 0=no ceiling, otherwise max BPM before loop-back
  const startBpmRef = useRef(120); // BPM when speed builder was activated

  // Per-beat config: accent level + optional per-beat sound override
  const [beatConfig, setBeatConfig] = useState([
    { accent: "accent", kit: null },
    { accent: "normal", kit: null },
    { accent: "normal", kit: null },
    { accent: "normal", kit: null },
  ]);
  const loopRef = useRef(null);
  const synthsRef = useRef({});
  const beatConfigRef = useRef(beatConfig);
  const soundKitRef = useRef(soundKit);
  const beatsRef = useRef(beatsPerBar);
  const bpmRef = useRef(bpm);
  const gapClickActiveRef = useRef(gapClickActive);
  const gapClickPlayRef = useRef(gapClickPlay);
  const gapClickMuteRef = useRef(gapClickMute);
  const subdivisionRef = useRef(subdivision);
  const speedBuilderRef = useRef(speedBuilder);
  const speedIncrementRef = useRef(speedIncrement);
  const speedBarsRef = useRef(speedBars);
  const speedCeilingRef = useRef(speedCeiling);

  // Keep refs in sync
  useEffect(() => { beatConfigRef.current = beatConfig; }, [beatConfig]);
  useEffect(() => { soundKitRef.current = soundKit; }, [soundKit]);
  useEffect(() => { beatsRef.current = beatsPerBar; }, [beatsPerBar]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { gapClickActiveRef.current = gapClickActive; }, [gapClickActive]);
  useEffect(() => { gapClickPlayRef.current = gapClickPlay; }, [gapClickPlay]);
  useEffect(() => { gapClickMuteRef.current = gapClickMute; }, [gapClickMute]);
  useEffect(() => { subdivisionRef.current = subdivision; }, [subdivision]);
  useEffect(() => { speedBuilderRef.current = speedBuilder; }, [speedBuilder]);
  useEffect(() => { speedIncrementRef.current = speedIncrement; }, [speedIncrement]);
  useEffect(() => { speedBarsRef.current = speedBars; }, [speedBars]);
  useEffect(() => { speedCeilingRef.current = speedCeiling; }, [speedCeiling]);

  // Create/dispose synths when kits change
  useEffect(() => {
    // Build set of all kits we need
    const kitsNeeded = new Set([soundKit]);
    beatConfig.forEach(bc => { if (bc.kit) kitsNeeded.add(bc.kit); });
    // Create missing synths
    kitsNeeded.forEach(k => {
      if (!synthsRef.current[k]) synthsRef.current[k] = createSynth(k);
    });
    // Cleanup unused
    Object.keys(synthsRef.current).forEach(k => {
      if (!kitsNeeded.has(k)) { synthsRef.current[k]?.dispose(); delete synthsRef.current[k]; }
    });
    return () => {
      Object.values(synthsRef.current).forEach(s => s?.dispose());
      synthsRef.current = {};
    };
  }, [soundKit, beatConfig]);

  const start = useCallback(async () => {
    await Tone.start();
    acquireKeepalive();
    setMediaSession('Metronome', 'Practice');
    Tone.Transport.bpm.value = bpmRef.current;
    let count = 0;
    loopRef.current = new Tone.Loop((time) => {
      const cfg = beatConfigRef.current;
      const numBeats = beatsRef.current;
      const b = count % numBeats;
      const bc = cfg[b] || { accent: "normal", kit: null };
      const acc = ACCENT_CONFIG[bc.accent];

      const bar = Math.floor(count / numBeats);

      if (speedBuilderRef.current && b === 0 && bar > 0 && bar % speedBarsRef.current === 0) {
        const ceiling = speedCeilingRef.current;
        const nextBpm = bpmRef.current + speedIncrementRef.current;
        let newBpm;
        if (ceiling > 0 && nextBpm > ceiling) {
          newBpm = startBpmRef.current; // loop back to starting BPM
        } else {
          newBpm = Math.min(280, nextBpm);
        }
        bpmRef.current = newBpm;
        Tone.Transport.bpm.value = newBpm;
        Tone.Draw.schedule(() => setBpm(newBpm), time);
      }

      const gcActive = gapClickActiveRef.current;
      let isMute = bc.accent === "mute";
      if (gcActive) {
        const play = gapClickPlayRef.current;
        const mute = gapClickMuteRef.current;
        const cycle = play + mute;
        const pos = bar % cycle;
        if (pos >= play) {
          isMute = true;
        }
      }

      const subDiv = subdivisionRef.current;
      const subDivNum = subDiv === "8n" ? 2 : subDiv === "16n" ? 4 : subDiv === "8t" ? 3 : 1;
      
      for (let i = 0; i < subDivNum; i++) {
        const timeOffset = i * (Tone.Time("4n").toSeconds() / subDivNum);
        const subTime = time + timeOffset;
        
        if (i === 0) {
          if (!isMute) {
            const kit = bc.kit || soundKitRef.current;
            const synth = synthsRef.current[kit];
            if (synth && synth.loaded !== false) { // check for loaded if it's a sampler
              const basePitch = bc.accent === "accent" ? SOUND_KITS[kit].pitchAccent || "G5" : SOUND_KITS[kit].pitchNormal || "C5";
              triggerSynth(synth, kit, basePitch, acc, subTime);
            }
          }
          window.dispatchEvent(new CustomEvent('metroBeatAudio', { detail: { beat: b, bar, isMute, time: subTime } }));
        } else {
          if (!isMute) {
            const kit = bc.kit || soundKitRef.current;
            const synth = synthsRef.current[kit];
            if (synth && synth.loaded !== false) {
              const basePitch = SOUND_KITS[kit].pitchNormal || "C5";
              // Ghost velocity for subdivisions, unless it's a very light sound then normal
              triggerSynth(synth, kit, basePitch, ACCENT_CONFIG.ghost, subTime);
            }
          }
        }
      }

      // Visual-thread event: fires via rAF for smooth UI updates
      Tone.Draw.schedule(() => {
        window.dispatchEvent(new CustomEvent('metroBeat', { detail: { beat: b, bar, isMute } }));
      }, time);
      count++;
    }, "4n").start(0);
    Tone.Transport.start();
    playingRef.current = true;
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    loopRef.current?.stop(); loopRef.current?.dispose();
    Tone.Transport.stop(); Tone.Transport.position = 0;
    playingRef.current = false;
    setPlaying(false);
    releaseKeepalive();
    clearMediaSession();
    window.dispatchEvent(new CustomEvent('metroBeatAudio', { detail: { beat: 0 } }));
    window.dispatchEvent(new CustomEvent('metroBeat', { detail: { beat: 0 } }));
  }, []);

  // Screen off / app switch: stop Transport on hide to prevent event backlog,
  // clean restart on return so metronome resumes at correct tempo with no burst.
  useEffect(() => {
    const handleVisibility = async () => {
      if (!playingRef.current) return;
      if (document.hidden) {
        // Proactively pause Transport — prevents events from queueing during suspension
        Tone.Transport.pause();
      } else {
        // Returning — resume AudioContext first, then restart Transport cleanly
        try { await Tone.getContext().rawContext.resume(); } catch {}
        if (Tone.getContext().state !== "running") {
          try { await Tone.start(); } catch {}
        }
        Tone.Transport.stop();
        Tone.Transport.position = 0;
        Tone.Transport.bpm.value = bpmRef.current;
        Tone.Transport.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const changeBpm = useCallback((v) => {
    setBpm(v);
    bpmRef.current = v;
    Tone.Transport.bpm.value = v;
  }, []);

  const changeBeats = useCallback((n) => {
    setBeatsPerBar(n);
    setBeatConfig(prev => {
      const next = [];
      for (let i = 0; i < n; i++) {
        next.push(prev[i] || { accent: i === 0 ? "accent" : "normal", kit: null });
      }
      return next;
    });
  }, []);

  const cycleAccent = useCallback((idx) => {
    setBeatConfig(prev => {
      const next = [...prev];
      const cur = ACCENT_LEVELS.indexOf(next[idx].accent);
      next[idx] = { ...next[idx], accent: ACCENT_LEVELS[(cur + 1) % ACCENT_LEVELS.length] };
      return next;
    });
  }, []);

  const setBeatKit = useCallback((idx, kit) => {
    setBeatConfig(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], kit: kit === soundKit ? null : kit };
      return next;
    });
  }, [soundKit]);

  const toggleSpeedBuilder = useCallback((on) => {
    if (on) startBpmRef.current = bpmRef.current;
    setSpeedBuilder(on);
  }, []);

  return {
    bpm, playing, beat, beatsPerBar, soundKit, beatConfig, gapClickActive, gapClickPlay, gapClickMute, speedBuilder, speedIncrement, speedBars, speedCeiling, subdivision,
    start, stop, changeBpm, changeBeats, setSoundKit, cycleAccent, setBeatKit, setGapClickActive, setGapClickPlay, setGapClickMute, setSubdivision,
    setSpeedBuilder: toggleSpeedBuilder, setSpeedIncrement, setSpeedBars, setSpeedCeiling
  };
}

function useTimer(mins) {
  const [sec, setSec] = useState(mins * 60);
  const [on, setOn] = useState(false);
  const [total] = useState(mins * 60);
  const ref = useRef(null);
  useEffect(() => {
    if (on && sec > 0) ref.current = setInterval(() => setSec(s => s - 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on, sec]);
  const toggle = () => setOn(r => !r);
  const reset = () => { setOn(false); setSec(total); };
  const pct = ((total - sec) / total) * 100;
  const fmt = `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
  return { sec, on, toggle, reset, pct, fmt };
}

// ─── COMPONENTS ─────────────────────────────────────────────────────

function TypeBadge({ type, size = 12 }) {
  const t = TYPE[type] || TYPE.rhythm;
  const Icon = t.icon;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase",
      color: t.color, fontFamily: T.sans, padding: "4px 10px",
      background: `${t.color}10`, borderRadius: T.radius, border: `1px solid ${t.color}20`
    }}>
      <Icon size={size} strokeWidth={2.5} />
      <span>{t.label}</span>
    </div>
  );
}

function BeatDots({ beat: externalBeat, playing, compact, beatConfig, beatsPerBar }) {
  const [internalBeat, setInternalBeat] = useState(0);

  useEffect(() => {
    const handleBeat = (e) => setInternalBeat(e.detail.beat);
    window.addEventListener('metroBeat', handleBeat);
    return () => window.removeEventListener('metroBeat', handleBeat);
  }, []);

  useEffect(() => {
    if (!playing) setInternalBeat(0);
  }, [playing]);

  const beat = internalBeat; // Override external beat to prevent full app re-renders
  const n = beatsPerBar || 4;
  const cfg = beatConfig || Array.from({ length: n }, (_, i) => ({ accent: i === 0 ? "accent" : "normal" }));
  const s = compact ? 7 : 12, ds = compact ? 9 : 16;
  return (
    <div style={{ display: "flex", gap: compact ? 4 : 12, justifyContent: "center", margin: compact ? 0 : "16px 0", height: compact ? ds : ds + 8, alignItems: "center" }}>
      {Array.from({ length: n }).map((_, i) => {
        const acc = cfg[i]?.accent || "normal";
        const c = ACCENT_CONFIG[acc]?.color || T.textMed;
        const isMute = acc === "mute";
        const isActive = playing && beat === i;
        const size = acc === "accent" ? ds + (compact ? 0 : 2) : s + (compact ? 0 : 2);
        return (
          <div key={i} style={{
            width: size, height: size, borderRadius: "50%",
            background: isMute ? "transparent" : (isActive ? T.gold : c + "30"),
            border: isMute ? `1px dashed ${T.border}` : (isActive ? `none` : "1px solid transparent"),
            transition: "all 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)", 
            transform: isActive ? "scale(1.5)" : "scale(1)",
            boxShadow: isActive && !isMute ? `0 0 16px ${T.gold}, 0 0 32px ${T.gold}80` : "none",
            opacity: isMute ? 0.4 : 1
          }} />
        );
      })}
    </div>
  );
}

function TimerRing({ pct, fmt, size = 50, textSize = 11 }) {
  const r = (size - 6) / 2, circ = 2 * Math.PI * r, done = pct >= 100;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={2.5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={done ? T.success : T.gold} strokeWidth={2.5}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: textSize, fontWeight: 600, fontFamily: T.sans, color: done ? T.success : T.textDark }}>
          {done ? "✓" : fmt}
        </div>
      </div>
    </div>
  );
}

function LyricGrid() {
  const lines = [
    { beats: ["__", "I", "__", "once", "__", "heard", "__", "__", "__", "__"] },
    { beats: ["__", "bout", "__", "a", "__", "place", "__", "__", "__", "__"] },
    { beats: ["__", "some", "__", "where", "__", "south", "__", "__", "__", "__"] },
    { beats: ["__", "far", "__", "a", "__", "way", "__", "__", "__", "__"] },
  ];
  return (
    <div style={{
      background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
      padding: 24, marginBottom: 16, overflowX: "auto"
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, marginBottom: 10, fontFamily: T.sans }}>
        LYRIC PLACEMENT — words fall BETWEEN clicks
      </div>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", gap: 0, marginBottom: li < 3 ? 6 : 0 }}>
          {line.beats.map((b, bi) => {
            const isClick = b === "__";
            const isWord = !isClick;
            return (
              <div key={bi} style={{
                flex: 1, textAlign: "center", padding: "6px 2px",
                background: isClick ? T.gold + "10" : "transparent",
                borderRadius: 4, minWidth: 36
              }}>
                <div style={{
                  fontSize: isWord ? 14 : 11,
                  fontWeight: isWord ? 700 : 400,
                  color: isWord ? T.textDark : T.textMuted,
                  fontFamily: isWord ? T.serif : T.sans,
                  fontStyle: isWord ? "italic" : "normal"
                }}>
                  {isClick ? "click" : b}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ fontSize: 11, color: T.textLight, marginTop: 10, fontFamily: T.sans, fontStyle: "italic" }}>
        Gold columns = metronome click (122 BPM). Words land in the gaps between clicks.
      </div>
    </div>
  );
}

function SarahQuote({ text }) {
  return (
    <div style={{
      padding: "16px 20px", margin: "20px 0",
      background: T.getTint(T.gold, 0.04),
      borderRadius: T.radius,
      border: `1px solid ${T.gold}15`,
      position: "relative"
    }}>
      <Quote size={14} style={{ position: "absolute", top: -7, left: 16, color: T.gold, background: T.bgCard, padding: "0 4px" }} />
      <div style={{ fontSize: 9, fontWeight: 800, color: T.gold, letterSpacing: 2, marginBottom: 8, fontFamily: T.sans, textTransform: "uppercase" }}>
        Teacher's Note
      </div>
      <div style={{ fontSize: 15, color: T.textDark, fontFamily: T.serif, lineHeight: 1.7, fontStyle: "italic" }}>
        "{text}"
      </div>
    </div>
  );
}

function DetailSection({ label, color, children }) {
  if (!children) return null;
  return (
    <div style={{
      background: T.getTint(color, 0.04), border: `1px solid ${color}15`,
      borderRadius: T.radius, padding: "18px 20px", marginBottom: 16,
      boxShadow: `0 4px 12px ${color}08`
    }}>
      <div style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 2, marginBottom: 10, fontFamily: T.sans, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: T.textDark, fontFamily: T.sans, lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function PitchRibbon({ pitches }) {
  if (!pitches || pitches.length === 0) return null;

  const getMidi = (note) => {
    const match = note.match(/([A-G][b♭#]?)([0-9])/);
    if (!match) return 0;
    const n = { "C": 0, "C#": 1, "D": 2, "E♭": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "A♭": 8, "Ab": 8, "A": 9, "B♭": 10, "Bb": 10, "B": 11 }[match[1].replace('b', '♭')] || 0;
    return parseInt(match[2], 10) * 12 + n;
  };

  const sorted = [...pitches].sort((a, b) => getMidi(a) - getMidi(b));
  const startNote = sorted[0];
  const endNote = sorted[sorted.length - 1];

  return (
    <div style={{ marginBottom: 24, paddingLeft: 18, paddingRight: 18, marginLeft: -18, marginRight: -18 }}>
      <InlineKeyboard
        theme={T}
        range={[startNote, endNote]}
        label="REFERENCE PITCHES"
        highlightNotes={pitches}
      />
    </div>
  );
}

function ReviewCheckIn({ review, accentColor }) {
  const [open, setOpen] = useState(false);
  if (!review) return null;
  return (
    <div style={{
      background: `${accentColor}08`, border: `1px dashed ${accentColor}40`,
      borderRadius: T.radiusMd, padding: "12px 16px", marginBottom: 16, cursor: "pointer"
    }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: accentColor, fontFamily: T.sans }}>
          {review.label} &middot; {review.time} min
        </div>
        <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans }}>{open ? "▾" : "▸"}</div>
      </div>
      {open && (
        <div style={{ marginTop: 8, fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6 }}>
          {review.prompt}
        </div>
      )}
    </div>
  );
}

// ─── FLOW MODE ──────────────────────────────────────────────────────

function useWakeLock() {
  const lockRef = useRef(null);
  const request = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        lockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch { /* user denied or not supported */ }
  }, []);
  const release = useCallback(() => {
    lockRef.current?.release();
    lockRef.current = null;
  }, []);
  useEffect(() => () => lockRef.current?.release(), []);
  return { request, release };
}

function FlowProgressRail({ exercises, currentIndex, completed, onJump, accentColor }) {
  return (
    <div style={{
      display: "flex", gap: 6, justifyContent: "center", alignItems: "center",
      padding: "10px 16px", flexWrap: "wrap", borderBottom: `1px solid ${T.borderSoft}`
    }}>
      {exercises.map((ex, i) => {
        const isDone = completed.has(ex.id);
        const isCurrent = i === currentIndex;
        const color = accentColor || T.gold;
        return (
          <button key={ex.id} onClick={() => onJump(i)} title={ex.title} style={{
            width: isCurrent ? 12 : 8, height: isCurrent ? 12 : 8,
            borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
            minWidth: isCurrent ? 12 : 8,
            background: isDone ? T.success : (isCurrent ? color : T.border),
            boxShadow: isCurrent ? `0 0 0 3px ${color}30` : "none",
            opacity: isDone ? 1 : (isCurrent ? 1 : 0.4),
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            animation: isCurrent ? "pulse-ring 2s infinite" : "none",
            WebkitTapHighlightColor: "transparent"
          }} />
        );
      })}
    </div>
  );
}

function FlowStepView({ steps, accentColor }) {
  const [stepIndex, setStepIndex] = useState(0);

  if (!steps || steps.length === 0) return null;

  const step = steps[stepIndex];
  const total = steps.length;

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Navigation & Counter Header */}
      {total > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button onClick={() => { setStepIndex(Math.max(0, stepIndex - 1)); }}
            disabled={stepIndex === 0} 
            style={{
              background: "transparent", border: `1px solid ${stepIndex === 0 ? T.borderSoft : T.border}`,
              color: stepIndex === 0 ? T.textMuted : T.textMed,
              padding: "6px 12px", cursor: stepIndex === 0 ? "default" : "pointer",
              fontSize: 10, fontWeight: 700, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase",
              borderRadius: T.radius, transition: "all 0.2s", WebkitTapHighlightColor: "transparent"
            }}>
            ← Prev
          </button>
          
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase",
            color: accentColor || T.gold, fontFamily: T.sans
          }}>
            Step {stepIndex + 1} <span style={{color: T.textMuted}}>of {total}</span>
          </div>

          <button onClick={() => { setStepIndex(Math.min(total - 1, stepIndex + 1)); }}
            disabled={stepIndex === total - 1} 
            style={{
              background: stepIndex === total - 1 ? "transparent" : (accentColor || T.gold),
              border: stepIndex === total - 1 ? `1px solid ${T.borderSoft}` : "none",
              color: stepIndex === total - 1 ? T.textMuted : "#fff",
              padding: "6px 12px", cursor: stepIndex === total - 1 ? "default" : "pointer",
              fontSize: 10, fontWeight: 700, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase",
              borderRadius: T.radius, transition: "all 0.2s", WebkitTapHighlightColor: "transparent"
            }}>
            Next →
          </button>
        </div>
      )}

      {/* Single Step Card */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, overflow: "hidden"
      }}>
        {/* Step Progress Bar Header */}
        <div style={{ display: "flex", width: "100%" }}>
          {steps.map((_, i) => (
            <div key={i} onClick={() => { setStepIndex(i); }} style={{
              flex: 1, height: 4, cursor: "pointer",
              background: i <= stepIndex ? (accentColor || T.gold) : T.borderSoft,
              transition: "background 0.3s",
              borderRight: i < total - 1 ? `1px solid ${T.bgCard}` : "none"
            }} />
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          {/* Main Step Text */}
          <div style={{
            fontSize: 16, color: T.textDark, fontFamily: T.sans, lineHeight: 1.6, fontWeight: 500,
            marginBottom: step.why ? 20 : 0
          }}>
            {step.text}
          </div>

          {/* Why this matters (Inline Callout) */}
          {step.why && (
            <div style={{
              padding: "12px 16px", background: T.bgSoft,
              borderLeft: `2px solid ${T.border}`
            }}>
              <div style={{
                fontSize: 10, color: T.textLight, fontFamily: T.sans, marginBottom: 4,
                fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase"
              }}>
                Why this matters
              </div>
              <div style={{
                fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, fontStyle: "italic"
              }}>
                {step.why}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FlowExerciseBody({ ex, completed, onComplete, metro, accentColor, onOpenTapMatch }) {
  const timer = useTimer(ex.time || 5);
  const [showDetails, setShowDetails] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [trackRates, setTrackRates] = useState({});
  const [timerDone, setTimerDone] = useState(false);
  const [droneActiveNotes, setDroneActiveNotes] = useState({ notes: [], label: "" });
  
  const typeColor = TYPE[ex.type]?.color || accentColor || T.gold;

  // Detect timer completion
  useEffect(() => {
    if (timer.pct >= 100 && !timerDone) {
      setTimerDone(true);
      // Play a gentle chime
      try {
        if (Tone.context.state !== "running") Tone.context.resume();
        const synth = new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.1, decay: 0.3, sustain: 0.2, release: 1.5 }
        }).toDestination();
        synth.volume.value = -14;
        synth.triggerAttackRelease("E5", "4n");
        setTimeout(() => synth.dispose(), 2000);
      } catch { }
    }
  }, [timer.pct, timerDone]);

  const playNote = async (note) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(note.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
  };

  const tracks = ex.tracks || [];
  const isComplete = completed.has(ex.id);

  return (
    <div style={{ animation: "fade-in-up 0.4s ease-out" }}>
      {/* PANEL A: GOAL & PROGRESS */}
      <div style={{ 
        background: T.bgCard, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
        padding: "24px", marginBottom: 16, boxShadow: T.getShadow(typeColor, 'sm'),
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: typeColor, opacity: 0.3 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <TimerRing pct={timer.pct} fmt={timer.fmt} size={64} textSize={14} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: T.serif, color: T.textDark }}>
              {ex.time || 5} min
            </div>
            <div style={{ fontSize: 9, color: timerDone ? T.gold : T.textMuted, fontFamily: T.sans, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 }}>
              {timerDone ? "Time's up" : "Practice Target"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={timer.toggle} className="interactive-btn" style={{
              background: timer.on ? "transparent" : typeColor, 
              border: `1px solid ${timer.on ? T.coral : typeColor}`, 
              color: timer.on ? T.coral : "#fff",
              padding: "10px 20px", fontSize: 10, fontWeight: 800, cursor: "pointer", borderRadius: T.radius,
              fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase",
              WebkitTapHighlightColor: "transparent"
            }}>
              {timer.on ? <RotateCcw size={14} /> : <Play size={14} fill="currentColor" />}
              <span style={{ marginLeft: 8 }}>{timer.on ? "Pause" : "Start"}</span>
            </button>
          </div>
        </div>

        <div style={{
          fontSize: 17, color: T.textDark, fontFamily: T.sans, lineHeight: 1.7,
          padding: "20px 24px", background: T.getTint(typeColor, 0.02), borderRadius: T.radius,
          border: `1px solid ${typeColor}10`, marginBottom: ex.setup ? 20 : 0
        }}>{ex.what}</div>

        {ex.setup && (
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, display: "flex", gap: 10, alignItems: "flex-start", padding: "0 8px" }}>
            <Info size={14} style={{ color: typeColor, marginTop: 3 }} />
            <div style={{ flex: 1 }}>
              <span style={{ color: typeColor, fontWeight: 900, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" }}>Setup:</span>
              <span style={{ marginLeft: 8 }}>{ex.setup}</span>
            </div>
          </div>
        )}
      </div>

      {/* PANEL B: TOOLS */}
      {(tracks.length > 0 || ex.metronome || ex.recorder || ex.drone) && (
        <div style={{ 
          background: T.bgCard, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
          padding: "24px", marginBottom: 16, boxShadow: T.sm
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, borderBottom: `1px solid ${T.borderSoft}`, paddingBottom: 10 }}>
            <Wrench size={14} style={{ color: T.textMuted }} />
            <div style={{ fontSize: 9, fontWeight: 900, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>
              Tools & Accompaniment
            </div>
          </div>

          {/* Reference Pitches */}
          {ex.referencePitches && (
            <div style={{ marginBottom: 24 }}>
              <PitchRibbon pitches={ex.referencePitches} playNote={playNote} />
            </div>
          )}

          {/* Metronome */}
          {ex.metronome && (
            <div style={{ display: "flex", gap: 10, marginBottom: 24, alignItems: "center", background: T.getTint(T.slate, 0.02), padding: "16px 20px", borderRadius: T.radiusMd, border: `1px solid ${T.border}`, flexWrap: "wrap" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: T.textMed }}>−</button>
                <div style={{ fontSize: 20, fontFamily: T.sans, color: T.textDark, fontWeight: 800, minWidth: 48, textAlign: "center" }}>{metro.bpm}</div>
                <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: T.textMed }}>+</button>
                <button onClick={() => metro.changeBpm(ex.metronome)} style={{ marginLeft: 12, fontSize: 9, background: T.goldSoft, border: "none", padding: "6px 12px", borderRadius: T.radius, color: T.goldDark, cursor: "pointer", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Target: {ex.metronome}</button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => metro.playing ? metro.stop() : metro.start()} style={{
                  background: metro.playing ? "transparent" : typeColor, 
                  border: `1px solid ${metro.playing ? T.coral : typeColor}`,
                  color: metro.playing ? T.coral : "#fff",
                  padding: "10px 20px", fontSize: 10, fontWeight: 800, cursor: "pointer", borderRadius: T.radius,
                  fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase"
                }}>{metro.playing ? "Stop" : "Start"}</button>
                <button onClick={() => onOpenTapMatch && onOpenTapMatch(ex.metronome)} style={{
                  background: "transparent", border: `1px solid ${T.border}`, color: T.textMed, padding: "10px 16px", borderRadius: T.radius,
                  fontSize: 10, cursor: "pointer", fontWeight: 800, fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase"
                }}>Tap</button>
              </div>
            </div>
          )}

          {/* Audio Tracks */}
          {tracks.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              {tracks.map((t, i) => (
                <div key={i} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <Headphones size={14} style={{ color: T.textMuted }} />
                    <div style={{ fontSize: 10, fontWeight: 900, color: T.textDark, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
                  </div>
                  <MiniAudioPlayer theme={T} src={t.src} playbackRate={trackRates[i] || 1} />
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    {[0.75, 1, 1.25].map(rate => (
                      <button key={rate} onClick={() => setTrackRates(r => ({ ...r, [i]: rate }))} style={{
                        background: (trackRates[i] || 1) === rate ? typeColor : "transparent",
                        color: (trackRates[i] || 1) === rate ? "#fff" : T.textMed,
                        border: `1px solid ${(trackRates[i] || 1) === rate ? typeColor : T.borderSoft}`,
                        padding: "5px 14px", fontSize: 9, fontWeight: 900, cursor: "pointer",
                        borderRadius: T.radius, fontFamily: T.sans, transition: "all 0.2s", letterSpacing: 1
                      }}>{rate === 1 ? "1x" : `${rate}x`}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drone */}
          {ex.drone && (
            <div style={{ marginBottom: 24 }}>
              <DroneGenerator theme={T} inline={true} onActiveNotesChange={setDroneActiveNotes}
                {...(typeof ex.drone === 'object' ? {
                  defaultRoot: ex.drone.root, defaultOctave: ex.drone.octave,
                  defaultTexture: ex.drone.texture, defaultMode: ex.drone.mode,
                  defaultPreset: ex.drone.preset, defaultProgression: ex.drone.progression,
                  defaultBpm: ex.drone.bpm, defaultStepDuration: ex.drone.stepDuration,
                } : {})}
              />
            </div>
          )}

          {/* Recorder */}
          {ex.recorder && (
            <div style={{ marginBottom: 0 }}>
              <AudioRecorder theme={T} inline={true} />
            </div>
          )}
        </div>
      )}

      {/* PANEL C: CONTENT & GUIDES */}
      {(ex.chordVoicings || ex.fretboard || ex.pianoKeys || ex.volumeMeter || ex.rhythmCells || ex.phraseForm || (ex.referencePitches && ex.referencePitches.length > 0) || ex.steps || ex.feel || ex.wrong || ex.sarah || ex.levelUp) && (
        <div style={{ 
          background: T.bgCard, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
          padding: "24px", marginBottom: 16, boxShadow: T.sm
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, borderBottom: `1px solid ${T.borderSoft}`, paddingBottom: 10 }}>
            <Info size={14} style={{ color: T.textMuted }} />
            <div style={{ fontSize: 9, fontWeight: 900, color: T.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>
              Content & Interactive Guides
            </div>
          </div>

          {/* Pitch detector */}
          {ex.referencePitches && ex.referencePitches.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} pitchContour={!!ex.pitchContour} />
            </div>
          )}

          {/* Chord Voicings — explicit or auto-extracted from exercise text */}
          {(() => {
            const explicitChords = ex.chordVoicings?.chords;
            const autoChords = !explicitChords && ex.type === "guitar" ? extractChordsFromExercise(ex) : null;
            const chords = explicitChords || (autoChords?.length ? autoChords : null);
            return chords ? (
              <ChordVoicingViewer theme={T} chords={chords} defaultChord={ex.chordVoicings?.defaultChord} />
            ) : null;
          })()}

          {/* Fretboard */}
          {ex.fretboard && (
            <div style={{ marginBottom: 24 }}>
              <FretboardDiagram theme={T} scale={ex.fretboard.scale} position={ex.fretboard.position} highlight={ex.fretboard.highlight || []} />
            </div>
          )}

          {/* Piano Keys */}
          {(ex.pianoKeys || droneActiveNotes.notes.length > 0) && (
            <div style={{ marginBottom: 24 }}>
              {ex.pianoKeys ? (
                <PianoKeysDiagram notes={droneActiveNotes.notes.length > 0 ? normalizeDroneNotes(droneActiveNotes.notes, ex.pianoKeys.range) : ex.pianoKeys.notes} label={droneActiveNotes.notes.length > 0 ? droneActiveNotes.label : ex.pianoKeys.label} range={ex.pianoKeys.range} />
              ) : (
                <PianoKeysDiagram notes={normalizeDroneNotes(droneActiveNotes.notes, ["C3", "C5"])} label={droneActiveNotes.label} range={["C3", "C5"]} />
              )}
            </div>
          )}

          {/* Rhythm Cells */}
          {ex.rhythmCells && (
            <div style={{ marginBottom: 24 }}>
              <RhythmCellCards cells={ex.rhythmCells} theme={T} accentColor={accentColor} />
            </div>
          )}

          {/* Phrase Form */}
          {ex.phraseForm && (
            <div style={{ marginBottom: 24 }}>
              <PhraseFormGuide form={ex.phraseForm} theme={T} accentColor={accentColor} />
            </div>
          )}

          {/* Volume Meter */}
          {ex.volumeMeter && (
            <div style={{ marginBottom: 24 }}>
              <VolumeMeter theme={T} />
            </div>
          )}

          {/* Tabs */}
          {ex.tabs && TAB_CONTENT[ex.tabs] && (
            <div style={{ marginBottom: 24 }}>
              <button onClick={() => setShowTabs(!showTabs)} className="interactive-btn" style={{
                background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
                padding: "12px 16px", borderRadius: T.radius, cursor: "pointer", fontWeight: 800,
                fontFamily: T.sans, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Music size={14} />
                  <span>Tabs & Lyrics</span>
                </div>
                <ChevronDown size={16} style={{ transition: "transform 0.3s ease", transform: showTabs ? "rotate(180deg)" : "" }} />
              </button>
              {showTabs && (
                <pre style={{
                  background: T.bgSoft, padding: 20, border: `1px solid ${T.border}`, borderTop: "none",
                  borderRadius: `0 0 ${T.radius} ${T.radius}`, overflowX: "auto",
                  fontFamily: "monospace", fontSize: 13, color: T.textDark, lineHeight: 1.6, marginTop: 0, whiteSpace: "pre-wrap"
                }}>{TAB_CONTENT[ex.tabs].trim()}</pre>
              )}
            </div>
          )}

          {/* ── STEPS ── */}
          {ex.steps && <FlowStepView steps={ex.steps} accentColor={accentColor} />}

          {/* Feel / Wrong — always expanded */}
          {(ex.feel || ex.wrong) && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <AlertCircle size={14} style={{ color: T.textLight }} />
                <div style={{ color: T.textLight, fontSize: 9, fontFamily: T.sans, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase" }}>
                  Feel & Pitfalls
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {ex.feel && <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>}
                {ex.wrong && <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>}
              </div>
            </div>
          )}

          {/* Sarah quote */}
          {ex.sarah && <SarahQuote text={ex.sarah} />}

          {/* Level up */}
          {ex.levelUp && (
            <div style={{
              fontSize: 10, color: typeColor, fontFamily: T.sans, fontWeight: 900, letterSpacing: 1.5,
              padding: "16px 0", borderTop: `1px solid ${T.border}`, marginTop: 12, display: "flex", alignItems: "center", gap: 10, textTransform: "uppercase"
            }}>
              <ArrowRight size={14} /> Level up: {ex.levelUp}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
function FlowSummary({ exercises, completed, sessionDuration, onExit }) {
  const done = exercises.filter(e => completed.has(e.id)).length;
  const mins = Math.floor(sessionDuration / 60);
  const secs = sessionDuration % 60;

  return (
    <div style={{
      textAlign: "center", padding: "48px 24px",
      animation: "fade-in-up 0.5s ease-out"
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: T.success, fontFamily: T.sans, marginBottom: 12 }}>
        Flow Complete
      </div>
      <div style={{ fontSize: 36, fontWeight: 400, fontFamily: T.serif, color: T.textDark, marginBottom: 8 }}>
        {done} exercise{done !== 1 ? "s" : ""}
      </div>
      <div style={{ fontSize: 16, color: T.textMuted, fontFamily: T.sans, marginBottom: 32 }}>
        {mins > 0 ? `${mins}m ` : ""}{secs}s total session time
      </div>

      <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "left" }}>
        {exercises.map(ex => {
          const isDone = completed.has(ex.id);
          return (
            <div key={ex.id} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
              borderBottom: `1px solid ${T.border}`
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: isDone ? T.success : "transparent",
                border: `2px solid ${isDone ? T.success : T.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "#fff", flexShrink: 0
              }}>
                {isDone && "✓"}
              </div>
              <div style={{ fontSize: 14, fontFamily: T.sans, color: isDone ? T.textDark : T.textMuted }}>
                {ex.title}
              </div>
              <div style={{ marginLeft: "auto", fontSize: 11, color: T.textMuted, fontFamily: T.sans }}>
                {ex.time || 5}m
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onExit} className="interactive-btn" style={{
        marginTop: 32, background: T.gold, border: "none", color: "#fff",
        padding: "14px 32px", fontSize: 12, fontWeight: 600, cursor: "pointer",
        borderRadius: T.radius, fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
        WebkitTapHighlightColor: "transparent"
      }}>
        Back to App
      </button>
    </div>
  );
}

class FlowErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: "#fff3f3", borderRadius: 12, margin: 16, border: "1px solid #fcc" }}>
          <div style={{ fontWeight: 700, color: "#c33", marginBottom: 8 }}>Flow Error</div>
          <div style={{ fontSize: 13, color: "#633", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>{this.state.error?.message || "Unknown error"}</div>
          <div style={{ fontSize: 12, color: "#966", marginTop: 8, fontFamily: "monospace", whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto" }}>{this.state.error?.stack}</div>
          <button onClick={() => this.setState({ hasError: false, error: null })} style={{ marginTop: 12, padding: "8px 16px", background: "#c33", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function FlowMode({ exercises, completed, onComplete, metro, onExit, accentColor, startIndex = 0, onOpenTapMatch }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [showSummary, setShowSummary] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const sessionStartRef = useRef(Math.floor(Date.now() / 1000));
  const flowContainerRef = useRef(null);
  const wakeLock = useWakeLock();

  // Request wake lock on mount
  useEffect(() => {
    wakeLock.request();
    return () => wakeLock.release();
  }, []);

  const currentEx = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;
  const touchRef = useRef(null);

  const onTouchStart = (e) => {
    // Don't capture swipes that start on interactive elements
    const el = e.target;
    const tag = el.tagName;
    if (tag === "BUTTON" || tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || tag === "CANVAS" ||
      el.closest("button, input, select, [role='slider'], svg, [data-keyboard]")) {
      touchRef.current = null; return;
    }
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2) return;
    if (dx < 0 && currentIndex < exercises.length - 1) handleJump(currentIndex + 1);
    if (dx > 0 && currentIndex > 0) handleJump(currentIndex - 1);
  };

  const stopAllAudio = () => {
    if (metro.playing) metro.stop();
    // Stop any HTML5 audio elements
    if (flowContainerRef.current) {
      flowContainerRef.current.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
    }
  };

  const handleCompleteAndNext = () => {
    if (!completed.has(currentEx.id)) {
      onComplete(currentEx.id);
    }
    if (isLastExercise) {
      stopAllAudio();
      // Log session
      try {
        const sessions = JSON.parse(localStorage.getItem("flow-sessions") || "[]");
        sessions.push({
          date: new Date().toISOString(),
          exerciseIds: exercises.map(e => e.id),
          duration: Math.floor(Date.now() / 1000) - sessionStartRef.current
        });
        if (sessions.length > 100) sessions.splice(0, sessions.length - 100);
        localStorage.setItem("flow-sessions", JSON.stringify(sessions));
      } catch { }
      setShowSummary(true);
    } else {
      stopAllAudio();
      setCurrentIndex(currentIndex + 1);
      flowContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJump = (idx) => {
    if (idx !== currentIndex) {
      stopAllAudio();
      setCurrentIndex(idx);
      setShowSummary(false);
      flowContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleExit = () => {
    stopAllAudio();
    onExit();
  };

  if (showSummary) {
    return (
      <div className="hide-scrollbar" style={{
        position: "fixed", inset: 0, zIndex: 100, background: T.bg,
        overflowY: "auto", display: "flex", flexDirection: "column",
        WebkitOverflowScrolling: "touch"
      }}>
        <FlowSummary
          exercises={exercises}
          completed={completed}
          sessionDuration={Math.floor(Date.now() / 1000) - sessionStartRef.current}
          onExit={handleExit}
        />
      </div>
    );
  }

  return (
    <div ref={flowContainerRef} className="hide-scrollbar" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{
      position: "fixed", inset: 0, zIndex: 100, background: T.bg,
      overflowY: "auto", display: "flex", flexDirection: "column",
      WebkitOverflowScrolling: "touch"
    }}>
      {/* Top bar */}
      <div className="flow-top-bar" style={{
        padding: "12px 16px", paddingTop: "calc(12px + env(safe-area-inset-top, 0px))",
        borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: `${T.bgCard}b8`, backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        flexShrink: 0, position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            color: accentColor || T.gold, fontFamily: T.sans
          }}>
            Flow
          </div>
          <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans }}>
            {currentIndex + 1} of {exercises.length}
          </div>
        </div>
        <button onClick={() => setShowExitConfirm(true)} className="interactive-btn" style={{
          background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
          padding: "6px 14px", borderRadius: T.radius, cursor: "pointer",
          fontSize: 11, fontWeight: 600, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase",
          WebkitTapHighlightColor: "transparent"
        }}>
          Exit
        </button>
      </div>

      {/* Exit confirmation dialog */}
      {showExitConfirm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: `${T.bg === "#ffffff" ? "rgba(253,251,249,0.6)" : "rgba(18,18,18,0.6)"}`,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          animation: "fade-in-up 0.2s ease-out"
        }}>
          <div style={{
            background: T.bgCard, borderRadius: T.radiusMd, padding: "24px 28px",
            maxWidth: 320, width: "100%", boxShadow: T.md, textAlign: "center",
            border: `1px solid ${T.border}`
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, fontFamily: T.serif, color: T.textDark, marginBottom: 8 }}>
              Exit Flow?
            </div>
            <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, marginBottom: 20 }}>
              Your progress is saved.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setShowExitConfirm(false)} className="interactive-btn" style={{
                background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
                padding: "10px 20px", borderRadius: T.radius, cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: T.sans, letterSpacing: 1,
                WebkitTapHighlightColor: "transparent"
              }}>Stay</button>
              <button onClick={handleExit} className="interactive-btn" style={{
                background: T.coral, border: "none", color: "#fff",
                padding: "10px 20px", borderRadius: T.radius, cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: T.sans, letterSpacing: 1,
                WebkitTapHighlightColor: "transparent"
              }}>Exit</button>
            </div>
          </div>
        </div>
      )}

      {/* Progress rail */}
      <FlowProgressRail exercises={exercises} currentIndex={currentIndex} completed={completed} onJump={handleJump} accentColor={accentColor} />

      {/* Exercise content — key forces remount */}
      <div style={{ flex: 1, maxWidth: 560, width: "100%", margin: "0 auto", padding: "16px 16px 120px", overflowY: "auto" }}>

        {/* Exercise header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <TypeBadge type={currentEx.type} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 400, fontFamily: T.serif, color: T.textDark, lineHeight: 1.3 }}>
            {currentEx.title}
          </div>
        </div>

        <FlowErrorBoundary key={currentEx.id}>
        <FlowExerciseBody
          key={currentEx.id + "-body"}
          ex={currentEx}
          completed={completed}
          onComplete={onComplete}
          metro={metro}
          accentColor={accentColor}
          onOpenTapMatch={onOpenTapMatch}
        />
        </FlowErrorBoundary>
      </div>

      {/* Bottom action bar */}
      <div className="flow-bottom-bar" style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        background: `${T.bgCard}b8`, backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        borderTop: `1px solid ${T.border}`,
        boxShadow: `0 -4px 32px ${T.bg === "#ffffff" ? "rgba(44,40,37,0.04)" : "rgba(0,0,0,0.3)"}`,
        zIndex: 101, display: "flex", justifyContent: "center"
      }}>
        <button onClick={handleCompleteAndNext} className="interactive-btn" style={{
          background: accentColor || T.gold, border: "none", color: "#fff",
          padding: "14px 32px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          borderRadius: T.radius, fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
          maxWidth: 560, width: "100%"
        }}>
          {completed.has(currentEx.id)
            ? (isLastExercise ? "Finish Flow" : "Next")
            : (isLastExercise ? "Complete & Finish" : "Complete & Next")
          }
        </button>
      </div>
    </div>
  );
}

function StartFlowButton({ onClick, accentColor }) {
  const c = accentColor || T.gold;
  return (
    <button onClick={onClick} className="interactive-btn" style={{
      background: "transparent",
      border: `1px solid ${c}40`,
      color: c,
      padding: "10px 20px", borderRadius: T.radius, cursor: "pointer",
      fontSize: 10, fontWeight: 800, fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.3s ease",
      boxShadow: `0 4px 12px ${c}10`
    }}>
      <Play size={12} fill="currentColor" />
      <span>Flow Start</span>
    </button>
  );
}

// ─── EXERCISE CARD ──────────────────────────────────────────────────

function ExerciseCard({ ex, completed, onComplete, metro, dayColor, onOpenTapMatch, onStartFlow, levelExercises }) {
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [stepDone, setStepDone] = useState({});
  const [trackRates, setTrackRates] = useState({});
  const [droneActiveNotes, setDroneActiveNotes] = useState({ notes: [], label: "" });
  const audioRefs = useRef({});
  const timer = useTimer(ex.time);

  // Auto-close: when another exercise opens, close this one
  const openRef = useRef(false);
  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    const handleOtherOpen = (e) => {
      if (e.detail.id !== ex.id && openRef.current) {
        // Stop any playing audio elements inside this card
        document.querySelectorAll(`.exercise-card-${ex.id} audio`).forEach(a => { a.pause(); a.currentTime = 0; });
        setOpen(false);
      }
    };
    window.addEventListener('exerciseOpen', handleOtherOpen);
    return () => window.removeEventListener('exerciseOpen', handleOtherOpen);
  }, [ex.id]);

  const handleToggle = () => {
    const next = !open;
    if (next) {
      // Broadcast that this exercise is opening — others will close
      window.dispatchEvent(new CustomEvent('exerciseOpen', { detail: { id: ex.id } }));
    }
    setOpen(next);
  };

  const playNote = async (note) => {
    if (Tone.context.state !== 'running') {
      await Tone.context.resume();
    }
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(note.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
  };

  const tracks = ex.tracks || [];
  const typeColor = TYPE[ex.type]?.color || dayColor || T.gold;

  return (
    <div className={`exercise-card exercise-card-${ex.id}`} style={{
      background: completed ? T.successSoft : T.bgCard,
      border: `1px solid ${completed ? T.success + "20" : T.border}`,
      borderLeft: `2px solid ${completed ? T.success : typeColor}`,
      marginBottom: 16, overflow: "hidden", borderRadius: T.radius,
      boxShadow: completed ? "none" : T.getShadow(typeColor, 'sm'),
      opacity: completed ? 0.85 : 1,
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
    }}>
      <div onClick={handleToggle} style={{
        display: "flex", alignItems: "center", gap: 16, padding: "20px 18px", cursor: "pointer",
        background: completed ? "transparent" : T.getTint(typeColor, 0.01)
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 64 }}>
          <TypeBadge type={ex.type} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 19, color: T.textDark, fontFamily: T.serif, marginBottom: 6, lineHeight: 1.2, display: "flex", alignItems: "center", gap: 8 }}>
            {ex.title}
            {completed && <CheckCircle2 size={16} color={T.success} strokeWidth={3} />}
          </div>
          <div style={{ fontSize: 9, color: T.textMuted, fontFamily: T.sans, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} /> {ex.time} MIN</span>
            <span onClick={e => { e.stopPropagation(); setShowTimer(t => !t); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", opacity: showTimer ? 1 : 0.4, transition: "opacity 0.2s" }} title="Toggle timer">
              <Clock size={12} strokeWidth={2.5} />
            </span>
            {timer.on && !open && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold, animation: "pulse-ring 2s infinite", display: "inline-block" }} />}
          </div>
        </div>
        <div style={{ color: T.textMuted, display: "flex", transition: "all 0.3s ease", transform: open ? "rotate(180deg)" : "" }}>
          <ChevronDown size={20} strokeWidth={2.5} style={{ opacity: 0.4 }} />
        </div>
      </div>

      {open && (
        <div style={{ padding: "0 20px 24px" }}>
          <div style={{ height: "1px", background: T.borderSoft, marginBottom: 20, width: "100%" }} />
          {/* Flow button */}
          {onStartFlow && (
            <button onClick={() => {
              const exercises = levelExercises || [ex];
              const startIdx = levelExercises ? levelExercises.findIndex(e => e.id === ex.id) : 0;
              onStartFlow(exercises, dayColor, Math.max(0, startIdx));
            }} className="interactive-btn" style={{
              background: "transparent", border: `1px solid ${typeColor}40`,
              color: typeColor, padding: "10px 24px", borderRadius: T.radius,
              cursor: "pointer", fontSize: 9, fontWeight: 800, fontFamily: T.sans,
              letterSpacing: 2, textTransform: "uppercase", display: "inline-flex",
              alignItems: "center", gap: 10, marginBottom: 24,
              WebkitTapHighlightColor: "transparent", transition: "all 0.2s"
            }}>
              <Play size={12} fill="currentColor" /> Flow Start
            </button>
          )}

          {/* PANEL A: GOAL */}
          <div style={{
            background: T.getTint(typeColor, 0.03), borderRadius: T.radius, padding: "18px 20px", marginBottom: 20,
            border: `1px solid ${typeColor}10`
          }}>
            <div style={{ fontSize: 15, color: T.textDark, fontFamily: T.sans, lineHeight: 1.7, marginBottom: ex.setup ? 12 : 0 }}>
              {ex.what}
            </div>
            {ex.setup && (
              <div style={{ fontSize: 11, color: T.textMed, fontFamily: T.sans, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: typeColor, fontWeight: 900, fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>Setup:</span> {ex.setup}
              </div>
            )}
          </div>

          {/* PANEL B: TOOLS */}
          {(showTimer || tracks.length > 0 || ex.metronome || ex.drone || ex.recorder) && (
            <div style={{ 
              background: T.bgCard, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
              padding: "18px", marginBottom: 20, boxShadow: T.sm
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, borderBottom: `1px solid ${T.borderSoft}`, paddingBottom: 6 }}>
                Tools & Accompaniment
              </div>

              {/* Timer */}
              {showTimer && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "10px 14px", background: T.bgSoft, borderRadius: T.radius, border: `1px solid ${T.border}` }}>
                  <TimerRing pct={timer.pct} fmt={timer.fmt} size={38} />
                  <div style={{ flex: 1, fontFamily: T.sans, fontSize: 13, color: T.textDark, fontWeight: 700 }}>{timer.fmt}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={timer.toggle} style={{
                      background: timer.on ? T.coral : (dayColor || T.gold), border: "none", color: "#fff",
                      padding: "6px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
                      fontFamily: T.sans, textTransform: "uppercase"
                    }}>{timer.on ? "Pause" : "Start"}</button>
                    <button onClick={timer.reset} style={{
                      background: "transparent", border: `1px solid ${T.border}`, color: T.textLight,
                      padding: "6px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
                      fontFamily: T.sans, textTransform: "uppercase"
                    }}>Reset</button>
                  </div>
                </div>
              )}

              {/* Audio Tracks */}
              {tracks.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  {tracks.map((t, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: T.textDark, letterSpacing: 1.2, marginBottom: 6, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
                      <MiniAudioPlayer theme={T} src={t.src} playbackRate={trackRates[i] || 1} />
                      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {[0.75, 1, 1.25].map(rate => (
                          <button key={rate} onClick={() => setTrackRates(r => ({ ...r, [i]: rate }))} style={{
                            background: (trackRates[i] || 1) === rate ? (dayColor || T.gold) : "transparent",
                            color: (trackRates[i] || 1) === rate ? "#fff" : T.textMed,
                            border: `1px solid ${(trackRates[i] || 1) === rate ? (dayColor || T.gold) : T.borderSoft}`,
                            padding: "3px 8px", fontSize: 9, fontWeight: 800, cursor: "pointer",
                            borderRadius: T.radius, fontFamily: T.sans
                          }}>{rate === 1 ? "1x" : `${rate}x`}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Metronome */}
              {ex.metronome && (
                <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", background: T.bgSoft, padding: "10px 14px", borderRadius: T.radius, border: `1px solid ${T.border}`, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>−</button>
                    <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 700, minWidth: 36, textAlign: "center" }}>{metro.bpm}</div>
                    <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>+</button>
                    <button onClick={() => metro.changeBpm(ex.metronome)} style={{ marginLeft: 8, fontSize: 9, background: T.goldSoft, border: "none", padding: "4px 10px", borderRadius: T.radius, color: T.goldDark, cursor: "pointer", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>Target: {ex.metronome}</button>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => metro.playing ? metro.stop() : metro.start()} style={{
                      background: metro.playing ? T.coral : (dayColor || T.gold), border: "none", color: "#fff",
                      padding: "8px 14px", fontSize: 10, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
                      fontFamily: T.sans, textTransform: "uppercase"
                    }}>{metro.playing ? "Stop" : "Start"}</button>
                    <button onClick={() => onOpenTapMatch && onOpenTapMatch(ex.metronome)} style={{
                      background: "transparent", border: `1px solid ${T.slate}40`, color: T.slate, padding: "8px 10px", borderRadius: T.radius,
                      fontSize: 10, cursor: "pointer", fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase"
                    }}>Tap</button>
                  </div>
                </div>
              )}

              {/* Drone & Recorder */}
              {ex.drone && (
                <div style={{ marginBottom: 12 }}>
                  <DroneGenerator theme={T} inline={true} onActiveNotesChange={setDroneActiveNotes}
                    {...(typeof ex.drone === 'object' ? {
                      defaultRoot: ex.drone.root, defaultOctave: ex.drone.octave,
                      defaultTexture: ex.drone.texture, defaultMode: ex.drone.mode,
                      defaultPreset: ex.drone.preset, defaultProgression: ex.drone.progression,
                      defaultBpm: ex.drone.bpm, defaultStepDuration: ex.drone.stepDuration,
                    } : {})}
                  />
                </div>
              )}
              {ex.recorder && <AudioRecorder theme={T} inline={true} />}
            </div>
          )}

          {/* PANEL C: CONTENT */}
          {(ex.chordVoicings || ex.fretboard || ex.pianoKeys || ex.volumeMeter || ex.rhythmCells || ex.phraseForm || (ex.tabs && TAB_CONTENT[ex.tabs]) || (ex.referencePitches && ex.referencePitches.length > 0)) && (
            <div style={{ 
              background: T.bgCard, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
              padding: "18px", marginBottom: 20, boxShadow: T.sm
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: T.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, borderBottom: `1px solid ${T.borderSoft}`, paddingBottom: 6 }}>
                Guide & Reference
              </div>

              {/* Pitch detector */}
              {ex.referencePitches && ex.referencePitches.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} pitchContour={!!ex.pitchContour} />
                </div>
              )}

              {/* Chord Voicings — explicit or auto-extracted */}
              {(() => {
                const explicitChords = ex.chordVoicings?.chords;
                const autoChords = !explicitChords && ex.type === "guitar" ? extractChordsFromExercise(ex) : null;
                const chords = explicitChords || (autoChords?.length ? autoChords : null);
                return chords ? (
                  <ChordVoicingViewer theme={T} chords={chords} defaultChord={ex.chordVoicings?.defaultChord} />
                ) : null;
              })()}

              {/* Fretboard & Piano Keys */}
              {ex.fretboard && (
                <div style={{ marginBottom: 16 }}>
                  <FretboardDiagram theme={T} scale={ex.fretboard.scale} position={ex.fretboard.position} highlight={ex.fretboard.highlight || []} />
                </div>
              )}
              {(ex.pianoKeys || droneActiveNotes.notes.length > 0) && (
                <div style={{ marginBottom: 16 }}>
                  {ex.pianoKeys ? (
                    <PianoKeysDiagram notes={droneActiveNotes.notes.length > 0 ? normalizeDroneNotes(droneActiveNotes.notes, ex.pianoKeys.range) : ex.pianoKeys.notes} label={droneActiveNotes.notes.length > 0 ? droneActiveNotes.label : ex.pianoKeys.label} range={ex.pianoKeys.range} />
                  ) : (
                    <PianoKeysDiagram notes={normalizeDroneNotes(droneActiveNotes.notes, ["C3", "C5"])} label={droneActiveNotes.label} range={["C3", "C5"]} />
                  )}
                </div>
              )}

              {/* Volume Meter */}
              {ex.volumeMeter && <VolumeMeter theme={T} inline={true} volumeContour={!!ex.volumeContour} />}

              {/* Silence Score */}
              {ex.silenceTarget && <SilenceScore theme={T} target={ex.silenceTarget} />}

              {/* Chord Transition Timer */}
              {ex.chordTimer && <ChordTransitionTimer theme={T} chords={ex.chordTimer.chords} duration={ex.chordTimer.duration || 60} />}

              {/* Genre Metronome */}
              {ex.metronomeMode && <GenreMetronome theme={T} mode={ex.metronomeMode} bpm={ex.metronome || 80} />}

              {/* Rhythm Cells */}
              {ex.rhythmCells && (
                <div style={{ marginTop: 16 }}>
                  <RhythmCellCards cells={ex.rhythmCells} theme={T} bpm={ex.metronome?.bpm || 80} />
                </div>
              )}

              {/* Phrase Form */}
              {ex.phraseForm && (
                <div style={{ marginTop: 16 }}>
                  <PhraseFormGuide form={ex.phraseForm} theme={T} />
                </div>
              )}

              {/* Tabs & Lyrics */}
              {ex.tabs && TAB_CONTENT[ex.tabs] && (
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => setShowTabs(!showTabs)} className="interactive-btn" style={{
                    background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
                    padding: "10px 14px", borderRadius: T.radius, cursor: "pointer", fontWeight: 800,
                    fontFamily: T.sans, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                    width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <span>Tabs & Lyrics</span>
                    <span style={{ transition: "transform 0.2s", transform: showTabs ? "rotate(180deg)" : "" }}>&#9660;</span>
                  </button>
                  {showTabs && (
                    <pre style={{
                      background: T.bgSoft, padding: 16, border: `1px solid ${T.border}`, borderTop: "none",
                      borderRadius: `0 0 ${T.radius} ${T.radius}`, overflowX: "auto",
                      fontFamily: "monospace", fontSize: 12, color: T.textDark, lineHeight: 1.5, marginTop: 0, whiteSpace: "pre-wrap"
                    }}>{TAB_CONTENT[ex.tabs].trim()}</pre>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Steps */}
          <div style={{ marginBottom: 16 }}>
            {ex.steps.map((s, i) => (
              <div key={i}>
                {s.visual === "lyricGrid" && <LyricGrid />}
                <div style={{
                  display: "flex", gap: 16, padding: "12px 0",
                  borderBottom: i < ex.steps.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                  opacity: ex.checklist && stepDone[i] ? 0.6 : 1,
                  transition: "opacity 0.2s"
                }}>
                  {ex.checklist ? (
                    <div onClick={() => setStepDone(d => ({ ...d, [i]: !d[i] }))} style={{
                      width: 20, height: 20, borderRadius: T.radius, border: `1px solid ${stepDone[i] ? T.success : T.border}`,
                      background: stepDone[i] ? T.success : T.bgSoft,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0, marginTop: 2, transition: "all 0.15s"
                    }}>
                      {stepDone[i] && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                  ) : (
                    <div style={{
                      width: 20, height: 20, borderRadius: T.radius, background: dayColor + "08", border: `1px solid ${dayColor}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: dayColor, flexShrink: 0, fontFamily: T.sans, marginTop: 2
                    }}>{i + 1}</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 15, color: T.textDark, fontFamily: T.sans, lineHeight: 1.6, fontWeight: 400,
                      textDecoration: ex.checklist && stepDone[i] ? "line-through" : "none"
                    }}>
                      {s.text}
                    </div>
                    {s.why && (
                      <div style={{ 
                        fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.5, marginTop: 6, 
                        fontStyle: "italic", paddingLeft: 12, borderLeft: `2px solid ${T.borderSoft}`
                      }}>
                        {s.why}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Feel / Wrong */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
            {ex.feel && <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>}
            {ex.wrong && <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>}
          </div>

          {/* Sarah quote */}
          {ex.sarah && <SarahQuote text={ex.sarah} />}

          {/* Level up */}
          {ex.levelUp && (
            <div style={{
              fontSize: 12, color: T.gold, fontFamily: T.sans, fontWeight: 600,
              padding: "8px 0", borderTop: `1px solid ${T.border}`, marginTop: 8
            }}>
              Level up → {ex.levelUp}
            </div>
          )}

          {/* Complete button */}
          <button onClick={() => onComplete(ex.id)} style={{
            marginTop: 16, width: "100%",
            background: completed ? "transparent" : T.gold,
            border: completed ? `1px solid ${T.border}` : "none",
            color: completed ? T.textLight : "#fff",
            padding: "14px", fontSize: 12, fontWeight: 400,
            cursor: "pointer", fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase"
          }}>
            {completed ? "Mark Incomplete" : "Complete Exercise"}
          </button>
        </div>
      )}
    </div>
  );
}

function DayView({ day, completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const c = DAY_COLORS[(day.num - 1) % DAY_COLORS.length];
  const total = day.exercises.length;
  const done = day.exercises.filter(e => completed.has(e.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ animation: "fade-in-up 0.4s ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, borderBottom: `1px solid ${T.borderSoft}`, paddingBottom: 16 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: 2.5, textTransform: "uppercase", color: c, fontFamily: T.sans, marginBottom: 6 }}>Day {day.num}</div>
          <div style={{ fontSize: 32, fontWeight: 400, color: T.textDark, fontFamily: T.serif, lineHeight: 1 }}>{day.name}</div>
          <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans, marginTop: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
            {day.focus} <span style={{ opacity: 0.3 }}>|</span> <Clock size={12} /> {day.duration}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <StartFlowButton onClick={() => onStartFlow(day.exercises, c)} accentColor={c} />
          <div style={{ textAlign: "right", minWidth: 64 }}>
            <div style={{ fontSize: 28, fontWeight: 700, fontFamily: T.serif, color: pct === 100 ? T.success : T.textDark, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
              {pct === 100 ? <CheckCircle2 size={24} color={T.success} strokeWidth={2.5} /> : `${pct}%`}
            </div>
          </div>
        </div>
      </div>

      {/* Setup */}
      {day.setup && (
        <div style={{
          background: T.getTint(c, 0.03), border: `1px solid ${c}15`, borderRadius: T.radius,
          padding: "16px 20px", marginBottom: 24, fontSize: 13, color: T.textMed, fontFamily: T.sans,
          lineHeight: 1.6, boxShadow: `0 4px 12px ${c}08`
        }}>
          <span style={{ fontWeight: 900, color: T.textDark, fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, marginRight: 10 }}>Setup:</span>{day.setup}
        </div>
      )}

      <div style={{ marginBottom: 12 }}></div>

      {day.exercises.map(ex => (
        <ExerciseCard key={ex.id} ex={ex} metro={metro}
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} levelExercises={day.exercises} />
      ))}
    </div>
  );
}

// VocalCard removed — voice tab now uses VoiceView with ExerciseCard format

function VowelMap() {
  const zones = [
    { range: [0, 3], label: "'ah' open", color: T.success },
    { range: [3, 4], label: "'ah'→'uh'", color: T.warm },
    { range: [4, 5], label: "'uh'→'oh'", color: T.coral },
    { range: [5, 9], label: "'oh' (head)", color: T.plum }
  ];

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      padding: "24px 24px 16px", marginBottom: 20, boxShadow: T.sm
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, marginBottom: 8, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase", textAlign: "center" }}>
        Vowel Modification Map (Tap to play)
      </div>

      <div style={{ padding: "0 12px" }}>
        <InlineKeyboard
          range={["E3", "C4"]}
          theme="dark"
          zoneMap={zones}
        />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, justifyContent: "center" }}>
        {zones.map(z => (
          <div key={z.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: z.color, boxShadow: `0 0 4px ${z.color}80` }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: T.textMed, fontFamily: T.sans }}>{z.label}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
        As you ascend, close the vowel to lower the first formant. 'Ah' on G3 → hint of 'uh' on A♭3 → 'aw' on A3 → 'oh' in head voice.
      </div>
    </div>
  );
}
// Normalize drone voicing notes (spread across octaves like A2,A3,E4,C5)
// into pitch classes placed within a target keyboard range for display
function normalizeDroneNotes(droneNotes, range) {
  if (!Array.isArray(droneNotes) || droneNotes.length === 0) return [];

  const parseOct = (note, fallback) => {
    const m = String(note || "").match(/\d+/);
    return m ? parseInt(m[0], 10) : fallback;
  };

  const startOct = parseOct(range?.[0], 3);
  const endOct = parseOct(range?.[1], 5);

  // Extract unique pitch classes from drone voicing
  const seen = new Set();
  const pitchClasses = [];
  for (const note of droneNotes) {
    const pc = note.replace(/\d+$/, '').replace('\u266D', 'b'); // normalize to ASCII
    if (!pc || seen.has(pc)) continue;
    seen.add(pc);
    pitchClasses.push(pc);
  }

  // Place each pitch class at every octave in the keyboard range, in both flat formats
  const result = [];
  for (const pc of pitchClasses) {
    for (let oct = startOct; oct <= endOct; oct++) {
      result.push(`${pc}${oct}`);
      if (pc.includes('b')) result.push(`${pc.replace(/b/g, '\u266D')}${oct}`);
      else if (pc.includes('\u266D')) result.push(`${pc.replace(/\u266D/g, 'b')}${oct}`);
    }
  }
  return result;
}

function PianoKeysDiagram({ notes = [], label = "", range }) {
  // Use the new shared InlineKeyboard component
  let actualRange = range;

  if (!actualRange && notes.length > 0) {
    const startOct = Math.min(...notes.map(n => parseInt(n.slice(-1))));
    const endOct = Math.max(...notes.map(n => parseInt(n.slice(-1))));
    actualRange = [`C${startOct}`, `B${endOct}`];
  } else if (!actualRange) {
    actualRange = ["C3", "B4"]; // fallback
  }

  return (
    <InlineKeyboard
      range={actualRange}
      highlightNotes={notes}
      label={label}
    />
  );
}

// ─── VOICE CURRICULUM ───────────────────────────────────────────────

const VOCAL_COLORS = ["#9e829c", "#8b6f89", "#d97d54", "#7f9e88", "#5b7fa5", "#d68383", "#72a8a8", "#d4a373", "#6b8e9f", "#9e829c", "#7a6f8e", "#c9815e", "#6a9e7a", "#8b7fa5"];

function VoiceView({ completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem("voice-current-level");
      if (saved) {
        const found = VOCAL_LEVELS.find(l => l.num === parseInt(saved));
        if (found) return found;
      }
    } catch { }
    return VOCAL_LEVELS[0];
  });

  const unlocked = new Set(VOCAL_LEVELS.map(l => l.num));

  useEffect(() => {
    localStorage.setItem("voice-current-level", String(selectedLevel.num));
  }, [selectedLevel]);

  const totalEx = VOCAL_LEVELS.reduce((a, l) => a + l.exercises.length, 0);
  const totalDone = VOCAL_LEVELS.reduce((a, l) => a + l.exercises.filter(e => completed.has(e.id)).length, 0);
  const overallPct = Math.round((totalDone / totalEx) * 100);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#9e829c", fontFamily: T.sans, marginBottom: 6 }}>
          Singer-Songwriter Curriculum
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Voice</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Breath to Performance · Psych-Surf-Reggae · {totalDone}/{totalEx} exercises
        </div>
        <div style={{ width: "100%", maxWidth: 320, margin: "16px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? T.success : T.gold, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: overallPct === 100 ? T.success : T.gold, minWidth: 36 }}>{overallPct}%</div>
        </div>
      </div>

      <VowelMap />

      {/* Level pills — horizontal scroll */}
      <div className="hide-scrollbar sticky-pill-bar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
        background: T.bg + "e6", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
        msOverflowStyle: "none", scrollbarWidth: "none",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {VOCAL_LEVELS.map((level, idx) => {
          const c = VOCAL_COLORS[idx % VOCAL_COLORS.length];
          const done = level.exercises.filter(e => completed.has(e.id)).length;
          const total = level.exercises.length;
          const pct = Math.round((done / total) * 100);
          const active = selectedLevel.num === level.num;
          const isUnlocked = unlocked.has(level.num);
          return (
            <button key={level.num} onClick={() => isUnlocked && setSelectedLevel(level)} style={{
              flex: "0 0 auto", scrollSnapAlign: "start",
              background: isUnlocked ? (active ? c : T.bgCard) : "transparent",
              border: `1px solid ${isUnlocked && active ? c : T.border}`,
              borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
              cursor: isUnlocked ? "pointer" : "default", textAlign: "center", transition: "all 0.2s",
              opacity: isUnlocked ? 1 : 0.4,
              boxShadow: active ? `0 4px 10px ${c}40` : "none"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : c, fontFamily: T.sans }}>
                LVL {level.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                {isUnlocked ? level.name : "🔒"}
              </div>
              {isUnlocked && pct > 0 && (
                <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : c), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                  {pct === 100 ? "done" : `${done}/${total}`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Level description */}
      <div style={{
        background: T.plumSoft, border: `1px solid ${T.plum}20`, borderRadius: T.radiusMd,
        padding: "16px 20px", marginTop: 20, marginBottom: 4
      }}>
        <div style={{ fontSize: 15, fontWeight: 400, fontFamily: T.serif, color: T.textDark, marginBottom: 6 }}>
          {selectedLevel.subtitle}
        </div>
        <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, marginBottom: 8 }}>
          {selectedLevel.description}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
            <span style={{ fontWeight: 700, color: T.plum, textTransform: "uppercase", letterSpacing: 1 }}>Artists: </span>{selectedLevel.artists}
          </div>
          <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
            <span style={{ fontWeight: 700, color: T.plum, textTransform: "uppercase", letterSpacing: 1 }}>Unlocks: </span>{selectedLevel.unlocks}
          </div>
        </div>
      </div>

      {/* Flow button + Review check-in + Selected level exercises */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(selectedLevel.exercises, T.plum)} accentColor={T.plum} />
        </div>
        <ReviewCheckIn review={selectedLevel.review} accentColor={T.plum} />
        <LevelView level={selectedLevel} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} levelColor={VOCAL_COLORS[(selectedLevel.num - 1) % VOCAL_COLORS.length]} onStartFlow={onStartFlow} />
      </div>

      {/* Milestone message for Levels 1-2 */}
      {selectedLevel.num <= 2 && (
        <div style={{
          marginTop: 24, padding: "16px", background: T.bgSoft, border: `1px solid ${T.border}`,
          borderRadius: T.radiusMd, textAlign: "center"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 4 }}>
            Milestone
          </div>
          <div style={{ fontSize: 14, color: T.textMed, fontFamily: T.sans }}>
            After these, you have the physical foundation for everything else.
          </div>
        </div>
      )}
    </div>
  );
}


function MetronomePanel({ metro, onOpenTapMatch }) {
  const [editingBeat, setEditingBeat] = useState(null);
  const [taps, setTaps] = useState([]);

  const handleTapTempo = () => {
    const now = Date.now();
    setTaps(prev => {
      const recent = prev.filter(t => now - t < 3000);
      const newTaps = [...recent, now];
      if (newTaps.length > 1) {
        let durs = [];
        for (let i = 1; i < newTaps.length; i++) durs.push(newTaps[i] - newTaps[i - 1]);
        const avg = durs.reduce((a, b) => a + b, 0) / durs.length;
        const bpm = Math.round(60000 / avg);
        if (bpm >= 40 && bpm <= 280) metro.changeBpm(bpm);
      }
      return newTaps;
    });
  };

  return (
    <div>
      {/* Main metronome card */}
      <div style={{
        position: "relative",
        background: metro.playing ? T.bgSoft : T.bgCard, 
        border: `1px solid ${metro.playing ? T.gold : T.borderSoft}`,
        boxShadow: metro.playing ? `inset 0 2px 10px ${T.bgSoft}, 0 0 20px ${T.gold}20` : T.shadow,
        padding: "40px 24px", textAlign: "center", borderRadius: T.radius,
        transition: "all 0.4s", overflow: "hidden"
      }}>
        {/* Subtle SVG Grid Background */}
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: 0.1 }}>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={T.textMed} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 10, color: metro.playing ? T.gold : T.textMuted, fontWeight: 800, letterSpacing: 3, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 24, transition: "color 0.4s" }}>
            Drum Engine
          </div>

          {/* Beat visualizer — tap beats to edit */}
          <BeatDots beat={metro.beat} playing={metro.playing} beatConfig={metro.beatConfig} beatsPerBar={metro.beatsPerBar} />

          <div style={{ fontSize: 84, fontWeight: 800, color: metro.playing ? T.textDark : T.textMed, fontFamily: T.sans, margin: "16px 0 0", lineHeight: 1, letterSpacing: -2, textShadow: metro.playing ? `0 2px 12px ${T.gold}40` : "none", transition: "all 0.4s" }}>
            {metro.bpm}
          </div>
          <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 3, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 32, fontWeight: 700 }}>BPM</div>

          <input type="range" min={40} max={280} value={metro.bpm}
            onChange={e => metro.changeBpm(Number(e.target.value))}
            style={{ width: "100%", accentColor: T.gold, marginBottom: 32, height: 4, borderRadius: 2, outline: "none", background: T.borderSoft }} />

          {/* Preset BPMs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 32 }}>
            {[78, 120, 122, 165, 200, 244].map(v => (
              <button key={v} onClick={() => metro.changeBpm(v)} style={{
                background: metro.bpm === v ? T.gold : "transparent", 
                border: `1px solid ${metro.bpm === v ? T.gold : T.border}`,
                color: metro.bpm === v ? "#fff" : T.textMed, padding: "10px 0", borderRadius: T.radius,
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: T.sans, letterSpacing: 1,
                boxShadow: metro.bpm === v ? `0 4px 12px ${T.gold}40` : "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseOver={e => { if(metro.bpm !== v) { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; } }}
              onMouseOut={e => { if(metro.bpm !== v) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMed; } }}
              >{v}</button>
            ))}
          </div>

          {/* Start/Stop & Tap Tempo */}
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={handleTapTempo} style={{
              flex: 1, background: "transparent", border: `2px dashed ${T.border}`, color: T.textMed,
              padding: "16px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
              fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase", transition: "all 0.2s"
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = T.textMed; e.currentTarget.style.color = T.textDark; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMed; }}
            >
              ✋ Tap
            </button>
            <button onClick={metro.playing ? metro.stop : metro.start} style={{
              flex: 1.5, background: metro.playing ? T.bgCard : T.gold, border: `2px solid ${metro.playing ? T.coral : T.gold}`, color: metro.playing ? T.coral : "#fff",
              padding: "16px", fontSize: 14, fontWeight: 800, cursor: "pointer", borderRadius: T.radius,
              fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
              boxShadow: metro.playing ? `0 4px 20px ${T.coral}40` : `0 4px 16px ${T.gold}40`,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {metro.playing ? "Stop Engine" : "Start Engine"}
            </button>
          </div>
        </div>
      </div>

      {/* Sound Kit selector */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: "24px", marginTop: 24, borderRadius: T.radius, boxShadow: T.shadow
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 16 }}>
          Sound Kit
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {KIT_KEYS.map(k => (
            <button key={k} onClick={() => metro.setSoundKit(k)} style={{
              background: metro.soundKit === k ? T.goldSoft : "transparent",
              border: `1px solid ${metro.soundKit === k ? T.gold : T.borderSoft}`,
              color: metro.soundKit === k ? T.textDark : T.textMed,
              padding: "10px 16px", fontSize: 12, fontWeight: metro.soundKit === k ? 700 : 500, cursor: "pointer", fontFamily: T.sans, letterSpacing: 0.5,
              borderRadius: T.radius, transition: "all 0.2s"
            }}>{SOUND_KITS[k].label}</button>
          ))}
        </div>
      </div>

      {/* Time Signature */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: "24px", marginTop: 16, borderRadius: T.radius, boxShadow: T.shadow
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 16 }}>
          Time Signature
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[2, 3, 4, 5, 6, 7].map(n => (
            <button key={n} onClick={() => metro.changeBeats(n)} style={{
              background: metro.beatsPerBar === n ? T.goldSoft : "transparent",
              border: `1px solid ${metro.beatsPerBar === n ? T.gold : T.borderSoft}`,
              color: metro.beatsPerBar === n ? T.textDark : T.textMed,
              padding: "10px 16px", fontSize: 13, fontWeight: metro.beatsPerBar === n ? 700 : 500, cursor: "pointer", fontFamily: T.sans,
              borderRadius: T.radius, transition: "all 0.2s"
            }}>{n}/4</button>
          ))}
        </div>
      </div>

      {/* Practice Features */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: "24px", marginTop: 16, borderRadius: T.radius, boxShadow: T.shadow
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 16 }}>
          Practice Engine
        </div>

        {/* Subdivisions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
          {[{v:"4n",l:"Quarter"}, {v:"8n",l:"8ths"}, {v:"16n",l:"16ths"}, {v:"8t",l:"Triplets"}].map(sub => (
            <button key={sub.v} onClick={() => metro.setSubdivision(sub.v)} style={{
              background: metro.subdivision === sub.v ? T.goldSoft : "transparent",
              border: `1px solid ${metro.subdivision === sub.v ? T.gold : T.borderSoft}`,
              color: metro.subdivision === sub.v ? T.textDark : T.textMed, borderRadius: T.radius,
              padding: "10px 6px", fontSize: 11, fontWeight: metro.subdivision === sub.v ? 700 : 500, cursor: "pointer", fontFamily: T.sans,
              transition: "all 0.2s"
            }}>{sub.l}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <button onClick={() => metro.setGapClickActive(!metro.gapClickActive)} style={{
            flex: 1, background: metro.gapClickActive ? T.gold : "transparent",
            border: `1px solid ${metro.gapClickActive ? T.gold : T.borderSoft}`,
            color: metro.gapClickActive ? "#fff" : T.textMed, borderRadius: T.radius,
            padding: "12px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
            boxShadow: metro.gapClickActive ? `0 4px 12px ${T.gold}40` : "none", transition: "all 0.2s"
          }}>Gap Click</button>

          <button onClick={() => metro.setSpeedBuilder(!metro.speedBuilder)} style={{
            flex: 1, background: metro.speedBuilder ? T.gold : "transparent",
            border: `1px solid ${metro.speedBuilder ? T.gold : T.borderSoft}`,
            color: metro.speedBuilder ? "#fff" : T.textMed, borderRadius: T.radius,
            padding: "12px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: T.sans,
            boxShadow: metro.speedBuilder ? `0 4px 12px ${T.gold}40` : "none", transition: "all 0.2s"
          }}>Speed Builder (+{metro.speedIncrement}/{metro.speedBars} bars)</button>
        </div>

        {metro.gapClickActive && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radiusMd }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Play Bars</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4, 8].map(n => (
                    <button key={n} onClick={() => metro.setGapClickPlay(n)} style={{
                      background: metro.gapClickPlay === n ? T.gold : "transparent",
                      border: `1px solid ${metro.gapClickPlay === n ? T.gold : T.borderSoft}`,
                      color: metro.gapClickPlay === n ? "#fff" : T.textMed,
                      borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: T.sans, minWidth: 32
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Mute Bars</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 4, 8].map(n => (
                    <button key={n} onClick={() => metro.setGapClickMute(n)} style={{
                      background: metro.gapClickMute === n ? T.gold : "transparent",
                      border: `1px solid ${metro.gapClickMute === n ? T.gold : T.borderSoft}`,
                      color: metro.gapClickMute === n ? "#fff" : T.textMed,
                      borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: T.sans, minWidth: 32
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginTop: 8 }}>
              Plays for {metro.gapClickPlay} bar{metro.gapClickPlay > 1 ? "s" : ""}, then goes silent for {metro.gapClickMute} bar{metro.gapClickMute > 1 ? "s" : ""} to test your internal timing.
            </div>
          </div>
        )}

        {metro.speedBuilder && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radiusMd }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>+ BPM</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1, 2, 3, 5, 10].map(n => (
                    <button key={n} onClick={() => metro.setSpeedIncrement(n)} style={{
                      background: metro.speedIncrement === n ? T.gold : "transparent",
                      border: `1px solid ${metro.speedIncrement === n ? T.gold : T.borderSoft}`,
                      color: metro.speedIncrement === n ? "#fff" : T.textMed,
                      borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: T.sans, minWidth: 32
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Every N bars</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[2, 4, 8, 16].map(n => (
                    <button key={n} onClick={() => metro.setSpeedBars(n)} style={{
                      background: metro.speedBars === n ? T.gold : "transparent",
                      border: `1px solid ${metro.speedBars === n ? T.gold : T.borderSoft}`,
                      color: metro.speedBars === n ? "#fff" : T.textMed,
                      borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                      cursor: "pointer", fontFamily: T.sans, minWidth: 32
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Loop back at BPM (0 = off)</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button onClick={() => metro.setSpeedCeiling(0)} style={{
                  background: metro.speedCeiling === 0 ? T.gold : "transparent",
                  border: `1px solid ${metro.speedCeiling === 0 ? T.gold : T.borderSoft}`,
                  color: metro.speedCeiling === 0 ? "#fff" : T.textMed,
                  borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", fontFamily: T.sans, minWidth: 32
                }}>Off</button>
                {[80, 90, 100, 110, 120, 140, 160].map(n => (
                  <button key={n} onClick={() => metro.setSpeedCeiling(n)} style={{
                    background: metro.speedCeiling === n ? T.coral : "transparent",
                    border: `1px solid ${metro.speedCeiling === n ? T.coral : T.borderSoft}`,
                    color: metro.speedCeiling === n ? "#fff" : T.textMed,
                    borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: T.sans, minWidth: 32
                  }}>{n}</button>
                ))}
              </div>
              {metro.speedCeiling > 0 && (
                <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginTop: 4 }}>
                  ↩ Loops back to {metro.bpm} BPM after reaching {metro.speedCeiling}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Per-beat editor */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 20, marginTop: 16, borderRadius: T.radius
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans }}>
            Beat Editor
          </div>
          <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans }}>
            Tap accent to cycle · Tap sound to change
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {metro.beatConfig.map((bc, i) => {
            const acc = ACCENT_CONFIG[bc.accent];
            const kitLabel = bc.kit ? SOUND_KITS[bc.kit]?.label : SOUND_KITS[metro.soundKit]?.label;
            const isEditing = editingBeat === i;
            return (
              <div key={i} style={{
                flex: 1, maxWidth: 80, textAlign: "center"
              }}>
                {/* Beat number */}
                <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
                  {i === 0 ? "▼" : (i + 1)}
                </div>

                {/* Accent button — tap to cycle accent level */}
                <button onClick={() => metro.cycleAccent(i)} style={{
                  width: "100%", padding: "10px 4px",
                  background: bc.accent === "mute" ? "transparent" : `${acc.color}15`,
                  border: `2px solid ${bc.accent === "mute" ? T.border : acc.color}`,
                  borderStyle: bc.accent === "mute" ? "dashed" : "solid",
                  borderRadius: `${T.radius} ${T.radius} 0 0`, cursor: "pointer",
                  transition: "all 0.15s"
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: acc.color, fontFamily: T.sans,
                    textTransform: "uppercase", letterSpacing: 1
                  }}>{acc.label}</div>
                  <div style={{
                    width: bc.accent === "accent" ? 20 : bc.accent === "normal" ? 14 : bc.accent === "ghost" ? 8 : 0,
                    height: bc.accent === "accent" ? 20 : bc.accent === "normal" ? 14 : bc.accent === "ghost" ? 8 : 0,
                    borderRadius: "50%", background: bc.accent === "mute" ? "transparent" : acc.color,
                    margin: "6px auto 0", transition: "all 0.15s",
                    border: bc.accent === "mute" ? `1px dashed ${T.border}` : "none"
                  }} />
                </button>

                {/* Sound selector — tap to open kit picker */}
                <button onClick={() => setEditingBeat(isEditing ? null : i)} style={{
                  width: "100%", padding: "6px 4px",
                  background: isEditing ? T.goldSoft : "transparent",
                  border: `1px solid ${T.border}`, borderTop: "none",
                  borderRadius: `0 0 ${T.radius} ${T.radius}`, cursor: "pointer",
                  fontSize: 10, color: bc.kit ? T.gold : T.textMuted, fontFamily: T.sans, fontWeight: 600
                }}>
                  {kitLabel}
                </button>

                {/* Kit picker dropdown */}
                {isEditing && (
                  <div style={{
                    position: "relative", zIndex: 20, marginTop: 4,
                    background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
                    boxShadow: T.md, overflow: "hidden"
                  }}>
                    {/* Default (inherit) option */}
                    <button onClick={() => { metro.setBeatKit(i, metro.soundKit); setEditingBeat(null); }} style={{
                      width: "100%", padding: "8px", background: !bc.kit ? T.goldSoft : "transparent",
                      border: "none", borderBottom: `1px solid ${T.border}`,
                      fontSize: 11, color: !bc.kit ? T.gold : T.textMed, fontFamily: T.sans, cursor: "pointer",
                      fontWeight: !bc.kit ? 700 : 400, textAlign: "left"
                    }}>Default</button>
                    {KIT_KEYS.map(k => (
                      <button key={k} onClick={() => { metro.setBeatKit(i, k); setEditingBeat(null); }} style={{
                        width: "100%", padding: "8px", background: bc.kit === k ? T.goldSoft : "transparent",
                        border: "none", borderBottom: `1px solid ${T.border}`,
                        fontSize: 11, color: bc.kit === k ? T.gold : T.textMed, fontFamily: T.sans, cursor: "pointer",
                        fontWeight: bc.kit === k ? 700 : 400, textAlign: "left"
                      }}>{SOUND_KITS[k].label}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Accent legend */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
          {ACCENT_LEVELS.map(a => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: a === "mute" ? "transparent" : ACCENT_CONFIG[a].color,
                border: a === "mute" ? `1px dashed ${T.border}` : "none"
              }} />
              <span style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>{ACCENT_CONFIG[a].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// A streamlined version of MetronomePanel focusing strictly on Practice Features + Beat Editor
function CompactMetronomeControls({ metro, theme: T }) {
  const [taps, setTaps] = useState([]);
  const [editingBeat, setEditingBeat] = useState(null);

  const handleTapTempo = () => {
    const now = Date.now();
    setTaps(prev => {
      const recent = prev.filter(t => now - t < 3000);
      const newTaps = [...recent, now];
      if (newTaps.length > 1) {
        let durs = [];
        for (let i = 1; i < newTaps.length; i++) durs.push(newTaps[i] - newTaps[i - 1]);
        const avg = durs.reduce((a, b) => a + b, 0) / durs.length;
        const bpm = Math.round(60000 / avg);
        if (bpm >= 40 && bpm <= 280) metro.changeBpm(bpm);
      }
      return newTaps;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Time Signature */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
          Time Signature
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
          {[2, 3, 4, 5, 6, 7].map(n => (
            <button key={n} onClick={() => metro.changeBeats(n)} style={{
              background: metro.beatsPerBar === n ? T.gold : "transparent",
              border: `1px solid ${metro.beatsPerBar === n ? T.gold : "rgba(150,150,150,0.2)"}`,
              color: metro.beatsPerBar === n ? "#fff" : T.textMed,
              padding: "6px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: T.sans, borderRadius: 6
            }}>{n}/4</button>
          ))}
        </div>
      </div>

      {/* Practice Features */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
          Practice Features
        </div>

        {/* Subdivisions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 6 }}>
          {[{v:"4n",l:"Quarter"}, {v:"8n",l:"8ths"}, {v:"16n",l:"16ths"}, {v:"8t",l:"Triplets"}].map(sub => (
            <button key={sub.v} onClick={() => metro.setSubdivision(sub.v)} style={{
              background: metro.subdivision === sub.v ? T.gold : "transparent",
              border: `1px solid ${metro.subdivision === sub.v ? T.gold : "rgba(150,150,150,0.2)"}`,
              color: metro.subdivision === sub.v ? "#fff" : T.textMed, borderRadius: 6,
              padding: "6px", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
            }}>{sub.l}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <button onClick={() => metro.setGapClickActive(!metro.gapClickActive)} style={{
            background: metro.gapClickActive ? T.gold : "transparent",
            border: `1px solid ${metro.gapClickActive ? T.gold : "rgba(150,150,150,0.2)"}`,
            color: metro.gapClickActive ? "#fff" : T.textMed, borderRadius: 6,
            padding: "8px", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
          }}>Gap Click</button>

          <button onClick={() => metro.setSpeedBuilder(!metro.speedBuilder)} style={{
            background: metro.speedBuilder ? T.gold : "transparent",
            border: `1px solid ${metro.speedBuilder ? T.gold : "rgba(150,150,150,0.2)"}`,
            color: metro.speedBuilder ? "#fff" : T.textMed, borderRadius: 6,
            padding: "8px", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
          }}>Speed Builder</button>
        </div>

        {metro.gapClickActive && (
          <div style={{ marginTop: 8, padding: "10px", background: "rgba(0,0,0,0.03)", border: `1px solid rgba(150,150,150,0.1)`, borderRadius: 6 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Play Bars</div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 8].map(n => (
                    <button key={n} onClick={() => metro.setGapClickPlay(n)} style={{
                      flex: 1, background: metro.gapClickPlay === n ? T.gold : "transparent",
                      border: `1px solid ${metro.gapClickPlay === n ? T.gold : "rgba(150,150,150,0.2)"}`,
                      color: metro.gapClickPlay === n ? "#fff" : T.textMed,
                      borderRadius: 4, padding: "4px 0", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Mute Bars</div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 8].map(n => (
                    <button key={n} onClick={() => metro.setGapClickMute(n)} style={{
                      flex: 1, background: metro.gapClickMute === n ? T.gold : "transparent",
                      border: `1px solid ${metro.gapClickMute === n ? T.gold : "rgba(150,150,150,0.2)"}`,
                      color: metro.gapClickMute === n ? "#fff" : T.textMed,
                      borderRadius: 4, padding: "4px 0", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, marginTop: 8 }}>
              Plays for {metro.gapClickPlay} bar{metro.gapClickPlay > 1 ? "s" : ""}, then goes silent for {metro.gapClickMute} bar{metro.gapClickMute > 1 ? "s" : ""} to test your internal timing.
            </div>
          </div>
        )}

        {metro.speedBuilder && (
          <div style={{ marginTop: 8, padding: "10px", background: "rgba(0,0,0,0.03)", border: `1px solid rgba(150,150,150,0.1)`, borderRadius: 6 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>+ BPM</div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 5, 10].map(n => (
                    <button key={n} onClick={() => metro.setSpeedIncrement(n)} style={{
                      flex: 1, background: metro.speedIncrement === n ? T.gold : "transparent",
                      border: `1px solid ${metro.speedIncrement === n ? T.gold : "rgba(150,150,150,0.2)"}`,
                      color: metro.speedIncrement === n ? "#fff" : T.textMed,
                      borderRadius: 4, padding: "4px 0", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Every N bars</div>
                <div style={{ display: "flex", gap: 2 }}>
                  {[2, 4, 8, 16].map(n => (
                    <button key={n} onClick={() => metro.setSpeedBars(n)} style={{
                      flex: 1, background: metro.speedBars === n ? T.gold : "transparent",
                      border: `1px solid ${metro.speedBars === n ? T.gold : "rgba(150,150,150,0.2)"}`,
                      color: metro.speedBars === n ? "#fff" : T.textMed,
                      borderRadius: 4, padding: "4px 0", fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: T.sans
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Loop back at BPM (0 = off)</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button onClick={() => metro.setSpeedCeiling(0)} style={{
                  background: metro.speedCeiling === 0 ? T.gold : "transparent",
                  border: `1px solid ${metro.speedCeiling === 0 ? T.gold : "rgba(150,150,150,0.2)"}`,
                  color: metro.speedCeiling === 0 ? "#fff" : T.textMed,
                  borderRadius: 4, padding: "4px 8px", fontSize: 11, fontWeight: 500,
                  cursor: "pointer", fontFamily: T.sans, minWidth: 32
                }}>Off</button>
                {[80, 90, 100, 110, 120, 140, 160].map(n => (
                  <button key={n} onClick={() => metro.setSpeedCeiling(n)} style={{
                    background: metro.speedCeiling === n ? T.coral : "transparent",
                    border: `1px solid ${metro.speedCeiling === n ? T.coral : "rgba(150,150,150,0.2)"}`,
                    color: metro.speedCeiling === n ? "#fff" : T.textMed,
                    borderRadius: 4, padding: "4px 8px", fontSize: 11, fontWeight: 500,
                    cursor: "pointer", fontFamily: T.sans, minWidth: 32
                  }}>{n}</button>
                ))}
              </div>
              {metro.speedCeiling > 0 && (
                <div style={{ fontSize: 10, color: T.textLight, fontFamily: T.sans, marginTop: 4 }}>
                  ↩ Loops back to {metro.bpm} BPM after reaching {metro.speedCeiling}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tap Tempo standalone button */}
        <button onClick={handleTapTempo} className="interactive-btn" style={{
          marginTop: 12, width: "100%", background: "transparent", border: `1px dashed ${T.border}`, color: T.textMed,
          padding: "12px", fontSize: 10, fontWeight: 800, cursor: "pointer", borderRadius: T.radius,
          fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase"
        }}>
          Tap Tempo
        </button>
      </div>

    </div>
  );
}

// Extracted Beat Editor that can sit directly on the main metronome bar
function CompactBeatEditor({ metro, theme: T }) {
  const [internalBeat, setInternalBeat] = useState(0);

  useEffect(() => {
    const handleBeat = (e) => setInternalBeat(e.detail.beat);
    window.addEventListener('metroBeat', handleBeat);
    return () => window.removeEventListener('metroBeat', handleBeat);
  }, []);

  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", height: "100%", width: "100%", padding: "4px 4px" }}>
      {metro.beatConfig.map((bc, i) => {
        const acc = ACCENT_CONFIG[bc.accent];
        const isActive = internalBeat === i;
        
        return (
          <div key={i} style={{
            position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
          }}>
            {/* Accent button — tap to cycle accent level */}
            <button onClick={(e) => { e.stopPropagation(); metro.cycleAccent(i); }} style={{
              padding: "0", width: 26, height: 26, flexShrink: 0,
              background: bc.accent === "mute" ? "transparent" : `${acc.color}${isActive ? '30' : '15'}`,
              border: `2px solid ${bc.accent === "mute" ? "rgba(150,150,150,0.2)" : (isActive ? acc.color : acc.color + '40')}`,
              borderStyle: bc.accent === "mute" ? "dashed" : "solid",
              borderRadius: `50%`, cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
              transform: isActive ? "scale(1.15)" : "scale(1)",
              boxShadow: isActive && bc.accent !== "mute" ? `0 0 10px ${acc.color}50` : "none"
            }}>
              <div style={{
                width: bc.accent === "accent" ? 10 : bc.accent === "normal" ? 6 : bc.accent === "ghost" ? 3 : 0,
                height: bc.accent === "accent" ? 10 : bc.accent === "normal" ? 6 : bc.accent === "ghost" ? 3 : 0,
                borderRadius: "50%", background: bc.accent === "mute" ? "transparent" : acc.color,
                transition: "all 0.15s",
                border: bc.accent === "mute" ? `1px dashed ${T.border}` : "none"
              }} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function TapMatchModal({ targetBpm, onClose, metro }) {
  const [taps, setTaps] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [tapMultiplier, setTapMultiplier] = useState(1); // 1 = 1 tap/beat, 0.5 = 1 tap/2 beats, 2 = 2 taps/beat
  const [isCountingIn, setIsCountingIn] = useState(true);
  const [countDown, setCountDown] = useState(4);

  // Start metronome on mount, restore on unmount
  useEffect(() => {
    const prevBpm = metro.bpm;
    const prevPlaying = metro.playing;

    metro.changeBpm(targetBpm);
    if (!metro.playing) metro.start();

    // Count-in logic
    let beats = 4;
    setCountDown(beats);
    const interval = (60000 / targetBpm);
    const timer = setInterval(() => {
      beats -= 1;
      if (beats <= 0) {
        setIsCountingIn(false);
        clearInterval(timer);
      } else {
        setCountDown(beats);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      metro.changeBpm(prevBpm);
      if (!prevPlaying) metro.stop();
    };
  }, [targetBpm]);

  const handleTap = useCallback((e) => {
    if (e) {
      if (e.type === "pointerdown") {
        // Only trigger on primary button (e.g. left click) to avoid context menus
        if (e.button !== 0 && e.button !== undefined) return;
        e.preventDefault();
      }
    }
    if (isCountingIn) return;

    const now = performance.now();
    setTaps(prev => {
      // If it's been more than 2.5 seconds since the last tap, reset
      if (prev.length > 0 && now - prev[prev.length - 1] > 2500) {
        return [now];
      }
      const newTaps = [...prev, now];
      // keep up to 12 taps for a smoother average
      if (newTaps.length > 12) newTaps.shift();
      return newTaps;
    });

    setRipples(prev => [...prev.slice(-4), now]);
  }, [isCountingIn]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleTap]);

  const expectedBpm = Math.round(metro.bpm * tapMultiplier);

  // Calculate current BPM & Accuracy
  let currentBpm = "--";
  let lastTapDiff = null;

  if (taps.length > 1) {
    let durations = [];
    for (let i = 1; i < taps.length; i++) {
      durations.push(taps[i] - taps[i - 1]);
    }

    // Calculate last tap accuracy against expected interval
    const lastInterval = durations[durations.length - 1];
    const expectedInterval = 60000 / expectedBpm;
    lastTapDiff = Math.round(lastInterval - expectedInterval);

    // Smooth the curve: discard the highest and lowest durations if we have enough data
    if (durations.length >= 4) {
      durations.sort((a, b) => a - b);
      durations = durations.slice(1, -1);
    }

    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    currentBpm = Math.round(60000 / avgDuration);
  }

  const diff = currentBpm !== "--" ? currentBpm - expectedBpm : 0;
  const isClose = Math.abs(diff) <= 3;

  const getFeedbackColor = () => {
    if (isCountingIn) return T.gold;
    if (currentBpm === "--") return T.gold;
    return isClose ? T.success : T.coral;
  };
  const feedbackColor = getFeedbackColor();

  return (
    <div
      onPointerDown={handleTap}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: T.bg, // Solid background
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: T.textDark,
        touchAction: "none", // Prevents zooming/scrolling on mobile to avoid missed taps
      }}
    >
      <style>{`
        @keyframes tap-ripple-anim {
          0% { transform: scale(0.5); opacity: 0.8; border-width: 8px; }
          100% { transform: scale(4.5); opacity: 0; border-width: 1px; }
        }
        .tap-ripple {
          position: absolute; top: 50%; left: 50%;
          width: 120px; height: 120px; margin-left: -60px; margin-top: -60px;
          border-radius: 50%;
          border-style: solid;
          pointer-events: none; z-index: 0;
          animation: tap-ripple-anim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Edge glow when locked in */}
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: isClose && !isCountingIn ? `inset 0 0 120px ${T.success}20` : "none",
        transition: "box-shadow 0.5s ease",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* Ripple Animations */}
      {ripples.map(id => (
        <div key={id} className="tap-ripple" style={{
          borderColor: feedbackColor
        }} />
      ))}

      {/* Close button layered above the animation */}
      <button onPointerDown={(e) => { e.stopPropagation(); onClose(); }} style={{
        position: "absolute", top: 30, right: 30,
        background: "transparent", border: `1px solid ${T.border}`, padding: "10px 20px",
        borderRadius: T.radius, cursor: "pointer", color: T.textMed, fontSize: 14, textTransform: "uppercase", letterSpacing: 2,
        zIndex: 10
      }}>Close</button>

      <div style={{ position: "relative", zIndex: 10, fontSize: 18, color: T.textMuted, textTransform: "uppercase", letterSpacing: 4, marginBottom: 20, fontFamily: T.sans }}>
        Tap Practice
      </div>

      {/* BPM Controls */}
      <div onPointerDown={e => e.stopPropagation()} style={{
        display: "flex", gap: 10, marginBottom: 30, alignItems: "center",
        background: T.bgCard, padding: "8px 16px", borderRadius: 20, border: `1px solid ${T.border}`, zIndex: 10
      }}>
        <button onPointerDown={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: T.textMed, padding: "0 10px" }}>-</button>
        <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 80, textAlign: "center" }}>{metro.bpm} BPM</div>
        <button onPointerDown={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{ background: "transparent", border: "none", fontSize: 24, cursor: "pointer", color: T.textMed, padding: "0 10px" }}>+</button>
      </div>

      {/* Subdivision Controls */}
      <div onPointerDown={e => e.stopPropagation()} style={{ display: "flex", gap: 8, marginBottom: 40, zIndex: 10 }}>
        <button onPointerDown={() => setTapMultiplier(1)} style={{ padding: "8px 16px", borderRadius: 16, border: `1px solid ${tapMultiplier === 1 ? T.gold : T.border}`, background: tapMultiplier === 1 ? T.gold : "transparent", color: tapMultiplier === 1 ? "#fff" : T.textMed, fontSize: 12, cursor: "pointer", fontFamily: T.sans, fontWeight: 600 }}>On Beat</button>
        <button onPointerDown={() => setTapMultiplier(0.5)} style={{ padding: "8px 16px", borderRadius: 16, border: `1px solid ${tapMultiplier === 0.5 ? T.gold : T.border}`, background: tapMultiplier === 0.5 ? T.gold : "transparent", color: tapMultiplier === 0.5 ? "#fff" : T.textMed, fontSize: 12, cursor: "pointer", fontFamily: T.sans, fontWeight: 600 }}>1 per 2 Beats</button>
        <button onPointerDown={() => setTapMultiplier(2)} style={{ padding: "8px 16px", borderRadius: 16, border: `1px solid ${tapMultiplier === 2 ? T.gold : T.border}`, background: tapMultiplier === 2 ? T.gold : "transparent", color: tapMultiplier === 2 ? "#fff" : T.textMed, fontSize: 12, cursor: "pointer", fontFamily: T.sans, fontWeight: 600 }}>2 per Beat</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 60, pointerEvents: "none" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: T.textLight, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontFamily: T.sans }}>Target</div>
          <div style={{ fontSize: 64, fontFamily: T.serif, color: T.textMed }}>{expectedBpm}</div>
        </div>

        <div style={{ height: 80, width: 1, background: T.border }} />

        <div style={{ textAlign: "center", minWidth: 120 }}>
          <div style={{ fontSize: 14, color: T.textLight, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontFamily: T.sans }}>
            {isCountingIn ? "Listen..." : "Your Tap"}
          </div>
          <div style={{ fontSize: 80, fontFamily: T.serif, color: isCountingIn ? T.gold : currentBpm === "--" ? T.textMuted : (isClose ? T.success : T.coral) }}>
            {isCountingIn ? countDown : currentBpm}
          </div>
        </div>
      </div>

      <div style={{ height: 60, marginTop: 10, textAlign: "center", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {!isCountingIn && currentBpm !== "--" && (
          <>
            <div style={{ fontSize: 14, color: isClose ? T.success : T.coral, fontFamily: T.sans, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
              {isClose ? "Perfect!" : diff > 0 ? "Too Fast" : "Too Slow"}
            </div>
            {lastTapDiff !== null && (
              <div style={{ marginTop: 8, fontSize: 13, color: T.textMed, fontFamily: T.sans }}>
                Last tap: <span style={{ color: Math.abs(lastTapDiff) < 20 ? T.success : lastTapDiff < 0 ? T.coral : T.warm, fontWeight: 600 }}>
                  {lastTapDiff > 0 ? "+" : ""}{lastTapDiff}ms {lastTapDiff < 0 ? "(Rushing)" : lastTapDiff > 0 ? "(Dragging)" : "(Perfect)"}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: 50, fontSize: 16, color: T.textMuted, fontFamily: T.sans, background: T.bgSoft, padding: "16px 24px", borderRadius: T.radiusMd, border: `1px solid ${T.border}`, pointerEvents: "none" }}>
        Tap the <strong>Spacebar</strong> or tap anywhere to the beat.
      </div>
    </div>
  );
}

function TimerInner({ mins, theme: T }) {
  const timer = useTimer(mins);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <TimerRing pct={timer.pct} fmt={timer.fmt} size={160} textSize={36} />
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <button onClick={timer.toggle} style={{
          background: timer.on ? T.coral : T.gold, border: "none", color: "#fff",
          padding: "14px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
          fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase", width: 120, transition: "all 0.2s"
        }}>
          {timer.on ? "Pause" : "Start"}
        </button>
        <button onClick={timer.reset} style={{
          background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
          padding: "14px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: T.radius,
          fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase", width: 120, transition: "all 0.2s"
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}

function PracticeTimerTool({ theme: T }) {
  const [inputMins, setInputMins] = useState(5);
  const [activeMins, setActiveMins] = useState(5);
  const [key, setKey] = useState(0);

  return (
    <div style={{ padding: "10px 0", textAlign: "center" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>Set Duration (Min)</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 5, 10, 15, 20].map(m => (
            <button key={m} onClick={() => { setActiveMins(m); setInputMins(m); setKey(k => k + 1); }} style={{
              background: inputMins === m ? T.gold : "transparent",
              border: `1px solid ${inputMins === m ? T.gold : T.borderSoft}`,
              color: inputMins === m ? "#fff" : T.textMed,
              padding: "8px 16px", borderRadius: T.radius, cursor: "pointer",
              fontFamily: T.sans, fontWeight: 600, fontSize: 13, transition: "all 0.2s"
            }}>{m}</button>
          ))}
        </div>
      </div>
      <TimerInner key={key} mins={activeMins} theme={T} />
    </div>
  );
}

function ToolCard({ title, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radius,
      marginBottom: 12, overflow: "hidden", transition: "all 0.2s"
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "16px", cursor: "pointer"
      }}>
        <div style={{ fontSize: 24, flexShrink: 0, width: 32, textAlign: "center" }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{title}</div>
        </div>
        <div style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${T.borderSoft}`, paddingTop: 16 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function PastWeeksView({ completed }) {
  const [openWeek, setOpenWeek] = useState(null);
  const pastWeeks = WEEKLY_PLANS.slice(0, -1).reverse(); // newest-first, exclude current
  if (pastWeeks.length === 0) return null;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
          Past Weeks
        </div>
        <div style={{ fontSize: 13, color: T.textLight, fontFamily: T.sans, lineHeight: 1.6 }}>
          {pastWeeks.length} previous week{pastWeeks.length !== 1 ? "s" : ""}
        </div>
      </div>
      {pastWeeks.map((week) => {
        const isOpen = openWeek === week.id;
        const allExIds = week.days.flatMap(d => d.exercises.map(e => e.id));
        const doneCount = allExIds.filter(id => completed.has(id)).length;
        const weekDate = new Date(week.weekOf + "T00:00:00");
        const label = weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return (
          <div key={week.id} style={{
            background: T.bgCard, border: `1px solid ${T.border}`, marginBottom: 12, borderRadius: T.radius,
            overflow: "hidden"
          }}>
            <div onClick={() => setOpenWeek(isOpen ? null : week.id)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", cursor: "pointer"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: T.radiusMd, background: T.bgSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, flexShrink: 0
              }}>{label}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: T.textDark, fontFamily: T.serif }}>{week.focus}</div>
                <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 2 }}>
                  {doneCount}/{allExIds.length} completed
                  {week.carryForward.length > 0 && ` · ${week.carryForward.length} carried forward`}
                </div>
              </div>
              <div style={{ color: T.textMuted, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
              </div>
            </div>
            {isOpen && (
              <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${T.borderSoft}` }}>
                {week.teacherNotes && (
                  <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, padding: "12px 0", fontStyle: "italic" }}>
                    {week.teacherNotes}
                  </div>
                )}
                {week.days.map(day => (
                  <div key={day.num} style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
                      Day {day.num} — {day.name}
                    </div>
                    {day.exercises.map(ex => {
                      const done = completed.has(ex.id);
                      return (
                        <div key={ex.id} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "4px 0",
                          fontSize: 13, fontFamily: T.sans, color: done ? T.success : T.textLight,
                          textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1
                        }}>
                          <span style={{ fontSize: 10 }}>{done ? "✓" : "·"}</span>
                          <span>{ex.title}</span>
                          <span style={{ fontSize: 11, color: T.textMuted, marginLeft: "auto" }}>{ex.time}m</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LessonNotesView() {
  const [openLesson, setOpenLesson] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const dirColors = { improving: T.success, "needs-work": T.coral, new: T.plum };
  const typeColors = { rhythm: T.gold, guitar: T.warm, vocal: T.plum, listen: T.slate, song: T.coral };
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.warm, fontFamily: T.sans, marginBottom: 6 }}>
          From the Source
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Lessons</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          What Sarah taught, in her words
        </div>
      </div>
      {LESSON_POOL.map((lesson, li) => {
        const isOpen = openLesson === li;
        return (
          <div key={lesson.id} style={{
            background: T.bgCard, border: `1px solid ${T.border}`, marginBottom: 16, borderRadius: T.radius,
            overflow: "hidden", transition: "all 0.2s"
          }}>
            <div onClick={() => setOpenLesson(isOpen ? null : li)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", cursor: "pointer"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: T.radiusMd, background: T.warmSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: T.warm, fontFamily: T.sans, flexShrink: 0
              }}>{lesson.date.slice(5, 7)}/{lesson.date.slice(8, 10)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 18, color: T.textDark, fontFamily: T.serif, marginBottom: 2 }}>{lesson.title}</div>
                <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans }}>{lesson.duration}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                  {lesson.topics.map((t, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: "4px 10px", borderRadius: 12,
                      background: T.bgSoft, border: `1px solid ${T.border}`,
                      color: T.textLight, fontFamily: T.sans, fontWeight: 600, letterSpacing: 0.5
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
              </div>
            </div>
            {isOpen && (
              <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${T.borderSoft}` }}>
                {/* Summary */}
                <div style={{ fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7, padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                  {lesson.summary}
                </div>

                {/* Exercises */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: T.warm, fontFamily: T.sans, marginBottom: 10 }}>
                    Exercises ({lesson.exercises.length})
                  </div>
                  {lesson.exercises.map((ex, ei) => {
                    const exKey = `${li}-${ei}`;
                    const exOpen = openSection === exKey;
                    return (
                      <div key={ex.id} style={{ marginBottom: 12, border: `1px solid ${T.border}`, background: T.bgCard, borderRadius: T.radius, overflow: "hidden" }}>
                        <div onClick={() => setOpenSection(exOpen ? null : exKey)} style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", cursor: "pointer"
                        }}>
                          <span style={{
                            fontSize: 10, padding: "4px 8px", borderRadius: 6, fontFamily: T.sans, fontWeight: 700,
                            background: typeColors[ex.type] || T.textMuted, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5
                          }}>{ex.type}</span>
                          <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: T.textDark, fontFamily: T.serif }}>{ex.title}</span>
                          <span style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans }}>{ex.time} min</span>
                          <span style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: exOpen ? "rotate(180deg)" : "" }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                          </span>
                        </div>
                        {exOpen && (
                          <div style={{ padding: "0 14px 14px", fontSize: 13, fontFamily: T.sans, lineHeight: 1.6, color: T.textMed }}>
                            <div style={{ marginBottom: 8 }}>{ex.what}</div>
                            {ex.steps && ex.steps.map((s, si) => (
                              <div key={si} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                                <span style={{ color: T.warm, fontWeight: 600, flexShrink: 0 }}>{si + 1}.</span>
                                <div>
                                  <span>{s.text}</span>
                                  {s.why && <span style={{ color: T.textMuted, fontSize: 12, display: "block", marginTop: 2 }}>{s.why}</span>}
                                </div>
                              </div>
                            ))}
                            {ex.sarah && (
                              <div style={{
                                marginTop: 10, padding: "10px 14px", background: T.warmSoft, borderLeft: `3px solid ${T.warm}`,
                                fontStyle: "italic", color: T.goldDark, fontSize: 13
                              }}>
                                Sarah: "{ex.sarah}"
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Progress */}
                {lesson.progress && lesson.progress.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: T.warm, fontFamily: T.sans, marginBottom: 8 }}>
                      Progress Notes
                    </div>
                    {lesson.progress.map((p, pi) => (
                      <div key={pi} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "6px 0", fontSize: 13, fontFamily: T.sans }}>
                        <span style={{
                          fontSize: 9, padding: "2px 6px", borderRadius: 8, fontWeight: 600, flexShrink: 0, marginTop: 2,
                          background: dirColors[p.direction] || T.textMuted, color: "#fff", textTransform: "uppercase"
                        }}>{p.direction}</span>
                        <span style={{ color: T.textMed }}><strong style={{ color: T.textDark }}>{p.area}:</strong> {p.note}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sarah Quotes */}
                {lesson.sarahQuotes && lesson.sarahQuotes.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: T.warm, fontFamily: T.sans, marginBottom: 8 }}>
                      Sarah Quotes
                    </div>
                    {lesson.sarahQuotes.map((sq, qi) => (
                      <div key={qi} style={{
                        padding: "10px 14px", marginBottom: 8, background: T.warmSoft,
                        borderLeft: `3px solid ${T.warm}`, fontFamily: T.sans
                      }}>
                        <div style={{ fontStyle: "italic", fontSize: 13, color: T.goldDark, lineHeight: 1.6 }}>"{sq.quote}"</div>
                        <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>{sq.context}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ARCHIVE BRANCH ─────────────────────────────────────────────────
function ArchiveBranch({ type, exercises, completed, onComplete, metro, onOpenTapMatch }) {
  const [open, setOpen] = useState(false);
  const t = TYPE[type] || TYPE.rhythm;

  return (
    <div style={{ marginBottom: 16 }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: T.bgCard, border: `1px solid ${T.border}`, borderLeft: `3px solid ${t.color}`,
        padding: "14px 18px", cursor: "pointer", transition: "all 0.2s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 24, width: 32, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>{React.createElement(t.icon, { size: 22 })}</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: T.textDark, fontFamily: T.serif, marginBottom: 2 }}>{t.label}</div>
            <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 1 }}>{exercises.length} exercise{exercises.length !== 1 ? "s" : ""} from lessons</div>
          </div>
        </div>
        <div style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 6 }}>
          {exercises.map(ex => (
            <div key={ex.id}>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans, padding: "6px 4px 2px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {ex._lessonDate} · {ex._lessonTitle}
              </div>
              <ExerciseCard ex={ex} completed={completed.has(ex.id)} onComplete={onComplete} metro={metro} dayColor={t.color} onOpenTapMatch={onOpenTapMatch} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── KEYBOARD CURRICULUM ────────────────────────────────────────────

const LEVEL_COLORS = ["#5b7fa5", "#d97d54", "#7f9e88", "#9e829c", "#72a8a8", "#d68383", "#d4a373"];

function LevelView({ level, completed, onComplete, metro, onOpenTapMatch, levelColor, onStartFlow }) {
  const c = levelColor || LEVEL_COLORS[(level.num - 1) % LEVEL_COLORS.length];
  const total = level.exercises.length;
  const done = level.exercises.filter(e => completed.has(e.id)).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: c, fontFamily: T.sans, marginBottom: 4 }}>Phase {level.num}</div>
          <div style={{ fontSize: 28, fontWeight: 400, color: T.textDark, fontFamily: T.serif }}>{level.name}</div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{level.focus} · {level.duration}</div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: T.serif, color: pct === 100 ? T.success : T.textDark }}>{pct}%</div>
      </div>

      {level.setup && (
        <div style={{
          background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "12px 16px", marginBottom: 16, fontSize: 13, color: T.textLight, fontFamily: T.sans,
          borderLeft: `1px solid ${T.gold}`
        }}>
          <span style={{ fontWeight: 700, color: T.textMed }}>Before you start: </span>{level.setup}
        </div>
      )}

      <div style={{ height: 3, background: T.border, borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : T.gold, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      {level.exercises.map(ex => (
        <ExerciseCard key={ex.id} ex={ex} metro={metro}
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} levelExercises={level.exercises} />
      ))}
    </div>
  );
}

function GuitarStudyView({ completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem("guitar-study-level");
      if (saved) {
        const found = GUITAR_STUDY.find(l => l.level === parseInt(saved));
        if (found) return found;
      }
    } catch { }
    return GUITAR_STUDY[0];
  });

  const [unlocked, setUnlocked] = useState(() => {
    try {
      const saved = localStorage.getItem("guitar-study-unlocked");
      return saved ? new Set(JSON.parse(saved)) : new Set(GUITAR_STUDY.map(l => l.level));
    } catch { return new Set(GUITAR_STUDY.map(l => l.level)); }
  });

  useEffect(() => {
    setUnlocked(prev => {
      const next = new Set(prev);
      let changed = false;
      for (let i = 0; i < GUITAR_STUDY.length - 1; i++) {
        const level = GUITAR_STUDY[i];
        const allDone = level.exercises.every(e => completed.has(e.id));
        if (allDone && !next.has(GUITAR_STUDY[i + 1].level)) {
          next.add(GUITAR_STUDY[i + 1].level);
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem("guitar-study-unlocked", JSON.stringify([...next]));
      }
      return changed ? next : prev;
    });
  }, [completed]);

  useEffect(() => {
    localStorage.setItem("guitar-study-level", String(selectedLevel.level));
  }, [selectedLevel]);

  const totalEx = GUITAR_STUDY.reduce((a, l) => a + l.exercises.length, 0);
  const totalDone = GUITAR_STUDY.reduce((a, l) => a + l.exercises.filter(e => completed.has(e.id)).length, 0);
  const overallPct = Math.round((totalDone / totalEx) * 100);

  const levelDone = selectedLevel.exercises.filter(e => completed.has(e.id)).length;
  const levelTotal = selectedLevel.exercises.length;
  const levelPct = Math.round((levelDone / levelTotal) * 100);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.slate, fontFamily: T.sans, marginBottom: 6 }}>
          Genre-Driven Curriculum
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Guitar Study</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Psych-Surf · Reggae · Desert Blues · {totalDone}/{totalEx} exercises
        </div>
        <div style={{ width: "100%", maxWidth: 320, margin: "16px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? T.success : T.slate, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: overallPct === 100 ? T.success : T.slate, minWidth: 36 }}>{overallPct}%</div>
        </div>
      </div>

      {/* Level pills — horizontal scroll */}
      <div className="hide-scrollbar sticky-pill-bar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
        background: T.bg + "e6", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
        msOverflowStyle: "none", scrollbarWidth: "none",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {GUITAR_STUDY.map(level => {
          const done = level.exercises.filter(e => completed.has(e.id)).length;
          const total = level.exercises.length;
          const pct = Math.round((done / total) * 100);
          const active = selectedLevel.level === level.level;
          const isUnlocked = unlocked.has(level.level);
          return (
            <button key={level.level} onClick={() => isUnlocked && setSelectedLevel(level)} style={{
              flex: "0 0 auto", scrollSnapAlign: "start",
              background: isUnlocked ? (active ? T.slate : T.bgCard) : "transparent",
              border: `1px solid ${isUnlocked && active ? T.slate : T.border}`,
              borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
              cursor: isUnlocked ? "pointer" : "default", textAlign: "center", transition: "all 0.2s",
              opacity: isUnlocked ? 1 : 0.4,
              boxShadow: active ? `0 4px 10px ${T.slate}40` : "none"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : T.slate, fontFamily: T.sans }}>
                LVL {level.level}
              </div>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                {isUnlocked ? level.title : "🔒"}
              </div>
              {isUnlocked && pct > 0 && (
                <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : T.slate), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                  {pct === 100 ? "done" : `${done}/${total}`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Level header + progress + exercises */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.slate, fontFamily: T.sans, marginBottom: 4 }}>Level {selectedLevel.level}</div>
            <div style={{ fontSize: 28, fontWeight: 400, color: T.textDark, fontFamily: T.serif }}>{selectedLevel.title}</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, fontFamily: T.serif, color: levelPct === 100 ? T.success : T.textDark }}>{levelPct}%</div>
        </div>

        <div style={{ height: 3, background: T.border, borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${levelPct}%`, background: levelPct === 100 ? T.success : T.slate, borderRadius: 2, transition: "width 0.5s" }} />
        </div>

        {/* Level description */}
        <div style={{
          background: T.slateSoft, border: `1px solid ${T.slate}20`, borderRadius: T.radiusMd,
          padding: "16px 20px", marginTop: 12, marginBottom: 16
        }}>
          <div style={{ fontSize: 15, fontWeight: 400, fontFamily: T.serif, color: T.textDark, marginBottom: 6 }}>
            {selectedLevel.subtitle}
          </div>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, marginBottom: 8 }}>
            {selectedLevel.description}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
              <span style={{ fontWeight: 700, color: T.slate, textTransform: "uppercase", letterSpacing: 1 }}>Artists: </span>{selectedLevel.artists}
            </div>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
              <span style={{ fontWeight: 700, color: T.slate, textTransform: "uppercase", letterSpacing: 1 }}>Unlocks: </span>{selectedLevel.unlocks}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(selectedLevel.exercises, T.slate)} accentColor={T.slate} />
        </div>
        <ReviewCheckIn review={selectedLevel.review} accentColor={T.slate} />
        {selectedLevel.exercises.map(ex => (
          <ExerciseCard key={ex.id} ex={ex} metro={metro}
            completed={completed.has(ex.id)} onComplete={onComplete} dayColor={T.slate} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} levelExercises={selectedLevel.exercises} />
        ))}
      </div>
    </div>
  );
}

function SingerSongwriterView({ completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem("songwriter-level");
      if (saved) {
        const found = SINGER_SONGWRITER_LEVELS.find(l => l.level === parseInt(saved));
        if (found) return found;
      }
    } catch { }
    return SINGER_SONGWRITER_LEVELS[0];
  });

  const unlocked = new Set(SINGER_SONGWRITER_LEVELS.map(l => l.level));

  useEffect(() => {
    localStorage.setItem("songwriter-level", String(selectedLevel.level));
  }, [selectedLevel]);

  const totalEx = SINGER_SONGWRITER_LEVELS.reduce((a, l) => a + l.exercises.length, 0);
  const totalDone = SINGER_SONGWRITER_LEVELS.reduce((a, l) => a + l.exercises.filter(e => completed.has(e.id)).length, 0);
  const overallPct = Math.round((totalDone / totalEx) * 100);

  const levelDone = selectedLevel.exercises.filter(e => completed.has(e.id)).length;
  const levelTotal = selectedLevel.exercises.length;
  const levelPct = Math.round((levelDone / levelTotal) * 100);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.coral, fontFamily: T.sans, marginBottom: 6 }}>
          Voice + Guitar Integration
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Singer-Songwriter</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Psych-Surf · Reggae · Desert Blues · {totalDone}/{totalEx} exercises
        </div>
        <div style={{ width: "100%", maxWidth: 320, margin: "16px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? T.success : T.coral, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: overallPct === 100 ? T.success : T.coral, minWidth: 36 }}>{overallPct}%</div>
        </div>
      </div>

      {/* Level pills — horizontal scroll */}
      <div className="hide-scrollbar sticky-pill-bar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
        background: T.bg + "e6", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
        msOverflowStyle: "none", scrollbarWidth: "none",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {SINGER_SONGWRITER_LEVELS.map(level => {
          const done = level.exercises.filter(e => completed.has(e.id)).length;
          const total = level.exercises.length;
          const pct = Math.round((done / total) * 100);
          const active = selectedLevel.level === level.level;
          const isUnlocked = unlocked.has(level.level);
          return (
            <button key={level.level} onClick={() => isUnlocked && setSelectedLevel(level)} style={{
              flex: "0 0 auto", scrollSnapAlign: "start",
              background: isUnlocked ? (active ? T.coral : T.bgCard) : "transparent",
              border: `1px solid ${isUnlocked && active ? T.coral : T.border}`,
              borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
              cursor: isUnlocked ? "pointer" : "default", textAlign: "center", transition: "all 0.2s",
              opacity: isUnlocked ? 1 : 0.4,
              boxShadow: active ? `0 4px 10px ${T.coral}40` : "none"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : T.coral, fontFamily: T.sans }}>
                LVL {level.level}
              </div>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                {isUnlocked ? level.title : "🔒"}
              </div>
              {isUnlocked && pct > 0 && (
                <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : T.coral), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                  {pct === 100 ? "done" : `${done}/${total}`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Level header + progress + exercises */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.coral, fontFamily: T.sans, marginBottom: 4 }}>Level {selectedLevel.level}</div>
            <div style={{ fontSize: 28, fontWeight: 400, color: T.textDark, fontFamily: T.serif }}>{selectedLevel.title}</div>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, fontFamily: T.serif, color: levelPct === 100 ? T.success : T.textDark }}>{levelPct}%</div>
        </div>

        <div style={{ height: 3, background: T.border, borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${levelPct}%`, background: levelPct === 100 ? T.success : T.coral, borderRadius: 2, transition: "width 0.5s" }} />
        </div>

        {/* Level description */}
        <div style={{
          background: `${T.coral}10`, border: `1px solid ${T.coral}20`, borderRadius: T.radiusMd,
          padding: "16px 20px", marginTop: 12, marginBottom: 16
        }}>
          <div style={{ fontSize: 15, fontWeight: 400, fontFamily: T.serif, color: T.textDark, marginBottom: 6 }}>
            {selectedLevel.subtitle}
          </div>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, marginBottom: 8 }}>
            {selectedLevel.description}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
              <span style={{ fontWeight: 700, color: T.coral, textTransform: "uppercase", letterSpacing: 1 }}>Artists: </span>{selectedLevel.artists}
            </div>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
              <span style={{ fontWeight: 700, color: T.coral, textTransform: "uppercase", letterSpacing: 1 }}>Unlocks: </span>{selectedLevel.unlocks}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(selectedLevel.exercises, T.coral)} accentColor={T.coral} />
        </div>
        <ReviewCheckIn review={selectedLevel.review} accentColor={T.coral} />
        {selectedLevel.exercises.map(ex => (
          <ExerciseCard key={ex.id} ex={ex} metro={metro}
            completed={completed.has(ex.id)} onComplete={onComplete} dayColor={T.coral} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} levelExercises={selectedLevel.exercises} />
        ))}
      </div>
    </div>
  );
}

function KeysView({ completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem("keys-current-level");
      if (saved) {
        const found = KEYBOARD_LEVELS.find(l => l.num === parseInt(saved));
        if (found) return found;
      }
    } catch { }
    return KEYBOARD_LEVELS[0];
  });

  // All levels unlocked — browse freely, work at your own pace
  const unlocked = new Set(KEYBOARD_LEVELS.map(l => l.num));

  useEffect(() => {
    localStorage.setItem("keys-current-level", String(selectedLevel.num));
  }, [selectedLevel]);

  const totalEx = KEYBOARD_LEVELS.reduce((a, l) => a + l.exercises.length, 0);
  const totalDone = KEYBOARD_LEVELS.reduce((a, l) => a + l.exercises.filter(e => completed.has(e.id)).length, 0);
  const overallPct = Math.round((totalDone / totalEx) * 100);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#5b7fa5", fontFamily: T.sans, marginBottom: 6 }}>
          Keyboard Curriculum
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Keys</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Psych-Surf-Reggae · Organ as texture · {totalDone}/{totalEx} exercises
        </div>
        <div style={{ width: "100%", maxWidth: 320, margin: "16px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? T.success : T.gold, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: overallPct === 100 ? T.success : T.gold, minWidth: 36 }}>{overallPct}%</div>
        </div>
      </div>

      {/* Level pills — horizontal scroll */}
      <div className="hide-scrollbar sticky-pill-bar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
        background: T.bg + "e6", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
        msOverflowStyle: "none", scrollbarWidth: "none",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {KEYBOARD_LEVELS.map((level, idx) => {
          const c = LEVEL_COLORS[idx % LEVEL_COLORS.length];
          const done = level.exercises.filter(e => completed.has(e.id)).length;
          const total = level.exercises.length;
          const pct = Math.round((done / total) * 100);
          const active = selectedLevel.num === level.num;
          const isUnlocked = unlocked.has(level.num);
          return (
            <button key={level.num} onClick={() => isUnlocked && setSelectedLevel(level)} style={{
              flex: "0 0 auto", scrollSnapAlign: "start",
              background: isUnlocked ? (active ? c : T.bgCard) : "transparent",
              border: `1px solid ${isUnlocked && active ? c : T.border}`,
              borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
              cursor: isUnlocked ? "pointer" : "default", textAlign: "center", transition: "all 0.2s",
              opacity: isUnlocked ? 1 : 0.4,
              boxShadow: active ? `0 4px 10px ${c}40` : "none"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : c, fontFamily: T.sans }}>
                LVL {level.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                {isUnlocked ? level.name : "🔒"}
              </div>
              {isUnlocked && pct > 0 && (
                <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : c), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                  {pct === 100 ? "done" : `${done}/${total}`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected level exercises */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(selectedLevel.exercises, "#5b7fa5")} accentColor="#5b7fa5" />
        </div>
        <LevelView level={selectedLevel} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} />
      </div>

      {/* Band-ready milestone */}
      {selectedLevel.num <= 3 && (
        <div style={{
          marginTop: 24, padding: "16px", background: T.bgSoft, border: `1px solid ${T.border}`,
          borderRadius: T.radiusMd, textAlign: "center"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 4 }}>
            Milestone
          </div>
          <div style={{ fontSize: 14, color: T.textMed, fontFamily: T.sans }}>
            After Phase 3, you can play with the band on basic reggae parts.
          </div>
        </div>
      )}
    </div>
  );
}

const LOOPER_COLORS = ["#3d8b6e", "#2e7d5e", "#d97d54", "#5b7fa5", "#7f9e88", "#9e829c", "#72a8a8", "#d68383", "#d4a373", "#6b8e9f"];

function LooperView({ completed, onComplete, metro, onOpenTapMatch, onStartFlow }) {
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem("looper-current-level");
      if (saved) {
        const found = LOOPER_LEVELS.find(l => l.num === parseInt(saved));
        if (found) return found;
      }
    } catch { }
    return LOOPER_LEVELS[0];
  });

  // All levels unlocked — browse freely, work at your own pace
  const unlocked = new Set(LOOPER_LEVELS.map(l => l.num));

  useEffect(() => {
    localStorage.setItem("looper-current-level", String(selectedLevel.num));
  }, [selectedLevel]);

  const totalEx = LOOPER_LEVELS.reduce((a, l) => a + l.exercises.length, 0);
  const totalDone = LOOPER_LEVELS.reduce((a, l) => a + l.exercises.filter(e => completed.has(e.id)).length, 0);
  const overallPct = Math.round((totalDone / totalEx) * 100);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#3d8b6e", fontFamily: T.sans, marginBottom: 6 }}>
          RC-505mkII Curriculum
        </div>
        <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Looper</div>
        <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Live Looping · Solo Performance · Psych-Surf-Reggae · {totalDone}/{totalEx} exercises
        </div>
        <div style={{ width: "100%", maxWidth: 320, margin: "16px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: overallPct === 100 ? T.success : T.gold, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: overallPct === 100 ? T.success : T.gold, minWidth: 36 }}>{overallPct}%</div>
        </div>
      </div>

      {/* Level pills */}
      <div className="hide-scrollbar sticky-pill-bar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
        background: T.bg + "e6", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
        msOverflowStyle: "none", scrollbarWidth: "none",
        borderBottom: `1px solid ${T.border}`,
      }}>
        {LOOPER_LEVELS.map((level, idx) => {
          const c = LOOPER_COLORS[idx % LOOPER_COLORS.length];
          const done = level.exercises.filter(e => completed.has(e.id)).length;
          const total = level.exercises.length;
          const pct = Math.round((done / total) * 100);
          const active = selectedLevel.num === level.num;
          const isUnlocked = unlocked.has(level.num);
          return (
            <button key={level.num} onClick={() => isUnlocked && setSelectedLevel(level)} style={{
              flex: "0 0 auto", scrollSnapAlign: "start",
              background: isUnlocked ? (active ? c : T.bgCard) : "transparent",
              border: `1px solid ${isUnlocked && active ? c : T.border}`,
              borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
              cursor: isUnlocked ? "pointer" : "default", textAlign: "center", transition: "all 0.2s",
              opacity: isUnlocked ? 1 : 0.4,
              boxShadow: active ? `0 4px 10px ${c}40` : "none"
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : c, fontFamily: T.sans }}>
                LVL {level.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                {isUnlocked ? level.name : "🔒"}
              </div>
              {isUnlocked && pct > 0 && (
                <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : c), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                  {pct === 100 ? "done" : `${done}/${total}`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected level exercises */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(selectedLevel.exercises, "#3d8b6e")} accentColor="#3d8b6e" />
        </div>
        <LevelView level={selectedLevel} levelColor={LOOPER_COLORS[(selectedLevel.num - 1) % LOOPER_COLORS.length]} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} onStartFlow={onStartFlow} />
      </div>

      {/* Settings quick reference */}
      {selectedLevel.num <= 2 && (
        <div style={{
          marginTop: 24, padding: "16px", background: T.bgSoft, border: `1px solid ${T.border}`,
          borderRadius: T.radiusMd, textAlign: "center"
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 4 }}>
            Quick Reference
          </div>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, textAlign: "left", lineHeight: 1.8 }}>
            Quantize: MEASURE · Loop Sync: ON · Rhythm Guide: 80 BPM · Input peak at -6dB · Master output: 70-80%
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingMetronome({ metro, setTab, isDark, theme: T }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startBpm, setStartBpm] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [taps, setTaps] = useState([]);
  const [tapPulse, setTapPulse] = useState(false);

  // Close when tapping outside the expanded sheet
  useEffect(() => {
    if (!isExpanded) return;
    const handleGlobalClick = (e) => {
      // If clicking outside the metronome container, close it
      if (!e.target.closest(".floating-metronome")) {
        setIsExpanded(false);
      }
    };
    // slight delay to prevent the opening click from instantly closing it
    setTimeout(() => window.addEventListener("click", handleGlobalClick), 50);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isExpanded]);

  const handlePointerDown = (e) => {
    if (isExpanded) return; // Don't drag while expanded
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setStartY(e.clientY);
    setStartBpm(metro.bpm);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const diffY = startY - e.clientY;
    const newBpm = Math.max(40, Math.min(280, startBpm + Math.floor(diffY)));
    if (newBpm !== metro.bpm) {
      metro.changeBpm(newBpm);
    }
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // If it was just a tap (no significant vertical movement), act as Tap Tempo
    if (Math.abs(e.clientY - startY) < 5 && !isExpanded) {
      setTapPulse(true);
      setTimeout(() => setTapPulse(false), 150);
      
      const now = Date.now();
      setTaps(prev => {
        const recent = prev.filter(t => now - t < 3000);
        const newTaps = [...recent, now];
        if (newTaps.length > 1) {
          let durs = [];
          for (let i = 1; i < newTaps.length; i++) durs.push(newTaps[i] - newTaps[i - 1]);
          const avg = durs.reduce((a, b) => a + b, 0) / durs.length;
          const bpm = Math.round(60000 / avg);
          if (bpm >= 40 && bpm <= 280) metro.changeBpm(bpm);
        }
        return newTaps;
      });
    }
  };

  // Removed trackProgress to simplify UI as requested
  
  return (
    <div className={`floating-metronome ${isDark ? "floating-metronome-dark" : ""}`}
      style={{
        flexDirection: "column", 
        alignItems: "stretch",
        padding: isExpanded ? "16px" : "8px 16px",
        height: "auto", /* Allow content to dictate height */
        maxHeight: "80vh", /* Still prevent overflow off-screen */
        borderTop: isExpanded ? `1px solid ${T.gold}` : "",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}>
      
      {/* Top Bar (Always visible) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
          {/* Play/Stop Button */}
          <button onClick={(e) => { e.stopPropagation(); metro.playing ? metro.stop() : metro.start(); }} style={{
            background: metro.playing ? T.gold : "transparent",
            border: `1.5px solid ${T.gold}`, color: metro.playing ? "#fff" : T.gold,
            width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, transition: "all 0.2s"
          }}>
            {metro.playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />}
          </button>

          {/* Integrated Visualizer & Editor */}
          <div style={{ display: "flex", alignItems: "center", padding: "8px 0" }}>
            <CompactBeatEditor metro={metro} theme={T} />
          </div>

          <div style={{ flex: 1 }} /> {/* Blank space in the middle to push controls left and arrow right */}

          <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} style={{
            background: "none", border: "none", color: isExpanded ? T.gold : T.textMed, padding: "8px",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
             transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
             transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
        
        <div 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ 
            display: "flex", alignItems: "center", gap: 8, cursor: isExpanded ? "default" : "ns-resize", touchAction: "none",
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", 
            padding: "6px 14px", borderRadius: 24, border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
            transition: "all 0.15s",
            transform: tapPulse ? "scale(0.95)" : "scale(1)",
            boxShadow: tapPulse ? `0 0 12px ${T.gold}40` : "none",
            opacity: isExpanded ? 0.3 : 1, // Dim while expanded to indicate it's not the primary interaction
            pointerEvents: isExpanded ? "none" : "auto", flexShrink: 0
          }}
          title={isExpanded ? "" : "Tap for tap tempo, drag up/down to change"}
        >
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: T.sans, color: T.gold, minWidth: 32, textAlign: "right", userSelect: "none" }}>
            {metro.bpm}
          </div>
          <div style={{ fontSize: 10, color: T.textMed, fontWeight: 600, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, userSelect: "none" }}>
            BPM
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, opacity: 0.4, marginLeft: 2 }}>
            <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: `4px solid ${T.textDark}` }}></div>
            <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: `4px solid ${T.textDark}` }}></div>
          </div>
        </div>
      </div>
      
      {/* Expanded Sheet Content */}
      <div className="hide-scrollbar" style={{ 
        marginTop: isExpanded ? 16 : 0, 
        opacity: isExpanded ? 1 : 0, 
        flex: isExpanded ? 1 : "none", // Grow to fill container
        overflowY: "auto", // Allow inner scrolling
        transition: "opacity 0.3s 0.1s" 
      }}>
        {isExpanded && (
           <CompactMetronomeControls metro={metro} theme={T} />
        )}
      </div>
    </div>
  );
}

function BottomNav({ tab, setTab, isDark, theme: T }) {
  return (
    <div className={`bottom-nav mobile-only ${isDark ? "bottom-nav-dark" : ""}`}>
      <button className={`nav-item ${tab === "practice" ? "active" : ""}`} onClick={() => setTab("practice")}>
        <Music size={20} />
        <span className="nav-label">Practice</span>
      </button>

      <button className={`nav-item ${tab === "skills" ? "active" : ""}`} onClick={() => setTab("skills")}>
        <Sparkles size={20} />
        <span className="nav-label">Skills</span>
      </button>

      <button className={`nav-item ${tab === "tools" ? "active" : ""}`} onClick={() => setTab("tools")}>
        <Wrench size={20} />
        <span className="nav-label">Tools</span>
      </button>

      <button className={`nav-item ${tab === "charts" ? "active" : ""}`} onClick={() => setTab("charts")}>
        <Guitar size={20} />
        <span className="nav-label">Charts</span>
      </button>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    // Start on light mode typically, unless dark mode was explicitly saved
    const dark = saved === "dark";
    applyTheme(dark);
    return dark;
  });

  const toggleTheme = () => {
    const next = !isDark;
    applyTheme(next);
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // One-time migration for Voice Explores level insertion (Level 3)
  // Shifts ss-3+ exercise IDs and songwriter-level by +1
  if (!localStorage.getItem("ss-level-migration-v1")) {
    try {
      const savedLevel = localStorage.getItem("songwriter-level");
      if (savedLevel && parseInt(savedLevel) >= 3) {
        localStorage.setItem("songwriter-level", String(parseInt(savedLevel) + 1));
      }
      const savedCompleted = localStorage.getItem("practice-completed");
      if (savedCompleted) {
        const ids = JSON.parse(savedCompleted);
        const migrated = ids.map(id => {
          const match = id.match(/^ss-(\d+)-(.+)$/);
          if (match && parseInt(match[1]) >= 3) {
            return `ss-${parseInt(match[1]) + 1}-${match[2]}`;
          }
          return id;
        });
        localStorage.setItem("practice-completed", JSON.stringify(migrated));
      }
    } catch { /* ignore migration errors */ }
    localStorage.setItem("ss-level-migration-v1", "done");
  }

  // V2 migration: Voice Combines (Level 4) + Voice Flows (Level 5) insertion
  // Shifts ss-4+ exercise IDs and songwriter-level >=4 by +2
  if (!localStorage.getItem("ss-level-migration-v2")) {
    try {
      const savedLevel = localStorage.getItem("songwriter-level");
      if (savedLevel && parseInt(savedLevel) >= 4) {
        localStorage.setItem("songwriter-level", String(parseInt(savedLevel) + 2));
      }
      const savedCompleted = localStorage.getItem("practice-completed");
      if (savedCompleted) {
        const ids = JSON.parse(savedCompleted);
        const migrated = ids.map(id => {
          const match = id.match(/^ss-(\d+)-(.+)$/);
          if (match && parseInt(match[1]) >= 4) {
            return `ss-${parseInt(match[1]) + 2}-${match[2]}`;
          }
          return id;
        });
        localStorage.setItem("practice-completed", JSON.stringify(migrated));
      }
    } catch { /* ignore migration errors */ }
    localStorage.setItem("ss-level-migration-v2", "done");
  }

  // Weekly plan ID migration: d1e1 → w0317-d1e1 (prevents cross-week collisions)
  if (!localStorage.getItem("weekly-id-migration-v1")) {
    try {
      const savedCompleted = localStorage.getItem("practice-completed");
      if (savedCompleted) {
        const ids = JSON.parse(savedCompleted);
        const migrated = ids.map(id => /^d\d+e\d+$/.test(id) ? `w0317-${id}` : id);
        localStorage.setItem("practice-completed", JSON.stringify(migrated));
      }
    } catch { /* ignore migration errors */ }
    localStorage.setItem("weekly-id-migration-v1", "done");
  }

  // Migration: Guitar curriculum v2 — wipe guitar progress for 14-level rework
  if (!localStorage.getItem("guitar-v2-migrated")) {
    const saved = localStorage.getItem("practice-completed");
    if (saved) {
      try {
        const completed = new Set(JSON.parse(saved));
        const filtered = [...completed].filter(id => !id.startsWith("gs-"));
        localStorage.setItem("practice-completed", JSON.stringify(filtered));
      } catch {
        // Corrupted data — clear guitar progress to prevent stale gs- IDs persisting
        localStorage.removeItem("practice-completed");
      }
    }
    localStorage.removeItem("guitar-study-level");
    localStorage.setItem("guitar-v2-migrated", "true");
  }

  const [tab, setTab] = useState("practice");
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem("practice-completed");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });
  useEffect(() => {
    localStorage.setItem("practice-completed", JSON.stringify([...completed]));
  }, [completed]);
  const [tapMatchBpm, setTapMatchBpm] = useState(null);
  const [flowActive, setFlowActive] = useState(false);
  const [flowExercises, setFlowExercises] = useState([]);
  const [flowAccentColor, setFlowAccentColor] = useState(null);
  const metro = useMetronome();

  const [flowStartIndex, setFlowStartIndex] = useState(0);
  const startFlow = useCallback((exercises, accentColor, startIndex = 0) => {
    setFlowExercises(exercises);
    setFlowAccentColor(accentColor || T.gold);
    setFlowStartIndex(startIndex);
    setFlowActive(true);
  }, []);

  const exitFlow = useCallback(() => {
    setFlowActive(false);
    setFlowExercises([]);
  }, []);

  const toggleComplete = (id) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);

        // Play a nice completion chord!
        try {
          if (Tone.context.state !== "running") Tone.context.resume();
          const synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 1 }
          }).toDestination();
          synth.volume.value = -12;
          const now = Tone.now();
          synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "8n", now);
          setTimeout(() => synth.dispose(), 2000);
        } catch (e) {
          console.error("Audio play failed", e);
        }

        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.65 },
          colors: [T.gold, T.goldMed, T.goldSoft, '#ffffff'],
          disableForReducedMotion: true,
          gravity: 0.4,
          scalar: 1.1,
          ticks: 300,
          startVelocity: 35
        });
      }
      return next;
    });
  };

  const totalEx = DAYS.reduce((a, d) => a + d.exercises.length, 0);
  const totalDone = DAYS.reduce((a, d) => a + d.exercises.filter(e => completed.has(e.id)).length, 0);
  const weekPct = Math.round((totalDone / totalEx) * 100);

  const tabs = [
    { id: "practice", label: "Practice" },
    { id: "skills", label: "Skills" },
    { id: "tools", label: "Tools" },
    { id: "charts", label: "Charts" }
  ];

  const [skillTab, setSkillTab] = useState(() => {
    try {
      const saved = localStorage.getItem("skill-tab");
      if (saved && ["voice", "guitar", "keys", "looper", "songwriter"].includes(saved)) return saved;
    } catch { }
    return "voice";
  });
  useEffect(() => { localStorage.setItem("skill-tab", skillTab); }, [skillTab]);

  const skillTabs = [
    { id: "voice", label: "Voice", color: "#9e829c" },
    { id: "guitar", label: "Guitar", color: "#6b8e9f" },
    { id: "songwriter", label: "Singer-Songwriter", color: "#d68383" },
    { id: "keys", label: "Keys", color: "#5b7fa5" },
    { id: "looper", label: "Looper", color: "#3d8b6e" }
  ];

  // Charts tab state
  const [activeChart, setActiveChart] = useState(null);

  // URL hash chart loading
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#chart=")) {
      try {
        const data = hash.slice(7);
        const binary = atob(data);
        const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
        const json = new TextDecoder().decode(bytes);
        const chart = JSON.parse(json);
        if (chart && chart.measures) {
          setActiveChart(chart);
          setTab("charts");
          // Save locally
          const all = JSON.parse(localStorage.getItem("strumCharts") || "{}");
          all[chart.id] = chart;
          localStorage.setItem("strumCharts", JSON.stringify(all));
        }
      } catch { }
      // Clean hash
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Flow Mode overlay — renders above everything
  if (flowActive && flowExercises.length > 0) {
    return (
      <div style={{ background: T.bg, minHeight: "100vh", color: T.textDark, fontFamily: T.sans }}>
        <FlowMode
          exercises={flowExercises}
          completed={completed}
          onComplete={toggleComplete}
          metro={metro}
          onExit={exitFlow}
          accentColor={flowAccentColor}
          startIndex={flowStartIndex}
          onOpenTapMatch={setTapMatchBpm}
        />
        <FloatingMetronome metro={metro} setTab={() => {}} isDark={isDark} theme={T} />
        {tapMatchBpm && (
          <TapMatchModal targetBpm={tapMatchBpm} onClose={() => setTapMatchBpm(null)} metro={metro} />
        )}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.textDark, fontFamily: T.sans }}>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
          100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
        }
        .exercise-card {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .exercise-card:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: ${T.md} !important;
          border-color: ${isDark ? "#444" : "#ddd"} !important;
        }
        .interactive-btn {
          transition: all 0.2s ease;
        }
        .interactive-btn:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }
        .interactive-btn:active {
          transform: scale(0.98);
        }
      `}</style>
      {/* Header */}
      {tab !== "skills" && (
        <div style={{ background: T.bgCard, borderBottom: `1px solid ${T.border}`, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ padding: "48px 24px 32px", width: "100%", maxWidth: 640, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src="/icon-jungle.png" alt="Jungle Tools Logo" style={{
                  height: 36, width: 36, objectFit: "cover",
                  borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  mixBlendMode: isDark ? "normal" : "multiply"
                }} />
                <div style={{ fontSize: 9, fontWeight: 900, color: T.gold, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: T.sans }}>Jungle Tools</div>
              </div>
              <button className="interactive-btn" onClick={toggleTheme} style={{
                background: isDark ? T.bgSoft : T.goldSoft, border: `1px solid ${isDark ? T.border : T.gold}15`,
                color: isDark ? T.gold : T.goldDark, padding: "8px", borderRadius: T.radiusMd,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: isDark ? "none" : `0 2px 8px ${T.gold}20`
              }}>
                {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
              </button>
            </div>
            <div style={{ fontSize: 44, fontWeight: 400, fontFamily: T.serif, color: T.textDark, lineHeight: 1.1, marginBottom: 12 }}>Practice Plan</div>
            <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 800, opacity: 0.8, display: "flex", alignItems: "center", gap: 8 }}>
              Lesson 3/2 <span style={{ opacity: 0.3 }}>|</span> Tenor <span style={{ opacity: 0.3 }}>|</span> Break ≈ A3
            </div>
          </div>
        </div>
      )}

      {/* Tab bar (Desktop Only) */}
      <div className="hide-scrollbar desktop-only" style={{
        background: isDark ? "rgba(44, 40, 37, 0.55)" : "rgba(253, 251, 249, 0.65)",
        backdropFilter: "blur(24px) saturate(140%)", WebkitBackdropFilter: "blur(24px) saturate(140%)",
        borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, display: "flex",
        justifyContent: "center", boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 8px 32px rgba(44,40,37,0.04)",
        overflowX: "auto", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none"
      }}>
        <div style={{ display: "flex", gap: 32, padding: "0 20px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); }} style={{
              padding: "16px 0", background: "none", border: "none",
              borderBottom: `2px solid ${tab === t.id ? T.gold : "transparent"}`,
              color: tab === t.id ? T.gold : T.textMuted,
              fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: T.serif, letterSpacing: 0.5,
              transition: "color 0.2s", flexShrink: 0, whiteSpace: "nowrap"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: tab === "charts" ? 900 : 560, margin: "0 auto", padding: `${tab === "practice" ? 0 : 20}px 16px 90px` }}>
        {/* PRACTICE TAB — Week plan + Lessons archive + Lesson notes */}
        {tab === "practice" && (
          <div>
            {/* Day pill tabs — horizontal scroll */}
            <div className="hide-scrollbar sticky-pill-bar" style={{
              display: "flex", gap: 0, overflowX: "auto", padding: "16px 0 0",
              background: isDark ? "rgba(28, 25, 23, 0.45)" : "rgba(251, 248, 244, 0.55)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory",
              msOverflowStyle: "none", scrollbarWidth: "none",
              borderBottom: `1px solid ${T.border}`,
            }}>
              {DAYS.map((day, idx) => {
                const c = DAY_COLORS[idx % DAY_COLORS.length];
                const done = day.exercises.filter(e => completed.has(e.id)).length;
                const total = day.exercises.length;
                const pct = Math.round((done / total) * 100);
                const active = selectedDay.num === day.num;
                return (
                  <button key={day.num} onClick={() => setSelectedDay(day)} style={{
                    flex: "0 0 auto", scrollSnapAlign: "start",
                    background: active ? c : T.bgCard,
                    border: `1px solid ${active ? c : T.border}`,
                    borderRadius: 24, padding: "8px 20px", margin: "4px 8px 12px 0px",
                    cursor: "pointer", textAlign: "center", transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    opacity: active ? 1 : 0.8,
                    boxShadow: active ? `0 8px 16px ${c}40, 0 2px 4px ${c}20` : "none",
                    transform: active ? "translateY(-1px) scale(1.02)" : "scale(1)"
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: active ? "#fff" : c, fontFamily: T.sans }}>
                      DAY {day.num}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : T.textDark, fontFamily: T.serif, marginTop: 2, whiteSpace: "nowrap" }}>
                      {day.name}
                    </div>
                    {pct > 0 && (
                      <div style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : (pct === 100 ? T.success : c), fontFamily: T.sans, fontWeight: 600, marginTop: 2 }}>
                        {pct === 100 ? "done" : `${done}/${total}`}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected day exercises */}
            <div style={{ marginTop: 28 }}>
              <DayView day={selectedDay} completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            </div>

            {/* Past Weeks — history of completed weekly plans */}
            {WEEKLY_PLANS.length > 1 && (
              <div style={{ marginTop: 40, borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
                <PastWeeksView completed={completed} />
              </div>
            )}

            {/* Archive — exercises from LESSON_POOL by skill branch */}
            <div style={{ marginTop: 40, borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
                  Exercise Archive
                </div>
                <div style={{ fontSize: 13, color: T.textLight, fontFamily: T.sans, lineHeight: 1.6 }}>
                  All exercises from {LESSON_POOL.length} lesson{LESSON_POOL.length !== 1 ? "s" : ""}
                </div>
              </div>
              {(() => {
                // Group all LESSON_POOL exercises by type
                const branches = {};
                const activePlanIds = new Set(DAYS.flatMap(d => d.exercises.map(e => e.id)));
                LESSON_POOL.forEach(lesson => {
                  lesson.exercises.forEach(ex => {
                    const branch = ex.type || "other";
                    if (!branches[branch]) branches[branch] = [];
                    branches[branch].push({ ...ex, _lessonTitle: lesson.title, _lessonDate: lesson.date, _inPlan: activePlanIds.has(ex.id) });
                  });
                });
                const branchOrder = ["rhythm", "guitar", "vocal", "listen", "song", "record", "play"];
                const sortedBranches = Object.entries(branches).sort(([a], [b]) => {
                  const ai = branchOrder.indexOf(a), bi = branchOrder.indexOf(b);
                  return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
                });
                return sortedBranches.map(([type, exercises]) => (
                  <ArchiveBranch key={type} type={type} exercises={exercises} completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
                ));
              })()}
            </div>

            {/* Lesson Notes */}
            <div style={{ marginTop: 40, borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
              <LessonNotesView />
            </div>
          </div>
        )}

        {/* SKILLS TAB — Voice / Guitar / Keys / Looper with sub-tabs */}
        {tab === "skills" && (
          <div>
            {/* Skill sub-tabs */}
            <div style={{
              display: "flex", justifyContent: "center", gap: 0,
              marginBottom: 24, borderBottom: `1px solid ${T.border}`,
            }}>
              {skillTabs.map(st => (
                <button key={st.id} onClick={() => setSkillTab(st.id)} style={{
                  padding: "12px 20px", background: "none", border: "none",
                  borderBottom: `2px solid ${skillTab === st.id ? st.color : "transparent"}`,
                  color: skillTab === st.id ? st.color : T.textMuted,
                  fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: T.serif, letterSpacing: 0.5,
                  transition: "color 0.2s", flexShrink: 0, whiteSpace: "nowrap"
                }}>{st.label}</button>
              ))}
            </div>

            {skillTab === "voice" && (
              <VoiceView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            )}

            {skillTab === "guitar" && (
              <GuitarStudyView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            )}

            {skillTab === "keys" && (
              <KeysView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            )}

            {skillTab === "looper" && (
              <LooperView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            )}

            {skillTab === "songwriter" && (
              <SingerSongwriterView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} onStartFlow={startFlow} />
            )}

          </div>
        )}

        {/* TOOLS TAB — Metronome + all tools combined */}
        {tab === "tools" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 8 }}>
                Jungle Mode
              </div>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Tools</div>
            </div>

            <ToolCard icon="⏱️" title="Practice Timer" defaultOpen={true}>
              <PracticeTimerTool theme={T} />
            </ToolCard>

            <ToolCard icon="🎛️" title="Metronome" defaultOpen={true}>
              <MetronomePanel metro={metro} onOpenTapMatch={setTapMatchBpm} />
            </ToolCard>

            <ToolCard icon="🌫️" title="Drone Generator" defaultOpen={false}>
              <DroneGenerator theme={T} />
            </ToolCard>

            <ToolCard icon="📚" title="Quick Reference" defaultOpen={false}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans }}>
                  Quick Reference
                </div>
                <button onClick={() => setTapMatchBpm(metro.bpm)} style={{
                  background: "transparent", border: "none", color: T.gold, fontSize: 11, fontWeight: 600, cursor: "pointer",
                  fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, padding: 0
                }}>
                  Tap Minigame
                </button>
              </div>
              {[
                { bpm: "78", use: "16th note subdivision (Drill #3)" },
                { bpm: "120", use: "Surf Rock — fingerpick + count + ooh climbing" },
                { bpm: "122", use: "Lyric placement + Sol Del Sur tap-along" },
                { bpm: "165", use: "Island strum (Surf Rock Drum)" },
                { bpm: "200-244", use: "Main metronome work (Drills #1 & #2)" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{ color: T.gold, fontWeight: 700, fontFamily: T.sans }}>{r.bpm}</span>
                  <span style={{ color: T.textLight, fontFamily: T.sans }}>{r.use}</span>
                </div>
              ))}
            </ToolCard>

            <ToolCard icon="🖇️" title="Backing Track Links" defaultOpen={false}>
              {[
                { label: "Surf Rock 120 BPM", url: "youtube.com/watch?v=AEf8LF4Xu18" },
                { label: "Groove Beat 90 BPM", url: "youtube.com/watch?v=n0nEhFAiorg" },
                { label: "Reggae One Drop 85 BPM", url: "youtube.com/watch?v=1aGp-CnwebE" },
                { label: "Dub Reggae 85 BPM", url: "youtube.com/watch?v=vmH-xBYBQIg" },
                { label: "Desert Blues 75 BPM", url: "youtube.com/watch?v=Yfyymjm24Ro" },
                { label: "Khruangbin Style 80 BPM", url: "youtube.com/watch?v=JlMy52s7qrI" },
                { label: "Cinematic Western 80 BPM", url: "youtube.com/watch?v=EKPjIt9GzX0" },
                { label: "Psych Rock 120 BPM", url: "youtube.com/watch?v=eqI_3Mw8go4" },
                { label: "Deep Soul Groove 80 BPM", url: "youtube.com/watch?v=55MTcCE6ZIk" },
                { label: "Soul Funk Groove 90 BPM", url: "youtube.com/watch?v=HhPq1J93uMI" },
                { label: "Surf Rock 165 BPM", url: "youtube.com/watch?v=gBNY43Xlp1Y" },
                { label: "Groove Beat 80 BPM", url: "youtube.com/watch?v=0vgOdlxSTW0" },
              ].map((l, i, arr) => (
                <div key={i} style={{ padding: "8px 0", fontSize: 13, borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ color: T.gold, fontFamily: T.sans, fontWeight: 600 }}>{l.label}</span>
                  <span style={{ color: T.textMuted, marginLeft: 10, fontSize: 11, fontFamily: T.sans }}>{l.url}</span>
                </div>
              ))}
            </ToolCard>

            <ToolCard icon="✅" title="Jungle Flight Check" defaultOpen={true}>
              <FlightCheck theme={T} />
            </ToolCard>

            <ToolCard icon="✋" title="Tap Practice Minigame">
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <p style={{ fontSize: 14, color: T.textMed, marginBottom: 20 }}>
                  Practice tapping steadily at any BPM. Helps internalize the groove.
                </p>
                <button onClick={() => setTapMatchBpm(metro.bpm)} style={{
                  background: T.gold, color: "#fff", border: "none", padding: "12px 24px",
                  borderRadius: T.radius, cursor: "pointer", fontFamily: T.sans, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: 1
                }}>
                  Launch Game
                </button>
              </div>
            </ToolCard>

            <ToolCard icon="🎤" title="Live Pitch Detector">
              <LivePitchDetector theme={T} />
            </ToolCard>

            <ToolCard icon="🎵" title="Pitch Pipe">
              <PitchPipe theme={T} />
            </ToolCard>

            <ToolCard icon="🎙️" title="Quick Recorder">
              <AudioRecorder theme={T} />
            </ToolCard>

            <ToolCard icon="📻" title="Backing Tracks">
              <AudioPlayer theme={T} />
            </ToolCard>

            <ToolCard icon="🎸" title="Tabs & Lyrics">
              <OfflineTabs theme={T} />
            </ToolCard>

          </div>
        )}

        {/* CHARTS TAB */}
        {tab === "charts" && (
          activeChart ? (
            <StrumChartBuilder
              theme={T}
              metro={metro}
              initialChart={activeChart}
              onBack={() => setActiveChart(null)}
            />
          ) : (
            <div>
              {/* Page header */}
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 8 }}>
                  Chart Builder
                </div>
                <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Charts</div>
              </div>

              <ChartListView
                theme={T}
                onSelect={(ch) => setActiveChart(ch)}
                onNew={() => setActiveChart(makeTemplateChart())}
              />
            </div>
          )
        )}
      </div>

      {/* Floating metronome */}
      {metro.playing && tab !== "tools" && !tapMatchBpm && (
        <FloatingMetronome metro={metro} setTab={setTab} isDark={isDark} theme={T} />
      )}

      {/* Tap Tempo Modal */}
      {tapMatchBpm && (
        <TapMatchModal targetBpm={tapMatchBpm} onClose={() => setTapMatchBpm(null)} metro={metro} />
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav tab={tab} setTab={setTab} isDark={isDark} theme={T} />

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
