import { getPitchRange } from "../appData.js";

export const level15 = {
  level: 15,
  title: "Performance & Identity",
  subtitle: "You are a singer-songwriter. Act like one.",
  description:
    "Everything converges: technique, songwriting, improvisation, and the courage to share your music with another person. This level focuses on performance psychology, live improvisation, building a set of originals, and discovering your musical identity. Based on Csikszentmihalyi's flow state research: performing with 4% challenge above skill level creates optimal experience. In Level 3, you learned to hear one note before singing it. Now, entire songs pass through the hear-feel-choose cycle in real time. The cycle that took 10 seconds per note now runs continuously, automatically, beautifully. You don't 'do' embodiment; you ARE embodied. Every note passes through your whole being before it becomes sound. This is what mastery sounds like: the music flows through you, not from you.",
  artists: "Your own sound — the artist you've been building since Level 1",
  unlocks: "The rest of your musical life",
  review: { label: "Full Check-In", time: 5, exercises: ["ss-10-7", "ss-14-5"], prompt: "Play your strummed original (ss-10-7) and your fingerpicked original (ss-14-5) back to back. If both feel performance-ready, you're ready for Level 14." },
  exercises: [
    {
      id: "ss-15-1",
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
      feel: "Lyric improv should feel vulnerable and freeing simultaneously — the body leading, the mind following. Words emerge from the same place melodies do: heard internally, felt in the body, chosen by instinct, produced before the conscious mind can edit. This is the embodiment cycle running at full speed on language, harmony, and rhythm simultaneously. What comes out might surprise you because your body knows things your mind hasn't articulated yet.",
      wrong: "If you're stopping to think between lines, you're not improvising — you're composing slowly. Keep the flow going even if the words are nonsense. Flow first, quality later.",
      sarah: "Gene, some of your best song ideas will come from these improv sessions. The conscious mind writes clever lyrics. The improvising mind writes honest ones.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── PERFORMANCE PSYCHOLOGY ───

    {
      id: "ss-15-2",
      time: 6,
      title: "Pre-Performance Routine",
      type: "play",
      what: "Create a personal warm-up ritual that becomes your trigger for performance mode. Two minutes physical, two minutes vocal, one minute mental. A consistent pre-performance routine reduces cortisol and anxiety — the same sports psychology technique used by elite athletes before competition.",
      steps: [
        { text: "Physical warm-up (2 min): stretch your neck side to side, roll your shoulders back 10 times, open and close your jaw wide, shake out your hands. Release all the tension your body is holding.", why: "Performance anxiety lives in the body first — tight shoulders, locked jaw, stiff hands. Physical release before playing prevents tension from creeping into your technique." },
        { text: "Vocal warm-up (2 min): hum a scale up and down your range. Do 30 seconds of lip trills. Sing a few long, easy notes in your sweet spot (E3-A4). Wake up your voice without straining it.", why: "A cold voice cracks and wobbles. Two minutes of gentle warm-up brings blood flow to the vocal folds and primes your pitch accuracy." },
        { text: "Mental set (1 min): three slow, deep breaths. On each exhale, release one worry. Then set an intention — not 'play perfectly' but something like 'I'm going to enjoy this' or 'I'm sharing something real.'", why: "Intention-setting reframes performance from evaluation to expression. Sports psychology research: athletes who set process intentions ('stay relaxed, have fun') outperform those who set outcome intentions ('don't mess up')." },
        { text: "Do this routine before every practice session this week. Same order, same timing. Let it become automatic — your brain's cue that it's time to play.", why: "Consistency is the key. A ritual only works as an anxiety-reducer when it's been repeated enough to become a conditioned trigger for calm focus." }
      ],
      feel: "The routine should feel like waking up the body's musical self — releasing tension from the shoulders where anxiety lives, warming the voice where expression lives, settling the breath where grounding lives. The transition from 'person sitting with a guitar' to 'embodied musician about to play' should be tangible: your body shifts from everyday mode to musical mode, and the hear-feel-choose cycle activates like an engine warming up.",
      wrong: "If you're rushing through the routine to get to playing, you're treating it as a chore instead of a tool. Slow down. The routine IS part of the performance.",
      sarah: "Gene, every musician you admire has some version of this. It's not superstition — it's conditioning. Your body learns that this sequence means 'we're about to play,' and it responds by settling into readiness. Performance anxiety reduction techniques consolidate better with sleep between practice sessions. Run through your pre-performance routine today, then test it tomorrow — you'll find it more automatic.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-15-3",
      time: 7,
      title: "Process Focus vs Outcome Focus",
      type: "play",
      what: "Train yourself to think in process-focused self-talk during performance. Process focus: 'lean forward, breathe, feel the groove.' Outcome focus: 'that was wrong, I sounded bad.' One helps. The other sabotages. This exercise rewires your inner monologue while playing.",
      steps: [
        { text: "Play one of your originals. As you play, notice your internal monologue. Are you thinking 'am I expressing this phrase?' (process) or 'am I hitting the notes?' (outcome)? Just observe — don't try to change it yet.", why: "Awareness is the first step. Most musicians don't realize how evaluative their inner monologue is during performance. You can't change what you don't notice." },
        { text: "Play the song again. This time, use ONLY process-focused thoughts: 'breathe into the phrase,' 'relax the right hand,' 'feel the downbeat,' 'lean into the lyric.' When an evaluative thought arises ('that note was flat'), notice it and redirect to process.", why: "Process focus keeps attention on what you're doing NOW, not on what just happened. Evaluative thoughts pull you into the past — and the past can't be changed mid-performance." },
        { text: "Play a third time with a deliberate mistake planted somewhere — wrong chord, lyric swap, whatever. Keep your process focus through the mistake. Don't react, don't grimace, don't stop. Just redirect: 'next phrase, lean in, breathe.'", why: "The real test of process focus is surviving a mistake without spiraling. If you can stay in process mode through an error, you can stay in it through anything." },
        { text: "Record this third pass. Listen back — does the planted mistake actually ruin the performance? Almost always, it doesn't. The audience hears the recovery, not the error.", why: "Hearing proof that mistakes don't destroy a performance is the most powerful antidote to perfectionism. Your inner critic exaggerates the damage." }
      ],
      feel: "Process focus should feel like meditation while playing — present-tense, non-judgmental, attentive to the body. 'Breathe into the phrase' is an embodiment cue. 'Feel the downbeat' is an embodiment cue. Every process-focused thought returns you to the body, where the music lives. Outcome focus ('was that note right?') lives in the head. Process focus lives in the body. The music actually sounds better because you're staying embodied instead of retreating into judgment.",
      wrong: "If you notice yourself keeping score ('I had 3 evaluative thoughts that time'), that's still outcome focus. The goal is not zero evaluative thoughts — it's gently redirecting each time one appears.",
      sarah: "Gene, this is the single biggest performance psychology tool. Every professional musician deals with evaluative thoughts — the difference is they've trained themselves to redirect. It's a skill, not a personality trait.",
      recorder: true
    },
    {
      id: "ss-15-4",
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

    // ─── SONGWRITING CRAFT & COLLABORATION ───

    {
      id: "ss-15-5",
      time: 8,
      title: "Vertical Editing: Full Song Polish",
      type: "song",
      what: "Take your best original through five systematic refinement passes — melody, lyrics, dynamics, prosody, and guitar texture. Vertical editing means working one dimension at a time across the entire song, rather than polishing section by section. Systematic refinement, not inspiration-dependent.",
      steps: [
        { text: "Pass 1 — Melody: sing through the entire song focusing only on melodic shape. Smooth any awkward intervals. Does every phrase resolve naturally? Is there one melodic moment that stands out as the hook?", why: "Melody is the first thing a listener remembers. Smoothing awkward intervals and clarifying the hook ensures the song is singable and memorable." },
        { text: "Pass 2 — Lyrics: read every lyric out loud (don't sing). Replace one generic word per verse with something specific. 'The sky' becomes 'the Kailua sky.' 'A feeling' becomes 'that 4pm feeling.'", why: "Specificity is the difference between forgettable and vivid. Generic words describe everyone's experience. Specific words describe YOUR experience — and paradoxically, that's more universal." },
        { text: "Pass 3 — Dynamic arc: plan the energy journey of the whole song. Where's the quietest moment? Where's the peak? Mark them. Does the energy build and release, or does it flatline?", why: "Songs without dynamic arc sound monotonous even if the melody and lyrics are strong. The arc is the emotional architecture — it tells the listener when to lean in and when to exhale." },
        { text: "Pass 4 — Prosody: speak every lyric in rhythm. Do the stressed syllables land on strong beats? Does 'beau-TI-ful' land as 'BEAU-ti-ful' on the beat? Fix any misalignments.", why: "Prosody mismatches — stressed syllables on weak beats — make lyrics feel clumsy even when the words are good. Aligning stress and beat makes singing feel effortless." },
        { text: "Pass 5 — Guitar texture: vary your guitar approach between sections. Strum the verse, fingerpick the chorus (or vice versa). Add a palm-muted intro. Let the guitar texture reinforce the dynamic arc.", why: "Guitar texture variety is the arrangement tool of the solo performer. Changing from strum to fingerpick between sections creates the effect of a full band arrangement." }
      ],
      feel: "Vertical editing should feel like refining the body's relationship with each dimension of the song. The melody pass tunes the voice's path through the body. The dynamics pass shapes the body's energy arc. The texture pass changes what the hands feel. Each pass makes the song more embodied — more physically natural to perform — and the song doesn't change identity; it becomes more itself.",
      wrong: "If you're rewriting the whole song during editing, you've switched from editing to composing. The song's core should stay intact. You're refining, not reinventing.",
      sarah: "Gene, this is how professional songwriters work. The first draft is the raw material. The editing is the craft. Your songs are already good — this process makes them undeniable.",
      checklist: true,
      volumeContour: true,
      recorder: true
    },
    {
      id: "ss-15-6",
      time: 8,
      title: "Duo Singing",
      type: "vocal",
      what: "Prepare a song for singing with Court from the 'Sing with Court' playlist. Map the vocal arrangement: who sings lead, who sings harmony, where you blend. Duo singing is conversational — sometimes you lead, sometimes you support, sometimes you merge into one sound.",
      steps: [
        { text: "Pick a song from the 'Sing with Court' playlist. Listen to the original and identify the melody line. Sing it through in your range (E3-A4) to confirm it sits comfortably.", why: "Starting with a song you both know removes the learning curve and lets you focus on the duo arrangement — who sings what, and when." },
        { text: "Map the arrangement: verse 1 — you sing lead, Court hums or sings a simple harmony. Chorus — both sing the melody in unison. Verse 2 — Court sings lead, you harmonize. Final chorus — full blend.", why: "A good duo arrangement varies who leads and who supports. Constant unison is boring. Constant harmony is exhausting. The variety creates a conversation." },
        { text: "Practice YOUR harmony part alone. If Court sings the melody, where do you go? Try a 3rd above on the chorus. Try a 6th below on the verse. Find what sounds natural in your voice.", why: "Harmony parts must be practiced alone first. If you can't sing your part confidently by yourself, you'll drift back to the melody when singing together." },
        { text: "Sing through the full arrangement with the recording as a stand-in for Court. Record your harmony part. Is it smooth, singable, and distinct from the melody?", why: "Recording yourself singing harmony reveals whether your part is truly independent or secretly shadowing the melody. A good harmony has its own melodic logic." }
      ],
      feel: "Duo singing should feel like a conversation between two bodies making music — two separate embodiment cycles that sync up in the blend moments. When voices merge into harmony, there's a physical sensation: a warmth in the chest, a slight vibration that wasn't there when singing alone. The blend moments should give you chills — and those chills are the body recognizing that two voices have become one sound.",
      wrong: "If you're always singing the melody and hoping Court will 'figure out a harmony,' that's not an arrangement — that's avoidance. Do the work of mapping who sings what.",
      sarah: "Gene, singing with Court on the lanai is exactly what this curriculum was building toward. Two voices, one guitar, golden hour light. Prepare the arrangement so the moment can be effortless.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["E3", "A3", "C4", "E4"], label: "Duo Harmony", range: ["E3", "E4"] },
      recorder: true
    },
    {
      id: "ss-15-7",
      time: 8,
      title: "Song a Week Challenge",
      type: "song",
      what: "Write one complete song per week for four weeks. Rules: must be finished (verse + chorus minimum), must be recorded, no editing allowed until the following week, quality doesn't matter — quantity does. Creative confidence research shows the gap between taste and ability closes through volume of output, not through being more careful.",
      steps: [
        { text: "Week 1: write and record a song in one session. Set a timer for 45 minutes. Whatever you have at the end is the song. Verse, chorus, done. Record it. Move on.", why: "The timer eliminates perfectionism. You can't overthink a song when the clock is running. The constraint forces decisions — and decisions are what finishing requires." },
        { text: "Week 2: same rules. Different song. Don't revisit Week 1's song yet. The temptation to fix last week's song is strong — resist it. Forward momentum only.", why: "The 'no editing until next week' rule prevents the perfectionism loop where you polish one song forever instead of writing new ones. Volume builds skill faster than polish." },
        { text: "Week 3: same rules. By now you'll notice patterns — chord progressions you default to, lyric themes that keep appearing, melodic shapes you favor. These patterns ARE your style emerging.", why: "Style isn't something you choose — it's something that reveals itself through volume. Three songs in three weeks will show you more about your artistic identity than three months of polishing one song." },
        { text: "Week 4: write and record your fourth song. Then — and only then — go back and listen to all four. Pick the strongest one for vertical editing (ss-15-5). The other three are finished as-is.", why: "Four songs in four weeks means you have a catalog growing at real speed. One polished gem plus three rough originals is better than zero finished songs after a month of trying to write one perfect one." }
      ],
      feel: "This challenge should feel liberating and slightly terrifying. Liberating because you're free to write badly. Terrifying because there's nowhere to hide — every week demands a finished product.",
      wrong: "If you're spending the whole week agonizing over one song, you've missed the point. The song should be written and recorded in one or two sessions, then left alone. Speed is the teacher here.",
      sarah: "Gene, this is how prolific songwriters work. Bob Dylan wrote 'Blowin' in the Wind' in 10 minutes. Not every song needs to be precious. Write fast, write often, and your best work will surprise you.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-15-8",
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

    // ─── FLOW & EXPOSURE ───

    {
      id: "ss-15-9",
      time: 8,
      title: "Flow State Finder",
      type: "play",
      what: "Identify your personal flow triggers using Csikszentmihalyi's challenge-to-skill framework. Play three sessions at different difficulty levels to map your boredom zone, anxiety zone, and flow zone. Your flow zone is where practice and performance should live.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Session 1 — Boredom zone: play your easiest, most automatic material at a comfortable tempo for 2 minutes. Notice how it feels. Relaxed? Distracted? Mind wandering? That's boredom — skill far exceeds challenge.", why: "The boredom zone feels safe but produces no growth and no engagement. If your practice always lives here, you'll plateau. It's useful for warm-ups but not for development." },
        { text: "Session 2 — Anxiety zone: play your hardest material at a fast tempo for 2 minutes. Notice how it feels. Tense? Frustrated? Hands locking up? That's anxiety — challenge far exceeds skill.", why: "The anxiety zone feels like failure. Practicing here breeds frustration and reinforces mistakes. It's useful for brief stretch moments but not for sustained practice." },
        { text: "Session 3 — Flow zone: play moderately challenging material at your sweet tempo (85-100 BPM) for 3 minutes. Notice the difference. Engaged but not stressed? Challenged but capable? Time passing quickly? That's flow.", why: "Flow requires roughly 4% challenge above current skill level. You're stretching but not breaking. This is where the deepest learning and the best performances happen." },
        { text: "Write down what you played in each session and how each felt. Your flow zone material and tempo is your practice sweet spot. Return here whenever practice feels stale or stressful.", why: "Knowing your zones lets you self-regulate. Bored? Increase difficulty. Anxious? Decrease it. The goal is to stay in the flow channel — the narrow band between too easy and too hard." }
      ],
      feel: "The flow zone session should feel qualitatively different — time distortion, effortless concentration, the body and the music becoming one thing. Csikszentmihalyi's flow is what happens when the embodiment cycle becomes completely automatic: hear-feel-choose-produce runs so fast it disappears, and what remains is just... music, moving through you. The body plays, the voice sings, and the conscious mind watches from a quiet, appreciative distance. Once you've felt it, you'll recognize it in your body immediately.",
      wrong: "If all three sessions felt the same, you didn't vary the difficulty enough. The boredom session should feel too easy. The anxiety session should feel impossible. The contrast reveals the flow zone.",
      sarah: "Gene, your flow zone is probably somewhere around 85-95 BPM, playing originals with one new element — a new strum pattern, an improvised verse, a key change. That's where the magic happens.",
      recorder: true
    },
    {
      id: "ss-15-10",
      time: 7,
      title: "Graduated Audience Exposure",
      type: "play",
      what: "Reduce performance anxiety through graduated exposure — the most evidence-supported technique in clinical psychology. An audience ladder: mirror, camera, one person, small group. Each level increases social exposure gradually. One level per week.",
      steps: [
        { text: "Level 1 — Mirror: set up a mirror and play your strongest song while watching yourself. Notice your posture, facial expressions, how you hold the guitar. This is your visual performance self.", why: "Playing to a mirror forces self-awareness about visual performance. Many musicians close their eyes and hunch over — a mirror reveals habits you didn't know you had." },
        { text: "Level 2 — Phone camera: set up your phone to record video. Play your song knowing the camera is watching. Notice what changes — do you tense up? Rush? The camera simulates an audience without the social pressure.", why: "A recording device activates mild performance anxiety — the knowledge that this take 'counts.' It's a safe way to practice performing under low-level pressure." },
        { text: "Level 3 — Court: play for one trusted person. This is the real threshold — another human being listening in real time. Use your pre-performance routine (ss-15-2) before you start.", why: "The jump from camera to human is the biggest step. A trusted listener like Court provides the social element without judgment. This is where performance anxiety either takes hold or gets managed." },
        { text: "Level 4 — Small gathering: play for 2-3 people. Friends, family, whoever is willing. Each additional person slightly increases the exposure. Notice that the anxiety peaks before you start and decreases once you're playing.", why: "Graduated exposure works because each successful experience at a new level rewires your anxiety response. Your brain learns: 'I played for 3 people and survived. This is safe.' The fear diminishes with repetition." }
      ],
      feel: "Each level should feel slightly uncomfortable but manageable in the body — that's the therapeutic window. Notice where the anxiety lives physically: tight shoulders, shallow breath, cold hands. The pre-performance routine (ss-15-2) addresses these body locations directly. Each successful performance at a new exposure level teaches the body — not just the mind — that performing is safe. The nervous system rewires through embodied experience, not through thinking about it.",
      wrong: "If you're skipping levels (jumping straight to a group without doing the mirror and camera first), you're not doing graduated exposure — you're doing flooding. It works, but it's unnecessarily stressful. Trust the ladder.",
      sarah: "Gene, this is the same technique used to treat stage fright in professional musicians. It's not about 'getting over' anxiety — it's about teaching your nervous system that performing is safe, one step at a time.",
      checklist: true,
      recorder: true
    },

    // ─── CAPSTONE PERFORMANCES ───

    {
      id: "ss-15-11",
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
      feel: "This should feel vulnerable — and that's the point. Vulnerability is a body state: the chest opens, the shoulders want to close, the breath shortens. Performing is choosing to stay open when the body wants to protect itself. The embodiment cycle keeps running through the vulnerability — hear, feel, choose, produce — and the music that emerges from that open, exposed state has a quality that practice-room playing never reaches. The listener hears the openness in the sound.",
      wrong: "If you apologized before, during, or after playing, notice that. Apologizing undermines the performance. Play, then listen to their reaction. No disclaimers.",
      sarah: "Gene, the lanai with Court is your first stage. This isn't a concert — it's a moment of sharing. The nervousness is exactly what every musician feels. The difference is that you play anyway.",
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-15-12",
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
      feel: "A good jam feels like flying — the body leads and the mind follows. Voice, guitar, and groove lock in because the body is running the embodiment cycle for all of them simultaneously, and the separate streams merge into one river of sound. You'll know the moment it happens: a warmth in the chest, a looseness in the hands, a feeling that the music is playing you. That feeling is every skill from Levels 1 through 14 running together, automatically, through one body.",
      wrong: "If you're stuck playing safe patterns, push into unfamiliar territory. Try a note you haven't tried. Play a chord you don't usually use. Mistakes in jams become discoveries.",
      sarah: "Gene, this is what it all leads to — picking up the guitar and making music in the moment, with or without other people. Every exercise in this curriculum was building toward this freedom.",
      metronome: 85,
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true
    },
    {
      id: "ss-15-13",
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
      feel: "The Golden Hour should feel like the culmination of everything — every level, every exercise, every moment the body learned something new about making music. The nervousness is just energy; let the body channel it into sound. In Level 3, you heard one note before singing it. Now the whole set flows through the hear-feel-choose cycle in real time — harmony, melody, rhythm, dynamics, lyrics, guitar — all running through your body simultaneously, automatically. The music flows through you. This is what mastery feels like in the body.",
      wrong: "If you stop to restart a song, you've broken the performance contract. In a real set, you push through. If the nerves are overwhelming, start with your strongest song — let momentum carry you.",
      sarah: "Gene, save this recording. Date it. This is your Golden Hour — the moment you went from 'learning guitar' to 'performing as a singer-songwriter.' Everything before was preparation. This is the thing itself.",
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-15-14",
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
      feel: "This should feel like a moment of recognition — looking back at the path and realizing how far you've come. From consciously hearing one note before singing it (Level 3) to entire songs flowing through your body in real time. The embodiment cycle is invisible now — it's just how you make music. You don't think about hearing, feeling, choosing, and producing. You just play, and the music passes through your whole being before it becomes sound. That's not a technique. That's who you are.",
      wrong: "If you can't answer these questions, that's data too. It means you haven't found your voice YET — and that's part of the journey. Keep writing, keep performing, keep listening.",
      sarah: "Gene, you've now internalized Allah-Las' jangly maj7 shimmer, DOPE LEMON's major→minor emotion shifts, Skinshape's jazz-influenced 7th chords with dub rhythm, Khruangbin's three-note voicings and 60% silence, and Sun Room's syncopated surf strum. Listen to your recorded originals from Level 11. Do they sound like a coherent artist, or five different people? What's YOUR sound — the thread that connects all five? 'Coastal Psychedelic Omnivore' is your listening identity. Now you've built your creating identity. They're related but distinct. Your music comes from your taste, and your taste is uniquely yours.",
      recorder: true,
      levelUp: "You have a personal catalog of original songs, can perform fingerpicked and strummed pieces with dynamic range, improvise lyrics and melodies in real time, prepare with a consistent pre-performance ritual, maintain process focus during performance, polish songs through systematic vertical editing, arrange for duo singing, build a songwriting volume habit, find and cultivate flow state conditions, reduce performance anxiety through graduated audience exposure, and have discovered your musical identity as a singer-songwriter. You are a singer-songwriter."
    }
  ]
};
