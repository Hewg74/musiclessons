import { getPitchRange } from "../appData.js";

export const level9 = {
  level: 9,
  title: "Cinematic Guitar",
  subtitle: "Reverb becomes your instrument. Fingerpicking is formally taught here.",
  description:
    "Hermanos Gutierrez territory. This level formally teaches fingerpicking (PIMA), minor arpeggios, the tremolo effect (not the same as tremolo picking from Level 2), Phrygian mode, cinematic dynamics, and scene scoring. Reverb is no longer optional — it's an instrument.",
  artists: "Hermanos Gutiérrez, Ennio Morricone, Wander & Mélodie",
  unlocks: "Full Integration (Level 10)",
  review: { label: "Levels 7-8 Check-In", time: 5, exercises: ["gs-7-5", "gs-8-5"], prompt: "Roll your tone knob to 3 different positions and describe the difference (gs-7-5). Then play the Am9→Dm7→G9→Cmaj7 progression with clean fingerpicking (gs-8-5). Tone awareness and extended chords should be second nature." },
  exercises: [
    {
      id: "gs-9-1",
      time: 10,
      title: "Fingerpicking Basics — PIMA",
      type: "guitar",
      referencePitches: getPitchRange("A3", "A4"),
      what: "Formally learn fingerpicking technique. PIMA stands for Pulgar (thumb), Indice (index), Medio (middle), Anular (ring). Assign each finger to specific strings: thumb (P) handles bass strings 4-5-6, index (I) handles the G string, middle (M) handles the B string, ring (A) handles the high E string.",
      setup: "No pick. Clean tone, neck pickup. Sit with the guitar resting on your right leg (or left if left-handed). Rest your right forearm on the upper bout.",
      steps: [
        { text: "Position your right hand over the sound hole. Let your thumb (P) hang naturally over the bass strings (E, A, D — strings 6, 5, 4). Your index (I) rests on the G string (3), middle (M) on B string (2), ring (A) on high E string (1). Don't curl your fingers — let them hang in a relaxed arc.", why: "PIMA assignment is the foundation of classical and fingerstyle guitar. Each finger 'owns' its string, so you never have to think about which finger to use. This builds automatic, efficient technique." },
        { text: "Play an open Am chord. Pluck the A string (5th) with your thumb, then G string with index, B string with middle, high E with ring. One note at a time: P-I-M-A. Repeat 10 times, slowly.", why: "This alternating bass + melody pattern is the most fundamental fingerpicking pattern. Your thumb provides the bass foundation; your fingers provide the melody." },
        { text: "Now try a rolling pattern: P-I-M-A-M-I (thumb, index, middle, ring, middle, index). This creates a continuous, flowing sound. Set metronome to 60 BPM, one note per click.", why: "The rolling pattern is the basis of most fingerpicked accompaniment. It creates a harp-like cascade of notes from a single chord. The motion should feel like a wave — out and back." },
        { text: "Practice on three chords: Am (P on 5th string), C (P on 5th string), G (P on 6th string). The thumb moves between bass strings while the fingers stay on strings 3-2-1. Keep each chord for 2 bars.", why: "Changing chords while maintaining the fingerpicking pattern is the first coordination challenge. Your left hand moves; your right hand stays constant. This independence is the key skill." }
      ],
      feel: "Fingerpicking should feel gentle and controlled — each note plucked clearly with the fingertip, not the nail (unless you have nails grown for this purpose). The sound should be warm, round, and intimate.",
      wrong: "If your fingers are slipping off the strings, you're pulling too hard. Fingerpicking uses less force than you think. If notes are uneven in volume, focus on making each pluck the same strength. If your thumb keeps hitting the wrong string, look at it until the muscle memory forms.",
      sarah: "Fingerpicking opens up an entirely different relationship with your guitar. Instead of strumming — which is expressive but blunt — you're speaking individual notes. It's the difference between shouting across a room and whispering in someone's ear.",
      metronome: 60,
      levelUp: "You can play the P-I-M-A-M-I rolling pattern on Am, C, and G with smooth chord changes and even note volume at 60 BPM."
    },
    {
      id: "gs-9-2",
      time: 10,
      title: "Minor Arpeggios — Fingerpicked",
      type: "guitar",
      what: "Play Am (A-C-E), Dm (D-F-A), and Em (E-G-B) as broken arpeggios using your new PIMA technique. One note at a time, letting each note ring into the next. This is the foundation of cinematic guitar: chords dissolved into melody.",
      steps: [
        { text: "Play Am arpeggio: A (open 5th string, thumb), C (3rd fret, 2nd string... actually, let's use the full chord shape). Fret Am: x02210. Play: thumb on A string (A), index on G string (A), middle on B string (C), ring on high E (E). One note per beat at 70 BPM. Let each note sustain and overlap.", why: "Finger plucking gives you dynamic control over each note. The overlapping sustain creates the lush, reverb-friendly sound that defines cinematic guitar." },
        { text: "Move to Dm: xx0231. Thumb on D string (D), index on G string (A), middle on B string (D), ring on high E (F). Same pattern, same tempo. Then Em: 022000. Thumb on low E (E), index on G string (G), middle on B string (B). Spend 2 minutes on each chord.", why: "These three minor chords form the harmonic backbone of most cinematic guitar music. As arpeggios, they become melodic phrases instead of static chords." },
        { text: "Connect all three: Am→Dm→Em, arpeggiated, no gaps between chords. The last note of one chord should lead smoothly into the first note of the next.", why: "Smooth transitions between arpeggiated chords create the flowing, continuous sound that makes cinematic guitar feel like a soundtrack rather than a chord progression." },
        { text: "Add reverb if you have it. Even a little room reverb transforms these arpeggios. If no reverb, let the notes ring as long as possible — avoid muting strings as you move between them.", why: "Reverb is the secret ingredient of this entire level. It turns simple arpeggios into atmospheric landscapes. Without a pedal, you can simulate the effect by maximizing sustain." }
      ],
      feel: "Each note should feel like dropping a pebble into still water — the ripples spread and overlap. Your playing should sound bigger than one guitar.",
      wrong: "If the notes sound clipped or staccato, you're muting too early — keep your fingers out of the way of ringing strings. If it sounds muddy, slow down and let fewer notes overlap at once.",
      sarah: "Hermanos Gutierrez build entire songs from simple arpeggios drenched in reverb. The magic isn't complexity — it's letting each note breathe.",
      volumeMeter: true,
      metronome: 70,
      levelUp: "You can fingerpick Am, Dm, and Em arpeggios with smooth, overlapping sustain and seamless transitions between chords."
    },
    {
      id: "gs-9-3",
      time: 10,
      title: "Tremolo Effect — Not Tremolo Picking",
      type: "guitar",
      what: "Learn the tremolo EFFECT — amplitude modulation that makes your sound pulse and wobble. This is completely different from tremolo PICKING (the fast alternate picking from Level 2). Tremolo picking = fast notes. Tremolo effect = volume pulsing on sustained notes.",
      setup: "Tremolo pedal if available. If not, no extra gear needed — you'll simulate it.",
      steps: [
        { text: "First, understand the distinction. Tremolo PICKING (Level 2) = rapidly picking a single note to create a shimmering stream of individual attacks. Tremolo EFFECT = a single sustained note whose volume automatically rises and falls in a wave pattern. They share a name but are completely different techniques.", why: "This is one of the most confusing terms in guitar. Many players conflate the two. Understanding the difference prevents confusion when reading about gear, effects, or techniques." },
        { text: "If you have a tremolo pedal: engage it. Play a single sustained note — A on the 5th fret of the high E string. Listen to how the volume pulses without you doing anything. Adjust the rate (speed of pulsing) and depth (how extreme the volume change is).", why: "Tremolo effect turns a static sustained note into something alive and breathing. It's the signature sound of Spaghetti Western soundtracks, surf guitar, and cinematic atmospheric playing." },
        { text: "If no pedal: simulate the effect with manual volume swells. Pick a note and immediately roll your guitar's volume knob rhythmically — up-down-up-down — to create a pulsing effect. Or use your picking hand to alternate between soft and strong pressure in a steady rhythm.", why: "Manual volume swells develop your dynamic control and give you the concept of tremolo effect even without gear. Many classic recordings used amp tremolo, which was built into vintage amps." },
        { text: "Play a simple Am arpeggio melody: A-C-E-A ascending. Hold each note for 2 beats with the tremolo effect pulsing. The melody should float and breathe. Experiment with slow pulse (quarter notes), medium (eighth notes), fast (16th notes).", why: "Tremolo transforms simple melodies into cinematic statements. Each note gets weight and presence. Slow pulse feels dreamy and vast; fast pulse feels urgent and dramatic." }
      ],
      feel: "The notes should feel like they're hovering in the air, pulsing with life. If using a pedal, your picking hand can relax — the effect does the work. If manual, your hands should create an even, wave-like dynamic.",
      wrong: "If you're confusing this with the fast picking from Level 2, stop and reread the distinction. Tremolo effect is about volume modulation, not picking speed. If the manual version sounds choppy rather than wave-like, smooth out your volume changes.",
      sarah: "Tremolo effect is what makes a single guitar sound like an orchestra. Ennio Morricone built entire soundtracks on this one effect. Once you hear it, you can't unhear it in classic Westerns and surf records.",
      metronome: 80
    },
    {
      id: "gs-9-4",
      time: 10,
      title: "Phrygian Mode — The Dramatic Scale",
      type: "guitar",
      volumeMeter: true,
      referencePitches: ["A2", "B♭2", "C3", "D3", "E3", "F3", "G3", "A3"],
      fretboard: { scale: "a-phrygian", position: 1 },
      what: "Learn Am Phrygian: A-Bb-C-D-E-F-G. It's the 3rd mode of F major. The b2 (Bb) is the dramatic interval — the one note that separates Phrygian from natural minor (which has B natural). Compare: A natural minor = A-B-C-D-E-F-G. A Phrygian = A-Bb-C-D-E-F-G. Only the Bb is different.",
      steps: [
        { text: "Play A natural minor ascending: A-B-C-D-E-F-G-A. Then A Phrygian: A-Bb-C-D-E-F-G-A. Go back and forth. The Bb vs B is the only difference, but it changes everything.", why: "The half step between A and Bb (the b2) creates tension, mystery, and drama. This is the sound of Spaghetti Westerns, flamenco, and cinematic guitar." },
        { text: "Play A-Bb-A repeatedly. Just those two notes. Feel the pull between them — the Bb wants to fall back to A. That half-step gravity is the engine of Phrygian's dramatic power.", why: "The Bb→A resolution is the most dramatic melodic movement in Phrygian. Morricone used it in almost every Western theme. Once you feel this pull, you understand the mode." },
        { text: "Create a short melody that starts on A, touches the Bb briefly, and resolves back to A. The Bb should feel like a shadow passing over the sun — dark, momentary, dramatic.", why: "Phrygian is most powerful when used sparingly. A single Bb in the right place creates more drama than playing the entire scale up and down." },
        { text: "Improvise over an Am chord using mostly natural minor notes, but drop in the Bb at moments of tension. Think of Phrygian's Bb as a spice — a little goes a long way.", why: "Overusing the b2 makes it sound like an exercise. Using it at dramatic moments makes it sound like a Morricone score." }
      ],
      feel: "The Bb should feel like a plot twist — unexpected, dramatic, and meaningful. The rest of your playing provides the context that makes it powerful.",
      wrong: "If everything sounds 'Arabic' or 'Spanish,' you're overusing the Bb. If it just sounds like regular minor, you're not landing on the Bb with enough intention or holding it long enough to register.",
      sarah: "Phrygian is the scale of drama queens — and I mean that as a compliment. One well-placed Bb is worth more than a hundred fast runs."
    },
    {
      id: "gs-9-5",
      time: 10,
      title: "Cinematic Dynamics",
      type: "guitar",
      volumeMeter: true,
      what: "Play the same arpeggio at 5 different volume levels, then practice crescendo (soft to loud) and decrescendo (loud to soft) over 8 bars. Volume is your most powerful expressive tool — more powerful than notes, chords, or scales.",
      tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Play an Am arpeggio (fingerpicked) at 5 volume levels. Level 1: barely audible — your fingers whisper across the strings. Level 2: quiet but present. Level 3: your normal comfortable volume. Level 4: confident and full. Level 5: your maximum resonant volume without harshness. Spend 30 seconds at each level.", why: "Most guitarists have two volumes: on and off. Mapping out 5 distinct levels expands your dynamic vocabulary from a light switch to a dimmer. This control is what makes cinematic guitar work." },
        { text: "Put on the Cinematic Western Beat 80. Play Am arpeggios starting at Level 1 (whisper) and gradually crescendo to Level 5 over 8 bars. The swell should be smooth and continuous — not sudden jumps.", why: "A gradual crescendo creates anticipation and emotional weight. It's the cinematic equivalent of a slow zoom-in — the audience leans forward without knowing why." },
        { text: "Now decrescendo: start at Level 5 and fade to Level 1 over 8 bars. The drop should be just as smooth as the build. End in near-silence.", why: "Controlled decrescendo is harder than crescendo — your instinct is to play louder, not softer. The ability to gradually disappear is a cinematic superpower." },
        { text: "Combine: 8 bars crescendo (Level 1→5), hold Level 5 for 2 bars, then drop immediately to Level 1. The sudden drop after the crescendo is one of the most dramatic moves in cinematic guitar.", why: "The sudden drop creates a moment of stunned silence that resonates emotionally. It's the musical equivalent of a camera cutting to black. This is how Hermanos Gutierrez build and release tension." }
      ],
      feel: "The quiet sections should feel intimate and fragile. The loud sections should feel powerful and inevitable. The transitions should feel like breathing — natural and connected.",
      wrong: "If your 'quiet' is still pretty loud, practice playing so softly that you can barely hear yourself. If the crescendo happens all at once instead of gradually, count the bars and spread the change evenly across them.",
      sarah: "Dynamics are the most underrated tool in guitar. Most players have two settings: on and off. You're learning to use the entire spectrum — and that spectrum is what makes cinematic guitar cinematic."
    },
    {
      id: "gs-9-6",
      time: 12,
      title: "Hermanos Gutiérrez Style",
      type: "guitar",
      recorder: true,
      what: "Minor arpeggios, fingerpicking, heavy reverb, and slapback delay. Reference 'El Camino De Mi Alma' by Hermanos Gutiérrez: a progression like G-A-Bm-Em-E at around 90 BPM. Simple chords, maximum atmosphere.",
      setup: "Reverb (as much as you have). Slapback delay if available (short delay, 80-120ms, one repeat). Neck pickup. Fingerpicking.",
      tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Learn the progression: G (320003)→A (x02220)→Bm (x24432)→Em (022000)→E (022100). Play each chord as fingerpicked arpeggios — thumb on bass, fingers on treble. 2 bars per chord. Let the reverb fill the space between notes.", why: "This progression (or something like it) is the Hermanos Gutiérrez template. The mix of major and minor chords creates a bittersweet, cinematic mood. Arpeggiation with reverb turns 5 simple chords into a soundtrack." },
        { text: "Focus on your right hand: use the P-I-M-A assignment from exercise 9-1. Thumb walks between the bass note of each chord (G on 6th string, A on 5th, B on 5th, E on 6th). Fingers stay on strings 3-2-1.", why: "The thumb provides a walking bass line while the fingers provide the melody. In a Hermanos Gutiérrez song, these two layers create the illusion of two guitarists — but it's one player with good technique." },
        { text: "Add dynamics: start the progression quietly (Level 2). Each time through the progression, get slightly louder. Over 3 cycles, build from whisper to full voice. Then drop back to whisper on the 4th cycle.", why: "Dynamic arcs over repeated progressions are the Hermanos Gutiérrez signature. The same chords feel different at different volumes. The drop back to quiet after the build is the most dramatic moment." },
        { text: "Record yourself if possible. Listen back with eyes closed. Does it sound like it could score a scene? If yes — that's the goal. If not, add more space between notes and let the reverb do more work.", why: "The self-evaluation question 'does this sound like a soundtrack?' is the Cinematic Guitar litmus test. When the answer is yes, you've understood the aesthetic." }
      ],
      feel: "This should feel like standing in a vast, quiet landscape — a desert canyon, an empty highway at dusk. The guitar should sound lonely, beautiful, and spacious. Let the reverb be the co-performer.",
      wrong: "If it sounds like chord practice, you're changing chords too fast or playing too many notes. Slow down. If the reverb sounds cluttered, reduce the tempo and play fewer notes per bar — give the reverb time to breathe.",
      sarah: "Hermanos Gutiérrez proved that you don't need speed, complexity, or even lyrics to make guitar music that moves people to tears. Simplicity plus atmosphere equals cinema."
    },
    {
      id: "gs-9-7",
      time: 12,
      title: "Spaghetti Western Melody",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "a-phrygian", position: 1 },
      what: "Play Phrygian phrases with the Bb→A resolution — the Morricone signature. Simple melody, maximum drama through dynamics and space. This is where all the cinematic tools come together: fingerpicking, Phrygian, dynamics, reverb.",
      tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Play this melodic contour in Am: start on E (open high E string), bend up to F (or slide to 1st fret), release back to E, slide down to B (open B string), pause for 2 full beats. This descending minor phrase is pure Morricone.", why: "Morricone melodies are simple — often just 4-5 notes. The power comes from HOW you play them: slowly, with sustain, with dramatic pauses between phrases." },
        { text: "Put on the Cinematic Western Beat 80. Add the tremolo effect (not picking) to the sustained notes if you can. Hold the E with tremolo for 2 beats before bending to F. Hold the C with tremolo at the end. Let the pauses be long — 4 beats of silence between phrases.", why: "Tremolo effect on sustained notes creates the classic Spaghetti Western sound. The pauses between phrases are as important as the notes — they create tension." },
        { text: "Play the melody with full dynamic contrast: start quietly, swell on the bend, drop to silence on the pause. The dynamics tell the story — not the notes.", why: "A Morricone melody without dynamics is just notes. Adding the crescendo on the bend and the sudden silence makes it cinematic." },
        { text: "Add a Phrygian ending: after the pause on B, play a slow Bb (1st fret, A string or 6th fret, high E) resolving down to A. This Bb→A resolution is the musical equivalent of a showdown at high noon — maximum drama.", why: "The Phrygian b2 resolving to the root is the most dramatic cadence in cinematic guitar. The half-step tension releasing into the tonic creates a physical sensation of resolution." },
        { text: "Play the complete melody 3 times, each time with slightly different timing and dynamics. No two takes should be identical — variation is what makes it feel alive.", why: "Morricone's musicians never played a melody exactly the same way twice. The subtle variations are what make it feel human rather than mechanical." }
      ],
      feel: "You should feel like you're scoring a film scene — every note has purpose, every pause has meaning. The guitar should sound lonely, dramatic, and vast.",
      wrong: "If it sounds like a scale exercise, you're playing too many notes too fast. Slow down. If the pauses feel awkward, lean into them harder — they're the most cinematic part. If the Bb→A resolution doesn't feel dramatic, hold the Bb longer before resolving.",
      sarah: "This melody is your audition for an imaginary Sergio Leone film. Play it like the camera is slowly zooming in on your face."
    },
    {
      id: "gs-9-8",
      time: 12,
      title: "Two-Guitar Thinking",
      type: "guitar",
      recorder: true,
      what: "Record a simple fingerpicked rhythm part, then play a melodic lead line over it. Practice both roles — rhythm and lead — as separate voices on one guitar. This is how you self-accompany and think like an arranger.",
      setup: "Phone or looper to record yourself. Reverb recommended.",
      tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Record Layer 1 — Rhythm: fingerpick Am→Dm→Em→Am, 2 bars each, using the P-I-M-A-M-I rolling pattern. Keep it steady and hypnotic. Record 1-2 minutes.", why: "Hermanos Gutiérrez are a duo — one guitar lays the foundation while the other plays melody. You need to create both parts to understand how they interlock." },
        { text: "Play back your recording. Over it, play slow Am Phrygian melodies — single notes that weave around the chord tones you hear underneath. Use the fingerpicked notes as a roadmap.", why: "Playing over yourself forces you to listen differently. You become both rhythm section and soloist, which develops your ear for arrangement." },
        { text: "Try contrasting your lead with the rhythm: when the rhythm is busy (middle of a rolling pattern), play fewer lead notes. When the rhythm hits a bass note and pauses, add more lead melody.", why: "Good two-guitar arrangements breathe — the parts give each other space. This push-pull dynamic is what makes Hermanos Gutiérrez arrangements compelling." },
        { text: "Switch roles: record a simple Phrygian melody (lead), then play arpeggiated rhythm chords over it. Notice how the same music feels different depending on which part you focus on.", why: "Understanding both roles makes you a better collaborator and a better solo arranger. Every part serves the whole." }
      ],
      feel: "You should feel like you're having a conversation with yourself — the recorded part speaks, and your live part responds. It should feel collaborative, not competitive.",
      wrong: "If your lead drowns out the rhythm, play more quietly. If both parts sound like the same thing, make the lead more melodic (single notes, wider intervals) and the rhythm more percussive (steady pattern, even volume).",
      sarah: "This is how you start thinking like a band instead of a solo player. Even when you're alone, you can create music that sounds like two people playing. That's the Hermanos Gutiérrez secret."
    },
    {
      id: "gs-9-9",
      time: 15,
      title: "Cinematic Scene Score",
      type: "guitar",
      recorder: true,
      volumeMeter: true,
      what: "Pick a mood — sunrise, chase scene, farewell — and score it with everything from this level: fingerpicking, minor arpeggios, dynamics, Phrygian drama, tremolo effect, and reverb. No backing track. Create a 5-minute mini-soundtrack.",
      steps: [
        { text: "Choose your scene. Sunrise = start quiet, build to warm. Chase = start tense, build to frantic. Farewell = start full, fade to nothing. Write down the mood before you play — commit to it.", why: "Having a visual image to score gives your playing narrative purpose. You're not just practicing techniques — you're telling a story. The image guides every musical decision." },
        { text: "Act 1 (0-2 min): Set the scene. For sunrise: quiet fingerpicked Am arpeggios, Level 1-2 dynamics, lots of reverb, lots of space. For chase: tense Phrygian Bb→A figures, tremolo effect, rising intensity. For farewell: warm Dorian melodies from Level 8 over extended chords.", why: "Every film score starts with atmosphere. Your job is to create a sense of place with minimal notes. This is where your dynamic control pays off." },
        { text: "Act 2 (2-4 min): Build tension. Move up the neck to higher positions. Introduce the Phrygian Bb if you haven't. Add dynamics — crescendo over 4 bars. Something is coming.", why: "Rising pitch, new harmonic colors, and increasing volume all signal rising tension. The listener should feel that something important is about to happen." },
        { text: "Act 3 (4-5 min): Resolution. A final dramatic phrase — your Spaghetti Western melody from exercise 9-7 or something inspired by it. Then a slow descent back to quiet. End on a single sustained A with tremolo effect fading to silence.", why: "The resolution should feel earned — all the tension of Act 2 pays off in one powerful moment, then dissolves. The ending silence is part of the music." },
        { text: "Listen back if you recorded it. Does it feel like a scene? Can you hear the three acts? Would it work behind a moment in a film? If yes — you've graduated from cinematic guitar.", why: "Self-evaluation is how you develop artistic judgment. You're not just practicing technique — you're learning to compose and arrange in real time." }
      ],
      feel: "This should feel like directing a short film with your guitar. You're not playing songs — you're creating atmosphere, tension, and release. Every section serves the narrative.",
      wrong: "If it sounds like three separate exercises stitched together, work on smoother transitions between acts. If there's no dynamic contrast between acts, exaggerate the differences until they feel dramatic.",
      sarah: "This is the graduation exercise for cinematic guitar. You started Level 9 learning where to put your fingers for fingerpicking — now you're scoring imaginary films. That's real artistic growth.",
      levelUp: "You can create a convincing 3-act musical narrative with clear dynamic contrast, Phrygian drama, fingerpicked arpeggios, and tremolo atmosphere. Your guitar tells stories."
    }
  ]
};
