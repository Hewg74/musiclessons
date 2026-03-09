import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Originals & Genre Craft",
  subtitle: "Every genre is a toolkit. Build songs in each one.",
  description:
    "Apply your melodic and rhythmic skills to create original pieces in specific genres — reggae, surf-psych, desert blues, and soul. Each genre has its own strum feel, tempo pocket, and melodic personality. You'll create one original per genre, then blend them. Based on Lucy Green's 'create within a style' approach: genre constraints channel creativity productively.",
  artists: "DOPE LEMON, Allah-Las, Khruangbin, Skinshape, Tinariwen, Tommy Guerrero",
  unlocks: "Hearing Harmony (Level 7)",
  review: { label: "Level 4-5 Check-In", time: 5, exercises: ["ss-4-4", "ss-5-5"], prompt: "Play Am-C-G-Em in 3 different feels (ss-4-4). Then improvise pentatonic melody for 2 minutes over a backing track (ss-5-5). Both fluid? Move on." },
  exercises: [
    {
      id: "ss-6-1",
      time: 10,
      title: "Reggae Original",
      type: "song",
      what: "Create an original reggae piece: offbeat strum at 85 BPM, Am-C-G, pentatonic melody sung in porch register with syncopated rhythm. The reggae pocket is laid-back — every note sits slightly behind the beat. This is YOUR reggae sound.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Strum the offbeat chop at 85 BPM: Am (4 bars) → C (4 bars) → G (4 bars) → Am (4 bars). Get it locked.", why: "The reggae chop needs to be completely automatic before your voice enters. The rhythm IS the genre." },
        { text: "Improvise a melody over the progression using pentatonic notes. Let it sit behind the beat — lazy, unhurried. Sing on 'la' or 'ooh' first.", why: "Behind-the-beat phrasing is the reggae vocal signature. Don't rush to land on downbeats. Let them pass, then arrive." },
        { text: "Find a verse melody (low, conversational) and a chorus melody (slightly higher, more sustained notes). Repeat each until they're memorized.", why: "Two contrasting melodies over the same chords = a song structure. The contrast between sections is what makes it feel composed." },
        { text: "Add simple words. Reggae lyrics love nature, positivity, and warmth. 'Sun on the water / breeze through the trees.' Keep it simple and genuine.", why: "Reggae lyric themes align perfectly with your aesthetic — ocean, warmth, golden hour. Let the words flow from what you actually feel." },
        { text: "Record the complete piece: intro (4 bars strum only) → verse → verse → chorus → verse. This is your reggae original.", why: "A full recording captures the song before it fades from memory. Date it — this is the first genre piece in your catalog." }
      ],
      feel: "Reggae should feel like hammock music — swaying, warm, no urgency. If you're relaxed and slightly smiling while playing, the vibe is right.",
      wrong: "If your reggae sounds rushed or aggressive, slow down your delivery. Reggae lives in the space between beats. If your lyrics feel forced, switch to humming — the melody matters more than words at this stage.",
      sarah: "Gene, reggae is in your DNA — it's the genre you listen to most. This original should feel natural, like coming home. Don't overthink it.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-6-2",
      time: 10,
      title: "Surf-Psych Original",
      type: "song",
      what: "Create an original surf-psych piece: continuous jangle at 100 BPM, G-Em-C-D, with a shimmering melody that floats above the guitar. Surf vocals are ethereal and reverb-drenched in feeling — breathy, distant, dreamy.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Jangle G-Em-C-D at 100 BPM. Continuous 8th notes, light accent on beats 1 and 3. Let the guitar shimmer.", why: "The jangle IS the surf sound. It needs to be perfectly even and continuous before your voice can float on top." },
        { text: "Improvise a melody using pentatonic notes in the upper range (D4-G4). Breathy delivery, lots of reverb in your imagination. Think Allah-Las.", why: "Surf vocals sit higher and breathier than reggae. The melody floats above the jangle like mist above the ocean." },
        { text: "Create a verse that's sparse (few words, long sustained notes between phrases) and a chorus with more rhythmic energy.", why: "Surf-psych contrast is about density: verses are spacious, choruses fill up. The jangle stays constant throughout." },
        { text: "Lyrics: images of coast, light, and motion. 'Driving down the coast / light is getting gold / waves are getting close.' Surf lyrics paint pictures.", why: "Surf lyrics are cinematic — they describe scenes, not feelings directly. The feelings come through the images." },
        { text: "Record: jangle intro (4 bars) → verse → chorus → verse → chorus. Let the last chorus fade by strumming softer and softer.", why: "The fade ending is a surf-psych signature. It feels like driving away from the scene." }
      ],
      feel: "Surf-psych should feel sun-drenched and slightly melancholic — that 'beautiful day that you know will end' energy. Nostalgia in real time.",
      wrong: "If it sounds like rock or punk, you're strumming too hard and singing too aggressively. Pull back. Surf is gentle. The guitar shimmers, the voice whispers.",
      sarah: "Gene, this is the sound world of your playlists — Allah-Las, Babe Rainbow, Sun Room. You've been absorbing this sound for years. Now you're creating in it.",
      metronome: 120,
      referencePitches: getPitchRange("D4", "G4"),
      recorder: true
    },
    {
      id: "ss-6-3",
      time: 10,
      title: "Desert Blues Original",
      type: "song",
      what: "Create an original desert blues piece: sparse, hypnotic guitar at 75 BPM, Am drone with pentatonic melody. Desert blues is the most minimal genre — one chord, repeating riff, trance-like repetition. The voice is raw and direct.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Create a simple repeating guitar riff on Am — 2 bars, something you can loop endlessly. Thumb on the bass note (A), fingers on a pentatonic pattern. Or simple downstrokes with space.", why: "Desert blues riffs are hypnotic through repetition. Tinariwen, Ali Farka Touré — one riff, repeated for minutes. The trance IS the music." },
        { text: "Improvise pentatonic vocals over the riff. Sing in your lower range (E3-B3). Raw, unpolished, conversational. Like talking to someone across a fire.", why: "Desert blues vocals are the most direct vocal style — no decoration, no tricks. Just honest sound over a drone. Your porch register is perfect for this." },
        { text: "Don't vary the guitar much. Let the voice carry all the variation. The guitar is the constant; the voice is the variable.", why: "In desert blues, the guitar is like the earth — steady and unchanging. The voice is like the wind — always shifting." },
        { text: "Record 3-4 minutes of riff + vocal improvisation. Let it be meditative. No verse/chorus needed — just continuous flow.", why: "Desert blues doesn't need traditional song structure. A continuous piece with evolving vocal improvisation IS the form." }
      ],
      feel: "Desert blues should feel ancient and hypnotic — like music that's existed forever. If you lose track of time while playing, you've found the trance.",
      wrong: "If you're changing chords every 4 bars, you're adding too much harmony. Stay on Am. The constraint is the point — one chord reveals the infinite possibilities within that chord.",
      sarah: "Gene, desert blues is the spiritual ancestor of every genre you love. The trance, the repetition, the raw vocals — Tommy Guerrero and Tinariwen meet here.",
      metronome: 75,
      referencePitches: getPitchRange("E3", "B3"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-6-4",
      time: 10,
      title: "Soul Groove Original",
      type: "song",
      what: "Create an original soul groove: warm, 16th-note strum feel at 90 BPM, Am-Dm-G-C. Soul vocals use more vocal weight — slightly more chest resonance than your porch register, but still relaxed. The groove is king.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-Dm-G-C at 90 BPM with a warm, relaxed 16th-note feel. Ghost strums between the main strums add texture.", why: "Soul guitar is about pocket — sitting deep in the groove with ghost notes that add warmth without volume." },
        { text: "Improvise melodies in the pentatonic. Soul melodies use more rhythmic variation than other genres — syncopated phrases, pickup notes, little runs.", why: "Soul vocal rhythm is the most complex genre here. The voice dances around the beat with sophisticated timing." },
        { text: "Add vocal weight: instead of breathy porch delivery, push slightly more air through your chest. Not belting — just more presence. Think Skinshape, Leon Bridges.", why: "Soul requires slightly more vocal commitment than surf or reggae. The warmth comes from chest resonance, not volume." },
        { text: "Create verse and chorus. Soul choruses often repeat one phrase with slight variations: 'Moving with the groove / grooving through the night / moving through the groove.' Repetition with evolution.", why: "Repetitive choruses with slight changes are the hallmark of soul. The repetition is hypnotic; the variations keep it alive." },
        { text: "Record the full piece. This is your soul original.", why: "Four genre originals — reggae, surf, desert blues, soul — cover your entire musical DNA." }
      ],
      feel: "Soul groove should feel warm and body-driven. If your shoulders are moving and your head is nodding, the groove is working. Soul is the most physical genre here.",
      wrong: "If it sounds stiff or mechanical, you're thinking too much. Let the backing track carry you. Match its feel — don't fight it.",
      sarah: "Gene, soul is where your vocal sweet spot lives. E3-A4 with chest warmth is exactly the soul register. This genre might surprise you by feeling the most natural.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-6-5",
      time: 8,
      title: "Genre Blend",
      type: "song",
      what: "Create an original that blends TWO of your genre pieces. Reggae verse → surf chorus. Or desert blues verse → soul chorus. Genre-blending is YOUR signature — the 'Coastal Psychedelic Omnivore' sound.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Pick two genres from ss-6-1 through ss-6-4. Use one genre's feel for the verse and the other for the chorus.", why: "Genre-blending creates a sound that belongs to no category — which means it belongs to YOU. Khruangbin does exactly this." },
        { text: "The strum pattern must change between sections. Reggae chop → surf jangle. Or sparse desert → soul groove. Let the guitar transformation signal the genre shift.", why: "The strum change IS the section change. Your audience feels the genre shift through the guitar texture, even unconsciously." },
        { text: "The vocal delivery shifts too: porch register for one genre, slightly more present for the other. Let the genre guide your voice.", why: "Each genre has a vocal personality. Matching your delivery to the genre creates authenticity within each section." },
        { text: "Record the blend. This is the most 'you' thing you've created so far — two of your favorite genres fused into one original piece.", why: "Genre-blending is where artistic identity emerges. The specific genres you choose to blend are your musical fingerprint." }
      ],
      feel: "The genre blend should feel exciting — like discovering a new flavor by combining two familiar ones. When the shift happens between sections, it should feel like a surprise that also makes perfect sense.",
      wrong: "If the two genres sound identical in your piece, the contrast isn't strong enough. Exaggerate the strum change, tempo pocket, and vocal delivery between sections.",
      sarah: "Gene, your playlists already blend these genres — you listen to Khruangbin next to Allah-Las next to Skinshape. Your taste IS a genre blend. Now your music reflects that.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-6-6",
      time: 8,
      title: "Parasitic Songwriting",
      type: "song",
      what: "Borrow a CHORD PROGRESSION pattern (not a melody) from a genre you love and write a completely original melody and lyrics over it. The chord shape is a template — like a building's foundation. Everything on top is yours. This is how most songs in history have been written.",
      steps: [
        { text: "Pick a common chord progression: I-V-vi-IV (G-D-Em-C), i-III-VII-IV (Am-C-G-F), or i-iv-v (Am-Dm-Em). These belong to no one — they're musical infrastructure.", why: "Chord progressions cannot be copyrighted. They're shared musical language. Hundreds of hit songs use the same 4-5 progressions." },
        { text: "Strum the progression in your chosen genre feel. Let the groove settle for 30 seconds before singing.", why: "The strum feel determines the genre. The same chords in reggae vs surf vs soul create completely different songs." },
        { text: "Improvise an original melody using pentatonic notes. This melody belongs to you — even though the chords are 'borrowed,' the melody is new.", why: "Melody is the fingerprint of a song. New melody + common chords = new song. This is how songwriting has worked for centuries." },
        { text: "Add lyrics. Record the complete piece. This is a fully original song built on a borrowed foundation — exactly how every songwriter works.", why: "Professional songwriters don't feel guilty about using common progressions. They feel empowered by them. The progression is a tool; the song is the art." }
      ],
      feel: "Parasitic songwriting should feel liberating — you're not starting from nothing. You have a harmonic framework. All your creative energy goes into melody and lyrics.",
      wrong: "If you're worrying about 'copying,' remember: chord progressions are not copyrightable. The melody and lyrics are what make a song unique. Focus your originality there.",
      sarah: "Gene, every song on your playlists uses chord progressions that other songs also use. DOPE LEMON, Skinshape, Allah-Las — same progressions, totally different songs. The melody is what matters.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-6-7",
      time: 10,
      title: "Complete Original",
      type: "song",
      what: "Write a complete original song with: intro (4 bars), verse (8 bars), chorus (8 bars), verse (8 bars), chorus (8 bars), outro (4 bars). Melody, lyrics, dynamics. This is your first 'finished' song — not a sketch, but a complete piece you could perform.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Choose your genre feel, chord progression, and tempo. Set up the guitar part until it's on autopilot.", why: "The foundation must be automatic. You need all your cognitive bandwidth for melody and lyrics." },
        { text: "Compose the verse melody: lower range, storytelling delivery, arch or valley contour. Write lyrics that describe a scene.", why: "Verses paint pictures. Low range and descriptive lyrics set the scene before the chorus lifts." },
        { text: "Compose the chorus melody: higher range, more energy, rising contour. The lyrics should capture a feeling or a central phrase.", why: "The chorus is the emotional core. It should feel like the reason the song exists." },
        { text: "Arrange: intro (guitar only) → verse → chorus → verse → chorus → outro (guitar fading). Practice the whole thing 3 times.", why: "Playing through the complete form builds the song into your body. By the third pass, the transitions should feel natural." },
        { text: "Record the final version. Listen back. This is a real song. Write down the title, chords, and lyrics.", why: "Documenting your song makes it permanent. The recording captures the performance; the written notes capture the composition." }
      ],
      feel: "Performing your complete original should feel like telling a story — beginning, middle, climax, resolution. If you feel something while singing it, the song is working.",
      wrong: "If the song feels too long, cut a verse. If the chorus doesn't lift, raise the melody range or increase the strum energy. If the lyrics feel awkward, simplify them — fewer words is almost always better.",
      sarah: "Gene, this is a milestone. You wrote a song from scratch. No template, no cover, no imitation. It exists because you created it. Save this recording forever.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      checklist: true,
      recorder: true,
      levelUp: "Can create complete original songs in 4 genre styles (reggae, surf-psych, desert blues, soul), blend genres, and compose a finished song with verse-chorus structure, melody, and lyrics."
    }
  ]
};
