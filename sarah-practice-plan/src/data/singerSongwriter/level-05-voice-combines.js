import { getPitchRange } from "../appData.js";

export const level5 = {
  level: 5,
  title: "Voice Combines",
  subtitle: "Two skills at once. This is where it starts to feel like music.",
  description:
    "Levels 3-4 isolated each skill individually. Now combine them in pairs: rhythm + chord changes, genre feel + dynamics, conversation + harmony, dual-task independence. Motor learning research is clear — combining two automated sub-skills is a distinct cognitive stage that must be practiced deliberately before full integration. Each exercise here takes two skills from Levels 3-4 and fuses them.",
  artists: "Khruangbin, Skinshape, DOPE LEMON, Allah-Las, Pepper",
  unlocks: "Voice Flows (Level 6)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["ss-4-17", "ss-4-20"], prompt: "Play Am-C-G-Em in 4 genre feels (ss-4-17). Then do Whisper to Full Voice with pentatonic freedom (ss-4-20). Both fluid? Move on." },
  exercises: [

    // ─── DUAL-TASK RAMP ───

    {
      id: "ss-5-1",
      time: 5,
      title: "The TV Test",
      type: "guitar",
      what: "Can you play Am-C-G-Em while watching a video with comprehension? If yes, the guitar is autonomous enough for voice work. If not, practice until it is. This is the prerequisite check from motor learning research: the 'associative-to-autonomous' transition test. Your strum should be like breathing — you don't think about it.",
      setup: "Guitar. Metronome at 80 BPM. A video or podcast playing on your phone or laptop.",
      steps: [
        { text: "Set a metronome at 80 BPM. Start strumming Am-C-G-Em with a simple quarter-note pattern. Now turn on a short video — something with dialogue you need to follow. Keep strumming.", why: "The TV Test is the gold standard for motor autonomy. If a secondary cognitive task (watching a video) disrupts the primary motor task (strumming), the strum isn't automatic yet." },
        { text: "Watch for 2 minutes. Can you follow the story? Can you answer questions about what you just watched? If yes, your chord changes have reached the autonomous stage.", why: "Comprehension proves cognitive resources are free. If you can understand dialogue while strumming, your hands are on autopilot — which means those resources are available for singing." },
        { text: "If the strum breaks down or you lose the video thread, that's useful information. Note which chord change disrupts you (usually G→Em or Em→Am) and drill that transition.", why: "The failure point reveals which transition still requires conscious attention. Targeted practice on that one change is more efficient than running the whole progression again." },
        { text: "Repeat the test daily until you pass it. This is the gateway to everything in this level. No rushing — autonomous guitar is the foundation of singing while playing.", why: "Motor learning research shows the associative-to-autonomous transition takes repetition over days, not hours. Each day's practice moves the skill deeper into procedural memory." }
      ],
      feel: "When you pass this test, the guitar should feel like it's playing itself. Your conscious mind is free — free to watch TV, free to sing, free to improvise. That freedom is the whole point.",
      wrong: "If you're faking it — staring at the video but not actually following the story — the test doesn't count. Genuine comprehension is the metric. Be honest with yourself.",
      sarah: "Gene, your strum should be like breathing — you don't think about it. This test proves whether it is. Every exercise in this level assumes you pass it.",
      metronome: 80
    },
    {
      id: "ss-5-2",
      time: 6,
      title: "Hum + Strum",
      type: "vocal",
      what: "Strum Am-C-G-Em at 80 BPM. Hum the root of each chord as it passes (A over Am, C over C, G over G, E over Em). Humming requires almost zero vocal working memory — it's the easiest dual-task entry point. Once humming is stable over chord changes, the voice-guitar foundation is laid.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em with a simple quarter-note pattern at 80 BPM. Hum a sustained A over Am — just a low, relaxed hum. Mouth closed, no vowel shaping needed. Let the hum sit on top of the strum.", why: "Humming is the lowest-demand vocal task: no articulation, no vowel choices, no projection decisions. It isolates the core dual-task question: can voice and guitar coexist?" },
        { text: "When C arrives, shift your hum to C. Then G over G, E over Em. One root per chord, sustained hum. The chord changes guide your pitch — just follow the gravity of each chord.", why: "Tracking chord roots with a hum builds the voice-following-harmony reflex. Your voice learns to respond to chord changes without conscious pitch calculation." },
        { text: "Check: is your strum perfectly steady through the hum changes? If the strum hitches when your pitch shifts, the guitar isn't autonomous enough yet. Go back to ss-5-1.", why: "Any strum disruption during a hum means the dual-task is overloading working memory. Humming is the easiest vocal task — if it disrupts the strum, singing definitely will." },
        { text: "Once stable, try humming chord tones other than the root: hum E over Am (the 5th), hum G over C (the 5th). Same chord changes, different hum targets. 2 minutes, record it.", why: "Varying the hum target while maintaining the strum adds a small pitch-decision layer on top of the dual-task. This is the bridge between humming roots and singing freely." }
      ],
      feel: "The hum should feel effortless — like a quiet soundtrack running underneath your guitar. When both layers are relaxed and steady, you've found the dual-task sweet spot.",
      wrong: "If you're straining to hum or your strum is irregular, you're working too hard. Drop to just Am (one chord) and hum A until both are relaxed. Then add chord changes one at a time.",
      sarah: "Gene, humming is the gentlest way to introduce your voice to the guitar. No pressure, no performance — just a quiet sound layered on top of a familiar strum. Start here.",
      metronome: 80,
      recorder: true,
      referencePitches: getPitchRange("E3", "G4")
    },
    {
      id: "ss-5-3",
      time: 7,
      title: "Speak + Strum",
      type: "vocal",
      what: "Strum Am-C-G-Em. Speak a simple phrase in rhythm ('sun goes down, tide rolls in') while strumming. No pitch — just rhythmic speech over chord changes. This is Berklee's 'rhythmic anchor method': introduce the rhythmic coordination layer without pitch demands on the voice.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em at 80 BPM. Speak a simple phrase in rhythm: 'sun goes down, tide rolls in.' Place 'sun' on beat 1, 'goes' on beat 2, 'down' on beat 3. The words have rhythm but no melody.", why: "Rhythmic speech adds the coordination layer (voice rhythm vs guitar rhythm) without the pitch layer. It's the Berklee approach: isolate one variable at a time." },
        { text: "Try different phrases: 'waves are rolling, sky turns gold' or 'walking down the shore again.' Each phrase has its own natural rhythm. Let the words find their place in the strum.", why: "Different phrases have different rhythmic shapes. Practicing with varied phrases builds flexible speech-over-strum coordination, not just one memorized pattern." },
        { text: "Now speak on the offbeats — between the strums. 'And-sun-and-goes-and-down.' The words land in the gaps. This is harder because speech and strum are rhythmically independent.", why: "Offbeat speech is the precursor to syncopated singing. When your voice can land between strums consistently, you've built the independence that melodic singing requires." },
        { text: "Free-form: speak any words, any rhythm, over the chord changes. Have a conversation with someone while strumming. If you can talk naturally while playing, the strum is truly autonomous. Record 2 minutes.", why: "Natural speech over strumming is the ultimate autonomy test for this stage. If you can hold a real conversation while playing Am-C-G-Em, your hands are completely free from conscious control." }
      ],
      feel: "This should feel like talking while driving — your hands do their thing automatically while your voice is free. If it feels like juggling, the strum needs more autonomy work.",
      wrong: "If you're speaking in a monotone robot voice to avoid disrupting the strum, that's a sign the dual-task is still taxing. Speak naturally — inflection, emphasis, pauses. The strum must survive real speech.",
      sarah: "Gene, this is the bridge between the TV Test and actual singing. Your voice is active, your hands are strumming, but there's no pitch pressure yet. One step at a time.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-5-4",
      time: 7,
      title: "Sustained Note + Changing Chords",
      type: "vocal",
      what: "Strum Am-C-G-Em. Hold ONE note (E — it works over all 4 chords as a common tone) while the chords change underneath. The voice stays perfectly still; only the hands move. This isolates harmonic independence: hearing the chord context shift around a static voice.",
      setup: "Guitar. Metronome at 80 BPM. Drone on E for pitch reference.",
      steps: [
        { text: "Strum Am-C-G-Em at 80 BPM. Sing and sustain the note E through all four chords. Don't move your voice at all — just hold E while the chords change underneath.", why: "E is a common tone across the progression: it's the 5th of Am, the 3rd of C, the 6th of G (a color tone), and the root of Em. One note, four different harmonic meanings." },
        { text: "Listen to how E changes character over each chord. Over Am it sounds stable and open. Over C it sounds warm and sweet (major 3rd). Over G it sounds floating and colorful. Over Em it sounds like home (root). Same note, four feelings.", why: "This is the core lesson of harmonic context: a note's emotional meaning changes with the chord underneath. Your ear learns to hear FUNCTION, not just pitch." },
        { text: "Now try holding A instead of E. A is the root of Am, the 6th of C, the 2nd of G, and the 4th of Em. Notice how it sounds consonant over Am but creates tension over G and Em.", why: "Different sustained notes create different levels of tension and resolution across the progression. Some combinations are smooth; others are gritty. Both are useful in songwriting." },
        { text: "Alternate: hold E for one full cycle, then hold A for one full cycle, then hold G for one full cycle. Each sustained note paints the progression in a different color. Record all three.", why: "Three different common-tone experiences give you a visceral understanding of how single notes interact with chord progressions. This is harmonic ear training at its most direct." }
      ],
      feel: "Your voice should feel like a still point in a turning world. The chords move, the harmony shifts, but your note is an anchor. The changing feelings come FROM the chords, not from your voice.",
      wrong: "If you're unconsciously adjusting your pitch when the chords change, that's your ear trying to 'fix' the harmony. Resist. Hold the note perfectly steady — the drone will help you stay locked.",
      sarah: "Gene, this exercise is sneaky powerful. By holding still while the chords move, you're training your ear to hear how harmony WORKS — how the same note means different things in different contexts. This is the foundation of writing melodies that interact with chords.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      drone: { root: "Em", octave: 2, texture: "pure" },
      recorder: true
    },

    // ─── DUAL-TASK FOUNDATION ───

    {
      id: "ss-5-5",
      time: 8,
      title: "Simultaneous Voice & Strum",
      type: "vocal",
      what: "Combines: STRUM INDEPENDENCE + PITCH. Unlike call-and-response where you alternate, now sing AND strum at the same time — with your voice doing something different from your guitar rhythm. Two independent musical streams from one person.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am with a steady quarter-note downstroke. Sing a long, sustained A over the strum. Just hold the note while your hand keeps the rhythm. Get comfortable with both happening at once.", why: "The simplest dual-task: sustained voice + steady strum. If this wobbles, the strum isn't automatic enough yet. Go back to ss-5-1." },
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
      id: "ss-5-6",
      time: 8,
      title: "Two-Chord Deep Dive",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "Am", "C", "C"], bpm: 80, stepDuration: "1m" },
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

    // ─── THREE-CHORD BRIDGE ───

    {
      id: "ss-5-7",
      time: 8,
      title: "Three-Chord Bridge",
      type: "vocal",
      drone: { mode: "cycle", preset: "surf-garage" },
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

    // ─── STEPPING BETWEEN CHORDS ───

    {
      id: "ss-5-8",
      time: 8,
      title: "Stepping Between Chords",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "C", "G", "Em"], bpm: 80, stepDuration: "1m" },
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
      id: "ss-5-9",
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
      id: "ss-5-10",
      time: 8,
      title: "Reggae Groove + Chord Tones",
      type: "vocal",
      what: "Combines: REGGAE RHYTHM + CHORD CHANGES + SPACE. Strum a reggae offbeat chop over Am-C and improvise vocally with chord tones — but lock your voice to the reggae feel. Short phrases, big spaces, behind the beat. The strum pattern changes how your voice wants to move.",
      setup: "Guitar. Reggae offbeat chop. Metronome at 85 BPM.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
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
      id: "ss-5-11",
      time: 8,
      title: "Surf Jangle + Dynamics",
      type: "vocal",
      what: "Combines: SURF FEEL + DYNAMICS + CHORD CHANGES. Strum a jangle pattern on G-Em-C-D and improvise vocally — matching the surf energy AND building intensity across 4 passes. Flowing phrases that grow from whisper to full voice over the shimmer.",
      setup: "Guitar. Jangle strum (continuous 8th-note down-up). Metronome at 90 BPM.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
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

    // ─── DESERT BLUES + DYNAMICS ───

    {
      id: "ss-5-12",
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
      id: "ss-5-13",
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
      id: "ss-5-14",
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

    // ─── BREATH + HARMONY ───

    {
      id: "ss-5-15",
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
      id: "ss-5-16",
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

    // ─── DYNAMICS + RHYTHM ───

    {
      id: "ss-5-17",
      time: 8,
      title: "Dynamics + Rhythm Pair",
      type: "vocal",
      what: "Combines: DYNAMICS + RHYTHM. Strum Am. Combine rhythmic variety with dynamic contrast simultaneously. Loud short bursts, quiet sustained notes, syncopated whispers, on-beat projections. Two independent expressive variables at once.",
      setup: "Guitar. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing the note A with loud, short bursts on the downbeats: 'DA! DA! DA! DA!' — forte, rhythmic, punchy. Like a horn section hitting accents.", why: "Loud + short is the most energetic dynamic-rhythm combination. It creates urgency and forward motion. Funk music lives here." },
        { text: "Now flip it: quiet, sustained A held over 4 beats. Piano, long, floating. The opposite energy. Same note, same chord, completely different effect.", why: "Quiet + sustained is the most contemplative combination. It creates space and intimacy. Moving between these extremes is dynamic range." },
        { text: "Mix freely: loud short burst, then quiet sustained, then medium syncopated, then whispered offbeat. Change BOTH rhythm and dynamics with every phrase.", why: "Managing two expressive variables simultaneously is the cognitive challenge. When both are fluid, your single-note improvisation sounds like a complete musical performance." },
        { text: "2-minute freestyle: any chord tones (A, C, E), any rhythm, any dynamic level. The combination of rhythm and dynamics is your focus. Record it.", why: "This pairing completes the skill matrix. Dynamics and rhythm are independent variables — training them together fills a gap in your expressive toolkit." }
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

    // ─── TIMING, ROOTS & COLORS ───

    {
      id: "ss-5-18",
      time: 8,
      title: "Behind-the-Beat Feel",
      type: "vocal",
      what: "Combines: MICRO-TIMING + CHORD TONES. Sing the SAME phrase three ways: right on the beat, slightly behind the beat (laid-back), and slightly ahead (pushing). Record all three and compare. Your favorite artists — DOPE LEMON, Skinshape, Bob Marley — all sing behind the beat. This exercise makes that timing choice conscious and controllable.",
      setup: "Guitar. Metronome at 80 BPM. LOUD click — you need to hear it clearly.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Create a simple 4-beat phrase: sing A-C-E-A over Am. Practice it until you can sing it without thinking about pitch. This is your test phrase.", why: "You need a phrase that's completely automatic so ALL your attention can go to timing placement. If you're thinking about notes, you can't focus on micro-timing." },
        { text: "Pass 1 — ON the beat: sing the phrase landing each note exactly with the metronome click. Precise, mechanical, right on top. Record it.", why: "On-the-beat singing is the baseline. It sounds clean and precise but can feel stiff. This is how a drum machine places notes — mathematically correct." },
        { text: "Pass 2 — BEHIND the beat: sing the same phrase but let each note arrive just a fraction AFTER the click. Not late — laid-back. Imagine the click passes and you lazily follow it. Think Bob Marley, D'Angelo, DOPE LEMON. Record it.", why: "Behind-the-beat phrasing is THE defining vocal technique of reggae, soul, R&B, and psych. Berklee teaches it as a specific skill: 'The biggest thing that defines R&B singing is it's behind the beat.' Your porch register lives here naturally." },
        { text: "Pass 3 — AHEAD of the beat: sing slightly before each click. Eager, forward, driving. This is punk energy, surf urgency. Notice how it feels anxious compared to behind-the-beat. Record it.", why: "Ahead-of-the-beat creates urgency and momentum. It's useful for choruses and high-energy sections. Having all three options available means you can CHOOSE your timing for different moods." },
        { text: "Listen to all three recordings back-to-back. The same four notes will sound like three different singers. Behind-the-beat will sound the most like you. This IS your vocal identity.", why: "Micro-timing is invisible in theory but immediately audible in practice. When you can consciously place your voice behind, on, or ahead of the beat, you control the emotional temperature of every phrase." }
      ],
      feel: "Behind-the-beat should feel like exhaling into a hammock — unhurried, warm, completely relaxed. On-the-beat feels alert. Ahead feels urgent. The difference is subtle but transforms the music.",
      wrong: "If all three passes sound the same, you're not displacing enough. Exaggerate: for behind-the-beat, wait until AFTER the click, then sing. For ahead, anticipate and start BEFORE the click. Once you can feel the extremes, finding the sweet spot is easy.",
      sarah: "Gene, this is the secret ingredient. Your laid-back porch register NATURALLY sits behind the beat — that's why it sounds so good. This exercise makes it a choice you can dial in, not an accident. Skinshape, DOPE LEMON, Pepper — they all live in this pocket.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-19",
      time: 8,
      title: "Root Singing — Feel the Function",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "C", "G", "Em"], bpm: 80, stepDuration: "1m" },
      what: "Combines: FUNCTIONAL HEARING + CHORD CHANGES. Sing ONLY the root note of each chord as it passes: A over Am, C over C, G over G, E over Em. Don't think about what note is 'right' — FEEL the gravity of each chord pulling your voice to its center. This builds the harmonic GPS that lets you navigate any progression by ear.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Em (4 beats).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em. Sing ONLY the root of each chord: A... C... G... E... One note per chord, held for the full 4 beats. Feel how each root has a different gravitational pull — A feels like home, C feels like warmth, G feels bright, E feels contemplative.", why: "Berklee's ear training starts here: singing chord roots trains FUNCTIONAL hearing — you learn to feel where you are in the harmony, not just what note to sing. This is the GPS that makes chord navigation instinctive." },
        { text: "Now feel the MOVEMENT between roots. A→C is a step up (departure). C→G is a leap up (lift). G→E is a step down (settling). E→A is a leap down (home). Sing through the cycle 4 times, feeling the direction of each move.", why: "Root motion is the skeleton of harmony. When you feel the direction of root movement, you can anticipate chord changes before they arrive — which is how great singers phrase ahead of the harmony." },
        { text: "Try it eyes closed, no guitar — just the backing track. Can you FEEL where each chord arrives and sing the root without looking at your hands? Let your ear find the center of each chord.", why: "Eyes-closed root singing tests whether you're HEARING the harmony or just SEEING the chord shapes. When your ear can find the root without visual help, your harmonic hearing is developing." },
        { text: "Now add one chord tone above each root: A→C over Am (root up to 3rd), C→E over C, G→B over G, E→G over Em. Two notes per chord: root + 3rd. The 3rd is the COLOR — it tells you major or minor.", why: "Root + 3rd is the minimum harmonic information. The root says WHERE you are. The 3rd says HOW IT FEELS (major=bright, minor=blue). Two notes per chord, and you've captured the entire emotional landscape." },
        { text: "2-minute freestyle: sing roots freely with occasional 3rds and 5ths. Let the roots be your anchor — always know where HOME is for each chord. Record it.", why: "When root awareness becomes automatic, your ear has a compass. Every improvisation is oriented — you always know where you are in the harmony, even as your melodies wander freely." }
      ],
      feel: "Each root should feel like gravity — the note the chord WANTS you to sing. When you hit the root, everything locks in. When you sing the 3rd or 5th, you feel the distance from that center. That distance is expression.",
      wrong: "If the roots all feel the same, you're not listening to the chord changes. Stop singing and just listen to the chords for 30 seconds. Hear how each one has a different center of gravity. Then sing that center.",
      sarah: "Gene, this is the exercise that builds harmonic instinct. Once your ear knows where the root is at all times, you can wander as far as you want and always find your way home. It's the difference between exploring with a compass and wandering lost.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      pianoKeys: { notes: ["E3", "G3", "A3", "C4"], label: "Chord Roots", range: ["E3", "C4"] },
      recorder: true
    },
    {
      id: "ss-5-20",
      time: 10,
      title: "Color Palette Freestyle",
      type: "vocal",
      what: "Combines: INTERVAL FEELING (from L3) + CHORD CHANGES + GENRE FEEL. Each chord gives you a palette of 3 colors (root, 3rd, 5th). As the chords change, your palette shifts. Paint freely across the chord changes, reaching for notes by FEEL not by name. This is the paintbrush exercise — sounds as colors, chords as palettes.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      steps: [
        { text: "Strum Am. Your palette: earth (A), blue (C-minor 3rd), sky (E-5th). Paint freely for 1 minute — reach for openness when you want sky (E), reach for ache when you want blue (C), return to earth when you want grounding (A). Don't think note names. Think FEELINGS.", why: "When you associate notes with emotional qualities rather than letter names, your improvisations become expressive by default. You're not 'singing A-C-E' — you're choosing between home, ache, and space." },
        { text: "Chord changes to C. New palette: warmth (C-root), brightness (E-major 3rd — note: E is now the MAJOR 3rd, a different color than over Am), comfort (G-5th). Notice how E changes emotional function — it was 'sky' over Am but is 'brightness' over C. Same note, different color.", why: "Context changes a note's meaning. The same E that felt like open space over Am now feels like warm brightness over C. This is harmonic color — and it's why chord changes make melodies richer." },
        { text: "Strum Am-C-G-Em over the Khruangbin backing. For each chord, feel the palette shift. Am is blue+earth. C is warm+bright. G is golden+wide. Em is dark+deep. Navigate by feeling, not by note names. 3 minutes freestyle.", why: "Painting across changing palettes IS melodic improvisation at its most expressive. When you reach for feelings and the right note appears, your voice and ear are fully connected." },
        { text: "Switch to the desert blues backing track. Stay on Am for 2 minutes straight — but now explore the SPACES BETWEEN the palette colors. What happens between earth and blue? Between blue and sky? Sing into the cracks between chord tones — passing tones, slides, the notes that don't have names yet.", why: "The spaces between palette colors are where the most interesting melodies live. Blues, desert blues, and soul all live in these cracks — bending toward a color without fully arriving. This is what gives Tinariwen and Ali Farka Touré their vocal magic." },
        { text: "Final 2-minute freestyle: choose any backing track, any chords. Paint with your full palette — all the colors, all the spaces between them. Eyes closed. Trust your ear. Record it.", why: "When you can paint freely across harmonies using emotional colors instead of note names, you've internalized the sounds. They're part of you now — available instantly, like reaching for a color without looking at the paint tube." }
      ],
      feel: "This should feel like painting — choosing each note the way you'd choose a color. Not 'what note is correct here?' but 'what feeling do I want right now?' and letting your voice find it.",
      wrong: "If you're thinking in letter names (A, C, E) instead of feelings (earth, blue, sky), the exercise hasn't clicked yet. Go back to the drone in ss-3-16 and feel each interval's emotional quality until it's instinctive.",
      sarah: "Gene, this is the paintbrush exercise. Notes as colors. Chords as palettes. You're not playing scales — you're painting with sound. When this clicks, you'll never think about 'what note should I sing' again. You'll just reach for the feeling.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── RHYTHM EXERCISES (from Level 7) ───

    {
      id: "ss-5-21",
      time: 7,
      title: "Swing vs Straight",
      type: "rhythm",
      what: "Same chord progression (Am-C-G-Em) strummed two ways: straight 8th notes (even, rock/surf) vs swung 8ths (bouncy, jazz/soul/blues). Then sing the same melody over both. Notice how swing changes the vocal feel entirely. Each rhythmic approach is a genre door.",
      setup: "Guitar. Metronome at 85 BPM. Backing tracks ready.",
      steps: [
        { text: "Strum Am-C-G-Em with straight 8th notes — perfectly even down-up strumming. 2 minutes. This is the surf/rock/punk feel. Even, driving, forward.", why: "Straight 8ths are the default feel of rock, surf, punk, and most pop. Every down and up stroke is exactly equal in duration." },
        { text: "Same chords, but now swing the 8ths — the downstroke is longer, the upstroke is shorter. 'Long-short, long-short.' Bouncy, relaxed, bluesy. 2 minutes.", why: "Swing is the feel of jazz, blues, soul, and reggae-influenced music. The uneven 8ths create a natural 'lean' that sounds and feels completely different from straight time." },
        { text: "Sing a simple melody (A-C-E-C, one note per bar) over the straight feel. Then sing the exact same melody over the swung feel. Record both.", why: "The same melody feels completely different over swing vs straight. Straight feels urgent and bright; swing feels laid-back and warm. This is how rhythm defines genre." },
        { text: "Play the Groove Beat track (straight feel). Strum and sing over it. Then switch to Deep Soul Groove (swing feel). Same melody, different world.", why: "Backing tracks make the swing vs straight contrast visceral. The groove pulls your voice into its pocket — you don't have to think about it." },
        { text: "Which feel suits your voice better? Spend 2 more minutes in that feel, improvising freely. Your preference reveals your genre instinct.", why: "Most singer-songwriters default to one feel without knowing it. Making it conscious gives you the choice to switch genres deliberately." }
      ],
      feel: "Straight should feel like surfing — forward momentum, clean energy. Swing should feel like a porch swing — rocking, lazy, warm. Both are valid; both are powerful.",
      wrong: "If your swing sounds like straight 8ths with a hiccup, you're not committing to the feel. Exaggerate the long-short pattern until it feels natural, then dial it back.",
      sarah: "Gene, your playlists live at the border of swing and straight — Khruangbin swings subtly, Allah-Las play straight, Skinshape swings hard. Knowing both lets you navigate your whole taste map.",
      metronome: 85,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-5-22",
      time: 6,
      title: "Rhythmic Density as Color",
      type: "vocal",
      what: "Sing one note (A) over an Am strum. Round 1: pack 8 syllables into one bar (dense, storytelling energy). Round 2: sing 2 syllables per bar (sparse, declarative). Round 3: alternate dense and sparse bars. Syllable density is a section-contrast tool — busy verse vs sparse chorus or vice versa.",
      setup: "Guitar strumming Am. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am at 80 BPM. Sing 'da' on the note A, packing 8 syllables into each bar — 'da-da-da-da-da-da-da-da.' Dense, rapid, storytelling energy. Do this for 4 bars.", why: "Dense syllable packing is the rhythm of verses that tell stories — lots of words, lots of information. Bob Marley, Sublime, and Pepper all use this in their verses." },
        { text: "Same strum, same note. Now sing only 2 syllables per bar — 'daaaa... da.' Long, spacious, declarative. 4 bars.", why: "Sparse delivery is the rhythm of choruses and hooks — few words, maximum impact. The space between notes creates emphasis." },
        { text: "Alternate: 2 bars dense, 2 bars sparse. Feel the contrast. The dense bars create tension and momentum; the sparse bars release it.", why: "This density contrast is how professional songwriters create section contrast without changing chords or melody. The rhythm alone signals verse vs chorus." },
        { text: "Now improvise your own density pattern over 8 bars. Maybe start sparse and build to dense, or create your own rhythm. Record it.", why: "Choosing density is a compositional decision. You're writing rhythm — the skeleton that lyrics and melody will eventually hang on." },
        { text: "Listen back. Notice how density changes feel like different sections of a song, even though the note and chord never changed.", why: "This proves that rhythm alone can create song structure. When you add pitch changes later, the structural contrast will be even more dramatic." }
      ],
      feel: "Dense bars should feel chatty and urgent — like you have a lot to say. Sparse bars should feel like a deep exhale — confident, unhurried, letting the words land.",
      wrong: "If your dense syllables are uneven or rushed, slow the metronome. Every syllable should land on a subdivision. If your sparse notes feel empty rather than powerful, commit more — sing louder and sustain longer.",
      sarah: "Gene, think about how Tommy Guerrero's instrumentals use this — sparse melodic lines over busy rhythm, then the reverse. Density is a texture knob you can turn.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-5-23",
      time: 6,
      title: "Strum + Vocal Rhythm Conversation",
      type: "song",
      what: "Strum a groove and create a vocal rhythm that COMPLEMENTS (not duplicates) the guitar. When the guitar is busy, the voice rests. When the guitar rests, the voice fills. Guitar and voice become two parts of one rhythm — like a conversation.",
      steps: [
        { text: "Strum the reggae offbeat chop on Am. Notice where the GAPS are in the strum (on the beats). Now sing short notes in those gaps.", why: "Filling gaps creates interlocking rhythm — voice and guitar fit together like puzzle pieces. This is the foundation of groove-based singing." },
        { text: "Switch to surf jangle (continuous 8ths). The gaps are smaller. Sing longer, sustained notes that ride on top of the strum.", why: "Over busy guitar, the voice simplifies. Over sparse guitar, the voice can be busier. This balance is instinctive in great singers." },
        { text: "Try this: strum for 2 bars, then stop and sing for 2 bars (no guitar). Then overlap for 2 bars. The contrast reveals how voice and guitar relate.", why: "Alternating solo and overlap reveals which textures you prefer. Some songs work best with voice + guitar interlocking; others work best with trading off." },
        { text: "Create a 16-bar piece where voice and guitar have a conversation — sometimes together, sometimes taking turns. Record it.", why: "A 16-bar voice-guitar conversation is a complete musical statement. This is the rhythmic foundation of your songwriting style." }
      ],
      feel: "Voice and guitar in conversation should feel like a duo — two musicians listening to each other. When they interlock perfectly, the whole thing grooves harder than either alone.",
      wrong: "If voice and guitar are always landing at the same time, they're not conversing — they're shouting together. Create space for each to breathe.",
      sarah: "Gene, this conversational approach is exactly what Khruangbin does — Mark Speer's guitar fills the spaces around Laura Lee's bass and vice versa. Apply the same principle to your voice and guitar.",
      metronome: 85,
      referencePitches: getPitchRange("A3", "A3"),
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      recorder: true
    },

    // ─── COMBINATION CAPSTONE ───

    {
      id: "ss-5-24",
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
        { text: "Listen to all three recordings. Each round combined two skills. In Level 6, everything combines at once. How close are you?", why: "Self-assessment through recording playback is one of the most effective practice techniques. You hear things in playback that you can't hear while performing." }
      ],
      feel: "Each round should feel like juggling two balls — challenging but possible. In Level 6, you'll juggle all of them at once.",
      wrong: "If one skill disappears when you focus on the other (e.g., dynamics go flat when you focus on chord changes), the weaker skill needs more isolated practice from Levels 3-4.",
      sarah: "Gene, this is the checkpoint. If you can combine any two skills fluently, you're ready for Level 6 where everything flows together. These recordings are your proof.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── KEY DIVERSITY — DUAL-TASK IN MULTIPLE KEYS ───

    {
      id: "ss-5-25",
      time: 6,
      title: "Em Center Transpose",
      type: "vocal",
      what: "Take the Hum+Strum skill from ss-5-2 and do it over Em-G-C-D instead of Am-C-G-Em. Same dual-task challenge, new harmonic center. Em feels more melancholy than Am, and the chord order creates different gravitational pull. The fact that this feels harder than Am-C-G-Em IS the learning — your brain is building a more flexible schema.",
      setup: "Guitar. Metronome at 80 BPM. Strum Em-G-C-D.",
      steps: [
        { text: "Strum Em-G-C-D at 80 BPM. Hum the root of each chord: E over Em, G over G, C over C, D over D. Notice: these chord changes feel different from Am-C-G-Em even though they share the same notes.", why: "Same notes, different center of gravity. Em as home makes G feel like departure and D feel like tension. This proves that 'key' is about where HOME is, not which notes you play." },
        { text: "Sing chord tones: E-G-B over Em, G-B-D over G, C-E-G over C, D-F#-A over D. Notice the D chord introduces F# — a note outside the Am pentatonic. Navigate to it by ear.", why: "F# appears when D becomes a major chord in this context. Your voice encounters a 'new' note that challenges Am-trained muscle memory." },
        { text: "Free vocal improv over Em-G-C-D. Treat Em as home — phrases that end on E feel resolved. Compare this to your Am improv — different emotional center, same set of notes. 2 minutes, record.", why: "The emotional difference between Em-centered and Am-centered improvisation proves that key center matters more than which notes are available. This is the deepest lesson in key diversity." }
      ],
      feel: "Em center should feel darker and more introspective than Am center — even though the chords overlap. Like the same landscape at dusk instead of noon.",
      wrong: "If you keep gravitating back to A as your home note, you're fighting the Em center. Deliberately end phrases on E. Let E be the note of resolution.",
      sarah: "Gene, Em is the minor relative of G major — it's the melancholy side of the bright key you explored in L4. Every chord you know can serve a different function depending on which one is 'home.'",
      drone: { mode: "cycle", progression: ["Em", "G", "C", "D"], bpm: 80, stepDuration: "1m" },
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-26",
      time: 7,
      title: "E Major Strum + Sing",
      type: "vocal",
      what: "The dual-task ramp from ss-5-2, but in E major. Strum E-A-B7 at 80 BPM. Hum roots, then sing chord tones. This is the first time you're combining guitar autonomy with vocal work in a genuinely new key family. The chord shapes are different, the vocal targets are different — everything you automated in Am must be rebuilt from scratch in E major.",
      setup: "Guitar. Metronome at 80 BPM. Strum E-A-B7. Review B7 fingering from ss-4-22 if needed.",
      steps: [
        { text: "Strum E-A-B7 at 80 BPM with a simple quarter-note pattern. Just get the chord changes smooth. If B7 is still rough, drill E→B7→E transitions until the change is clean.", why: "Guitar autonomy in a new chord progression must be established before adding voice. E-A-B7 has different transition mechanics than Am-C-G-Em." },
        { text: "Hum the root of each chord: E over E, A over A, B over B7. Sustained hum, one root per chord. If the strum hitches, go back to guitar-only practice.", why: "Root tracking over new chords tests whether the dual-task transfers across key families. If humming E-A-B disrupts the strum, the E-A-B7 guitar pattern isn't autonomous yet." },
        { text: "Sing chord tones: E-Ab-B over E (remember Ab = G#), A-C#-E over A, B-D#-F# over B7. Navigate these new notes by ear — the drone will guide you.", why: "These chord tones include notes you've rarely or never sung (Ab, C#, D#/Eb, F#). Each one is a new physical vocal experience — different resonance, different breath support." },
        { text: "Free vocal improv over E-A-B7. Sing whatever notes feel right over each chord. 2 minutes, record. Compare to your Am-C-G-Em improv — how does your voice sound different?", why: "Free improvisation in E major with guitar tests the full dual-task in a new key family. The comparison to Am reveals how key-specific your vocal instincts are." }
      ],
      feel: "This should feel like learning to drive in a new car — the controls are in different places but the skill is the same. Awkwardness is expected and productive.",
      wrong: "If you're singing Am pentatonic notes (G natural, C natural) over E-A-B7, you're defaulting to familiar muscle memory. Use the drone to find Ab and C# — they're the notes that make E major sound like E major.",
      sarah: "Gene, this is where the research on key-specific vocal production gets real. Your voice literally uses different muscles to produce Ab than to produce G. Building this dual-task in E major gives you a second musical identity.",
      drone: { mode: "cycle", progression: ["E", "A", "B7"], bpm: 80, stepDuration: "1m" },
      referencePitches: getPitchRange("E3", "C#4"),
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-27",
      time: 8,
      title: "Cross-Key Flow",
      type: "vocal",
      what: "The ultimate contextual interference exercise for Level 5. Strum 4 bars Am-C-G-Em, then switch to 4 bars E-A-B7, then back. Navigate the key family shift while maintaining all dual-task skills. The jump between Am (no sharps) and E major (4 sharps) forces your brain to build abstract, key-independent musicianship rather than Am-specific habits.",
      setup: "Guitar. Metronome at 85 BPM.",
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em for 4 bars (16 beats). Sing chord tones freely — you know this territory. Then immediately switch to E-A-B7 for 4 bars. Sing chord tones in E major. The transition is the challenge.", why: "The key switch forces your brain to reconfigure both guitar shapes AND vocal targets simultaneously. This is maximum contextual interference — and it's what produces the deepest learning." },
        { text: "Repeat the cycle 4 times: Am family → E family → Am family → E family. Each time the switch should feel slightly smoother. Your brain is building the neural pathways for key-independent musicianship.", why: "Repeated key switching builds the 'abstract schema' that research describes — the ability to apply musical skills in any context, not just the one you practiced in." },
        { text: "On the final cycle, try to maintain the same emotional arc across both keys. Start quiet and build, or start bright and fade — but keep the emotional continuity even as the key changes.", why: "Maintaining emotional continuity across key changes is what professional musicians do instinctively. It separates 'playing in a key' from 'making music that happens to change keys.'" },
        { text: "Record the full exercise. Listen back — can you hear the transition points? Do they sound like jarring gear shifts, or smooth lane changes? The goal is smooth.", why: "The recording reveals whether the key switches are musical or mechanical. Over time, these transitions become invisible — and that's when key independence is achieved." }
      ],
      feel: "The Am sections should feel like home. The E major sections should feel like a vacation home — familiar enough to function, unfamiliar enough to be exciting. The transitions should feel like stepping through a doorway.",
      wrong: "If you freeze up at the key switch and stop singing, that's normal for the first few attempts. Keep the guitar going and rejoin with your voice — even if it means just humming the root until you find your footing in the new key.",
      sarah: "Gene, this exercise is the research made real. Contextual interference — jumping between keys — feels harder but produces better retention than staying in one key. Every awkward moment here is your brain getting stronger.",
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      recorder: true,
      metronome: 85,
      levelUp: "Can pass the TV Test for guitar autonomy, hum/speak/sustain over chord changes, combine any two improvisation skills — rhythm + dynamics, chord changes + emotion, genre feel + vowel shapes — navigate chord changes by feeling root gravity, place voice behind/on/ahead of the beat deliberately, paint with notes as emotional colors across changing harmonic palettes, distinguish swing from straight feel, vary rhythmic density as a compositional tool, create complementary vocal rhythms that interlock with guitar grooves, perform dual-task singing in Em-centered and E major progressions, and navigate cross-key transitions between Am and E major families — while strumming, without either skill degrading when the other is added."
    }
  ]
};
