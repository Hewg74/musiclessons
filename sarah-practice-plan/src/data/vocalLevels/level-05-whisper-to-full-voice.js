import { getPitchRange } from "../appData.js";

export const level5 = {
  num: 5, name: "Dynamics & Expression", focus: "Whisper to full voice, emotional arcs",
  duration: "20 min",
  setup: "Standing. Phone to record. Quiet room.",
  subtitle: "Whisper to Full Voice",
  description: "Jeff Buckley could go from a whisper to a scream in one phrase. Elliott Smith's entire catalogue lives in the space between pp and mp. Dynamics are how you tell emotional stories with your voice -- louder isn't better, controlled contrast is everything.",
  artists: "Elliott Smith, Eddie Vedder, Jeff Buckley",
  unlocks: "Style & Texture (Level 6)",
  review: { label: "Level 3 Check-In", time: 5, exercises: ["v3e1", "v3e4"], prompt: "Sing lyrics precisely on the beat for 1 minute (v3e1). Then do 1 minute of reggae call-and-space phrasing with full-bar rests (v3e4). Rhythm skills erode fast without practice." },
  exercises: [
    {
      id: "v5e1", time: 4, title: "Whisper-to-Full Scale", type: "vocal",
      volumeMeter: true,
      what: "5-note scale: whisper (pp) at the bottom, full voice (f) at the top, back to whisper. Jeff Buckley's superpower was this kind of dynamic range within a single phrase.",
      setup: "Standing. Comfortable 5-note range (e.g., C3-G3). No guitar.",
      referencePitches: getPitchRange("C3", "G3"),
      steps: [
        { text: "Sing C3 at a whisper (pp). Barely audible, but still pitched -- not just air.", why: "A pitched whisper still engages the vocal folds, just barely. This is your dynamic floor." },
        { text: "Ascend: D3 at p, E3 at mp, F3 at mf, G3 at f. Each note louder than the last.", why: "Linking volume to pitch creates a natural crescendo. Higher = louder is intuitive for the body." },
        { text: "Descend: F3 at mf, E3 at mp, D3 at p, C3 back to whisper.", why: "The decrescendo is harder. Your body wants to stay loud. Training the fade-back is the real skill." },
        { text: "Repeat 3 times. On each pass, try to make the transitions between dynamic levels smoother.", why: "You're not looking for 5 discrete volumes -- you want a continuous gradient from whisper to full." }
      ],
      feel: "The scale should feel like a wave: building up, cresting, falling back. The whisper should feel intimate. The full voice should feel powerful but not strained.",
      wrong: "If the whisper has no pitch (just air), engage your vocal folds more. If the full voice feels like shouting, pull back -- f is strong, not screaming.",
      metronome: 60,
      recorder: true,
      levelUp: "Smooth dynamic gradient across 5 notes with no sudden jumps between levels, 3 times."
    },
    {
      id: "v5e0b", time: 5, title: "Basic Recording Setup", type: "record",
      what: "Set up your phone or laptop as a recording device. Record yourself singing a simple exercise, play it back, adjust mic distance and volume. The goal is getting a clean recording before any performance recording exercises.",
      setup: "Phone or laptop with voice memo app. Quiet room. No guitar.",
      steps: [
        { text: "Open your voice memo app (or GarageBand, Voice Memos, etc.). Place your phone on a table or hold it 6-8 inches from your mouth.", why: "Consistent mic placement is the #1 factor in recording quality. Too close = distortion and plosives. Too far = thin and roomy." },
        { text: "Record 10 seconds of singing a comfortable note on 'ah'. Play it back. Does it sound clean, or distorted/muffled?", why: "This first test recording reveals your baseline. Most people hold the phone too close or too far." },
        { text: "Adjust distance: try 4 inches, then 8 inches, then 12 inches. Record each. Listen to the difference.", why: "Each distance creates a different tone. Close = warm and bassy (proximity effect). Far = clearer but thinner. Find your sweet spot." },
        { text: "Record a 30-second vocal exercise at your best distance. Play it back. Is the volume consistent? Can you hear yourself clearly without distortion?", why: "A clean recording at consistent volume is the minimum standard. Everything in later levels builds on this skill." },
        { text: "Save this recording as your 'Day 1' reference. You'll compare future recordings against it to track progress.", why: "Having a dated reference recording lets you hear improvement over weeks -- something that's impossible to notice day-to-day." }
      ],
      feel: "Like setting up a camera before a photo shoot. The technology should serve the music, not distract from it. Once the setup is dialed in, forget about it and focus on singing.",
      wrong: "If every recording sounds distorted, you're too close or singing too loud for the mic. If it sounds thin and echoey, you're too far or the room has too many hard surfaces. Try a closet or a room with carpet.",
      recorder: true,
      levelUp: "Clean 30-second vocal recording with consistent volume, no distortion, and clear tone."
    },
    {
      id: "v5e2", time: 4, title: "Dynamic Phrase Arcs", type: "vocal",
      recorder: true,
      volumeMeter: true,
      what: "4-bar phrase: quiet start, peak word, fade. This is the emotional storytelling shape that every great vocalist uses -- build to the most important word, then release.",
      setup: "Standing. Record yourself. Pick any lyric or make one up.",
      steps: [
        { text: "Choose a 4-bar phrase. Example: 'I walked down to the water / and the waves came in / and everything was golden / for a moment then...'", why: "You need words to practice dynamics. Made-up lyrics are fine -- the shape matters, not the poetry." },
        { text: "Identify the PEAK WORD -- the emotional climax. In this example: 'golden'.", why: "Every phrase has one word that carries the most weight. That's where your voice should be loudest." },
        { text: "Sing: start quiet, build toward the peak word, fade after it. pp -> mf -> pp.", why: "This arc is the universal shape of emotional vocal delivery. Build, peak, release." },
        { text: "Record and listen back. Does the peak word stand out? Does the arc feel natural?", why: "Your ears are more objective in playback. What felt dramatic might sound subtle -- or vice versa." }
      ],
      feel: "The peak word should feel like the spotlight hits it. Everything before builds toward it; everything after lives in its afterglow.",
      wrong: "If every word is the same volume, you're delivering a flat line instead of an arc. Exaggerate the dynamics at first -- you can always pull back.",
      levelUp: "Record a phrase arc that sounds emotionally compelling on playback."
    },
    {
      id: "v5e3", time: 4, title: "Messa di Voce on Lyrics", type: "vocal",
      recorder: true,
      volumeMeter: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }, { name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      what: "Apply the pp->mf->pp swell from Level 2 to a lyric line. The peak word = emotional climax. This is the messa di voce evolved from a technical exercise to an expressive tool.",
      setup: "Standing. Record yourself. Pick a lyric from a song you're learning.",
      referencePitches: getPitchRange("G3", "B3"),
      steps: [
        { text: "Take a lyric line from ILTWYW or Sol Del Sur. Identify the peak word.", why: "Using real lyrics from your repertoire makes this immediately applicable." },
        { text: "Sing the line with a messa di voce shape: start quiet, swell to the peak word, fade after.", why: "Same swell from Level 2, but now applied to musical context instead of a sustained note." },
        { text: "Try the same line with the peak on a DIFFERENT word. How does the meaning change?", why: "Moving the dynamic peak changes the emotional emphasis. 'I love the way you walk' vs 'I love the WAY you walk'." },
        { text: "Find the version that feels most true to the song's emotion. Record it.", why: "There's usually one 'right' peak word per phrase. Your gut knows which one." }
      ],
      feel: "The lyric should feel like it's telling a story, not just delivering words. The dynamic shape gives the story an emotional contour.",
      wrong: "If the swell sounds mechanical (like a volume knob turning), it's too deliberate. Think of the emotion driving the volume, not the other way around.",
      levelUp: "Record a lyric line where the dynamic arc sounds emotional and natural, not performed."
    },
    {
      id: "v5e4", time: 4, title: "Breathy vs. Full Tone Toggle", type: "vocal",
      volumeMeter: true,
      what: "Alternate between breathy delivery (Nick Drake, Angus Stone) and full tone (Marley, Vedder) on the same phrase. Two vocal textures, one lyric -- feel how they change the mood.",
      setup: "Standing. Any lyric. Record yourself.",
      steps: [
        { text: "Sing a phrase with breathy tone: lots of air, soft, intimate. Think Nick Drake or DOPE LEMON.", why: "Breathy tone means the vocal folds aren't fully closed. Air leaks through, creating warmth and intimacy." },
        { text: "Same phrase with full tone: no air leak, strong, projected. Think Eddie Vedder or Bob Marley.", why: "Full tone means the folds close completely on each vibration. The sound is focused and powerful." },
        { text: "Alternate: breathy verse, full chorus, breathy verse, full chorus.", why: "This contrast is how singer-songwriters create dynamics without a band. The toggle IS the arrangement." },
        { text: "Record both versions. Listen: which suits the lyric better? The answer might surprise you.", why: "Some lyrics that seem like they should be powerful actually work better whispered, and vice versa." }
      ],
      feel: "Breathy should feel like a secret you're sharing. Full should feel like a declaration. Both should feel intentional, not accidental.",
      wrong: "If your breathy tone has no pitch (just air), engage the folds slightly more. If your full tone feels tight, you're pushing from the throat instead of supporting from the ribs.",
      recorder: true,
      levelUp: "Clean toggle between breathy and full on the same phrase, 4 times, with both sounding musical."
    },
    {
      id: "v5e5", time: 4, title: "Emotional Coloring", type: "vocal",
      recorder: true,
      what: "Same lyric sung 4 ways: happy, sad, angry, peaceful. Your voice communicates emotion through timbre, phrasing, and dynamics -- not just the words. This is the deepest level of vocal expression.",
      setup: "Standing. Record yourself. Pick a neutral lyric.",
      steps: [
        { text: "Pick a neutral lyric: 'The sun went down behind the hill'. Sing it HAPPY -- bright tone, forward placement, slight smile.", why: "Happy singing naturally lifts the soft palate and brightens vowels. Let the emotion shape the sound." },
        { text: "Same lyric, SAD. Darker tone, slower, breathier. Let the ends of phrases trail off.", why: "Sadness pulls the voice lower, darker. The trailing phrase endings communicate resignation." },
        { text: "Same lyric, ANGRY. More chest, sharper consonants, less air. Punchy and direct.", why: "Anger shortens phrases, hardens consonants, and pushes from the chest. Less floaty, more grounded." },
        { text: "Same lyric, PEACEFUL. Medium volume, smooth, even dynamics. Calm and centered.", why: "Peace is steady -- no dramatic swells, no punchy attacks. Like a lake with no waves." }
      ],
      feel: "Each version should sound like a different song, even though the words are identical. The emotion changes everything: tone, timing, dynamics, phrasing.",
      wrong: "If all 4 versions sound the same, you're delivering the words without the emotion. Try feeling the emotion FIRST (remember a happy moment, a sad one), then sing.",
      levelUp: "A listener could identify the emotion of each version without being told. Record and test with someone."
    }
  ]
};
