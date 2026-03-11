import { getPitchRange } from "../appData.js";

export const level10 = {
  level: 10,
  title: "Hearing Harmony",
  subtitle: "Your ears lead. Your voice follows.",
  description:
    "Move beyond the pentatonic into full diatonic melody — all 7 notes of the major and minor scales. Learn to hear intervals, feel chord functions (tension vs resolution), and navigate harmonic changes by ear. Based on Gordon's audiation stages: you'll learn to hear harmony in your inner ear before singing it. This level transforms you from a pentatonic improviser into a harmonic navigator.",
  artists: "Khruangbin, BALTHVS, Hermanos Gutierrez, Nick Drake",
  unlocks: "Song Architecture (Level 11)",
  review: { label: "Level 8-9 Check-In", time: 5, exercises: ["ss-8-5", "ss-9-7"], prompt: "Do 2 minutes of free pentatonic improv (ss-8-5). Then play through your complete original song (ss-9-7). Both confident? Move on." },
  exercises: [
    {
      id: "ss-10-1",
      time: 6,
      title: "Interval Feeling",
      type: "vocal",
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
      id: "ss-10-2",
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
      id: "ss-10-3",
      time: 8,
      title: "Chord Function: Tension & Resolution",
      type: "song",
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
      id: "ss-10-4",
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
      id: "ss-10-5",
      time: 8,
      title: "Modal Colors",
      type: "song",
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
      id: "ss-10-6",
      time: 8,
      title: "Sing Over New Progressions",
      type: "song",
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
      levelUp: "Can hear and sing intervals, feel major/minor/modal colors, navigate tension-resolution, and improvise melodies over unfamiliar chord progressions by ear."
    }
  ]
};
