import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "First Notes",
  subtitle: "One note at a time. Build the foundation.",
  description:
    "Level 2 introduced chord tones — now we internalize them one at a time. This level builds your melodic palette note by note: one note (the root), then two (root + 5th), then three (the full triad). At each stage, you'll explore through multiple vehicles — rhythm play, body percussion, call-and-response, audiation, emotional expression — so each note is deeply felt before the next one arrives. Based on constraint-based creativity research (fewer notes = deeper exploration), Dalcroze eurhythmics (body before voice), Kodály rhythm syllables, and Gordon's audiation research. The deeper thread: every exercise in this level practices the unified cycle of musical embodiment — hearing the note internally, feeling where it lives in the body, and choosing what it expresses. These aren't three separate skills; they're one integrated act. A master singer does all three simultaneously.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero",
  unlocks: "The Full Palette (Level 4)",
  review: { label: "Level 2 Check-In", time: 5, exercises: ["ss-2-3b", "ss-2-3c"], prompt: "Sing root-5th on G-C-D-Em-Am at 85 BPM (ss-2-3b). Walk the triad of Am-C-G-D (ss-2-3c). Both stable with no strum breaks? Move on." },
  exercises: [

    // ─── PHASE 1: ONE NOTE — THE ROOT ───

    {
      id: "ss-3-1",
      time: 6,
      title: "Finding Home — The Root",
      type: "vocal",
      what: "Strum Am on autopilot. Turn on the drone. Sing ONLY the note A — hold it, feel how it locks with the chord. This is your anchor note, the center of gravity, home. Vary how you deliver it: long sustains, short bursts, whispered, full voice. One note, infinite ways to deliver it.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Turn on the drone. Sing the note A and hold it for 8 full beats. Feel the lock — your voice and the drone vibrating together, no friction, no beating. This is what 'home' sounds like.", why: "The root is the most consonant note against any chord. Holding it for 8 beats lets you feel the physical resonance — the vibration in your chest when voice and drone align perfectly. This sensation is your anchor for everything that follows." },
        { text: "Vary duration: sing A as a long whole note (4 beats), then as two short bursts (1 beat each with rests), then as a rapid string of eighth notes. Same pitch, different rhythmic shapes.", why: "One note with varied duration proves that rhythm alone creates musical interest. You're building the foundation for rhythmic creativity without any pitch decisions cluttering the picture." },
        { text: "Vary dynamics: whisper A so quietly you can barely hear yourself over the guitar. Then sing A at full chest voice — open, resonant, projecting. Then medium. Feel where each dynamic level lives in your body.", why: "Dynamic range on a single note trains your breath control and vocal awareness. Whispering requires different breath support than full voice — both are skills you'll need." },
        { text: "Vary vowels: sing A on 'ooh' — notice the warm, intimate quality. Then 'ahh' — more open and bright. Then 'mm' (hummed) — vibration in the nose and forehead. Same pitch, different resonant spaces.", why: "Each vowel opens a different chamber in your body. 'Ooh' is focused and warm. 'Ahh' is open and projecting. 'Mm' buzzes in the sinuses. Your vowel choices will eventually become part of your vocal signature." },
        { text: "Close your eyes. The drone is playing A. Before you sing, pause. Can you hear A forming inside you — not from the speaker, but in your own head? Where is it gathering? Feel the warmth building behind your sternum, the specific buzz of home settling into your chest. Now the third layer: what does home FEEL like emotionally — not just physically? Stability? Safety? Warmth? The comfort of a familiar room at golden hour? When you can hear the pitch, feel its body location, and sense its emotional quality all at once — let your voice join the drone. That unified moment of hearing-feeling-choosing before singing is the foundation of everything. Stay here for 2 minutes. Each time you re-enter the note, practice the full cycle: hear it, feel where it lives, choose what it expresses, then sing.", why: "This exercise unifies three skills that are usually taught separately: audiation (hearing internally), somatic awareness (feeling the body location), and emotional intention (choosing what to express). Research shows these aren't separate processes — the anterior insula processes all three simultaneously (Zamorano 2025: body awareness predicts pitch accuracy even in non-singers, R²=0.41). Training them together from the start builds integrated musicianship, not fragmented technique. Professional singers shift from external to internal feedback after roughly 3 years of training; these proprioceptive 'body addresses' become their primary pitch reference. You're starting that process now — with all three channels active from the beginning." },
        { text: "Before the final round, mute the drone for a moment. Can you still hear A in your head? That echo of the note — hovering in your mind even after the sound stops — is your inner ear starting to work. Hold that mental A for a few seconds, then turn the drone back on. Did your internal pitch match? In the next exercise, you'll train this skill directly.", why: "This brief silence plants the seed of audiation — hearing music internally without external sound. You don't need to be good at it yet. Just noticing that a ghost of the pitch lingers after the drone stops is the first step. Gordon's audiation research shows this awareness is the foundation of all musical thinking." }
      ],
      feel: "The note A should feel like coming home — stable, grounded, warm. When your voice locks with the drone, you'll feel a physical buzz behind your sternum that's unmistakable — that's bone-conducted resonance, your larynx vibrating your chest cavity. But home isn't just a sound or a body sensation — it's an emotional quality too. The full experience of A is hearing the pitch, feeling the chest warmth, and sensing the emotional grounding all at once. Every variation (whisper, full voice, 'ooh,' 'ahh') is a different room in the same house, each with its own emotional shade.",
      wrong: "If you're drifting off pitch or can't feel the lock with the drone, try the body approach: feel where the note lives physically — the warmth in your chest — and let that sensation guide your voice to the pitch. If you're matching the pitch but it feels empty, add the emotional layer: what does this note WANT to express right now? The full cycle is hear-feel-choose-sing. If any channel has gone dark, slow down and re-engage it. If this feels awkward, that's the adaptation edge — not a sign you can't do this.",
      sarah: "Gene, Tommy Guerrero builds entire instrumentals on a single bass note droning underneath — that meditative, hypnotic quality comes from REALLY living in one pitch. You're building that same depth. One note, deeply felt, is worth more than ten notes skimmed over. You're not learning to be a singer — you already ARE one. This is just expanding what your voice can do.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "A3"),
      pitchContour: true,
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-3-13",
      time: 5,
      title: "One-Note Audiation — Hear Home Before You Sing It",
      type: "vocal",
      what: "The simplest version of the full musical act: hear one note, feel where it lives, choose what it means, then produce it. Every note you'll ever sing follows this same cycle — audiation, sensation, intention, expression. We start with one note because one note is enough to practice the complete cycle.",
      setup: "Guitar optional. Drone on A. Pitch detector on. Metronome at 70 BPM (slow and meditative).",
      steps: [
        { text: "Turn on the drone (A). Close your eyes and listen for 10 seconds — let the pitch saturate your hearing. Now the full cycle: Can you HEAR A forming inside you? Feel WHERE it lives — the warm buzz behind your sternum, the vibration settling into your chest. And what does A WANT in this moment — is it home, is it rest, is it grounding? Hold all three: the pitch, the body sensation, and the emotional intention. Now mute the drone. In the silence, keep all three channels alive for 3 seconds — the sound in your mind, the ghost of the vibration in your chest, the emotional quality hovering. Then sing. Check with the pitch detector. Did the full experience — pitch, body, feeling — survive the silence?", why: "This is the complete musical act at its most elemental — hearing, feeling, and choosing before producing. Gordon's research shows that the ability to maintain a pitch mentally is the foundation of all musical thinking. The body-location anchor gives you a second channel, and the emotional intention gives you a third. Three channels holding the same note makes the representation far more stable than pitch alone. Zamorano 2025 found that body awareness predicts pitch accuracy even in non-singers (R²=0.41). The 3-second hold is short enough to succeed but long enough to require genuine internal presence, not just vocal muscle memory." },
        { text: "Same process, but hold the silence for 5 seconds before singing. The longer the gap between hearing and singing, the more your inner ear must work. Drone on (10 seconds) → drone off (5 seconds of silent internal hearing) → sing → check. Try 3 rounds.", why: "Extending the silent hold forces your auditory cortex to sustain the pitch representation without external reinforcement. Each second of silence is a rep for your inner ear. If the pitch drifts during the hold, that's normal — noticing the drift is itself a sign of developing audiation." },
        { text: "Now try without the drone reference at all. From silence, generate A in your mind. Don't hum, don't test — just reach for the pitch internally. Where does it live? When you feel it clearly, sing it and check with the pitch detector. How close were you? Try 3 times. Don't worry about being exact — the attempt IS the training.", why: "Generating a pitch from memory without any external reference is a leap in audiation difficulty. Your body has been absorbing A throughout this entire level — the drone work, the singing, the body scans. Now you're testing whether that absorption has become internalized enough to recall independently. Even being close counts as progress." },
        { text: "Drone on again. Listen to A for 5 seconds. Mute the drone. Hear A internally, then sing it on 'ooh.' Mute your voice. Hear A again. Sing on 'ahh.' Mute. Hear. Sing on 'mm.' Does changing the vowel change your pitch accuracy? Notice which vowel makes it easiest to hold the internal pitch.", why: "Different vowel shapes activate different resonant spaces in your body, which can subtly shift pitch. If 'mm' is more accurate than 'ahh,' it may be because humming engages the same nasal resonance as internal hearing. This teaches you which vocal approach connects most directly to your inner ear — useful knowledge for all future singing." },
        { text: "Eyes closed, no drone. Place one hand on your chest, one on your belly. Now generate the FULL experience of A from memory — not just the pitch, but the complete embodiment. Hear it in your mind. Feel A pouring from your sternum, filling your ribcage — can the body address activate even when the note is only imagined? And reach for A's emotional quality: what is home when no one is playing it for you? Stability in silence? The warmth of a room you know by feel in the dark? Hold all three for 5 seconds — the pitch, the body sensation, the emotional meaning. Then let it become sound. In ss-3-8, you'll extend this unified cycle to two notes, each with its own pitch, body address, and emotional quality.", why: "This is the complete hear-feel-choose cycle performed from memory with no external reference — the most demanding version of the unified act. Zamorano's 2025 research links body awareness to musical competence (R²=0.41), and the brain regions that process internal body sensation overlap with those that process imagined sound and emotional meaning. Using sensory imagery ('pouring from your chest') outperforms anatomical description for building this awareness. Each note has a body address and an emotional signature: A = chest/sternum/grounding. As you add notes in later exercises, each will map to a different location and emotional quality, creating a full-body pitch-and-feeling landscape." }
      ],
      feel: "This should feel quiet and meditative — almost like a mindfulness exercise. The silence after the drone stops should feel ACTIVE, not empty. Your brain is holding three things at once: a pitch, a body sensation, and an emotional quality — like holding a candle flame steady in still air while feeling its warmth and knowing what it means to you. When you sing and all three match, the satisfaction is subtle but deep.",
      wrong: "If you're humming or whispering during the silent holds, you're bypassing the inner ear and using your vocal cords as a crutch. True audiation means no sound at all — the pitch exists only in your mind. If you can't hold A internally, shorten the silent hold to 2 seconds and build up. Also: accuracy isn't the goal yet. The ATTEMPT to hear internally is the exercise.",
      sarah: "Gene, every musician you admire — Mark Speer, Laura Lee, the Tinariwen guitarists — hears the music before they play it. That pre-hearing is audiation, and it starts with exactly this: one note, held in the mind. Tommy Guerrero's bass lines are so meditative because he hears each note before his fingers touch the string. You're building the same skill at the most fundamental level. What you're actually doing here is building your brain's predictive model of music. When you hear A internally before singing it, your brain is generating a PREDICTION — 'this is what A should sound like, this is where it should live in my body.' Then your voice executes toward that prediction. The gap between prediction and result is a prediction error, and prediction errors are how the model improves. Every rep makes the prediction sharper. This isn't memory — it's model-building.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "A3"),
      pitchContour: true,
      metronome: 70,
      recorder: true
    },
    {
      id: "ss-3-2",
      time: 6,
      title: "One-Note Rhythm Play",
      type: "vocal",
      what: "Sing ONLY the note A while strumming Am. Vary nothing except rhythm — long notes, short bursts, rests, syncopation. By removing pitch decisions entirely, you isolate rhythmic creativity. Your voice becomes a drum that happens to be pitched.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Before singing, pause — hear A forming inside you, feel the warmth gathering behind your sternum. When both the pitch and the physical sensation are vivid, let it become sound. Sing A as a whole note — 4 beats long. Then as two half notes. Then as four quarter notes. Then as eighth notes. Feel how the same note changes character with each rhythmic subdivision while its body address stays constant — always rooted in the chest.", why: "One pitch removes all melodic decision-making. Your brain is 100% focused on rhythmic creativity — which is where most groove comes from. Starting with the hear-feel cycle before singing ensures the body address stays connected even as rhythm varies." },
        { text: "Now go free: sing A in any rhythm you want. Try short bursts (da-da-da). Try long holds with silence between. Try syncopation — landing between the beats, before the beats, after the beats.", why: "Rhythmic improvisation on a single note is what drummers do with a snare. Your voice becomes a rhythmic instrument, not just a melodic one." },
        { text: "Match the guitar's rhythm exactly — voice doubles the strum on A. Then try the opposite: voice fills the spaces BETWEEN strums. When the guitar rings, you're silent. When the guitar is silent, you sing.", why: "Matching the guitar teaches rhythmic lock. Filling the gaps teaches rhythmic independence. Both are essential for singer-songwriting." },
        { text: "Try the reggae approach: sing A ONLY on the offbeats — the 'and' of each beat. Let the strum hit the downbeats, voice hits the upbeats. Feel the bounce.", why: "Offbeat singing is the rhythmic backbone of reggae and ska — genres in your DNA. Isolating this feel on one note makes it physical before it becomes melodic." },
        { text: "2-minute freestyle: sing A in any rhythm that comes to you. Let patterns emerge and dissolve. Don't repeat anything on purpose — let it flow. Record the last minute.", why: "Extended single-note rhythmic play builds the rhythmic vocabulary that will power your melodies later. When you add more pitches, this rhythmic confidence will already be there." }
      ],
      feel: "This should feel percussive — your voice is a drum that happens to be pitched. The groove matters more than the note. When you lock into a rhythm that makes you nod your head, you've found it.",
      wrong: "If you catch yourself changing pitch (moving to C or E), gently come back to A. The constraint IS the exercise. One note, infinite rhythms. If the rhythm feels stiff and metronomic, loosen up — swing it, push it, pull it.",
      sarah: "Gene, think of this like a reggae DJ toaster riding a riddim — one note, all groove. The rhythm IS the melody. Skinshape's vocal hooks are often just one or two notes with killer rhythm. That's what you're building here.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "A3"),
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      recorder: true
    },
    {
      id: "ss-3-3",
      time: 6,
      title: "Body Rhythm First",
      type: "rhythm",
      what: "NO singing. Strum Am on autopilot. Clap rhythms over the strum. Tap foot patterns. Sway. Feel rhythm physically before adding voice. Dalcroze eurhythmics says the body must internalize rhythm before the voice can express it.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Start the backing track. Now clap a simple rhythm over the strum — quarter notes on beats 1, 2, 3, 4. Just clap and strum. No voice at all.", why: "Dalcroze eurhythmics research shows that the body must internalize rhythm before the voice can express it. Clapping isolates the rhythmic sense from pitch decisions entirely." },
        { text: "Change the clap pattern: clap ONLY on beats 2 and 4 (the backbeat). Feel how this simple shift changes the entire groove — suddenly it's funky, it's reggae, it swings.", why: "The backbeat is the rhythmic foundation of every genre you love — reggae, soul, psych-rock. Feeling it in your hands before your voice ensures it becomes physical, not intellectual." },
        { text: "Now clap the offbeats — the 'and' of each beat. This is harder. Your hands clap BETWEEN the metronome clicks, between the strums. Feel the syncopation in your body.", why: "Offbeat clapping builds independence between your limbs and your internal pulse. When your voice eventually takes over these rhythmic placements, the body already knows how they feel." },
        { text: "Combine: strum on autopilot, foot taps quarter notes on the floor, and clap a syncopated pattern over both. 2 minutes of body-only rhythm. Let the groove sink into your bones.", why: "Multi-limb rhythmic independence is the physical foundation of groove. When your body grooves, your voice will naturally follow — it rides on top of the physical foundation." }
      ],
      feel: "This should feel physical and fun — like dancing while playing guitar. No singing means zero vocal pressure. Just groove. If your head starts bobbing, you're doing it right.",
      wrong: "If you catch yourself singing or humming, stop. The constraint is body-only rhythm. Your voice gets its turn in every other exercise — right now the body leads. If the clapping disrupts your strum, simplify the clap pattern.",
      sarah: "Gene, think of this like a drummer's warm-up — all groove, no melody. The reggae and soul grooves you love are body-first music. Ali Farka Touré's band grooves so hard because every player FEELS the rhythm physically before playing a note.",
      metronome: 80
    },
    {
      id: "ss-3-4",
      time: 6,
      title: "One-Note Conversation",
      type: "vocal",
      what: "Guitar plays a short rhythmic phrase on the note A (pluck the open A string). Voice answers on A — same pitch, different rhythm. Call-and-response where the only variable is RHYTHM. Guitar calls with one rhythm, voice answers with a contrasting rhythm. One note, pure rhythmic dialogue.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Pluck the open A string in a short rhythmic pattern — maybe 'da... da-da' (quarter, two eighths). Then answer with your voice: sing A in a DIFFERENT rhythm — maybe 'da-da-da... da' (three eighths, quarter). The pitch never changes. Only rhythm. During the guitar's call, hear your rhythmic response in your head before you sing it. The gap between call and response is audiation time — let the answer form silently inside before it becomes sound.", why: "Call-and-response separates guitar and voice in time — you're never doing both at once. With only one pitch available, all the musical interest comes from rhythmic contrast between the call and the response. Pre-hearing the response during the call builds the audiation habit naturally — the silence between call and response isn't dead time, it's creative time." },
        { text: "Make the guitar calls more complex: try syncopated patterns, dotted rhythms, bursts of fast notes. The voice must answer each call with a contrasting rhythm — if guitar was busy, voice is sparse; if guitar was sparse, voice fills in.", why: "Rhythmic contrast between call and response is what makes the conversation musical. An exact echo is boring. A contrasting response creates dialogue — one of the oldest musical forms." },
        { text: "Reverse: sing A in a rhythmic pattern first, then answer yourself on guitar (pluck the open A string in a different rhythm). Voice leads, guitar follows.", why: "Reversing who leads trains your voice to initiate musical ideas, not just respond. In songwriting, your voice will often lead — the guitar supports." },
        { text: "Alternate freely: sometimes guitar leads, sometimes voice leads. Let the conversation develop over 2 minutes. Record it — listen for moments where the rhythmic dialogue feels natural.", why: "Free alternation builds the fluid back-and-forth instinct between your voice and your guitar. Even with ONE note, a rhythmic conversation can be deeply musical." },
        { text: "Try this variation: guitar plays a rhythm, voice answers with the SAME rhythm but shifted by one beat (displaced). The echo is rhythmically offset. Feel how displacement creates groove.", why: "Rhythmic displacement — playing the same pattern but starting it on a different beat — is a core groove technique in reggae and funk. It creates a call-and-response that interlocks rather than alternates." }
      ],
      feel: "This should feel like a conversation between two musicians — except both are you, and both speak in rhythm only. Playful, responsive, listening. When a response 'answers' the call perfectly, you'll feel it click.",
      wrong: "If every response is an exact copy of the call, you're echoing, not conversing. Push for contrast — if the call was busy, answer with space. If the call was slow, answer with energy. Also, if you drift to other pitches, come back to A.",
      sarah: "Gene, reggae riddims often have one-note vocal hooks where the ENTIRE musicality is rhythm — the pitch is just a vehicle. Think of toasting, think of dub vocals. One note, all groove, pure conversation.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "A3"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },

    // ─── PHASE 2: TWO NOTES — ROOT + 5TH ───

    {
      id: "ss-3-5",
      time: 7,
      title: "Adding the Sky — Root & 5th",
      type: "vocal",
      what: "You've mastered the root. Now add ONE note: E, the perfect 5th. Strum Am with the drone on. Sing A (earth), then E (sky). Hold each for 8 beats against the drone. Feel the difference — A is grounded, E is open and spacious. These two notes are the skeleton of every chord.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Before starting: breathe in for 4 counts, then hum-sigh out for 6 counts, letting the pitch slide from comfortable to low. Repeat 3 times. This primes your vagus nerve, which directly controls the vocal folds — calming it loosens the instrument for the new range you're about to explore. Then strum Am on autopilot. Drone on. Sing A and hold it for 8 beats. Feel home — stable, locked, grounded. This is where you've been living. Now you're about to leave home for the first time.", why: "The vagus nerve innervates the larynx. When you're about to sing higher for the first time, nervous system activation can tighten the throat unconsciously. The hum-sigh primes the laryngeal environment. Revisiting the root before adding a new note reinforces the anchor. Your ear needs to remember 'home' vividly so it can feel the contrast when you move to the 5th." },
        { text: "Before singing E for the first time, close your eyes while the drone plays. The unified check — all three channels: Can you HEAR E forming internally — its specific brightness, distinct from A's warmth? Can you FEEL where E wants to live — it's higher in the body, behind the cheeks and the bridge of your nose instead of the chest? Can you SENSE what E expresses — openness? Aspiration? Spaciousness? Like standing on a hilltop looking at the horizon? When all three are vivid, sing E and hold it for 8 beats against the drone. Now sing A, then E. THREE things shift simultaneously: the sound rises, the body location migrates from chest to mask, and the emotional quality expands from grounded to open. Place one hand on your chest and one on your cheek — feel the vibration travel as the whole experience transforms.", why: "The perfect 5th is the second most consonant interval in music. It creates openness without tension — it's the 'sky' to the root's 'earth.' Moving from A to E is your first experience of the unified shift: pitch, body location, and emotional quality all change together as one integrated act. The vibration shift from chest to mask is bone-conducted resonance following different pathways — lower pitches transmit through the thorax, higher pitches resonate through facial bones. Nummenmaa 2024 (PNAS, n=1,938) confirmed these body maps are cross-culturally universal. You're building a somatic-emotional map where each note is a complete sensory package, not just a frequency." },
        { text: "Alternate slowly: A for 8 beats, E for 8 beats, A for 8 beats, E for 8 beats. Feel the distance between them — a wide, clean interval. Like stepping from ground to sky and back.", why: "Slow alternation lets your ear internalize the distance between root and 5th. This interval is the skeleton of every chord, every power chord, every bass line. Feeling it deeply now means you'll always know where these two notes live." },
        { text: "Improvise freely between ONLY A and E. Vary rhythm, duration, dynamics. Try long A followed by short bursts of E. Try rapid alternation. Try A in a whisper, E at full voice. Everything you learned in Phase 1 applies — but now with two colors.", why: "Two notes with full rhythmic and dynamic freedom is a creative universe. Constraint-based creativity research shows that limiting options increases both originality and depth. You'll be surprised how much music lives in just two pitches." },
        { text: "2-minute eyes-closed freestyle with just A and E. No rules, no targets. Let your ear guide you between earth and sky. Record it.", why: "Extended improvisation on two notes builds fluency and confidence. When you can make 2 minutes of interesting music with two pitches, three will feel luxurious." }
      ],
      feel: "A should feel like planting your feet on warm ground — heard in the chest, emotionally settled. E should feel like looking up at open sky — heard in the mask, emotionally expansive. Moving between them should feel like a gentle expansion and return where three things shift together: the sound, the body location, and the emotional quality. Always end on something that felt right — even just one clean A-to-E and back.",
      wrong: "If A and E feel the same to you, hold each one longer against the drone. The emotional difference is subtle but real — A is denser, more gravitational; E is lighter, more open. If you accidentally sing C (the 3rd), come back to your two-note palette.",
      sarah: "Gene, Tinariwen builds entire songs on root and 5th — those desert blues guitar lines that hypnotize you are often just two notes with incredible rhythm. You're tapping into the same ancient simplicity. Two notes, deeply felt, is enough for real music.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      pianoKeys: { notes: ["A3", "E4"], label: "Root & 5th", range: ["A3", "E4"] },
      metronome: 75,
      recorder: true
    },
    {
      id: "ss-3-6",
      time: 6,
      title: "Two-Note Rhythm & Dynamics",
      type: "vocal",
      what: "Two notes (A and E), but now vary rhythm AND dynamics simultaneously. Loud short A, quiet sustained E. Syncopated A, on-beat E. The constraint of two pitches forces all your creativity into rhythm and expression — and you'll be amazed how much music lives in just two notes.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Before each note, hear it forming inside — A in the chest, E in the mask. Let the body address arrive before the sound does. Sing A and E using only quarter notes, but vary the dynamics: A is loud, E is quiet. Then reverse: A is quiet, E is loud. As dynamics change, notice: does the body address shift too? Loud A fills the whole chest; whispered A barely buzzes the sternum. Loud E lights up the mask; quiet E hovers behind the cheekbones. Same note, same address, different intensity.", why: "Dynamic variation on two pitches creates the ILLUSION of more melodic complexity. The ear hears loud notes as more important — so you can create emphasis and phrasing with volume alone. Tracking body-address changes across dynamics deepens the somatic map." },
        { text: "Now vary rhythm: sing A as long held notes, E as short bursts. Then reverse. Then mix: long A, short E, short A, long E. The two pitches become a rhythm section.", why: "Combining pitch choice with rhythmic variation doubles your creative options. Two pitches times multiple rhythms equals a surprisingly rich vocabulary." },
        { text: "Try dynamic swells between the two notes: start A in a whisper, crescendo to E at full voice. Then start E loudly and diminuendo back to a whispered A. Volume contour creates drama.", why: "Dynamic contour across pitches is how melodies build and release tension. You're learning to shape musical phrases using volume as a tool — a skill that becomes powerful as your pitch vocabulary grows." },
        { text: "2-minute freestyle: combine A and E with full rhythmic freedom AND full dynamic range. Use everything — long notes, short bursts, whispers, full voice, syncopation, silence. Record it.", why: "When rhythm and dynamics are both variables, two notes become a complete musical language. This is the creative explosion that constraint-based practice produces." },
        { text: "Listen back to your recording. Find one moment where the rhythm and dynamics created something that surprised you — a phrase that sounded like a real melody despite being only two notes. That's the power of constraint.", why: "Self-listening builds critical ears. Identifying your best moments teaches you to recognize and reproduce your own musical instincts." }
      ],
      feel: "This should feel like painting with two colors — limited palette, but endless combinations when you add thick strokes, thin lines, bold splashes, and delicate washes. The two notes are your colors; rhythm and dynamics are your brushstrokes.",
      wrong: "If everything sounds the same volume and rhythm, you're not exploiting the tools. Push the extremes — make the loud notes LOUD and the quiet notes barely audible. Make the short notes punchy and the long notes endless. Exaggerate, then find the middle.",
      sarah: "Gene, think about how Khruangbin's bass lines often hover on just two notes but feel infinitely musical — because the rhythm and dynamics are doing all the work. That's exactly what you're building here. Two notes, all feel.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-3-7",
      time: 6,
      title: "Two-Note Conversation",
      type: "vocal",
      what: "Guitar plays a phrase using A and E. Voice answers using A and E. Now the conversation has TWO variables — rhythm AND pitch choice. But with only 2 pitches, the decisions stay manageable. Notice how even with just root and 5th, the conversation has melodic contour.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Pluck a short phrase using the open A string and the E on the 2nd fret of the D string (or open high E). Two notes, simple rhythm. Then answer with your voice: sing A and E in a contrasting rhythm. The conversation now has pitch AND rhythm.", why: "Adding a second pitch to the call-and-response transforms it from rhythmic dialogue into melodic dialogue. Even with just two notes, the conversation now has contour — notes go up, notes go down." },
        { text: "Make the guitar call emphasize A (mostly root, with E as a passing touch). Make the voice answer emphasize E (mostly 5th, with A as a landing). Each speaker has a different 'home' within the same two notes.", why: "Emphasis shifts create character. When guitar lives on the root and voice lives on the 5th, the conversation has complementary voices — grounded vs. spacious." },
        { text: "Reverse: voice calls, guitar answers. Sing a two-note phrase, then respond on guitar. Let the guitar's response be influenced by what the voice suggested.", why: "Voice-led call-and-response trains your singing to generate musical ideas, not just react. In songwriting, the vocal melody often comes first — the guitar must follow." },
        { text: "Free conversation over the backing track: alternate guitar and voice, both using only A and E. During the guitar call, hear your response forming — feel whether it wants to live in the chest (A) or the mask (E). When the body address is vivid, sing it. 2 minutes. Let the desert blues groove guide your phrasing. Record it.", why: "The backing track provides context and groove that shapes your conversation. The two-note constraint keeps the focus on interaction rather than note choice. Pre-feeling the body address during the call turns reactive singing into audiated response." }
      ],
      feel: "This should feel like two desert blues musicians trading phrases across a campfire — minimal notes, maximum feeling. The conversation should breathe, with space between each call and response.",
      wrong: "If the conversation feels mechanical (call-answer-call-answer with no variation), break the pattern. Let the guitar play two phrases in a row. Let the voice interrupt. Real conversations aren't perfectly alternating.",
      sarah: "Gene, desert blues is BUILT on this — Tinariwen and Ali Farka Touré trade phrases on just a few notes, and the conversations go on for 10 minutes. You're learning the same language, starting with the same simplicity.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-3-8",
      time: 6,
      title: "Silent Sing — Two Notes",
      type: "vocal",
      what: "Audiation exercise. Strum Am. Hear A in your head — don't sing, just imagine the pitch. Hold that mental pitch for 4 beats. Then sing it out loud. Did it match? Now try E internally, then sing. Alternate: 4 bars of silent hearing, 4 bars singing. Training the inner ear with just two pitches keeps it simple.",
      setup: "Guitar. Metronome at 75 BPM (slower for internal hearing).",
      steps: [
        { text: "Strum Am on autopilot. Close your eyes. Hear A in your head — don't sing, don't hum, just imagine the sound as vividly as you can. But don't stop at the pitch. Feel where A lives in your body even in silence — does your chest buzz faintly, as if remembering the vibration? And what does A WANT in this moment — is it home, is it rest, is it grounding? Hold all three: the pitch, the body sensation, and the emotional intention. 4 beats of unified silence.", why: "Gordon's audiation research (Stage 6) shows that pre-hearing activates auditory cortex BEFORE motor cortex. Zamorano (2025) found that body-awareness (interoception) is trainable and predicts musical competence. Adding the emotional intention layer means you're audiating the COMPLETE musical experience, not just a frequency. The body and emotions respond to imagined music almost identically to real music. Silent practice of the full cycle is real practice." },
        { text: "After 4 beats of unified silence, sing A out loud for 4 beats. Did all three match? Did the pitch land where you heard it? Did the body sensation arrive where you felt it? Did the emotional quality carry through? The gap between your internal experience and the sound that comes out is your 'embodiment gap' — you're closing it.", why: "Checking your full internal experience against the actual sound calibrates all three channels at once. Aarhus University (2021) found that combined imagery + singing produces equal learning in one-third the time of singing alone. Adding body and emotional awareness makes the check richer — you're not just tuning pitch, you're tuning presence." },
        { text: "Now try E: hear it silently for 4 beats, then sing it for 4 beats. Then alternate: silent A (4 beats), sing A (4 beats), silent E (4 beats), sing E (4 beats). The silent bars are the exercise — the singing bars are the check.", why: "Two pitches gives your audiation exercise a simple choice — which note am I hearing internally? This is the seed of hearing melodies before you sing them." },
        { text: "Freestyle: hear short two-note phrases internally (A-E, E-A, A-A-E, E-E-A) for 4 bars, then sing them out for 4 bars. Mid-pass embodiment check: are you still hearing each note before it arrives, AND feeling the body location shift (chest to mask and back), AND sensing the emotional shift (grounded to open and back)? Or has autopilot kicked in and you're just making sounds? If autopilot kicked in — good, you noticed. That moment of noticing IS the rep. Gently return to the full cycle: hear it, feel it, choose it.", why: "Extending unified embodiment from single notes to two-note phrases is the natural progression. The embodiment check is richer than a pitch-only check — you're monitoring three channels, not one. Catching your mind wandering on ANY channel and returning to intentional presence is exactly how the skill strengthens." },
        { text: "Final challenge: hear a 2-bar phrase using A and E in your head, with a specific rhythm. Then sing it exactly as you heard it. How close was it? Try 3 times. Each attempt should be more accurate.", why: "Combining pitch and rhythm in audiation is harder than pitch alone. But it's exactly what happens when a melody 'comes to you' — you hear it inside, then reproduce it. This exercise makes that process conscious." }
      ],
      feel: "This should feel meditative and deeply present — you're not just hearing music in your head, you're LIVING it silently: the pitch, the body sensation, the emotional quality all held at once. The silent bars should feel FULL, not empty. When you sing and all three channels match what you held in silence, that's embodiment.",
      wrong: "If you're humming or whispering during the 'silent' bars, you're bypassing the audiation. True internal hearing means no sound at all — just the vivid mental image of the pitch. If you can't hear it internally, start with A (it's more familiar) and hold it in your mind like a memory. If you sing a wrong note, that's not a failure — it's a prediction error. Your brain predicted one thing and something else came out. That gap is exactly how the model updates and improves.",
      sarah: "Gene, every musician you admire hears the music before they play it. Mark Speer knows what's coming because he hears it internally first. This exercise builds that skill — and keeping it to just two notes means your inner ear can actually succeed.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── PHASE 3: THREE NOTES — THE FULL TRIAD ───

    {
      id: "ss-3-9",
      time: 8,
      title: "Adding the Blue — The Minor 3rd",
      type: "vocal",
      what: "The third note changes EVERYTHING. Add C — the minor 3rd. Root (A) is earth. 5th (E) is sky. 3rd (C) is the emotional center, the ache, the blue in the golden hour. Hold each against the drone. The minor 3rd is what makes Am sound minor — it's where the feeling lives. Now you have a complete triad: earth, blue, sky.",
      setup: "Guitar optional — the drone anchors you. Metronome at 70 BPM (slow, contemplative).",
      steps: [
        { text: "Before starting: breathe in for 4 counts, then hum-sigh out for 6 counts. Repeat 3 times. The minor 3rd you're about to explore is emotionally charged — your vagus nerve can tighten the throat in response to emotional intensity. This isn't relaxation; it's preparing the instrument. Then turn on the drone (A). Sing the root A. Hold it for 8 beats. Feel home — earth, gravity, warmth. You know this note deeply now. Let it ground you.", why: "The vagus nerve directly controls the vocal folds. Emotionally charged intervals (the minor 3rd especially) can trigger nervous system activation that tightens the larynx. The hum-sigh primes the environment. Revisiting the root before adding the third note ensures your anchor is solid. The new note will feel more vivid against a well-established home base." },
        { text: "Sing the 5th (E). Hold it for 8 beats against the drone. Feel the sky — open, spacious, stable. You know this one too. Earth and sky, your two-note world.", why: "Confirming both existing notes before adding the third creates a clear before-and-after. You'll feel the triad as root + 5th PLUS a transformative new addition, not just 'three notes.'" },
        { text: "Before singing C, the full unified check. Close your eyes. Can you HEAR C's specific pitch — lower than E, higher than A, sitting between earth and sky? Can you FEEL it in the throat and jaw — between A's chest warmth and E's mask brightness? And most importantly: can you FEEL the ACHE? C is where EMOTION lives in the chord. The minor 3rd is the emotional center of every blues, every melancholy golden-hour melody. The ache isn't in the theory — it's in your body. Where do you feel longing? That's where C lives. When all three channels are vivid — the pitch, the body location, the emotional pull — sing C. Hold it for 8 beats against the drone. Place your hand on your throat. The minor 3rd's ache has a physical address. Dissonant intervals recruit more somatosensory cortex than consonant ones (PMC5608010) — your body is literally more engaged during this emotional tension.", why: "C is the first note where the emotional channel becomes unmistakable. A's grounding and E's openness are subtle emotional qualities. C's ache is visceral — and it maps to a distinct body location (throat/jaw) that sits between A's chest and E's mask. The unified experience of C — hearing its pitch, feeling its throat-location, sensing its emotional pull — is the most complete version of the hear-feel-choose cycle so far. Each note now has a full sensory-emotional package: A = chest/grounding, C = throat/ache, E = mask/openness. The fact that the most emotionally charged interval also activates a different body zone is not coincidence — the body's somatosensory system is more engaged during harmonic tension." },
        { text: "Paint freely between all three: root (earth) → 5th (sky) → 3rd (blue) → root (home). Move between them at any speed, in any order. Feel each color as you arrive. 2 minutes with eyes closed. Reach for feelings, not note names.", why: "When each interval has an emotional identity — not just a name — you can reach for feelings instead of theory. 'I want openness' = sing the 5th. 'I want ache' = sing the 3rd. Notes as colors, not numbers." },
        { text: "Try the same palette over G major: root G (earth), major 3rd B (gold, sunshine — brighter than the minor 3rd!), 5th D (sky). Feel how the major 3rd has a completely different color — golden instead of blue. Warm instead of aching.", why: "Major 3rd vs minor 3rd is the most important emotional distinction in music. Hearing this difference in your body (not just in theory) means you can shift the mood of any improvisation by choosing which 3rd to sing." },
        { text: "Alternate: Am palette (A-C-E, blue) for 4 bars, then G palette (G-B-D, gold) for 4 bars. Feel the color shift as the chord changes — blue to gold and back. Record it.", why: "Hearing major vs minor as emotional colors rather than theory labels is the foundation of expressive singing. Your voice becomes a paintbrush choosing between warmth and melancholy." }
      ],
      feel: "Each note should feel like dipping your brush in a different color. A is grounding earth. E is expansive sky. C is the emotional blue — the one that gives the chord its character. When you land on C, you should feel a subtle ache, a pull, a depth that the root and 5th don't have.",
      wrong: "If all three notes feel the same to you, slow down even more. Hold each one for 16 beats against the drone. Close your eyes and run the full check: WHERE does this note vibrate (chest? throat? cheeks?)? WHAT does it express (grounding? ache? openness?)? The body location and the emotional quality are two separate channels that both confirm each note's identity. If you can feel the body difference but not the emotional difference, or vice versa, that's progress — one channel is waking up. The other will follow.",
      sarah: "Gene, this is the exercise that turns theory into feeling. The blue in the golden hour, the ache in an Allah-Las melody, the melancholy warmth of Khruangbin — it all lives in the minor 3rd. When you reach for a note because of how it FEELS instead of what it's CALLED, you're singing like an artist.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am Triad", range: ["A3", "E4"] },
      metronome: 70,
      recorder: true
    },
    {
      id: "ss-3-10",
      time: 6,
      title: "Three-Note Rhythm Cells",
      type: "vocal",
      what: "Kodály rhythm cells applied to the triad. 'Ta' (quarter note) on A, 'ti-ti' (two eighths) on C-E, 'ta-ah' (half note) on A. Named rhythm patterns meet pitched notes. The triad becomes rhythmically alive — each cell is a building block for melodic phrases.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Review the four rhythm cells by speaking them: 'ta' (quarter note), 'ti-ti' (two eighth notes), 'ta-ah' (half note), 'ti-ka-ti-ka' (four sixteenth notes). Speak each one 4 times while strumming Am. Get the rhythms in your mouth.", why: "Kodály rhythm syllables give names to rhythmic patterns. Named patterns are easier to recall, combine, and manipulate than abstract rhythms. You learned these in Phase 1 — now they meet pitched notes." },
        { text: "Assign the triad to cells: 'ta' = A (quarter note on the root — feel it in the chest). 'Ti-ti' = C-E (two eighths, stepping up through the triad — feel the vibration climb from throat to mask). 'Ta-ah' = A held for 2 beats (root sustain — settle back into the sternum). Before each cell, hear the notes internally and feel their body addresses. Sing each pattern 4 times.", why: "Mapping rhythm cells to specific chord tones creates melodic building blocks. Each cell becomes a tiny melodic fragment — a musical word you can string into phrases. Adding body-address awareness to rhythm cells means the cells are somatic events, not just rhythmic patterns." },
        { text: "Combine cells into 4-beat patterns: 'ta ti-ti ta-ah' = A, C-E, A-held. Or 'ti-ti ta ti-ti' = C-E, A, C-E. Create and sing 4 different 4-beat combinations.", why: "Combining cells is rhythmic composition with melodic content. You're not just stringing rhythms together — you're creating melodic phrases with intentional pitch and rhythm choices." },
        { text: "Try 'ti-ka-ti-ka' on the full triad: A-C-E-C as four sixteenth notes, rapid ascending-descending through the chord. Then combine it with the other cells: 'ti-ka-ti-ka ta-ah' = rapid triad run followed by a sustained root.", why: "Sixteenth notes on the triad create a cascading effect — the chord tones blur into a quick melodic line. This is the seed of faster melodic runs that will come in later levels." },
        { text: "Free combination for 2 minutes: string cells together in any order, assigning any triad note to any cell. Let the cells generate phrases you wouldn't have invented from scratch. Record it.", why: "The cell system gives you a vocabulary of rhythmic-melodic building blocks. Combining them freely produces phrases that are structured but not predictable — the sweet spot for improvisation." }
      ],
      feel: "This should feel like learning a rhythmic language — each cell is a word, and you're building sentences. The triad notes give the words meaning, and the rhythms give them groove.",
      wrong: "If the cells blur together and you can't distinguish 'ti-ti' from 'ti-ka-ti-ka,' slow the metronome to 60 BPM. Clarity matters more than speed. Each cell should be crisp and distinct.",
      sarah: "Gene, reggae music is built on rhythm cells — the offbeat chop, the one-drop, the skank. Now those rhythmic patterns have chord tones in them. You're building the vocabulary that turns rhythmic grooves into melodies.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      rhythmCells: [
        { name: "Ta", pattern: [1], description: "Quarter note" },
        { name: "Ti-Ti", pattern: [0.5, 0.5], description: "Two eighth notes" },
        { name: "Ta-ah", pattern: [2], description: "Half note" },
        { name: "Ti-ka-ti-ka", pattern: [0.25, 0.25, 0.25, 0.25], description: "Four sixteenth notes" }
      ]
    },
    {
      id: "ss-3-11",
      time: 7,
      title: "Three-Note Conversation",
      type: "vocal",
      what: "Guitar plays a short phrase using A, C, E. Voice answers with A, C, E. Now the conversation has full triadic color — the call might emphasize the root, the response might lean on the blue 3rd. Each exchange has emotional content, not just rhythm.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play a short guitar phrase using the Am triad (A-C-E) — maybe pick the three notes slowly, or strum and let a single-note melody emerge from the chord shape. Then answer with your voice: sing a phrase using A, C, and E.", why: "The conversation now has full triadic color. The call can lean on the root (grounded), the response can lean on the 3rd (emotional), or vice versa. Each exchange has character, not just rhythm." },
        { text: "Make the guitar call emphasize the root (A) — grounded, earth-toned. Make the voice answer emphasize the minor 3rd (C) — aching, blue. Feel how the conversation has emotional depth even though both speakers use the same three notes.", why: "When different voices emphasize different chord tones, the conversation has complementary emotional colors. Guitar provides the earth, voice provides the blue. This is exactly how great singer-songwriting works." },
        { text: "Try a different emotional split: guitar plays a phrase heavy on the 5th (E) — open, spacious. Voice answers heavy on the root (A) — grounding the openness. The conversation has a push-pull between expansion and return.", why: "Each chord tone creates a different emotional gravity. Learning to distribute emphasis between guitar and voice gives your future songs depth — the instruments complement rather than duplicate each other." },
        { text: "Free conversation over the backing track: alternate guitar and voice, both using A-C-E. 2 minutes. Let the Khruangbin groove shape your phrasing. Record it.", why: "The backing track provides a rhythmic context that shapes the conversation. With the full triad available, your phrases now have genuine melodic contour and emotional range." },
        { text: "Listen back. Find the exchange where the voice answer made the guitar call sound better — where the response elevated what came before. That's the magic of musical conversation.", why: "Self-listening for conversational quality trains you to hear interaction, not just individual lines. The best singer-songwriting is a conversation between voice and guitar, not a voice solo with accompaniment." },
        { text: "One more round: during the guitar call, hear your triadic response forming in your mind before you sing it. Let the full phrase — notes, rhythm, dynamics — crystallize silently during the call. By the time you sing, the phrase should feel like recognition, not invention. 2 exchanges with this intentional pre-hearing.", why: "Audiating the response during the call is a higher-order skill — you're hearing not just a single pitch but a complete musical phrase internally. When the response feels like recognition rather than invention, your inner ear has moved from passive listening to active musical thinking." }
      ],
      feel: "This should feel like Khruangbin — Mark plays a triadic phrase, Laura answers with her voice. Relaxed, groovy, conversational. The three notes give you enough color for real musical dialogue.",
      wrong: "If guitar and voice are playing identical phrases (exact echoes), push for contrast. A good musical conversation has agreement AND surprise — the response acknowledges the call but adds something new.",
      sarah: "Gene, Khruangbin does this constantly — Mark plays a triadic phrase, Laura answers. Their conversations are simple (often just chord tones) but they feel deep because the EMPHASIS shifts between call and response. That's exactly what you're building.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-3-14",
      time: 6,
      title: "Silent Sing — Three Notes",
      type: "vocal",
      what: "Extend the unified embodiment cycle to the full triad. As you audiate A-C-E silently, notice THREE things shifting: the pitch changes (hear each note distinctly), the body location changes (chest to throat to mask), and the emotional color changes (home to ache to sky). These three shifts ARE the triad — not just acoustically, but somatically and emotionally. When you can track all three shifts in silence, you're audiating with your whole body.",
      setup: "Guitar optional. Drone on A. Pitch detector on. Metronome at 70 BPM.",
      steps: [
        { text: "Warm up the audiation pathway: drone on A. Close your eyes. Hear A silently for 4 beats, then sing it for 4 beats. Hear E silently for 4 beats, then sing it. This is review — you've done this in ss-3-8. It should feel familiar now.", why: "Starting with the two-note audiation you've already practiced builds confidence before adding the new note. The transition from two-note to three-note audiation should feel like a natural extension, not a leap." },
        { text: "Now the new note: hear C internally with the full embodiment. Close your eyes, feel the drone on A, and imagine C — not just the pitch, but the complete experience. Hear its specific frequency between earth and sky. Feel it gathering in your throat and jaw — between A's chest warmth and E's mask brightness. And sense the ache — that bittersweet pull that makes the minor 3rd the emotional heart of everything. Hold all three channels for 4 beats in silence, then sing. Check with pitch detector. Did the full embodied C survive the translation to sound? Try 3 rounds.", why: "C is the hardest triad note to audiate because it's the most emotionally charged — which makes it the best test of unified embodiment. If you can hear the pitch, feel the body location, AND sense the emotional quality of C in silence, you're audiating with your whole being, not just your ear. The three-channel representation is actually more stable than pitch alone because each channel reinforces the others." },
        { text: "Two-note silent patterns within the triad. Hear A-C in your mind (earth to blue), hold the two-note phrase for 4 beats, then sing it. Hear C-E (blue to sky), hold, sing. Hear E-A (sky back to earth), hold, sing. Each pair has a different emotional contour — descending warmth, ascending openness, returning gravity.", why: "Audiating intervals (not just single notes) is a significant step up. You're hearing the RELATIONSHIP between two pitches, not just isolated tones. Each pair has a distinct emotional signature: A-C pulls inward (minor 3rd, ache), C-E opens outward (major 3rd, brightness), E-A returns home (perfect 4th, resolution)." },
        { text: "Full triad embodiment: hear A-C-E as a slow ascending pattern in your mind. As each note passes through your internal hearing, track all three channels — the pitch rising, the body location climbing from chest through throat to mask, and the emotional arc expanding from grounded through aching to open. Hold the complete three-channel phrase internally for one full bar. Then sing it. Now try descending: E-C-A. Feel everything reverse — the pitch falling, the vibration sinking from mask to chest, the emotion settling from openness through ache to home. Try A-E-C (earth-sky-blue). Each ordering creates a different unified journey.", why: "Three-note phrases audiated with full embodiment are where the unified cycle starts to feel like real musical thinking. The ascending triad (A-C-E) is an embodied journey: pitch rises, body location climbs, emotion opens. The descending triad (E-C-A) reverses all three. Different orderings create different unified arcs — and you can sense these complete arcs even in silence." },
        { text: "Free audiation: close your eyes and hear a 2-bar phrase using all three notes (A, C, E) in any order, any rhythm. Let it form fully in your mind — hear it complete before you sing a note. Then sing the whole phrase. How much of the internal version survived the translation to sound? Try 3 phrases. Each one, let the internal hearing be a little more vivid, a little more detailed.", why: "This is the capstone: generating complete musical phrases internally before singing. When a melody 'comes to you' in the future, this is what's happening — your inner ear is composing in silence. The gap between what you hear inside and what you sing is the audiation gap. Every phrase you practice closes it further." },
        { text: "Final reflection: which note is easiest to embody fully — to hear, feel, and emotionally inhabit all at once? Which channel is strongest — can you hear pitch easily but struggle to feel the body location? Can you feel the emotion but lose the pitch? For most people, A is easiest to embody fully because it has the most practice. C is often hardest because its emotional charge makes the body and feeling channels vivid but the pitch less certain. Notice your personal pattern. In Level 4, you'll extend this unified cycle to the full pentatonic scale.", why: "Self-awareness about your embodiment strengths and weaknesses guides future practice. Knowing which CHANNEL needs work (pitch? body? emotion?) is more useful than just knowing which NOTE is hard. The notes that are hardest to embody fully are often the ones that carry the most musical meaning — they deserve the most integrated attention." }
      ],
      feel: "This should feel like the inner counterpart to the singing exercises before it. Instead of making sound, you're EMBODYING music silently — hearing each note, feeling its body address, sensing its emotional quality, all in silence. The silence should feel full, not empty — your mind and body are actively composing. When you sing and all three channels match what you held internally — pitch, body location, and emotional color — there's a quiet satisfaction, like remembering a vivid dream accurately. Three-note predictions are harder than one because your prediction model must hold more variables — pitch, body location, and emotion for each note simultaneously.",
      wrong: "If you're singing or humming during the silent bars, you're bypassing the exercise. The entire point is internal hearing without external sound. If you can't hold three notes internally yet, go back to one note at a time — audiation builds in layers. Also, don't stress about pitch-perfect accuracy. The goal is vivid internal hearing, not perfect reproduction. A wrong note isn't a failure — it's a prediction error that tells your brain exactly where to update its model.",
      sarah: "Gene, this is where audiation becomes real musical thinking. Hearing a full triad internally — earth, blue, sky — means your inner ear has a complete harmonic palette. Khruangbin's Laura Lee has talked about hearing the bass line in her head before her fingers find it. You're building that same skill, starting with the simplest possible harmonic structure.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "Am Triad", range: ["A3", "E4"] },
      metronome: 70,
      recorder: true
    },
    {
      id: "ss-3-12",
      time: 7,
      title: "Emotional Color — Three Moods",
      type: "vocal",
      what: "Same three notes (A-C-E), same Am strum — but three completely different emotional deliveries. Lazy sunset: slow, breathy, lots of space. Driving energy: shorter notes, more rhythmic. Mystery: quiet, long silences, notes decay into nothing. The notes don't change; YOU change.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Before you begin: what ONE thing will you listen for that would tell you this is working? Maybe: 'I want to feel the emotional shift when I change colors.' Or: 'I want to notice where the vibration moves between moods.' Set that listening target now. Then strum Am on autopilot. Sing A-C-E with 'lazy sunset' energy: slow, breathy, lots of space between notes. Think DOPE LEMON on the porch at golden hour. Let notes hang in the air and dissolve. Vowels are soft ('ooh,' 'oh'). 2 minutes.", why: "Setting a specific listening target before practicing (metacognitive planning) improves outcomes by 23% over practice-only approaches. Emotional intention transforms identical notes into completely different music. 'Lazy sunset' engages specific vocal muscles — relaxed jaw, gentle breath support, minimal effort. The body creates the emotion." },
        { text: "Same notes, new color: 'driving energy.' Shorter notes, more rhythmic, slightly louder, more forward in the beat. Think Skinshape locked into a groove. Notice the body shift: the resonance moves forward — A pushes from deep chest to mid-chest, C buzzes more in the front of the jaw, E sharpens in the nose bridge. The notes punch rather than float. Hear each one forming with that forward energy before it leaves your mouth. 2 minutes.", why: "Energy and urgency come from rhythm and attack, not from higher notes or louder volume. Your porch register can drive just as hard as a belt — it's about rhythmic commitment and forward placement. Tracking the body-location shift between colors makes each emotional mode a fully embodied choice." },
        { text: "Same notes, third color: 'mystery.' Sing quietly, leave long silences between notes, let each note decay into nothing before the next one arrives. Think Tinariwen in the desert at night. 2 minutes.", why: "Mystery comes from space and restraint. Fewer notes, more silence, letting the listener's imagination fill the gaps. This is the hardest color because your instinct is to fill silence." },
        { text: "Free round: improvise with A-C-E while shifting between all three colors. Sunset drifts into energy, energy dissolves into mystery, mystery warms into sunset. 2 minutes, no plan. Let the shifts happen when they want to.", why: "Emotional fluidity is the highest form of vocal expression. When you can shift feeling in real time with just three notes, your future songs will have dynamic range that keeps listeners engaged." },
        { text: "Record one more 2-minute pass. This time, let one color dominate — whichever felt most natural. That's probably closest to your authentic vocal personality. Notice which one you gravitate toward. After: what did you notice? What surprised you? What will you focus on next time? This reflection locks in the learning.", why: "Self-awareness about your natural emotional tendency is valuable. Your default color is your starting point — the other colors are tools you can reach for when a song needs them. Post-practice reflection (metacognition) improves retention by 23% over practice-only." }
      ],
      feel: "Each emotional color should feel different in ALL three channels — lazy sunset sounds breathy and warm (pitch), relaxes your jaw and throat (body), and carries the feeling of golden-hour contentment (emotion). Driving energy sounds rhythmic and forward (pitch), engages your diaphragm (body), and carries urgency (emotion). Mystery sounds sparse and quiet (pitch), pulls your voice inward (body), and carries the feeling of the unknown (emotion). The hear-feel-choose cycle is the same — only the emotional intention changes, and the body follows.",
      wrong: "If all three colors sound the same, you're not committing to the emotion. Exaggerate. Make the sunset version absurdly lazy — yawning between notes. Make the energy version almost aggressive. Make the mystery version so quiet you can barely hear it. The middle ground will find itself.",
      sarah: "Gene, your artists all do this instinctively — Allah-Las shift from dreamy to intense within a single song. DOPE LEMON lives in the sunset color. Skinshape drives harder. You're building that same emotional range, but with just three notes. The notes don't change; you do.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true,
      levelUp: "Can sing the root with stability and rhythmic variety, navigate between root and 5th with confidence, feel the minor 3rd as emotional color, hold musical conversations at every note stage from one to three notes, internalize rhythm through body percussion and Kodály cells, and audiate individual notes and triadic phrases silently before singing — hearing the pitch, the interval, and even the emotional color internally before it becomes sound. All while the guitar strum stays on autopilot."
    }
  ]
};
