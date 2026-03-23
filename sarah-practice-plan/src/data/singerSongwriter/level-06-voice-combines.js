import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Voice Combines",
  subtitle: "Two skills at once. This is where it starts to feel like music.",
  description:
    "Levels 3-4 isolated each skill individually. Now combine them in pairs: rhythm + chord changes, genre feel + dynamics, conversation + harmony, dual-task independence. Motor learning research is clear — combining two automated sub-skills is a distinct cognitive stage that must be practiced deliberately before full integration. The embodiment challenge at this level: when you combine two skills, does the hear-feel-choose cycle keep running on BOTH channels, or does one go dark? Most students lose body awareness first — they keep hearing pitch and choosing rhythm, but stop feeling where notes live in their body. The embodiment check replaces the autopilot check: not just 'am I paying attention?' but 'is the full cycle running, or has a channel gone dark?'",
  artists: "Khruangbin, Skinshape, DOPE LEMON, Allah-Las, Pepper",
  unlocks: "Voice Flows (Level 7)",
  review: { label: "Level 5 Check-In", time: 5, exercises: ["ss-5-15", "ss-5-20"], prompt: "Navigate interval jumps by emotional color (ss-5-15). Then do Silent Singing — audiate a random jump, produce it, and self-assess pitch/resonance/emotion (ss-5-20). Both confident? Move on." },
  exercises: [

    // ─── DUAL-TASK RAMP ───

    {
      id: "ss-6-1",
      time: 5,
      title: "The TV Test",
      type: "guitar",
      what: "Can you play Am-C-G-Em while watching a video with comprehension? If yes, the guitar is autonomous enough for voice work. If not, practice until it is. This is the prerequisite check from motor learning research: the 'associative-to-autonomous' transition test. Your strum should be like breathing — you don't think about it.",
      setup: "Guitar. Metronome at 80 BPM. A video or podcast playing on your phone or laptop.",
      steps: [
        { text: "Set a metronome at 80 BPM. Start strumming Am-C-G-Em with a simple quarter-note pattern. Now turn on a short video — something with dialogue you need to follow. Keep strumming.", why: "The TV Test is the gold standard for motor autonomy. If a secondary cognitive task (watching a video) disrupts the primary motor task (strumming), the strum isn't automatic yet." },
        { text: "Watch for 2 minutes. Can you follow the story? Can you answer questions about what you just watched? If yes, your chord changes have reached the autonomous stage.", why: "Comprehension proves cognitive resources are free. If you can understand dialogue while strumming, your hands are on autopilot — which means those resources are available for singing." },
        { text: "If the strum breaks down or you lose the video thread, that's useful information. Note which chord change disrupts you (usually G→Em or Em→Am) and drill that transition.", why: "The failure point reveals which transition still requires conscious attention. Targeted practice on that one change is more efficient than running the whole progression again." },
        { text: "Repeat the test daily until you pass it. This is the gateway to everything in this level. No rushing — autonomous guitar is the foundation of singing while playing.", why: "Motor learning research shows the associative-to-autonomous transition takes repetition over days, not hours. Each day's practice moves the skill deeper into procedural memory." }
      ],
      feel: "When you pass this test, the guitar should feel like it's playing itself. Your conscious mind is free — free to watch TV, free to sing, free to improvise. That freedom is the whole point.",
      wrong: "If you're faking it — staring at the video but not actually following the story — the test doesn't count. Genuine comprehension is the metric. Be honest with yourself. If this is hard, that's the place where new patterns form — your motor system is building procedural memory, and that takes days, not minutes.",
      sarah: "Gene, your strum should be like breathing — you don't think about it. This test proves whether it is. Every exercise in this level assumes you pass it. You're not learning to be a player — you already ARE one. This just confirms the depth of what your hands already know.",
      metronome: 80
    },
    {
      id: "ss-6-2",
      time: 6,
      title: "Hum + Strum",
      type: "vocal",
      what: "Strum Am-C-G-Em at 80 BPM. Hum the root of each chord as it passes (A over Am, C over C, G over G, E over Em). Humming requires almost zero vocal working memory — it's the easiest dual-task entry point. Once humming is stable over chord changes, the voice-guitar foundation is laid.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em with a simple quarter-note pattern at 80 BPM. Before you hum, hear A forming inside and feel where it lives — deep in the chest, warm and grounded. Then hum a sustained A over Am. Mouth closed, no vowel shaping. Let the hum settle into the chest where you felt it. Notice the buzz behind the sternum.", why: "Humming is the lowest-demand vocal task, which means there's bandwidth to keep the body-awareness channel open. Even in this simplest dual-task, the hear-feel-produce cycle should run: hear the note, feel its body address, produce it. If body awareness goes dark the moment you add guitar, that's the first channel to lose — and the most important to maintain (Zamorano 2025)." },
        { text: "When C arrives, shift your hum to C. Feel the vibration lift slightly — from deep chest to upper chest, warmer and brighter. Then G — the buzz rises toward the throat, open and wide. Then E over Em — the resonance settles into a contemplative middle ground. Each root has a body address, and the address shifts with each chord change.", why: "Tracking chord roots with a hum builds the voice-following-harmony reflex AND the body-following-pitch reflex simultaneously. Your body learns to shift resonance address with each chord change — this becomes automatic, a physical GPS for harmony (Nummenmaa 2024)." },
        { text: "Check two things: (1) is your strum perfectly steady through the hum changes? (2) can you still feel WHERE each note lives in your body, or did body awareness go dark when you added the dual-task? If the strum hitches, go back to ss-6-1. If body awareness vanished, slow down and reconnect — feel each root's chest address before humming it.", why: "The dual embodiment check matters more than the dual-task check. Most students lose body awareness first when skills combine — they keep hearing pitch and producing sound, but stop feeling where notes live. This is the channel that predicts accuracy (Zamorano 2025: R²=0.41)." },
        { text: "Once stable, try humming chord tones other than the root: hum E over Am (the 5th — feel it float higher, lighter than the root), hum G over C (the 5th — open, wide). Each non-root chord tone has its own body address relative to the root. 2 minutes, record.", why: "Varying the hum target while maintaining the strum AND body awareness is the triple challenge. When you can feel where each chord tone lives while the guitar plays itself, the full embodiment cycle is running through the dual-task." }
      ],
      feel: "The hum should feel effortless — like a quiet soundtrack running underneath your guitar. When both layers are relaxed and steady, you've found the dual-task sweet spot.",
      wrong: "If you're straining to hum or your strum is irregular, you're working too hard. Drop to just Am (one chord) and hum A until both are relaxed. Then add chord changes one at a time.",
      sarah: "Gene, humming is the gentlest way to introduce your voice to the guitar. No pressure, no performance — just a quiet sound layered on top of a familiar strum. Start here.",
      metronome: 80,
      recorder: true,
      referencePitches: getPitchRange("E3", "G4")
    },
    {
      id: "ss-6-3",
      time: 7,
      title: "Speak + Strum",
      type: "vocal",
      what: "Strum Am-C-G-Em. Speak a simple phrase in rhythm ('sun goes down, tide rolls in') while strumming. No pitch — just rhythmic speech over chord changes. This is Berklee's 'rhythmic anchor method': introduce the rhythmic coordination layer without pitch demands on the voice.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am-C-G-Em at 80 BPM. Speak a simple phrase in rhythm: 'sun goes down, tide rolls in.' Place 'sun' on beat 1, 'goes' on beat 2, 'down' on beat 3. The words have rhythm but no melody.", why: "Rhythmic speech adds the coordination layer (voice rhythm vs guitar rhythm) without the pitch layer. It's the Berklee approach: isolate one variable at a time." },
        { text: "Try different phrases: 'waves are rolling, sky turns gold' or 'walking down the shore again.' Each phrase has its own natural rhythm. Let the words find their place in the strum.", why: "Different phrases have different rhythmic shapes. Practicing with varied phrases builds flexible speech-over-strum coordination, not just one memorized pattern." },
        { text: "Now speak on the offbeats — between the strums. 'And-sun-and-goes-and-down.' The words land in the gaps. This is harder because speech and strum are rhythmically independent.", why: "Offbeat speech is the precursor to syncopated singing. When your voice can land between strums consistently, you've built the independence that melodic singing requires." },
        { text: "Free-form: speak any words, any rhythm, over the chord changes. Have a conversation with someone while strumming. If you can talk naturally while playing, the strum is truly autonomous. Record 2 minutes.", why: "Natural speech over strumming is the ultimate autonomy test for this stage. If you can hold a real conversation while playing Am-C-G-Em, your hands are completely free from conscious control." }
      ],
      feel: "This should feel like talking while driving — your hands do their thing automatically while your voice is free. If it feels like juggling, the strum needs more autonomy work.",
      wrong: "If you're speaking in a monotone robot voice to avoid disrupting the strum, that's a sign the dual-task is still taxing. Speak naturally — inflection, emphasis, pauses. The strum must survive real speech.",
      sarah: "Gene, this is the bridge between the TV Test and actual singing. Your voice is active, your hands are strumming, but there's no pitch pressure yet. One step at a time.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-6-4",
      time: 7,
      title: "Sustained Note + Changing Chords",
      type: "vocal",
      what: "Strum Am-C-G-Em. Hold ONE note (E — it works over all 4 chords as a common tone) while the chords change underneath. The voice stays perfectly still; only the hands move. This isolates harmonic independence: hearing the chord context shift around a static voice.",
      setup: "Guitar. Metronome at 80 BPM. Drone on E for pitch reference.",
      steps: [
        { text: "Strum Am-C-G-Em at 80 BPM. Sing and sustain the note E through all four chords. Don't move your voice at all. Feel E's body address — it sits in the upper chest, open and light. Hold that physical sensation perfectly still while the chords rotate beneath you.", why: "E is a common tone across the progression: it's the 5th of Am, the 3rd of C, the 6th of G, and the root of Em. Your body stays in one place while the harmonic meaning shifts — the same body address, four different emotional contexts." },
        { text: "Listen AND feel how E changes character over each chord. Over Am it feels stable and open in the chest. Over C it warms — the same body address now carries sweetness (major 3rd). Over G it floats, untethered. Over Em it's home — the vibration settles into groundedness. Same body address, same pitch, four feelings. The emotional shift comes from the harmony, not from you.", why: "This is the core lesson of harmonic context AND embodied listening: a note's emotional meaning changes with the chord underneath, but its body address stays constant. Learning to feel the emotional rotation while holding the body still is how professional singers navigate changing harmony — the body is the anchor while the feeling turns (Nummenmaa 2024)." },
        { text: "Now try holding A instead of E. A sits deeper — behind the sternum, warm and grounded. Notice how the BODY address is different from E's. And the harmonic journey is different: A is home over Am (consonant, settled), but creates tension over G and Em — feel the vibration become restless, the body wanting to shift even though you hold still.", why: "Different sustained notes create different body addresses AND different tension profiles across the progression. A lives deeper in the chest than E. The harmonic tension you hear over G is mirrored by a physical restlessness — the body senses the dissonance somatically." },
        { text: "Alternate: hold E for one full cycle (feel its upper-chest openness), then hold A for one full cycle (feel its deeper chest grounding), then hold G for one full cycle (feel its throat-level brightness). Each sustained note paints the progression in a different body-color. Record all three.", why: "Three body addresses, three emotional palettes, same chord progression. This is harmonic ear training and body mapping fused — your understanding of how notes interact with chords becomes physical, not just theoretical (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." }
      ],
      feel: "Your voice should feel like a still point in a turning world. The chords move, the harmony shifts, but your note is an anchor. The changing feelings come FROM the chords, not from your voice.",
      wrong: "If you're unconsciously adjusting your pitch when the chords change, that's your ear trying to 'fix' the harmony. Resist. Hold the note perfectly steady — the drone will help you stay locked.",
      sarah: "Gene, this exercise is sneaky powerful. By holding still while the chords move, you're training your ear to hear how harmony WORKS — how the same note means different things in different contexts. This is the foundation of writing melodies that interact with chords.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      drone: { root: "Em", octave: 2, texture: "pure" },
      recorder: true
    },

    // ─── DUAL-TASK FOUNDATION ───

    {
      id: "ss-6-5",
      time: 8,
      title: "Simultaneous Voice & Strum",
      type: "vocal",
      what: "Combines: STRUM INDEPENDENCE + PITCH. Unlike call-and-response where you alternate, now sing AND strum at the same time — with your voice doing something different from your guitar rhythm. Two independent musical streams from one person.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am with a steady quarter-note downstroke. Before you sing, hear A forming inside and feel its chest address — the warm depth behind the sternum. Then sing a long, sustained A. Hold both the note and the body sensation while your hand keeps the rhythm. Two streams: hands in motion, voice and body in stillness.", why: "The simplest dual-task with embodiment: sustained voice + steady strum + body awareness. If the strum wobbles, go back to ss-6-1. If body awareness vanishes when you add strum, that's the channel to protect — it's the one most students lose first when combining skills." },
        { text: "Keep strumming. Now move between chord tones: A (deep chest)... hold... C (upper chest, darker)... hold... E (lighter, floating higher). As each note changes, feel the vibration migrate between body stations. The strum must NOT react when your voice shifts address — complete independence between hands and body-voice.", why: "When the voice changes pitch AND body address, the brain wants the hands to react. Training independence means the strum stays perfectly steady while the vibration travels through your torso. This triple independence (hands + pitch + body awareness) is the full dual-task with embodiment running." },
        { text: "Now try vocal rhythms that differ from the strum. Strum quarter notes but sing half notes — each sustained note has time to settle into its body address. Then strum quarter notes but sing syncopated patterns — the body addresses flash by faster. Can you still feel where each note lives when the rhythm speeds up?", why: "Rhythmic independence is the core dual-task. Adding body-awareness at speed is the embodiment challenge: when notes come quickly, the body barely has time to register each address. Training this builds the speed at which your somatic GPS operates." },
        { text: "2-minute free improv: strum autopilot, voice improvises chord tones in any rhythm. Run the hear-feel-choose cycle continuously — hear each note before it arrives, feel where it wants to land, choose its emotional quality, produce it. Record it. The embodiment cycle must keep running even when your hands are busy.", why: "This is the embodied dual-task payoff. When the hear-feel-choose-produce cycle runs continuously while the guitar plays itself, you've crossed the coordination threshold. Your body navigates pitch and expression while your hands maintain an independent groove (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." }
      ],
      feel: "This should feel like patting your head and rubbing your stomach — initially awkward, then suddenly natural. The 'click' moment when both streams lock in independently is unmistakable. Embodiment check: when voice and guitar are both running, can you still feel WHERE each note lives in your body — the warmth in the chest for A, the shift toward the mask for E? If the body-awareness channel went dark the moment you started juggling, pause and reconnect. The full cycle — hear it, feel it, choose it, sing it — must keep running even when your hands are busy.",
      wrong: "If the strum simplifies or stops when you start singing something rhythmically complex, the dual-task is overloading your working memory. Simplify the vocal line until the strum stays rock-solid, then gradually add complexity.",
      sarah: "Gene, this is THE skill. Every song you love — DOPE LEMON, Skinshape, Babe Rainbow — is someone doing this: independent voice and guitar, simultaneously, making it look effortless. When your voice enters, match the guitar's rhythmic pocket. If the guitar is behind the beat (like your reggae and surf exercises), your voice needs to be behind the beat too. Not just 'relaxed' — deliberately late. This is the behind-the-beat vocal delivery you explored in Vocal Level 4 (v4e3). Angus Stone and Laura Lee both do this: voice and guitar in the same lazy pocket, arriving together just after the click.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── RHYTHM + CHORD CHANGES ───

    {
      id: "ss-6-6",
      time: 8,
      title: "Two-Chord Deep Dive",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "Am", "C", "C"], bpm: 80, stepDuration: "1m" },
      what: "Combines: CHORD CHANGES + SHARED TONES. Strum just two chords — Am and C — and freely improvise. Focus on the transition: which notes carry over (C and E appear in both), which ones shift (A is unique to Am, G is unique to C)? Two chords is simpler than four, letting you zoom in on the harmonic connection.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats), repeat.",
      steps: [
        { text: "Strum Am for 4 beats, then C for 4 beats. Sing chord tones freely. Notice that C and E are shared — you can hold either note across the chord change and FEEL the body address stay constant while the emotional meaning rotates beneath you. The vibration doesn't move, but what it expresses shifts.", why: "Shared tones are melodic bridges that reveal the embodiment paradox: same body address, same pitch, different feeling. Holding a shared tone across a chord change while tracking the emotional shift builds the kind of harmonic body awareness that makes voice-leading instinctive." },
        { text: "Sing C sustained over both Am and C. Over Am, C sits in the throat with a darkening, a minor-3rd ache. Over C, the same body address brightens — C becomes the root, grounded and warm. Feel the emotional color shift while your body stays still. This is harmonic context felt somatically.", why: "Hearing AND feeling how context changes a note's quality is the deepest form of harmonic ear training. The body registers the shift: same throat address, but the quality changes from ache (minor 3rd) to warmth (root). Nummenmaa 2024 found these body-emotion maps are cross-culturally universal." },
        { text: "Now sing the notes that change: A appears in Am but not C — feel A's deep chest address disappear when C arrives. G appears in C but not Am — feel G's throat-brightness arrive fresh. These unique tones announce each chord through their body addresses as much as through their pitch.", why: "Unique tones give each chord its somatic identity. When A's chest-depth vanishes at the chord change, your body registers the harmonic shift before your theory knowledge catches up." },
        { text: "Free improv over Am-C for 3 minutes. Mix shared tones (body stays still, feeling rotates) and unique tones (body shifts to new addresses). Let the hear-feel-choose cycle guide you — reach for body sensations, not note names.", why: "Two-chord improv with body awareness builds the somatic GPS for harmony. When you navigate by feeling rather than by calculation, the improvisation sounds more natural and more musical (Zamorano 2025)." }
      ],
      feel: "The two-chord loop should feel like breathing — Am is the inhale (tension), C is the exhale (release). Your voice follows this emotional ebb and flow.",
      wrong: "If you're ignoring the chord changes and singing the same thing over both chords, you're not hearing the harmony. Stop and listen to the chords first. Sing the root of each chord as it passes to reset your ear.",
      sarah: "Gene, Am to C is the most common two-chord motion in your genres — it's everywhere in reggae, surf, and soul. Getting your voice to navigate this change fluently is foundational.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      recorder: true
    },

    // ─── THREE-CHORD BRIDGE ───

    {
      id: "ss-6-7",
      time: 8,
      title: "Three-Chord Bridge",
      type: "vocal",
      drone: { mode: "cycle", preset: "surf-garage" },
      what: "Combines: CHORD CHANGES + SHARED TONES over three chords. Am-C-G (no Em yet). Freely improvise with chord tones across three chords. Focus on the G arrival — the brightest chord in the sequence. Shared tones bridge Am↔C (C and E), and C↔G (G).",
      setup: "Guitar. Metronome at 90 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Am (4 beats).",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Am. Sing chord tones for each: Am(A-C-E), C(C-E-G), G(G-B-D). When G arrives, feel the resonance brighten and lift toward the throat — it's the lightest chord, the moment of arrival in the body.", why: "Three chords is the sweet spot between two-chord simplicity and four-chord complexity. The G chord adds a new color (B and D) that changes the harmonic landscape." },
        { text: "Focus on shared tones as bridges: hold E across Am→C (it's in both) — feel how the same body address carries different emotional meaning under each chord. Hold G across C→G. These shared tones keep the body still while the harmony rotates beneath you.", why: "Voice leading through shared tones is how professional singers create seamless melodies over chord changes. The voice doesn't jump — it glides." },
        { text: "Now emphasize the unique tones: A is unique to Am (deep chest), B and D are unique to G (throat-brightness). When G arrives, reach for B or D — feel the resonance shift to body addresses that only this chord unlocks.", why: "Unique tones make chord changes audible in the melody. When your voice highlights what's new about each chord, the listener hears the harmony through your singing." },
        { text: "3-minute freestyle over Am-C-G. Let the surf-rock energy carry you. Bright, forward, riding the three-chord wave. Record it.", why: "Three-chord improv over a surf backing builds confidence for the full four-chord progressions coming next. This is Allah-Las, Sun Room territory." }
      ],
      feel: "The G chord should feel like the sun coming out — the progression brightens when it arrives. Your voice should reflect that lift.",
      wrong: "If you're singing the same patterns over all three chords, you're not hearing the harmonic shifts. Sing the root of each chord as it arrives to reset your ear, then improvise from there.",
      sarah: "Gene, Am-C-G is the backbone of so many surf-psych songs. This three-chord motion is in your DNA — let your voice discover how it naturally wants to navigate it.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── STEPPING BETWEEN CHORDS ───

    {
      id: "ss-6-8",
      time: 8,
      title: "Stepping Between Chords",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "C", "G", "Em"], bpm: 80, stepDuration: "1m" },
      what: "Combines: VOICE LEADING + CHORD CHANGES. Sing the nearest chord tone when chords change. Am→C: hold E (shared), or step A→G (nearest C-chord tone). Smooth voice leading, no leaps at transitions. Musical sewing.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Em (4 beats).",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em. When the chord changes, find the nearest chord tone in the new chord. If you're singing A over Am, step down to G (nearest C-chord tone) when C arrives. No leaps — only steps.", why: "Voice leading is the art of smooth melodic motion across chord changes. When your voice moves by the smallest possible interval at each change, the melody sounds effortless and connected." },
        { text: "Try holding shared tones across changes: E works over both Am and C. G works over both C and Em. Hold the shared tone — your voice stays still while the harmony moves underneath.", why: "Holding a common tone while chords move is the most elegant voice leading technique. The melody is static but the harmonic meaning of the note shifts — creating depth without movement." },
        { text: "Now combine: sometimes hold a shared tone, sometimes step to the nearest new tone. Pre-hear each phrase across the chord change — where does your voice want to go next? Hear the landing note before the chord arrives, then step smoothly into it.", why: "Mixing static holds and stepwise motion creates varied, interesting melodies. Pre-hearing across chord changes means your ear is leading the voice through the harmony, not reacting to it. Professional songwriters do this instinctively — you're building that same instinct." },
        { text: "3-minute freestyle: smooth voice leading over Am-C-G-Em. No leaps at chord changes — only steps and holds. Mid-pass check: are you still hearing each transition before it happens, or has autopilot kicked in? If autopilot kicked in — good, you noticed. Return to pre-hearing the next chord tone. The Khruangbin backing supports this legato approach. Record it.", why: "When voice leading becomes instinctive, your melodies will naturally flow across chord changes. The autopilot check keeps your auditory system leading — even smooth motion benefits from being heard first. This is the difference between 'notes over chords' and 'melody through harmony.'" }
      ],
      feel: "This should feel like water flowing — your voice finds the path of least resistance through the chords. Smooth, connected, unhurried. Notice the body sensation of smooth voice leading: the resonance barely shifts because you're only moving by a step. When you hold a shared tone across a chord change, your body stays still while the emotional meaning rotates beneath you — same physical sensation, different feeling. That's the hear-feel-choose cycle at its most subtle.",
      wrong: "If you're jumping to the root of each new chord (leaping), you're ignoring the stepwise constraint. Find the nearest chord tone from where you are — even if it's not the root.",
      sarah: "Gene, Khruangbin's vocal lines are the definition of smooth voice leading — Laura's voice barely moves while the chords shift underneath. That effortless, flowing quality is exactly what this exercise builds.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-9",
      time: 8,
      title: "Rhythmic Chord Navigation",
      type: "vocal",
      what: "Combines: RHYTHM + CHORD CHANGES. Strum Am-C-G-Em and sing chord tones — but with a specific rhythmic constraint each pass. Pass 1: only on beats 1 and 3. Pass 2: only on the 'and' (offbeats). Pass 3: free rhythm. The rhythmic constraint forces you to navigate chord changes while managing rhythm simultaneously.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Pass 1 — On the beat: strum Am-C-G-Em. Sing one chord tone on beat 1 and one on beat 3 of each bar. Before each note, feel which body station it wants to land in — then produce it on the beat. Silence on beats 2 and 4. The rhythm is strict; the pitch choices are free.", why: "Restricting WHEN you can sing while freeing WHAT you sing is a dual-constraint exercise. Your brain manages rhythm consciously while pitch becomes instinctive." },
        { text: "Pass 2 — Offbeat: sing chord tones ONLY on the 'and' of each beat. Nothing on the downbeats. Feel how behind-the-beat placement changes the body sensation — each note arrives in a resting moment, settling into its body address with a sigh-like quality. This is the reggae vocal pocket.", why: "Offbeat singing is harder than on-beat because it fights your natural instinct to land on strong beats. Mastering this unlocks the laid-back phrasing that defines your vocal style." },
        { text: "Pass 3 — Syncopated: mix on-beat and offbeat freely. Create rhythmic patterns that cross the bar line — start a phrase on beat 4 and carry it into beat 1 of the next bar.", why: "Syncopation is where groove lives. When your vocal rhythm creates tension against the strum rhythm, the music comes alive." },
        { text: "Pass 4 — Free: no rhythmic constraint. After the structured passes, free rhythm feels expansive. Notice how much more rhythmically diverse your improvisation is now.", why: "The constraint-then-release sequence builds rhythmic vocabulary. Each constraint forced you into patterns you wouldn't have found on your own." }
      ],
      feel: "Each pass should feel like a different dance over the same chord changes. The rhythm constraint changes everything about how you navigate the harmony.",
      wrong: "If you can't maintain the rhythmic constraint while also navigating chord changes, simplify: use only root notes for pitch while you master the rhythm. Then add 3rds and 5ths back in.",
      sarah: "Gene, this is where rhythm and harmony start working together. Most of your favorite artists phrase differently over the same chords depending on the genre feel — this exercise builds that instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },

    // ─── GENRE FEEL + SKILLS ───

    {
      id: "ss-6-10",
      time: 8,
      title: "Reggae Groove + Chord Tones",
      type: "vocal",
      what: "Combines: REGGAE RHYTHM + CHORD CHANGES + SPACE. Strum a reggae offbeat chop over Am-C and improvise vocally with chord tones — but lock your voice to the reggae feel. Short phrases, big spaces, behind the beat. The strum pattern changes how your voice wants to move.",
      setup: "Guitar. Reggae offbeat chop. Metronome at 85 BPM.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Set up the reggae chop: mute on beats 1 and 3, strum on the 'and' of 2 and 4. Get it flowing on autopilot over Am-C (4 bars each). This is from Level 1.", why: "The reggae offbeat creates a completely different rhythmic grid for your voice. Your vocal phrases will naturally fall in the spaces between the chops." },
        { text: "Sing chord tones but respect the reggae space. Short phrases, then silence. During the silence, feel where the last note settled in your body — let it resonate and fade naturally. During the singing, keep the resonance low and warm, behind the sternum. Reggae voice lives in the chest: grounded, intimate, unhurried.", why: "Reggae vocal phrasing is defined by restraint and chest-voice warmth. The embodiment is specific: reggae singing sits in the lower body addresses (chest, sternum) because the genre demands warmth over brightness. The gaps between phrases let the body fully register each note's resonance before the next arrives." },
        { text: "Try placing your vocal phrases on the offbeat — sing between the clicks, not on them. Notice how behind-the-beat placement changes the body sensation: the note arrives after the rhythmic tension, settling into its body address with a sigh-like quality. This is where your porch register lives naturally.", why: "Behind-the-beat singing creates relaxation in the body — the vibration arrives in a resting moment rather than a driving one. The body registers behind-the-beat notes as more grounded, more settled. This is the somatic signature of reggae vocal delivery (Aarhus 2021: combined imagery + production = equal learning in one-third the time)." },
        { text: "Alternate: 4 bars of singing, 4 bars of just chop (no voice). During the silent bars, the body awareness stays active — feel the echo of the last phrase fading from your chest. During the singing bars, re-engage the hear-feel-choose cycle for each short phrase. 3 minutes total.", why: "The silence teaches embodied patience. The body awareness doesn't stop when the voice stops — resonance echoes in the chest after the note ends. Amateur improvisers fill every gap; masters let the body process each phrase before producing the next." }
      ],
      feel: "Your voice and the offbeat chop should feel like two dancers — sometimes moving together, sometimes taking turns, always locked to the same pulse.",
      wrong: "If your vocal phrases are too long or too busy, you're fighting the reggae feel. Shorter phrases, more space. Let the chop do half the work.",
      sarah: "Gene, this is Pepper and Slightly Stoopid territory — your SoCal reggae-rock roots. The offbeat chop is in your muscle memory. Now let your voice learn to ride that groove.",
      metronome: 85,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-6-11",
      time: 8,
      title: "Surf Jangle + Dynamics",
      type: "vocal",
      what: "Combines: SURF FEEL + DYNAMICS + CHORD CHANGES. Strum a jangle pattern on G-Em-C-D and improvise vocally — matching the surf energy AND building intensity across 4 passes. Flowing phrases that grow from whisper to full voice over the shimmer.",
      setup: "Guitar. Jangle strum (continuous 8th-note down-up). Metronome at 90 BPM.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Strum G-Em-C-D with a continuous jangle strum at 90 BPM. Sing chord tones freely — longer lines that ride the jangle energy. Use bright vowels: 'la,' 'oh,' 'ay.'", why: "Surf-psych vocals tend to be continuous and floating rather than choppy. The jangle strum supports longer melodic lines because there are no rhythmic gaps." },
        { text: "Pass 1 — Whisper: sing in a breathy, barely-there voice. Float over the jangle like mist over water. Sparse notes, lots of space.", why: "Starting quiet establishes a floor. The dynamic build that follows will be more dramatic because you started low." },
        { text: "Pass 2 — Medium: add volume and confidence. More notes, more rhythmic commitment. You're surfing now, not just watching.", why: "The middle dynamic is where most singing happens. This is your 'cruising altitude' — comfortable and flowing." },
        { text: "Pass 3 — Full: open up to full chest voice. Commit to longer phrases, wider intervals, more energy. The jangle shimmer supports your voice at full volume. Record this pass.", why: "Full voice over jangle strum is the Allah-Las, Mystic Braves sound. This is where your surf-psych DNA comes alive." }
      ],
      feel: "This should feel like a wave building — starting as a gentle swell (whisper), rising through the lineup (medium), and cresting into a full ride (full voice). Each dynamic level lives in a different part of the body: whisper barely engages the chest, medium voice fills the ribcage, full voice reverberates through the whole torso. The hear-feel-choose cycle adapts at each level — at whisper, the body barely moves; at full voice, everything is engaged. The embodiment check: is the full cycle running at all three volumes, or does body awareness only show up at full voice?",
      wrong: "If all three passes sound the same dynamically, you're not committing to the extremes. Make pass 1 absurdly quiet and pass 3 as loud as your porch register allows.",
      sarah: "Gene, this is Allah-Las and Mystic Braves territory. Your surf-psych core. The jangle strum is in your hands — now your voice learns to build and crest over it like a wave.",
      metronome: 90,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── DESERT BLUES + DYNAMICS ───

    {
      id: "ss-6-12",
      time: 8,
      title: "Desert Blues + Dynamics",
      type: "vocal",
      what: "Combines: DESERT BLUES GENRE + DYNAMICS. Sparse Am over desert-blues backing track. Combine the desert-blues aesthetic (repetition, micro-variation) with full dynamic range (whisper → full → whisper). Genre + dynamics pairing.",
      setup: "Guitar. Sparse Am strum. Let the backing track carry the groove.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Start the backing track. Strum Am with a sparse, repetitive pattern. Sing A and E only — root and 5th. Repeat a simple phrase with micro-variations, starting at whisper volume.", why: "Desert blues is built on repetition with subtle variation. Starting at whisper matches the genre's intimate, hypnotic quality." },
        { text: "Over 8 bars, gradually swell from whisper to full voice. The phrase stays the same — only the volume changes. Let the crescendo build like heat rising from desert sand.", why: "Dynamic swells over repetitive phrases create the hypnotic intensity of desert blues. The melody doesn't change — the power does." },
        { text: "At full voice, hold for 4 bars, then gradually pull back to whisper over 8 bars. The decrescendo is harder to control but more dramatic.", why: "The fade-back creates a complete dynamic arc: quiet→loud→quiet. This wave-like shape is the emotional engine of Tinariwen and Bombino's music." },
        { text: "3-minute freestyle: sparse desert blues with free dynamic movement. Sometimes whisper, sometimes full, sometimes sudden shifts. Repeat phrases with micro-variations. Record it.", why: "When dynamics and genre feel work together, your voice becomes part of the landscape. The desert blues aesthetic + dynamic control = cinematic power." }
      ],
      feel: "This should feel cinematic and vast — your voice is a figure in an enormous desert landscape. The dynamic swells are like wind gusts across open space. As you swell from whisper to full voice, feel the resonance migrate: whisper lives in the throat and mouth, medium voice engages the chest, full voice opens the whole torso. The dynamic arc is a body arc — the hear-feel-choose cycle tracking volume as a physical sensation, not just a loudness number.",
      wrong: "If your improvisation is busy or melodically complex, you're fighting the desert blues aesthetic. Fewer notes, more repetition. Let the dynamics do the work.",
      sarah: "Gene, this is Tinariwen, Bombino, Hermanos Gutiérrez territory — sparse, cinematic desert. Your voice rides the heat shimmer. Dynamics are the drama.",
      metronome: 75,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── EXPRESSION + HARMONY ───

    {
      id: "ss-6-13",
      time: 8,
      title: "Chord Change = Mood Change",
      type: "vocal",
      what: "Combines: EMOTIONAL COLOR + CHORD CHANGES. Strum Am-C-G-Em and match your emotional delivery to each chord's character: Am (melancholic, inward), C (warm, grounded), G (bright, open), Em (dark, contemplative). The chord tells you how to feel. Your voice follows.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am. Feel the minor chord's body signature — a slight compression in the chest, a closing quality. Sing A-C-E with melancholic energy, letting the body lead: closed vowels, inward resonance, slow delivery. When C arrives, feel the shift — the chest opens slightly, warmth spreads. Let your voice follow the body's shift: warmer vowels, more grounded placement.", why: "Each chord creates a distinct body sensation — Am compresses slightly, C opens and warms. Training your voice to follow these physical shifts (not just the pitch changes) builds the chord-to-emotion-to-body circuit that makes expression automatic. Nummenmaa 2024 (PNAS) confirmed that emotional states map to specific body regions cross-culturally." },
        { text: "G chord: feel the brightness arrive in the upper chest and throat — the resonance lifts, opens, expands. Wider intervals, more projection, the vibration moving forward toward the mask. Then Em: the resonance drops, darkens, turns contemplative. Pull back, get quieter — feel the vibration retreat into the lower chest, like twilight settling.", why: "The body arc Am→C→G→Em mirrors the emotional arc: chest-compression (melancholy) → chest-opening (warmth) → throat-lifting (brightness) → deep-settling (introspection). Your body travels this arc physically — and the voice follows the body, not the other way around." },
        { text: "Loop the progression 4 times. Each time, deepen both the emotional AND physical commitment. By pass 4, each chord change should trigger an immediate body shift — chest compresses on Am, opens on C, lifts on G, settles on Em — and the voice rides the body's wave.", why: "Repetition builds the chord-to-body-to-emotion circuit into procedural memory. The physical shifts (compression, opening, lifting, settling) become the triggers for emotional expression. When this circuit is automatic, your singing responds to harmony with full-body intelligence (Zamorano 2025)." },
        { text: "Try scrambling the order: G-Am-Em-C. Feel how the body journey changes — brightness to compression to settling to warmth. A completely different physical narrative from the same body addresses in a different order. Record the best pass.", why: "Different chord orders create different body journeys and therefore different emotional stories. The songwriter's choice of chord order is also a choice of body narrative — which physical journey serves the song's emotional arc." }
      ],
      feel: "Each chord change should trigger a physical shift: your posture, your breathing, your jaw tension all change with the emotion. The body leads, the voice follows. This is the embodiment cycle in action: you HEAR the chord change, FEEL the emotional shift in your body (chest tightens for Am, opens for G), CHOOSE the expression that matches, and PRODUCE it. When the cycle is running, the mood changes feel automatic — not because you've memorized them, but because your body knows what each chord wants.",
      wrong: "If your voice sounds the same over every chord, you're singing notes without feeling the harmony. Exaggerate the emotional shifts until they become natural.",
      sarah: "Gene, this is how your favorite artists write — they don't plan emotions, they respond to chords. The chords tell them how to feel. You're building that same instinct.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-6-14",
      time: 8,
      title: "Conversation Over Changes",
      type: "vocal",
      what: "Combines: CALL & RESPONSE + CHORD CHANGES. Call-and-response from Level 3, but now the chords are moving. Guitar plays a phrase over Am, voice answers over C. Guitar calls on G, voice answers on Em. The conversation navigates the harmony.",
      setup: "Guitar. Metronome at 80 BPM. Progression: Am-C-G-Em (2 bars each chord).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Guitar plays a 2-bar phrase over Am. Before answering, let the guitar phrase land in your body — feel where its energy settled. Voice answers with a 2-bar phrase over C, adjusting to C's chord tones (C-E-G). Feel how the body shifts as the harmony moves beneath your answer.", why: "Adding chord changes to call-and-response means your voice must navigate harmony in real time while maintaining the conversational flow. Two skills fused into one." },
        { text: "Continue: guitar calls over G, voice answers over Em. Then voice calls over Am, guitar answers over C. As you alternate, track the body journey — each chord change shifts your resonance address, and the conversation travels through the body.", why: "Alternating who leads while the chords move underneath is complex coordination. But each individual skill (conversation, chord navigation) is solid from Level 3." },
        { text: "Try making the response harmonically aware: if the guitar ends on A over Am, hear and feel which C-chord tone connects smoothly — maybe E (shared tone, same body address) or C (new ground, upper chest warmth). Start your vocal response from that physical place.", why: "Harmonic bridging between call and response creates musical continuity. The conversation sounds connected rather than like two separate ideas." },
        { text: "Free alternation over the full progression for 3 minutes. Let the conversation and the chord changes both flow naturally. Record it.", why: "When conversation and harmony work together effortlessly, you're ready for the songwriter's core skill: singing original melodies over chord progressions." }
      ],
      feel: "The conversation should feel like it's traveling through the chords — each phrase acknowledges where it is harmonically while responding to what came before.",
      wrong: "If you're ignoring the chord changes during the conversation (singing Am tones over a C chord), slow down. Sing the root of each chord as it arrives, then build phrases from there.",
      sarah: "Gene, this is the bridge between improvising and songwriting. When your voice can hold a musical conversation while the chords move underneath, you're ready to write songs.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Call", B: "Response" } }
    },

    // ─── BREATH + HARMONY ───

    {
      id: "ss-6-15",
      time: 8,
      title: "Breath Shapes the Phrase",
      type: "vocal",
      what: "Combines: BREATH PHRASING (ss-3-13) + CHORD CHANGES. Strum Am-C-G-Em. One breath per chord change. Inhale on the change, sing chord tones for the length of your breath, breathe on the next change. Breath + harmony fused.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em (4 beats per chord). Inhale during the last beat of each chord. Sing chord tones on the new chord for the length of your breath. When the next chord arrives, breathe and start again.", why: "Syncing breath with chord changes creates natural phrasing that follows the harmony. Each chord gets its own breath-shaped phrase — the body and the harmony are aligned." },
        { text: "Try deep breaths for long phrases (fill the whole 4 beats with singing) and shallow breaths for short phrases (sing 2 beats, rest 2). Let breath depth vary naturally.", why: "Variable breath depth creates variable phrase lengths — long flowing lines alternating with short punchy phrases. This mimics natural speech patterns." },
        { text: "Notice how the breath reset at each chord change naturally separates your phrases. The inhale IS the phrase boundary. No need to plan where phrases start and end.", why: "In natural singing, breaths mark phrase boundaries. When breath and chord changes align, your phrasing has built-in structure without conscious planning." },
        { text: "3-minute freestyle: breath-shaped phrases over the chord progression. Each breath = one phrase = one chord. During each inhale, pre-hear the phrase that's about to emerge — let the breath carry the intention of the next phrase. The inhale isn't just air; it's your audiation moment. Let the body and harmony guide everything. Record it.", why: "When breath, harmony, and phrasing work as a unified system, your singing sounds effortless and organic. The inhale-as-audiation-moment fuses body awareness with pre-hearing — Zamorano (2025) showed that interoception predicts musical competence. This is how Skinshape and DOPE LEMON phrase — no rush, following the body." }
      ],
      feel: "This should feel like breathing through music — each inhale resets, each exhale is a musical phrase. The chord changes are your breathing cues. The inhale is your embodiment moment: as the breath fills your belly, feel where the next phrase will live in your body. The exhale carries the music out. Breath is the bridge between body awareness and vocal production — it's where the hear-feel-choose cycle is most physically tangible.",
      wrong: "If you're holding your breath through chord changes or gasping mid-phrase, slow the tempo. The breath must align with the harmony — that's the whole exercise.",
      sarah: "Gene, your laid-back vocal style is already breath-shaped. This exercise makes it conscious over moving harmony. Skinshape, DOPE LEMON — contemplative soul where the breath leads.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true
    },

    // ─── VOWEL + RHYTHM ───

    {
      id: "ss-6-16",
      time: 8,
      title: "Vowel Rhythm Patterns",
      type: "vocal",
      what: "Combines: VOWEL SHAPES + RHYTHM + CHORD TONES. Sing chord tones but change vowel sound with the rhythm — 'ooh' on beat 1, 'ahh' on beat 3, or alternate vowels with each new note. Vowel changes become a rhythmic texture layered on top of pitch and timing.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am-C.",
      steps: [
        { text: "Strum Am. Sing A on 'ooh' (beat 1) — feel the resonance concentrate deep and warm in the chest. C on 'ahh' (beat 3) — the resonance opens and spreads wider through the throat. E on 'oh' (beat 1 of next bar) — a rounder, more focused placement. Each vowel opens a different chamber in your body — the same pitch-change is paired with a body-shape change.", why: "Linking vowels to beats creates rhythmic texture AND a rhythmic body journey. Each vowel reshapes the resonance chamber: 'ooh' narrows the throat (focused chest), 'ahh' opens the throat (wide placement), 'oh' rounds it. The body oscillates between shapes, adding a physical rhythm to the musical one (Nummenmaa 2024)." },
        { text: "Try a two-vowel alternation: 'ooh' on every odd note (chest-focused, warm), 'ahh' on every even note (throat-open, bright). Sing freely over Am-C. Feel the body toggle between two resonance chambers — the physical rhythm of the vowel shift becomes its own groove.", why: "A repeating vowel pattern creates a body rhythm alongside the pitch rhythm. The oscillation between focused-chest and open-throat is a physical pulse that adds richness to improvisation — a somatic compositional tool." },
        { text: "Now try vowel morphing on a sustained note: start on 'ooh' and slowly open to 'ahh.' Feel the resonance migrate — from focused chest warmth to wide throat openness — while the pitch stays perfectly still. The same note, traveling through your body as the vowel changes shape.", why: "Vowel morphing on a single note is a body journey with no pitch change. The vibration migrates from one chamber to another — a somatic experience of 'movement' that the listener hears as color shift. This trains body awareness on a channel that most singers never develop." },
        { text: "Free improv: sing chord tones over Am-C with deliberate vowel choices. Each vowel is a body-shape choice: 'ooh' for intimacy (chest), 'ahh' for openness (throat), 'eee' for brightness (mask). Choose the body sensation first, then the vowel follows naturally. 2 minutes, record.", why: "When vowels become body-shape choices — selecting WHERE you want the resonance to live — your vocal control becomes embodied, not mechanical. Choosing by body sensation (I want chest warmth → 'ooh') is faster and more expressive than choosing by sound (I want a warm sound → tries vowels) (Zamorano 2025)." }
      ],
      feel: "The vowel changes should feel like painting with different brushes — each vowel is a different texture applied to the same musical canvas.",
      wrong: "If you forget to change vowels and default to one sound, you're not engaging the combination. Set a simple pattern (alternate 'ooh' and 'ahh') and stick to it, then add complexity.",
      sarah: "Gene, this is a subtle skill that separates interesting singers from generic ones. When your vowel choices are deliberate, every phrase has texture and color.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },

    // ─── DYNAMICS + RHYTHM ───

    {
      id: "ss-6-17",
      time: 8,
      title: "Dynamics + Rhythm Pair",
      type: "vocal",
      what: "Combines: DYNAMICS + RHYTHM. Strum Am. Combine rhythmic variety with dynamic contrast simultaneously. Loud short bursts, quiet sustained notes, syncopated whispers, on-beat projections. Two independent expressive variables at once.",
      setup: "Guitar. Metronome at 90 BPM.",
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing the note A with loud, short bursts on the downbeats: 'DA! DA! DA! DA!' — forte, rhythmic, punchy. Like a horn section hitting accents.", why: "Loud + short is the most energetic dynamic-rhythm combination. It creates urgency and forward motion. Funk music lives here." },
        { text: "Now flip it: quiet, sustained A held over 4 beats. Piano, long, floating. The opposite energy. Same note, same chord, completely different effect.", why: "Quiet + sustained is the most contemplative combination. It creates space and intimacy. Moving between these extremes is dynamic range." },
        { text: "Mix freely: loud short burst, then quiet sustained, then medium syncopated, then whispered offbeat. Change BOTH rhythm and dynamics with every phrase.", why: "Managing two expressive variables simultaneously is the cognitive challenge. When both are fluid, your single-note improvisation sounds like a complete musical performance." },
        { text: "2-minute freestyle: any chord tones (A, C, E), any rhythm, any dynamic level. The combination of rhythm and dynamics is your focus. Record it.", why: "This pairing completes the skill matrix. Dynamics and rhythm are independent variables — training them together fills a gap in your expressive toolkit." }
      ],
      feel: "This should feel like being both a drummer and a singer — your rhythmic choices and your dynamic choices are both conscious, both varied, both expressive.",
      wrong: "If your dynamics are constant (everything at the same volume) while your rhythms vary, you're only engaging one variable. Exaggerate the dynamic shifts until they're impossible to miss.",
      sarah: "Gene, Kokoroko and Khruangbin's funk side live in this territory — rhythmic AND dynamic at once. When both variables are fluid, your voice becomes a full instrument.",
      metronome: 90,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true
    },

    // ─── TIMING, ROOTS & COLORS ───

    {
      id: "ss-6-18",
      time: 8,
      title: "Behind-the-Beat Feel",
      type: "vocal",
      what: "Combines: MICRO-TIMING + CHORD TONES. Sing the SAME phrase three ways: right on the beat, slightly behind the beat (laid-back), and slightly ahead (pushing). Record all three and compare. Your favorite artists — DOPE LEMON, Skinshape, Bob Marley — all sing behind the beat. This exercise makes that timing choice conscious and controllable.",
      setup: "Guitar. Metronome at 80 BPM. LOUD click — you need to hear it clearly.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Create a simple 4-beat phrase: sing A-C-E-A over Am. Practice it until you can sing it without thinking about pitch. This is your test phrase.", why: "You need a phrase that's completely automatic so ALL your attention can go to timing placement. If you're thinking about notes, you can't focus on micro-timing." },
        { text: "Pass 1 — ON the beat: sing the phrase landing each note exactly with the metronome click. Precise, mechanical, right on top. Record it.", why: "On-the-beat singing is the baseline. It sounds clean and precise but can feel stiff. This is how a drum machine places notes — mathematically correct." },
        { text: "Pass 2 — BEHIND the beat: sing the same phrase but let each note arrive just a fraction AFTER the click. Not late — laid-back. Imagine the click passes and you lazily follow it. Think Bob Marley, D'Angelo, DOPE LEMON. Record it.", why: "Behind-the-beat phrasing is THE defining vocal technique of reggae, soul, R&B, and psych. Berklee teaches it as a specific skill: 'The biggest thing that defines R&B singing is it's behind the beat.' Your porch register lives here naturally." },
        { text: "Pass 3 — AHEAD of the beat: sing slightly before each click. Eager, forward, driving. This is punk energy, surf urgency. Notice how it feels anxious compared to behind-the-beat. Record it.", why: "Ahead-of-the-beat creates urgency and momentum. It's useful for choruses and high-energy sections. Having all three options available means you can CHOOSE your timing for different moods." },
        { text: "Listen to all three recordings back-to-back. The same four notes will sound like three different singers. Behind-the-beat will sound the most like you. This IS your vocal identity.", why: "Micro-timing is invisible in theory but immediately audible in practice. When you can consciously place your voice behind, on, or ahead of the beat, you control the emotional temperature of every phrase." }
      ],
      feel: "Behind-the-beat should feel like exhaling into a hammock — unhurried, warm, completely relaxed. On-the-beat feels alert. Ahead feels urgent. The difference is subtle but transforms the music.",
      wrong: "If all three passes sound the same, you're not displacing enough. Exaggerate: for behind-the-beat, wait until AFTER the click, then sing. For ahead, anticipate and start BEFORE the click. Once you can feel the extremes, finding the sweet spot is easy.",
      sarah: "Gene, this is the secret ingredient. Your laid-back porch register NATURALLY sits behind the beat — that's why it sounds so good. This exercise makes it a choice you can dial in, not an accident. Skinshape, DOPE LEMON, Pepper — they all live in this pocket.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-19",
      time: 8,
      title: "Root Singing — Feel the Function",
      type: "vocal",
      drone: { mode: "cycle", progression: ["Am", "C", "G", "Em"], bpm: 80, stepDuration: "1m" },
      what: "Combines: FUNCTIONAL HEARING + CHORD CHANGES. Sing ONLY the root note of each chord as it passes: A over Am, C over C, G over G, E over Em. Don't think about what note is 'right' — FEEL the gravity of each chord pulling your voice to its center. This builds the harmonic GPS that lets you navigate any progression by ear.",
      setup: "Guitar. Metronome at 80 BPM. Am (4 beats) → C (4 beats) → G (4 beats) → Em (4 beats).",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em. Sing ONLY the root of each chord: A... C... G... E... Hold each for the full 4 beats. Feel each root's body address: A settles deep in the chest (home, grounded), C lifts to the upper chest (warm, departing), G rises toward the throat (bright, expansive), E settles into a middle ground (contemplative, still). Each root has a gravitational pull AND a body location.", why: "Berklee's ear training starts here: singing chord roots trains FUNCTIONAL hearing. Adding body-location awareness creates a somatic GPS — you know where you are in the harmony by WHERE the vibration lives, not just what note sounds right. This paired navigation (ear + body) is more reliable than either alone (Zamorano 2025: R²=0.41)." },
        { text: "Now feel the MOVEMENT between roots as body journeys. A→C: vibration lifts from deep chest to upper chest (departure). C→G: resonance leaps upward to the throat (brightening). G→E: it settles back down (returning). E→A: drops into the deepest chest (home). Sing through the cycle 4 times, feeling the vibration travel.", why: "Root motion is the skeleton of harmony AND a body journey. When you feel the direction of movement in your torso — the vibration climbing and settling — you can anticipate chord changes by body sensation. This is how great singers navigate: they feel where the harmony is going physically (Nummenmaa 2024)." },
        { text: "Eyes closed, no guitar — just the backing track. Can you FEEL where each chord arrives by its body pull and sing the root? Let your body find the center of each chord — the vibration will settle into the address it knows. A pulls the resonance to the chest floor. G lifts it to the throat.", why: "Eyes-closed root singing tests whether your body has internalized the harmonic GPS. When your chest shifts before the root sounds, your somatic map is leading — which is faster and more reliable than conscious pitch calculation." },
        { text: "Now add one chord tone above each root: A→C over Am (chest to throat — feel the minor 3rd's ache arrive), C→E over C (upper chest to floating — the major 3rd brightens), G→B over G, E→G over Em. Two notes per chord, two body addresses per chord: root + 3rd. The 3rd is the COLOR — and each color has a body signature.", why: "Root + 3rd is the minimum harmonic AND somatic information. The root says WHERE you are (body address). The 3rd says HOW IT FEELS (minor 3rd = throat-ache, major 3rd = forward-brightness). Two body stations per chord, and you've mapped the emotional landscape physically." },
        { text: "2-minute freestyle: sing roots freely with occasional 3rds and 5ths. Let the roots be your body anchor — always know WHERE you are in the body for each chord. When you wander to 3rds and 5ths, feel the distance from the root's body address. Record it.", why: "When root-body awareness becomes automatic, your body has a compass. Every improvisation is physically oriented — you always know where your chest-home is, even as your melodies wander to higher body stations (Aarhus 2021: combined imagery + production = equal learning in one-third the time)." }
      ],
      feel: "Each root should feel like gravity — the note the chord WANTS you to sing. When you hit the root, everything locks in. When you sing the 3rd or 5th, you feel the distance from that center. That distance is expression.",
      wrong: "If the roots all feel the same, you're not listening to the chord changes. Stop singing and just listen to the chords for 30 seconds. Hear how each one has a different center of gravity. Then sing that center.",
      sarah: "Gene, this is the exercise that builds harmonic instinct. Once your ear knows where the root is at all times, you can wander as far as you want and always find your way home. It's the difference between exploring with a compass and wandering lost.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      pianoKeys: { notes: ["E3", "G3", "A3", "C4"], label: "Chord Roots", range: ["E3", "C4"] },
      recorder: true
    },
    {
      id: "ss-6-20",
      time: 10,
      title: "Color Palette Freestyle",
      type: "vocal",
      what: "Combines: INTERVAL FEELING (from L3) + CHORD CHANGES + GENRE FEEL. Each chord gives you a palette of 3 colors (root, 3rd, 5th). As the chords change, your palette shifts. Paint freely across the chord changes, reaching for notes by FEEL not by name. This is the paintbrush exercise — sounds as colors, chords as palettes.",
      setup: "Guitar. Metronome at 80 BPM.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      steps: [
        { text: "Strum Am. Your palette: earth (A), blue (C-minor 3rd), sky (E-5th). Paint freely for 1 minute — reach for openness when you want sky (E), reach for ache when you want blue (C), return to earth when you want grounding (A). Don't think note names. Think FEELINGS.", why: "When you associate notes with emotional qualities rather than letter names, your improvisations become expressive by default. You're not 'singing A-C-E' — you're choosing between home, ache, and space." },
        { text: "Chord changes to C. New palette: warmth (C-root), brightness (E-major 3rd — note: E is now the MAJOR 3rd, a different color than over Am), comfort (G-5th). Notice how E changes emotional function — it was 'sky' over Am but is 'brightness' over C. Same note, different color.", why: "Context changes a note's meaning. The same E that felt like open space over Am now feels like warm brightness over C. This is harmonic color — and it's why chord changes make melodies richer." },
        { text: "Strum Am-C-G-Em over the Khruangbin backing. For each chord, feel the palette shift. Am is blue+earth. C is warm+bright. G is golden+wide. Em is dark+deep. Navigate by feeling, not by note names. 3 minutes freestyle.", why: "Painting across changing palettes IS melodic improvisation at its most expressive. When you reach for feelings and the right note appears, your voice and ear are fully connected." },
        { text: "Switch to the desert blues backing track. Stay on Am for 2 minutes straight — but now explore the SPACES BETWEEN the palette colors. What happens between earth and blue? Between blue and sky? Sing into the cracks between chord tones — passing tones, slides, the notes that don't have names yet.", why: "The spaces between palette colors are where the most interesting melodies live. Blues, desert blues, and soul all live in these cracks — bending toward a color without fully arriving. This is what gives Tinariwen and Ali Farka Touré their vocal magic." },
        { text: "Final 2-minute freestyle: choose any backing track, any chords. Paint with your full palette — all the colors, all the spaces between them. Eyes closed. Trust your ear. Record it.", why: "When you can paint freely across harmonies using emotional colors instead of note names, you've internalized the sounds. They're part of you now — available instantly, like reaching for a color without looking at the paint tube." }
      ],
      feel: "This should feel like painting — choosing each note the way you'd choose a color. Not 'what note is correct here?' but 'what feeling do I want right now?' and letting your voice find it. Each color lives somewhere specific in your body: earth (root) sits in the chest, blue (minor 3rd) tightens the throat slightly, sky (5th) floats up toward the forehead. When you reach for a color, you're reaching for a body sensation first, then letting the pitch follow. That's the embodiment cycle running in reverse: choose the feeling, feel where it lives, hear the note, produce it.",
      wrong: "If you're thinking in letter names (A, C, E) instead of feelings (earth, blue, sky), the exercise hasn't clicked yet. Go back to the drone in ss-3-16 and feel each interval's emotional quality until it's instinctive.",
      sarah: "Gene, this is the paintbrush exercise. Notes as colors. Chords as palettes. You're not playing scales — you're painting with sound. When this clicks, you'll never think about 'what note should I sing' again. You'll just reach for the feeling.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      recorder: true
    },

    // ─── RHYTHM EXERCISES (from Level 8) ───

    {
      id: "ss-6-21",
      time: 7,
      title: "Swing vs Straight",
      type: "rhythm",
      what: "Same chord progression (Am-C-G-Em) strummed two ways: straight 8th notes (even, rock/surf) vs swung 8ths (bouncy, jazz/soul/blues). Then sing the same melody over both. Notice how swing changes the vocal feel entirely. Each rhythmic approach is a genre door.",
      setup: "Guitar. Metronome at 85 BPM. Backing tracks ready.",
      steps: [
        { text: "Strum Am-C-G-Em with straight 8th notes — perfectly even down-up strumming. 2 minutes. This is the surf/rock/punk feel. Even, driving, forward.", why: "Straight 8ths are the default feel of rock, surf, punk, and most pop. Every down and up stroke is exactly equal in duration." },
        { text: "Same chords, but now swing the 8ths — the downstroke is longer, the upstroke is shorter. 'Long-short, long-short.' Bouncy, relaxed, bluesy. 2 minutes.", why: "Swing is the feel of jazz, blues, soul, and reggae-influenced music. The uneven 8ths create a natural 'lean' that sounds and feels completely different from straight time." },
        { text: "Sing a simple melody (A-C-E-C, one note per bar) over the straight feel. Then sing the exact same melody over the swung feel. Record both.", why: "The same melody feels completely different over swing vs straight. Straight feels urgent and bright; swing feels laid-back and warm. This is how rhythm defines genre." },
        { text: "Play the Groove Beat track (straight feel). Strum and sing over it. Then switch to Deep Soul Groove (swing feel). Same melody, different world.", why: "Backing tracks make the swing vs straight contrast visceral. The groove pulls your voice into its pocket — you don't have to think about it." },
        { text: "Which feel suits your voice better? Spend 2 more minutes in that feel, improvising freely. Your preference reveals your genre instinct.", why: "Most singer-songwriters default to one feel without knowing it. Making it conscious gives you the choice to switch genres deliberately." }
      ],
      feel: "Straight should feel like surfing — forward momentum, clean energy. Swing should feel like a porch swing — rocking, lazy, warm. Both are valid; both are powerful.",
      wrong: "If your swing sounds like straight 8ths with a hiccup, you're not committing to the feel. Exaggerate the long-short pattern until it feels natural, then dial it back.",
      sarah: "Gene, your playlists live at the border of swing and straight — Khruangbin swings subtly, Allah-Las play straight, Skinshape swings hard. Knowing both lets you navigate your whole taste map.",
      metronome: 85,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-6-22",
      time: 6,
      title: "Rhythmic Density as Color",
      type: "vocal",
      what: "Sing one note (A) over an Am strum. Round 1: pack 8 syllables into one bar (dense, storytelling energy). Round 2: sing 2 syllables per bar (sparse, declarative). Round 3: alternate dense and sparse bars. Syllable density is a section-contrast tool — busy verse vs sparse chorus or vice versa.",
      setup: "Guitar strumming Am. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am at 80 BPM. Sing 'da' on the note A, packing 8 syllables into each bar — 'da-da-da-da-da-da-da-da.' Dense, rapid, storytelling energy. Do this for 4 bars.", why: "Dense syllable packing is the rhythm of verses that tell stories — lots of words, lots of information. Bob Marley, Sublime, and Pepper all use this in their verses." },
        { text: "Same strum, same note. Now sing only 2 syllables per bar — 'daaaa... da.' Long, spacious, declarative. 4 bars.", why: "Sparse delivery is the rhythm of choruses and hooks — few words, maximum impact. The space between notes creates emphasis." },
        { text: "Alternate: 2 bars dense, 2 bars sparse. Feel the contrast. The dense bars create tension and momentum; the sparse bars release it.", why: "This density contrast is how professional songwriters create section contrast without changing chords or melody. The rhythm alone signals verse vs chorus." },
        { text: "Now improvise your own density pattern over 8 bars. Maybe start sparse and build to dense, or create your own rhythm. Record it.", why: "Choosing density is a compositional decision. You're writing rhythm — the skeleton that lyrics and melody will eventually hang on." },
        { text: "Listen back. Notice how density changes feel like different sections of a song, even though the note and chord never changed.", why: "This proves that rhythm alone can create song structure. When you add pitch changes later, the structural contrast will be even more dramatic." }
      ],
      feel: "Dense bars should feel chatty and urgent — like you have a lot to say. Sparse bars should feel like a deep exhale — confident, unhurried, letting the words land.",
      wrong: "If your dense syllables are uneven or rushed, slow the metronome. Every syllable should land on a subdivision. If your sparse notes feel empty rather than powerful, commit more — sing louder and sustain longer.",
      sarah: "Gene, think about how Tommy Guerrero's instrumentals use this — sparse melodic lines over busy rhythm, then the reverse. Density is a texture knob you can turn.",
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-6-23",
      time: 6,
      title: "Strum + Vocal Rhythm Conversation",
      type: "song",
      what: "Strum a groove and create a vocal rhythm that COMPLEMENTS (not duplicates) the guitar. When the guitar is busy, the voice rests. When the guitar rests, the voice fills. Guitar and voice become two parts of one rhythm — like a conversation.",
      steps: [
        { text: "Strum the reggae offbeat chop on Am. Notice where the GAPS are in the strum (on the beats). Now sing short notes in those gaps.", why: "Filling gaps creates interlocking rhythm — voice and guitar fit together like puzzle pieces. This is the foundation of groove-based singing." },
        { text: "Switch to surf jangle (continuous 8ths). The gaps are smaller. Sing longer, sustained notes that ride on top of the strum.", why: "Over busy guitar, the voice simplifies. Over sparse guitar, the voice can be busier. This balance is instinctive in great singers." },
        { text: "Try this: strum for 2 bars, then stop and sing for 2 bars (no guitar). Then overlap for 2 bars. The contrast reveals how voice and guitar relate.", why: "Alternating solo and overlap reveals which textures you prefer. Some songs work best with voice + guitar interlocking; others work best with trading off." },
        { text: "Create a 16-bar piece where voice and guitar have a conversation — sometimes together, sometimes taking turns. Record it.", why: "A 16-bar voice-guitar conversation is a complete musical statement. This is the rhythmic foundation of your songwriting style." }
      ],
      feel: "Voice and guitar in conversation should feel like a duo — two musicians listening to each other. When they interlock perfectly, the whole thing grooves harder than either alone.",
      wrong: "If voice and guitar are always landing at the same time, they're not conversing — they're shouting together. Create space for each to breathe.",
      sarah: "Gene, this conversational approach is exactly what Khruangbin does — Mark Speer's guitar fills the spaces around Laura Lee's bass and vice versa. Apply the same principle to your voice and guitar.",
      metronome: 85,
      referencePitches: getPitchRange("A3", "A3"),
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      recorder: true
    },

    // ─── COMBINATION CAPSTONE ───

    {
      id: "ss-6-24",
      time: 10,
      title: "Two-Skill Freestyle",
      type: "song",
      what: "The combination test. Three 2-minute freestyles, each combining two specific skills. Round 1: Rhythm + Dynamics (vary rhythm AND volume over Am). Round 2: Chord Changes + Emotional Color (match mood to each chord in Am-C-G-Em). Round 3: Genre Feel + Vowel Shapes (reggae chop with deliberate vowel choices). Record all three.",
      setup: "Guitar. Metronome at 80-85 BPM.",
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        { text: "Round 1 — Rhythm + Dynamics: strum Am at 80 BPM. Sing one chord tone (A) with varied rhythms AND varied dynamics simultaneously. Loud bursts, quiet sustained notes, syncopated whispers, on-beat shouts. 2 minutes.", why: "Combining rhythm and dynamics means managing two expressive variables at once. When both are fluid, your single-chord improvisation sounds like a complete musical performance." },
        { text: "Round 2 — Changes + Emotion: strum Am-C-G-Em at 80 BPM. Sing chord tones while matching emotional color to each chord. Am=melancholic, C=warm, G=bright, Em=dark. 2 minutes.", why: "Combining chord navigation with emotional expression is the core of expressive singing. Your voice tracks both the harmony AND the feeling simultaneously." },
        { text: "Round 3 — Genre + Vowels: reggae offbeat chop at 85 BPM over Am-C. Sing chord tones with deliberate vowel choices — 'ooh' for quiet moments, 'ahh' for projecting moments, vowel morphs on sustained notes. 2 minutes.", why: "Genre feel + vowel awareness produces a fully textured vocal performance. This is what separates 'singing notes' from 'having a vocal style.'" },
        { text: "Listen to all three recordings. Each round combined two skills. In Level 7, everything combines at once. How close are you?", why: "Self-assessment through recording playback is one of the most effective practice techniques. You hear things in playback that you can't hear while performing." }
      ],
      feel: "Each round should feel like juggling two balls — challenging but possible. In Level 7, you'll juggle all of them at once. Between rounds, run the embodiment check: is the full hear-feel-choose cycle still running on both skills, or has a channel gone dark? Body awareness drops first when skills combine — you keep hearing and choosing, but stop feeling where notes live. If the body channel went silent, reconnect before starting the next round.",
      wrong: "If one skill disappears when you focus on the other (e.g., dynamics go flat when you focus on chord changes), the weaker skill needs more isolated practice from Levels 3-4. The embodiment check is your diagnostic: which channel went dark? If body awareness dropped, spend 30 seconds feeling where your current note lives before resuming.",
      sarah: "Gene, this is the checkpoint. If you can combine any two skills fluently, you're ready for Level 7 where everything flows together. These recordings are your proof.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "E4"),
      pitchContour: true,
      volumeMeter: true,
      recorder: true
    },

    // ─── KEY DIVERSITY — DUAL-TASK IN MULTIPLE KEYS ───

    {
      id: "ss-6-25",
      time: 6,
      title: "Em Center Transpose",
      type: "vocal",
      what: "Take the Hum+Strum skill from ss-6-2 and do it over Em-G-C-D instead of Am-C-G-Em. Same dual-task challenge, new harmonic center. Em feels more melancholy than Am, and the chord order creates different gravitational pull. The fact that this feels harder than Am-C-G-Em IS the learning — your brain is building a more flexible schema.",
      setup: "Guitar. Metronome at 80 BPM. Strum Em-G-C-D.",
      steps: [
        { text: "Strum Em-G-C-D at 80 BPM. Hum the root of each chord: E over Em — feel where E settles in the body (it's slightly different from A's chest address, more open). G over G — brightness in the throat. C over C — warmth. D over D — forward pull. These roots live at different body stations than your Am-C-G-Em roots.", why: "Same notes, different center of gravity. Em as home makes G feel like departure and D feel like tension. This proves that 'key' is about where HOME is, not which notes you play." },
        { text: "Sing chord tones: E-G-B over Em, G-B-D over G, C-E-G over C, D-F#-A over D. When F# arrives over D, feel where this new note lands in the body — it buzzes higher and brighter than F, a completely different address. Navigate to it by ear.", why: "F# appears when D becomes a major chord in this context. Your voice encounters a 'new' note that challenges Am-trained muscle memory." },
        { text: "Free vocal improv over Em-G-C-D. Treat Em as home — phrases that end on E feel resolved. Compare this to your Am improv — different emotional center, same set of notes. 2 minutes, record.", why: "The emotional difference between Em-centered and Am-centered improvisation proves that key center matters more than which notes are available. This is the deepest lesson in key diversity." }
      ],
      feel: "Em center should feel darker and more introspective than Am center — even though the chords overlap. Like the same landscape at dusk instead of noon.",
      wrong: "If you keep gravitating back to A as your home note, you're fighting the Em center. Deliberately end phrases on E. Let E be the note of resolution.",
      sarah: "Gene, Em is the minor relative of G major — it's the melancholy side of the bright key you explored in L4. Every chord you know can serve a different function depending on which one is 'home.'",
      drone: { mode: "cycle", progression: ["Em", "G", "C", "D"], bpm: 80, stepDuration: "1m" },
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-6-26",
      time: 7,
      title: "E Major Strum + Sing",
      type: "vocal",
      what: "The dual-task ramp from ss-6-2, but in E major. Strum E-A-B7 at 80 BPM. Hum roots, then sing chord tones. This is the first time you're combining guitar autonomy with vocal work in a genuinely new key family. The chord shapes are different, the vocal targets are different — everything you automated in Am must be rebuilt from scratch in E major.",
      setup: "Guitar. Metronome at 80 BPM. Strum E-A-B7. Review B7 fingering from ss-4-22 if needed.",
      steps: [
        { text: "Strum E-A-B7 at 80 BPM with a simple quarter-note pattern. Just get the chord changes smooth. If B7 is still rough, drill E→B7→E transitions until the change is clean.", why: "Guitar autonomy in a new chord progression must be established before adding voice. E-A-B7 has different transition mechanics than Am-C-G-Em." },
        { text: "Hum the root of each chord: E over E — feel where E settles in the body, deeper in the chest than A. A over A — the familiar warmth. B over B7 — the throat-pull you know from the tension notes. Sustained hum, one root per chord. If the strum hitches, go back to guitar-only practice.", why: "Root tracking over new chords tests whether the dual-task transfers across key families. If humming E-A-B disrupts the strum, the E-A-B7 guitar pattern isn't autonomous yet." },
        { text: "Sing chord tones: E-Ab-B over E (remember Ab = G#) — feel how Ab buzzes forward in the mask, a brightness your Am palette never reached. A-C#-E over A — C# sits forward and warm where C was shadowed. B-D#-F# over B7. Navigate these new notes by ear and by body sensation.", why: "These chord tones include notes you've rarely or never sung (Ab, C#, D#/Eb, F#). Each one is a new physical vocal experience — different resonance, different breath support." },
        { text: "Free vocal improv over E-A-B7. Sing whatever notes feel right over each chord. 2 minutes, record. Compare to your Am-C-G-Em improv — how does your voice sound different?", why: "Free improvisation in E major with guitar tests the full dual-task in a new key family. The comparison to Am reveals how key-specific your vocal instincts are." }
      ],
      feel: "This should feel like learning to drive in a new car — the controls are in different places but the skill is the same. Awkwardness is expected and productive. Always end on something that worked — even one clean chord-tone match in the new key.",
      wrong: "If you're singing Am pentatonic notes (G natural, C natural) over E-A-B7, you're defaulting to familiar muscle memory. Use the drone to find Ab and C# — they're the notes that make E major sound like E major. If the new placements feel weird, that's proprioceptive recalibration — your body map is updating. Trust the pitch detector over how it feels for the first few sessions.",
      sarah: "Gene, this is where the research on key-specific vocal production gets real. Your voice literally uses different muscles to produce Ab than to produce G. Building this dual-task in E major gives you a second musical identity.",
      drone: { mode: "cycle", progression: ["E", "A", "B7"], bpm: 80, stepDuration: "1m" },
      referencePitches: getPitchRange("E3", "C#4"),
      recorder: true,
      metronome: 80
    },
    {
      id: "ss-6-27",
      time: 8,
      title: "Cross-Key Flow",
      type: "vocal",
      what: "The ultimate contextual interference exercise for Level 5. Strum 4 bars Am-C-G-Em, then switch to 4 bars E-A-B7, then back. Navigate the key family shift while maintaining all dual-task skills. The jump between Am (no sharps) and E major (4 sharps) forces your brain to build abstract, key-independent musicianship rather than Am-specific habits.",
      setup: "Guitar. Metronome at 85 BPM.",
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Strum Am-C-G-Em for 4 bars (16 beats). Sing chord tones freely — you know this territory. Then immediately switch to E-A-B7 for 4 bars. Sing chord tones in E major. The transition is the challenge.", why: "The key switch forces your brain to reconfigure both guitar shapes AND vocal targets simultaneously. This is maximum contextual interference — and it's what produces the deepest learning." },
        { text: "Repeat the cycle 4 times: Am family → E family → Am family → E family. Each time the switch should feel slightly smoother. Your brain is building the neural pathways for key-independent musicianship.", why: "Repeated key switching builds the 'abstract schema' that research describes — the ability to apply musical skills in any context, not just the one you practiced in." },
        { text: "On the final cycle, try to maintain the same emotional arc across both keys. Start quiet and build, or start bright and fade — but keep the emotional continuity even as the key changes.", why: "Maintaining emotional continuity across key changes is what professional musicians do instinctively. It separates 'playing in a key' from 'making music that happens to change keys.'" },
        { text: "Record the full exercise. Listen back — can you hear the transition points? Do they sound like jarring gear shifts, or smooth lane changes? The goal is smooth.", why: "The recording reveals whether the key switches are musical or mechanical. Over time, these transitions become invisible — and that's when key independence is achieved." }
      ],
      feel: "The Am sections should feel like home. The E major sections should feel like a vacation home — familiar enough to function, unfamiliar enough to be exciting. The transitions should feel like stepping through a doorway.",
      wrong: "If you freeze up at the key switch and stop singing, that's normal for the first few attempts. Keep the guitar going and rejoin with your voice — even if it means just humming the root until you find your footing in the new key.",
      sarah: "Gene, this exercise is the research made real. Contextual interference — jumping between keys — feels harder but produces better retention than staying in one key. Every awkward moment here is your brain getting stronger.",
      referencePitches: getPitchRange("E3", "G4"),
      pitchContour: true,
      recorder: true,
      metronome: 85,
      levelUp: "Can pass the TV Test for guitar autonomy, hum/speak/sustain over chord changes, combine any two improvisation skills — rhythm + dynamics, chord changes + emotion, genre feel + vowel shapes — navigate chord changes by feeling root gravity, place voice behind/on/ahead of the beat deliberately, paint with notes as emotional colors across changing harmonic palettes, distinguish swing from straight feel, vary rhythmic density as a compositional tool, create complementary vocal rhythms that interlock with guitar grooves, perform dual-task singing in Em-centered and E major progressions, and navigate cross-key transitions between Am and E major families — while strumming, without either skill degrading when the other is added."
    }
  ]
};
