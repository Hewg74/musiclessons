import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import confetti from "canvas-confetti";
import { AudioPlayer, FlightCheck, OfflineTabs, AudioRecorder, PitchPipe, LivePitchDetector, FretboardDiagram, VolumeMeter, TAB_CONTENT } from './JungleTools.jsx';
import { DAYS, KEYBOARD_LEVELS, LOOPER_LEVELS, LESSON_POOL, ALL_NOTES, getPitchRange } from './data/appData.js';
import { VOCAL_LEVELS } from './data/vocalLevels.js';
import { GUITAR_STUDY } from './data/guitarStudy.js';
import { SINGER_SONGWRITER_LEVELS } from './data/singerSongwriter.js';

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

  sm: "0 2px 8px rgba(44, 40, 37, 0.04)", md: "0 8px 24px rgba(44, 40, 37, 0.08)",
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
  sm: "0 2px 8px rgba(0, 0, 0, 0.4)", md: "0 8px 24px rgba(0, 0, 0, 0.6)",
};

let ACCENT_CONFIG = {}; // Will be initialized below

export function applyTheme(isDark) {
  Object.assign(T, isDark ? DARK_THEME : LIGHT_THEME);
  ACCENT_CONFIG.accent = { volOffset: 0, pitchOffset: 0, label: "Accent", color: T.gold };
  ACCENT_CONFIG.normal = { volOffset: -4, pitchOffset: 12, label: "Normal", color: T.textMed };
  ACCENT_CONFIG.ghost = { volOffset: -10, pitchOffset: 12, label: "Ghost", color: T.textMuted };
  ACCENT_CONFIG.mute = { volOffset: -99, pitchOffset: 0, label: "Mute", color: T.border };
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
  classic: { label: "Classic", synthType: "synth", osc: "triangle", attack: 0.001, decay: 0.06, volume: 4 },
  clave: { label: "Clave", synthType: "fm", osc: "sine", modOsc: "sine", harmonicity: 3.5, modIndex: 1, attack: 0.001, decay: 0.08, volume: 5 },
  wood: { label: "Woodblock", synthType: "fm", osc: "sine", modOsc: "triangle", harmonicity: 2, modIndex: 0.8, attack: 0.001, decay: 0.12, volume: 4 },
  chime: { label: "Bell", synthType: "fm", osc: "sine", modOsc: "sine", harmonicity: 3, modIndex: 2, attack: 0.001, decay: 0.4, volume: 3 },
  click: { label: "Modern Click", synthType: "membrane", osc: "sine", pitchDecay: 0.008, octaves: 3, attack: 0.001, decay: 0.04, volume: 4 },
  soft: { label: "Soft Tick", synthType: "synth", osc: "sine", attack: 0.002, decay: 0.04, volume: 0 },
  hihat: { label: "Hi-Hat", synthType: "metal", frequency: 300, resonance: 5000, octaves: 1.5, harmonicity: 5.1, modIndex: 16, attack: 0.001, decay: 0.04, volume: -4 },
  rim: { label: "Rimshot", synthType: "membrane", osc: "sine", pitchDecay: 0.015, octaves: 4, attack: 0.001, decay: 0.04, volume: 3 },
  cowbell: { label: "Cowbell", synthType: "metal", frequency: 400, resonance: 300, harmonicity: 5.1, modIndex: 20, octaves: 2, attack: 0.001, decay: 0.08, volume: -2 },
  shaker: { label: "Shaker", synthType: "noise", attack: 0.005, decay: 0.04, volume: -6 },
};

const KIT_KEYS = Object.keys(SOUND_KITS);

// accent levels handled dynamically by applyTheme
// accent = loud downbeat, normal = standard, ghost = quiet, mute = silent
const ACCENT_LEVELS = ["accent", "normal", "ghost", "mute"];

function createSynth(kit) {
  const k = SOUND_KITS[kit];
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

function triggerSynth(synth, kit, pitchNote, volDb, time) {
  const k = SOUND_KITS[kit];
  if (k.synthType === "noise") {
    synth.volume.value = volDb;
    synth.triggerAttackRelease("32n", time);
  } else if (k.synthType === "metal") {
    synth.volume.value = volDb;
    synth.triggerAttackRelease("32n", time);
  } else {
    synth.volume.value = volDb;
    synth.triggerAttackRelease(pitchNote, "32n", time);
  }
}

// ─── METRONOME ENGINE ───────────────────────────────────────────────
function useMetronome() {
  const [bpm, setBpm] = useState(120);
  const [playing, setPlaying] = useState(false);
  const beat = 0; // Dummy beat to satisfy return signature; actual beat is managed via events to prevent App re-renders
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [soundKit, setSoundKit] = useState("classic");
  const [gapClick, setGapClick] = useState(0); // 0=off, 4=mute 4th bar
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
  const gapClickRef = useRef(gapClick);
  const speedBuilderRef = useRef(speedBuilder);
  const speedIncrementRef = useRef(speedIncrement);
  const speedBarsRef = useRef(speedBars);
  const speedCeilingRef = useRef(speedCeiling);

  // Keep refs in sync
  useEffect(() => { beatConfigRef.current = beatConfig; }, [beatConfig]);
  useEffect(() => { soundKitRef.current = soundKit; }, [soundKit]);
  useEffect(() => { beatsRef.current = beatsPerBar; }, [beatsPerBar]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { gapClickRef.current = gapClick; }, [gapClick]);
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

      const gc = gapClickRef.current;
      let isMute = bc.accent === "mute";
      if (gc > 0 && bar % gc === (gc - 1)) isMute = true;

      if (!isMute) {
        const kit = bc.kit || soundKitRef.current;
        const synth = synthsRef.current[kit];
        if (synth) {
          const basePitch = bc.accent === "accent" ? "G5" : "C5";
          const vol = SOUND_KITS[kit].volume + acc.volOffset;
          triggerSynth(synth, kit, basePitch, vol, time);
        }
      }

      Tone.Draw.schedule(() => {
        window.dispatchEvent(new CustomEvent('metroBeat', { detail: { beat: b, isMute } }));
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
    bpm, playing, beat, beatsPerBar, soundKit, beatConfig, gapClick, speedBuilder, speedIncrement, speedBars, speedCeiling,
    start, stop, changeBpm, changeBeats, setSoundKit, cycleAccent, setBeatKit, setGapClick,
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
    <div style={{ display: "flex", gap: compact ? 3 : 6, justifyContent: "center", margin: compact ? 0 : "10px 0" }}>
      {Array.from({ length: n }).map((_, i) => {
        const acc = cfg[i]?.accent || "normal";
        const c = ACCENT_CONFIG[acc]?.color || T.textMed;
        const isMute = acc === "mute";
        const isActive = playing && beat === i;
        const size = acc === "accent" ? ds : s;
        return (
          <div key={i} style={{
            width: size, height: size, borderRadius: "50%",
            background: isMute ? "transparent" : (isActive ? T.textDark : c + "40"),
            border: isMute ? `2px dashed ${T.border}` : (isActive ? `2px solid ${T.textDark}` : "2px solid transparent"),
            transition: "all 0.08s", transform: isActive ? "scale(1.4)" : "scale(1)",
            boxShadow: isActive && !isMute ? `0 0 12px ${T.textDark}40` : "none"
          }} />
        );
      })}
    </div>
  );
}

function TimerRing({ pct, fmt, size = 50 }) {
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
        <div style={{ fontSize: 11, fontWeight: 600, fontFamily: T.sans, color: done ? T.success : T.textDark }}>
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
  return (
    <div style={{
      background: color + "08", border: `1px solid ${color}18`,
      borderRadius: T.radius, padding: "16px", marginBottom: 12,
      borderLeft: `1px solid ${color}`
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.5, marginBottom: 6, fontFamily: T.sans, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7 }}>
        {children}
      </div>
    </div>
  );
}

function PitchRibbon({ pitches, playNote }) {
  if (!pitches || pitches.length === 0) return null;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, marginBottom: 12, fontFamily: T.sans }}>REFERENCE PITCHES</div>

      {/* Scroll container — bleeds to edges */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        paddingBottom: 8,
        marginLeft: -20, marginRight: -20,
        paddingLeft: 20, paddingRight: 20,
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE
        scrollSnapType: "x proximity"
      }}
        className="hide-scrollbar"
      >
        <div style={{ display: "flex", gap: 4 }}>
          {pitches.map((note, i) => {
            const isAccidental = note.includes("♭") || note.includes("#");
            const bg = isAccidental ? T.textDark : T.goldSoft;
            const fg = isAccidental ? "#fff" : T.goldDark;
            const border = isAccidental ? `1px solid ${T.textDark}` : `1px solid ${T.border}`;

            return (
              <button
                key={i}
                onClick={() => playNote(note)}
                onPointerDown={e => {
                  e.currentTarget.style.transform = "scale(0.92) translateY(2px)";
                  e.currentTarget.style.opacity = "0.8";
                }}
                onPointerUp={e => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.opacity = "1";
                }}
                onPointerLeave={e => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.opacity = "1";
                }}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: "center",
                  minWidth: isAccidental ? 54 : 64,
                  height: isAccidental ? 70 : 80,
                  borderRadius: T.radiusMd,
                  background: bg, border: border,
                  color: fg, cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end",
                  paddingBottom: 12,
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)", fontFamily: T.sans,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>{note}</span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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

function ExerciseCard({ ex, completed, onComplete, metro, dayColor, onOpenTapMatch }) {
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [stepDone, setStepDone] = useState({});
  const [trackRates, setTrackRates] = useState({});
  const audioRefs = useRef({});
  const timer = useTimer(ex.time);

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
    <div className="exercise-card" style={{
      background: completed ? T.successSoft : T.bgCard,
      border: `1px solid ${completed ? T.success + "40" : T.border}`,
      borderLeft: `1px solid ${completed ? T.success : dayColor || T.gold}`,
      marginBottom: 12, overflow: "hidden", borderRadius: T.radius
    }}>
      <div onClick={() => setOpen(!open)} style={{
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
                <div key={i} style={{ marginBottom: 8, background: T.bgSoft, border: `1px solid ${T.border}`, padding: 12, borderRadius: T.radiusMd }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, letterSpacing: 1.5, marginBottom: 8, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
                  <audio controls src={t.src} ref={el => { audioRefs.current[i] = el; }} style={{ width: "100%", height: 36, borderRadius: T.radius }} />
                  <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                    {[0.75, 1, 1.25].map(rate => (
                      <button key={rate} onClick={() => {
                        if (audioRefs.current[i]) audioRefs.current[i].playbackRate = rate;
                        setTrackRates(r => ({ ...r, [i]: rate }));
                      }} style={{
                        background: (trackRates[i] || 1) === rate ? T.gold : "transparent",
                        color: (trackRates[i] || 1) === rate ? "#fff" : T.textMed,
                        border: `1px solid ${(trackRates[i] || 1) === rate ? T.gold : T.borderSoft}`,
                        padding: "3px 8px", fontSize: 10, fontWeight: 600, cursor: "pointer",
                        borderRadius: T.radius, fontFamily: T.sans
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
                <button onClick={() => metro.changeBpm(Math.max(40, metro.bpm - 5))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>-</button>
                <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 40, textAlign: "center" }}>{metro.bpm}</div>
                <button onClick={() => metro.changeBpm(Math.min(280, metro.bpm + 5))} style={{ background: "transparent", border: "none", fontSize: 18, cursor: "pointer", color: T.textMed }}>+</button>
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

                <button onClick={() => {
                  if (!metro.speedBuilder && ex.speedLadder) {
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
                }} title={ex.speedLadder ? `${ex.speedLadder.start}→${ex.speedLadder.end} BPM, +${ex.speedLadder.increment} every ${ex.speedLadder.bars} bars` : "Auto-increment BPM"}>
                  Speed + {metro.speedBuilder && metro.speedCeiling > 0 ? `↩${metro.speedCeiling}` : ""}
                </button>
              </div>
              {metro.speedBuilder && (
                <div style={{ display: "flex", gap: 6, marginTop: 8, fontSize: 11, color: T.textLight, fontFamily: T.sans, alignItems: "center" }}>
                  <span>+{metro.speedIncrement} BPM / {metro.speedBars} bars</span>
                  {metro.speedCeiling > 0 && <span style={{ color: T.coral }}>↩ loop at {metro.speedCeiling}</span>}
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

          {/* Piano Keys Diagram */}
          {ex.pianoKeys && (
            <PianoKeysDiagram
              notes={ex.pianoKeys.notes}
              label={ex.pianoKeys.label}
              range={ex.pianoKeys.range}
            />
          )}

          {/* Volume Meter */}
          {ex.volumeMeter && (
            <VolumeMeter theme={T} inline={true} />
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
          <div style={{ marginBottom: 14 }}>
            {ex.steps.map((s, i) => (
              <div key={i}>
                {s.visual === "lyricGrid" && <LyricGrid />}
                <div style={{
                  display: "flex", gap: 12, padding: "8px 0",
                  borderBottom: i < ex.steps.length - 1 ? `1px solid ${T.border}` : "none",
                  opacity: ex.checklist && stepDone[i] ? 0.5 : 1,
                  transition: "opacity 0.2s"
                }}>
                  {ex.checklist ? (
                    <div onClick={() => setStepDone(d => ({ ...d, [i]: !d[i] }))} style={{
                      width: 24, height: 24, borderRadius: 4, border: `2px solid ${stepDone[i] ? T.success : dayColor}`,
                      background: stepDone[i] ? T.success : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0, marginTop: 1, transition: "all 0.15s"
                    }}>
                      {stepDone[i] && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>&#10003;</span>}
                    </div>
                  ) : (
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", background: dayColor + "10", border: `1px solid ${dayColor}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 600, color: dayColor, flexShrink: 0, fontFamily: T.sans, marginTop: 1
                    }}>{i + 1}</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, color: T.textDark, fontFamily: T.sans, lineHeight: 1.6, fontWeight: 500,
                      textDecoration: ex.checklist && stepDone[i] ? "line-through" : "none"
                    }}>
                      {s.text}
                    </div>
                    {s.why && (
                      <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, lineHeight: 1.5, marginTop: 3, fontStyle: "italic" }}>
                        {s.why}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feel / Wrong */}
          <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>
          <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>

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

function DayView({ day, completed, onComplete, metro, onOpenTapMatch }) {
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
        <div style={{ fontSize: 32, fontWeight: 700, fontFamily: T.serif, color: pct === 100 ? T.success : T.textDark }}>{pct}%</div>
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
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} onOpenTapMatch={onOpenTapMatch} />
      ))}
    </div>
  );
}

// VocalCard removed — voice tab now uses VoiceView with ExerciseCard format

function VowelMap() {
  const whiteKeys = ["E3", "F3", "G3", "A3", "B3", "C4"];
  const blackKeys = {
    "F3": "F#3",
    "G3": "A♭3",
    "A3": "B♭3"
  };
  const noteIndex = { "E3": 0, "F3": 1, "F#3": 2, "G3": 3, "A♭3": 4, "A3": 5, "B♭3": 6, "B3": 7, "C4": 8 };

  const zones = [
    { range: [0, 3], label: "'ah' open", color: T.success },
    { range: [3, 4], label: "'ah'→'uh'", color: T.warm },
    { range: [4, 5], label: "'uh'→'oh'", color: T.coral },
    { range: [5, 8], label: "'oh' (head)", color: T.plum }
  ];

  const playNote = async (n) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(n.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
  };

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      padding: 24, marginBottom: 20, boxShadow: T.sm
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, marginBottom: 20, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase" }}>
        Vowel Modification Map — Tap notes to play 🔊
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <div style={{
          display: "flex",
          position: "relative",
          height: 140,
          borderRadius: 6,
          boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
          border: `1px solid ${T.border}`,
          background: "#1a1a1a",
          padding: 2
        }}>
          {whiteKeys.map((wNote, idx) => {
            const wIdx = noteIndex[wNote];
            const wZone = zones.find(z => wIdx >= z.range[0] && wIdx < z.range[1]);
            const bNote = blackKeys[wNote];
            const bIdx = bNote ? noteIndex[bNote] : -1;
            const bZone = bNote ? zones.find(z => bIdx >= z.range[0] && bIdx < z.range[1]) : null;

            return (
              <div key={wNote} style={{ position: "relative", display: "flex" }}>
                <div
                  onClick={() => playNote(wNote)}
                  style={{
                    width: 48,
                    height: "100%",
                    background: wZone ? `${wZone.color}20` : T.bgCard,
                    border: `1px solid ${T.borderSoft}`,
                    borderRadius: "0 0 4px 4px",
                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                    paddingBottom: 12, cursor: "pointer",
                    boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.05)",
                    transition: "all 0.1s ease", zIndex: 1,
                    borderBottom: `4px solid ${wZone?.color || T.borderSoft}`
                  }}
                  onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
                  onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: T.textDark, fontFamily: T.sans }}>{wNote}</span>
                </div>

                {bNote && (
                  <div
                    onClick={() => playNote(bNote)}
                    style={{
                      position: "absolute",
                      right: -16, top: 0,
                      width: 32, height: 85,
                      background: bZone ? bZone.color : "#222",
                      borderRadius: "0 0 3px 3px",
                      zIndex: 2, cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 2px rgba(255,255,255,0.2)",
                      display: "flex", alignItems: "flex-end", justifyContent: "center",
                      paddingBottom: 8, transition: "transform 0.1s ease"
                    }}
                    onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
                    onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                    onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: T.sans }}>{bNote.replace('♭', 'b')}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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

function PianoKeysDiagram({ notes = [], label = "", range }) {
  const CHROMATIC = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
  const WHITE_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
  const BLACK_MAP = { "C": "C#", "D": "E♭", "F": "F#", "G": "A♭", "A": "B♭" };

  // Determine range
  const startOct = range ? parseInt(range[0].slice(-1)) : Math.min(...notes.map(n => parseInt(n.slice(-1))));
  const endOct = range ? parseInt(range[1].slice(-1)) : Math.max(...notes.map(n => parseInt(n.slice(-1))));
  const octaves = [];
  for (let o = startOct; o <= endOct; o++) octaves.push(o);

  const highlightSet = new Set(notes);

  const playNote = async (n) => {
    if (Tone.context.state !== 'running') await Tone.context.resume();
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.1, decay: 0.2, sustain: 1, release: 1 }
    }).toDestination();
    synth.volume.value = -8;
    synth.triggerAttackRelease(n.replace('♭', 'b'), "2n");
    setTimeout(() => synth.dispose(), 2000);
  };

  const whiteKeys = [];
  const blackKeys = [];
  octaves.forEach(oct => {
    WHITE_NAMES.forEach(w => {
      const note = `${w}${oct}`;
      whiteKeys.push(note);
      const bName = BLACK_MAP[w];
      if (bName) blackKeys.push({ note: `${bName}${oct}`, afterWhite: whiteKeys.length - 1 });
    });
  });

  return (
    <div style={{
      background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      padding: 16, marginBottom: 16
    }}>
      {label && <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, marginBottom: 12, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase" }}>{label}</div>}
      <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
        <div style={{ display: "flex", position: "relative", height: 120, borderRadius: 4, border: `1px solid ${T.border}`, background: "#1a1a1a", padding: 2 }}>
          {whiteKeys.map((wNote, idx) => {
            const isHighlight = highlightSet.has(wNote);
            return (
              <div key={wNote} style={{ position: "relative", display: "flex" }}>
                <div onClick={() => playNote(wNote)} style={{
                  width: 36, height: "100%",
                  background: isHighlight ? `${T.gold}30` : T.bgCard,
                  border: `1px solid ${T.borderSoft}`, borderRadius: "0 0 3px 3px",
                  display: "flex", alignItems: "flex-end", justifyContent: "center",
                  paddingBottom: 8, cursor: "pointer", zIndex: 1,
                  borderBottom: isHighlight ? `3px solid ${T.gold}` : `1px solid ${T.borderSoft}`,
                  transition: "all 0.1s ease"
                }}
                  onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
                  onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: 10, fontWeight: isHighlight ? 700 : 500, color: isHighlight ? T.goldDark : T.textLight, fontFamily: T.sans }}>{wNote}</span>
                </div>
              </div>
            );
          })}
          {blackKeys.map(({ note: bNote, afterWhite }) => {
            const isHighlight = highlightSet.has(bNote);
            const left = (afterWhite + 1) * 36 - 12;
            return (
              <div key={bNote} onClick={() => playNote(bNote)} style={{
                position: "absolute", left, top: 0, width: 24, height: 72,
                background: isHighlight ? T.gold : "#222", borderRadius: "0 0 3px 3px",
                zIndex: 2, cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)", display: "flex", alignItems: "flex-end", justifyContent: "center",
                paddingBottom: 6, transition: "transform 0.1s ease"
              }}
                onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
                onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: T.sans }}>{bNote}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── VOICE CURRICULUM ───────────────────────────────────────────────

const VOCAL_COLORS = ["#9e829c", "#8b6f89", "#d97d54", "#7f9e88", "#5b7fa5", "#d68383", "#72a8a8", "#d4a373", "#6b8e9f", "#9e829c"];

function VoiceView({ completed, onComplete, metro, onOpenTapMatch }) {
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
      <div className="hide-scrollbar" style={{
        display: "flex", gap: 0, overflowX: "auto", padding: "0 0 0",
        position: "sticky", top: 49, zIndex: 9, background: T.bg,
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

      {/* Review check-in + Selected level exercises */}
      <div style={{ marginTop: 20 }}>
        <ReviewCheckIn review={selectedLevel.review} accentColor={T.plum} />
        <LevelView level={selectedLevel} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} levelColor={VOCAL_COLORS[(selectedLevel.num - 1) % VOCAL_COLORS.length]} />
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
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 32, textAlign: "center", borderRadius: T.radius
      }}>
        <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 12 }}>
          Metronome
        </div>

        {/* Beat visualizer — tap beats to edit */}
        <BeatDots beat={metro.beat} playing={metro.playing} beatConfig={metro.beatConfig} beatsPerBar={metro.beatsPerBar} />

        <div style={{ fontSize: 56, fontWeight: 700, color: T.textDark, fontFamily: T.serif, margin: "8px 0 0" }}>{metro.bpm}</div>
        <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 20 }}>BPM</div>

        <input type="range" min={40} max={280} value={metro.bpm}
          onChange={e => metro.changeBpm(Number(e.target.value))}
          style={{ width: "100%", accentColor: T.gold, marginBottom: 20, height: 2 }} />

        {/* Preset BPMs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
          {[78, 120, 122, 165, 200, 244].map(v => (
            <button key={v} onClick={() => metro.changeBpm(v)} style={{
              background: metro.bpm === v ? T.gold : "transparent", border: `1px solid ${metro.bpm === v ? T.gold : T.borderSoft}`,
              color: metro.bpm === v ? "#fff" : T.textMed, padding: "8px 20px", borderRadius: T.radius,
              fontSize: 12, fontWeight: 400, cursor: "pointer", fontFamily: T.sans, letterSpacing: 1
            }}>{v}</button>
          ))}
        </div>

        {/* Start/Stop & Tap Tempo */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={handleTapTempo} style={{
            flex: 1, background: "transparent", border: `1px dashed ${T.border}`, color: T.textMed,
            padding: "14px", fontSize: 13, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
            fontFamily: T.sans, letterSpacing: 1, textTransform: "uppercase"
          }}>
            ✋ Tap Tempo
          </button>
          <button onClick={metro.playing ? metro.stop : metro.start} style={{
            flex: 2, background: metro.playing ? T.coral : T.gold, border: "none", color: "#fff",
            padding: "14px", fontSize: 15, fontWeight: 600, cursor: "pointer", borderRadius: T.radius,
            fontFamily: T.sans, letterSpacing: 1.5, textTransform: "uppercase"
          }}>
            {metro.playing ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      {/* Sound Kit selector */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 20, marginTop: 16, borderRadius: T.radius
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Sound
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {KIT_KEYS.map(k => (
            <button key={k} onClick={() => metro.setSoundKit(k)} style={{
              background: metro.soundKit === k ? T.gold : "transparent",
              border: `1px solid ${metro.soundKit === k ? T.gold : T.borderSoft}`,
              color: metro.soundKit === k ? "#fff" : T.textMed,
              padding: "8px 20px", fontSize: 12, fontWeight: 400, cursor: "pointer", fontFamily: T.sans, letterSpacing: 1
            }}>{SOUND_KITS[k].label}</button>
          ))}
        </div>
      </div>

      {/* Time Signature */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 20, marginTop: 16, borderRadius: T.radius
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Time Signature
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[2, 3, 4, 5, 6, 7].map(n => (
            <button key={n} onClick={() => metro.changeBeats(n)} style={{
              background: metro.beatsPerBar === n ? T.gold : "transparent",
              border: `1px solid ${metro.beatsPerBar === n ? T.gold : T.borderSoft}`,
              color: metro.beatsPerBar === n ? "#fff" : T.textMed,
              padding: "8px 20px", fontSize: 12, fontWeight: 400, cursor: "pointer", fontFamily: T.sans, letterSpacing: 1
            }}>{n}/4</button>
          ))}
        </div>
      </div>

      {/* Practice Features */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 20, marginTop: 16, borderRadius: T.radius
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Practice Features
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          <button onClick={() => metro.setGapClick(metro.gapClick ? 0 : 4)} style={{
            flex: 1, background: metro.gapClick ? T.gold : "transparent",
            border: `1px solid ${metro.gapClick ? T.gold : T.borderSoft}`,
            color: metro.gapClick ? "#fff" : T.textMed, borderRadius: T.radius,
            padding: "10px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: T.sans
          }}>Gap Click (Mute 1/4)</button>

          <button onClick={() => metro.setSpeedBuilder(!metro.speedBuilder)} style={{
            flex: 1, background: metro.speedBuilder ? T.gold : "transparent",
            border: `1px solid ${metro.speedBuilder ? T.gold : T.borderSoft}`,
            color: metro.speedBuilder ? "#fff" : T.textMed, borderRadius: T.radius,
            padding: "10px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: T.sans
          }}>Speed Builder (+{metro.speedIncrement}/{metro.speedBars} bars)</button>
        </div>

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

function TapMatchModal({ targetBpm, onClose, metro }) {
  const [taps, setTaps] = useState([]);
  const [flash, setFlash] = useState(false);
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

    // Force a re-render of the flash animation by toggling it off and on quickly
    setFlash(false);
    setTimeout(() => setFlash(true), 10);
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

  return (
    <div
      onPointerDown={handleTap}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: flash ? T.successSoft : T.bg,
        transition: flash ? "none" : "background 0.4s cubic-bezier(0.2, 0, 0, 1)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: T.textDark,
        animation: flash ? "flashAnim 0.4s ease-out" : "none",
        touchAction: "none" // Prevents zooming/scrolling on mobile to avoid missed taps
      }}
    >
      <style>{`
        @keyframes flashAnim {
          0% { background: ${T.successSoft}; }
          100% { background: ${T.bg}; }
        }
      `}</style>
      <button onPointerDown={(e) => { e.stopPropagation(); onClose(); }} style={{
        position: "absolute", top: 30, right: 30,
        background: "transparent", border: `1px solid ${T.border}`, padding: "10px 20px",
        borderRadius: T.radius, cursor: "pointer", color: T.textMed, fontSize: 14, textTransform: "uppercase", letterSpacing: 2,
        zIndex: 10
      }}>Close</button>

      <div style={{ fontSize: 18, color: T.textMuted, textTransform: "uppercase", letterSpacing: 4, marginBottom: 20, fontFamily: T.sans }}>
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

function LevelView({ level, completed, onComplete, metro, onOpenTapMatch, levelColor }) {
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
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} onOpenTapMatch={onOpenTapMatch} />
      ))}
    </div>
  );
}

function GuitarStudyView({ completed, onComplete, metro, onOpenTapMatch }) {
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
        background: T.bg,
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

        <ReviewCheckIn review={selectedLevel.review} accentColor={T.slate} />
        {selectedLevel.exercises.map(ex => (
          <ExerciseCard key={ex.id} ex={ex} metro={metro}
            completed={completed.has(ex.id)} onComplete={onComplete} dayColor={T.slate} onOpenTapMatch={onOpenTapMatch} />
        ))}
      </div>
    </div>
  );
}

function SingerSongwriterView({ completed, onComplete, metro, onOpenTapMatch }) {
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
        background: T.bg,
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

        <ReviewCheckIn review={selectedLevel.review} accentColor={T.coral} />
        {selectedLevel.exercises.map(ex => (
          <ExerciseCard key={ex.id} ex={ex} metro={metro}
            completed={completed.has(ex.id)} onComplete={onComplete} dayColor={T.coral} onOpenTapMatch={onOpenTapMatch} />
        ))}
      </div>
    </div>
  );
}

function KeysView({ completed, onComplete, metro, onOpenTapMatch }) {
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
        display: "flex", gap: 0, overflowX: "auto", padding: "0 0 0",
        background: T.bg,
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
        <LevelView level={selectedLevel} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} />
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

function LooperView({ completed, onComplete, metro, onOpenTapMatch }) {
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
        display: "flex", gap: 0, overflowX: "auto", padding: "0 0 0",
        background: T.bg,
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
        <LevelView level={selectedLevel} levelColor={LOOPER_COLORS[(selectedLevel.num - 1) % LOOPER_COLORS.length]} completed={completed} onComplete={onComplete} metro={metro} onOpenTapMatch={onOpenTapMatch} />
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
  const metro = useMetronome();

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
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d68383', '#d97d54', '#d4a373', '#7f9e88', '#72a8a8', '#6b8e9f', '#9e829c']
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
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease, border-color 0.2s ease;
          animation: fade-in-up 0.4s ease-out forwards;
        }
        .exercise-card:hover {
          transform: translateY(-2px);
          box-shadow: ${T.md};
          border-color: #ccc !important;
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
          <div style={{ padding: "30px 20px 20px", width: "100%", maxWidth: 640, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.gold, fontWeight: 600, fontFamily: T.sans }}>
                Sarah Glass Music
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
            <div style={{ fontSize: 14, color: T.textMuted, marginTop: 6, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.05em" }}>Lesson 3/2 · Tenor · Break ≈ A3</div>
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
      <div className="hide-scrollbar desktop-only" style={{ background: T.bgCard, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "center", boxShadow: T.sm, overflowX: "auto", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
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
              background: T.bg,
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
                    cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                    opacity: active ? 1 : 0.8,
                    boxShadow: active ? `0 4px 10px ${c}40` : "none"
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#fff" : c, fontFamily: T.sans }}>
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
              <DayView day={selectedDay} completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            </div>

            {/* Archive — exercises from LESSON_POOL by skill branch */}
            <div style={{ marginTop: 40, borderTop: `1px solid ${T.border}`, paddingTop: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 4 }}>
                  Exercise Archive
                </div>
                <div style={{ fontSize: 13, color: T.textLight, fontFamily: T.sans }}>
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
              <VoiceView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            )}

            {skillTab === "guitar" && (
              <GuitarStudyView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            )}

            {skillTab === "keys" && (
              <KeysView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            )}

            {skillTab === "looper" && (
              <LooperView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            )}

            {skillTab === "songwriter" && (
              <SingerSongwriterView completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
            )}
          </div>
        )}

        {/* TOOLS TAB — Metronome + all tools combined */}
        {tab === "tools" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 6 }}>
                Jungle Mode
              </div>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Tools</div>
            </div>

            {/* Metronome — always first, most-used tool */}
            <div style={{ marginBottom: 24 }}>
              <MetronomePanel metro={metro} onOpenTapMatch={setTapMatchBpm} />
              <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: 22, marginTop: 20, boxShadow: T.sm, borderRadius: T.radiusMd }}>
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
              </div>
              <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: 22, marginTop: 16, boxShadow: T.sm, borderRadius: T.radiusMd }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 14 }}>
                  Backing Tracks
                </div>
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
              </div>
            </div>

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
        <div onClick={() => setTab("tools")} style={{
          position: "fixed", bottom: 32, right: 32,
          background: T.bgCard, border: `1px solid ${T.gold}`,
          borderRadius: "50%", width: 64, height: 64, display: "flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer",
          boxShadow: `0 8px 30px ${T.goldMed}`, zIndex: 100
        }}>
          <BeatDots beat={metro.beat} playing={true} compact beatConfig={metro.beatConfig} beatsPerBar={metro.beatsPerBar} />
        </div>
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
