import { getPitchRange } from '../utils.js';

export const week_2026_03_17 = {
  id: "week-2026-03-17",
  weekOf: "2026-03-17",
  lessonDate: "2026-03-15",
  focus: "Rhythm Internalization & Fingerpicking Foundation",
  teacherNotes: "",
  carryForward: [],
  days: [
  {
    num: 1, name: "Foundation", focus: "Metronome Internalization", duration: "50–55 min",
    setup: "Metronome app on phone, guitar in lap, something to tap on (thigh or table). Quiet room.",
    exercises: [
      {
        id: "w0317-d1e1", time: 10, title: "Full Count", type: "rhythm",
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
        id: "w0317-d1e2", time: 8, title: "&'s Only", type: "rhythm",
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
        id: "w0317-d1e3", time: 8, title: "16th Notes", type: "rhythm",
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
        id: "w0317-d1e4", time: 12, title: "Fingerpick + Count", type: "guitar",
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
        id: "w0317-d1e5", time: 12, title: "Passaggio Warm-Up", type: "vocal",
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
        id: "w0317-d1e6", time: 5, title: "Listening Analysis", type: "listen",
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
        id: "w0317-d2e1", time: 10, title: "Metronome Drills #1 & #2", type: "rhythm",
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
        id: "w0317-d2e2", time: 12, title: "Lyric Placement", type: "vocal",
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
        id: "w0317-d2e3", time: 15, title: "Sol Del Sur — Lead", type: "guitar",
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
        id: "w0317-d2e4", time: 10, title: "Sirens + Pitch Match", type: "vocal",
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
        metronome: 90,
        levelUp: "Siren through A3 with gradual thinning instead of crack."
      }
    ],
  },
  {
    num: 3, name: "Application", focus: "I Like The Way You Walk", duration: "50 min",
    setup: "Guitar, Groove Beat 90 BPM, metronome, phone to record.",
    exercises: [
      {
        id: "w0317-d3e1", time: 8, title: "Metronome Maintenance", type: "rhythm",
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
        id: "w0317-d3e2", time: 7, title: "16th Note Drill", type: "rhythm",
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
        id: "w0317-d3e3", time: 20, title: "ILTWYW — Full Work", type: "song",
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
        metronome: 90,
        levelUp: "Hear the difference between your syncopation and the original's."
      },
      {
        id: "w0317-d3e4", time: 10, title: "Ooh Climbing + Messa di Voce", type: "vocal",
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
        metronome: 120,
        levelUp: "Climb through A3 without backing down. Crack is data."
      }
    ],
  },
  {
    num: 4, name: "Deep Practice", focus: "Stacking Skills", duration: "55 min",
    setup: "Guitar (electric for Sol Del Sur, acoustic for fingerpick), metronome, backing tracks, phone to record.",
    exercises: [
      {
        id: "w0317-d4e1", time: 10, title: "Metronome Speed Push", type: "rhythm",
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
        id: "w0317-d4e2", time: 12, title: "Fingerpick + Singing", type: "guitar",
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
        id: "w0317-d4e3", time: 15, title: "Sol Del Sur — Strum + Lead", type: "guitar",
        tabs: "soldelsur",
        tracks: [{ name: "Sol Del Sur — Reference", src: "/sol-del-sur.mp3" }],
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
        id: "w0317-d4e4", time: 15, title: "Full Passaggio Workout", type: "vocal",
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
        metronome: 90,
        levelUp: "Scat improv where syncopations sound intentional, not accidental."
      }
    ],
  },
  {
    num: 5, name: "Recording Day", focus: "Record Everything", duration: "45 min",
    setup: "Phone propped up for video. Good lighting if possible. Guitar, all backing tracks ready.",
    exercises: [
      {
        id: "w0317-d5e1", time: 8, title: "Metronome Maintenance", type: "rhythm",
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
        id: "w0317-d5e2", time: 25, title: "Record & Review", type: "record",
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
        metronome: 90,
        levelUp: "Identify drift within 2–3 beats. Sol Del Sur video sent to Sarah."
      },
      {
        id: "w0317-d5e3", time: 12, title: "Vocal: Record + Review", type: "vocal",
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
        id: "w0317-d6e1", time: 8, title: "Graduation Test", type: "rhythm",
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
        id: "w0317-d6e2", time: 10, title: "Lyric Improv", type: "vocal",
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
        id: "w0317-d6e3", time: 15, title: "ILTWYW — Performance Run", type: "song",
        tabs: "iltwyw",
        what: "Full song, no stopping. If you drift, re-enter on beat. This trains the recovery skill you need for live playing.",
        setup: "Guitar. I Like The Way You Walk backing track. Pretend it's a live performance.",
        tracks: [{ name: "I Like The Way You Walk", src: "/iltwyw.mp3" }],
        steps: [
          { text: "Groove Beat 90 BPM. Full song: strum + vocals.", why: "This is a run-through, not a drill. No stopping." },
          { text: "If you drift off beat: DO NOT STOP. Re-enter on the next beat.", why: "Sarah (1/13): 'Stop as soon as you realize you're off beat, and enter back in on beat.' The key metric is how quickly you recover." },
          { text: "Goal: shorter drift time + cleaner re-entry each time.", why: "In live performance, nobody hears a 1-beat drift. They hear a 4-bar train wreck." },
        ],
        feel: "This should feel like performing. The pressure of 'don't stop' creates a different mindset than drilling. Recovery is a skill — you're practicing the recovery, not the mistake.",
        wrong: "If you stop and restart, you've turned a performance into a drill. Commit to the no-stop rule.",
        sarah: "If you start falling off, as soon as you realize it, either try to get back in or pause, listen, and jump back in. It's way better to stop every 20 seconds than to keep going off beat — because if you're not on beat, your brain is not in the state it needs to be in.",
        metronome: 90,
        levelUp: "Complete ILTWYW run without restart. Re-entries within 1 beat."
      },
      {
        id: "w0317-d6e4", time: 12, title: "Sol Del Sur — Full Pass", type: "guitar",
        tabs: "soldelsur",
        what: "Play along with the actual recording. Alternate lead and strum sections.",
        setup: "Electric guitar. Sol Del Sur at full speed.",
        tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
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
        id: "w0317-d7e1", time: 5, title: "Light Metronome", type: "rhythm",
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
        id: "w0317-d7e2", time: 20, title: "Free Improvisation", type: "play",
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
        metronome: 120,
        levelUp: "Stay on beat while thinking about something else."
      },
      {
        id: "w0317-d7e3", time: 10, title: "Free Singing", type: "vocal",
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
]
};
