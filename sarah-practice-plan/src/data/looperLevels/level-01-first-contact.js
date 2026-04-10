export const level1 = {
  num: 1, name: "First Contact", focus: "Interface + First Clean Loop",
  duration: "45 min",
  setup: "RC-505mkII powered on, headphones in PHONES jack, guitar in INST 1 input. No effects. Quantize: MEASURE [MENU] > MEMORY > PLAY > QUANTIZE. Loop Sync: ON [MENU] > MEMORY > TRACK > LOOP SYNC. Rhythm guide at 80 BPM.",
  exercises: [
    {
      id: "lo1e1", time: 5, title: "The Box Tour", type: "looper",
      checklist: true,
      what: "Physical interface orientation. No music yet — just learn where everything is. The RC-505mkII has five track buttons, five faders, an ALL START/STOP button, MEMORY navigation, and four assignable knobs on the home screen. You need to find every one of them by touch before you make a single sound.",
      setup: "RC-505mkII powered on, nothing plugged in except headphones.",
      steps: [
        { text: "Press all 5 track buttons one at a time. Watch the LED cycle: dark (empty) > RED (recording) > AMBER (overdub) > GREEN (playing). Press each button through the full cycle and back to dark.", why: "Every button press changes state. The LED color tells you what that track is doing at a glance — red means it's capturing audio, amber means it's adding to an existing loop, green means it's playing back. You need to read these colors without thinking, the way you read a traffic light." },
        { text: "Move all 5 faders up and down. These control track volume in real time. Push each one from zero to max and back while watching the output meter.", why: "Faders are your live mix controls — you'll ride these during performance. They're the most-touched part of the 505. Notice the physical resistance and travel distance so your hands learn the range." },
        { text: "Find ALL START/STOP (the big button at the bottom center). Press it. This stops or starts all tracks simultaneously.", why: "Your emergency brake and your performance restart button. In a live situation, this is how you kill everything cleanly or launch all tracks at once. Knowing where it is without looking is non-negotiable." },
        { text: "Navigate MEMORY slots: press [MEMORY], scroll with the VALUE knob, press [ENTER] to load a new memory slot. Try loading 3 different slots.", why: "Memory slots save your loop arrangements. Each slot stores all 5 tracks, their volumes, effects, and settings. You'll build a set list from these slots — think of them as song presets." },
        { text: "Find and identify these knobs on the home screen: knob [1] = mic input level, knob [2] = instrument input level, knob [3] = master output, knob [4] = tempo. Touch each one and say its function out loud.", why: "These four knobs control your core levels. Mis-identifying even one during performance can mean cranking your mic when you meant to adjust tempo. Saying the function out loud creates a verbal-motor link that sticks." }
      ],
      feel: "Like learning where the pedals, mirrors, and turn signals are in a new car before you drive it anywhere. No pressure, no sound — just spatial awareness. Your hands are building a map of the hardware that your brain will reference every time you perform.",
      wrong: "If you're trying to make music, stop. This is purely physical orientation. Music comes in exercise 4. If you skip this step, you'll be fumbling for buttons during your first real loop and that frustration will sour the experience. Invest five minutes now to save hours of confusion later.",
      sarah: "Gene, I know you want to plug in and start looping immediately — every new student does. But the 505 has a lot of buttons, and learning where they are BEFORE you're trying to make music means your first loop will feel magical instead of frustrating. Think of it like the first time you held your guitar — you explored the tuners, the frets, the sound hole before you played a note. Same energy here.",
      metronome: 80,
      levelUp: "Can find and press any control within 2 seconds without looking at the manual."
    },
    {
      id: "lo1e2", time: 5, title: "Rhythm Guide Setup", type: "looper",
      checklist: true,
      what: "Using the mkII's internal rhythm guide instead of your phone metronome. This is your click track in performance — always available, routable to headphones only, with 200+ patterns from simple clicks to full drum grooves.",
      setup: "RC-505mkII powered on, headphones connected.",
      steps: [
        { text: "Press [MENU] > RHYTHM to enter rhythm guide settings. This opens the built-in metronome/rhythm section.", why: "The rhythm guide is your built-in metronome — no phone needed during performance. Having the click inside the looper means one fewer device on your table and zero latency between click and recording." },
        { text: "Set BPM two ways: first, tap [TAP TEMPO] four times at your target speed. Then try turning knob [4] on the tempo screen for precise adjustment.", why: "Tap tempo is faster for dialing in a feel — if you're matching a song in your head, tap along with it. The knob is precise for exact BPM values. Learn both because you'll use each in different situations." },
        { text: "Select a pattern from the 200+ built-in patterns. Start with a simple 4/4 click — no drums, no fills, just the click. You can explore drum patterns later.", why: "The mkII has everything from simple clicks to full drum patterns with fills and swing. Start simple so the pattern doesn't distract from your looping practice. A plain click is the most honest mirror for your timing." },
        { text: "Route the rhythm guide to headphones only: [MENU] > RHYTHM > OUTPUT > set to PHONES or HEADPHONE. Verify by unplugging headphones — you should hear nothing from the main output.", why: "In performance, the audience should NOT hear your click track. Headphones-only routing is critical. If the click bleeds into your loops or your PA, it sounds amateur and distracting." },
        { text: "Practice starting and stopping the rhythm guide while tapping your foot to it. Get the start/stop action into muscle memory.", why: "The rhythm guide is your internal reference. You'll start it before every recording session and every performance. Getting comfortable with its on/off flow prevents fumbling when it matters." }
      ],
      feel: "Like switching from a phone metronome to a built-in one. Same concept, better workflow — it's always there, it routes to headphones automatically, and it syncs with the looper's tempo. One fewer thing to manage.",
      wrong: "If the rhythm guide is coming through the main output, check the routing in [MENU] > RHYTHM > OUTPUT. You don't want click bleed in your recorded loops or in a live PA situation. Also: if you can't hear it at all, check that your headphones are in the PHONES jack, not the main output.",
      sarah: "Gene, all that rhythm training we've been doing — counting '1-2-3-4,' tapping your foot, feeling the pulse — it all transfers directly to the looper. The rhythm guide is just a metronome that lives inside your looper instead of on your phone. Your body already knows how to lock to a click. Now your looper does too.",
      metronome: 80,
      levelUp: "Can set any BPM and start the rhythm guide in under 10 seconds. Rhythm guide routed to headphones only — verified."
    },
    {
      id: "lo1e3", time: 5, title: "Record/Stop Precision", type: "looper",
      checklist: true,
      what: "THE foundational looping skill, isolated. No instrument — just button timing. You're training the exact same muscle memory that every professional looper uses: pressing the track button precisely on beat 1. With Quantize: MEASURE, the 505 gives you a safety net. Without it, your timing IS the loop.",
      setup: "Rhythm guide at 80 BPM. No guitar. Hands free.",
      steps: [
        { text: "Press Track 1 button on beat 1 to start recording (LED goes RED). Feel the click in your body and press right on it.", why: "This is the most important button press in looping. It defines your loop start point. Every loop you ever make begins with this exact action — a press synchronized to beat 1." },
        { text: "Count 4 bars out loud: '1-2-3-4, 2-2-3-4, 3-2-3-4, 4-2-3-4.' Keep your voice steady and locked to the click.", why: "Counting out loud keeps you locked to the grid and builds internal pulse. You already know this from Sarah's rhythm training — it's the same skill in a new context." },
        { text: "Press Track 1 again on beat 1 of bar 5 (LED goes GREEN = playing). The press should feel like it lands right on the click.", why: "This defines the loop end point. With Quantize: MEASURE, the mkII snaps your press to the nearest bar line, forgiving small timing errors. But your goal is to not need the forgiveness." },
        { text: "Listen: does the empty loop cycle cleanly? The LED should cycle at a steady pace. Repeat 10 times, aiming for consistency.", why: "Even with no audio, you're training the press-on-beat-1 muscle memory. Ten reps builds the neural pathway. Motor learning research shows that 10 correct repetitions is the minimum for initial consolidation." },
        { text: "Now try with Quantize OFF: [MENU] > MEMORY > PLAY > QUANTIZE > OFF. Record another 4-bar empty loop. Feel the difference — the 505 no longer corrects your timing.", why: "Without quantize, timing is 100% on you. MEASURE mode is training wheels. OFF reveals your actual button timing skill. If the loop length drifts, that's honest feedback about where your timing really is." }
      ],
      feel: "Like practicing a golf swing without a ball, or shadow boxing — pure form, no distraction. The press should feel as natural as clapping on beat 1. Your entire body should feel the downbeat and your finger should move as part of that pulse, not separately from it.",
      wrong: "If your loop lengths are inconsistent (3.5 bars, 4.5 bars), stay on Quantize: MEASURE until the press is automatic. Inconsistency means you're thinking about when to press instead of feeling it. Let the click enter your body through your foot and flow up to your finger.",
      sarah: "Gene, Sarah's rhythm training has been building exactly this skill — feeling beat 1 in your body and acting on it precisely. Every time you counted '1-2-3-4' in her lessons, you were training for this moment. The looper just makes the stakes visible: press on time, clean loop. Press late, messy loop. Your body knows where beat 1 is. Trust it.",
      metronome: 80,
      levelUp: "10 consecutive 4-bar empty loops where the stop press lands within a 16th note of beat 1. Verified by watching the LED cycle timing."
    },
    {
      id: "lo1e4", time: 10, title: "Your First Loop", type: "looper",
      checklist: true,
      volumeMeter: true,
      what: "Record 4 bars of Am fingerpicking — your first real loop. This is the moment the 505 goes from a box with buttons to a musical instrument. Input level, timing, and seamless boundary are the three skills in play.",
      setup: "Guitar in INST 1 input. Input level knob [2] peaking at -6dB (green, not red). Rhythm guide at 80 BPM. Quantize: MEASURE.",
      steps: [
        { text: "Set input level: play your loudest fingerpick, adjust knob [2] until the meter peaks at -6dB (well into green, never red). This is your recording level for the session.", why: "Too hot = distortion baked into every cycle of the loop. Too quiet = noise floor hiss that gets louder with each overdub. -6dB gives you clean signal with headroom for overdubs later." },
        { text: "Start the rhythm guide at 80 BPM. Count yourself in: '1-2-3-4'. Feel the tempo settle into your body before you touch the track button.", why: "Same tempo as your Am fingerpicking practice from Sarah's lessons. The count-in lets you internalize the pulse so your first note is confident, not tentative." },
        { text: "Press Track 1 on beat 1. Fingerpick Am (alternating thumb on A string, pointer on B string) for 4 bars. Keep your picking hand steady and even.", why: "This is the pattern you already know from guitar study. Now it becomes your first loop — the same musical content, but it lives on after you stop playing." },
        { text: "Press Track 1 again on beat 1 of bar 5. The button cycles through AMBER (overdub) — press ONCE MORE quickly to skip overdub and land on GREEN (play).", why: "Single press after recording = overdub mode (AMBER). Double press = skip overdub, go straight to play mode (GREEN). You want play mode for now. Overdub comes in Level 2." },
        { text: "Listen to your loop cycle 4-8 times. Is the boundary seamless — does it sound like one continuous performance, or can you hear where it restarts? Record the whole process 5 times, keeping only the cleanest loop.", why: "The loop boundary is where most beginners hear a click, gap, or rhythmic hiccup. Your ear will catch different issues on each pass. By the 5th recording, your timing and touch will have noticeably improved." }
      ],
      feel: "The first time your loop plays back seamlessly, it's magic — you're hearing yourself accompany yourself. You played it once, and now it plays forever. That feeling never fully goes away, even after thousands of loops. This is the moment that hooks every looper.",
      wrong: "If you hear a click or gap at the loop point, your stop-press timing is off — stay on Quantize: MEASURE and focus on pressing exactly on beat 1. If the loop sounds thin or harsh, check your input level: too low makes it thin, too high makes it harsh. If the fingerpicking is uneven, slow down to 70 BPM and build back up.",
      sarah: "Gene, this is the moment. Your first loop. The first time you hear your own Am fingerpicking play back to you while your hands are free — that's the feeling that launched careers for KT Tunstall, Ed Sheeran, Howie Day, and hundreds of others. It doesn't have to be perfect. It just has to loop. You've been fingerpicking Am for weeks now. Let the looper hear it.",
      metronome: 80,
      levelUp: "3 out of 5 loops play back seamlessly with no audible boundary artifact. Input level consistently at -6dB."
    },
    {
      id: "lo1e5", time: 10, title: "Loop and Listen", type: "looper",
      checklist: true,
      what: "Record an Am loop, then play live over it. Try different chords, adjust the fader, and experiment with singing or humming. This is the core loop performance skill — the loop is your band, and you're the soloist.",
      setup: "Same as previous. Clean Am loop already recorded on Track 1.",
      steps: [
        { text: "Record a clean Am fingerpicking loop on Track 1 (4 bars, 80 BPM). Let it play back.", why: "Your foundation loop. Same as the previous exercise — but now it becomes your backing band." },
        { text: "While the loop plays, try playing C over it. Then G. Then D. Listen to how each chord interacts with the Am loop.", why: "This is the Am-C-G-D progression you know from Sarah's lessons. Now you're hearing harmony against your own playing. Notice which chords feel resolved (Am, C) and which create tension (G, D)." },
        { text: "Practice adjusting the Track 1 fader while playing live guitar. Push it up for louder backing, pull it down when you want your live playing to dominate.", why: "In performance, you'll constantly adjust the mix between recorded loops and live playing. The fader is an instrument — start treating it like one." },
        { text: "Try humming or singing a simple melody over the loop while playing guitar. If lyrics feel like too much, just hum. If guitar + voice feels like too much, put the guitar down and just sing over the loop.", why: "The ultimate goal is loop + live guitar + voice. Start with any combination of two. The loop removes one layer of multitasking, freeing you to focus on the live elements." }
      ],
      feel: "Like jamming with a rhythm guitarist who plays exactly what you want, exactly when you want it. Because it IS you. The loop is patient, consistent, and always in time. It's the most supportive bandmate you'll ever have.",
      wrong: "If you can't play guitar AND adjust the fader simultaneously, that's completely normal. Practice fader moves between chord changes, not during them. If you can't sing and play over the loop, drop one — just sing, or just play. Build the coordination gradually.",
      sarah: "Gene, this is the feeling that gets people addicted to looping. You made a backing track in 30 seconds, and now you're jamming with yourself. Try playing some of those Allah-Las style licks over your Am loop — surf tremolo on the high strings while the fingerpicking holds down the foundation. This is how Mark Speer builds Khruangbin songs. One layer at a time, each one freeing the next.",
      metronome: 80,
      levelUp: "Play through a full Am-C-G-D cycle live over your Am loop while adjusting the fader at least once. Bonus: hum a melody while doing it."
    },
    {
      id: "lo1e6", time: 5, title: "Loop Quality Check", type: "looper",
      checklist: true,
      what: "Critical listening drill. Train your ear to hear loop-specific problems that repeat every cycle. A tiny timing error becomes maddening after 20 repetitions. A subtle volume dip becomes a rhythmic hole. This exercise trains you to catch problems before they multiply.",
      setup: "Any loop you've recorded playing back on Track 1.",
      steps: [
        { text: "Let your loop cycle 8+ times without touching anything. Just listen. Close your eyes if it helps.", why: "Your ear catches different things on each pass. Pass 1: overall feel. Pass 3: timing details. Pass 5: tonal consistency. Pass 8: the boundary seam. Each pass reveals a new layer, like reading the same paragraph and noticing new words." },
        { text: "Listen specifically for these four artifacts: (a) click or pop at the loop boundary, (b) gap of silence where audio drops out, (c) rhythmic hiccup where the loop restarts — a stutter or rush, (d) volume inconsistency — one section louder or quieter than the rest.", why: "These are the four most common loop artifacts. Naming them helps you hear them. 'Click at boundary' is more actionable than 'something sounds off.' Diagnostic precision leads to targeted fixes." },
        { text: "Rate your loop 1-5: 1 = obvious problem audible on first pass, 3 = acceptable for practice, 5 = seamless and performance-ready. If below 3, re-record.", why: "Building a quality standard now prevents you from accepting mediocre loops later. Your ear training from Sarah's lessons transfers directly — you're already trained to hear pitch and timing. Now apply that to loop quality." },
        { text: "Turn off the rhythm guide and listen to the loop again. Without the click masking timing issues, does the loop still feel solid? Rate it again.", why: "The rhythm guide can mask small timing errors by providing a constant reference that your brain fills in. Removing it reveals the loop's true timing. If the rating drops, your loop has timing issues the click was hiding." }
      ],
      feel: "Like a sound engineer doing a quality check on a recording. Your ear gets sharper every session. After a few weeks of this drill, you'll hear loop artifacts that are invisible to most listeners. That discrimination is what separates good loopers from great ones.",
      wrong: "If every loop sounds perfect to you on the first pass, you're not listening closely enough. Turn off the rhythm guide — that often reveals hidden timing issues. If you still can't hear problems, record the loop output on your phone and listen back on different speakers. Playback context matters.",
      sarah: "Gene, all that ear training from our sessions — pitch matching, rhythm counting, critical listening — this is where it pays off in the looper world. You're already better at hearing problems than most beginners because you've trained your ear systematically. Trust what you hear. If something feels slightly off, it probably is.",
      metronome: 80,
      levelUp: "Can identify and name the specific artifact in a bad loop within 3 cycles. Can rate a loop 1-5 with reasoning."
    },
    {
      id: "lo1e7", time: 5, title: "Clear and Rebuild", type: "looper",
      checklist: true,
      what: "Speed of recovery. Practice the 'I messed up, start over' workflow until it's instant. In live performance, a bad loop needs to disappear fast and a new one needs to take its place before the audience notices. Dead air is the enemy.",
      setup: "Any loop playing on Track 1. Rhythm guide running at 80 BPM.",
      steps: [
        { text: "Press ALL CLEAR (hold the track's stop button, or use ALL START/STOP to stop all tracks, then clear individual tracks). All active tracks go dark.", why: "ALL CLEAR is your reset button. In performance, a bad loop needs to disappear fast. Knowing the fastest path to silence is essential." },
        { text: "Immediately record a new loop — within 4 beats of clearing. The rhythm guide is still running. Lock onto it and press Track 1 on the next beat 1.", why: "Dead air is the enemy of live performance. The faster you rebuild, the more confident and intentional your performance looks. Four beats of silence is barely a breath. Sixteen beats is an awkward void." },
        { text: "Repeat the full cycle: record a loop > listen for 4 bars > clear > rebuild immediately. Do 5 complete cycles.", why: "This drill makes recovery automatic. When you mess up in a live situation, your hands know the sequence without your brain needing to think it through. Five reps builds the motor pattern." },
        { text: "Time yourself: from the moment you decide to clear to the moment a new loop is playing back. Goal: under 5 seconds.", why: "5 seconds of silence is barely noticeable to an audience — it reads as a dramatic pause. 15 seconds of silence feels like an eternity and signals that something went wrong. Speed of recovery = confidence on stage." }
      ],
      feel: "Like a basketball player practicing fast-break turnarounds — from defense to offense in one fluid motion. The recovery should feel athletic — quick, decisive, no hesitation. Clear-and-rebuild is your counterattack.",
      wrong: "If you're panicking or fumbling during the clear sequence, slow down. Practice the button sequence without time pressure first — just learn which buttons to press in what order. Then add speed. Panicked fumbling trains the wrong motor pattern.",
      sarah: "Gene, this exercise is about making mistakes cheap. If you know you can clear and rebuild in 5 seconds, you'll take more creative risks during performance — try that weird chord, attempt that vocal harmony, experiment with a new rhythm. The safety net makes you brave. Every professional looper has a fast recovery workflow. This is yours.",
      metronome: 80,
      levelUp: "Clear and rebuild with a clean new loop in under 5 seconds, 3 times in a row."
    },
    {
      id: "lo1e8", time: 8, title: "Quantize Deep Dive", type: "looper",
      checklist: true,
      what: "Compare all three Quantize modes side by side: MEASURE (snaps to bar boundaries), BEAT (snaps to beat boundaries), and OFF (raw timing, no correction). Each mode changes what the 505 expects from your button presses — and each has legitimate uses in different musical contexts.",
      setup: "Rhythm guide at 80 BPM. Guitar in INST 1 input. Same Am fingerpicking pattern.",
      steps: [
        { text: "Set Quantize to MEASURE: [MENU] > MEMORY > PLAY > QUANTIZE > MEASURE. Record a 4-bar Am fingerpicking loop. Press Track 1 to start and stop. Notice how the 505 snaps your presses to the nearest bar line — even if you're slightly early or late, the loop comes out as exactly 4 bars.", why: "MEASURE mode is maximum forgiveness. The 505 rounds your button timing to the nearest bar boundary. This means you can focus entirely on playing guitar without worrying about button precision. It's the right mode for structured songs with clear bar-length sections." },
        { text: "Set Quantize to BEAT: [MENU] > MEMORY > PLAY > QUANTIZE > BEAT. Record the same 4-bar Am loop. Feel the tighter grid — the 505 now snaps to individual beats, not just bar lines. If you press slightly after beat 1 of bar 5, it might round to beat 2, giving you a 4-bar-and-1-beat loop.", why: "BEAT mode is intermediate precision. It allows you to create loops that start or end on any beat, not just bar lines. This is useful when you want a pickup note at the start of a loop, or when your musical phrase doesn't align perfectly with bar boundaries. More flexible, but demands better timing." },
        { text: "Set Quantize to OFF: [MENU] > MEMORY > PLAY > QUANTIZE > OFF. Record the same loop. Feel the difference — the 505 captures your exact button timing with no correction. Your press IS the loop boundary, down to the millisecond.", why: "OFF mode is raw. There are no training wheels, no correction. Your timing determines everything. This mode is essential for ambient/free-form music where bar lines don't apply, and for advanced loopers who want total control. It's the long-term goal for performance freedom." },
        { text: "Play back all three loops (if you saved them to different tracks or memory slots). Listen for differences at the loop boundary — which one cycles most smoothly? Which one has the tightest feel?", why: "Comparing the three modes with the same musical content reveals your actual timing skill. If MEASURE and OFF sound identical, your button timing is excellent. If OFF sounds noticeably worse, that's the specific gap to train." },
        { text: "Record 3 loops in each mode and rate each one 1-5 for seamlessness. Note which mode produces the most consistent results for you right now.", why: "This gives you data about where you are. Most beginners get consistent 4-5 ratings on MEASURE, 3-4 on BEAT, and 2-3 on OFF. Knowing your current baseline in each mode tells you where to focus practice." },
        { text: "Set Quantize back to MEASURE for now. This is your default until Level 4+. When you choose to move to BEAT or OFF later, it will be a deliberate decision, not an accident.", why: "MEASURE is the right training mode. It lets you focus on musicality while the 505 handles timing correction. As your button timing improves through practice, you'll gradually need less correction — and eventually you'll choose OFF because you've outgrown the safety net, not because someone told you to remove it." }
      ],
      feel: "Like test-driving the same car in three different steering modes — power steering (MEASURE), sport steering (BEAT), and manual rack-and-pinion (OFF). Each feels different under your hands. Each has its place. The goal is knowing which mode serves the music you're making right now.",
      wrong: "If Quantize OFF loops sound terrible, that's completely expected and totally fine. Don't force yourself onto OFF mode prematurely — it'll make every loop frustrating. Stay on MEASURE, build your timing naturally through weeks of practice, and OFF will feel achievable when you're ready. Rushing this is like removing training wheels before you can balance.",
      sarah: "Gene, the 505 gives you a safety net you can gradually remove as your skills grow. MEASURE mode is like Sarah holding the mic while you learn to sing — supportive, corrective, allowing you to focus on the music instead of the mechanics. BEAT mode is like singing with less pitch correction. OFF mode is singing a cappella — just you, no net. You'll get there. For now, MEASURE is your friend, and there's zero shame in using it. Every pro looper started on MEASURE.",
      metronome: 80,
      levelUp: "Can explain what each Quantize mode does, when to use it, and which one currently gives you the cleanest loops. Bonus: at least one Quantize OFF loop rated 3+."
    }
  ]
};
