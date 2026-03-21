import React, { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { T } from '../theme.js';

export default function VolumeMeter({ theme: T, inline = false, volumeContour = false }) {
  const [isActive, setIsActive] = useState(false);
  const [dbLevel, setDbLevel] = useState(-60);
  const [history, setHistory] = useState([]);
  const maxHistoryRef = useRef(volumeContour ? 600 : 100);
  const bufferRef = useRef(null);

  useEffect(() => { maxHistoryRef.current = volumeContour ? 600 : 100; }, [volumeContour]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const sourceRef = useRef(null);
  const requestRef = useRef(null);
  const lastHistoryUpdate = useRef(0);

  const startMeter = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
      });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
      bufferRef.current = new Float32Array(analyser.fftSize);
      setIsActive(true);
      measureVolume();
    } catch (err) {
      alert("Could not access microphone.");
    }
  };

  const measureVolume = () => {
    if (!analyserRef.current || !bufferRef.current) return;
    analyserRef.current.getFloatTimeDomainData(bufferRef.current);
    let sum = 0;
    for (let i = 0; i < bufferRef.current.length; i++) sum += bufferRef.current[i] * bufferRef.current[i];
    const rms = Math.sqrt(sum / bufferRef.current.length);
    const db = rms > 0 ? 20 * Math.log10(rms) : -60;
    const clampedDb = Math.max(-60, Math.min(0, db));
    setDbLevel(clampedDb);
    const now = performance.now();
    if (now - lastHistoryUpdate.current > 100) {
      const max = maxHistoryRef.current;
      setHistory(h => [...h.slice(-(max - 1)), clampedDb]);
      lastHistoryUpdate.current = now;
    }
    requestRef.current = requestAnimationFrame(measureVolume);
  };

  const stopMeter = () => {
    setIsActive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    analyserRef.current = null;
    setDbLevel(-60);
    setHistory([]);
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (sourceRef.current) sourceRef.current.disconnect();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  const barColor = dbLevel >= -6 ? T.coral : dbLevel >= -20 ? T.gold : T.success;
  const barWidth = ((dbLevel + 60) / 60) * 100;

  if (!isActive) {
    return (
      <div style={{
        background: T.getTint(T.gold, 0.03), border: `1px solid ${T.gold}15`,
        borderRadius: T.radius, padding: 24, marginBottom: 16,
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16
      }}>
        <div style={{ color: T.gold, opacity: 0.8 }}><Volume2 size={32} strokeWidth={1.5} /></div>
        <button
          onClick={startMeter}
          className="interactive-btn"
          style={{
            background: T.gold, color: '#fff', border: 'none',
            padding: '12px 24px',
            borderRadius: T.radius, cursor: 'pointer', fontWeight: 800,
            fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 2,
            fontSize: 10, boxShadow: T.getShadow(T.gold, 'sm')
          }}
        >
          Start Volume Meter
        </button>
      </div>
    );
  }

  const sparklinePoints = history.map((val, i) => {
    const x = history.length > 1 ? (i / (history.length - 1)) * 100 : 50;
    const y = 40 - ((val + 60) / 60) * 40;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: T.radiusMd, padding: 24, marginBottom: 16,
      boxShadow: T.sm
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20
      }}>
        <Volume2 size={24} color={barColor} />
        <div style={{
          fontSize: 32, fontWeight: 700, textAlign: 'center',
          color: barColor, fontFamily: T.sans,
          transition: 'color 0.15s ease', fontVariantNumeric: "tabular-nums"
        }}>
          {Math.round(dbLevel)} <span style={{ fontSize: 14, opacity: 0.6 }}>dB</span>
        </div>
      </div>

      <div style={{
        display: "flex", gap: 2, marginBottom: 16, height: 14,
        padding: "4px", background: "#1a1816", borderRadius: 4,
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
      }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const thresholdDb = -60 + i * 2;
          const isOn = dbLevel >= thresholdDb;
          let color = T.success;
          let glowColor = T.success;
          if (thresholdDb >= -10) { color = T.gold; glowColor = T.gold; }
          if (thresholdDb >= -4) { color = T.coral; glowColor = T.coral; }
          return (
            <div key={i} style={{
              flex: 1, height: "100%",
              background: isOn ? color : "#2c2825",
              borderRadius: 1,
              boxShadow: isOn ? `0 0 6px ${glowColor}80` : "none",
              transition: "background 0.05s ease-out, box-shadow 0.05s ease-out"
            }} />
          );
        })}
      </div>

      {!volumeContour && history.length > 1 && (
        <svg
          width="100%" height="40"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          style={{ display: 'block', marginBottom: 12 }}
        >
          <polyline
            points={sparklinePoints}
            fill="none"
            stroke={T.textMed}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {volumeContour && history.length > 1 && (() => {
        const h = history;
        const w = 600, ht = 160;
        const points = h.map((val, i) => {
          const x = (i / (maxHistoryRef.current - 1)) * w;
          const y = ht - ((val + 60) / 60) * ht;
          return `${x},${y}`;
        }).join(' ');
        const whisperY = ht - (((-40) + 60) / 60) * ht;
        const mediumY = ht - (((-20) + 60) / 60) * ht;
        const fullY = ht - (((-6) + 60) / 60) * ht;
        return (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textMuted, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Volume Contour — {Math.round(h.length / 10)}s</div>
            <svg width="100%" height={ht} viewBox={`0 0 ${w} ${ht}`} preserveAspectRatio="none" style={{ display: 'block', background: '#0001', borderRadius: 6 }}>
              <line x1="0" y1={whisperY} x2={w} y2={whisperY} stroke={T.success} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={mediumY} x2={w} y2={mediumY} stroke={T.gold} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1={fullY} x2={w} y2={fullY} stroke={T.coral} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" vectorEffect="non-scaling-stroke" />
              <polyline points={points} fill="none" stroke={T.gold} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, fontFamily: T.sans, color: T.textLight, marginTop: 4 }}>
              <span style={{ color: T.success }}>Whisper</span>
              <span style={{ color: T.gold }}>Medium</span>
              <span style={{ color: T.coral }}>Full</span>
            </div>
          </div>
        );
      })()}

      <button
        onClick={stopMeter}
        style={{
          background: 'transparent', border: `1px solid ${T.border}`,
          color: T.textMed, padding: '8px 16px',
          borderRadius: T.radius, cursor: 'pointer', fontWeight: 600,
          fontFamily: T.sans, textTransform: 'uppercase', letterSpacing: 1,
          fontSize: 12
        }}
      >
        Stop
      </button>
    </div>
  );
}
