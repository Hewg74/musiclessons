# Process New Lesson Transcript

Use this prompt with Claude after each lesson with Sarah.

## Quick Start

Say: **"Process my latest lesson transcript"**

Claude will:
1. Search Gmail for the transcript (or read from `lesson-transcripts/`)
2. Parse it — identify speakers, extract exercises, pull Sarah quotes
3. Add a new LESSON_POOL entry to `src/data/appData.js`
4. Regenerate the DAYS array (practice plan) prioritizing the new lesson
5. Build and verify

## How to Get Your Transcript to Claude

**Option A (recommended):** After recording with Google Recorder, tap Share > Gmail. Email it to yourself. Claude reads it via Gmail MCP.

**Option B:** Export the transcript as text, save to `lesson-transcripts/YYYY-MM-DD_lesson_sarah.txt`, and tell Claude to process it.

## What Claude Needs to Know

### Gene's Profile
- Voice type: Tenor
- Passaggio: A3 (break zone A-flat3 to B-flat3)
- Guitar: acoustic + electric, fingerpicking and strumming
- Active songs: I Like The Way You Walk (The Donkeys), Sol Del Sur
- Band: surf rock / indie reggae, plays in Hawaii
- Backing tracks: Surf Rock Beat 120 BPM, Groove Beat 90 BPM

### Transcript Parsing Notes
- Google Recorder auto-transcribes with speaker labels (Speaker 1, Speaker 2, etc.)
- Speaker identification: Sarah = the one giving instructions/corrections. Gene = asking questions/reporting progress.
- Common transcription errors: "fuck" should be "pluck" (Google mishears), musical terms may be garbled
- Filler words (like, um, you know) should be cleaned from quotes while preserving Sarah's voice

### Exercise Schema
Each exercise in LESSON_POOL and DAYS follows this shape:
```js
{
  id: "L3-ex1",          // L{lessonNum}-ex{num} for pool, d{day}e{num} for plan
  title: "...",
  type: "rhythm|guitar|vocal|listen|song|record|play",
  time: 10,              // minutes
  what: "...",            // purpose description
  setup: "...",           // equipment needed
  steps: [{ text: "...", why: "..." }],
  feel: "...",            // what correct execution feels like
  wrong: "...",           // common mistakes
  sarah: "...",           // direct Sarah quote
  metronome: 120,         // BPM if applicable
  levelUp: "...",         // advancement criteria
  referencePitches: getPitchRange("C4", "E3")  // for vocal exercises
}
```

### LESSON_POOL Record Schema
```js
{
  id: "lesson-YYYY-MM-DD",
  date: "YYYY-MM-DD",
  title: "...",
  duration: "...",
  transcriptFile: "YYYY-MM-DD_lesson_sarah.txt",
  buildsOn: ["lesson-YYYY-MM-DD"],  // which earlier lessons this continues
  topics: ["rhythm", "guitar", "vocal", "ear-training", "songs"],
  summary: "2-3 sentence narrative of what happened",
  exercises: [ /* full exercise objects */ ],
  progress: [{ area: "...", note: "...", direction: "improving|needs-work|new" }],
  sarahQuotes: [{ quote: "...", context: "..." }]
}
```

### Practice Plan Generation Guidelines
When regenerating DAYS, Claude should use pedagogical judgment (not rigid rules):
- **Prioritize the newest lesson** — its exercises appear most frequently in the week
- **Keep relevant older exercises** — especially ones Gene hasn't mastered yet
- **Space intelligently** — no same-type exercises back-to-back, warm-ups first, rest day (Day 7)
- **Progressive overload** — bump BPM/range targets where appropriate
- **Include Sarah quotes** on each exercise from the relevant transcript
- **45-55 min per day** — never more than 60
- **Day 7 is light** — maintenance and free play only

## Files

| File | Purpose |
|---|---|
| `sarah-practice-plan/src/data/appData.js` | ALL data: DAYS, VOCAL_EXERCISES, LESSON_POOL, pitch utils |
| `sarah-practice-plan/src/App.jsx` | UI components (don't edit data here) |
| `lesson-transcripts/*.txt` | Raw transcript archive |
