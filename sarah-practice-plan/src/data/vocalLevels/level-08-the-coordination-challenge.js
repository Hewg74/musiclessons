import { getPitchRange } from "../appData.js";

export const level8 = {
  num: 8, name: "Singing While Playing", focus: "Guitar + voice independence, autopilot coordination",
  duration: "25 min",
  setup: "Guitar in hand. Simple progressions only.",
  subtitle: "The Coordination Challenge",
  description: "Singing while playing guitar is a coordination problem, not a talent problem. The guitar has to be on complete autopilot before the voice can enter. Jack Johnson, Nick Drake, and Eddie Vedder all built this skill through the same method: simplify the guitar until it's invisible, then add voice.",
  artists: "Jack Johnson, Nick Drake, Eddie Vedder",
  unlocks: "Freestyle & Improv (Level 9)",
  review: { label: "Level 6 Check-In", time: 5, exercises: ["v6e3", "v6e4"], prompt: "Sing 1 minute of reggae vocal texture — rhythmic, slightly nasal, locked to the riddim (v6e3). Then 1 minute of surf-psych vocal float — straight tone, behind the guitar (v6e4). Style flexibility needs maintenance." },
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
      recorder: true,
      referencePitches: getPitchRange("A2", "A3"),
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
      recorder: true,
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
      recorder: true,
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
};
