import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Psych-Garage",
  subtitle: "Exotic scales, fuzz, and the dark energy of psychedelic rock.",
  description:
    "Psych-garage is Gene's #2-4 genre territory: Neo-Psychedelic, Psychedelic Rock, and Garage Rock. This level teaches the Phrygian Dominant scale (the ACTUAL scale behind Misirlou — correctly placed here, not in the surf level), power chords, fuzz tone, psych minor progressions, and garage rock energy. You'll channel Mystic Braves, BALTHVS, and the darker side of Allah-Las.",
  artists: "Mystic Braves, BALTHVS, Allah-Las, Tame Impala",
  unlocks: "Reggae Skank (Level 4)",
  review: { label: "Level 1 Review", time: 5, exercises: ["gs-1-1", "gs-1-9"], prompt: "Play the Am pentatonic ascending and descending cleanly (gs-1-1). Then run the speed ladder from 60 to 90 BPM (gs-1-9). If the scale is rusty or speed has regressed, spend 10 minutes on Level 1 before proceeding." },
  exercises: [
    {
      id: "gs-3-1",
      time: 10,
      title: "Phrygian Dominant — The Exotic Scale",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      referencePitches: ["A2", "B♭2", "C#3", "D3", "E3", "F3", "G3", "A3"],
      fretboard: { scale: "a-phrygian-dominant", position: 1 },
      what: "Learn A Phrygian Dominant: A-Bb-C#-D-E-F-G. This is the scale behind Dick Dale's 'Misirlou' and the 'Arabic' or 'Egyptian' color in surf and psych rock. The key sound is the augmented 2nd — the unusually large gap between Bb and C# (3 semitones instead of the usual 1 or 2). That gap IS the exotic sound. Note: 'Phrygian Dominant' means the 5th mode of the harmonic minor scale. It's like regular Phrygian (A-Bb-C-D-E-F-G) but with a raised 3rd (C# instead of C).",
      setup: "Clean tone or slight overdrive. This scale sounds great with both.",
      steps: [
        { text: "Play A Phrygian (regular): A-Bb-C-D-E-F-G. Now raise the C to C# — that single change transforms the scale into Phrygian Dominant: A-Bb-C#-D-E-F-G. Play both scales back to back. The regular Phrygian sounds dark and brooding. The Phrygian Dominant sounds exotic and dangerous.", why: "The raised 3rd (C# instead of C) creates the augmented 2nd interval between Bb and C# — that's 3 semitones, which is larger than a normal step. This wide gap is what sounds 'Arabic' or 'Egyptian' to Western ears." },
        { text: "Focus on the Bb-C# interval. Go back and forth between just those two notes: Bb (1st fret, A string) to C# (4th fret, A string). That's 3 frets — an augmented 2nd. Play it slowly, then fast. That interval IS the sound of Misirlou, of snake-charmer melodies, of exotic surf guitar.", why: "Training your ear on this specific interval lets you deploy it intentionally. Once you hear it, you'll recognize it in dozens of surf, psych, and world music recordings." },
        { text: "Play the full scale in the 5th fret position. Ascending and descending at 60 BPM. Map it across all 6 strings. The fingering is close to your Am pentatonic but with the Bb and C# altering the shape.", why: "Positioning the scale at the 5th fret keeps you in the same neighborhood as your Am pentatonic — your hand is in familiar territory but producing an entirely different sound." },
        { text: "Create a short riff using just A-Bb-C#-D — only 4 notes. Repeat it in different rhythms. This is the BALTHVS/Misirlou formula: a small handful of notes from this scale, played with conviction, is all you need.", why: "Limitation breeds creativity. Most iconic Phrygian Dominant riffs use only 4-5 notes. The scale's exotic color does the heavy lifting — you don't need to play all 7 notes to sound exotic." },
        { text: "Compare three scales you now know in A: Am pentatonic (A-C-D-E-G), A Mixolydian (A-B-C#-D-E-F#-G), and A Phrygian Dominant (A-Bb-C#-D-E-F-G). Each one creates a completely different emotional world from the same root note.", why: "Having three scales on one root note gives you enormous expressive range. Pentatonic = blues/rock. Mixolydian = bright surf. Phrygian Dominant = exotic/dramatic. Three colors from one starting point." }
      ],
      feel: "The scale should feel dangerous and exciting — like a snake charmer's melody or a Dick Dale breakdown. The Bb-C# interval should give you chills. If it doesn't, play it louder.",
      wrong: "If it sounds like regular minor, you're not emphasizing the C# enough. If it sounds random, focus on the A-Bb-C#-D core — those 4 notes are the essence. If it sounds timid, play harder — this scale demands conviction.",
      sarah: "Phrygian Dominant is the scale that launched a thousand surf songs. Misirlou, BALTHVS riffs, Mystic Braves solos — they all live here. This is where surf guitar gets dangerous.",
      metronome: 60
    },
    {
      id: "gs-3-2",
      time: 8,
      title: "Power Chords — Root & 5th",
      type: "guitar",
      what: "Learn power chords — the simplest, most versatile chord shape in rock guitar. A power chord contains only two unique notes: the root and the 5th. No 3rd means it's neither major nor minor — just raw, powerful, and moveable anywhere on the neck. The standard shape is one finger on the root and one finger two frets higher on the next string.",
      setup: "Overdrive or fuzz if available. Power chords sound best with gain.",
      steps: [
        { text: "A5 (A power chord): place your index finger on the low E string, 5th fret (A). Place your ring finger on the A string, 7th fret (E). Strum just those two strings — skip everything else. The notes are A and E — root and 5th. That's it. This is A5.", why: "Power chords are deliberately simple. Two notes, one shape, moveable anywhere. The missing 3rd means power chords work over both major and minor contexts — they're harmonically neutral, which makes them incredibly versatile." },
        { text: "D5: same shape, starting on the A string. Index on A string, 5th fret (D), ring finger on D string, 7th fret (A). Notes: D and A. E5: index on low E string, open position or 12th fret. Move between A5, D5, and E5.", why: "These three power chords — A5, D5, E5 — cover most rock and punk progressions. The shape is identical each time, just moved to a different starting fret." },
        { text: "Add the octave: place your pinky on the D string, 7th fret (A) when playing A5. Now you have three notes: A-E-A (root, 5th, octave). This fuller version sounds thicker and is the standard 'rock' power chord.", why: "The octave doubling adds weight without changing the harmony. Three-string power chords are what you hear in every rock, punk, and psych recording." },
        { text: "Play a power chord progression: A5 → D5 → E5 → D5, all downstrokes, eighth notes, aggressive. Move the same shape around the neck — that's the beauty of power chords. They're templates that slide anywhere.", why: "Power chords + downstrokes + gain = the sound of rock music. The shape doesn't change, so you can focus entirely on rhythm and energy." },
        { text: "Try power chords with fuzz or heavy overdrive. Hit them hard. Notice how the gain compresses the sound, making everything thicker and more sustained. One power chord through fuzz fills more space than a full clean chord.", why: "Power chords were designed for distortion. Full chords with many notes sound muddy through gain because the overtones clash. Power chords stay clean and punchy because there are only two unique notes — root and 5th." }
      ],
      feel: "Power chords should feel primal and satisfying — like punching a wall but in a good way. The simplicity IS the point. Two notes, maximum impact.",
      wrong: "If power chords sound muddy, you're hitting too many strings — strum only 2-3 strings. If they sound thin, add the octave with your pinky. If they sound the same as clean chords, you need more gain on your amp or pedal.",
      sarah: "Power chords are the great democratizer of guitar. You can learn them in 5 minutes and use them for a lifetime. Every punk, rock, and garage song ever written uses them. Simple is powerful.",
      metronome: 100
    },
    {
      id: "gs-3-3",
      time: 6,
      title: "Power Chord PReVaDe",
      type: "guitar",
      what: "Take a 4-chord power chord riff (A5→D5→E5→D5) and develop it using PReVaDe: Present it 4 times, Repeat exactly 4 times, Vary by swapping one chord (E5 for C5), then Deconstruct to just A5→D5, then just A5 alone. Motif development with zero scale knowledge required.",
      steps: [
        { text: "PRESENT: play A5→D5→E5→D5 as quarter notes, one chord per beat. Loop it 4 times. This is your riff.", why: "A simple 4-chord riff is a perfect motif. The power chord shapes are familiar enough to play on autopilot, letting you focus on the development process." },
        { text: "REPEAT: play the exact same riff 4 more times. Same chords, same rhythm, same volume. Repetition declares this riff as the theme.", why: "Repetition is the first tool of motif development. It tells the listener: remember this, it's important." },
        { text: "VARY: swap E5 for C5. Play A5→D5→C5→D5 four times. One chord changed, everything else identical. Hear how one substitution shifts the mood.", why: "Single-element variation is the discipline. Changing one chord creates development while maintaining recognition. The ear hears 'same riff, new color.'" },
        { text: "DECONSTRUCT: play just A5→D5, two chords, 4 times. Then just A5 alone, 4 times. The riff dissolves back to its root. Then silence.", why: "Deconstruction is how riffs end naturally. Instead of stopping cold, you simplify until only the essence remains. This is the ending that feels inevitable." }
      ],
      feel: "The full PReVaDe cycle should feel like a story: introduction, establishment, twist, and resolution. Four chords become a narrative.",
      wrong: "If you changed more than one chord during 'Vary,' you jumped too far. If the Deconstruction felt abrupt, slow down — spend more bars on each reduction step.",
      sarah: "Gene, PReVaDe with power chords is the simplest version of this framework. No scales, no theory — just chord shapes and development. You'll use this same approach with melodies in Level 6.",
      metronome: 100,
      recorder: true,
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } }
    },
    {
      id: "gs-3-4",
      time: 10,
      title: "Fuzz Tone & Dynamics",
      type: "guitar",
      volumeMeter: true,
      volumeContour: true,
      what: "Learn how overdrive and fuzz change your playing approach. Gain compresses your signal — quiet notes get louder, loud notes get limited. This changes everything: notes sustain longer, bends are easier to control, and your picking dynamics need to adapt. If you don't have a fuzz pedal, pick harder and closer to the bridge to simulate a brighter, more aggressive tone.",
      setup: "Overdrive or fuzz pedal if available. If not, pick aggressively near the bridge.",
      steps: [
        { text: "Play a simple Am pentatonic phrase with your normal clean tone. Now add gain (overdrive or fuzz). Play the same phrase. Listen to the differences: notes sustain longer, bends ring out more, and the overall tone is thicker and warmer. The gain is doing work that your fingers did before.", why: "Understanding what gain does to your signal is essential before you can use it musically. The compression from gain means you need LESS picking force to sustain notes — but more precision, because the gain amplifies mistakes too." },
        { text: "Practice dynamics with gain: play one note very softly, then gradually pick harder. Notice the volume doesn't change as much as it does clean — that's compression. The gain limits your dynamic range. To compensate, use your TONE knob and pick position to create dynamics instead.", why: "With gain, traditional loud/soft dynamics get squashed. Professional fuzz players create dynamics through tone color (brighter = 'louder' feeling, darker = 'softer'), pick position (near bridge = aggressive, near neck = warm), and note density (more notes = more intense, fewer = more spacious)." },
        { text: "Play long, sustained bends with gain. Bend the G string at the 7th fret up a whole step and hold it. With fuzz, the note should sing and sustain for several seconds. Add vibrato (a slight, rhythmic wavering of the bend) by gently pulsing your bending hand. This is the signature sound of psych rock soloing.", why: "Long singing bends are impossible without some form of gain — the note would die too quickly on a clean tone. Vibrato (defined: small, rhythmic pitch oscillations that add warmth and expression) on a sustained bend is the most emotionally powerful technique in rock guitar." },
        { text: "Experiment with feedback: with enough gain, turn up your volume and hold the guitar near the speaker. A single note can bloom into a singing, overtone-rich sustain. This is controlled feedback — not noise, but an instrument. Start with low volumes and approach the speaker slowly.", why: "Controlled feedback is a psych rock texture used by everyone from Jimi Hendrix to Tame Impala. Learning to control it — finding the sweet spot where the note sustains without shrieking — gives you another expressive tool." }
      ],
      feel: "Your guitar should feel alive with gain — notes sustain indefinitely, bends sing, and the tone is thick and warm. Playing with fuzz should feel like having superpowers. A single note can fill a room.",
      wrong: "If it sounds like noise, reduce the gain and play fewer notes. Fuzz amplifies everything, including sloppy technique. If notes are dying quickly even with gain, you might be muting strings accidentally with your fretting hand.",
      sarah: "Fuzz is a conversation changer. Clean guitar whispers. Fuzz guitar declares. Learn to use that power responsibly — a few great notes beat a hundred sloppy ones."
    },
    {
      id: "gs-3-5",
      time: 10,
      title: "Psych Minor Progressions",
      type: "guitar",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      what: "Learn the minor-key chord progressions that power psychedelic rock. The classic Mystic Braves 'Desert Island' progression is Gm → Dm → C → F, which in Roman numeral analysis is i-v-IV-VII in G minor. These progressions create a dark, brooding atmosphere that defines psych rock.",
      steps: [
        { text: "Learn the Mystic Braves progression: Gm (355333) → Dm (xx0231) → C (x32010) → F (133211). Play each chord for 1 bar, steady eighth-note strumming. The Gm is a barre chord — if that's new, here's the shape: barre all strings at the 3rd fret with your index finger, then add the minor chord shape with your remaining fingers.", why: "The i-v-IV-VII progression (all Roman numerals refer to scale degrees: lowercase = minor, uppercase = major) creates a dark, cyclical feel. The Gm establishes darkness. Dm reinforces it. The C and F provide a brief major-key brightness that makes the return to Gm feel inevitable and dramatic." },
        { text: "Feel the emotional story: Gm is the home base — brooding, tense. Dm is the deepening — more darkness. C is the first ray of light. F is the tension before the cycle restarts. Play the progression 8 times and feel the narrative arc each time through.", why: "Psych rock progressions are designed to loop. Each repetition should feel deeper, not repetitive. The emotional story embedded in the chord movement is what makes 4 chords feel like a complete song." },
        { text: "Try a second psych progression: Am → Em → G → D (i-v-VII-IV in Am). Same Roman numeral relationship, different key. This one is more accessible — no barre chords — and works beautifully with the Am pentatonic you already know.", why: "Having the same progression in two keys gives you flexibility. The Am version uses all open chords, making it easier to play while you focus on feel and dynamics." },
        { text: "Play either progression with power chords instead of full chords: G5 → D5 → C5 → F5 (or A5 → E5 → G5 → D5). All downstrokes, eighth notes. With fuzz. This is the garage rock version — raw, aggressive, and driving.", why: "The same progression with power chords and fuzz becomes garage psych instead of jangle psych. The harmonic content is similar but the energy is completely different. Now you have two versions of the same musical idea — clean/jangle and fuzz/garage." }
      ],
      feel: "The minor progression should feel cyclical and hypnotic — like being pulled into a vortex. Each time through should feel slightly more intense than the last, even if you're not changing anything.",
      wrong: "If it sounds like a pop song, you're probably playing on the downbeat with too much brightness. Darken your tone, lean into the minor chords, and let the mood be heavy. If the barre chords are killing you, use the Am version until your hand strength develops.",
      sarah: "Mystic Braves, Tame Impala, BALTHVS — they all build entire songs on progressions like these. Four chords, one mood, infinite depth. The darkness is the point.",
      metronome: 120
    },
    {
      id: "gs-3-6",
      time: 8,
      title: "Hear the Chord Tones",
      type: "guitar",
      pitchContour: true,
      what: "Over the psych progression Am-Em-G-D, play the ROOT of each chord on beat 1. Just one note per chord change, matching the harmony. This is your first taste of chord-tone targeting — the foundation of melodic improvisation.",
      steps: [
        { text: "Play the Am-Em-G-D progression as power chords for 4 bars to feel the movement. Then stop strumming and just play the ROOT as a single note on beat 1: A when Am starts, E when Em starts, G when G starts, D when D starts.", why: "Hearing the root of each chord as a single note trains your ear to track harmony. Most pentatonic players ignore what chord is underneath." },
        { text: "Add pentatonic fill notes BETWEEN the roots. Play A (root of Am), then 2-3 pentatonic notes, then E (root of Em), then 2-3 notes. Roots are your anchors. Everything between is decoration.", why: "Anchoring on roots while filling with pentatonic notes is the simplest chord-tone targeting. It sounds 'inside' the changes because your strong-beat notes match the harmony." },
        { text: "Now try targeting the 3RD instead of the root: C over Am, G over Em, B over G, F# over D. Find these notes in your pentatonic position.", why: "Targeting 3rds is more sophisticated because the 3rd defines whether a chord is major or minor." },
        { text: "Play over Psych Rock 120 for 2 minutes, alternating between root targeting and 3rd targeting.", why: "This is a seed — you won't master chord-tone targeting here. But planting the awareness NOW means the full improv level will feel familiar." }
      ],
      feel: "When your single note matches the chord change, you'll hear it click — the note and the harmony agree.",
      wrong: "If root notes don't sound connected to the chord, check your note locations. If fills between roots sound random, keep them short — 1-2 pentatonic notes.",
      sarah: "Most guitarists play Level 10 before they learn this. You're getting it in Level 3. When your pentatonic licks match the chords underneath, everything changes.",
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      metronome: 120,
      referencePitches: getPitchRange("A3", "G4")
    },
    {
      id: "gs-3-7",
      time: 8,
      title: "Garage Rock Energy",
      type: "guitar",
      recorder: true,
      what: "Learn the aggressive, forward-leaning rhythmic approach of garage rock. The technique is simple: ALL downstrokes, eighth notes, played ON TOP of the beat (slightly ahead of the click). Downstroke-only strumming means you never strum upward — every strum is a downward motion. This is the engine of garage and punk guitar.",
      tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Put on Psych Rock Beat 120. Play A5 power chord with ONLY downstrokes, eighth notes (2 strums per beat). No upstrokes. Every strum goes DOWN. This is harder than it sounds at 120 BPM — your arm has to travel back up without making a sound, then strum down again.", why: "Downstroke-only playing creates a heavier, more aggressive sound than alternate picking. Every note has the same attack — there's no lighter upstroke to soften the impact. This is the Ramones technique, the garage rock technique, the 'raw energy' technique." },
        { text: "Play the psych progression with downstrokes: A5 → E5 → G5 → D5. Push slightly AHEAD of the beat — place your strums a tiny fraction BEFORE the metronome click. This creates urgency and forward momentum — the opposite of the laid-back, behind-the-beat feel from Level 1.", why: "Playing on top of the beat creates a sense of barely-controlled energy. It's the rhythmic signature of garage rock — the song feels like it's about to fly off the rails, but it never quite does. That tension IS the excitement." },
        { text: "Build intensity: start with single-note A5 hits on beats 1 and 3 (half the density). Then add beats 2 and 4 (quarter notes). Then fill in all the eighth notes. The buildup should feel like a wave gathering speed before it crashes.", why: "The density build is how garage psych songs create their energy arc. Starting sparse and getting denser is a fundamental arrangement technique. Mystic Braves use this in almost every song." },
        { text: "Play the full progression at maximum energy for 2 minutes straight. Your arm will burn from the downstrokes. That's normal. Keep the energy HIGH but the rhythm TIGHT. Sloppy ≠ energetic. Tight + aggressive = garage rock.", why: "Sustained energy requires physical endurance. Your downstroke arm will develop stamina over time. The goal is aggressive energy with rhythmic precision — controlled chaos, not actual chaos." }
      ],
      feel: "You should feel slightly out of control — like you're riding a wave that's almost too big. The energy should be reckless but rhythmically precise. Controlled recklessness. Sweat is normal.",
      wrong: "If it sounds sloppy, you've crossed from 'urgent' to 'messy.' Slow down until the energy feels intentional. If your arm cramps up, take a break — downstroke endurance builds over time. If it sounds polished and safe, you're not pushing hard enough.",
      sarah: "Garage rock is controlled recklessness. The Mystic Braves sound like they might fall apart at any second — but they never do. That sweet spot between chaos and precision is the entire genre.",
      metronome: 120
    },
    {
      id: "gs-3-8",
      time: 10,
      title: "Psych Riff Writing",
      type: "guitar",
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 4, labels: { A: "Phrygian Dom Riff", B: "Pentatonic Riff" } },
      rhythmCells: [
        { name: "Syncopated", pattern: [0.5, 1, 0.5], description: "Accented offbeat" },
        { name: "Driving 8ths", pattern: [0.5, 0.5, 0.5, 0.5], description: "Even eighth notes" }
      ],
      what: "Create a repeating, hypnotic riff using the Phrygian Dominant scale and minor pentatonic. A riff is a short, repeated musical phrase that drives a song — think the opening of 'Misirlou' or any Mystic Braves verse. The best psych riffs are simple, rhythmically compelling, and designed to loop endlessly.",
      tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Choose 4-5 notes from A Phrygian Dominant (A-Bb-C#-D-E). Create a 2-bar rhythmic pattern using just these notes. Focus on RHYTHM first — a riff with interesting rhythm is more memorable than a riff with interesting notes. Try syncopation (accenting unexpected beats), ties (holding notes across beat boundaries), and rests (deliberate silence within the riff).", why: "The best psych riffs stick in your head because of their rhythm, not just their notes. BALTHVS and Mystic Braves riffs are addictive because of when the notes land, not which notes they are." },
        { text: "Put on Psych Rock Beat 120 and play your riff 8 times in a row. Does it get boring or hypnotic? If boring after 4 repetitions, simplify — remove notes until only the essential ones remain. If hypnotic after 8, you've got a riff.", why: "A good psych riff gets better with repetition — it pulls you deeper. If it gets worse with repetition, it's too complex. Simplify until it grooves. Many great psych riffs are only 3-4 notes." },
        { text: "Now create a second riff using Am pentatonic instead. Something darker, bluesier. Alternate: 4 bars of Phrygian Dominant riff, 4 bars of pentatonic riff. The contrast between exotic (Phrygian) and raw (pentatonic) creates a complete psych song structure.", why: "Having two contrasting riffs gives you a verse-chorus type structure. Phrygian for the exotic verse, pentatonic for the heavy chorus — or vice versa. This is how Mystic Braves and BALTHVS build songs." },
        { text: "Record your best riff on your phone. Play it 4 times so you can hear how it loops. Save it — you're building a library of original musical ideas.", why: "Recording your riffs is essential. You'll listen back later and hear things you didn't notice in the moment. Some of these ideas will become actual songs." }
      ],
      feel: "Your riff should feel like a mantra — something you could play for 10 minutes without getting tired of it. It should have a physical groove that makes you nod your head involuntarily.",
      wrong: "If the riff is too complex to play on repeat without thinking, simplify. If it doesn't make you move, the rhythm needs work. If it sounds generic, lean harder into the Phrygian Dominant color — the Bb-C# interval is what makes it distinctive.",
      sarah: "The best psych riffs are embarrassingly simple on paper — but unstoppable in practice. Don't overthink it. Find the groove and commit. You're not writing a symphony. You're writing a hypnotic loop.",
      metronome: 120
    },
    {
      id: "gs-3-9",
      time: 5,
      title: "Rhythm-First Garage",
      type: "guitar",
      what: "Mute all strings. Create a 2-bar garage rock rhythm pattern using ONLY percussive hits — downstrokes, ghost notes, accents, silences. Then add A5 on ONLY the accented hits. The rhythm creates the riff; the chord just fills in the skeleton.",
      steps: [
        { text: "Mute all strings with your fretting hand. Play 2 bars of eighth-note downstrokes — all muted, all percussion. This is your rhythmic canvas.", why: "Starting muted separates rhythm from pitch completely. You're composing with time, not notes." },
        { text: "Now choose 3-4 hits within those 2 bars to ACCENT (hit harder). The rest stay ghosted. Play this accented pattern 4 times until it grooves.", why: "The accent pattern IS the riff. Without any pitched notes, you can hear the rhythm's personality." },
        { text: "Add A5 on ONLY the accented hits. Keep the ghost strums on everything else. The power chord appears exactly where the rhythm demands it.", why: "The chord fills the rhythm skeleton. This proves that rhythm creates the structure and pitch fills it in — not the other way around." },
        { text: "Try different accent patterns: accents on 1 and the 'and' of 3 (driving). Accents on 2 and 4 (backbeat). Accents on the 'and' of every beat (syncopated). Each pattern creates a completely different riff from one chord.", why: "Three accent patterns = three riffs from one chord. This is rhythm-first composition." }
      ],
      feel: "When the accented power chords hit inside the ghost strum pattern, the riff should feel like it was always there — the rhythm just revealed it.",
      wrong: "If the ghost strums are too loud, the accents won't pop. Exaggerate the contrast: whisper-quiet ghosts, hit-hard accents. If the pattern doesn't groove, simplify to just 2 accents per 2 bars.",
      sarah: "Gene, garage rock IS rhythm with power chords. The Stooges, Black Keys, early White Stripes — they all compose rhythm-first. This approach connects directly to the Improvisation Engine in Level 6.",
      metronome: 120,
      tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
      recorder: true,
      rhythmCells: [
        { name: "Garage Drive", pattern: [0.5, 0.5, 0.5, 0.5], description: "All downstrokes, accent 1 & 3" },
        { name: "Backbeat Punch", pattern: [1, 1, 1, 1], description: "Accent beats 2 & 4" },
        { name: "Syncopated", pattern: [0.5, 1, 0.5], description: "Off-beat accent pattern" }
      ]
    },
    {
      id: "gs-3-10",
      time: 12,
      title: "Song: Mystic Braves — Desert Island Style",
      type: "guitar",
      recorder: true,
      volumeContour: true,
      what: "Learn to play in the style of Mystic Braves' 'Desert Island' — a hypnotic minor-key psych anthem. Play both the rhythm part (chord progression with driving strumming) and the lead approach (minor pentatonic fills between chord phrases). This is where rhythm guitar and lead guitar coexist.",
      tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Play the progression from gs-3-5: Gm → Dm → C → F (or the easier Am → Em → G → D version). Steady eighth-note strumming, all downstrokes, with fuzz or overdrive. Play it 4 times to lock in the groove.", why: "The rhythm part is the foundation. In a band, this is what the rhythm guitarist would play — steady, driving, hypnotic. Get it locked before adding leads." },
        { text: "Now add lead fills: between each chord change, play a quick 2-3 note minor pentatonic phrase. Keep the fills short — they're punctuation, not paragraphs. Strum Am (4 beats), fill (2 notes), strum Em (4 beats), fill (2 notes). The fill slides into the next chord.", why: "Mystic Braves guitarists weave tiny fills between chord strums — they're not soloing, they're decorating the rhythm. The fills should be so brief that you're back to strumming before the listener fully registers what happened." },
        { text: "Build intensity across 4 loops of the progression: Loop 1 — clean strumming only. Loop 2 — add fills. Loop 3 — strum harder, push the beat forward. Loop 4 — full energy, more fills, aggressive dynamics. This is the Mystic Braves energy arc.", why: "Psych songs that stay at one intensity level get boring. Building gradually keeps the listener engaged. Each repetition of the same 4 chords should feel more intense than the last." },
        { text: "On the 5th loop, break into a full lead section: solo over the progression using Am pentatonic or Phrygian Dominant for 8 bars. Then drop back to rhythm strumming. The contrast between soloing and strumming creates the push-pull dynamic of psych rock.", why: "The solo section should feel like an eruption — all the tension built by the rhythm playing gets released in a burst of lead guitar. Then returning to rhythm after the solo feels like landing after a jump." }
      ],
      feel: "This should feel like playing in a psych band — rhythmic intensity building to a solo break, then crashing back to the groove. The whole thing should make you want to turn the amp up and play louder.",
      wrong: "If the fills disrupt the rhythm, make them shorter. If the solo doesn't feel connected to the chords, target chord tones. If the energy doesn't build, exaggerate the dynamic differences between loops.",
      sarah: "Mystic Braves songs are simple machines that generate enormous energy. The magic isn't in complexity — it's in commitment. Play every note like it's the most important note you've ever played.",
      metronome: 120
    },
    {
      id: "gs-3-11",
      time: 10,
      title: "Song: BALTHVS Groove",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-phrygian-dominant", position: 1 },
      what: "Play in the style of BALTHVS — minor pentatonic lead over a Latin-influenced groove with a Santana-adjacent feel. BALTHVS blends psych-rock with Latin rhythm, creating a hypnotic, groove-locked sound where the guitar lead rides a tight rhythmic pocket.",
      tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Establish the groove: put on Soul Funk Groove 90. This is slower than the garage energy of the previous exercise. Play Am → Dm power chords (A5 → D5) with a syncopated rhythm — not straight eighth notes, but a pattern with accents on the 'and' of beat 2 and beat 4. This Latin-influenced rhythm is the foundation of BALTHVS' sound.", why: "BALTHVS' guitar playing is deeply rhythmic — even the lead lines serve the groove. Starting with a syncopated rhythm part gets your body into the pocket before you solo." },
        { text: "Switch to lead: play Am pentatonic melodies with behind-the-beat phrasing. Each note should land slightly AFTER the beat — lazy, heavy, grooving. Use bends and vibrato generously. Think Carlos Santana playing at a beach bar.", why: "BALTHVS lead lines are groove-locked — they never fight the rhythm, they float on top of it. Behind-the-beat phrasing creates the 'cool' factor. Bends and vibrato add the Latin fire." },
        { text: "Add Phrygian Dominant flavor: drop in the Bb-C# interval from your Phrygian Dominant scale during a pentatonic phrase. Just 2-3 exotic notes within an otherwise pentatonic line. This adds the 'world music' spice that separates BALTHVS from standard blues-rock.", why: "BALTHVS lives at the intersection of blues, Latin, and exotic scales. The Phrygian Dominant color — used sparingly — is what makes their guitar sound worldly rather than generic." },
        { text: "Build a complete BALTHVS-style performance: 4 bars rhythm (syncopated power chords), 4 bars lead (pentatonic with Phrygian touches), repeat. The key is that rhythm and lead should feel like the same thing — groove-driven, never separate from the pocket.", why: "In BALTHVS' music, there's no clear division between rhythm and lead guitar. The guitar always serves the groove. Even the wildest solo moment stays locked to the beat. That discipline IS the style." }
      ],
      feel: "This should feel sultry and rhythmic — like dancing rather than performing. Every note should make you want to move. If you're sitting still, you're not feeling it enough. Let your body sway with the groove.",
      wrong: "If it sounds like standard blues-rock, you need more Latin rhythmic influence — accent the offbeats and syncopate. If the lead lines feel disconnected from the groove, simplify and lock to the beat. If there's no Phrygian color, you're missing the BALTHVS 'exotic' element.",
      sarah: "BALTHVS is Gene's #1 most-listened artist at 6 months. Their magic is making psychedelic guitar sound like it belongs in a Latin club. Groove first, always.",
      metronome: 90
    },
    {
      id: "gs-3-12",
      time: 15,
      title: "Psych Jam Session",
      type: "guitar",
      recorder: true,
      volumeContour: true,
      phraseForm: { pattern: ["Sparse", "Build", "Peak", "Resolve"], barsPerSection: [12, 16, 16, 16], labels: { Sparse: "Mystery", Build: "Engine", Peak: "Eruption", Resolve: "Dissolve" } },
      what: "Extended psych-garage jam: fuzz on, Phrygian Dominant and pentatonic scales, psych progressions, and garage rock energy. Build from sparse and mysterious to full intensity, then bring it back down. 15 minutes of psychedelic immersion.",
      setup: "Fuzz or overdrive. Record yourself. Reverb if available.",
      tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Put on Psych Rock Beat 120. Minutes 0-3: start sparse. Single notes from A Phrygian Dominant, lots of space, clean or light gain. Let the exotic scale establish the mood. Play the Bb-C# interval, let it hang in the air, then silence. Mystery before energy.", why: "Starting sparse builds tension. The listener (even if it's just you) leans in, waiting for what comes next. Psych music is as much about anticipation as it is about release." },
        { text: "Minutes 3-7: build the intensity. Switch to power chord rhythm — A5 → D5 → E5, all downstrokes. Add fuzz. Push the beat forward. Drop in Phrygian Dominant riffs between chord phrases. This is the garage rock engine firing up.", why: "The transition from sparse atmosphere to driving garage rhythm is the core arc of psych-rock. The same scale that sounded mysterious now sounds urgent and dangerous." },
        { text: "Minutes 7-11: full energy. Solo over the progression using everything — Am pentatonic bends, Phrygian Dominant exotic runs, sustained fuzz notes with vibrato. Play ON TOP of the beat. This is the climax. Make it count.", why: "The solo section should feel like a controlled explosion. All the restraint from the first 3 minutes pays off when you finally unleash. Let the fuzz and the scale do their thing." },
        { text: "Minutes 11-15: bring it down. Reduce the gain. Return to single Phrygian Dominant notes. Let phrases get shorter and the spaces get longer. End on a single A note — clean, no effects — ringing into silence.", why: "The cooldown mirrors the opening, creating a satisfying arc. Ending quietly after maximum intensity is more powerful than ending at full blast. The silence after the last note is part of the performance." },
        { text: "Listen back to your recording. Where did the energy peak? Where did the Phrygian Dominant color work best? Where did you rush or lose the groove? Where did you surprise yourself?", why: "Self-evaluation of extended performances is how you develop artistic judgment. The recording reveals truths your in-the-moment experience can't. Every listen teaches something new." }
      ],
      feel: "This should feel like a complete psychedelic journey — departure, exploration, peak experience, and return. When it's working, you stop thinking about scales and start thinking in colors and feelings. The fuzz becomes part of your body. The scale becomes a language you speak fluently.",
      wrong: "If all 15 minutes sounded the same, you need more dynamic contrast between sections. If the Phrygian Dominant passages sounded random, focus on the Bb-C# interval as your anchor. If the garage sections lacked energy, push harder with downstrokes. If you never hit a climax, you were too reserved — let yourself be loud.",
      sarah: "This is your Level 3 graduation gig. You started this level learning a new scale. Now you're playing 15-minute psych sets with exotic scales, fuzz, garage energy, and dynamic arcs. You're not just learning guitar — you're building a musical identity. Record this one. Keep it.",
      metronome: 120,
      levelUp: "You can sustain a 15-minute psych-garage jam with Phrygian Dominant coloring, power chords, dynamic build-and-release, and a clear energy arc from sparse to intense and back."
    }
  ]
};
