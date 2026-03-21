import React, { useState, useRef } from 'react';
import { T } from '../theme.js';

export default function SilenceScore({ theme: T, target = 0.4 }) {
  const [isRecording, setIsRecording] = useState(false);
  const [silencePercent, setSilencePercent] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const samplesRef = useRef([]);
  const frameRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;
    samplesRef.current = [];
    setSilencePercent(null);
    setRecordingTime(0);
    setIsRecording(true);

    const dataArray = new Float32Array(analyser.fftSize);
    const sampleLoop = () => {
      analyser.getFloatTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i] * dataArray[i];
      const rms = Math.sqrt(sum / dataArray.length);
      samplesRef.current.push(rms);
      frameRef.current = requestAnimationFrame(sampleLoop);
    };
    sampleLoop();
    timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000);
  };

  const stopRecording = () => {
    cancelAnimationFrame(frameRef.current);
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsRecording(false);

    const samples = samplesRef.current;
    if (samples.length === 0) return;
    const threshold = 0.01; // RMS below this = silence
    const silentSamples = samples.filter(s => s < threshold).length;
    setSilencePercent(silentSamples / samples.length);
  };

  const pct = silencePercent !== null ? Math.round(silencePercent * 100) : null;
  const targetPct = Math.round(target * 100);
  const hit = pct !== null && pct >= targetPct;

  return (
    <div style={{ background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, marginBottom: 16, fontFamily: T.sans }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>
        Silence Score — Target: {targetPct}%
      </div>
      {pct !== null && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: hit ? T.gold : T.coral, lineHeight: 1 }}>{pct}%</span>
            <span style={{ fontSize: 14, color: T.textMed }}>silence</span>
            {hit && <span style={{ fontSize: 14, color: T.gold, fontWeight: 700 }}>Target hit!</span>}
          </div>
          {/* Visual bar */}
          <div style={{ position: 'relative', height: 12, background: T.bgCard, borderRadius: 6, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', height: '100%', width: `${pct}%`, background: hit ? T.gold : T.coral, borderRadius: 6, transition: 'width 0.5s ease' }} />
            <div style={{ position: 'absolute', height: '100%', width: 2, left: `${targetPct}%`, background: T.textDark, opacity: 0.5 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textLight, marginTop: 2 }}>
            <span>0% (all sound)</span>
            <span style={{ marginLeft: `${targetPct - 5}%` }}>Target</span>
            <span>100% (all silence)</span>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        {!isRecording ? (
          <button onClick={startRecording} style={{ flex: 1, padding: '10px 0', background: T.gold, color: '#fff', border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer' }}>
            {pct !== null ? 'Record Again' : 'Start Recording'}
          </button>
        ) : (
          <button onClick={stopRecording} style={{ flex: 1, padding: '10px 0', background: T.coral, color: '#fff', border: 'none', borderRadius: T.radius, fontWeight: 700, fontFamily: T.sans, fontSize: 14, cursor: 'pointer' }}>
            Stop ({recordingTime}s)
          </button>
        )}
      </div>
    </div>
  );
}
