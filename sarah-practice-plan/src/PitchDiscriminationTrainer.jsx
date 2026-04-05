import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import * as Tone from 'tone';
import {
  ArrowLeft, ArrowUp, ArrowDown, Check, X, Ear,
  TrendingUp, Headphones, Minus, Clock, Zap
} from 'lucide-react';

// ─── Hooks ───
function useIsMobile(bp = 640) {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const h = (e) => setMobile(e.matches);
    mq.addEventListener('change', h); setMobile(mq.matches);
    return () => mq.removeEventListener('change', h);
  }, [bp]);
  return mobile;
}

// ─── Constants ───
const CHROMATIC = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Reference note range: A3–A5 (220–880 Hz) — psychoacoustic sweet spot
const NOTE_POOL = [];
for (let oct = 3; oct <= 5; oct++) {
  for (const n of CHROMATIC) {
    const midi = CHROMATIC.indexOf(n) + (oct + 1) * 12;
    if (midi >= 57 && midi <= 81) NOTE_POOL.push(`${n}${oct}`); // A3 to A5
  }
}

const DIFFICULTIES = {
  beginner:     { label: 'Beginner',     min: 25, max: 50, desc: 'Quarter-tone territory' },
  intermediate: { label: 'Intermediate', min: 10, max: 25, desc: 'Trained ear range' },
  advanced:     { label: 'Advanced',     min: 3,  max: 10, desc: 'Pro intonation' },
  expert:       { label: 'Expert',       min: 1,  max: 3,  desc: 'Near human limit' },
  adaptive:     { label: 'Adaptive',     min: 1,  max: 50, desc: 'Finds your threshold' },
};

const TIMBRES = {
  pure:    { label: 'Pure',    desc: 'Clean sine — easiest',    icon: '◯' },
  warm:    { label: 'Warm',    desc: 'Triangle — richer',       icon: '△' },
  natural: { label: 'Natural', desc: 'Layered — most realistic', icon: '♫' },
};

const MODES = {
  sharpFlat:        { label: 'Sharp / Flat',     desc: 'Is the second note higher or lower?' },
  withUnison:       { label: 'With Unison',      desc: 'Sometimes they\'re the same pitch' },
  thresholdFinder:  { label: 'Threshold Finder', desc: 'Find your smallest detectable difference' },
};

const ROUND_OPTIONS = [15, 30, 50, 0]; // 0 = unlimited
const ROUND_LABELS = { 15: '15', 30: '30', 50: '50', 0: '∞' };

const BANDS = [
  { key: '1-3',   label: '1–3¢',   min: 1,  max: 3 },
  { key: '3-10',  label: '3–10¢',  min: 3,  max: 10 },
  { key: '10-25', label: '10–25¢', min: 10, max: 25 },
  { key: '25-50', label: '25–50¢', min: 25, max: 50 },
];

// ─── Cents Math (fresh — no rounding like getCentsOffset) ───
function centsToFreqRatio(cents) {
  return Math.pow(2, cents / 1200);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickNote() {
  return NOTE_POOL[Math.floor(Math.random() * NOTE_POOL.length)];
}

function getBandKey(cents) {
  const abs = Math.abs(cents);
  for (const b of BANDS) {
    if (abs >= b.min && abs <= b.max) return b.key;
  }
  return abs > 50 ? '25-50' : '1-3';
}

// ─── Audio Engine ───
// Chain and active nodes are managed per-component-instance via refs (see component body).
// These helpers accept the chain/activeNodes as parameters to avoid module-level singletons.

const UNISON_PROBABILITY = 0.2;

function createAudioChain() {
  const filter = new Tone.Filter({ frequency: 2500, type: 'lowpass', rolloff: -12 });
  const reverb = new Tone.Reverb({ decay: 1.8, wet: 0.18 });
  const master = new Tone.Gain(-10, 'decibels');
  filter.connect(reverb);
  reverb.connect(master);
  master.toDestination();
  return { filter, reverb, master, disposed: false };
}

function disposeAudioChain(chain, activeNodes) {
  if (!chain || chain.disposed) return;
  chain.disposed = true;
  // Immediately dispose any in-flight oscillators/envelopes
  if (activeNodes) {
    for (const node of activeNodes) {
      try { node.stop?.(); } catch {}
      try { node.dispose(); } catch {}
    }
    activeNodes.clear();
  }
  try { chain.filter.dispose(); } catch {}
  try { chain.reverb.dispose(); } catch {}
  try { chain.master.dispose(); } catch {}
}

async function playTone(freq, timbre, durationSec, chain, activeNodes) {
  if (!chain || chain.disposed) return;
  if (Tone.context.state !== 'running') await Tone.context.resume();

  // Adjust filter per timbre
  const filterFreqs = { pure: 3000, warm: 1500, natural: 2000 };
  chain.filter.frequency.value = filterFreqs[timbre] || 2500;
  const reverbWets = { pure: 0.15, warm: 0.20, natural: 0.25 };
  chain.reverb.wet.value = reverbWets[timbre] || 0.18;

  const env = new Tone.AmplitudeEnvelope({
    attack: 0.08, decay: 0.15, sustain: 0.75, release: 0.4,
  });
  env.connect(chain.filter);
  activeNodes.add(env);

  const oscs = [];

  if (timbre === 'pure') {
    const osc = new Tone.Oscillator(freq, 'sine');
    osc.connect(env); oscs.push(osc);
  } else if (timbre === 'warm') {
    const osc1 = new Tone.Oscillator(freq, 'triangle');
    osc1.connect(env); oscs.push(osc1);
    const osc2 = new Tone.Oscillator(freq * centsToFreqRatio(2), 'sine');
    const g2 = new Tone.Gain(-18, 'decibels');
    osc2.connect(g2); g2.connect(env);
    oscs.push(osc2); activeNodes.add(g2);
  } else {
    const osc1 = new Tone.Oscillator(freq, 'sine');
    osc1.connect(env); oscs.push(osc1);
    const osc2 = new Tone.Oscillator(freq * 2, 'sine');
    const g2 = new Tone.Gain(-12, 'decibels');
    osc2.connect(g2); g2.connect(env);
    oscs.push(osc2); activeNodes.add(g2);
  }

  oscs.forEach(o => { activeNodes.add(o); o.start(); });
  env.triggerAttack();

  return new Promise(resolve => {
    setTimeout(() => {
      if (chain.disposed) { resolve(); return; }
      env.triggerRelease();
      setTimeout(() => {
        oscs.forEach(o => { try { o.stop(); o.dispose(); } catch {} activeNodes.delete(o); });
        try { env.dispose(); } catch {}
        activeNodes.delete(env);
        resolve();
      }, 500);
    }, durationSec * 1000);
  });
}

// ─── Stats Persistence ───
const STATS_KEY = 'pitch-discrimination-stats';

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STATS_KEY) || 'null') || defaultStats();
  } catch { return defaultStats(); }
}

function defaultStats() {
  return {
    bestThreshold: null,
    sessions: [],
    totalRounds: 0,
    totalCorrect: 0,
    totalSessions: 0,
    sharpTotal: 0,
    sharpCorrect: 0,
    flatTotal: 0,
    flatCorrect: 0,
    lastSession: null,
  };
}

function saveStats(stats) {
  try {
    // Cap sessions at 50
    if (stats.sessions.length > 50) stats.sessions = stats.sessions.slice(-50);
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {}
}

function computeSessionSummary(rounds) {
  if (rounds.length === 0) return null;
  const total = rounds.length;
  const correct = rounds.filter(r => r.correct).length;
  const accuracy = correct / total;

  const sharpRounds = rounds.filter(r => r.direction === 'sharp');
  const flatRounds = rounds.filter(r => r.direction === 'flat');
  const sameRounds = rounds.filter(r => r.direction === 'same');
  const sharpCorrect = sharpRounds.filter(r => r.correct).length;
  const flatCorrect = flatRounds.filter(r => r.correct).length;
  const sharpAccuracy = sharpRounds.length > 0 ? sharpCorrect / sharpRounds.length : null;
  const flatAccuracy = flatRounds.length > 0 ? flatCorrect / flatRounds.length : null;

  const correctRounds = rounds.filter(r => r.correct && r.responseMs > 0);
  const avgResponseMs = correctRounds.length > 0
    ? Math.round(correctRounds.reduce((s, r) => s + r.responseMs, 0) / correctRounds.length)
    : null;

  const byBand = {};
  for (const b of BANDS) {
    const br = rounds.filter(r => getBandKey(r.offsetCents) === b.key);
    byBand[b.key] = [br.filter(r => r.correct).length, br.length];
  }

  const byRegister = {};
  for (const r of rounds) {
    const oct = r.note.match(/\d+/)?.[0] || '4';
    if (!byRegister[oct]) byRegister[oct] = [0, 0];
    byRegister[oct][1]++;
    if (r.correct) byRegister[oct][0]++;
  }

  return {
    date: new Date().toISOString(),
    rounds: total,
    accuracy,
    sharpAccuracy,
    flatAccuracy,
    avgResponseMs,
    byBand,
    byRegister,
  };
}

// ─── Adaptive Staircase ───
function createStaircase() {
  return {
    cents: 30,
    streak: 0,
    reversals: [],
    lastDirection: null, // 'up' or 'down'
    roundNum: 0,
  };
}

function staircaseStep(sc, correct) {
  const next = { ...sc, roundNum: sc.roundNum + 1 };
  const step = next.roundNum <= 10 ? 5 : next.roundNum <= 20 ? 2 : 1;

  if (correct) {
    next.streak = sc.streak + 1;
    if (next.streak >= 2) {
      // 2-down: decrease
      const dir = 'down';
      if (sc.lastDirection === 'up') next.reversals = [...sc.reversals, sc.cents];
      next.lastDirection = dir;
      next.cents = Math.max(1, sc.cents - step);
      next.streak = 0;
    }
  } else {
    // 1-up: increase
    const dir = 'up';
    if (sc.lastDirection === 'down') next.reversals = [...sc.reversals, sc.cents];
    next.lastDirection = dir;
    next.cents = Math.min(50, sc.cents + step);
    next.streak = 0;
  }

  return next;
}

function staircaseThreshold(sc) {
  if (sc.reversals.length < 6) return sc.cents;
  const last6 = sc.reversals.slice(-6);
  return Math.round(last6.reduce((a, b) => a + b, 0) / last6.length);
}

// ─── Threshold Finder ───
function createThresholdFinder() {
  return { cents: 25, trialsAtLevel: 0, correctAtLevel: 0, history: [], done: false, result: null };
}

function thresholdFinderStep(tf, correct) {
  const next = { ...tf, trialsAtLevel: tf.trialsAtLevel + 1 };
  if (correct) next.correctAtLevel = tf.correctAtLevel + 1;

  if (next.trialsAtLevel >= 3) {
    const passed = next.correctAtLevel >= 2;
    next.history = [...tf.history, { cents: tf.cents, passed }];

    if (passed) {
      const newCents = Math.max(1, Math.round(tf.cents / 2));
      if (newCents === tf.cents || tf.cents <= 1) {
        next.done = true;
        next.result = tf.cents;
      } else {
        next.cents = newCents;
        next.trialsAtLevel = 0;
        next.correctAtLevel = 0;
      }
    } else {
      const newCents = Math.min(50, Math.round(tf.cents * 1.5));
      if (next.history.length >= 8 || newCents >= 50) {
        // Find the last level that passed
        const lastPassed = [...next.history].reverse().find(h => h.passed);
        next.done = true;
        next.result = lastPassed ? lastPassed.cents : tf.cents;
      } else {
        next.cents = newCents;
        next.trialsAtLevel = 0;
        next.correctAtLevel = 0;
      }
    }
  }

  return next;
}

// ─── Main Component ───
export function PitchDiscriminationTrainer({ theme: T, onBack }) {
  const isMobile = useIsMobile();

  // Screen
  const [screen, setScreen] = useState('setup');

  // Config
  const [mode, setMode] = useState('sharpFlat');
  const [difficulty, setDifficulty] = useState('adaptive');
  const [timbre, setTimbre] = useState('pure');
  const [roundLimit, setRoundLimit] = useState(30);

  // Play state
  const [phase, setPhase] = useState('idle'); // idle | playingA | pause | playingB | awaiting | feedback
  const [currentNote, setCurrentNote] = useState('A4');
  const [currentOffset, setCurrentOffset] = useState(0);
  const [refFirst, setRefFirst] = useState(true);
  const [feedback, setFeedback] = useState(null); // { correct, direction, offsetCents }
  const [roundNum, setRoundNum] = useState(0);
  const roundStartRef = useRef(0);
  const [answersDisabled, setAnswersDisabled] = useState(true);

  // Session data
  const [rounds, setRounds] = useState([]);
  const sessionStartRef = useRef(Date.now());

  // Direction balance
  const sharpCountRef = useRef(0);
  const flatCountRef = useRef(0);

  // Staircase (adaptive)
  const [staircase, setStaircase] = useState(createStaircase);
  const staircaseRef = useRef(staircase);
  useEffect(() => { staircaseRef.current = staircase; }, [staircase]);
  // Threshold finder
  const [thresholdFinder, setThresholdFinder] = useState(createThresholdFinder);

  // Stats
  const [aggStats, setAggStats] = useState(loadStats);

  // Active timbre (may override for adaptive)
  const activeTimbreRef = useRef(timbre);
  useEffect(() => { activeTimbreRef.current = timbre; }, [timbre]);

  // Abort controller for cancelling playback
  const abortRef = useRef(false);
  const playingRef = useRef(false);

  // Audio chain ref (instance-scoped, not module-level)
  const audioChainRef = useRef(null);
  const activeNodesRef = useRef(new Set());
  function getChain() {
    if (!audioChainRef.current || audioChainRef.current.disposed) {
      audioChainRef.current = createAudioChain();
      activeNodesRef.current = new Set();
    }
    return audioChainRef.current;
  }

  // ─── Cleanup audio on unmount ───
  useEffect(() => {
    return () => {
      abortRef.current = true;
      disposeAudioChain(audioChainRef.current, activeNodesRef.current);
    };
  }, []);

  // ─── beforeunload save (all accessed via refs to avoid stale closures) ───
  const roundsRef = useRef(rounds);
  useEffect(() => { roundsRef.current = rounds; }, [rounds]);
  const screenRef = useRef(screen);
  useEffect(() => { screenRef.current = screen; }, [screen]);
  const finishSessionRef = useRef(null); // populated after finishSession is defined

  useEffect(() => {
    const flush = () => {
      if (roundsRef.current.length > 0 && screenRef.current === 'play') {
        finishSessionRef.current?.(roundsRef.current);
      }
    };
    window.addEventListener('beforeunload', flush);
    return () => window.removeEventListener('beforeunload', flush);
  }, []);

  // ─── Tab visibility ───
  useEffect(() => {
    const handler = () => {
      if (document.hidden && playingRef.current) {
        abortRef.current = true;
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // ─── Generate next round ───
  const generateOffset = useCallback(() => {
    let cents;
    let dir;
    let effectiveTimbre = timbre;

    if (mode === 'thresholdFinder') {
      cents = thresholdFinder.cents;
    } else if (difficulty === 'adaptive') {
      cents = staircase.cents;
      // Auto-switch to pure at small offsets if natural selected
      if (cents <= 10 && timbre === 'natural') effectiveTimbre = 'pure';
    } else {
      const d = DIFFICULTIES[difficulty];
      cents = randomInt(d.min, d.max);
    }

    // Direction: balanced sharp/flat
    if (mode === 'withUnison' && Math.random() < UNISON_PROBABILITY) {
      dir = 'same';
      cents = 0;
    } else {
      const sharpBias = flatCountRef.current > sharpCountRef.current ? 0.6 : 0.4;
      dir = Math.random() < sharpBias ? 'sharp' : 'flat';
      if (dir === 'sharp') sharpCountRef.current++;
      else flatCountRef.current++;
    }

    const signedCents = dir === 'sharp' ? cents : dir === 'flat' ? -cents : 0;
    const note = pickNote();
    const isRefFirst = Math.random() < 0.5;

    activeTimbreRef.current = effectiveTimbre;
    return { note, signedCents, dir, isRefFirst, effectiveTimbre };
  }, [mode, difficulty, timbre, staircase.cents, thresholdFinder.cents]);

  // ─── Play a round ───
  const playRound = useCallback(async () => {
    if (playingRef.current) return;
    playingRef.current = true;
    abortRef.current = false;

    const { note, signedCents, dir, isRefFirst, effectiveTimbre } = generateOffset();
    setCurrentNote(note);
    setCurrentOffset(signedCents);
    setRefFirst(isRefFirst);
    setFeedback(null);
    setAnswersDisabled(true);

    const chain = getChain();
    const nodes = activeNodesRef.current;
    const refFreq = Tone.Frequency(note).toFrequency();
    const testFreq = refFreq * centsToFreqRatio(signedCents);

    const freqA = isRefFirst ? refFreq : testFreq;
    const freqB = isRefFirst ? testFreq : refFreq;

    // Play tone A
    setPhase('playingA');
    await playTone(freqA, effectiveTimbre, 0.8, chain, nodes);
    if (abortRef.current) { playingRef.current = false; setPhase('idle'); return; }

    // Pause
    setPhase('pause');
    await new Promise(r => setTimeout(r, 500));
    if (abortRef.current) { playingRef.current = false; setPhase('idle'); return; }

    // Play tone B
    setPhase('playingB');
    await playTone(freqB, effectiveTimbre, 0.8, chain, nodes);
    if (abortRef.current) { playingRef.current = false; setPhase('idle'); return; }

    // Await answer
    setPhase('awaiting');
    setAnswersDisabled(false);
    roundStartRef.current = Date.now();
    playingRef.current = false;
  }, [generateOffset]);

  // Ref to always call latest playRound (fixes stale closure in auto-advance setTimeout)
  const playRoundRef = useRef(playRound);
  useEffect(() => { playRoundRef.current = playRound; }, [playRound]);

  // ─── Handle answer ───
  const handleAnswer = useCallback((answer) => {
    if (answersDisabled || phase !== 'awaiting') return;
    setAnswersDisabled(true);

    const responseMs = Date.now() - roundStartRef.current;
    const dir = currentOffset > 0 ? 'sharp' : currentOffset < 0 ? 'flat' : 'same';

    // Map answer to actual comparison
    // "higher" = second note is higher than first
    // If refFirst: higher means test > ref means sharp
    // If !refFirst: higher means ref > test means flat
    let userDirection;
    if (answer === 'same') {
      userDirection = 'same';
    } else if (answer === 'higher') {
      userDirection = refFirst ? 'sharp' : 'flat';
    } else {
      userDirection = refFirst ? 'flat' : 'sharp';
    }

    const correct = userDirection === dir;

    const roundData = {
      note: currentNote,
      offsetCents: currentOffset,
      direction: dir,
      userAnswer: answer,
      userDirection,
      correct,
      responseMs,
      refFirst,
      timestamp: Date.now(),
    };

    const newRounds = [...rounds, roundData];
    setRounds(newRounds);
    setRoundNum(r => r + 1);

    // Update staircase / threshold finder
    if (difficulty === 'adaptive') {
      setStaircase(sc => staircaseStep(sc, correct));
    }
    if (mode === 'thresholdFinder') {
      setThresholdFinder(tf => {
        const next = thresholdFinderStep(tf, correct);
        if (next.done) {
          // Auto-end session
          setTimeout(() => finishSession(newRounds, next.result), 1500);
        }
        return next;
      });
    }

    // Compute which tone was actually higher in presentation order (A then B)
    // refFirst && sharp → test>ref, B=test → B was higher
    // refFirst && flat  → test<ref, B=test → B was lower
    // !refFirst && sharp → test>ref, A=test → A was higher (B was lower)
    // !refFirst && flat  → test<ref, A=test → A was lower (B was higher)
    const toneBWasHigher = refFirst ? dir === 'sharp' : dir === 'flat';
    setFeedback({ correct, direction: dir, offsetCents: Math.abs(currentOffset), toneBWasHigher });
    setPhase('feedback');

    // Check round limit
    const nextRoundNum = roundNum + 1;
    const shouldEnd = roundLimit > 0 && nextRoundNum >= roundLimit;
    if (shouldEnd && !(mode === 'thresholdFinder')) {
      setTimeout(() => finishSession(newRounds), 1500);
      return;
    }

    // Auto-advance (use ref to get latest playRound with updated staircase/thresholdFinder)
    setTimeout(() => {
      if (!abortRef.current) {
        setPhase('idle');
        playRoundRef.current();
      }
    }, 1200);
  }, [answersDisabled, phase, currentOffset, refFirst, currentNote, rounds, roundNum, roundLimit, difficulty, mode]);

  // ─── Finish session ───
  const finishSession = useCallback((sessionRounds, thresholdResult) => {
    abortRef.current = true;
    playingRef.current = false;
    setPhase('idle');

    const summary = computeSessionSummary(sessionRounds || rounds);
    if (!summary) { setScreen('setup'); return; }

    // Add config to summary
    summary.mode = mode;
    summary.difficulty = difficulty;
    summary.timbre = timbre;

    // Compute threshold (use ref to get latest staircase, avoids stale closure)
    let threshold = thresholdResult || null;
    if (!threshold && difficulty === 'adaptive') {
      threshold = staircaseThreshold(staircaseRef.current);
    }
    summary.threshold = threshold;

    // Update aggregate stats
    setAggStats(prev => {
      const next = { ...prev };
      next.sessions = [...prev.sessions, summary].slice(-50);
      next.totalRounds = prev.totalRounds + summary.rounds;
      next.totalCorrect = prev.totalCorrect + Math.round(summary.accuracy * summary.rounds);
      next.totalSessions = prev.totalSessions + 1;

      const sharpR = (sessionRounds || rounds).filter(r => r.direction === 'sharp');
      const flatR = (sessionRounds || rounds).filter(r => r.direction === 'flat');
      next.sharpTotal = prev.sharpTotal + sharpR.length;
      next.sharpCorrect = prev.sharpCorrect + sharpR.filter(r => r.correct).length;
      next.flatTotal = prev.flatTotal + flatR.length;
      next.flatCorrect = prev.flatCorrect + flatR.filter(r => r.correct).length;

      if (threshold && (prev.bestThreshold === null || threshold < prev.bestThreshold)) {
        next.bestThreshold = threshold;
      }
      next.lastSession = summary.date;

      saveStats(next);
      return next;
    });

    setScreen('summary');
  }, [rounds, mode, difficulty, timbre]);

  // Keep finishSessionRef updated for beforeunload handler
  useEffect(() => { finishSessionRef.current = finishSession; }, [finishSession]);

  // ─── Start session ───
  const startSession = useCallback(() => {
    setRounds([]);
    setRoundNum(0);
    setStaircase(createStaircase());
    setThresholdFinder(createThresholdFinder());
    sharpCountRef.current = 0;
    flatCountRef.current = 0;
    sessionStartRef.current = Date.now();
    abortRef.current = false;
    setScreen('play');
    setTimeout(() => playRound(), 300);
  }, [playRound]);

  // ─── End session early ───
  const endSession = useCallback(() => {
    if (rounds.length > 0) {
      finishSession(rounds);
    } else {
      setScreen('setup');
    }
  }, [rounds, finishSession]);

  // ─── Render ───
  const S = { // shared styles
    container: { maxWidth: 560, margin: '0 auto', padding: isMobile ? '20px 16px 80px' : '32px 24px 80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    card: { background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, boxShadow: `0 10px 30px -5px ${T.gold}08, 0 4px 10px -2px ${T.gold}04` },
    sectionLabel: { fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.textMuted, fontFamily: T.sans, marginBottom: 10 },
    goldCta: { width: '100%', padding: '16px 0', borderRadius: T.radius, background: T.gold, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, fontFamily: T.sans, cursor: 'pointer', letterSpacing: 2, textTransform: 'uppercase', boxShadow: `0 4px 0 0 ${T.goldDark || T.gold}60`, transition: 'transform 0.1s, box-shadow 0.1s' },
  };

  // Inject CSS animations (only once)
  const animStyles = useMemo(() => (
    <style>{`
      @keyframes pd-ripple { 0% { transform: scale(0.8); opacity: 0.8; border-width: 3px; } 100% { transform: scale(1.8); opacity: 0; border-width: 0px; } }
      @keyframes pd-breathe { 0%, 100% { transform: scale(1); box-shadow: 0 0 15px ${T.gold}33; } 50% { transform: scale(1.04); box-shadow: 0 0 35px ${T.gold}66; } }
      @keyframes pd-shake { 10%, 90% { transform: translate3d(-2px,0,0); } 20%, 80% { transform: translate3d(3px,0,0); } 30%, 50%, 70% { transform: translate3d(-5px,0,0); } 40%, 60% { transform: translate3d(5px,0,0); } }
      @keyframes pd-success-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2); opacity: 0; } }
      .pd-tactile { transition: transform 0.1s, box-shadow 0.1s; }
      .pd-tactile:active { transform: translateY(4px) !important; box-shadow: none !important; }
    `}</style>
  ), [T.gold]);

  // ─── SETUP SCREEN ───
  if (screen === 'setup') {
    return (
      <div style={S.container}>
        {animStyles}
        <header style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: T.textMuted, marginBottom: 12 }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 4 }}>
              <ArrowLeft size={18} />
            </button>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', fontFamily: T.sans }}>Ear Training</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 600, fontFamily: T.serif, color: T.textDark, letterSpacing: -0.5 }}>Pitch Discrimination</h1>
        </header>

        {aggStats.totalSessions === 0 && (
          <p style={{ fontSize: 14, color: T.textMed, fontFamily: T.sans, lineHeight: 1.6, marginBottom: 24 }}>
            Train your ear to detect tiny pitch differences between two tones.
          </p>
        )}

        {/* Quick stats preview */}
        {aggStats.totalSessions > 0 && (
          <div style={{ ...S.card, padding: '14px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 24 }}>
              {aggStats.bestThreshold != null && (
                <div>
                  <div style={{ ...S.sectionLabel, marginBottom: 2 }}>Best</div>
                  <div style={{ fontSize: 18, fontFamily: T.serif, color: T.gold }}>{aggStats.bestThreshold}¢</div>
                </div>
              )}
              <div>
                <div style={{ ...S.sectionLabel, marginBottom: 2 }}>Accuracy</div>
                <div style={{ fontSize: 18, fontFamily: T.serif, color: T.textDark }}>{aggStats.totalRounds > 0 ? Math.round(aggStats.totalCorrect / aggStats.totalRounds * 100) : 0}%</div>
              </div>
              <div>
                <div style={{ ...S.sectionLabel, marginBottom: 2 }}>Sessions</div>
                <div style={{ fontSize: 18, fontFamily: T.serif, color: T.textDark }}>{aggStats.totalSessions}</div>
              </div>
            </div>
            <button onClick={() => setScreen('history')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, display: 'flex', padding: 4 }}>
              <Clock size={18} />
            </button>
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Training settings card */}
          <div style={{ ...S.card, padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Mode */}
            <div>
              <div style={S.sectionLabel}>Mode</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(MODES).map(([key, m]) => (
                  <PillButton key={key} active={mode === key} onClick={() => setMode(key)} theme={T}>{m.label}</PillButton>
                ))}
              </div>
              <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginTop: 8, fontStyle: 'italic' }}>{MODES[mode].desc}</div>
            </div>

            {/* Difficulty */}
            <div>
              <div style={S.sectionLabel}>Difficulty</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(DIFFICULTIES).map(([key, d]) => (
                  <PillButton key={key} active={difficulty === key} onClick={() => setDifficulty(key)} theme={T}>{d.label}</PillButton>
                ))}
              </div>
              <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginTop: 8, fontStyle: 'italic' }}>{DIFFICULTIES[difficulty].desc}</div>
            </div>
          </div>

          {/* Sound settings card */}
          <div style={{ ...S.card, padding: '20px 20px 12px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Timbre */}
            <div>
              <div style={S.sectionLabel}>Timbre</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {Object.entries(TIMBRES).map(([key, t]) => (
                  <PillButton key={key} active={timbre === key} onClick={() => setTimbre(key)} theme={T} wide>
                    <span style={{ fontSize: 16, marginRight: 6 }}>{t.icon}</span> {t.label}
                  </PillButton>
                ))}
              </div>
              <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginTop: 8, fontStyle: 'italic' }}>
                {TIMBRES[timbre].desc}
                {timbre === 'natural' && (difficulty === 'expert' || difficulty === 'adaptive') && (
                  <span style={{ color: T.warm }}> — auto-switches to Pure at small offsets</span>
                )}
              </div>
            </div>

            {/* Rounds */}
            {mode !== 'thresholdFinder' && (
              <div>
                <div style={S.sectionLabel}>Rounds</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {ROUND_OPTIONS.map(n => (
                    <PillButton key={n} active={roundLimit === n} onClick={() => setRoundLimit(n)} theme={T}>{ROUND_LABELS[n]}</PillButton>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="pd-tactile" onClick={startSession} style={{ ...S.goldCta, marginTop: 32 }}>Begin Session</button>
      </div>
    );
  }

  // ─── PLAY SCREEN ───
  if (screen === 'play') {
    const sessionCorrect = rounds.filter(r => r.correct).length;
    const streak = (() => { let s = 0; for (let i = rounds.length - 1; i >= 0; i--) { if (rounds[i].correct) s++; else break; } return s; })();
    const showHeadphones = difficulty === 'advanced' || difficulty === 'expert' || (difficulty === 'adaptive' && staircase.cents <= 10);
    const isPlaying = phase === 'playingA' || phase === 'playingB';
    const isCorrect = phase === 'feedback' && feedback?.correct;
    const isWrong = phase === 'feedback' && !feedback?.correct;

    const phaseText = { idle: 'Get ready...', playingA: 'Listen to tone A...', pause: '...', playingB: 'Listen to tone B...', awaiting: 'Higher or lower?', feedback: feedback?.correct ? 'Correct!' : 'Not quite' };
    const phaseColor = isCorrect ? T.success : isWrong ? T.coral : phase === 'awaiting' ? T.gold : T.textMed;
    const circleSize = isMobile ? 200 : 260;
    const innerSize = isMobile ? 100 : 128;

    return (
      <div style={{ ...S.container, justifyContent: 'space-between' }}>
        {animStyles}
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <button onClick={endSession} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, display: 'flex', padding: 4 }}>
            <X size={18} />
          </button>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: T.textMed, fontFamily: T.sans }}>
            Round {roundNum + 1}{roundLimit > 0 ? <span style={{ opacity: 0.5 }}> / {roundLimit}</span> : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {showHeadphones && <Headphones size={14} color={T.textLight} />}
            {difficulty === 'adaptive' && <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.sans }}>~{staircase.cents}¢</span>}
          </div>
        </div>

        {/* Center — Signature visualization */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
          <div style={{ position: 'relative', width: circleSize, height: circleSize, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            {/* Ripple rings (only during playback) */}
            {isPlaying && [0, 1.33, 2.66].map((delay, i) => (
              <div key={i} style={{
                position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${T.gold}`,
                opacity: 0, animation: `pd-ripple 4s cubic-bezier(0.4,0,0.2,1) infinite`, animationDelay: `${delay}s`,
              }} />
            ))}
            {/* Success ring burst */}
            {isCorrect && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${T.success}`,
                animation: 'pd-success-ring 0.8s ease-out forwards',
              }} />
            )}
            {/* Inner circle */}
            <div style={{
              position: 'relative', zIndex: 1, width: innerSize, height: innerSize, borderRadius: '50%',
              background: isCorrect ? `${T.success}20` : isWrong ? `${T.coral}15` : T.goldSoft || `${T.gold}12`,
              border: `1px solid ${isCorrect ? `${T.success}40` : isWrong ? `${T.coral}30` : `${T.gold}30`}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px ${isCorrect ? T.success : T.gold}25`,
              animation: isPlaying ? `pd-breathe 3s ease-in-out infinite` : isWrong ? 'pd-shake 0.5s ease-in-out' : 'none',
              transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
            }}>
              {isCorrect ? <Check size={40} color={T.success} strokeWidth={3} />
                : isWrong ? <X size={40} color={T.coral} strokeWidth={3} />
                : phase === 'awaiting' ? <Ear size={36} color={T.gold} />
                : isPlaying ? <div style={{ width: 12, height: 12, borderRadius: '50%', background: T.gold, animation: 'pulse-ring 0.8s ease-in-out infinite' }} />
                : <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.textMuted }} />}
            </div>
          </div>

          {/* Phase text */}
          <div key={phase} style={{ fontSize: 24, fontWeight: 400, fontFamily: T.serif, color: phaseColor, textAlign: 'center', fontStyle: 'italic', minHeight: 36, transition: 'color 0.3s' }}>
            {phaseText[phase]}
          </div>
          {phase === 'awaiting' && (
            <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 4 }}>
              Was the second tone higher, lower{mode === 'withUnison' ? ', or the same' : ''}?
            </div>
          )}

          {/* Feedback detail */}
          {phase === 'feedback' && feedback && (
            <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, marginTop: 6, textAlign: 'center' }}>
              {feedback.direction === 'same' ? 'Both tones were identical'
                : `Tone B was ${feedback.toneBWasHigher ? 'higher' : 'lower'} by ${feedback.offsetCents}¢`}
            </div>
          )}
        </div>

        {/* Answer buttons — tactile, taller for mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: mode === 'withUnison' ? '1fr 0.7fr 1fr' : '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <AnswerButton label="Lower" icon={<ArrowDown size={24} strokeWidth={3} />} color={T.slate || '#6b8e9f'} disabled={answersDisabled} onClick={() => handleAnswer('lower')} theme={T} />
          {mode === 'withUnison' && <AnswerButton label="Same" icon={<Minus size={24} strokeWidth={3} />} color={T.gold} disabled={answersDisabled} onClick={() => handleAnswer('same')} theme={T} />}
          <AnswerButton label="Higher" icon={<ArrowUp size={24} strokeWidth={3} />} color={T.coral || '#d68383'} disabled={answersDisabled} onClick={() => handleAnswer('higher')} theme={T} />
        </div>

        {/* Running stats footer */}
        {rounds.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: T.textMuted, fontFamily: T.sans, paddingTop: 12, borderTop: `1px solid ${T.borderSoft}` }}>
            <span>{sessionCorrect}/{rounds.length} Correct</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.border, display: 'inline-block' }} />
            {streak > 1 && <><span>Streak: {streak}</span><span style={{ width: 3, height: 3, borderRadius: '50%', background: T.border, display: 'inline-block' }} /></>}
            {difficulty === 'adaptive' && staircase.reversals.length >= 6 && <span style={{ color: T.gold }}>Thresh: ~{staircaseThreshold(staircase)}¢</span>}
          </div>
        )}
      </div>
    );
  }

  // ─── SUMMARY SCREEN ───
  if (screen === 'summary') {
    const lastSession = aggStats.sessions[aggStats.sessions.length - 1];
    if (!lastSession) return <div style={S.container}><button onClick={() => setScreen('setup')}>Back</button></div>;
    const pct = Math.round(lastSession.accuracy * 100);
    const pctColor = pct >= 80 ? T.success : pct >= 60 ? T.gold : T.coral;
    const prevSession = aggStats.sessions.length > 1 ? aggStats.sessions[aggStats.sessions.length - 2] : null;
    const thresholdDelta = prevSession?.threshold && lastSession.threshold ? prevSession.threshold - lastSession.threshold : null;
    const pctDelta = prevSession ? Math.round(lastSession.accuracy * 100) - Math.round(prevSession.accuracy * 100) : null;

    return (
      <div style={S.container}>
        {animStyles}
        <div style={{ textAlign: 'center', marginBottom: 16, paddingTop: 20 }}>
          <div style={{ color: T.gold, marginBottom: 8, display: 'flex', justifyContent: 'center' }}><Check size={28} /></div>
          <h2 style={{ fontSize: 28, fontWeight: 600, fontFamily: T.serif, color: T.textDark }}>Session Complete</h2>
        </div>

        {/* Hero accuracy card */}
        <div style={{ ...S.card, padding: '32px 20px', marginBottom: 12, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: T.gold }} />
          <div style={{ ...S.sectionLabel, marginBottom: 4 }}>Overall Accuracy</div>
          <div style={{ fontSize: 72, fontWeight: 600, fontFamily: T.serif, color: T.textDark, lineHeight: 1 }}>
            {pct}<span style={{ fontSize: 36, color: T.textMuted }}>%</span>
          </div>
          {pctDelta != null && pctDelta !== 0 && (
            <div style={{ fontSize: 13, fontWeight: 700, color: pctDelta > 0 ? T.success : T.coral, fontFamily: T.sans, marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <TrendingUp size={14} /> {pctDelta > 0 ? '+' : ''}{pctDelta}% from last session
            </div>
          )}
          <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.sans, marginTop: 4 }}>
            {lastSession.rounds} rounds in {Math.floor((Date.now() - sessionStartRef.current) / 60000)}m
          </div>
        </div>

        {/* Threshold + Response time row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {lastSession.threshold != null && (
            <div style={{ background: T.goldSoft || `${T.gold}12`, border: `1px solid ${T.gold}30`, borderRadius: T.radiusMd, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ ...S.sectionLabel, color: `${T.gold}cc`, marginBottom: 2 }}>Threshold</div>
              <div style={{ fontSize: 28, fontWeight: 600, color: T.gold, fontFamily: T.serif }}>{lastSession.threshold}¢</div>
              {thresholdDelta != null && thresholdDelta !== 0 && (
                <div style={{ fontSize: 11, color: thresholdDelta > 0 ? T.success : T.coral, fontFamily: T.sans, marginTop: 4 }}>
                  {thresholdDelta > 0 ? `${thresholdDelta}¢ better` : `${Math.abs(thresholdDelta)}¢ wider`}
                </div>
              )}
            </div>
          )}
          {lastSession.avgResponseMs != null && (
            <div style={{ ...S.card, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ ...S.sectionLabel, marginBottom: 2 }}>Avg Response</div>
              <div style={{ fontSize: 24, fontFamily: T.serif, color: T.textDark, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {(lastSession.avgResponseMs / 1000).toFixed(1)}s {lastSession.avgResponseMs < 1500 && <Zap size={16} color={T.gold} />}
              </div>
            </div>
          )}
        </div>

        {/* Direction bias insight */}
        {lastSession.sharpAccuracy != null && lastSession.flatAccuracy != null && Math.abs(lastSession.sharpAccuracy - lastSession.flatAccuracy) > 0.15 && (
          <div style={{ background: T.warmSoft || `${T.warm}12`, border: `1px solid ${T.warm}25`, borderRadius: T.radiusMd, padding: '14px 16px', marginBottom: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Ear size={18} style={{ color: T.coral, flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: T.serif, color: T.textDark, marginBottom: 4 }}>Direction Bias Detected</div>
              <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans, lineHeight: 1.5 }}>
                {lastSession.sharpAccuracy < lastSession.flatAccuracy
                  ? 'You tend to miss sharp notes. Try focusing on the brightness or tension in the second tone.'
                  : 'You tend to miss flat notes. Try focusing on the dullness or loss of tension when listening.'}
              </div>
            </div>
          </div>
        )}

        {/* Direction bias bars */}
        {lastSession.sharpAccuracy != null && lastSession.flatAccuracy != null && (
          <div style={{ ...S.card, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ ...S.sectionLabel, marginBottom: 12 }}>Accuracy by Direction</div>
            <BiasBar label="Sharp" sublabel="(Higher)" pct={lastSession.sharpAccuracy} color={T.slate || '#6b8e9f'} theme={T} />
            <BiasBar label="Flat" sublabel="(Lower)" pct={lastSession.flatAccuracy} color={T.coral || '#d68383'} theme={T} />
          </div>
        )}

        {/* Accuracy by band */}
        <div style={{ ...S.card, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ ...S.sectionLabel, marginBottom: 12 }}>Accuracy by Range</div>
          {BANDS.map(b => {
            const data = lastSession.byBand?.[b.key]; if (!data || data[1] === 0) return null;
            const bandPct = Math.round(data[0] / data[1] * 100);
            return (
              <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 48, fontSize: 12, color: T.textMed, fontFamily: T.sans, textAlign: 'right', fontWeight: 700 }}>{b.label}</div>
                <div style={{ flex: 1, height: 6, background: T.borderSoft, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${bandPct}%`, height: '100%', borderRadius: 3, background: bandPct >= 80 ? T.success : bandPct >= 60 ? T.gold : T.coral, transition: 'width 0.6s ease-out' }} />
                </div>
                <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: T.textMed, fontFamily: T.sans, textAlign: 'right' }}>{bandPct}%</div>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: aggStats.sessions.length > 1 ? '1fr 1fr' : '1fr', gap: 12 }}>
          <button onClick={() => setScreen('setup')} style={{ padding: '14px 0', borderRadius: T.radius, background: 'none', border: `1px solid ${T.border}`, color: T.textMed, fontSize: 13, fontWeight: 700, fontFamily: T.sans, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
            New Session
          </button>
          {aggStats.sessions.length > 1 && (
            <button className="pd-tactile" onClick={() => setScreen('history')} style={{ ...S.goldCta, fontSize: 13, padding: '14px 0' }}>View History</button>
          )}
        </div>
      </div>
    );
  }

  // ─── HISTORY SCREEN ───
  if (screen === 'history') {
    const sessions = aggStats.sessions;
    const thresholdSessions = sessions.filter(s => s.threshold != null);
    const cumulativeSharpPct = aggStats.sharpTotal > 0 ? Math.round(aggStats.sharpCorrect / aggStats.sharpTotal * 100) : null;
    const cumulativeFlatPct = aggStats.flatTotal > 0 ? Math.round(aggStats.flatCorrect / aggStats.flatTotal * 100) : null;
    const recent3 = thresholdSessions.slice(-3);
    const older3 = thresholdSessions.slice(-6, -3);
    const recentAvg = recent3.length > 0 ? Math.round(recent3.reduce((s, x) => s + x.threshold, 0) / recent3.length) : null;
    const olderAvg = older3.length > 0 ? Math.round(older3.reduce((s, x) => s + x.threshold, 0) / older3.length) : null;

    return (
      <div style={S.container}>
        {animStyles}
        <header style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <button onClick={() => setScreen('setup')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, display: 'flex', padding: 4 }}>
              <ArrowLeft size={18} />
            </button>
            <h2 style={{ fontSize: 26, fontWeight: 600, fontFamily: T.serif, color: T.textDark }}>Training History</h2>
          </div>
          <div style={{ fontSize: 13, color: T.textMuted, fontFamily: T.sans, marginLeft: 32 }}>Your journey to absolute precision.</div>
        </header>

        {/* Chart + Best threshold card */}
        {aggStats.bestThreshold != null && (
          <div style={{ ...S.card, padding: '20px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: thresholdSessions.length > 1 ? 16 : 0 }}>
              <div>
                <div style={{ ...S.sectionLabel, marginBottom: 2 }}>Best Threshold</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: T.gold, fontFamily: T.serif, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  {aggStats.bestThreshold}¢
                  {recentAvg != null && olderAvg != null && recentAvg < olderAvg && (
                    <span style={{ fontSize: 13, fontFamily: T.sans, color: T.success, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TrendingUp size={14} /> {olderAvg - recentAvg}¢
                    </span>
                  )}
                </div>
              </div>
            </div>
            {thresholdSessions.length > 1 && <ThresholdChart sessions={thresholdSessions} theme={T} />}
          </div>
        )}

        {/* Cumulative direction bias */}
        {cumulativeSharpPct != null && cumulativeFlatPct != null && (
          <div style={{ ...S.card, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ ...S.sectionLabel, marginBottom: 12 }}>Cumulative Direction Bias</div>
            <BiasBar label="Sharp" sublabel="(Higher)" pct={cumulativeSharpPct / 100} color={T.slate || '#6b8e9f'} theme={T} />
            <BiasBar label="Flat" sublabel="(Lower)" pct={cumulativeFlatPct / 100} color={T.coral || '#d68383'} theme={T} />
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          <StatBadge value={aggStats.totalSessions} label="sessions" theme={T} />
          <StatBadge value={aggStats.totalRounds.toLocaleString()} label="rounds" theme={T} />
          <StatBadge value={aggStats.totalRounds > 0 ? `${Math.round(aggStats.totalCorrect / aggStats.totalRounds * 100)}%` : '—'} label="accuracy" theme={T} />
        </div>

        {/* Recent sessions */}
        <div style={{ ...S.sectionLabel, marginBottom: 10 }}>Recent Sessions</div>
        <div style={{ ...S.card, overflow: 'hidden', marginBottom: 20 }}>
          {[...sessions].reverse().slice(0, 15).map((s, i) => {
            const sPct = Math.round(s.accuracy * 100);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < Math.min(sessions.length, 15) - 1 ? `1px solid ${T.borderSoft}` : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.textDark, fontFamily: T.sans, marginBottom: 2 }}>
                    {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                  <div style={{ fontSize: 11, color: T.textMuted, fontFamily: T.sans }}>
                    {s.rounds} rounds · {s.difficulty || 'adaptive'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {s.threshold != null && <div style={{ fontSize: 14, fontWeight: 700, fontFamily: T.serif, color: T.gold }}>{s.threshold}¢</div>}
                  <div style={{ fontSize: 12, color: sPct >= 80 ? T.success : sPct >= 60 ? T.gold : T.coral, fontWeight: 600 }}>{sPct}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset + CTA */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <button onClick={() => { if (confirm('Reset all training history? This cannot be undone.')) { const fresh = defaultStats(); setAggStats(fresh); saveStats(fresh); } }} style={{ background: 'none', border: 'none', color: T.textMuted, fontSize: 11, fontFamily: T.sans, cursor: 'pointer', textDecoration: 'underline' }}>
            Reset History
          </button>
        </div>
        <button className="pd-tactile" onClick={() => setScreen('setup')} style={S.goldCta}>Start New Session</button>
      </div>
    );
  }

  return null;
}

// ─── Sub-Components ───

function PillButton({ active, onClick, theme: T, children, wide }) {
  return (
    <button onClick={onClick} style={{
      padding: '9px 16px', borderRadius: T.radius,
      background: active ? (T.goldSoft || `${T.gold}15`) : 'transparent',
      color: active ? T.gold : T.textMuted,
      border: `1px solid ${active ? `${T.gold}40` : T.border}`,
      fontSize: 13, fontWeight: active ? 700 : 400, fontFamily: T.sans,
      cursor: 'pointer', transition: 'all 0.2s',
      flex: wide ? 1 : undefined,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </button>
  );
}

function AnswerButton({ label, icon, color, disabled, onClick, theme: T }) {
  return (
    <button
      className="pd-tactile"
      onPointerDown={(e) => { if (!disabled) { e.preventDefault(); onClick(); } }}
      style={{
        padding: '24px 0', borderRadius: T.radiusMd,
        background: disabled ? T.bgSoft : `${color}10`,
        border: `2px solid ${disabled ? T.borderSoft : `${color}30`}`,
        color: disabled ? T.textMuted : color,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'transform 0.1s, box-shadow 0.1s, background 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: disabled ? 0.35 : 1,
        boxShadow: disabled ? 'none' : `0 4px 0 0 ${color}30`,
      }}
    >
      {icon}
      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: T.sans, letterSpacing: 3, textTransform: 'uppercase' }}>{label}</span>
    </button>
  );
}

function BiasBar({ label, sublabel, pct, color, theme: T }) {
  const pctVal = Math.round((pct || 0) * 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, fontFamily: T.sans, marginBottom: 4 }}>
        <span style={{ color }}>{label} {sublabel && <span style={{ fontWeight: 400, color: T.textMuted }}>{sublabel}</span>}</span>
        <span style={{ color: T.textDark }}>{pctVal}%</span>
      </div>
      <div style={{ width: '100%', height: 8, background: T.borderSoft, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pctVal}%`, height: '100%', borderRadius: 4, background: color, transition: 'width 0.6s ease-out' }} />
      </div>
    </div>
  );
}

function StatBadge({ value, label, theme: T }) {
  return (
    <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: T.radiusMd, padding: '12px 8px', textAlign: 'center' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: T.textMuted, fontFamily: T.sans, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600, color: T.textDark, fontFamily: T.serif }}>{value}</div>
    </div>
  );
}

function ThresholdChart({ sessions, theme: T }) {
  const w = 480, h = 140, pad = 30;
  const thresholds = sessions.map(s => s.threshold);
  const maxT = Math.max(...thresholds, 30);
  const minT = Math.min(...thresholds, 1);
  const range = Math.max(maxT - minT, 1);

  const points = thresholds.map((t, i) => ({
    x: pad + (i / Math.max(thresholds.length - 1, 1)) * (w - pad * 2),
    y: pad + (1 - (t - minT) / range) * (h - pad * 2),
    t,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = linePath + ` L${points[points.length - 1].x},${h - pad} L${points[0].x},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="pd-gold-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.gold} stopOpacity="0.15" />
          <stop offset="100%" stopColor={T.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[minT, Math.round((maxT + minT) / 2), maxT].map(v => {
        const y = pad + (1 - (v - minT) / range) * (h - pad * 2);
        return (
          <g key={v}>
            <line x1={pad} y1={y} x2={w - pad} y2={y} stroke={T.borderSoft} strokeWidth={0.5} strokeDasharray="4 4" />
            <text x={pad - 6} y={y + 3} textAnchor="end" fill={T.textMuted} fontSize={9} fontFamily={T.sans}>{v}¢</text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="url(#pd-gold-grad)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke={T.gold} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 4 : 2.5} fill={i === points.length - 1 ? T.gold : T.bgCard} stroke={T.gold} strokeWidth={1.5} />
      ))}
      {points.length >= 2 && (
        <text x={w - pad} y={h - 6} textAnchor="end" fill={T.textMuted} fontSize={9} fontFamily={T.sans}>
          {thresholds[thresholds.length - 1] < thresholds[0] ? '↓ improving' : thresholds[thresholds.length - 1] > thresholds[0] ? '↑ widening' : '— stable'}
        </text>
      )}
    </svg>
  );
}

export default PitchDiscriminationTrainer;
