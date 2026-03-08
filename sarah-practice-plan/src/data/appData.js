export const ALL_NOTES = [
  "C2", "C#2", "D2", "E♭2", "E2", "F2", "F#2", "G2", "A♭2", "A2", "B♭2", "B2",
  "C3", "C#3", "D3", "E♭3", "E3", "F3", "F#3", "G3", "A♭3", "A3", "B♭3", "B3",
  "C4", "C#4", "D4", "E♭4", "E4", "F4", "F#4", "G4", "A♭4", "A4", "B♭4", "B4", "C5"
];

export function getPitchRange(startNote, endNote) {
  const start = ALL_NOTES.indexOf(startNote);
  const end = ALL_NOTES.indexOf(endNote);
  if (start === -1 || end === -1) return [startNote, endNote];

  const range = [];
  if (start <= end) {
    for (let i = start; i <= end; i++) range.push(ALL_NOTES[i]);
  } else {
    for (let i = start; i >= end; i--) range.push(ALL_NOTES[i]);
  }
  return range;
}

export const DAYS = [
  {
    num: 1, name: "Foundation", focus: "Metronome Internalization", duration: "50–55 min",
    setup: "Metronome app on phone, guitar in lap, something to tap on (thigh or table). Quiet room.",
    exercises: [
      {
        id: "d1e1", time: 10, title: "Full Count", type: "rhythm",
        what: "Internalize the relationship between numbers (downbeats) and &'s (upbeats) so your body FEELS the grid before any music.",
        setup: "Metronome at 200 BPM. Tap surface with dominant hand. Nothing else in hands yet.",
        steps: [
          { text: "Set metronome to 200 BPM. You'll hear a click on every 8th note.", why: "Each click = one syllable you'll say." },
          { text: "Say out loud: '1 & 2 & 3 & 4 &' — one syllable per click.", why: "Your voice matches the metronome exactly. Every click has a syllable." },
          { text: "TAP with your hand only on the numbers (1, 2, 3, 4). Your tapping is at half speed (100 BPM).", why: "This splits your body: voice follows every click, hand follows only downbeats." },
          { text: "NOD your head: DOWN on numbers, UP on &'s.", why: "Sarah: 'This embodiment is crucial!' The nod physically separates downbeats from upbeats in your body." },
          { text: "Do 4–8 bars → rest 10 seconds → repeat 3–4 times.", why: "Short sets with rest. Quality over quantity." },
        ],
        feel: "Your neck should feel the rhythm. The nod should feel like a slow-motion headbang — deliberate, not frantic. If the nod feels rushed or out of sync, you're going too fast.",
        wrong: "If your nod starts matching your voice (nodding on every click), slow down 20 BPM. The nod is HALF speed — only on numbers.",
        sarah: "Incorporate the metronome into every single thing that you do. Doing things slowly and right 100% of the time is way better for your brain than doing them fast and right 80% of the time.",
        metronome: 200, levelUp: "Hold 4 bars at 220+ BPM with clean nod."
      },
      {
        id: "d1e2", time: 8, title: "&'s Only", type: "rhythm",
        what: "Train your body to hold the downbeat internally while your voice speaks only the offbeats. This is the foundation of syncopation.",
        setup: "Same metronome at 200–244 BPM. Same tapping setup.",
        steps: [
          { text: "Metronome at 200–244. Tap at 100–122 (half speed, on the numbers).", why: "Same as Drill #1 — tap is your downbeat anchor." },
          { text: "ONLY say the &'s out loud. Stay silent on the numbers.", why: "Your voice now speaks between the clicks, not on them. This is what syncopated singing feels like." },
          { text: "Keep nodding DOWN on numbers, UP on &'s — even though you're only speaking on the up-nods.", why: "The nod is your lifeline. It tells your body where 'beat 1' is even when your voice is off the beat." },
        ],
        feel: "This should feel disorienting at first — like patting your head and rubbing your stomach. Your body (nod + tap) holds the grid, your voice floats between it. When it clicks, you'll feel a 'lock' where the silence on the numbers feels as deliberate as speaking on the &'s.",
        wrong: "If you catch yourself saying the numbers quietly, or if the nod starts syncing with your voice instead of the tap — stop. Slow down 20 BPM and rebuild.",
        sarah: "For both exercises, 244 is the BPM of the metronome. You tap only on the numbers (tapping at 122). For this exercise, you only say the &'s out loud.",
        metronome: 200, levelUp: "4 clean bars of &'s-only at 244 BPM."
      },
      {
        id: "d1e3", time: 8, title: "16th Notes", type: "rhythm",
        what: "Subdivide each beat into 4 parts. This is what lets you place vocals precisely inside a beat — not just on it or between it.",
        setup: "Metronome at 78 BPM. Tap at 78.",
        steps: [
          { text: "Set metronome to 78. Tap matches metronome.", why: "Slower tempo so you can fit 4 syllables per beat." },
          { text: "Say: '1 e and a 2 e and a 3 e and a 4 e and a'", why: "4 evenly-spaced syllables per click. 16 syllables total per bar." },
          { text: "Then strip: only say 'e and a' (silent on numbers).", why: "Same concept as Drill #2 but with 16th notes. Your body holds the downbeat, voice fills the gaps." },
        ],
        feel: "The 4 syllables should feel like a drumroll — perfectly even spacing. No syllable should be louder or faster than the others. When you strip to 'e and a' only, it should feel like a triplet between each beat.",
        wrong: "If 'e and a' sound rushed (bunched together near the number), you're not distributing them evenly. Say all 4 at first, then gradually make the '1' silent while keeping the spacing.",
        sarah: "Really prioritize getting the highest percentage right over anything else — over speed, over dynamics, over anything.",
        metronome: 78, levelUp: "Clean 'e and a' only at 82–85 BPM."
      },
      {
        id: "d1e4", time: 12, title: "Fingerpick + Count", type: "guitar",
        what: "Add guitar to the counting. The goal is automatic picking so you can layer voice on top later.",
        setup: "Guitar in lap. Surf Rock Beat 120 BPM on speaker/headphones. Am → C → G → D chord shapes ready.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Play Surf Rock Beat at 120 BPM.", why: "This is the backing track you've been using since January." },
          { text: "Fingerpick Am → C → G → D: alternate thumb (A string) and pointer finger (B string).", why: "Sarah (1/13): 'You're finger picking the same chord progression — do your A string and your B string.' Count is on the thumb, 4 back-and-forth per chord." },
          { text: "Count '1 & 2 & 3 & 4 &' out loud while picking.", why: "This connects the counting drill to actual music. Your count should line up with your thumb hits." },
          { text: "NOD the entire time. Down on numbers, up on &'s.", why: "Same nod as the drills. Now it carries into real playing." },
        ],
        feel: "The picking should feel mechanical and easy — like breathing. If you can count and nod without the picking falling apart, the pattern is internalized. The count should feel like narrating what your hands already know.",
        wrong: "If counting makes your picking stutter, simplify: just hit the thumb on beats 1–4 (skip the pointer). Add pointer back once counting is stable.",
        sarah: "You're finger picking the same chord progression — do your A string and your B string. Make sure you are on beat. As soon as you hear that you're off, you gotta stop.",
        metronome: 120, levelUp: "Count + nod + fingerpick for a full chord cycle without dropping count."
      },
      {
        id: "d1e5", time: 12, title: "Passaggio Warm-Up", type: "vocal",
        what: "Gently explore your vocal break around A3. Today is observation — not pushing. You're mapping where the flip happens.",
        setup: "No guitar. Standing is ideal. Glass of water nearby. No dairy for 30+ min before.",
        referencePitches: getPitchRange("C4", "E3"),
        steps: [
          { text: "Chest voice warm-up: Put hand on belly. Say 'Hey, stop it!' like you mean it. Feel the belly push? That's your diaphragm — that's chest voice. Now say it softly from your head — no belly push. Alternate loud/soft 4 times.", why: "Sarah (1/27): 'It's not even just a volume thing — it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach.'" },
          { text: "Descending 5-note scale on 'nee': Start on C4, descend C4→B3→A3→G3→F3.", why: "Approaching the break from ABOVE lets you 'slide' into it rather than crashing up into it." },
          { text: "Each round, start a half step lower: B3→A#3→G#3→F#3→E3, then B♭3→A3→A♭3→G3→G♭3.", why: "You'll cross through the A3 break zone around round 3. Notice where the voice wants to flip." },
          { text: "Messa di voce on G3, A♭3, A3, B♭3: Sing 'ah', start quiet → swell to medium → back to quiet. 8 seconds per cycle, 3 cycles per note.", why: "The swell tests your break — the crescendo tries to pull you into chest voice. The goal is staying in mix through the swell." },
          { text: "Volume should be conversational — 6/10 max. Don't push.", why: "Pushing engages chest voice muscles and makes the flip more abrupt. Light singing lets the voice shift naturally." },
        ],
        feel: "On the descending scale, you'll feel the voice 'settle' as you cross A3. There might be a slight thinning or color change in the tone around B♭3–A3. That's the passaggio. On the messa di voce, G3 should feel easy and warm. A♭3 gets 'interesting' — you might feel the voice wanting to shift. A3 is the zone — the crescendo may cause a flip. B♭3 may flip into head voice, and that's fine.",
        wrong: "If you're straining or pushing to stay in chest voice through A3, you're forcing it. Let the flip happen. Over weeks, the flip becomes a shift, then a blend. Forcing it delays this process.",
        sarah: "I think for you, a great exercise is one that flips you from your chest voice into your head voice — back and forth, back and forth. If you're going to find exercises using AI, make sure to tell them that you have a man voice because the notes that you flip on are going to be different.",
        levelUp: "Notice the exact note where your voice wants to flip. It might be A3, A♭3, or B♭3 — it varies day to day."
      },
      {
        id: "d1e6", time: 5, title: "Listening Analysis", type: "listen",
        what: "Train your ear to hear where vocals sit relative to the beat. This directly improves your own vocal timing.",
        setup: "Headphones. 'I Like The Way You Walk' by The Donkeys queued up. No guitar.",
        steps: [
          { text: "Listen to the original. Focus only on where the last word of each line lands.", why: "Sarah has flagged this across 3 lessons (2/16, 3/2). The last word timing is the key syncopation pattern." },
          { text: "Ask yourself: is that last word ON the beat? BETWEEN beats? Late?", why: "If you can hear that it's between beats, you understand the syncopation you need to reproduce." },
          { text: "Try counting '1 & 2 & 3 & 4 &' while listening. Where does each last word fall in the count?", why: "This connects the abstract counting drills to real music." },
        ],
        feel: "You should hear the singer's words 'floating' between your counts. If the last word of a line feels like it's on a number, listen again — it's probably between beats.",
        wrong: "If you think every word is landing cleanly on a beat, you're not hearing the syncopation yet. Slow the song to 75% on YouTube and count along more carefully.",
        sarah: "Listen back to the original song and analyze the timing of his vocals — especially the last word of each line. Make sure you're not simplifying it and putting things directly on beat when they're supposed to be in between the beats.",
        levelUp: "You can tell which words are on-beat vs. off-beat without counting."
      }
    ],
  },
  {
    num: 2, name: "Syncopation", focus: "Rhythmic Singing + Sol Del Sur", duration: "50–55 min",
    setup: "Guitar, metronome, Sol Del Sur tab on Ultimate Guitar pulled up, speaker for backing tracks.",
    exercises: [
      {
        id: "d2e1", time: 10, title: "Metronome Drills #1 & #2", type: "rhythm",
        what: "Push your ceiling tempo. Same exercises as Day 1, faster.",
        setup: "Metronome, tap surface.",
        steps: [
          { text: "Drill #1 (Full Count): Push tempo 10–20 BPM closer to 244.", why: "Progressive overload. Yesterday's hard is today's warm-up." },
          { text: "Drill #2 (&'s Only): Match the new tempo.", why: "Both drills at the same speed keeps them paired." },
          { text: "Nod quality > tempo number. If nod gets sloppy, drop 10 BPM.", why: "Speed without control is noise. The nod is the quality check." },
        ],
        feel: "Today these should feel slightly more natural than Day 1. The nod should require less conscious thought.",
        wrong: "If you're holding your breath or tensing your shoulders, you're fighting the tempo instead of riding it. Drop 10 BPM.",
        metronome: 220, levelUp: "Clean set at 230+ BPM."
      },
      {
        id: "d2e2", time: 12, title: "Lyric Placement", type: "vocal",
        recorder: true,
        what: "Sing words BETWEEN metronome clicks. This is the core skill for syncopated singing — the exact pattern ILTWYW uses.",
        setup: "Metronome at 122 BPM. No guitar. Stand or sit upright.",
        steps: [
          { text: "Set metronome to 122 and tap at 122.", why: "Each click is a quarter note." },
          { text: "Sing 4 lines. The bold words fall BETWEEN clicks, not on them:", visual: "lyricGrid" },
          { text: "NOD on the clicks. Your voice sings on the UP-nods (between clicks).", why: "Identical concept to Drill #2, but now with real words instead of &'s." },
          { text: "Record yourself. Listen back.", why: "Sarah (3/2): 'Doing the above metronome exercises + nods will help with this!'" },
        ],
        feel: "The words should feel like they're 'floating' between your taps. Your nod holds the grid; your voice dances around it. If the nod and voice sync up, something's wrong.",
        wrong: "If the words are landing ON the clicks, you're putting them on the beat. The words go BETWEEN. Think of the metronome click as a space where you're silent, and your voice fills the gaps.",
        sarah: "Tap tempo at 122, metronome playing at 122, sing the below lines. The underlines are the click of the metronome. Incorporate the nod!",
        metronome: 122, levelUp: "Sing all 4 lines cleanly for 2 consecutive passes."
      },
      {
        id: "d2e3", time: 15, title: "Sol Del Sur — Lead", type: "guitar",
        tabs: "soldelsur",
        what: "Learn the lead guitar part. Accuracy at slow speed first, then build up.",
        setup: "Electric guitar. Sol Del Sur tab on Ultimate Guitar. YouTube video of the song.",
        steps: [
          { text: "Pull up the chords/tab on Ultimate Guitar.", why: "Reference for the lead part notes." },
          { text: "The 9's (arpeggiated figures): fast DUDUD pattern.", why: "Sarah (2/16): 'Learn the lead on your own on electric.'" },
          { text: "Slow YouTube to 75% speed → play along.", why: "Speed comes from accuracy, not practice at full speed." },
          { text: "Clean at 75%? → try 85% → then full speed.", why: "Progressive speed building. Don't skip to full speed." },
        ],
        feel: "At 75% speed, every note should ring clean. If you're buzzing strings or missing notes, stay at 75% longer.",
        wrong: "If you're playing all the notes but they're not at the right time, that's worse than playing fewer notes at the right time. Rhythmically tight > note-correct.",
        sarah: "Play along with the song, slow the song down on YouTube, make sure you're playing all the notes and playing them at the right time.",
        levelUp: "Clean play-through at 85% speed."
      },
      {
        id: "d2e4", time: 10, title: "Sirens + Pitch Match", type: "vocal",
        what: "Map your range with sirens, then practice singing specific pitches on beat over a chord progression.",
        setup: "No guitar for sirens. Then guitar for pitch matching with Groove Beat 90 BPM.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        referencePitches: getPitchRange("C2", "G4"),
        steps: [
          { text: "Siren glides: lip trill (or 'vvv') from lowest (~C2) up to highest head voice (~G4) and back. 4–5 sec each way.", why: "Maps your whole range. Identify where it cracks or shifts." },
          { text: "Rounds 3–5: SLOW DOWN through A♭3–A3–B♭3 zone.", why: "This is your passaggio. Slow movement reveals the exact flip point." },
          { text: "Chord-tone singing: Am on guitar, Groove Beat 90 BPM. Sing chord tones — root on beat 1, 3rd on beat 3.", why: "Connects pitch accuracy to rhythmic placement." },
          { text: "Then try same pitches but placed on &'s instead of beats.", why: "Syncopated pitch matching — combines everything." },
        ],
        feel: "Sirens should feel like a smooth elevator ride through your range. The A3 zone might feel like hitting a speed bump — the trill may get uneven or the pitch wobbles. That's data, not failure. On pitch matching, the notes should 'lock in' to the chord you're playing on guitar.",
        wrong: "If your siren has a hard crack (not a gradual shift), you may be pushing too much air. Back off to 50% volume and try again.",
        sarah: "If you could find exercises where you are forced to flip from your head into your chest into your mixed — and make sure to tell them that you have a man voice because the notes that you flip on are going to be different.",
        levelUp: "Siren through A3 with gradual thinning instead of crack."
      }
    ],
  },
  {
    num: 3, name: "Application", focus: "I Like The Way You Walk", duration: "50 min",
    setup: "Guitar, Groove Beat 90 BPM, metronome, phone to record.",
    exercises: [
      {
        id: "d3e1", time: 8, title: "Metronome Maintenance", type: "rhythm",
        what: "Keep pushing toward 244 BPM. By Day 3, the nod should feel more automatic.",
        setup: "Metronome, tap surface.",
        steps: [
          { text: "Drills #1 & #2 — push toward 244.", why: "Minimum 3 clean sets each." },
          { text: "Check: does the nod feel natural yet?", why: "If yes, the drill is working. If not, spend extra time here today." },
        ],
        feel: "By Day 3, the nod should feel less like 'thinking about nodding' and more like 'nodding while thinking about something else.'",
        wrong: "If the nod still requires full concentration, that's fine — but don't rush past this drill. It feeds everything else.",
        metronome: 240, levelUp: "Nod feels semi-automatic at 240."
      },
      {
        id: "d3e2", time: 7, title: "16th Note Drill", type: "rhythm",
        what: "Push the 16th note subdivision slightly faster.",
        setup: "Metronome at 78 (or 82–85 if 78 feels easy).",
        steps: [
          { text: "78 BPM: full count, then 'e and a' only.", why: "Review first, then strip." },
          { text: "If 78 feels comfortable, try 82–85 BPM.", why: "This directly feeds into the syncopation you need for ILTWYW." },
        ],
        feel: "At higher BPMs, the 'e and a' start to feel like a fast gallop. Each syllable should still be distinct — not blurred together.",
        wrong: "If the syllables merge into a slur, drop back to 78 and rebuild clarity.",
        metronome: 78, levelUp: "Clean 'e and a' only at 85 BPM."
      },
      {
        id: "d3e2b", time: 5, title: "Ear Training — Chord Tone Singing", type: "vocal",
        what: "Strum a chord and sing the notes you hear — without plucking individual strings first. Your ear naturally finds notes, even beautiful ones outside the scale.",
        setup: "Guitar. Quiet room. No backing track — just you and the guitar.",
        referencePitches: getPitchRange("C3", "C4"),
        steps: [
          { text: "Strum a C chord once, full and open. Let it ring.", why: "Sarah (1/27): 'Don't individually pluck those notes — we're trying to train our brain to find it.'" },
          { text: "Sing the first note you hear. Commit to it — even if it feels wrong.", why: "Sarah (1/27): 'You should follow through and make that mistake so that you kind of learn from it.'" },
          { text: "Sing 3–4 notes you hear in the chord. Now strum again and sing them together.", why: "In the Jan 27 lesson, Gene found F# over a C chord — which worked beautifully because they were coming from Am." },
          { text: "Repeat with Am, G, D. Notice how your ear finds different notes over different chords.", why: "Sarah (1/27): 'It's actually a great thing that you didn't pluck your guitar — you found an F sharp, and that's a good thing. Our brains naturally find these notes outside of the scale.'" },
        ],
        feel: "This should feel exploratory, not like a test. When a note 'clicks' with the chord, you'll feel it resonate. 'Wrong' notes often turn out to be chromatic passing tones or borrowed chord tones that sound beautiful.",
        wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them.",
        sarah: "Commit more, Jean! You should follow through and make that mistake so that you kind of learn from it. It's a beautiful thing that our brains naturally find these notes that are outside of the scale.",
        levelUp: "Find 3+ notes per chord without plucking. Notice one 'surprise' note that works."
      },
      {
        id: "d3e3", time: 20, title: "ILTWYW — Full Work", type: "song",
        tabs: "iltwyw",
        recorder: true,
        what: "This is the main event. Strum + vocals over the groove beat, with focus on syncopated vocal timing.",
        setup: "Guitar. Groove Beat 90 BPM on speaker. Phone ready to record. Lyrics printed/memorized.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Start the Groove Beat at 90 BPM. Get the strum pattern automatic first — play 2 cycles without singing.", why: "Sarah (1/13): 'Master the strumming pattern before adding it to any video.' Strum must be on autopilot before vocals." },
          { text: "Add vocals one line at a time.", why: "Don't try to sing the whole song at once. Isolate each line, get the timing right, then chain them." },
          { text: "CRITICAL: the last word of each line is OFF-BEAT. Don't simplify it onto the beat.", why: "Sarah has flagged this in 3 consecutive lessons (2/16, 3/2). This is THE thing to fix." },
          { text: "Compare to the original recording after each attempt.", why: "Your ear needs to hear the difference between your version and theirs." },
          { text: "Record yourself. Listen back immediately.", why: "Sarah (1/13): 'Record yourself and listen back to see how long it takes you to realize you've gone off beat.'" },
        ],
        feel: "When the syncopation is right, the song should feel like it has a 'bounce' or 'swagger.' The vocal line should feel like it's dancing around the guitar strum, not sitting on top of it.",
        wrong: "If the song sounds 'flat' or 'square,' you're probably putting words on the beat. Listen to the original again — hear the bounce, then try to match it.",
        sarah: "Watch out for the timing of the last word of each line. Make sure you're not simplifying it and putting things directly on beat when they're supposed to be in between the beats. Master the strum without the video, and then bring it to the video.",
        levelUp: "Hear the difference between your syncopation and the original's."
      },
      {
        id: "d3e4", time: 10, title: "Ooh Climbing + Messa di Voce", type: "vocal",
        what: "Improvise ascending 'ooh' patterns over the chord progression while exploring your break zone.",
        setup: "Guitar. Surf Rock Beat 120 BPM.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        referencePitches: getPitchRange("A2", "C4"),
        steps: [
          { text: "Am → C → G → D at 120 BPM. 4 'ooh' notes per chord that CLIMB.", why: "Sarah (1/27): 'On each 1 2 3 4, sing ooh and climb up (4 notes per chord).'" },
          { text: "Each chord gets a DIFFERENT pattern. Don't repeat the same 4 notes.", why: "Sarah (1/27): 'It shouldn't be the same 4 notes per chord — explore!'" },
          { text: "As you repeat cycles, push higher. Explore the A3 zone.", why: "You'll naturally approach your break. When you do, keep going." },
          { text: "COMMIT to each note. Push more air.", why: "Sarah (1/27): 'COMMIT to each note — if you push more air you'll be more likely to hit the note in key.'" },
        ],
        feel: "This should feel like musical exploration, not a drill. Each cycle is an opportunity to try new patterns. When you hit your break zone, the voice might crack — that's information, not failure. A committed crack is better than a safe whisper.",
        wrong: "If you're singing the same 4 notes on every chord, you're on autopilot. Force yourself to pick different starting notes, different intervals.",
        sarah: "Commit more, Jean! If you push more air you'll be more likely to hit the note in key. It's actually a great thing when your voice finds notes outside the scale — our brains naturally find these beautiful notes.",
        levelUp: "Climb through A3 without backing down. Crack is data."
      }
    ],
  },
  {
    num: 4, name: "Deep Practice", focus: "Stacking Skills", duration: "55 min",
    setup: "Guitar (electric for Sol Del Sur, acoustic for fingerpick), metronome, backing tracks, phone to record.",
    exercises: [
      {
        id: "d4e1", time: 10, title: "Metronome Speed Push", type: "rhythm",
        what: "Push to 244 BPM. This is the target Sarah set in the 3/2 lesson.",
        setup: "Metronome, tap surface.",
        steps: [
          { text: "Drill #1 at 244 BPM (or highest clean tempo).", why: "Go for it. This is the target." },
          { text: "Drill #2 at matching tempo.", why: "Both drills stay paired." },
          { text: "Goal: 4 clean bars at 244.", why: "If you can't hold 4 bars, drop 10 BPM and rebuild." },
        ],
        feel: "At 244, the clicks feel extremely fast. Your nod should be small, tight movements — almost imperceptible from the outside. The count becomes more felt than spoken.",
        wrong: "If your count is falling behind the clicks, the tempo is too high. No shame in dropping 10–20 BPM.",
        metronome: 244, levelUp: "4 clean bars of Drill #1 at 244."
      },
      {
        id: "d4e2", time: 12, title: "Fingerpick + Singing", type: "guitar",
        what: "Layer voice on top of the fingerpicking pattern. This has been building since January 27.",
        setup: "Guitar. Surf Rock Beat 120 BPM.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Fingerpick Am → C → G → D at 120 BPM.", why: "This pattern should be automatic by now (7+ weeks of practice)." },
          { text: "Add 'ooh': 1 note per chord. Different note each time.", why: "Sarah (1/27, 2/16): 'Add singing note ooh (1 note per chord). It shouldn't be the same note every single time.'" },
          { text: "Stay in chest voice range for now. Improvise freely.", why: "This is easier than the climbing exercise. Just add one sustained note per chord change." },
          { text: "COMMIT — push air, don't whisper.", why: "Same principle as ooh climbing. Air = pitch accuracy." },
        ],
        feel: "The picking should be on total autopilot — like walking while talking. If adding the voice makes the picking stutter, the picking pattern isn't automatic enough yet.",
        wrong: "If you're thinking about which string to pluck, the voice will suffer. Go back to picking-only for a minute, then add voice again.",
        sarah: "Remember to commit! Fingerpick + add singing ooh (1 note per chord, shouldn't be the same note every time).",
        metronome: 120, levelUp: "Full 4-chord cycle with voice without picking falling apart."
      },
      {
        id: "d4e3", time: 15, title: "Sol Del Sur — Strum + Lead", type: "guitar",
        tabs: "soldelsur",
        recorder: true,
        what: "Work the strum pattern. Sarah wants a video of this one.",
        setup: "Electric guitar. YouTube: Sol Del Sur.",
        steps: [
          { text: "Strum pattern: first note = individual string pluck, then the strum.", why: "Sarah (3/2): 'Make sure the very first note is an individual string pluck.'" },
          { text: "No extra strum after the first down strum.", why: "Sarah (3/2): 'Make sure there's no extra strum after the first down strum.'" },
          { text: "On C#m: pluck the A string at the start of the chord.", why: "Sarah (2/16): 'For the C#m, they pluck the A string at the start of the chord.'" },
          { text: "📹 RECORD the strum and send to Sarah.", why: "Sarah (2/16): 'As soon as you have it, send me a video so I can check to make sure it's correct!'" },
        ],
        feel: "The pluck before the strum should create a distinct 'pick → strum' two-part attack on each chord. It's not strum-strum, it's pluck-strum.",
        wrong: "If the pluck and strum blur together into one sound, you're starting the strum too early. Pause between the pluck and the strum.",
        sarah: "Try to figure out the strum on your own — as soon as you have it, send me a video so I can check!",
        levelUp: "Clean video of strum sent to Sarah."
      },
      {
        id: "d4e4", time: 15, title: "Full Passaggio Workout", type: "vocal",
        what: "Extended vocal work through the break zone. Pair exercises with a groove beat for real-world feel.",
        setup: "Standing. Water nearby. Groove Beat 90 BPM for the scat section.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        referencePitches: getPitchRange("A2", "C4"),
        steps: [
          { text: "Descending 5-note scales on 'nee' (from Day 1 vocal). 3–4 rounds descending through A3.", why: "Warm-up for the break zone." },
          { text: "Sirens: lip trill, SLOW through A♭3→A3→B♭3.", why: "Map today's flip point — it can vary from yesterday." },
          { text: "Scat improv over Groove Beat 90 BPM: syllables 'doo' 'bah' 'dee' 'dah' following Am C G D chord tones.", why: "This combines rhythm + pitch + improv — the endgame skill." },
          { text: "Start: 1 syllable per beat → syncopate on &'s → try 16th note bursts.", why: "Progressive complexity within one exercise." },
        ],
        feel: "The scat improv should feel playful. You're making up music in real time. The groove beat keeps you honest rhythmically while you explore pitch.",
        wrong: "If your scat feels random (no relationship to the chord changes), simplify: just sing the root note of each chord on beat 1, then gradually add more notes.",
        sarah: "Having that control — getting the high notes in a quiet way or in a louder way and flipping between the mechanisms — that would be great practice for you. Mixed voice is the most powerful one because you're using your head to get a big sound.",
        levelUp: "Scat improv where syncopations sound intentional, not accidental."
      }
    ],
  },
  {
    num: 5, name: "Recording Day", focus: "Record Everything", duration: "45 min",
    setup: "Phone propped up for video. Good lighting if possible. Guitar, all backing tracks ready.",
    exercises: [
      {
        id: "d5e1", time: 8, title: "Metronome Maintenance", type: "rhythm",
        what: "Quick check-in on Drills #1 & #2. Is the nod automatic yet?",
        setup: "Metronome, tap surface.",
        steps: [
          { text: "Drills #1 & #2 at target tempo.", why: "Maintenance, not pushing." },
          { text: "Self-check: is the nod fully automatic? Can you think about something else while nodding?", why: "If yes, you've internalized it. If no, spend extra time here today." },
        ],
        feel: "The nod should feel like something you do, not something you think about doing.",
        wrong: "If the nod still requires concentration, that's your priority today — not recording.",
        levelUp: "Nod is automatic while thinking about something else."
      },
      {
        id: "d5e2", time: 25, title: "Record & Review", type: "record",
        recorder: true,
        what: "Record three things, listen back immediately, and take notes on what you hear.",
        setup: "Phone propped for video. All backing tracks queued.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }, { name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Record #1: ILTWYW with Groove Beat 90 BPM. Full song, strum + vocals.", why: "This is your main performance piece. The recording reveals timing slips you can't hear while playing." },
          { text: "Record #2: Sol Del Sur strum pattern. → SEND THIS TO SARAH.", why: "She specifically asked for this video." },
          { text: "Record #3: Fingerpick Am C G D + ooh improvisation at 120 BPM.", why: "Captures your progress on the dual-skill exercise." },
          { text: "Listen back to each recording IMMEDIATELY after.", why: "Sarah (1/13): 'Record yourself and listen back to see how long it takes you to realize you've gone off beat.' Your goal: shrink that time." },
          { text: "Note specific timing slips. Which word? Which beat? Where did you drift?", why: "Specific notes let you target the exact problem spots tomorrow." },
        ],
        feel: "Listening to yourself is uncomfortable. That discomfort is the gap between what you hear in your head and what's actually coming out. The gap shrinks with practice.",
        wrong: "If you listen back and think 'that sounded fine,' listen again more carefully. Compare directly to the original. There's always a gap to close.",
        sarah: "Record yourself and listen back. You might be like, 'oh, it took me 20 seconds to hear that I was off.' Work it down to five seconds. As soon as you hear it, stop. It's way better to stop every 20 seconds than to keep going off beat.",
        levelUp: "Identify drift within 2–3 beats. Sol Del Sur video sent to Sarah."
      },
      {
        id: "d5e3", time: 12, title: "Vocal: Record + Review", type: "vocal",
        recorder: true,
        what: "Record vocal exercises to track your passaggio progress over time.",
        setup: "Standing. Phone recording audio. Water.",
        referencePitches: getPitchRange("G3", "C4"),
        steps: [
          { text: "Messa di voce on G3, A♭3, A3, B♭3. Record all of it.", why: "Listening back reveals whether the swell is smooth or jerky through the break." },
          { text: "Siren: slow through break. Record a full up-and-down pass.", why: "You're listening for the timbre change — where chest becomes mixed becomes head." },
          { text: "Listen back. Focus on smoothness, not range.", why: "A smooth, narrow siren is better than a wide, cracky one." },
        ],
        feel: "On the recording, the passaggio might sound different than it felt. Sometimes it sounds smoother than it felt (good sign). Sometimes there's a crack you didn't feel (more warm-up needed).",
        wrong: "If the siren recording has a hard 'click' or 'pop' at A3, you were pushing too much air through the flip. Try less air, more control.",
        sarah: "Your flip is around A3. That area is where I would really work — you want to be able to have full control over your tone choice when you're choosing those notes.",
        levelUp: "Siren recording shows gradual thinning (not a crack) through A3."
      }
    ],
  },
  {
    num: 6, name: "Integration", focus: "Full Run-Throughs", duration: "50 min",
    setup: "All gear. All backing tracks. Energy.",
    exercises: [
      {
        id: "d6e1", time: 8, title: "Graduation Test", type: "rhythm",
        what: "Can you do 8 clean bars of &'s only at 244 BPM? This is the benchmark for the week.",
        setup: "Metronome at 244. Tap at 122.",
        steps: [
          { text: "Drill #2 (&'s only) at 244 BPM / tapping 122.", why: "Full target speed." },
          { text: "Go for 8 bars. Count them.", why: "8 bars is double the target. This is the stress test." },
        ],
        feel: "At 8 bars, your body should be on autopilot. The nod carries you. If you're counting bars consciously, that's fine — the nod is the important part.",
        wrong: "If you break at bar 5 or 6, fatigue might be the issue. Rest 30 seconds, try again. It's not a speed problem at that point.",
        sarah: "As soon as you hear that you're off, you gotta stop. Really prioritize doing it right. You really don't want to practice it wrong if you can help it.",
        metronome: 244, levelUp: "8 clean bars, solid nod, at 244."
      },
      {
        id: "d6e2", time: 10, title: "Lyric Improv", type: "vocal",
        what: "The 4-line exercise, but now with YOUR OWN words. If you can improvise words with correct off-beat placement, the rhythm is internalized.",
        setup: "Metronome at 122. No guitar.",
        steps: [
          { text: "4-line lyric exercise at 122. Standard version first.", why: "Warm up with the known version." },
          { text: "Now: improvise your OWN words, same rhythmic placement.", why: "If you can make up words that land between the beats, you've internalized the syncopation." },
          { text: "Check: can you FEEL the off-beats without counting?", why: "Feeling it (without counting) = internalized. Counting it = still learning. Both are fine." },
        ],
        feel: "Improvised words with correct placement = the syncopation lives in your body now, not just your head. It should feel like the rhythm is 'pulling' the words into the right spots.",
        wrong: "If your improvised words keep landing on the beat, go back to the standard version for a few passes, then try again.",
        metronome: 122, levelUp: "Improvised words land off-beat without conscious counting."
      },
      {
        id: "d6e3", time: 15, title: "ILTWYW — Performance Run", type: "song",
        tabs: "iltwyw",
        what: "Full song, no stopping. If you drift, re-enter on beat. This trains the recovery skill you need for live playing.",
        setup: "Guitar. Groove Beat 90 BPM. Pretend it's a live performance.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Groove Beat 90 BPM. Full song: strum + vocals.", why: "This is a run-through, not a drill. No stopping." },
          { text: "If you drift off beat: DO NOT STOP. Re-enter on the next beat.", why: "Sarah (1/13): 'Stop as soon as you realize you're off beat, and enter back in on beat.' The key metric is how quickly you recover." },
          { text: "Goal: shorter drift time + cleaner re-entry each time.", why: "In live performance, nobody hears a 1-beat drift. They hear a 4-bar train wreck." },
        ],
        feel: "This should feel like performing. The pressure of 'don't stop' creates a different mindset than drilling. Recovery is a skill — you're practicing the recovery, not the mistake.",
        wrong: "If you stop and restart, you've turned a performance into a drill. Commit to the no-stop rule.",
        sarah: "If you start falling off, as soon as you realize it, either try to get back in or pause, listen, and jump back in. It's way better to stop every 20 seconds than to keep going off beat — because if you're not on beat, your brain is not in the state it needs to be in.",
        levelUp: "Complete ILTWYW run without restart. Re-entries within 1 beat."
      },
      {
        id: "d6e4", time: 12, title: "Sol Del Sur — Full Pass", type: "guitar",
        tabs: "soldelsur",
        what: "Play along with the actual recording. Alternate lead and strum sections.",
        setup: "Electric guitar. YouTube: Sol Del Sur at full speed.",
        steps: [
          { text: "Lead at full speed.", why: "You've built up from 75%." },
          { text: "Strum with clean entries (pluck → strum pattern).", why: "This is what you recorded on Day 5." },
          { text: "Alternate lead/strum sections along with the song.", why: "Full song integration." },
        ],
        feel: "Playing along with the original should feel like playing WITH the band. You're fitting into their groove, not fighting it.",
        wrong: "If you're always behind the recording, your tempo perception may be off. Use the metronome drills to recalibrate.",
        sarah: "Play along with the song, make sure you're playing all the notes at the right time.",
        levelUp: "Full play-through matching the recording's timing."
      }
    ],
  },
  {
    num: 7, name: "Rest + Play", focus: "Musical Exploration", duration: "30–40 min",
    setup: "Guitar. Backing track at whatever BPM feels good. Cozy vibes.",
    exercises: [
      {
        id: "d7e1", time: 5, title: "Light Metronome", type: "rhythm",
        metronome: 244,
        what: "2–3 light sets. Maintain, don't push. It's rest day.",
        setup: "Metronome, tap surface.",
        steps: [
          { text: "Drill #1 at 244. Just 2–3 sets.", why: "Keep the pattern alive without grinding." },
        ],
        feel: "This should feel easy compared to Day 6. If it doesn't, that's useful info — you may need more rest.",
        wrong: "If you're tempted to push tempo higher on rest day, don't. Save it.",
        levelUp: "Drill feels routine."
      },
      {
        id: "d7e2", time: 20, title: "Free Improvisation", type: "play",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }, { name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        what: "Play whatever you want. Fingerpick, sing, explore. The only rule: stay on beat.",
        setup: "Guitar. 120 BPM or 90 BPM backing track — your choice.",
        steps: [
          { text: "Fingerpick Am C G D. Sing whatever feels good.", why: "No prescribed notes. No prescribed words. Just music." },
          { text: "Climb through your break. Play with dynamics: loud chest → soft head → back.", why: "Explore your whole range without pressure." },
          { text: "MEDITATE while playing. Let your mind wander. Stay on beat.", why: "Sarah (1/13): 'Once you're locked in, meditate! Let your mind wander. It will likely make you go off beat — make sure to stay on!'" },
        ],
        feel: "This is the ultimate test: can you stay in the groove while your mind is elsewhere? When the rhythm is truly internalized, it holds you up even when you're not thinking about it. Like walking.",
        wrong: "If your mind wanders and you go off beat, that's exactly the exercise. Notice the drift, re-enter, keep going.",
        sarah: "Do the whole track — don't stop after three or four minutes. The magic really happens beyond that. Your brain will start wandering into thought spaces that are not normal. Use it as meditation — go into it with an intention, but don't get off the beat.",
        levelUp: "Stay on beat while thinking about something else."
      },
      {
        id: "d7e3", time: 10, title: "Free Singing", type: "vocal",
        what: "Vocal cool-down. Gentle exploration of your range. Enjoy the instrument.",
        setup: "No guitar. Standing. Water.",
        steps: [
          { text: "Sing through passaggio with different vowels: 'ah', 'oh', 'ee', 'oo'.", why: "Each vowel feels different through the break. 'Oo' is easiest, 'ah' is hardest." },
          { text: "Dynamics: start loud in chest → soften into head voice → come back.", why: "Dynamic swells through the break train the messa di voce in a musical context." },
          { text: "Finish with gentle sirens (lip trill) for warm-down.", why: "Cool down the voice like stretching after a workout." },
        ],
        feel: "This should feel like the end of a good workout — tired but good. The voice might feel more 'flexible' than at the start of the week.",
        wrong: "If your voice feels strained or tight, skip this and just do gentle sirens. Rest is more important than one more exercise.",
        sarah: "Head voice is an amazing tool, and it's beautiful — you have a beautiful head voice. It's not even just a volume thing between chest and head, it's an engagement of that diaphragm muscle down there.",
        levelUp: "Can you sing through your break without thinking about it? That's graduation."
      }
    ],
  }
];

export const KEYBOARD_LEVELS = [
  {
    num: 1, name: "The Chop", focus: "Offbeat stabs",
    duration: "50 min",
    setup: "KeyLab 49 connected to Ableton. Open Analog Lab V plugin, browse Farfisa V or Vox Continental V category and pick any combo organ preset. Practice app open in browser for metronome.",
    exercises: [
      {
        id: "k1e1", time: 10, title: "Single-Chord Offbeat Stab", type: "keys",
        referencePitches: ["C4", "E4", "G4"],
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "C Major Triad" },
        what: "C major triad: thumb on C4, middle finger on E4, pinky on G4 (fingers 1-3-5). Short percussive stab on every &. Same nod you already do: DOWN on numbers, play on UP-nod.",
        setup: "Organ preset loaded. Metronome at 80 BPM.",
        steps: [
          { text: "Place right hand on C major: thumb C4, middle finger E4, pinky G4 (1-3-5).", why: "Standard triad fingering. Same shape moves to any root." },
          { text: "Start metronome at 80 BPM. Nod: DOWN on numbers, UP on &'s.", why: "Same nod from your &'s Only drill. The rhythm is already in your body." },
          { text: "Stab the chord on every & (up-nod). Bounce off the keys like they're hot.", why: "The RELEASE is the skill. Note length = eighth note max. Snatch fingers off quickly." },
          { text: "4-8 bars, rest 10 seconds, repeat 3-4 times.", why: "Short sets. Quality over speed. Same principle as Sarah's counting drills." }
        ],
        feel: "A hiccup between beats. Same groove pocket as your &'s Only vocal drill. The silence on the numbers should feel deliberate.",
        wrong: "If stabs land ON the beat, slow to 70 and exaggerate silence on numbers. If notes ring too long, focus on the release speed — fingers off the keys faster.",
        metronome: 80,
        levelUp: "8 bars of even stabs at 90 BPM with clean release."
      },
      {
        id: "k1e2", time: 10, title: "Chord Change Chop (I-IV-V)", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4", "F4", "A4", "C5", "G4", "B4", "D5"], label: "I-IV-V: C F G" },
        what: "C(2 bars)-F(2 bars)-G(2 bars)-C(2 bars), chopping on &'s. Same finger shape shifts — thumb-middle-pinky stays 1-3-5.",
        setup: "Same organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "C = C4-E4-G4, F = F4-A4-C5, G = G4-B4-D5. All fingered 1-3-5.", why: "Same hand shape, just shifts position. Learn the jumps." },
          { text: "Chop C for 2 bars, then jump to F for 2 bars, G for 2 bars, back to C.", why: "The hardest moment is the transition. Hand jumps AND must land on the &." },
          { text: "Isolate just the C-to-F transition: chop C, jump to F, chop F, jump back. Repeat until instant.", why: "If there's a rhythmic gap at chord changes, this is where you fix it." },
          { text: "Run full cycle: C-F-G-C. 4 cycles without stopping.", why: "Building the muscle memory for the most common chord progression in music." }
        ],
        feel: "The transitions should feel like gear shifts — brief, smooth, no gap in the rhythm. The chop doesn't stop for chord changes.",
        wrong: "If there's a gap in rhythm at chord changes, slow down 5 BPM and isolate just the two-chord transition back and forth until the jump is instant.",
        metronome: 76,
        levelUp: "4 cycles at 84 BPM with no rhythmic gaps at chord changes."
      },
      {
        id: "k1e3", time: 10, title: "Bubble Organ", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "C Major — Bubble Hold" },
        what: "Longer offbeat hold (dotted eighth) — the breathing reggae organ sound. Press-hold-release-silence pattern. The silence before each press = the bounce.",
        setup: "Same organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Play C major on the &, but HOLD longer — about 60% of the space between beats.", why: "This is the 'bubble' sound. Bob Marley's keys player Tyrone Downie lived here." },
          { text: "The release creates a brief silence before the next &. That silence IS the bounce.", why: "Press-hold-release-silence. The silence makes it breathe." },
          { text: "Now alternate: 2 bars chop (short stabs), 2 bars bubble (long holds).", why: "Having both textures gives you dynamic range within the same rhythm." },
          { text: "Apply to C-F-G-C progression with bubble feel throughout.", why: "Same chords, different texture. The bubble makes it feel like waves." }
        ],
        feel: "Keys are breathing. Waves lapping on shore. The hold should feel lazy and warm, not tight.",
        wrong: "If the bubble sounds the same as the chop, you're releasing too early. Hold longer — almost until the next beat, then release just before.",
        metronome: 72,
        levelUp: "Smoothly alternate chop and bubble at 80 BPM on the I-IV-V-I."
      },
      {
        id: "k1e4", time: 10, title: "Minor Chord Chop", type: "keys",
        referencePitches: ["A3", "C4", "E4", "D4", "F4", "A4", "B3", "G4"],
        pianoKeys: { notes: ["A3", "C4", "E4", "D4", "F4", "A4", "E4", "G4", "B4"], label: "Am-Dm-Em Minor Chords" },
        what: "Am-Dm-Em-Am chopping on &'s. Reggae lives in minor keys — this is the actual sound. Different hand shapes from the major chords you learned.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Am = A4-C5-E5 (1-3-5). Chop 4 bars. Hear how it's darker, more melancholy than C major.", why: "Minor triads have a completely different emotional weight. This is roots reggae territory." },
          { text: "Dm = D4-F4-A4 (1-3-5). Chop 4 bars. Then Em = E4-G4-B4 (1-3-5).", why: "Three minor shapes. Each feels different under the hand." },
          { text: "Am-Dm-Em-Am progression, 2 bars each, chopping on &'s.", why: "Minor i-iv-v-i = the most common reggae progression. Bob Marley, Peter Tosh, Skinshape all live here." },
          { text: "Compare: play C-F-G-C (major) then Am-Dm-Em-Am (minor). Feel the mood shift.", why: "Same technique, completely different emotional impact. You need both." }
        ],
        feel: "Darker, more soulful. If major chords are midday sun, minor chords are golden hour. The chop should feel weightier.",
        wrong: "If Am sounds the same as C to you, play them back to back without the metronome. The minor 3rd (C vs C#) is the entire emotional difference.",
        metronome: 76,
        levelUp: "Am-Dm-Em-Am at 84 BPM with the same crisp chop as your major progression."
      },
      {
        id: "k1e5", time: 10, title: "Chop Tempo Ladder", type: "keys",
        pianoKeys: { notes: ["A3", "C4", "E4", "F4", "A4", "C5", "G4", "B4", "D5"], label: "Am-F-C-G Chop" },
        what: "Same Am-F-C-G chop at increasing tempos: 70, 80, 90, 100, 110 BPM. Find where your technique breaks down — that's your current ceiling.",
        setup: "Organ preset. Start metronome at 70 BPM.",
        steps: [
          { text: "70 BPM: 8 bars. This should feel easy, almost too slow. Focus on perfect release.", why: "Slow tempos reveal sloppy technique. If it's not clean here, it won't be clean faster." },
          { text: "80 BPM: 8 bars. Your Phase 1 comfort zone.", why: "This should feel like home by now." },
          { text: "90 BPM: 8 bars. Getting into real song territory (Groove Beat 90).", why: "Most of your backing tracks live around here." },
          { text: "100 BPM: 8 bars. Then 110 BPM: 8 bars. Where does it fall apart?", why: "The tempo where your stabs get sloppy or land on the beat = your ceiling. That's what you practice tomorrow." }
        ],
        feel: "Like shifting gears. Each jump should feel like a small challenge. The highest tempo where you're still clean = your working range.",
        wrong: "If you're sloppy above 90, don't push. Stay at 90 for a week. Speed comes from clean repetition, not from forcing.",
        metronome: 70,
        levelUp: "Clean chop at 110 BPM with no stabs landing on the beat."
      }
    ]
  },
  {
    num: 2, name: "Sound Good", focus: "Voicings + register",
    duration: "60 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Same organ preset, or browse B-3 V category for a drawbar/Hammond-style organ.",
    exercises: [
      {
        id: "k2e1", time: 10, title: "Triad Inversions", type: "keys",
        referencePitches: ["C4", "E4", "G4", "C5"],
        pianoKeys: { notes: ["C4", "E4", "G4", "C5"], label: "C Major Inversions" },
        what: "Root position (C-E-G), 1st inversion (E-G-C), 2nd inversion (G-C-E) — same chord, three colors. 1st inversion = classic reggae skank. 2nd inversion = open, spacious, great for surf.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Play C root position: C4-E4-G4 (1-3-5). Chop 4 bars.", why: "This is what you know. Home base." },
          { text: "Play C 1st inversion: E4-G4-C5 (1-3-5). Chop 4 bars. Hear the brightness.", why: "1st inversion = the classic reggae skank sound. Bright, cuts through the mix." },
          { text: "Play C 2nd inversion: G4-C5-E5 (1-3-5). Chop 4 bars. Hear the openness.", why: "2nd inversion = open, spacious. Great for surf and dreamy sections." },
          { text: "Now play C-F-G-C all in 1st inversion: E4-G4-C5, F4-A4-C5 (already root!), G4-B4-D5, E4-G4-C5.", why: "1st inversion keeps everything in the sweet spot and minimal hand movement." }
        ],
        feel: "Each inversion should sound noticeably different even though it's the same chord. 1st inversion should feel 'right' for the chop — bright and cutting.",
        wrong: "If all inversions sound the same to you, play them back to back slowly without the metronome. The color difference is subtle but real.",
        metronome: 76,
        levelUp: "I-IV-V-I in first inversion at 80 BPM with confident chop."
      },
      {
        id: "k2e2", time: 10, title: "The Sweet Spot (C4-C5 Range)", type: "keys",
        pianoKeys: { notes: ["E4", "G4", "C5", "A4", "F4"], label: "C-Am-F-G Sweet Spot", range: ["C4", "D5"] },
        what: "All chords voiced between middle C and the C above it. Below C4 = bass player's territory. Above C5 = thin. C4-C5 = the pocket where reggae/indie keys live.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "Voice-led C-Am-F-G: C = E4-G4-C5 (1st inv), Am = A4-C5-E5 or C4-E4-A4 (1st inv), F = F4-A4-C5 (root), G = G4-B4-D5 (root).", why: "Find inversions where your hand barely moves between chords. Opposite of guitar reshaping." },
          { text: "Play through C-Am-F-G slowly. Move only 1-2 fingers per change.", why: "Voice leading = minimal movement. Common tones (notes shared between chords) stay put." },
          { text: "Chop the progression. Focus on staying in the C4-C5 range.", why: "This range sits above the bass and below the vocal. The keyboard pocket." },
          { text: "Try different inversion combos. Find what sounds best to YOUR ear.", why: "There's no single right answer. Trust your ear training from Sarah's work." }
        ],
        feel: "The progression should flow smoothly. Your hand barely moves. Each chord change should feel like a small adjustment, not a big jump.",
        wrong: "If your hand is jumping more than a 3rd between chords, you're using the wrong inversions. Find the inversion where the most notes stay the same.",
        metronome: 76,
        levelUp: "Voice-led C-Am-F-G at 84 BPM with minimal hand movement."
      },
      {
        id: "k2e3", time: 10, title: "Add9 and Sus Voicings", type: "keys",
        referencePitches: ["C4", "D4", "E4", "F4", "G4", "A4", "B♭4"],
        pianoKeys: { notes: ["E4", "G4", "C5", "D5", "F4", "G4"], label: "Cadd9 / Fsus2 / Gsus4" },
        what: "Cadd9, Fsus2, Gsus4 — the beachy shimmer. These are the voicings that make indie/surf keys sound like themselves instead of generic.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Cadd9: E4-G4-C5-D5 (fingers 1-2-4-5). The D5 adds shimmer.", why: "This is Skinshape and BALTHVS territory. The add9 = instant beach." },
          { text: "Fsus2: F4-G4-C5 (fingers 1-2-5). No 3rd = dreamy, floating ambiguity.", why: "Removing the 3rd removes major/minor identity. Pure atmosphere." },
          { text: "Gsus4: G4-C5-D5 (fingers 1-4-5). Resolve to G major: G4-B4-D5 (1-3-5).", why: "Sus4 to major = classic reggae/surf tension-release." },
          { text: "Full progression: Cadd9-Am-Fsus2-Gsus4(resolve to G). Chop it.", why: "This is immediately usable in the band. Extended voicings + chop = your sound." }
        ],
        feel: "These voicings should sound richer and more interesting than plain triads. The add9 sparkles, the sus2 floats, the sus4 pulls toward resolution.",
        wrong: "If the 4-note voicings feel cramped, spread your hand wider. Fingers 1-2-4-5 skips the middle finger — let it hover.",
        metronome: 72,
        levelUp: "Fluent Cadd9-Am-Fsus2-Gsus4-G progression at 80 BPM."
      },
      {
        id: "k2e4", time: 10, title: "Minor Inversions", type: "keys",
        pianoKeys: { notes: ["A4", "C5", "E5", "C4", "E4", "A4", "D4", "F4"], label: "Am-Dm-Em Inversions" },
        what: "Am, Dm, Em in root, 1st, and 2nd inversion. Minor inversions feel different under the hand — the intervals are flipped compared to major. 1st inversion minor = warm and dark, the go-to reggae voicing.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Am root: A4-C5-E5 (1-3-5). 1st inv: C4-E4-A4 (1-3-5). 2nd inv: E4-A4-C5 (1-2-5).", why: "Play each, hear the color difference. 1st inversion Am = the classic reggae minor sound." },
          { text: "Dm root: D4-F4-A4. 1st inv: F4-A4-D5. 2nd inv: A4-D5-F5.", why: "Same three shapes. 1st inversion Dm sits perfectly in the C4-C5 sweet spot." },
          { text: "Em root: E4-G4-B4. 1st inv: G4-B4-E5. 2nd inv: B4-E5-G5.", why: "Em 2nd inversion reaches high — good for cutting through a full band." },
          { text: "Am-Dm-Em-Am all in 1st inversion. Chop it. Feel the voice leading.", why: "1st inversion minor progression with minimal hand movement = your dark-mood sound." }
        ],
        feel: "1st inversion minor chords sound warm and intimate. The progression should feel like it's telling a story — melancholy but beautiful.",
        wrong: "If minor inversions all sound the same, play root position then 1st inversion back to back on the same chord. The bass note changes the whole character.",
        metronome: 72,
        levelUp: "Am-Dm-Em-Am in 1st inversion at 80 BPM with smooth voice leading."
      },
      {
        id: "k2e5", time: 10, title: "Seventh Chord Voicings", type: "keys",
        referencePitches: ["A3", "C4", "E4", "G4", "B♭4", "D4", "F4", "B4"],
        pianoKeys: { notes: ["C4", "E4", "G4", "B4", "A4", "C5", "E5", "D4", "F4", "A4"], label: "Cmaj7-Am7-Dm7-G7" },
        what: "Am7, Dm7, G7, Cmaj7 — four-note voicings that are essential for the Khruangbin/indie soul sound. The 7th adds sophistication without complexity. This is the sonic step up from basic triads.",
        setup: "Organ or Rhodes preset. Metronome at 72 BPM.",
        steps: [
          { text: "Am7: A4-C5-E5-G5 (1-2-4-5) or compact: C4-E4-G4-A4 (1-2-3-5). The G natural is the 7th.", why: "Am7 = Am + the note one whole step below the root. Warmer, jazzier, more soulful." },
          { text: "Dm7: D4-F4-A4-C5 (1-2-4-5). G7: G4-B4-D5-F5 (1-2-4-5).", why: "Dm7 and G7 are the ii-V of C major. This is the backbone of soul, jazz, and Khruangbin." },
          { text: "Cmaj7: C4-E4-G4-B4 (1-2-3-5). The B natural = dreamy, bittersweet major.", why: "Cmaj7 is the most beautiful chord on keys. The major 7th shimmers." },
          { text: "Progression: Cmaj7-Am7-Dm7-G7. Chop it, then try sustained. Both sound great.", why: "This is the classic I-vi-ii-V in 7th chords. Instant sophistication for any song." }
        ],
        feel: "7th chords should sound like an upgrade — richer, more complex, more 'adult' than triads. The Khruangbin/Skinshape sound lives in these voicings.",
        wrong: "If four notes feel awkward, start with just the top three notes of each chord (drop the root). Let the bass player handle the root.",
        metronome: 72,
        levelUp: "Cmaj7-Am7-Dm7-G7 at 80 BPM, chopped and sustained, both clean."
      },
      {
        id: "k2e6", time: 10, title: "Voicing Ear Training", type: "keys",
        pianoKeys: { notes: ["C4", "E4", "G4"], label: "Ear Training Reference" },
        what: "Listen to 30-60 seconds of a Khruangbin, Allah-Las, or Skinshape track. Identify: is the keyboard playing root position, 1st inversion, or 2nd inversion? High register or low? Then try to match it.",
        setup: "Any preset. Spotify or YouTube ready. No metronome — this is listening work.",
        steps: [
          { text: "Pick a track with audible keys: try Khruangbin 'Evan Finds the Third Room', Allah-Las 'Tell Me', or Skinshape 'I Didn't Know'.", why: "These tracks have clear, exposed keyboard parts you can study." },
          { text: "Listen to 30 seconds. Focus only on the keys. Where are they in the frequency range? High? Mid? Low?", why: "Register awareness. Training your ear to isolate the keyboard in a mix." },
          { text: "Try to find the chord on your keyboard. Start with the root note, then build the voicing.", why: "Ear-to-hand connection. This is how you'll learn parts for your band." },
          { text: "Don't worry about getting it perfect. Getting close teaches you more than getting it right.", why: "The process of searching = ear training. Even wrong guesses develop your ear." }
        ],
        feel: "Like detective work. You're listening through the mix to find the keyboard's role. It should feel like zooming in on one layer of a painting.",
        wrong: "If you can't hear the keys at all, pick a different track with more prominent keys. Or try headphones — keys often sit in the stereo sides.",
        levelUp: "Correctly identify the register and approximate voicing on 3 different tracks."
      }
    ]
  },
  {
    num: 3, name: "Lock In", focus: "Play with drums",
    duration: "50 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V (same organ preset). Practice app open in browser — you'll use the Audio Player for backing tracks. Both Ableton and the browser play through the same audio output.",
    exercises: [
      {
        id: "k3e1", time: 10, title: "Left Hand Bass + Right Hand Chop", type: "keys",
        what: "Right hand chops on &'s (autopilot from Phase 1). Left hand: root note with pinky (5) or thumb (1) on beats 1 & 3. Two hands interleave: LEFT-right-LEFT-right.",
        setup: "Organ preset. Metronome at 72 BPM.",
        steps: [
          { text: "Right hand: chop C major (1st inversion, E4-G4-C5) on &'s. This should be on autopilot.", why: "Phase 1 skills. If this isn't automatic yet, go back and drill more." },
          { text: "Left hand: hit C3 (pinky, finger 5) on beats 1 and 3 only.", why: "Left-right-left-right interleaving. Same concept as vocal offbeat drills where nod = downbeat." },
          { text: "Apply to C-Am-F-G. Left hand roots: C3, A2, F3, G3.", why: "Both hands change together. Slow to 60 BPM if the coordination falls apart." },
          { text: "Run 4 cycles. Left hand should feel heavy/anchoring, right hand light/percussive.", why: "This is a complete musical picture — bass and harmony from one player." }
        ],
        feel: "Left hand heavy and anchoring, right hand light and percussive. Together they create a complete groove that sounds like bass + keys.",
        wrong: "If both hands drift to the same rhythm, strip back: left hand only for 4 bars, right hand only for 4 bars, then combine. Build the independence.",
        metronome: 72,
        levelUp: "Both hands through C-Am-F-G at 80 BPM without rhythmic drift."
      },
      {
        id: "k3e2", time: 10, title: "Play with Your Backing Tracks", type: "keys",
        what: "Same backing tracks you already use for guitar practice. Groove Beat 90 BPM and Surf Rock 120 BPM from the practice app's Audio Player. Keyboard sound through Ableton, both on same laptop.",
        setup: "Organ preset in Ableton. Open practice app Audio Player in browser.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }, { name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Play Groove Beat 90 BPM from the Audio Player. Listen 4 bars first — same approach Sarah taught for guitar entry.", why: "Lock to the hi-hat before playing. Find the groove, then join it." },
          { text: "Enter with chops. Lock your &'s to the hi-hat. Left hand bass to the kick.", why: "Your keyboard becomes part of the drum kit. Percussion that happens to have pitch." },
          { text: "Switch to Surf Rock 120 BPM. Same exercise, faster. Same tracks you already know.", why: "Faster tempo tests whether the chop is truly automatic." },
          { text: "Play 5 minutes straight without stopping. If you drift, re-enter on next beat 1.", why: "Same recovery skill as your ILTWYW drill. Don't stop, just re-enter." }
        ],
        feel: "The keyboard should feel like part of the drum kit. Your chops are percussion that happens to have pitch. If it grooves, you're there.",
        wrong: "If you're consistently late or early against the track, isolate: just right hand chop with the track, no bass. Get that locked first.",
        metronome: 90,
        levelUp: "5-minute run on each track with fewer than 2 drifts."
      },
      {
        id: "k3e3", time: 10, title: "One Drop", type: "keys",
        what: "Right hand chops on &'s, soften the & of 1 (the 'hole' in one-drop). Left hand root ONLY on beat 3 — aligns with one-drop kick drum. The absence of beat 1 = weightlessness.",
        setup: "Organ preset. Metronome at 76 BPM. Search YouTube for 'one drop drum loop 76 BPM' for a backing loop.",
        steps: [
          { text: "Right hand: chop on all &'s, but play the & of 1 softer (ghost it).", why: "The 'hole' on beat 1 is what makes one-drop feel like floating." },
          { text: "Left hand: root note ONLY on beat 3. Nothing on beat 1.", why: "The kick-on-3 + your bass-on-3 = the 'drop' in 'one-drop'." },
          { text: "Am-Dm-G-C progression. Pure indie reggae.", why: "Minor-heavy progression suits the one-drop feel. Melancholy groove." },
          { text: "Accent the & of 3 slightly. This is where the pocket deepens.", why: "The & of 3 lands right after the drop. A slight accent makes the groove bounce." }
        ],
        feel: "Floating. The absence of beat 1 = weightlessness. That's the 'drop' in 'one-drop'. You should feel suspended between beats.",
        wrong: "If the one-drop feel isn't clicking, strip to right hand only and really exaggerate the silence on beat 1. Ghost it until you can barely hear it.",
        metronome: 76,
        levelUp: "One-drop Am-Dm-G-C at 82 BPM with intentional & of 3 accent."
      },
      {
        id: "k3e4", time: 10, title: "Snare Lock (Backbeat Chop)", type: "keys",
        what: "Chop ONLY on beats 2 and 4 — right on the snare. This is the half-time chop: less busy, more powerful, locks you to the drummer's backbeat instead of every &.",
        setup: "Organ preset. Play Groove Beat 90 BPM from Audio Player.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Listen to 4 bars. Find the snare hits — they're on beats 2 and 4.", why: "The snare is the drummer's anchor. Locking to it makes you part of the same instrument." },
          { text: "Chop Am7 ONLY on 2 and 4. Silent on 1 and 3. Silent on all &'s.", why: "This is half as many chops as your normal pattern. The space between is the power." },
          { text: "Left hand: root on beat 1 only. So you get: BASS(1)-silence-CHOP(2)-silence-silence-CHOP(4)-silence.", why: "Bass on 1, chop on 2 and 4 = the classic soul/reggae backbeat feel." },
          { text: "Now compare: play the same progression with every-& chop, then switch to backbeat-only. Hear the difference.", why: "Every-& = energy, busy. Backbeat = power, space. You need both in your toolkit." }
        ],
        feel: "Powerful and sparse. Like a heartbeat. The silences on 1 and 3 should feel heavy with intention, not empty.",
        wrong: "If you keep filling in the &'s out of habit, count out loud: 'ONE - chop - THREE - chop' to retrain the pattern.",
        metronome: 90,
        levelUp: "Backbeat chop locked to snare on Groove Beat 90 for 3 minutes without extra hits."
      },
      {
        id: "k3e5", time: 10, title: "Groove Speed Run", type: "keys",
        what: "Full two-hand groove (chop + bass) through 80, 100, 120, and 140 BPM. Find where your hands desync — that's your current coordination ceiling.",
        setup: "Organ preset. Start metronome at 80 BPM.",
        steps: [
          { text: "80 BPM: Am-F-C-G, right hand chop + left hand bass on 1 & 3. 8 bars.", why: "Comfort zone. Both hands should be automatic here." },
          { text: "100 BPM: same groove, 8 bars. Feel the tempo push.", why: "100 BPM = a lot of rock and upbeat reggae. Real gigging tempo." },
          { text: "120 BPM: 8 bars. This is surf rock territory. Is the left hand still clean?", why: "At faster tempos, the left hand often gets lazy or late. That's the weak link." },
          { text: "140 BPM: 8 bars. Push the limit. Where does it fall apart?", why: "The breaking point shows you exactly what to practice. Usually it's the chord transitions." }
        ],
        feel: "Like a stress test. Each tempo should feel slightly harder. The goal isn't perfection at 140 — it's knowing your limits.",
        wrong: "If both hands desync above 100, go back to 100 and drill just the transitions (chord changes) at that tempo until they're instant.",
        metronome: 80,
        levelUp: "Clean two-hand groove at 120 BPM for a full Am-F-C-G cycle."
      }
    ]
  },
  {
    num: 4, name: "Serve the Song", focus: "Dynamics + arrangement",
    duration: "50 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Main organ preset, plus browse a Wurlitzer V or Stage-73 V preset for electric piano verse textures.",
    exercises: [
      {
        id: "k4e1", time: 10, title: "Dynamic Verse/Chorus", type: "keys",
        what: "VERSE: chop, right hand only, mp (medium quiet). No left hand bass. Sparse. CHORUS: chop + left hand bass, f (forte). Full energy. Same chords, completely different feel.",
        setup: "Organ preset. Metronome at 90 BPM.",
        steps: [
          { text: "VERSE (G-Em-C-D): right hand chop only, played softly. No left hand.", why: "Sparse = space for vocals and guitar. The verse breathes." },
          { text: "CHORUS (C-G-Am-F): add left hand bass on 1 & 3, chop louder.", why: "The addition of bass and volume = instant energy lift. The contrast IS the arrangement." },
          { text: "Alternate: Verse (8 bars) → Chorus (8 bars) → Verse → Chorus.", why: "Practice the transition. The energy shift should be dramatic." },
          { text: "Make the volume difference obvious. Verse at 4/10, chorus at 8/10.", why: "Beginners don't differentiate enough. Exaggerate until it feels like two different songs." }
        ],
        feel: "The verse should feel like whispering, the chorus like talking. Same chords, completely different energy. The contrast IS the arrangement.",
        wrong: "If verse and chorus sound the same, you're not differentiating enough. Try removing left hand entirely in verse. Make the gap bigger.",
        metronome: 90,
        levelUp: "V-C-V-C with audible, dramatic energy difference between sections."
      },
      {
        id: "k4e2", time: 10, title: "Register Separation from Guitar", type: "keys",
        what: "Play along with a backing track that has guitar. Stay in C5-C6 range. Sometimes sustained chords are the entire keyboard part. Backbeat chop (beats 2 & 4 only) when guitar already strums full rhythm.",
        setup: "Electric piano or organ preset. Metronome at 100 BPM. Find a YouTube guitar backing track.",
        steps: [
          { text: "Play along with guitar track. Voice chords in C5-C6 range — above the guitar.", why: "Staying high keeps you out of the guitar's register. Less mud, more clarity." },
          { text: "Start with just sustained chords — hold for 2-4 bars each.", why: "Sometimes that IS the entire keyboard part. Khruangbin, Tommy Guerrero vibes." },
          { text: "Switch to backbeat chop: stab on beats 2 & 4 only, not every &.", why: "When guitar already has the rhythm, you add accents, not competition." },
          { text: "LAY OUT for 4 bars, then re-enter. The absence makes re-entry more powerful.", why: "The most important keyboard skill: knowing when NOT to play." }
        ],
        feel: "You should feel like you're adding color, not filling space. If removing your part wouldn't change anything, play less.",
        wrong: "If the guitar and keys sound muddy together, you're in the wrong octave. Move up. If the rhythm feels cluttered, switch to sustained chords or lay out.",
        metronome: 100,
        levelUp: "3 min with backing track, alternating sustained/chop/layup smoothly."
      },
      {
        id: "k4e3", time: 10, title: "The Art of Not Playing", type: "keys",
        what: "Play along with a full song from your rotation (Allah-Las, Skinshape, Sun Room). Rule: be SILENT for at least 30% of the song. Test: is the song better with your keys? Would anyone miss them if removed?",
        setup: "Any preset. Play a full song from Spotify or your library. No metronome — follow the song.",
        steps: [
          { text: "Listen first, full song, no playing. Map: where are the gaps? Where is it already full?", why: "You can't serve a song you haven't listened to. Map before you play." },
          { text: "Play along the second time. Start minimal. Add only what's missing.", why: "Enter late, leave early. The song existed before you added keys." },
          { text: "You must be SILENT for at least 1/3 of the song. Count the sections you skip.", why: "Restraint is a skill. Silence is a musical choice, not a failure." },
          { text: "Test: is the song better with your keys? Would anyone miss them if removed? Both must be yes.", why: "If either answer is no, you played too much or in the wrong places." }
        ],
        feel: "The silences should feel intentional, like a photographer choosing what to leave out of the frame. Your entries should feel like gifts.",
        wrong: "If you can't stop playing, set a physical rule: hands in lap during verses, only play choruses. Build restraint as a habit.",
        levelUp: "3 songs where your keys part passes both tests."
      },
      {
        id: "k4e4", time: 10, title: "Build an Intro", type: "keys",
        what: "Create a 4-8 bar keyboard intro that sets the song's mood before the band enters. The intro is the audience's first impression — it should say 'here's where we're going' without giving everything away.",
        setup: "Pad preset for atmospheric intro, organ preset ready for when the groove kicks in. Metronome at 90 BPM.",
        steps: [
          { text: "Pick a chord: Am7. Hold it as a pad with reverb for 4 bars. Let the reverb bloom.", why: "A single sustained chord = suspense. The audience leans in." },
          { text: "Bar 5: add a slow arpeggiation — play the chord tones one by one (A, C, E, G). One per beat.", why: "Movement enters the stillness. The intro is waking up." },
          { text: "Bar 7: switch to organ, chop enters on the &'s. The groove starts.", why: "The transition from pad to chop = the song beginning. The band knows to come in." },
          { text: "Try different intros: start with tremolo organ, start with a single high note, start with just bass. Variety.", why: "Every song needs a different intro. Build a vocabulary of openings." }
        ],
        feel: "Like a movie opening. The intro sets expectations. Pad = atmospheric opening. Arpeggiation = something's building. Chop = we're in the song.",
        wrong: "If the intro is too busy, strip it back. The best intros are often one chord, one sound, one idea. Let the simplicity draw people in.",
        metronome: 90,
        levelUp: "3 different intros (pad, tremolo, minimal) that each feel like a different movie opening."
      },
      {
        id: "k4e5", time: 10, title: "Ghost the Vocalist", type: "keys",
        what: "Play along with a vocal track. When the singer is loud, you're quiet. When the singer breathes (gaps between phrases), you're slightly louder. You're filling holes, not competing. This is the #1 band keyboard skill.",
        setup: "Any organ or Rhodes preset. Play a vocal-heavy track (BALTHVS 'Anouk', Skinshape 'I Didn't Know', Sun Room 'Sol Del Sur').",
        steps: [
          { text: "First listen: map the vocal phrases. Where does the singer breathe? Where are the gaps?", why: "The gaps between vocal phrases = your space. Never play over the vocal." },
          { text: "Play along. During vocal phrases: chop very quietly (3/10 volume) or lay out entirely.", why: "The voice is the star. Your job is to support, not compete." },
          { text: "In vocal gaps: slight volume increase (6/10), maybe a small fill or sustained chord.", why: "The gap is your moment to add color. Brief, tasteful, then back to quiet." },
          { text: "Think of it as a volume conversation: when they're up, you're down. When they breathe, you fill.", why: "This push-pull creates musical breathing. It's what makes great bands sound great." }
        ],
        feel: "Like ballroom dancing — you're following, not leading. The vocalist moves, you respond. Your volume should breathe with theirs.",
        wrong: "If you can hear your keys over the vocal at any point, you're too loud. Turn down. Way down. Then turn down more.",
        levelUp: "Play along with 3 vocal tracks where your keys complement without ever covering the voice."
      }
    ]
  },
  {
    num: 5, name: "Add Texture", focus: "Pad + tremolo + effects",
    duration: "50 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Surf: Farfisa V or Vox Continental V with tremolo/vibrato ON. Pad: Mellotron V category or any warm synth pad. In Ableton: add Reverb (Decay 3s+, Dry/Wet 70%+) and Simple Delay (dotted-eighth, ~30% wet) on the pad channel.",
    exercises: [
      {
        id: "k5e1", time: 10, title: "Surf Organ Tremolo", type: "keys",
        what: "Hold chord for 4 bars, let the organ's tremolo/vibrato do the work. Am-G-F-E surf turnaround with dynamic swells into each chord change. This is the Allah-Las / Mystic Braves sound.",
        setup: "Farfisa V or Vox Continental V preset with tremolo ON (medium speed, ~5-6 Hz). Metronome at 120 BPM.",
        steps: [
          { text: "Am chord, hold 4 bars. Don't chop — just hold keys down and let tremolo pulse.", why: "The tremolo does the rhythmic work. You just hold. Totally different skill from chopping." },
          { text: "Dynamic swells: press keys harder going into each chord change.", why: "Velocity sensitivity creates natural crescendos. The swell = emotional lift." },
          { text: "Am-G-F-E surf turnaround. Hold each chord 2-4 bars.", why: "The classic surf progression. Minor to major descent = melancholy to resolution." },
          { text: "Try with add9 voicings: Am(add9)-Gadd9-Fmaj7-E. Extensions + tremolo = instant surf.", why: "Extended voicings from Phase 2 make tremolo organ sound vintage and rich." }
        ],
        feel: "Should sound like a 1960s beach party. The tremolo creates movement you don't have to play. Your job is just smooth chord changes and dynamic swells.",
        wrong: "If it sounds static, increase tremolo depth or speed. If chord changes are jarring, practice the voice-leading — find inversions with minimal movement.",
        metronome: 120,
        levelUp: "Smooth Am-G-F-E with swells at 120 BPM that sounds like vintage surf."
      },
      {
        id: "k5e2", time: 10, title: "Ambient Pad Chords", type: "keys",
        what: "Pad/synth preset with reverb bloom. Cadd9 held 8 beats, slow overlap transition to Am7. Overlapping changes = dreamy wash. Add delay arpeggiation for cascading echoes. Goth Babe / BALTHVS / Skinshape sound.",
        setup: "Mellotron V or warm synth pad preset. Reverb + dotted-eighth delay in Ableton. Metronome at 60 BPM.",
        steps: [
          { text: "Cadd9 held for 8 beats. Let reverb bloom around the chord. Don't rush.", why: "Pad playing = patience. The reverb tail IS the arrangement." },
          { text: "Transition to Am7: overlap — hold Cadd9 while pressing Am7 notes, then release Cadd9.", why: "Overlapping chord changes create a dreamy wash. Opposite of the crisp chop." },
          { text: "Add delay arpeggiation: play one note per beat (E4, G4, C5, D5), let echoes cascade.", why: "The delay stacks echoes into harmony. Simple patterns become complex textures." },
          { text: "Cadd9-Am7-Fmaj7-G with reverb bloom and delay. Slow, spacious, golden hour.", why: "This is the other half of your band's sound. Reggae chop for energy, pad for atmosphere." }
        ],
        feel: "Lo-fi, reverb-drenched, golden hour. Each note should bloom and fade. The spaces between notes are as important as the notes.",
        wrong: "If it sounds muddy, you're changing chords too fast or playing too many notes. Simplify — fewer notes, more space, more reverb.",
        metronome: 60,
        levelUp: "Cadd9-Am7-Fmaj7-G with reverb bloom and delay arpeggiation that sounds dreamy."
      },
      {
        id: "k5e3", time: 10, title: "Texture Switching: Chop to Pad", type: "keys",
        what: "8 bars reggae (Am-Dm-G-C chop + one-drop bass) on organ, then switch to sustained pad (Am-G-F-E held chords), then back. Practice the Ableton preset switch until it takes less than 1 beat.",
        setup: "Two Ableton tracks: organ (chop) and pad (sustained). Practice switching between them via track arm or MIDI mapping. Metronome at 100 BPM.",
        steps: [
          { text: "8 bars reggae: Am-Dm-G-C chop + one-drop left hand bass on organ.", why: "Phase 1-3 skills combined. This should be comfortable territory." },
          { text: "Transition bar: switch Ableton track to pad, hold chord. The switch should take less than 1 beat.", why: "In a band, the music doesn't stop for you to switch sounds. Speed matters." },
          { text: "8 bars surf: Am-G-F-E, held chords with tremolo organ or pad.", why: "Phase 5 sustained playing. Let the texture do the work." },
          { text: "Transition back: switch to organ, cut to chop on & of 4. Reggae-surf-reggae twice.", why: "This is the core of your band — reggae verse to surf chorus and back." }
        ],
        feel: "The transition should feel like a scene change in a movie — same story, different mood. Reggae = daytime energy, surf/pad = sunset atmosphere.",
        wrong: "If the switch is clunky, practice just the transition: last bar of chop → first bar of pad, back and forth. Get the Ableton switching automatic.",
        metronome: 100,
        levelUp: "Reggae-surf-reggae cycle twice at 108 BPM with smooth transitions."
      },
      {
        id: "k5e4", time: 10, title: "Effect Rides (KeyLab Encoders)", type: "keys",
        what: "While holding a chord, manipulate reverb dry/wet and delay feedback in real-time using your KeyLab 49 encoders or Ableton's knobs. The effect parameters become your expression — like a guitarist's wah pedal.",
        setup: "Pad preset with Reverb and Delay. Map a KeyLab encoder to Reverb Dry/Wet and another to Delay Feedback in Ableton (MIDI Learn).",
        steps: [
          { text: "Hold Am7 as a pad. Slowly turn Reverb Dry/Wet from 30% to 100% over 4 bars.", why: "The reverb swell = the sound opening up. Like a camera pulling back to reveal the landscape." },
          { text: "Now bring it back down to 30% over 4 bars. The sound closes, becomes intimate again.", why: "The ride = expression. You're painting with the effect, not just the notes." },
          { text: "Same with Delay Feedback: turn it up and the echoes multiply, stacking into walls of sound.", why: "Delay feedback = controlled chaos. Dial it up for psychedelic moments, back down for clarity." },
          { text: "Combine: swell reverb for 8 bars, add delay, build to a peak, then pull everything back.", why: "This is how Khruangbin and Tommy Guerrero create those spacious, evolving textures." }
        ],
        feel: "Like you're conducting the atmosphere of the room. The notes stay the same but the SPACE around them changes. This is textural expression.",
        wrong: "If it sounds like a mess, you're moving the knobs too fast. Slow, gradual sweeps. The ear needs time to register the change.",
        metronome: 60,
        levelUp: "8-bar reverb swell + delay build that sounds intentional and cinematic."
      },
      {
        id: "k5e5", time: 10, title: "Two-Texture Layering", type: "keys",
        what: "Left hand holds a low bass/pad note (C2-C3 range), right hand plays organ chop above. Two sonic layers from one keyboard simultaneously. This is how one keyboard player fills the room.",
        setup: "In Ableton: set up keyboard split or two tracks. Low notes (below C3) route to pad/bass sound, high notes (C3+) route to organ. Or use Analog Lab V split mode.",
        steps: [
          { text: "Left hand: hold C2 as a bass pad note. Long sustained note with reverb.", why: "The low pad fills the bottom end. In a band context, you'd only do this when the bass player lays out." },
          { text: "Right hand: chop Am (C4-E4-A4) on &'s above the sustained bass.", why: "Two layers: sustained bottom, rhythmic top. One player, full sound." },
          { text: "Change left hand: move to F2, then G2, then back to A2. Slow whole-note changes.", why: "The bass pad moves like a glacier while the chop dances above it. Tempo contrast between hands." },
          { text: "Try: left hand holds a note, right hand plays surf tremolo chords above. Different texture combo.", why: "Any combination works: pad+chop, pad+tremolo, bass+arpeggiation. Build your combinations." }
        ],
        feel: "Like operating two instruments at once. The left hand is a drone or bass player, the right hand is the keyboard player. Together they fill the sonic space.",
        wrong: "If the two layers clash, check your register separation. Left hand must stay below C3, right hand above C4. The gap between = the bass player's space.",
        metronome: 80,
        levelUp: "Sustained bass pad + organ chop over Am-F-G progression, hands fully independent."
      }
    ]
  },
  {
    num: 6, name: "Add Color", focus: "Fills + scales + modes",
    duration: "60 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. Farfisa V for organ fills, or browse Wurlitzer V / Stage-73 V for a warmer Rhodes melodic tone.",
    exercises: [
      {
        id: "k6e1", time: 10, title: "Mixolydian Fills", type: "keys",
        what: "G Mixolydian (G-A-B-C-D-E-F-G) — the flat 7th (F natural instead of F#) is THE reggae sound. Play chord chop for 3 bars, quick 4-note ascending fill on bar 4, resume chop.",
        setup: "Organ preset. Metronome at 76 BPM.",
        steps: [
          { text: "G Mixolydian: G-A-B-C-D-E-F-G. Fingering: thumb G, index A, middle B, tuck thumb under to C, index D, middle E, ring F, pinky G.", why: "The flat 7th (F natural, not F#) = the reggae/surf color note." },
          { text: "Chop G chord for 3 bars. On bar 4, play a quick 4-note ascending fill: D-E-F-G.", why: "Fills are 2-4 notes. Brief comment between sentences, not a speech." },
          { text: "C Mixolydian (C-D-E-F-G-A-Bb-C) over C chord. Same pattern: 3 bars chop, 1 bar fill.", why: "Same idea, different key. Bb is the color note in C Mixolydian." },
          { text: "Practice inserting fills at different points. Always stepwise motion, always brief.", why: "Fills should feel like they grew naturally from the chop, not like a separate event." }
        ],
        feel: "The fill should feel like a natural exhale — it comes out of the groove and returns to it. If you have to think about it, it's too complex.",
        wrong: "If fills sound random or disconnected, simplify to 2 notes. The fill must resolve back to a chord tone (G, B, or D for G chord).",
        metronome: 76,
        levelUp: "Chop with Mixolydian fills at 82 BPM that feel like part of the groove."
      },
      {
        id: "k6e2", time: 10, title: "Pentatonic Runs", type: "keys",
        what: "A minor pentatonic (A-C-D-E-G) over Am-G-F-E. One scale covers all 4 chords — no wrong notes. Dynamic arc: start low/quiet, build to high/loud, descend to resolve.",
        setup: "Organ or Rhodes preset with tremolo. Metronome at 120 BPM.",
        steps: [
          { text: "A minor pentatonic: A-C-D-E-G. Five notes, no wrong notes over Am-G-F-E.", why: "The pentatonic scale is the safest melodic toolkit. Everything sounds good." },
          { text: "Start low and quiet: A3-C4-D4. Build to high and loud: E5-G5-A5.", why: "The dynamic arc IS the solo. Low-to-high + quiet-to-loud = natural tension-release." },
          { text: "Descend back down to resolve. Keep it SHORT: 4-8 bars max, then back to comping.", why: "You're adding color, not soloing. Brief is beautiful. Back to chop after." },
          { text: "With tremolo organ, even simple 3-note patterns sound vintage and cool.", why: "The preset does half the work. Simple patterns + good sound = effortless style." }
        ],
        feel: "Effortless. No wrong notes means you can focus entirely on dynamics and phrasing. With tremolo, even simple runs sound cinematic.",
        wrong: "If runs sound like exercises (evenly spaced, same volume), add dynamics: start a note quieter, end a note louder. Shape the phrase.",
        metronome: 120,
        levelUp: "8-bar pentatonic run with clear dynamic arc at 130 BPM."
      },
      {
        id: "k6e3", time: 10, title: "Dorian Mode for Dub", type: "keys",
        what: "D Dorian (D-E-F-G-A-B-C-D) — like D minor but with B natural instead of Bb. The raised 6th = bittersweet, hopeful minor. THE dub/deep reggae mode.",
        setup: "Organ preset. Metronome at 70 BPM. Deep, slow dub tempo.",
        steps: [
          { text: "D Dorian: D-E-F-G-A-B-C-D. The B natural (not Bb) is the color note.", why: "This one note difference from D natural minor = the entire Dorian character." },
          { text: "Dm chord chops with occasional Dorian fills emphasizing B natural.", why: "The B natural should appear in most fills. It's the flavor note." },
          { text: "Left hand: deep bass D2 or D3 on beat 3 (one-drop). Right hand: chop + fills.", why: "One-drop bass + Dorian fills = instant dub atmosphere." },
          { text: "Progression: Dm-G-Am-Dm (i-IV-v-i in Dorian). G major contains B natural, highlighting the sound.", why: "The G major chord IS the Dorian sound made harmonic. B natural in both the scale and the chord." }
        ],
        feel: "Melancholy but not depressing — minor key at sunset. Slow dub tempos let every note breathe. The B natural adds a ray of light.",
        wrong: "If it sounds like plain D minor, you're not hitting B natural enough in your fills. Make it deliberate — land on B, let it ring.",
        metronome: 70,
        levelUp: "Dm-G-Am-Dm with Dorian fills at 76 BPM. B natural appears in most fills."
      },
      {
        id: "k6e4", time: 10, title: "Call and Response", type: "keys",
        what: "Hum 2 bars of a vocal line (any band song). Play a 2-beat keyboard fill in the gap after. Fills are 2-4 notes max, mirroring the vocal contour. The fill goes in the GAP, never during the vocal.",
        setup: "Organ or Rhodes preset. Metronome at 84 BPM.",
        steps: [
          { text: "Hum a vocal melody: 2 bars. Then play a 2-beat keyboard fill in the silence after.", why: "This is the primary melodic role of keys in reggae and indie rock — the keyboard 'answers' the singer." },
          { text: "Mirror the vocal contour: descending melody = descending fill. Rising melody = rising fill.", why: "The fill should feel like a conversation, not a random interjection." },
          { text: "Fills are 2-4 notes max. Brief. The vocal is the star, you're the response.", why: "Keyboard answers are short and supportive. Never outshine the singer." },
          { text: "16 bars of chop-and-fill. Chop during the vocal, fill in the gaps.", why: "This is the real gig scenario. Chop = foundation, fill = personality." }
        ],
        feel: "Like a conversation between singer and keyboard. The fill should feel like a natural response — 'yeah, exactly' — not a separate thought.",
        wrong: "If fills overlap with the vocal, you're entering too early. Wait. The gap is longer than you think. Let the vocal phrase fully end.",
        metronome: 84,
        levelUp: "16 bars of chop-and-fill that sound like natural conversation."
      },
      {
        id: "k6e5", time: 10, title: "Blues Scale Licks", type: "keys",
        what: "A blues scale (A-C-D-Eb-E-G) — the universal rock/reggae/soul fill vocabulary. The Eb (blue note) is the tension, the E natural is the release. 3-4 lick patterns that work over almost any chord.",
        setup: "Organ or Rhodes preset. Metronome at 84 BPM.",
        steps: [
          { text: "A blues scale: A-C-D-Eb-E-G. Play it ascending and descending. The Eb is the 'blue note' — the soul.", why: "This one scale works over Am, C, F, G, Dm — almost everything in your band's key range." },
          { text: "Lick 1: E-Eb-D-C (quick descending chromatic). Use between chop phrases.", why: "The chromatic Eb→D is the classic blues sound. Brief, 4 notes, lands on C (home)." },
          { text: "Lick 2: A-C-D-E (ascending). Use to build energy going into a chorus.", why: "Ascending = energy rising. Simple stepwise motion that always works." },
          { text: "Lick 3: G-E-D-C-A (descending pentatonic skip). The 'cool' lick — relaxed, confident.", why: "Skipping the Eb keeps it clean pentatonic. Less tension, more groove." },
          { text: "Apply: chop Am for 3 bars, drop one lick on bar 4, resume chop. Rotate through licks.", why: "You're building a vocabulary of 3-4 go-to fills. In a gig, you'll reach for these automatically." }
        ],
        feel: "The blues scale should feel like a cheat code — everything sounds good. The blue note (Eb) adds instant soul to any phrase.",
        wrong: "If licks sound like scale exercises, play fewer notes. A 2-note lick with conviction beats a 6-note lick that sounds rehearsed.",
        metronome: 84,
        levelUp: "3 different blues licks inserted naturally into an Am-F-C-G chop at 90 BPM."
      },
      {
        id: "k6e6", time: 10, title: "Rhythmic Fills", type: "keys",
        what: "Fills that are RHYTHMIC, not melodic — 16th note chop patterns on a single chord. Like a drum fill but with pitch. The rhythm is the interest, not the notes. Think of the keyboard as a percussion instrument.",
        setup: "Organ preset. Metronome at 80 BPM.",
        steps: [
          { text: "Single chord (Am7). Instead of the normal & chop, play a 16th note burst: 'ta-ka-ta-ka' on the last beat of a 4-bar phrase.", why: "16th note subdivision from Sarah's counting drills. Same rhythm, keyboard instead of voice." },
          { text: "Accent pattern: loud-soft-soft-loud on the 16ths (1-e-and-A). The accents create the groove.", why: "Unaccented 16ths sound like a machine. Accents make it human and funky." },
          { text: "Try different fill lengths: 1 beat (4 16ths), half bar (8 16ths), full bar.", why: "Short fills are safer in a band. Save the full-bar fill for the biggest transitions." },
          { text: "Apply: 3 bars normal chop, bar 4 = rhythmic fill, repeat. The fill leads back into beat 1.", why: "The fill's job is to set up the next phrase. It should feel like a springboard." }
        ],
        feel: "Like a drum fill played on keys. The rhythm is the star, not the notes. It should make you nod harder.",
        wrong: "If the fill disrupts the groove instead of enhancing it, it's too long or too loud. Shorter, quieter. The fill serves the groove.",
        metronome: 80,
        levelUp: "16th note fills inserted at phrase endings that feel like a natural part of the groove."
      }
    ]
  },
  {
    num: 7, name: "Full Integration", focus: "Full songs + band rehearsal",
    duration: "55 min",
    setup: "KeyLab 49 + Ableton + Analog Lab V. All sounds. Practice switching presets between sections using Ableton track selection or MIDI mapping.",
    exercises: [
      {
        id: "k7e1", time: 15, title: "Full Song Arrangement", type: "keys",
        what: "Pick a band song. Write out the form (Intro/V/C/V/C/Bridge/C/Outro). Assign textures to each section. Play through without stopping. Record in Ableton and listen back.",
        setup: "All presets available. Ableton recording armed. Use the song's actual tempo.",
        steps: [
          { text: "Pick a band song. Write out the form: Intro, Verse, Chorus, Bridge, Outro.", why: "Map the structure before you play. Know what's coming so you can plan textures." },
          { text: "Assign textures: Intro=pad, Verse=chop (RH only), Chorus=full groove (both hands), Bridge=pad+arpeggio.", why: "Each section gets a different treatment. The variety IS the arrangement." },
          { text: "Play through without stopping. Mistakes = recover and keep going.", why: "Same discipline as your ILTWYW drill. The show doesn't stop for mistakes." },
          { text: "Record in Ableton, listen back. Does each section feel different? Where did the groove drop?", why: "Self-recording + critique = the fastest improvement loop. Same workflow, different instrument." }
        ],
        feel: "You should feel like you're telling a story. Each section = a chapter. The arrangement should have an arc — build, peak, resolve.",
        wrong: "If all sections sound the same, exaggerate the differences. Verse = whisper quiet, chorus = full volume. Bridge = completely different sound. Make it obvious.",
        levelUp: "3+ min arrangement with 3 distinct section treatments recorded in Ableton."
      },
      {
        id: "k7e2", time: 10, title: "Style Switching", type: "keys",
        what: "Am-F-C-G throughout. Every 8 bars switch style: reggae chop, surf tremolo, ambient pad, SILENCE. Transitions: max 1 beat gap. The SILENCE section is a deliberate musical choice — the most powerful tool.",
        setup: "All presets ready. Metronome at 100 BPM.",
        steps: [
          { text: "8 bars reggae chop (Am-F-C-G). Full groove, both hands.", why: "Start with your strongest skill. Home base." },
          { text: "8 bars surf tremolo. Switch preset, hold chords with swells.", why: "Texture change = mood change. Same chords, different world." },
          { text: "8 bars ambient pad. Reverb bloom, slow transitions, arpeggiated delay.", why: "The quietest, most spacious texture. Let the reverb fill the room." },
          { text: "8 bars SILENCE. Hands in lap. This is a deliberate musical choice.", why: "The silence after 24 bars of playing creates anticipation. The most powerful tool." }
        ],
        feel: "Each 8-bar section should feel like a different room in the same house. The silence should feel like the most dramatic section.",
        wrong: "If transitions take more than 1 beat, practice just the switch points. The band doesn't stop for you to change sounds.",
        metronome: 100,
        levelUp: "3 full cycles (chop-tremolo-pad-silence) at 108 BPM with clean transitions."
      },
      {
        id: "k7e3", time: 10, title: "Band Rehearsal Simulation", type: "keys",
        what: "Play along with a song from your band's repertoire or a reference artist (Allah-Las, Skinshape, Sun Room). Listen through once without playing. Map the gaps. Play along the second time. Lay out for 25%+ of the song.",
        setup: "Any preset. Full song from Spotify or your library. No click — follow the song.",
        steps: [
          { text: "Listen through once without playing. Map: where are the gaps? Where is it full?", why: "Same approach as The Art of Not Playing. Map before you contribute." },
          { text: "Second time: play along. Start minimal, add gradually. Enter late, leave early.", why: "You're joining a band, not leading it. Serve the song." },
          { text: "Lay out for 25%+ of the song. The silences are deliberate choices.", why: "If you play through the whole song, you're not listening. Restraint = musicianship." },
          { text: "Ultimate test: is the song better with keys? Would anyone miss them if removed? Both must be yes.", why: "This is the standard for every note you play in the band. Both tests, every time." }
        ],
        feel: "You should feel like a film colorist — adding warmth, contrast, atmosphere to something that already works. Not painting over the original.",
        wrong: "If you can't stop playing, set physical rules: no keys in verse 1, only chorus 2 onward. Build restraint through structure.",
        levelUp: "3 songs with appropriate, complementary parts that pass both tests."
      },
      {
        id: "k7e4", time: 10, title: "Ear Copy a Keyboard Part", type: "keys",
        what: "Pick a song with a keyboard part you love. Learn it by ear — no tabs, no sheet music, no YouTube tutorials. Ear → brain → hand. This is the skill that makes you self-sufficient as a musician.",
        setup: "Any preset that matches the song's keyboard sound. Song loaded in Spotify/YouTube. Slow-down tool optional (YouTube speed 0.75x).",
        steps: [
          { text: "Listen to the keyboard part 3 times. Don't play yet. Just absorb: what register? What rhythm? What voicing type?", why: "Observation before action. You're building a mental model before your hands touch keys." },
          { text: "Find the root notes first. Hum the bass line, then find those notes on the keyboard.", why: "Root notes = the skeleton. Once you have roots, you can figure out the chord quality (major/minor/7th)." },
          { text: "Build the chords. Is it a triad? 7th chord? What inversion? Try different voicings until one sounds right.", why: "Your Phase 2 voicing knowledge pays off here. You know the shapes — now match them to what you hear." },
          { text: "Get the rhythm last. Is it a chop? Sustained? Backbeat? Arpeggiated? Match the pattern.", why: "Notes + rhythm + voicing = the full part. Getting 80% right is a win. Perfection isn't the goal." }
        ],
        feel: "Like solving a puzzle by ear. The satisfaction of figuring out a part without help = real musical independence.",
        wrong: "If you're totally stuck, slow the track to 0.75x speed. If you still can't find the notes, try a simpler song. Build the ear gradually.",
        levelUp: "Learn a keyboard part from a reference track in under 10 minutes, 80%+ accurate."
      },
      {
        id: "k7e5", time: 10, title: "Eyes Closed Performance", type: "keys",
        what: "Play a full 3-minute arrangement without looking at the keyboard. Eyes closed or looking at the audience (the wall). This tests whether muscle memory is truly internalized — if you have to look, you're not ready for the stage.",
        setup: "All presets ready. Pick a song you've arranged in k7e1. No metronome — use internal time or a backing track.",
        steps: [
          { text: "Set up your arrangement: know the form, the preset switches, the voicings for each section.", why: "Preparation. You need to know the plan before you close your eyes." },
          { text: "Close your eyes. Play the full arrangement. Don't stop for mistakes — recover and keep going.", why: "On stage, you can't look down. You need to find the keys by feel. Mistakes are fine — stopping isn't." },
          { text: "Focus on the FEEL of each chord under your fingers. C major feels different from Am. Learn the hand shapes by touch.", why: "Experienced keyboard players navigate by feel, not sight. The intervals have a physical width you can memorize." },
          { text: "If you get lost, open your eyes for one chord, close again. Over time, you'll need to peek less.", why: "This is a gradual process. Each session, peek less. The goal is zero peeks." }
        ],
        feel: "Liberating. When you don't need to look at the keys, you can watch your bandmates, read the room, connect with the audience. That's performance.",
        wrong: "If you can't find any chords by feel, start smaller: eyes closed for just the verse (one voicing, no changes). Add sections as the muscle memory builds.",
        levelUp: "Full 3-minute arrangement with eyes closed, fewer than 3 peeks."
      }
    ]
  }
];

// ─── LOOPER CURRICULUM (RC-505mkII) ─────────────────────────────────
export const LOOPER_LEVELS = [
  {
    num: 1, name: "First Contact", focus: "Interface + First Clean Loop",
    duration: "20 min",
    setup: "RC-505mkII powered on, headphones in PHONES jack, guitar in INST 1 input. No effects. Quantize: MEASURE [MENU] > MEMORY > PLAY > QUANTIZE. Loop Sync: ON [MENU] > MEMORY > TRACK > LOOP SYNC. Rhythm guide at 80 BPM.",
    exercises: [
      {
        id: "lo1e1", time: 5, title: "The Box Tour", type: "looper",
        checklist: true,
        what: "Physical interface orientation. No music yet — just learn where everything is.",
        setup: "RC-505mkII powered on, nothing plugged in except headphones.",
        steps: [
          { text: "Press all 5 track buttons one at a time. Watch the LED cycle: dark (empty) > RED (recording) > AMBER (overdub) > GREEN (playing).", why: "Every button press changes state. You need to know what each color means without thinking." },
          { text: "Move all 5 faders up and down. These control track volume in real time.", why: "Faders are your live mix controls — you'll ride these during performance." },
          { text: "Find ALL START/STOP (the big button). Press it. This stops/starts all tracks at once.", why: "Your emergency brake and your performance restart button." },
          { text: "Navigate MEMORY slots: press [MEMORY], scroll with the VALUE knob, press [ENTER] to load.", why: "Memory slots save your loop arrangements. You'll build a set list with these." },
          { text: "Find these knobs on the home screen: [1] = mic input level, [2] = instrument input level, [3] = master output, [4] = tempo.", why: "These four knobs control your core levels. Memorize their positions." }
        ],
        feel: "Like learning where the pedals are in a new car before driving. No pressure, no sound — just spatial awareness.",
        wrong: "If you're trying to make music, stop. This is purely physical orientation. Music comes in exercise 4.",
        levelUp: "Can find and press any control within 2 seconds without looking at the manual."
      },
      {
        id: "lo1e2", time: 5, title: "Rhythm Guide Setup", type: "looper",
        checklist: true,
        what: "Using the mkII's internal rhythm guide instead of your phone metronome. This is your click track in performance.",
        setup: "RC-505mkII powered on, headphones connected.",
        steps: [
          { text: "Press [MENU] > RHYTHM to enter rhythm guide settings.", why: "The rhythm guide is your built-in metronome — no phone needed during performance." },
          { text: "Set BPM: tap [TAP TEMPO] four times at your target speed, or turn knob [4] on the tempo screen.", why: "Tap tempo is faster for dialing in a feel. The knob is precise for exact BPM." },
          { text: "Select a pattern from the 200+ built-in patterns. Start with a simple 4/4 click.", why: "The mkII has everything from simple clicks to full drum patterns. Simple click first." },
          { text: "Route to headphones only (not main output). Check [MENU] > RHYTHM > OUTPUT.", why: "In performance, the audience should NOT hear your click. Headphones only." },
          { text: "Practice starting and stopping the rhythm guide while tapping your foot to it.", why: "The rhythm guide is your internal reference. Get comfortable with it before recording." }
        ],
        feel: "Like switching from a phone metronome to a built-in one. Same concept, better workflow — it's always there when you need it.",
        wrong: "If the rhythm guide is coming through the main output, check the routing. You don't want click bleed in recordings or performance.",
        levelUp: "Can set any BPM and start the rhythm guide in under 10 seconds."
      },
      {
        id: "lo1e3", time: 5, title: "Record/Stop Precision", type: "looper",
        checklist: true,
        what: "THE foundational looping skill, isolated. No instrument — just button timing.",
        setup: "Rhythm guide at 80 BPM. No guitar. Hands free.",
        steps: [
          { text: "Press Track 1 button on beat 1 to start recording (LED goes RED).", why: "This is the most important button press in looping. It defines your loop start point." },
          { text: "Count 4 bars out loud: '1-2-3-4, 2-2-3-4, 3-2-3-4, 4-2-3-4'.", why: "Counting keeps you locked to the grid. You already know this from Sarah's rhythm training." },
          { text: "Press Track 1 again on beat 1 of bar 5 (LED goes GREEN = playing).", why: "This defines the loop end point. With Quantize: MEASURE, the mkII snaps your press to the nearest bar line." },
          { text: "Listen: does the empty loop cycle cleanly? Try 10 times.", why: "Even with no audio, you're training the press-on-beat-1 muscle memory." },
          { text: "Now try with Quantize OFF: [MENU] > MEMORY > PLAY > QUANTIZE > OFF. Feel the difference.", why: "Without quantize, timing is 100% on you. MEASURE mode is training wheels. OFF is the goal." }
        ],
        feel: "Like practicing a golf swing without a ball. The press should feel as natural as clapping on beat 1.",
        wrong: "If your loop lengths are inconsistent (3.5 bars, 4.5 bars), stay on Quantize: MEASURE until the press is automatic.",
        levelUp: "10 consecutive 4-bar loops where the stop press lands within a 16th note of beat 1."
      },
      {
        id: "lo1e4", time: 10, title: "Your First Loop", type: "looper",
        checklist: true,
        what: "Record 4 bars of Am fingerpicking — your first real loop.",
        setup: "Guitar in INST 1 input. Input level knob [2] peaking at -6dB (green, not red). Rhythm guide at 80 BPM. Quantize: MEASURE.",
        steps: [
          { text: "Set input level: play your loudest fingerpick, adjust knob [2] until the meter peaks at -6dB (well into green, never red).", why: "Too hot = distortion in every loop. Too quiet = noise floor issues. -6dB is the sweet spot." },
          { text: "Start the rhythm guide at 80 BPM. Count yourself in: '1-2-3-4'.", why: "Same tempo as your Am fingerpicking practice from Sarah's lessons." },
          { text: "Press Track 1 on beat 1. Fingerpick Am (alternating thumb A string, pointer B string) for 4 bars.", why: "This is the pattern you already know. Now it becomes your first loop." },
          { text: "Press Track 1 again on beat 1 of bar 5. The button press goes through AMBER (overdub) — press ONCE MORE quickly to skip overdub and go to GREEN (play).", why: "Single press = overdub. Double press = skip overdub, go straight to play. You want play mode." },
          { text: "Listen to your loop cycle 4-8 times. Is the boundary seamless? Repeat the whole process 5 times.", why: "The loop boundary is where most beginners hear a click, gap, or rhythmic hiccup. Train your ear for it." }
        ],
        feel: "The first time your loop plays back seamlessly, it's magic — you're hearing yourself accompany yourself. That feeling never fully goes away.",
        wrong: "If you hear a click or gap at the loop point, your stop-press timing is off. Stay on Quantize: MEASURE and focus on pressing on beat 1.",
        levelUp: "3 out of 5 loops play back seamlessly with no audible boundary artifact."
      },
      {
        id: "lo1e5", time: 10, title: "Loop and Listen", type: "looper",
        checklist: true,
        what: "Record an Am loop, then play live over it. This is the core performance skill.",
        setup: "Same as previous. Clean Am loop already recorded on Track 1.",
        steps: [
          { text: "Record a clean Am fingerpicking loop on Track 1 (4 bars, 80 BPM).", why: "Your foundation loop. Same as the previous exercise." },
          { text: "While it plays, try playing C over it. Then G. Then D. Listen to how each chord interacts.", why: "This is the Am-C-G-D progression you know. Now you're hearing harmony against your own playing." },
          { text: "Practice adjusting the Track 1 fader while playing live guitar. Push it up, pull it down.", why: "In performance, you'll constantly adjust the mix between recorded loops and live playing." },
          { text: "Try singing a simple melody over the loop while playing guitar. Just hum if lyrics feel like too much.", why: "The ultimate goal: loop + live guitar + voice. Start with any combination of two." }
        ],
        feel: "Like jamming with a rhythm guitarist who plays exactly what you want, exactly when you want it. Because it IS you.",
        wrong: "If you can't play guitar AND adjust the fader, that's normal. Practice fader moves between chord changes, not during.",
        levelUp: "Play through a full Am-C-G-D cycle live over your Am loop while adjusting the fader at least once."
      },
      {
        id: "lo1e6", time: 5, title: "Loop Quality Check", type: "looper",
        checklist: true,
        what: "Critical listening drill. Train your ear to hear loop-specific problems.",
        setup: "Any loop you've recorded playing back on Track 1.",
        steps: [
          { text: "Let your loop cycle 8+ times without touching anything. Just listen.", why: "Your ear catches different things on each pass. Pass 1: overall feel. Pass 3: timing. Pass 5: tone. Pass 8: the boundary." },
          { text: "Listen specifically for: (a) click or pop at the loop boundary, (b) gap of silence, (c) rhythmic hiccup where the loop restarts, (d) volume inconsistency.", why: "These are the four most common loop artifacts. Naming them helps you hear them." },
          { text: "Rate your loop 1-5: 1=obvious problem, 3=acceptable, 5=seamless. If below 3, re-record.", why: "Building a quality standard. Your ear training from Sarah's lessons transfers directly." },
          { text: "If you hear a problem, identify which one it is. Then re-record with that specific fix in mind.", why: "Targeted improvement. Don't just 're-try' — fix the specific issue." }
        ],
        feel: "Like a sound engineer listening for imperfections. Your ear gets sharper every session.",
        wrong: "If every loop sounds perfect to you, turn off the rhythm guide and listen again. The guide masks timing issues.",
        levelUp: "Can identify and name the specific artifact in a bad loop within 3 cycles."
      },
      {
        id: "lo1e7", time: 5, title: "Clear and Rebuild", type: "looper",
        checklist: true,
        what: "Speed of recovery. Practice the 'I messed up, start over' workflow until it's instant.",
        setup: "Any loop playing on Track 1. Rhythm guide running.",
        steps: [
          { text: "Press ALL CLEAR (hold the track's stop button, or use ALL START/STOP to stop, then clear). All tracks go dark.", why: "ALL CLEAR is your reset button. In performance, a bad loop needs to disappear fast." },
          { text: "Immediately record a new loop — within 4 beats of clearing.", why: "Dead air is the enemy. The faster you rebuild, the more confident your performance looks." },
          { text: "Repeat: record > listen 4 bars > clear > rebuild. 5 cycles.", why: "This drill makes recovery automatic. When you mess up live, your hands know what to do." },
          { text: "Time yourself: from the moment you decide to clear to the moment a new loop is playing. Goal: under 5 seconds.", why: "5 seconds of silence is barely noticeable. 15 seconds feels like an eternity to an audience." }
        ],
        feel: "Like a basketball player practicing fast-break turnarounds. The recovery should feel athletic — quick, decisive, no hesitation.",
        wrong: "If you're panicking or fumbling during the clear, slow down. Practice the button sequence without time pressure first, then add speed.",
        levelUp: "Clear and rebuild with a clean new loop in under 5 seconds, 3 times in a row."
      }
    ]
  },
  {
    num: 2, name: "Loop + Voice", focus: "Minimum Viable Performance",
    duration: "20 min",
    setup: "RC-505mkII with guitar in INST 1, mic in MIC input (or use guitar-only exercises). Input levels peaking at -6dB. Quantize: MEASURE. Rhythm guide at 80-90 BPM.",
    exercises: [
      {
        id: "lo2e1", time: 10, title: "Sing Over Your Loop", type: "looper",
        checklist: true,
        what: "The minimum viable loop performance: chord loop + singing over it. The KT Tunstall / Howie Day starting point.",
        setup: "Record Am-C-G-D fingerpicking loop (4 bars) on Track 1 at 90 BPM.",
        steps: [
          { text: "Record a clean Am-C-G-D fingerpicking loop on Track 1. Let it play.", why: "This is your backing band. Same progression you've been practicing." },
          { text: "Sing the ILTWYW melody live over the loop — NOT recorded, just live.", why: "Singing live (not into a loop) is the simplest performance mode. Loop = band, you = vocalist." },
          { text: "Start with the verse. Can you make it through without losing your place?", why: "The loop cycles every 4 bars. Your vocal phrases need to align with the cycle." },
          { text: "Now try the chorus. Notice how the energy shift feels over the same loop.", why: "Same chords, different vocal energy. This is how simple loop performances create dynamics." }
        ],
        feel: "Like singing with a backing track, except YOU made the backing track 30 seconds ago. That ownership changes how you sing.",
        wrong: "If you keep losing your place in the song, simplify: just hum the melody. Add words once the melodic rhythm is locked.",
        levelUp: "Complete one full verse + chorus of ILTWYW while the loop plays, without losing your place."
      },
      {
        id: "lo2e2", time: 5, title: "Volume Staging Basics", type: "looper",
        checklist: true,
        volumeMeter: true,
        what: "Set your loop quieter than max so there's room for voice and future layers. Prevent clipping from day one.",
        setup: "Loop playing on Track 1. Mic connected if available.",
        steps: [
          { text: "Set Track 1 fader to 70-80% (not max). This is your loop volume.", why: "If the first loop is at 100%, adding anything else causes distortion. Leave headroom." },
          { text: "Sing or play at your normal performance volume. Check the master output meter (knob [3] area).", why: "The combined output of loop + live should peak at -6dB or below." },
          { text: "If the master meter hits red, pull Track 1 fader down 10%. Re-check.", why: "Red = clipping = distortion. It sounds bad and it's the #1 beginner mistake." },
          { text: "Find the balance: loop is audible and present, but your live voice/guitar sits on top clearly.", why: "The live element should always be the loudest thing. It's what the audience is watching you perform." }
        ],
        feel: "Like mixing a song — the loop is the rhythm section, your voice is the lead. The lead should be upfront.",
        wrong: "If you can't hear the loop under your voice, it's too quiet. If your voice is buried, the loop is too loud. Aim for 'comfortable conversation volume' balance.",
        levelUp: "Loop + live voice with no clipping and clear vocal presence."
      },
      {
        id: "lo2e3", time: 5, title: "The Undo Drill", type: "looper",
        checklist: true,
        what: "Practice recovering from a bad overdub. UNDO is your safety net — make it instant.",
        setup: "Clean loop playing on Track 1. Rhythm guide at 80 BPM.",
        steps: [
          { text: "Press Track 1 to enter overdub (LED goes AMBER).", why: "Overdub adds to the existing loop. If you add something bad, you need to remove it." },
          { text: "Record something deliberately wrong — random noise, wrong notes, off-rhythm.", why: "You're practicing recovery, not music. Make the mistake on purpose." },
          { text: "Press UNDO (check your mkII — it may be a dedicated button or assigned to a footswitch/CTL button).", why: "UNDO removes the last overdub layer. Your original clean loop should return." },
          { text: "Verify: is the original loop clean again? If yes, your UNDO worked. Practice until UNDO takes <2 seconds.", why: "In performance, 2 seconds of bad audio is barely noticeable. 10 seconds is a disaster." }
        ],
        feel: "Like having a 'Ctrl-Z' for live music. The safety net makes you braver about trying things.",
        wrong: "If UNDO doesn't seem to work, check that you're in the right mode. UNDO only removes the most recent overdub layer, not the original recording.",
        levelUp: "Overdub, hear the mistake, UNDO — all within 2 seconds, without looking at the unit."
      },
      {
        id: "lo2e4", time: 10, title: "Overdub Technique", type: "looper",
        checklist: true,
        what: "Add a bass note to your existing loop via overdub. Learn gain staging for layers.",
        setup: "Clean chord loop playing on Track 1 at 80 BPM.",
        steps: [
          { text: "Press Track 1 to enter overdub (AMBER). Play a single bass note (low E or A string) on beat 1 of each bar.", why: "A simple addition that thickens the loop without cluttering it." },
          { text: "Press Track 1 again to exit overdub (back to GREEN/play). Listen.", why: "The bass note is now part of the loop. Does it blend or clash?" },
          { text: "Listen for volume: is the overdub louder than the original? Each overdub ADDS volume.", why: "Key lesson: overdubs stack volume. This is why gain staging matters from layer one." },
          { text: "If the combined loop is too hot, pull the fader down. Re-record at a lower input level if needed.", why: "Better to record quieter and turn up the fader than to clip from stacked overdubs." }
        ],
        feel: "Like adding a bass player to your band, one note at a time. Simple additions have outsized impact.",
        wrong: "If the overdub makes the loop muddy or distorted, your input level is too high. Drop knob [2] and re-record.",
        levelUp: "Clean overdub with bass notes that blend naturally — no volume spike, no mud."
      },
      {
        id: "lo2e5", time: 5, title: "Chord Cycle Loops", type: "looper",
        checklist: true,
        what: "Record loops with internal chord changes. Test your clean ceiling at different tempos.",
        setup: "Rhythm guide running. Quantize: MEASURE.",
        steps: [
          { text: "Record a 4-bar loop: Am (2 bars) then C (2 bars). The chord change happens INSIDE the loop.", why: "Real songs have chord changes. Your loops need to capture them cleanly." },
          { text: "Test at 70 BPM. Clean? Try 80. Clean? Try 90. Try 100.", why: "Find where your chord changes start getting sloppy inside a loop. That's your 'clean ceiling.'" },
          { text: "Listen to the chord change point in the loop. Is it rhythmically tight? Or is there a stumble?", why: "The transition between chords is where loops expose timing issues. It cycles every time." },
          { text: "Record the same loop 3 times at your clean ceiling. Pick the best one.", why: "Consistency at your ceiling is the goal before pushing higher." }
        ],
        feel: "Like a pilot testing at different altitudes. You need to know your current clean ceiling so you can systematically raise it.",
        wrong: "If chord changes are sloppy at 80, don't push to 100. Master 80 first. Sloppy loops sound sloppy FOREVER — they repeat.",
        levelUp: "Clean internal Am-to-C chord change in a loop at 100 BPM."
      },
      {
        id: "lo2e6", time: 5, title: "Quantize Ladder", type: "looper",
        checklist: true,
        what: "Feel how different quantize modes change what the RC-505mkII expects from you.",
        setup: "Rhythm guide at 80 BPM.",
        steps: [
          { text: "Set Quantize: MEASURE. Record a 4-bar loop. Notice how the mkII snaps your start/stop to bar lines.", why: "MEASURE mode = maximum forgiveness. It corrects your button timing to the nearest bar." },
          { text: "Set Quantize: BEAT. Record the same loop. Feel the tighter grid — snaps to beats, not bars.", why: "BEAT mode = more precise. Allows sub-measure loops but demands better timing." },
          { text: "Set Quantize: OFF. Record the same loop. Feel the raw timing — no safety net.", why: "OFF = your timing IS the loop length. Every millisecond of button timing matters." },
          { text: "Listen to all three back to back. Which sounds cleanest? That tells you where your button timing is.", why: "If they all sound the same, your timing is great. If OFF sounds worse, that's your growth area." }
        ],
        feel: "Like taking off training wheels. MEASURE is a tricycle, BEAT is a bicycle, OFF is a unicycle.",
        wrong: "If Quantize: OFF loops sound terrible, that's expected! Stay on MEASURE for practice and performance. OFF is a long-term goal.",
        levelUp: "Can hear the difference between all three modes and articulate which sounds cleanest."
      },
      {
        id: "lo2e7", time: 10, title: "The Minimum Viable Performance", type: "looper",
        checklist: true,
        what: "Combine everything: loop, sing, mix, end. Record it on your phone. This is KT Tunstall on Jools Holland.",
        setup: "Phone propped up to record video. RC-505mkII ready. Rhythm guide at 90 BPM.",
        steps: [
          { text: "Start recording on your phone (video).", why: "Recording changes how you perform. It adds just enough pressure to simulate an audience." },
          { text: "Record a clean Am-C-G-D chord loop on Track 1.", why: "Your foundation. Same as you've practiced." },
          { text: "Sing a full verse and chorus of ILTWYW over the loop.", why: "The minimum viable performance: one loop, one voice." },
          { text: "Adjust the Track 1 fader at least once during the performance — volume up for chorus, down for verse.", why: "Dynamic mixing makes it a performance, not just a demo." },
          { text: "End by holding Track 1 button (stops the track) or fading the fader to zero.", why: "Clean endings are as important as clean starts. Practice both methods." }
        ],
        feel: "This IS a performance. One loop, one voice, clean ending. KT Tunstall launched her career with exactly this format.",
        wrong: "If you keep restarting because it's 'not perfect,' stop. Record one complete take, imperfections and all. You can do another after.",
        levelUp: "A recorded performance you'd show a friend. Not perfect — just complete and confident."
      }
    ]
  },
  {
    num: 3, name: "Two Tracks", focus: "Frequency Separation + Muting",
    duration: "20 min",
    setup: "RC-505mkII with guitar and mic. Quantize: MEASURE. Loop Sync: ON. Rhythm guide at 85-95 BPM.",
    exercises: [
      {
        id: "lo3e1", time: 10, title: "Guitar + Guitar", type: "looper",
        checklist: true,
        what: "Two guitar layers with frequency separation — low register on Track 1, high register on Track 2.",
        setup: "Rhythm guide at 90 BPM. Both tracks empty.",
        steps: [
          { text: "Track 1: Record Am fingerpicking in the LOW register — thumb on A/E strings only. 4 bars.", why: "Low register = warm foundation. This is your bass-like layer." },
          { text: "Track 2: Record a single-note melody in the HIGH register — notes on B/E strings. 4 bars.", why: "High register = clarity and melody. Sits on top of the low foundation without competing." },
          { text: "Set faders: T1 = 80%, T2 = 60%. Listen to the blend.", why: "The foundation should be louder. The melody should be present but not dominant." },
          { text: "Listen for frequency mud: if both tracks blur together, adjust your register choices wider apart.", why: "Frequency mud (200-500Hz pile-up) is the #1 problem for guitar loopers. Separation is the cure." }
        ],
        feel: "Like a guitar duet with yourself. Two distinct voices, each in their own space.",
        wrong: "If both tracks sound like one muddy guitar, you're in the same register. Push Track 1 lower and Track 2 higher.",
        levelUp: "Two tracks that sound like two distinct instruments, not one blurry guitar."
      },
      {
        id: "lo3e2", time: 10, title: "Guitar + Vocal Harmony", type: "looper",
        checklist: true,
        what: "Track 1: chord strum. Track 2: sustained vocal pad recorded into the loop.",
        setup: "Guitar and mic connected. Mic input level set (knob [1]) peaking at -6dB.",
        steps: [
          { text: "Track 1: Record a chord strum loop (Am-C, 4 bars).", why: "Your foundation guitar layer." },
          { text: "Track 2: Record a sustained 'ooh' vocal pad — hold the root note (A) for the full 4 bars.", why: "A vocal pad adds warmth and fills the mid-frequency range that guitar doesn't cover." },
          { text: "Adjust mic input level (knob [1]) so the vocal sits behind the guitar, not on top of it.", why: "The vocal pad is texture, not the lead. It should blend, not dominate." },
          { text: "Listen: is the vocal on pitch? Rhythmically locked? Audible but not overpowering?", why: "Vocal loops are unforgiving — pitch issues repeat every cycle. Your ear training from Sarah helps here." }
        ],
        feel: "Like adding a choir behind your guitar. The vocal pad should feel like warmth, not another instrument competing.",
        wrong: "If the vocal loop is pitchy, re-record. A pitchy vocal loop is painful because it repeats forever.",
        levelUp: "Guitar + vocal pad where the vocal is audible, on pitch, and rhythmically locked to the chord cycle."
      },
      {
        id: "lo3e3", time: 5, title: "The Mute Dance", type: "looper",
        checklist: true,
        what: "Use mute/unmute (faders) to create arrangement from just two tracks.",
        setup: "Two tracks playing from previous exercises.",
        steps: [
          { text: "Both tracks playing. Drop T2 fader to zero (4 bars of T1 only).", why: "Muting is how you create sections. Verse = less, chorus = more." },
          { text: "Bring T2 back (4 bars of both). Drop T1 (4 bars of T2 only). Bring T1 back.", why: "The sequence: both > T1 only > both > T2 only > both. This IS arrangement." },
          { text: "Do the mute dance while singing live over the tracks.", why: "In performance, you mute/unmute AND sing simultaneously. This is the coordination challenge." },
          { text: "Practice smooth fader transitions — not jerky on/off, but quick decisive moves.", why: "A smooth fader move sounds intentional. A jerky one sounds like a mistake." }
        ],
        feel: "Like being a DJ with your own music. The mute dance turns two static loops into a dynamic arrangement.",
        wrong: "If muting while singing makes you lose your place, simplify: just hum while practicing the fader moves.",
        levelUp: "Full mute sequence (both > T1 > both > T2 > both) while humming, without timing errors."
      },
      {
        id: "lo3e4", time: 5, title: "Headroom Management", type: "looper",
        checklist: true,
        volumeMeter: true,
        what: "Set relative volumes so combined output is clean. Professional gain staging with two tracks.",
        setup: "Two tracks playing.",
        steps: [
          { text: "Set T1 at 70%, T2 at 60%. Check the master output meter.", why: "Combined output of two tracks should be well below clipping. These percentages leave room." },
          { text: "If the master meter hits red, pull both faders down proportionally.", why: "Red = clipping. With only two tracks, you shouldn't be clipping. If you are, input levels are too hot." },
          { text: "Adjust master output (knob [3]) so headphone volume is comfortable at these fader positions.", why: "Set master output once. Then control everything with individual faders." },
          { text: "Target: combined output at -6dB with room for live playing on top.", why: "-6dB headroom is the professional standard. It leaves space for live voice and guitar." }
        ],
        feel: "Like a sound engineer at a mixing board. Clean gain structure = clean sound at any volume.",
        wrong: "If you're compensating for quiet loops by cranking the master output, the problem is at the input stage. Fix input levels first.",
        levelUp: "Two tracks playing with combined output peaking at -6dB, confirmed on the meter."
      },
      {
        id: "lo3e5", time: 5, title: "Track Assignment Strategy", type: "looper",
        checklist: true,
        what: "Build a consistent mental model for which track holds what. Muscle memory for performance.",
        setup: "No recording needed — this is a planning exercise.",
        steps: [
          { text: "Assign roles: Track 1 = rhythm/foundation (always). Track 2 = harmony/chords. Track 3 = melody/counter-melody. Track 4 = texture/pad. Track 5 = one-shots/fills.", why: "Consistent assignment means your hands always know where to go. No thinking during performance." },
          { text: "Write this down or stick a label on each fader.", why: "Physical labels remove cognitive load. Professional loopers label their gear." },
          { text: "Practice saying it out loud: 'Track 1 is rhythm, Track 2 is harmony...' while touching each fader.", why: "Physical + verbal = faster memorization. Same principle as counting while playing." },
          { text: "Build your next two-track loop using this assignment: rhythm on T1, harmony on T2.", why: "Start using the strategy immediately so it becomes habit." }
        ],
        feel: "Like assigning positions on a sports team. Everyone has a job. No confusion during the game.",
        wrong: "If you keep recording melody on Track 1, the assignment isn't habit yet. Stick the labels on and be strict about it.",
        levelUp: "Record 3 consecutive multi-track loops with correct track assignment without checking your labels."
      },
      {
        id: "lo3e6", time: 5, title: "Loop Length Awareness", type: "looper",
        checklist: true,
        what: "Understand what happens when Track 2 is a different length than Track 1.",
        setup: "Rhythm guide at 85 BPM. Loop Sync ON, then OFF.",
        steps: [
          { text: "Record 4-bar guitar loop on T1. Then record 2-bar vocal on T2 with Loop Sync ON.", why: "With Loop Sync ON, T2 automatically matches T1's length. The 2-bar content loops twice to fill 4 bars." },
          { text: "Listen: T2 plays your 2 bars twice per T1 cycle. Sounds like a repeating motif.", why: "Loop Sync ON = safety. All tracks share the same master length." },
          { text: "Now try Loop Sync OFF: [MENU] > MEMORY > TRACK > LOOP SYNC > OFF. Record a 2-bar loop on T2 over a 4-bar T1.", why: "With Loop Sync OFF, T2 cycles independently at its own length." },
          { text: "Listen to the polyrhythmic effect. Then turn Loop Sync back ON.", why: "Loop Sync OFF creates polyrhythms — cool for experimental music, tricky for beginners. Keep it ON for now." }
        ],
        feel: "Like discovering that your bandmates can play in different time signatures simultaneously. Fascinating but chaotic.",
        wrong: "If tracks feel 'off' from each other, check Loop Sync. It should be ON until you deliberately want polyrhythms.",
        levelUp: "Can explain the difference between Loop Sync ON and OFF, and know which you want for each situation."
      },
      {
        id: "lo3e7", time: 5, title: "The Rescue Mute", type: "looper",
        checklist: true,
        what: "Practice muting a bad track instantly ON THE DOWNBEAT. Intentional-sounding recovery.",
        setup: "Two tracks playing.",
        steps: [
          { text: "Count along: '1-2-3-4, 2-2-3-4...' Decide which bar you'll mute T2.", why: "Planning the mute makes it deliberate. In performance, you'll need to decide fast." },
          { text: "On beat 1 of your chosen bar, slam T2 fader to zero.", why: "Muting ON the downbeat sounds intentional — like a planned arrangement change." },
          { text: "Try muting on beat 2 or 3. Hear the difference? Off-beat mutes sound accidental.", why: "This is why pros mute on beat 1. It's the difference between 'planned' and 'oops.'" },
          { text: "Practice: play two tracks, mute T2 on beat 1 of bar 5, bring it back on beat 1 of bar 9.", why: "Timed mutes = arrangement. Random mutes = panic. Train the timed version." }
        ],
        feel: "Like a drummer who drops out for exactly 4 bars and comes back. Controlled silence is powerful.",
        wrong: "If your mutes always feel panicky, you're reacting instead of planning. Count ahead and decide BEFORE the bar arrives.",
        levelUp: "3 consecutive deliberate-sounding mute-and-return sequences, all on beat 1."
      }
    ]
  },
  {
    num: 4, name: "Rhythm Foundation", focus: "Guitar Body Percussion + Rhythmic Texture",
    duration: "20 min",
    setup: "RC-505mkII with guitar and mic. Mic close to guitar body for body percussion. Quantize: MEASURE. Rhythm guide at 90 BPM.",
    exercises: [
      {
        id: "lo4e1", time: 10, title: "Guitar Body Percussion", type: "looper",
        checklist: true,
        what: "Build a drum kit from your guitar body. No RC-505mkII first — just learn the sounds.",
        setup: "Guitar in lap. No looper yet. Metronome at 90 BPM.",
        steps: [
          { text: "KICK: palm slap on the guitar body (side or top near the sound hole). Deep thump.", why: "This replaces a kick drum. Ed Sheeran built his entire loop style on this." },
          { text: "SNARE: fingertip tap near the bridge. Brighter, sharper sound.", why: "Different location = different tone. The bridge area gives a snappy attack." },
          { text: "HI-HAT: muted string scratch — lightly drag fingers across muted strings.", why: "The 'tsss' of muted strings mimics a hi-hat. Keeps the groove moving between kick and snare." },
          { text: "Pattern at 90 BPM: slap-scratch-tap-scratch (kick-hat-snare-hat). 8 bars steady.", why: "This is a basic rock/pop beat using only your guitar body. Same rhythm you already feel from Sarah's subdivision training." },
          { text: "Practice until the pattern is automatic — you shouldn't have to think about which hit comes next.", why: "Automaticity is the goal. You need to be able to record this into a loop without thinking." }
        ],
        feel: "Like discovering your guitar is also a drum kit. The body percussion should feel rhythmic and groovy, not like you're hitting furniture.",
        wrong: "If the kick and snare sound the same, exaggerate the location difference. Kick = center of body. Snare = near the bridge.",
        levelUp: "8 bars of kick-hat-snare-hat at 90 BPM that sounds like a beat, not random tapping."
      },
      {
        id: "lo4e2", time: 10, title: "Record the Rhythm", type: "looper",
        checklist: true,
        what: "Loop your guitar body percussion. Mic placement and gain are critical.",
        setup: "Mic positioned close to guitar body. Mic gain (knob [1]) set high — body percussion is quieter than strumming.",
        steps: [
          { text: "Position your mic (or the mkII's built-in mic if using one) close to the guitar body.", why: "Body percussion is quiet compared to strumming. Proximity = volume." },
          { text: "Set mic input level (knob [1]) higher than usual — body percussion needs more gain.", why: "You may need to push the gain to 70-80% for body percussion to register clearly." },
          { text: "Record 4 bars of your kick-hat-snare-hat pattern on Track 1 at 90 BPM.", why: "The rhythm goes on Track 1 — it's your foundation, per the track assignment strategy." },
          { text: "Listen back: does it groove? Are the hits clear and distinct? Re-record until 3 out of 5 loops groove.", why: "A rhythm loop that doesn't groove is worse than no rhythm loop. Quality matters." },
          { text: "Adjust mic gain if hits are too quiet or if there's too much room noise.", why: "High gain picks up everything. Find the sweet spot between percussion clarity and noise floor." }
        ],
        feel: "The first time your body percussion loops back as a beat, it feels like magic. You ARE the drum machine.",
        wrong: "If the loop sounds like random thumping, the pattern isn't tight enough. Go back to the previous exercise and nail the pattern without the looper first.",
        levelUp: "3 out of 5 body percussion loops that genuinely groove."
      },
      {
        id: "lo4e3", time: 5, title: "Subdivision Stacking", type: "looper",
        checklist: true,
        what: "Build rhythmic density using overdubs. Connects your '1 e and a' training directly to looping.",
        setup: "Body percussion loop playing on Track 1.",
        steps: [
          { text: "Record a loop of quarter-note strums on Track 1. Simple: strum on 1, 2, 3, 4.", why: "Starting sparse. Quarter notes = the skeleton." },
          { text: "Enter overdub. Add eighth-note hits (muted string scratches on the &'s).", why: "Now you have 1-&-2-&-3-&-4-&. Double the rhythmic density." },
          { text: "Enter overdub again. Add sixteenth-note ghost notes (very light taps on the 'e' and 'a').", why: "Now you have '1-e-&-a-2-e-&-a...' Full subdivision from Sarah's training, built layer by layer." },
          { text: "Listen to the rhythmic density build from quarter to eighth to sixteenth. Feel the groove intensify.", why: "This is how rhythm sections are built in real music — layers of subdivision." }
        ],
        feel: "Like watching a pointillist painting come together — each dot adds to the groove. The 16th-note layer should make you nod.",
        wrong: "If the overdubs create a muddy mess, each layer is too loud. Record ghost notes VERY quietly.",
        levelUp: "Three-layer subdivision stack where each layer is audible and the groove intensifies."
      },
      {
        id: "lo4e4", time: 5, title: "Rhythm + Chords Stack", type: "looper",
        checklist: true,
        what: "The Ed Sheeran / Howie Day architecture: body percussion on Track 1, chords on Track 2, voice live.",
        setup: "Clean body percussion loop on Track 1 at 90 BPM.",
        steps: [
          { text: "Track 1: body percussion loop (from previous exercises). Fader at 50%.", why: "Percussion is the foundation but shouldn't dominate. 50% fader keeps it supportive." },
          { text: "Track 2: fingerpick Am-C-G-D. Fader at 80%.", why: "Chords are the harmonic content — louder than percussion, quieter than live voice." },
          { text: "Sing ILTWYW live over both tracks.", why: "This is the three-layer stack: rhythm + chords + live voice. The core of acoustic looping." },
          { text: "Adjust faders during the performance: push percussion up for chorus energy, pull it back for verse intimacy.", why: "Dynamic mixing makes the performance feel alive, not robotic." }
        ],
        feel: "You're a one-person band. Drums, guitar, and vocals — all you. This is the Sheeran/Howie Day magic.",
        wrong: "If the percussion drowns the chords, T1 fader is too high. Percussion should be felt, not heard above the chords.",
        levelUp: "Full verse + chorus of ILTWYW over rhythm + chord loops with dynamic fader adjustment."
      },
      {
        id: "lo4e5", time: 5, title: "Tempo Drift Recovery", type: "looper",
        checklist: true,
        what: "Practice re-locking to your loop's tempo when you drift. Critical performance resilience.",
        setup: "Any loop playing. Rhythm guide OFF for this exercise.",
        steps: [
          { text: "Play along with your loop at tempo. Get comfortable.", why: "Establish the pocket first." },
          { text: "Deliberately speed up slightly — push ahead of the loop's tempo by a few BPM.", why: "Feel the tension of being ahead. This 'fighting' feeling is what happens when you rush." },
          { text: "Now deliberately drag behind — play slightly slower than the loop.", why: "Feel the tension of being behind. This 'lagging' feeling is what happens when you lose energy." },
          { text: "Each time, consciously re-lock to the loop's tempo. Listen for the moment it 'clicks' back in.", why: "The re-lock is the skill. In performance, you WILL drift. The question is how fast you recover." }
        ],
        feel: "Like driving a car that keeps drifting to the shoulder — the correction should become automatic, not panicky.",
        wrong: "If you can't feel the drift, turn off the rhythm guide and play with only the loop. The loop IS your tempo reference.",
        levelUp: "Deliberately drift and re-lock 3 times in a row, each recovery faster than the last."
      },
      {
        id: "lo4e6", time: 10, title: "Optional: Beatbox Basics", type: "looper",
        checklist: true,
        what: "For variety. Vocal percussion as an alternative to guitar body percussion. The Dub FX pathway.",
        setup: "Mic connected. Mic gain (knob [1]) set for close vocal work.",
        steps: [
          { text: "KICK: say 'B' with a deep chest punch. Lips together, push air from diaphragm.", why: "The 'B' sound creates a bass transient that mimics a kick drum." },
          { text: "SNARE: say 'Pf' or 'K' — a sharp, breathy sound with air pushed through barely-open lips or the back of the throat.", why: "The sharp 'Pf' mimics a snare's attack. 'K' is a sharper, thinner snare." },
          { text: "HI-HAT: say 'Ts' — tongue behind teeth, push air in a short burst.", why: "The sibilant 'Ts' sound is a natural hi-hat. Short = closed hat, long = open hat." },
          { text: "Pattern: B-Ts-Pf-Ts at 80 BPM. Record on Track 1 instead of guitar percussion.", why: "Same pattern as body percussion but using your voice. Dub FX built a global career on this." },
          { text: "This is OPTIONAL. Choose whichever percussion method fits your vibe: body percussion (Sheeran) or beatbox (Dub FX).", why: "Both are valid. Gene's psych-surf aesthetic might lean toward guitar body percussion, but beatbox gives more rhythmic options." }
        ],
        feel: "Like discovering your mouth is a drum machine. It feels silly at first and impressive very quickly.",
        wrong: "If the beatbox sounds weak, it's a volume/proximity issue. Get close to the mic and push the sounds from your chest, not your throat.",
        levelUp: "8 bars of B-Ts-Pf-Ts at 80 BPM that sounds like a beat, not someone making sounds with their mouth."
      }
    ]
  },
  {
    num: 5, name: "Three Layers + FX", focus: "Frequency Zones + First Effects",
    duration: "20 min",
    setup: "RC-505mkII with guitar and mic. Quantize: MEASURE (moving toward BEAT). Rhythm guide at 90-100 BPM. Effects: unlocked.",
    exercises: [
      {
        id: "lo5e1", time: 10, title: "Frequency Zones", type: "looper",
        checklist: true,
        what: "Three tracks, each in a different frequency zone: low, mid, high. The cure for guitar mud.",
        setup: "Three tracks empty. Rhythm guide at 90 BPM.",
        steps: [
          { text: "Track 1: body percussion (low frequency — thumps and slaps).", why: "Percussion lives in the low-mid range. This is your rhythmic foundation." },
          { text: "Track 2: bass notes — low E/A strings only, palm-muted root notes (A, C, G, D). One per bar.", why: "Bass fills the low frequency range. Palm muting keeps it tight and defined." },
          { text: "Track 3: fingerpicking in the mid-high register — B/E strings, higher fret positions.", why: "Melody and shimmer in the high range. Sits on top without competing with bass or percussion." },
          { text: "Listen to all three: can you hear each layer distinctly? If they blur together, adjust registers wider apart.", why: "Three clearly distinct layers = professional sound. Three layers of mud = amateur hour." }
        ],
        feel: "Like hearing a full band — drums, bass, and lead guitar — except it's all you. Each frequency zone has its own space.",
        wrong: "If everything sounds like one wall of guitar, you're not separating registers enough. Push bass lower, melody higher.",
        levelUp: "Three tracks where a listener could identify each layer with their eyes closed."
      },
      {
        id: "lo5e2", time: 10, title: "Bottom-Up Build", type: "looper",
        checklist: true,
        what: "The performance build technique: add layers with gaps, creating anticipation.",
        setup: "Three tracks recorded (from previous exercise or fresh).",
        steps: [
          { text: "Start with only T1 playing (percussion). Let it play for 8 bars alone.", why: "The audience hears just rhythm. They're waiting for what comes next. That's anticipation." },
          { text: "Add T2 (bass) at bar 9. Let both play for 8 bars.", why: "Bass enters and the low end fills in. The audience feels the groove deepen." },
          { text: "Add T3 (melody) at bar 17. Let all three play for 8 bars.", why: "The full arrangement arrives. The build from 1 to 2 to 3 layers creates a satisfying arc." },
          { text: "Sing live over all three tracks starting at bar 25.", why: "Voice is the final layer — the payoff of the build. The audience has been waiting for this." },
          { text: "Practice the build using ONLY faders (not re-recording). Fader from 0 to target = layer enters.", why: "Fader builds are smoother and faster than recording new tracks during performance." }
        ],
        feel: "Like a sunrise — each element adds light until the full scene is revealed. The build should feel inevitable, not random.",
        wrong: "If you're adding layers too fast (all three in 4 bars), slow down. Let each layer breathe for 8 bars. Patience is the skill.",
        levelUp: "Complete bottom-up build (T1 > T2 > T3 > voice) with 8-bar gaps between entries."
      },
      {
        id: "lo5e3", time: 5, title: "First Effects: Reverb + Tape Echo", type: "looper",
        checklist: true,
        what: "Introduce Input FX — effects that print permanently to the loop. Spring reverb and tape echo for your psych-surf aesthetic.",
        setup: "Hold [INPUT FX] for ~2 seconds to enter edit mode.",
        steps: [
          { text: "Navigate to Input FX Slot A. Select REVERB. Set: Time: 35, Level: 25.", why: "Spring reverb character — the surf guitar sound. Not too wet, not too dry." },
          { text: "Navigate to Input FX Slot B. Select TAPE ECHO. Set: Time: 40, Feedback: 20.", why: "Warm analog delay. Tape echo = the classic psych/dub sound. Low feedback = controlled." },
          { text: "Record a chord loop WITH effects on. Listen to the reverb and echo in the loop.", why: "Input FX are PRINTED to the recording. They become part of the loop permanently." },
          { text: "Record the same loop WITHOUT effects. A/B compare. Which fits your aesthetic?", why: "Understanding wet vs dry gives you a choice. Sometimes clean is better." },
          { text: "IMPORTANT: Input FX print permanently to the loop. Track FX (Level 7) do not. Know the difference.", why: "If you record with too much reverb, you can't remove it. Track FX can be turned on/off after recording." }
        ],
        feel: "Like plugging into a vintage amp for the first time. The reverb and echo should make your guitar sound like an Allah-Las or Skinshape record.",
        wrong: "If the effects are overwhelming (too much reverb, echo feedback spiraling), reduce the levels. Subtle is better than drowning.",
        levelUp: "Record a loop with reverb + tape echo that sounds like it belongs on a psych-surf record."
      },
      {
        id: "lo5e4", time: 5, title: "Real-Time Volume Rides", type: "looper",
        checklist: true,
        volumeMeter: true,
        what: "Dynamic fader moves while three tracks play. Static volumes are boring — movement is life.",
        setup: "Three tracks playing.",
        steps: [
          { text: "While all three tracks play, push the bass (T2) fader up for 4 bars, then pull it back.", why: "A bass swell adds low-end emphasis — great for transitions and chorus entries." },
          { text: "Pull the melody (T3) fader up for a phrase, then back. It becomes a 'solo' moment.", why: "Pushing a track forward momentarily creates focus and variation." },
          { text: "Practice: ride faders while singing live. Left hand on faders, right hand on guitar.", why: "In performance, you'll manage the mix AND play AND sing. Start coordinating now." },
          { text: "Try a 'breathing' pattern: T2 swells up on verses, T3 swells up on choruses.", why: "Assigning volume shapes to song sections creates dynamic range that static loops can't." }
        ],
        feel: "Like being the sound engineer AND the performer simultaneously. The mix should breathe and move.",
        wrong: "If fader moves are jerky or land on weird beats, practice the move without singing first. Add vocals once the physical motion is smooth.",
        levelUp: "Smooth fader rides across 3 tracks while singing — no volume jumps, no lost lyrics."
      },
      {
        id: "lo5e5", time: 5, title: "The Subtractive Build", type: "looper",
        checklist: true,
        what: "Start full, remove layers. Professional loopers know subtraction is as important as addition.",
        setup: "Three tracks playing at full arrangement.",
        steps: [
          { text: "All 3 tracks playing. Mute T3 (melody) — what's left?", why: "Removing the melody exposes the rhythm + bass foundation. Hear what each layer contributes by removing it." },
          { text: "Mute T2 (bass) — now only T1 (percussion). How does the energy change?", why: "Going from full to rhythm-only is dramatic. Great for breakdowns in performance." },
          { text: "Bring layers back one at a time: T2 first (bass return), then T3 (full arrangement returns).", why: "The rebuild after subtraction creates a 'drop' effect — very powerful in electronic and loop music." },
          { text: "Practice: full > minus melody > minus bass > just percussion > rebuild. All on beat 1.", why: "The full subtraction-and-rebuild is a complete performance arc in itself." }
        ],
        feel: "Like a DJ breakdown. The moment everything drops out except the kick is one of the most powerful moves in music.",
        wrong: "If subtractions feel random, plan them on specific bar numbers. Subtract on bar 9, bar 13, rebuild on bar 17.",
        levelUp: "Full subtraction and rebuild cycle where every mute/unmute lands on beat 1."
      },
      {
        id: "lo5e6", time: 5, title: "One-Shot Mode", type: "looper",
        checklist: true,
        what: "Set a track to play once and stop. Turns the looper into a sampler for fills and transitions.",
        setup: "Check your mkII manual for one-shot setup (via CTL FUNC or track play mode).",
        steps: [
          { text: "Set Track 3 play mode to ONE SHOT (check [MENU] > MEMORY > TRACK > PLAY MODE for T3).", why: "One-shot = plays the recorded audio once, then stops. It doesn't loop." },
          { text: "Record a short fill on T3 — a vocal exclamation, a guitar stab, a dramatic chord.", why: "One-shots are for moments of emphasis, transitions, intros." },
          { text: "Trigger T3 during a performance — it plays once and stops automatically.", why: "Like firing a sound effect. Hit the button at the right moment for maximum impact." },
          { text: "Practice timing: trigger the one-shot on beat 1 of a specific bar. It should feel like a planned accent.", why: "Random one-shot triggers sound like accidents. Timed triggers sound like arrangement." }
        ],
        feel: "Like having a sound effects board. One-shots add punctuation to your loop performance.",
        wrong: "If the one-shot doesn't stop after playing, check the play mode setting. It might still be in LOOP mode.",
        levelUp: "Trigger a one-shot fill at exactly the right moment during a live performance, 3 times in a row."
      },
      {
        id: "lo5e7", time: 5, title: "Reverse Track Texture", type: "looper",
        checklist: true,
        what: "Record a phrase, reverse it. Core psych/ambient technique for your Khruangbin/Allah-Las aesthetic.",
        setup: "Track 4 empty. Effects off for clean recording.",
        steps: [
          { text: "Record a clean guitar phrase on Track 4 — a chord, an arpeggio, a melodic line.", why: "Start with clear, recognizable audio so the reverse effect is dramatic." },
          { text: "Set T4 playback to reverse (check [MENU] > MEMORY > TRACK > REVERSE or similar for mkII).", why: "Reversed audio = instant psychedelic texture. Attack becomes swell, release becomes attack." },
          { text: "Play the reversed version alongside forward-playing tracks. Listen to the texture.", why: "Reversed guitar over normal guitar is a cornerstone of psych rock production." },
          { text: "Try recording a reversed pad on T4 alongside normal guitar on T3. Layer them.", why: "The combination of forward clarity and reversed atmosphere is the psych-surf sound." }
        ],
        feel: "Like playing a record backward — the sound is familiar but alien. Reversed guitar should feel dreamy and otherworldly.",
        wrong: "If the reversed track sounds like noise, the original recording was too complex. Record something simpler — sustained chords reverse best.",
        levelUp: "A reversed guitar pad that adds psychedelic atmosphere to a 3-track arrangement."
      },
      {
        id: "lo5e8", time: 10, title: "Effects Match: Your Sound", type: "looper",
        checklist: true,
        what: "Build Gene's signature effects chain. Record a loop that sounds like it belongs on an Allah-Las or Skinshape record.",
        setup: "Hold [INPUT FX] to enter edit. Have a reference track ready (Skinshape, Allah-Las, Khruangbin).",
        steps: [
          { text: "Input FX chain: Reverb (spring character, Time: 35, Level: 25) + Tape Echo (Time: 40, Feedback: 20) + Lo-Fi (if available — adds vinyl warmth).", why: "This chain targets the warm, reverb-drenched, lo-fi psych-surf sound." },
          { text: "Record a chord loop with this chain active. Listen.", why: "The effects should make the guitar sound vintage, warm, and atmospheric." },
          { text: "A/B against a reference track from your playlist. Does it live in the same sonic world?", why: "Reference matching is how producers dial in their sound. Your ear knows what 'right' sounds like." },
          { text: "Adjust effect levels until the loop feels like YOUR sound — not a copy, but inspired by the same aesthetic.", why: "Your effects chain is part of your musical identity. Find settings you'd use on every song." },
          { text: "Save these settings to a MEMORY slot so you can recall them instantly.", why: "Your signature sound should be one button press away." }
        ],
        feel: "Like finding your signature amp tone. When you hear it, you'll know — it just sounds like YOU.",
        wrong: "If it sounds like a generic guitar demo, the effects are too subtle. If it sounds like drowning, too much. Find the 'warm bath' zone.",
        levelUp: "A recorded loop that you'd play for someone and say 'this is my sound.'"
      }
    ]
  },
  {
    num: 6, name: "Performance Craft", focus: "Complete Song + Recovery + First Audience",
    duration: "20 min",
    setup: "RC-505mkII fully configured. Effects chain from Level 5. Phone ready for video recording.",
    exercises: [
      {
        id: "lo6e1", time: 10, title: "ILTWYW Blueprint", type: "looper",
        checklist: true,
        tabs: "iltwyw",
        what: "Build the complete ILTWYW song as a loop performance. Your first full song arrangement.",
        setup: "RC-505mkII with your signature effects chain. BPM: 90.",
        steps: [
          { text: "T1: Body percussion (slap-scratch-tap-scratch). Record 4 bars.", why: "Rhythm foundation. The heartbeat of the performance." },
          { text: "T2: Bass roots (A-C-G-D, one per bar, low E/A strings, palm-muted). Record 4 bars.", why: "Bass gives the harmonic floor. Palm muting keeps it clean in the low end." },
          { text: "T3: Island strum pattern from Sarah's lessons (Am-C-G-D). Record 4 bars.", why: "The full chord voicing. This is the recognizable harmonic content." },
          { text: "T4: Vocal pad — sustained 'ooh' harmonies. Record 4 bars.", why: "Warmth and texture. Fills the mid-frequency gap between bass and strum." },
          { text: "Mute/unmute arc: Intro (T1 only, 8 bars) > Verse (T1+T2, 8 bars) > Pre-chorus (+T3, 8 bars) > Chorus (all + live voice). End: strip layers, fade.", why: "This is the three-act structure applied to a real song. Build > peak > resolve." }
        ],
        feel: "The first time ILTWYW comes together as a full loop performance, it should feel like having a full band behind you.",
        wrong: "If it sounds cluttered, check frequency zones. Bass and strum shouldn't occupy the same register.",
        levelUp: "Complete ILTWYW loop performance from build to ending, recognizable as the song."
      },
      {
        id: "lo6e2", time: 5, title: "Clean Endings", type: "looper",
        checklist: true,
        what: "Five ending techniques. Pick your default. A clean ending is as important as a clean loop.",
        setup: "Any multi-track loop arrangement playing.",
        steps: [
          { text: "(a) FADE: slowly pull all faders to zero. Takes 4-8 bars.", why: "The gentlest ending. Good for ambient or ballad performances." },
          { text: "(b) STRIP: remove one layer per bar (reverse of build). T4 > T3 > T2 > T1 > silence.", why: "The 'deconstruction' ending. Satisfying because it mirrors the build." },
          { text: "(c) HARD STOP: ALL START/STOP on beat 1. Instant silence.", why: "The most dramatic ending. Best after a big chorus. The silence is the punctuation." },
          { text: "(d) RING OUT: stop all tracks except T4 (pad). Let it shimmer and decay.", why: "Beautiful for psych-surf aesthetic. The last sound is atmosphere, not rhythm." },
          { text: "(e) REVERSE + FADE: switch a track to reverse, fade it out. Psychedelic ending.", why: "Genre-appropriate for Gene. The reversed sound dissolving is very Allah-Las." }
        ],
        feel: "A clean ending makes the audience want to applaud. A messy ending makes them wonder if you're done.",
        wrong: "If you can't decide, default to the STRIP ending (b) — it always works and mirrors your build.",
        levelUp: "3 different clean endings executed intentionally, each sounding deliberate."
      },
      {
        id: "lo6e3", time: 5, title: "Recovery Drill", type: "looper",
        checklist: true,
        what: "Deliberate mistake + fast recovery. Three failure modes, three solutions.",
        setup: "Multi-track loop arrangement playing.",
        steps: [
          { text: "Scenario 1: Bad overdub. Enter overdub, play wrong notes. UNDO within 2 seconds. Continue.", why: "UNDO is your best friend. Practice until it's a reflex." },
          { text: "Scenario 2: Total disaster. ALL START/STOP > ALL CLEAR > rebuild from Track 1. Time: <8 seconds to new loop.", why: "The nuclear option. Everything gone, start fresh. The audience barely notices if you're fast." },
          { text: "Scenario 3: Wrong track recording. You accidentally recorded on T3 instead of T2. Mute T3 instantly, re-record on T2.", why: "Muting the wrong track ON BEAT 1 makes it sound intentional. Then fix it." },
          { text: "Practice each scenario 3 times. The goal: recovery looks intentional, not panicked.", why: "Professionals don't avoid mistakes — they recover so smoothly that mistakes become features." }
        ],
        feel: "Like a jazz musician who hits a wrong note and immediately turns it into a chromatic approach. Recovery IS the skill.",
        wrong: "If recovery takes more than 5 seconds for any scenario, slow down and practice the button sequence without time pressure.",
        levelUp: "All three recovery scenarios executed in <3 seconds each, looking calm."
      },
      {
        id: "lo6e4", time: 5, title: "The 90-Second Complete Song", type: "looper",
        checklist: true,
        what: "Timer: 90 seconds to build a complete arrangement. Forces decisiveness.",
        setup: "Phone timer set to 90 seconds. RC-505mkII cleared.",
        steps: [
          { text: "Start timer. Record T1 (rhythm) immediately — no deliberating.", why: "Decisiveness is the skill. First idea, go. No second-guessing." },
          { text: "Add T2 (harmony) within 20 seconds of T1.", why: "Keep the momentum. Don't wait for perfection." },
          { text: "Add T3 (melody or texture) by the 45-second mark.", why: "You're past the halfway point. All core layers should be down." },
          { text: "Sing live for 30 seconds. End with a clean ending by 90 seconds.", why: "The last 30 seconds are performance: voice, dynamics, ending." }
        ],
        feel: "Like a timed cooking challenge. The constraint forces creativity and prevents perfectionism.",
        wrong: "If you can't finish in 90 seconds, your layers are too complex. Simplify each layer to the bare minimum.",
        levelUp: "Complete loop arrangement (build, peak, end) in 90 seconds."
      },
      {
        id: "lo6e5", time: 5, title: "Video Self-Review", type: "looper",
        checklist: true,
        what: "Record a full performance on video. Watch it back. Grade yourself on 5 criteria.",
        setup: "Phone propped up to record video from audience perspective.",
        steps: [
          { text: "Record a complete loop performance on video — ILTWYW or any song.", why: "Video captures what your ears miss: timing, body language, flow." },
          { text: "Watch back. Grade 1-5 on: (1) Loops clean? (2) Vocal syncopation correct? (3) Fader moves smooth? (4) Ending intentional? (5) Body language confident or stiff?", why: "Same self-review framework as Sarah's Record & Review days. Systematic improvement." },
          { text: "Write down ONE thing to improve for next session.", why: "Not everything — just one. Focused improvement beats scattered effort." },
          { text: "Watch a loop artist's performance (YouTube) and compare body language with yours.", why: "Visual learning. How do pros handle the physical performance aspect?" }
        ],
        feel: "Like watching game tape. Uncomfortable at first, invaluable for improvement.",
        wrong: "If you only see flaws, watch again and find TWO things that went well. Balance critique with acknowledgment.",
        levelUp: "One video self-review where you score 3+ on at least 4 of 5 criteria."
      },
      {
        id: "lo6e6", time: 5, title: "Emotional Arc", type: "looper",
        checklist: true,
        what: "Design your arrangement for feeling, not just sound. Even two tracks can have dynamics.",
        setup: "Two-track arrangement (any).",
        steps: [
          { text: "Track 1: brooding Am arpeggio (minor, dark, fingerpicked low register).", why: "This sets a mood: tension, introspection, mystery." },
          { text: "Track 2: bright C major strum (major, warm, mid-high register).", why: "C major is resolution after Am. The key change from minor to major = emotional lift." },
          { text: "When T2 enters, does it feel like a RELEASE? Like sunlight breaking through clouds?", why: "You're designing an emotional arc. The entrance of T2 should create a specific feeling." },
          { text: "When you mute T2 (back to T1 alone), does the tension return?", why: "Muting the resolution puts the listener back in tension. This push-pull IS musical storytelling." }
        ],
        feel: "Like scoring a film scene. Am = cloudy, C = sunshine. The mute/unmute IS the emotional arc.",
        wrong: "If both tracks feel emotionally similar, the contrast isn't strong enough. Push Am darker (lower register) and C brighter (higher register).",
        levelUp: "A listener can feel the emotional shift when Track 2 enters and exits."
      },
      {
        id: "lo6e7", time: 10, title: "The Living Room Show", type: "looper",
        checklist: true,
        what: "Perform your full ILTWYW performance for at least one real person. Dub FX's principle: real audience feedback is irreplaceable.",
        setup: "RC-505mkII set up for performance. Audience of 1+ (friend, partner, roommate, video call, Instagram Live).",
        steps: [
          { text: "Set up as if it's a real gig. Levels checked. Effects dialed. MEMORY slot loaded if using one.", why: "Professional setup ritual. It centers you before performing." },
          { text: "Perform ILTWYW from build to ending. Complete performance, no restarts.", why: "The rule: no restarts. Mistakes get recovered, not restarted. This is live performance." },
          { text: "Make eye contact with your audience (or camera). Acknowledge them between sections.", why: "A loop performance is visual. The audience watches you build. Engage with them." },
          { text: "After: ask your audience one question — 'What moment stood out?' Their answer reveals what works.", why: "Audience feedback shows you things self-review can't. What they notice is what matters." }
        ],
        feel: "Terrifying and exhilarating. The adrenaline of a real audience changes everything. Embrace it.",
        wrong: "If you keep delaying this exercise ('I'm not ready'), you're falling into the bedroom practice trap. Dub FX says one day busking = 6 months at home. Just do it.",
        levelUp: "Completed performance for at least one real person. Any quality level counts — the act of performing IS the level-up."
      }
    ]
  },
  {
    num: 7, name: "Effects as Expression", focus: "Track FX + Filters + Beat Effects",
    duration: "20 min",
    setup: "RC-505mkII with multi-track arrangement. Effects unlocked. Hold [TRACK FX] for ~2 sec to enter Track FX edit.",
    exercises: [
      {
        id: "lo7e1", time: 5, title: "Track FX vs Input FX", type: "looper",
        checklist: true,
        what: "Understand the critical distinction: Input FX print to recordings. Track FX process playback non-destructively.",
        setup: "Clean dry loop on Track 1. Hold [TRACK FX] to enter edit.",
        steps: [
          { text: "Record a clean, dry guitar loop on Track 1. No Input FX active.", why: "You need a dry loop to demonstrate the difference." },
          { text: "Hold [TRACK FX] for ~2 sec. Add a Filter effect to Track 1. Toggle it on/off.", why: "Track FX process the playback — the original recording is untouched underneath." },
          { text: "Toggle Track FX off. The original dry loop returns perfectly clean.", why: "NON-DESTRUCTIVE. This is the key difference. Input FX are permanent; Track FX are reversible." },
          { text: "Now record the same phrase with Input FX reverb active. Try to remove the reverb.", why: "You can't. Input FX are baked in. This is why the distinction matters." }
        ],
        feel: "Like the difference between pencil (erasable/Track FX) and pen (permanent/Input FX). Both useful, different commitments.",
        wrong: "If you're adding Track FX and hearing no change, check that the effect is ON and routed to the correct track.",
        levelUp: "Can explain Input FX vs Track FX to someone else in one sentence each."
      },
      {
        id: "lo7e2", time: 10, title: "EQ Frequency Carving", type: "looper",
        checklist: true,
        what: "Per-track EQ to reduce frequency mud. The professional solution to the #1 guitar looper problem.",
        setup: "Three-track loop playing. Hold [TRACK FX] to edit per-track EQ.",
        steps: [
          { text: "Track 1 (percussion): EQ boost low end (+3dB around 100Hz) for kick thump. Cut mid (-3dB around 400Hz).", why: "Boosting low emphasizes the body percussion. Cutting mid prevents it from competing with guitar." },
          { text: "Track 2 (bass): EQ cut low (-4dB below 200Hz) to tighten. Boost upper harmonics slightly.", why: "Tight bass = clarity. Muddy bass = disaster. This is the #1 EQ move for guitar loopers." },
          { text: "Track 3 (melody): EQ cut low entirely. Boost presence (2-4kHz) for sparkle.", why: "Melody should sit on top of everything. Cutting low prevents it from adding mud to the bass range." },
          { text: "A/B test: bypass all EQ, then engage. The difference should be noticeable clarity.", why: "If the A/B difference is subtle, push the cuts harder. You're learning — exaggerate to hear it." }
        ],
        feel: "Like cleaning a foggy window. EQ carving makes each layer pop out of the mix instead of blurring together.",
        wrong: "If EQ changes sound harsh, you're boosting too much. Cutting (reducing) is almost always better than boosting.",
        levelUp: "A/B comparison where the EQ'd version is noticeably clearer than the flat version."
      },
      {
        id: "lo7e3", time: 10, title: "Reverb/Delay as Loop Material", type: "looper",
        checklist: true,
        what: "Record WET signal into the loop, then turn off effects. The loop stays lush while live playing is dry.",
        setup: "Input FX: heavy reverb + tape echo active.",
        steps: [
          { text: "Turn Input FX ON: heavy reverb (Time: 60, Level: 40) + tape echo (Time: 50, Feedback: 30).", why: "More effect than you'd normally use. You're capturing the effect as sound material." },
          { text: "Record a chord loop with these heavy effects. Let the reverb tails ring.", why: "The reverb and echo become part of the loop's texture — lush, atmospheric, dreamy." },
          { text: "Turn Input FX OFF. Your live playing is now dry and clear.", why: "Dry live playing over a wet loop = perfect separation. The loop is atmosphere, you are presence." },
          { text: "Play or sing live over the wet loop. Notice how the dry sound sits on top of the wash.", why: "This is how professionals layer textures without mudding live elements." }
        ],
        feel: "Like singing in a cathedral — the room (loop) is reverberant, but your voice (live) is immediate and present.",
        wrong: "If the wet loop is overwhelming, reduce effect levels. The wet sound should be atmospheric, not chaotic.",
        levelUp: "A wet loop + dry live performance where both elements are clearly audible and serve different roles."
      },
      {
        id: "lo7e4", time: 5, title: "Filter Sweep Drill", type: "looper",
        checklist: true,
        what: "The fundamental dub/reggae technique. Low-pass filter sweep on a guitar loop.",
        setup: "Track FX: Low-Pass Filter assigned to Track 3. Loop playing.",
        steps: [
          { text: "Assign a Low-Pass Filter to Track 3 via Track FX.", why: "Low-pass filter lets low frequencies through and cuts highs. Sweeping it changes the brightness." },
          { text: "Start with the filter closed (cutoff low — sound is muffled, dark).", why: "Closed filter = underwater sound. This is the starting point for a sweep." },
          { text: "Slowly sweep the cutoff open over 4 bars (dark > bright). Use the assigned knob or expression pedal.", why: "The opening sweep is the classic dub/reggae effect. It's in every Khruangbin track." },
          { text: "Reverse: start open (bright), sweep closed (dark) over 4 bars.", why: "Closing the filter creates a 'retreating' or 'fading' effect. Great for transitions." }
        ],
        feel: "Like a wah pedal but smoother. The filter sweep should feel like the track is 'waking up' or 'going to sleep.'",
        wrong: "If the sweep sounds choppy (not smooth), use a knob instead of a button. Buttons = on/off. Knobs = smooth sweeps.",
        levelUp: "Smooth 4-bar filter sweep (open and close) that sounds like a deliberate dub effect."
      },
      {
        id: "lo7e5", time: 5, title: "Psych-Surf Effects Chain", type: "looper",
        checklist: true,
        what: "Build the full effects chain for Gene's psych-surf-reggae aesthetic.",
        setup: "Input FX and Track FX edit modes.",
        steps: [
          { text: "Input FX Bank A: Reverb (spring, Time: 35, Level: 25) + Tape Echo (Time: 40, Feedback: 20) + Lo-Fi (warmth/vinyl character).", why: "This is your 'recording' chain — warm, vintage, Skinshape vibes." },
          { text: "Track FX: Filter (low-pass for dub sweeps) + Slicer (rhythmic gating for reggae chop effects).", why: "These process playback for live manipulation during performance." },
          { text: "Try switching between FX Banks A/B/C/D (in FX edit: hold EDIT, press A/B/C/D).", why: "Each bank can have different settings. Bank A = verse, Bank B = chorus, etc." },
          { text: "Record a loop with Bank A, then switch to Bank B mid-performance. Hear the tonal shift.", why: "Bank switching is how you create tonal dynamics without re-recording." }
        ],
        feel: "Like having a pedalboard with presets — each bank is a different sonic palette for different moments.",
        wrong: "If switching banks causes a volume jump or audio glitch, check that bank levels are matched.",
        levelUp: "Full effects chain set up with at least 2 banks that serve different musical purposes."
      },
      {
        id: "lo7e6", time: 5, title: "Beat FX Introduction", type: "looper",
        checklist: true,
        what: "Beat Repeat and Beat Scatter — DJ-style fills and stutters for transitions.",
        setup: "Track FX: assign Beat Repeat to Track 1 (percussion track).",
        steps: [
          { text: "Assign Beat Repeat to T1 via Track FX. Hold the assigned button to activate.", why: "Beat Repeat stutters the audio — creates a rapid-fire repetition of a small slice." },
          { text: "Hold for exactly 2 beats at the end of bar 8. Release on beat 1 of bar 9.", why: "A 2-beat stutter at the end of a phrase = a fill. Longer than 1 bar sounds chaotic." },
          { text: "Try Beat Scatter: similar but randomizes the slice position. More chaotic, more experimental.", why: "Scatter = controlled chaos. Great for psych sections or transitions." },
          { text: "Try Vinyl Flick: simulates a DJ scratching the record. Quick trigger for punctuation.", why: "Another transition tool. Quick Vinyl Flick at the end of a section = dramatic break." }
        ],
        feel: "Like being a DJ remixing your own music in real time. Beat FX should feel playful and rhythmic.",
        wrong: "If Beat Repeat sounds like a glitch (not a fill), the hold is too long. Keep it under 1 bar. Less is more.",
        levelUp: "2-beat Beat Repeat fill at the end of a phrase that sounds like a planned transition."
      },
      {
        id: "lo7e7", time: 5, title: "FX Banks for Sections", type: "looper",
        checklist: true,
        what: "Different FX banks for different song sections. Tonal dynamics without re-recording.",
        setup: "Multi-track arrangement playing. Input FX banks configured.",
        steps: [
          { text: "Set Bank A = verse sound: subtle reverb, light echo, clean.", why: "Verse = intimate, understated. The effects should recede." },
          { text: "Set Bank B = chorus sound: heavy reverb, lush delay, maybe Lo-Fi warmth.", why: "Chorus = expansive, emotional. The effects should bloom." },
          { text: "Practice switching from Bank A to Bank B at the verse-to-chorus transition.", why: "The tonal shift reinforces the section change. The audience feels it even if they don't analyze it." },
          { text: "For the bridge or breakdown, try Bank C: filter sweep + minimal effects. Stripped down.", why: "Three tonal palettes give you enough variety for a full song arrangement." }
        ],
        feel: "Like changing the lighting in a theater for different scenes. Same stage, different mood.",
        wrong: "If bank switches sound jarring, the effect levels are too different. Aim for subtle shifts, not dramatic jumps.",
        levelUp: "Smooth FX bank switch at a section transition that enhances the musical moment."
      }
    ]
  },
  {
    num: 8, name: "Full Songs", focus: "Three-Act Structure + Song Repertoire",
    duration: "25 min",
    setup: "RC-505mkII with full effects chain. Multiple MEMORY slots available. Quantize: MEASURE for arranged, BEAT for flexible sections.",
    exercises: [
      {
        id: "lo8e1", time: 15, title: "The Three-Act Loop", type: "looper",
        checklist: true,
        what: "A timed 5-minute performance with clear dramatic structure: Build, Peak, Resolution.",
        setup: "Phone timer visible. RC-505mkII cleared. Rhythm guide at 95 BPM.",
        steps: [
          { text: "Act 1 — BUILD (0:00 to 1:30): Start T1 alone. Add one layer every 8 bars. End Act 1 with 3 tracks.", why: "Slow build creates anticipation. Each new layer should feel like a revelation." },
          { text: "Act 2 — PEAK (1:30 to 3:30): All layers playing. Add live vocal. Use effects. This is the energy summit.", why: "The peak is where everything is firing. Maximum layers, maximum engagement." },
          { text: "Act 3 — RESOLUTION (3:30 to 5:00): Strip layers. Simplify effects. Clean ending.", why: "The resolution brings the audience back down. It should feel complete, not abrupt." },
          { text: "Run the complete 5-minute performance without stopping. Record on video.", why: "The three-act structure is the universal storytelling framework. It works for loops too." }
        ],
        feel: "Like a short film — beginning, middle, end. The audience should feel taken on a journey, even in 5 minutes.",
        wrong: "If your build is too fast (all layers by 0:30), slow down. Patience in Act 1 makes Act 2 more powerful.",
        levelUp: "Complete 5-minute three-act performance without stopping, with clear build/peak/resolution."
      },
      {
        id: "lo8e2", time: 10, title: "Sol Del Sur Blueprint", type: "looper",
        checklist: true,
        tabs: "soldelsur",
        what: "Map Sol Del Sur to the RC-505mkII. Your second song in the repertoire.",
        setup: "RC-505mkII with effects. BPM matched to Sol Del Sur.",
        steps: [
          { text: "T1: Rhythm — muted strum pattern matching Sol Del Sur's feel.", why: "The rhythmic foundation specific to this song." },
          { text: "T2: Bass — root notes following Sol Del Sur's chord changes.", why: "Bass establishes the harmonic floor." },
          { text: "T3: Clean guitar hook/riff — the recognizable Sol Del Sur melody.", why: "This is what makes it Sol Del Sur, not generic chords." },
          { text: "T4: Texture pad — reversed chord with reverb for psychedelic atmosphere.", why: "The texture layer adds the psych element that fits Gene's aesthetic." },
          { text: "Apply the three-act structure: build > peak (with live vocal) > resolution.", why: "Same performance framework, different song. The structure is transferable." }
        ],
        feel: "Sol Del Sur should feel sun-drenched and warm. The reversed pad on T4 should add a dreamy quality.",
        wrong: "If it doesn't sound like Sol Del Sur, the guitar hook on T3 is probably wrong. Nail that riff before adding other layers.",
        levelUp: "A recognizable Sol Del Sur loop performance that someone familiar with the song would identify."
      },
      {
        id: "lo8e3", time: 10, title: "Song Deconstruction Method", type: "looper",
        checklist: true,
        what: "The transferable skill: take ANY song and map it to 5 RC-505mkII tracks. Pencil and paper first.",
        setup: "A song you want to loop (from your playlist). Paper and pen. No RC-505mkII yet.",
        steps: [
          { text: "Listen to the song once through. Identify the distinct layers: drums, bass, chords, melody, textures.", why: "Every song is made of layers. Your job is to identify them before recording." },
          { text: "Assign each layer to a track: T1=rhythm, T2=bass, T3=chords, T4=melody, T5=texture.", why: "Using your standard track assignment. Consistency across all songs." },
          { text: "Plan the build order: which track do you record first? What comes next?", why: "The build order IS your performance. Plan it before you touch the looper." },
          { text: "Identify section transitions: verse > chorus — what changes? Mutes? New layers? FX switch?", why: "Understanding how the song moves between sections tells you what to mute/unmute." },
          { text: "Write the plan on paper. THEN go to the RC-505mkII and execute it.", why: "Planning on paper prevents the 'noodling trap' where you spend 20 minutes and achieve nothing." }
        ],
        feel: "Like an architect drawing blueprints before building. The plan makes the execution 10x faster.",
        wrong: "If you skip the paper step and go straight to the looper, you'll noodle. Force yourself to plan first.",
        levelUp: "Written deconstruction of a song you haven't looped before, with all 5 tracks assigned."
      },
      {
        id: "lo8e4", time: 10, title: "Cover Song Loop Adaptation", type: "looper",
        checklist: true,
        what: "Take a song from your listening and build it as a loop arrangement. Expanding your repertoire.",
        setup: "A song from Gene's playlist (Khruangbin, Tommy Guerrero, Skinshape). Song deconstruction plan from previous exercise.",
        steps: [
          { text: "Choose a song. Apply the Song Deconstruction Method from the previous exercise.", why: "You've already done the planning. Now execute." },
          { text: "Record each layer following your track assignments. Build in order.", why: "Following the plan. Each track goes in its assigned slot." },
          { text: "Compare your loop version to the original. What's missing? What's different?", why: "The loop version will be simpler — that's fine. You're capturing the ESSENCE, not recreating the production." },
          { text: "Add your own touch: effects, dynamics, arrangement choices that make it yours.", why: "A cover should honor the original but sound like YOU. Your effects chain is your signature." }
        ],
        feel: "Like covering a song with your band — you're not replicating, you're interpreting.",
        wrong: "If it sounds nothing like the original, the core riff or chord progression is wrong. Fix that first, then add interpretation.",
        levelUp: "A loop cover that's recognizable as the source song but sounds like Gene playing it."
      },
      {
        id: "lo8e5", time: 5, title: "Section Transitions", type: "looper",
        checklist: true,
        what: "Moving from verse to chorus within a loop arrangement. Four approaches.",
        setup: "Multi-track arrangement playing.",
        steps: [
          { text: "(a) Mute/unmute: mute T2 for verse, unmute for chorus. Simplest approach.", why: "Adding or removing a layer is the most common loop transition technique." },
          { text: "(b) Re-record: clear T3 mid-performance, record a new chorus part on T3.", why: "More advanced — requires confident re-recording under performance pressure." },
          { text: "(c) FX bank switch: Bank A for verse tone, Bank B for chorus tone.", why: "Same loops, different processing. Subtle but effective tonal shift." },
          { text: "(d) One-shot transition fill: trigger a one-shot on T5 at the section boundary.", why: "A fill marks the transition point. The audience feels the section change." }
        ],
        feel: "Like a gear shift in a car — smooth transitions keep the momentum, jerky ones break the flow.",
        wrong: "If transitions sound abrupt, add a 1-beat overlap: start the new section slightly before ending the old one.",
        levelUp: "Two different transition types executed smoothly in the same performance."
      },
      {
        id: "lo8e6", time: 5, title: "Memory Slot Workflow", type: "looper",
        checklist: true,
        what: "Save, load, and manage your loop arrangements. Building a set list.",
        setup: "A complete loop arrangement you want to save.",
        steps: [
          { text: "Save: press [EXIT] + [ENTER] simultaneously, then select WRITE. Choose a slot number.", why: "WRITE saves everything: loops, effects, settings. Your complete arrangement is preserved." },
          { text: "Load: press [MEMORY], scroll to your saved slot, press [ENTER].", why: "Loading recalls the complete arrangement. Ready to perform in seconds." },
          { text: "Name your memory slots (if the mkII supports it) or keep a written list: MEMORY 1 = ILTWYW, MEMORY 2 = Sol Del Sur, etc.", why: "In performance, you need to find songs fast. Organization prevents fumbling." },
          { text: "Understand what's saved: loop audio, effects settings, track assignments. What's not: tempo changes made after save.", why: "Knowing what persists prevents surprises when you load a slot at a gig." }
        ],
        feel: "Like saving your game. Your hard work is preserved and ready to recall at any time.",
        wrong: "If you save to the wrong slot and overwrite something, the original is gone. Be deliberate about slot selection.",
        levelUp: "Save and load 3 different arrangements from memory slots without errors."
      },
      {
        id: "lo8e7", time: 5, title: "Bounce In", type: "looper",
        checklist: true,
        what: "Mix multiple tracks down into one, freeing up tracks for more layers. Extends beyond 5 separate layers.",
        setup: "3+ tracks recorded. Check mkII manual for bounce/mix-down feature.",
        steps: [
          { text: "Record tracks on T1, T2, T3. Set their faders to the desired mix balance.", why: "The fader positions determine the mix of the bounced result." },
          { text: "Use the mkII's bounce feature to mix T1+T2+T3 down into T1.", why: "Three tracks become one. T2-T5 are now free for additional layers." },
          { text: "Verify: T1 should sound like all three tracks combined. T2-T5 should be empty and available.", why: "If the bounce sounds wrong, the fader mix was off. Adjust faders and bounce again." },
          { text: "Record new layers on the freed tracks. You've effectively expanded beyond 5 tracks.", why: "Bounce-and-rebuild lets you create complex arrangements that exceed the 5-track limit." }
        ],
        feel: "Like combining ingredients into a sauce — individual elements become one unified thing, freeing up counter space for more cooking.",
        wrong: "If the bounce sounds muddy, your fader levels were too similar. Create contrast: one track louder, others supporting.",
        levelUp: "Successfully bounce 3 tracks into 1 and add 2 new layers on the freed tracks."
      },
      {
        id: "lo8e8", time: 5, title: "Song Transitions", type: "looper",
        checklist: true,
        what: "Move from one song to another in performance. Building a set list workflow.",
        setup: "ILTWYW saved to MEMORY 1. Sol Del Sur saved to MEMORY 2.",
        steps: [
          { text: "Perform ILTWYW (MEMORY 1). End cleanly using one of your ending techniques.", why: "A clean ending is essential before transitioning. No trailing audio from the previous song." },
          { text: "Recall MEMORY 2 (Sol Del Sur). Time from end of song 1 to start of song 2.", why: "The gap between songs should be <10 seconds. Long gaps lose audience energy." },
          { text: "Begin building Sol Del Sur. The audience hears a new song emerging.", why: "The transition from one loop arrangement to another is a set-list-level skill." },
          { text: "Practice until the gap between songs feels natural — like a band changing songs, not a technical difficulty.", why: "A confident transition looks like 'here comes the next one!' not 'hold on, let me load something.'" }
        ],
        feel: "Like a DJ crossfading between tracks. The transition should feel intentional and smooth.",
        wrong: "If the gap is over 15 seconds, practice the MEMORY recall navigation until it's muscle memory.",
        levelUp: "Two-song mini-set (ILTWYW > Sol Del Sur) with clean transition under 10 seconds."
      }
    ]
  },
  {
    num: 9, name: "Improvised Looping", focus: "Real-Time Composition + Creative Constraints",
    duration: "20 min",
    setup: "RC-505mkII with full effects chain. No pre-planned songs. Quantize: OFF for maximum freedom (or MEASURE if you prefer the safety net).",
    exercises: [
      {
        id: "lo9e1", time: 10, title: "The Blank Canvas", type: "looper",
        checklist: true,
        what: "No plan. Set a tempo, record whatever comes to mind, and build from there. Real-time composition.",
        setup: "RC-505mkII cleared. Rhythm guide at 90-110 BPM (Gene's sweet spot). No plan.",
        steps: [
          { text: "Set a tempo between 90-110 BPM. Start the rhythm guide. Take a breath.", why: "A tempo and a breath. That's all you need to start improvising." },
          { text: "Record whatever comes to mind on Track 1. First idea, no filtering. 4 bars.", why: "The first loop doesn't need to be brilliant. It needs to EXIST. Everything builds from it." },
          { text: "Listen to T1 loop. What does it suggest? What harmony, rhythm, or texture would complement it?", why: "Improvised looping is a conversation with yourself. T1 asks a question, T2 answers it." },
          { text: "Add complementary layers on T2 and T3. Let the music guide you, not a plan.", why: "Trust your ear. Your months of practice have trained your musical instincts." }
        ],
        feel: "Like freewriting — the first sentence doesn't matter, but it unlocks the next one. Let the music surprise you.",
        wrong: "If you freeze at the blank canvas, simplify: just record a single chord. ONE chord. Build from there.",
        levelUp: "A 3-layer improvised loop that sounds like a coherent piece of music, created without any plan."
      },
      {
        id: "lo9e2", time: 5, title: "Constraint Improv", type: "looper",
        checklist: true,
        what: "Improvise with a creative constraint. Constraints breed creativity — unlimited choice causes paralysis.",
        setup: "RC-505mkII cleared. Pick a constraint before starting.",
        steps: [
          { text: "Choose a constraint: (a) only 2 tracks, (b) only voice (no guitar), (c) only one chord, (d) build and destroy in 2 minutes, (e) only reversed tracks.", why: "Each constraint forces different creative muscles. Limitations are liberating." },
          { text: "Set a timer for 5 minutes. Work ONLY within your constraint.", why: "The timer adds urgency. The constraint adds focus. Together they prevent overthinking." },
          { text: "Don't break the constraint. If you chose 'only one chord,' resist the urge to change chords.", why: "The constraint is the point. Working within limits reveals possibilities you'd never find with freedom." },
          { text: "After: listen back. What surprised you? What would you keep?", why: "Constraint improv often produces your most interesting ideas because you can't fall back on habits." }
        ],
        feel: "Like poetry with a strict rhyme scheme — the constraint shapes the art in unexpected ways.",
        wrong: "If you break the constraint ('just one more track...'), restart. Discipline IS the exercise.",
        levelUp: "One complete improvisation within your chosen constraint that you're proud of."
      },
      {
        id: "lo9e3", time: 10, title: "Ambient Texture Building", type: "looper",
        checklist: true,
        what: "Atmosphere over rhythm. Heavy reverb, tape echo, filter. Tommy Guerrero / Erland Cooper territory.",
        setup: "Heavy effects: Input FX reverb (Time: 70, Level: 50) + tape echo (Time: 60, Feedback: 35) + Lo-Fi. Quantize: OFF.",
        steps: [
          { text: "Turn Quantize OFF. This is free-time music — no grid.", why: "Ambient music doesn't live on a beat grid. Timing is fluid and organic." },
          { text: "Record a single sustained chord with heavy effects. Let the reverb tail ring.", why: "One chord + heavy reverb = a world of sound. This is your foundation texture." },
          { text: "Add a second texture: a different chord, a single note, a harmonic. Let it layer with the first.", why: "Two textures create depth. The interactions between reverb tails create new sounds." },
          { text: "Just listen. Let it play for 2 minutes. No additions. Just exist in the sound.", why: "Ambient music is about presence, not action. Sitting in the sound IS the practice." }
        ],
        feel: "Like staring at the ocean. The sound washes over you. There's no beat, no progression — just atmosphere and mood.",
        wrong: "If it sounds busy or cluttered, you've added too much. Ambient is about LESS. Remove a layer.",
        levelUp: "A 2-minute ambient soundscape that creates a specific mood — and you can name that mood."
      },
      {
        id: "lo9e4", time: 5, title: "The Khruangbin Groove", type: "looper",
        checklist: true,
        what: "Build a funk/psych groove in the Khruangbin style. Muted rhythm, simple bass, clean delayed melody.",
        setup: "RC-505mkII at 95-105 BPM. Input FX: Tape Echo for the melody track.",
        steps: [
          { text: "T1: Muted guitar funk rhythm — 16th notes on muted strings, bridge pickup. Tight and percussive.", why: "Khruangbin's rhythm guitar is all muted 16th notes. It's the engine of the groove." },
          { text: "T2: Simple bass line — low register, repetitive, Khruangbin-style one-note-per-bar feel.", why: "Khruangbin's bass is melodic but simple. It grooves without showing off." },
          { text: "T3: Clean melody with tape echo — neck pickup, single notes, Khruangbin's signature delayed clean tone.", why: "The melody should be spacious and delayed. Each note rings into the next." },
          { text: "Track FX: Low-pass filter on T1. Sweep it for dub effects.", why: "Filter sweeps on the rhythm track = instant dub/reggae vibes." }
        ],
        feel: "A Khruangbin groove should make you involuntarily nod your head. It's all about the POCKET.",
        wrong: "If the muted rhythm isn't tight, it won't groove. Practice the 16th-note muted strum off the looper first.",
        levelUp: "A groove that makes you nod. That's the only test."
      },
      {
        id: "lo9e5", time: 10, title: "Live Loop Deconstruction", type: "looper",
        checklist: true,
        what: "Watch a pro loop performance, identify the structure, replicate it on your RC-505mkII.",
        setup: "YouTube: search for live loop performances (Ed Sheeran, Tash Sultana, Dub FX, Marc Rebillet). Paper and pen.",
        steps: [
          { text: "Watch a loop performance. Note: what track first? How many total layers? When do they mute?", why: "Studying pros reveals patterns you can steal. Most follow the build > peak > strip framework." },
          { text: "How did they end? Hard stop? Fade? Strip? What was the emotional arc?", why: "Endings tell you a lot about performance craft." },
          { text: "On paper, map their performance to 5 tracks. What would each track be?", why: "This is the Song Deconstruction Method applied to live performances instead of recordings." },
          { text: "Replicate the STRUCTURE (not the music) on your RC-505mkII. Same build order, same mute points, different notes.", why: "Stealing structure is how you learn. The structure is the skeleton; your music is the skin." }
        ],
        feel: "Like studying a chess game — you're not memorizing moves, you're understanding strategy.",
        wrong: "If you're trying to play the same notes as the pro, you're missing the point. Copy the STRUCTURE, not the music.",
        levelUp: "Replicated the structure of a pro performance with your own musical content."
      },
      {
        id: "lo9e6", time: 5, title: "Mood Painting", type: "looper",
        checklist: true,
        what: "Given a mood or scene, build a loop arrangement that evokes it. Purely creative, purely emotional.",
        setup: "RC-505mkII with effects. Choose a mood: sunrise, rainstorm, tension, joy, golden hour on a warm coast.",
        steps: [
          { text: "Choose your mood/scene. Close your eyes for 10 seconds and feel it.", why: "Starting from feeling, not theory. What does 'golden hour on a warm coast' SOUND like?" },
          { text: "Record the first sound that matches the mood. Don't analyze — feel.", why: "Intuition first. Your psych-surf-reggae aesthetic IS the sound of golden hour." },
          { text: "Build layers that deepen the mood. Each addition should make the listener feel MORE of the chosen emotion.", why: "Every layer serves the mood. If a layer doesn't add to the feeling, it doesn't belong." },
          { text: "When the mood is complete (you FEEL it), stop adding. More is not better.", why: "Mood painting is about sufficiency, not maximalism. When the painting is done, stop painting." }
        ],
        feel: "Like being a film composer scoring a scene. Your loop arrangement IS the soundtrack to a moment.",
        wrong: "If the mood is unclear or muddled, you've added too many competing ideas. Simplify to the strongest element.",
        levelUp: "A loop arrangement where a listener could guess the intended mood without being told."
      },
      {
        id: "lo9e7", time: 5, title: "Half-Speed / Double-Speed", type: "looper",
        checklist: true,
        what: "Creative pitch/speed manipulation. Record at one speed, play back at another for psych textures.",
        setup: "Check mkII manual for half-speed/double-speed playback options (may be via track speed or tempo manipulation).",
        steps: [
          { text: "Record a guitar phrase at normal speed on a track.", why: "Start with recognizable audio so the speed change effect is dramatic." },
          { text: "Switch to half-speed playback (if available on mkII). The audio drops an octave and slows.", why: "Half-speed creates deep, warbly textures. Classic psychedelic production technique." },
          { text: "Record a new layer over the half-speed version. This layer is at normal pitch.", why: "Normal pitch + half-speed bass = interesting harmonic contrast." },
          { text: "Switch back to normal speed. The overdub plays back at DOUBLE speed — an octave higher and twice as fast.", why: "The overdub becomes a chipmunk-speed melody. Surprisingly musical in the right context." }
        ],
        feel: "Like discovering a hidden dimension of your music. Speed manipulation creates sounds impossible to play naturally.",
        wrong: "If the result sounds chaotic, the original phrase was too complex. Record something SIMPLE for speed manipulation.",
        levelUp: "A speed-manipulated texture that adds something unique to a loop arrangement."
      }
    ]
  },
  {
    num: 10, name: "Stage Ready", focus: "Reliability + Set List + Audience",
    duration: "25 min",
    setup: "RC-505mkII fully configured. 3+ songs saved in MEMORY slots. Phone for video recording. Effects chain dialed in.",
    exercises: [
      {
        id: "lo10e1", time: 15, title: "The Full Set Piece", type: "looper",
        checklist: true,
        what: "Perform 2-3 songs as a complete set. Record on video. Self-grade against 5 criteria.",
        setup: "MEMORY slots loaded with 2-3 songs. Phone recording video.",
        steps: [
          { text: "Perform your 2-3 song set from start to finish. No restarts. Recover from mistakes.", why: "A set is a continuous experience. Restarting breaks the illusion of a performance." },
          { text: "Record every performance on video. Film from audience perspective if possible.", why: "Video reveals what the audience sees — not just what you hear." },
          { text: "Self-grade: (1) Build creates anticipation? (2) Loops clean? (3) Vocal syncopation correct? (4) Effects serve the music? (5) Ending clean?", why: "5 criteria, each scored 1-5. Total of 20 = passing, 25 = excellent." },
          { text: "Score 4/5 on each criterion = passing. Watch the video to verify your self-assessment.", why: "4/5 means 'would be comfortable performing this for strangers.' That's the bar." }
        ],
        feel: "Like a dress rehearsal. This IS the performance — the only difference is the audience size.",
        wrong: "If you score below 3 on any criterion, that's your focus area for the next session. Don't try to fix everything at once.",
        levelUp: "3 consecutive full-set performances that score 4+ on all 5 criteria."
      },
      {
        id: "lo10e2", time: 10, title: "Pressure Simulation", type: "looper",
        checklist: true,
        what: "Perform under realistic pressure conditions. No warm-up, distractions, time pressure.",
        setup: "RC-505mkII ready. Timer starts immediately. Add distractions: TV, people, phone buzzing.",
        steps: [
          { text: "Timer starts. Perform immediately — no warm-up loop, no test recording.", why: "Real gigs don't have warm-up time. You walk on stage and play." },
          { text: "Add distractions: TV on in the background, people talking, phone buzzing.", why: "Open mics and live venues are NOISY. Practice performing through distraction." },
          { text: "Recover from every mistake without stopping. The show does not stop.", why: "Under pressure, recovery speed drops. This drill builds resilience." },
          { text: "Film from audience perspective. Watch body language — confident or stiff?", why: "Body language under pressure reveals your comfort level. Confident physicality = professional." }
        ],
        feel: "Uncomfortable. That's the point. Controlled discomfort builds performance resilience.",
        wrong: "If you stop the performance because of a mistake, that's the habit you're trying to break. Keep going no matter what.",
        levelUp: "Full performance under pressure with confident body language and smooth recovery from at least one mistake."
      },
      {
        id: "lo10e3", time: 5, title: "Set List Construction", type: "looper",
        checklist: true,
        what: "Build a 3-5 song set list with arc, transitions, and MEMORY slot management.",
        setup: "Paper and pen. RC-505mkII MEMORY slots loaded.",
        steps: [
          { text: "Plan the arc: opener (energy, grab attention), middle songs (variety, contrast), closer (payoff, strongest song).", why: "Every great set has an arc. The opener hooks, the middle explores, the closer delivers." },
          { text: "Assign MEMORY slots in set order: MEMORY 1 = opener, MEMORY 2 = song 2, etc.", why: "Sequential memory slots = faster navigation during performance." },
          { text: "Plan transitions between songs. Which ending technique leads into which opener?", why: "Transitions are the connective tissue. Good transitions make a set feel cohesive, not fragmented." },
          { text: "Write the set list on paper (or tape it to the RC-505mkII). Include: song name, MEMORY slot, BPM, key, ending type.", why: "A physical set list prevents blanking on stage. Even pros use set lists." }
        ],
        feel: "Like planning a dinner party menu — each course complements the next, and the order matters.",
        wrong: "If all songs are the same tempo and mood, the set will feel monotone. Add variety: fast/slow, major/minor, full/stripped.",
        levelUp: "Written set list with 3-5 songs, MEMORY slots assigned, transitions planned."
      },
      {
        id: "lo10e4", time: 5, title: "Audience Engagement", type: "looper",
        checklist: true,
        what: "Practice the visual and social aspects of loop performance. Performing is more than playing.",
        setup: "Performing a loop arrangement. Imaginary or real audience.",
        steps: [
          { text: "Make eye contact with your audience (or camera) while building loops. Look up between button presses.", why: "Eye contact creates connection. Looking down at the looper the whole time = disengaging." },
          { text: "Talk between songs or during builds: 'Let me add some bass to this...' or 'Here we go...'", why: "Narrating the process is part of the loop performance magic. The audience loves watching it happen." },
          { text: "React visibly to your own music: nod to the groove, smile when a loop lands well, show surprise at happy accidents.", why: "Your enjoyment is contagious. If you look bored, the audience feels bored." },
          { text: "Practice a 'stage presence' run: perform a full song focusing ONLY on body language and audience connection.", why: "Separating the physical performance practice from the musical practice. Both need attention." }
        ],
        feel: "Like being a host at a party AND the DJ. You're creating the vibe AND inviting people into it.",
        wrong: "If audience engagement makes you lose musical focus, practice the physical moves (eye contact, talking) over a simple 2-track loop first.",
        levelUp: "A performance where you make eye contact, speak to the audience, AND deliver clean loops simultaneously."
      },
      {
        id: "lo10e5", time: 5, title: "Equipment Failure Recovery", type: "looper",
        checklist: true,
        what: "Simulate equipment failures and practice smooth recovery. The difference between amateur and pro.",
        setup: "Multi-track loop arrangement playing.",
        steps: [
          { text: "Scenario: you recorded on the wrong track. Mute it immediately. Re-record on the correct track.", why: "Wrong-track recording is the most common RC-505mkII mistake. Fast mute = no one notices." },
          { text: "Scenario: a loop has a glitch or timing issue. Mute it, clear it, re-record — all while other tracks play.", why: "The other tracks keep the performance alive while you fix the problem track." },
          { text: "Scenario: you forget where you are in the arrangement. Default to singing live over whatever is playing.", why: "When lost, sing. The audience watches you, not the looper. Singing covers any confusion." },
          { text: "Scenario: an effect sounds wrong (too much, wrong type). Bypass it immediately.", why: "Bad effects are worse than no effects. The bypass button is your friend." }
        ],
        feel: "Like an airline pilot running through emergency procedures. You hope you never need them, but you MUST know them.",
        wrong: "If you freeze during a simulated failure, the procedure isn't automatic yet. Practice each scenario 5 times in isolation.",
        levelUp: "Smooth recovery from each failure scenario in <5 seconds, maintaining performance continuity."
      },
      {
        id: "lo10e6", time: 5, title: "USB Recording Session", type: "looper",
        checklist: true,
        what: "Record a performance directly into a DAW via USB. Studio-quality monitoring reveals hidden issues.",
        setup: "RC-505mkII connected to computer via USB. DAW open (Ableton, GarageBand, etc.). Set USB MODE to VENDOR: [MENU] > SYSTEM > USB > USB MODE > VENDOR.",
        steps: [
          { text: "Connect RC-505mkII to computer via USB. Set USB MODE to VENDOR in [MENU] > SYSTEM > USB.", why: "VENDOR mode enables the mkII as an 8-channel USB audio interface." },
          { text: "In your DAW, select RC-505mkII as the audio input. Arm tracks for recording.", why: "The DAW captures all channels — individual tracks AND the master mix." },
          { text: "Perform a full song. Record in the DAW simultaneously.", why: "Multi-track recording lets you listen to each layer in isolation afterward." },
          { text: "Listen back with studio monitoring. Identify issues invisible through headphones: frequency mud, timing drift, volume imbalance.", why: "Studio monitoring is more revealing than headphones. Issues you've been missing will appear." }
        ],
        feel: "Like hearing your voice on a professional microphone for the first time — revealing but invaluable for growth.",
        wrong: "If the computer doesn't recognize the RC-505mkII, check USB MODE (must be VENDOR) and try a different USB cable.",
        levelUp: "One USB-recorded performance where you identify and address at least one issue you hadn't heard through headphones."
      },
      {
        id: "lo10e7", time: 10, title: "The Open Mic", type: "looper",
        checklist: true,
        what: "The capstone. Perform your set for a real audience. Open mic, beach jam, house party, Instagram Live.",
        setup: "RC-505mkII set up for live performance. Set list ready. Audience present (any size).",
        steps: [
          { text: "Set up early. Sound check. Make sure levels are right for the room/venue.", why: "Professional preparation. Arriving early and sound-checking is what separates amateurs from pros." },
          { text: "Perform your set list: opener > middle songs > closer. Full performance, no restarts.", why: "This is live. Mistakes get recovered. The show goes on." },
          { text: "Engage with the audience. Eye contact, narration, visible enjoyment.", why: "The audience experience is visual + audio. Both matter." },
          { text: "After: reflect. What went well? What surprised you? What do you want to improve?", why: "Post-performance reflection is how growth happens. One live show teaches more than a month of practice." }
        ],
        feel: "Dub FX: 'One day busking = 6 months in the bedroom.' This is that day. The capstone of your looping journey.",
        wrong: "If you keep waiting to be 'ready,' you'll wait forever. Book the open mic. Tell a friend. Set the date. Then prepare FOR it.",
        levelUp: "Performed a live loop set for real people. Any quality level counts — the act of performing IS the level-up."
      }
    ]
  }
];

// ─── LESSON POOL ────────────────────────────────────────────────────
export const LESSON_POOL = [
  {
    id: "lesson-2025-01-13",
    date: "2025-01-13",
    title: "Rhythm, Island Strum & Song Practice",
    duration: "~1hr 10min",
    transcriptFile: "2025-01-13_lesson_sarah.txt",
    buildsOn: [],
    topics: ["rhythm", "guitar", "song"],

    summary: "Gene reports bandmates noticed rhythm improvement. Sarah introduces the island strum over a Surf Rock Beat at 120 BPM with Am-C-G-D, then fingerpicking the same progression. They work on I Like The Way You Walk at 80-90 BPM, focusing on entry timing and staying on beat. Sarah emphasizes the metronome as a constant companion and introduces playing as meditation.",

    exercises: [
      {
        id: "L1-ex1",
        title: "Island Strum over Surf Rock Beat",
        type: "guitar",
        time: 15,
        what: "Play the island strum pattern (down, down-up, up, down-up) over Surf Rock Beat 120 BPM with Am, C, G, D while counting out loud.",
        setup: "Guitar. Surf Rock Beat 120 BPM YouTube video on speaker. Chord shapes Am, C, G, D ready.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start the Surf Rock Beat at 120 BPM. Count the 8-count intro and enter on the one.", why: "Sarah emphasized the entry point is critical. Count 1-2-3-4-5-6-7-8 then come in right after the drum roll." },
          { text: "Play island strum: down, down-up, up, down-up. Count 1-2-3-4 out loud. Stay on Am for 4 bars, then switch to C, G, D.", why: "Counting out loud forces you to internalize the beat while your hands handle the strum." },
          { text: "When the beat changes or does fills, keep going. The tempo stays at 120 BPM no matter what the drummer plays.", why: "Sarah: 'Even when he changes what he plays, don't stop. His runs and fills are gonna stay at 120 beats per minute, so just keep going.'" },
          { text: "Find any consistent rhythmic sound in the beat and latch onto it. Use that as your anchor.", why: "Sarah: 'The main goal is to find a consistent sound that you can jump and latch onto -- find the count within that sound.'" }
        ],
        feel: "When you lock in, the strum should feel automatic. You should be able to hear the drum hits aligning with your count. If the beat has a double-hit pattern, use that as your anchor.",
        wrong: "If you slow down when you start strumming, the strum pattern itself may not be automatic yet. Practice the strum without any backing track first, then add it back.",
        sarah: "That's not cheating. That's exactly how you're supposed to do it. You want to find those consistent rhythms that reoccur and latch onto those.",
        metronome: 120,
        levelUp: "Play through the full 5-minute backing track without falling off beat."
      },
      {
        id: "L1-ex2",
        title: "Fingerpicking Am-C-G-D",
        type: "guitar",
        time: 10,
        what: "Fingerpick the same chord progression using alternating thumb (A string) and pointer (B string) while counting out loud over the Surf Rock Beat.",
        setup: "Guitar. Same Surf Rock Beat 120 BPM. Chord shapes Am, C, G, D.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Fingerpick: alternate thumb on A string and pointer on B string. 4 back-and-forth picks per chord.", why: "This builds the finger independence you need to later layer singing on top." },
          { text: "Count 1-2-3-4 out loud. The count should align with your thumb hits.", why: "Same rhythmic internalization as the strum exercise, different picking technique." },
          { text: "Enter right on the very first beat of the backing track. Try pressing play and getting to your guitar in time.", why: "Sarah: 'See if you can come right in on the very first one.'" },
          { text: "Run the entire backing track. Don't stop after 3-4 minutes.", why: "Sarah: 'Doing things for more than six minutes is so good. The magic really happens beyond three or four minutes.'" }
        ],
        feel: "The picking should become mechanical enough that you can start thinking about other things while staying on beat. That meditative state is the goal.",
        wrong: "If the chord changes throw off your picking rhythm, slow down or stay on one chord until the picking pattern is automatic.",
        sarah: "You're finger picking the same chord progression -- do your A string and your B string. Make sure you are on beat. As soon as you hear that you're off, you gotta stop.",
        metronome: 120,
        levelUp: "Full backing track run-through with clean entries and no drift."
      },
      {
        id: "L1-ex3",
        title: "I Like The Way You Walk -- Strum + Groove Beat",
        type: "song",
        time: 20,
        what: "Learn the strum pattern for ILTWYW over a groove beat, starting at 80 BPM and working up to 90. The song is about 95 BPM.",
        setup: "Guitar. Groove Beat at 80 BPM, then 90 BPM. I Like The Way You Walk reference recording.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Start with Groove Beat at 80 BPM. Learn the 8-count strum pattern: strum on count 1-8, silent on count 2 of the next bar.", why: "The tricky part is getting the silent count in the right place. Sarah spent significant time correcting this." },
          { text: "Use the bass drum as your downbeat anchor. You can really hear it in the groove beat.", why: "Sarah: 'You can use that beat as your downbeat. You can really hear it.' Gene said this made it much easier." },
          { text: "Physically embody the beat: nod your head, stomp, or move some body part on the downbeat.", why: "Sarah: 'I have to move part of my body. You need that downbeat somewhere in your body.'" },
          { text: "Master the strum pattern without the YouTube tutorial video first. Then bring it to the video.", why: "Sarah: 'Master the strum without the video, and then bring it to the video.'" },
          { text: "Record yourself and listen back. Note how long it takes you to realize you've gone off beat.", why: "Sarah: 'Record yourself. You might be like, oh, it took me 20 seconds to hear that I was off. Work it down to five seconds.'" }
        ],
        feel: "When the bass drum locks in with your count, the whole thing suddenly becomes much easier. The strum should feel like riding the beat, not fighting it.",
        wrong: "If you're off beat and don't notice, that's the biggest danger. It's way better to stop every 20 seconds than to keep going off beat -- you'd be training your brain wrong.",
        sarah: "Stop. Fix it fast. It's way better to stop every 20 seconds than to keep going off beat, because if you're not on beat, your brain is not in the state it needs to be in.",
        metronome: 80,
        levelUp: "Clean strum at 90 BPM through the full groove beat track."
      },
      {
        id: "L1-ex4",
        title: "Meditation While Playing",
        type: "guitar",
        time: 10,
        what: "Once locked in on beat, keep playing for 10+ minutes and let your mind wander. The goal is to stay on beat while thinking about other things.",
        setup: "Guitar. Any of the backing tracks (Surf Rock 120 BPM or Groove Beat). Commit to playing the whole track without stopping.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Get locked in on any exercise above -- strum or fingerpick.", why: "You need to be on beat first. The meditation only works when the rhythm is automatic." },
          { text: "Once locked in, let your mind wander. Think about problems, ideas, whatever comes up.", why: "Sarah: 'Some of my greatest ideas that aren't even related to music happen in that state. Your brain will start wandering into thought spaces that are not normal.'" },
          { text: "Stay on beat the entire time. If you drift off, stop, re-enter, keep going.", why: "The exercise trains your body to hold rhythm while your conscious mind does other things." },
          { text: "Do the whole track -- don't stop after three or four minutes.", why: "Sarah: 'The magic really happens beyond three or four minutes. When you're still in it and you are on beat, you can start thinking about other things.'" }
        ],
        feel: "Your body plays while your mind explores. It should feel like a trance state. Neurons are firing in unusual patterns because you're active physically while flowing in thought.",
        wrong: "If your mind wanders and you go off beat, that's the exercise -- notice the drift, stop, re-enter. Don't just keep going off beat.",
        sarah: "Do the whole track. Don't stop after three or four minutes. The magic really happens beyond that. Use it as meditation -- go into it with an intention, but don't get off the beat.",
        levelUp: "Complete a full 10+ minute backing track while thinking about something else entirely."
      }
    ],

    progress: [
      { area: "rhythm", note: "Bandmates noticed improvement in Gene's rhythm since starting lessons with Sarah", direction: "improving" },
      { area: "rhythm", note: "Entry timing is good but slows down slightly when strumming begins", direction: "needs-work" },
      { area: "rhythm", note: "Gene found latching onto consistent rhythmic patterns (double-hit) as anchor -- exactly what Sarah wanted", direction: "improving" },
      { area: "guitar", note: "Chord changes during fingerpicking are solid -- Sarah noted clear improvement", direction: "improving" }
    ],

    sarahQuotes: [
      { quote: "That's not cheating. That's exactly how you're supposed to do it.", context: "When Gene felt like finding a rhythmic pattern to latch onto was cheating" },
      { quote: "The main goal is to find a consistent sound that you can jump and latch onto -- find the count within that sound.", context: "Explaining how to find the beat in a backing track" },
      { quote: "I have to move part of my body. You need that downbeat somewhere in your body.", context: "On the importance of physically embodying the beat" },
      { quote: "Doing things for more than six minutes is so good. The magic really happens beyond three or four minutes.", context: "Encouraging longer practice sessions for the meditative state" },
      { quote: "Stop. Fix it fast. It's way better to stop every 20 seconds than to keep going off beat.", context: "On not practicing mistakes -- the brain is not in the right state when off beat" },
      { quote: "Master the strum without the video, and then bring it to the video.", context: "On learning the ILTWYW strum pattern" },
      { quote: "Record yourself. You might be like, oh, it took me 20 seconds to hear that I was off. Work it down to five seconds.", context: "On self-monitoring rhythm" },
      { quote: "Incorporate the metronome into every single thing that you do.", context: "On making rhythm a constant companion in all practice" },
      { quote: "Doing things slowly and right 100% of the time is way better for your brain than doing them fast and right 80% of the time.", context: "On prioritizing accuracy over speed -- the race car / myelin analogy" },
      { quote: "Some of my greatest ideas that aren't even related to music happen in that state -- when I'm strumming and counting and letting my mind wander.", context: "On the meditative trance state that comes from locked-in playing" },
      { quote: "Your rhythm has gotten better since we've done rhythm stuff together.", context: "Noting Gene's progress mid-lesson" }
    ]
  },
  {
    id: "lesson-2026-01-27",
    date: "2026-01-27",
    title: "Ear Training & Voice Registers",
    duration: "~14min",
    transcriptFile: "2026-01-27_lesson_sarah.txt",
    buildsOn: ["lesson-2025-01-13"],
    topics: ["vocal", "listen"],

    summary: "Sarah introduces ear training by having Gene strum chords and sing the notes he hears without plucking individual strings. Gene discovers an F# over a C chord that works beautifully. Sarah then identifies Gene flipping between head and chest voice and teaches the 'Hey, stop it!' exercise for diaphragm engagement, explains mixed voice and falsetto, and pinpoints Gene's passaggio at A3.",

    exercises: [
      {
        id: "L2-ex1",
        title: "Chord Tone Singing by Ear",
        type: "listen",
        time: 5,
        what: "Strum a chord and sing the notes you hear -- without plucking individual strings. Train your ear to find notes naturally, even ones outside the scale.",
        setup: "Guitar. Quiet room. No backing track -- just you and the guitar.",
        steps: [
          { text: "Strum a C chord once, full and open. Let it ring. Now pluck individual strings -- what's the next note you hear after the strum?", why: "Sarah started by asking Gene to identify individual notes within the chord." },
          { text: "Now strum again but DON'T pluck individual strings. Sing the first note you hear. Commit to it even if it feels wrong.", why: "Sarah: 'You should follow through and make that mistake so that you kind of learn from it.'" },
          { text: "Sing 3-4 notes you hear in the chord. Strum the guitar while singing them to check if they work.", why: "Gene found an F# over C that shouldn't have worked in theory but sounded beautiful because they were coming from Am." },
          { text: "Repeat with Am, G, D. Notice how your ear finds different notes over different chords.", why: "Sarah: 'It's a beautiful thing that our brains naturally find these notes that are outside of the scale.'" }
        ],
        feel: "This should feel exploratory. When a note clicks with the chord, you'll feel it. 'Wrong' notes often turn out to be chromatic connections between chords that sound beautiful.",
        wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them.",
        sarah: "It's actually a great thing that you didn't pluck your guitar in that moment because you found an F sharp, and that's a good thing. Our brains naturally find these notes that are outside of the scale.",
        levelUp: "Find 3+ notes per chord without plucking. Notice one 'surprise' note that works."
      },
      {
        id: "L2-ex2",
        title: "Chest vs Head Voice -- 'Hey, Stop It!'",
        type: "vocal",
        time: 5,
        what: "Discover the physical difference between chest voice and head voice using natural speech. Feel the diaphragm engage on chest voice commands.",
        setup: "Standing or sitting upright. Hand on belly, skin contact. No guitar.",
        steps: [
          { text: "Put your hand on your belly. Say 'Hey!' like someone across the room -- loud, natural. Feel your belly push out against your hand.", why: "Sarah: 'That's your chest voice. Hey, hey! Keep imitating me perfectly!'" },
          { text: "Now say 'Hey' softly, gently, from your head. Notice there's no belly engagement.", why: "Sarah: 'You don't feel that engagement, right? No. Not as much.'" },
          { text: "Say 'Hey, stop it!' -- commit to it, like you mean it. Feel the diaphragm engage.", why: "Sarah used escalating intensity to get Gene to find full chest voice engagement." },
          { text: "Alternate: loud 'Hey!' (chest) then quiet 'hey' (head) then loud 'Hey, STOP IT!' (chest). Feel the flip between them.", why: "Sarah: 'It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs.'" }
        ],
        feel: "Chest voice should make your whole torso resonate. The belly push is unmistakable. Head voice feels lighter, from the neck up, no belly engagement.",
        wrong: "If 'Hey, stop it!' feels like you're just getting louder without the belly engagement, you're pushing from your throat. Think of getting punched in the stomach -- that instinctive flex is what you want.",
        sarah: "It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs. Hey! Hey!",
        levelUp: "Feel a clear, unmistakable difference between chest voice belly-push and head voice lightness."
      },
      {
        id: "L2-ex3",
        title: "Register Flipping -- Head, Chest, Mixed, Falsetto",
        type: "vocal",
        time: 5,
        what: "Practice flipping between vocal registers on command. Find where your voice naturally transitions and develop control over which register you use.",
        setup: "Standing. No guitar. Water nearby.",
        steps: [
          { text: "Sing a comfortable note in chest voice. Now sing the same note from your head voice. Go back and forth.", why: "Sarah noticed Gene flipping uncontrollably between registers on high notes and wanted him to learn to choose." },
          { text: "Find your falsetto -- go up about an octave above where you were. It should be a completely different, lighter quality.", why: "Sarah: 'That's your falsetto. That's like a whole octave above what we were just doing.'" },
          { text: "Find your mixed voice -- use both head and chest together. It should be a big, powerful sound.", why: "Sarah: 'Mixed voice is the most powerful one because you're using your head to get a big sound.'" },
          { text: "Practice flipping: chest to head to mixed to falsetto and back. The goal is choosing which one you use.", why: "Sarah: 'Having that control -- getting the high notes in a quiet way or in a louder way and flipping between the mechanisms -- I think would be great practice for you.'" }
        ],
        feel: "Each register should feel physically different. Chest is belly-engaged and full. Head is lighter, neck-up. Mixed is the best of both -- chest power through head placement. Falsetto is airy and an octave higher.",
        wrong: "If you can't tell which register you're in, go back to the 'Hey, stop it!' exercise and re-establish the chest/head difference first.",
        sarah: "People often think that belting is like yelling, but actually belting is from a mixed voice. If you can mix it, if you know how to mix it, then you can have a huge voice.",
        levelUp: "Flip between all four registers on command on the same pitch (where possible)."
      },
      {
        id: "L2-ex4",
        title: "Find Your Passaggio",
        type: "vocal",
        time: 3,
        what: "Identify exactly where your voice flips from chest to head. Sarah pinpointed Gene's passaggio at A3. This is the zone to train.",
        setup: "Standing. No guitar. Commit fully -- half-singing hides the flip point.",
        steps: [
          { text: "Sing ascending notes with full commitment, starting from around E3. Push air, don't hold back.", why: "Sarah: 'Part of it is commitment too -- you're also not pushing. The question is, when you're fully committing, where do you do the flip?'" },
          { text: "Notice where your voice wants to flip into head voice or falsetto. That's your passaggio.", why: "Sarah identified Gene's flip at A3." },
          { text: "The area 3 notes above and 3 notes below that flip point is where you want to practice.", why: "Sarah: 'That area is where I would really work. You want to be able to have full control over your tone choice when you're choosing those notes.'" }
        ],
        feel: "You should feel the voice transition -- a moment where chest voice stops being comfortable and the voice wants to shift. With commitment, the flip is more obvious.",
        wrong: "If you can't find the flip, you're probably not committing enough. Half-singing and holding back hides the passaggio.",
        sarah: "Your flip is around A3. That area is where I would really work. You want to be able to have full control over your tone choice when you're choosing those notes.",
        levelUp: "Know your flip point on any given day and be able to approach it from both directions."
      }
    ],

    progress: [
      { area: "listen", note: "Gene's ear naturally found F# over a C chord -- musically beautiful chromatic connection from Am", direction: "improving" },
      { area: "vocal", note: "Gene is flipping uncontrollably between head and chest on high notes -- needs to learn to choose", direction: "needs-work" },
      { area: "vocal", note: "Passaggio identified at A3 -- now has a specific zone to train", direction: "new" },
      { area: "vocal", note: "Gene has a beautiful head voice per Sarah -- mixed voice is the next frontier", direction: "new" },
      { area: "vocal", note: "Voice type confirmed as tenor", direction: "new" }
    ],

    sarahQuotes: [
      { quote: "You should follow through and make that mistake so that you kind of learn from it.", context: "On committing to notes even when unsure -- the ear learns from mistakes" },
      { quote: "It's actually a great thing that you didn't pluck your guitar in that moment because you found an F sharp, and that's a good thing. Our brains naturally find these notes that are outside of the scale.", context: "When Gene discovered F# over a C chord that worked musically" },
      { quote: "Commit more, Jean!", context: "Encouraging Gene to push more air and commit to notes" },
      { quote: "It's not even just a volume thing, it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach -- what you would do is flex those abs.", context: "Explaining the physical difference between chest voice and head voice" },
      { quote: "People often think that belting is like yelling, but actually belting is from a mixed voice. If you can mix it, you can have a huge voice.", context: "Explaining what belting actually is -- not yelling, but controlled mixing" },
      { quote: "That's your falsetto. That's like a whole octave above what we were just doing.", context: "Identifying Gene's falsetto register for the first time" },
      { quote: "Mixed voice is the most powerful one because you're using your head to get a big sound.", context: "Advocating for mixed voice as the register to develop" },
      { quote: "So you're like a tenor, yeah, that makes sense.", context: "Confirming Gene's voice type" },
      { quote: "Your flip is around A3. That area is where I would really work. You want to be able to have full control over your tone choice.", context: "Pinpointing the exact passaggio note to train" },
      { quote: "If you are going to find any exercises with that using AI, I would make sure to tell them that you have a man voice because the notes that you flip on are going to be different.", context: "Practical advice on using AI for vocal exercises" }
    ]
  }
];
