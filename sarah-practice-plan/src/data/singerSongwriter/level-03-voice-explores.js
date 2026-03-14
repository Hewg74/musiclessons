import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Voice Explores",
  subtitle: "One note at a time. Build the palette. Trust the ramp.",
  description:
    "Level 2 introduced chord tones — now we internalize them one at a time. This level builds your melodic palette note by note: one note (the root), then two (root + 5th), then three (the full triad), then four (adding a passing tone), then five (the complete pentatonic). At each stage, you'll explore through multiple vehicles — rhythm play, body percussion, call-and-response, audiation, emotional expression — so each note is deeply felt before the next one arrives. Based on constraint-based creativity research (fewer notes = deeper exploration), Dalcroze eurhythmics (body before voice), Kodály rhythm syllables, and Gordon's audiation research.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero",
  unlocks: "Voice Combines (Level 4)",
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
        { text: "Close your eyes. Sing A on any vowel, any rhythm, any dynamic. Feel where the note resonates in your body — is it chest? Head? Throat? Belly? Let your attention wander through your body while the pitch stays locked on A. 2 minutes.", why: "Body awareness while singing is the foundation of vocal technique. When you know WHERE a note lives in your body, you can return to that sensation reliably. This is how vocal muscle memory forms." }
      ],
      feel: "The note A should feel like coming home — stable, grounded, warm. When your voice locks with the drone, you'll feel a physical buzz in your chest that's unmistakable. Every variation (whisper, full voice, 'ooh,' 'ahh') is a different room in the same house.",
      wrong: "If you're drifting off pitch or can't feel the lock with the drone, you're singing too casually. Slow down, hold the note longer, and listen for the moment when the beating stops and your voice merges with the drone. That's the lock.",
      sarah: "Gene, Tommy Guerrero builds entire instrumentals on a single bass note droning underneath — that meditative, hypnotic quality comes from REALLY living in one pitch. You're building that same depth. One note, deeply felt, is worth more than ten notes skimmed over.",
      drone: { root: "A", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "A3"),
      pitchContour: true,
      metronome: 80,
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
        { text: "Strum Am on autopilot. Sing A as a whole note — 4 beats long. Then as two half notes. Then as four quarter notes. Then as eighth notes. Feel how the same note changes character with each rhythmic subdivision.", why: "One pitch removes all melodic decision-making. Your brain is 100% focused on rhythmic creativity — which is where most groove comes from." },
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
      recorder: true
    },
    {
      id: "ss-3-3",
      time: 6,
      title: "Body Rhythm First",
      type: "rhythm",
      what: "NO singing. Strum Am on autopilot. Clap rhythms over the strum. Tap foot patterns. Sway. Feel rhythm physically before adding voice. Dalcroze eurhythmics says the body must internalize rhythm before the voice can express it.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
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
        { text: "Pluck the open A string in a short rhythmic pattern — maybe 'da... da-da' (quarter, two eighths). Then answer with your voice: sing A in a DIFFERENT rhythm — maybe 'da-da-da... da' (three eighths, quarter). The pitch never changes. Only rhythm.", why: "Call-and-response separates guitar and voice in time — you're never doing both at once. With only one pitch available, all the musical interest comes from rhythmic contrast between the call and the response." },
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
        { text: "Strum Am on autopilot. Drone on. Sing A and hold it for 8 beats. Feel home — stable, locked, grounded. This is where you've been living. Now you're about to leave home for the first time.", why: "Revisiting the root before adding a new note reinforces the anchor. Your ear needs to remember 'home' vividly so it can feel the contrast when you move to the 5th." },
        { text: "Sing E and hold it for 8 beats against the drone. Feel the difference — E is stable but more open, like standing on a hilltop looking at the horizon. Not as grounded as the root, but perfectly at rest. Spacious. Wide.", why: "The perfect 5th is the second most consonant interval in music. It creates openness without tension — it's the 'sky' to the root's 'earth.' This is the most natural first note to add to your palette." },
        { text: "Alternate slowly: A for 8 beats, E for 8 beats, A for 8 beats, E for 8 beats. Feel the distance between them — a wide, clean interval. Like stepping from ground to sky and back.", why: "Slow alternation lets your ear internalize the distance between root and 5th. This interval is the skeleton of every chord, every power chord, every bass line. Feeling it deeply now means you'll always know where these two notes live." },
        { text: "Improvise freely between ONLY A and E. Vary rhythm, duration, dynamics. Try long A followed by short bursts of E. Try rapid alternation. Try A in a whisper, E at full voice. Everything you learned in Phase 1 applies — but now with two colors.", why: "Two notes with full rhythmic and dynamic freedom is a creative universe. Constraint-based creativity research shows that limiting options increases both originality and depth. You'll be surprised how much music lives in just two pitches." },
        { text: "2-minute eyes-closed freestyle with just A and E. No rules, no targets. Let your ear guide you between earth and sky. Record it.", why: "Extended improvisation on two notes builds fluency and confidence. When you can make 2 minutes of interesting music with two pitches, three will feel luxurious." }
      ],
      feel: "A should feel like planting your feet on warm ground. E should feel like looking up at open sky. Moving between them should feel like a gentle expansion and return — grounded, then spacious, then home again.",
      wrong: "If A and E feel the same to you, hold each one longer against the drone. The emotional difference is subtle but real — A is denser, more gravitational; E is lighter, more open. If you accidentally sing C (the 3rd), come back to your two-note palette.",
      sarah: "Gene, Tinariwen builds entire songs on root and 5th — those desert blues guitar lines that hypnotize you are often just two notes with incredible rhythm. You're tapping into the same ancient simplicity. Two notes, deeply felt, is enough for real music.",
      drone: { root: "A", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      pianoKeys: true,
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
        { text: "Strum Am on autopilot. Sing A and E using only quarter notes, but vary the dynamics: A is loud, E is quiet. Then reverse: A is quiet, E is loud. Feel how dynamic contrast between two pitches creates a sense of melody even without more notes.", why: "Dynamic variation on two pitches creates the ILLUSION of more melodic complexity. The ear hears loud notes as more important — so you can create emphasis and phrasing with volume alone." },
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
        { text: "Free conversation over the backing track: alternate guitar and voice, both using only A and E. 2 minutes. Let the desert blues groove guide your phrasing. Record it.", why: "The backing track provides context and groove that shapes your conversation. The two-note constraint keeps the focus on interaction rather than note choice." }
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
        { text: "Strum Am on autopilot. Close your eyes. Internally 'hear' the note A in your head — don't sing, don't hum, just imagine the sound as vividly as you can. Hold that mental pitch for 4 beats.", why: "Gordon's audiation research shows that internal hearing should be seeded as early as possible. Hearing music in your mind activates the same neural pathways as actual singing — silent practice is real practice." },
        { text: "After 4 beats of silent hearing, sing A out loud for 4 beats. Did your sung pitch match what you heard internally? If not, adjust. The gap between internal hearing and actual singing is your 'audiation gap' — you're closing it.", why: "Checking your internal hearing against your actual voice calibrates the connection between your ear and your vocal cords. Each check makes the link stronger." },
        { text: "Now try E: hear it silently for 4 beats, then sing it for 4 beats. Then alternate: silent A (4 beats), sing A (4 beats), silent E (4 beats), sing E (4 beats). The silent bars are the exercise — the singing bars are the check.", why: "Two pitches gives your audiation exercise a simple choice — which note am I hearing internally? This is the seed of hearing melodies before you sing them." },
        { text: "Freestyle: hear short two-note phrases internally (A-E, E-A, A-A-E, E-E-A) for 4 bars, then sing them out for 4 bars. Let the internal phrases become more complex as you go. Record the sung portions.", why: "Extending audiation from single notes to two-note phrases is the natural progression. Eventually, you'll hear entire melodies internally before your voice produces them." },
        { text: "Final challenge: hear a 2-bar phrase using A and E in your head, with a specific rhythm. Then sing it exactly as you heard it. How close was it? Try 3 times. Each attempt should be more accurate.", why: "Combining pitch and rhythm in audiation is harder than pitch alone. But it's exactly what happens when a melody 'comes to you' — you hear it inside, then reproduce it. This exercise makes that process conscious." }
      ],
      feel: "This should feel meditative and a little strange — you're making music in your head, then checking it with your voice. The silent bars should feel ACTIVE, not empty. Your brain is working hard even when no sound comes out.",
      wrong: "If you're humming or whispering during the 'silent' bars, you're bypassing the audiation. True internal hearing means no sound at all — just the vivid mental image of the pitch. If you can't hear it internally, start with A (it's more familiar) and hold it in your mind like a memory.",
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
        { text: "Turn on the drone (A). Sing the root A. Hold it for 8 beats. Feel home — earth, gravity, warmth. You know this note deeply now. Let it ground you.", why: "Revisiting the root before adding the third note ensures your anchor is solid. The new note will feel more vivid against a well-established home base." },
        { text: "Sing the 5th (E). Hold it for 8 beats against the drone. Feel the sky — open, spacious, stable. You know this one too. Earth and sky, your two-note world.", why: "Confirming both existing notes before adding the third creates a clear before-and-after. You'll feel the triad as root + 5th PLUS a transformative new addition, not just 'three notes.'" },
        { text: "Now sing C — the minor 3rd. Hold it for 8 beats against the drone. Feel the shift. There's an ache here, a bittersweet pull. The minor 3rd is where emotion lives. It's not sad exactly — it's depth, it's color, it's the blue in the golden hour.", why: "The minor 3rd is what makes Am minor. It's the emotional core of the chord — remove it and you have a hollow power chord. This interval is the 'blue' that gives your genres their melancholy warmth." },
        { text: "Paint freely between all three: root (earth) → 5th (sky) → 3rd (blue) → root (home). Move between them at any speed, in any order. Feel each color as you arrive. 2 minutes with eyes closed. Reach for feelings, not note names.", why: "When each interval has an emotional identity — not just a name — you can reach for feelings instead of theory. 'I want openness' = sing the 5th. 'I want ache' = sing the 3rd. Notes as colors, not numbers." },
        { text: "Try the same palette over G major: root G (earth), major 3rd B (gold, sunshine — brighter than the minor 3rd!), 5th D (sky). Feel how the major 3rd has a completely different color — golden instead of blue. Warm instead of aching.", why: "Major 3rd vs minor 3rd is the most important emotional distinction in music. Hearing this difference in your body (not just in theory) means you can shift the mood of any improvisation by choosing which 3rd to sing." },
        { text: "Alternate: Am palette (A-C-E, blue) for 4 bars, then G palette (G-B-D, gold) for 4 bars. Feel the color shift as the chord changes — blue to gold and back. Record it.", why: "Hearing major vs minor as emotional colors rather than theory labels is the foundation of expressive singing. Your voice becomes a paintbrush choosing between warmth and melancholy." }
      ],
      feel: "Each note should feel like dipping your brush in a different color. A is grounding earth. E is expansive sky. C is the emotional blue — the one that gives the chord its character. When you land on C, you should feel a subtle ache, a pull, a depth that the root and 5th don't have.",
      wrong: "If all three notes feel the same to you, slow down even more. Hold each one for 16 beats against the drone. Close your eyes. The emotional quality will emerge — it's subtle at first but unmistakable once you feel it. Don't intellectualize; feel.",
      sarah: "Gene, this is the exercise that turns theory into feeling. The blue in the golden hour, the ache in an Allah-Las melody, the melancholy warmth of Khruangbin — it all lives in the minor 3rd. When you reach for a note because of how it FEELS instead of what it's CALLED, you're singing like an artist.",
      drone: { root: "A", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      pianoKeys: true,
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
        { text: "Assign the triad to cells: 'ta' = A (quarter note on the root). 'Ti-ti' = C-E (two eighths, stepping up through the triad). 'Ta-ah' = A held for 2 beats (root sustain). Sing each pattern 4 times.", why: "Mapping rhythm cells to specific chord tones creates melodic building blocks. Each cell becomes a tiny melodic fragment — a musical word you can string into phrases." },
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
        { text: "Listen back. Find the exchange where the voice answer made the guitar call sound better — where the response elevated what came before. That's the magic of musical conversation.", why: "Self-listening for conversational quality trains you to hear interaction, not just individual lines. The best singer-songwriting is a conversation between voice and guitar, not a voice solo with accompaniment." }
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
      id: "ss-3-12",
      time: 7,
      title: "Emotional Color — Three Moods",
      type: "vocal",
      what: "Same three notes (A-C-E), same Am strum — but three completely different emotional deliveries. Lazy sunset: slow, breathy, lots of space. Driving energy: shorter notes, more rhythmic. Mystery: quiet, long silences, notes decay into nothing. The notes don't change; YOU change.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing A-C-E with 'lazy sunset' energy: slow, breathy, lots of space between notes. Think DOPE LEMON on the porch at golden hour. Let notes hang in the air and dissolve. Vowels are soft ('ooh,' 'oh'). 2 minutes.", why: "Emotional intention transforms identical notes into completely different music. 'Lazy sunset' engages specific vocal muscles — relaxed jaw, gentle breath support, minimal effort. The body creates the emotion." },
        { text: "Same notes, new color: 'driving energy.' Shorter notes, more rhythmic, slightly louder, more forward in the beat. Think Skinshape locked into a groove. The notes punch rather than float. 2 minutes.", why: "Energy and urgency come from rhythm and attack, not from higher notes or louder volume. Your porch register can drive just as hard as a belt — it's about rhythmic commitment and forward placement." },
        { text: "Same notes, third color: 'mystery.' Sing quietly, leave long silences between notes, let each note decay into nothing before the next one arrives. Think Tinariwen in the desert at night. 2 minutes.", why: "Mystery comes from space and restraint. Fewer notes, more silence, letting the listener's imagination fill the gaps. This is the hardest color because your instinct is to fill silence." },
        { text: "Free round: improvise with A-C-E while shifting between all three colors. Sunset drifts into energy, energy dissolves into mystery, mystery warms into sunset. 2 minutes, no plan. Let the shifts happen when they want to.", why: "Emotional fluidity is the highest form of vocal expression. When you can shift feeling in real time with just three notes, your future songs will have dynamic range that keeps listeners engaged." },
        { text: "Record one more 2-minute pass. This time, let one color dominate — whichever felt most natural. That's probably closest to your authentic vocal personality. Notice which one you gravitate toward.", why: "Self-awareness about your natural emotional tendency is valuable. Your default color is your starting point — the other colors are tools you can reach for when a song needs them." }
      ],
      feel: "Each emotional color should feel physically different — lazy sunset relaxes your jaw and throat, driving energy engages your diaphragm and sharpens your consonants, mystery pulls your voice back to a whisper and leaves vast silence. The body leads the expression.",
      wrong: "If all three colors sound the same, you're not committing to the emotion. Exaggerate. Make the sunset version absurdly lazy — yawning between notes. Make the energy version almost aggressive. Make the mystery version so quiet you can barely hear it. The middle ground will find itself.",
      sarah: "Gene, your artists all do this instinctively — Allah-Las shift from dreamy to intense within a single song. DOPE LEMON lives in the sunset color. Skinshape drives harder. You're building that same emotional range, but with just three notes. The notes don't change; you do.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── PHASE 4: FOUR NOTES — ADDING THE STEP ───

    {
      id: "ss-3-13",
      time: 7,
      title: "Adding the Bridge — D",
      type: "vocal",
      what: "Four notes now: A, C, D, E. D sits between C and E — it's the bridge, the passing tone, the note that makes STEPWISE MOTION possible. Before D, you had to leap between C and E. Now you can walk: C-D-E or E-D-C. Smooth, connected, flowing.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Review your triad: sing A-C-E ascending, E-C-A descending, against the drone. Feel the leap between C and E — it's a gap, a jump, a skip. You've been jumping this gap for a while now. Today you fill it.", why: "Feeling the C-to-E gap before filling it makes the new note's purpose visceral. You'll understand WHY D matters because you'll feel the difference it makes." },
        { text: "Sing D against the drone. Hold it for 8 beats. Feel how D is different from the triad notes — it's less stable, more restless. D wants to move. It pulls toward C or toward E. It's a bridge, not a destination.", why: "D is the 4th scale degree — a passing tone that creates movement and tension. Unlike the stable root, 3rd, and 5th, D has an inherent pull that drives melodies forward. It's the oil that makes the engine run." },
        { text: "Walk the bridge: sing C-D-E slowly. Feel how D connects them — smooth, stepwise, no leap. Then E-D-C. Then the full walk: A-C-D-E ascending, E-D-C-A descending. Stepwise motion through all four notes.", why: "Before D, you had to leap between C and E. Now you can WALK. Stepwise motion is the most natural melodic movement — it's how we sing intuitively, how folk melodies move, how lullabies flow." },
        { text: "Improvise with all four notes: A, C, D, E. Notice how D creates flow — melodies that felt angular with three notes now feel smoother. D is the glue between your triad tones. 2 minutes, free exploration.", why: "The addition of one passing tone transforms your melodic vocabulary from triadic leaps to flowing lines. This is a qualitative shift — your improvisations will sound more like 'real' melodies because stepwise motion is how most melodies work." },
        { text: "Try using D as a quick 'connecting' note — don't hold it, just pass through it between C and E. Then try holding D as a long note and feel its tension. Both approaches are valid tools. Record 2 minutes.", why: "Passing tones can be quick (connecting two stable notes) or sustained (creating tension). Learning both uses of D gives you options — smooth connection or intentional tension." }
      ],
      feel: "D should feel like a stepping stone between C and E — useful, purposeful, always moving. When you walk C-D-E, it should feel smooth and connected, like stepping stones across a stream instead of leaping over it.",
      wrong: "If D feels random or out of place, you're not hearing it in context. Always approach D from C or from E — feel how it bridges the gap. If you hold D for a long time and it feels uncomfortable, that's correct — D is a tension note. Let it resolve to C or E.",
      sarah: "Gene, adding D is like learning the word 'and' — it connects everything. Your melodies just went from choppy phrases to flowing sentences. One note, and suddenly your four-note world sounds like music.",
      drone: { root: "A", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      metronome: 75,
      recorder: true
    },
    {
      id: "ss-3-14",
      time: 6,
      title: "Stepwise Wandering",
      type: "vocal",
      what: "Now that D bridges C and E, walk through your four notes using primarily stepwise motion: A-C-D-E-D-C-A. Each note leads gently to the next. No big leaps. Stepwise motion is the most natural melodic movement — it's how we sing intuitively.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Sing the ascending walk: A-C-D-E. One note per beat, slow and deliberate. Then descend: E-D-C-A. Repeat 4 times. Feel the smooth, connected quality of stepwise motion.", why: "Stepwise ascending and descending is the most basic melodic exercise — and the most useful. The majority of notes in most melodies move by step, not by leap. This is the movement your voice does most naturally." },
        { text: "Now wander freely using mostly stepwise motion: A-C-D-C-D-E-D-C-A. Each note is adjacent to the last. No skipping. Let the melody meander like a path through the woods.", why: "Constrained wandering — moving only to adjacent notes — produces surprisingly beautiful, flowing melodies. Folk traditions worldwide use this approach. The constraint creates natural, singable phrases." },
        { text: "Add occasional leaps for contrast: walk stepwise for 4-5 notes, then leap from A up to E (or E down to A). The leap feels dramatic because you've been stepping. Then return to walking.", why: "Leaps are more powerful when they're rare. A melody that walks and walks and then suddenly leaps creates a moment of drama. The step-step-step-LEAP pattern is a fundamental melodic technique." },
        { text: "Try walking over the backing track: let the Khruangbin groove shape your stepwise wandering. Walk in time with the beat, stepping through A-C-D-E at whatever pace the groove suggests. 2 minutes.", why: "The groove provides rhythmic context for your stepwise motion. Walking in time with a beat transforms academic scale walking into musical phrasing." },
        { text: "Record 2 minutes of free stepwise wandering. Afterward, listen back — your four-note walks should sound like embryonic melodies. They ARE melodies, just simple ones.", why: "Recognizing your stepwise walks as real melodies builds confidence. You're not doing exercises — you're making music with four notes. The simplicity is the point." }
      ],
      feel: "This should feel like walking a gentle trail — each step leads naturally to the next, no effort required. The melody flows rather than jumps. When you're in the flow of stepwise motion, it should feel almost automatic.",
      wrong: "If you keep leaping (skipping from A to E without passing through C and D), you're reverting to triadic thinking. Deliberately step through every note between start and destination. Walk, don't jump.",
      sarah: "Gene, the psych-surf melodies you love are full of stepwise motion — those hypnotic, flowing vocal lines from Allah-Las and BALTHVS are mostly just walking through adjacent notes. This is where that sound comes from.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-3-15",
      time: 6,
      title: "Four-Note Conversation",
      type: "vocal",
      what: "Guitar-voice call and response with A, C, D, E. The conversation now has stepwise motion available — smoother, more melodic phrases. Notice how adding ONE note (D) transforms the conversation from triadic jumps to flowing lines.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Play a short guitar phrase using A, C, D, E — try a stepwise phrase like C-D-E-D (walking up and back). Then answer with your voice: sing a four-note phrase that responds to the guitar's contour.", why: "The conversation now has stepwise motion available. Guitar phrases sound smoother, voice responses can flow — the musical dialogue gains a new quality of connectedness." },
        { text: "Make the guitar call use a LEAP (A up to E). Make the voice answer use STEPS (E-D-C-A walking down). The call is dramatic, the response is smooth. Contrast in motion type creates interesting conversation.", why: "Mixing leaps and steps between call and response adds a new dimension to the dialogue. The call can be bold while the response is gentle — or vice versa." },
        { text: "Reverse: voice calls with a stepwise phrase, guitar answers with a leap-based phrase. Then try matching: both use steps, or both use leaps. Feel how the conversation character changes.", why: "When both speakers use the same motion type, there's agreement. When they contrast, there's complementary tension. Both are musically valid — the choice is expressive." },
        { text: "Free conversation: 2 minutes, four notes, alternating guitar and voice. Let the phrases be 2-4 notes long — short enough to be clear, long enough to have contour. Record it.", why: "Short phrases with clear contour are the building blocks of songwriting. Each call-and-response exchange is a tiny melodic idea that could become a song fragment." },
        { text: "Compare this to your two-note conversations (ss-3-7). Notice how much more melodic the four-note version sounds — smoother, more song-like. That's what D added.", why: "Explicitly comparing your current ability to earlier exercises reveals your growth. Four notes with stepwise motion sounds dramatically more musical than two notes — and you built to it gradually." }
      ],
      feel: "This should feel noticeably more musical than the two-note conversations. The phrases flow, the responses have melodic shape, and the dialogue sounds like fragments of songs rather than rhythmic exercises.",
      wrong: "If you're still only using A and E (reverting to your comfortable two-note pair), consciously include C and D. The new notes are what make this phase different. If the phrases feel random, try starting each phrase by stepping from one note to its neighbor.",
      sarah: "Gene, notice how adding ONE note transformed the entire conversation. D is a small addition — but it's the difference between angular fragments and flowing melodies. Your four-note phrases are starting to sound like real music because they can WALK.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },

    // ─── PHASE 5: FIVE NOTES — FULL PENTATONIC ───

    {
      id: "ss-3-16",
      time: 7,
      title: "The Full Palette — Adding G",
      type: "vocal",
      what: "Five notes: A, C, D, E, G. The Am pentatonic — the most universal scale in music. G is the highest note in your palette, the peak, the reach. Every culture on earth uses this five-note scale. With these five notes, you can improvise over ANY song in the key of Am. No wrong notes. Complete freedom.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Review your four notes: sing A-C-D-E ascending, E-D-C-A descending against the drone. This is your known world. Now you're about to add the final note — the peak of the palette.", why: "Reviewing the four-note palette before expanding it grounds you in familiar territory. Each addition has been gradual — root, 5th, 3rd, bridge. G is the capstone." },
        { text: "Sing G against the drone. Hold it for 8 beats. Feel the reach — G is the highest note in your palette, the farthest from home. It has a quality of uplift, of aspiration, of reaching for something. It's the peak of the mountain.", why: "G is the minor 7th — it creates a gentle tension that wants to resolve back down. It's the 'reach' note, the one that creates the most melodic interest when it leads back to familiar territory." },
        { text: "Sing the full Am pentatonic ascending: A-C-D-E-G. Then descending: G-E-D-C-A. One note per beat. Feel the complete palette — earth, blue, bridge, sky, peak. Five colors.", why: "The pentatonic scale is the most universal scale in human music — every culture on earth uses it independently. These five notes are hard-wired into human musical cognition. There are no dissonances, no wrong combinations." },
        { text: "Skip around freely — any note in any order. A-G-C-E-D. G-C-A-E-D. No pattern, no sequence, just exploring the full space. Feel how every combination works. No wrong notes.", why: "Free exploration of the pentatonic builds confidence that ANY combination of these notes sounds musical. This is the scale's magic — there are no bad choices, only different colors and contours." },
        { text: "2-minute eyes-closed freestyle with all five notes. No rules, no targets. Let your ear and your instincts guide you through the full palette. Record it. This is your first full pentatonic improvisation.", why: "Extended freestyle on the pentatonic is a milestone — you now have enough notes for genuinely complex, song-like melodies. Everything you've built (rhythmic variety, dynamic range, emotional color, stepwise motion, call-and-response) now has a full five-note canvas." }
      ],
      feel: "Five notes should feel like unlocking a door — suddenly you have enough colors to paint real pictures. The pentatonic is the sweet spot: enough notes for infinite variety, few enough that every combination sounds good. Freedom without overwhelm.",
      wrong: "If the five notes feel like too many choices, you've ramped too fast. Go back to four notes (ss-3-13) for another session, or start your five-note freestyle by walking stepwise (A-C-D-E-G) rather than leaping randomly. The structure will guide you.",
      sarah: "Gene, every artist you love lives in the pentatonic — Khruangbin, Skinshape, Allah-Las, Tinariwen, Tommy Guerrero. This five-note scale is the common language of psych-surf, desert blues, reggae, and soul. You now have the full palette. The rest of this level is about making it yours.",
      drone: { root: "A", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      pianoKeys: true,
      fretboard: { scale: "am-pentatonic", position: 1 },
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-3-17",
      time: 6,
      title: "Pentatonic Rhythm Play",
      type: "vocal",
      what: "All five pentatonic notes with full rhythmic freedom. Apply everything you've learned: long holds, short bursts, syncopation, silence, dynamic shifts. Five notes and infinite rhythms. This is where the scale becomes a living, breathing musical vocabulary.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Strum Am on autopilot with the backing track. Sing pentatonic notes (A-C-D-E-G) using ONLY whole notes — one note per bar. Slow, deliberate, letting each note breathe. Choose each note carefully — which color do you want next?", why: "Starting with whole notes forces intentional note choice. When each note lasts a full bar, the selection matters — you're composing in slow motion. This is how you learn to make purposeful melodic decisions." },
        { text: "Speed up to quarter notes. Now four notes per bar — the pentatonic comes alive with rhythm. Try walking stepwise, then try leaping. Feel how rhythm transforms the scale from a list of notes into a flowing melody.", why: "Quarter notes add rhythmic motion. The pentatonic stops being a 'scale' and becomes a melodic language. Your brain must now coordinate pitch choice AND rhythmic placement simultaneously — a skill you've built gradually." },
        { text: "Try syncopation: land pentatonic notes on the offbeats, between the reggae groove's downbeats. Sing BETWEEN the guitar strums. The one-drop groove leaves space for you — fill it.", why: "Offbeat pentatonic singing over reggae is one of the most natural musical combinations in your genre palette. The groove provides the skeleton, your voice provides the melody in the spaces." },
        { text: "Dynamic variation: sing some pentatonic phrases loudly, others barely above a whisper. Let the dynamics follow the melody contour — ascend = louder, descend = softer. Or reverse. Or random. Use volume as a creative tool.", why: "Dynamics applied to a five-note palette creates the full illusion of complex melody. When pitch, rhythm, AND dynamics all vary, simple pentatonic phrases sound like fully composed melodies." },
        { text: "2-minute full freestyle: all five notes, any rhythm, any dynamic, over the backing track. Use silence. Use bursts. Use long tones. Use everything you've built. Record it.", why: "This is the synthesis exercise — combining every skill (rhythmic variety, dynamic range, pentatonic freedom) into a single extended improvisation. It should feel like you're writing a song in real time." }
      ],
      feel: "This should feel like PLAYING — not practicing, not exercising, but making music. The pentatonic over a reggae groove should feel as natural as breathing. If you're nodding your head and smiling, you're in the right place.",
      wrong: "If you're stuck on the same two or three notes, consciously reach for the ones you're avoiding. G and D often get neglected — include them deliberately until they feel as natural as A and E.",
      sarah: "Gene, this is the exercise where everything clicks — five notes, a reggae groove, and all the rhythmic and dynamic tools you've built. Skinshape's vocal lines are exactly this: pentatonic notes over a groove, with rhythm and dynamics doing the heavy lifting. You're there.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true
    },
    {
      id: "ss-3-18",
      time: 8,
      title: "Pentatonic Conversation",
      type: "vocal",
      what: "The full guitar-voice conversation with all 5 pentatonic notes. Guitar plays a short pentatonic phrase, voice answers with a pentatonic phrase. Now the conversation has full melodic range — contour, stepwise motion, leaps, emotional color. This is real improvisation.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play a short pentatonic guitar phrase (Am pentatonic, frets 5-8 on the top strings). Keep it 3-5 notes. Then answer with your voice: sing a pentatonic phrase that responds to the guitar's contour and emotion.", why: "The pentatonic conversation is the culmination of all your call-and-response work. With five notes, both guitar and voice have full melodic range — the conversation sounds like two musicians playing together." },
        { text: "Try matching the guitar's emotional intent: if the guitar plays something gentle and stepwise, answer with something gentle. If the guitar plays something rhythmic and punchy, answer in kind. Emotional matching creates coherent musical dialogue.", why: "Matching emotion between call and response creates musical coherence — the conversation has a mood. This is how great musical partnerships work: each player listens to the other's intention, not just their notes." },
        { text: "Now try CONTRASTING: if the guitar plays high and fast (G-E-D), answer low and slow (A... C...). If the guitar is sparse, answer with a flurry. Contrast creates drama and keeps the conversation interesting.", why: "Contrast in call-and-response creates musical tension and release. A conversation where both speakers always agree is boring — a great musical dialogue has agreement AND surprise." },
        { text: "Extended free conversation: 3 minutes of alternating guitar and voice over the backing track. Let the phrases develop — start simple, let them grow more complex as you warm up. Some exchanges will be brief; others might extend into longer ideas.", why: "Extended conversation builds musical stamina and depth. The longer you sustain the dialogue, the more you'll discover. Ideas that emerge after 2 minutes of conversation are often better than your first impulses." },
        { text: "Record the last 2 minutes. Listen back for the moment where guitar and voice were truly in conversation — where the response couldn't have existed without the specific call that preceded it. That's the magic moment.", why: "Identifying moments of genuine musical conversation trains you to recognize (and reproduce) the feeling of real-time musical dialogue. These moments are the seeds of your future songs." }
      ],
      feel: "This should feel like Khruangbin in your living room — Mark plays a pentatonic lick, Laura answers with her voice, the conversation flows naturally. Relaxed, groovy, responsive. Each phrase listens to what came before.",
      wrong: "If you're ignoring what the guitar just played and singing unrelated phrases, you're monologuing, not conversing. The voice answer should RESPOND to the guitar call — acknowledge it, develop it, contrast it, or complete it.",
      sarah: "Gene, Khruangbin does this constantly — Mark plays a pentatonic phrase, Laura answers. Their entire sound is this conversation. You're building the same instinct, with the same scale, over the same kind of groove. This IS the music you love, at its simplest and most essential.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-3-19",
      time: 7,
      title: "Free Exploration — Am Pentatonic",
      type: "vocal",
      what: "The exercise that was previously #1 — but now you've EARNED it. Strum Am on autopilot and sing any combination of A, C, D, E, G in any order, any rhythm, for 3 minutes straight. No target phrase, no compositional goal. Just wander through the full pentatonic. After the gradual ramp, this freedom feels completely different — you KNOW these notes.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Turn on the drone. Close your eyes. Begin singing any pentatonic notes in any order, any rhythm. No rules. No targets. Just wander. Let your ear choose the next note, not your brain.", why: "Open-ended exploration is Kratus Level 1 — pure creative play. But unlike a beginner's random wandering, YOUR wandering is informed by everything you've built: one-note mastery, two-note conversations, triadic color, stepwise motion, rhythmic freedom." },
        { text: "Sing for at least 3 minutes without stopping. When you run out of ideas, simplify — go back to two notes, or one note, and let the complexity rebuild naturally. The music never stops, even when it gets simple.", why: "Extended improvisation builds stamina and trust. The moments when you 'run out of ideas' are exactly when the interesting stuff happens — your conscious mind stops trying, and your instincts take over." },
        { text: "Vary everything: long tones, short bursts, silence, dynamics, vowel sounds, rhythmic patterns. Apply all the tools from every phase. This is the synthesis — everything you've learned, all at once, all your choice.", why: "Synthesis is the goal of the entire level. When pitch, rhythm, dynamics, vowels, silence, and contour all vary simultaneously, you're not doing exercises anymore — you're making music." },
        { text: "In the last minute, gradually simplify. Fewer notes, longer tones, more space. End on a sustained A — home. The exploration lands where it started: one note, deeply felt.", why: "Coming home to the root after a full pentatonic journey gives closure. It also demonstrates the emotional arc you can create: departure, exploration, return. This is the shape of every great musical journey." },
        { text: "Listen back to the full recording. How does it compare to your very first explorations (Phase 1, single root note)? The difference is the ramp — you KNOW these notes now because you lived in each one.", why: "Hearing your own growth is the most powerful motivator. The pentatonic exploration should sound dramatically more musical than your early one-note exercises — because it is. You earned every note." }
      ],
      feel: "This should feel like coming home to a house you built yourself — every room is familiar because you lived in each one. The five notes are friends, not strangers. The freedom feels earned, not overwhelming.",
      wrong: "If the five notes still feel random or overwhelming, go back to four notes for a while. There's no rush. The ramp works because each stage is fully internalized before the next one arrives. If three notes felt great but five feels chaotic, live in four until it's solid.",
      sarah: "Gene, compare how this feels to what it would have felt like at the start — jumping straight to five notes without the ramp. The difference is confidence. You KNOW these notes because you built them one at a time. This is what trusting the ramp sounds like.",
      drone: { root: "A", octave: 2, texture: "pure" },
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true
    },

    // ─── PHASE 6: OTHER CHORD PALETTES ───

    {
      id: "ss-3-20",
      time: 7,
      title: "Major Palette — G Major",
      type: "vocal",
      what: "Apply the same palette thinking to G major. Root G (earth), major 3rd B (gold/sunshine — brighter than the minor 3rd!), 5th D (sky). The major triad has a COMPLETELY different emotional color — warm, open, bright. Your pentatonic exploration was in minor. Now feel major.",
      setup: "Guitar. Drone on G. Metronome at 80 BPM.",
      steps: [
        { text: "Strum G on autopilot. Turn on the drone (G). Sing the root G — hold it for 8 beats. This is a new home. It feels similar to A (stable, grounded) but the surrounding notes will be different colors.", why: "Establishing a new root resets your palette. You've lived in Am for the entire level — G major is a new tonal world with different emotional colors." },
        { text: "Sing the 5th (D) — hold for 8 beats. Open sky, just like E was over Am. The 5th always has this quality — spacious, stable, expansive. Same relationship, new notes.", why: "The 5th has the same character regardless of the chord — it's always the 'sky.' Recognizing this consistency across different chords builds your understanding of how chord tones work universally." },
        { text: "Sing the major 3rd (B) — hold for 8 beats. Feel the difference from C (the minor 3rd over Am). B is BRIGHT. Warm. Golden. Sunshine instead of blue. This is the major-minor fork — and it's a completely different emotional world.", why: "The major 3rd vs minor 3rd is the most important emotional distinction in Western music. Over Am, the 3rd was blue and aching. Over G, the 3rd is golden and warm. Same scale position, opposite emotional character." },
        { text: "Paint freely: G (earth), B (gold), D (sky). 2 minutes. Feel how the major palette has a fundamentally different character — brighter, more open, warmer. Think Jack Johnson, think beach at noon vs. beach at dusk.", why: "Internalizing the major palette as 'warm/golden' and the minor palette as 'blue/aching' gives you emotional language for chord colors. When you hear a major chord, you'll feel 'gold.' Minor = 'blue.' This is musical literacy through feeling." },
        { text: "Try the full major pentatonic: G-A-B-D-E ascending, E-D-B-A-G descending. Five notes over G major. Improvise freely for 2 minutes. Record it. Compare the feeling to your Am pentatonic improvisations.", why: "The major pentatonic over G is the bright, sunny counterpart to Am pentatonic. Experiencing both gives you two complete emotional palettes — all the colors of warmth AND all the colors of melancholy." }
      ],
      feel: "The G major palette should feel like stepping from a moody evening into warm afternoon sunlight. Same framework (root, 3rd, 5th), completely different emotional temperature. Gold instead of blue.",
      wrong: "If G major and Am feel the same emotionally, spend more time on the 3rd. Hold B (major 3rd) for 16 beats, then switch to C (minor 3rd over Am). The difference is the emotional hinge — everything else is similar. Keep switching until the contrast is visceral.",
      sarah: "Gene, your playlist has both colors — the golden warmth of surf-rock and the blue melancholy of desert blues. Now you can choose which palette to sing in. G major is your sunshine sound; Am is your golden-hour sound. Both are you.",
      drone: { root: "G", octave: 2, texture: "pure" },
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("G2", "D4"),
      recorder: true
    },
    {
      id: "ss-3-21",
      time: 7,
      title: "Palette Switching — Am to G",
      type: "vocal",
      what: "Alternate between Am palette (A-C-E, blue) and G palette (G-B-D, gold) every 4 bars. Feel the color shift as the chord changes. This is the foundation of singing over chord progressions — each chord gives you a new palette of colors to paint with.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am for 4 bars while singing A-C-E (blue palette). Then switch to G for 4 bars while singing G-B-D (gold palette). Repeat the cycle 4 times. Feel the emotional shift at each chord change — blue to gold, gold to blue.", why: "Palette switching is the foundation of singing over chord progressions. Each chord change brings a new set of colors — the singer's job is to hear the shift and respond with the appropriate palette." },
        { text: "Focus on the moment of the switch. As the chord changes from Am to G, your 'blue' notes (A-C-E) transform into 'gold' notes (G-B-D). Notice which note makes the biggest change: C (minor 3rd, blue) becomes B (major 3rd, gold). That one note shift changes the entire emotional color.", why: "The 3rd is the hinge between major and minor. Hearing the 3rd shift at each chord change is the most important ear-training skill for singing over progressions. It's the note that defines the mood." },
        { text: "Try smooth transitions: end your Am phrase on a note that's close to a G chord tone (E resolves naturally to D, or A sits inside both chords). The smoothest chord changes connect the two palettes rather than jumping between them.", why: "Voice leading — connecting chord tones smoothly across chord changes — is what makes melody flow through progressions. Finding the connecting notes between palettes is a core songwriting skill." },
        { text: "Reverse the emphasis: make Am feel bright and energetic, make G feel mellow and laid-back. Same notes, different emotional delivery. Prove that the palette is a starting point, not a prison.", why: "The palette gives you the NOTES; your delivery gives them EMOTION. A minor chord can be delivered with energy, and a major chord can be delivered with melancholy. You're not locked into 'minor = sad, major = happy.'" },
        { text: "Free improvisation: alternate Am and G in 4-bar blocks, painting freely with each palette. 2 minutes. Record it. Listen for the color shifts — do they sound like natural mood changes, or like two unrelated sections?", why: "Smooth palette switching is what makes songs feel like unified wholes rather than disconnected sections. When the color shifts feel natural, you're singing over chord changes — the fundamental skill of all popular music." }
      ],
      feel: "The switches should feel like natural mood shifts — like watching the sky change from blue to gold at sunset. Not abrupt, not forced, just a gentle emotional modulation. Each palette has its own warmth.",
      wrong: "If the chord changes sound like two separate songs rather than one flowing piece, focus on the transition moments. Sing a note that belongs to BOTH chords at the switch point (like the note E, which is the 5th of Am and the 6th of G — it works in both contexts).",
      sarah: "Gene, this is how songs work — each chord gives you a new palette, and the melody paints with whatever colors are available. When you can feel the shift between Am blue and G gold, you're hearing chord progressions the way songwriters hear them. That's a big deal.",
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("G2", "E4"),
      recorder: true
    },

    // ─── PHASE 7: EXPRESSION & TEXTURE ───

    {
      id: "ss-3-22",
      time: 7,
      title: "Vowel Shape Exploration",
      type: "vocal",
      what: "Sing pentatonic notes while cycling through vowels: 'ooh' (intimate), 'ahh' (open), 'eee' (bright), 'oh' (warm), 'ay' (forward). Each vowel creates a different resonant space in your body. Your vowel choices will become a signature part of your vocal style.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am.",
      steps: [
        { text: "Strum Am on autopilot. Sing pentatonic notes on 'ooh' for 1 minute. Let the 'ooh' shape your mouth into a small circle. Notice the warmth and intimacy — 'ooh' is where lullabies and quiet confessions live.", why: "'Ooh' is the most intimate vowel — it focuses your breath into a narrow stream and creates a warm, close sound. It's the vowel of DOPE LEMON's whispery vocal style and late-night porch singing." },
        { text: "Switch to 'ahh' for 1 minute. Open your mouth wide. The sound gets bigger, brighter, more projecting. Same notes, completely different character. 'Ahh' fills a room.", why: "'Ahh' is the most open vowel — it projects naturally and carries emotion. Even in your laid-back register, 'ahh' has more presence and volume than 'ooh.' It's where emotional declarations live." },
        { text: "Try 'eee,' 'oh,' 'ay' — 30 seconds each. 'Eee' is bright and forward (nasal almost). 'Oh' is round and warm. 'Ay' is bright but open. Notice how each vowel sits in a different part of your mouth and resonates differently.", why: "Vowel awareness is foundational vocal technique. Professional singers choose vowels deliberately for their sonic properties. Some vowels project, some intimate, some cut through a mix. You're building a conscious toolkit." },
        { text: "Free improv: change vowels mid-phrase. Start a pentatonic phrase on 'ooh,' slide into 'ahh,' end on 'oh.' Let vowel changes add texture and emotional shift to your melody. 2 minutes.", why: "Vowel modulation is an advanced expressive technique that most singers never consciously develop. Building it now means your future songs will have natural vocal texture — the vowel choices support the emotional content of the words." },
        { text: "Try matching vowels to emotional intent: use 'ooh' for the quiet, mysterious pentatonic phrases and 'ahh' for the more open, emotional ones. Let the vowel SERVE the emotion. Record 2 minutes.", why: "Intentional vowel-emotion pairing is how great singers create consistent vocal identity. When vowel choice serves emotional intent, the voice sounds authentic and considered — never random." }
      ],
      feel: "Each vowel should feel like a different room — 'ooh' is a small intimate space, 'ahh' is a large open hall, 'eee' is bright and focused, 'oh' is warm and round. The melody stays the same; the rooms change.",
      wrong: "If all your vowels sound the same, you're not shaping your mouth distinctly enough. Exaggerate the shapes — make 'ooh' extremely round (like you're blowing out a candle) and 'ahh' extremely wide (like a doctor is checking your throat). The middle ground will emerge.",
      sarah: "Gene, listen to how BALTHVS and Khruangbin use vowel sounds as texture — 'ooh' and 'ahh' aren't random, they're color choices. Your vowel instincts will shape your songwriting style just as much as your note choices.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-23",
      time: 6,
      title: "Breath as Phrase",
      type: "vocal",
      what: "One breath = one phrase. Inhale, sing pentatonic notes for the length of your breath, stop when the air runs out. The breath shapes the phrase naturally — no counting, no planning. Your lungs become the composer.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot over the backing track. Take a deep breath. Sing pentatonic notes (A-C-D-E-G) for as long as your breath lasts — then stop. Don't gasp for more air. Just stop. Silence until your next natural inhale.", why: "Breath-phrase coupling is how natural phrasing develops. Your lungs determine phrase length — not a metronome, not a bar count. This is how folk, blues, and reggae singers have always phrased." },
        { text: "Try short breaths: quick inhale, sing 2-3 pentatonic notes, stop. Then deep breaths: long inhale, sing a flowing 8-10 note phrase. Notice how breath depth changes phrase character — punchy vs. flowing.", why: "Short breaths create punchy, rhythmic phrases. Deep breaths create long, flowing lines. Both are valid musical tools — and your breath is the control mechanism." },
        { text: "Let the breath endings surprise you. Don't plan when to stop — just sing until the air runs out. The natural endings create organic phrase shapes that sound effortless and human.", why: "Planned phrase endings sound calculated. Breath-shaped endings sound natural. This is the difference between 'performing' and 'singing.' The natural cadence of your breath creates phrasing that listeners feel is authentic." },
        { text: "2-minute freestyle: breath-shaped pentatonic phrases over the backing track. Each phrase is exactly one breath long. Let the soul groove shape your note choices while your breath shapes your phrase lengths. Record it.", why: "When breath shapes your phrases, your singing sounds human and authentic. This is the phrasing style of DOPE LEMON, Angus Stone, Jack Johnson — effortless because it follows the body." },
        { text: "Listen back. The phrases should have a natural, organic quality — longer phrases that build, shorter phrases that punctuate, and silences between that let the music breathe. This is YOUR phrasing signature.", why: "Self-listening for phrasing quality teaches you to recognize natural vs. forced phrasing. The breath-shaped phrases should sound like you're talking in music, not executing a plan." }
      ],
      feel: "This should feel like sighing musically — each phrase is an exhale that happens to be pitched. No effort, no planning. Breathe in, sing out, rest. The groove carries you between phrases.",
      wrong: "If you're gasping for air or pushing past your breath to finish a phrase, you're overriding the exercise. Shorter phrases are fine — a 3-note phrase on a short breath is just as valid as a 10-note phrase on a deep breath. The breath IS the phrase.",
      sarah: "Gene, your laid-back vocal style is naturally breath-shaped — you don't belt or push. This exercise makes that instinct conscious and applies it to your full pentatonic vocabulary. Let your lungs be the composer.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-24",
      time: 6,
      title: "The Power of Silence",
      type: "vocal",
      what: "Strum Am for 4 bars. Sing pentatonic notes for 2 bars. Rest for 2 bars. Repeat. Then: sing 1 bar, rest 3. Then: sing a single note, rest 7 bars. Explore how silence creates anticipation and makes each note more powerful.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing pentatonic phrases for 2 bars, then rest (no voice) for 2 bars. Repeat this cycle 4 times. Let the silence feel intentional, not empty. The guitar and backing track fill the space.", why: "Silence is a musical element, not an absence. Planned rests create anticipation — the listener leans in, waiting for the next sound. The space between phrases is where the music breathes." },
        { text: "Increase the silence: sing for 1 bar, rest for 3 bars. The singing becomes rare and precious. Each pentatonic phrase carries more weight because there's so much space around it.", why: "Scarcity creates value. When you sing less, each note matters more. This is how Hermanos Gutiérrez and Tinariwen build drama — not through volume, but through restraint." },
        { text: "Maximum silence: sing a single pentatonic note, then rest for 7 bars. One note in 8 bars. Let the cinematic western backing track and guitar fill the space. That single note becomes an EVENT.", why: "A single note surrounded by 7 bars of silence is a compositional statement. You're learning that sometimes the most powerful thing you can do is almost nothing." },
        { text: "Free improv: vary your singing-to-silence ratio freely. Sometimes dense pentatonic phrases, sometimes a single note in a sea of space. Let the cinematic backing track inspire you — when does the music NEED your voice, and when does it need your silence? 2 minutes.", why: "Density control — choosing how much to sing — is one of the most advanced musical skills. Most beginners over-sing. Masters know when NOT to sing. The groove doesn't need you every bar." },
        { text: "Record 2 more minutes. This time, imagine you're scoring a scene — a lone figure walking through a desert, or standing on a cliff at sunset. Your voice is the narration. When does the narrator speak, and when does the landscape speak for itself?", why: "Connecting silence to imagery makes it intentional rather than accidental. When you choose silence for dramatic effect, every note that follows gains weight and meaning." }
      ],
      feel: "The silences should feel active, not awkward. You're choosing to be quiet — the music continues in the guitar and backing track. Your absence creates a space the listener fills with anticipation. When your voice returns, it means something.",
      wrong: "If the silences feel uncomfortable and you rush to fill them, that's the instinct this exercise is training you to overcome. Sit with the discomfort. The silence IS the music. If you can't resist singing, try counting the silent bars in your head to stay disciplined.",
      sarah: "Gene, Hermanos Gutiérrez barely sing at all — their music is 90% space and 10% voice, and that cinematic western sound is BUILT on silence. The backing track gives you that exact world. Let the space do the work.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      volumeMeter: true
    },
    {
      id: "ss-3-25",
      time: 6,
      title: "Sing-Along Absorption",
      type: "vocal",
      what: "Pick a backing track and LISTEN for 30 seconds — hear where the groove breathes, where the accents fall, where silence lives. Then hum along, matching the track's energy and phrasing patterns. No chord tones to hit, no rules — just absorb the groove through your body. Mirror neuron research shows that active listening IS motor rehearsal.",
      setup: "Guitar optional. One backing track of your choice.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      steps: [
        { text: "Pick a backing track. Just LISTEN for 30 seconds with eyes closed. Don't play, don't hum. Where does the groove breathe? Where are the accents? Where is the silence? Map the groove in your body.", why: "Mirror neuron research shows that focused listening activates the same motor pathways as performing. When you deeply listen to a groove, your brain is rehearsing it — even in silence." },
        { text: "Start humming along — no specific notes, no pentatonic thinking. Just match the ENERGY of the track. When it's sparse, hum sparsely. When it fills up, hum more. You're absorbing phrasing patterns through imitation.", why: "Humming along with a reference is how musicians have learned for millennia — before notation, before theory. Your ear absorbs phrasing, timing, and dynamics faster through imitation than through instruction." },
        { text: "Now add your guitar (strum Am lightly). Keep humming along with the track. Let the track's groove shape your strum pattern AND your humming. You're a third instrument joining the band.", why: "Matching a track while playing trains entrainment — your body syncing to an external groove. This is the foundation of playing with other musicians and playing with feel." },
        { text: "Switch to a different backing track. Notice how your humming and strumming instantly change character. The reggae groove makes you sway differently than the desert blues. 2 minutes per track. Try all three.", why: "Different grooves pull different responses from you. Building the habit of listening-then-absorbing means every song you hear becomes a lesson in phrasing and feel." },
        { text: "On the third track, transition from humming to singing pentatonic notes. Let the groove you absorbed guide your note choices and phrasing. Record this final version.", why: "The transition from humming to pentatonic singing applies your absorbed groove vocabulary to your five-note palette. The groove shapes the melody — not the other way around." }
      ],
      feel: "This should feel like joining a conversation that's already happening — you're not leading, you're blending in. The track is the teacher. Your job is to absorb its phrasing, its timing, its attitude.",
      wrong: "If you're ignoring the track and doing your own thing, you're missing the exercise. The whole point is to let the track shape your response. Listen first, always. If your humming doesn't change when you switch tracks, you're not listening deeply enough.",
      sarah: "Gene, this is how you already learn music — you listen to Khruangbin and Skinshape, and their phrasing seeps into you. This exercise makes that absorption conscious and deliberate. Every listen is a lesson, every groove is a teacher.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-3-26",
      time: 8,
      title: "Object Writing — Sensory Vocabulary",
      type: "record",
      what: "Pat Pattison's #1 daily exercise from Berklee. Pick an object — a surfboard, a bonfire, a highway at dusk. Set a timer for 7 minutes. Write (or speak into your recorder) using ALL your senses: what does it look like, sound like, smell like, taste like, feel against your skin? What does your body feel internally? Where are you in space? No editing, no judging — just sensory flow.",
      setup: "Phone recorder or notebook. No guitar needed. Timer set to 7 minutes.",
      steps: [
        { text: "Pick an object that connects to your music — a wave, a desert road, a porch at sunset, a bonfire, a vintage amplifier. Something with sensory richness. Set a 7-minute timer.", why: "Pat Pattison at Berklee assigns this daily. The objects you choose reveal your artistic world. Songwriters who do this daily build a sensory vocabulary that makes lyrics vivid instead of generic." },
        { text: "Start the timer. Speak into your recorder (or write) using ALL 7 senses: sight, sound, smell, taste, touch, organic (internal body feelings — heartbeat, breath, tension), kinesthetic (your body's position in space). Don't stop. Don't edit. Just flow.", why: "The 7-sense framework forces you past the visual default. Most people describe what they SEE. Songwriters who access all senses create lyrics that listeners FEEL. 'The salt air coating my lips' beats 'the beautiful ocean' every time." },
        { text: "When the timer goes off, stop. Read or listen back. Circle or note any phrase that surprised you — something vivid, unexpected, or emotionally charged. These surprises are song seeds.", why: "The surprises are gold. Your conscious mind writes clichés. Your subconscious, freed by the timer pressure, produces original imagery. The circled phrases become future lyrics." },
        { text: "Try it again with a different object. This time, pick something from your musical life — the feeling of singing a note that locks with the chord, the sensation of a guitar string under your fingertip, the way a reggae groove makes your body sway.", why: "Object writing about musical experiences builds the vocabulary to write ABOUT music. Your lyrics will eventually describe musical moments with the same specificity you use for surfboards and sunsets." },
        { text: "Keep both recordings. These are raw material for future songwriting — you'll draw from them in Levels 6 and beyond. The sensory vocabulary you build now powers every lyric you'll ever write.", why: "Object writing is cumulative. Each session adds to your sensory database. Songwriters who practice this daily for months find that vivid imagery flows naturally into their lyrics — it becomes automatic." }
      ],
      feel: "This should feel like stream-of-consciousness — messy, surprising, sometimes nonsensical. The mess is where the gold hides. Don't try to write 'good' — try to write FAST and SPECIFIC.",
      wrong: "If you're writing abstract emotions ('I felt happy,' 'the sunset was beautiful'), you're staying on the surface. Dig into the senses: WHAT does happy feel like in your chest? What COLOR is the sunset — not 'orange' but 'the orange of old rust on a tailgate'? Specificity is everything.",
      sarah: "Gene, this is the foundation of every great lyric you've ever loved. 'Beautiful day that you know will end' — that's sensory, specific, embodied. Object writing builds the muscle that produces lines like that. Do this daily, even for 5 minutes, and your lyrics will transform.",
      recorder: true
    },
    {
      id: "ss-3-27",
      time: 6,
      title: "Whisper to Full Voice",
      type: "vocal",
      what: "Dynamic range exploration with pentatonic notes. Move from barely audible whisper to full chest voice and back — with all five pentatonic notes available. Dynamics in isolation: same chord, same scale, just volume as a creative variable.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am softly.",
      steps: [
        { text: "Strum Am very softly. Sing pentatonic notes in a near-whisper — your voice should barely rise above the guitar. Hold notes, drift between pitches, keep everything quiet and intimate. This is your DOPE LEMON register.", why: "Singing quietly requires more breath control than singing loudly. It also creates intimacy — the listener leans in. Many of your favorite artists live in this whisper range." },
        { text: "Gradually increase volume over 8 bars until you're singing pentatonic phrases at full chest voice. The strum should get louder too — guitar and voice grow together. Feel the energy build.", why: "A volume crescendo is the simplest form of musical drama. Learning to build intensity gradually is a fundamental songwriting and performance skill — the slow burn that makes a climax satisfying." },
        { text: "Now reverse: start at full voice and gradually fade to a whisper over 8 bars. Pulling back requires more control than pushing forward. Let the pentatonic phrases simplify as the volume drops — fewer notes, more space.", why: "Decrescendo is harder because your body wants to stay at the louder, easier volume. Control over the fade is what separates amateurs from artists. The fade creates tenderness and intimacy." },
        { text: "Free improv: move through your dynamic range unpredictably while singing pentatonic phrases. Whisper for 4 bars, then suddenly full voice for 2 bars, then back to medium. Surprise yourself. 2 minutes.", why: "When dynamics become a variable you control consciously, your improvisation gains a third dimension beyond pitch and rhythm. Unpredictable dynamics keep the listener engaged and the music alive." },
        { text: "Final pass: pair dynamics with pentatonic range. Low notes (A, C) sung quietly. High notes (E, G) sung louder. Then reverse: low notes loud, high notes whispered. Feel how dynamic pairing with pitch creates different emotional landscapes. Record it.", why: "Pairing dynamics with pitch range is a compositional technique. 'High = loud' is the natural instinct. 'High = soft' is the unexpected choice that creates surprise and beauty. Both are tools in your kit." }
      ],
      feel: "The whisper should feel private and close — singing for yourself. The full voice should feel open and projecting — singing for the room. The transitions should feel like sunrise and sunset — gradual, natural, inevitable.",
      wrong: "If you're stuck at one volume the whole time, you're ignoring the most powerful expressive tool you have. Push the extremes — whisper so quietly you can barely hear yourself, then open up to fill the room. The range between those extremes is your dynamic palette.",
      sarah: "Gene, your porch register naturally lives in the quieter range — that's your sweet spot. But even DOPE LEMON has dynamic peaks, and Allah-Las build from whisper to wall of sound. This exercise builds the full range around your natural center, with your full pentatonic vocabulary underneath.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can sing the root with stability and rhythmic variety, navigate between root and 5th with confidence, feel the minor 3rd as emotional color, walk stepwise through 4 notes, improvise freely across the full Am pentatonic, hold musical conversations at every note stage, switch between minor and major palettes, use silence and dynamics as expressive tools, absorb grooves through listening, and build sensory vocabulary through object writing — all while the guitar strum stays on autopilot."
    }
  ]
};
