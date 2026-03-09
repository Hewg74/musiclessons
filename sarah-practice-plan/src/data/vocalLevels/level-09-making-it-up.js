import { getPitchRange } from "../appData.js";

export const level9 = {
  num: 9, name: "Freestyle & Improv", focus: "Melodic improv, scat, lyric freestyle",
  duration: "28 min",
  setup: "Backing track from collection. Voice-only first.",
  subtitle: "Making It Up",
  description: "Bradley Nowell built much of Sublime's catalogue through freestyle improvisation. Thom Yorke improvises vocal parts in the studio. The ability to make up melodies and lyrics in real time is the ultimate singer-songwriter skill -- it's where composition and performance merge.",
  artists: "Bradley Nowell, Thom Yorke",
  unlocks: "Performance & Integration (Level 10)",
  review: { label: "Level 7 Check-In", time: 5, exercises: ["v7e1", "v7e3"], prompt: "Sing a 3rd harmony over a recorded melody for one verse (v7e1). Then record and stack a 2-voice arrangement on your phone (v7e3). Harmony skills are perishable — check them." },
  exercises: [
    {
      id: "v9e1", time: 5, title: "Scat Improv: 3 Levels", type: "vocal",
      what: "Over a groove beat, improvise scat syllables following chord tones. Start simple, increase rhythmic complexity. This is the closest thing to actual improvised singing.",
      setup: "No guitar. Groove Beat 90 BPM or any backing track.",
      referencePitches: getPitchRange("A2", "C4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Level 1: One syllable per beat. 'doo . . doo . . doo . . doo'. On chord tones (Am: A, C, E).", why: "On-beat scat with chord tones is the simplest form of improvisation. Pitch + rhythm + syllable." },
        { text: "Level 2: Move syllables to &'s. '. doo . . doo . . doo . . doo'. Syncopated.", why: "Offbeat scat is harder -- your voice has to live between the clicks while tracking chord tones." },
        { text: "Level 3: 16th note bursts. 'doo-ba-dee . doo-ba-dee . doo'. Multiple syllables per beat.", why: "16th note scat requires fast syllable switching while maintaining pitch. This is advanced improv." },
        { text: "Record 2 minutes. Follow Am -> C -> G -> D chord tones at each level.", why: "Recording lets you hear if the syncopations are INTENTIONAL or ACCIDENTAL. Intentional sounds musical." }
      ],
      feel: "Level 1 should feel like controlled placement. Level 2 is the lyric placement exercise with scat. Level 3 is where it gets creative -- combining 16th subdivision with real-time pitch choices.",
      wrong: "If it sounds random (no connection to the chords), simplify. Go back to Level 1 and just sing root notes of each chord. Build back up.",
      sarah: "The diagnostic: are the syncopations INTENTIONAL or ACCIDENTAL? You can hear the difference -- intentional sounds musical, accidental sounds lost.",
      metronome: 90,
      recorder: true,
      levelUp: "Musical-sounding Level 3 scat over Am-C-G-D that follows chord tones."
    },
    {
      id: "v9e2", time: 4, title: "Melodic Freestyle Over Changes", type: "vocal",
      referencePitches: getPitchRange("A2", "C4"),
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      what: "Improvise melodies (no words) over Am-C-G-D. Start with chord tones, add passing tones, then go free. Your ear guides you; your voice follows.",
      setup: "Backing track at 85-90 BPM. No guitar -- just voice.",
      steps: [
        { text: "Round 1: Sing only chord tones (root, 3rd, 5th of each chord). 'Ooh' or 'ah'.", why: "Chord tones are safe -- they always sound consonant. This is your harmonic safety net." },
        { text: "Round 2: Add passing tones between chord tones. Step between them instead of jumping.", why: "Passing tones create melodic flow. They connect chord tones like bridges." },
        { text: "Round 3: Go free. Let your ear guide you. Some notes will clash -- that's OK.", why: "Free improvisation is where you discover your natural melodic instincts." },
        { text: "Record Round 3. Listen back: which moments sounded best? Those are your natural melodic tendencies.", why: "Your best improvised moments reveal your authentic melodic voice." }
      ],
      feel: "Round 1 feels safe. Round 2 feels like you're exploring familiar territory. Round 3 should feel like flying -- exhilarating and slightly scary.",
      wrong: "If Round 3 sounds like noise, you jumped to 'free' too quickly. Spend more time in Round 2. The passing tones prepare your ear for freedom.",
      metronome: 90,
      recorder: true,
      levelUp: "2 minutes of free melodic improv that follows the chord changes and sounds musical."
    },
    {
      id: "v9e3", time: 4, title: "Lyric Freestyle", type: "vocal",
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      what: "Improvise words over a groove. Rhythm and melody take priority over meaning. The freestyle approach Bradley Nowell exemplified: let the mouth make sounds that happen to form words.",
      setup: "Backing track at 85 BPM. Reggae or soul groove.",
      steps: [
        { text: "Start with nonsense syllables that sound like words. 'Sha-na-na, walking down the...'", why: "Don't try to write poetry in real time. Let sounds form words naturally." },
        { text: "Let real words appear. Don't edit. 'Walking down the road and the sky is blue and I don't know why but...'", why: "Stream of consciousness. The rhythm carries you. Some lines will be gold; most will be filler." },
        { text: "Focus on rhythm first, melody second, meaning third. If the rhythm is tight, the words don't need to make sense.", why: "Bradley Nowell, early Bob Marley, and hip-hop freestylers all prioritize rhythmic flow over lyrical content." },
        { text: "Record 2 minutes. Listen back. Circle any phrases that sound like real lyrics.", why: "Freestyle is a song-writing tool. The gems appear in the stream -- you just have to catch them." }
      ],
      feel: "Like talking in your sleep but with a beat. Don't think, don't edit, don't judge. Just let sounds come out in rhythm.",
      wrong: "If you keep stopping to think of the 'right' word, you're editing in real time. Say the wrong word -- it doesn't matter. Flow is everything.",
      metronome: 85,
      recorder: true,
      levelUp: "2 minutes of lyric freestyle with consistent rhythm that contains at least 2-3 usable phrases."
    },
    {
      id: "v9e3b", time: 8, title: "Genre Vocal Colors", type: "vocal",
      what: "Practice vocal delivery in 3 contrasting styles: breathy/intimate (Nick Drake), warm/chest (soul), and raw/edgy (punk). Same melody, same words, three deliveries. This exercise develops the tonal palette you need for genre switching.",
      setup: "Standing. Record yourself. Pick a simple 4-bar melody with words. Backing track ready.",
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" },
        { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }
      ],
      steps: [
        { text: "Pick a simple melody and lyrics -- 4 bars, something you can sing without thinking. Record it straight, no style, just clean.", why: "The neutral version is your baseline. You need to hear the raw melody before you color it." },
        { text: "Style 1: Breathy/intimate (Nick Drake). Close to the mic, lots of air, soft consonants, let phrases trail off. Record it.", why: "Breathy delivery communicates vulnerability and intimacy. The vocal folds stay slightly open, letting air through. Think bedroom recording at 2am." },
        { text: "Style 2: Warm/chest (soul). Full chest voice, round vowels, slight vibrato on sustained notes. Project from the belly. Record it over the Soul Funk Groove.", why: "Soul delivery is about warmth and power. The vocal folds close completely, creating a rich, full tone. Think Marvin Gaye or Bill Withers." },
        { text: "Style 3: Raw/edgy (punk). Short phrases, hard consonants, minimal pitch variation, more speaking than singing. Deliver it with attitude over the Psych Rock track. Record it.", why: "Raw delivery strips away technique and replaces it with energy and conviction. Think early punk or garage rock -- the emotion matters more than the notes." },
        { text: "Listen to all three back to back. Which feels most natural? Which stretches you most? The stretch is where growth lives.", why: "Your natural style is your foundation, but versatility is your superpower. The uncomfortable style is the one to practice most." }
      ],
      feel: "Each style should feel like inhabiting a different character. The breathy version is a secret. The soul version is a declaration. The raw version is a demand. Same words, completely different energy.",
      wrong: "If all three versions sound similar, you're not committing to each style. Exaggerate: make the breathy version barely audible, the soul version huge, the raw version almost shouted. Caricature first, then dial it back.",
      sarah: "The best singer-songwriters can shift vocal color mid-song. A breathy verse into a full-chest chorus into a raw bridge -- that's how you keep a listener's attention for 4 minutes.",
      metronome: 90,
      recorder: true,
      levelUp: "Three recordings of the same melody that are immediately recognizable as different genres by a listener."
    },
    {
      id: "v9e4", time: 4, title: "Genre Switching", type: "vocal",
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      what: "Same progression, 4 vocal styles: reggae, surf-psych, soul croon, punk bark. Switching styles mid-improvisation trains vocal flexibility and keeps your delivery from getting stale.",
      setup: "Backing track at 90 BPM. Am-C-G-D or backing track.",
      steps: [
        { text: "4 bars reggae: offbeat phrasing, slight nasal tone, call and space.", why: "Start with the style you've been training. Reggae is rhythmically precise and spacious." },
        { text: "4 bars surf-psych: straight tone, minimal vibrato, voice as texture.", why: "The switch from rhythmic (reggae) to textural (psych) is a big gear change. Feel the difference." },
        { text: "4 bars soul croon: full voice, vibrato, emotional. Think Khruangbin's vocal moments.", why: "Soul is the most conventionally 'singer-y' style. It requires the most vocal technique." },
        { text: "4 bars punk bark: short, aggressive, rhythmic. More speaking than singing.", why: "Punk is the opposite of soul -- minimal technique, maximum energy. The contrast exercises your range of delivery." }
      ],
      feel: "Each style switch should feel like putting on a different costume. Same you underneath, different presentation on top.",
      wrong: "If all four styles sound the same, you're not committing to each one. Exaggerate the differences. Caricature first, refine later.",
      metronome: 90,
      recorder: true,
      levelUp: "Clean style switch every 4 bars, with each style recognizably different."
    },
    {
      id: "v9e5", time: 3, title: "Loop Improv: Voice Only", type: "vocal",
      what: "RC-505: record a vocal loop, then improvise over it live. No instruments. Your voice provides both the foundation and the solo. This is the purest form of vocal looper performance.",
      setup: "RC-505mkII. Mic only. 80 BPM. No guitar.",
      steps: [
        { text: "Record a 4-bar vocal loop on Track 1: a simple melodic phrase or rhythmic pattern.", why: "This is your backing track, made from your voice. It needs to be clean and repeatable." },
        { text: "While it loops, improvise freely over it. Different melody, scat, harmony -- anything.", why: "Improvising over your own voice is the intersection of every skill from this curriculum." },
        { text: "Record a second loop on Track 2 if something good emerges. Now you have two layers + live.", why: "Building layers from improvisation is how Bon Iver and Imogen Heap perform." },
        { text: "Practice clearing Track 2 and re-recording. The improvisation is live, fluid, always changing.", why: "In performance, layers come and go. The ability to clear and rebuild is essential." }
      ],
      feel: "Like having a musical conversation with yourself. Your loop says something, and you respond. Then maybe you loop the response and respond to that.",
      wrong: "If the loop is too complex, there's no space for improvisation. Keep the loop simple -- it's the canvas, not the painting.",
      metronome: 80,
      levelUp: "Build a 2-layer vocal loop arrangement through improvisation, with a live third voice on top."
    }
  ]
};
