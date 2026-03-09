export const level7 = {
  level: 7,
  title: "Soul & Extended Chords",
  subtitle: "The sophisticated voicings that make BALTHVS and Skinshape sound effortlessly cool.",
  description:
    "Dorian mode, major 7ths, dominant 9ths, minor 9ths and 11ths — the chords that separate good from great. This level teaches the harmonic vocabulary of soul, neo-soul, and indie-funk guitar. Ghost notes from Level 4 meet extended harmony for the deepest grooves yet.",
  artists: "BALTHVS, Skinshape, Khruangbin, D'Angelo, Erykah Badu",
  unlocks: "Cinematic Guitar (Level 8)",
  review: { label: "Level 5 Check-In", time: 5, exercises: ["gs-5-1", "gs-6-3"], prompt: "Play three-note Khruangbin voicings with soft attack and 40% silence (gs-5-1). Then play a cinematic tremolo passage with slow chord movement (gs-6-3). Space and atmosphere should feel natural — if they don't, revisit Levels 5-6." },
  exercises: [
    {
      id: "gs-7-1",
      time: 10,
      title: "Dorian Mode — The Soul Scale",
      type: "guitar",
      referencePitches: ["A2", "B2", "C3", "D3", "E3", "F♯3", "G3", "A3"],
      fretboard: { scale: "a-dorian", position: 1 },
      what: "Learn A Dorian: A-B-C-D-E-F#-G. It's a minor scale with a raised 6th — the F# instead of F is what separates it from natural minor. Dorian adds warmth without darkness. This is the scale of soul, funk, and Khruangbin's melodic vocabulary.",
      steps: [
        { text: "Play A natural minor: A-B-C-D-E-F-G. Then A Dorian: A-B-C-D-E-F#-G. The only difference is F# instead of F. Play them back to back at 60 BPM, ascending and descending.", why: "The raised 6th (F#) is what separates Dorian from natural minor. It makes minor feel hopeful instead of sad — warm instead of cold. One note changes the entire emotional landscape." },
        { text: "Compare Dorian to pentatonic. A minor pentatonic is A-C-D-E-G. A Dorian is pentatonic plus B and F#. Play pentatonic, then add the B and F# — hear how two extra notes open up melodic possibilities.", why: "Thinking of Dorian as 'pentatonic plus two notes' makes it less intimidating. You already know five of the seven notes. The B adds movement; the F# adds warmth." },
        { text: "Improvise with A Dorian over an Am chord. Emphasize the F# — land on it, hold it, resolve from it to E or G. The F# is your Dorian fingerprint.", why: "If you're not using the F# intentionally, you're just playing minor. Learning to feature it is the key to the Dorian sound — it's what makes soul guitar sound sophisticated." },
        { text: "Play a simple Dorian melody that sounds like a Khruangbin bass line: repetitive, groove-oriented, 4-5 notes with the F# as a recurring color. Loop it for 2 minutes.", why: "Khruangbin's Mark Speer uses Dorian constantly. His melodies are simple and repetitive — the F# provides just enough harmonic interest to keep them compelling." }
      ],
      feel: "Dorian should feel warm, groovy, and slightly jazzy. It's minor without the melancholy — like a sunset instead of a rainy day. The F# is the warmth.",
      wrong: "If it sounds identical to minor pentatonic, you're not using the B and F# enough. If it sounds jazzy in a confusing way, simplify your phrases and focus on groove over complexity.",
      sarah: "Dorian is the Goldilocks scale — it's minor enough to have depth, but warm enough to make people move. It's the reason soul music feels the way it does.",
      metronome: 60,
      levelUp: "You can play A Dorian ascending and descending at 60 BPM, and you can improvise phrases where the F# sounds intentional, not accidental."
    },
    {
      id: "gs-7-2",
      time: 10,
      title: "Major 7th Voicings",
      type: "guitar",
      what: "Learn Cmaj7 and Fmaj7 — the dreamy, sophisticated chords that define soul and neo-soul guitar. Cmaj7 = C-E-G-B. Fmaj7 = F-A-C-E. These chords float where regular major chords land.",
      steps: [
        { text: "Play Cmaj7: x32000. That's A string 3rd fret (C), D string 2nd fret (E), open G (G), open B (B), open E (E). Compare to regular C (x32010) — the open B replaces the fretted C on the B string. Hear the difference? The 7th (B) adds a floating, unresolved quality.", why: "Major 7th chords are 'pretty' in a complex way. The 7th creates gentle tension — sophisticated without being dissonant. This is the sound of late-night soul." },
        { text: "Play Fmaj7: 1x2210. That's low E 1st fret (F), skip A string, D string 2nd fret (E), G string 2nd fret (A), B string 1st fret (C), open E (E). The notes spell F-E-A-C-E. All four notes of Fmaj7 are present.", why: "Fmaj7 has a bittersweet quality — bright because of the major chord, but yearning because of that major 7th interval. It's one of the most beautiful chord sounds on guitar." },
        { text: "Play Cmaj7→Fmaj7→Cmaj7→Fmaj7 slowly. Let each chord ring for a full bar. The progression should feel like sinking into a comfortable chair.", why: "These two chords together create a lush, enveloping harmonic world. This simple back-and-forth is the foundation of countless soul and bossa nova songs." },
        { text: "Try replacing standard major chords in any progression you know with their maj7 versions. Play C→F→G, then Cmaj7→Fmaj7→G. Notice how it instantly sounds more sophisticated.", why: "Upgrading triads to 7th chords is the fastest way to make your playing sound more mature. One note transforms the entire vibe." }
      ],
      feel: "Major 7th chords should feel luxurious and dreamy — like silk instead of cotton. They're the chords you play when you want music to feel elegant.",
      wrong: "If they sound dissonant or wrong, check your fingering — one muted string can ruin a voicing. If they sound too jazzy, simplify your strumming and let the chord speak for itself.",
      sarah: "Major 7ths are the gateway drug to sophisticated harmony. Once you hear them, regular major chords sound naked by comparison.",
      metronome: 120
    },
    {
      id: "gs-7-3",
      time: 10,
      title: "Dominant 9th Voicings",
      type: "guitar",
      what: "Learn G9 and C9 — the funk chords. A dominant chord has a major triad plus a flatted 7th (b7). A dominant 9th adds the 9th on top. G9 = G-B-D-F-A. C9 = C-E-G-Bb-D. These voicings have swagger that regular chords don't.",
      steps: [
        { text: "Play G9: 3x320x. That's low E 3rd fret (G), skip A, D string 3rd fret (F), G string 2nd fret (A), open B (B), skip high E. The notes: G-F-A-B = root, b7, 9th, 3rd. The 5th (D) is omitted — that's normal for extended chords. Strum it with a sharp, percussive attack.", why: "Dominant 9th chords combine the drive of a dominant 7th with the color of the 9th. They're punchy enough for rhythm playing but complex enough for soul harmony. This is 'the' funk chord — James Brown, Prince, D'Angelo all live here." },
        { text: "Play C9: x3233x. That's A string 3rd fret (C), D string 2nd fret (E), G string 3rd fret (Bb), B string 3rd fret (D), skip high E. The notes: C-E-Bb-D = root, 3rd, b7, 9th. Missing the 5th (G), which is fine.", why: "This shape is moveable — slide it up to D9 (x5455x) or down to Bb9 (x1011x). One shape gives you every dominant 9th on the A string." },
        { text: "Play a funk vamp: G9 for 4 bars with a 16th-note strumming pattern. Sixteenth notes mean 4 strums per beat — count '1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a.' Mute between strums for that choppy, percussive sound.", why: "Dominant 9ths shine in rhythmic contexts. The percussive muting between strums creates the funk pocket. The strum pattern should feel like a machine — steady, even, relentless." },
        { text: "Play G9→C9→G9→C9, 2 bars each. Compare to G→C→G→C. The 9th chords make the same progression feel entirely different — deeper, funkier, more complex.", why: "This comparison demonstrates the power of voicing choice. Same root movement, completely different emotional impact. The b7 and 9th add dimensions that triads can't touch." }
      ],
      feel: "Dominant 9ths should feel powerful and groovy — like the chord is strutting. When you play G9, you should feel cooler. If you don't, strum harder.",
      wrong: "If the chords sound muddy, make sure you're muting the strings marked 'x' — only strum the strings that are part of the voicing. If the funk vamp sounds stiff, loosen your wrist and let the muting happen naturally.",
      sarah: "The dominant 9th is the most stylish chord in music. It's the chord that makes people nod their heads before they even realize they're doing it.",
      metronome: 120
    },
    {
      id: "gs-7-4",
      time: 10,
      title: "Minor 9th & 11th Voicings",
      type: "guitar",
      what: "Learn Am9 and Dm11 — the floating, ethereal voicings that define the Khruangbin/BALTHVS sound. Am9 = A-C-E-G-B. Dm11 = D-F-A-C-E-G. These are upper-string fragments, not full barre chords.",
      steps: [
        { text: "Play Am9: x02413. That's open A (A), D string 2nd fret (E), G string 4th fret (B), B string 1st fret (C), high E 3rd fret (G). The notes: A-E-B-C-G = root, 5th, 9th, minor 3rd, minor 7th. All five chord tones present.", why: "Minor 9th chords combine sadness (minor 3rd), sophistication (9th), and tension (7th) in one voicing. They're the most beautiful chords in guitar." },
        { text: "Try the simpler Am9 voicing: x05500. That's open A (A), D string 5th fret (G), G string 5th fret (C), open B (B), open E (E). The notes: A-G-C-B-E = root, 7th, 3rd, 9th, 5th. Let it ring — every note belongs.", why: "This open voicing is easier to grab and has a wider, more atmospheric sound. Both Am9 voicings are valid — use whichever fits the moment." },
        { text: "Play Dm11: xx0011. That's open D (D), open G (G), B string 1st fret (C), high E 1st fret (F). The notes: D-G-C-F = root, 11th (G), 7th (C), 3rd (F). A compact voicing that implies the full Dm11 sound.", why: "The 11th (G) adds an open, floating quality. This chord sounds like a question that doesn't need an answer — perfect for spacious, groove-oriented music." },
        { text: "Alternate Am9 and Dm11 slowly. Let each chord sustain for 2 full bars at 60 BPM. The progression should feel like clouds drifting.", why: "These chords need time to breathe. Rushing through them destroys their magic. Slow, spacious playing is how Khruangbin and BALTHVS use them." }
      ],
      feel: "These chords should feel like floating — weightless, open, and expansive. They're the musical equivalent of looking at the sky on a clear day.",
      wrong: "If they sound muddy or cluttered, try playing fewer strings. If they sound like regular minor chords, make sure the 9th and 11th are ringing clearly — those are the notes that define the voicing.",
      sarah: "Am9 and Dm11 are the chords that make people close their eyes and sway. They're not showing off — they're creating a feeling. That's what extended harmony is for.",
      metronome: 60
    },
    {
      id: "gs-7-5",
      time: 10,
      title: "Extended Chord Progression",
      type: "guitar",
      what: "Play Am9→Dm7→G9→Cmaj7 slowly, letting each voicing ring. This is a vi-ii-V-I in C major — the harmonic foundation of soul and neo-soul guitar. Am9 is the vi chord, Dm7 is the ii, G9 is the V, Cmaj7 is the I.",
      tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Put on the Deep Soul Groove 80. Play each chord for a full bar: Am9 (x02413), Dm7 (xx0211), G9 (3x320x), Cmaj7 (x32000). Focus on clean transitions — every note in each voicing should ring clearly.", why: "Extended chords are less forgiving than triads. One muted string can ruin the voicing. Clean technique is essential at this level of harmonic sophistication." },
        { text: "Listen to how each chord leads to the next. Am9 creates a wistful tension. Dm7 moves the harmony forward. G9 builds dominant expectation. Cmaj7 resolves everything — home.", why: "This is a vi-ii-V-I in C major. The Roman numerals describe each chord's role: vi (Am9) is the relative minor starting point, ii (Dm7) is the subdominant, V (G9) is the dominant that demands resolution, I (Cmaj7) is home base." },
        { text: "Play the progression with a gentle fingerpicking pattern. Each chord gets 4 picked notes: bass note, then three upper strings in sequence. Let the notes overlap and ring.", why: "Fingerpicking extended chords reveals their inner voices. You can hear the 7ths, 9ths, and other extensions as individual melodies within the harmony." },
        { text: "Loop the progression 8 times. By the 4th loop, the changes should feel automatic. By the 8th, you should be able to focus entirely on tone and dynamics.", why: "Internalizing this progression frees your attention for expression. When the chords are in muscle memory, you can focus on making music." }
      ],
      feel: "The progression should feel like a warm bath — enveloping, comfortable, and deep. Each chord should melt into the next with no sharp edges.",
      wrong: "If transitions are clunky, practice just the chord changes without rhythm until they're smooth. If the voicings sound thin, check that all intended strings are ringing.",
      sarah: "This progression is the skeleton key to soul harmony. Learn it in C, then move it to other keys. You'll hear it in every Khruangbin and D'Angelo song.",
      metronome: 80
    },
    {
      id: "gs-7-6",
      time: 10,
      title: "16th-Note Soul Strumming",
      type: "guitar",
      what: "Master 16th-note strumming — 4 strums per beat. Count '1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a.' The pattern is Down-up-Down-up on each beat, with selected strums muted as ghost notes. This is the engine of funk and soul rhythm guitar.",
      tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Start with just the counting. Set metronome to 70 BPM. Say '1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a' out loud while tapping your foot on each numbered beat. Get the subdivision into your body.", why: "16th notes are twice as fast as 8th notes. Before you play them, you need to feel them. The verbal counting builds the internal clock that your hands will follow." },
        { text: "Play all 16 strums per bar on Am9 — Down on '1', up on 'e', Down on 'and', up on 'a', repeat for each beat. Keep every strum the same volume at first. 70 BPM.", why: "Even, consistent 16th-note strumming is the foundation. Your wrist should move like a pendulum — steady and relaxed. Tension kills the groove." },
        { text: "Now add ghost notes: mute selected strums by releasing fretting hand pressure. Try this pattern — strum normally on '1' and 'and', ghost note on 'e' and 'a.' The rhythm becomes: STRUM-ghost-STRUM-ghost per beat.", why: "Ghost notes (muted strums) create the rhythmic texture that defines funk. Your strumming hand never stops — it keeps the 16th-note motion. Only the fretting hand decides which strums ring and which are percussive." },
        { text: "Put on Soul Funk Groove 90. Apply the ghost note pattern to Am9. Keep the wrist moving. The ghost notes should sound like 'tchk' — percussive, tight, rhythmic. Practice for 3 minutes straight.", why: "Over a backing track, the ghost note strumming locks into the groove and becomes part of the drum pattern. Your guitar becomes a rhythm instrument — half melodic, half percussive." }
      ],
      feel: "When the 16th-note pattern is locked in, your arm should feel like it's on autopilot — the wrist bounces steadily while your fretting hand sculpts the rhythm by choosing which strums ring. It should feel effortless and hypnotic.",
      wrong: "If your arm gets tired, you're using too much force or too much arm. The motion comes from the wrist — small, loose, efficient. If the ghost notes sound the same as the real strums, you're not releasing fretting hand pressure enough.",
      sarah: "16th-note strumming is the secret weapon of every funk and soul guitarist. Your hand never stops moving — it's always strumming. You just choose which strums the audience hears. That's the magic.",
      metronome: 70,
      speedLadder: { start: 70, end: 90, increment: 10, bars: 4 }
    },
    {
      id: "gs-7-7",
      time: 12,
      title: "Ghost Note + Extended Chord Fusion",
      type: "guitar",
      what: "Combine the muted ghost strums from Level 4 reggae with the extended chord voicings from this level. This is the Skinshape/BALTHVS fusion — extended chords played with rhythmic sophistication.",
      tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Put on the Soul Funk Groove 90. Play Am9 with a ghost note pattern: muted scratch on beats 1 and 3, chord stab on the 'and' of 2 and 4. This is your reggae offbeat rhythm (Level 4) applied to extended chords.", why: "Ghost notes with extended chords create a deeply funky, sophisticated groove. The muted scratches provide rhythm while the extended stabs provide harmonic color." },
        { text: "Move the ghost note pattern through your extended progression: Am9→Dm7→G9→Cmaj7, 2 bars each. Every transition should be seamless — the rhythm never breaks.", why: "Maintaining a steady ghost note rhythm while changing complex chord shapes is a real coordination challenge. This is what separates intermediate from advanced rhythm guitar." },
        { text: "Add behind-the-beat phrasing from Level 5: place each chord stab slightly late, while keeping the ghost notes on the beat. The rhythm should feel lazy and deep.", why: "The combination of on-beat ghost notes and behind-the-beat chord stabs creates the pocket that defines Skinshape and dub-influenced guitar. It's micro-timing mastery." },
        { text: "Reduce the chord stabs to just the top 3 strings. Play fragments of Am9 and G9 — lighter, more suggestive. Let the ghost notes carry the groove.", why: "Fragment voicings with ghost note rhythm is professional-level guitar playing. You're implying complex harmony with minimal effort." }
      ],
      feel: "The groove should feel like a heartbeat — steady, deep, and unhurried. The extended chords add color without disrupting the rhythm. Ghost notes and harmony become one instrument.",
      wrong: "If the rhythm is unsteady, practice the ghost note pattern alone (no chord changes) until it's locked. If the chords sound cluttered, use smaller fragments — top 3 strings only.",
      sarah: "This is the Skinshape sweet spot — where reggae groove meets jazz harmony. Your right hand does the dancing while your left hand does the painting.",
      metronome: 90
    },
    {
      id: "gs-7-8",
      time: 12,
      title: "Soul Groove — BALTHVS/Skinshape Style",
      type: "guitar",
      recorder: true,
      what: "Combine extended chords, Dorian melodies, ghost note rhythm, and behind-the-beat feel over a backing track. This is the full BALTHVS/Skinshape experience — Dorian-based minor progression with 9th voicings.",
      tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }, { name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Start with Soul Funk Groove 90. Play Am9 with ghost note rhythm for 4 bars. Lock into the groove before doing anything else — feel the pocket.", why: "The groove has to be solid before you add complexity. If your foundation isn't locked, nothing you build on top will feel right." },
        { text: "Move through Am9→Dm7→G9→Cmaj7 with ghost note rhythm. Every transition should be invisible — the listener should feel the chord change, not hear a gap.", why: "Seamless chord changes over a groove are the hallmark of a professional rhythm guitarist. The groove is the constant — the chords are decoration." },
        { text: "Add short Dorian fills between chord changes: quick 2-3 note phrases in the gaps between ghost note patterns. Use the F# as your color note. Just hints of melody within the rhythm.", why: "Dorian fills over extended chords blur the line between rhythm and lead guitar. This is how Khruangbin's Mark Speer plays — rhythm and lead simultaneously." },
        { text: "Try switching to the Deep Soul Groove 80 for a slower, deeper feel. Same progression, same ghost notes, but with more space for the chords to breathe and the fills to speak.", why: "Tempo changes the character of the same material. At 80 BPM, the groove is more meditative. At 90 BPM, it's more driving. Both are useful depending on the mood." }
      ],
      feel: "This should feel like being in the pocket with a band — deep, locked in, and effortless. Your guitar should feel like part of the rhythm section, not a soloist sitting on top.",
      wrong: "If you're rushing or dragging against the beat, strip back to just ghost notes until you're locked in. If the fills disrupt the groove, make them shorter and simpler.",
      sarah: "This is the sound that fills rooms without anyone noticing. People start moving their heads and don't know why. That's what rhythm guitar mastery feels like."
    },
    {
      id: "gs-7-9",
      time: 15,
      title: "Full Soul Groove Jam",
      type: "guitar",
      recorder: true,
      what: "Extended 15-minute jam: improvise using Dorian scale over the extended chord progression. Focus on groove and feel over technical display. Everything from Level 7 in one session.",
      tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }, { name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Start with Deep Soul Groove 80. Open with Am9 ghost note rhythm — minimal, deep, locked in. Let the groove breathe for 3 minutes before adding anything else.", why: "Starting sparse establishes the groove as the foundation. Everything you add should enhance it, not compete with it." },
        { text: "Minutes 3-7: move through the extended progression (Am9→Dm7→G9→Cmaj7) with ghost notes. Add short Dorian fills between changes. Keep it restrained — taste, not feast.", why: "The middle section is where you demonstrate your extended chord vocabulary. Each voicing should ring clearly, and the fills should complement the harmony." },
        { text: "Minutes 7-11: switch to the Soul Funk Groove 90 and open up. Longer Dorian phrases, more expressive fills, wider dynamics. Target the chord extensions — land on the 9th of Am9 (B), the 7th of Dm7 (C), the 9th of G9 (A), the 7th of Cmaj7 (B). This is your solo section within the groove.", why: "The solo section should feel organic — growing out of the rhythm playing rather than breaking from it. Targeting extensions proves you're hearing the chords, not just running scales." },
        { text: "Minutes 11-15: strip back to basics. Am9, ghost notes, space. Reduce to fragments. End with a single Am9 chord ringing into silence.", why: "The return to simplicity after complexity creates the most satisfying musical arc. You end where you began, but the journey makes the return meaningful." }
      ],
      feel: "This should feel like performing at a late-night soul club — deep, groovy, sophisticated, and unhurried. Your playing should make people close their eyes and nod.",
      wrong: "If it sounds like a jazz exercise, add more groove and ghost notes. If it sounds like basic strumming, use your extended voicings and Dorian fills. If it's too busy, add more space.",
      sarah: "This is the summit of Level 7. You started with a single Dorian scale — now you're playing soul sessions with extended harmony, ghost notes, and Dorian leads. That's real musical growth.",
      levelUp: "You can sustain a 15-minute soul-funk jam using extended voicings (9ths, 11ths, maj7s), Dorian melodies, ghost note rhythm, and dynamic variation. Your harmonic vocabulary has leveled up."
    }
  ]
};
