import { getPitchRange } from "../appData.js";

export const level8 = {
  level: 8,
  title: "Melody Building",
  subtitle: "Five notes. Infinite melodies. Zero wrong answers.",
  description:
    "The pentatonic scale is your 'safe space' — five notes that sound good over any chord in the key. Based on Orff Schulwerk and Kodály: the pentatonic scale is universally the first melodic framework taught because it contains no dissonant intervals. You CAN'T play a wrong note. This level builds from 2-note melodies to free pentatonic improvisation, with backing tracks as your band. Here, the hear-feel-choose cycle powers CREATION: when you compose a melody, the cycle runs in reverse — you CHOOSE an emotion first, FEEL where it lives in your body, HEAR the note that matches, then PRODUCE it. Creation is the cycle running backwards. And when you draw melodic contours — rising, falling, arching — notice that melodic contours have body-contours: rising melodies climb through the body from chest to mask, falling melodies descend. The melody moves; your body moves with it.",
  artists: "Khruangbin, Allah-Las, Tinariwen, BALTHVS",
  unlocks: "Creating Your First Songs (Level 9)",
  review: { label: "Level 7 Check-In", time: 5, exercises: ["ss-7-3", "ss-8-6"], prompt: "Create a chord-tone melody over Am-C-G-Em (ss-7-3). Then do 2 minutes of one-note rhythm improv (ss-8-6). Both flowing? Move on." },
  exercises: [
    {
      id: "ss-8-1",
      time: 6,
      title: "Pentatonic Playground",
      type: "vocal",
      what: "Sing the Am pentatonic scale (A-C-D-E-G) over an Am chord. Just these 5 notes — explore them freely. Go up, go down, skip around. Every combination sounds good. This is your melodic safe space.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Before you begin: what ONE thing will you listen for that would tell you this is working? Maybe: 'I want to feel the vibration shift with each note.' Set that target. Then strum Am. Sing the scale ascending: A... C... D... E... G. As each note rises, feel the vibration climb through your body — A settles deep in the chest, C lifts to upper chest with a minor-third ache, D bridges toward the throat, E opens into clarity, G floats toward the mask. Five notes, five body stations.", why: "The ascending pentatonic scale maps your melodic territory AND your body landscape. Each note has a resonance address. Building both maps simultaneously makes the scale physical, not abstract (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Descend: G... E... D... C... A. Feel the vibration pour back down through each station — mask to throat to chest. Then try the full arc: A-C-D-E-G-E-D-C-A. The body rises and falls with the melody, a wave of resonance traveling through your torso.", why: "Going up and down the scale is also going up and down through the body. The vibration-rising body map (chest for low notes → mask for high) mirrors the pitch contour. Your body IS the melodic contour (Nummenmaa 2024: body maps of resonance are cross-culturally universal)." },
        { text: "Now skip around: A-D-E-C-G-A. Random order — each skip teleports the vibration between body stations. A (chest) → D (throat) → E (open) → C (upper chest ache) → G (mask). Every combination works AND every body journey works. There are no wrong notes in the pentatonic.", why: "Random exploration creates unexpected body journeys alongside unexpected melodic shapes. The somatic surprise of jumping between distant body stations is part of what makes improvisation feel creative and alive." },
        { text: "Close your eyes. Before each note, hear it forming inside and feel which body station it wants to land in. Then let your voice follow the body's lead. 2 minutes of free exploration. Don't plan — let the hear-feel-choose cycle guide you.", why: "Eyes-closed exploration with the embodiment cycle running means you're composing from the body outward. The cycle runs in reverse for creation: CHOOSE an emotion → FEEL where it lives → HEAR the note that matches → PRODUCE it. This is how composition begins — from body sensation to sound (Aarhus 2021)." }
      ],
      feel: "The pentatonic should feel like a playground with no walls. Every note resonates with the Am chord. Nothing clashes. This freedom is the foundation of melodic improvisation.",
      wrong: "If a note sounds 'wrong,' you've probably landed outside the pentatonic (on B or F). Come back to A-C-D-E-G. Within those 5 notes, nothing can go wrong. If any of this feels awkward, that's the creative zone — not a sign you can't do this.",
      sarah: "Gene, the pentatonic scale is used by every culture on Earth. It's the melodic equivalent of a major chord — universally consonant. Tinariwen, Khruangbin, and the Allah-Las all live in this scale. You're not learning to be a songwriter — you already ARE one. This is just building your palette.",
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
        { text: "Strum Am for 2 beats, then stop and sing a 2-beat pentatonic phrase. Before you sing, hear the phrase forming inside — feel which body station it wants to start from. Strum 2 beats, sing 2 beats. Alternate.", why: "The 2-beat alternation is the simplest call-and-response format. Each part has equal time — guitar and voice trade like conversation partners. Pre-hearing even a short phrase keeps the audiation channel open." },
        { text: "Now play a guitar riff (a pentatonic phrase on the fretboard) for 2 beats, then echo it with your voice for 2 beats. As the guitar phrase lands, feel where its final note lives in your body — then let your voice answer from that same resonance address.", why: "Echoing the guitar with your voice trains pitch matching and audiation. Your ear translates the guitar's melody into vocal output. The body-location check adds a physical targeting system for accuracy." },
        { text: "Flip it: hear a phrase forming inside — feel the vibration gathering before any sound — then sing it. Play it on guitar to verify. Voice leads, guitar follows. This is harder — your voice must lead with confidence, guided by inner hearing and body sensation.", why: "When the voice leads, you're composing in real-time. The guitar validates what you sang. This builds confidence in your melodic instincts. Audiating before producing means the voice follows the inner ear, not habit." },
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
        { text: "Two notes only: A and C. Hear the rhythm and shape of the melody forming inside — feel A gathering in the chest, C rising to the upper chest with its minor-third ache. When the contour is vivid in both ear and body, let your voice trace it. Create the most interesting 4-bar melody you can using ONLY these two notes. Vary rhythm and duration.", why: "Two notes forces maximum rhythmic creativity. 'Amazing Grace' opens with just two notes. Pre-hearing the contour before singing means you're composing internally, then executing — CLA research (Gray 2018) shows that constraining output forces the auditory-cognitive system to lead. Constraints breed invention." },
        { text: "Three notes: A, C, D. One more note opens up new melodic possibilities — D bridges between C's ache and E's openness, sitting in the throat. Create a different 4-bar melody. Feel how D expands the body territory available to you.", why: "Adding one note at a time lets you feel how each note expands your palette. D adds a major 2nd interval from C — a step that pulls upward." },
        { text: "Four notes: A, C, D, E. Create another 4-bar melody. With E added, the resonance can float from chest all the way to the upper-chest openness — a wider body journey.", why: "Four notes approaches the freedom of the full pentatonic. The E adds a perfect 5th from A — the strongest consonance." },
        { text: "All five: A, C, D, E, G. Full pentatonic. Hear the full 4-bar shape forming inside — feel the body journey the contour will take, from chest through throat to mask. When both pitch and body-path are vivid, let your voice trace it. Then go back to your 2-note melody. Which do you prefer? Both are valid.", why: "Sometimes the 2-note melody is more memorable than the 5-note one. More notes ≠ better music. Pre-hearing the melody's contour before singing it means the ear chose the shape, not habit. New melodic intervals consolidate during sleep — practice today, test tomorrow, and you'll find the constraint melodies feel more natural after a night's rest." }
      ],
      feel: "Each constraint level should feel like a puzzle — how much music can you make with this few notes? The satisfaction comes from creating something beautiful within tight limits. Notice: with fewer notes available, the embodiment cycle has more room to operate on each one. With only A and C, you can feel exactly where each note lives — A in the deep chest, C slightly higher with a minor-third ache. The constraint focuses your body awareness, which is why constraint melodies often feel MORE expressive than free-range singing (CLA Gray 2018).",
      wrong: "If you accidentally use notes outside the constraint, start over. The discipline IS the exercise. Staying within limits is what forces creativity.",
      sarah: "Gene, Tom Waits wrote whole songs on 3 notes. Jack Johnson's melodies rarely use more than 5. Constraint is the friend of creativity, not the enemy. Here's a powerful experiment: sing the same 4-note pentatonic melody four different ways. (1) Crisp articulation, full vibrato — operatic. (2) Lazy articulation, breathy, consonants swallowed — Angus Stone's drawl where 'sitting' becomes 'si-in.' (3) Rhythmic precision, nasal focus, each syllable a rhythmic event — reggae. (4) Minimal vibrato, soft volume, voice behind reverb — surf-psych float. Same notes, four completely different songs. Vocal delivery IS genre.",
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
        { text: "Create a simple 4-beat pentatonic phrase. As you sing it, notice the body journey — which resonance stations does it travel through? Sing it 3 times to memorize both the pitch shape and the physical gesture. This is your 'seed' phrase.", why: "The seed phrase is the DNA of a melody. Variations grow from it like branches from a trunk." },
        { text: "Variation 1: same notes, different rhythm. If the original was 'long-short-short-long,' try 'short-short-long-long.' Notice how dwelling longer on each note lets the resonance settle more deeply into its body station.", why: "Rhythmic variation changes the feel without changing the melody's pitch identity. It's the easiest type of variation." },
        { text: "Variation 2: same rhythm, shift all notes up by one scale step. A→C, C→D, D→E, E→G. The contour stays the same; the pitch level shifts — and the whole body journey lifts one station higher.", why: "Sequence (the same pattern at a different pitch level) is the most common compositional tool in all music. Mozart, Beatles, Khruangbin — everyone uses it." },
        { text: "Variation 3: reverse the phrase — sing the notes backward. Feel the body journey reverse too — what once climbed now descends. Variation 4: change one note and feel how a single new body address alters the gesture. Variation 5: combine two previous variations.", why: "Each variation technique gives you a compositional tool. With just these 5 techniques, you can generate infinite melody from a single seed." },
        { text: "Record your original phrase + all 5 variations back to back. You just created a full melodic development section.", why: "Melodic development IS songwriting. Verses are variations on a theme. You've done the core creative act." }
      ],
      feel: "Variation should feel like looking at the same landscape from different angles — recognizable but fresh each time. The seed phrase is always there underneath.",
      wrong: "If your variations are so different they don't sound related to the original, you've changed too much. Keep at least one element constant (rhythm OR notes) so the family resemblance holds. End-of-exercise retrieval: set down the guitar for 60 seconds, close your eyes, then sing your seed phrase and one variation from memory. What you remember IS what you've internalized.",
      sarah: "Gene, melodic variation is the secret weapon of your favorite artists. Khruangbin's melodies evolve through subtle variations — same shape, slightly different details. Try your variations over the descending minor progression Am-G-F-E — THE core psych-surf progression from the Ventures to Allah-Las. Here's why it works: the E at the end is borrowed from A harmonic minor — it's the V chord, not the natural minor v. That major E chord contains a G# that creates intense tension pulling you back to Am. That tension-resolution IS the surf sound. Your melody wants to resolve back to A every time the E chord hits, and that gravitational pull gives your variations a harmonic context that makes them sound like real music, not exercises.",
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
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Play the Khruangbin backing track. Strum Am lightly or just listen. Close your eyes. Let your attention settle into the chest rather than the head. Start singing pentatonic notes — whatever the body reaches for. Don't think, just feel where each note wants to live and let it emerge.", why: "Removing thought engages the default mode network — the brain region associated with creativity and flow. Thinking disrupts improvisation. Attention in the body keeps the somatic channel open even when the analytical mind is offline." },
        { text: "If you get stuck on one note, jump to the opposite end of the scale. If you're on A (deep chest), leap to G (mask) — feel the vibration vault across the body. Big jumps create energy and physical surprise.", why: "Intervallic leaps break melodic ruts. They inject surprise into the improvisation and open new melodic territory." },
        { text: "Use silence. Don't fill every beat. Sing a phrase, then leave 2-4 beats of silence before the next phrase. Let the music breathe.", why: "Silence is the most powerful tool in improvisation. It creates tension, allows the listener to process, and makes the next phrase more impactful." },
        { text: "Record the full 4 minutes. Listen back. Mark any phrases that surprised you or made you feel something. Those are your keepers.", why: "Improv sessions are gold mining. 90% is exploration. 10% is discovery. The discoveries become the seeds of songs." }
      ],
      feel: "Free pentatonic improv should feel like surfing — riding the wave of the backing track, making intuitive decisions, sometimes wiping out and paddling back. The flow state lives here. This is reverse prediction — your emotional intention predicts the note, and your model fills in the pitch, the body location, the timing. When the hear-feel-choose cycle is running beneath the surface, each note feels chosen even though you didn't consciously choose it — your body reaches for the right resonance position, your ear confirms it, and the note emerges. That's the cycle running automatically. That's flow. You'll know it's happening when you stop thinking about notes and start thinking about feelings.",
      wrong: "If you're planning phrases before singing them, you're composing, not improvising. Let go of control. Sing the 'wrong' note sometimes — a wrong note is just a prediction error, and prediction errors are how your model discovers new territory. The more precisely you notice WHAT was unexpected, the more your model learns from it.",
      sarah: "Gene, this is the exercise that unlocks improvisational freedom. Everything before this was scaffolding. Now you're flying. The pentatonic is your safety net — you cannot fall. One thing to try: let your vocal phrases land BEHIND the beat. Not late — intentionally, slightly after the click. Your favorite artists all play behind the beat — DOPE LEMON, Khruangbin, every reggae artist in your rotation. When you sing behind the beat, your voice arrives AFTER the metronome click, not on it. Mark Speer's guitar arrives after the drum, and Laura Lee's bass sits slightly behind too. That 'lazy precision' IS the golden hour sound. This is the feel of the music you love — not sloppy, not late, but deliberately, beautifully behind.",
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
        { text: "Rising line: sing A-C-D-E-G over 4 bars. Feel the vibration climb through your body — chest (A) to upper chest (C) to throat (D) to openness (E) to mask (G). The melodic ascent IS a body ascent. Each note lifts the resonance to a higher station.", why: "Rising melodies create physical anticipation — the vibration climbing through the body mirrors the emotional build. Nummenmaa 2024 found these upward-migration patterns are cross-culturally universal. Your body experiences 'rising hope' as literal rising resonance." },
        { text: "Falling line: sing G-E-D-C-A over 4 bars. Feel the resonance pour downward — mask to throat to chest. The vibration settles, deepens, returns to the sternum. Gentle descent creates physical resolution, like exhaling after holding your breath.", why: "Falling melodies resolve and comfort. The body experiences 'settling' as the vibration descending back to the chest. This is why chorus endings and outros feel like homecoming — the resonance literally comes home to the deepest body address." },
        { text: "Arch: start low, rise to the peak (G), then descend. A-C-D-E-G-E-D-C-A. Feel the body wave — resonance lifts through every station, crests at the mask, then pours back down. The arch mirrors a breath: inhale (rising), peak (full), exhale (falling).", why: "The arch is the most common melody contour because it mirrors the body's most fundamental cycle — the breath. Rising resonance = building energy. Peak = full body engagement. Descent = release. Your body was already singing arches before you knew what they were." },
        { text: "Valley: start high, dip low, rise back. G-E-D-C-A-C-D-E-G. The body dips — resonance descends from mask to chest (into the emotional depths), then climbs back out. A valley contour feels like diving into feeling and surfacing.", why: "Valley contours create a somatic sense of depth and return. The resonance descends into the chest's most intimate registers, then rises back. Bridge sections use this shape because the emotional dip creates contrast with the surrounding sections (Aarhus 2021)." },
        { text: "Create a 16-bar melody using all four shapes: rising (4 bars) → arch (4 bars) → valley (4 bars) → falling (4 bars). Record it.", why: "Sequencing contour shapes creates a complete melodic journey. This 16-bar piece has direction, variety, and resolution." }
      ],
      feel: "Each contour should feel like drawing with your voice — tracing a shape in the air. Notice: melodic contours have body-contours. A rising line climbs through your body — from chest resonance to throat to mask. A falling line descends, settling the vibration back down. An arch feels like a wave: the resonance lifts, crests, and returns. When you feel the body-contour before you sing the melodic contour, your audiation includes the physical sensation — and Zamorano (2025) showed that body awareness predicts pitch accuracy (R²=0.41). Feel the shape in your body, then trace it with your voice.",
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
      time: 7,
      title: "Target Note Landing",
      type: "vocal",
      what: "Sing freely over Am but LAND on a specific target note on beat 1 of each new bar. Approach from above, below, or by step. The target note changes each bar: A, then C, then E, then G. This teaches melodic intentionality — singing TOWARD something instead of wandering.",
      setup: "Guitar strumming Am. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Bar 1 target: A. Sing any pentatonic notes you want during the bar, but LAND on A right on beat 1 — feel the vibration arrive home in the deep chest. Feel the gravity pulling your melody toward the target's body address.", why: "Target-note singing builds intentionality. Instead of wandering through the scale, every phrase has a destination. This is how melodic storytelling works." },
        { text: "Bar 2 target: C. Before landing, hear C forming in the upper chest — feel its minor-third ache gathering. Approach it from below (A stepping up) or from above (D dropping down). Notice how the approach direction changes both the emotional flavor and the body-path of the landing.", why: "Approaching from below creates lift and arrival. Approaching from above creates settling and resolution. Both are essential melodic tools." },
        { text: "Bar 3 target: E — feel the openness arrive as you land. Bar 4 target: G — the resonance floats toward the mask. Keep the cycle going — A, C, E, G — landing each target on beat 1 and feeling its body address confirm the arrival. Let the notes between targets be free and intuitive.", why: "The four targets outline an Am7 chord (A-C-E-G). Your melodies are now chord-aware without needing to think about theory. The targets do the work." },
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
      id: "ss-8-8",
      time: 7,
      title: "Pentatonic in New Keys",
      type: "vocal",
      what: "Sing Am pentatonic (A-C-D-E-G), then Em pentatonic (E-G-A-B-D), then G major pentatonic (G-A-B-D-E). Same scale shape, new locations. This breaks the 'only Am' habit and proves the pentatonic is a portable tool, not a fixed position.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Sing Am pentatonic ascending and descending: A-C-D-E-G-E-D-C-A. Feel the familiar body landscape — chest rising through throat to mask and back. This is home base. Strum Am underneath.", why: "Starting in Am grounds you in the known. You need a reference point before moving to new keys. Confidence here is the launchpad." },
        { text: "Switch to Em pentatonic: E-G-A-B-D. Strum Em underneath. Sing ascending and descending. Notice how the body map shifts — E sits in a different chest address than A, and B carries its characteristic throat-pull. Three notes overlap with Am pentatonic (E, G, A), but they feel different when E is home.", why: "Overlapping notes between keys reveal how pentatonic scales connect. This is how guitarists move between positions — shared notes are bridges." },
        { text: "Now G major pentatonic: G-A-B-D-E. Strum G underneath. Feel how the whole body landscape brightens — more forward, more open, the resonance sitting higher and warmer than the minor pentatonics.", why: "Major vs. minor pentatonic is a massive emotional shift. Same 5-note concept, completely different mood. Hearing this contrast deepens your melodic palette." },
        { text: "Improvise 1 minute in each key. In each key, hear the phrase forming inside and feel which body stations it wants to visit before your voice traces it. In unfamiliar keys, the body map is less automatic — lean into that uncertainty. Let the body explore new resonance addresses.", why: "Improvising in multiple keys proves the pentatonic is a transferable skill. Pre-hearing in unfamiliar keys forces your auditory system to lead instead of relying on muscle memory from Am. You're not memorizing patterns — you're internalizing a melodic system that works anywhere." },
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
      id: "ss-8-9",
      time: 8,
      title: "Melodic Motif Development",
      type: "song",
      what: "Take a 4-note motif. Develop it through: sequence (same shape, different starting note), inversion (flip upside down), augmentation (double the note lengths), fragmentation (use only the first 2 notes). Classical development tools made accessible. 4 variations from one seed equals a complete melody section.",
      setup: "Guitar strumming Am. Backing track ready.",
      steps: [
        { text: "Create a simple 4-note motif using pentatonic notes. Example: A-C-D-E. Sing it 4 times — feel the body gesture it traces: chest to ache to bridge to openness. Lock in both the pitch pattern and the physical signature. This is your seed — everything grows from here.", why: "A strong motif is short, singable, and distinctive. Four notes is the sweet spot — enough to have shape, few enough to remember and manipulate." },
        { text: "Sequence: start the same shape on a different note. If your motif was A-C-D-E, start on C: C-E-G-A. Same intervals, new pitch level — the whole body gesture shifts one station higher. Sing both back to back and feel the resonance landscape relocate.", why: "Sequence is the most common development tool in all music. It creates momentum — the ear recognizes the pattern and anticipates where it's going." },
        { text: "Inversion: flip the motif upside down. If A-C-D-E goes up-up-up, the inversion descends from E: E-D-C-A. Feel the body journey reverse — what once climbed from chest to openness now pours back from openness to grounded warmth. Sing the original, then the inversion.", why: "Inversion creates a mirror image. It sounds related but emotionally different — rising hope becomes settling calm. Composers from Bach to Radiohead use this." },
        { text: "Augmentation: double every note length. Same pitches, twice as slow — the resonance lingers at each body station, each address more vivid. Then try fragmentation: sing ONLY the first 2 notes (A-C) as a repeating cell, dwelling in the intimate body-space between chest and ache.", why: "Augmentation creates gravity and weight. Fragmentation distills the motif to its essence. Both tools let you stretch or compress your musical idea." },
        { text: "Chain all 4 variations over the Cinematic Western track: original (2 bars) → sequence (2 bars) → inversion (2 bars) → augmentation (2 bars) → fragmentation (2 bars). Record the full development.", why: "Ten bars of melody from one 4-note idea. This is how composers build entire sections — not by inventing new material, but by developing what they have." }
      ],
      feel: "Motif development should feel like sculpting — you start with a raw shape and carve different angles from it. Each variation reveals something new about the original idea. Notice how each transformation changes the body-contour too: a sequence shifts the resonance position up or down; an inversion reverses the body's direction; augmentation lets you linger in each resonance zone longer. The motif lives in your body as a physical gesture, and each variation reshapes that gesture.",
      wrong: "If your variations sound completely unrelated to the original, you've changed too many elements at once. Keep the development gradual — change one thing at a time so the ear can follow the connection.",
      sarah: "Gene, Tommy Guerrero's instrumental tracks are masterclasses in motif development. One guitar phrase, evolved through subtle variations across a whole song. That's exactly what you're learning here.",
      recorder: true,
      metronome: 80,
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      referencePitches: getPitchRange("A3", "G4")
    },
    {
      id: "ss-8-10",
      time: 6,
      title: "Singing Intervals by Feel",
      type: "vocal",
      what: "Each melodic jump has an emotional color. Minor 3rd (A to C) is bluesy ache. Perfect 4th (A to D) is hopeful lift. Perfect 5th (A to E) is heroic openness. Minor 7th (A to G) is tension and longing. Sing each interval over a drone, name the feeling, then paint freely choosing intervals by emotion.",
      setup: "Drone on A. No metronome for this one — let it be free.",
      steps: [
        { text: "Drone on A. Sing A — feel it settle deep behind the sternum, warm and grounded. Now jump to C (minor 3rd). Feel the vibration shift to the upper chest with a darkening, an ache that tightens slightly. Hold C and notice: the minor 3rd lives in a specific body address — higher and sadder than the root. The soul interval. Sing A→C five times, tracking the body journey each time.", why: "The minor 3rd is the signature interval of blues, soul, and most of the music you love. Each interval has a body-location shift AND an emotional color — feeling both simultaneously (pitch shift + body shift + emotion) creates a three-channel representation that makes the interval unforgettable (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Sing A→D (perfect 4th). Feel the vibration lift from deep chest to the throat — a hopeful, opening sensation. Then A→E (perfect 5th): the resonance leaps wider, from chest to upper throat, a vast openness like a desert horizon. The body tells you the difference: the 4th lifts gently (one body station), the 5th soars (two stations).", why: "Perfect intervals (4th and 5th) are the backbone of melody. The body-location shift is proportional to the interval size: the 4th moves one station up, the 5th moves two. This physical proportionality makes interval distances tangible, not abstract (Nummenmaa 2024: body maps of resonance are cross-culturally universal)." },
        { text: "Sing A→G (minor 7th). This is the widest leap — the vibration jumps from deep chest nearly to the mask, a vast physical distance. And the emotional quality is tension, longing, unresolved — your body feels the pull back down to A, a gravitational ache that wants to descend through all the body stations back to the sternum. Hold G and feel that pull.", why: "The minor 7th creates the strongest body-tension in the pentatonic. The physical distance from chest to near-mask means your vocal tract is in its most 'stretched' configuration — and the body registers this as tension that wants resolution. The somatic pull downward IS the harmonic desire to resolve." },
        { text: "Now paint freely: sing over the drone, choosing intervals by BODY SENSATION first. Want chest-ache? Jump a minor 3rd. Want throat-lift? Perfect 4th. Want whole-body openness? Perfect 5th. Want stretched tension? Minor 7th. The body knows the interval before the ear names it. Let the hear-feel-choose cycle run in reverse: choose the feeling, feel the body address, hear the note, produce it.", why: "Choosing intervals by body sensation is the embodied version of choosing by emotion. When you reach for 'chest-ache' instead of 'minor 3rd,' you're composing from the body outward — which is how the cycle works in reverse for creation. This is the foundation of embodied composition (Aarhus 2021: imagery + production = equal learning in one-third the time)." }
      ],
      feel: "This exercise should feel like learning emotional vocabulary — each interval is a word with a specific meaning, AND a specific body sensation. The minor 3rd aches in the chest. The perfect 5th opens the throat wide. The minor 7th creates a physical pull downward, a tension that wants resolution. When you can 'say' what you feel with intervals, you're running the embodiment cycle in reverse: choose the emotion, feel where it lives in the body, hear the interval that matches, produce it. This is how composition works — the body knows the melody before the voice sings it.",
      wrong: "If all intervals sound the same to you, slow down. Sing each one 10 times with eyes closed. The emotional colors emerge with repetition — they're subtle but real.",
      sarah: "Gene, this is the secret behind your favorite singers. They're not choosing notes randomly — they're choosing feelings. That ache in a Skinshape melody? Minor 3rds. That openness in Khruangbin? Perfect 5ths. Now you know why.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Intervals from A", range: ["A3", "G4"] },
      referencePitches: getPitchRange("A3", "G4"),
      recorder: true
    },
    {
      id: "ss-8-11",
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
      feel: "Space-as-melody should feel like a conversation with long, comfortable pauses — not awkward silence, but the silence of someone who knows their next words will matter. Confident, unhurried, powerful. During the silent bars, the hear-feel-choose cycle doesn't stop — it runs internally: your body is preparing the next phrase, feeling where it will land, choosing its emotional intention. The silence is pregnant with embodied music. Your re-entry after silence hits harder because the body has been rehearsing it.",
      wrong: "If you keep filling the silent bars with humming or 'uh,' you're resisting the exercise. True silence. Nothing. Let the backing track exist alone. Your re-entry after silence will feel twice as powerful.",
      sarah: "Gene, Khruangbin's Laura Lee sings fewer notes per song than almost any vocalist in modern music — and every note hits like a truck. That's the power of space. Less is more isn't a cliche; it's a technique.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true,
      referencePitches: getPitchRange("A3", "G4")
    },
    {
      id: "ss-8-12",
      time: 8,
      title: "Two-Melody Contrast",
      type: "song",
      what: "Create TWO contrasting melodies over the same progression. Melody A (verse): low range (E3-B3), stepwise motion, narrow contour. Melody B (chorus): higher range (C4-G4), wider intervals, arch contour. Play them back-to-back. The contrast between them IS the song structure.",
      setup: "Guitar strumming Am-C-G-Em. Metronome at 80 BPM.",
      steps: [
        { text: "Create Melody A (verse): stay in E3-B3 range. Feel the resonance settled deep in the chest — warm, intimate, close. Use stepwise motion, keep the contour narrow. Sing it for 4 bars over Am-C-G-Em.", why: "Low range + stepwise motion + narrow contour = intimacy. This is the verse texture — close, personal, drawing the listener in. Your porch register lives here." },
        { text: "Create Melody B (chorus): jump up to C4-G4 range. Feel the resonance lift toward the mask — the body opens, the breath deepens. Use wider intervals, let the contour arch upward. Sing it for 4 bars over the same Am-C-G-Em.", why: "Higher range + wider intervals + arch contour = release and energy. The contrast with Melody A creates the emotional lift that defines a chorus. Same chords, completely different feeling." },
        { text: "Sing Melody A (4 bars) then immediately Melody B (4 bars). Feel the whole-body shift — from settled chest to open mask, from shallow breath to deep. Does the chorus feel like it arrives? Does the body tell you when the chorus NEEDS to come? Adjust until the contrast is obvious.", why: "The verse-to-chorus transition is the most important moment in a pop song. If the contrast is clear, the structure works. If it's subtle, push it further — bigger range shift, wider intervals, more energy." },
        { text: "Add dynamics: sing Melody A at 60% volume, Melody B at 90% volume. Volume contrast amplifies the melodic contrast. Record the full structure: A-A-B-A (verse-verse-chorus-verse).", why: "Dynamic contrast is the simplest way to differentiate sections. Quiet verse, loud chorus — it's the Pixies formula, the Nirvana formula, and it works because human ears crave contrast." },
        { text: "Listen back to your recording. Can you hear two distinct melodies? Does the chorus feel like a release after the verse? If yes, you've just written a verse-chorus structure from scratch.", why: "Self-assessment builds critical ears. If you can hear the contrast clearly on playback, a listener will feel it even more strongly. You've internalized the fundamental unit of song structure." }
      ],
      feel: "Two-melody contrast should feel like two characters in a conversation — the verse whispers, the chorus declares. The contrast is physical: verse melody sits in chest resonance with shallow breath and intimate body posture; chorus melody lifts the resonance toward the mask, the breath deepens, the body opens. You should feel the transition as a whole-body shift — not just a range change but a posture change, a breath change, an emotional change. When the shift feels inevitable and satisfying, your body has learned the architecture of a song.",
      wrong: "If both melodies sound the same, you haven't pushed the contrast hard enough. Try this: sing the verse melody, then sing the chorus an octave higher than feels comfortable. Now back off slightly. That's your chorus range.",
      sarah: "Gene, every song you love does this. BALTHVS verses murmur in the low register; choruses bloom upward. Skinshape stays low and intimate, then the chorus melody opens like a window. You're learning the architecture of songs. Tap 'Draw new progression' below — the verse/chorus contrast isn't harmony-locked. Prove it on a minor descent, a rock minor, a cyclic minor. Your two-melody instinct should adapt to any harmonic terrain.",
      chordProgression: {
        key: "A",
        scale: "natural-minor",
        pool: ["minor_three", "minor_descent", "minor_cyclic", "rock_minor"],
      },
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-8-13",
      time: 10,
      title: "First Original Over Backing Track",
      type: "song",
      what: "Create a complete original melody over a backing track — verse melody (low, calm) and chorus melody (higher, more energy). Pentatonic notes only. No lyrics yet — just 'la' or 'ooh.' This is your first melody composed with full improvisational freedom.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play a backing track. Improvise freely for 2 minutes — let attention rest in the body. When a phrase catches you physically — a satisfying resonance, a vibration that feels right somewhere in your chest or throat — repeat it. The body knows the keeper before the mind does.", why: "Improvisation discovers the melody. Repetition claims it. The phrase you want to sing again is your melodic hook." },
        { text: "Settle on a verse phrase: something in the lower pentatonic range (A3-D4). Feel the resonance sitting warm and intimate in the chest. Sing it with an arch or valley contour. Repeat it for 4 bars.", why: "Verse melodies sit low and intimate. They tell the story. The low range matches your porch register." },
        { text: "Create a chorus phrase: something higher (D4-G4), resonance lifting toward the mask. More energy, wider body, deeper breath than the verse. Repeat for 4 bars.", why: "The chorus lifts above the verse. Even a 3rd higher creates obvious contrast. The energy shift IS the chorus." },
        { text: "Assemble: verse (4 bars) → verse (4 bars) → chorus (4 bars) → verse (4 bars). Sing through the whole thing twice. Record the second pass.", why: "AABA form with your original melodies over a backing track is a complete musical statement. This is composing." }
      ],
      feel: "This should feel like the previous exercises coming together — pentatonic freedom, contour awareness, rhythmic confidence. The backing track is your band. You're the singer.",
      wrong: "If the verse and chorus melodies sound identical, push the contrast. Sing the verse near-whispered, the chorus with conviction. Range + energy = contrast.",
      sarah: "Gene, you just composed a song melody from scratch. No reference, no cover, no imitation. Your ear, your instincts, your pentatonic vocabulary. This is the real thing.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "G4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── KEY DIVERSITY — PENTATONIC INTERLEAVING + NUMBERS ───

    {
      id: "ss-8-14",
      time: 8,
      title: "E Major Pentatonic Improv",
      type: "vocal",
      what: "Mirror your Am pentatonic improv skills in E major pentatonic: E-F#-Ab(G#)-B-C#. Same melodic principles — stepwise motion, leaps, target notes, motif development — but completely different notes. Over E-A-B7 backing tracks. This is where your pentatonic skills become truly portable.",
      setup: "Guitar. Strum E-A-B7.",
      tracks: [
        { name: "E Major Surf 120", src: "/e-major-surf-120.mp3" },
        { name: "E Major Reggae 85", src: "/e-major-reggae-85.mp3" }
      ],
      steps: [
        { text: "Sing E major pentatonic ascending and descending: E-F#-Ab-B-C#-B-Ab-F#-E. Against the E chord. Feel how this scale has a different shape from Am pentatonic — the intervals between notes are in different places.", why: "Am pentatonic: minor 3rd, whole step, whole step, minor 3rd, whole step. E major pentatonic: whole step, whole step, minor 3rd, whole step, minor 3rd. Same interval set, different order — different melodic feel." },
        { text: "Target note exercise: set Ab as your target. Improvise freely but land on Ab every 4 bars. Ab is the major 3rd of E — the note that makes E major MAJOR. Make it your anchor.", why: "Target-note practice in a new key transfers the skill from Level 8's Am exercises. The specific target (Ab) reinforces the E major identity." },
        { text: "Motif development in E major: create a 3-4 note motif using E major pentatonic. Sequence it (repeat starting from different notes). Invert it. Fragment it. Same tools, new notes.", why: "If you can develop motifs in E major using the same techniques you learned in Am, the techniques are truly internalized — not key-dependent." },
        { text: "Choose a backing track (surf or reggae). Improvise a verse melody (low register, E3-Ab3) and a chorus melody (higher, B3-C#4) using E major pentatonic. Record it.", why: "Verse/chorus contrast in E major proves your melodic architecture skills transfer across keys. The backing track provides genre context." }
      ],
      feel: "E major pentatonic should feel like Am pentatonic's brighter sibling — familiar shapes in an unfamiliar key. By the end, E major should feel like a second home, not a foreign country.",
      wrong: "If you keep defaulting to Am notes (G natural, C natural), you're not hearing the E major context. Slow down, sing each note of the E major pentatonic individually against the drone, and memorize the sound before improvising.",
      sarah: "Gene, every pentatonic lick that works in Am works in E major — just transposed. The melodic DNA is the same. Your Am improvisations were the training wheels; E major is riding on your own.",
      referencePitches: getPitchRange("E3", "C#4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-8-15",
      time: 7,
      title: "Intro to Numbers",
      type: "vocal",
      what: "The simplest version of the Nashville Number System: assign a number (1-7) to each chord based on its position in the key. Am-C-G-Em becomes 1-3-7-5 in Am. The SAME numbers in E major give you E-Ab-D-C#. Numbers let you move any song to any key instantly — it's the universal language of professional musicians.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em. Say the numbers out loud as you strum: 'one... three... seven... five.' Am is 1 (home), C is 3 (third chord in the key), G is 7, Em is 5. Don't think about why — just label them.", why: "Numbers abstract harmony away from specific keys. Once you think in numbers, you can play any song in any key by converting chord names to numbers and back." },
        { text: "Now play in Em: the same 1-3-7-5 gives you Em-G-D-Bm. Strum it and say the numbers. Same emotional shape, different key. If Bm is hard, substitute B7.", why: "Transposing by numbers is instant — no music theory required. The numbers carry the harmonic FUNCTION, which is the part that matters." },
        { text: "Try it in E major: 1-4-5 gives you E-A-B7 (the progression you've been playing). 1 is always home, 4 is always departure, 5 is always tension. Same feelings, any key.", why: "When you can feel that '5 chord' tension in multiple keys, you're hearing function, not just notes. This is the key to key-independent musicianship." },
        { text: "Pick any song you know. Write out the chords as numbers. Then play it in a different key using only the numbers. Record both versions.", why: "When transposition becomes a simple number lookup, every key is equally accessible. The mental barrier between keys dissolves." }
      ],
      feel: "Numbers should start replacing chord names in your head. When you think '4 chord,' you should feel 'departure' before your fingers even move.",
      wrong: "If the numbers feel arbitrary, focus on just 1, 4, and 5 — the most important functions. 1 = home, 4 = leaving home, 5 = wanting to come back. Build from there.",
      sarah: "Gene, this is the single tool that makes everything click. Nashville session musicians play songs they've never heard using just numbers. One skill, infinite keys.",
      referencePitches: getPitchRange("A3", "E4"),
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-8-16",
      time: 10,
      title: "Cross-Family Key Roulette",
      type: "vocal",
      what: "Maximum contextual interference. Randomize between four pentatonic keys: Am (no sharps), G major (no sharps, different center), E major (4 sharps), A major (3 sharps). One minute in each key, chosen randomly. The unpredictable key switches force your brain to build truly abstract, key-independent melodic skills.",
      setup: "Guitar. Use a dice app or flip a coin twice: HH=Am, HT=G, TH=E major, TT=A major.",
      tracks: [
        { name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" },
        { name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }
      ],
      steps: [
        { text: "Roll your randomizer. Whatever key comes up, immediately start strumming and improvising in that pentatonic for 60 seconds. No warm-up, no preparation. Record the whole session.", why: "The randomness is the entire point. Research shows that random interleaving produces the most durable learning — even though it feels harder than structured practice." },
        { text: "Roll again. Switch immediately to the new key. The transition should be as fast as you can manage — change guitar chord, find the new pentatonic root, start singing.", why: "Fast key switches build the neural pathways for key-independent musicianship. Each switch forces a full reconfiguration — new root, new scale, new vocal targets." },
        { text: "Continue for 8-10 rolls (8-10 minutes). Some keys will repeat — that's fine. The pattern is unpredictable, which is what matters.", why: "Over 10 rounds, you'll notice the unfamiliar keys (E and A major) getting easier while the familiar keys (Am, G) stay effortless. The gap closing IS the learning." },
        { text: "Listen back. Rate your fluency in each key from 1-5. The lowest-rated key is your next practice priority.", why: "Self-assessment after randomized practice reveals exactly where your key-independence has gaps. Targeted follow-up closes those gaps efficiently." }
      ],
      feel: "The first few switches should feel chaotic — that's desirable difficulty. By round 5 or 6, a rhythm emerges. By round 8, you're flowing between keys with growing confidence.",
      wrong: "If you panic at key switches and default to Am every time, slow down. Take 5 seconds between rounds to find the new root on guitar. Speed comes with practice.",
      sarah: "Gene, this is the most fun exercise in the curriculum — musical roulette. Each round is a tiny adventure. The chaos is productive. Your brain is building connections between keys that structured practice can't create.",
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true,
      levelUp: "Can freely improvise pentatonic melodies over backing tracks, land on target notes intentionally, sing pentatonic in multiple keys including E major and A major, develop motifs through sequence/inversion/fragmentation, feel intervals as emotional colors, use silence as a melodic element, create contrasting verse/chorus melodies, use call-and-response between voice and guitar, think in Nashville numbers for basic transposition, and navigate random key switches across four pentatonic families with growing fluency."
    },

    // ─── PHASE 5: ADVANCED CONTOUR, MOTIF & COMPOSITION ───

    {
      id: "ss-8-17",
      time: 8,
      title: "Melodic Architecture — The 8-Bar Story",
      type: "vocal",
      what: "Plan a complete 8-bar melody BEFORE singing it. Audiate the whole thing internally — every contour, every landing, every body address — then produce it. This is the audiation-to-composition bridge: the point where inner hearing becomes outer music. In L4 you painted single contour shapes (arch, valley, zigzag). Now you SEQUENCE those shapes into a narrative arc across 8 bars. The melody has a beginning, a middle, and an end — designed in silence, then born into sound.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM. Backing track ready. Voice check: barrel breath — ribs expanded, throat open. You'll need sustained support for 8-bar phrases. An 8-bar melody is a marathon, not a sprint.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      metronome: 75,
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Choose a CONTOUR ARC for your 8 bars. Not individual notes — the SHAPE of the whole melody. Options: (1) The Arch — low start, gradual climb to a peak in bars 5-6, descent to home. (2) The Double Arch — two smaller peaks (bars 3 and 7) with a valley between them. (3) The Slow Rise to Late Climax — stays low for 6 bars, then peaks dramatically in bar 7, resolves in bar 8. Draw the shape in the air with your hand. Feel the body journey it implies: chest→mask→chest for the arch, or chest→mask→chest→mask→chest for the double arch. The shape IS the emotional narrative.", why: "Melodic planning at the phrase level is the transition from improvisation to composition. Narmour's Implication-Realization Model (1990) shows that listeners track contour across multi-bar spans — they hear the overall shape, not just individual notes. Choosing the shape FIRST means your melody has architectural intention. L4's Contour Painting (ss-4-27) taught you single shapes; now you're sequencing them into narrative arcs. The body-journey preview gives you a somatic blueprint to follow." },
        { text: "Choose TARGET NOTES for bars 2, 4, 6, and 8 — the 'landmarks' of your melody. These are the notes you'll land on at those structural points. Example: bar 2 lands on C (ache), bar 4 on E (openness), bar 6 on G (the peak), bar 8 on A (home). Feel each landmark's body address in sequence: throat-ache → mask-brightness → forehead-reach → chest-home. The landmarks create a skeletal melody; everything between them is creative freedom.", why: "Target landing (ss-4-30) taught you to navigate toward a single destination. Now you're chaining four targets into a structural framework. Jazz pedagogy calls this 'guide-tone melody' — the landmarks outline the emotional arc while leaving room for spontaneous detail. The body-address sequence gives you a physical roadmap: you know WHERE in your body the melody needs to be at each structural point." },
        { text: "Close your eyes. Audiate the COMPLETE 8-bar melody silently. Hear every note. Feel every body address. Walk through it internally from bar 1 to bar 8, feeling the resonance migrate through your body stations as the contour rises and falls. The drone hums beneath your internal melody. Take your time — this might take 30-60 seconds of pure internal hearing. Don't rush. The melody exists in your imagination before it exists in sound.", why: "Full-phrase audiation is the highest-order skill in Gordon's Music Learning Theory. Most musicians audiate 1-2 bars ahead; audiating 8 bars requires holding an extended musical image in working memory. The body-address walkthrough gives you a physical scaffold that supports the auditory image — two channels sustaining the melody simultaneously. Zamorano (2025) showed that body awareness predicts pitch accuracy (R²=0.41); full-body audiation of an 8-bar phrase is that finding applied at scale." },
        { text: "Sing it. Play the backing track, start the metronome, and produce your 8-bar melody. How much survived the translation from imagination to sound? Some notes will land exactly where you heard them. Others will surprise you — your voice found something different from what your inner ear planned. Both outcomes are valuable: accurate production confirms your audiation, and deviations reveal where your voice has its own ideas.", why: "The gap between audiated melody and produced melody is your current audiation-to-production accuracy. Kratus Level 4 (strategy-oriented improvisation) requires the musician to execute pre-planned melodic ideas — which means the internal plan must survive contact with the voice. Noticing WHERE the plan broke down (which bar? which interval?) gives you precise targets for growth." },
        { text: "Record, listen back, and identify ONE section (2 bars) to revise. Maybe bar 3-4 wandered from your plan. Maybe bar 7-8 resolved too quickly. Change ONLY that section — keep everything else. Sing the revised version. This is editing: the skill that separates composition from improvisation.", why: "Revision is the composer's core tool. Improvisation generates material; composition SHAPES it. By changing only 2 bars, you practice surgical editing — adjusting part of a structure without destroying the whole. This is how professional songwriters work: write, listen, revise one section, listen again. The constraint (change only ONE section) prevents the perfectionist trap of rewriting everything." },
        { text: "Compare version 1 to version 2. Which is more intentional? Which tells a better story? Listen for the landmarks — did bars 2, 4, 6, and 8 land on your planned targets? Listen for the contour arc — does the overall shape match what you chose in step 1? The version that more closely matches your PLAN is the more composed melody. The version with better surprises might be the more musical one. Both matter.", why: "Self-comparison across versions builds compositional judgment — the ability to evaluate your own work against your intentions. This metacognitive skill (Kratus Level 5: structural improvisation) is what allows musicians to improve their own compositions without external feedback. You're becoming your own editor." }
      ],
      feel: "This exercise should feel like architecture — you're DESIGNING a melody, not just discovering one. The planning phase (steps 1-3) should feel cerebral, structural, intentional. The singing phase (step 4) should feel like translating a blueprint into a building. The revision phase (steps 5-6) should feel like craftsmanship — adjusting details to match the vision. If the whole thing feels effortful and slow, that's correct. Composition IS slower than improvisation. The payoff is precision.",
      wrong: "If you skip the silent audiation (step 3) and just start singing, you're improvising, not composing. The internal hearing IS the exercise. If your 8-bar melody collapses into 4-bar fragments, your working memory is overloaded — reduce to 4 bars and build back up. If your landmarks all blur into the same body address, you're not differentiating the target notes somatically — go back to ss-4-30 (Target Landing) and practice each target's body address individually. VOCAL TIP: 8 bars is a lot of singing. Plan your BREATHS as part of the architecture — where will you breathe? Breathing points are natural phrase boundaries. Build them into the design.",
      sarah: "Gene, this is where everything comes together. The contour shapes from L4, the target landings, the audiation skills — they all converge into melody writing. Khruangbin's Mark Speer plans his guitar melodies the same way: shape first, landmarks second, details third. You're not improvising anymore — you're composing. And the first melody you compose from a plan, however rough, is more intentional than a thousand improvisations. That's the leap."
    },
    {
      id: "ss-8-18",
      time: 7,
      title: "Tension and Release — The Melody's Breath",
      type: "vocal",
      what: "Every great melody breathes — it builds tension and releases it. Some scale degrees PULL (the 2nd, 4th, 6th, 7th) and some SETTLE (root, 3rd, 5th). In L4's Question/Answer (ss-4-31), you ended phrases on unstable vs stable notes using the pentatonic. Now you use the FULL scale and learn to feel the GRADIENT of tension — from mild pull (2nd degree) to extreme yearning (7th degree). Tension isn't binary; it's a spectrum, and your body feels every point on it.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM. Backing track ready. Voice check: tongue tip on bottom teeth, jaw loose. Tension notes need a RELAXED throat — the tension is in the music, not in your body.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Am Natural Minor", range: ["A3", "G4"] },
      metronome: 75,
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Sing phrases that END on unstable notes — the ones that pull. Try a 4-note phrase ending on B (the 2nd degree): feel the mild pull, the gentle incompleteness, like a sentence ending with 'and...' Now try ending on D (the 4th): stronger pull, more restless, wanting to resolve. Now F (the 6th, the minor 6th in Am): dark tension, aching, like standing at the edge. Finally G (the 7th): the most intense pull — the leading tone, desperate to resolve upward to A. Hold each final note for 4 beats and FEEL the pull in your body.", why: "Scale-degree function theory (Lerdahl & Jackendoff 1983) ranks notes by their tension relative to the tonic. The 2nd degree creates mild instability, the 4th creates moderate tension, the 6th adds darkness, and the 7th creates the strongest pull toward resolution. Your body registers these gradations: B sits slightly above A's chest-warmth, unresolved; D pulls from the throat; F aches in a compressed space between E's openness and G's reach; G leans forward from the mask, yearning upward. These aren't metaphors — they're bone-conducted resonance patterns that differ measurably between degrees." },
        { text: "Sing phrases that END on stable notes — the ones that settle. Root (A): complete resolution, gravity satisfied, deep chest warmth. Third (C): partial resolution — you've landed somewhere emotional but not home. The ache rests but doesn't disappear. Fifth (E): open resolution — spacious, settled but gazing outward. Sing 4-note phrases ending on each stable note. Hold the final note and feel the body SETTLE rather than pull. Notice: stable notes let you breathe. Tension notes make you want to move.", why: "Stable tones (1, 3, 5) form the tonic triad — the gravitational center of the key. Ending on these notes creates varying degrees of resolution: root = complete rest, 3rd = emotional rest with color, 5th = open rest with space. The body confirms: stable landings feel like sitting down after walking. The absence of pull IS the resolution. Kratus's hierarchy of improvisation skills places 'deliberate use of tension and resolution' at Level 4 — this is where you move from making notes to making meaning." },
        { text: "Create 4-bar PAIRS: 2 bars of tension (ending on an unstable note) followed by 2 bars of release (ending on a stable note). The tension phrase asks; the release phrase answers. Try: 2 bars ending on D (restless pull) → 2 bars ending on A (home). Then: 2 bars ending on G (intense yearning) → 2 bars ending on E (open space). Feel the body arc: tension gathers in the throat or mask, release pours back to the chest. The pair should feel like ONE musical statement — inhale and exhale.", why: "Tension-release pairing is the advanced version of L4's Question/Answer (ss-4-31). There, you used only pentatonic notes and focused on 'away from home' vs 'home.' Now you're using the full natural minor scale and choosing SPECIFIC tension levels. D creates different tension than G; E creates different resolution than A. The 2+2 bar structure gives each half enough time to establish its character. This pairing is the engine of verse-chorus writing: verses create tension, choruses release it." },
        { text: "Vary the tension INTENSITY. Sing 4 phrases, each ending on a different unstable degree, from mildest to most intense: B (mild — a gentle lean) → D (moderate — restless motion) → F (dark — the minor 6th's gravity) → G (extreme — desperate to resolve). Feel the gradient in your body: B barely pulls, D tugs at the throat, F compresses the chest-throat space with dark weight, G pushes forward from the mask demanding resolution. After all four, resolve to A and feel the full-body release. The tension gradient is a TOOL — you can dial it from whisper to scream.", why: "Narmour's Implication-Realization Model (1990) describes how listeners track tension levels continuously — not as binary (tense/resolved) but as a continuum. Each scale degree has a measurable 'tension weight' relative to the tonic. Teaching Gene to feel this gradient somatically gives him compositional control: he can choose exactly how much tension a phrase carries by choosing which degree to land on. The body-gradient (mild pull → intense pull) makes this intellectual concept physical and intuitive." },
        { text: "2-minute freestyle composing tension-release arcs over the backing track. Use the FULL toolkit: choose your tension level (mild B, moderate D, dark F, extreme G), build toward it, land, feel the pull — then compose a release phrase that resolves to a stable note (A, C, or E). Let each arc be a complete breath: gather tension, hold it, release it. Vary the arcs — sometimes mild tension with quick resolution, sometimes extreme tension with delayed resolution. Record it.", why: "Extended practice integrating tension control into free composition is where the skill transfers from exercise to art. The ability to consciously dial tension up and down while improvising is what separates deliberate composition from noodling. The backing track provides harmonic context; your tension-release choices provide melodic narrative. This is Kratus Level 4: strategy-oriented improvisation — you're executing planned tension arcs in real time." }
      ],
      feel: "Tension should feel like holding your breath — the longer you hold, the more intense the eventual exhale. Release should feel like that exhale: satisfying, settling, complete. The GRADIENT is the key discovery — tension isn't on/off. It's a dial, and you can feel each position on that dial in your body. Mild tension (B) is a slight lean forward. Extreme tension (G) is your whole body reaching toward resolution. When you control the dial, you control the emotional arc of your melody.",
      wrong: "If all tension notes feel the same, you're not differentiating the degrees somatically. Go back and hold each unstable note against the drone for 8 beats: B, then D, then F, then G. The DRONE reveals the tension — without it, the degrees lose their context. If your releases all sound the same (defaulting to A every time), try resolving to C or E instead — different stable notes create different qualities of resolution. VOCAL TIP: Tension notes in the upper range (F4, G4) are near the passaggio. Don't push more air to reach them — narrow the vowel slightly and let resonance carry the note. The musical tension is in the interval, not in your throat.",
      sarah: "Gene, this is what separates a melody that 'sounds nice' from one that MOVES you. Tinariwen's vocal lines live in tension — they hover on the 4th and 7th, pulling, yearning, and then resolve to the root with devastating simplicity. That pull you feel in your chest when a melody breaks your heart? It's the 7th degree resolving to the root. You're learning to CREATE that feeling on purpose. That's power."
    },
    {
      id: "ss-8-19",
      time: 8,
      title: "The Hook Lab — What Makes a Melody Stick",
      type: "vocal",
      what: "Some melodies vanish the moment they stop. Others lodge in your skull for days. What's the difference? Earworm research (Jakubowski et al. 2017) identified three factors: REPETITION (the phrase recurs), RHYTHMIC SIGNATURE (a distinctive rhythm pattern), and INTERVALLIC SURPRISE (an unexpected leap where the ear expected a step). In this exercise you engineer all three into a single hook — then test whether it sticks.",
      setup: "Guitar. Drone on A. Metronome at 90 BPM (hooks need energy). Backing track ready. Voice check: jaw loose, tongue tip down. Hooks are short phrases sung repeatedly — don't let repetition tighten your throat.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      metronome: 90,
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Sing a 2-bar phrase using pentatonic notes. Anything — first instinct. Now test it: look away from the guitar for 30 seconds. Can you hum it back from memory? If yes, you stumbled onto something naturally sticky. If no (and most first attempts won't be), that's fine — we'll BUILD stickiness into it using three specific tools. Sing the phrase again and record it as 'Version 0 — raw material.'", why: "The 30-second memory test is a simple earworm diagnostic. Jakubowski et al. (2017) analyzed 3,000+ earworms and found that involuntary musical imagery is triggered by melodies with specific structural features — not by emotional attachment or familiarity alone. Testing your phrase BEFORE adding those features gives you a baseline to compare against." },
        { text: "Add REPETITION. Sing the same 2-bar phrase 3 times back-to-back. By the 3rd time, it should feel familiar — not just to your ear, but in your body. The resonance pattern becomes a groove: your body knows where each note lives and anticipates the next body address. Repetition is the simplest stickiness tool: the more a phrase recurs, the more the brain encodes it as a pattern worth remembering. Record '3x repetition version.'", why: "Repetition is the most powerful factor in earworm formation (Margulis 2014). The brain's pattern-detection system flags repeated sequences as 'important' and transfers them to longer-term memory. Three repetitions is the sweet spot — enough to establish the pattern, not enough to bore. Notice that repetition also creates BODY memory: by the 3rd round, your resonance pattern is automatic, which means the phrase has been encoded both auditorily and somatically." },
        { text: "Add a RHYTHMIC SIGNATURE — give the phrase a distinctive rhythm that sets it apart from a plain scale. Try three variations: (1) SYNCOPATION — shift the emphasis off the beat, landing notes between clicks. (2) DOTTED RHYTHM — long-short-long-short, creating a lilting bounce. (3) PICKUP — start the phrase BEFORE beat 1, so it tumbles into the bar. Sing each variation 3 times. Which one makes the phrase more distinctive? Which one makes your body move? Pick the winner.", why: "Earworm research shows that melodic hooks have more common rhythmic patterns than non-hooks (Jakubowski 2017) — but with one distinctive feature that makes them stand out. The rhythmic signature is what makes a hook IDENTIFIABLE: strip away the pitches and clap just the rhythm — can you still recognize the phrase? If yes, the rhythm is doing its job. Syncopation and pickups are especially potent because they create physical engagement — your body anticipates the displaced accent." },
        { text: "Add an INTERVALLIC SURPRISE — one leap where the ear expects a step. If your phrase moves A-C-D-E (all steps or small skips), replace one step with a LEAP: A-C-D-G (the E→G step becomes a skip to the top). Or A-E-D-C (the opening leap from A to E grabs attention). The surprise should feel like a body-address JUMP — a sudden shift in resonance location that wakes up the ear. L4's Leap Frog (ss-4-26) trained you to leap; now use a SINGLE strategic leap within an otherwise stepwise phrase.", why: "Narmour's Implication-Realization Model predicts that listeners generate strong expectations after stepwise motion — they expect MORE steps. A leap violates that expectation, creating a prediction error that the brain flags as interesting. Earworm melodies exploit this: mostly stepwise motion (easy to encode) with ONE surprising interval (hard to forget). The body-address jump makes the surprise physical: the resonance vaults from one station to another, and that somatic surprise reinforces the auditory one." },
        { text: "Combine all three: create a hook with REPETITION (sing it 3 times) + RHYTHMIC SIGNATURE (your chosen distinctive rhythm) + ONE INTERVALLIC SURPRISE (a strategic leap). Test it: sing the hook once, then sit in silence for 60 seconds — no humming, no tapping. After 60 seconds, try to sing it from memory. If it survived the silence, you've built a real hook. If it didn't, adjust: make the rhythm MORE distinctive or the leap MORE dramatic. Record your best version.", why: "The 60-second silence test is the acid test for a hook. During silence, the brain's auditory cortex either replays the melody involuntarily (earworm = success) or lets it decay (not sticky enough). The three elements work synergistically: repetition encodes it, rhythmic signature makes it identifiable, intervallic surprise makes it memorable. All three together create what Margulis calls 'musical stickiness' — the phrase becomes an involuntary mental replay loop." },
        { text: "Record 3 DIFFERENT hook attempts using the same formula: repetition + rhythmic signature + surprise leap. Make each one distinct — different notes, different rhythms, different leap locations. Listen back to all three. Which one is stuck in your head? Which one do you find yourself humming? The one that lodges involuntarily is your best hook. That's your ear telling you what works.", why: "Multiple attempts with the same structural formula produce different results because hookiness depends on the SPECIFIC combination, not just the presence of the three elements. Recording and comparing develops your ear for what makes YOUR hooks work — which rhythms, which leaps, which phrase shapes trigger YOUR involuntary replay. This self-knowledge is the foundation of your songwriting voice." }
      ],
      feel: "Hook-building should feel like engineering — you're deliberately constructing something designed to stick in a listener's mind. The 60-second silence test should feel exciting: either the hook comes back (triumph!) or it doesn't (useful information). The multiple attempts should feel like iteration, not failure. Each version teaches you something about what makes YOUR melodies memorable.",
      wrong: "If none of your hooks stick after 60 seconds, the phrase is too complex. Simplify: fewer notes, simpler rhythm, bigger leap. The most memorable hooks in music history are shockingly simple — 3-5 notes with one distinctive feature. If you're overcomplicating, strip everything back to 3 notes and one rhythmic trick. If your hooks all sound the same, vary the LEAP location — try it at the beginning, middle, and end of the phrase. The leap's position changes the hook's character dramatically. VOCAL TIP: Hooks need DELIVERY as much as construction. Try singing the same hook with Gene's lazy porch register (Angus Stone drawl) vs. crisp articulation. The delivery that feels most natural in your body is the one that'll sound most authentic.",
      sarah: "Gene, every hook you've ever loved was built with these exact tools. The opening riff of an Allah-Las song: repetition + distinctive rhythm + one surprising interval. DOPE LEMON's vocal hooks: simple phrases repeated with a rhythmic swagger and one unexpected melodic move. Khruangbin's bass hooks: 3 notes, a syncopated rhythm, one leap. You're reverse-engineering what your favorite artists do instinctively. Now you can do it on purpose. Tap 'Draw new progression' below — a hook that sticks over pop axis might die over a minor descent. Stickiness is harmony-dependent, not just melody-dependent. Test yours over 3 different progressions and find out which harmonic world it lives in.",
      chordProgression: {
        key: "A",
        scale: "natural-minor",
        pool: ["minor_three", "minor_descent", "minor_uplift", "minor_cyclic", "rock_minor"],
      },
    },
    {
      id: "ss-8-20",
      time: 7,
      title: "Interleaved Melody — Combine Everything",
      type: "vocal",
      what: "Maximum contextual interference. In L4 you learned each constraint separately: leaps (ss-4-26), contour shapes (ss-4-27), seed development (ss-4-28), forbidden notes (ss-4-29), target landings (ss-4-30), question/answer (ss-4-31). Now you COMBINE them randomly — roll a contour shape AND a constraint, fuse them into a single phrase. The switching is the learning. Research on contextual interference (Shea & Morgan 1979) shows that random interleaving produces 20-40% better long-term retention than blocked practice, even though it feels harder in the moment.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM. Backing track ready. Voice check: less air for higher notes — the variety in this exercise will move you across your range. Stay easy. You'll need a randomizer: dice app, coin flips, or just close your eyes and point at the lists below.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      metronome: 75,
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Roll for your first combination. SHAPE (pick one): arch / valley / zigzag / gap-fill / slow rise / late peak. CONSTRAINT (pick one): leaps only / forbidden note (pick which) / target landing on E / seed + one mutation / question ending. Combine them into a 4-bar phrase. Example: 'zigzag contour + leaps only' = a bouncing melody that never moves to adjacent notes. Or 'arch contour + forbidden C' = a melody that builds and releases without ever touching the ache note. Sing the combination. It should feel like a creative puzzle — some combinations are easy, some are bizarre. Both are valuable.", why: "Contextual interference theory (Shea & Morgan 1979, Magill & Hall 1990) demonstrates that practicing skills in random order — even though it feels harder and produces worse SHORT-term performance — creates dramatically better LONG-term retention and transfer. The difficulty of combining two independent constraints forces your brain to retrieve and integrate multiple skill schemas simultaneously, which deepens encoding. Each combination is unique, which prevents the autopilot that blocked practice enables." },
        { text: "New random combination. DIFFERENT shape + DIFFERENT constraint. 4 bars. The switch between combinations should feel jarring — you just built one melodic approach and now you have to build a completely different one. That jarring feeling is the desirable difficulty. Your brain is working harder to retrieve the new constraint while the previous one is still warm. Lean into the awkwardness.", why: "The switch cost (the momentary confusion when changing tasks) is where the learning happens. Motor learning research (Lee & Magill 1983) shows that switch costs during practice predict retention gains during testing. The more effortful the switch feels now, the more durable the skill will be tomorrow. Your brain is building flexible, context-independent melody skills instead of rigid, context-dependent habits." },
        { text: "Third combination. By now the switching should feel genuinely challenging — your brain is juggling multiple constraint-shape pairings and each new one requires a fresh configuration. If it feels easy, you're not randomizing enough — make sure each round uses a DIFFERENT shape AND a different constraint from the previous rounds. The challenge IS the exercise. Sing 4 bars, record them.", why: "Three rounds of random switching create enough interference to trigger the encoding benefits. The brain's motor planning system must build a new response configuration for each combination, rather than refining a single response. This is why interleaved practice feels slow and frustrating but produces superior outcomes: you're building ADAPTABILITY, not just proficiency in any single skill." },
        { text: "Chain your 3 random phrases into a 12-bar melody. Each 4-bar section has a different constraint and shape — but together they form a complete piece. Listen to the whole thing as a composition. The variety of constraints creates CONTRAST between sections — exactly what real melodies need. A verse that uses leaps-only feels different from a chorus that uses gap-fill. A bridge with a forbidden note sounds different from a section with target landings. Contrast IS melody.", why: "Chaining constrained sections into a longer form reveals that compositional variety EMERGES from constraint switching. Real songs have contrasting sections precisely because the songwriter (consciously or not) uses different melodic strategies in different parts. The verse might be mostly stepwise (calm); the chorus might use leaps (energy); the bridge might target a specific tension note (drama). You're experiencing this structural variety from the inside." },
        { text: "2-minute FREESTYLE where you consciously switch between ALL tools: leaps, contours, seeds, forbidden notes, targets, Q&A, tension-release, hooks. No single tool dominates for more than one phrase. The switching should be FAST — every 2-4 bars, reach for a different constraint. This is the final integration: every melodic skill you've built is available in real time, and you're choosing between them with intention. Record the full 2 minutes over the desert blues backing track.", why: "Rapid voluntary switching between multiple melodic strategies is the hallmark of a mature improviser. Pressing (1988) called this 'referent-based improvisation' — the musician holds a repertoire of strategies and selects between them in real time based on the musical context. The 2-minute freestyle is a stress test for your entire melodic toolkit. Whatever strategies you FORGET to use during the freestyle are the ones that haven't been fully integrated yet — those become your next practice targets." }
      ],
      feel: "This exercise should feel HARDER than any single constraint exercise — and that's exactly right. Contextual interference feels inefficient and messy in the moment. You'll make more mistakes, feel more confused, and produce less polished phrases than when practicing any single skill. But the research is unambiguous: this messiness produces 20-40% better long-term retention. The discomfort is the signal that deep learning is happening. By the freestyle at the end, you should feel like a chef reaching for different spices — not always graceful, but always intentional.",
      wrong: "If you keep defaulting to the same constraint (usually stepwise motion or target landings), you're avoiding the interference. Force yourself to use your LEAST comfortable tool next. If the combinations feel impossible (leaps-only + valley contour = ???), simplify: use only 3 notes instead of 5, or extend to 8 bars instead of 4. The combination should be challenging, not paralyzing. If you can't remember what tools are available, review: leaps (ss-4-26), contours (ss-4-27), seeds (ss-4-28), forbidden notes (ss-4-29), targets (ss-4-30), Q&A (ss-4-31), tension-release (ss-8-18), hooks (ss-8-19). VOCAL TIP: Rapid constraint switching can make your throat tighten from cognitive load. If you notice jaw clenching or throat tension, sigh (haaa) between rounds. The constraints are in your MIND, not your body.",
      sarah: "Gene, this is the exercise that turns individual skills into integrated musicianship. Every constraint you learned in L4 and L8 is a tool in your belt. This exercise forces you to reach for all of them, rapidly, under pressure. It's messy and hard and that's exactly why it works. Khruangbin's live improvisations sound effortless because they've done this integration work — switching between melodic strategies in real time without conscious thought. You're building the same neural pathways. The chaos today becomes fluency tomorrow."
    },

    // ─── COLOR MUSIC: INTERVALS + CALL & RESPONSE ───

    {
      id: "ss-8-21",
      time: 5,
      title: "Interval Singing: Feel the Distance",
      type: "vocal",
      what: "Two notes play. Identify the interval, then SING the second note starting from the first. Watch the colors on the wheel \u2014 close colors = small interval, far colors = big leap.",
      colorMusic: { root: "A", scale: "minor-pentatonic", mode: "intervals" },
      drone: { root: "Am", octave: 2, texture: "pure" },
      steps: [
        { text: "Open Color Music, Intervals mode. Two notes will play. Tap the interval you hear.", why: "Interval recognition is the muscle behind improvisation. When you hear a melody, you're hearing intervals \u2014 not note names." },
        { text: "After identifying correctly, try SINGING the second note before the reveal.", why: "Hearing an interval and producing it are two different skills. This bridges the gap." },
        { text: "Watch the color wheel \u2014 close colors = small interval (m3, P4). Far colors = big leap (P5, m7).", why: "The color distance IS the interval distance. This makes the abstract concept of intervals visible and intuitive." }
      ],
      feel: "When you can hear an interval and SING it without thinking, you can improvise melodies. This is the missing link between hearing music and creating it.",
      sarah: "Gene, Mark Speer doesn't think in note names when he improvises. He hears intervals \u2014 'up a third, down a step, hold.' This exercise builds that same internal language."
    },
    {
      id: "ss-8-22",
      time: 5,
      title: "Call & Response: Melodic Conversation",
      type: "vocal",
      what: "The trainer plays 3-4 note phrases. Echo them back on guitar or voice, then improvise a response. This is how musicians learn \u2014 through conversation.",
      colorMusic: { root: "A", scale: "minor-pentatonic", mode: "callResponse" },
      drone: { root: "Am", octave: 2, texture: "pure" },
      steps: [
        { text: "Open Color Music, Call & Response mode. Listen to the phrase. Tap it back on the fretboard.", why: "Phrase echo builds the melodic vocabulary that improvisation draws from." },
        { text: "At 4 notes, the 'Free Response' prompt appears. Echo the phrase, then improvise your own answer.", why: "Answering a phrase is the first act of musical creation. You're not just copying \u2014 you're contributing to a conversation." },
        { text: "Try answering with voice instead of guitar. Sing your response, then find it on the fretboard.", why: "The voice-first approach ensures your ear leads. If you can sing it, you can find it." }
      ],
      feel: "Echo the phrase, then answer with your own. This is how jazz musicians learn \u2014 through musical conversation. The phrases you learn here become your melodic vocabulary.",
      sarah: "Gene, this is the exercise that connects your ear training to your songwriting. Every melodic phrase you echo and answer is a potential lyric melody, a potential guitar lick, a potential hook. The library you build here feeds everything you create."
    },
    {
      id: "ss-8-23",
      time: 8,
      title: "Open Tuning Melody Discovery",
      type: "guitar",
      what: "Retune to DADGAD — three D strings and two A strings creating a Dsus4 wash. Before touching a single fret, strum the open strings and LISTEN for 30 seconds. The tuning proposes melodies your fingers would never find in standard tuning. Joni Mitchell treated each of her 57 tunings as a completely new instrument. Adrianne Lenker drops the high E to D for persistent drones on Big Thief records. Open tunings reduce left-hand cognitive load — most chords are 1-2 fingers with drones ringing — freeing attention for melody creation.",
      setup: "Guitar. Tuner. Retune to DADGAD (low to high: D-A-D-G-A-D). Listen to the open strings ring before doing anything else.",
      steps: [
        { text: "Retune to DADGAD. Strum all 6 open strings and let them ring. Close your eyes. Listen for 30 seconds — feel where the drone lives in your body. The three D strings and two A strings create a Dsus4 wash that sits in the chest like a warm hum. Don't play anything — just absorb.", why: "Joni Mitchell's method: re-tune, then simply listen to what the open strings want to say before playing anything. The resonance IS the first creative input. DADGAD's Dsus4 is neither major nor minor — it's open, ambiguous, full of possibility." },
        { text: "Add one finger — any fret, any string. How does the sound change? Move to another fret. Another string. Each position creates a different chord against the droning open strings. You don't need to know what the chords are called — just whether they sound good. If a note clashes, move one fret. If it sings, stay.", why: "Open tunings create serendipitous harmonies. One finger on one fret changes the entire character of the chord while the drones continue underneath. This is the opposite of standard tuning where each chord requires a full hand shape. The cognitive load drops dramatically — freeing bandwidth for melody." },
        { text: "Hum over the open tuning. Let the drone suggest a vocal melody — the tuning's resonance will pull your voice toward certain notes. Follow the pull. Don't impose a melody you already know — let one emerge from the tuning's overtone series. Feel the melody forming in your chest before it becomes sound.", why: "The vocal melody should feel discovered, not composed. Adrianne Lenker starts songwriting from tuning exploration, letting the instrument propose phrases. Your voice responds to the specific overtone series of the tuning — notes that ring sympathetically will feel 'right' in the body." },
        { text: "Record a 2-minute melody exploration: open-string strums with 1-2 finger chord shapes, hummed melody on top. This is raw material — it doesn't need to be a finished piece. The tuning is the co-writer.", why: "Capturing the exploration preserves ideas that your conscious mind might dismiss as 'too simple' or 'not a real song.' The best open-tuning songs often emerge from exactly these kinds of casual explorations." }
      ],
      feel: "Open tuning melody discovery should feel like finding a secret room in a house you thought you knew. The guitar suggests ideas your fingers would never find in standard tuning. There's a childlike quality to it — everything is new, nothing is wrong.",
      wrong: "If you're trying to play standard-tuning chord shapes in DADGAD, you're fighting the tuning. Let go of what you know. Explore with single fingers and drones. If everything sounds 'weird,' you're comparing to standard tuning. Stop comparing — DADGAD is a different instrument.",
      sarah: "Gene, DADGAD is the tuning behind desert blues and Celtic folk — two of your sonic worlds colliding. Tinariwen and Davey Graham both live here. One-finger chords with drones — your left hand barely works while your voice runs free. You'll go deeper with open tuning songwriting in Level 14 (ss-14-17) — this is the preview that plants the seed.",
      fretboard: { tuning: "dadgad" },
      recorder: true,
      drone: { root: "D", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("D3", "A4")
    },
    {
      id: "ss-8-24",
      time: 8,
      title: "Write Chorus First",
      type: "song",
      what: "Reverse the usual order: write a chorus hook FIRST, then build a verse backward from it. The chorus is the emotional destination \u2014 the verse is the journey that earns the payoff. Most professional songwriters start with the chorus because it\u2019s the part that must be undeniable. If the chorus doesn\u2019t hook you on its own, no amount of verse craft will save the song.",
      setup: "Guitar. Metronome at 80 BPM. Am-C progression as starting point.",
      steps: [
        { text: "Strum Am-C on repeat at 80 BPM. Improvise melodic phrases until a singable 2-bar phrase emerges \u2014 something that sticks in your head. That\u2019s your hook candidate.", why: "The hook must be singable and memorable. Testing it over a simple progression lets you focus on the melody\u2019s inherent stickiness, not the chord complexity." },
        { text: "Repeat the hook 4 times in a row. Does it get MORE interesting with repetition, or less? A good hook reveals new layers on repeat. If it gets boring, modify and try again.", why: "The repetition test is the fastest way to evaluate a hook. Commercial songwriters use Ralph Murphy\u2019s rule: if the hook doesn\u2019t improve on repeat, it\u2019s not sticky enough." },
        { text: "Now build a verse that sets up the hook\u2019s emotional arrival. Rules: the verse should be in a LOWER range than the chorus (E3-B3 vs B3-E4), use MORE words and LESS space, and build tension toward the chorus. The verse tells the story; the chorus tells the truth.", why: "Contrast between verse and chorus is what makes the chorus feel like a lift. Lower range \u2192 higher range, more words \u2192 fewer words, tension \u2192 release. These contrasts are the architecture of every great pop song." },
        { text: "Play Verse-Chorus-Verse-Chorus. Does the chorus feel earned? Does the verse make you WANT the chorus? Record and listen back. The transition from verse to chorus should feel like stepping from a dim hallway into sunlight.", why: "The \u2018earned\u2019 feeling is the test of good songwriting. If you can remove the verse and the chorus still works, the verse isn\u2019t doing its job. If the chorus feels flat without the verse, the contrast is working." }
      ],
      feel: "The chorus should feel inevitable \u2014 like the melody was always there, you just uncovered it. The verse should feel like it\u2019s leaning forward, pulling you toward the chorus.",
      wrong: "If you start with the verse, you\u2019ll build a song that wanders. Starting with the chorus forces you to know where you\u2019re going. If the chorus doesn\u2019t work on its own, keep iterating \u2014 don\u2019t try to save a weak chorus with a great verse.",
      sarah: "Gene, this is how most hit songs are written \u2014 chorus first, then verses that earn it. Think of Skinshape\u2019s \u2018I Still Love You\u2019 \u2014 that chorus hook is undeniable, and the verse exists to set it up. Your natural instinct might be to tell a story from the beginning. Resist it. Start with the destination.",
      metronome: 80,
      recorder: true,
      referencePitches: getPitchRange("E3", "A4"),
      phraseForm: { pattern: ["V", "Ch", "V", "Ch"], barsPerSection: [8, 8, 8, 8], labels: { V: "Verse", Ch: "Chorus" } },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      chordVoicings: { chords: ["Am", "C"] }
    }
  ]
};
