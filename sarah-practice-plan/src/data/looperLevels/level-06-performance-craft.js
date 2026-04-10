export const level6 = {
  num: 6, name: "Performance Craft", focus: "Complete Song + Recovery + Mark Back",
  duration: "60 min",
  setup: "RC-505mkII with full effects chain. Multiple tracks active. Phrase memories available. Quantize: MEASURE.",
  exercises: [
    {
      id: "lo6e1", time: 10, title: "ILTWYW Blueprint", type: "looper",
      checklist: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }],
      what: "Complete ILTWYW mapped to 5 RC-505mkII tracks. Paper blueprint first, then execute.",
      setup: "Paper and pen. RC-505mkII with effects chain from Level 5. Rhythm guide at 90 BPM.",
      steps: [
        { text: "Write the blueprint on paper: T1=percussion/rhythm, T2=bass fingerpicking, T3=chord strum, T4=melody riff, T5=one-shot fill. Build order: T1 → T2 → T3 → T4 → live vocal.", why: "Planning before playing prevents the noodling trap. The blueprint IS the performance plan." },
        { text: "Execute the blueprint on the 505. Build each track in order, following your written plan.", why: "The plan tells you what to record next. No decisions during recording = faster, cleaner takes." },
        { text: "Once all tracks are built, perform: sing ILTWYW live over the complete loop arrangement.", why: "This is the full performance — 4 loop layers + live voice. One person, full band sound." },
        { text: "End with a clean technique from your ending vocabulary. Fade, hard stop, strip, or one-shot tag.", why: "A planned ending is the mark of a prepared performer. No 'uh... I guess that's it.'" }
      ],
      feel: "Like conducting an orchestra you built yourself. Every section is playing because you put them there, and you're singing on top.",
      wrong: "If you skip the paper step and go straight to recording, you'll spend 20 minutes noodling. The blueprint takes 2 minutes and saves you 18.",
      sarah: "Gene, this is your first complete song blueprint. Every song you ever loop will follow this same process: plan on paper, build on the 505, perform live on top. The framework transfers to everything.",
      metronome: 90,
      levelUp: "Complete ILTWYW with written blueprint, 4 loop layers, live vocal, and clean ending."
    },
    {
      id: "lo6e2", time: 5, title: "Clean Endings", type: "looper",
      checklist: true,
      what: "Five ending techniques — each has a mood. Know when to use which.",
      setup: "Multi-track arrangement playing.",
      steps: [
        { text: "(a) Fade all faders slowly over 8 bars. The music dissolves. Mood: wistful, reflective, cinematic.", why: "The fade is the gentlest ending. It lets the music breathe out naturally." },
        { text: "(b) ALL STOP on beat 1. Instant silence. Mood: dramatic, powerful, definitive.", why: "The hard stop is the most dramatic ending. Silence after sound is physically felt by the audience." },
        { text: "(c) Strip to one track, let it play 4 bars, then stop. Mood: intimate, coming full circle.", why: "Returning to a single track echoes the beginning — the performance comes full circle." },
        { text: "(d) Trigger a one-shot final chord on T5, stop all other tracks. Mood: conclusive, orchestral.", why: "The one-shot chord rings out into silence. Like a final orchestral hit." },
        { text: "(e) Mute all loops, play/sing a live tag (final phrase). Mood: personal, spontaneous.", why: "The live tag is the most intimate ending — just you, no loops, final words." }
      ],
      feel: "Like choosing the last line of a poem. The ending defines how the audience remembers the whole piece.",
      wrong: "If you don't plan your ending, you'll fumble it. Choose your ending technique BEFORE you start performing. Write it on your blueprint.",
      sarah: "Gene, the ending is the last thing the audience hears. A clean ending makes the whole performance feel professional. A fumbled ending undermines everything before it.",
      metronome: 95,
      levelUp: "Execute each of the five ending techniques cleanly. Know which mood each creates."
    },
    {
      id: "lo6e3", time: 5, title: "Recovery Drill", type: "looper",
      checklist: true,
      what: "Three failure modes, three recovery protocols. Practice until recovery looks intentional.",
      setup: "Multi-track loop arrangement playing.",
      steps: [
        { text: "Scenario 1: Bad overdub. Enter overdub, play wrong notes. UNDO within 2 seconds. Continue.", why: "UNDO is your best friend. Practice until it's a reflex, not a decision." },
        { text: "Scenario 2: Total disaster. ALL START/STOP > ALL CLEAR > rebuild from T1. Target: <8 seconds to new loop.", why: "The nuclear option. Everything gone, start fresh. The audience barely notices if you're fast." },
        { text: "Scenario 3: Wrong track recording. You accidentally recorded on T3 instead of T2. Mute T3 instantly on beat 1, re-record on T2.", why: "Muting the wrong track ON BEAT 1 makes it sound intentional. Then fix it while other tracks keep playing." },
        { text: "Practice each scenario 3 times. The goal: recovery looks intentional, not panicked.", why: "Professionals don't avoid mistakes — they recover so smoothly that mistakes become features." }
      ],
      feel: "Like a jazz musician who hits a wrong note and immediately turns it into a chromatic approach. Recovery IS the skill.",
      wrong: "If recovery takes more than 5 seconds for any scenario, slow down and practice the button sequence without time pressure.",
      sarah: "Gene, recovery speed is what separates amateurs from pros. When you can fix any mistake in under 3 seconds, you're fearless on stage. That fearlessness changes everything.",
      metronome: 95,
      levelUp: "All three recovery scenarios executed in <3 seconds each, looking calm."
    },
    {
      id: "lo6e4", time: 5, title: "The 90-Second Complete Song", type: "looper",
      checklist: true,
      what: "Timer: 90 seconds to build a complete arrangement. Forces decisiveness and eliminates perfectionism.",
      setup: "Phone timer set to 90 seconds. RC-505mkII cleared. Rhythm guide at 100 BPM.",
      steps: [
        { text: "Start the timer. Record T1 (rhythm/bass) immediately — first take, no do-overs.", why: "The timer creates urgency. Urgency kills perfectionism. First take IS the take." },
        { text: "15 seconds in: start T2 (chords). 30 seconds: start T3 (melody). Every 15 seconds, a new layer.", why: "One layer every 15 seconds = 4 layers in a minute. That's fast, but it's possible." },
        { text: "At 60 seconds: all layers running. Add live vocal or live guitar lead on top.", why: "The final 30 seconds is your performance peak. Everything is firing." },
        { text: "At 85 seconds: begin your ending technique. Clean stop at 90.", why: "The ending is planned INTO the time constraint. No overtime." }
      ],
      feel: "Like speed chess — every second counts. The constraint eliminates overthinking and builds trust in your first instinct.",
      wrong: "If you can't build 4 layers in 90 seconds, simplify your parts. Simple layers are better than complex layers that take too long to record.",
      sarah: "Gene, the 90-second challenge builds the most important performance skill: decisiveness. When you can make good musical decisions FAST, you can make great ones when you have time.",
      metronome: 100,
      levelUp: "Complete 4-layer arrangement with ending in under 90 seconds."
    },
    {
      id: "lo6e5", time: 10, title: "Video Self-Review", type: "looper",
      checklist: true,
      recorder: true,
      what: "Record your performance on video. Grade yourself on 5 criteria. Video reveals what your ears miss.",
      setup: "Phone recording video from audience perspective. RC-505mkII set for a full song.",
      steps: [
        { text: "Perform a complete song (ILTWYW or Sol Del Sur) while recording video. Film from where an audience would sit.", why: "Video captures what the audience sees — your body language, facial expressions, and the visual performance." },
        { text: "Watch the video. Grade each criterion 1-5: (1) Build creates anticipation. (2) Loops are clean. (3) Timing is solid. (4) Effects serve the music. (5) Ending is clean.", why: "Five specific criteria prevent vague self-assessment. Each score has a specific meaning." },
        { text: "Total: 25 points possible. Score of 20+ = performance-ready. Score of 15-19 = good practice but needs polish. Under 15 = specific skills need work.", why: "The scoring system gives you an objective benchmark. Track scores over time to see improvement." },
        { text: "Identify your lowest-scoring criterion. That's your focus for the next practice session.", why: "Targeted improvement. Don't try to fix everything — fix the weakest link." }
      ],
      feel: "Like watching game film as an athlete. Uncomfortable but invaluable. Your eyes catch things your ears miss.",
      wrong: "If you avoid watching the video, you're avoiding growth. The discomfort of seeing yourself is temporary. The improvement is permanent.",
      sarah: "Gene, video self-review is the fastest path to improvement. Every professional musician does it. The first time is awkward. By the fifth time, it's just useful information.",
      metronome: 90,
      levelUp: "Score 20+ on the 5-criterion review for two consecutive performances."
    },
    {
      id: "lo6e6", time: 8, title: "Emotional Arc", type: "looper",
      checklist: true,
      what: "Design your arrangement for FEELING, not technique. Map emotions to 505 actions.",
      setup: "RC-505mkII cleared. Plan the emotional journey before touching the looper.",
      steps: [
        { text: "PEACEFUL intro: single quiet track, clean tone, no effects. Just guitar and space. (T1 at 50% volume.)", why: "Starting quiet creates intimacy. The audience leans in." },
        { text: "BUILDING energy: add T2 with subtle bass. Add reverb via Input FX. The world is expanding.", why: "Each addition should feel like the music is waking up. More layers = more energy." },
        { text: "CLIMAX: all tracks playing. Full effects. Add live vocal at maximum expression. THIS is the peak.", why: "The climax is where everything converges. Maximum layers, maximum effects, maximum vocal energy." },
        { text: "RESOLUTION: strip layers. Reduce effects. Return to a single quiet track. Then silence.", why: "The resolution mirrors the intro — quiet, intimate, reflective. The journey is complete." }
      ],
      feel: "Like designing a rollercoaster — the dips make the peaks feel higher. The quiet moments make the loud moments thunderous.",
      wrong: "If the emotional arc is flat (everything at the same energy level), there's no journey. The audience needs contrast: quiet vs loud, sparse vs full, dry vs wet.",
      sarah: "Gene, you're not building a loop — you're telling a story. Peaceful → building → climax → resolution. That's the arc of every great song, every great movie, every great sunset. Your music should follow the same path.",
      metronome: 95,
      levelUp: "A performance with a clear emotional arc that a listener could feel without explanation."
    },
    {
      id: "lo6e7", time: 10, title: "The Living Room Show", type: "looper",
      checklist: true,
      what: "First real audience performance. Play for Court, a friend, or video-call someone. 2-song set.",
      setup: "RC-505mkII fully set up. 2 songs prepared in MEMORY slots. Audience present.",
      steps: [
        { text: "Set up as if it's a real gig. Sound check your levels. Have your set list ready.", why: "Professional preparation for a casual audience. The habits you build now transfer to bigger stages." },
        { text: "Perform 2 songs. Full build, full performance, clean endings. Recover from any mistake.", why: "Two songs is a complete mini-set. It tests your ability to maintain energy across multiple pieces." },
        { text: "Engage with the audience: eye contact, smile, narrate what you're building.", why: "The visual performance matters. Loop building is theatrical — the audience loves watching it happen." },
        { text: "After: ask your audience one question — 'What was your favorite moment?' Their answer reveals what works.", why: "Audience feedback is more valuable than self-assessment. They hear/see what you can't from behind the looper." }
      ],
      feel: "Like the first time you jump off a diving board. Scary, exhilarating, and you immediately want to do it again.",
      wrong: "If you keep postponing the living room show ('I'm not ready yet...'), you'll never be ready. Set a date and prepare FOR it.",
      sarah: "Gene, Dub FX says 'one day busking equals six months in the bedroom.' Your living room show is that first day. Court is the perfect first audience — supportive, honest, present. Do it.",
      metronome: 90,
      levelUp: "Performed a 2-song set for a real audience with engagement and clean endings."
    },
    {
      id: "lo6e8", time: 8, title: "Mark Back Save Points", type: "looper",
      checklist: true,
      what: "The 505's creative safety net. Set a 'save point' before risky moves — return to it if things go wrong.",
      setup: "Multi-track arrangement playing. Assign Mark Back to a CTL button if not already assigned.",
      steps: [
        { text: "Build a 3-track arrangement you're happy with. This is your 'known good' state.", why: "You need something worth saving before Mark Back matters. Build your foundation first." },
        { text: "Press Mark Back (or assigned CTL button). The 505 saves the current state of ALL tracks — audio and settings.", why: "Mark Back is a snapshot. Everything right now is preserved. You can experiment freely." },
        { text: "Now experiment: overdub something risky on T2. Record a wild texture on T4. Go nuts.", why: "With Mark Back set, experimentation is risk-free. Bad results? Just go back. This freedom changes how you create." },
        { text: "If the experiment failed: press Mark Back again to RESTORE the saved state. Your 3-track foundation is back, clean.", why: "One button press = undo everything since the save point. Your safety net caught you." },
        { text: "If the experiment WORKED: great — set a NEW Mark Back to save your expanded arrangement.", why: "Update your save point after successful experiments. This is incremental creation with a safety net at every stage." }
      ],
      feel: "Like having unlimited 'save game' slots in a video game. You can try anything because you can always go back.",
      wrong: "If you forget to set Mark Back before experimenting, you have no safety net. Make it a habit: ALWAYS set Mark Back before trying something new.",
      sarah: "Gene, Mark Back is the feature that makes you fearless. Every risky creative choice — weird overdub, experimental texture, aggressive effects — you can try it knowing you can undo everything. This freedom changes how you create.",
      metronome: 95,
      levelUp: "Set Mark Back, experiment, restore successfully. Then set Mark Back, experiment, keep the result. Both paths practiced."
    },
    {
      id: "lo6e9", time: 5, title: "Phrase Memory Save/Load", type: "looper",
      checklist: true,
      what: "Save your complete arrangement to a MEMORY slot. Build your song library.",
      setup: "Complete loop arrangement you want to save.",
      steps: [
        { text: "Save: press [EXIT] + [ENTER] simultaneously, then select WRITE. Choose a slot number (1-99).", why: "WRITE saves everything: loop audio, track settings, effects, tempo. Your complete arrangement is preserved." },
        { text: "Load: press [MEMORY], scroll to your saved slot with VALUE knob, press [ENTER].", why: "Loading recalls the complete arrangement instantly. Ready to perform in seconds." },
        { text: "Organize: keep a written list — MEMORY 1 = ILTWYW, MEMORY 2 = Sol Del Sur, etc. Tape it to the side of your 505.", why: "In performance, you need to find songs fast. A physical list prevents fumbling through menus." },
        { text: "Understand what's saved (loop audio, effects, track modes, tempo) and what's NOT saved (master output level, input gain).", why: "Knowing what persists and what doesn't prevents surprises when loading a slot at a gig." }
      ],
      feel: "Like saving your game. Your hard work is preserved and ready to recall anytime.",
      wrong: "If you save to the wrong slot and overwrite something, the original is gone. Be deliberate about slot selection. ALWAYS double-check the slot number before writing.",
      sarah: "Gene, every song you save to a MEMORY slot is a brick in your repertoire wall. By the time you fill slots 1-10, you have a complete set list ready to perform anywhere.",
      metronome: 90,
      levelUp: "Save and load 3 different arrangements from memory slots without errors."
    },
    {
      id: "lo6e10", time: 5, title: "Stage Presence Basics", type: "looper",
      checklist: true,
      what: "Body language while looping. The audience watches YOU, not the looper.",
      setup: "Simple 2-track loop playing. Camera recording.",
      steps: [
        { text: "Look UP between button presses. Make eye contact with your audience or camera. Don't stare at the 505.", why: "Eye contact creates connection. Looking down at your gear the entire time walls off the audience." },
        { text: "Nod to the groove. Show that you feel the music. Your enjoyment is contagious.", why: "If you look bored by your own music, the audience feels bored. If you look like you're having fun, they have fun." },
        { text: "Narrate: 'Let me add some bass to this...' or 'Here we go...' Talk to the audience during builds.", why: "Narrating the loop-building process is part of the magic. The audience loves being brought inside the creative process." },
        { text: "Practice over a simple 2-track loop. Focus ENTIRELY on presence — the music is on autopilot, you're performing visually.", why: "Separating presence practice from music practice. Both need dedicated attention." }
      ],
      feel: "Like being a host at a party AND the DJ. You're creating the vibe AND inviting people into it.",
      wrong: "If audience engagement makes you lose musical focus, the loop isn't automatic enough yet. Practice the music until you can do it without looking, THEN add presence.",
      sarah: "Gene, looping is theater. The audience watches you press buttons, build layers, nod to the groove — it's visual performance art. Your presence is 50% of the show.",
      metronome: 90,
      levelUp: "A performance where you make eye contact, narrate, show enjoyment, AND deliver clean loops simultaneously."
    },
    {
      id: "lo6e11", time: 5, title: "The Mistake Ritual", type: "looper",
      checklist: true,
      what: "Deliberately make a mistake. Then recover so smoothly it looks intentional. Build fearlessness.",
      setup: "Multi-track loop playing. This exercise is about mindset, not technique.",
      steps: [
        { text: "Record a deliberate 'wrong note' overdub on T2. Something clearly out of key.", why: "You're practicing making peace with imperfection. The wrong note is intentional — you're training your response to it." },
        { text: "DON'T press UNDO. Instead, overdub AGAIN — add notes that make the 'mistake' sound intentional.", why: "Building around a mistake is a jazz principle. The only wrong note is the one you don't commit to." },
        { text: "If you can't make it work: THEN use UNDO. But try to make it work first. Give yourself 4 bars.", why: "Trying to save the mistake first builds creative resilience. UNDO is the backup, not the first response." },
        { text: "Repeat 3 times. Each time, the 'mistake' should bother you less. That decreasing anxiety is the exercise.", why: "Performance anxiety comes from fear of mistakes. When mistakes become features, fear dissolves." }
      ],
      feel: "Like learning to fall in martial arts — you practice falling so that when it happens for real, you know how to land.",
      wrong: "If you immediately UNDO every mistake, you're reinforcing the fear. Force yourself to sit with the wrong note for at least 4 bars before deciding.",
      sarah: "Gene, Marc Rebillet NEVER undoes mistakes. He commits to everything — wrong notes, weird sounds, unexpected directions. That commitment is what makes his performances electric. This exercise builds that same muscle.",
      metronome: 95,
      levelUp: "Three deliberate mistakes where at least one became a feature you actually liked."
    },
    {
      id: "lo6e12", time: 5, title: "Transition Craft", type: "looper",
      checklist: true,
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      what: "Moving between songs. The ending of song A flows into the opening of song B.",
      setup: "ILTWYW saved in MEMORY 1, Sol Del Sur in MEMORY 2.",
      steps: [
        { text: "Perform ILTWYW. End with a fade ending (faders down slowly over 4 bars).", why: "The fade ending creates a gentle conclusion that doesn't feel like a hard stop." },
        { text: "4 beats of silence. Let the room breathe. This is NOT dead air — it's a dramatic pause.", why: "The silence between songs is a moment of transition. The audience resets their expectations." },
        { text: "Load MEMORY 2 (Sol Del Sur). Begin building immediately — first track within 4 beats of loading.", why: "Quick loading = no fumbling. The audience sees you load the next song with confidence." },
        { text: "The gap from end of song 1 to first note of song 2 should be <10 seconds total.", why: "Under 10 seconds feels like a natural between-song pause. Over 15 seconds feels like a technical difficulty." }
      ],
      feel: "Like a DJ crossfading between tracks — one song ends, a breath, the next begins. Seamless flow.",
      wrong: "If the gap is over 15 seconds, you're fumbling with MEMORY loading. Practice the load sequence until it's muscle memory.",
      sarah: "Gene, transitions separate a 'set' from a 'collection of songs.' When your transitions are smooth, the audience experiences a journey — not individual destinations.",
      metronome: 90,
      levelUp: "ILTWYW → Sol Del Sur transition with clean ending, dramatic pause, and <10 second gap."
    }
  ]
};
