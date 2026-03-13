import { getPitchRange } from "../appData.js";

export const level5 = {
  level: 5,
  title: "Voice Flows",
  subtitle: "Everything at once. Trust the process. Trust your ear.",
  description:
    "Level 3 isolated skills. Level 4 combined them in pairs. Now everything flows together: pitch, rhythm, dynamics, emotion, vowels, chord changes, genre feel — all at once, across multiple genres and progressions. This is full integration. Based on Csikszentmihalyi's flow research: flow states emerge when all sub-skills are automated and the challenge matches your ability. You've built the automation. Now find the flow.",
  artists: "Khruangbin, DOPE LEMON, Allah-Las, Tinariwen, Hermanos Gutiérrez, Skinshape",
  unlocks: "Creating Your First Songs (Level 6)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["ss-4-5", "ss-4-14"], prompt: "Do rhythmic chord navigation over Am-C-G-Em (ss-4-5). Then play through a Two-Skill Freestyle round (ss-4-14). Both fluid without strum breaks? Move on." },
  exercises: [

    // ─── NEW: TRIPLE-SKILL BRIDGE ───

    {
      id: "ss-5-1",
      time: 8,
      title: "Triple-Skill Fusion",
      type: "vocal",
      what: "Bridge exercise: combine THREE skills at once (not two like Level 4, not everything like the rest of Level 5). Three 2-min rounds. Round 1: rhythm + dynamics + chord changes. Round 2: emotional color + vowels + genre feel. Round 3: breath phrasing + audiation + space.",
      setup: "Guitar. Metronome at 85 BPM.",
      tracks: [
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      steps: [
        { text: "Round 1 — Rhythm + Dynamics + Chord Changes: strum Am-C-G-Em at 85 BPM. Sing chord tones with varied rhythms AND varied dynamics while navigating the changes. Three variables at once. 2 minutes over the groove beat.", why: "Three skills is the cognitive sweet spot between Level 4's pairs and Level 5's full integration. Your brain learns to manage three variables before being asked to manage everything." },
        { text: "Round 2 — Emotional Color + Vowels + Genre Feel: switch to the reggae backing. Strum Am-C with reggae chop. Match emotional color to each chord, choose vowels deliberately, and stay in the reggae pocket. Three expressive variables. 2 minutes.", why: "This triple combines three 'feel' variables — emotion, vowel, and genre. They reinforce each other: reggae feel suggests certain vowels and emotional textures." },
        { text: "Round 3 — Breath Phrasing + Audiation + Space: no backing track. Strum Am-C-G-Em quietly. Hear each phrase internally before singing it (audiation), let each phrase be one breath long (breath phrasing), and leave at least 2 bars of silence between phrases (space). 2 minutes.", why: "This triple combines three 'internal' skills — breath control, inner hearing, and restraint. These are the meditative, contemplative side of improvisation." },
        { text: "Reflect: which round felt most natural? Which felt most challenging? The challenging one reveals which skill combination needs more practice.", why: "Self-assessment identifies your weakest skill intersection. The strongest round shows where your natural abilities lie — useful intel for songwriting." }
      ],
      feel: "Each round should feel like Level 4 with one more ball to juggle. Challenging but not overwhelming. If it feels impossible, one of the three skills isn't automated yet.",
      wrong: "If you can only manage two of the three skills in each round, go back to the relevant Level 4 exercise and solidify the pair before adding the third.",
      sarah: "Gene, this is the stepping stone between Level 4 and the rest of Level 5. Three skills is the bridge — it smooths the jump from combining pairs to integrating everything.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── FULL-INTEGRATION IMPROV ───

    {
      id: "ss-5-2",
      time: 8,
      title: "Full Progression Improv",
      type: "vocal",
      what: "All skills, all at once. Strum Am-C-G-Em and freely improvise using every tool from Levels 3-4: varied rhythm, dynamics, emotional color, vowel shapes, chord-tone navigation, and space. No constraints. Just play.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em. Sing chord tones freely. But now consciously engage EVERYTHING: vary your rhythm (ss-3-7), shift dynamics (ss-3-15), change emotional color with each chord (ss-4-9), shape your vowels (ss-3-12). All of it, flowing.", why: "Full integration is the final stage of motor learning. When all sub-skills are automated, they can operate simultaneously. The conscious mind is free to be creative." },
        { text: "Let the music breathe. Leave 2-4 bars of silence periodically. When you re-enter, come in with a different energy than when you left. Space is a skill too.", why: "Strategic silence is what separates masterful improvisation from nervous noodling. The pause resets your creative state and lets the next idea emerge fresh." },
        { text: "Try one pass where you focus on very sparse, minimal singing — 3-4 notes per bar maximum. Then one pass where you're more active — filling the bars. Both are valid musical choices.", why: "Density control — choosing how much to sing — is a compositional decision. Building fluency at both sparse and dense extremes gives you the full range." },
        { text: "5-minute freestyle. Record the whole thing. Don't stop, don't restart. Whatever happens is the music.", why: "Five uninterrupted minutes of integrated improvisation is the fluency milestone. If you can sustain this, every skill is working together." }
      ],
      feel: "This should feel like the moment when driving a car becomes automatic — you're not thinking about the pedals, the mirrors, the steering. You're just going somewhere.",
      wrong: "If you notice one skill disappearing (e.g., dynamics go flat, or you stop navigating chord tones), it means that skill isn't automated yet. Go back to its Level 3 or 4 exercise.",
      sarah: "Gene, this is what every exercise has been building toward. Your voice and guitar as one instrument. All the individual skills fused into flow. Let it happen.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-3",
      time: 8,
      title: "Major Key Flow",
      type: "vocal",
      drone: { mode: "cycle", progression: ["G", "C", "D", "G"], bpm: 85, stepDuration: "1m" },
      what: "Switch to a major-key progression: G-C-D. All three chords are major — brighter, more resolved, more 'sunny.' Integrate all your skills in this new harmonic context. D chord introduces F# — your first sharp.",
      setup: "Guitar. Metronome at 85 BPM. G (4 beats) → C (4 beats) → D (4 beats) → G (4 beats).",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Strum G-C-D-G. Sing chord tones for each: G(G-B-D), C(C-E-G), D(D-F#-A), back to G. Notice how the major-only progression feels brighter and more forward-moving than Am-C-G-Em.", why: "Major progressions want different things from your voice — wider intervals, more confident phrasing, more rhythmic drive. Let the chords guide your instincts." },
        { text: "Pay attention to D chord: it contains F# — the only sharp in the progression. When D comes around, your voice must navigate to F# or avoid it. Both are valid choices.", why: "F# is the 'leading tone' that pulls the progression back to G. Singing it creates forward momentum. Avoiding it keeps things floating. Both are musical tools." },
        { text: "Engage all your expressive tools: dynamics that build over the progression, emotional shifts with each chord (G=bright, C=warm, D=forward), vowel variety, rhythmic play.", why: "Applying your full skill set to a new harmonic context proves the skills are transferable — not just tricks that work over Am-C-G-Em." },
        { text: "Free improv over G-C-D-G for 4 minutes. This is surf-rock territory — let it feel bright and driving. Record it.", why: "Different progressions evoke different moods and vocal instincts. Building fluency across both minor-centered and major-centered progressions doubles your songwriting vocabulary." }
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
      id: "ss-5-4",
      time: 8,
      title: "Desert Blues Flow",
      type: "song",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "Full integration in the desert blues context. Sparse, repetitive, hypnotic — the same small melodic ideas repeated with subtle variation. All your skills applied to the aesthetic of less-is-more. Think Tinariwen, Ali Farka Touré, Bombino.",
      setup: "Guitar. Strum Am with a sparse, repetitive pattern. Let the backing track carry the groove.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am with a sparse pattern. Sing A and E only (root and 5th). Repeat a simple 2-note phrase with micro-variations each time. Same phrase, gently evolving. 2 minutes.", why: "Repetition with micro-variation is the core of desert blues melody. It's meditative rather than developmental. Each repetition is slightly different — it creates a trance." },
        { text: "Add C (the minor 3rd) sparingly. Use it as a rare color. Apply your dynamics skill: the desert is quiet, then a gust of wind (crescendo), then quiet again.", why: "Scarcity creates value. Dynamic variation adds drama to the repetition without adding complexity. The interplay between sparse melody and dynamic shape IS desert blues." },
        { text: "Shift your vowel to match the mood: 'ahh' for open desert expanse, 'ooh' for intimate campfire moments. Let vowel choices follow the emotional arc.", why: "In desert blues, every element serves the atmosphere. Vowel choice is part of the production — not just 'what comes out.'" },
        { text: "3-minute freestyle: all skills integrated in the desert blues zone. Sparse, hypnotic, meditative. Resist the urge to add complexity. Record it.", why: "The discipline of simplicity with full expressive control is the hardest skill. Anyone can be complex. Simplicity with depth requires mastery." }
      ],
      feel: "This should feel like sitting around a campfire in the Sahara — the heat, the stars, the endless horizon. The music doesn't go anywhere. It just exists.",
      wrong: "If your improvisation sounds busy or like it's 'going somewhere,' you've missed the desert blues aesthetic. Strip away. Fewer notes. More repetition. More space.",
      sarah: "Gene, Tinariwen is in your top rotation. Hermanos Gutiérrez lives in this same sonic space. This is where your cinematic, sparse side comes out — let the emptiness speak.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── NEW: DUB REGGAE FLOW ───

    {
      id: "ss-5-5",
      time: 8,
      title: "Dub Reggae Flow",
      type: "song",
      what: "Full integration over dub reggae backing track. Heavy space, echo-like vocal repetitions, sparse chord tones with delay-style re-attacks. Voice as texture, not melody. Dub is about what's NOT there.",
      setup: "Guitar. Reggae offbeat chop over Am-C. Let the dub backing track carry the vibe.",
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Start the dub backing track. Strum Am-C with a loose reggae chop. Sing sparse chord tones — one note every 2-4 bars. Let the note hang in the space. Think of your voice as a dub echo.", why: "Dub reggae treats vocals as texture, not melody. Your voice is one element in a spacious mix — appearing, echoing, disappearing. This is the most restrained genre integration exercise." },
        { text: "Try echo-style repetitions: sing a note, then repeat it softer (like a delay effect). A... a... a... Each repetition quieter than the last. Your voice IS the echo.", why: "Simulating delay with your dynamics creates a dub texture using only your voice. This trains extremely fine dynamic control at the quiet end of your range." },
        { text: "Leave at least 4 bars of silence between vocal entries. The backing track and guitar fill the space. When you do sing, it should feel like an event — rare and meaningful.", why: "Dub teaches maximum restraint. When you can resist the urge to sing for 4+ bars, every note you DO sing carries enormous weight." },
        { text: "3-minute freestyle: voice as dub texture over the backing. Sparse, spacious, echo-like. All your skills applied to the art of almost-not-singing. Record it.", why: "Dub integration proves you can apply full skill integration in a context that demands near-silence. This is the opposite of busy improv — and equally valuable." }
      ],
      feel: "This should feel like floating in warm water — your voice surfaces occasionally, then sinks back. The space is the music. You're adding seasoning, not the main dish.",
      wrong: "If you're singing too much or too melodically, you've missed the dub aesthetic. Fewer notes. More space. Voice as texture, not melody.",
      sarah: "Gene, Pepper and Slightly Stoopid's dub side lives here — space, echo, groove. Your voice becomes part of the production, not the star. Let the backing track breathe.",
      metronome: 85,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-5-6",
      time: 8,
      title: "Soul Groove Flow",
      type: "song",
      drone: { mode: "cycle", preset: "desert-blues" },
      what: "Full integration over a new chord set: Am-Dm-G-C. Soul music is rhythmic, warm, and groove-locked. Dm introduces a new note (F) you haven't improvised with. All skills applied to the soul-funk aesthetic.",
      setup: "Guitar. Strum Am-Dm-G-C with a 16th-note feel. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am-Dm-G-C. Sing chord tones: Am(A-C-E), Dm(D-F-A), G(G-B-D), C(C-E-G). Let your ear find F naturally within the Dm chord.", why: "Dm introduces F — a new note that expands your melodic vocabulary. Learning new notes in context (while improvising) is more effective than studying on paper." },
        { text: "Lock into the soul groove: shorter phrases, rhythmically precise, warm chest resonance. Your rhythmic chord navigation skills (ss-4-5) are essential here — soul demands rhythmic awareness.", why: "Soul singing is defined by rhythmic precision and warm tone. It sits in the middle of your dynamic range — not whispering, not projecting, just grooving." },
        { text: "Apply emotional color: Am is warm and melancholic, Dm is darker and more tense (the F creates a pull), G is bright and resolved, C is settled and open. Let each chord shift your delivery.", why: "Soul music is emotionally nuanced — subtle shifts in warmth and intensity with each chord change. This is emotional color + chord navigation working together at full integration." },
        { text: "3-minute freestyle: voice and guitar locked into the soul groove. All skills flowing. Record it.", why: "Soul improv teaches your voice to prioritize feel over flash. When your voice grooves, your songs groove." }
      ],
      feel: "Your whole body should feel the groove — head nodding, foot tapping, voice and guitar as one rhythmic organism. Soul music is felt before it's heard.",
      wrong: "If your vocal improvisation feels 'floaty' or disconnected from the beat, you're not in the pocket. Simplify until it locks, then add complexity from within the groove.",
      sarah: "Gene, Khruangbin and Skinshape live here — soul groove with understated vocals that serve the groove. This is your 'cool' vocal mode.",
      metronome: 90,
      referencePitches: getPitchRange("D3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-7",
      time: 8,
      title: "Cinematic Western Flow",
      type: "song",
      what: "Full integration in the cinematic context. Wide intervals, dramatic pauses, open vowels, dynamic swells. This is Hermanos Gutiérrez, Ennio Morricone territory — where your voice becomes part of a landscape.",
      setup: "Guitar. Sparse fingerpicked or arpeggiated Am-Em pattern.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Start the backing track. Play a sparse, fingerpicked Am-Em pattern. Sing long, sustained notes — hold each for 4-8 beats. Let them decay naturally. The silences are part of the music.", why: "Cinematic vocal delivery is about sustained tone and dramatic space. Each note is an event. Film composers use a single voice to evoke vastness." },
        { text: "Try wide intervals: jump from A (low) to E (high). In cinematic music, big jumps create drama. Don't connect them smoothly — let the leap be felt.", why: "Wide intervals create emotional drama that stepwise motion doesn't. This is a different expressive language from the groove-based genres." },
        { text: "Apply your full dynamic range: swell from whisper to full voice over 8 bars, then drop suddenly to silence. The drama is in the contrasts.", why: "Cinematic music lives on dynamic contrast. The whisper makes the crescendo dramatic. The silence makes the next note powerful." },
        { text: "3-minute freestyle: voice and sparse guitar painting a cinematic landscape. All skills, applied to space and drama rather than groove. Record it.", why: "Cinematic improv trains a different musical muscle than groove-based improv. Mastering both means you can write songs in ANY of your genre preferences." }
      ],
      feel: "This should feel like a landscape — vast, open, emotional. Your voice is a single figure in an enormous space.",
      wrong: "If your improvisation sounds busy or rhythmic, you're importing energy from the wrong genre. Strip it back. Fewer notes. Longer sustains. More dramatic silence.",
      sarah: "Gene, Hermanos Gutiérrez is in your top 10 across all time ranges. This cinematic, reverb-drenched sound is deeply in your DNA. Let that come through.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── NEW: MOTIF AND VARIATION ───

    {
      id: "ss-5-8",
      time: 8,
      title: "Motif and Variation",
      type: "vocal",
      what: "Improvise freely for 1 minute. When a phrase catches your ear, repeat it. Then vary it: change one note, change the rhythm, change the dynamics. Develop a single idea through 4-5 variations. Kratus Level 3: process → product transition.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em over the backing track. Improvise freely for 1 minute. Don't try to create anything — just play. Let phrases come and go.", why: "Free exploration is the hunting ground for motifs. Your subconscious generates melodic ideas faster than your conscious mind can plan them." },
        { text: "When a phrase catches your ear — something you liked the sound of — repeat it. Sing it exactly the same way 3-4 times. Lock it into memory.", why: "Catching and repeating a phrase is the bridge between improvisation and composition. You're selecting from your stream of ideas — this is the earliest form of songwriting." },
        { text: "Now vary it: change one note while keeping the rhythm. Then change the rhythm while keeping the notes. Then change the dynamics. Each variation preserves most of the original while changing one element.", why: "Variation is how motifs develop into melodies, and melodies develop into songs. One idea, systematically transformed, is the engine of musical composition." },
        { text: "Continue developing your motif for 3 more minutes. Let it evolve through 4-5 variations. By the end, it may sound very different from the original — that's the point. Record everything.", why: "Extended motif development is Kratus Level 3 — the process-to-product transition. You're no longer just exploring; you're creating something intentional from raw material." }
      ],
      feel: "This should feel like discovering treasure while exploring — you stumble on a phrase, pick it up, and polish it. The exploration feeds the creation.",
      wrong: "If you never repeat anything, you're staying in exploration mode. The exercise requires CATCHING a phrase. Even if it's simple, commit to it and develop it.",
      sarah: "Gene, Mark Speer catches a phrase and rides it for minutes — that's Khruangbin's entire approach. A single motif, endlessly varied. This exercise builds that same creative instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── NEW: PHRASING ARCHITECTURE ───

    {
      id: "ss-5-9",
      time: 8,
      title: "Phrasing Architecture",
      type: "vocal",
      what: "Improvise in structural forms. AABA: sing phrase A, repeat it, sing contrasting B, return to A. Then ABA. Then call-response-develop. Structure from within improvisation.",
      setup: "Guitar. Metronome at 120 BPM.",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "AABA form: improvise a phrase (A). Repeat it (A). Sing something contrasting (B) — different register, different rhythm, different energy. Return to A. Do this 3 times over the progression.", why: "AABA is the most common song form in popular music. Practicing it in improvisation means your freestyles will naturally develop song-like structures." },
        { text: "ABA form: phrase A, contrasting B, return to A. Tighter structure — the contrast comes earlier and the return feels more immediate. 3 cycles.", why: "ABA is the verse-chorus-verse skeleton. When your improvisation naturally falls into this shape, your songwriting will follow." },
        { text: "Call-Response-Develop: sing a short phrase (call). Answer it (response). Then extend the answer into something longer and more developed. The development grows from the response. 3 cycles.", why: "CRD is how musical ideas grow organically. The call plants a seed, the response waters it, the development lets it bloom. This is how jazz soloists build solos." },
        { text: "Free structural improv: use any form (AABA, ABA, CRD) that feels natural. Let the structure emerge from your improvisation rather than imposing it. 3 minutes at psych-rock tempo. Record it.", why: "When structural awareness becomes instinctive, your improvisations sound like compositions. The listener hears form even though you're creating in real time." }
      ],
      feel: "This should feel like telling a story with a beginning, middle, and end — even though you're making it up as you go. The structure gives your improvisation shape.",
      wrong: "If your improvisation has no repetition or contrast, you're not engaging the structural element. Force yourself to repeat phrases. Repetition IS structure.",
      sarah: "Gene, Allah-Las and Mystic Braves use these forms instinctively — their psych-rock songs have clear AABA and ABA shapes. At 120 BPM, your structural instincts have to work fast. That's the challenge.",
      metronome: 120,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true,
      phraseForm: { pattern: "AABA", barsPerSection: 4, labels: { A: "Phrase A", B: "Contrast B" } }
    },

    // ─── NEW: VERSE-CHORUS ENERGY ───

    {
      id: "ss-5-10",
      time: 8,
      title: "Verse-Chorus Energy",
      type: "song",
      what: "Strum Am-C (verse: quiet, sparse, intimate) then G-D (chorus: louder, wider intervals, more energy). Practice the energy shift between sections. Pre-songwriting structural awareness.",
      setup: "Guitar. Metronome at 90 BPM.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Verse section: strum Am-C at 90 BPM. Sing quietly, sparse phrases, intimate delivery. Stay in your low-to-mid range (E3-B3). Think storytelling — conversational, close. 4 bars.", why: "Verses are intimate and understated. They draw the listener in. Quiet dynamics, lower range, and sparse phrasing create the verse energy." },
        { text: "Chorus section: switch to G-D. Open up — louder, wider intervals (reach for D4), more rhythmic energy. The chorus LIFTS. The contrast with the verse IS the structure. 4 bars.", why: "Choruses release the energy that verses build. The dynamic and range shift between sections is what makes songs feel like they go somewhere." },
        { text: "Loop: verse (Am-C, 4 bars) → chorus (G-D, 4 bars) → verse → chorus. Make the energy contrast clearer each time. By pass 4, the shift should be dramatic and automatic.", why: "Repetition deepens the contrast. Each cycle makes the verse feel more intimate and the chorus feel more expansive. This is how energy dynamics work in real songs." },
        { text: "3-minute freestyle: alternate verse and chorus sections. Improvise freely within each section's energy rules. The structural contrast should feel natural by now. Record it.", why: "When verse-chorus energy shifts become instinctive, your songwriting will have built-in dynamics. You won't need to plan the energy arc — it'll happen naturally." }
      ],
      feel: "The verse should feel like sitting on the porch. The chorus should feel like standing up and walking to the edge of the cliff. Same singer, different energy.",
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

    // ─── NEW: RECOVERY ───

    {
      id: "ss-5-11",
      time: 6,
      title: "The Recovery Move",
      type: "vocal",
      what: "Deliberately sing a 'wrong' note (outside the chord tones). Then recover: slide to the nearest chord tone, bend into it, or repeat the clash with confidence until it resolves. Turn mistakes into features. Recovery as a skill.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "Strum Am. Sing a 'wrong' note on purpose — F, or F#, or Bb. Something that clashes with the chord. Hold it. Feel the tension.", why: "Deliberately singing wrong notes removes the fear of mistakes. When you've chosen to clash, you're in control — and you can learn to resolve the tension." },
        { text: "Recovery move 1 — Slide: from the clash note, slide up or down by half-step until you land on a chord tone. The slide turns the 'mistake' into a stylistic choice — like a blues bend.", why: "Sliding from a clash to a resolution is the oldest recovery trick in music. Blues, jazz, and soul singers do this constantly. It sounds intentional, not accidental." },
        { text: "Recovery move 2 — Commit: sing the clash note again, louder, with confidence. Then resolve. When you own the clash, it sounds like a deliberate harmonic choice — jazz does this all the time.", why: "Confidence transforms clashes into color. A note isn't 'wrong' if you sing it with intention. This is how jazz musicians think — every note is one step from a resolution." },
        { text: "Free improv: sing normally, but occasionally throw in a deliberate clash and practice recovering. 2 minutes. The goal is to make every recovery sound smooth and intentional. Record it.", why: "When recovery becomes automatic, mistakes stop being mistakes. They become opportunities. This removes the biggest psychological barrier to free improvisation — fear of wrong notes." }
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
      id: "ss-5-12",
      time: 6,
      title: "Hear It First, Sing It Second",
      type: "vocal",
      what: "Before singing each note, hear it in your head first. This audiation skill — hearing music in your mind before producing it — is what separates improvising from guessing. It integrates ear training with all your other skills.",
      setup: "Guitar. Metronome at 75 BPM (slower to allow internal hearing).",
      steps: [
        { text: "Strum Am. Close your eyes. Internally 'hear' the note A in your mind — hold that mental image for 2 beats. Then sing it. Was it the right pitch? Match it to the guitar.", why: "Audiation (Gordon's term) is the musical equivalent of thinking before speaking. Every great improviser hears the note internally before producing it." },
        { text: "Same process with C and E. Hear each note internally for 2 beats, then sing it. If your internal pitch doesn't match what comes out, play the note on guitar and try again.", why: "The gap between your internal hearing and your actual singing is your 'audiation gap.' Closing this gap is one of the most valuable things you can do for your musicianship." },
        { text: "Now try hearing a 2-note phrase internally (e.g., A up to E) before singing it. Internally 'rehearse' the phrase, then sing it out loud. Did it match?", why: "Audiating phrases (not just single notes) is how melodies form before they reach your voice. Songwriters hear the melody internally — the singing is just making it audible." },
        { text: "Free improv at 75 BPM: before each phrase, pause briefly to hear it internally. Sing only what you've already heard in your mind. This will slow you down — that's intentional.", why: "Slowing down to audiate forces quality over quantity. Every phrase has been pre-heard and chosen. This is the difference between conscious improvisation and random noodling." }
      ],
      feel: "This exercise should feel meditative and deliberate — the opposite of the free-flowing exercises. You're training the 'inner ear' that guides all future improvisation.",
      wrong: "If you're singing before hearing the note internally, you're reacting, not audiating. Slow down further. The internal hearing must come FIRST.",
      sarah: "Gene, this is the secret skill. Every musician you admire — Mark Speer, Angus Stone, the Allah-Las guys — they hear the melody before they play it. The fingers and voice just execute what the inner ear already decided.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── NEW: SILENT AUDIATION ───

    {
      id: "ss-5-13",
      time: 6,
      title: "Silent Audiation",
      type: "vocal",
      what: "Strum Am-C-G-Em. Hear an entire 4-bar phrase in your head before singing it. Audiate the full phrase — pitch, rhythm, dynamics, vowels — then execute. Extends ss-3-10 and ss-5-12 to full phrases.",
      setup: "Guitar. Metronome at 75 BPM (slower to allow full internal hearing).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em over the backing track at 75 BPM. Close your eyes. Listen to one full 4-bar cycle without singing. Internally hear a complete phrase — not just pitches, but rhythm, dynamics, and vowel sounds.", why: "Full-phrase audiation is the highest form of internal hearing. You're composing in your mind before producing any sound. This is how professional songwriters work." },
        { text: "On the next 4-bar cycle, sing exactly what you heard internally. Did it match? Was the rhythm right? The dynamics? If not, try again — audiate first, then sing.", why: "The accuracy of your internal-to-external translation improves with practice. Each attempt closes the gap between imagination and execution." },
        { text: "Alternate: 4 bars of silent audiation, 4 bars of singing what you audiated. The silent bars should feel as musically active as the sung bars — your brain is performing, just silently.", why: "Silent bars are not rest bars. Your internal musical activity during silence is training the same neural pathways as actual singing. The silence is productive." },
        { text: "2-minute freestyle: audiate full phrases before singing them. Let the phrases become more complex — include chord changes, dynamic shifts, vowel choices. All pre-heard, then executed. Record the sung portions.", why: "When full-phrase audiation becomes fluent, your improvisation will sound composed. Every phrase has been heard internally, evaluated, and chosen. This is mastery." }
      ],
      feel: "This should feel like the meditative core of your practice — quiet, internal, focused. The singing is just the external proof of rich internal musical activity.",
      wrong: "If you're singing without audiating first (just improvising freely), you're doing a different exercise. Force yourself to hear the COMPLETE phrase — start to finish — before singing any of it.",
      sarah: "Gene, this extends your Silent Sing from Level 3 and Hear It First from earlier in this level. Now it's full phrases — entire musical thoughts heard internally before they leave your mouth. Skinshape territory — quiet, meditative, intentional.",
      metronome: 75,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-14",
      time: 6,
      title: "Sing What You Hear",
      type: "vocal",
      what: "Play a chord progression and let your ear find notes WITHOUT consciously thinking about which chord tones are 'allowed.' Just sing what sounds right. Trust your ear. After all the exercises in Levels 3-4, your ear knows more than you think.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      steps: [
        { text: "Strum Am-C-G-Em slowly. Don't think about chord tones. Just sing whatever note your ear wants to hear. If it sounds right, keep going. If it clashes, adjust.", why: "At this point, your ear has absorbed the chord tones through hours of practice. Trusting your ear — singing without conscious analysis — is the shift from 'knowing the theory' to 'feeling the music.'" },
        { text: "When a note clashes, don't panic — slide up or down by a half step until you find a note that fits. This 'search and correct' process IS how ear training works in practice.", why: "Clashes are not failures — they're information. Your ear hears the clash and automatically corrects. Each correction strengthens the ear-voice connection." },
        { text: "Try this with eyes closed. Remove visual reference to the fretboard. Trust only your ear and your voice.", why: "Eyes closed removes the temptation to think in finger patterns. You're training pure ear-to-voice connection — the foundation of musical intuition." },
        { text: "3-minute freestyle with eyes closed: strum and sing, ear-guided, no conscious analysis. Record it. Listen back — you'll be surprised how musical it sounds.", why: "This exercise proves to yourself that your ear has learned the chord tones. You don't need to think about them anymore. They're in your musical DNA." }
      ],
      feel: "This should feel like taking the training wheels off. Scary at first, then surprisingly natural. Your ear knows more than your conscious mind — let it lead.",
      wrong: "If every note clashes, your ear hasn't absorbed the chord tones yet. Go back to Level 4 exercises and spend more time with conscious chord-tone improv before trying this ear-only approach.",
      sarah: "Gene, this is the moment where all the Level 2-4 drilling and exploration pays off. Your ear has been quietly learning the whole time. Trust it. Sing what you hear.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── SONGWRITING READINESS ───

    {
      id: "ss-5-15",
      time: 10,
      title: "Song Dissection",
      type: "listen",
      what: "Pick a song from your playlist — something you love but have never analyzed. Listen 5 times, each time focusing on a different layer: (1) structure/sections, (2) melodic contour, (3) vocal phrasing/timing, (4) dynamics/energy arc, (5) what makes you FEEL something. Active listening with intent builds the same neural pathways as performing.",
      setup: "Phone with a song queued up. Notebook or recorder for observations. No guitar needed.",
      steps: [
        { text: "Listen 1 — STRUCTURE: Play the song once. Map the sections: where does the verse start? Chorus? Bridge? How many bars is each section? Write it down: V(8)-V(8)-Ch(8)-V(8)-Ch(8)-Br(4)-Ch(8). This is the blueprint.", why: "Most songs follow predictable structures, but the details vary. Knowing how long each section lasts and where the chorus arrives teaches you pacing — arguably the most important songwriting skill." },
        { text: "Listen 2 — MELODIC CONTOUR: Focus only on the vocal melody. Does the verse melody rise or fall? Where is the highest note in the whole song — what word does it land on? Is the verse melody narrow-range (speech-like) or wide? Is the chorus higher than the verse?", why: "Research from Hit Songs Deconstructed shows that in well-crafted songs, the single highest note almost always falls on a key emotional word. Mapping contour teaches you how professionals use pitch as architecture." },
        { text: "Listen 3 — PHRASING & TIMING: Focus on WHEN the singer sings. Are they on the beat, behind it, ahead of it? How long are the phrases? Where do they breathe? How much SILENCE is there between phrases? Count the bars of singing vs. bars of rest.", why: "Phrasing is the fingerprint of a vocal style. DOPE LEMON phrases completely differently from Allah-Las. When you notice HOW they time their delivery, you can absorb that timing into your own singing." },
        { text: "Listen 4 — DYNAMICS & ENERGY: How loud/soft does the singer get? Does the verse start quiet and the chorus open up? Where is the emotional peak? Where is the most intimate moment? Map the energy arc.", why: "Dynamic architecture is what makes songs feel like journeys, not loops. Mapping the energy arc teaches you that the CONTRAST between sections matters more than the absolute volume of any single moment." },
        { text: "Listen 5 — THE FEEL: Last listen, forget the analysis. Close your eyes. Just feel. What moment in the song hits you hardest? What makes your body respond — a chill, a sway, a catch in your throat? Write that moment down. THAT is what you want to create.", why: "After four analytical listens, the fifth reconnects you to why you love the song in the first place. The moment that moves you is your target — everything else is a tool for getting there." }
      ],
      feel: "Each listen should reveal something you never noticed before — even in a song you've heard 100 times. The layers are always there. You just haven't looked for them yet.",
      wrong: "If you're just vibing to the song without focusing on the specific layer, you're passive listening, not active dissection. Force yourself to focus: on listen 2, ONLY think about melody contour. Ignore everything else.",
      sarah: "Gene, you've absorbed hundreds of songs unconsciously. This exercise makes that absorption conscious. When you know WHY a song moves you — the contour, the phrasing, the dynamics, the timing — you can build those same qualities into your own music.",
      recorder: true
    },
    {
      id: "ss-5-16",
      time: 8,
      title: "Prosody Check — Words Meet Melody",
      type: "vocal",
      what: "Take a simple phrase — 'driving down the coast at golden hour' — and SPEAK it naturally. Notice where your voice naturally stresses: 'DRIving DOWN the COAST at GOLDen HOUR.' Those stressed syllables MUST land on musical strong beats. Now sing it over Am-C. If the melody puts stress on 'the' or 'at,' rewrite the melody. This is prosody — the most important and least taught songwriting skill.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C.",
      steps: [
        { text: "Speak this phrase at natural conversation pace: 'driving down the coast at golden hour.' Exaggerate the stresses like you're making a point: 'DRIving DOWN the COAST at GOLDen HOUR.' Tap the table on each stressed syllable.", why: "Pat Pattison at Berklee calls this the #1 rule: spoken word stress MUST align with musical strong beats. When they don't align, the lyrics sound amateurish — even if the words are great." },
        { text: "Now strum Am-C at 80 BPM. Sing the phrase, placing the stressed syllables (DRI-, DOWN, COAST, GOLD-, HOUR) on beats 1 and 3. The unstressed syllables (-ving, the, at, -en) fall between beats. Does it feel natural?", why: "When speech stress and musical stress align, lyrics feel effortless — like the melody was born from the words. When they clash, the listener feels something is 'off' even if they can't explain why." },
        { text: "Now deliberately MIS-align it: put 'the' on beat 1, 'at' on beat 3. Sing it. Hear how wrong it feels? That awkwardness is bad prosody — and it's the #1 reason amateur songs sound amateur.", why: "Hearing bad prosody is as important as hearing good prosody. Once your ear catches the misalignment, you'll never un-hear it — in your own songs or anyone else's." },
        { text: "Try your own phrase — something from your life. Speak it, find the stresses, then set it to a melody over Am-C where the stresses land on strong beats. Record it. This is your first prosody-aware lyric.", why: "Prosody should be checked on EVERY lyric line, every time. Speak it → tap the stresses → sing it → confirm alignment. This protocol becomes second nature and transforms your songwriting." },
        { text: "Advanced: take a phrase where the stress alignment creates a choice. 'The SUN goes DOWN' vs. 'the sun GOES down' — different emphasis, different meaning, different melody. Which version serves the song better?", why: "Sometimes you can stress different syllables for different emotional effects. This isn't rule-breaking — it's advanced prosody. But you have to know the rules first to make intentional choices." }
      ],
      feel: "Good prosody should feel like the words and melody were made for each other — the melody makes the words sound BETTER than spoken, not worse. If it feels natural, the prosody is working.",
      wrong: "If your melody forces weird emphasis on wrong syllables ('driving DOWN the coast AT golden HOUR'), the prosody is broken. Rewrite the melody to match the speech, or rewrite the words to match the melody — but they MUST align.",
      sarah: "Gene, this is the thing that separates 'songs that feel right' from 'songs that feel off.' Pattison says misaligned prosody is the number one reason amateur lyrics sound amateurish. This one skill will transform your songwriting overnight.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true
    },
    {
      id: "ss-5-17",
      time: 8,
      title: "Self-Recording Protocol",
      type: "song",
      what: "Record a 2-minute freestyle, then listen back with a structured framework. Four passes: (1) overall feel, (2) pitch accuracy, (3) timing placement, (4) dynamics/expression. This turns 'record it' from a habit into a learning tool. You can't improve what you can't hear — and you can't hear yourself accurately while performing.",
      setup: "Guitar. Backing track of your choice. Metronome at 80-85 BPM.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      steps: [
        { text: "Record a 2-minute freestyle: strum Am-C-G-Em over a backing track, sing freely with all your Level 3-5 skills. Don't try to be perfect — just play. This is the raw material.", why: "The performance must be genuine, not self-conscious. If you're performing 'for the recording,' you'll play it safe. Play like no one is listening — then use the recording to learn." },
        { text: "Listen 1 — OVERALL FEEL: Play the recording once without stopping. Don't analyze — just feel. Does the overall vibe match what you intended? Does it sound like YOUR voice, YOUR style? Rate it 1-10 on 'does this feel like me?'", why: "The gut check comes first. Research shows that overall musical impression captures quality more accurately than technical analysis. If it FEELS right, the details can be refined." },
        { text: "Listen 2 — PITCH: Focus only on intonation. Are your note arrivals accurate? Do you drift sharp or flat on longer notes? Are there specific notes that consistently miss? Don't judge — just notice.", why: "Pitch accuracy is nearly impossible to self-assess in real time because your brain auto-corrects what it hears. The recording bypasses this illusion and shows you the truth." },
        { text: "Listen 3 — TIMING: Are you behind the beat (good in reggae/soul), on it, or rushing? Are some phrases ahead and some behind? Is the timing consistent or erratic? Compare your timing to the backing track.", why: "Timing is the other dimension your brain distorts during performance. You THINK you're in the pocket, but the recording reveals whether that's true." },
        { text: "Listen 4 — EXPRESSION: Dynamics, vowel variety, emotional color, use of silence. Are you varying volume? Using different vowels? Does the energy change across the 2 minutes or stay flat? This is the 'artistry' pass.", why: "Expression is where good becomes great. Most developing singers are focused on pitch and timing — but expression is what makes listeners lean in. Rating your expression teaches you to prioritize it." }
      ],
      feel: "The first time you hear yourself back, it's uncomfortable — everyone hates their recorded voice at first. By the fifth time, you start hearing what's ACTUALLY there, not what you feared. That's when the learning begins.",
      wrong: "If you're only listening for mistakes (what went wrong), you're missing half the value. Also listen for STRENGTHS (what sounded great). Build on strengths as much as you fix weaknesses.",
      sarah: "Gene, recording + structured listen-back is the fastest feedback loop available to a solo learner. Professional vocal coaches do exactly this — record, listen, assess, adjust. You're being your own coach.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-5-18",
      time: 6,
      title: "Song Seed Capture",
      type: "record",
      what: "Build the capture habit. In this exercise, you'll generate 5 song seeds in 10 minutes — tiny musical fragments recorded on your phone. A 4-note melody. A chord change that feels good. A lyric phrase. A rhythm. A feeling. Prolific songwriters capture 5-10x more ideas than they finish. The habit of capturing is more important than the quality of any single seed.",
      setup: "Phone voice recorder. Guitar optional. Timer set to 2 minutes per seed.",
      steps: [
        { text: "Seed 1 — MELODY: Hum or sing a short melody fragment (4-8 notes). Don't think about it — just let something come out. Record it immediately. Tag it: 'melody seed, [mood word], [date].' Done. Under 30 seconds.", why: "Speed matters more than quality. Professional songwriters like Dan Wilson (Semisonic, co-writer with Adele) maintain thousands of voice memos. The discipline is CAPTURE, not perfection." },
        { text: "Seed 2 — GROOVE: Strum a chord or two with a rhythm that feels good. No melody, no lyrics — just a groove fragment. Record 15 seconds of it. Tag: 'groove seed, [feel], [date].'", why: "Groove seeds are a different species than melody seeds. They develop differently — a groove becomes a song's foundation, while a melody becomes its identity. Classifying at capture helps future-you assemble them." },
        { text: "Seed 3 — LYRIC: Say a phrase that's been in your head — or object-write for 60 seconds and grab the best line. Record it spoken, not sung. Tag: 'lyric seed, [image], [date].'", why: "Lyric seeds capture language — an image, a turn of phrase, a title idea. Speaking them (not singing) keeps the melody open for later. Some of the best songs start with a single line that demanded a song around it." },
        { text: "Seed 4 — CHORD CHANGE: Find a two-chord transition that feels emotionally charged — Am to F, Em to C, whatever moves you. Play it 4 times. Record. Tag: 'chord seed, [emotion], [date].'", why: "A single chord change can contain an entire emotional world. The Am→F move feels completely different from Am→G. Capturing these emotional moments means you have them when you need them." },
        { text: "Seed 5 — WILD CARD: Record ANYTHING musical that comes to you. A beat tapped on the table. A vocal texture. A sound you want to recreate. The unexpected seeds are often the most valuable.", why: "The wild card teaches you that EVERYTHING is a potential song seed. The sound of rain, a conversation rhythm, a horn honking — prolific writers hear music everywhere." },
        { text: "Review: you now have 5 seeds. Listen to each one. Does any pair want to be combined — a melody seed over a groove seed? A lyric seed with a chord change? Mark any connections. This is how songs assemble themselves.", why: "Cross-pollination between seeds is how professional writers break creative blocks. They don't wait for a complete song to arrive — they combine fragments from different sessions. Your archive IS your songwriting engine." }
      ],
      feel: "This should feel fast and low-pressure — capture speed, not recording quality. A voice memo recorded in a parking lot is more valuable than a perfect idea you forgot because you didn't record it.",
      wrong: "If you're spending more than 2 minutes per seed, you're overthinking. The point is VOLUME and SPEED. Bad seeds are fine — you'll delete 80% of them. The 20% that survive become songs.",
      sarah: "Gene, Ed Sheeran has thousands of voice memos. Tom Waits carries a notebook everywhere. The difference between songwriters who write 2 songs a year and songwriters who write 50 is the capture habit. Start today. Never stop.",
      recorder: true
    },
    {
      id: "ss-5-19",
      time: 12,
      title: "The Ugly First Draft",
      type: "song",
      what: "Write a complete song in 12 minutes. It will be bad. That's the point. Verse, chorus, simple chord progression, melody, words. Do NOT edit, do NOT restart, do NOT judge. The goal is a FINISHED draft, not a good one. Creative confidence research shows that volume of output — not careful planning — closes the gap between your taste and your ability.",
      setup: "Guitar. Timer set to 12 minutes. Recorder on from the start.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Minutes 0-3: Pick two chords (any two). Start strumming. Hum until a melody fragment appears. When it does, claim it — that's your verse melody. Hum it 4 times to lock it in.", why: "Two chords removes decision paralysis. Constraint-based creativity research shows that fewer options increase both speed and originality. Don't choose 'the right' chords — choose the FIRST two that your hands find." },
        { text: "Minutes 3-6: Add words to the verse melody. They don't need to be good. They don't need to rhyme. They need to be THERE. Describe what you see right now, or felt this morning, or imagined yesterday. First words that come. No editing.", why: "The 'ugly first draft' protocol comes from professional songwriting practice: commit to finishing regardless of quality. The inner critic freezes beginners. Speed bypasses the critic." },
        { text: "Minutes 6-9: Create a chorus — slightly higher energy, different chords or same chords with a different strum. Sing a hook phrase — something that could be a title. Repeat it. Done.", why: "The chorus doesn't need to be brilliant. It needs to EXIST. A mediocre chorus that exists is infinitely more useful than a perfect chorus that never gets written." },
        { text: "Minutes 9-12: Play through the whole song: verse → verse → chorus → verse → chorus. It's rough. It's imperfect. It's a SONG. You wrote a song in 12 minutes. Record the final pass.", why: "A finished draft — any finished draft — gives you something to IMPROVE. You can't edit a blank page. The ugly first draft is the raw material that becomes a real song through revision." },
        { text: "After the timer: listen to the recording once. Don't judge. Just notice: was there ONE moment — one phrase, one chord change, one melody turn — that surprised you? Circle that. That's the seed of something real.", why: "Every ugly draft contains at least one genuine moment. Finding it and building from it is the revision process. You're not writing a song from nothing — you're excavating a song from a rough draft." }
      ],
      feel: "This should feel uncomfortable and freeing at the same time — uncomfortable because it's imperfect, freeing because you're creating without judgment. The timer is your permission slip to be bad.",
      wrong: "If you restart, you've broken the exercise. If you stop to 'think of something better,' you've broken the exercise. If you judge a line and discard it, you've broken the exercise. KEEP GOING. Ugly is the goal. Edit LATER.",
      sarah: "Gene, Ira Glass said it best: 'Your taste is good enough to tell that what you're making isn't great yet. The gap closes through VOLUME of work, not through being more careful.' This exercise is volume. Write ugly songs every week. Watch what happens.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true,
      phraseForm: { pattern: ["V", "V", "Ch", "V", "Ch"], barsPerSection: [4, 4, 4, 4, 4], labels: { V: "Verse", Ch: "Chorus" } }
    },

    // ─── GRADUATION ───

    {
      id: "ss-5-20",
      time: 10,
      title: "Genre Freestyle Round",
      type: "song",
      what: "Three 3-minute freestyles back to back, each in a different genre feel: reggae, surf, and soul. Same chord tones, same voice — different strum patterns, different backing tracks, different vocal instincts. Full integration across your three core genres.",
      setup: "Guitar. Three backing tracks queued up.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        { text: "Round 1 — Reggae: offbeat chop, Am-C-G, 85 BPM. Vocal style: laid-back, choppy phrases, lots of space. All skills: dynamics, emotion, vowels, chord navigation. 3 minutes, record.", why: "Reggae is your comfort zone — start here to warm up. But now integrate everything: dynamic shifts, emotional color, vowel variety, rhythmic play. Not just reggae phrasing — full expression." },
        { text: "Round 2 — Surf: jangle strum, G-Em-C-D, 120 BPM. Vocal style: breathy, flowing, riding the shimmer. All skills at higher tempo. 3 minutes, record.", why: "Surf is faster — your skills must work at a higher tempo while maintaining quality. If any skill drops out at 120 BPM, it's not fully automated yet." },
        { text: "Round 3 — Soul: fingerpicked Am-Dm-G-C, 80 BPM. Vocal style: warm, groove-locked, rhythmic. Include the Dm chord (with F). 3 minutes, record.", why: "Soul demands the most rhythmic precision. Three genres back-to-back proves your voice can shift context while maintaining full integration." },
        { text: "Listen to all three recordings. Can you hear how your voice becomes three different singers depending on the genre? That's improvisation fluency.", why: "Genre-shifting is the ultimate proof of fluency. You're not imitating — you're responding to context with your full skill set." }
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
      id: "ss-5-21",
      time: 10,
      title: "5-Minute Freestyle",
      type: "song",
      what: "The graduation test. Choose any backing track, any chord progression, any genre feel. Strum and sing freely for 5 minutes without stopping. Every skill from Levels 3-5 integrated into one sustained performance. This is the fluency proof.",
      setup: "Guitar. Choose your backing track and chord progression. This is YOUR choice — pick what feels best.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }
      ],
      steps: [
        { text: "Choose a backing track and a chord progression you love. Set the metronome. Start strumming. Take 8 bars of just guitar to lock into the groove.", why: "Choosing your own context is the first act of creative autonomy. You're not following instructions anymore — you're making musical decisions." },
        { text: "Begin singing. Use everything: pitch exploration, rhythmic play, genre feel, emotional color, dynamics, vowel shapes, audiation, chord navigation. Let it all flow.", why: "Five minutes is long enough for a full journey — quiet moments, intense moments, sparse moments, flowing moments. You're not performing. You're exploring." },
        { text: "If you hit a wall (everyone does around minute 2-3), simplify. One note, one rhythm. Hold a single pitch for 4 bars. Then let the next idea emerge from the silence.", why: "The wall is where most people stop. Pushing through it — even with a single sustained note — is how you reach the deeper creative space on the other side." },
        { text: "Keep going for the full 5 minutes. Record everything. Listen back. Notice: where were you in the flow? Where did you surprise yourself?", why: "Five minutes of sustained integrated improvisation is the fluency proof. When this feels natural — when you lose track of time — you're ready to compose songs." }
      ],
      feel: "By minute three, you should stop thinking about skills and start feeling the music. Everything becomes automatic. That's flow. That's fluency.",
      wrong: "If you can't sustain 5 minutes without the strum breaking down or the voice going silent for more than 8 beats, revisit the specific skill that's weakest.",
      sarah: "Gene, this is the real graduation. Five minutes of free vocal improvisation over your own guitar with every tool at your disposal. When this feels like breathing — natural, effortless, inevitable — you're ready to channel that flow into songs. Everything from Level 6 onward builds on this moment.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true,
      levelUp: "Can sustain 5 minutes of fully integrated vocal improvisation over a backing track while strumming — varied rhythm, dynamics, emotional color, vowel shapes, and chord-tone navigation — across multiple genre feels without stopping or losing the groove. Can also dissect songs for structure/contour/phrasing/dynamics, check prosody alignment between speech and melody, assess recordings with a structured protocol, capture song seeds habitually, and write complete ugly first drafts under time pressure."
    }
  ]
};
