import { getPitchRange } from "../appData.js";

export const level14 = {
  level: 14,
  title: "Performance & Identity",
  subtitle: "You are a singer-songwriter. Act like one.",
  description:
    "Everything converges: technique, songwriting, improvisation, and the courage to share your music with another person. This level focuses on performance psychology, live improvisation, building a set of originals, and discovering your musical identity. Based on Csikszentmihalyi's flow state research: performing with 4% challenge above skill level creates optimal experience.",
  artists: "Your own sound — the artist you've been building since Level 1",
  unlocks: "The rest of your musical life",
  review: { label: "Full Check-In", time: 5, exercises: ["ss-9-7", "ss-13-5"], prompt: "Play your strummed original (ss-9-7) and your fingerpicked original (ss-13-5) back to back. If both feel performance-ready, you're ready for Level 14." },
  exercises: [
    {
      id: "ss-14-1",
      time: 8,
      title: "Improvise Lyrics Live",
      type: "vocal",
      what: "Strum a progression and make up lyrics on the spot about what you see, hear, and feel. No filter, no editing, no stopping. This is the ultimate integration of every skill: autopilot guitar, pentatonic melody, rhythmic feel, observational lyrics — all in real time.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum or play a backing track. Close your eyes (or look out a window). Start singing words — describe what you see. 'Morning light through the blinds, coffee getting cold...'", why: "Present-tense observation is the easiest improv source. You're reporting reality in melody. No imagination needed — just attention." },
        { text: "Don't stop. Even if you run out of things to describe, keep singing. Make up a story. Follow a thought. The words will come.", why: "Improvised lyrics train the instant connection between thought and voice. The filter disappears. What remains is authenticity." },
        { text: "If you get stuck, repeat a phrase and change one word each time. 'The water's warm today / the water's gone today / the summer's gone today.'", why: "Repetition with variation is a legitimate songwriting technique. Many great choruses are built exactly this way." },
        { text: "Do this for 5 full minutes. Record all of it. Later, listen for any phrases or melodies worth keeping.", why: "Improv sessions are gold mines. 95% is exploration, but the 5% that works can seed real songs." }
      ],
      feel: "Lyric improv should feel vulnerable and freeing simultaneously. You're bypassing your inner critic. What comes out might surprise you — some of your most honest writing happens when you're not trying.",
      wrong: "If you're stopping to think between lines, you're not improvising — you're composing slowly. Keep the flow going even if the words are nonsense. Flow first, quality later.",
      sarah: "Gene, some of your best song ideas will come from these improv sessions. The conscious mind writes clever lyrics. The improvising mind writes honest ones.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-14-2",
      time: 10,
      title: "Record & Self-Critique",
      type: "record",
      what: "Record your best original — performed with dynamics, intention, and the warm/analog aesthetic you love. Listen back with a notebook. Write: one thing that worked, one thing to improve. This replaces a teacher's feedback.",
      setup: "Guitar. Recorder. Notebook. Quiet room. If possible, add some reverb to your voice (even a bathroom has natural reverb).",
      steps: [
        { text: "Warm up: play through the song once without recording. Shake out any nerves.", why: "The warm-up pass primes your muscle memory and lets you make mistakes without pressure." },
        { text: "Record. Play the song from start to finish. Dynamic arc, vocal intention, the whole performance. Don't stop for mistakes.", why: "A full performance recording reveals the truth. It shows what works and what needs work in context." },
        { text: "Listen back immediately. With a notebook, write: (1) One specific thing that worked well. (2) One specific thing to improve.", why: "Self-critique is the most important meta-skill. Balanced feedback (positive + improvement) prevents both complacency and discouragement." },
        { text: "Work on the improvement area for 5 minutes. Then record the whole song again. Compare the two takes.", why: "Immediate recording-critique-improvement cycles are the fastest path to growth. Each take should be measurably better than the last." }
      ],
      feel: "Recording yourself is always slightly uncomfortable — you hear flaws you didn't notice while playing. That discomfort is the sound of growth. Embrace it.",
      wrong: "If you're doing 10 takes trying to get a 'perfect' one, you're missing the point. Two takes with a critique in between is better than 10 takes with no reflection.",
      sarah: "Gene, aim for that warm, lo-fi aesthetic you love — a little room reverb, relaxed delivery, imperfect but real. Your recordings don't need to sound like a studio. They need to sound like you.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      checklist: true,
      recorder: true
    },
    {
      id: "ss-14-3",
      time: 6,
      title: "Build Your Set",
      type: "song",
      what: "Organize your originals into a 20-minute set. Sequence them for variety: alternate tempos, keys, moods, and guitar techniques (strummed vs fingerpicked). This is your calling card as a singer-songwriter.",
      steps: [
        { text: "List all your performable originals. Which ones can you play start-to-finish without major breaks? Be honest.", why: "A performable song is one you can play reliably, not just occasionally. Be honest about which songs are ready." },
        { text: "Pick 5-6 originals. Mix genres: one reggae, one surf, one fingerpicked, one soul. Vary tempos and keys. Variety keeps the set interesting.", why: "Genre variety shows range. Alternating fast/slow, loud/soft, strummed/fingerpicked creates a dynamic set." },
        { text: "Sequence them: strong opener (your most confident song), build to your most emotional original in the middle, end with your most fun/groovy piece.", why: "Set sequencing is a performance skill. The arc of the set mirrors the arc of a song — build, peak, resolve." },
        { text: "Write out the set list. Practice the transitions between songs. No dead air — strum the next song's intro while finishing the current one.", why: "Transitions are the connective tissue of a set. Smooth transitions create the illusion of one continuous musical experience." }
      ],
      feel: "Having a set list of all originals should feel like owning a body of work. You wrote these. You arranged these. You perform these. That's a catalog.",
      wrong: "If you don't have 5 performable originals yet, include 3-4 and make the set shorter. A short, strong set beats a long, shaky one.",
      sarah: "Gene, this set list is proof of everything you've built. From autopilot strumming to original songs to a complete performance. Write it on a piece of paper. Put it on your wall.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-14-4",
      time: 8,
      title: "Playing for One",
      type: "song",
      what: "Perform your best song for an audience of one — Court, a friend, a family member. This exercise focuses on the psychology of performing, not the music. Notice what changes in your body and mind when someone is listening.",
      setup: "Guitar. Your strongest original. One person willing to listen for 4 minutes.",
      steps: [
        { text: "Before you start: notice where in your body you feel nervous. Shoulders tense? Hands shaky? Stomach tight? Name the sensation.", why: "Naming physical sensations reduces their power. Anxiety thrives in the unnamed — once you say 'my hands are shaky,' the shakiness becomes manageable." },
        { text: "Start with your most confident song. Play it all the way through. Let this anchor your confidence.", why: "Starting with strength builds momentum. Professional performers always open with a safe bet." },
        { text: "Before your second song: take 3 slow breaths. Tell yourself 'this song is mine — it doesn't need to be perfect, it needs to be real.' Then play.", why: "The breath interrupts the anxiety spiral. The self-talk reframes the goal: authenticity over perfection." },
        { text: "During the song, look up at your listener at least twice. Not for approval — just to include them. Eye contact turns playing-in-front-of-someone into playing-FOR-someone.", why: "Eye contact transforms the dynamic from audition (being judged) to connection (sharing something)." },
        { text: "After: ask them what they FELT, not what they thought. 'What did it make you feel?' is a better question than 'Was it good?'", why: "Emotional feedback tells you whether your music communicates what you intended. Technical feedback isn't useful at this stage." }
      ],
      feel: "This should feel vulnerable — and that's the point. The gap between practice-room you and performing-for-someone you is the gap this exercise closes.",
      wrong: "If you apologized before, during, or after playing, notice that. Apologizing undermines the performance. Play, then listen to their reaction. No disclaimers.",
      sarah: "Gene, the lanai with Court is your first stage. This isn't a concert — it's a moment of sharing. The nervousness is exactly what every musician feels. The difference is that you play anyway.",
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-14-5",
      time: 10,
      title: "Jam Circle",
      type: "play",
      what: "The ultimate integration: jam with another musician (or backing tracks as your band). Trade roles — you comp while they solo, they comp while you solo. Trade fours: 4 bars of guitar, 4 bars of voice, alternating. This is real-time musical conversation.",
      setup: "Another musician (ideal) or backing tracks. Guitar. Recorder.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "With a partner: agree on a key and a groove (Am, reggae feel at 85 BPM). One person strums chords, the other improvises melody. Trade after 8 bars.", why: "Trading roles teaches you both sides of the jam — supporting and leading. A good jammer does both." },
        { text: "Trade fours: play a 4-bar guitar phrase, then sing a 4-bar vocal response. The voice and guitar take turns being the soloist.", why: "Trading fours forces you to listen to what you just played and respond vocally." },
        { text: "Solo with backing track: play the track, strum along for the first cycle, then drop guitar and improvise vocals for the next cycle. Alternate.", why: "Backing tracks give you a band to jam with. The principle is the same — trade roles between voice and guitar." },
        { text: "Full free jam: no rules, no structure. Play guitar when it feels right, sing when it feels right, do both when it feels right. Record everything.", why: "Free jamming is the endpoint of all this training. Every skill — autopilot strumming, pentatonic singing, call and response, harmonic navigation — comes together here." }
      ],
      feel: "A good jam feels like flying — you stop planning and start reacting. The music leads and you follow. When voice, guitar, and groove all lock in, you'll know it in your body.",
      wrong: "If you're stuck playing safe patterns, push into unfamiliar territory. Try a note you haven't tried. Play a chord you don't usually use. Mistakes in jams become discoveries.",
      sarah: "Gene, this is what it all leads to — picking up the guitar and making music in the moment, with or without other people. Every exercise in this curriculum was building toward this freedom.",
      metronome: 85,
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-14-6",
      time: 10,
      title: "The Golden Hour",
      type: "play",
      what: "Perform your full set for an audience of one — Court, a friend, a phone camera, or a mirror. No stopping, no apologizing, no restarting. This is performance. Start to finish. Your originals, your arrangements, your voice.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Set up your space. Chair, guitar, water. Set up a recording device (phone camera is perfect). This is your stage.", why: "Creating a performance environment — even a living room — signals to your brain that this is real." },
        { text: "Tell your audience (even if it's a camera): 'I'm going to play my set.' Then start. No preamble, no apologies.", why: "The moment you announce and begin, you're performing. The commitment is the performance." },
        { text: "Play all your songs. Transitions between songs. Dynamic arcs within songs. Eye contact with your audience. If you make a mistake, keep going.", why: "Playing through mistakes is the most important performance skill. The audience doesn't know what you planned — they only know what you played." },
        { text: "After the last song, stop. Breathe. You just performed a set of original music. Thank your audience. Stop the recording.", why: "The ending matters. A clean ending with a moment of stillness is more powerful than trailing off." }
      ],
      feel: "The Golden Hour should feel like the culmination of everything — every level, every exercise, every rough song and awkward recording. Nervous energy channeled into performance.",
      wrong: "If you stop to restart a song, you've broken the performance contract. In a real set, you push through. If the nerves are overwhelming, start with your strongest song — let momentum carry you.",
      sarah: "Gene, save this recording. Date it. This is your Golden Hour — the moment you went from 'learning guitar' to 'performing as a singer-songwriter.' Everything before was preparation. This is the thing itself.",
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-14-7",
      time: 5,
      title: "Your Musical Voice",
      type: "song",
      what: "Reflection exercise. Record a voice memo answering: What genres feel most like me? What do my songs want to say? What kind of singer-songwriter am I becoming? This isn't performing — it's discovering.",
      steps: [
        { text: "Put down the guitar. Just talk into the recorder. What music have you been drawn to throughout this curriculum?", why: "Your choices reveal your identity. The genres you gravitated toward, the melodies you improvised, the lyrics you wrote — they point somewhere." },
        { text: "What themes keep appearing in your lyrics? Ocean? Travel? Home? Loss? Joy? What does your music care about?", why: "Themes are your artistic territory. Knowing your themes helps you write more intentionally." },
        { text: "What does your voice want to sound like? Laid-back and warm? Raw and vulnerable? Playful? Atmospheric?", why: "Vocal identity is as important as lyric identity. Your delivery IS your brand." },
        { text: "One sentence: 'I am a singer-songwriter who ______.' Fill in the blank. Say it out loud.", why: "Declaring your identity makes it real. You're not becoming a singer-songwriter — you are one." }
      ],
      feel: "This should feel like a moment of recognition — looking back at the path and realizing how far you've come. From autopilot strumming to a personal artistic identity.",
      wrong: "If you can't answer these questions, that's data too. It means you haven't found your voice YET — and that's part of the journey. Keep writing, keep performing, keep listening.",
      sarah: "Gene, 'Coastal Psychedelic Omnivore' is your listening identity. Now you've built your creating identity. They're related but distinct. Your music comes from your taste, and your taste is uniquely yours.",
      recorder: true,
      levelUp: "You have a personal catalog of original songs, can perform fingerpicked and strummed pieces with dynamic range, improvise lyrics and melodies in real time, and have discovered your musical identity as a singer-songwriter."
    }
  ]
};
