import { getPitchRange } from "./appData.js";

// ─── VOCAL CURRICULUM: Singer-Songwriter Vocal Journey ──────────────
// 10 levels, ~50 exercises. Covers breath to performance.
// All 8 original passaggio exercises preserved and redistributed.

export const VOCAL_LEVELS = [
  // ─── LEVEL 1: Breath & Body ─────────────────────────────────────────
  {
    num: 1, name: "Breath & Body", focus: "Diaphragm, posture, SOVT warm-ups",
    duration: "15 min",
    setup: "Standing. Glass of water. No guitar. Quiet room.",
    subtitle: "The Instrument Itself",
    description: "Every great singer built on this foundation. Breath support, posture, and warm-ups are the invisible skills that make everything else possible. These exercises set up your body as the instrument before you ask it to play.",
    artists: "Every pro vocalist",
    unlocks: "Pitch & Range (Level 2)",
    exercises: [
      {
        id: "v1e1", time: 3, title: "\"Hey, Stop It!\" -- Chest Voice Activation", type: "vocal",
        what: "Use conversational exclamations to naturally engage your chest voice and diaphragm. Feel the physical difference between chest voice (diaphragm engaged, belly pushes out) and head voice (lighter, no belly engagement).",
        setup: "Standing. Hand on belly, skin contact under your shirt.",
        referencePitches: getPitchRange("F3", "B3"),
        steps: [
          { text: "Say 'Hey!' like someone across the room -- loud, natural, conversational.", why: "This engages your diaphragm without thinking about it. Natural speech activates chest voice automatically." },
          { text: "Feel your belly push against your hand? That's your diaphragm. That's chest voice.", why: "The belly push is unmistakable once you feel it. This is the foundation of breath support." },
          { text: "Now say 'Hey' softly, gently, from your head. Notice: no belly push.", why: "Head voice feels lighter, floatier. The sound lives above your shoulders." },
          { text: "Say 'Hey, stop it!' -- commit to it, like you mean it. That's full chest voice.", why: "The exclamation forces diaphragm engagement. It's not about volume -- it's about engagement." },
          { text: "Alternate: loud 'Hey!' (chest) -> quiet 'hey' (head) -> loud 'Hey, STOP IT!' (chest). Feel the flip.", why: "Training the switch between registers. You need to feel both to eventually find the mix between them." }
        ],
        feel: "When you nail chest voice, your whole torso resonates. It should feel like the sound is coming from your gut, not your throat. Head voice feels like the sound floats above your shoulders.",
        wrong: "If 'Hey, stop it!' feels like you're just getting louder without the belly engagement, you're pushing from your throat. Think of getting punched in the stomach -- that instinctive flex is what you want.",
        sarah: "It's not even just a volume thing -- it's an engagement of that diaphragm muscle down there. People think belting is yelling, but belting is from a mixed voice. If you can mix it, you can have a huge voice.",
        levelUp: "Can clearly feel and identify chest vs head voice on command."
      },
      {
        id: "v1e2", time: 3, title: "Rib Expansion Breathing", type: "vocal",
        what: "Appoggio technique: ribs expand sideways and stay expanded during exhale. This is the breath support technique used by trained singers worldwide. Sustain 'sss' for increasing durations.",
        setup: "Standing. Hands on sides of ribcage, fingers pointing forward.",
        steps: [
          { text: "Place hands on your ribcage, fingers forward, thumbs back. Breathe in slowly through your nose.", why: "You need to feel your ribs expand sideways -- not your chest rising or belly pushing out." },
          { text: "Feel your ribs push your hands outward? That's lateral rib expansion. The diaphragm is pulling down and out.", why: "This is different from belly breathing. Appoggio uses the intercostal muscles to maintain expansion." },
          { text: "Now exhale on a sustained 'sss' sound. Keep your ribs expanded -- don't let them collapse.", why: "The key insight: ribs stay OUT while you exhale. This creates controlled, steady airflow." },
          { text: "Sustain 'sss' for 10 seconds, then 15, then 20. Ribs must stay expanded the entire time.", why: "Increasing duration builds the intercostal muscle endurance you need for long phrases." },
          { text: "Rest 10 seconds between each attempt. 3 rounds at each duration.", why: "These muscles fatigue quickly at first. Short rest prevents compensating with throat tension." }
        ],
        feel: "Your ribs should feel like a barrel that stays inflated even as air leaves. The 'sss' should be perfectly steady -- no wavering, no bursts.",
        wrong: "If your shoulders rise when you breathe in, you're chest breathing. If your ribs collapse immediately on exhale, you haven't engaged the intercostals yet. Start with shorter durations.",
        sarah: "Breath support isn't about taking a big breath. It's about controlling the release. The ribs staying out IS the support.",
        levelUp: "Sustain 'sss' for 20 seconds with steady airflow and ribs staying expanded."
      },
      {
        id: "v1e3", time: 3, title: "Lip Trill Warm-Up", type: "vocal",
        pitchContour: true,
        what: "SOVT warm-up using lip trills. The backpressure from the trill protects your vocal folds while warming them up. Start on 3 comfortable pitches, glide through a 5th, finish with a relaxed sigh.",
        setup: "Standing. Lips loose. Jaw relaxed.",
        referencePitches: getPitchRange("C3", "G3"),
        steps: [
          { text: "Lips together, loose. Start a lip trill (like a horse noise). If it won't start, press index fingers gently into your cheeks.", why: "The lip trill creates SOVT backpressure that helps your vocal folds vibrate efficiently with less effort." },
          { text: "Hold the trill on C3 for 4 seconds. Then D3. Then E3. Each note 4 seconds.", why: "Starting on comfortable, low notes warms up the folds gently without strain." },
          { text: "Now glide from C3 up to G3 (a 5th) on one continuous trill. Slow, 3-4 seconds.", why: "The glide stretches your range gradually. The trill keeps things easy." },
          { text: "Glide back down G3 to C3. Repeat 3 times.", why: "Each pass loosens the vocal folds a little more. You're literally warming them up." },
          { text: "Finish with a deep, relaxed sigh -- 'haaaaah' from the top of your range down. No trill, just an open release.", why: "The sigh releases any tension that built up. It resets your throat to neutral." }
        ],
        feel: "The trill should feel buzzy and effortless. If your lips stop trilling, you're pushing too much air. Less air = better trill.",
        wrong: "If the trill keeps cutting out, your lips are too tense or you're using too much air. Press cheeks in gently and reduce airflow. If the pitch wobbles, slow down the glide.",
        levelUp: "Clean lip trill glides C3 to G3 and back, 3 times without the trill cutting out."
      },
      {
        id: "v1e4", time: 3, title: "Posture Reset", type: "vocal",
        what: "Singer's body alignment: stack spine, drop shoulders, loose jaw, combine with rib breathing. This is the physical setup you should use before every vocal exercise.",
        setup: "Standing. Bare feet if possible. Mirror helps.",
        steps: [
          { text: "Feet shoulder-width apart. Knees slightly soft (not locked). Weight evenly distributed.", why: "Locked knees restrict blood flow and create tension. Soft knees let your body be responsive." },
          { text: "Roll your shoulders up to your ears, hold 3 seconds, then DROP them. Repeat 3 times.", why: "Shoulder tension is the #1 enemy of good singing. The drop releases it." },
          { text: "Let your jaw hang open. Massage your jaw hinge (in front of your ears) in small circles for 10 seconds.", why: "A tight jaw restricts resonance and vowel formation. You need it loose for every exercise that follows." },
          { text: "Now stack it: soft knees + dropped shoulders + loose jaw + rib expansion breath. Hold this posture and breathe 4 times.", why: "This is your singing posture. Every exercise starts from this position." },
          { text: "Hum a comfortable note for 5 seconds in this posture. Feel the resonance in your chest and face.", why: "The hum is a test -- if your posture is right, the hum will feel easy and resonant." }
        ],
        feel: "Your body should feel tall but relaxed. Like a puppet held up by a string from the top of your head, with everything else hanging loose below it.",
        wrong: "If your shoulders creep back up within 30 seconds, you have a tension habit. The shoulder drops need to happen frequently throughout practice, not just once.",
        levelUp: "Can maintain singer's posture through an entire 3-minute exercise without shoulders rising."
      },
      {
        id: "v1e5", time: 3, title: "Straw Phonation", type: "vocal",
        pitchContour: true,
        what: "Advanced SOVT through a cocktail straw. The narrow opening creates more backpressure than lip trills, which further protects and trains the vocal folds. Glide through your full range, then transfer the feeling to open vowels.",
        setup: "Standing. Cocktail straw (thin, not wide). Glass of water optional (for bubbling).",
        referencePitches: getPitchRange("C3", "C4"),
        steps: [
          { text: "Hum into the straw on a comfortable note (around G3). Feel the backpressure in your throat.", why: "The narrow straw creates significant backpressure. Your vocal folds work more efficiently against this resistance." },
          { text: "Glide from your lowest comfortable note up to your highest on a single breath through the straw.", why: "Full range glide through the straw. The backpressure makes the passaggio transition easier." },
          { text: "Glide back down. Repeat 3 times. Each time, try to make the transition through A3-Bb3 smoother.", why: "The break zone is where the straw helps most. The backpressure supports the register transition." },
          { text: "Remove the straw. Sing 'ooh' on the same glide path. Try to keep the same easy feeling.", why: "The goal is to transfer the efficient phonation from straw to open singing. 'Ooh' is closest to the straw sensation." },
          { text: "If you have water: dip the straw in, blow bubbles while singing. Steady bubbles = steady airflow.", why: "Bubbles are instant visual feedback. Uneven bubbles mean your airflow is inconsistent." }
        ],
        feel: "Through the straw, your voice should feel effortless -- the straw does some of the work for you. When you switch to 'ooh', try to keep that same effortless quality.",
        wrong: "If your face turns red or you feel pressure behind your eyes, you're pushing too hard. The straw needs LESS air than you think. If no sound comes through, you need slightly MORE air.",
        sarah: "Straw phonation is used by Broadway performers, opera singers, and vocal therapists. It's the closest thing to a vocal gym machine -- resistance training for your voice.",
        levelUp: "Clean straw glide through full range with smooth passaggio transition, followed by an 'ooh' that maintains the same ease."
      }
    ]
  },

  // ─── LEVEL 2: Pitch & Range ─────────────────────────────────────────
  {
    num: 2, name: "Pitch & Range", focus: "Passaggio, register transitions, pitch accuracy",
    duration: "20 min",
    setup: "Standing. No guitar. Live Pitch Detector on.",
    subtitle: "Tuning the Instrument",
    description: "Your voice has a break point around A3 where chest voice transitions to head voice. These exercises map that transition zone, train smooth crossings, and build pitch accuracy across your range. This is where the original passaggio work lives.",
    artists: "Jeff Buckley, Thom Yorke",
    unlocks: "Rhythm & Phrasing (Level 3)",
    exercises: [
      {
        id: "v2e1", time: 4, title: "Descending 5-Note Scale", type: "vocal",
        pitchContour: true,
        what: "Start above your break on a comfortable note, descend through A3 on a single vowel. The voice naturally transitions from head/mix into chest. You're observing where that happens, not forcing it.",
        setup: "Standing. Pitch Detector on. Conversational volume, 6/10.",
        referencePitches: getPitchRange("C4", "E3"),
        steps: [
          { text: "Start on C4. Sing: C4->B3->A3->G3->F3 on 'nee'. One note per beat at 80 BPM.", why: "Starting above the break and descending through it lets the voice transition naturally. 'Nee' keeps the sound forward." },
          { text: "Each round starts a half step lower. You'll cross through the break around round 3.", why: "Lowering the starting note moves the critical transition zone to a different spot in each round." },
          { text: "Volume: conversational, 6/10. The quieter you are, the more the flip reveals itself.", why: "Loud singing masks the break. Quiet singing exposes it -- which is what you want for training." },
          { text: "Do 4 rounds total. Notice: where does the voice 'settle' from head into chest?", why: "Around Bb3-A3, you'll notice the tone getting warmer, heavier. That's the passaggio." }
        ],
        feel: "Around Bb3-A3, you'll notice the voice 'settling' -- like stepping off a curb. The tone gets slightly heavier, warmer, more chest-resonant. The 'nee' vowel naturally brightens the sound, making the transition smoother.",
        wrong: "If you're straining to keep the same tone quality all the way down, you're fighting the flip. Let it happen. The voice WANTS to shift. Your job is to make the shift gradual, not prevent it.",
        sarah: "Why 'nee'? The closed vowel + nasal consonant keeps the sound forward and bright, which encourages mix voice through the break.",
        metronome: 80,
        levelUp: "Smooth descent through the break zone with no audible crack on 3 consecutive rounds."
      },
      {
        id: "v2e2", time: 4, title: "Messa di Voce", type: "vocal",
        volumeMeter: true,
        what: "Sing a single note in your break zone. Start as quiet as possible, swell to medium volume, back to quiet. The crescendo tries to pull you into chest voice. The goal: stay in mix through the entire swell.",
        setup: "Standing. Breathe into your ribs (appoggio from Level 1). Pitch Detector on.",
        referencePitches: getPitchRange("G3", "C4"),
        steps: [
          { text: "Sing 'ah' on G3 at piano (pp). Hold for 2 seconds.", why: "G3 is below the break -- it should feel easy in chest voice. This is your baseline." },
          { text: "Swell to mezzo forte (mf) over 3 seconds. Then decrescendo back to pp over 3 seconds. Total: 8 seconds.", why: "The swell challenges your breath support. The decrescendo challenges your control." },
          { text: "3 cycles on G3, then move to Ab3, A3, Bb3.", why: "Each higher note brings you closer to the break. The swell becomes harder as the voice wants to flip." },
          { text: "Maintain outward rib expansion (appoggio) as you exhale. Don't let your ribs collapse.", why: "Rib expansion from Level 1 is your breath support. Without it, the swell collapses." },
          { text: "VOWEL MODIFICATION: As you approach A3, let 'ah' drift toward 'uh'.", why: "This lowers the first formant, letting the vocal folds thin out for mix voice instead of hitting the chest voice ceiling." }
        ],
        feel: "On G3, this should feel effortless. On Ab3, you'll feel a 'choice point' during the crescendo. On A3, the crescendo is the test -- can you swell without the voice flipping? If it does flip, that's fine.",
        wrong: "If the swell sounds like a sudden jump from quiet to loud, slow down the crescendo. If the voice cracks on A3, reduce your max volume -- stop at mp instead of mf.",
        sarah: "The messa di voce is the #1 exercise for building a seamless mix. Quiet-loud-quiet on one note teaches your voice to navigate the break without flipping.",
        levelUp: "Smooth swell on A3 without cracking, 3 times in a row."
      },
      {
        id: "v2e3", time: 3, title: "Siren Glides", type: "vocal",
        pitchContour: true,
        what: "Lip trill (or sustained 'vvv') gliding from your lowest note up to your highest and back. The lip trill adds SOVT backpressure which makes the transition through the break easier. Diagnostic exercise -- reveals your current state.",
        setup: "Standing. Lips loose. No guitar.",
        referencePitches: getPitchRange("C2", "G4"),
        steps: [
          { text: "Start a lip trill on your lowest comfortable note (~C2). Glide UP to your highest head voice (~G4). 4-5 seconds up.", why: "The full-range glide maps your entire instrument in one pass." },
          { text: "Glide back DOWN in 4-5 seconds. Listen for where the trill wobbles or cuts out.", why: "The wobbly spots are your transition zones. These are the areas to focus on." },
          { text: "Rounds 3-5: SLOW DOWN through the Ab3-A3-Bb3 zone. Take 3-4 seconds just for those three notes.", why: "This is your passaggio. Slowing down here trains the vocal folds to make the transition gradually." },
          { text: "If the trill stops, switch to 'vvv' or hum through a straw. Same glide path.", why: "Different SOVT exercises work better on different days. Having alternatives keeps you progressing." }
        ],
        feel: "The siren should feel like an elevator ride. Chest voice feels warm and full. Through the break, the trill may become uneven. Head voice feels lighter, buzzier. The uneven zone is your passaggio -- exactly where you're training.",
        wrong: "If the trill STOPS during the break (complete cutout, not just unevenness), you're pushing too much air. Back off to 50% airflow. The trill should be continuous, even if it wobbles.",
        sarah: "SOVT exercises like lip trills create backpressure that helps the vocal folds transition between registers more smoothly. Think of it as training wheels for the passaggio.",
        levelUp: "Complete full-range siren with continuous trill (wobbles OK, no complete cutouts) 3 times."
      },
      {
        id: "v2e4", time: 3, title: "Vowel Modification Climb", type: "vocal",
        pitchContour: true,
        what: "Ascend E3-C4 shifting vowels as you climb: 'ah' in chest, 'uh' through the break, 'oh' in head. This uses the VowelMap data -- you're learning to modify vowels to smooth register transitions.",
        setup: "Standing. VowelMap visible for reference. Pitch Detector on.",
        referencePitches: getPitchRange("E3", "C4"),
        steps: [
          { text: "Start on E3 with 'ah' (open chest vowel). Sing E3-F3-G3 on 'ah'. Should feel warm and full.", why: "Below the break, 'ah' is natural. Your chest voice handles these notes easily." },
          { text: "At Ab3, shift to 'uh'. Sing Ab3-A3 on 'uh'. Notice how the tone rounds out.", why: "The vowel shift lowers the first formant, helping your voice transition through the break without cracking." },
          { text: "At Bb3, shift to 'oh'. Sing Bb3-B3-C4 on 'oh'. The tone should feel heady but supported.", why: "'Oh' is a closed, rounded vowel that works with head voice placement. It helps the upper notes ring without strain." },
          { text: "Now do the whole climb E3-C4 in one pass, shifting vowels at the right spots. Smooth, no gaps between vowels.", why: "The goal: the vowel shifts become automatic, and the register transition becomes inaudible." }
        ],
        feel: "Each vowel change should feel like a natural adjustment, not a sudden switch. Like changing gears in a car -- smooth and continuous.",
        wrong: "If the vowel changes sound abrupt, you're changing too suddenly. Overlap the vowels: 'ah' gradually morphs into 'uh', which gradually morphs into 'oh'.",
        levelUp: "Smooth ascending climb E3-C4 with vowel modifications and no audible break, 3 times."
      },
      {
        id: "v2e5", time: 3, title: "Ooh Climbing", type: "vocal",
        pitchContour: true,
        what: "Over a chord progression, sing 4 ascending 'ooh' notes per chord. Each chord gets different notes. Push through the break zone as you repeat. This bridges exercises and real singing.",
        setup: "Guitar: Am -> C -> G -> D. Island strum or fingerpick at 120 BPM.",
        referencePitches: getPitchRange("A2", "C4"),
        steps: [
          { text: "On Am: sing 4 'ooh' notes that CLIMB. Example: A2->C3->E3->A3.", why: "Climbing on chord tones connects pitch accuracy to harmonic awareness." },
          { text: "On C: sing 4 DIFFERENT climbing notes. Example: C3->E3->G3->C4.", why: "Forcing different patterns on each chord prevents autopilot and trains improvisation." },
          { text: "On G and D: keep climbing, keep changing the pattern.", why: "The variety forces your ear to find new paths through the harmony." },
          { text: "As you repeat cycles, push the range higher. Let yourself enter the break zone.", why: "Each cycle pushes you a little further. A committed crack teaches your voice more than a safe whisper." },
          { text: "COMMIT to each note. More air = better pitch.", why: "Sarah's most frequent instruction. More subglottic pressure gives the vocal folds more to work with." }
        ],
        feel: "This should feel like musical exploration -- you're improvising a melody in real time over a chord progression. When you enter the break zone, the voice may thin out or crack. That's the exercise working.",
        wrong: "If you sing the same 4 notes on every chord, you're on autopilot. Force yourself to start on different notes, use different intervals.",
        sarah: "Commit is the word. Soft/breathy singing in the break zone just makes the folds unable to phonate cleanly. Push the air, let the voice figure it out.",
        metronome: 120,
        levelUp: "Regularly entering break zone with committed tone across all 4 chords."
      },
      {
        id: "v2e6", time: 3, title: "Rhythmic Pitch Matching", type: "vocal",
        what: "Over a groove beat with Am on guitar, sing specific chord tones on specific beats. Then move them to off-beats. This fuses pitch training with rhythm training.",
        setup: "Guitar: Am chord. Groove Beat 90 BPM playing.",
        referencePitches: getPitchRange("A2", "C4"),
        steps: [
          { text: "Sing Am chord tones: Root (A2) on beat 1, 3rd (C3) on beat 3.", why: "Placing specific pitches on specific beats trains precision." },
          { text: "Next bar: 5th (E3) on beat 1, Octave (A3) on beat 3.", why: "A3 is in the break zone -- you're training passaggio while thinking about rhythm." },
          { text: "Descend back down over 2 bars. Repeat for C, G, D chords.", why: "Tracking chord tones through changes is what real singing demands." },
          { text: "LEVEL UP: Move the notes to &'s instead of beats. Same pitches, syncopated.", why: "Syncopated placement while maintaining pitch accuracy is the real challenge." }
        ],
        feel: "On-beat version should feel like 'placing' notes on a shelf -- deliberate and precise. The syncopated version should feel like the notes are floating between the beats.",
        wrong: "If you're hitting approximately-right pitches, play the target note on guitar first, listen, then sing it. Pitch memory improves with exact reference points.",
        sarah: "When you sing A3 on beat 3 of bar 2, you're singing in your break zone. This is intentional -- it trains you to navigate the passaggio while thinking about rhythm.",
        metronome: 90,
        levelUp: "Clean syncopated version with accurate pitches on all 4 chords."
      }
    ]
  },

  // ─── LEVEL 3: Rhythm & Phrasing ────────────────────────────────────
  {
    num: 3, name: "Rhythm & Phrasing", focus: "Vocal timing, behind-the-beat, reggae delivery",
    duration: "20 min",
    setup: "Metronome or backing track. 85-90 BPM. No guitar.",
    subtitle: "Singing IN the Beat",
    description: "Great singers don't just sing the right notes -- they sing them at the right time. This level trains the vocal timing skills that separate karaoke from artistry: on-beat precision, offbeat phrasing, and the behind-the-beat delivery that defines reggae, surf, and psych vocals.",
    artists: "Jack Johnson, Bob Marley, DOPE LEMON",
    unlocks: "Ear Training & Harmony (Level 4)",
    exercises: [
      {
        id: "v3e1", time: 4, title: "On-Beat Vocal Placement", type: "vocal",
        what: "Sing 'dah' precisely on beats, then on beats 1 & 3 only. Use the nod technique from rhythm drills to anchor your body to the pulse.",
        setup: "Metronome at 90 BPM. Standing. No guitar.",
        steps: [
          { text: "Say 'dah' on every beat: 1-2-3-4. Match the metronome exactly.", why: "On-beat placement is the foundation. You need to be precise before you can be intentionally off." },
          { text: "Nod your head: DOWN on the beat, UP between beats. Same nod from rhythm training.", why: "The nod physically anchors the pulse in your body. Your voice follows your body's sense of time." },
          { text: "Now 'dah' only on beats 1 and 3. Stay silent on 2 and 4.", why: "Selective placement trains restraint. Not every beat needs a vocal event." },
          { text: "Add pitch: sing A3 on beat 1, C3 on beat 3. Maintain exact timing.", why: "Now you're combining pitch accuracy with rhythmic precision -- the two skills together." }
        ],
        feel: "Each 'dah' should land RIGHT on the click, not a millisecond early or late. It should feel like your voice and the metronome are the same event.",
        wrong: "If you consistently land slightly after the click, you're reacting to it instead of anticipating it. Try to ARRIVE at the click, not respond to it.",
        metronome: 90,
        referencePitches: getPitchRange("A2", "C4"),
        levelUp: "8 bars of on-beat 'dah' with pitch where every syllable is indistinguishable from the click timing."
      },
      {
        id: "v3e2", time: 4, title: "Offbeat Vocal Phrasing", type: "vocal",
        what: "Voice on the &'s only. Reggae/dub vocal feel. This is Jack Johnson territory -- the voice lives between the beats, floating over the rhythm.",
        setup: "Metronome at 85 BPM. Nod on beats to anchor.",
        steps: [
          { text: "Metronome at 85. Nod DOWN on beats, UP on &'s. Same as rhythm training.", why: "The nod keeps the beat in your body while your voice moves to the offbeat." },
          { text: "Say 'dah' ONLY on the &'s. Silent on beats. Voice should coincide with the UP-nod.", why: "This is the basic reggae vocal feel. The voice pushes forward between beats." },
          { text: "Hold each 'dah' for the full space between &'s. Let it ring.", why: "Short, clipped offbeats sound stiff. Let the syllables breathe and float." },
          { text: "Try with words: 'I -- can -- feel -- the -- sun --'. One word per & of each beat.", why: "Moving from syllables to words is the bridge to actual offbeat singing." }
        ],
        feel: "Your voice should feel like it's floating above the rhythm, not locked to it. Like a surfer on a wave -- the wave (beat) carries you, but you're riding between the crests.",
        wrong: "If your nod starts matching your voice (nodding on &'s), you've lost the beat. The nod stays on the beats. Your voice stays on the &'s. They never align.",
        metronome: 85,
        levelUp: "8 bars of clean offbeat vocal phrasing with words, nod maintained on beats."
      },
      {
        id: "v3e3", time: 4, title: "Behind-the-Beat Delivery", type: "vocal",
        recorder: true,
        what: "Arrive a fraction AFTER the click. DOPE LEMON's lazy drawl, Jack Johnson's conversational timing. This is an intentional 50-100ms delay that creates the laid-back feel.",
        setup: "Metronome at 85 BPM or Reggae One Drop 85 BPM backing track.",
        steps: [
          { text: "Start by singing on the beat for 4 bars. Get locked in.", why: "You need to know where the beat IS before you can intentionally be late." },
          { text: "Now deliberately arrive a tiny bit AFTER the beat. Think 'lazy' or 'no rush'.", why: "The delay should be 50-100ms -- barely perceptible but deeply felt. This is the DOPE LEMON feel." },
          { text: "Say a phrase: 'Sitting on the porch watching the sun go down'. Each word arrives just after its beat.", why: "Conversational phrasing naturally sits behind the beat. Stop performing and just... talk it." },
          { text: "Record yourself. Listen back. Can you hear the laid-back feel? Or does it sound late/sloppy?", why: "There's a fine line between behind-the-beat (musical) and late (sloppy). Your ear learns the difference through playback." }
        ],
        feel: "It should feel like you're in no hurry. Like speaking to a friend on a warm evening. The rhythm moves forward; you let it pull you along gently.",
        wrong: "If it sounds like you're falling behind or losing the beat, you've gone too far. Behind-the-beat is measured in milliseconds, not beats. You should still feel the pulse.",
        metronome: 85,
        levelUp: "4-bar spoken phrase with consistent behind-the-beat feel that sounds musical, not late."
      },
      {
        id: "v3e4", time: 4, title: "Reggae Phrasing: Call & Space", type: "vocal",
        what: "Short 3-5 word bursts, then full-bar rests. Marley's vocal approach uses as much space as sound -- what you DON'T sing is as important as what you do.",
        setup: "Reggae One Drop 85 BPM backing track or metronome at 85.",
        steps: [
          { text: "Sing a 3-5 word phrase over 1 bar. Then rest for a full bar. Silence.", why: "Marley's vocals use as much space as sound — short phrases, then full-bar rests. The space gives each phrase weight and lets the riddim breathe." },
          { text: "Example: 'Don't worry...' (bar of singing) then full bar of silence. 'About a thing...' (bar) silence.", why: "Each phrase is a statement. The silence lets it land before the next one arrives." },
          { text: "Resist the urge to fill the silence. The space IS the music.", why: "Western pop trains us to fill every beat. Reggae teaches the power of restraint." },
          { text: "Try improvising your own call-and-space phrases. Keep them short. Keep the silences full-bar.", why: "Improvising within constraints builds the phrasing skill faster than singing written lyrics." }
        ],
        feel: "Each phrase should feel like a complete thought that hangs in the air. The silence should feel intentional and powerful, not like you forgot what comes next.",
        wrong: "If you keep sneaking in extra words or humming during the rest bars, you're not comfortable with silence yet. Practice the silence as deliberately as the phrases.",
        metronome: 85,
        recorder: true,
        levelUp: "2 minutes of improvised call-and-space phrasing with clean full-bar rests."
      },
      {
        id: "v3e5", time: 4, title: "Phrase Length Control", type: "vocal",
        what: "Practice 1-beat, 2-beat, 4-beat phrases, then mix them up. Thom Yorke's varying phrase lengths create tension and release. Control over phrase length = control over emotional pacing.",
        setup: "Metronome at 90 BPM. No guitar.",
        steps: [
          { text: "4 bars of 1-beat phrases: one word per beat, rest 3 beats. 'Sun... (rest rest rest) Rain... (rest rest rest)'", why: "Single-beat phrases are punchy and declarative. Like headlines." },
          { text: "4 bars of 2-beat phrases: two words spanning beats 1-2, rest on 3-4.", why: "Two-beat phrases flow more naturally. Like sentence fragments." },
          { text: "4 bars of 4-beat phrases: fill the whole bar with words.", why: "Full-bar phrases are conversational. Like complete thoughts." },
          { text: "Now MIX: 1-beat, 4-beat, 2-beat, 1-beat. Vary the length every bar.", why: "The variation creates rhythmic interest. Thom Yorke does this constantly -- short phrase, long phrase, short, long." }
        ],
        feel: "The mixed section should feel like a conversation -- some things you say quickly, others you take your time with. The variety should feel natural, not mechanical.",
        wrong: "If all your phrases end up the same length, you're defaulting to your comfort zone. Deliberately alternate between extremes -- one word, then a full sentence.",
        metronome: 90,
        recorder: true,
        levelUp: "2 minutes of mixed phrase lengths that sound conversational, not robotic."
      }
    ]
  },

  // ─── LEVEL 4: Ear Training & Harmony ────────────────────────────────
  {
    num: 4, name: "Ear Training & Harmony", focus: "Intervals, chord tones, hearing changes",
    duration: "20 min",
    setup: "Guitar for chord references. No backing track needed initially.",
    subtitle: "Hearing the Music Inside the Music",
    description: "Your ear is the most important instrument you own. These exercises train you to hear chord tones, sing intervals, and build melodies from what you hear -- not what you've memorized. Jeff Buckley and Nick Drake could hear music inside chords that other people missed.",
    artists: "Jeff Buckley, Nick Drake",
    unlocks: "Dynamics & Expression (Level 5)",
    exercises: [
      {
        id: "v4e1", time: 4, title: "Chord Tone Singing", type: "vocal",
        what: "Strum a chord on guitar and sing the notes you hear -- without plucking individual strings first. Trust your ear to find the notes. Sometimes you'll find beautiful 'wrong' notes.",
        setup: "Guitar in hand. Strum C chord. Let it ring.",
        referencePitches: getPitchRange("C3", "C4"),
        steps: [
          { text: "Strum C chord once, full and open. Let it ring. Without thinking, sing the first note you hear.", why: "Your ear naturally gravitates to chord tones. Trust it instead of thinking." },
          { text: "Sing 3-4 notes you hear in the chord, one at a time. Commit to each one even if it feels wrong.", why: "Even 'wrong' notes can be beautiful. Sarah found Gene singing F# over C -- it worked because of the harmonic context." },
          { text: "Now strum again while singing those notes. Do they work? Even the unexpected ones?", why: "Testing your ear-found notes against the chord trains your sense of consonance and dissonance." },
          { text: "Repeat with Am, G, D. Notice how your ear finds different notes over different chords.", why: "Different chords pull your ear to different tones. This is the beginning of melodic improvisation." }
        ],
        feel: "This should feel exploratory, not like a test. There are no wrong answers -- your ear is finding musical connections your conscious mind doesn't know about.",
        wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them.",
        sarah: "It's actually a great thing that you didn't pluck your guitar in that moment because you found something your fingers never would have.",
        levelUp: "Can find 3+ notes per chord that sound musical, across all 4 chords."
      },
      {
        id: "v4e2", time: 4, title: "Interval Recognition", type: "vocal",
        what: "Sing root, minor 3rd, 5th, octave over Am. Then track chord tones through Am->C->G->D. This trains your ear to hear specific intervals and follow them through changes.",
        setup: "Guitar: Am chord. Slow strum.",
        referencePitches: getPitchRange("A2", "A3"),
        steps: [
          { text: "Strum Am. Sing the root (A). Then sing up to the minor 3rd (C). Feel the interval.", why: "The minor 3rd is the sound of sadness/depth. Learning to hear it is ear training 101." },
          { text: "From root, sing up to the 5th (E). Then the octave (A, one octave up).", why: "Root, 3rd, 5th, octave are the four most important intervals. They're the skeleton of every chord." },
          { text: "Now: Am->C->G->D progression. On each chord, sing just the root.", why: "Tracking roots through changes is the simplest form of following harmony. Your voice maps the bass line." },
          { text: "Same progression, but sing the 3rd of each chord: C over Am, E over C, B over G, F# over D.", why: "Singing 3rds requires hearing the chord quality (major vs minor) and finding the right note." }
        ],
        feel: "The root should feel stable, grounded. The 3rd defines the chord's emotion (minor = sad, major = bright). The 5th is open and powerful. The octave is home, higher.",
        wrong: "If the 3rds all sound the same to you, slow down. Strum each chord, pluck the 3rd string, sing it. Then try without plucking.",
        levelUp: "Sing root and 3rd of each chord through Am-C-G-D without plucking reference notes."
      },
      {
        id: "v4e3", time: 4, title: "Melody From Chord Tones", type: "vocal",
        recorder: true,
        what: "Build simple melodies using only chord tones. This is the Jack Johnson / Nick Drake approach -- melodies that live inside the chords, never fighting the harmony.",
        setup: "Guitar: Am -> C -> G -> D. Slow fingerpick.",
        steps: [
          { text: "On Am, sing any two chord tones (A, C, or E) in any order. That's your Am melody fragment.", why: "Limiting yourself to chord tones guarantees consonance. Every note will 'work'." },
          { text: "On C, sing two different chord tones (C, E, or G). Connect them smoothly to your Am notes.", why: "The connection between chords is where melody lives. Smooth voice leading = beautiful melody." },
          { text: "Continue through G and D. Aim for stepwise motion where possible.", why: "Stepwise motion (notes close together) sounds more melodic than big jumps." },
          { text: "Play the progression 4 times, singing a different melody each time. Record the last one.", why: "Repetition with variation trains improvisational fluency. Recording lets you hear what worked." }
        ],
        feel: "Every note should feel like it belongs. No tension, no 'wrong' notes. This is what makes Jack Johnson's melodies feel so effortless -- they're built from chord tones.",
        wrong: "If your melody sounds boring, try adding a non-chord tone as a passing note between chord tones. One tension note makes the resolution sweeter.",
        levelUp: "Improvise a 4-chord melody that sounds like a real song snippet, using mostly chord tones."
      },
      {
        id: "v4e4", time: 4, title: "Sing the Bass Line", type: "vocal",
        recorder: true,
        what: "Sing the root notes of a progression in rhythm. This is the first step toward looper bass vocal lines -- your voice becomes the bass instrument.",
        setup: "Guitar: Am -> C -> G -> D. Simple strum at 85 BPM.",
        steps: [
          { text: "Sing the root of each chord on beat 1: A (low), C, G, D. One note per bar.", why: "Root notes in rhythm = bass line. Your voice is doing what a bass player does." },
          { text: "Add a second note: sing the root on beat 1, the 5th on beat 3. A-E, C-G, G-D, D-A.", why: "Root-5th patterns are classic bass lines. This is getting closer to a real bass part." },
          { text: "Try to sing in your low register. Use chest voice, project from the belly.", why: "Bass lines live in the low range. This is where your Level 1 chest voice training pays off." },
          { text: "Record this bass line and play it back while you play guitar. How does it sound together?", why: "Preview of Level 7: you'll eventually loop this bass vocal and play over it." }
        ],
        feel: "Your voice should feel low, grounded, rhythmic -- like a bass guitar. The notes should anchor the harmony, not float above it.",
        wrong: "If you can't reach the low notes comfortably, transpose up an octave. The pattern matters more than the range at this stage.",
        metronome: 85,
        levelUp: "Clean bass vocal line through Am-C-G-D with root-5th pattern at 85 BPM."
      },
      {
        id: "v4e5", time: 4, title: "Relative Pitch Games", type: "vocal",
        what: "Play a note on guitar, then sing a specific interval above or below it. Ear-voice connection training -- you hear the target, then your voice finds it.",
        setup: "Guitar in hand. Random notes across the neck.",
        steps: [
          { text: "Play any note on guitar. Sing the same note back. This is unison -- the simplest interval.", why: "Matching pitch is the foundation. If this is hard, spend more time here." },
          { text: "Play a note. Sing a major 3rd above it (4 half steps up). Check by plucking 4 frets up.", why: "The major 3rd is happy, bright. Think the first two notes of 'When the Saints'." },
          { text: "Play a note. Sing a 5th above it (7 half steps). Check. The 5th is open, powerful.", why: "The 5th is in almost every chord. Learning to hear it is essential." },
          { text: "Play a note. Sing a minor 3rd above it (3 half steps). Check. Compare to the major 3rd.", why: "The difference between major and minor 3rd is the difference between happy and sad. Your ear needs to feel that." }
        ],
        feel: "When you nail the interval, it should feel like the note was already in your head -- you just had to let it out. When you miss, you'll feel the dissonance immediately.",
        wrong: "If you consistently overshoot or undershoot intervals, sing the interval slowly as a glide first, then try to jump directly. The glide trains the distance.",
        levelUp: "Nail 8 out of 10 random interval challenges without checking on guitar."
      }
    ]
  },

  // ─── LEVEL 5: Dynamics & Expression ─────────────────────────────────
  {
    num: 5, name: "Dynamics & Expression", focus: "Whisper to full voice, emotional arcs",
    duration: "20 min",
    setup: "Standing. Phone to record. Quiet room.",
    subtitle: "Whisper to Full Voice",
    description: "Jeff Buckley could go from a whisper to a scream in one phrase. Elliott Smith's entire catalogue lives in the space between pp and mp. Dynamics are how you tell emotional stories with your voice -- louder isn't better, controlled contrast is everything.",
    artists: "Elliott Smith, Eddie Vedder, Jeff Buckley",
    unlocks: "Style & Texture (Level 6)",
    exercises: [
      {
        id: "v5e1", time: 4, title: "Whisper-to-Full Scale", type: "vocal",
        volumeMeter: true,
        what: "5-note scale: whisper (pp) at the bottom, full voice (f) at the top, back to whisper. Jeff Buckley's superpower was this kind of dynamic range within a single phrase.",
        setup: "Standing. Comfortable 5-note range (e.g., C3-G3). No guitar.",
        referencePitches: getPitchRange("C3", "G3"),
        steps: [
          { text: "Sing C3 at a whisper (pp). Barely audible, but still pitched -- not just air.", why: "A pitched whisper still engages the vocal folds, just barely. This is your dynamic floor." },
          { text: "Ascend: D3 at p, E3 at mp, F3 at mf, G3 at f. Each note louder than the last.", why: "Linking volume to pitch creates a natural crescendo. Higher = louder is intuitive for the body." },
          { text: "Descend: F3 at mf, E3 at mp, D3 at p, C3 back to whisper.", why: "The decrescendo is harder. Your body wants to stay loud. Training the fade-back is the real skill." },
          { text: "Repeat 3 times. On each pass, try to make the transitions between dynamic levels smoother.", why: "You're not looking for 5 discrete volumes -- you want a continuous gradient from whisper to full." }
        ],
        feel: "The scale should feel like a wave: building up, cresting, falling back. The whisper should feel intimate. The full voice should feel powerful but not strained.",
        wrong: "If the whisper has no pitch (just air), engage your vocal folds more. If the full voice feels like shouting, pull back -- f is strong, not screaming.",
        levelUp: "Smooth dynamic gradient across 5 notes with no sudden jumps between levels, 3 times."
      },
      {
        id: "v5e2", time: 4, title: "Dynamic Phrase Arcs", type: "vocal",
        recorder: true,
        volumeMeter: true,
        what: "4-bar phrase: quiet start, peak word, fade. This is the emotional storytelling shape that every great vocalist uses -- build to the most important word, then release.",
        setup: "Standing. Record yourself. Pick any lyric or make one up.",
        steps: [
          { text: "Choose a 4-bar phrase. Example: 'I walked down to the water / and the waves came in / and everything was golden / for a moment then...'", why: "You need words to practice dynamics. Made-up lyrics are fine -- the shape matters, not the poetry." },
          { text: "Identify the PEAK WORD -- the emotional climax. In this example: 'golden'.", why: "Every phrase has one word that carries the most weight. That's where your voice should be loudest." },
          { text: "Sing: start quiet, build toward the peak word, fade after it. pp -> mf -> pp.", why: "This arc is the universal shape of emotional vocal delivery. Build, peak, release." },
          { text: "Record and listen back. Does the peak word stand out? Does the arc feel natural?", why: "Your ears are more objective in playback. What felt dramatic might sound subtle -- or vice versa." }
        ],
        feel: "The peak word should feel like the spotlight hits it. Everything before builds toward it; everything after lives in its afterglow.",
        wrong: "If every word is the same volume, you're delivering a flat line instead of an arc. Exaggerate the dynamics at first -- you can always pull back.",
        levelUp: "Record a phrase arc that sounds emotionally compelling on playback."
      },
      {
        id: "v5e3", time: 4, title: "Messa di Voce on Lyrics", type: "vocal",
        recorder: true,
        volumeMeter: true,
        what: "Apply the pp->mf->pp swell from Level 2 to a lyric line. The peak word = emotional climax. This is the messa di voce evolved from a technical exercise to an expressive tool.",
        setup: "Standing. Record yourself. Pick a lyric from a song you're learning.",
        referencePitches: getPitchRange("G3", "B3"),
        steps: [
          { text: "Take a lyric line from ILTWYW or Sol Del Sur. Identify the peak word.", why: "Using real lyrics from your repertoire makes this immediately applicable." },
          { text: "Sing the line with a messa di voce shape: start quiet, swell to the peak word, fade after.", why: "Same swell from Level 2, but now applied to musical context instead of a sustained note." },
          { text: "Try the same line with the peak on a DIFFERENT word. How does the meaning change?", why: "Moving the dynamic peak changes the emotional emphasis. 'I love the way you walk' vs 'I love the WAY you walk'." },
          { text: "Find the version that feels most true to the song's emotion. Record it.", why: "There's usually one 'right' peak word per phrase. Your gut knows which one." }
        ],
        feel: "The lyric should feel like it's telling a story, not just delivering words. The dynamic shape gives the story an emotional contour.",
        wrong: "If the swell sounds mechanical (like a volume knob turning), it's too deliberate. Think of the emotion driving the volume, not the other way around.",
        levelUp: "Record a lyric line where the dynamic arc sounds emotional and natural, not performed."
      },
      {
        id: "v5e4", time: 4, title: "Breathy vs. Full Tone Toggle", type: "vocal",
        volumeMeter: true,
        what: "Alternate between breathy delivery (Nick Drake, Angus Stone) and full tone (Marley, Vedder) on the same phrase. Two vocal textures, one lyric -- feel how they change the mood.",
        setup: "Standing. Any lyric. Record yourself.",
        steps: [
          { text: "Sing a phrase with breathy tone: lots of air, soft, intimate. Think Nick Drake or DOPE LEMON.", why: "Breathy tone means the vocal folds aren't fully closed. Air leaks through, creating warmth and intimacy." },
          { text: "Same phrase with full tone: no air leak, strong, projected. Think Eddie Vedder or Bob Marley.", why: "Full tone means the folds close completely on each vibration. The sound is focused and powerful." },
          { text: "Alternate: breathy verse, full chorus, breathy verse, full chorus.", why: "This contrast is how singer-songwriters create dynamics without a band. The toggle IS the arrangement." },
          { text: "Record both versions. Listen: which suits the lyric better? The answer might surprise you.", why: "Some lyrics that seem like they should be powerful actually work better whispered, and vice versa." }
        ],
        feel: "Breathy should feel like a secret you're sharing. Full should feel like a declaration. Both should feel intentional, not accidental.",
        wrong: "If your breathy tone has no pitch (just air), engage the folds slightly more. If your full tone feels tight, you're pushing from the throat instead of supporting from the ribs.",
        recorder: true,
        levelUp: "Clean toggle between breathy and full on the same phrase, 4 times, with both sounding musical."
      },
      {
        id: "v5e5", time: 4, title: "Emotional Coloring", type: "vocal",
        recorder: true,
        what: "Same lyric sung 4 ways: happy, sad, angry, peaceful. Your voice communicates emotion through timbre, phrasing, and dynamics -- not just the words. This is the deepest level of vocal expression.",
        setup: "Standing. Record yourself. Pick a neutral lyric.",
        steps: [
          { text: "Pick a neutral lyric: 'The sun went down behind the hill'. Sing it HAPPY -- bright tone, forward placement, slight smile.", why: "Happy singing naturally lifts the soft palate and brightens vowels. Let the emotion shape the sound." },
          { text: "Same lyric, SAD. Darker tone, slower, breathier. Let the ends of phrases trail off.", why: "Sadness pulls the voice lower, darker. The trailing phrase endings communicate resignation." },
          { text: "Same lyric, ANGRY. More chest, sharper consonants, less air. Punchy and direct.", why: "Anger shortens phrases, hardens consonants, and pushes from the chest. Less floaty, more grounded." },
          { text: "Same lyric, PEACEFUL. Medium volume, smooth, even dynamics. Calm and centered.", why: "Peace is steady -- no dramatic swells, no punchy attacks. Like a lake with no waves." }
        ],
        feel: "Each version should sound like a different song, even though the words are identical. The emotion changes everything: tone, timing, dynamics, phrasing.",
        wrong: "If all 4 versions sound the same, you're delivering the words without the emotion. Try feeling the emotion FIRST (remember a happy moment, a sad one), then sing.",
        levelUp: "A listener could identify the emotion of each version without being told. Record and test with someone."
      }
    ]
  },

  // ─── LEVEL 6: Style & Texture ──────────────────────────────────────
  {
    num: 6, name: "Style & Texture", focus: "Falsetto, lo-fi delivery, genre techniques",
    duration: "20 min",
    setup: "Standing. Phone for recording. Reference tracks ready.",
    subtitle: "Finding YOUR Sound",
    description: "Every great singer has a recognizable texture. Angus Stone's lo-fi whisper, Thom Yorke's falsetto breaks, Bob Marley's rhythmic precision, Laura Lee's psychedelic float. This level explores genre-specific vocal textures so you can find the combination that sounds like YOU.",
    artists: "Angus Stone, Thom Yorke, Laura Lee (Khruangbin)",
    unlocks: "Harmony & Layering (Level 7)",
    exercises: [
      {
        id: "v6e1", time: 4, title: "The Falsetto Switch", type: "vocal",
        recorder: true,
        pitchContour: true,
        what: "Chest-to-falsetto mid-phrase. Thom Yorke, Bon Iver, and Jeff Buckley all use this -- the voice breaks from full chest into airy falsetto within a single line, creating emotional contrast.",
        setup: "Standing. Record yourself. Comfortable range around A3-E4.",
        referencePitches: getPitchRange("A3", "E4"),
        steps: [
          { text: "Sing a phrase in chest voice up to around A3-Bb3. Full, committed tone.", why: "You need a solid chest voice runway before the switch. The contrast makes the falsetto meaningful." },
          { text: "At the peak of the phrase, switch to falsetto. Let the voice break -- don't try to smooth it.", why: "The break IS the effect. Thom Yorke doesn't hide it. Bon Iver leans into it. The crack is emotional." },
          { text: "Practice the switch point: sing A3 in chest, then immediately B3 in falsetto. Feel the flip.", why: "The flip happens when the vocal folds suddenly thin. At first it will crack -- that's the pathway opening." },
          { text: "Try it on a lyric: start the line in chest, flip to falsetto for the last 2-3 words.", why: "In context, the falsetto words become the emotional highlight -- they sound vulnerable, exposed." }
        ],
        feel: "The switch should feel like your voice lifts off the ground. Chest is grounded; falsetto is floating. The moment of transition might feel unstable -- that's the expressive sweet spot.",
        wrong: "If you can't get the switch to happen, try yodeling (exaggerated chest-to-head flip). Once the pathway is open, make it more subtle.",
        levelUp: "Clean chest-to-falsetto switch mid-phrase that sounds intentional, not accidental."
      },
      {
        id: "v6e2", time: 4, title: "Lo-Fi Vocal Delivery", type: "vocal",
        recorder: true,
        what: "Angus Stone / DOPE LEMON style: close-mic, low volume, lots of air, lazy articulation. This is the most intimate vocal texture -- it sounds like you're singing directly into someone's ear.",
        setup: "Phone mic close to your mouth (2-3 inches). Record everything. Quiet room essential.",
        steps: [
          { text: "Hold your phone/mic 2-3 inches from your mouth. Sing at talking volume -- no projection.", why: "Close-mic proximity creates warmth through the proximity effect. Low volume = more air in the tone." },
          { text: "Let your consonants get lazy. 'Sitting' becomes 'si-in'. 'Running' becomes 'ruh-in'.", why: "Lo-fi delivery drops consonants and blurs words. It's conversational, not performative." },
          { text: "Add extra air to your tone. Breathy, not supported. Let the ends of phrases trail off.", why: "Angus Stone's voice is 40% air. It creates intimacy and a dreamlike quality." },
          { text: "Record 30 seconds. Listen back. Does it sound intimate, or just quiet? There's a difference.", why: "Intimate has warmth and presence. Just quiet is distant and thin. The mic distance is the difference." }
        ],
        feel: "Like telling a bedtime story. No performance energy, no projection. Just warmth, closeness, and a half-asleep delivery.",
        wrong: "If it sounds thin or distant, move the mic closer. If it sounds like you're whispering without pitch, engage the vocal folds slightly more. Lo-fi is breathy, not unpitched.",
        levelUp: "30-second recording that sounds like a DOPE LEMON vocal take -- warm, intimate, dreamy."
      },
      {
        id: "v6e3", time: 4, title: "Reggae Vocal Texture", type: "vocal",
        what: "Bob Marley / Bradley Nowell style: rhythmic precision, slight nasality, warm tone locked to the riddim. Reggae vocals are rhythmic instruments that happen to carry melody.",
        setup: "Reggae One Drop 85 BPM backing track. Standing.",
        steps: [
          { text: "Sing short phrases locked to the offbeat. Every syllable lands on &'s, not beats.", why: "Reggae vocals are rhythmically precise. The voice is part of the rhythm section." },
          { text: "Add slight nasality: think of the sound living in your nose/mask area, not your chest.", why: "Marley's tone has a nasal edge that cuts through the bass-heavy mix. It's not sinus-y, it's focused." },
          { text: "Keep the tone warm -- chest voice dominant, but with that nasal focus.", why: "The combination of chest warmth and nasal focus is the reggae vocal signature." },
          { text: "Practice the 'call' style: short melodic phrase, then let the band play. Call and response with the riddim.", why: "Reggae vocals work in conversation with the rhythm, not over it." }
        ],
        feel: "Your voice should feel locked into the groove like a puzzle piece. Not floating above it, not buried in it -- interlocked with it.",
        wrong: "If you sound like you're singing karaoke over a reggae track, you're not rhythmically integrated. Simplify your melody and focus on where your syllables land relative to the offbeat.",
        metronome: 85,
        levelUp: "1 minute of reggae-style vocal delivery that sounds rhythmically locked to the riddim."
      },
      {
        id: "v6e4", time: 4, title: "Surf-Psych Vocal Float", type: "vocal",
        what: "Allah-Las / Laura Lee (Khruangbin) style: voice as texture, minimal vibrato, sits INSIDE the guitar mix. The vocal doesn't lead -- it blends with the instruments like another color in the palette.",
        setup: "Psych Rock 120 BPM backing track or Surf Rock 120 BPM. Guitar droning Am.",
        steps: [
          { text: "Play or loop a droning Am pattern. Sing a simple melody with minimal dynamics -- stay in one volume range.", why: "Psych-surf vocals don't do dramatic swells. They maintain a steady, textural presence." },
          { text: "Minimize vibrato. Sing with a straight, steady tone -- no wobble, no pulse.", why: "Vibrato calls attention to the voice. Straight tone lets the voice blend into the instrumental texture." },
          { text: "Sit your voice BEHIND the guitar in the mix (sing quieter than you play). Voice is accompaniment.", why: "In psych-surf, the guitar is the star. Voice is atmospheric, not dominant." },
          { text: "Try singing with reverb (cup your hands around your mouth) or record in a bathroom.", why: "Natural reverb is part of the psych-surf vocal sound. The voice should sound like it's coming from a distance." }
        ],
        feel: "Like being inside the music rather than on top of it. Your voice is one color in the painting, not the subject.",
        wrong: "If your voice sticks out over the instruments, you're singing too loud or with too much vibrato. Pull back until you blend.",
        metronome: 120,
        recorder: true,
        levelUp: "1 minute of vocal delivery that blends with the guitar rather than sitting on top of it."
      },
      {
        id: "v6e5", time: 4, title: "Finding Your Mix", type: "vocal",
        recorder: true,
        what: "Record the same verse in 4 different styles from this level. Listen back. Which sounds most like YOU? This is the discovery exercise -- finding your natural voice among the techniques you've learned.",
        setup: "Phone recording. Pick one verse from a song you know.",
        steps: [
          { text: "Record the verse in falsetto-break style (v6e1). Label it.", why: "Each recording captures a different version of your voice. You need all four to compare." },
          { text: "Record the verse in lo-fi style (v6e2). Label it.", why: "The contrast between styles will be obvious on playback." },
          { text: "Record the verse in reggae style (v6e3). Label it.", why: "Some styles will feel natural; others will feel forced. That's important data." },
          { text: "Record the verse in surf-psych style (v6e4). Label it. Now listen to all four back-to-back.", why: "Your authentic voice is probably a blend of 2-3 of these. Notice which elements feel like home." }
        ],
        feel: "One of these recordings will make you go 'that's me.' It might not be the one you expected. Trust the feeling.",
        wrong: "If all four sound the same, you're not committing enough to each style. Exaggerate the differences. If none sound like 'you', try combining elements from your two favorites.",
        levelUp: "Can identify your preferred vocal style and describe it in your own terms."
      }
    ]
  },

  // ─── LEVEL 7: Harmony & Layering ───────────────────────────────────
  {
    num: 7, name: "Harmony & Layering", focus: "Self-harmonizing, 3rds/5ths, looper vocal stacking",
    duration: "25 min",
    setup: "Guitar. RC-505mkII optional but ideal. Headphones.",
    subtitle: "Singing With Yourself",
    description: "Elliott Smith sang 3-part harmonies with himself. Bob Marley's backing vocals were as iconic as his leads. Bon Iver builds entire songs from stacked vocal layers. This level teaches you to harmonize with yourself -- the essential skill for looper-based singer-songwriter performance.",
    artists: "Bon Iver, Elliott Smith, Bob Marley",
    unlocks: "Singing While Playing (Level 8)",
    exercises: [
      {
        id: "v7e1", time: 5, title: "Singing in 3rds", type: "vocal",
        what: "The most common harmony interval. Sing a melody, then sing the same melody a 3rd above. Elliott Smith and Bob Marley both relied on 3rd harmonies as their primary vocal layering tool.",
        setup: "Guitar: C major scale reference. No backing track.",
        referencePitches: getPitchRange("C3", "E4"),
        steps: [
          { text: "Sing a simple melody: C-D-E-F-G (ascending major scale fragment).", why: "Start with the simplest possible melody. You need to know it cold before adding harmony." },
          { text: "Now sing a 3rd above each note: E-F-G-A-B. Same rhythm, 3 scale steps higher.", why: "A 3rd above follows the same contour but higher. Sometimes it's a major 3rd, sometimes minor -- the key determines which." },
          { text: "Record the melody on your phone. Play it back and sing the harmony live over it.", why: "Hearing your melody while singing the harmony is the core skill. This simulates what a looper does." },
          { text: "Try it on a real melody from ILTWYW or Sol Del Sur. Find the 3rd above the vocal line.", why: "Real melodies have more complex intervals. The 3rd harmony won't always be obvious." }
        ],
        feel: "When the 3rd harmony locks in, you'll hear a sweetness -- a fullness that neither voice alone has. It should sound like one voice with two octaves, not two separate voices.",
        wrong: "If the harmony sounds dissonant on certain notes, you might be singing a strict 3rd (always 4 half steps) instead of a diatonic 3rd (following the key). Stay in the key.",
        recorder: true,
        levelUp: "Sing a harmony a 3rd above a playback of your own melody through an entire verse."
      },
      {
        id: "v7e2", time: 5, title: "Singing in 5ths", type: "vocal",
        what: "Power harmony. Open, resonant, and less common than 3rds but iconic when used. 5ths create a hollow, powerful sound that works especially well in psych and folk music.",
        setup: "Guitar: Am chord reference.",
        referencePitches: getPitchRange("A2", "E4"),
        steps: [
          { text: "Sing A3. Now sing E4 (a 5th above). Feel how open and powerful the interval sounds.", why: "The 5th is the most consonant interval after the octave. It sounds ancient and strong." },
          { text: "Sing a simple Am melody. Record it. Play back and try singing a 5th above.", why: "5th harmonies follow the same contour but create a very different feel than 3rds." },
          { text: "Compare: play back your melody and sing 3rds, then 5ths. Notice the different emotional quality.", why: "3rds are sweet and close. 5ths are open and powerful. Knowing both gives you options." },
          { text: "Try alternating: 3rds on the verse, 5ths on the chorus.", why: "This is a common arrangement technique. The 5ths give the chorus more power and width." }
        ],
        feel: "5ths should feel like standing at the edge of a canyon. Big, open, resonant. Less intimate than 3rds, more epic.",
        wrong: "If 5ths sound too hollow or empty, they might not suit the song. 5ths work best on sustained notes and simple melodies. Complex melodies usually want 3rds.",
        recorder: true,
        levelUp: "Sing a 5th harmony over your recorded melody for a full verse, staying in key."
      },
      {
        id: "v7e3", time: 5, title: "Self-Harmony: Record & Stack", type: "vocal",
        recorder: true,
        what: "Record a melody on your phone, play it back, and sing harmony live over it. This is the analog version of looper vocal stacking -- training the skill before involving technology.",
        setup: "Phone for recording and playback. Headphones recommended.",
        steps: [
          { text: "Record yourself singing a verse melody. Simple, clean, in tune.", why: "This is your foundation layer. It needs to be consistent because you'll be harmonizing over it." },
          { text: "Play it back through a speaker or headphone in one ear. Sing a 3rd harmony over it.", why: "One ear on playback, one ear on your live voice. This is how looper performance works." },
          { text: "If the 3rd works, try recording THAT and playing both back while singing a 5th.", why: "Three voices: melody, 3rd, 5th. This is the Bon Iver / Elliott Smith sound." },
          { text: "Experiment with dynamics: melody loud, harmony quiet. Then try harmony louder. Which sounds better?", why: "Harmony balance changes the feel dramatically. Usually the melody leads, but not always." }
        ],
        feel: "When all the voices align, it should feel like a choir in your head. The harmonies should feel like they were always meant to be there -- like uncovering something hidden in the melody.",
        wrong: "If the harmony drifts out of tune, focus on the problem notes. Often it's one or two intervals that need adjustment, not the whole line.",
        levelUp: "Clean 2-voice self-harmony (melody + 3rd) through a complete verse."
      },
      {
        id: "v7e4", time: 5, title: "Looper Vocal Stack: Two Voices", type: "vocal",
        what: "RC-505: melody on Track 1, harmony on Track 2. This is the technology-assisted version of self-harmony -- building the looper skill for live performance.",
        setup: "RC-505mkII. Mic connected. Quantize: MEASURE. 80 BPM.",
        steps: [
          { text: "Record 4 bars of your melody on Track 1. Let it loop.", why: "The melody loop is your foundation. It needs to be clean and in time." },
          { text: "While Track 1 plays, record your 3rd harmony on Track 2.", why: "Singing harmony while hearing your own melody played back is the core looper vocal skill." },
          { text: "Balance the two tracks with faders. Melody slightly louder than harmony.", why: "Standard vocal mix: lead vocal forward, harmony supporting. Fader control is part of the performance." },
          { text: "Listen to both together for 4-8 cycles. In tune? In time? If not, clear Track 2 and try again.", why: "Looper performance requires quick judgment: is this take good enough? If not, redo it fast." }
        ],
        feel: "Hearing two versions of your voice harmonizing in real time is powerful. It should feel like you've doubled yourself.",
        wrong: "If the harmony track drifts out of time, your loop timing may be off. Focus on pressing record on beat 1 (Level 1 looper skills apply here).",
        metronome: 80,
        levelUp: "Clean 2-voice looper stack that plays back seamlessly for 8+ cycles."
      },
      {
        id: "v7e5", time: 5, title: "Looper Vocal Stack: Three Voices", type: "vocal",
        what: "Bass (root) + melody + high harmony. The Bon Iver live setup. Three vocal layers create a full arrangement from your voice alone.",
        setup: "RC-505mkII. 3 tracks available. 80 BPM. Headphones essential.",
        steps: [
          { text: "Track 1: Record a bass vocal -- root notes of the progression in low chest voice.", why: "The bass layer anchors everything. It's the foundation from Level 4's 'Sing the Bass Line' exercise." },
          { text: "Track 2: Record your melody over the bass loop.", why: "Melody over bass is the minimum viable arrangement. Listen: does it already sound like a song?" },
          { text: "Track 3: Record a high harmony (3rd or 5th above the melody).", why: "The third layer adds richness and the 'choir' quality. This is the Bon Iver sound." },
          { text: "Balance all three with faders: bass at 60%, melody at 80%, harmony at 50%. Adjust to taste.", why: "Three voices need careful mixing. The melody should lead, bass should be felt more than heard." }
        ],
        feel: "Three voices from one person should sound like a small choir or a band. The fullness is surprising -- your voice fills the entire harmonic space.",
        wrong: "If it sounds like a mess, one of the layers is out of tune or out of time. Mute tracks one at a time to find the problem. Fix that one layer.",
        metronome: 80,
        levelUp: "Clean 3-voice looper stack: bass + melody + harmony, balanced and in tune."
      }
    ]
  },

  // ─── LEVEL 8: Singing While Playing ────────────────────────────────
  {
    num: 8, name: "Singing While Playing", focus: "Guitar + voice independence, autopilot coordination",
    duration: "25 min",
    setup: "Guitar in hand. Simple progressions only.",
    subtitle: "The Coordination Challenge",
    description: "Singing while playing guitar is a coordination problem, not a talent problem. The guitar has to be on complete autopilot before the voice can enter. Jack Johnson, Nick Drake, and Eddie Vedder all built this skill through the same method: simplify the guitar until it's invisible, then add voice.",
    artists: "Jack Johnson, Nick Drake, Eddie Vedder",
    unlocks: "Freestyle & Improv (Level 9)",
    exercises: [
      {
        id: "v8e1", time: 5, title: "Simple Strum + Hum", type: "vocal",
        what: "Am-C-G-D autopilot strum + hummed melody. The strum MUST NOT change when the voice enters. If the guitar hiccups when you start humming, the guitar isn't automatic enough yet.",
        setup: "Guitar: Am-C-G-D. Simple downstrum pattern at 80 BPM.",
        steps: [
          { text: "Strum Am-C-G-D for 2 minutes. Don't think about it. Get to autopilot.", why: "The guitar needs to be unconscious before you add voice. 2 minutes of the same pattern builds the muscle memory." },
          { text: "While strumming, start humming a simple melody. One long note per chord.", why: "Humming is easier than words. One note per chord is the simplest possible vocal task." },
          { text: "Watch your strumming hand. Does it change when you start humming? Freeze? Slow down?", why: "The strum changing when voice enters is the #1 sign that guitar isn't automatic yet. Fix this first." },
          { text: "If the strum changes: stop singing, strum 1 more minute, try again. Repeat until the strum is unaffected.", why: "You can't cheat this step. The guitar has to be completely independent from the voice." }
        ],
        feel: "When it works, it should feel like the guitar is playing itself and your voice is riding on top. Two separate systems, both running automatically.",
        wrong: "If you keep losing the strum when you hum, your guitar pattern is too complex. Simplify to just downstrokes on beats 1 and 3.",
        metronome: 80,
        levelUp: "Strum + hum for 2 minutes without the strumming hand changing at all."
      },
      {
        id: "v8e2", time: 5, title: "Fingerpick + Sing Roots", type: "vocal",
        what: "Fingerpick Am pattern + sing only the root of each chord. Minimal vocal demand on top of a more complex guitar pattern.",
        setup: "Guitar: Am fingerpicking pattern (alternating thumb) at 80 BPM.",
        steps: [
          { text: "Fingerpick Am for 1 minute. Get it locked. Alternating thumb on A string, pointer on B string.", why: "Fingerpicking is harder to autopilot than strumming. It needs more reps before adding voice." },
          { text: "While fingerpicking Am, sing just the root: 'A'. One long note. Hold it through the whole pattern.", why: "One sustained note is the lowest cognitive load for your voice. The guitar does the work." },
          { text: "When the chord changes to C, sing 'C'. G -> sing 'G'. D -> sing 'D'. Just root notes.", why: "Tracking root notes while fingerpicking trains the basic coordination circuit." },
          { text: "If the fingerpick pattern breaks, simplify: just thumb on the bass string + sing. Build back up.", why: "Always simplify the guitar when adding voice. Never simplify the voice." }
        ],
        feel: "The fingerpick should feel like a background texture -- your hands know what to do. The voice floats on top, easy and unstrained.",
        wrong: "If your thumb loses the pattern when you sing, the pattern isn't automatic yet. More reps without voice first.",
        metronome: 80,
        levelUp: "Clean fingerpick + root note singing through Am-C-G-D, 4 cycles."
      },
      {
        id: "v8e3", time: 5, title: "Strum + Full Phrase", type: "vocal",
        what: "Simplify guitar until 100% automatic, THEN add a full vocal phrase. The key insight: you don't need a fancy strum to sound great. Simple guitar + good vocals always beats complex guitar + bad vocals.",
        setup: "Guitar: simplest possible strum on Am-C-G-D. 85 BPM.",
        steps: [
          { text: "Reduce your strum to the absolute minimum: one downstroke per beat. Four strums per bar.", why: "The simpler the guitar, the more brain space for singing. Start simpler than you think you need." },
          { text: "Add a full lyric phrase from ILTWYW or Sol Del Sur. Sing at conversational volume.", why: "Real words are harder than humming because your brain processes language and music simultaneously." },
          { text: "If the strum destabilizes, simplify further: one strum on beat 1 only. Rebuild.", why: "There's always a simpler guitar pattern. Find the threshold where you can add voice." },
          { text: "Once stable, try one notch more complex: add an upstroke on the & of 2.", why: "Build complexity gradually. Each addition should feel easy before the next one." }
        ],
        feel: "It should feel like having a conversation while walking -- two automatic processes running in parallel, neither interfering with the other.",
        wrong: "If you keep simplifying and still can't maintain both, you need more hours on the guitar pattern alone. There's no shortcut for this.",
        metronome: 85,
        levelUp: "Full verse of a song with strum + vocals, no guitar hiccups."
      },
      {
        id: "v8e4", time: 5, title: "The Jack Johnson Method", type: "vocal",
        what: "Percussive muted strum + conversational singing. Guitar = rhythm, voice floats. This is the singer-songwriter sweet spot: the guitar provides groove while the voice tells the story.",
        setup: "Guitar: muted percussive strum at 90 BPM. Am-C-G-D.",
        steps: [
          { text: "Muted strum: palm mute the strings and strum a 16th-note pattern. Chk-chk-chk-chk.", why: "The muted strum is pure rhythm -- no notes to think about. It becomes a drum kit in your hand." },
          { text: "Unmute on beat 1 of each bar to let the chord ring briefly, then mute again.", why: "The brief chord splash gives harmonic context. The rest is percussion." },
          { text: "Start singing conversationally over the groove. Don't perform -- just talk-sing.", why: "Jack Johnson's secret: his vocal delivery is closer to talking than singing. It's effortless because it IS effortless." },
          { text: "The groove should be so automatic that you could have a conversation while strumming.", why: "If you can talk while strumming (not singing, literally talking), you're at autopilot." }
        ],
        feel: "Like Jack Johnson on a beach. The guitar provides a bed of rhythm, and your voice just... exists on top of it. No strain, no effort.",
        wrong: "If the muted strum feels hard to maintain, simplify to quarter-note mutes. The percussive pattern needs to be second nature.",
        metronome: 90,
        levelUp: "1 minute of percussive strum + conversational singing that sounds relaxed and groovy."
      },
      {
        id: "v8e5", time: 5, title: "Vocal Entry Points", type: "vocal",
        what: "Start your vocal phrase at different points in the strum cycle. Beat 1 vs beat 3 vs & of 2. Where you enter changes the entire feel of the song.",
        setup: "Guitar: steady Am-C-G-D strum at 85 BPM. Vocals ready.",
        steps: [
          { text: "Strum 4 bars. Start singing on beat 1 of bar 5. Notice: this feels natural, expected.", why: "Beat 1 entry is the default. It's where most people start singing without thinking." },
          { text: "Same pattern. Now start singing on beat 3 instead. Notice: this feels more laid-back.", why: "Beat 3 entry creates anticipation. The listener hears 2 beats of guitar before the voice arrives." },
          { text: "Now try entering on the & of 2. This creates a syncopated, surprising entry.", why: "Offbeat vocal entry is a reggae/funk technique. It makes the voice feel like it's sliding in sideways." },
          { text: "Try all three entry points on the same verse. Record each. Which feels most natural for the song?", why: "Different songs want different entry points. Training all three gives you the choice." }
        ],
        feel: "Beat 1 entry feels strong and declarative. Beat 3 feels relaxed. & of 2 feels groovy and unexpected. Each creates a different emotional first impression.",
        wrong: "If all entries sound the same, you're probably defaulting to beat 1 regardless of where you think you're entering. Record and listen -- the recording doesn't lie.",
        metronome: 85,
        recorder: true,
        levelUp: "Can intentionally start a vocal phrase on beat 1, beat 3, or & of 2, with each sounding natural."
      }
    ]
  },

  // ─── LEVEL 9: Freestyle & Improv ───────────────────────────────────
  {
    num: 9, name: "Freestyle & Improv", focus: "Melodic improv, scat, lyric freestyle",
    duration: "20 min",
    setup: "Backing track from collection. Voice-only first.",
    subtitle: "Making It Up",
    description: "Bradley Nowell built much of Sublime's catalogue through freestyle improvisation. Thom Yorke improvises vocal parts in the studio. The ability to make up melodies and lyrics in real time is the ultimate singer-songwriter skill -- it's where composition and performance merge.",
    artists: "Bradley Nowell, Thom Yorke",
    unlocks: "Performance & Integration (Level 10)",
    exercises: [
      {
        id: "v9e1", time: 5, title: "Scat Improv: 3 Levels", type: "vocal",
        what: "Over a groove beat, improvise scat syllables following chord tones. Start simple, increase rhythmic complexity. This is the closest thing to actual improvised singing.",
        setup: "No guitar. Groove Beat 90 BPM or any backing track.",
        referencePitches: getPitchRange("A2", "C4"),
        steps: [
          { text: "Level 1: One syllable per beat. 'doo . . doo . . doo . . doo'. On chord tones (Am: A, C, E).", why: "On-beat scat with chord tones is the simplest form of improvisation. Pitch + rhythm + syllable." },
          { text: "Level 2: Move syllables to &'s. '. doo . . doo . . doo . . doo'. Syncopated.", why: "Offbeat scat is harder -- your voice has to live between the clicks while tracking chord tones." },
          { text: "Level 3: 16th note bursts. 'doo-ba-dee . doo-ba-dee . doo'. Multiple syllables per beat.", why: "16th note scat requires fast syllable switching while maintaining pitch. This is advanced improv." },
          { text: "Record 2 minutes. Follow Am -> C -> G -> D chord tones at each level.", why: "Recording lets you hear if the syncopations are INTENTIONAL or ACCIDENTAL. Intentional sounds musical." }
        ],
        feel: "Level 1 should feel like controlled placement. Level 2 is the lyric placement exercise with scat. Level 3 is where it gets creative -- combining 16th subdivision with real-time pitch choices.",
        wrong: "If it sounds random (no connection to the chords), simplify. Go back to Level 1 and just sing root notes of each chord. Build back up.",
        sarah: "The diagnostic: are the syncopations INTENTIONAL or ACCIDENTAL? You can hear the difference -- intentional sounds musical, accidental sounds lost.",
        metronome: 90,
        recorder: true,
        levelUp: "Musical-sounding Level 3 scat over Am-C-G-D that follows chord tones."
      },
      {
        id: "v9e2", time: 4, title: "Melodic Freestyle Over Changes", type: "vocal",
        what: "Improvise melodies (no words) over Am-C-G-D. Start with chord tones, add passing tones, then go free. Your ear guides you; your voice follows.",
        setup: "Backing track at 85-90 BPM. No guitar -- just voice.",
        steps: [
          { text: "Round 1: Sing only chord tones (root, 3rd, 5th of each chord). 'Ooh' or 'ah'.", why: "Chord tones are safe -- they always sound consonant. This is your harmonic safety net." },
          { text: "Round 2: Add passing tones between chord tones. Step between them instead of jumping.", why: "Passing tones create melodic flow. They connect chord tones like bridges." },
          { text: "Round 3: Go free. Let your ear guide you. Some notes will clash -- that's OK.", why: "Free improvisation is where you discover your natural melodic instincts." },
          { text: "Record Round 3. Listen back: which moments sounded best? Those are your natural melodic tendencies.", why: "Your best improvised moments reveal your authentic melodic voice." }
        ],
        feel: "Round 1 feels safe. Round 2 feels like you're exploring familiar territory. Round 3 should feel like flying -- exhilarating and slightly scary.",
        wrong: "If Round 3 sounds like noise, you jumped to 'free' too quickly. Spend more time in Round 2. The passing tones prepare your ear for freedom.",
        metronome: 90,
        recorder: true,
        levelUp: "2 minutes of free melodic improv that follows the chord changes and sounds musical."
      },
      {
        id: "v9e3", time: 4, title: "Lyric Freestyle", type: "vocal",
        what: "Improvise words over a groove. Rhythm and melody take priority over meaning. The freestyle approach Bradley Nowell exemplified: let the mouth make sounds that happen to form words.",
        setup: "Backing track at 85 BPM. Reggae or soul groove.",
        steps: [
          { text: "Start with nonsense syllables that sound like words. 'Sha-na-na, walking down the...'", why: "Don't try to write poetry in real time. Let sounds form words naturally." },
          { text: "Let real words appear. Don't edit. 'Walking down the road and the sky is blue and I don't know why but...'", why: "Stream of consciousness. The rhythm carries you. Some lines will be gold; most will be filler." },
          { text: "Focus on rhythm first, melody second, meaning third. If the rhythm is tight, the words don't need to make sense.", why: "Bradley Nowell, early Bob Marley, and hip-hop freestylers all prioritize rhythmic flow over lyrical content." },
          { text: "Record 2 minutes. Listen back. Circle any phrases that sound like real lyrics.", why: "Freestyle is a song-writing tool. The gems appear in the stream -- you just have to catch them." }
        ],
        feel: "Like talking in your sleep but with a beat. Don't think, don't edit, don't judge. Just let sounds come out in rhythm.",
        wrong: "If you keep stopping to think of the 'right' word, you're editing in real time. Say the wrong word -- it doesn't matter. Flow is everything.",
        metronome: 85,
        recorder: true,
        levelUp: "2 minutes of lyric freestyle with consistent rhythm that contains at least 2-3 usable phrases."
      },
      {
        id: "v9e4", time: 4, title: "Genre Switching", type: "vocal",
        what: "Same progression, 4 vocal styles: reggae, surf-psych, soul croon, punk bark. Switching styles mid-improvisation trains vocal flexibility and keeps your delivery from getting stale.",
        setup: "Backing track at 90 BPM. Am-C-G-D or backing track.",
        steps: [
          { text: "4 bars reggae: offbeat phrasing, slight nasal tone, call and space.", why: "Start with the style you've been training. Reggae is rhythmically precise and spacious." },
          { text: "4 bars surf-psych: straight tone, minimal vibrato, voice as texture.", why: "The switch from rhythmic (reggae) to textural (psych) is a big gear change. Feel the difference." },
          { text: "4 bars soul croon: full voice, vibrato, emotional. Think Khruangbin's vocal moments.", why: "Soul is the most conventionally 'singer-y' style. It requires the most vocal technique." },
          { text: "4 bars punk bark: short, aggressive, rhythmic. More speaking than singing.", why: "Punk is the opposite of soul -- minimal technique, maximum energy. The contrast exercises your range of delivery." }
        ],
        feel: "Each style switch should feel like putting on a different costume. Same you underneath, different presentation on top.",
        wrong: "If all four styles sound the same, you're not committing to each one. Exaggerate the differences. Caricature first, refine later.",
        metronome: 90,
        recorder: true,
        levelUp: "Clean style switch every 4 bars, with each style recognizably different."
      },
      {
        id: "v9e5", time: 3, title: "Loop Improv: Voice Only", type: "vocal",
        what: "RC-505: record a vocal loop, then improvise over it live. No instruments. Your voice provides both the foundation and the solo. This is the purest form of vocal looper performance.",
        setup: "RC-505mkII. Mic only. 80 BPM. No guitar.",
        steps: [
          { text: "Record a 4-bar vocal loop on Track 1: a simple melodic phrase or rhythmic pattern.", why: "This is your backing track, made from your voice. It needs to be clean and repeatable." },
          { text: "While it loops, improvise freely over it. Different melody, scat, harmony -- anything.", why: "Improvising over your own voice is the intersection of every skill from this curriculum." },
          { text: "Record a second loop on Track 2 if something good emerges. Now you have two layers + live.", why: "Building layers from improvisation is how Bon Iver and Imogen Heap perform." },
          { text: "Practice clearing Track 2 and re-recording. The improvisation is live, fluid, always changing.", why: "In performance, layers come and go. The ability to clear and rebuild is essential." }
        ],
        feel: "Like having a musical conversation with yourself. Your loop says something, and you respond. Then maybe you loop the response and respond to that.",
        wrong: "If the loop is too complex, there's no space for improvisation. Keep the loop simple -- it's the canvas, not the painting.",
        metronome: 80,
        levelUp: "Build a 2-layer vocal loop arrangement through improvisation, with a live third voice on top."
      }
    ]
  },

  // ─── LEVEL 10: Performance & Integration ───────────────────────────
  {
    num: 10, name: "Performance & Integration", focus: "Full songs, mic technique, set building",
    duration: "30 min",
    setup: "Full setup: guitar, looper, mic, backing tracks.",
    subtitle: "Putting It All Together",
    description: "This is where every skill from every level converges. Full songs start to finish, looper arrangements, mic technique, and set building. You're not practicing anymore -- you're performing.",
    artists: "All of the above combined",
    unlocks: "The stage",
    exercises: [
      {
        id: "v10e1", time: 8, title: "Full Song: Voice + Guitar", type: "vocal",
        what: "Sol Del Sur or ILTWYW start to finish. No stopping for mistakes. The ability to recover from errors in real time is the difference between a practice run and a performance.",
        setup: "Guitar in hand. Song chart if needed. Record yourself.",
        steps: [
          { text: "Pick your stronger song. Play and sing it from start to finish. Timer running.", why: "Performing without stopping forces you to recover from mistakes in real time. This is the performance skill." },
          { text: "If you make a mistake: DO NOT STOP. Skip ahead, simplify, hum the part -- anything but stopping.", why: "Stopping is the #1 amateur habit. Professional performers mess up constantly -- they just keep going." },
          { text: "Record the whole thing. Watch/listen back without pausing.", why: "You need to experience your performance as the audience would: continuous, imperfect, real." },
          { text: "Note ONE thing to improve (not 10). Work on that one thing for 2 minutes. Then do a second full run.", why: "Focused improvement is more effective than trying to fix everything. One thing per session." }
        ],
        feel: "This should feel slightly scary -- like it matters. That performance energy is what makes the difference between practice and playing for real.",
        wrong: "If you keep stopping, you're still in practice mode. Set a rule: no matter what happens, you play to the end. The song is 3-4 minutes. You can do anything for 4 minutes.",
        recorder: true,
        levelUp: "Complete full song with no stops. Mistakes are fine. Recovery is the skill."
      },
      {
        id: "v10e2", time: 8, title: "Full Song: Voice + Guitar + Looper", type: "vocal",
        what: "Same song with looper layers. Guitar loop -> vocal melody -> vocal harmony. The full singer-songwriter looper arrangement.",
        setup: "RC-505mkII. Guitar. Mic. 80-90 BPM. Headphones.",
        steps: [
          { text: "Record 4 bars of guitar on Track 1. Let it loop. This is your band.", why: "The guitar loop replaces a full band. It needs to be clean, in time, and representative of the song." },
          { text: "Sing the verse melody live over the loop. Don't record the voice yet -- just perform.", why: "Live vocal over loop is the simplest arrangement. Master this before adding layers." },
          { text: "For the chorus: record a vocal harmony on Track 2. Now you have guitar + harmony loop + live voice.", why: "The harmony layer adds fullness to the chorus. This is the dynamic shift that makes the arrangement work." },
          { text: "At the end: fade Track 2 out, then Track 1. Sing the last line a cappella.", why: "The a cappella ending is dramatic and intimate. It's a classic looper performance move." }
        ],
        feel: "Like conducting an orchestra that IS you. Each layer adds something, and you're in control of all of it.",
        wrong: "If it sounds cluttered, use fewer layers. Two tracks (guitar + live voice) is enough for a complete performance. Don't add layers for the sake of it.",
        metronome: 85,
        levelUp: "Complete looper arrangement of a full song that sounds like a deliberate, planned performance."
      },
      {
        id: "v10e3", time: 5, title: "Mic Technique Basics", type: "vocal",
        recorder: true,
        what: "Distance for dynamics, off-axis for plosives, proximity effect for warmth. These three mic techniques transform your vocal sound from amateur to professional.",
        setup: "Mic or phone. Record everything to hear the differences.",
        steps: [
          { text: "Distance for dynamics: sing quiet at 2 inches, loud at 6 inches. The volume evens out.", why: "Moving AWAY from the mic when you get loud is how pros maintain even levels. The mic compensates." },
          { text: "Off-axis for plosives: turn the mic slightly off-center for 'P' and 'B' sounds. No more pops.", why: "Plosives blast air directly at the mic diaphragm. Angling prevents the pop without reducing volume." },
          { text: "Proximity effect: sing close (1-2 inches) for warm, bassy tone. Pull back for clarity.", why: "Cardioid mics boost bass at close range. This is the 'radio voice' effect. Use it intentionally." },
          { text: "Practice all three: start close (warm intro), pull back for chorus (clarity), angle for plosives.", why: "In a live looper set, you're your own sound engineer. Mic technique is part of the performance." }
        ],
        feel: "Like discovering a new instrument. The mic responds to your position as much as your voice. Small movements create big changes.",
        wrong: "If your recordings have inconsistent volume, you're probably not managing distance. If you hear pops on P's and B's, angle the mic more.",
        levelUp: "Record a verse + chorus where the mic technique is consistent and the volume is even throughout."
      },
      {
        id: "v10e4", time: 5, title: "Set Building", type: "vocal",
        what: "Plan a 3-song mini-set with transitions. Start chill, build energy, end high. This is how every great live performer structures their show.",
        setup: "Guitar. Song list. Timer.",
        steps: [
          { text: "Pick 3 songs you can perform (even imperfectly). Order them: chill opener, energy builder, strong closer.", why: "Set flow matters more than individual song quality. The arc from chill to high takes the audience on a journey." },
          { text: "Plan transitions: how do you get from song 1 to song 2? A brief instrumental passage? A key change? Just talking?", why: "Dead air between songs kills momentum. Even 5 seconds of intentional transition keeps the energy flowing." },
          { text: "Run the full 3-song set without stopping. Time it. Should be 10-15 minutes total.", why: "A mini-set is a complete performance. Running it builds the performance endurance and flow management." },
          { text: "Record the set. Watch back. Focus on the transitions and the overall energy arc.", why: "The transitions and energy flow are what separate a set from three random songs." }
        ],
        feel: "Like a movie with three acts. The opener sets the mood, the middle builds tension, the closer delivers the payoff.",
        wrong: "If all three songs have the same energy level, rethink the order. Contrast is what creates the journey. If transitions feel awkward, practice just the transitions.",
        recorder: true,
        levelUp: "Run a full 3-song mini-set that feels like a cohesive performance, not three separate songs."
      },
      {
        id: "v10e5", time: 4, title: "The 30-Second Rule", type: "vocal",
        recorder: true,
        what: "Record 30 seconds of performance, watch/listen back immediately, note one thing to improve. Repeat. This is the fastest feedback loop for vocal improvement.",
        setup: "Phone recording. Any song or improvisation.",
        steps: [
          { text: "Record exactly 30 seconds of your best performance: singing, playing, everything.", why: "30 seconds is long enough to hear your real performance, short enough to iterate quickly." },
          { text: "Listen back immediately. No delay -- the memory of what you felt vs what you hear is the insight.", why: "The gap between how it felt and how it sounded is where improvement lives. Close that gap." },
          { text: "Identify ONE specific thing to improve. Not 'be better' -- specific: 'enter on beat 3 instead of beat 1', 'less breathy on the chorus'.", why: "Specific feedback drives specific improvement. Vague feedback drives frustration." },
          { text: "Record another 30 seconds focusing on that one thing. Listen back. Better? Do it again.", why: "This rapid iteration cycle is how athletes train. Record, review, adjust, repeat." }
        ],
        feel: "Like a photographer checking the screen after each shot. Quick review, quick adjustment, quick reshoot. The improvement compounds fast.",
        wrong: "If you're recording for minutes at a time, you lose the specificity. Keep it to 30 seconds. If you're noting 5 things to fix, pick ONE. One per cycle.",
        levelUp: "Can identify and measurably improve one specific vocal element within 3 cycles of 30-second recording."
      }
    ]
  }
];
