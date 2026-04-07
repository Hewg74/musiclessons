import { getPitchRange } from "../appData.js";

export const level5 = {
  level: 5,
  title: "The Full Scale & Jumps",
  subtitle: "Beyond pentatonic. Tension notes, key diversity, and interval mastery.",
  description:
    "The pentatonic was your safe space — five notes, no wrong combinations. Now expand to the full A natural minor scale by adding B (the pull note) and F (the dark note), explore key diversity across E major and A major, and master jumping between all note pairs in any key. Here the embodiment cycle deepens: every interval is not just a pitch distance but a body-location shift and an emotional-color shift felt simultaneously. When you sing A to F, you feel the pitch drop, the resonance darken from chest to throat, and the emotion shift from home to shadow — three channels of one unified act. Research shows tension notes recruit more somatosensory cortex than stable notes (PMC5608010), meaning B and F literally feel MORE in the body. Interleaved with systematic jump training grounded in contextual interference research for maximum retention.",
  artists: "Tinariwen, Hermanos Gutiérrez, Allah-Las, Khruangbin, DOPE LEMON",
  unlocks: "Voice Combines (Level 6)",
  vocalPrep: "Before singing: lip trills or straw buzzes for 30 seconds, sliding from low to high and back. Then 3 sighs (haaa). This level has wide jumps that cross your passaggio — the warm-up smooths the register transition. REMINDER: when jumping to higher notes, think DOWN not UP. Imagine the note is a shelf you're stepping onto from above. Narrow the vowel slightly as you go higher (ah → uh). When jumping wide (A→F, A→G), imagine stepping stones between the notes — your voice handles large intervals better when the brain imagines the path.",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["ss-4-17", "ss-4-20"], prompt: "Play Am-C-G-Em in 4 genre feels (ss-4-17). Then do Whisper to Full Voice with pentatonic freedom (ss-4-20). Both fluid? Move on." },
  exercises: [
    // ─── KEY DIVERSITY — INTERLEAVED PRACTICE ───

    {
      id: "ss-5-1",
      time: 7,
      title: "G Major Extended Improv",
      type: "vocal",
      what: "You explored the G major palette briefly in ss-4-8. Now spend real time there. Improvise freely using G major pentatonic (G-A-B-D-E) over a G drone for 4 minutes. Let the brightness of G major seep into your voice. This isn't a quick visit — it's moving in.",
      setup: "Guitar strumming G. Metronome at 80 BPM. Voice check: lip trills before wide jumps smooth the register transitions.",
      steps: [
        { text: "Strum G and sing the G major pentatonic ascending: G-A-B-D-E. As you rise through each note, track the vibration climbing — G sits warm and low behind the sternum, A lifts slightly, B (the major 3rd) brightens and floats forward toward the throat, D opens into the upper chest, E buzzes gently toward the mask. Now descend: E-D-B-A-G. Feel the resonance pouring back down through each station. The body map of a major key is brighter, more forward-placed than minor.", why: "Extended time in a major pentatonic builds a separate mental schema from Am — not just a different set of pitches but a different body landscape. Each note has its own resonance address, and major-key notes tend to sit more forward in the vocal tract. Nummenmaa 2024 (PNAS, n=1,938) confirmed that these body maps of resonance are cross-culturally universal." },
        { text: "Free improv: 2 minutes of melodic wandering in G major pentatonic. Before each phrase, hear it forming inside — feel where the opening note wants to live in your body, choose what emotional quality it carries (joy? openness? warmth?), then let it become sound. The major brightness should guide not just your pitch choices but your vowel shapes — major keys naturally invite wider, more open vowels.", why: "Sustained improvisation in a new key forces your ear to recalibrate. Running the hear-feel-choose cycle in a major context builds a second emotional vocabulary alongside your Am one. The first minute feels unfamiliar; by the second minute, G major starts feeling like home. That shift is schema formation happening in real time (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Try a call-and-response: guitar plays a short G major phrase, voice answers. Before answering, let the guitar phrase land in your body — where did it end? What did it want? Your answer should feel like a physical response, not just a pitch response. Notice how your voice gravitates toward B (the bright major 3rd) and D (the open 5th) — different anchor points than Am.", why: "Call-and-response in a new key reveals your melodic instincts. When the body leads the response — feeling where the call landed and what it needs — the answer emerges more naturally than when you calculate intervals. In Am, you lean on A and E. In G major, you'll discover new favorite intervals grounded in new body locations." },
        { text: "Record 2 minutes of your best G major improv. Listen back and compare to your Am improvisations. Notice three differences: pitch choices (brighter intervals?), body sensation (more forward resonance?), and emotional quality (more open?). Place one hand on your chest during playback — can you feel the echo of where those notes lived?", why: "Side-by-side comparison makes the key-specific vocal production differences audible and somatic. Your voice literally sounds different in G major than in Am because it resonates in different body locations. The hand-on-chest check during playback builds the interoceptive awareness that Zamorano (2025) links to musical competence." }
      ],
      feel: "G major should feel like stepping out of a cool forest (Am) into warm sunlight. The brightness is not just theoretical — your voice will naturally open up, vowels widen, and phrasing becomes more buoyant.",
      wrong: "If G major feels exactly like Am, you're not hearing the color difference yet. Focus on the B note (major 3rd) — it's the note that doesn't exist in Am pentatonic. Emphasize it until you hear the shift.",
      sarah: "Gene, surf rock and Khruangbin's brighter moments live in major keys. This extended time in G major builds the vocal muscle memory that makes major-key songwriting feel natural — not like a translation from minor. When you start writing songs in Level 9, major keys like this will sound completely different from your Am comfort zone — you're building a second palette for future songwriting. Every key has its own emotional color AND its own body landscape.",
      drone: { root: "G", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("G3", "E4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-2",
      time: 8,
      title: "Welcome to E Major",
      type: "vocal",
      what: "Your first genuinely new key family. Everything so far — Am, G, Em, C, D — shares the same notes (A natural minor = C major). E major introduces notes you've NEVER sung: Ab (which musicians also call G# — same sound, different name), C#, and F#. On guitar, E-A-B7 is one of the easiest progressions. This is where surf rock and bright reggae live.",
      setup: "Guitar. Metronome at 75 BPM. New chord: B7 — index finger on 1st fret A string, middle finger on 2nd fret D string, ring finger on 2nd fret G string, pinky on 2nd fret high E string. Open B and high E strings ring. Practice E-A-B7 changes before singing. Voice check: jaw loose, tongue tip on bottom teeth. Wide jumps need a relaxed throat.",
      steps: [
        { text: "Strum E major. Before you sing, hear E forming inside — feel where it wants to settle. E sits deep in the chest, lower and darker than A, a richer rumble behind the sternum. Sing E and hold it for 8 beats. Let the vibration fill your ribcage. This is home in E major — a different room than A, with its own warmth, its own gravity.", why: "Establishing a new 'home' note is the first step in building a new key schema. Each root has a unique body address — E sits lower than A, engaging the chest voice more fully. The physical difference between roots is how your body builds key-specific memory (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Sing the E major triad: E-Ab-B. As you rise from E to Ab (the major 3rd), feel the vibration lift from deep chest toward the upper sternum — brighter, more forward, almost electric. Hold Ab and notice: it's nothing like C (the minor 3rd of Am). Ab carries sunshine where C carries shadow. Your body knows the difference before your theory does. Rise to B — the 5th opens the resonance further, floating toward the throat.", why: "Ab/G# is the note that makes E major MAJOR. The body-location shift from E (deep chest) to Ab (upper chest/forward) to B (throat) maps the triad as a physical journey, not just three pitches. Nummenmaa 2024 (PNAS) confirmed these resonance maps are universal." },
        { text: "Add C# — sing E-Ab-B-C#. C# is genuinely new territory — feel where it lands in your body. It sits high and bright, buzzing forward toward the mask, with a sweetness that doesn't exist anywhere in your Am palette. Place your fingertips on your cheekbones as you sing C# — can you feel the vibration arriving there?", why: "C# is a note your voice has literally never produced in this curriculum. New notes create new body addresses, new muscle memory, new resonance patterns. The fingertip check builds the somatic awareness that makes pitch a physical sensation, not just an auditory one." },
        { text: "Strum the E-A-B7 progression slowly. Sing each root: E over E (deep chest rumble), A over A (familiar warmth), B over B7 (throat-level tension that yearns to resolve). Feel how B7 creates a physical pull — the resonance leans forward, unsettled, wanting to pour back down into E's chest depth.", why: "Hearing chord function (tension and resolution) in a new key proves the concept is universal AND physical. The B7-to-E pull feels like vibration settling from the throat back into the chest — the body mirrors the harmonic resolution." },
        { text: "Free improv: sing E, Ab, B, C# over the E-A-B7 progression. Before each note, run the cycle — hear it forming, feel where it will land in your body, choose what it wants to express. These four notes each have a body address and an emotional color. 2 minutes, record it. You're building a new palette from the body outward.", why: "Starting with just 4 notes in a new key mirrors the Level 3 approach — constraint breeds mastery. Running the hear-feel-choose cycle in a new key proves the cycle is universal, not key-specific. Aarhus University (2021) found that imagery + production = equal learning in one-third the time." }
      ],
      feel: "E major should feel brighter and more open than anything you've sung so far. Like walking out of a shaded porch into direct sunlight. The Ab and C# notes will feel unfamiliar at first — that's correct. Unfamiliar is where growth happens.",
      wrong: "If you're accidentally singing G natural instead of Ab (G#), you're pulling from your Am muscle memory. Use the drone as a reference — the E major drone includes Ab. Match that note. It's a half-step higher than G.",
      sarah: "Gene, this is Dick Dale territory. This is the Beach Boys. This is the bright, shimmering side of surf rock that your playlists are full of. E major is where that sound comes from — and now your voice lives there too.",
      drone: { root: "E", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("E3", "C#4"),
      pianoKeys: { notes: ["E3", "F#3", "A3", "B3", "C#4"], label: "E Major Pentatonic", range: ["E3", "C#4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-3",
      time: 8,
      title: "Three-Palette Comparison",
      type: "vocal",
      what: "Record yourself improvising in three different keys back-to-back: Am pentatonic, G major pentatonic, E major (4 notes). Listen to all three. The comparison IS the lesson — your voice sounds different in each key, your phrasing changes, your emotional instincts shift. This is what research calls 'contextual interference' — and it's the fastest path to key-independent musicianship.",
      setup: "Guitar. Metronome at 80 BPM. Three drone settings: Am, G, E. Voice check: for notes above the passaggio, narrow the vowel (ah → uh). Less air, not more.",
      steps: [
        { text: "Set drone to Am. Place one hand on your chest. Improvise in Am pentatonic (A-C-D-E-G) for 90 seconds — feel the familiar landscape: A rumbles deep in the sternum, C darkens the upper chest, D bridges toward the throat, E lifts into openness, G floats near the mask. This is home territory. Your body already knows these addresses. Record it.", why: "Am is your anchor key — the key where the body map is most developed. Recording it with body awareness active establishes a somatic baseline for comparison. The hand on the chest keeps interoception engaged (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Switch drone to G major. Improvise in G major pentatonic (G-A-B-D-E) for 90 seconds. Notice the shift — the resonance lifts, brightens, moves more forward in the mouth and face. Your vowels may naturally open wider, your phrasing may become more buoyant. The body map of G major is warmer, more expansive than Am's shadows. Record it.", why: "G major shares most notes with Am but the emotional center and body landscape are different. The resonance shifts forward and upward — Nummenmaa 2024 (PNAS) found that positive emotional states activate more upper-body and facial resonance, matching the body experience of major keys." },
        { text: "Switch drone to E major. Improvise with E-Ab-B-C# for 90 seconds. Feel the unfamiliarity in your body — these notes land in places your vocal tract hasn't mapped yet. Ab buzzes in a new forward position. C# reaches toward the mask with unfamiliar sweetness. Let your body explore these new addresses. Record it.", why: "E major is genuinely foreign territory — new notes, new body addresses, new resonance patterns. The physical awkwardness IS the learning. Your body needs time to build somatic maps for unfamiliar pitches, and each minute of exploration accelerates that mapping." },
        { text: "Listen to all three recordings back-to-back. Notice three channels of difference: pitch choices (intervals), body sensation (where the voice lived — chest vs face vs mask), and emotional color (dark vs warm vs electric). Place your hand on your chest during playback — can you feel the ghost of each key's body landscape?", why: "Comparative listening across three channels (pitch, body, emotion) reveals that key identity isn't just about notes — it's about where the notes live and what they express. The three recordings are a mirror showing you three different body-voices, all yours, all valid." }
      ],
      feel: "Am should feel like coming home. G major should feel like a sunlit version of home. E major should feel like visiting a new country — exciting and slightly disorienting. All three feelings are correct.",
      wrong: "If all three recordings sound identical, you're not letting the key influence your singing. Try exaggerating: in Am, lean into dark vowels and descending phrases. In G, lean into bright vowels and ascending phrases. In E, explore the unfamiliar notes Ab and C#.",
      sarah: "Gene, this three-key comparison is the single most important exercise for breaking out of the Am comfort zone. When you hear yourself singing differently in three keys, you'll understand why key diversity isn't just theory — it's creative vocabulary.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("E3", "E4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 80
    },

    // ─── PHASE 9: THE TENSION NOTES — B AND F ───

    {
      id: "ss-5-4",
      time: 7,
      title: "The Pull Note — B",
      type: "vocal",
      what: "Your pentatonic has five notes: A, C, D, E, G. Now meet the sixth: B. B sits a half step below C — the tightest, most tense interval you've encountered. Where D was a bridge and G was a peak, B is a PULL. It yearns upward toward C. This is the note Tinariwen leans on for that desert blues longing.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM. Voice check: land from above on every note — imagine stepping DOWN onto a shelf, never reaching up.",
      steps: [
        { text: "Before you sing B, HEAR it in your head. Play B on the guitar (2nd fret, A string). Listen. Close your eyes — can you hear B forming inside? Now feel WHERE it wants to live: B sits higher in the throat than A, with a slight narrowing, a pull upward that you can feel physically before the note sounds. When you have both the pitch and the body location, sing it. This is the full arrival: hear, feel, produce.", why: "Audiation paired with body-location awareness gives you two channels to find the note. Gordon's research shows that pre-hearing activates auditory cortex before motor cortex. Zamorano (2025) adds that body awareness predicts pitch accuracy (R²=0.41). Two channels are more reliable than one." },
        { text: "Sing A, then step up to B. Feel the vibration shift — A sits grounded behind the sternum, but B lifts into the throat, restless, leaning. Hold B for 8 beats against the drone. Notice: B creates a physical sensation of pulling, almost like your throat is reaching for something just beyond its grasp. That pull IS the note's character — the body knows B is unstable before your theory does.", why: "B is the 2nd scale degree — naturally unstable. Research shows tension notes recruit more somatosensory cortex than stable notes (PMC5608010), meaning B literally feels MORE in the body than A or C. The physical pull you feel is your nervous system registering the harmonic instability." },
        { text: "Now sing B-C. This is a HALF STEP — the smallest interval. Feel how tight it is: B sits in the throat with a yearning pull, and C resolves that pull — the resonance settles slightly, the throat opens, the tension releases like exhaling. Alternate B-C-B-C slowly. Each time, feel the tension gather in the throat on B and release on C. In solfege, B is Ti — the leading tone. Ti wants to resolve to Do. Feel that pull upward as B reaches toward C. It's magnetic. Don't resolve it yet — sit in the pull for 4 extra beats. THAT feeling of wanting-to-resolve IS functional hearing. When you can feel what a note WANTS to do, you're hearing music the way composers do.", why: "The half step B-C is the first semitone you've sung deliberately. The body registers this as a tension-release cycle — throat narrows on B (tension), opens on C (resolution). Gordon's movable-do framework: each scale degree has a functional pull relative to tonic. B (Ti) pulls upward — this pull is not abstract theory but a felt physical sensation. Feeling these pulls IS functional ear training, which research shows outperforms interval-first approaches for building usable tonal sense." },
        { text: "Walk A-B-C-D ascending. Feel the vibration climb: A (deep chest) → B (throat, pulling) → C (throat, settling) → D (upper throat, bridging). Now descend: D-C-B-A. The resonance pours back down through each station. B on the way down feels different from B on the way up — descending through B has a quality of reluctance, of looking back.", why: "With B, you can walk stepwise from A to E without gaps. But the walk is also a body journey — each note has its own resonance address, and passing through B adds a moment of physical tension to every ascending or descending phrase." },
        { text: "Improvise with six notes: A, B, C, D, E, G (pentatonic + B). Before each phrase, choose an emotional intention — yearning? searching? When you want that pull, reach for B and feel it gather in your throat. Let B appear as a passing note between A and C, as a tension note held against the drone, as a quick flicker in the body. 2 minutes, record.", why: "Adding one tension note to the pentatonic adds one specific emotional color AND one specific body location. B is yearning — in the throat, pulling upward. Choosing to use it intentionally (HEAR-FEEL-CHOOSE-PRODUCE) makes it an expressive tool, not just a scale degree." },
        { text: "Compare: improvise 1 minute with pentatonic only (A, C, D, E, G), then 1 minute with B added. Listen back with your hand on your throat. Hear and feel the difference B makes? The pentatonic is safe and settled; B introduces a physical restlessness — a body sensation that wasn't there before.", why: "Side-by-side comparison makes the effect of B audible AND somatic. The pentatonic body map is all chest and open throat. Adding B introduces a new station — the yearning pull in the throat — that changes the entire landscape of the melody." }
      ],
      feel: "B should feel like leaning forward — like you're about to say something important but haven't said it yet. Notice where B lives in your body: it sits higher in the throat than A, with a slight narrowing, a physical pull upward. That pull IS the tension — your body knows B wants to resolve before your mind does. When B resolves up to C, the release should feel satisfying, like exhaling — the throat opens, the resonance settles. Always end on something that worked — even just one clean B-to-C resolution.",
      wrong: "If B sounds 'wrong' or 'out of tune,' you might be singing Bb (B-flat) instead of B natural. B natural is a whole step above A. Use the drone and pitch display to calibrate. If the new placement feels weird or forced, that's proprioceptive recalibration — your body map is updating to include a new station. Trust the recording over how it feels for the first few sessions. If B doesn't feel different from your pentatonic notes, slow down: research shows dissonant intervals recruit more somatosensory cortex (PMC5608010) — B should feel MORE in the body than A or C. If it doesn't yet, hold B against the drone for 8 slow beats and scan your body for the tension. VOCAL TIP: B3 sits right at or just below your passaggio — the zone where your voice wants to shift gears. If B feels unstable or 'wobbly,' that's the register transition, not a pitch problem. Two things help: (1) keep the tongue tip touching the back of your bottom teeth — this prevents the tongue from pulling back and constricting the throat, and (2) think of B as living in the same 'room' as A, just a step higher — don't change your whole vocal approach for one note. The less you DO when moving A→B, the smoother it sounds.",
      sarah: "Gene, B is the note that makes Tinariwen sound like Tinariwen. That desert blues yearning — the voice leaning into a note that wants to resolve but you hold it there, suspended in longing. That's B.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "G4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-5",
      time: 7,
      title: "The Dark Note — F",
      type: "vocal",
      what: "The seventh and final note: F. F sits a half step above E — another semitone, another tension point. But where B pulls upward (yearning), F pulls downward (gravity, darkness, weight). F is the minor 6th from A — the most emotionally heavy interval. With F, you have all seven notes of A natural minor: A, B, C, D, E, F, G. The complete palette.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM. Voice check: barrel breath — ribs expanded sideways. Wide jumps need stable air support.",
      steps: [
        { text: "Audiation check: play F on the guitar (1st fret, high E string). Listen. Close your eyes — hear F forming inside. Now feel WHERE it lives: F sits low and heavy, a darkness that compresses the throat and pulls the resonance downward, like gravity in the chest. When you have both the sound and the body sensation, sing it. Sing first. Before checking, commit: were you sharp, flat, or on? THEN check with the pitch detector. The prediction matters as much as the pitch — you're training your self-assessment, not just your voice.", why: "Audiation becomes even more critical with tension notes. B and F are the notes most likely to drift out of tune because they sit a half step from stable tones. Adding body-location awareness gives you a second targeting system (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41). Tension notes recruit more somatosensory cortex (PMC5608010) — F should feel HEAVIER in the body than E or G. The predict-then-check pattern trains your internal monitoring: Hebert & Coker (2021) found that self-controlled feedback produces better long-term retention than constant external feedback." },
        { text: "Sing E, then step up to F. Feel the shift: E is open and bright, the resonance floating in the upper chest. F arrives like a shadow — the vibration compresses, darkens, pulls downward. Alternate E-F-E-F slowly. Each time, feel the body toggle: light (E) to heavy (F) to light (E). The half step is tiny in pitch but enormous in body sensation. In solfege, F is Fa — the dark weight. Fa presses downward toward Mi (E). Feel it settle, heavy, seeking resolution. This is gravity in sound. Hold F for 4 extra beats before resolving to E. Feel the weight pressing down, the body wanting to descend. When you finally step down to E, the release is like setting down something heavy. B pulls UP (yearning), F pulls DOWN (gravity) — these two opposing forces are the emotional engine of the minor scale.", why: "E-F is the second semitone in A natural minor. Where B-C pulls upward (yearning in the throat), E-F pulls downward (gravity in the chest). Gordon's movable-do framework: Fa presses downward while Ti pulls upward. Feeling these opposing functional pulls IS functional ear training. These two half steps are the emotional engine of the minor scale — and each has a distinct body direction. The body mirrors the harmonic character." },
        { text: "Sing A then jump to F. A sits grounded in the chest; F drops the resonance into something darker, compressed, almost subterranean. Hold both notes long — feel the body journey. A-F is the minor 6th, the most bittersweet sound in the scale. As you hold F, notice where the vibration settles: lower chest, heavy, with a quality of looking backward. Not quite sad, not quite sweet, but both at once.", why: "The minor 6th (A-F) is the interval of film music sadness, of nostalgia. The body-location shift from A's grounded warmth to F's heavy compression mirrors the emotional descent. Nummenmaa 2024 (PNAS) found that sadness and heaviness map to the same lower-body regions cross-culturally." },
        { text: "Walk E-F-G ascending and G-F-E descending. Feel F as the shadow between two brighter notes — a valley in the body where the resonance dips. Now walk the FULL SCALE: A-B-C-D-E-F-G ascending. Feel the vibration climb through seven body stations: chest (A), throat-pull (B), throat-settle (C), bridge (D), openness (E), shadow (F), floating (G). Descend: G-F-E-D-C-B-A. Seven notes, seven addresses, one complete instrument.", why: "With all seven notes, you have a complete body map of A natural minor. Each note has a resonance address AND an emotional color. The full ascending walk is a journey through your instrument from foundation to canopy." },
        { text: "Improvise with all 7 notes. Before you begin, set an intention: use F when you want darkness and weight (feel it compress in the chest), use B when you want yearning and pull (feel it lean in the throat). The pentatonic notes are your stable ground — their body addresses are familiar. B and F are your tension colors, each with a distinct physical signature. 2 minutes, record.", why: "Seven-note improvisation with embodied intention means you're choosing notes by HOW THEY FEEL, not just how they sound. When you reach for F because you want that physical weight, you're running the choose-feel-hear-produce cycle — the compositional version of the embodiment cycle." },
        { text: "The full natural minor scale is complete. Sing it once more, slowly: A-B-C-D-E-F-G-A. As each note sounds, name it AND notice its body address. A: chest. B: throat-pull. C: throat-settle. D: bridge. E: openness. F: shadow. G: float. A: home, one octave higher, the cycle complete. These seven notes and seven body stations are every melody you'll ever write in A minor.", why: "Naming each note while feeling its body address builds a dual-retrieval system — sound plus sensation. Your future melodies will be guided by both channels simultaneously, which is how professional singers navigate: they feel the note arriving in the body before it arrives in the room (Zamorano 2025)." }
      ],
      feel: "F should feel heavy, like a stone in your pocket — a literal downward weight in the chest and throat. When you sing A-F, feel three shifts at once: the pitch drops wide, the resonance darkens from open chest to something compressed and shadowed, and the emotion turns bittersweet — like looking at a beautiful sunset knowing it will end. That's the hear-feel-choose cycle running on a single interval. When F resolves down to E, the weight lifts — the chest opens, the shadow clears.",
      wrong: "If F sounds the same as E to your ear, you're likely singing E again. F is one half step higher — the smallest possible step up. Use the pitch display to see the difference. If the new placement feels weird or unnatural, that's proprioceptive recalibration — your body map is updating. The 'wrong' feeling is actually growth. Trust the recording over how it feels for the first few sessions. If F doesn't feel physically heavier than E, research explains why it should: tension notes like F recruit more somatosensory cortex than stable notes (PMC5608010). Hold F against the drone for 8 beats and scan your body — the tension lives somewhere specific. Find it. VOCAL TIP: The half-step E→F is tiny in pitch but can trip up your voice because your body wants to stay on E. Two techniques: (1) PREPARE THE LANDING — before singing E→F, place your mouth in the shape of the F vowel while still singing E. The mouth arrives before the pitch does. (2) For the wide jump A→F (minor 6th), DON'T think of it as a big leap — think of it as two small steps you take in one stride (A→C→F but fast). Your vocal folds handle large intervals better when the brain imagines stepping stones, even if the sound is a clean jump.",
      sarah: "Gene, you now have every note in the A minor scale. The pentatonic was your safe space — beautiful, versatile, can't go wrong. B and F are where the real emotion lives. Hermanos Gutiérrez, the Allah-Las at their darkest, Tinariwen's deepest moments — they're using B and F to break your heart.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },
    {
      id: "ss-5-6",
      time: 7,
      title: "Seven-Note Wandering",
      type: "vocal",
      what: "Free exploration of all seven notes — A, B, C, D, E, F, G. Walk the scale, wander through it, mix steps and small leaps. This mirrors your pentatonic wandering (ss-4-2) but with the full palette. Notice how B and F change the color of everything — the melodies that emerge from seven notes sound darker, richer, more complex than pentatonic alone.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM. Voice check: if a jump cracks, you're pushing too much air. Try the same jump quieter.",
      steps: [
        { text: "Walk the full A natural minor scale ascending: A-B-C-D-E-F-G. Feel the vibration rising through seven body stations — chest warmth (A), throat-pull (B), throat-settle (C), bridge (D), openness (E), shadow (F), floating mask (G). Descend: G-F-E-D-C-B-A, the resonance pouring back down. Do this 4 times. By the third pass, the body map should feel as natural as the pitch map.", why: "Scale walking with body awareness builds a dual navigation system. The vibration-rising map (chest → throat → mask) is not a metaphor — Nummenmaa 2024 (PNAS, n=1,938) confirmed these body maps are cross-culturally universal. Once the paired pitch-and-body patterns are automatic, your voice navigates by sensation as much as by sound." },
        { text: "Wander freely using mostly stepwise motion — each note leads to its neighbor. As you meander through A-B-C-B-A-B-C-D-E-F-E-D, feel the vibration gently swaying between body stations, like a tide moving through your torso. When you pass through B-C (the half step), notice the physical tightness and release. When you pass through E-F, feel the shadow arrive and depart.", why: "Stepwise wandering through seven notes is also a body journey — the vibration migrates continuously. The two half steps (B-C and E-F) create moments of physical tension that the pentatonic never had. Your body registers these micro-tensions before your conscious mind notices them." },
        { text: "Add occasional small leaps for contrast: walk for 3-4 notes, then skip one. A-B-C-E (skipped D) — feel the vibration jump from throat to openness. Or D-F-G (skipped E) — the resonance drops into shadow then rebounds to the mask. Each leap is a body-location skip that creates physical surprise alongside melodic surprise.", why: "Mixing steps and small leaps creates interesting contour — but it also creates interesting body sensation. Steps are gradual resonance migrations; leaps are sudden shifts between body addresses. The physical surprise mirrors the melodic surprise." },
        { text: "2-minute eyes-closed freestyle with all seven notes. Let the embodiment cycle guide you: hear each note forming, feel where it wants to land, choose what it expresses, then produce it. Record it. Then listen back-to-back with your pentatonic freestyle (ss-4-7) — the seven-note version is darker, richer, more atmospheric because B and F add body-locations the pentatonic never reached.", why: "Comparative listening reveals what B and F add: not just two more pitches, but two more body addresses and two more emotional colors. The seven-note body map is denser, more nuanced — which is why these melodies sound more like the songs you actually love." }
      ],
      feel: "Before you begin: what ONE thing will you listen for? Maybe: 'I want to feel the half steps.' After: what did you notice? What surprised you? Seven-note wandering should feel like walking through a landscape with more shadows and depth than the pentatonic meadow. The same trail, but the light is different — more complex, more atmospheric. Notice how your body responds to each note differently as you pass through: the pentatonic notes feel open and settled, but when B or F appears, your throat shifts, your resonance tightens slightly, and an emotional urgency flickers through. That flicker is your somatosensory system telling you 'this note has tension.' Trust the body's signal.",
      wrong: "If you keep avoiding B and F and reverting to pentatonic patterns, consciously include them. Try starting a phrase ON B or ON F — make them the departure point, not just passing visitors.",
      sarah: "Gene, the pentatonic was training wheels — beautiful training wheels that professionals use every day, but still a simplified version. Seven notes is the real thing. This is what the Allah-Las, Skinshape, and DOPE LEMON are actually singing. You're there.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-7",
      time: 7,
      title: "Seven-Note Rhythm Play",
      type: "vocal",
      what: "Rhythm applied to all seven notes — mirrors the pentatonic rhythm play (ss-4-5) but with the full palette. Whole notes through the scale, then half notes, then quarter notes. Try syncopation with B and F as landing notes — the tension notes on strong beats create a distinctly different rhythmic flavor than pentatonic notes on strong beats.",
      setup: "Guitar. Metronome at 80 BPM. Voice check: porch register even on high notes. Easy and warm, not pushed or squeezed.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Sing through all seven notes using whole notes — one note per bar. A... B... C... D... E... F... G... Slow, deliberate. With a full bar on each note, you have time to feel where it lives: A settles deep in the chest, B pulls in the throat, C releases, D bridges, E opens, F compresses with shadow, G floats toward the mask. When B and F get a whole bar of attention, their body signatures become unmistakable — more physical sensation than the stable notes (PMC5608010).", why: "Whole notes on tension notes expose their somatic character. B on a strong beat creates a physical pull in the throat. F on a strong beat creates weight in the chest. You're learning that note choice changes not just the sound but the body address of the phrase." },
        { text: "Speed up to half notes, then quarter notes. At quarter-note speed, the half steps (B-C, E-F) become quick flickers — the body barely has time to register the tension before it resolves. Try landing B on beat 1 — feel the yearning emphasis gather in your throat on the strongest beat. Then land F on beat 1 — feel the dark compression on the downbeat. The body sensations become rhythmic events.", why: "Tension notes on strong beats create a different physical experience than pentatonic notes on strong beats. When B hits beat 1, your throat tightens on the most important moment. When F hits beat 1, your chest compresses on the downbeat. Rhythm determines WHEN you feel the tension in your body, not just which note creates it." },
        { text: "Syncopation with the groove: sing seven-note phrases that land between the Khruangbin backbeat. Put B or F on the offbeat — between the strum hits. The tension notes in the rhythmic gaps create irresistible groove because the body tension arrives in the musical silence, creating a feeling of suspension, of hovering between ground and sky.", why: "Offbeat tension notes over a groove is the signature sound of psych-soul and desert blues. When B or F falls in the gaps, the body registers tension in the space between beats — a sensation of floating that is both physical and musical. Aarhus (2021) found that combining imagery with production accelerates learning." },
        { text: "2-minute freestyle: all seven notes, any rhythm, over the backing track. Use B and F with intention — choose the feeling first (yearning? shadow?), feel where it wants to live in the body, hear the note that matches, then place it rhythmically. The full cycle: CHOOSE → FEEL → HEAR → PRODUCE. Record it.", why: "Running the cycle in compositional order (emotion-first, then body, then pitch, then production) is how songwriters work. When you reach for B because you want throat-tension on the offbeat, you're composing with your body, not just your ear." }
      ],
      feel: "The seven-note rhythmic phrases should sound more complex and more 'professional' than your pentatonic rhythm play. The half steps add a sophistication that the pentatonic can't produce.",
      wrong: "If you're still playing it safe with only pentatonic notes, set a rule: every other phrase MUST include B or F. Force the tension notes into your rhythm until they feel natural.",
      sarah: "Gene, this is the sound of Khruangbin's vocal lines — pentatonic with occasional tension notes placed on rhythmically interesting beats. Laura Misch does the same thing. The seven-note palette over this groove is exactly where your music lives.",
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-5-8",
      time: 7,
      title: "Seven-Note Conversation",
      type: "vocal",
      what: "Guitar-voice call and response with all seven notes — the richest conversation yet. The guitar now has B and F available for calls; the voice has them for answers. Try phrases that emphasize the tension notes — a guitar call ending on B demands a voice answer that resolves or extends the tension.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM. Voice check: sigh (haaa) to reset if the throat tightens between exercises.",
      steps: [
        { text: "Guitar plays a phrase using all seven notes — include B or F deliberately. Before you answer, let the guitar's phrase land in your body: where did the tension settle? If the call ended on B, feel the pull in your throat — now choose: resolve to C (feel the release), hold the tension (stay in the throat-pull), or deepen it with F (drop into chest compression). Your answer is a body response as much as a pitch response.", why: "Tension-and-resolution in call-and-response is the foundation of musical dialogue. When one voice creates tension, the body registers WHERE that tension lives. Responding from the body — feeling where the call landed and choosing how to answer physically — produces more natural, more musical responses than calculating intervals (Zamorano 2025)." },
        { text: "Try a conversation using ONLY B and F — the tension notes. Guitar: B-F-B. Voice: F-B-F. Pure tension, no resolution. Feel how the vibration oscillates between two unstable body addresses — throat-pull (B) and chest-shadow (F) — never settling. The body stays in suspended tension throughout. How does it feel? Unresolved, floating, mysterious.", why: "Isolating the tension notes reveals their somatic character in pure form. A conversation in only B and F keeps the body in a state of unresolved physical tension — the resonance never finds a stable resting place. This is the physical basis of musical mystery and atmosphere." },
        { text: "Now alternate: tension call, pentatonic answer. Guitar ends on F (chest-shadow). Voice answers with a pentatonic phrase ending on A (chest-home). Feel the body journey: from F's compression to A's grounded warmth — the shadow clears, the chest opens, the resonance settles. The contrast between physical tension and physical rest drives the conversation forward.", why: "Mixing tension calls with pentatonic answers creates dramatic arc — not just harmonically but somatically. The body moves from unstable addresses (F's shadow, B's pull) to stable ones (A's chest, E's openness). This push-pull between body states IS the emotional engine of tonal music (Nummenmaa 2024)." },
        { text: "Free conversation, all seven notes, 3 minutes. Let the embodiment cycle run continuously: hear the guitar's call, feel where it lands in your body, choose what your body wants to express in response, then produce it. Record it. Listen for the moments where B and F created body-tension that drove the dialogue.", why: "Extended conversation with the full palette and continuous body awareness is where you discover your somatic relationship with the tension notes. Some musicians' bodies lean toward F (chest-shadow); others toward B (throat-pull). Your body's preference is part of your musical identity." }
      ],
      feel: "The seven-note conversation should feel more dramatic and emotionally varied than the pentatonic version. The tension notes add stakes — when B or F appears, something needs to happen next.",
      wrong: "If the conversation feels the same as your pentatonic conversations, you're not using B and F enough. Make a rule: every other phrase must include at least one tension note.",
      sarah: "Gene, this conversation is richer than anything you've done before. Seven notes means every phrase has more options — and the tension notes mean the stakes are higher. When the guitar calls with B, your voice has to decide: resolve the tension or ride it. That decision IS musical expression.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 80,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-5-9",
      time: 8,
      title: "Tension Groove",
      type: "vocal",
      what: "Genre-feel improv emphasizing B and F over backing tracks — mirrors the Pentatonic Groove Palette (ss-4-15) but with the tension notes as featured players. Desert blues leans on B for yearning. Reggae uses B as a pull into C for one-drop phrasing. Surf uses F for weight and drama. Three genres, the tension notes are what make each one distinctive.",
      setup: "Guitar. Choose backing tracks by genre. Voice check: for half-steps (B↔C, E↔F), minimal movement. Don't change your whole approach for one semitone.",
      tracks: [
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }
      ],
      steps: [
        { text: "Before each genre: play the backing track and just LISTEN for 30 seconds with eyes closed. Feel where the groove lives in your body. When your body is moving, THEN sing. Desert blues (2 min): Play over the desert blues groove. Lean heavily on B — hold it, bend into it, let it hang unresolved. B is the Tinariwen note, the Saharan longing note. Sing mostly in the lower register (A3-D4), below your passaggio. This is your chest voice territory — warm, grounded, intimate. Let your breath support from your belly, not your throat. The tension builds slowly because the voice stays physically relaxed even as the notes create emotional tension.", why: "Desert blues thrives on sustained tension. Staying below the passaggio (around A3-B3 for your voice) keeps the sound in chest resonance — warm and close. The emotional tension comes from the NOTES (B's yearning), not from vocal strain. This separation of emotional tension from physical tension is a core vocal production skill." },
        { text: "Reggae (2 min): Switch to the one-drop groove. Use B as a quick approach note — B pulling up to C on the offbeat. The B-C half step in a reggae context sounds like roots reggae at its most soulful. Keep phrases short, behind the beat.", why: "In reggae, half steps are used as quick ornamental pulls — B slides up to C like a vocal scoop. The one-drop groove provides the pocket; B-C provides the soul." },
        { text: "Surf rock (2 min): Switch to the surf groove. Use F for weight and drama — F on a downbeat adds gravity to otherwise bright phrases. The A-F interval over surf rock sounds cinematic and slightly dark. Let it ride.", why: "Surf rock uses the minor 6th (A-F) for its darker, more dramatic moments — think Dick Dale's moodier passages or the Allah-Las' darker songs. F adds shadows to the sunshine." },
        { text: "Record all three. Before listening back, commit to your predictions: for each genre, were your B and F notes sharp, flat, or on? Say it out loud — 'I think my desert blues B was slightly flat, my surf F was on.' THEN listen back with these specific questions: (1) Can you hear B and F distinctly, or do they blur into the pentatonic? (2) Does each genre sound genuinely different in mood? (3) Were your predictions correct? Rate your pitch accuracy on B and F from 1-5 — are you hitting them cleanly or sliding? The prediction matters as much as the pitch — you're training your self-assessment, not just your voice. (4) Where does your voice sound most natural — desert blues chest voice, reggae mid-range, or surf full voice?", why: "Structured self-assessment with specific criteria produces faster improvement than general listening. The predict-before-checking step forces your brain to engage its internal monitoring system — the same proprioceptive awareness that professional singers rely on. Hebert & Coker (2021) found that self-controlled feedback produces better long-term retention than constant external feedback. The 2021 Springer study on song retention found that deliberate evaluation during playback strengthens both the musical memory and the self-correction instinct. Knowing WHAT to listen for is half the battle." }
      ],
      feel: "Each genre should sound DIFFERENT despite using the same seven notes. The groove determines the mood; B and F are the spice that makes each genre taste distinct. Pay attention to how the tension notes feel differently in each genre context: B in desert blues is a slow ache in the chest. B-to-C in reggae is a quick flicker in the throat. F in surf rock is a weight that pulls the resonance downward. Same notes, different body sensations — because genre shapes how you produce the note, which shapes where you feel it.",
      wrong: "If all three genres sound the same, you're not adapting to the groove. In desert blues, slow down and hold notes. In reggae, shorten phrases and go behind the beat. In surf, ride the tempo and use dynamics.",
      sarah: "Gene, this is the exercise where your playlists come alive in your voice. Desert blues B is Tinariwen. Reggae B-to-C is Protoje. Surf F is Allah-Las at their darkest. These are YOUR genres, and now you have the notes that make them real.",
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true
    },

    // ─── PHASE 10: JUMP TRAINING ───

    {
      id: "ss-5-10",
      time: 7,
      title: "First Jumps — From A",
      type: "vocal",
      what: "Until now, most of your singing has been stepwise — moving to the next adjacent note. Now practice JUMPING: singing one note, then leaping to a non-adjacent note. Start from A (home) and jump to each of the other six notes. Each jump has a different size and a different emotional flavor.",
      setup: "Guitar. Drone on A. Metronome at 70 BPM. Voice check: quick body scan — jaw, shoulders, tongue, belly. Where is tension hiding?",
      steps: [
        { text: "Before starting: breathe in for 4 counts, then hum-sigh out for 6 counts. Repeat 3 times. Wide jumps cross your passaggio (A3-B3 zone), which can trigger throat tension. This primes the vagus nerve — it directly controls your vocal folds, and calming it loosens the instrument for register transitions. Then before each jump, AUDIATE: hear the landing note in your head before you sing it. Play nothing you didn't hear first. Start with A→B — hear B internally (remember the pull from ss-5-4), then sing it. If you can hear the destination before launching, you'll land accurately. If you can't hear it yet, play it on guitar first, then try again from memory.", why: "Audiation before jumping is what separates trained singers from guessers. Gordon (Stage 6) shows that pre-hearing activates auditory cortex BEFORE motor cortex. CLA research (Gray 2018) confirms that constraining output forces the auditory-cognitive system to lead. The bigger the jump, the more critical audiation becomes." },
        { text: "A→B (one step up — intimate, close). Sing A for 2 beats, jump to B for 2 beats. Then reverse: B→A. Repeat 4 times. Feel how small and personal this jump is.", why: "Starting with the smallest jump calibrates your ear. A→B is just a whole step — comfortable, warm, intimate. This is the baseline for feeling larger jumps." },
        { text: "A→C (minor 3rd — the 'ache'). A→D (perfect 4th — 'lift'). A→E (perfect 5th — 'openness'). For each: audiate the landing note, then jump. Notice THREE shifts with each leap: the pitch distance, the body-location shift (chest to throat to mask), and the emotional-color shift (home to ache to lift to openness). These aren't separate observations — they're one integrated sensation. A→F isn't just a pitch leap — it's a body-location leap and an emotional leap felt simultaneously.", why: "Each progressively wider jump engages different vocal mechanics. Small jumps stay in one register. Wide jumps may cross your passaggio (the gear-shift point around A3-B3 where chest voice transitions to head voice). If a wide jump feels like it 'breaks,' you're crossing the passaggio — let it happen, don't fight it. Zamorano (2025) found that body awareness predicts pitch accuracy (R²=0.41) — feeling where the note lives IS how you land on it." },
        { text: "A→F (minor 6th — 'bittersweet'). A→G (minor 7th — 'yearning'). These are wide jumps that likely cross your passaggio. Notice: does your voice shift quality when you land on F4 or G4? That shift is your register changing. Both registers are valid — the goal is smooth navigation, not avoiding the transition.", why: "The widest jumps are both emotionally charged AND physically demanding. A3→F4 spans your passaggio zone. The register shift you feel is normal — professional singers learn to smooth this transition so the audience hears emotion, not mechanics." },
        { text: "Quick-fire round: someone calls a note name, you audiate it, then jump from A instantly. 2 minutes. Record it. Before listening back, predict: which jumps did you nail and which did you slide into? Commit out loud — 'I think A→F was clean but A→G was a slide.' THEN listen back. Were your predictions right? The prediction matters as much as the pitch — you're training your internal judge, not just your voice. Mid-pass check: are you still hearing each landing note before launching, or has autopilot kicked in and you're just reacting to note names? If autopilot kicked in — good, you noticed. Return to hearing first.", why: "Self-assessment on clean vs. sliding landings is the most precise way to measure your audiation accuracy. Clean = you heard it before you sang it. Slide = you were adjusting in real time. The predict-before-checking step trains your internal monitoring: Hebert & Coker (2021) found that self-controlled feedback produces better long-term retention than constant external feedback. The autopilot check is a diagnostic: speed naturally pushes you toward reacting instead of pre-hearing. Catching that shift is the awareness you're building." }
      ],
      feel: "Each jump should feel distinctly different — like reaching for objects at different distances. A→B is reaching for your phone. A→G is reaching for the top shelf. The physical sensation in your voice changes with the distance.",
      wrong: "If all jumps feel the same, slow down and hold each landing note for 4 beats. The destination matters as much as the launch. Really ARRIVE on each note.",
      sarah: "Gene, this is where your improvisation goes from 'walking through the scale' to 'painting with distance.' Every great melody is a sequence of jumps — some small, some dramatic. You're building the vocabulary of distance.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-11",
      time: 8,
      title: "Jumps From Everywhere",
      type: "vocal",
      what: "Now jump from EVERY note, not just A. Start on C, jump to G. Start on D, jump to B. Start on F, jump to A. There are 21 unique pairs between 7 notes — and each pair has its own character. The key insight: A is not the only valid starting point. Every note is a valid home base for a jump.",
      setup: "Guitar. Drone on A. Metronome at 70 BPM. Voice check: lip trills before wide jumps smooth the register transitions.",
      steps: [
        { text: "Jumps from C: C→D, C→E, C→F, C→G, C→A, C→B. Before each jump, feel where C lives (throat, settled) and where the destination lives — each landing shifts the vibration to a new body address. C→F drops into chest-shadow. C→G floats to the mask. C→A returns to deep chest-home. Sing each pair 4 times. The body-location shift IS the interval — you can feel the distance in your torso before you hear it in your ear.", why: "Changing the starting note changes the entire body journey. C as a launch pad sits in the throat — every departure FROM the throat feels different than departures from A's chest. This trains your body to navigate from any resonance address, not just home (Zamorano 2025)." },
        { text: "Jumps from D and E: D→F, D→G, D→A, D→B, D→C. Then E→G, E→A, E→B, E→C, E→F. Quick-fire — 4 reps each pair. Feel how D (bridge, upper throat) launches differently from E (open, clear). A jump from D feels like searching — the body is already between stations. A jump from E feels like departing from clarity.", why: "D is restless (the bridge between chest and head). E is stable (the 5th, sitting in openness). Jumping from each produces different body trajectories. The physical sensation of departure varies with the stability of your starting address — and your body knows the difference before your theory does." },
        { text: "Jumps from the tension notes: F→A, F→B, F→C, F→G. Then B→D, B→E, B→F, B→G. Starting from F (chest-shadow), every jump is an escape from compression. Starting from B (throat-pull), every jump either resolves the pull or deepens it. The body urgency of launching from an unstable address makes these the most emotionally charged jumps in the scale.", why: "Launching from tension notes is the most advanced interval skill AND the most somatically intense. Research shows tension notes recruit more somatosensory cortex (PMC5608010). When your starting point is already physically unstable — throat pulling or chest compressing — the jump carries the body's urgency with it." },
        { text: "Random pairs: have someone call two notes. Before each jump, audiate both notes and feel both body addresses — the departure station and the landing station. Then jump. Any pair, any direction. 2 minutes. The body map should be fast enough now that feeling the two addresses takes less than a second.", why: "Random pair calling eliminates dependency on specific starting points. When you can feel the body journey of any two-note pair instantly — departure address to landing address — your melodic vocabulary is complete. You navigate by sensation as much as by ear." }
      ],
      feel: "By the end, you should feel equally comfortable starting from ANY note — not just A. The scale has no privileged starting point for jumps. Every note is a valid launch pad.",
      wrong: "If jumps from B and F feel impossible, spend extra time on those. Sing B as your 'home' for 8 beats, then jump outward. The tension notes need to feel like viable starting points, not just destinations.",
      sarah: "Gene, most singers only jump from the root. You're training to jump from ANYWHERE — and that's what makes a melody unpredictable and interesting. When you can start a phrase on F and leap to D, you're writing melodies no one expects.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-12",
      time: 7,
      title: "Half-Step Mastery",
      type: "vocal",
      what: "The two hardest jumps in the scale: B↔C and E↔F. These half steps are where most singers go out of tune. Dedicated practice here pays off in EVERY melody you'll ever sing — because half steps appear in every key, every mode, every style. Master these two intervals and your intonation improves across the board.",
      setup: "Guitar. Drone on A. Metronome starting at 60 BPM. Voice check: jaw loose, tongue tip on bottom teeth. Wide jumps need a relaxed throat.",
      steps: [
        { text: "Slow alternation: B-C-B-C-B-C at 60 BPM. Feel the body toggle — B pulls in the throat (narrowing, leaning), C releases (the throat opens slightly, the resonance settles). This tiny physical oscillation between tension and release is what the half step IS in the body. Use the pitch display to verify accuracy — the half step is so small that imprecision is easy to miss, but the body sensation should be distinct.", why: "Half steps require finer muscle control than whole steps. The body toggle (throat-pull on B, throat-release on C) provides a somatic targeting system alongside the pitch display. Zamorano (2025) found body awareness predicts pitch accuracy (R²=0.41) — feeling the toggle helps you land on the notes. Slow practice builds the neuromuscular precision that fast practice cannot." },
        { text: "Same with E-F-E-F-E-F at 60 BPM. This half step has a completely different body signature: E sits open in the upper chest, F compresses downward with shadow. The toggle direction is different — E-F pulls the resonance DOWN (compression), while B-C pulls it UP (release). Both half steps are the same size but opposite body journeys.", why: "E-F and B-C are acoustically identical intervals but somatically opposite. B-C: throat-tension → release (upward). E-F: openness → compression (downward). Each half step has its own body memory. Professional singers distinguish them by feel, not just by pitch (PMC5608010: tension notes recruit more somatosensory cortex)." },
        { text: "Speed up gradually: try 70 BPM, then 80. At each tempo, can you still feel the body toggle — tension/release on B-C, open/compress on E-F? If the body sensations blur at speed but the pitch display shows accuracy, that's fine. If the pitches blur, go back and let the body toggle guide you to precision.", why: "The speed-accuracy tradeoff is real for half steps. As speed increases, the somatic feedback becomes your fast-response system — you can feel a wrong note in your body faster than you can see it on the display. Training both channels (ear + body) creates redundant accuracy." },
        { text: "Embed the half steps in melodies: walk A-B-C — feel the throat-pull of B resolve into C's settled warmth. Walk D-E-F — feel the openness of E darken into F's shadow. Now try phrases that START on B or F — launch from the tension, from the body's unstable address, and step outward. 2 minutes freestyle, record.", why: "Half steps in melodic context activate the body's tension-release mechanism within musical phrases. When B leads into C within a phrase, the throat literally opens — the release IS the music. When F follows E, the chest compresses — the shadow IS the expression. Starting from tension addresses and stepping away is composition from the body outward (Aarhus 2021: imagery + production = equal learning in one-third the time)." }
      ],
      feel: "Half-step practice should feel like tuning a fine instrument — precise, careful, rewarding when accurate. The pitch display is your mirror. When B and C appear as two distinct notes (not a smear), you've got it.",
      wrong: "If B and C sound like the same note, you're not moving enough. A half step is SMALL but it IS a step. If they sound too far apart, you're overshooting — probably singing Bb-C instead of B-C.",
      sarah: "Gene, this is the exercise that makes your voice trustworthy. When you can nail half steps consistently, everything else is easy. Professional singers drill half steps their entire careers. This is where precision meets expression.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 60
    },
    {
      id: "ss-5-13",
      time: 7,
      title: "Jump Improv — Leaps Only",
      type: "vocal",
      what: "Free improvisation where stepwise motion is BANNED. Every note must be a leap — skip at least one scale note between each pitch. This creates angular, jagged, unexpected melodies that force your ear to navigate wide intervals. No walking allowed. Only jumping.",
      setup: "Guitar. Drums-only track for rhythm.",
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "2 minutes over the Am drone: sing only leaps. A→D→F→C→G→B→E. Each leap is a body-location jump — the vibration teleports between stations rather than migrating smoothly. A (chest) → D (upper throat) → F (chest-shadow) → C (throat-settle) → G (mask). Feel each landing arrive in a distinct body address. Your voice will constantly cross the passaggio (A3-B3 zone) — let it. Wide leaps mean register shifts. Let the voice flip, crack, shift registers. The cracks become smooth with practice.", why: "Banning stepwise motion forces wide body-location jumps. Where stepwise singing creates a gradual resonance migration, leaps create sudden shifts between distant body addresses. Learning to navigate these jumps is essential — every great vocalist uses register shifts as an expressive tool. The body-location awareness gives you a landing target for each leap (Zamorano 2025)." },
        { text: "2 minutes over the drums: same rule (leaps only) but now with rhythm. Before each leap, feel where you are in the body (departure address) and where you're going (landing address). Breathe from your belly before launching — wide intervals need more air support because the vocal tract must reconfigure for each new body address. The angular intervals over a groove create a completely different kind of melody — physical and visceral.", why: "Angular melodies over a groove require ear accuracy, breath management, AND rapid body-location shifting. Wide leaps consume more air because the vocal tract reshapes dramatically between distant resonance addresses. Belly breathing (appoggio) provides the sustained support these transitions need." },
        { text: "Challenge: make the leaps-only improv sound MUSICAL. Before each leap, run the cycle: choose the emotion, feel where the landing note lives, hear it forming, then produce it with conviction. Land on F after jumping from C — COMMIT to F's shadow-compression. Hold it. Mean it. Each landing should feel like arriving at a body address you chose, not a random destination.", why: "The difference between random leaping and intentional leaping is embodiment. When you choose F for its darkness, feel its chest-compression, hear the pitch before launching, and land with conviction — that's the full hear-feel-choose-produce cycle running at speed. Intentional leaps are expressive; random leaps are noise." },
        { text: "Record both sections. Listen back with body awareness — which leaps created the most striking body-location shifts? Which surprise landings FELT best? The unexpected combinations that feel right in the body are melodic ideas your stepwise habits would never discover.", why: "Leaps-only improvisation is a somatic creativity generator. The constraint forces novel body-location combinations alongside novel pitch combinations. Some of these 'accidental' body journeys will feel so right that they become signature phrases (Nummenmaa 2024: the body registers musical meaning cross-culturally)." }
      ],
      feel: "This should feel like jumping between rocks in a stream — each leap requires a moment of faith before you land. The angularity is the point. Smooth comes later; right now, embrace the jaggedness.",
      wrong: "If you catch yourself singing A-B-C-D (stepwise), stop and skip: A-C-E-G. The rule is absolute — every note must skip at least one pitch. If it feels impossible, start with just 3 notes (A, D, G — all leaps) and add more as you gain confidence.",
      sarah: "Gene, leaps-only improv is the most creatively explosive exercise in this level. The melodies that emerge from pure jumping are unlike anything you'd write on purpose — and some of them will be genuinely beautiful. Accidents become ideas.",
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-14",
      time: 8,
      title: "Random Jump Roulette",
      type: "vocal",
      what: "Maximum ear training: draw two random notes, sing the jump between them. No preparation, no pattern, pure ear navigation. Write A, B, C, D, E, F, G on slips of paper (or use a randomizer app). Draw two. Sing the first, jump to the second. Draw again. The unpredictability forces your ear to calculate intervals in real time.",
      setup: "Guitar. Drums-only track. Seven slips of paper with note names (or a randomizer app on your phone).",
      tracks: [{ name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      steps: [
        { text: "Draw two notes. Before singing, AUDIATE both and FEEL both body addresses: see the first note name, hear it in your head, feel where it lives. See the second, hear it, feel its body station. THEN sing the first for 2 beats (arriving at its body address), jump to the second for 2 beats (landing at the new address). The pause to audiate and locate may feel slow — accuracy over speed. Draw again. 2 minutes.", why: "Audiation paired with body-location under pressure (random notes, no preparation) is the highest-level embodied ear training. Two targeting systems (ear + body) produce more accurate landings than either alone. A 2019 PMC study found that deliberate practice with feedback builds expert-level discrimination. The audiation-and-location pause IS the deliberate practice (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Same drill, but now name the BODY SENSATION and EMOTION of each jump. D→F: 'that drops into the chest — feels dark.' A→E: 'that lifts into openness — feels expansive.' B→G: 'throat-pull to mask-float — feels like yearning resolved.' Build a three-channel vocabulary: pitch + body + emotion. 2 minutes.", why: "Linking each interval to a body sensation AND an emotion creates three retrieval pathways. You can find intervals by sound (ear), by feeling (body), or by emotional quality. Three paths to the same note make you faster, more accurate, and more expressive than any single channel (Nummenmaa 2024)." },
        { text: "String 4 random jumps together into a melody: draw 4 pairs, sing them connected. As the phrase unfolds, feel the body journey — the vibration bouncing between stations. The random sequence creates body-journeys you'd never choose on purpose. Some will feel awkward. Some will feel like discovery. Keep the ones that feel right in the body.", why: "Random-generated melodies are the ultimate somatic surprise. The body-location sequences your conscious mind would never compose can produce striking physical experiences that translate to striking music. Your body knows what sounds good before your theory does." },
        { text: "Final round: keep drawing pairs until you find one that MOVES you — not just in your ear, but in your body. One that creates a specific physical sensation you want to feel again. Repeat that pair 8 times, embedding it in different rhythms. This body-discovered interval is yours — a found object that connects sound, sensation, and emotion.", why: "The roulette discovers your body's unconscious preferences. The jump that moves you reveals where your body WANTS to travel musically — a somatic identity that deliberate practice can't uncover. This is the intersection of the hear-feel-choose-produce cycle with genuine discovery." }
      ],
      feel: "The roulette should feel playful — like a game, not a test. Some jumps will be easy (A→E), some hard (B→F). The surprise is the fun part. Laugh at the hard ones. Celebrate the beautiful ones.",
      wrong: "If you're peeking at the slips and choosing 'easy' pairs, shuffle harder. The whole point is randomness. If a pair feels impossible (F→B?), slow down and use the drone to guide you there. Every pair IS singable.",
      sarah: "Gene, this is musical roulette — and it's the most fun exercise in the whole curriculum. Every draw is a tiny adventure. Some combinations will surprise you with how beautiful they sound. Those surprises become the building blocks of songs nobody else could write.",
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-15",
      time: 7,
      title: "Emotional Jumping",
      type: "vocal",
      what: "The final exercise: choose jumps by FEELING, not by name. Small jumps feel intimate. Wide jumps feel dramatic. Tension-note jumps feel dark or yearning. Build emotional arcs using only the distance between notes. This is where interval training becomes musical expression — you stop thinking about 'A to F' and start thinking about 'I want that bittersweet feeling.'",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Map the emotions: sing A→B (intimate, close). A→C (ache). A→D (lift). A→E (openness). A→F (bittersweet, dark). A→G (yearning, longing). Say the feeling out loud after each jump. Build the emotion-interval dictionary.", why: "Associating each interval with a feeling creates a new kind of musical vocabulary — one based on emotion, not theory. When you want 'yearning,' you reach for A→G without thinking about 'minor 7th.'" },
        { text: "Emotional request round: someone says a feeling (or you pick a card with emotions written on it). Find the jump that matches. 'Give me sadness' → A→F. 'Give me hope' → A→D. 'Give me tension' → E→F. Can you find the right interval for each emotion?", why: "Emotion-to-interval translation is the composer's core skill. Songwriters don't think 'I'll use a perfect 5th here.' They think 'I want openness here' — and their trained ear produces the right interval automatically." },
        { text: "Build a mood arc using only jumps: Start dark (F-based jumps, wide intervals). Gradually shift to more open (E-based, D-based). End intimate (B-based, small steps). Before each jump, run the cycle in reverse — CHOOSE the emotion first, FEEL where it lives in your body (darkness sits low in the chest, openness floats toward the forehead, intimacy settles in the throat), then HEAR the note that matches, then produce it. The emotional journey lives in the interval choices, and the body leads the way. 2 minutes, record.", why: "An emotional arc built from interval choices is a melody in its purest form — stripped of rhythm, lyrics, and harmony. Running the hear-feel-choose cycle in reverse (choose-feel-hear-produce) is how composition works: emotion drives pitch, not the other way around. Nummenmaa (2024) found these body maps for emotion are cross-culturally universal. Aarhus (2021) found that imagery + production = equal learning in one-third the time." },
        { text: "Listen to the recording. Can you hear the mood shift? Dark → open → intimate? The intervals are doing the emotional work. This is how melodies communicate feeling — and now you can do it consciously.", why: "Conscious control of emotional arcs through interval selection is the highest-level melodic skill. Everything from here forward — songwriting, harmony, performance — builds on this foundation of feeling through distance." }
      ],
      feel: "This should feel like painting with emotions — each jump is a brushstroke, and the combination of jumps creates a mood. You're not singing notes anymore. You're singing feelings.",
      wrong: "If all the jumps feel emotionally neutral, exaggerate. Sing the dark jumps with dark vowels and low volume. Sing the open jumps with bright vowels and projection. Let your voice's expression match the interval's character.",
      sarah: "Gene, this is where everything connects. The notes, the tension, the jumps — they all serve one thing: emotion. When you can choose a jump because of how it FEELS, not what it's called, you're thinking like a songwriter. Every melody you write from now on will have this emotional vocabulary underneath it.",
      drone: { root: "Am", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },

    // ─── PHASE 11: CROSS-KEY JUMP TRAINING ───

    {
      id: "ss-5-16",
      time: 8,
      title: "E Major Jumps",
      type: "vocal",
      what: "Jump training in E major — a completely different set of intervals than Am. The E major pentatonic (E-F#-Ab-B-C#) has different distances between notes, different physical vocal sensations, different emotional flavors. Ab and C# are notes that don't exist in Am at all. Jumping between them builds key-independent interval navigation.",
      setup: "Guitar strumming E. Drone on E. Metronome at 70 BPM.",
      steps: [
        { text: "Review the E major pentatonic: E-F#-Ab-B-C#. Sing it ascending against the E drone and feel the body map of this new key: E sits deep in the chest (lower than A), F# lifts to the upper chest, Ab brightens and moves forward, B opens toward the throat, C# reaches toward the mask with unfamiliar sweetness. Descend and feel the resonance pour back. This is a different body landscape than Am — brighter, more forward.", why: "Jumping in E major requires a new body map. The vibration-rising path (chest → throat → mask) operates on different pitches here — the body stations shift. Building this second map alongside your Am map makes interval navigation key-independent at the somatic level (Nummenmaa 2024)." },
        { text: "Jumps from E: E→F# (small lift), E→Ab (bright 3rd — the vibration leaps forward), E→B (5th — opens wide into the throat), E→C# (6th — soars toward the mask). Each jump is both a pitch distance and a body-location distance. Compare: E→B has the same SIZE as A→E (both are 5ths) but the body addresses are different — different departure, different landing, different resonance color.", why: "Comparing the same interval size across keys proves that intervals are body-colored, not abstract. A perfect 5th in E major launches from a different chest depth and lands at a different throat position than in Am. The interval feels different because it IS different in the body." },
        { text: "All 10 E major pentatonic pairs. Quick-fire — 4 reps each. For each pair, feel the body journey: departure address → landing address. Some journeys are short (Ab→B, a small shift in the throat). Some are long (E→C#, chest to mask). Note which body journeys challenge you — those are the ones where your somatic map needs the most development.", why: "Systematic coverage in a new key builds body maps alongside pitch maps. Every pair you master in E major creates a body-journey template that transfers across keys — because similar-sized intervals create similar body-location shifts regardless of starting pitch (Zamorano 2025)." },
        { text: "Random E major pairs: draw two notes from E, F#, Ab, B, C#. Feel both body addresses before jumping. 2 minutes. Then switch to Am and do random Am jumps for 1 minute. Feel the key switch in your body — the resonance landscape shifts, the body addresses relocate. The Am landscape feels like coming home to familiar rooms.", why: "Alternating between Am and E major is contextual interference at the somatic level. Your body must reconfigure its resonance map for each key. The physical difference between keys — different chest depths, different throat positions — is what makes key changes feel like something, not just sound like something." }
      ],
      feel: "E major jumps should feel brighter and more 'electric' than Am jumps — like the difference between an acoustic guitar and a Fender Stratocaster. The intervals have the same math but completely different vibes.",
      wrong: "If you're accidentally singing Am notes (C natural instead of C#, G instead of Ab), the E major drone will clash audibly. Use the drone as your guide — if it sounds wrong, you're in the wrong key.",
      sarah: "Gene, jumping in E major is where your surf-rock instincts come alive. These intervals — E to Ab, F# to C# — are the building blocks of every Allah-Las melody, every Beach Boys harmony. You're not just training your ear. You're learning to think in surf.",
      drone: { root: "E", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("E3", "C#4"),
      pianoKeys: { notes: ["E3", "F#3", "A3", "B3", "C#4"], label: "E Major Pentatonic", range: ["E3", "C#4"] },
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-17",
      time: 8,
      title: "A Major Jumps",
      type: "vocal",
      what: "Jump training in A major — same ROOT as Am but completely different notes. A major pentatonic is A-B-C#-E-F#. Compare A→C# (major 3rd, bright) to A→C (minor 3rd, ache). Same starting note, different destination, different emotion. This comparison IS the major/minor distinction, felt through jumping.",
      setup: "Guitar strumming A. Drone on A. Metronome at 70 BPM.",
      steps: [
        { text: "Sing A major pentatonic: A-B-C#-E-F#. Feel the body map shift from Am — A and B sit in familiar addresses (chest and throat-pull), but C# is new: it lands forward and bright, somewhere between throat and mask, in a body location where C never went. It's like a door opened in a wall you thought was solid. F# sits higher still, buzzing toward the forehead. The same house (A as home), but with different rooms.", why: "A major shares the ROOT with Am but the body map diverges at the 3rd. C# occupies a more forward resonance address than C — brighter, more open. The body registers major vs minor as a spatial difference, not just a pitch difference (Nummenmaa 2024). Feeling this difference is more reliable than hearing it alone." },
        { text: "The comparison jump: A→C (minor 3rd — feel the ache, the throat darkening). Then A→C# (major 3rd — feel the brightness, the resonance leaping forward). Alternate: A→C, A→C#, A→C, A→C#. One half step changes the body address AND the emotional world. C lives in the throat with shadow; C# lives forward with light. This is the most important body-location distinction in all of music.", why: "The minor-3rd vs major-3rd comparison is the foundation of harmonic understanding — and the body makes the distinction visceral. C and C# are a half step apart in pitch but a world apart in body sensation and emotional color. When you can feel the difference in your resonance, you understand harmony at the somatic level (Zamorano 2025)." },
        { text: "All 10 A major pentatonic pairs. Focus on the new body journeys: A→C# (chest to forward-bright), A→F# (chest to mask-buzz), B→C# (throat-pull to forward-bright — the half step resolves in a new direction), C#→E (forward to open), C#→F# (forward to mask). Each pair involving C# or F# creates a body journey Am never offered. 4 reps each.", why: "The pairs involving C# and F# are where A major becomes its own body landscape, not just a variation of Am. These new body journeys — forward-bright, mask-buzz — don't exist in your Am somatic vocabulary. Building them makes major-key singing feel native, not translated." },
        { text: "Reggae jumping: over an A-D-E strum pattern, practice jumping between A major pentatonic notes with behind-the-beat timing. Feel the warmth of A major's body map — more open, more forward than Am — settling into the laid-back reggae pocket. Before each jump, hear the landing note and feel its body address. 2 minutes, record.", why: "A major in a reggae context is where the body map meets genre DNA. The bright, forward resonance of A major's body addresses pairs naturally with reggae's relaxed, behind-the-beat delivery. Running the hear-feel-produce cycle in this context builds the vocal muscle memory for roots reggae singing (Aarhus 2021)." }
      ],
      feel: "A major should feel like Am's optimistic twin — same home note, brighter colors everywhere else. The jumps feel warmer, more open, less shadowy than Am jumps.",
      wrong: "The biggest trap: singing C natural instead of C# from muscle memory. Your Am training is deep — the pull toward C is strong. Use the A major drone to keep your ear calibrated to C#.",
      sarah: "Gene, A major jumps over a reggae groove is Bob Marley, Slightly Stoopid, Pepper at their brightest. The C# is what makes it sunshine instead of shadow. You're learning to jump in the key of joy.",
      drone: { root: "A", octave: 2, texture: "warm" },
      referencePitches: getPitchRange("A3", "F#4"),
      pianoKeys: { notes: ["A3", "B3", "C#4", "E4", "F#4"], label: "A Major Pentatonic", range: ["A3", "F#4"] },
      pitchContour: true,
      recorder: true,
      metronome: 70
    },
    {
      id: "ss-5-18",
      time: 10,
      title: "Three-Key Jump Roulette",
      type: "vocal",
      what: "The ultimate interval training: randomize not just the NOTES but the KEY. Round 1: random Am pairs. Round 2: random E major pairs. Round 3: random A major pairs. The key switches every round. Your brain must reconfigure interval calculations for each key — this is maximum contextual interference and the fastest path to key-independent ear training.",
      setup: "Guitar. Drums-only track (key-agnostic). Three sets of note slips: Am (A,B,C,D,E,F,G), E major (E,F#,Ab,B,C#), A major (A,B,C#,E,F#).",
      tracks: [{ name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }],
      steps: [
        { text: "Round 1 (2 min): Draw from the Am pile. Random pairs, jump between them. Feel the familiar body landscape — these resonance addresses are home territory. Your chest, throat, and mask know these stations. Let the body confidence flow.", why: "Starting with Am's familiar body map grounds you somatically before the landscape shifts. The fluency you feel here IS the result of embodied practice — your body navigates Am by sensation." },
        { text: "Round 2 (2 min): Switch to E major pile. Random pairs from E, F#, Ab, B, C#. Feel the body map shift — the resonance landscape relocates. E's chest is deeper than A's. Ab sits in a forward position your body barely knows. The adjustment is physical, not just auditory — your vocal tract must find new resonance addresses.", why: "The key switch from Am to E major forces a complete somatic recalibration. Every body address shifts. The adjustment time shortens with practice because the body builds flexible maps that can reconfigure (Zamorano 2025)." },
        { text: "Round 3 (2 min): Switch to A major pile. Random pairs from A, B, C#, E, F#. Same home-chest as Am but the upper addresses are different — C# sits forward where C sat in shadow, F# buzzes high where F compressed low. The body expects Am's landscape and keeps finding A major's brighter rooms.", why: "A major after E major forces yet another somatic reconfiguration — same root as Am, but different upper-body resonance. Your body's Am muscle memory produces C when it should produce C#. Catching this — feeling the wrong body address — is how somatic ear training works." },
        { text: "Round 4 (3 min): MIX ALL THREE PILES. Draw any pair from any key. Before each jump, quickly feel both body addresses — departure and landing — in the correct key. Strum the matching chord and jump. Three body landscapes, random access. Record it.", why: "Mixed-key random jumping is the most somatically demanding ear training possible. Your body must load the correct resonance map (Am? E? A?) and navigate within it, all in real time. When you can do this, your body-pitch navigation is key-independent (Nummenmaa 2024)." },
        { text: "Listen back with one hand on your chest. Rate your fluency in each key 1-5, scoring not just pitch accuracy but body confidence — did you feel grounded in each key's landscape, or were you searching? The key where your body felt most uncertain is tomorrow's priority.", why: "Self-assessment after cross-key roulette reveals gaps in BOTH ear training and body mapping. The key where you felt least physically grounded is the one where your somatic map needs the most development — and that's a faster diagnostic than pitch accuracy alone." }
      ],
      feel: "This should feel like a cognitive workout — demanding, slightly chaotic, but exhilarating when you nail a jump in an unfamiliar key. The chaos is the learning.",
      wrong: "If you freeze at every key switch, simplify: do 1-minute rounds instead of 2. Or limit each key to just 3 notes (root, 3rd, 5th) instead of the full pentatonic. Reduce variables until the switching feels manageable.",
      sarah: "Gene, three-key jump roulette is the exercise that makes everything else in this curriculum possible. When your ear can navigate random intervals in three different keys, you can sing over ANY chord progression in ANY key. This is musicianship.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-5-19",
      time: 8,
      title: "Cross-Key Emotional Arcs",
      type: "vocal",
      what: "The capstone of all jump training: build emotional arcs that CROSS keys. Start in Am (dark, intimate jumps using F and B). Shift to A major (bright, warm jumps using C# and F#). End in E major (electric, expansive jumps using Ab and C#). The emotional journey moves from shadow to light — and the keys carry the emotion through interval color alone.",
      setup: "Guitar. Metronome at 75 BPM.",
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "2 min — Am darkness: strum Am, use only dark/tense jumps. A→F (bittersweet), B→F (diminished tension), E→F (heavy half step). Small intervals, low register, heavy vowels. Build a mood of introspection.", why: "Starting in Am with dark intervals establishes the emotional floor. The shadow is where the journey begins — every sunrise needs a night before it." },
        { text: "2 min — A major warmth: switch to A strum. Same root, brighter intervals. A→C# (major brightness), A→F# (warm 6th), C#→E (gentle step). The same 'A' home note but the world around it has changed from shadow to sun.", why: "The Am → A major switch is the most powerful key change in music. Same home, different mood. Feeling this through JUMPS makes the contrast physical, not just theoretical." },
        { text: "2 min — E major electricity: switch to E strum. E→Ab (bright 3rd), E→C# (soaring 6th), F#→B (open 4th). Wider intervals, higher energy, surf-rock brightness. This is the emotional peak.", why: "E major is the most distant key from Am in this curriculum. Arriving here after Am → A major feels like a journey from midnight to noon. The intervals carry the emotional altitude." },
        { text: "Record the full 6-minute arc. Listen back as one continuous piece. Can you hear the emotional journey? Dark → warm → electric? The keys and intervals did that — no lyrics, no chords changes, just jumping with intent.", why: "A cross-key emotional arc built from intervals alone is composition at its most elemental. If the recording FEELS like a journey, you understand how melody communicates emotion across keys." }
      ],
      feel: "The three sections should feel like three different emotional landscapes connected by a thread — your voice. Am is the cave. A major is the meadow. E major is the mountaintop. Notice how your body shifts with each key: Am sits deeper in the chest with closed vowels, A major opens the throat and lifts the soft palate, E major floats the resonance forward toward the mask. The hear-feel-choose cycle runs continuously through each transition — you choose the emotional territory, feel where it lives, hear the intervals that belong there, and produce them. The journey between landscapes is the music.",
      wrong: "If all three sections sound the same, you're not committing to the key changes. Exaggerate: in Am, go dark and quiet. In A major, brighten your vowels and add volume. In E major, go full energy. Let the key dictate the performance.",
      sarah: "Gene, this is the exercise that proves you're a musician, not just a singer. Building an emotional arc across three keys using only interval jumps — that's what composers do. When you listen back and hear the journey from dark to bright, you'll know: you have the tools to write songs that take people somewhere.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "Reference Notes", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      metronome: 75
    },

    // ─── CAPSTONE: AUDIATION + VOCAL AWARENESS ───

    {
      id: "ss-5-20",
      time: 10,
      title: "Silent Singing & Body Awareness",
      type: "vocal",
      what: "The capstone exercise that ties together every skill from this level: audiation (hearing notes before singing), vocal production awareness (breath, resonance, register navigation), and emotional embodiment. You'll sing silently, then aloud, then assess — building the internal hearing that makes everything else work. Gordon's audiation research shows this is the single skill that separates musical thinkers from musical guessers.",
      setup: "Guitar. Drone on A. No metronome — this exercise is about internal rhythm, not external.",
      steps: [
        { text: "Silent scale: hear the full A natural minor scale in your head WITHOUT singing. A-B-C-D-E-F-G-A. Can you hear each note distinctly? Can you hear the half steps (B-C, E-F) tighten? If any note is fuzzy, play it on guitar, listen, then try the silent scale again. This is pure audiation. The silence IS the exercise — your brain is performing, just without sound.", why: "Gordon's Music Learning Theory (Stage 6) places audiation — the ability to hear music internally — as the foundational skill beneath all others. Pre-hearing activates auditory cortex BEFORE motor cortex. A singer who can audiate accurately before producing sound will always be more in tune, more expressive, and more confident than one who can't." },
        { text: "Silent jump: hear A in your head. Now hear F (minor 6th — bittersweet). Can you feel the emotional character of the jump WITHOUT singing? Now audiate A→C# (major 3rd — bright). Different feeling, same silence. The emotion exists in your imagination before it exists in sound.", why: "Audiating intervals (not just individual notes) is the advanced form of mental hearing. Aarhus University (2021) found that combined imagery + singing produces equal learning in one-third the time of singing alone. When you can feel the emotional quality of a jump in your mind's ear, you can compose melodies internally — which is how professional songwriters work." },
        { text: "Now sing: audiate A-F internally, then produce it. Audiate A-C# internally, then produce it. Compare: did the sung version match what you heard internally? Play nothing you didn't hear first. If the sung version was higher or lower than what you imagined, your internal reference needs calibration — play the notes on guitar and re-audiate.", why: "The gap between what you audiate and what you produce is your calibration error. CLA research (Gray 2018) shows that constraining output — refusing to produce until you've heard it internally — forces the auditory-cognitive system to lead. Closing this gap is the entire goal of ear training." },
        { text: "Body scan: sing a low note (A3). Notice where you feel the vibration before the note fully emerges — chest, throat, belly? Now sing a high note (G4). Where does that live — head, sinuses, behind the eyes? Now jump A3→G4 and feel the resonance SHIFT. Your passaggio (around A3-B3) is the transition zone where chest resonance hands off to head resonance. Both registers are you. The shift is natural.", why: "Vocal production awareness means knowing WHERE in your body each note lives. Zamorano (2025) found that interoception — feeling your body's internal signals — is trainable and predicts musical competence. Chest voice (below passaggio) resonates in the ribcage. Head voice (above) resonates in the sinuses and skull. The passaggio zone is where they overlap. Understanding this physically prevents strain and enables the full range." },
        { text: "Integrated practice: audiate a random jump (pick two notes in your head). Feel where each note will resonate in your body — notice the vibration preparing before the note emerges. Take a belly breath. Now produce the jump. Mid-pass check: are you still hearing each note before it arrives, or has autopilot kicked in? If autopilot kicked in — good, you noticed. That moment of catching yourself is the most productive moment in the exercise. Rate yourself: (1) Did the pitch match your audiation? (2) Did the resonance feel smooth or strained? (3) Did the emotional intent come through? Repeat 10 times. Record the last 5.", why: "Integrating audiation + body awareness + emotional intent in a single moment is the capstone skill. Professional singers do this unconsciously — they hear the note, feel where it goes, breathe, and produce with emotional intent, all in a fraction of a second. This exercise makes the process conscious so it can become unconscious with practice." },
        { text: "Self-assessment protocol: listen to the 5 recorded jumps. For each, score 1-5 on three criteria: PITCH ACCURACY (did you land on the note or slide into it?), RESONANCE QUALITY (did the voice sound open and supported or tight and strained?), EMOTIONAL CLARITY (could a listener feel the intended emotion?). Write down the three scores for each jump. Your weakest criterion is your next practice priority.", why: "Structured self-assessment with specific, measurable criteria is what transforms practice from repetition into deliberate improvement. The three criteria (pitch, resonance, emotion) map to the three pillars of vocal mastery: ear training, technique, and expression." }
      ],
      feel: "This should feel meditative and deeply internal. The silence is as important as the sound. Your prediction model now covers 7 notes, intervals, body locations, and emotional colors — it has dramatically more resolution than when you started. When you can hear music in your imagination as vividly as you hear it in your ears, you've developed the singer's most powerful tool — one that works in every key, every genre, every moment.",
      wrong: "If you can't hear notes internally at all, that's normal for beginners — audiation is a skill that develops gradually. Your prediction model is still being built, and it needs input before it can generate. Start by playing a note on guitar, then immediately trying to recall it silently. The memory fades quickly at first but strengthens with practice — each rep sharpens the prediction. Don't skip this exercise because it feels 'too mental' — the mental work is the foundation of everything physical.",
      sarah: "Gene, this is the exercise that ties every thread together into one unified act. Hearing before singing. Feeling where notes live in your body. Choosing what they express. Producing them. Comparing what came out to what you intended. These aren't five separate skills — they're ONE cycle: hear it, feel it, choose it, sing it, compare. A master singer runs all five simultaneously, automatically. Right now you're making it conscious so it can become unconscious. End-of-exercise retrieval: set everything down for 60 seconds. Close your eyes. Then audiate and sing one jump from each key (Am, E major, A major) from memory — no peeking at the steps. Whatever you remember IS what you've internalized. What you forget tells you what to revisit next session.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      levelUp: "Can walk stepwise through all 7 notes of A natural minor, improvise freely across pentatonic and diatonic scales, sing tension notes B and F with emotional intent, hold seven-note conversations with tension-resolution dynamics, lock into genre grooves with passaggio awareness and breath support, jump between all 21 note pairs in Am from any starting point, nail half-step precision on B↔C and E↔F, audiate notes and intervals silently before producing them, navigate register transitions across the passaggio smoothly, improvise angular leaps-only melodies, navigate random interval jumps by ear, choose jumps by emotional color, assess pitch accuracy and resonance quality through structured self-evaluation, jump systematically in E major and A major pentatonics, navigate random cross-key interval roulette, build emotional arcs through key-crossing interval journeys, switch between minor and major palettes, and compare musical identity across three key centers — all while the guitar strum stays on autopilot."
    },

    // ─── AUDIATION ENRICHMENT ───

    {
      id: "ss-5-21",
      time: 3,
      title: "Generation Check — Pentatonic from Silence",
      type: "vocal",
      what: "The audiation capstone for Level 5: from complete silence, with no external reference, can you generate the Am pentatonic? This tests whether the five-note scale has been internalized deeply enough to produce from pure body memory.",
      setup: "Pitch Detector on. No drone. No guitar. Complete silence. Voice check: for notes above the passaggio, narrow the vowel (ah → uh). Less air, not more.",
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      steps: [
        { text: "Complete silence. Close your eyes. No drone, no guitar. Reach for A inside you — find home in your chest. When it's vivid, sing it. Check. Then from silence again, reach for C — feel the throat, the ache. Sing. Check. Then D, E, G — each from silence, each found by its body address first. How many of the five notes can you find?", why: "Single-note generation from silence across all five pentatonic notes tests whether each note has been internalized as a body-address + pitch-frequency pair. The notes you find easily reveal which body addresses are strongest; the ones you struggle with need more drone-based practice." },
        { text: "Now the full scale: from silence, sing A-C-D-E-G ascending as a continuous phrase. Let each note's body address guide you upward — chest to throat to bridge to mask to forehead. The body map IS your scale. Then descend: G-E-D-C-A. Feel the vibration settle back down.", why: "Multi-note generation from silence is significantly harder than individual notes — you're maintaining pitch relationships across a five-note phrase. If the intervals drift, that's diagnostic information: which step is the weakest link in your internalized scale?" },
        { text: "The ultimate test: sing the pentatonic in a DIFFERENT key from silence. Reach for E (not A) as your starting note. From E, sing a pentatonic ascending (E-G-A-B-D). If you can generate a pentatonic from a different root without external reference, your audiation has become abstract — you've internalized the PATTERN, not just specific frequencies.", why: "Key-independent generation from silence proves that your audiation has abstracted beyond specific notes to scale-degree relationships. This is the transition from 'I can sing A' to 'I can sing Do in any key' — the functional ear training that Gordon's framework identifies as the foundation of musical fluency." }
      ],
      feel: "This should feel like proving to yourself that the music lives inside you — not in the guitar, not in the drone, but in your body's memory of five notes and their relationships.",
      wrong: "If you can't find any notes from silence, go back to the drone-based exercises. This is a checkpoint, not a gate — wherever you are is information, not judgment.",
      sarah: "Gene, if you can sing even three of the five pentatonic notes from pure silence, your inner ear has come a remarkable distance. The pentatonic is the scale of everything you love — reggae, surf, desert blues. Carrying it inside you, available without any external reference, means it's truly yours."
    },
    {
      id: "ss-5-22",
      time: 5,
      title: "Silent Run-Through — Mental Rehearsal",
      type: "listen",
      what: "Pick any exercise from Level 3 or 4. Don't play it — IMAGINE it. Run the entire exercise in your mind: hear every note, feel every body location, sense every emotional shift. No guitar, no singing. Pure mental rehearsal. Research shows this activates nearly the same neural pathways as actual practice.",
      setup: "Nothing. Sit comfortably. Eyes closed. Pick an exercise from L3 or L4 you've completed.",
      steps: [
        { text: "Choose an exercise from Level 3 or 4 that you know well — one you've done at least twice. Read through its steps to refresh your memory. Now set down everything. Close your eyes.", why: "Mental rehearsal works best on material you've already practiced physically — the neural pathways exist and you're strengthening them through imagination." },
        { text: "Run the entire exercise in your imagination. Hear every note as vividly as you can — the specific pitches, the drone underneath, the rhythm. Feel every body location — the chest warmth of A, the throat ache of C, the mask brightness of E. Sense every emotional shift — the grounding of home, the yearning of tension, the release of resolution. Don't sing. Don't touch the guitar. Just LIVE the exercise silently, at real tempo.", why: "Aarhus University 2021 found that imagined singing activates nearly the same neural real estate as actual singing. The auditory cortex, motor cortex, and somatosensory regions all fire during vivid musical imagery. Silent rehearsal is not a lesser form of practice — it IS practice, and it takes approximately one-third the time of physical practice to produce equivalent learning gains." },
        { text: "When you finish, rate the vividness of your experience on a scale of 1-5. 1 = couldn't hold any notes internally. 3 = heard some notes, lost others. 5 = the entire exercise played in your head as vividly as if you were doing it. Your rating IS your audiation development score.", why: "Self-assessment of imagery vividness is the best available measure of audiation strength. The gap between what you can do physically and what you can imagine is your audiation gap — and it closes with practice." },
        { text: "If your rating was below 3: do the exercise aloud immediately, then try the silent version again. The physical practice refreshes the neural representation, making the mental version more vivid. Compare your two ratings.", why: "Physical-then-mental sequencing is the most efficient way to build audiation. The physical practice lays down the neural trace; the mental practice strengthens it without the fatigue or time cost of additional physical reps." }
      ],
      feel: "This should feel deeply meditative — like dreaming music with your eyes closed. The silence of the room should contrast with the richness of the internal experience.",
      wrong: "If you catch yourself humming or moving your fingers, that's your motor system trying to help — gently stop it. The exercise is purely internal. If you can't hold ANY musical content internally, that's not failure — it means more physical practice is needed before mental rehearsal becomes effective.",
      sarah: "Gene, this is practice you can do anywhere — in the car, in bed before sleep, waiting in line. The internal rehearsal makes the physical practice more efficient when you pick up the guitar again. Musicians who do mental rehearsal alongside physical practice improve faster than those who only practice physically."
    },
    {
      id: "ss-5-23",
      time: 6,
      title: "Groove Seed and Silence — Hold the Music Inside",
      type: "vocal",
      what: "The backing track plays a familiar groove. Then it fades to silence. Can you keep the music alive inside you — not just the tempo, but the FEEL, the harmonic color, the rhythmic character — and stay in the pocket through the silence? This is audiation applied to a complete musical context, not just isolated notes.",
      setup: "Backing track. Guitar optional. Metronome off (the groove IS the time). Voice check: land from above on every note — imagine stepping DOWN onto a shelf, never reaching up.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true,
      steps: [
        { text: "Choose a backing track you know well — one you've improvised over before. Play it and strum along for 1 minute. Sink into the groove. Feel the whole package: the tempo, the rhythmic feel, the harmonic color (minor? major? modal?), the energy level. Let it saturate.", why: "Familiarity is the key. The earworm mechanism works because your brain has encoded this groove through repeated exposure. The more deeply the groove lives in your body, the more vividly you can hold it in silence." },
        { text: "Rung 1: Track plays for 8 bars. Pause it. Strum and sing through 4 bars of silence — not just keeping time, but maintaining the FEEL of the groove. The Khruangbin shuffle, the desert blues swing, the reggae lilt. Resume the track. Are you still in the pocket — same tempo, same feel?", why: "Holding a groove in silence is harder than holding a tempo because a groove has swing, emphasis, and emotional color beyond bare pulse. This is the rhythm equivalent of holding a triad vs. a single note — more musical information to maintain internally. J. Neuroscience 2021 ('Music of Silence') showed that the auditory cortex activates during silent gaps in familiar music — the brain continues playing the song internally." },
        { text: "Rung 2: Track plays 4 bars, silence for 8 bars. Now you're in silence longer than you had reference. Keep strumming, keep singing through the silence. Let the groove live in your foot, your strum hand, your voice. Resume. Still there?", why: "Longer silence forces genuine internal generation. Echoic groove memory fades — now your body must sustain the feel through active motor imagery. The foot tap and strum hand are your somatic anchors, just as hand-on-chest anchored pitch holds." },
        { text: "Rung 3: Track plays 2 bars, silence for 8 bars. Minimal seed, maximum internal holding. The 2-bar seed gives you just enough to lock in — then you're on your own.", why: "Minimal seed, maximum audiation. With only 2 bars of reference, your internal representation of the groove must be strong enough to sustain 4x the input length." },
        { text: "The groove switch: play Desert Blues for 4 bars, then silence for 4 bars. Immediately switch to Reggae One Drop for 4 bars, then silence for 4 bars. Can you hold TWO different grooves in silence, switching between them? The feel, tempo, and energy are completely different.", why: "Switching grooves tests whether your audiation is flexible or locked to one feel. Real performance demands shifting between feels (verse groove vs. chorus groove, song transitions). If you can hold different grooves through silence, your internal rhythmic library is growing." },
        { text: "Free exploration: pick any backing track. Let it play for 2 bars, then sing over silence for as long as you can — improvising melody and rhythm while holding the groove internally. When you feel the groove fading, restart the track to recalibrate. How many bars can you sustain before needing the reference back?", why: "This is the capstone: generating both melody AND groove simultaneously from internal hearing, with only a brief external seed. The number of bars you can sustain is your groove audiation endurance — it will grow with practice." }
      ],
      feel: "The silence should feel like the music went underwater — muffled but still alive, held in your body. When the track returns and you're right in the pocket, the satisfaction is deep: the groove never stopped inside you.",
      wrong: "If you consistently lose the feel (not just the tempo) during silence, your groove absorption isn't deep enough yet. Spend more time listening to each backing track in focused attention before attempting seed-and-silence. The groove must be an earworm before it can be an audiation seed.",
      sarah: "Gene, this is how every great musician holds the music even in silence — Khruangbin's band doesn't just keep time, they keep the VIBE alive through every pause and transition. You're building the same skill. The backing tracks you've been practicing over for weeks are your grooves now. They live in your body. This exercise proves it."
    },
    {
      id: "ss-5-24",
      time: 4,
      title: "Predict and Check — Training Your Inner Judge",
      type: "vocal",
      what: "Sing a note or phrase. Before checking with the pitch detector, PREDICT: were you sharp, flat, or on? Then check. You're training your self-assessment — the internal feedback channel that will eventually replace external verification.",
      setup: "Drone on A. Pitch detector on but FACE DOWN or minimized — don't look at it while singing. Voice check: barrel breath — ribs expanded sideways. Wide jumps need stable air support.",
      drone: { root: "Am", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      steps: [
        { text: "Drone on. Sing each note of the Am pentatonic (A-C-D-E-G) one at a time. After EACH note, before looking at the pitch detector, commit to your prediction: sharp, flat, or on? Say it out loud: 'I think I was slightly flat.' THEN check. Score yourself: how many predictions were correct out of 5?", why: "The prediction step is the entire exercise. When you predict before checking, you force your brain to engage its internal monitoring system — the same proprioceptive awareness (body sensation, bone conduction, laryngeal feedback) that professional singers rely on. Research on motor learning shows that self-controlled feedback (predicting before checking) produces better long-term retention than constant external feedback (Hebert & Coker 2021)." },
        { text: "Sing a 4-note pentatonic phrase over the drone. After the phrase, predict TWO things: (1) overall pitch accuracy (sharp/flat/on) and (2) which note in the phrase felt least secure. Then check with the pitch detector or listen back. Was your prediction right?", why: "Phrase-level self-assessment is harder than note-level because you're evaluating a sequence, not an isolated event. Identifying the WEAKEST note in the phrase builds diagnostic self-awareness — knowing where your audiation is strong and where it needs reinforcement." },
        { text: "Extended predict-and-check: sing for 30 seconds of free pentatonic improvisation. When you stop, rate your overall pitch accuracy 1-5 without checking. Then listen to the recording. Was your self-rating accurate? Most beginners overestimate their accuracy by 1-2 points. Calibrating this gap IS the exercise.", why: "The gap between self-assessment and reality is your 'metacognitive error' — and closing it is what makes external feedback unnecessary over time. Bottalico et al. (2016) found that when external feedback was removed, singers with trained self-assessment maintained accuracy while those dependent on external feedback degraded." },
        { text: "Try 3 notes completely without pitch detector: drone on, eyes closed, sing A, C, E. After all three, rate each one (sharp/flat/on) from memory. Then turn on the detector and check. This is the first step toward 'Ears Only' practice — trusting your internal hearing without any external confirmation.", why: "Full-cycle prediction without any external reference during singing is the bridge to feedback independence. You're building the habit of monitoring internally WHILE singing, not just checking externally after." }
      ],
      feel: "This should feel like learning to trust yourself. At first, your predictions will be wrong — that's normal and valuable. Each wrong prediction recalibrates your internal monitor. Over time, your predictions get sharper until you barely need the external check.",
      wrong: "If your predictions are randomly wrong (not consistently sharp or flat), your internal monitoring may be underdeveloped. Spend more time with the drone-based exercises where you can FEEL the match between voice and reference. The body address (chest warmth for A, throat for C, etc.) is your most reliable internal cue for pitch accuracy.",
      sarah: "Gene, this is where you start trusting your own ears over the machine. The pitch detector was your training wheels — essential early on, but eventually you need to ride without them. Every prediction you make, right or wrong, strengthens your internal judge. By Level 6, you should need the detector less. By Level 8, it's a spot-check, not a crutch."
    },

    // ─── COLOR MUSIC: VOICE + MELODY ECHO ───

    {
      id: "ss-5-25",
      time: 5,
      title: "Voice Color Painting",
      type: "vocal",
      what: "Sing up the Am pentatonic slowly. Watch the rainbow sequence unfold on the color fretboard: amber(A) \u2192 red(C) \u2192 orange(D) \u2192 yellow(E) \u2192 red-orange(G).",
      colorMusic: { root: "A", scale: "minor-pentatonic", mode: "voice" },
      drone: { root: "Am", octave: 2, texture: "pure" },
      steps: [
        { text: "Open Color Music, Voice mode. Enable mic. Drone on. Sing A, then slowly slide up to C.", why: "Your voice paints the fretboard in real time. The color change from amber to red IS the sound of a minor third." },
        { text: "Continue up: D (orange), E (yellow), G (red-orange). Watch the color wheel light up in sequence.", why: "You're seeing the pentatonic scale as a color sequence. This visual pattern reinforces the auditory pattern." },
        { text: "Now descend. Then skip notes \u2014 sing A, then jump to E. Watch the colors jump on the wheel.", why: "Skips create larger color jumps on the wheel. You're seeing interval distance as color distance." },
        { text: "Try singing a short melody. Watch the colors trace your melodic contour on the fretboard.", why: "When you can SEE your melody on the guitar, the bridge between voice and instrument is complete." }
      ],
      feel: "Your voice paints the color wheel. Now try it descending. Skip notes. Follow adjacent colors for smooth motion. YOU are choosing where the melody goes.",
      sarah: "Gene, this is where voice and guitar become one instrument. The colors prove that your voice already knows where the notes live \u2014 you just need to see it."
    },
    {
      id: "ss-5-26",
      time: 5,
      title: "Melody Echo: Hear \u2192 Hold \u2192 Sing",
      type: "vocal",
      what: "The Color Music trainer plays 3-note melodic phrases. Sing them back. The pitch detector verifies each note. This is the core audiation loop.",
      colorMusic: { root: "A", scale: "minor-pentatonic", mode: "melodyEcho" },
      drone: { root: "Am", octave: 2, texture: "pure" },
      steps: [
        { text: "Open Color Music, Melody Echo mode. Enable mic. Tap 'New Melody'.", why: "The trainer generates musical phrases (stepwise motion, pentatonic patterns) \u2014 not random notes." },
        { text: "Listen to the 3-note phrase. Don't sing yet \u2014 hold it internally first.", why: "The pause between hearing and singing IS the audiation. Rushing to echo skips the internal hearing step." },
        { text: "Now sing it back. The pitch detector captures each note. Green borders = match, coral = miss.", why: "Visual feedback on each note lets you identify exactly WHERE your audiation broke down." },
        { text: "Aim for 3 perfect echoes in a row. Then try 4-note phrases.", why: "Every echo adds a phrase to your internal melody library. Improvisation draws from this library." }
      ],
      feel: "Hear it. Hold it. Reproduce it. Every time you echo a melody, you're building the internal library that improvisation draws from.",
      sarah: "Gene, this is the core audiation loop \u2014 the same process that happens in a fraction of a second when you improvise. We're just slowing it down so you can practice each step."
    }
  ]
};
