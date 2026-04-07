import { getPitchRange } from "../appData.js";

export const level14 = {
  level: 14,
  title: "Fingerpicking & Dynamics",
  subtitle: "New fingers. New voice. Same autopilot method.",
  description:
    "Fingerpicking is a completely different motor program from strumming — your right hand must relearn from scratch. Apply the same Level-1 autopilot process: drill the pattern until it's automatic, then layer voice on top. Fingerpicking + singing is the signature sound of intimate singer-songwriters: Nick Drake, Tommy Guerrero, Hermanos Gutierrez. This level also masters dynamic range — the difference between whisper and full voice. The embodied dimension: guitar and voice now operate as one instrument. The hear-feel-choose cycle runs for BOTH simultaneously — you feel the guitar phrase in your fingertips AND the vocal phrase in your chest and mask. Two streams of embodied music-making, unified by one body. When fingerpicking becomes autopilot, the body has enough bandwidth to run the cycle for voice and guitar in parallel. That's the integration this level builds.",
  artists: "Nick Drake, Tommy Guerrero, Hermanos Gutierrez, José González",
  unlocks: "Performance & Identity (Level 15)",
  review: { label: "Level 12-13 Check-In", time: 5, exercises: ["ss-12-6", "ss-13-4"], prompt: "Play your arranged song with dynamics (ss-12-6). Then check prosody on your latest lyrics (ss-13-4). Both polished? Move on." },
  exercises: [
    {
      id: "ss-14-1",
      time: 8,
      title: "Fingerpick Autopilot",
      type: "guitar",
      what: "Learn a basic fingerpicking pattern: thumb plays bass note (strings 4-6), index and middle alternate on treble strings (1-3). One chord: Am. Loop it until you can zone out — the conversation test from Level 1 applies again. This is autopilot training for a new motor program.",
      setup: "Guitar (nylon-string preferred). Metronome at 60 BPM. No pick — use your thumb and two fingers.",
      steps: [
        { text: "Hold Am. Thumb plays the A string (5th). Index plays the B string (2nd). Middle plays the high E string (1st). Pattern: Thumb-Index-Middle-Index. Feel each fingertip as a separate point of awareness — three tiny instruments, three body locations. Repeat.", why: "This T-I-M-I pattern is the most common fingerpicking pattern in folk and classical guitar. The thumb anchors the bass while fingers dance on treble." },
        { text: "Loop the pattern on Am for 3 minutes. Aim for even volume across all notes. Let your attention rest in the fingertips — feel the string's tension before each pluck, the release after. Each finger finds its string by touch, not sight.", why: "Evenness is the hallmark of good fingerpicking. Uneven volume makes the pattern sound clumsy. Each finger must find its string without looking." },
        { text: "Try the same pattern on C, then G, then Em. Same right-hand pattern, different left-hand chord. Feel the thumb adjust to each chord's bass string — a different thickness, a different vibration under the pad of the thumb.", why: "Each chord has a different bass string. Am=5th string, C=5th string, G=6th string, Em=6th string. The thumb must adapt." },
        { text: "Conversation test: can you fingerpick Am-C-G-Em and describe your room simultaneously? If yes, the fingers have their own embodiment cycle — feeling the strings, anticipating the next note, producing sound — running independently. That's autopilot.", why: "Same test as Level 1 strumming. If you can talk while picking, the motor program has moved to procedural memory." }
      ],
      feel: "Fingerpicking should feel delicate and rolling — a gentle cascade of notes instead of a strum. Each fingertip becomes a point of awareness: the thumb anchors in the bass like a heartbeat, the fingers dance on the treble like breath. The body's attention splits between hands in a new way. When the pattern reaches autopilot, the right hand runs its own embodiment cycle — feeling the strings before striking them — and frees the voice to run its own cycle on top. Two instruments, one body, one unified act.",
      wrong: "If your fingers are catching or producing uneven volume, slow down. Each note should ring clearly with equal volume. If your thumb keeps hitting the wrong bass string, watch it for a while — then close your eyes and feel. If the new technique feels wrong or awkward, that's proprioceptive recalibration — your body map is updating from 'strummer' to 'picker.' Trust the recording over how it feels for the first few sessions. The 'wrong' feeling is actually growth.",
      sarah: "Gene, fingerpicking + singing is the hardest integration in this curriculum. Your right hand needs a completely new autopilot. Be patient — this is Level 1 all over again, just with different fingers. For inspiration: Jack Johnson's 'Breakdown' (your #3 most-played song) uses Travis picking with percussive thumb slaps on beats 2 and 4 — the guitar becomes a one-person rhythm section. Your Travis picking from Guitar Level 13 (gs-13-5) is the engine here. Hollow Coves' 'Coastline' (G-Bm-A, fingerpicked throughout) even uses an alternate tuning (CGDGGD capo 7) for shimmering open-string resonance. And Tommy Guerrero takes it further — his approach is 'melody-as-vocalist,' the guitar sings a single melody line that a human voice would sing. His fingerpicking on a 1980s Japanese Telecaster through warm Fender amps creates a vocal-like tone. Ethio-jazz flavors, Gabor Szabo influence. All in your DNA.",
      metronome: 60,
      speedLadder: { start: 50, end: 80, increment: 5, bars: 8 },
      recorder: true
    },

    // ─── NEW: PATTERN VARIATIONS ───

    {
      id: "ss-14-2",
      time: 7,
      title: "Fingerpick Pattern Variations",
      type: "guitar",
      what: "Beyond T-I-M-I: learn T-I-M-A (classical arpeggio), T-I-T-M (alternating bass), and free fingerpick (no pattern — intuitive). Each pattern has a different rhythmic feel. Practice each over Am-C-G at slow tempo. Your right hand vocabulary determines your fingerstyle range.",
      setup: "Guitar (nylon-string preferred). Metronome at 50 BPM. Right hand relaxed, wrist slightly arched.",
      steps: [
        { text: "T-I-M-A pattern: Thumb on bass, then Index (3rd string), Middle (2nd string), Ring finger (1st string). A smooth upward arpeggio across 4 strings. Feel each finger as a separate body awareness — four points of contact, the vibration traveling up through the hand into the forearm. Loop on Am for 2 minutes.", why: "T-I-M-A is the classical guitar arpeggio — each finger gets its own string. It sounds harp-like and flowing. This is the foundation of classical and bossa nova fingerstyle." },
        { text: "T-I-T-M pattern: Thumb plays bass, Index picks treble, Thumb plays a DIFFERENT bass string, Middle picks treble. The alternating thumb creates a walking bass feel — feel the thumb's weight shifting between two strings, two different thicknesses, two different vibrations. Loop on C for 2 minutes.", why: "Alternating the thumb between two bass strings adds rhythmic complexity and a sense of movement. It's the bridge between simple fingerpicking and Travis picking." },
        { text: "Free fingerpick: no set pattern. Let your fingers find notes intuitively — some fast, some slow, some simultaneous. Play Am-C-G and let your right hand improvise. 2 minutes.", why: "Free fingerpicking breaks the pattern addiction. Real fingerstyle players mix patterns fluidly. This trains your right hand to respond to musical impulse, not repeat a loop." },
        { text: "Cycle through all three patterns over Am-C-G: 4 bars T-I-M-A, 4 bars T-I-T-M, 4 bars free. Increase metronome by 10 BPM each cycle up to 80.", why: "Switching patterns mid-progression is the real skill. Each pattern creates a different mood — having three in your vocabulary triples your expressive range." }
      ],
      feel: "Each pattern should have a distinct character: T-I-M-A is elegant and flowing, T-I-T-M is grounded and walking, free fingerpick is spontaneous and alive. Feel the difference.",
      wrong: "If all three patterns sound the same, you're not differentiating the right-hand movements. Exaggerate the differences. If the ring finger (A) is weak in T-I-M-A, isolate it — play just ring finger on the 1st string for a minute.",
      sarah: "Gene, three patterns give you three colors for fingerstyle. T-I-M-I was black and white — now you're adding color. Your nylon-string voice just got richer.",
      metronome: 50,
      speedLadder: { start: 50, end: 80, step: 10 },
      recorder: true
    },

    // ─── NEW: FEEL SHIFTS ───

    {
      id: "ss-14-3",
      time: 7,
      title: "Fingerpick Feel Shifts",
      type: "guitar",
      what: "Same Am-C-G progression, 3 fingerpick feels: folk roll (steady, even), classical arpeggio (flowing, harp-like), bossa nova pattern (syncopated, jazz-influenced). Like Level 7's strum feel shifts but for fingerpicking. Your right hand creates the genre, even in fingerstyle.",
      setup: "Guitar. Metronome at 60 BPM. Listen to the backing track for groove context before starting.",
      steps: [
        { text: "Folk roll: steady, even T-I-M-I over Am-C-G. Every note equal volume, equal spacing. Think Nick Drake's 'Pink Moon' — metronomic, hypnotic, meditative. 2 minutes.", why: "Folk roll is the default fingerpick feel — it's steady and predictable. The evenness IS the aesthetic. It creates a trance-like quality that supports intimate vocals." },
        { text: "Classical arpeggio: T-I-M-A with slight rubato (timing flexibility). Let the notes cascade, not march. Slight acceleration into each chord change, slight pause after landing. 2 minutes.", why: "Classical feel adds breathing room. The rubato (push and pull of timing) makes the pattern feel human and expressive rather than mechanical. This is José González territory." },
        { text: "Bossa nova: syncopated pattern — Thumb on beat 1, fingers on the 'and' of beat 2. The offbeat emphasis creates a gentle swing. Think 'Girl from Ipanema' fingerpick feel. 2 minutes.", why: "Bossa nova fingerpicking is syncopated — the accents fall between beats. This transforms the same chords into something warm and jazzy. Gene, this connects to your reggae offbeat instincts." },
        { text: "Shift between all three feels every 4 bars: folk roll → classical → bossa → folk roll. Same chords, same fingers, completely different music. The feel IS the genre.", why: "Feel shifts prove that genre lives in the right hand, not the left. The same Am-C-G becomes folk, classical, or bossa based entirely on how you pick — timing, accent, and flow." }
      ],
      feel: "Each feel should transport you to a different room. Folk roll is a cabin. Classical is a recital hall. Bossa nova is a beach bar at sunset. Same chords, three worlds.",
      wrong: "If the bossa nova pattern doesn't feel syncopated, you're probably playing it straight. Clap the rhythm first: 1-(and)-2-AND-3-(and)-4. The accent on the 'and' of 2 is the bossa DNA.",
      sarah: "Gene, this is Level 7's feel-shift concept applied to fingerpicking. Your reggae offbeat sense will make the bossa nova pattern feel natural — it's the same rhythmic instinct, different hand technique.",
      metronome: 60,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Bossa Nova 75", src: "/bossa-nova-75.mp3" }],
      recorder: true
    },
    {
      id: "ss-14-4",
      time: 8,
      title: "Fingerpick + Voice Integration",
      type: "song",
      what: "Apply the Level 2 speak-hum-sing method to fingerpicking: speak over the pattern, then hum, then sing. Same three stages, new motor challenge. The voice layers on top of an entirely different hand pattern.",
      steps: [
        { text: "Fingerpick Am-C-G at 60 BPM on autopilot. Now speak made-up phrases while picking. Notice the body running two streams simultaneously — fingertips feeling the strings, chest and mouth shaping words. If picking breaks, stop speaking and re-establish.", why: "Speaking is the easiest vocal task. If the picking breaks during speech, it's not automatic enough. Go back to ss-14-1." },
        { text: "Hum a melody contour over your fingerpicking. The body now holds two resonances: the vibration of the strings in the fingertips, the vibration of the hum in the chest. Two hear-feel-choose cycles running in parallel. Keep the picking steady — let the humming ride on top.", why: "Humming adds pitch without words. It's the intermediate step between speaking and singing." },
        { text: "Sing an original melody at a relaxed tempo. Hear each phrase forming in the chest before it emerges — the vocal line lives in one body stream while the fingertips run their own stream simultaneously. Two instruments, two points of body awareness, one body. Let the fingerpicking be louder than your voice. Guitar and voice breathe together.", why: "Fingerpicking + quiet voice is the Singer-Songwriter Aesthetic. Think Nick Drake — the guitar is prominent, the voice is intimate." },
        { text: "If the picking falls apart during singing, deploy escape hatch: simplify to thumb-only (bass notes) while singing. One body, one bass note, one voice — the simplest dual-instrument state. Then gradually add fingers back, one at a time, letting the body absorb each new stream.", why: "The escape hatch for fingerpicking is reducing to just the thumb. One bass note per chord is the minimum. Build back up from there." }
      ],
      feel: "Fingerpicked songs feel more intimate and exposed than strummed songs — each note is a separate physical event in the fingertip, each vocal note a separate resonance in the chest. The body runs two parallel streams of hear-feel-choose: the fingers feel the next string before striking, the voice feels the next note before singing. When both streams sync, guitar and voice breathe together as one instrument. That unity is the sound of embodied singer-songwriting.",
      wrong: "If you're treating fingerpicking like strumming (loud, aggressive), pull back. Fingerpicking is gentle. If your singing overwhelms the picking, sing quieter.",
      sarah: "Gene, fingerpicking unlocks the nylon-string, Hermanos Gutierrez, Tommy Guerrero side of your taste. It's a different sound world from strumming — more intimate, more spacious.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true,
      strumPattern: {
        notation: "T i m T i m T i",
        subdivision: "8ths",
        bpm: 60,
        description: "Basic fingerpick pattern: Thumb (T) on bass strings alternating, index (i) and middle (m) on treble strings. Pattern should feel like a gentle rolling wave."
      },
      dynamicArc: [
        { section: "Speak phase", intensity: "soft", notes: "Voice speaking rhythmically over picking. Guitar is primary." },
        { section: "Hum phase", intensity: "soft-medium", notes: "Voice adds pitch contour. Guitar and voice begin to breathe together." },
        { section: "Sing phase", intensity: "medium", notes: "Full singing. Two parallel hear-feel-choose streams running." }
      ],
      toneSettings: {
        pickup: "neck",
        effects: ["reverb:light-room"],
        capo: null,
        tuning: "standard",
        description: "Intimate, warm. Fingerpicking demands a softer, rounder tone than strumming. Neck pickup, tone rolled back slightly."
      }
    },

    // ─── NEW: ALTERNATE TUNING ───

    {
      id: "ss-14-5",
      time: 8,
      title: "Alternate Tuning Exploration",
      type: "guitar",
      what: "Drop D (low E string down to D). Play your familiar Am shape — the low D drone adds a new depth. Try open G (DGDGBD) — Keith Richards, Mississippi Delta blues. New tunings make old chords sound new and spark melodies you'd never find in standard. Cross-modal learning at its best.",
      setup: "Guitar. Tuner app or clip-on tuner. Start with Drop D — only one string changes.",
      steps: [
        { text: "Tune your low E string down one whole step to D. Strum all six strings open — the low D drone creates a powerful, earthy bass. Play a D chord: the open 6th string is now your root. Massive sound from minimal effort.", why: "Drop D is the simplest alternate tuning — one string, one step. It opens up bass drones and power chords that are impossible in standard tuning. Many desert blues and psych-rock songs use it." },
        { text: "Play your familiar Am, C, G shapes in Drop D. Notice how the bass note changes: Am now has a low D underneath, creating a Dm/A color. Experiment with which chords gain new character.", why: "Familiar shapes in new tunings produce unexpected harmonies. This is how many songwriters discover new chord voicings — the tuning does the creative work." },
        { text: "Fingerpick in Drop D: let the open 6th string (D) ring as a drone under your patterns. The thumb keeps returning to that low D while fingers dance on the treble strings.", why: "The D drone under fingerpicking creates a hypnotic, Tinariwen-like quality. The constant bass note anchors everything while the melody floats above it." },
        { text: "If you want to go further: try open G tuning (DGDGBD). Tune the 6th string to D, 5th to G, and 1st to D. Strum all strings open — it's a G major chord. Slide one finger across all strings at any fret for instant chords.", why: "Open G is the tuning of Keith Richards, Joni Mitchell, and Mississippi Delta blues. It makes the guitar a different instrument — simpler in some ways, richer in others." }
      ],
      feel: "Alternate tunings should feel like discovering a new instrument. The familiar guitar becomes unfamiliar — and that unfamiliarity sparks creativity. Embrace the disorientation.",
      wrong: "If you're trying to play standard-tuning songs in Drop D, you're missing the point. Let the tuning guide you to new sounds. Don't fight it — explore it.",
      sarah: "Gene, alternate tunings are how Tinariwen and Hermanos Gutierrez get their signature sounds. Drop D connects to your desert blues side. Open G connects to your psych-rock side. New tunings, new songs. DADGAD is the tuning behind desert blues and Celtic folk — two of your sonic worlds colliding. Tinariwen and Davey Graham both live here. You previewed this in ss-8-23 — now go deeper. Adrianne Lenker drops the HIGH E string to D for persistent drones on Big Thief records.",
      fretboard: { tuning: "drop-d" },
      recorder: true
    },

    // ─── NEW: FINGERPICK DYNAMICS pp-ff ───

    {
      id: "ss-14-6",
      time: 6,
      title: "Fingerpick Dynamics: pp to ff",
      type: "guitar",
      what: "Same fingerpick pattern at 4 dynamic levels: pianissimo (flesh of fingertip, barely audible), piano (gentle), forte (nail attack, full projection), fortissimo (aggressive, percussive). Dynamic range IS the performance in fingerstyle — one pattern, four completely different sounds.",
      setup: "Guitar (nylon-string preferred). Metronome at 50 BPM. Quiet room — you need to hear the subtlest dynamics.",
      steps: [
        { text: "Pianissimo (pp): fingerpick Am using only the flesh of your fingertips. Barely brush the strings. The sound should be almost inaudible — intimate, secret, like playing for someone asleep nearby. 90 seconds.", why: "Flesh-only contact produces a warm, round, muted tone. This is the quietest a fingerpicked guitar can be. It's the dynamic floor — the baseline from which all other dynamics are measured." },
        { text: "Piano (p): slightly more pressure, still flesh-dominant. The notes ring clearly but gently. This is your default fingerpicking dynamic — the Nick Drake zone. 90 seconds.", why: "Piano is the comfortable home base for fingerstyle. Most intimate singer-songwriter music lives here. It's gentle enough to sit under a quiet voice without competing." },
        { text: "Forte (f): engage your fingernails. Attack the strings with purpose — each note projects clearly across the room. The tone becomes brighter, more present, more assertive. 90 seconds.", why: "Nail attack changes both volume and timbre. The brightness cuts through a mix and commands attention. This is the dynamic level for choruses and climactic moments." },
        { text: "Fortissimo (ff): aggressive nail attack, almost percussive. The strings buzz slightly against the frets. Raw, urgent, intense. Then cycle through all four levels: pp → p → f → ff → p. Feel the gear shifts. 90 seconds.", why: "The full dynamic arc in fingerstyle is enormous — from barely audible to percussive attack. Controlling this range gives you the power to shape an entire song's emotional journey with one hand." }
      ],
      feel: "Each dynamic level should feel physically different in your fingertips AND in your whole body. pp is a caress — the body is still, breathing shallow, intimate. p is a touch — settled and warm. f is a press — the chest opens, the shoulders engage. ff is a strike — the whole torso activates, energy radiating outward. The dynamic level isn't just a volume setting; it's a full-body state. Zamorano (2025) showed that interoceptive awareness — feeling your body's internal state — predicts dynamic control. The fingers follow the body.",
      wrong: "If pp and p sound the same, you're not going quiet enough. If f and ff sound the same, you're not engaging your nails aggressively enough. Exaggerate the extremes — you can always pull back later.",
      sarah: "Gene, fingerpick dynamics are your secret weapon. Most guitarists play at one volume. You'll have four gears — and the ability to shift between them mid-song. That's what makes fingerstyle performances riveting.",
      volumeMeter: true,
      speedLadder: { start: 50, end: 70, step: 10 },
      recorder: true
    },
    {
      id: "ss-14-7",
      time: 8,
      title: "Travis Picking",
      type: "guitar",
      what: "Learn alternating bass (Travis picking): the thumb alternates between two bass strings while fingers pick a pattern on the treble strings. This creates the illusion of two guitars — a bass line AND a melody simultaneously. It's the hallmark of folk fingerstyle.",
      setup: "Guitar. Metronome at 55 BPM. Start slower than you think you need to.",
      steps: [
        { text: "Hold C. Thumb alternates: 5th string (C) then 4th string (E). Just the thumb, alternating, in time. Feel the thumb's weight shift between the two strings — each has a different tension, a different thickness under the pad. Let the thumb develop its own awareness. 2 minutes.", why: "The alternating thumb IS Travis picking. It creates a walking bass line. Getting the thumb independent is the hardest part." },
        { text: "Add index finger: pinch the 2nd string (B) with your thumb-strike on the 5th string. Then thumb plays 4th string alone. Pattern: Pinch-Thumb-Pinch-Thumb. Feel the pinch as two simultaneous vibrations — the bass rumbling through the thumb pad, the treble singing through the fingertip. Two streams entering the body at once, like hearing your voice and your breath separately.", why: "The pinch (thumb + finger together) is the backbone of Travis picking. It emphasizes beat 1 while the bass walks." },
        { text: "Try on G: thumb alternates 6th string (G) and 4th string (D). Index pinches the 2nd string on beat 1. Same pattern, new bass notes. The wider string spacing under the thumb creates a more spacious physical sensation — the hand opens, the bass breathes.", why: "G is the classic Travis picking chord — the wide bass alternation (6th to 4th string) creates a big, spacious bass line." },
        { text: "Chain C (4 beats) → G (4 beats) → Am (4 beats) → G (4 beats). Travis picking through the changes. The thumb finds each chord's bass strings by feel, not thought — the hand's body map guides it to the right string. When the thumb moves automatically, it's running its own cycle.", why: "Travis picking through chord changes is the goal. When the thumb finds the right bass strings without conscious thought, it's autopilot." }
      ],
      feel: "Travis picking should feel like your thumb has its own brain — it walks the bass independently while your fingers handle the melody. Two parts, one guitarist.",
      wrong: "If your thumb and fingers are playing at the same time on every beat, you're not alternating. The thumb alternates bass notes BETWEEN the finger picks. Slow down until you can hear the independence.",
      sarah: "Gene, Travis picking is the technique behind Tommy Guerrero's guitar work and Jack Johnson's 'Breakdown.' It sounds complex but it's just a thumb alternation with a simple finger pattern on top. Tommy Guerrero's approach is 'melody-as-vocalist' — the guitar sings a single line where the Travis thumb provides the rhythm section and the fingers provide the vocal melody. That's the power of this technique: you become the whole band. The full 5-phase independence protocol for Travis picking + singing is in ss-14-16 below. Get the thumb automated here first — that's Phase 1 of the protocol.",
      metronome: 55,
      speedLadder: { start: 45, end: 70, increment: 5, bars: 4 },
      recorder: true
    },

    // ─── NEW: VOCAL HARMONIZING ───

    {
      id: "ss-14-8",
      time: 7,
      title: "Vocal Harmonizing with Yourself",
      type: "vocal",
      what: "Sing a simple melody. Record it. Play it back and sing a harmony a 3rd above. Then try a 3rd below. Then an octave above. Basic vocal arranging for recording — stacking your own voice. This is how DOPE LEMON and Skinshape create their lush vocal textures.",
      setup: "Phone or recorder. Headphones (to hear playback while singing the harmony). Quiet room.",
      steps: [
        { text: "Sing a simple 4-bar melody over Am-C: something memorable, in porch register around G3-D4. Record it clearly. This is your 'lead vocal.'", why: "The lead vocal must be simple and stable — it's the foundation that harmonies stack onto. Complex melodies are harder to harmonize. Start simple." },
        { text: "Play back the recording through headphones. Hear the harmony note internally before singing — feel it sitting slightly higher in the mask than the lead. Sing a 3rd ABOVE each note. If the lead sings A, you sing C. If the lead sings C, you sing E. Let your ear and body find it together. Record this pass.", why: "A 3rd above is the most natural harmony interval. Your ear will gravitate toward it instinctively. This is the harmony in every Beatles song, every CSNY song, every Skinshape track." },
        { text: "Play back the lead again. Now sing a 3rd BELOW each note — feel the resonance drop deeper into the chest, richer and warmer than the lead. If the lead sings A, you sing F. If the lead sings C, you sing A. Record it.", why: "A 3rd below creates a richer, warmer sound than a 3rd above. It adds bass to your vocal arrangement. Together with the lead and the upper harmony, you have a three-part stack." },
        { text: "Listen to all three layers together (if your recorder supports it) or just appreciate how each harmony changes the emotional weight of the melody. This is vocal arranging — your voice, multiplied.", why: "Stacking harmonies is the production technique behind lo-fi, bedroom-pop, and psych-folk. DOPE LEMON's lush vocals are just one voice recorded multiple times at different intervals." }
      ],
      feel: "Harmonizing with yourself should feel like a conversation between versions of you — the lead voice lives in the chest (warm, centered), the upper harmony lifts to the mask (bright, supporting), the lower harmony settles into the belly (rich, grounding). Each voice occupies a different body location. Together, they fill the whole body with sound. Stacking harmonies is embodied polyphony: one body, three resonant locations, three versions of you singing from different physical places.",
      wrong: "If your harmony keeps snapping back to the melody (singing in unison instead of a 3rd), close your eyes and focus only on the interval. Sing the harmony WITHOUT the playback first to lock it in your ear, then add the playback.",
      sarah: "Gene, this is how you create the warm, layered vocal sound you love in DOPE LEMON and Skinshape. One voice, recorded three times, becomes a choir. Lo-fi vocal production starts here.",
      recorder: true,
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "A4"], label: "Harmony Notes", range: ["A3", "A4"] }
    },

    // ─── NEW: DYNAMIC PHRASING ───

    {
      id: "ss-14-9",
      time: 7,
      title: "Dynamic Phrasing: Swell & Decay",
      type: "vocal",
      what: "Within a single held note: start quiet, swell to full voice, then decay back to silence. This is 'messa di voce' — the most expressive vocal technique in existence. Then apply it to phrases: start each phrase quiet and bloom, or start full and fade. Note-level dynamics create emotional contour.",
      setup: "Quiet room. No guitar — voice only for focus. Metronome at 60 BPM for timing reference.",
      steps: [
        { text: "Hold a comfortable note (A3). Start at pianissimo — barely audible breath tone, the vibration a private hum barely leaving the chest. Over 8 beats, crescendo smoothly to forte — feel the body gradually opening, the chest expanding, the resonance radiating outward from a seed to a full bloom. Then over 8 beats, decrescendo back to pianissimo — the body closing gently, the sound retreating inward. One note, 16 beats, a complete dynamic arc traced through the body.", why: "Messa di voce (placing the voice) is the foundational vocal dynamic exercise. It trains independent volume control — changing loudness without changing pitch, vowel, or tone quality." },
        { text: "Repeat on different pitches: E3 (low), D4 (mid), G4 (upper range). E3 swells from a warm belly rumble to a chest resonance. D4 blooms from throat to mask. G4 expands from a focused mask buzz to a ringing head tone. Each pitch swells through a different body corridor.", why: "Dynamic control varies across your range. Low notes are easier to keep quiet; high notes naturally project. Training swells at every pitch builds even dynamic control across your full range." },
        { text: "Apply to phrases: sing a 4-bar melody where each phrase STARTS quiet and BLOOMS to full voice by the end. Like a wave building and cresting. This is the 'crescendo phrase' shape.", why: "The crescendo phrase creates anticipation and arrival — each phrase builds toward its most important word. This is how Thom Yorke and Jeff Buckley shape individual lines." },
        { text: "Reverse it: sing phrases that START at full voice and FADE to a whisper. The 'decrescendo phrase' shape. Each phrase melts away. Then alternate: one phrase blooms, the next fades. Dynamic phrasing as musical architecture.", why: "Decrescendo phrases create intimacy and vulnerability — the voice retreating inward. Alternating bloom and fade phrases creates a breathing, living dynamic contour across a whole verse." }
      ],
      feel: "Each note should feel like a tide — rising and falling through the body. The swell is not a volume knob turning up; it's the whole body opening: the chest expands, the resonance moves from the low belly upward through the chest into the mask at peak volume, then retreats back down as the note decays. Breath, resonance, and intention all working as one embodied act. The hear-feel-choose cycle operates within a single sustained note — you feel the dynamic arc in the body and let the voice trace what the body shapes.",
      wrong: "If the swell sounds like a step function (quiet-LOUD-quiet) instead of a smooth curve, slow down. Use twice as many beats. The transition should be imperceptible at any single moment — only obvious over the full arc.",
      sarah: "Gene, messa di voce is what separates singers who 'control dynamics' from singers who 'sculpt sound.' Your porch register is already quiet — this gives you the tools to bloom from that quiet place into full voice and back again.",
      volumeMeter: true,
      volumeContour: true,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: PERCUSSION + FINGERPICKING ───

    {
      id: "ss-14-10",
      time: 7,
      title: "Percussion + Fingerpicking",
      type: "guitar",
      what: "Add body percussion ON the guitar between fingerpicks: thumb slap on strings (snare sound), palm tap on body (kick drum), nail tap on face (hi-hat). Tommy Guerrero and Khruangbin use these techniques. Your guitar becomes a full rhythm section — bass, drums, and melody from one instrument.",
      setup: "Guitar. Metronome at 70 BPM. Nylon or steel — both work, different percussive tones.",
      steps: [
        { text: "Thumb slap: while fingerpicking Am, slap the side of your thumb against the bass strings on beat 3. The muted 'thwack' sounds like a snare drum. Practice: fingerpick beats 1-2, thumb slap beat 3, fingerpick beat 4. Loop for 2 minutes.", why: "The thumb slap is the most common guitar percussion technique. It adds backbeat (beats 2 and 4 in most music, beat 3 in this exercise) without stopping the fingerpicking. Tommy Guerrero does this constantly." },
        { text: "Palm tap: tap the heel of your right palm on the guitar body (near the bridge) on beat 1. This is your 'kick drum.' Combine with the thumb slap: palm tap (beat 1), fingerpick (beat 2), thumb slap (beat 3), fingerpick (beat 4). A full drum pattern on guitar.", why: "The palm tap produces a deep, woody thud — the guitar body IS a drum. Combined with the thumb slap, you now have kick and snare sounds integrated into your fingerpicking." },
        { text: "Nail tap: lightly tap your fingernails on the guitar face (top, near the soundhole) between fingerpick notes. These tiny taps are hi-hat ghosts — rhythmic texture that fills the spaces. Add them on the 'and' of each beat.", why: "Nail taps add subdivision and texture. They're subtle but felt. The listener hears a fuller rhythm without knowing where the extra groove is coming from." },
        { text: "Combine all three percussion sounds with your Am-C-G fingerpick pattern. Don't rush — add one percussion element at a time. When all three feel natural, you're playing bass, drums, and melody simultaneously.", why: "Percussive fingerstyle turns one guitarist into a three-piece band. This is the technique behind Tommy Guerrero's solo recordings and Khruangbin's guitar textures. One instrument, full arrangement." }
      ],
      feel: "Percussive fingerpicking should feel rhythmically complete — like a one-person band. The groove should make you nod your head even without a drummer. The percussion is subtle but powerful.",
      wrong: "If the percussion is overpowering the fingerpicked notes, lighten your slaps and taps. Percussion should be FELT more than heard — rhythmic seasoning, not the main dish. If it disrupts your fingerpick pattern, drop back to just one percussion element.",
      sarah: "Gene, this is the Tommy Guerrero technique — guitar as a full rhythm section. Your surf-rock and reggae instincts will love this. The backbeat thumb slap connects directly to your reggae offbeat feel.",
      metronome: 70,
      recorder: true
    },
    {
      id: "ss-14-11",
      time: 8,
      title: "Dynamic Range",
      type: "vocal",
      what: "Master the full dynamic range of your voice: from near-whisper (pp) to full chest voice (ff). Most singer-songwriters use 20% of their dynamic range. This exercise maps the full spectrum and trains you to control it.",
      steps: [
        { text: "Sing a sustained A at the quietest volume possible — barely audible, intimate, a vibration that barely leaves the body. Feel it as a private warmth behind the sternum, meant for no one but you. This is pp (pianissimo). Hold it for 8 beats.", why: "The whisper-sing is an underused tool. DOPE LEMON, Nick Drake — much of their vocal power comes from how quiet they can be." },
        { text: "Gradually increase volume over 8 bars — from pp to mp to mf to f to ff. Feel the body open in stages: the chest expanding, the breath deepening, the resonance moving from an interior hum to something that fills the room. One smooth crescendo. Then reverse: ff back down to pp — the body closing, the sound returning to its private place.", why: "The crescendo/decrescendo exercise maps your full range and trains smooth transitions. Sudden jumps are less musical than gradual shifts." },
        { text: "Sing a melody at pp (whisper). Then the same melody at ff (full voice). Notice how the body changes — not just the volume. At pp, the body is still, the breath shallow, the resonance interior. At ff, the whole torso activates, the breath deepens, the resonance projects outward. Your voice has different body states at different volumes.", why: "Quiet voice is intimate, breathy, vulnerable. Loud voice is confident, warm, present. Both are tools. Most songs need both." },
        { text: "Create a song section where the first phrase is pp and the second is ff. Feel the body-state shift as you transition — from closed and intimate to open and projecting. That shift should feel intentional, like standing up from a whisper.", why: "Dynamic contrast within a section is the most dramatic tool in performance. Whispering then projecting in the same verse creates emotional whiplash — in a good way." }
      ],
      feel: "Dynamic range should feel like having gears — each volume level is a different gear for a different purpose. Shifting smoothly between them is the art.",
      wrong: "If your quiet singing is just regular singing but softer, you're not using the breathy register. True pp uses more air and less cord closure — it sounds different, not just quieter.",
      sarah: "Gene, your porch register is naturally quiet. This exercise extends the OTHER end — finding your full chest voice. You don't need to belt, but you need volume contrast for dynamics to work.",
      metronome: 60,
      volumeMeter: true,
      referencePitches: getPitchRange("A3", "A4"),
      recorder: true
    },

    // ─── NEW: THE INTIMATE RECORDING ───

    {
      id: "ss-14-12",
      time: 8,
      title: "The Intimate Recording",
      type: "record",
      what: "Recording aesthetics for Gene's 'warm, analog, lo-fi' sound. Phone placement: 6 inches from guitar soundhole + 12 inches from mouth (angle up). Proximity creates bass warmth. Room reverb: small room with soft surfaces. Record your best fingerpicked song with intentional mic placement. The recording IS part of the art.",
      setup: "Phone or recording device. Small room (bedroom ideal — soft surfaces absorb harsh reflections). No post-processing — capture the sound right at the source.",
      steps: [
        { text: "Mic placement experiment: record 30 seconds of fingerpicking with your phone 6 inches from the soundhole. Then 12 inches. Then 24 inches. Listen back — hear how proximity adds bass warmth and intimacy while distance adds room ambience.", why: "The proximity effect is real physics: closer mic = more bass frequencies captured. This is how lo-fi and bedroom recordings get their warmth without any EQ or processing. Distance is your reverb knob." },
        { text: "Angle experiment: phone pointed at the soundhole captures the fullest guitar tone. Pointed at the 12th fret captures more string clarity. Pointed at your mouth captures more voice. Find the angle that balances guitar warmth and vocal clarity.", why: "Mic angle determines the balance between guitar and voice in a single-mic recording. Angling up from the guitar body toward your mouth is the classic singer-songwriter sweet spot." },
        { text: "Room experiment: record in the smallest, softest room available (closet, bedroom with curtains). Then try a harder room (bathroom, kitchen). The room IS your reverb. Choose the one that matches your aesthetic.", why: "Small soft rooms = dry, intimate, lo-fi. Hard rooms = reverb, spacious, ethereal. Both are valid aesthetics. Gene's preference for 'warm, analog' points toward the soft room." },
        { text: "Final take: set up your phone at the best angle and distance you discovered. Play your best fingerpicked song from this level. One take, no edits. The imperfections ARE the lo-fi aesthetic. This recording is the artifact of your Level 13 work.", why: "Intentional recording transforms practice into art. The choices you made about placement, angle, and room are production decisions. Lo-fi isn't about bad equipment — it's about deliberate simplicity." }
      ],
      feel: "Recording should feel like a ritual — setting up the space, finding the right angle, committing to a single take. The constraints of lo-fi recording (one mic, one room, one take) force focus and presence.",
      wrong: "If you're fussing with settings and retaking endlessly, you've lost the lo-fi spirit. One or two takes maximum. The first take often has the most life. Imperfections are features, not bugs.",
      sarah: "Gene, your 'warm, analog, reverb-drenched, lo-fi' aesthetic starts with mic placement, not plugins. This exercise teaches you to capture the sound you love at the source. The recording IS the art.",
      recorder: true,
      checklist: true
    },
    {
      id: "ss-14-13",
      time: 10,
      title: "Fingerpicked Original",
      type: "song",
      what: "Create an original fingerpicked song — intimate, dynamic, personal. Use your best lyrics, a pentatonic melody in porch register, and the full dynamic arc: fingerpicked intro (pp) → sung verse (mp) → chorus with more energy (f) → back to fingerpicking (pp).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Create a fingerpicking pattern for Am-G-C-Em (or any progression). Let the fingertips learn the strings until the pattern runs on its own — feel the right hand develop its own quiet cycle of anticipation and release. Get it flowing on autopilot at 60 BPM.", why: "The fingerpicking pattern is the foundation. It must be invisible before you layer voice, dynamics, and lyrics." },
        { text: "Compose a verse melody: low range, intimate delivery, sparse lyrics about something real. Sing it over the fingerpicking. Feel the two streams — fingertips and voice — breathing together, both intimate, both passing through the body before they become sound.", why: "Fingerpicked songs demand simpler, more personal lyrics. The intimacy of the guitar demands intimacy from the words." },
        { text: "Create a chorus that's slightly louder and higher — but still intimate. Maybe switch to light strumming for the chorus. Feel the body shift: the hands open from precise fingertip work to the broader sweep of a strum, the voice lifts from chest whisper to mask warmth.", why: "The fingerpick → strum transition is a natural dynamic shift. It creates section contrast without the voice needing to change dramatically." },
        { text: "Arrange: fingerpick intro (8 bars) → verse (8 bars) → chorus (strum, 8 bars) → verse (fingerpick, 8 bars) → chorus → fingerpick outro. Feel the arc as a body journey — intimate and interior, expanding outward, then returning to the quiet private place where the song began. Record.", why: "The fingerpick-strum-fingerpick arc mirrors breathing — intimate, expansive, intimate again. It's the song's dynamic skeleton." }
      ],
      feel: "A fingerpicked original should feel like a late-night confession — quiet, personal, slightly vulnerable. The fingertips and the voice are both intimate instruments now, both running the hear-feel-choose cycle in parallel, both producing sound that passes through the body before it becomes audible. Guitar and voice breathe together. Dynamic swells happen in both instruments simultaneously because one body is driving both. This is embodied guitar-voice unity: the song flows through you, not from two separate sources.",
      wrong: "If it sounds like a strummed song with different hand technique, you haven't embraced the fingerpicking aesthetic. Pull back your voice, slow down, leave more space. Fingerpicking songs breathe slowly.",
      sarah: "Gene, this is the Nick Drake / Tommy Guerrero side of your musical identity. Intimate, warm, slightly melancholic. This song reveals a different you than the reggae or surf originals.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true,
      levelUp: "Can fingerpick and sing simultaneously, play multiple fingerpick patterns and shift between feels, explore alternate tunings for new sonic territory, control fingerpick dynamics from pp to ff, use Travis picking, harmonize with yourself through recording layers, shape notes with swell and decay, add percussion to fingerstyle, record with intentional warm lo-fi aesthetics, control full dynamic range (pp to ff), and create intimate fingerpicked originals with dynamic arcs.",
      songStructure: [
        { name: "Intro (fingerpick)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Em"] },
        { name: "Verse (fingerpick)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Em"] },
        { name: "Chorus (strum)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Em"] },
        { name: "Verse (fingerpick)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Em"] },
        { name: "Chorus (strum)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Em"] },
        { name: "Outro (fingerpick)", bars: 8, chords: ["Am", "G", "C", "Em", "Am", "G", "C", "Am"] }
      ],
      strumPattern: {
        notation: "T i m T i m T i",
        subdivision: "8ths",
        bpm: 60,
        description: "Fingerpick verses: thumb alternating bass, index/middle on treble. Strum choruses: gentle down-up pattern. The texture change IS the arrangement."
      },
      dynamicArc: [
        { section: "Intro", intensity: "pp", notes: "Fingerpicking alone. Setting the intimate mood." },
        { section: "Verse", intensity: "mp", notes: "Voice enters low, porch register. Guitar stays quiet underneath." },
        { section: "Chorus", intensity: "f", notes: "Switch to strumming. Voice lifts. The texture change creates the energy shift." },
        { section: "Outro", intensity: "pp", notes: "Return to fingerpicking. Voice drops out. Circular form — ending mirrors beginning." }
      ],
      toneSettings: {
        pickup: "neck",
        effects: ["reverb:warm-plate"],
        capo: null,
        tuning: "standard",
        description: "Warm, intimate. Plate reverb for depth without brightness. The fingerpicked original should sound like a late-night recording — close, personal, slightly lo-fi."
      }
    },

    // ─── NEW: ALTERNATE TUNINGS & DYNAMIC STORYTELLING ───

    {
      id: "ss-14-14",
      time: 8,
      title: "Open Tuning Exploration — New Sonic Territory",
      type: "guitar",
      what: "Drop into DADGAD or Open D (DADF#AD). Same fingers, completely different sounds. The constraint: DON'T learn new chord shapes — just play the shapes you already know and discover what happens. Alternate tunings bypass your habits and reveal melodies your standard-tuning brain would never find.",
      setup: "Guitar (acoustic preferred — alternate tunings shine on acoustic). Tuner app. Recorder. NO metronome — this is free exploration. Voice check: 4-in/6-out breath x3, hum-sigh to settle the body.",
      steps: [
        { text: "Tune to DADGAD: from standard, drop the low E to D, the B string to A, and the high E to D. Strum all six open strings. This is your new 'home chord' — a Dsus4 that's neither major nor minor, open and ambiguous. Close your eyes. Feel the resonance — where does it live in the body? The open strings ring longer, creating a shimmering, meditative wash that settles in the chest and radiates outward.", why: "DADGAD is the tuning of Celtic, Moroccan, and ambient folk music. Its open strings create a natural drone that eliminates the need for complex chord shapes. The tuning itself does half the harmonic work — Jimmy Page used it for 'Kashmir,' Pierre Bensusan built an entire career on it, and it's the gateway tuning for every guitarist exploring modal and world music (Sharkey 2014 — alternate tunings and creative exploration)." },
        { text: "Play the Am shape you know from standard tuning. It's now a completely different chord — what does it sound like? What does it FEEL like in your body? Move the shape up 2 frets. Down 2 frets. Some positions will sound amazing — dissonant clusters will resolve into unexpected beauty. Some will sound strange. The strange ones are discoveries, not mistakes.", why: "Familiar shapes in unfamiliar tunings produce harmonic surprises that bypass your trained expectations. This is 'productive disorientation' — your fingers know what to do, but your ears hear something new. The surprise activates the same neural reward circuits as improvisation (Limb & Braun 2008 — neural substrates of spontaneous musical performance)." },
        { text: "Explore: move shapes up and down the neck slowly. When you find a chord that resonates — that makes your body respond with a 'yes' — stay there. Play it repeatedly. Let the resonance build. Add another shape nearby. You're building a progression by feel, not by theory. The tuning guides you.", why: "In alternate tunings, the ear leads and theory follows. The usual harmonic rules don't apply — you can't calculate what a chord 'should' be, so you must rely entirely on embodied listening. This trains the deepest level of the hear-feel-choose cycle: pure sonic response, uncorrupted by theoretical expectation." },
        { text: "Sing over the new tuning. Your voice may find melodies it never found in standard tuning — the harmonic landscape has shifted, and the intervals available to your voice have changed. Let the open strings drone while you improvise vocally. The drone + voice combination in DADGAD creates a natural desert blues / world music texture.", why: "Alternate tunings change the harmonic palette available to the voice. Notes that clashed with standard-tuning chords now consonant; notes that were safe now create tension. This forces the voice out of pentatonic habits and into new melodic territory. Tommy Guerrero's most meditative pieces use altered tunings for exactly this reason — the guitar becomes a landscape the voice explores." },
        { text: "Record a 2-3 minute improvisation in the alternate tuning: guitar + voice, free tempo, no structure. This is raw material for a future song. Let the tuning do the work — your job is to listen and respond. The body and the guitar are in a new conversation.", why: "Unstructured improvisation in alternate tunings produces material that can't be generated any other way. The recording captures ideas that exist only in the moment — the specific combination of tuning, mood, voice, and physical state that produced them. Many singer-songwriters' most distinctive songs originated in alternate tuning explorations (Joni Mitchell, Nick Drake, John Fahey)." },
        { text: "Before retuning to standard, play your new discoveries one more time. Hum the melodies. Let them settle into memory. The body remembers tunings kinesthetically — next time you drop into DADGAD, your fingers will find these shapes faster.", why: "Motor memory consolidation for alternate tunings follows the same sleep-dependent process as standard tuning learning (Walker 2017). Playing the discoveries once more before stopping primes the consolidation. Tomorrow, the shapes will feel more familiar than they do right now." }
      ],
      feel: "Alternate tuning exploration should feel like arriving in a foreign country where you speak just enough of the language to get by. Everything is slightly unfamiliar — your fingers know the shapes but the sounds are new. The open strings create a constant drone that changes the body's relationship to the guitar: instead of constructing chords, you're swimming in resonance. DADGAD in particular creates a meditative, Middle Eastern / Celtic quality that settles deep in the chest. If you lose track of time, the tuning is working.",
      wrong: "If you're trying to learn 'DADGAD chord charts' from the internet, you've missed the point. This exercise is about DISCOVERY through familiar shapes, not memorizing new ones. If everything sounds dissonant, try Open D (DADF#AD) instead — it's a major chord when strummed open, which gives more immediately pleasing results. If your voice can't find melodies, simplify: just sing one note that fits the drone, then slowly add a second note. VOCAL TIP: Let the open strings ring while you sing — the drone gives your voice a harmonic anchor, making it easier to find resonant notes.",
      sarah: "Gene, Tommy Guerrero uses alternate tunings constantly — that ambient, meditative quality comes from strings ringing open in unexpected ways. His nylon-string fingerpicking in DADGAD creates the warm, spacious sound you love. Tinariwen's guitarists use open tunings as their standard — the desert blues drone IS an open tuning. And Nick Drake's 'Pink Moon' uses an alternate tuning for its haunting, intimate quality. You're not learning a new technique — you're accessing a sound world that's already in your DNA.",
      recorder: true,
      drone: { note: "D3", type: "fifth" }
    },
    {
      id: "ss-14-15",
      time: 7,
      title: "Dynamic Storytelling — Volume as Narrative",
      type: "song",
      what: "Use dynamics to tell a story within a single fingerpicked song. The volume arc IS the emotional arc: pp opening (intimate, private) → gradual build to f (climax) → sudden drop to pp (broken open) → settle at mp (resolved). No lyrics needed — volume alone creates narrative.",
      setup: "Guitar (fingerpicking). Recorder. Quiet room (dynamics require silence to work). Voice check: 4-in/6-out breath x3, then sing a sustained note at pp, mp, and f to calibrate your dynamic range.",
      steps: [
        { text: "Play a fingerpicked pattern at pp — barely audible. Sing at pp. This is the opening: intimate, private, like a secret being told. Feel the body contract slightly inward — the breath is shallow, the resonance lives in the very center of the chest, close and warm. The fingers touch the strings so lightly they almost don't make contact. 8 bars.", why: "pp (pianissimo) in both guitar and voice creates an intimacy that pulls the listener in. The quietness demands attention — the listener leans forward. This is the singer-songwriter's secret weapon: vulnerability through volume, not through words (Patel 2008 — dynamics as emotional communication in music)." },
        { text: "Gradually build to mf over 8 bars. The story is growing — the fingers press slightly harder, the voice opens slightly, the breath deepens. Feel the resonance expanding outward from the chest center: the belly engages, the throat opens, the mask begins to buzz. Each bar is slightly louder than the last. The crescendo should be so gradual it's almost imperceptible bar-to-bar but dramatic over 8 bars.", why: "Gradual crescendo creates anticipation — the listener's body mirrors the building intensity. Neuroimaging studies show that musical crescendos activate the same reward circuits as building anticipation in other domains (Salimpoor et al. 2011). The body's resonance expansion mirrors the volume expansion: more body surface area vibrating = more emotional investment." },
        { text: "Climax: f (forte) for 2 bars. The emotional peak. The fingers attack the strings with purpose, the voice opens fully — mask, chest, belly all resonating. This is the loudest, most exposed moment. Don't hold back. The body opens completely — posture expands, breath deepens fully, the sound fills the room.", why: "The climax only works because of the quiet that preceded it. Dynamic contrast is the mechanism — f after pp has 10x the emotional impact of f after mf. The body's full opening at the climax creates a physical sensation of catharsis that mirrors the emotional content (Huron 2006 — Sweet Anticipation)." },
        { text: "Immediately drop to pp. No gradual decrescendo — a sudden, dramatic drop. The contrast after the peak creates a 'broken open' feeling. The body contracts back inward, but differently than the opening: softer, more tender, changed by what just happened. The voice is quiet but warm. 4 bars.", why: "Subito piano (sudden quiet) after a climax is one of the most powerful emotional devices in music. The sudden silence where volume used to be creates a felt absence — the listener's body was expanded and now contracts, creating a physical sensation of loss or relief. Beethoven used this constantly. In singer-songwriter music, it's the 'quiet after the storm' (Zbikowski 2002 — musical meaning and embodied cognition)." },
        { text: "End at mp — settled, resolved, but changed from the opening. Not as quiet as pp (you've been through something) but not as loud as f (the storm has passed). The body finds a new resting state: more open than the beginning, carrying the memory of the climax. 4 bars, ending on a sustained chord that rings out naturally.", why: "The mp ending represents transformation — the song began at pp (closed, private) and ends at mp (more open, more present). The dynamic arc tells a story without a single word: intimacy → growth → climax → vulnerability → resolution. This is narrative through volume alone." },
        { text: "Record the full arc. Listen back with eyes closed. Feel the emotional journey created ONLY by volume — no lyrics, no key change, no tempo shift. Just soft to loud to soft to settled. If the volume arc creates an emotional response in your body during playback, the dynamics are working.", why: "The playback test confirms that dynamics alone carry narrative weight. If you feel something during the quiet-loud-quiet arc, you've proven that volume is an independent storytelling tool — one you can now layer WITH lyrics and melody for even more impact in your originals." }
      ],
      feel: "Dynamic storytelling should feel like acting a scene with volume instead of words. The pp opening is a whisper in a dark room. The crescendo is dawn breaking. The f climax is noon sun. The subito pp is a cloud passing over. The mp ending is golden hour — warm, settled, beautiful because it won't last. Each dynamic level activates a different body state: pp contracts inward (intimacy), mf opens the chest (presence), f opens everything (catharsis), subito pp creates a tender vulnerability that's different from the opening's privacy. The body narrates the story through its own expansion and contraction.",
      wrong: "If the whole piece sounds the same volume, you're not committing to the extremes. pp should be BARELY AUDIBLE — your neighbor shouldn't hear you. f should fill the room. The range between them is your narrative palette. If the transitions feel mechanical ('now I'm louder'), slow down and feel the emotional motivation for each dynamic shift. The volume changes because the feeling changes, not the other way around. VOCAL TIP: If you can't sing quietly without going breathy/airy, support from the diaphragm even at pp — quiet doesn't mean unsupported. The breath column stays steady; only the volume changes.",
      sarah: "Gene, Nick Drake's entire catalog is a masterclass in dynamic storytelling — 'Pink Moon' barely rises above a whisper, and the quiet IS the emotional power. José González builds entire songs on the contrast between fingerpicked whisper and suddenly full voice. Your fingerpicked originals from ss-14-13 are ready for this treatment — take one and apply the pp → mf → f → pp → mp arc. The song you already wrote just gained a new dimension.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── NEW: TRAVIS PICKING INDEPENDENCE PROTOCOL ───

    {
      id: "ss-14-16",
      time: 10,
      title: "Travis Picking Independence Protocol",
      type: "song",
      what: "The complete 5-phase Travis picking + singing protocol. Travis picking is the hardest guitar-vocal combination because it involves THREE independent rhythms: the thumb alternating bass notes, the fingers picking melody notes on the 'and' beats, and the voice singing a completely separate rhythm. The 5-phase protocol breaks this 'impossible' task into manageable stages. Phase 1: Thumb-only alternate bass until automatic. Phase 2: Add fingers on 'and' beats. Phase 3: Hum melody over the locked pattern. Phase 4: Speak lyrics, find anchor points where stressed syllables lock onto bass-note thumbstrokes. Phase 5: Full singing.",
      setup: "Guitar. Metronome at 55 BPM. Start with a simple C chord — the Travis pattern is easiest here.",
      steps: [
        { text: "PHASE 1 — THUMB AUTOPILOT: Alternate your thumb between the 5th string (C bass) and 4th string (open D) in steady quarter notes at 55 BPM. Loop for 2 minutes. When you can describe your room while the thumb walks, Phase 1 is complete.", why: "The thumb must run on its own neural track — completely independent of conscious attention. James Taylor spent years developing this. The 'describe your room' test is the same autopilot diagnostic from Level 1, applied to the thumb." },
        { text: "PHASE 2 — ADD FINGERS: Keep the thumb alternating. Add index finger picking the 2nd string and middle finger picking the 1st string on the 'and' beats (between thumb strokes). Count: 'THUMB-and-THUMB-and' where THUMB = bass note, and = finger pick. 2 minutes until automatic.", why: "Fingers on the 'and' beats create the Travis pattern's rolling quality. The thumb provides the heartbeat, the fingers provide the melody. Two independent rhythms from one hand." },
        { text: "PHASE 3 — HUM THE MELODY: With the Travis pattern locked, hum a simple melody. Don't try to sing words yet — just melodic contour over the rolling pattern. The hum should float above the guitar, not compete with it. If the pattern breaks, drop back to Phase 2.", why: "Humming adds the third independent rhythm. Your thumb does one thing, your fingers do another, your voice does a third. This is the Three-Voice Independence that makes Travis picking + singing the hardest guitar-vocal skill." },
        { text: "PHASE 4 — SPEAK LYRICS: Replace the hum with spoken words in rhythm. Find anchor points where stressed syllables land on the thumb's bass notes. 'WALK-ing DOWN-the ROAD' — the capitals land on thumbstrokes. Mark 2-3 anchor points.", why: "Anchor points give the voice structural scaffolding within the three-voice texture. Speaking (rather than singing) removes the pitch variable, isolating the rhythmic coordination." },
        { text: "PHASE 5 — FULL SINGING: Replace the speech with singing. The anchor points are your safety net. Between them, the melody can float freely over the Travis pattern. Record a full pass. Listen back: can you hear three distinct voices (thumb bass, finger melody, vocal melody) operating independently?", why: "Full singing is the final integration of three independent motor programs. If it collapses, drop to Phase 4 (speaking) or Phase 3 (humming). The protocol is sequential because each phase builds a specific neural pathway. Jack Johnson's 'Breakdown' — one of your most-played songs — does exactly this." }
      ],
      feel: "Each phase should feel like adding a new instrument to an ensemble. By Phase 5, you're a one-person band — bass, melody, and voice all operating independently.",
      wrong: "If you skip to Phase 5 because 'you know the song,' the coordination will collapse under performance pressure. The protocol exists because the 'three independent rhythms' problem can't be solved by raw repetition — it must be solved in layers.",
      sarah: "Gene, Travis picking while singing is the hardest thing in this curriculum. Jack Johnson's 'Breakdown' does exactly this. The 5-phase protocol breaks the impossible into the possible. Be patient — Phase 1 alone might take several sessions to truly automate.",
      metronome: 55,
      speedLadder: { start: 45, end: 70, increment: 5, bars: 4 },
      recorder: true,
      referencePitches: getPitchRange("E3", "A4")
    },

    // ─── NEW: OPEN TUNING SONGWRITING ───

    {
      id: "ss-14-17",
      time: 10,
      title: "Open Tuning Songwriting — From Resonance",
      type: "song",
      what: "Adrianne Lenker's method: retune, then listen to the open strings for a full minute before touching a fret. Let the tuning propose ideas — the resonance IS the first draft. Joni Mitchell treated each of her 57 tunings as a new instrument, writing from the tuning's natural harmonics rather than imposing shapes she already knew. Today: DADGAD. Write a complete song section starting from nothing but the open-string resonance.",
      setup: "Guitar. Tuner. Retune to DADGAD (low to high: D-A-D-G-A-D). Listen to the open strings ring before doing anything.",
      steps: [
        { text: "Retune to DADGAD. Strum all 6 open strings. Listen for 60 seconds — feel where the drone lives in your body. Three D strings and two A strings create a Dsus4 wash. The resonance is the starting point, not the destination.", why: "Joni Mitchell's method: re-tune, then simply listen to what the open strings want to say before playing anything. The tuning proposes ideas your fingers would never find in standard tuning. DADGAD reduces left-hand cognitive load — most chords are 1-2 fingers with drones ringing." },
        { text: "Add one finger — any fret, any string. How does the sound change? Let the drone guide your choices. If a note clashes, move one fret. If it sings, stay. Explore for 2 minutes, letting the tuning lead.", why: "Open tunings create serendipitous harmonies. One finger on one fret changes the entire character of the chord while the drones continue. This is the opposite of standard tuning where each chord requires a full hand shape." },
        { text: "Hum over the open tuning. Let the drone suggest a vocal melody — the tuning's resonance will pull your voice toward certain notes. Follow the pull. The melody that emerges belongs to this tuning, not to your standard-tuning habits.", why: "Adrianne Lenker starts songwriting from tuning exploration, letting the instrument propose phrases. The vocal melody should feel discovered, not composed. Your voice responds to the specific overtone series of the tuning." },
        { text: "Add words — even nonsense words. Let the sounds guide the language, not the other way around. A melody that sits on a long 'ooh' might want words with that same open vowel: 'moon,' 'room,' 'you.' Record the whole exploration — 3 minutes minimum.", why: "Sound-first writing (melody and vowels before meaning) produces lyrics that sing naturally. Words chosen for their sound often reveal surprising meanings — the subconscious is better at connecting sound and sense than the conscious mind." },
        { text: "Shape what you've found into a verse or chorus. You now have a song section that could only exist in DADGAD — it sounds like nothing you'd write in standard tuning. That uniqueness is the whole point of open tunings.", why: "The creative constraint of an unfamiliar tuning forces genuine exploration. Every song written in DADGAD has a distinct character because the tuning limits and guides your choices in ways standard tuning doesn't." }
      ],
      feel: "Open tuning songwriting should feel like discovering a secret room in a house you thought you knew. The guitar suggests ideas your fingers would never find in standard tuning. Let yourself be surprised.",
      wrong: "If you're trying to play standard-tuning chord shapes in DADGAD, you're fighting the tuning. Let go of what you know. Explore with single fingers and drones. The tuning knows what it wants to say.",
      sarah: "Gene, Adrianne Lenker drops the high E to D for persistent drones on Big Thief records. Joni Mitchell wrote 'Both Sides Now' in open D. Tinariwen's entire sound lives in open and alternate tunings. The tuning does the creative work — your job is to listen. You previewed DADGAD in ss-8-23 — now it's time to write from it.",
      fretboard: { tuning: "dadgad" },
      recorder: true,
      referencePitches: getPitchRange("D3", "A4"),
      drone: { root: "D", octave: 2, texture: "warm" },
      pitchContour: true
    },

    // ─── NEW: VOCAL DYNAMICS ARC ───

    {
      id: "ss-14-18",
      time: 7,
      title: "Vocal Dynamics — Whisper to Full Voice Arc",
      type: "song",
      what: "Apply a vocal dynamic arc within a single song section: whisper the first line, speak-sing the second, half-voice the third, full voice the fourth. Then reverse: full voice → whisper. The dynamic arc within a single verse creates the effect of a full arrangement — your voice becomes the whole band's dynamic range. Add: play softer during vocal phrases, louder during instrumental fills. The guitar and voice breathe opposite to each other.",
      setup: "Guitar. A verse from one of your songs. Metronome at 60 BPM (intimate tempo).",
      steps: [
        { text: "Sing your verse at one dynamic level — your normal comfortable volume. Record it. This is the 'flat' version.", why: "The flat version is your baseline. Most first performances are dynamically flat — every line at the same volume. The recording reveals this." },
        { text: "Now: whisper line 1, speak-sing line 2 (pitched but breathy), half-voice line 3 (supported but held back), full voice line 4. Record this version.", why: "The whisper-to-full arc creates a crescendo within a single verse. The listener is drawn in by the whisper and released by the full voice. No band needed — your voice IS the arrangement." },
        { text: "Reverse: full voice line 1, half-voice line 2, speak-sing line 3, whisper line 4. This is the 'reveal and retreat' arc — powerful opening, intimate ending.", why: "The reverse arc is equally valid. Starting strong and pulling back creates a different emotional story — confidence dissolving into vulnerability. Both directions are tools." },
        { text: "Now add inverse guitar dynamics: play SOFTER during vocal phrases, LOUDER during instrumental fills (between lines). The guitar and voice breathe opposite to each other — when one inhales, the other exhales. Record the full section.", why: "Guitar-voice inverse dynamics create the illusion of a full arrangement. The volume stays constant overall, but the balance shifts between voice and guitar. James Taylor does this instinctively — his guitar steps forward when his voice rests, then recedes when his voice returns." }
      ],
      feel: "The dynamic arc should feel like breathing — each line has its own volume, its own intimacy. The whisper draws the listener close. The full voice opens the room.",
      wrong: "If every line sounds the same volume, you're not committing to the dynamic range. Whisper means ACTUALLY whisper — barely audible. Full voice means full support, not belting (remember your range: E3-A4, no belting, laid-back porch register).",
      sarah: "Gene, your laid-back vocal style is perfect for this. The whisper-to-full-voice arc lets you use your natural dynamic range without ever leaving your comfort zone. Skinshape and Angus Stone both use this technique — quiet verses that bloom into present choruses, all within a relaxed dynamic range.",
      volumeMeter: true,
      recorder: true,
      referencePitches: getPitchRange("E3", "A4"),
      metronome: 60,
      pitchContour: true
    }
  ]
};
