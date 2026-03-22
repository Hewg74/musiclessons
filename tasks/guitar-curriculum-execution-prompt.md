# Guitar Curriculum Rework — Complete Execution Prompt

> **For the executing AI:** This document contains EVERYTHING you need to rewrite the guitar curriculum. All research has been done. All decisions have been made. All chord progressions have been verified. Your job is to WRITE THE CODE — the 14 level files, the prerequisites, and the supporting changes. Do not re-research. Do not second-guess the structure. Execute.

---

## PROJECT CONTEXT

You are working on `sarah-practice-plan/` — a React music lesson app deployed at sarahglassmusic.com. It uses Vite 7 + React 19 + Tone.js 15. The app is monolithic: `App.jsx` (~4600 lines) and `JungleTools.jsx` (~7200 lines) contain everything.

The guitar curriculum lives in `sarah-practice-plan/src/data/guitarStudy/`. Currently 10 levels with ~116 exercises. You are replacing this with 14 levels, ~140-170 exercises total.

**CRITICAL:** This is the `sarah-practice-plan` app, NOT the `music-chart` app. Do not modify anything in `../music-chart/`.

---

## WHAT YOU'RE BUILDING

### The Problem
The current guitar curriculum teaches correct music theory but doesn't capture the actual sound and feel of the student's (Gene's) favorite artists. It's "generic music school" — exercises introduce scales and techniques in isolation rather than grounding them in real songs. The student said: "It doesn't really hit the vibe. There's no sauce to it."

### The Solution
14 skill-progressive levels where:
- Every exercise is grounded in a real song from Gene's top 50 playlist
- All music styles are INTERLEAVED (not genre-siloed) — surf, psych, reggae, desert blues, soul, cinematic mixed throughout
- Improvisation is woven into EVERY level from exercise 4 onward (no standalone improv level)
- Each exercise includes: prescribed slow tempo, measurable levelUp goal, diagnostic wrong section, feel description, sarah note connecting to specific artists
- Guitar technique mastery principles from neuroscience research are baked into exercise design

---

## FILES TO READ BEFORE STARTING

Read these files to understand the existing patterns:

1. **`gene_music_profile.md`** (repo root) — Gene's musical DNA, top 50 tracks with verified chords, artist-specific guitar techniques, harmonic patterns. THIS IS YOUR PRIMARY REFERENCE for song data and artist details.

2. **`sarah-practice-plan/src/data/singerSongwriter/level-03-first-notes.js`** — The QUALITY STANDARD. Read this file to understand what a great exercise looks like. Every guitar exercise you write should match this quality: deeply intentional, constraint-based, artist-referenced, with real sauce in the `sarah` notes.

3. **`sarah-practice-plan/src/data/guitarStudy/level-05-desert-blues.js`** — The best existing guitar level. Good example of drone work, hypnotic repetition, Tinariwen references. Much of this level can be kept with minor edits.

4. **`sarah-practice-plan/src/data/guitarStudy/level-01-pentatonic-rhythm-basics.js`** — Existing Level 1. Shows the exercise data structure, field formats, and how exercises reference backing tracks.

5. **`sarah-practice-plan/src/JungleTools.jsx` lines 2154-2239** — The `SCALES` dictionary. You need to add new scales here.

6. **`sarah-practice-plan/src/JungleTools.jsx` lines 5396-5419** — The `CHORD_VOICINGS` dictionary. You need to expand this.

7. **`sarah-practice-plan/src/JungleTools.jsx` lines 5500-5600** — The existing `ChordDiagram` component. You'll extend this.

8. **`sarah-practice-plan/src/App.jsx` lines 1028-1040** — Where exercise tool components are rendered (fretboard, piano, etc.). You'll add ChordVoicingViewer here.

9. **`sarah-practice-plan/src/App.jsx` lines 3360-3410** — `GuitarStudyView` component. Imports `GUITAR_STUDY` from `index.js`.

10. **`sarah-practice-plan/src/App.jsx` lines 4076-4132** — Previous localStorage migration scripts. Follow this pattern for the guitar progress wipe.

11. **`~/.claude/plans/compressed-doodling-mango.md`** — The full plan with all research summaries, pedagogy principles, and level structure.

---

## EXERCISE DATA STRUCTURE

Every exercise MUST have these fields (copy the exact format from existing exercises):

```javascript
{
  id: "gs-{level}-{exercise_num}",  // e.g., "gs-1-1", "gs-5-3"
  time: 8,                           // minutes
  title: "Exercise Title",
  type: "guitar",                    // always "guitar" for guitar study
  what: "Description of what you'll do and why it matters.",
  setup: "Guitar. Metronome at 80 BPM.",  // optional
  steps: [
    { text: "Step 1 instruction.", why: "Why this matters." },
    { text: "Step 2 instruction.", why: "Why this matters." }
  ],
  feel: "What this should feel like when you're doing it right.",
  wrong: "What it sounds/feels like when it's wrong, and how to fix it.",
  sarah: "Personal note connecting this exercise to Gene's specific artists and songs.",
  metronome: 80,                     // BPM
  levelUp: "Specific, measurable completion criteria.",

  // OPTIONAL fields (use when appropriate):
  recorder: true,                    // enables audio recording
  tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
  drone: { root: "A", octave: 2, texture: "analog" },
  fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
  referencePitches: getPitchRange("A2", "A4"),  // import from appData.js
  rhythmCells: [{ name: "Offbeat Skank", pattern: [0.5, 0.5], description: "..." }],
  phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } },
  speedLadder: { start: 60, end: 90, increment: 10, bars: 4 },
  pitchContour: true,
  volumeMeter: true,
  volumeContour: true,

  // NEW field for chord diagrams:
  chordVoicings: { chords: ["C#m", "B", "F#"] }
}
```

---

## LEVEL STRUCTURE (14 levels)

Each level file exports a single object with this structure:

```javascript
export const levelN = {
  level: N,
  title: "Level Title",
  subtitle: "One-line vibe description.",
  description: "2-3 sentences explaining what this level covers and why.",
  artists: "Artist1, Artist2, Artist3",
  unlocks: "Next Level Title (Level N+1)",
  review: {
    label: "Previous Level Check-In",
    time: 5,
    exercises: ["gs-{prev}-{x}", "gs-{prev}-{y}"],
    prompt: "What to play and what to check before starting this level."
  },
  exercises: [ /* array of exercise objects */ ]
};
```

### The 14 Levels

| Level | File Name | Title | Skills | Key Songs (VERIFIED chords) |
|-------|-----------|-------|--------|----------------------------|
| 1 | `level-01-first-sounds.js` | First Sounds | Open chords, basic strum, pentatonic, one-note improv | Dope & Smoke (Am-D-Am7-D7), Son of a Beach (F-G-C-Am), Real Love Baby (D-Em-G-A7), Pattymanajaro (Am-G-C-Em) |
| 2 | `level-02-rhythm-and-feel.js` | Rhythm & Feel | Strumming dynamics, behind-beat feel, syncopation, blues scale, bends | Close My Eyes (D-Bm-G-A), Mexico (F-C-G-Am), Foaming (A-G-D capo 1) |
| 3 | `level-03-power-and-drive.js` | Power & Drive | Power chords, palm muting, fuzz, PReVaDe intro | Going Gets Tough (G-C-D-Em capo1), Summer Heat (E-A-B-C#m), Something About You (F-Em-Am-Dm) |
| 4 | `level-04-the-offbeat.js` | The Offbeat | Reggae skank, ghost notes, offbeat rhythm, muting | Gimme Love (F-C-G), Jah Werx (B-F#-E), 1999 (E-B-F#-A), It's a Love (E-A-C#m-F#-B) |
| 5 | `level-05-barre-chord-world.js` | Barre Chord World | Full barre shapes, sliding barres, minor key movement | Sol Del Sur (C#m-B-F#-E), Island Fever (Fm-Bbm-Ab-Eb), Just Yesterday (E-G), Sunset Garage (G-Em-C-D) |
| 6 | `level-06-jangle-and-shimmer.js` | Jangle & Shimmer | Maj7/sus2 voicings, open string resonance, jangle strum | Friends (Em-Dmaj7), Geneva Strange (G-C-D-Gm), Get Away (E-F#-G#m-E7) |
| 7 | `level-07-the-groove-machine.js` | The Groove Machine | SoCal reggae-rock switch, rock solos over reggae, distorted skank | Stormtrooper (Pepper), Closer to the Sun (A-G-C-D), Warmth of the Sun (E-D-A-Bm) |
| 8 | `level-08-desert-and-drone.js` | Desert & Drone | Sus pentatonic, Drop D, drones, quarter-tone bends, patience | Nànnuflày (Tinariwen), 15-min extended jams |
| 9 | `level-09-extended-harmony.js` | Extended Harmony | 7th chords, Dorian mode, ghost-note grooves, rootless voicings | I Didn't Know (Bbmaj7-F-G / Gm-C-A7-Dm), Chewing Gum (Am-D-Dm7-Dm), Texas Sun (Am-G-Em-Bm) |
| 10 | `level-10-global-colors.js` | Global Colors | Afrobeat patterns, bossa rhythm, Persian scale, tone knob, parked wah | Abusey Junction (Kokoroko), Rules (Khruangbin Am-G) |
| 11 | `level-11-fingerpicking.js` | Fingerpicking | PIMA, Travis picking, duo thinking, percussive slap | Breakdown (G-Bm-Em-D capo5), Coastline (G-Bm-A) |
| 12 | `level-12-dynamics-and-expression.js` | Dynamics & Expression | Major→minor trick, volume swells, dynamics, Phrygian spice | Marsha (Dm-C-G-F-Bb), Peace Blossom Boogy (D-G7-A) |
| 13 | `level-13-the-full-palette.js` | The Full Palette | Style switching, scale choice improv, PReVaDe across genres | Multi-style jams, transcription |
| 14 | `level-14-your-sound.js` | Your Sound | Build your set, performance identity | Gene's own 30-min Golden Hour Set |

---

## VERIFIED SONG CHORD DATABASE (re-verified March 2026)

> **IMPORTANT:** This database was re-verified after discovering errors in the initial research (e.g., Dope & Smoke was wrongly listed as Am-D-G when it's actually Am-D-Am7-D7). Every entry below has been checked against Ultimate Guitar tabs. Use ONLY these chords. Do NOT guess.
>
> ✅ = Verified from UG tab | ⚠️ = Chordify/secondary only | ❌ = No tab, needs ear transcription

### ✅ UG-Verified Songs (use with confidence):

| Song | Artist | Key | BPM | Chords | Capo | UG Source |
|------|--------|-----|-----|--------|------|-----------|
| Dope & Smoke | DOPE LEMON | Am | 112 | **Am, D, Am7, D7** (NO G chord) | None | UG 2931401 |
| Sol Del Sur | Sun Room | C#m | ~100 | C#m-B-F# (verse), E-F# (chorus) | None | UG+KhmerChords |
| Breakdown | Jack Johnson | G | 75 | G-Bm-Em-D (verse), G-D/F#-Em-D (chorus) | **Capo 5** | UG ver 3 |
| I Like The Way You Walk | The Donkeys | D/A | 97 | D-Dsus2-A (verse), B-C#-E-F# (chorus) | None | UG+GuitarTabsExplorer |
| Friends | levitation room | D | 100 | Em-Dmaj7 (verse), A-Em (chorus) | None | UG+Cifraclub |
| Going Gets Tough | The Growlers | Ab | 158 | G-C-Cadd6 (intro), C-Em-D (pre), G-D-Em-C (chorus) | **Capo 1** | UG 1674953 |
| Something About You | Eyedress | Am | 133 | F-Em-Am-Dm (pattern: F-Em-F-Em-Am-Dm-Em) | None | UG official 4630715 |
| Marsha | Current Swell | **Dm** | 116 | Dm-C-G-F-Bb (verse), G-F-Bb-F-C → Bb-C-Dm (chorus) | None | UG+Cifraclub |
| Real Love Baby | Father John Misty | G | 102 | **D-Em-G-A7** (std tuning) or E-F#m-A (capo 2) | None or **Capo 2** | UG+Cifraclub |
| Gimme Love | The Elovaters | **C** | 86 | **F-C-G** (NOT B-F#-E) | None | UG 5290284 |
| Sunset Garage | Sun Room | G | 142 | **G-Em-C-D** (NOT G-B-C-D) | None | UG 5485764 |
| Just Yesterday | Sun Room | Bm | 130 | E, G (primary two chords) | None | UG tab+KhmerChords |
| Texas Sun | Khruangbin | Am | 111 | Am-G (main), Em-Bm (bridge only) | None | UG+GuitarTabsExplorer |
| Jah Werx | Susto | B | 85 | B-F#-E | None | UG+KhmerChords |
| Oysters In My Pocket | Royel Otis | **A** | 168 | **A-F#m (verse), Bm-A-D (chorus)** | None | UG+KhmerChords |
| Peace Blossom Boogy | Babe Rainbow | **D** | ~112 | **D-G7 (main), A (solo only)** | None | UG+KhmerChords |
| Son of a Beach | The Polarity | C | 110 | F-G-C-Am | None | UG |
| Foaming | Day We Ran | Bb | 130 | **A-G-D** | **Capo 1** | UG 5050210 |
| Mexico | Husbands | C | 150 | F-C-G-Am (+ Dm, E) | None | UG 5633340 |
| Surf Hat | Surf Hat | E | ~100 | E7-A7-B7-F#7 | None | UG 5121190 |
| I Didn't Know | Skinshape | F/Dm | ? | **Bbmaj7-F-G (intro), Gm-C-F-Bb / Gm-C-A7-Dm (verse)** | None | UG+Guitaretab |
| Rules | Khruangbin | Am | 74 | **G-Am-F-G-Em-F-Em-Am** | None | UG GP+tabs |
| Pictures of You | Drugdealer | B | 114 | C#m7-F#m7-B-B6 (verse) | None | UG 4427972 |

### ⚠️ Secondary-source only (use but flag for ear verification):

| Song | Artist | Key | Chords | Source | Notes |
|------|--------|-----|--------|--------|-------|
| Pattymanajaro | Yasawa Group | C | Am-G-C-Em | Chordify | Not on UG |
| Get Away | Babitha | E | E-F#(maj)-G#m-E7 | Chordify | F# is MAJOR not minor |
| It's a Love | Baskervillain | E | E-A-C#m-F#-B | Chordify+ChordU | Not on UG |
| 1999 | NO CIGAR | Ab | E-B-F#-A | Chordify | UG artist page exists but 403 |
| Warmth of the Sun | levitation room | Am | E-D-A-Bm-B | ChordU+Chordify | Core: E-D-E pattern |
| Island Fever | Billy Changer | Fm | Fm-Bbm-Ab-Eb | Chordify auto | No human tab |
| Chewing Gum | Cotton Jones | Am | Am-D-Dm7-Dm | Chordify | Not on UG |
| Geneva Strangemod | Glyders | G | G-C-D-Gm | Chordify | Title is "Geneva Strangemod" |
| Matter of Time | Vandelux | G | G-C | ChordU+Chordify | Two-chord |
| Reunited with the Day | The Groovy Nobody | F#m | F#m-B-F#m7-B7 | Chordify | Needs ear verify |
| Baby | Ariel Pink | G | D-Em | ChordU+UG | Two-chord |
| Saving A Life | Richard Houghten | Fm | Bbm-Fm-Ab-F-Bb | UG GP intro only | Instrumental |
| Coastline | Hollow Coves | D | G-Bm-A (std approx) | UG | Original tuning CGDGGD capo 7 |

### ❌ No tab found — needs ear transcription:
North Side (Bunchy Tops), for my team (axaero), Candy Flu (Walking Who), Space Garden (Auntie Leo), **Summer Heat (Sun Room — NO TAB EXISTS anywhere)**, Long Summer (Yalisco), End of Time (The Everywheres), Visions of My Mind (levitation room), Tongue (Edamame), Trust (Hot Flash Heat Wave), I See You (Echo Frame), Close My Eyes (The Lagoons), The West (Les Krills — UG paywalled)

### MAJOR CORRECTIONS from initial research:
These were WRONG in the first research pass and have been fixed:
1. **Dope & Smoke**: Was Am-D-**G** → Actually Am-D-Am7-D7 (no G chord at all)
2. **Gimme Love**: Was **B-F#-E** → Actually **F-C-G** (completely wrong key)
3. **Sunset Garage**: Was G-**B**-C-D → Actually G-**Em**-C-D (B was wrong)
4. **Marsha**: Was key of **F** → Actually key of **Dm** (Dm-C-G-F-Bb)
5. **Real Love Baby**: Was D-Em-G → Actually D-Em-G-**A7** (missing chord)
6. **Going Gets Tough**: Was Ab-Db-Eb-Fm → Actually **G-C-Cadd6-Em-D (capo 1)** (need playable version)
7. **I Didn't Know**: Was Gm7-C7-Dm7-A7 → Actually **Bbmaj7-F-G / Gm-C-F-Bb / Gm-C-A7-Dm** (much richer)
8. **Peace Blossom Boogy**: Was F#m-D-A-E → Actually **D-G7-A** (completely wrong key)
9. **Oysters In My Pocket**: Was C-G-Am-F → Actually **A-F#m-Bm-D** (completely wrong key)
10. **Foaming**: Was Ab-Eb-Bb-Bbm → Actually **A-G-D (capo 1)** (need playable version)
11. **Rules**: Was Am-G → Actually **G-Am-F-G-Em-F-Em-Am** (much more complex)
12. **Pictures of You**: Was E-Bm-F#m → Actually **C#m7-F#m7-B-B6** (different key, jazz voicings)

---

## ⚠️ RELIABILITY WARNING: What You Can Trust vs. What You Can't

The chord database above was re-verified against UG tabs and is reliable. But **other details from the research may not be**. Here's the breakdown:

### RELIABLE (from artist interviews, rig rundowns, verified sources):
- **Artist gear** — Speer's flatwound strings, Sun Room's Jazzmaster+Tubescreamer, etc. (from Premier Guitar, Equipboard, band interviews)
- **General playing approach** — Khruangbin's three-note voicings, Tinariwen's drone-based playing, Skinshape's drums-first process
- **Genre-level patterns** — reggae offbeat, surf reverb, psych fuzz, desert blues repetition
- **Harmonic patterns** — descending minor, major→minor trick, etc. (derived from verified chords)

### NOT RELIABLE (may be generic/hallucinated):
- **Song-specific strum patterns** — "Down, Down-Up, Down-Up" for Sun Room was derived from a general surf description, NOT from analyzing Sol Del Sur specifically
- **Song-specific BPMs** — automated tools (SongBPM, Tunebat) can be off by 2x on half-time songs
- **Picking patterns** — "Travis picking for Jack Johnson" is generically correct but the specific pattern for Breakdown wasn't verified note-by-note
- **Any detail described as "likely" or "probably"**

### WHAT TO DO ABOUT THIS:
When writing exercises about a specific song:
1. **Chords** — use the verified database above, these are correct
2. **Strum patterns** — describe the GENERAL STYLE feel ("laid-back offbeat with muted ghost strums") rather than a precise notation ("D-DU-UDU"). Add: "Listen to the recording and match the feel."
3. **BPM** — use as approximate starting point. Add: "Adjust metronome to match the recording."
4. **Tone/effects** — artist-level gear info is reliable. Song-specific tone differences are not verified.
5. **When in doubt** — write "Listen to [song name] and match the rhythmic feel" rather than prescribing a specific pattern you haven't verified.

---

## ARTIST-SPECIFIC GUITAR TECHNIQUES

These are from verified sources (interviews, rig rundowns). Reference in `sarah` notes:

### Sun Room
- **Gear:** Jazzmaster + Tubescreamer always-on (low gain, tone shaper) + Fender Deluxe Reverb
- **Strum:** NOT straight downstrokes. Down, Down-Up, Down-Up syncopated push. Muted strums between hits.
- **Key move:** i-bVII-IV progression (C#m-B-F#). F# is MAJOR — borrowed from parallel major.

### Allah-Las
- **Gear:** 1970s Fender, Twin Reverb Blackface. Standard tuning.
- **Signature:** Cmaj7 → Dmaj7 — open high E string IS the maj7. That's the jangle.
- **Key progression:** Am-G-F-E (i-bVII-bVI-V) — the core psych-surf descending minor.

### Khruangbin (Mark Speer)
- **Gear:** Strat with DiMarzio DP186 pickups, D'Addario Chromes FLATWOUND strings, volume 7-8, tone 5-6
- **Effects:** EHX Holy Grail reverb, chorus, DS-1 with gain almost off + parked wah
- **Technique:** Three-note voicings top 3 strings ONLY. Chord shapes slid around neck like samples. Persian/Iranian scales. Behind-the-beat phrasing. 60%+ silence.

### Mystic Braves
- **Sound:** Fuzz-forward (Big Muff style), two guitars split lead/rhythm. More grind than jangle.
- **Key progression:** Gm-Dm-C (i-v-bVII). Dark, droning, modal.

### BALTHVS
- **Background:** Colombian trio. Santana + cumbia + Turkish music.
- **Technique:** Syncopated 16th-note chord STABS (not sustained strums). Clave-based feel. Cleaner than Mystic Braves.

### Skinshape
- **Chords:** Heavy 7ths (Gm7, C7, Dm7, A7), maj7s (Bbmaj7, Fmaj7)
- **Process:** Records drums first, improvises guitar over groove. Lee Perry / King Tubby dub influence.

### DOPE LEMON
- **Key trick:** D → Dm → G → Gm (major→minor oscillation = 1960s soul ballad trick)
- **Feel:** Lo-fi, behind the beat, reverb-drenched. Simple progressions, emotional weight.

### Pepper / SoCal Reggae-Rock
- **The move:** Clean skank verse → crunchy power chord chorus (the "SoCal switch")
- **Stormtrooper:** Power chord intro (D#5, A#5, F#5) then reggae. 150 BPM.
- **Vs. roots reggae:** Four-on-the-floor kick (not one-drop), power chords + skank, distorted solos

### Tinariwen / Tuareg Guitar
- **Scale:** Sus pentatonic = 1-2-4-5-b7 (NO 3rd). Tonally ambiguous.
- **Tunings:** Most common: G-A-D-G-B-E. Also DADGAD. Standard tuning + Drop D is an accessible alternative.
- **Technique:** Drone strings + melody. Hypnotic repetition. Quarter-tone bends.

### Hermanos Gutiérrez
- **Technique:** Both are classical fingerpickers. Estevan's "slap-horse" percussive galloping.
- **Gear:** Strymon El Capistan (tape echo AS reverb), Magnatone vibrato amps.
- **Rhythm base:** Milonga and cumbia (Latin American), NOT rock.

### Tommy Guerrero
- **Technique:** Finger-picked (NOT flat-picked). Ethio-jazz/Afrobeat influences. Melody-as-vocalist.
- **Gear:** 1980s Japanese Fender Telecaster through Fender amps.

---

## HARMONIC PATTERNS TO REFERENCE

These patterns appear across Gene's top 50. Reference them in exercises:

1. **Descending minor (i-bVII-bVI-V):** Am-G-F-E. Core psych-surf.
2. **Minor i-bVII-IV:** C#m-B-F# (Sol Del Sur). Major IV = Mixolydian ambiguity.
3. **Major→minor shift:** D-Dm, G-Gm. Appears in DOPE LEMON, modGlyders, Cotton Jones.
4. **Cmaj7-Dmaj7 float:** Allah-Las. Two major 7ths a step apart. Non-resolving, dreamy.
5. **Soul 7th cycle:** Gm-C-A7-Dm (Skinshape).
6. **Three-chord reggae:** B-F#-E. Appears in Gimme Love, Jah Werx.
7. **I-V-vi-IV:** A-F#m-Bm-D (Oysters In My Pocket).

---

## PEDAGOGY PRINCIPLES (bake into every exercise)

From deep research into neuroscience, motor learning, and music education:

1. **Slow practice is primary.** Every exercise: "Start at X BPM. Only increase after 5 consecutive error-free reps."
2. **Sleep consolidation.** Include: "If you can't get it after 10 minutes, stop and try tomorrow — your brain consolidates during sleep."
3. **One focal point per exercise.** If working on chord transitions, give the rhythm. If working on rhythm, use one chord.
4. **80% success rate = optimal zone.** Exercises should be challenging but achievable.
5. **Constraint-based improv from day 1.** "Play only these 3 notes for 2 minutes" → builds musicality through limitation.
6. **Song-first, not scale-first.** Start with the song, extract the technique.
7. **Record and compare.** Use `recorder: true` generously.
8. **Interleaved practice.** Design exercises to cycle in sets of 3-5, not sequential completion.
9. **Sing it first.** For melody exercises: "Sing the phrase before playing it."
10. **Rep counts with reset.** "10 clean transitions in a row. If you buzz, restart from zero."

### Guitar-Specific Technique Methods

**Barre chords (Level 5):**
- Start at fret 5, NOT fret 1. F major at fret 1 is graduation, not starting point.
- Isolation drill: index finger ONLY across all strings first. Fix each buzzing string. Then add fingers one at a time.
- Technique > strength. Bony side of finger, thumb behind index, elbow slightly in.

**Strumming (Levels 1-2):**
- Constant arm motion principle: arm swings like pendulum on every 8th note. You "miss" strings on rests, arm never stops.
- Vocalize patterns before playing: "down-down-up-up-down-up"

**Reggae skank (Level 4):**
- Play ONLY on "ands" (upbeats). Count "1 AND 2 AND 3 AND 4 AND" — strum on ANDs.
- Immediate palm mute after each stroke. Short, percussive.
- If foot taps at same time as strum, you're on the downbeat (wrong).

**Fingerpicking (Level 11):**
- Phase 1: Static thumb, P-i-m-a on strings 5-3-2-1
- Phase 2: P-i-m-a-m-i six-note loop
- Phase 3: Travis picking — alternating thumb independence
- Pick tuck for mid-song transitions

**Bends (Levels 2, 8):**
- Supporting fingers behind bending finger always
- Train pitch: play target note first, remember it, then bend to match
- Most beginners under-bend. Over-bend first, then calibrate down.

---

## TECHNICAL PREREQUISITES (do these FIRST)

### 1. Add new scales to SCALES dict

In `JungleTools.jsx` after line 2239, add:

```javascript
"c#m-pentatonic": {
  name: "C#m Pentatonic",
  root: "C#",
  notes: ["C#", "E", "F#", "G#", "B"],
  positions: { 1: [9, 12], 2: [11, 14], 3: [2, 5], 4: [4, 7], 5: [6, 9] }
},
"gm-pentatonic": {
  name: "Gm Pentatonic",
  root: "G",
  notes: ["G", "B♭", "C", "D", "F"],
  positions: { 1: [3, 6], 2: [5, 8], 3: [7, 10], 4: [10, 13], 5: [0, 3] }
},
"a-natural-minor": {
  name: "A Natural Minor",
  root: "A",
  notes: ["A", "B", "C", "D", "E", "F", "G"],
  positions: { 1: [5, 8], 2: [7, 10], 3: [9, 12], 4: [12, 15], 5: [0, 3] }
},
"em-pentatonic": {
  name: "Em Pentatonic",
  root: "E",
  notes: ["E", "G", "A", "B", "D"],
  positions: { 1: [0, 3], 2: [2, 5], 3: [5, 8], 4: [7, 10], 5: [9, 12] }
},
```

### 2. Expand CHORD_VOICINGS dict

In `JungleTools.jsx` after line 5419, add these chords (needed for exercises):

```javascript
// Minor chords
"C#m": { frets: "x46654", name: "C#m" },
"F#m": { frets: "244222", name: "F#m" },
"Bbm": { frets: "x13321", name: "Bbm" },

// 7th chords
"Am7":  { frets: "x02010", name: "Am7" },
"Dm7":  { frets: "xx0211", name: "Dm7" },
"Em7":  { frets: "022030", name: "Em7" },
"Cmaj7": { frets: "x32000", name: "Cmaj7" },
"Dmaj7": { frets: "xx0222", name: "Dmaj7" },
"Gm7":  { frets: "353333", name: "Gm7" },
"C7":   { frets: "x32310", name: "C7" },
"A7":   { frets: "x02020", name: "A7" },
"E7":   { frets: "020100", name: "E7" },
"B7":   { frets: "x21202", name: "B7" },
"F#7":  { frets: "242322", name: "F#7" },
"G7":   { frets: "320001", name: "G7" },

// Sus chords
"Dsus2": { frets: "xx0230", name: "Dsus2" },
"Asus2": { frets: "x02200", name: "Asus2" },

// Power chords
"A5":  { frets: "x022xx", name: "A5" },
"D5":  { frets: "xx023x", name: "D5" },
"E5":  { frets: "022xxx", name: "E5" },
"B5":  { frets: "x244xx", name: "B5" },
```

### 3. Add localStorage migration

In `App.jsx`, find the existing migration block (around line 4076-4132) and add after the last migration:

```javascript
// Migration: Guitar curriculum v2 — wipe guitar progress for 14-level rework
if (!localStorage.getItem("guitar-v2-migrated")) {
  const saved = localStorage.getItem("practice-completed");
  if (saved) {
    try {
      const completed = new Set(JSON.parse(saved));
      const filtered = [...completed].filter(id => !id.startsWith("gs-"));
      localStorage.setItem("practice-completed", JSON.stringify(filtered));
    } catch {}
  }
  localStorage.removeItem("guitar-study-level");
  localStorage.setItem("guitar-v2-migrated", "true");
}
```

### 4. Update index.js

Replace `sarah-practice-plan/src/data/guitarStudy/index.js` with:

```javascript
import { level1 } from "./level-01-first-sounds.js";
import { level2 } from "./level-02-rhythm-and-feel.js";
import { level3 } from "./level-03-power-and-drive.js";
import { level4 } from "./level-04-the-offbeat.js";
import { level5 } from "./level-05-barre-chord-world.js";
import { level6 } from "./level-06-jangle-and-shimmer.js";
import { level7 } from "./level-07-the-groove-machine.js";
import { level8 } from "./level-08-desert-and-drone.js";
import { level9 } from "./level-09-extended-harmony.js";
import { level10 } from "./level-10-global-colors.js";
import { level11 } from "./level-11-fingerpicking.js";
import { level12 } from "./level-12-dynamics-and-expression.js";
import { level13 } from "./level-13-the-full-palette.js";
import { level14 } from "./level-14-your-sound.js";

export const GUITAR_STUDY = [
  level1, level2, level3, level4, level5, level6, level7,
  level8, level9, level10, level11, level12, level13, level14
];
```

---

## KEY FRAMEWORKS TO USE IN EXERCISES

### PReVaDe (Motif Development Framework)
Used throughout the curriculum for improvisation and composition. The other AI MUST understand this:
- **P**resent — play a short musical idea (motif) 4-8 times exactly as-is
- **R**epeat — play it 4-8 more times identically (repetition declares the theme)
- **Va**ry — change ONE element (swap one chord, change one note, alter the rhythm). Keep everything else identical.
- **De**construct — simplify: reduce to 2 notes, then 1 note, then silence. The piece dissolves back to its origin.

This framework appears in Levels 3 (intro), 8 (desert), 9, 12, and 13. Use the `phraseForm` field:
```javascript
phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } }
```

### Constant Arm Motion (Strumming Foundation)
The #1 strumming principle — teach in Level 1, reinforce everywhere:
- The strumming arm swings like a pendulum on every 8th-note subdivision (down on downbeats, up on upbeats)
- The arm NEVER STOPS. A strumming "pattern" is which swings actually HIT strings vs. which MISS
- Rests = arm keeps swinging but lifts away from strings
- This is why beginners sound mechanical: they stop their arm between strums

### One-Minute Changes Drill
Justin Guitar's most effective exercise — use in Levels 1-2 and anywhere chord transitions are introduced:
- Set timer for 60 seconds
- Pick two chords
- Switch back and forth as many times as possible
- Count changes. Write it down. Beat your count tomorrow.
- Target: 30 changes/minute = chord pair is solid. Under 10 = needs daily practice.

### Anchor Finger Concept
For chord transitions — identify shared fingers between chord pairs:
- Am to C: ring finger stays on string 4, fret 2
- G to Cadd9: middle and ring fingers stay planted
- D to Dsus4: only pinky moves
Always identify the anchor finger BEFORE drilling the transition.

---

## ADDITIONAL VERIFIED SONG DATA

These Allah-Las songs are verified and useful for Level 6 (Jangle & Shimmer):

| Song | Key | Chords | Notes |
|------|-----|--------|-------|
| Worship the Sun | C/A | Cmaj7-Dmaj7 (verse), A-G-A-E (chorus) | The Cmaj7→Dmaj7 IS the jangle |
| Catamaran | Am | Am-C-D-Dm | The D→Dm shift creates dark restlessness |
| Long Journey | A | A-C-G-D (intro), G-D-A-C-G-D (verse) | bVII (G) borrowed from A Mixolydian |

These Khruangbin songs for Level 10:
| Song | Key | Chords |
|------|-----|--------|
| Maria Tambien | Bm | Bm-D-E-A |
| Con Todo El Mundo | A | G-A-E-D / Em |

These Ocean Alley songs (useful if needed):
| Song | Key | BPM | Chords |
|------|-----|-----|--------|
| Confidence | Bm | 143 | Em-Bm-F#m-G |
| Yellow Mellow | Bm | 86 | Bm-D-Bm7-Em7 |

---

## BACKING TRACK KEYS (critical for matching songs to tracks)

The other AI MUST match backing tracks to exercise keys. Here's what we know about each:

| Track | Key | BPM | Best for levels |
|-------|-----|-----|-----------------|
| `/surf-rock-120.mp3` | E major | 120 | 2, 3 (surf exercises) |
| `/e-major-surf-120.mp3` | E major | 120 | 2, 3 |
| `/psych-rock-120.mp3` | Am (likely) | 120 | 3 (psych exercises) |
| `/reggae-one-drop-85.mp3` | Am (likely) | 85 | 4 (roots reggae) |
| `/reggae-rock-100.mp3` | Am/E (likely) | 100 | 4, 7 (SoCal reggae) |
| `/dub-reggae-85.mp3` | Am (likely) | 85 | 4, 7 |
| `/ska-upbeat-95.mp3` | ? | 95 | 4 |
| `/desert-blues-75.mp3` | Am/D | 75 | 8 (desert) |
| `/khruangbin-style-80.mp3` | Am (likely) | 80 | 10 (global) |
| `/afrobeat-100.mp3` | ? | 100 | 10 (afrobeat) |
| `/bossa-nova-75.mp3` | ? | 75 | 10 (bossa) |
| `/deep-soul-groove-80.mp3` | Am (likely) | 80 | 9 (soul) |
| `/soul-funk-groove-90.mp3` | Am (likely) | 90 | 9 (soul) |
| `/cinematic-western-80.mp3` | Am/Dm (likely) | 80 | 11, 12 (cinematic) |
| `/groove-beat-90.mp3` | neutral | 90 | 1, 2 (general) |
| `/sol-del-sur.mp3` | C#m | ~100 | 5 (Sol Del Sur study) |
| `/a-major-folk-80.mp3` | A | 80 | 1, 11 |
| `/a-major-reggae-85.mp3` | A | 85 | 4 |
| `/e-major-reggae-85.mp3` | E | 85 | 4 |

**Note:** When an exercise is in a key that doesn't match any backing track (e.g., C#m for Sol Del Sur), either: (1) use `/sol-del-sur.mp3` if it's that specific song, (2) use a drums-only track (key-neutral), or (3) don't assign a backing track and let the student play unaccompanied.

---

## CHORD VOICING VIEWER — FULL COMPONENT SPEC

The UX review agent designed this. The executing AI should build it.

### What exists already
- `ChordDiagram` component at JungleTools.jsx:5501 — vertical chord box, SVG rendering
- `CHORD_VOICINGS` dict at JungleTools.jsx:5396 — 19 basic chords in `"x32010"` string format
- Used in StrumChartBuilder at line 6906

### What to build: `ChordVoicingViewer` component

**New export in JungleTools.jsx** (place after FretboardDiagram ~line 2595):

```jsx
// Exercise field: chordVoicings: { chords: ["C#m", "B", "F#"] }
export function ChordVoicingViewer({ theme: T, chords, defaultChord }) {
  // Shows chord selector pills (like FretboardDiagram position pills)
  // Selected chord shows its voicing diagram (vertical chord box)
  // Tap diagram to play the chord (arpeggiated, 80ms between strings)
  // Uses CHORD_VOICINGS dict for fret data
  // Falls back to "?" display if chord not in dict
}
```

**Key design decisions (from UX review):**
1. **Separate component**, not extension of FretboardDiagram (different data shape)
2. **Vertical chord box** (traditional orientation, ~200px wide x 160px tall)
3. **Chord selector pills** above the diagram (same visual as FretboardDiagram position pills)
4. **Tap to play** — arpeggiated (80ms stagger per string), not simultaneous strum
5. **Muted strings** = X above nut, **Open strings** = O above nut
6. **Fret position number** shown to left when starting above fret 1

**Render in App.jsx** (after the fretboard block, ~line 1034):
```jsx
{ex.chordVoicings && (
  <ChordVoicingViewer theme={T} chords={ex.chordVoicings.chords} defaultChord={ex.chordVoicings.defaultChord} />
)}
```

---

## LEVEL 8 (DESERT & DRONE) — WHAT TO KEEP FROM EXISTING

The current Level 5 (desert blues) is the BEST existing level. For the new Level 8, **keep these exercises with minor edits** rather than rewriting from scratch:

- **gs-5-1** "Sus Pentatonic — One Note Different" → renumber to gs-8-1, keep content
- **gs-5-2** "Drop D Drone Setup" → renumber to gs-8-2, keep content
- **gs-5-3** "Rhythm Drone" → renumber to gs-8-3, keep content
- **gs-5-4** "Hypnotic Repetition" → renumber to gs-8-4, keep content
- **gs-5-5** "Drone Motif Development" → keep, add PReVaDe formalization
- **gs-5-6** "Drone + Melody" → keep
- **gs-5-7** "Desert Recovery" → keep (C/B slip exercise is excellent)
- **gs-5-8** "Quarter-Tone Bends" → keep
- **gs-5-9** "Song Study: Tinariwen Nannuflay Style" → keep
- **gs-5-10** "Desert Blues Toggle" → keep
- **gs-5-11** "Extended Desert Jam" → keep

**Add** 2-3 new exercises:
- A Bombino-style exercise (more aggressive/electric than Tinariwen)
- An improv exercise: "Improvise in sus pentatonic over drone, change ONE note per minute"
- A Vieux Farka Touré reference exercise

**Edit existing exercises:**
- Add `chordVoicings` fields where relevant
- Update `sarah` notes to reference Gene's playlist
- Add sleep encouragement where appropriate
- Ensure improv thread is present (it mostly is — this level has good improv already)

Read the full file at: `sarah-practice-plan/src/data/guitarStudy/level-05-desert-blues.js`

---

## SINGER-SONGWRITER CURRICULUM UPDATES (SECONDARY SCOPE)

Gene also wants the singer-songwriter curriculum updated with the new research. This is a TARGETED pass — not a rewrite. The SS curriculum structure and pedagogy are excellent. The updates are about swapping generic chord progressions for Gene's actual songs and enriching artist references with verified data.

**Files:** `sarah-practice-plan/src/data/singerSongwriter/level-01-autopilot-strumming.js` through `level-15-performance-identity.js`

### WHAT NOT TO CHANGE
- Don't restructure levels — the SS curriculum structure is great
- Don't change exercise IDs
- Don't change the pedagogical framework (constraint-based, one-note-at-a-time)
- Don't change the `steps` instructions unless the chord progression changes require it
- Levels 1-2 `sarah` notes are already excellent — leave them alone
- The quality of Level 3 exercises is the gold standard — do NOT diminish them

### SPECIFIC CHANGES BY LEVEL

**Level 1 (autopilot-strumming.js):**
- Exercise ss-1-3 references "G-Em-C-D" — keep this (it's a foundation progression, not a song study)
- Exercise ss-1-6 references 80-110 BPM range — this is correct for Gene's music, keep it
- No changes needed — this level is solid

**Level 2 (voice-enters.js):**
- Uses "G-C-D" and "Am-C-G" progressions — these are fine for basic voice-entry exercises
- No changes needed

**Level 3-6 (Gene's current levels):**
- These are already deeply artist-referenced (Tommy Guerrero, Skinshape, Khruangbin, Allah-Las, Tinariwen in sarah notes)
- No changes needed — these are the quality standard

**Level 8 (melody-building.js):**
- Exercise ss-8-4 uses "Am-C-G-Em in 3 different feels" — could add: "Try it with the Am-D-G from Dope & Smoke (DOPE LEMON) for a mellow, behind-the-beat feel"
- Add reference to the descending minor progression (Am-G-F-E) as a melody playground

**Level 9 (creating-your-first-songs.js):**
- Where exercises reference generic progressions for songwriting, ADD references to Gene's actual songs as "here's how [artist] uses this same pattern"

**Level 11 (originals-genre-craft.js) — THIS IS THE BIG ONE:**
This level has Gene creating originals in 4 genres. The progressions are generic. Replace them:

| Exercise | Current Progression | Replace With | Why |
|----------|-------------------|--------------|-----|
| ss-11-1 "Reggae Original" | Am-C-G at 85 BPM | **B-F#-E** at 85 BPM (Gimme Love / Jah Werx progression) | These are Gene's actual reggae songs. The B key requires barre chords which adds realism. |
| ss-11-2 "Surf-Psych Original" | G-Em-C-D at 120 BPM | **C#m-B-F#** at ~100 BPM (Sol Del Sur) OR **Em-Dmaj7** at 100 BPM (Friends by levitation room) | Gene's #4 most-played song. The syncopated strum is the surf feel he wants. |
| ss-11-3 (if exists) "Desert Blues Original" | Likely Am drone | Keep as-is — the sus pentatonic drone approach is correct |
| ss-11-4 (if exists) "Soul Original" | Likely Am-Dm-G | Replace with **Gm-C-A7-Dm** (Skinshape "I Didn't Know") | Gene's actual soul reference |

Also in ss-11-2, update the sarah note from "Think Allah-Las" to be more specific: "Gene, Sol Del Sur is your #4 most-played song. The C#m-B-F# progression with that syncopated strum IS your surf sound. Write your original using the same progression in the same feel — then change one chord to make it yours."

**Level 12 (song-architecture.js):**
- Add reference to the major→minor trick (D→Dm, G→Gm) from DOPE LEMON as a verse→chorus emotional shift technique
- Reference "Geneva Strange" (G-C-D-Gm) as an example of this trick in a real song

**Level 13 (lyrics-songcraft.js):**
- Add Gene's lyric themes from the music profile: ocean, golden hour, travel, warmth, "beautiful day that you know will end"
- Reference the lyric vibe of his top songs as touchstones

**Level 14 (fingerpicking-dynamics.js):**
- Add "Breakdown" by Jack Johnson (G-Bm-Em-D capo 5, Travis picking) as a fingerpicking song study reference
- Add "Coastline" by Hollow Coves (G-Bm-A, alternate tuning) as an advanced fingerpicking reference
- Reference Tommy Guerrero's melody-as-vocalist approach

**Level 15 (performance-identity.js):**
- No changes — this is the capstone and should stay open-ended

### HARMONIC KNOWLEDGE TO BAKE INTO SS EXERCISES

The following research findings should be woven into the SS curriculum wherever melody, harmony, or songwriting is being taught. These are the patterns Gene's favorite music uses — he should understand them so his originals sound like his artists:

**1. The descending minor (i-bVII-bVI-V): Am-G-F-E**
- THE core psych-surf progression. Explain in Level 8 or 9 when chord analysis enters.
- The E at the end is the V chord borrowed from harmonic minor — it has the raised 7th that pulls you back to Am. That tension-resolution IS the surf sound.
- Reference: "This is the backbone of Allah-Las, Mystic Braves, every surf band since the Ventures."

**2. The minor i-bVII-IV: C#m-B-F# (Sol Del Sur)**
- The F# is MAJOR (not F#m) — borrowed from the parallel major key. This Mixolydian ambiguity is why the progression sounds simultaneously dark and open.
- Teach this in Level 11 (Originals). When Gene writes surf originals, this progression is his starting point.

**3. The Cmaj7→Dmaj7 float (Allah-Las)**
- Two major 7th chords a whole step apart. The open E string rings as the maj7 in both chords — that's the jangle.
- Non-resolving — it just hangs in space. This is how Allah-Las create dreamy verses.
- Teach in Level 10 (Hearing Harmony) or Level 11. Show Gene that adding one note (the maj7) transforms a chord from "happy" to "dreamy."

**4. The major→minor oscillation: D→Dm, G→Gm (DOPE LEMON, modGlyders)**
- Same chord, shift the 3rd down one fret. Major → minor. The emotional effect is like sunset — beautiful but ending.
- This is a 1960s soul ballad trick. DOPE LEMON's "Honey Bones" (D-Dm-G-Gm) is built entirely on it.
- Teach in Level 12 (Song Architecture) as a verse→chorus emotional shift tool.

**5. The soul 7th cycle: Gm-C-A7-Dm (Skinshape)**
- Minor ii-V type motion from jazz. The A7 creates tension that resolves to Dm.
- This is what makes Skinshape sound "sophisticated but not jazz." The 7th chords add color without complexity.
- Teach in Level 10 (Hearing Harmony). Show Gene that replacing triads with 7ths changes the vibe from "campfire" to "golden hour studio."

**6. The three-chord reggae: B-F#-E / I-V-IV**
- Appears in Gimme Love, Jah Werx. Three chords, infinite groove. The rhythm IS the song.
- This teaches Gene that reggae originals don't need complex harmony — they need killer rhythm and pocket.

**7. The behind-the-beat feel**
- Gene's entire aesthetic is behind the beat. DOPE LEMON, Khruangbin, reggae — all slightly late.
- Explain in Level 8 or 9: "Playing behind the beat means your voice arrives AFTER the metronome click, not on it. Not late — intentionally behind. This is the feel of every artist you love."
- Mark Speer (Khruangbin) is the master of this. His guitar and Laura Lee's bass sit slightly behind the drum, creating the "lazy precision" feel.

**8. The Sun Room strum**
- NOT straight downstrokes. Down, Down-Up, Down-Up syncopated push.
- Muted/damped strums between chord hits for percussion.
- Reggae-adjacent offbeat emphasis.
- This is the strum pattern Gene should use in his surf-psych originals (Level 11).

**9. Space as a compositional tool**
- Khruangbin: 60%+ of Mark Speer's playing is silence.
- Tinariwen: hypnotic repetition = saying the same thing until it transforms.
- Tommy Guerrero: melody-as-vocalist = the guitar sings a single line, not chords.
- Teach throughout: "If your original sounds cluttered, take things OUT. The space is what makes your favorite music breathe."

**10. Tone as genre identity**
- Spring reverb = surf. Fuzz = psych. Clean chop = reggae. Tape echo = cinematic. Flatwounds + parked wah = Khruangbin.
- When Gene writes originals in Level 11, his tone choice IS his genre choice. Teach this explicitly.

### WHERE TO PUT THESE IN THE SS CURRICULUM

| Pattern | SS Level | Where it fits |
|---------|----------|---------------|
| Descending minor (Am-G-F-E) | L8 Melody Building | When teaching chord-tone melody construction |
| i-bVII-IV (C#m-B-F#) | L11 Originals | Surf-psych original exercise |
| Cmaj7→Dmaj7 float | L10 Hearing Harmony | When introducing chord extensions |
| Major→minor trick | L12 Song Architecture | Verse/chorus contrast technique |
| Soul 7th cycle | L10 Hearing Harmony | When introducing 7th chords |
| Three-chord reggae | L11 Originals | Reggae original exercise |
| Behind-the-beat feel | L8 Melody Building + L11 | Throughout, especially vocal phrasing |
| Space as composition | L9 Creating First Songs | When teaching arrangement |
| Sun Room strum | L11 Originals | Surf-psych original strum pattern |
| Tone as genre ID | L11 Originals | When choosing genre for each original |

### SUMMARY OF SS CHANGES
- **Levels 1-7:** No changes (already excellent)
- **Level 8 (Melody Building):** Add descending minor reference, behind-the-beat phrasing concept, reference verified songs
- **Level 9 (Creating First Songs):** Add "space as composition" concept, reference Gene's songs
- **Level 10 (Hearing Harmony):** Add Cmaj7→Dmaj7 float, soul 7th cycle, major→minor trick as specific harmonic tools Gene hears in his music
- **Level 11 (Originals & Genre Craft):** THE BIG UPDATE — replace generic progressions with verified songs, add Sun Room strum pattern, add tone-as-genre-identity teaching, bake in all harmonic patterns
- **Level 12 (Song Architecture):** Add major→minor as verse/chorus shift, reference "Honey Bones" D-Dm-G-Gm
- **Level 13 (Lyrics):** Add Gene's lyric themes (ocean, golden hour, travel, warmth)
- **Level 14 (Fingerpicking):** Add Breakdown (Jack Johnson) and Coastline (Hollow Coves) as song references
- **Level 15:** No changes

---

## EXECUTION TIPS FOR THE AI

1. **Context window management:** 14 level files is a LOT. Write 2-3 levels per session, verify each builds before moving on. Don't try to write all 14 in one shot.

2. **Quality over quantity.** 10 great exercises per level > 15 thin ones. If you're running low on context, write 10 and mark the level as "expandable" for a future pass.

3. **Read the quality reference FIRST.** `singerSongwriter/level-03-first-notes.js` is the gold standard. Each exercise there has ~100-200 words of deeply intentional prose. Match that.

4. **The `sarah` field is the soul of each exercise.** This is where Gene's specific artists, songs, and vibes come alive. Generic sarah notes = no sauce. Write each one as if Sarah (the teacher) is speaking directly to Gene about HIS music.

5. **Cross-reference check.** After writing each level, verify that `review.exercises` references valid IDs from prior levels. The `review` field should reference 2 exercises from the most relevant earlier levels.

6. **Use the drums-only tracks** for improv exercises where key doesn't matter. They're key-neutral.

7. **When in doubt about a chord progression**, flag it with a comment: `// UNVERIFIED — needs ear confirmation`. Don't silently use uncertain chords.

---

## AVAILABLE BACKING TRACKS

These exist in `/public/` and can be referenced in `tracks` fields:

- `/afrobeat-100.mp3` — Afrobeat groove, 100 BPM
- `/bossa-nova-75.mp3` — Bossa nova, 75 BPM
- `/cinematic-western-80.mp3` — Spaghetti western feel, 80 BPM
- `/deep-soul-groove-80.mp3` — Deep soul, 80 BPM
- `/desert-blues-75.mp3` — Desert blues in A, 75 BPM
- `/dub-reggae-85.mp3` — Dub reggae, 85 BPM
- `/groove-beat-90.mp3` — General groove, 90 BPM
- `/khruangbin-style-80.mp3` — Khruangbin-style global groove, 80 BPM
- `/psych-rock-120.mp3` — Psych rock, 120 BPM
- `/reggae-one-drop-85.mp3` — One-drop reggae, 85 BPM
- `/reggae-rock-100.mp3` — Reggae rock, 100 BPM
- `/ska-upbeat-95.mp3` — Ska, 95 BPM
- `/sol-del-sur.mp3` — Sol Del Sur reference
- `/soul-funk-groove-90.mp3` — Soul funk, 90 BPM
- `/surf-rock-120.mp3` — Surf rock, 120 BPM
- `/drums-reggae-85.mp3` — Drums only, reggae 85 BPM
- `/drums-bossa-75.mp3` — Drums only, bossa 75 BPM
- `/drums-soul-funk-90.mp3` — Drums only, soul/funk 90 BPM
- `/drums-surf-120.mp3` — Drums only, surf 120 BPM
- `/drums-afrobeat-110.mp3` — Drums only, afrobeat 110 BPM
- `/a-major-folk-80.mp3` — A major folk, 80 BPM
- `/a-major-reggae-85.mp3` — A major reggae, 85 BPM
- `/e-major-reggae-85.mp3` — E major reggae, 85 BPM
- `/e-major-surf-120.mp3` — E major surf, 120 BPM

---

## EXERCISE WRITING GUIDELINES

### The Learn → Play → Jam → Create Pattern

Each level should have roughly this mix (VARY it, don't be rigid):
- 3-4 **Learn** exercises: introduce technique through a specific song
- 3-4 **Play** exercises: practice the feel, strum pattern, tone
- 3-4 **Jam/Improv** exercises: improvise within constraints
- 2-3 **Create/Song Study** exercises: learn a song, make your own variation
- 1-2 **Freestyle** exercises: extended open jams, recorded

### Quality Checklist for Every Exercise

- [ ] `what` explains what AND why in 2-3 sentences
- [ ] `steps` has 3-5 steps, each with a `why` that's genuinely illuminating (not generic)
- [ ] `feel` describes the target SENSATION, not just the technique
- [ ] `wrong` describes specific mistakes and specific fixes (not "if it sounds wrong, slow down")
- [ ] `sarah` connects to Gene's SPECIFIC artists and songs by name
- [ ] `levelUp` is a single, measurable, observable goal
- [ ] `metronome` has a specific starting BPM
- [ ] Includes backing track reference where appropriate
- [ ] Includes `recorder: true` for improv and performance exercises

### What Makes an Exercise Have "Sauce"

Compare these two approaches for the same technique:

**NO SAUCE (generic):**
```
title: "Minor Barre Chords"
what: "Learn to play minor barre chords using the E-shape."
sarah: "Barre chords are essential for playing in any key."
```

**WITH SAUCE (what we want):**
```
title: "The Sol Del Sur Shape — C#m Barre"
what: "Sun Room's Sol Del Sur lives in C#m — a barre chord at fret 4. This shape is your gateway to every minor key on the neck. Learn it here, and you'll unlock the entire Sun Room catalog plus half of Allah-Las."
sarah: "Gene, Luke from Sun Room plays the same Jazzmaster for everything. His secret isn't gear — it's that he keeps it simple. Three chords (C#m, B, F#), one syncopated strum, Tubescreamer always on at low gain for warmth. That's the whole recipe. This exercise gives you the C#m shape. You already know open chords — this is the same idea, just moved up the neck with your index finger as a moveable nut."
```

---

## IMPLEMENTATION ORDER

1. Prerequisites (SCALES, CHORD_VOICINGS, localStorage migration)
2. `index.js` update
3. Level 1 → Level 14 (sequentially, so cross-references work)
4. Delete old level files (level-01-pentatonic-rhythm-basics.js through level-10-full-integration.js)
5. Verify with `cd sarah-practice-plan && npm run dev`

---

## VERIFICATION CHECKLIST

After all levels are written:

- [ ] `npm run dev` starts without errors
- [ ] Guitar Study tab shows all 14 levels
- [ ] Clicking each level shows its exercises
- [ ] Exercise IDs are unique (no duplicates across levels)
- [ ] `review` fields reference valid exercise IDs from prior levels
- [ ] `unlocks` fields name the correct next level
- [ ] `tracks` src paths point to existing files in `/public/`
- [ ] `fretboard` scale names exist in the SCALES dictionary
- [ ] `getPitchRange` calls use valid note names
- [ ] `drone` root names are valid notes
- [ ] No exercise references a song's chords that aren't in the verified database above

---

## REFERENCE FILES

All research is persisted in these locations:

- **Plan file:** `~/.claude/plans/compressed-doodling-mango.md`
- **Music profile:** `gene_music_profile.md` (repo root) — top 50 tracks, artist techniques, harmonic patterns
- **Project memory:** `~/.claude/projects/C--Users-hewg7-Documents-GitHub-musiclessons/memory/`
- **Singer-songwriter quality reference:** `sarah-practice-plan/src/data/singerSongwriter/level-03-first-notes.js`
- **Desert blues reference (good existing level):** `sarah-practice-plan/src/data/guitarStudy/level-05-desert-blues.js`
