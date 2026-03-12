import { getPitchRange } from "../appData.js";

export const level1 = {
  level: 1,
  title: "Pentatonic & Rhythm Basics",
  subtitle: "The actual starting line. Scale, chords, strum, play.",
  description:
    "Everything starts here — the Am pentatonic shape, five open chords, your first strumming patterns, and a taste of the blues scale. This level teaches the real prerequisites: the things every other level assumes you already know. By the end, you'll improvise over a backing track using call-and-response phrasing. No prior guitar knowledge required.",
  artists: "DOPE LEMON, general foundation",
  unlocks: "Surf & Jangle (Level 2)",
  exercises: [
    {
      id: "gs-1-1",
      time: 10,
      title: "Am Pentatonic — The Shape",
      type: "guitar",
      referencePitches: ["A2", "C3", "D3", "E3", "G3", "A3"],
      fretboard: { scale: "am-pentatonic", position: 1 },
      what: "Learn the Am pentatonic scale in 5th position, note by note. This is the most important shape on the guitar — it's the foundation for blues, rock, surf, reggae, and everything else in this curriculum. The notes are A-C-D-E-G.",
      setup: "Clean tone, neck pickup. Metronome at 60 BPM.",
      steps: [
        { text: "Start on the low E string, 5th fret — that's the note A. Play it, say 'A' out loud. Move to the 8th fret — that's C. Play it, say 'C.' These two notes live on one string.", why: "Saying the note names out loud connects your ears, voice, and fingers. Most guitarists learn shapes without knowing note names — you're building a deeper foundation." },
        { text: "Move to the A string: 5th fret (D), 7th fret (E). Then the D string: 5th fret (G), 7th fret (A — one octave higher than where you started). Continue through the G string (5th and 7th frets), B string (5th and 8th frets), and high E string (5th and 8th frets).", why: "The pentatonic shape spans all 6 strings in one position. Learning it string by string makes the shape manageable instead of overwhelming." },
        { text: "Play the full shape ascending: low A up to the high A. Then descending: high A back down to low A. One note per metronome click at 60 BPM. No rushing.", why: "Playing with a metronome from day one builds rhythmic discipline. Speed comes from accuracy, not ambition." },
        { text: "Play ascending and descending 4 times in a row without stopping or making a wrong note. If you stumble, restart the count.", why: "4 clean passes proves the shape is in your muscle memory, not just your short-term recall." },
        { text: "Close your eyes and play it once. If you can do this, the shape is truly internalized — your fingers know the way without visual help.", why: "Eyes-closed playing proves that your hands have mapped the shape independently. This is how scales become second nature." }
      ],
      feel: "The pentatonic should feel like a home base — a safe zone where every note sounds good. There are no 'wrong' notes in this scale. It should feel like a musical playground where everything works.",
      wrong: "If your fingers keep landing on the wrong frets, slow down and go note by note. If you can't play it without looking, spend more time on each string individually. If it sounds 'off,' check your tuning — open strings should be E-A-D-G-B-E from low to high.",
      sarah: "This scale is your musical mother tongue. Every guitarist you love — from Khruangbin to Allah-Las to DOPE LEMON — uses this shape constantly. Learn it once, use it forever.",
      metronome: 60
    },
    {
      id: "gs-1-2",
      time: 10,
      title: "Open Chords — Am, C, G, D, Em",
      type: "guitar",
      what: "Learn five open chord shapes that form the backbone of thousands of songs. Each chord is a group of notes played simultaneously. You'll learn the finger positions, which strings to strum, and how to switch between them cleanly.",
      steps: [
        { text: "Am: place your index finger on the B string 1st fret (C), middle finger on the D string 2nd fret (E), ring finger on the G string 2nd fret (A). Strum from the A string down — skip the low E. The notes ringing are A-E-A-C-E. This is a minor chord — it sounds sad, introspective, moody.", why: "Am is the home chord of your pentatonic scale. Every note in Am (A, C, E) is also in your Am pentatonic. They're family." },
        { text: "C major: index on B string 1st fret (C), middle on D string 2nd fret (E), ring on A string 3rd fret (C). Strum from the A string down. Notes: C-E-G-C-E. This is a major chord — it sounds bright, open, resolved.", why: "C major is Am's relative major — they share the same notes but have different emotional centers. Moving between Am and C is one of the most natural chord changes in music." },
        { text: "G major: middle finger on A string 2nd fret (B), index on low E string 3rd fret (G — or use ring finger), pinky on high E string 3rd fret (G). Strum all 6 strings. Notes: G-B-D-G-B-G.", why: "G is the first chord where you strum all 6 strings. It should sound full and powerful — the 'big open sky' chord." },
        { text: "D major: index on G string 2nd fret (A), ring on B string 3rd fret (D), middle on high E string 2nd fret (F#). Strum from the D string down — skip the low E and A strings. Notes: D-A-D-F#.", why: "D major is smaller — only 4 strings — but bright and cutting. The F# gives it a sunny, major quality." },
        { text: "Em: middle finger on A string 2nd fret (B), ring finger on D string 2nd fret (E). Strum all 6 strings. Notes: E-B-E-G-B-E. This is the easiest chord on guitar — two fingers, all strings.", why: "Em is your 'break glass in case of emergency' chord. When a chord change is coming and your fingers aren't ready, Em buys you time because it's so easy to grab." },
        { text: "Practice switching between pairs: Am to C (4 times), C to G (4 times), G to D (4 times), D to Em (4 times), Em to Am (4 times). Strum each chord 4 times before switching. No pauses between chords.", why: "Chord changes are where beginners struggle most. Practicing in pairs isolates each transition so you can identify which switches need the most work." }
      ],
      feel: "Each chord should ring clearly — every note sustaining without buzzing or muting. The switch between chords should eventually feel like shifting gears in a car: smooth, automatic, and without looking.",
      wrong: "If strings buzz, your fingers aren't pressing hard enough or they're touching adjacent strings. If a note is dead, check that your fingertip — not the pad — is pressing the string. If chord changes are slow, that's normal. Speed comes from repetition over days, not minutes.",
      sarah: "Five chords is enough to play hundreds of songs. Seriously — Am, C, G, D, and Em cover most of the music you love. The goal right now isn't speed. It's clean sound from each chord.",
      metronome: 60
    },
    {
      id: "gs-1-3",
      time: 8,
      title: "Strumming Basics",
      type: "guitar",
      volumeMeter: true,
      what: "Learn two strumming patterns: quarter-note downstrokes (4 strums per bar) and eighth-note down-up (8 strums per bar). Strumming is what turns chords into music — rhythm is more important than which chords you play.",
      setup: "Metronome at 70 BPM. Hold any chord you're comfortable with (Am is a good start).",
      steps: [
        { text: "Quarter-note downstrokes: hold Am and strum DOWN on each metronome click. 1-2-3-4, all downstrokes, all even. Your wrist does the work — not your elbow, not your forearm. 1 minute straight.", why: "Downstrokes on the beat are the simplest possible rhythm. Getting this even and relaxed is more important than it sounds — it's the foundation for every strumming pattern." },
        { text: "Now add upstrokes between the clicks. Count '1-and-2-and-3-and-4-and.' Down on the numbers, up on the 'ands.' This is eighth-note strumming — 8 strums per bar instead of 4.", why: "Down-up strumming doubles your rhythmic density. The upstrokes should be lighter than the downstrokes — they're the 'echo' of the downbeat." },
        { text: "Practice down-up strumming for 2 minutes. The most common mistake is making upstrokes as loud as downstrokes. Upstrokes should be softer and hit fewer strings — often just the top 3-4 strings.", why: "Natural strumming has dynamic variation. Downstrokes hit all the strings with authority. Upstrokes brush the thinner strings lightly. This creates a natural groove." },
        { text: "Switch chords every 4 beats while maintaining the down-up pattern. Am (4 beats) → C (4 beats) → G (4 beats) → D (4 beats). The strumming hand never stops, even during chord changes.", why: "Your strumming hand is the engine — it runs constantly. Your fretting hand changes chords, but the strum keeps going. If you stop strumming to change chords, the rhythm dies." }
      ],
      feel: "Good strumming feels like breathing — relaxed, automatic, and continuous. Your wrist should be loose, your grip on the pick light, and the motion small. If your arm gets tired, you're using too much muscle.",
      wrong: "If every strum sounds the same volume, add dynamic contrast: louder downs, softer ups. If the rhythm sounds choppy or uneven, slow the metronome down to 50 BPM. If you stop strumming to change chords, practice the strum pattern on muted strings until it's automatic.",
      sarah: "Rhythm is the secret weapon of great guitarists. You can play the wrong chord with perfect rhythm and it sounds good. You can play the right chord with bad rhythm and it sounds terrible. Rhythm first, always.",
      metronome: 70
    },
    {
      id: "gs-1-4",
      time: 6,
      title: "Rhythm Before Notes",
      type: "guitar",
      what: "Mute all strings with your fretting hand and improvise RHYTHMS ONLY — no pitch, just percussion. Vary your strum patterns, add accents, leave gaps. This proves rhythm alone can be musical.",
      setup: "Metronome at 70 BPM. Fretting hand lightly mutes all strings.",
      steps: [
        { text: "Lay your fretting hand flat across all strings — no pressure, just muting. Strum down. You hear a percussive 'tchk' with no pitch. This is a ghost strum — pure rhythm.", why: "Removing pitch from the equation reveals rhythm as its own musical dimension." },
        { text: "Strum quarter notes (4 per bar) for 4 bars. Boring, right? Now accent beats 2 and 4 (strum harder on those beats). The same pattern suddenly has a groove.", why: "Accenting 2 and 4 creates a backbeat — the rhythmic foundation of rock, reggae, funk, and blues." },
        { text: "Improvise rhythms for 1 minute. Vary everything: long strums, short stabs, silence, accents, fast scratches, slow hits. No pitch — only rhythm.", why: "Rhythmic improvisation is improvisation. If you can make one minute of muted strumming interesting, you understand that rhythm IS the music." },
        { text: "Record yourself. Listen back. Where did the rhythm groove? Where did it stumble? The moments that grooved are your natural rhythmic voice.", why: "Your natural rhythmic instincts are already there. This exercise reveals them before scales add complexity." }
      ],
      feel: "Pure rhythm should feel liberating — you can't play a wrong note because there are no notes. Focus entirely on the feel.",
      wrong: "If every strum sounds the same, you're not varying dynamics or speed. If it sounds random, establish a repeating pattern first, then vary it.",
      sarah: "Gene, your reggae offbeat is waiting for you in Level 4. This exercise is the first seed — proving that rhythm alone is enough to make music.",
      metronome: 70,
      recorder: true,
      rhythmCells: [
        { name: "Backbeat", pattern: [1, 1, 1, 1], description: "Accent beats 2 & 4" },
        { name: "3-3-2", pattern: [0.75, 0.75, 0.5], description: "Afro-Cuban syncopation" }
      ]
    },
    {
      id: "gs-1-5",
      time: 5,
      title: "One-Note Groove",
      type: "guitar",
      what: "Play ONLY the open A string (5th string). No chords, no scale, just one note. All expression comes from WHEN you play it: on the beat, off the beat, short, long, silent. If one note can groove, rhythm is the real instrument.",
      steps: [
        { text: "Play the open A string as quarter notes for 8 bars. Steady, even, boring. This is your baseline.", why: "The baseline proves that one note with no rhythm is just a metronome. Everything you do next is rhythmic improvisation." },
        { text: "Now play A only on beats 2 and 4. Leave beats 1 and 3 silent. Feel the backbeat — this is where reggae lives.", why: "Removing beats 1 and 3 flips the emphasis. Silence on the strong beats creates groove." },
        { text: "Try the 3-3-2 pattern: play A on the 1, the 'and' of 2, and beat 4. This creates a lopsided, swinging feel that appears in every genre you'll learn.", why: "The 3-3-2 grouping is the most universal rhythmic cell in popular music. Learning it on one note means you'll recognize it everywhere." },
        { text: "Freestyle: 2 minutes of one-note improv. Mix everything — backbeats, 3-3-2, long holds, short stabs, silence. Record yourself and listen back.", why: "One note with great rhythm sounds better than a scale played mechanically. This exercise proves that rhythm IS the music." }
      ],
      feel: "When the single note grooves, you'll feel the pocket — the note dances around the beat instead of sitting on it. That's the feeling you want in every solo and every chord change.",
      wrong: "If it sounds like a metronome, you're too even. Add silence, add syncopation, play behind the beat. If it sounds random, commit to a pattern for 4 bars before changing.",
      sarah: "Gene, this is the foundation of everything in Level 6. Victor Wooten says one note with great rhythm beats a thousand notes with bad rhythm. Your reggae offbeat, your surf tremolo, your desert patience — they all start here.",
      metronome: 70,
      recorder: true,
      rhythmCells: [
        { name: "Backbeat", pattern: [1, 1, 1, 1], description: "Accent beats 2 & 4" },
        { name: "3-3-2", pattern: [0.75, 0.75, 0.5], description: "Afro-Cuban syncopation" },
        { name: "Displaced", pattern: [0.5, 1.5], description: "Off-beat accent" }
      ]
    },
    {
      id: "gs-1-6",
      time: 8,
      title: "The Blue Note — Adding Eb",
      type: "guitar",
      referencePitches: ["A2", "C3", "D3", "E♭3", "E3", "G3", "A3"],
      fretboard: { scale: "am-blues", position: 1, highlight: ["E♭3"] },
      what: "Add one note — Eb (the 'blue note,' also called the flat-5 or b5) — to your Am pentatonic to create the Am blues scale: A-C-D-Eb-E-G. This single note transforms the scale from neutral to emotionally charged.",
      setup: "Clean tone, neck pickup. Metronome at 60 BPM.",
      steps: [
        { text: "Play your Am pentatonic ascending: A-C-D-E-G-A. Now add Eb between D and E. The blue note lives on the G string, 8th fret, or the A string, 6th fret. The full blues scale ascending is A-C-D-Eb-E-G-A.", why: "The Eb sits between the 4th (D) and the 5th (E) of the scale. It creates tension that wants to resolve — that pull between Eb and E IS the blues sound." },
        { text: "Play descending: A-G-E-Eb-D-C-A. Linger on Eb each time before resolving down to D or up to E. Hold it for an extra beat. Let it ache.", why: "Descending is where the blue note really sings — it pulls downward emotionally. The longer you hold it, the more tension you create." },
        { text: "Set metronome to 60 BPM. Play the blues scale ascending and descending, one note per click. 4 clean passes.", why: "Slow and clean builds muscle memory. The new note needs to feel as natural as the five you already know." },
        { text: "Improvise for 1 minute using ONLY Am pentatonic. Then 1 minute using the blues scale. Can you hear how the Eb changes the mood? The pentatonic sounds open; the blues scale sounds gritty, emotional, deeper.", why: "Training your ear to hear the blue note's effect is as important as training your fingers to find it. One note changes the emotional temperature of everything." }
      ],
      feel: "The Eb should feel like a tension note that wants to move. When you land on it and then slide to E, you should feel a tiny release — that's the blues sound. It's like holding your breath and then exhaling.",
      wrong: "If every note sounds the same, you're not lingering on Eb long enough. If your fingers stumble at the new note, slow down — your hand hasn't mapped it yet. If you can't hear the difference between pentatonic and blues scale, play them back to back 5 more times.",
      sarah: "The blue note isn't just a scale degree — it's an emotion. B.B. King built an entire career on knowing exactly when to land on it and when to leave. One note, infinite expression.",
      metronome: 60
    },
    {
      id: "gs-1-7",
      time: 10,
      title: "Bending & Expressive Techniques",
      type: "guitar",
      referencePitches: ["D3", "E♭3", "E3"],
      fretboard: { scale: "am-blues", position: 1, highlight: ["D3", "E♭3", "E3"] },
      what: "Learn three expressive techniques that make guitar sing like a voice: bending (pushing a string to raise its pitch), slides (gliding from one fret to another without lifting your finger), and pull-offs (sounding a note by pulling your finger off the string). These techniques turn scales into music.",
      setup: "Slight overdrive or clean with compression helps sustain. Tune up before starting — bends reveal bad tuning instantly.",
      steps: [
        { text: "SLIDES: On the G string, place your finger on the 5th fret (C). Pick the note and slide up to the 7th fret (D) without lifting your finger. The note should glide smoothly from C to D. A slide is exactly what it sounds like — your finger skates along the string. Try sliding down from 7th to 5th too.", why: "Slides connect notes in a way that sounds vocal and smooth. They're the easiest expressive technique and instantly make your playing sound more musical." },
        { text: "PULL-OFFS: Place two fingers on the B string — index on 5th fret, ring finger on 8th fret. Pick the 8th fret note, then pull your ring finger off the string with a slight downward flick. The 5th fret note should sound without picking it again. That's a pull-off — one pick, two notes.", why: "Pull-offs create a legato (smooth, connected) sound. They're the foundation of fluid guitar playing. The 'pull' is really a tiny flick — you're plucking the string with your fretting finger." },
        { text: "BENDING — half-step: On the G string, 7th fret (D), push the string upward (toward the ceiling) using your ring finger backed by your middle and index fingers. Push until the pitch rises by one fret — it should match the note at the 8th fret (Eb). That's a half-step bend. Listen carefully: does it match?", why: "Half-step bends are the most common in blues. They need to land exactly on pitch — flat bends sound amateur. Using three fingers shares the load and gives you control." },
        { text: "BENDING — full-step: Same position, push further until the pitch matches the 9th fret (E). This requires more strength and control. Bend up, hold for 2 beats, release slowly. Listen to the pitch on the way back down.", why: "Full-step bends require more strength. The controlled release — letting the bend come back down slowly — is harder than the bend itself. This is where the vocal, crying quality comes from." },
        { text: "Combine them: slide from 5th to 7th fret on the G string, bend up a half step, release, pull off to 5th fret. That's a complete blues phrase — slide, bend, release, pull-off. Four techniques, one musical sentence.", why: "Techniques in isolation are exercises. Techniques strung together are music. This little phrase is something you could play in a solo right now and it would sound great." }
      ],
      feel: "A good bend feels like singing — the note rises smoothly to pitch and sits there with intention. A good slide feels like a voice gliding between notes. A good pull-off feels effortless — the second note rings out naturally.",
      wrong: "If your bends land between pitches (sharp or flat), you're guessing instead of listening. Match them to the target fret. If your fingers hurt during bends, you're using one finger instead of three. If pull-offs are silent, you need to flick harder — the pulling motion IS the pick.",
      sarah: "Bending is the great equalizer. A single perfectly bent note has more emotional power than a hundred fast ones. These techniques are what separate someone playing scales from someone playing guitar.",
      metronome: 70
    },
    {
      id: "gs-1-8",
      time: 5,
      title: "Catch Your Phrase",
      type: "guitar",
      what: "Play a short phrase (3 notes from the pentatonic scale), then repeat it exactly 3 times. Then change ONE thing — one note, the rhythm, or the direction. This is the seed of motif development: repeat, then vary.",
      steps: [
        { text: "Play any 3 notes from Am pentatonic. Don't think — just play 3 notes. That's your phrase.", why: "Spontaneous creation is the goal. Overthinking kills motifs. The first 3 notes that come out are usually the most natural." },
        { text: "Repeat that exact phrase 3 more times. Same notes, same rhythm, same everything. Can you play it identically each time?", why: "Exact repetition is harder than it sounds. If you can't repeat it, the phrase is too complex. Simplify until you can repeat it perfectly." },
        { text: "Now change ONE thing: swap one note, or change the rhythm of one note, or reverse the direction. Play the variation 3 times.", why: "Single-element variation is the core of musical development. Change one thing and the phrase evolves. Change everything and it's a new phrase." },
        { text: "Record the whole sequence: original 3x → variation 3x. Listen back. Can you hear the connection between original and variation?", why: "The ear should recognize the family resemblance. If the variation sounds unrelated, you changed too much. If it sounds identical, you changed too little." }
      ],
      feel: "The variation should feel like the same sentence said with a different inflection — recognizable but fresh. That 'same but different' feeling is the heart of music.",
      wrong: "If you can't repeat your phrase exactly, it's too long or complex — try just 2 notes. If the variation sounds like a completely different phrase, you changed more than one element.",
      sarah: "Gene, this is called PReVaDe — Present, Repeat, Vary. You'll use this framework in every level. Mark Speer from Khruangbin does exactly this: catches a lick, repeats it, varies it. It's how all great improvisers build solos.",
      metronome: 70,
      recorder: true,
      referencePitches: getPitchRange("A3", "E4"),
      phraseForm: { pattern: "PRV", barsPerSection: 2, labels: { P: "Present", R: "Repeat", V: "Vary" } }
    },
    {
      id: "gs-1-9",
      time: 8,
      title: "Speed Ladder",
      type: "guitar",
      fretboard: { scale: "am-blues", position: 1 },
      what: "Run the Am pentatonic (or blues scale) through a tempo ladder: 60, 70, 80, 90 BPM. Only advance when the current tempo is perfectly clean. This builds speed from a foundation of accuracy — the only way that actually works.",
      steps: [
        { text: "Start at 60 BPM. Play the pentatonic ascending and descending, one note per click. No mistakes. If you fumble, stay at 60 until it's automatic.", why: "60 BPM is slow enough to be boring — and that's the point. Boring means your hands are relaxed. Relaxed hands are fast hands." },
        { text: "Move to 70 BPM. Same pattern. If you fumble, drop back to 60 for one pass before trying 70 again.", why: "Speed ladders only work if you respect the rule: clean before fast. Sloppy practice builds sloppy habits." },
        { text: "Continue to 80 BPM, then 90 BPM. At 90 BPM, you might try two notes per click (eighth notes), which doubles your actual playing speed.", why: "At higher tempos, tension creeps into your shoulders and hands. Consciously relax. Shake out your hands between tempo jumps." },
        { text: "End with one final pass at 60 BPM. It should feel absurdly easy now — like slow motion.", why: "Coming back to 60 after 90 resets your baseline and proves your progress to your own ears. That 'easy' feeling IS your improvement." }
      ],
      feel: "The right tempo feels effortless — your fingers arrive at each note with time to spare. If you feel rushed, you're above your clean tempo.",
      wrong: "If you're pushing through mistakes to hit higher tempos, you're building bad habits. The ladder only works when each rung is solid before you climb. Speed without accuracy is just noise.",
      sarah: "Speed is a byproduct of relaxation and accuracy. The fastest players in the world practiced slowly for years first. There is no shortcut, and that's actually good news — it means you're doing it right.",
      metronome: 60,
      speedLadder: { start: 60, end: 90, increment: 10, bars: 4 }
    },
    {
      id: "gs-1-10",
      time: 10,
      title: "Song: DOPE LEMON Style",
      type: "guitar",
      volumeMeter: true,
      volumeContour: true,
      what: "Play a laid-back chord progression in the style of DOPE LEMON: Am → C → G → D, with a slow, lazy down-up strum. DOPE LEMON's guitar is about feel, not complexity — relaxed, behind the beat, sun-on-your-face vibes.",
      tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Play Am → C → G → D, 4 beats each (1 bar per chord). Use the eighth-note down-up strum from exercise gs-1-3. Keep the dynamic soft — imagine you're playing on a porch at sunset, not on a stage.", why: "DOPE LEMON's Angus Stone plays like he has nowhere to be. The chords are simple. The magic is in the relaxed feel and the warmth of the strumming." },
        { text: "Play slightly behind the beat — let each strum arrive a tiny fraction AFTER the metronome click, not on it. This is called 'laid-back' feel. It's the secret to making simple chords sound cool.", why: "Playing behind the beat creates a relaxed, heavy groove. It's the opposite of rushing, and it's how DOPE LEMON, Khruangbin, and most of your favorite artists play." },
        { text: "Put on Groove Beat 90 and play the progression along with the backing track. 4 times through the whole progression (16 bars). Focus on keeping the strum soft and the feel lazy.", why: "Playing along with a backing track is different from playing alone. The track provides a rhythmic framework — your job is to lock into it and ride the groove." },
        { text: "Experiment with dynamics: play the Am and C bars quieter, then the G and D bars slightly louder. This creates a natural rise and fall — a breathing quality — even in a simple 4-chord loop.", why: "Dynamic variation turns a chord exercise into music. Even small volume changes make a huge difference in how musical something sounds." }
      ],
      feel: "This should feel like the easiest, most relaxing playing you've done. If you're tensing up, you're trying too hard. DOPE LEMON's whole aesthetic is 'I'm barely trying and it sounds amazing.' Channel that.",
      wrong: "If it sounds stiff or mechanical, you're playing too 'correctly' — loosen up, strum lazier, lean back. If you can't stay with the backing track, practice without it until the chord changes are automatic.",
      sarah: "DOPE LEMON proves that simple doesn't mean boring. Four chords, played with the right feel, can be the most beautiful sound in the world. This is your first song — remember how it feels.",
      metronome: 90
    },
    {
      id: "gs-1-11",
      time: 5,
      title: "Feel the Chord Change",
      type: "guitar",
      what: "Over Am→C→G→D (2 bars each), play the ROOT note as a single picked note on beat 1 of each chord change, then strum the chord on the remaining beats. Your ear learns to hear the root as the anchor of each chord.",
      steps: [
        { text: "Strum Am for 2 bars. On beat 1 of bar 1, pick ONLY the A note (open 5th string) before strumming. Hear how the root grounds the chord.", why: "The root is the anchor. Picking it separately before strumming trains your ear to hear the foundation of each chord." },
        { text: "Move to C. Beat 1: pick the C note (3rd fret, 5th string). Then strum C. Then G: pick G (3rd fret, 6th string). Then D: pick D (open 4th string). Root → strum on every change.", why: "Each root has a different character. A is dark and stable. C is bright. G is open. D is forward-leaning. Hearing them separately reveals their personalities." },
        { text: "Play through Am→C→G→D four times with root picks on every beat 1. The roots should feel like stepping stones across a river — each one solid and intentional.", why: "Root targeting on beat 1 is the simplest form of chord-tone improvisation. It connects melody to harmony with zero theory required." },
        { text: "Try humming the root note before you play it. Hear it in your head, hum it, then pick it. If you can predict the root, your ear is learning the progression.", why: "Internal hearing (audiation) is the ultimate goal. When you can hear the next root before it arrives, you're truly hearing harmony." }
      ],
      feel: "The root pick on beat 1 should feel like arriving home on each chord change — solid, grounded, inevitable. The strum fills in the color around the anchor.",
      wrong: "If the root doesn't 'click' with the chord, double-check the note. If all four roots sound the same to you, play them back to back without strumming — hear the differences.",
      sarah: "Gene, this is the seed of chord-tone targeting — the single most important improvisation concept you'll learn in Level 6. For now, just learn to hear the root. Later you'll target 3rds, 5ths, and 7ths.",
      metronome: 70,
      referencePitches: ["A3", "C3", "G2", "D3"]
    },
    {
      id: "gs-1-12",
      time: 10,
      title: "First Improv — Call and Response",
      type: "guitar",
      recorder: true,
      fretboard: { scale: "am-blues", position: 1 },
      what: "Improvise over a backing track using the Am pentatonic and blues scale. Use call-and-response phrasing: play a short phrase (the 'call'), leave space, then answer it with a different phrase (the 'response'). Call-and-response means playing a musical question and then a musical answer — it's the foundation of all blues and most improvisation.",
      tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
      steps: [
        { text: "Put on Groove Beat 90. Listen for 8 beats before playing anything. Find the groove first — tap your foot, nod your head. You're joining the music, not starting it.", why: "Starting by listening tells your brain 'we're joining music' instead of 'we're performing at music.' This single habit makes your playing more musical from the first note." },
        { text: "Play a 'call' — a short 3-4 note phrase from the Am pentatonic. Something simple. Then STOP. Leave 4-8 beats of silence. Let the backing track fill the space.", why: "The call sets up a question. The silence creates expectation — the listener leans forward, waiting to hear what comes next." },
        { text: "Play a 'response' — a related but different phrase. Maybe the same rhythm with different notes, or the same notes with a different rhythm. Then STOP again. More silence.", why: "The response resolves the tension. It should feel like the second half of a sentence. Together, call + response = one complete musical thought." },
        { text: "Continue for the full 10 minutes. Aim for as much silence as playing. If you run out of ideas, play one bent note and rebuild from there. Record yourself — listening back is where the real learning happens.", why: "Your first improv will feel awkward and that's perfect. The recording proves you did it. Listen back and notice: where did a phrase really land? Where did you rush? These observations guide your growth." }
      ],
      feel: "When a phrase sits right in the groove, you'll feel it lock in with the beat — like it was always supposed to be there. The silence between phrases should feel charged, not empty. Lean into the silence.",
      wrong: "If you're playing nonstop with no gaps, you're afraid of silence. Silence is your friend — it makes the notes you DO play matter more. If nothing sounds good to you, simplify: use fewer notes, slower rhythms, more space.",
      sarah: "You just improvised. That might not feel like a big deal, but it is. Most people spend years playing other people's music before they try making their own sounds. You're doing it in Level 1. Trust the process.",
      metronome: 90,
      phraseForm: { pattern: "CR", barsPerSection: 4, labels: { C: "Call", R: "Response" } }
    },
    {
      id: "gs-1-13",
      time: 5,
      title: "Self-Check: Can You Sing It?",
      type: "guitar",
      referencePitches: getPitchRange("A3", "G4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      recorder: true,
      what: "Improvise a short phrase on guitar, then immediately try to sing or hum it back. If you can sing what you played, you've truly internalized the scale. If you can't, your fingers are ahead of your ears — and that's useful information.",
      steps: [
        { text: "Play a 3-5 note phrase using the pentatonic or blues scale. Something simple and melodic — not fast or flashy.", why: "Short phrases are easier to remember and sing back. Don't try to be impressive — try to be memorable." },
        { text: "Put the guitar down. Sing or hum the phrase you just played. Match the pitches and rhythm as closely as you can.", why: "Singing connects your inner ear to the music. If you can sing it, you truly hear it — not just execute it." },
        { text: "Now try it in reverse: sing a short melody first, then find it on the guitar. Hum 3-4 notes, then locate them on the fretboard.", why: "Singing first, then playing, proves your ears are leading your hands — not the other way around. This is the most important skill in music." },
        { text: "Do 5 rounds of each direction. Note which is harder for you — that's where you need to focus going forward.", why: "Most guitarists can play things they can't sing. Closing that gap is the key to musical expression." }
      ],
      feel: "When you can sing what you play and play what you sing, there's a connection between your imagination and your hands. Music stops being physical and becomes mental.",
      wrong: "If you can play fast licks but can't sing any of them back, you're playing patterns, not music. Slow down and simplify until your voice can follow your fingers.",
      sarah: "Every great improviser can sing their solos. If it's not in your voice, it's not really in your ears yet. This exercise is your honest mirror.",
      levelUp: "You can sing back at least 3 out of 5 phrases you play, and you can find on the guitar at least 3 out of 5 melodies you sing."
    }
  ]
};
