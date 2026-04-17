// Pool-based progression draw helper — used by embedded exercise widgets and
// anywhere a caller needs a "pick one progression from this curated pool,
// respecting scale compatibility" draw. NOT used by PracticeForge's matrix
// mode, which has its own SRS-weighted `drawRandom` for the full 40-entry
// library.
//
// Input: `pool` (array of progression ids), `scale` (PF scale id), optional
// `exclude` (current id, to avoid redrawing the same one twice in a row).
//
// Output: a progression id from the pool that supports the scale, or null if
// no pool entry is compatible. Callers should render a "No compatible
// progression for this scale" fallback when null.
//
// Behavior notes:
//   - Invalid ids (not in CHORD_PROGRESSIONS) are silently filtered out.
//   - `exclude` is honored only if at least one other compatible id exists;
//     with a single-item pool, the same id is returned (caller should hide
//     the "Draw new" button in that case).

import { CHORD_PROGRESSIONS } from './data/chordProgressions.js';

export function drawProgressionFromPool(pool, scale, exclude = null) {
  if (!Array.isArray(pool) || pool.length === 0 || !scale) return null;

  const allCompatible = pool
    .map(id => CHORD_PROGRESSIONS.find(p => p.id === id))
    .filter(p => p && Array.isArray(p.scales) && p.scales.includes(scale));

  if (allCompatible.length === 0) return null;

  const candidates = allCompatible.filter(p => p.id !== exclude);
  const fromSet = candidates.length > 0 ? candidates : allCompatible;
  return fromSet[Math.floor(Math.random() * fromSet.length)].id;
}

// Resolve a pool to the set of compatible progression ids — useful for
// caller-side decisions like "should we hide the Draw-new button because the
// pool has only one compatible option?"
export function compatibleFromPool(pool, scale) {
  if (!Array.isArray(pool) || !scale) return [];
  return pool
    .map(id => CHORD_PROGRESSIONS.find(p => p.id === id))
    .filter(p => p && Array.isArray(p.scales) && p.scales.includes(scale))
    .map(p => p.id);
}
