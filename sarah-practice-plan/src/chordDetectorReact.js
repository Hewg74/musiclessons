/**
 * chordDetectorReact.js
 *
 * Shared React-side helpers for the chord detector engine. One module,
 * three consumers (Tools panel, ExerciseCard listener, PracticeForge tool).
 *
 * Exports:
 *   CONFIRM_MS, MIN_CONFIDENCE  — auto-tick thresholds
 *   qualityBucket(quality)       — 'maj' | 'min' | 'dim' | 'aug'
 *   matchesTargetChord(target, chord)
 *                                — bare-letter "G"/"Am" tolerance + explicit
 *                                  "G7"/"Am7" exact-match. Dim/aug never tick
 *                                  bare-letter targets (transient noise).
 *   useChordTargetChecklist(targets, chord)
 *                                — auto-tick state machine with 200 ms drift
 *                                  grace so brief detection blips don't reset
 *                                  in-flight sustain timers.
 *   useChordEngine()             — subscribes to the engine + exposes a toggle.
 *                                  Lazy-imports the engine module on first
 *                                  call so non-listener bundles stay light.
 *
 * The engine is dynamic-imported inside useChordEngine so consumers (App.jsx,
 * PracticeForge.jsx) can static-import this helper without pulling the engine
 * into their initial chunk. Vite splits the engine into a shared chunk used
 * by all three consumers.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ─── Sustain auto-tick constants ────────────────────────────────────────────
export const CONFIRM_MS = 600;        // continuous match required to confirm
export const MIN_CONFIDENCE = 0.7;    // engine confidence floor
export const DRIFT_GRACE_MS = 200;    // ignore detection blips shorter than this

// ─── Quality buckets (kept in sync with engine QUALITY_INTERVALS) ───────────
const MAJOR_QUALITIES = new Set(['maj', '7', 'maj7', 'maj7no5', '7no5', '6', 'add9', '9', 'maj9', '9no5', 'maj9no5', '6/9', 'sus2', 'sus4', '7sus4', '5']);
const MINOR_QUALITIES = new Set(['min', 'm7', 'mMaj7', 'mMaj7no5', 'm7no5', 'm6', 'mAdd9', 'm9', 'm9no5', 'm7b5']);
const DIM_QUALITIES = new Set(['dim', 'dim7']);
const AUG_QUALITIES = new Set(['aug', '7#5', '7b5']);

export function qualityBucket(quality) {
  if (MINOR_QUALITIES.has(quality)) return 'min';
  if (DIM_QUALITIES.has(quality)) return 'dim';
  if (AUG_QUALITIES.has(quality)) return 'aug';
  if (MAJOR_QUALITIES.has(quality)) return 'maj';
  return 'maj'; // unknown qualities fall back to major bucket
}

// True iff the player's chord matches the target chord name.
//   exact match: "G7" target only matches "G7" chord
//   bare letter "G" matches G, G7, Gmaj7, G6, G9, Gsus, etc. — but NOT Gdim/Gaug
//   bare "Am" matches Am, Am7, Am9, etc. — but NOT Adim/Aaug
export function matchesTargetChord(target, chord) {
  if (!chord || !chord.name) return false;
  if (target === chord.name) return true;
  const targetRoot = target.match(/^[A-G][#b]?/)?.[0];
  if (!targetRoot || targetRoot !== chord.root) return false;
  const targetIsExplicit = /\d|sus|dim|aug|maj/.test(target);
  if (targetIsExplicit) return false;
  const bucket = qualityBucket(chord.quality);
  if (bucket === 'dim' || bucket === 'aug') return false;
  const targetIsMinor = /^[A-G][#b]?m$/.test(target);
  return targetIsMinor ? bucket === 'min' : bucket === 'maj';
}

// ─── Auto-tick state machine ───────────────────────────────────────────────
// Per-target sustain timers; transition pending → confirmed when the chord has
// been continuously matched for ≥CONFIRM_MS at ≥MIN_CONFIDENCE. The DRIFT_GRACE
// tolerance lets short detection blips pass without wiping in-flight timers —
// the player's true sustained chord usually re-locks within a frame or two.
export function useChordTargetChecklist(targets, chord) {
  const [confirmed, setConfirmed] = useState({});
  const sustainStartRef = useRef({});
  const driftStartRef = useRef(0);

  // Try explicit chord names first (e.g. "Am7" before "Am") so the actual
  // voicing the player produced gets credit instead of an over-eager bare letter.
  const sortedTargets = useMemo(() => {
    if (!targets) return [];
    return [...targets].sort((a, b) => {
      const aExplicit = /\d|sus|dim|aug|maj/.test(a) ? 0 : 1;
      const bExplicit = /\d|sus|dim|aug|maj/.test(b) ? 0 : 1;
      return aExplicit - bExplicit;
    });
  }, [targets]);

  useEffect(() => {
    if (!targets || !targets.length || !chord || chord.confidence < MIN_CONFIDENCE) return;
    const now = performance.now();
    const matchKey = sortedTargets.find(t => matchesTargetChord(t, chord));

    if (!matchKey) {
      // Drift: don't wipe in-flight timers immediately — only after the
      // detector has insisted on a non-match for >DRIFT_GRACE_MS.
      if (driftStartRef.current === 0) driftStartRef.current = now;
      else if (now - driftStartRef.current > DRIFT_GRACE_MS) sustainStartRef.current = {};
      return;
    }

    driftStartRef.current = 0;
    if (confirmed[matchKey]) return;
    if (!sustainStartRef.current[matchKey]) {
      sustainStartRef.current[matchKey] = now;
    } else if (now - sustainStartRef.current[matchKey] >= CONFIRM_MS) {
      // Time-driven transition guarded by confirmed[matchKey] above so this
      // fires exactly once per target. The lint rule's general guidance about
      // setState-in-effect doesn't fit time-thresholded confirmations.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConfirmed(prev => ({ ...prev, [matchKey]: true }));
    }
  }, [chord, targets, sortedTargets, confirmed]);

  const reset = useCallback(() => {
    setConfirmed({});
    sustainStartRef.current = {};
    driftStartRef.current = 0;
  }, []);

  return { confirmed, reset };
}

// ─── Engine subscription hook ──────────────────────────────────────────────
// Lazy-loads the engine module on first call. Returns the engine state plus
// a toggle that calls the engine's start/stop. The engine is a refcounted
// singleton — many useChordEngine consumers can coexist without fighting.
export function useChordEngine() {
  const [chord, setChord] = useState(null);
  const [listening, setListening] = useState(false);
  const [signalLevel, setSignalLevel] = useState(0);
  const [signalDb, setSignalDb] = useState(-Infinity);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const engineModRef = useRef(null);

  useEffect(() => {
    let unsub = null;
    let cancelled = false;
    import('./chordDetectorEngine.js').then(mod => {
      if (cancelled) return;
      engineModRef.current = mod;
      setIsReady(true);
      unsub = mod.subscribeToChord(u => {
        setChord(u.currentChord);
        setListening(u.isListening);
        setSignalLevel(u.signalLevel || 0);
        setSignalDb(u.signalDb);
        setError(u.error?.message || null);
      });
    }).catch(e => {
      if (!cancelled) setError(`engine load failed: ${e.message || e}`);
    });
    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, []);

  const toggle = useCallback(async () => {
    const mod = engineModRef.current;
    if (!mod) return;
    setError(null);
    try {
      if (mod.isEngineRunning()) await mod.stopEngine();
      else await mod.startEngine();
    } catch (e) {
      setError(e?.message || String(e));
    }
  }, []);

  return { chord, listening, signalLevel, signalDb, error, isReady, toggle };
}
