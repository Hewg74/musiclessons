import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "Melody Building",
  subtitle: "Five notes. Infinite melodies. Zero wrong answers.",
  description:
    "The pentatonic scale is your 'safe space' — five notes that sound good over any chord in the key. Based on Orff Schulwerk and Kodály: the pentatonic scale is universally the first melodic framework taught because it contains no dissonant intervals. You CAN'T play a wrong note. This level builds from 2-note melodies to free pentatonic improvisation, with backing tracks as your band.",
  artists: "Khruangbin, Allah-Las, Tinariwen, BALTHVS",
  unlocks: "Creating Your First Songs & Genre Craft (Level 8)",
  review: { label: "Level 6-7 Check-In", time: 5, exercises: ["ss-6-3", "ss-7-6"], prompt: "Create a chord-tone melody over Am-C-G-Em (ss-6-3). Then do 2 minutes of one-note rhythm improv (ss-7-6). Both flowing? Move on." },
  exercises: [
    {
      id: "ss-7-1",
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
      id: "ss-7-2",
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
      id: "ss-7-3",
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
      id: "ss-7-4",
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
      id: "ss-7-5",
      time: 8,
      title: "Pentatonic Improv",
      type: "vocal",
      what: "Free improvisation over a backing track using only pentatonic notes. No plan, no target. Sing whatever your ear suggests for 4 minutes straight. This is Kratus Level 3: product-oriented improvisation — you're making music that sounds like music, not just exploring.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
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
      id: "ss-7-6",
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
      id: "ss-7-7",
      time: 7,
      title: "Target Note Landing",
      type: "vocal",
      what: "Sing freely over Am but LAND on a specific target note on beat 1 of each new bar. Approach from above, below, or by step. The target note changes each bar: A, then C, then E, then G. This teaches melodic intentionality — singing TOWARD something instead of wandering.",
      setup: "Guitar strumming Am. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Bar 1 target: A. Sing any pentatonic notes you want during the bar, but LAND on A right on beat 1. Feel the gravity pulling your melody toward the target.", why: "Target-note singing builds intentionality. Instead of wandering through the scale, every phrase has a destination. This is how melodic storytelling works." },
        { text: "Bar 2 target: C. Approach it from below (A stepping up to C) or from above (D dropping to C). Notice how the approach direction changes the emotional flavor of the landing.", why: "Approaching from below creates lift and arrival. Approaching from above creates settling and resolution. Both are essential melodic tools." },
        { text: "Bar 3 target: E. Bar 4 target: G. Keep the cycle going — A, C, E, G — landing each target on beat 1. Let the notes between targets be free and intuitive.", why: "The four targets outline an Am7 chord (A-C-E-G). Your melodies are now chord-aware without needing to think about theory. The targets do the work." },
        { text: "Speed up the cycle: change targets every 2 beats instead of every bar. A on beat 1, C on beat 3, E on beat 1, G on beat 3. The space between targets shrinks, demanding quicker melodic decisions.", why: "Faster target changes sharpen your melodic reflexes. This is the same skill jazz improvisers use over chord changes — landing chord tones on strong beats." },
        { text: "Record a 2-minute pass. Listen back and notice which approaches sound best to your ear — stepwise, leaps, from above, from below. These are your melodic instincts revealing themselves.", why: "Self-review builds critical listening. The approaches you gravitate toward naturally become your melodic signature — the thing that makes your melodies sound like YOU." }
      ],
      feel: "Target-note landing should feel like a guided conversation — you have freedom to say anything, but each sentence must end on a specific word. The constraint creates direction without killing creativity.",
      wrong: "If you're just singing the target notes with nothing in between, you're skipping the melody. The notes BETWEEN targets are where the music lives. Targets are destinations, not the whole journey.",
      sarah: "Gene, this is how Tinariwen's guitarists improvise — free-flowing lines that always land on the root or fifth at key moments. It sounds effortless because the targets are internalized. That's what we're building here.",
      referencePitches: getPitchRange("A3", "G4"),
      pitchContour: true,
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-7-8",
      time: 7,
      title: "Pentatonic in New Keys",
      type: "vocal",
      what: "Sing Am pentatonic (A-C-D-E-G), then Em pentatonic (E-G-A-B-D), then G major pentatonic (G-A-B-D-E). Same scale shape, new locations. This breaks the 'only Am' habit and proves the pentatonic is a portable tool, not a fixed position.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Sing Am pentatonic ascending and descending: A-C-D-E-G-E-D-C-A. This is home base — your most familiar territory. Strum Am underneath.", why: "Starting in Am grounds you in the known. You need a reference point before moving to new keys. Confidence here is the launchpad." },
        { text: "Switch to Em pentatonic: E-G-A-B-D. Strum Em underneath. Sing ascending and descending. Notice: three of these notes overlap with Am pentatonic (E, G, A). Only B and D are new territory.", why: "Overlapping notes between keys reveal how pentatonic scales connect. This is how guitarists move between positions — shared notes are bridges." },
        { text: "Now G major pentatonic: G-A-B-D-E. Strum G underneath. This is the brightest of the three — a major pentatonic sounds sunny and open compared to the minor pentatonics.", why: "Major vs. minor pentatonic is a massive emotional shift. Same 5-note concept, completely different mood. Hearing this contrast deepens your melodic palette." },
        { text: "Improvise 1 minute in each key: Am pentatonic over Am, Em pentatonic over Em, G major pentatonic over G. Feel how the same scale framework creates different vibes in different keys.", why: "Improvising in multiple keys proves the pentatonic is a transferable skill. You're not memorizing patterns — you're internalizing a melodic system that works anywhere." },
        { text: "Chain all three: 4 bars in Am → 4 bars in Em → 4 bars in G → 4 bars in Am. Record the full cycle. You just sang through a chord progression using key-appropriate pentatonics.", why: "Chaining pentatonics across a progression is how singers navigate songs with multiple sections. Each key shift demands a new melodic center — and you just did it." }
      ],
      feel: "Moving between keys should feel like visiting neighboring towns — familiar enough to navigate, different enough to notice. The pentatonic is your passport; it works everywhere.",
      wrong: "If Em pentatonic feels impossible after Am, slow down. Sing E-G-A-B-D as a pure scale 10 times before improvising. The jump between keys gets easier with each repetition.",
      sarah: "Gene, Allah-Las shift between minor and major pentatonic constantly — that shimmery quality in their melodies comes from this exact skill. You're learning to hear the same way they do.",
      fretboard: { scale: "em-pentatonic", position: 1 },
      referencePitches: getPitchRange("E3", "B4"),
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-7-9",
      time: 8,
      title: "Melodic Motif Development",
      type: "song",
      what: "Take a 4-note motif. Develop it through: sequence (same shape, different starting note), inversion (flip upside down), augmentation (double the note lengths), fragmentation (use only the first 2 notes). Classical development tools made accessible. 4 variations from one seed equals a complete melody section.",
      setup: "Guitar strumming Am. Backing track ready.",
      steps: [
        { text: "Create a simple 4-note motif using pentatonic notes. Example: A-C-D-E. Sing it 4 times to lock it in. This is your seed — everything grows from here.", why: "A strong motif is short, singable, and distinctive. Four notes is the sweet spot — enough to have shape, few enough to remember and manipulate." },
        { text: "Sequence: start the same shape on a different note. If your motif was A-C-D-E (up a 3rd, up a step, up a step), start on C: C-E-G-A. Same intervals, new pitch level. Sing both back to back.", why: "Sequence is the most common development tool in all music. It creates momentum — the ear recognizes the pattern and anticipates where it's going." },
        { text: "Inversion: flip the motif upside down. If A-C-D-E goes up-up-up, the inversion goes down-down-down from E: E-D-C-A. Sing the original, then the inversion.", why: "Inversion creates a mirror image. It sounds related but emotionally different — rising hope becomes settling calm. Composers from Bach to Radiohead use this." },
        { text: "Augmentation: double every note length. If the motif was quarter notes, sing it in half notes. Same pitches, twice as slow. Then try fragmentation: sing ONLY the first 2 notes (A-C) as a repeating cell.", why: "Augmentation creates gravity and weight. Fragmentation distills the motif to its essence. Both tools let you stretch or compress your musical idea." },
        { text: "Chain all 4 variations over the Cinematic Western track: original (2 bars) → sequence (2 bars) → inversion (2 bars) → augmentation (2 bars) → fragmentation (2 bars). Record the full development.", why: "Ten bars of melody from one 4-note idea. This is how composers build entire sections — not by inventing new material, but by developing what they have." }
      ],
      feel: "Motif development should feel like sculpting — you start with a raw shape and carve different angles from it. Each variation reveals something new about the original idea.",
      wrong: "If your variations sound completely unrelated to the original, you've changed too many elements at once. Keep the development gradual — change one thing at a time so the ear can follow the connection.",
      sarah: "Gene, Tommy Guerrero's instrumental tracks are masterclasses in motif development. One guitar phrase, evolved through subtle variations across a whole song. That's exactly what you're learning here.",
      recorder: true,
      metronome: 80,
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      referencePitches: getPitchRange("A3", "G4")
    },
    {
      id: "ss-7-10",
      time: 6,
      title: "Singing Intervals by Feel",
      type: "vocal",
      what: "Each melodic jump has an emotional color. Minor 3rd (A to C) is bluesy ache. Perfect 4th (A to D) is hopeful lift. Perfect 5th (A to E) is heroic openness. Minor 7th (A to G) is tension and longing. Sing each interval over a drone, name the feeling, then paint freely choosing intervals by emotion.",
      setup: "Drone on A. No metronome for this one — let it be free.",
      steps: [
        { text: "Drone on A. Sing A, then jump to C (minor 3rd). Hold both notes long enough to feel the color. The minor 3rd is the soul interval — bluesy, wistful, bittersweet. Sing A→C five times.", why: "The minor 3rd is the signature interval of blues, soul, and most of the music you love. Feeling it as an emotion (not a theory concept) is how singers internalize intervals." },
        { text: "Sing A→D (perfect 4th). This is the 'here comes the sun' interval — open, hopeful, lifting. Then A→E (perfect 5th): heroic, wide, like a desert horizon. Feel the difference between the 4th's hope and the 5th's openness.", why: "Perfect intervals (4th and 5th) are the backbone of melody. The 4th lifts gently; the 5th opens wide. Knowing them by feel lets you choose them deliberately when composing." },
        { text: "Sing A→G (minor 7th). This is the tension interval — longing, unresolved, pulling toward something. It's the sound of 'not home yet.' Hold it and feel the pull back down to A.", why: "The minor 7th creates the strongest melodic tension in the pentatonic. It's the note that makes you want resolution. BALTHVS and Skinshape use this interval to create their dreamlike unresolved quality." },
        { text: "Now paint freely: sing over the drone, choosing intervals by emotion. Want ache? Jump a minor 3rd. Want lift? Perfect 4th. Want vastness? Perfect 5th. Want longing? Minor 7th. Let feeling guide your note choices.", why: "Choosing intervals by emotion is the bridge between theory and expression. You're not calculating — you're feeling your way through the scale. This is how mature melodists work." }
      ],
      feel: "This exercise should feel like learning emotional vocabulary — each interval is a word with a specific meaning. When you can 'say' what you feel with intervals, your melodies become genuinely expressive.",
      wrong: "If all intervals sound the same to you, slow down. Sing each one 10 times with eyes closed. The emotional colors emerge with repetition — they're subtle but real.",
      sarah: "Gene, this is the secret behind your favorite singers. They're not choosing notes randomly — they're choosing feelings. That ache in a Skinshape melody? Minor 3rds. That openness in Khruangbin? Perfect 5ths. Now you know why.",
      drone: { root: "A", octave: 2, texture: "pure" },
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Intervals from A", range: ["A3", "G4"] },
      referencePitches: getPitchRange("A3", "G4"),
      recorder: true
    },
    {
      id: "ss-7-11",
      time: 6,
      title: "Space as Melody",
      type: "vocal",
      what: "Create a melody where at least 50% of the bars are SILENCE. Sing 2 bars, rest 2 bars. Or sing 1 bar, rest 3. The silence IS part of the melody — it creates anticipation. Khruangbin's vocal approach: what you DON'T sing matters as much as what you do.",
      setup: "Backing track. No guitar strumming — let the track carry the groove.",
      steps: [
        { text: "Play the Khruangbin track. For the first 8 bars, sing only on bars 1 and 5. Bars 2-4 and 6-8 are silence. Feel how the silence creates anticipation for the next phrase.", why: "Forced silence trains you to resist the urge to fill every moment. Most beginner singers over-sing. Space is the cure — and the silence makes your phrases land harder." },
        { text: "Now try 1 bar singing, 3 bars silence. You get ONE bar to make a statement, then 3 bars to let it breathe. Make every phrase count — you have very few of them.", why: "Extreme constraint forces economy. When you only get 25% of the time, every note must earn its place. This is the DOPE LEMON approach — sparse, deliberate, unhurried." },
        { text: "Flip the ratio: 3 bars singing, 1 bar silence. Notice how even one bar of silence changes the energy. That single gap creates a breath, a reset, a moment of anticipation.", why: "Even minimal silence transforms a melody. One bar of rest per phrase gives the listener time to absorb what they heard. It's punctuation — a period at the end of a sentence." },
        { text: "Free form: improvise a 16-bar melody where you choose when to sing and when to rest. The only rule is at least 8 bars must be silence. Record it and listen back — does the silence feel intentional or accidental?", why: "Intentional silence sounds confident. Accidental silence sounds lost. The difference is whether you OWN the silence as part of your melody. That ownership is what we're building." }
      ],
      feel: "Space-as-melody should feel like a conversation with long, comfortable pauses — not awkward silence, but the silence of someone who knows their next words will matter. Confident, unhurried, powerful.",
      wrong: "If you keep filling the silent bars with humming or 'uh,' you're resisting the exercise. True silence. Nothing. Let the backing track exist alone. Your re-entry after silence will feel twice as powerful.",
      sarah: "Gene, Khruangbin's Laura Lee sings fewer notes per song than almost any vocalist in modern music — and every note hits like a truck. That's the power of space. Less is more isn't a cliche; it's a technique.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true,
      referencePitches: getPitchRange("A3", "G4")
    },
    {
      id: "ss-7-12",
      time: 8,
      title: "Two-Melody Contrast",
      type: "song",
      what: "Create TWO contrasting melodies over the same progression. Melody A (verse): low range (E3-B3), stepwise motion, narrow contour. Melody B (chorus): higher range (C4-G4), wider intervals, arch contour. Play them back-to-back. The contrast between them IS the song structure.",
      setup: "Guitar strumming Am-C-G-Em. Metronome at 80 BPM.",
      steps: [
        { text: "Create Melody A (verse): stay in E3-B3 range. Use stepwise motion — move only to the neighboring scale note. Keep the contour narrow, like a quiet conversation. Sing it for 4 bars over Am-C-G-Em.", why: "Low range + stepwise motion + narrow contour = intimacy. This is the verse texture — close, personal, drawing the listener in. Your porch register lives here." },
        { text: "Create Melody B (chorus): jump up to C4-G4 range. Use wider intervals — skip notes, leap a 4th or 5th. Let the contour arch upward. Sing it for 4 bars over the same Am-C-G-Em.", why: "Higher range + wider intervals + arch contour = release and energy. The contrast with Melody A creates the emotional lift that defines a chorus. Same chords, completely different feeling." },
        { text: "Sing Melody A (4 bars) then immediately Melody B (4 bars). Feel the shift. Does the chorus feel like it arrives? Does the verse feel like it sets up the chorus? Adjust until the contrast is obvious.", why: "The verse-to-chorus transition is the most important moment in a pop song. If the contrast is clear, the structure works. If it's subtle, push it further — bigger range shift, wider intervals, more energy." },
        { text: "Add dynamics: sing Melody A at 60% volume, Melody B at 90% volume. Volume contrast amplifies the melodic contrast. Record the full structure: A-A-B-A (verse-verse-chorus-verse).", why: "Dynamic contrast is the simplest way to differentiate sections. Quiet verse, loud chorus — it's the Pixies formula, the Nirvana formula, and it works because human ears crave contrast." },
        { text: "Listen back to your recording. Can you hear two distinct melodies? Does the chorus feel like a release after the verse? If yes, you've just written a verse-chorus structure from scratch.", why: "Self-assessment builds critical ears. If you can hear the contrast clearly on playback, a listener will feel it even more strongly. You've internalized the fundamental unit of song structure." }
      ],
      feel: "Two-melody contrast should feel like two characters in a conversation — the verse whispers, the chorus declares. When the shift between them feels inevitable and satisfying, you've found the sweet spot.",
      wrong: "If both melodies sound the same, you haven't pushed the contrast hard enough. Try this: sing the verse melody, then sing the chorus an octave higher than feels comfortable. Now back off slightly. That's your chorus range.",
      sarah: "Gene, every song you love does this. BALTHVS verses murmur in the low register; choruses bloom upward. Skinshape stays low and intimate, then the chorus melody opens like a window. You're learning the architecture of songs.",
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-7-13",
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
      levelUp: "Can freely improvise pentatonic melodies over backing tracks, land on target notes intentionally, sing pentatonic in multiple keys, develop motifs through sequence/inversion/fragmentation, feel intervals as emotional colors, use silence as a melodic element, create contrasting verse/chorus melodies, and use call-and-response between voice and guitar."
    }
  ]
};
