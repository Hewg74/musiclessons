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
      feel: "Counting should feel rhythmic and locked in — your voice becomes part of the groove, not a distraction from it. When the numbers and strums align perfectly, you'll feel a satisfying click. Always end on a rep that felt locked — let that be the last body memory.",
      wrong: "If counting makes your strum hesitate, the autopilot isn't solid enough. Go back to Level 1 for another session. If your counting drifts off-beat, focus on matching the metronome click with both your strum AND your voice simultaneously. If this feels awkward, that's the growth zone — not a sign something's wrong.",
      sarah: "Gene, this might feel silly — counting out loud while strumming. But it's the gentlest possible voice-over-guitar exercise. Numbers before words. Words before melody. Every step earns the next one. You're already doing it — that's what matters.",
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
      feel: "It should feel like rapping or spoken word over a beat. Your voice rides the rhythm of the strum. The words and the chords are in the same groove. End on a phrase that locked in — let that groove be what your body remembers.",
      wrong: "If you're speaking in a monotone without rhythmic placement, you're just talking, not integrating. The words must align with the musical pulse. If the strum simplifies when you start speaking, you're still splitting attention. That's normal — it means the dual-task pathway is building.",
      sarah: "Gene, this feels weird at first — like talking to yourself while playing guitar. That's fine. It's training your brain to do two rhythmic things at once. The melody comes later. Here's why this matters to YOUR music: every DOPE LEMON vocal rides the rhythm just like this — speech-like, groove-locked.",
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
        { text: "Before starting: breathe in for 4 counts, then hum-sigh out for 6 counts, letting the pitch slide from high to low. Repeat 3 times. This primes the vagus nerve, which directly controls your vocal folds — calming it loosens the instrument. Then start strumming. Before each contour, close your eyes for one bar and imagine the shape you want to hum — rising, falling, arching. As you imagine the shape rising, feel the vibration wanting to climb from your chest toward your throat and nose. Hear the contour in your mind's ear and feel it in your body before your voice traces it. Then hum any melody contour over the chord progression — approximate, not perfect.", why: "Imagining the shape before you sing it trains your inner ear to lead. But the contour isn't just a pitch shape — it's a body journey. When a melody rises, vibration migrates upward through your body; when it falls, it settles back down. Pre-hearing and pre-feeling the contour makes the match smoother and more embodied (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Focus on where the melody goes UP and where it goes DOWN. As the hum rises, notice the vibration lifting from chest to throat to nose. As it falls, feel it settling back into the warmth of the sternum. Exaggerate the contour if needed — let your body follow the melody's arc.", why: "The shape of the melody is more important than exact notes at this stage. And your body already knows this shape — low notes rumble in the chest, higher notes buzz in the face. The vibration-rising body map (Nummenmaa 2024, PNAS) is cross-culturally universal. You're building the pitch layer on top of the rhythm layer, and your body is the bridge between them." },
        { text: "If the strum breaks, hum a single note (a drone) while strumming until it stabilizes. Feel where that single note lives in your body — let it anchor you. Then go back to the melody contour.", why: "A single-note hum is the easiest vocal task. It's your fallback when things get overwhelming. Anchoring in the body sensation of one note gives you a home to return to." },
        { text: "Hum through the whole progression for 2 minutes. As the humming becomes automatic, bring your attention to the body journey — can you feel the vibration traveling as the contour moves? That traveling sensation is the beginning of your internal pitch compass.", why: "Each pass makes the coordination more natural. You're training two motor programs to coexist — and adding a somatic awareness channel that will become your most reliable guide for pitch." }
      ],
      feel: "The humming should feel lazy and loose — like you're humming along to a song on the radio. Not performative, just following the tune while your hands do their thing. But underneath the ease, notice the vibration traveling: low hums warm your chest, higher hums buzz in your face. Your body is already mapping the melody.",
      wrong: "If your hum is tense or forced, you're working too hard. Humming should be the most relaxed vocal production possible. If you lose the melody, just drone on one comfortable note and let the contour come back naturally.",
      sarah: "Gene, your vocal style is laid-back — think DOPE LEMON. This humming exercise is actually closer to your target vocal style than belting scales would be. Relax into it. You're not learning to be a singer — you're already one. This is just expanding what your voice can do.",
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
        { text: "Strum Em on autopilot. Before singing, hear what 'ooh' sounds like in your mind — feel your mouth start to shape, feel the vibration gathering low in your chest before any sound comes out. Then sing a sustained 'ooh' on whatever pitch feels comfortable. No target note — just let your voice find a frequency that feels good with the chord, and notice where that frequency lives in your body.", why: "That pre-motor readiness — mouth shaping before sound — means your body is preparing from an internal image. The body-location check adds a second channel: you're not just hearing the pitch, you're feeling where it resonates. Removing pitch targets eliminates performance anxiety. Any note that feels comfortable IS the right note. Zamorano 2025 found that this kind of body awareness predicts pitch accuracy even in non-singers (R²=0.41)." },
        { text: "Switch to 'ahh' on the same pitch. Notice how the vowel change shifts where the vibration lives — 'ooh' concentrates warmth deep in the chest, 'ahh' opens and spreads through the throat, 'eee' lifts the buzz into the nose and cheekbones. Try 'oh,' 'uh.' Same pitch, different body addresses. Each vowel is a different room in your instrument.", why: "Each vowel opens different resonant chambers. Nummenmaa 2024 (PNAS, n=1,938) confirmed these body maps are cross-culturally universal — every human body maps vocal resonance the same way. Exploring vowels on a single pitch isolates the body-awareness channel from pitch decisions." },
        { text: "Change to Am. Does your voice want to shift pitch? Let it. Follow the chord's pull — and as the pitch shifts, notice the vibration migrating in your body. Where does the new pitch settle? Strum Em (4 bars) → Am (4 bars) and let your vowel sound float between them.", why: "The chord change creates harmonic gravity — your voice will naturally want to adjust. Following that instinct trains your ear without formal instruction. Tracking where the new pitch resonates begins building your somatic pitch map." },
        { text: "Experiment: sing 'ooh' that rises slowly over 4 bars, then falls over the next 4. As the pitch rises, feel the vibration climbing from chest through throat toward the mask of your face. As it falls, feel it pouring back down into the warmth of the sternum. Like drawing a hill with your voice — and feeling that hill travel through your body.", why: "Gentle pitch curves are the first step toward melody. The body journey mirrors the pitch journey: low notes live in the chest, higher notes migrate toward the face. You're not singing a tune yet — just allowing your voice and body to discover their connection." }
      ],
      feel: "This should feel meditative — open vowel sounds over gentle chords, no words to remember, no melody to match. Just voice and guitar coexisting. Like warming your voice by a fire. And in that warmth, a quiet discovery: each sound has a place in your body, a vibration you can feel with your hands if you put them on your chest.",
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
      drone: { root: "G", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("C3", "G3"),
      what: "Strum your chord progression and sing only the root note of each chord as it changes. One note per chord. This is the absolute minimum vocal demand — and it teaches your ear to hear which note 'belongs' to each chord.",
      setup: "Guitar. Metronome at 85 BPM. Know the root notes: G chord = sing G, C chord = sing C, D chord = sing D, Em = sing E, Am = sing A.",
      steps: [
        { text: "Strum G. Before you sing, hear G gathering inside — feel the low warmth behind your sternum where it wants to live. Then sing the note G (the open G string gives you the pitch). Hold it for all 4 beats. Feel the vibration buzz in your chest as voice and chord lock together.", why: "One note, sustained, is the simplest possible singing task over strumming. But even here, the embodiment cycle begins: HEAR the note internally, FEEL where it lives in the body, then PRODUCE it. G sits low in the chest — that warm rumble is bone-conducted resonance, your larynx vibrating your thorax (Zamorano 2025)." },
        { text: "Change to C. Hear C forming — it's slightly brighter, a step up from G. Sing C and notice the vibration shift: still chest-based but lighter, more open. Change to D — brighter still, the buzz beginning to lift toward the throat. One sustained note per chord, each with its own body address.", why: "Your voice follows the bass movement. This is the harmonic foundation of every song — and each root has a distinct resonance location. You're building the first draft of your body map: G = deep chest, C = upper chest, D = chest-to-throat." },
        { text: "Do the full progression: G (sing G) → C (sing C) → D (sing D) → G (sing G). As you loop, track the vibration traveling: chest settles deeper on G, lifts on C, rises further on D, then pours back down to G. The melody of root notes is also a journey through your body.", why: "Looping builds the pattern into muscle memory. After 8 loops, the voice-follows-chord habit should feel natural — and the body-location shifts should become automatic too. Each return to G feels like coming home to a warm, familiar place in your chest." },
        { text: "Try it with eyes closed. Can you feel which note to sing without checking the guitar? Let your body guide you — G's chest-depth feels different from D's throat-brightness. When you can navigate by body sensation as well as by ear, you have two compasses instead of one.", why: "Eyes closed forces your ear and your body to guide your voice. This is the beginning of embodied singing — where pitch accuracy comes not just from hearing but from feeling where each note lives. Research shows professional singers shift from external to internal feedback after roughly 3 years of training; you're starting that process now." }
      ],
      feel: "Each root note should feel like it 'locks in' with the chord — a satisfying alignment between your voice and the guitar. When voice and chord match, you'll feel a physical resonance in your chest. And each root has its own quality: G is the deepest rumble, C is warmer, D is brighter. The lock-in isn't just sonic — it's somatic.",
      wrong: "If you're singing the wrong root (singing G over a C chord), you'll hear the clash immediately. Stop, play the chord, find the root on a single string, and match it with your voice before trying again. If you're consistently off, that's not 'tone-deaf' — it's a calibration process that improves with each attempt.",
      sarah: "Gene, all the notes you're singing here (G2/G3, C3, D3, E3, A2/A3) are right in your comfortable chest voice range. No passaggio concerns — just easy, grounded notes. End-of-exercise retrieval: after the last rep, set down the guitar for 30 seconds, close your eyes, then sing the root of each chord from memory. Whatever you remember IS what you've internalized.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-2-3b",
      time: 6,
      title: "Two-Note Singing",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "pure" },
      what: "Sing the root AND the 5th of each chord while strumming. G chord = sing G then D. C chord = sing C then G. Two notes per chord doubles your melodic vocabulary while staying harmonically safe — the 5th always sounds consonant.",
      setup: "Guitar. Metronome at 85 BPM. Reference: G chord root=G, 5th=D. C chord root=C, 5th=G. D chord root=D, 5th=A. Em root=E, 5th=B. Am root=A, 5th=E.",
      steps: [
        { text: "Strum G. Hear the root G gathering in your chest — feel its warmth, its groundedness. Sing G for 2 beats. Now hear the 5th D forming above it — feel the vibration wanting to lift slightly, like stepping from earth toward sky. Sing D for 2 beats. Two notes, two body locations: G deep in the chest, D a step higher and lighter. Use 'ooh' or 'la.'", why: "Pre-hearing each note trains your inner ear to lead your voice. But body-location awareness adds a second channel — you're not just hearing the interval, you're feeling the vibration migrate upward as you move from root to 5th. This paired hearing-and-feeling is the embodiment cycle at its simplest: HEAR it, FEEL where it lives, PRODUCE it (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Move to C. Sing root C (2 beats) — feel it in the upper chest — then 5th G (2 beats) — feel the lift toward the throat. Then D chord: sing D then A. Then Em: sing E then B. Each root-5th pair has its own body journey, its own two-step migration.", why: "Each chord has its own root-5th pair. Learning all five pairs gives you 10 notes of melodic vocabulary across the progression — and 10 body addresses that map your instrument from the inside." },
        { text: "Play G-C-D-G and sing root-5th on each chord as it passes. The voice moves: G-D → C-G → D-A → G-D. As you loop, track the vibration: each root-to-5th step lifts the resonance slightly, each chord change resets the body location. The melody is also a journey through your ribcage and throat.", why: "Now your voice is making a real melodic journey — two notes per chord, changing with the harmony. The body map gives you a physical scaffold for the journey, so each note has both a sound and a place." },
        { text: "Try reversing: sing 5th first, then root (D-G, G-C, A-D, D-G). Feel the difference — the 5th-to-root movement settles the vibration downward, like a sigh returning to the chest. Root-to-5th lifts. 5th-to-root grounds. Both are tools, and your body knows the difference before your mind does.", why: "Direction matters in melody. Root-to-5th lifts and opens. 5th-to-root settles and resolves. The body mirrors this — ascending notes climb through the resonant spaces, descending notes pour back down. Both directions are tools in your melodic toolkit." }
      ],
      feel: "Two notes per chord should feel like a gentle rocking — up to the 5th, back to the root. The 5th lifts the vibration toward the throat; the root settles it back into the chest. Simple, stable, musical. The 5th never clashes, so every note feels safe — and every note has a home in your body.",
      wrong: "If you can't find the 5th by ear, play it on the guitar first and match it with your voice. Don't guess — train. If the strum breaks when you add the second note, the vocal task is still too complex. Spend more time on single root notes (ss-2-3).",
      sarah: "Gene, you just doubled your singing vocabulary from one note per chord to two. That's a bigger deal than it sounds — two notes is enough to create simple melodies. Root and 5th are the bones that every melody hangs on. End-of-exercise retrieval: set the guitar down, close your eyes for 30 seconds, then try singing the root-5th pairs from memory for each chord. What you remember is what's been internalized.",
      metronome: 85,
      recorder: true,
      referencePitches: getPitchRange("C3", "A4")
    },
    {
      id: "ss-2-3c",
      time: 6,
      title: "Walk the Chord Tones",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "pure" },
      what: "Sing root, 3rd, and 5th of each chord slowly while strumming. G chord = G-B-D. Am = A-C-E. Singing the full triad is the bridge to melody — three notes per chord gives you enough vocabulary for real melodic phrases.",
      setup: "Guitar. Metronome at 80 BPM. Reference: G=G-B-D, C=C-E-G, D=D-F#-A, Em=E-G-B, Am=A-C-E.",
      steps: [
        { text: "Strum Am. Sing the root A — feel it settle deep in your chest, grounded and warm. Then the minor 3rd C — feel the vibration rise into the throat, carrying an ache, a darkening. Then the 5th E — the buzz lifts into the mask, open and spacious. One note per beat, ascending: A... C... E. Three notes, three body addresses, three emotional colors.", why: "Am is the easiest triad to sing — all natural notes, no sharps or flats. The minor 3rd (C) gives it that emotional, melancholic quality. And each note has a distinct body location: A in the chest, C in the throat/jaw, E in the mask. Nummenmaa 2024 (PNAS, n=1,938) confirmed these resonance maps are cross-culturally universal. You're not just learning three pitches — you're mapping three locations in your instrument." },
        { text: "Now descend: E... C... A. Feel the vibration pour downward — mask to throat to chest — like warmth settling back into the earth. Then try the full arc: A-C-E-C-A over 2 bars. The voice traces the shape of the chord, and the body follows: rising through chest-throat-mask, then settling back down.", why: "Ascending and descending through the triad trains your ear to navigate chord tones in both directions. The body mirrors the arc — vibration climbs and then returns. This paired hearing-and-feeling makes the triad a physical experience, not just an interval exercise." },
        { text: "Try G major: G-B-D ascending, D-B-G descending. The major 3rd (B) sounds brighter than the minor 3rd (C). Feel the difference in your body too — the major 3rd sits more forward, more open, warmer than the minor 3rd's darker, throat-based ache.", why: "Major vs minor 3rd is the emotional fork in the road. Hearing and singing both trains your ear to distinguish them — and the body registers the difference too. The minor 3rd carries a quality of longing; the major 3rd carries openness. Your body knows this before your theory knowledge catches up." },
        { text: "Play G-Am-C-D and walk the triad of each chord as it passes. Before each triad, hear the three notes and feel where they'll land in your body. Slow is fine — one note per beat at 80 BPM gives you time to complete the full cycle: hear each note, feel its body address, then let it become sound.", why: "Walking chord tones through a progression is the foundation of melodic movement. Most great melodies are decorated chord tone walks. Adding the embodiment cycle (HEAR-FEEL-PRODUCE) to each step transforms mechanical chord-tone singing into a full-body musical act." }
      ],
      feel: "Walking the triad should feel like stepping up a short staircase through your body and back down. Three notes, three steps, three resonance locations — chest, throat, mask. When you land on the 3rd, you'll hear the chord's emotional character in your own voice AND feel it in a specific place in your body.",
      wrong: "If you can't find the 3rd by ear, play each chord tone on the guitar and match it with your voice before trying to sing the triad freely. Don't rush — accuracy at 80 BPM beats sloppiness at any tempo.",
      sarah: "Gene, you're now singing three notes per chord — root, 3rd, 5th. That's the entire harmonic skeleton. When you improvise melodies later, these chord tones will be your anchor points. Every note you sing will relate to one of these three.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      levelUp: "Can sing root, 3rd, and 5th of G, C, D, Em, and Am while strumming at 80 BPM without strum breaks."
    }
  ]
};
