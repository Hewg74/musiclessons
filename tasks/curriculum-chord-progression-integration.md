# Research Brief: Rolling Chord Progressions into SS + Guitar Curricula

**For:** A fresh Claude Code session.
**Goal:** RESEARCH + PLAN ONLY. Do not edit curriculum files. Produce a proposal for the user to approve.
**Repo:** `C:\Users\hewg7\Documents\GitHub\musiclessons\sarah-practice-plan\`

## What's new in the app

Practice Forge just gained a `chordProgression` random dimension (still in progress — Phases 1-3 shipped to master, Phases 4-5 pending; see `tasks/chord-progression-rollout.md` for the full handoff). The capability:

- **40 progressions** in Roman-numeral scale-degree notation (pop/modal/minor/jazz/blues/world/reggae/surf/folk). File: `src/data/chordProgressions.js`.
- **Per-card resolver** that maps degrees → concrete chord names against the active key + scale. File: `src/chordProgressionResolver.js`. Accidentals (bVII, bVI, bII, #IV) reference major-scale positions; bare degrees use the current scale's intervals; case of the Roman determines quality on accidentals (upper=maj, lower=min). Explicit overrides like `iim7`, `V7`, `Imaj7`, `bVIImaj7` are honored verbatim.
- **Card banner** renders unique chord chips color-coded by root, with an arrow flow and "Form:" subtitle for progressions with >5 chords.
- **(Pending Phase 4)** The chord detector will tick each chord off as the player lands it — visual checklist feedback.

This makes "play over a real cycle of changes" a drawable constraint that composes with texture, picking hand, harmonic target, etc. — so a card can say "fingerpick double-stops over the Andalusian cadence in A harmonic minor, landing on chord tones of each chord as it passes."

Read these to understand the shape of the tool before proposing anything:

```
sarah-practice-plan/src/data/chordProgressions.js       # the 40 progressions
sarah-practice-plan/src/chordProgressionResolver.js     # resolver math
sarah-practice-plan/src/PracticeForge.jsx               # dim wiring (search: chordProgression)
tasks/chord-progression-rollout.md                      # full handoff doc
```

Also skim the project memory so you don't duplicate prior decisions:

```
C:\Users\hewg7\.claude\projects\C--Users-hewg7-Documents-GitHub-musiclessons\memory\MEMORY.md
```

## What to research

Two curricula are candidates:

1. **Singer-Songwriter** — `sarah-practice-plan/src/data/singerSongwriter/` — 15 levels, 238 exercises, IDs `ss-{level}-{exercise}`. Structure per `src/data/singerSongwriter/index.js`.
2. **Guitar Study** — `sarah-practice-plan/src/data/guitarStudy/` — 16 levels, 195 exercises, IDs `gs-{level}-{exercise}`. Chord-tone soloing and enriched song entries were added April 2026.

For each curriculum:

1. **Survey where chord-awareness already lives.** Which levels introduce diatonic chords, chord tones, progressions, modulation, ear training on changes? Which exercises already assume the player can hear I/IV/V, i/VI/VII, or mode-specific cadences?
2. **Find exercises that would genuinely benefit** from pointing at Practice Forge with a pinned progression. Look for exercises that:
   - Teach improvising over a harmonic cycle (solos, fills, melodies over changes)
   - Teach chord-tone awareness or target-note landing
   - Teach comping, strumming patterns, or fingerpicking over progressions
   - Teach modal/minor colors where a concrete progression would anchor the sound
   - Teach ear training / chord recognition
3. **Find exercises that SHOULD NOT try to integrate** — pure technique drills, scale mechanics, single-chord vamps that are deliberately not progression-based, vocal-only exercises unless the vocalist is meant to improvise over changes (SS L5+ possibly).
4. **Identify gaps** — places in the curricula where a missing exercise could be added that leverages this new capability distinctively. These should be proposals, not promises to ship.

## Fit criteria (the user's standard)

The user's quote: "we want to make sure that the lessons we create or roll it into are relevant and useful possibilities of this new tool." Decode:

- **Relevant** = the exercise already lives in the harmonic territory the tool covers. Don't bolt progressions onto a breath-control exercise.
- **Useful** = the integration unlocks something hard/impossible without the tool. If a textbook diagram or a single chord chart could do the same job, don't recommend the tool.
- **Distinctive** = the randomized library (40 progressions × key × scale × other dims) surfaces variety the curriculum text can't. The strongest fits are exercises where the STUDENT's practice should touch many progressions over time, not one fixed one.

## Output — produce a single doc

Write your proposal to `tasks/curriculum-progression-integration-proposal.md`. Structure:

1. **Summary** (4-6 bullets): how many integrations you recommend per curriculum, at what levels, what kind (pointer vs. embedded vs. new exercise).
2. **Per-curriculum integration map** — table or list of candidates. For each candidate:
   - Exercise ID + title
   - Current pedagogical goal (one line)
   - How the chord-progression tool plugs in (pointer text in `sarah` field? pinned progression via locked dim? PF Forge session linked from the exercise? new exercise entirely?)
   - Which specific progressions from the 40-entry library fit (reference by id)
   - Why this is a good fit (the "relevant + useful + distinctive" test)
3. **Proposed new exercises** (if any gaps surface) — per exercise, write the ExerciseCard skeleton (id, title, type, time, what, setup, steps, feel, sarah). Use the existing ExerciseCard field conventions in MEMORY.md.
4. **Rejected candidates** — 2-3 exercises that SEEM like fits but aren't, with a one-line reason. Demonstrates you thought about it.
5. **Implementation cost** — for each recommended integration, rough effort (pointer text = 5 min; new exercise = 30 min; curriculum-wide rethink = hours).

## Guardrails

- **Do not edit** any `src/data/singerSongwriter/`, `src/data/guitarStudy/`, or `src/data/vocalLevels/` files. This is research + plan only.
- **Do not redesign** the chord progression system itself — Phases 4-5 are defined in `tasks/chord-progression-rollout.md`. Point at gaps if you see them but don't reinvent.
- **Do not over-integrate.** If the honest answer is "this curriculum doesn't really want this tool," say so. The user prefers a small tight proposal over a sprawling one.
- **Before using Grep/Glob**, search QMD first: `~/.claude/scripts/qmd search 'query' -n 10`. Subagents don't have MCP tools — use the Bash CLI fallback.

## Deliverable quality bar

The user should be able to open the proposal doc and, within 5 minutes, decide which integrations to greenlight. That means: concrete exercise IDs (not hand-waves), specific progression ids from the library (not "some minor progression"), and honest rejection reasons where applicable.
