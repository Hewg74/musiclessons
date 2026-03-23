import { getPitchRange } from "../appData.js";

export const level11 = {
  num: 11, name: "Scale Freedom", focus: "Full diatonic scale, modal colors, chromatic passing tones",
  duration: "47 min",
  setup: "Guitar for drone/chords. Pitch Detector on. Backing tracks ready.",
  subtitle: "Scale Freedom",
  description: "Level 6 gave you the pentatonic sandbox — five safe notes. Now you add the two 'tension' notes (Fa and Ti) to complete the full major scale. These notes change everything: Fa pulls toward Mi, Ti pulls toward Do — and you will feel that pull in your body. Tension notes recruit more somatosensory cortex than consonant ones (PMC5608010); the dissonance is literally physical, a tightening in the throat and jaw that resolves when the note moves home. You'll also explore modal colors — Dorian for reggae, Mixolydian for surf-rock — each mode with its own body feeling, its own emotional posture. Chromatic passing tones add sophistication to your melodic vocabulary. The hear-feel-choose cycle is second nature now; in this level, you expand the palette of what you can choose. This is where melodic freedom truly begins.",
  artists: "Khruangbin, Tinariwen, Jeff Buckley, Radiohead",
  unlocks: "Making It Up (Level 12)",
  review: { label: "Level 9 Check-In", time: 5, exercises: ["v9e1", "v9e3"], prompt: "Sing a 3rd harmony over a recorded melody (v9e1). Then record and stack a 2-voice harmony (v9e3). Harmony skills are perishable." },
  exercises: [
    {
      id: "v11e0", time: 4, title: "Diagnostic — Beyond Pentatonic", type: "vocal",
      what: "Improvise freely over a backing track and notice what your voice naturally reaches for. Do you gravitate toward the five pentatonic notes, or do you already wander into Fa and Ti territory? This baseline recording reveals your current melodic vocabulary — the notes your ear considers 'home' versus the ones that feel foreign.",
      setup: "Khruangbin-style backing track. No guitar — just voice. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        {
          text: "Start the Khruangbin-style backing track. Close your eyes and improvise a melody for 90 seconds — no planning, no thinking about theory. Just sing whatever comes naturally over the groove.",
          why: "This is a pure diagnostic. Your default improvisational vocabulary reveals which notes your auditory cortex considers 'safe.' Most untrained singers default to pentatonic patterns because the brain has heard them in thousands of songs — they are statistically the most common intervals in Western and global music. What you sing without thinking IS your current melodic vocabulary."
        },
        {
          text: "Watch the Pitch Detector during a second 90-second pass. This time, pay attention to which notes you hit. Are you staying on A, C, D, E, G (A minor pentatonic)? Or are you naturally reaching for B and F as well?",
          why: "The pentatonic scale (five notes) is the brain's melodic comfort zone — it appears independently in music from West Africa, China, Scotland, and the American blues tradition. The two 'missing' notes (the 2nd and 6th in minor, or the 4th and 7th in major) are the ones that create tension. If you never land on them, that tells us your ear hasn't yet categorized them as available options. If you do land on them, notice whether it feels deliberate or accidental."
        },
        {
          text: "Listen to your recording. Mark the moments where your melody feels 'stuck' — repeating the same 3-4 note pattern. Also mark any moments where you surprised yourself with an unexpected note.",
          why: "Melodic ruts are a sign that your available palette is too small. When the brain runs out of 'safe' notes, it loops. The surprise moments — notes you didn't plan — are your ear reaching beyond its comfort zone. Those surprises are the seeds of scale freedom."
        },
        {
          text: "Rate your current pentatonic comfort on a scale of 1-5 (5 = totally fluent, can improvise freely within pentatonic). Then rate your diatonic comfort (how natural do the 4th and 7th scale degrees feel). Write both numbers down.",
          why: "Self-assessment creates a baseline. At the end of this level, you'll retake this diagnostic and compare. Most students rate their pentatonic comfort 2-3 points higher than their diatonic comfort — that gap is exactly what this level closes."
        },
        {
          text: "Save this recording with today's date. Label it 'Level 11 Diagnostic — Before.' You'll compare it to your Level 11 Integration recording at the end.",
          why: "The before/after comparison is one of the most motivating moments in vocal training. Hearing your own growth is more convincing than any teacher's praise. The difference between a 5-note vocabulary and a 12-note vocabulary is audible, dramatic, and permanent."
        }
      ],
      feel: "This should feel like a low-pressure jam session — not a test. There are no wrong notes in a diagnostic. The goal is to capture your current state honestly, not to perform well.",
      wrong: "If you catch yourself trying to sound impressive or avoiding 'weird' notes, reset. The diagnostic only works if you sing naturally. Trying to include fancy notes defeats the purpose — we need to see what your default is.",
      sarah: "Gene, this is just a snapshot. No judgment. When I do this with students, most of them discover they're living in a 4-5 note world without realizing it. That's not a failure — it's a starting point. By the end of this level, you'll hear this recording and barely recognize the limitation.",
      levelUp: "Honest baseline recording completed. Pentatonic and diatonic comfort ratings documented."
    },
    {
      id: "v11e1", time: 4, title: "The Full Major Scale with Solfege", type: "vocal",
      what: "Do-Re-Mi-Fa-Sol-La-Ti-Do — the complete seven-note major scale in C major, ascending and descending. The two NEW notes compared to pentatonic are Fa (the 4th, F) and Ti (the 7th, B). These are the tension notes — they want to resolve. Fa pulls DOWN to Mi. Ti pulls UP to Do. Learning to sing and feel these two notes transforms your melodic vocabulary from a five-lane highway into a full city grid.",
      setup: "Guitar playing a C major chord as a drone (or just the note C). Pitch Detector on. Standing.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 72,
      steps: [
        {
          text: "Play a C note on guitar (3rd fret A string) and let it ring. Sing Do-Re-Mi-Fa-Sol-La-Ti-Do ascending, one note per beat at 72 BPM. Use solfege syllables. As you ascend, feel the vibration climb through your body: Do sits in the chest, Mi warms the throat, Sol brightens the mask, and high Do buzzes near the forehead. The scale is a body journey from low to high. Watch the Pitch Detector — every note should land clean.",
          why: "Solfege syllables are not just a teaching tool — they create distinct motor patterns for each scale degree. Research by neuroscientist Robert Zatorre at McGill shows that singing with syllables activates both the auditory cortex AND the motor planning regions (premotor cortex) simultaneously. Each syllable becomes a physical 'handle' for the abstract concept of a pitch. Singing with solfege literally builds more neural connections per note than singing on 'la' or 'ah.'"
        },
        {
          text: "Now descend: Do-Ti-La-Sol-Fa-Mi-Re-Do. Same tempo. Notice: going DOWN through Ti and Fa feels different than going up. Ti descending feels like stepping off a ledge. Fa descending feels like settling into a chair.",
          why: "The brain processes ascending and descending intervals differently. Ascending intervals activate anticipation circuits (the note is 'reaching' for something). Descending intervals activate resolution circuits (the note is 'arriving' somewhere). This is why the same two notes — Fa and Ti — feel different depending on direction. Your auditory cortex is building TWO representations of each note: one for ascending context, one for descending."
        },
        {
          text: "Isolate the two new notes. Sing Mi-Fa-Mi three times. Really hear the half step between Mi and Fa — it is a tiny interval, just one fret on guitar. Feel it in your body: Fa creates a subtle tightening, a friction you can sense in your throat and jaw that Mi does not have. Now sing La-Ti-La three times. Another half step. Ti pulls upward — you may feel it as a brightening in the mask, an urgency that wants to resolve to Do. These half steps are what make the major scale different from pentatonic, and they live in the body as tension you can physically feel.",
          why: "Pentatonic scales avoid half steps entirely — that's what makes them sound 'safe' and universally pleasant. The major scale includes two half steps (Mi-Fa and Ti-Do), and these half steps create TENSION. Tension is not a problem — it's the engine of melody. Without tension, music has no forward motion. The half step creates a gravitational pull: Fa wants to fall to Mi, Ti wants to rise to Do. Learning to feel this pull is the foundation of everything in this level."
        },
        {
          text: "Sing the full scale three times ascending and descending. Each time, slightly emphasize Fa and Ti — give them a tiny accent, a little more weight. Let yourself FEEL the pull of each tension note toward its resolution.",
          why: "Emphasizing the tension notes trains what psychologists call 'categorical perception' — the ability to hear a note not just as a frequency, but as a FUNCTION. Fa is not just 'the note F.' Fa is 'the note that wants to go to Mi.' This functional hearing is what separates trained musicians from casual listeners. Once you hear notes as functions, you can't unhear it — and your improvisations will become dramatically more intentional."
        },
        {
          text: "Final pass: sing the scale but PAUSE on Fa for 2 extra beats before resolving to Mi. Then PAUSE on Ti for 2 extra beats before resolving to Do. Sit in the tension. Don't rush the resolution.",
          why: "The ability to delay resolution — to sit in tension comfortably — is what creates emotional power in melody. Think of Jeff Buckley holding a note that 'shouldn't' work, letting it ache, before finally resolving. That ache IS the suspended tension note. Your brain's reward system (the nucleus accumbens) actually responds MORE strongly to a resolution that was delayed. Training yourself to hold tension literally makes your resolutions more satisfying — to you and to your listener."
        },
        {
          text: "Record one clean ascending and descending pass. Label the notes on the Pitch Detector as you go. Save this as your 'clean scale' reference.",
          why: "A clean reference recording gives you something to compare against as the level progresses. When you start adding modal variations and chromatic passing tones, having this 'vanilla' major scale as a baseline helps your ear track what's changing and why."
        }
      ],
      feel: "The scale should feel like a complete journey — departure (Do), travel (Re-Mi-Fa-Sol-La-Ti), and arrival (high Do). Each note has a personality. Do is home. Re is stepping out. Mi is confident. Fa is restless. Sol is stable. La is warm. Ti is urgent. High Do is return.",
      wrong: "If Fa and Ti feel random rather than pull-y, you're not hearing the half steps yet. Go back to the Mi-Fa-Mi isolation. Play both notes on guitar so your ear can lock onto the interval. If the Pitch Detector shows you're flat on Ti, you're pulling it down because your ear wants to avoid the tension — lean INTO the pitch instead.",
      sarah: "Gene, you already know five of these notes from pentatonic work. You're not starting from scratch — you're filling in two gaps. And those two gaps? They're the most expressive notes in the scale. Fa and Ti are where the emotion lives. Pentatonic is the skeleton; the full scale is the body.",
      levelUp: "Clean ascending and descending major scale with solfege, Pitch Detector showing accurate Fa and Ti, and audible pauses on tension notes before resolution."
    },
    {
      id: "v11e2", time: 4, title: "Tension and Resolution", type: "vocal",
      what: "Exercises focused exclusively on Fa and Ti — the two tension notes that separate the major scale from pentatonic. You'll practice approaching them, sitting on them, resolving them, and NOT resolving them. Being comfortable with tension is what makes interesting melodies — any songwriter can resolve, but only a good songwriter knows when to hang.",
      setup: "Guitar droning a C chord. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 66,
      steps: [
        {
          text: "Sing Mi-Fa-Mi four times at 66 BPM. Really hear the half-step rub between Mi and Fa. Mi is the 3rd of the C chord — it belongs, and your body relaxes into it. Fa is NOT in the C chord — it is a visitor. Feel how Fa creates friction against the drone: a physical tightening in the throat and jaw, a dissonance you sense in your body before your mind names it. That somatic tension is real — PMC5608010 found that dissonant intervals recruit more somatosensory cortex than consonant ones.",
          why: "The interval between Mi (E) and Fa (F) is a half step — the smallest interval in Western music. When you sing Fa over a C major chord, it creates a dissonance called a 'minor 9th' against the root. This dissonance is not an error — it's a tool. The brain's auditory cortex responds to dissonance with heightened attention. Literally: your listener pays more attention when you sing Fa. The resolution to Mi releases that attention into satisfaction. This tension-release cycle is the neurochemical basis of musical emotion."
        },
        {
          text: "Now sing Ti-Do-Ti four times. Ti (B) is a half step below Do (C). Feel how Ti pulls UPWARD toward Do — it's like a magnet. The higher you sing Ti, the more it wants to go to Do.",
          why: "Ti is called the 'leading tone' in music theory, and the name is literal — it LEADS to Do. This upward pull is so strong that in 500 years of Western music, composers almost never leave Ti unresolved. The brain expects Do after Ti with near-certainty. When you sing Ti-Do, you're satisfying one of the strongest harmonic expectations the human auditory system has. When you DON'T resolve Ti... you create enormous tension."
        },
        {
          text: "Practice NOT resolving. Sing Do-Re-Mi-Fa... and STOP on Fa. Hold it for 4 beats. Feel the itch to resolve down to Mi. Now sing Sol-La-Ti... and STOP on Ti. Hold for 4 beats. Feel the pull toward Do. Don't give in.",
          why: "This is the critical skill: tolerance for tension. Most beginner singers rush through tension notes because the unresolved feeling is uncomfortable. But the ability to sit on an unresolved note — to let it ache — is what creates emotional depth in melody. Think of Radiohead: Thom Yorke frequently hangs on Ti or Fa for entire phrases, letting the tension build until the resolution hits like a wave. Training yourself to HOLD tension rather than flee from it rewires your musical instincts from 'safe' to 'expressive.'"
        },
        {
          text: "Approach tones: sing Sol-La-Ti-Do (approaching Do from below through Ti). Then sing Re-Do-Ti-Do (approaching Do from above, touching Ti, returning). Then Sol-Fa-Mi (approaching Mi from above through Fa). Practice each approach 4 times.",
          why: "Approach tones are how tension notes function in real melodies. You rarely just sing Fa or Ti in isolation — you approach them from a neighboring note, pass through them, and resolve. These three approach patterns (ascending through Ti, descending touch on Ti, descending through Fa) cover about 80% of how these notes appear in the music you love. Practicing them as patterns means your voice will find them automatically when improvising."
        },
        {
          text: "Delayed resolution exercise: sing Do-Re-Mi-Fa... hold Fa for 2 beats... then Mi. Now extend: hold Fa for 4 beats, then 6, then 8. How long can you sit in the tension before resolving? Do the same with Ti: Sol-La-Ti... hold... Do.",
          why: "This exercise directly trains the neural pathway between tension tolerance and musical expression. Every beat you hold a tension note, your brain is learning that unresolved does not mean wrong. Professional jazz singers can hold a tension note for entire bars because their brain has learned that tension is a resource, not a problem. You're building that same capacity."
        },
        {
          text: "Creative resolution: instead of resolving Fa down to Mi, try resolving it UP to Sol. Instead of resolving Ti up to Do, try resolving it DOWN to La. These unexpected resolutions are what make melodies surprising.",
          why: "Standard resolutions (Fa to Mi, Ti to Do) satisfy expectations. Non-standard resolutions (Fa to Sol, Ti to La) subvert them. Both are useful. The ear expects the standard resolution, so when you give the non-standard one, it creates a moment of surprise — a melodic plot twist. Jeff Buckley and Radiohead use non-standard resolutions constantly. Training both pathways gives your improvisational brain MORE options at every tension point."
        }
      ],
      feel: "Tension should feel like stretching a rubber band — there's energy in the stretch, and the release is proportional to how far you pulled. If you're not feeling any tension on Fa or Ti, you're not hearing the harmonic context yet. Make sure the C drone is audible.",
      wrong: "If Fa and Ti sound like any other notes to you, the drone might be too quiet. Crank the guitar drone up — the tension only exists in RELATIONSHIP to the chord. If you're rushing through the holds, set the metronome and count beats. The hold is the exercise.",
      sarah: "Gene, this is where your guitar background is actually a superpower. You already know what chord tones sound like because you play them every day. Fa and Ti are the notes that DON'T belong to the chord — and your guitarist ear already knows something sounds different about them. We're just giving that instinct a name and a technique.",
      levelUp: "Can hold Fa and Ti for 8+ beats without rushing resolution. Can perform both standard and non-standard resolutions deliberately."
    },
    {
      id: "v11e3", time: 4, title: "Dorian Mode — The Reggae/Jazz Sound", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "The Dorian mode is a natural minor scale with a raised 6th degree. In A Dorian: A-B-C-D-E-F#-G. That F# (instead of F natural) gives the scale a lighter, more optimistic quality than regular minor — jazzy, soulful, and deeply connected to reggae. This is the sound of Khruangbin, Santana, and every great reggae riddim.",
      setup: "Guitar droning Am (or Am7). Dub Reggae 85 or Khruangbin Style 80 backing track. Pitch Detector on.",
      referencePitches: getPitchRange("A2", "A3"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 80,
      tracks: [
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }
      ],
      steps: [
        {
          text: "Play an Am chord and sing the A natural minor scale: A-B-C-D-E-F-G-A. Now sing A Dorian: A-B-C-D-E-F#-G-A. The ONLY difference is F# instead of F. Sing both scales back to back, listening for the one-note difference.",
          why: "Modes are not new scales — they're variations on scales you already know. Dorian differs from natural minor by exactly one note: the 6th degree is raised a half step. This single change transforms the emotional color from dark and heavy (natural minor) to warm and sophisticated (Dorian). Your brain processes this as a 'brightness shift' — the raised 6th adds a major-key flavor to a minor-key context, creating ambiguity that the auditory cortex finds compelling."
        },
        {
          text: "Isolate the difference: sing E-F-E (natural minor 6th) then E-F#-E (Dorian 6th). Go back and forth 4 times. The F sounds dark and heavy — feel how it pulls the resonance downward, settling into the throat. The F# sounds light and open — feel how it lifts the vibration toward the mask, brightening the cheekbones. Each mode has a body posture, and this one-note shift changes where the music lives in your skull.",
          why: "The 6th degree is the 'color note' of Dorian — it's what makes the mode identifiable. When music theorists talk about 'modal color,' they mean the one or two notes that differentiate a mode from its parent scale. Training your ear on this specific note means you can identify Dorian anywhere: in a Khruangbin groove, a Santana solo, or a Miles Davis recording. Categorical perception of the raised 6th is the goal."
        },
        {
          text: "Start the Dub Reggae 85 track. Improvise a melody using ONLY A Dorian notes (A-B-C-D-E-F#-G). Emphasize the F# — land on it at the end of phrases, use it as a springboard. Let the reggae groove carry you.",
          why: "Reggae is one of the natural homes of Dorian. The raised 6th gives reggae its characteristic warmth — it's minor-key music that doesn't sound sad. Bob Marley, Peter Tosh, and modern reggae-influenced artists like Khruangbin all lean on this sound. By improvising over a reggae groove in Dorian, you're connecting the abstract concept of a mode to the physical, embodied experience of a genre you love."
        },
        {
          text: "Switch to the Khruangbin Style 80 track. Same A Dorian scale, but change your vocal approach: longer phrases, more space, more float. Let the F# appear naturally in your lines rather than forcing it.",
          why: "Khruangbin's music sits squarely in Dorian territory — Laura Lee's bass lines and Mark Speer's guitar solos both emphasize the raised 6th. By improvising in this context, you're training your ear to hear Dorian not as a theoretical concept but as a SOUND you recognize from music you already love. This recognition is powerful: once you hear it, you'll notice Dorian everywhere in your playlist."
        },
        {
          text: "Dorian melody patterns: sing A-C-E-F#-E (arpeggio with Dorian color). Then D-E-F#-A (the characteristic Dorian ascending fragment). Then F#-E-D-C-A (Dorian descending). Practice each pattern 4 times over the backing track.",
          why: "These three patterns are the most common Dorian melodic fragments in popular music. The A-C-E-F# pattern appears in countless jazz and soul melodies. The D-E-F#-A fragment is the Santana pattern — you'll recognize it instantly. The descending F#-E-D-C-A is the reggae melodic staple. Learning these patterns as muscle memory means your voice will reach for them automatically when the harmonic context calls for Dorian."
        },
        {
          text: "Record a 2-minute Dorian improvisation over either backing track. The goal: stay in Dorian (not natural minor, not pentatonic) for the full 2 minutes. The F# should appear regularly and feel natural, not forced.",
          why: "Extended modal improvisation is the real test of whether a mode has been internalized. If you drift back to natural minor (singing F instead of F#) or to pentatonic (avoiding F# entirely), the mode isn't in your body yet. Two minutes is long enough that your conscious mind can't sustain the effort — at some point, your ear has to take over. When it does, Dorian will feel like a natural place to live, not a theoretical concept to remember."
        }
      ],
      feel: "Dorian should feel warm — like a minor key with the lights on. It's melancholy but not heavy. Jazzy but not complex. If natural minor is a rainy day, Dorian is sunset after rain. The F# is the sun breaking through.",
      wrong: "If your improvisation sounds identical to A minor pentatonic, you're avoiding the F# and the B. Make a rule: every other phrase must include F#. If the F# sounds wrong, your guitar might be playing a chord that conflicts — stick with Am or Am7 for the drone. Chords like Fmaj7 will clash with F# because they contain F natural.",
      sarah: "Gene, Dorian is YOUR mode. Listen to your favorite Khruangbin tracks — half of them are in Dorian. That warm, soulful-but-not-sad sound? That's the raised 6th. Once you internalize this, your reggae and funk improvisations will have a completely different color. You're not learning something new — you're naming something your ear already loves.",
      levelUp: "2-minute Dorian improvisation over a reggae or Khruangbin-style groove where F# appears naturally and the mode doesn't drift to pentatonic or natural minor."
    },
    {
      id: "v11e4", time: 4, title: "Mixolydian Mode — The Surf-Rock Sound", type: "vocal",
      drone: { root: "G", octave: 2, texture: "analog" },
      what: "Mixolydian is a major scale with a flatted 7th degree. In G Mixolydian: G-A-B-C-D-E-F (instead of F#). That F natural (instead of F#) gives the scale a bluesy, unresolved quality — the dominant sound of surf rock, classic rock, and folk. This is the Allah-Las, the Beatles, the Allman Brothers, and every great guitar riff that doesn't quite resolve.",
      setup: "Guitar droning G major (or G7). Surf Rock 120 or Psych Rock 120 backing track. Pitch Detector on.",
      referencePitches: getPitchRange("D3", "D4"),
      pianoKeys: { notes: ["G3", "A3", "B3", "D4", "E4"], label: "G Major Pentatonic", range: ["G3", "E4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 120,
      tracks: [
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }
      ],
      steps: [
        {
          text: "Play a G chord and sing G major: G-A-B-C-D-E-F#-G. Now sing G Mixolydian: G-A-B-C-D-E-F-G. The ONLY difference is F instead of F#. Sing both scales back to back. The major scale sounds resolved and complete. Mixolydian sounds open and restless.",
          why: "Mixolydian replaces the leading tone (Ti/F#) with a flatted 7th (Te/F). Remember from the tension exercise: Ti pulls strongly toward Do. By flatting it, Mixolydian removes that upward pull. The result is a scale that feels like it could keep going forever — it never fully 'arrives.' This unresolved quality is why Mixolydian is the sound of road music, surf music, and jam bands. The journey matters more than the destination."
        },
        {
          text: "Isolate the difference: sing E-F#-G (major, resolved) then E-F-G (Mixolydian, open). Go back and forth 4 times. The F# version sounds like 'coming home' — feel how the resolution relaxes your throat and jaw, the tension dissolving as you arrive at G. The F version sounds like 'still traveling' — the throat stays slightly open, the body does not settle, the vibration floats. Mixolydian is a mode you feel in the body as permanent openness, like a breath that never fully exhales.",
          why: "The leading tone (F#) is the strongest resolution note in the major scale — it pulls toward the tonic (G) with almost gravitational force. By flatting it to F, you weaken that pull. The brain still expects resolution, but the resolution is softer, less urgent. This creates a laid-back quality that perfectly matches Gene's 'porch register' vocal style — relaxed, unhurried, content to float."
        },
        {
          text: "Start the Surf Rock 120 track. Improvise in G Mixolydian: G-A-B-C-D-E-F. Emphasize the F natural — let it sit at the end of phrases. Don't resolve it up to G every time. Let the melody hang.",
          why: "Surf rock lives in Mixolydian because the genre is about energy without urgency. The flatted 7th keeps the music moving without pushing toward resolution. When you sing an F over a G chord, it creates a dominant 7th sound — the same sound as a G7 chord. This is the fundamental harmonic color of the blues, rock and roll, and surf rock. Your voice is essentially singing the 'blues note' of the major scale."
        },
        {
          text: "Switch to Psych Rock 120. Same G Mixolydian scale, but change your vocal approach: more sustained notes, more reverb-y feeling, voice as texture. The F natural should drift through your phrases like incense smoke.",
          why: "Psychedelic rock uses Mixolydian for its hypnotic, trance-like quality. The flatted 7th removes the urgency of resolution, creating music that can loop and drift without needing to 'go' anywhere. This is why psych-rock jams can last 15 minutes without feeling incomplete — Mixolydian is inherently circular. Training your voice in this context connects the mode to the atmospheric, textural vocal style you practiced in Level 6."
        },
        {
          text: "Mixolydian melody patterns: sing G-B-D-F-D (arpeggio with Mixolydian color — that's a G7 arpeggio). Then D-E-F-G (the characteristic ascending Mixolydian fragment). Then G-F-E-D-C (Mixolydian descending from the root). Practice each pattern 4 times over the backing track.",
          why: "The G-B-D-F arpeggio is the dominant 7th chord — the most recognizable Mixolydian sound in all of rock music. When you sing it, you're singing the harmonic DNA of surf rock, classic rock, and the blues. The ascending D-E-F-G fragment is how most Mixolydian melodies approach the root — through the flatted 7th instead of the leading tone. The descending G-F-E-D-C is the classic rock melodic descent — you've heard it in thousands of songs."
        },
        {
          text: "Record a 2-minute Mixolydian improvisation over either backing track. The goal: stay in Mixolydian (not major, not pentatonic) for the full 2 minutes. The F natural should appear regularly and the melody should feel open, unresolved, and comfortable with that quality.",
          why: "This is the same internalization test as the Dorian exercise. Extended improvisation forces your ear to hold the mode. If you drift into G major (singing F# instead of F), the leading tone is pulling you back to 'safe' territory. If you drift to pentatonic (avoiding F entirely), you're retreating to the five-note comfort zone. True Mixolydian fluency means the flatted 7th feels like home, not like a compromise."
        }
      ],
      feel: "Mixolydian should feel like cruising with the windows down — momentum without urgency. It's happy but not saccharine. Bluesy but not sad. Open-ended. If Dorian is sunset after rain, Mixolydian is an endless California highway at golden hour.",
      wrong: "If your melody keeps resolving F up to G every time, you're treating F as a leading tone that needs to resolve. It doesn't. In Mixolydian, F is a resting point. Practice ending phrases ON F — let it be the last note. If that feels wrong, your ear is still in major-scale mode. Give it time.",
      sarah: "Gene, this is the Allah-Las mode. That laid-back, sun-soaked surf sound? Mixolydian. That feeling in their music where everything is chill and nothing needs to resolve? Flatted 7th. Your voice already goes to this place naturally when you sing surf-psych — we're just making it conscious and reliable.",
      levelUp: "2-minute Mixolydian improvisation over a surf or psych groove where F natural appears naturally and the melody embraces open, unresolved phrasing."
    },
    {
      id: "v11e5", time: 3, title: "Modal Color Comparison", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "Sing the same melodic contour through four different scales: major, natural minor, Dorian, and Mixolydian. Same rhythm, same shape — different scale equals different emotion. This exercise trains modal awareness: the ability to hear HOW a scale colors a melody, separate from the melody itself.",
      setup: "Guitar ready for drone changes. Pitch Detector on. Record all four versions.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 80,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        {
          text: "Create a simple 4-bar melody in C major. Keep it very simple — maybe 4-6 notes. Something like: C-D-E-G-E-D-C (a gentle arch shape). Sing it three times until it's memorized. This is your template melody.",
          why: "The melody needs to be simple enough that you can focus entirely on the SCALE rather than the NOTES. A complex melody would change too much between modes, making it hard to hear the modal differences. Think of this melody as a sentence: you're going to say the same sentence in four different emotional tones. The sentence stays the same; the tone changes everything."
        },
        {
          text: "Version 1 — C Major: C-D-E-G-E-D-C (or your chosen contour). Sing it over a C drone. Bright, resolved, happy. This is your baseline.",
          why: "Major is the reference point against which all other modes are compared. The brain uses the major scale as its default 'template' for Western music — it's the most commonly heard scale in pop music, children's songs, and advertising. Your baseline melody in major establishes what 'normal' sounds like, so the modal variations will stand out clearly."
        },
        {
          text: "Version 2 — C Natural Minor: C-D-Eb-G-Eb-D-C. The ONLY change is E becomes Eb (the 3rd is lowered). Sing it over a Cm drone. Darker, sadder, heavier. Notice how one note changes the whole feeling.",
          why: "Lowering the 3rd from major to minor is the single most powerful emotional transformation in Western music. The brain associates major 3rds with positive emotions and minor 3rds with negative emotions across cultures — this has been documented in listeners from Cameroon to Canada. One half step down on one note changes 'happy' to 'sad.' This is the power of modal color."
        },
        {
          text: "Version 3 — C Dorian: C-D-Eb-G-Eb-D-C with an A natural as a passing tone (instead of Ab if you extend the melody). If your melody includes the 6th, use A instead of Ab. Sing over Cm. Notice: darker than major, but WARMER than natural minor.",
          why: "Dorian sits between major and minor in brightness. The lowered 3rd gives it a minor quality, but the raised 6th (A instead of Ab) adds a warm, jazz-soul color. This 'in-between' quality is why Dorian works for genres that want emotion without heaviness — reggae, soul, Latin jazz. Your auditory cortex is now building a brightness spectrum: major (brightest) > Dorian (warm minor) > natural minor (darkest)."
        },
        {
          text: "Version 4 — C Mixolydian: C-D-E-G-E-D-C with Bb instead of B if you extend to the 7th. If your melody stays within the first 5 notes, extend it to include Bb: C-D-E-G-Bb-G-E-D-C. Sing over a C drone. Notice: major but with a lazy, bluesy edge.",
          why: "Mixolydian retains the brightness of major (the 3rd is still E natural) but adds a bluesy openness (Bb instead of B). This is the subtlest color shift — the melody still sounds 'happy' but with less resolution. Training your ear to hear this difference between major and Mixolydian is one of the most sophisticated listening skills in popular music. Once you hear it, you'll notice that most rock and blues melodies are Mixolydian, not major."
        },
        {
          text: "Listen to all four recordings back to back. Then sing them again in this order: Major → Mixolydian → Dorian → Natural Minor. You're moving from brightest to darkest. Feel the gradient.",
          why: "By arranging the modes from brightest to darkest, you create a perceptual gradient that your brain can map onto a single dimension: brightness. This is how professional musicians think about modes — not as disconnected scales, but as points on a spectrum. The brightness ordering (major > Mixolydian > Dorian > minor) is one of the most useful frameworks in all of music theory, and you've just experienced it physically with your own voice."
        }
      ],
      feel: "Like changing the color filter on a photograph. The image (melody) is the same — but the mood shifts dramatically with each mode. Major is daylight. Mixolydian is golden hour. Dorian is blue hour. Minor is night.",
      wrong: "If all four versions sound the same, you're probably not changing enough notes. Double-check: in natural minor, the 3rd, 6th, and 7th are all lowered from major. In Dorian, only the 3rd and 7th are lowered (6th stays natural). In Mixolydian, only the 7th is lowered. If the differences still sound subtle, exaggerate them — hold the changed notes longer.",
      sarah: "Gene, this is the exercise that makes everything click. When you hear the same melody in four colors, you stop thinking of modes as theory and start hearing them as feelings. Next time you're jamming and you want a reggae vibe — that's Dorian. Surf vibe — Mixolydian. You won't need to think about it; your ear will just know which color to reach for.",
      levelUp: "Four recordings of the same melody in four modes, with audible emotional differences between each, and ability to identify the brightness ordering: Major > Mixolydian > Dorian > Natural Minor."
    },
    {
      id: "v11e6", time: 3, title: "Chromatic Passing Tones", type: "vocal",
      what: "Add notes BETWEEN scale degrees to create smooth, half-step connections. Instead of jumping Do to Re, slide through Di (C#). These chromatic passing tones add sophistication, a jazz/blues quality, and the sense that your voice knows EVERY note — not just the ones in the scale. This is the difference between a vocalist who sounds 'correct' and one who sounds 'fluent.'",
      setup: "Guitar playing Am or C drone. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 66,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        {
          text: "Chromatic scale warmup: sing C-C#-D-Eb-E-F-F#-G-Ab-A-Bb-B-C. Every note, every half step, ascending. Use the Pitch Detector to verify you're hitting each pitch accurately. Take it slow — 66 BPM, one note per beat.",
          why: "The chromatic scale is the complete palette — all 12 notes. Most singers never practice this because songs rarely use all 12 notes consecutively. But the ABILITY to sing any chromatic note accurately means your voice can find any passing tone, any approach note, any blue note on demand. This is like an artist learning to mix every color before painting — even if a painting doesn't use purple, knowing you CAN mix purple gives you freedom."
        },
        {
          text: "Chromatic approach from below: pick a target note (let's say E). Sing Eb-E (approach from a half step below). Feel the approach note as a brief tension in your throat — a half step of friction that resolves as the vibration settles into the target note's body address. Now do it with G: F#-G. And with A: Ab-A. Each approach creates a tiny physical arc: tension, then arrival. Practice approaching each scale degree from a half step below.",
          why: "Chromatic approach from below is the most common passing tone technique in jazz and soul. It creates a 'scooping' effect — the voice slides into the target note like a saxophone. This approach activates the brain's pitch prediction system: the listener hears the half-step-below note and immediately predicts the target. When the target arrives, the prediction is confirmed, creating a small hit of satisfaction. It's subtle, but it's the difference between singing that sounds studied and singing that sounds effortless."
        },
        {
          text: "Chromatic approach from above: target E, sing F-E. Target G, sing Ab-G. Target A, sing Bb-A. Same concept, opposite direction. The approach from above sounds like 'leaning in' to the note.",
          why: "Approaching from above creates a different emotional effect than approaching from below. Below sounds like reaching up, aspiring. Above sounds like relaxing down, settling. Jazz vocalists use both constantly: approach from below for energy and anticipation, approach from above for resolution and release. Training both directions gives your voice a complete approach-tone vocabulary."
        },
        {
          text: "Enclosure: surround a target note from both sides. Target E: sing F-Eb-E (above, below, target). Target G: Ab-F#-G. This is the most sophisticated approach technique — it circles the target before landing.",
          why: "Enclosure is an advanced jazz technique that delays resolution by one extra beat. Instead of a single approach note, you use two: one from above, one from below, then the target. This creates a brief moment of ambiguity — the listener doesn't know if you're going up or down — before the satisfying landing on the target note. Charlie Parker, John Coltrane, and Billie Holiday all used enclosures extensively. In vocal music, it sounds sophisticated without sounding 'jazzy' — it just sounds like someone who really knows the fretboard of their voice."
        },
        {
          text: "Apply to a simple melody: take Do-Mi-Sol-Mi-Do (a basic arpeggio) and add chromatic approaches. Sing: Di-Do, Ri-Re, Ri-Mi, Fi-Sol, Ri-Mi, Di-Do. Every target note gets a chromatic approach from below. Then try it with approaches from above.",
          why: "Applying chromatic approaches to a melody you already know is how the technique becomes musical rather than mechanical. When approach tones are applied to real melodic context, they stop sounding like exercises and start sounding like style. This is exactly how soul singers decorate simple melodies — the basic melody is Do-Mi-Sol, but the delivery slides into each note through a half step, adding warmth and sophistication."
        },
        {
          text: "Free chromatic improvisation: over the Deep Soul Groove, improvise using scale tones AND chromatic approaches. The rule: you can sing any of the 12 notes, but every 'non-scale' note must resolve to a scale note within 1-2 beats. No note is wrong if it resolves.",
          why: "This is the bridge between chromatic exercises and free improvisation. The rule — every chromatic note resolves to a scale tone — gives you a safety net while exploring the full 12-note palette. Over time, the resolutions become automatic, and the chromatic notes feel less like 'wrong notes I need to fix' and more like 'colors I'm choosing to use.' This is the shift from diatonic thinking (7 notes) to chromatic fluency (12 notes)."
        }
      ],
      feel: "Chromatic passing tones should feel like adding spices to a dish. The diatonic scale is the meal — satisfying and complete. Chromatic notes are the cumin, the chili flake, the squeeze of lime. They don't replace the meal; they enhance it with complexity and depth.",
      wrong: "If the chromatic notes sound like wrong notes instead of approach tones, you're either holding them too long (they should be brief, passing) or not resolving them (every chromatic note needs a diatonic landing). If the Pitch Detector shows you're between pitches, you might be sliding instead of stepping — chromatic tones need to be precise half steps, not scoops.",
      sarah: "Gene, this is the exercise that makes people say 'how does that singer make it sound so smooth?' The answer is chromatic approaches. They hear someone slide effortlessly into notes and think it's talent — it's technique. A half step below your target note, sung quickly, makes every note sound inevitable. You'll hear this in every Khruangbin vocal line once you know what to listen for.",
      levelUp: "Can apply chromatic approaches (below, above, and enclosure) to a simple melody, and improvise freely using all 12 notes with appropriate resolution."
    },
    {
      id: "v11e7", time: 4, title: "Scale Degree Singing Over Chords", type: "vocal",
      what: "Play the Am-C-G-D progression and sing specific chord tones and scale degrees for each chord. The key insight: the same note has different FUNCTIONS over different chords. E is the 5th of Am but the 3rd of C. Understanding this changes how you hear melody — notes stop being 'pitches' and become 'relationships.'",
      setup: "Guitar playing Am-C-G-D (4 beats each). Pitch Detector on. Slow tempo.",
      referencePitches: getPitchRange("A2", "B4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 72,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      steps: [
        {
          text: "Play Am (4 beats). Sing the root (A), the 3rd (C), the 5th (E). One per beat, with a beat of rest. These are the 'safe' notes — they belong to the chord. Then move to C and sing its root (C), 3rd (E), 5th (G). Continue for G (G-B-D) and D (D-F#-A).",
          why: "Singing chord tones over their parent chord is the foundation of tonal singing. These notes will always sound consonant because they ARE the chord. But notice: you just sang E over both Am AND C. Over Am, E is the 5th — stable, supportive. Over C, E is the 3rd — warm, defining. SAME pitch, different function. This is the key to understanding how melody works in harmony: the meaning of a note depends on its harmonic context."
        },
        {
          text: "Now sing NON-chord tones over each chord. Over Am: sing the 2nd (B), the 4th (D), the 6th (F), the 7th (G). These create varying degrees of tension. Notice which non-chord tones sound tense and which sound colorful.",
          why: "Non-chord tones create tension, but not all tension is equal. The 2nd (B over Am) sounds bright and suspenseful. The 4th (D over Am) sounds pulled, wanting to resolve down to C. The 6th (F over Am) sounds dark. The 7th (G over Am) sounds jazzy, open. Each non-chord tone has a personality — learning these personalities is how you make deliberate melodic choices instead of hoping for the best."
        },
        {
          text: "Chord-tone melody: write a simple melody that uses ONLY chord tones for each chord. Over Am: choose from A, C, E. Over C: choose from C, E, G. Over G: choose from G, B, D. Over D: choose from D, F#, A. Sing the melody with the progression.",
          why: "A chord-tone-only melody sounds safe, consonant, and 'correct.' This is how folk songs and simple pop melodies work — they follow the chords closely. But notice: it might sound a little boring. That's because consonance without tension is like a story without conflict. The melody needs some non-chord tones (which you'll add next) to create interest. This exercise establishes the 'safe' baseline so you can hear what tension adds."
        },
        {
          text: "Add one non-chord tone per chord to your melody. Over Am, approach the C through B (a passing tone). Over C, add D between C and E (another passing tone). Over G, add A between G and B. Over D, add E between D and F#. Sing this enriched melody.",
          why: "Passing tones between chord tones are the simplest way to add melodic interest. The non-chord tone is brief (usually on a weak beat) and resolves immediately to a chord tone (on a strong beat). This creates micro-tension that keeps the ear engaged without disrupting the harmonic foundation. Most pop and rock melodies use exactly this technique — chord tones on strong beats, passing tones on weak beats."
        },
        {
          text: "Sing the note E continuously (drone on E) while playing all four chords underneath. FEEL how E changes meaning — and how your body responds differently to the same pitch over each chord. Over Am, E is the 5th: stable, the vibration sits comfortably in the mask, your jaw relaxes. Over C, E is the 3rd: warm, the throat colors it. Over G, E is the 6th: colorful, slightly suspended, a brightness behind the cheekbones. Over D, E is the 2nd: tense, your throat tightens subtly, the note wants to move. Same pitch, four different body sensations.",
          why: "This exercise is the single most important demonstration of functional harmony. When you hold one note and change the chords underneath, you experience the fact that notes don't have inherent emotional meaning — they have RELATIONAL meaning. E is not 'happy' or 'sad.' E-over-Am is stable. E-over-D is tense. This relational hearing is what separates a melodist from someone who just sings the right notes. It's the difference between painting and coloring inside the lines."
        },
        {
          text: "Improvise over Am-C-G-D. For each chord, try to hear the function of each note you sing. Is it a chord tone (stable)? A passing tone (brief tension)? A tension note (extended dissonance)? Label your choices as you go.",
          why: "Conscious functional improvisation is the ultimate integration exercise. You're simultaneously hearing the chord, choosing a note, categorizing its function, and making an aesthetic decision about whether to hold or resolve. This is exactly what experienced musicians do in real time, but they've automated it through thousands of hours. By making the process conscious now, you're building the neural pathways that will eventually become automatic."
        }
      ],
      feel: "Like learning to read subtext in a conversation. The 'text' is the note. The 'subtext' is its function over the current chord. Once you hear the subtext, you can never unhear it — and your melodic choices become intentional rather than accidental.",
      wrong: "If all the notes sound the same to you regardless of the chord underneath, the guitar might be too quiet. Turn up the chords. The harmonic context needs to be LOUDER than your voice for this exercise — the voice is the figure, the chords are the ground. Also, if you can't hear the difference between E-over-Am and E-over-D, simplify: just hold E and alternate between Am and D. The shift in feeling should be obvious.",
      sarah: "Gene, this is where your guitar playing becomes your secret weapon. You already FEEL the difference between playing an Am and a D — you know they have different energy. Now you're learning to feel the same difference WITH YOUR VOICE. When you sing E over Am it resonates. When you sing E over D it creates friction. Your hands already know this — now your voice needs to catch up.",
      levelUp: "Can sing a simple melody using chord tones and passing tones over Am-C-G-D, and can articulate the function of E (or any note) over each chord."
    },
    {
      id: "v11e8", time: 4, title: "Genre Mode Application", type: "vocal",
      what: "Match modes to Gene's genres: Dorian for reggae, Mixolydian for surf-rock, natural minor for desert blues, major pentatonic for soul. Each genre has a 'home mode' — the scale that defines its sound. This exercise makes the genre-mode connection automatic so you can shift between musical worlds fluidly.",
      setup: "All four backing tracks loaded and ready. Guitar optional. Pitch Detector on.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      tracks: [
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" },
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }
      ],
      steps: [
        {
          text: "Start the Dub Reggae 85 track. Sing in A Dorian (A-B-C-D-E-F#-G) for 90 seconds. Focus on the F# — it's the note that makes this reggae, not just minor. Let the offbeat rhythm carry your phrasing.",
          why: "Reggae and Dorian are deeply linked. The raised 6th (F# in Am) gives reggae its characteristic warmth — it's minor-key music that feels hopeful. Bob Marley, Toots and the Maytals, and modern reggae artists all operate primarily in Dorian. The offbeat phrasing of reggae vocals naturally emphasizes different scale degrees than on-beat phrasing would, creating a synergy between rhythmic style and modal color that defines the genre."
        },
        {
          text: "Switch to Surf Rock 120. Shift to G Mixolydian (G-A-B-C-D-E-F) for 90 seconds. The F natural (instead of F#) is the surf-rock color note. Sing with a straight tone, minimal vibrato — voice as texture.",
          why: "Surf rock and Mixolydian are inseparable. The flatted 7th creates the open, unresolved quality that defines the genre. Combined with the straight-tone vocal delivery you practiced in Level 6, Mixolydian over a surf groove instantly evokes the Allah-Las, Dick Dale (whose guitar lines are almost entirely Mixolydian), and the Beach Boys' deeper tracks. The genre is the mode, and the mode is the genre."
        },
        {
          text: "Switch to Desert Blues 75. Sing in A natural minor (A-B-C-D-E-F-G) for 90 seconds. The F natural (compared to Dorian's F#) makes it darker, more austere. This is the Tinariwen sound — vast, ancient, powerful.",
          why: "Desert blues uses natural minor (Aeolian mode) for its dark, expansive quality. Tinariwen, Bombino, and Ali Farka Toure all build on natural minor scales from the Saharan musical tradition. The F natural (instead of Dorian's F#) removes the warmth and adds gravity. Where Dorian says 'hope in darkness,' natural minor says 'the darkness is beautiful on its own.' This darker color suits the vast, meditative quality of desert blues."
        },
        {
          text: "Switch to Soul Funk Groove 90. Sing in A major pentatonic (A-B-C#-E-F#) for 90 seconds. Just five notes, but they're all bright and consonant. This is the safe, soulful sound — warm, grooving, positive.",
          why: "Major pentatonic is the home of soul and funk vocals. Stevie Wonder, Marvin Gaye, and modern soul artists like Leon Bridges all lean heavily on the major pentatonic scale. It avoids all tension notes (no 4th, no 7th), creating a sound that is purely consonant and emotionally warm. After spending this level exploring tension and modal darkness, returning to pentatonic feels like coming home — and that's the point. Pentatonic is not 'limited' — it's a deliberate aesthetic choice."
        },
        {
          text: "Quick-switch challenge: alternate between genres every 4 bars. Reggae groove → Dorian. Surf groove → Mixolydian. Desert blues → Natural minor. Soul groove → Major pentatonic. Change the backing track and mode simultaneously.",
          why: "This rapid switching trains the genre-mode association until it becomes automatic. In a real-world context — jamming with other musicians, writing songs, performing — you need to shift modes as naturally as you shift between guitar chord shapes. The goal is to hear a groove and immediately know which mode fits, without having to think about scale degrees. This automaticity is the practical result of modal training."
        },
        {
          text: "Reflection: which genre-mode combination felt most natural? Which was hardest? Record a final 60-second improvisation in your most natural genre-mode pairing and another in your hardest. Save both.",
          why: "Self-awareness about your modal strengths and weaknesses guides future practice. If Dorian over reggae felt effortless, that's a strength to build on. If Mixolydian over surf rock felt forced, that's a growth edge to revisit. The recordings provide objective evidence of your comfort level in each mode — listen for pitch accuracy, melodic fluency, and the naturalness of the 'color note' in each mode."
        }
      ],
      feel: "Like being a musical chameleon — changing your color to match the environment. Each genre-mode pairing should feel like stepping into a different room. The reggae room is warm. The surf room is breezy. The desert room is vast. The soul room is intimate.",
      wrong: "If all four genres sound the same regardless of mode, you're probably defaulting to pentatonic in all of them. The test: does the 'color note' (F# for Dorian, F natural for Mixolydian, F natural for minor) appear in your improvisation? If not, you're staying on the safe five notes. Force yourself to include the color note in every other phrase.",
      sarah: "Gene, this is the payoff exercise. You've learned the modes in isolation — now they become tools for your actual music. The next time you're jamming to a reggae groove and your voice just naturally finds that warm Dorian color? That's not luck anymore. That's training. And it'll feel like freedom.",
      levelUp: "Can shift between four genre-mode pairings within a single practice session, with the color note of each mode appearing naturally in improvisation."
    },
    {
      id: "v11e9", time: 3, title: "Modal Improvisation", type: "vocal",
      what: "Free improvisation using a chosen mode over a backing track for a sustained 2 minutes. The goal: stay in your chosen mode without falling back to pentatonic. The two extra notes (beyond pentatonic) should feel natural, not forced. This is where modal knowledge becomes modal fluency — the difference between knowing a language and thinking in it.",
      setup: "Pick your favorite backing track. Choose a mode. Pitch Detector on. Record.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 85,
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }
      ],
      steps: [
        {
          text: "Choose one mode and one backing track. Suggestions: A Dorian over Khruangbin Style 80, A Dorian over Dub Reggae 85, or G Mixolydian over Surf Rock 120. Commit to one pairing for this exercise.",
          why: "Committing to a single mode for an extended improvisation is harder than switching between modes. When you switch, novelty keeps you engaged. When you stay, you have to find depth within the constraint. This is where real modal fluency develops — not from variety, but from sustained immersion. Think of it as speaking a single language for a full conversation rather than code-switching every sentence."
        },
        {
          text: "Set a timer for 2 minutes. Start the backing track. Begin improvising with an audiate-then-sing protocol: before each new phrase, hear the first 2-3 notes in your mind's ear, THEN sing. One rule: you must include the 'color note' of your mode (F# for Dorian, F for Mixolydian) at least once every 4 bars. Otherwise, sing freely.",
          why: "The 4-bar rule prevents pentatonic regression — the tendency to retreat to the five safe notes when your conscious attention wanders. The audiate-then-sing protocol ensures each phrase is INTENDED rather than stumbled upon — pre-hearing activates auditory cortex BEFORE motor cortex (Gordon Stage 6), which is exactly the forward-model skill from Level 3 (v3e1) now applied to modal improvisation. Aarhus 2021 found combined imagery + singing = equal learning in 1/3 the time."
        },
        {
          text: "After 1 minute, check in: are you still in the mode? Has the color note appeared naturally, or are you forcing it? If it's natural, good — drop the 4-bar rule and just sing. If it's forced, keep the rule for the second minute.",
          why: "The transition from forced to natural is the key moment in modal internalization. When the color note stops being a 'rule' and starts being a 'choice,' the mode has moved from declarative knowledge (I know which note is different) to procedural knowledge (my ear automatically includes it). This transition typically happens after 3-5 extended improvisations. Some students feel it click within this single exercise; others need multiple sessions."
        },
        {
          text: "In the final 30 seconds, try to create a memorable melodic phrase — a riff, a hook, a motif — that uses the color note as a featured element. Not just a passing tone, but a FEATURED note. This is the color note as a star, not a supporting actor.",
          why: "Creating a melodic phrase that features the color note is the highest level of modal ownership. It means you're not just using the mode — you're composing in it. When the color note is the most interesting note in your phrase, the mode has fully become part of your creative vocabulary. This is the difference between 'I can sing in Dorian' and 'I write Dorian melodies.'"
        },
        {
          text: "Listen to the recording. Transcribe (even roughly) your favorite melodic phrase. Is the color note present? Does it sound intentional? Could you sing it again from memory?",
          why: "Transcription — even rough, even just the contour — bridges the gap between improvisation and composition. The favorite phrase from your improvisation is a piece of original music. By writing it down (or just memorizing it), you've caught a fish from the stream. Over time, these caught phrases become the basis of your original songwriting. Every great songwriter started by capturing improvisational moments."
        },
        {
          text: "Optional repeat: try the exercise with a different mode and backing track. Compare: which mode felt more natural? Which produced more interesting melodic ideas?",
          why: "Comparing your fluency across modes reveals your modal personality. Most musicians have a 'home mode' — the one they gravitate toward naturally. For Gene, given the psych-surf-reggae aesthetic, Dorian and Mixolydian are likely candidates. Knowing your home mode is not a limitation — it's a foundation. Your home mode becomes your default color, and other modes become deliberate choices for contrast."
        }
      ],
      feel: "Like thinking in a different language. At first, you're translating from pentatonic: 'Where would I normally go? OK, now adjust for the mode.' Eventually, the mode becomes the native tongue and you stop translating. That's fluency. Notice how each mode configures your body differently: Dorian's raised 6th brightens the mask and lifts the brow — the sound wants to rise. Mixolydian's lowered 7th relaxes the throat and settles the chest — the sound wants to groove. The mode is not just a scale; it is a physical posture, an emotional stance that your whole body assumes.",
      wrong: "If you drift into pentatonic by the 1-minute mark, the mode isn't internalized yet. Go back to the scale exercise (v11e3 or v11e4) and drill the color note in isolation. Then return to this exercise. If your melodic ideas feel limited ('I keep singing the same phrases'), try starting phrases on the color note instead of the root. New starting notes generate new melodic ideas.",
      sarah: "Gene, this is the exercise I want you to come back to again and again. Each time you do it, the mode will feel more natural, and your melodic ideas will get more interesting. It's like freewriting — the first draft is always rough, but the 10th session produces gold. Don't judge yourself on the first try. Just keep swimming in the mode.",
      levelUp: "2-minute modal improvisation where the color note appears naturally (not forced), and at least one memorable melodic phrase features the color note prominently."
    },
    {
      id: "v11e10", time: 3, title: "Chromatic Freedom", type: "vocal",
      what: "Improvise using ANY note — pentatonic, diatonic, and chromatic. The 'wrong' notes become approach tones, passing tones, blue notes. Nothing is truly wrong if you resolve it intentionally. This exercise removes all scalar restrictions and lets you experience total melodic freedom. The safety net is resolution: any note, no matter how 'outside,' can be made to sound intentional if you resolve it within 1-2 beats.",
      setup: "Backing track of choice. Pitch Detector on. Record everything.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 80,
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        {
          text: "Start the backing track. For the first 30 seconds, sing in pentatonic only — your comfort zone. Feel how safe and familiar it is. This is your melodic home base.",
          why: "Starting in pentatonic establishes a baseline of consonance. The familiarity of five safe notes creates a contrast point for what comes next. It also warms up your ear and connects you to the groove before you start exploring. Think of it as standing on solid ground before stepping into the water."
        },
        {
          text: "For the next 30 seconds, expand to full diatonic (7 notes). Add Fa and Ti (the tension notes from v11e1-v11e2). Notice how the melody gains more options and more forward motion. Tension notes create momentum.",
          why: "Expanding from 5 to 7 notes increases your available melodic moves from a handful to dozens. The tension notes (Fa and Ti) add directionality — they point toward resolution targets, creating melodic lines that 'want to go somewhere.' This is the step from a campfire sing-along to a composed melody. Your auditory cortex is tracking more possibilities and making more sophisticated predictions about where the melody will go."
        },
        {
          text: "For the next 30 seconds, go chromatic. ANY note is available. Sing a note that's clearly 'outside' — a Bb over a C major context, a C# over Am — and resolve it immediately to a nearby scale tone. The 'wrong' note becomes an approach tone.",
          why: "This is the moment of liberation. When you realize that ANY note can be made to sound intentional through resolution, the concept of 'wrong notes' evaporates. What remains is CHOICE: you chose to sing that Bb because you wanted the tension of a half step above A, and you chose to resolve it because the resolution feels satisfying. Jazz musicians call this 'playing outside' — temporarily leaving the key to create contrast, then returning. It works because the human ear forgives any dissonance that resolves."
        },
        {
          text: "For the final 30 seconds, mix all three vocabularies freely using the audiate-then-sing protocol: before each phrase, hear 2-3 notes internally, then sing them, then check. The pre-hearing is especially critical for chromatic notes — if you can audiate a chromatic approach BEFORE singing it, the note will sound intentional rather than accidental.",
          why: "This free mixing is the goal state of melodic fluency. Adding audiation to chromatic freedom is the key that makes 'outside' notes sound like choices rather than mistakes. When you pre-hear a Bb over C major before singing it, your motor cortex is already calibrated — the note lands confidently. When you stumble onto it without pre-hearing, the hesitation is audible. The audiate-then-sing protocol (from Level 3's forward model, now applied at full melodic complexity) is what separates a fluent improviser from a scale-runner."
        },
        {
          text: "Listen to the recording. Identify three moments: (1) a moment where a chromatic note sounded intentional and beautiful, (2) a moment where a chromatic note sounded unintentional and messy, (3) a moment where you couldn't tell. Analyze the difference.",
          why: "The difference between intentional and unintentional chromaticism is almost always RESOLUTION. The beautiful moments likely resolved quickly to a strong scale tone. The messy moments likely hung unresolved or resolved to another non-scale tone. The ambiguous moments are the most interesting — they represent your ear pushing boundaries. Over time, the 'messy' category shrinks and the 'intentional' category grows, not because you sing different notes, but because your resolutions become more confident."
        },
        {
          text: "Re-record the 2-minute improvisation with one new intention: when you go 'outside' (chromatic), do it with CONFIDENCE. A chromatic note sung tentatively sounds like a mistake. The same note sung with commitment sounds like a choice. Volume and tone matter as much as pitch.",
          why: "Confidence transforms the listener's perception of chromaticism. Research by music psychologist David Huron shows that listeners interpret musical events as 'intentional' based on performance cues: volume, timing, vibrato, and body language. A chromatic note that is sung strongly, landed on beat, and held briefly before resolving is heard as a deliberate artistic choice. The same note sung weakly, off-beat, and quickly abandoned is heard as an error. The notes are identical — the delivery determines the interpretation."
        }
      ],
      feel: "Like the first time you drove on the highway after learning in a parking lot. Everything is available. The freedom is exhilarating and slightly terrifying. But you have all the skills — pentatonic, diatonic, modal, chromatic — and they're all accessible. You're not limited to any one vocabulary anymore.",
      wrong: "If everything sounds chaotic, you're spending too much time 'outside' and not enough time 'home.' Chromaticism works as spice, not as the main dish. A good rule: 80% diatonic, 20% chromatic. If the outside notes all sound like mistakes, focus on resolution speed — get back to a scale tone within 1 beat. Speed of resolution is the cure for 'messy' chromaticism.",
      sarah: "Gene, this is the exercise that scares most students. 'What if I sing the wrong note?' You can't. Not anymore. After this level, there are no wrong notes — only unresolved ones. And you know how to resolve. The training wheels are off. Everything you hear in your head, you can sing. That's freedom.",
      levelUp: "2-minute improvisation that includes pentatonic, diatonic, and chromatic passages, with chromatic notes sounding intentional (resolved confidently) at least 75% of the time."
    },
    {
      id: "v11e11", time: 4, title: "Level Integration — Modal Medley", type: "vocal",
      what: "The final exam. Over a 4-section structure, sing through four different modal/chromatic worlds: major pentatonic (safe), Dorian (reggae color), Mixolydian (surf color), and free chromatic (full freedom). This medley demonstrates complete scale freedom — the ability to shift between melodic vocabularies at will. Record the full performance and compare it to your Level 11 Diagnostic recording.",
      setup: "Four backing tracks loaded in order. Guitar optional. Pitch Detector on. Record the full medley.",
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      volumeMeter: true,
      metronome: 85,
      tracks: [
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" },
        { name: "Surf Rock 120", src: "/surf-rock-120.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }
      ],
      steps: [
        {
          text: "Section A — Major Pentatonic over Soul Funk Groove (60 seconds): Start with the safe vocabulary. A major pentatonic (A-B-C#-E-F#). Groovy, warm, consonant. This is your foundation, your home base. Let it breathe. Don't rush.",
          why: "Starting with pentatonic serves three purposes: it grounds you rhythmically in the groove, it establishes a baseline of consonance for the listener (and your ear), and it demonstrates that pentatonic mastery hasn't been lost through modal training. This section should sound effortless — because it IS effortless. You've been singing pentatonic since Level 6. The ease of this section is proof of how far you've come."
        },
        {
          text: "Section B — Dorian over Dub Reggae (60 seconds): Switch the track. Shift to A Dorian (A-B-C-D-E-F#-G). The F# is your color note. Let the reggae groove's offbeat rhythm guide your phrasing. The sound should shift from bright/soulful to warm/sophisticated.",
          why: "The shift from major pentatonic to Dorian is a shift from 5 bright notes to 7 warmer notes. The listener hears the change as an emotional deepening — the same way a movie shifts from daylight to golden hour. The reggae groove supports Dorian naturally, so the mode-genre alignment makes the shift feel organic rather than academic. This section demonstrates modal awareness: you chose Dorian because it FITS the genre."
        },
        {
          text: "Section C — Mixolydian over Surf Rock (60 seconds): Switch the track. Shift to G Mixolydian (G-A-B-C-D-E-F). The F natural is your color note. Straight tone, textural vocal approach. The sound should shift from warm/reggae to open/breezy.",
          why: "Moving from Dorian to Mixolydian requires changing both the tonal center (A to G) and the modal color (raised 6th to flatted 7th). This is a significant cognitive shift — you're rebuilding your scale framework in real time. The surf groove supports the transition by providing a completely different rhythmic context, which helps your brain 'reset' between modes. This section demonstrates modal flexibility: not just knowing modes, but switching between them fluidly."
        },
        {
          text: "Section D — Free Chromatic over Khruangbin Style (60 seconds): Switch the track. No restrictions. Pentatonic, diatonic, modal, chromatic — use everything. The Khruangbin groove is spacious enough to support any melodic choice. This is total freedom.",
          why: "The final section is the culmination of the entire level. All restrictions are lifted. You can sing any of the 12 chromatic notes, use any approach tone, feature any color note, sit in any tension. The Khruangbin-style groove — spacious, hypnotic, global — is the perfect canvas because it supports everything from simple pentatonic to complex chromaticism. This section demonstrates that scale freedom is not about abandoning simpler vocabularies, but about having ACCESS to the full palette and choosing from it deliberately."
        },
        {
          text: "Listen to the full 4-minute medley. Then listen to your Level 11 Diagnostic recording (v11e0). Compare: how much has your melodic vocabulary expanded? Which modes feel natural? Where did the chromatic moments land?",
          why: "The before/after comparison is the most powerful feedback tool in music education. Your diagnostic recording captured a 5-note vocabulary (likely pentatonic). Your medley recording demonstrates a 12-note vocabulary with modal awareness, chromatic approaches, and genre-specific phrasing. The difference should be audible and dramatic. If it's not — if the medley sounds similar to the diagnostic — that means some exercises need more repetition before this level is truly complete."
        },
        {
          text: "Rate your diatonic and modal comfort again (same scale as the diagnostic). Compare to your initial ratings. Then write down the one mode that feels most like 'you.' That's your modal home base — the scale color that defines your sound.",
          why: "Closing the assessment loop provides measurable evidence of growth. Most students see a 2-3 point improvement in diatonic comfort after completing this level. The 'modal home base' question is perhaps the most important in the entire level: it asks you to CHOOSE your sound. Khruangbin's Mark Speer chose Dorian and Mixolydian. Tinariwen chose natural minor. Jeff Buckley chose 'everything.' Your choice defines your artistic identity going forward."
        }
      ],
      feel: "Like a painter who started with 5 colors and now has 12. You don't HAVE to use them all in every painting — but knowing they're available means every creative choice is deliberate. The medley should feel like a journey: safe → warm → breezy → free. Each section builds on the last.",
      wrong: "If the sections all sound the same, the mode switches aren't happening. The color notes (F# for Dorian, F for Mixolydian) need to be present. If the chromatic section sounds chaotic, rein it in — use more diatonic notes with occasional chromatic spice. If the pentatonic section sounds boring compared to the rest, good — that contrast is the point. You've outgrown the five-note box.",
      sarah: "Gene, this is the recording to save. Date it. Put it next to your Level 11 Diagnostic. The difference between those two recordings IS this level. You went from five notes to twelve. From one color to a full palette. From safe to free. That's not practice — that's transformation. And every note of it is yours."
    },
    {
      id: "v11e12", time: 8, title: "Scale Freedom Across Keys", type: "vocal",
      drone: { root: "A", octave: 2, texture: "pure" },
      recorder: true,
      pitchContour: true,
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "C4", "D4", "E4", "G4"], label: "Am Pentatonic", range: ["A3", "G4"] },
      what: "Full diatonic scale improvisation in three keys: Am, then E major, then D major. Each key has different notes, different intervals, different physical vocal sensations. The contextual interference from key switching at the diatonic level builds the most advanced form of key-independent musicianship — the ability to improvise freely in ANY key with full scale freedom.",
      setup: "Guitar for drone reference. Pitch Detector on.",
      steps: [
        { text: "Am diatonic improv (2 min): all 7 notes of A natural minor (A-B-C-D-E-F-G). Free improv — use tension notes B and F for color. This should feel familiar and comfortable from your singer-songwriter Level 5 work.", why: "Am is your anchor key for diatonic singing. Starting here establishes the musical flow state before venturing into new keys." },
        { text: "E major diatonic improv (2 min): switch drone to E. All 7 notes of E major (E-F#-Ab-A-B-C#-D#). Remember Ab = G# on the display. New notes, new intervals, new vocal sensations. The E major scale sits in a slightly different vocal register than Am — notice how your resonance shifts.", why: "E major diatonic is the biggest key jump from Am — genuinely different notes with sharps your voice has practiced in the singer-songwriter curriculum. The diatonic level (all 7 notes, including the half steps F#-Ab and C#-D#) adds more complexity than the pentatonic cross-key work from Level 6." },
        { text: "D major diatonic improv (2 min): switch drone to D. All 7 notes of D major (D-E-F#-G-A-B-C#). D major shares some notes with both Am (D, E, G, A, B) and E major (F#, C#) — it's the bridge key between your two key families.", why: "D major is the connective key — it shares notes with both Am and E major. Improvising in D major after Am and E major reveals the relationships between keys. Some phrases will transfer directly; others will need adjustment." },
        { text: "Three-key chain: 4 bars Am → 4 bars E major → 4 bars D major → 4 bars Am. Continuous improv, no stops. Navigate the key transitions by ear. Record the full chain. Self-assess: rate fluency in each key 1-5.", why: "Continuous key-switching diatonic improv is the capstone of scale freedom. When you can improvise across three diatonic keys without hesitation, your melodic vocabulary is truly key-independent." }
      ],
      feel: "Each key should sound and feel distinctly different — Am is dark and grounded, E major is bright and electric, D major is warm and acoustic. The key switches should feel like emotional gear changes, not mechanical note-swaps.",
      wrong: "If you're defaulting to pentatonic in every key (avoiding the 4th and 7th scale degrees), consciously include them. The diatonic half steps are what make each key sound unique — the pentatonic is the same in every key, but the diatonic is where key personality lives.",
      sarah: "Gene, scale freedom across three keys is the skill that makes everything from here forward possible — songwriting in any key, harmonizing on the fly, learning any song by ear. Your voice is no longer locked to Am. It's truly free.",
      levelUp: "Complete 4-minute modal medley with audible differences between each section, chromatic section sounding intentional, and measurable improvement over diagnostic recording, and improvise freely across three diatonic keys (Am, E major, D major) with key-independent scale freedom."
    },
    {
      id: "v11e13", time: 7, title: "Melodic Fragment Audiation", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4", "F4", "G4"], label: "A Natural Minor", range: ["A3", "A4"] },
      pitchContour: true,
      recorder: true,
      referencePitches: getPitchRange("A2", "A4"),
      what: "Play 2 notes, replay them internally, then AUDIATE a 3rd note — something you WANT to hear musically, not random — and sing all 3. Check with Pitch Detector. Progressive: 2+1 → 2+2 → 3+2 → full melodic fragments. This exercise bridges Level 3's audiation work with Level 11's full scale freedom. 'The sing step is non-negotiable' — it prevents finger-knowledge bypass and proves the audiation is real.",
      setup: "Guitar or piano keys for reference tones. A drone running. Pitch Detector on. Quiet room. Eyes will alternate open and closed.",
      steps: [
        { text: "Round 1 (2+1): Play two notes on guitar in A natural minor — say A3 and C4. Listen. Close your eyes. Replay them in your mind's ear. Now audiate a THIRD note that feels musically right — not random, but a note your inner ear WANTS to hear next. Open your eyes. Sing all three. Check Pitch Detector on the third note.", why: "The critical innovation here is CHOICE: you're not reproducing a played note, you're generating one from musical intention. This is Gordon Stage 6 audiation — the brain predicting and choosing the next note based on harmonic context. The first two notes establish a context; the third is YOUR musical decision made internally before any sound. The sing step proves the audiation was specific, not vague." },
        { text: "Do 5 rounds of 2+1. Vary the starting pair: try D4-E4, then E3-G3, then F4-D4 (descending). For each, the third note should feel like a natural continuation — ask yourself 'what does my ear want to hear next?'", why: "Varying the starting pair forces your audiation to work in different melodic contexts. A rising pair (A-C) will naturally suggest a rising continuation. A descending pair (F-D) suggests descent. The question 'what does my ear want?' activates the medial prefrontal cortex — the same region that lights up during creative melodic generation in fMRI studies of improvising musicians." },
        { text: "Round 2 (2+2): Play two notes. Close eyes, replay internally, then audiate TWO new notes — a 2-note continuation. Sing all four. The two audiated notes should form a mini-phrase that feels musically coherent with the played pair.", why: "Two audiated notes require your internal ear to hold a longer sequence and make two consecutive musical decisions. This doubles the working memory load and introduces SEQUENCING — the second audiated note must work with both the original pair AND the first audiated note. You're composing in real time, entirely in your head." },
        { text: "Round 3 (3+2): Play THREE reference notes. Close eyes, replay all three internally, audiate two more. Sing all five. This is a full melodic fragment — played beginning, audiated ending.", why: "At 3+2, you're working with 5-note melodic fragments that are long enough to have contour, direction, and emotional character. Three reference notes create a stronger context, which actually makes audiating the continuation EASIER — more context = better prediction. This is exactly how professional singers extend melodies in the studio: they hear the first phrase and the continuation appears in their mind's ear." },
        { text: "Round 4 — Full fragment: Play 2 notes. Audiate 3 more. Sing all 5. Now the audiated portion is LONGER than the played portion. Your inner ear is generating more than it's receiving. Close your eyes to audiate, open to check Pitch Detector after singing.", why: "When the audiated portion exceeds the reference portion, you've crossed into genuine melodic generation. This is the skill that makes songwriting and improvisation feel effortless — you hear one thing, and your trained auditory cortex completes the phrase. Pascual-Leone 1995 showed that mental practice reshapes motor cortex maps with the same efficiency as physical practice. Each audiated note is building your melodic vocabulary from the inside out." },
        { text: "Creative round: Play just ONE note. Audiate a full 4-note phrase that begins with it. Sing all 5 (the played note + your 4). The single note is a seed; the audiated phrase is what grows from it. Try 5 different starting notes.", why: "A single starting note is the maximum constraint — your inner ear must generate almost everything. This is the closest exercise to real-time composition: you hear a root, and a melody appears in your mind. With practice, this becomes how you write songs — a chord sounds, and a vocal line materializes in your auditory cortex before your mouth opens." },
        { text: "Integration: over the A drone, alternate between audiated phrases and sung phrases. Audiate a 3-4 note phrase (eyes closed, total silence), then sing it (eyes open, check Pitch Detector), then audiate the NEXT phrase as a musical continuation. Chain 4-5 phrases this way into a continuous melody — entirely pre-heard, never reactive.", why: "Chained audiation is the full Audiate-Predict-Test (APT) protocol applied to extended melodic improvisation. Every phrase is pre-heard, then executed, then checked. This is the opposite of scale-running, where the fingers (or voice) move and the ear follows. Here, the ear leads and the voice follows. Aarhus 2021 confirmed: this combined approach produces equal learning in 1/3 the time compared to voice-only practice." }
      ],
      feel: "The audiated notes should feel like they were ALREADY THERE — you're discovering them, not inventing them. When the sing step matches what you heard internally, there's a deep satisfaction, like fitting puzzle pieces. The silence between audiating and singing should feel pregnant with sound, not empty.",
      wrong: "If the audiated third note is always the same (always goes to the root, always steps up), you're defaulting to habit rather than listening. Try deliberately audiating something surprising — a skip, a tension note, a note from a different register. If you can't hear anything in the silence, hum very quietly to bridge the gap, then gradually remove the hum.",
      sarah: "Gene, this exercise is where your contemplative nature becomes a musical superpower. The silence isn't empty — it's where your ear composes. Every great melodist — Buckley, Elliott Smith, Laura Lee — hears the line before they sing it. You're training that exact skill. The sing step is non-negotiable because it's the proof: if you can sing what you audiated, the inner ear is real and working.",
      levelUp: "Chain 4 audiated phrases (3-4 notes each) into a continuous melody over a drone, with each phrase pre-heard in silence before singing, and Pitch Detector confirming accuracy within 20 cents on audiated notes."
    }
  ]
};
