import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Voice Explores",
  subtitle: "Stop thinking. Start playing. Fluency comes from freedom.",
  description:
    "You know the chord tones from Level 2 — now PLAY with them. No targets, no composition, no 'getting it right.' This level builds improvisational fluency through free exploration, constraint play, and emotional expression. Based on Kratus's developmental model: fluent improvisation (Level 4) requires extended free exploration (Levels 1-3) before any compositional demand. The research is clear — you can't compose what you can't freely play.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero",
  unlocks: "Creating Your First Songs (Level 4)",
  review: { label: "Level 2 Check-In", time: 5, exercises: ["ss-2-3b", "ss-2-3c"], prompt: "Sing root-5th on G-C-D-Em-Am at 85 BPM (ss-2-3b). Walk the triad of Am-C-G-D (ss-2-3c). Both stable with no strum breaks? Move on." },
  exercises: [
    {
      id: "ss-3-1",
      time: 6,
      title: "Free Exploration",
      type: "vocal",
      what: "Strum Am on autopilot and sing any combination of A, C, and E in any order, any rhythm, for 3 minutes straight. No target phrase, no compositional goal. Just wander through the chord tones. This is Kratus Level 1 — pure exploration.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing the note A. Hold it as long as you want. Then move to C whenever you feel like it. Then E. No order, no rhythm — just drift.", why: "Free exploration without targets builds the neural pathways for improvisation. When there's no wrong answer, your brain relaxes and finds natural melodic movement." },
        { text: "Speed up: try moving between A-C-E faster. Then slow down again. Vary how long you hold each note. Some short, some long, some with silence between.", why: "Varying duration and speed trains your voice to navigate chord tones at different rates — fast for energy, slow for emotion. Both are tools." },
        { text: "Try singing on 'la,' then 'ooh,' then 'mm.' Notice how different vowels change the feeling of the same three notes.", why: "Vowel sounds shape the emotional color of your improvisation. 'Ooh' feels intimate, 'la' feels open, 'mm' feels contemplative. All three are useful." },
        { text: "Keep going for 3 full minutes without stopping. If you get stuck, hold any note until the next one comes. There is no wrong move here.", why: "Sustained improvisation builds endurance and trust. The first minute feels awkward. By minute three, you're in the flow." }
      ],
      feel: "This should feel like doodling with your voice — no pressure, no audience, no expectations. You're exploring a tiny musical space (3 notes) with complete freedom.",
      wrong: "If you're trying to make it sound 'good' or create a melody, you're adding pressure that doesn't belong here. Let go of product. This is process only.",
      sarah: "Gene, this is the exercise the curriculum was missing. You know the notes from Level 2. Now forget the rules and just play with them. Think of it like paddling around a break without trying to catch a wave — just being in the water.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-2",
      time: 6,
      title: "One-Note Rhythm Play",
      type: "vocal",
      what: "Sing ONLY the note A while strumming Am. Vary nothing except rhythm — long notes, short bursts, rests, syncopation. By removing pitch decisions entirely, you isolate rhythmic creativity and build groove independence between voice and guitar.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing A as a whole note — 4 beats long. Then as two half notes. Then as four quarter notes. Feel how the same note changes character with rhythm.", why: "One pitch removes all melodic decision-making. Your brain is 100% focused on rhythmic creativity — which is where most groove comes from." },
        { text: "Now go free: sing A in any rhythm you want. Try short bursts (da-da-da). Try long holds with silence between. Try syncopation — landing between the beats.", why: "Rhythmic improvisation on a single note is what drummers do with a snare. Your voice becomes a rhythmic instrument, not just a melodic one." },
        { text: "Try matching the guitar's rhythm exactly (voice doubles the strum). Then try the opposite — voice fills the spaces between strums.", why: "Matching the guitar teaches rhythmic lock. Filling the gaps teaches rhythmic independence. Both are essential for singer-songwriting." },
        { text: "2-minute freestyle: sing A in any rhythm that comes to you. Let patterns emerge and dissolve. Don't repeat anything on purpose — let it flow.", why: "Extended single-note rhythmic play builds the rhythmic vocabulary that will power your melodies in Level 4." }
      ],
      feel: "This should feel percussive — your voice is a drum that happens to be pitched. The groove matters more than the note.",
      wrong: "If you catch yourself changing pitch (moving to C or E), gently come back to A. The constraint IS the exercise. One note, infinite rhythms.",
      sarah: "Gene, think of this like a reggae DJ toaster riding a riddim — one note, all groove. The rhythm is the melody. When you add pitch variety later, this rhythmic confidence will already be there.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "A3"),
      recorder: true
    },
    {
      id: "ss-3-3",
      time: 8,
      title: "Guitar-Voice Conversation",
      type: "vocal",
      what: "Play a short guitar phrase (2 bars), then answer it with your voice using chord tones (2 bars). Then reverse — sing first, answer on guitar. This is the oldest improvisation format in music and the foundation of musical conversation.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play a simple 2-bar melody on guitar using the Am pentatonic (A-C-D-E-G on frets 5-8). Then answer with your voice: sing a 2-bar response using chord tones (A-C-E). Guitar calls, voice answers.", why: "Call and response separates the two tasks in time — you're never doing both at once. This builds the conversational instinct between your instruments." },
        { text: "Make the guitar call short (2-3 notes). Keep the vocal answer short too. Leave space between them — silence is part of the conversation.", why: "Space between phrases is what makes improvisation sound musical rather than frantic. The rests let ideas breathe." },
        { text: "Now reverse: sing a chord-tone phrase first, then answer it on guitar. Let the guitar respond to what the voice suggested.", why: "Reversing the roles trains your ear to hear melodic ideas in your voice and translate them to guitar — the core singer-songwriter skill." },
        { text: "Alternate freely: sometimes guitar leads, sometimes voice leads. Let the conversation flow naturally for 3 minutes.", why: "Free alternation develops the fluid back-and-forth that defines great singer-songwriting — voice and guitar as equal partners, not leader and follower." }
      ],
      feel: "This should feel like a conversation between two musicians — except both musicians are you. The guitar says something, the voice responds. Playful, relaxed, exploratory.",
      wrong: "If your responses are identical to your calls (exact echo), push for variety. A good response acknowledges the call but adds something new — different rhythm, different direction, different energy.",
      sarah: "Gene, Khruangbin does this constantly — Mark plays a guitar phrase, Laura answers with her voice. You're building that same conversational instinct between your own hands and voice.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-4",
      time: 8,
      title: "Chord Tone Improv Over Changes",
      type: "vocal",
      what: "Strum Am-C-G-Em and freely improvise using each chord's tones as it passes. Sing on 'la' or 'ooh.' No phrases to compose, no melody to remember — just follow the chords and let your voice find notes that fit. This is the core of ear-guided improvisation.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am (4 beats). Sing any combination of A-C-E in any rhythm. When the chord changes to C, shift to C-E-G. Don't plan ahead — just follow the chord change.", why: "Following chord tones by ear trains your voice to track harmony in real time. This is the skill that makes songwriting feel instinctive rather than calculated." },
        { text: "Continue through G (G-B-D) and Em (E-G-B). One chord per bar. Let your voice wander freely within each chord's tones. Some bars will sound great, some won't — both are fine.", why: "Permitting 'bad' bars removes performance anxiety. Improvisation is a numbers game — the more you generate, the more gems you find." },
        { text: "Loop the progression 8 times. Try to make each pass different: vary rhythm, direction, register, how many notes you sing per bar. Sometimes sparse, sometimes dense.", why: "Variety across repetitions builds a large vocabulary of melodic gestures. You're training your ear to find multiple paths through the same harmonic landscape." },
        { text: "On the last 2 loops, notice which moments felt best. Don't try to recreate them — just notice. That noticing instinct is what you'll use in Level 4 when you start composing.", why: "Awareness without attachment is the bridge from improvisation to composition. You're training your ear to recognize good ideas in the flow." }
      ],
      feel: "Your voice should feel like it's being gently pulled by the chords — each chord change offers new notes, and your voice follows the gravity. Relaxed, responsive, unhurried.",
      wrong: "If you're singing the same pattern on every chord (e.g., always root-3rd-5th ascending), you're in drill mode, not improv mode. Break the pattern. Try starting on the 5th. Try holding one note across a chord change. Surprise yourself.",
      sarah: "Gene, this is the exercise that connects your ear to your voice. When you can follow chord changes by feel — without thinking about which notes are 'allowed' — songwriting becomes conversation, not calculation.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-3-5",
      time: 8,
      title: "Emotional Color",
      type: "vocal",
      what: "Same three chord tones (A-C-E), same Am strum — but sing them with three completely different emotional colors. First: lazy sunset. Then: driving energy. Then: mystery. Expression is improvisation too — how you sing matters as much as what you sing.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Strum Am. Sing A-C-E with 'lazy sunset' energy: slow, breathy, lots of space between notes. Think DOPE LEMON on the porch at golden hour. Let notes hang in the air.", why: "Emotional intention transforms identical notes into completely different music. The same A-C-E can sound peaceful, urgent, or mysterious depending on delivery." },
        { text: "Same notes, new color: 'driving energy.' Shorter notes, more rhythmic, slightly louder, more forward in the beat. Think Skinshape locked into a groove.", why: "Energy and urgency come from rhythm and attack, not from higher notes or louder volume. Your porch register can drive just as hard as a belt." },
        { text: "Same notes, third color: 'mystery.' Sing quietly, leave long silences, let notes decay into nothing before the next one. Think Tinariwen in the desert at night.", why: "Mystery comes from space and restraint. Fewer notes, more silence, letting the listener's imagination fill the gaps." },
        { text: "Free round: improvise with A-C-E while shifting between all three colors — sunset drifts into energy, energy dissolves into mystery, mystery warms into sunset. 2 minutes, no plan.", why: "Emotional fluidity is the highest form of vocal improvisation. When you can shift feeling in real time, your songs will have dynamic range that keeps listeners engaged." }
      ],
      feel: "Each emotional color should feel physically different — lazy sunset relaxes your jaw and throat, driving energy engages your diaphragm, mystery pulls your voice back and quiets it. The body leads the expression.",
      wrong: "If all three colors sound the same, you're not committing to the emotion. Exaggerate! Make the sunset version absurdly lazy. Make the energy version almost aggressive. The middle ground will find itself.",
      sarah: "Gene, your artists all do this instinctively — Allah-Las shift from dreamy to intense within a single song. You're building that same emotional range, but with just three notes. The notes don't change; you do.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-3-6",
      time: 8,
      title: "3-Minute Freestyle",
      type: "song",
      what: "The fluency test. Strum any chord progression and sing chord tones freely for 3 minutes without stopping, over a backing track. Vary rhythm, dynamics, emotional color, and phrase shape. Record it and listen back. If you can sustain 3 minutes of free vocal improvisation while strumming, you're ready to start composing.",
      setup: "Guitar. Choose your backing track. Pick a chord progression you can strum on autopilot: Am-C-G-Em, G-C-D-Em, or any combination from Level 1.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        { text: "Pick a backing track that fits your mood. Start strumming your chord progression. Take 4 bars of just strumming to lock into the groove.", why: "Grooving without singing first establishes the autopilot. Your guitar needs to be invisible before the voice enters." },
        { text: "Begin singing chord tones freely. Use everything from this level: vary rhythm (ss-3-2), respond to the guitar (ss-3-3), follow the chord changes (ss-3-4), shift emotional color (ss-3-5). No plan — just play.", why: "This exercise integrates all the improv skills from this level into one sustained performance. It's the synthesis that proves fluency." },
        { text: "Keep going for 3 full minutes. If you get stuck, hold a single note until the next idea comes. If the strum breaks, simplify to downstrokes and rebuild. Don't stop.", why: "Sustained improvisation is a different skill from short bursts. Three minutes builds the endurance and trust needed for songwriting sessions where ideas need time to emerge." },
        { text: "Record the whole thing. Listen back without judgment. Notice: which moments felt natural? Where did you surprise yourself? Those natural moments are your songwriting instincts at work.", why: "Listening back trains your inner critic to be an ally, not an enemy. The phrases that sounded good came from somewhere real — that's the musical intuition you'll use in Level 4." }
      ],
      feel: "By minute two, you should stop thinking about notes and start feeling the music. The chord tones become automatic. Your voice becomes an extension of the groove. That's fluency.",
      wrong: "If you can't sustain 3 minutes without the strum breaking down or the voice going silent for more than 4 beats, revisit earlier exercises in this level. Fluency means continuity — the ability to keep the musical conversation going.",
      sarah: "Gene, this is the graduation exercise. Three minutes of free vocal improvisation over your own guitar. When this feels natural — when the voice and guitar are just two streams of the same river — you're ready to channel that flow into songs.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true,
      levelUp: "Can sustain 3 minutes of chord-tone improvisation over a backing track while strumming — varied rhythm, dynamics, and phrase shapes — without stopping or losing the strum groove."
    }
  ]
};
