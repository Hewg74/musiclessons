import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Voice Flows",
  subtitle: "Everything at once. Trust the process. Trust your ear.",
  description:
    "Levels 3-4 isolated skills. Level 5 combined them in pairs. Now everything flows together: pitch, rhythm, dynamics, emotion, vowels, chord changes, genre feel — all at once, across multiple genres and progressions. This is full integration. Based on Csikszentmihalyi's flow research: flow states emerge when all sub-skills are automated and the challenge matches your ability. You've built the automation. Now find the flow.",
  artists: "Khruangbin, DOPE LEMON, Allah-Las, Tinariwen, Hermanos Gutiérrez, Skinshape",
  unlocks: "Melody Building (Level 7)",
  review: { label: "Level 5 Check-In", time: 5, exercises: ["ss-5-20", "ss-5-24"], prompt: "Do a Color Palette Freestyle (ss-5-20). Then a Strum + Vocal Rhythm Conversation (ss-5-24). Both fluid with no strum breaks? Move on." },
  exercises: [

    // ─── TRIPLE-SKILL BRIDGE ───

    {
      id: "ss-6-1",
      time: 8,
      title: "Triple-Skill Fusion",
      type: "vocal",
      what: "Bridge exercise: combine THREE skills at once (not two like Level 5, not everything like the rest of Level 6). Three 2-min rounds. Round 1: rhythm + dynamics + chord changes. Round 2: emotional color + vowels + genre feel. Round 3: breath phrasing + audiation + space.",
      setup: "Guitar. Metronome at 85 BPM.",
      tracks: [
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      steps: [
        { text: "Round 1 — Rhythm + Dynamics + Chord Changes: strum Am-C-G-Em at 85 BPM. Sing chord tones with varied rhythms AND varied dynamics while navigating the changes. Three variables at once. 2 minutes over the groove beat.", why: "Three skills is the cognitive sweet spot between Level 5's pairs and Level 6's full integration. Your brain learns to manage three variables before being asked to manage everything." },
        { text: "Round 2 — Emotional Color + Vowels + Genre Feel: switch to the reggae backing. Strum Am-C with reggae chop. Match emotional color to each chord, choose vowels deliberately, and stay in the reggae pocket. Three expressive variables. 2 minutes.", why: "This triple combines three 'feel' variables — emotion, vowel, and genre. They reinforce each other: reggae feel suggests certain vowels and emotional textures." },
        { text: "Round 3 — Breath Phrasing + Audiation + Space: no backing track. Strum Am-C-G-Em quietly. Hear each phrase internally before singing it (audiation), let each phrase be one breath long (breath phrasing), and leave at least 2 bars of silence between phrases (space). 2 minutes.", why: "This triple combines three 'internal' skills — breath control, inner hearing, and restraint. These are the meditative, contemplative side of improvisation." },
        { text: "Reflect: which round felt most natural? Which felt most challenging? The challenging one reveals which skill combination needs more practice.", why: "Self-assessment identifies your weakest skill intersection. The strongest round shows where your natural abilities lie — useful intel for songwriting." }
      ],
      feel: "Each round should feel like Level 5 with one more ball to juggle. Challenging but not overwhelming. If it feels impossible, one of the three skills isn't automated yet.",
      wrong: "If you can only manage two of the three skills in each round, go back to the relevant Level 5 exercise and solidify the pair before adding the third.",
      sarah: "Gene, this is the stepping stone between Level 5 and the rest of Level 6. Three skills is the bridge — it smooths the jump from combining pairs to integrating everything.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── FULL-INTEGRATION IMPROV ───

    {
      id: "ss-6-2",
      time: 8,
      title: "Full Progression Improv",
      type: "vocal",
      what: "All skills, all at once. Strum Am-C-G-Em and freely improvise using every tool from Levels 3-5: varied rhythm, dynamics, emotional color, vowel shapes, chord-tone navigation, and space. No constraints. Just play.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em. Sing chord tones freely. But now consciously engage EVERYTHING: vary your rhythm, shift dynamics, change emotional color with each chord, shape your vowels. All of it, flowing.", why: "Full integration is the final stage of motor learning. When all sub-skills are automated, they can operate simultaneously. The conscious mind is free to be creative." },
        { text: "Let the music breathe. Leave 2-4 bars of silence periodically. When you re-enter, come in with a different energy than when you left. Space is a skill too.", why: "Strategic silence is what separates masterful improvisation from nervous noodling. The pause resets your creative state and lets the next idea emerge fresh." },
        { text: "Try one pass where you focus on very sparse, minimal singing — 3-4 notes per bar maximum. Then one pass where you're more active — filling the bars. Both are valid musical choices.", why: "Density control — choosing how much to sing — is a compositional decision. Building fluency at both sparse and dense extremes gives you the full range." },
        { text: "5-minute freestyle. Record the whole thing. Don't stop, don't restart. Whatever happens is the music.", why: "Five uninterrupted minutes of integrated improvisation is the fluency milestone. If you can sustain this, every skill is working together." }
      ],
      feel: "This should feel like the moment when driving a car becomes automatic — you're not thinking about the pedals, the mirrors, the steering. You're just going somewhere.",
      wrong: "If you notice one skill disappearing (e.g., dynamics go flat, or you stop navigating chord tones), it means that skill isn't automated yet. Go back to its Level 3-4 exercise.",
      sarah: "Gene, this is what every exercise has been building toward. Your voice and guitar as one instrument. All the individual skills fused into flow. Let it happen.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-3",
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
      id: "ss-6-4",
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

    {
      id: "ss-6-5",
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
      id: "ss-6-6",
      time: 8,
      title: "Soul Groove Flow",
      type: "song",
      drone: { mode: "cycle", preset: "desert-blues" },
      what: "Full integration over a new chord set: Am-Dm-G-C. Soul music is rhythmic, warm, and groove-locked. Dm introduces a new note (F) you haven't improvised with. All skills applied to the soul-funk aesthetic.",
      setup: "Guitar. Strum Am-Dm-G-C with a 16th-note feel. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am-Dm-G-C. Sing chord tones: Am(A-C-E), Dm(D-F-A), G(G-B-D), C(C-E-G). Let your ear find F naturally within the Dm chord.", why: "Dm introduces F — a new note that expands your melodic vocabulary. Learning new notes in context (while improvising) is more effective than studying on paper." },
        { text: "Lock into the soul groove: shorter phrases, rhythmically precise, warm chest resonance. Your rhythmic chord navigation skills from Level 5 are essential here — soul demands rhythmic awareness.", why: "Soul singing is defined by rhythmic precision and warm tone. It sits in the middle of your dynamic range — not whispering, not projecting, just grooving." },
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
      id: "ss-6-7",
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

    // ─── MOTIF AND VARIATION ───

    {
      id: "ss-6-8",
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

    // ─── PHRASING ARCHITECTURE ───

    {
      id: "ss-6-9",
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

    // ─── VERSE-CHORUS ENERGY ───

    {
      id: "ss-6-10",
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

    // ─── RECOVERY ───

    {
      id: "ss-6-11",
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
      id: "ss-6-12",
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

    // ─── SILENT AUDIATION ───

    {
      id: "ss-6-13",
      time: 6,
      title: "Silent Audiation",
      type: "vocal",
      what: "Strum Am-C-G-Em. Hear an entire 4-bar phrase in your head before singing it. Audiate the full phrase — pitch, rhythm, dynamics, vowels — then execute. Extends earlier audiation work to full phrases.",
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
      sarah: "Gene, this extends your earlier audiation exercises into full phrases — entire musical thoughts heard internally before they leave your mouth. Skinshape territory — quiet, meditative, intentional.",
      metronome: 75,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-14",
      time: 6,
      title: "Sing What You Hear",
      type: "vocal",
      what: "Play a chord progression and let your ear find notes WITHOUT consciously thinking about which chord tones are 'allowed.' Just sing what sounds right. Trust your ear. After all the exercises in Levels 3-5, your ear knows more than you think.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C-G-Em.",
      steps: [
        { text: "Strum Am-C-G-Em slowly. Don't think about chord tones. Just sing whatever note your ear wants to hear. If it sounds right, keep going. If it clashes, adjust.", why: "At this point, your ear has absorbed the chord tones through hours of practice. Trusting your ear — singing without conscious analysis — is the shift from 'knowing the theory' to 'feeling the music.'" },
        { text: "When a note clashes, don't panic — slide up or down by a half step until you find a note that fits. This 'search and correct' process IS how ear training works in practice.", why: "Clashes are not failures — they're information. Your ear hears the clash and automatically corrects. Each correction strengthens the ear-voice connection." },
        { text: "Try this with eyes closed. Remove visual reference to the fretboard. Trust only your ear and your voice.", why: "Eyes closed removes the temptation to think in finger patterns. You're training pure ear-to-voice connection — the foundation of musical intuition." },
        { text: "3-minute freestyle with eyes closed: strum and sing, ear-guided, no conscious analysis. Record it. Listen back — you'll be surprised how musical it sounds.", why: "This exercise proves to yourself that your ear has learned the chord tones. You don't need to think about them anymore. They're in your musical DNA." }
      ],
      feel: "This should feel like taking the training wheels off. Scary at first, then surprisingly natural. Your ear knows more than your conscious mind — let it lead.",
      wrong: "If every note clashes, your ear hasn't absorbed the chord tones yet. Go back to Level 3-5 exercises and spend more time with conscious chord-tone improv before trying this ear-only approach.",
      sarah: "Gene, this is the moment where all the Level 3-5 drilling and exploration pays off. Your ear has been quietly learning the whole time. Trust it. Sing what you hear.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── RHYTHM INTEGRATION (from Level 7) ───

    {
      id: "ss-6-15",
      time: 6,
      title: "Rhythmic Call & Response",
      type: "vocal",
      what: "Rhythm-ONLY call and response. Clap a 2-bar rhythm, then sing it back on one pitch (A). The pitch never changes — only the rhythm. This isolates rhythmic audiation without pitch distraction and builds rhythmic memory and reproduction.",
      setup: "Metronome at 80 BPM. No instrument needed.",
      steps: [
        { text: "Clap a simple 2-bar rhythm — maybe 'clap clap... clap-clap clap.' Then immediately sing it back on the note A: 'dah dah... dah-dah dah.' Match the rhythm exactly.", why: "Translating rhythm from hands to voice trains rhythmic audiation — hearing rhythm internally and reproducing it through a different output. This is the same skill used in melodic transcription." },
        { text: "Make the rhythms more complex: add syncopation, rests, and 16th-note bursts. Clap it, then sing it back. If you can't sing it back, simplify.", why: "Progressively harder rhythms expand your rhythmic vocabulary. The limit of what you can reproduce is the limit of what you can compose." },
        { text: "Reverse it: sing a 2-bar rhythm on A, then clap it back. Going voice-to-hands is a different neural pathway than hands-to-voice.", why: "Bi-directional rhythm transfer proves the pattern is stored internally, not just in one motor pathway. This is deep rhythmic learning." },
        { text: "Partner variation (solo version): record a clapped rhythm, wait 4 beats, then sing it back while listening to the playback. The recording is your 'partner.'", why: "The 4-beat gap forces you to hold the rhythm in memory — no immediate copying allowed. This builds the rhythmic working memory that songwriting requires." },
        { text: "Try 4-bar rhythms. Clap, then sing back. Longer patterns test your rhythmic memory and force you to chunk patterns into phrases.", why: "Four bars is the length of most vocal phrases in songs. If you can audiate and reproduce a 4-bar rhythm, you can learn any vocal rhythm by ear." }
      ],
      feel: "This should feel like a rhythm game — playful, challenging, and satisfying when you nail a complex pattern. The one-note constraint keeps it focused on rhythm alone.",
      wrong: "If you're changing pitch while singing back the rhythm, stop. One note only — A. The moment you add pitch variation, your brain splits attention away from rhythm.",
      sarah: "Gene, this is how musicians with great ears learn songs — they hear the rhythm first, then add pitch. Kodály and Stoloff both use call-and-response as the primary rhythmic training tool.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-6-16",
      time: 7,
      title: "Harmonic Rhythm Awareness",
      type: "guitar",
      what: "Same Am-C-G-Em progression, three versions: one chord per 2 bars (spacious, desert blues), one chord per bar (standard), and two chords per bar (urgent, driving). Sing the same melody over all three. Harmonic rhythm — how OFTEN chords change — is a compositional tool as powerful as which chords you choose.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Version 1: one chord every 2 bars. Am for 8 beats, C for 8 beats, G for 8 beats, Em for 8 beats. Spacious, hypnotic, desert blues. Sing a simple melody over it.", why: "Slow harmonic rhythm creates space and hypnosis. This is the Tinariwen and Tommy Guerrero approach — let one chord breathe before moving on." },
        { text: "Version 2: one chord per bar. Am (4 beats), C (4 beats), G (4 beats), Em (4 beats). Standard pop/rock timing. Sing the same melody.", why: "This is the default harmonic rhythm of most songs. It feels balanced — enough change to stay interesting, enough space to settle into each chord." },
        { text: "Version 3: two chords per bar. Am-C (2 beats each), G-Em (2 beats each). Fast, urgent, driving. Sing the same melody — it will feel completely different.", why: "Fast harmonic rhythm creates urgency and forward motion. The chords rush past, and the voice has to navigate quickly. This is the feel of bridge sections and build-ups." },
        { text: "Play all three versions back to back without stopping. Feel the shift: spacious → standard → urgent. Same chords, same melody, totally different energy.", why: "Experiencing the contrast in one continuous pass reveals harmonic rhythm as a compositional lever. You can change the energy of a song without changing a single chord or note." },
        { text: "Pick your favorite version. Spend 3 minutes improvising freely over that harmonic rhythm. Record it.", why: "Your preferred harmonic rhythm reveals your compositional instinct. Desert blues artists prefer slow; punk prefers fast; your sweet spot is probably somewhere in the middle." }
      ],
      feel: "Slow harmonic rhythm should feel like a wide-open landscape. Fast should feel like a sprint. Medium should feel like walking. Your body responds differently to each.",
      wrong: "If all three versions feel the same, you're not letting the chord durations affect your singing. In the slow version, stretch your phrases out. In the fast version, make them punchier.",
      sarah: "Gene, this is why Khruangbin songs feel so spacious — they sit on one chord forever. And why punk feels urgent — chords fly by. You get to choose where your songs live on that spectrum.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-6-17",
      time: 6,
      title: "Genre Rhythm Transcription",
      type: "rhythm",
      what: "Listen to a backing track. Don't play along yet. Clap or tap the vocal rhythm you IMAGINE over it — the rhythm a singer would use. Then sing it on one note. Then add chord tones. Rhythm-first composition: the groove suggests the vocal rhythm before any melody.",
      setup: "Backing track ready. No instrument for the first two rounds.",
      steps: [
        { text: "Play the Desert Blues track. Just listen for 30 seconds. Don't tap, don't hum. Let the groove sink in. Where does it want a voice to land?", why: "Active listening before playing trains your musical imagination. The groove has a built-in suggestion for where vocals belong — you just need to hear it." },
        { text: "Now clap or tap the vocal rhythm you hear in your head. Not the drum pattern — the rhythm a SINGER would use over this groove. Tap it out for 4 bars.", why: "Tapping an imagined vocal rhythm is rhythmic audiation at its purest. You're composing rhythm before sound — which is exactly how great songwriters work." },
        { text: "Sing your tapped rhythm on one note (A). Same rhythm, now with voice. Does it feel natural over the groove? Adjust if needed.", why: "Translating from hands to voice tests whether the rhythm works vocally. Some rhythms feel great to tap but awkward to sing — this step filters for singable rhythms." },
        { text: "Now add chord tones: sing your rhythm, but vary the pitch using A, C, E (Am chord tones). The rhythm stays the same; pitch adds color.", why: "Adding pitch to an established rhythm is melody writing. You've composed the rhythm first, then decorated it with pitch — the professional approach." },
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
      id: "ss-6-18",
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
        { text: "Round 1 — Reggae: play the Reggae One Drop track. Strum and sing freely for 2 minutes. Don't try to be 'reggae' — just play naturally over the groove. Let the track guide you.", why: "Your natural response to a genre groove reveals your instincts. When you're not trying to play a genre, what comes out IS your authentic voice in that genre." },
        { text: "Round 2 — Surf: play the Surf Rock track. Same deal — 2 minutes of freestyle. Notice how your strumming, phrasing, and energy shift (or don't) with the faster, brighter groove.", why: "Different tempos and feels pull different things from your voice. The contrast between your reggae and surf responses reveals where your natural tendencies live." },
        { text: "Round 3 — Desert Blues: play the Desert Blues track. 2 minutes. This is the slowest, sparsest groove. Does your voice go sparse and hypnotic, or does it fight the space?", why: "Desert blues demands restraint. How comfortable you are with space and repetition tells you a lot about your compositional instincts." },
        { text: "Listen to all three recordings. Which one sounds most like YOU — not performing a genre, but naturally inhabiting it? That's your home genre. Which one felt most natural to play? Which surprised you?", why: "Your home genre is where your songwriting will be most authentic. Knowing it consciously means you can lean into it when writing and step outside it when you want creative growth." },
        { text: "Spend 2 more minutes in your home genre. This time, notice what specific skills feel most natural: is it the rhythm, the dynamics, the vowel choices, the phrasing? Your strongest dimension in your home genre is your artistic signature.", why: "Your artistic identity is the intersection of your home genre and your strongest expressive dimension. Knowing both gives you a compass for everything that follows." }
      ],
      feel: "One of these three genres should feel like putting on your favorite shirt — comfortable, natural, YOU. The others might feel fun but slightly borrowed. That difference is important information.",
      wrong: "If all three feel identical, you're not responding to the groove — you're playing the same thing over everything. Let each backing track CHANGE your approach.",
      sarah: "Gene, your playlists already tell me your home genre is somewhere in the reggae-surf-desert triangle. But hearing it from your own playing — not just your listening — confirms it. This diagnostic becomes your songwriting compass.",
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-19",
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
      id: "ss-6-20",
      time: 10,
      title: "Genre Freestyle Round",
      type: "song",
      what: "Three 3-minute freestyles back to back, each in a different genre feel: reggae, surf, and soul. Same chord tones, same voice — different strum patterns, different backing tracks, different vocal instincts. Full integration across your three core genres.",
      setup: "Guitar. Three backing tracks queued up.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Ska Upbeat 95", src: "/ska-upbeat-95.mp3" }
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
      id: "ss-6-21",
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
        { name: "Afrobeat 100", src: "/afrobeat-100.mp3" }
      ],
      steps: [
        { text: "Choose a backing track and a chord progression you love. Set the metronome. Start strumming. Take 8 bars of just guitar to lock into the groove.", why: "Choosing your own context is the first act of creative autonomy. You're not following instructions anymore — you're making musical decisions." },
        { text: "Begin singing. Use everything: pitch exploration, rhythmic play, genre feel, emotional color, dynamics, vowel shapes, audiation, chord navigation. Let it all flow.", why: "Five minutes is long enough for a full journey — quiet moments, intense moments, sparse moments, flowing moments. You're not performing. You're exploring." },
        { text: "If you hit a wall (everyone does around minute 2-3), simplify. One note, one rhythm. Hold a single pitch for 4 bars. Then let the next idea emerge from the silence.", why: "The wall is where most people stop. Pushing through it — even with a single sustained note — is how you reach the deeper creative space on the other side." },
        { text: "Keep going for the full 5 minutes. Record everything. Listen back. Notice: where were you in the flow? Where did you surprise yourself?", why: "Five minutes of sustained integrated improvisation is the fluency proof. When this feels natural — when you lose track of time — you're ready to compose songs." }
      ],
      feel: "By minute three, you should stop thinking about skills and start feeling the music. Everything becomes automatic. That's flow. That's fluency.",
      wrong: "If you can't sustain 5 minutes without the strum breaking down or the voice going silent for more than 8 beats, revisit the specific skill that's weakest.",
      sarah: "Gene, this is the real graduation. Five minutes of free vocal improvisation over your own guitar with every tool at your disposal. When this feels like breathing — natural, effortless, inevitable — you're ready to channel that flow into songs. Everything from Level 7 onward builds on this moment.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true,
      levelUp: "Can sustain 5 minutes of fully integrated vocal improvisation over a backing track while strumming — varied rhythm, dynamics, emotional color, vowel shapes, chord-tone navigation, and genre-specific micro-timing — across multiple genre feels without stopping or losing the groove. Can identify your default genre instinct, self-assess using structured recording protocol, and use harmonic rhythm and genre rhythm transcription as creative tools."
    }
  ]
};
