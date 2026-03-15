import { getPitchRange } from "../appData.js";

export const level2 = {
  level: 2,
  title: "Voice Enters",
  subtitle: "One sound at a time. Speak before you sing.",
  description:
    "The gradual neural bridge between hands and voice. Based on Orff Schulwerk's speak-to-sing progression and dual-task motor learning research: add only ONE new vocal demand per exercise. Count before you speak, speak before you hum, hum before you sing. Each step adds exactly one layer of complexity.",
  artists: "DOPE LEMON, Skinshape, Babe Rainbow",
  unlocks: "Voice Explores (Level 3)",
  exercises: [
    {
      id: "ss-2-0a",
      time: 5,
      title: "Count & Strum",
      type: "guitar",
      what: "Count '1-2-3-4' aloud while strumming G-C-D-G. Even simpler than lyrics — just numbers. Based on Dalcroze rhythmic speech: speaking numbers synchronizes your internal clock with your hands before any musical vocal demand enters.",
      setup: "Guitar. Metronome at 90 BPM.",
      steps: [
        { text: "Strum G-C-D-G, 2 bars each, at 90 BPM. Get it flowing on autopilot.", why: "The guitar must be invisible before you add voice. Even counting aloud is a new cognitive task layered on top." },
        { text: "While strumming, count aloud: '1, 2, 3, 4' on each beat. Speak clearly, in rhythm. The numbers land exactly on each strum.", why: "Counting aloud is the simplest possible speech task — you know the words, they repeat, and they align directly with the beat. Zero creative demand, pure synchronization." },
        { text: "Now count '1-and-2-and-3-and-4-and' — matching the 8th-note subdivisions of your jangle strum. Each syllable aligns with a strum.", why: "Subdivided counting doubles the coordination demand. Your mouth and hand must sync at twice the rate. This is the bridge to rhythmic speech." },
        { text: "Finally, say the chord NAME on beat 1 of each new chord: 'G... 2, 3, 4, C... 2, 3, 4, D... 2, 3, 4, G...' The chord name replaces '1' at each change.", why: "Naming the chord on the change links your voice to the harmonic rhythm. This is the first step toward singing different words on different chords." }
      ],
      feel: "Counting should feel rhythmic and locked in — your voice becomes part of the groove, not a distraction from it. When the numbers and strums align perfectly, you'll feel a satisfying click.",
      wrong: "If counting makes your strum hesitate, the autopilot isn't solid enough. Go back to Level 1 for another session. If your counting drifts off-beat, focus on matching the metronome click with both your strum AND your voice simultaneously.",
      sarah: "Gene, this might feel silly — counting out loud while strumming. But it's the gentlest possible voice-over-guitar exercise. Numbers before words. Words before melody. Every step earns the next one.",
      metronome: 90,
      recorder: true
    },
    {
      id: "ss-2-1",
      time: 8,
      title: "Speak-Over-Strum",
      type: "song",
      what: "Strum a simple chord progression and speak made-up phrases in rhythm — no melody, just spoken words landing on the beats. This trains the timing bridge between your hands and your voice without the complexity of pitch.",
      setup: "Guitar. Metronome at 85 BPM.",
      steps: [
        { text: "Start strumming G-C-D on repeat. Get it flowing on autopilot.", why: "The guitar must be in autopilot mode before you add anything. If it's not automatic from Level 1, go back." },
        { text: "Make up a phrase and speak it in rhythm over the strum. 'Waves are rolling in today, sun is going down.' Not singing — speaking, like poetry to a beat.", why: "Speaking removes pitch from the equation. You're only coordinating rhythm between hands and voice." },
        { text: "Keep going — make up more lines. If the strum breaks, stop speaking, re-establish the strum, and start again.", why: "The guitar is the foundation — it never sacrifices for the voice. The voice must learn to exist on top of a stable guitar part." },
        { text: "Speak freely for 3 minutes straight. Describe your room, tell a story, narrate your day — anything, in rhythm. Repeat twice.", why: "Repetition builds the neural pathway. Three passes is the minimum for initial coordination." }
      ],
      feel: "It should feel like rapping or spoken word over a beat. Your voice rides the rhythm of the strum. The words and the chords are in the same groove.",
      wrong: "If you're speaking in a monotone without rhythmic placement, you're just talking, not integrating. The words must align with the musical pulse. If the strum simplifies when you start speaking, you're still splitting attention.",
      sarah: "Gene, this feels weird at first — like talking to yourself while playing guitar. That's fine. It's training your brain to do two rhythmic things at once. The melody comes later.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-2-2",
      time: 6,
      title: "Hum the Contour",
      type: "vocal",
      what: "Same chord progression, but now hum the melody contour — the rising and falling shape of the tune. Don't worry about exact pitches. Just follow the general direction: up when the melody goes up, down when it goes down.",
      setup: "Guitar. The chord progression from the previous exercise.",
      steps: [
        { text: "Start strumming. Hum any melody contour over the chord progression — make up a rising-falling shape that fits. Approximate, not perfect.", why: "Humming is easier than singing because there are no words to coordinate. You only need to manage pitch contour and strum simultaneously." },
        { text: "Focus on where the melody goes UP and where it goes DOWN. Exaggerate the contour if needed.", why: "The shape of the melody is more important than exact notes at this stage. You're building the pitch layer on top of the rhythm layer." },
        { text: "If the strum breaks, hum a single note (a drone) while strumming until it stabilizes. Then go back to the melody contour.", why: "A single-note hum is the easiest vocal task. It's your fallback when things get overwhelming." },
        { text: "Hum through the whole progression for 2 minutes. Repeat until the strum never wavers.", why: "Each pass makes the coordination more natural. You're training two motor programs to coexist." }
      ],
      feel: "The humming should feel lazy and loose — like you're humming along to a song on the radio. Not performative, just following the tune while your hands do their thing.",
      wrong: "If your hum is tense or forced, you're working too hard. Humming should be the most relaxed vocal production possible. If you lose the melody, just drone on one comfortable note and let the contour come back naturally.",
      sarah: "Gene, your vocal style is laid-back — think DOPE LEMON. This humming exercise is actually closer to your target vocal style than belting scales would be. Relax into it.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-2-2c",
      time: 6,
      title: "Vowel Sounds Over Chords",
      type: "vocal",
      what: "Sing sustained 'ooh' and 'ahh' on any comfortable pitch while strumming Em-Am. No words, no melody target — just open vocal sound over chords. Based on Rhiannon's body-voice integration method: let the voice find its natural home inside the harmony.",
      setup: "Guitar. Metronome at 85 BPM.",
      steps: [
        { text: "Strum Em on autopilot. Sing a sustained 'ooh' on whatever pitch feels comfortable. No target note — just let your voice find a frequency that feels good with the chord.", why: "Removing pitch targets eliminates performance anxiety. Any note that feels comfortable IS the right note. You're training the voice to exist alongside the guitar, not to perform." },
        { text: "Switch to 'ahh' on the same pitch. Notice how the vowel change affects your breath and resonance. Try 'eee,' 'oh,' 'uh.'", why: "Each vowel opens different resonant spaces in your chest and head. Exploring them on a single pitch builds vocal awareness without cognitive overload." },
        { text: "Change to Am. Does your voice want to shift pitch? Let it. Follow the chord's pull. Strum Em (4 bars) → Am (4 bars) and let your vowel sound float between them.", why: "The chord change creates harmonic gravity — your voice will naturally want to adjust. Following that instinct trains your ear without formal instruction." },
        { text: "Experiment: sing 'ooh' that rises slowly over 4 bars, then falls over the next 4. Just gentle pitch curves, no specific notes. Like drawing a hill with your voice.", why: "Gentle pitch curves are the first step toward melody. You're not singing a tune yet — just allowing your voice to move while the guitar stays stable." }
      ],
      feel: "This should feel meditative — open vowel sounds over gentle chords, no words to remember, no melody to match. Just voice and guitar coexisting. Like warming your voice by a fire.",
      wrong: "If you're trying to sing specific notes or a melody, you're adding complexity too early. Stay with open, unfocused vowel sounds. If the strum breaks, your guitar autopilot needs more Level 1 time.",
      sarah: "Gene, this exercise is about giving your voice permission to exist while you play. No expectations, no targets. Just sound. The precision comes later — right now, just let it happen.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-2-3",
      time: 6,
      title: "Root Note Singing",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "pure", mode: "single" },
      referencePitches: getPitchRange("C3", "G3"),
      what: "Strum your chord progression and sing only the root note of each chord as it changes. One note per chord. This is the absolute minimum vocal demand — and it teaches your ear to hear which note 'belongs' to each chord.",
      setup: "Guitar. Metronome at 85 BPM. Know the root notes: G chord = sing G, C chord = sing C, D chord = sing D, Em = sing E, Am = sing A.",
      steps: [
        { text: "Strum G. Sing the note G (the open G string gives you the pitch). Hold it for all 4 beats.", why: "One note, sustained, is the simplest possible singing task over strumming." },
        { text: "Change to C. Sing C. Change to D. Sing D. One sustained note per chord, matching the root.", why: "Your voice follows the bass movement. This is the harmonic foundation of every song." },
        { text: "Do the full progression: G (sing G) → C (sing C) → D (sing D) → G (sing G). Loop it.", why: "Looping builds the pattern into muscle memory. After 8 loops, the voice-follows-chord habit should feel natural." },
        { text: "Try it with eyes closed. Can you feel which note to sing without checking the guitar?", why: "Eyes closed forces your ear to guide your voice. This is the beginning of ear-driven singing." }
      ],
      feel: "Each root note should feel like it 'locks in' with the chord — a satisfying alignment between your voice and the guitar. When voice and chord match, you'll feel a physical resonance in your chest.",
      wrong: "If you're singing the wrong root (singing G over a C chord), you'll hear the clash immediately. Stop, play the chord, find the root on a single string, and match it with your voice before trying again.",
      sarah: "Gene, all the notes you're singing here (G2/G3, C3, D3, E3, A2/A3) are right in your comfortable chest voice range. No passaggio concerns — just easy, grounded notes.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-2-3b",
      time: 6,
      title: "Two-Note Singing",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "pure", mode: "single" },
      what: "Sing the root AND the 5th of each chord while strumming. G chord = sing G then D. C chord = sing C then G. Two notes per chord doubles your melodic vocabulary while staying harmonically safe — the 5th always sounds consonant.",
      setup: "Guitar. Metronome at 85 BPM. Reference: G chord root=G, 5th=D. C chord root=C, 5th=G. D chord root=D, 5th=A. Em root=E, 5th=B. Am root=A, 5th=E.",
      steps: [
        { text: "Strum G. Sing the root G for 2 beats, then the 5th D for 2 beats. Use 'ooh' or 'la.' Find the D on the open D string if you need a reference.", why: "Root and 5th are the two strongest, most consonant notes in any chord. They always sound right — zero risk of clashing." },
        { text: "Move to C. Sing root C (2 beats) then 5th G (2 beats). Then D chord: sing D then A. Then Em: sing E then B. Then Am: sing A then E.", why: "Each chord has its own root-5th pair. Learning all five pairs gives you 10 notes of melodic vocabulary across the progression." },
        { text: "Play G-C-D-G and sing root-5th on each chord as it passes. The voice moves: G-D → C-G → D-A → G-D. Loop it.", why: "Now your voice is making a real melodic journey — two notes per chord, changing with the harmony. This is the skeleton of singing." },
        { text: "Try reversing: sing 5th first, then root (D-G, G-C, A-D, D-G). Does it feel different? The 5th-to-root movement resolves downward — it has a settling quality.", why: "Direction matters in melody. Root-to-5th lifts. 5th-to-root settles. Both are tools in your melodic toolkit." }
      ],
      feel: "Two notes per chord should feel like a gentle rocking — up to the 5th, back to the root. Simple, stable, musical. The 5th never clashes, so every note feels safe.",
      wrong: "If you can't find the 5th by ear, play it on the guitar first and match it with your voice. Don't guess — train. If the strum breaks when you add the second note, the vocal task is still too complex. Spend more time on single root notes (ss-2-3).",
      sarah: "Gene, you just doubled your singing vocabulary from one note per chord to two. That's a bigger deal than it sounds — two notes is enough to create simple melodies. Root and 5th are the bones that every melody hangs on.",
      metronome: 85,
      recorder: true,
      referencePitches: getPitchRange("C3", "A4")
    },
    {
      id: "ss-2-3c",
      time: 6,
      title: "Walk the Chord Tones",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "pure", mode: "single" },
      what: "Sing root, 3rd, and 5th of each chord slowly while strumming. G chord = G-B-D. Am = A-C-E. Singing the full triad is the bridge to melody — three notes per chord gives you enough vocabulary for real melodic phrases.",
      setup: "Guitar. Metronome at 80 BPM. Reference: G=G-B-D, C=C-E-G, D=D-F#-A, Em=E-G-B, Am=A-C-E.",
      steps: [
        { text: "Strum Am. Sing the root A, then the minor 3rd C, then the 5th E. One note per beat, ascending: A... C... E. Use the guitar to find each note first.", why: "Am is the easiest triad to sing — all natural notes, no sharps or flats. The minor 3rd (C) gives it that emotional, melancholic quality." },
        { text: "Now descend: E... C... A. Then try the full arc: A-C-E-C-A over 2 bars. The voice traces the shape of the chord.", why: "Ascending and descending through the triad trains your ear to navigate chord tones in both directions. The arc shape (up then down) is a fundamental melody contour." },
        { text: "Try G major: G-B-D ascending, D-B-G descending. The major 3rd (B) sounds brighter than the minor 3rd. Feel the difference.", why: "Major vs minor 3rd is the emotional fork in the road. Hearing and singing both trains your ear to distinguish them — which feeds into songwriting instinct." },
        { text: "Play G-Am-C-D and walk the triad of each chord as it passes. Slow is fine — one note per beat at 80 BPM gives you time to find each pitch.", why: "Walking chord tones through a progression is the foundation of melodic movement. Most great melodies are decorated chord tone walks." }
      ],
      feel: "Walking the triad should feel like stepping up a short staircase and back down. Three notes, three steps, clear and deliberate. When you land on the 3rd, you'll hear the chord's emotional character in your own voice.",
      wrong: "If you can't find the 3rd by ear, play each chord tone on the guitar and match it with your voice before trying to sing the triad freely. Don't rush — accuracy at 80 BPM beats sloppiness at any tempo.",
      sarah: "Gene, you're now singing three notes per chord — root, 3rd, 5th. That's the entire harmonic skeleton. When you improvise melodies later, these chord tones will be your anchor points. Every note you sing will relate to one of these three.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      levelUp: "Can sing root, 3rd, and 5th of G, C, D, Em, and Am while strumming at 80 BPM without strum breaks."
    }
  ]
};
