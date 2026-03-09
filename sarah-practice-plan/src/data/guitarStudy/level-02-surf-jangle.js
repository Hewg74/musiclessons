export const level2 = {
  level: 2,
  title: "Surf & Jangle",
  subtitle: "Bright reverb, tremolo shimmer, and sun-bleached chords. Gene's #1 genre.",
  description:
    "Surf guitar is the sound of the ocean — Mixolydian melodies, tremolo picking, and shimmering jangle voicings over driving rhythms. This level combines the classic surf vocabulary of The Ventures with the modern psych-jangle of Allah-Las and Sun Room. You'll learn the Mixolydian scale (correctly attributed — it's 'Walk Don't Run,' not 'Misirlou'), tremolo picking, sus2 voicings, double stops, and reverb as an instrument.",
  artists: "Sun Room, Allah-Las, The Ventures, Dick Dale",
  unlocks: "Psych-Garage (Level 3)",
  review: { label: "Level 1 Check-In", time: 5, exercises: ["gs-1-1", "gs-1-8"], prompt: "Play the Am pentatonic ascending and descending cleanly (gs-1-1). Then jam for 2 minutes with call-and-response phrasing over a backing track (gs-1-8). If the scale feels unfamiliar or the improv feels impossible, revisit Level 1." },
  exercises: [
    {
      id: "gs-2-1",
      time: 10,
      title: "Mixolydian — The Surf Scale",
      type: "guitar",
      referencePitches: ["G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3"],
      fretboard: { scale: "g-mixolydian", position: 1 },
      what: "Learn the G Mixolydian scale: G-A-B-C-D-E-F (NOT F#). It's a major scale with a flatted 7th — the sound of classic surf instrumentals like The Ventures' 'Walk Don't Run.' Important: Mixolydian is NOT the sound of 'Misirlou' or 'Pipeline' — those use different scales you'll learn in Level 3.",
      setup: "Clean, bright tone. Spring reverb if you have it. Neck or middle pickup.",
      steps: [
        { text: "Play a G major scale: G-A-B-C-D-E-F#-G. Now lower the F# to F natural (one fret lower). That's G Mixolydian: G-A-B-C-D-E-F-G. Play both scales back to back to hear the difference.", why: "Mixolydian is one note different from major. That flatted 7th (F instead of F#) gives it a bright-but-not-quite-resolved quality — it sounds happy but with an edge. Regular major sounds like a marching band. Mixolydian sounds like a wave." },
        { text: "Play G Mixolydian in the 3rd fret position. Start on the low E string, 3rd fret (G). Map the whole scale across all 6 strings, ascending and descending. One note per click at 60 BPM.", why: "The 3rd fret position puts the root G on the low E string, giving you a strong foundation for surf riffs. This position covers the low, powerful register." },
        { text: "Move to the 7th-8th fret area — Position 2. Find G Mixolydian here. The root is now on the D string. This is the middle, melodic register — where 'Walk Don't Run' style surf leads live.", why: "Two positions give you enough range for any surf solo. Low position for power, middle position for melody." },
        { text: "Compare: play 4 notes of G Mixolydian, then 4 notes of Am pentatonic. They're different moods entirely. Mixolydian is bright and driving. Pentatonic is darker and bluesier. You now have two colors.", why: "Having two different scales to choose from is exponentially more powerful than having one. The contrast between them creates musical interest." },
        { text: "Play the scale with maximum reverb and a bright, clean tone. If you don't have reverb, imagine it. This is the surf sound — the scale comes alive with the right sonic environment.", why: "Surf guitar is as much about tone as notes. Mixolydian + reverb + clean tone = instant California coastline." }
      ],
      feel: "Mixolydian should feel brighter and more confident than pentatonic — like stepping out of a smoky club into sunlight. The flatted 7th gives it swagger without sadness.",
      wrong: "If it sounds like a regular major scale, you're probably playing F# instead of F natural. If it sounds bluesy, you've slipped back into pentatonic territory. Listen for the brightness — Mixolydian should make you want to move, not brood.",
      sarah: "Mixolydian is the 'almost happy' scale. It's major enough to feel good but that flatted 7th keeps it interesting. It's why surf guitar never sounds cheesy — there's always an edge. The Ventures used this scale on nearly every instrumental.",
      metronome: 60
    },
    {
      id: "gs-2-2",
      time: 10,
      title: "Tremolo Picking — Even Strokes",
      type: "guitar",
      recorder: true,
      what: "Develop rapid, even alternate picking on a single string. Tremolo picking is the engine of surf guitar — it turns a single note into a shimmering wave of sound. Alternate picking means strict down-up-down-up — every other stroke changes direction.",
      setup: "Use a medium-thickness pick with a pointed tip. Clean tone with reverb. Relax your wrist completely.",
      steps: [
        { text: "Pick a single open string (the high E). Alternate down-up-down-up at 80 BPM, eighth notes (2 picks per beat). Every stroke should be the same volume. Focus on your pick hand — the motion comes from the WRIST, not the elbow or forearm. Small, controlled movements.", why: "Even strokes are the foundation. Most players have a louder downstroke and a weaker upstroke — you need to fix that before anything else. Wrist picking is efficient and sustainable. Elbow picking causes fatigue and sounds uneven." },
        { text: "Move to a fretted note: 5th fret, B string. Same exercise — alternate picking, even volume. Fretted notes require slightly more pick attack than open strings.", why: "Fretted notes feel different under the pick. Adjusting your pressure for different playing contexts is a core skill." },
        { text: "Build speed: 80, 90, 100 BPM with eighth notes. Then switch to sixteenth notes (4 picks per beat) at 60, then 70 BPM. Sixteenth notes at 60 BPM is the true tremolo sound — that's where the shimmer lives.", why: "Sixteenth notes at 60 BPM = the same pick speed as eighth notes at 120. But the subdivision forces more control. At 70 BPM sixteenths, you're picking at real surf speed." },
        { text: "Record 30 seconds of your best tremolo and listen back. Are the upstrokes as loud as the downstrokes? Does it shimmer evenly, or does it gallop (da-DUM-da-DUM)? Be brutally honest.", why: "Recording reveals what your ears miss in the moment. Uneven tremolo sounds wobbly. Even tremolo sounds like a shimmering wave. The recording is your truth mirror." }
      ],
      feel: "Good tremolo picking feels effortless — your wrist is loose, the pick barely touches the string, and the sound shimmers like sunlight on water. It should feel like the pick is bouncing, not digging.",
      wrong: "If your arm gets tired after 30 seconds, you're using too much motion — the movement should be tiny, all from the wrist. If the picking sounds galloping (da-DUM-da-DUM instead of even diddle-diddle-diddle), your down and up strokes aren't equal.",
      sarah: "Dick Dale picked so fast it sounded like a machine. But watch his right hand — it's completely relaxed. Tension is the enemy of tremolo. Relax your wrist and the speed will come.",
      metronome: 80,
      speedLadder: { start: 80, end: 110, increment: 10, bars: 4 },
      levelUp: "You can tremolo pick a single note for 30 seconds with perfectly even volume on both strokes. Sixteenth notes at 70 BPM, clean."
    },
    {
      id: "gs-2-3",
      time: 10,
      title: "Jangle Voicings — Sus2 & Open Strings",
      type: "guitar",
      what: "Learn the chord voicings that define jangle guitar: Dsus2, Asus2, and open-string shimmer shapes. These voicings leave open strings ringing against fretted notes, creating a bell-like, shimmering quality. Important music theory: Dsus2 means 'D suspended 2nd' — the 3rd of the chord is replaced by the 2nd. Asus2 means 'A suspended 2nd' — same idea.",
      steps: [
        { text: "Play Dsus2: xx0230. That's the open D string (D), the A on the G string 2nd fret, the D on the B string 3rd fret, and the open high E string (E). The notes are D-A-D-E. Compare to standard D major (xx0232) — the Dsus2 replaces the F# (3rd) with E (2nd). It sounds more open and dreamy.", why: "A 'sus2' chord suspends the 3rd — removes it and replaces it with the 2nd. Without the 3rd, the chord is neither major nor minor. This ambiguity is the foundation of jangle guitar. The open high E string shimmering against the fretted notes is the jangle sound." },
        { text: "Play Asus2: x02200. That's the open A (A), the E on the D string 2nd fret, the A on the G string 2nd fret, and the open B (B) and open high E (E). The notes are A-E-A-B-E. There's no C# (the 3rd) — that's what makes it sus2, not a standard A major. Note: this is NOT 'Aadd9.' An Aadd9 would need the C# present (the 3rd) plus the B (9th) — for example, x02420 (A-E-A-C#-B). Asus2 has no 3rd at all.", why: "Getting chord names right matters because it tells you what the chord is doing harmonically. Asus2 removes the 3rd for ambiguity. Aadd9 keeps the 3rd and adds the 9th for richness. Different sounds, different purposes." },
        { text: "Open-string shimmer technique: barre the A and D strings at the 2nd fret while leaving the G, B, and high E strings open. Strum all strings. The open strings create a constant drone while the fretted bass notes change. Move the barre to the 4th fret, then 5th, then 7th — the open strings stay the same while the mood shifts.", why: "Open-string shimmer voicings are the secret weapon of bands like Allah-Las and Sun Room. Each fret position creates different intervals against the constant open strings — some consonant and warm, others dissonant and mysterious." },
        { text: "Strum Dsus2 → Asus2 → G (320003) → Em (022000) with a light, even eighth-note strum. Let every chord ring for a full bar. Use a thin pick or your fingers for a lighter attack. This is a jangle progression — it should shimmer.", why: "Light strumming keeps the open strings ringing and preserves the jangle quality. Heavy pick attack kills jangle. The lighter your touch, the more the overtones sing." }
      ],
      feel: "Your guitar should sound like a bell choir — bright, ringing, and spacious. The open strings should create a halo of overtones around each chord. When you hit the right voicing with the right touch, the guitar seems to glow.",
      wrong: "If the chords sound muddy, you're strumming too hard or muting open strings accidentally. If they sound thin, check that all the open strings are ringing clearly. If they sound like regular chords, make sure you're using the sus2/open string voicings, not standard shapes.",
      sarah: "Jangle guitar is about finding the magic in simple shapes. One open string can transform a boring chord into something transcendent. This is how Sun Room and Allah-Las make $200 guitars sound like cathedrals.",
      metronome: 100
    },
    {
      id: "gs-2-4",
      time: 10,
      title: "Double Stops — Surf 3rds & 6ths",
      type: "guitar",
      fretboard: { scale: "g-mixolydian", position: 1 },
      what: "Play two notes simultaneously — called a 'double stop' — to create the thick, harmonized sound of classic surf guitar. You'll learn 3rds and 6ths, which are the two most common double-stop intervals in surf. IMPORTANT: on strings 1 and 2 (high E and B), the same fret produces a PERFECT 4TH (because B to E is a 4th), NOT a 3rd. To get 3rds on those strings, you need offset frets.",
      steps: [
        { text: "UNDERSTANDING THE STRINGS: The B string and the high E string are tuned a perfect 4th apart (B to E = 5 semitones). This means if you play the same fret on both strings — say, 5th fret on both — you get E and A, which is a 4th, NOT a 3rd. This is different from most other string pairs, which are tuned in 4ths but produce different intervals when barred. Keep this in mind for all double-stop work on strings 1 and 2.", why: "Most guitar instruction glosses over this. If someone tells you to play 'parallel 3rds' by barring the same fret on strings 1 and 2, they're giving you 4ths. Getting the intervals right matters — 3rds and 4ths sound completely different." },
        { text: "3RDS ON STRINGS 1 & 2 (correct shapes): For a major 3rd, play the B string one fret HIGHER than the high E string. Example: B string 5th fret (E) + high E string 4th fret (G#) = major 3rd (E to G#, 4 semitones). For a minor 3rd, play the B string one fret higher and the E string one fret lower: B string 5th fret (E) + high E string 3rd fret (G) = minor 3rd (E to G, 3 semitones). Slide these shapes chromatically up and down — that's the classic surf walk-up sound.", why: "Correct 3rds on strings 1&2 require offset frets because of the B-E tuning. Once you have the shapes, you can slide them anywhere for instant surf harmony." },
        { text: "3RDS ON STRINGS 2 & 3 (easier): On these strings (G and B), the tuning interval is a major 3rd (G to B = 4 semitones), so the shapes are different. Play diatonic 3rds in G Mixolydian: walk up the scale playing two strings at a time. The shape naturally alternates between major and minor 3rds as you follow the scale.", why: "Diatonic double stops — following the scale instead of using one fixed shape — sound more musical than chromatic ones. They're what The Ventures used in 'Walk Don't Run.'" },
        { text: "6THS ON STRINGS 1 & 3: Skip string 2 entirely. Play the G string and high E string together. Example: G string 5th fret (C) + high E string 5th fret (A) = a 6th. These have a sweet, wide, open sound. Walk them up through G Mixolydian.", why: "6ths are inverted 3rds — they contain the same notes but spread across a wider interval. They sound more open and are perfect for melodic surf hooks. Because you skip a string, each note gets more room to breathe." },
        { text: "Create a simple surf riff: walk up in 3rds on strings 2 & 3, hold the top double stop for 2 beats, then walk back down. Add reverb if you have it. This single idea is a complete musical statement.", why: "Double-stop riffs are the backbone of surf guitar. They don't need a rhythm guitar backing them up — they carry melody and harmony simultaneously." }
      ],
      feel: "Double stops should ring clearly — both notes sustaining equally. They sound full and powerful compared to single notes, like a two-voice choir. When you slide them chromatically, they should shimmer and glide.",
      wrong: "If one string is muted or buzzing, adjust your fretting-hand angle. If the double stops sound muddy, check that you're not accidentally touching the string between them (especially for 6ths where you skip string 2). If your '3rds' on strings 1&2 sound hollow or open, you're probably playing 4ths — check the fret offset.",
      sarah: "The Ventures built a career on double stops. 'Walk Don't Run' is essentially a double-stop etude disguised as a hit single. Simple idea, perfect execution. Now you know the correct shapes — many guitarists play these wrong for years.",
      metronome: 100
    },
    {
      id: "gs-2-5",
      time: 10,
      title: "Surf Licks over Backing Track",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "g-mixolydian", position: 1 },
      what: "Build a vocabulary of short surf guitar phrases — combining Mixolydian lines, double stops, and tremolo picking — and play them over a surf rock backing track. This is where exercises become music.",
      tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Lick 1 — The Walk-Up: play ascending 3rds on strings 2 & 3, starting from the 3rd fret area. Walk up 4 positions chromatically, then hold the top double stop with tremolo picking. Classic surf opener.", why: "The chromatic walk-up is the most recognizable surf guitar move. Starting your lick vocabulary with it gives you an instantly usable tool." },
        { text: "Lick 2 — Tremolo Melody: pick a simple 4-note Mixolydian melody in the high register (10th-12th fret area). Tremolo pick each note for 2 beats. The melody should shimmer and float above the driving beat.", why: "Tremolo-picked melodies are the heart of surf lead guitar. The melody is simple — the tremolo picking is what gives it the surf character." },
        { text: "Lick 3 — Mixolydian Run: play G Mixolydian descending from the high G (15th fret, high E) down to the low G (3rd fret, low E), 4 notes at a time with a pause between each group. This is a 'tumbling' run that builds momentum.", why: "Descending runs create a sense of crashing energy — like a wave breaking. Grouping notes in fours with pauses gives the run rhythmic shape." },
        { text: "Put on Surf Rock Beat 120. Drop your licks in with space between them — don't fill every beat. Play a lick, leave 4-8 beats of silence, play another. Mix Mixolydian lines with double stops and tremolo sections.", why: "Space between licks is what makes them land. Wall-to-wall playing sounds nervous and amateur. Professional surf guitarists play LESS than you'd expect." }
      ],
      feel: "When a lick sits right in the groove, you'll feel it lock in with the beat — like the phrase was always supposed to be there. That's the pocket. Surf guitar should feel like riding a wave: momentum, energy, and a sense of being carried by the rhythm.",
      wrong: "If you're playing licks as fast as possible with no gaps, it sounds like you're showing off instead of making music. If the licks don't match the beat, you're not listening to the track. Surf is about riding the beat, not fighting it.",
      sarah: "You now have three licks. That's enough for a surf guitar solo — seriously. Three ideas with space between them beats a hundred ideas crammed together every time.",
      metronome: 120
    },
    {
      id: "gs-2-6",
      time: 10,
      title: "Song: Sun Room — Sol Del Sur Style",
      type: "guitar",
      fretboard: { scale: "g-mixolydian", position: 1, highlight: ["F3"] },
      what: "Play a jangly, reverb-drenched progression in the style of Sun Room's 'Sol Del Sur.' The song lives in a bright, sunny major territory — think I-iii-vi movement with open-string voicings and a relaxed, swaying strum.",
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "The progression uses bright, open voicings. Start with a simple framework: play G major (320003) → Bm (x24432 or the easier xx4432) → Em (022000) → C (x32010). This I-iii-vi-IV movement has the optimistic, sun-soaked quality of Sun Room's writing. Strum with a light, bouncy eighth-note pattern.", why: "Sun Room's chord choices are deliberately simple but voiced with open strings wherever possible. The I-iii-vi-IV movement creates a sense of forward motion that never fully resolves — it keeps cycling, which is the 'endless summer afternoon' feeling." },
        { text: "Replace the standard voicings with jangle versions where you can: instead of G, try G with the open B string ringing (320003 — it already does). Instead of C, try Cadd9 (x32030) — adding the open D string. Instead of Em, let all open strings ring. The more open strings, the more shimmer.", why: "Sun Room's guitar sound is built on letting as many open strings ring as possible. The open strings create a constant shimmering backdrop that makes everything sound bigger than it is." },
        { text: "Add reverb — as much as you have. Surf-jangle guitar is reverb-dependent. If you don't have reverb, play in a bathroom or stairwell for natural reflection. The reverb is as important as the chords.", why: "Reverb is not decoration in surf-jangle — it's a core part of the instrument. Without it, the same voicings sound flat and thin. With it, they bloom into a three-dimensional sound." },
        { text: "Play the full progression 8 times through, keeping the strum light and bouncy. On the last 2 times, try arpeggiation — pick through each chord one string at a time instead of strumming. Let the notes overlap and ring together.", why: "Arpeggiated jangle creates a more intimate, detailed version of the same progression. It's how Sun Room transitions between big chorus energy and quieter verse sections." }
      ],
      feel: "This should feel like a sunny afternoon at the beach — effortless, bright, and slightly nostalgic. The chords should ring and shimmer. You should feel the warmth of the major harmony.",
      wrong: "If it sounds dark or heavy, you're strumming too hard or using the wrong voicings. If it sounds thin, add more open strings and more reverb. If it sounds stiff, relax your strumming hand and let the wrist be looser.",
      sarah: "Sun Room is proof that you don't need complex chords to make beautiful music. Simple voicings + open strings + reverb + the right attitude = magic. This is Gene's sound.",
      metronome: 100
    },
    {
      id: "gs-2-7",
      time: 10,
      title: "Song: Allah-Las — Catamaran Style",
      type: "guitar",
      recorder: true,
      what: "Play a dark, reverb-drenched minor progression in the style of Allah-Las. This is surf guitar's shadowy side — minor chords, hypnotic repetition, and a mood that's introspective rather than sunny. The progression is Am → C → D → Dm — a psych-jangle minor movement.",
      setup: "Lots of spring reverb. Clean tone. Tremolo effect if available.",
      steps: [
        { text: "Play the progression: Am (x02210) → C (x32010) → D (xx0232) → Dm (xx0231). Each chord gets 1 bar (4 beats). Strum with a steady eighth-note pattern. The move from D major to Dm (just the F# dropping to F) is the emotional pivot — it darkens everything.", why: "Allah-Las use minor-key progressions with subtle major-to-minor shifts that create a hypnotic, slightly unsettling quality. The D to Dm move is a classic psych trick — borrowing from the parallel minor." },
        { text: "Play the progression with maximum reverb. Let each chord wash into the next — don't mute between changes. The reverb tail of one chord should overlap with the start of the next. This creates the 'wall of shimmer' that defines the Allah-Las sound.", why: "In reverb-heavy styles, the space between chords is filled by the reverb trail. Muting between chords kills the atmosphere. Let everything bleed together." },
        { text: "Create a hypnotic loop: play the progression 8 times without stopping. Don't vary anything. Same strum, same dynamics, same tempo. Hypnosis comes from patience and repetition — not from adding things.", why: "Allah-Las songs are built on hypnotic repetition. The same 4-chord loop played 16 times creates a trance state that complex chord changes never achieve. Trust the repetition." },
        { text: "On the 9th time through, add a single-note Am pentatonic fill between chords — just 2-3 notes that echo the vocal melody. Then go back to straight chords. The fill should be a brief departure, not a solo.", why: "Allah-Las guitarists drop in tiny fills that appear and disappear like shadows. They're not soloing — they're adding color. Restraint is the philosophy." }
      ],
      feel: "This should feel dreamy and slightly dark — like surf guitar played at midnight. The reverb should fill the space between your notes with atmosphere. Imagine a beach bonfire, not a beach party.",
      wrong: "If it sounds like standard surf guitar, you're playing too bright and too fast. If it sounds like blues, you're bending too much. Allah-Las is straight, dark, and patient — no bends, no flash, just mood.",
      sarah: "The Allah-Las proved that surf guitar doesn't have to be fast or happy. Sometimes the most powerful surf sound is a minor-key riff and a lot of reverb. This is the dark side of the wave.",
      metronome: 100
    },
    {
      id: "gs-2-8",
      time: 10,
      title: "Allah-Las Lead Style",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "am-pentatonic", position: 1 },
      what: "Play minor-key lead lines in the style of Allah-Las — using the A natural minor scale (also called Aeolian mode): A-B-C-D-E-F-G. Natural minor means all the notes are from the key signature with no sharps or flats added. Aeolian is just another name for the same thing — a mode built on the 6th degree of the major scale. The sound is darker and moodier than pentatonic, with more melodic options.",
      steps: [
        { text: "Play A natural minor (Aeolian): A-B-C-D-E-F-G-A in the 5th fret position. Compare it to Am pentatonic (A-C-D-E-G) — natural minor adds two notes: B (the 2nd) and F (the 6th). These extra notes give you more melodic possibilities.", why: "You already know 5 of the 7 notes from the pentatonic. Adding B and F expands your palette without requiring a completely new shape. Think of it as pentatonic plus two bonus colors." },
        { text: "Play short, repeating melodic loops — 4-6 notes that cycle hypnotically. Use the F (6th) as a featured note — it gives the lines a melancholy quality that the pentatonic doesn't have. Example loop: E-F-E-D-C-A, repeated.", why: "Allah-Las lead lines are about repetition and mood, not virtuosity. A short loop played 8 times creates more atmosphere than a long, wandering solo. The F note is what makes it sound 'minor' rather than just 'pentatonic.'" },
        { text: "Let every note ring into the next. Use slides instead of picking each note separately. Play near the neck for a warmer, rounder tone. With reverb, the notes should bleed together into a wash of sound.", why: "Jangly, reverb-drenched minor leads are about texture as much as notes. The slide technique and warm tone placement create the dreamy quality that defines this style." },
        { text: "Play your loops over the Am → C → D → Dm progression from the previous exercise (or just strum Am and let it ring). The lead lines should float on top of the chord atmosphere, not fight it.", why: "In the Allah-Las style, lead guitar is a color, not a spotlight. It should enhance the mood without demanding attention. Think 'incense in the room' — you notice it but it doesn't shout." }
      ],
      feel: "This should feel meditative and dark — like a single guitar voice in a reverb-filled room. The repetition should become hypnotic. If you close your eyes, you should feel the mood shift from 'playing guitar' to 'inhabiting a sound world.'",
      wrong: "If your leads sound like blues solos, you're bending too much and playing too assertively. Allah-Las leads are STRAIGHT — no bends, no vibrato, just clean notes into reverb. If the lines are too busy, simplify to 3-4 notes and repeat more.",
      sarah: "The Allah-Las style is proof that minor-key surf leads don't need speed or flash. A 4-note loop with the right mood and enough reverb can be more haunting than any shred solo.",
      metronome: 100
    },
    {
      id: "gs-2-9",
      time: 12,
      title: "Extended Surf Jam",
      type: "guitar",
      recorder: true,
      what: "Combine everything from Level 2: Mixolydian melodies, tremolo picking, jangle voicings, double stops, and Allah-Las minor lines over a surf rock backing track. This is your full surf vocabulary in action.",
      setup: "Bright clean tone with reverb. Record yourself.",
      tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Put on Surf Rock Beat 120. Start with jangle chord voicings — Dsus2, Asus2, G, Em. Arpeggiate them for 2 minutes. Establish the shimmering foundation before adding lead.", why: "Starting with chords grounds the performance. It establishes the harmonic landscape that your lead lines will explore." },
        { text: "Transition into Mixolydian surf leads. Use double stops to walk up, then tremolo-pick a melody in the high register. Move between your two Mixolydian positions. Play for 3 minutes.", why: "The surf lead section is where tremolo, Mixolydian, and double stops all come together. This is the vocabulary of classic surf instrumental guitar." },
        { text: "Drop into an Allah-Las section — darker, more spacious, Am natural minor lines with lots of reverb. Let the mood shift. Play for 3 minutes.", why: "The contrast between bright Mixolydian surf and dark Aeolian jangle creates narrative tension. It's like two sides of the same ocean — sunny surface and dark depths." },
        { text: "Build to a climax: tremolo-pick a Mixolydian melody in the highest position you can find, then resolve with a final double-stop riff descending back to home position. End on a G chord with reverb ringing out.", why: "A clear climax and resolution makes 12 minutes feel like a complete musical statement, not just noodling." },
        { text: "Listen back to your recording. Where did you sound most like yourself? Where did a phrase really land? Where did you rush or lose the groove? These observations are gold.", why: "Self-evaluation after recording is where 80% of the learning happens. The recording doesn't lie — it shows you exactly where you are." }
      ],
      feel: "This should feel like performing a surf rock mini-concert — energy, melody, contrast, and joy. Surf guitar is fun. If you're not smiling by the end, play louder and add more reverb.",
      wrong: "If the 12 minutes felt monotonous, you need more variety — switch between rhythm and lead, between Mixolydian and minor, between loud and soft. If your tremolo fell apart under pressure, it needs more isolated practice.",
      sarah: "You just played a 12-minute surf set that covers both The Ventures AND Allah-Las. Classic surf meets modern psych-jangle. That's not just playing — that's starting to develop a voice.",
      levelUp: "You can sustain a varied, dynamic surf jam using Mixolydian leads, tremolo picking, double stops, jangle voicings, and minor-key lines. Your surf vocabulary is functional."
    }
  ]
};
