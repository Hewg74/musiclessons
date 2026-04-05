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

    setFeedback({ correct, direction: dir, offsetCents: Math.abs(currentOffset) });
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
  const containerStyle = {
    maxWidth: 560, margin: '0 auto', padding: isMobile ? '16px 12px' : '24px 20px',
  };

  // ─── SETUP SCREEN ───
  if (screen === 'setup') {
    return (
      <div style={containerStyle}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted,
            display: 'flex', alignItems: 'center', padding: 4,
          }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: T.gold, fontFamily: T.sans }}>
              Ear Training
            </div>
            <div style={{ fontSize: 24, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>
              Pitch Discrimination
            </div>
          </div>
        </div>

        {/* Quick stats preview */}
        {aggStats.totalSessions > 0 && (
          <div style={{
            background: T.bgSoft, border: `1px solid ${T.border}`, borderRadius: T.radiusMd,
            padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16,
          }}>
            {aggStats.bestThreshold != null && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: T.gold, fontFamily: T.serif }}>
                  {aggStats.bestThreshold}¢
                </div>
                <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>best threshold</div>
              </div>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: T.textDark, fontFamily: T.serif }}>
                {aggStats.totalRounds > 0 ? Math.round(aggStats.totalCorrect / aggStats.totalRounds * 100) : 0}%
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>overall accuracy</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: T.textDark, fontFamily: T.serif }}>
                {aggStats.totalSessions}
              </div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>sessions</div>
            </div>
            <button onClick={() => setScreen('history')} style={{
              marginLeft: 'auto', background: 'none', border: `1px solid ${T.border}`,
              borderRadius: T.radius, padding: '6px 10px', cursor: 'pointer', color: T.textMed,
              fontSize: 11, fontFamily: T.sans,
            }}>
              History
            </button>
          </div>
        )}

        {/* Mode */}
        <SectionLabel label="Mode" theme={T} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {Object.entries(MODES).map(([key, m]) => (
            <PillButton key={key} active={mode === key} onClick={() => setMode(key)} theme={T}>
              {m.label}
            </PillButton>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 20, marginTop: -12 }}>
          {MODES[mode].desc}
        </div>

        {/* Difficulty */}
        <SectionLabel label="Difficulty" theme={T} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {Object.entries(DIFFICULTIES).map(([key, d]) => (
            <PillButton key={key} active={difficulty === key} onClick={() => setDifficulty(key)} theme={T}>
              {d.label}
            </PillButton>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 20, marginTop: -12 }}>
          {DIFFICULTIES[difficulty].desc}
        </div>

        {/* Timbre */}
        <SectionLabel label="Timbre" theme={T} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {Object.entries(TIMBRES).map(([key, t]) => (
            <PillButton key={key} active={timbre === key} onClick={() => setTimbre(key)} theme={T} wide>
              <span style={{ fontSize: 16, marginRight: 4 }}>{t.icon}</span> {t.label}
            </PillButton>
          ))}
        </div>
        <div style={{ fontSize: 12, color: T.textLight, fontFamily: T.sans, marginBottom: 20, marginTop: -12 }}>
          {TIMBRES[timbre].desc}
          {timbre === 'natural' && (difficulty === 'expert' || difficulty === 'adaptive') && (
            <span style={{ color: T.warm }}> — auto-switches to Pure at small offsets</span>
          )}
        </div>

        {/* Rounds */}
        {mode !== 'thresholdFinder' && (
          <>
            <SectionLabel label="Rounds" theme={T} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {ROUND_OPTIONS.map(n => (
                <PillButton key={n} active={roundLimit === n} onClick={() => setRoundLimit(n)} theme={T}>
                  {ROUND_LABELS[n]}
                </PillButton>
              ))}
            </div>
          </>
        )}

        {/* Start button */}
        <button onClick={startSession} style={{
          width: '100%', padding: '14px 0', borderRadius: T.radiusMd,
          background: T.gold, color: '#fff', border: 'none',
          fontSize: 15, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
          letterSpacing: 1, transition: 'all 0.2s',
        }}>
          Begin Session
        </button>
      </div>
    );
  }

  // ─── PLAY SCREEN ───
  if (screen === 'play') {
    const sessionCorrect = rounds.filter(r => r.correct).length;
    const streak = (() => {
      let s = 0;
      for (let i = rounds.length - 1; i >= 0; i--) {
        if (rounds[i].correct) s++; else break;
      }
      return s;
    })();

    const showHeadphones = difficulty === 'advanced' || difficulty === 'expert' ||
      (difficulty === 'adaptive' && staircase.cents <= 10);

    const phaseText = {
      idle: 'Get ready...',
      playingA: 'Listen to tone A...',
      pause: '...',
      playingB: 'Listen to tone B...',
      awaiting: 'Which was higher?',
      feedback: feedback?.correct ? 'Correct!' : 'Not quite',
    };

    const phaseColor = phase === 'feedback'
      ? (feedback?.correct ? T.success : T.coral)
      : phase === 'awaiting' ? T.gold : T.textMed;

    return (
      <div style={containerStyle}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <button onClick={endSession} style={{
            background: 'none', border: `1px solid ${T.border}`, borderRadius: T.radius,
            padding: '6px 12px', cursor: 'pointer', color: T.textMuted, fontSize: 12, fontFamily: T.sans,
          }}>
            End Session
          </button>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans }}>
            Round {roundNum + 1}{roundLimit > 0 ? ` / ${roundLimit}` : ''}
          </div>
          {showHeadphones && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.textLight }} title="Headphones recommended">
              <Headphones size={14} />
            </div>
          )}
          {difficulty === 'adaptive' && (
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans }}>
              ~{staircase.cents}¢
            </div>
          )}
        </div>

        {/* Center area */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: 200, marginBottom: 32,
        }}>
          {/* Phase indicator ring */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            border: `3px solid ${phaseColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, transition: 'border-color 0.3s',
            background: phase === 'feedback'
              ? (feedback?.correct ? `${T.success}15` : `${T.coral}15`)
              : 'transparent',
          }}>
            {phase === 'feedback' ? (
              feedback?.correct
                ? <Check size={40} color={T.success} />
                : <X size={40} color={T.coral} />
            ) : phase === 'playingA' || phase === 'playingB' ? (
              <div style={{
                width: 16, height: 16, borderRadius: '50%', background: T.gold,
                animation: 'pulse-ring 0.8s ease-in-out infinite',
              }} />
            ) : phase === 'awaiting' ? (
              <Ear size={32} color={T.gold} />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.textMuted }} />
            )}
          </div>

          {/* Phase text */}
          <div style={{
            fontSize: 20, fontWeight: 400, fontFamily: T.serif, color: phaseColor,
            textAlign: 'center', transition: 'color 0.3s', minHeight: 30,
          }}>
            {phaseText[phase]}
          </div>

          {/* Feedback detail */}
          {phase === 'feedback' && feedback && (
            <div style={{
              fontSize: 13, color: T.textMed, fontFamily: T.sans, marginTop: 8,
              textAlign: 'center',
            }}>
              {feedback.direction === 'same' ? 'Both notes were the same pitch' :
                `${feedback.offsetCents}¢ ${feedback.direction}`}
            </div>
          )}

          {/* Note name (subtle) */}
          {phase !== 'idle' && (
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginTop: 12 }}>
              {currentNote}
            </div>
          )}
        </div>

        {/* Answer buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <AnswerButton
            label="Lower"
            icon={<ArrowDown size={24} />}
            color={T.slate || '#6b8e9f'}
            disabled={answersDisabled}
            onClick={() => handleAnswer('lower')}
            theme={T}
          />
          {mode === 'withUnison' && (
            <AnswerButton
              label="Same"
              icon={<Minus size={24} />}
              color={T.gold}
              disabled={answersDisabled}
              onClick={() => handleAnswer('same')}
              theme={T}
              narrow
            />
          )}
          <AnswerButton
            label="Higher"
            icon={<ArrowUp size={24} />}
            color={T.coral || '#d68383'}
            disabled={answersDisabled}
            onClick={() => handleAnswer('higher')}
            theme={T}
          />
        </div>

        {/* Running stats */}
        {rounds.length > 0 && (
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 20,
            fontSize: 12, color: T.textLight, fontFamily: T.sans,
            borderTop: `1px solid ${T.borderSoft}`, paddingTop: 12,
          }}>
            <span>{sessionCorrect}/{rounds.length} correct</span>
            {streak > 1 && <span>streak: {streak}</span>}
            {difficulty === 'adaptive' && staircase.reversals.length >= 6 && (
              <span>threshold: ~{staircaseThreshold(staircase)}¢</span>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── SUMMARY SCREEN ───
  if (screen === 'summary') {
    const lastSession = aggStats.sessions[aggStats.sessions.length - 1];
    if (!lastSession) return <div style={containerStyle}><button onClick={() => setScreen('setup')}>Back</button></div>;

    const pct = Math.round(lastSession.accuracy * 100);
    const pctColor = pct >= 80 ? T.success : pct >= 60 ? T.gold : T.coral;

    const prevSession = aggStats.sessions.length > 1 ? aggStats.sessions[aggStats.sessions.length - 2] : null;
    const thresholdDelta = prevSession?.threshold && lastSession.threshold
      ? prevSession.threshold - lastSession.threshold : null;

    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: T.gold, fontFamily: T.sans, marginBottom: 8 }}>
            Session Complete
          </div>
          <div style={{ fontSize: 56, fontWeight: 600, fontFamily: T.serif, color: pctColor }}>
            {pct}%
          </div>
          <div style={{ fontSize: 13, color: T.textMed, fontFamily: T.sans }}>
            {lastSession.rounds} rounds in {Math.floor((Date.now() - sessionStartRef.current) / 60000)}m
          </div>
        </div>

        {/* Threshold badge */}
        {lastSession.threshold != null && (
          <div style={{
            textAlign: 'center', marginBottom: 20, padding: '12px 16px',
            background: T.bgSoft, borderRadius: T.radiusMd, border: `1px solid ${T.border}`,
          }}>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginBottom: 4 }}>
              Your threshold this session
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: T.gold, fontFamily: T.serif }}>
              {lastSession.threshold}¢
            </div>
            {thresholdDelta != null && thresholdDelta !== 0 && (
              <div style={{
                fontSize: 12, color: thresholdDelta > 0 ? T.success : T.coral, fontFamily: T.sans, marginTop: 4,
              }}>
                {thresholdDelta > 0 ? `${thresholdDelta}¢ better` : `${Math.abs(thresholdDelta)}¢ wider`} than last session
              </div>
            )}
          </div>
        )}

        {/* Direction bias */}
        {lastSession.sharpAccuracy != null && lastSession.flatAccuracy != null && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: T.textLight, fontFamily: T.sans, marginBottom: 10 }}>
              Direction Bias
            </div>
            <BiasBar label="Sharp" pct={lastSession.sharpAccuracy} color={T.coral || '#d68383'} theme={T} />
            <BiasBar label="Flat" pct={lastSession.flatAccuracy} color={T.slate || '#6b8e9f'} theme={T} />
            {Math.abs((lastSession.sharpAccuracy || 0) - (lastSession.flatAccuracy || 0)) > 0.15 && (
              <div style={{
                fontSize: 12, color: T.warm, fontFamily: T.sans, marginTop: 8,
                padding: '8px 12px', background: `${T.warm}10`, borderRadius: T.radius,
              }}>
                {(lastSession.sharpAccuracy || 0) < (lastSession.flatAccuracy || 0)
                  ? 'You tend to miss sharp notes — practice listening for brightness'
                  : 'You tend to miss flat notes — practice listening for dullness'}
              </div>
            )}
          </div>
        )}

        {/* Accuracy by band */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: T.textLight, fontFamily: T.sans, marginBottom: 10 }}>
            Accuracy by Range
          </div>
          {BANDS.map(b => {
            const data = lastSession.byBand?.[b.key];
            if (!data || data[1] === 0) return null;
            const bandPct = Math.round(data[0] / data[1] * 100);
            return (
              <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 50, fontSize: 11, color: T.textMed, fontFamily: T.sans, textAlign: 'right' }}>
                  {b.label}
                </div>
                <div style={{ flex: 1, height: 8, background: T.borderSoft, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    width: `${bandPct}%`, height: '100%', borderRadius: 4,
                    background: bandPct >= 80 ? T.success : bandPct >= 60 ? T.gold : T.coral,
                    transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ width: 40, fontSize: 11, color: T.textMed, fontFamily: T.sans }}>
                  {bandPct}%
                </div>
              </div>
            );
          })}
        </div>

        {/* Response time */}
        {lastSession.avgResponseMs != null && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
            fontSize: 12, color: T.textLight, fontFamily: T.sans,
          }}>
            <Clock size={14} />
            Avg response: {(lastSession.avgResponseMs / 1000).toFixed(1)}s
            {lastSession.avgResponseMs < 1500 && <Zap size={12} color={T.gold} />}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={() => { setScreen('setup'); }} style={{
            flex: 1, padding: '12px 0', borderRadius: T.radiusMd,
            background: 'none', border: `1px solid ${T.border}`, color: T.textMed,
            fontSize: 13, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
          }}>
            New Session
          </button>
          {aggStats.sessions.length > 1 && (
            <button onClick={() => setScreen('history')} style={{
              flex: 1, padding: '12px 0', borderRadius: T.radiusMd,
              background: T.gold, color: '#fff', border: 'none',
              fontSize: 13, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
            }}>
              View History
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── HISTORY SCREEN ───
  if (screen === 'history') {
    const sessions = aggStats.sessions;
    const thresholdSessions = sessions.filter(s => s.threshold != null);

    // Cumulative bias
    const cumulativeSharpPct = aggStats.sharpTotal > 0 ? Math.round(aggStats.sharpCorrect / aggStats.sharpTotal * 100) : null;
    const cumulativeFlatPct = aggStats.flatTotal > 0 ? Math.round(aggStats.flatCorrect / aggStats.flatTotal * 100) : null;

    // Improvement
    const recent3 = thresholdSessions.slice(-3);
    const older3 = thresholdSessions.slice(-6, -3);
    const recentAvg = recent3.length > 0 ? Math.round(recent3.reduce((s, x) => s + x.threshold, 0) / recent3.length) : null;
    const olderAvg = older3.length > 0 ? Math.round(older3.reduce((s, x) => s + x.threshold, 0) / older3.length) : null;

    return (
      <div style={containerStyle}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => setScreen('setup')} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted,
            display: 'flex', alignItems: 'center', padding: 4,
          }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ fontSize: 22, fontWeight: 400, fontFamily: T.serif, color: T.textDark }}>
            Training History
          </div>
        </div>

        {/* Best threshold */}
        {aggStats.bestThreshold != null && (
          <div style={{
            textAlign: 'center', marginBottom: 20, padding: '16px',
            background: `${T.gold}10`, borderRadius: T.radiusMd, border: `1px solid ${T.gold}30`,
          }}>
            <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.sans, marginBottom: 4 }}>
              Best Threshold Ever
            </div>
            <div style={{ fontSize: 36, fontWeight: 600, color: T.gold, fontFamily: T.serif }}>
              {aggStats.bestThreshold}¢
            </div>
            {recentAvg != null && olderAvg != null && recentAvg < olderAvg && (
              <div style={{ fontSize: 12, color: T.success, fontFamily: T.sans, marginTop: 4 }}>
                <TrendingUp size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Improved {olderAvg - recentAvg}¢ over last sessions
              </div>
            )}
          </div>
        )}

        {/* Threshold chart (inline SVG) */}
        {thresholdSessions.length > 1 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: T.textLight, fontFamily: T.sans, marginBottom: 10 }}>
              Threshold Over Time
            </div>
            <ThresholdChart sessions={thresholdSessions} theme={T} />
          </div>
        )}

        {/* Cumulative direction bias */}
        {cumulativeSharpPct != null && cumulativeFlatPct != null && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: T.textLight, fontFamily: T.sans, marginBottom: 10 }}>
              Cumulative Direction Bias
            </div>
            <BiasBar label="Sharp" pct={cumulativeSharpPct / 100} color={T.coral || '#d68383'} theme={T} />
            <BiasBar label="Flat" pct={cumulativeFlatPct / 100} color={T.slate || '#6b8e9f'} theme={T} />
          </div>
        )}

        {/* Total stats */}
        <div style={{
          display: 'flex', gap: 16, marginBottom: 24, justifyContent: 'center',
        }}>
          <StatBadge value={aggStats.totalSessions} label="sessions" theme={T} />
          <StatBadge value={aggStats.totalRounds} label="rounds" theme={T} />
          <StatBadge
            value={aggStats.totalRounds > 0 ? `${Math.round(aggStats.totalCorrect / aggStats.totalRounds * 100)}%` : '—'}
            label="accuracy"
            theme={T}
          />
        </div>

        {/* Session list */}
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: T.textLight, fontFamily: T.sans, marginBottom: 10 }}>
          Recent Sessions
        </div>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          {[...sessions].reverse().slice(0, 20).map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
              borderBottom: `1px solid ${T.borderSoft}`, fontSize: 12, fontFamily: T.sans,
            }}>
              <div style={{ color: T.textLight, width: 65 }}>
                {new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
              <div style={{
                color: Math.round(s.accuracy * 100) >= 80 ? T.success : Math.round(s.accuracy * 100) >= 60 ? T.gold : T.coral,
                fontWeight: 600, width: 40,
              }}>
                {Math.round(s.accuracy * 100)}%
              </div>
              {s.threshold != null && (
                <div style={{ color: T.textMed }}>
                  {s.threshold}¢
                </div>
              )}
              <div style={{ color: T.textLight, marginLeft: 'auto' }}>
                {s.rounds}r · {s.difficulty || ''}
              </div>
            </div>
          ))}
        </div>

        {/* Reset */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => {
            if (confirm('Reset all training history? This cannot be undone.')) {
              const fresh = defaultStats();
              setAggStats(fresh);
              saveStats(fresh);
            }
          }} style={{
            background: 'none', border: 'none', color: T.textLight, fontSize: 11,
            fontFamily: T.sans, cursor: 'pointer', textDecoration: 'underline',
          }}>
            Reset History
          </button>
        </div>

        {/* Back */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => setScreen('setup')} style={{
            padding: '10px 24px', borderRadius: T.radiusMd,
            background: T.gold, color: '#fff', border: 'none',
            fontSize: 13, fontWeight: 600, fontFamily: T.sans, cursor: 'pointer',
          }}>
            New Session
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ─── Sub-Components ───

function SectionLabel({ label, theme: T }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
      color: T.gold, fontFamily: T.sans, marginBottom: 8,
    }}>
      {label}
    </div>
  );
}

function PillButton({ active, onClick, theme: T, children, wide, narrow }) {
  return (
    <button onClick={onClick} style={{
      padding: narrow ? '8px 10px' : '8px 14px',
      borderRadius: T.radius,
      background: active ? T.gold : 'transparent',
      color: active ? '#fff' : T.textMed,
      border: `1px solid ${active ? T.gold : T.border}`,
      fontSize: 12, fontWeight: active ? 600 : 400, fontFamily: T.sans,
      cursor: 'pointer', transition: 'all 0.2s',
      flex: wide ? 1 : undefined,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </button>
  );
}

function AnswerButton({ label, icon, color, disabled, onClick, theme: T, narrow }) {
  return (
    <button
      onPointerDown={(e) => { if (!disabled) { e.preventDefault(); onClick(); } }}
      style={{
        flex: narrow ? 0.7 : 1,
        padding: '20px 0',
        borderRadius: T.radiusMd,
        background: disabled ? T.bgSoft : `${color}12`,
        border: `2px solid ${disabled ? T.borderSoft : color}`,
        color: disabled ? T.textMuted : color,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {icon}
      <span style={{ fontSize: 13, fontWeight: 600, fontFamily: T.sans, letterSpacing: 1 }}>
        {label}
      </span>
    </button>
  );
}

function BiasBar({ label, pct, color, theme: T }) {
  const pctVal = Math.round((pct || 0) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <div style={{ width: 40, fontSize: 11, color: T.textMed, fontFamily: T.sans, textAlign: 'right' }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 10, background: T.borderSoft, borderRadius: 5, overflow: 'hidden' }}>
        <div style={{
          width: `${pctVal}%`, height: '100%', borderRadius: 5, background: color,
          transition: 'width 0.5s',
        }} />
      </div>
      <div style={{ width: 35, fontSize: 12, fontWeight: 600, color: T.textMed, fontFamily: T.sans }}>
        {pctVal}%
      </div>
    </div>
  );
}

function StatBadge({ value, label, theme: T }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: T.textDark, fontFamily: T.serif }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: T.textMuted, fontFamily: T.sans }}>{label}</div>
    </div>
  );
}

function ThresholdChart({ sessions, theme: T }) {
  const w = 480, h = 120, pad = 30;
  const thresholds = sessions.map(s => s.threshold);
  const maxT = Math.max(...thresholds, 30);
  const minT = Math.min(...thresholds, 1);

  const points = thresholds.map((t, i) => {
    const x = pad + (i / Math.max(thresholds.length - 1, 1)) * (w - pad * 2);
    const y = pad + (1 - (t - minT) / Math.max(maxT - minT, 1)) * (h - pad * 2);
    return { x, y, t };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
      {/* Grid lines */}
      {[minT, Math.round((maxT + minT) / 2), maxT].map(v => {
        const y = pad + (1 - (v - minT) / Math.max(maxT - minT, 1)) * (h - pad * 2);
        return (
          <g key={v}>
            <line x1={pad} y1={y} x2={w - pad} y2={y} stroke={T.borderSoft} strokeWidth={0.5} />
            <text x={pad - 4} y={y + 3} textAnchor="end" fill={T.textLight} fontSize={9} fontFamily={T.sans}>
              {v}¢
            </text>
          </g>
        );
      })}
      {/* Line */}
      <path d={linePath} fill="none" stroke={T.gold} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={T.gold} />
      ))}
      {/* Trend direction label */}
      {points.length >= 2 && (
        <text x={w - pad} y={h - 4} textAnchor="end" fill={T.textLight} fontSize={9} fontFamily={T.sans}>
          {thresholds[thresholds.length - 1] < thresholds[0] ? '↓ improving' : thresholds[thresholds.length - 1] > thresholds[0] ? '↑ widening' : '— stable'}
        </text>
      )}
    </svg>
  );
}

export default PitchDiscriminationTrainer;
