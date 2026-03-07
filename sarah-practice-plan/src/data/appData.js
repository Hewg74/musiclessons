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
        what: "This is the main event. Strum + vocals over the groove beat, with focus on syncopated vocal timing.",
        setup: "Guitar. Groove Beat 90 BPM on speaker. Phone ready to record. Lyrics printed/memorized.",
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
        what: "Record three things, listen back immediately, and take notes on what you hear.",
        setup: "Phone propped for video. All backing tracks queued.",
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
        what: "Full song, no stopping. If you drift, re-enter on beat. This trains the recovery skill you need for live playing.",
        setup: "Guitar. Groove Beat 90 BPM. Pretend it's a live performance.",
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

export const VOCAL_EXERCISES = [
  {
    id: "v1", num: 1, title: "Descending 5-Note Scale", purpose: "Approach break from above — where the real mapping happens",
    when: "Days 1, 4. Also good as first vocal exercise of any session.",
    what: "Start above your break on a comfortable note, descend through A3 on a single vowel. The voice naturally transitions from head/mix into chest. You're observing where that happens, not forcing it.",
    referencePitches: getPitchRange("C4", "E3"),
    howTo: [
      "Stand upright, shoulders relaxed, jaw loose.",
      "Start on C4. Sing: C4→B3→A3→G3→F3 on 'nee'. One note per beat at 80 BPM.",
      "Each round starts a half step lower. You'll cross through the break around round 3.",
      "Volume: conversational, 6/10. The quieter you are, the more the flip reveals itself."
    ],
    diagram: "Round 1: C4 → B3 → A3 → G3 → F3\nRound 2: B3 → A#3→ G#3→ F#3→ E3\nRound 3: Bb3→ A3 → Ab3→ G3 → Gb3 ← FLIP ZONE\nRound 4: A3 → Ab3→ G3 → Gb3→ F3 ← deep in it",
    feel: "Around B♭3→A3, you'll notice the voice 'settling' — like stepping off a curb. The tone gets slightly heavier, warmer, more chest-resonant. The 'nee' vowel naturally brightens the sound, making the transition smoother.",
    wrong: "If you're straining to keep the same tone quality all the way down, you're fighting the flip. Let it happen. The voice WANTS to shift. Your job is to make the shift gradual, not to prevent it.",
    tip: "Why 'nee'? The closed vowel + nasal consonant keeps the sound forward and bright, which encourages mix voice through the break. 'Ah' would drop into chest too early.",
    progression: "Week 1: Observe the flip. Week 2: Try to make it smoother. Week 3: See if you can 'delay' the flip by one half step."
  },
  {
    id: "v2", num: 2, title: "Messa di Voce", purpose: "The #1 exercise for building a seamless mix — quiet→loud→quiet on one note",
    when: "Days 1, 5. Critical for passaggio control.",
    what: "Sing a single note in your break zone. Start as quiet as possible, swell to medium volume, back to quiet. The crescendo tries to pull you into chest voice. The goal: stay in mix through the entire swell.",
    referencePitches: getPitchRange("G3", "C4"),
    howTo: [
      "Stand. Breathe into your ribs (not your shoulders). Feel your ribcage expand sideways.",
      "Sing 'ah' on G3 at piano (pp). Hold for 2 seconds.",
      "Swell to mezzo forte (mf) over 3 seconds. Then decrescendo back to pp over 3 seconds.",
      "3 cycles on G3, then move to A♭3, A3, B♭3.",
      "BREATH (Appoggio): Maintain outward rib expansion as you exhale. Don't let your ribs collapse. This is what makes the swell possible without strain."
    ],
    diagram: "pp ━━━━━━━━ mf ━━━━━━━━ pp\n          (8 seconds)\n\nG3:  ●●● (should feel easy)\nA♭3: ●●● (getting interesting)\nA3:  ●●● (the crescendo wants to flip you)\nB♭3: ●●● (let it flip if it wants)",
    feel: "On G3, this should feel effortless — like humming. On A♭3, you'll start to feel a 'choice point' during the crescendo: the voice wants to either push into full chest or thin out into head. On A3, the crescendo is the test — can you swell without the voice flipping? If it does flip, that's fine. On B♭3, you'll likely be shifting into light head voice by the quiet part.",
    wrong: "If the swell sounds like a sudden jump from quiet to loud (instead of a gradual ramp), slow down the crescendo. If the voice cracks during the swell on A3, reduce your maximum volume — don't go all the way to mf, stop at mp.",
    tip: "VOWEL MODIFICATION: As you approach A3, let 'ah' drift toward 'uh'. This lowers the first formant, letting the vocal folds thin out for mix voice instead of hitting the chest voice ceiling. It should sound rounder, not darker.",
    progression: "Week 1: Get comfortable with the shape (pp→mf→pp). Week 2: Smooth out the swell on A♭3 and A3. Week 3: Try to keep the same tone quality throughout the entire swell on A3."
  },
  {
    id: "v3", num: 3, title: "Siren Glides", purpose: "Map your entire range, find the exact flip points, and train smooth transitions",
    when: "Days 2, 4, 5. Good warm-up. Good diagnostic.",
    what: "Lip trill (or sustained 'vvv') gliding from your lowest note up to your highest and back. The lip trill adds SOVT backpressure which makes the transition through the break easier.",
    referencePitches: getPitchRange("C2", "G4"),
    howTo: [
      "Lips together, loose. Start a lip trill (like a horse noise).",
      "If lip trills are hard, use 'vvv' or hum through a straw instead.",
      "Start on your lowest comfortable note (~C2). Glide UP to your highest head voice (~G4). 4–5 seconds up.",
      "Glide back DOWN in 4–5 seconds.",
      "Rounds 3–5: SLOW DOWN through the A♭3→A3→B♭3 zone. Take 3–4 seconds just for those three notes."
    ],
    diagram: "C2 ══════════════════════════════ G4\n           smooth glide up →\n    ← smooth glide down\n\n         ┃ SLOW ZONE ┃\n         A♭3 ── A3 ── B♭3\n         Take 3–4 sec here\n         Listen: crack? shift? smooth?",
    feel: "The siren should feel like an elevator ride. In chest voice (C2→G3), it feels warm and full. Through the break (A♭3→B♭3), you might feel the sound 'thin out' or the trill become uneven. In head voice (B3→G4), it feels lighter, buzzier, more in your head/mask. The uneven zone is your passaggio — exactly where you're training.",
    wrong: "If the trill STOPS during the break (complete cutout, not just unevenness), you may be pushing too much air. Back off to 50% airflow. The trill should be continuous, even if it wobbles.",
    tip: "SOVT (Semi-Occluded Vocal Tract) exercises like lip trills create backpressure that helps the vocal folds transition between registers more smoothly. Think of it as training wheels for the passaggio. The trill does some of the work for you.",
    progression: "Week 1: Complete the full range (cracks are fine). Week 2: Cracks become wobbles. Week 3: Wobbles become gradual shifts."
  },
  {
    id: "v4", num: 4, title: "Rhythmic Pitch Matching", purpose: "Connect pitch accuracy to rhythmic placement — you need both for real singing",
    when: "Days 2, 3. Builds toward syncopated vocal placement.",
    what: "Over a groove beat with Am on guitar, sing specific chord tones on specific beats. Then move them to off-beats. This fuses pitch training with rhythm training.",
    referencePitches: getPitchRange("A2", "C4"),
    howTo: [
      "Guitar: Am chord. Groove Beat 90 BPM playing.",
      "Sing Am chord tones: Root (A2) on beat 1, 3rd (C3) on beat 3.",
      "Next bar: 5th (E3) on beat 1, Octave (A3) on beat 3.",
      "Descend back down over 2 bars.",
      "Repeat for C, G, D chords with their chord tones.",
      "LEVEL UP: Once comfortable, move the notes to &'s instead of beats. Same pitches, syncopated."
    ],
    diagram: "Am chord:\n  Bar 1: A2 (beat 1) ── C3 (beat 3)\n  Bar 2: E3 (beat 1) ── A3 (beat 3) ← break zone!\n  Bar 3: E3 (beat 1) ── C3 (beat 3)\n  Bar 4: A2 (beat 1) ── rest\n\nSYNCOPATED VERSION:\n  Bar 1: ── A2 (& of 1) ── C3 (& of 3)\n  Bar 2: ── E3 (& of 1) ── A3 (& of 3)\n  ...",
    feel: "On-beat version should feel like 'placing' notes on a shelf — deliberate and precise. The syncopated version should feel like the notes are floating between the beats, similar to the lyric placement exercise.",
    wrong: "If you're hitting approximately-right pitches (close but not quite), play the target note on guitar first, listen, then sing it. Pitch memory is a skill that improves with exact reference points.",
    tip: "When you sing A3 on beat 3 of bar 2, you're singing in your break zone. This is intentional — it trains you to navigate the passaggio while thinking about rhythm, which is exactly what real singing demands.",
    progression: "Week 1: On-beat, all pitches accurate. Week 2: Syncopated version. Week 3: Improvise your own patterns staying on chord tones."
  },
  {
    id: "v5", num: 5, title: "Ooh Climbing", purpose: "Improvised ascending patterns — the bridge between exercises and real singing",
    when: "Days 3, 4. Originated from Lesson 1/27.",
    what: "Over a chord progression, sing 4 ascending 'ooh' notes per chord. Each chord gets different notes. Push through the break zone as you repeat.",
    referencePitches: getPitchRange("A2", "C4"),
    howTo: [
      "Guitar: Am → C → G → D. Island strum or fingerpick at 120 BPM (Surf Rock Beat).",
      "On Am: sing 4 'ooh' notes that CLIMB. Example: A2→C3→E3→A3.",
      "On C: sing 4 DIFFERENT climbing notes. Example: C3→E3→G3→C4.",
      "On G and D: keep climbing, keep changing the pattern.",
      "As you repeat cycles, push the range higher. Let yourself enter the break zone.",
      "COMMIT to each note. More air = better pitch."
    ],
    diagram: "Am:  ooh → ooh → ooh → ooh  (climbing)\nC:   ooh → ooh → ooh → ooh  (different!)\nG:   ooh → ooh → ooh → ooh  (explore)\nD:   ooh → ooh → ooh → ooh  (commit!)\n\nCycle 2: Start higher on Am\nCycle 3: Push into break zone\nCycle 4: Explore head voice territory",
    feel: "This should feel like musical exploration — you're improvising a melody in real time over a chord progression. When you enter the break zone, the voice may thin out or crack. That's not failure, it's the exercise working. A committed crack teaches your voice more than a safe whisper.",
    wrong: "If you sing the same 4 notes on every chord, you're on autopilot. Force yourself to start on different notes, use different intervals. The point is exploration, not repetition.",
    tip: "'Commit' is Sarah's most frequent instruction. Physiologically, 'more air' means more subglottic pressure, which gives the vocal folds more to work with. Soft/breathy singing in the break zone just makes the folds unable to phonate cleanly. Push the air, let the voice figure it out.",
    progression: "Week 1: Comfortable climbing in chest range. Week 2: Regularly entering break zone. Week 3: Occasional head voice notes without backing down."
  },
  {
    id: "v6", num: 6, title: "Rhythmic Scat Improvisation", purpose: "The endgame — rhythm + pitch + improv in real time",
    when: "Day 4. Advanced exercise — do this only after the others feel comfortable.",
    what: "Over a groove beat, improvise scat syllables following chord tones. Start simple, increase rhythmic complexity. This is the closest thing to actual improvised singing.",
    referencePitches: getPitchRange("A2", "C4"),
    howTo: [
      "No guitar. Groove Beat 90 BPM.",
      "Use syllables: 'doo' 'bah' 'dee' 'dah'.",
      "Follow Am → C → G → D chord tones (you should know them from Ex 4).",
      "Level 1: One syllable per beat. 'doo . . doo . . doo . . doo'",
      "Level 2: Move syllables to &'s. '. doo . . doo . . doo . . doo'",
      "Level 3: 16th note bursts. 'doo-ba-dee . doo-ba-dee . doo'",
      "Record 2 minutes."
    ],
    diagram: "Level 1 (on-beat):\n  doo · · doo · · doo · · doo\n   1       2       3       4\n\nLevel 2 (syncopated):\n  · doo · · doo · · doo · · doo\n     &       &       &       &\n\nLevel 3 (16th note bursts):\n  doo-ba-dee · doo-ba-dee · doo\n   1 e &        2 e &        3",
    feel: "Level 1 should feel like the pitch matching exercise with different syllables. Level 2 is the lyric placement exercise with scat. Level 3 is where it gets creative — you're combining the 16th note subdivision skill with real-time pitch choices.",
    wrong: "If it sounds random (no connection to the chords), simplify. Go back to Level 1 and just sing root notes of each chord. Build back up.",
    tip: "Record yourself and listen back. The diagnostic: are the syncopations INTENTIONAL or ACCIDENTAL? Intentional syncopation = you chose to place that note off-beat. Accidental = you lost the beat. You can hear the difference — intentional sounds musical, accidental sounds lost.",
    progression: "Week 1: Comfortable at Level 1. Week 2: Clean Level 2. Week 3: Musical-sounding Level 3."
  },
  {
    id: "v7", num: 7, title: "Ear Training — Chord Tone Singing", purpose: "Train your ear to naturally find notes over chords — 'wrong' notes can be beautiful",
    when: "Days 3, 6. Before song practice sessions.",
    what: "Strum a chord on guitar and sing the notes you hear — without plucking individual strings first. Your ear will naturally find notes in the scale, and sometimes beautiful notes outside it. Sarah discovered Gene singing F# over a C chord during the Jan 27 lesson, which worked musically because they were transitioning from Am.",
    referencePitches: getPitchRange("C3", "C4"),
    howTo: [
      "Strum a C chord once, full and open. Let it ring.",
      "Without thinking too hard, sing the first note you hear. Don't pluck individual strings — trust your ear.",
      "Sing 3–4 notes you hear in the chord, one at a time. Commit to each one even if it feels wrong.",
      "Now strum the chord again while singing those notes. Do they work? Even the 'wrong' ones?",
      "Repeat with Am, G, D. Notice how your ear finds different notes over different chords."
    ],
    diagram: "Strum C → sing what you hear\n  ↓\nYou might find: C, E, G (chord tones)\n  or: F# ('wrong' but beautiful!)\n  ↓\nStrum + sing together → does it work?\n  ↓\nIf yes: your ear found something beautiful\nIf no: follow through anyway — learn from it",
    feel: "This should feel exploratory, not like a test. There are no wrong answers — your ear is finding musical connections your conscious mind doesn't know about. When a note 'clicks' with the chord, you'll feel it resonate in your chest.",
    wrong: "If you're plucking individual strings to find the notes first, you're bypassing your ear. The whole point is to let your singing brain find them, not your guitar brain.",
    tip: "Sarah found that Gene's 'wrong' F# over C was actually musically beautiful because they were transitioning from Am. Your brain naturally makes chromatic connections between chords — trust it. As Sarah said: 'It's actually a great thing that you didn't pluck your guitar in that moment because you found something your fingers never would have.'",
    progression: "Week 1: Find 2–3 notes per chord. Week 2: Sing patterns over chord changes. Week 3: Improvise melodies using only ear-found notes."
  },
  {
    id: "v8", num: 8, title: "Chest Voice Activation — 'Hey, Stop It!'", purpose: "Find your chest voice through natural speech — feel the diaphragm engage",
    when: "Before any vocal exercise. Great warm-up for Days 1, 3, 5.",
    what: "Use conversational exclamations to naturally engage your chest voice and diaphragm. Sarah's 'Hey, stop it!' exercise helps you feel the physical difference between chest voice (diaphragm engaged, belly pushes out) and head voice (lighter, no belly engagement). Understanding this difference is the foundation for mixed voice and belting.",
    referencePitches: getPitchRange("F3", "B3"),
    howTo: [
      "Put your hand on your belly, skin contact under your shirt.",
      "Say 'Hey!' like someone across the room — loud, natural, conversational.",
      "Feel your belly push against your hand? That's your diaphragm. That's chest voice.",
      "Now say 'Hey' softly, gently, from your head. Notice: no belly push.",
      "Say 'Hey, stop it!' — commit to it, like you mean it. That's full chest voice.",
      "Alternate: loud 'Hey!' (chest) → quiet 'hey' (head) → loud 'Hey, STOP IT!' (chest). Feel the flip."
    ],
    diagram: "CHEST VOICE: 'HEY, STOP IT!'\n  → Belly pushes out\n  → Diaphragm engaged\n  → Louder, fuller tone\n  → Like yelling across a room\n\nHEAD VOICE: 'hey...'\n  → No belly engagement\n  → Lighter, gentler\n  → Neck up\n  → Like a whisper that carries\n\nMIXED VOICE: Best of both\n  → Head voice muscles + chest power\n  → This is what belting actually is\n  → Not yelling — it's controlled mixing",
    feel: "When you nail chest voice, your whole torso resonates. It should feel like the sound is coming from your gut, not your throat. The belly push is unmistakable once you feel it. Head voice feels like the sound floats above your shoulders.",
    wrong: "If 'Hey, stop it!' feels like you're just getting louder without the belly engagement, you're pushing from your throat. Think of getting punched in the stomach — that instinctive flex is what you want.",
    tip: "Sarah explained: 'It's not even just a volume thing — it's an engagement of that diaphragm muscle down there. Like you're getting hit in the stomach — what you would do is flex those abs.' People often think belting is yelling, but actually belting is from a mixed voice. If you can mix it, you can have a huge voice.",
    progression: "Week 1: Feel the clear difference between chest and head. Week 2: Flip between them on command. Week 3: Find your mixed voice — chest power through head voice placement."
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
