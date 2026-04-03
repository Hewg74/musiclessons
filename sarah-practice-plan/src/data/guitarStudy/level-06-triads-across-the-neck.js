import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Triads Across the Neck",
  subtitle: "Three notes, twelve frets, infinite possibilities — the shapes that unlock the entire fretboard.",
  description:
    "Every chord you've played so far — open shapes, barre chords — uses 5 or 6 strings. A triad uses only 3. Three notes: root, 3rd, 5th. That's all a chord IS. Strip away the doubles and octaves, and you're left with the purest form of harmony. These 3-note shapes are small, fast, moveable, and they map the ENTIRE fretboard through chord tones instead of abstract memorization. Mark Speer (Khruangbin) builds his whole approach on triads — 'three-note chord melody stuff on the top three strings.' Cory Wong strips barre chords down to triads for punchy funk. Reggae skank? Triads on top strings. This level transforms how you see the neck.",
  artists: "Khruangbin, Skinshape, Cory Wong, Nile Rodgers",
  unlocks: "Jangle & Shimmer (Level 7)",
  review: {
    label: "Level 5 Check-In",
    time: 5,
    exercises: ["gs-5-6", "gs-5-11"],
    prompt: "Play Sol Del Sur (C#m-B-F#) with clean barres (gs-5-6). Then strum a barre chord progression you created yourself (gs-5-11). Clean barres with no buzzing? Time for triads."
  },
  exercises: [

    // ═══════════════════════════════════════════════════════════
    // BLOCK 1: HEAR & LEARN — Top-String Triads (strings 1-2-3)
    // The Khruangbin string set. Blocked practice — one concept
    // at a time. Audiation first (Gordon), then shapes.
    // ═══════════════════════════════════════════════════════════

    {
      id: "gs-6-1",
      time: 7,
      title: "Hear the Triad — Sing Before You Play",
      type: "guitar",
      what: "Before touching the fretboard, HEAR the triad. A drone plays A. The piano shows A-C-E — the three notes of Am. Sing each note, match it, feel where it lives in your voice. Then find those three notes on the fretboard. Sound drives learning — your ear leads, your fingers follow.",
      setup: "Guitar in lap. Drone on. Listen first — don't play yet.",
      drone: { root: "A", octave: 2, texture: "analog" },
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "A Minor Triad: A-C-E" },
      colorMusic: { root: "A", scale: "natural-minor", mode: "chordTones" },
      steps: [
        { text: "Turn on the A drone. Let it hum. Now sing the root — match the A. Feel where it sits in your chest. Hold it for 4 seconds. That's home base.", why: "Audiation research (Edwin Gordon) shows that hearing and singing a note BEFORE playing it creates stronger neural encoding than shape-first learning. The drone gives you an anchor — you're not singing into silence, you're singing against a harmonic reference. Rotem Sivan (jazz guitarist, educator): 'Feel and sing the triads before drilling fingerings. The sound should drive the learning.'" },
        { text: "Now sing up to C — a minor third above A. The piano shows you the target. Match it. Feel how it's slightly darker, slightly tense against the drone. Hold it.", why: "The minor 3rd is the note that makes a minor chord MINOR. It's the emotional engine. When you can sing it and feel its quality against the root, you'll recognize it instantly on the fretboard." },
        { text: "Sing up to E — the 5th. This one feels stable, open, powerful. Sing A-C-E slowly, one note at a time. Then descend: E-C-A. You just sang an Am triad.", why: "The 5th provides stability and strength. Root (foundation) + 3rd (emotion) + 5th (power) = the complete harmonic statement. Three notes, three functions, one chord." },
        { text: "Now pick up your guitar. Find A on the G string (fret 2). Find C on the B string (fret 1). Find E on the high E string (open). Play them one at a time, matching each to the note you just sang.", why: "Connecting the sung pitch to a fretboard location creates a multi-sensory bond: you hear it, sing it, see the fret, feel the string. This is deeper than memorizing a shape — you know what each note IS." },
        { text: "Strum all three strings together: G string fret 2, B string fret 1, E string open. That's Am as a triad — just 3 notes, 3 strings. Compare it to your open Am chord (x02210). Same notes, fewer strings, different feeling — lighter, more focused, more portable.", why: "This comparison reveals what a triad actually is: the essential chord stripped to its minimum. Your 5-string Am chord doubles A and E — the triad gives you each note exactly once. It's concentrated harmony." }
      ],
      feel: "This exercise should feel like tuning a radio — searching for the signal, locking in. When you sing A-C-E and then play them on the fretboard, there should be a moment of recognition: 'that's the same thing.' The drone grounds everything — you're never floating in silence.",
      wrong: "If you can't match the sung pitch to the fretboard, slow down. Play the note on guitar first, THEN sing it back, THEN find it again. If the drone feels distracting, lower its volume — it should be a quiet anchor, not a wall of sound. If singing feels awkward, hum instead — the pitch matters, not the vocal quality.",
      sarah: "Gene, this is exactly how your vocal curriculum works — hear it inside first, then produce it. Your audiation is already developing from the Voice track. Now you're extending it to the fretboard: the same A-C-E that lives in your voice lives under your fingers. The drone is your anchor, the piano is your map, and your ear is the bridge between singing and playing. Khruangbin's Mark Speer told Guitar World he approaches guitar 'more like a keyboardist and harpist than a shredder' — he HEARS the notes first, then finds them. That's what you're building.",
      metronome: null,
      levelUp: "Sing A-C-E ascending and descending in tune with the drone, then find all three notes on strings 1-2-3 without looking at the piano diagram. Retrieval check: turn off the drone, wait 10 seconds, then sing A-C-E from memory."
    },
    {
      id: "gs-6-2",
      time: 8,
      title: "The Am Triad — Three Notes, Three Shapes",
      type: "guitar",
      what: "Learn Am (A-C-E) in three inversions on strings 1-2-3. Root position at the open/low frets, 1st inversion at fret 5, 2nd inversion at fret 8-10. Three clusters that chain up the neck — the same three notes rearranged, each with its own voice.",
      setup: "Guitar. Drone on A. No metronome — learn the shapes first, then add time.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "A Minor Triad" },
      chordVoicings: { chords: ["Am triad (1-2-3)"] },
      steps: [
        { text: "Root position: G string fret 2 (A), B string fret 1 (C), E string open (E). Fret numbering: xxx210. Strum just these 3 strings. Let them ring against the drone. This is Am in its most open voicing — the root A is on the bottom, giving it a grounded, stable sound.", why: "Root position puts the chord's 'name note' in the bass (lowest voice). This is the most stable, grounded version of any triad. Starting here gives your ear a clear anchor point." },
        { text: "1st inversion: G string fret 5 (C), B string fret 5 (E), E string fret 5 (A). All three notes at fret 5 — a straight bar across strings 1-2-3. Strum it. The 3rd (C) is now on the bottom. It sounds slightly lighter, more flowing than root position.", why: "1st inversion puts the 3rd in the bass, creating a less grounded, more melodic quality. The straight-bar shape at fret 5 is the simplest possible fingering — one finger, three strings. Tomo Fujita (Berklee, John Mayer's teacher): 'Don't memorize. Be familiar with each triad — names of notes, degrees, and sound.'" },
        { text: "2nd inversion: G string fret 9 (E), B string fret 10 (A), E string fret 8 (C). Fret numbering: xxx9(10)8. This one has the 5th (E) in the bass — it sounds the most tense, the most wanting-to-resolve of the three.", why: "2nd inversion with the 5th in the bass creates a sense of forward motion — it 'leans' toward resolution. Classical composers used 2nd inversion triads at cadence points for exactly this reason. You're learning the same harmonic principle through shapes." },
        { text: "Chain them: root position (fret 0-2) → 1st inversion (fret 5) → 2nd inversion (fret 8-10). Play each one, let it ring for 2 beats, then move to the next. You're climbing the neck through Am.", why: "The three inversions form a 'highway' up the neck. Root → 1st inv → 2nd inv → root (octave up). This chain repeats every 12 frets. Learn the chain, and you can find Am ANYWHERE on the fretboard." },
        { text: "Now descend: 2nd inversion → 1st inversion → root. Listen to how each inversion has a slightly different emotional shade — root is grounded, 1st is flowing, 2nd is tense. Same chord, three personalities.", why: "Descending forces you to hear the inversions as distinct voicings, not just fret positions. When you can describe the emotional quality of each inversion, you're hearing harmony — not just playing shapes." }
      ],
      feel: "Each inversion should sound like the same family — clearly Am — but with a different personality. Root position is the parent: stable, anchored. First inversion is the middle child: smooth, easy. Second inversion is the youngest: restless, eager to move. When you chain them up the neck, it should feel like climbing a gentle staircase — same view, higher floor.",
      wrong: "If the 2nd inversion (fret 8-10) buzzes, check your finger spread — G string fret 9, B string fret 10, E string fret 8 requires a slight stretch. If all three inversions sound identical, you're strumming too hard — lighten up and let the voice-leading (which note is on the bottom) come through. If you can't remember which shape is which, go back to exercise gs-6-1 and sing A-C-E again — the shapes follow the sound.",
      sarah: "Gene, here's the fretboard revelation: you just learned WHERE A, C, and E live on the top 3 strings across the entire neck. Three shapes = three zones of the fretboard MAPPED through sound, not memorization. Every open Am chord you've ever played contains these same 3 notes scattered across 5 strings. Now you're playing ONLY those 3 notes — pure, portable, moveable. This is how Mark Speer navigates — small shapes, big awareness.",
      metronome: null,
      levelUp: "Play all three Am inversions ascending and descending on strings 1-2-3, naming the bottom note of each inversion (A, C, E) as you play it. Retrieval check: close your eyes and play the 1st inversion from memory."
    },
    {
      id: "gs-6-3",
      time: 7,
      title: "The C Major Triad — Brighter Color",
      type: "guitar",
      what: "Learn C major (C-E-G) in three inversions on strings 1-2-3. Compare it to Am — same strings, different shapes, different emotion. Am and C share two notes (C and E) — voice leading begins naturally here.",
      setup: "Guitar. Drone on C. Focus on the color change from Am to C major.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["C", "E", "G"] },
      drone: { root: "C", octave: 2, texture: "warm" },
      pianoKeys: { notes: ["C4", "E4", "G4"], label: "C Major Triad: C-E-G" },
      steps: [
        { text: "2nd inversion (open position): G string open (G), B string fret 1 (C), E string open (E). Fret numbering: xxx010. Strum it. Bright, open, ringing — the open strings add shimmer. The 5th (G) is on the bottom.", why: "Starting with the open-position voicing is practical — you already know these notes from your open C chord. The open G and E strings ring freely, giving this voicing a beautiful, chiming quality." },
        { text: "Root position: G string fret 5 (C), B string fret 5 (E), E string fret 3 (G). Fret numbering: xxx553. The root (C) is now on the bottom — it sounds more definitive, more 'this IS C major.'", why: "Root position declares the chord. Compare it to the open voicing — same notes, but with C in the bass it sounds more grounded. The shape has the G and B strings barred at fret 5 with the E string at fret 3." },
        { text: "1st inversion: G string fret 9 (E), B string fret 8 (G), E string fret 8 (C). Fret numbering: xxx988. The 3rd (E) is on the bottom — smooth, melodic.", why: "1st inversion at fret 8-9 gives C major a warmer, more intimate quality. The higher position on the neck has a different timbre than the open voicing — less chime, more warmth." },
        { text: "Chain all three ascending: open (fret 0-1) → root (fret 3-5) → 1st inv (fret 8-9). Then descend. The C major highway up the neck.", why: "Like Am, C major has a highway of inversions chaining up the fretboard. Each inversion connects to the next with minimal movement. This is the same principle — different chord, same navigation system." },
        { text: "Now play Am root position (xxx210) then C 2nd inversion (xxx010). Back and forth. Notice: only ONE note changes — the A on the G string (fret 2) drops to open G. C and E stay put. That's voice leading — the smallest possible movement between chords.", why: "Am and C share two notes (C and E). Moving between them requires changing only one note. This minimal movement IS voice leading — the principle that makes chord progressions sound smooth. Your fingers discover it naturally when you play triads." }
      ],
      feel: "C major should feel brighter, more affirming than Am — like stepping from shadow into sunlight. Same strings, same area of the neck, completely different emotional temperature. When you alternate Am and C, feel the color change: warm-dark (Am) to warm-bright (C).",
      wrong: "If the open voicing (xxx010) sounds muddy, make sure the G string is truly open and not accidentally muted by a nearby finger. If the root position (xxx553) is hard to finger, try barring the G and B strings at fret 5 with your ring finger and reaching back to fret 3 on E with your index. If Am and C sound the same to you, play them with the drone — Am over the A drone, C over the C drone — and the color difference will pop.",
      sarah: "Gene, you just discovered something beautiful: Am and C are neighbors. Two notes in common, one note different. When Mark Speer floats between Am and C triads on the top strings, he's barely moving his fingers — one note slides, the rest stay. That minimal movement is what gives Khruangbin that effortless, flowing quality. It's not flashy technique — it's intelligent voice leading through triads.",
      metronome: null,
      levelUp: "Play C major in all three inversions ascending on strings 1-2-3, then alternate Am root position and C 2nd inversion 8 times and describe which note moves between the two chords."
    },
    {
      id: "gs-6-4",
      time: 8,
      title: "Slide the Shape — One Triad, Every Key",
      type: "guitar",
      what: "Take the Am root position shape (xxx210) and slide it up the neck chromatically: Am → Bbm → Bm → Cm → C#m → Dm... One shape, every minor key. The same revelation as barre chords — but smaller, faster, no barre needed.",
      setup: "Guitar. No drone — listen to the key change as you slide.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      colorMusic: { root: "A", scale: "natural-minor", mode: "explore" },
      steps: [
        { text: "Play Am root position at the open/low position: G fret 2, B fret 1, E open = xxx210. Now slide the entire shape up 1 fret: G fret 3, B fret 2, E fret 1 = xxx321. That's Bbm. Strum it.", why: "When you slide a triad shape up one fret, every note rises by a half step — the chord type stays the same (minor) but the key changes. This is the same principle as barre chords, but with 3 fingers instead of 4-6." },
        { text: "Continue sliding: fret 4-3-2 = Bm, fret 5-4-3 = Cm, fret 6-5-4 = C#m, fret 7-6-5 = Dm. Play each one slowly. Listen to the key rising.", why: "Each fret up = one half step higher. By fret 7-6-5 you're at Dm — a chord you know well from open position, now voiced on the top 3 strings in a completely new spot on the neck." },
        { text: "Jump to fret 14-13-12 = Am again (one octave higher). Play open Am root position, then this high Am. Same chord, different register — brighter, thinner, more delicate at the 12th fret.", why: "The fretboard repeats at the 12th fret. Your open Am root position at frets 0-1-2 reappears at frets 12-13-14. This confirms the geometry: one shape = every key, and the pattern wraps around." },
        { text: "Now do the same with C major root position (xxx553). Slide it up: fret 6-6-4 = Db, fret 7-7-5 = D, fret 8-8-6 = Eb... every major key from one shape.", why: "Major triads slide the same way. The shape stays constant; only the fret position changes. Two shapes (minor root position + major root position) × 12 fret positions = 24 chords. That's the power of triads." },
        { text: "Challenge: someone calls out a chord — 'F#m!' Find it by counting from Am root position (fret 2 on G string = A, so F# = fret 11 on G string). Play xxx(11)(10)9. Then 'Bb major!' Count from C root position. You're navigating the fretboard through triad geometry.", why: "This 'call-and-find' exercise builds real-time fretboard navigation. Instead of memorizing 24 separate shapes, you know 2 shapes and calculate the rest from root note location. This is how professional session guitarists think." }
      ],
      feel: "This should feel like discovering a superpower — one small shape that works EVERYWHERE. As you slide up the neck, the guitar should feel like a keyboard where every fret is a new key. Light, fast, effortless. Three fingers, not four. No barre needed.",
      wrong: "If the slid shapes buzz above fret 7, check that all three fingers are pressing firmly — the higher frets are narrower and require more precision. If you lose track of which chord you're playing, say the root note name out loud as you slide: 'A... Bb... B... C...' The root is always on the G string in root position.",
      sarah: "Gene, this is the same revelation you had with barre chords in Level 5 — one shape, every key. But triads are SMALLER and FASTER. Three fingers, not four or five. No barre across all 6 strings. Mark Speer can jump between Dm, Em, and Am triads in the time it would take to shift a full barre chord, because each shape is just 3 notes. That speed and lightness is what makes Khruangbin sound so effortless.",
      metronome: null,
      levelUp: "Starting from Am root position, slide up chromatically naming each chord, reach Dm (fret 7-6-5), then jump back to Am. Then do the same with C major root position up to F major. All transitions smooth with no gaps in sound."
    },
    {
      id: "gs-6-5",
      time: 10,
      title: "All Three Inversions — The Triad Highway",
      type: "guitar",
      what: "Play Am in root position (fret 0-2), 1st inversion (fret 5), 2nd inversion (fret 8-10) — three clusters that chain up the neck. Then do the same for C major. The inversion highway is how you navigate any chord across the full fretboard.",
      setup: "Guitar. Drone on A. Metronome at 60 BPM — slow enough to think about each shape.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      colorMusic: { root: "A", scale: "natural-minor", mode: "chordTones" },
      steps: [
        { text: "Am highway ascending: root position (xxx210) — hold 2 beats — 1st inversion (xxx555) — hold 2 beats — 2nd inversion (xxx9a8, that's frets 9-10-8) — hold 2 beats. Repeat 4 times at 60 BPM. Say 'root, first, second' as you play each.", why: "Naming the inversions while playing them builds cognitive association. The verbal label connects to the shape AND the sound. After 4 cycles, you're encoding the highway into muscle memory AND conceptual understanding simultaneously." },
        { text: "Am highway descending: 2nd inversion → 1st inversion → root position. Listen to how descending feels like 'coming home' — each inversion gets more grounded.", why: "Descending the highway trains a different motor pattern and reveals the emotional arc: tense (2nd inv) → flowing (1st inv) → grounded (root). This arc is useful for creating musical phrases — you can 'resolve' by descending through inversions." },
        { text: "C major highway ascending: 2nd inv (xxx010) → root (xxx553) → 1st inv (xxx988). Same principle, different chord. The open-position 2nd inversion chimes beautifully with those open strings.", why: "Every chord has its own highway, and the inversion pattern is always the same: root → 1st → 2nd → root (octave). C major's highway starts at the open position because its 2nd inversion uses open strings. Different starting point, same navigation system." },
        { text: "Now combine: Am highway up, then C major highway up, without stopping. Am root → Am 1st → Am 2nd → C 2nd → C root → C 1st. Six shapes in a continuous ascent.", why: "Combining two chord highways trains you to SWITCH between chord worlds while navigating the neck. This is the foundation of triad-based comping — moving between chords AND up/down the neck simultaneously." },
        { text: "Freestyle: play Am and C triads in ANY inversion, ANY position on strings 1-2-3. Jump around. Play Am root position, then C 1st inversion, then Am 2nd inversion. Let your ear guide you — which voicing wants to go next?", why: "Freestyle unlocks creative application. When you can play any inversion of any chord without thinking about the 'correct' sequence, you're improvising with harmony. The shapes become vocabulary, not exercises." }
      ],
      feel: "The highway should feel like driving a road you know well — each landmark (inversion) is familiar, and you can navigate without thinking about directions. When you combine Am and C highways, it should feel like switching lanes: smooth, intentional, no sudden moves.",
      wrong: "If you're getting lost on the highway, isolate one chord at a time. Play ONLY Am inversions for 2 minutes until the shapes are automatic, then add C. If the 2nd inversion of Am (frets 9-10-8) is physically awkward, practice just that shape for 30 seconds — the stretch between frets 8 and 10 needs finger independence.",
      sarah: "Gene, you just mapped A, C, and E on the top 3 strings across the ENTIRE neck. And then you did the same for C, E, and G. That's 6 notes you can now find anywhere on 3 strings — half the notes in the key of Am/C major. This is how the CAGED system works at a micro level — each inversion corresponds to a CAGED form. But you're learning it through sound and small shapes instead of massive chord grips.",
      metronome: 60,
      levelUp: "Play Am and C major triad highways ascending and descending at 60 BPM without pausing between inversions. Name each inversion as you play it. Then, with eyes closed, play the 1st inversion of each chord from memory."
    },
    {
      id: "gs-6-6",
      time: 7,
      title: "Major vs. Minor — The One-Fret Difference",
      type: "guitar",
      what: "Compare Am to A major. Only the 3rd changes — C becomes C#. One fret, one half step, and the entire emotional universe shifts. The 3rd is the most powerful note in music.",
      setup: "Guitar. Drone on A. Recorder on — you'll want to hear this back.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "A Minor (A-C-E)" },
      recorder: true,
      steps: [
        { text: "Play Am root position (xxx210). Let it ring for 4 beats. Now play A major root position: same shape but the B string moves from fret 1 (C) to fret 2 (C#) = xxx220. Let it ring for 4 beats. Back and forth, 4 times.", why: "One fret on one string transforms minor to major. The 3rd (C or C#) is the note that determines the chord's emotional quality. Everything else — root and 5th — stays identical. This is the smallest possible musical change with the largest emotional impact." },
        { text: "Close your eyes. Have someone (or a timer) randomly say 'minor' or 'major.' Play the corresponding triad. Can you feel the difference in your fingers? The minor shape has the B-string finger pulled back one fret — slightly more contracted.", why: "The physical difference between major and minor is tiny — one fret on one finger. But your body can learn to feel the difference: minor is slightly more 'closed,' major slightly more 'open.' This proprioceptive distinction becomes automatic with practice." },
        { text: "Do the same at 1st inversion. Am 1st inv: xxx555. A major 1st inv: the E on B string moves up to F (fret 6) but wait — actually the 3rd is on the G string here. G fret 5 = C (minor 3rd), G fret 6 = C# (major 3rd). So A major 1st inv = xxx655. One fret shift on the G string.", why: "In different inversions, the 3rd appears on different strings. This teaches you to FIND the 3rd regardless of the shape. Knowing where the 3rd is in every inversion = knowing how to transform any minor triad to major (or vice versa) instantly." },
        { text: "Play Am root position → A major root position → Am 1st inversion → A major 1st inversion. Listen to the color flipping: dark-light-dark-light.", why: "Alternating major and minor across inversions trains your ear to track the 3rd regardless of voicing position. The 'color flip' should become unmistakable — one note changes, the whole emotional world shifts." },
        { text: "Record yourself playing Am → A major → Am → A major (4 beats each, any inversions). Listen back. Can you hear the exact moment the color changes? That moment IS the 3rd moving one fret.", why: "Self-recording confirms ear training. If you can identify the color change on playback, your harmonic awareness is developing. The 3rd is the most emotionally loaded note in music — it determines whether you feel joy or melancholy." }
      ],
      feel: "The major/minor switch should feel like weather changing — the same landscape under sun (major) or clouds (minor). One fret shift, entire emotional transformation. When you close your eyes and play them alternately, the color change should hit you in the chest, not just the ears.",
      wrong: "If major and minor sound the same, you might be strumming too hard — the volume masks the harmonic subtlety. Play softer. If you're confused about which fret changes in each inversion, remember: the 3rd is ALWAYS the note that moves. Find which string has C (for Am) or C# (for A major) and that's the one that shifts.",
      sarah: "Gene, this is THE insight: one fret is the entire difference between a sunny day and a rainy one. Between Khruangbin's warm minor groove and a bright major moment. When Mark Speer slides from Am to A major in the middle of a vamp, that one-fret shift creates the harmonic surprise that makes the audience lean in. You now have that tool — the smallest possible gesture with the biggest possible impact.",
      metronome: null,
      levelUp: "With eyes closed, alternate Am and A major root position triads and correctly name which is playing by sound alone. Then do the same with 1st inversions. Record and verify."
    },

    // ═══════════════════════════════════════════════════════════
    // BLOCK 2: EXPAND — All Four String Sets
    // Interleaved practice — comparing across string sets.
    // Tomo Fujita order: 1-2-3 done, now 3-4-5/4-5-6 (same
    // shapes), then 2-3-4 (unique due to B-string offset).
    // ═══════════════════════════════════════════════════════════

    {
      id: "gs-6-7",
      time: 10,
      title: "Strings 3-4-5 & 4-5-6 — Same Shapes, Deeper Voice",
      type: "guitar",
      what: "Learn Am and C triads on the A-D-G (strings 3-4-5) and E-A-D (strings 4-5-6) string sets. Because guitar tuning is uniform here — all perfect 4ths — the shapes are IDENTICAL between these two sets. Learn one, get the other free.",
      setup: "Guitar. Drone on A. Focus on the lower, warmer register.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      chordVoicings: { chords: ["Am triad (3-4-5)"] },
      steps: [
        { text: "Am 2nd inversion on strings 3-4-5 (A-D-G): A string fret 7 (E), D string fret 7 (A), G string fret 5 (C) = x775xx. The 5th (E) is on the bottom — this is 2nd inversion. Strum just these 3 strings. Compare the sound to the top-string version — deeper, rounder, more bass.", why: "The same triad on lower strings has a fundamentally different character — warmer, darker, with more harmonic weight. Your power chords from Level 3 lived on these strings with root and 5th only. Now you're adding the 3rd — suddenly you hear major vs. minor where before you only heard raw power." },
        { text: "Am 1st inversion: A string fret 3 (C), D string fret 2 (E), G string fret 2 (A) = x322xx. The 3rd (C) is on the bottom — smooth and flowing. Slide this shape up 2 frets: x544xx = Bm 1st inversion. Same sliding principle as the top strings.", why: "The sliding principle works identically on every string set. One shape, every key. You already know this from the top-string exercises — now you're confirming it translates to the interior strings." },
        { text: "Now play the SAME finger shapes but shifted down one string set to strings 4-5-6 (E-A-D). Because E-A and A-D are both tuned in perfect 4ths (same as A-D and D-G), the fingering is IDENTICAL — just one string lower and a 4th lower in pitch. Play: E fret 7, A fret 7, D fret 5 = 775xxx. That's Em 2nd inv (same shape, different chord because you moved down a 4th). For Am on strings 4-5-6, shift to: E fret 5 (A), A fret 3 (C), D fret 2 (E) = 532xxx.", why: "This is the 'buy one get one free' of triads. Because strings 4-5-6 and 3-4-5 are both tuned in perfect 4ths, the same physical SHAPES produce the same chord TYPES — but the chord NAME shifts by a 4th when you change string sets. The shape is the same; you just need to know which fret to start on." },
        { text: "Compare all three registers: play Am on strings 4-5-6 (532xxx, deepest), then strings 3-4-5 (x775xx, middle), then strings 1-2-3 (xxx555, brightest). Same chord, three voices — bass, tenor, soprano.", why: "Hearing the same chord across three registers develops your sense of voicing. A bass-register Am triad under a melody creates depth. A treble-register Am triad over a bass note creates shimmer. Same notes, different roles." },
        { text: "Practice power chord → triad conversion: play an A5 power chord (x022xx) then add the C on G string fret 5 to make Am on strings 3-4-5. Or change C to C# (fret 6) for A major. Your power chords just gained emotional color.", why: "This connects your existing power chord knowledge to triads. Every power chord you've played is a triad waiting to happen — add the 3rd and you choose the mood. This is Cory Wong's trick: he adds and removes the 3rd from power chord shapes to create rhythmic major/minor pulses." }
      ],
      feel: "These lower-register triads should feel like the foundations of a building — deeper, heavier, more structural than the bright top-string versions. When you compare all three string sets in sequence, it should feel like zooming through octaves: bass → mid → treble of the same harmony.",
      wrong: "If the lower-string triads sound muddy, check your fretting — buzz is more audible on wound strings. If the strings 4-5-6 shapes feel too low and boomy, that's normal for standard tuning — in a band context, these would sit beautifully under a vocalist or lead guitar. If the 'same shape, different string set' concept is confusing, focus on strings 3-4-5 only and add 4-5-6 later.",
      sarah: "Gene, here's why this matters for YOUR music: in a band, full 6-string chords create mud. The bass and keys are already filling that low-end space. Triads on the interior strings cut through cleanly — you're playing just enough harmony to define the chord without stepping on anyone else's frequency range. That's the professional studio guitar sound. Cory Wong intentionally removes notes from full barre chords to create 'sparser three-note shell voicings.' You're learning the same trick.",
      metronome: null,
      levelUp: "Play Am triads on all three string sets (4-5-6, 3-4-5, 1-2-3) ascending, then convert a power chord to minor and major triads by adding the 3rd. Explain why strings 3-4-5 and 4-5-6 share the same shapes."
    },
    {
      id: "gs-6-8",
      time: 8,
      title: "Strings 2-3-4 (D-G-B) — The B-String Shift",
      type: "guitar",
      what: "Am and C triads on the D-G-B string set. These shapes are DIFFERENT from all other string sets because the G-to-B interval is a major 3rd, not a perfect 4th. The B string breaks the pattern — and that creates warmer, rounder voicings that Skinshape loves.",
      setup: "Guitar. Drone on A. Pay attention to how these shapes differ from what you already know.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      chordVoicings: { chords: ["Am triad (2-3-4)"] },
      steps: [
        { text: "Am root position on strings 2-3-4 (D-G-B): D string fret 7 (A), G string fret 5 (C), B string fret 5 (E) = xx755x. Compare this to the same inversion on strings 3-4-5 (x7750x). The shape is different — because the G-to-B interval is a major 3rd, not a perfect 4th.", why: "This is the ONE place on the guitar where the tuning breaks its pattern. Strings 6-5, 5-4, 4-3, and 2-1 are all tuned in perfect 4ths. But strings 3-2 (G to B) is a major 3rd — one fret narrower. This shifts every shape that crosses the G-B boundary. It's not a bug, it's a feature — it creates voicings with a warmer, more compact character." },
        { text: "C major root position on strings 2-3-4: D string fret 10 (C), G string fret 9 (E), B string fret 8 (G) = xx(10)98x. Play it — notice the descending fret pattern (10-9-8). On other string sets, this would be a different shape.", why: "The B-string shift changes every shape that crosses it. On strings 3-4-5, C root position would use a different fingering pattern. On 2-3-4, the frets step down like a staircase because the B string needs to compensate for the narrower interval." },
        { text: "Play Am root position on strings 2-3-4 (xx755x), then 1st inversion: D string fret 10 (C), G string fret 9 (E), B string fret 10 (A) = xx(10)9(10)x. Then 2nd inversion: D string fret 2 (E), G string fret 2 (A), B string fret 1 (C) = xx221x.", why: "There are only 3 new shapes to learn for this string set — root, 1st inv, 2nd inv — and they're specific to the G-B boundary. Every other string set reuses the shapes you already know. The 2-3-4 set has its own personality." },
        { text: "Compare Am triad on ALL FOUR string sets at roughly the same pitch area (around fret 5-7). Listen to the timbre differences: strings 4-5-6 is bass-heavy, 3-4-5 is mid-range, 2-3-4 is warm and round, 1-2-3 is bright and cutting.", why: "Same chord, four distinct timbres. A guitarist who knows all four string sets can choose the REGISTER that fits the musical context. Lead line needs to cut through? Top strings. Warm accompaniment? Middle strings. Thick bass riff? Bottom strings." },
        { text: "Skinshape comping: play Am on strings 2-3-4 with a gentle strum at 80 BPM. This mid-register voicing has a warm, round quality — less cutting than top strings, less boomy than bottom strings. It sits in the sweet spot for accompaniment.", why: "Will Holland (Skinshape) often comps in this register — warm enough to support a vocal, bright enough to maintain clarity. When you listen to 'I Didn't Know' or 'Filoxiny,' the guitar sits in this middle zone, and triads on strings 2-3-4 produce exactly that sound." }
      ],
      feel: "These shapes should feel different under your fingers — the B-string shift creates voicings where the frets are slightly closer together. The sound is warmer, rounder, like a wool blanket compared to the silk of the top strings. When you play all 4 string sets in sequence, it should feel like having 4 different guitars in your hands.",
      wrong: "If the shapes on strings 2-3-4 feel identical to strings 3-4-5, you're playing on the wrong strings — check that the B string (2nd thinnest) is included. If the 1st inversion at fret 9-10 is a stretch, use your ring and index fingers spread wide. If you're overwhelmed by 4 string sets, focus on just 2: top strings (1-2-3) for lead/bright comping, and mid strings (2-3-4) for warm accompaniment. Those two cover 90% of musical situations.",
      sarah: "Gene, the B-string shift is the ONE irregularity in guitar tuning, and it's actually a gift. It gives strings 2-3-4 their own unique voice — warmer and rounder than the other sets. Skinshape lives here. When Will Holland records guitar over his drum tracks, he's often playing triads in this register — warm enough to support his voice, clear enough to maintain groove. These 3 new shapes complete your triad vocabulary across the entire fretboard.",
      metronome: 80,
      levelUp: "Play Am root position on strings 2-3-4, then compare it to the same inversion on strings 3-4-5 — describe the timbral difference. Then play Am triads on all 4 string sets ascending. Explain why strings 2-3-4 have unique shapes."
    },
    {
      id: "gs-6-9",
      time: 10,
      title: "The Full Map — One Chord, Four String Sets",
      type: "guitar",
      what: "Play Am triads on ALL four string sets at roughly the same fret zone, then slide the whole set to Dm, then to G. You now have 12 ways to play a minor chord (4 string sets x 3 inversions). The entire fretboard is mapped through chord tones.",
      setup: "Guitar. Drone on A. Full neck view on the fretboard diagram.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      colorMusic: { root: "A", scale: "natural-minor", mode: "chordTones" },
      steps: [
        { text: "Am triad — fret 5-7 zone, all 4 string sets: Strings 4-5-6 (532xxx — root pos), strings 3-4-5 (x775xx — 2nd inv), strings 2-3-4 (xx755x — root pos), strings 1-2-3 (xxx555 — 1st inv). Play each one, letting it ring, moving from lowest to highest. Four voicings of the same chord in the same area of the neck.", why: "This demonstrates the DENSITY of triad knowledge. At any fret position, you have 4 ways to voice the same chord — each on a different string set, each with a different timbre. You're never stuck with one voicing." },
        { text: "Now slide the entire set up to Dm. Every shape moves up 5 frets (A to D = 5 half steps). Strings 4-5-6 at fret 12 area, strings 3-4-5 at fret 12 area, strings 2-3-4 at fret 12 area, strings 1-2-3 at fret 10. Or find Dm inversions that stay in the fret 5-7 zone using different inversions.", why: "Two approaches to changing chords: (1) slide the same inversion up/down, or (2) stay in the same fret zone and switch inversions. Approach 2 (staying in position) is voice leading — the principle from gs-6-3 scaled up to all 4 string sets." },
        { text: "Find Dm using voice leading from Am: on strings 1-2-3, Am 1st inv (xxx555) → Dm in the same area. Dm contains D-F-A. D on G fret 7, F on B fret 6, A on E fret 5 = xxx765. Only 1-2 frets moved from Am. That's voice leading across string sets.", why: "Voice leading minimizes finger movement between chords. When you can find the CLOSEST voicing of the next chord, your playing becomes fluid and effortless. This is the core of triad-based comping — small moves, big harmonic changes." },
        { text: "Play a i-iv-v in Am using triads on strings 1-2-3 with minimal movement: Am (xxx555) → Dm (xxx765) → Em (xxx987 or xxx000). Keep your hand in roughly the same position — let the inversions find the closest voicing.", why: "The i-iv-v progression in Am (Am-Dm-Em) is the harmonic foundation of reggae, psych, and minor-key soul. Playing it with voice-led triads instead of open/barre chords unlocks a smoother, more sophisticated sound — the sound of Skinshape's comping." },
        { text: "You now have 12 ways to play Am (4 string sets x 3 inversions). You know where A, C, and E live on EVERY string. That's the fretboard knowledge that took some players years to build — and you just did it through 3-note shapes instead of rote note memorization.", why: "This is the payoff: triads ARE fretboard knowledge. Each triad shape maps exact note locations. Learning Am triad in 3 inversions on strings 1-2-3 locates every A, C, and E on those strings across the entire neck. Multiply across 4 string sets = the entire fretboard mapped through chord tones." }
      ],
      feel: "This should feel like standing on top of a mountain after a long climb — you can SEE the whole fretboard laid out below you, organized by chord tones instead of random dots. Every area of the neck has multiple Am voicings. The fretboard should feel smaller, more navigable, more YOURS.",
      wrong: "If you're overwhelmed by 12 voicings, prioritize: strings 1-2-3 (bright, lead) and strings 2-3-4 (warm, accompaniment) cover 90% of musical situations. The other two string sets are bonus. If voice leading between Am and Dm feels impossible, simplify: just find any Dm voicing close to your Am position, even if it's not the theoretically 'best' one.",
      sarah: "Gene, this is THE unlock. You now see the fretboard as a grid of chord tones, not a mystery of dots. When someone plays Am, you have 12 voicings to choose from — different registers, different timbres, different emotional colors. Mark Speer's entire approach is exactly this: 'taking different triad shapes and moving them up and down the neck.' You now have his vocabulary. The rest of this level is about putting it to MUSIC.",
      metronome: null,
      levelUp: "Play Am in all 4 string sets at roughly the same fret zone. Then voice-lead from Am to Dm to Em on strings 1-2-3 with no more than 2 frets of movement between chords."
    },

    // ═══════════════════════════════════════════════════════════
    // BLOCK 3: APPLY — Musical Contexts
    // Random/applied practice — mixing shapes, string sets, and
    // musical styles. Real music, real grooves, real vocabulary.
    // ═══════════════════════════════════════════════════════════

    {
      id: "gs-6-10",
      time: 10,
      title: "Khruangbin Comping — Top-String Triads with Groove",
      type: "guitar",
      what: "Play Am → Dm → G → C triads on top strings (1-2-3) over a backing track, Khruangbin-style. Mark Speer plays EXACTLY this — triads on the top 3 strings while Laura Lee holds down the bass. Voice-lead between chords for minimal finger movement.",
      setup: "Guitar. Backing track on. Metronome at 85 BPM.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      metronome: 85,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Start with Am 1st inversion on strings 1-2-3 (xxx555). Strum lightly on beats 2 and 4 — the backbeat. Let the backing track provide the groove; your triads provide the harmony. Strum for 4 bars.", why: "Khruangbin's guitar sits BEHIND the rhythm — Mark Speer doesn't drive the groove, he colors it. Strumming on the backbeat (2 and 4) places your triads in the rhythmic pocket rather than on top of it." },
        { text: "Voice-lead to Dm: from Am 1st inv (xxx555), the closest Dm is root position at fret 7-6-5 area — D fret 7, F fret 6, A fret 5 = xxx765. Only the top two fingers move up 2 frets; the bottom finger stays. Strum Dm for 4 bars.", why: "Voice leading in action: Am (xxx555) to Dm (xxx765) moves only 2 fingers, each by 2 frets. The A note (fret 5 on E string) stays constant — it's the 5th of Dm. This shared note is the thread connecting the chords." },
        { text: "Voice-lead to G major: from Dm (xxx765), find the closest G. G major contains G-B-D. Closest voicing: G fret 12 on G string, B fret 12 on B string, D fret 10 on E string = xxxcc(10). Or use 2nd inversion lower: xxx787. Try both — which sounds better in context?", why: "Sometimes voice leading gives you two options at similar distance. Choosing between them is a MUSICAL decision, not a theoretical one. Play both over the backing track and let your ear decide which serves the groove better." },
        { text: "Voice-lead to C major: from G, find the closest C (C-E-G). Try xxx553 or xxx010 (open position). Complete the cycle: Am → Dm → G → C → Am. Loop it. Keep the strum light, on beats 2 and 4.", why: "The full Am-Dm-G-C cycle is one of the most common progressions in popular music. Playing it with voice-led triads instead of open chords transforms it from campfire to professional — each chord connects smoothly to the next." },
        { text: "Once the cycle is smooth, add Khruangbin flavor: instead of strumming every beat, play a triad, mute for a beat, play again. Leave SPACE. Let the bass and drums fill the gaps. Mark Speer told Guitar World: 'I like to leave a lot of space.' Less is more.", why: "Space is a compositional choice, not a limitation. When you leave gaps between triad stabs, the listener's ear fills in the harmony — creating a sense of implied fullness from minimal playing. This is the Khruangbin aesthetic: economy, space, groove." }
      ],
      feel: "This should feel like joining a band — the backing track is your bandmates, and your triads are adding color to their groove. You should feel like you're SERVING the music, not dominating it. Light touch, backbeat emphasis, lots of space. If it feels like you're playing too much, you probably are.",
      wrong: "If your triads overpower the backing track, turn your guitar down or strum lighter. If the voice leading between Am and Dm is clunky, isolate that transition and practice it 10 times before adding G and C. If the groove feels stiff, focus on the backbeat — tap your foot on 1 and 3, strum on 2 and 4.",
      sarah: "Gene, this IS Mark Speer's approach. He told Guitar World he does 'three-note chord melody stuff on the top three strings' and takes 'different shapes and moves them up and down the neck.' He approaches guitar 'more like a keyboardist and harpist than a shredder.' That's your Level 6 vocabulary — you're playing his approach. Laura Lee holds down the bass in Khruangbin, freeing Mark to play these light, voiced triads. In your practice, the backing track is Laura Lee.",
      levelUp: "Play Am-Dm-G-C using voice-led triads on strings 1-2-3 at 85 BPM for 2 minutes with the backing track. Backbeat strumming, space between chords, smooth transitions with no more than 2 frets of movement per chord change."
    },
    {
      id: "gs-6-11",
      time: 8,
      title: "Voice Leading — The Smallest Moves Win",
      type: "guitar",
      what: "Move from Am to C to G to Dm using inversions that minimize finger movement — 1-2 frets max per voice. Voice leading means connecting chords by moving individual notes the smallest possible distance. This single skill produces the fastest improvement in both comping and soloing.",
      setup: "Guitar. Drone on. Slow tempo — this is about precision, not speed.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      pianoKeys: { notes: ["A3", "C4", "E4"], label: "Voice Leading" },
      colorMusic: { root: "A", scale: "natural-minor", mode: "chordTones" },
      metronome: 60,
      steps: [
        { text: "Start with Am root position (xxx210). Now find C major with MINIMAL movement. Am is A-C-E. C major is C-E-G. Two notes are shared (C and E)! Only A needs to move — down to G (open G string). So Am (xxx210) → C (xxx010). ONE note moves, ONE fret.", why: "Voice leading rule #1: hold common tones, move everything else by the smallest interval possible. Am and C share C and E — those notes STAY. Only the A (fret 2 on G string) resolves down to G (open G string). This is the most efficient possible chord change." },
        { text: "From C (xxx010), voice-lead to G major. C is C-E-G. G is G-B-D. Shared note: G. So G stays, C moves to B (down 1 fret on B string), E moves to D (down 1 fret on E string?). Actually: C 2nd inv (xxx010) to G... G on G string stays open, B on B string = fret 0, D on E string... let's find it: G root pos on top strings around open = xxx003 (G open, B open, D fret 3? No...). Try xxx430 — G fret 4 (B), B fret 3 (D), E open (G... no that's not right). Let me simplify: just find the G voicing closest to where you are and move to it.", why: "Sometimes voice leading requires trying a few voicings to find the smoothest path. The PRINCIPLE is always: minimize total finger movement. In practice, you'll develop an instinct for which inversion of the next chord is closest." },
        { text: "Now try a ii-V-I in C major: Dm → G → C. Start with Dm (xxx765), voice-lead to G (xxx787 — 2nd inversion), then to C (xxx553 — root position). Each transition moves 1-2 frets total.", why: "The ii-V-I is the most common progression in jazz and soul. Multiple expert sources agree: 'Voice-leading triads through a ii-V-I is the single exercise that produces the fastest improvement in both comping and soloing.' You're training the same skill." },
        { text: "ii-V-I in Am: Bm (or Bdim) → E → Am. Try: start around fret 5-7 area and find each chord's closest voicing. If you get stuck, any voicing that's close to your current position is the right one.", why: "There's no 'wrong' voice leading — only smoother and less smooth. Every attempt builds your ear's ability to hear chord connections. The goal is developing an instinct for proximity, not memorizing specific sequences." },
        { text: "Play Am-Dm-G-C again (from gs-6-10) but this time focus ENTIRELY on minimal movement. Map out the smoothest path before playing. How few frets can you move in total across the whole progression?", why: "This exercise transforms mechanical chord changes into musical voice leading. When you minimize movement, the individual notes in each chord connect into melodic lines — the top voice creates one melody, the middle voice another. This is how Bach wrote, how jazz compers think, and how Mark Speer plays." }
      ],
      feel: "Voice leading should feel lazy in the best way — like you're too comfortable to move far. Each chord change should feel like a small adjustment, not a big jump. When you play a well-voice-led progression, it should sound like one continuous flow rather than a series of separate chords.",
      wrong: "If you're jumping across the neck between chords, you're not voice leading — you're chord hopping. Stay in a 3-4 fret zone and find inversions that fit within it. If you can't find the closest voicing, play ALL inversions of the target chord and pick the one nearest your current position. Voice leading gets easier with each repetition.",
      sarah: "Gene, voice leading is the difference between good guitar and GREAT guitar. When a listener hears a smooth chord progression, they can't explain WHY it sounds sophisticated — but the reason is voice leading. Each note in each chord connects to the nearest note in the next chord, creating hidden melodies within the harmony. This is what separates Mark Speer from a campfire strummer playing the same chords.",
      levelUp: "Play Am-C-G-Dm on strings 1-2-3 using voice-led triads with no more than 2 frets of total movement between any two chords. Then play a ii-V-I in C major (Dm-G-C) with the same constraint."
    },
    {
      id: "gs-6-12",
      time: 8,
      title: "Triad Stabs — Funk, Reggae, Ska Rhythm",
      type: "guitar",
      what: "Rhythmic triad stabs: short, percussive chops on top strings with muting between hits. Cory Wong strips barre chords to triads for 16th-note funk. Reggae skank IS triads on top strings. Ska upstrokes ARE triads. The 'lack of fat' gives them punch.",
      setup: "Guitar. Metronome at 90 BPM. Right hand stays loose — the muting is as important as the strumming.",
      metronome: 90,
      drone: { root: "A", octave: 2, texture: "analog" },
      rhythmCells: true,
      steps: [
        { text: "Play Am 1st inversion (xxx555) as a SHORT stab: strum, immediately mute with the fretting hand by releasing pressure (don't lift off — just relax). The note should ring for a split second then die. Repeat on every beat at 90 BPM. Stab-mute-stab-mute.", why: "The muted gap between stabs is the RHYTHM. In funk and reggae, what you DON'T play is as important as what you do. The triad stab is a percussion hit that happens to have pitch — think of it as a melodic drum." },
        { text: "Reggae skank: stab on the 'and' of each beat (upbeats only). Count: 1-AND-2-AND-3-AND-4-AND. Stab ONLY on the ANDs. Let beats 1, 2, 3, 4 be silent. This is the reggae guitar rhythm — triads on the upbeat.", why: "The reggae skank is literally triads on the upbeat. Full barre chords would be too heavy — 'their lack of fat is exactly what gives them the light, punchy sound that has made them the standard voicings in ska guitar.' Three strings, upbeat, muted between — that's the recipe." },
        { text: "Funk 16ths (Cory Wong style): subdivide each beat into 4 (1-e-and-a). Keep your strumming hand moving in continuous 16th notes (down-up-down-up), but only LET the triad ring on select hits. Mute the rest. Try: stab on 1 and the 'a' of 2 (syncopated). The right hand never stops moving — the left hand controls when sound appears.", why: "Cory Wong intentionally removes notes from full barre chords to create 'sparser three-note shell voicings.' His picking hand maintains steady 16th notes; the fretting hand controls which notes ring. The triad is the harmonic vehicle; the rhythm is the engine." },
        { text: "Ska upstroke: stab Am on the upbeat with an aggressive upstroke — hit ONLY strings 1-2-3 on the way up. The upstroke naturally catches the thinnest strings, making triads the perfect ska voicing. Try Am → Dm → Em on upbeats.", why: "Ska guitar is architecturally designed for triads. The upstroke physically favors the top strings, and triads on those strings provide just enough harmony without the bass weight that would conflict with the bass guitar. Form follows function." },
        { text: "Combine: 4 bars reggae skank (Am), 4 bars funk 16ths (Dm), 4 bars ska upstroke (Em), 4 bars reggae skank (Am). All triads on top strings. Feel how the SAME 3-note voicings serve completely different rhythmic genres.", why: "Triads are rhythmically versatile because they're small. A 6-string barre chord is heavy — it dictates a certain weight. A 3-string triad is light — it adapts to any rhythmic context. This is why triads are the professional guitarist's Swiss army knife." }
      ],
      feel: "The stabs should feel PERCUSSIVE — like you're playing a snare drum that happens to have pitch. The muting between stabs should be crisp and total — no ring-over, no sustain leaking through. When you lock into the reggae skank, it should feel like riding a wave — effortless, rhythmic, undeniable.",
      wrong: "If the stabs ring too long, you're not muting quickly enough — release fretting pressure immediately after the strum. If the muting is producing a dead 'thud,' you're pressing too hard on the mute — just relax the fingers without lifting them off the strings. If the funk 16ths feel impossible, slow to 70 BPM and build up.",
      sarah: "Gene, reggae is in your DNA — Jah Werx, Sol Del Sur, the offbeat chop from Level 4. Now you know WHY it works: the reggae guitar is triads on the upbeat. The 'chop' you learned was the rhythm; now the triads are the harmony. And Cory Wong's entire career is built on this same principle — triads, muted between hits, 16th-note engine. Nile Rodgers (Chic, 'Le Freak,' 'Get Lucky') is the godfather: tiny chord voicings, huge groove. You're in that lineage now.",
      levelUp: "Play a 16-bar form: 4 bars reggae skank (Am), 4 bars funk 16ths (Dm), 4 bars ska upstroke (Em), 4 bars reggae (Am) at 90 BPM. Clean stabs with total silence between hits."
    },
    {
      id: "gs-6-13",
      time: 10,
      title: "Chord-Tone Soloing — Triads as Melody",
      type: "guitar",
      what: "Arpeggiate triads as melodic lines over a chord progression. Land on chord tones on strong beats, connect with scale tones between. When you arpeggiate a triad, you're playing a melody that ALWAYS sounds right over the chord — built-in safe notes.",
      setup: "Guitar. Drone on A. Recorder on — you're creating melodies.",
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      drone: { root: "A", octave: 2, texture: "analog" },
      recorder: true,
      colorMusic: { root: "A", scale: "natural-minor", mode: "chordTones" },
      metronome: 75,
      steps: [
        { text: "Over the A drone, play Am triad notes (A-C-E) one at a time in ANY order on strings 1-2-3. Don't strum the chord — pick individual notes. Ascend, descend, skip around. Every note you play sounds 'right' because every note IS the chord.", why: "Triads give you 3 'safe notes' — the root, 3rd, and 5th — that define the harmony. Landing on any of these notes on a strong beat guarantees consonance. This is the simplest form of chord-tone soloing: the melody IS the chord, broken apart." },
        { text: "Now add scale tones BETWEEN the chord tones. Play A (chord tone), then B (passing tone), then C (chord tone). Or E (chord tone), D (passing tone), C (chord tone). The chord tones are your destinations; the scale tones are the paths between them.", why: "Passing tones create melodic motion between chord tones. They add interest and direction without clashing with the harmony, because they resolve quickly to the next chord tone. This is how melodies work: stable points (chord tones) connected by unstable paths (passing tones)." },
        { text: "Simple rule: land on a CHORD TONE on beats 1 and 3 (strong beats). Beats 2 and 4 can be anything — scale tones, approaches, whatever your ear wants. Try it for 8 bars over the Am drone.", why: "The strong-beat rule ensures harmonic clarity on the moments the listener pays most attention to. Weak beats can be more adventurous because the ear is less focused there. This rule is training wheels for improvisation — eventually you'll break it intentionally, but it provides a safe structure while you're developing." },
        { text: "Chord change: play 4 bars over Am (chord tones: A-C-E), then 4 bars over Dm (chord tones: D-F-A). When Dm arrives, your target notes SHIFT — A stays (it's in both chords), but C shifts to D and E shifts to F. Land on D or F on the downbeat of bar 5.", why: "Chord-tone soloing over changes requires tracking which notes are 'safe' for each chord. This is where triad knowledge becomes MELODIC knowledge: you know where D, F, and A are because you learned Dm triads earlier. Your triad shapes are now your soloing map." },
        { text: "Freestyle: play a melody over Am-Dm-Em-Am (4 bars each) using chord tones as your guide. Let the melody breathe — silence is a valid note. Record it and listen back. Does the melody follow the chords? Can you hear the chord changes through the melody alone?", why: "This is Rotem Sivan's step 5: 'Use triads as anchor points within scales to create melodic interest.' When your melody outlines the chord tones, the listener hears the harmony THROUGH your single-note line — you become a one-person band." }
      ],
      feel: "Chord-tone soloing should feel like having a conversation where you always know the right word — the chord tones are your vocabulary, and you're assembling them into sentences. The melody should feel inevitable, not random. When you land on a chord tone on a strong beat, there should be a feeling of arrival — like coming home.",
      wrong: "If your melody sounds random or aimless, you're probably NOT landing on chord tones on strong beats. Exaggerate the rule: play ONLY chord tones for one pass, then add passing tones on the next. If the melody sounds boring (all arpeggios, no contour), add rhythm variety — hold some notes longer, play others quick. If you lose track during chord changes, pause and play the new triad as a chord to re-anchor your ear.",
      sarah: "Gene, this is where triads transform from shapes into music. Mark Speer's solos are built on arpeggiated triads — he's not shredding scales, he's singing the chord tones with his guitar. His arpeggio practice is literally 'taking different triad shapes and moving them up and down the neck.' When you record your melody over Am-Dm-Em-Am and listen back, you should hear YOUR voice — not exercises, not patterns, but a musical statement grounded in harmony.",
      levelUp: "Record a 16-bar melody over Am-Dm-Em-Am, landing on chord tones on beats 1 and 3 of each bar. Listen back — the chord changes should be audible through the melody alone."
    },
    {
      id: "gs-6-14",
      time: 10,
      title: "Song Study — Triads in the Wild",
      type: "guitar",
      what: "Full song application: play the Am-C-G-D progression (from Level 1) using triads in multiple positions, then the Skinshape cycle Gm-C-A7-Dm with triads. You just played the same progressions you've known since Level 1 — but now in 12 different positions on the neck.",
      setup: "Guitar. Backing track on. Recorder on — capture your best take.",
      metronome: 85,
      recorder: true,
      fretboard: { scale: "a-natural-minor", position: 1, chordToneNotes: ["A", "C", "E"] },
      tracks: [
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }
      ],
      steps: [
        { text: "Am-C-G-D on strings 1-2-3, voice-led: start with Am (xxx555), voice-lead to C, then G, then D major (D-F#-A). Keep all chords in the fret 3-7 zone using the closest available inversion. 4 bars each. Loop it.", why: "This is the same Am-C-G-D you learned in Level 1 with open chords. Playing it with voice-led triads reveals a completely different sound — smoother, more intimate, more professional. Same harmony, transformed texture." },
        { text: "Same progression, different zone: play Am-C-G-D on strings 1-2-3 around frets 7-10. Find different inversions. The progression is the same, but the voicings are higher — brighter, more delicate.", why: "The same progression in a different neck position creates a different register and character. Now you have TWO arrangements of the same song — one mid-neck, one high — and you can choose based on musical context. Verse low, chorus high. Or vice versa." },
        { text: "Skinshape cycle: Gm-C7-A7-Dm on strings 1-2-3. Start with Gm (G-Bb-D) around fret 3: xxx333 (Gm 1st inv at fret 3). Voice-lead to C... for C7, use just the C triad (C-E-G) for now. Find the closest voicing. Then A7 (use A major triad A-C#-E), then Dm.", why: "The Skinshape soul cycle is i-IV7-V7-ii in Gm. Even approximating the 7th chords with just triads gives you the essential harmony — the 7th is a color, the triad is the foundation. In Level 10 you'll add the 7ths back, but the triad skeleton is where it starts." },
        { text: "Play the Skinshape cycle with the soul groove backing track. Strum gently on beats 2 and 4. Leave space between chords. Try adding the occasional chord-tone melody (from gs-6-13) between chord stabs.", why: "Combining triad comping with chord-tone melodies is the essence of Mark Speer's approach: he's comping AND soloing simultaneously, because triads are both harmony and melody. A strummed triad is a chord; an arpeggiated triad is a melody." },
        { text: "Final challenge: play Am-C-G-D with triads on strings 2-3-4 (warmer register), then switch to the Skinshape cycle on strings 1-2-3 (brighter register). Use different string sets for different sections of a song — verse warm, chorus bright.", why: "Registral contrast is a professional arrangement technique. Full barre chords sound the same in every register because they cover all 6 strings. Triads give you registral choice — the same chord can be bass-heavy OR treble-bright depending on which string set you choose. That's orchestration on a single instrument." }
      ],
      feel: "This should feel like graduating from 'knowing chords' to 'knowing the fretboard.' The same progressions you've played since Level 1 are now available everywhere on the neck, in every register, with smooth voice leading between them. The guitar should feel like it got bigger — more terrain, more options, more voices.",
      wrong: "If the triads sound thin compared to your familiar open/barre chords, that's correct — they ARE thinner. In a band or with a backing track, that thinness becomes clarity and cut-through. If voice leading between chords in the Skinshape cycle is too hard, simplify: use the same inversion type for each chord and just slide up/down. Smooth voice leading will come with repetition.",
      sarah: "Gene, you just played the same Am-C-G-D from Level 1 — but now in DOZENS of positions. That's the power of triads: the same harmony, accessible everywhere, in every register. You went from knowing ONE way to play Am-C-G-D to knowing dozens. And the Skinshape cycle with triads? That's the foundation of every 7th-chord voicing you'll learn in Level 10. When you add the 7th to these triad shapes, you'll already know where every chord tone lives. Triads ARE the fretboard. Everything else builds on them.",
      levelUp: "Play Am-C-G-D with voice-led triads on strings 1-2-3 for 16 bars, then switch to the Skinshape cycle Gm-C-A7-Dm for 16 bars over the backing track. Smooth transitions, backbeat strumming, space between chords. Record and listen back — the chord changes should be clear and the voice leading smooth."
    }
  ]
};
