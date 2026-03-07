# Prompt: Enrich Music Practice Plan App with Real Lesson Transcripts

## Context

I have a React-based music practice plan app built with Vite + React + Tone.js. It's a weekly practice planner with 7 days of structured exercises (rhythm, guitar, vocal, listening, song practice). The app was originally built from my notes about what my music teacher Sarah Glass assigned — but the exercise data was partially AI-generated from incomplete notes.

**Now I have actual lesson transcripts** from recordings of my private lessons with Sarah. I need you to:

1. Parse the two transcripts to extract every concrete exercise, technique, instruction, and practice assignment Sarah gave
2. Cross-reference what's in the transcripts with what's already in the app
3. Correct anything in the app that contradicts what Sarah actually said
4. Add new exercises/techniques from the transcripts that aren't in the app yet
5. Add real Sarah quotes throughout (the `sarah:` field on each exercise)
6. Update the app's data to reflect the actual progression Sarah is teaching

## File Locations

**App source code:** `musiclessons/sarah-practice-plan/src/App.jsx` (2,280 lines — the main file with all exercise data in a `DAYS` array)
- Supporting file: `src/JungleTools.jsx` (AudioPlayer, FlightCheck, OfflineTabs, AudioRecorder, PitchPipe components)
- Stack: Vite + React 19 + Tone.js, deployed as PWA

**Lesson transcripts:**
- `musiclessons/lesson-transcripts/2025-01-13_lesson_sarah.txt` — Jan 13 lesson (~1hr 10min, 1,278 lines). Covers: rhythm improvement feedback, band progress, fingerpicking technique, counting with metronome, surf rock beat practice, syncopation, "I Like The Way You Walk" song work
- `musiclessons/lesson-transcripts/2026-01-27_lesson_sarah.txt` — Jan 27 lesson (~14min, 372 lines). Covers: ear training (finding notes by singing), chest voice vs head voice vs mixed voice, passaggio location (A3 for Gene), diaphragm engagement, falsetto identification, voice type (tenor range), exercises for flipping between registers

**Also useful — standalone JSX version:** `musiclessons/Practice_Plan_Lesson_3-2.jsx` (this is a standalone single-file version of the app, may have slightly different data)

## App Data Structure

Each day in the `DAYS` array has this shape:
```js
{
  num: 1, name: "Foundation", focus: "Metronome Internalization", duration: "50–55 min",
  setup: "Metronome app on phone, guitar in lap...",
  exercises: [
    {
      id: "d1e1", time: 10, title: "Full Count", type: "rhythm", // types: rhythm, guitar, vocal, listen, song, record, play
      what: "Description of what this exercise trains...",
      setup: "Equipment/preparation needed...",
      steps: [
        { text: "Step instruction", why: "Why this matters" },
      ],
      feel: "What it should feel like when done correctly",
      wrong: "Common mistakes and how to fix them",
      sarah: "Direct quote or paraphrase from Sarah about this exercise",
      metronome: 200, // BPM if applicable
      levelUp: "Criteria for advancing difficulty",
      referencePitches: getPitchRange("C4", "E3"), // for vocal exercises — triggers a pitch pipe UI
    }
  ]
}
```

## Key Details About Gene (the student)

- Voice type: Tenor (Sarah confirmed in Jan 27 lesson)
- Passaggio (voice break): around A3 (Sarah identified in Jan 27 lesson)
- Plays guitar (fingerpicking, chord strumming)
- In a band (surf rock / indie reggae style, plays in Hawaii)
- Songs being worked on: "I Like The Way You Walk", "Sol Del Sur"
- Uses Surf Rock Beat at 120 BPM and Groove Beat at 80-90 BPM as backing tracks
- Metronome exercises: 200-244 BPM for 8th note counting, 78 BPM for 16th notes

## What to Extract from Transcripts

### From Jan 13 Lesson:
- Sarah's feedback on Gene's rhythm improvement
- Any new exercises or modifications to existing exercises
- Specific BPM targets or technique adjustments
- Song-specific instructions for "I Like The Way You Walk"
- Fingerpicking technique details
- Any new concepts or theory Sarah introduced

### From Jan 27 Lesson:
- Ear training exercise: strum chord, sing the notes you hear (even if they're "wrong" — F# over C was a discovery)
- Voice register exercises: chest voice ("hey, stop it!" exercise), head voice (gentle/quiet), mixed voice (belting), falsetto
- Diaphragm engagement: hand on belly, feel the difference between chest and head voice
- Passaggio work: Gene's break is at A3, practice flipping between registers around that zone
- Sarah's recommendation to use AI to generate exercises for register flipping
- Specific quotes about commitment ("Commit more, Jean"), following through with mistakes to learn from them

## Instructions

1. **Read both transcripts completely** — don't skim. Every detail matters.
2. **Read the current App.jsx** to understand all existing exercises across all 7 days.
3. **Create a structured diff**: What needs to change? What's new? What's wrong?
4. **Update the DAYS array** with corrected/enriched exercise data. Be surgical — don't rewrite things that are already correct.
5. **Add a "Lesson Notes" section** or similar UI element where raw insights from each lesson are accessible (timestamps, key moments, Sarah quotes).
6. **Preserve the existing design system** — the app uses a custom theme object `T` with specific colors, fonts, and spacing. Don't change the visual design.
7. **Run `npm run build`** in `musiclessons/sarah-practice-plan/` when done to verify no errors.

## Important

- Speaker 1 and Speaker 2 in the transcripts alternate between Sarah (the teacher) and Gene (the student). Sarah is typically the one giving instructions, corrections, and explanations. Gene asks questions and responds.
- The transcripts are auto-generated by Google Recorder and have some errors (e.g., profanity where musical terms were misheard — "fuck" should often be "pluck"). Use context to interpret.
- Don't remove any exercises that are already working well. Enrich and correct, don't delete.
- The `sarah:` field should contain actual things Sarah said, not AI-generated paraphrases. Use the transcript.
