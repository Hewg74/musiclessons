import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';
import { T } from '../theme.js';

export default function PhraseFormGuide({ theme: T, form }) {
  const [currentBar, setCurrentBar] = useState(-1);
  const [absBar, setAbsBar] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [barsOverride, setBarsOverride] = useState(null);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [currentSection, setCurrentSection] = useState(-1);
  const prevSectionAudioRef = useRef(-1);  // tracks section in audio thread (for chime)
  const prevSectionVisualRef = useRef(-1); // tracks section in visual thread (for UI)
  const chimeSynthRef = useRef(null);
  const chimeEnabledRef = useRef(true);
  const totalBarsRef = useRef(4);
  const barsArrRef = useRef([4]);

  // Bug fix: normalize form.pattern || form.sections
  const rawPattern = form.pattern || form.sections;
  const sections = rawPattern ? (Array.isArray(rawPattern) ? rawPattern : rawPattern.split('')) : [];

  const isUniformBars = !Array.isArray(form.barsPerSection);
  const defaultBars = form.barsPerSection || 4;
  const effectiveBarsPerSection = barsOverride !== null && isUniformBars ? barsOverride : defaultBars;
  const barsArr = sections.length > 0
    ? (Array.isArray(effectiveBarsPerSection) ? effectiveBarsPerSection : sections.map(() => effectiveBarsPerSection))
    : [4];
  const totalBars = barsArr.reduce((a, b) => a + b, 0);

  // Keep refs in sync for audio-thread handler
  totalBarsRef.current = totalBars;
  barsArrRef.current = barsArr;
  chimeEnabledRef.current = chimeEnabled;

  // Loop counter (derived from state, not ref)
  const loopCount = isActive && absBar >= 0 ? Math.floor(absBar / totalBars) + 1 : 0;

  // Chime synth — pre-create on mount, dispose on unmount
  useEffect(() => {
    chimeSynthRef.current = new Tone.FMSynth({
      harmonicity: 3, modulationIndex: 2,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.005, decay: 0.3, sustain: 0, release: 0.15 },
      modulation: { type: 'sine' },
      modulationEnvelope: { attack: 0.005, decay: 0.2, sustain: 0, release: 0.1 }
    }).toDestination();
    chimeSynthRef.current.volume.value = -10;
    return () => {
      if (chimeSynthRef.current) { try { chimeSynthRef.current.dispose(); } catch (_) {} chimeSynthRef.current = null; }
    };
  }, []);

  // Audio-thread chime: listens to metroBeatAudio (fires immediately from Tone.Loop,
  // carries audio `time` for sample-accurate scheduling). Works with screen off.
  useEffect(() => {
    const handleAudioBeat = (e) => {
      const { bar, time, beat } = e.detail;
      if (bar === undefined || beat !== 0) return; // only check on downbeats (beat 0)
      const tb = totalBarsRef.current;
      const ba = barsArrRef.current;
      const localBar = bar % tb;
      // Compute which section this bar falls in
      let section = -1, remaining = localBar;
      for (let i = 0; i < ba.length; i++) {
        if (remaining < ba[i]) { section = i; break; }
        remaining -= ba[i];
      }
      if (section === -1) section = ba.length - 1;
      // Fire chime on section change (skip the very first beat)
      if (section !== prevSectionAudioRef.current && prevSectionAudioRef.current !== -1 && chimeEnabledRef.current) {
        if (chimeSynthRef.current) {
          try { chimeSynthRef.current.triggerAttackRelease("E5", "8n", time); } catch (_) {}
        }
      }
      prevSectionAudioRef.current = section;
    };
    window.addEventListener('metroBeatAudio', handleAudioBeat);
    return () => window.removeEventListener('metroBeatAudio', handleAudioBeat);
  }, []); // no deps — reads everything from refs

  // Visual-thread updates: listens to metroBeat (fires via rAF for smooth UI)
  useEffect(() => {
    const handleBeat = (e) => {
      const { bar } = e.detail;
      if (bar !== undefined) {
        setAbsBar(bar);
        const localBar = bar % totalBars;
        setCurrentBar(localBar);
        setIsActive(true);
        // Compute section for visual display
        let section = -1, remaining = localBar;
        for (let i = 0; i < barsArr.length; i++) {
          if (remaining < barsArr[i]) { section = i; break; }
          remaining -= barsArr[i];
        }
        if (section === -1) section = barsArr.length - 1;
        setCurrentSection(section);
      } else {
        setIsActive(false);
        setCurrentBar(-1);
        setAbsBar(0);
        setCurrentSection(-1);
        prevSectionAudioRef.current = -1;
        prevSectionVisualRef.current = -1;
      }
    };
    window.addEventListener('metroBeat', handleBeat);
    return () => window.removeEventListener('metroBeat', handleBeat);
  }, [totalBars, barsArr]);

  // Reset tracking when totalBars changes (user changed bars-per-section)
  useEffect(() => {
    prevSectionAudioRef.current = -1;
    prevSectionVisualRef.current = -1;
  }, [totalBars]);

  // Early return after all hooks
  if (!rawPattern || sections.length === 0) return null;

  const colorPalette = [
    T.gold || "#d4a373", T.coral || "#d68383",
    T.plum || "#9e829c", T.slate || "#6b8e9f",
    "#7fb685", "#c9a96e", "#8bb8d0", "#c07eb0"
  ];
  const singleCharColors = { A: colorPalette[0], B: colorPalette[1], C: colorPalette[2], D: colorPalette[3] };

  const uniqueKeys = [...new Set(sections)];
  const colorFor = (s) => {
    if (singleCharColors[s]) return singleCharColors[s];
    const idx = uniqueKeys.indexOf(s);
    return colorPalette[idx % colorPalette.length];
  };

  const labels = form.labels || {};

  // Derive bar-within-section from currentBar (pure computation, no hooks)
  let barInSection = 0, sectionBars = 0;
  if (currentBar >= 0 && currentSection >= 0) {
    let remaining = currentBar;
    for (let i = 0; i < currentSection; i++) remaining -= barsArr[i];
    barInSection = remaining + 1;
    sectionBars = barsArr[currentSection];
  }

  // Display pattern
  const patternDisplay = Array.isArray(rawPattern) ? rawPattern.join(" \u00b7 ") : rawPattern;

  const btnStyle = (active) => ({
    background: active ? T.gold : "transparent",
    border: `1px solid ${active ? T.gold : T.borderSoft}`,
    color: active ? "#fff" : T.textMed,
    borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: T.sans, minWidth: 32
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.textDark, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5 }}>
            Phrase Form &middot; <span style={{ color: T.textMuted }}>{patternDisplay}</span>
          </div>
          {/* Chime toggle */}
          <button onClick={() => setChimeEnabled(v => !v)} style={{
            background: chimeEnabled ? T.goldSoft : T.bgSoft, 
            border: `1px solid ${chimeEnabled ? T.gold : T.borderSoft}`, 
            cursor: "pointer", 
            width: 28, height: 28, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: chimeEnabled ? T.goldDark : T.textMuted,
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }} 
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          title={chimeEnabled ? "Section chime on" : "Section chime off"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              {!chimeEnabled && <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.5" />}
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isActive && loopCount > 0 && (
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, fontFamily: T.sans }}>
              Loop {loopCount}
            </div>
          )}
          {isActive && currentSection >= 0 && (
            <div style={{ fontSize: 12, fontWeight: 700, color: colorFor(sections[currentSection]), fontFamily: T.sans }}>
              {labels[sections[currentSection]] || sections[currentSection]} &middot; Bar {barInSection}/{sectionBars}
            </div>
          )}
        </div>
      </div>

      {/* Section bar visualization */}
      <div style={{ display: "flex", gap: 3, height: 36, borderRadius: 8, overflow: "hidden", background: T.borderSoft, padding: 3 }}>
        {sections.map((s, i) => {
          const color = colorFor(s);
          const active = currentSection === i;
          const secBars = barsArr[i];
          const fillPct = active ? (barInSection / secBars) * 100 : (currentSection > i ? 100 : 0);
          
          return (
            <div key={i} style={{
              flex: secBars, position: "relative",
              background: active ? T.bgCard : fillPct === 100 ? `${color}15` : `${color}08`,
              borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: active ? `0 2px 8px ${color}30, 0 0 0 1px ${color}` : "none",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              overflow: "hidden" // keep fill constrained
            }}>
              {/* Background Fill Layer */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${fillPct}%`, 
                background: active ? `linear-gradient(90deg, ${color}20 0%, ${color}40 100%)` : `${color}25`,
                transition: "width 0.2s linear"
              }} />
              
              <span style={{
                position: "relative", fontSize: sections.length > 6 ? 10 : 12, fontWeight: 800,
                color: active ? color : fillPct === 100 ? `${color}90` : `${color}60`,
                fontFamily: T.sans, letterSpacing: 1,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%",
                textShadow: active ? `0 1px 2px ${T.bgCard}` : "none",
                transition: "color 0.2s"
              }}>{labels[s] || s}</span>
            </div>
          );
        })}
      </div>

      {/* Bars-per-section adjuster — only for uniform bar counts */}
      {isUniformBars && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1 }}>Bars / Section</div>
          <div style={{ display: "flex", gap: 6, background: T.bgSoft, padding: "4px", borderRadius: T.radiusMd, border: `1px solid ${T.borderSoft}` }}>
            {[1, 2, 4, 8].map(n => {
              const isActive = (barsOverride !== null ? barsOverride : defaultBars) === n;
              return (
                <button key={n} onClick={() => setBarsOverride(n === defaultBars ? null : n)} style={{
                  background: isActive ? T.gold : "transparent",
                  color: isActive ? "#fff" : T.textMed,
                  border: "none",
                  padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                  borderRadius: T.radius, fontFamily: T.sans, transition: "all 0.2s",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                }}
                onPointerEnter={e => { if (!isActive) e.currentTarget.style.color = T.textDark; }}
                onPointerLeave={e => { if (!isActive) e.currentTarget.style.color = T.textMed; }}
                >{n}</button>
              );
            })}
          </div>
        </div>
      )}

      {!isActive && (
        <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginTop: 6, fontStyle: "italic" }}>
          Start the metronome to sync the phrase guide
        </div>
      )}
    </div>
  );
}
