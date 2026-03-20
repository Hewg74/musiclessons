import { getPitchRange } from "../appData.js";

export const level5 = {
  level: 5,
  title: "The Full Scale & Jumps",
  subtitle: "Beyond pentatonic. Tension notes, key diversity, and interval mastery.",
  description:
    "The pentatonic was your safe space — five notes, no wrong combinations. Now expand to the full A natural minor scale by adding B (the pull note) and F (the dark note), explore key diversity across E major and A major, and master jumping between all note pairs in any key. Research shows adult learners benefit from early diatonic exposure — B and F are the tension notes that make your genres (desert blues, psych-surf, reggae) sound like themselves. Interleaved with systematic jump training grounded in contextual interference research for maximum retention.",
  artists: "Tinariwen, Hermanos Gutiérrez, Allah-Las, Khruangbin, DOPE LEMON",
  unlocks: "Voice Combines (Level 6)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["ss-4-17", "ss-4-20"], prompt: "Play Am-C-G-Em in 4 genre feels (ss-4-17). Then do Whisper to Full Voice with pentatonic freedom (ss-4-20). Both fluid? Move on." },
  exercises: [
    // ─── KEY DIVERSITY — INTERLEAVED PRACTICE ───

    {
      id: "ss-5-1",
      time: 7,
      title: "G Major Extended Improv",
      type: "vocal",
      what: "You explored the G major palette briefly in ss-4-8. Now spend real time there. Improvise freely using G major pentatonic (G-A-B-D-E) over a G drone for 4 minutes. Let the brightness of G major seep into your voice. This isn't a quick visit — it's moving in.",
      setup: "Guitar strumming G. Metronome at 80 BPM.",
      steps: [
        { text: "Strum G and sing the G major pentatonic ascending and descending: G-A-B-D-E-D-B-A-G. Feel how each note relates to the G chord underneath. B is the major 3rd — bright and warm. E is the 6th — sweet and floating.", why: "Extended time in a major pentatonic builds a separate mental schema from Am. Your voice learns that 'major' has its own set of melodic instincts — brighter intervals, more open vowels, different emotional gravity." },
        { text: "Free improv: 2 minutes of melodic wandering in G major pentatonic. Use stepwise motion, leaps, silence, dynamics — everything from earlier exercises, but in this new key. Let the major brightness guide your phrasing.", why: "Sustained improvisation in a new key forces your ear to recalibrate. The first minute feels unfamiliar; by the second minute, G major starts feeling like home. That shift is schema formation happening in real time." },
        { text: "Try a call-and-response: guitar plays a short G major phrase, voice answers. Notice how your voice gravitates toward different intervals than in Am. Major keys pull toward the 3rd (B) and 5th (D) differently.", why: "Call-and-response in a new key reveals your melodic instincts. In Am, you probably lean on A and E. In G major, you'll discover new favorite intervals — and those become tools for songwriting." },
        { text: "Record 2 minutes of your best G major improv. Listen back and compare to your Am improvisations. How does your voice sound different? Brighter? More open? More confident? That difference is the point.", why: "Side-by-side comparison makes the key-specific vocal production differences audible. Your voice literally sounds different in G major than in Am — different resonance, different emotional quality." }
      ],
      feel: "G major should feel like stepping out of a cool forest (Am) into warm sunlight. The brightness is not just theoretical — your voice will naturally open up, vowels widen, and phrasing becomes more buoyant.",
      wrong: "If G major feels exactly like Am, you're not hearing the color difference yet. Focus on the B note (major 3rd) — it's the note that doesn't exist in Am pentatonic. Emphasize it until you hear the shift.",
      sarah: "Gene, surf rock and Khruangbin's brighter moments live in major keys. This extended time in G major builds the vocal muscle memory that makes major-key songwriting feel natural — not like a translation from minor.",
      drone: { root: "G", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("G3", "E4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-2",
      time: 8,
      title: "Welcome to E Major",
      type: "vocal",
      what: "Your first genuinely new key family. Everything so far — Am, G, Em, C, D — shares the same notes (A natural minor = C major). E major introduces notes you've NEVER sung: Ab (which musicians also call G# — same sound, different name), C#, and F#. On guitar, E-A-B7 is one of the easiest progressions. This is where surf rock and bright reggae live.",
      setup: "Guitar. Metronome at 75 BPM. New chord: B7 — index finger on 1st fret A string, middle finger on 2nd fret D string, ring finger on 2nd fret G string, pinky on 2nd fret high E string. Open B and high E strings ring. Practice E-A-B7 changes before singing.",
      steps: [
        { text: "Strum E major. Sing the root: E. Hold it against the chord. This is home in E major — same function as A in Am, but a different pitch, a different resonance in your chest.", why: "Establishing a new 'home' note is the first step in building a new key schema. E sits lower than A in most octaves, so your chest voice engages differently." },
        { text: "Sing the E major triad: E-Ab-B. Ab is the major 3rd — on our pitch display it shows as 'Ab' (musicians in E major call this G#, but it's the same sound). Hold Ab and feel how bright it is compared to C (the minor 3rd of Am). This one note is the entire difference between major and minor.", why: "Ab/G# is the note that makes E major MAJOR. In Am, the 3rd is C (minor, dark). In E major, it's Ab (major, bright). Training your ear on this one interval unlocks all major/minor awareness." },
        { text: "Add C# — sing E-Ab-B-C#. This is the E major triad plus the bright 6th. Compare this to Am's A-C-E — feel how E major is more open, more expansive. C# doesn't exist anywhere in the Am/G family.", why: "C# is a note your voice has literally never produced in this curriculum. New notes create new muscle memory, new resonance patterns. This is why practicing in different key families matters — it's not just theory, it's physical vocal development." },
        { text: "Strum the E-A-B7 progression slowly. Sing the root of each chord: E over E, A over A, B over B7. Feel the harmonic movement. B7 creates tension that wants to resolve back to E — same function as D resolving to G, but in a completely different sonic world.", why: "Hearing chord function (tension and resolution) in a new key proves the concept is universal. The B7-to-E pull feels the same as D-to-G but sounds completely different. That's the insight." },
        { text: "Free improv: sing E, Ab, B, C# over the E-A-B7 progression. Just these four notes — explore them the way you explored A, C, E in Level 3. 2 minutes, record it. You're building a new palette from scratch.", why: "Starting with just 4 notes in a new key mirrors the Level 3 approach — constraint breeds mastery. You'll expand to the full E major pentatonic later, but first, make these 4 notes feel like yours." }
      ],
      feel: "E major should feel brighter and more open than anything you've sung so far. Like walking out of a shaded porch into direct sunlight. The Ab and C# notes will feel unfamiliar at first — that's correct. Unfamiliar is where growth happens.",
      wrong: "If you're accidentally singing G natural instead of Ab (G#), you're pulling from your Am muscle memory. Use the drone as a reference — the E major drone includes Ab. Match that note. It's a half-step higher than G.",
      sarah: "Gene, this is Dick Dale territory. This is the Beach Boys. This is the bright, shimmering side of surf rock that your playlists are full of. E major is where that sound comes from — and now your voice lives there too.",
      drone: { root: "E", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("E3", "C#4"),
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-3",
      time: 8,
      title: "Three-Palette Comparison",
      type: "vocal",
      what: "Record yourself improvising in three different keys back-to-back: Am pentatonic, G major pentatonic, E major (4 notes). Listen to all three. The comparison IS the lesson — your voice sounds different in each key, your phrasing changes, your emotional instincts shift. This is what research calls 'contextual interference' — and it's the fastest path to key-independent musicianship.",
      setup: "Guitar. Metronome at 80 BPM. Three drone settings: Am, G, E.",
      steps: [
        { text: "Set drone to Am. Improvise in Am pentatonic (A-C-D-E-G) for 90 seconds. Don't overthink — just sing what comes naturally. Your Am vocabulary is deep by now. Record it.", why: "Am is your anchor key — the key where everything feels automatic. Recording it establishes your baseline. After hearing E major, coming back to Am will feel different." },
        { text: "Switch drone to G major. Improvise in G major pentatonic (G-A-B-D-E) for 90 seconds. Notice the brightness. Your vowels may naturally open wider, your phrasing may become more buoyant. Record it.", why: "G major shares most notes with Am but the emotional center is completely different. Your body responds to the major drone with different vocal production — this is the key-specific effect the research describes." },
        { text: "Switch drone to E major. Improvise with E-Ab-B-C# for 90 seconds. This will feel the most unfamiliar — and that's the point. Embrace the awkwardness. Record it.", why: "E major is genuinely foreign territory — new notes, new intervals, new physical vocal sensations. The difficulty you feel IS the contextual interference that produces deeper learning." },
        { text: "Listen to all three recordings back-to-back. How does your voice change? What happens to your phrasing? Your vowel choices? Your confidence? Write down one observation about each key.", why: "Comparative listening reveals things you can't notice while singing. The three recordings are a mirror showing you three different musical identities — all yours, all valid, all useful for songwriting." }
      ],
      feel: "Am should feel like coming home. G major should feel like a sunlit version of home. E major should feel like visiting a new country — exciting and slightly disorienting. All three feelings are correct.",
      wrong: "If all three recordings sound identical, you're not letting the key influence your singing. Try exaggerating: in Am, lean into dark vowels and descending phrases. In G, lean into bright vowels and ascending phrases. In E, explore the unfamiliar notes Ab and C#.",
      sarah: "Gene, this three-key comparison is the single most important exercise for breaking out of the Am comfort zone. When you hear yourself singing differently in three keys, you'll understand why key diversity isn't just theory — it's creative vocabulary.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },

    // ─── PHASE 9: THE TENSION NOTES — B AND F ───

    {
      id: "ss-5-4",
      time: 7,
      title: "The Pull Note — B",
      type: "vocal",
      what: "Your pentatonic has five notes: A, C, D, E, G. Now meet the sixth: B. B sits a half step below C — the tightest, most tense interval you've encountered. Where D was a bridge and G was a peak, B is a PULL. It yearns upward toward C. This is the note Tinariwen leans on for that desert blues longing.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Sing A, then step up to B. A-B is a whole step — similar to C-D or D-E. Hold B for 8 beats against the drone. It has a restless quality, a lean, a wanting.", why: "B is the 2nd scale degree — naturally unstable. It pulls upward toward C or downward toward A. Unlike the pentatonic notes, B never feels 'settled.' That instability is its power." },
        { text: "Now sing B-C. This is a HALF STEP — the smallest interval in Western music. Feel how tight it is, how B almost melts into C. Alternate: B-C-B-C slowly. The half step creates tension that the whole step (A-B) doesn't.", why: "The half step B-C is the first semitone you've sung deliberately. Half steps create yearning, pull, urgency. They're what makes the blues sound blue and desert music sound longing." },
        { text: "Walk A-B-C-D ascending and D-C-B-A descending. Feel how B fills the gap between A and C — just like D filled the gap between C and E. Now your scale has no gaps: A-B-C-D-E.", why: "With B, you can walk stepwise from A all the way to E without skipping any notes. The scale becomes smoother, more connected, more capable of nuanced melodic movement." },
        { text: "Improvise with six notes: A, B, C, D, E, G (pentatonic + B). Let B appear naturally — as a passing note between A and C, as a tension note held against the drone, as a quick flicker of yearning. 2 minutes, record.", why: "Adding one tension note to the pentatonic doesn't make everything harder — it adds one specific emotional color. B is yearning. Use it when you want that pull, that lean, that ache." },
        { text: "Compare: improvise 1 minute with pentatonic only (A, C, D, E, G), then 1 minute with B added. Listen back. Hear the difference B makes? That's the tension note effect — one note, new emotional dimension.", why: "Side-by-side comparison makes the effect of B audible. The pentatonic sounds complete and safe. Adding B introduces longing and forward motion." }
      ],
      feel: "B should feel like leaning forward — like you're about to say something important but haven't said it yet. When B resolves up to C, the release should feel satisfying, like exhaling.",
      wrong: "If B sounds 'wrong' or 'out of tune,' you might be singing Bb (B-flat) instead of B natural. B natural is a whole step above A. Use the drone and pitch display to calibrate.",
      sarah: "Gene, B is the note that makes Tinariwen sound like Tinariwen. That desert blues yearning — the voice leaning into a note that wants to resolve but you hold it there, suspended in longing. That's B.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "G4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "G4"], label: "Pentatonic + B", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-5",
      time: 7,
      title: "The Dark Note — F",
      type: "vocal",
      what: "The seventh and final note: F. F sits a half step above E — another semitone, another tension point. But where B pulls upward (yearning), F pulls downward (gravity, darkness, weight). F is the minor 6th from A — the most emotionally heavy interval. With F, you have all seven notes of A natural minor: A, B, C, D, E, F, G. The complete palette.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Sing E, then step up to F. E-F is a HALF STEP — tight, heavy, dark. Alternate E-F-E-F slowly. Feel how F creates a downward pull, a weight, a shadow over the bright E.", why: "E-F is the second semitone in A natural minor. Where B-C pulls upward (yearning), E-F pulls downward (gravity). These two half steps are the emotional engine of the minor scale." },
        { text: "Sing A then jump to F. A-F is a wide interval — the minor 6th. Hold both notes long. This is the most bittersweet sound in the scale — not quite sad, not quite sweet, but both at once.", why: "The minor 6th (A-F) is the interval of film music sadness, of nostalgia, of 'almost but not quite.' It appears in Hermanos Gutiérrez, in cinematic western music, in the darkest corners of desert blues." },
        { text: "Walk E-F-G ascending and G-F-E descending. Feel F as the shadow between E and G. Now walk the FULL SCALE: A-B-C-D-E-F-G ascending, G-F-E-D-C-B-A descending. Seven notes. The complete A natural minor.", why: "With all seven notes, you can walk smoothly through the entire scale with no gaps. Every note connects to its neighbors by step. This is the full melodic vocabulary of A minor." },
        { text: "Improvise with all 7 notes: A, B, C, D, E, F, G. Use F for darkness and weight. Use B for yearning and pull. The pentatonic notes (A, C, D, E, G) are your stable ground; B and F are your tension colors. 2 minutes, record.", why: "Seven-note improvisation is a qualitative leap from pentatonic. You now have every note the scale offers — including both semitones. The pentatonic notes remain your safe base; B and F are your expressive spice." },
        { text: "The full natural minor scale is complete. Sing it once more, slowly: A-B-C-D-E-F-G-A. Name each note as you sing it. These seven notes are every melody you'll ever write in A minor.", why: "Naming each note while singing it builds the auditory-label connection that makes future music theory feel intuitive rather than abstract. You're not learning theory — you're labeling what you already feel." }
      ],
      feel: "F should feel heavy, like a stone in your pocket. When you sing A-F, it should feel wide and bittersweet — like looking at a beautiful sunset knowing it will end. When F resolves down to E, the weight lifts.",
      wrong: "If F sounds the same as E to your ear, you're likely singing E again. F is one half step higher — the smallest possible step up. Use the pitch display to see the difference.",
      sarah: "Gene, you now have every note in the A minor scale. The pentatonic was your safe space — beautiful, versatile, can't go wrong. B and F are where the real emotion lives. Hermanos Gutiérrez, the Allah-Las at their darkest, Tinariwen's deepest moments — they're using B and F to break your heart.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-6",
      time: 7,
      title: "Seven-Note Wandering",
      type: "vocal",
      what: "Free exploration of all seven notes — A, B, C, D, E, F, G. Walk the scale, wander through it, mix steps and small leaps. This mirrors your pentatonic wandering (ss-4-2) but with the full palette. Notice how B and F change the color of everything — the melodies that emerge from seven notes sound darker, richer, more complex than pentatonic alone.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Walk the full A natural minor scale ascending: A-B-C-D-E-F-G. Then descending: G-F-E-D-C-B-A. Do this 4 times. Let the scale settle into your voice and your ear.", why: "Scale walking is the foundation of diatonic singing. Once the ascending and descending patterns are automatic, your voice can navigate the full scale without conscious effort." },
        { text: "Wander freely using mostly stepwise motion — each note leads to its neighbor. A-B-C-B-A-B-C-D-E-F-E-D. No big leaps yet, just gentle meandering through all seven notes.", why: "Stepwise wandering through seven notes produces surprisingly beautiful, folk-like melodies. The two half steps (B-C and E-F) add moments of tension that the pentatonic never had." },
        { text: "Add occasional small leaps for contrast: walk for 3-4 notes, then skip one note. A-B-C-E (skipped D). Or D-F-G (skipped E). The leaps add surprise to the wandering.", why: "Mixing steps and small leaps creates more interesting contour than pure stepwise motion. The leaps introduce the 'surprise' element that makes melodies memorable." },
        { text: "2-minute eyes-closed freestyle with all seven notes. Record it. Then listen back-to-back with your pentatonic freestyle (ss-4-7). Hear the difference? The seven-note version is darker, richer, more 'real-song-sounding.'", why: "The comparison reveals what B and F add to your sound. Seven-note melodies sound more like the actual songs you listen to because those songs use all seven notes." }
      ],
      feel: "Seven-note wandering should feel like walking through a landscape with more shadows and depth than the pentatonic meadow. The same trail, but the light is different — more complex, more atmospheric.",
      wrong: "If you keep avoiding B and F and reverting to pentatonic patterns, consciously include them. Try starting a phrase ON B or ON F — make them the departure point, not just passing visitors.",
      sarah: "Gene, the pentatonic was training wheels — beautiful training wheels that professionals use every day, but still a simplified version. Seven notes is the real thing. This is what the Allah-Las, Skinshape, and DOPE LEMON are actually singing. You're there.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-7",
      time: 7,
      title: "Seven-Note Rhythm Play",
      type: "vocal",
      what: "Rhythm applied to all seven notes — mirrors the pentatonic rhythm play (ss-4-5) but with the full palette. Whole notes through the scale, then half notes, then quarter notes. Try syncopation with B and F as landing notes — the tension notes on strong beats create a distinctly different rhythmic flavor than pentatonic notes on strong beats.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Sing through all seven notes using whole notes — one note per bar. A... B... C... D... E... F... G... Slow, deliberate. Notice how B and F feel different when they get a whole bar of attention.", why: "Whole notes on tension notes (B and F) expose their character. B on a strong beat creates pull. F on a strong beat creates weight. You're learning how note choice + rhythm = melodic identity." },
        { text: "Speed up to half notes, then quarter notes. At quarter-note speed, the half steps (B-C, E-F) become quick flickers of tension. Try landing B on beat 1 — feel the yearning emphasis. Then land F on beat 1 — feel the dark emphasis.", why: "Tension notes on rhythmically strong beats create a fundamentally different sound than pentatonic notes on strong beats. This is the same rhythmic skill from ss-4-5 applied to richer harmonic material." },
        { text: "Syncopation with the groove: sing seven-note phrases that land between the Khruangbin backbeat. Put B or F on the offbeat — between the strum hits. The tension notes in the rhythmic gaps create irresistible groove.", why: "Offbeat tension notes over a groove is the signature sound of psych-soul and desert blues. When B or F falls in the gaps, it creates a sense of floating, unresolved mystery." },
        { text: "2-minute freestyle: all seven notes, any rhythm, over the backing track. Use B and F deliberately — not randomly, but when you WANT tension. Record it.", why: "Controlled use of tension notes over a groove is the synthesis of this exercise. When you can choose exactly when B and F appear and where they land rhythmically, you're composing in real time." }
      ],
      feel: "The seven-note rhythmic phrases should sound more complex and more 'professional' than your pentatonic rhythm play. The half steps add a sophistication that the pentatonic can't produce.",
      wrong: "If you're still playing it safe with only pentatonic notes, set a rule: every other phrase MUST include B or F. Force the tension notes into your rhythm until they feel natural.",
      sarah: "Gene, this is the sound of Khruangbin's vocal lines — pentatonic with occasional tension notes placed on rhythmically interesting beats. Laura Misch does the same thing. The seven-note palette over this groove is exactly where your music lives.",
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-8",
      time: 7,
      title: "Seven-Note Conversation",
      type: "vocal",
      what: "Guitar-voice call and response with all seven notes — the richest conversation yet. The guitar now has B and F available for calls; the voice has them for answers. Try phrases that emphasize the tension notes — a guitar call ending on B demands a voice answer that resolves or extends the tension.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Guitar plays a phrase using all seven notes — include B or F deliberately. Voice answers with a phrase that responds to the tension. If the guitar ends on B (tension), the voice might resolve to C (release) or hold the tension.", why: "Tension-and-resolution in call-and-response is the foundation of musical dialogue. When one voice creates tension, the other can resolve it, extend it, or mirror it — each choice has a different emotional effect." },
        { text: "Try a conversation using ONLY B and F — the tension notes. Guitar: B-F-B. Voice: F-B-F. Pure tension, no resolution. How does it feel? Unresolved, floating, mysterious.", why: "Isolating the tension notes reveals their character in pure form. A conversation in only B and F has a specific, haunting quality that you'll recognize from cinematic and ambient music." },
        { text: "Now alternate: tension call, pentatonic answer. Guitar plays a phrase ending on F (dark). Voice answers with a pentatonic phrase ending on A (home). The contrast between tension and resolution drives the conversation forward.", why: "Mixing tension calls with pentatonic answers creates dramatic arc within the conversation. This push-pull between instability and stability is the engine of all tonal music." },
        { text: "Free conversation, all seven notes, 3 minutes. Record it. Listen for the moments where B and F made the dialogue more interesting than it would have been with pentatonic alone.", why: "Extended conversation with the full palette is where you discover your natural relationship with the tension notes. Some musicians love F; others lean on B. Your preference is part of your voice." }
      ],
      feel: "The seven-note conversation should feel more dramatic and emotionally varied than the pentatonic version. The tension notes add stakes — when B or F appears, something needs to happen next.",
      wrong: "If the conversation feels the same as your pentatonic conversations, you're not using B and F enough. Make a rule: every other phrase must include at least one tension note.",
      sarah: "Gene, this conversation is richer than anything you've done before. Seven notes means every phrase has more options — and the tension notes mean the stakes are higher. When the guitar calls with B, your voice has to decide: resolve the tension or ride it. That decision IS musical expression.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 80,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-5-9",
      time: 8,
      title: "Tension Groove",
      type: "vocal",
      what: "Genre-feel improv emphasizing B and F over backing tracks — mirrors the Pentatonic Groove Palette (ss-4-15) but with the tension notes as featured players. Desert blues leans on B for yearning. Reggae uses B as a pull into C for one-drop phrasing. Surf uses F for weight and drama. Three genres, the tension notes are what make each one distinctive.",
      setup: "Guitar. Choose backing tracks by genre.",
      tracks: [
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }
      ],
      steps: [
        { text: "Desert blues (2 min): Play over the desert blues groove. Lean heavily on B — hold it, bend into it, let it hang unresolved. B is the Tinariwen note, the Saharan longing note. Sing mostly in the lower register (A3-D4). Let the tension build and release slowly.", why: "Desert blues thrives on sustained tension. B held against the drone creates that hypnotic, yearning quality that defines the genre. The groove is sparse — your voice fills it with emotion." },
        { text: "Reggae (2 min): Switch to the one-drop groove. Use B as a quick approach note — B pulling up to C on the offbeat. The B-C half step in a reggae context sounds like roots reggae at its most soulful. Keep phrases short, behind the beat.", why: "In reggae, half steps are used as quick ornamental pulls — B slides up to C like a vocal scoop. The one-drop groove provides the pocket; B-C provides the soul." },
        { text: "Surf rock (2 min): Switch to the surf groove. Use F for weight and drama — F on a downbeat adds gravity to otherwise bright phrases. The A-F interval over surf rock sounds cinematic and slightly dark. Let it ride.", why: "Surf rock uses the minor 6th (A-F) for its darker, more dramatic moments — think Dick Dale's moodier passages or the Allah-Las' darker songs. F adds shadows to the sunshine." },
        { text: "Record all three. Listen back — hear how B and F transform each genre differently? Same notes, completely different emotional effects depending on the groove context.", why: "Context shapes meaning. B in desert blues = longing. B in reggae = soul. F in surf = drama. The notes are tools; the genre is the intention. This is the core of expressive musicianship." }
      ],
      feel: "Each genre should sound DIFFERENT despite using the same seven notes. The groove determines the mood; B and F are the spice that makes each genre taste distinct.",
      wrong: "If all three genres sound the same, you're not adapting to the groove. In desert blues, slow down and hold notes. In reggae, shorten phrases and go behind the beat. In surf, ride the tempo and use dynamics.",
      sarah: "Gene, this is the exercise where your playlists come alive in your voice. Desert blues B is Tinariwen. Reggae B-to-C is Protoje. Surf F is Allah-Las at their darkest. These are YOUR genres, and now you have the notes that make them real.",
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true
    },

    // ─── PHASE 10: JUMP TRAINING ───

    {
      id: "ss-5-10",
      time: 7,
      title: "First Jumps — From A",
      type: "vocal",
      what: "Until now, most of your singing has been stepwise — moving to the next adjacent note. Now practice JUMPING: singing one note, then leaping to a non-adjacent note. Start from A (home) and jump to each of the other six notes. Each jump has a different size and a different emotional flavor.",
      setup: "Guitar. Drone on A. Metronome at 70 BPM.",
      steps: [
        { text: "A→B (one step up — intimate, close). Sing A for 2 beats, jump to B for 2 beats. Then reverse: B→A. Repeat 4 times. Feel how small and personal this jump is.", why: "Starting with the smallest jump calibrates your ear. A→B is just a whole step — comfortable, warm, intimate. This is the baseline for feeling larger jumps." },
        { text: "A→C (minor 3rd — the 'ache'). Sing A for 2 beats, jump to C for 2 beats. This is wider — a skip, not a step. You know this jump from Level 3 — now feel it consciously. Then A→D (perfect 4th — 'lift') and A→E (perfect 5th — 'openness').", why: "Each progressively wider jump has a distinct emotional character. Minor 3rd = ache. Perfect 4th = hope/lift. Perfect 5th = heroic openness. These are the fundamental emotional colors of melody." },
        { text: "A→F (minor 6th — 'bittersweet'). This is a wide jump — heavy, cinematic, melancholy. Then A→G (minor 7th — 'yearning'). The widest jump, pulling toward resolution. Hold each landing note and feel the tension.", why: "The widest jumps (to F and G) are the most emotionally charged. A→F is the Hollywood sadness interval. A→G is blues yearning. These are the jumps that make listeners feel something." },
        { text: "Quick-fire round: someone calls a note name (or you randomize), you jump from A to that note instantly. No hesitation. 2 minutes. Record it — can you hear the different sizes?", why: "Instant recall of any jump from A builds the neural pathways for interval navigation. When you can jump from home to any note without thinking, you have the foundation for melody writing." }
      ],
      feel: "Each jump should feel distinctly different — like reaching for objects at different distances. A→B is reaching for your phone. A→G is reaching for the top shelf. The physical sensation in your voice changes with the distance.",
      wrong: "If all jumps feel the same, slow down and hold each landing note for 4 beats. The destination matters as much as the launch. Really ARRIVE on each note.",
      sarah: "Gene, this is where your improvisation goes from 'walking through the scale' to 'painting with distance.' Every great melody is a sequence of jumps — some small, some dramatic. You're building the vocabulary of distance.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-11",
      time: 8,
      title: "Jumps From Everywhere",
      type: "vocal",
      what: "Now jump from EVERY note, not just A. Start on C, jump to G. Start on D, jump to B. Start on F, jump to A. There are 21 unique pairs between 7 notes — and each pair has its own character. The key insight: A is not the only valid starting point. Every note is a valid home base for a jump.",
      setup: "Guitar. Drone on A. Metronome at 70 BPM.",
      steps: [
        { text: "Jumps from C: C→D, C→E, C→F, C→G, C→A, C→B. Sing each pair 4 times (up and down). Notice: starting from C feels different than starting from A. C is the minor 3rd — launches from here have a bluesy departure point.", why: "Changing the starting note changes everything. C as a launch pad produces different melodic feelings than A. This trains your ear to navigate from ANY position in the scale, not just from home." },
        { text: "Jumps from D and E: D→F, D→G, D→A, D→B, D→C. Then E→G, E→A, E→B, E→C, E→F. Quick-fire — 4 reps each pair. Feel how each starting note has its own gravity.", why: "D is restless (the bridge note). E is stable (the 5th). Jumping from each produces different emotional trajectories. A jump from a stable note feels like departure. A jump from an unstable note feels like searching." },
        { text: "Jumps from the tension notes: F→A, F→B, F→C, F→G. Then B→D, B→E, B→F, B→G. Starting on B or F — the tension notes — makes every jump feel urgent, unresolved.", why: "Launching from tension notes is the most advanced interval skill. When your starting point is already unstable, the jump carries extra emotional weight. This is how melodic tension chains work." },
        { text: "Random pairs: have someone call two notes (or draw from a hat). Jump between them. Any pair, any direction. 2 minutes. How fast can you find the interval?", why: "Random pair calling eliminates any remaining dependency on specific starting notes. When you can jump between ANY two notes on demand, your melodic vocabulary is truly complete." }
      ],
      feel: "By the end, you should feel equally comfortable starting from ANY note — not just A. The scale has no privileged starting point for jumps. Every note is a valid launch pad.",
      wrong: "If jumps from B and F feel impossible, spend extra time on those. Sing B as your 'home' for 8 beats, then jump outward. The tension notes need to feel like viable starting points, not just destinations.",
      sarah: "Gene, most singers only jump from the root. You're training to jump from ANYWHERE — and that's what makes a melody unpredictable and interesting. When you can start a phrase on F and leap to D, you're writing melodies no one expects.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-12",
      time: 7,
      title: "Half-Step Mastery",
      type: "vocal",
      what: "The two hardest jumps in the scale: B↔C and E↔F. These half steps are where most singers go out of tune. Dedicated practice here pays off in EVERY melody you'll ever sing — because half steps appear in every key, every mode, every style. Master these two intervals and your intonation improves across the board.",
      setup: "Guitar. Drone on A. Metronome starting at 60 BPM.",
      steps: [
        { text: "Slow alternation: B-C-B-C-B-C at 60 BPM (one note per beat). Use the pitch display — are you hitting B and C accurately, or sliding between them? The half step is so small that imprecision is easy to miss.", why: "Half steps require finer muscle control than whole steps. Slow practice with visual feedback (pitch display) builds the neuromuscular precision that fast practice cannot. This is the violin approach: slow, perfect, then faster." },
        { text: "Same with E-F-E-F-E-F at 60 BPM. E-F has a different physical sensation than B-C — it's in a different part of your range and uses slightly different vocal muscles. Both half steps need separate practice.", why: "E-F and B-C are acoustically identical intervals but physically different for the voice. Each half step has its own muscle memory that must be trained independently." },
        { text: "Speed up gradually: try 70 BPM, then 80. At each tempo, check the pitch display. Accuracy matters more than speed. If the notes blur together at 80, go back to 70.", why: "The speed-accuracy tradeoff is real for half steps. Your goal is to maintain distinct, accurate pitch at increasing speeds. This is pure ear-training for vocal precision." },
        { text: "Embed the half steps in melodies: walk A-B-C (B is the approach note pulling into C). Walk D-E-F (F is the color note adding darkness after E). Now try phrases that START on B or F and step away. 2 minutes freestyle, record.", why: "Half steps in melodic context are more useful than half steps in isolation. When B leads into C within a phrase, the pull is musical, not just technical. When F follows E, the darkness is expressive, not just an exercise." }
      ],
      feel: "Half-step practice should feel like tuning a fine instrument — precise, careful, rewarding when accurate. The pitch display is your mirror. When B and C appear as two distinct notes (not a smear), you've got it.",
      wrong: "If B and C sound like the same note, you're not moving enough. A half step is SMALL but it IS a step. If they sound too far apart, you're overshooting — probably singing Bb-C instead of B-C.",
      sarah: "Gene, this is the exercise that makes your voice trustworthy. When you can nail half steps consistently, everything else is easy. Professional singers drill half steps their entire careers. This is where precision meets expression.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 60
    },
    {
      id: "ss-5-13",
      time: 7,
      title: "Jump Improv — Leaps Only",
      type: "vocal",
      what: "Free improvisation where stepwise motion is BANNED. Every note must be a leap — skip at least one scale note between each pitch. This creates angular, jagged, unexpected melodies that force your ear to navigate wide intervals. No walking allowed. Only jumping.",
      setup: "Guitar. Drums-only track for rhythm.",
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "2 minutes over the Am drone: sing only leaps. A→D→F→C→G→B→E. Skip at least one note between each pitch. No A-B, no C-D, no E-F. Only jumps. It will feel strange at first.", why: "Banning stepwise motion forces your ear into unfamiliar territory. Most singing relies heavily on adjacent notes — removing that crutch reveals how well you actually know the interval distances." },
        { text: "2 minutes over the drums: same rule (leaps only) but now with rhythm. The angular intervals over a groove create a completely different kind of melody — think modern jazz vocals or avant-garde pop.", why: "Angular melodies over a groove produce a sophisticated, unpredictable sound. This is the territory of artists like Bjork, Robert Wyatt, or the weirder moments of Radiohead — melody that surprises." },
        { text: "Challenge: try to make the leaps-only improv sound MUSICAL, not random. Give the jagged intervals emotional intent — each leap should feel deliberate, not accidental. Land on notes with confidence.", why: "The difference between random leaping and intentional leaping is conviction. When you land on F after jumping from C, COMMIT to F. Hold it. Mean it. Intentional leaps are expressive; random leaps are noise." },
        { text: "Record both sections. Listen back — which leaps sounded best? Which surprised you? The unexpected combinations that sound great are melodic ideas you'd NEVER have found through stepwise motion.", why: "Leaps-only improvisation is a creativity generator. The constraint forces novel combinations that your stepwise habits would never produce. Some of these 'accidental' intervals will become signature phrases in your songwriting." }
      ],
      feel: "This should feel like jumping between rocks in a stream — each leap requires a moment of faith before you land. The angularity is the point. Smooth comes later; right now, embrace the jaggedness.",
      wrong: "If you catch yourself singing A-B-C-D (stepwise), stop and skip: A-C-E-G. The rule is absolute — every note must skip at least one pitch. If it feels impossible, start with just 3 notes (A, D, G — all leaps) and add more as you gain confidence.",
      sarah: "Gene, leaps-only improv is the most creatively explosive exercise in this level. The melodies that emerge from pure jumping are unlike anything you'd write on purpose — and some of them will be genuinely beautiful. Accidents become ideas.",
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-14",
      time: 8,
      title: "Random Jump Roulette",
      type: "vocal",
      what: "Maximum ear training: draw two random notes, sing the jump between them. No preparation, no pattern, pure ear navigation. Write A, B, C, D, E, F, G on slips of paper (or use a randomizer app). Draw two. Sing the first, jump to the second. Draw again. The unpredictability forces your ear to calculate intervals in real time.",
      setup: "Guitar. Drums-only track. Seven slips of paper with note names (or a randomizer app on your phone).",
      tracks: [{ name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      steps: [
        { text: "Draw two notes. Sing the first for 2 beats, jump to the second for 2 beats. Draw again. Repeat for 2 minutes. Don't overthink — just find the note. Speed matters less than accuracy.", why: "Random interval calling is the gold standard of ear training. When you can find any interval on demand without preparation, you have genuine interval fluency — not just pattern memory." },
        { text: "Same drill, but now name the EMOTION of each jump before moving on. D→F: 'that feels dark.' A→E: 'that feels open.' Build the emotional vocabulary of intervals. 2 minutes.", why: "Linking each interval to an emotion creates a second retrieval pathway. You can find intervals by sound (ear) OR by feeling (emotion). Two paths to the same note make you faster and more expressive." },
        { text: "String 4 random jumps together into a melody: draw 4 pairs, sing them connected. The random sequence creates phrases you'd never compose on purpose. Some will sound terrible. Some will sound amazing. Keep the amazing ones.", why: "Random-generated melodies are the ultimate creative surprise. The intervals your conscious mind would never choose can produce striking, original phrases. Songwriters use random constraints to escape their habits." },
        { text: "Final round: keep drawing pairs until you find one that MOVES you emotionally. Repeat that pair 8 times, embedding it in different rhythmic contexts. This random-discovered interval is now yours — a found object that becomes a compositional tool.", why: "The roulette doesn't just train your ear — it discovers your unconscious preferences. The jump that moves you reveals something about your musical identity that deliberate practice can't uncover." }
      ],
      feel: "The roulette should feel playful — like a game, not a test. Some jumps will be easy (A→E), some hard (B→F). The surprise is the fun part. Laugh at the hard ones. Celebrate the beautiful ones.",
      wrong: "If you're peeking at the slips and choosing 'easy' pairs, shuffle harder. The whole point is randomness. If a pair feels impossible (F→B?), slow down and use the drone to guide you there. Every pair IS singable.",
      sarah: "Gene, this is musical roulette — and it's the most fun exercise in the whole curriculum. Every draw is a tiny adventure. Some combinations will surprise you with how beautiful they sound. Those surprises become the building blocks of songs nobody else could write.",
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-15",
      time: 7,
      title: "Emotional Jumping",
      type: "vocal",
      what: "The final exercise: choose jumps by FEELING, not by name. Small jumps feel intimate. Wide jumps feel dramatic. Tension-note jumps feel dark or yearning. Build emotional arcs using only the distance between notes. This is where interval training becomes musical expression — you stop thinking about 'A to F' and start thinking about 'I want that bittersweet feeling.'",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Map the emotions: sing A→B (intimate, close). A→C (ache). A→D (lift). A→E (openness). A→F (bittersweet, dark). A→G (yearning, longing). Say the feeling out loud after each jump. Build the emotion-interval dictionary.", why: "Associating each interval with a feeling creates a new kind of musical vocabulary — one based on emotion, not theory. When you want 'yearning,' you reach for A→G without thinking about 'minor 7th.'" },
        { text: "Emotional request round: someone says a feeling (or you pick a card with emotions written on it). Find the jump that matches. 'Give me sadness' → A→F. 'Give me hope' → A→D. 'Give me tension' → E→F. Can you find the right interval for each emotion?", why: "Emotion-to-interval translation is the composer's core skill. Songwriters don't think 'I'll use a perfect 5th here.' They think 'I want openness here' — and their trained ear produces the right interval automatically." },
        { text: "Build a mood arc using only jumps: Start dark (F-based jumps, wide intervals). Gradually shift to more open (E-based, D-based). End intimate (B-based, small steps). The emotional journey lives in the interval choices. 2 minutes, record.", why: "An emotional arc built from interval choices is a melody in its purest form — stripped of rhythm, lyrics, and harmony. If the arc FEELS like a journey using only jump distances, you understand melody at its deepest level." },
        { text: "Listen to the recording. Can you hear the mood shift? Dark → open → intimate? The intervals are doing the emotional work. This is how melodies communicate feeling — and now you can do it consciously.", why: "Conscious control of emotional arcs through interval selection is the highest-level melodic skill. Everything from here forward — songwriting, harmony, performance — builds on this foundation of feeling through distance." }
      ],
      feel: "This should feel like painting with emotions — each jump is a brushstroke, and the combination of jumps creates a mood. You're not singing notes anymore. You're singing feelings.",
      wrong: "If all the jumps feel emotionally neutral, exaggerate. Sing the dark jumps with dark vowels and low volume. Sing the open jumps with bright vowels and projection. Let your voice's expression match the interval's character.",
      sarah: "Gene, this is where everything connects. The notes, the tension, the jumps — they all serve one thing: emotion. When you can choose a jump because of how it FEELS, not what it's called, you're thinking like a songwriter. Every melody you write from now on will have this emotional vocabulary underneath it.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 75
    },

    // ─── PHASE 11: CROSS-KEY JUMP TRAINING ───

    {
      id: "ss-5-16",
      time: 8,
      title: "E Major Jumps",
      type: "vocal",
      what: "Jump training in E major — a completely different set of intervals than Am. The E major pentatonic (E-F#-Ab-B-C#) has different distances between notes, different physical vocal sensations, different emotional flavors. Ab and C# are notes that don't exist in Am at all. Jumping between them builds key-independent interval navigation.",
      setup: "Guitar strumming E. Drone on E. Metronome at 70 BPM.",
      steps: [
        { text: "Review the E major pentatonic: E-F#-Ab-B-C#. Sing it ascending and descending against the E drone. These notes should be familiar from ss-5-2 — but now you're going to jump between them, not walk.", why: "Jumping in E major forces your ear to calculate intervals in a new tonal context. The 'same' size jump (like a minor 3rd) sounds and feels different when it's Ab→B instead of A→C." },
        { text: "Jumps from E: E→F# (close), E→Ab (bright major 3rd), E→B (open 5th), E→C# (warm 6th). Sing each pair 4 times. Compare to the Am jumps — E→B has the same SIZE as A→E (both are 5ths) but a completely different COLOR.", why: "Comparing the same interval size in two keys proves that intervals are key-colored, not abstract. A perfect 5th in E major sounds different than a perfect 5th in Am — different resonance, different vocal placement." },
        { text: "All 10 E major pentatonic pairs: E→F#, E→Ab, E→B, E→C#, F#→Ab, F#→B, F#→C#, Ab→B, Ab→C#, B→C#. Quick-fire — 4 reps each. Some are easy (E→B), some are tricky (F#→C#). Note which ones challenge you.", why: "Systematic coverage in a new key builds the abstract interval schema that research says transfers across all keys. Every pair you master in E major makes the same interval easier in every other key." },
        { text: "Random E major pairs: draw two notes from E, F#, Ab, B, C#. Jump between them. 2 minutes. Then switch to Am and do random Am jumps for 1 minute. Feel the key switch in your body.", why: "Alternating between Am and E major random jumps is the ultimate contextual interference for interval training. Your brain must reconfigure for each key — and that reconfiguration builds flexibility." }
      ],
      feel: "E major jumps should feel brighter and more 'electric' than Am jumps — like the difference between an acoustic guitar and a Fender Stratocaster. The intervals have the same math but completely different vibes.",
      wrong: "If you're accidentally singing Am notes (C natural instead of C#, G instead of Ab), the E major drone will clash audibly. Use the drone as your guide — if it sounds wrong, you're in the wrong key.",
      sarah: "Gene, jumping in E major is where your surf-rock instincts come alive. These intervals — E to Ab, F# to C# — are the building blocks of every Allah-Las melody, every Beach Boys harmony. You're not just training your ear. You're learning to think in surf.",
      drone: { root: "E", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("E3", "C#4"),
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-17",
      time: 8,
      title: "A Major Jumps",
      type: "vocal",
      what: "Jump training in A major — same ROOT as Am but completely different notes. A major pentatonic is A-B-C#-E-F#. Compare A→C# (major 3rd, bright) to A→C (minor 3rd, ache). Same starting note, different destination, different emotion. This comparison IS the major/minor distinction, felt through jumping.",
      setup: "Guitar strumming A. Drone on A. Metronome at 70 BPM.",
      steps: [
        { text: "Sing A major pentatonic: A-B-C#-E-F#. Against the A major drone. Notice: A and B are the same as Am. But C# replaces C, and F# replaces... nothing (F doesn't exist in Am pentatonic, but F# doesn't exist in Am diatonic either). These are genuinely new vocal targets.", why: "A major shares the ROOT with Am but almost nothing else. C# vs C is the defining difference — the 'happy vs sad' toggle. Jumping from A to C# vs A to C is the most direct way to feel the major/minor switch." },
        { text: "The comparison jump: A→C (minor 3rd, ache — from your Am training). Then A→C# (major 3rd, brightness — new). Alternate: A→C, A→C#, A→C, A→C#. Feel the half-step difference between 'sad' and 'happy.' This is the most important interval distinction in all of music.", why: "The minor-3rd vs major-3rd comparison is the foundation of all harmonic understanding. When you can feel the difference in your body — not just hear it — you understand harmony at a visceral level." },
        { text: "All 10 A major pentatonic pairs. Focus on the ones that differ from Am: A→C# (vs A→C), A→F# (vs A→F), B→C# (half step in Am context too, but now it's B to major 3rd), C#→E, C#→F#. 4 reps each.", why: "The pairs that overlap with Am (A→B, A→E, B→E) are easy — you've done them. The new pairs (involving C# and F#) are where A major becomes its own key, not just a variation of Am." },
        { text: "Reggae jumping: over an A-D-E strum pattern, practice jumping between A major pentatonic notes with behind-the-beat timing. The jumps should feel warm, laid-back, roots-reggae. 2 minutes, record.", why: "A major in a reggae context is the sound of classic roots rock — bright, warm, optimistic. Jumping in A major over reggae is where this training meets Gene's genre DNA." }
      ],
      feel: "A major should feel like Am's optimistic twin — same home note, brighter colors everywhere else. The jumps feel warmer, more open, less shadowy than Am jumps.",
      wrong: "The biggest trap: singing C natural instead of C# from muscle memory. Your Am training is deep — the pull toward C is strong. Use the A major drone to keep your ear calibrated to C#.",
      sarah: "Gene, A major jumps over a reggae groove is Bob Marley, Slightly Stoopid, Pepper at their brightest. The C# is what makes it sunshine instead of shadow. You're learning to jump in the key of joy.",
      drone: { root: "A", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "F#4"),
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-18",
      time: 10,
      title: "Three-Key Jump Roulette",
      type: "vocal",
      what: "The ultimate interval training: randomize not just the NOTES but the KEY. Round 1: random Am pairs. Round 2: random E major pairs. Round 3: random A major pairs. The key switches every round. Your brain must reconfigure interval calculations for each key — this is maximum contextual interference and the fastest path to key-independent ear training.",
      setup: "Guitar. Drums-only track (key-agnostic). Three sets of note slips: Am (A,B,C,D,E,F,G), E major (E,F#,Ab,B,C#), A major (A,B,C#,E,F#).",
      tracks: [{ name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      steps: [
        { text: "Round 1 (2 min): Draw from the Am pile. Random pairs, jump between them. This is your comfort zone — let it flow.", why: "Starting with Am grounds you before the key switches begin. It's the warm-up round." },
        { text: "Round 2 (2 min): Switch to E major pile. Random pairs from E, F#, Ab, B, C#. The shift should feel jarring at first — different notes, different vocal targets. Let your ear adapt.", why: "The key switch from Am to E major forces a complete recalibration. Every interval is in a new position. The adjustment time shortens with practice." },
        { text: "Round 3 (2 min): Switch to A major pile. Random pairs from A, B, C#, E, F#. Same root as Am but different colors. The C# catches you every time you expect C.", why: "A major after E major is an interesting switch — both have sharps, but centered differently. Your ear is now navigating three distinct tonal worlds." },
        { text: "Round 4 (3 min): MIX ALL THREE PILES. Draw any pair from any key — you won't know which key you're in until you see the notes. Strum the matching chord (Am, E, or A) and jump. Pure ear chaos. Record it.", why: "Mixed-key random jumping is the most cognitively demanding ear training possible. When you can do this fluently, you can navigate ANY key by ear — not just the three you practiced." },
        { text: "Listen back. Rate your fluency in each key 1-5. The weakest key is tomorrow's practice priority.", why: "Self-assessment after cross-key roulette reveals exactly where your key-independence has gaps. Targeted follow-up is more efficient than repeated full roulettes." }
      ],
      feel: "This should feel like a cognitive workout — demanding, slightly chaotic, but exhilarating when you nail a jump in an unfamiliar key. The chaos is the learning.",
      wrong: "If you freeze at every key switch, simplify: do 1-minute rounds instead of 2. Or limit each key to just 3 notes (root, 3rd, 5th) instead of the full pentatonic. Reduce variables until the switching feels manageable.",
      sarah: "Gene, three-key jump roulette is the exercise that makes everything else in this curriculum possible. When your ear can navigate random intervals in three different keys, you can sing over ANY chord progression in ANY key. This is musicianship.",
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-19",
      time: 8,
      title: "Cross-Key Emotional Arcs",
      type: "vocal",
      what: "The capstone of all jump training: build emotional arcs that CROSS keys. Start in Am (dark, intimate jumps using F and B). Shift to A major (bright, warm jumps using C# and F#). End in E major (electric, expansive jumps using Ab and C#). The emotional journey moves from shadow to light — and the keys carry the emotion through interval color alone.",
      setup: "Guitar. Metronome at 75 BPM.",
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "2 min — Am darkness: strum Am, use only dark/tense jumps. A→F (bittersweet), B→F (diminished tension), E→F (heavy half step). Small intervals, low register, heavy vowels. Build a mood of introspection.", why: "Starting in Am with dark intervals establishes the emotional floor. The shadow is where the journey begins — every sunrise needs a night before it." },
        { text: "2 min — A major warmth: switch to A strum. Same root, brighter intervals. A→C# (major brightness), A→F# (warm 6th), C#→E (gentle step). The same 'A' home note but the world around it has changed from shadow to sun.", why: "The Am → A major switch is the most powerful key change in music. Same home, different mood. Feeling this through JUMPS makes the contrast physical, not just theoretical." },
        { text: "2 min — E major electricity: switch to E strum. E→Ab (bright 3rd), E→C# (soaring 6th), F#→B (open 4th). Wider intervals, higher energy, surf-rock brightness. This is the emotional peak.", why: "E major is the most distant key from Am in this curriculum. Arriving here after Am → A major feels like a journey from midnight to noon. The intervals carry the emotional altitude." },
        { text: "Record the full 6-minute arc. Listen back as one continuous piece. Can you hear the emotional journey? Dark → warm → electric? The keys and intervals did that — no lyrics, no chords changes, just jumping with intent.", why: "A cross-key emotional arc built from intervals alone is composition at its most elemental. If the recording FEELS like a journey, you understand how melody communicates emotion across keys." }
      ],
      feel: "The three sections should feel like three different emotional landscapes connected by a thread — your voice. Am is the cave. A major is the meadow. E major is the mountaintop. The journey between them is the music.",
      wrong: "If all three sections sound the same, you're not committing to the key changes. Exaggerate: in Am, go dark and quiet. In A major, brighten your vowels and add volume. In E major, go full energy. Let the key dictate the performance.",
      sarah: "Gene, this is the exercise that proves you're a musician, not just a singer. Building an emotional arc across three keys using only interval jumps — that's what composers do. When you listen back and hear the journey from dark to bright, you'll know: you have the tools to write songs that take people somewhere.",
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true,
      metronome: 75,
      levelUp: "Can walk stepwise through all 7 notes of A natural minor, improvise freely across pentatonic and diatonic scales, sing tension notes B and F with emotional intent, hold seven-note conversations with tension-resolution dynamics, lock into genre grooves emphasizing B and F for desert blues yearning and surf rock darkness, jump between all 21 note pairs in Am from any starting point, nail half-step precision on B↔C and E↔F, improvise angular leaps-only melodies, navigate random interval jumps by ear, choose jumps by emotional color, jump systematically in E major and A major pentatonics, navigate random cross-key interval roulette across three keys, build emotional arcs through key-crossing interval journeys, switch between minor and major palettes, and compare musical identity across three key centers — all while the guitar strum stays on autopilot."
    }
  ]
};
