// ChordProgressionDisplay — pure-presentation banner chip row.
//
// Renders a color-coded chord chip row (unique chords, arrow-separated, with
// Roman numerals below), optional guitar fingerings, a form line that collapses
// consecutive repeats (e.g. 12-bar blues → "I7 ×4 · IV7 ×2 · ..."), and a
// vibe/bars footer. Takes already-resolved chords as a prop — caller does the
// resolve. No internal state.
//
// Used in two places:
//   1. PracticeForge card banner — passes `synthesisLine`, `practiceTip`,
//      `modalCallout`, and `lockChipSlot` (all PF-internal).
//   2. Embedded exercise cards via `<EmbeddedChordProgression>` — passes only
//      the core props; PF-only slots stay null.
//
// Extracted from PracticeForge.jsx:2375-2555 verbatim.

import React, { useMemo } from 'react';
import {
  normalizeNote, getColorForNote, ChordDiagram, CHORD_VOICINGS_MULTI,
} from './JungleTools.jsx';
import { uniqueChordNames } from './chordProgressionResolver.js';

// Strip quality-pin suffixes (Vmaj → V, ivmin → iv) from degree labels since
// those are resolver hints, not performer-facing notation. Keep explicit jazz
// notation (V7, iim7, Imaj7, iim7b5) — they carry a digit.
function displayRoman(r) {
  if (!r) return r;
  if (/\d/.test(r)) return r;
  return r.replace(/(maj|min|dim|aug)$/, '');
}

// Guitar fingering lookup with enharmonic fallback (A# → Bb, D# → Eb, G# → Ab)
// because the voicing library uses mixed sharp/flat spellings.
const ENHARMONIC_FLAT = { 'A#': 'Bb', 'D#': 'Eb', 'G#': 'Ab' };
function lookupVoicing(name) {
  if (CHORD_VOICINGS_MULTI[name]) return CHORD_VOICINGS_MULTI[name][0];
  const root = name.match(/^[A-G][#b]?/)?.[0];
  const rest = name.slice(root?.length || 0);
  const flat = ENHARMONIC_FLAT[root];
  if (flat && CHORD_VOICINGS_MULTI[flat + rest]) return CHORD_VOICINGS_MULTI[flat + rest][0];
  return null;
}

export function ChordProgressionDisplay({
  T,
  resolvedChords,             // [{ name: 'Am', root: 'A', roman: 'i' }, ...]
  name,                       // "Andalusian cadence"
  vibe = null,                // "Flamenco, Sultans of Swing, Hit the Road Jack"
  bars = null,                // 4 — used in footer line
  instrument = null,          // 'guitar' → show fingerings
  progColor = null,           // accent color — defaults to theme gold
  synthesisLine = null,       // PF-only composed prompt
  practiceTip = null,         // PF-only practice tip
  modalCallout = null,        // PF-only ear-training callout
  lockChipSlot = null,        // PF-only LockChip component (ReactNode)
}) {
  // Dedupe while preserving first-occurrence order + roman numeral
  const uniqueChords = useMemo(() => {
    const uniqueNames = uniqueChordNames(resolvedChords);
    return uniqueNames.map(n => resolvedChords.find(c => c.name === n));
  }, [resolvedChords]);

  const allChords = resolvedChords;
  const showForm = allChords.length > 5;
  const accent = progColor || T.gold || '#8b6db5';
  const showFingerings = instrument === 'guitar';

  // Compressed form line — consecutive runs of the same Roman numeral collapse
  // to "I7 ×4". Keeps abstract form readable at 12-bar density.
  const runs = useMemo(() => {
    if (!showForm) return [];
    const out = [];
    for (const c of allChords) {
      const label = c.roman || c.name;
      if (out.length && out[out.length - 1].label === label) {
        out[out.length - 1].count += 1;
      } else {
        out.push({ label, count: 1 });
      }
    }
    return out;
  }, [allChords, showForm]);

  if (!resolvedChords || resolvedChords.length === 0) {
    return null;
  }

  return (
    <div style={{
      marginTop: 18,
      padding: '14px 16px 16px',
      background: `${accent}0f`,
      border: `1px solid ${accent}40`,
      borderRadius: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        fontSize: 9, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase',
        color: accent, marginBottom: 10, fontFamily: T.sans,
      }}>
        <span>Progression</span>
        <span style={{ color: T.textLight, fontWeight: 500, letterSpacing: 0.4, textTransform: 'none' }}>
          · {name}
        </span>
        <span style={{ flex: 1 }} />
        {lockChipSlot}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {uniqueChords.map((c, i) => {
          const cc = getColorForNote(normalizeNote(c.root)) || accent;
          const roman = displayRoman(c.roman);
          return (
            <React.Fragment key={c.name}>
              {i > 0 && (
                <span style={{ color: T.textLight, fontFamily: T.sans, fontSize: 13, opacity: 0.6, paddingTop: 9 }}>→</span>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{
                  padding: '5px 12px', borderRadius: 6,
                  border: `1.5px solid ${cc}`,
                  color: cc, background: `${cc}10`,
                  fontFamily: T.serif, fontWeight: 600, fontSize: 17,
                  lineHeight: 1, letterSpacing: 0.3,
                }}>{c.name}</span>
                {roman && (
                  <span style={{
                    fontFamily: T.sans, fontSize: 9, fontWeight: 600,
                    color: T.textLight, letterSpacing: 0.5,
                  }}>{roman}</span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {showFingerings && uniqueChords.length > 0 && (() => {
        const shapes = uniqueChords
          .map(c => ({ name: c.name, voicing: lookupVoicing(c.name) }))
          .filter(s => s.voicing);
        if (shapes.length === 0) return null;
        return (
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14,
            paddingTop: 12, borderTop: `1px dashed ${accent}20`,
          }}>
            {shapes.map(s => (
              <div key={s.name} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <ChordDiagram theme={T} frets={s.voicing.frets} name={s.name} />
                {s.voicing.pos && s.voicing.pos !== 'Open' && (
                  <span style={{
                    fontFamily: T.sans, fontSize: 9, color: T.textLight,
                    marginTop: -4, letterSpacing: 0.3,
                  }}>{s.voicing.pos}</span>
                )}
              </div>
            ))}
          </div>
        );
      })()}

      {showForm && (
        <div style={{
          marginTop: 10, fontSize: 11, color: T.textMed,
          fontFamily: T.sans, lineHeight: 1.5,
        }}>
          <span style={{ color: T.textLight, fontWeight: 600, marginRight: 6 }}>Form:</span>
          {runs.map(r => r.count > 1 ? `${r.label} ×${r.count}` : r.label).join(' · ')}
        </div>
      )}

      {synthesisLine && (
        <div style={{
          marginTop: 12, paddingTop: 10,
          borderTop: `1px dashed ${accent}30`,
          fontFamily: T.serif, fontSize: 14, color: T.textDark,
          lineHeight: 1.55,
        }}>
          {synthesisLine}
        </div>
      )}

      {practiceTip && (
        <div style={{
          marginTop: 8, padding: '8px 10px',
          background: `${accent}08`,
          borderLeft: `2.5px solid ${accent}80`,
          borderRadius: 3,
          fontFamily: T.sans, fontSize: 12, color: T.textDark,
          lineHeight: 1.55,
        }}>
          {practiceTip}
        </div>
      )}

      {modalCallout && (
        <div style={{
          marginTop: 8, fontSize: 11, color: T.textMed,
          fontFamily: T.sans, lineHeight: 1.5,
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.goldDark, letterSpacing: 0.8, textTransform: 'uppercase', marginRight: 6 }}>Ear:</span>
          {modalCallout}
        </div>
      )}

      {(vibe || bars) && (
        <div style={{
          marginTop: 8, fontSize: 11.5, color: T.textMed,
          fontFamily: T.sans, fontStyle: 'italic', lineHeight: 1.5,
        }}>
          {vibe}
          {vibe && bars && ' · '}
          {bars && `${bars} bar${bars === 1 ? '' : 's'} — cycle through the changes.`}
        </div>
      )}
    </div>
  );
}
