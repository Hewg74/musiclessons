import React, { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";
import { Pause, Play } from 'lucide-react';
import { T, ACCENT_CONFIG } from '../theme.js';
import { acquireKeepalive, releaseKeepalive, setMediaSession, clearMediaSession } from '../audioKeepalive.js';

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
export function useMetronome() {
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

export function useTimer(mins) {
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

export function TimerRing({ pct, fmt, size = 50, textSize = 11 }) {
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
          {done ? "\u2713" : fmt}
        </div>
      </div>
    </div>
  );
}

export function BeatDots({ beat: externalBeat, playing, compact, beatConfig, beatsPerBar }) {
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

export function MetronomePanel({ metro, onOpenTapMatch }) {
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
              Tap
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
                  \u21a9 Loops back to {metro.bpm} BPM after reaching {metro.speedCeiling}
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
            Tap accent to cycle \u00b7 Tap sound to change
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
                  {i === 0 ? "\u25bc" : (i + 1)}
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
export function CompactMetronomeControls({ metro, theme: T }) {
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
                  \u21a9 Loops back to {metro.bpm} BPM after reaching {metro.speedCeiling}
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

export function TapMatchModal({ targetBpm, onClose, metro }) {
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

export function FloatingMetronome({ metro, setTab, isDark, theme: T }) {
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

export { SOUND_KITS, ACCENT_LEVELS };
