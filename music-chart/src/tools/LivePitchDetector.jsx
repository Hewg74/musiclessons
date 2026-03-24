import React, { useState, useRef, useEffect } from 'react';
import { T } from '../theme.js';

const MIN_FREQ = 70; // ~D2 — practical singing floor
const MAX_FREQ = 1050; // ~C6
const RMS_THRESHOLD = 0.01; // -40dB silence gate (research standard)
const YIN_THRESHOLD = 0.12; // CMND dip threshold — tighter = fewer false positives
const CONFIDENCE_GATE = 0.38; // Reject frames where CMND dip > this (loosened for soft singing / head voice)

function autoCorrelate(buffer, sampleRate) {
  // YIN pitch detection with confidence output
  const W = Math.floor(buffer.length / 2);
  const maxLag = Math.min(Math.floor(sampleRate / MIN_FREQ), W - 1);
  const minLag = Math.floor(sampleRate / MAX_FREQ);

  // Difference function
  const d = new Float32Array(maxLag + 1);
  d[0] = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    let sum = 0;
    for (let n = 0; n < W - tau; n++) {
      const diff = buffer[n] - buffer[n + tau];
      sum += diff * diff;
    }
    d[tau] = sum;
  }

  // Cumulative mean normalized difference (CMND)
  const dPrime = new Float32Array(maxLag + 1);
  dPrime[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    runningSum += d[tau];
    dPrime[tau] = runningSum > 0 ? d[tau] / (runningSum / tau) : 1;
  }

  // Absolute threshold — find first dip below YIN_THRESHOLD
  let bestTau = -1;
  for (let tau = minLag; tau <= maxLag; tau++) {
    if (dPrime[tau] < YIN_THRESHOLD) {
      while (tau + 1 <= maxLag && dPrime[tau + 1] < dPrime[tau]) tau++;
      bestTau = tau;
      break;
    }
  }

  if (bestTau < 0) return null;

  // Confidence gate — CMND value at best tau indicates periodicity strength
  // Lower = more periodic = higher confidence. Reject weak detections.
  const confidence = dPrime[bestTau];
  if (confidence > CONFIDENCE_GATE) return null;

  // Parabolic interpolation for sub-sample precision
  let T0 = bestTau;
  if (bestTau > 0 && bestTau < maxLag) {
    const x1 = dPrime[bestTau - 1], x2 = dPrime[bestTau], x3 = dPrime[bestTau + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = bestTau - b / (2 * a);
  }

  const freq = sampleRate / T0;
  return (freq >= MIN_FREQ && freq <= MAX_FREQ) ? freq : null;
}

function freqToMidi(freq) {
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

function midiToNoteString(midi) {
  const notes = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'A♭', 'A', 'B♭', 'B'];
  const noteName = notes[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${noteName}${octave}`;
}

function getCentsOffset(freq, midi) {
  const targetFreq = 440 * Math.pow(2, (midi - 69) / 12);
  const cents = Math.round(1200 * Math.log2(freq / targetFreq));
  // Round to nearest 10 to reduce wobble in display
  return Math.round(cents / 10) * 10;
}

export default function LivePitchDetector({ theme: T, referencePitches = [], inline = false, pitchContour = false }) {
  const [isActive, setIsActive] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [pitchState, setPitchState] = useState({
    note: '—',
    cents: 0,
    active: false,
    closestRef: null,
    refFeedback: ''
  });
  const [contourData, setContourData] = useState([]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);
  const hpFilterRef = useRef(null);
  const requestRef = useRef(null);
  const contourRef = useRef([]);
  const contourLastUpdate = useRef(0);
  const pitchBufRef = useRef(null); // Cached Float32Array to reduce GC in hot loop
  const contourRangeRef = useRef({ min: null, max: null }); // Smoothed Y-axis range for contour

  // Smoothing state
  const emaFreqRef = useRef(null);
  const lastNoteUpdateRef = useRef(Date.now());
  const stableMidiRef = useRef(null);
  const freqBufRef = useRef([]);
  const silenceStartRef = useRef(null); // Tracks silence duration for EMA hold
  const wasSilentRef = useRef(false); // For contour gap detection (push one null sentinel)

  // Auto-pause when any <audio> element plays
  useEffect(() => {
    if (!isActive) return;

    const onPlay = () => {
      setAudioPaused(true);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    const onStop = () => {
      // Only resume if no other audio is still playing
      const audios = document.querySelectorAll('audio');
      const anyPlaying = Array.from(audios).some(a => !a.paused);
      if (!anyPlaying) {
        setAudioPaused(false);
      }
    };

    document.addEventListener('play', onPlay, true);
    document.addEventListener('pause', onStop, true);
    document.addEventListener('ended', onStop, true);
    return () => {
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('pause', onStop, true);
      document.removeEventListener('ended', onStop, true);
    };
  }, [isActive]);

  // Resume pitch detection when audio stops
  useEffect(() => {
    if (isActive && !audioPaused && analyserRef.current) {
      detectPitch();
    }
  }, [audioPaused]);

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false
        }
      });
      streamRef.current = stream;

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048; // ~43ms at 48kHz — optimal for singing (lower latency than 4096)
      analyserRef.current = analyser;

      // High-pass filter at 60Hz to reject handling noise, room rumble, wind
      const hpFilter = audioCtx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.value = 60;
      hpFilter.Q.value = 0.7071; // Butterworth Q for flat passband
      hpFilterRef.current = hpFilter;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(hpFilter);
      hpFilter.connect(analyser);
      sourceRef.current = source;

      setIsActive(true);
      emaFreqRef.current = null;
      stableMidiRef.current = null;
      lastNoteUpdateRef.current = Date.now();

      detectPitch();
    } catch (err) {
      console.error("Mic access denied or error:", err);
      alert("Could not access microphone for pitch detection. Please check permissions.");
    }
  };

  const stopDetection = () => {
    setIsActive(false);
    setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (hpFilterRef.current) hpFilterRef.current.disconnect();
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    analyserRef.current = null;
    pitchBufRef.current = null;
    contourRangeRef.current = { min: null, max: null };
  };

  useEffect(() => {
    return stopDetection; // Cleanup on unmount
  }, []);

  const detectPitch = () => {
    if (!analyserRef.current) return;

    // Cached buffer to reduce GC pressure in hot loop
    const fftSize = analyserRef.current.fftSize;
    if (!pitchBufRef.current || pitchBufRef.current.length !== fftSize) {
      pitchBufRef.current = new Float32Array(fftSize);
    }
    const buffer = pitchBufRef.current;
    analyserRef.current.getFloatTimeDomainData(buffer);

    // Calculate RMS to filter out silence
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    // Shared silence handler for both "no pitch" and "RMS silence" branches
    const handleSilence = (isFullSilence) => {
      const now = Date.now();
      // Start silence timer — only reset EMA after 300ms of continuous silence
      if (!silenceStartRef.current) silenceStartRef.current = now;
      if (now - silenceStartRef.current > 300) {
        emaFreqRef.current = null;
        stableMidiRef.current = null;
      }
      // Push one null sentinel to contour on voice→silence transition
      if (pitchContour && !wasSilentRef.current) {
        contourRef.current.push({ t: now, midi: null });
        const cutoff = now - 10000;
        contourRef.current = contourRef.current.filter(p => p.t > cutoff);
        if (!contourLastUpdate.current || now - contourLastUpdate.current > 100) {
          setContourData([...contourRef.current]);
          contourLastUpdate.current = now;
        }
      }
      wasSilentRef.current = true;
      if (isFullSilence) {
        setPitchState({ note: '—', cents: 0, active: false, closestRef: null, refFeedback: '' });
      } else {
        setPitchState(prev => ({ ...prev, active: false }));
      }
    };

    if (rms > RMS_THRESHOLD) {
      const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

      if (freq) {
        // Reset silence tracking
        silenceStartRef.current = null;
        wasSilentRef.current = false;

        // 1. Rolling median (5-sample) for outlier rejection
        freqBufRef.current.push(freq);
        if (freqBufRef.current.length > 5) freqBufRef.current.shift();
        const sorted = [...freqBufRef.current].sort((a, b) => a - b);
        const medianFreq = sorted[Math.floor(sorted.length / 2)];

        // 2. Smart-median: if raw freq deviates >1.5 semitones from median, use median
        const deviationSt = Math.abs(12 * Math.log2(freq / medianFreq));
        const cleanFreq = deviationSt > 1.5 ? medianFreq : freq;

        // 3. Octave correction — if freq is ~2x or ~0.5x the EMA, snap to correct octave
        let correctedFreq = cleanFreq;
        if (emaFreqRef.current) {
          const ratio = cleanFreq / emaFreqRef.current;
          if (ratio > 1.8 && ratio < 2.2) correctedFreq = cleanFreq / 2;
          else if (ratio > 0.45 && ratio < 0.55) correctedFreq = cleanFreq * 2;
        }

        // 4. EMA smoothing — alpha 0.28 for smoother display (less wobble, ~50ms more lag)
        const alpha = 0.28;
        const semitoneJump = emaFreqRef.current
          ? Math.abs(12 * Math.log2(correctedFreq / emaFreqRef.current))
          : Infinity;
        if (!emaFreqRef.current || semitoneJump > 3) {
          emaFreqRef.current = correctedFreq;
        } else {
          emaFreqRef.current = alpha * correctedFreq + (1 - alpha) * emaFreqRef.current;
        }

        const smoothedFreq = emaFreqRef.current;
        const midi = freqToMidi(smoothedFreq);
        const cents = getCentsOffset(smoothedFreq, midi);

        // 3. Hysteresis for Note Display — 180ms prevents flicker during slides/scoops
        const now = Date.now();
        if (midi !== stableMidiRef.current) {
          if (now - lastNoteUpdateRef.current > 180) {
            stableMidiRef.current = midi;
            lastNoteUpdateRef.current = now;
          }
        } else {
          lastNoteUpdateRef.current = now;
        }

        // Figure out closest reference pitch (if any)
        let closestRef = null;
        let refFeedback = '';
        if (referencePitches && referencePitches.length > 0) {
          const refNotesObj = [
            { n: "C", m: 0 }, { n: "C#", m: 1 }, { n: "D", m: 2 }, { n: "E♭", m: 3 }, { n: "E", m: 4 }, { n: "F", m: 5 },
            { n: "F#", m: 6 }, { n: "G", m: 7 }, { n: "A♭", m: 8 }, { n: "A", m: 9 }, { n: "B♭", m: 10 }, { n: "B", m: 11 }
          ];

          let minMidiDist = Infinity;
          let bestRefStr = null;
          let bestRefMidi = null;

          referencePitches.forEach(ref => {
            const match = ref.match(/([A-G][b♭#]?)([0-9])/);
            if (match) {
              const pClass = match[1].replace('b', '♭');
              const oct = parseInt(match[2]);
              const pobj = refNotesObj.find(x => x.n === pClass);
              if (pobj) {
                const rMidi = (oct + 1) * 12 + pobj.m;
                const dist = Math.abs(midi - rMidi);
                if (dist < minMidiDist) {
                  minMidiDist = dist;
                  bestRefStr = ref;
                  bestRefMidi = rMidi;
                }
              }
            }
          });

          if (minMidiDist === 0) {
            closestRef = bestRefStr;
            if (Math.abs(cents) <= 10) refFeedback = '✓ On target';
            else if (cents < 0) refFeedback = 'Flattening';
            else refFeedback = 'Sharpening';
          } else if (minMidiDist <= 2) {
            closestRef = bestRefStr;
            const targetMidi = bestRefMidi;
            if (midi < targetMidi) refFeedback = '↑ Go higher';
            else if (midi > targetMidi) refFeedback = '↓ Go lower';
            else refFeedback = 'Off target';
          }
        }

        const displayMidi = stableMidiRef.current || midi;
        setPitchState({
          note: midiToNoteString(displayMidi),
          cents: cents,
          active: true,
          closestRef,
          refFeedback
        });

        // Pitch contour: record data point
        if (pitchContour) {
          const now2 = Date.now();
          const midiFloat = 69 + 12 * Math.log2(smoothedFreq / 440);
          contourRef.current.push({ t: now2, midi: midiFloat });
          const cutoff = now2 - 10000;
          contourRef.current = contourRef.current.filter(p => p.t > cutoff);
          if (!contourLastUpdate.current || now2 - contourLastUpdate.current > 100) {
            setContourData([...contourRef.current]);
            contourLastUpdate.current = now2;
          }
        }
      } else {
        // No pitch found (e.g. unvoiced consonant, breathing)
        handleSilence(false);
      }
    } else {
      // Silence
      handleSilence(true);
    }

    if (analyserRef.current) {
      requestRef.current = requestAnimationFrame(detectPitch);
    }
  };

  // UI styling based on pitch accuracy
  const cents = pitchState.cents;
  const absCents = Math.abs(cents);
  let statusColor = T.textMed;
  if (pitchState.active) {
    if (absCents <= 10) statusColor = T.success;
    else if (absCents <= 25) statusColor = T.gold;
    else statusColor = T.coral;
  }

  // Gauge dot position (mapped from -50 to +50 cents to 0% to 100%)
  // Clamp value to prevent flowing off edges
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const dotPosition = `${50 + clampedCents}%`;

  const bgTint = pitchState.active ? statusColor + "05" : T.bgSoft;
  const borderTint = pitchState.active ? statusColor + "30" : T.border;

  if (!isActive) {
    return (
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: inline ? 12 : 0, marginBottom: 16 }}>
        <button
          onClick={startDetection}
          className="interactive-btn"
          style={{
            background: `linear-gradient(135deg, #fff 0%, ${T.bgSoft} 100%)`,
            border: `1px solid ${T.border}`,
            color: T.textDark, padding: inline ? "8px 20px" : "12px 28px",
            borderRadius: 40, cursor: "pointer", fontWeight: 600,
            fontFamily: T.sans, display: "inline-flex", alignItems: "center", gap: 10,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", fontSize: inline ? 13 : 14,
            boxShadow: "0 4px 12px rgba(44,40,37,0.04), inset 0 -2px 4px rgba(0,0,0,0.02)"
          }}
          onPointerDown={e => { e.currentTarget.style.transform = "translateY(2px)"; }}
          onPointerUp={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
          Live Pitch
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: `linear-gradient(135deg, ${bgTint} 0%, ${T.bgCard} 100%)`,
      border: `1px solid ${borderTint}`,
      borderRadius: T.radiusMd, padding: "20px",
      marginTop: inline ? 12 : 0, marginBottom: 16,
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      animation: "fade-in-up 0.3s ease-out forwards",
      boxShadow: pitchState.active && absCents <= 10
        ? `0 4px 20px ${T.success}18, inset 0 1px 0 rgba(255,255,255,0.5)`
        : `0 2px 12px rgba(44,40,37,0.05), inset 0 1px 0 rgba(255,255,255,0.5)`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: pitchState.active ? T.coral : T.border,
            boxShadow: pitchState.active ? `0 0 8px ${T.coral}80` : 'none',
            animation: pitchState.active ? "pulse-ring 2s infinite" : "none"
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase" }}>
            {audioPaused ? 'Paused — Audio Playing' : 'Live Pitch'}
          </span>
        </div>

        <button
          onClick={stopDetection}
          style={{
            background: "transparent", border: `1px solid ${T.borderSoft}`, color: T.textMuted,
            fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
            padding: "4px 10px", borderRadius: 20, letterSpacing: 0.5,
            transition: "all 0.15s ease"
          }}
        >
          Stop
        </button>
      </div>

      {/* Note display with circular badge */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{
          position: "relative",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 104, height: 104, borderRadius: "50%",
          background: pitchState.active
            ? `linear-gradient(135deg, ${statusColor}15 0%, ${statusColor}30 100%)`
            : T.bgSoft,
          backdropFilter: pitchState.active ? "blur(4px)" : "none",
          border: `2px solid ${pitchState.active ? 'rgba(255,255,255,0.4)' : T.borderSoft}`,
          transition: "all 0.3s ease",
          boxShadow: pitchState.active
            ? `0 0 24px ${statusColor}40, inset 0 0 16px rgba(255,255,255,0.3)`
            : "none"
        }}>
          <div style={{
            fontSize: 48, fontWeight: 500, fontFamily: T.serif,
            color: pitchState.active ? T.textDark : T.textMuted,
            lineHeight: 1, transition: "color 0.2s", zIndex: 1,
            textShadow: pitchState.active && absCents <= 10 ? `0 0 12px ${T.success}60` : "none"
          }}>
            {pitchState.note}
          </div>
        </div>
      </div>

      {/* Cents Gauge */}
      <div style={{ position: "relative", width: "100%", height: 36, marginBottom: 6, padding: "0 4px" }}>
        {/* Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.textMuted, fontFamily: T.sans, marginBottom: 6 }}>
          <span style={{ letterSpacing: 0.5 }}>♭ Flat</span>
          <span style={{
            color: absCents <= 10 && pitchState.active ? T.success : T.textMuted,
            fontWeight: 700, fontSize: 11,
            transition: "color 0.3s"
          }}>0</span>
          <span style={{ letterSpacing: 0.5 }}>Sharp ♯</span>
        </div>

        {/* Track with tick marks */}
        <div style={{ height: 6, background: `linear-gradient(90deg, ${T.coral}20 0%, ${T.success}20 45%, ${T.success}30 50%, ${T.success}20 55%, ${T.coral}20 100%)`, borderRadius: 3, position: "relative", top: 2, overflow: "visible" }}>
          {/* Tick marks at 25% intervals */}
          {[0, 25, 50, 75, 100].map(pct => (
            <div key={pct} style={{
              position: "absolute", left: `${pct}%`, top: pct === 50 ? -5 : -3,
              width: pct === 50 ? 2 : 1,
              height: pct === 50 ? 16 : 12,
              background: pct === 50 ? T.textMed : T.textMuted + '60',
              transform: "translateX(-50%)", borderRadius: 1
            }} />
          ))}

          {/* Gauge dot */}
          <div style={{
            position: "absolute",
            top: -8,
            left: dotPosition,
            width: 20, height: 20, borderRadius: "50%",
            background: pitchState.active ? statusColor : T.bgCard,
            border: pitchState.active ? `2px solid ${T.bgCard}` : `2px solid ${T.textMuted}`,
            transform: "translateX(-50%)",
            transition: "left 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease, opacity 0.3s ease, box-shadow 0.4s ease",
            opacity: pitchState.active ? 1 : 0,
            zIndex: 2,
            boxShadow: pitchState.active && absCents <= 10
              ? `0 0 12px ${T.success}50, 0 2px 4px rgba(0,0,0,0.12)`
              : "0 2px 4px rgba(0,0,0,0.12)"
          }} />
        </div>
      </div>

      <div style={{
        textAlign: "center", fontSize: 13, color: pitchState.active ? statusColor : T.textMuted,
        fontFamily: T.sans, fontWeight: 700, minHeight: 20, transition: "color 0.3s",
        letterSpacing: 0.5
      }}>
        {pitchState.active ? `${cents > 0 ? '+' : ''}${cents} ¢` : ''}
      </div>

      {/* Reference Feedback - reserved height to prevent layout shift */}
      {referencePitches && referencePitches.length > 0 && (
        <div style={{
          marginTop: 14, padding: "10px 14px", borderRadius: T.radius,
          background: pitchState.closestRef && pitchState.active ? statusColor + '08' : 'transparent',
          border: `1px solid ${pitchState.closestRef && pitchState.active ? statusColor + '18' : 'transparent'}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 13, fontFamily: T.sans, transition: "all 0.3s ease",
          opacity: pitchState.closestRef && pitchState.active ? 1 : 0
        }}>
          <span style={{ color: T.textMed }}>Target: <span style={{ color: T.textDark, fontWeight: 700 }}>{pitchState.closestRef || "—"}</span></span>
          <span style={{ color: statusColor, fontWeight: 600 }}>{pitchState.refFeedback || "—"}</span>
        </div>
      )}

      {/* Pitch Contour Graph - dynamically zoomed to active range */}
      {pitchContour && (() => {
        const W = 300, H = 180, PAD_TOP = 6, PAD_BOT = 6, PAD_L = 32, PAD_R = 6;
        const refNotesObj = [
          { n: "C", m: 0 }, { n: "C#", m: 1 }, { n: "D", m: 2 }, { n: "E♭", m: 3 }, { n: "E", m: 4 }, { n: "F", m: 5 },
          { n: "F#", m: 6 }, { n: "G", m: 7 }, { n: "A♭", m: 8 }, { n: "A", m: 9 }, { n: "B♭", m: 10 }, { n: "B", m: 11 }
        ];
        const noteNames = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
        // Parse reference pitches to MIDI values
        const refMidis = (referencePitches || []).map(ref => {
          const match = ref.match(/([A-G][b♭#]?)([0-9])/);
          if (!match) return null;
          const pClass = match[1].replace('b', '♭');
          const oct = parseInt(match[2]);
          const pobj = refNotesObj.find(x => x.n === pClass);
          if (!pobj) return null;
          return { midi: (oct + 1) * 12 + pobj.m, label: ref };
        }).filter(Boolean);

        const midiVals = contourData.filter(p => p.midi !== null).map(p => p.midi);
        const refMidiNums = refMidis.map(r => r.midi);

        // Dynamic range: zoom to where the user is actually singing
        const MIN_RANGE = 12; // At least one octave visible
        const PADDING = 3;    // Semitones padding above/below
        const SMOOTH_EXPAND = 0.15;   // Fast expansion to follow singer
        const SMOOTH_CONTRACT = 0.04; // Slow contraction for stability

        let targetMin, targetMax;
        const activeMidis = [...midiVals, ...refMidiNums];

        if (activeMidis.length === 0) {
          targetMin = 48; targetMax = 60; // Default C3-C4 before any data
        } else {
          const rawMin = Math.min(...activeMidis) - PADDING;
          const rawMax = Math.max(...activeMidis) + PADDING;
          const rawRange = rawMax - rawMin;
          if (rawRange < MIN_RANGE) {
            const center = (rawMin + rawMax) / 2;
            targetMin = center - MIN_RANGE / 2;
            targetMax = center + MIN_RANGE / 2;
          } else {
            targetMin = rawMin; targetMax = rawMax;
          }
        }

        // Smooth range with asymmetric EMA (expand fast, contract slow = stable)
        const cr = contourRangeRef.current;
        if (cr.min === null || cr.max === null) {
          cr.min = targetMin; cr.max = targetMax;
        } else {
          cr.min += (targetMin - cr.min) * (targetMin < cr.min ? SMOOTH_EXPAND : SMOOTH_CONTRACT);
          cr.max += (targetMax - cr.max) * (targetMax > cr.max ? SMOOTH_EXPAND : SMOOTH_CONTRACT);
        }

        const minM = Math.floor(cr.min);
        const maxM = Math.ceil(cr.max);
        const rangeM = maxM - minM || 1;
        const now = Date.now();
        const toY = (m) => H - PAD_BOT - ((m - minM) / rangeM) * (H - PAD_TOP - PAD_BOT);

        // Split contour into segments at silence gaps
        const segments = [];
        let currentSeg = [];
        contourData.forEach(p => {
          if (p.midi === null) {
            if (currentSeg.length > 1) segments.push(currentSeg);
            currentSeg = [];
          } else {
            const x = PAD_L + ((p.t - (now - 10000)) / 10000) * (W - PAD_L - PAD_R);
            currentSeg.push(`${x},${toY(p.midi)}`);
          }
        });
        if (currentSeg.length > 1) segments.push(currentSeg);

        // Every semitone gets a grid line + note label
        const gridLines = [];
        for (let m = minM; m <= maxM; m++) gridLines.push(m);

        return (
          <div style={{ marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, letterSpacing: 1.5, fontFamily: T.sans, textTransform: "uppercase", marginBottom: 8 }}>Pitch Contour (10s)</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{
              width: "100%", height: 200,
              background: `linear-gradient(180deg, ${T.bgSoft} 0%, ${T.bgCard} 100%)`,
              borderRadius: 8, border: `1px solid ${T.border}`,
              boxShadow: `inset 0 2px 8px rgba(0,0,0,0.06), 0 2px 6px ${T.bgSoft}`,
              overflow: "hidden"
            }}>
              {/* Semitone grid — every note labeled on Y axis */}
              {gridLines.map(m => {
                const name = noteNames[((m % 12) + 12) % 12];
                const oct = Math.floor(m / 12) - 1;
                const isC = name === "C";
                const isNatural = !name.includes("#") && !name.includes("♭");
                return (
                  <g key={`g${m}`}>
                    <line x1={PAD_L} y1={toY(m)} x2={W - PAD_R} y2={toY(m)}
                      stroke={isC ? T.textMuted + "40" : T.border} strokeWidth={isC ? "0.6" : "0.3"} />
                    <text x={PAD_L - 3} y={toY(m) + 3} textAnchor="end"
                      fontSize={isNatural ? "7" : "6"} fill={isC ? T.textDark : isNatural ? T.textMuted : T.textMuted + "80"} fontFamily={T.sans}
                      fontWeight={isC ? "700" : isNatural ? "600" : "400"}>
                      {name}{oct}
                    </text>
                  </g>
                );
              })}
              {/* Target zones & reference lines */}
              {refMidis.map((rl, i) => {
                const isTargeted = pitchState.active && pitchState.closestRef === rl.label && pitchState.cents > -35 && pitchState.cents < 35;
                const isNailed = pitchState.active && pitchState.closestRef === rl.label && pitchState.cents >= -15 && pitchState.cents <= 15;
                const hitColor = isNailed ? T.success : T.gold;
                return (
                  <g key={i}>
                    <rect x={PAD_L} y={toY(rl.midi + 0.4)} width={W - PAD_L - PAD_R}
                      height={toY(rl.midi - 0.4) - toY(rl.midi + 0.4)}
                      fill={isTargeted ? hitColor + "25" : T.success + "08"} rx="2"
                      style={{ transition: "all 0.3s ease" }} />
                    <line x1={PAD_L} y1={toY(rl.midi)} x2={W - PAD_R} y2={toY(rl.midi)}
                      stroke={isTargeted ? hitColor : T.gold} strokeWidth={isTargeted ? "2.5" : "0.5"} strokeDasharray={isTargeted ? "none" : "6,4"} opacity={isTargeted ? "0.9" : "0.4"}
                      style={{ transition: "all 0.3s ease" }} />
                    <text x={W - PAD_R - 4} y={toY(rl.midi) - 4} textAnchor="end"
                      fontSize={isTargeted ? "12" : "9"} fill={isTargeted ? hitColor : T.gold} fontFamily={T.sans} fontWeight="700" filter={isTargeted ? `drop-shadow(0 0 6px ${hitColor}50)` : "none"}
                      style={{ transition: "all 0.3s ease" }}>{rl.label}</text>
                  </g>
                );
              })}
              {/* Pitch lines — split at silence gaps */}
              {segments.map((seg, i) => (
                <polyline key={i} points={seg.join(" ")} fill="none" stroke={statusColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" filter={`drop-shadow(0 2px 6px ${statusColor}60)`} opacity={0.9} />
              ))}
            </svg>
          </div>
        );
      })()}
    </div>
  );
}
