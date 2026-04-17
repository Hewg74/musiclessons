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

// Guitar fingering lookup with two fallback layers:
//   1. Enharmonic spelling (A# ↔ Bb, D# ↔ Eb, G# ↔ Ab, C# ↔ Db, F# ↔ Gb).
//   2. Extension-strip to base triad — e.g. Cm9 → Cm, Cadd9 → C, Dmaj9 → Dmaj7
//      → D. This lets beautiful-extension progressions (Khruangbin m9, bossa
//      add9, dream-pop maj9) still show a playable fingering even when the
//      exact extension voicing isn't in the library. The chord NAME at the top
//      of the banner stays accurate — only the diagram approximates.
const ENHARMONIC_FLAT = { 'A#': 'Bb', 'D#': 'Eb', 'G#': 'Ab', 'C#': 'Db', 'F#': 'Gb' };
const ENHARMONIC_SHARP = { 'Bb': 'A#', 'Eb': 'D#', 'Ab': 'G#', 'Db': 'C#', 'Gb': 'F#' };

function _tryLookup(root, rest) {
  return CHORD_VOICINGS_MULTI[root + rest]?.[0] || null;
}

function lookupVoicing(name) {
  const root = name.match(/^[A-G][#b]?/)?.[0];
  if (!root) return null;
  const rest = name.slice(root.length);
  const altRoot = ENHARMONIC_FLAT[root] || ENHARMONIC_SHARP[root];

  // Try exact + enharmonic first.
  const exact = _tryLookup(root, rest) || (altRoot && _tryLookup(altRoot, rest));
  if (exact) return exact;

  // Extension-strip fallback. Try progressively shorter quality suffixes.
  // Order matters: longer/more-specific first so m7b5 stays m7b5 (not stripped to m).
  // Keep the base quality (m, maj7, dim, aug, sus2, sus4) so the fingering
  // matches the chord's basic color.
  const fallbackQualities = ['m7b5', 'm7', 'maj7', 'sus4', 'sus2', '7', 'dim', 'aug', 'm', ''];
  for (const q of fallbackQualities) {
    if (q === rest) continue; // already tried as exact
    const match = _tryLookup(root, q) || (altRoot && _tryLookup(altRoot, q));
    if (match) return { ...match, pos: `${match.pos || ''} (≈ ${rest || 'triad'})`.trim() };
  }
  return null;
}

// Pretty-print the scale id for the banner subtitle: "natural-minor" →
// "Natural Minor", "phrygian-dominant" → "Phrygian Dominant".
function formatScale(scale) {
  if (!scale) return '';
  return scale.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export function ChordProgressionDisplay({
  T,
  resolvedChords,             // [{ name: 'Am', root: 'A', roman: 'i' }, ...]
  name,                       // "Andalusian cadence"
  keyRoot = null,             // "A" — displayed as "A Natural Minor" context header
  scale = null,               // "natural-minor" → prettified
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
      marginTop: 28,
      paddingTop: 18,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap',
        fontSize: 9, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase',
        color: accent, marginBottom: 14, fontFamily: T.sans,
      }}>
        <span>Progression</span>
        <span style={{ color: T.textLight, fontWeight: 500, letterSpacing: 0.4, textTransform: 'none' }}>
          · {name}
        </span>
        {keyRoot && scale && (
          <span style={{
            color: T.textMed, fontWeight: 600, letterSpacing: 0.4,
            textTransform: 'none', fontSize: 11,
          }}>
            · in {keyRoot} {formatScale(scale)}
          </span>
        )}
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{
                  padding: '9px 16px', borderRadius: 10,
                  border: `1.5px solid ${cc}`,
                  color: cc, background: `${cc}1c`,
                  fontFamily: T.serif, fontWeight: 600, fontSize: 19,
                  lineHeight: 1, letterSpacing: 0.3,
                  boxShadow: `0 1px 4px ${cc}18`,
                  minWidth: 44, textAlign: 'center',
                }}>{c.name}</span>
                {roman && (
                  <span style={{
                    fontFamily: T.sans, fontSize: 9, fontWeight: 700,
                    color: cc, letterSpacing: 0.8, opacity: 0.75,
                    textTransform: 'uppercase',
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
          marginTop: 10,
          fontFamily: T.sans, fontSize: 12, color: T.textMed,
          lineHeight: 1.6, fontStyle: 'italic',
        }}>
          <span style={{
            fontSize: 9, fontWeight: 700, color: accent, letterSpacing: 1.2,
            textTransform: 'uppercase', marginRight: 8, fontStyle: 'normal',
          }}>Pro tip</span>
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
