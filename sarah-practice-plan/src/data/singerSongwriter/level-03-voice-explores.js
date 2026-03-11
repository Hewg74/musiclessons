import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Voice Explores",
  subtitle: "One skill at a time. No pressure, just play.",
  description:
    "You know the chord tones from Level 2 — now PLAY with them. This level isolates each improvisation skill individually: pitch exploration, stepwise motion, rhythmic play, body rhythm, rhythm cells, call-and-response, early audiation, emotional expression, vowel color, breath phrasing, silence, and dynamics. One variable at a time, so your brain can build each pathway without overload. Based on motor learning science (isolated sub-skills before combination), Dalcroze eurhythmics (body before voice), Kodály rhythm syllables, and Gordon's audiation research (internal hearing seeded early).",
  artists: "Khruangbin, Skinshape, Tommy Guerrero",
  unlocks: "Voice Combines (Level 4)",
  review: { label: "Level 2 Check-In", time: 5, exercises: ["ss-2-3b", "ss-2-3c"], prompt: "Sing root-5th on G-C-D-Em-Am at 85 BPM (ss-2-3b). Walk the triad of Am-C-G-D (ss-2-3c). Both stable with no strum breaks? Move on." },
  exercises: [
    {
      id: "ss-3-1",
      time: 6,
      title: "Free Exploration — Am",
      type: "vocal",
      what: "Strum Am on autopilot and sing any combination of A, C, and E in any order, any rhythm, for 3 minutes straight. No target phrase, no compositional goal. Just wander through the chord tones. This is Kratus Level 1 — pure exploration.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing the note A. Hold it as long as you want. Then move to C whenever you feel like it. Then E. No order, no rhythm — just drift.", why: "Free exploration without targets builds the neural pathways for improvisation. When there's no wrong answer, your brain relaxes and finds natural melodic movement." },
        { text: "Speed up: try moving between A-C-E faster. Then slow down again. Vary how long you hold each note. Some short, some long, some with silence between.", why: "Varying duration and speed trains your voice to navigate chord tones at different rates — fast for energy, slow for emotion. Both are tools." },
        { text: "Try singing on 'la,' then 'ooh,' then 'mm.' Notice how different vowels change the feeling of the same three notes.", why: "Vowel sounds shape the emotional color of your improvisation. 'Ooh' feels intimate, 'la' feels open, 'mm' feels contemplative. All three are useful." },
        { text: "Keep going for 3 full minutes without stopping. If you get stuck, hold any note until the next one comes. There is no wrong move here.", why: "Sustained improvisation builds endurance and trust. The first minute feels awkward. By minute three, you're in the flow." }
      ],
      feel: "This should feel like doodling with your voice — no pressure, no audience, no expectations. You're exploring a tiny musical space (3 notes) with complete freedom.",
      wrong: "If you're trying to make it sound 'good' or create a melody, you're adding pressure that doesn't belong here. Let go of product. This is process only.",
      sarah: "Gene, this is the exercise the curriculum was missing. You know the notes from Level 2. Now forget the rules and just play with them. Think of it like paddling around a break without trying to catch a wave — just being in the water.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-2",
      time: 6,
      title: "Free Exploration — G Major",
      type: "vocal",
      what: "Same exercise, new chord. Strum G and sing any combination of G, B, and D. The major triad has a brighter, more open sound than Am. Notice how the emotional quality shifts — same freedom, different color palette.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum G on autopilot. Sing the root G. Hold it, then drift to B (the major 3rd), then to D (the 5th). No plan — just explore these three notes.", why: "G major feels sunnier than Am. The major 3rd (B) is the key difference — it gives the chord its bright, resolved quality. Your voice will naturally settle into different patterns here." },
        { text: "Notice the difference between the major 3rd (B in G major) and the minor 3rd (C in Am). Strum G, sing G-B-D. Then switch to Am, sing A-C-E. Feel how the emotional color shifts.", why: "Major vs minor is the most fundamental emotional distinction in music. Training your voice to navigate both fluently means you can shift mood instinctively." },
        { text: "Stay on G. Try singing only G and D (root and 5th) for 1 minute — wide, open intervals. Then add B for the next minute. Notice how the 3rd fills in the emotional space.", why: "The 3rd is where emotion lives. Root and 5th are neutral — they work over major or minor. Adding the 3rd commits you to a mood." },
        { text: "3-minute freestyle on G major triad. Sing on any vowel. Let patterns emerge and dissolve. Record it.", why: "Each key has its own vocal sweet spot. G major sits differently in your voice than Am — discovering where feels natural builds your key awareness." }
      ],
      feel: "G major should feel open and bright compared to Am's melancholic warmth. Your voice will naturally want different things over each chord.",
      wrong: "If G major sounds identical to Am in your improvisations, you're not hearing the chord. Sing the 3rd (B) loudly — let the major quality ring. Then sing Am's 3rd (C). The difference should be unmistakable.",
      sarah: "Gene, a lot of your favorite surf-psych songs live in G major — Allah-Las, Sun Room. This brighter palette is where the golden-hour energy comes from. Let it shine.",
      metronome: 80,
      referencePitches: getPitchRange("G2", "D4"),
      recorder: true
    },
    {
      id: "ss-3-3",
      time: 6,
      title: "Free Exploration — C & Em",
      type: "vocal",
      what: "Two more chords to explore freely. Strum C and sing C-E-G. Then strum Em and sing E-G-B. By the end you'll have explored all five chord triads from Level 1 — the complete palette.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum C on autopilot. Freely sing C-E-G in any combination, any rhythm. 2 minutes. C major is warm and grounded — let the low C anchor you while E and G float above.", why: "Each chord has its own gravitational field. C major pulls your voice toward different patterns than G major or Am. Exploring all five chords gives you the full vocabulary." },
        { text: "Switch to Em. Freely sing E-G-B in any combination. 2 minutes. Em is the darkest of your five chords — the minor quality plus the low root creates a brooding, contemplative feel.", why: "Em shares two notes with G major (G and B) but sounds completely different because E is the root. Context changes everything — the same notes serve different chords." },
        { text: "Alternate: 4 bars of C, then 4 bars of Em. Let your voice adjust to each chord's gravity. Notice which notes carry over (both share E and G) and which change.", why: "Shared tones between chords are melodic bridges — they let you hold a note across a chord change. This is how melodies create smooth motion through harmony." },
        { text: "Pick whichever chord felt most natural for your voice. Spend 2 more minutes freely exploring it. Record the last minute.", why: "Every singer has chords that feel like home. Discovering yours early means your first songs will sit in your voice naturally." }
      ],
      feel: "By the end of this exercise, you've freely explored all five chords from Level 1. Each one should feel familiar — like rooms in a house you know well.",
      wrong: "If you're rushing through chords to 'get through the exercise,' slow down. Spend real time with each one. The goal isn't completion — it's familiarity.",
      sarah: "Gene, C major is where a lot of Skinshape and Babe Rainbow songs live. Em is Hermanos Gutiérrez territory — sparse, cinematic. Your voice will find its home in some chords more than others, and that's your songwriting compass.",
      metronome: 80,
      referencePitches: getPitchRange("C3", "B4"),
      recorder: true
    },

    // ─── NEW: STEPWISE MOTION ───

    {
      id: "ss-3-4",
      time: 6,
      title: "Stepwise Wandering",
      type: "vocal",
      what: "Strum Am and sing only stepwise motion through chord tones: A→C, C→E, E→C, C→A. No leaps. Walk through chord tones like stepping stones. This bridges the total freedom of exploration and the coming constraints.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Sing A, then step up to C (the nearest chord tone above). Hold C, then step up to E. Then step back down: E→C→A. Only stepwise motion — no skipping notes.", why: "Stepwise motion is the most natural melodic movement. It's how we sing intuitively — small steps, not big leaps. This builds the foundation for smooth, flowing melodies." },
        { text: "Try different rhythms on the same stepwise path. Walk up A→C→E slowly (2 beats per note). Then quickly (1 beat per note). Then unevenly (A for 3 beats, C for 1 beat, E for 4 beats).", why: "Varying rhythm on a fixed pitch path isolates rhythmic creativity. The melodic contour stays the same — only the timing changes." },
        { text: "Now wander freely using only steps: A→C→E→C→A→C→A→C→E. No planned path — just step to the nearest chord tone whenever you feel like moving.", why: "Free stepwise wandering induces flow states because the pitch decisions are simple (only up or down one step) while the timing decisions are completely open." },
        { text: "2-minute freestyle: stepwise wandering on any vowel. Let the stepping-stone motion become automatic. Record it.", why: "When stepwise motion becomes effortless, you've built the most common melodic pathway. Most great melodies are mostly stepwise with occasional leaps for drama." }
      ],
      feel: "This should feel like walking along a path — each step is small and natural. No jumping, no rushing. Just one note leading gently to the next.",
      wrong: "If you're leaping from A to E (skipping C), you're breaking the stepwise constraint. Always move to the nearest chord tone — the discipline is the exercise.",
      sarah: "Gene, Khruangbin's melodies are almost entirely stepwise — Mark Speer walks through notes like he's strolling on a beach. That smooth, unhurried motion is what this exercise builds.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      pitchContour: true
    },
    {
      id: "ss-3-5",
      time: 6,
      title: "Two-Note Constraint",
      type: "vocal",
      what: "Improvise using ONLY two notes at a time. Start with root and 5th (A and E over Am). Then root and 3rd (A and C). Then 3rd and 5th (C and E). Fewer notes forces deeper exploration of rhythm, dynamics, and phrasing within a tiny space.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Sing ONLY A and E (root and 5th). Improvise freely with just these two notes for 2 minutes. How many different things can you do with two notes?", why: "Constraint-based creativity research shows that limiting options increases both originality and fluency. Two notes eliminates decision paralysis while forcing you to find variety through rhythm and dynamics." },
        { text: "Same chord, new pair: sing ONLY A and C (root and minor 3rd). 2 minutes. This interval is smaller and more emotional — the minor 3rd is where the melancholy lives.", why: "Root-to-3rd is the emotional core of any chord. This tight interval forces you to explore subtle melodic motion — slides, bends, holding one note while the other echoes." },
        { text: "Last pair: ONLY C and E (3rd and 5th). 2 minutes. This pair has no root — it floats. The improvisation should feel suspended, unresolved.", why: "Without the root to anchor you, your ear has to work harder. This trains your voice to navigate upper chord tones — a skill that separates interesting melodies from basic ones." },
        { text: "Now open it up: all three notes (A-C-E). After the two-note constraints, three notes feels luxurious. Notice how much more fluent you are now.", why: "The constraint-then-release technique is one of the most effective practice strategies in music education. Restriction builds fluency that explodes when the constraint is removed." }
      ],
      feel: "Each two-note pair should feel like a tiny world — you'd be surprised how much musical territory exists between just two pitches when you vary rhythm, dynamics, and vowel sound.",
      wrong: "If you accidentally sing the third note, don't stress — just gently return to your two-note constraint. The discipline of staying within the pair is part of the training.",
      sarah: "Gene, Tommy Guerrero builds entire sections of songs on two notes. The desert blues tradition — Tinariwen, Ali Farka Touré — lives in tiny melodic spaces. Less is more when you know how to work with less.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── NEW: BODY RHYTHM ───

    {
      id: "ss-3-6",
      time: 6,
      title: "Body Rhythm First",
      type: "rhythm",
      what: "NO singing. Strum Am on autopilot. Clap rhythms over the strum. Tap foot patterns. Sway. Feel rhythm physically before adding voice. Dalcroze eurhythmics — body internalizes rhythm before voice.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Start the backing track. Now clap a simple rhythm over the strum — quarter notes on beats 1, 2, 3, 4. Just clap and strum. No voice at all.", why: "Dalcroze eurhythmics research shows that the body must internalize rhythm before the voice can express it. Clapping isolates the rhythmic sense from pitch decisions." },
        { text: "Change the clap pattern: clap on beats 1 and 3 only. Then only on 2 and 4 (the backbeat). Then try the 'and' of each beat (offbeats). Feel how each pattern changes the groove.", why: "Different rhythmic placements create different feels — on-beat feels driving, backbeat feels funky, offbeat feels reggae. Your body learns this faster than your mind." },
        { text: "Replace clapping with foot tapping. Tap your foot on the downbeats while your hands strum. Then try tapping on offbeats. Feel the groove in your whole body.", why: "Foot tapping adds a third independent rhythm stream (strum + foot + eventual voice). Building body rhythm now means your voice has a physical foundation to sync with." },
        { text: "Combine: strum on autopilot, foot taps quarter notes, and clap a syncopated pattern over both. 2 minutes of body-only rhythm. Let the groove sink into your bones.", why: "Multi-limb rhythmic independence is the physical foundation of groove. When your body grooves, your voice will naturally follow." }
      ],
      feel: "This should feel physical and fun — like dancing while playing guitar. No singing means zero vocal pressure. Just groove.",
      wrong: "If you catch yourself singing or humming, stop. The constraint is body-only rhythm. Your voice gets its turn later — right now the body leads.",
      sarah: "Gene, think of this like a drummer's warm-up — all groove, no melody. The reggae and soul grooves you love are body-first music. Let the physical rhythm come before the voice.",
      metronome: 80
    },
    {
      id: "ss-3-7",
      time: 6,
      title: "One-Note Rhythm Play",
      type: "vocal",
      what: "Sing ONLY the note A while strumming Am. Vary nothing except rhythm — long notes, short bursts, rests, syncopation. By removing pitch decisions entirely, you isolate rhythmic creativity and build groove independence between voice and guitar.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing A as a whole note — 4 beats long. Then as two half notes. Then as four quarter notes. Then as eighth notes. Feel how the same note changes character with rhythm.", why: "One pitch removes all melodic decision-making. Your brain is 100% focused on rhythmic creativity — which is where most groove comes from." },
        { text: "Now go free: sing A in any rhythm you want. Try short bursts (da-da-da). Try long holds with silence between. Try syncopation — landing between the beats.", why: "Rhythmic improvisation on a single note is what drummers do with a snare. Your voice becomes a rhythmic instrument, not just a melodic one." },
        { text: "Try matching the guitar's rhythm exactly (voice doubles the strum). Then try the opposite — voice fills the spaces between strums.", why: "Matching the guitar teaches rhythmic lock. Filling the gaps teaches rhythmic independence. Both are essential for singer-songwriting." },
        { text: "2-minute freestyle: sing A in any rhythm that comes to you. Let patterns emerge and dissolve. Don't repeat anything on purpose — let it flow.", why: "Extended single-note rhythmic play builds the rhythmic vocabulary that will power your melodies in Level 4." }
      ],
      feel: "This should feel percussive — your voice is a drum that happens to be pitched. The groove matters more than the note.",
      wrong: "If you catch yourself changing pitch (moving to C or E), gently come back to A. The constraint IS the exercise. One note, infinite rhythms.",
      sarah: "Gene, think of this like a reggae DJ toaster riding a riddim — one note, all groove. The rhythm is the melody. When you add pitch variety later, this rhythmic confidence will already be there.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "A3"),
      recorder: true
    },

    // ─── NEW: RHYTHM CELLS ───

    {
      id: "ss-3-8",
      time: 6,
      title: "Rhythm Cell Builder",
      type: "vocal",
      what: "Learn 4 named rhythm cells: 'ta' (quarter note), 'ti-ti' (two 8ths), 'ta-ah' (half note), 'ti-ka-ti-ka' (four 16ths). Speak them, clap them, then sing the note A with each pattern over Am strum. Building a conscious rhythmic vocabulary with named patterns.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Speak the rhythm cells without singing: 'ta' (one quarter note), 'ti-ti' (two eighth notes), 'ta-ah' (one half note), 'ti-ka-ti-ka' (four sixteenth notes). Say each one 4 times while strumming Am.", why: "Kodály rhythm syllables give names to rhythmic patterns. When patterns have names, your brain can recall and combine them consciously — building a rhythmic vocabulary." },
        { text: "Clap each cell while speaking it: clap on 'ta,' double-clap on 'ti-ti,' sustained clap on 'ta-ah,' rapid four-tap on 'ti-ka-ti-ka.' Body + voice together.", why: "Pairing speech with physical gesture locks the rhythm into muscle memory. This is the Kodály method — body, voice, and mind aligned on rhythm." },
        { text: "Now sing the note A with each cell pattern. 'Ta' = A held for 1 beat. 'Ti-ti' = A-A as two eighth notes. 'Ta-ah' = A held for 2 beats. 'Ti-ka-ti-ka' = A-A-A-A as four sixteenth notes.", why: "Transferring named rhythm cells to pitched singing bridges the gap between rhythmic knowledge and melodic application." },
        { text: "Combine cells freely: 'ta ti-ti ta-ah' or 'ti-ka-ti-ka ta ti-ti ta.' Create 4-beat patterns from your rhythm cell vocabulary. Sing them on A over the backing track. 2 minutes.", why: "Combining cells is rhythmic composition. Each cell is a building block — stringing them together creates unique rhythmic phrases that will power your melodies." }
      ],
      feel: "This should feel like learning a rhythmic language — each cell is a word, and you're building sentences. The names make the rhythms tangible and memorable.",
      wrong: "If the cells blur together and you can't distinguish 'ti-ti' from 'ti-ka-ti-ka,' slow the metronome to 60 BPM. Clarity matters more than speed.",
      sarah: "Gene, reggae music is built on rhythm cells — the offbeat chop, the one-drop, the skank. Naming these patterns gives you conscious access to the rhythmic vocabulary that's already in your body from years of listening.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "A3"),
      recorder: true,
      rhythmCells: [
        { name: "Ta", pattern: [1], description: "Quarter note" },
        { name: "Ti-Ti", pattern: [0.5, 0.5], description: "Two eighth notes" },
        { name: "Ta-ah", pattern: [2], description: "Half note" },
        { name: "Ti-ka-ti-ka", pattern: [0.25, 0.25, 0.25, 0.25], description: "Four sixteenth notes" }
      ]
    },
    {
      id: "ss-3-9",
      time: 8,
      title: "Guitar-Voice Conversation",
      type: "vocal",
      what: "Play a short guitar phrase (2 bars), then answer it with your voice using chord tones (2 bars). Then reverse — sing first, answer on guitar. Call-and-response is the oldest improvisation format — and crucially, you're never singing and playing at the same time.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play a simple 2-bar melody on guitar using the Am pentatonic (A-C-D-E-G on frets 5-8). Then answer with your voice: sing a 2-bar response using chord tones (A-C-E). Guitar calls, voice answers.", why: "Call and response separates the two tasks in time — you're never doing both at once. This builds the conversational instinct between your instruments." },
        { text: "Make the guitar call short (2-3 notes). Keep the vocal answer short too. Leave space between them — silence is part of the conversation.", why: "Space between phrases is what makes improvisation sound musical rather than frantic. The rests let ideas breathe." },
        { text: "Now reverse: sing a chord-tone phrase first, then answer it on guitar. Let the guitar respond to what the voice suggested.", why: "Reversing the roles trains your ear to hear melodic ideas in your voice and translate them to guitar — the core singer-songwriter skill." },
        { text: "Alternate freely: sometimes guitar leads, sometimes voice leads. Let the conversation flow naturally for 3 minutes.", why: "Free alternation develops the fluid back-and-forth that defines great singer-songwriting — voice and guitar as equal partners, not leader and follower." }
      ],
      feel: "This should feel like a conversation between two musicians — except both musicians are you. The guitar says something, the voice responds. Playful, relaxed, exploratory.",
      wrong: "If your responses are identical to your calls (exact echo), push for variety. A good response acknowledges the call but adds something new — different rhythm, different direction, different energy.",
      sarah: "Gene, Khruangbin does this constantly — Mark plays a guitar phrase, Laura answers with her voice. You're building that same conversational instinct between your own hands and voice.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },

    // ─── NEW: EARLY AUDIATION ───

    {
      id: "ss-3-10",
      time: 6,
      title: "Silent Sing",
      type: "vocal",
      what: "Strum Am. Hear a chord tone in your head. Hold it internally for 4 beats. Then sing it out loud for 4 beats. Alternate: 4 bars silent internal hearing, 4 bars singing. Early audiation seed — training your inner ear from the start.",
      setup: "Guitar. Metronome at 75 BPM (slower to allow internal hearing).",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Close your eyes. Internally 'hear' the note A in your head — don't sing, just imagine the sound. Hold that mental image for 4 beats.", why: "Gordon's audiation research shows that internal hearing should be seeded as early as possible. The ability to hear music in your mind is the foundation of all musicianship." },
        { text: "After 4 beats of silent hearing, sing the note A out loud for 4 beats. Did your sung pitch match what you heard internally? If not, adjust and try again.", why: "The gap between internal hearing and actual singing is your 'audiation gap.' Closing it early means your voice becomes a more accurate instrument." },
        { text: "Alternate: 4 bars of silent internal hearing (imagine A, then C, then E), then 4 bars of singing those notes out loud. The silent bars are the exercise — the singing bars are the check.", why: "Silent practice is real practice. Your brain processes music internally with the same neural pathways as actual singing. The silence builds the same skills." },
        { text: "2-minute freestyle: alternate between silent hearing and singing. Let the internal melodies become more complex — hear 2-3 notes internally before singing them. Record the sung portions.", why: "Extending audiation from single notes to short phrases is the progression. Eventually, entire melodies will form in your head before your voice produces them." }
      ],
      feel: "This should feel meditative and a little strange — you're making music in your head, then checking it with your voice. The silent bars should feel active, not empty.",
      wrong: "If you're singing during the 'silent' bars (humming, whispering), you're bypassing the audiation. True internal hearing means no sound at all — just the mental image of the pitch.",
      sarah: "Gene, every musician you admire hears the music before they play it. Mark Speer, Angus Stone — they know what's coming because they hear it internally first. This exercise builds that skill from day one.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      pitchContour: true
    },
    {
      id: "ss-3-11",
      time: 8,
      title: "Emotional Color",
      type: "vocal",
      what: "Same three chord tones (A-C-E), same Am strum — but sing them with three completely different emotional colors. First: lazy sunset. Then: driving energy. Then: mystery. Expression is improvisation too — how you sing matters as much as what you sing.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Sing A-C-E with 'lazy sunset' energy: slow, breathy, lots of space between notes. Think DOPE LEMON on the porch at golden hour. Let notes hang in the air.", why: "Emotional intention transforms identical notes into completely different music. The same A-C-E can sound peaceful, urgent, or mysterious depending on delivery." },
        { text: "Same notes, new color: 'driving energy.' Shorter notes, more rhythmic, slightly louder, more forward in the beat. Think Skinshape locked into a groove.", why: "Energy and urgency come from rhythm and attack, not from higher notes or louder volume. Your porch register can drive just as hard as a belt." },
        { text: "Same notes, third color: 'mystery.' Sing quietly, leave long silences, let notes decay into nothing before the next one. Think Tinariwen in the desert at night.", why: "Mystery comes from space and restraint. Fewer notes, more silence, letting the listener's imagination fill the gaps." },
        { text: "Free round: improvise with A-C-E while shifting between all three colors — sunset drifts into energy, energy dissolves into mystery, mystery warms into sunset. 2 minutes, no plan.", why: "Emotional fluidity is the highest form of vocal improvisation. When you can shift feeling in real time, your songs will have dynamic range that keeps listeners engaged." }
      ],
      feel: "Each emotional color should feel physically different — lazy sunset relaxes your jaw and throat, driving energy engages your diaphragm, mystery pulls your voice back and quiets it. The body leads the expression.",
      wrong: "If all three colors sound the same, you're not committing to the emotion. Exaggerate! Make the sunset version absurdly lazy. Make the energy version almost aggressive. The middle ground will find itself.",
      sarah: "Gene, your artists all do this instinctively — Allah-Las shift from dreamy to intense within a single song. You're building that same emotional range, but with just three notes. The notes don't change; you do.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-3-12",
      time: 8,
      title: "Vowel Shape Exploration",
      type: "vocal",
      what: "Improvise the same chord tones while cycling through different vowel sounds: 'ooh,' 'ahh,' 'eee,' 'oh,' 'ay.' Each vowel creates a different resonant space in your body, changing the character of identical notes. Your vowel choices will become a signature part of your vocal style.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am.",
      steps: [
        { text: "Sing A-C-E on 'ooh' for 1 minute. Let the 'ooh' shape your mouth into a small circle. Notice the warmth and intimacy of this vowel.", why: "'Ooh' is the most intimate vowel — it's where falsetto lives, where lullabies happen. It shapes your breath into a focused stream that feels private and close." },
        { text: "Switch to 'ahh' for 1 minute. Open your mouth wide. The sound gets bigger, brighter, more projecting. Same notes, completely different character.", why: "'Ahh' is the most open vowel — it projects naturally and carries emotion. It's where belting lives (though you won't belt). Even in your laid-back register, 'ahh' has more presence than 'ooh.'" },
        { text: "Try 'eee,' 'oh,' 'ay' — 30 seconds each. Notice how each vowel sits in a different part of your mouth and resonates differently in your chest and head.", why: "Vowel awareness is foundational vocal technique. Professional singers choose vowels deliberately for their sonic properties. You're building that awareness now." },
        { text: "Free improv: change vowels mid-phrase. Start a phrase on 'ooh,' slide into 'ahh,' end on 'oh.' Let the vowel changes add texture to your chord-tone improvisation. 2 minutes.", why: "Vowel modulation is an advanced expressive technique that most singers never consciously develop. Building it now means your eventual songs will have natural vocal texture and variety." }
      ],
      feel: "Each vowel should feel like a different room — 'ooh' is a small intimate space, 'ahh' is a large open hall, 'eee' is bright and focused. Same melody, different acoustic environments.",
      wrong: "If all your vowels sound the same, you're not shaping your mouth distinctly enough. Exaggerate the shapes — make 'ooh' extremely round and 'ahh' extremely wide. The middle ground will emerge.",
      sarah: "Gene, listen to how BALTHVS and Khruangbin use vowel sounds as texture — 'ooh' and 'ahh' aren't random choices, they're color choices. Your vowel instincts will shape your songwriting style.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── NEW: BREATH AS PHRASE ───

    {
      id: "ss-3-13",
      time: 6,
      title: "Breath as Phrase",
      type: "vocal",
      what: "One breath = one phrase. Inhale, sing chord tones for the length of your breath, stop when the breath runs out. The breath shapes the phrase naturally — no counting, no planning. Breath control as expressive shaping.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Take a deep breath. Sing chord tones (A, C, E) for as long as your breath lasts — then stop. Don't gasp for more air. Just stop. Silence until your next natural inhale.", why: "Breath-phrase coupling is how natural phrasing develops. Your lungs determine phrase length — not a metronome, not a bar count. This is how folk and blues singers have always phrased." },
        { text: "Try short breaths: quick inhale, sing 2-3 notes, stop. Then deep breaths: long inhale, sing a flowing 8-10 note phrase. Notice how breath depth changes phrase character.", why: "Short breaths create punchy, rhythmic phrases. Deep breaths create long, flowing lines. Both are valid musical tools — and your breath is the control." },
        { text: "Let the breath endings surprise you. Don't plan when to stop — just sing until the air runs out. The natural endings create organic phrase shapes that sound effortless.", why: "Planned phrase endings sound calculated. Breath-shaped endings sound natural. This is the difference between 'performing' and 'singing.'" },
        { text: "2-minute freestyle: breath-shaped phrases over the backing track. Each phrase is exactly one breath long. Record it — listen for the natural, organic quality of the phrasing.", why: "When breath shapes your phrases, your singing sounds human and authentic. This is the phrasing style of DOPE LEMON, Angus Stone, Jack Johnson — effortless because it follows the body." }
      ],
      feel: "This should feel like sighing musically — each phrase is an exhale that happens to be pitched. No effort, no planning. Breathe in, sing out, rest.",
      wrong: "If you're gasping for air or pushing past your breath to finish a phrase, you're overriding the exercise. Shorter phrases are fine. The breath IS the phrase — honor its natural length.",
      sarah: "Gene, your laid-back vocal style is naturally breath-shaped — you don't belt or push. This exercise makes that instinct conscious. Let your lungs be the composer.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── NEW: SILENCE ───

    {
      id: "ss-3-14",
      time: 6,
      title: "The Power of Silence",
      type: "vocal",
      what: "Strum Am for 4 bars. Sing for 2 bars. Rest for 2 bars. Repeat. Then: sing 1 bar, rest 3. Then: sing a single note, rest 7 bars. Explore how silence creates anticipation and makes each note more powerful.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing chord tones for 2 bars, then rest (no voice) for 2 bars. Repeat this cycle 4 times. Let the silence feel intentional, not empty.", why: "Silence is a musical element, not an absence. Planned rests create anticipation — the listener leans in, waiting for the next sound. This is the power of space." },
        { text: "Increase the silence: sing for 1 bar, rest for 3 bars. The singing becomes rare and precious. Each phrase carries more weight because there's so much space around it.", why: "Scarcity creates value. When you sing less, each note matters more. This is how Hermanos Gutiérrez and Tinariwen build drama — not through volume, but through restraint." },
        { text: "Maximum silence: sing a single note, then rest for 7 bars. One note in 8 bars. Let the backing track and guitar fill the space. That single note becomes an event.", why: "A single note surrounded by 7 bars of silence is a compositional statement. You're learning that sometimes the most powerful thing you can do is almost nothing." },
        { text: "Free improv: vary your singing-to-silence ratio freely. Sometimes dense, sometimes sparse, sometimes a single note in a sea of space. 2 minutes. Record it.", why: "Density control — choosing how much to sing — is one of the most advanced musical skills. Most beginners over-sing. Masters know when NOT to sing." }
      ],
      feel: "The silences should feel active, not awkward. You're choosing to be quiet — the music continues in the guitar and backing track. Your absence creates a space the listener fills with anticipation.",
      wrong: "If the silences feel uncomfortable and you rush to fill them, that's the instinct this exercise is training you to overcome. Sit with the discomfort. The silence IS the music.",
      sarah: "Gene, Hermanos Gutiérrez barely sing at all — their music is 90% space and 10% voice. That cinematic western sound you love is BUILT on silence. This exercise teaches your voice to use space like they do.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      volumeMeter: true
    },
    {
      id: "ss-3-15",
      time: 6,
      title: "Whisper to Full Voice",
      type: "vocal",
      what: "Improvise chord tones while moving through your dynamic range — from barely audible whisper to full chest voice and back. Dynamics in isolation: no chord changes, no rhythm constraints, just volume as a creative variable.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am softly.",
      steps: [
        { text: "Strum Am very softly. Sing chord tones in a near-whisper. Your voice should barely rise above the guitar. Hold notes, drift between pitches, keep everything quiet and intimate.", why: "Singing quietly requires more breath control than singing loudly. It also creates intimacy — the listener leans in. Many of your favorite artists (DOPE LEMON, Angus Stone) live here." },
        { text: "Gradually increase volume over 8 bars until you're singing at full chest voice. The strum should get louder too — guitar and voice grow together.", why: "A volume crescendo is the simplest form of musical drama. Learning to build intensity gradually is a fundamental songwriting and performance skill." },
        { text: "Now reverse: start at full voice and gradually fade to a whisper over 8 bars. Pulling back requires more control than pushing forward.", why: "Pulling back is harder because your body wants to stay at the louder, easier volume. Control over the fade is what separates amateurs from artists." },
        { text: "Free improv: move through your dynamic range unpredictably. Whisper for 4 bars, then suddenly full voice for 2 bars, then back to medium. 2 minutes.", why: "When dynamics become a variable you control consciously, your improvisation gains a third dimension beyond pitch and rhythm." }
      ],
      feel: "The whisper should feel private and close. The full voice should feel open and projecting. The transitions should feel like sunrise and sunset.",
      wrong: "If you're stuck at one volume the whole time, you're ignoring the most powerful expressive tool you have. Push the extremes.",
      sarah: "Gene, your porch register naturally lives in the quieter range — that's your sweet spot. But even DOPE LEMON has dynamic peaks. This exercise builds the range around your natural center.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can freely explore chord tones on all five chords, wander stepwise, internalize rhythm physically, name rhythm cells, hold a musical conversation between guitar and voice, audiate silently, shift emotional color, vary dynamics, shape vowel sounds, phrase with breath, and use silence as music — each skill individually, without the strum breaking."
    }
  ]
};
