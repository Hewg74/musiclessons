import { getPitchRange } from "../appData.js";

export const level4 = {
  level: 4,
  title: "The Full Palette",
  subtitle: "From triad to pentatonic. Color, expression, freedom.",
  description:
    "You've mastered the triad — root, 3rd, 5th, deeply felt. Now we expand: a fourth note (D) unlocks stepwise motion, and a fifth (G) completes the Am pentatonic — the most universal scale in music. With five notes you can improvise over any song in the key of Am with no wrong notes. Along the way you'll explore major vs minor palettes, palette switching over chord changes, vowel shapes, breath-phrased melody, the expressive power of silence, groove absorption, sensory vocabulary building, genre feel shifts, syncopation, and body percussion layering. By the end, your five-note palette is a living, breathing musical vocabulary.",
  artists: "Khruangbin, Skinshape, Tommy Guerrero, DOPE LEMON",
  unlocks: "Voice Combines (Level 5)",
  review: { label: "Level 3 Check-In", time: 5, exercises: ["ss-3-11", "ss-3-12"], prompt: "Sing a three-note conversation with triadic colors (ss-3-11). Then three moods over A-C-E (ss-3-12). Both fluid? Move on." },
  exercises: [

    // ─── PHASE 4: FOUR NOTES — ADDING THE STEP ───

    {
      id: "ss-4-1",
      time: 7,
      title: "Adding the Bridge — D",
      type: "vocal",
      what: "Four notes now: A, C, D, E. D sits between C and E — it's the bridge, the passing tone, the note that makes STEPWISE MOTION possible. Before D, you had to leap between C and E. Now you can walk: C-D-E or E-D-C. Smooth, connected, flowing.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Review your triad: sing A-C-E ascending, E-C-A descending, against the drone. Feel the leap between C and E — it's a gap, a jump, a skip. You've been jumping this gap for a while now. Today you fill it.", why: "Feeling the C-to-E gap before filling it makes the new note's purpose visceral. You'll understand WHY D matters because you'll feel the difference it makes." },
        { text: "Sing D against the drone. Hold it for 8 beats. Feel how D is different from the triad notes — it's less stable, more restless. D wants to move. It pulls toward C or toward E. It's a bridge, not a destination.", why: "D is the 4th scale degree — a passing tone that creates movement and tension. Unlike the stable root, 3rd, and 5th, D has an inherent pull that drives melodies forward. It's the oil that makes the engine run." },
        { text: "Walk the bridge: sing C-D-E slowly. Feel how D connects them — smooth, stepwise, no leap. Then E-D-C. Then the full walk: A-C-D-E ascending, E-D-C-A descending. Stepwise motion through all four notes.", why: "Before D, you had to leap between C and E. Now you can WALK. Stepwise motion is the most natural melodic movement — it's how we sing intuitively, how folk melodies move, how lullabies flow." },
        { text: "Improvise with all four notes: A, C, D, E. Notice how D creates flow — melodies that felt angular with three notes now feel smoother. D is the glue between your triad tones. 2 minutes, free exploration.", why: "The addition of one passing tone transforms your melodic vocabulary from triadic leaps to flowing lines. This is a qualitative shift — your improvisations will sound more like 'real' melodies because stepwise motion is how most melodies work." },
        { text: "Try using D as a quick 'connecting' note — don't hold it, just pass through it between C and E. Then try holding D as a long note and feel its tension. Both approaches are valid tools. Record 2 minutes.", why: "Passing tones can be quick (connecting two stable notes) or sustained (creating tension). Learning both uses of D gives you options — smooth connection or intentional tension." }
      ],
      feel: "D should feel like a stepping stone between C and E — useful, purposeful, always moving. When you walk C-D-E, it should feel smooth and connected, like stepping stones across a stream instead of leaping over it.",
      wrong: "If D feels random or out of place, you're not hearing it in context. Always approach D from C or from E — feel how it bridges the gap. If you hold D for a long time and it feels uncomfortable, that's correct — D is a tension note. Let it resolve to C or E.",
      sarah: "Gene, adding D is like learning the word 'and' — it connects everything. Your melodies just went from choppy phrases to flowing sentences. One note, and suddenly your four-note world sounds like music.",
      drone: { root: "Am", octave: 3, texture: "pure" },
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      metronome: 75,
      recorder: true
    },
    {
      id: "ss-4-2",
      time: 6,
      title: "Stepwise Wandering",
      type: "vocal",
      what: "Now that D bridges C and E, walk through your four notes using primarily stepwise motion: A-C-D-E-D-C-A. Each note leads gently to the next. No big leaps. Stepwise motion is the most natural melodic movement — it's how we sing intuitively.",
      setup: "Guitar. Metronome at 80 BPM. Optional backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot. Sing the ascending walk: A-C-D-E. One note per beat, slow and deliberate. Then descend: E-D-C-A. Repeat 4 times. Feel the smooth, connected quality of stepwise motion.", why: "Stepwise ascending and descending is the most basic melodic exercise — and the most useful. The majority of notes in most melodies move by step, not by leap. This is the movement your voice does most naturally." },
        { text: "Now wander freely using mostly stepwise motion: A-C-D-C-D-E-D-C-A. Each note is adjacent to the last. No skipping. Let the melody meander like a path through the woods.", why: "Constrained wandering — moving only to adjacent notes — produces surprisingly beautiful, flowing melodies. Folk traditions worldwide use this approach. The constraint creates natural, singable phrases." },
        { text: "Add occasional leaps for contrast: walk stepwise for 4-5 notes, then leap from A up to E (or E down to A). The leap feels dramatic because you've been stepping. Then return to walking.", why: "Leaps are more powerful when they're rare. A melody that walks and walks and then suddenly leaps creates a moment of drama. The step-step-step-LEAP pattern is a fundamental melodic technique." },
        { text: "Try walking over the backing track: let the Khruangbin groove shape your stepwise wandering. Walk in time with the beat, stepping through A-C-D-E at whatever pace the groove suggests. 2 minutes.", why: "The groove provides rhythmic context for your stepwise motion. Walking in time with a beat transforms academic scale walking into musical phrasing." },
        { text: "Record 2 minutes of free stepwise wandering. Afterward, listen back — your four-note walks should sound like embryonic melodies. They ARE melodies, just simple ones.", why: "Recognizing your stepwise walks as real melodies builds confidence. You're not doing exercises — you're making music with four notes. The simplicity is the point." }
      ],
      feel: "This should feel like walking a gentle trail — each step leads naturally to the next, no effort required. The melody flows rather than jumps. When you're in the flow of stepwise motion, it should feel almost automatic.",
      wrong: "If you keep leaping (skipping from A to E without passing through C and D), you're reverting to triadic thinking. Deliberately step through every note between start and destination. Walk, don't jump.",
      sarah: "Gene, the psych-surf melodies you love are full of stepwise motion — those hypnotic, flowing vocal lines from Allah-Las and BALTHVS are mostly just walking through adjacent notes. This is where that sound comes from.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-4-3",
      time: 6,
      title: "Four-Note Conversation",
      type: "vocal",
      what: "Guitar-voice call and response with A, C, D, E. The conversation now has stepwise motion available — smoother, more melodic phrases. Notice how adding ONE note (D) transforms the conversation from triadic jumps to flowing lines.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Play a short guitar phrase using A, C, D, E — try a stepwise phrase like C-D-E-D (walking up and back). Then answer with your voice: sing a four-note phrase that responds to the guitar's contour.", why: "The conversation now has stepwise motion available. Guitar phrases sound smoother, voice responses can flow — the musical dialogue gains a new quality of connectedness." },
        { text: "Make the guitar call use a LEAP (A up to E). Make the voice answer use STEPS (E-D-C-A walking down). The call is dramatic, the response is smooth. Contrast in motion type creates interesting conversation.", why: "Mixing leaps and steps between call and response adds a new dimension to the dialogue. The call can be bold while the response is gentle — or vice versa." },
        { text: "Reverse: voice calls with a stepwise phrase, guitar answers with a leap-based phrase. Then try matching: both use steps, or both use leaps. Feel how the conversation character changes.", why: "When both speakers use the same motion type, there's agreement. When they contrast, there's complementary tension. Both are musically valid — the choice is expressive." },
        { text: "Free conversation: 2 minutes, four notes, alternating guitar and voice. Let the phrases be 2-4 notes long — short enough to be clear, long enough to have contour. Record it.", why: "Short phrases with clear contour are the building blocks of songwriting. Each call-and-response exchange is a tiny melodic idea that could become a song fragment." },
        { text: "Compare this to your two-note conversations (ss-3-7). Notice how much more melodic the four-note version sounds — smoother, more song-like. That's what D added.", why: "Explicitly comparing your current ability to earlier exercises reveals your growth. Four notes with stepwise motion sounds dramatically more musical than two notes — and you built to it gradually." }
      ],
      feel: "This should feel noticeably more musical than the two-note conversations. The phrases flow, the responses have melodic shape, and the dialogue sounds like fragments of songs rather than rhythmic exercises.",
      wrong: "If you're still only using A and E (reverting to your comfortable two-note pair), consciously include C and D. The new notes are what make this phase different. If the phrases feel random, try starting each phrase by stepping from one note to its neighbor.",
      sarah: "Gene, notice how adding ONE note transformed the entire conversation. D is a small addition — but it's the difference between angular fragments and flowing melodies. Your four-note phrases are starting to sound like real music because they can WALK.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },

    // ─── PHASE 5: FIVE NOTES — FULL PENTATONIC ───

    {
      id: "ss-4-4",
      time: 7,
      title: "The Full Palette — Adding G",
      type: "vocal",
      what: "Five notes: A, C, D, E, G. The Am pentatonic — the most universal scale in music. G is the highest note in your palette, the peak, the reach. Every culture on earth uses this five-note scale. With these five notes, you can improvise over ANY song in the key of Am. No wrong notes. Complete freedom.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Review your four notes: sing A-C-D-E ascending, E-D-C-A descending against the drone. This is your known world. Now you're about to add the final note — the peak of the palette.", why: "Reviewing the four-note palette before expanding it grounds you in familiar territory. Each addition has been gradual — root, 5th, 3rd, bridge. G is the capstone." },
        { text: "Sing G against the drone. Hold it for 8 beats. Feel the reach — G is the highest note in your palette, the farthest from home. It has a quality of uplift, of aspiration, of reaching for something. It's the peak of the mountain.", why: "G is the minor 7th — it creates a gentle tension that wants to resolve back down. It's the 'reach' note, the one that creates the most melodic interest when it leads back to familiar territory." },
        { text: "Sing the full Am pentatonic ascending: A-C-D-E-G. Then descending: G-E-D-C-A. One note per beat. Feel the complete palette — earth, blue, bridge, sky, peak. Five colors.", why: "The pentatonic scale is the most universal scale in human music — every culture on earth uses it independently. These five notes are hard-wired into human musical cognition. There are no dissonances, no wrong combinations." },
        { text: "Skip around freely — any note in any order. A-G-C-E-D. G-C-A-E-D. No pattern, no sequence, just exploring the full space. Feel how every combination works. No wrong notes.", why: "Free exploration of the pentatonic builds confidence that ANY combination of these notes sounds musical. This is the scale's magic — there are no bad choices, only different colors and contours." },
        { text: "2-minute eyes-closed freestyle with all five notes. No rules, no targets. Let your ear and your instincts guide you through the full palette. Record it. This is your first full pentatonic improvisation.", why: "Extended freestyle on the pentatonic is a milestone — you now have enough notes for genuinely complex, song-like melodies. Everything you've built (rhythmic variety, dynamic range, emotional color, stepwise motion, call-and-response) now has a full five-note canvas." }
      ],
      feel: "Five notes should feel like unlocking a door — suddenly you have enough colors to paint real pictures. The pentatonic is the sweet spot: enough notes for infinite variety, few enough that every combination sounds good. Freedom without overwhelm.",
      wrong: "If the five notes feel like too many choices, you've ramped too fast. Go back to four notes (ss-4-1) for another session, or start your five-note freestyle by walking stepwise (A-C-D-E-G) rather than leaping randomly. The structure will guide you.",
      sarah: "Gene, every artist you love lives in the pentatonic — Khruangbin, Skinshape, Allah-Las, Tinariwen, Tommy Guerrero. This five-note scale is the common language of psych-surf, desert blues, reggae, and soul. You now have the full palette. The rest of this level is about making it yours.",
      drone: { root: "Am", octave: 3, texture: "warm" },
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      fretboard: { scale: "am-pentatonic", position: 1 },
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-4-5",
      time: 6,
      title: "Pentatonic Rhythm Play",
      type: "vocal",
      what: "All five pentatonic notes with full rhythmic freedom. Apply everything you've learned: long holds, short bursts, syncopation, silence, dynamic shifts. Five notes and infinite rhythms. This is where the scale becomes a living, breathing musical vocabulary.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Drums Only — Bossa 75", src: "/drums-bossa-75.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "Strum Am on autopilot with the backing track. Sing pentatonic notes (A-C-D-E-G) using ONLY whole notes — one note per bar. Slow, deliberate, letting each note breathe. Choose each note carefully — which color do you want next?", why: "Starting with whole notes forces intentional note choice. When each note lasts a full bar, the selection matters — you're composing in slow motion. This is how you learn to make purposeful melodic decisions." },
        { text: "Speed up to quarter notes. Now four notes per bar — the pentatonic comes alive with rhythm. Try walking stepwise, then try leaping. Feel how rhythm transforms the scale from a list of notes into a flowing melody.", why: "Quarter notes add rhythmic motion. The pentatonic stops being a 'scale' and becomes a melodic language. Your brain must now coordinate pitch choice AND rhythmic placement simultaneously — a skill you've built gradually." },
        { text: "Try syncopation: land pentatonic notes on the offbeats, between the reggae groove's downbeats. Sing BETWEEN the guitar strums. The one-drop groove leaves space for you — fill it.", why: "Offbeat pentatonic singing over reggae is one of the most natural musical combinations in your genre palette. The groove provides the skeleton, your voice provides the melody in the spaces." },
        { text: "Dynamic variation: sing some pentatonic phrases loudly, others barely above a whisper. Let the dynamics follow the melody contour — ascend = louder, descend = softer. Or reverse. Or random. Use volume as a creative tool.", why: "Dynamics applied to a five-note palette creates the full illusion of complex melody. When pitch, rhythm, AND dynamics all vary, simple pentatonic phrases sound like fully composed melodies." },
        { text: "2-minute full freestyle: all five notes, any rhythm, any dynamic, over the backing track. Use silence. Use bursts. Use long tones. Use everything you've built. Record it.", why: "This is the synthesis exercise — combining every skill (rhythmic variety, dynamic range, pentatonic freedom) into a single extended improvisation. It should feel like you're writing a song in real time." }
      ],
      feel: "This should feel like PLAYING — not practicing, not exercising, but making music. The pentatonic over a reggae groove should feel as natural as breathing. If you're nodding your head and smiling, you're in the right place.",
      wrong: "If you're stuck on the same two or three notes, consciously reach for the ones you're avoiding. G and D often get neglected — include them deliberately until they feel as natural as A and E.",
      sarah: "Gene, this is the exercise where everything clicks — five notes, a reggae groove, and all the rhythmic and dynamic tools you've built. Skinshape's vocal lines are exactly this: pentatonic notes over a groove, with rhythm and dynamics doing the heavy lifting. You're there.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true
    },
    {
      id: "ss-4-6",
      time: 8,
      title: "Pentatonic Conversation",
      type: "vocal",
      what: "The full guitar-voice conversation with all 5 pentatonic notes. Guitar plays a short pentatonic phrase, voice answers with a pentatonic phrase. Now the conversation has full melodic range — contour, stepwise motion, leaps, emotional color. This is real improvisation.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play a short pentatonic guitar phrase (Am pentatonic, frets 5-8 on the top strings). Keep it 3-5 notes. Then answer with your voice: sing a pentatonic phrase that responds to the guitar's contour and emotion.", why: "The pentatonic conversation is the culmination of all your call-and-response work. With five notes, both guitar and voice have full melodic range — the conversation sounds like two musicians playing together." },
        { text: "Try matching the guitar's emotional intent: if the guitar plays something gentle and stepwise, answer with something gentle. If the guitar plays something rhythmic and punchy, answer in kind. Emotional matching creates coherent musical dialogue.", why: "Matching emotion between call and response creates musical coherence — the conversation has a mood. This is how great musical partnerships work: each player listens to the other's intention, not just their notes." },
        { text: "Now try CONTRASTING: if the guitar plays high and fast (G-E-D), answer low and slow (A... C...). If the guitar is sparse, answer with a flurry. Contrast creates drama and keeps the conversation interesting.", why: "Contrast in call-and-response creates musical tension and release. A conversation where both speakers always agree is boring — a great musical dialogue has agreement AND surprise." },
        { text: "Extended free conversation: 3 minutes of alternating guitar and voice over the backing track. Let the phrases develop — start simple, let them grow more complex as you warm up. Some exchanges will be brief; others might extend into longer ideas.", why: "Extended conversation builds musical stamina and depth. The longer you sustain the dialogue, the more you'll discover. Ideas that emerge after 2 minutes of conversation are often better than your first impulses." },
        { text: "Record the last 2 minutes. Listen back for the moment where guitar and voice were truly in conversation — where the response couldn't have existed without the specific call that preceded it. That's the magic moment.", why: "Identifying moments of genuine musical conversation trains you to recognize (and reproduce) the feeling of real-time musical dialogue. These moments are the seeds of your future songs." }
      ],
      feel: "This should feel like Khruangbin in your living room — Mark plays a pentatonic lick, Laura answers with her voice, the conversation flows naturally. Relaxed, groovy, responsive. Each phrase listens to what came before.",
      wrong: "If you're ignoring what the guitar just played and singing unrelated phrases, you're monologuing, not conversing. The voice answer should RESPOND to the guitar call — acknowledge it, develop it, contrast it, or complete it.",
      sarah: "Gene, Khruangbin does this constantly — Mark plays a pentatonic phrase, Laura answers. Their entire sound is this conversation. You're building the same instinct, with the same scale, over the same kind of groove. This IS the music you love, at its simplest and most essential.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true,
      phraseForm: { pattern: "AB", barsPerSection: 2, labels: { A: "Guitar Call", B: "Voice Answer" } }
    },
    {
      id: "ss-4-7",
      time: 7,
      title: "Free Exploration — Am Pentatonic",
      type: "vocal",
      what: "The exercise that was previously #1 — but now you've EARNED it. Strum Am on autopilot and sing any combination of A, C, D, E, G in any order, any rhythm, for 3 minutes straight. No target phrase, no compositional goal. Just wander through the full pentatonic. After the gradual ramp, this freedom feels completely different — you KNOW these notes.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Turn on the drone. Close your eyes. Begin singing any pentatonic notes in any order, any rhythm. No rules. No targets. Just wander. Let your ear choose the next note, not your brain.", why: "Open-ended exploration is Kratus Level 1 — pure creative play. But unlike a beginner's random wandering, YOUR wandering is informed by everything you've built: one-note mastery, two-note conversations, triadic color, stepwise motion, rhythmic freedom." },
        { text: "Sing for at least 3 minutes without stopping. When you run out of ideas, simplify — go back to two notes, or one note, and let the complexity rebuild naturally. The music never stops, even when it gets simple.", why: "Extended improvisation builds stamina and trust. The moments when you 'run out of ideas' are exactly when the interesting stuff happens — your conscious mind stops trying, and your instincts take over." },
        { text: "Vary everything: long tones, short bursts, silence, dynamics, vowel sounds, rhythmic patterns. Apply all the tools from every phase. This is the synthesis — everything you've learned, all at once, all your choice.", why: "Synthesis is the goal of the entire level. When pitch, rhythm, dynamics, vowels, silence, and contour all vary simultaneously, you're not doing exercises anymore — you're making music." },
        { text: "In the last minute, gradually simplify. Fewer notes, longer tones, more space. End on a sustained A — home. The exploration lands where it started: one note, deeply felt.", why: "Coming home to the root after a full pentatonic journey gives closure. It also demonstrates the emotional arc you can create: departure, exploration, return. This is the shape of every great musical journey." },
        { text: "Listen back to the full recording. How does it compare to your very first explorations (Phase 1, single root note)? The difference is the ramp — you KNOW these notes now because you lived in each one.", why: "Hearing your own growth is the most powerful motivator. The pentatonic exploration should sound dramatically more musical than your early one-note exercises — because it is. You earned every note." }
      ],
      feel: "This should feel like coming home to a house you built yourself — every room is familiar because you lived in each one. The five notes are friends, not strangers. The freedom feels earned, not overwhelming.",
      wrong: "If the five notes still feel random or overwhelming, go back to four notes (ss-4-1) for a while. There's no rush. The ramp works because each stage is fully internalized before the next one arrives. If three notes felt great but five feels chaotic, live in four until it's solid.",
      sarah: "Gene, compare how this feels to what it would have felt like at the start — jumping straight to five notes without the ramp. The difference is confidence. You KNOW these notes because you built them one at a time. This is what trusting the ramp sounds like.",
      drone: { root: "Am", octave: 3, texture: "pure" },
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true
    },

    // ─── PHASE 6: OTHER CHORD PALETTES ───

    {
      id: "ss-4-8",
      time: 7,
      title: "Major Palette — G Major",
      type: "vocal",
      what: "Apply the same palette thinking to G major. Root G (earth), major 3rd B (gold/sunshine — brighter than the minor 3rd!), 5th D (sky). The major triad has a COMPLETELY different emotional color — warm, open, bright. Your pentatonic exploration was in minor. Now feel major.",
      setup: "Guitar. Drone on G. Metronome at 80 BPM.",
      steps: [
        { text: "Strum G on autopilot. Turn on the drone (G). Sing the root G — hold it for 8 beats. This is a new home. It feels similar to A (stable, grounded) but the surrounding notes will be different colors.", why: "Establishing a new root resets your palette. You've lived in Am for the entire level — G major is a new tonal world with different emotional colors." },
        { text: "Sing the 5th (D) — hold for 8 beats. Open sky, just like E was over Am. The 5th always has this quality — spacious, stable, expansive. Same relationship, new notes.", why: "The 5th has the same character regardless of the chord — it's always the 'sky.' Recognizing this consistency across different chords builds your understanding of how chord tones work universally." },
        { text: "Sing the major 3rd (B) — hold for 8 beats. Feel the difference from C (the minor 3rd over Am). B is BRIGHT. Warm. Golden. Sunshine instead of blue. This is the major-minor fork — and it's a completely different emotional world.", why: "The major 3rd vs minor 3rd is the most important emotional distinction in Western music. Over Am, the 3rd was blue and aching. Over G, the 3rd is golden and warm. Same scale position, opposite emotional character." },
        { text: "Paint freely: G (earth), B (gold), D (sky). 2 minutes. Feel how the major palette has a fundamentally different character — brighter, more open, warmer. Think Jack Johnson, think beach at noon vs. beach at dusk.", why: "Internalizing the major palette as 'warm/golden' and the minor palette as 'blue/aching' gives you emotional language for chord colors. When you hear a major chord, you'll feel 'gold.' Minor = 'blue.' This is musical literacy through feeling." },
        { text: "Try the full major pentatonic: G-A-B-D-E ascending, E-D-B-A-G descending. Five notes over G major. Improvise freely for 2 minutes. Record it. Compare the feeling to your Am pentatonic improvisations.", why: "The major pentatonic over G is the bright, sunny counterpart to Am pentatonic. Experiencing both gives you two complete emotional palettes — all the colors of warmth AND all the colors of melancholy." }
      ],
      feel: "The G major palette should feel like stepping from a moody evening into warm afternoon sunlight. Same framework (root, 3rd, 5th), completely different emotional temperature. Gold instead of blue.",
      wrong: "If G major and Am feel the same emotionally, spend more time on the 3rd. Hold B (major 3rd) for 16 beats, then switch to C (minor 3rd over Am). The difference is the emotional hinge — everything else is similar. Keep switching until the contrast is visceral.",
      sarah: "Gene, your playlist has both colors — the golden warmth of surf-rock and the blue melancholy of desert blues. Now you can choose which palette to sing in. G major is your sunshine sound; Am is your golden-hour sound. Both are you.",
      drone: { root: "G", octave: 2, texture: "pure" },
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("G2", "D4"),
      recorder: true
    },
    {
      id: "ss-4-9",
      time: 7,
      title: "Palette Switching — Am to G",
      type: "vocal",
      what: "Alternate between Am palette (A-C-E, blue) and G palette (G-B-D, gold) every 4 bars. Feel the color shift as the chord changes. This is the foundation of singing over chord progressions — each chord gives you a new palette of colors to paint with.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am for 4 bars while singing A-C-E (blue palette). Then switch to G for 4 bars while singing G-B-D (gold palette). Repeat the cycle 4 times. Feel the emotional shift at each chord change — blue to gold, gold to blue.", why: "Palette switching is the foundation of singing over chord progressions. Each chord change brings a new set of colors — the singer's job is to hear the shift and respond with the appropriate palette." },
        { text: "Focus on the moment of the switch. As the chord changes from Am to G, your 'blue' notes (A-C-E) transform into 'gold' notes (G-B-D). Notice which note makes the biggest change: C (minor 3rd, blue) becomes B (major 3rd, gold). That one note shift changes the entire emotional color.", why: "The 3rd is the hinge between major and minor. Hearing the 3rd shift at each chord change is the most important ear-training skill for singing over progressions. It's the note that defines the mood." },
        { text: "Try smooth transitions: end your Am phrase on a note that's close to a G chord tone (E resolves naturally to D, or A sits inside both chords). The smoothest chord changes connect the two palettes rather than jumping between them.", why: "Voice leading — connecting chord tones smoothly across chord changes — is what makes melody flow through progressions. Finding the connecting notes between palettes is a core songwriting skill." },
        { text: "Reverse the emphasis: make Am feel bright and energetic, make G feel mellow and laid-back. Same notes, different emotional delivery. Prove that the palette is a starting point, not a prison.", why: "The palette gives you the NOTES; your delivery gives them EMOTION. A minor chord can be delivered with energy, and a major chord can be delivered with melancholy. You're not locked into 'minor = sad, major = happy.'" },
        { text: "Free improvisation: alternate Am and G in 4-bar blocks, painting freely with each palette. 2 minutes. Record it. Listen for the color shifts — do they sound like natural mood changes, or like two unrelated sections?", why: "Smooth palette switching is what makes songs feel like unified wholes rather than disconnected sections. When the color shifts feel natural, you're singing over chord changes — the fundamental skill of all popular music." }
      ],
      feel: "The switches should feel like natural mood shifts — like watching the sky change from blue to gold at sunset. Not abrupt, not forced, just a gentle emotional modulation. Each palette has its own warmth.",
      wrong: "If the chord changes sound like two separate songs rather than one flowing piece, focus on the transition moments. Sing a note that belongs to BOTH chords at the switch point (like the note E, which is the 5th of Am and the 6th of G — it works in both contexts).",
      sarah: "Gene, this is how songs work — each chord gives you a new palette, and the melody paints with whatever colors are available. When you can feel the shift between Am blue and G gold, you're hearing chord progressions the way songwriters hear them. That's a big deal.",
      pitchContour: true,
      metronome: 80,
      referencePitches: getPitchRange("G2", "E4"),
      recorder: true
    },

    // ─── PHASE 7: EXPRESSION & TEXTURE ───

    {
      id: "ss-4-10",
      time: 7,
      title: "Vowel Shape Exploration",
      type: "vocal",
      what: "Sing pentatonic notes while cycling through vowels: 'ooh' (intimate), 'ahh' (open), 'eee' (bright), 'oh' (warm), 'ay' (forward). Each vowel creates a different resonant space in your body. Your vowel choices will become a signature part of your vocal style.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am.",
      steps: [
        { text: "Strum Am on autopilot. Sing pentatonic notes on 'ooh' for 1 minute. Let the 'ooh' shape your mouth into a small circle. Notice the warmth and intimacy — 'ooh' is where lullabies and quiet confessions live.", why: "'Ooh' is the most intimate vowel — it focuses your breath into a narrow stream and creates a warm, close sound. It's the vowel of DOPE LEMON's whispery vocal style and late-night porch singing." },
        { text: "Switch to 'ahh' for 1 minute. Open your mouth wide. The sound gets bigger, brighter, more projecting. Same notes, completely different character. 'Ahh' fills a room.", why: "'Ahh' is the most open vowel — it projects naturally and carries emotion. Even in your laid-back register, 'ahh' has more presence and volume than 'ooh.' It's where emotional declarations live." },
        { text: "Try 'eee,' 'oh,' 'ay' — 30 seconds each. 'Eee' is bright and forward (nasal almost). 'Oh' is round and warm. 'Ay' is bright but open. Notice how each vowel sits in a different part of your mouth and resonates differently.", why: "Vowel awareness is foundational vocal technique. Professional singers choose vowels deliberately for their sonic properties. Some vowels project, some intimate, some cut through a mix. You're building a conscious toolkit." },
        { text: "Free improv: change vowels mid-phrase. Start a pentatonic phrase on 'ooh,' slide into 'ahh,' end on 'oh.' Let vowel changes add texture and emotional shift to your melody. 2 minutes.", why: "Vowel modulation is an advanced expressive technique that most singers never consciously develop. Building it now means your future songs will have natural vocal texture — the vowel choices support the emotional content of the words." },
        { text: "Try matching vowels to emotional intent: use 'ooh' for the quiet, mysterious pentatonic phrases and 'ahh' for the more open, emotional ones. Let the vowel SERVE the emotion. Record 2 minutes.", why: "Intentional vowel-emotion pairing is how great singers create consistent vocal identity. When vowel choice serves emotional intent, the voice sounds authentic and considered — never random." }
      ],
      feel: "Each vowel should feel like a different room — 'ooh' is a small intimate space, 'ahh' is a large open hall, 'eee' is bright and focused, 'oh' is warm and round. The melody stays the same; the rooms change.",
      wrong: "If all your vowels sound the same, you're not shaping your mouth distinctly enough. Exaggerate the shapes — make 'ooh' extremely round (like you're blowing out a candle) and 'ahh' extremely wide (like a doctor is checking your throat). The middle ground will emerge.",
      sarah: "Gene, listen to how BALTHVS and Khruangbin use vowel sounds as texture — 'ooh' and 'ahh' aren't random, they're color choices. Your vowel instincts will shape your songwriting style just as much as your note choices.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-4-11",
      time: 6,
      title: "Breath as Phrase",
      type: "vocal",
      what: "One breath = one phrase. Inhale, sing pentatonic notes for the length of your breath, stop when the air runs out. The breath shapes the phrase naturally — no counting, no planning. Your lungs become the composer.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Strum Am on autopilot over the backing track. Take a deep breath. Sing pentatonic notes (A-C-D-E-G) for as long as your breath lasts — then stop. Don't gasp for more air. Just stop. Silence until your next natural inhale.", why: "Breath-phrase coupling is how natural phrasing develops. Your lungs determine phrase length — not a metronome, not a bar count. This is how folk, blues, and reggae singers have always phrased." },
        { text: "Try short breaths: quick inhale, sing 2-3 pentatonic notes, stop. Then deep breaths: long inhale, sing a flowing 8-10 note phrase. Notice how breath depth changes phrase character — punchy vs. flowing.", why: "Short breaths create punchy, rhythmic phrases. Deep breaths create long, flowing lines. Both are valid musical tools — and your breath is the control mechanism." },
        { text: "Let the breath endings surprise you. Don't plan when to stop — just sing until the air runs out. The natural endings create organic phrase shapes that sound effortless and human.", why: "Planned phrase endings sound calculated. Breath-shaped endings sound natural. This is the difference between 'performing' and 'singing.' The natural cadence of your breath creates phrasing that listeners feel is authentic." },
        { text: "2-minute freestyle: breath-shaped pentatonic phrases over the backing track. Each phrase is exactly one breath long. Let the soul groove shape your note choices while your breath shapes your phrase lengths. Record it.", why: "When breath shapes your phrases, your singing sounds human and authentic. This is the phrasing style of DOPE LEMON, Angus Stone, Jack Johnson — effortless because it follows the body." },
        { text: "Listen back. The phrases should have a natural, organic quality — longer phrases that build, shorter phrases that punctuate, and silences between that let the music breathe. This is YOUR phrasing signature.", why: "Self-listening for phrasing quality teaches you to recognize natural vs. forced phrasing. The breath-shaped phrases should sound like you're talking in music, not executing a plan." }
      ],
      feel: "This should feel like sighing musically — each phrase is an exhale that happens to be pitched. No effort, no planning. Breathe in, sing out, rest. The groove carries you between phrases.",
      wrong: "If you're gasping for air or pushing past your breath to finish a phrase, you're overriding the exercise. Shorter phrases are fine — a 3-note phrase on a short breath is just as valid as a 10-note phrase on a deep breath. The breath IS the phrase.",
      sarah: "Gene, your laid-back vocal style is naturally breath-shaped — you don't belt or push. This exercise makes that instinct conscious and applies it to your full pentatonic vocabulary. Let your lungs be the composer.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-4-12",
      time: 6,
      title: "The Power of Silence",
      type: "vocal",
      what: "Strum Am for 4 bars. Sing pentatonic notes for 2 bars. Rest for 2 bars. Repeat. Then: sing 1 bar, rest 3. Then: sing a single note, rest 7 bars. Explore how silence creates anticipation and makes each note more powerful.",
      setup: "Guitar. Metronome at 80 BPM. Backing track.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Strum Am over the backing track. Sing pentatonic phrases for 2 bars, then rest (no voice) for 2 bars. Repeat this cycle 4 times. Let the silence feel intentional, not empty. The guitar and backing track fill the space.", why: "Silence is a musical element, not an absence. Planned rests create anticipation — the listener leans in, waiting for the next sound. The space between phrases is where the music breathes." },
        { text: "Increase the silence: sing for 1 bar, rest for 3 bars. The singing becomes rare and precious. Each pentatonic phrase carries more weight because there's so much space around it.", why: "Scarcity creates value. When you sing less, each note matters more. This is how Hermanos Gutiérrez and Tinariwen build drama — not through volume, but through restraint." },
        { text: "Maximum silence: sing a single pentatonic note, then rest for 7 bars. One note in 8 bars. Let the cinematic western backing track and guitar fill the space. That single note becomes an EVENT.", why: "A single note surrounded by 7 bars of silence is a compositional statement. You're learning that sometimes the most powerful thing you can do is almost nothing." },
        { text: "Free improv: vary your singing-to-silence ratio freely. Sometimes dense pentatonic phrases, sometimes a single note in a sea of space. Let the cinematic backing track inspire you — when does the music NEED your voice, and when does it need your silence? 2 minutes.", why: "Density control — choosing how much to sing — is one of the most advanced musical skills. Most beginners over-sing. Masters know when NOT to sing. The groove doesn't need you every bar." },
        { text: "Record 2 more minutes. This time, imagine you're scoring a scene — a lone figure walking through a desert, or standing on a cliff at sunset. Your voice is the narration. When does the narrator speak, and when does the landscape speak for itself?", why: "Connecting silence to imagery makes it intentional rather than accidental. When you choose silence for dramatic effect, every note that follows gains weight and meaning." }
      ],
      feel: "The silences should feel active, not awkward. You're choosing to be quiet — the music continues in the guitar and backing track. Your absence creates a space the listener fills with anticipation. When your voice returns, it means something.",
      wrong: "If the silences feel uncomfortable and you rush to fill them, that's the instinct this exercise is training you to overcome. Sit with the discomfort. The silence IS the music. If you can't resist singing, try counting the silent bars in your head to stay disciplined.",
      sarah: "Gene, Hermanos Gutiérrez barely sing at all — their music is 90% space and 10% voice, and that cinematic western sound is BUILT on silence. The backing track gives you that exact world. Let the space do the work.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true,
      volumeMeter: true
    },
    {
      id: "ss-4-13",
      time: 6,
      title: "Sing-Along Absorption",
      type: "vocal",
      what: "Pick a backing track and LISTEN for 30 seconds — hear where the groove breathes, where the accents fall, where silence lives. Then hum along, matching the track's energy and phrasing patterns. No chord tones to hit, no rules — just absorb the groove through your body. Mirror neuron research shows that active listening IS motor rehearsal.",
      setup: "Guitar optional. One backing track of your choice.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      steps: [
        { text: "Pick a backing track. Just LISTEN for 30 seconds with eyes closed. Don't play, don't hum. Where does the groove breathe? Where are the accents? Where is the silence? Map the groove in your body.", why: "Mirror neuron research shows that focused listening activates the same motor pathways as performing. When you deeply listen to a groove, your brain is rehearsing it — even in silence." },
        { text: "Start humming along — no specific notes, no pentatonic thinking. Just match the ENERGY of the track. When it's sparse, hum sparsely. When it fills up, hum more. You're absorbing phrasing patterns through imitation.", why: "Humming along with a reference is how musicians have learned for millennia — before notation, before theory. Your ear absorbs phrasing, timing, and dynamics faster through imitation than through instruction." },
        { text: "Now add your guitar (strum Am lightly). Keep humming along with the track. Let the track's groove shape your strum pattern AND your humming. You're a third instrument joining the band.", why: "Matching a track while playing trains entrainment — your body syncing to an external groove. This is the foundation of playing with other musicians and playing with feel." },
        { text: "Switch to a different backing track. Notice how your humming and strumming instantly change character. The reggae groove makes you sway differently than the desert blues. 2 minutes per track. Try all three.", why: "Different grooves pull different responses from you. Building the habit of listening-then-absorbing means every song you hear becomes a lesson in phrasing and feel." },
        { text: "On the third track, transition from humming to singing pentatonic notes. Let the groove you absorbed guide your note choices and phrasing. Record this final version.", why: "The transition from humming to pentatonic singing applies your absorbed groove vocabulary to your five-note palette. The groove shapes the melody — not the other way around." }
      ],
      feel: "This should feel like joining a conversation that's already happening — you're not leading, you're blending in. The track is the teacher. Your job is to absorb its phrasing, its timing, its attitude.",
      wrong: "If you're ignoring the track and doing your own thing, you're missing the exercise. The whole point is to let the track shape your response. Listen first, always. If your humming doesn't change when you switch tracks, you're not listening deeply enough.",
      sarah: "Gene, this is how you already learn music — you listen to Khruangbin and Skinshape, and their phrasing seeps into you. This exercise makes that absorption conscious and deliberate. Every listen is a lesson, every groove is a teacher.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-4-14",
      time: 8,
      title: "Object Writing — Sensory Vocabulary",
      type: "record",
      what: "Pat Pattison's #1 daily exercise from Berklee. Pick an object — a surfboard, a bonfire, a highway at dusk. Set a timer for 7 minutes. Write (or speak into your recorder) using ALL your senses: what does it look like, sound like, smell like, taste like, feel against your skin? What does your body feel internally? Where are you in space? No editing, no judging — just sensory flow.",
      setup: "Phone recorder or notebook. No guitar needed. Timer set to 7 minutes.",
      steps: [
        { text: "Pick an object that connects to your music — a wave, a desert road, a porch at sunset, a bonfire, a vintage amplifier. Something with sensory richness. Set a 7-minute timer.", why: "Pat Pattison at Berklee assigns this daily. The objects you choose reveal your artistic world. Songwriters who do this daily build a sensory vocabulary that makes lyrics vivid instead of generic." },
        { text: "Start the timer. Speak into your recorder (or write) using ALL 7 senses: sight, sound, smell, taste, touch, organic (internal body feelings — heartbeat, breath, tension), kinesthetic (your body's position in space). Don't stop. Don't edit. Just flow.", why: "The 7-sense framework forces you past the visual default. Most people describe what they SEE. Songwriters who access all senses create lyrics that listeners FEEL. 'The salt air coating my lips' beats 'the beautiful ocean' every time." },
        { text: "When the timer goes off, stop. Read or listen back. Circle or note any phrase that surprised you — something vivid, unexpected, or emotionally charged. These surprises are song seeds.", why: "The surprises are gold. Your conscious mind writes clichés. Your subconscious, freed by the timer pressure, produces original imagery. The circled phrases become future lyrics." },
        { text: "Try it again with a different object. This time, pick something from your musical life — the feeling of singing a note that locks with the chord, the sensation of a guitar string under your fingertip, the way a reggae groove makes your body sway.", why: "Object writing about musical experiences builds the vocabulary to write ABOUT music. Your lyrics will eventually describe musical moments with the same specificity you use for surfboards and sunsets." },
        { text: "Keep both recordings. These are raw material for future songwriting — you'll draw from them in Levels 6 and beyond. The sensory vocabulary you build now powers every lyric you'll ever write.", why: "Object writing is cumulative. Each session adds to your sensory database. Songwriters who practice this daily for months find that vivid imagery flows naturally into their lyrics — it becomes automatic." }
      ],
      feel: "This should feel like stream-of-consciousness — messy, surprising, sometimes nonsensical. The mess is where the gold hides. Don't try to write 'good' — try to write FAST and SPECIFIC.",
      wrong: "If you're writing abstract emotions ('I felt happy,' 'the sunset was beautiful'), you're staying on the surface. Dig into the senses: WHAT does happy feel like in your chest? What COLOR is the sunset — not 'orange' but 'the orange of old rust on a tailgate'? Specificity is everything.",
      sarah: "Gene, this is the foundation of every great lyric you've ever loved. 'Beautiful day that you know will end' — that's sensory, specific, embodied. Object writing builds the muscle that produces lines like that. Do this daily, even for 5 minutes, and your lyrics will transform.",
      recorder: true
    },
    {
      id: "ss-4-15",
      time: 6,
      title: "Pentatonic Groove Palette",
      type: "vocal",
      what: "Bridge exercise: now that you own the full pentatonic, apply it to groove contexts. Sing pentatonic phrases over two contrasting backing tracks — notice how the same five notes feel completely different depending on the groove underneath. The palette is fixed; the feel transforms everything.",
      setup: "Guitar. Metronome at 80 BPM. Backing tracks.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      steps: [
        { text: "Play the Reggae One Drop track. Strum Am on autopilot. Sing pentatonic phrases (A-C-D-E-G) that fit the reggae pocket — bouncy, offbeat, laid-back. Let the groove shape your note choices and phrasing. 2 minutes.", why: "The reggae groove pulls specific rhythmic responses from you. Your pentatonic notes will land differently — more offbeat, more space, more bounce. The groove teaches you a feel." },
        { text: "Switch to Desert Blues. Same five notes. Completely different energy — sparse, hypnotic, meditative. Let longer spaces between phrases. Hold notes longer. Let the desert groove slow your phrasing down. 2 minutes.", why: "Desert blues is the opposite of reggae's bounce — it's wide, open, and patient. The same pentatonic notes feel ancient and spacious instead of bouncy and bright. The groove is the difference." },
        { text: "Switch back and forth: 1 minute reggae, 1 minute desert blues. Feel how your voice adapts to each groove. Same notes, same scale, same you — different music entirely.", why: "Rapid switching proves that your five notes are a versatile palette. The GROOVE determines the genre, not the notes. This is a key insight for songwriting — change the feel and you change the song." },
        { text: "Pick the groove that felt more natural to you. Spend 2 more minutes in it, letting your pentatonic improvisation deepen. Record it.", why: "Your natural groove preference reveals something about your artistic identity. The genre you feel most at home in is a starting point, not a destination." },
        { text: "Listen back. Your pentatonic improvisation should sound genre-appropriate — the reggae version should bounce, the desert blues version should breathe. If both sound the same, the groove hasn't gotten into your body yet.", why: "Genre-appropriate phrasing means the groove has shaped your musical instincts. When the same five notes sound like two different genres, you've internalized feel — not just notes." }
      ],
      feel: "This should feel like the same five colors painted on two different canvases — one vibrant and bouncy, one wide and meditative. The notes are tools; the groove is the artist directing your hand.",
      wrong: "If your reggae and desert blues versions sound identical, you're ignoring the groove. Let the backing track lead — match its energy, its density, its rhythmic placement. The groove tells you HOW to sing your notes.",
      sarah: "Gene, this is exactly the skill that Khruangbin has mastered — they use the same pentatonic vocabulary but shift effortlessly between Thai funk, dub reggae, and desert blues. The notes don't change; the feel does. You're building that versatility.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "G4"),
      recorder: true
    },

    // ─── PHASE 8: RHYTHM & FEEL — APPLIED TO PENTATONIC ───

    {
      id: "ss-4-16",
      time: 8,
      title: "Groove Lock",
      type: "guitar",
      what: "Strum along with a backing track and LOCK into the groove. Don't just play in time — feel where the drums, bass, and guitar create a unified pulse. When you're locked in, your strum becomes part of the recording. This is 'entrainment' — your body syncing to external rhythm. Now that you own the pentatonic, you can add vocal colors while staying locked.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Play the Groove Beat track. Just listen for 30 seconds. Find the kick drum. Find the snare. Find the hi-hat. Know where each one lives.", why: "Identifying the drum elements lets you sync your strum to specific rhythmic anchors. The kick is beat 1, the snare is beat 2 and 4." },
        { text: "Start strumming along — simple downstrokes first. Match your strum to the hi-hat rhythm. When your strum disappears into the track, you're locked.", why: "The 'disappearing strum' test: if you can't hear your guitar as separate from the recording, your timing is perfect." },
        { text: "Switch to the Dub Reggae track. Change your strum to offbeat chops. Lock into the reggae pocket — your chops should sit between the kicks.", why: "Different genres have different pockets. Locking into reggae after a straight groove proves your rhythm is adaptable, not rigid." },
        { text: "Try this: close your eyes and feel where the groove 'wants' your strum. Let the backing track pull your hand. Don't think — just feel.", why: "Entrainment is subconscious. When you stop thinking about timing and let the groove carry you, that's real musicianship." }
      ],
      feel: "When you're locked into a groove, it feels effortless — like the music is playing you. Your body moves naturally. Time disappears. This is the 'flow state' of rhythm.",
      wrong: "If your strum sounds separate from the track (you can clearly hear two rhythmic sources), you're not locked. Adjust micro-timing: try playing slightly behind the beat (laid-back) or right on top.",
      sarah: "Gene, groove lock is the difference between a metronome player and a musician. Your favorite artists — Khruangbin, Skinshape — have supernatural groove. This exercise builds that feel.",
      metronome: 90,
      recorder: true
    },
    {
      id: "ss-4-17",
      time: 8,
      title: "Feel Shifts",
      type: "guitar",
      what: "Play the SAME chord progression (Am-C-G-Em) in 4 different genre feels: reggae offbeat, surf jangle, soul strum, and desert blues. Same chords, totally different vibes. Your right hand creates the genre — not your left. Now that you have the full pentatonic, notice how the SAME notes feel completely different depending on the strum pattern underneath. This is constraint-led approach (CLA): same task, different movement solutions.",
      steps: [
        { text: "Reggae: muted offbeat chops at 85 BPM. Am-C-G-Em. Choppy, bouncy, laid-back. 2 minutes.", why: "The reggae chop emphasizes the 'and' of each beat. It creates space — the silence between chops is as important as the sound." },
        { text: "Surf jangle: continuous 8th-note down-up at 100 BPM. Same chords. Shimmering, continuous, bright. 2 minutes.", why: "Jangle is the opposite of reggae — constant motion instead of space. Same chords, completely different energy." },
        { text: "Soul strum: relaxed 16th-note pattern at 80 BPM with ghost strums (light touches between real strums). Same chords. Warm, groovy. 2 minutes.", why: "Soul strum is about pocket — playing slightly behind the beat with ghost notes that add texture without volume." },
        { text: "Desert blues: sparse, thumb-heavy downstrokes at 75 BPM with long spaces between strums. Same chords. Hypnotic, minimal. 2 minutes.", why: "Desert blues is the most sparse feel — space is the instrument. Tinariwen, Ali Farka Touré. Less is more." },
        { text: "Your pick: which feel suits you best? Spend 3 more minutes in that feel. That's your 'home groove' for now.", why: "Identifying your home groove is an act of artistic identity. It tells you what genre your songs want to live in." }
      ],
      feel: "Each feel shift should feel like changing clothes — same body, different outfit. The chords stay familiar; only the energy and timing transform. One of these will feel like HOME.",
      wrong: "If all four feels sound the same, your right hand isn't changing enough. Reggae should sound nothing like jangle. Record yourself and compare.",
      sarah: "Gene, your playlists tell me reggae and surf are your home feels. But trying soul and desert blues might surprise you — Khruangbin lives in that soul-desert overlap.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Ska Upbeat 95", src: "/ska-upbeat-95.mp3" }, { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Drums Only — Surf 120", src: "/drums-surf-120.mp3" }],
      metronome: 85,
      recorder: true
    },
    {
      id: "ss-4-18",
      time: 6,
      title: "Syncopation",
      type: "vocal",
      what: "Sing notes BETWEEN the guitar strums — on the 'ands' instead of the beats. This is syncopation: the secret ingredient that makes vocal melodies feel alive instead of robotic. Now that you own the full pentatonic, apply syncopation to your five-note vocabulary — the rhythmic displacement makes every note choice more interesting. Based on Stoloff's approach: rhythmic displacement before melodic complexity.",
      steps: [
        { text: "Strum Am at 80 BPM, simple downstrokes on beats 1-2-3-4. While strumming, sing an A note — but ONLY on the 'and' after beat 1. Strum... sing... strum... rest... strum... rest... strum... rest.", why: "Singing between strums is the opposite of what your brain wants to do. It wants to sync voice and hand. Separating them is the key to interesting rhythm." },
        { text: "Now sing on the 'and' of beats 1 AND 3. Two syncopated notes per bar. The voice lands between strums.", why: "Two offbeat notes per bar creates the reggae vocal feel. Notice how it naturally creates a laid-back, behind-the-beat sensation." },
        { text: "Try singing on all four 'ands' — every note between the strums. Your voice fills the gaps. This is the most syncopated pattern possible.", why: "Full offbeat singing creates the classic ska/reggae vocal style. It also appears in surf-pop and psychedelic rock." },
        { text: "Mix it up: sing some notes ON the beat and some BETWEEN. Create your own rhythmic pattern. Record it.", why: "Mixing on-beat and off-beat creates the most musical vocal rhythms. Every great melody does this." }
      ],
      feel: "Syncopation should feel groovy — like your voice is dancing between the guitar beats. When it clicks, you'll feel a swing that doesn't exist when voice and guitar land together.",
      wrong: "If all your notes land on the beat with the strum, that's singing in unison with the guitar — not wrong, but not syncopated. Practice placing notes deliberately between strums.",
      sarah: "Gene, syncopation is what makes DOPE LEMON and Skinshape vocals feel so cool. They're singing between the guitar, not on top of it. This exercise teaches that feel.",
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      metronome: 80,
      referencePitches: getPitchRange("A3", "A3"),
      recorder: true
    },
    {
      id: "ss-4-19",
      time: 6,
      title: "Body Percussion Layering",
      type: "rhythm",
      what: "Four-layer body percussion: foot stomp (beats 1 and 3), knee pat (beats 2 and 4), clap (offbeats), and voice counting subdivisions. Build layers one at a time. This is advanced Dalcroze: 4 independent rhythmic streams from one body — the physical architecture of singing while playing.",
      setup: "Seated or standing. Metronome at 85 BPM. No instrument.",
      steps: [
        { text: "Layer 1: stomp your foot on beats 1 and 3. Just the foot. Lock it to the metronome until it's automatic — at least 30 seconds of perfect time.", why: "The foot is the deepest body rhythm. In Dalcroze training, the feet always come first because they connect to your body's center of gravity." },
        { text: "Layer 2: add knee pats on beats 2 and 4. Stomp-pat-stomp-pat. Two layers running simultaneously. Keep both locked to the metronome.", why: "Feet on 1-3 and hands on 2-4 creates the complete basic groove. This is the body percussion equivalent of a kick-snare pattern." },
        { text: "Layer 3: add claps on the offbeats (the 'ands'). Stomp... clap... pat... clap... stomp... clap... pat... clap. Three simultaneous rhythmic streams.", why: "Offbeat claps add the hi-hat layer. Three independent body rhythms running simultaneously is a serious coordination challenge — and exactly what singing over guitar demands." },
        { text: "Layer 4: add your voice counting subdivisions — '1-e-and-a, 2-e-and-a, 3-e-and-a, 4-e-and-a' — while maintaining all three body layers.", why: "Four independent rhythmic outputs is the maximum most people can manage. If you can do this, your body has internalized rhythm deeply enough to handle any vocal-guitar independence challenge." },
        { text: "If Layer 4 falls apart, drop back to 3 layers and build up again. The goal is smooth, relaxed coordination — not tense concentration.", why: "Motor learning research: if you're gritting your teeth, the coordination isn't learned yet. It should feel easy and groovy when it's truly internalized." }
      ],
      feel: "When all four layers lock in, it should feel like you ARE a drum kit — each limb and your voice operating independently but creating one unified groove.",
      wrong: "If adding a new layer causes the previous layers to falter, the earlier layers aren't automatic yet. Spend more time on fewer layers before stacking.",
      sarah: "Gene, this is the exercise that makes everything else easier. Once your body can run 4 independent rhythm streams, singing over guitar strum patterns will feel like a vacation.",
      tracks: [{ name: "Drums Only — Afrobeat 110", src: "/drums-afrobeat-110.mp3" }],
      metronome: 85
    },

    // ─── CAPSTONE ───

    {
      id: "ss-4-20",
      time: 6,
      title: "Whisper to Full Voice",
      type: "vocal",
      what: "Dynamic range exploration with pentatonic notes. Move from barely audible whisper to full chest voice and back — with all five pentatonic notes available. Dynamics in isolation: same chord, same scale, just volume as a creative variable.",
      setup: "Guitar. Metronome at 80 BPM. Strum Am softly.",
      steps: [
        { text: "Strum Am very softly. Sing pentatonic notes in a near-whisper — your voice should barely rise above the guitar. Hold notes, drift between pitches, keep everything quiet and intimate. This is your DOPE LEMON register.", why: "Singing quietly requires more breath control than singing loudly. It also creates intimacy — the listener leans in. Many of your favorite artists live in this whisper range." },
        { text: "Gradually increase volume over 8 bars until you're singing pentatonic phrases at full chest voice. The strum should get louder too — guitar and voice grow together. Feel the energy build.", why: "A volume crescendo is the simplest form of musical drama. Learning to build intensity gradually is a fundamental songwriting and performance skill — the slow burn that makes a climax satisfying." },
        { text: "Now reverse: start at full voice and gradually fade to a whisper over 8 bars. Pulling back requires more control than pushing forward. Let the pentatonic phrases simplify as the volume drops — fewer notes, more space.", why: "Decrescendo is harder because your body wants to stay at the louder, easier volume. Control over the fade is what separates amateurs from artists. The fade creates tenderness and intimacy." },
        { text: "Free improv: move through your dynamic range unpredictably while singing pentatonic phrases. Whisper for 4 bars, then suddenly full voice for 2 bars, then back to medium. Surprise yourself. 2 minutes.", why: "When dynamics become a variable you control consciously, your improvisation gains a third dimension beyond pitch and rhythm. Unpredictable dynamics keep the listener engaged and the music alive." },
        { text: "Final pass: pair dynamics with pentatonic range. Low notes (A, C) sung quietly. High notes (E, G) sung louder. Then reverse: low notes loud, high notes whispered. Feel how dynamic pairing with pitch creates different emotional landscapes. Record it.", why: "Pairing dynamics with pitch range is a compositional technique. 'High = loud' is the natural instinct. 'High = soft' is the unexpected choice that creates surprise and beauty. Both are tools in your kit." }
      ],
      feel: "The whisper should feel private and close — singing for yourself. The full voice should feel open and projecting — singing for the room. The transitions should feel like sunrise and sunset — gradual, natural, inevitable.",
      wrong: "If you're stuck at one volume the whole time, you're ignoring the most powerful expressive tool you have. Push the extremes — whisper so quietly you can barely hear yourself, then open up to fill the room. The range between those extremes is your dynamic palette.",
      sarah: "Gene, your porch register naturally lives in the quieter range — that's your sweet spot. But even DOPE LEMON has dynamic peaks, and Allah-Las build from whisper to wall of sound. This exercise builds the full range around your natural center, with your full pentatonic vocabulary underneath.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can walk stepwise through 4 notes, improvise freely across the full Am pentatonic, hold musical conversations at every note stage, switch between minor and major palettes, lock into backing track grooves, shift between 4 genre feels on the same progression, sing syncopated rhythms between beats, layer 4 independent body percussion streams, use silence and dynamics as expressive tools, absorb grooves through listening, and build sensory vocabulary through object writing — all while the guitar strum stays on autopilot."
    }
  ]
};
