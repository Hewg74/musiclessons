import React, { useState, useRef, useEffect } from 'react';
import { T } from '../theme.js';
import { MiniAudioPlayer } from './BackingTrackPlayer.jsx';

// Convert a blob URL (webm/ogg) to WAV and trigger download
async function downloadAsWav(blobUrl, filename) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length * numChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);
    const writeStr = (offset, str) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };
    writeStr(0, "RIFF");
    view.setUint32(4, 36 + length, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, "data");
    view.setUint32(40, length, true);
    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    const wavBlob = new Blob([buffer], { type: "audio/wav" });
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    audioCtx.close();
  } catch (e) {
    console.error("WAV export failed:", e);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename.replace(".wav", ".webm");
    a.click();
  }
}

export default function AudioRecorder({ theme: T, inline = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Viz refs
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const requestRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, autoGainControl: false, noiseSuppression: false }
      });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach(t => t.stop()); // release mic
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioURL(null); // clear previous

      // Setup audio visualization
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const drawWaveform = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;

        const ctx = canvas.getContext("2d");

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = T.coral;
        ctx.beginPath();

        const sliceWidth = width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * height / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        requestRef.current = requestAnimationFrame(drawWaveform);
      };

      // Start drawing immediately
      drawWaveform();

    } catch (e) {
      console.error('Microphone access denied', e);
      alert('Microphone access denied. Please allow mic permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(console.error);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(console.error);
      }
    };
  }, []);

  return (
    <div style={inline ? { background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16 } : {}}>
      {!inline && <p style={{ fontSize: 13, color: T.textMed, marginBottom: 16 }}>
        Record yourself and listen back immediately. (Saved temporarily in memory).
      </p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: inline ? 8 : 16 }}>
        {/* Left: REC/STOP + Save buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {!isRecording ? (
            <button onClick={startRecording} style={{
              background: T.coral, color: '#fff', border: 'none', padding: inline ? '8px 16px' : '12px 24px',
              borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: inline ? 12 : 14, transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              <div style={{ width: inline ? 8 : 10, height: inline ? 8 : 10, borderRadius: '50%', background: '#fff' }} />
              REC
            </button>
          ) : (
            <button onClick={stopRecording} style={{
              background: "rgba(214, 131, 131, 0.15)", color: T.coral, border: `1px solid ${T.coral}`, padding: inline ? '8px 16px' : '12px 24px',
              borderRadius: T.radius, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: inline ? 12 : 14, transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
              <div style={{
                width: inline ? 10 : 12, height: inline ? 10 : 12, background: T.coral, borderRadius: "50%",
                boxShadow: `0 0 0 4px rgba(214, 131, 131, 0.2), 0 0 0 8px rgba(214, 131, 131, 0.1)`,
                animation: 'pulse-ring 2s infinite cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
              STOP
            </button>
          )}
          {audioURL && !isRecording && (
            <button onClick={() => downloadAsWav(audioURL, `recording-${new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-")}.wav`)} style={{
              fontSize: inline ? 9 : 10, padding: inline ? "6px 10px" : "8px 14px", borderRadius: T.radius, cursor: "pointer",
              fontWeight: 700, fontFamily: T.sans, textTransform: "uppercase", letterSpacing: 0.5,
              background: "transparent", color: T.textMed, border: `1px solid ${T.border}`,
              whiteSpace: "nowrap",
            }}>Save</button>
          )}
        </div>

        {/* Right: waveform or playback */}
        <div style={{ display: isRecording ? 'block' : 'none', flex: 1, height: inline ? 30 : 40 }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>

        {audioURL && !isRecording && (
          <div style={{ flex: 1 }}>
            <MiniAudioPlayer theme={T} src={audioURL} />
          </div>
        )}
      </div>
    </div>
  );
}
