import { getPitchRange } from "../appData.js";

export const level8 = {
  level: 8,
  title: "Melody Building",
  subtitle: "Five notes. Infinite melodies. Zero wrong answers.",
  description:
    "The pentatonic scale is your 'safe space' — five notes that sound good over any chord in the key. Based on Orff Schulwerk and Kodály: the pentatonic scale is universally the first melodic framework taught because it contains no dissonant intervals. You CAN'T play a wrong note. This level builds from 2-note melodies to free pentatonic improvisation, with backing tracks as your band.",
  artists: "Khruangbin, Allah-Las, Tinariwen, BALTHVS",
  unlocks: "Originals & Genre Craft (Level 9)",
  review: { label: "Level 6-7 Check-In", time: 5, exercises: ["ss-6-3", "ss-7-6"], prompt: "Create a chord-tone melody over Am-C-G-Em (ss-6-3). Then do 2 minutes of one-note rhythm improv (ss-7-6). Both flowing? Move on." },
  exercises: [
    {
      id: "ss-8-1",
      time: 6,
      title: "Pentatonic Playground",
      type: "vocal",
      what: "Sing the Am pentatonic scale (A-C-D-E-G) over an Am chord. Just these 5 notes — explore them freely. Go up, go down, skip around. Every combination sounds good. This is your melodic safe space.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Sing the scale ascending: A... C... D... E... G. One note per beat. Find each note on the guitar first if needed.", why: "The ascending pentatonic scale maps your melodic territory. These 5 notes are all you need for now." },
        { text: "Descend: G... E... D... C... A. Then try the full arc: A-C-D-E-G-E-D-C-A.", why: "Going up and down the scale in sequence trains your ear to hear the intervals between each note." },
        { text: "Now skip around: A-D-E-C-G-A. Random order. Every combination works — there are no wrong notes in the pentatonic over Am.", why: "Random exploration is Kratus Level 1 of improvisation. Without rules or targets, you discover patterns naturally." },
        { text: "Close your eyes and sing any pentatonic notes that feel right. 2 minutes of free exploration. Don't plan — just let your voice find notes within the scale.", why: "Eyes-closed exploration engages audiation — hearing music in your inner ear before singing it. This is Gordon's foundational skill." }
      ],
      feel: "The pentatonic should feel like a playground with no walls. Every note resonates with the Am chord. Nothing clashes. This freedom is the foundation of melodic improvisation.",
      wrong: "If a note sounds 'wrong,' you've probably landed outside the pentatonic (on B or F). Come back to A-C-D-E-G. Within those 5 notes, nothing can go wrong.",
      sarah: "Gene, the pentatonic scale is used by every culture on Earth. It's the melodic equivalent of a major chord — universally consonant. Tinariwen, Khruangbin, and the Allah-Las all live in this scale.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-8-2",
      time: 8,
      title: "Call & Response",
      type: "song",
      what: "Guitar plays a short phrase, then your voice answers. This is the oldest musical conversation format — used in blues, gospel, African music, and every improvisation tradition. The guitar 'calls' with a 2-beat riff; your voice 'responds' with a 2-beat melody. Based on Kratus Level 2: process-oriented improvisation.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Strum Am for 2 beats, then stop and sing a 2-beat pentatonic phrase. Strum 2 beats, sing 2 beats. Alternate.", why: "The 2-beat alternation is the simplest call-and-response format. Each part has equal time — guitar and voice trade like conversation partners." },
        { text: "Now play a guitar riff (a pentatonic phrase on the fretboard) for 2 beats, then echo it with your voice for 2 beats. Try to match the guitar's melody.", why: "Echoing the guitar with your voice trains pitch matching and audiation. Your ear translates the guitar's melody into vocal output." },
        { text: "Flip it: sing a 2-beat phrase, then play it on guitar. Voice leads, guitar follows. This is harder — your voice must lead with confidence.", why: "When the voice leads, you're composing in real-time. The guitar validates what you sang. This builds confidence in your melodic instincts." },
        { text: "Play the Desert Blues track and do call-and-response over it: sing 4 bars, play guitar 4 bars, alternating. Let the track carry the groove.", why: "Longer phrases (4 bars) allow more melodic development within each turn. The backing track provides harmonic and rhythmic context." }
      ],
      feel: "Call and response should feel like a musical dialogue — question and answer, tension and resolution. When guitar and voice start truly responding to each other (not just alternating), the conversation is real.",
      wrong: "If your voice always echoes the guitar exactly, you're mimicking, not responding. Try singing something DIFFERENT from what the guitar played — a contrast, not a copy.",
      sarah: "Gene, call and response is the DNA of the blues, and the blues is the DNA of every genre you love. Ali Farka Touré's guitar conversations are exactly this exercise, mastered.",
      metronome: 75,
      phraseForm: { pattern: "CR", barsPerSection: 2, labels: { C: "Guitar Call", R: "Voice Answer" } },
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-8-3",
      time: 6,
      title: "Constraint Melodies",
      type: "vocal",
      what: "Create melodies with specific constraints — only 2 notes, then only 3, then 4, then all 5 pentatonic notes. Each constraint level forces creativity within limits. This is constraint-led approach (CLA): fewer options = more creative solutions.",
      steps: [
        { text: "Two notes only: A and C. Create the most interesting 4-bar melody you can using ONLY these two notes. Vary rhythm and duration.", why: "Two notes forces maximum rhythmic creativity. 'Amazing Grace' opens with just two notes. Constraints breed invention." },
        { text: "Three notes: A, C, D. One more note opens up new melodic possibilities. Create a different 4-bar melody.", why: "Adding one note at a time lets you feel how each note expands your palette. D adds a major 2nd interval from C — a step that pulls upward." },
        { text: "Four notes: A, C, D, E. Create another 4-bar melody. Notice how much more variety is possible.", why: "Four notes approaches the freedom of the full pentatonic. The E adds a perfect 5th from A — the strongest consonance." },
        { text: "All five: A, C, D, E, G. Full pentatonic. Create a melody that uses all five. Then go back to your 2-note melody. Which do you prefer? Both are valid.", why: "Sometimes the 2-note melody is more memorable than the 5-note one. More notes ≠ better music. This exercise proves that." }
      ],
      feel: "Each constraint level should feel like a puzzle — how much music can you make with this few notes? The satisfaction comes from creating something beautiful within tight limits.",
      wrong: "If you accidentally use notes outside the constraint, start over. The discipline IS the exercise. Staying within limits is what forces creativity.",
      sarah: "Gene, Tom Waits wrote whole songs on 3 notes. Jack Johnson's melodies rarely use more than 5. Constraint is the friend of creativity, not the enemy.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      recorder: true
    },
    {
      id: "ss-8-4",
      time: 8,
      title: "Melodic Variation",
      type: "vocal",
      what: "Take one 4-beat phrase and create 5 variations — change one element at a time. Same phrase with different rhythm. Same rhythm with different notes. Higher. Lower. Backwards. This is 'repetition with variation' — the engine of all melody writing.",
      steps: [
        { text: "Create a simple 4-beat pentatonic phrase. Sing it 3 times to memorize it. This is your 'seed' phrase.", why: "The seed phrase is the DNA of a melody. Variations grow from it like branches from a trunk." },
        { text: "Variation 1: same notes, different rhythm. If the original was 'long-short-short-long,' try 'short-short-long-long.'", why: "Rhythmic variation changes the feel without changing the melody's pitch identity. It's the easiest type of variation." },
        { text: "Variation 2: same rhythm, shift all notes up by one scale step. A→C, C→D, D→E, E→G. The contour stays the same; the pitch level shifts.", why: "Sequence (the same pattern at a different pitch level) is the most common compositional tool in all music. Mozart, Beatles, Khruangbin — everyone uses it." },
        { text: "Variation 3: reverse the phrase — sing the notes backward. Variation 4: change one note. Variation 5: combine two previous variations.", why: "Each variation technique gives you a compositional tool. With just these 5 techniques, you can generate infinite melody from a single seed." },
        { text: "Record your original phrase + all 5 variations back to back. You just created a full melodic development section.", why: "Melodic development IS songwriting. Verses are variations on a theme. You've done the core creative act." }
      ],
      feel: "Variation should feel like looking at the same landscape from different angles — recognizable but fresh each time. The seed phrase is always there underneath.",
      wrong: "If your variations are so different they don't sound related to the original, you've changed too much. Keep at least one element constant (rhythm OR notes) so the family resemblance holds.",
      sarah: "Gene, melodic variation is the secret weapon of your favorite artists. Khruangbin's melodies evolve through subtle variations — same shape, slightly different details. That's exactly this skill.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      recorder: true
    },
    {
      id: "ss-8-5",
      time: 8,
      title: "Pentatonic Improv",
      type: "vocal",
      what: "Free improvisation over a backing track using only pentatonic notes. No plan, no target. Sing whatever your ear suggests for 4 minutes straight. This is Kratus Level 3: product-oriented improvisation — you're making music that sounds like music, not just exploring.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Play the Khruangbin backing track. Strum Am lightly or just listen. Close your eyes. Start singing pentatonic notes — whatever comes. Don't think, just sing.", why: "Removing thought engages the default mode network — the brain region associated with creativity and flow. Thinking disrupts improvisation." },
        { text: "If you get stuck on one note, jump to the opposite end of the scale. If you're on A, jump to G. If you're on G, drop to A. Big jumps create energy.", why: "Intervallic leaps break melodic ruts. They inject surprise into the improvisation and open new melodic territory." },
        { text: "Use silence. Don't fill every beat. Sing a phrase, then leave 2-4 beats of silence before the next phrase. Let the music breathe.", why: "Silence is the most powerful tool in improvisation. It creates tension, allows the listener to process, and makes the next phrase more impactful." },
        { text: "Record the full 4 minutes. Listen back. Mark any phrases that surprised you or made you feel something. Those are your keepers.", why: "Improv sessions are gold mining. 90% is exploration. 10% is discovery. The discoveries become the seeds of songs." }
      ],
      feel: "Free pentatonic improv should feel like surfing — riding the wave of the backing track, making intuitive decisions, sometimes wiping out and paddling back. The flow state lives here.",
      wrong: "If you're planning phrases before singing them, you're composing, not improvising. Let go of control. Sing the 'wrong' note sometimes — you'll discover it leads somewhere interesting.",
      sarah: "Gene, this is the exercise that unlocks improvisational freedom. Everything before this was scaffolding. Now you're flying. The pentatonic is your safety net — you cannot fall.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-8-6",
      time: 8,
      title: "Contour Drawing",
      type: "vocal",
      what: "Sing specific melodic shapes: rising line, falling line, arch (up-then-down), valley (down-then-up), zigzag. Each contour has a different emotional quality. Drawing shapes with your voice builds the vocabulary of melody.",
      steps: [
        { text: "Rising line: sing A-C-D-E-G over 4 bars. Slow ascent. This shape creates anticipation and lift.", why: "Rising melodies build tension and expectation. Verses often rise toward the chorus. It's the musical equivalent of 'here it comes.'" },
        { text: "Falling line: sing G-E-D-C-A over 4 bars. Gentle descent. This shape creates resolution and settling.", why: "Falling melodies resolve and comfort. Chorus endings and song outros often descend. It's the musical 'ahh, we're home.'" },
        { text: "Arch: start low, rise to the peak note (G), then descend back. A-C-D-E-G-E-D-C-A. The classic melody shape.", why: "The arch is the most common melody contour in world music. It mirrors a breath, a wave, a day — natural cycles of rising and falling." },
        { text: "Valley: start high, dip low, rise back. G-E-D-C-A-C-D-E-G. Less common but emotionally powerful.", why: "Valley contours create a sense of dipping into emotion and emerging. They work beautifully for bridge sections." },
        { text: "Create a 16-bar melody using all four shapes: rising (4 bars) → arch (4 bars) → valley (4 bars) → falling (4 bars). Record it.", why: "Sequencing contour shapes creates a complete melodic journey. This 16-bar piece has direction, variety, and resolution." }
      ],
      feel: "Each contour should feel like drawing with your voice — tracing a shape in the air. When you can feel the shape before you sing it, your audiation is developing.",
      wrong: "If all your melodies are flat (staying on one note) or random (no discernible shape), you haven't internalized the contours. Exaggerate the shapes first, then make them subtler.",
      sarah: "Gene, contour is melody's skeleton. Once you can sing any shape on command, you can hear the shapes in other people's music — and use them intentionally in yours.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      pitchContour: true,
      recorder: true,
      phraseForm: { pattern: ["Rise", "Arch", "Valley", "Fall"], barsPerSection: 4, labels: { Rise: "Rising", Arch: "Arch", Valley: "Valley", Fall: "Falling" } }
    },
    {
      id: "ss-8-7",
      time: 10,
      title: "First Original Over Backing Track",
      type: "song",
      what: "Create a complete original melody over a backing track — verse melody (low, calm) and chorus melody (higher, more energy). Pentatonic notes only. No lyrics yet — just 'la' or 'ooh.' This is your first melody composed with full improvisational freedom.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play a backing track. Improvise freely for 2 minutes. Let phrases emerge. When you hear one you like, repeat it.", why: "Improvisation discovers the melody. Repetition claims it. The phrase you want to sing again is your melodic hook." },
        { text: "Settle on a verse phrase: something in the lower pentatonic range (A3-D4). Sing it with an arch or valley contour. Repeat it for 4 bars.", why: "Verse melodies sit low and intimate. They tell the story. The low range matches your porch register." },
        { text: "Create a chorus phrase: something higher (D4-G4) with a rising or arch contour. More energy than the verse. Repeat for 4 bars.", why: "The chorus lifts above the verse. Even a 3rd higher creates obvious contrast. The energy shift IS the chorus." },
        { text: "Assemble: verse (4 bars) → verse (4 bars) → chorus (4 bars) → verse (4 bars). Sing through the whole thing twice. Record the second pass.", why: "AABA form with your original melodies over a backing track is a complete musical statement. This is composing." }
      ],
      feel: "This should feel like the previous exercises coming together — pentatonic freedom, contour awareness, rhythmic confidence. The backing track is your band. You're the singer.",
      wrong: "If the verse and chorus melodies sound identical, push the contrast. Sing the verse near-whispered, the chorus with conviction. Range + energy = contrast.",
      sarah: "Gene, you just composed a song melody from scratch. No reference, no cover, no imitation. Your ear, your instincts, your pentatonic vocabulary. This is the real thing.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      volumeMeter: true,
      recorder: true,
      levelUp: "Can freely improvise pentatonic melodies over backing tracks, create original verse/chorus melodies with contrasting contours, and use call-and-response between voice and guitar."
    }
  ]
};
