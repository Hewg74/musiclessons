import { getPitchRange } from "../appData.js";

export const level4 = {
  num: 4, name: "Ear Training & Harmony", focus: "Intervals, chord tones, hearing changes",
  duration: "25 min",
  setup: "Guitar for chord references. No backing track needed initially.",
  subtitle: "Hearing the Music Inside the Music",
  description: "Your ear is the most important instrument you own. These exercises train you to hear chord tones, sing intervals, and build melodies from what you hear -- not what you've memorized. Jeff Buckley and Nick Drake could hear music inside chords that other people missed.",
  artists: "Jeff Buckley, Nick Drake",
  unlocks: "Dynamics & Expression (Level 5)",
  review: { label: "Level 2 Check-In", time: 5, exercises: ["v2e1b", "v2e3"], prompt: "Slide through the A3 passaggio on 'ooh' — smooth, no break (v2e1b). Then do siren glides bottom to top and back (v2e3). If the passaggio is cracking again, spend time on Level 2." },
  exercises: [
    {
      id: "v4e1", time: 4, title: "Chord Tone Singing", type: "vocal",
      what: "Strum a chord on guitar and sing the notes you hear -- without plucking individual strings first. Trust your ear to find the notes. Sometimes you'll find beautiful 'wrong' notes.",
      setup: "Guitar in hand. Strum C chord. Let it ring.",
      referencePitches: getPitchRange("C3", "C4"),
      steps: [
        { text: "Strum C chord once, full and open. Let it ring. Without thinking, sing the first note you hear.", why: "Your ear naturally gravitates to chord tones. Trust it instead of thinking." },
        { text: "Sing 3-4 notes you hear in the chord, one at a time. Commit to each one even if it feels wrong.", why: "Even 'wrong' notes can be beautiful. Sarah found Gene singing F# over C -- it worked because of the harmonic context." },
        { text: "Now strum again while singing those notes. Do they work? Even the unexpected ones?", why: "Testing your ear-found notes against the chord trains your sense of consonance and dissonance." },
        { text: "Repeat with Am, G, D. Notice how your ear finds different notes over different chords.", why: "Different chords pull your ear to different tones. This is the beginning of melodic improvisation." }
      ],
      feel: "This should feel exploratory, not like a test. There are no wrong answers -- your ear is finding musical connections your conscious mind doesn't know about.",
      wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them.",
      sarah: "It's actually a great thing that you didn't pluck your guitar in that moment because you found something your fingers never would have.",
      recorder: true,
      levelUp: "Can find 3+ notes per chord that sound musical, across all 4 chords."
    },
    {
      id: "v4e2", time: 4, title: "Interval Recognition", type: "vocal",
      what: "Sing root, minor 3rd, 5th, octave over Am. Then track chord tones through Am->C->G->D. This trains your ear to hear specific intervals and follow them through changes.",
      setup: "Guitar: Am chord. Slow strum.",
      referencePitches: getPitchRange("A2", "A3"),
      steps: [
        { text: "Strum Am. Sing the root (A). Then sing up to the minor 3rd (C). Feel the interval.", why: "The minor 3rd is the sound of sadness/depth. Learning to hear it is ear training 101." },
        { text: "From root, sing up to the 5th (E). Then the octave (A, one octave up).", why: "Root, 3rd, 5th, octave are the four most important intervals. They're the skeleton of every chord." },
        { text: "Now: Am->C->G->D progression. On each chord, sing just the root.", why: "Tracking roots through changes is the simplest form of following harmony. Your voice maps the bass line." },
        { text: "Same progression, but sing the 3rd of each chord: C over Am, E over C, B over G, F# over D.", why: "Singing 3rds requires hearing the chord quality (major vs minor) and finding the right note." }
      ],
      feel: "The root should feel stable, grounded. The 3rd defines the chord's emotion (minor = sad, major = bright). The 5th is open and powerful. The octave is home, higher.",
      wrong: "If the 3rds all sound the same to you, slow down. Strum each chord, pluck the 3rd string, sing it. Then try without plucking.",
      recorder: true,
      levelUp: "Sing root and 3rd of each chord through Am-C-G-D without plucking reference notes."
    },
    {
      id: "v4e3", time: 4, title: "Melody From Chord Tones", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("A2", "B3"),
      what: "Build simple melodies using only chord tones. This is the Jack Johnson / Nick Drake approach -- melodies that live inside the chords, never fighting the harmony.",
      setup: "Guitar: Am -> C -> G -> D. Slow fingerpick.",
      steps: [
        { text: "On Am, sing any two chord tones (A, C, or E) in any order. That's your Am melody fragment.", why: "Limiting yourself to chord tones guarantees consonance. Every note will 'work'." },
        { text: "On C, sing two different chord tones (C, E, or G). Connect them smoothly to your Am notes.", why: "The connection between chords is where melody lives. Smooth voice leading = beautiful melody." },
        { text: "Continue through G and D. Aim for stepwise motion where possible.", why: "Stepwise motion (notes close together) sounds more melodic than big jumps." },
        { text: "Play the progression 4 times, singing a different melody each time. Record the last one.", why: "Repetition with variation trains improvisational fluency. Recording lets you hear what worked." }
      ],
      feel: "Every note should feel like it belongs. No tension, no 'wrong' notes. This is what makes Jack Johnson's melodies feel so effortless -- they're built from chord tones.",
      wrong: "If your melody sounds boring, try adding a non-chord tone as a passing note between chord tones. One tension note makes the resolution sweeter.",
      levelUp: "Improvise a 4-chord melody that sounds like a real song snippet, using mostly chord tones."
    },
    {
      id: "v4e3b", time: 5, title: "Low Register Stretch", type: "vocal",
      pitchContour: true,
      what: "Extend the chest voice downward: sing descending 5-note scales from A3 down to E3, then D3, then C3. Use 'mah' to keep the throat open. Don't force -- if the note won't come, stop one note higher.",
      setup: "Standing. Pitch Detector on. No guitar. Warm up with lip trills first.",
      referencePitches: getPitchRange("C3", "A3"),
      steps: [
        { text: "Start on A3. Sing a descending 5-note scale: A3-G3-F3-E3-D3 on 'mah'. One note per beat at 70 BPM.", why: "Starting at A3 keeps you in comfortable territory. 'Mah' opens the throat and engages the diaphragm naturally." },
        { text: "Next round: start on G3. Descend G3-F3-E3-D3-C3. The lower notes should feel warm and rumbly.", why: "Each round pushes the bottom of your range a little further. C3 is the target floor for a tenor." },
        { text: "Try one more: F3-E3-D3-C3-B2. If B2 doesn't come cleanly, stop at C3 -- that's your current floor.", why: "Below C3, many tenors lose projection. Knowing your real floor is more useful than forcing notes that aren't there." },
        { text: "On each scale, keep the volume steady -- don't get quieter as you go lower. Support from the ribs.", why: "The tendency is to lose volume on low notes. Rib expansion breathing from Level 1 keeps the airflow consistent." }
      ],
      feel: "Low notes should feel warm, resonant, and grounded -- like your voice is settling into your chest. The 'mah' should vibrate in your sternum.",
      wrong: "If the low notes sound airy or disappear, you're letting go of breath support. Keep the ribs expanded. If you're straining or growling to reach a note, it's below your range -- stop one note higher.",
      sarah: "Your low range is like a muscle -- it extends with gentle, consistent stretching. Never force it. The notes will come over weeks, not minutes.",
      metronome: 70,
      recorder: true,
      volumeMeter: true,
      levelUp: "Clean descending scales reaching C3 with consistent volume and warm tone, 3 rounds."
    },
    {
      id: "v4e4", time: 4, title: "Sing the Bass Line", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("A2", "A3"),
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      what: "Sing the root notes of a progression in rhythm. This is the first step toward looper bass vocal lines -- your voice becomes the bass instrument.",
      setup: "Guitar: Am -> C -> G -> D. Simple strum at 85 BPM.",
      steps: [
        { text: "Sing the root of each chord on beat 1: A (low), C, G, D. One note per bar.", why: "Root notes in rhythm = bass line. Your voice is doing what a bass player does." },
        { text: "Add a second note: sing the root on beat 1, the 5th on beat 3. A-E, C-G, G-D, D-A.", why: "Root-5th patterns are classic bass lines. This is getting closer to a real bass part." },
        { text: "Try to sing in your low register. Use chest voice, project from the belly.", why: "Bass lines live in the low range. This is where your Level 1 chest voice training pays off." },
        { text: "Record this bass line and play it back while you play guitar. How does it sound together?", why: "Preview of Level 7: you'll eventually loop this bass vocal and play over it." }
      ],
      feel: "Your voice should feel low, grounded, rhythmic -- like a bass guitar. The notes should anchor the harmony, not float above it.",
      wrong: "If you can't reach the low notes comfortably, transpose up an octave. The pattern matters more than the range at this stage.",
      metronome: 85,
      levelUp: "Clean bass vocal line through Am-C-G-D with root-5th pattern at 85 BPM."
    },
    {
      id: "v4e5", time: 4, title: "Relative Pitch Games", type: "vocal",
      referencePitches: getPitchRange("A2", "A3"),
      what: "Play a note on guitar, then sing a specific interval above or below it. Ear-voice connection training -- you hear the target, then your voice finds it.",
      setup: "Guitar in hand. Random notes across the neck.",
      steps: [
        { text: "Play any note on guitar. Sing the same note back. This is unison -- the simplest interval.", why: "Matching pitch is the foundation. If this is hard, spend more time here." },
        { text: "Play a note. Sing a major 3rd above it (4 half steps up). Check by plucking 4 frets up.", why: "The major 3rd is happy, bright. Think the first two notes of 'When the Saints'." },
        { text: "Play a note. Sing a 5th above it (7 half steps). Check. The 5th is open, powerful.", why: "The 5th is in almost every chord. Learning to hear it is essential." },
        { text: "Play a note. Sing a minor 3rd above it (3 half steps). Check. Compare to the major 3rd.", why: "The difference between major and minor 3rd is the difference between happy and sad. Your ear needs to feel that." }
      ],
      feel: "When you nail the interval, it should feel like the note was already in your head -- you just had to let it out. When you miss, you'll feel the dissonance immediately.",
      wrong: "If you consistently overshoot or undershoot intervals, sing the interval slowly as a glide first, then try to jump directly. The glide trains the distance.",
      levelUp: "Nail 8 out of 10 random interval challenges without checking on guitar."
    }
  ]
};
