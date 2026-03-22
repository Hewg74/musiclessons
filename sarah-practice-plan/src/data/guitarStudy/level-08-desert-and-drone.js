import { getPitchRange } from "../appData.js";

export const level8 = {
  level: 8,
  title: "Desert & Drone",
  subtitle: "Hypnotic repetition. Patience as a technique. The Sahara in your fingers.",
  description:
    "Desert blues comes from the Sahara — Tinariwen, Bombino, Ali Farka Touré, Mdou Moctar, Vieux Farka Touré. It uses a 'sus pentatonic' scale (a Western approximation of Tuareg guitar modes, replacing the minor 3rd with a 2nd), drone strings, and hypnotic repetition to create trance-like music. Drop D tuning gives you the deep bass drone that anchors everything. This level teaches patience as a musical technique, and formalizes PReVaDe as your motif development framework for desert improvisation.",
  artists: "Tinariwen, Bombino, Ali Farka Touré, Mdou Moctar, Vieux Farka Touré",
  unlocks: "Extended Harmony (Level 9)",
  review: { label: "Level 7 Check-In", time: 5, exercises: ["gs-7-1", "gs-7-10"], prompt: "Play the SoCal switch: 4 bars clean skank → 4 bars power chords (gs-7-1). Then play your extended reggae-rock jam (gs-7-10). Ready to slow way down? The desert demands patience." },
  exercises: [
    {
      id: "gs-8-1",
      time: 8,
      title: "Sus Pentatonic — One Note Different",
      type: "guitar",
      what: "Learn the sus pentatonic scale: A-B-D-E-G. It replaces the minor 3rd (C) from the regular Am pentatonic with the 2nd (B). One note difference creates a completely different world — floating, ambiguous, neither major nor minor. Note: this is a Western approximation of Tuareg guitar scales. The actual Tinariwen sound comes from minor pentatonic played over drone strings, creating a suspended quality. The 'sus pentatonic' label is a useful teaching shorthand.",
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      speedLadder: { start: 60, end: 90, increment: 10, bars: 4 },
      steps: [
        { text: "Play Am pentatonic: A-C-D-E-G. Now replace C with B: A-B-D-E-G. Play both scales back to back and listen to the difference.", why: "Hearing the two scales side by side reveals how much one note changes the entire character. C is the minor 3rd — dark, bluesy, definitive. B is the 2nd — open, ambiguous, floating." },
        { text: "Play A-B-D-E-G ascending and descending in the 5th fret position. Find the shape — it's close to your pentatonic but the 2nd finger moves one fret down (from the 8th fret on the B string to the 7th).", why: "The new shape is almost the same as pentatonic, which means your fingers will try to play the old pattern. Be deliberate about the B." },
        { text: "Emphasize the B note — land on it, hold it, let it ring. This is the note that defines the desert sound.", why: "The 2nd (B in Am) creates harmonic ambiguity — is this major or minor? Neither. It's floating. That ambiguity is the desert blues feel." },
        { text: "Improvise with just A, B, and D. Three notes. One minute. See how much music you can make with almost nothing.", why: "Desert blues is built from minimal materials used with maximum patience. Less is the whole point." }
      ],
      feel: "The sus pentatonic should feel open and spacious — like standing in a vast landscape with nothing blocking the horizon. It's neither happy nor sad, just vast.",
      wrong: "If it sounds like regular pentatonic, you're playing C instead of B. If it sounds too bright, you might be playing a major scale. The sus pentatonic should feel ambiguous and floating — not cheerful, not mournful.",
      sarah: "Gene, one note is the difference between Mississippi Delta blues and Saharan desert blues. Same guitar, same technique, completely different emotional world. Tinariwen's Nànnuflày — which is on your playlist — lives in this scale. That floating, hypnotic quality? It starts right here with the B replacing the C.",
      metronome: 60,
      levelUp: "Play A sus pentatonic (A-B-D-E-G) ascending and descending at 70 BPM in the 5th fret position without accidentally playing C (the minor 3rd), and improvise a 1-minute passage using only A, B, and D."
    },
    {
      id: "gs-8-2",
      time: 10,
      title: "Drop D Drone Setup",
      type: "guitar",
      what: "Tune your low E string down one whole step to D (Drop D tuning). This gives you a deep bass drone that anchors desert blues melodies. Important: Drop D changes the fret positions on the 6th string — every note is now 2 frets higher than in standard tuning. When you're done, you'll learn how to tune back.",
      setup: "Tuner recommended. You can also tune by ear: play the 4th string (D) and tune the 6th string down until they match, one octave apart.",
      steps: [
        { text: "Tune the low E string down to D. Pick it alongside the open D string (4th string) — they should sound like the same note, one octave apart. If you have a tuner, watch it go from E to D as you loosen the string.", why: "Drop D gives you a deep, powerful bass drone. Ali Farka Touré used modal open tunings with drone strings to mirror the sound of the njarka (single-string fiddle) and ngoni (West African lute) — instruments where a drone is built into the design. By retuning one string, you're adapting the guitar to a tradition where the instrument provides its own harmonic anchor." },
        { text: "IMPORTANT: In Drop D, every fret on the 6th string is shifted. What used to be the 2nd fret (F#) is now E. The 3rd fret (used to be G) is now F. The 5th fret is now G (was A in standard). When you see fret numbers for the 6th string in this level, they refer to Drop D positions.", why: "Understanding the shift prevents confusion. All other strings remain unchanged — only the 6th string moves." },
        { text: "Let the low D ring open while you play the sus pentatonic on the top 3 strings. Alternate: pluck the bass, then a melody note. Bass-melody-melody-bass-melody-melody.", why: "Bass drone + melody is the core texture of desert blues. One guitar sounds like two instruments." },
        { text: "Experiment with fingerpicking: use your thumb for the bass drone and your index and middle fingers for melody notes. The bass should ring continuously underneath.", why: "Fingerpicking or hybrid picking lets you maintain the drone continuously. The bass never stops — it's the heartbeat of the piece." },
        { text: "To return to standard tuning when you're done: tighten the 6th string back up until your tuner reads E, or until the 6th string open matches the 5th fret of the A string. Always retune before moving to non-desert-blues exercises.", why: "Leaving the guitar in Drop D will make everything else you play sound wrong. Build the habit of tuning back to standard when you finish desert blues practice." }
      ],
      feel: "The drone should feel like a heartbeat underneath the melody — steady, constant, grounding. The melody floats above it like heat shimmer over sand.",
      wrong: "If the bass drone overpowers the melody, play the bass string more softly. If the melody notes are unclear, make sure you're fretting cleanly on the upper strings. If you forget to tune back afterward and your other playing sounds strange, check your 6th string.",
      sarah: "Gene, the drone is not background — it's the foundation that makes the melody meaningful. Without it, the melody floats aimlessly. With it, every note has context. Ali Farka Touré said the blues came from Africa — this Drop D drone is your portal to that origin point.",
      metronome: 75,
      levelUp: "Tune to Drop D, play a bass-melody-melody alternating pattern (thumb on 6th string, fingers on top 3 strings) with the sus pentatonic for 2 minutes — drone never drops out — then tune back to standard within 30 seconds."
    },
    {
      id: "gs-8-3",
      time: 5,
      title: "Rhythm Drone",
      type: "guitar",
      what: "Play ONLY the open D drone string (Drop D tuning). No melody, no chords — just one bass string. All expression comes from rhythm: when you strike it, how hard, how long you let it ring, and how much silence you leave. Make the drone groove.",
      steps: [
        { text: "Strike the open D string once per bar on beat 1. Let it ring for the full bar. 8 bars of this — one note, one hit, total patience.", why: "One strike per bar forces patience. The drone's sustain fills the space. This is the desert blues aesthetic: less is everything." },
        { text: "Now strike on beats 1 and 3. Two hits per bar. Feel how doubling the frequency changes the energy — from meditative to pulsing.", why: "Adding one hit per bar doubles the energy. In desert blues, this kind of density change is a huge arrangement move." },
        { text: "Try the 'heartbeat' pattern: two quick strikes close together (beats 1 and the 'and' of 1), then silence for the rest of the bar. The drone has a pulse.", why: "The heartbeat pattern mimics the human pulse. It's the most primal rhythm — used by Tinariwen when they let the bass drone carry the feel." },
        { text: "Freestyle: 2 minutes of one-string rhythm improv. Mix all three patterns — single hits, double hits, heartbeats, silence. Record yourself.", why: "One string with great rhythm creates a complete musical experience. This proves the same lesson as the one-note groove from earlier levels, but in a completely different sonic world." }
      ],
      feel: "The drone should feel like a heartbeat or a distant drum — steady, alive, and deeply grounding. When you add silence between hits, the anticipation is the music.",
      wrong: "If it sounds random, commit to one pattern for 4 bars before switching. If it sounds boring, you're not using enough silence — silence creates anticipation.",
      sarah: "Gene, this is the deepest rhythm-first exercise in the curriculum. One string, no notes, pure rhythm. Tinariwen's bassists play like this — one note, infinite groove. Desert patience IS rhythmic mastery. If you feel bored, that's the exercise working — push through. The trance state lives on the other side.",
      metronome: 75,
      recorder: true,
      rhythmCells: [
        { name: "Desert Pulse", pattern: [2], description: "One hit per 2 beats" },
        { name: "Heartbeat", pattern: [0.5, 1.5], description: "Quick double then space" },
        { name: "Walking", pattern: [1, 1], description: "Steady on beats 1 & 3" }
      ],
      levelUp: "Play 2 minutes of one-string (open D) rhythm improv mixing single hits, heartbeat doubles, and deliberate silences — with a clear groove that a listener could nod along to, confirmed by recording."
    },
    {
      id: "gs-8-4",
      time: 10,
      title: "Hypnotic Repetition",
      type: "guitar",
      recorder: true,
      what: "Choose a 4-note phrase from the sus pentatonic. Repeat it 16 times without variation. Only then, change one note. This exercise teaches patience and reveals the trance power of repetition — the core of desert blues. Sleep tip: if you can't nail the exact repetition after 10 minutes, stop and try tomorrow — your brain consolidates motor patterns during sleep.",
      steps: [
        { text: "Choose any 4 notes from the sus pentatonic (A-B-D-E-G). Play them as a short phrase with a simple rhythm. This is your motif.", why: "The motif doesn't need to be clever. Simple phrases become hypnotic through repetition. Complex phrases become exhausting." },
        { text: "Repeat your motif 16 times. Same notes, same rhythm, same dynamics. No variation. Count each repetition on your fingers if needed.", why: "Tinariwen's hypnotic quality comes from timbral consistency plus groove, not harmonic complexity — the same phrase played with the same tone and touch creates a trance state that variation would destroy. Neuroscience research on musical entrainment shows that steady repetition synchronizes brainwave patterns with the rhythm, producing a meditative state after roughly 8-12 cycles. Repetition is the technique; patience is the skill." },
        { text: "On repetition 17, change exactly one note. Listen to how enormous that tiny change feels after 16 repetitions of the same thing.", why: "After 16 repetitions of the same phrase, a single changed note sounds like a revelation. This is the power of patience." },
        { text: "Repeat the new phrase 8 times. Then change another note. Build a piece that evolves glacially over 10 minutes.", why: "Glacial evolution creates narrative without drama. The listener is drawn in by subtlety, not spectacle." }
      ],
      feel: "By repetition 10 or so, you should enter a mild trance state — the phrase plays itself, your mind quiets, and you hear harmonics and overtones you never noticed. This is the meditative power of repetition.",
      wrong: "If you get bored and change the phrase early, you haven't committed to the process. The boredom is the point — push through it and something shifts. If the phrase is too complex to repeat exactly, simplify it.",
      sarah: "Gene, Tinariwen can play the same riff for 10 minutes and it gets MORE interesting, not less. The secret is that repetition reveals depth. Each cycle, you hear something new in the same notes. Nànnuflày on your playlist does exactly this — listen to how the guitar riff barely moves for the entire song, and yet it's endlessly compelling.",
      metronome: 75,
      phraseForm: { pattern: ["Motif", "Vary1", "Vary2", "Dissolve"], barsPerSection: [16, 8, 8, 8], labels: { Motif: "Original x16", Vary1: "Change 1 Note", Vary2: "Change Another", Dissolve: "Return to Drone" } },
      levelUp: "Play a 4-note sus pentatonic motif 16 times identically, then change exactly one note on repetition 17 — where the single change is audibly dramatic against the established pattern, confirmed by recording playback."
    },
    {
      id: "gs-8-5",
      time: 8,
      title: "Drone Motif Development (PReVaDe)",
      type: "guitar",
      what: "Take your hypnotic 4-note phrase from gs-8-4 and apply PReVaDe — the motif development framework you first encountered in Level 3. Present your motif 8 times, then Repeat with one note changed, then Vary by reversing direction, then Deconstruct back to the drone. This is PReVaDe applied to desert blues — glacial variation with intention.",
      setup: "Drop D tuning if available. Clean tone, slight reverb.",
      steps: [
        { text: "Choose a 4-note sus pentatonic phrase from gs-8-4 (or create a new one). Play it with the A string drone 8 times. No variation. Commit to the repetition. This is PReVaDe's PRESENT phase.", why: "The exact repetition baseline proves you can hold a phrase with discipline. Desert blues demands patience. Present establishes the theme before any development begins." },
        { text: "Repetition 9: change one note. If your phrase was A-B-D-E, try A-B-D-G. One note changed. Repeat this new version 8 times. Listen to how enormous that tiny change feels. This is the REPEAT/VARY boundary — you're declaring the variation.", why: "This is PReVaDe 'Vary' applied to desert blues. The ratio of 8 repetitions to 1 change is extreme — that's what makes it meaningful." },
        { text: "Repetition 17: reverse the direction of your phrase. If it ascended (A-B-D-E), now descend (E-D-B-A). Keep the same rhythm. Repeat 8 times. This is still the VARY phase — inversion is a variation technique.", why: "Reversing direction is inversion — preserves interval content while changing melodic direction. Creates a mirror effect." },
        { text: "Repetition 25: DECONSTRUCT. Fragment to just the first 2 notes. Repeat as a short ostinato. Then just 1 note with the drone. Then just the drone alone. The piece dissolves back to its origin.", why: "Deconstruction back to the drone creates a full arc: complexity from simplicity, returning to it. This is the complete PReVaDe cycle applied to desert blues — a framework you'll use in every genre going forward." }
      ],
      feel: "Each variation should feel significant because of the patience that preceded it. The full arc should feel like a slow sunrise — gradual, inevitable, complete.",
      wrong: "If you changed the phrase before completing 8 repetitions, you short-circuited the process. The patience IS the technique.",
      sarah: "Gene, Tinariwen does this intuitively — a phrase repeats until it transforms. You're learning the structure behind their intuition. PReVaDe gives you a framework for what desert blues musicians do by feel: present an idea, let it breathe, vary it minimally, and let it dissolve. This patience will be your secret weapon in every genre.",
      metronome: 75,
      recorder: true,
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      referencePitches: getPitchRange("A3", "E4"),
      phraseForm: { pattern: "PRVD", barsPerSection: 8, labels: { P: "Present x8", R: "Vary x8", V: "Reverse x8", D: "Fragment x8" } },
      levelUp: "Perform a full PReVaDe cycle over a drone: Present 8x, Vary (one note changed) 8x, Reverse direction 8x, Fragment to 2 notes then 1 note then drone alone — with no variation step containing more than one changed element."
    },
    {
      id: "gs-8-6",
      time: 10,
      title: "Drone + Melody — The Communal Guitar",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "In Tinariwen, two guitarists play interlocking parts: one holds a rhythmic drone, the other plays melody. On one guitar, you can simulate this by letting one string drone open while picking melody on adjacent strings. This is the communal approach reduced to one instrument.",
      setup: "Drop D tuning. Clean tone, slight reverb.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Put on Desert Blues 75. Let the open A string (5th string) ring as a continuous drone. While it sustains, play sus pentatonic melody notes on the D and G strings (4th and 3rd strings). Alternate between plucking the drone and picking melody.", why: "The A drone creates a harmonic anchor. Every melody note you play is heard in relation to that open A — some notes feel resolved, others feel suspended. This relationship is the essence of the Tuareg sound." },
        { text: "Try a simple interlocking pattern: drone (A string) on beats 1 and 3, melody notes on beats 2 and 4. Keep the drone steady — it's the unchanging voice. The melody is the voice that moves.", why: "Separating drone from melody onto different rhythmic positions creates the illusion of two guitarists. Your right hand alternates between bass string and melody strings." },
        { text: "Now add the low D drone (6th string, Drop D) on beat 1, the A drone on beat 3, and melody on beats 2 and 4. Two drone pitches create a richer foundation.", why: "D and A together form a power chord drone — root and fifth. This two-note foundation is the most stable harmony in music, giving the melody complete freedom." },
        { text: "Play for 5 minutes. Keep the drone pattern absolutely steady. Let the melody evolve slowly — change one note every 30 seconds. The drone is the earth; the melody is the wind.", why: "The discipline of maintaining the drone while developing the melody is the technical challenge. The musical reward is a rich, layered sound from one guitar." }
      ],
      feel: "You should feel like two musicians — one holding down the foundation, one exploring above it. When the drone and melody lock together, the guitar resonates in a way that single-line playing never achieves.",
      wrong: "If the drone keeps dropping out, your right hand isn't returning to the bass strings consistently. Practice the bass pattern alone until it's automatic before adding melody. If the melody and drone clash, stick to sus pentatonic notes — they're designed to float over drones.",
      sarah: "Gene, in Tuareg culture, guitar is communal — multiple players interlock to create the trance. You're channeling that tradition through one instrument. When you watch live Tinariwen footage, you'll see two or three guitarists locked into interlocking patterns — each player has a role, and nobody solos. The drone is not just a technique — it's a philosophy. Some things hold steady so other things can move.",
      metronome: 75,
      volumeMeter: true,
      levelUp: "Play drone + melody for 5 minutes in Drop D: low D drone on beat 1, A drone on beat 3, sus pentatonic melody on beats 2 & 4. The drone pattern stays rock-steady throughout while the melody evolves by one note every 30 seconds."
    },
    {
      id: "gs-8-7",
      time: 5,
      title: "Desert Recovery",
      type: "guitar",
      what: "While playing sus pentatonic over the drone, occasionally slip and play C (the minor 3rd from Am pentatonic) instead of B (the 2nd from sus pentatonic). Then recover: bend the C down toward B (a quarter-tone bend recovery), or repeat the C 3 times to make it 'blues' before returning to sus pentatonic. The 'wrong' note becomes a genre bridge.",
      steps: [
        { text: "Play a sus pentatonic phrase over the desert drone: A-B-D-E-G. After 4 bars, 'slip' and play C instead of B. Let the C ring — it changes the color from desert to blues instantly.", why: "C vs. B is a one-fret difference with a massive mood shift. C is the minor 3rd (blues/sadness). B is the 2nd (openness/desert). Hearing the contrast is ear training." },
        { text: "RECOVERY MOVE 1 — THE QUARTER-TONE BEND: bend the C slightly toward B (not a full half-step, just a quarter-tone). The note hovers between blues and desert — this is the sound of Tinariwen, who live between Western and non-Western tuning.", why: "Quarter-tone recovery is unique to desert blues. Instead of fixing the 'wrong' note, you land in the space between the two scales. This is where the genre's magic lives." },
        { text: "RECOVERY MOVE 2 — THE BLUES COMMITMENT: play C three more times with conviction. You've shifted from desert to blues — own it. Play a blues phrase (A-C-D-Eb-E), then gradually drift back to sus pentatonic (A-B-D-E-G).", why: "Committing to the 'wrong' scale and then drifting back creates a musical moment. The blues detour becomes a feature — a genre modulation within one solo." },
        { text: "Improvise for 2 minutes with intentional C/B slips every 30 seconds. Alternate recovery moves. Record yourself.", why: "Practicing both recoveries builds a toolkit. When a real slip happens, you have two musical responses instead of panic." }
      ],
      feel: "The C/B slip should feel like stepping between two worlds — blues and desert. Both recoveries are valid; both create interesting music. There is no wrong choice, only different colors.",
      wrong: "If the quarter-tone bend overshoots into a full half-step, you've gone too far — the bend should hover, not resolve. If the blues commitment sounds jarring, spend more bars in blues before drifting back.",
      sarah: "Gene, this is the most musically interesting recovery exercise in the curriculum. The 'wrong' note (C) isn't wrong — it's the blues scale. You're learning to navigate between two scales in real time. Ali Farka Touré did this constantly — hovering between the Saharan sound and the blues. It's not a mistake, it's a technique.",
      metronome: 75,
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      recorder: true,
      pitchContour: true,
      referencePitches: ["B3", "C4"],
      levelUp: "During a 2-minute desert improvisation, execute 4 intentional C/B slips — recovering 2 with quarter-tone bends and 2 with blues-commitment phrases — where each recovery sounds musical, not corrective."
    },
    {
      id: "gs-8-8",
      time: 10,
      title: "Quarter-Tone Bends — Between the Notes",
      type: "guitar",
      recorder: true,
      what: "Bend between the 2nd and the minor 3rd (B and C in Am) — a quarter-tone bend that lands between Western pitches. This microtonal space is where Tuareg guitar imitates the human voice. A quarter-tone bend means bending halfway to the next fret — not a half-step, not staying put, but right in the middle. Sleep tip: quarter-tone accuracy improves dramatically overnight — your ear calibrates during rest.",
      steps: [
        { text: "Fret B (7th fret, high E string). Bend it up, but only halfway to C (8th fret pitch). Stop in the zone between the two notes. This is a quarter-tone — a pitch that doesn't exist on piano.", why: "Quarter-tone bends exist outside Western tuning. They create an 'in-between' pitch that sounds vocal and haunting. This is how Tuareg guitarists make the instrument sing like a voice." },
        { text: "Practice finding the quarter-tone consistently. Bend to it, hold it for 2 beats, release. The pitch should be 'wrong' by Western standards but 'right' by feel — it should sound like someone's voice wavering.", why: "Training your ear to recognize quarter-tones opens a whole dimension of expression that most Western guitarists never access." },
        { text: "Use the microtonal bend in a sus pentatonic phrase: A-B(bend slightly toward C)-D-E. The bent B floats between the 2nd and minor 3rd — between desert and blues territory.", why: "In context, the microtonal bend adds a vocal, crying quality that straight notes can't achieve. It's the emotional heart of desert blues guitar." },
        { text: "Try microtonal bends on different strings and fret positions. The B string requires more pressure to bend. The high E bends easily. The G string (wound) bends differently again. Each string needs its own muscle memory.", why: "String thickness and fret position change how much pressure a quarter-tone requires. Your fingers need to calibrate for each string." }
      ],
      feel: "A good microtonal bend should sound like a voice — not quite one note, not quite another, but a human sound in between. It should make you feel slightly uncomfortable in a beautiful way.",
      wrong: "If the bend goes all the way to C, you've overshot — that's a regular half-step bend. If it doesn't move at all, you need more pressure. The quarter-tone is a very specific, very small movement. Use the 8th fret pitch as your ceiling — stop halfway there. Most beginners under-bend at first, then over-correct — aim for the middle.",
      sarah: "Gene, microtonal bending is what separates guitar from piano. The piano can only play the notes that exist. Guitar can play the spaces between. Bombino and Mdou Moctar use these bends constantly — their guitar cries like a voice. When you nail this bend, you'll hear it in every Tinariwen and Bombino track on your playlist.",
      metronome: 75,
      referencePitches: ["B3", "C4"],
      pitchContour: true,
      levelUp: "Consistently land a quarter-tone bend between B and C (7th fret high E string) — holding it for 2 beats without overshooting to C or falling back to B — on 4 out of 5 attempts, verified by the pitch contour display."
    },
    {
      id: "gs-8-9",
      time: 12,
      title: "Song Study: Tinariwen Nànnuflày Style",
      type: "guitar",
      songRef: {
        title: "Nànnuflày — Tinariwen",
        src: "/nannuflay.mp3",
        note: "Desert blues — repetitive, trance-inducing. Listen for the sus pentatonic patterns over the drone."
      },
      recorder: true,
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      what: "Build a hypnotic interlocking guitar pattern inspired by Tinariwen's 'Nànnuflày.' Drop D drone bass, repetitive sus pentatonic melody, glacial evolution. Two voices from one guitar — this is a complete desert blues piece.",
      setup: "Drop D tuning. Clean tone, slight reverb.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Low D drone: let the open 6th string (D in Drop D) ring on beats 1 and 3. This is constant throughout — it never stops. It is the earth.", why: "The drone is the foundation that makes the melody meaningful. Every note above it is heard in relation to this low D." },
        { text: "On beats 2 and 4, play a 2-note melody on the high E and B strings using the sus pentatonic. Start with just E and B — simple, patient, repeating.", why: "The melody is the voice that speaks over the drone. Simple melodies become profound through repetition." },
        { text: "Put on Desert Blues 75 and play this bass-melody pattern for 3 minutes straight without variation. Let the pattern become automatic so your conscious mind can relax.", why: "The hypnotic quality only emerges after the pattern is completely internalized. Your conscious mind relaxes and the music plays itself." },
        { text: "After 3 minutes, change one melody note. Play 2 more minutes with the variation. Then change again. Over 10 minutes, evolve through 3-4 variations.", why: "Tinariwen's songs evolve glacially. The changes are so small the listener barely notices them happening — but the journey is real." },
        { text: "Add a subtle quarter-tone bend to one of the melody notes every other repetition. This is the vocal touch — the guitar briefly sings like a human voice.", why: "The microtonal variation within a repeating pattern creates the organic, human quality that distinguishes live desert blues from a programmed loop." }
      ],
      feel: "This should feel meditative — the pattern plays itself and your mind enters a calm, focused state. When you change a note, it should feel significant, like a new color appearing in a sunrise.",
      wrong: "If you get bored and add complexity, you're resisting the process. If the drone keeps dropping out, focus on the right-hand alternation until it's automatic. If the melody notes clash with the drone, stick to A-B-D-E-G — the sus pentatonic was designed for this.",
      sarah: "Gene, Nànnuflày is track #47 on your top 50. You already love this sound — now it's in your fingers. Tinariwen's music is communal and trance-inducing. When you play their patterns alone, you're participating in a musical tradition that's been creating altered states for centuries. The magic isn't in any single note — it's in the repetition and the patience.",
      metronome: 75,
      volumeContour: true,
      levelUp: "Play a Tinariwen-style piece for 5+ minutes: steady low D drone on 1 & 3, sus pentatonic melody on the upper strings evolving through 3-4 variations, with at least one quarter-tone bend per minute adding vocal quality."
    },
    {
      id: "gs-8-10",
      time: 10,
      title: "Desert Blues Toggle",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-sus-pentatonic", position: 1 },
      what: "Same tempo, same backing. 4 bars of Am pentatonic (blues feel), then 4 bars of sus pentatonic (desert feel). One note is the only difference, but the entire emotional landscape changes.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Put on Desert Blues 75. Play 4 bars using Am pentatonic: A-C-D-E-G. Play it bluesy — bends, behind the beat, vocal phrasing.", why: "Establishing the blues feel first makes the desert transition more dramatic." },
        { text: "Switch to sus pentatonic: A-B-D-E-G. Change your approach — straighter, more repetitive, patient. Let phrases cycle instead of building narratives.", why: "Desert blues has a different attitude than American blues. It's circular, not narrative. Repetitive, not dramatic." },
        { text: "Toggle back and forth. Listen to how the C (blues) and B (desert) create completely different worlds over the same groove.", why: "One note is the difference. C is the minor 3rd — sad, familiar, defined. B is the 2nd — open, ambiguous, floating between worlds." },
        { text: "Try blending: use the sus pentatonic but add a quarter-tone bend on the B, pushing it slightly toward C. Where are you now — Mississippi or the Sahara?", why: "Ali Farka Touré famously stated: 'People say my music is like the blues — it is not the blues. The blues comes from here.' The space between B and C is where both traditions meet. This gray zone is rich territory for personal expression, and the quarter-tone bend is the technique that lets you inhabit both worlds simultaneously." }
      ],
      feel: "The toggle should feel like switching between two landscapes — the Mississippi Delta and the Sahara Desert. Same heat, different terrain.",
      wrong: "If both sections sound the same, you're not committing to the character of each scale. Blues is vocal and bending; desert is repetitive and droning. Change your attitude, not just your notes.",
      sarah: "Gene, Ali Farka Touré said the blues came from Africa. When you play both scales, you hear the family resemblance — and the divergence. Same ancestor, different continents. This toggle is the musical proof of that connection. You'll feel it in the way the C and B pull you in completely different emotional directions over the same groove.",
      metronome: 75,
      referencePitches: ["B3", "C4"],
      pitchContour: true,
      levelUp: "Toggle between 4 bars of Am pentatonic (bluesy bends, behind the beat) and 4 bars of sus pentatonic (straight, repetitive, patient) over Desert Blues 75 for 3 minutes — with an audible character shift on each toggle, not just a note change."
    },
    {
      id: "gs-8-11",
      time: 15,
      title: "Extended Desert Jam",
      type: "guitar",
      recorder: true,
      what: "15-minute desert blues session. Drop D drone, sus pentatonic, hypnotic repetition, quarter-tone bends. Focus on patience and repetition — let the music breathe and evolve on its own timeline. This is the longest single exercise in the curriculum so far.",
      setup: "Drop D tuning. Clean tone, light reverb. Record yourself.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Put on Desert Blues 75. Start with just the open D drone. 4 bars of only the bass note. Let the room fill with the low D.", why: "Starting with the drone alone establishes the foundation. Everything builds from this single note." },
        { text: "Add a simple 3-note sus pentatonic melody over the drone. Repeat it for 3 minutes. Let it become hypnotic. Don't vary it — commit to the repetition.", why: "The opening melody sets the tone for the entire 15 minutes. Choose notes that complement the D drone." },
        { text: "Minutes 3-8: gradually evolve. Change one note every 90 seconds. Add quarter-tone bends. Move between registers on the upper strings while keeping the drone constant.", why: "Desert blues development is glacial. The whole 15 minutes might only use 6-7 different notes total." },
        { text: "Minutes 8-12: bring in your most intense phrasing — faster repetitions, stronger bends, blues-scale phrases mixed with sus pentatonic. This is the emotional peak. But keep the drone steady underneath.", why: "Even desert blues has a climax — it just arrives slowly and leaves slowly. The arc is stretched over the full duration." },
        { text: "Minutes 12-15: slowly pull back to the original 3-note melody. Simplify. Quiet down. End on the open D drone alone. Listen to it ring out into silence.", why: "Ending where you started creates a circle. The piece feels complete and self-contained." }
      ],
      feel: "A 15-minute desert session should feel like a journey through a vast, still landscape. When it's working, you lose track of time. The repetition becomes meditative. You hear overtones and harmonics you never noticed.",
      wrong: "If you played fast and varied throughout, you missed the point. Desert blues is about restraint, patience, and depth. If you got bored and stopped early, try setting a timer and committing — the breakthrough happens after the boredom, not before it.",
      sarah: "Gene, this is the deepest musical experience in the guitar curriculum so far. Most Western music is about going somewhere. Desert blues is about being somewhere — fully present, fully patient, fully alive in the moment. Think of it like a surf session — you paddle out, you wait, you read the ocean, and eventually the set arrives. The patience is the practice. Remember to tune back to standard when you're done.",
      metronome: 75,
      volumeContour: true,
      phraseForm: { pattern: ["Drone", "Melody", "Evolve", "Peak", "Dissolve"], barsPerSection: [8, 12, 20, 16, 8], labels: { Drone: "Drone Alone", Melody: "3-Note Motif", Evolve: "Glacial Change", Peak: "Intensity", Dissolve: "Return to Drone" } },
      levelUp: "Sustain a 15-minute desert blues jam in Drop D with the drone present throughout. Use no more than 7 different melody notes total. The piece has a clear 5-part arc (drone alone → 3-note motif → gradual evolution → intensity peak → return to drone). Recording confirms the drone never drops out and the development is glacial, not rushed."
    },

    // ─── NEW EXERCISES: EXPANDING THE DESERT ───

    {
      id: "gs-8-12",
      time: 10,
      title: "Bombino's Fire — Electric Desert",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      what: "Bombino takes the Tuareg foundation and plugs it into a Marshall. Where Tinariwen is communal and meditative, Bombino is a rock star — faster picking patterns, distortion, more aggressive attack, but still rooted in sus pentatonic over drones. Learn the Bombino approach: same scale, different energy. This is desert blues that could fill a stadium.",
      setup: "Drop D tuning. Overdrive or light distortion ON — this is the first time in this level you're adding gain. Slight reverb.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play your sus pentatonic drone pattern from gs-8-6 — but now with overdrive engaged. The distortion thickens the drone and adds sustain. Notice how the same notes feel heavier and more urgent with gain.", why: "Bombino's secret is that the foundation is identical to Tinariwen — sus pentatonic over drones — but the amplified tone transforms the feeling from meditative to electrifying. Distortion adds harmonics that make the drone richer and the melody more cutting." },
        { text: "Increase your picking speed. Instead of the patient one-note-per-beat approach, try tremolo picking: rapid alternating picks on a single melody note while the drone sustains. Pick 16th notes on E (12th fret high E string) for 2 bars, then shift to D for 2 bars.", why: "Tremolo picking is Bombino's signature. It creates an urgent, buzzing quality — the note vibrates like a desert wind. The speed creates intensity while the pitch stays minimal. One note, rapidly repeated, becomes a texture rather than a melody." },
        { text: "Build a Bombino-style riff: drone on beats 1 and 3, then a rapid 4-note ascending run (A-B-D-E) on beat 4 leading into the next bar. The run should feel like a burst of energy between the steady drone hits.", why: "Bombino's riffs combine the hypnotic drone foundation with explosive melodic bursts. The contrast between the steady drone and the rapid runs creates the excitement — it's desert blues with rock-and-roll energy." },
        { text: "Play for 5 minutes: alternate between patient Tinariwen-style phrasing (gs-8-9 approach) and aggressive Bombino-style bursts. The toggle is your choice — 8 bars of meditation, then 4 bars of fire, then back. Let the contrast build.", why: "Switching between meditative and aggressive over the same scale and drone reveals the range of desert blues. Tinariwen and Bombino are two sides of the same coin — patience and intensity sharing the same musical DNA." },
        { text: "End with a sustained quarter-tone bend at full volume — let the distortion and the microtonal pitch create a wailing, vocal cry. Hold it for 4 beats, then release into the drone. Record the entire 5 minutes.", why: "The sustained bend with distortion is Bombino's emotional climax move. The overdriven tone sustains the note longer, and the quarter-tone pitch creates a sound that's halfway between guitar and human voice." }
      ],
      feel: "This should feel like plugging the desert into an amplifier. The same notes, the same scale, the same drone — but electrified. Where Tinariwen makes you close your eyes and sway, Bombino makes you stand up and move. Both are valid, both are desert blues.",
      wrong: "If the distortion turns everything to mud, back off the gain — you want overdrive, not fuzz. The drone needs to stay clear underneath the melody. If the tremolo picking sounds frantic and out of control, slow the picking speed until each note is distinct, then gradually increase. If it sounds like generic rock, remember: sus pentatonic, not pentatonic. Keep the B, drop the C.",
      sarah: "Gene, Bombino learned guitar in refugee camps in the Sahara and became an international rock star without abandoning the Tuareg foundation. His album 'Nomad' was produced by Dan Auerbach of The Black Keys — that's how close desert blues and rock actually are. Same scale as Tinariwen, but Bombino cranks the amp and lets the distortion do the talking. This is the electric side of the desert tradition.",
      metronome: 75,
      levelUp: "Play a 5-minute Bombino-style piece: distorted sus pentatonic over Drop D drone, incorporating tremolo picking and rapid melodic bursts alongside patient drone phrasing. The piece alternates between meditative and aggressive sections with clear dynamic contrast, ending with a sustained quarter-tone bend."
    },
    {
      id: "gs-8-13",
      time: 12,
      title: "One Note Per Minute — Extreme Constraint",
      type: "guitar",
      recorder: true,
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "Improvise in sus pentatonic over the drone. The rule: you may only change to a NEW note once per minute. Between changes, explore everything else — rhythm, dynamics, bends, silence, texture. This extreme constraint exercise forces you to extract maximum music from minimum material. Set a timer. 12 minutes, 12 notes maximum.",
      setup: "Drop D tuning. Clean tone. Timer visible. Drone on.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Start on A (your root). Set a timer for 1 minute. For 60 full seconds, A is your ONLY pitch. Vary everything else: rhythm (long sustains, short bursts, silence, syncopation), dynamics (whisper to full attack), articulation (clean, muted, bent slightly, harmonics). How much music can you make with one note?", why: "One note per minute sounds impossible until you realize how much musical territory exists beyond pitch. Rhythm, dynamics, articulation, and silence are four independent dimensions of expression. With one pitch, all four get your full attention." },
        { text: "Minute 2: change to B (the 2nd — the desert note). Explore B for 60 seconds with the same depth. Feel how B against the A drone creates a different emotional space than A alone — more tension, more float, more ambiguity.", why: "When a new pitch arrives after 60 seconds of constraint, it sounds monumental. The patience makes the change meaningful. This is the same principle as Tinariwen's hypnotic repetition, taken to its logical extreme." },
        { text: "Minute 3: choose your next note freely from the sus pentatonic (D, E, or G). Each minute, you choose one new pitch and explore it fully. By minute 5, you have access to the entire sus pentatonic — but you earned each note through patience.", why: "Earning each note through patience creates a relationship with it. You know what D sounds like against the drone because you spent a full minute with it. This depth of listening transforms how you hear the scale forever." },
        { text: "Minutes 6-10: continue the one-note-per-minute rule, but now you can RETURN to previously used notes. Your palette grows but the constraint remains — only ONE pitch change per minute. Shape the piece with your choices.", why: "Returning to earlier notes with the constraint still active creates intentional narrative. Going back to A after exploring E feels like a homecoming. The constraint forces compositional thinking — which note serves the music right now?" },
        { text: "Minutes 11-12: dissolve. Return to A for the final minute. Then just the drone. Then silence. The piece ends where it began, but you've traveled through the entire scale with extraordinary patience.", why: "The circular return mirrors the structure of desert blues tradition — every journey returns to the origin. After 12 minutes of extreme constraint, silence feels earned and profound." }
      ],
      feel: "This should feel simultaneously frustrating and revelatory. The frustration of wanting more notes IS the exercise. When you submit to the constraint, you discover that one note per minute is not poverty — it's luxury. You hear details in each pitch that speed would obscure.",
      wrong: "If you changed notes before the minute was up, restart that minute. The constraint is non-negotiable — it's the entire point. If the music feels boring, you're not exploring enough dimensions (rhythm, dynamics, silence, bends). If all your minutes sound the same, you're not varying your approach to each note.",
      sarah: "Gene, this is the most extreme patience exercise in the entire guitar curriculum. It's inspired by how Tuareg musicians train — sitting with one phrase for hours until it reveals its secrets. Tinariwen doesn't need a lot of notes because they've heard everything each note can do. After this exercise, you'll understand why. One note, deeply explored, contains more music than a hundred notes skimmed.",
      metronome: 75,
      pitchContour: true,
      volumeContour: true,
      levelUp: "Complete a 12-minute improvisation with no more than one pitch change per minute (12 notes maximum). Recording confirms each note is explored through varied rhythm, dynamics, and articulation before the next note arrives. The piece has a clear arc from single note to full palette and back."
    },
    {
      id: "gs-8-14",
      time: 10,
      title: "Vieux Farka Touré — Desert Meets Rock",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      what: "Vieux Farka Touré is Ali Farka Touré's son. He bridges Saharan tradition with Western rock and funk — the desert foundation with a modern rhythmic drive. Where his father played acoustic and rooted, Vieux plugs in and grooves harder. This exercise teaches the bridge: keep the sus pentatonic DNA but add rhythmic syncopation and a funky, driving feel that wouldn't be out of place on a Khruangbin track.",
      setup: "Drop D tuning. Clean to light overdrive. Slight reverb.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play the Tinariwen drone-and-melody pattern from gs-8-9 — steady, meditative, patient. This is the father's approach: Ali Farka Touré, acoustic, rooted in tradition. Play for 2 minutes to establish the baseline.", why: "Starting with the traditional sound grounds you in the source material. Vieux didn't abandon the tradition — he expanded it. You need to hear where he came from before you can hear where he went." },
        { text: "Now shift the rhythm: instead of placing melody notes on beats 2 and 4, play them on the 'and' of 2 and the 'and' of 4. Syncopate the melody while keeping the drone on 1 and 3. The melody now pushes against the beat — it swings, it grooves, it funkifies the desert.", why: "Vieux Farka Touré's innovation is rhythmic, not harmonic. Same scale, same drone, but the melody is syncopated. This rhythmic displacement is what connects the Sahara to funk and rock — it's the same offbeat energy you practiced in Level 4's reggae skank, applied to desert blues." },
        { text: "Add ghost notes between the melody notes — muted string scratches that fill the rhythmic spaces. These ghost notes create a percussive texture, making your right hand work like a drummer. Your pattern becomes: drone, ghost, melody, ghost, drone, ghost, melody, ghost.", why: "Ghost notes are Vieux's bridge to funk. In traditional Tuareg guitar, the spaces between notes are silence. In Vieux's playing, those spaces are filled with rhythmic texture — muted strums that keep the groove propulsive." },
        { text: "Try a call-and-response within the groove: play a syncopated melody phrase for 2 bars, then 2 bars of pure drone-and-ghost-note groove (no melody, just rhythm). The melody is the voice; the groove is the band responding.", why: "Call-and-response is common to both West African and American music. Vieux uses it to create dynamic variation without changing the harmony — the conversation is between melody and rhythm, not between chords." },
        { text: "Play for 5 minutes: start with Ali Farka Touré's patient approach, gradually introduce Vieux's syncopation and ghost notes, build to a funky groove peak, then strip back to the drone alone. Record it.", why: "The father-to-son journey mirrors the evolution of desert blues itself — from acoustic tradition to electric innovation. Your recording should sound like two different guitarists sharing the same scale." }
      ],
      feel: "This should feel like the desert blues starting to dance. Ali Farka Touré sits and plays. Vieux Farka Touré stands up and moves. The notes are the same — the groove is different. When the syncopation and ghost notes lock in, you should feel your body wanting to move.",
      wrong: "If the syncopation sounds random, lock your ghost notes to a consistent rhythmic grid before trying to freestyle. If the groove doesn't feel funky, emphasize the offbeats more — really push the melody notes BETWEEN the beats. If it sounds too busy, reduce the ghost notes — they should fill space, not clutter it.",
      sarah: "Gene, Vieux Farka Touré is on your 12-month top 50 artists list. His music is the bridge between the Saharan tradition you've been learning and the Khruangbin-style global groove you already love. Mark Speer has said Vieux is a direct influence — the behind-the-beat desert guitar filtered through funk. When you add those ghost notes and syncopation to the sus pentatonic, you're connecting the Sahara to Bangkok to Houston. Same DNA, different groove.",
      metronome: 75,
      levelUp: "Play a 5-minute piece that transitions from traditional Ali Farka Touré-style patient desert blues to Vieux Farka Touré-style syncopated groove — incorporating offbeat melody placement and ghost notes — while maintaining the sus pentatonic scale and Drop D drone throughout. Recording shows a clear shift from meditative to funky without changing the harmonic foundation."
    }
  ]
};
