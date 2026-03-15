import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import confetti from "canvas-confetti";
import { MiniAudioPlayer, AudioPlayer, FlightCheck, OfflineTabs, AudioRecorder, PitchPipe, LivePitchDetector, FretboardDiagram, VolumeMeter, DroneGenerator, TAB_CONTENT, InlineKeyboard, RhythmCellCards, PhraseFormGuide } from './JungleTools.jsx';
import { DAYS, KEYBOARD_LEVELS, LOOPER_LEVELS, LESSON_POOL, ALL_NOTES, getPitchRange } from './data/appData.js';
import { VOCAL_LEVELS } from './data/vocalLevels/index.js';
import { GUITAR_STUDY } from './data/guitarStudy/index.js';
import { SINGER_SONGWRITER_LEVELS } from './data/singerSongwriter/index.js';

// ─── AUDIO CONTEXT CONFIG ──
// Set latencyHint on the existing context for smoother audio on mobile.
// Don't create a new context — that breaks user-gesture AudioContext activation.
try { Tone.getContext().lookAhead = 0.5; } catch { }

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
  rhythm: { label: "Rhythm", color: "#d97d54", icon: "𝅘𝅥" },
  guitar: { label: "Guitar", color: "#6b8e9f", icon: "♪" },
  vocal: { label: "Voice", color: "#9e829c", icon: "♫" },
  listen: { label: "Listen", color: "#7f9e88", icon: "♩" },
  song: { label: "Song", color: "#d68383", icon: "𝄞" },
  record: { label: "Record", color: "#d4a373", icon: "●" },
  play: { label: "Free", color: "#72a8a8", icon: "✦" },
  keys: { label: "Keys", color: "#5b7fa5", icon: "🎹" },
  looper: { label: "Looper", color: "#3d8b6e", icon: "⟳" },
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
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    loopRef.current?.stop(); loopRef.current?.dispose();
    Tone.Transport.stop(); Tone.Transport.position = 0;
    setPlaying(false);
    window.dispatchEvent(new CustomEvent('metroBeatAudio', { detail: { beat: 0 } }));
    window.dispatchEvent(new CustomEvent('metroBeat', { detail: { beat: 0 } }));
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

function TypeBadge({ type }) {
  const t = TYPE[type] || TYPE.rhythm;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase",
      color: t.color, fontFamily: T.sans, padding: "4px 12px",
      background: "transparent", borderRadius: T.radius, border: `1px solid ${t.color}40`
    }}>{t.icon} {t.label}</div>
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
      borderLeft: `1px solid ${T.gold}`,
      padding: "12px 20px", margin: "16px 0",
      background: T.bgSoft
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1.5, marginBottom: 4, fontFamily: T.sans }}>
        SARAH'S NOTE
      </div>
      <div style={{ fontSize: 13, color: T.goldDark, fontFamily: T.sans, lineHeight: 1.6, fontStyle: "italic" }}>
        "{text}"
      </div>
    </div>
  );
}

function DetailSection({ label, color, children }) {
  if (!children) return null;
  return (
    <div style={{
      background: color + "08", border: `1px solid ${color}18`,
      borderRadius: T.radius, padding: "14px 16px", marginBottom: 12,
      borderLeft: `2px solid ${color}`
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.5, marginBottom: 6, fontFamily: T.sans, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: T.textDark, fontFamily: T.sans, lineHeight: 1.6 }}>
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
      {/* Timer ring — prominent */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
        padding: "14px 20px", background: T.bgSoft, borderRadius: T.radiusMd,
        border: `1px solid ${timerDone ? T.gold + "60" : T.border}`,
        boxShadow: timerDone ? `0 0 20px ${T.gold}20` : "none",
        transition: "all 0.5s"
      }}>
        <TimerRing pct={timer.pct} fmt={timer.fmt} size={56} textSize={13} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, fontFamily: T.sans, color: T.textDark }}>
            {ex.time || 5} min
          </div>
          <div style={{ fontSize: 11, color: timerDone ? T.gold : T.textMuted, fontFamily: T.sans, fontWeight: timerDone ? 600 : 400 }}>
            {timerDone ? "Time's up — move on when ready" : "Suggested duration"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={timer.toggle} className="interactive-btn" style={{
            background: timer.on ? T.coral : (accentColor || T.gold), border: "none", color: "#fff",
            padding: "8px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
            fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase",
            WebkitTapHighlightColor: "transparent"
          }}>{timer.on ? "Pause" : "Start"}</button>
          <button onClick={timer.reset} className="interactive-btn" style={{
            background: "transparent", border: `1px solid ${T.border}`, color: T.textLight,
            padding: "8px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
            fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase",
            WebkitTapHighlightColor: "transparent"
          }}>Reset</button>
        </div>
      </div>

      {/* What — always visible */}
      <div style={{
        fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7,
        marginBottom: 16, padding: "12px 16px", background: T.bgSoft, borderRadius: T.radius,
        borderLeft: `1px solid ${accentColor || T.gold}`
      }}>{ex.what}</div>

      {/* Setup */}
      {ex.setup && (
        <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 14, display: "flex", gap: 6, alignItems: "flex-start" }}>
          <span style={{ color: accentColor || T.gold, fontWeight: 700, fontSize: 11 }}>SETUP:</span> {ex.setup}
        </div>
      )}

      {/* Reference Pitches */}
      <PitchRibbon pitches={ex.referencePitches} playNote={playNote} />

      {/* ── TOOL DOCK ── */}
      {/* Audio Tracks */}
      {tracks.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {tracks.map((t, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, letterSpacing: 1.5, marginBottom: 8, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
              <MiniAudioPlayer theme={T} src={t.src} playbackRate={trackRates[i] || 1} />
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {[0.75, 1, 1.25].map(rate => (
                  <button key={rate} onClick={() => setTrackRates(r => ({ ...r, [i]: rate }))} style={{
                    background: (trackRates[i] || 1) === rate ? (accentColor || T.gold) : "transparent",
                    color: (trackRates[i] || 1) === rate ? "#fff" : T.textMed,
                    border: `1px solid ${(trackRates[i] || 1) === rate ? (accentColor || T.gold) : T.borderSoft}`,
                    padding: "3px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer",
                    borderRadius: T.radius, fontFamily: T.sans, transition: "all 0.2s"
                  }}>{rate === 1 ? "1x" : `${rate}x`}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Metronome */}
      {ex.metronome && (
        <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", background: T.bgSoft, padding: "10px 16px", borderRadius: T.radiusMd, border: `1px solid ${T.border}`, flexWrap: "wrap" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>-</button>
            <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 40, textAlign: "center" }}>{metro.bpm}</div>
            <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>+</button>
            <button onClick={() => metro.changeBpm(ex.metronome)} style={{ marginLeft: 6, fontSize: 10, background: T.goldSoft, border: "none", padding: "4px 8px", borderRadius: T.radius, color: T.goldDark, cursor: "pointer", fontWeight: 600, textTransform: "uppercase" }}>Target: {ex.metronome}</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => metro.playing ? metro.stop() : metro.start()} style={{
              background: metro.playing ? T.coral : (accentColor || T.gold), border: "none", color: "#fff",
              padding: "8px 16px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
              fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
            }}>{metro.playing ? "Stop" : "Start"}</button>
            <button onClick={() => onOpenTapMatch && onOpenTapMatch(ex.metronome)} style={{
              background: "transparent", border: `1px solid ${T.slate}40`, color: T.slate, padding: "8px 12px", borderRadius: T.radius,
              fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
            }}>Tap</button>
            {ex.speedLadder && (
              <button onClick={() => {
                if (!metro.speedBuilder) {
                  metro.changeBpm(ex.speedLadder.start);
                  metro.setSpeedIncrement(ex.speedLadder.increment);
                  metro.setSpeedBars(ex.speedLadder.bars);
                  metro.setSpeedCeiling(ex.speedLadder.end);
                }
                metro.setSpeedBuilder(!metro.speedBuilder);
              }} style={{
                background: metro.speedBuilder ? (accentColor || T.gold) : "transparent",
                border: `1px solid ${metro.speedBuilder ? (accentColor || T.gold) : T.borderSoft}`,
                color: metro.speedBuilder ? "#fff" : T.textMed,
                padding: "8px 10px", borderRadius: T.radius,
                fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
              }} title={`${ex.speedLadder.start}→${ex.speedLadder.end} BPM, +${ex.speedLadder.increment} every ${ex.speedLadder.bars} bars`}>
                Speed +
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pitch detector */}
      {ex.referencePitches && ex.referencePitches.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} pitchContour={!!ex.pitchContour} />
        </div>
      )}

      {/* Drone */}
      {ex.drone && (
        <div style={{ marginBottom: 16 }}>
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
        <div style={{ marginBottom: 16 }}>
          <AudioRecorder theme={T} inline={true} />
        </div>
      )}

      {/* Fretboard */}
      {ex.fretboard && (
        <FretboardDiagram theme={T} scale={ex.fretboard.scale} position={ex.fretboard.position} highlight={ex.fretboard.highlight || []} />
      )}

      {/* Piano Keys — shows exercise pianoKeys or drone active chord */}
      {ex.pianoKeys ? (
        <PianoKeysDiagram notes={droneActiveNotes.notes.length > 0 ? normalizeDroneNotes(droneActiveNotes.notes, ex.pianoKeys.range) : ex.pianoKeys.notes} label={droneActiveNotes.notes.length > 0 ? droneActiveNotes.label : ex.pianoKeys.label} range={ex.pianoKeys.range} />
      ) : droneActiveNotes.notes.length > 0 ? (
        <PianoKeysDiagram notes={normalizeDroneNotes(droneActiveNotes.notes, ["C3", "C5"])} label={droneActiveNotes.label} range={["C3", "C5"]} />
      ) : null}

      {/* Volume Meter */}
      {ex.volumeMeter && (
        <VolumeMeter theme={T} inline={true} volumeContour={!!ex.volumeContour} />
      )}

      {/* Rhythm Cells */}
      {ex.rhythmCells && (
        <RhythmCellCards theme={T} cells={ex.rhythmCells} bpm={ex.metronome || 80} />
      )}

      {/* Phrase Form */}
      {ex.phraseForm && (
        <PhraseFormGuide theme={T} form={ex.phraseForm} />
      )}

      {/* Tabs */}
      {ex.tabs && TAB_CONTENT[ex.tabs] && (
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setShowTabs(!showTabs)} style={{
            background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
            padding: "8px 14px", borderRadius: T.radius, cursor: "pointer", fontWeight: 600,
            fontFamily: T.sans, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
            width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span>Tabs & Lyrics</span>
            <span style={{ transition: "transform 0.2s", transform: showTabs ? "rotate(180deg)" : "" }}>&#9660;</span>
          </button>
          {showTabs && (
            <pre style={{
              background: T.bgSoft, padding: 16, border: `1px solid ${T.border}`, borderTop: "none",
              borderRadius: `0 0 ${T.radiusMd} ${T.radiusMd}`, overflowX: "auto",
              fontFamily: "monospace", fontSize: 12, color: T.textDark, lineHeight: 1.5, marginTop: 0, whiteSpace: "pre-wrap"
            }}>{TAB_CONTENT[ex.tabs].trim()}</pre>
          )}
        </div>
      )}

      {/* ── STEPS ── */}
      <FlowStepView steps={ex.steps} accentColor={accentColor} />

      {/* Feel / Wrong — always expanded */}
      {(ex.feel || ex.wrong) && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            color: T.textLight, fontSize: 11,
            fontFamily: T.sans, padding: "0 0 8px 0",
            display: "flex", alignItems: "center", gap: 6, fontWeight: 700,
            letterSpacing: 1.5, textTransform: "uppercase"
          }}>
            Feel & Pitfalls
          </div>
          
          <div style={{ marginTop: 4, animation: "fade-in-up 0.2s ease-out" }}>
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
          fontSize: 12, color: accentColor || T.gold, fontFamily: T.sans, fontWeight: 600,
          padding: "8px 0", borderTop: `1px solid ${T.border}`, marginTop: 8
        }}>
          Level up: {ex.levelUp}
        </div>
      )}

      {/* Complete button */}
      <button onClick={() => onComplete(ex.id)} className="interactive-btn" style={{
        marginTop: 16, width: "100%",
        background: isComplete ? "transparent" : (accentColor || T.gold),
        border: isComplete ? `1px solid ${T.border}` : "none",
        color: isComplete ? T.textLight : "#fff",
        padding: "14px", fontSize: 12, fontWeight: 600,
        cursor: "pointer", fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
        borderRadius: T.radius, WebkitTapHighlightColor: "transparent"
      }}>
        {isComplete ? "Mark Incomplete" : "Complete Exercise"}
      </button>
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

function FlowMode({ exercises, completed, onComplete, metro, onExit, accentColor, onOpenTapMatch }) {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      el.closest("button, input, select, [role='slider'], svg")) {
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
  return (
    <button onClick={onClick} className="interactive-btn" style={{
      background: "transparent",
      border: `1px solid ${accentColor || T.gold}`,
      color: accentColor || T.gold,
      padding: "8px 18px", borderRadius: T.radius, cursor: "pointer",
      fontSize: 11, fontWeight: 700, fontFamily: T.sans, letterSpacing: 2, textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s"
    }}>
      <span style={{ fontSize: 14 }}>&#9654;</span> Flow
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

  return (
    <div className={`exercise-card exercise-card-${ex.id}`} style={{
      background: completed ? T.successSoft : T.bgCard,
      border: `1px solid ${completed ? T.success + "40" : T.border}`,
      borderLeft: `1px solid ${completed ? T.success : dayColor || T.gold}`,
      marginBottom: 12, overflow: "hidden", borderRadius: T.radius
    }}>
      <div onClick={handleToggle} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "16px", cursor: "pointer"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 54 }}>
          <TypeBadge type={ex.type} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 18, color: T.textDark, fontFamily: T.serif, marginBottom: 4 }}>{ex.title}</div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 1, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8 }}>
            {ex.time} min
            <span onClick={e => { e.stopPropagation(); setShowTimer(t => !t); }} style={{ cursor: "pointer", fontSize: 14, opacity: showTimer ? 1 : 0.5, transition: "opacity 0.2s" }} title="Toggle timer">&#9201;</span>
            {timer.on && !open && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.gold, animation: "pulse-ring 2s infinite", display: "inline-block" }} />}
          </div>
        </div>
        <div style={{ color: T.textMuted, display: "flex", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
        </div>
      </div>

      {open && (
        <div style={{ padding: "0 18px 18px" }}>
          {/* Flow button */}
          {onStartFlow && (
            <button onClick={() => onStartFlow(levelExercises || [ex], dayColor)} className="interactive-btn" style={{
              background: "transparent", border: `1px solid ${dayColor || T.gold}`,
              color: dayColor || T.gold, padding: "6px 14px", borderRadius: T.radius,
              cursor: "pointer", fontSize: 10, fontWeight: 700, fontFamily: T.sans,
              letterSpacing: 2, textTransform: "uppercase", display: "inline-flex",
              alignItems: "center", gap: 6, marginBottom: 12,
              WebkitTapHighlightColor: "transparent"
            }}>
              <span style={{ fontSize: 12 }}>&#9654;</span> Flow
            </button>
          )}

          {/* Reference Pitches */}
          <PitchRibbon pitches={ex.referencePitches} playNote={playNote} />

          {/* What & Why */}
          <div style={{
            fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7,
            marginBottom: 14, padding: "12px 16px", background: T.bgSoft, borderRadius: T.radius,
            borderLeft: `1px solid ${T.gold}`
          }}>{ex.what}</div>

          {/* Setup */}
          {ex.setup && (
            <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 12, display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ color: T.gold, fontWeight: 700, fontSize: 11 }}>SETUP:</span> {ex.setup}
            </div>
          )}

          {/* Timer */}
          {showTimer && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: "10px 16px", background: T.bgSoft, borderRadius: T.radiusMd, border: `1px solid ${T.border}` }}>
              <TimerRing pct={timer.pct} fmt={timer.fmt} size={42} />
              <div style={{ flex: 1, fontFamily: T.sans, fontSize: 14, color: T.textDark, fontWeight: 600 }}>{timer.fmt}</div>
              <button onClick={timer.toggle} style={{
                background: timer.on ? T.coral : T.gold, border: "none", color: "#fff",
                padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
                fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
              }}>{timer.on ? "Pause" : "Start"}</button>
              <button onClick={timer.reset} style={{
                background: "transparent", border: `1px solid ${T.border}`, color: T.textLight,
                padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
                fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
              }}>Reset</button>
            </div>
          )}

          {/* Audio Tracks */}
          {tracks.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              {tracks.map((t, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, letterSpacing: 1.5, marginBottom: 8, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
                  <MiniAudioPlayer theme={T} src={t.src} playbackRate={trackRates[i] || 1} />
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    {[0.75, 1, 1.25].map(rate => (
                      <button key={rate} onClick={() => {
                        setTrackRates(r => ({ ...r, [i]: rate }));
                      }} style={{
                        background: (trackRates[i] || 1) === rate ? T.gold : "transparent",
                        color: (trackRates[i] || 1) === rate ? "#fff" : T.textMed,
                        border: `1px solid ${(trackRates[i] || 1) === rate ? T.gold : T.borderSoft}`,
                        padding: "3px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer",
                        borderRadius: T.radius, fontFamily: T.sans, transition: "all 0.2s"
                      }}>{rate === 1 ? "1x" : `${rate}x`}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Metronome controls */}
          {ex.metronome && (
            <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", background: T.bgSoft, padding: "10px 16px", borderRadius: T.radiusMd, border: `1px solid ${T.border}`, flexWrap: "wrap" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>-</button>
                <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 40, textAlign: "center" }}>{metro.bpm}</div>
                <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 1))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>+</button>
                <button onClick={() => metro.changeBpm(ex.metronome)} style={{ marginLeft: 6, fontSize: 10, background: T.goldSoft, border: "none", padding: "4px 8px", borderRadius: T.radius, color: T.goldDark, cursor: "pointer", fontWeight: 600, textTransform: "uppercase" }}>Target: {ex.metronome}</button>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => metro.playing ? metro.stop() : metro.start()} style={{
                  background: metro.playing ? T.coral : T.gold, border: "none", color: "#fff",
                  padding: "8px 16px", fontSize: 11, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
                  fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
                }}>
                  {metro.playing ? "Stop" : "Start"}
                </button>

                <button onClick={() => onOpenTapMatch && onOpenTapMatch(ex.metronome)} style={{
                  background: "transparent", border: `1px solid ${T.slate}40`, color: T.slate, padding: "8px 12px", borderRadius: T.radius,
                  fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
                }}>✋ Tap</button>

                {ex.speedLadder && (
                  <button onClick={() => {
                    if (!metro.speedBuilder) {
                      metro.changeBpm(ex.speedLadder.start);
                      metro.setSpeedIncrement(ex.speedLadder.increment);
                      metro.setSpeedBars(ex.speedLadder.bars);
                      metro.setSpeedCeiling(ex.speedLadder.end);
                    }
                    metro.setSpeedBuilder(!metro.speedBuilder);
                  }} style={{
                    background: metro.speedBuilder ? T.gold : "transparent",
                    border: `1px solid ${metro.speedBuilder ? T.gold : T.borderSoft}`,
                    color: metro.speedBuilder ? "#fff" : T.textMed,
                    padding: "8px 10px", borderRadius: T.radius,
                    fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
                  }} title={`${ex.speedLadder.start}→${ex.speedLadder.end} BPM, +${ex.speedLadder.increment} every ${ex.speedLadder.bars} bars`}>
                    Speed + {metro.speedBuilder && metro.speedCeiling > 0 ? `↩${metro.speedCeiling}` : ""}
                  </button>
                )}
              </div>
              {ex.speedLadder && metro.speedBuilder && (
                <div style={{ width: "100%", marginTop: 8, padding: "10px 14px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 120 }}>
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
                    <div style={{ flex: 1, minWidth: 120 }}>
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
                    <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
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
          )}

          {/* Pitch detector for metronome exercises — rendered outside the button row */}
          {ex.metronome && ex.referencePitches && ex.referencePitches.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} pitchContour={!!ex.pitchContour} />
            </div>
          )}

          {!ex.metronome && !ex.pitchContour && ex.referencePitches && ex.referencePitches.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} />
            </div>
          )}

          {/* Inline Drone Generator */}
          {ex.drone && (
            <div style={{ marginBottom: 16 }}>
              <DroneGenerator
                theme={T}
                inline={true}
                onActiveNotesChange={setDroneActiveNotes}
                {...(typeof ex.drone === 'object' ? {
                  defaultRoot: ex.drone.root,
                  defaultOctave: ex.drone.octave,
                  defaultTexture: ex.drone.texture,
                  defaultMode: ex.drone.mode,
                  defaultPreset: ex.drone.preset,
                  defaultProgression: ex.drone.progression,
                  defaultBpm: ex.drone.bpm,
                  defaultStepDuration: ex.drone.stepDuration,
                } : {})}
              />
            </div>
          )}

          {/* Inline Recorder */}
          {ex.recorder && (
            <div style={{ marginBottom: 16 }}>
              <AudioRecorder theme={T} inline={true} />
            </div>
          )}

          {/* Fretboard Diagram */}
          {ex.fretboard && (
            <FretboardDiagram
              theme={T}
              scale={ex.fretboard.scale}
              position={ex.fretboard.position}
              highlight={ex.fretboard.highlight || []}
            />
          )}

          {/* Piano Keys Diagram — shows exercise pianoKeys or drone active chord */}
          {ex.pianoKeys ? (
            <PianoKeysDiagram
              notes={droneActiveNotes.notes.length > 0 ? normalizeDroneNotes(droneActiveNotes.notes, ex.pianoKeys.range) : ex.pianoKeys.notes}
              label={droneActiveNotes.notes.length > 0 ? droneActiveNotes.label : ex.pianoKeys.label}
              range={ex.pianoKeys.range}
            />
          ) : droneActiveNotes.notes.length > 0 ? (
            <PianoKeysDiagram
              notes={normalizeDroneNotes(droneActiveNotes.notes, ["C3", "C5"])}
              label={droneActiveNotes.label}
              range={["C3", "C5"]}
            />
          ) : null}

          {/* Volume Meter / Volume Contour */}
          {ex.volumeMeter && (
            <VolumeMeter theme={T} inline={true} volumeContour={!!ex.volumeContour} />
          )}

          {/* Rhythm Cells */}
          {ex.rhythmCells && (
            <RhythmCellCards theme={T} cells={ex.rhythmCells} bpm={ex.metronome || 80} />
          )}

          {/* Phrase Form Guide */}
          {ex.phraseForm && (
            <PhraseFormGuide theme={T} form={ex.phraseForm} />
          )}

          {/* Pitch Contour (enhanced LivePitchDetector) */}
          {!ex.metronome && ex.pitchContour && ex.referencePitches && ex.referencePitches.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} pitchContour={true} />
            </div>
          )}

          {/* Inline Tabs/Lyrics */}
          {ex.tabs && TAB_CONTENT[ex.tabs] && (
            <div style={{ marginBottom: 16 }}>
              <button onClick={() => setShowTabs(!showTabs)} style={{
                background: "transparent", border: `1px solid ${T.border}`, color: T.textMed,
                padding: "8px 14px", borderRadius: T.radius, cursor: "pointer", fontWeight: 600,
                fontFamily: T.sans, fontSize: 11, letterSpacing: 1, textTransform: "uppercase",
                width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span>{ex.tabs === "soldelsur" ? "Sol Del Sur — Tabs & Lyrics" : "I Like The Way You Walk — Lyrics"}</span>
                <span style={{ transition: "transform 0.2s", transform: showTabs ? "rotate(180deg)" : "" }}>▾</span>
              </button>
              {showTabs && (
                <pre style={{
                  background: T.bgSoft, padding: 16, border: `1px solid ${T.border}`, borderTop: "none",
                  borderRadius: `0 0 ${T.radiusMd} ${T.radiusMd}`, overflowX: "auto",
                  fontFamily: "monospace", fontSize: 12, color: T.textDark, lineHeight: 1.5, marginTop: 0,
                  whiteSpace: "pre-wrap"
                }}>
                  {TAB_CONTENT[ex.tabs].trim()}
                </pre>
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
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: c, fontFamily: T.sans, marginBottom: 4 }}>Day {day.num}</div>
          <div style={{ fontSize: 28, fontWeight: 400, color: T.textDark, fontFamily: T.serif }}>{day.name}</div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{day.focus} · {day.duration}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <StartFlowButton onClick={() => onStartFlow(day.exercises, c)} accentColor={c} />
          <div style={{ fontSize: 32, fontWeight: 700, fontFamily: T.serif, color: pct === 100 ? T.success : T.textDark }}>{pct}%</div>
        </div>
      </div>

      {/* Setup */}
      {day.setup && (
        <div style={{
          background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: "12px 16px", marginBottom: 16, fontSize: 13, color: T.textLight, fontFamily: T.sans,
          borderLeft: `1px solid ${T.gold}`
        }}>
          <span style={{ fontWeight: 700, color: T.textMed }}>Before you start: </span>{day.setup}
        </div>
      )}

      <div style={{ height: 3, background: T.border, borderRadius: 2, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : T.gold, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

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

  // All levels unlocked — browse freely, work at your own pace
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

      {/* VowelMap — always visible as reference */}
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
        <button onClick={handleTapTempo} style={{
          marginTop: 8, width: "100%", background: "transparent", border: `1px dashed ${T.border}`, color: T.textMed,
          padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", borderRadius: 8,
          fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
        }}>
          ✋ Tap Tempo
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
          <span style={{ fontSize: 24, width: 32, textAlign: "center" }}>{t.icon}</span>
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

  // All levels unlocked — browse freely, work at your own pace
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
            {metro.playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
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
        <svg viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="nav-label">Practice</span>
      </button>

      <button className={`nav-item ${tab === "skills" ? "active" : ""}`} onClick={() => setTab("skills")}>
        <svg viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span className="nav-label">Skills</span>
      </button>

      <button className={`nav-item ${tab === "tools" ? "active" : ""}`} onClick={() => setTab("tools")}>
        <svg viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        <span className="nav-label">Tools</span>
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

  const startFlow = useCallback((exercises, accentColor) => {
    setFlowExercises(exercises);
    setFlowAccentColor(accentColor || T.gold);
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
    { id: "tools", label: "Tools" }
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
          onOpenTapMatch={setTapMatchBpm}
        />
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
          <div style={{ padding: "40px 24px 30px", width: "100%", maxWidth: 640, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/icon-jungle.png" alt="Jungle Tools Logo" style={{
                  height: 32, width: 32, objectFit: "cover",
                  borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  mixBlendMode: isDark ? "normal" : "multiply" // removes white background seamlessly on light theme
                }} />
              </div>
              <button className="interactive-btn" onClick={toggleTheme} style={{
                background: "transparent", border: `1px solid ${T.border}`,
                color: T.textMed, padding: "6px 8px", borderRadius: T.radiusMd,
                cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: -6
              }}>
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
            <div style={{ fontSize: 40, fontWeight: 400, fontFamily: T.serif, color: T.textDark, lineHeight: 1.2 }}>Practice Plan</div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 10, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.15em", lineHeight: 1.6 }}>Lesson 3/2 · Tenor · Break ≈ A3</div>
            <div style={{ width: "100%", maxWidth: 320, margin: "20px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 6, background: T.border, overflow: "hidden", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${weekPct}%`, background: weekPct === 100 ? T.success : T.gold, transition: "width 0.5s", borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, fontFamily: T.serif, color: weekPct === 100 ? T.success : T.gold, minWidth: 36 }}>{weekPct}%</div>
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

      <div style={{ maxWidth: 560, margin: "0 auto", padding: `${tab === "practice" ? 0 : 20}px 16px 90px` }}>
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
