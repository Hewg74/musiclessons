export const GUITAR_STUDY = [
  // ─── LEVEL 1: Blues Scale & Bends ─────────────────────────────────
  {
    level: 1,
    title: "Blues Scale & Bends",
    subtitle: "Foundation for everything. One note transforms your pentatonic.",
    description:
      "The blues scale adds one note — the b5 (Eb in Am) — to your pentatonic. Combined with bends, this gives you the vocal, expressive quality that makes blues guitar sing. This level builds the foundation everything else grows from.",
    artists: "B.B. King, classic surf leads",
    unlocks: "Surf Reverb & Tremolo (Level 2)",
    exercises: [
      {
        id: "gs-1-1",
        time: 8,
        title: "The Blue Note — Finding Eb",
        type: "guitar",
        referencePitches: ["A2", "C3", "D3", "E♭3", "E3", "G3", "A3"],
        fretboard: { scale: "am-blues", position: 1, highlight: ["E♭3"] },
        what: "Learn the Am blues scale shape by adding one note — Eb (the b5) — to the Am pentatonic you already know. Play ascending and descending at 60 BPM until the shape is automatic.",
        setup: "Clean tone, neck pickup. Metronome at 60 BPM.",
        steps: [
          { text: "Play the Am pentatonic: A-C-D-E-G-A on the 5th fret position. Refresh the shape.", why: "You need the pentatonic locked in before adding the blue note." },
          { text: "Now add Eb (8th fret on the G string, or 6th fret on the A string). Play A-C-D-Eb-E-G-A ascending.", why: "The b5 sits between the 4th and 5th — it creates tension that wants to resolve." },
          { text: "Play descending: A-G-E-Eb-D-C-A. Linger on Eb each time before resolving to D or E.", why: "Descending is where the blue note really sings — it pulls downward emotionally." },
          { text: "Set metronome to 60 BPM. One note per click, ascending and descending. No rushing.", why: "Slow and clean builds muscle memory. Speed comes from accuracy, not ambition." }
        ],
        feel: "The Eb should feel like a tension note that wants to move. When you land on it and then slide to E, you should feel a tiny release — that's the blues sound.",
        wrong: "If every note sounds the same, you're not lingering on Eb long enough. If your fingers stumble at the new note, slow down — your hand hasn't mapped it yet.",
        sarah: "The blue note isn't just a scale degree — it's an emotion. B.B. King built an entire career on knowing exactly when to land on it and when to leave.",
        metronome: 60,
        levelUp: "You can play the blues scale ascending and descending at 60 BPM without hesitation or wrong notes, 4 times in a row."
      },
      {
        id: "gs-1-2",
        time: 8,
        title: "Five Positions",
        type: "guitar",
        referencePitches: ["A2", "C3", "D3", "E♭3", "E3", "G3", "A3"],
        fretboard: { scale: "am-blues", position: 1 },
        what: "Learn the Am blues scale in all 5 pentatonic box positions across the fretboard. This unlocks the entire neck instead of trapping you in one spot.",
        setup: "Clean tone, metronome at 60 BPM.",
        steps: [
          { text: "Start with Position 1 (5th fret). Play the blues scale shape you learned. Solid? Move on.", why: "Position 1 is your home base — it should already feel comfortable from exercise 1." },
          { text: "Move to Position 2 (8th fret area). Find the new shape — the blue note lands in a different spot relative to your hand.", why: "Each position has a unique fingering for the b5. Your ear knows the note; your hand needs to find it." },
          { text: "Work through Positions 3, 4, and 5. Spend 90 seconds on each. Ascending and descending.", why: "Covering all 5 positions means you can play in any register — high, low, or middle." },
          { text: "Connect two adjacent positions by sliding between them on one string. Position 1 into 2, then 2 into 3.", why: "Positions aren't boxes — they're windows. Sliding between them is how real solos move." }
        ],
        feel: "Each position should produce the same notes but feel different under your fingers. The high positions feel tighter; the low positions feel more open.",
        wrong: "If you're only comfortable in Position 1, you'll sound trapped when you solo. If you can't find the blue note in each position, slow down and map it deliberately.",
        sarah: "Most guitarists live in one box their whole lives. Learning all five is what separates someone who plays scales from someone who plays the guitar.",
        metronome: 60,
        levelUp: "You can play the blues scale in all 5 positions without stopping to think about where the notes are."
      },
      {
        id: "gs-1-3",
        time: 10,
        title: "Bending Into It",
        type: "guitar",
        referencePitches: ["D3", "E♭3", "E3"],
        fretboard: { scale: "am-blues", position: 1, highlight: ["D3", "E♭3", "E3"] },
        what: "Master half-step bends (D to Eb) and full-step bends (D to E). Bending is how blues guitar imitates the human voice — it's the most expressive technique you'll learn.",
        setup: "Slight overdrive or clean with compression helps sustain. Tune up before starting — bends reveal bad tuning instantly.",
        steps: [
          { text: "On the B string, 8th fret (G note area in Am context), practice a half-step bend. Push the string up until the pitch rises by one fret. Match it to the note one fret higher.", why: "Half-step bends are the most common in blues. They need to land exactly on pitch — flat bends sound amateur." },
          { text: "Now try a full-step bend from the same spot. Push until you match the note two frets higher. Use your ring finger backed by middle and index.", why: "Full-step bends require more strength and control. Three fingers share the load." },
          { text: "Alternate: bend up to pitch, hold for 2 beats, release slowly. Listen to the pitch on the way back down.", why: "Controlled release is harder than the bend itself. This is where the vocal, crying quality comes from." },
          { text: "Try bend-and-release phrases: bend up, hold, release, pull-off. String 3-4 of these together into a short phrase.", why: "Bends in isolation are exercises. Bends in phrases are music." }
        ],
        feel: "A good bend feels like singing — the note rises smoothly to pitch and sits there with intention. You should feel the string resist and then give in.",
        wrong: "If your bends land between pitches (sharp or flat), you're guessing instead of listening. If your fingers hurt, you're using one finger instead of three. If the bend sounds thin, you're bending on the wound strings without enough support.",
        sarah: "Bending is the great equalizer. A single perfectly bent note has more emotional power than a hundred fast ones. Listen to B.B. King's vibrato after a bend — that's the goal."
      },
      {
        id: "gs-1-4",
        time: 8,
        title: "Speed Ladder",
        type: "guitar",
        fretboard: { scale: "am-blues", position: 1 },
        what: "Run the blues scale through a tempo ladder: 60, 70, 80, 90 BPM. Only advance when the current tempo is perfectly clean. This builds speed from a foundation of accuracy.",
        steps: [
          { text: "Start at 60 BPM. Play the blues scale ascending and descending, one note per click. No mistakes.", why: "60 BPM is slow enough to be boring — and that's the point. Boring means your hands are relaxed." },
          { text: "Move to 70 BPM. Same pattern. If you fumble, drop back to 60 for one pass before trying 70 again.", why: "Speed ladders only work if you respect the rule: clean before fast. Sloppy practice builds sloppy habits." },
          { text: "Continue to 80 BPM, then 90 BPM. At 90 BPM, you might try two notes per click (eighth notes at 90).", why: "At higher tempos, tension creeps into your shoulders and hands. Consciously relax." },
          { text: "End with one final pass at 60 BPM. It should feel absurdly easy now.", why: "Coming back to 60 after 90 resets your baseline and proves your progress to your own ears." }
        ],
        feel: "The right tempo feels effortless — your fingers arrive at each note with time to spare. If you feel rushed, you're above your clean tempo.",
        wrong: "If you're pushing through mistakes to hit higher tempos, you're building bad habits. The ladder only works when each rung is solid before you climb.",
        sarah: "Speed is a byproduct of relaxation and accuracy. The fastest players in the world practiced slowly for years first.",
        metronome: 60,
        levelUp: "You can play the blues scale cleanly at 90 BPM with one note per beat, no stumbles."
      },
      {
        id: "gs-1-5",
        time: 10,
        title: "Pentatonic + Blues Toggle",
        type: "guitar",
        recorder: true,
        referencePitches: ["A2", "C3", "D3", "E♭3", "E3", "G3", "A3"],
        fretboard: { scale: "am-blues", position: 1, highlight: ["E♭3"] },
        what: "Improvise 4 bars of Am pentatonic, then 4 bars of Am blues scale, back and forth. Train your ears to hear the difference one note makes.",
        steps: [
          { text: "Set a metronome to 80 BPM. Improvise freely using ONLY the Am pentatonic for 4 bars (16 beats). No blue note allowed.", why: "Constraining yourself to pentatonic first makes the blue note's arrival more dramatic." },
          { text: "After 4 bars, switch to the blues scale. Now the Eb is your secret weapon — use it deliberately.", why: "The toggle trains you to hear the b5 as a color choice, not an accident." },
          { text: "Continue alternating. On each blues section, try using Eb differently: as a passing tone, as a bent note, as a landing note.", why: "The blue note has many moods depending on how you approach and leave it." },
          { text: "Record yourself for 3 minutes. Listen back. Can you hear the switch? Does the blues scale section feel darker, grittier?", why: "Recording and listening back develops your critical ear faster than anything else." }
        ],
        feel: "The pentatonic bars should sound bright and open. The moment you add the blue note, the mood shifts — it's darker, tenser, more emotional. You should feel the toggle like changing gears.",
        wrong: "If both sections sound the same, you're not using the blue note enough in the blues bars, or you're accidentally including it in the pentatonic bars.",
        sarah: "This exercise proves that music isn't about how many notes you know — it's about which notes you choose. One note changes everything.",
        metronome: 80
      },
      {
        id: "gs-1-6",
        time: 10,
        title: "Blues Licks over Surf Rock",
        type: "guitar",
        fretboard: { scale: "am-blues", position: 1 },
        what: "Build short 2-4 note blues phrases — bends, slides, and the blue note — and play them over a surf rock backing track. This is where exercises become music.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start with a simple lick: bend the 7th fret (B string) up a half step, release, pull off to 5th fret. That's a classic blues phrase.", why: "Short licks are the vocabulary of blues guitar. You build solos from these building blocks." },
          { text: "Learn 3 more licks: a slide from the b5 to the 5th, a double-stop bend on strings 2-3, and a repeating triplet on one note with vibrato.", why: "Having 4 licks gives you enough vocabulary for a full solo, believe it or not." },
          { text: "Play along with Surf Rock Beat 120. Drop your licks in with space between them. Don't fill every beat.", why: "Space between licks is what makes them land. Wall-to-wall playing sounds nervous." },
          { text: "Try connecting two licks into a longer phrase. Slide from the end of one into the start of another.", why: "Connected licks are how you build musical sentences from individual words." }
        ],
        feel: "When a lick sits right in the groove, you'll feel it lock in with the beat — like the phrase was always supposed to be there. That's the pocket.",
        wrong: "If you're playing licks as fast as possible with no gaps, it sounds like you're showing off instead of making music. If the licks don't match the beat, you're not listening to the track.",
        sarah: "B.B. King could play three notes and make a whole room feel something. That's the level we're aiming for — not more notes, but more meaning per note."
      },
      {
        id: "gs-1-7",
        time: 10,
        title: "Call and Response",
        type: "guitar",
        fretboard: { scale: "am-blues", position: 1 },
        what: "Play a 3-note phrase (the call), leave 2-4 beats of silence, then answer it with a related but different phrase (the response). This is the foundation of blues phrasing — musical conversation.",
        steps: [
          { text: "Play a simple 3-note call: for example, bend on the 7th fret, slide down to 5th, land on the root. Then STOP.", why: "The call sets up a question. Stopping creates expectation — the listener leans forward." },
          { text: "After 2-4 beats of silence, play a response that answers the call. Maybe the same rhythm but different notes, or same notes but different rhythm.", why: "The response resolves the tension. It should feel like the second half of a sentence." },
          { text: "Practice 5 different call-and-response pairs. Vary the length and intensity of both halves.", why: "Building a library of conversations gives you the raw material for expressive solos." },
          { text: "Try making each response slightly more intense than the call — higher register, louder, or adding a bend. Build a story across 4 pairs.", why: "Great solos have narrative arc. Each phrase builds on the last." }
        ],
        feel: "The silence between call and response should feel charged — like the space between a question and an answer. If the silence feels awkward, you're on the right track. Lean into it.",
        wrong: "If you rush to fill the silence, you're not trusting the music. If your responses have nothing to do with your calls, the conversation doesn't make sense.",
        sarah: "Blues is a conversation. The greatest blues soloists are great listeners — they hear the question before they play the answer."
      },
      {
        id: "gs-1-8",
        time: 10,
        title: "Blues Improv — Groove Beat",
        type: "guitar",
        fretboard: { scale: "am-blues", position: 1 },
        what: "Full improvisation over a groove backing track. Everything you've learned — blues scale, bends, space, call and response — combined into real playing. Focus on playing behind the beat for a relaxed, heavy feel.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Put on Groove Beat 90. Listen for 8 beats before you play a single note. Find the groove first.", why: "Starting by listening tells your brain 'we're joining music' instead of 'we're performing at music.'" },
          { text: "Begin with a single bent note. Hold it. Let it ring. Then respond to it with another phrase. Build slowly.", why: "Starting sparse gives you room to build intensity. Starting loud gives you nowhere to go." },
          { text: "Deliberately play behind the beat — place your notes slightly AFTER where the click lands. This creates a heavy, laid-back feel.", why: "Playing behind the beat is the secret to sounding like a blues master instead of a robot." },
          { text: "Play for the full 10 minutes. If you run out of ideas, return to one bent note and rebuild from there.", why: "Running out of ideas is part of improvisation. The ability to reset and restart is a skill." }
        ],
        feel: "When you're behind the beat and in the groove, it feels like floating — relaxed but intentional. The backing track does the work; you just color it.",
        wrong: "If you're rushing or playing on top of the beat, the feel will be anxious instead of groovy. If you're playing nonstop without breathing, step back and leave more space.",
        sarah: "Improvisation isn't about playing everything you know. It's about choosing the one thing that fits right now. Less is always more in blues."
      },
      {
        id: "gs-1-9",
        time: 5,
        title: "Self-Check: Can You Sing It?",
        type: "guitar",
        fretboard: { scale: "am-blues", position: 1 },
        recorder: true,
        what: "Improvise a short phrase on guitar, then immediately try to sing or hum it back. If you can sing what you played, you've truly internalized the blues scale. If you can't, your fingers are ahead of your ears.",
        steps: [
          { text: "Play a 3-5 note phrase using the blues scale. Something simple and melodic.", why: "Short phrases are easier to remember and sing back. Don't try to be impressive — try to be memorable." },
          { text: "Put the guitar down. Sing or hum the phrase you just played. Match the pitches and rhythm.", why: "Singing connects your inner ear to the music. If you can sing it, you truly hear it — not just execute it." },
          { text: "Now try it in reverse: sing a phrase first, then find it on the guitar.", why: "Singing first, then playing, proves your ears are leading your hands — not the other way around." },
          { text: "Do 5 rounds of each direction. Note which is harder for you — that's where to focus.", why: "Most guitarists can play things they can't sing. Closing that gap is the key to musical expression." }
        ],
        feel: "When you can sing what you play and play what you sing, there's a connection between your imagination and your hands. Music stops being physical and becomes mental.",
        wrong: "If you can play fast licks but can't sing any of them back, you're playing patterns, not music. Slow down and simplify until your voice can follow your fingers.",
        sarah: "Every great improviser can sing their solos. If it's not in your voice, it's not really in your ears yet."
      },
      {
        id: "gs-1-10",
        time: 15,
        title: "Extended Blues Jam",
        type: "guitar",
        recorder: true,
        fretboard: { scale: "am-blues", position: 1 },
        what: "15-minute full improvisation session. Use everything from Level 1: all five positions, bends, blue notes, call and response, space, and behind-the-beat feel. Record yourself and listen back.",
        setup: "Set up a way to record (phone is fine). Clean or slightly overdriven tone.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Hit record. Put on Surf Rock Beat 120. Start with 8 beats of silence — just listen.", why: "Recording changes how you play. It makes you more intentional, which is the whole point." },
          { text: "Begin in Position 1. Play sparse blues phrases with lots of space. Use bends and the blue note. Stay here for 3-4 minutes.", why: "Starting in your comfort zone lets you warm up musically, not just technically." },
          { text: "Gradually move to other positions. Slide between Position 1 and 2, then explore 3, 4, 5. Let the register changes create dynamics.", why: "Moving across the neck is how you create the arc of a solo — low and quiet to high and intense." },
          { text: "In the last 3 minutes, build to your most intense playing, then pull back to a single note. End quietly.", why: "Great solos have a peak and a resolution. Ending quietly after intensity is deeply satisfying." },
          { text: "Listen back to the recording. Note: where did you use space well? Where did you rush? Where did a phrase really land?", why: "Listening back is where 80% of the learning happens. You hear things you couldn't notice while playing." }
        ],
        feel: "This should feel like a complete musical journey — a beginning, middle, and end. When it's working, you stop thinking about scales and start thinking about stories.",
        wrong: "If you played nonstop for 15 minutes without a single pause, you need more space. If you stayed in one position the whole time, you need to explore the neck. If you can't remember any phrase you played, you weren't listening to yourself.",
        sarah: "This is the payoff for all the technical work. Every exercise in Level 1 exists so that THIS session can be musical. Record often — your future self will love hearing where you started.",
        levelUp: "You can improvise for 15 minutes with variety, dynamics, and space. You use multiple positions and your bends land on pitch consistently."
      }
    ]
  },

  // ─── LEVEL 2: Surf Reverb & Tremolo ───────────────────────────────
  {
    level: 2,
    title: "Surf Reverb & Tremolo",
    subtitle: "Bright, fast, and drenched in reverb. The sound of the ocean.",
    description:
      "Surf guitar is blues' sun-bleached cousin — Mixolydian melodies, tremolo picking, and double stops over driving rhythms. This level adds brightness and speed to your blues foundation, giving you the vocabulary of Dick Dale, The Ventures, and the Allah-Las.",
    artists: "Dick Dale, The Ventures, Allah-Las",
    unlocks: "Reggae Skank (Level 3)",
    exercises: [
      {
        id: "gs-2-1",
        time: 8,
        title: "Mixolydian — The Surf Scale",
        type: "guitar",
        what: "Learn the G Mixolydian scale (G-A-B-C-D-E-F). It's a major scale with a flatted 7th — the sound of every classic surf instrumental from 'Pipeline' to 'Misirlou.'",
        steps: [
          { text: "Play a G major scale: G-A-B-C-D-E-F#-G. Now lower the F# to F natural. That's G Mixolydian.", why: "Mixolydian is one note different from major. That b7 gives it a bright-but-not-quite-resolved quality — perfect for surf." },
          { text: "Play G Mixolydian in the 3rd fret position. Ascending and descending. Get the shape into your fingers.", why: "This position puts the root on the low E string, giving you a strong foundation for surf riffs." },
          { text: "Compare: play 4 notes of G major, then 4 notes of G Mixolydian. Hear how the b7 changes the mood?", why: "The b7 adds a cool, unresolved quality. Major sounds like a marching band; Mixolydian sounds like a wave." },
          { text: "Play the scale with a bright, clean tone and lots of reverb if available. This is the surf sound.", why: "Surf guitar is all about tone. The scale comes alive with the right sound." }
        ],
        feel: "Mixolydian should feel brighter and more confident than the blues scale — like stepping out of a smoky club into sunlight. The b7 gives it swagger without sadness.",
        wrong: "If it sounds like a regular major scale, you're probably playing F# instead of F. If it sounds bluesy, you've slipped back into pentatonic. Listen for the brightness.",
        sarah: "Mixolydian is the 'almost happy' scale. It's major enough to feel good but that flatted 7th keeps it interesting. It's why surf guitar never sounds cheesy — there's always an edge.",
        fretboard: { scale: "g-mixolydian", position: 1 }
      },
      {
        id: "gs-2-2",
        time: 8,
        title: "Mixolydian Positions",
        type: "guitar",
        what: "Learn G Mixolydian in three positions across the neck. Connect the shapes so you can move freely between low, middle, and high registers during a surf solo.",
        steps: [
          { text: "Position 1: 3rd fret. Play the full Mixolydian shape. Root on the low E string.", why: "This is your home position — the deep, driving register for surf riffs." },
          { text: "Position 2: 7th-8th fret area. Find the Mixolydian shape here. Root is now on the D string.", why: "The middle position is where melodic surf leads live — think 'Walk Don't Run.'" },
          { text: "Position 3: 10th-12th fret. The high register. Bright, cutting, perfect for tremolo melodies.", why: "High-register surf lines cut through a mix. This is your 'Pipeline' zone." },
          { text: "Practice sliding from Position 1 to 2, then 2 to 3. Use one string as a highway between positions.", why: "Connecting positions makes the whole neck available. Solos that move across the neck sound professional." }
        ],
        feel: "Each position has a different character — low is powerful, middle is melodic, high is piercing. Moving between them should feel like shifting gears.",
        wrong: "If you keep getting lost between positions, spend more time on each one individually before connecting them. The shapes need to be automatic before you link them.",
        sarah: "Three positions is enough for surf. You don't need all seven modes mapped out — you need three shapes you can access without thinking.",
        fretboard: { scale: "g-mixolydian", position: 1 },
        metronome: 60
      },
      {
        id: "gs-2-3",
        time: 10,
        title: "Tremolo Picking — Even Strokes",
        type: "guitar",
        recorder: true,
        what: "Develop rapid, even alternate picking on a single string. Tremolo picking is the engine of surf guitar — it turns a single note into a shimmering wave of sound.",
        setup: "Use a medium-thickness pick with a pointed tip. Clean tone with reverb. Relax your wrist.",
        steps: [
          { text: "Pick a single open string (the high E). Alternate down-up-down-up at 80 BPM, eighth notes. Every stroke should be the same volume.", why: "Even strokes are the foundation. Most players have a louder downstroke — you need to fix that." },
          { text: "Focus on your pick hand. The motion comes from the wrist, NOT the elbow or forearm. Small, controlled movements.", why: "Wrist picking is efficient and sustainable. Elbow picking causes fatigue and sounds uneven." },
          { text: "Move to fretted notes — play a single note on the 5th fret, B string. Same exercise. Alternate picking, even volume.", why: "Fretted notes require slightly more pick attack than open strings. Adjust your pressure." },
          { text: "Record 30 seconds and listen back. Are the up-strokes as loud as the down-strokes? Be honest.", why: "Recording reveals what your ears miss in the moment. Uneven tremolo sounds wobbly." }
        ],
        feel: "Good tremolo picking feels effortless — your wrist is loose, the pick barely touches the string, and the sound shimmers. It should feel like the pick is bouncing, not digging.",
        wrong: "If your arm gets tired after 30 seconds, you're using too much motion. If the picking sounds galloping (da-DUM-da-DUM), your down and up strokes aren't equal.",
        sarah: "Dick Dale picked so fast it sounded like a machine. But watch his right hand — it's completely relaxed. Tension is the enemy of tremolo.",
        metronome: 80,
        levelUp: "You can tremolo pick a single note for 30 seconds with perfectly even volume on both strokes."
      },
      {
        id: "gs-2-4",
        time: 10,
        title: "Tremolo Speed Builder",
        type: "guitar",
        what: "Build tremolo speed gradually: 80, 90, 100, 110 BPM with eighth notes, then 60, 70, 80 BPM with sixteenth notes. Evenness always trumps speed.",
        steps: [
          { text: "Eighth notes at 80 BPM (2 picks per beat). Lock in with the metronome. Both strokes equal. 1 minute.", why: "Starting below your max speed ensures you begin with good technique, not tension." },
          { text: "Move through 90, 100, 110 BPM. Spend 90 seconds at each. If evenness breaks down, drop back 10 BPM.", why: "The speed ladder rule applies: never sacrifice quality for tempo." },
          { text: "Switch to sixteenth notes at 60 BPM (4 picks per beat). This is the true tremolo sound. Keep it even.", why: "Sixteenth notes at 60 BPM = the same pick speed as eighth notes at 120. But the subdivision forces more control." },
          { text: "Build sixteenths through 70 and 80 BPM. At 80 BPM sixteenths, you're picking at surf speed.", why: "80 BPM sixteenths is equivalent to 160 BPM eighth notes. That's Dick Dale territory." }
        ],
        feel: "At the right speed, tremolo picking enters a flow state — your hand almost vibrates rather than picking individual notes. The sound sustains and shimmers.",
        wrong: "If your arm burns, you're using too much muscle. If the rhythm lurches, you're past your clean speed. Speed without evenness is just noise.",
        sarah: "Tremolo speed is built in minutes per day over weeks, not in one long session. Ten focused minutes today is worth more than an hour of sloppy grinding.",
        metronome: 80,
        levelUp: "Clean sixteenth-note tremolo at 80 BPM for 30 seconds without your arm tensing up."
      },
      {
        id: "gs-2-5",
        time: 10,
        title: "Surf Double Stops",
        type: "guitar",
        what: "Play two-note chord fragments (double stops) in 3rds and 6ths with a bright, clean tone. Double stops are the signature sound of The Ventures and countless surf instrumentals.",
        steps: [
          { text: "Play 3rds on strings 1 and 2: fret the B string at 5th fret, high E at 5th fret. Slide this shape up and down chromatically.", why: "Parallel 3rds moving chromatically is the classic surf walk-up. Simple but instantly recognizable." },
          { text: "Now try diatonic 3rds in G Mixolydian on strings 2 and 3. The shape changes between major and minor 3rds as you move through the scale.", why: "Diatonic double stops sound more musical than chromatic — they follow the scale instead of ignoring it." },
          { text: "Switch to 6ths: play strings 1 and 3 simultaneously (skip string 2). These have a sweeter, wider sound.", why: "6ths are inverted 3rds. They sound more open and are great for melodic hooks." },
          { text: "Create a simple surf riff using double stops: walk up in 3rds, hold the top, walk back down. Add reverb.", why: "Double stop riffs are complete musical statements — they don't need a rhythm guitar backing them up." }
        ],
        feel: "Double stops should ring clearly — both notes sustaining equally. They sound full and powerful compared to single notes, like a two-voice choir.",
        wrong: "If one string is muted or buzzing, your fretting hand needs adjustment. If the double stops sound muddy, check that you're not accidentally touching adjacent strings.",
        sarah: "The Ventures built a career on double stops. 'Walk Don't Run' is essentially a double-stop etude. Simple idea, perfect execution."
      },
      {
        id: "gs-2-6",
        time: 10,
        title: "Mixolydian over Blues Scale",
        type: "guitar",
        what: "Practice switching between blues feel (Am blues scale) and bright surf feel (G Mixolydian) every 4 bars. This builds your ability to change musical personality on demand.",
        steps: [
          { text: "Set a metronome to 90 BPM. Play 4 bars using Am blues scale — dark, bendy, behind the beat.", why: "The blues section is your comfort zone from Level 1. Use it to establish a mood." },
          { text: "After 4 bars, switch to G Mixolydian — bright, forward, no bends. Straight, clean lines.", why: "The switch should feel dramatic. You're going from smoky club to sunny beach." },
          { text: "Continue alternating. Make the switch cleaner each time — no fumbling between scale shapes.", why: "Clean switches between tonalities is a professional skill. It's how you keep a solo interesting." },
          { text: "Try blending: use a Mixolydian line but bend one note blues-style. See what happens.", why: "The best guitarists don't think in either/or. They blend scales into a personal vocabulary." }
        ],
        feel: "The toggle should feel like changing channels — each scale has a distinct emotional color. Blues is tension and release; Mixolydian is forward momentum and brightness.",
        wrong: "If both sections sound the same, you're not committing to the character of each scale. Blues should be slower and bendier; Mixolydian should be straighter and brighter.",
        sarah: "Knowing two scales isn't twice as useful as knowing one — it's ten times as useful, because you can contrast them.",
        fretboard: { scale: "g-mixolydian", position: 1, highlight: ["Eb3"] },
        metronome: 90
      },
      {
        id: "gs-2-7",
        time: 12,
        title: "Allah-Las Style Lines",
        type: "guitar",
        what: "Play jangly minor-key lines with a spring reverb feel, inspired by the Allah-Las' moody take on surf rock. Think 'Raspberry Jam' and 'Tell Me' — dark, reverby, hypnotic.",
        setup: "Lots of reverb. Clean tone. Slight tremolo effect if available.",
        steps: [
          { text: "Switch to Am natural minor (Aeolian): A-B-C-D-E-F-G. This is darker than Mixolydian — more brooding.", why: "The Allah-Las blend minor-key melodies with surf reverb. It's surf rock's darker, more introspective side." },
          { text: "Play arpeggiated minor chords on the top 3 strings. Let notes ring into each other. Am, Dm, Em shapes.", why: "Jangly arpeggios with reverb create the wash of sound that defines this style." },
          { text: "Create a short melodic loop — 4-8 notes that repeat hypnotically. Think of the riff from 'Tell Me.'", why: "Repetition with slight variation is the Allah-Las formula. The hypnosis comes from patience." },
          { text: "Add occasional chromatic passing notes between scale tones. Slide into a note from one fret below.", why: "Chromatic approach notes add a mysterious, slightly jazz-influenced flavor." },
          { text: "Let the reverb do work for you. Play a note and listen to its tail before playing the next one.", why: "In reverb-heavy styles, the space between notes is filled by the reverb. Playing too fast kills the atmosphere." }
        ],
        feel: "This should feel dreamy and slightly dark — like surf guitar played at midnight. The reverb should fill the space between your notes.",
        wrong: "If it sounds like standard surf guitar, you're playing too bright and too fast. If it sounds like blues, you're bending too much. This style is straight, dark, and patient.",
        sarah: "The Allah-Las proved that surf guitar doesn't have to be fast or happy. Sometimes the most powerful surf sound is a minor-key riff and a lot of reverb."
      },
      {
        id: "gs-2-8",
        time: 12,
        title: "Tremolo Melody over Surf Rock",
        type: "guitar",
        what: "Combine tremolo picking with Mixolydian melodies over a surf rock backing track. This is the classic surf lead sound — single-note melodies picked so fast they shimmer.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start with a simple 4-note Mixolydian melody in Position 3 (high register). Play it slowly, then apply tremolo picking to each note.", why: "Learning the melody first, then adding tremolo, keeps both skills separate and clean." },
          { text: "Put on Surf Rock Beat 120. Tremolo pick your melody along with the beat. Each note gets 1-2 beats of tremolo.", why: "Over a real backing track, tremolo melodies come alive. The melody rides on top of the rhythm." },
          { text: "Add movement: walk the melody up through the scale, tremolo picking each note, then walk back down.", why: "Ascending lines build energy; descending lines release it. This is the structure of surf solos." },
          { text: "Try mixing tremolo sections with regular picked sections. Tremolo for 2 bars, regular picking for 2 bars.", why: "Contrast makes tremolo more effective. If everything is tremolo, nothing is tremolo." }
        ],
        feel: "When the tremolo melody locks in with the surf beat, it should feel like riding a wave — momentum, shimmer, and a sense of forward motion.",
        wrong: "If the melody gets lost in the tremolo, you're sacrificing pitch accuracy for speed. Slow the melody down and make sure each note is clear before adding speed.",
        sarah: "Tremolo melody is the highest expression of surf guitar. It's not about speed — it's about making a melody shimmer. Dick Dale's 'Misirlou' works because the melody is great, not because the picking is fast.",
        fretboard: { scale: "g-mixolydian", position: 1 }
      },
      {
        id: "gs-2-9",
        time: 5,
        title: "Self-Check: Surf or Blues?",
        type: "guitar",
        what: "Quick-switch test: someone calls out 'surf' or 'blues' and you immediately play a phrase in that style. If you can switch instantly, both vocabularies are internalized.",
        steps: [
          { text: "Set a timer for random intervals (or just alternate every 15-20 seconds). On each switch, immediately play a 4-note phrase in the called style.", why: "Instant switching tests whether the scales and feels are internalized or still require conscious thought." },
          { text: "Surf = Mixolydian, bright, straight picking, forward on the beat. Blues = pentatonic/blues scale, bends, behind the beat.", why: "These are two distinct musical personalities. You need to inhabit each one fully, not play them halfway." },
          { text: "Do 10 switches. Grade yourself: was each switch instant? Did each style sound distinctly different?", why: "Self-assessment builds awareness. If switches are slow, you know which style needs more woodshedding." },
          { text: "For a bonus challenge, try transitioning smoothly from one to the other instead of stopping between them.", why: "Smooth transitions are how real solos blend influences. This is advanced but reveals deep understanding." }
        ],
        feel: "Clean switches should feel like flipping a mental switch — your hands, your tone, your timing all change together. It's like speaking two languages.",
        wrong: "If blues and surf sound similar when you play them, you haven't differentiated them enough. Go back and spend time with each one separately.",
        sarah: "Being bilingual in musical styles is what makes a guitarist interesting. Anyone can learn one language — it's the contrast between two that creates depth."
      },
      {
        id: "gs-2-10",
        time: 15,
        title: "Surf Session",
        type: "guitar",
        recorder: true,
        what: "15-minute surf jam combining everything from Level 2: tremolo picking, Mixolydian melodies, double stops, and blues-to-surf switches. Full surf rock energy.",
        setup: "Bright clean tone with reverb. Record yourself.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Put on Surf Rock Beat 120. Start with double stops — walk up in 3rds to establish the surf feel.", why: "Double stops are a strong opening statement. They say 'this is surf' immediately." },
          { text: "Transition into tremolo-picked Mixolydian melodies. Move between the three positions you learned.", why: "Tremolo melodies over a surf beat is the core of this level. Let it rip." },
          { text: "Drop into a blues section — darker, bendier, behind the beat. Then snap back to bright surf. Contrast is drama.", why: "The blues-to-surf toggle creates narrative tension in your solo." },
          { text: "Build to a peak with your fastest tremolo picking in the highest position, then resolve with a final double stop.", why: "Every great surf instrumental has a climax. Build tension and release it." },
          { text: "Listen back. Where did you sound most like yourself? That's your developing voice.", why: "Your personal style emerges from the intersection of all your influences. Recording helps you hear it forming." }
        ],
        feel: "This should feel like a complete surf instrumental — energy, melody, contrast, and a sense of joy. Surf guitar is fun. If you're not smiling, play louder.",
        wrong: "If the 15 minutes felt monotonous, you need more variety — switch between techniques, registers, and moods. If your tremolo fell apart, it needs more isolated practice.",
        sarah: "Surf music is joy made audible. Don't overthink it — ride the wave.",
        levelUp: "You can sustain a varied, dynamic surf solo for 15 minutes using tremolo, double stops, Mixolydian, and blues. Your tremolo is even and your tone is bright."
      }
    ]
  },

  // ─── LEVEL 3: Reggae Skank ────────────────────────────────────────
  {
    level: 3,
    title: "Reggae Skank",
    subtitle: "Flip your rhythm upside down. The offbeat changes everything.",
    description:
      "Reggae guitar is the ultimate rhythm discipline — you play on the offbeat while everything in your musical training screams 'downbeat.' The skank (short, muted chord stabs on the 'and') is deceptively simple and maddeningly difficult. Master it and your rhythm playing transforms across every genre.",
    artists: "Bob Marley, Peter Tosh, Pepper, Slightly Stoopid, Skinshape",
    unlocks: "Desert Blues (Level 4)",
    exercises: [
      {
        id: "gs-3-1",
        time: 8,
        title: "The Offbeat — Unlearn the Downbeat",
        type: "guitar",
        what: "Strum ONLY on the 'and' after each metronome click. This is the hardest exercise in the curriculum because it fights every rhythmic instinct you have.",
        steps: [
          { text: "Set metronome to 80 BPM. Count '1-and-2-and-3-and-4-and.' The clicks are on 1,2,3,4. You play ONLY on the 'and.'", why: "Your body wants to play on the click. Resisting that impulse is what builds real rhythmic independence." },
          { text: "Start by tapping your foot on the clicks and clapping on the 'ands.' No guitar yet. Just internalize the feeling.", why: "Separating the physical coordination from the guitar makes it easier to learn." },
          { text: "Pick up the guitar. Strum a simple Am chord, but ONLY on the 'and.' Let the click pass in silence.", why: "The silence on the downbeat is as important as the strum on the upbeat. The gap is the groove." },
          { text: "Do this for 3 minutes straight without drifting to the downbeat. If you drift, stop and restart.", why: "Consistency is everything. One drift means your internal clock hasn't fully flipped yet." }
        ],
        feel: "When the offbeat locks in, you'll feel a lift — like the music is bouncing. It's a fundamentally different sensation from playing on the beat. It should feel floaty and syncopated.",
        wrong: "If you keep landing on the downbeat, your muscle memory is overriding your intention. Slow the metronome down to 60 BPM and try again. If the rhythm feels like it's lurching instead of bouncing, your timing between the clicks isn't even.",
        sarah: "This exercise is humbling. Guitarists who've played for years struggle with it. But once it clicks, you'll understand rhythm at a much deeper level than most players ever reach.",
        metronome: 80,
        levelUp: "You can play consistent offbeat skanks at 80 BPM for 2 minutes without a single drift to the downbeat."
      },
      {
        id: "gs-3-2",
        time: 8,
        title: "The Chop — Two-Hand Muting",
        type: "guitar",
        what: "Create the percussive staccato 'tchk' sound of reggae guitar by coordinating both hands: fretting hand releases pressure while picking hand palm-mutes, all in the instant after the strum.",
        steps: [
          { text: "Strum an Am chord normally. Now immediately release the fretting hand pressure (don't lift off — just release). The strings go dead.", why: "Releasing without lifting keeps the strings in contact with the frets but stops them from ringing. This is the 'chop.'" },
          { text: "Add the picking hand: after the strum, bring the palm edge onto the strings near the bridge. Two-handed muting is tighter than one hand alone.", why: "Double muting creates the ultra-tight 'tchk' that defines reggae guitar. One hand isn't enough." },
          { text: "Practice the sequence: strum-chop, strum-chop, strum-chop. Each strum should ring for only a split second before the chop kills it.", why: "The shorter the ring time, the more percussive the skank sounds. Aim for the chord lasting less than an eighth note." },
          { text: "Put it on the offbeat at 80 BPM. Strum-chop on every 'and.' The chop should be almost instantaneous.", why: "Combining offbeat timing with the chop technique is the complete reggae guitar sound." }
        ],
        feel: "The chop should sound like a percussion instrument — tight, short, punchy. When both hands sync up, you'll hear a clean 'tchk' instead of a messy 'brrrng.'",
        wrong: "If the chords ring too long, your muting is too slow. If you hear string buzz, you're pressing too hard when you should be releasing. If there's no discernible pitch in the chop, you're muting before the strum.",
        sarah: "The chop is what separates reggae guitar from 'strumming on the upbeat.' It's a two-hand technique that requires coordination — practice it slowly until both hands agree.",
        metronome: 80
      },
      {
        id: "gs-3-3",
        time: 10,
        title: "Minor 7th Voicings",
        type: "guitar",
        what: "Learn Am7, Dm7, Gm7, and Cmaj7 voicings on the top 3-4 strings. These bright, compact chord shapes are the harmonic foundation of reggae guitar.",
        steps: [
          { text: "Learn Am7: x-0-2-0-1-0 (open) or just the top 4 strings: 2-0-1-0. Play it and listen to the jazzy quality.", why: "Minor 7th chords are softer and more complex than regular minor chords. The added 7th gives them the reggae shimmer." },
          { text: "Learn Dm7 (x-x-0-2-1-1) and Gm7 (use a barre shape on the 3rd fret, top 4 strings only).", why: "These three chords — Am7, Dm7, Gm7 — cover most reggae progressions. Top-string voicings cut through a mix." },
          { text: "Learn Cmaj7 (x-3-2-0-0-0 or just top strings: 0-0-0-0 with the C bass). These are bright and wide.", why: "Cmaj7 is the resolution chord in many reggae progressions. It sounds peaceful and open." },
          { text: "Practice switching between all four shapes. Aim for silent switches — no sound between chords.", why: "In reggae, chord changes happen on offbeats. Fumbled changes break the groove harder than in any other genre." }
        ],
        feel: "7th chords feel more colorful than regular chords — richer, more complex, slightly jazzy. On the top strings, they sound bright and clear, perfect for skanking.",
        wrong: "If the chords sound muddy, you're including too many bass strings. Reggae guitar stays high and clear — let the bass player handle the low end. If your changes are slow, simplify the voicings to 3-string shapes.",
        sarah: "Reggae chord voicings are deliberately small and bright. You're not strumming all six strings — you're playing a tight, precise instrument that locks with the hi-hat."
      },
      {
        id: "gs-3-4",
        time: 10,
        title: "Skank with 7th Chords",
        type: "guitar",
        what: "Combine the offbeat skank and the chop with your new minor 7th voicings. Am7 to Dm7, two bars each, skanking on the offbeat with tight chops.",
        tracks: [{ name: "Groove Beat 90 BPM", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Start with Am7. Skank on the offbeats at 80 BPM with the chop. 2 bars (8 offbeat hits).", why: "Am7 with the skank and chop is the complete reggae guitar sound. This is the goal of the first 3 exercises combined." },
          { text: "Switch to Dm7 for 2 bars. The switch should happen ON an offbeat — no pause.", why: "Changing chords without breaking the offbeat rhythm is the challenge. The groove must be seamless." },
          { text: "Alternate Am7 and Dm7 for 3 minutes straight. Groove Beat 90 for backing.", why: "Repetition is where reggae lives. The groove deepens the longer you stay with it." },
          { text: "Add Gm7 and Cmaj7 to create a 4-chord progression. 1 bar each: Am7-Dm7-Gm7-Cmaj7.", why: "A 4-chord reggae progression gives you enough movement to feel musical while keeping the groove steady." }
        ],
        feel: "When the skank, chop, and chord changes all lock together, you'll feel the reggae bounce — a lifted, floating groove that makes you want to move. It's infectious.",
        wrong: "If the groove breaks when you change chords, you're thinking about the chord shapes instead of the rhythm. Slow down and make the chord changes automatic before speeding up.",
        sarah: "Reggae guitar is 90% rhythm and 10% harmony. If the groove is perfect, even one chord sounds amazing. If the groove breaks, even the best chords sound wrong.",
        metronome: 80
      },
      {
        id: "gs-3-5",
        time: 10,
        title: "Reggae Chord Progressions",
        type: "guitar",
        what: "Learn two essential reggae progressions: Am7-Dm7-G7-Cmaj7 (a reggae ii-V-I feel) and the classic one-drop: i-IV-i-V (Am-D-Am-E). These cover most reggae songs.",
        steps: [
          { text: "Progression 1: Am7-Dm7-G7-Cmaj7. Play 2 bars of each, skanking offbeats. This progression cycles and resolves beautifully.", why: "This is the diatonic circle progression that underpins thousands of reggae songs. The resolution to Cmaj7 feels like coming home." },
          { text: "Progression 2: Am-D-Am-E. Simpler, more driving. One bar each. This is the Bob Marley feel.", why: "The i-IV-i-V is rawer and more powerful. It doesn't resolve as smoothly, which gives it tension and energy." },
          { text: "Play each progression for 4 minutes. Focus entirely on the groove — make each repetition feel better than the last.", why: "Reggae progressions are short loops. The magic is in making each cycle groove deeper, not in playing more chords." },
          { text: "Try both progressions at different tempos: 75, 85, 95 BPM. Notice how the feel changes with tempo.", why: "Slower reggae is roots/dub. Faster is dancehall energy. Same chords, different universes." }
        ],
        feel: "Both progressions should feel like they could cycle forever. Reggae grooves are circular — there's no dramatic ending, just deeper and deeper pocket.",
        wrong: "If the progression sounds like a pop song, you're probably playing on the downbeat. If it sounds stilted, your chops aren't tight enough. If it sounds jazzy, your voicings might be too complex.",
        sarah: "Bob Marley used maybe 5 chord progressions his entire career. He never needed more because the groove and the message carried everything.",
        metronome: 95
      },
      {
        id: "gs-3-6",
        time: 10,
        title: "Dub Space Phrasing",
        type: "guitar",
        what: "Skank for 2 bars, then leave 2 bars of complete silence. This teaches you the dub concept of space — letting the rhythm section breathe while you disappear and reappear.",
        tracks: [{ name: "Dub Reggae 85 BPM", src: "/dub-reggae-85.mp3" }],
        steps: [
          { text: "Am7 skank for 2 bars (8 offbeats). Then stop completely for 2 bars. Hands off the strings.", why: "The silent bars are where dub magic happens. In a full band, the bass and drums fill the space. You're training yourself to trust the gaps." },
          { text: "During the silent bars, keep counting internally. Your foot should still tap. You're resting, not lost.", why: "Rhythmic awareness during silence is harder than playing. If you lose count, the re-entry is a disaster." },
          { text: "Re-enter on bar 3 exactly on the first offbeat. No hesitation, no early entry. Dub Reggae Beat 85 for timing.", why: "Clean re-entry after silence is a professional skill. The audience feels the groove drop back in." },
          { text: "Vary the re-entry: sometimes come back softer, sometimes louder. Sometimes change the chord. Build drama with the return.", why: "How you come back from silence defines the emotional arc. It's not just absence — it's anticipation." }
        ],
        feel: "The silence should feel intentional, not empty. When you re-enter, it should feel like a wave coming back — inevitable and satisfying.",
        wrong: "If you can't resist filling the silent bars, you haven't internalized that silence is part of the music. If you re-enter on the wrong beat, your internal count is slipping.",
        sarah: "Dub is the art of subtraction. Lee 'Scratch' Perry didn't add effects — he removed instruments. Space is the most powerful sound in music."
      },
      {
        id: "gs-3-7",
        time: 12,
        title: "Reggae Meets Surf",
        type: "guitar",
        what: "Play reggae offbeat skanks over a surf rock beat. This Pepper/Slightly Stoopid hybrid blends Caribbean rhythm with California energy — a style that sounds impossible but feels incredible.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Put on Surf Rock Beat 120. At this tempo, the offbeats are faster and more energetic.", why: "120 BPM offbeats transform reggae from laid-back roots into driving surf-reggae." },
          { text: "Skank Am7 on the offbeats. The chops need to be tighter at this speed — the window between beats is smaller.", why: "Higher tempo demands more precise muting. Your chop timing needs to shrink proportionally." },
          { text: "After 4 bars of skanking, drop into a 2-bar Mixolydian surf lead. Then back to skanking.", why: "The contrast between rhythm and lead is the Slightly Stoopid formula. Rhythm guitarist becomes lead guitarist and back." },
          { text: "Try skanking with Mixolydian-based chords instead of minor 7ths. Major-key reggae over surf rock. Notice the brighter feel.", why: "Changing the harmonic palette while keeping the reggae rhythm creates a unique fusion sound." },
          { text: "Experiment with the blend: what ratio of skank to surf lead feels right? Find your sweet spot.", why: "There's no right answer. Pepper leans more reggae. Slightly Stoopid leans more rock. Your blend is your voice." }
        ],
        feel: "This should feel energetic and fun — the best of both worlds. The reggae bounce combined with surf drive creates something that makes you want to move.",
        wrong: "If the skanks fall apart at 120 BPM, the tempo is challenging your muting technique. Practice the chop at 100 BPM first, then work up. If the surf leads sound disconnected from the skanks, you're not transitioning smoothly enough.",
        sarah: "Pepper figured out that reggae and surf aren't opposites — they're both ocean music. One from the Caribbean, one from California. Same vibe, different expression.",
        metronome: 120
      },
      {
        id: "gs-3-8",
        time: 12,
        title: "Skinshape Style — Skank + Lead",
        type: "guitar",
        what: "Float blues and pentatonic lead phrases over an imagined reggae skank loop. Skinshape's approach: play as if there's a rhythm guitarist skanking while you solo on top. One guitar, two roles.",
        steps: [
          { text: "Establish the groove: skank Am7 for 8 bars. Get the offbeat so deep in your body that it continues even when you stop playing it.", why: "Internalizing the skank means you can solo over it without losing the rhythmic feel. The groove becomes the ground." },
          { text: "Now stop skanking and play a blues/pentatonic phrase — but feel the offbeats underneath. Your phrases should land between the ghost skanks.", why: "Playing lead over an internal rhythm is what makes Skinshape's guitar sound so groove-locked. You're hearing a ghost band." },
          { text: "Try alternating: 2 bars skank, 1 bar lead, 2 bars skank, 1 bar lead. Quick switches between roles.", why: "Switching roles on one guitar is a performance technique. It sounds like two guitarists if the transitions are smooth." },
          { text: "Slow the lead lines down. Skinshape plays fewer notes than you'd expect — every note sits perfectly in the groove.", why: "Restraint is the Skinshape signature. It's not about how many notes you play but how each one relates to the beat." }
        ],
        feel: "When you're soloing but still feeling the offbeat underneath, there's a dual awareness — part of your brain is grooving, part is creating. It should feel like patting your head and rubbing your stomach, but musical.",
        wrong: "If your lead phrases ignore the reggae groove, you've lost the foundation. If you can't switch back to skanking without a stumble, the roles aren't internalized yet.",
        sarah: "Skinshape's genius is that his guitar solos don't leave the groove — they ride on top of it. The rhythm is always present, even when he's playing melody."
      },
      {
        id: "gs-3-9",
        time: 5,
        title: "Self-Check: Hold the Offbeat",
        type: "guitar",
        what: "Two full minutes of continuous skanking without a single drift to the downbeat. This is the ultimate test of Level 3 — can you hold the offbeat under pressure?",
        tracks: [{ name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }],
        steps: [
          { text: "Set a timer for 2 minutes. Reggae One Drop 85 playing. Start skanking Am7 on the offbeat.", why: "Two minutes doesn't sound long, but maintaining perfect offbeat discipline for 120 seconds is a real test." },
          { text: "Close your eyes. The visual distraction of watching your hands can pull you off the beat.", why: "Closing your eyes forces you to listen and feel instead of look. The groove must be internal." },
          { text: "If you drift even once — you feel a strum landing on the click instead of between — start the timer over.", why: "The restart rule forces perfection. It's frustrating but effective." },
          { text: "When you pass the 2-minute test, try it at 100 BPM. Then 110. The faster it goes, the harder it is to maintain.", why: "Speed reveals weakness. If your offbeat is solid at 110 BPM, it's bulletproof at 80." }
        ],
        feel: "When you've held the offbeat for 2 minutes straight, there's a quiet confidence — you KNOW you have it. The groove feels effortless and automatic.",
        wrong: "If you keep drifting before the 2-minute mark, your body hasn't fully reprogrammed from downbeat playing. This is normal. Keep practicing the earlier exercises and try again.",
        sarah: "Most drummers can't hold a consistent offbeat for 2 minutes on their first try. If you can do it on guitar, your rhythm is stronger than most musicians in any genre.",
        metronome: 90,
        levelUp: "You can skank consistently for 2 full minutes at 90 BPM without any drift to the downbeat."
      },
      {
        id: "gs-3-10",
        time: 15,
        title: "Reggae Jam",
        type: "guitar",
        recorder: true,
        what: "Extended reggae jam mixing skanks, lead breaks, dub spaces, and chord progressions. Everything from Level 3 in a musical context.",
        setup: "Record yourself. Clean tone, reverb optional.",
        tracks: [{ name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85 BPM", src: "/dub-reggae-85.mp3" }],
        steps: [
          { text: "Put on Reggae One Drop 85. Start with Am7 skank — establish the groove for 8 bars. Get deep in the pocket.", why: "Every reggae song starts with the groove. Let the rhythm section (backing track) settle before you add complexity." },
          { text: "Work through the Am7-Dm7-G7-Cmaj7 progression. Keep the skanks tight. Feel the harmonic movement beneath the rhythm.", why: "Chord progressions over a solid offbeat groove is the heart of reggae guitar." },
          { text: "Take a 2-bar lead break — blues scale, minimal notes, then back to skanking. Do this 3-4 times.", why: "Brief lead breaks add variety without abandoning the groove. Skinshape style — taste, not feast." },
          { text: "Drop out for 4 bars. Complete silence. Switch to the Dub Reggae Beat 85 and re-enter with a different chord than you left on.", why: "Dub spaces create drama. The re-entry chord change creates a moment of surprise." },
          { text: "Build to the end by layering: skank + occasional lead + chord changes. Then drop to a single muted chop on Am7 to finish.", why: "Ending on a simple, quiet skank after a full jam is deeply satisfying. Less is more." }
        ],
        feel: "A full reggae jam should feel like a meditation — repetitive, hypnotic, and deeply groovy. When it's working, you lose track of time and just ride the pocket.",
        wrong: "If you played lead the whole time, you missed the point. Reggae guitar is primarily rhythm. If the groove broke when you changed chords, slow down the changes. If the dub spaces felt awkward, you need to trust silence more.",
        sarah: "Reggae is the most disciplined genre in guitar. The discipline IS the art. When you can hold one groove for 15 minutes and make it feel deeper every bar, you've understood something most guitarists never learn.",
        levelUp: "You can jam reggae for 15 minutes with solid offbeats, smooth chord changes, tasteful lead breaks, and intentional dub spaces."
      }
    ]
  },

  // ─── LEVEL 4: Desert Blues ────────────────────────────────────────
  {
    level: 4,
    title: "Desert Blues",
    subtitle: "Hypnotic repetition. Patience as a technique. The Sahara in your fingers.",
    description:
      "Desert blues comes from the Sahara — Tinariwen, Bombino, Ali Farka Toure. It uses a 'sus pentatonic' (replacing the minor 3rd with a 2nd), drone strings, and hypnotic repetition to create trance-like music. This level teaches patience as a musical technique.",
    artists: "Tinariwen, Bombino, Ali Farka Toure, Mdou Moctar",
    unlocks: "Khruangbin Space (Level 5)",
    exercises: [
      {
        id: "gs-4-1",
        time: 8,
        title: "Sus Pentatonic — One Note Different",
        type: "guitar",
        what: "Learn the sus pentatonic scale: A-B-D-E-G (replacing the minor 3rd C with the 2nd B). One note difference from the minor pentatonic creates a completely different world — floating, ambiguous, neither major nor minor.",
        steps: [
          { text: "Play Am pentatonic: A-C-D-E-G. Now replace C with B: A-B-D-E-G. Play both scales back to back.", why: "Hearing the two scales side by side reveals how much one note changes the entire character." },
          { text: "Play A-B-D-E-G ascending and descending in the 5th fret position. Find the shape — it's close to your pentatonic but the 2nd finger moves one fret.", why: "The new shape is almost the same as pentatonic, which means your fingers will try to play the old pattern. Be deliberate." },
          { text: "Emphasize the B note — land on it, hold it, let it ring. This is the note that defines the desert sound.", why: "The 2nd (B in Am) creates ambiguity — is this major or minor? Neither. It's floating. That ambiguity is the desert blues feel." },
          { text: "Improvise with just A, B, and D. Three notes. One minute. See how much music you can make with almost nothing.", why: "Desert blues is built from minimal materials used with maximum patience. Less is the whole point." }
        ],
        feel: "The sus pentatonic should feel open and spacious — like standing in a vast landscape with nothing blocking the horizon. It's neither happy nor sad, just vast.",
        wrong: "If it sounds like regular pentatonic, you're playing C instead of B. If it sounds too bright, you might be playing a major scale. The sus pentatonic should feel ambiguous and floating.",
        sarah: "One note is the difference between Mississippi Delta blues and Saharan desert blues. Same guitar, same technique, completely different emotional world. That's the power of note choice.",
        fretboard: { scale: "a-sus-pentatonic", position: 2 }
      },
      {
        id: "gs-4-2",
        time: 8,
        title: "Drop D Drone Setup",
        type: "guitar",
        what: "Tune your low E string down to D. Use the open D string as a constant drone while playing melodies on the upper strings. This creates the hypnotic foundation of desert blues guitar.",
        setup: "Tune low E string down one whole step to D. Verify tuning with the D string (4th string) — they should be an octave apart.",
        steps: [
          { text: "Tune the low E down to D. Pick it alongside the open D string — they should sound like the same note, one octave apart.", why: "Drop D gives you a deep, powerful bass drone. Tuareg guitarists often use open tunings for exactly this purpose." },
          { text: "Let the low D ring open while you play the sus pentatonic on the top 3 strings. Alternate: pluck the bass, then a melody note.", why: "Bass drone + melody is the core texture of desert blues. One guitar sounds like two instruments." },
          { text: "Try a pattern: bass-melody-melody-bass-melody-melody. The bass lands on beats 1 and 4, melody fills between.", why: "This alternating bass pattern is universal in West African guitar. It creates a complete arrangement from one guitar." },
          { text: "Experiment with sustaining the bass drone using a thumb pick or by letting it ring while picking melody notes with other fingers.", why: "Fingerpicking or hybrid picking lets you maintain the drone continuously. The bass never stops." }
        ],
        feel: "The drone should feel like a heartbeat underneath the melody — steady, constant, grounding. The melody floats above it like heat shimmer over sand.",
        wrong: "If the bass drone overpowers the melody, play the bass string more softly. If the melody notes are unclear, make sure you're fretting cleanly on the upper strings.",
        sarah: "The drone is not background — it's the foundation that makes the melody meaningful. Without it, the melody floats aimlessly. With it, every note has context."
      },
      {
        id: "gs-4-3",
        time: 10,
        title: "Hypnotic Repetition",
        type: "guitar",
        what: "Choose a 4-note phrase. Repeat it 16 times without variation. Only then, change one note. This exercise teaches patience and reveals the trance power of repetition — the core of desert blues.",
        steps: [
          { text: "Choose any 4 notes from the sus pentatonic. Play them as a short phrase with a simple rhythm. This is your motif.", why: "The motif doesn't need to be clever. Simple phrases become hypnotic through repetition. Complex phrases become exhausting." },
          { text: "Repeat your motif 16 times. Same notes, same rhythm, same dynamics. No variation. Count each repetition.", why: "16 repetitions feels like forever at first. By repetition 8, something changes — the phrase stops being a pattern and becomes a groove." },
          { text: "On repetition 17, change exactly one note. Listen to how enormous that tiny change feels.", why: "After 16 repetitions of the same phrase, a single changed note sounds like a revelation. This is the power of patience." },
          { text: "Repeat the new phrase 8 times. Then change another note. Build a piece that evolves glacially.", why: "Glacial evolution creates narrative without drama. The listener is drawn in by subtlety, not spectacle." }
        ],
        feel: "By repetition 10 or so, you should enter a mild trance state — the phrase plays itself, your mind quiets, and you hear harmonics and overtones you never noticed. This is the meditative power of repetition.",
        wrong: "If you get bored and change the phrase early, you haven't committed to the process. The boredom is the point — push through it and something shifts. If the phrase is too complex to repeat exactly, simplify it.",
        sarah: "Tinariwen can play the same riff for 10 minutes and it gets MORE interesting, not less. The secret is that repetition reveals depth. Each cycle, you hear something new in the same notes.",
        levelUp: "You can repeat a 4-note phrase 16 times without variation, and the phrase deepens rather than becomes boring."
      },
      {
        id: "gs-4-4",
        time: 10,
        title: "Call and Response — Desert Style",
        type: "guitar",
        what: "Two-guitar thinking on one instrument: play a phrase (call), then answer it with a slightly varied response. In desert blues, the response echoes the call with small mutations, creating an endless conversation.",
        steps: [
          { text: "Play a 4-note sus pentatonic phrase. That's the call. Pause for 2 beats.", why: "The call establishes the idea. The pause creates space for the response to emerge." },
          { text: "Play the response: same rhythm, but change one note. The response echoes the call while moving the music forward.", why: "In desert blues, responses don't contrast — they echo and mutate. It's evolution, not argument." },
          { text: "Continue the chain: the response becomes the next call. Change one note each time. After 8 exchanges, compare where you started and where you ended.", why: "Chained call-and-response is how desert blues pieces develop. Tiny mutations over time create significant transformation." },
          { text: "Try with the drone: bass drone on beats 1 and 3, call on beat 2, response on beat 4.", why: "Adding the drone gives the call-and-response a rhythmic framework. Now you're playing a complete desert blues piece." }
        ],
        feel: "Desert-style call and response should feel like a conversation between two patient people — each statement carefully considered, each response slightly different. No hurry.",
        wrong: "If your responses are completely different from your calls, you've lost the echo principle. If they're identical, you're not evolving. The sweet spot is 80% same, 20% different.",
        sarah: "In Tuareg music, two guitarists play interlocking parts that slowly evolve together. You're simulating that conversation on one guitar — one voice pretending to be two."
      },
      {
        id: "gs-4-5",
        time: 10,
        title: "Microtonal Bends",
        type: "guitar",
        what: "Bend between the 2nd and the minor 3rd (B and C in Am) — a quarter-tone bend that lands between Western pitches. This microtonal space is where Tuareg guitar imitates the human voice.",
        steps: [
          { text: "Fret B (7th fret, high E string). Bend it up, but only halfway to C. Stop in the zone between the two notes.", why: "Quarter-tone bends exist outside Western tuning. They create an 'in-between' pitch that sounds vocal and haunting." },
          { text: "Practice finding the quarter-tone consistently. Bend to it, hold it, release. The pitch should be 'wrong' by Western standards but 'right' by feel.", why: "Training your ear to recognize quarter-tones opens a whole dimension of expression that most Western guitarists never access." },
          { text: "Use the microtonal bend in a sus pentatonic phrase: A-B (bend slightly)-D-E. The bent B floats between worlds.", why: "In context, the microtonal bend adds a vocal, crying quality that straight notes can't achieve." },
          { text: "Try microtonal bends on different strings and fret positions. Each string bends differently — learn the feel for each one.", why: "String thickness and fret position change how much pressure a quarter-tone requires. Your muscle memory needs to adapt." }
        ],
        feel: "A good microtonal bend should sound like a voice — not quite one note, not quite another, but a human sound in between. It should make you feel slightly uncomfortable in a beautiful way.",
        wrong: "If the bend goes all the way to C, you've overshot — that's a regular half-step bend. If it doesn't move at all, you need more pressure. The quarter-tone is a very specific, very small movement.",
        sarah: "Microtonal bending is what separates guitar from piano. The piano can only play the notes that exist. Guitar can play the spaces between. Desert blues lives in those spaces."
      },
      {
        id: "gs-4-6",
        time: 10,
        title: "Blues vs Desert Blues",
        type: "guitar",
        what: "Same tempo, same backing. 4 bars of Am pentatonic (blues feel), then 4 bars of sus pentatonic (desert feel). One note is the only difference, but the entire emotional landscape changes.",
        tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
        steps: [
          { text: "Put on the Desert Blues Groove 75. Play 4 bars using Am pentatonic: A-C-D-E-G. Play it bluesy — bends, behind the beat.", why: "Establishing the blues feel first makes the desert transition more dramatic." },
          { text: "Switch to sus pentatonic: A-B-D-E-G. Play it differently — straighter, more repetitive, patient. Let phrases cycle.", why: "Desert blues has a different attitude than American blues. It's circular, not narrative. Repetitive, not dramatic." },
          { text: "Toggle back and forth. Listen to how the C (blues) and B (desert) create completely different worlds.", why: "One note is the difference. C is the minor 3rd — sad, familiar, bluesy. B is the 2nd — open, ambiguous, floating." },
          { text: "Try blending: use the sus pentatonic but bend the B up slightly toward C. What world are you in now?", why: "The space between B and C is where desert blues and American blues overlap. This gray zone is rich territory." }
        ],
        feel: "The toggle should feel like switching between two landscapes — the Mississippi Delta and the Sahara Desert. Same heat, different terrain.",
        wrong: "If both sections sound the same, you're not committing to the character of each scale. Blues is vocal and bending; desert is repetitive and droning.",
        sarah: "Ali Farka Toure said the blues came from Africa. When you play both scales, you hear the family resemblance — and the divergence. Same ancestor, different continents.",
        metronome: 85
      },
      {
        id: "gs-4-7",
        time: 12,
        title: "Tinariwen Reference Pattern",
        type: "guitar",
        what: "Build a hypnotic interlocking guitar pattern inspired by Tinariwen's 'Imidiwan Ma Tennam.' Drone bass on the low D string while a repetitive melody cycles on the upper strings — two voices from one guitar.",
        setup: "Drop D tuning. Clean tone, slight reverb.",
        tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
        steps: [
          { text: "Low D drone: let the open D string ring on beats 1 and 3. This is constant throughout.", why: "The drone is the earth. It never stops. Everything else moves around it." },
          { text: "On beats 2 and 4, play a 2-note melody on the high E and B strings using the sus pentatonic. Keep it simple.", why: "The melody is the voice that speaks over the drone. Simple melodies become profound through repetition." },
          { text: "Put on the Desert Blues Groove 75 and repeat this bass-melody pattern for 3 minutes straight. Don't vary it. Let the pattern become automatic.", why: "The hypnotic quality only emerges after the pattern is completely internalized. Your conscious mind relaxes and the music plays itself." },
          { text: "After 3 minutes, change one melody note. Play 2 more minutes with the variation. Then change again.", why: "Tinariwen's songs evolve glacially. The changes are so small the listener barely notices them happening." },
          { text: "If possible, add a subtle microtonal bend to one of the melody notes every other repetition. This is the vocal touch.", why: "The microtonal variation within a repeating pattern creates the organic, human quality that distinguishes live desert blues from a loop." }
        ],
        feel: "This should feel meditative — the pattern plays itself and your mind enters a calm, focused state. When you change a note, it should feel significant, like a new color appearing in a sunrise.",
        wrong: "If you get bored and add complexity, you're resisting the process. If the drone keeps dropping out, focus on the right-hand pattern until it's automatic.",
        sarah: "Tinariwen's music is communal and trance-inducing. When you play their patterns alone, you're participating in a musical tradition that's been creating altered states for centuries."
      },
      {
        id: "gs-4-8",
        time: 12,
        title: "Desert Blues over Surf Rock",
        type: "guitar",
        what: "Play sus pentatonic melodies over a surf rock backing track. Surf energy meets desert melody — an unlikely fusion that connects the Sahara to the Pacific Coast.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Put on Surf Rock Beat 120. Instead of Mixolydian, play the sus pentatonic: A-B-D-E-G.", why: "The surf beat provides forward momentum while the sus pentatonic provides the floating, ambiguous melody. The combination is unexpectedly powerful." },
          { text: "Keep the desert blues approach: repetitive phrases, patience, space. Don't let the surf energy rush you.", why: "The tension between the driving beat and the patient melody creates a unique feel — like a desert caravan moving at surfing speed." },
          { text: "Try tremolo picking a sus pentatonic melody — desert notes with surf technique. Best of both worlds.", why: "Tremolo picking (from Level 2) applied to desert melodies creates a shimmering, hypnotic sound that neither style has alone." },
          { text: "Alternate between desert phrases and surf phrases (Mixolydian). Two different worlds over the same beat.", why: "Moving between sus pentatonic and Mixolydian over a surf beat gives you access to a huge range of expression." }
        ],
        feel: "This fusion should feel exciting and surprising — like discovering two puzzle pieces from different boxes that somehow fit together. The desert melody adds mystery to the surf energy.",
        wrong: "If it sounds like regular surf guitar, you've drifted back to Mixolydian. If it sounds like aimless noodling, you need more repetition and structure in your desert phrases.",
        sarah: "Genre boundaries are lines on a map. The music doesn't care. Surf rock and desert blues both use pentatonic scales, both value melody, and both make you want to move. They're more alike than different."
      },
      {
        id: "gs-4-9",
        time: 5,
        title: "Self-Check: Play One Phrase for 5 Minutes",
        type: "guitar",
        what: "Choose a single 4-note phrase. Play it for 5 full minutes. No variation until minute 4. This is the ultimate test of patience — can you let repetition do its work?",
        steps: [
          { text: "Choose your phrase. 4 notes from the sus pentatonic with the drone bass. Set a 5-minute timer.", why: "The phrase itself doesn't matter. What matters is your relationship to repetition." },
          { text: "Minutes 1-2: the phrase feels simple, maybe boring. Keep going. Don't change anything.", why: "Boredom is the first gateway. Push through it. The music deepens on the other side." },
          { text: "Minutes 2-4: listen for overtones, micro-rhythms, string resonance. The phrase is revealing hidden dimensions.", why: "Repetition changes perception. You stop hearing the notes and start hearing the spaces between them." },
          { text: "Minute 4-5: now you may change ONE note. Just one. Notice how colossal that tiny change feels after 4 minutes of repetition.", why: "After 4 minutes of the same phrase, a single changed note sounds like a thunderclap. That's the power of patience." }
        ],
        feel: "If you make it to minute 4 without variation, you should feel a shift in consciousness — the phrase stops being something you're playing and becomes something that's happening. You're inside the music, not performing it.",
        wrong: "If you changed the phrase before minute 4, you didn't commit. Try again. This isn't about music — it's about discipline. If 5 minutes felt like torture, start with 2 minutes and build up.",
        sarah: "This is the most Zen exercise in the entire curriculum. It's not really about guitar at all — it's about training your attention. Musicians who can sit inside repetition have a superpower.",
        levelUp: "You can play a single phrase for 5 minutes, and by minute 3, you're hearing things in it you never noticed before."
      },
      {
        id: "gs-4-10",
        time: 15,
        title: "Desert Session",
        type: "guitar",
        recorder: true,
        what: "Extended desert blues jam. Drop D drone, sus pentatonic, hypnotic repetition, microtonal bends. 15 minutes of patient, trance-inducing guitar.",
        setup: "Drop D tuning. Clean tone, light reverb. Record yourself.",
        tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }],
        steps: [
          { text: "Put on the Desert Blues Groove 75. Start with just the open D drone. 4 bars of only the bass note. Let the room fill with the low D.", why: "Starting with the drone alone establishes the foundation. Everything builds from this single note." },
          { text: "Add a simple 3-note melody over the drone. Repeat it for 2 minutes. Let it become hypnotic.", why: "The opening melody sets the tone for the entire 15 minutes. Choose notes that complement the D drone." },
          { text: "Gradually evolve: change one note every 2 minutes. Add microtonal bends. Move between registers on the upper strings.", why: "Desert blues development is glacial. The whole 15 minutes might only use 6-7 different notes." },
          { text: "Around minute 10, bring in your most intense phrasing — faster repetitions, stronger bends. Then slowly pull back to the original 3-note melody.", why: "Even desert blues has a climax — it just arrives slowly and leaves slowly. The arc is stretched over the full 15 minutes." },
          { text: "End on the open D drone alone. Listen to it ring out. Silence.", why: "Ending where you started creates a circle. The piece feels complete and self-contained." }
        ],
        feel: "A 15-minute desert session should feel like a journey through a vast, still landscape. When it's working, you lose track of time. The repetition becomes meditative. You hear overtones and harmonics you never noticed.",
        wrong: "If you played fast and varied throughout, you missed the point. Desert blues is about restraint, patience, and depth. If you got bored and stopped at minute 7, work up to the full duration gradually.",
        sarah: "This is the deepest musical experience in the curriculum so far. Most Western music is about going somewhere. Desert blues is about being somewhere — fully present, fully patient, fully alive in the moment.",
        levelUp: "You can sustain a desert blues jam for 15 minutes that evolves gradually, maintains the drone, and doesn't rush. The repetition feels meditative, not monotonous."
      }
    ]
  },

  // ─── LEVEL 5: Khruangbin Space ────────────────────────────────────
  {
    level: 5,
    title: "Khruangbin Space",
    subtitle: "Maximum restraint. Every note must earn its place.",
    description:
      "Khruangbin's guitar approach is anti-guitar-hero: soft pick attack, behind-the-beat phrasing, global pentatonic flavors, and more silence than sound. This level teaches restraint as a form of mastery — saying the most with the least.",
    artists: "Khruangbin, Tommy Guerrero, Skinshape",
    unlocks: "Funk & Rhythm Guitar (Level 6)",
    exercises: [
      {
        id: "gs-5-1",
        time: 8,
        title: "Three-Note Voicings",
        type: "guitar",
        what: "Learn chord fragments on the top 3 strings with the root omitted. Am becomes just C+E, C becomes just E+G. These minimal voicings sound open, ambiguous, and modern — the Khruangbin harmonic palette.",
        steps: [
          { text: "Play Am as a full barre chord. Now strip it down to just the top 3 strings: the notes C, E, A become C, E (skip the root A).", why: "Removing the root makes the chord ambiguous — it could be Am or C6. This openness is the Khruangbin sound." },
          { text: "Find 3-note voicings for Dm, Em, G, and C on the top 3 strings. Each chord is just two unique notes plus a doubling.", why: "Three-note voicings are transparent — they suggest harmony without declaring it. This leaves room for the bass to define the chord." },
          { text: "Play a progression using only these stripped-down voicings: Am-Dm-G-C with 3 notes each. Notice how airy it sounds.", why: "Full chords fill the sonic space. Three-note voicings create windows of air that make everything breathe." },
          { text: "Try playing these voicings with a soft pick attack — barely touching the strings. Let the notes whisper.", why: "Khruangbin's dynamics are crucial. Soft attack + open voicings = the spacious, floating sound." }
        ],
        feel: "Three-note voicings should feel like watercolors compared to full chords' oil paint — lighter, more transparent, more suggestive. The sound should float.",
        wrong: "If the chords sound thin or weak, you might be playing too softly or muting strings accidentally. Three-note voicings are delicate but should still be clear. If they sound like full chords, you're including too many strings.",
        sarah: "Mark Speer (Khruangbin) said he thinks of his guitar as a melodic instrument, not a rhythm instrument. These voicings blur the line between chords and melody — that's the point."
      },
      {
        id: "gs-5-2",
        time: 8,
        title: "Flatwound Feel (Pick Attack)",
        type: "guitar",
        what: "Transform your tone by changing your pick attack: pick further from the bridge, use a softer touch, and aim for a round, warm sound with no treble bite. This is the Khruangbin signature tone.",
        setup: "Neck pickup. Tone knob rolled back slightly. No overdrive.",
        steps: [
          { text: "Play an open A string with your normal picking position. Listen to the tone. Now move your picking hand toward the neck — halfway between bridge and neck.", why: "Picking position radically changes tone. Near the bridge is bright and snappy. Near the neck is warm and round." },
          { text: "Reduce your pick attack. Use less force. Imagine the pick is just brushing the string, not digging in.", why: "Hard picking creates transients — that initial 'tick' sound. Soft picking lets the note bloom without attack." },
          { text: "Play a pentatonic phrase with this soft, neck-position attack. Compare it to your normal picking. Huge difference.", why: "The same notes played with a different attack sound like a completely different instrument." },
          { text: "Try fingerpicking instead of using a pick. Thumb for bass, fingers for melody. This is the warmest possible tone.", why: "Fingers are softer than any pick. Many Khruangbin-inspired tones are achieved with hybrid picking or fingerstyle." }
        ],
        feel: "The soft attack should feel like you're coaxing sound from the guitar, not forcing it. Notes should bloom — a slow, warm envelope instead of a sharp spike. It feels gentle and controlled.",
        wrong: "If the notes are too quiet to hear, you've gone too soft. If they still have that pick 'tick,' you're still too close to the bridge or picking too hard. Find the sweet spot between too soft and too aggressive.",
        sarah: "Mark Speer uses flatwound strings, which have no brightness at all. You can get close to that sound with roundwounds by changing your technique — pick position and attack do 80% of the work."
      },
      {
        id: "gs-5-3",
        time: 10,
        title: "The Art of Space",
        type: "guitar",
        recorder: true,
        what: "Play a short phrase. Then wait twice as long as you want to before playing the next one. Record 2 minutes and listen back. This exercise teaches you that silence is an active musical choice, not an absence.",
        setup: "Record yourself. Any tone. Backing track optional.",
        steps: [
          { text: "Play a 3-4 note phrase using any scale you've learned. Then stop. Count how long you want to wait before playing again.", why: "Your instinct will say 'play now!' — that urge to fill silence is what we're training against." },
          { text: "Whatever your instinct says, double the wait time. If you want to wait 2 seconds, wait 4. If 4, wait 8.", why: "Doubling your natural pause length pushes you into uncomfortable silence. That discomfort is growth." },
          { text: "Play another phrase. Not a response to the first one — a new idea, born from the silence that preceded it.", why: "When silence is long enough, the next phrase isn't a reaction — it's a fresh thought. This creates spacious, meditative music." },
          { text: "Continue for 2 minutes. Record the whole thing. Then listen back without your guitar.", why: "Listening back reveals the truth: silence that felt eternal while playing sounds perfectly natural from the outside." },
          { text: "Count the seconds of silence vs playing in your recording. If silence is less than 40%, you're still too busy.", why: "The 40% silence target is calibrated to Khruangbin's actual recordings. More silence than most players think is right." }
        ],
        feel: "The silence should eventually feel charged — not empty, but full of potential. Each phrase should feel like it appeared at exactly the right moment, not a second too early.",
        wrong: "If you filled every gap with a note, you didn't trust the silence. If the recording sounds like random notes with awkward pauses, you need to commit more fully to the silence — own it, don't endure it.",
        sarah: "Miles Davis said 'It's not the notes you play, it's the notes you don't play.' Khruangbin took that literally. Their songs are more silence than sound, and the silence is what makes the notes matter."
      },
      {
        id: "gs-5-4",
        time: 10,
        title: "Behind the Beat",
        type: "guitar",
        what: "Play deliberately behind the beat — placing every note slightly AFTER the metronome click. This creates a lazy, floating, intentional feel that defines Khruangbin's rhythmic personality.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Khruangbin Style Beat 80 playing. First, play exactly on the beat for 4 bars. Lock in. This is your reference point.", why: "You need to feel 'on the beat' clearly before you can intentionally play behind it." },
          { text: "Now play the same phrase but place every note a tiny fraction AFTER the click. Not a whole beat late — just a breath behind.", why: "Behind the beat is measured in milliseconds. Too far behind and you sound late. Just a touch behind and you sound cool." },
          { text: "The easiest way to practice this: imagine the click is your signal to BEGIN the motion that produces the note, not the moment the note sounds.", why: "This mental model naturally creates the slight delay. The click triggers action; the action produces sound a moment later." },
          { text: "Play a 2-minute improv entirely behind the beat. Khruangbin Style Beat 80. Every single note should feel like it's arriving fashionably late.", why: "Sustaining behind-the-beat feel for a full 2 minutes is harder than it sounds. Your body wants to drift back on top of the beat." }
        ],
        feel: "Behind the beat should feel languid and heavy — like the notes are sinking into a warm bath. There's no rush, no urgency. The beat is the current and you're floating on it, not swimming against it.",
        wrong: "If you sound late or sloppy, you're too far behind. If you sound normal, you've drifted back on the beat. The sweet spot is extremely narrow — barely perceptible as 'late' but clearly 'groovy.'",
        sarah: "Playing on the beat is a skill. Playing behind the beat on purpose is mastery. It requires knowing exactly where the beat is and choosing to arrive just after it.",
        metronome: 90
      },
      {
        id: "gs-5-5",
        time: 10,
        title: "Global Pentatonic Flavors",
        type: "guitar",
        what: "Same pentatonic foundation, three different cultural flavors: blues (bend into the b5), desert (use 2nd instead of b3), and Thai/Middle Eastern (add a b2 approach note). One scale, three worlds.",
        steps: [
          { text: "Blues flavor: Am pentatonic with bends into the b5 (Eb). Play 2 minutes of blues phrasing — bends, vibrato, behind the beat.", why: "This is your home base from Level 1. Revisiting it with fresh ears shows how much your playing has matured." },
          { text: "Desert flavor: sus pentatonic (A-B-D-E-G). Repetitive phrases over an imagined drone. Patient, circular, meditative.", why: "Desert flavor from Level 4 uses different note choice AND different attitude. Same fingers, different world." },
          { text: "Thai/Middle Eastern flavor: Am pentatonic but approach notes from a half-step below: before playing A, play Ab and slide up. Before E, play Eb and slide up.", why: "The b2 approach note (Bb approaching A, or Ab approaching A) adds an exotic, Eastern flavor. Khruangbin uses this constantly." },
          { text: "Toggle between all three flavors: 4 bars blues, 4 bars desert, 4 bars Middle Eastern. Then try blending two flavors in one phrase.", why: "Having three flavors on the same scale gives you enormous range. Blending them is where a personal style begins to emerge." }
        ],
        feel: "Each flavor should transport you to a different place — a smoky club, a vast desert, a Bangkok street. The pentatonic is the same; the seasoning changes everything.",
        wrong: "If all three sound the same, you're not committing to the character of each flavor. Blues should bend, desert should repeat, Eastern should use chromatic approach notes. Each has a distinct personality.",
        sarah: "Khruangbin's genius is treating the pentatonic scale as a global language — adding different accents and idioms depending on the song. This exercise gives you the same superpower."
      },
      {
        id: "gs-5-6",
        time: 10,
        title: "Motif Development",
        type: "guitar",
        what: "Play a 3-note motif. Repeat it. Change one note. Repeat. Change the rhythm. Repeat. This Khruangbin method builds entire songs from one tiny idea through patient, systematic development.",
        steps: [
          { text: "Choose 3 notes from any scale you've learned. Play them in a simple rhythm. This is your seed motif.", why: "Three notes is the minimum for a recognizable phrase. It's small enough to develop but big enough to be musical." },
          { text: "Repeat the motif 4 times identically. Then change one note — make it higher, lower, or a different scale degree. Repeat 4 times.", why: "Each mutation is tiny but cumulative. After 5 mutations, the motif has evolved significantly while remaining connected to the original." },
          { text: "Now change the rhythm instead of the notes. Same 3 notes but shift where they land in the beat. Repeat 4 times.", why: "Rhythmic variation is as powerful as note variation. The same melody with a different rhythm is a different phrase." },
          { text: "Continue developing for 5 minutes total. At the end, play your original motif and your final version back to back. Hear the journey.", why: "Hearing the start and end side by side reveals how far you can travel from three notes with patience and discipline." }
        ],
        feel: "Motif development should feel like watching a plant grow — the change is imperceptible moment to moment but dramatic over time. Each variation should feel inevitable, not forced.",
        wrong: "If you changed everything at once, you lost the thread. If the final version has no connection to the original, your mutations were too large. Small changes, patiently applied.",
        sarah: "This is composition in real time. Khruangbin's songs are basically one motif, developed patiently over 4 minutes. It sounds simple because it is — but simple done well is the hardest thing in music."
      },
      {
        id: "gs-5-7",
        time: 12,
        title: "Tommy Guerrero — Minimal Jazz",
        type: "guitar",
        what: "Fingerpicked single-note lines with jazz passing tones over a groove. Tommy Guerrero's style: minimal, warm, melodic, with chromatic notes that add sophistication without complexity.",
        setup: "Neck pickup. Fingerpicking (no pick). Clean tone, slight reverb.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Play Am pentatonic phrases using only your fingers — thumb and index or thumb, index, middle. Soft dynamics.", why: "Fingerpicking naturally produces a warmer, softer tone than picking. It forces you to play slower and more deliberately." },
          { text: "Add passing tones: between D and E, play D# briefly. Between A and B, play Bb as a quick grace note.", why: "Chromatic passing tones (notes between scale tones, played quickly) add a jazz flavor without requiring jazz theory knowledge." },
          { text: "Keep everything sparse. Khruangbin Style Beat 80 playing. One note every 2-3 beats. Let the groove do the work.", why: "Tommy Guerrero plays fewer notes per minute than almost any guitarist you can name. Every note is a considered choice." },
          { text: "Create a short melody (8-12 notes) using pentatonic notes with 2-3 chromatic passing tones. Loop it.", why: "A looped minimal melody with passing tones is a complete Tommy Guerrero composition. Simplicity is the style." },
          { text: "Vary the dynamics: some notes barely audible, others slightly louder. Never play hard. The loudest note should be your normal softest.", why: "Dynamic range within a whisper is the ultimate expression of control. This is anti-shredding — every calorie of energy is meaningful." }
        ],
        feel: "This should feel like a warm conversation at low volume — intimate, unhurried, and slightly jazzy without being intellectual. It's music for headphones at midnight.",
        wrong: "If you're playing too many notes, strip away half of them. If the passing tones sound forced or academic, make them shorter — grace notes, not featured notes. If your tone is bright, move the picking hand closer to the neck.",
        sarah: "Tommy Guerrero is a pro skateboarder who taught himself guitar. His playing has the grace of skating — flow, momentum, and an effortless quality that takes years to develop.",
        volumeMeter: true
      },
      {
        id: "gs-5-8",
        time: 12,
        title: "Khruangbin Reference — Evan Finds the Third Room",
        type: "guitar",
        what: "Study the Khruangbin approach: a short signature riff, lots of space, slight variation on each repeat, everything behind the beat. Reference 'Evan Finds the Third Room' as the template.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Create a short riff — 4-5 notes with a distinctive rhythm. Think of it as a signature that identifies the 'song.' Play it with soft attack.", why: "Khruangbin songs are built on one riff. The riff IS the song. Everything else is variation on it." },
          { text: "Play your riff. Leave 4-8 beats of silence. Play a variation — same rhythm, one note different. Silence again.", why: "The silence-variation-silence pattern is exactly how Khruangbin structures their guitar parts. Space frames each statement." },
          { text: "Khruangbin Style Beat 80 playing. Place every note behind the beat. The riff should feel like it's settling into the groove, not driving it.", why: "Khruangbin's guitar never leads — it follows the bass and drums, sitting slightly behind, like a shadow." },
          { text: "Over 5 minutes, develop the riff through tiny mutations. End with a version that's recognizably related to the original but distinctly different.", why: "This is motif development in real time — the live version of what Khruangbin does in the studio." },
          { text: "Add one global pentatonic flavor — a desert bend, a blues lick, or a Middle Eastern approach note — as a brief departure before returning to the riff.", why: "Khruangbin's music spans the globe. Brief stylistic departures within a song are their signature move." }
        ],
        feel: "This should feel cinematic — a soundtrack to a scene that hasn't been filmed. The riff is the theme. The variations are the story. The space is the atmosphere.",
        wrong: "If you're playing too much, you're not Khruangbin yet. If the riff isn't distinctive, it won't survive variation — make it more melodic or rhythmically unique. If everything is on the beat, push it all slightly back.",
        sarah: "Khruangbin makes guitar music for people who don't normally listen to guitar music. Their secret is restraint. They play 10% of what they could play, and that 10% is chosen with extraordinary care."
      },
      {
        id: "gs-5-9",
        time: 5,
        title: "Self-Check: Record and Count Silence",
        type: "guitar",
        recorder: true,
        what: "Record 2 minutes of improv. Then listen back and count: how many seconds of silence vs how many seconds of playing? Target: 40% or more silence.",
        steps: [
          { text: "Hit record. Improvise for 2 minutes using everything from Level 5: soft attack, behind the beat, space, global flavors.", why: "This is a test of whether Level 5's principles have been internalized or just understood intellectually." },
          { text: "Stop recording. Now listen back with a stopwatch. Every time you hear silence (no notes ringing), start timing. Add up total silence.", why: "Counting silence objectively measures what your subjective experience can't. Most players think they leave lots of space — the recording often says otherwise." },
          { text: "Calculate your silence percentage: silence seconds / 120 total seconds. Target is 40% or more (48+ seconds of silence).", why: "40% silence means you're playing for about 72 seconds in 2 minutes. That's still a lot of notes — but framed by meaningful space." },
          { text: "If you're below 40%, record again. This time, actively resist the urge to play. Silence is the exercise, not the pause between exercises.", why: "Repeatedly measuring and adjusting is how you recalibrate your instincts. Your default 'enough space' setting needs to shift." }
        ],
        feel: "When you hit 40%+ silence and the recording sounds good — not empty, but spacious — you've internalized the Khruangbin philosophy. Notes are events, not a stream.",
        wrong: "If you're at 10-20% silence, you're still playing like a normal guitarist. Not wrong in general, but not the Level 5 aesthetic. If you're at 70%+ silence, make sure the notes you DO play are meaningful.",
        sarah: "Most guitarists' instinct is to fill space. Khruangbin's instinct is to create space. Flipping that instinct is the graduation exam for Level 5.",
        levelUp: "Your improv recordings consistently hit 40%+ silence and the music sounds better for it — spacious, intentional, and compelling."
      },
      {
        id: "gs-5-10",
        time: 15,
        title: "Space Session",
        type: "guitar",
        recorder: true,
        what: "Extended 15-minute jam with maximum restraint. Every note must earn its place. Soft attack, behind the beat, global flavors, motif development, and silence as your primary instrument.",
        setup: "Record yourself. Neck pickup. Clean tone. Warm reverb.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Khruangbin Style Beat 80 playing. Listen for 16 beats before playing a single note. Let the groove establish itself without you.", why: "Starting with extended listening sets the intention: you are joining the music, not creating it." },
          { text: "Play one note. Let it ring until it fades. Then play another. For the first 3 minutes, never play more than one note at a time.", why: "Single notes with full decay is the most restrained form of playing. It forces you to make each note count." },
          { text: "Develop a motif from minutes 3-8. Start with 3 notes, evolve slowly. Use all your global flavors — blues, desert, Eastern.", why: "The middle section is where motif development happens. Tiny mutations over 5 minutes create a journey." },
          { text: "Minutes 8-12: your most expressive playing. Still spacious, but allow yourself slightly more density. Add chromatic passing tones, behind-the-beat phrasing, dynamic variation.", why: "Even the climax of a Khruangbin-style piece is restrained by most standards. More expression, not more notes." },
          { text: "Minutes 12-15: return to single notes. Deconstruct the motif back to its simplest form. End on one sustained note that fades to silence.", why: "The return to simplicity creates symmetry with the opening. The piece breathes out and dissolves." }
        ],
        feel: "This should feel like the most mature playing you've done in the entire curriculum. Every note is a decision. Every silence is intentional. You're not showing off — you're communicating. When it's working, it feels effortless and profound.",
        wrong: "If you filled the 15 minutes with nonstop playing, Level 5 hasn't clicked yet. If the silence felt awkward instead of musical, you need more practice trusting the space. If every phrase sounded the same, incorporate more global flavors.",
        sarah: "This is the summit of the first 5 levels. You started with scales and bends — now you're making music where silence matters as much as sound. That's not just guitar technique. That's artistic maturity.",
        levelUp: "You can sustain a 15-minute session where restraint feels natural, space feels musical, and every note serves the whole. Your playing has a voice — quiet, global, and unmistakably yours."
      }
    ]
  },

  // ── Level 6: Cinematic Guitar ──────────────────────────────────────
  {
    level: 6,
    title: "Cinematic Guitar",
    subtitle: "Hermanos Gutierrez · Morricone · Reverb as Instrument",
    description: "Reverb becomes your instrument. Tremolo becomes your voice. You'll learn to build cinematic soundscapes — arpeggios that hang in the air, dynamics that tell stories, and the Spaghetti Western drama that makes Hermanos Gutierrez unforgettable.",
    artists: "Hermanos Gutierrez, Ennio Morricone, Wander & Mélodie",
    unlocks: "Minor arpeggios, tremolo effect, cinematic dynamics, Phrygian mode, two-guitar arranging, scene scoring",
    exercises: [
      {
        id: "gs-6-1",
        time: 8,
        title: "Minor Arpeggios",
        type: "guitar",
        what: "Play Am, Dm, and Em as broken arpeggios — one note at a time, letting each note ring into the next. This is the foundation of cinematic guitar: chords dissolved into melody.",
        steps: [
          { text: "Play Am arpeggio: A-C-E, one note per beat at 70 BPM. Let each note sustain and overlap with the next. Use your fingers, not a pick.", why: "Finger plucking gives you dynamic control over each note. The overlapping sustain creates the lush, reverb-friendly sound that defines cinematic guitar." },
          { text: "Move to Dm arpeggio: D-F-A, same approach. Then Em: E-G-B. Spend 2 minutes on each chord.", why: "These three minor chords form the harmonic backbone of most cinematic guitar music. Mastering them as arpeggios gives you a melodic vocabulary." },
          { text: "Connect all three: Am→Dm→Em, arpeggiated, no gaps between chords. The last note of one chord leads into the first note of the next.", why: "Smooth transitions between arpeggiated chords create the flowing, continuous sound that makes cinematic guitar feel like a soundtrack rather than a chord progression." },
          { text: "Add reverb if you have it. Even a little room reverb transforms these arpeggios. If no reverb, let the notes ring as long as possible.", why: "Reverb is the secret ingredient of this entire level. It turns simple arpeggios into atmospheric landscapes." }
        ],
        feel: "Each note should feel like dropping a pebble into still water — the ripples spread and overlap. Your playing should sound bigger than one guitar.",
        wrong: "If the notes sound clipped or staccato, you're muting too early. If it sounds muddy, slow down and let fewer notes overlap at once.",
        sarah: "Hermanos Gutierrez build entire songs from simple arpeggios drenched in reverb. The magic isn't complexity — it's letting each note breathe.",
        volumeMeter: true,
        metronome: 70,
        levelUp: "You can play all three minor arpeggios with smooth, overlapping sustain and seamless transitions between chords."
      },
      {
        id: "gs-6-2",
        time: 8,
        title: "Arpeggio Positions",
        type: "guitar",
        what: "Play the same Am, Dm, and Em arpeggios in three different positions across the neck. This unlocks the fretboard for cinematic playing — same chords, different textures.",
        steps: [
          { text: "Play Am arpeggio in open position (frets 0-3), then at the 5th fret, then at the 12th fret. Notice how the tone changes — brighter up high, warmer down low.", why: "Different positions give you different tonal colors. A cinematic guitarist chooses position based on the mood they want, not just convenience." },
          { text: "Do the same for Dm and Em. Find at least two comfortable positions for each besides the open voicing.", why: "Expanding your arpeggio vocabulary across the neck means you're never stuck in one tonal range. This is essential for building dynamic arrangements." },
          { text: "Play a slow progression: Am (open) → Dm (5th fret) → Em (7th fret). Move up the neck as you progress through the chords.", why: "Moving up the neck during a progression creates a natural sense of rising tension — a cinematic trick that Hermanos Gutierrez use constantly." },
          { text: "Reverse it: start high on the neck and work down. Notice how descending feels like resolution.", why: "Ascending = tension, descending = release. This physical movement on the neck maps directly to emotional storytelling in music." }
        ],
        feel: "You should feel the neck as a map of moods — low and warm on the left, bright and intense on the right. Moving between positions should feel like changing camera angles.",
        wrong: "If you can only play arpeggios in open position, you're stuck in one color. If the transitions between positions are jerky, slow down and plan your hand movements.",
        sarah: "Think of the fretboard as a film set. Open position is the wide establishing shot. High frets are the close-up. Move between them to tell your story."
      },
      {
        id: "gs-6-3",
        time: 10,
        title: "Tremolo Effect Phrasing",
        type: "guitar",
        what: "Learn tremolo phrasing — sustained notes that pulse rhythmically. If you have a tremolo pedal, use it. If not, simulate with even volume swells using your picking hand.",
        setup: "Tremolo pedal if available. If not, no extra gear needed.",
        steps: [
          { text: "Hold a single note (A on the 5th fret of the high E string). Pick it once and let it sustain. If you have tremolo, engage it and listen to the pulsing effect.", why: "Tremolo turns a static sustained note into something alive and breathing. It's the signature sound of Spaghetti Western and cinematic guitar." },
          { text: "Without a pedal: pick the note with rapid, even up-down strokes at a consistent volume. Aim for a smooth, wave-like pulse rather than aggressive attack.", why: "Manual tremolo picking is a classical technique that predates pedals. It builds right-hand control and works on any guitar." },
          { text: "Play a simple melody: A-C-E-A (Am arpeggio ascending). Hold each note for 2 beats with tremolo. The melody should float.", why: "Tremolo transforms simple melodies into cinematic statements. Each note gets weight and presence it wouldn't have with a single pick stroke." },
          { text: "Experiment with tremolo speed: slow pulse (quarter notes), medium (eighth notes), fast (sixteenths). Each creates a different mood.", why: "Slow tremolo feels dreamy and vast. Fast tremolo feels urgent and dramatic. Controlling the speed gives you emotional range." }
        ],
        feel: "The notes should feel like they're hovering in the air, pulsing with life. Your picking hand should be relaxed and even — not tense or choppy.",
        wrong: "If the volume swells are uneven or the tremolo sounds like frantic picking, slow down. If there's no sense of pulse, focus on rhythmic consistency.",
        sarah: "Tremolo is what makes a single guitar sound like an orchestra. Ennio Morricone built entire soundtracks on this one effect."
      },
      {
        id: "gs-6-4",
        time: 10,
        title: "Two-Guitar Thinking",
        type: "guitar",
        recorder: true,
        what: "Record a simple Am→G fingerpicked rhythm part, then play minor arpeggio melodies over it. This teaches you to think in layers — rhythm and lead as separate voices.",
        setup: "Phone or looper to record yourself.",
        tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
        steps: [
          { text: "Put on the Cinematic Western Beat 80. Record a simple fingerpicked pattern: Am (4 beats) → G (4 beats), repeating. Keep it steady and hypnotic. This is your rhythm guitar track.", why: "Hermanos Gutierrez are a duo — one guitar lays the foundation while the other plays melody. You need to create both parts to understand how they interlock." },
          { text: "Play back your recording. Over it, play slow Am arpeggio melodies — single notes that weave around the chord tones you hear underneath.", why: "Playing over yourself forces you to listen differently. You become both the rhythm section and the soloist, which develops your ear for arrangement." },
          { text: "Try contrasting your lead with the rhythm: when the rhythm is busy, play fewer notes. When the rhythm is simple, add more melody.", why: "Good two-guitar arrangements breathe — the parts give each other space. This push-pull dynamic is what makes Hermanos Gutierrez arrangements compelling." },
          { text: "Switch roles: record an arpeggio melody, then play rhythm chords over it. Notice how the same music feels different depending on which part you focus on.", why: "Understanding both roles makes you a better collaborator and a better solo arranger. Every part serves the whole." }
        ],
        feel: "You should feel like you're having a conversation with yourself — the recorded part speaks, and your live part responds. It should feel collaborative, not competitive.",
        wrong: "If your lead drowns out the rhythm, play more quietly. If both parts sound like the same thing, make the lead more melodic and the rhythm more percussive.",
        sarah: "This is how you start thinking like a band instead of a solo player. Even when you're alone, you can create music that sounds like two people playing."
      },
      {
        id: "gs-6-5",
        time: 10,
        title: "Phrygian for Drama",
        type: "guitar",
        what: "Learn Am Phrygian: A-Bb-C-D-E-F-G. The b2 (Bb) is the key color — it creates tension, mystery, and drama. Use it sparingly for maximum impact.",
        steps: [
          { text: "Play the Am Phrygian scale ascending and descending: A-Bb-C-D-E-F-G-A. Notice the half step between A and Bb — that's the dramatic interval.", why: "The b2 is what separates Phrygian from natural minor. That one note transforms the mood from sad to dramatic, from Western to Spaghetti Western." },
          { text: "Play Am natural minor (A-B-C-D-E-F-G), then Phrygian (A-Bb-C-D-E-F-G). Go back and forth. Feel how the Bb darkens everything.", why: "Comparing the two scales trains your ear to hear the Phrygian color. You need to know what it adds so you can deploy it intentionally." },
          { text: "Create a short melody that starts on A, touches the Bb briefly, and resolves back to A. The Bb should feel like a shadow passing over the sun.", why: "Phrygian is most powerful when used sparingly. A single Bb in the right place creates more drama than playing the entire scale up and down." },
          { text: "Improvise over an Am chord using mostly natural minor notes, but drop in the Bb at moments of tension. Think of it as a spice, not the main ingredient.", why: "Overusing the b2 makes it sound like an exercise. Using it at dramatic moments makes it sound like Morricone." }
        ],
        feel: "The Bb should feel like a plot twist — unexpected, dramatic, and meaningful. The rest of your playing provides the context that makes it powerful.",
        wrong: "If everything sounds 'Arabic' or 'Spanish,' you're overusing the Bb. If it just sounds like minor, you're not landing on the Bb with enough intention.",
        sarah: "Phrygian is the scale of drama queens — and I mean that as a compliment. One well-placed Bb is worth more than a hundred fast runs.",
        fretboard: { scale: "a-phrygian", position: 1 }
      },
      {
        id: "gs-6-6",
        time: 10,
        title: "Cinematic Dynamics",
        type: "guitar",
        what: "Master extreme dynamic control: play very quietly for 8 bars, swell to full volume for 4 bars, then drop back to near-silence. This is how cinematic guitarists build and release tension.",
        tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
        steps: [
          { text: "Put on the Cinematic Western Beat 80. Play a simple Am arpeggio pattern as quietly as you possibly can for 8 bars. Your pick or fingers should barely touch the strings. Aim for a whisper.", why: "Extreme quiet is harder than loud. It requires precise control of your picking hand and builds the foundation for dynamic contrast." },
          { text: "Over the next 4 bars, gradually increase volume to your full, resonant tone. The swell should be smooth and continuous, not sudden.", why: "A gradual crescendo creates anticipation and emotional weight. It's the cinematic equivalent of a slow zoom-in — the audience leans forward." },
          { text: "At the peak, hold full volume for just 2 bars, then drop immediately back to near-silence. The contrast should be dramatic.", why: "The sudden drop after a crescendo is one of the most powerful tools in cinematic music. It creates a moment of stunned silence that resonates emotionally." },
          { text: "Repeat the entire cycle 3 times. Each time, try to make the quiet sections quieter and the loud sections more powerful.", why: "Expanding your dynamic range is like expanding your emotional vocabulary. The wider the range, the more stories you can tell." }
        ],
        feel: "The quiet sections should feel intimate and fragile. The loud sections should feel powerful and inevitable. The transitions should feel like breathing — natural and connected.",
        wrong: "If your quiet sections are still pretty loud, work on reducing your picking force. If the transitions are abrupt instead of smooth, slow down the swell.",
        sarah: "Dynamics are the most underrated tool in guitar. Most players have two settings: on and off. You're learning to use the entire spectrum.",
        volumeMeter: true
      },
      {
        id: "gs-6-7",
        time: 12,
        title: "Spaghetti Western Lick",
        type: "guitar",
        what: "Learn a Morricone-inspired melody: minor key, tremolo picking, dramatic pauses. This is where all the cinematic tools come together into one iconic sound.",
        tracks: [{ name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
        steps: [
          { text: "Play this melodic contour in Am: start on E (high string, open), bend up to F, release back to E, slide down to C, pause. This descending minor phrase is pure Morricone.", why: "Morricone melodies are simple — often just 4-5 notes. The power comes from HOW you play them: slowly, with tremolo, with dramatic pauses between phrases." },
          { text: "Put on the Cinematic Western Beat 80 and add tremolo to the sustained notes. Hold the E with tremolo for 2 beats before bending to F. Hold the C with tremolo at the end. Let the pauses be long.", why: "Tremolo on sustained notes creates the classic Spaghetti Western sound. The pauses between phrases are as important as the notes — they create tension." },
          { text: "Play the lick with full dynamic contrast: start quietly, swell on the bend, drop to silence on the pause. The dynamics tell the story.", why: "A Morricone lick without dynamics is just notes. Adding the crescendo on the bend and the sudden silence makes it cinematic." },
          { text: "Add the Phrygian Bb: after the pause on C, add a slow Bb-A resolution. This is your dramatic ending — the shadow resolving into the tonic.", why: "The Phrygian b2 resolving to the root is the most dramatic cadence in cinematic guitar. It's the musical equivalent of a showdown at high noon." },
          { text: "Play the complete lick 3 times, each time with slightly different timing and dynamics. No two takes should be identical.", why: "Morricone's musicians never played a melody exactly the same way twice. The subtle variations are what make it feel alive rather than mechanical." }
        ],
        feel: "You should feel like you're scoring a film scene — every note has purpose, every pause has meaning. The guitar should sound lonely, dramatic, and vast.",
        wrong: "If it sounds like a scale exercise, you're playing too many notes too fast. If the pauses feel awkward, lean into them — they're the most cinematic part.",
        sarah: "This lick is your audition for an imaginary Sergio Leone film. Play it like the camera is slowly zooming in on your face."
      },
      {
        id: "gs-6-8",
        time: 12,
        title: "Cinematic over Surf Rock",
        type: "guitar",
        what: "Combine your arpeggio melodies and tremolo phrasing over a surf rock backing track. The energy of surf meets the atmosphere of cinema.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
        steps: [
          { text: "Start with Surf Rock Beat 120. Play minor arpeggios (Am, Dm, Em) over the beat. Let the arpeggios float above the driving rhythm.", why: "The contrast between the urgent surf beat and the floating arpeggios creates tension. This is the Hermanos Gutierrez formula — cinematic melodies over rhythmic drive." },
          { text: "Add tremolo to your sustained notes. Hold notes for 2 beats with tremolo while the surf beat drives underneath. The tremolo should pulse against the beat.", why: "Tremolo over a driving beat creates a hypnotic, layered effect. Your sustained notes become a second rhythm that interacts with the drum pattern." },
          { text: "Use Phrygian Bb for dramatic moments. Drop it in once or twice during the jam — at the end of a phrase or during a pause.", why: "The Phrygian color over surf rock creates the Spaghetti Western surf fusion that Hermanos Gutierrez are known for." },
          { text: "Build a dynamic arc: start sparse and quiet, build to full arpeggios with tremolo, then strip back to a single tremolo note over the beat. Try switching between the Cinematic Western Beat 80 and Surf Rock Beat 120 to feel how both energies work.", why: "Even over an energetic backing track, your playing should tell a story with a beginning, middle, and end." }
        ],
        feel: "It should feel like driving through the desert at sunset with the windows down — the surf beat is the engine, your arpeggios are the scenery passing by.",
        wrong: "If your playing fights the beat instead of floating over it, simplify. If it sounds like generic soloing, go back to arpeggios and tremolo — those are your cinematic tools.",
        sarah: "This is where cinematic guitar stops being an exercise and starts being a style. You're not just playing over a beat — you're creating a world."
      },
      {
        id: "gs-6-9",
        time: 15,
        title: "Score a Scene",
        type: "guitar",
        what: "Imagine a 3-act scene: calm opening, tension building, resolution. No backing track — just you, your guitar, and your cinematic vocabulary. Create a 5-minute mini-soundtrack.",
        steps: [
          { text: "Act 1 (0-2 min): Set the scene. Quiet, sparse arpeggios in Am. Open position, lots of reverb, lots of space. Establish the mood — think sunrise over empty desert.", why: "Every film score starts with atmosphere. Your job is to create a sense of place with minimal notes. This is where your dynamic control from exercise 6 pays off." },
          { text: "Act 2 (2-4 min): Build tension. Move up the neck to higher positions. Introduce the Phrygian Bb. Add tremolo. Let the dynamics swell. Something is coming.", why: "Rising pitch, new harmonic colors, and increasing volume all signal rising tension. The audience should feel that something important is about to happen." },
          { text: "Act 3 (4-5 min): Resolution. A final dramatic phrase — your Spaghetti Western lick or something inspired by it. Then a slow descent back to quiet. End on a single, sustained A with tremolo fading to silence.", why: "The resolution should feel earned — all the tension of Act 2 pays off in one powerful moment, then dissolves. The ending silence is part of the music." },
          { text: "Listen back if you recorded it. Does it feel like a story? Can you hear the three acts? Would it work behind a scene in a film?", why: "Self-evaluation is how you develop artistic judgment. You're not just practicing technique — you're learning to compose and arrange in real time." }
        ],
        feel: "This should feel like directing a short film with your guitar. You're not playing songs — you're creating atmosphere, tension, and release. Every section serves the narrative.",
        wrong: "If it sounds like three separate exercises stitched together, work on smoother transitions. If there's no dynamic contrast between acts, exaggerate the differences.",
        sarah: "This is the graduation exercise for cinematic guitar. You started Level 6 with single arpeggios — now you're scoring imaginary films. That's real artistic growth.",
        volumeMeter: true,
        levelUp: "You can create a convincing 3-act musical narrative with clear dynamic contrast, Phrygian drama, and tremolo atmosphere. Your guitar tells stories."
      }
    ]
  },

  // ── Level 7: Psych Fuzz & Jangle ──────────────────────────────────
  {
    level: 7,
    title: "Psych Fuzz & Jangle",
    subtitle: "Mystic Braves · BALTHVS · Allah-Las · Sun Room",
    description: "60s psychedelic revival meets indie jangle. You'll learn the shimmering open-string voicings, the Phrygian Dominant 'Arabic' color, fuzz-driven soloing, and the garage rock energy that powers bands like Mystic Braves and BALTHVS.",
    artists: "Mystic Braves, BALTHVS, Allah-Las, Sun Room, Tame Impala",
    unlocks: "Sus2/add9 voicings, open string shimmer, Phrygian Dominant, fuzz tone soloing, jangle progressions, psych riff writing",
    exercises: [
      {
        id: "gs-7-1",
        time: 8,
        title: "Jangle Voicings — Sus2 & Add9",
        type: "guitar",
        what: "Learn the chord voicings that define jangle guitar: Dsus2, Aadd9, Csus2. These shapes leave open strings ringing against fretted notes, creating a shimmering, bell-like quality.",
        steps: [
          { text: "Play Dsus2: xx0230. Strum slowly and listen to how the open D and high E ring together. Compare to a standard D major — the sus2 is more open and dreamy.", why: "Sus2 chords remove the third, creating an ambiguous sound that's neither major nor minor. This ambiguity is the foundation of jangle guitar." },
          { text: "Play Aadd9: x02200. The open B string adds the 9th. Let all the open strings ring. Compare to standard A — the add9 has a sparkling quality.", why: "Add9 chords keep the third but add the 9th on top. This creates a richer, more complex sound that shimmers with overtones." },
          { text: "Play Csus2: x30030 (or x30010). The open strings create a wide, chimey voicing. Experiment with which open strings you include.", why: "Jangle guitar is all about finding voicings where open strings create unexpected intervals. Each voicing is a little discovery." },
          { text: "Strum all three in sequence: Dsus2→Aadd9→Csus2. Use a light, even strumming pattern. Let every chord ring for a full bar before changing.", why: "The progression should shimmer and flow. Light strumming keeps the open strings ringing and preserves the jangle quality." }
        ],
        feel: "Your guitar should sound like a bell choir — bright, ringing, and spacious. The open strings should create a halo of overtones around each chord.",
        wrong: "If the chords sound muddy, you're strumming too hard or muting strings. If they sound thin, check that all the open strings are ringing clearly.",
        sarah: "Jangle guitar is about finding the magic in simple shapes. One open string can transform a boring chord into something transcendent."
      },
      {
        id: "gs-7-2",
        time: 8,
        title: "Open String Shimmer",
        type: "guitar",
        what: "Use partial barre chords while leaving the high E and B strings open. This creates a shimmering effect where the fretted notes change but the open strings remain constant.",
        steps: [
          { text: "Barre the A and D strings at the 2nd fret (B and E notes) while leaving E, B, G strings open. Strum all strings. This creates a rich, ambiguous voicing.", why: "The constant open strings become a drone that the moving bass notes play against. This drone effect is central to shoegaze and psych jangle." },
          { text: "Move the barre to the 4th fret, then 5th, then 7th. The open strings stay the same while the bass moves. Listen to how the mood shifts with each position.", why: "Each fret position creates a different interval against the open strings. Some are consonant and warm, others are dissonant and tense. All are useful." },
          { text: "Create a simple progression by moving between 3 positions. Strum each for 2 bars with a steady eighth-note pattern.", why: "This technique generates complex harmony from simple movements. You're creating sophisticated voicings with minimal effort." },
          { text: "Experiment with arpeggiation: instead of strumming, pick through the strings one at a time. The open strings ring between the fretted notes.", why: "Arpeggiated shimmer voicings are the secret weapon of bands like Allah-Las and Sun Room. Each picked note adds to the sustained wash of sound." }
        ],
        feel: "It should feel like you're playing through a prism — one simple shape creates a rainbow of overtones. The open strings should sing independently of your fretted notes.",
        wrong: "If the open strings are buzzing or dead, check your hand position. If it sounds too dissonant, try positions where the fretted notes are consonant with E and B (like frets 2, 5, 7).",
        sarah: "This technique is why jangle guitarists can make a $100 guitar sound like a cathedral organ. It's not about the gear — it's about the voicings."
      },
      {
        id: "gs-7-3",
        time: 10,
        title: "Phrygian Dominant",
        type: "guitar",
        what: "Learn Phrygian Dominant: 1-b2-3-4-5-b6-b7. This is the scale behind BALTHVS, Misirlou, and the 'Arabic' or 'Egyptian' color in surf and psych rock. The major 3rd against the b2 creates exotic tension.",
        steps: [
          { text: "Play A Phrygian Dominant: A-Bb-C#-D-E-F-G. Compare to A Phrygian (A-Bb-C-D-E-F-G). The only difference is C# instead of C — but it changes everything.", why: "The major 3rd (C#) against the b2 (Bb) creates an augmented 2nd interval — that's the exotic, 'Arabic' sound. It's what makes Misirlou sound the way it does." },
          { text: "Play the scale slowly, emphasizing the Bb-C# interval. Go back and forth between those two notes. That interval IS the sound of Phrygian Dominant.", why: "Training your ear on this specific interval lets you deploy it intentionally. Once you hear it, you'll recognize it in dozens of surf and psych songs." },
          { text: "Create a simple riff using A-Bb-C#-D. Just those 4 notes, repeated in different rhythms. This is the BALTHVS/surf formula.", why: "Limitation breeds creativity. Most iconic Phrygian Dominant riffs use only 4-5 notes. The scale's exotic color does the heavy lifting." },
          { text: "Play the riff with intensity — hard picking, aggressive attack. Phrygian Dominant demands energy. This isn't a gentle scale.", why: "This scale sounds best when played with conviction. The augmented 2nd interval needs confident delivery to sound intentional rather than accidental." }
        ],
        feel: "The scale should feel dangerous and exciting — like a snake charmer's melody or a Dick Dale surf break. The Bb-C# interval should give you chills.",
        wrong: "If it sounds like regular minor, you're not emphasizing the C#. If it sounds random, focus on the A-Bb-C#-D core. If it sounds timid, play harder.",
        sarah: "Phrygian Dominant is the scale that launched a thousand surf songs. Once you have it under your fingers, you'll hear it everywhere — and you'll be able to play it anywhere.",
        fretboard: { scale: "a-phrygian-dominant", position: 1 }
      },
      {
        id: "gs-7-4",
        time: 10,
        title: "Fuzz Tone Soloing",
        type: "guitar",
        what: "Learn to solo with fuzz or overdrive. Gain changes everything — notes sustain longer, bends sing more, and your attack matters differently. If you have a drive pedal, use it. If not, pick harder and closer to the bridge.",
        setup: "Overdrive or fuzz pedal if available.",
        steps: [
          { text: "Play a simple Am pentatonic phrase clean, then with gain. Notice how the sustain changes — notes hold longer, bends are easier to control, and the tone is thicker.", why: "Fuzz and overdrive compress your signal, extending sustain and adding harmonics. This changes what's musically possible — you can hold notes that would die clean." },
          { text: "Practice long, sustained bends with gain. Bend the G string at the 7th fret up a whole step and hold it. With fuzz, the note should sing and sustain.", why: "Long, singing bends are the signature move of psych rock soloing. The sustain from gain lets you hold bends that would be impossible on a clean tone." },
          { text: "Play fewer notes with more intensity. With gain, one powerful note can fill more space than ten quiet ones. Leave gaps. Let the sustain do the work.", why: "Gain amplifies everything — including your mistakes. Playing fewer notes with more intention sounds better than playing many notes sloppily." },
          { text: "Experiment with feedback: with enough gain, holding your guitar near the amp creates controlled feedback. A single sustained note can bloom into a singing, overtone-rich sound.", why: "Controlled feedback is a psych rock texture. It's not noise — it's an instrument. Learning to control it gives you another expressive tool." }
        ],
        feel: "Your guitar should feel alive — notes sustain indefinitely, bends sing, and the tone is thick and warm. Playing with gain should feel like having superpowers.",
        wrong: "If it sounds like noise, reduce the gain and play fewer notes. If notes are dying quickly even with gain, check your technique — you might be muting strings accidentally.",
        sarah: "Fuzz is a conversation changer. Clean guitar whispers. Fuzz guitar declares. Learn to use that power responsibly — a few great notes beat a hundred sloppy ones."
      },
      {
        id: "gs-7-5",
        time: 10,
        title: "Garage Rock Energy",
        type: "guitar",
        what: "Fast tremolo picking plus fuzz over I-IV-V in minor. Channel the urgency of Mystic Braves — play ON TOP of the beat, lean forward, make it feel like the song is barely in control.",
        tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
        steps: [
          { text: "Put on the Psych Rock Beat 120. Play Am-Dm-Em with aggressive downstrokes, 8th notes. Push slightly ahead of the beat — not sloppy, but urgent. This is garage rock energy.", why: "Playing on top of the beat creates a sense of forward momentum and urgency. It's the opposite of the behind-the-beat feel from earlier levels. Both are tools." },
          { text: "Add tremolo picking on single-note riffs between chord changes. Fast, even, aggressive. Pick near the bridge for a brighter, more cutting tone.", why: "Tremolo picking in this context isn't cinematic — it's raw energy. The same technique from Level 6 becomes a completely different tool at garage rock speed." },
          { text: "Turn up the fuzz. Play power chords (root + 5th only) instead of full chords. Am5→Dm5→Em5. Fewer strings, more power, more grit.", why: "Power chords through fuzz are the foundation of garage psych. Full chords can sound muddy with distortion, but power chords stay tight and punchy." },
          { text: "Build energy by starting with single notes, adding power chords, then full chords. Keep pushing the intensity. This is the Mystic Braves build.", why: "Garage psych songs build from simmering tension to full explosion. Learning to control this build is essential for the style." }
        ],
        feel: "You should feel slightly out of control — like you're riding a wave that's almost too big. The energy should be reckless but rhythmically precise. Controlled chaos.",
        wrong: "If it sounds sloppy, you've crossed from 'urgent' to 'messy.' Slow down until the energy feels intentional. If it sounds polished and safe, you're not pushing hard enough.",
        sarah: "Garage rock is controlled recklessness. The Mystic Braves sound like they might fall apart at any second — but they never do. That's the sweet spot."
      },
      {
        id: "gs-7-6",
        time: 10,
        title: "Jangle Progressions",
        type: "guitar",
        what: "Play Am(add9)→Cmaj7→G→Dsus2. Let every chord ring for a full bar. This is the Sun Room/jangle pop progression — simple chords with complex voicings that shimmer.",
        steps: [
          { text: "Play Am(add9): x02210 with open B string (or x02200). Let it ring for a full bar with light strumming. Count to 4 slowly.", why: "The add9 gives the minor chord a dreamy quality that lifts it out of sadness into something more wistful. This is the jangle pop emotional palette." },
          { text: "Move to Cmaj7: x32000. Same light strumming, full bar. Then G: 320003. Then Dsus2: xx0230. The progression should flow like water.", why: "Each chord in this progression has at least one open string creating overtones. Together they create a continuous shimmer that's the hallmark of jangle pop." },
          { text: "Play the full progression with a steady eighth-note strum pattern. Use a thin pick or your fingers for a lighter, chime-like attack.", why: "Heavy pick attack kills jangle. The lighter your touch, the more the open strings ring and the more the overtones shimmer." },
          { text: "Try the progression with arpeggiation: pick through each chord string by string. The Sun Room approach — each note gets its moment.", why: "Arpeggiated jangle progressions create a more intimate, detailed sound. Each string becomes a separate voice in a choir." }
        ],
        feel: "It should feel effortless and sunny — like the chords are playing themselves. The shimmer should be continuous, with each chord melting into the next.",
        wrong: "If the chords sound clunky or separate, work on smoother transitions. If the shimmer is gone, lighten your strumming and check that open strings are ringing.",
        sarah: "This progression is basically 'Sun Room starter pack.' Simple, beautiful, and endlessly playable. Sometimes the best guitar music is the easiest to play."
      },
      {
        id: "gs-7-7",
        time: 12,
        title: "Psych Riff Writing",
        type: "guitar",
        what: "Write a 2-bar riff using Phrygian Dominant. Repeat as a loop. This is the BALTHVS/Mystic Braves approach — one hypnotic riff that drives an entire song.",
        tracks: [{ name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
        steps: [
          { text: "Choose 4-5 notes from A Phrygian Dominant (A-Bb-C#-D-E). Create a 2-bar rhythmic pattern using just these notes. Make it something you'd want to hear on repeat.", why: "The best psych riffs are hypnotic through repetition. They don't need to be complex — they need to be compelling. Four notes in the right rhythm can be a hit." },
          { text: "Add rhythmic variation: syncopation, ties, rests. A riff with interesting rhythm is more memorable than a riff with interesting notes.", why: "BALTHVS riffs stick in your head because of their rhythm, not just their notes. The groove is what makes a riff addictive." },
          { text: "Put on the Psych Rock Beat 120 and play your riff 8 times in a row. Does it get boring or hypnotic? If boring, simplify. If hypnotic, you've got it. Add slight variations on repeats 6-8.", why: "A good psych riff gets better with repetition — it pulls you in deeper. If it gets worse with repetition, it's too complex or not rhythmically interesting enough." },
          { text: "Try your riff with fuzz/overdrive. Then clean. Then with tremolo. The same riff transforms completely with different tones.", why: "Psych bands often play the same riff through an entire song but change the tone and effects. Learning to manipulate your sound is part of riff writing." }
        ],
        feel: "Your riff should feel like a mantra — something you could play for hours without getting tired of it. It should have a physical groove that makes you nod your head.",
        wrong: "If the riff is too complex to play on repeat without thinking, simplify. If it doesn't make you move, the rhythm needs work. If it sounds generic, lean harder into the Phrygian Dominant color.",
        sarah: "The best psych riffs are embarrassingly simple on paper — but unstoppable in practice. Don't overthink it. Find the groove and commit."
      },
      {
        id: "gs-7-8",
        time: 12,
        title: "Jangle over Surf Rock",
        type: "guitar",
        what: "Play jangle chord arpeggios — sus2, add9, maj7 voicings — over a surf rock beat. The driving rhythm meets the shimmering chords for a psych-surf fusion.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start with Surf Rock Beat 120. Play Dsus2→Aadd9→Csus2→G as arpeggios over the beat. Pick through each chord slowly — one note per eighth note.", why: "The surf beat provides urgency while your arpeggiated jangle chords provide shimmer. This contrast is the sound of bands like Allah-Las and Sun Room." },
          { text: "Vary your arpeggio patterns: ascending, descending, inside-out (middle strings first, then outer). Each pattern creates a different texture over the same chords.", why: "Arpeggio pattern variation keeps the jangle interesting over a repetitive beat. It's how jangle guitarists create movement without changing chords." },
          { text: "Add open-string shimmer voicings from exercise 7-2 between the standard chords. The partial barres create unexpected harmonies against the surf groove.", why: "Mixing standard jangle chords with shimmer voicings creates a richer harmonic palette. The surf beat grounds everything so the harmonic adventuring doesn't feel random." },
          { text: "Build a dynamic arc: start with quiet single-note arpeggios, build to full strummed chords, then return to arpeggios. The beat stays constant — your dynamics tell the story.", why: "Even over an energetic backing track, dynamic variation is essential. Constant volume is the enemy of interesting guitar playing." }
        ],
        feel: "It should feel like sunlight through stained glass — bright, colorful, and constantly shifting. The surf beat drives forward while your chords paint the air above it.",
        wrong: "If it sounds cluttered, play fewer notes per chord. If the jangle disappears into the beat, make sure your open strings are ringing and your attack is light.",
        sarah: "This is where 60s surf meets 60s psych. Same era, different rooms — and now you're opening the door between them."
      },
      {
        id: "gs-7-9",
        time: 5,
        title: "Self-Check: Write a Psych Riff",
        type: "guitar",
        what: "Create one original riff you'd actually play in a song. Use any scale or technique from this level. Record it on your phone. This is your psych calling card.",
        steps: [
          { text: "Take 2 minutes to jam freely with Phrygian Dominant, fuzz, jangle chords — whatever calls to you. Don't try to write. Just play.", why: "The best riffs come from free exploration, not deliberate construction. Your subconscious has been absorbing these sounds all level — let it guide you." },
          { text: "When something catches your ear, isolate it. Play it again. Simplify it until it's a repeatable 2-4 bar phrase. That's your riff.", why: "Capturing musical ideas is a skill. You need to recognize when something sounds good, then refine it before it slips away." },
          { text: "Record it on your phone. Play it 4 times so you can hear how it loops. Save it — you'll use original riffs in Level 9.", why: "Recording your ideas is essential for growth. You'll listen back in a week and hear it with fresh ears — sometimes it's better than you thought, sometimes worse." }
        ],
        feel: "This should feel like a creative breakthrough — you're not just playing other people's scales and patterns anymore. You're making something that's yours.",
        wrong: "If nothing comes, you're thinking too hard. Go back to noodling. If the riff is too complex to remember after 30 seconds, simplify until it sticks.",
        sarah: "Every guitarist has a moment where they stop playing other people's ideas and start creating their own. This exercise is designed to make that happen. Trust your instincts."
      },
      {
        id: "gs-7-10",
        time: 15,
        title: "Psych-Surf Session",
        type: "guitar",
        what: "Extended jam combining everything from Level 7: jangle chords, fuzz leads, Phrygian Dominant sections, surf tremolo. This is the full psych-surf experience.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
        steps: [
          { text: "Start with Surf Rock Beat 120. Open with jangle chord arpeggios — Dsus2, Aadd9, Cmaj7. Establish the shimmering foundation. Play for 3 minutes.", why: "Starting with jangle gives you a foundation to build from. The clean, shimmering sound creates contrast for when the fuzz kicks in later." },
          { text: "Transition to Phrygian Dominant riffing over the Psych Rock Beat 120. Add fuzz if you have it. The mood should shift from sunny jangle to dark, exotic psych. Play for 4 minutes.", why: "The stylistic shift from jangle to Phrygian psych is the kind of mid-song transformation that makes psych rock exciting. Practice making this transition smooth." },
          { text: "Build to the climax: garage rock energy, fast tremolo picking, power chords. Play ON TOP of the beat. Push the intensity for 4 minutes.", why: "The climax should feel like the song has been building to this moment. All the energy that was shimmer and mystery becomes raw power and urgency." },
          { text: "Cool down: return to jangle arpeggios, reduce volume, let the open strings ring. End quietly, the way you started. The circle closes.", why: "Returning to the opening mood creates a satisfying arc. The quiet ending after the climax is more powerful than ending at full volume." }
        ],
        feel: "This should feel like performing a complete psych-surf song — with a beginning, middle, climax, and resolution. 15 minutes of total immersion in the style.",
        wrong: "If all 15 minutes sound the same, you need more contrast between sections. If the transitions are jarring, spend more time on the handoffs between styles.",
        sarah: "This is your Level 7 graduation gig. You're playing a full set — jangle pop opening act, psych rock headliner, ambient encore. You are the festival.",
        levelUp: "You can sustain a 15-minute psych-surf jam with clear sections, stylistic contrasts, and a satisfying arc. Jangle, Phrygian, and fuzz are all in your toolkit."
      }
    ]
  },

  // ── Level 8: Extended Chords & Soul ────────────────────────────────
  {
    level: 8,
    title: "Extended Chords & Soul",
    subtitle: "BALTHVS · Skinshape · Khruangbin · Sophisticated Voicings",
    description: "The sophisticated voicings. You'll learn Dorian mode, major 7ths, dominant 9ths, minor 9ths and 11ths — the chords that make Khruangbin and BALTHVS sound effortlessly cool. Ghost notes meet extended harmony for the deepest grooves yet.",
    artists: "BALTHVS, Skinshape, Khruangbin, D'Angelo, Erykah Badu",
    unlocks: "Dorian mode, maj7/9th/11th voicings, extended chord progressions, soul-funk rhythm, ghost note + extended chord fusion",
    exercises: [
      {
        id: "gs-8-1",
        time: 8,
        title: "Dorian Mode — The Soul Scale",
        type: "guitar",
        what: "Learn A Dorian: A-B-C-D-E-F#-G. It's a minor scale with a raised 6th — the F# adds warmth without darkness. This is the scale of soul, funk, and Khruangbin's melodic vocabulary.",
        steps: [
          { text: "Play A natural minor: A-B-C-D-E-F-G. Then A Dorian: A-B-C-D-E-F#-G. The only difference is F# instead of F. Play them back to back.", why: "The raised 6th (F#) is what separates Dorian from natural minor. It makes minor feel hopeful instead of sad — warm instead of cold." },
          { text: "Improvise with A Dorian over an Am chord. Emphasize the F# — land on it, hold it, resolve from it to E or G. Feel how it colors everything.", why: "The F# is the Dorian fingerprint. If you're not using it intentionally, you're just playing minor. Learning to feature it is the key to the Dorian sound." },
          { text: "Compare Dorian phrases to Pentatonic phrases. Play A minor pentatonic (A-C-D-E-G), then add the B and F# from Dorian. Notice how the added notes create more melodic options.", why: "Dorian is pentatonic plus two notes. Thinking of it this way makes it less intimidating — you already know most of the scale." },
          { text: "Play a Dorian melody that sounds like it could be a Khruangbin bass line: simple, repetitive, groove-oriented. Use the F# as a recurring color note.", why: "Khruangbin's Mark Speer uses Dorian constantly. His melodies are simple and repetitive — the F# provides just enough harmonic interest to keep them compelling." }
        ],
        feel: "Dorian should feel warm, groovy, and slightly jazzy. It's minor without the melancholy — like a sunset instead of a rainy day.",
        wrong: "If it sounds identical to minor pentatonic, you're not using the F# enough. If it sounds jazzy in a confusing way, simplify your phrases and focus on groove.",
        sarah: "Dorian is the Goldilocks scale — it's minor enough to have depth, but warm enough to make people move. It's the reason soul music feels the way it does.",
        fretboard: { scale: "a-dorian", position: 1 }
      },
      {
        id: "gs-8-2",
        time: 8,
        title: "Major 7th Voicings",
        type: "guitar",
        what: "Learn Cmaj7, Fmaj7, and Gmaj7 in moveable forms. These chords add a dreamy, sophisticated quality to any progression — the sound of late-night soul and neo-funk.",
        steps: [
          { text: "Play Cmaj7: x32000. Then play a regular C major: x32010. Hear the difference — the maj7 has a floating, unresolved quality. The B note (7th) wants to go somewhere but doesn't.", why: "Major 7th chords are 'pretty' in a complex way. The 7th creates a gentle tension that's sophisticated without being dissonant. This tension is what makes jazz and soul harmony feel deep." },
          { text: "Learn Fmaj7: 1x2210 (or xx3210). This shape is moveable — slide it up to become Gmaj7 at the 3rd fret. Practice both.", why: "Moveable shapes are essential for extended chord vocabulary. One shape gives you every major 7th chord on the neck." },
          { text: "Play Cmaj7→Fmaj7→Gmaj7→Cmaj7. Let each chord ring. The progression should feel like sinking into a comfortable chair.", why: "Major 7th progressions create a lush, enveloping sound. This progression is the foundation of countless soul and neo-soul songs." },
          { text: "Try replacing standard major chords in any progression you know with their maj7 versions. Notice how it instantly sounds more sophisticated.", why: "Upgrading triads to 7th chords is the fastest way to make your playing sound more mature. One note changes the entire vibe." }
        ],
        feel: "Major 7th chords should feel luxurious and dreamy — like silk instead of cotton. They're the chords you play when you want music to feel elegant.",
        wrong: "If they sound dissonant or wrong, check your fingering — one muted string can ruin a voicing. If they sound too jazzy, simplify your strumming to let the chord speak.",
        sarah: "Major 7ths are the gateway drug to sophisticated harmony. Once you hear them, regular major chords sound naked by comparison."
      },
      {
        id: "gs-8-3",
        time: 10,
        title: "Dominant 9th Voicings",
        type: "guitar",
        what: "Learn G9, C9, and D9 — the funk chord. Two shapes: root on the 6th string and root on the 5th string. These voicings are the foundation of funk, soul, and R&B guitar.",
        steps: [
          { text: "Play G9: 3x320x (or 320001). This is 'the' funk chord — James Brown, Prince, D'Angelo all live here. Strum it with a sharp, percussive attack.", why: "Dominant 9th chords combine the drive of a dominant 7th with the color of the 9th. They're punchy enough for rhythm playing but complex enough for soul harmony." },
          { text: "Learn the root-5th-string shape: C9 at x3233x. This shape is moveable — slide it up 2 frets for D9. Practice switching between the two shapes.", why: "Having two moveable 9th chord shapes means you can play any dominant 9th anywhere on the neck. This flexibility is essential for funk and soul comping." },
          { text: "Play a funk vamp: G9 for 4 bars with a 16th-note strumming pattern. Mute between strums for that choppy, percussive funk sound.", why: "Dominant 9ths shine in rhythmic contexts. The percussive muting between strums is as important as the chord itself — it creates the funk pocket." },
          { text: "Play G9→C9→D9→G9. Compare this to G→C→D→G. The 9th chords should make the same progression feel entirely different — deeper, funkier, more complex.", why: "This comparison demonstrates the power of voicing choice. Same root movement, completely different emotional impact." }
        ],
        feel: "Dominant 9ths should feel powerful and groovy — like the chord is strutting. They have swagger that regular chords don't.",
        wrong: "If the chords sound muddy, make sure you're only strumming the right strings. If the funk vamp sounds stiff, loosen your wrist and let the muting happen naturally.",
        sarah: "The dominant 9th is the most stylish chord in music. When you play it, you should feel cooler. If you don't, you're not strumming hard enough."
      },
      {
        id: "gs-8-4",
        time: 10,
        title: "Minor 9th & 11th",
        type: "guitar",
        what: "Learn Am9 and Dm11 — the floating, ethereal voicings that define the Khruangbin/BALTHVS sound. These are upper-string fragments, not full barre chords.",
        steps: [
          { text: "Play Am9: x02413 (or the simpler x05500). The 9th (B) and the minor 7th (G) create a lush, suspended sound. Let it ring — don't rush past it.", why: "Minor 9th chords are the most beautiful chords in guitar. They combine sadness (minor) with sophistication (9th) and tension (7th) in one voicing." },
          { text: "Play Dm11: xx0011 (or x5556x). The 11th (G) adds an even more open, floating quality. This chord sounds like a question that doesn't need an answer.", why: "Minor 11th chords are even more abstract than 9ths. They blur the line between chord and atmosphere — perfect for spacious, groove-oriented music." },
          { text: "Alternate between Am9 and Dm11 slowly. Let each chord sustain for 2 full bars. The progression should feel like clouds drifting.", why: "These chords need time to breathe. Rushing through them destroys their magic. Slow, spacious playing is how Khruangbin and BALTHVS use them." },
          { text: "Try playing just the top 3-4 strings of each voicing. These fragments are how session guitarists actually use extended chords — you don't always need the full shape.", why: "Upper-string fragments are lighter, more flexible, and easier to move between. They're the practical way to incorporate extended chords into real playing." }
        ],
        feel: "These chords should feel like floating — weightless, open, and expansive. They're the musical equivalent of looking at the sky.",
        wrong: "If they sound muddy or cluttered, try playing fewer strings. If they sound like regular minor chords, make sure the 9th and 11th are ringing clearly.",
        sarah: "Am9 and Dm11 are the chords that make people close their eyes and sway. They're not showing off — they're creating a feeling. That's what extended harmony is for."
      },
      {
        id: "gs-8-5",
        time: 10,
        title: "Extended Chord Progression",
        type: "guitar",
        what: "Play Am9→Dm7→G9→Cmaj7 slowly, letting each voicing ring. This is a ii-v-I-IV in C with extended voicings — the harmonic foundation of soul and neo-soul guitar.",
        tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }],
        steps: [
          { text: "Put on the Deep Soul Groove 80. Play each chord for a full bar. Focus on clean transitions — every note in each voicing should ring clearly. No buzzing, no dead strings.", why: "Extended chords are less forgiving than triads. One muted string can ruin the voicing. Clean technique is essential at this level." },
          { text: "Listen to how each chord leads to the next. Am9 creates tension that Dm7 partially resolves. G9 builds expectation that Cmaj7 fulfills. The progression tells a story.", why: "Extended chord progressions have more harmonic movement than triad progressions. The added notes create voice leading — individual notes that move smoothly between chords." },
          { text: "Play the progression with a gentle fingerpicking pattern. Each chord gets 4 picked notes: bass, middle, high, middle. Let the notes overlap.", why: "Fingerpicking extended chords reveals their inner voices. You can hear the 7ths, 9ths, and other extensions as individual melodies within the harmony." },
          { text: "Loop the progression 8 times. By the 4th loop, the changes should feel automatic. By the 8th, you should be able to focus entirely on tone and dynamics.", why: "Internalizing this progression frees your attention for expression. When the chords are in your muscle memory, you can focus on making music." }
        ],
        feel: "The progression should feel like a warm bath — enveloping, comfortable, and deep. Each chord should melt into the next with no sharp edges.",
        wrong: "If transitions are clunky, practice just the chord changes without rhythm until they're smooth. If the voicings sound thin, check that all intended strings are ringing.",
        sarah: "This progression is the skeleton key to soul harmony. Learn it in C, then move it to other keys. You'll hear it in every Khruangbin and D'Angelo song.",
        metronome: 60
      },
      {
        id: "gs-8-6",
        time: 10,
        title: "Dorian Soloing over Extended Chords",
        type: "guitar",
        recorder: true,
        what: "Record the Am9→Dm7→G9→Cmaj7 progression, then solo over it using A Dorian. The F# colors everything — it's the note that makes your solo sound sophisticated instead of basic.",
        setup: "Phone or looper to record the chord progression.",
        tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }],
        steps: [
          { text: "Put on the Deep Soul Groove 80 and record the extended chord progression from exercise 8-5. Loop it. Play A Dorian melodies over the top — start simple, just 3-4 notes per phrase.", why: "Soloing over extended chords sounds different than soloing over triads. The complex harmony underneath supports more melodic adventuring." },
          { text: "Target the F# (Dorian's raised 6th) over each chord. Notice how it sounds different depending on the chord underneath: warm over Am9, tense over G9, dreamy over Cmaj7.", why: "The same note changes character depending on its harmonic context. This is how sophisticated improvisers think — not just scale patterns, but note-chord relationships." },
          { text: "Use space. Play a phrase, then rest for a full bar. Let the chords fill the silence. Your solo should breathe with the progression.", why: "Over extended chords, silence is especially powerful — the rich harmony continues during your rests, keeping the music alive without you playing." },
          { text: "Try ending phrases on chord tones: land on the 9th of Am9 (B), the 7th of Dm7 (C), the 9th of G9 (A), the 7th of Cmaj7 (B). These targets make your solo sound intentional.", why: "Targeting extensions in your solo proves you're hearing the chords, not just running scales. It's the difference between playing over changes and playing through them." }
        ],
        feel: "Your solo should feel like a conversation with the chords — you speak, they respond, you adjust. The F# should feel like a secret weapon that makes everything sound better.",
        wrong: "If your solo sounds disconnected from the chords, you're playing patterns instead of listening. If every phrase sounds the same, vary your rhythm and target notes.",
        sarah: "This is where scales become music. You're not just running A Dorian anymore — you're using it to have a conversation with sophisticated harmony. That's improvisation.",
        fretboard: { scale: "a-dorian", position: 1 }
      },
      {
        id: "gs-8-7",
        time: 12,
        title: "Ghost Notes + Extended Chords",
        type: "guitar",
        what: "Combine reggae-style ghost note rhythm with 9th and 11th voicings. This is the Skinshape/BALTHVS fusion — extended chords played with rhythmic sophistication.",
        tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Put on the Soul Funk Groove 90. Play Am9 with the ghost note strumming pattern from Level 4: muted scratch on beats 1 and 3, chord stab on the 'and' of 2 and 4. The extended voicing makes the stabs richer.", why: "Ghost notes with extended chords create a deeply funky, sophisticated groove. The muted scratches provide rhythm while the extended stabs provide harmonic color." },
          { text: "Move the ghost note pattern through your extended progression: Am9→Dm7→G9→Cmaj7. Each chord change should be smooth — the rhythm never breaks.", why: "Maintaining a steady ghost note rhythm while changing complex chord shapes is a real coordination challenge. This is what separates intermediate from advanced rhythm guitar." },
          { text: "Add behind-the-beat phrasing: place each chord stab slightly late, while keeping the ghost notes on the beat. The rhythm should feel lazy and deep.", why: "The combination of on-beat ghost notes and behind-the-beat chord stabs creates the pocket that defines Skinshape and dub-influenced guitar. It's micro-timing mastery." },
          { text: "Reduce the chord stabs to just the top 3 strings. Play fragments of Am9 and G9 — lighter, more suggestive. Let the ghost notes carry the groove.", why: "Fragment voicings with ghost note rhythm is professional-level guitar playing. You're implying complex harmony with minimal effort. Less is profoundly more." }
        ],
        feel: "The groove should feel like a heartbeat — steady, deep, and unhurried. The extended chords add color without disrupting the rhythm. Ghost notes and harmony become one instrument.",
        wrong: "If the rhythm is unsteady, practice the ghost note pattern alone before adding chord changes. If the chords sound cluttered, use smaller fragments.",
        sarah: "This is the Skinshape sweet spot — where reggae groove meets jazz harmony. Your right hand does the dancing while your left hand does the painting."
      },
      {
        id: "gs-8-8",
        time: 12,
        title: "Soul-Funk Groove",
        type: "guitar",
        what: "Combine extended chords, ghost note rhythm, and behind-the-beat feel over a backing track. This is the full soul-funk guitar experience.",
        tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Start with Soul Funk Groove 90. Play Am9 with ghost note rhythm for 4 bars. Lock into the groove before doing anything else — feel the pocket.", why: "The groove has to be solid before you add complexity. If your foundation isn't locked, nothing you build on top will feel right." },
          { text: "Move through Am9→Dm7→G9→Cmaj7 with ghost note rhythm. Every transition should be invisible — the listener should feel the chord change, not hear a gap.", why: "Seamless chord changes over a groove are the hallmark of a professional rhythm guitarist. The groove is the constant — the chords are decoration." },
          { text: "Add Dorian fills between chord changes: quick 2-3 note phrases in the gaps between ghost note patterns. Just hints of melody within the rhythm.", why: "Dorian fills over extended chords blur the line between rhythm and lead guitar. This is how Khruangbin's Mark Speer plays — rhythm and lead simultaneously." },
          { text: "Play for the full 12 minutes. Let the groove evolve naturally — start minimal, add fills, strip back, build again. The backing track stays constant while you control the journey.", why: "Sustaining a groove for 12 minutes requires patience and creativity. You have to make the same chords feel fresh through variation in rhythm, dynamics, and fills." }
        ],
        feel: "This should feel like being in the pocket with a band — deep, locked in, and effortless. Your guitar should feel like part of the rhythm section, not a soloist sitting on top.",
        wrong: "If you're rushing or dragging against the beat, strip back to just ghost notes until you're locked in. If the fills disrupt the groove, make them shorter and simpler.",
        sarah: "This is the sound that fills rooms without anyone noticing. People start moving their heads and don't know why. That's what rhythm guitar mastery feels like."
      },
      {
        id: "gs-8-9",
        time: 5,
        title: "Self-Check: Hear the Extensions",
        type: "guitar",
        what: "Play Am then Am9. Play G then G9. Can you hear the added notes? This ear training exercise confirms that you're hearing the extensions, not just playing shapes.",
        steps: [
          { text: "Play Am (x02210) and let it ring for 4 beats. Then play Am9 (x02413 or x05500) and let it ring. Listen for the added note — the B and G that create the 9th and 7th.", why: "If you can't hear the difference, you're playing shapes without understanding. Hearing the extensions is what allows you to use them musically." },
          { text: "Play G (320003) then G9 (3x320x). The 9th (A) and 7th (F) are the new colors. Can you pick them out? Hum them.", why: "Being able to hum the extended notes means your ear has internalized them. This is the transition from technical knowledge to musical understanding." },
          { text: "Play a random extended chord without looking at your hand. Before you strum, predict whether it will sound major or minor, bright or dark. Then strum and check.", why: "Predicting the sound of a chord shape before playing it means you're developing harmonic intuition. This is the skill that separates knowing chords from understanding harmony." }
        ],
        feel: "You should feel your ear getting sharper — hearing notes you couldn't distinguish before. The extended notes should pop out like colors you never noticed.",
        wrong: "If you can't hear any difference between Am and Am9, listen specifically to the highest note in each chord. If everything sounds the same, slow down and play one string at a time.",
        sarah: "This isn't a playing exercise — it's a listening exercise. The guitar is just a tool for training your ear. Your ear is the real instrument."
      },
      {
        id: "gs-8-10",
        time: 15,
        title: "Soul Session",
        type: "guitar",
        what: "Extended jam combining everything from Level 8: extended chords, Dorian leads, ghost notes, dub spaces, soul-funk groove. Your most harmonically sophisticated playing yet.",
        tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }, { name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Start with Deep Soul Groove 80. Open with Am9 ghost note rhythm — minimal, deep, locked in. Let the groove breathe for 3 minutes before adding anything.", why: "Starting sparse establishes the groove as the foundation. Everything you add should enhance it, not compete with it." },
          { text: "Minutes 3-7: move through the extended progression (Am9→Dm7→G9→Cmaj7) with ghost notes. Add short Dorian fills between changes. Keep it restrained.", why: "The middle section is where you demonstrate your extended chord vocabulary. Each voicing should ring clearly, and the fills should complement the harmony." },
          { text: "Minutes 7-11: switch to the Soul Funk Groove 90 and open up. Longer Dorian phrases, more expressive fills, wider dynamics. Target the extensions — land on 9ths and 7ths. This is your solo section within the groove.", why: "The solo section should feel organic — growing out of the rhythm playing rather than breaking from it. You're still in the groove, just expressing more." },
          { text: "Minutes 11-15: strip back to basics. Am9, ghost notes, space. Reduce to fragments. End with a single Am9 chord ringing into silence.", why: "The return to simplicity after complexity creates the most satisfying musical arc. You end where you began, but the journey makes the return meaningful." }
        ],
        feel: "This should feel like performing at a late-night soul club — deep, groovy, sophisticated, and unhurried. Your playing should make people close their eyes and nod.",
        wrong: "If it sounds like a jazz exercise, add more groove and ghost notes. If it sounds like basic strumming, use your extended voicings. If it's too busy, add more space.",
        sarah: "This is the summit of Level 8. You started with a single Dorian scale — now you're playing soul sessions with extended harmony, ghost notes, and Dorian leads. That's real musical growth.",
        levelUp: "You can sustain a 15-minute soul-funk jam using extended voicings (9ths, 11ths, maj7s), Dorian melodies, ghost note rhythm, and dynamic variation. Your harmonic vocabulary has leveled up."
      }
    ]
  },

  // ── Level 9: Full Jam Integration ──────────────────────────────────
  {
    level: 9,
    title: "Full Jam Integration",
    subtitle: "All Styles Combined · The Golden Hour Set",
    description: "Everything comes together. You'll switch between styles on command, match moods to music, transcribe by ear, build arrangements, and play extended golden hour sets that draw from every level. This is graduation — your guitar vocabulary is complete.",
    artists: "All artists from Levels 1-8",
    unlocks: "Style switching, mood matching, transcription, arrangement building, extended improvisation, complete musical voice",
    exercises: [
      {
        id: "gs-9-1",
        time: 10,
        title: "Style Switching Drill",
        type: "guitar",
        what: "Over a backing track, switch between surf, blues, reggae, desert, Khruangbin, cinematic, psych, and soul styles every 4 bars on a mental cue. Every style you've learned, on demand.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start with Surf Rock Beat 120. Play surf tremolo picking for 4 bars. On bar 5, switch to blues bends and pentatonic. Bar 9, switch to reggae ghost notes. Keep switching every 4 bars.", why: "Style switching tests whether you've truly internalized each style or just memorized exercises. If you can switch instantly, the style is in your fingers, not just your head." },
          { text: "Add desert/Khruangbin (spacious, behind the beat, global scales) and cinematic (arpeggios, tremolo, dynamics) to your rotation. Cycle through all styles.", why: "The more styles you can access on demand, the richer your musical vocabulary. Each style is a different way to respond to the same musical moment." },
          { text: "Add psych (Phrygian Dominant, fuzz energy, jangle) and soul (extended chords, Dorian, ghost notes). Now you have 7+ styles to cycle through.", why: "By Level 9, you should have at least 7 distinct approaches to playing over any backing track. This drill tests your access to all of them." },
          { text: "Challenge: have someone call out styles randomly while you play. If you're alone, write styles on cards and flip one every 4 bars.", why: "Random calling removes the safety of predictable order. Real musical situations require you to access any style at any moment." }
        ],
        feel: "You should feel like a musical chameleon — completely at home in any style. The switches should feel like changing language, not like starting over.",
        wrong: "If some styles feel foreign or forced, they need more practice in their respective levels. If all the styles sound the same, you're defaulting to one approach and need more contrast.",
        sarah: "This drill reveals your strengths and weaknesses. The styles that feel easy are your comfort zone. The ones that feel awkward are where you need work. Both are valuable information."
      },
      {
        id: "gs-9-2",
        time: 10,
        title: "Mood Matching",
        type: "guitar",
        what: "Play to match emotions — melancholic, hopeful, deep, warm — over a groove backing track. This is about using your full vocabulary to express specific feelings.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Start with the Khruangbin Style Beat 80. Think 'melancholic.' Choose the scale, voicings, rhythm, dynamics, and space that express sadness without heaviness. Play for 2 minutes.", why: "Melancholy requires specific tools: minor modes, slow phrasing, moderate dynamics, space. Choosing these deliberately develops your emotional vocabulary." },
          { text: "Switch to 'hopeful.' Same backing track. What changes? Maybe Dorian instead of Aeolian. Maybe brighter voicings. Maybe more rhythmic energy. Play for 2 minutes.", why: "Changing emotion over the same backing track forces you to identify which musical elements convey which feelings. This is compositional thinking." },
          { text: "Switch to 'deep.' Think Khruangbin — behind the beat, spacious, minor pentatonic, global flavors. The groove should pull the listener in. Play for 2 minutes.", why: "Depth in music comes from restraint, space, and rhythmic pocket. It's not about complexity — it's about weight and presence." },
          { text: "Switch to 'warm.' Think soul — extended chords, Dorian, ghost notes, smooth phrasing. The music should feel like a hug. Play for 2 minutes.", why: "Warmth comes from major 7ths, the Dorian raised 6th, smooth legato phrasing, and moderate dynamics. Identifying these tools lets you deploy them intentionally." },
          { text: "Reflect: which mood was easiest? Which was hardest? The easy one is your natural voice. The hard one is your growth edge.", why: "Self-awareness about your emotional range as a player is advanced musicianship. You're not just playing notes — you're understanding your artistic tendencies." }
        ],
        feel: "Each mood should feel genuinely different — not just different notes, but different energy, different timing, different breath. The listener should feel the emotion change.",
        wrong: "If all four moods sound the same, you're defaulting to muscle memory instead of listening to the prompt. Exaggerate the differences until they feel distinct.",
        sarah: "This is the most important exercise in the curriculum. Technique serves expression. If you can make someone feel something specific with your guitar, you've mastered the instrument."
      },
      {
        id: "gs-9-3",
        time: 10,
        title: "Two-Scale Improvisation",
        type: "guitar",
        what: "Over one backing track, freely alternate between any two scales you've learned. Minor pentatonic and Dorian. Phrygian and Phrygian Dominant. Blues and Mixolydian. The contrast creates depth.",
        steps: [
          { text: "Choose two scales that share a root (both in A). Play 4 bars of one, then 4 bars of the other. Feel how the mood shifts with each scale change.", why: "Alternating between scales over the same harmony creates a sense of shifting color — like changing the lighting in a room. It's a powerful improvisational technique." },
          { text: "Try scales that are close: A minor pentatonic and A Dorian. The F# is the only difference, but it changes the mood significantly.", why: "Close scales teach you to hear subtle harmonic differences. The ability to shift mood with a single note change is sophisticated musicianship." },
          { text: "Try scales that are far apart: A Dorian and A Phrygian Dominant. The contrast is dramatic — warm vs. exotic, soul vs. surf.", why: "Distant scales create dramatic contrast. Deploying them within the same improvisation shows command of a wide harmonic vocabulary." },
          { text: "Eventually, stop thinking about which scale you're using. Let your ear guide your note choices. If you want warmth, your fingers should find the Dorian F#. If you want drama, the Phrygian Bb.", why: "The goal is to internalize scales so deeply that you choose notes by ear, not by pattern. Scales become colors on your palette, not rules to follow." }
        ],
        feel: "You should feel like a painter mixing colors — each scale adds a different hue to the same canvas. The transitions between scales should feel natural, not mechanical.",
        wrong: "If you can hear the 'seams' between scales, make the transitions smoother — use shared notes as bridges. If it sounds random, be more deliberate about when and why you switch.",
        sarah: "This is where all those scales from previous levels become a single vocabulary. You're not 'playing Dorian' or 'playing Phrygian' — you're just playing music with all the colors available."
      },
      {
        id: "gs-9-4",
        time: 10,
        title: "Chord Tone + Scale Integration",
        type: "guitar",
        what: "Target chord tones on downbeats and use scale tones to connect them. This is how jazz musicians think — and it's the bridge between knowing scales and truly improvising over changes.",
        steps: [
          { text: "Play over Am9→Dm7→G9→Cmaj7. On beat 1 of each chord, land on a chord tone (root, 3rd, 5th, 7th, or 9th). Use scale notes to walk between targets.", why: "Targeting chord tones on strong beats ensures your solo sounds connected to the harmony. The scale notes between targets create smooth melodic lines." },
          { text: "Start by targeting roots: A on Am9, D on Dm7, G on G9, C on Cmaj7. Use Dorian notes to connect each root to the next.", why: "Targeting roots is the simplest version of this technique. It guarantees your solo outlines the chord progression clearly." },
          { text: "Graduate to targeting 3rds and 7ths: C over Am9, F over Dm7, F over G9, E over Cmaj7. These notes define the chord quality more than the root does.", why: "3rds and 7ths are the 'guide tones' that define whether a chord is major, minor, or dominant. Targeting them makes your solo sound harmonically aware." },
          { text: "Finally, target extensions: B (9th) over Am9, C (7th) over Dm7, A (9th) over G9, B (7th) over Cmaj7. Now your solo highlights what makes each chord special.", why: "Targeting extensions is the most advanced version. Your solo literally outlines the extended harmony, proving you hear it — not just play it." }
        ],
        feel: "Your solo should feel like it's inside the chords rather than on top of them. Each phrase should feel inevitable — guided by the harmony rather than by scale patterns.",
        wrong: "If it sounds like an exercise (too predictable), add rhythmic variation and approach notes. If your targets sound wrong, double-check you're landing on actual chord tones.",
        sarah: "This is the technique that separates noodling from improvising. When every phrase connects to the harmony, your solo tells the same story as the chords. That's real music.",
        fretboard: { scale: "a-dorian", position: 1 }
      },
      {
        id: "gs-9-5",
        time: 10,
        title: "Transcribe 8 Bars",
        type: "guitar",
        what: "Pick a favorite song. Learn 8 bars of the guitar part by ear. No tabs, no YouTube tutorials — just your ears and your instrument. This is the ultimate musical skill.",
        steps: [
          { text: "Choose a song you love — something with a clear guitar part. Listen to the first 8 bars 3 times without your guitar. Hum the melody.", why: "Active listening without your instrument forces your ear to do the work. Humming proves you've internalized the melody before you try to find it on the fretboard." },
          { text: "Pick up your guitar. Find the first note by trial and error. Then the second. Work note by note. This is slow — that's normal. 8 bars might take the full 10 minutes.", why: "Transcription is hard because it requires you to translate what you hear into fretboard positions. This builds the ear-to-hand connection that defines great musicians." },
          { text: "Focus on getting the melody right first. Rhythm second. Exact voicings third. If you can play the melody in time, that's a success.", why: "Prioritizing melody over precision keeps you from getting frustrated. Even an approximate transcription teaches your ear more than perfect tab reading." },
          { text: "Compare your version to the original. What did you get right? What did you miss? The mistakes reveal what your ear needs to develop.", why: "Self-evaluation after transcription shows you exactly where your ear is strong and where it needs work. Every transcription makes the next one easier." }
        ],
        feel: "This should feel like detective work — slow, satisfying, and occasionally frustrating. Each note you find should feel like a small victory.",
        wrong: "If you gave up and looked up tabs, try again with an easier song. If it took less than 5 minutes, choose something more challenging. If you got no notes right, start with just finding the key.",
        sarah: "Transcription is how every great musician learned. Before tabs and YouTube, you had to figure it out. There's no shortcut to developing your ear — but there's no more valuable skill either."
      },
      {
        id: "gs-9-6",
        time: 10,
        title: "Build an Arrangement",
        type: "guitar",
        recorder: true,
        what: "Record layers: rhythm, lead, texture. Build a 1-minute piece using skills from all levels. This is arranging — thinking about how parts fit together.",
        setup: "Phone or recording device with overdub capability (Voice Memos, GarageBand, or a looper pedal).",
        steps: [
          { text: "Record Layer 1 — Rhythm: a simple chord progression using extended voicings (Level 8) with ghost note rhythm (Level 4). 1 minute, steady tempo. This is your foundation.", why: "The rhythm part is the foundation of any arrangement. Using extended chords and ghost notes gives it sophistication without complexity." },
          { text: "Record Layer 2 — Lead: over your rhythm track, play a melodic part using Dorian or minor pentatonic. Simple, spacious, behind the beat. This is your melody.", why: "The lead should complement the rhythm, not compete with it. Using the spacious Khruangbin approach (Level 5) ensures the parts breathe together." },
          { text: "Record Layer 3 — Texture: arpeggiated cinematic guitar (Level 6) or jangle shimmer (Level 7). This part fills the spaces between rhythm and lead.", why: "The texture layer is the glue that holds an arrangement together. It adds depth without taking focus from the rhythm and melody." },
          { text: "Listen to all three layers together. Does it sound like a song? Adjust volumes if one layer dominates. The arrangement should be balanced.", why: "Listening to your arrangement critically develops your producer's ear. You're learning to hear how parts interact — a skill that goes beyond guitar." }
        ],
        feel: "You should feel like a producer — layering parts that serve the whole. Each layer should add something essential, and removing any one layer should feel like something is missing.",
        wrong: "If all three layers sound like the same part, you need more contrast between them. If one layer drowns the others, simplify it or reduce its volume.",
        sarah: "This exercise proves you're not just a guitarist — you're a musician. You can think in layers, serve the song, and build something bigger than any single part."
      },
      {
        id: "gs-9-7",
        time: 12,
        title: "The Meditative Jam",
        type: "guitar",
        what: "Play for 10+ minutes with no plan. Let your mind wander while staying on beat. Use your full vocabulary — every scale, every style, every technique — but don't think about it. Just play.",
        tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Set a timer for 12 minutes. Put on the Khruangbin Style Beat 80 or tap your own tempo. Start playing whatever comes to mind — chords, melodies, riffs. Don't judge.", why: "The meditative jam is about accessing your musical subconscious. When you stop thinking about what to play, your fingers reveal what you've truly internalized." },
          { text: "If you notice yourself thinking ('I should use Phrygian here'), let the thought pass and return to feeling. The exercise is playing from instinct, not intellect.", why: "Musical flow state happens when the analytical mind steps back. The techniques from 9 levels are in your body — trust them to emerge without being summoned." },
          { text: "Notice what styles and scales your fingers gravitate toward. These are your natural musical voice. Also notice what never appears — those are your blind spots.", why: "The meditative jam is a diagnostic tool as well as a creative one. It shows you who you are as a musician in this moment." },
          { text: "Don't stop, even if what you're playing sounds bad. Push through the ugly parts. Often the most interesting musical moments come right after you think you've run out of ideas.", why: "Persistence through creative dead spots is how breakthroughs happen. The first 5 minutes use up your clichés. Minutes 6-12 are where originality lives." }
        ],
        feel: "This should feel like meditation with a guitar — calm, present, and unhurried. There's no goal except to play. No audience except yourself. No wrong notes, only choices.",
        wrong: "If you stopped before the timer, try again. The discomfort of continuing is part of the exercise. If every minute sounded the same, you stayed in your comfort zone.",
        sarah: "This is the most important exercise you'll ever do. Not because it teaches you anything new — but because it shows you everything you've already learned. Your fingers know more than you think."
      },
      {
        id: "gs-9-8",
        time: 15,
        title: "Golden Hour Set — Surf Rock",
        type: "guitar",
        what: "15-minute improvisation over a surf rock backing track. Everything you've learned. Record it. This is your first golden hour set — a complete musical performance.",
        tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Start with Surf Rock Beat 120. Begin with surf tremolo picking — pay homage to Level 2 where it all started. Simple, driving, energetic. Minutes 0-3.", why: "Starting with surf basics honors your journey. It also gives the audience (even if it's just you) something familiar and energetic to latch onto." },
          { text: "Minutes 3-7: expand into blues bends, desert scales, Phrygian Dominant. Move through the styles fluidly — surf into blues into desert into psych. Let each style lead to the next.", why: "The middle section showcases your range. Each style transition should feel like a natural evolution, not an abrupt change." },
          { text: "Minutes 7-11: build to the climax. Garage rock energy, fuzz, fast Phrygian riffs. This is where you let loose — the audience should feel the energy peak.", why: "The climax of a golden hour set should be undeniable. All the restraint from earlier sections pays off when you finally unleash full energy." },
          { text: "Minutes 11-15: cool down. Cinematic arpeggios, Khruangbin space, extended chord voicings. End with a single sustained note fading to silence. The golden hour ends.", why: "The cool-down is as important as the climax. Ending with space and beauty gives the performance a satisfying arc." },
          { text: "Listen back to your recording. You just played a 15-minute set that draws from 9 levels of study. This is what guitar mastery sounds like — not perfection, but fluency.", why: "Self-review of extended performances is how you develop artistic judgment. What worked? What felt forced? What surprised you? These insights guide your continued growth." }
        ],
        feel: "This should feel like a performance — a complete musical statement with a beginning, middle, and end. You should feel proud, regardless of mistakes. You showed up for 15 minutes and made music.",
        wrong: "If it felt like 15 minutes of noodling, you need more structural awareness — plan your arc before you start. If one style dominated, you need more practice switching.",
        sarah: "This is it. Your surf rock graduation concert. 15 minutes of everything you've learned, driven by the beat that started it all. Record it. Keep it. Listen to it in a year.",
        levelUp: "You can perform a structured 15-minute improvisation over surf rock that draws from all 9 levels with clear sections and natural style transitions."
      },
      {
        id: "gs-9-9",
        time: 15,
        title: "Golden Hour Set — Groove",
        type: "guitar",
        what: "Same concept, different energy. 15-minute improvisation over a groove backing track. Different vocabulary choices — more soul, more space, more extended chords. Record it.",
        tracks: [{ name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Start with Soul Funk Groove 90. Open with extended chord voicings — Am9, Cmaj7 — with ghost note rhythm. Settle deep into the pocket. Minutes 0-4.", why: "The groove set starts lower energy than the surf set. The opening should feel like sinking into a warm bath — inviting, deep, and unhurried." },
          { text: "Minutes 4-8: add Dorian melodies over the chords. Simple, spacious phrases that complement the groove. This is the Khruangbin/BALTHVS zone.", why: "Melodic content over groove should be restrained and groove-oriented. Every note should serve the pocket, not fight it." },
          { text: "Minutes 8-12: explore more adventurous harmony. Move through chord changes, add Phrygian touches, try two-scale improvisation. The groove allows more harmonic exploration than surf.", why: "The steady groove provides a safety net for harmonic adventuring. You can try riskier note choices because the groove holds everything together." },
          { text: "Minutes 12-15: return to simplicity. Strip back to a single chord, minimal notes, maximum space. Let the groove carry you to the end. Final note: silence.", why: "Ending with less than you started creates a meditative, complete feeling. The groove doesn't need you — you were its guest, and now you leave quietly." }
        ],
        feel: "This should feel deeper and more introspective than the surf set — like a late-night session rather than a beach party. The energy is internal, not external.",
        wrong: "If it sounded too similar to the surf set, you defaulted to one approach. The groove set should be slower, spacier, and more harmonically rich. If it felt boring, add more melodic variety.",
        sarah: "Two golden hour sets, two different worlds. The surf set is about energy and drive. The groove set is about depth and feel. Both are equally valid expressions of musicianship."
      },
      {
        id: "gs-9-10",
        time: 15,
        title: "Golden Hour Set — Silence",
        type: "guitar",
        what: "No backing track. Just you and your guitar. 15 minutes. Whatever comes out. This is graduation — the final exercise in the entire curriculum.",
        steps: [
          { text: "Sit with your guitar. No backing track. No metronome. No plan. Take three deep breaths and start playing whatever comes to mind.", why: "Playing without any external support strips away every safety net. There's no beat to lock into, no harmony to follow. It's just you and your musical instincts." },
          { text: "Let the music evolve organically. You might start with chords and move to melody. You might play fast and then slow down. You might play in a style you haven't practiced. Follow the music.", why: "Without a backing track dictating style and tempo, you discover what your musical voice actually sounds like. This is the most honest playing you'll ever do." },
          { text: "Include silence. Long pauses. The silence is part of the music — maybe the most important part. When Khruangbin leaves space, that's not 'nothing happening.' That's music breathing.", why: "Playing in silence (without backing) means your silences are truly silent. This is the ultimate test of whether you've learned that space is a musical tool." },
          { text: "When the 15 minutes are up, sit quietly for a moment before putting the guitar down. You've completed the curriculum. Whatever you played is the sound of everything you've learned.", why: "The moment after playing is when the music settles. Let it. You've spent 9 levels building a musical voice — this silence is the punctuation at the end of a long, beautiful sentence." }
        ],
        feel: "This should feel like the most personal playing you've ever done. No performance pressure, no backing track to follow, no exercises to complete. Just pure, unfiltered you.",
        wrong: "There is no 'wrong' in this exercise. Whatever you played is correct. If it felt uncomfortable, that discomfort is growth. If it felt natural, you've arrived.",
        sarah: "You started this curriculum learning where to put your fingers. You're ending it making music that comes from your soul. The guitar is no longer an instrument you play — it's a voice you speak with. Congratulations. Now go play.",
        levelUp: "You have completed the Guitar Study curriculum. Your musical voice is uniquely yours — informed by surf, blues, reggae, desert, Khruangbin, cinema, psych, and soul. Keep playing. Keep growing. The golden hour never ends."
      }
    ]
  }
];