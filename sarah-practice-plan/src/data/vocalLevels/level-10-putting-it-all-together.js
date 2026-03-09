export const level10 = {
  num: 10, name: "Performance & Integration", focus: "Full songs, mic technique, set building",
  duration: "35 min",
  setup: "Full setup: guitar, looper, mic, backing tracks.",
  subtitle: "Putting It All Together",
  description: "This is where every skill from every level converges. Full songs start to finish, looper arrangements, mic technique, and set building. You're not practicing anymore -- you're performing.",
  artists: "All of the above combined",
  unlocks: "The stage",
  review: { label: "Level 8 Check-In", time: 5, exercises: ["v8e1", "v8e5"], prompt: "Sing while strumming a full verse — autopilot check (v8e1). Then try starting your vocal on beat 3 instead of beat 1 (v8e5). If singing while playing has regressed, revisit Level 8." },
  exercises: [
    {
      id: "v10e0", time: 5, title: "Performance Mode: Nerves as Fuel", type: "vocal",
      what: "The pre-performance ritual that transforms anxiety into energy. Nerves and excitement are the same chemical — adrenaline. This exercise teaches you to reframe and channel that energy before every performance.",
      setup: "Standing. Quiet space. Do this immediately before any performance exercise.",
      steps: [
        { text: "Body scan: stand, close eyes. Notice where tension lives — shoulders, jaw, hands, stomach. Shake it out physically: arms, legs, neck. 30 seconds of loose shaking.", why: "Tension lives in the body before the mind notices it. Physical release breaks the anxiety-tension feedback loop." },
        { text: "Breathe: 4 counts in through the nose, 7 counts hold, 8 counts out through the mouth. 3 cycles.", why: "The extended exhale activates the parasympathetic nervous system — the body's calm-down switch. 3 cycles is enough to shift your state from fight-or-flight to ready-to-play." },
        { text: "Reframe: say out loud 'I'm excited to play.' Not 'I'm nervous.' Research shows relabeling anxiety as excitement improves performance — same adrenaline, different story.", why: "Harvard research (Alison Wood Brooks) demonstrated that saying 'I'm excited' before a performance measurably improves outcomes compared to 'I'm calm' or 'I'm nervous.' The body is already activated — match the label to the energy." },
        { text: "Set one intention for this performance. Not 'play perfectly' — something connective: 'feel the groove,' 'make eye contact,' 'enjoy the bridge.' Write it on your hand if needed.", why: "A single intention gives your mind a positive focus instead of a list of things to not screw up. It turns the performance from a test into an experience." },
        { text: "Record 30 seconds of playing right now. Watch it back. Notice: you look and sound better than you feel. The gap between internal experience and external reality is always smaller than you think.", why: "The camera doesn't lie — but neither does it reflect your internal anxiety. Seeing proof that you look calm while feeling nervous recalibrates your self-perception." }
      ],
      feel: "After this exercise, you should feel energized rather than anxious. The adrenaline is still there — but it's fuel, not fear.",
      wrong: "If the breathing doesn't help, you might be hyperventilating on the inhale. Slow the inhale down. If the reframe feels fake, try it anyway — the research works even when you don't fully believe it.",
      sarah: "Gene, every performer you admire feels this before they play. Khruangbin gets nervous. Jack Johnson gets nervous. The difference is they have a ritual that channels it. Now you do too.",
      recorder: true
    },
    {
      id: "v10e1", time: 8, title: "Full Song: Voice + Guitar", type: "vocal",
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }, { name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
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
      recorder: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }, { name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
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
};
