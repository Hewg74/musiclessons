/**
 * chordDetectorEngine.js
 *
 * Real-time guitar chord detection via mic input.
 * Ported from MusicLearner Phase 1 (TS → JS, dropped TempoDetector + Zustand integration).
 *
 * Pipeline (all on main thread, no AudioWorklet, no ML):
 *   getUserMedia → BiquadFilter(highpass 60Hz) → AnalyserNode (FFT 16384 @ 44.1kHz)
 *     → log-magnitude floor + 2-product HPS
 *     → triangle-weighted pitch-class binning → 12-element chroma vector
 *     → noise gate + EMA smoothing + L2 normalize
 *     → two-stage template matching (192 templates: 16 qualities × 12 roots)
 *     → confidence ratio + N-frame debounce
 *     → DetectedChord { name, root, confidence, rawScore }
 *
 * Audio context discipline:
 *   Uses createMicContext()/closeMicContext() from JungleTools (NOT shared with Tone.js).
 *   On stop, fires 'micReleased' so other audio components can recover Bluetooth quality.
 *
 * Public API:
 *   import { subscribeToChord, startEngine, stopEngine, isEngineRunning } from './chordDetectorEngine.js';
 *
 *   const unsub = subscribeToChord((update) => console.log(update.currentChord?.name));
 *   await startEngine();   // must be called from a user-gesture handler (click/touch)
 *   ...
 *   unsub();               // last unsubscribe stops the engine automatically
 */

import { createMicContext, closeMicContext } from './JungleTools.jsx';

// ─── Pitch class names ───────────────────────────────────────────────────
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// ─── Chord templates: 16 qualities × 12 roots = 192 ──────────────────────
// Triads + power chord + rootless 7ths + altered 7ths + 6/9 + rootless 9ths +
// full 7ths + 6ths + add9 + full 9ths + diminished + 7sus4.

const QUALITY_INTERVALS = {
  // Triads
  maj: [0, 4, 7],
  min: [0, 3, 7],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  // Power chord
  '5': [0, 7],
  // Rootless 3-note 7ths
  maj7no5: [0, 4, 11],
  '7no5': [0, 4, 10],
  m7no5: [0, 3, 10],
  mMaj7no5: [0, 3, 11],
  // Full 7ths
  '7': [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  mMaj7: [0, 3, 7, 11],
  // Altered 7ths
  '7b5': [0, 4, 6, 10],
  '7#5': [0, 4, 8, 10],
  '7b9': [0, 4, 7, 10, 1],
  '7#9': [0, 4, 7, 10, 3],
  // 6ths
  '6': [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  '6/9': [0, 4, 7, 9, 2],
  // add9
  add9: [0, 4, 7, 2],
  mAdd9: [0, 3, 7, 2],
  // Full 5-note 9ths
  '9': [0, 4, 7, 10, 2],
  m9: [0, 3, 7, 10, 2],
  maj9: [0, 4, 7, 11, 2],
  // Rootless 4-note 9ths
  '9no5': [0, 4, 10, 2],
  m9no5: [0, 3, 10, 2],
  maj9no5: [0, 4, 11, 2],
  // Diminished family
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  // Suspended 7th
  '7sus4': [0, 5, 7, 10],
};

const QUALITY_SUFFIX = {
  maj: '',
  min: 'm',
  sus2: 'sus2',
  sus4: 'sus4',
  dim: 'dim',
  aug: 'aug',
  '5': '5',
  maj7no5: 'maj7',
  '7no5': '7',
  m7no5: 'm7',
  mMaj7no5: 'mMaj7',
  '7': '7',
  m7: 'm7',
  maj7: 'maj7',
  mMaj7: 'mMaj7',
  '7b5': '7\u266D5',
  '7#5': '7\u266F5',
  '7b9': '7\u266D9',
  '7#9': '7\u266F9',
  '6': '6',
  m6: 'm6',
  '6/9': '6/9',
  add9: 'add9',
  mAdd9: 'm(add9)',
  '9': '9',
  m9: 'm9',
  maj9: 'maj9',
  '9no5': '9',
  m9no5: 'm9',
  maj9no5: 'maj9',
  m7b5: 'm7\u266D5',
  dim7: 'dim7',
  '7sus4': '7sus4',
};

// Distinguishing intervals an extension must show energy at to win over its triad
const EXTENSION_DISTINGUISHING_INTERVALS = {
  '7': [10],
  m7: [10],
  maj7: [11],
  mMaj7: [11],
  '6': [9],
  m6: [9],
  add9: [2],
  mAdd9: [2],
  '9': [10, 2],
  m9: [10, 2],
  maj9: [11, 2],
  m7b5: [10],
  dim7: [9],
  '7sus4': [10],
};

// First-stage candidates that win standalone (no triad-upgrade dance)
const TRIAD_QUALITIES = [
  'maj', 'min', 'sus2', 'sus4', 'dim', 'aug',
  '5',
  'maj7no5', '7no5', 'm7no5', 'mMaj7no5',
  '7b5', '7#5', '7b9', '7#9',
  '6/9',
  '9no5', 'm9no5', 'maj9no5',
];

// Extensions that upgrade a winning triad if their distinguishing notes pass the gate
const EXTENSION_QUALITIES = [
  '7', 'm7', 'maj7', 'mMaj7',
  '6', 'm6',
  'add9', 'mAdd9',
  '9', 'm9', 'maj9',
  'm7b5', 'dim7',
  '7sus4',
];

const EXTENSION_TO_TRIAD = {
  '7': 'maj',
  m7: 'min',
  maj7: 'maj',
  mMaj7: 'min',
  '6': 'maj',
  m6: 'min',
  add9: 'maj',
  mAdd9: 'min',
  '9': 'maj',
  m9: 'min',
  maj9: 'maj',
  m7b5: 'dim',
  dim7: 'dim',
  '7sus4': 'sus4',
};

const QUALITY_ORDER = [
  'maj', 'min', 'sus2', 'sus4', 'dim', 'aug',
  '5',
  'maj7no5', '7no5', 'm7no5', 'mMaj7no5',
  '7', 'm7', 'maj7', 'mMaj7',
  '7b5', '7#5', '7b9', '7#9',
  '6', 'm6', '6/9',
  'add9', 'mAdd9',
  '9no5', 'm9no5', 'maj9no5',
  '9', 'm9', 'maj9',
  '7sus4',
  'm7b5', 'dim7',
];

function l2Norm(v) {
  let sum = 0;
  for (let i = 0; i < v.length; i++) sum += v[i] * v[i];
  return Math.sqrt(sum);
}

function buildChroma(rootIdx, intervals) {
  const chroma = new Float32Array(12);
  for (const interval of intervals) {
    chroma[(rootIdx + interval) % 12] = 1.0;
  }
  return chroma;
}

const CHORD_TEMPLATES = [];
for (let rootIdx = 0; rootIdx < 12; rootIdx++) {
  const root = CHROMATIC[rootIdx];
  for (const quality of QUALITY_ORDER) {
    const chroma = buildChroma(rootIdx, QUALITY_INTERVALS[quality]);
    CHORD_TEMPLATES.push({
      name: `${root}${QUALITY_SUFFIX[quality]}`,
      root,
      quality,
      chroma,
      chromaNorm: l2Norm(chroma),
    });
  }
}

// ─── ChordDetector ───────────────────────────────────────────────────────

const PC_INDEX = {
  C: 0, 'C#': 1, Db: 1,
  D: 2, 'D#': 3, Eb: 3,
  E: 4,
  F: 5, 'F#': 6, Gb: 6,
  G: 7, 'G#': 8, Ab: 8,
  A: 9, 'A#': 10, Bb: 10,
  B: 11,
};

const DETECTOR_DEFAULTS = {
  fftSize: 16384,
  silenceThresholdDb: -70,
  emaAlpha: 0.35,
  minRawScore: 0.55,
  minConfidenceRatio: 1.07,
  debounceFrames: 3,
  referenceFreq: 440,
  hpsStrength: 0.4,
  extensionThreshold: 0.55,
};

class ChordDetector {
  constructor(options) {
    this.opts = { ...DETECTOR_DEFAULTS, ...options };
    this.analyser = null;
    this.freqBuffer = new Float32Array(this.opts.fftSize / 2);
    this.chromaSmoothed = new Float32Array(12);
    this.hasEmaInit = false;
    this.binToPcContinuous = new Float32Array(this.opts.fftSize / 2);
    this.binWeight = new Float32Array(this.opts.fftSize / 2);
    this.precomputeBinMapping();
    this.triadTemplates = CHORD_TEMPLATES.filter((t) => TRIAD_QUALITIES.includes(t.quality));
    this.extensionByRoot = new Map();
    for (const t of CHORD_TEMPLATES) {
      if (!EXTENSION_QUALITIES.includes(t.quality)) continue;
      const list = this.extensionByRoot.get(t.root) || [];
      list.push(t);
      this.extensionByRoot.set(t.root, list);
    }
    this.pendingChord = null;
    this.pendingFrames = 0;
    this.currentChord = null;
    this.chromaRaw = new Float32Array(12);
    this.chroma = new Float32Array(12);
    this.lastSignalDb = -Infinity;
    this.lastBestScore = 0;
    this.lastBestChord = null;
    this.lastRatio = 0;
  }

  precomputeBinMapping() {
    const binCount = this.opts.fftSize / 2;
    const binHz = this.opts.sampleRate / this.opts.fftSize;
    for (let i = 0; i < binCount; i++) {
      const freq = i * binHz;
      if (freq < 75 || freq > 3500) {
        this.binToPcContinuous[i] = -1;
        this.binWeight[i] = 0;
        continue;
      }
      const midi = 12 * Math.log2(freq / this.opts.referenceFreq) + 69;
      const pcCont = ((midi % 12) + 12) % 12;
      this.binToPcContinuous[i] = pcCont;
      // Bell-curve bin weighting tuned for guitar fundamentals (200-800Hz)
      let weight = 1.0;
      if (freq < 200) weight = 0.5 + (freq - 75) / 250;
      else if (freq > 800 && freq <= 2000) weight = 0.9 - (freq - 800) / 4000;
      else if (freq > 2000) weight = Math.max(0.2, 0.6 - (freq - 2000) / 3000);
      this.binWeight[i] = weight;
    }
  }

  setAnalyser(analyser) {
    analyser.fftSize = this.opts.fftSize;
    analyser.smoothingTimeConstant = 0;
    this.analyser = analyser;
  }

  reset() {
    this.chromaSmoothed.fill(0);
    this.hasEmaInit = false;
    this.pendingChord = null;
    this.pendingFrames = 0;
    this.currentChord = null;
  }

  detect() {
    if (!this.analyser) return null;
    this.analyser.getFloatFrequencyData(this.freqBuffer);
    const binCount = this.freqBuffer.length;

    // Step 1: peak signal dB across guitar bins for noise gate
    let peakDb = -Infinity;
    for (let i = 0; i < binCount; i++) {
      if (this.binWeight[i] > 0 && this.freqBuffer[i] > peakDb) {
        peakDb = this.freqBuffer[i];
      }
    }
    this.lastSignalDb = peakDb;

    if (peakDb < this.opts.silenceThresholdDb) {
      for (let pc = 0; pc < 12; pc++) this.chromaSmoothed[pc] *= 0.85;
      this.pendingChord = null;
      this.pendingFrames = 0;
      this.lastBestScore = 0;
      this.lastBestChord = null;
      this.lastRatio = 0;
      if (this.currentChord && peakDb < this.opts.silenceThresholdDb - 10) {
        this.currentChord = null;
      }
      return this.currentChord;
    }

    // Step 2: build chroma with HPS-boosted log-magnitude + triangle binning
    this.chromaRaw.fill(0);
    const floorDb = this.opts.silenceThresholdDb;
    const hps = this.opts.hpsStrength;

    for (let i = 0; i < binCount; i++) {
      const pcCont = this.binToPcContinuous[i];
      if (pcCont < 0) continue;
      const db = this.freqBuffer[i];
      if (db < floorDb) continue;

      let mag = (db - floorDb) * this.binWeight[i];

      if (hps > 0) {
        const harm = 2 * i;
        if (harm < binCount && this.binWeight[harm] > 0) {
          const harmDb = this.freqBuffer[harm];
          if (harmDb > floorDb) {
            mag += hps * (harmDb - floorDb) * this.binWeight[harm];
          }
        }
      }

      const pcLow = Math.floor(pcCont) % 12;
      const pcHigh = (pcLow + 1) % 12;
      const fracHigh = pcCont - Math.floor(pcCont);
      const fracLow = 1 - fracHigh;
      this.chromaRaw[pcLow] += mag * fracLow;
      this.chromaRaw[pcHigh] += mag * fracHigh;
    }

    // Step 3: EMA smoothing
    const alpha = this.opts.emaAlpha;
    if (!this.hasEmaInit) {
      for (let pc = 0; pc < 12; pc++) this.chromaSmoothed[pc] = this.chromaRaw[pc];
      this.hasEmaInit = true;
    } else {
      for (let pc = 0; pc < 12; pc++) {
        this.chromaSmoothed[pc] =
          alpha * this.chromaRaw[pc] + (1 - alpha) * this.chromaSmoothed[pc];
      }
    }

    // Step 4: L2 normalize
    let norm = 0;
    for (let pc = 0; pc < 12; pc++) norm += this.chromaSmoothed[pc] * this.chromaSmoothed[pc];
    norm = Math.sqrt(norm);
    if (norm < 1e-6) return this.currentChord;
    for (let pc = 0; pc < 12; pc++) this.chroma[pc] = this.chromaSmoothed[pc] / norm;

    // Step 5a: triad-only first pass
    let bestTriad = null;
    let bestTriadScore = -Infinity;
    const triadScores = [];
    for (const t of this.triadTemplates) {
      const score = this.scoreTemplate(t);
      triadScores.push(score);
      if (score > bestTriadScore) {
        bestTriadScore = score;
        bestTriad = t;
      }
    }
    if (!bestTriad) return this.currentChord;

    let secondDifferentRootScore = -Infinity;
    for (let i = 0; i < this.triadTemplates.length; i++) {
      const t = this.triadTemplates[i];
      if (t.root !== bestTriad.root && triadScores[i] > secondDifferentRootScore) {
        secondDifferentRootScore = triadScores[i];
      }
    }

    // Step 5b: extension upgrade if distinguishing tones pass the gate
    let chosen = bestTriad;
    let chosenScore = bestTriadScore;
    const extCandidates = this.extensionByRoot.get(bestTriad.root) || [];
    const rootEnergy = this.chroma[PC_INDEX[bestTriad.root]];
    if (rootEnergy > 0) {
      for (const ext of extCandidates) {
        if (EXTENSION_TO_TRIAD[ext.quality] !== bestTriad.quality) continue;
        const distIntervals = EXTENSION_DISTINGUISHING_INTERVALS[ext.quality];
        if (!distIntervals) continue;
        const rootPc = PC_INDEX[ext.root];
        let allPass = true;
        for (const interval of distIntervals) {
          const extEnergy = this.chroma[(rootPc + interval) % 12];
          if (extEnergy / rootEnergy < this.opts.extensionThreshold) {
            allPass = false;
            break;
          }
        }
        if (!allPass) continue;
        const score = this.scoreTemplate(ext);
        if (score > chosenScore) {
          chosen = ext;
          chosenScore = score;
        }
      }
    }

    const ratio = secondDifferentRootScore > 0 ? chosenScore / secondDifferentRootScore : 999;
    this.lastBestScore = chosenScore;
    this.lastBestChord = chosen.name;
    this.lastRatio = ratio;

    if (chosenScore < this.opts.minRawScore || ratio < this.opts.minConfidenceRatio) {
      this.pendingFrames = Math.max(0, this.pendingFrames - 1);
      return this.currentChord;
    }

    // Step 6: debounce
    if (this.pendingChord === chosen.name) {
      this.pendingFrames++;
      if (this.pendingFrames >= this.opts.debounceFrames) {
        const scoreComp = Math.max(0, Math.min(1, (chosenScore - 0.55) / 0.35));
        const ratioComp = Math.max(0, Math.min(1, (ratio - 1.0) / 0.20));
        this.currentChord = {
          name: chosen.name,
          root: chosen.root,
          confidence: (scoreComp + ratioComp) / 2,
          rawScore: chosenScore,
        };
      }
    } else {
      this.pendingChord = chosen.name;
      this.pendingFrames = 1;
    }

    return this.currentChord;
  }

  scoreTemplate(t) {
    let score = 0;
    for (let pc = 0; pc < 12; pc++) score += this.chroma[pc] * t.chroma[pc];
    return score / t.chromaNorm;
  }
}

// ─── AudioEngine ─────────────────────────────────────────────────────────
// Owns one mic AudioContext (separate from Tone.js). Wires:
//   MicStream → HighPassFilter(60Hz) → AnalyserNode → ChordDetector
//                                    → MediaStreamDestination (recorder tap)
// On stop, fires 'micReleased' so Tone.js drone/playback recovers Bluetooth quality.

const UI_PUSH_INTERVAL_MS = 66; // ~15Hz

class AudioEngine {
  constructor(opts) {
    this.opts = opts;
    this.ctx = null;
    this.stream = null;
    this.source = null;
    this.hpFilter = null;
    this.analyser = null;
    this.recorderDestination = null;
    this.chordDetector = null;
    this.rafHandle = null;
    this.timeBuffer = null;
    this.status = 'idle';
    this.lastUpdatePush = 0;
    this._visibilityHandler = null;
  }

  get isRunning() { return this.status === 'running'; }
  get currentStatus() { return this.status; }

  setStatus(s) {
    if (this.status === s) return;
    this.status = s;
    if (this.opts.onStatusChange) this.opts.onStatusChange(s);
  }

  /** Must be called from a user-gesture handler (click/touch). */
  async start() {
    if (this.status === 'starting' || this.status === 'running') {
      console.warn('[ChordEngine] start() called while', this.status);
      return;
    }
    if (this.status === 'error') this.status = 'idle';
    this.setStatus('starting');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access requires HTTPS or localhost (getUserMedia unavailable)');
      }
      this.ctx = createMicContext();
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      this.source = this.ctx.createMediaStreamSource(this.stream);
      this.hpFilter = this.ctx.createBiquadFilter();
      this.hpFilter.type = 'highpass';
      this.hpFilter.frequency.value = 60;
      this.hpFilter.Q.value = 0.7071;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 16384;
      this.analyser.smoothingTimeConstant = 0;
      this.source.connect(this.hpFilter);
      this.hpFilter.connect(this.analyser);
      this.recorderDestination = this.ctx.createMediaStreamDestination();
      this.hpFilter.connect(this.recorderDestination);
      this.timeBuffer = new Float32Array(this.analyser.fftSize);
      this.chordDetector = new ChordDetector({ fftSize: 16384, sampleRate: this.ctx.sampleRate });
      this.chordDetector.setAnalyser(this.analyser);

      // Visibility recovery: if the page goes to background and comes back, resume context
      this._visibilityHandler = async () => {
        if (document.visibilityState === 'visible' && this.ctx && this.ctx.state === 'suspended') {
          try { await this.ctx.resume(); } catch { /* ignore — context may be torn down */ }
        }
      };
      document.addEventListener('visibilitychange', this._visibilityHandler);

      this.setStatus('running');
      this.pushUpdate({
        isListening: true,
        currentChord: null,
        signalLevel: 0,
        signalDb: -Infinity,
      });
      this.runLoop();
      console.info(`[ChordEngine] Started. Sample rate ${this.ctx.sampleRate}Hz`);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('[ChordEngine] Failed to start:', error);
      if (this.opts.onError) this.opts.onError(error);
      this.setStatus('error');
      await this.stop(true);
    }
  }

  async stop(fromError = false) {
    if (this.status === 'idle' || this.status === 'stopping') return;
    const wasRunning = this.status === 'running';
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    if (this._visibilityHandler) {
      document.removeEventListener('visibilitychange', this._visibilityHandler);
      this._visibilityHandler = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    try {
      this.source && this.source.disconnect();
      this.hpFilter && this.hpFilter.disconnect();
      this.analyser && this.analyser.disconnect();
      this.recorderDestination && this.recorderDestination.disconnect();
    } catch {
      // nodes may already be disconnected
    }
    this.source = null;
    this.hpFilter = null;
    this.analyser = null;
    this.recorderDestination = null;
    this.chordDetector = null;
    this.timeBuffer = null;

    // Use Sarah's closeMicContext so 'micReleased' fires and Bluetooth quality recovers
    if (this.ctx && this.ctx.state !== 'closed') {
      closeMicContext(this.ctx);
    }
    this.ctx = null;

    if (!fromError) this.setStatus('idle');
    this.pushUpdate({
      isListening: false,
      currentChord: null,
      signalLevel: 0,
      signalDb: -Infinity,
    });
    if (wasRunning) console.info('[ChordEngine] Stopped');
  }

  getRecorderStream() {
    return this.recorderDestination ? this.recorderDestination.stream : null;
  }

  getDebugSnapshot() {
    return this.chordDetector ? {
      lastSignalDb: this.chordDetector.lastSignalDb,
      lastBestScore: this.chordDetector.lastBestScore,
      lastBestChord: this.chordDetector.lastBestChord,
      lastRatio: this.chordDetector.lastRatio,
    } : null;
  }

  runLoop = () => {
    if (this.status !== 'running' || !this.analyser || !this.chordDetector || !this.timeBuffer || !this.ctx) {
      return;
    }
    this.analyser.getFloatTimeDomainData(this.timeBuffer);
    let sumSq = 0;
    for (let i = 0; i < this.timeBuffer.length; i++) {
      sumSq += this.timeBuffer[i] * this.timeBuffer[i];
    }
    const rms = Math.sqrt(sumSq / this.timeBuffer.length);
    const signalDb = rms > 1e-7 ? 20 * Math.log10(rms) : -Infinity;
    const signalLevel = Math.max(0, Math.min(1, (signalDb + 60) / 50));
    const chord = this.chordDetector.detect();

    const now = performance.now();
    if (now - this.lastUpdatePush >= UI_PUSH_INTERVAL_MS) {
      this.lastUpdatePush = now;
      this.pushUpdate({
        isListening: true,
        currentChord: chord,
        signalLevel,
        signalDb,
      });
    }
    this.rafHandle = requestAnimationFrame(this.runLoop);
  };

  pushUpdate(update) {
    if (this.opts.onUpdate) this.opts.onUpdate(update);
  }
}

// ─── Singleton + subscribe API ───────────────────────────────────────────
// Single engine instance shared by all consumers (Tools tab, ExerciseCard, PracticeForge).
// Subscriber refcount: first subscriber starts the engine, last unsubscribe stops it.
// IMPORTANT: startEngine() must originate from a user-gesture handler. The first
// subscriber call from inside a click handler may auto-start; subscriptions added
// later just attach without restarting.

let engineInstance = null;
const subscribers = new Set();
let lastUpdate = {
  isListening: false,
  currentChord: null,
  signalLevel: 0,
  signalDb: -Infinity,
};

function getEngine() {
  if (!engineInstance) {
    engineInstance = new AudioEngine({
      onUpdate: (update) => {
        lastUpdate = update;
        for (const cb of subscribers) {
          try { cb(update); } catch (e) { console.error('[ChordEngine] subscriber error:', e); }
        }
        if (update.currentChord) {
          window.dispatchEvent(new CustomEvent('chordDetected', { detail: update.currentChord }));
        }
      },
      onError: (err) => {
        for (const cb of subscribers) {
          try { cb({ ...lastUpdate, error: err }); } catch { /* subscriber threw — swallow */ }
        }
      },
    });
  }
  return engineInstance;
}

/** Subscribe to chord detection updates. Returns unsubscribe function.
 * Engine must be started separately via startEngine() from a user gesture. */
export function subscribeToChord(callback) {
  subscribers.add(callback);
  // Replay last known state immediately so new subscribers don't see stale UI
  try { callback(lastUpdate); } catch { /* subscriber threw on replay — swallow */ }
  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0 && engineInstance && engineInstance.isRunning) {
      engineInstance.stop();
    }
  };
}

// Replay the last update synchronously to a new subscriber so they don't see stale UI

/** Start the mic + detection. Must be called from a user-gesture handler. */
export async function startEngine() {
  const engine = getEngine();
  await engine.start();
}

/** Stop the mic + detection. */
export async function stopEngine() {
  if (engineInstance && engineInstance.isRunning) {
    await engineInstance.stop();
  }
}

export function isEngineRunning() {
  return engineInstance ? engineInstance.isRunning : false;
}

export function getEngineStatus() {
  return engineInstance ? engineInstance.currentStatus : 'idle';
}

export function getRecorderStream() {
  return engineInstance ? engineInstance.getRecorderStream() : null;
}

export function getDebugSnapshot() {
  return engineInstance ? engineInstance.getDebugSnapshot() : null;
}

// Exported for advanced consumers / tests
export { ChordDetector, AudioEngine, CHORD_TEMPLATES, CHROMATIC, PC_INDEX };
