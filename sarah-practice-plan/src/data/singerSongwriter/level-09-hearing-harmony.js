import { getPitchRange } from "../appData.js";

export const level9 = {
  level: 9,
  title: "Hearing Harmony",
  subtitle: "Your ears lead. Your voice follows.",
  description:
    "Move beyond the pentatonic into full diatonic melody — all 7 notes of the major and minor scales. Learn to hear intervals, feel chord functions (tension vs resolution), and navigate harmonic changes by ear. Based on Gordon's audiation stages: you'll learn to hear harmony in your inner ear before singing it. This level transforms you from a pentatonic improviser into a harmonic navigator.",
  artists: "Khruangbin, BALTHVS, Hermanos Gutierrez, Nick Drake",
  unlocks: "Originals & Genre Craft (Level 10)",
  review: { label: "Level 8-9 Check-In", time: 5, exercises: ["ss-8-5", "ss-9-7"], prompt: "Do 2 minutes of free pentatonic improv (ss-8-5). Then play through your complete original song (ss-9-7). Both confident? Move on." },
  exercises: [
    {
      id: "ss-9-1",
      time: 6,
      title: "Interval Feeling",
      type: "vocal",
      drone: { root: "A", octave: 2, texture: "pure", mode: "single" },
      what: "Sing the basic intervals and associate each with an emotional quality. Minor 2nd = tension. Major 3rd = brightness. Perfect 5th = strength. Perfect 4th = openness. Each interval has a 'personality' — learning to feel them is how you navigate harmony by instinct.",
      steps: [
        { text: "Sing A, then B (major 2nd — a step up). Then A to C (minor 3rd — sad). Then A to C# (major 3rd — happy). Notice how each interval FEELS different.", why: "Intervals are the atoms of melody. Every melodic movement is an interval. Hearing them emotionally makes them intuitive." },
        { text: "Sing A to D (perfect 4th — open, floating). Then A to E (perfect 5th — strong, grounded). These are the anchor intervals of harmony.", why: "The 4th and 5th define the harmonic framework. They're the most consonant intervals after the octave." },
        { text: "Sing A to F (minor 6th — bittersweet). Then A to G (minor 7th — bluesy, wanting to resolve). These add color and tension.", why: "The 6th and 7th are the 'color' intervals — they add emotional complexity beyond the simple consonances." },
        { text: "Close your eyes. Play a random note on the guitar. Sing an interval above it — any interval you choose. Name it. Can you hear the interval before you sing it?", why: "Identifying intervals by ear (audiation) is the foundational skill of harmonic navigation. It takes time — be patient." }
      ],
      feel: "Each interval should carry a distinct emotional weight. When you can hear the difference between a 3rd and a 5th without thinking, your ear is developing true harmonic awareness.",
      wrong: "If all intervals sound the same, don't worry — this is a new skill. Use the guitar as a reference: play the interval on the strings, then match it with your voice. Ear training is gradual.",
      sarah: "Gene, interval recognition is what separates 'playing by ear' from 'guessing by ear.' Every great improviser hears intervals instinctively. This exercise builds that hearing.",
      metronome: 60,
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "C#4", "D4", "E4", "F4", "G4", "A4"], label: "Intervals from A", range: ["A3", "A4"] },
      recorder: true
    },
    {
      id: "ss-9-2",
      time: 6,
      title: "Major vs Minor Feeling",
      type: "vocal",
      what: "Sing over a G major chord, then switch to G minor. Feel how the mood shifts from bright to dark. Then strum Am → A major. The single note that changes (C to C#) transforms the entire emotional landscape. Train your ear to hear and feel this fundamental color shift.",
      steps: [
        { text: "Strum G major. Sing the chord tones: G-B-D. Notice the brightness — the major 3rd (B) creates warmth and optimism.", why: "The major 3rd is the 'happy' note. It's one semitone higher than the minor 3rd, and that single semitone changes everything." },
        { text: "Now strum Gm (3-5-3-3-3-3): move your index to 3rd fret on the B string, giving you Bb instead of B. Sing G-Bb-D. Feel the shift — melancholy, depth, introspection.", why: "The minor 3rd is one semitone lower. That tiny change rewrites the entire emotional character. This is the power of harmony." },
        { text: "Strum Am. Sing A-C-E. Then switch to A major. Sing A-C#-E. The C→C# shift is the same major/minor toggle.", why: "Hearing the same root chord in major and minor trains your ear to the single most important harmonic distinction in all of Western music." },
        { text: "Play a random chord. Without looking at your fretting hand, can you hear whether it's major or minor? Test yourself 10 times.", why: "Major/minor recognition is the first ear-training milestone. When you can hear it instantly, you're ready for more complex harmonic listening." }
      ],
      feel: "Major should feel like sunshine; minor like twilight. When you can feel the color shift before you even analyze it, your harmonic ear is alive.",
      wrong: "If major and minor sound the same, focus on the 3rd of the chord. Play just the root and the 3rd — hear the gap narrow (major to minor). That tiny change is the whole story.",
      sarah: "Gene, your playlists lean minor — Am is your home chord. But understanding major/minor lets you use both intentionally. Some of your best songs will toggle between them.",
      metronome: 80,
      referencePitches: getPitchRange("G3", "D4"),
      recorder: true
    },
    {
      id: "ss-9-3",
      time: 8,
      title: "Chord Function: Tension & Resolution",
      type: "song",
      drone: { mode: "cycle", progression: ["G", "C", "D", "G"], bpm: 80, stepDuration: "2m" },
      what: "Learn to feel harmonic tension (the V chord wants to resolve) and resolution (the I chord is home). Play G-C-D-G and sing long notes on each chord. The D chord feels unresolved. The G chord feels like arrival. This sensation is the foundation of all harmonic movement.",
      steps: [
        { text: "Strum G for 8 beats. Sing the root G. This is HOME — the tonic. Everything resolves here.", why: "The I chord is the reference point of all harmony. Every other chord is defined by its relationship to I." },
        { text: "Strum D for 8 beats. Sing the root D. Feel the tension — this chord wants to MOVE. It's pulling toward G.", why: "The V chord is the most tension-filled chord in any key. It creates harmonic gravity toward I. The pull is almost physical." },
        { text: "Now play D → G. Sing D... then G. Feel the resolution — the tension releases. This V→I movement is the most powerful cadence in music.", why: "V→I is the harmonic equivalent of exhaling. Every classical, pop, rock, and folk song uses it. You're feeling the engine of harmony." },
        { text: "Play the full progression: G(I) → C(IV) → D(V) → G(I). Sing root notes. Feel the journey: home → departure → tension → resolution.", why: "I-IV-V-I is the harmonic road trip. Departure (IV) feels like stepping outside. Tension (V) feels like wanting to return. Resolution (I) is coming home." },
        { text: "Improvise a melody over G-C-D-G. Notice how your melody naturally wants to resolve when the D chord arrives. Follow that instinct.", why: "Your ear already knows harmonic function — it just needs permission to follow its instincts. The pull toward resolution is built into the physics of sound." }
      ],
      feel: "Harmonic tension and resolution should feel like a physical experience — the V chord leans forward, the I chord settles back. When you feel this, you're hearing harmony, not just chords.",
      wrong: "If all chords feel the same, sustain the V chord for a long time. Let the tension build. Then play I. The relief is the resolution. If you don't feel it, try playing V seven times then I once.",
      sarah: "Gene, every song you love has this tension-resolution engine. Now you can feel it while playing. This changes how you write — you'll use tension and resolution intentionally.",
      metronome: 80,
      referencePitches: getPitchRange("G3", "D4"),
      pianoKeys: { notes: ["G3", "B3", "D4"], label: "G Major (I - Home)", range: ["G3", "D4"] },
      recorder: true
    },
    {
      id: "ss-9-4",
      time: 6,
      title: "Relative Minor Discovery",
      type: "vocal",
      what: "Every major key has a relative minor that shares all the same notes but starts from a different root. G major → E minor. C major → A minor. Play G-Em-C-Am and hear how major and minor are two sides of the same coin. This doubles your harmonic vocabulary instantly.",
      steps: [
        { text: "Play G-Em-C-D. Then play Em-G-C-D. Same chords, different starting point. The first sounds 'happy-journey.' The second sounds 'melancholy-journey.'", why: "Relative major and minor share every note. The emotional difference comes entirely from which chord feels like 'home.' Starting on Em makes minor the center of gravity." },
        { text: "Strum G and sing a major-feeling melody (using B natural, the major 3rd). Then strum Em and sing a minor-feeling melody (using G natural, the minor 3rd of Em).", why: "Your melody tells the listener which mode you're in. The guitar chords are ambiguous — it's the vocal melody that declares 'this is major' or 'this is minor.'" },
        { text: "Try a song that starts in minor (Em verse) and shifts to major (G chorus). Same notes, different emotional center. The chorus 'lifts' by shifting the tonal center.", why: "Minor-verse, major-chorus is one of the most powerful structural tools. The major chorus feels like emotional arrival." },
        { text: "Record a piece that alternates between minor and major feeling. This contrast is more sophisticated than anything in Levels 1-9.", why: "Controlling major/minor feeling with the same chord set is advanced harmonic awareness. You're composing with emotional color now." }
      ],
      feel: "Switching between relative major and minor should feel like changing the lighting in a room — same space, totally different mood. When you control the mood shift, you control the listener's emotions.",
      wrong: "If you can't hear the difference between major and minor center, listen for which chord feels like 'home.' If G feels like resolution, you're in major. If Em feels like resolution, you're in minor.",
      sarah: "Gene, your favorite songs toggle between major and minor feeling constantly. Khruangbin's 'Maria También' lives in this ambiguity. Now you can use it too.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "G4"),
      recorder: true
    },
    {
      id: "ss-9-5",
      time: 8,
      title: "Modal Colors",
      type: "song",
      drone: { root: "A", octave: 2, texture: "tanpura", mode: "single" },
      what: "Beyond major and minor, modes give you 5 more emotional colors. Dorian = jazzy minor. Mixolydian = bluesy major. Phrygian = Spanish/dark. Play the same root chord but change the scale, and the entire mood transforms. Modes are the advanced color palette of melody.",
      steps: [
        { text: "Play Am and sing A natural minor: A-B-C-D-E-F-G. This is the standard minor sound. Melancholic, familiar.", why: "Natural minor is your reference point. Every mode is defined by how it differs from natural minor or major." },
        { text: "Now sing A Dorian: A-B-C-D-E-F#-G. The ONLY change is F→F#. But that raised 6th makes it jazzy, sophisticated. Play over Am.", why: "Dorian is minor with a bright spot. The raised 6th adds warmth to the melancholy. Khruangbin, Steely Dan, Carlos Santana live here." },
        { text: "Try G Mixolydian: G-A-B-C-D-E-F. Major scale with a lowered 7th. Bluesy, rootsy, laid-back. Play over G.", why: "Mixolydian is the sound of classic rock, blues, and folk. The flat 7 adds earthiness. Think Grateful Dead, Allman Brothers." },
        { text: "Improvise 2 minutes in Dorian over Am, then 2 minutes in Mixolydian over G. Each mode colors your improvisation differently. Record both.", why: "Modes expand your melodic palette beyond pentatonic. Each mode gives you a new emotional toolkit for songwriting." }
      ],
      feel: "Each mode should feel like a different season — same landscape, different light. Dorian is autumn (warm melancholy). Mixolydian is late summer (bright but fading).",
      wrong: "If the modes all sound the same as natural minor or major, focus on the ONE note that's different. In Dorian, it's the raised 6th. Emphasize that note — play it loud and often — until you hear the color shift.",
      sarah: "Gene, modes are the advanced toolkit. You don't need them for every song — but when you want a specific mood that major/minor can't capture, modes are the answer.",
      metronome: 80,
      fretboard: { scale: "a-dorian", position: 1 },
      referencePitches: getPitchRange("A3", "G4"),
      recorder: true
    },
    {
      id: "ss-9-6",
      time: 7,
      title: "Nashville Numbers",
      type: "song",
      what: "Learn to think in chord NUMBERS not names. Am-C-G-Em in Am = i-III-VII-v. In G major: G-C-D-Em = I-IV-V-vi. Numbers let you transpose instantly. Play a progression, sing the numbers, feel the function. Nashville number system is how professional musicians communicate harmony.",
      steps: [
        { text: "Play Am-C-G-Em. Say the numbers out loud as you strum: 'one... three... seven... five' (i-III-VII-v in A minor). Don't think of chord names — think of positions in the key.", why: "Nashville numbers abstract harmony away from specific keys. Once you think in numbers, you can play any song in any key instantly. Professional session musicians sight-read entire sessions this way." },
        { text: "Now play in G major: G-C-D-Em. Say 'one... four... five... six' (I-IV-V-vi). Notice that V (D) is the tension chord and I (G) is home — the NUMBER tells you the function.", why: "Chord function is encoded in the number. I is always home, V is always tension, IV is always departure. The number IS the feeling." },
        { text: "Transpose Am-C-G-Em to a new key using numbers. In D minor the same i-III-VII-v is Dm-F-C-Am. Play it. Same emotional shape, different key.", why: "This is the power of numbers — instant transposition. If a song is too high for your voice, move it to a new key by converting to numbers first." },
        { text: "Pick a song you know. Write out the chords as numbers. Then play it in a different key using only the numbers. Record both versions.", why: "When you can think in numbers fluently, you've unlocked the universal language of harmony. Every key becomes accessible." }
      ],
      feel: "Numbers should start replacing chord names in your head. When someone says 'go to the four chord,' you should feel the departure energy before your fingers even move.",
      wrong: "If you keep thinking in chord names, slow down. Say the numbers out loud every time you change chords. It takes repetition to rewire your brain from names to functions.",
      sarah: "Gene, Nashville numbers are the shortcut every pro uses. When you jam with other musicians, numbers are how you communicate. This skill makes you fluent in the universal language of harmony.",
      pianoKeys: { notes: ["A3", "C4", "E3", "G3"], label: "Nashville Roots", range: ["E3", "C4"] },
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-9-7",
      time: 8,
      title: "Emotional Mapping: Borrowed Chords",
      type: "song",
      drone: { root: "G", octave: 2, texture: "warm", mode: "single" },
      what: "In the key of G major, play G then Ab (bVI). Feel the 'cinematic longing' — the chord doesn't belong to the key but creates an emotional effect nothing else can. Then try G to Bb (bVII) — 'triumphant departure.' Then iv (Cm in G major) — borrowed from the parallel minor, creates nostalgia. These are the 'color chords' that make songs emotionally rich.",
      steps: [
        { text: "Play G major for 4 bars, then Ab major (4-6-6-5-4-4). Let the Ab ring. Feel the sudden shift — cinematic, wistful, like a scene change in a film. This is the bVI chord, borrowed from G minor.", why: "The bVI is the most emotionally powerful borrowed chord. Hermanos Gutiérrez use it constantly — it creates instant cinematic weight. It works because it shares no notes with the I chord, creating maximum contrast." },
        { text: "Now play G to Bb major (x-1-3-3-3-1). Feel the 'triumphant departure' — bVII has a rising, anthemic quality. Think of it as the chord that says 'we're going somewhere bigger.'", why: "The bVII is borrowed from Mixolydian/parallel minor. It's the sound of classic rock anthems and surf-rock climaxes. It lifts without the tension of the V chord." },
        { text: "Play G to Cm (x-3-5-5-4-3). This is the iv chord — minor four, borrowed from the parallel minor. Feel the nostalgia, the bittersweet quality. It's the 'golden hour' chord.", why: "The iv chord replaces the normal IV (C major) with its minor version. That single note change (E to Eb) transforms brightness into wistfulness. Radiohead, Elliott Smith, and countless others use this." },
        { text: "Build a progression using borrowed chords: G - Em - Cm - G, or G - Ab - Bb - G. Record it. These chords create emotional depth that standard diatonic harmony can't reach.", why: "Borrowed chords are your emotional special effects. Use them sparingly and they hit hard. Use them too much and the song loses its tonal center." }
      ],
      feel: "Each borrowed chord should hit like an unexpected emotion — a pang of nostalgia, a swell of cinematic wonder. They work because they break the rules of the key, and your ear notices.",
      wrong: "If the borrowed chords just sound 'wrong,' you haven't established the key firmly enough. Play I-IV-V-I several times first to set up G major as home. Then introduce the borrowed chord — the contrast is what creates the effect.",
      sarah: "Gene, borrowed chords are the secret sauce of your favorite artists. Hermanos Gutiérrez's entire sound is built on bVI. Once you hear it, you'll hear it everywhere — and you'll start using it in your own songs.",
      referencePitches: getPitchRange("G3", "D4"),
      pianoKeys: { notes: ["G3", "Ab3", "Bb3", "B3", "C4", "D4"], label: "G + Borrowed Chords", range: ["G3", "D4"] },
      recorder: true
    },
    {
      id: "ss-9-8",
      time: 7,
      title: "Harmonic Rhythm as Architecture",
      type: "song",
      what: "Same Am-C-G-Em progression, three treatments: (1) chord changes every 2 bars — spacious, contemplative, verse energy; (2) every bar — standard movement; (3) every 2 beats — urgent, climactic, chorus/bridge energy. Harmonic rhythm creates section contrast without changing a single chord.",
      steps: [
        { text: "Play Am-C-G-Em with each chord lasting 2 BARS (8 beats). Sing over it. Feel the spaciousness — each chord has room to breathe. This is verse energy, contemplative and unhurried.", why: "Slow harmonic rhythm creates space for lyrics and vocal melody to be the focus. Most great verses use slow harmonic rhythm — the chords are scenery, not the story." },
        { text: "Now play the same progression with each chord lasting 1 bar (4 beats). Standard pop/rock pacing. Feel how the energy increases — there's more forward motion, more harmonic activity.", why: "One chord per bar is the default harmonic rhythm of pop and rock. It balances motion with stability. Most choruses and standard sections live here." },
        { text: "Now play each chord for only 2 beats. The chords fly by — urgent, driving, climactic. This is bridge or pre-chorus energy, building toward something.", why: "Fast harmonic rhythm creates urgency and excitement. It's the musical equivalent of a quickening heartbeat. Use it for climactic moments." },
        { text: "Build a mini-song using all three speeds: verse (2 bars per chord), chorus (1 bar), bridge (2 beats). Same chords, three different energies. Record it.", why: "Harmonic rhythm is one of the most powerful and least understood songwriting tools. Changing chord speed creates section contrast more effectively than changing the chords themselves." }
      ],
      feel: "The slowest version should feel like a calm ocean. The fastest should feel like waves crashing. Same water, different energy — that's harmonic rhythm.",
      wrong: "If all three speeds feel the same, exaggerate the differences. Make the slow version REALLY slow (4 bars per chord). Make the fast version REALLY fast (1 beat per chord). The contrast will become obvious.",
      sarah: "Gene, harmonic rhythm is the hidden architecture of songs. When a chorus feels bigger than a verse but uses the same chords, harmonic rhythm is usually why. This is a pro-level tool.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-9-9",
      time: 6,
      title: "Singing the Bass Line",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "C", "G", "Em"], bpm: 80 },
      what: "Sing ONLY the bass note (lowest root) of each chord as the progression moves. Am(A2)→C(C3)→G(G2)→Em(E2). Feel how bass motion creates forward drive. Then try singing the bass while strumming — this is what bass players hear.",
      steps: [
        { text: "Strum Am-C-G-Em slowly. Sing only the root of each chord in your lowest comfortable register: A... C... G... E. Hold each note for the full chord duration.", why: "The bass line is the harmonic foundation. When you sing the bass, you hear how root motion drives the progression forward. The jump from A down to G, then to E — that descending motion creates momentum." },
        { text: "Notice the intervals between bass notes: A to C is a minor 3rd up. C to G is a 4th down. G to E is a minor 3rd down. These intervals define the harmonic rhythm of the bass.", why: "Bass motion by 3rds and 4ths is the most common in Western music. Hearing these intervals in the bass trains your ear to the deepest layer of harmony." },
        { text: "Now try singing the bass while strumming the full chords above. Your voice is the bass, your guitar is the harmony. Two layers from one person.", why: "Singing the bass while strumming is the ultimate dual-task for harmonic awareness. It forces your ear to track the lowest voice independently — exactly what arrangers and producers do." },
        { text: "Try an alternate bass pattern: instead of roots, sing A-G-B-E (root of Am, 5th of C, 3rd of G, root of Em). Non-root bass notes create smoother, more interesting bass lines.", why: "Professional bass lines don't always play the root. Singing inversions and non-root bass notes reveals how voice leading works at the foundation of harmony." }
      ],
      feel: "The bass line should feel like the ground under your feet — steady, directional, pulling the whole progression forward. When you hear the bass, you hear the skeleton of the song.",
      wrong: "If singing this low feels uncomfortable, transpose up an octave. The point is hearing bass motion, not straining your range. A2 is low for most tenors — E3-C4 works fine.",
      sarah: "Gene, hearing bass motion is what separates people who play chords from people who understand harmony. Bass players hear this all the time. Now you will too.",
      referencePitches: getPitchRange("E2", "C3"),
      recorder: true
    },
    {
      id: "ss-9-10",
      time: 7,
      title: "Chord Tone Targeting Through Changes",
      type: "vocal",
      what: "Sing ONLY the 3rd of each chord through a progression: C over Am, E over C, B over G, G over Em. Watch how the 3rd moves smoothly between chords — often by step. Then sing only 5ths. These smooth lines through chord changes are the secret architecture of great melodies.",
      steps: [
        { text: "Play Am-C-G-Em. Sing only the 3rd of each chord: C(3rd of Am)... E(3rd of C)... B(3rd of G)... G(3rd of Em). Hold each note for the full chord.", why: "The 3rds trace a smooth ascending line: C-E-B-G. This hidden melody through the chord changes is called a 'guide tone line.' Great melodies often follow these lines without the songwriter knowing it." },
        { text: "Now sing only the 5th of each chord: E(5th of Am)... G(5th of C)... D(5th of G)... B(5th of Em). Another smooth line through the changes.", why: "The 5ths create a different guide tone line. Each chord tone (root, 3rd, 5th) traces its own path through the progression. These paths are the scaffolding melodies hang on." },
        { text: "Alternate: sing the 3rd on Am, the 5th on C, the 3rd on G, the root on Em. Mix and match chord tones. Every combination creates a different melodic contour.", why: "When you can freely choose which chord tone to target on each chord, you can sculpt melodies with precision. This is how jazz musicians and skilled songwriters navigate harmony." },
        { text: "Improvise a melody over Am-C-G-Em, but make sure you land on a chord tone (root, 3rd, or 5th) on beat 1 of each chord change. Between chord tones, anything goes. Record it.", why: "Landing on chord tones at structural moments is the secret of melodies that 'fit' the harmony. The approach notes between can be chromatic, scalar, anything — the landing points anchor the melody to the chords." }
      ],
      feel: "You should start hearing the invisible lines connecting chord tones across changes. When a melody feels 'right' over a progression, it's because it's following these hidden paths.",
      wrong: "If you can't hear the 3rd or 5th of a chord, play the chord and sing up from the root: root-3rd-5th. Arpeggiate it. Then isolate just the 3rd. It takes practice to hear chord tones independently.",
      sarah: "Gene, chord tone targeting is what makes the difference between melodies that wander and melodies that tell a story. Your voice will start finding these paths naturally once you've practiced hearing them.",
      pitchContour: true,
      referencePitches: getPitchRange("G3", "E4"),
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-9-11",
      time: 6,
      title: "The Deceptive Cadence",
      type: "song",
      drone: { root: "G", octave: 2, texture: "pure", mode: "single" },
      what: "Set up V→I (D→G) resolution. Play it 3 times to set the expectation. Then on the 4th time: V→vi (D→Em). The 'surprise landing' that pulls the ground out — the chord SHOULD resolve to G but lands on Em instead. Feel how it creates emotional depth, delayed satisfaction.",
      steps: [
        { text: "Play D→G three times. Sing the resolution each time: D... G. Feel how satisfying V→I is. Your ear expects it. Your body relaxes into it.", why: "Setting up the expectation is essential. The deceptive cadence only works because V→I is so deeply ingrained. You need to feel the 'normal' resolution before you can feel the surprise." },
        { text: "On the 4th time, play D→Em instead. Sing D... then Em. Feel the surprise — your ear expected G but got Em. It's not wrong, it's unexpected. The emotion is bittersweet, like a story that doesn't end where you thought.", why: "The deceptive cadence (V→vi) is one of music's most powerful emotional tools. Em shares two notes with G (G and B), so it's close enough to feel related but different enough to surprise." },
        { text: "Build a 4-bar phrase: G-C-D-Em. The first three chords set up a standard I-IV-V, but instead of resolving to I, you land on vi. Try singing a melody that follows the surprise.", why: "Using the deceptive cadence in a progression creates a moment of 'not yet' — the resolution is delayed, and the listener leans forward wanting more. It's the harmonic equivalent of a cliffhanger." },
        { text: "Find a deceptive cadence in a song you love. It's everywhere — Beatles, Radiohead, even reggae. Once you hear it, you can't unhear it. Record yourself playing a progression that uses it.", why: "Recognizing the deceptive cadence in real music proves your ear is developing. It's a hallmark of sophisticated songwriting that you can now use intentionally." }
      ],
      feel: "The deceptive cadence should feel like reaching for a doorknob and finding the door slightly further away than expected. Not wrong — just surprising. That surprise is pure emotional power.",
      wrong: "If D→Em doesn't feel surprising, you haven't set up the expectation strongly enough. Play D→G five or six times first. Really let your ear settle into the expected resolution. Then the deception will land.",
      sarah: "Gene, the deceptive cadence is everywhere in the music you love. It's the moment in a song where you think it's going to resolve and it goes somewhere more interesting instead. Now you can write those moments.",
      pianoKeys: { notes: ["D3", "E3", "G3", "B3"], label: "Deceptive Cadence", range: ["D3", "B3"] },
      recorder: true
    },
    {
      id: "ss-9-12",
      time: 7,
      title: "Dark Modal Colors",
      type: "song",
      fretboard: { scale: "e-phrygian", position: 1 },
      drone: { root: "E", octave: 2, texture: "tanpura", mode: "single" },
      what: "Explore Phrygian mode (E-F-G-A-B-C-D) for dark/Spanish/cinematic feel. Play Em with F major as the bII chord. Then try harmonic minor (Am with G# leading tone) for tension. Two more colors for the palette. Hermanos Gutiérrez and Tinariwen use these constantly.",
      steps: [
        { text: "Play Em, then F major (1-3-3-2-1-1). Let the F ring. That half-step movement E→F is the sound of Phrygian — dark, exotic, ancient. Strum Em-F-Em-F and sing over it.", why: "The bII chord (F major in E) is the signature sound of Phrygian mode. That half-step root motion creates a gravity and darkness that no other mode has. It's the sound of flamenco, desert blues, and cinematic tension." },
        { text: "Improvise over the Em drone using E Phrygian: E-F-G-A-B-C-D. Emphasize the F (the flat 2nd) — that's the note that makes Phrygian dark. Lean into it. Let it clash slightly against the Em drone.", why: "The b2 is what distinguishes Phrygian from natural minor. It's the note that creates the 'exotic' or 'dark' quality. Tinariwen's desert blues guitar lines emphasize this note constantly." },
        { text: "Now try A harmonic minor: A-B-C-D-E-F-G#. Play Am, then E major (not Em — the G# makes it major). That G#→A leading tone creates intense pull toward resolution.", why: "Harmonic minor adds a raised 7th to natural minor, creating a strong V chord (E major in Am). The augmented 2nd gap (F to G#) gives it a Middle Eastern/Spanish flavor." },
        { text: "Build a dark progression: Em-F-Am-Em (Phrygian), or Am-Dm-E-Am (harmonic minor). Record an improvisation over each. These are powerful songwriting colors.", why: "Phrygian and harmonic minor are the advanced dark modes. They go beyond standard minor into territory that evokes specific cultural and emotional landscapes." }
      ],
      feel: "Phrygian should feel like a desert at night — vast, dark, ancient. Harmonic minor should feel like a knife's edge — tense, dramatic, pulling toward resolution. Both are intensely emotional.",
      wrong: "If Phrygian just sounds 'wrong,' make sure you're emphasizing the F note, not avoiding it. The b2 IS the mode. Play it loud and often until your ear accepts it as a color, not a mistake.",
      sarah: "Gene, Phrygian and harmonic minor are the sounds of Hermanos Gutiérrez, Tinariwen, and the cinematic desert-blues world you love. These modes are your advanced palette for dark, evocative songwriting.",
      referencePitches: getPitchRange("E3", "E4"),
      recorder: true
    },
    {
      id: "ss-9-13",
      time: 8,
      title: "Sing Over New Progressions",
      type: "song",
      drone: { mode: "cycle", preset: "coastal-soul" },
      what: "Improvise melody over chord progressions you've NEVER played before. A friend picks chords, or use a random progression generator. The goal: navigate ANY harmony by ear, using intervals and chord tones. No preparation, no pentatonic safety net — just your ears.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Try a new progression: Dm-G-C-Am. Strum it. Improvise a melody. Don't think about scales — listen for which notes 'want' to happen over each chord.", why: "Unfamiliar progressions force your ear to lead. You can't rely on memorized patterns — you must hear the harmony in real time." },
        { text: "If you hit a note that clashes, hold it — then move UP or DOWN by a half step. The resolution sounds intentional, like jazz.", why: "Moving a half step from a 'wrong' note always lands on a 'right' note. This is the universal escape hatch of improvisation." },
        { text: "Try another new progression: C-Am-F-G. Different feel, different chord functions. Improvise melody. Trust your ears.", why: "Each new progression strengthens your harmonic navigation. By the 3rd or 4th unfamiliar progression, your ear becomes noticeably faster." },
        { text: "Record your best improvisation. Listen back. Your ear is leading your voice through harmony you've never rehearsed. That's musicianship.", why: "The ability to sing over new chords without preparation is the definition of a mature musical ear." }
      ],
      feel: "Navigating new harmony should feel like exploring a new city — unfamiliar but exciting. Your ear is the map. When you start making confident choices over unknown chords, you're genuinely hearing harmony.",
      wrong: "If every note sounds wrong, you're overthinking. Simplify: sing just the root of each chord as it passes. Then add chord tones. Build from safe notes outward.",
      sarah: "Gene, this is the skill that lets you jam with anyone, play any song, and write over any chord progression. Your ear is becoming your most reliable instrument.",
      metronome: 85,
      referencePitches: getPitchRange("C3", "A4"),
      recorder: true,
      levelUp: "Can hear and sing intervals, feel major/minor/modal colors, navigate tension-resolution, think in Nashville numbers for instant transposition, use borrowed chords (bVI, bVII, iv) for emotional color, control harmonic rhythm as a structural tool, hear bass motion as harmonic drive, target chord tones through changes, create surprise with deceptive cadences, access dark modal colors, and improvise melodies over unfamiliar chord progressions by ear."
    }
  ]
};
