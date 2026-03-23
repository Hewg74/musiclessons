import { getPitchRange } from "../appData.js";

export const level3 = {
  num: 3, name: "Building the Inner Ear", focus: "Solfege, intervals, pitch imagery, auditory training",
  duration: "35 min",
  setup: "Guitar for reference tones. Quiet room. Pitch Detector on.",
  subtitle: "Building the Inner Ear",
  description: "Before you can sing freely — float a melody over a Khruangbin groove, improvise over a reggae one-drop — your brain needs an internal map of pitch. This level builds that map: pre-hearing notes, recognizing intervals, naming scale degrees, holding pitches in memory. By the end, you won't just react to pitch — you'll navigate it.",
  artists: "Khruangbin, Allah-Las, DOPE LEMON, Tinariwen",
  unlocks: "Singing in the Beat (Level 4)",
  review: { label: "Level 2 Check-In", time: 5, exercises: ["v2e1b", "v2e3"], prompt: "Slide through the A3 passaggio on 'ooh' — smooth, no break (v2e1b). Then do siren glides bottom to top and back (v2e3). If the passaggio is cracking again, spend time on Level 2." },
  exercises: [
    {
      id: "v3e0", time: 3, title: "Diagnostic — How's Your Inner Ear?", type: "record",
      what: "Play 5 random notes on guitar in your comfortable range, sing each back. How many can you match within a semitone? This isn't pass-fail — it's a snapshot so we know what to build.",
      setup: "Guitar in hand. Pitch Detector on. Recorder on.",
      referencePitches: getPitchRange("E3", "A3"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      recorder: true,
      steps: [
        { text: "Pick 5 random single notes on guitar between E3 and A3. Don't plan them — fret random spots and pluck.", why: "Random notes force your brain to do real ear-to-voice translation instead of testing memory. That's the skill we're measuring." },
        { text: "For each note: listen 2 seconds, sing back on 'lah', check Pitch Detector. Within a semitone?", why: "The detector gives objective feedback — your sense of 'close enough' might be off." },
        { text: "Record your score: how many out of 5? Say it into the recorder.", why: "Most untrained singers land 2-3 out of 5. By the end of this level you should hit 4-5. You need a baseline to measure growth." },
        { text: "For missed notes, retry. Notice: did you go sharp, flat, or random?", why: "Sharp = too much breath pressure. Flat = not enough fold engagement (the 'porch voice' drifts flat). Random = mapping still forming." },
        { text: "Try 5 more notes with eyes closed. Does removing visual information change accuracy?", why: "Many people improve with eyes closed because the auditory cortex gets more processing bandwidth without visual competition." },
        { text: "Play one final note. Wait 5 seconds of silence. Sing it back. Was the delay harder?", why: "This tests pitch memory — your phonological loop. If the delay was much harder, that's normal and exactly what v3e10 trains." }
      ],
      feel: "Low-pressure experiment, not an exam. Some notes your voice just goes there; others feel like reaching in the dark. Both are useful data.",
      wrong: "If you're straining to force the pitch, you're muscling it. The voice follows the ear — if you can't hear the target in your head, no throat manipulation helps. Missing notes is not a sign of a 'bad ear' — it is your auditory-motor loop calibrating. Every miss gives your brain the error signal it needs to improve.",
      sarah: "Think of this like a hearing test — except fun and nobody's judging. Your brain already knows how to do most of this; we're just making the connections stronger. Whatever your score is today, it is not a measure of your musical ability — it is a snapshot of a skill that improves dramatically with practice. Gene, you are a singer building his ear. That is exactly what this is for.",
      levelUp: "Complete the diagnostic and record your baseline. No minimum — this is day one."
    },
    {
      id: "v3e1", time: 4, title: "The Forward Model — Pre-Hear Before You Sing", type: "vocal",
      drone: { root: "E", octave: 3, texture: "pure" },
      what: "Before singing a note, IMAGINE it for 3 seconds. Your brain builds a 'forward model' — a prediction of what the note should feel like. Training this prediction is what makes pitch automatic.",
      setup: "Guitar for reference. Pitch Detector on. Quiet room.",
      referencePitches: getPitchRange("E3", "G3"),
      pianoKeys: { notes: ["E3", "F#3", "A3", "B3", "C#4"], label: "E Major", range: ["E3", "C#4"] },
      pitchContour: true,
      recorder: true,
      steps: [
        { text: "Play E3. Listen 3 seconds. STOP the string. In the silence, imagine the note continuing in your head — but imagine the FULL experience: the pitch (its specific frequency), the body location (where will you feel it? E3 lives in the chest — feel the buzz behind your sternum), and the emotional character (what does E3 mean to you in this moment — warmth? depth? grounding?). Hold all three for 3 seconds. Your brain builds a 'forward model' that includes not just the sound but the physical sensation and the expressive intent.", why: "Auditory imagery activates the same cortex regions as actually hearing the note. Adding body-location awareness and emotional intention builds a richer forward model — three channels instead of one. The anterior insula processes pitch perception, body awareness, and emotional feeling simultaneously. Training all three from the start builds integrated musicianship." },
        { text: "While still imagining it, notice WHERE in your body you feel the echo of the note — each pitch has a body address. E3 lives in the chest: feel the buzz behind your sternum, a warm vibration spreading through your ribs. As you move up toward G3, the vibration climbs — from chest toward the throat and jaw, then toward the mask (cheeks, nose bridge). Now add the third dimension: what does this note want to EXPRESS? E3 might feel grounding, intimate, warm. G3 might feel brighter, more forward, more energetic. When all three are vivid — the mental sound, the body sensation, and the emotional character — sing on 'lah'. Check Pitch Detector.", why: "The gap between hearing and singing is where your brain maps imagined pitch to vocal fold tension and airflow. You're executing a prediction, not parroting. The body-scan step builds interoceptive awareness — Zamorano 2025 showed that body awareness predicts pitch accuracy even in non-singers (R²=0.41). The emotional intention layer means your forward model includes WHAT the note expresses, not just where it sits. These three channels — pitch, body, intention — are processed by overlapping brain regions (anterior insula). Training them together from the start builds a unified forward model." },
        { text: "Repeat with F3, F#3, G3, G#3. Full listen-imagine-sing cycle each time. Track accuracy.", why: "Ascending toward the passaggio, the forward model matters more — the voice does unpredictable things near the break." },
        { text: "Now WITHOUT guitar. Think of E3 — really hear it internally — then sing. Check with guitar after.", why: "Generating from memory requires a stronger internal representation. If you're within a semitone, the forward model is working." },
        { text: "Try F3, then G3 from memory alone. Is there a note your brain 'knows' better than others?", why: "Most people have anchor pitches. As a guitar player, open-string pitches like E and A are probably yours. We build outward from anchors." },
        { text: "Final round: play a note, wait 5 seconds of silence, imagine 3 seconds, then sing.", why: "Longer delay strengthens auditory working memory — like holding a weight longer makes the muscle stronger." }
      ],
      feel: "Singing should feel like ARRIVING somewhere you knew you were going — not just the right pitch, but the right body sensation and the right emotional quality. The note shouldn't surprise you in any channel. It should feel like recognition: 'Yes, that's the sound, that's the place in my body, that's what it means.'",
      wrong: "If you're skipping the imagination step, you're training reaction, not prediction. The silence IS the exercise. If you can't hear it mentally, try humming barely audibly to bridge the gap.",
      sarah: "Brain scans show trained musicians activate auditory cortex BEFORE playing a note. Untrained musicians activate it AFTER. Every listen-imagine-sing cycle rewires that timing. You are literally changing your brain's activation sequence — that is not a metaphor.",
      metronome: 60,
      levelUp: "Generate 3 out of 5 pitches from memory within one semitone, confirmed by Pitch Detector."
    },
    {
      id: "v3e2", time: 4, title: "Movable Do Solfege — Introduction", type: "vocal",
      what: "Learn Do-Re-Mi with MOVABLE Do — Do = root of whatever key. Each syllable carries FUNCTION: Do = home, Sol = dominant, Ti = tension wanting to resolve. These become cognitive hooks that organize all of pitch space.",
      setup: "Guitar for reference. Pitch Detector on. Start in C (Do = C3).",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      pitchContour: true,
      steps: [
        { text: "In C: play C3. This is 'Do.' Sing 'Do' on C3. Feel how stable it sounds — like sitting down after a long walk.", why: "Naming the tonal center 'Do' gives your conscious mind access to something your ear already feels. You're connecting a syllable to a neural sensation of stability." },
        { text: "Sing C major with solfege: Do(C3)-Re(D3)-Mi(E3)-Fa(F3)-Sol(G3)-La(A3)-Ti(B3)-Do(C4). One note per beat, 70 BPM.", why: "Each syllable encodes function: Re = forward motion, Mi = bright, Fa = slight lean, Sol = strong, La = bittersweet, Ti = tense. These qualities stay the same in every key." },
        { text: "Descending: Do(C4)-Ti-La-Sol-Fa-Mi-Re-Do(C3). Notice how each degree changes character — descending Ti feels like falling, not tension.", why: "Most people find descending harder because we naturally think 'up.' The descent also changes emotional quality — La descending feels like resolution into Sol." },
        { text: "MOVE Do to G. Sing: Do(G3)-Re(A3)-Mi(B3)-Fa(C4)-Sol(D4). Do on G should feel as stable as Do on C.", why: "This is movable Do's power: solfege describes relationships, not frequencies. Like 'left' and 'right' work regardless of which direction you face." },
        { text: "Move Do to D. Sing: Do(D3)-Re(E3)-Mi(F#3)-Fa(G3)-Sol(A3). F#3 is Mi in D — same 'bright third' quality.", why: "F#3 and E3 are different pitches but both function as Mi. Recognizing 'Mi-ness' independent of pitch is what lets musicians sing in any key." },
        { text: "Sing Do-Mi-Sol (the major triad) in C, G, and D. Same solfege pattern, three keys.", why: "Singing the triad across keys trains your brain to hear 'major chord' as a solfege pattern. This scaffolding eventually lets you hear any chord and know its function." },
        { text: "Freestyle: play any note on guitar. Call it Do. Sing Do-Re-Mi-Fa-Sol from that root.", why: "Building a scale from an arbitrary root tests whether the interval pattern has become a motor sequence. Each rough attempt strengthens the mapping." }
      ],
      feel: "When solfege clicks, each syllable carries personality. Do = porch, Re = standing up, Mi = sunshine, Sol = mountain overlook, Ti = held breath. Characters, not labels.",
      wrong: "If all syllables feel the same, slow down. Hold Do 4 beats — feel stability. Hold Ti 4 beats — feel discomfort. The functional feeling is the whole point. After your last round, set this down for 60 seconds. Then sing the scale from memory without the drone. That retrieval under silence is where solfege locks into long-term memory.",
      sarah: "Solfege gives your brain NAMES for pitch relationships. Before street names, every destination was 'turn left, turn right.' Solfege gives your pitch map street names.",
      metronome: 70,
      levelUp: "Sing Do-Re-Mi-Fa-Sol ascending in 3 keys (C, G, D), within one semitone per degree."
    },
    {
      id: "v3e3", time: 4, title: "Interval Anchoring with Songs", type: "vocal",
      what: "Every interval has a 'song anchor' — a melody that starts with that interval. By attaching intervals to songs you know, you hijack existing neural templates for instant recognition.",
      setup: "Guitar for playing intervals. Pitch Detector on. No backing track.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      recorder: true,
      steps: [
        { text: "Minor 2nd (half step): C3 to Db3. JAWS theme — 'duh-nuh.' Sing it. Feel how tight and menacing.", why: "Your brain recognizes this as 'danger' from movie soundtracks. Anchoring to Jaws gives instant recall — leveraging existing pathways, not building from scratch." },
        { text: "Major 2nd (whole step): C3 to D3. 'Happy Birthday' — 'Hap-py.' Neutral, forward-moving.", why: "Most stepwise melody movement is major 2nds. Your brain has a bulletproof template already — we're just labeling it." },
        { text: "Minor 3rd: C3 to Eb3. 'Smoke on the Water' — 'dun dun DUN.' Bluesy, dark.", why: "The minor 3rd is all over Khruangbin's bass lines and vocal melodies. This interval already feels like home to your ears." },
        { text: "Major 3rd: C3 to E3. 'Oh When the Saints' — 'Oh when the SAINTS.' Bright, optimistic.", why: "Defines major vs. minor — the sunshine interval. In solfege, Do to Mi. The anchor reinforces the brightness from your solfege work." },
        { text: "Perfect 4th: C3 to F3. 'Here Comes the Bride' — 'Here COMES the.' Bold, open.", why: "Many surf rock and reggae melodies use 4ths prominently. The anchor is visceral — you don't just recognize it, you FEEL it." },
        { text: "Perfect 5th: C3 to G3. 'Twinkle Twinkle' / Star Wars. The backbone of harmony.", why: "Do to Sol. Guitar players know this as the power chord interval — your fingers know it, now your voice matches." },
        { text: "Octave: C3 to C4. 'Somewhere Over the Rainbow' — 'SOME-where.' The biggest leap.", why: "Same note, different frequency. The leap requires the forward model — pre-hear C4 before you jump to it." },
        { text: "Quiz: play 10 random intervals. Name each by song anchor. How many can you get?", why: "Active recall under pressure strengthens connections exponentially. Don't aim for 10/10 today — you're building the retrieval pathways." }
      ],
      feel: "When it clicks, you hear anchors everywhere — car horns, doorbells, your favorite songs. 'That's a perfect 4th!' becomes involuntary.",
      wrong: "If anchors aren't sticking, focus on just 3: minor 3rd, perfect 4th, perfect 5th. Most common in your genres. Cramming all 7 overloads working memory.",
      sarah: "Song anchors are a cheat code. Your auditory cortex already has a perfect template for 'Twinkle Twinkle' — we're just labeling it 'perfect 5th.' Building on existing infrastructure.",
      levelUp: "Correctly identify 5 out of 7 intervals by song anchor when played randomly."
    },
    {
      id: "v3e4", time: 3, title: "Auditory Imagery — The Silent Scale", type: "vocal",
      what: "Sing part of a scale out loud, THINK the next notes silently, then sing out loud again. If your internal tracking is accurate, you land on the right note. Pure auditory imagery training.",
      setup: "Guitar for checking. Pitch Detector on. Key of C.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      pitchContour: true,
      recorder: true,
      steps: [
        { text: "Sing the full C major scale with solfege. Confirm it's accurate — this is your reference template. On the second pass, close your eyes and track the full embodied experience as you ascend: Do in the chest (feel the sternum buzz, sense the stability of home), Re and Mi still in the chest but lighter (forward motion, brightness), Fa and Sol climbing toward the throat and jaw (a slight lean, then strength), La and Ti reaching into the mask (bittersweet, then tension wanting to resolve), high Do at the crown (arrival). Notice THREE things shifting as you ascend: the pitch rises, the body location climbs, and the emotional arc builds from grounding through tension to resolution. During the silent portions that follow, does your body still configure as if singing? Can you feel the chest engagement subtly shifting toward the mask as the imagined pitch rises? Can you sense the emotional arc — grounding at Do, tension at Ti? The body and emotions respond to IMAGINED music almost identically to real music (Zamorano 2025).", why: "You need the complete auditory-somatic-emotional trace before removing parts. The full scale creates a three-channel memory: pitch sequence + body-location map + emotional arc. Adding body and emotional awareness to the scale template makes the silent portions dramatically more vivid — your body knows where it's going AND how it should feel even when your ears have no external reference. The vibration-rising map from chest to crown follows bone-conducted resonance pathways that are cross-culturally universal (Nummenmaa 2024, PNAS)." },
        { text: "Sing Do-Re-Mi OUT LOUD. Think Fa-Sol SILENTLY. Sing La OUT LOUD. Is your La on A3?", why: "During silent Fa-Sol, fMRI shows your auditory cortex lights up almost identically to actual singing. Your brain barely distinguishes imagined from real sound." },
        { text: "Harder: Do-Re OUT LOUD. Mi-Fa-Sol SILENTLY. La OUT LOUD. Three silent notes = more drift time.", why: "Like walking with eyes closed — longer silence means more drift. Most people drift flat because the brain conservatively under-estimates pitch without feedback." },
        { text: "Hardest: just Do OUT LOUD. Re-Mi-Fa-Sol-La-Ti SILENTLY. Do(C4) OUT LOUD. Did you hit the octave?", why: "Six silent degrees is hard even for trained musicians. If you're within a semitone of C4, your inner ear is remarkably strong." },
        { text: "Move to G: Do = G3. Sing Do-Re-Mi aloud, think Fa-Sol silently, sing La aloud. Is La on E4?", why: "Changing keys tests whether your imagery is flexible or locked to C. The higher La adds a physical range challenge on top of the tracking challenge." },
        { text: "Cool-down: full scale aloud again. Notice how vivid each note feels after the silent work.", why: "After imagery training, full-voice singing feels easier — like taking off ankle weights. The forced processing sharpened your forward model." }
      ],
      feel: "Silent portions should feel like intense inner concentration. When you re-enter with sound, the right note should feel like it was waiting for you.",
      wrong: "Landing way off? You might be rushing silent portions. Think each silent note at the same tempo as sung notes. Use the metronome to maintain time through the silence. If the silent notes feel impossible to hold in your mind, that is the exact skill you are building — auditory imagery grows with practice, not with talent.",
      sarah: "THINKING a note activates nearly the same neural real estate as SINGING it. Your auditory cortex fires almost identically during imagined singing. Silent practice IS practice — literal neuroscience, not metaphor.",
      metronome: 70,
      levelUp: "Land within one semitone after 3 silent degrees (Do-Re aloud, Mi-Fa-Sol silent, La aloud), 3 times in a row."
    },
    {
      id: "v3e5", time: 3, title: "Pentatonic Solfege", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "The pentatonic in solfege: Do-Re-Mi-Sol-La. No Fa, no Ti. Every note sounds good. This is the scale of surf rock, reggae, blues — most of the music you love.",
      setup: "Guitar for drone. Pitch Detector on. Key of A (Do = A2).",
      referencePitches: getPitchRange("A2", "A3"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Open A string drone. Sing A major pentatonic: Do(A2)-Re(B2)-Mi(C#3)-Sol(E3)-La(F#3)-Do(A3). One note per 2 beats, 85 BPM.", why: "The pentatonic removes the two tension notes, leaving five consonant degrees. The drone lets you HEAR how each degree relates to the root in real time." },
        { text: "Descending: Do(A3)-La(F#3)-Sol(E3)-Mi(C#3)-Re(B2)-Do(A2). La-Sol has a sweet, melancholy quality.", why: "This descending contour IS laid-back singing. DOPE LEMON melodies descend through pentatonic shapes. La-Sol-Mi is the genetic code of chill music." },
        { text: "Over Reggae One Drop, strum Am and sing pentatonic patterns freely with solfege: Do-Re-Mi, Sol-La-Do, mix it up.", why: "Free patterns are where solfege becomes creative. 'Sol-La-Do' feels emotionally different from 'Do-Re-Mi' — naming them helps your brain catalog the differences." },
        { text: "Sing a 4-note phrase, then start it from a different degree. Example: Do-Re-Mi-Sol becomes Sol-La-Do-Re.", why: "Transposing within the scale tests interval awareness. Same relationships, different starting points — like playing a riff in different fretboard positions." },
        { text: "Move Do to E. Sing E pentatonic over an E drone. Does each degree's character feel the same?", why: "If Mi in E feels as bright as Mi in A, your brain is tracking function not absolute pitch. You already think in movable shapes on the fretboard — solfege is the vocal equivalent." },
        { text: "Free improvisation over the backing track: pentatonic melodies in A, solfege syllables. Create phrases that feel like actual music.", why: "Five notes, every combination sounds good. Try channeling Allah-Las — their vocal melodies are almost entirely pentatonic. You're composing with a named vocabulary." }
      ],
      feel: "Like speaking a simple, beautiful language. When a phrase comes out sounding like a real melody — that's the moment. Your inner ear guided you using named degrees.",
      wrong: "If you keep singing Fa or Ti, you're defaulting to the full scale. If a note sounds tense, you probably hit one. Reset on the drone.",
      sarah: "The pentatonic shows up everywhere — West Africa, Scottish Highlands, Japanese folk, surf rock. It might be hardwired into human auditory processing. It sounds like home to every ear.",
      metronome: 85,
      levelUp: "Improvise 8 bars of pentatonic melody over the track using solfege, no Fa or Ti."
    },
    {
      id: "v3e6", time: 3, title: "Sing-Back Dictation", type: "vocal",
      what: "Play short patterns on guitar, sing them back. 2-note to 4-note patterns. Hear it, hold it, reproduce it — the fundamental ear skill.",
      setup: "Guitar in hand. Pitch Detector on. Recorder on. Stay between E3 and A3.",
      referencePitches: getPitchRange("E3", "A3"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      recorder: true,
      steps: [
        { text: "Play 2 stepwise notes: E3-F3, F3-G3, G3-A3. Sing each pair back on 'lah-lah.'", why: "Simplest dictation — one interval, two pitches. Stepwise motion is easiest because minimal pitch distance means minimal tracking demand." },
        { text: "Now 2-note SKIPS: E3-G3, F3-A3, E3-A3. Bigger intervals are harder to reproduce.", why: "E3 to A3 is a perfect 4th — your 'Here Comes the Bride' anchor. If you name the interval then sing it, the systems are connecting." },
        { text: "3-note patterns: E3-F3-G3, G3-F3-E3, E3-G3-A3. Ascending, descending, mixed.", why: "Three notes introduce CONTOUR — the melodic shape. Your brain tracks contour before exact pitches. Both processing streams matter." },
        { text: "3-note patterns with REPEATS: E3-E3-G3, G3-A3-A3. Can you hear 'same' vs. 'new'?", why: "Your brain expects movement in a pattern, so repeated notes can register as change. Catching repeats requires pitch-level attention, not just contour tracking." },
        { text: "4-note patterns: E3-F3-G3-A3, A3-G3-F3-E3, E3-G3-F3-A3. The working memory sweet spot.", why: "Research suggests ~4 items is the chunk capacity for untrained listeners. Practicing at this boundary expands your musical working memory." },
        { text: "Remove visual cues: play without looking at the fretboard. Pure ear training.", why: "Visual input makes it easier but trains the ear less. Blind sing-backs build stronger auditory pathways." },
        { text: "Challenge: 4-note pattern, 5 seconds silence, THEN sing back.", why: "Delay plus complexity doubles the working memory challenge. If you nail it, your auditory memory is solid." }
      ],
      feel: "Like musical catch — someone throws a pattern, you catch it. A satisfying click of recognition, or the pattern slips away.",
      wrong: "If everything's a blur, drop to 2-note stepwise until effortless, then add complexity. Check guitar intonation too.",
      sarah: "Musical conversation — your guitar says something, your voice responds. The better your ear, the more nuanced the conversation. After each set, pause for a minute and try to recall the last few patterns from memory. That retrieval practice — pulling the melody back without hearing it again — builds stronger ear-voice connections than repetition alone.",
      levelUp: "Accurately sing back 3 out of 5 random 4-note patterns on first attempt."
    },
    {
      id: "v3e7", time: 3, title: "Root Finding", type: "vocal",
      what: "Strum a chord, close your eyes, find and sing the root. Then the 3rd, then the 5th. You're learning to hear individual notes inside a harmony.",
      setup: "Guitar in standard tuning. Pitch Detector on. Chords: Am, C, G, D, Em.",
      referencePitches: getPitchRange("D3", "G3"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      recorder: true,
      steps: [
        { text: "Strum Am, let it ring. Close eyes. Find the lowest note — root: A. Sing on 'Do'. Check Detector.", why: "The root is what everything else orbits. Your brain naturally gravitates toward the bass note — you're learning to isolate what your ear already notices." },
        { text: "Still Am: find the 3rd (C) — the note that makes it MINOR. Sing on 'mi'. If stuck, play A and C separately first.", why: "The 3rd defines major vs. minor. Isolating it requires filtering out root and fifth — much harder than root finding." },
        { text: "Still Am: find the 5th (E). Sounds hollow, open. Sing on 'sol'.", why: "Root-3rd-5th teaches harmonic hearing — perceiving individual notes within a chord. This decomposition is the foundation of harmonic ear training." },
        { text: "C major: root (C), 3rd (E — MAJOR, bright), 5th (G). Notice the major 3rd vs. Am's minor 3rd.", why: "Root and 5th feel similar across chord types, but the 3rd is where personality lives. E in C major feels completely different from C in Am." },
        { text: "Work through G (G-B-D), D (D-F#-A), Em (E-G-B). Strum, close eyes, find each tone.", why: "Different guitar voicings change which notes are prominent. D has root on 4th string (harder). Em has root on 6th string (easiest)." },
        { text: "Challenge: strum chords without looking. Identify the chord AND sing its root.", why: "Chord ID plus root singing simulates real listening — when a chord changes in a song, your brain needs to orient harmonically in real time." }
      ],
      feel: "Like zooming into a photo. Root is biggest/easiest. 5th is next. 3rd requires the most focus but gives the most harmonic information.",
      wrong: "Can't isolate anything? Strum, then play just the root separately. Hear it 'inside' the chord? Strum again and hunt for that frequency.",
      sarah: "It's like tasting individual ingredients in a dish. At first, just 'food.' A trained palate picks out garlic, cumin, lime. Your ear works the same way — right now 'chord,' eventually 'A with C and E.'",
      levelUp: "Sing the root of 4 out of 5 randomly played chords on first attempt."
    },
    {
      id: "v3e8", time: 4, title: "Interval Singing in Context", type: "vocal",
      what: "Over a backing track, sing specific intervals above the bass note. Intervals feel different in musical context — this is where ear training becomes music.",
      setup: "Backing track playing. Pitch Detector on. Guitar for checking.",
      referencePitches: getPitchRange("A2", "E4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }
      ],
      steps: [
        { text: "Play Khruangbin Style 80. Find the bass — around A. Sing the ROOT along with it in your comfortable octave.", why: "Before intervals, you need the bass. Harder to isolate with drums and guitar, but it's the loudest low-frequency sound." },
        { text: "Sing a MAJOR 3RD above the bass. Bass = A, sing C#. Hold 4 beats.", why: "A major 3rd in a full arrangement sounds different from in silence. Context changes everything." },
        { text: "PERFECT 5TH above the bass. Bass = A, sing E. Hold 4 beats. Notice how it almost disappears.", why: "The 5th is so consonant it blends invisibly. Hearing it as separate builds harmonic independence." },
        { text: "OCTAVE above the bass. Bass = A, sing A3/A4. If it drifts, you'll hear wavering.", why: "Any drift creates audible beating against the bass — built-in tuning feedback." },
        { text: "Switch to Deep Soul Groove 80. Bass moves more. When it lands clearly, sing a perfect 4th above.", why: "Moving bass means tracking root in real time and calculating on the fly — much closer to real singing." },
        { text: "Game: bass lands, one beat to identify, one beat to sing a 5th above. Listen-identify-sing. Repeat.", why: "Time pressure compresses the pipeline into seconds. Speed comes from repetition — even sloppy attempts build the pathway." },
        { text: "Cooldown: sing whatever feels natural over either track. Notice if your instincts shifted.", why: "After focused interval work, free singing sounds more intentional. The forward model sharpens your subconscious pitch choices." }
      ],
      feel: "You feel INSIDE the music rather than on top of it. Each interval locks into the harmony. The track becomes a collaborator.",
      wrong: "If everything sounds wrong, you're mishearing the bass. Stop singing, LISTEN 30 seconds, hum along, get the root locked. Wait for clear bass notes.",
      sarah: "This is where ear training becomes MUSICAL. Singing intervals in context is what real musicians do — trained ones just do it so fast it looks automatic. You are slowing it down to learn each step. In your final two minutes, mix interval singing with something from Level 2 — a passaggio slide, a vowel modification. Interleaving different skills builds more flexible musicianship than drilling one thing in isolation.",
      metronome: 80,
      levelUp: "Accurate perfect 5ths above the bass in real time for at least 4 chord changes."
    },
    {
      id: "v3e9", time: 3, title: "The Tonic Magnet", type: "vocal",
      what: "Sing Do-Re-Mi-Fa-Sol-La-Ti... STOP. Feel the pull — your brain wants Do. That magnetic pull is called the 'tonic magnet' and it's one of the most powerful forces in music.",
      setup: "Guitar for reference. Pitch Detector on. Key of C.",
      referencePitches: getPitchRange("C3", "C4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      pitchContour: true,
      recorder: true,
      steps: [
        { text: "Ascend: Do-Re-Mi-Fa-Sol-La-Ti... STOP on Ti(B3). Hold it. Feel the pull upward toward C4.", why: "Ti is only a half step below Do. Your auditory cortex generates an expectation of resolution — that unresolved prediction IS the tension you feel. Neural architecture, not preference." },
        { text: "Now resolve: Ti-Do (B3-C4). Feel the relief. Do this 3 times: scale to Ti, pause 4 beats, resolve.", why: "Pause-resolve cycles bring a subconscious process into awareness. Feeling tension then release teaches you to deploy both deliberately in singing." },
        { text: "Try NOT resolving. Sing to Ti then descend: Ti-La-Sol. Feel like an itch you didn't scratch.", why: "Khruangbin melodies hang on unresolved tones constantly — that's the hypnotic quality. Sitting with unresolved tension is an aesthetic skill, not just ear training." },
        { text: "Descend: Do-Ti-La-Sol-Fa-Mi-Re... STOP on Re(D3). Feel the downward pull to Do(C3). Weaker than Ti's.", why: "Re is a whole step from Do (vs. Ti's half step). Magnetic pull strength is proportional to proximity — that's why Ti-Do is the strongest resolution in music." },
        { text: "In G: ascend to Fa(C4). Stop. Feel the pull DOWN to Mi(B3). Same half-step magnetism, opposite direction.", why: "Fa-Mi is the other half-step pair in the major scale. Together with Ti-Do, these two resolution pairs define tonal harmony." },
        { text: "Play I-IV-V (C-F-G). Over each chord, sing the pull note: Ti over C, Fa over F, Ti over G.", why: "The magnet works differently over different chords. Ti over G feels different from Ti over C. These context-dependent pulls are the foundation of melodic improvisation." }
      ],
      feel: "The pull should feel almost PHYSICAL — gravity on your voice. Ti = tense, incomplete. Do = sigh of relief. If you feel this, your tonal hearing is calibrated.",
      wrong: "If Ti doesn't pull, you might be singing it flat (closer to La) or sharp (already at Do). Check: Ti in C is B3, exactly one semitone below C4.",
      sarah: "Without anyone teaching you, your brain learned Ti resolves to Do — just from hearing thousands of songs. Your auditory system tracked what follows Ti, noticed it's almost always Do, and built a prediction. When Do doesn't come, you feel the prediction error — your brain's expectations in real time.",
      levelUp: "Feel and demonstrate Ti-Do pull in 3 keys by pausing on Ti 4 beats before resolving."
    },
    {
      id: "v3e10", time: 3, title: "Pitch Memory Test", type: "vocal",
      drone: { root: "E", octave: 3, texture: "pure" },
      what: "Play a note. Wait in silence — 5, 10, 15, 30 seconds. Sing it back. How long can you hold pitch in memory? This trains the same brain system that holds a phone number.",
      setup: "Guitar. Pitch Detector on. Recorder on. Timer visible. Dead silence.",
      referencePitches: getPitchRange("E3", "A3"),
      pianoKeys: { notes: ["E3", "F#3", "A3", "B3", "C#4"], label: "E Major", range: ["E3", "C#4"] },
      recorder: true,
      steps: [
        { text: "Play E3. Listen 2 seconds. Silence string. Count 5 seconds of TOTAL silence (no humming). Sing on 'lah'. Check.", why: "The phonological loop holds info ~2-3 seconds before decay. At 5 seconds, your brain must actively rehearse the pitch internally to maintain it." },
        { text: "Same E3, but 10 seconds of silence. The note may feel fainter — like a voice at the end of a hallway.", why: "Past the natural decay window. Your brain maintains it through subvocal rehearsal — silently singing on repeat. Same mechanism as holding a phone number." },
        { text: "15 seconds. The note may blur — you know roughly where it is but precision fades.", why: "Pitch memory decays logarithmically — last seconds lose more than first. Most people retain the region but not the exact pitch at this duration." },
        { text: "Boss level: 30 seconds. Stare at the clock. Then sing.", why: "Most untrained people lose it by 20 seconds. Within a whole step at 30 is remarkable. The improvement curve is steep — each session extends your ceiling." },
        { text: "Try G3. Does memory hold some notes better than others?", why: "Open-string pitches (E, A, D, G, B) may be your anchors — you've heard them thousands of times on guitar. These stronger representations are your reference points." },
        { text: "Distraction: play E3, then count backwards 20 to 10 OUT LOUD during the 10-second silence. Then sing.", why: "Counting occupies the phonological loop. If you still find the pitch, you have storage beyond working memory — the beginning of long-term auditory memory." }
      ],
      feel: "Short delays: the note is right there. Longer: it fades like a photo in the sun. At 30 seconds, you're reaching for something almost gone. Any recovery is a win.",
      wrong: "Humming during silence is cheating — bypasses the memory challenge. If you're consistently sharp after long delays, that's normal: the brain tends to sharpen pitch memories over time.",
      sarah: "When you play guitar and sing, there's a gap between hearing the chord and producing your note. Your brain HOLDS harmonic info to guide your voice. The longer you can hold pitch, the more singing freedom you have.",
      levelUp: "Accuracy within one semitone after 15 seconds of silence, 3 out of 5 attempts."
    },
    {
      id: "v3e11", time: 4, title: "Level Integration — Ear Training Relay", type: "vocal",
      what: "A 6-section circuit combining everything from this level: root finding, solfege, intervals, imagery, memory, improvisation. The capstone proving all skills work together.",
      setup: "Guitar. Pitch Detector on. Recorder on. Backing track ready. Breathe between sections.",
      referencePitches: getPitchRange("C3", "A3"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true,
      steps: [
        { text: "SECTION 1 — Root Finding: Strum random chord (Am, C, G, D, Em). Eyes closed. Sing root 'Do', 3rd 'Mi/me', 5th 'Sol'.", why: "Root finding plus solfege naming = dual coding. Hearing AND naming creates stronger memory traces than either alone." },
        { text: "SECTION 2 — Interval Quiz: Play two random notes. Name the interval by anchor ('Perfect 4th — Here Comes the Bride'). Sing it.", why: "Speed requirement simulates real music. No time to deliberate — your anchor system has to fire fast." },
        { text: "SECTION 3 — Auditory Imagery: Sing Do-Re-Mi aloud, think Fa-Sol-La silently, sing Ti-Do aloud. Land on pitch.", why: "Imagery after an interval quiz is harder — your brain is still switching modes. That's the real-world condition to train for." },
        { text: "SECTION 4 — In Context: Start Deep Soul Groove 80. Sing root, then 5th above, then 3rd. Move as harmony changes.", why: "Interval singing while fatigued builds automaticity. Skills that work when you're tired are truly learned." },
        { text: "SECTION 5 — Pitch Memory: Stop track. Play a note, 10 seconds silence, sing back. Then a 3-note pattern, 10 seconds, sing back.", why: "Memory as final section tests working memory at its most depleted — the hardest possible condition." },
        { text: "SECTION 6 — Free: Over the track, 8 bars pentatonic solfege (Do-Re-Mi-Sol-La). Include a skip, resolve to Do, hold one note 4 beats.", why: "Free improvisation activates every skill implicitly: root finding, solfege, forward model, pitch memory, tonic magnet. All working together." },
        { text: "Record the full relay. Listen back. Where did you stumble? Those are next session's priorities.", why: "Your in-the-moment perception differs from reality. The recording is objective. Efficient practice targets weaknesses." }
      ],
      feel: "Like a workout — engaging, not exhausting. Each section uses a different ear muscle. When the improvisation sounds musical, your inner ear is developing.",
      wrong: "Overwhelming? Go back to individual exercises until comfortable. The relay integrates skills — it does not build them. Always end this relay on an exercise you feel strong in — close with confidence, and that's the feeling you'll carry forward.",
      sarah: "Imperfect attempts at combined skills drive neural integration faster than perfect isolated attempts. Your brain learns most during SWITCHES between modes — the stumbles aren't failures, they're the learning events.",
      metronome: 80
    },
    {
      id: "v3e12", time: 7, title: "Ears Only — Feedback Fading", type: "vocal",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      referencePitches: getPitchRange("A3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      pitchContour: false,
      recorder: true,
      metronome: 70,
      what: "Same solfege and interval exercises you've been doing — but with the pitch detector TURNED OFF. Motor learning research shows that 100% real-time feedback during practice actually DECREASES long-term retention. It becomes a crutch. Faded feedback — gradually removing the visual display — forces your internal auditory discrimination to develop. This is where your ear really learns to lead.",
      setup: "Guitar for drone. Pitch Detector OFF — cover it, minimize it, or turn the screen away. Recorder ON (you'll check accuracy AFTER, not during).",
      steps: [
        { text: "Sing Do-Re-Mi-Fa-Sol in Am WITHOUT looking at the pitch display. Trust your ear. Feel the distances between notes in your body. If a note feels uncertain, commit to it anyway.", why: "Removing visual feedback forces the auditory-motor loop to operate on internal references alone. Research on feedback fading (Winstein & Schmidt 1990, updated by Wulf 2025) shows that 100% concurrent feedback creates dependency — learners perform well WITH feedback but poorly WITHOUT it. Faded feedback produces the opposite: slightly worse performance during practice but significantly better retention and transfer." },
        { text: "Sing the intervals from v3e3: minor 3rd (A-C), perfect 5th (A-E), perfect 4th (A-D). No visual reference — only your internal hearing.", why: "Intervals without visual confirmation test whether your anchor song system (from v3e3) has been internalized. If you can produce a perfect 5th accurately without the pitch display, the interval is stored in long-term auditory-motor memory, not just recognized when shown on screen." },
        { text: "4-note melody dictation: play a random 4-note phrase on guitar, then sing it back. No pitch display. Trust the forward model.", why: "Melody reproduction without feedback is the ultimate test of the forward model built in v3e1. Your brain must: (1) encode the heard melody, (2) generate a motor plan for reproduction, (3) execute without visual correction. This is exactly what happens in real singing — you hear a melody and reproduce it with no pitch display available." },
        { text: "Now turn the pitch display BACK on and repeat the same exercises. Compare: were you more accurate than you thought? Most people are. The display confirms what your ear already knew.", why: "The reveal moment is pedagogically powerful. Most students discover they were more accurate without feedback than they expected. This builds confidence in internal hearing and reduces dependency on the visual display. The surprise of being accurate without help is more motivating than being accurate with help." },
        { text: "Going forward: alternate between 'eyes on' and 'eyes off' practice sessions. The research says a 50/50 split produces better long-term accuracy than 100% feedback.", why: "The 50/50 feedback schedule is supported by motor learning research across domains — it applies to pitch accuracy, sports skills, and rehabilitation. The alternation forces the brain to develop both the internal reference (eyes off) and the error correction system (eyes on). Neither alone is optimal; the combination produces the best long-term retention." }
      ],
      feel: "Eyes-off practice should feel slightly vulnerable — like singing without a safety net. That vulnerability IS the learning. Your ear is being forced to lead instead of follow. The discomfort decreases rapidly as your internal hearing strengthens.",
      wrong: "Do NOT peek at the pitch display during eyes-off sections — that defeats the entire purpose. If you find yourself unable to resist checking, physically turn the screen away. Also: do not judge accuracy during eyes-off practice. The point is not to be perfect without feedback — the point is to PRACTICE without feedback. Accuracy improves over sessions, not within a single session.",
      sarah: "Gene, this is the exercise that separates people who can sing with a tuner from people who can actually sing. Every great singer you love — Mark Speer humming over a Khruangbin groove, Angus Stone floating a melody — they have no pitch display. They trust their ear. You need to trust yours too. And the only way to build that trust is to practice without the safety net. Try it your way — choose how long to go without the display, choose which exercises to test. The more ownership you take of the process, the deeper the learning goes."
    },
    {
      id: "v3e13", time: 8, title: "Intervals in Three Keys", type: "vocal",
      drone: { root: "A", octave: 2, texture: "pure" },
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "B3", "C4", "D4", "E4"], label: "Ear Training", range: ["A3", "E4"] },
      pitchContour: true,
      recorder: true,
      what: "The same intervals you learned in Am — now sing them in E major and A major. Same SIZE jump, completely different SOUND because the key colors the interval. The contextual interference from switching keys forces your brain to build abstract interval recognition rather than key-specific pitch memory.",
      setup: "Guitar for drone changes. Pitch Detector on. Recorder on.",
      steps: [
        { text: "In Am: sing A→C (minor 3rd), A→E (perfect 5th), A→D (perfect 4th). Feel each interval.", why: "Starting in the familiar key establishes the baseline. These intervals should feel comfortable after the work in v3e3. The familiar context serves as the reference point against which the new keys will be compared." },
        { text: "Switch drone to E major. Sing E→Ab (major 3rd), E→B (perfect 5th), E→A (perfect 4th). Same SIZES but different SOUNDS. The 5th from E (E→B) should feel the same as the 5th from A (A→E) — same physical distance, different pitch.", why: "The key switch reveals whether your interval recognition is abstract (size-based) or concrete (pitch-based). If the 5th from E feels unfamiliar even though the 5th from A is easy, your brain has learned specific pitches, not interval sizes. The practice of singing the same interval in a new key forces abstraction." },
        { text: "Switch to A major. Sing A→C# (major 3rd), A→E (perfect 5th), A→D (perfect 4th). Now compare: the 5th from A in Am (minor context) vs. the 5th from A in A major (major context). Same two notes (A and E) — but the DRONE underneath changes the emotional meaning.", why: "This is the deepest insight in interval training: the same two notes can feel different depending on harmonic context. A→E over an Am drone feels melancholy; A→E over an A major drone feels bright. The interval size is identical, but the musical MEANING changes. Understanding this context-dependency is what separates mechanical interval recognition from real musical hearing." },
        { text: "Random key switching: alternate Am → E major → A major, singing the same interval in each. The key switch gets easier each time.", why: "Rapid key switching creates maximal contextual interference, which research consistently shows produces superior long-term learning compared to blocked practice (staying in one key). The initial difficulty of switching is the price you pay for deeper, more durable learning. Each switch forces a motor plan rebuild that strengthens the abstract interval representation." },
        { text: "Self-assess: rate your accuracy in each key 1-5. The weakest key needs the most practice.", why: "The accuracy differential between keys quantifies how key-specific your current skills are. Equal ratings across all three keys indicate fully abstract interval recognition — the goal. Unequal ratings reveal which key contexts need more exposure. Preferentially practicing the weakest key will equalize performance fastest." }
      ],
      feel: "The first key switch should feel jarring — like the ground shifted under your feet. The second switch is easier. By the end of the exercise, switching keys should feel like changing lanes on a highway — a deliberate move that requires attention but not anxiety.",
      wrong: "If all three keys feel equally impossible, you may need more time with single-key interval practice (v3e3) before adding multi-key work. The multi-key exercise builds on single-key competence — it does not replace it. Also: make sure you actually CHANGE the drone when switching keys. Singing E major intervals over an Am drone is a different exercise entirely (and much harder).",
      sarah: "Real music changes keys constantly — even within a single song. If your ear only works in Am, you can only sing in Am. This exercise breaks that limitation. By the time you finish Level 3, intervals should feel the same SIZE in every key, even though they sound different. That is abstract interval hearing — the foundation of musical fluency. The discomfort of switching keys IS the exercise — your brain learns most during those transitions, not during the comfortable stretches.",
      levelUp: "Complete the full 6-section relay with no section below 50% accuracy. Record and review. Practice with pitch feedback OFF for long-term retention, and navigate intervals across three keys (Am, E major, A major) with cross-key fluency."
    }
  ]
};
