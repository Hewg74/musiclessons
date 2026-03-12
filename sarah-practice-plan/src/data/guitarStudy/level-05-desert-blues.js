import { getPitchRange } from "../appData.js";

export const level5 = {
  level: 5,
  title: "Desert Blues",
  subtitle: "Hypnotic repetition. Patience as a technique. The Sahara in your fingers.",
  description:
    "Desert blues comes from the Sahara — Tinariwen, Bombino, Ali Farka Toure, Mdou Moctar. It uses a 'sus pentatonic' scale (a Western approximation of Tuareg guitar modes, replacing the minor 3rd with a 2nd), drone strings, and hypnotic repetition to create trance-like music. Drop D tuning gives you the deep bass drone that anchors everything. This level teaches patience as a musical technique.",
  artists: "Tinariwen, Bombino, Ali Farka Toure, Mdou Moctar",
  unlocks: "The Improvisation Engine (Level 6)",
  review: { label: "Levels 3-4 Check-In", time: 5, exercises: ["gs-3-1", "gs-2-4"], prompt: "Play the Phrygian Dominant scale ascending and descending, emphasizing the Bb-C# interval (gs-3-1). Then play surf double stops in 3rds and 6ths cleanly (gs-2-4). Phrygian Dominant colors feed into desert blues, and double-stop precision feeds into drone + melody technique." },
  exercises: [
    {
      id: "gs-5-1",
      time: 8,
      title: "Sus Pentatonic — One Note Different",
      type: "guitar",
      what: "Learn the sus pentatonic scale: A-B-D-E-G. It replaces the minor 3rd (C) from the regular Am pentatonic with the 2nd (B). One note difference creates a completely different world — floating, ambiguous, neither major nor minor. Note: this is a Western approximation of Tuareg guitar scales. The actual Tinariwen sound comes from minor pentatonic played over drone strings, creating a suspended quality. The 'sus pentatonic' label is a useful teaching shorthand.",
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      steps: [
        { text: "Play Am pentatonic: A-C-D-E-G. Now replace C with B: A-B-D-E-G. Play both scales back to back and listen to the difference.", why: "Hearing the two scales side by side reveals how much one note changes the entire character. C is the minor 3rd — dark, bluesy, definitive. B is the 2nd — open, ambiguous, floating." },
        { text: "Play A-B-D-E-G ascending and descending in the 5th fret position. Find the shape — it's close to your pentatonic but the 2nd finger moves one fret down (from the 8th fret on the B string to the 7th).", why: "The new shape is almost the same as pentatonic, which means your fingers will try to play the old pattern. Be deliberate about the B." },
        { text: "Emphasize the B note — land on it, hold it, let it ring. This is the note that defines the desert sound.", why: "The 2nd (B in Am) creates harmonic ambiguity — is this major or minor? Neither. It's floating. That ambiguity is the desert blues feel." },
        { text: "Improvise with just A, B, and D. Three notes. One minute. See how much music you can make with almost nothing.", why: "Desert blues is built from minimal materials used with maximum patience. Less is the whole point." }
      ],
      feel: "The sus pentatonic should feel open and spacious — like standing in a vast landscape with nothing blocking the horizon. It's neither happy nor sad, just vast.",
      wrong: "If it sounds like regular pentatonic, you're playing C instead of B. If it sounds too bright, you might be playing a major scale. The sus pentatonic should feel ambiguous and floating — not cheerful, not mournful.",
      sarah: "One note is the difference between Mississippi Delta blues and Saharan desert blues. Same guitar, same technique, completely different emotional world. That's the power of note choice.",
      metronome: 60
    },
    {
      id: "gs-5-2",
      time: 10,
      title: "Drop D Drone Setup",
      type: "guitar",
      what: "Tune your low E string down one whole step to D (Drop D tuning). This gives you a deep bass drone that anchors desert blues melodies. Important: Drop D changes the fret positions on the 6th string — every note is now 2 frets higher than in standard tuning. When you're done, you'll learn how to tune back.",
      setup: "Tuner recommended. You can also tune by ear: play the 4th string (D) and tune the 6th string down until they match, one octave apart.",
      steps: [
        { text: "Tune the low E string down to D. Pick it alongside the open D string (4th string) — they should sound like the same note, one octave apart. If you have a tuner, watch it go from E to D as you loosen the string.", why: "Drop D gives you a deep, powerful bass drone. Tuareg guitarists often use open tunings for exactly this purpose." },
        { text: "IMPORTANT: In Drop D, every fret on the 6th string is shifted. What used to be the 2nd fret (F#) is now E. The 3rd fret (used to be G) is now F. The 5th fret is now G (was A in standard). When you see fret numbers for the 6th string in this level, they refer to Drop D positions.", why: "Understanding the shift prevents confusion. All other strings remain unchanged — only the 6th string moves." },
        { text: "Let the low D ring open while you play the sus pentatonic on the top 3 strings. Alternate: pluck the bass, then a melody note. Bass-melody-melody-bass-melody-melody.", why: "Bass drone + melody is the core texture of desert blues. One guitar sounds like two instruments." },
        { text: "Experiment with fingerpicking: use your thumb for the bass drone and your index and middle fingers for melody notes. The bass should ring continuously underneath.", why: "Fingerpicking or hybrid picking lets you maintain the drone continuously. The bass never stops — it's the heartbeat of the piece." },
        { text: "To return to standard tuning when you're done: tighten the 6th string back up until your tuner reads E, or until the 6th string open matches the 5th fret of the A string. Always retune before moving to non-desert-blues exercises.", why: "Leaving the guitar in Drop D will make everything else you play sound wrong. Build the habit of tuning back to standard when you finish desert blues practice." }
      ],
      feel: "The drone should feel like a heartbeat underneath the melody — steady, constant, grounding. The melody floats above it like heat shimmer over sand.",
      wrong: "If the bass drone overpowers the melody, play the bass string more softly. If the melody notes are unclear, make sure you're fretting cleanly on the upper strings. If you forget to tune back afterward and your other playing sounds strange, check your 6th string.",
      sarah: "The drone is not background — it's the foundation that makes the melody meaningful. Without it, the melody floats aimlessly. With it, every note has context. Drop D is your portal to the desert.",
      metronome: 75
    },
    {
      id: "gs-5-3",
      time: 10,
      title: "Hypnotic Repetition",
      type: "guitar",
      recorder: true,
      what: "Choose a 4-note phrase from the sus pentatonic. Repeat it 16 times without variation. Only then, change one note. This exercise teaches patience and reveals the trance power of repetition — the core of desert blues.",
      steps: [
        { text: "Choose any 4 notes from the sus pentatonic (A-B-D-E-G). Play them as a short phrase with a simple rhythm. This is your motif.", why: "The motif doesn't need to be clever. Simple phrases become hypnotic through repetition. Complex phrases become exhausting." },
        { text: "Repeat your motif 16 times. Same notes, same rhythm, same dynamics. No variation. Count each repetition on your fingers if needed.", why: "16 repetitions feels like forever at first. By repetition 8, something changes — the phrase stops being a pattern and becomes a groove." },
        { text: "On repetition 17, change exactly one note. Listen to how enormous that tiny change feels after 16 repetitions of the same thing.", why: "After 16 repetitions of the same phrase, a single changed note sounds like a revelation. This is the power of patience." },
        { text: "Repeat the new phrase 8 times. Then change another note. Build a piece that evolves glacially over 10 minutes.", why: "Glacial evolution creates narrative without drama. The listener is drawn in by subtlety, not spectacle." }
      ],
      feel: "By repetition 10 or so, you should enter a mild trance state — the phrase plays itself, your mind quiets, and you hear harmonics and overtones you never noticed. This is the meditative power of repetition.",
      wrong: "If you get bored and change the phrase early, you haven't committed to the process. The boredom is the point — push through it and something shifts. If the phrase is too complex to repeat exactly, simplify it.",
      sarah: "Tinariwen can play the same riff for 10 minutes and it gets MORE interesting, not less. The secret is that repetition reveals depth. Each cycle, you hear something new in the same notes.",
      metronome: 75,
      levelUp: "You can repeat a 4-note phrase 16 times without variation, and the phrase deepens rather than becomes boring."
    },
    {
      id: "gs-5-4",
      time: 8,
      title: "Drone Motif Development",
      type: "guitar",
      what: "Take your hypnotic 4-note phrase from gs-5-3 and apply simple development: after 8 exact repetitions, change one note. After 8 more, reverse the direction. After 8 more, fragment to 2 notes. This is motif development applied to desert blues — glacial variation with intention.",
      setup: "Drop D tuning if available. Clean tone, slight reverb.",
      steps: [
        { text: "Choose a 4-note sus pentatonic phrase from gs-5-3 (or create a new one). Play it with the A string drone 8 times. No variation. Commit to the repetition.", why: "The exact repetition baseline proves you can hold a phrase with discipline. Desert blues demands patience." },
        { text: "Repetition 9: change one note. If your phrase was A-B-D-E, try A-B-D-G. One note changed. Repeat this new version 8 times. Listen to how enormous that tiny change feels.", why: "This is PReVaDe 'Vary' applied to desert blues. The ratio of 8 repetitions to 1 change is extreme — that's what makes it meaningful." },
        { text: "Repetition 17: reverse the direction of your phrase. If it ascended (A-B-D-E), now descend (E-D-B-A). Keep the same rhythm. Repeat 8 times.", why: "Reversing direction is inversion — preserves interval content while changing melodic direction. Creates a mirror effect." },
        { text: "Repetition 25: fragment to just the first 2 notes. Repeat as a short ostinato. Then just 1 note with the drone. Then just the drone alone. The piece dissolves.", why: "Deconstruction back to the drone creates a full arc: complexity from simplicity, returning to it." }
      ],
      feel: "Each variation should feel significant because of the patience that preceded it. The full arc should feel like a slow sunrise.",
      wrong: "If you changed the phrase before completing 8 repetitions, you short-circuited the process. The patience IS the technique.",
      sarah: "Tinariwen does this intuitively — a phrase repeats until it transforms. You're learning the structure behind their intuition. When you reach the improv level, this patience will be your secret weapon.",
      metronome: 75,
      recorder: true,
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      referencePitches: getPitchRange("A3", "E4")
    },
    {
      id: "gs-5-5",
      time: 10,
      title: "Drone + Melody — The Communal Guitar",
      type: "guitar",
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
      sarah: "In Tuareg culture, guitar is communal — multiple players interlock to create the trance. You're channeling that tradition through one instrument. The drone is not just a technique — it's a philosophy. Some things hold steady so other things can move.",
      metronome: 75
    },
    {
      id: "gs-5-6",
      time: 10,
      title: "Quarter-Tone Bends — Between the Notes",
      type: "guitar",
      recorder: true,
      what: "Bend between the 2nd and the minor 3rd (B and C in Am) — a quarter-tone bend that lands between Western pitches. This microtonal space is where Tuareg guitar imitates the human voice. A quarter-tone bend means bending halfway to the next fret — not a half-step, not staying put, but right in the middle.",
      steps: [
        { text: "Fret B (7th fret, high E string). Bend it up, but only halfway to C (8th fret pitch). Stop in the zone between the two notes. This is a quarter-tone — a pitch that doesn't exist on piano.", why: "Quarter-tone bends exist outside Western tuning. They create an 'in-between' pitch that sounds vocal and haunting. This is how Tuareg guitarists make the instrument sing like a voice." },
        { text: "Practice finding the quarter-tone consistently. Bend to it, hold it for 2 beats, release. The pitch should be 'wrong' by Western standards but 'right' by feel — it should sound like someone's voice wavering.", why: "Training your ear to recognize quarter-tones opens a whole dimension of expression that most Western guitarists never access." },
        { text: "Use the microtonal bend in a sus pentatonic phrase: A-B(bend slightly toward C)-D-E. The bent B floats between the 2nd and minor 3rd — between desert and blues territory.", why: "In context, the microtonal bend adds a vocal, crying quality that straight notes can't achieve. It's the emotional heart of desert blues guitar." },
        { text: "Try microtonal bends on different strings and fret positions. The B string requires more pressure to bend. The high E bends easily. The G string (wound) bends differently again. Each string needs its own muscle memory.", why: "String thickness and fret position change how much pressure a quarter-tone requires. Your fingers need to calibrate for each string." }
      ],
      feel: "A good microtonal bend should sound like a voice — not quite one note, not quite another, but a human sound in between. It should make you feel slightly uncomfortable in a beautiful way.",
      wrong: "If the bend goes all the way to C, you've overshot — that's a regular half-step bend. If it doesn't move at all, you need more pressure. The quarter-tone is a very specific, very small movement. Use the 8th fret pitch as your ceiling — stop halfway there.",
      sarah: "Microtonal bending is what separates guitar from piano. The piano can only play the notes that exist. Guitar can play the spaces between. Desert blues lives in those spaces.",
      metronome: 75,
      referencePitches: ["B3", "C4"]
    },
    {
      id: "gs-5-7",
      time: 12,
      title: "Song Study: Tinariwen Nannuflay Style",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-sus-pentatonic", position: 2 },
      what: "Build a hypnotic interlocking guitar pattern inspired by Tinariwen's 'Nannuflay.' Drop D drone bass, repetitive sus pentatonic melody, glacial evolution. Two voices from one guitar — this is a complete desert blues piece.",
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
      sarah: "Tinariwen's music is communal and trance-inducing. When you play their patterns alone, you're participating in a musical tradition that's been creating altered states for centuries. 'Nannuflay' is on your playlist, Gene — this is the sound you love, now in your fingers.",
      metronome: 75
    },
    {
      id: "gs-5-8",
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
        { text: "Try blending: use the sus pentatonic but add a quarter-tone bend on the B, pushing it slightly toward C. Where are you now — Mississippi or the Sahara?", why: "The space between B and C is where desert blues and American blues overlap. This gray zone is rich territory for personal expression." }
      ],
      feel: "The toggle should feel like switching between two landscapes — the Mississippi Delta and the Sahara Desert. Same heat, different terrain.",
      wrong: "If both sections sound the same, you're not committing to the character of each scale. Blues is vocal and bending; desert is repetitive and droning. Change your attitude, not just your notes.",
      sarah: "Ali Farka Toure said the blues came from Africa. When you play both scales, you hear the family resemblance — and the divergence. Same ancestor, different continents.",
      metronome: 75
    },
    {
      id: "gs-5-9",
      time: 15,
      title: "Extended Desert Jam",
      type: "guitar",
      recorder: true,
      what: "15-minute desert blues session. Drop D drone, sus pentatonic, hypnotic repetition, quarter-tone bends. Focus on patience and repetition — let the music breathe and evolve on its own timeline.",
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
      sarah: "This is the deepest musical experience in the curriculum so far. Most Western music is about going somewhere. Desert blues is about being somewhere — fully present, fully patient, fully alive in the moment. Remember to tune back to standard when you're done.",
      metronome: 75,
      levelUp: "You can sustain a desert blues jam for 15 minutes that evolves gradually, maintains the drone, and doesn't rush. The repetition feels meditative, not monotonous."
    }
  ]
};
