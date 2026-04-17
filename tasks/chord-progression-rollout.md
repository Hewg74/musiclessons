# Chord Progression Dimension — Implementation Handoff

**For:** A fresh Claude session continuing this work.
**Status (2026-04-16 update):** **Phases 1–4 shipped to master.** Phase 5 (card text / synthesis polish) partially addressed via `composeProgressionSynthesis` at PF.jsx:552-647. Phase 6 (drone wheel pulse) deferred/optional. **Next work**: component extraction per `tasks/curriculum-progression-integration-proposal.md` — extract banner chip row + listener tick-off as reusable components, embed in exercise cards via `ex.chordProgression` field.
**Last commit on master:** `7925e3b` (chord detector M2/M3/n3 fixes — refactor to shared hook). Subsequent commits shipped Phases 1–4.
**Repo:** `C:\Users\hewg7\Documents\GitHub\musiclessons\sarah-practice-plan\`

## Phase-by-phase status

| Phase | Status | Evidence |
|---|---|---|
| Phase 1 — Resolver + library | ✅ Shipped | `src/chordProgressionResolver.js`, `src/data/chordProgressions.js` exist |
| Phase 2 — Wire `chordProgression` as dim | ✅ Shipped | PF.jsx:1051 (DIMENSIONS registration), :1541, :2053 (RANDOM_DIM_IDS) |
| Phase 3 — Card UI chip row | ✅ Shipped | PF.jsx:2375-2472 (banner render + dedup + form compression) |
| Phase 4 — ForgeChordListener progression targets | ✅ Shipped | PF.jsx:3120-3284 (`ForgeChordListener` takes `progressionTargets`, uses `useChordTargetChecklist`, renders interactive checklist) |
| Phase 5 — Card text composition | ⚠️ Partial | `composeProgressionSynthesis` at PF.jsx:552-647 composes progression × other dims; `composeProgressionPracticeTip` at :654+ |
| Phase 6 — Drone wheel pulse | ⏸️ Deferred | Optional polish; not prioritized |

## TL;DR

Add a new `chordProgression` constraint dimension to PracticeForge. Rolled into the matrix-mode random pool (alongside texture, harmonicTarget, etc.). Progressions defined in **scale-degree notation** and resolved per-card against the active key + scale. ~40 progressions across pop / minor / jazz / blues / modal / world buckets. Composes with existing texture / pickingHand / harmonicTarget dims (each becomes "do that thing OVER this progression"). Hook up to existing `useChordTargetChecklist` from `src/chordDetectorReact.js` so the chord detector ticks each chord as the player nails it.

## What's already shipped (do NOT redo)

- `src/chordDetectorEngine.js` — DSP + singleton mic engine. Exports: `subscribeToChord`, `startEngine`, `stopEngine`, `isEngineRunning`. `currentChord` shape: `{ name, root, quality, confidence, rawScore }`.
- `src/chordDetectorReact.js` — shared React-side helpers. Exports:
  - `useChordEngine()` → `{ chord, listening, signalLevel, signalDb, error, isReady, toggle }`
  - `useChordTargetChecklist(targets, chord)` → `{ confirmed, reset }` — auto-tick state machine with 600ms sustain + 200ms drift grace
  - `matchesTargetChord(target, chord)` — bare-letter "G"/"Am" tolerance, explicit "G7"/"Am7" exact, dim/aug never tick bare letters
  - `qualityBucket(quality)` → `'maj' | 'min' | 'dim' | 'aug'`
  - `CONFIRM_MS = 600`, `MIN_CONFIDENCE = 0.7`, `DRIFT_GRACE_MS = 200`
- `src/ChordDetectorPanel.jsx` — full Tools-tab panel.
- `src/PracticeForge.jsx` — `ForgeChordListener` component (line ~2740) that currently shows live chord + a narrow "key-match" verification (just whether you played the tonic chord). **You will REPLACE the narrow key-match logic with progression-aware verification.**

## Architecture decisions (locked)

### 1. Scale-degree notation, resolved per-card

Progressions are stored as Roman-numeral degrees plus optional quality overrides:

```js
{
  id: 'andalusian',
  name: 'Andalusian cadence',
  degrees: ['i', 'bVII', 'bVI', 'V'],   // V is intentionally major (leading tone)
  scales: ['harmonic-minor', 'phrygian-dominant'],  // PF scale ids — see SCALE_TYPES
  vibe: 'flamenco, Sultans of Swing intro',
  bars: 4,
}
```

At card-draw time, `resolveProgression(prog, key, scale)` produces `[{name: 'Am'}, {name: 'G'}, {name: 'F'}, {name: 'E'}]`. The detector matches these via the existing `matchesTargetChord`.

### 2. Resolver math

Each scale defines the chord quality at each scale-degree position:

```js
const SCALE_DEGREE_QUALITIES = {
  // 7-note scales: I ii iii IV V vi vii
  'major':            ['maj','min','min','maj','maj','min','dim'],
  'natural-minor':    ['min','dim','maj','min','min','maj','maj'],
  'harmonic-minor':   ['min','dim','aug','min','maj','maj','dim'],
  'melodic-minor':    ['min','min','aug','maj','maj','dim','dim'],
  'dorian':           ['min','min','maj','maj','min','dim','maj'],
  'phrygian':         ['min','maj','maj','min','dim','maj','min'],
  'lydian':           ['maj','maj','min','dim','maj','min','min'],
  'mixolydian':       ['maj','min','dim','maj','min','min','maj'],
  'locrian':          ['dim','maj','min','min','maj','maj','min'],
  'phrygian-dominant':['maj','maj','dim','min','dim','maj','min'],
  'hungarian-minor':  ['min','maj','min','dim','maj','maj','dim'],   // approx
  'double-harmonic':  ['maj','maj','min','min','maj','maj','dim'],   // approx
};

const SCALE_INTERVALS_FROM_PF = {
  // Use SCALE_TYPES[scale].intervals from ColorMusicTrainer.jsx — already imported in PracticeForge.jsx line 8.
  // No need to re-define; reach into SCALE_TYPES.
};
```

**Degree parser** handles:
- `I`, `II`, `III`, `IV`, `V`, `VI`, `VII` (uppercase = bare, scale-native quality)
- `i`, `ii`, `iii`, etc. (lowercase = bare, scale-native quality — the case is just visual; the position is what matters)
- `bII`, `bIII`, `bVI`, `bVII`, `#IV`, `#iv` (chromatic alteration: shift the position by ±1 semitone, keep scale-native quality unless overridden)
- `Imaj7`, `iim7`, `V7`, `iim7b5`, `Vmaj9`, `bVII7` etc. (everything after the Roman numeral is an explicit quality override matching the engine's quality vocabulary)

```js
function parseDegree(deg) {
  const m = deg.match(/^([b#]?)([IiVv]+)(.*)$/);
  if (!m) throw new Error(`Bad degree: ${deg}`);
  const [, accidental, roman, override] = m;
  const positions = { I:0, II:1, III:2, IV:3, V:4, VI:5, VII:6, i:0, ii:1, iii:2, iv:3, v:4, vi:5, vii:6 };
  const semitoneShift = accidental === 'b' ? -1 : accidental === '#' ? 1 : 0;
  return { position: positions[roman], semitoneShift, override: override || null };
}

function resolveDegree(deg, key, scale) {
  const { position, semitoneShift, override } = parseDegree(deg);
  const intervals = SCALE_TYPES[scale]?.intervals;
  if (!intervals || position >= intervals.length) return null;
  const semitones = intervals[position] + semitoneShift;
  const root = pcAdd(key, semitones);   // 12-tone math, see ChordDetectorPanel.jsx pcAdd helper
  const nativeQ = SCALE_DEGREE_QUALITIES[scale]?.[position] || 'maj';
  // Override is the engine quality string ('m7', 'maj7', '7', 'sus4', '7b5', etc.)
  // If no override, build the bare chord name from the native quality:
  //   'maj' → root only ('G'); 'min' → root + 'm' ('Gm'); 'dim' → root + 'dim'; 'aug' → root + 'aug'
  if (override) return { name: root + override, root };
  if (nativeQ === 'maj') return { name: root, root };
  if (nativeQ === 'min') return { name: root + 'm', root };
  if (nativeQ === 'dim') return { name: root + 'dim', root };
  if (nativeQ === 'aug') return { name: root + 'aug', root };
}

function resolveProgression(prog, key, scale) {
  return prog.degrees.map(d => resolveDegree(d, key, scale)).filter(Boolean);
}
```

### 3. The progression library (~40 entries)

Create `src/data/chordProgressions.js`. Below is the launch set — paste verbatim, then iterate.

```js
// All progressions are scale-degree notation. resolveProgression() in
// chordProgressionResolver.js produces the actual chord names per card.
//
// Quality conventions:
//   bare degrees (I, ii, V) → use scale-native quality (see SCALE_DEGREE_QUALITIES)
//   suffixed (V7, iim7, Imaj7) → engine quality string overrides the native
//   accidentals (bII, bVII, #IV) → shift root by ±1 semitone, keep native quality
//
// scales: list of PF scale ids the progression makes musical sense in.
//         Cards whose scale isn't in the list won't draw this progression.
//         (Pentatonic-only scales never draw progressions — there's no diatonic 7-chord set.)
//
// vibe: short reference for the guidance / card subtitle.
//
// bars: typical bar length when looped. Used for hint text only.

export const CHORD_PROGRESSIONS = [
  // ─── Pop / rock major ───
  { id: 'pop_axis',         name: 'Pop axis (I–V–vi–IV)',        degrees: ['I','V','vi','IV'],          scales: ['major','lydian'],                      vibe: 'Coldplay, Journey, Axis of Awesome',           bars: 4 },
  { id: 'pop_vi_iv_i_v',    name: 'vi–IV–I–V',                   degrees: ['vi','IV','I','V'],          scales: ['major'],                               vibe: 'Anthemic indie pop',                           bars: 4 },
  { id: 'fifties_doowop',   name: '50s doo-wop (I–vi–IV–V)',     degrees: ['I','vi','IV','V'],          scales: ['major'],                               vibe: 'Standby, "Stand by Me", early rock & roll',    bars: 4 },
  { id: 'three_chord_major',name: '3-chord (I–IV–V)',            degrees: ['I','IV','V'],               scales: ['major','mixolydian'],                  vibe: 'Folk, country, punk — the universal',          bars: 3 },
  { id: 'jangle',           name: 'Jangle (I–iii–vi–IV)',        degrees: ['I','iii','vi','IV'],        scales: ['major'],                               vibe: 'Smiths, Real Estate, Beach House',             bars: 4 },
  { id: 'pachelbel',        name: 'Pachelbel (I–V–vi–iii–IV–I–IV–V)', degrees: ['I','V','vi','iii','IV','I','IV','V'], scales: ['major'],                vibe: 'Canon in D, "Cryin\'" by Aerosmith',           bars: 8 },
  { id: 'i_iv_only',        name: 'Two-chord vamp (I–IV)',       degrees: ['I','IV'],                   scales: ['major','mixolydian','dorian'],         vibe: 'DOPE LEMON, surf, beach pop',                  bars: 2 },

  // ─── Modal ───
  { id: 'mixo_swing',       name: 'Mixolydian (I–bVII–IV)',      degrees: ['I','bVII','IV'],            scales: ['mixolydian','major'],                  vibe: 'Sweet Child O\' Mine intro, Allman Brothers',  bars: 3 },
  { id: 'lydian_lift',      name: 'Lydian lift (I–II)',          degrees: ['I','II'],                   scales: ['lydian'],                              vibe: 'Steve Miller "Fly Like an Eagle", dreamy',     bars: 2 },
  { id: 'phrygian_cadence', name: 'Phrygian (bII–i)',            degrees: ['bII','i'],                  scales: ['phrygian','phrygian-dominant'],        vibe: 'Spanish, flamenco, metal',                     bars: 2 },
  { id: 'phrygian_walk',    name: 'Phrygian walk (i–bII–bIII)',  degrees: ['i','bII','bIII'],           scales: ['phrygian','phrygian-dominant'],        vibe: 'Dark, exotic step-down',                       bars: 3 },
  { id: 'dorian_groove',    name: 'Dorian (i–IV)',               degrees: ['i','IV'],                   scales: ['dorian'],                              vibe: 'Santana "Oye Como Va", "So What"',             bars: 2 },
  { id: 'dorian_iv_v',      name: 'Dorian (i–IV–v)',             degrees: ['i','IV','v'],               scales: ['dorian'],                              vibe: 'Funk, soul, Khruangbin',                       bars: 3 },

  // ─── Minor (natural / harmonic) ───
  { id: 'minor_three',      name: 'Minor 3-chord (i–iv–v)',      degrees: ['i','iv','v'],               scales: ['natural-minor','dorian'],              vibe: 'Folk minor, sea shanty',                       bars: 3 },
  { id: 'minor_descent',    name: 'Minor descent (i–VII–VI–VII)',degrees: ['i','VII','VI','VII'],       scales: ['natural-minor'],                       vibe: 'Stairway to Heaven, "All Along the Watchtower"', bars: 4 },
  { id: 'minor_uplift',     name: 'i–VI–III–VII',                degrees: ['i','VI','III','VII'],       scales: ['natural-minor'],                       vibe: 'Sad-pop in minor — hopeful resolution',        bars: 4 },
  { id: 'andalusian',       name: 'Andalusian cadence',          degrees: ['i','bVII','bVI','V'],       scales: ['harmonic-minor','phrygian-dominant'],  vibe: 'Flamenco, Sultans of Swing, Hit the Road Jack', bars: 4 },
  { id: 'minor_cyclic',     name: 'i–iv–VII–III',                degrees: ['i','iv','VII','III'],       scales: ['natural-minor'],                       vibe: 'Cyclical minor — moody, propulsive',           bars: 4 },
  { id: 'rock_minor',       name: 'Rock minor (i–bVI–bVII–i)',   degrees: ['i','bVI','bVII','i'],       scales: ['natural-minor'],                       vibe: 'Black Sabbath, doom, drive',                   bars: 4 },

  // ─── Jazz cadences ───
  { id: 'jazz_ii_v_i',      name: 'ii7–V7–Imaj7',                degrees: ['iim7','V7','Imaj7'],        scales: ['major'],                               vibe: 'The jazz cadence',                             bars: 3 },
  { id: 'jazz_minor_ii_v',  name: 'iim7♭5–V7–i',                 degrees: ['iim7b5','V7','i'],          scales: ['harmonic-minor','natural-minor'],      vibe: 'Minor jazz cadence',                           bars: 3 },
  { id: 'jazz_turnaround',  name: 'iii–vi–ii–V',                 degrees: ['iii','vi','iim7','V7'],     scales: ['major'],                               vibe: 'Jazz turnaround',                              bars: 4 },
  { id: 'rhythm_changes_a', name: 'I–vi–ii–V (rhythm A)',        degrees: ['I','vi','iim7','V7'],       scales: ['major'],                               vibe: 'Rhythm changes A section',                     bars: 4 },
  { id: 'bossa_minor',      name: 'Bossa minor (im6–iim7♭5–V7)', degrees: ['im6','iim7b5','V7','i'],    scales: ['melodic-minor','harmonic-minor'],      vibe: 'Bossa minor, Antônio Carlos Jobim',            bars: 4 },

  // ─── Blues ───
  { id: 'blues_12bar',      name: '12-bar blues',                degrees: ['I7','I7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['blues','major','mixolydian'], vibe: '12-bar blues', bars: 12 },
  { id: 'blues_quick4',     name: '12-bar quick-change',         degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','I7','V7','IV7','I7','V7'], scales: ['blues','mixolydian'], vibe: 'Blues with quick IV in bar 2', bars: 12 },
  { id: 'blues_minor',      name: 'Minor blues',                 degrees: ['im7','im7','im7','im7','ivm7','ivm7','im7','im7','V7','ivm7','im7','im7'], scales: ['natural-minor','blues'], vibe: 'Minor blues', bars: 12 },
  { id: 'blues_jazz',       name: 'Jazz blues (with II–V)',      degrees: ['I7','IV7','I7','I7','IV7','IV7','I7','iiim7','VI7','iim7','V7','I7'], scales: ['major','mixolydian'], vibe: 'Charlie Parker blues',                bars: 12 },
  { id: 'blues_8bar',       name: '8-bar blues',                 degrees: ['I7','V7','IV7','IV7','I7','V7','I7','V7'], scales: ['blues','mixolydian'], vibe: 'Key to the Highway, Heartbreak Hotel', bars: 8 },

  // ─── World / Khruangbin / Tinariwen / desert ───
  { id: 'desert_vamp',      name: 'Desert vamp (i–bVII)',        degrees: ['i','bVII'],                 scales: ['dorian','natural-minor','phrygian-dominant'], vibe: 'Tinariwen, Mdou Moctar',           bars: 2 },
  { id: 'khruangbin_im_bvii',name: 'Khruangbin (im7–bVIImaj7)',  degrees: ['im7','bVIImaj7'],           scales: ['dorian'],                              vibe: 'Khruangbin "Maria También"',                   bars: 2 },
  { id: 'desert_blues',     name: 'Desert blues (i–VI–iv–i)',    degrees: ['i','VI','iv','i'],          scales: ['natural-minor'],                       vibe: 'Ali Farka Touré, Bombino',                     bars: 4 },

  // ─── Reggae / surf ───
  { id: 'reggae_offbeat',   name: 'Reggae I–IV–V',               degrees: ['I','IV','V'],               scales: ['major','mixolydian'],                  vibe: 'One-drop reggae, ska',                         bars: 3 },
  { id: 'surf_minor',       name: 'Surf (i–bVI–bVII–i)',         degrees: ['i','bVI','bVII','i'],       scales: ['natural-minor'],                       vibe: 'Misirlou, Pulp Fiction, Dick Dale',            bars: 4 },
  { id: 'reggae_one_chord', name: 'Reggae one-chord vamp (I)',   degrees: ['I'],                        scales: ['major','mixolydian'],                  vibe: 'Bob Marley meditation grooves',                bars: 1 },

  // ─── Doo-wop / folk additions ───
  { id: 'folk_i_v_iv_v',    name: 'Folk (I–V–IV–V)',             degrees: ['I','V','IV','V'],           scales: ['major'],                               vibe: 'Old-time folk, country',                       bars: 4 },
  { id: 'country_i_v_v_i',  name: 'Country (I–V–V–I)',           degrees: ['I','V','V','I'],            scales: ['major'],                               vibe: 'Honky-tonk',                                   bars: 4 },

  // ─── Modal extras ───
  { id: 'modal_dorian_long',name: 'Dorian (i–bIII–bVII–IV)',     degrees: ['i','bIII','bVII','IV'],     scales: ['dorian'],                              vibe: 'Dorian rock — Pink Floyd, Steely Dan',         bars: 4 },
  { id: 'spanish_descent',  name: 'Spanish descent (i–bVII–bVI–V)', degrees: ['i','bVII','bVI','V'],    scales: ['phrygian-dominant'],                   vibe: 'Spanish guitar — descent to leading tone',     bars: 4 },
];
```

**Coverage check:** Every PF scale in `SCALE_TYPES` (`ColorMusicTrainer.jsx:25`) is covered by at least one progression EXCEPT pentatonics (`minor-pentatonic`, `major-pentatonic`, `hirajoshi`), `whole-tone`, and `locrian` — these are intentionally skipped because they don't sustain progression-based composition. When the active card draws one of these scales, the chordProgression draw is silently skipped (treat the dim as `null` for that card).

## Implementation phases

Each phase = one commit. Build, lint, validate, commit. Don't bundle phases.

### Phase 1: Resolver + library (data only, no UI)

Files to create:
- `src/data/chordProgressions.js` — paste the launch set above.
- `src/chordProgressionResolver.js` — `parseDegree`, `resolveDegree`, `resolveProgression`, plus `SCALE_DEGREE_QUALITIES`.

Validation: write a smoke test by importing the resolver in PracticeForge.jsx, logging `resolveProgression(CHORD_PROGRESSIONS[0], 'G', 'major')` from a top-level effect, and confirming the console outputs `[{name:'G'}, {name:'D'}, {name:'Em'}, {name:'C'}]`. Remove the log.

```bash
cd C:/Users/hewg7/Documents/GitHub/musiclessons/sarah-practice-plan
npm run build   # must succeed
```

### Phase 2: Wire `chordProgression` as a dim

Edits in `src/PracticeForge.jsx`:

1. **Add the constraint set** (near `HARMONIC_TARGET_CONSTRAINTS` at line 785):
   ```js
   const CHORD_PROGRESSION_CONSTRAINTS = CHORD_PROGRESSIONS.map(p => ({
     id: p.id, name: p.name, desc: `${p.vibe}. ${p.bars} bars.`, icon: '⟳',
     degrees: p.degrees, scales: p.scales, bars: p.bars, vibe: p.vibe,
   }));
   ```
   And import: `import { CHORD_PROGRESSIONS } from './data/chordProgressions.js';`
   And import: `import { resolveProgression } from './chordProgressionResolver.js';`

2. **Register in `DIMENSIONS`** (line ~915, the array). Add after `harmonicTarget`:
   ```js
   { id: 'chordProgression', label: 'Progression', tier: 2, type: 'qualitative',
     options: CHORD_PROGRESSION_CONSTRAINTS, color: '#8b6db5' },
   ```

3. **Add to `SHARED_RANDOM`** (line ~2793, inside the `useMemo` that builds `activeDimensions`):
   ```js
   const SHARED_RANDOM = [
     'pitchConstraint', 'rhythmConstraint', 'dynamics',
     'harmonicTarget', 'chordProgression',   // ← add here
     'articulation', 'phraseLength',
     'phraseStructure',
   ];
   ```

4. **Add to display lists** (line ~1858-1865):
   ```js
   const RANDOM_DIM_IDS = [
     'pitchConstraint', 'rhythmConstraint', 'dynamics',
     'harmonicTarget', 'chordProgression',   // ← add here
     ...
   ];
   ```

5. **Filter draws by scale compatibility** — in the random-draw logic (search for `drawRandom` around line 1131 or `weightedPick` for chord-progression options), add filter: when drawing a chordProgression value, only consider entries whose `scales` array includes the card's resolved scale. If no compatible progression, the dim is silently skipped (return `null` for that draw, like other dims do when constraints are exhausted).

6. **Resolve at card-draw time** — inside `generateCard` (line 1249ish), AFTER the random pool draws complete and AFTER `card.constraints.key` and `card.constraints.scale` are set:
   ```js
   if (card.constraints.chordProgression) {
     const cp = card.constraints.chordProgression;
     const resolved = resolveProgression(cp, card.constraints.key, card.constraints.scale);
     if (!resolved.length) {
       // Scale incompatibility caught late — drop the dim cleanly.
       delete card.constraints.chordProgression;
     } else {
       card.constraints.chordProgression = { ...cp, resolvedChords: resolved };
     }
   }
   ```

7. **Do NOT add to `DEFAULT_EXCLUDED`** (line 952) — we want it active by default per user request.

Validation:
```bash
npm run build   # must succeed
npx eslint src/PracticeForge.jsx src/chordProgressionResolver.js src/data/chordProgressions.js 2>&1 | grep -E "chordProgression|resolveProgression" | head
```
Expect zero new errors. Existing PF lint errors are pre-existing — ignore.

### Phase 3: Card UI — chip row

In `PracticeForge.jsx`, find the card render block (around line 1929ish, where constraint lines render). When `card.constraints.chordProgression?.resolvedChords` is set, render a prominent chip row near the top of the card (above the per-constraint focus list). Each chip = one chord, color-coded by root via `getColorForNote(chord.root)` (already imported from `JungleTools.jsx`):

```jsx
{currentCard.constraints.chordProgression?.resolvedChords && (
  <div style={{
    marginBottom: 16, padding: '10px 12px',
    background: T.goldSoft, border: `1px solid ${T.gold}40`, borderRadius: 8,
  }}>
    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: T.goldDark, marginBottom: 8 }}>
      Progression · {currentCard.constraints.chordProgression.name}
    </div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {currentCard.constraints.chordProgression.resolvedChords.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: T.textLight, alignSelf: 'center' }}>→</span>}
          <span style={{
            padding: '4px 10px', borderRadius: 4,
            border: `1.5px solid ${getColorForNote(c.root)}`,
            color: getColorForNote(c.root),
            fontFamily: T.serif, fontWeight: 600, fontSize: 16,
          }}>{c.name}</span>
        </React.Fragment>
      ))}
    </div>
    <div style={{ marginTop: 6, fontSize: 10, fontStyle: 'italic', color: T.textMed }}>
      {currentCard.constraints.chordProgression.vibe}
    </div>
  </div>
)}
```

### Phase 4: Auto-expand + drive ForgeChordListener with progression targets

In `PracticeForge.jsx`:

1. **Auto-expand the chord tool** when chordProgression is on the card. Mirror the existing fretboard auto-expand (line ~2973):
   ```js
   useEffect(() => {
     if (currentCard?.constraints?.chordProgression?.resolvedChords?.length) {
       setExpandedTools(prev => ({ ...prev, chordDetector: true }));
     }
   }, [currentCard?.constraints?.chordProgression?.id]);
   ```

2. **Replace `ForgeChordListener`'s narrow key-match with progression-aware verification**. The component currently takes `keyRoot` and ticks when the player plays the tonic chord. Change the prop to `progressionTargets` (array of chord-name strings, e.g. `['Am','G','F','E']`) and use the shared hook:
   ```jsx
   import { useChordEngine, useChordTargetChecklist } from './chordDetectorReact.js';

   function ForgeChordListener({ T, progressionTargets, progressionName, keyRoot }) {
     const { chord, listening, signalLevel, signalDb, error, isReady, toggle } = useChordEngine();
     const { confirmed, reset } = useChordTargetChecklist(progressionTargets, chord);
     // …live readout above (unchanged)…
     // Verification strip becomes:
     // - if progressionTargets is set: render a compact chip row of the progression
     //   chords with check/empty state per the `confirmed` map. Show "X / N confirmed".
     // - if progressionTargets is null but keyRoot is set: fall back to the simple
     //   key-match indicator (preserves the current behavior for cards without a progression).
   }
   ```
   Pass at the call site (line ~4217):
   ```jsx
   <ForgeChordListener
     T={T}
     progressionTargets={currentCard.constraints.chordProgression?.resolvedChords?.map(c => c.name) || null}
     progressionName={currentCard.constraints.chordProgression?.name || null}
     keyRoot={currentCard.constraints.key}
   />
   ```

3. **Update the tool chip label** dynamically when verification is in flight. In `advancedTools` (line ~3158), change the chord entry's label to a callable string. Or just leave label static and render confirmed/total below the chip — simpler.

### Phase 5: Card text composition (the user emphasized this)

The user explicitly asked: "make sure the text and the flow and the instructions make sense." Two text surfaces need attention:

1. **Existing guidance entries** (in `src/data/practiceForgeGuidance.json`) say things like *"Land on chord tones"*. They were written assuming the player would imagine the changes. When `chordProgression` is on the card, the guidance still applies — but the chips above it now make it concrete. **No edits to the guidance JSON are needed** — the chips supply the missing context visually.

2. **What DOES need new copy**: the per-card subtitle when chordProgression is the lead dim. Add a small line below the chip row that resolves like:
   - `"Andalusian (i–bVII–bVI–V) in A harmonic minor — flamenco / Sultans of Swing intro"`
   - `"Pop axis (I–V–vi–IV) in G major — Coldplay, Journey"`

3. **Texture / harmonicTarget composability** — when both fire alongside chordProgression, the existing constraint focus text composes naturally. Quick spot-check: does the current focus text for `texture:singleLine` say "Single-note line" or "Single-note line over the chord changes"? If the latter, leave it; if the former, the chip row makes the implicit progression explicit.

   **Action item:** read `src/data/practiceForgeGuidance.json` (it's ~280 KB, code-split — open it directly), find the `focus.texture:*` and `focus.harmonicTarget:*` entries (~10 entries each), and lightly edit any that are too vague to mention "the progression" when one is active. Do this surgically — one or two word additions, not rewrites. Most entries probably read fine as-is.

### Phase 6: Drone wheel pulse (small bonus, optional)

The `CompactDroneWheel` (`src/CompactDroneWheel.jsx`) renders the active key's chord wheel. When the chord detector fires, briefly halo the matched chord's note position on the wheel. Subscribe via `useChordEngine` inside `CompactDroneWheel` and add a 400ms-fade halo on `chord.root`.

Skip this if context is tight. It's polish, not core.

## File map (where to look)

| File | What | Key lines |
|---|---|---|
| `src/PracticeForge.jsx` | The component | DIMENSIONS @ 915, SHARED_RANDOM @ 2793, RANDOM_DIM_IDS @ 1858, generateCard @ 1249, drawRandom @ 1131, ForgeChordListener @ 2742, card render @ 1929, advancedTools @ 3158, tool expansion @ 4030 |
| `src/chordDetectorReact.js` | Shared hooks (use as-is) | useChordEngine, useChordTargetChecklist, matchesTargetChord |
| `src/chordDetectorEngine.js` | Engine (no changes) | currentChord shape: `{name, root, quality, confidence, rawScore}` |
| `src/ColorMusicTrainer.jsx` | SCALE_TYPES source | line 25 — has `intervals` per scale; reuse in resolver |
| `src/JungleTools.jsx` | Color helpers (already imported) | `getColorForNote`, `normalizeNote`, COLOR_MUSIC palette |
| `src/data/chordProgressions.js` | NEW — library | (see Phase 1) |
| `src/chordProgressionResolver.js` | NEW — resolver | (see Phase 1) |

## Validation gate (run before each commit)

```bash
cd C:/Users/hewg7/Documents/GitHub/musiclessons/sarah-practice-plan
npm run build                                              # must succeed
npx eslint src/PracticeForge.jsx src/chordProgressionResolver.js src/data/chordProgressions.js 2>&1 | tail -5
# Only NEW errors are blockers. PF has ~30 pre-existing lint errors — ignore them.
```

After the full rollout:
1. `npm run dev` → open Practice Forge → guitar mode → matrix mode → draw cards. Confirm `chordProgression` appears in the random pool (~1 in 6 draws given the pool size).
2. Confirm card chip row renders with correct color-coded chord names.
3. Confirm chord tool auto-expands when progression is on the card.
4. Confirm playing the chords in order ticks them off (test by humming or strumming Am→G→F→E for an Andalusian draw in A harmonic minor).
5. Confirm the existing key-match fallback still works when chordProgression isn't on the card.

## Don't break

- **The existing `ForgeChordListener` API consumers** (only one — line ~4217). Update the call site simultaneously with the component.
- **Tests of `useChordTargetChecklist`** (none currently, but the hook's behavior is load-bearing — the 600ms confirm + 200ms drift grace is correct for both this dim and the existing `gs-1-10` Dope & Smoke exercise).
- **The matrix-mode card draw budget** — adding chordProgression to the random pool means cards may draw it as one of their 3 random slots, displacing harmonicTarget or rhythm. That's intentional. If users complain that cards feel less varied in the OTHER dims, consider raising matrix mode's `maxConstraints` from 3 → 4 to compensate. Don't pre-emptively change it.
- **PracticeForge's persisted constraint weights** (SRS state in localStorage) — adding a new dim doesn't break existing weights; they're keyed `${instrument}:${dimId}:${valueId}`. New chordProgression weights start at zero (effectively unweighted) and grow with use. No migration needed.

## Estimated effort

- Phase 1: 30 min (paste library + write resolver + smoke test)
- Phase 2: 20 min (wire as dim — pattern-mirror harmonicTarget)
- Phase 3: 15 min (chip row in card render)
- Phase 4: 30 min (rewire ForgeChordListener — biggest single change)
- Phase 5: 20 min (text spot-check + subtitle line)
- Phase 6 (optional): 30 min (drone wheel pulse)

Total: ~2 hours of focused work, 5 commits to master.

## Final note for the fresh Claude

The user's directive is "rolled in, but make sure the text and the flow and the instructions make sense." That's the hard part of this work — not the resolver math. After Phase 4 ships, before declaring done, **manually walk through 4–5 drawn cards in dev** and read what the player would see. If a card draws `chordProgression: Andalusian` + `texture: doubleStops` + `harmonicTarget: chordToneLanding` + `pickingHand: fingerpick`, does the resulting card READ like a coherent practice prompt, or does it read like four disconnected stickers? If the latter, write a short composer line in the card render that synthesizes them: e.g. *"Fingerpick double-stops over the Andalusian, landing on chord tones of each chord as it passes."* That's where the user's "cohesive and supportive way that upgrades instead of being silos" lands.

Don't just ship the plumbing. Ship the prompt the player reads at 9pm with a guitar in their lap.
