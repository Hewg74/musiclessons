// ChordProgressionChecklist — live chord detector + per-chord tick-off widget.
//
// Renders:
//   - Live detected-chord readout with color-coded display (name + confidence)
//   - Signal meter (dB + level bar)
//   - Listen / idle toggle button
//   - Per-target confirmation chips with tick state
//   - Progression name header + "X / N confirmed" counter
//
// Uses `useChordEngine` (refcounted singleton) + `useChordTargetChecklist` hooks
// from chordDetectorReact.js. The checklist confirmed-state map resets when
// `instanceId` changes — pass the PF cardId OR an incrementing counter (from
// "Draw new progression") to trigger a clean restart.
//
// Extracted from PracticeForge.jsx:3205-3407 ForgeChordListener (progression
// mode only). The narrow key-match fallback (for cards with no progression)
// stays in PF — not relevant to embedded curriculum use.
//
// Safe to mount in multiple places on a page — useChordEngine is a refcounted
// singleton, so competing consumers share one mic stream.
//
// Returns null when `progressionTargets` is empty/null so callers can always
// render it unconditionally.

import React, { useEffect } from 'react';
import { useChordEngine, useChordTargetChecklist } from './chordDetectorReact.js';
import { normalizeNote, getColorForNote } from './JungleTools.jsx';

export function ChordProgressionChecklist({
  T,
  progressionTargets,       // ['Am', 'G', 'F', 'E'] — chord names to tick
  progressionName = null,   // "Andalusian cadence" (optional header)
  instanceId,               // changes on draw-new or card change → reset
}) {
  const { chord, listening, signalLevel, signalDb, error, isReady, toggle: handleToggle } = useChordEngine();
  const targets = progressionTargets || [];
  const hasTargets = targets.length > 0;

  // Hook must be called unconditionally for stable hook order; it's a no-op
  // when targets is null/empty (no matches will tick).
  const { confirmed, reset: resetChecklist } = useChordTargetChecklist(
    hasTargets ? targets : null,
    chord
  );

  useEffect(() => {
    resetChecklist();
  }, [instanceId, resetChecklist]);

  if (!hasTargets) return null;

  const meterPct = Math.max(0, Math.min(100, signalLevel * 100));
  const dbLabel = signalDb && isFinite(signalDb) ? `${Math.round(signalDb)} dB` : '— dB';
  const chordColor = chord ? getColorForNote(chord.root) : T.textMuted;
  const confirmedCount = targets.filter(t => confirmed[t]).length;
  const complete = confirmedCount === targets.length;

  return (
    <div>
      {/* Live chord readout + listen button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: T.serif, fontSize: 32, lineHeight: 1, color: chordColor, fontWeight: 600 }}>
            {chord ? chord.name : '—'}
          </span>
          {chord && (
            <span style={{ fontFamily: T.sans, fontSize: 11, color: T.textMed }}>
              {Math.round(chord.confidence * 100)}%
            </span>
          )}
          <span style={{ flex: 1 }} />
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: T.sans, fontSize: 9, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
            color: listening ? T.textDark : T.textMuted,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: listening ? '#22c55e' : T.textMuted,
              boxShadow: listening ? '0 0 5px #22c55e' : 'none',
            }} />
            {listening ? 'LIVE' : 'IDLE'}
          </span>
        </div>
        <button onClick={handleToggle} disabled={!isReady} style={{
          background: listening ? T.gold : 'transparent', color: listening ? '#fff' : T.goldDark,
          border: `1.5px solid ${T.gold}`, borderRadius: 8, padding: '7px 14px',
          fontFamily: T.sans, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2,
          cursor: isReady ? 'pointer' : 'wait', whiteSpace: 'nowrap',
        }}>{listening ? 'Listening' : 'Listen'}</button>
      </div>

      {/* Signal meter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 5, background: T.goldSoft, borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${meterPct}%`, background: T.gold, transition: 'width 80ms linear' }} />
        </div>
        <span style={{ fontFamily: T.sans, fontSize: 9, color: T.textMed, whiteSpace: 'nowrap', minWidth: 38, textAlign: 'right' }}>{dbLabel}</span>
      </div>

      {/* Progression checklist */}
      <div style={{
        padding: '10px 12px 12px',
        background: complete ? T.successSoft : T.bgSoft,
        border: `1px solid ${complete ? T.success + '40' : T.borderSoft}`,
        borderRadius: 8,
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8,
          fontSize: 10, fontWeight: 700, color: T.textDark,
          fontFamily: T.sans, letterSpacing: 0.4,
        }}>
          <strong style={{ letterSpacing: 1.0, textTransform: 'uppercase', fontSize: 9, color: T.goldDark }}>
            Progression check
          </strong>
          {progressionName && (
            <span style={{ color: T.textMed, fontWeight: 500 }}>
              {progressionName}
            </span>
          )}
          <span style={{ flex: 1 }} />
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
            color: complete ? T.success : T.textMed,
          }}>
            {confirmedCount} / {targets.length} confirmed
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {targets.map(name => {
            const root = name.match(/^[A-G][#b]?/)?.[0];
            const cc = (root && getColorForNote(normalizeNote(root))) || T.textMuted;
            const isConfirmed = !!confirmed[name];
            return (
              <span key={name} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 9px', borderRadius: 6,
                border: `1.5px solid ${isConfirmed ? cc : `${cc}55`}`,
                background: isConfirmed ? `${cc}1f` : 'transparent',
                color: isConfirmed ? cc : T.textMed,
                fontFamily: T.serif, fontWeight: 600, fontSize: 13,
                opacity: isConfirmed ? 1 : 0.75,
                transition: 'all 0.2s',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: isConfirmed ? cc : 'transparent',
                  border: isConfirmed ? 'none' : `1.2px solid ${cc}80`,
                  boxShadow: isConfirmed ? `0 0 4px ${cc}80` : 'none',
                  flexShrink: 0,
                }} />
                {name}
              </span>
            );
          })}
        </div>
        <div style={{
          marginTop: 8, fontSize: 10.5, color: T.textLight,
          fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.4,
        }}>
          Play each chord for ≥600 ms to tick it off. Bare letters accept any quality (G matches G, G7, Gmaj7). Explicit targets (G7) demand exact match.
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 10, fontSize: 11, color: T.coral, fontFamily: T.sans }}>
          ⚠ {error}
        </div>
      )}
      <div style={{ marginTop: 10, fontSize: 10, color: T.textMuted, fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.5 }}>
        Strums + open chords detect best. Single-note phrases will read as the dominant chord they imply.
      </div>
    </div>
  );
}
