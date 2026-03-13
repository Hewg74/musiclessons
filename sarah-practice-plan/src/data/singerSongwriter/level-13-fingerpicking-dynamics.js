import { getPitchRange } from "../appData.js";

export const level13 = {
  level: 13,
  title: "Fingerpicking & Dynamics",
  subtitle: "New fingers. New voice. Same autopilot method.",
  description:
    "Fingerpicking is a completely different motor program from strumming — your right hand must relearn from scratch. Apply the same Level-1 autopilot process: drill the pattern until it's automatic, then layer voice on top. Fingerpicking + singing is the signature sound of intimate singer-songwriters: Nick Drake, Tommy Guerrero, Hermanos Gutierrez. This level also masters dynamic range — the difference between whisper and full voice.",
  artists: "Nick Drake, Tommy Guerrero, Hermanos Gutierrez, José González",
  unlocks: "Performance & Identity (Level 14)",
  review: { label: "Level 11-12 Check-In", time: 5, exercises: ["ss-11-6", "ss-12-4"], prompt: "Play your arranged song with dynamics (ss-11-6). Then check prosody on your latest lyrics (ss-12-4). Both polished? Move on." },
  exercises: [
    {
      id: "ss-13-1",
      time: 8,
      title: "Fingerpick Autopilot",
      type: "guitar",
      what: "Learn a basic fingerpicking pattern: thumb plays bass note (strings 4-6), index and middle alternate on treble strings (1-3). One chord: Am. Loop it until you can zone out — the conversation test from Level 1 applies again. This is autopilot training for a new motor program.",
      setup: "Guitar (nylon-string preferred). Metronome at 60 BPM. No pick — use your thumb and two fingers.",
      steps: [
        { text: "Hold Am. Thumb plays the A string (5th). Index plays the B string (2nd). Middle plays the high E string (1st). Pattern: Thumb-Index-Middle-Index. Repeat.", why: "This T-I-M-I pattern is the most common fingerpicking pattern in folk and classical guitar. The thumb anchors the bass while fingers dance on treble." },
        { text: "Loop the pattern on Am for 3 minutes. Aim for even volume across all notes — each finger produces the same loudness.", why: "Evenness is the hallmark of good fingerpicking. Uneven volume makes the pattern sound clumsy. Each finger must find its string without looking." },
        { text: "Try the same pattern on C, then G, then Em. Same right-hand pattern, different left-hand chord. The thumb adjusts to each chord's bass note.", why: "Each chord has a different bass string. Am=5th string, C=5th string, G=6th string, Em=6th string. The thumb must adapt." },
        { text: "Conversation test: can you fingerpick Am-C-G-Em and describe your room simultaneously? If yes, the pattern is reaching autopilot.", why: "Same test as Level 1 strumming. If you can talk while picking, the motor program has moved to procedural memory." }
      ],
      feel: "Fingerpicking should feel delicate and rolling — a gentle cascade of notes instead of a strum. The nylon-string sound is warm and intimate. Think Nick Drake, Tommy Guerrero.",
      wrong: "If your fingers are catching or producing uneven volume, slow down. Each note should ring clearly with equal volume. If your thumb keeps hitting the wrong bass string, watch it for a while — then close your eyes and feel.",
      sarah: "Gene, fingerpicking + singing is the hardest integration in this curriculum. Your right hand needs a completely new autopilot. Be patient — this is Level 1 all over again, just with different fingers.",
      metronome: 60,
      speedLadder: { start: 50, end: 80, increment: 5, bars: 8 },
      recorder: true
    },

    // ─── NEW: PATTERN VARIATIONS ───

    {
      id: "ss-13-2",
      time: 7,
      title: "Fingerpick Pattern Variations",
      type: "guitar",
      what: "Beyond T-I-M-I: learn T-I-M-A (classical arpeggio), T-I-T-M (alternating bass), and free fingerpick (no pattern — intuitive). Each pattern has a different rhythmic feel. Practice each over Am-C-G at slow tempo. Your right hand vocabulary determines your fingerstyle range.",
      setup: "Guitar (nylon-string preferred). Metronome at 50 BPM. Right hand relaxed, wrist slightly arched.",
      steps: [
        { text: "T-I-M-A pattern: Thumb on bass, then Index (3rd string), Middle (2nd string), Ring finger (1st string). A smooth upward arpeggio across 4 strings. Loop on Am for 2 minutes.", why: "T-I-M-A is the classical guitar arpeggio — each finger gets its own string. It sounds harp-like and flowing. This is the foundation of classical and bossa nova fingerstyle." },
        { text: "T-I-T-M pattern: Thumb plays bass, Index picks treble, Thumb plays a DIFFERENT bass string, Middle picks treble. The alternating thumb creates a walking bass feel. Loop on C for 2 minutes.", why: "Alternating the thumb between two bass strings adds rhythmic complexity and a sense of movement. It's the bridge between simple fingerpicking and Travis picking." },
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
      id: "ss-13-3",
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
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-13-4",
      time: 8,
      title: "Fingerpick + Voice Integration",
      type: "song",
      what: "Apply the Level 2 speak-hum-sing method to fingerpicking: speak over the pattern, then hum, then sing. Same three stages, new motor challenge. The voice layers on top of an entirely different hand pattern.",
      steps: [
        { text: "Fingerpick Am-C-G at 60 BPM on autopilot. Now speak made-up phrases while picking. If picking breaks, stop speaking and re-establish.", why: "Speaking is the easiest vocal task. If the picking breaks during speech, it's not automatic enough. Go back to ss-13-1." },
        { text: "Hum a melody contour over your fingerpicking. Keep the picking steady — let the humming ride on top.", why: "Humming adds pitch without words. It's the intermediate step between speaking and singing." },
        { text: "Sing an original melody at a relaxed tempo. Porch register. Don't project. Let the fingerpicking be louder than your voice.", why: "Fingerpicking + quiet voice is the Singer-Songwriter Aesthetic. Think Nick Drake — the guitar is prominent, the voice is intimate." },
        { text: "If the picking falls apart during singing, deploy escape hatch: simplify to thumb-only (bass notes) while singing. Then gradually add fingers back.", why: "The escape hatch for fingerpicking is reducing to just the thumb. One bass note per chord is the minimum. Build back up from there." }
      ],
      feel: "Fingerpicked songs feel more intimate and exposed than strummed songs. The notes are individual, clear, vulnerable. Your voice matches that vulnerability.",
      wrong: "If you're treating fingerpicking like strumming (loud, aggressive), pull back. Fingerpicking is gentle. If your singing overwhelms the picking, sing quieter.",
      sarah: "Gene, fingerpicking unlocks the nylon-string, Hermanos Gutierrez, Tommy Guerrero side of your taste. It's a different sound world from strumming — more intimate, more spacious.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },

    // ─── NEW: ALTERNATE TUNING ───

    {
      id: "ss-13-5",
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
      sarah: "Gene, alternate tunings are how Tinariwen and Hermanos Gutierrez get their signature sounds. Drop D connects to your desert blues side. Open G connects to your psych-rock side. New tunings, new songs.",
      fretboard: { tuning: "drop-d" },
      recorder: true
    },

    // ─── NEW: FINGERPICK DYNAMICS pp-ff ───

    {
      id: "ss-13-6",
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
      feel: "Each dynamic level should feel physically different in your fingertips. pp is a caress. p is a touch. f is a press. ff is a strike. Four sensations, four sounds, one pattern.",
      wrong: "If pp and p sound the same, you're not going quiet enough. If f and ff sound the same, you're not engaging your nails aggressively enough. Exaggerate the extremes — you can always pull back later.",
      sarah: "Gene, fingerpick dynamics are your secret weapon. Most guitarists play at one volume. You'll have four gears — and the ability to shift between them mid-song. That's what makes fingerstyle performances riveting.",
      volumeMeter: true,
      speedLadder: { start: 50, end: 70, step: 10 },
      recorder: true
    },
    {
      id: "ss-13-7",
      time: 8,
      title: "Travis Picking",
      type: "guitar",
      what: "Learn alternating bass (Travis picking): the thumb alternates between two bass strings while fingers pick a pattern on the treble strings. This creates the illusion of two guitars — a bass line AND a melody simultaneously. It's the hallmark of folk fingerstyle.",
      setup: "Guitar. Metronome at 55 BPM. Start slower than you think you need to.",
      steps: [
        { text: "Hold C. Thumb alternates: 5th string (C) then 4th string (E). Just the thumb, alternating, in time. 2 minutes.", why: "The alternating thumb IS Travis picking. It creates a walking bass line. Getting the thumb independent is the hardest part." },
        { text: "Add index finger: pinch the 2nd string (B) with your thumb-strike on the 5th string. Then thumb plays 4th string alone. Pattern: Pinch-Thumb-Pinch-Thumb.", why: "The pinch (thumb + finger together) is the backbone of Travis picking. It emphasizes beat 1 while the bass walks." },
        { text: "Try on G: thumb alternates 6th string (G) and 4th string (D). Index pinches the 2nd string on beat 1. Same pattern, new bass notes.", why: "G is the classic Travis picking chord — the wide bass alternation (6th to 4th string) creates a big, spacious bass line." },
        { text: "Chain C (4 beats) → G (4 beats) → Am (4 beats) → G (4 beats). Travis picking through the changes. The thumb moves to each chord's bass strings automatically.", why: "Travis picking through chord changes is the goal. When the thumb finds the right bass strings without conscious thought, it's autopilot." }
      ],
      feel: "Travis picking should feel like your thumb has its own brain — it walks the bass independently while your fingers handle the melody. Two parts, one guitarist.",
      wrong: "If your thumb and fingers are playing at the same time on every beat, you're not alternating. The thumb alternates bass notes BETWEEN the finger picks. Slow down until you can hear the independence.",
      sarah: "Gene, Travis picking is the technique behind Tommy Guerrero's guitar work. It sounds complex but it's just a thumb alternation with a simple finger pattern on top.",
      metronome: 55,
      speedLadder: { start: 45, end: 70, increment: 5, bars: 4 },
      recorder: true
    },

    // ─── NEW: VOCAL HARMONIZING ───

    {
      id: "ss-13-8",
      time: 7,
      title: "Vocal Harmonizing with Yourself",
      type: "vocal",
      what: "Sing a simple melody. Record it. Play it back and sing a harmony a 3rd above. Then try a 3rd below. Then an octave above. Basic vocal arranging for recording — stacking your own voice. This is how DOPE LEMON and Skinshape create their lush vocal textures.",
      setup: "Phone or recorder. Headphones (to hear playback while singing the harmony). Quiet room.",
      steps: [
        { text: "Sing a simple 4-bar melody over Am-C: something memorable, in porch register around G3-D4. Record it clearly. This is your 'lead vocal.'", why: "The lead vocal must be simple and stable — it's the foundation that harmonies stack onto. Complex melodies are harder to harmonize. Start simple." },
        { text: "Play back the recording through headphones. Sing along — but a 3rd ABOVE each note. If the lead sings A, you sing C. If the lead sings C, you sing E. Don't overthink the theory — let your ear find the harmony. Record this pass.", why: "A 3rd above is the most natural harmony interval. Your ear will gravitate toward it instinctively. This is the harmony in every Beatles song, every CSNY song, every Skinshape track." },
        { text: "Play back the lead again. Now sing a 3rd BELOW each note. If the lead sings A, you sing F. If the lead sings C, you sing A. This harmony is warmer, deeper. Record it.", why: "A 3rd below creates a richer, warmer sound than a 3rd above. It adds bass to your vocal arrangement. Together with the lead and the upper harmony, you have a three-part stack." },
        { text: "Listen to all three layers together (if your recorder supports it) or just appreciate how each harmony changes the emotional weight of the melody. This is vocal arranging — your voice, multiplied.", why: "Stacking harmonies is the production technique behind lo-fi, bedroom-pop, and psych-folk. DOPE LEMON's lush vocals are just one voice recorded multiple times at different intervals." }
      ],
      feel: "Harmonizing with yourself should feel like a conversation between versions of you. The lead is the main voice. The harmonies are the background choir — supporting, enriching, never competing.",
      wrong: "If your harmony keeps snapping back to the melody (singing in unison instead of a 3rd), close your eyes and focus only on the interval. Sing the harmony WITHOUT the playback first to lock it in your ear, then add the playback.",
      sarah: "Gene, this is how you create the warm, layered vocal sound you love in DOPE LEMON and Skinshape. One voice, recorded three times, becomes a choir. Lo-fi vocal production starts here.",
      recorder: true,
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: true
    },

    // ─── NEW: DYNAMIC PHRASING ───

    {
      id: "ss-13-9",
      time: 7,
      title: "Dynamic Phrasing: Swell & Decay",
      type: "vocal",
      what: "Within a single held note: start quiet, swell to full voice, then decay back to silence. This is 'messa di voce' — the most expressive vocal technique in existence. Then apply it to phrases: start each phrase quiet and bloom, or start full and fade. Note-level dynamics create emotional contour.",
      setup: "Quiet room. No guitar — voice only for focus. Metronome at 60 BPM for timing reference.",
      steps: [
        { text: "Hold a comfortable note (A3). Start at pianissimo — barely audible breath tone. Over 8 beats, crescendo smoothly to forte — full, warm chest voice. Then over 8 beats, decrescendo back to pianissimo. One note, 16 beats, a complete dynamic arc.", why: "Messa di voce (placing the voice) is the foundational vocal dynamic exercise. It trains independent volume control — changing loudness without changing pitch, vowel, or tone quality." },
        { text: "Repeat on different pitches: E3 (low), D4 (mid), G4 (upper range). Notice how the swell feels different at each pitch — low notes swell warmly, high notes swell with more intensity.", why: "Dynamic control varies across your range. Low notes are easier to keep quiet; high notes naturally project. Training swells at every pitch builds even dynamic control across your full range." },
        { text: "Apply to phrases: sing a 4-bar melody where each phrase STARTS quiet and BLOOMS to full voice by the end. Like a wave building and cresting. This is the 'crescendo phrase' shape.", why: "The crescendo phrase creates anticipation and arrival — each phrase builds toward its most important word. This is how Thom Yorke and Jeff Buckley shape individual lines." },
        { text: "Reverse it: sing phrases that START at full voice and FADE to a whisper. The 'decrescendo phrase' shape. Each phrase melts away. Then alternate: one phrase blooms, the next fades. Dynamic phrasing as musical architecture.", why: "Decrescendo phrases create intimacy and vulnerability — the voice retreating inward. Alternating bloom and fade phrases creates a breathing, living dynamic contour across a whole verse." }
      ],
      feel: "Each note should feel like a tide — rising and falling. The swell is not a volume knob turning up. It's your whole body opening, then closing. Breath, resonance, and intention all working together.",
      wrong: "If the swell sounds like a step function (quiet-LOUD-quiet) instead of a smooth curve, slow down. Use twice as many beats. The transition should be imperceptible at any single moment — only obvious over the full arc.",
      sarah: "Gene, messa di voce is what separates singers who 'control dynamics' from singers who 'sculpt sound.' Your porch register is already quiet — this gives you the tools to bloom from that quiet place into full voice and back again.",
      volumeMeter: true,
      volumeContour: true,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: PERCUSSION + FINGERPICKING ───

    {
      id: "ss-13-10",
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
      id: "ss-13-11",
      time: 8,
      title: "Dynamic Range",
      type: "vocal",
      what: "Master the full dynamic range of your voice: from near-whisper (pp) to full chest voice (ff). Most singer-songwriters use 20% of their dynamic range. This exercise maps the full spectrum and trains you to control it.",
      steps: [
        { text: "Sing a sustained A at the quietest volume possible — barely audible, intimate, right next to the mic. This is pp (pianissimo). Hold it for 8 beats.", why: "The whisper-sing is an underused tool. DOPE LEMON, Nick Drake — much of their vocal power comes from how quiet they can be." },
        { text: "Gradually increase volume over 8 bars — from pp to mp to mf to f to ff. One smooth crescendo. Then reverse: ff back down to pp.", why: "The crescendo/decrescendo exercise maps your full range and trains smooth transitions. Sudden jumps are less musical than gradual shifts." },
        { text: "Sing a melody at pp (whisper). Then the same melody at ff (full voice). Notice how the timbre changes — not just the volume. Your voice has different colors at different volumes.", why: "Quiet voice is intimate, breathy, vulnerable. Loud voice is confident, warm, present. Both are tools. Most songs need both." },
        { text: "Create a song section where the first phrase is pp and the second is ff. Practice the TRANSITION — the shift from quiet to loud should feel intentional.", why: "Dynamic contrast within a section is the most dramatic tool in performance. Whispering then projecting in the same verse creates emotional whiplash — in a good way." }
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
      id: "ss-13-12",
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
      id: "ss-13-13",
      time: 10,
      title: "Fingerpicked Original",
      type: "song",
      what: "Create an original fingerpicked song — intimate, dynamic, personal. Use your best lyrics, a pentatonic melody in porch register, and the full dynamic arc: fingerpicked intro (pp) → sung verse (mp) → chorus with more energy (f) → back to fingerpicking (pp).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Create a fingerpicking pattern for Am-G-C-Em (or any progression). Get it flowing on autopilot at 60 BPM.", why: "The fingerpicking pattern is the foundation. It must be invisible before you layer voice, dynamics, and lyrics." },
        { text: "Compose a verse melody: low range, intimate delivery, sparse lyrics about something real. Sing it over the fingerpicking.", why: "Fingerpicked songs demand simpler, more personal lyrics. The intimacy of the guitar demands intimacy from the words." },
        { text: "Create a chorus that's slightly louder and higher — but still intimate. Maybe switch to light strumming for the chorus to increase energy.", why: "The fingerpick → strum transition is a natural dynamic shift. It creates section contrast without the voice needing to change dramatically." },
        { text: "Arrange: fingerpick intro (8 bars) → verse (8 bars) → chorus (strum, 8 bars) → verse (fingerpick, 8 bars) → chorus → fingerpick outro. Record.", why: "The fingerpick-strum-fingerpick arc mirrors breathing — intimate, expansive, intimate again. It's the song's dynamic skeleton." }
      ],
      feel: "A fingerpicked original should feel like a late-night confession — quiet, personal, slightly vulnerable. The kind of song you play alone with one candle lit.",
      wrong: "If it sounds like a strummed song with different hand technique, you haven't embraced the fingerpicking aesthetic. Pull back your voice, slow down, leave more space. Fingerpicking songs breathe slowly.",
      sarah: "Gene, this is the Nick Drake / Tommy Guerrero side of your musical identity. Intimate, warm, slightly melancholic. This song reveals a different you than the reggae or surf originals.",
      metronome: 60,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true,
      levelUp: "Can fingerpick and sing simultaneously, play multiple fingerpick patterns and shift between feels, explore alternate tunings for new sonic territory, control fingerpick dynamics from pp to ff, use Travis picking, harmonize with yourself through recording layers, shape notes with swell and decay, add percussion to fingerstyle, record with intentional warm lo-fi aesthetics, control full dynamic range (pp to ff), and create intimate fingerpicked originals with dynamic arcs."
    }
  ]
};
