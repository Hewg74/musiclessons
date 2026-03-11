import { getPitchRange } from "../appData.js";

export const level4 = {
  level: 4,
  title: "Voice Combines",
  subtitle: "Two skills at once. This is where it starts to feel like music.",
  description:
    "Level 3 isolated each skill individually. Now combine them in pairs: rhythm + chord changes, genre feel + dynamics, conversation + harmony, dual-task independence. Motor learning research is clear — combining two automated sub-skills is a distinct cognitive stage that must be practiced deliberately before full integration. Each exercise here takes two skills from Level 3 and fuses them.",
  artists: "Khruangbin, Skinshape, DOPE LEMON, Allah-Las, Pepper",
  unlocks: "Voice Flows (Level 5)",
  review: { label: "Level 3 Check-In", time: 5, exercises: ["ss-3-7", "ss-3-11"], prompt: "Do 2 minutes of one-note rhythm play (ss-3-7). Then sing Am chord tones in three emotional colors (ss-3-11). Both fluid without the strum breaking? Move on." },
  exercises: [

    // ─── DUAL-TASK FOUNDATION ───

    {
      id: "ss-4-1",
      time: 8,
      title: "Simultaneous Voice & Strum",
      type: "vocal",
      what: "Combines: STRUM INDEPENDENCE + PITCH. Unlike call-and-response where you alternate, now sing AND strum at the same time — with your voice doing something different from your guitar rhythm. Two independent musical streams from one person.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am with a steady quarter-note downstroke. Sing a long, sustained A over the strum. Just hold the note while your hand keeps the rhythm. Get comfortable with both happening at once.", why: "The simplest dual-task: sustained voice + steady strum. If this wobbles, the strum isn't automatic enough yet. Go back to Level 1." },
        { text: "Keep strumming. Now change your vocal note: A... hold... C... hold... E... hold. Move between chord tones slowly while the strum stays steady. The strum must NOT change when your voice moves.", why: "When the voice changes pitch, the brain wants the hands to react. Training independence means the strum stays perfectly steady regardless of what the voice does." },
        { text: "Now try vocal rhythms that differ from the strum. Strum quarter notes but sing half notes. Then strum quarter notes but sing syncopated patterns. The two rhythms coexist independently.", why: "Rhythmic independence is the core of the singer-songwriter dual-task. When your voice and guitar have different rhythms, you sound like a full arrangement, not a solo act." },
        { text: "2-minute free improv: strum autopilot, voice improvises chord tones in any rhythm. The voice moves freely while the strum holds steady. Record it.", why: "This is the dual-task payoff. When you can improvise vocally while maintaining an independent strum, you've crossed the coordination threshold that makes songwriting possible." }
      ],
      feel: "This should feel like patting your head and rubbing your stomach — initially awkward, then suddenly natural. The 'click' moment when both streams lock in independently is unmistakable.",
      wrong: "If the strum simplifies or stops when you start singing something rhythmically complex, the dual-task is overloading your working memory. Simplify the vocal line until the strum stays rock-solid, then gradually add complexity.",
      sarah: "Gene, this is THE skill. Every song you love — DOPE LEMON, Skinshape, Babe Rainbow — is someone doing this: independent voice and guitar, simultaneously, making it look effortless.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── RHYTHM + CHORD CHANGES ───

    {
      id: "ss-4-2",
      time: 8,
      title: "Two-Chord Deep Dive",
      type: "vocal",
      what: "Combines: CHORD CHANGES + SHARED TONES. Strum just two chords — Am and C — and freely improvise. Focus on the transition: which notes carry over (C and E appear in both), which ones shift (A is unique to Am, G is unique to C)? Two chords is simpler than four, letting you zoom in on the harmonic connection.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats), repeat.",
      steps: [
        { text: "Strum Am for 4 beats, then C for 4 beats. Sing chord tones freely. Notice that C and E are shared — you can hold either note across the chord change and it works over both chords.", why: "Shared tones (C and E appear in both chords) are melodic bridges. Holding a shared tone across a chord change creates smooth, connected melodic motion." },
        { text: "Try this: sing C sustained over both Am and C. The same note sounds different over each chord — melancholic over Am (it's the minor 3rd), bright over C (it's the root). Same note, different meaning.", why: "Hearing how context changes a note's emotional quality is the foundation of harmonic ear training. You're not just singing notes — you're hearing how notes function." },
        { text: "Now sing the notes that change: A appears in Am but not C. G appears in C but not Am. Emphasize these unique notes at the chord changes — they're what give each chord its identity.", why: "Unique tones are what give each chord its identity. Emphasizing them at the change makes the harmony audible in your voice — which is how melodies outline chord progressions." },
        { text: "Free improv over Am-C for 3 minutes. Mix shared tones and unique tones. Vary your rhythms. Let your ear guide you.", why: "Two-chord improv is the simplest harmonic navigation exercise. Master this, and four chords will feel easy." }
      ],
      feel: "The two-chord loop should feel like breathing — Am is the inhale (tension), C is the exhale (release). Your voice follows this emotional ebb and flow.",
      wrong: "If you're ignoring the chord changes and singing the same thing over both chords, you're not hearing the harmony. Stop and listen to the chords first. Sing the root of each chord as it passes to reset your ear.",
      sarah: "Gene, Am to C is the most common two-chord motion in your genres — it's everywhere in reggae, surf, and soul. Getting your voice to navigate this change fluently is foundational.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      recorder: true
    },

    // ─── NEW: THREE-CHORD BRIDGE ───

    {
      id: "ss-4-3",
      time: 8,
      title: "Three-Chord Bridge",
      type: "vocal",
      what: "Combines: CHORD CHANGES + SHARED TONES over three chords. Am-C-G (no Em yet). Freely improvise with chord tones across three chords. Focus on the G arrival — the brightest chord in the sequence. Shared tones bridge Am↔C (C and E), and C↔G (G).",
      setup: "Guitar. Metronome at 90 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Am (4 beats).",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Am. Sing chord tones for each: Am(A-C-E), C(C-E-G), G(G-B-D). Notice how G feels like an arrival — it's the brightest chord, the moment of lift in the progression.", why: "Three chords is the sweet spot between two-chord simplicity and four-chord complexity. The G chord adds a new color (B and D) that changes the harmonic landscape." },
        { text: "Focus on shared tones as bridges: hold E across Am→C (it's in both). Hold G across C→G (it's in both). These shared tones create smooth melodic connections.", why: "Voice leading through shared tones is how professional singers create seamless melodies over chord changes. The voice doesn't jump — it glides." },
        { text: "Now emphasize the unique tones: A is unique to Am, B and D are unique to G. When G arrives, let your voice reach for B or D — notes that only exist in that chord.", why: "Unique tones make chord changes audible in the melody. When your voice highlights what's new about each chord, the listener hears the harmony through your singing." },
        { text: "3-minute freestyle over Am-C-G. Let the surf-rock energy carry you. Bright, forward, riding the three-chord wave. Record it.", why: "Three-chord improv over a surf backing builds confidence for the full four-chord progressions coming next. This is Allah-Las, Sun Room territory." }
      ],
      feel: "The G chord should feel like the sun coming out — the progression brightens when it arrives. Your voice should reflect that lift.",
      wrong: "If you're singing the same patterns over all three chords, you're not hearing the harmonic shifts. Sing the root of each chord as it arrives to reset your ear, then improvise from there.",
      sarah: "Gene, Am-C-G is the backbone of so many surf-psych songs. This three-chord motion is in your DNA — let your voice discover how it naturally wants to navigate it.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── NEW: STEPPING BETWEEN CHORDS ───

    {
      id: "ss-4-4",
      time: 8,
      title: "Stepping Between Chords",
      type: "vocal",
      what: "Combines: VOICE LEADING + CHORD CHANGES. Sing the nearest chord tone when chords change. Am→C: hold E (shared), or step A→G (nearest C-chord tone). Smooth voice leading, no leaps at transitions. Musical sewing.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Em (4 beats).",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em. When the chord changes, find the nearest chord tone in the new chord. If you're singing A over Am, step down to G (nearest C-chord tone) when C arrives. No leaps — only steps.", why: "Voice leading is the art of smooth melodic motion across chord changes. When your voice moves by the smallest possible interval at each change, the melody sounds effortless and connected." },
        { text: "Try holding shared tones across changes: E works over both Am and C. G works over both C and Em. Hold the shared tone — your voice stays still while the harmony moves underneath.", why: "Holding a common tone while chords move is the most elegant voice leading technique. The melody is static but the harmonic meaning of the note shifts — creating depth without movement." },
        { text: "Now combine: sometimes hold a shared tone, sometimes step to the nearest new tone. Let your ear decide which feels more musical at each change.", why: "Mixing static holds and stepwise motion creates varied, interesting melodies. Professional songwriters do this instinctively — you're building that same instinct." },
        { text: "3-minute freestyle: smooth voice leading over Am-C-G-Em. No leaps at chord changes — only steps and holds. The Khruangbin backing supports this legato approach. Record it.", why: "When voice leading becomes instinctive, your melodies will naturally flow across chord changes. This is the difference between 'notes over chords' and 'melody through harmony.'" }
      ],
      feel: "This should feel like water flowing — your voice finds the path of least resistance through the chords. Smooth, connected, unhurried.",
      wrong: "If you're jumping to the root of each new chord (leaping), you're ignoring the stepwise constraint. Find the nearest chord tone from where you are — even if it's not the root.",
      sarah: "Gene, Khruangbin's vocal lines are the definition of smooth voice leading — Laura's voice barely moves while the chords shift underneath. That effortless, flowing quality is exactly what this exercise builds.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-4-5",
      time: 8,
      title: "Rhythmic Chord Navigation",
      type: "vocal",
      what: "Combines: RHYTHM + CHORD CHANGES. Strum Am-C-G-Em and sing chord tones — but with a specific rhythmic constraint each pass. Pass 1: only on beats 1 and 3. Pass 2: only on the 'and' (offbeats). Pass 3: free rhythm. The rhythmic constraint forces you to navigate chord changes while managing rhythm simultaneously.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Pass 1 — On the beat: strum Am-C-G-Em. Sing one chord tone on beat 1 and one on beat 3 of each bar. Silence on beats 2 and 4. The rhythm is strict; the pitch choices are free.", why: "Restricting WHEN you can sing while freeing WHAT you sing is a dual-constraint exercise. Your brain manages rhythm consciously while pitch becomes instinctive." },
        { text: "Pass 2 — Offbeat: sing chord tones ONLY on the 'and' of each beat. Nothing on the downbeats. This is the reggae vocal pocket — behind the beat, in the gaps.", why: "Offbeat singing is harder than on-beat because it fights your natural instinct to land on strong beats. Mastering this unlocks the laid-back phrasing that defines your vocal style." },
        { text: "Pass 3 — Syncopated: mix on-beat and offbeat freely. Create rhythmic patterns that cross the bar line — start a phrase on beat 4 and carry it into beat 1 of the next bar.", why: "Syncopation is where groove lives. When your vocal rhythm creates tension against the strum rhythm, the music comes alive." },
        { text: "Pass 4 — Free: no rhythmic constraint. After the structured passes, free rhythm feels expansive. Notice how much more rhythmically diverse your improvisation is now.", why: "The constraint-then-release sequence builds rhythmic vocabulary. Each constraint forced you into patterns you wouldn't have found on your own." }
      ],
      feel: "Each pass should feel like a different dance over the same chord changes. The rhythm constraint changes everything about how you navigate the harmony.",
      wrong: "If you can't maintain the rhythmic constraint while also navigating chord changes, simplify: use only root notes for pitch while you master the rhythm. Then add 3rds and 5ths back in.",
      sarah: "Gene, this is where rhythm and harmony start working together. Most of your favorite artists phrase differently over the same chords depending on the genre feel — this exercise builds that instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── GENRE FEEL + SKILLS ───

    {
      id: "ss-4-6",
      time: 8,
      title: "Reggae Groove + Chord Tones",
      type: "vocal",
      what: "Combines: REGGAE RHYTHM + CHORD CHANGES + SPACE. Strum a reggae offbeat chop over Am-C and improvise vocally with chord tones — but lock your voice to the reggae feel. Short phrases, big spaces, behind the beat. The strum pattern changes how your voice wants to move.",
      setup: "Guitar. Reggae offbeat chop. Metronome at 85 BPM.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Set up the reggae chop: mute on beats 1 and 3, strum on the 'and' of 2 and 4. Get it flowing on autopilot over Am-C (4 bars each). This is from Level 1.", why: "The reggae offbeat creates a completely different rhythmic grid for your voice. Your vocal phrases will naturally fall in the spaces between the chops." },
        { text: "Sing chord tones but respect the reggae space. Short phrases, then silence. Let the offbeat chop breathe. Think Chronixx or Protoje — the voice rides the riddim, never fights it.", why: "Reggae vocal phrasing is defined by restraint and pocket. The gaps between phrases are as important as the phrases themselves." },
        { text: "Try placing your vocal phrases on the offbeat too — sing between the clicks, not on them. This behind-the-beat feel is the core of your laid-back delivery style.", why: "Behind-the-beat singing creates the relaxed quality that defines your natural vocal style. It's not laziness — it's groove." },
        { text: "Alternate: 4 bars of singing, 4 bars of just chop (no voice). Let the vocal phrases emerge from the silence, then retreat back into it. 3 minutes total.", why: "The silence teaches patience. Amateur improvisers fill every gap. Masters let the music breathe. Reggae is the best teacher of musical space." }
      ],
      feel: "Your voice and the offbeat chop should feel like two dancers — sometimes moving together, sometimes taking turns, always locked to the same pulse.",
      wrong: "If your vocal phrases are too long or too busy, you're fighting the reggae feel. Shorter phrases, more space. Let the chop do half the work.",
      sarah: "Gene, this is Pepper and Slightly Stoopid territory — your SoCal reggae-rock roots. The offbeat chop is in your muscle memory. Now let your voice learn to ride that groove.",
      metronome: 85,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-4-7",
      time: 8,
      title: "Surf Jangle + Dynamics",
      type: "vocal",
      what: "Combines: SURF FEEL + DYNAMICS + CHORD CHANGES. Strum a jangle pattern on G-Em-C-D and improvise vocally — matching the surf energy AND building intensity across 4 passes. Flowing phrases that grow from whisper to full voice over the shimmer.",
      setup: "Guitar. Jangle strum (continuous 8th-note down-up). Metronome at 90 BPM.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Strum G-Em-C-D with a continuous jangle strum at 90 BPM. Sing chord tones freely — longer lines that ride the jangle energy. Use bright vowels: 'la,' 'oh,' 'ay.'", why: "Surf-psych vocals tend to be continuous and floating rather than choppy. The jangle strum supports longer melodic lines because there are no rhythmic gaps." },
        { text: "Pass 1 — Whisper: sing in a breathy, barely-there voice. Float over the jangle like mist over water. Sparse notes, lots of space.", why: "Starting quiet establishes a floor. The dynamic build that follows will be more dramatic because you started low." },
        { text: "Pass 2 — Medium: add volume and confidence. More notes, more rhythmic commitment. You're surfing now, not just watching.", why: "The middle dynamic is where most singing happens. This is your 'cruising altitude' — comfortable and flowing." },
        { text: "Pass 3 — Full: open up to full chest voice. Commit to longer phrases, wider intervals, more energy. The jangle shimmer supports your voice at full volume. Record this pass.", why: "Full voice over jangle strum is the Allah-Las, Mystic Braves sound. This is where your surf-psych DNA comes alive." }
      ],
      feel: "This should feel like a wave building — starting as a gentle swell (whisper), rising through the lineup (medium), and cresting into a full ride (full voice).",
      wrong: "If all three passes sound the same dynamically, you're not committing to the extremes. Make pass 1 absurdly quiet and pass 3 as loud as your porch register allows.",
      sarah: "Gene, this is Allah-Las and Mystic Braves territory. Your surf-psych core. The jangle strum is in your hands — now your voice learns to build and crest over it like a wave.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── NEW: DESERT BLUES + DYNAMICS ───

    {
      id: "ss-4-8",
      time: 8,
      title: "Desert Blues + Dynamics",
      type: "vocal",
      what: "Combines: DESERT BLUES GENRE + DYNAMICS. Sparse Am over desert-blues backing track. Combine the desert-blues aesthetic (repetition, micro-variation) with full dynamic range (whisper → full → whisper). Genre + dynamics pairing.",
      setup: "Guitar. Sparse Am strum. Let the backing track carry the groove.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am with a sparse, repetitive pattern. Sing A and E only — root and 5th. Repeat a simple phrase with micro-variations, starting at whisper volume.", why: "Desert blues is built on repetition with subtle variation. Starting at whisper matches the genre's intimate, hypnotic quality." },
        { text: "Over 8 bars, gradually swell from whisper to full voice. The phrase stays the same — only the volume changes. Let the crescendo build like heat rising from desert sand.", why: "Dynamic swells over repetitive phrases create the hypnotic intensity of desert blues. The melody doesn't change — the power does." },
        { text: "At full voice, hold for 4 bars, then gradually pull back to whisper over 8 bars. The decrescendo is harder to control but more dramatic.", why: "The fade-back creates a complete dynamic arc: quiet→loud→quiet. This wave-like shape is the emotional engine of Tinariwen and Bombino's music." },
        { text: "3-minute freestyle: sparse desert blues with free dynamic movement. Sometimes whisper, sometimes full, sometimes sudden shifts. Repeat phrases with micro-variations. Record it.", why: "When dynamics and genre feel work together, your voice becomes part of the landscape. The desert blues aesthetic + dynamic control = cinematic power." }
      ],
      feel: "This should feel cinematic and vast — your voice is a figure in an enormous desert landscape. The dynamic swells are like wind gusts across open space.",
      wrong: "If your improvisation is busy or melodically complex, you're fighting the desert blues aesthetic. Fewer notes, more repetition. Let the dynamics do the work.",
      sarah: "Gene, this is Tinariwen, Bombino, Hermanos Gutiérrez territory — sparse, cinematic desert. Your voice rides the heat shimmer. Dynamics are the drama.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── EXPRESSION + HARMONY ───

    {
      id: "ss-4-9",
      time: 8,
      title: "Chord Change = Mood Change",
      type: "vocal",
      what: "Combines: EMOTIONAL COLOR + CHORD CHANGES. Strum Am-C-G-Em and match your emotional delivery to each chord's character: Am (melancholic, inward), C (warm, grounded), G (bright, open), Em (dark, contemplative). The chord tells you how to feel. Your voice follows.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Sing A-C-E with melancholic energy — slow, minor, inward. Think of watching the sunset alone. When the chord changes to C, shift: warmer, more grounded, like coming home.", why: "Each chord has an inherent emotional character. Training your voice to respond to these shifts instinctively is what makes your eventual songs emotionally varied and dynamic." },
        { text: "G chord: bright and open. Wider intervals (G up to D), more projection, more confidence. Then Em: dark and contemplative. Pull back, get quieter, more mysterious.", why: "The emotional journey Am→C→G→Em is a complete narrative arc: sadness→comfort→joy→introspection. Your voice travels this arc naturally when you let the chords guide your expression." },
        { text: "Loop the progression 4 times. Each time, deepen the emotional commitment. By pass 4, each chord should trigger an immediate emotional shift in your voice.", why: "Repetition builds the chord-to-emotion association into muscle memory. Eventually, you won't think about it — your voice will automatically shift when the chord changes." },
        { text: "Try scrambling the order: G-Am-Em-C. Does the emotional journey feel different? Let the new order create a new narrative. Record the best pass.", why: "Different chord orders create different emotional stories. A songwriter chooses chord order partly for this reason — the emotional arc of the progression IS the emotional arc of the song." }
      ],
      feel: "Each chord change should trigger a physical shift: your posture, your breathing, your jaw tension all change with the emotion. The body leads, the voice follows.",
      wrong: "If your voice sounds the same over every chord, you're singing notes without feeling the harmony. Exaggerate the emotional shifts until they become natural.",
      sarah: "Gene, this is how your favorite artists write — they don't plan emotions, they respond to chords. The chords tell them how to feel. You're building that same instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-4-10",
      time: 8,
      title: "Conversation Over Changes",
      type: "vocal",
      what: "Combines: CALL & RESPONSE + CHORD CHANGES. Call-and-response from Level 3, but now the chords are moving. Guitar plays a phrase over Am, voice answers over C. Guitar calls on G, voice answers on Em. The conversation navigates the harmony.",
      setup: "Guitar. Metronome at 80 BPM. Progression: Am-C-G-Em (2 bars each chord).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Guitar plays a 2-bar phrase over Am. Voice answers with a 2-bar phrase over C. The chords change between call and response — your voice must adjust to C's chord tones (C-E-G) for the answer.", why: "Adding chord changes to call-and-response means your voice must navigate harmony in real time while maintaining the conversational flow. Two skills fused into one." },
        { text: "Continue: guitar calls over G, voice answers over Em. Then voice calls over Am, guitar answers over C. The conversation keeps moving through the progression.", why: "Alternating who leads while the chords move underneath is complex coordination. But each individual skill (conversation, chord navigation) is solid from Level 3." },
        { text: "Try making the response harmonically aware: if the guitar plays a phrase ending on A (Am chord), start your vocal response on a note that connects smoothly — maybe E or C — over the C chord.", why: "Harmonic bridging between call and response creates musical continuity. The conversation sounds connected rather than like two separate ideas." },
        { text: "Free alternation over the full progression for 3 minutes. Let the conversation and the chord changes both flow naturally. Record it.", why: "When conversation and harmony work together effortlessly, you're ready for the songwriter's core skill: singing original melodies over chord progressions." }
      ],
      feel: "The conversation should feel like it's traveling through the chords — each phrase acknowledges where it is harmonically while responding to what came before.",
      wrong: "If you're ignoring the chord changes during the conversation (singing Am tones over a C chord), slow down. Sing the root of each chord as it arrives, then build phrases from there.",
      sarah: "Gene, this is the bridge between improvising and songwriting. When your voice can hold a musical conversation while the chords move underneath, you're ready to write songs.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Call", B: "Response" } }
    },

    // ─── NEW: BREATH + HARMONY ───

    {
      id: "ss-4-11",
      time: 8,
      title: "Breath Shapes the Phrase",
      type: "vocal",
      what: "Combines: BREATH PHRASING (ss-3-13) + CHORD CHANGES. Strum Am-C-G-Em. One breath per chord change. Inhale on the change, sing chord tones for the length of your breath, breathe on the next change. Breath + harmony fused.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em (4 beats per chord). Inhale during the last beat of each chord. Sing chord tones on the new chord for the length of your breath. When the next chord arrives, breathe and start again.", why: "Syncing breath with chord changes creates natural phrasing that follows the harmony. Each chord gets its own breath-shaped phrase — the body and the harmony are aligned." },
        { text: "Try deep breaths for long phrases (fill the whole 4 beats with singing) and shallow breaths for short phrases (sing 2 beats, rest 2). Let breath depth vary naturally.", why: "Variable breath depth creates variable phrase lengths — long flowing lines alternating with short punchy phrases. This mimics natural speech patterns." },
        { text: "Notice how the breath reset at each chord change naturally separates your phrases. The inhale IS the phrase boundary. No need to plan where phrases start and end.", why: "In natural singing, breaths mark phrase boundaries. When breath and chord changes align, your phrasing has built-in structure without conscious planning." },
        { text: "3-minute freestyle: breath-shaped phrases over the chord progression. Each breath = one phrase = one chord. Let the body and harmony guide everything. Record it.", why: "When breath, harmony, and phrasing work as a unified system, your singing sounds effortless and organic. This is how Skinshape and DOPE LEMON phrase — no rush, following the body." }
      ],
      feel: "This should feel like breathing through music — each inhale resets, each exhale is a musical phrase. The chord changes are your breathing cues.",
      wrong: "If you're holding your breath through chord changes or gasping mid-phrase, slow the tempo. The breath must align with the harmony — that's the whole exercise.",
      sarah: "Gene, your laid-back vocal style is already breath-shaped. This exercise makes it conscious over moving harmony. Skinshape, DOPE LEMON — contemplative soul where the breath leads.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true
    },

    // ─── VOWEL + RHYTHM ───

    {
      id: "ss-4-12",
      time: 8,
      title: "Vowel Rhythm Patterns",
      type: "vocal",
      what: "Combines: VOWEL SHAPES + RHYTHM + CHORD TONES. Sing chord tones but change vowel sound with the rhythm — 'ooh' on beat 1, 'ahh' on beat 3, or alternate vowels with each new note. Vowel changes become a rhythmic texture layered on top of pitch and timing.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C.",
      steps: [
        { text: "Strum Am. Sing A on 'ooh' (beat 1), C on 'ahh' (beat 3), E on 'oh' (beat 1 of next bar). Each note gets a different vowel. The vowel pattern creates a second layer of rhythm.", why: "Linking specific vowels to specific beats creates a rhythmic texture that most singers never develop. It's a subtle technique that adds richness to simple melodies." },
        { text: "Try a two-vowel alternation: 'ooh' on every odd note, 'ahh' on every even note. Sing freely over Am-C — the vowel pattern stays constant while the pitches change.", why: "A repeating vowel pattern creates a sense of structure even when the melody is improvised. It's a compositional tool hiding inside a vocal technique." },
        { text: "Now try sustained notes with vowel morphing: start on 'ooh' and slowly open to 'ahh' within a single held note. The tone color shifts while the pitch stays the same.", why: "Vowel morphing on a single note is a classic technique — it creates movement and interest without changing pitch. Think of how a siren changes color as it sustains." },
        { text: "Free improv: sing chord tones over Am-C with vowel changes as a conscious expressive choice. Sometimes planned patterns, sometimes spontaneous shifts. 2 minutes, record.", why: "When vowels become a deliberate part of your improvisation toolkit (not just whatever comes out), you have a level of vocal control that most singer-songwriters never achieve." }
      ],
      feel: "The vowel changes should feel like painting with different brushes — each vowel is a different texture applied to the same musical canvas.",
      wrong: "If you forget to change vowels and default to one sound, you're not engaging the combination. Set a simple pattern (alternate 'ooh' and 'ahh') and stick to it, then add complexity.",
      sarah: "Gene, this is a subtle skill that separates interesting singers from generic ones. When your vowel choices are deliberate, every phrase has texture and color.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── NEW: DYNAMICS + RHYTHM ───

    {
      id: "ss-4-13",
      time: 8,
      title: "Dynamics + Rhythm Pair",
      type: "vocal",
      what: "Combines: DYNAMICS + RHYTHM. Strum Am. Combine rhythmic variety with dynamic contrast simultaneously. Loud short bursts, quiet sustained notes, syncopated whispers, on-beat projections. Two independent expressive variables at once.",
      setup: "Guitar. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing the note A with loud, short bursts on the downbeats: 'DA! DA! DA! DA!' — forte, rhythmic, punchy. Like a horn section hitting accents.", why: "Loud + short is the most energetic dynamic-rhythm combination. It creates urgency and forward motion. Funk music lives here." },
        { text: "Now flip it: quiet, sustained A held over 4 beats. Piano, long, floating. The opposite energy. Same note, same chord, completely different effect.", why: "Quiet + sustained is the most contemplative combination. It creates space and intimacy. Moving between these extremes is dynamic range." },
        { text: "Mix freely: loud short burst, then quiet sustained, then medium syncopated, then whispered offbeat. Change BOTH rhythm and dynamics with every phrase.", why: "Managing two expressive variables simultaneously is the cognitive challenge. When both are fluid, your single-note improvisation sounds like a complete musical performance." },
        { text: "2-minute freestyle: any chord tones (A, C, E), any rhythm, any dynamic level. The combination of rhythm and dynamics is your focus. Record it.", why: "This pairing was missing from the Level 4 skill matrix. Dynamics and rhythm are independent variables — training them together fills a gap in your expressive toolkit." }
      ],
      feel: "This should feel like being both a drummer and a singer — your rhythmic choices and your dynamic choices are both conscious, both varied, both expressive.",
      wrong: "If your dynamics are constant (everything at the same volume) while your rhythms vary, you're only engaging one variable. Exaggerate the dynamic shifts until they're impossible to miss.",
      sarah: "Gene, Kokoroko and Khruangbin's funk side live in this territory — rhythmic AND dynamic at once. When both variables are fluid, your voice becomes a full instrument.",
      metronome: 90,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── COMBINATION CAPSTONE ───

    {
      id: "ss-4-14",
      time: 10,
      title: "Two-Skill Freestyle",
      type: "song",
      what: "The combination test. Three 2-minute freestyles, each combining two specific skills. Round 1: Rhythm + Dynamics (vary rhythm AND volume over Am). Round 2: Chord Changes + Emotional Color (match mood to each chord in Am-C-G-Em). Round 3: Genre Feel + Vowel Shapes (reggae chop with deliberate vowel choices). Record all three.",
      setup: "Guitar. Metronome at 80-85 BPM.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        { text: "Round 1 — Rhythm + Dynamics: strum Am at 80 BPM. Sing one chord tone (A) with varied rhythms AND varied dynamics simultaneously. Loud bursts, quiet sustained notes, syncopated whispers, on-beat shouts. 2 minutes.", why: "Combining rhythm and dynamics means managing two expressive variables at once. When both are fluid, your single-chord improvisation sounds like a complete musical performance." },
        { text: "Round 2 — Changes + Emotion: strum Am-C-G-Em at 80 BPM. Sing chord tones while matching emotional color to each chord. Am=melancholic, C=warm, G=bright, Em=dark. 2 minutes.", why: "Combining chord navigation with emotional expression is the core of expressive singing. Your voice tracks both the harmony AND the feeling simultaneously." },
        { text: "Round 3 — Genre + Vowels: reggae offbeat chop at 85 BPM over Am-C. Sing chord tones with deliberate vowel choices — 'ooh' for quiet moments, 'ahh' for projecting moments, vowel morphs on sustained notes. 2 minutes.", why: "Genre feel + vowel awareness produces a fully textured vocal performance. This is what separates 'singing notes' from 'having a vocal style.'" },
        { text: "Listen to all three recordings. Each round combined two skills. In Level 5, everything combines at once. How close are you?", why: "Self-assessment through recording playback is one of the most effective practice techniques. You hear things in playback that you can't hear while performing." }
      ],
      feel: "Each round should feel like juggling two balls — challenging but possible. In Level 5, you'll juggle all of them at once.",
      wrong: "If one skill disappears when you focus on the other (e.g., dynamics go flat when you focus on chord changes), the weaker skill needs more isolated practice from Level 3.",
      sarah: "Gene, this is the checkpoint. If you can combine any two skills fluently, you're ready for Level 5 where everything flows together. These recordings are your proof.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true,
      levelUp: "Can fluently combine any two improvisation skills — rhythm + dynamics, chord changes + emotion, genre feel + vowel shapes — while strumming, without either skill degrading when the other is added."
    }
  ]
};
