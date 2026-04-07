import { getPitchRange } from "../appData.js";

export const level15 = {
  level: 15,
  title: "Performance & Identity",
  subtitle: "You are a singer-songwriter. Act like one.",
  description:
    "Everything converges: technique, songwriting, improvisation, and the courage to share your music with another person. This level focuses on performance psychology, live improvisation, building a set of originals, and discovering your musical identity. Based on Csikszentmihalyi's flow state research: performing with 4% challenge above skill level creates optimal experience. In Level 3, you learned to hear one note before singing it. Now, entire songs pass through the hear-feel-choose cycle in real time. The cycle that took 10 seconds per note now runs continuously, automatically, beautifully. You don't 'do' embodiment; you ARE embodied. Every note passes through your whole being before it becomes sound. This is what mastery sounds like: the music flows through you, not from you.",
  artists: "Your own sound — the artist you've been building since Level 1",
  unlocks: "The rest of your musical life",
  review: { label: "Full Check-In", time: 5, exercises: ["ss-10-7", "ss-14-5"], prompt: "Play your strummed original (ss-10-7) and your fingerpicked original (ss-14-5) back to back. If both feel performance-ready, you're ready for Level 15." },
  exercises: [
    {
      id: "ss-15-1",
      time: 8,
      title: "Improvise Lyrics Live",
      type: "vocal",
      what: "Strum a progression and make up lyrics on the spot about what you see, hear, and feel. No filter, no editing, no stopping. This is the ultimate integration of every skill: autopilot guitar, pentatonic melody, rhythmic feel, observational lyrics — all in real time.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum or play a backing track. Close your eyes (or look out a window). Let the body settle into the groove first — feet, hands, breath. Then start singing words about what you see. 'Morning light through the blinds, coffee getting cold...' The words, the melody, and the body move as one act.", why: "Present-tense observation is the easiest improv source. You're reporting reality in melody. No imagination needed — just attention." },
        { text: "Don't stop. Even if you run out of things to describe, keep singing. Follow a thought, follow a breath, follow where the body wants to go. The note forms in you before it becomes sound — you don't decide, you just feel where it lives and let it out.", why: "Improvised lyrics train the instant connection between thought and voice. The filter disappears. What remains is authenticity." },
        { text: "If you get stuck, repeat a phrase and change one word each time. 'The water's warm today / the water's gone today / the summer's gone today.' Each word shifts something in the body — 'warm' opens the chest, 'gone' closes it. You feel the change before you hear it.", why: "Repetition with variation is a legitimate songwriting technique. Many great choruses are built exactly this way." },
        { text: "Do this for 5 full minutes. Record all of it. Don't monitor the quality — just stay present in the body, letting words and melody flow through. Later, listen for any phrases worth keeping.", why: "Improv sessions are gold mines. 95% is exploration, but the 5% that works can seed real songs." }
      ],
      feel: "Lyric improv should feel vulnerable and freeing simultaneously — the body leading, the mind following. Words emerge from the same place melodies do: heard internally, felt in the body, chosen by instinct, produced before the conscious mind can edit. This is the embodiment cycle running at full speed on language, harmony, and rhythm simultaneously. What comes out might surprise you because your body knows things your mind hasn't articulated yet.",
      wrong: "If you're stopping to think between lines, you're not improvising — you're composing slowly. Keep the flow going even if the words are nonsense. Flow first, quality later. If this feels uncomfortable, that's the stretch — it means you're pushing past the safety of planning into genuine creation.",
      sarah: "Gene, some of your best song ideas will come from these improv sessions. The conscious mind writes clever lyrics. The improvising mind writes honest ones. You're not learning to be a songwriter — you ARE one. This exercise just lets the songwriter inside speak without the editor getting in the way.",
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
        { text: "Physical warm-up (2 min): stretch your neck side to side, roll your shoulders back 10 times, open and close your jaw wide, shake out your hands. Feel where tension lives — shoulders, jaw, wrists — and release it deliberately. The body carries anxiety as physical tightness; releasing the tightness releases the anxiety.", why: "Performance anxiety lives in the body first — tight shoulders, locked jaw, stiff hands. Physical release before playing prevents tension from creeping into your technique." },
        { text: "Vocal warm-up (2 min): start with vagal toning — breathe in for 4 counts, then hum-sigh out for 6 counts. Repeat 3 times. This primes the vagus nerve, which directly controls your vocal folds; calming it literally loosens the instrument and reduces performance anxiety at the neurological level. Then hum a scale up and down your range. Feel the vibration traveling — low hums warming the chest, high hums buzzing in the mask. Do 30 seconds of lip trills. Sing a few long, easy notes in your sweet spot (E3-A4). The voice wakes up through the body, not through the throat.", why: "The vagus nerve innervates the larynx. Performance anxiety activates the sympathetic nervous system, which tightens the throat. The 4-in/6-out hum-sigh engages the parasympathetic response through vagal stimulation — this is physiology, not psychology. A cold voice cracks and wobbles. Two minutes of gentle warm-up brings blood flow to the vocal folds and primes your pitch accuracy." },
        { text: "Mental set (1 min): three slow, deep breaths. Each exhale softens a body location — shoulders drop, belly releases, jaw unclenches. Then set an intention: not 'play perfectly' but 'I'm sharing something real.' The intention settles in the chest like a warm weight. That's where the music will come from.", why: "Intention-setting reframes performance from evaluation to expression. Sports psychology research: athletes who set process intentions ('stay relaxed, have fun') outperform those who set outcome intentions ('don't mess up')." },
        { text: "Do this routine before every practice session this week. Same order, same timing. Let it become automatic — the body's cue that it's time to shift from everyday mode to musical mode. The transition should become physical: you feel yourself becoming a musician.", why: "Consistency is the key. A ritual only works as an anxiety-reducer when it's been repeated enough to become a conditioned trigger for calm focus." }
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
        { text: "Play one of your originals. As you play, notice where your attention lives: in the body (feeling the phrase, the breath, the resonance) or in the head (judging, evaluating, grading). Process focus lives in the body. Outcome focus lives in the head. Just observe which one is running.", why: "Awareness is the first step. Most musicians don't realize how evaluative their inner monologue is during performance. You can't change what you don't notice." },
        { text: "Play the song again. Keep attention where the music lives: in the body. Feel the phrase forming in the chest before it sounds. Feel the right hand relax. Let the downbeat land in the foot. When a judging thought arises ('that note was flat'), notice it pulling you to the head — then return to the body. The music is always in the body.", why: "Process focus keeps attention on what you're doing NOW, not on what just happened. Evaluative thoughts pull you into the past — and the past can't be changed mid-performance." },
        { text: "Play a third time with a deliberate mistake planted somewhere — wrong chord, lyric swap, whatever. Stay in the body through the mistake. Don't react, don't grimace, don't stop. Feel the moment pass through the body like a wave, and redirect: 'next phrase, breathe, feel the downbeat.'", why: "The real test of process focus is surviving a mistake without spiraling. If you can stay in process mode through an error, you can stay in it through anything." },
        { text: "Record this third pass. Listen back — does the planted mistake actually ruin the performance? Almost always, it doesn't. The body kept playing; the audience hears the recovery, not the error.", why: "Hearing proof that mistakes don't destroy a performance is the most powerful antidote to perfectionism. Your inner critic exaggerates the damage." }
      ],
      feel: "Process focus should feel like meditation while playing — present-tense, non-judgmental, attentive to the body. 'Breathe into the phrase' is an embodiment cue. 'Feel the downbeat' is an embodiment cue. Every process-focused thought returns you to the body, where the music lives. Outcome focus ('was that note right?') lives in the head. Process focus lives in the body. The music actually sounds better because you're staying embodied instead of retreating into judgment.",
      wrong: "If you notice yourself keeping score ('I had 3 evaluative thoughts that time'), that's still outcome focus. The goal is not zero evaluative thoughts — it's gently redirecting each time one appears.",
      sarah: "Gene, this is the single biggest performance psychology tool. Every professional musician deals with evaluative thoughts — the difference is they've trained themselves to redirect. It's a skill, not a personality trait. For a specific tool that replaces blank-mind autopilot with deliberate mental scripts, see ss-15-17 below. Mental scripts are body-cues ('breathe low, tell the story'), not technical instructions.",
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
        { text: "Pass 1 — Melody: sing through the entire song focusing only on the voice's path through the body. Smooth any awkward intervals — an interval that forces an uncomfortable physical leap may need a passing tone to bridge it. Does every phrase resolve naturally? Is there one melodic moment that feels physically satisfying — a note that lands perfectly in the chest or mask? That's the hook.", why: "Melody is the first thing a listener remembers. Smoothing awkward intervals and clarifying the hook ensures the song is singable and memorable." },
        { text: "Pass 2 — Lyrics: read every lyric out loud (don't sing). Replace one generic word per verse with something specific. 'The sky' becomes 'the Kailua sky.' 'A feeling' becomes 'that 4pm feeling.' Speak the specific version — feel how it lands in the body with more weight.", why: "Specificity is the difference between forgettable and vivid. Generic words describe everyone's experience. Specific words describe YOUR experience — and paradoxically, that's more universal." },
        { text: "Pass 3 — Dynamic arc: sing through and feel the body's energy journey. Where does the body feel most intimate and still? That's your quietest moment. Where does it open widest, breath deepest? That's your peak. Mark them. Does the energy build and release through the body, or does it flatline?", why: "Songs without dynamic arc sound monotonous even if the melody and lyrics are strong. The arc is the emotional architecture — it tells the listener when to lean in and when to exhale." },
        { text: "Pass 4 — Prosody: speak every lyric in rhythm. Do the stressed syllables land on strong beats? Feel the body's natural emphasis — where it wants to push air — and check whether the melody agrees. Fix any misalignments where the body fights the melody.", why: "Prosody mismatches — stressed syllables on weak beats — make lyrics feel clumsy even when the words are good. Aligning stress and beat makes singing feel effortless." },
        { text: "Pass 5 — Guitar texture: vary your guitar approach between sections. Strum the verse, fingerpick the chorus (or vice versa). Feel how the hands' change transforms the body's state — from the broad sweep of strumming to the precise intimacy of fingertips. Let the guitar texture reinforce the body's dynamic arc.", why: "Guitar texture variety is the arrangement tool of the solo performer. Changing from strum to fingerpick between sections creates the effect of a full band arrangement." }
      ],
      feel: "Vertical editing should feel like refining the body's relationship with each dimension of the song. The melody pass tunes the voice's path through the body. The dynamics pass shapes the body's energy arc. The texture pass changes what the hands feel. Each pass makes the song more embodied — more physically natural to perform — and the song doesn't change identity; it becomes more itself.",
      wrong: "If you're rewriting the whole song during editing, you've switched from editing to composing. The song's core should stay intact. You're refining, not reinventing.",
      sarah: "Gene, this is how professional songwriters work. The first draft is the raw material. The editing is the craft. Your songs are already good — this process makes them undeniable.",
      checklist: true,
      volumeContour: true,
      recorder: true,
      dynamicArc: [
        { section: "Pass 1 (Melody)", intensity: "focus: pitch", notes: "Tune every note. Find the 'wrong' notes — they feel unstable in the body." },
        { section: "Pass 2 (Lyrics)", intensity: "focus: specificity", notes: "Replace generic with specific. The body lands harder on specific words." },
        { section: "Pass 3 (Dynamics)", intensity: "focus: energy arc", notes: "Map the full pp→ff arc. Every section should have a different intensity." },
        { section: "Pass 4 (Prosody)", intensity: "focus: stress alignment", notes: "Stressed syllables on strong beats. The body's natural emphasis matches the melody." },
        { section: "Pass 5 (Texture)", intensity: "focus: guitar arrangement", notes: "Fingerpick vs strum, body percussion, capo position. The guitar becomes two instruments." }
      ]
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
        { text: "Practice YOUR harmony part alone. Hear the harmony note forming in a different body place than the melody — a 3rd above lives slightly higher in the mask, a 6th below settles deeper in the chest. If Court sings the melody, where do you go? Find what sounds natural in your body.", why: "Harmony parts must be practiced alone first. If you can't sing your part confidently by yourself, you'll drift back to the melody when singing together." },
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
        { text: "Session 1 — Boredom zone: play your easiest, most automatic material at a comfortable tempo for 2 minutes. Notice the body: relaxed but disengaged. The hands play but the body isn't invested — no vibration traveling, no breath engaged, no resonance deepening. The embodiment cycle runs on autopilot without presence. That's boredom.", why: "The boredom zone feels safe but produces no growth and no engagement. If your practice always lives here, you'll plateau. It's useful for warm-ups but not for development." },
        { text: "Session 2 — Anxiety zone: play your hardest material at a fast tempo for 2 minutes. Notice the body: tense shoulders, shallow breath, locked jaw, fingers stiffening. The embodiment cycle breaks down — the body contracts instead of flowing. That's anxiety — challenge far exceeds skill.", why: "The anxiety zone feels like failure. Practicing here breeds frustration and reinforces mistakes. It's useful for brief stretch moments but not for sustained practice." },
        { text: "Session 3 — Flow zone: play moderately challenging material at your sweet tempo (85-100 BPM) for 3 minutes. The body knows flow before the mind names it: engaged but not tense, breath moving, the vibration traveling freely from belly through chest to mask. Notes form and become sound without a gap between feeling and producing. Time passing quickly. That's flow.", why: "Flow requires roughly 4% challenge above current skill level. You're stretching but not breaking. This is where the deepest learning and the best performances happen." },
        { text: "Write down what you played in each session and what the body felt in each. Your flow zone is the state where the body is most alive — fully engaged, fully present, the embodiment cycle running invisibly. Return here whenever practice feels stale or stressful.", why: "Knowing your zones lets you self-regulate. Bored? Increase difficulty. Anxious? Decrease it. The goal is to stay in the flow channel — the narrow band between too easy and too hard." }
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
        { text: "Before you start: scan the body. Where does nervousness live? Tight shoulders? Shaky hands? A knot in the stomach? Shallow breath? Name each sensation aloud. 'My hands are shaky. My stomach is tight.' Naming the body's state reduces its power over you.", why: "Naming physical sensations reduces their power. Anxiety thrives in the unnamed — once you say 'my hands are shaky,' the shakiness becomes manageable." },
        { text: "Start with your most confident song. The body knows this one — let the first notes form where they always do, in the chest. The familiar melody settles you. Feel the nervousness transform into energy as the music takes over. Play it all the way through.", why: "Starting with strength builds momentum. Professional performers always open with a safe bet." },
        { text: "Before your second song: three slow breaths. On each exhale, feel the shoulders drop, the belly soften. Tell yourself 'this song is mine — it doesn't need to be perfect, it needs to be real.' The intention lives in the body. Then play.", why: "The breath interrupts the anxiety spiral. The self-talk reframes the goal: authenticity over perfection." },
        { text: "During the song, look up at your listener at least twice. Not for approval — to share. The body shifts when you look up: the chest opens, the resonance moves outward. The music leaves your body and enters the room. That's not technique — that's who you are now.", why: "Eye contact transforms the dynamic from audition (being judged) to connection (sharing something)." },
        { text: "After: ask them what they FELT, not what they thought. 'What did it make you feel?' is a better question than 'Was it good?' Their answer tells you whether the music passed through your body and landed in theirs.", why: "Emotional feedback tells you whether your music communicates what you intended. Technical feedback isn't useful at this stage." }
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
        { text: "With a partner: agree on a key and a groove (Am, reggae feel at 85 BPM). One person strums chords, the other improvises melody. When you comp, feel the body become a foundation — grounded, steady, serving. When you solo, feel it open and lead. Trade after 8 bars.", why: "Trading roles teaches you both sides of the jam — supporting and leading. A good jammer does both." },
        { text: "Trade fours: play a 4-bar guitar phrase, then sing a 4-bar vocal response. The music moves through the body — fingertips first, then chest and mask. No gap between hearing the guitar phrase and feeling the vocal response forming. The body answers itself.", why: "Trading fours forces you to listen to what you just played and respond vocally." },
        { text: "Solo with backing track: play the track, strum along for the first cycle — body grounded in rhythm. Then drop guitar and improvise vocals for the next cycle — body shifts to the voice, the hands go quiet. Alternate. Feel the body toggle between its two instruments.", why: "Backing tracks give you a band to jam with. The principle is the same — trade roles between voice and guitar." },
        { text: "Full free jam: no rules, no structure. Play guitar when the hands want to, sing when the voice wants to, do both when the body wants to. The body decides. The mind watches. Record everything.", why: "Free jamming is the endpoint of all this training. Every skill — autopilot strumming, pentatonic singing, call and response, harmonic navigation — comes together here." }
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
        { text: "Set up your space. Chair, guitar, water. Set up a recording device. Feel the body shift as you prepare — this is no longer practice. The intention changes something physical: the posture straightens, the breath steadies, the hands find the guitar with purpose. This is your stage.", why: "Creating a performance environment — even a living room — signals to your brain that this is real." },
        { text: "Tell your audience (even if it's a camera): 'I'm going to play my set.' Then start. No preamble, no apologies. The first note emerges from a body that has committed.", why: "The moment you announce and begin, you're performing. The commitment is the performance." },
        { text: "Play all your songs. The music moves through you — each note forms in the body and becomes sound without you directing it. Transitions between songs. Dynamic arcs within songs. Eye contact with your audience. If you make a mistake, the body keeps going. It knows what to do.", why: "Playing through mistakes is the most important performance skill. The audience doesn't know what you planned — they only know what you played." },
        { text: "After the last song, stop. Let the last note fade in the body. Breathe. Feel the stillness in your chest. You just performed a set of original music. The songs passed through your whole being and became sound. That's not something you did — that's who you are. Thank your audience. Stop the recording.", why: "The ending matters. A clean ending with a moment of stillness is more powerful than trailing off." }
      ],
      feel: "The Golden Hour should feel like the culmination of everything — every level, every exercise, every moment the body learned something new about making music. The nervousness is just energy; let the body channel it into sound. In Level 3, you heard one note before singing it. Now the whole set flows through the hear-feel-choose cycle in real time — harmony, melody, rhythm, dynamics, lyrics, guitar — all running through your body simultaneously, automatically. Your prediction model IS your musicianship — it runs so fast now that prediction and execution feel like one thing. The music flows through you. This is what mastery feels like in the body.",
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
        { text: "Put down the guitar. Just talk into the recorder. What music have you been drawn to throughout this curriculum? What genres made your body feel most alive — most present, most grounded, most flowing?", why: "Your choices reveal your identity. The genres you gravitated toward, the melodies you improvised, the lyrics you wrote — they point somewhere." },
        { text: "What themes keep appearing in your lyrics? Ocean? Travel? Home? Loss? Joy? What does your music care about? These themes have body addresses too — 'ocean' opens the chest, 'home' settles it.", why: "Themes are your artistic territory. Knowing your themes helps you write more intentionally." },
        { text: "What does your voice want to sound like? Laid-back and warm? Raw and vulnerable? Playful? Atmospheric? Where does your natural voice live in the body — deep in the chest, forward in the mask, floating behind the breath?", why: "Vocal identity is as important as lyric identity. Your delivery IS your brand." },
        { text: "One sentence: 'I am a singer-songwriter who ______.' Fill in the blank. Say it out loud. Feel it settle in the chest — warm, certain, real. You don't think about hearing and feeling notes anymore. The music forms in your body and becomes sound. That's who you are.", why: "Declaring your identity makes it real. You're not becoming a singer-songwriter — you are one." }
      ],
      feel: "This should feel like a moment of recognition — looking back at the path and realizing how far you've come. From consciously hearing one note before singing it (Level 3) to entire songs flowing through your body in real time. The prediction model you started building with one note is now a sophisticated engine that generates music in real time — harmony, melody, emotion, body awareness, all predicted and executed simultaneously. The embodiment cycle is invisible now — it's just how you make music. You don't think about hearing, feeling, choosing, and producing. You just play, and the music passes through your whole being before it becomes sound. That's not a technique. That's who you are.",
      wrong: "If you can't answer these questions, that's data too. It means you haven't found your voice YET — and that's part of the journey. You're not trying to become a musician. You've BEEN one since Level 1, when you strummed your first chord with intention. Keep writing, keep performing, keep listening.",
      sarah: "Gene, you've now internalized Allah-Las' jangly maj7 shimmer, DOPE LEMON's major→minor emotion shifts, Skinshape's jazz-influenced 7th chords with dub rhythm, Khruangbin's three-note voicings and 60% silence, and Sun Room's syncopated surf strum. Listen to your recorded originals from Level 11. Do they sound like a coherent artist, or five different people? What's YOUR sound — the thread that connects all five? 'Coastal Psychedelic Omnivore' is your listening identity. Now you've built your creating identity. They're related but distinct. Your music comes from your taste, and your taste is uniquely yours.",
      recorder: true,
      levelUp: "You have a personal catalog of original songs, can perform fingerpicked and strummed pieces with dynamic range, improvise lyrics and melodies in real time, prepare with a consistent pre-performance ritual, maintain process focus during performance, polish songs through systematic vertical editing, arrange for duo singing, build a songwriting volume habit, find and cultivate flow state conditions, reduce performance anxiety through graduated audience exposure, and have discovered your musical identity as a singer-songwriter. You are a singer-songwriter."
    },

    // ─── NEW: GRADUATED AUDIENCE & MUSICAL DNA ───

    {
      id: "ss-15-15",
      time: 10,
      title: "Graduated Audience — From Mirror to Human",
      type: "play",
      what: "Progressive performance exposure to build stage confidence. Each step adds social stress while maintaining the ventral vagal state. Mirror → audio recording → video recording → one safe person. The self-consciousness is the exercise — you practice singing THROUGH it, not waiting for it to disappear.",
      setup: "A full song you can perform confidently. Mirror (full-length if possible). Phone for recording. One willing listener (Sarah, a friend, family member) for the final step. Voice check: 4-in/6-out breath x3, hum-sigh, tongue trill 10 seconds.",
      steps: [
        { text: "Perform a full song to a MIRROR. Watch yourself — your posture, your face, your hands. The self-consciousness that arises IS the exercise. The urge to look away, to close your eyes, to laugh nervously — notice each impulse in the body (tight jaw, lifted shoulders, held breath) and practice singing THROUGH it. Maintain eye contact with your reflection. The discomfort peaks around 30 seconds and then begins to fade.", why: "Mirror performance activates the same self-monitoring circuits as audience performance but at lower intensity. The self-consciousness you feel is the anterior cingulate cortex evaluating your social presentation — the same mechanism that creates stage fright. Practicing through it builds tolerance. Stress inoculation theory (Meichenbaum 1985) shows that graduated exposure to anxiety-provoking stimuli builds resilience more effectively than avoidance." },
        { text: "Perform to a PHONE RECORDING — audio only. The knowledge that you're being captured changes everything: the stakes feel higher, mistakes feel permanent. Notice what changes in the body — does the jaw tighten? Do the shoulders lift? Does the breath shallow? These are sympathetic nervous system responses. Breathe through them: 4-in/6-out between verses if needed. The recording is just a microphone, not a judge.", why: "Audio recording introduces 'evaluation potential' — the knowledge that the performance will persist and could be reviewed. This activates mild performance anxiety even without an audience. The physiological responses (muscle tension, shallow breathing) are identical to stage fright but at manageable intensity. Training the body to relax through these responses builds the same neural pathways needed for live performance (Kenny 2011 — The Psychology of Music Performance Anxiety)." },
        { text: "Perform to a PHONE VIDEO. Seeing yourself while singing is the hardest version of the self-observation test — visual self-monitoring while performing splits attention between 'doing' and 'watching yourself do.' The body wants to stop one or the other. Practice holding both: performing AND being watched (even by yourself). 4-in/6-out breath x3 before starting.", why: "Video recording combines audio evaluation potential with visual self-monitoring — two anxiety triggers simultaneously. This is a higher-intensity exposure that more closely simulates the experience of a live audience watching you. The key insight: the discomfort is not dangerous, it's just unfamiliar. Each exposure reduces the amygdala's threat response to being observed (Craske et al. 2014 — maximizing exposure therapy)." },
        { text: "Perform for ONE PERSON — someone safe: Sarah, a close friend, a family member who will be kind. Before starting: 4-in/6-out breath x3. Set an intention — not 'play perfectly' but 'share something real.' Begin. Don't stop for any reason — mistakes, forgotten lyrics, cracked notes. Play through to the end. The body will want to stop, to restart, to apologize. Don't. The performance contract is: once you start, you finish.", why: "The first live audience performance is the most significant exposure step. A single safe listener provides real social pressure with minimal risk. The 'no stopping' rule is critical — it trains the performance completion habit that separates practice from performance. Every professional musician has a moment they trace back to: 'the first time I played for someone.' This is that moment (Lehmann et al. 2007 — Psychology for Musicians)." },
        { text: "After performing for a person, debrief with yourself (or with them): What felt different from playing alone? Where did your audiation go — could you still hear phrases before singing them, or did self-consciousness override the internal hearing? Where did tension creep in — jaw, shoulders, hands, breath? This is diagnostic data for your next performance, not a grade.", why: "Post-performance reflection converts experience into learning. The specific questions target the embodiment cycle: did the hear-feel-choose process survive the social pressure? If audiation disappeared under stress, that's the next training target. If tension appeared in specific body locations, those become focus points for the pre-performance routine (Williamon 2004 — Musical Excellence)." },
        { text: "Write down: (1) What surprised you about performing for someone. (2) What you'd do differently next time. (3) One thing that went well. Save this. Next week, do it again — for the same person or a different one. Each repetition reduces the anxiety response and strengthens the performance self.", why: "Written reflection after exposure consolidates the learning. The 'one thing that went well' is deliberate — the brain's negativity bias will highlight mistakes unless you consciously record successes. Graduated exposure works through repetition: each successive performance to a live listener builds on the previous one's desensitization (Barlow 2002 — Anxiety and Its Disorders)." }
      ],
      feel: "Graduated audience work should feel like progressively warmer water — uncomfortable at first, then tolerable, then natural. The mirror stage feels awkward and slightly ridiculous. The audio recording feels pressured. The video feels exposing. The live listener feels terrifying and then, after the first 30 seconds, surprisingly okay. Each step teaches the body that the discomfort is survivable — and on the other side of it is the experience of sharing your music with another human being, which is why you started this curriculum in the first place.",
      wrong: "If you skip straight to the live audience step, you've bypassed the graduated exposure that makes it manageable. Do the steps in order. If the mirror step feels too easy, you might already be comfortable with self-observation — move to video. If the live audience step feels impossible, do it anyway but choose the safest possible person. The anxiety will peak in the first 30 seconds and then begin to subside — every time. VOCAL TIP: If your voice shakes when performing for someone, don't fight the shake. Breathe through it. The shakiness is adrenaline, and it passes. A slightly shaky voice that keeps going is infinitely more compelling than a perfect voice that never performs.",
      sarah: "Gene, this is the bridge between practice and performance — the hardest crossing in the entire curriculum. Your pre-performance routine from ss-15-2 is your anchor. Use it before each step. And remember: the nervousness isn't a sign that you're not ready. It's a sign that you care about the music. Every performer you love — from Angus Stone to Mark Speer — felt this exact feeling before their first audience. The difference is they played anyway.",
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-15-16",
      time: 8,
      title: "Your Musical DNA — The Sound Only You Make",
      type: "song",
      what: "Reflection and identity exercise. What makes YOUR voice, YOUR guitar, YOUR songs uniquely yours? Three recordings, three observations, one artist statement. This isn't about becoming a musician — it's about RECOGNIZING the musician you already are.",
      setup: "Guitar. Recorder. Notebook. Quiet space for honest reflection. Voice check: 4-in/6-out breath x3, hum from chest to mask.",
      steps: [
        { text: "Record yourself singing 3 phrases from 3 different songs you've written or arranged during this curriculum — one from each genre you explored (reggae, surf, fingerpicked, or any 3 that feel most 'you'). Don't perform them — just sing them naturally, the way you would if nobody were listening. Listen back with fresh ears, as if hearing a stranger.", why: "Three samples from different genres reveal the constants beneath the variables. When you change the genre but the same vocal qualities persist — the same timing, the same vowel preferences, the same dynamic tendencies — those constants ARE your signature. Listening as a 'stranger' bypasses the self-critic and engages the analytical ear you've developed throughout this curriculum." },
        { text: "What do the three recordings have in common? Listen for: Tempo range — do you gravitate toward a specific BPM? Melodic contour — do you prefer rising phrases, falling phrases, or arch shapes? Vowel tendencies — do you favor open vowels (ah, oh) or closed ones (ee, oo)? Dynamic habits — do you naturally sing softly or project? Timing — are you behind the beat, on it, or ahead?", why: "These commonalities are your 'artistic DNA' — the patterns that persist across genres and songs. Research on artistic identity shows that personal style is defined by consistent micro-choices that the artist often can't articulate consciously (Csikszentmihalyi 1996 — Creativity: Flow and the Psychology of Discovery). Making them conscious gives you the power to develop them intentionally." },
        { text: "Name 3 things that are uniquely GENE: your 'porch register' delivery — that laid-back, warm, slightly behind-the-beat conversational tone. Your behind-the-beat timing that makes everything sound like a hammock afternoon. Your pentatonic comfort zone that keeps melodies simple and singable. Your desert-meets-ocean imagery. Your preference for space over density. Write them down as declarative statements: 'I sing behind the beat. I favor open vowels. I write about the ocean.'", why: "Naming your artistic traits transforms unconscious habits into intentional choices. These aren't limitations — they're your SIGNATURE. Every artist you love has a signature they can name: Khruangbin's space, Tinariwen's desert patience, DOPE LEMON's laid-back warmth, Nick Drake's intimate whisper. Your signature is equally real and equally valid (Bamberger 2013 — Discovering the Musical Mind)." },
        { text: "These aren't limitations — they're your SIGNATURE. Every artist you love has a signature: Khruangbin's 60% silence and three-note voicings, Tinariwen's hypnotic repetition and pentatonic patience, DOPE LEMON's major-to-minor emotion shifts and lo-fi warmth, Allah-Las' jangly reverb-drenched shimmer. Your signature is the thread that connects all your songs. It's what makes a listener say 'that sounds like Gene.'", why: "Reframing personal tendencies as 'signature' rather than 'limitation' is a critical identity shift. Artists who view their natural tendencies as assets produce more distinctive and authentic work than those who try to eliminate them (Perkins 1981 — The Mind's Best Work). Your porch register isn't a limited range — it's a chosen aesthetic territory." },
        { text: "Write a one-paragraph 'artist statement' — who are you musically? What do you sound like? What do you want your music to feel like? Speak it aloud into the recorder. Feel the words settle in the chest — warm, certain, real. 'I am a singer-songwriter who makes warm, spacious, coastal music. My voice lives in the porch register — laid-back, behind the beat, conversational. My songs are about golden hours that end, oceans that keep going, and the feeling of being exactly where you're supposed to be.'", why: "An artist statement is a declaration of identity — not aspirational but descriptive. It names what already exists. Speaking it aloud makes it physical: the words vibrate in the chest, the body affirms what the mind has articulated. This is the culmination of the entire curriculum's embodiment work: the body and the identity are one (Merleau-Ponty 1945 — Phenomenology of Perception)." },
        { text: "Save the recording and the written statement. Date it. This is your musical DNA at this moment — it will evolve, but the core will persist. In a year, record the same exercise and compare. The growth will be in the details; the signature will be in the constants.", why: "Dating creative identity markers creates a longitudinal record of artistic development. The comparison over time reveals what's essential (the constants that persist) versus what's developmental (the skills that grow). This is the most sophisticated form of self-assessment in the curriculum — not 'how good am I?' but 'who am I as an artist?'" }
      ],
      feel: "This exercise should feel like a moment of recognition — not discovering something new, but finally SEEING something that was always there. Like looking at a photograph of yourself and thinking 'oh, THAT'S what I look like.' Your musical DNA has been forming since Level 1 — every chord you chose, every melody you improvised, every lyric you wrote was shaped by it. This exercise just names it. The feeling should be warm, certain, and slightly emotional — the recognition of your own artistic identity is a profound experience.",
      wrong: "If you can't identify commonalities across your three recordings, you may be listening for the wrong things. Don't listen for technical quality — listen for TENDENCIES. Do you always pause in the same places? Do you always end phrases the same way? Do you always gravitate toward the same register? The commonalities are in the micro-choices, not the macro-structure. If the artist statement feels pretentious, simplify it: 'I make music that sounds like ______.' Fill in one image. That's enough. VOCAL TIP: If comparing your voice to your favorite artists makes you feel inadequate, remember: you're not comparing quality, you're comparing CHARACTER. Your voice has a character that no other voice has. That's the point.",
      sarah: "Gene, you already have a sound. This level isn't about finding it — it's about RECOGNIZING it. Your musical DNA has been showing up since the first reggae chop in Level 1: the behind-the-beat timing, the pentatonic melodies, the ocean imagery, the warm lo-fi aesthetic. You're a Coastal Psychedelic Omnivore who creates music — and the music you create sounds like golden hour on the North Shore, a hammock and a nylon-string guitar, the feeling of a perfect day that you know will end. That's not a style you learned. That's who you are.",
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: MENTAL SCRIPTS ───

    {
      id: "ss-15-17",
      time: 7,
      title: "Mental Scripts for Performance",
      type: "play",
      what: "Replace blank-mind autopilot with deliberate mental scripts for each song section. Performance psychology research (Bulletproof Musician, backed by motor learning studies) shows that trying to go 'blank' under performance pressure actually collapses — anxiety fills the void. Instead, develop specific body-focused phrases you think during each section: Verse 1 = 'breathe low, tell the story.' Chorus = 'chest opens, share it.' Bridge = 'surprise, lean forward.' The script keeps you present without micromanaging technique.",
      setup: "Your strongest finished song. Paper to write scripts. Recorder.",
      steps: [
        { text: "Write a 3-5 word mental script for each section of your best song. The script should be body-focused, not technical. Not 'hit the high note' but 'chest opens, float up.' Not 'strum accurately' but 'hands are waves.' The body language bypasses performance anxiety.", why: "Mental scripts are the middle ground between anxious self-monitoring ('am I doing this right?') and zoned-out autopilot ('just don't think'). Elite athletes use them: 'smooth stride, strong finish.' Your version: 'porch voice, easy groove.'" },
        { text: "Perform the song while silently thinking each script as the section begins. Don't try to follow the script precisely — just let the words float through your mind as you play. The script colors the performance without controlling it.", why: "The script gives your conscious mind something to do instead of worrying. When the mind has a task ('breathe low, tell the story'), it can't simultaneously produce performance anxiety. The body handles the actual playing." },
        { text: "Record the performance. Listen back and compare to a recording without scripts. Does the scripted version have more presence? More character? Most musicians find that scripted performances are more consistent AND more expressive.", why: "The comparison reveals the script's effect. Performances with scripts tend to have clearer dynamic contrasts, more intentional phrasing, and fewer 'autopilot' moments where the performer checks out." },
        { text: "Refine your scripts for your full set (3-5 songs). Each song gets its own scripts. Keep them short — 3-5 words per section maximum. Long scripts become another thing to remember; short scripts are felt more than thought.", why: "Building a library of mental scripts for your repertoire creates a performance toolkit. Over time, the scripts become automatic — you think 'porch voice' and your body adjusts without conscious effort." }
      ],
      feel: "Mental scripts should feel like gentle self-direction, not rigid control. They're whispered suggestions to your body, not commands to your technique.",
      wrong: "If you're trying to follow the script precisely or getting stressed about remembering it, the script is too complex. Simplify until it's a single image or sensation. 'Warm' is a valid script for an entire section.",
      sarah: "Gene, this is from performance psychology research — elite athletes use mental scripts ('smooth stride, strong finish') instead of blank-mind or hyper-analysis. Your scripts should match your aesthetic: 'porch register, lazy groove, golden hour.' Body cues, not technical instructions.",
      recorder: true,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }]
    },

    // ─── NEW: GUIDE TRACK RECORDING ───

    {
      id: "ss-15-18",
      time: 10,
      title: "Recording Methodology — Guide Track",
      type: "record",
      what: "The professional home recording method used by Angus Stone and Skinshape: (1) Record a full 'guide take' — guitar and vocals together, messy, emotional, just for reference. (2) Re-record guitar only against the guide — optimize the guitar sound. (3) Re-record vocals only against the guitar track — focus entirely on vocal delivery. (4) Discard the guide. Each part gets focused attention without losing the feel of the original performance.",
      setup: "Phone or recording device. Guitar. A finished song you know well.",
      steps: [
        { text: "GUIDE TAKE: Record your song start to finish — guitar and vocals together. Don't worry about perfection. This take captures the FEEL. Mistakes are fine. The groove matters more than the notes.", why: "The guide take is a reference, not a product. Its purpose is to capture the emotional intention of the performance. Angus Stone records multiple guide takes until one 'feels right,' then builds the final recording from that emotional template." },
        { text: "GUITAR RE-RECORD: Play the guide take through headphones. Re-record just the guitar, playing along with your guide. Now you can focus entirely on the guitar — touch, dynamics, tone. No vocal distraction.", why: "Separating guitar from vocals lets you optimize each independently. Your guitar playing improves when you're not splitting attention with singing. The guide take keeps the feel aligned." },
        { text: "VOCAL RE-RECORD: Play the new guitar track through headphones. Re-record just the vocal, singing over your clean guitar take. Now focus entirely on vocal delivery — dynamics, phrasing, emotion. The guitar is done; the voice gets full attention.", why: "Vocal performances improve dramatically when the singer isn't also playing guitar. The guide take's emotional blueprint keeps the vocal connected to the original intention, but the execution can be much more refined." },
        { text: "Compare: play your guide take, then your re-recorded version. The guide has feel. The re-record has quality. The best recordings have both. If the re-record lost the feel, try again — or use the guide take if it's genuinely better. Sometimes the messy first take IS the one.", why: "The guide track method captures feel first, then refines execution. Some songs are better messy (Nick Drake recorded 'Pink Moon' in two takes). The method gives you options — you can always keep the guide." }
      ],
      feel: "The guide take should feel free and emotional. The re-records should feel focused and precise. The final product should feel like the best of both.",
      wrong: "If you're performing the guide take carefully and precisely, you've missed the point. The guide take is supposed to be raw — it's a blueprint for feel, not a demo for quality.",
      sarah: "Gene, this is how Angus Stone and Skinshape record. The guide take captures the FEEL. The re-records capture the QUALITY. You get both. Position your phone at the point where your mouth meets the guitar's sound hole — that's the natural sweet spot for balanced capture.",
      recorder: true
    },

    // ─── NEW: DOUBLE-TRACK VOCALS ───

    {
      id: "ss-15-19",
      time: 7,
      title: "Double-Track Vocals for Chorus",
      type: "vocal",
      what: "Record your chorus vocal twice and play them simultaneously. The slight timing and pitch differences between takes create width and warmth — the 'big chorus' effect used on every DOPE LEMON and Skinshape record. Then try: single voice on verses, double-tracked on choruses. The doubling IS the dynamic shift — no other arrangement change needed.",
      setup: "Recording device that can play back while you record (phone works — record take 1, play it while recording take 2 on a second device, or use a simple DAW).",
      steps: [
        { text: "Record your chorus vocal — take 1. Sing naturally, full voice, committed. This is your foundation.", why: "Take 1 establishes the pitch and timing center. Sing it as if it's the only take — committed, not tentative." },
        { text: "Record take 2 — sing the same chorus WITHOUT listening to take 1. Match the melody from memory, not by following the recording. The small differences between takes are the whole point.", why: "If you sing along to take 1, the takes will be too similar. The magic of double-tracking is in the micro-differences: slightly different timing on each syllable, slightly different pitch on each note. These differences create warmth and width." },
        { text: "Play both takes simultaneously. The combined sound should be wider, warmer, and more present than either take alone. If the takes are too far apart (sounds like two people singing different versions), one take needs to be tighter.", why: "Perfect double-tracking sounds like one confident voice, not two tentative ones. The micro-differences create a subtle chorus effect that the brain perceives as 'big' and 'warm' without consciously hearing two voices." },
        { text: "Apply to the full song: single voice on verses, double-tracked on choruses. The doubling creates a natural dynamic lift without changing volume, strum pattern, or anything else. The vocal texture alone signals 'this is the chorus.'", why: "Double-tracked choruses over single-voice verses is the simplest and most effective arrangement trick in recording. DOPE LEMON, Skinshape, and Angus Stone all use this technique on nearly every track." }
      ],
      feel: "The doubled vocal should feel lush and confident — like your voice suddenly filled the room. The single-voice verse should feel intimate by contrast.",
      wrong: "If the double-tracking sounds phasey or weird, the takes are too similar — you might have unconsciously matched take 1 too closely. Record take 2 in a different room or at a different time to get natural variation.",
      sarah: "Gene, this is the production trick behind every DOPE LEMON chorus. Angus Stone records his vocal twice and stacks them — the slight differences create that warm, dreamy width. Your laid-back vocal style is PERFECT for double-tracking because the relaxed delivery naturally creates pleasing variation between takes.",
      recorder: true,
      referencePitches: getPitchRange("E3", "A4")
    },

    // ─── NEW: CAPO AS COLOR PALETTE ───

    {
      id: "ss-15-20",
      time: 6,
      title: "Capo as Color Palette",
      type: "guitar",
      what: "Same chord shapes, different capo positions = different songs. Play your strongest original at capo 0, then capo 3, then capo 5. Each position changes the key, the register, and the emotional color without changing a single chord shape or fingering. Pick the position that makes the song feel most like itself — not the position that's 'correct,' but the one where the guitar's register meets your voice's sweet spot.",
      setup: "Guitar. Capo. Your strongest original song.",
      steps: [
        { text: "Play your song at capo 0 (no capo). Note the key, the vocal register, the emotional quality. Is it dark? Warm? Open?", why: "Capo 0 is your baseline. The song's emotional character at this position is what you know — but it might not be the best version." },
        { text: "Move to capo 3. Same chord shapes, but the key has shifted up 3 half-steps. Sing the same melody — your voice is now in a higher register. How does the emotional quality change? Brighter? More urgent? More vulnerable?", why: "Capo 3 shifts the guitar into a brighter, more jangly register while your vocal melody moves closer to (or into) your passaggio. This position often adds urgency or vulnerability that didn't exist at capo 0." },
        { text: "Move to capo 5. Same shapes, even higher key. The guitar is now very bright and small-sounding. Your voice is in the upper part of your range. Does this work, or is it too high?", why: "Capo 5 is often too high for comfort, but sometimes it transforms a song — the brightness and the vocal effort create an energy that lower positions can't match. If it's too high, that's useful information: your song lives between capo 0 and capo 5." },
        { text: "Pick the position that makes the song feel most like itself. Not 'easiest' — most RIGHT. Some songs want the darkness of capo 0. Others want the jangle of capo 3. Record both the original position and your chosen position.", why: "Capo position is an arrangement decision, not a convenience decision. The 'right' position is where the guitar's timbre meets your vocal sweet spot in a way that serves the song's emotional intention." }
      ],
      feel: "Each capo position should feel like putting the same photograph through a different color filter. The composition is the same; the mood shifts.",
      wrong: "If you pick a capo position because it's easier to sing, you might be prioritizing comfort over character. Sometimes the right position is the one that pushes you slightly — just enough to add emotional intensity.",
      sarah: "Gene, this is how Jack Johnson finds his sound — same shapes, different positions, different songs. Your sweet spot is E3-A4, so capo positions that put the melody in that range will feel most natural. But don't always choose natural — sometimes capo 3 adds urgency that the song needs.",
      recorder: true,
      metronome: 80
    }
  ]
};
