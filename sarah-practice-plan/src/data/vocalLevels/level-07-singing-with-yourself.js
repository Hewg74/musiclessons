import { getPitchRange } from "../appData.js";

export const level7 = {
  num: 7, name: "Harmony & Layering", focus: "Self-harmonizing, 3rds/5ths, looper vocal stacking",
  duration: "30 min",
  setup: "Guitar. RC-505mkII optional but ideal. Headphones.",
  subtitle: "Singing With Yourself",
  description: "Elliott Smith sang 3-part harmonies with himself. Bob Marley's backing vocals were as iconic as his leads. Bon Iver builds entire songs from stacked vocal layers. This level teaches you to harmonize with yourself -- the essential skill for looper-based singer-songwriter performance.",
  artists: "Bon Iver, Elliott Smith, Bob Marley",
  unlocks: "Singing While Playing (Level 8)",
  review: { label: "Level 5 Check-In", time: 5, exercises: ["v5e1", "v5e4"], prompt: "Perform a 5-note scale crescendo to f — smooth, controlled (v5e1). Then toggle between breathy and full tone on the same phrase (v5e4). Dynamic control decays without drills." },
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
      referencePitches: getPitchRange("C3", "E4"),
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
      id: "v7e3b", time: 6, title: "Phone to DAW Bridge", type: "record",
      what: "Record a vocal take on your phone, then listen back critically. Write down: pitch issues, timing issues, tone issues. This is the self-assessment skill needed before moving to more complex recording setups.",
      setup: "Phone with voice memo app. Pen and paper for notes. A song or exercise you know well.",
      steps: [
        { text: "Record yourself singing a full verse of a song you know. Don't overthink it -- just sing naturally.", why: "The recording needs to be representative of your real singing, not a hyper-focused 'best attempt'. Natural performance reveals the real issues." },
        { text: "Play it back. First listen: just notice your overall reaction. Do you like what you hear? Where do you wince?", why: "Your gut reaction is honest. The wince points are exactly where improvement will have the most impact." },
        { text: "Second listen with pen and paper. Write down specific issues: 'sharp on the A3 in bar 2', 'rushed the third phrase', 'tone gets thin on high notes'.", why: "Vague notes like 'sounds bad' don't help. Specific notes like 'flat on the word golden' give you actionable targets." },
        { text: "Categorize your notes: PITCH issues, TIMING issues, TONE issues. Which category has the most entries?", why: "The dominant category tells you what to focus on. If it's pitch, more ear training. If it's timing, more rhythm work. If it's tone, more technique." },
        { text: "Pick the #1 issue from your notes. Sing the section again focusing only on that one thing. Record and compare.", why: "Targeted re-recording with a single focus is the fastest path to improvement. Trying to fix everything at once fixes nothing." }
      ],
      feel: "Like being your own vocal coach. The pen-and-paper review transforms passive listening into active analysis. You're building the critical ear that every good singer needs.",
      wrong: "If you can't hear any issues in your recording, you're not listening critically enough. Try listening at half volume -- imperfections become more obvious when the sound is quieter. If everything sounds terrible, you're being too harsh -- focus on what IS working, then identify one thing to improve.",
      sarah: "The ability to self-assess from a recording is the single most important skill for independent practice. A voice teacher isn't always in the room -- your recorded self has to be your teacher.",
      recorder: true,
      levelUp: "Written self-assessment of a recorded vocal take with at least 3 specific, actionable notes across pitch, timing, and tone."
    },
    {
      id: "v7e4", time: 5, title: "Looper Vocal Stack: Two Voices", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
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
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
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
};
