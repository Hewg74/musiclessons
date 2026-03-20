import { getPitchRange } from "../appData.js";

export const level6 = {
  num: 6, name: "The Pentatonic Sandbox", focus: "Pentatonic scale mastery, patterns, safe improv",
  duration: "35 min",
  setup: "Guitar for drone/reference. Backing tracks ready. Pitch Detector on.",
  subtitle: "The Pentatonic Sandbox",
  description: "The pentatonic scale is the safest place to improvise — five notes, zero wrong answers. Every genre Gene loves lives in this scale: the surf melodies of Allah-Las, Khruangbin's vocal lines, reggae hooks, desert blues. This level internalizes the pentatonic so deeply that improvising with it becomes as natural as speaking. It's your improv sandbox — play freely, nothing breaks.",
  artists: "Khruangbin, Allah-Las, Tinariwen, DOPE LEMON",
  unlocks: "Whisper to Full Voice (Level 7)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["v4e2", "v4e4"], prompt: "Sing offbeat vocal phrasing for 1 minute (v4e2). Then do reggae call-and-space with full-bar rests (v4e4). Rhythmic skills erode fast without practice." },
  exercises: [
    {
      id: "v6e0", time: 3, title: "Diagnostic — Pentatonic Freedom Check", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      recorder: true,
      pitchContour: true,
      what: "Sing pentatonic notes freely over a drone. Record and assess: are you using all 5 notes? Are you stuck on root and third? How comfortable does improvisation feel? This diagnostic sets your baseline for the whole level.",
      setup: "Guitar: hold a steady A2 drone (open A string). Pitch Detector on. Record from the start.",
      referencePitches: getPitchRange("A2", "G3"),
      steps: [
        { text: "Strum the open A string and let it ring. Without thinking too hard, sing whatever pentatonic notes come — A, C, D, E, G in any order, any rhythm.", why: "This unfiltered attempt reveals your current pentatonic relationship. Most people default to root and third, leaving three notes untouched. Your brain gravitates toward the strongest neural pathways." },
        { text: "Keep going for 60 seconds. Don't stop to judge. Try to use the full range from low A to high G.", why: "Sixty seconds is long enough for safe patterns to run out. That's when your voice reaches for unfamiliar notes and you get an honest picture of your comfort zone." },
        { text: "Stop. Before listening back, write down which notes felt easy and which felt like reaching.", why: "Self-assessment before playback builds metacognition — monitoring your singing in real time. Expert musicians develop internal monitoring that closely matches recorded reality." },
        { text: "Now listen to the recording. Check Pitch Detector: how many of the 5 notes did you use? Were they in tune?", why: "The gap between perception and reality is your calibration error. Most untrained singers overestimate accuracy by about 30%. Hard data beats feelings." },
        { text: "Rate your comfort 1-5. Write it down. You'll repeat this diagnostic at level's end to measure growth.", why: "Perceived difficulty decreases as procedural memory strengthens. This number tracks real neural changes over the course of the level." },
        { text: "Notice: did you sing mostly stepwise or skip around? Rhythmic variety or all even notes?", why: "Melodic contour and rhythmic variety are two dimensions of improvisational sophistication. Knowing your starting point helps set realistic targets." }
      ],
      feel: "Like a musical journal entry — no pressure, just documentation. If it feels scary, that's normal. Your amygdala reads improvisation as mild danger. It calms with exposure.",
      wrong: "If you froze, just sing the scale: A-C-D-E-G-E-D-C-A. Then try deviating — skip a note, repeat one, change rhythm. Even slight departure counts.",
      sarah: "No wrong answers here. This is a snapshot. Some people improvise freely for a minute. Others loop three notes. Both are normal starting points.",
      levelUp: "Complete the 60-second recording and honest self-assessment. Diagnostic, not performance."
    },
    {
      id: "v6e1", time: 4, title: "The Pentatonic Scale — Voice Mapping", type: "vocal",
      drone: { root: "A", octave: 2, texture: "analog" },
      pitchContour: true,
      recorder: true,
      what: "Sing A minor pentatonic (A-C-D-E-G) ascending and descending with Pitch Detector. Map it physically: feel where each note resonates. Low A in the chest, high G more forward. Connect to solfege (La-Do-Re-Mi-Sol).",
      setup: "Standing. Guitar for reference only — play each note once, then put guitar down. Pitch Detector on.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 70,
      steps: [
        { text: "Play A2 on guitar. Sing it on 'mah'. Feel chest vibration — low, warm, grounded. Hold 4 beats at 70 BPM.", why: "'Mah' opens the throat. Low frequencies genuinely resonate in the thoracic cavity. This sensation becomes your landmark for the root — eventually you find it without the guitar." },
        { text: "Step up on 'mah': C3 (still chest, less rumble), D3 (midpoint), E3 (brighter, forward), G3 (most forward). Hold each 4 beats.", why: "Each note has a physical address in your body. Mapping sensations to pitches builds proprioceptive pitch awareness — how experienced singers find notes without external references." },
        { text: "Descend: G3-E3-D3-C3-A2, each held 4 beats. Resonance travels back into the chest.", why: "Your larynx naturally lowers on descent, changing timbre. These physical changes are the pentatonic's body vocabulary." },
        { text: "Repeat 3 times, getting faster: 4 beats per note, then 2, then 1. Keep body awareness even at speed.", why: "Speed forces automation. At 4 beats, you're conscious. At 1, the sequence must be partly automatic. This transition is where procedural memory forms." },
        { text: "Try solfege: La-Do-Re-Mi-Sol ascending, Sol-Mi-Re-Do-La descending.", why: "Solfege labels create a second neural pathway to each pitch. Multiple pathways to the same note means faster, more reliable recall — encoding variability." },
        { text: "Eyes closed, no guitar, 1 beat per note. Ascending and descending. Check Pitch Detector after.", why: "Without reference, your voice relies on the internal map you just built. Most people are surprised at their accuracy after even brief deliberate mapping." },
        { text: "One more pass on sustained 'ooh', sliding between notes. Smooth glissando up and back.", why: "The glissando fills gaps between pentatonic notes. Your voice passes through B and F without landing, training the ear to hear pentatonic as a filtered chromatic selection." }
      ],
      feel: "Each note has its own body-home. Low A deep in chest. High G behind the eyes. The ascent is a familiar staircase.",
      wrong: "If all notes feel the same, you're throat-singing instead of letting resonance travel. Exaggerate: lean forward on high notes, ground feet on low ones.",
      sarah: "The pentatonic shows up in West African music, Chinese folk, Scottish ballads, Japanese ceremony, and the blues. Every culture discovered it independently. These five notes are genuinely ancient and deeply human.",
      levelUp: "Am pentatonic ascending/descending from memory, eyes closed, within 15 cents on Pitch Detector, 1 beat per note."
    },
    {
      id: "v6e2", time: 3, title: "Pentatonic in Every Key", type: "vocal",
      drone: { root: "A", octave: 2, texture: "analog" },
      pitchContour: true,
      recorder: true,
      what: "Sing pentatonic starting on different roots — A, C, D, E, G — with guitar drone. Breaks the 'Am = only pentatonic' habit. The PATTERN stays the same; only starting pitch changes.",
      setup: "Guitar for drone. Pitch Detector on. Metronome at 80 BPM.",
      referencePitches: getPitchRange("C3", "A3"),
      metronome: 80,
      steps: [
        { text: "A minor pentatonic: A-C-D-E-G. Ascending/descending, 2 beats per note. Home base review.", why: "Starting in the familiar key primes the motor pattern before transporting it." },
        { text: "C drone (3rd fret A string). Sing C minor pentatonic: C-Eb-F-G-Bb. Same intervals, different root.", why: "The intervals are identical but shifted. When your brain recognizes the pattern in a new location, it builds an abstract 'pentatonic' schema that transcends any key." },
        { text: "D drone (open D). D minor pentatonic: D-F-G-A-C. Some notes overlap with Am pentatonic, but their functions differ.", why: "Same pitch, different function: D as root feels like home; D as fourth in Am feels like a stepping stone. Context shapes musical meaning." },
        { text: "E drone (open low E): E-G-A-B-D. Then G drone (3rd fret low E): G-Bb-C-D-F.", why: "By the fourth and fifth keys, your brain generalizes — shifting from declarative ('the notes are...') to procedural knowledge ('I can feel the pentatonic from any root')." },
        { text: "Challenge: guitar plays a random drone (pick without looking). Find root, build pentatonic from it.", why: "Real-world version: someone plays, you hear the root, you sing. Removing advance knowledge forces real-time ear work." },
        { text: "Final pass: in each key, don't just scale — improvise a 4-note melody.", why: "Scales are ladders; melodies are paths through a garden. Improvising activates creative networks alongside motor ones — the medial prefrontal cortex lights up during melodic invention." }
      ],
      feel: "Each key is a different room in the same house. Same furniture arrangement, different view out the window.",
      wrong: "If one key feels wildly harder, spend extra time there. Difficulty usually comes from unfamiliar range or foreign flats/sharps.",
      sarah: "Guitar players think in box patterns. Your voice has no frets, so you internalize intervals by ear and feel. Without frets to fall back on, your ear gets stronger faster.",
      levelUp: "Pentatonic in 4 of 5 keys from memory, drone as only reference, within 20 cents."
    },
    {
      id: "v6e3", time: 4, title: "Pattern Drilling — Sequential Patterns", type: "vocal",
      pitchContour: true,
      recorder: true,
      what: "Sing sequential patterns through the pentatonic — thirds, skips, waves. These are the 'words' of melodic vocabulary. B.B. King and Mark Speer rely on internalized patterns drilled until automatic.",
      setup: "Standing. A minor pentatonic. Pitch Detector on. Metronome at 70 BPM.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 70,
      steps: [
        { text: "Pattern 1 — Ascending Thirds: A-C, C-D, D-E, E-G, then descend G-E, E-D, D-C, C-A. Two notes per beat.", why: "Thirds are the most common pentatonic pattern. Mark Speer runs them instinctively. Your brain builds a motor program for 'third from any note' — a single chunk rather than two decisions." },
        { text: "Pattern 2 — Skips: A-D, C-E, D-G, then descend G-D, E-C, D-A. Skipping one scale note each time.", why: "Skips add energy and surprise. Tinariwen builds solos from alternating steps and skips. Wider intervals challenge pitch accuracy — leaping requires more precise laryngeal control." },
        { text: "Pattern 3 — Waves: A-C-D-C, C-D-E-D, D-E-G-E. Four-note up-up-down shapes restarting one note higher.", why: "Waves combine progress with backward glances — the emotional quality of psych and surf music. Direction changes mid-phrase strengthen the prefrontal-motor cortex connection." },
        { text: "Combine: 4 bars thirds, 4 bars skips, 4 bars waves. One continuous flow.", why: "Switching patterns forces real-time motor program updates — exactly what happens during improvisation." },
        { text: "Speed up: 80 BPM, then 90 BPM. Let patterns automate.", why: "Speed transfers processing from conscious prefrontal cortex to automatic basal ganglia. You'll feel the shift: patterns suddenly feel easy. That's procedural memory consolidating." },
        { text: "Free round: mix patterns spontaneously. Start a third, switch to wave, throw in a skip. No plan.", why: "Proto-improvisation: choosing which pattern to deploy (3 options) rather than which note (all options). Simpler decisions, but the same act of real-time musical choice." },
        { text: "Record the free round. Listen: can you hear pattern transitions? Smooth or jarring?", why: "Smooth transitions mean your brain treats patterns as interchangeable modules. Jarring ones mean loading time remains — it shrinks with repetition." }
      ],
      feel: "Starts mechanical, becomes musical. By the free round, you're a DJ selecting from a palette rather than a student drilling.",
      wrong: "If you lose your place and sing non-pentatonic notes, slow down and return to the straight scale. Don't build on a shaky foundation.",
      sarah: "B.B. King's solos sound spontaneous but they're built from a handful of patterns drilled for decades. The automation freed his creative brain for emotion and timing.",
      levelUp: "All three patterns cleanly at 80 BPM, plus 30 seconds of fluid pattern mixing."
    },
    {
      id: "v6e4", time: 3, title: "Pentatonic Over a Drone", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      recorder: true,
      pitchContour: true,
      what: "Guitar holds A2 drone while you sing pentatonic melodies. Build from 2-note phrases to continuous improv. The drone gives harmonic context without chord changes — how Indian classical and desert blues artists train.",
      setup: "Guitar: open A string ringing continuously. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("A2", "G3"),
      steps: [
        { text: "Sing only 2-note phrases: A-C, C-D, E-G. Leave 2+ beats of silence between each.", why: "Two notes are the smallest melodic unit. Silence lets your auditory cortex process and plan. Tinariwen's vocals work this way — short spaced phrases, each a complete thought." },
        { text: "Expand to 3-note phrases: A-C-D, D-E-G, G-E-C. Keep spaces, but let phrases flow.", why: "Three notes give directional contour — up-up, up-down. Rising feels hopeful, falling feels resolved. Two decisions per phrase, doubling complexity." },
        { text: "Expand to 4-5 notes. Use patterns from exercise 3 — thirds, waves. Always return to silence.", why: "Longer phrases need more working memory. The spaces let you reset. Even expert improvisers leave gaps. Miles Davis: 'Music is the space between the notes.'" },
        { text: "Start phrases on D, E, or G instead of A. Different starting notes create different colors over the drone.", why: "Root A feels stable. Fifth E feels expectant. Third C feels searching. These are acoustical relationships your brain has learned from a lifetime of listening." },
        { text: "Vary rhythm: some on-beat, some off, some long notes, some quick flurries. Same pentatonic, different timing.", why: "Rhythm is half of melodic improvisation. Two improvisers using identical notes sound completely different with different rhythmic approaches." },
        { text: "Final: 90 seconds of continuous improvisation. Short phrases, long phrases, different starts, rhythmic variety, silence.", why: "Long enough to cycle through vocabulary, run out of ideas, and find new ones on the other side. That empty feeling is where genuine creativity begins." }
      ],
      feel: "The drone is a warm bed. No matter where your voice goes in the pentatonic, the drone catches you. Meditative — settle into it.",
      wrong: "Non-stop singing means rambling, not phrasing. Music breathes. If you're only singing root, trust the scale — every note works over the drone.",
      sarah: "This is where many students discover they can improvise. The drone removes chord-change complexity, the pentatonic removes wrong notes. Double safety net — your creative voice has permission to play.",
      levelUp: "90-second drone improv using all 5 notes, with silence between phrases, sounding like music not scales."
    },
    {
      id: "v6e5", time: 3, title: "Pentatonic Over Two-Chord Vamps", type: "vocal",
      drone: { mode: "cycle", preset: "reggae-drop" },
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      what: "Am→G vamp (2 bars each). Sing pentatonic melodies that respond to changes. Same notes, but their function shifts with each chord. A feels like home over Am but like suspension over G.",
      setup: "Guitar: Am 2 bars, G 2 bars, repeat at 85 BPM. Or Dub Reggae 85 track.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 85,
      steps: [
        { text: "Strum Am 2 bars, hold A — stable, home. Strum G 2 bars, sing A again — same note, different feeling.", why: "Same note, different meaning. A is root of Am (stability) but 9th of G (tension). Context-dependent hearing separates 'playing notes' from 'playing music.'" },
        { text: "Over Am: A, C, E feel stable (chord tones). D and G want to move (non-chord tones). Explore both.", why: "Chord tones are rest stops; non-chord tones pass through. D over Am wants to resolve to C or E. Your brain processes musical tension like narrative tension — setup, anticipation, payoff." },
        { text: "Over G: G and D feel stable now. Notice the same pentatonic reorganizing around the new chord.", why: "Notes that were tense over Am are now stable over G. This recontextualization is why two-chord songs feel harmonically rich." },
        { text: "Improvise 4-note phrases that shift character: settled over Am, searching over G.", why: "When melodies respond to harmony, you're playing the changes — conversing with the chords, not ignoring them." },
        { text: "Melodic targeting: end Am phrases on A, end G phrases on G. Land on chord roots.", why: "Root targeting sounds resolved and trains your ear to hear destinations before arrival — auditory prediction via the cerebellum." },
        { text: "Experiment: land on D over Am, E over G. 'Wrong' landings create wistful, yearning colors.", why: "Non-root landings are the choices that make Elliott Smith and Nick Drake distinctive — unexpected destinations create emotional complexity." },
        { text: "Record 2 minutes over Am-G vamp with targeted landings. Alternate safe (root) and colorful (non-root).", why: "Creative cognition research shows the most original ideas come after the first wave of obvious ones — usually 60-90 seconds in." }
      ],
      feel: "Feel the chord change in your body. Am is grounded, melancholic. G is open, bright. Your voice responds like a surfer to the wave.",
      wrong: "If you can't feel the change, sing only chord tones (A-C-E over Am, G-B-D over G) for 4 bars first. Primes the ear.",
      sarah: "Am-to-G is everywhere in the music you love. Allah-Las, Sublime, reggae — this two-chord world is a huge chunk of your playlist.",
      levelUp: "2-minute improv with audible chord awareness — phrases shift character with changes, some targeting chord roots."
    },
    {
      id: "v6e6", time: 3, title: "Call and Response — Pentatonic", type: "vocal",
      recorder: true,
      pitchContour: true,
      what: "Guitar plays a phrase, voice echoes it. Voice sings a phrase, guitar plays it back. Musical conversation in pentatonic — the oldest training method in blues and desert blues.",
      setup: "Guitar in hand. Am pentatonic position 1 (frets 5-8). Pitch Detector on.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 75,
      steps: [
        { text: "Guitar calls: play a 3-4 note pentatonic phrase. Voice responds: sing it back on 'dah'. Match pitch, rhythm, contour.", why: "Trains the ear-to-voice pathway via the arcuate fasciculus — the neural bundle connecting auditory and motor regions. Musicians who do call-and-response have measurably stronger connections." },
        { text: "Start simple: 2-3 stepwise notes. Gradually add skips, rhythmic variation, 4-5 note phrases.", why: "Progressive complexity follows learning scaffolding. Clean repetitions at each level build clean pathways before stepping up." },
        { text: "Reverse: voice calls on 'dah', guitar responds. Find the notes you sang on the fretboard.", why: "Voice-to-instrument is harder — guitar has multiple locations per pitch. But this builds the bridge needed for sing-and-play in later levels." },
        { text: "Speed up: echo within 1 beat instead of pausing to think.", why: "Shrinking response time shifts processing from deliberate analysis to reflexive pattern recognition — how real musical conversation works." },
        { text: "Twist: instead of echoing, respond with a CONTRAST. Call goes up, response goes down. Busy call, sparse response.", why: "Contrasting response needs comprehension plus transformation. Blues musicians call it 'answering' — acknowledging the call while adding something new." },
        { text: "8 bars of alternating exchanges, getting more adventurous each round.", why: "Evolving conversation is improvisation in its most natural form. By the eighth exchange, you'll play phrases you've never played before." },
        { text: "Record and listen: do phrases sound conversational? Is there logic connecting calls to responses?", why: "Coherence means your brain processes incoming phrases AND generates relevant responses simultaneously — true musical multitasking." }
      ],
      feel: "A conversation, not a test. Guitar speaks, voice answers. Play, curiosity, 'what happens if I say this?'",
      wrong: "Can't match vocally? Simplify to 2-note calls. Can't find your phrase on guitar? Sing slowly, search note by note.",
      sarah: "Call-and-response is how babies learn language, how West African musicians train, how jazz develops. The oldest pedagogy in human history. If it feels natural, that's because it is.",
      levelUp: "4 bars accurate call-response both directions plus 4 bars of contrasting responses."
    },
    {
      id: "v6e7", time: 4, title: "Pentatonic Improv Over Backing Tracks", type: "vocal",
      recorder: true,
      pitchContour: true,
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      what: "Improvise pentatonic vocals over real music — Khruangbin funk, desert blues, reggae. Start with long notes, build to rhythmic phrases. The sandbox becomes real music.",
      setup: "Backing tracks ready. Standing. Voice only, no guitar. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("A2", "A3"),
      steps: [
        { text: "Khruangbin Style 80. First 30 seconds: long sustained notes, 2-4 bars each. Pick notes that feel good over the groove.", why: "Long notes reveal how each pentatonic degree interacts with full harmonic texture. Sustained C over funk sounds different from sustained E. Extended listening develops real harmonic awareness." },
        { text: "Next pass: 1-bar notes, connected into 2-3 note phrases with space between.", why: "Short phrases are the shift from exploration to composition. Laura Lee's Khruangbin vocals work this way — carefully placed with generous space creating anticipation." },
        { text: "Desert Blues 75. Slower, more open. Stretch phrases. Try waves. Start on unexpected beats — beat 2, the 'and' of 3.", why: "Desert blues is the pentatonic's ancestral home. Rhythmic displacement creates the hypnotic quality of Tinariwen and Ali Farka Touré. Your brain reads displacement as mild surprise, releasing dopamine." },
        { text: "Reggae One Drop 85. Shorter, punchier phrases locked to the skank rhythm. Precise placement.", why: "Reggae vocals are fundamentally rhythmic. Marley's pentatonic power comes from placement. This integrates Level 4 rhythm with Level 6 melody." },
        { text: "Pick your favorite track: 2 minutes of continuous improv. Long notes, short phrases, patterns, silence, varied starts.", why: "Pattern vocabulary runs out at 45 seconds. After that, your brain generates genuinely new ideas. The most original ones come after the initial dump — when the prefrontal cortex loosens control." },
        { text: "Listen back. Note three moments: one great, one awkward, one surprising.", why: "Great shows strengths. Awkward shows edges. Surprising reveals unconscious instincts — often the most interesting choices." }
      ],
      feel: "Jamming with a band. The track is your bandmates — listen, respond, leave space. One voice in a conversation.",
      wrong: "Non-stop singing = monologue. Only 2-3 notes = return to drone exercise. Random sounding = anchor on root A, end on chord tones.",
      sarah: "This is where practice becomes play. Backing tracks plus pentatonic vocabulary equals making music, not practicing it. That distinction matters.",
      levelUp: "2-minute improv that sounds like a real vocal part — musical, spaced, groove-responsive."
    },
    {
      id: "v6e8", time: 3, title: "The Blue Note Addition", type: "vocal",
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      what: "Add the b5 (Eb in Am) to the pentatonic: A-C-D-Eb-E-G. Six notes, the blues scale. The blue note adds tension and color. Use sparingly — like hot sauce.",
      setup: "Guitar: Am pentatonic + Eb (fret 6 on A string). Hear the difference. Pitch Detector on.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 75,
      steps: [
        { text: "Straight pentatonic: A-C-D-E-G-E-D-C-A. Now with blue note: A-C-D-Eb-E-G-E-Eb-D-C-A. Feel the Eb crunch between D and E.", why: "D-Eb-E is a chromatic cluster — three half steps. This is the sound of the blues. Eb creates a tritone with root A, the interval medieval monks called 'the devil in music.' In blues, that edge is the point." },
        { text: "Sing D-Eb-E as a triplet, then E-Eb-D descending. The blue note is a brief visit — pass through, don't park.", why: "Power comes from brevity. Sustained Eb over Am sounds wrong; flicking through it sounds emotional. B.B. King bent through it in milliseconds. The touch is everything." },
        { text: "Over Deep Soul Groove 80, improvise pentatonic adding the blue note only 2-3 times per 4-bar phrase. Count them.", why: "Counting forces restraint. Overuse dilutes impact like a jump scare every 30 seconds. Limiting placement makes each blue note a compositional decision." },
        { text: "Try it as a vocal bend: slide from D through Eb to E, mimicking a guitar bend.", why: "The slide speed and curve become part of your signature sound. Ray Charles, Otis Redding, Cedric Burnside all bend differently — those differences make voices recognizable." },
        { text: "Placement matters: blue note on beat 1 is heavy and bold. On the 'and' of 2, it's slippery and subtle.", why: "Downbeat blue note = blues directness. Upbeat blue note = reggae playfulness. The choice connects the note to the genre." },
        { text: "Record 90 seconds over Deep Soul Groove using the full blues scale. Listen: emotional color or wrong note?", why: "The line between color and mistake is intention plus placement. Deliberate, well-timed blue notes add depth. Random, sustained ones sound wrong." }
      ],
      feel: "A secret spice. Not the meal — what elevates it. When you hit it right: slight gut tension, catch in the breath.",
      wrong: "Every phrase has a blue note? Pull back. Eb sounds off? Use Pitch Detector. The blue note is a specific pitch, not a sloppy zone.",
      sarah: "The blue note bridges pentatonic to blues scale, and from there to everything. Psych rock, desert blues, reggae, surf — they all use it. Once you can place it intentionally, you'll hear opportunities everywhere.",
      levelUp: "90-second blues scale improv where blue notes sound intentional and add depth."
    },
    {
      id: "v6e9", time: 3, title: "Pentatonic + Rhythm Integration", type: "vocal",
      recorder: true,
      pitchContour: true,
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }
      ],
      what: "Pentatonic melodies plus Level 4 rhythmic skills. Offbeat pentatonic. Behind-the-beat. Call-and-space with pentatonic phrases. Rhythm + melody = real improvisation.",
      setup: "Backing tracks ready. Voice only. Pitch Detector on.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 85,
      steps: [
        { text: "Reggae One Drop 85: sing 3-4 note pentatonic phrases placing every note on offbeats. Tap foot on downbeats.", why: "Offbeat singing requires dual processing: rhythmic grid in the foot, melodic content between grid points. This is how reggae vocals work — floating above the riddim." },
        { text: "Same track: pentatonic phrases behind the beat. Each note slightly late. DOPE LEMON's sleepy delivery.", why: "Behind-the-beat is micro-timing. Angus Stone sits 20-50ms late, creating dreaminess. Listeners rate this as 'more groovy' even without identifying the timing." },
        { text: "Call-and-space: 2-bar pentatonic phrase, 2-bar rest. Silence as intentional as singing.", why: "The 2-bar rest lets listeners absorb, gives you planning time, and creates anticipation. Silence after a phrase activates auditory cortex MORE than continuous sound." },
        { text: "Combine: offbeat call (2 bars), rest (2 bars), behind-the-beat response (2 bars), rest (2 bars).", why: "Switching rhythmic modes while maintaining melody strengthens cognitive flexibility — the brain skill that predicts improvisational quality." },
        { text: "Switch to Surf Rock 120. More notes, tighter placement, less space. Same pentatonic, different energy.", why: "Genre adaptation tests flexibility. If you can only improvise at 85 BPM reggae, the skill is context-dependent. The pentatonic stays constant while everything else changes." },
        { text: "Alternate tracks every 8 bars: reggae (offbeat, spacious) → surf rock (tight, rhythmic). Pentatonic throughout.", why: "Rapid genre switching is the ultimate integration test. When rhythm and melody truly integrate, you can walk into any jam and contribute." },
        { text: "Record the alternation. Listen: does your voice sound different over each genre? Same notes, different feel = style.", why: "Style lives in rhythmic framework, not notes. Two singers with identical pitches sound like different genres based on timing alone." }
      ],
      feel: "Rhythm and melody as one thing. When they integrate, it's 'saying something musical' rather than 'singing notes in a rhythm.'",
      wrong: "Offbeats pulling you off pitch? Separate skills: clap rhythm without pitch, then pitch without rhythm, then combine. Tempo changes hard? More time at each before switching.",
      sarah: "Levels 4 and 6 merge here. A note without rhythm is a pitch. Rhythm without notes is a beat. Together — music.",
      levelUp: "Pentatonic improv over both reggae and surf rock with audible stylistic adaptation."
    },
    {
      id: "v6e10", time: 3, title: "Vocal-Guitar Pentatonic Unison", type: "vocal",
      recorder: true,
      pitchContour: true,
      what: "Sing pentatonic phrases while playing them on guitar simultaneously. Then try singing one phrase while playing another. Builds toward Level 10 sing-and-play.",
      setup: "Guitar in hand. Am pentatonic position 1 (frets 5-8). Pitch Detector on. 60 BPM.",
      referencePitches: getPitchRange("A2", "G3"),
      metronome: 60,
      steps: [
        { text: "Play Am pentatonic ascending on guitar while singing each note in unison. One note per beat, 60 BPM.", why: "Simultaneous commands to larynx and hands at the same pitch. This engages the supplementary motor area — guitarists who sing have measurably larger ones." },
        { text: "Descend in unison: G-E-D-C-A. Then full ascend-descend as one phrase.", why: "Descending unison is harder — guitar hand direction feels counterintuitive to vocal descent. Trains separation of 'pitch direction' from 'hand movement.'" },
        { text: "Play a 4-note pentatonic phrase on guitar and sing it simultaneously. Repeat 4 times until locked.", why: "Phrases add intent: contour, rhythm, personality. Singing in unison means matching timing and dynamics — the tight coordination of Jack Johnson." },
        { text: "Build a vocabulary: 4-5 different unison phrases you can play and sing without thinking.", why: "Each phrase is a new multi-motor program. Five reliable phrases matches working memory capacity and gives material for mixing and matching." },
        { text: "Independence: play repeating A on guitar (quarter notes), voice sings pentatonic freely.", why: "First independence step. A drone needs minimal hand attention, freeing resources for voice. Feels strange — your brain wants to synchronize mouth and hand." },
        { text: "Harder: strum Am-G pattern (one per bar) while singing a different pentatonic melody.", why: "Real sing-and-play. Two separate motor programs maintained simultaneously. At first one task suffers — usually guitar simplifies. Both become semi-automatic with practice." },
        { text: "Record one attempt at each: unison, drone independence, chord independence. What's comfortable vs. stretch?", why: "Most are comfortable with unison, challenged by drone, barely functional with chords. Normal — full independence takes months." }
      ],
      feel: "Unison = superpower. Voice and guitar fused into one thick sound. Independence = musical head-patting and belly-rubbing. The strain is new pathways forming.",
      wrong: "Sloppy unison? 50 BPM. Independence causing stop-starts? Simplify guitar to muted strums. Two streams matter more than complexity.",
      sarah: "This previews Level 10. Don't stress independence — it's supposed to be hard. Unison is the priority. Syncing voice and guitar on pentatonic phrases is a real coordination achievement.",
      levelUp: "Clean unison phrases plus at least one basic independence attempt (drone + moving voice)."
    },
    {
      id: "v6e11", time: 4, title: "Level Integration — 3-Minute Pentatonic Solo", type: "vocal",
      recorder: true,
      pitchContour: true,
      volumeMeter: true,
      tracks: [
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }
      ],
      what: "Full 3-minute pentatonic vocal solo over a backing track. Everything: patterns, blue note, rhythm, dynamics, space. Record it. Your first real vocal improvisation — a performance, not an exercise.",
      setup: "Pick Desert Blues 75 or Khruangbin Style 80. Standing. No guitar. Pitch Detector + Volume Meter on.",
      referencePitches: getPitchRange("A2", "A3"),
      steps: [
        { text: "30 seconds: breathe, set an emotional intention — 'meditative,' 'journey,' 'longing.' Not a plan. Press record.", why: "Emotional intention activates the limbic system before performance, guiding decisions below conscious awareness. fMRI shows intention-setting produces more coherent improvisations." },
        { text: "Minute 1: Simple. Long notes, short phrases, lots of space. Enter like joining friends mid-conversation.", why: "Gradual entry creates a dynamic arc and lets your brain sync with the track. The first minute is calibration — mapping harmony, tempo, tonal center. Experienced improvisers always start simple." },
        { text: "Minute 2: Build. More notes, patterns, a blue note or two. Push the range. Intensity increases.", why: "Your brain has mapped the territory and feels safe enough for risks. Risk-taking correlates with reduced dorsolateral prefrontal activity — the inner critic quiets as you settle into the groove." },
        { text: "Around 2:30: Peak moment. Highest note, most density, most intensity. Build to it, then pull back immediately.", why: "The climax at ~83% through follows music's golden ratio. Research shows late peaks are rated most satisfying — earned by everything before them." },
        { text: "Minute 3: Wind down. Simpler, shorter, quieter, more space. End on sustained A fading to silence.", why: "Mirrors the opening, creating symmetry. Root ending provides harmonic resolution. The fade is more powerful than a stop — it gives the ear time to transition." },
        { text: "Before listening back: rate the experience. Flow moments? Panic? Times you forgot you were practicing?", why: "Flow — complete absorption — occurs when challenge matches skill. If you felt flow, these exercises hit the mark. Panic means the challenge was high — valuable data either way." },
        { text: "Listen to the full recording. Don't judge — observe. Beginning, middle, climax, resolution? Any phrases worth stealing for a song?", why: "Uncomfortable moments often sound most interesting on playback — discomfort means risk, and risk makes music compelling. This teaches you to trust risk-taking over comfort-seeking." },
        { text: "Repeat the v6e0 diagnostic: 60 seconds free over a drone, rate comfort 1-5. Compare to your opening score.", why: "Bookend comparison shows transformation: from 'a scale I know' to 'a vocabulary I use.' The shift is usually dramatic even in one session." }
      ],
      feel: "A performance, not an exercise. Exercises are about getting right; performances are about communicating. Nervous pressing record? Good — you're treating it as real.",
      wrong: "3 minutes felt empty? Back to exercises 4-8, build vocabulary first. Couldn't stop singing? Practice silence — space is a skill, not a deficit.",
      sarah: "Everything in this level built toward these 3 minutes. And this is just the first one. Each repetition deepens your relationship to the pentatonic. The first time is hardest and most important. After this, you know you can improvise. That changes everything."
    },
    {
      id: "v6e12", time: 7, title: "Pentatonic Siren in Three Keys", type: "vocal",
      drone: { root: "A", octave: 2, texture: "analog" },
      recorder: true,
      pitchContour: true,
      referencePitches: getPitchRange("A2", "A4"),
      metronome: 80,
      what: "The same pentatonic improvisation skills you've built in Am — now applied in E major and A major. Same melodic principles, completely different notes. This cross-key practice builds key-independent pentatonic fluency through contextual interference (Stambaugh 2009). Your ear learns that 'pentatonic' is a PATTERN that works in any key, not a specific set of notes tied to Am. Let your body sway with each key's groove — movement helps your voice find the new pitch center.",
      setup: "Guitar for drone reference. Pitch Detector on. Metronome at 80 BPM.",
      steps: [
        { text: "Am pentatonic siren (2 min): sing A-C-D-E-G ascending and descending, then improvise freely. This is your comfort zone — let it flow. Feel the Am pentatonic in your body: where does it resonate? What's your natural phrasing?", why: "Starting in Am grounds you before the key switches. Your Am pentatonic is deeply automated — the improvisation should feel effortless. This effortlessness is the benchmark you're building toward in other keys." },
        { text: "E major pentatonic siren (2 min): switch drone to E. Sing E-F#-Ab-B-C# ascending and descending, then improvise. Ab (which musicians call G#) and C# are notes that don't exist in Am — your voice must find entirely new targets. Let your body adjust: stand differently, breathe differently. Each key has its own physical signature.", why: "E major pentatonic engages different vocal muscles than Am because the pitch center is different. The notes Ab and C# require different laryngeal configurations than C and G. This physical difference is what the research calls 'key-specific vocal production' — and it's why cross-key practice matters for singers, not just instrumentalists." },
        { text: "A major pentatonic siren (2 min): switch drone to A (major, not minor). Sing A-B-C#-E-F# ascending and descending, then improvise. Same ROOT as Am but completely different color notes. C# replaces C — the 'happy/sad' toggle. Notice how your voice opens up in major.", why: "A major vs Am is the most direct comparison of major vs minor vocal production. Same home note, different emotional world. Your vowels may naturally brighten in A major — let them. The voice responds to harmonic context physically, not just emotionally." },
        { text: "Three-key roulette: 30 seconds in each key, switching randomly. Am → E major → A major → Am → E major. Don't prepare for the switch — just jump. The faster the switches, the better the contextual interference. Record the whole thing.", why: "Random key switching under time pressure forces your auditory-motor system to reconfigure rapidly. This is maximum contextual interference — and research consistently shows it produces the most durable learning, even though it feels harder than blocked single-key practice." },
        { text: "Self-assessment: listen to the recording. Rate your fluency 1-5 in each key. In which key does your improvisation sound most musical? Most hesitant? The weakest key is tomorrow's practice priority. Over weeks, the gap between your strongest and weakest key will close — that's key independence developing.", why: "Structured self-assessment with comparative criteria accelerates improvement. The 2021 Springer study on musical retention found that deliberate evaluation during playback strengthens both memory and self-correction instincts." }
      ],
      feel: "Am should feel like home. E major should feel like visiting a friend's house — familiar concept, different furniture. A major should feel like Am with the lights turned on. Each key has its own personality, and your voice should respond differently to each.",
      wrong: "If you're singing Am notes (C natural, G natural) over the E major drone, the clash will be audible. Use the drone as your guide — if it clashes, you're in the wrong key. Slow down and sing the pentatonic scale ascending before improvising. Build the new key's map first.",
      sarah: "Gene, this is where your pentatonic skills become truly portable. You've built deep Am fluency — now you're proving those skills work in any key. When all three keys feel equally comfortable, you can improvise over any song, in any key, with pentatonic confidence.",
      levelUp: "3-minute improvisation with a discernible arc, 4+ pentatonic notes plus blue note, rhythmic and melodic variety. Sounds like music, and improvise fluently in three pentatonic keys (Am, E major, A major) with cross-key switching."
    }
  ]
};
