# Keys Curriculum Deep Upgrade — Prompt for Fresh AI

## Your Mission

You are upgrading the Keys (keyboard/organ) track of a personalized music learning web app. The app already has "super dialed" Voice and Singer-Songwriter curricula, and we just finished upgrading the Guitar track to the same standard. Now it's the Keys track's turn.

The Keys track is fundamentally different from guitar — it's about **texture, support, voicings, and serving the song**, not lead playing. The learner (Gene) uses a KeyLab 49 MIDI controller with Ableton + Analog Lab V (Farfisa, Vox, Hammond, Rhodes presets). He's a guitarist and vocalist first; keys are his texture/color instrument. His genres: psych-surf, reggae-rock, desert blues, Khruangbin-style global fusion, cinematic, soul-funk.

---

## What Already Exists

### Current Keys Curriculum (7 levels, 37 exercises)
All exercises live in ONE file: `sarah-practice-plan/src/data/appData.js` in the `KEYBOARD_LEVELS` array.

- **L1 "The Chop"** (5 exercises): Offbeat reggae stabs, chord changes, bubble organ, minor chords, tempo ladder
- **L2 "Sound Good"** (5 exercises): Inversions, sweet spot register (C4-C5), add9/sus voicings, minor inversions, 7th chords
- **L3 "Lock In"** (5 exercises): Playing with drums/backing tracks, groove-locked practice
- **L4 "Serve the Song"** (5-6 exercises): Dynamics, arrangement thinking, when to play/not play
- **L5 "Add Texture"** (5-6 exercises): Pads, tremolo, effects as expression
- **L6 "Add Color"** (5-6 exercises): Fills, scales, modes on keys
- **L7 "Full Integration"** (5-6 exercises): Full songs, band rehearsal context

### What the Keys Track Already Has (DO NOT duplicate)
- `levelUp` on every exercise (37 total) — but they're SHORT and some are vague
- `pianoKeys` field with note highlighting on most exercises
- `referencePitches` on some exercises
- `metronome` on all exercises
- `speedLadder` on the tempo drill
- Basic "why" fields (1 sentence each — thin compared to voice/guitar)

### What the App Already Has (tools you can reference)
- `InlineKeyboard` component — interactive piano keyboard with click-to-play, note highlighting
- `VolumeMeter` — real-time dB meter with sparkline history
- `SilenceScore` — post-recording silence % analysis (exercise field: `silenceTarget: 0.4`)
- `GenreMetronome` — accent modes: Standard, Backbeat, Reggae Skank, One-Drop, Shuffle
- `ChordTransitionTimer` — select 2 chords, 60s countdown, tap per clean change
- `AudioRecorder` — WAV recording with waveform
- `DroneGenerator` — 4 textures, 8 genre presets, cycle mode
- `PhraseFormGuide` — section visualization (AABA, etc.)
- `RhythmCellCards` — visual rhythm patterns with playback
- `LivePitchDetector` — real-time pitch detection with contour display

---

## The Gold Standard (What Voice/Guitar Look Like Now)

### Voice Curriculum "Why" Fields (the bar to meet)
Each step has a 40-130 word "why" with named research, specific physiology, and artist references:
```
why: "This engages your diaphragm without thinking about it. Natural speech activates
chest voice automatically because your brain already knows how to produce these sounds.
The diaphragm contracts and pushes the belly outward to generate the subglottic pressure
needed for a projected 'Hey!' Your nervous system does this reflexively; we are just
making it conscious."
```

### Guitar Curriculum "Why" Fields (the more concise bar — aim here)
40-80 words with named research or master quotes:
```
why: "Motor learning research calls this 'task decomposition' — separating coordination
challenges into independent subtasks. Your foot learns the downbeat, your hands learn
the offbeat, and only then do you combine them with the guitar. Skipping this step is
why most players struggle with the skank for weeks instead of days."
```

### Guitar `levelUp` Fields (measurable and specific)
```
levelUp: "Maintain offbeat skanks on Am at 80 BPM for 2 full minutes without drifting
to the downbeat. Your foot taps on the click while your strum lands cleanly on every 'and.'"
```

---

## Research You Need to Do First

Before making ANY changes, research cutting-edge keyboard/piano skill acquisition. Keys are VERY different from guitar:

### 1. Keyboard-Specific Motor Learning
- **Hand independence** — the #1 challenge. Left hand comping patterns vs. right hand melody/fills
- **Finger weight vs. finger strength** — piano pedagogy (Taubman approach, Leschetizky method) focuses on arm weight transfer, not finger pressing
- **Voicing economy** — moving between chords with minimal hand movement (voice leading on keys is totally different from guitar)
- **Touch sensitivity** — velocity-sensitive keys respond to HOW you press, not just IF you press
- **The sustain pedal** — the most important "technique" on piano that guitar doesn't have

### 2. What Great Keyboardists Say About Learning
Research what these players say about developing their skills:
- **Cory Henry** — gospel/soul organ, comping, real-time arrangement
- **Tyrone Downie** (Bob Marley's keyboardist) — reggae organ bubble, offbeat discipline
- **Booker T. Jones** — simplicity, groove, the Hammond B-3 as a rhythm instrument
- **Ray Manzarek** (The Doors) — organ as bass AND keys simultaneously
- **Mark de Clive-Lowe** — keys in global/electronic fusion
- **Clavinet/Rhodes players** — Stevie Wonder (clavinet funk), Herbie Hancock (Rhodes), Billy Preston
- **Latin/Caribbean keyboardists** — the montuno pattern, organ in ska/rocksteady

### 3. Keys-Specific Pedagogy That Differs From Guitar
- **Reading the keyboard topography** — black keys as landmarks (guitar has fret dots; keys have the black/white pattern)
- **Two-hand coordination** — guitar is one hand fretting, one strumming. Keys can have BOTH hands doing independent harmonic/melodic work
- **Voicing density** — keys can play 10 notes simultaneously; guitar maxes at 6. How to use (and NOT overuse) this
- **Register as arrangement tool** — low register = bass territory (stay out unless you ARE the bass). Mid register = comping zone. High register = fills/melody
- **The organ vs. piano vs. synth mindset** — different instruments even though they share a keyboard layout. Organ has NO velocity sensitivity and NO sustain. Piano has both. Synth has everything.

### 4. Genre-Specific Keys Techniques for Gene's Styles
- **Reggae organ**: The bubble (offbeat hold with specific release timing), the skank (short stab), the one-drop keyboard pattern
- **Psych/surf keys**: Farfisa organ, tremolo effect, simple repetitive patterns that create hypnotic texture
- **Soul/funk keys**: Rhodes comping, ghost note chords (barely touching keys), Dorian fills
- **Khruangbin-style**: Minimal keys, texture over melody, Rhodes or Wurlitzer, space and restraint
- **Desert/global fusion**: Drone-based keyboard patterns, modal playing, repetitive ostinatos

### 5. Common Keys Curriculum Gaps
- **Listening as practice** — knowing when NOT to play (the most important skill for a keys player in a band)
- **Arrangement awareness** — keys should fill frequency gaps, not duplicate guitar
- **Real-time sound design** — choosing the right patch/preset is a skill, not a preset
- **The "less is more" principle** — keyboard players who overplay are the most fired musicians in bands
- **Pedal technique** — sustain pedal, expression pedal, how they change the musicality
- **Comping patterns** — rhythmic patterns for accompanying (not just holding chords)

---

## What to Do

### Phase 1: Research (DO THIS FIRST)
Search the web for cutting-edge keyboard skill acquisition, what master keyboardists say about learning, and genre-specific techniques. Compile findings before touching any code.

### Phase 2: Gap Analysis
Read the ENTIRE `KEYBOARD_LEVELS` array in `appData.js`. Compare every exercise to the guitar/voice standard:
- Are "why" fields deep enough (40-80 words with research/quotes)?
- Are `levelUp` fields measurable and specific?
- Does every exercise have appropriate tools (`pianoKeys`, `recorder`, `volumeMeter`, `metronomeMode`, etc.)?
- Is the pedagogical progression sound? Does it scaffold skills properly?
- Are there missing topics that should be covered in the 7 levels?
- Are picking/playing mechanics explicit (which fingers, which keys, which hand)?

### Phase 3: Enrich Existing Exercises
For each of the 37 exercises:
1. **Deepen "why" fields** (2-3 per level) to 40-80 words with research or master quotes
2. **Strengthen `levelUp`** if it's vague — make it measurable
3. **Add missing tools**: `recorder: true` if steps mention recording, `volumeMeter: true` if dynamics discussed, `metronomeMode` for genre-specific metronome needs
4. **Ensure mechanical clarity**: which hand, which fingers (1-2-3-4-5 = thumb-index-middle-ring-pinky), which octave, which keys by name

### Phase 4: Add Missing Content (if gaps found)
If the gap analysis reveals missing topics, add exercises or even new levels. Potential gaps:
- **Diagnostic baseline** (like voice v1e0 and guitar gs-1-0)
- **Listening exercises** — "Active Listening: How Keys Sit in the Mix"
- **Left-hand bass patterns** — if Gene is ever the only harmonic instrument
- **Sound design exercise** — choosing the right preset for the genre
- **Space/silence exercise** — adapted version of guitar's 40% silence for keys context

### Phase 5: Wire Up New Exercise Fields
If you add new tool fields to exercises, make sure they're rendered in App.jsx. The Keys tab rendering is in App.jsx — search for `KEYBOARD_LEVELS` to find where exercises render.

---

## Rules (CRITICAL)

1. **NEVER loosen note names, key names, finger numbers, or voicing spellings.** Always maintain or increase specificity: "C4-E4-G4 (fingers 1-3-5)" not just "C major triad"
2. **NEVER change the existing level structure** unless you find a critical gap. 7 levels is good.
3. **Keys ≠ Guitar.** Don't copy guitar pedagogy. Keys have different:
   - Motor challenges (hand independence, not string-bending)
   - Role in the band (texture/support, not lead)
   - Technical vocabulary (voicing, comping, registering, voice-leading)
   - Physical setup (seated, both hands on keys, no pick)
4. **Gene is NOT trying to be a pianist.** He's a guitarist/vocalist who uses keys for texture, organ chops, and soul coloring. The curriculum should serve THAT goal.
5. **The organ is the primary instrument** (Farfisa, Vox, Hammond via Analog Lab V). Piano/Rhodes are secondary textures. This matters for technique — organ has no velocity sensitivity and no sustain pedal.
6. **Keep the punchy voice.** The guitar curriculum's conversational, direct tone is the target. Not academic, not formal.
7. **All changes go in `sarah-practice-plan/src/data/appData.js`** in the `KEYBOARD_LEVELS` array.
8. **Create a git branch** `keys-curriculum-upgrade` before any edits.
9. **Verify the build** after edits: `cd sarah-practice-plan && npx vite build`

---

## Gene's Musical DNA (for personalization)

- **Vocal**: Tenor, sweet spot E3-A4, laid-back "porch register"
- **Genres**: Psych-surf, reggae-rock, desert blues, global fusion (90-120 BPM sweet spot)
- **Artists**: Allah-Las, Khruangbin, DOPE LEMON, BALTHVS, Skinshape, Tommy Guerrero, Tinariwen
- **Guitar style**: Jangly surf-tremolo, reggae offbeat, nylon fingerpicking
- **Keys role**: Texture instrument. Organ chops, bubble, soul coloring. NOT lead piano.
- **Gear**: KeyLab 49 → Ableton → Analog Lab V (Farfisa V, Vox Continental V, B-3 V, Wurli V, Stage-73 V)
- **Production**: Warm, analog, reverb-drenched, lo-fi

---

## Deliverables

1. **Research summary** — what you found about keys skill acquisition, master quotes, genre techniques
2. **Gap analysis** — what the current curriculum has vs. what it should have
3. **Updated `appData.js`** — enriched whys, strengthened levelUps, added tools, new exercises if needed
4. **Verification** — build passes, all exercises render in the app
