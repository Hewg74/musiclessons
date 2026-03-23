import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "Voice Flows",
  subtitle: "Everything at once. Trust the process. Trust your ear.",
  description:
    "Levels 3-5 isolated skills. Level 6 combined them in pairs. Now everything flows together: pitch, rhythm, dynamics, emotion, vowels, chord changes, genre feel — all at once, across multiple genres and progressions. This is full integration. Based on Csikszentmihalyi's flow research: flow states emerge when all sub-skills are automated and the challenge matches your ability. The hear-feel-choose cycle starts as a conscious practice. With enough repetition, it becomes automatic — and that automaticity IS flow. You're not thinking 'hear, feel, choose' anymore. You're simply PRESENT with the music, and the three channels run on their own. The embodiment check at this level becomes a light diagnostic rather than a corrective: when you notice whether the cycle is running or has gone to autopilot, that noticing itself is the practice.",
  artists: "Khruangbin, DOPE LEMON, Allah-Las, Tinariwen, Hermanos Gutiérrez, Skinshape",
  unlocks: "Melody Building (Level 7)",
  review: { label: "Level 6 Check-In", time: 5, exercises: ["ss-6-20", "ss-6-24"], prompt: "Do a Color Palette Freestyle (ss-6-20). Then a Strum + Vocal Rhythm Conversation (ss-6-24). Both fluid with no strum breaks? Move on." },
  exercises: [

    // ─── TRIPLE-SKILL BRIDGE ───

    {
      id: "ss-7-1",
      time: 8,
      title: "Triple-Skill Fusion",
      type: "vocal",
      what: "Bridge exercise: combine THREE skills at once (not two like Level 6, not everything like the rest of Level 7). Three 2-min rounds. Round 1: rhythm + dynamics + chord changes. Round 2: emotional color + vowels + genre feel. Round 3: breath phrasing + audiation + space.",
      setup: "Guitar. Metronome at 85 BPM.",
      tracks: [
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      steps: [
        { text: "Round 1 — Rhythm + Dynamics + Chord Changes: strum Am-C-G-Em at 85 BPM. Sing chord tones with varied rhythms AND varied dynamics while navigating the changes. As you shift between loud and soft, notice how your body opens and closes — chest expanding on crescendos, settling inward on quiet phrases. Let the dynamic shifts happen in the body first, then in the sound. 2 minutes over the groove beat.", why: "Three skills is the cognitive sweet spot between Level 6's pairs and Level 7's full integration. Your brain learns to manage three variables before being asked to manage everything." },
        { text: "Round 2 — Emotional Color + Vowels + Genre Feel: switch to the reggae backing. Strum Am-C with reggae chop. Match emotional color to each chord, choose vowels deliberately, and stay in the reggae pocket. Feel how the reggae groove settles your body into a laid-back weight — shoulders drop, breath slows, the resonance pools low in the chest. Let the genre live in your posture before it reaches your voice. 2 minutes.", why: "This triple combines three 'feel' variables — emotion, vowel, and genre. They reinforce each other: reggae feel suggests certain vowels and emotional textures." },
        { text: "Round 3 — Breath Phrasing + Audiation + Space: no backing track. Strum Am-C-G-Em quietly. Hear each phrase internally before singing it, feel where it gathers in your body, let each phrase be one breath long, and leave at least 2 bars of silence between phrases. During the silence, notice your body resetting — breath deepening, resonance settling back to neutral. The silence isn't empty; it's where the next phrase is forming. 2 minutes.", why: "This triple combines three 'internal' skills — breath control, inner hearing, and restraint. These are the meditative, contemplative side of improvisation." },
        { text: "Reflect: which round felt most natural in your body? Which felt most challenging? Where did the hear-feel-choose cycle flow easiest, and where did a channel go dark? The challenging round reveals which skill combination needs more practice.", why: "Self-assessment identifies your weakest skill intersection. The strongest round shows where your natural abilities lie — useful intel for songwriting." }
      ],
      feel: "Each round should feel like Level 5 with one more ball to juggle. Challenging but not overwhelming. The embodiment check after each round: were all three channels of the hear-feel-choose cycle still running? When you combined rhythm + dynamics + chord changes, did you still feel where each note lived in your body — or did body awareness go dark while your ear and hands kept working? The channel that drops first is always body awareness. Notice it. Reconnect. Then try again.",
      wrong: "If you can only manage two of the three skills in each round, go back to the relevant Level 5 exercise and solidify the pair before adding the third. If body awareness is the skill that keeps dropping, that's normal — PLOS One (2025) found that sensory imagery ('feel the warmth shifting from chest to mask') is more effective than anatomical description for rebuilding the body channel.",
      sarah: "Gene, this is where the hear-feel-choose cycle gets its real test. Three skills means three demands on your attention. The cycle has to run automatically on at least two of them while you consciously manage the third. When all three channels sustain without effort — that's flow approaching.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── FULL-INTEGRATION IMPROV ───

    {
      id: "ss-7-2",
      time: 8,
      title: "Full Progression Improv",
      type: "vocal",
      what: "All skills, all at once. Strum Am-C-G-Em and freely improvise using every tool from Levels 3-5: varied rhythm, dynamics, emotional color, vowel shapes, chord-tone navigation, and space. No constraints. Just play.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em. Sing chord tones freely. Engage everything at once: vary your rhythm, shift dynamics, change emotional color with each chord, shape your vowels. As the music flows, let your attention settle into the body rather than the head — feel the vibration traveling as the melody moves, the chest opening on loud phrases, the resonance lifting toward the mask on higher notes. All of it, flowing.", why: "Full integration is the final stage of motor learning. When all sub-skills are automated, they can operate simultaneously. The conscious mind is free to be creative." },
        { text: "Let the music breathe. Leave 2-4 bars of silence periodically. In the silence, feel your body reset — shoulders soften, breath deepens, the resonance from the last phrase fades like warmth leaving a stone. When you re-enter, come in from a different place in the body than where you left. Space is a skill too.", why: "Strategic silence is what separates masterful improvisation from nervous noodling. The pause resets your creative state and lets the next idea emerge fresh." },
        { text: "Try one pass where you focus on very sparse, minimal singing — 3-4 notes per bar maximum. Feel how sparse singing concentrates the body's awareness into each note: every pitch has a clear address, every vowel a deliberate shape. Then one pass where you're more active — filling the bars. Notice how the body's attention broadens, becomes more diffuse, more flow-like. Both are valid musical choices.", why: "Density control — choosing how much to sing — is a compositional decision. Building fluency at both sparse and dense extremes gives you the full range." },
        { text: "5-minute freestyle. Record the whole thing. Don't stop, don't restart. Whatever happens is the music. Let the body lead — when you stop thinking and start feeling, that's the moment the cycle becomes invisible.", why: "Five uninterrupted minutes of integrated improvisation is the fluency milestone. If you can sustain this, every skill is working together." }
      ],
      feel: "This should feel like the moment when driving a car becomes automatic — you're not thinking about the pedals, the mirrors, the steering. You're just going somewhere. The hear-feel-choose cycle is running beneath the surface like a heartbeat. You don't monitor it. It just runs. When you catch a moment of noticing — 'oh, I'm present' — that's the cycle briefly becoming conscious before slipping back into flow. Both states are valid. Both are music. Always end on something that worked — however small. If the last phrase was messy, do one more easy one to finish. Finish on a note you're proud of — it rewrites the emotional tag on everything before it.",
      wrong: "If you notice one skill disappearing (e.g., dynamics go flat, or you stop navigating chord tones), it means that skill isn't automated yet. Run the embodiment check: is the full cycle running, or has a channel gone dark? Go back to its Level 3-4 exercise to rebuild that channel.",
      sarah: "Gene, this is what every exercise has been building toward. Your voice and guitar as one instrument. All the individual skills fused into flow. The hear-feel-choose cycle is no longer something you do — it's something you ARE. Let it happen.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-3",
      time: 8,
      title: "Major Key Flow",
      type: "vocal",
      drone: { mode: "cycle", progression: ["G", "C", "D", "G"], bpm: 85, stepDuration: "1m" },
      what: "Switch to a major-key progression: G-C-D. All three chords are major — brighter, more resolved, more 'sunny.' Integrate all your skills in this new harmonic context. D chord introduces F# — your first sharp.",
      setup: "Guitar. Metronome at 85 BPM. G (4 beats) → C (4 beats) → D (4 beats) → G (4 beats).",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Strum G-C-D-G. Sing chord tones for each: G(G-B-D), C(C-E-G), D(D-F#-A), back to G. Notice how the major-only progression feels brighter in the body — the resonance lifts slightly, the chest opens, the whole vocal tract shifts from the settled warmth of minor to something more buoyant and forward-placed.", why: "Major progressions want different things from your voice — wider intervals, more confident phrasing, more rhythmic drive. Let the chords guide your instincts." },
        { text: "Pay attention to D chord: it contains F# — the only sharp in the progression. When D comes around, feel the pull — F# creates a physical forward-lean, a brightness in the mask that wants to resolve back to G. Sing it or avoid it. Both are valid choices, and both feel different in the body.", why: "F# is the 'leading tone' that pulls the progression back to G. Singing it creates forward momentum. Avoiding it keeps things floating. Both are musical tools." },
        { text: "Engage all your expressive tools: dynamics that build over the progression, emotional shifts with each chord (G=bright and open in the chest, C=warm and settled, D=forward and reaching), vowel variety, rhythmic play. Let each chord's emotional color arise from where the resonance naturally settles.", why: "Applying your full skill set to a new harmonic context proves the skills are transferable — not just tricks that work over Am-C-G-Em." },
        { text: "Free improv over G-C-D-G for 4 minutes. This is surf-rock territory — let it feel bright and driving. The body should feel lighter than minor-key improv, more buoyant, the resonance living higher in the chest and mask. Record it.", why: "Different progressions evoke different moods and vocal instincts. Building fluency across both minor-centered and major-centered progressions doubles your songwriting vocabulary." }
      ],
      feel: "This progression should feel more uplifting and resolved than Am-centered. Your voice might naturally want to be more rhythmic and forward-placed.",
      wrong: "If you're singing the same patterns here as over Am-C-G-Em, you're not responding to the harmonic context. Let the chords tell you what to sing.",
      sarah: "Gene, G-C-D is Sun Room, Babe Rainbow, Surf Hat — your Australian surf-garage playlist in three chords. This is where the bright golden-hour energy lives.",
      metronome: 85,
      referencePitches: getPitchRange("D3", "A4"),
      pitchContour: true,
      recorder: true
    },

    // ─── GENRE INTEGRATION ───

    {
      id: "ss-7-4",
      time: 8,
      title: "Desert Blues Flow",
      type: "song",
      drone: { root: "Am", octave: 2, texture: "tanpura" },
      what: "Full integration in the desert blues context. Sparse, repetitive, hypnotic — the same small melodic ideas repeated with subtle variation. All your skills applied to the aesthetic of less-is-more. Think Tinariwen, Ali Farka Touré, Bombino.",
      setup: "Guitar. Strum Am with a sparse, repetitive pattern. Let the backing track carry the groove.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play the backing track. Just LISTEN for 30 seconds with eyes closed. Feel where the groove lives in your body — the slow pulse, the deep bass, the space between notes. When your body is breathing with the groove, THEN start. Strum Am with a sparse pattern. Sing A and E only (root and 5th). Feel how A settles deep in the chest, grounded and warm, while E lifts slightly toward the throat — two body addresses, two notes, a gentle rocking between them. Repeat a simple 2-note phrase with micro-variations each time. Same phrase, gently evolving. 2 minutes.", why: "Repetition with micro-variation is the core of desert blues melody. It's meditative rather than developmental. Each repetition is slightly different — it creates a trance." },
        { text: "Add C (the minor 3rd) sparingly — it lives between A and E in the body, carrying a darker ache in the throat. Use it as a rare color. Apply your dynamics skill: the desert is quiet, then a gust of wind (crescendo — feel the chest expand, the breath deepen), then quiet again.", why: "Scarcity creates value. Dynamic variation adds drama to the repetition without adding complexity. The interplay between sparse melody and dynamic shape IS desert blues." },
        { text: "Shift your vowel to match the mood: 'ahh' opens the chest wide for desert expanse, 'ooh' draws the resonance inward for intimate campfire warmth. Feel each vowel as a different room in the body — 'ahh' is the open sky, 'ooh' is the sheltered fire. Let vowel choices follow the emotional arc.", why: "In desert blues, every element serves the atmosphere. Vowel choice is part of the production — not just 'what comes out.'" },
        { text: "3-minute freestyle: all skills integrated in the desert blues zone. Sparse, hypnotic, meditative. Let the body settle into stillness — the music rises from a quiet, grounded place. Resist the urge to add complexity. Record it.", why: "The discipline of simplicity with full expressive control is the hardest skill. Anyone can be complex. Simplicity with depth requires mastery." }
      ],
      feel: "This should feel like sitting around a campfire in the Sahara — the heat, the stars, the endless horizon. The music doesn't go anywhere. It just exists. In desert blues, the hear-feel-choose cycle slows to match the genre: you hear a note, feel it settle deep in the chest, choose to hold it rather than move on, and produce it with the warmth of low resonance. The cycle runs, but at the tempo of breath, not thought. The body leads. The music follows.",
      wrong: "If your improvisation sounds busy or like it's 'going somewhere,' you've missed the desert blues aesthetic. Strip away. Fewer notes. More repetition. More space.",
      sarah: "Gene, Tinariwen is in your top rotation. Hermanos Gutiérrez lives in this same sonic space. This is where your cinematic, sparse side comes out — let the emptiness speak. Desert blues vocals are raw and undecorated — like talking to someone across a fire. No vibrato, no swells, no drama. And the silences between phrases aren't pauses — they're architectural. 2-4 bars of silence is genre-defining, not something to fill. This connects to the surf-psych vocal float from Vocal Level 8 (v8e4) — both genres suppress vibrato — but desert blues is even more stripped down. No reverb cushion, no breathy softness. Just direct voice and space.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },

    {
      id: "ss-7-5",
      time: 8,
      title: "Dub Reggae Flow",
      type: "song",
      what: "Full integration over dub reggae backing track. Heavy space, echo-like vocal repetitions, sparse chord tones with delay-style re-attacks. Voice as texture, not melody. Dub is about what's NOT there.",
      setup: "Guitar. Reggae offbeat chop over Am-C. Let the dub backing track carry the vibe.",
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Start the dub backing track. Strum Am-C with a loose reggae chop. Sing sparse chord tones — one note every 2-4 bars. Let each note emerge from stillness, feel it form in the chest before it surfaces, then let it hang in the space and dissolve. Your voice is a dub echo — appearing, fading, gone.", why: "Dub reggae treats vocals as texture, not melody. Your voice is one element in a spacious mix — appearing, echoing, disappearing. This is the most restrained genre integration exercise." },
        { text: "Try echo-style repetitions: sing a note, then repeat it softer (like a delay effect). A... a... a... Each repetition quieter, the vibration retreating deeper into the body — from chest to throat to the faintest hum behind the sternum. Your voice IS the echo, and the body traces the fade.", why: "Simulating delay with your dynamics creates a dub texture using only your voice. This trains extremely fine dynamic control at the quiet end of your range." },
        { text: "Leave at least 4 bars of silence between vocal entries. During the silence, feel the body at rest — breath slow, resonance quiet, the space between notes as physically present as the notes themselves. When you do sing, let the note rise from that stillness. It should feel like an event — rare and meaningful.", why: "Dub teaches maximum restraint. When you can resist the urge to sing for 4+ bars, every note you DO sing carries enormous weight." },
        { text: "3-minute freestyle: voice as dub texture over the backing. Sparse, spacious, echo-like. Let your body become the space between notes — still, settled, breathing with the groove. All your skills applied to the art of almost-not-singing. Record it.", why: "Dub integration proves you can apply full skill integration in a context that demands near-silence. This is the opposite of busy improv — and equally valuable." }
      ],
      feel: "This should feel like floating in warm water — your voice surfaces occasionally, then sinks back. The space is the music. You're adding seasoning, not the main dish.",
      wrong: "If you're singing too much or too melodically, you've missed the dub aesthetic. Fewer notes. More space. Voice as texture, not melody.",
      sarah: "Gene, Pepper and Slightly Stoopid's dub side lives here — space, echo, groove. Your voice becomes part of the production, not the star. Let the backing track breathe. Your reggae vocal delivery needs three things: (1) each syllable is a rhythmic event locked to the offbeat, (2) slight nasal focus — think of the sound living in your nose/mask area so you cut through the bass, (3) call-and-response structure — sing a short phrase, then STOP for a full bar. Let the riddim breathe. This comes from Vocal Level 4's behind-the-beat work (v4e3) and Vocal Level 8's reggae texture (v8e3).",
      metronome: 85,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-7-6",
      time: 8,
      title: "Soul Groove Flow",
      type: "song",
      drone: { mode: "cycle", preset: "desert-blues" },
      what: "Full integration over a new chord set: Am-Dm-G-C. Soul music is rhythmic, warm, and groove-locked. Dm introduces a new note (F) you haven't improvised with. All skills applied to the soul-funk aesthetic.",
      setup: "Guitar. Strum Am-Dm-G-C with a 16th-note feel. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }, { name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am-Dm-G-C. Sing chord tones: Am(A-C-E), Dm(D-F-A), G(G-B-D), C(C-E-G). When Dm arrives, feel how F sits differently in the body — darker, more tense in the throat, a note that pulls rather than settles. Let your ear find it naturally.", why: "Dm introduces F — a new note that expands your melodic vocabulary. Learning new notes in context (while improvising) is more effective than studying on paper." },
        { text: "Lock into the soul groove: shorter phrases, rhythmically precise, warm chest resonance. Feel the groove in your whole body first — head nodding, foot tapping, shoulders loose. Before each phrase, hear its contour and feel where it wants to live. Soul lives in the chest: warm, grounded, intimate. Let the resonance pool there.", why: "Soul singing is defined by rhythmic precision and warm tone. Pre-hearing the melodic contour means every phrase is chosen, not accidental. It sits in the middle of your dynamic range — not whispering, not projecting, just grooving with intention." },
        { text: "Apply emotional color: Am is warm and melancholic (resonance settles deep), Dm is darker and tense (the throat tightens slightly around F), G is bright and resolved (chest opens), C is settled and open (breath releases). Let each chord shift your body's state, and let the delivery follow. Mid-pass check: are you still hearing each phrase before it arrives, or has autopilot kicked in? Both are valid — but noticing which mode you're in builds awareness.", why: "Soul music is emotionally nuanced — subtle shifts in warmth and intensity with each chord change. The autopilot check is a diagnostic, not a correction: in flow exercises, some autopilot is natural. The skill is knowing when your ear is leading and when your muscle memory is." },
        { text: "3-minute freestyle: voice and guitar locked into the soul groove. Let the body drive — the groove starts in the foot, moves through the chest, and emerges as voice. All skills flowing. Record it.", why: "Soul improv teaches your voice to prioritize feel over flash. When your voice grooves, your songs groove." }
      ],
      feel: "Your whole body should feel the groove — head nodding, foot tapping, voice and guitar as one rhythmic organism. Soul music is felt before it's heard. In soul, the hear-feel-choose cycle is body-first: the groove enters through the body (foot, head, shoulders), the feeling arises from the physical movement, and the note choices follow. This is embodiment at its most natural — the music starts in the body and works outward. When your whole body is grooving, the cycle runs itself.",
      wrong: "If your vocal improvisation feels 'floaty' or disconnected from the beat, you're not in the pocket. Simplify until it locks, then add complexity from within the groove.",
      sarah: "Gene, Khruangbin and Skinshape live here — soul groove with understated vocals that serve the groove. This is your 'cool' vocal mode.",
      metronome: 90,
      referencePitches: getPitchRange("D3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-7",
      time: 8,
      title: "Cinematic Western Flow",
      type: "song",
      what: "Full integration in the cinematic context. Wide intervals, dramatic pauses, open vowels, dynamic swells. This is Hermanos Gutiérrez, Ennio Morricone territory — where your voice becomes part of a landscape.",
      setup: "Guitar. Sparse fingerpicked or arpeggiated Am-Em pattern.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Start the backing track. Play a sparse, fingerpicked Am-Em pattern. Sing long, sustained notes — hold each for 4-8 beats. Feel the note settle into your body like a stone dropped into still water, the vibration radiating outward. Let each note decay naturally, the resonance fading from the chest. The silences are part of the music.", why: "Cinematic vocal delivery is about sustained tone and dramatic space. Each note is an event. Film composers use a single voice to evoke vastness." },
        { text: "Try wide intervals: jump from A3 (low, deep in the chest) to E4 (high, buzzing in the mask). Feel the leap travel through your body — the resonance vaults from sternum to cheekbones. Don't connect them smoothly — let the physical distance be felt. That body-crossing IS the drama.", why: "Wide intervals create emotional drama that stepwise motion doesn't. This is a different expressive language from the groove-based genres." },
        { text: "Apply your full dynamic range: swell from whisper to full voice over 8 bars — feel the body gradually opening, breath deepening, resonance expanding from a private hum to something that fills the room. Then drop suddenly to silence. Feel the body contract back to stillness. The drama is in the contrasts.", why: "Cinematic music lives on dynamic contrast. The whisper makes the crescendo dramatic. The silence makes the next note powerful." },
        { text: "3-minute freestyle: voice and sparse guitar painting a cinematic landscape. Let the body become the landscape — vast, open, still between the notes. Each note rises from somewhere physical, travels through the body, and returns to silence. All skills, applied to space and drama rather than groove. Record it.", why: "Cinematic improv trains a different musical muscle than groove-based improv. Mastering both means you can write songs in ANY of your genre preferences." }
      ],
      feel: "This should feel like a landscape — vast, open, emotional. Your voice is a single figure in an enormous space. Wide intervals create wide body shifts: a jump from A3 to E4 crosses the passaggio, moving the resonance from chest to head. Feel the body-location shift as part of the drama — the physical sensation of climbing IS the emotional sensation of reaching. In cinematic music, the body and the emotion are one.",
      wrong: "If your improvisation sounds busy or rhythmic, you're importing energy from the wrong genre. Strip it back. Fewer notes. Longer sustains. More dramatic silence.",
      sarah: "Gene, Hermanos Gutiérrez is in your top 10 across all time ranges. This cinematic, reverb-drenched sound is deeply in your DNA. Let that come through.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── MOTIF AND VARIATION ───

    {
      id: "ss-7-8",
      time: 8,
      title: "Motif and Variation",
      type: "vocal",
      what: "Improvise freely for 1 minute. When a phrase catches your ear, repeat it. Then vary it: change one note, change the rhythm, change the dynamics. Develop a single idea through 4-5 variations. Kratus Level 3: process → product transition.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em over the backing track. Improvise freely for 1 minute. Don't try to create anything — just play. Let phrases come and go. Stay loose in the body, breathing easily, attention resting in the chest rather than the head.", why: "Free exploration is the hunting ground for motifs. Your subconscious generates melodic ideas faster than your conscious mind can plan them." },
        { text: "When a phrase catches your ear — and your body — repeat it. You'll know the keeper because something physical responds: a satisfying resonance in the chest, a breath that aligned perfectly, a vowel that felt right in the mouth. Sing it exactly the same way 3-4 times. Feel the body settle into the phrase like a groove worn smooth.", why: "Catching and repeating a phrase is the bridge between improvisation and composition. You're selecting from your stream of ideas — this is the earliest form of songwriting." },
        { text: "Now vary it: change one note while keeping the rhythm — feel how the body adjusts, the resonance shifting slightly. Then change the rhythm while keeping the notes. Then change the dynamics — the same phrase whispered lives in a different body than the same phrase projected. Each variation preserves most of the original while changing one element.", why: "Variation is how motifs develop into melodies, and melodies develop into songs. One idea, systematically transformed, is the engine of musical composition." },
        { text: "Continue developing your motif for 3 more minutes. Let it evolve through 4-5 variations. With each variation, notice: does the body still recognize the original phrase underneath? That physical recognition — the motif's body signature persisting through changes — is how melodies maintain identity. Record everything.", why: "Extended motif development is Kratus Level 3 — the process-to-product transition. You're no longer just exploring; you're creating something intentional from raw material." }
      ],
      feel: "This should feel like discovering treasure while exploring — you stumble on a phrase, pick it up, and polish it. The exploration feeds the creation. When a phrase 'catches your ear,' notice: it also catches your body. The phrase you want to repeat is the one that felt right somewhere physical — a satisfying resonance, a gratifying shift from chest to throat, a breath that lined up perfectly. The body's response is how you recognize a keeper. Trust that signal.",
      wrong: "If you never repeat anything, you're staying in exploration mode. The exercise requires CATCHING a phrase. Even if it's simple, commit to it and develop it.",
      sarah: "Gene, Mark Speer catches a phrase and rides it for minutes — that's Khruangbin's entire approach. A single motif, endlessly varied. This exercise builds that same creative instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── PHRASING ARCHITECTURE ───

    {
      id: "ss-7-9",
      time: 8,
      title: "Phrasing Architecture",
      type: "vocal",
      what: "Improvise in structural forms. AABA: sing phrase A, repeat it, sing contrasting B, return to A. Then ABA. Then call-response-develop. Structure from within improvisation.",
      setup: "Guitar. Metronome at 120 BPM.",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "AABA form: improvise a phrase (A) — notice where it lives in the body, what resonance it carries. Repeat it (A) — the body recognizes the phrase, settles into it. Sing something contrasting (B) — different register, different rhythm, different energy. Feel the body shift: if A lived in the chest, let B climb to the mask. Return to A — feel the body come home. 3 cycles.", why: "AABA is the most common song form in popular music. Practicing it in improvisation means your freestyles will naturally develop song-like structures." },
        { text: "ABA form: phrase A, contrasting B, return to A. Tighter structure — the contrast comes earlier and the return feels more immediate. Let the body guide the contrast: A and B should feel like two different physical places. 3 cycles.", why: "ABA is the verse-chorus-verse skeleton. When your improvisation naturally falls into this shape, your songwriting will follow." },
        { text: "Call-Response-Develop: sing a short phrase (call) — plant it in the body. Answer it (response) — let the body echo and adjust. Then extend the answer into something longer and more developed, following where the resonance wants to travel. The development grows from the body's response to the response. 3 cycles.", why: "CRD is how musical ideas grow organically. The call plants a seed, the response waters it, the development lets it bloom. This is how jazz soloists build solos." },
        { text: "Free structural improv: use any form that feels natural. Let the structure emerge from the body's impulses — the desire to return to a familiar resonance (A), the need to shift and explore (B). 3 minutes at psych-rock tempo. Record it.", why: "When structural awareness becomes instinctive, your improvisations sound like compositions. The listener hears form even though you're creating in real time." }
      ],
      feel: "This should feel like telling a story with a beginning, middle, and end — even though you're making it up as you go. The structure gives your improvisation shape.",
      wrong: "If your improvisation has no repetition or contrast, you're not engaging the structural element. Force yourself to repeat phrases. Repetition IS structure.",
      sarah: "Gene, Allah-Las and Mystic Braves use these forms instinctively — their psych-rock songs have clear AABA and ABA shapes. At 120 BPM, your structural instincts have to work fast. That's the challenge.",
      metronome: 120,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true,
      phraseForm: { pattern: "AABA", barsPerSection: 4, labels: { A: "Phrase A", B: "Contrast B" } }
    },

    // ─── VERSE-CHORUS ENERGY ───

    {
      id: "ss-7-10",
      time: 8,
      title: "Verse-Chorus Energy",
      type: "song",
      what: "Strum Am-C (verse: quiet, sparse, intimate) then G-D (chorus: louder, wider intervals, more energy). Practice the energy shift between sections. Pre-songwriting structural awareness.",
      setup: "Guitar. Metronome at 90 BPM.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Verse section: strum Am-C at 90 BPM. Sing quietly, sparse phrases, intimate delivery. Stay in your low-to-mid range (E3-B3) — feel the resonance settle deep in the chest, close and warm. The body is still, the breath shallow. Think storytelling on the porch — conversational, close. 4 bars.", why: "Verses are intimate and understated. They draw the listener in. Quiet dynamics, lower range, and sparse phrasing create the verse energy." },
        { text: "Chorus section: switch to G-D. Open up — louder, wider intervals (reach for D4), more rhythmic energy. Feel the body shift: chest expands, breath deepens, the resonance lifts from the low chest toward the mask. The chorus LIFTS — and the lift is physical, not just musical. The contrast with the verse IS the structure. 4 bars.", why: "Choruses release the energy that verses build. The dynamic and range shift between sections is what makes songs feel like they go somewhere." },
        { text: "Loop: verse (Am-C, 4 bars) → chorus (G-D, 4 bars) → verse → chorus. Feel the body toggle between two states: settled-and-intimate for verse, open-and-expansive for chorus. Make the contrast clearer each cycle. By pass 4, the body-shift should be automatic — you feel the chorus arriving in your chest before the chord change.", why: "Repetition deepens the contrast. Each cycle makes the verse feel more intimate and the chorus feel more expansive. This is how energy dynamics work in real songs." },
        { text: "3-minute freestyle: alternate verse and chorus sections. Let the body lead the transitions — when the chest wants to open, it's chorus time. When the body wants to settle inward, the verse returns. Improvise freely within each section's energy rules. Record it.", why: "When verse-chorus energy shifts become instinctive, your songwriting will have built-in dynamics. You won't need to plan the energy arc — it'll happen naturally." }
      ],
      feel: "The verse should feel like sitting on the porch — body settled, resonance low in the chest, breath shallow and intimate. The chorus should feel like standing up and walking to the edge of the cliff — body opens, breath deepens, resonance lifts toward the mask. The energy shift isn't just volume or range — it's a whole-body transition. Your body tells you when the chorus NEEDS to arrive: there's a physical sensation of building tension in the chest that demands release upward. Listen to that signal.",
      wrong: "If the verse and chorus sound identical in energy, exaggerate the contrast. Whisper the verse. Project the chorus. The difference should be obvious to someone in the next room.",
      sarah: "Gene, Sun Room and Babe Rainbow nail this — quiet intimate verses, bright surf-rock choruses. That energy contrast is in your DNA. This exercise makes it a conscious tool.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      phraseForm: { pattern: "AABB", barsPerSection: 4, labels: { A: "Verse", B: "Chorus" } }
    },

    // ─── RECOVERY ───

    {
      id: "ss-7-11",
      time: 6,
      title: "The Recovery Move",
      type: "vocal",
      what: "Deliberately sing a 'wrong' note (outside the chord tones). Then recover: slide to the nearest chord tone, bend into it, or repeat the clash with confidence until it resolves. Turn mistakes into features. Recovery as a skill.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "Strum Am. Sing a 'wrong' note on purpose — F, or F#, or Bb. Something that clashes with the chord. Hold it. Feel the tension — not just in the sound, but in the body. The clash creates a physical discomfort, a tightness in the throat or a restlessness in the chest. That body response IS your instrument telling you to resolve.", why: "Deliberately singing wrong notes removes the fear of mistakes. When you've chosen to clash, you're in control — and you can learn to resolve the tension." },
        { text: "Recovery move 1 — Slide: from the clash note, slide up or down by half-step until you land on a chord tone. Feel the body release as the note resolves — the tightness softens, the resonance settles into its natural home. The slide turns the 'mistake' into a stylistic choice — like a blues bend.", why: "Sliding from a clash to a resolution is the oldest recovery trick in music. Blues, jazz, and soul singers do this constantly. It sounds intentional, not accidental." },
        { text: "Recovery move 2 — Commit: sing the clash note again, louder, with confidence. Feel the body lean into the dissonance rather than flinching from it. Then resolve — and feel the relief wash through the chest. When you own the clash, it sounds like a deliberate harmonic choice.", why: "Confidence transforms clashes into color. A note isn't 'wrong' if you sing it with intention. This is how jazz musicians think — every note is one step from a resolution." },
        { text: "Free improv: sing normally, but occasionally throw in a deliberate clash and practice recovering. Notice the body's cycle: tension on the clash, release on the resolution. That tension-release is its own embodied drama — it's what makes blues and jazz feel alive. 2 minutes. Record it.", why: "When recovery becomes automatic, mistakes stop being mistakes. They become opportunities. This removes the biggest psychological barrier to free improvisation — fear of wrong notes." }
      ],
      feel: "This should feel liberating — once you know you can recover from any clash, there's nothing to be afraid of. Wrong notes are just notes that haven't resolved yet.",
      wrong: "If you freeze or stop singing when you hear the clash, the recovery instinct isn't built yet. Practice the slide recovery until it's automatic — clash → slide → resolve, no pause.",
      sarah: "Gene, this is the safety net that makes everything else possible. When you know you can recover from any note, you'll take bigger creative risks. And bigger risks lead to more interesting music.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── AUDIATION ───

    {
      id: "ss-7-12",
      time: 6,
      title: "Hear It First, Sing It Second",
      type: "vocal",
      what: "Before singing each note, hear it in your head first. This audiation skill — hearing music in your mind before producing it — is what separates improvising from guessing. It integrates ear training with all your other skills.",
      setup: "Guitar. Metronome at 75 BPM (slower to allow internal hearing).",
      steps: [
        { text: "Strum Am. Close your eyes. Internally 'hear' the note A in your mind — hold that mental pitch for 2 beats. Notice where in your body the vibration lives before the note emerges — throat, chest, behind the forehead? Then sing it. Was it the right pitch? Match it to the guitar.", why: "Audiation (Gordon Stage 6) means pre-hearing activates auditory cortex BEFORE motor cortex — your brain hears the note before your body produces it. Zamorano (2025) found that this body-awareness (interoception) is trainable and predicts musical competence." },
        { text: "Same process with C and E. Hear each note internally for 2 beats, then sing it. Play nothing you didn't hear first. If your internal pitch doesn't match what comes out, play the note on guitar and try again.", why: "The gap between your internal hearing and your actual singing is your 'audiation gap.' CLA research (Gray 2018) shows that constraining output — refusing to produce until you've heard it internally — forces the auditory-cognitive system to lead. Each check closes the gap." },
        { text: "Now try hearing a 2-note phrase internally (e.g., A up to E) before singing it. Internally 'rehearse' the phrase, then sing it out loud. Did it match?", why: "Audiating phrases (not just single notes) is how melodies form before they reach your voice. Aarhus University (2021) found that combined imagery + singing produces equal learning in one-third the time. Songwriters hear the melody internally — the singing is just making it audible." },
        { text: "Free improv at 75 BPM: before each phrase, pause briefly to hear it internally. Sing only what you've already heard in your mind. This will slow you down — that's intentional. Mid-pass check: are you still hearing each note before it arrives, or has autopilot kicked in? If autopilot kicked in — good, you noticed. That moment of noticing IS the rep. The most productive moment in the exercise is the instant you caught yourself producing without hearing first.", why: "Slowing down to audiate forces quality over quantity. The autopilot check is a diagnostic, not a judgment — your brain naturally wants to skip the hearing step and jump straight to producing. Catching that impulse and returning to 'hear it first' is exactly how the skill strengthens. Every phrase has been pre-heard and chosen." }
      ],
      feel: "This exercise should feel meditative and deliberate — the opposite of the free-flowing exercises. You're training the 'inner ear' that guides all future improvisation. The silence before each phrase is not empty — it's where the full hear-feel-choose cycle runs in slow motion: you HEAR the note in your imagination, FEEL where it will resonate in your body before any sound emerges, CHOOSE the emotional intention it carries, then PRODUCE it. The compare step follows: did it match? This slow, conscious version is what becomes the lightning-fast unconscious version in flow.",
      wrong: "If you're singing before hearing the note internally, you're reacting, not audiating. Slow down further. The internal hearing must come FIRST. Play nothing you didn't hear first.",
      sarah: "Gene, this is the secret skill. Every musician you admire — Mark Speer, Angus Stone, the Allah-Las guys — they hear the melody before they play it. The fingers and voice just execute what the inner ear already decided.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── SILENT AUDIATION ───

    {
      id: "ss-7-13",
      time: 6,
      title: "Silent Audiation",
      type: "vocal",
      what: "Strum Am-C-G-Em. Hear an entire 4-bar phrase in your head before singing it. Audiate the full phrase — pitch, rhythm, dynamics, vowels — then execute. Extends earlier audiation work to full phrases.",
      setup: "Guitar. Metronome at 75 BPM (slower to allow full internal hearing).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em over the backing track at 75 BPM. Close your eyes. Listen to one full 4-bar cycle without singing. Internally hear a complete phrase — not just pitches, but rhythm, dynamics, and vowel sounds. The silence IS the exercise. Your brain is composing, rehearsing, choosing — all before any sound leaves your body.", why: "Full-phrase audiation is the highest form of internal hearing. Gordon (Stage 6) shows that pre-hearing activates auditory cortex BEFORE motor cortex. Aarhus (2021) found that combined imagery + singing produces equal learning in one-third the time. You're composing in your mind before producing any sound." },
        { text: "On the next 4-bar cycle, sing exactly what you heard internally. Play nothing you didn't hear first. Did it match? Was the rhythm right? The dynamics? If not, try again — audiate first, then sing.", why: "CLA research (Gray 2018) shows that constraining output forces the auditory-cognitive system to lead. The accuracy of your internal-to-external translation improves with practice. Each attempt closes the gap between imagination and execution." },
        { text: "Alternate: 4 bars of silent audiation, 4 bars of singing what you audiated. The silent bars should feel as musically active as the sung bars — your brain is performing, just silently. During the silent bars, notice where in your body the upcoming phrase is preparing — throat engaging, breath deepening, resonance shifting before any sound.", why: "Silent bars are not rest bars. Zamorano (2025) found that interoception — feeling your body's internal signals — is trainable and predicts musical competence. Your internal musical activity during silence is training the same neural pathways as actual singing." },
        { text: "2-minute freestyle: audiate full phrases before singing them. Let the phrases become more complex — include chord changes, dynamic shifts, vowel choices. All pre-heard, then executed. Mid-pass check: are you still hearing each phrase completely before singing, or has autopilot kicked in and you're just improvising? If autopilot kicked in — good, you noticed. That moment of catching yourself is the most productive moment. Return to full pre-hearing. Record the sung portions.", why: "When full-phrase audiation becomes fluent, your improvisation will sound composed. The autopilot check is a diagnostic: your brain naturally wants to skip the hearing step. Catching that impulse and returning to intentional pre-hearing is exactly how the skill strengthens. Every phrase has been heard internally, evaluated, and chosen." }
      ],
      feel: "This should feel like the meditative core of your practice — quiet, internal, focused. The singing is just the external proof of rich internal musical activity. During the silent bars, the hear-feel-choose cycle is running at full resolution even though no sound emerges: your auditory cortex hears the phrase, your body prepares the resonance shifts (Zamorano 2025 showed these body-preparations are measurable before sound), and your intention shapes the emotional color. The silence before each phrase is not empty — it's where the music lives first, fully embodied and fully chosen.",
      wrong: "If you're singing without audiating first (just improvising freely), you're doing a different exercise. Force yourself to hear the COMPLETE phrase — start to finish — before singing any of it. Play nothing you didn't hear first.",
      sarah: "Gene, this extends your earlier audiation exercises into full phrases — entire musical thoughts heard internally before they leave your mouth. Skinshape territory — quiet, meditative, intentional.",
      metronome: 75,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-14",
      time: 6,
      title: "Sing What You Hear",
      type: "vocal",
      what: "Play a chord progression and let your ear find notes WITHOUT consciously thinking about which chord tones are 'allowed.' Just sing what sounds right. Trust your ear. After all the exercises in Levels 3-5, your ear knows more than you think.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      steps: [
        { text: "Strum Am-C-G-Em slowly. Don't think about chord tones. Just sing whatever note your ear wants to hear next — but hear it first, even if only for a split second. The constraint is subtle: you're not analyzing, but you ARE pre-hearing. If it sounds right, keep going. If it clashes, adjust.", why: "At this point, your ear has absorbed the chord tones through hours of practice. Trusting your ear — singing without conscious analysis — is the shift from 'knowing the theory' to 'feeling the music.' The 'hear it first' constraint (CLA, Gray 2018) keeps the auditory system leading even when you stop thinking in chord names." },
        { text: "When a note clashes, don't panic — slide up or down by a half step until you find a note that fits. This 'search and correct' process IS how ear training works in practice.", why: "Clashes are not failures — they're information. Your ear hears the clash and automatically corrects. Each correction strengthens the ear-voice connection." },
        { text: "Try this with eyes closed. Remove visual reference to the fretboard. Trust only your ear and your voice. If your eyes-closed tools (drone, pitch detector) are active, that's fine — the tension between 'eyes closed' and 'visual feedback' resolves itself: close your eyes to hear internally, glance at the screen only to calibrate, then close again.", why: "Eyes closed removes the temptation to think in finger patterns. You're training pure ear-to-voice connection — the foundation of musical intuition." },
        { text: "3-minute freestyle with eyes closed: strum and sing, ear-guided, no conscious analysis. Mid-pass check: are you still hearing each note a split second before it arrives, or has your voice taken over on autopilot? Both are valid — but noticing which mode you're in is the awareness this exercise builds. Record it. Listen back — you'll be surprised how musical it sounds.", why: "This exercise proves to yourself that your ear has learned the chord tones. The autopilot check isn't about catching yourself doing something wrong — it's about building awareness of whether your auditory system or your motor system is leading. When the ear leads, the music sounds intentional. Aarhus (2021) showed that this kind of combined imagery + production is the fastest path to internalization." }
      ],
      feel: "This should feel like taking the training wheels off. Scary at first, then surprisingly natural. Your ear knows more than your conscious mind — let it lead. This is where the hear-feel-choose cycle becomes truly automatic: you hear what the chord wants, your body shifts to the right resonance position, the emotional intention arises, and the note emerges — all in the space between one strum and the next. You're not running the cycle anymore. The cycle is running you. That's flow.",
      wrong: "If every note clashes, your ear hasn't absorbed the chord tones yet. Go back to Level 3-5 exercises and spend more time with conscious chord-tone improv before trying this ear-only approach.",
      sarah: "Gene, this is the moment where all the Level 3-5 drilling and exploration pays off. Your ear has been quietly learning the whole time. Trust it. Sing what you hear.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── RHYTHM INTEGRATION (from Level 7) ───

    {
      id: "ss-7-15",
      time: 6,
      title: "Rhythmic Call & Response",
      type: "vocal",
      what: "Rhythm-ONLY call and response. Clap a 2-bar rhythm, then sing it back on one pitch (A). The pitch never changes — only the rhythm. This isolates rhythmic audiation without pitch distraction and builds rhythmic memory and reproduction.",
      setup: "Metronome at 80 BPM. No instrument needed.",
      steps: [
        { text: "Clap a simple 2-bar rhythm — maybe 'clap clap... clap-clap clap.' Feel the rhythm in your hands and shoulders. Then immediately sing it back on the note A: 'dah dah... dah-dah dah.' The rhythm transfers from hands to voice, from one body location to another. Match it exactly.", why: "Translating rhythm from hands to voice trains rhythmic audiation — hearing rhythm internally and reproducing it through a different output. This is the same skill used in melodic transcription." },
        { text: "Make the rhythms more complex: add syncopation, rests, and 16th-note bursts. Clap it — feel the pattern in your body as a physical groove. Then sing it back. If you can't sing it back, simplify.", why: "Progressively harder rhythms expand your rhythmic vocabulary. The limit of what you can reproduce is the limit of what you can compose." },
        { text: "Reverse it: sing a 2-bar rhythm on A, then clap it back. Feel how the rhythm originates from a different place — voice-rhythms start in the chest and throat, clap-rhythms start in the shoulders and hands. Going voice-to-hands is a different neural pathway than hands-to-voice.", why: "Bi-directional rhythm transfer proves the pattern is stored internally, not just in one motor pathway. This is deep rhythmic learning." },
        { text: "Partner variation (solo version): record a clapped rhythm, wait 4 beats — hold the rhythm in your body during the silence, feel it pulsing internally — then sing it back while listening to the playback. The recording is your 'partner.'", why: "The 4-beat gap forces you to hold the rhythm in memory — no immediate copying allowed. This builds the rhythmic working memory that songwriting requires." },
        { text: "Try 4-bar rhythms. Clap, then sing back. Longer patterns test your rhythmic memory and force you to chunk patterns into physical phrases — groups of beats that the body recognizes as units.", why: "Four bars is the length of most vocal phrases in songs. If you can audiate and reproduce a 4-bar rhythm, you can learn any vocal rhythm by ear." }
      ],
      feel: "This should feel like a rhythm game — playful, challenging, and satisfying when you nail a complex pattern. The one-note constraint keeps it focused on rhythm alone.",
      wrong: "If you're changing pitch while singing back the rhythm, stop. One note only — A. The moment you add pitch variation, your brain splits attention away from rhythm.",
      sarah: "Gene, this is how musicians with great ears learn songs — they hear the rhythm first, then add pitch. Kodály and Stoloff both use call-and-response as the primary rhythmic training tool.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-16",
      time: 7,
      title: "Harmonic Rhythm Awareness",
      type: "guitar",
      what: "Same Am-C-G-Em progression, three versions: one chord per 2 bars (spacious, desert blues), one chord per bar (standard), and two chords per bar (urgent, driving). Sing the same melody over all three. Harmonic rhythm — how OFTEN chords change — is a compositional tool as powerful as which chords you choose.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Version 1: one chord every 2 bars. Am for 8 beats, C for 8 beats, G for 8 beats, Em for 8 beats. Spacious, hypnotic, desert blues. Feel how the body settles deep into each chord — there's time for the resonance to fully arrive, for the vibration to reach its natural resting place. Sing a simple melody over it.", why: "Slow harmonic rhythm creates space and hypnosis. This is the Tinariwen and Tommy Guerrero approach — let one chord breathe before moving on." },
        { text: "Version 2: one chord per bar. Am (4 beats), C (4 beats), G (4 beats), Em (4 beats). Standard pop/rock timing. The body stays more active — each chord barely settles before the next one arrives. Sing the same melody.", why: "This is the default harmonic rhythm of most songs. It feels balanced — enough change to stay interesting, enough space to settle into each chord." },
        { text: "Version 3: two chords per bar. Am-C (2 beats each), G-Em (2 beats each). Fast, urgent, driving. The body can't settle — the resonance shifts before it lands, creating a restless forward energy. Sing the same melody — it will feel completely different in the body.", why: "Fast harmonic rhythm creates urgency and forward motion. The chords rush past, and the voice has to navigate quickly. This is the feel of bridge sections and build-ups." },
        { text: "Play all three versions back to back without stopping. Feel the shift in your body: spacious and grounded → balanced and walking → urgent and restless. Same chords, same melody, totally different physical experience.", why: "Experiencing the contrast in one continuous pass reveals harmonic rhythm as a compositional lever. You can change the energy of a song without changing a single chord or note." },
        { text: "Pick your favorite version — the one that felt most natural in your body. Spend 3 minutes improvising freely over that harmonic rhythm. Record it.", why: "Your preferred harmonic rhythm reveals your compositional instinct. Desert blues artists prefer slow; punk prefers fast; your sweet spot is probably somewhere in the middle." }
      ],
      feel: "Slow harmonic rhythm should feel like a wide-open landscape. Fast should feel like a sprint. Medium should feel like walking. Your body responds differently to each.",
      wrong: "If all three versions feel the same, you're not letting the chord durations affect your singing. In the slow version, stretch your phrases out. In the fast version, make them punchier.",
      sarah: "Gene, this is why Khruangbin songs feel so spacious — they sit on one chord forever. And why punk feels urgent — chords fly by. You get to choose where your songs live on that spectrum.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-7-17",
      time: 6,
      title: "Genre Rhythm Transcription",
      type: "rhythm",
      what: "Listen to a backing track. Don't play along yet. Clap or tap the vocal rhythm you IMAGINE over it — the rhythm a singer would use. Then sing it on one note. Then add chord tones. Rhythm-first composition: the groove suggests the vocal rhythm before any melody.",
      setup: "Backing track ready. No instrument for the first two rounds.",
      steps: [
        { text: "Play the Desert Blues track. Just listen for 30 seconds. Don't tap, don't hum. Let the groove sink in through the body — feel where it lands in your feet, your chest, your shoulders. Where does the groove want a voice to enter?", why: "Active listening before playing trains your musical imagination. The groove has a built-in suggestion for where vocals belong — you just need to hear it." },
        { text: "Now clap or tap the vocal rhythm you hear in your head. Not the drum pattern — the rhythm a SINGER would use over this groove. Feel it in your hands and chest before committing. Tap it out for 4 bars.", why: "Tapping an imagined vocal rhythm is rhythmic audiation at its purest. You're composing rhythm before sound — which is exactly how great songwriters work." },
        { text: "Sing your tapped rhythm on one note (A). The rhythm transfers from hands to voice — feel it migrate from the shoulders to the chest and throat. Does it feel natural in the body over the groove? Adjust if needed.", why: "Translating from hands to voice tests whether the rhythm works vocally. Some rhythms feel great to tap but awkward to sing — this step filters for singable rhythms." },
        { text: "Now add chord tones: sing your rhythm, but vary the pitch using A, C, E (Am chord tones). Feel how each pitch gives the rhythm a different weight — A grounds it in the chest, C adds ache in the throat, E lifts it toward the mask. The rhythm stays the same; pitch adds color and body.", why: "Adding pitch to an established rhythm is melody writing. You've composed the rhythm first, then decorated it with pitch — the professional approach." },
        { text: "Record your final version. You've just composed a vocal line rhythm-first — the way Khruangbin, Skinshape, and most groove-based artists actually write.", why: "This rhythm-first process is the opposite of how most beginners write (melody first, then try to fit it to a groove). Starting with rhythm guarantees your vocal line grooves." }
      ],
      feel: "This should feel like the groove is telling you where to sing. You're not imposing a melody on the track — you're discovering the melody that's already hidden in the rhythm.",
      wrong: "If you're clapping the drum pattern instead of an imagined vocal rhythm, reset. The drum pattern already exists — you're creating something new that complements it.",
      sarah: "Gene, this is how groove-based music is actually written. The beat comes first, and the vocal rhythm emerges from it. Your desert blues and reggae playlists were all made this way.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      recorder: true
    },

    // ─── BRIDGING EXERCISES ───

    {
      id: "ss-7-18",
      time: 8,
      title: "Genre Feel Diagnostic",
      type: "song",
      what: "Play a 2-minute freestyle over each of 3 backing tracks (reggae, surf, desert blues). Don't plan — just play. Which genre does your integrated playing naturally gravitate toward? Which feels most like home? This self-knowledge becomes your songwriting compass. Your default genre IS your artistic identity emerging.",
      setup: "Guitar. Three backing tracks queued up. Recorder on from the start.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      steps: [
        { text: "Round 1 — Reggae: play the Reggae One Drop track. Strum and sing freely for 2 minutes. Don't try to be 'reggae' — just play naturally over the groove. Notice how the body responds: does the reggae groove settle you low, relax the shoulders, slow the breath? Let the track guide you.", why: "Your natural response to a genre groove reveals your instincts. When you're not trying to play a genre, what comes out IS your authentic voice in that genre." },
        { text: "Round 2 — Surf: play the Surf Rock track. Same deal — 2 minutes of freestyle. Notice how the faster, brighter groove changes your body — does the energy lift, the resonance brighten, the breath quicken? Does your strumming and phrasing shift with the body's response?", why: "Different tempos and feels pull different things from your voice. The contrast between your reggae and surf responses reveals where your natural tendencies live." },
        { text: "Round 3 — Desert Blues: play the Desert Blues track. 2 minutes. This is the slowest, sparsest groove. Does the body go still and meditative? Does your voice go sparse and hypnotic, or does it fight the space?", why: "Desert blues demands restraint. How comfortable you are with space and repetition tells you a lot about your compositional instincts." },
        { text: "Listen to all three recordings. Which one sounds most like YOU — not performing a genre, but naturally inhabiting it? Which genre did the body settle into most easily? That's your home genre. Which surprised you?", why: "Your home genre is where your songwriting will be most authentic. Knowing it consciously means you can lean into it when writing and step outside it when you want creative growth." },
        { text: "Spend 2 more minutes in your home genre. This time, pay attention to the body: which skills feel most physically natural — the rhythm in your hands, the dynamic shifts in your chest, the vowel shapes in your mouth, the phrasing in your breath? Your strongest dimension in your home genre is your artistic signature.", why: "Your artistic identity is the intersection of your home genre and your strongest expressive dimension. Knowing both gives you a compass for everything that follows." }
      ],
      feel: "One of these three genres should feel like putting on your favorite shirt — comfortable, natural, YOU. The others might feel fun but slightly borrowed. That difference is important information.",
      wrong: "If all three feel identical, you're not responding to the groove — you're playing the same thing over everything. Let each backing track CHANGE your approach.",
      sarah: "Gene, your playlists already tell me your home genre is somewhere in the reggae-surf-desert triangle. But hearing it from your own playing — not just your listening — confirms it. This diagnostic becomes your songwriting compass.",
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-19",
      time: 8,
      title: "Integration Self-Assessment",
      type: "song",
      what: "Record a 3-minute freestyle: strum and sing freely with all your Level 3-6 skills. Then listen back with the structured protocol: (1) overall feel — does this sound like you? (2) pitch — are note arrivals accurate? (3) timing — behind the beat or rushing? (4) expression — dynamics, vowels, silence, emotional range? Rate yourself. Identify your strongest and weakest dimension.",
      setup: "Guitar. Backing track. Recorder on from the start.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Record a 3-minute freestyle: strum and sing over the backing track. Use everything — chord navigation, dynamics, emotional color, vowels, rhythm, space. Don't perform for the recording. Just play.", why: "The recording must capture your natural playing, not a self-conscious performance. The assessment only works if it reflects your actual level." },
        { text: "Listen back — Pass 1, OVERALL FEEL: does this sound like you? Does it sound like music you'd want to listen to? Rate it 1-10 on 'this sounds like me.'", why: "The gut check comes first. Your overall impression captures quality more holistically than any technical measure." },
        { text: "Listen back — Pass 2, PITCH: are your note arrivals accurate? Do you drift sharp or flat on longer notes? Are there specific chord changes where you lose the pitch?", why: "Pitch accuracy is nearly impossible to self-assess while playing. The recording bypasses your brain's auto-correction and reveals the truth." },
        { text: "Listen back — Pass 3, TIMING: are you behind the beat (laid-back, good for reggae), on it, or rushing? Is timing consistent or does it vary with difficulty?", why: "Timing is the other dimension your brain distorts during performance. The recording reveals whether you're in the pocket or drifting." },
        { text: "Listen back — Pass 4, EXPRESSION: dynamics (loud/soft contrast?), vowel variety, emotional color, use of silence. Is there expressive range, or does it stay flat?", why: "Expression is where good becomes great. Rating your expressiveness teaches you to prioritize the dimensions that make listeners lean in." },
        { text: "Write down your scores. Identify your strongest dimension (highest score) and weakest (lowest). Your strongest is your signature. Your weakest is your growth edge for Level 7.", why: "Self-assessment with a structured protocol turns subjective 'how'd that go?' into actionable data. Your strongest dimension is what you lead with. Your weakest is what you practice." }
      ],
      feel: "The freestyle should feel natural and free. The listen-back should feel like being your own teacher — honest, specific, constructive.",
      wrong: "If you skip the structured listen-back and just vibe to the recording, you're missing the exercise. Each pass focuses on ONE dimension. That discipline reveals things casual listening misses.",
      sarah: "Gene, this is the self-coaching protocol that professional vocal coaches use. Record, listen, assess, adjust. You're building the skill of honest self-evaluation — one of the most valuable tools a solo musician can have.",
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── GRADUATION ───

    {
      id: "ss-7-20",
      time: 10,
      title: "Genre Freestyle Round",
      type: "song",
      what: "Three 3-minute freestyles back to back, each in a different genre feel: reggae, surf, and soul. Same chord tones, same voice — different strum patterns, different backing tracks, different vocal instincts. Full integration across your three core genres.",
      setup: "Guitar. Three backing tracks queued up.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Ska Upbeat 95", src: "/ska-upbeat-95.mp3" },
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" },
        { name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }
      ],
      steps: [
        { text: "Round 1 — Reggae: offbeat chop, Am-C-G, 85 BPM. Let the reggae groove settle into your body — shoulders drop, weight sinks, the resonance pools low and warm. Vocal style: laid-back, choppy phrases, lots of space. All skills: dynamics, emotion, vowels, chord navigation. 3 minutes, record.", why: "Reggae is your comfort zone — start here to warm up. But now integrate everything: dynamic shifts, emotional color, vowel variety, rhythmic play. Not just reggae phrasing — full expression." },
        { text: "Round 2 — Surf: jangle strum, G-Em-C-D, 120 BPM. Feel the body shift — lighter, more buoyant, the resonance lifting from the belly toward the mask. Vocal style: breathy, flowing, riding the shimmer. Suppress vibrato. Keep your voice at mezzo-piano — quieter than the guitar. Float behind the beat. Your voice sits INSIDE the guitar reverb, not on top of it — this is the surf-psych vocal float from Vocal Level 8 (v8e4). 3 minutes, record.", why: "Surf is faster — your skills must work at a higher tempo while maintaining quality. If any skill drops out at 120 BPM, it's not fully automated yet." },
        { text: "Round 3 — Soul: fingerpicked Am-Dm-G-C, 80 BPM. The body shifts again — grounded but rhythmically alive, the groove pulsing in the chest and hands simultaneously. Vocal style: warm, groove-locked, rhythmic. Include the Dm chord (with F — feel it darken the throat). 3 minutes, record.", why: "Soul demands the most rhythmic precision. Three genres back-to-back proves your voice can shift context while maintaining full integration." },
        { text: "Listen to all three recordings. Can you hear how your voice becomes three different singers? Each genre lived in a different body — different posture, different breath, different resonance. That body-shifting IS improvisation fluency.", why: "Genre-shifting is the ultimate proof of fluency. You're not imitating — you're responding to context with your full skill set." }
      ],
      feel: "Each genre should feel like a different world — same singer, different energy, different phrasing, different emotional color. By the end, you should feel warmed up and loose.",
      wrong: "If all three rounds sound the same regardless of genre, you're not responding to the strum pattern and backing track. Let the groove dictate your approach.",
      sarah: "Gene, this is your psych-surf-reggae triangle in action. These three feels ARE your musical identity. When your voice can shift fluently between them, you can write songs in any of your genres.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-21",
      time: 10,
      title: "5-Minute Freestyle",
      type: "song",
      what: "The graduation test. Choose any backing track, any chord progression, any genre feel. Strum and sing freely for 5 minutes without stopping. Every skill from Levels 3-6 integrated into one sustained performance. This is the fluency proof.",
      setup: "Guitar. Choose your backing track and chord progression. This is YOUR choice — pick what feels best.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" },
        { name: "Afrobeat 100", src: "/afrobeat-100.mp3" },
        { name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }
      ],
      steps: [
        { text: "Choose a backing track and a chord progression you love. Set the metronome. Start strumming. Take 8 bars of just guitar to let the groove enter your body — feet, chest, hands, breath. Lock in before the voice enters.", why: "Choosing your own context is the first act of creative autonomy. You're not following instructions anymore — you're making musical decisions." },
        { text: "Begin singing. Use everything: pitch exploration, rhythmic play, genre feel, emotional color, dynamics, vowel shapes, audiation, chord navigation. Let attention rest in the body rather than the head — feel the vibration traveling, the resonance shifting, the breath shaping each phrase. Let it all flow.", why: "Five minutes is long enough for a full journey — quiet moments, intense moments, sparse moments, flowing moments. You're not performing. You're exploring." },
        { text: "If you hit a wall (everyone does around minute 2-3), simplify. One note, one rhythm. Hold a single pitch for 4 bars and feel where it lives in your body. Let the stillness become a foundation. Then let the next idea emerge from that quiet physical place.", why: "The wall is where most people stop. Pushing through it — even with a single sustained note — is how you reach the deeper creative space on the other side." },
        { text: "Keep going for the full 5 minutes. Don't monitor, don't judge — just be present in the body, making sound. Record everything. Listen back. Notice: where did the cycle disappear into flow? Where did you surprise yourself?", why: "Five minutes of sustained integrated improvisation is the fluency proof. When this feels natural — when you lose track of time — you're ready to compose songs." }
      ],
      feel: "By minute three, you should stop thinking about skills and start feeling the music. Everything becomes automatic. The hear-feel-choose cycle is no longer a practice — it's dissolved into presence. You hear the chord change, your body shifts, an emotion arises, a note emerges, and you're already on to the next moment. That automaticity IS flow. That's fluency. The cycle started as five conscious steps. Now it's one continuous act.",
      wrong: "If you can't sustain 5 minutes without the strum breaking down or the voice going silent for more than 8 beats, revisit the specific skill that's weakest.",
      sarah: "Gene, this is the real graduation. Five minutes of free vocal improvisation over your own guitar with every tool at your disposal. When this feels like breathing — natural, effortless, inevitable — you're ready to channel that flow into songs. Everything from Level 7 onward builds on this moment.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── KEY DIVERSITY — FULL INTEGRATION ACROSS KEY FAMILIES ───

    {
      id: "ss-7-22",
      time: 7,
      title: "Dm Color Introduction",
      type: "vocal",
      what: "Dm is the first chord that doesn't appear in your standard Am-C-G-Em set. Strum Am-Dm-Am-Em and feel how Dm adds a new emotional dimension — darker than Am, more restless, wanting to move. In soul music, Dm is the chord that adds depth and longing to minor-key grooves.",
      setup: "Guitar. Metronome at 80 BPM. Dm chord: index on 1st fret high E, middle on 2nd fret G, ring on 3rd fret B. Open D string rings.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-Dm-Am-Em at 80 BPM. Just guitar first — get the Am to Dm transition smooth. When Dm arrives, feel the harmonic shift in the body: something darkens, the resonance drops slightly, a weight enters the chest that Am doesn't carry.", why: "Dm highlights F in a chord context — you've sung F as a melodic tension note in L4, but hearing it as part of a chord (D-F-A) gives it new harmonic weight. F in Dm creates a darker, more soulful color than anything in Am-C-G-Em." },
        { text: "Sing chord tones: A-C-E over Am, D-F-A over Dm, A-C-E over Am, E-G-B over Em. When you sing F over Dm, notice where it lives — lower in the throat than C, carrying a distinctive ache. That body signature IS the Dm color.", why: "F is the 'soul' note in this context. It's what makes the Dm chord sound like Marvin Gaye, like Khruangbin's slower grooves, like the warm side of minor-key music." },
        { text: "Improvise over Am-Dm-Am-Em using all your pentatonic vocabulary plus the new F note. When Dm arrives, lean into F and D — feel the body darken. When Am returns, feel the release as you resolve to A. 3 minutes, record.", why: "Adding one new chord and one new emphasized note to a familiar context is the gentlest form of harmonic expansion. The progression still feels like home, but with a new room." },
        { text: "Try Am-Dm-G-C — a different progression using Dm. Feel how Dm to G creates a beautiful lift in the body — the darkness in the throat opens into brightness in the chest. Improvise over this for 2 minutes.", why: "Dm functions differently depending on what follows it. Dm→Am = circular return. Dm→G = dramatic lift. Understanding chord-to-chord color is songwriting intelligence." }
      ],
      feel: "Dm should feel like a shadow passing over the sun — darker, more mysterious, but still warm. When it resolves back to Am or lifts to G, the release is satisfying.",
      wrong: "If Dm sounds the same as Am to your ear, focus on the F note. Sing D-F-A slowly against the Dm chord and really hear how F gives Dm its unique character.",
      sarah: "Gene, Dm is the chord that turns a simple Am groove into something soulful and deep. Think Khruangbin's 'Maria También' or any classic soul ballad — Dm is doing the emotional heavy lifting.",
      referencePitches: getPitchRange("D3", "D4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-7-23",
      time: 8,
      title: "A Major Reggae Integration",
      type: "vocal",
      what: "Full integration improv in A major — a genuinely different key family. Strum A-D-E (I-IV-V in A major) with a reggae offbeat chop. All your skills from Levels 3-5 — dynamics, emotion, vowels, space, genre feel — applied in a key with sharps. A major is the classic reggae/roots key. C# and F# give it a warm, bright character completely unlike Am.",
      setup: "Guitar. A-D-E with reggae offbeat chop (strum on the 'and' of each beat).",
      tracks: [{ name: "A Major Reggae 85", src: "/a-major-reggae-85.mp3" }],
      steps: [
        { text: "Strum A-D-E with reggae chop. Sing A major pentatonic: A-B-C#-E-F#. Feel how C# sits differently in the body than C natural did — brighter, more forward in the mask, carrying warmth rather than ache. The whole body brightens in a major key.", why: "A major shares the ROOT (A) with Am but has completely different color notes. C# replaces C, F# replaces the absent F. It's the same home note in a completely different emotional house." },
        { text: "Apply genre feel: behind-the-beat phrasing over the reggae groove. Let the body settle into the laid-back reggae pocket — shoulders loose, breath slow, the voice lagging slightly behind the strum. Reggae vocals are NEVER ahead of the beat.", why: "Genre-specific timing in a new key proves the skill is transferable. You learned behind-the-beat phrasing in Am reggae exercises — now apply it to A major." },
        { text: "Dynamics: start quiet and intimate — feel the sound as a private warmth in the chest. Then build to full voice, the resonance expanding outward. Use space — leave 2-bar gaps. Let the reggae groove breathe and the body rest between phrases.", why: "Full integration means ALL skills simultaneously in a new key. If dynamics or space disappear when you focus on the new notes, those skills aren't automated yet." },
        { text: "5-minute freestyle over A-D-E reggae. Let the body drive — when the hear-feel-choose cycle runs automatically in a new key, that's real musicianship. Record it.", why: "Five minutes in A major with full skill integration is the proof that your musicianship is key-independent, not Am-dependent." }
      ],
      feel: "A major reggae should feel warm, bright, and laid-back — like a sunset beach session. The reggae groove provides the pocket; A major provides the sunshine.",
      wrong: "If you keep singing C natural instead of C#, your Am muscle memory is overriding the new key. Use the backing track as a guide — C natural will clash audibly with the A major harmony.",
      sarah: "Gene, this is Bob Marley territory. This is Sublime. A major is where reggae lives when it's feeling optimistic. Your voice in this key, with this groove, is a whole new sound.",
      referencePitches: getPitchRange("A3", "F#4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-24",
      time: 8,
      title: "E Major Surf Integration",
      type: "vocal",
      what: "Full integration improv in E major — the surf rock key. Strum E-A-B7 with a jangly surf strum pattern. All your skills flowing in the key of Dick Dale, the Beach Boys, and the bright side of Allah-Las. Ab (G# on the fretboard) and C# are now part of your active vocabulary.",
      setup: "Guitar. E-A-B7 with jangly surf strum (down-up-down-up, emphasis on downbeats).",
      tracks: [{ name: "E Major Surf 120", src: "/e-major-surf-120.mp3" }],
      steps: [
        { text: "Strum E-A-B7 with surf energy at 120 BPM. Sing E major pentatonic (E-F#-Ab-B-C#) freely. The tempo is faster than your Am exercises — surf rock moves. Let the energy carry your voice.", why: "Higher tempo in a new key is a double challenge. If your voice keeps up, both the key schema and the tempo schema are working." },
        { text: "Use bright vowels — 'ee', 'ay', 'oh'. Surf-rock vocals are open and forward. No dark, closed 'oo' sounds. Let E major's brightness guide your vowel choices.", why: "Vowel choice should match the key's character. Major keys + fast tempo = open, bright vowels. This is genre intelligence applied to a new key." },
        { text: "Dynamics: surf rock uses dynamics differently than reggae. Build to the B7 chord (tension), release on E (resolution). Let the dynamic arc follow the harmonic tension.", why: "Pairing dynamics with harmonic function (loud on tension, release on resolution) is sophisticated integration. In E major, B7→E is the tension→release point." },
        { text: "4-minute freestyle over E-A-B7. Record it. Compare to your Am Desert Blues and A Major Reggae — three completely different musical identities, all yours.", why: "Three key families, three genres, three emotional palettes. Your voice is becoming a multi-dimensional instrument." }
      ],
      feel: "E major surf should feel bright, driving, and exhilarating — like catching a wave. The tempo pushes you forward; the key lifts you up.",
      wrong: "If 120 BPM feels too fast for singing, drop to 100 BPM. The surf strum can be relaxed too — think Allah-Las mid-tempo, not Dick Dale shred.",
      sarah: "Gene, this is the sound of your playlists coming through your own voice. E major at surf tempo is where Allah-Las and BALTHVS live. You're not just listening anymore — you're inside the music.",
      referencePitches: getPitchRange("E3", "C#4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-7-25",
      time: 10,
      title: "Four-Key Freestyle",
      type: "song",
      what: "The ultimate integration test. Four key centers, 2 minutes each, continuous flow: Am-C-G-Em (minor home) → G-C-D (major) → E-A-B7 (surf) → A-D-E (reggae). All skills, all keys, no stopping. This is what key-independent musicianship sounds like — the ability to make music in any harmonic context with equal fluency.",
      setup: "Guitar. Drums-only track for key-agnostic rhythm support. Plan your chord progression order before starting.",
      tracks: [
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" },
        { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }
      ],
      steps: [
        { text: "2 minutes: Am-C-G-Em. Your comfort zone. Let the body settle into its familiar home — the resonance patterns you know, the vibrations you've mapped. Warm up with all your skills flowing. This is home.", why: "Starting in your strongest key builds confidence and establishes the musical flow state before you venture into newer territory." },
        { text: "2 minutes: G-C-D. Shift to major. Feel the brightness change in the body — the chest opens, the resonance lifts, the vowels want to widen. Let the key change your singing from the inside out.", why: "G major is your first 'step outside' — same note family but different emotional center. The transition should feel like sunrise." },
        { text: "2 minutes: E-A-B7. New key family. Ab, C#, F# enter your vocabulary. Surf energy. Feel how the body shifts again — faster, brighter, the resonance more forward in the mask. The contrast with the Am section should be dramatic and physical.", why: "E major is the biggest jump — genuinely different notes, different vocal production. The contextual interference here is maximum." },
        { text: "2 minutes: A-D-E. Another new-family key. Reggae groove. Close your eyes and feel the body transition from surf energy to roots warmth — the shoulders drop, the breath slows, the resonance pools back into the chest.", why: "Ending with A major reggae brings the energy down from surf-rock intensity while staying in the sharp-key family. The journey is: home → bright → electric → warm." },
        { text: "Listen to the full 8-minute recording. Note where the transitions were smooth and where they were rough. The rough spots are your practice targets.", why: "The four-key freestyle is both a performance piece and a diagnostic tool. Smooth transitions = key independence. Rough transitions = where more interleaved practice is needed." }
      ],
      feel: "Each 2-minute section should have its own personality — the keys demand it. But there should be a thread of YOU running through all four. Your phrasing, your timing, your emotional instinct.",
      wrong: "If you freeze at the key transitions, that's normal. Keep the guitar going and sing the root of the new key until you find your footing. The strum must never stop.",
      sarah: "Gene, eight minutes across four key families with every skill you've built. This is the proof that your musicianship isn't locked into Am — it's portable, flexible, and genuinely yours.",
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true,
      levelUp: "Can sustain 5 minutes of fully integrated vocal improvisation over a backing track while strumming — varied rhythm, dynamics, emotional color, vowel shapes, chord-tone navigation, and genre-specific micro-timing — across multiple genre feels without stopping or losing the groove. Can identify your default genre instinct, self-assess using structured recording protocol, use harmonic rhythm and genre rhythm transcription as creative tools, improvise fluently in Dm, A major, and E major contexts, and navigate continuous multi-key freestyle across four different key families with all skills integrated."
    }
  ]
};
