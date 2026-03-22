import { getPitchRange } from "../appData.js";

export const level11 = {
  level: 11,
  title: "Originals & Genre Craft",
  subtitle: "Every genre is a toolkit. Build songs in each one.",
  description:
    "Apply your melodic and rhythmic skills to create original pieces in specific genres — reggae, surf-psych, desert blues, and soul. Each genre has its own strum feel, tempo pocket, and melodic personality. You'll create one original per genre, then blend them. Based on Lucy Green's 'create within a style' approach: genre constraints channel creativity productively.",
  artists: "DOPE LEMON, Allah-Las, Khruangbin, Skinshape, Tinariwen, Tommy Guerrero",
  unlocks: "Song Architecture (Level 11)",
  review: { label: "Level 8-9 Check-In", time: 5, exercises: ["ss-8-4", "ss-9-5"], prompt: "Play Am-C-G-Em in 3 different feels (ss-8-4). Then improvise pentatonic melody for 2 minutes over a backing track (ss-9-5). Both fluid? Move on." },
  exercises: [
    {
      id: "ss-11-1",
      time: 10,
      title: "Reggae Original",
      type: "song",
      what: "Create an original reggae piece using the B-F#-E progression — the same three chords from 'Jah Werx' (Susto), one of your most-played reggae tracks. Offbeat chop at 85 BPM, pentatonic melody in your porch register. Three chords, infinite groove. The rhythm IS the song. (Fun fact: 'Gimme Love' by The Elovaters uses the same three-chord reggae shape in a different key — F-C-G in the key of C.)",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }, { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      steps: [
        { text: "Strum the offbeat chop at 85 BPM: B (4 bars) → F# (4 bars) → E (4 bars) → B (4 bars). All barre chords — B at fret 2 (A-shape), F# at fret 2 (E-shape), E open or at fret 7. Get the chop locked.", why: "B-F#-E is the I-V-IV in B major — the three-chord reggae engine from Jah Werx (Susto). Gimme Love (The Elovaters) uses the same three-chord reggae shape as F-C-G in the key of C (IV-I-V) — same formula, different key. The barre chords give it weight that open chords can't match. The chop needs to be completely automatic before your voice enters." },
        { text: "Improvise a melody over the progression. Let every note sit BEHIND the beat — the metronome clicks, and you arrive slightly late on purpose. Sing on 'la' or 'ooh' first. Feel the sway.", why: "Behind-the-beat phrasing is the reggae vocal signature and the feel of every artist you love — from Elovaters to Pepper to Stick Figure. Don't rush to land on downbeats. Let them pass, then arrive. The gap between beat and voice IS the groove." },
        { text: "Find a verse melody (low, conversational, E3-B3) and a chorus melody (slightly higher, more sustained notes, B3-E4). Repeat each until they're memorized.", why: "Two contrasting melodies over the same chords = a song structure. The contrast between sections is what makes it feel composed, not jammed." },
        { text: "Add simple words. Your lyric DNA: ocean, golden hour, warmth, travel. 'Sun on the water / breeze through the trees / nowhere to be / just let it breathe.' Keep it genuine — reggae lyrics don't need to be clever, they need to be felt.", why: "Reggae lyric themes are your aesthetic in word form. The simplicity IS the sophistication. Bob Marley's deepest songs use the simplest words." },
        { text: "Record the complete piece: intro (4 bars strum only) → verse → verse → chorus → verse. This is your reggae original.", why: "A full recording captures the song before it fades from memory. Date it — this is the first genre piece in your catalog." }
      ],
      feel: "Reggae should feel like hammock music — swaying, warm, no urgency. If you're relaxed and slightly smiling while playing, the vibe is right. The B-F#-E progression should feel like coming home to Jah Werx.",
      wrong: "If your reggae sounds rushed or aggressive, slow down your delivery. Reggae lives in the space between beats. If the barre chords are too hard, temporarily use capo 4 and play G-D-C shapes — same sound, easier grip. If your lyrics feel forced, switch to humming — the melody matters more than words at this stage.",
      sarah: "Gene, B-F#-E is the progression from Jah Werx (Susto) — your reggae DNA in three chords. Gimme Love (The Elovaters) runs the same three-chord reggae shape in the key of C — F-C-G (IV-I-V), so both songs share the same engine in different keys. You learned the offbeat chop in Guitar Level 4 (gs-4-1) — that's the rhythm engine for this original. The three-chord reggae doesn't need complex harmony. It needs killer rhythm and pocket. Three chords, one groove, your voice on top. This original should feel like joining a conversation you've been listening to for years. For your reggae vocal: each syllable is a rhythmic event, not just a word in a melody. Slight nasal focus cuts through the bass. Call-and-response structure: sing a short phrase, then stop for a full bar. Let the riddim breathe. Your voice enters the groove like a percussion instrument.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-11-2",
      time: 10,
      title: "Surf-Psych Original",
      type: "song",
      what: "Create an original surf-psych piece using the C#m-B-F# progression from 'Sol Del Sur' (Sun Room) — your #4 most-played song. NOT straight downstrokes: use the syncopated Sun Room strum (Down, Down-Up, Down-Up) with muted strums between chord hits for percussion. ~100 BPM. Your voice floats above the jangle — breathy, distant, reverb-drenched in feel.",
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Learn the syncopated surf strum first WITHOUT chords — just muted strings. The pattern is: Down, Down-Up, Down-Up on beats 1, 2-and, 3-and-4-and. Your arm swings like a pendulum on every 8th note but you only HIT the strings on the accented beats. Muted ghost strums fill the gaps. Practice for 1 minute.", why: "This strum is what makes modern surf sound like Sun Room and Allah-Las, not Dick Dale. It's syncopated with a reggae-adjacent offbeat push. The ghost strums are percussion — your guitar is both melodic and rhythmic." },
        { text: "Apply the strum to C#m (barre fret 4) → B (barre fret 2) → F# (barre fret 2, E-shape). This is i-bVII-IV in C# minor — the F# is MAJOR, not F#m. That borrowed major IV is why Sol Del Sur sounds simultaneously dark and open, neither sad nor happy.", why: "The major IV chord borrowed from the parallel major key creates modal ambiguity — the defining harmonic color of modern surf. It's why this progression sounds like the ocean at golden hour." },
        { text: "Improvise a melody in your upper range (C#4-G#4). Breathy delivery. Sparse — long sustained notes between phrases. Think of how Sun Room vocals sit: not on top of the guitar, but floating inside the reverb alongside it.", why: "Surf vocals live IN the reverb, not above it. The voice and guitar merge into one shimmering texture. Less is more — one sustained note with the right feel beats a busy melody." },
        { text: "Lyrics: images of coast, light, motion, fleeting beauty. 'Driving south with the windows down / sun is getting low / everything is golden now.' Surf lyrics paint scenes, not feelings — the feelings come through the images.", why: "Your lyric DNA is 'beautiful day that you know will end' energy. Nostalgia in real time. Surf lyrics are cinematic — every line is a camera shot." },
        { text: "Record: syncopated strum intro (4 bars) → verse → chorus (add the E chord: C#m-B-F#-E-F# for the chorus lift) → verse → chorus. Fade the last chorus by strumming softer and softer until silence.", why: "The E chord appears in Sol Del Sur's chorus — adding it creates a lift from the verse darkness. The fade ending is a surf-psych signature, like driving away from the scene." }
      ],
      feel: "Surf-psych should feel sun-drenched and slightly melancholic — that 'beautiful day that you know will end' energy. The C#m-B-F# should feel like YOUR sound, because it literally is — it's from your most-played surf song.",
      wrong: "If it sounds like generic rock, three things to check: (1) Are you using the syncopated strum or just straight downstrokes? The push on beat 2-and is essential. (2) Is F# major or minor? It MUST be major for the surf ambiguity. (3) Are you strumming too hard? Pull back. Surf is gentle. The guitar shimmers, the voice whispers.",
      sarah: "Gene, Sol Del Sur is your #4 most-played song of the year. The syncopated Sun Room strum from Guitar Level 5 (gs-5-6) is your foundation here. C#m-B-F# with that syncopated strum IS your surf DNA. Sun Room's secret: Jazzmaster + Tubescreamer always on at low gain + spring reverb. Simple gear, simple chords, incredible feel. Your original should capture that same golden simplicity. And here's WHY Sol Del Sur's C#m-B-F# sounds the way it does: the F# is MAJOR — borrowed from the parallel major key, creating 'modal ambiguity.' Neither sad nor happy. That's your golden hour sound. Your tone choice IS your genre choice here: spring reverb = surf, and that reverb-drenched shimmer tells your fingers what to play. For your surf-psych vocal: suppress vibrato, keep your voice at mezzo-piano (quieter than the guitar), let the reverb carry your tone. Float behind the beat. Your voice sits INSIDE the guitar reverb, not on top of it. Think Laura Lee on Texas Sun.",
      metronome: 100,
      referencePitches: getPitchRange("C#4", "G#4"),
      recorder: true
    },
    {
      id: "ss-11-3",
      time: 10,
      title: "Desert Blues Original",
      type: "song",
      what: "Create an original desert blues piece: sparse, hypnotic guitar at 75 BPM, Am drone with pentatonic melody. Desert blues is the most minimal genre — one chord, repeating riff, trance-like repetition. The voice is raw and direct.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }],
      steps: [
        { text: "Create a simple repeating guitar riff on Am — 2 bars, something you can loop endlessly. Thumb on the bass note (A), fingers on a pentatonic pattern. Or simple downstrokes with space.", why: "Desert blues riffs are hypnotic through repetition. Tinariwen, Ali Farka Touré — one riff, repeated for minutes. The trance IS the music." },
        { text: "Improvise pentatonic vocals over the riff. Sing in your lower range (E3-B3). Raw, unpolished, conversational. Like talking to someone across a fire.", why: "Desert blues vocals are the most direct vocal style — no decoration, no tricks. Just honest sound over a drone. Your porch register is perfect for this." },
        { text: "Don't vary the guitar much. Let the voice carry all the variation. The guitar is the constant; the voice is the variable.", why: "In desert blues, the guitar is like the earth — steady and unchanging. The voice is like the wind — always shifting." },
        { text: "Record 3-4 minutes of riff + vocal improvisation. Let it be meditative. No verse/chorus needed — just continuous flow.", why: "Desert blues doesn't need traditional song structure. A continuous piece with evolving vocal improvisation IS the form." }
      ],
      feel: "Desert blues should feel ancient and hypnotic — like music that's existed forever. If you lose track of time while playing, you've found the trance.",
      wrong: "If you're changing chords every 4 bars, you're adding too much harmony. Stay on Am. The constraint is the point — one chord reveals the infinite possibilities within that chord.",
      sarah: "Gene, desert blues is the spiritual ancestor of every genre you love. Use the sus pentatonic and Drop D drone from Guitar Level 8 (gs-8-1 and gs-8-2) as your foundation. The trance, the repetition, the raw vocals — Tommy Guerrero and Tinariwen meet here. Desert blues originals are about patience and repetition — say the same thing until it transforms. For your desert blues vocal: raw, direct, conversational. No vibrato, no decoration. Like talking to someone across a fire. And the silences are architectural — 2-4 bars of not singing is genre-defining. Don't fill the space.",
      metronome: 75,
      referencePitches: getPitchRange("E3", "B3"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-11-4",
      time: 10,
      title: "Soul Groove Original",
      type: "song",
      what: "Create an original soul groove using the Gm-C-A7-Dm progression from Skinshape's 'I Didn't Know' — a soul/jazz cycle that sounds sophisticated without being complex. Warm 16th-note strum feel at 80-90 BPM. Soul vocals use more vocal weight than your porch register — slightly more chest resonance, but still relaxed. The groove is king. The 7th chords are what make it sound like Skinshape instead of a campfire song.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Learn the chord shapes: Gm (355333 barre), C (x32010 or add the 7th: C7 = x32310), A7 (x02020), Dm (xx0231). The 7th chords are the secret — they add warmth and sophistication. Strum Gm-C-A7-Dm at 80 BPM with ghost strums between main hits.", why: "This is the progression from Skinshape's 'I Didn't Know' — your #31 most-played track. The A7 creates tension that resolves to Dm, which is a jazz-flavored move that sounds effortlessly cool. Playing with 7th voicings (Gm7, C7) instead of plain triads is what separates 'soul' from 'acoustic pop.'" },
        { text: "Improvise melodies using pentatonic notes. Soul melodies use more rhythmic variation than reggae or surf — syncopated phrases, pickup notes, little runs that land on beat 2 instead of beat 1.", why: "Soul vocal rhythm is the most complex genre here. Listen to how Skinshape's vocals sit slightly behind the beat but with more rhythmic activity than reggae. The voice dances around the beat." },
        { text: "Add vocal weight: instead of breathy porch delivery, push slightly more air through your chest. Not belting — just more presence. Think Skinshape's warm delivery, Leon Bridges on 'Texas Sun,' the warmth of Khruangbin vocal sections.", why: "Soul requires slightly more vocal commitment than surf or reggae. The warmth comes from chest resonance, not volume. Your sweet spot (E3-A4) IS the soul register." },
        { text: "Create verse and chorus. Try the major→minor trick for emotional shift: verse on Gm-C-A7-Dm (minor, contemplative), chorus shift to D-Dm-G-Gm (the DOPE LEMON 'Honey Bones' pattern — major to minor oscillation creates a 'sunset' feeling).", why: "The D→Dm, G→Gm trick is a 1960s soul ballad move — shifting the 3rd down one fret changes major to minor. DOPE LEMON's 'Honey Bones' is built entirely on it. Using it for your chorus creates emotional depth that generic major chords can't touch." },
        { text: "Record the full piece. This is your soul original — the most harmonically sophisticated genre piece in your catalog.", why: "Five genre originals — reggae, surf, desert blues, soul, global fusion — cover your entire musical DNA. The soul piece shows you can play beyond three-chord simplicity." }
      ],
      feel: "Soul groove should feel warm and body-driven. If your shoulders are moving and your head is nodding, the groove is working. The 7th chords should make the guitar sound like it's glowing — richer, warmer, more alive than plain triads.",
      wrong: "If it sounds stiff or mechanical, you're thinking too much about the chord shapes. Let the backing track carry you. If the 7th chords are too hard right now, use plain Gm-C-Am-Dm as training wheels — but come back and upgrade to 7ths when your fingers are ready, because the 7ths ARE the soul sound.",
      sarah: "Gene, Skinshape records by playing drums first, then improvising guitar over the groove, then adding bass and vocals. That's exactly what you're doing here — the backing track is your drum foundation, and you're improvising on top. His Gm-C-A7-Dm cycle is the same motion jazz players use (minor ii-V), but he makes it accessible by keeping the rhythm reggae-influenced and the tone warm and lo-fi. The audio reveals his rhythm technique: rest on beat 1, strike on off-beats, with partial barres on just the top 3-4 strings. The chords are cut off almost immediately with left-hand muting. That staccato dub feel is the soul sound. That Lee Perry / King Tubby dub DNA runs through everything he does. Your tone choice IS your genre choice: clean chop = reggae, but add warmth and those 7th voicings and you're in soul territory. Your original should channel that same warmth. For your soul vocal: warm, full chest voice. Your voice LEADS — the guitar ANSWERS. Space between phrases is essential. Sing a phrase, then stop. Let the guitar respond with a short fill. Then sing again. This call-and-response structure is how Leon Bridges and Khruangbin interact on Texas Sun.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-11-5",
      time: 10,
      title: "Global Fusion Original",
      type: "song",
      what: "Create a piece blending non-Western elements: Tinariwen-style single-chord trance + Khruangbin's Thai funk influence. One-chord drone, pentatonic melody, hypnotic repetition with micro-variation. This is your 'Coastal Psychedelic Omnivore' identity — genre boundaries don't exist.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }, { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      steps: [
        { text: "Set up a one-chord drone on Am. Keep the guitar locked into a repeating 2-bar riff — thumb bass, pentatonic fragments on top. This is the trance foundation.", why: "Single-chord trance is the oldest musical form on earth. Tinariwen, Ali Farka Touré, and Khruangbin all build hypnotic worlds on one harmonic center." },
        { text: "Sing a pentatonic melody that repeats with micro-variations — same shape each time, but slightly different note choices, rhythms, or ornaments. Repetition with evolution, not repetition with boredom.", why: "Micro-variation is how trance music stays hypnotic without becoming monotonous. Each pass through the melody is 90% the same, 10% new." },
        { text: "Experiment with non-Western phrasing: melismatic slides between notes, grace notes before landing on a pitch, call-and-response between your voice and your guitar riff.", why: "Western singing tends to land cleanly on pitches. Global vocal traditions live in the spaces between notes — the slides, bends, and ornaments carry the emotion." },
        { text: "Build intensity through vocal dynamics only — the guitar stays constant. Start quiet and intimate, gradually increase vocal presence and range over 3-4 minutes.", why: "When the harmony is static, dynamics become the architecture. The voice controls the entire emotional arc of the piece." },
        { text: "Record the full piece. Let it breathe — 4-5 minutes is natural for trance-based music. This is genre-boundary-dissolving work.", why: "This recording captures your most adventurous creative identity. It belongs to no genre and every genre. That's the Coastal Psychedelic Omnivore sound." }
      ],
      feel: "This should feel ancient and borderless — like music that could come from any continent or any century. If genre labels stop making sense while you're playing, you've found it.",
      wrong: "If it sounds like a normal pop song over Am, you're adding too much structure. Strip back. One chord. One riff. Let the voice do all the traveling.",
      sarah: "Gene, this is the exercise that most reflects your listening identity. Tinariwen into Khruangbin into Tommy Guerrero — your playlists already live here. Now your voice does too.",
      metronome: 75,
      fretboard: { scale: "am-pentatonic", position: 1 },
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-11-6",
      time: 7,
      title: "Genre Micro-Timing Deep Dive",
      type: "rhythm",
      what: "Play the SAME 4-bar melody in 4 genre pockets: reggae (way behind the beat), surf (on top of the beat), soul (slightly behind), desert blues (floating, no fixed pocket). Record all four. Same notes, completely different songs. This proves that FEEL, not melody, defines genre.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Ska Upbeat 95", src: "/ska-upbeat-95.mp3" }],
      steps: [
        { text: "Compose a simple 4-bar pentatonic melody over Am-C-G-Em. Memorize it cold — you need to play it identically four times with only the timing changing.", why: "Controlling for melody isolates the variable you're studying: micro-timing. Same notes, same order, same dynamics — only the pocket changes." },
        { text: "Play it reggae: every note lands AFTER the beat. Lay back hard. The metronome clicks and you arrive late on purpose. Strum the offbeat chop underneath.", why: "Reggae pocket is the most behind-the-beat of any genre. The laid-back feel is not laziness — it's precise rhythmic placement that creates relaxation." },
        { text: "Play it surf: every note lands ON or slightly AHEAD of the beat. Forward momentum, brightness, drive. Jangle strum underneath.", why: "Surf pocket pushes forward — it creates the feeling of motion, of driving down the coast. The energy comes from where the notes sit relative to the beat." },
        { text: "Play it soul: notes land just slightly behind the beat — not as far back as reggae, but with a gentle drag. Warm, unhurried. Ghost-note strum underneath.", why: "Soul pocket is the subtlest — just a hair behind. It creates warmth and intimacy without the obvious laid-back quality of reggae." },
        { text: "Play it desert blues: the notes float — sometimes ahead, sometimes behind, not locked to any consistent pocket. The timing breathes and wanders.", why: "Desert blues has the loosest relationship with the beat. The voice is free — the guitar drone holds time, and the voice exists in its own temporal space." },
        { text: "Record all four versions back to back. Listen and compare. Same melody, four different genres. This is the power of micro-timing.", why: "Hearing the four versions consecutively makes the lesson visceral. You'll never again think genre is about chord choice — it's about where notes sit in time." }
      ],
      feel: "Each version should feel genuinely different — like four different songs. If they all sound the same, you're not exaggerating the timing differences enough.",
      wrong: "If you can't hear the difference between versions, your timing shifts aren't big enough. Exaggerate. Make the reggae version absurdly late. Make the surf version push hard. Subtlety comes after you can do the extremes.",
      sarah: "Gene, this is the most ear-opening exercise in Level 11. Once you hear that the same melody becomes four genres just by shifting timing, you'll never hear music the same way. And timing is only half the story — your tone choice IS your genre choice too. Spring reverb = surf. Fuzz = psych. Clean chop = reggae. Tape echo = cinematic. Flatwounds + parked wah = Khruangbin. When you write your originals, set your tone FIRST — it tells your fingers what genre to play.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-11-7",
      time: 10,
      title: "Song Deconstruction II",
      type: "listen",
      what: "Full 5-layer analysis of an Allah-Las or Skinshape track: (1) Structure map — section lengths in bars, (2) Harmonic rhythm — how often chords change per section, (3) Melodic contour — where's the highest note and what word lands on it?, (4) Lyric density — syllables per beat in verse vs chorus, (5) Prosodic audit — do stressed syllables land on strong beats? This is reverse-engineering at the professional level.",
      steps: [
        { text: "Pick a track by Allah-Las, Skinshape, or DOPE LEMON. Listen through once without analyzing — just absorb the feel and identify section boundaries.", why: "The first listen is for the emotional map. Where do you feel tension, release, lift, resolution? These feelings correspond to structural and harmonic choices you'll identify on deeper listens." },
        { text: "Layer 1 — Structure map: Listen again with a stopwatch. Mark when each section starts. Count bars. Write it down: Intro (4 bars), Verse 1 (8 bars), Chorus (8 bars), etc.", why: "Structure is the skeleton of a song. Most songs in your genres use 4-bar or 8-bar sections. Knowing this lets you build songs with the same proportional balance." },
        { text: "Layer 2 — Harmonic rhythm: For each section, note how often the chords change. Verse might change every 2 bars. Chorus might change every bar. Bridge might hold one chord.", why: "Harmonic rhythm is one of the most overlooked compositional tools. Faster chord changes create urgency. Slower changes create spaciousness. Great songwriters vary this between sections." },
        { text: "Layer 3 — Melodic contour: Map the melody's shape. Where is the highest note in the whole song? What word is it on? Is the verse melody arch-shaped or valley-shaped?", why: "The highest note in a song is almost never random — it lands on the most emotionally important word. This is a conscious compositional choice you can use in your own songs." },
        { text: "Layer 4 — Lyric density: Count syllables per beat in the verse vs the chorus. Verses are usually denser (more words, storytelling). Choruses are usually sparser (fewer words, sustained notes).", why: "Lyric density creates contrast between sections. Dense verses feel narrative and intimate. Sparse choruses feel anthemic and emotional. The shift in density IS part of the song's emotional design." },
        { text: "Layer 5 — Prosodic audit: Do the stressed syllables in the lyrics land on strong beats (1 and 3)? Or do they land on weak beats for a syncopated feel? Note any mismatches — where stressed words land on weak beats.", why: "Prosody — the marriage of language stress and musical stress — is what separates amateur lyrics from professional ones. When stress aligns with the beat, lyrics sound natural. When they don't, they sound forced." },
        { text: "Write up your complete 5-layer analysis. Record a voice memo summarizing your findings and how you'll apply them to your own songwriting.", why: "The written analysis becomes a reference template. Every time you write a song, you can check it against these 5 layers to ensure professional-level craft." }
      ],
      feel: "This should feel like discovering hidden architecture in a building you've walked past a thousand times. The song hasn't changed — your ability to perceive its construction has.",
      wrong: "If you're only getting surface-level observations ('the verse is quieter'), dig deeper. Count actual bars. Count actual syllables. The precision IS the exercise.",
      sarah: "Gene, you've listened to these artists hundreds of times for pleasure. Now you're listening as a craftsman. Both modes of listening matter — but this one teaches you to build.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-11-8",
      time: 7,
      title: "Strum Pattern as Signature",
      type: "guitar",
      what: "Create YOUR personal strum pattern — a hybrid that blends two of your genre feels. Maybe reggae offbeat + surf jangle accents. Or soul ghost notes + desert blues space. This pattern becomes your compositional fingerprint — the feel that makes your songs sound like YOU.",
      steps: [
        { text: "Review the strum patterns from your four genre originals (ss-9-1 through ss-9-4). Play each one for 30 seconds. Notice what you love about each.", why: "Before you can blend, you need to clearly hear the components. Each genre strum has a distinct character — the offbeat chop, the continuous jangle, the sparse drone, the ghost-note groove." },
        { text: "Pick two genres to blend. Start with the dominant feel (the one you want to be the foundation) and layer in accents from the second genre.", why: "Blending is not averaging. One genre leads, the other seasons. A reggae foundation with surf jangle accents sounds completely different from a surf foundation with reggae offbeats." },
        { text: "Refine the pattern until it feels natural and repeatable. Strum it for 2 full minutes without variation — make it automatic.", why: "A signature pattern needs to be automatic. If you have to think about it, it's not a signature yet. Repetition burns it into your motor memory." },
        { text: "Give it a name. 'Desert Jangle.' 'Porch Soul.' 'Reef Rock.' Whatever captures the blend. Record 2 minutes of the pattern over Am-C-G-Em.", why: "Naming your pattern makes it real. Professional musicians name their feels. This pattern is now a tool in your toolkit — something you can call up for any future song." },
        { text: "Try singing a simple melody over it. Does the hybrid strum inspire different melodic ideas than either genre alone? That's the creative payoff.", why: "A new strum pattern generates new melodies. The rhythm underneath shapes the rhythm above. Your signature strum will naturally produce songs that sound like you." }
      ],
      feel: "When the hybrid strum locks in, it should feel like it was always there — obvious in hindsight. If it feels forced, try a different genre combination.",
      wrong: "If your hybrid sounds like one genre with random disruptions from the other, the blend isn't integrated. The two feels need to merge into a single, cohesive pattern — not alternate between sections.",
      sarah: "Gene, every great guitarist has a signature strum feel. Mark Speer (Khruangbin), Angus Young, Bob Marley — you hear two bars and know who's playing. Now you're building yours.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-11-9",
      time: 8,
      title: "Genre Blend",
      type: "song",
      what: "Create an original that blends TWO of your genre pieces. Reggae verse → surf chorus. Or desert blues verse → soul chorus. Genre-blending is YOUR signature — the 'Coastal Psychedelic Omnivore' sound.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
      steps: [
        { text: "Pick two genres from ss-9-1 through ss-9-4. Use one genre's feel for the verse and the other for the chorus.", why: "Genre-blending creates a sound that belongs to no category — which means it belongs to YOU. Khruangbin does exactly this." },
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
      id: "ss-11-10",
      time: 7,
      title: "Tempo as Mood",
      type: "song",
      what: "Take one of your L9 originals and play it at three tempos: 75 BPM (cinematic, spacious), 90 BPM (groove, conversational), 120 BPM (energetic, driving). Each tempo transforms the emotional character completely. Tempo is a compositional decision, not a default.",
      steps: [
        { text: "Pick your favorite original from ss-9-1 through ss-9-4. Play it at its original tempo to establish the baseline. This is how you know the song.", why: "The baseline is your reference point. You need to know what the song sounds like 'normally' before you can hear how tempo transforms it." },
        { text: "Play it at 75 BPM. Everything slows down — the strum becomes cinematic, the melody breathes, the spaces between notes become part of the music. It feels like a desert sunset.", why: "Slow tempos reveal space. Notes that flew by at 120 BPM now hang in the air. The song becomes contemplative, filmic, weighted." },
        { text: "Play it at 90 BPM. This is the conversational sweet spot — the tempo of walking, of talking, of natural human rhythm. The groove settles in comfortably.", why: "90 BPM is the center of your genre world — soul, Khruangbin, DOPE LEMON all live here. It's the tempo that feels most natural for your porch register." },
        { text: "Play it at 120 BPM. The song becomes energetic and driving — surf energy, forward momentum. The same melody now demands more breath and more commitment.", why: "Fast tempos demand different vocal technique. You'll naturally phrase differently, breathe differently, feel differently. The song transforms." },
        { text: "Record all three. Listen back to back. Which tempo serves the song's emotional message best? That's the tempo you choose. Tempo is a compositional decision.", why: "Most beginning songwriters never try their songs at different tempos. Professionals always do. The 'right' tempo is the one that best serves the song's emotional intent." }
      ],
      feel: "Each tempo should feel like a fundamentally different song. If the three versions feel similar, you're not committing fully to each tempo's character.",
      wrong: "If the slow version sounds like a normal song played lazily, you're not adjusting your delivery. At 75 BPM, sustain notes longer, add more space, let the guitar ring. Each tempo demands different musical behavior.",
      sarah: "Gene, this exercise reveals something profound: you have more songs than you think. Every original you've written contains at least three songs hiding inside it at different tempos.",
      metronome: 75,
      speedLadder: { start: 75, end: 120, step: 15 },
      recorder: true
    },
    {
      id: "ss-11-11",
      time: 7,
      title: "Capo as Catalyst",
      type: "guitar",
      what: "Put a capo at fret 2. Play your familiar Am shape — it's now Bm. The voicings sound different, the key sits differently in your voice, new melodies emerge. Try capo 3, capo 5. Cross-modal learning: changing your physical interface sparks new ideas.",
      steps: [
        { text: "Play Am-C-G-Em without a capo. Sing a familiar melody from one of your originals. This is home base.", why: "You need the contrast. Playing without the capo first makes the change in sound and feel immediately obvious when the capo goes on." },
        { text: "Capo at fret 2. Play the same shapes — they're now Bm-D-A-F#m. Sing your melody. Notice: the key is higher, the guitar voicings ring differently, the whole character shifts.", why: "The capo changes the key without changing your finger patterns. Your hands do the same thing, but your ears hear something new. This is why 54% of singer-songwriters say capo expanded their vocal range." },
        { text: "Capo at fret 3. Same shapes — now Cm-Eb-Bb-Gm. Even higher. Does your melody still work? Does your voice want to go somewhere different? Follow it.", why: "As the key rises, your voice is pushed into different parts of your range. Melodies that sat comfortably in Am might feel strained — or might feel thrilling — in Cm." },
        { text: "Capo at fret 5. Shapes become Dm-F-C-Am. The guitar sounds almost mandolin-like — bright, compressed, chimey. Improvise a new melody that fits this new sound world.", why: "High capo positions transform the guitar's timbre. The shorter string length produces a brighter, more percussive sound that inspires different musical ideas." },
        { text: "Pick the capo position where your voice and the guitar sound best together. Record a 2-minute improvisation. This new key might become your next song's home.", why: "The right key for a song is where the voice sits most expressively and the guitar rings most beautifully. The capo lets you find that intersection without learning new chord shapes." }
      ],
      feel: "Moving the capo should feel like redecorating a familiar room — same furniture, completely different mood. If new melodic ideas start flowing, the capo is doing its job.",
      wrong: "If you're just playing the same thing higher and calling it different, slow down and actually listen. The key change affects which notes are in your comfortable range, which changes the melody. Let your voice respond to the new key.",
      sarah: "Gene, the capo is the simplest creative tool in your bag. Same three-chord shapes you already know, infinite new keys and timbres. It's a cheat code for songwriting.",
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-11-12",
      time: 8,
      title: "Loop Thinking",
      type: "song",
      what: "Even without a loop pedal: record a 4-bar strum on your phone, play it back, sing over the playback. Then imagine adding a second vocal layer — harmony, counter-melody, percussive rhythm. Loop thinking = arrangement thinking. If you had infinite you's, what would each one play?",
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Record a clean 4-bar strum loop on your phone: Am-C-G-Em at 85 BPM. Keep it tight and even — this is your backing track.", why: "The first loop is the foundation. It needs to be rhythmically solid because everything you layer on top will be measured against it." },
        { text: "Play it back. Sing a verse melody over it. This is Layer 2 — voice over guitar. You've done this before, but now think of it as LAYERING, not just singing.", why: "Reframing singing-over-guitar as 'adding a layer' changes your mindset from performer to arranger. You're building a sonic structure, not just playing a song." },
        { text: "Now imagine Layer 3: if you could add a second voice, what would it do? A harmony a third above? A counter-melody in a different rhythm? Hum it while the recording plays.", why: "Imagining layers you can't yet record develops your arrangement ear. Professional producers think in layers — bass, rhythm, lead, harmony, texture. You're learning to think this way." },
        { text: "Imagine Layer 4: a percussive vocal — beatboxing, rhythmic breathing, tongue clicks. Even crudely imagined, this adds a textural dimension.", why: "Percussive vocal layers are used by Ed Sheeran, Jacob Collier, and Bon Iver. Thinking about them expands your conception of what 'your voice' can contribute to a song." },
        { text: "Record a voice memo describing your imagined arrangement: 'Layer 1 is guitar, Layer 2 is melody, Layer 3 would be a high harmony on the chorus, Layer 4 would be rhythmic breathing in the verse.' This is your first arrangement sketch.", why: "Describing the arrangement in words makes it concrete and recordable. When you eventually have a loop pedal or DAW, you'll know exactly what to build." }
      ],
      feel: "Loop thinking should feel expansive — like seeing your songs in 3D instead of 2D. Each layer adds depth. If you start hearing possibilities you didn't notice before, that's the shift happening.",
      wrong: "If you're only thinking about the melody, you're not thinking in layers. Force yourself to imagine what a second and third voice would do. Even if the ideas are rough, the multi-layer mindset is what matters.",
      sarah: "Gene, this is how Khruangbin builds tracks — layers of simple parts that create something complex together. You're learning to think like a producer, not just a performer.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-11-13",
      time: 8,
      title: "Parasitic Songwriting",
      type: "song",
      what: "Borrow a CHORD PROGRESSION pattern (not a melody) from a genre you love and write a completely original melody and lyrics over it. The chord shape is a template — like a building's foundation. Everything on top is yours. This is how most songs in history have been written.",
      steps: [
        { text: "Pick a common chord progression: I-V-vi-IV (G-D-Em-C), i-III-VII-VI (Am-C-G-F), or i-iv-v (Am-Dm-Em). These belong to no one — they're musical infrastructure.", why: "Chord progressions cannot be copyrighted. They're shared musical language. Hundreds of hit songs use the same 4-5 progressions." },
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
      id: "ss-11-14",
      time: 10,
      title: "Complete Original",
      type: "song",
      what: "Write a complete original song with: intro (4 bars), verse (8 bars), chorus (8 bars), verse (8 bars), chorus (8 bars), outro (4 bars). Melody, lyrics, dynamics. This is your first 'finished' song — not a sketch, but a complete piece you could perform.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }, { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }],
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
      phraseForm: { pattern: ["Intro", "V", "Ch", "V", "Ch", "Outro"], barsPerSection: [4, 8, 8, 8, 8, 4], labels: { Intro: "Intro", V: "Verse", Ch: "Chorus", Outro: "Outro" } },
      volumeContour: true,
      levelUp: "Can create complete original songs in 4 genre styles (reggae, surf-psych, desert blues, soul), create genre-fusion originals, shift micro-timing to transform genre feel, deconstruct songs at all 5 analytical layers, craft a personal strum signature, use tempo as emotional lever, explore capo for compositional catalyst, think in loops/layers, blend genres, and compose a finished song with verse-chorus structure, melody, and lyrics."
    }
  ]
};
