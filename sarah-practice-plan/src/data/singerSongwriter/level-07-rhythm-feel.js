import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "Rhythm & Feel",
  subtitle: "The groove is the song. Everything else is decoration.",
  description:
    "Stoloff's Berklee principle: rhythm before pitch. Most singer-songwriters focus on melody and ignore rhythm — but groove is what makes people move. This level builds body-based rhythm (Dalcroze), rhythmic syllables (Kodály), and genre-specific feels. You'll learn to FEEL rhythm in your body before you put it in your voice. Based on motor learning research: rhythmic confidence must precede melodic improvisation.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero, Pepper",
  unlocks: "Melody Building (Level 8)",
  review: { label: "Level 5-6 Check-In", time: 5, exercises: ["ss-5-16", "ss-6-3"], prompt: "Sustain 5-minute freestyle over changes (ss-5-16). Then create a 4-bar melody over chord changes (ss-6-3). Both solid? Move on." },
  exercises: [
    {
      id: "ss-7-1",
      time: 5,
      title: "Body Metronome",
      type: "rhythm",
      what: "Internalize the beat in your body BEFORE it reaches the guitar. Foot stomps beat 1, hand claps beat 3, voice counts '1-2-3-4.' Three rhythmic layers — all body, no instrument. Based on Dalcroze eurhythmics: the body is the first instrument.",
      steps: [
        { text: "Set metronome to 85 BPM. Stomp your foot on beats 1 and 3. Just the foot, nothing else. Feel the pulse in your whole body.", why: "The foot grounds the rhythm physically. It's the oldest metronome — every culture uses body percussion before instruments." },
        { text: "Add a hand clap on beats 2 and 4 (the backbeat). Stomp-clap-stomp-clap. This is the universal groove pattern of pop, rock, reggae, and soul.", why: "Beats 2 and 4 are the backbeat — the heartbeat of groove music. Getting this in your body makes every genre feel natural." },
        { text: "Add your voice: count '1-2-3-4' while stomping and clapping. Three simultaneous rhythmic outputs — body percussion + voice.", why: "Three layers of rhythm is actually what singing while playing guitar demands. Foot (tempo), hands (pattern), voice (lyrics). This is the same architecture." },
        { text: "Now count '1-and-2-and-3-and-4-and' — subdivide into 8th notes while maintaining the stomp-clap. If your body stays locked while your voice subdivides, your rhythm is internalized.", why: "Subdividing over a body groove proves the rhythm is in autopilot. Your voice can now add complexity without disrupting the foundation." }
      ],
      feel: "This should feel like dancing — rhythm living in your whole body, not just your hands. If you're bobbing, swaying, or moving naturally, the groove is real.",
      wrong: "If your foot stomps are uneven or your claps drift off the metronome, slow down. Body rhythm needs to be rock-solid before you add guitar.",
      sarah: "Gene, this is Dalcroze 101 — the method used by Berklee, Juilliard, and every top conservatory. The body learns rhythm faster than the mind. Trust it.",
      metronome: 85
    },
    {
      id: "ss-7-2",
      time: 6,
      title: "Rhythmic Syllables",
      type: "rhythm",
      what: "Use Kodály rhythm syllables to internalize rhythmic patterns vocally. 'Ta' = quarter note. 'Ti-ti' = two 8th notes. 'Ti-ka-ti-ka' = four 16th notes. Speaking rhythm patterns trains the exact same motor pathways you'll use for vocal melody rhythm.",
      steps: [
        { text: "At 85 BPM, speak: 'ta, ta, ta, ta' — one syllable per beat. Steady, even quarter notes.", why: "Quarter notes are the rhythmic foundation. 'Ta' is a sharp, percussive syllable that locks to the beat naturally." },
        { text: "Now: 'ta, ti-ti, ta, ti-ti' — alternating quarter notes and 8th-note pairs. The 'ti-ti' doubles the speed on beats 2 and 4.", why: "Mixing durations is where rhythm gets interesting. This pattern is the backbone of most folk and rock vocal rhythms." },
        { text: "Try: 'ti-ti, ti-ti, ta, ta' — busy start, simple ending. Then reverse it. Then make up your own pattern.", why: "Creating your own rhythmic patterns is rhythmic composition. You're writing rhythm the same way you'll write melody." },
        { text: "Challenge: speak your rhythm pattern while stomping beats 1 and 3. The body holds steady while the voice plays with rhythm.", why: "Body-voice independence is the exact skill you need for singing over guitar. The stomp is the strum; the syllables are the vocal rhythm." }
      ],
      feel: "Kodály syllables should feel percussive and fun — like beatboxing with a system. The syllables are tools, not music theory. They help you feel and communicate rhythm.",
      wrong: "If your 'ti-ti' is slower or faster than two even 8th notes, you're not subdividing cleanly. Use the metronome as your guide — each 'ti' lands exactly on the subdivision.",
      sarah: "Gene, this might feel elementary, but Kodály rhythm training is used at the highest levels of music education. It works because it makes rhythm physical and vocal simultaneously.",
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-7-3",
      time: 8,
      title: "Groove Lock",
      type: "guitar",
      what: "Strum along with a backing track and LOCK into the groove. Don't just play in time — feel where the drums, bass, and guitar create a unified pulse. When you're locked in, your strum becomes part of the recording. This is 'entrainment' — your body syncing to external rhythm.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Play the Groove Beat track. Just listen for 30 seconds. Find the kick drum. Find the snare. Find the hi-hat. Know where each one lives.", why: "Identifying the drum elements lets you sync your strum to specific rhythmic anchors. The kick is beat 1, the snare is beat 2 and 4." },
        { text: "Start strumming along — simple downstrokes first. Match your strum to the hi-hat rhythm. When your strum disappears into the track, you're locked.", why: "The 'disappearing strum' test: if you can't hear your guitar as separate from the recording, your timing is perfect." },
        { text: "Switch to the Dub Reggae track. Change your strum to offbeat chops. Lock into the reggae pocket — your chops should sit between the kicks.", why: "Different genres have different pockets. Locking into reggae after a straight groove proves your rhythm is adaptable, not rigid." },
        { text: "Try this: close your eyes and feel where the groove 'wants' your strum. Let the backing track pull your hand. Don't think — just feel.", why: "Entrainment is subconscious. When you stop thinking about timing and let the groove carry you, that's real musicianship." }
      ],
      feel: "When you're locked into a groove, it feels effortless — like the music is playing you. Your body moves naturally. Time disappears. This is the 'flow state' of rhythm.",
      wrong: "If your strum sounds separate from the track (you can clearly hear two rhythmic sources), you're not locked. Adjust micro-timing: try playing slightly behind the beat (laid-back) or right on top.",
      sarah: "Gene, groove lock is the difference between a metronome player and a musician. Your favorite artists — Khruangbin, Skinshape — have supernatural groove. This exercise builds that feel.",
      metronome: 90,
      recorder: true
    },
    {
      id: "ss-7-4",
      time: 8,
      title: "Feel Shifts",
      type: "guitar",
      what: "Play the SAME chord progression (Am-C-G-Em) in 4 different genre feels: reggae offbeat, surf jangle, soul strum, and desert blues. Same chords, totally different vibes. Your right hand creates the genre — not your left. This is constraint-led approach (CLA): same task, different movement solutions.",
      steps: [
        { text: "Reggae: muted offbeat chops at 85 BPM. Am-C-G-Em. Choppy, bouncy, laid-back. 2 minutes.", why: "The reggae chop emphasizes the 'and' of each beat. It creates space — the silence between chops is as important as the sound." },
        { text: "Surf jangle: continuous 8th-note down-up at 100 BPM. Same chords. Shimmering, continuous, bright. 2 minutes.", why: "Jangle is the opposite of reggae — constant motion instead of space. Same chords, completely different energy." },
        { text: "Soul strum: relaxed 16th-note pattern at 80 BPM with ghost strums (light touches between real strums). Same chords. Warm, groovy. 2 minutes.", why: "Soul strum is about pocket — playing slightly behind the beat with ghost notes that add texture without volume." },
        { text: "Desert blues: sparse, thumb-heavy downstrokes at 75 BPM with long spaces between strums. Same chords. Hypnotic, minimal. 2 minutes.", why: "Desert blues is the most sparse feel — space is the instrument. Tinariwen, Ali Farka Touré. Less is more." },
        { text: "Your pick: which feel suits you best? Spend 3 more minutes in that feel. That's your 'home groove' for now.", why: "Identifying your home groove is an act of artistic identity. It tells you what genre your songs want to live in." }
      ],
      feel: "Each feel shift should feel like changing clothes — same body, different outfit. The chords stay familiar; only the energy and timing transform. One of these will feel like HOME.",
      wrong: "If all four feels sound the same, your right hand isn't changing enough. Reggae should sound nothing like jangle. Record yourself and compare.",
      sarah: "Gene, your playlists tell me reggae and surf are your home feels. But trying soul and desert blues might surprise you — Khruangbin lives in that soul-desert overlap.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-7-5",
      time: 6,
      title: "Syncopation",
      type: "vocal",
      what: "Sing notes BETWEEN the guitar strums — on the 'ands' instead of the beats. This is syncopation: the secret ingredient that makes vocal melodies feel alive instead of robotic. Based on Stoloff's approach: rhythmic displacement before melodic complexity.",
      steps: [
        { text: "Strum Am at 80 BPM, simple downstrokes on beats 1-2-3-4. While strumming, sing an A note — but ONLY on the 'and' after beat 1. Strum... sing... strum... rest... strum... rest... strum... rest.", why: "Singing between strums is the opposite of what your brain wants to do. It wants to sync voice and hand. Separating them is the key to interesting rhythm." },
        { text: "Now sing on the 'and' of beats 1 AND 3. Two syncopated notes per bar. The voice lands between strums.", why: "Two offbeat notes per bar creates the reggae vocal feel. Notice how it naturally creates a laid-back, behind-the-beat sensation." },
        { text: "Try singing on all four 'ands' — every note between the strums. Your voice fills the gaps. This is the most syncopated pattern possible.", why: "Full offbeat singing creates the classic ska/reggae vocal style. It also appears in surf-pop and psychedelic rock." },
        { text: "Mix it up: sing some notes ON the beat and some BETWEEN. Create your own rhythmic pattern. Record it.", why: "Mixing on-beat and off-beat creates the most musical vocal rhythms. Every great melody does this." }
      ],
      feel: "Syncopation should feel groovy — like your voice is dancing between the guitar beats. When it clicks, you'll feel a swing that doesn't exist when voice and guitar land together.",
      wrong: "If all your notes land on the beat with the strum, that's singing in unison with the guitar — not wrong, but not syncopated. Practice placing notes deliberately between strums.",
      sarah: "Gene, syncopation is what makes DOPE LEMON and Skinshape vocals feel so cool. They're singing between the guitar, not on top of it. This exercise teaches that feel.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-6",
      time: 8,
      title: "Rhythm Improv",
      type: "vocal",
      what: "Improvise vocal rhythms over a backing track. Sing only on ONE note (A) — remove all pitch decisions. Focus entirely on WHEN you sing, not what you sing. Long notes, short notes, rests, bursts, syncopation. Rhythm alone creates musical interest.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Play the Khruangbin backing track. Sing only the note A — sustained 'ahhh' sounds in different rhythms. Hold some notes long, make others short and percussive.", why: "One pitch, infinite rhythms. Removing pitch decisions lets you focus 100% on rhythmic creativity." },
        { text: "Try 'call and response' with yourself: sing a 2-beat rhythmic phrase, then leave a 2-beat gap of silence. The silence is part of the music.", why: "Silence gives rhythm its shape. A note after silence has 10x the impact of a note in a continuous stream." },
        { text: "Switch to the Soul Funk track. Different groove, same one-note constraint. Let the track's rhythm suggest your vocal rhythm.", why: "Different backing grooves pull different rhythmic responses from you. The groove is leading — you're following." },
        { text: "Record 3 minutes of rhythm improv. Listen back. Your rhythmic instincts are already more creative than you think.", why: "Hearing your rhythm improv played back reveals patterns you weren't conscious of creating. These become building blocks for songs." }
      ],
      feel: "Rhythm improv on one note should feel like drumming with your voice. Pure rhythm, pure groove. When the backing track and your voice lock together, it's magic.",
      wrong: "If you're changing pitch, stop. This exercise is ONE NOTE ONLY. The discipline of pitch constraint is what forces rhythmic creativity to emerge.",
      sarah: "Gene, Stoloff at Berklee teaches this exact exercise — one-note rhythm improv — before any melodic improvisation. Rhythm is the foundation that melody stands on.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-7",
      time: 7,
      title: "Behind-the-Beat Pocket",
      type: "rhythm",
      what: "Play the SAME chord tone phrase three ways over a metronome: exactly on the click, deliberately behind (lazy, laid-back), and deliberately ahead (urgent, driving). Record all three and compare. Behind-the-beat is THE defining feel of reggae, soul, and psych.",
      setup: "Guitar tuned to Am. Metronome at 85 BPM. Backing track ready.",
      steps: [
        { text: "Sing a simple 4-note phrase on A (quarter notes, one per beat) exactly on the metronome click. Nail the center of each click. Record this as your baseline.", why: "Playing dead-center on the beat is the reference point. You need to know where 'on' is before you can intentionally move off it." },
        { text: "Now sing the same phrase but place every note slightly AFTER the click — just behind it, lazy and relaxed. Don't slow down the tempo; just let each note arrive a hair late. This is the reggae/soul pocket.", why: "Berklee's biggest insight about R&B singing: it's behind the beat. This micro-delay creates the laid-back, warm feel that defines Skinshape, DOPE LEMON, and every reggae vocalist." },
        { text: "Same phrase, but now push every note slightly AHEAD of the click — urgent, leaning forward. The tempo stays the same; your placement shifts.", why: "Ahead-of-the-beat placement creates drive and urgency. Punk and surf rock live here. Knowing this feel gives you contrast against the laid-back pocket." },
        { text: "Play the Reggae One Drop track. Sing your phrase behind the beat over the groove. Let the track's pocket pull your voice into that lazy space.", why: "A backing track with a built-in behind-the-beat feel makes it easier to find the pocket. The drums are already sitting back — join them." },
        { text: "Listen back to all three recordings. The behind-the-beat version should sound like a different singer — cooler, more relaxed, more 'in the pocket.' That's your target feel.", why: "Comparing the three placements side by side trains your ear to hear micro-timing. Most listeners can't name it, but everyone feels the difference." }
      ],
      feel: "Behind-the-beat should feel like leaning back in a hammock — unhurried, confident, like you have all the time in the world. It's the opposite of anxious.",
      wrong: "If behind-the-beat sounds like you're dragging or slowing down, you've gone too far. The TEMPO stays constant — only your placement within each beat shifts. Use the metronome to verify.",
      sarah: "Gene, this is the single most impactful rhythm skill for your genres. Every artist you love — Skinshape, DOPE LEMON, Pepper — sits behind the beat. It's what makes their music feel like a warm afternoon.",
      metronome: 85,
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-7-8",
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
      id: "ss-7-9",
      time: 6,
      title: "Body Percussion Layering",
      type: "rhythm",
      what: "Four-layer body percussion: foot stomp (beats 1 and 3), knee pat (beats 2 and 4), clap (offbeats), and voice counting subdivisions. Build layers one at a time. This is advanced Dalcroze: 4 independent rhythmic streams from one body — the physical architecture of singing while playing.",
      setup: "Seated or standing. Metronome at 85 BPM. No instrument.",
      steps: [
        { text: "Layer 1: stomp your foot on beats 1 and 3. Just the foot. Lock it to the metronome until it's automatic — at least 30 seconds of perfect time.", why: "The foot is the deepest body rhythm. In Dalcroze training, the feet always come first because they connect to your body's center of gravity." },
        { text: "Layer 2: add knee pats on beats 2 and 4. Stomp-pat-stomp-pat. Two layers running simultaneously. Keep both locked to the metronome.", why: "Feet on 1-3 and hands on 2-4 creates the complete basic groove. This is the body percussion equivalent of a kick-snare pattern." },
        { text: "Layer 3: add claps on the offbeats (the 'ands'). Stomp... clap... pat... clap... stomp... clap... pat... clap. Three simultaneous rhythmic streams.", why: "Offbeat claps add the hi-hat layer. Three independent body rhythms running simultaneously is a serious coordination challenge — and exactly what singing over guitar demands." },
        { text: "Layer 4: add your voice counting subdivisions — '1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a' — while maintaining all three body layers.", why: "Four independent rhythmic outputs is the maximum most people can manage. If you can do this, your body has internalized rhythm deeply enough to handle any vocal-guitar independence challenge." },
        { text: "If Layer 4 falls apart, drop back to 3 layers and build up again. The goal is smooth, relaxed coordination — not tense concentration.", why: "Motor learning research: if you're gritting your teeth, the coordination isn't learned yet. It should feel easy and groovy when it's truly internalized." }
      ],
      feel: "When all four layers lock in, it should feel like you ARE a drum kit — each limb and your voice operating independently but creating one unified groove.",
      wrong: "If adding a new layer causes the previous layers to falter, the earlier layers aren't automatic yet. Spend more time on fewer layers before stacking.",
      sarah: "Gene, this is the exercise that makes everything else easier. Once your body can run 4 independent rhythm streams, singing over guitar strum patterns will feel like a vacation.",
      metronome: 85
    },
    {
      id: "ss-7-10",
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
      id: "ss-7-11",
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
      id: "ss-7-12",
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
      id: "ss-7-13",
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
    {
      id: "ss-7-14",
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
      recorder: true,
      levelUp: "Can create complementary vocal rhythms that interlock with guitar grooves, improvise rhythmic patterns on one note, shift between 4 genre feels on the same progression, place voice behind/on/ahead of the beat deliberately, vary rhythmic density as a compositional tool, layer 4 independent body percussion streams, distinguish swing from straight feel, audiate and reproduce rhythmic patterns, use harmonic rhythm as a structural tool, and transcribe rhythmic ideas from grooves."
    }
  ]
};
