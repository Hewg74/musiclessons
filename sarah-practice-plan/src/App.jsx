import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import confetti from "canvas-confetti";
import { AudioPlayer, FlightCheck, OfflineTabs, AudioRecorder, PitchPipe, LivePitchDetector } from './JungleTools.jsx';
import { DAYS, VOCAL_EXERCISES, LESSON_POOL, ALL_NOTES, getPitchRange } from './data/appData.js';

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
};

const DAY_COLORS = ["#d68383", "#d97d54", "#d4a373", "#7f9e88", "#72a8a8", "#6b8e9f", "#9e829c"];

// ─── DATA (imported from ./data/appData.js) ───────────────────────

// ─── SOUND KITS ─────────────────────────────────────────────────────
// Each kit defines synth params for Tone.js — different timbres
const SOUND_KITS = {
  classic: { label: "Classic", synthType: "synth", osc: "square", attack: 0.001, decay: 0.03, volume: 2 },
  chime: { label: "Meaty Chime", synthType: "fm", osc: "sine", modOsc: "square", harmonicity: 2.5, modIndex: 4, attack: 0.005, decay: 0.6, volume: 4 },
  wood: { label: "Woodblock", synthType: "fm", osc: "sine", modOsc: "square", harmonicity: 1.5, modIndex: 1.5, attack: 0.002, decay: 0.15, volume: 4 },
  click: { label: "Modern Click", synthType: "membrane", osc: "square", pitchDecay: 0.01, octaves: 4, attack: 0.001, decay: 0.05, volume: 4 },
  hihat: { label: "Hi-Hat", synthType: "metal", osc: "square", frequency: 200, resonance: 4000, octaves: 2, harmonicity: 5.1, modIndex: 32, attack: 0.001, decay: 0.05, volume: -2 },
  rim: { label: "Rimshot", synthType: "membrane", osc: "sawtooth", pitchDecay: 0.02, octaves: 5, attack: 0.001, decay: 0.05, volume: 4 },
  cowbell: { label: "Cowbell", synthType: "metal", osc: "square", frequency: 300, resonance: 200, harmonicity: 5.1, modIndex: 32, octaves: 3, attack: 0.001, decay: 0.1, volume: 0 },
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
  const [speedBuilder, setSpeedBuilder] = useState(false); // true = +5 bpm every 4 bars

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

  // Keep refs in sync
  useEffect(() => { beatConfigRef.current = beatConfig; }, [beatConfig]);
  useEffect(() => { soundKitRef.current = soundKit; }, [soundKit]);
  useEffect(() => { beatsRef.current = beatsPerBar; }, [beatsPerBar]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { gapClickRef.current = gapClick; }, [gapClick]);
  useEffect(() => { speedBuilderRef.current = speedBuilder; }, [speedBuilder]);

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

      if (speedBuilderRef.current && b === 0 && bar > 0 && bar % 4 === 0) {
        const nextBpm = Math.min(280, bpmRef.current + 5);
        bpmRef.current = nextBpm;
        Tone.Transport.bpm.value = nextBpm;
        Tone.Draw.schedule(() => setBpm(nextBpm), time);
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

  return {
    bpm, playing, beat, beatsPerBar, soundKit, beatConfig, gapClick, speedBuilder,
    start, stop, changeBpm, changeBeats, setSoundKit, cycleAccent, setBeatKit, setGapClick, setSpeedBuilder
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
      borderLeft: `3px solid ${T.gold}`,
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
      borderLeft: `3px solid ${color}`
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

function ExerciseCard({ ex, completed, onComplete, metro, dayColor, onOpenTapMatch }) {
  const [open, setOpen] = useState(false);

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
  };

  // Auto-detect audio tracks based on text
  const textContent = (ex.setup || "") + " " + ex.steps.map(s => s.text).join(" ");
  const tracks = [];
  if (textContent.includes("Surf Rock Beat 120")) tracks.push({ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" });
  if (textContent.includes("Groove Beat 90")) tracks.push({ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" });
  if (textContent.includes("Sol Del Sur")) tracks.push({ name: "Sol Del Sur", src: "/iltwyw.mp3" });
  if (textContent.includes("I Like The Way You Walk") || textContent.includes("ILTWYW")) tracks.push({ name: "I Like The Way You Walk", src: "/sol-del-sur.mp3" });

  return (
    <div className="exercise-card" style={{
      background: completed ? T.successSoft : T.bgCard,
      border: `1px solid ${completed ? T.success + "40" : T.border}`,
      borderLeft: `3px solid ${completed ? T.success : T.border}`,
      marginBottom: 10, overflow: "hidden",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: "pointer"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 54 }}>
          <TypeBadge type={ex.type} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 400, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{ex.title}</div>
          <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ex.time} min</div>
        </div>
        <div style={{ color: T.textMuted, fontSize: 13, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>▾</div>
      </div>

      {open && (
        <div style={{ padding: "0 18px 18px" }}>
          {/* Reference Pitches */}
          <PitchRibbon pitches={ex.referencePitches} playNote={playNote} />

          {/* What & Why */}
          <div style={{
            fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7,
            marginBottom: 14, padding: "12px 16px", background: T.bgSoft, borderRadius: T.radius,
            borderLeft: `3px solid ${T.gold}`
          }}>{ex.what}</div>

          {/* Setup */}
          {ex.setup && (
            <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 12, display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ color: T.gold, fontWeight: 700, fontSize: 11 }}>SETUP:</span> {ex.setup}
            </div>
          )}

          {/* Audio Tracks */}
          {tracks.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              {tracks.map((t, i) => (
                <div key={i} style={{ marginBottom: 8, background: T.bgSoft, border: `1px solid ${T.border}`, padding: 12, borderRadius: T.radiusMd }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, letterSpacing: 1.5, marginBottom: 8, fontFamily: T.sans, textTransform: "uppercase" }}>{t.name}</div>
                  <audio controls src={t.src} style={{ width: "100%", height: 36, borderRadius: T.radius }} />
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

                {ex.referencePitches && ex.referencePitches.length > 0 && (
                  <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} />
                )}
              </div>
            </div>
          )}

          {!ex.metronome && ex.referencePitches && ex.referencePitches.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} />
            </div>
          )}

          {/* Steps */}
          <div style={{ marginBottom: 14 }}>
            {ex.steps.map((s, i) => (
              <div key={i}>
                {s.visual === "lyricGrid" && <LyricGrid />}
                <div style={{
                  display: "flex", gap: 12, padding: "8px 0",
                  borderBottom: i < ex.steps.length - 1 ? `1px solid ${T.border}` : "none"
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: T.radius, background: dayColor + "08", border: `1px solid ${dayColor}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 400, color: dayColor, flexShrink: 0, fontFamily: T.sans, marginTop: 1
                  }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: T.textDark, fontFamily: T.sans, lineHeight: 1.6, fontWeight: 500 }}>
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
          padding: "16px 20px", marginBottom: 20, fontSize: 13, color: T.textLight, fontFamily: T.sans,
          borderLeft: `3px solid ${T.gold}`
        }}>
          <span style={{ fontWeight: 700, color: T.textMed }}>Before you start: </span>{day.setup}
        </div>
      )}

      <div style={{ height: 3, background: T.border, borderRadius: 2, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : T.gold, borderRadius: 2, transition: "width 0.5s" }} />
      </div>

      {day.exercises.map(ex => (
        <ExerciseCard key={ex.id} ex={ex} metro={metro}
          completed={completed.has(ex.id)} onComplete={onComplete} dayColor={c} onOpenTapMatch={onOpenTapMatch} />
      ))}
    </div>
  );
}

function VocalCard({ ex }) {
  const [open, setOpen] = useState(false);
  const colors = [T.plum, T.coral, T.slate, T.success, T.warm, T.coral];
  const c = colors[(ex.num - 1) % colors.length];

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
  };

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      marginBottom: 12, overflow: "hidden", boxShadow: open ? T.md : T.sm, transition: "all 0.2s"
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", cursor: "pointer"
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: T.radius, background: c + "08", border: `1px solid ${c}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 400, color: c, flexShrink: 0, fontFamily: T.serif
        }}>{ex.num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 400, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{ex.title}</div>
          <div style={{ fontSize: 12, color: c, fontWeight: 500, fontFamily: T.sans }}>{ex.purpose}</div>
          <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ex.when}</div>
        </div>
        <div style={{ color: T.textMuted, fontSize: 14, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>▾</div>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          {/* Reference Pitches */}
          <PitchRibbon pitches={ex.referencePitches} playNote={playNote} />

          <div style={{ marginBottom: 20 }}>
            <LivePitchDetector theme={T} referencePitches={ex.referencePitches} inline={true} />
          </div>

          {/* What */}
          <div style={{
            fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7,
            marginBottom: 20, padding: "16px 20px", background: T.bgSoft, borderRadius: T.radius,
            borderLeft: `3px solid ${T.gold}`
          }}>{ex.what}</div>

          {/* How to */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, marginBottom: 10, fontFamily: T.sans }}>HOW TO DO IT</div>
            {ex.howTo.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "6px 0" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: T.radius, background: c + "08", border: `1px solid ${c}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 400, color: c, flexShrink: 0, fontFamily: T.sans
                }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          {/* Diagram */}
          <pre style={{
            background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius,
            padding: 20, fontSize: 13, color: T.textDark, lineHeight: 1.8,
            overflowX: "auto", whiteSpace: "pre", fontFamily: "'SF Mono','Fira Code',monospace",
            marginBottom: 20, borderLeft: `3px solid ${T.gold}`
          }}>{ex.diagram}</pre>

          {/* Feel / Wrong */}
          <DetailSection label="What correct feels like" color={T.success}>{ex.feel}</DetailSection>
          <DetailSection label="What's going wrong if" color={T.coral}>{ex.wrong}</DetailSection>

          {/* Tip */}
          <DetailSection label="Why this works" color={T.slate}>{ex.tip}</DetailSection>

          {/* Progression */}
          <div style={{
            borderTop: `1px solid ${T.border}`, paddingTop: 12, marginTop: 4
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1.5, marginBottom: 6, fontFamily: T.sans }}>PROGRESSION</div>
            <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.7 }}>{ex.progression}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function VowelMap() {
  const notes = ["E3", "F3", "F#3", "G3", "A♭3", "A3", "B♭3", "B3", "C4"];
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
  };

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      padding: 24, marginBottom: 20, boxShadow: T.sm
    }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, marginBottom: 14, letterSpacing: 2, fontFamily: T.sans, textTransform: "uppercase" }}>
        Vowel Modification Map — Tap notes to play 🔊
      </div>
      <div style={{ display: "flex", gap: 2, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {notes.map((n, i) => {
          const zone = zones.find(z => i >= z.range[0] && i < z.range[1]);
          return (
            <div key={n} onClick={() => playNote(n)} style={{
              flex: 1, minWidth: 40, textAlign: "center", padding: "14px 0",
              background: zone ? `${zone.color}08` : T.bgSoft, cursor: "pointer",
              borderRadius: i === 0 ? `${T.radius} 0 0 ${T.radius}` : i === notes.length - 1 ? `0 ${T.radius} ${T.radius} 0` : 0,
              borderBottom: `2px solid ${zone?.color || T.border}`,
              transition: "transform 0.1s"
            }}
              onPointerDown={e => e.currentTarget.style.transform = "scale(0.95)"}
              onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
              onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ fontSize: 12, fontWeight: 400, color: T.textDark, fontFamily: T.serif }}>{n}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        {zones.map(z => (
          <div key={z.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color }} />
            <span style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>{z.label}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, lineHeight: 1.6 }}>
        As you ascend, close the vowel to lower the first formant. This lets the folds thin out for mix/head voice instead of slamming into the chest voice ceiling. 'Ah' on G3 → hint of 'uh' on A♭3 → 'aw' on A3 → 'oh' in head voice.
      </div>
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
        padding: 32, textAlign: "center", boxShadow: T.md, borderRadius: T.radiusMd
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
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
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
        padding: 20, marginTop: 16, boxShadow: T.sm
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Sound
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
        padding: 20, marginTop: 16, boxShadow: T.sm
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Time Signature
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
        padding: 20, marginTop: 16, boxShadow: T.sm
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 12 }}>
          Practice Features
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
          }}>Speed Builder (+5/4 bars)</button>
        </div>
      </div>

      {/* Per-beat editor */}
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`,
        padding: 20, marginTop: 16, boxShadow: T.sm
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
      background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
      marginBottom: 12, overflow: "hidden", boxShadow: open ? T.md : T.sm, transition: "all 0.2s"
    }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", cursor: "pointer"
      }}>
        <div style={{ fontSize: 20, flexShrink: 0 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 400, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{title}</div>
        </div>
        <div style={{ color: T.textMuted, fontSize: 14, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "" }}>▾</div>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${T.borderSoft}`, paddingTop: 20 }}>
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
            background: T.bgCard, border: `1px solid ${T.border}`, marginBottom: 12,
            overflow: "hidden", boxShadow: isOpen ? T.md : T.sm, transition: "all 0.2s"
          }}>
            <div onClick={() => setOpenLesson(isOpen ? null : li)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", cursor: "pointer"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: T.radius, background: T.warmSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600, color: T.warm, fontFamily: T.sans, flexShrink: 0
              }}>{lesson.date.slice(5, 7)}/{lesson.date.slice(8, 10)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 400, fontSize: 18, color: T.textDark, fontFamily: T.serif }}>{lesson.title}</div>
                <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 2 }}>{lesson.duration}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
                  {lesson.topics.map((t, i) => (
                    <span key={i} style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 10,
                      background: T.bgSoft, border: `1px solid ${T.border}`,
                      color: T.textLight, fontFamily: T.sans
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: T.textMuted, fontSize: 14, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>▾</div>
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
                      <div key={ex.id} style={{ marginBottom: 8, border: `1px solid ${T.border}`, background: T.bgSoft }}>
                        <div onClick={() => setOpenSection(exOpen ? null : exKey)} style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer"
                        }}>
                          <span style={{
                            fontSize: 9, padding: "2px 6px", borderRadius: 8, fontFamily: T.sans, fontWeight: 600,
                            background: typeColors[ex.type] || T.textMuted, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5
                          }}>{ex.type}</span>
                          <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: T.textDark, fontFamily: T.sans }}>{ex.title}</span>
                          <span style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans }}>{ex.time}min</span>
                          <span style={{ color: T.textMuted, fontSize: 12, transition: "transform 0.2s", transform: exOpen ? "rotate(180deg)" : "" }}>▾</span>
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

  const [tab, setTab] = useState("week");
  const [selectedDay, setSelectedDay] = useState(null);
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
    { id: "week", label: "Week" },
    { id: "vocal", label: "Voice" },
    { id: "lessons", label: "Lessons" },
    { id: "metro", label: "Metronome" },
    { id: "tools", label: "Tools" }
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
      <div style={{ background: T.bgCard, padding: "60px 20px 40px", textAlign: "center", borderBottom: `1px solid ${T.border}`, position: "relative" }}>
        <button className="interactive-btn" onClick={toggleTheme} style={{
          position: "absolute", top: 20, right: 20,
          background: "transparent", border: `1px solid ${T.border}`,
          color: T.textMed, padding: "8px", borderRadius: T.radiusMd,
          cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {isDark ? "☀️" : "🌙"}
        </button>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.gold, fontWeight: 600, fontFamily: T.sans, marginBottom: 8 }}>
          Sarah Glass Music
        </div>
        <div style={{ fontSize: 40, fontWeight: 400, fontFamily: T.serif, color: T.textDark, lineHeight: 1.2 }}>Practice Plan</div>
        <div style={{ fontSize: 14, color: T.textMuted, marginTop: 6, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: "0.05em" }}>Lesson 3/2 · Tenor · Break ≈ A3</div>
        <div style={{ maxWidth: 280, margin: "20px auto 0", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 2, background: T.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${weekPct}%`, background: weekPct === 100 ? T.success : T.gold, transition: "width 0.5s" }} />
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 400, fontFamily: T.serif, color: weekPct === 100 ? T.success : T.gold, minWidth: 36 }}>{weekPct}%</div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", background: T.bgCard, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 10 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedDay(null); }} style={{
            flex: 1, padding: "16px 0", background: "none", border: "none",
            borderBottom: `2px solid ${tab === t.id ? T.gold : "transparent"}`,
            color: tab === t.id ? T.gold : T.textMuted,
            fontSize: 14, fontWeight: 400, cursor: "pointer", fontFamily: T.serif, letterSpacing: 0.5
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px 40px" }}>
        {/* WEEK VIEW */}
        {tab === "week" && !selectedDay && (
          <div>
            <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, textAlign: "center", fontFamily: T.sans }}>
              Select a day to begin
            </div>
            {DAYS.map((day, idx) => {
              const c = DAY_COLORS[idx % DAY_COLORS.length];
              const done = day.exercises.filter(e => completed.has(e.id)).length;
              const total = day.exercises.length;
              const pct = Math.round((done / total) * 100);
              // Count exercise types for this day
              const types = [...new Set(day.exercises.map(e => e.type))];
              return (
                <div key={day.num} onClick={() => setSelectedDay(day)} style={{
                  background: T.bgCard, border: `1px solid ${T.border}`,
                  padding: "18px 22px", marginBottom: 10, cursor: "pointer",
                  borderLeft: `4px solid ${c}`, boxShadow: T.sm, transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = T.md; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = T.sm; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: c, fontFamily: T.sans, marginBottom: 2 }}>
                        Day {day.num}
                      </div>
                      <div style={{ fontWeight: 400, fontSize: 22, color: T.textDark, fontFamily: T.serif }}>{day.name}</div>
                      <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{day.focus} · {day.duration}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                        {types.map(t => <TypeBadge key={t} type={t} />)}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 22, fontWeight: 700, fontFamily: T.serif,
                      color: pct === 100 ? T.success : pct > 0 ? c : T.textMuted
                    }}>
                      {pct === 100 ? "✓" : `${done}/${total}`}
                    </div>
                  </div>
                  <div style={{ height: 2, background: T.border, borderRadius: 1, marginTop: 12, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? T.success : c, borderRadius: 1, transition: "width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DAY DETAIL */}
        {tab === "week" && selectedDay && (
          <div>
            <button onClick={() => setSelectedDay(null)} style={{
              background: "none", border: "none", color: T.gold, fontSize: 13,
              fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: T.sans
            }}>← Back to week</button>
            <DayView day={selectedDay} completed={completed} onComplete={toggleComplete} metro={metro} onOpenTapMatch={setTapMatchBpm} />
          </div>
        )}

        {/* VOCAL */}
        {tab === "vocal" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.plum, fontFamily: T.sans, marginBottom: 6 }}>
                Tenor Passaggio
              </div>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Vocal Exercises</div>
              <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Break ≈ A3 · Mixed voice training · Rhythm + pitch + improv
              </div>
            </div>
            <VowelMap />
            {VOCAL_EXERCISES.map(ex => <VocalCard key={ex.id} ex={ex} />)}
          </div>
        )}

        {/* LESSON NOTES */}
        {tab === "lessons" && <LessonNotesView />}

        {/* METRONOME */}
        {tab === "metro" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Metronome</div>
            </div>
            <MetronomePanel metro={metro} onOpenTapMatch={setTapMatchBpm} />
            {/* Quick Reference */}
            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: 22, marginTop: 20, boxShadow: T.sm, borderRadius: T.radiusMd }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans }}>
                  Quick Reference
                </div>
                <button onClick={() => onOpenTapMatch(metro.bpm)} style={{
                  background: "transparent", border: "none", color: T.gold, fontSize: 11, fontWeight: 600, cursor: "pointer",
                  fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, padding: 0
                }}>
                  ✋ Tap Minigame
                </button>
              </div>
              {[
                { bpm: "78", use: "16th note subdivision (Drill #3)" },
                { bpm: "120", use: "Surf Rock — fingerpick + count + ooh climbing" },
                { bpm: "122", use: "Lyric placement + Sol Del Sur tap-along" },
                { bpm: "165", use: "Island strum (Surf Rock Drum)" },
                { bpm: "200–244", use: "Main metronome work (Drills #1 & #2)" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none", fontSize: 13 }}>
                  <span style={{ color: T.gold, fontWeight: 700, fontFamily: T.sans }}>{r.bpm}</span>
                  <span style={{ color: T.textLight, fontFamily: T.sans }}>{r.use}</span>
                </div>
              ))}
            </div>
            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, padding: 22, marginTop: 16, boxShadow: T.sm }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.textMuted, fontFamily: T.sans, marginBottom: 14 }}>
                Backing Tracks
              </div>
              {[
                { label: "Surf Rock 120 BPM", url: "youtube.com/watch?v=AEf8LF4Xu18" },
                { label: "Groove Beat 90 BPM", url: "youtube.com/watch?v=n0nEhFAiorg" },
                { label: "Surf Rock 165 BPM", url: "youtube.com/watch?v=gBNY43Xlp1Y" },
                { label: "Groove Beat 80 BPM", url: "youtube.com/watch?v=0vgOdlxSTW0" },
              ].map((l, i) => (
                <div key={i} style={{ padding: "8px 0", fontSize: 13, borderBottom: i < 3 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ color: T.gold, fontFamily: T.sans, fontWeight: 600 }}>{l.label}</span>
                  <span style={{ color: T.textMuted, marginLeft: 10, fontSize: 11, fontFamily: T.sans }}>{l.url}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOOLS */}
        {tab === "tools" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: T.gold, fontFamily: T.sans, marginBottom: 6 }}>
                Jungle Mode
              </div>
              <div style={{ fontSize: 32, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>Offline Tools</div>
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
      {metro.playing && tab !== "metro" && !tapMatchBpm && (
        <div onClick={() => setTab("metro")} style={{
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

      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
