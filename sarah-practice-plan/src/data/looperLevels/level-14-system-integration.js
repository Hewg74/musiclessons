export const level14 = {
  num: 14, name: "System Integration", focus: "The Complete Rig",
  duration: "65 min",
  setup: "RC-505mkII with MIDI cable/USB connected to external gear (keyboard, DAW, drum machine). CTL buttons and footswitch (if available) configured.",
  exercises: [
    {
      id: "lo14e1", time: 8, title: "MIDI Clock Basics", type: "looper",
      checklist: true,
      what: "The RC-505mkII can send AND receive MIDI clock — making it the master or slave in a multi-device rig. When the 505 sends clock, external gear follows its tempo. When it receives clock, it follows external gear. This is the foundation of everything in this level: synchronization between instruments.",
      setup: "RC-505mkII connected to external gear via MIDI cable or USB. KeyLab 49 or DAW as the sync partner.",
      steps: [
        { text: "Navigate to MIDI sync settings: [MENU] > SYSTEM > MIDI > SYNC. Set SYNC MODE to determine whether the 505 sends clock, receives clock, or runs independently.", why: "MIDI clock is the universal language between electronic instruments. Every drum machine, DAW, and synth speaks it. The 505 can be either the conductor or a player in the orchestra." },
        { text: "Set the 505 as CLOCK MASTER (send mode). Connect MIDI OUT from the 505 to MIDI IN on external gear. Change tempo on the 505 — verify the external gear follows.", why: "Clock master means the 505 sets the tempo for everything. This is the most common setup for live looping — the 505 is the center of your rig, and everything syncs to it." },
        { text: "Now reverse: set the 505 as CLOCK SLAVE (receive mode). Change tempo on the external gear — verify the 505 follows. Priority order: MIDI > USB > internal clock.", why: "Clock slave is useful when your DAW or a bandmate's device is the tempo reference. The 505 adapts to the external clock. Understanding both roles gives you flexibility in any rig configuration." },
        { text: "Test tempo changes while loops are playing. Does the sync hold through a tempo shift from 90 to 110 BPM? Do loops stretch or glitch?", why: "Tempo changes during playback reveal the limits of sync. Some gear handles gradual tempo shifts gracefully; some stutters. Knowing how YOUR gear responds prevents surprises on stage." }
      ],
      feel: "Like connecting two musicians who suddenly hear each other for the first time — when the sync locks, everything breathes together. The first time your keyboard and looper share the same pulse, the rig feels alive.",
      wrong: "If sync isn't working, check: (1) cable direction — MIDI OUT on master to MIDI IN on slave, (2) sync mode in [MENU] > SYSTEM > MIDI > SYNC, (3) both devices set to the same MIDI channel or omni mode. MIDI troubleshooting is always about these three things.",
      sarah: "Gene, MIDI clock is the universal language between instruments — the 505 speaks it fluently. Once this works, your KeyLab, your DAW, and your looper all breathe as one instrument. That's when the rig stops being separate devices and starts being YOUR instrument.",
      metronome: 100,
      levelUp: "505 successfully syncs as both master and slave with external gear. Tempo changes propagate correctly in both directions."
    },
    {
      id: "lo14e2", time: 10, title: "Sync to DAW", type: "looper",
      checklist: true,
      what: "Connect the RC-505mkII to Ableton (or your DAW) via USB. The 505 provides the master clock, and the DAW follows — giving you access to unlimited virtual instruments, drum loops, and effects that stay perfectly in sync with your live loops.",
      setup: "RC-505mkII connected to computer via USB. DAW open (Ableton, GarageBand, Logic, etc.). 505 set as MIDI clock source.",
      steps: [
        { text: "Connect 505 to your computer via USB. In the DAW, go to MIDI preferences and enable the RC-505mkII as a MIDI clock source. Enable 'Sync to External MIDI Clock' (in Ableton: Preferences > Link/Tempo/MIDI > MIDI Ports > Sync IN).", why: "The DAW needs to know to listen to the 505's clock instead of its own internal tempo. This is a one-time setup that makes the DAW a follower." },
        { text: "Set the 505 as clock master: [MENU] > SYSTEM > MIDI > SYNC > send mode. Set a tempo on the 505 — the DAW's tempo display should follow.", why: "When the 505 changes tempo, the DAW changes tempo. This means your tap tempo on the 505 controls everything — one master clock for the entire rig." },
        { text: "In the DAW, set up a drum loop or synth pad on a track. Press play in the DAW. Start recording loops on the 505. Both should be in perfect sync.", why: "The DAW provides backing elements — drum loops, synth pads, ambient textures — that stay locked to your live looping. The 505 is the master; the DAW is the backing band." },
        { text: "Try building a loop arrangement on the 505 while the DAW provides a drum pattern. Record a guitar loop, add bass, add vocals — all synced to the DAW's drums.", why: "This workflow gives you sophisticated drums (from the DAW) that no amount of beatboxing can match, while keeping the spontaneity of live looping for everything else." },
        { text: "Test latency: record a percussive hit on the 505 while a click plays from the DAW. Listen for any offset. If latency is noticeable, adjust the DAW's MIDI clock offset.", why: "USB MIDI latency is usually <5ms (inaudible), but some systems have higher latency. Identifying and compensating for latency prevents timing drift between the 505 and DAW." }
      ],
      feel: "Like hiring a session drummer who follows your every tempo change without complaint. The DAW becomes an extension of your looper — infinite instruments, zero latency arguments.",
      wrong: "If the DAW isn't following the 505's tempo: (1) check that the 505 is set to send MIDI clock, (2) check that the DAW's MIDI preferences show the 505 as a sync source, (3) check that the DAW is set to external sync mode, not internal. If you hear timing drift, adjust the DAW's clock offset.",
      sarah: "Gene, DAW sync extends your 505 with unlimited virtual instruments. Your KeyLab can trigger sounds in the DAW while your guitar runs through the 505 — and everything stays locked to the same clock. This is how modern solo performers build huge-sounding shows from a single table.",
      metronome: 100,
      levelUp: "505 and DAW synced via MIDI clock. Loops on the 505 play in perfect time with a drum loop running in the DAW."
    },
    {
      id: "lo14e3", time: 10, title: "The Assign Matrix", type: "looper",
      checklist: true,
      what: "The Assign function is the 505's customization engine — it maps any parameter to any controller. CTL buttons, expression pedal, VALUE knob, external MIDI CC — any input can control any parameter. This is how you build YOUR perfect looper interface.",
      setup: "RC-505mkII. Navigate to [MENU] > ASSIGN. Paper and pen for planning assignments.",
      steps: [
        { text: "Open the Assign matrix: [MENU] > ASSIGN. You'll see a grid of assignment slots (the 505 has multiple assignment slots available). Each slot connects a SOURCE (controller) to a TARGET (parameter).", why: "The Assign matrix is the 505's most powerful customization feature. It transforms generic controls into YOUR specific controls. Every serious 505 user customizes this." },
        { text: "Create your first assignment: SOURCE = CTL 1 button, TARGET = Track 3 Input FX on/off. Now pressing CTL 1 toggles effects on Track 3 without navigating menus.", why: "One-button effects toggle during performance. No menu diving, no looking down, no missed beats. This is what separates casual users from performance-ready loopers." },
        { text: "Create a second assignment: SOURCE = CTL 2 button, TARGET = FX bank cycle (A > B > C > D). Now CTL 2 steps through your effects presets in performance.", why: "Effects bank cycling gives you 4 completely different effects chains accessible with one button. Build A=clean, B=reverb, C=distorted, D=ambient and switch between them mid-performance." },
        { text: "Experiment with non-obvious assignments: VALUE knob > reverb depth. Track fader > filter cutoff. Expression pedal > delay feedback. Think about YOUR performance needs.", why: "The Assign matrix lets you build an interface that matches YOUR workflow. No two performers assign the same way because no two performers have the same needs." },
        { text: "Document your assignments on paper. Label each CTL button with tape or a sticker. This is your custom control map — you'll refine it over weeks of performance.", why: "Assignments are meaningless if you forget what they do during a performance. Physical labels prevent confusion under pressure. Professional loopers label everything." }
      ],
      feel: "Like customizing a video game controller layout. The default is fine for everyone; the customized layout is perfect for YOU. Once you've built your ideal control map, the 505 feels like it was designed specifically for your hands.",
      wrong: "If you over-assign (every button controls 3 things), you'll create confusion. Start with 2-3 assignments that solve YOUR most common performance pain points. Add more as your workflow reveals needs.",
      sarah: "Gene, the Assign matrix lets you build YOUR perfect looper — customize every control. No two performers use the same assignments because no two performers have the same workflow. This is where the 505 stops being a product and becomes YOUR instrument.",
      levelUp: "3+ assignments configured, documented, and physically labeled. Each assignment solves a specific performance need."
    },
    {
      id: "lo14e4", time: 5, title: "CTL Button Configuration", type: "looper",
      checklist: true,
      what: "The RC-505mkII has CTL 1 and CTL 2 buttons (plus optional footswitch inputs for CTL 3/4). These are your custom shortcuts — the most-used functions in your performance should be one button press away.",
      setup: "RC-505mkII. [MENU] > ASSIGN for button configuration. Consider your most common performance actions.",
      steps: [
        { text: "Identify your 2 most-used performance actions that currently require menu navigation or multiple button presses. These are your CTL candidates.", why: "CTL buttons solve your biggest workflow bottlenecks. If you frequently undo the last overdub, that's a CTL candidate. If you frequently switch effects, that's a CTL candidate." },
        { text: "Assign CTL 1 to your #1 action. Suggestions: ALL TRACK UNDO (roll back every track's last overdub), Track 5 Record (one-shot trigger), or Mark Back (save/restore loop state).", why: "CTL 1 should be your most critical action — the one you reach for in high-pressure moments. ALL TRACK UNDO is popular because it's the 'oh no' button." },
        { text: "Assign CTL 2 to your #2 action. Suggestions: Tap Tempo (tempo changes mid-performance), ALL CLEAR (reset everything), or Input FX toggle.", why: "CTL 2 is your second-most-used shortcut. Together, CTL 1 and CTL 2 should cover your two biggest performance needs." },
        { text: "Test both assignments under performance conditions — build a loop, trigger CTL 1, trigger CTL 2. Do they work as expected? Do they feel natural in the heat of the moment?", why: "Testing under performance conditions reveals whether the assignment is intuitive. If you reach for CTL 1 and hit CTL 2 under pressure, swap them — the more urgent action should be on the button your hand reaches first." }
      ],
      feel: "Like assigning keyboard shortcuts in your favorite app — once configured, you wonder how you ever worked without them. Two buttons, infinite time saved.",
      wrong: "If you can't decide what to assign, perform 3 songs and note every time you wish you had a shortcut. The answer reveals itself through performance, not planning.",
      sarah: "Gene, CTL buttons are your custom shortcuts — assign what you use most. The 505 gives you two programmable buttons that can do ANYTHING. Make them do the two things you need most. That's it. Simple, powerful, personal.",
      levelUp: "CTL 1 and CTL 2 assigned, tested under performance conditions, and used naturally without hesitation."
    },
    {
      id: "lo14e5", time: 8, title: "Footswitch Setup", type: "looper",
      checklist: true,
      what: "External footswitch connects to CTL 3/4 jacks on the RC-505mkII. Hands-free control: footswitch triggers Record/Play while your hands play guitar. This is how guitarists loop without ever taking their hands off the instrument.",
      setup: "External footswitch (if available) connected to CTL 3/4 jack on the RC-505mkII. Guitar in INST 1.",
      steps: [
        { text: "Connect an external footswitch to the CTL 3 or CTL 4 jack on the back of the 505. If you don't have a footswitch, read through this exercise to understand the capability for future expansion.", why: "Footswitch control transforms the 505 from a tabletop device to a floor-controllable instrument. For guitarists, this is the most important upgrade path." },
        { text: "Assign the footswitch: [MENU] > ASSIGN. SOURCE = CTL 3 (or CTL 4). TARGET = Track 1 Record/Play/Overdub. Now your foot controls Track 1 while your hands play guitar.", why: "Hands-free recording is the holy grail for guitarist-loopers. No more awkward reaches to the table between riffs. Your hands stay on the strings; your foot controls the loop." },
        { text: "Test the workflow: start the rhythm guide, play a guitar riff, step on the footswitch to start recording, play 4 bars, step again to stop. Your hands never leave the guitar.", why: "This workflow mirrors how Ed Sheeran and Tash Sultana loop live — feet control the looper while hands play the instrument. The audience sees a seamless performance, not a person wrestling with a box on a table." },
        { text: "If you have TWO footswitches (or a dual footswitch): assign one to Record/Play on Track 1 and one to ALL STOP. Two feet, complete looper control.", why: "Dual footswitch = record with one foot, stop everything with the other. This is the minimum viable hands-free looper setup. Everything more complex is a bonus." },
        { text: "Even without a physical footswitch: understand what you'd assign and why. This informs future gear purchases. Write down your ideal footswitch assignments.", why: "Planning your footswitch assignments before buying ensures you get the right type (momentary vs latching, single vs dual). Informed purchase prevents wasted money." }
      ],
      feel: "Like getting power steering after years of manual — suddenly the car responds to your lightest touch. A footswitch makes guitar looping feel effortless because your hands never leave the strings.",
      wrong: "If the footswitch doesn't respond, check: (1) the polarity setting in [MENU] > SYSTEM > CTL, (2) the cable — footswitches use TS (mono) cables, not TRS. (3) Test with a simple assignment first before complex routing.",
      sarah: "Gene, a footswitch makes guitar looping seamless — your hands never leave the strings. Even if you don't have one yet, understanding how it works tells you exactly what to buy when you're ready. The 505 is designed for this expansion.",
      levelUp: "Footswitch connected (or plan documented), assigned, and tested with hands-free guitar loop recording."
    },
    {
      id: "lo14e6", time: 5, title: "Expression Pedal Routing", type: "looper",
      checklist: true,
      what: "An expression pedal connected to the 505's EXP jack gives you continuous foot control over any parameter — filter cutoff, reverb depth, track volume, delay feedback. This is the wah pedal of the looper world: hands-free real-time parameter sweeps.",
      setup: "Expression pedal (if available) connected to EXP jack on the RC-505mkII. [MENU] > ASSIGN for routing.",
      steps: [
        { text: "Connect an expression pedal to the EXP jack on the RC-505mkII. If you don't have one, read through to understand the capability.", why: "Expression pedal control adds a continuous, foot-controlled dimension to your performance. Unlike footswitches (on/off), expression pedals give you a full range of values — like a volume knob you control with your foot." },
        { text: "Assign the expression pedal: [MENU] > ASSIGN. SOURCE = EXP PEDAL. TARGET = Input FX Filter Cutoff. Now toe-down = bright, heel-down = dark. Sweep it slowly.", why: "Filter cutoff is the classic expression pedal assignment. It's the dub reggae filter sweep — Lee 'Scratch' Perry, King Tubby, and every dub producer rides the filter. Now your foot does it." },
        { text: "Try alternative assignments: EXP > Reverb Depth (swell reverb in and out), EXP > Track 1 Volume (foot-controlled mix), EXP > Delay Feedback (foot-controlled echo buildup).", why: "Each assignment creates a different performance tool. Filter = dub sweeps. Reverb = atmospheric swells. Delay feedback = psychedelic echo buildups. Choose what serves your music." },
        { text: "Build a reggae loop and ride the filter with the expression pedal. Feel the dub effect — low-pass filter opens and closes over the rhythm guitar.", why: "This is the exact sound that defines dub reggae. King Tubby did this with hardware filters in the 1970s. You're doing it with your foot on a loop performance. Same music, modern tools." }
      ],
      feel: "Like getting a third hand — your foot controls parameters while both hands play instruments. The expressive range transforms static loops into dynamic, breathing performances.",
      wrong: "If the pedal direction feels backwards (toe-down makes it darker instead of brighter), reverse the polarity in the Assign settings or swap the MIN/MAX values in the assignment.",
      sarah: "Gene, expression pedal plus filter equals hands-free dub effects. This is the sound of King Tubby, Lee 'Scratch' Perry, and every dub producer who ever lived — and now it's under your foot while your hands play guitar. Your reggae-rock instincts are going to explode with this.",
      levelUp: "Expression pedal assigned, calibrated, and used musically in a loop performance — smooth parameter sweeps that serve the music."
    },
    {
      id: "lo14e7", time: 8, title: "MIDI CC External Control", type: "looper",
      checklist: true,
      what: "The RC-505mkII sends and receives MIDI CC (Continuous Controller) messages. This means your keyboard's knobs can control 505 effects parameters, and the 505's controls can adjust parameters on external gear. One interface for everything.",
      setup: "RC-505mkII connected to KeyLab 49 (or other MIDI controller) via MIDI or USB. [MENU] > ASSIGN for CC mapping.",
      steps: [
        { text: "Identify which CC numbers your keyboard sends on its knobs/sliders. The KeyLab 49 sends CC 1-8 on its encoder knobs by default. Check the keyboard's documentation.", why: "Every MIDI controller sends specific CC numbers on its physical controls. Knowing your keyboard's CC map is essential for mapping those controls to 505 parameters." },
        { text: "In the 505's Assign matrix: [MENU] > ASSIGN. Create a new assignment: SOURCE = MIDI CC (set to the CC number your keyboard sends, e.g., CC 1). TARGET = Input FX Reverb Depth.", why: "Now turning knob 1 on your keyboard controls the 505's reverb depth. You're controlling the looper from the keyboard — one interface for both instruments." },
        { text: "Map 2-3 keyboard knobs to different 505 parameters: CC 1 > Reverb Depth, CC 2 > Delay Feedback, CC 3 > Filter Cutoff. Now your keyboard controls your effects chain.", why: "Multiple mappings turn your keyboard into a 505 control surface. During performance, your left hand plays keys while your right hand tweaks looper effects — or vice versa." },
        { text: "Test the reverse direction: 505 sending CC to the keyboard/DAW. Useful if you want the 505's knobs to control virtual instruments in a DAW.", why: "Bidirectional CC creates a fully integrated rig. The 505 controls the DAW, the keyboard controls the 505 — everything is interconnected." },
        { text: "Build a loop performance where you use keyboard knobs to control 505 effects in real time. Play a chord on the keys, twist the reverb knob, let the effect bloom while recording on the 505.", why: "This is the payoff: seamless integration where the boundary between instruments disappears. You're not operating two devices — you're playing one instrument." }
      ],
      feel: "Like discovering that your car stereo also controls your home speakers — suddenly everything is connected and controlled from one place. The keyboard and looper become one unified instrument.",
      wrong: "If CC messages aren't being received, check: (1) MIDI channel match (both devices on the same channel or omni), (2) CC number match (the keyboard sends what the 505 expects), (3) cable direction (MIDI OUT on keyboard to MIDI IN on 505).",
      sarah: "Gene, MIDI CC makes your keyboard's knobs control the 505 — one interface for everything. Your KeyLab 49 has those beautiful encoder knobs that are begging to control reverb depth and filter cutoff. This is the integration that makes your rig feel like one instrument instead of two boxes on a table.",
      levelUp: "3+ MIDI CC assignments working between keyboard and 505. Keyboard knobs controlling 505 effects in real time during a loop performance."
    },
    {
      id: "lo14e8", time: 5, title: "External Drum Machine Sync", type: "looper",
      checklist: true,
      what: "Sync a drum machine or groovebox to the 505's MIDI clock. The drum machine follows the 505's tempo automatically, providing more sophisticated rhythm than beatboxing — perfectly synced to your loops.",
      setup: "RC-505mkII MIDI OUT connected to drum machine MIDI IN. 505 set as clock master.",
      steps: [
        { text: "Connect MIDI OUT from the 505 to MIDI IN on the drum machine. Set the 505 as clock master: [MENU] > SYSTEM > MIDI > SYNC > send mode.", why: "The 505 is the tempo authority. The drum machine follows. This hierarchy prevents tempo conflicts — one master, one follower." },
        { text: "Start the 505's rhythm guide or begin recording loops. The drum machine should start playing in sync automatically (most drum machines auto-start on receiving clock).", why: "Auto-start on clock is standard behavior. If the drum machine doesn't start automatically, check its sync settings — it may need to be set to 'external clock' mode." },
        { text: "Build a loop performance over the drum machine's pattern. The drum machine provides the kick, snare, and hi-hat while you loop guitar, bass, keys, and vocals on the 505.", why: "This workflow replaces beatboxed drums with real drum patterns. The quality leap is enormous — professional-sounding drums that stay perfectly synced." },
        { text: "Try changing tempo on the 505 mid-performance. The drum machine should follow. Test the limits: how fast can you change tempo before sync stutters?", why: "Tempo flexibility with synced drums opens new performance possibilities: gradual buildups, dramatic tempo drops, sections at different speeds. Know what your gear handles." }
      ],
      feel: "Like hiring a drummer who follows your every tempo change without rehearsal. The drum machine never rushes, never drags, never forgets the pattern. It's the most reliable bandmate imaginable.",
      wrong: "If the drum machine doesn't sync: (1) verify cable direction (505 OUT to drum IN), (2) set the drum machine to external/MIDI clock mode, (3) ensure both devices are on the same MIDI channel. If tempo changes cause stuttering, make tempo changes gradual rather than sudden.",
      sarah: "Gene, an external drum machine synced to the 505 replaces beatboxing with real drums. Your looping suddenly has a rhythm section that sounds like a studio recording. The combination of live loops and a synced drum machine is how many solo performers create huge-sounding shows.",
      metronome: 100,
      levelUp: "Drum machine synced to 505 clock. Full loop performance with external drums, smooth tempo changes."
    },
    {
      id: "lo14e9", time: 5, title: "Program Change Messages", type: "looper",
      checklist: true,
      what: "MIDI Program Change messages switch between MEMORY slots remotely. A footswitch controller or DAW sends a program change number, and the 505 loads that MEMORY slot. Hands-free setlist navigation — the ultimate live setup.",
      setup: "RC-505mkII connected to MIDI footswitch controller or DAW. Multiple MEMORY slots loaded with songs.",
      steps: [
        { text: "Enable Program Change reception on the 505: [MENU] > SYSTEM > MIDI. Ensure the 505 responds to incoming Program Change messages.", why: "Program Change reception must be explicitly enabled. Without it, the 505 ignores incoming program change messages." },
        { text: "From a MIDI footswitch or DAW: send Program Change #1. The 505 should load MEMORY slot 1. Send Program Change #3 — it should load MEMORY slot 3.", why: "Each program change number maps to a MEMORY slot. Your setlist becomes a sequence of program change messages. Foot tap = next song loaded." },
        { text: "Set up a setlist scenario: MEMORY 1 = opener, MEMORY 2 = song 2, MEMORY 3 = closer. Step through them via program change. Verify each song's settings load correctly.", why: "Walking through the setlist with program changes simulates a live set. Each tap loads the next song's tempo, effects, and track settings. No menu navigation during performance." },
        { text: "If using a DAW: place program change messages at specific timeline markers. When the DAW reaches that marker, the 505 automatically switches songs. Fully automated setlist.", why: "DAW-automated program changes create a self-navigating setlist. The show runs on rails — you just play. This is how touring artists with complex rigs manage song transitions." }
      ],
      feel: "Like having a stagehand who switches your guitar and amp settings between songs — silently, instantly, without you lifting a finger. The technology disappears and only the music remains.",
      wrong: "If program changes aren't switching MEMORY slots: (1) check that reception is enabled in MIDI settings, (2) verify MIDI channel match, (3) confirm the program change number matches the MEMORY slot number (some systems are zero-indexed — PC #0 = slot 1).",
      sarah: "Gene, program change equals song switching via foot — the ultimate live setup. Imagine stepping through your entire setlist without ever touching the 505's buttons. Your feet handle navigation, your hands handle music. That's professional-grade live looping.",
      levelUp: "Program changes successfully switching between 3+ MEMORY slots from an external controller."
    },
    {
      id: "lo14e10", time: 5, title: "System Settings Deep Dive", type: "looper",
      checklist: true,
      what: "The settings most loopers never touch: [MENU] > SYSTEM. LCD contrast, peak hold time, knob mode, auto-off timer, factory reset. Set-and-forget configurations that prevent frustration when you know they exist.",
      setup: "RC-505mkII. Navigate to [MENU] > SYSTEM. Paper for noting your preferred settings.",
      steps: [
        { text: "LCD contrast: [MENU] > SYSTEM > DISPLAY. Adjust for your performance viewing angle. Bright stage = higher contrast. Dark room = lower contrast. Set it for your most common playing environment.", why: "LCD visibility affects your ability to read track status during performance. The wrong contrast means squinting at the screen when you should be looking at the audience." },
        { text: "Knob mode: [MENU] > SYSTEM > KNOB MODE. 'Direct' = parameter jumps to knob position immediately. 'Catch' = parameter doesn't change until the knob passes the current value. Catch prevents sudden parameter jumps when loading MEMORY slots.", why: "Catch mode prevents surprises. When you load a MEMORY slot, the knobs might be in different positions than the saved values. Direct mode causes jarring jumps; Catch mode waits until you intentionally move past the stored value." },
        { text: "Peak hold: [MENU] > SYSTEM > METER. Sets how long the level meter peak indicator stays visible. Longer hold = easier to see if you're clipping. Shorter hold = meter updates faster.", why: "Peak hold is a mixing tool. During performance, a longer hold time lets you catch momentary clips that a shorter hold might miss." },
        { text: "Auto-off timer: [MENU] > SYSTEM > AUTO OFF. Disable it for performance (you don't want the 505 shutting down during a gig). Enable it for practice to save power.", why: "Auto-off during a gig is a nightmare scenario. Disable it before any live performance. Re-enable for practice sessions to extend the life of internal components." },
        { text: "Factory reset: [MENU] > SYSTEM > FACTORY RESET. Know where it is. Never touch it without a backup. This erases ALL MEMORY slots, ALL assignments, ALL settings. The nuclear option.", why: "Factory reset is the last resort for unfixable issues. Knowing it exists is important; using it without a backup is catastrophic. Always backup before even considering this." }
      ],
      feel: "Like adjusting the mirrors and seat in a rental car — you do it once at the start and then forget about it. But if you DON'T do it, every drive is slightly uncomfortable.",
      wrong: "If you accidentally trigger factory reset: power off immediately (before it completes, if possible). If it completes: restore from your backup (you DO have a backup, right? That's the next exercise).",
      sarah: "Gene, system settings are set-and-forget, but knowing they exist prevents frustration. Every weird behavior — knobs jumping when you load presets, the screen being hard to read, the unit shutting off — has a setting that fixes it. This exercise eliminates those small annoyances forever.",
      levelUp: "System settings reviewed, configured for your environment, and documented. Knob mode set to Catch. Auto-off disabled for performance use."
    },
    {
      id: "lo14e11", time: 5, title: "The Performance Rig Map", type: "looper",
      checklist: true,
      what: "Draw your complete rig on paper. The 505 in the center. Lines to every connected device. Label every connection. This is your stage plot — venues and sound engineers need this, and YOU need it for troubleshooting.",
      setup: "Paper and pen. Your complete rig (or knowledge of all components you plan to connect).",
      steps: [
        { text: "Draw the RC-505mkII in the center of the page. This is the hub of your rig — everything connects to it.", why: "The 505 is the center of your performance universe. Visualizing it at the center reinforces the mental model: everything flows through the looper." },
        { text: "Draw lines to every connected device and label each connection: guitar > INST 1, keyboard > INST 2 (or USB MIDI), mic > MIC input, headphones > PHONES jack, main output > PA/amp, USB > laptop/DAW.", why: "Every connection has a specific input/output and cable type. Documenting this prevents the 'which cable goes where?' panic during setup." },
        { text: "Add optional connections: footswitch > CTL 3/4, expression pedal > EXP, MIDI OUT > drum machine, external effects loop. Even if you don't have these yet, knowing where they go prepares you for expansion.", why: "Your rig will grow. Knowing the expansion points means you can add gear without redesigning the whole setup." },
        { text: "Label each connection with the cable type (TS, TRS, XLR, USB, MIDI 5-pin) and the signal type (audio, MIDI, clock). Keep this diagram with your rig.", why: "Cable types matter. A TRS cable in a TS jack can cause phase issues. An XLR in a TS input won't work. Your rig map is your wiring diagram — a sound engineer's best friend." },
        { text: "Make a second copy: a simplified version that shows only what a venue sound engineer needs — outputs, power requirements, table space needed. This is your stage plot.", why: "Every pro has a stage plot. It tells the venue what you need: one table, two outputs (L/R), one DI box, power strip. Showing up with a stage plot signals professionalism." }
      ],
      feel: "Like an architect's blueprint — not glamorous, but essential. Every pro knows their rig map by heart and carries a paper copy. When something goes wrong at 11 PM at a gig, you troubleshoot from the map, not from memory.",
      wrong: "If your rig map is too complex to fit on one page, your rig might be too complex for reliable live performance. Simplify until the map fits on a single sheet.",
      sarah: "Gene, every pro has a stage plot — it's your rig's blueprint. The act of drawing it forces you to understand every connection. When a cable fails at a gig, you'll look at your map and know exactly which cable to swap. That's the difference between a 30-second fix and a 10-minute fumble.",
      levelUp: "Complete rig map drawn, labeled with cable types and signal flow. Simplified stage plot version ready for venues."
    },
    {
      id: "lo14e12", time: 5, title: "Backup and Restore", type: "looper",
      checklist: true,
      what: "Backup all MEMORY slots, assignments, and system settings to USB drive or computer. Restore from backup. This is insurance — do it after every session where you save something worth keeping. Loss of a polished MEMORY library is devastating.",
      setup: "RC-505mkII connected to computer via USB, or USB drive inserted into 505's USB port (if available).",
      steps: [
        { text: "Navigate to backup: [MENU] > SYSTEM > BACKUP (or USB UTILITY, depending on firmware version). Select 'Backup' to save all data to the connected storage.", why: "Backup captures everything: MEMORY slots, Assign matrix, system settings, effects chains. One action preserves weeks or months of configuration work." },
        { text: "Verify the backup: check the destination (computer folder or USB drive) and confirm the backup file exists. Note the date and file size.", why: "A backup that doesn't exist is worse than no backup — it gives false confidence. Always verify." },
        { text: "Test restore: if you have a non-critical MEMORY slot, change it, then restore from backup. Verify the slot reverts to its backed-up state.", why: "An untested restore is an assumption, not a backup. Testing proves the backup actually works. Do this ONCE so you trust the process." },
        { text: "Create a backup schedule: backup after every session where you save a new song or modify your Assign matrix. Keep at least 3 dated backups (rotate old ones).", why: "Regular backups with rotation mean you can recover from any point. If a firmware update corrupts data, you have multiple restore points." }
      ],
      feel: "Like making a copy of your house key and giving it to a trusted friend. You hope you never need it, but if you do, it's there. The five minutes spent backing up saves hours of rebuilding.",
      wrong: "If restore fails or the backup file seems corrupt, try a different USB cable or a different computer. USB connection issues are the #1 cause of backup/restore failures.",
      sarah: "Gene, backup is insurance — do it after every session where you save something worth keeping. You've spent months building your MEMORY library, your Assign matrix, your effects chains. Five minutes of backup protects all of that. Make it a habit, like saving a document.",
      levelUp: "Full backup completed, verified, and restore tested. Backup schedule established."
    },
    {
      id: "lo14e13", time: 5, title: "Firmware Awareness", type: "looper",
      checklist: true,
      what: "Check your current firmware version, understand the update process, and know where to find new releases. Firmware updates are free upgrades that add features and fix bugs — but they require a backup first.",
      setup: "RC-505mkII. Computer with internet access. USB cable.",
      steps: [
        { text: "Check current firmware version: [MENU] > SYSTEM > INFO (or SYSTEM > VERSION). Note the version number.", why: "Knowing your current version tells you whether updates are available. If you're reporting a bug to Boss, they'll ask for your firmware version first." },
        { text: "Visit boss.info (or roland.com/support) and search for RC-505mkII firmware updates. Compare the latest available version to your current version.", why: "Boss releases updates that add features (new effects, improved quantize) and fix bugs (MIDI sync issues, audio glitches). These are free upgrades." },
        { text: "Read the update changelog before updating. Note new features and bug fixes. Decide whether the update benefits YOUR workflow.", why: "Not every update is essential. If the changelog only fixes features you don't use, you can skip it. If it adds a feature you've been wanting, update." },
        { text: "If updating: BACKUP FIRST (previous exercise). Download the update file, place on USB drive (or computer), follow the update instructions in the 505's manual. The process typically takes 5-10 minutes.", why: "Firmware updates carry a small risk of data loss or settings reset. Backup ensures you can restore everything if the update causes issues." },
        { text: "After updating: verify that your MEMORY slots, Assign matrix, and system settings survived. If anything was reset, restore from backup.", why: "Post-update verification catches data loss early. Discovering a reset MEMORY library mid-gig is a preventable catastrophe." }
      ],
      feel: "Like updating your phone's OS — usually smooth, occasionally surprising, always worth checking the changelog first. The update itself is boring; the new features are exciting.",
      wrong: "NEVER update firmware before a gig. Always update with at least a week of practice time before any performance, in case settings change or new features behave unexpectedly.",
      sarah: "Gene, firmware updates are free upgrades — but always backup first. Boss has been good about adding features to the 505mkII through firmware. Each update is like getting a slightly better looper for free. Just backup before you update, and you're safe.",
      levelUp: "Current firmware version known. Update process understood. Backup completed before any future updates."
    },
    {
      id: "lo14e14", time: 10, title: "The Complete Rig Test", type: "looper",
      checklist: true,
      what: "Full integration test: perform a complete song using all connected gear simultaneously. The 505 provides clock to the DAW. Keyboard bass through INST 2. Guitar through INST 1. Vocal through MIC. Footswitch controls Record/Stop. Expression pedal rides filter. DAW provides a synced drum loop. Everything connected, everything verified.",
      setup: "Complete rig: RC-505mkII as clock master, DAW synced via USB, keyboard connected, guitar in INST 1, mic in MIC input, footswitch on CTL 3/4 (if available), expression pedal on EXP (if available). All Assign matrix entries configured.",
      steps: [
        { text: "Power on everything in order: computer/DAW first, then 505, then external gear. Start the 505's clock. Verify the DAW follows. Verify any drum machine follows.", why: "Power-on order matters for MIDI sync. The master device (505) should be ready before slaves try to sync. Starting in the wrong order can cause sync failures." },
        { text: "Sound check every input: guitar (INST 1), keyboard (INST 2 or MIDI), vocal (MIC). Set levels for each. Check that all outputs work: headphones, main out to amp/PA.", why: "The complete sound check catches issues before performance. A dead input discovered during a song is a disaster; a dead input discovered during sound check is a cable swap." },
        { text: "Perform a complete song: start the DAW's drum loop (synced to 505 clock). Record a guitar loop on T1 (via footswitch if available). Add keyboard bass on T2. Add vocal on T3. Ride the expression pedal for filter sweeps. Use CTL buttons for effects changes.", why: "This is the maximum configuration — every piece of gear contributing to one performance. If it all works together, you're ready for any stage." },
        { text: "During the performance, note any issues: latency, sync drift, level imbalances, control confusion. After the song: address each issue. Re-test.", why: "The integration test reveals issues that don't appear when testing each device in isolation. The interactions between devices produce unique problems — sync drift, level conflicts, MIDI congestion." },
        { text: "Record the full performance via USB into the DAW for multi-track review. Listen back on studio monitors. This is your complete rig at full capacity — hear it in its best light.", why: "Multi-track recording of the full rig reveals the complete picture. You'll hear frequency conflicts, timing issues, and balance problems that headphone monitoring misses." }
      ],
      feel: "Like a dress rehearsal where everything is real — the lights, the sound, the full band (which is just you and your rig). If this goes smoothly, you're ready for any venue. If issues appear, better here than on stage.",
      wrong: "If multiple things fail simultaneously, troubleshoot ONE at a time. Disconnect everything, add one device, test, add the next, test. The issue is almost always one specific connection, not a systemic failure.",
      sarah: "Gene, the complete rig test is your dress rehearsal — everything connected, everything verified. When this goes smoothly, you'll feel something shift. You'll stop thinking about the gear and start thinking about the music. That's the moment your rig becomes invisible and you become the performer. That's what this whole level has been building toward.",
      metronome: 95,
      levelUp: "Full integration performance with all connected gear, no technical failures, smooth transitions, and multi-track recording captured for review."
    }
  ]
};
