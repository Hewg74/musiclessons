import { getPitchRange } from "../appData.js";

export const level2 = {
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
      recorder: true,
      levelUp: "Smooth descent through the break zone with no audible crack on 3 consecutive rounds."
    },
    {
      id: "v2e1b", time: 6, title: "Passaggio Slides", type: "vocal",
      pitchContour: true,
      what: "Gentle pitch slides (glissando) across the break zone (F3-B3). The 'ooh' vowel keeps the larynx relaxed, letting you slide up and down slowly through the break instead of jumping across it.",
      setup: "Standing. Pitch Detector on. Relaxed jaw, no guitar.",
      referencePitches: getPitchRange("E3", "C4"),
      steps: [
        { text: "Start on F3 with a relaxed 'ooh'. Slide slowly up to B3 over 3-4 seconds. Don't jump -- glide continuously.", why: "A slow glide forces the vocal folds to make the register transition gradually instead of flipping. The 'ooh' vowel naturally lowers the larynx, reducing tension." },
        { text: "Slide back down from B3 to F3 on the same 'ooh'. Listen for the spot where the tone changes quality.", why: "The downward slide reveals the break from the other direction. Most singers find the transition smoother going down than up." },
        { text: "Repeat 4 times, making each slide smoother. The goal: no audible 'bump' or crack in the middle.", why: "Each pass trains the muscles to negotiate the transition more gradually. The crack gets smaller with repetition." },
        { text: "Now try the slide on 'ee' -- a harder vowel for the break. Notice how the transition feels different.", why: "'Ee' narrows the vocal tract and can expose the break more. If you can slide smoothly on 'ee', 'ooh' will feel effortless." }
      ],
      feel: "The slide should feel like a gentle elevator ride, not a staircase. The tone changes character through the break zone, but there shouldn't be a gap or crack -- just a gradual shift from warm to bright.",
      wrong: "If the voice cuts out or cracks sharply in the middle, you're sliding too fast or using too much air. Slow down and reduce volume. The slide should be quiet and gentle.",
      sarah: "Glissando through the passaggio is like stretching a tight muscle -- you go slow, you stay relaxed, and you let the body figure out the coordination. Forcing it just makes it tighter.",
      metronome: 70,
      recorder: true,
      levelUp: "Smooth 'ooh' glide from F3 to B3 and back with no audible crack, 3 times in a row."
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
      metronome: 60,
      recorder: true,
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
      id: "v2e3b", time: 6, title: "Vowel Formant Shaping", type: "vocal",
      pitchContour: true,
      what: "Practice sustaining each vowel (ee-eh-ah-oh-oo) on a single pitch at the passaggio (A3), then move through the passaggio on each vowel. Some vowels cross easier than others -- 'oo' and 'oh' are easiest, 'ee' and 'eh' are hardest.",
      setup: "Standing. Pitch Detector on. No guitar. Relaxed jaw.",
      referencePitches: getPitchRange("G3", "C4"),
      steps: [
        { text: "Sustain A3 on 'oo' for 4 seconds. Then 'oh', 'ah', 'eh', 'ee' -- each for 4 seconds. Notice which vowels feel easiest.", why: "At the passaggio, vowel choice dramatically affects ease of phonation. Rounded vowels (oo, oh) lower the larynx and smooth the transition. Open vowels (ee, eh) can expose the break." },
        { text: "Now sing G3-A3-Bb3 on 'oo'. Smooth and easy? Good. This is your easiest crossing vowel.", why: "'Oo' naturally facilitates mix voice because it lowers the first formant. The passaggio crossing should feel almost effortless." },
        { text: "Same G3-A3-Bb3 on 'oh', then 'ah'. Each gets slightly harder. Notice where the difficulty increases.", why: "As vowels open up, the larynx wants to rise and the break becomes more exposed. This maps your personal vowel difficulty spectrum." },
        { text: "Try G3-A3-Bb3 on 'eh' and 'ee'. These are the hardest. If you crack, that's data -- not failure.", why: "Open, bright vowels fight the passaggio the most. Learning to cross on these vowels gives you complete vowel freedom in the break zone." },
        { text: "Repeat the full sequence 3 times. On each pass, try to make the harder vowels feel more like the easy ones.", why: "The goal is vowel-independent passaggio crossing. When 'ee' feels as easy as 'oo', you've mastered formant shaping." }
      ],
      feel: "The easy vowels should feel like sliding through butter. The hard vowels will feel like a speed bump -- a moment of resistance at A3. With practice, all vowels should approach the ease of 'oo'.",
      wrong: "If every vowel cracks at A3, you're probably using too much volume. Drop to a conversational 5/10 volume. The quieter you sing, the easier the crossing.",
      sarah: "Vowel formant shaping is why opera singers modify vowels as they go higher. You don't need to sing opera, but the principle is the same -- let the vowel help the voice, not fight it.",
      metronome: 60,
      recorder: true,
      levelUp: "Smooth G3-A3-Bb3 crossing on all five vowels with no cracks, 3 consecutive passes."
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
      metronome: 70,
      recorder: true,
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
      recorder: true,
      levelUp: "Regularly entering break zone with committed tone across all 4 chords."
    },
    {
      id: "v2e6", time: 3, title: "Rhythmic Pitch Matching", type: "vocal",
      what: "Over a groove beat with Am on guitar, sing specific chord tones on specific beats. Then move them to off-beats. This fuses pitch training with rhythm training.",
      setup: "Guitar: Am chord. Groove Beat 90 BPM playing.",
      referencePitches: getPitchRange("A2", "C4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
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
      recorder: true,
      levelUp: "Clean syncopated version with accurate pitches on all 4 chords."
    }
  ]
};
