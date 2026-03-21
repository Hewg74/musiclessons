import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import { T } from '../theme.js';

export default function RhythmCellCards({ theme: T, cells = [], bpm = 80 }) {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [localBpm, setLocalBpm] = useState(bpm);
  const [currentNoteIdx, setCurrentNoteIdx] = useState(-1);
  const [isMetroRunning, setIsMetroRunning] = useState(false);
  const [metroBeatVisual, setMetroBeatVisual] = useState(-1);
  const timeoutsRef = useRef([]);
  const synthsRef = useRef([]);
  const metroIntervalRef = useRef(null);
  const metroBeatRef = useRef(0);
  const metroStartTimeRef = useRef(null);
  const metroClickSynthRef = useRef(null);
  const activeCellRef = useRef(null); // { cell, idx, totalBeats }

  // Only clear visual timeouts — let audio nodes finish their scheduled stops naturally
  const clearVisualTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setCurrentNoteIdx(-1);
  }, []);

  // Kill everything — audio nodes + visual timeouts (for full stop)
  const killAllAudio = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    synthsRef.current.forEach(s => {
      try {
        if (s.osc) {
          s.osc.stop(); s.osc.disconnect(); s.gainNode.disconnect();
          if (s.clickOsc) { s.clickOsc.stop(); s.clickOsc.disconnect(); s.clickGain.disconnect(); }
        }
        else if (s.dispose) { s.dispose(); }
      } catch (_) {}
    });
    synthsRef.current = [];
    setCurrentNoteIdx(-1);
  }, []);

  const stopAll = useCallback(() => {
    killAllAudio();
    activeCellRef.current = null;
    setPlayingIdx(null);
    setIsMetroRunning(false);
    setMetroBeatVisual(-1);
    metroBeatRef.current = 0;
    metroStartTimeRef.current = null;
  }, [killAllAudio]);

  // Schedule a cell's pattern notes at an absolute audio-thread time
  // Schedule a cell's pattern using raw Web Audio for sample-accurate gapless playback.
  // Single oscillator runs continuously — gain automation creates articulation between notes.
  const schedulePattern = useCallback((cell, startTime) => {
    // Only clear visual timeouts — let old oscillators finish their scheduled gain ramp to 0
    // This prevents the gap between loop cycles (old osc crossfades with new osc)
    clearVisualTimeouts();
    const beatSec = 60 / localBpm;
    const beatMs = 60000 / localBpm;
    const now = Tone.now();
    const startDelayMs = Math.max(0, (startTime - now) * 1000);
    const ctx = Tone.getContext().rawContext;
    const totalDurSec = cell.pattern.reduce((a, b) => a + b, 0) * beatSec;

    // Two layers: warm tone (body) + click (attack transient)
    // Body: triangle wave — warm, not grating. The click layer provides sharpness.
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 262; // C4 — sits above drone range, easier to hear
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0, startTime);

    // Click: short tick for attack definition (woodblock-like)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.value = 800; // lower tick — less piercing
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickGain.gain.setValueAtTime(0, startTime);

    // Schedule gain automation for each note
    let offsetSec = 0;
    let offsetMs = 0;
    const vol = 0.18; // body volume
    const clickVol = 0.05; // click volume — subtle definition, not piercing
    const articSec = 0.005; // 5ms articulation dip

    cell.pattern.forEach((dur, i) => {
      const noteStart = startTime + offsetSec;
      // Body: dip → ramp up → sustain
      gainNode.gain.setValueAtTime(0.005, noteStart);
      gainNode.gain.linearRampToValueAtTime(vol, noteStart + articSec);
      // Click transient: sharp spike that decays fast (15ms)
      clickGain.gain.setValueAtTime(clickVol, noteStart);
      clickGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.015);
      // Visual highlight
      const t = setTimeout(() => setCurrentNoteIdx(i), startDelayMs + offsetMs);
      timeoutsRef.current.push(t);
      offsetSec += dur * beatSec;
      offsetMs += dur * beatMs;
    });

    // Release after last note
    const endTime = startTime + totalDurSec;
    gainNode.gain.setValueAtTime(vol, endTime);
    gainNode.gain.linearRampToValueAtTime(0, endTime + 0.05);

    // Start/stop both oscillators
    osc.start(startTime);
    osc.stop(endTime + 0.1);
    clickOsc.start(startTime);
    clickOsc.stop(endTime + 0.1);

    // Track for cleanup
    const nodeRef = { osc, gainNode, clickOsc, clickGain };
    synthsRef.current.push(nodeRef);

    // Reset visual after pattern ends
    const endTimeout = setTimeout(() => setCurrentNoteIdx(-1), startDelayMs + offsetMs + 50);
    timeoutsRef.current.push(endTimeout);

    // Cleanup after oscillators stop
    setTimeout(() => {
      try { osc.disconnect(); gainNode.disconnect(); clickOsc.disconnect(); clickGain.disconnect(); } catch {}
      synthsRef.current = synthsRef.current.filter(s => s !== nodeRef);
    }, startDelayMs + offsetMs + 2000);
  }, [localBpm, clearVisualTimeouts]);

  // Start a cell: begin metronome + quantize first pattern to next beat
  const startCell = useCallback(async (cell, idx) => {
    if (Tone.context.state !== 'running') {
      try { await Tone.start(); } catch {}
      try { await Tone.context.resume(); } catch {}
    }
    const totalBeats = cell.pattern.reduce((a, b) => a + b, 0);
    activeCellRef.current = { cell, idx, totalBeats };
    setPlayingIdx(idx);

    if (!isMetroRunning) {
      // Start fresh — metronome will play first beat + trigger pattern immediately
      setIsMetroRunning(true);
    } else {
      // Metronome already running — quantize to next beat boundary
      // Calculate the next beat time on the audio thread for precise alignment
      const beatSec = 60 / localBpm;
      const beatMs = 60000 / localBpm;
      const elapsed = performance.now() - (metroStartTimeRef.current || performance.now());
      const msIntoCurrentBeat = elapsed % beatMs;
      const msUntilNextBeat = beatMs - msIntoCurrentBeat;
      // The ideal audio-thread time for that next beat
      const nextBeatAudioTime = Tone.now() + msUntilNextBeat / 1000;
      // Schedule pattern at that exact audio time
      schedulePattern(cell, nextBeatAudioTime);
    }
  }, [isMetroRunning, localBpm, schedulePattern]);

  const handleCellTap = useCallback((cell, idx) => {
    if (activeCellRef.current?.idx === idx) {
      // Tap active cell → stop everything
      stopAll();
    } else {
      // Tap new cell → start or swap
      startCell(cell, idx);
    }
  }, [stopAll, startCell]);

  // Metronome engine — absolute-time scheduling (no drift)
  // Uses the "two clocks" pattern: setInterval for coarse timing, audio-thread for precision.
  // Even if setInterval fires late, beats land on the exact grid.
  useEffect(() => {
    if (!isMetroRunning) {
      if (metroIntervalRef.current) { clearInterval(metroIntervalRef.current); metroIntervalRef.current = null; }
      setMetroBeatVisual(-1);
      metroBeatRef.current = 0;
      metroStartTimeRef.current = null;
      return;
    }

    const beatSec = 60 / localBpm;
    const beatMs = 60000 / localBpm;
    // Absolute audio-context time of beat 0
    let nextBeatTime = Tone.now();
    metroStartTimeRef.current = performance.now();
    metroBeatRef.current = 0;

    // Create dedicated click synth
    const clickSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 }
    }).toDestination();
    clickSynth.volume.value = -10;
    metroClickSynthRef.current = clickSynth;

    const tick = () => {
      const beat = metroBeatRef.current;
      const beatInBar = beat % 4;
      setMetroBeatVisual(beatInBar);

      // Schedule click at the IDEAL beat time (not Tone.now() which may be late)
      try {
        const pitch = beatInBar === 0 ? "G5" : "C5";
        clickSynth.triggerAttackRelease(pitch, "32n", nextBeatTime);
      } catch {}

      // Re-trigger active cell pattern on its cycle boundary
      const ac = activeCellRef.current;
      if (ac) {
        const patternBeats = Math.ceil(ac.totalBeats);
        if (beat % patternBeats === 0) {
          // Pass the ideal beat time so pattern notes are grid-locked
          schedulePattern(ac.cell, nextBeatTime);
        }
      }

      // Advance to next beat — absolute, no drift accumulation
      nextBeatTime += beatSec;
      metroBeatRef.current++;
    };

    // First tick immediately
    tick();
    metroIntervalRef.current = setInterval(tick, beatMs);

    return () => {
      if (metroIntervalRef.current) { clearInterval(metroIntervalRef.current); metroIntervalRef.current = null; }
      try { clickSynth.dispose(); } catch {}
      metroClickSynthRef.current = null;
    };
  }, [isMetroRunning, localBpm, schedulePattern]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      if (metroIntervalRef.current) clearInterval(metroIntervalRef.current);
      synthsRef.current.forEach(s => { try { s.dispose(); } catch (_) {} });
      if (metroClickSynthRef.current) { try { metroClickSynthRef.current.dispose(); } catch (_) {} }
    };
  }, []);

  // Visual dot representation with beat numbers and active highlighting
  const renderPattern = (pattern, activeIdx) => {
    if (!pattern || pattern.length === 0) return null;
    const totalBeats = pattern.reduce((a, b) => a + b, 0);
    if (totalBeats === 0) return null;
    const width = 120;
    const numBeats = Math.ceil(totalBeats);
    let x = 0;
    return (
      <svg width={width} height="36" viewBox={`0 0 ${width} 36`} style={{ display: 'block' }}>
        {/* Beat grid lines */}
        {Array.from({ length: numBeats }).map((_, i) => (
          <React.Fragment key={`g${i}`}>
            <line x1={(i / totalBeats) * width} y1={0} x2={(i / totalBeats) * width} y2={24} stroke={T.border} strokeWidth={1} />
            <text x={(i / totalBeats) * width + ((1 / totalBeats) * width) / 2} y={33} textAnchor="middle" fontSize="8" fill={T.textMuted} fontFamily={T.sans}>{i + 1}</text>
          </React.Fragment>
        ))}
        {/* Pattern shapes */}
        {pattern.map((dur, i) => {
          const w = (dur / totalBeats) * width;
          const cx = x + w / 2;
          x += w;
          const isActive = activeIdx === i;
          const opacity = activeIdx >= 0 ? (isActive ? 1 : 0.4) : 0.8;
          if (dur <= 0.25) {
            return <circle key={i} cx={cx} cy={12} r={3} fill={T.gold} opacity={opacity} />;
          } else if (dur <= 0.5) {
            return <circle key={i} cx={cx} cy={12} r={4} fill={T.gold} opacity={opacity} />;
          } else {
            return <rect key={i} x={cx - w * 0.35} y={6} width={w * 0.7} height={12} rx={3} fill={T.gold} opacity={opacity} />;
          }
        })}
      </svg>
    );
  };

  const btnStyle = (active) => ({
    background: active ? T.gold : "transparent",
    border: `1px solid ${active ? T.gold : T.borderSoft}`,
    color: active ? "#fff" : T.textMed,
    borderRadius: T.radius, padding: "4px 8px", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: T.sans, minWidth: 32
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Rhythm Cells</div>

      {/* BPM adjuster row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.bgSoft, padding: "4px 6px", borderRadius: T.radius, border: `1px solid ${T.borderSoft}` }}>
          <button onClick={() => setLocalBpm(b => Math.max(40, b - 1))} style={{
            background: "transparent", border: "none", cursor: "pointer", color: T.textMed,
            width: 24, height: 24, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <div style={{ fontSize: 16, fontFamily: T.sans, color: T.textDark, fontWeight: 600, minWidth: 44, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{localBpm}</div>
          
          <button onClick={() => setLocalBpm(b => Math.min(200, b + 1))} style={{
            background: "transparent", border: "none", cursor: "pointer", color: T.textMed,
            width: 24, height: 24, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          onPointerDown={e => e.currentTarget.style.transform = "scale(0.85)"}
          onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          <button onClick={() => setLocalBpm(bpm)} style={{ 
            marginLeft: 4, fontSize: 10, background: T.goldSoft, border: "none", 
            padding: "4px 8px", borderRadius: 4, color: T.goldDark, cursor: "pointer", 
            fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: T.sans,
            transition: "all 0.2s ease"
          }}
          onPointerEnter={e => e.currentTarget.style.background = T.gold + "30"}
          onPointerLeave={e => e.currentTarget.style.background = T.goldSoft}
          >Target: {bpm}</button>
        </div>

      </div>

      {/* Beat indicator — visible when metronome is running */}
      {isMetroRunning && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: "50%",
              background: metroBeatVisual === i ? T.gold : T.borderSoft,
              transition: "background 0.08s",
              boxShadow: metroBeatVisual === i ? `0 0 8px ${T.gold}80` : "none"
            }} />
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cells.map((cell, i) => {
          const isActive = playingIdx === i;
          return (
            <div key={i} onClick={() => handleCellTap(cell, i)} style={{
              flex: "1 1 140px", maxWidth: 200, cursor: "pointer",
              background: isActive ? T.goldSoft : T.bgCard,
              border: `1px solid ${isActive ? T.gold : T.border}`,
              borderRadius: T.radiusMd || 8, padding: "14px",
              boxShadow: isActive ? `0 0 0 1px ${T.gold}40, ${T.sm}` : T.sm,
              transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              transform: isActive ? "translateY(-2px)" : "translateY(0)"
            }}
            onPointerEnter={e => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 4px 12px rgba(44, 40, 37, 0.06)`;
                e.currentTarget.style.borderColor = T.borderSoft;
              }
            }}
            onPointerLeave={e => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = T.sm;
                e.currentTarget.style.borderColor = T.border;
              }
            }}
            onPointerDown={e => {
              e.currentTarget.style.transform = "scale(0.98)";
            }}
            onPointerUp={e => {
              e.currentTarget.style.transform = isActive ? "translateY(-2px)" : "translateY(0)";
            }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? T.goldDark : T.textDark, fontFamily: T.serif, marginBottom: 4, transition: "color 0.2s" }}>{cell.name}</div>
              <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginBottom: 10, lineHeight: 1.4 }}>{cell.description}</div>
              <div style={{ marginBottom: 6 }}>
                {renderPattern(cell.pattern, isActive ? currentNoteIdx : -1)}
              </div>
              <div style={{
                fontSize: 9,
                color: isActive ? T.goldDark : T.textMuted,
                fontFamily: T.sans,
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: isActive ? 700 : 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                {isActive ? (
                  <><span style={{ width: 6, height: 6, borderRadius: "50%", background: T.goldDark, display: "inline-block", animation: "pulse-ring 2s infinite" }} /> Playing &middot; tap to stop</>
                ) : "Tap to hear"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
