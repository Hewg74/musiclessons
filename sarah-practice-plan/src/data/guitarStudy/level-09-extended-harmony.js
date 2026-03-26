import { getPitchRange } from "../appData.js";

export const level9 = {
  level: 9,
  title: "Extended Harmony",
  subtitle: "Seventh chords, Dorian mode, and the soul grooves that make simple progressions feel deep.",
  description:
    "You've spent eight levels building rhythm, feel, and desert patience. Now we add harmonic color — the 7th chords that separate folk guitar from soul guitar. Am7 instead of Am. Dm7 instead of Dm. One extra note per chord transforms your sound from campfire to candlelit lounge. You'll learn the Skinshape soul cycle, the Dorian mode's brighter shade of minor, ghost-note grooves, and Khruangbin's three-note voicings. This is where your guitar starts to sound expensive.",
  artists: "Skinshape, Cotton Jones, Khruangbin, Leon Bridges",
  unlocks: "Global Colors (Level 10)",
  review: {
    label: "Level 8 Check-In",
    time: 5,
    exercises: ["gs-8-4", "gs-8-11"],
    prompt: "Play a 4-note sus pentatonic motif 16 times identically (gs-8-4). Then play your extended desert jam with drone throughout (gs-8-11). Desert patience is solid? Time to add harmonic color."
  },
  exercises: [

    // ─── LEARN: 7TH CHORD VOICINGS ───

    {
      id: "gs-9-1",
      time: 8,
      title: "Open 7th Chords — Am7, Dm7, Em7",
      type: "guitar",
      what: "Learn three open-position 7th chords: Am7, Dm7, Em7. Each one is a triad you already know with ONE finger removed or moved. Am7 is Am with your pinky lifted. Dm7 adds one finger. Em7 lifts one finger from Em. The 7th note adds warmth, sophistication — like adding cream to coffee. Same drink, richer flavor.",
      setup: "Guitar. No metronome yet — focus on shapes first.",
      chordVoicings: { chords: ["Am7", "Dm7", "Em7"] },
      steps: [
        { text: "Play Am (x02210). Now lift your pinky off the 1st string — you're playing Am7 (x02010). Strum both back to back. Am is clean and definitive. Am7 is softer, warmer, slightly unresolved. The open 1st string (E→G natural) adds the 7th.", why: "Am7 is the easiest 7th chord to learn because it's Am with LESS effort — you remove a finger. The 7th (G) is already waiting on the open 1st string. This is why open-position 7ths are magic on guitar — the open strings do the work." },
        { text: "Play Dm (xx0231). Now shift to Dm7 (xx0211) — flatten your index finger to bar the 1st fret across the top two strings. Strum both back to back. Dm7 has a jazzy, smoky quality that Dm lacks.", why: "Dm7 adds the C note (the 7th of D minor). That C creates a pull toward resolution — Dm7 wants to GO somewhere. This tension is what gives soul and jazz their forward momentum." },
        { text: "Play Em (022000). Now lift your ring finger off the 4th string — you're playing Em7 (020000). The open 4th string (D) is the 7th. Strum both. Em7 has a dreamy, open quality.", why: "Like Am7, Em7 is a chord with LESS effort than its triad. The open D string provides the 7th naturally. Two of your three 7th chords are easier than their triads — the guitar wants to play these voicings." },
        { text: "Cycle through all three: Am7 for 4 beats, Dm7 for 4 beats, Em7 for 4 beats. Repeat 4 times. Listen to how the 7ths create a continuous, flowing quality — each chord bleeds into the next more smoothly than triads would.", why: "7th chords share more common tones than triads. Am7 (A-C-E-G) and Dm7 (D-F-A-C) share A and C. Dm7 and Em7 (E-G-B-D) share D. These shared tones create seamless voice-leading — the chords connect like links in a chain." },
        { text: "Strum Am7 with a slow, lazy downstroke. Let every string ring. Hold it for 8 beats. Just sit in the chord. This is the sound of Skinshape, of soul music, of late-night warmth. Get comfortable here — you'll be living in these voicings.", why: "Spending time just SITTING in a 7th chord lets your ear recalibrate. After years of triads, the 7th might sound 'wrong' at first. It's not wrong — it's richer. Your ear needs time to accept the new color as home." }
      ],
      feel: "Each 7th chord should feel like the regular triad put on a velvet jacket. Same bones, richer texture. When you strum Am7 and let it ring, feel how the chord vibrates differently against your body — there's a shimmer, a complexity in the resonance that a basic triad doesn't have. The 7th adds a harmonic layer you feel as warmth in the guitar body. It's like the room got dimmer and more intimate.",
      wrong: "If the chords buzz, check your fretting — especially the Dm7 bar across the 1st fret. If Am7 and Em7 sound thin, make sure you're strumming all the correct strings (avoid the 6th string on Am7, avoid strings 5-6 on Dm7). If the 7ths sound dissonant rather than warm, give your ear more time — play each one for 16 beats before judging.",
      sarah: "Gene, these voicings matter because they're the sound underneath YOUR kind of music — the warm, sophisticated groove that separates what you love from campfire guitar. Skinshape builds his entire sound on 7th chords — he almost never plays bare triads. When you hear that warm, sophisticated, slightly jazzy quality in 'I Didn't Know,' it's because every chord has the 7th. Will Holland records drums first, then improvises guitar over the groove, and that guitar is almost always 7th voicings with a Lee Perry dub influence underneath. You're learning his vocabulary. Pick the backing track that calls to you for this one — Deep Soul or Khruangbin Style.",
      metronome: null,
      levelUp: "Play Am7, Dm7, and Em7 cleanly with no buzzing, cycling between them on 4-beat changes, and describe the sonic difference between each 7th chord and its triad. Retrieval check: set the guitar down for 60 seconds, then form each 7th shape from memory."
    },
    {
      id: "gs-9-2",
      time: 7,
      title: "Triad vs. 7th — Hearing the Color",
      type: "guitar",
      what: "Play Am then Am7. Dm then Dm7. Em then Em7. Back and forth, slowly. Your job is to HEAR the difference — not just play it. The 7th adds a note that creates warmth, motion, and a subtle pull. Train your ear to recognize the color change, like distinguishing between blue and blue-gray.",
      setup: "Guitar. Metronome at 70 BPM. Quiet room — you need to hear the overtones.",
      chordVoicings: { chords: ["Am", "Am7", "Dm", "Dm7", "Em", "Em7"] },
      steps: [
        { text: "Strum Am for 4 beats. Then Am7 for 4 beats. Repeat 4 times. Close your eyes. Listen for the extra note — the G on the 1st string that opens up when you lift your pinky. Am is a closed statement. Am7 is a question.", why: "Training your ear to distinguish triads from 7ths is the foundation of harmonic awareness. When you can HEAR the 7th, you'll start hearing it everywhere — in Skinshape, in Khruangbin, in every soul record." },
        { text: "Same thing with Dm and Dm7. 4 beats each, 4 repetitions. The Dm7 should sound smokier, jazzier, more complex. The added C note creates a pull — Dm7 wants to move somewhere.", why: "Dm to Dm7 is a more dramatic color change than Am to Am7 because the 7th (C) is a semitone away from the root (D). That close interval creates harmonic friction — beautiful friction, the kind that makes jazz sound like jazz." },
        { text: "Em and Em7. 4 beats each, 4 repetitions. Em7 is the most open-sounding of the three — the D and G ringing together create a spacious, suspended quality.", why: "Em7 has a particularly ethereal quality because the 7th (D) and 3rd (G) are both open strings. Maximum resonance, minimum effort. This voicing appears everywhere in folk, indie, and psych." },
        { text: "Now the Cotton Jones trick: play Am for 4 beats, then D major for 4 beats, then Dm7 for 4 beats, then Dm for 4 beats. Hear how the 7th APPEARS on beat 9 (Dm7) and then VANISHES on beat 13 (Dm). That momentary color is the magic of 'Chewing Gum.'", why: "Cotton Jones uses Am-D-Dm7-Dm as the whole progression. The 7th appears for just 4 beats — a fleeting color that arrives and disappears. This trick teaches you that 7ths don't have to be permanent. They can be momentary decorations." },
        { text: "Record yourself playing Am-D-Dm7-Dm at 70 BPM. Listen back. Can you hear the 7th appear and vanish? That subtle shift IS the song.", why: "Self-listening confirms whether your ear is tracking the 7th. If you can hear it on playback, your ear training is working. If all four chords sound the same, slow down and isolate the Dm7 moment." }
      ],
      feel: "This should feel like an ear-training exercise disguised as chord practice. Every transition should make your ears perk up — you're listening for the shimmer of the 7th appearing, the shift in color. When you start CRAVING the 7th sound after hearing the plain triad, your ear has arrived.",
      wrong: "If you can't hear the difference between Am and Am7, you're strumming too hard or too fast. Soften the strum, let the strings ring, and listen to the 1st string specifically — that's where the 7th lives. If the Cotton Jones progression sounds like four random chords, isolate the Dm7 moment: play Dm, then Dm7, then Dm repeatedly until the color change clicks.",
      sarah: "Gene, Cotton Jones is one of those bands where the magic is in details so subtle most people can't name them. 'Chewing Gum' is just Am-D-Dm7-Dm — four chords, 120 BPM, psychedelic folk. But that Dm7 appearing for 4 beats in the middle is like a ghost walking through the room. You feel it more than you hear it. That's the level of harmonic subtlety you're building toward.",
      metronome: 70,
      recorder: true,
      levelUp: "Play Am-D-Dm7-Dm at 80 BPM and accurately describe the moment when the 7th appears and disappears in the progression."
    },
    {
      id: "gs-9-3",
      time: 8,
      title: "Barre 7th Chords — Gm7, C7, A7",
      type: "guitar",
      what: "Three moveable 7th chord shapes: Gm7 (barre at fret 3), C7 (open/barre), and A7 (open). Gm7 is the hardest — a full barre shape. C7 and A7 are open-position shapes that feel almost like their triads. These three chords are the vocabulary for Skinshape's soul cycle. Master them here, play the song next.",
      setup: "Guitar. Warm up your barre hand — shake it out, stretch the thumb.",
      chordVoicings: { chords: ["Gm7", "C7", "A7"] },
      steps: [
        { text: "A7 first (easiest): play A major (x02220), then lift your ring finger from the 2nd string — you get A7 (x02020). The open 2nd string (B) becomes the 7th. Strum it. A7 has a bluesy, dominant quality — it wants to resolve somewhere.", why: "A7 is a dominant 7th chord — different from the minor 7ths you just learned. Dominant 7ths have a MAJOR triad plus a flat 7th. That combination creates tension and drive. In the Skinshape cycle, A7 is the chord that pushes the progression forward." },
        { text: "C7 next: play C major (x32010), then add your pinky to the 3rd fret of the 3rd string — C7 (x32310). The Bb on the 3rd string is the flat 7th. This voicing is a jazz and blues staple.", why: "C7 is another dominant 7th. Unlike minor 7ths (which float dreamily), dominant 7ths are assertive — they create harmonic tension that demands resolution. C7 in the Skinshape cycle resolves to A7, which resolves to Dm." },
        { text: "Gm7: barre all six strings at fret 3 with your index finger. Add your ring finger at fret 5 on the 5th string. That's it — just two contact points. Shape: 353333. This is the Em7 shape moved up 3 frets. Strum all 6 strings.", why: "Gm7 is the toughest voicing in this level — a full barre with a specific finger pattern. It's built on the Em7 barre shape. If your Level 5 barre work was solid, this is the same muscle, new shape. Start at fret 5 if fret 3 is too tight, then slide down." },
        { text: "Cycle all three: Gm7 (4 beats) → C7 (4 beats) → A7 (4 beats). Repeat at 60 BPM. Don't rush the Gm7 transition — give yourself time to set the barre. Clean notes matter more than tempo.", why: "This three-chord cycle is most of the Skinshape progression. Getting the transitions smooth at a slow tempo means you'll be ready for the full song study. The Gm7→C7 move is the hardest — practice it in isolation if needed." },
        { text: "One-minute changes drill: Gm7 to C7. Set a timer, switch back and forth as fast as you can while keeping both chords clean. Count your changes. Under 15? Practice daily. Over 25? You're ready for the song.", why: "Justin Guitar's one-minute changes drill is the fastest way to build chord transition speed. Gm7→C7 is the critical transition in the Skinshape cycle — once this is fluid, the whole progression flows." }
      ],
      feel: "A7 and C7 should feel assertive and forward-leaning — dominant chords have attitude. Gm7 should feel warm and dark — a minor 7th chord is all atmosphere. When you cycle through all three, it should feel like a conversation between mood (Gm7) and drive (C7, A7).",
      wrong: "If Gm7 buzzes, check your barre pressure — the 3rd fret is far enough from the nut that you need firm pressure. Roll your index finger slightly onto its bony side. If C7 sounds muddy, make sure your pinky on the 3rd fret of the 3rd string isn't muting the 2nd string. If transitions are sloppy, slow the metronome to 50 BPM.",
      sarah: "Gene, these three chords are Skinshape's bread and butter. Will Holland plays Gm7-C7-A7-Dm in almost every song — it's a soul/jazz cycle that goes back to the 1960s. He learned it from records, not theory books. The dub influence from Lee Perry and King Tubby lives in how he GROOVES these chords, not just how he voices them. Get the shapes clean now; the groove comes next.",
      metronome: 60,
      levelUp: "Play Gm7, C7, and A7 cleanly, cycling between them at 70 BPM with no buzzing, and complete 20+ one-minute changes between Gm7 and C7."
    },

    // ─── PLAY: SONG STUDIES ───

    {
      id: "gs-9-4",
      time: 10,
      title: "Song Study: I Didn't Know — Skinshape Soul Cycle",
      type: "guitar",
      songRef: {
        title: "I Didn't Know — Skinshape",
        src: "/i-didnt-know.mp3",
        note: "Soul cycle — maj7 and m7 chords create a warm, looping groove. One-man-band lo-fi production."
      },
      what: "Skinshape's 'I Didn't Know' uses Gm-C-A7-Dm — a soul/jazz cycle that loops endlessly with a deep groove. The tab sources show triads (Gm, C, Dm) with A7 as the dominant pivot. Start with the basic triads, then upgrade to 7th voicings (Gm7-C7-A7-Dm7) for the full Skinshape warmth. The groove matters more than the voicing.",
      setup: "Guitar. Metronome at 75 BPM (original is a laid-back soul groove). Volume 6-7 — not loud.",
      chordVoicings: { chords: ["Gm7", "C7", "A7", "Dm7"] },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Learn the basic cycle with triads first: Gm (barre, 355333) → C (x32010) → A7 (x02020) → Dm (xx0231). Each chord gets 4 beats. Loop it 8 times at 60 BPM. Get the transitions clean before adding any groove.", why: "The progression works even with simple triads. Starting here lets you focus on the harmonic motion — Gm pulls to C, C pushes to A7, A7 resolves to Dm, and Dm circles back to Gm. This is a iv-bVII-V-i cycle — Gm and C function like a ii-V in F major, but they resolve through A7 back to Dm. It's a jazz-influenced progression simplified for guitar." },
        { text: "Now upgrade: replace Gm with Gm7 (353333), C with C7 (x32310), and Dm with Dm7 (xx0211). Keep A7 as is. Play the upgraded cycle: Gm7-C7-A7-Dm7. Hear the difference — richer, warmer, more Skinshape.", why: "The 7th voicings add the harmonic depth that defines the Skinshape sound. Each chord now has four notes instead of three, creating a denser, more colorful harmonic palette. This is what separates folk guitar from soul guitar." },
        { text: "Add the groove: strum down on beat 1, muted scratch on beat 2, down-up on beat 3, scratch on beat 4. The scratches are ghost strums — your right hand hits the strings but your left hand mutes them. This creates the rhythmic pocket that Skinshape's guitar sits in.", why: "Ghost scratches between chord hits add percussive texture — the guitar becomes a rhythm instrument, not just a harmonic one. Skinshape records drums first and improvises guitar over the groove. His guitar playing IS rhythmic." },
        { text: "Turn on the backing track. Play the Gm7-C7-A7-Dm7 cycle with the ghost-scratch groove. Sit in it for 3-4 minutes. Don't rush the changes. The groove should feel lazy, behind the beat, like the chord changes happen a fraction late.", why: "Behind-the-beat feel is essential to soul music. If your changes land exactly on the metronome click, you're too precise. Let them drag slightly — the listener feels the groove pull them forward." },
        { text: "Record yourself playing the full cycle with groove for 2 minutes. Listen back: can you hear the ghost scratches? Do the chord changes feel relaxed? Does it sound like soul music or like a chord exercise? If the latter, relax your grip, soften your strum, and play it again.", why: "Recording reveals the gap between what you feel and what you produce. Soul music requires relaxation — tension in your body translates to tension in the sound. If it sounds stiff, your grip is too tight." }
      ],
      feel: "This should feel like a late-night session — warm, unhurried, the kind of groove that makes people close their eyes and sway. The ghost scratches should feel percussive and natural, like your hand is dancing on the strings. If you're nodding your head, you've found the pocket.",
      wrong: "If the ghost scratches sound like regular strums, you're not muting enough — press your fretting hand lightly across the strings to deaden them completely. If the chord changes feel rushed, slow the metronome to 65 BPM. If it sounds like a jazz exercise instead of a soul groove, you're thinking too hard — stop analyzing and just ride the loop.",
      sarah: "Gene, Skinshape is a one-man-band. Will Holland records the drums first — usually a simple breakbeat on a 4-track — then improvises guitar over the groove until something sticks. His influences are Lee Perry, King Tubby, and 1960s dub production. That means SPACE in the guitar part. Don't fill every beat. Let the ghost scratches breathe. The magic of 'I Didn't Know' is that the guitar sounds effortless because Holland recorded take after take until it felt like floating. Here's what audio analysis reveals about the technique: Skinshape's rhythm is dub-influenced — he often rests on beat 1 and strikes on the off-beats. The chords are played as partial barres on just the top 3-4 strings, funk/reggae style, not full open shapes. He slides into each chord from a half-step below, giving every change a smooth 'wah' attack. And the chords are cut off almost immediately with left-hand muting — think staccato soul. The feel is swung 16ths at about 82 BPM.",
      metronome: 75,
      recorder: true,
      levelUp: "Play the Gm7-C7-A7-Dm7 cycle with ghost-scratch groove at 80 BPM for 2 minutes straight — chord changes relaxed and behind the beat, ghost scratches clearly audible, no stops or hesitations."
    },
    {
      id: "gs-9-5",
      time: 8,
      title: "A Dorian Mode — The Brighter Minor",
      type: "guitar",
      what: "A Dorian is A natural minor with ONE note raised: F becomes F#. That single sharp transforms the scale from dark and heavy to bright and hopeful — still minor, but with an inner warmth. It's the scale underneath soul music, funk, and Santana. A-B-C-D-E-F#-G. The F# is the secret ingredient.",
      setup: "Guitar. Drone on A. Metronome at 70 BPM.",
      fretboard: { scale: "a-dorian", position: 1 },
      drone: { root: "A", octave: 2, texture: "warm" },
      steps: [
        { text: "Play A natural minor ascending: A-B-C-D-E-F-G-A. Now play A Dorian: A-B-C-D-E-F#-G-A. The ONLY difference is F vs F#. Play both scales back to back three times. When you reach the 6th degree, pause: play F natural, feel the string under your finger at the 1st fret of the high E — notice how the note sits heavy against the drone, the guitar body resonating with a dark, closed quality. Now shift one fret higher to F# — feel the string tension increase slightly, and hear how the drone interaction opens up, the resonance brightening against your chest. That one-fret shift is where the brightness lives.", why: "Isolating the single note difference between natural minor and Dorian makes the scale change tangible, both in your ear and in your body. The physical difference is tiny — one fret — but the resonance feedback from the guitar body is dramatically different. Training yourself to feel that shift in your chest builds a somatic shortcut: you'll eventually reach for the brighter note by feel, not by fret number." },
        { text: "Play A Dorian in the 5th fret position. The F# is on the 4th string, 4th fret (or 2nd string, 7th fret in position). Ascend and descend 4 times, emphasizing F# each time you pass through it. Land on it, hold it, let it ring against the drone.", why: "The F# is the 6th degree — the note that DEFINES Dorian. In natural minor, the 6th is flat (F natural), creating darkness. Dorian's raised 6th creates a bittersweet brightness. Every time you hit F#, you're choosing light over dark." },
        { text: "Improvise using ONLY four notes: A, C, E, F#. Before each phrase, hear the next note forming in your mind — feel where it lives on the fretboard. A is the 5th fret, your home base. C is two frets up — your hand knows that distance. E is the open string or the 7th fret. F# is the 4th fret of the D string — a reach that your fingers anticipate before they move. Play freely for 2 minutes over the drone, letting each note be heard internally before your fingers execute it.", why: "Four notes is manageable and reveals the Dorian flavor clearly. The A-C gives you minor, the F# gives you Dorian brightness. Audiating each note before playing it — hearing the pitch and feeling the fretboard distance — transforms this from a scale exercise into intentional melody-making. Your fingers serve your ears, not the other way around." },
        { text: "Now play the full Dorian scale over the backing track. Let the soul groove carry you. Emphasize F# when you want brightness, lean on C when you want minor darkness. You're painting with two emotional colors within one scale.", why: "The push-pull between C (minor 3rd, dark) and F# (Dorian 6th, bright) is the emotional engine of Dorian mode. Soul music lives in this tension — never fully dark, never fully bright. Bittersweet." },
        { text: "Comparison test: improvise for 1 minute in A natural minor (with F natural). Then 1 minute in A Dorian (with F#). Record both. Listen back — the natural minor sounds heavier, more resigned. Dorian sounds warmer, more hopeful. Same root, same minor 3rd, one note different.", why: "Direct comparison burns the Dorian color into your ear. After this exercise, you'll hear the difference in every soul record you play. The raised 6th is a choice — you're choosing warmth over heaviness." }
      ],
      feel: "Dorian should feel like sunshine through a window on a cool morning — there's warmth, but there's also shade. It's minor but not defeated. When you land on the F# over the drone, it should feel like a door opening, letting light into a dark room.",
      wrong: "If it sounds like regular pentatonic, you're avoiding the F#. Hit it deliberately — it's the whole point. If it sounds too bright or major, you might be playing F# too often without grounding yourself on A and C. The root and minor 3rd keep it minor; the F# adds the brightness within that minor frame.",
      sarah: "Gene, Dorian is the scale underneath almost every soul and funk groove you love. When Khruangbin plays over Am-G vamps, Mark Speer reaches for Dorian because it has that warm, not-quite-sad quality. It's the difference between sitting in the rain (natural minor) and watching the rain from inside by a fire (Dorian). Your desert blues was ambiguous — neither major nor minor. Dorian is minor but warm. A new emotional temperature for your playing.",
      metronome: 70,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true,
      levelUp: "Play A Dorian ascending and descending at 80 BPM, then improvise for 1 minute emphasizing the F# as the Dorian color note, and correctly identify the difference between A Dorian and A natural minor by ear."
    },
    {
      id: "gs-9-6",
      time: 7,
      title: "Ghost-Note Groove — Muted Scratches for Soul Texture",
      type: "guitar",
      what: "Ghost notes are muted string scratches between your real chord hits. They add percussive texture — 'chk chk' sounds that turn your guitar into a drum kit and a harmonic instrument simultaneously. This is the engine underneath funk, soul, and reggae grooves. Your right hand never stops moving; your left hand controls which strums ring and which ones thump.",
      setup: "Guitar. Metronome at 80 BPM. Am7 chord shape.",
      steps: [
        { text: "Hold Am7. Strum down on beat 1 — let it ring. Now on beat 2, strum down but LIFT your fretting fingers slightly so they mute the strings. You should hear a percussive 'chk' instead of a chord. Beat 3: ring. Beat 4: mute. Alternate: ring-chk-ring-chk. 8 bars.", why: "The ghost note is a muted strum — same hand motion, different fretting hand pressure. Your right hand keeps constant motion (the pendulum from Level 1). Your left hand toggles between fretting and muting. This division of labor is the foundation of funk and soul rhythm guitar." },
        { text: "Now add upstrokes: down (ring) - up (chk) - down (chk) - up (ring). The pattern is reversed on the upbeats. 8 bars at 80 BPM. The constant 8th-note motion with alternating ring and mute creates a driving soul groove.", why: "When ghost notes appear on BOTH downstrokes and upstrokes in varying patterns, the guitar becomes a rhythm instrument. The listener hears a continuous texture — chord, percussion, chord, percussion — woven into one sound." },
        { text: "Apply the ghost-note groove to the Skinshape cycle: Gm7 (ring-chk-ring-chk) → C7 (same pattern) → A7 (same pattern) → Dm7 (same pattern). The groove pattern stays identical while the chords change. 4 times through the cycle.", why: "Keeping the ghost-note pattern consistent across chord changes creates a rhythmic foundation that the harmony rides on top of. The groove is the engine; the chords are the scenery passing by." },
        { text: "Experiment with different ghost-note placements: try all downbeats muted and all upbeats ringing (the opposite of what feels natural). Try double ghosts: chk-chk-ring-chk. Find 2-3 patterns that feel good to you.", why: "There's no single 'correct' ghost-note pattern. Different placements create different grooves — some funkier, some more laid-back. Finding patterns you enjoy is how you develop your own rhythmic personality." },
        { text: "2-minute groove freestyle: hold Am7 and create a ghost-note groove. Let the pattern evolve — start simple (ring-chk-ring-chk), then add complexity. When it starts to feel like a drum beat played on guitar, you're in the zone. Record it.", why: "Extended groove practice builds muscle memory in both hands. The goal is automaticity — ghost notes should become reflexive, not calculated. When your hands groove without your brain directing every strum, the technique has been internalized." }
      ],
      feel: "Ghost notes should feel percussive and addictive — like playing a snare drum with your strum hand while the chord tones peek through. When the groove locks in, you'll feel your body start to move. The muted scratches should sound crisp and dry, not muddy.",
      wrong: "If the ghost notes ring instead of thump, you're not lifting your fretting fingers enough — they need to touch the strings lightly without pressing to the frets. If the ghost notes kill your strumming momentum, remember: your right hand NEVER changes what it does. The pendulum swings constantly. Only the left hand toggles between fretting and muting.",
      sarah: "Gene, every soul and funk guitar player uses ghost notes — it's how Nile Rodgers makes 'Le Freak' groove, how Curtis Mayfield made the Impressions swing. Skinshape's guitar parts are 50% ghost notes. The actual chord tones poke through the rhythmic texture like islands in a river of percussion. This technique transforms your guitar from a chord-strumming instrument into a one-person rhythm section.",
      metronome: 80,
      recorder: true,
      levelUp: "Play a ghost-note groove on Am7 at 90 BPM for 1 minute with crisp, dry muted scratches clearly distinct from ringing chord hits, and apply the same groove pattern across a Gm7-C7-A7-Dm7 cycle."
    },

    // ─── PLAY: MORE SONG STUDIES ───

    {
      id: "gs-9-7",
      time: 8,
      title: "Song Study: Chewing Gum — The 7th That Appears and Vanishes",
      type: "guitar",
      songRef: {
        title: "Chewing Gum — Cotton Jones",
        src: "/chewing-gum.mp3",
        note: "The 7th that appears and vanishes — Am-D-Dm7 with subtle harmonic shifts. Psychedelic folk."
      },
      what: "Cotton Jones' 'Chewing Gum' uses Am-D-Dm7-Dm at 120 BPM — a psychedelic folk progression where the 7th chord appears for just one bar, adding a momentary color that shifts the entire mood. The Dm7→Dm transition is the heart of the song: the 7th (C note) appears, then vanishes. Learn to play this subtle trick and deploy it in your own progressions.",
      setup: "Guitar. Metronome at 100 BPM (build up to 120).",
      chordVoicings: { chords: ["Am", "D", "Dm7", "Dm"] },
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Play the progression slowly: Am (4 beats) → D (4 beats) → Dm7 (4 beats) → Dm (4 beats). Focus on the Dm7→Dm transition — all you're doing is moving one finger (the 7th disappears). Play the cycle 8 times at 80 BPM.", why: "The Am-D motion is bright and open (minor to major). Then D shifts to Dm7 — suddenly darker, with the added 7th creating smokiness. Then Dm7 drops to Dm — the 7th vanishes, and you're left with a bare, slightly haunted minor chord. It's a story in four chords." },
        { text: "Isolate the money move: play only Dm7 (xx0211) for 4 beats, then Dm (xx0231) for 4 beats. Back and forth, 8 times. The ONLY difference is the 1st string: 1st fret (Dm7) vs. open (Dm, with finger on 2nd fret of 1st string — actually lifting the bar). Feel the C note (7th) appear and disappear.", why: "This is the major→minor trick applied to chord extensions. The 7th appears as a decoration, not a permanent resident. Learning to add and remove the 7th within a progression gives you a subtle harmonic tool that most guitarists never develop." },
        { text: "Play the full progression at 100 BPM with a light strum — Cotton Jones has a psychedelic folk feel, not a heavy groove. The strum should be gentle, almost accidental-sounding. Let the strings ring between chords.", why: "Cotton Jones' production is hazy and soft-focused. The guitar sits in reverb and sounds almost improvised. Matching this feel means light touch, ringing strings, and a slightly loose sense of time." },
        { text: "Try adding one ghost note per bar — just one 'chk' on beat 3 of each chord. This adds subtle rhythmic texture without turning it into a funk exercise. The ghost note should be barely noticeable.", why: "A single ghost note per bar adds subconscious rhythmic interest. It's not funky — it's textural. This is how indie and psych-folk guitarists add groove without changing the genre." },
        { text: "Record the full progression at 110-120 BPM for 2 minutes. Listen back and focus on the moment Dm7 arrives — can you hear the color change? Can you feel it shift back when Dm replaces it? That fleeting 7th is the entire personality of the song.", why: "At tempo, the Dm7 moment passes quickly — it's a flash of color, not a sustained wash. Training your ear to catch it at speed means you'll start noticing these micro-harmonic shifts in every song you hear." }
      ],
      feel: "This should feel dreamy and slightly psychedelic — like a memory that keeps almost coming into focus. The Am-D is bright, the Dm7 adds a shadow, the Dm settles into quiet darkness. The whole cycle should feel like a gentle emotional wave.",
      wrong: "If all four chords sound the same, slow down and isolate the Dm7→Dm transition. The difference is subtle but real. If the strum is too heavy, lighten up — Cotton Jones is not a heavy band. If you're playing it like a rock song, soften everything by half.",
      sarah: "Gene, Cotton Jones is one of those bands where the simplicity is deceptive. Matt Jones builds these gently psychedelic folk worlds with almost nothing — three chords and a ghost. 'Chewing Gum' is Am-D-Dm7-Dm. That's it. But the Dm7 moment is like a color filter flickering on and off. Most listeners can't name what they're hearing, but they feel it. That's the magic of 7th chords used as passing colors rather than permanent fixtures.",
      metronome: 100,
      recorder: true,
      levelUp: "Play Am-D-Dm7-Dm at 120 BPM for 2 minutes with light strum and a single ghost note per bar, and identify the Dm7 moment by ear when listening back."
    },
    {
      id: "gs-9-8",
      time: 9,
      title: "Song Study: Texas Sun — Speer Melody Over Soul Chords",
      type: "guitar",
      songRef: {
        title: "Texas Sun — Khruangbin & Leon Bridges",
        src: "/texas-sun.mp3",
        note: "Mark Speer's melody floats over soul chords. Listen to the space and the flatwound guitar tone."
      },
      what: "Khruangbin and Leon Bridges' 'Texas Sun' sits on Am-G for the verses and opens up to Em-Bm for the bridge. At ~98 BPM, it's a slow-burning soul groove. The guitar part is NOT a strum — it's Speer-style single-note melody lines floating over the chord changes. Your job: play the chord changes, then add melody on top, then combine them.",
      setup: "Guitar. Metronome at 90 BPM (build to ~98). Volume at 7, tone at 5-6 — warm, not bright.",
      chordVoicings: { chords: ["Am", "G", "Em", "Bm"] },
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Play the verse vamp: Am (4 beats) → G (4 beats). Loop it 16 times. This two-chord vamp is the foundation — everything else sits on top. The strum should be gentle, behind the beat, with lots of space. Don't fill every beat.", why: "Am-G is one of the most common progressions in music, but Khruangbin makes it feel vast by what they DON'T play. Mark Speer leaves 60% silence. The space is the music. Start by learning to hold back." },
        { text: "Now add the bridge: Am-G (4 bars) → Em (4 beats) → Bm (4 beats) → hold (4 beats). The bridge opens up the harmony — Em adds brightness, Bm adds weight. The hold bar lets the progression breathe before cycling back.", why: "The bridge breaks the Am-G trance with new harmonic territory. Em-Bm creates a wider harmonic arc — you're traveling further from home before returning. This is Speer's songwriting at its most elegant: minimal chords, maximum emotional range." },
        { text: "Switch to single notes: over the Am-G vamp, play melody notes from A Dorian (A-B-C-D-E-F#-G) on the top 2 strings. Before each note, hear it forming in your inner ear — feel where it lives on the fretboard, the specific fret and string your finger will land on. Your hand knows the distance. Then play it and let it ring for a full beat or more. Start with just 2-3 notes per bar — long, sustained, with space between them. Think of each note as a sentence, not a word.", why: "Mark Speer's guitar melodies are famously sparse. He plays one note, lets it ring for a full beat or more, then plays the next. The hear-feel-play cycle (audiate the pitch, feel the fretboard position, then execute) is how Speer plays — every note is intentional, pre-heard, chosen. Playing too many notes is the most common mistake when trying to sound like Khruangbin." },
        { text: "Combine: strum Am-G gently with your fretting hand, then pick a single melody note between the strums. Strum → note → strum → silence → strum → note. The melody and rhythm coexist but don't crowd each other.", why: "Integrating chords and melody on one guitar is the Khruangbin solo-guitar approach (when performing without bass). It requires independence between the strumming rhythm and the melody placement — a skill that transfers to every style you play." },
        { text: "Play the full arrangement over the backing track: Am-G verse with Dorian melody notes, then the Em-Bm bridge. Record 3 minutes. When listening back, check: is there enough silence? If every beat has sound, cut half your notes.", why: "Khruangbin's motto could be 'less is more.' If your recording sounds busy, you're playing too much. Mark Speer's trick is to play a note, then WAIT until the silence becomes uncomfortable before playing the next one. That waiting is the sound." }
      ],
      feel: "This should feel spacious and hypnotic — like driving through Texas at sunset with the windows down. The melody notes should float above the chords like mirages. When you get it right, two chords and a few notes create an entire world.",
      wrong: "If it sounds like a guitar lesson instead of a song, you're playing too many notes. Cut your melody notes in half. If the strum overwhelms the melody, turn down your strumming intensity — the chords should be whispered, not spoken. If it sounds nothing like Khruangbin, check your tone: volume 7-8, tone 5-6, warm and slightly dark. Bright and trebly is the opposite of the Speer sound.",
      sarah: "Gene, Mark Speer plays a Strat with DiMarzio DP186 pickups and D'Addario Chromes flatwound strings. His volume lives at 7-8, tone at 5-6. He uses a DS-1 with the gain almost off — it's not distortion, it's just adding body. And a parked wah — the wah pedal is ON but not moving, filtering the tone to one specific frequency. That's why his guitar sounds like no one else. You can't get his exact tone without flatwounds, but you can get the FEEL by playing warm, playing sparse, and leaving 60% silence. Listen for the sliding double-stop riff high on the neck — around the 12th-14th frets on the top 2 strings. Speer uses hybrid picking here: flatpick for bass notes and single lines, while his middle and ring fingers pluck the top strings for the double stops. He also hammers onto the major 3rd from sus4 positions on his G major triad shapes. The song is sparse and melodic, not traditional strumming — partial barres and small 3-note triad shapes on the top 3 strings, with 60%+ silence. The tone comes from a parked wah plus spring reverb. Here's a crucial lesson from this song: the guitar is a RESPONDER, not a constant presence. When Leon Bridges sings, the guitar drops out entirely — sometimes for a full beat or two. It only enters to 'answer' the vocal phrase with a short melodic fill. Then silence again. This call-and-response between voice and guitar is the essence of the Texas Sun groove. Practice laying out: play a short fill, then lift your hands off the strings and COUNT the silence.",
      drone: { root: "A", octave: 2, texture: "analog" },
      metronome: 90,
      recorder: true,
      levelUp: "Play the Am-G verse vamp with 2-3 Dorian melody notes per bar at ~98 BPM, transitioning smoothly to the Em-Bm bridge, with at least 50% silence in the melody part — confirmed by recording."
    },

    // ─── JAM: EXTENDED TECHNIQUES ───

    {
      id: "gs-9-9",
      time: 8,
      title: "Khruangbin Three-Note Voicings — Top Strings Only",
      type: "guitar",
      what: "Mark Speer plays chords using ONLY the top 3 strings (G, B, high E). These three-note voicings — triads without the bass — are lighter, more portable, and can be slid around the neck like samples. Learn 4-5 shapes, then slide them to create Khruangbin-style chord sequences. The bass player covers the root — you just add color.",
      setup: "Guitar. No metronome — explore the shapes freely first. Tone knob at 5 (warm).",
      steps: [
        { text: "Am triad on top 3 strings: 5th fret (G string) - 5th fret (B string) - 5th fret (high E). A small barre across fret 5 on the top 3 strings. Strum ONLY those 3 strings. Hear how different this sounds from a full Am chord — lighter, higher, more like a keyboard voicing.", why: "Three-note voicings remove the bass and mid-range from the chord, leaving only the upper harmonics. This creates space for a bass player or backing track to fill the low end. It's how Khruangbin creates their layered sound — guitar stays in the treble, bass covers the foundation." },
        { text: "G major triad on top 3 strings: open (G) - open (B) - 3rd fret (high E). Even simpler — two open strings and one fretted note. Now slide between Am (fret 5 barre) and G (open + fret 3). This two-shape move covers the entire Texas Sun verse.", why: "Moving between just two three-note shapes is manageable and musical. Speer slides between shapes like this all the time — each shape is a 'sample' he deploys over the bass. The sliding creates chromatic passing tones that add movement." },
        { text: "C major triad on top 3 strings: 5th fret (G) - 5th fret (B) - 8th fret (high E). Actually, try fret 9 (G) - 8th fret (B) - 8th fret (high E) for another inversion. Explore different positions for the same chord — each inversion has a different top note and therefore a different color.", why: "Three-note voicings are INVERSIONS — same chord, different note on top. The highest note is what the ear hears most. By moving the same triad to different positions, you change the top note and therefore the melodic voice of the chord." },
        { text: "Slide drill: play the Am shape (fret 5 barre across top 3 strings), then slide it up to fret 7 (Bm), fret 8 (Cm), fret 10 (Dm). Same shape, different frets = different chords. This is the Khruangbin superpower — one shape, moved around, creates infinite harmonic possibilities.", why: "Moveable shapes are the key to Speer's fluid style. He treats chord shapes like samples on a sampler — grab a shape, deploy it at whatever fret the music needs. This is fundamentally different from 'learning chord shapes' — it's learning ONE shape and moving it." },
        { text: "Freestyle: over the backing track, play only three-note voicings on the top 3 strings. Slide between shapes. Leave lots of space — play a voicing, let it ring for 2-4 beats, then slide to the next one. Think of each chord as a color you're dabbing onto a canvas. Record 2 minutes.", why: "Extended three-note voicing exploration builds the Khruangbin vocabulary. The goal is fluency — not knowing which shape to play at which fret, but feeling your way through the neck using your ear and the shape under your fingers." }
      ],
      feel: "Three-note voicings should feel light and portable — like watercolors instead of oil paints. Each voicing is a splash of color, not a full picture. When you slide between shapes, it should feel effortless, like your hand is traveling along a path on the neck.",
      wrong: "If you're accidentally hitting the lower strings, angle your pick or fingers to target only the top 3. If the voicings sound thin, that's correct — they're SUPPOSED to be thin. The bass fills in the rest. If you can't find the shapes, start with just the Am barre at fret 5 and slide it around — one shape is enough to start.",
      sarah: "Gene, Mark Speer literally said he thinks of guitar chord shapes like samples on a drum machine — he picks a shape and moves it around the neck to different positions. His Strat with flatwound strings and that parked wah creates a tone that's almost like a keyboard — dark, warm, rounded. When he plays three-note voicings and slides between them, each position change sounds like a new 'sample' dropping in. This approach is WHY Khruangbin can sound like they're playing a different genre every 30 seconds — the shapes stay the same, only the fret changes. The approach technique: slide into each triad stab from one fret below. Also try hammering onto the major 3rd from the minor 3rd within the chord shape — this creates a blues-to-major color shift in a single move.",
      metronome: null,
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      recorder: true,
      levelUp: "Play three-note voicings on the top 3 strings across at least 4 different fret positions, sliding smoothly between them with space and intention, over a backing track for 2 minutes."
    },
    {
      id: "gs-9-10",
      time: 8,
      title: "Dorian Soul Improv — Ghost Notes Over 7th Chords",
      type: "guitar",
      what: "Combine everything from this level: A Dorian scale, ghost-note groove technique, and 7th chord voicings. Improvise over a soul backing track using Dorian melody lines interleaved with ghost-note chord grooves. This is the full Level 9 technique stack deployed simultaneously. Guitar as rhythm section AND melody instrument.",
      setup: "Guitar. Backing track. Metronome at 80 BPM. Volume 7, tone 5-6.",
      fretboard: { scale: "a-dorian", position: 1 },
      tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      steps: [
        { text: "Start with 4 bars of Am7 ghost-note groove — ring-chk-ring-chk pattern. Establish the rhythmic pocket. Feel the groove in your forearm — the constant swing — and the 7th chord's complex vibration against your chest. A 7th chord vibrates differently from a basic triad: there's a shimmer, a richness in the resonance that you feel as warmth in the guitar body. Don't rush. Let the backing track carry you.", why: "Starting with the groove establishes the rhythmic foundation. The richer vibration of 7th chords (compared to triads) is a physical signal — your body registers the added harmonic complexity as warmth and depth in the resonance against your chest." },
        { text: "After 4 bars of groove, switch to 2 bars of Dorian melody: but before each melody phrase, hear it internally first — audiate 2-3 notes that belong over Am7, then play them on the top 2 strings. The melody should come from your inner ear, not from running the scale shape. Then drop back into 4 bars of groove. Alternate: groove → audiate → melody → groove.", why: "Alternating between rhythm and melody is how soul guitarists function in a band. Adding the audiation step between groove and melody ensures your melody phrases are intentional, not scale-pattern habits. Khruangbin's Mark Speer audibly pre-hears his phrases — each note sounds like it was chosen, not found. Switching between roles builds the musical multitasking that defines great guitar playing." },
        { text: "Try combining in the same bar: ghost-note strum on beats 1-2, single melody note on beat 3, ghost note on beat 4. The melody emerges FROM the groove instead of interrupting it.", why: "When melody notes emerge from within the ghost-note texture, the guitar sounds like one cohesive instrument rather than two alternating approaches. This is advanced soul guitar — the groove and melody are woven together." },
        { text: "Change chords every 4 bars: Am7 (groove + melody) → Dm7 (groove + melody) → Em7 (groove + melody) → Am7. Adjust your Dorian notes to fit each chord — emphasize chord tones (A-C-E over Am7, D-F-A over Dm7, E-G-B over Em7).", why: "Targeting chord tones within the Dorian scale ensures your melody lines track the harmony. Playing C over Am7 emphasizes the minor 3rd. Playing F# over Dm7 creates Dorian brightness. Your note choices color the chords from inside." },
        { text: "Extended improv: 3 minutes over the backing track. Mix groove sections and melody sections freely. Let the balance shift — sometimes mostly groove, sometimes mostly melody. Record everything.", why: "Extended improvisation integrates all the Level 9 skills into fluid, instinctive playing. Recording captures your progress and reveals patterns in your playing you might not notice in real time." }
      ],
      feel: "This should feel like being in a soul band — you're the rhythm guitarist AND the lead player, switching roles within a single bar. The groove should feel steady and locked in, and the melody notes should feel like they're being extracted from the groove, not inserted into it.",
      wrong: "If the groove falls apart when you add melody, simplify: play one melody note per 4 bars of groove. If the melody notes sound random over the chords, stick to chord tones (root, 3rd, 5th) before adding scale tones. If you lose the beat, stop the melody and re-establish the groove before continuing.",
      sarah: "Gene, this exercise is where everything from Level 9 converges. Ghost notes from Skinshape, Dorian from soul music, space from Khruangbin, 7th chords from jazz. You're not playing a genre — you're playing YOUR sound, built from all your influences. The recording of this improv will sound different from anyone else's because your mix of influences is unique.",
      metronome: 80,
      recorder: true,
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present (groove)", R: "Repeat (groove)", V: "Vary (add melody)", D: "Deconstruct (melody only)" } },
      levelUp: "Improvise for 3 minutes over a soul backing track mixing Dorian melody lines with ghost-note grooves on Am7-Dm7-Em7, switching fluidly between rhythm and melody roles — confirmed by recording."
    },

    // ─── CREATE: EXTENDED JAM ───

    {
      id: "gs-9-11",
      time: 10,
      title: "Extended Soul Jam — Your 7th Chord Groove, Recorded",
      type: "guitar",
      what: "Build a 5-minute soul jam using everything from this level. Choose your own 7th chord progression (3-4 chords), add ghost-note grooves, weave in Dorian melody lines, and use three-note voicings for contrast. This is your Level 9 showcase — a recorded performance that proves you've internalized extended harmony.",
      setup: "Guitar. Backing track of your choice. Recorder on from the start. Volume 7, tone 5-6.",
      tracks: [
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" },
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }
      ],
      steps: [
        { text: "Choose your chord progression. Options: (A) Skinshape cycle: Gm7-C7-A7-Dm7. (B) Simple soul: Am7-Dm7-Em7-Am7. (C) Cotton Jones with 7ths: Am-D-Dm7-Dm. (D) Your own — pick 3-4 chords from this level. Write it down.", why: "Choosing your own progression is the first creative decision. Each option has a different flavor: (A) is jazzy and sophisticated, (B) is warm and simple, (C) is psychedelic and subtle, (D) is personal. Pick the one that excites you most." },
        { text: "Establish the groove: play your chord progression with ghost-note rhythm for 2 minutes. No melody, just groove. Lock into the pocket. The groove needs to be automatic before you add anything on top.", why: "A groove becomes automatic through repetition. Two minutes of pure groove ensures your hands know the pattern so well that your brain is free to think about melody. Don't skip this step — the foundation determines the height of the building." },
        { text: "Add Dorian melody: over your groove, introduce single melody notes from A Dorian. Start with one note every 2 bars, then gradually increase to 1-2 notes per bar. Let the melody emerge slowly — don't dump all your ideas at once.", why: "Building density gradually is how great solos work. Starting sparse and building creates a narrative arc — the listener is pulled deeper as the piece develops. If you start at full density, there's nowhere to go." },
        { text: "Contrast section: switch to three-note voicings on the top 3 strings for 4-8 bars. This creates a texture shift — from full chords to light, high voicings. Then return to the full groove. The contrast makes both sections more impactful.", why: "Texture changes keep the listener engaged over a 5-minute piece. Moving between full chords, ghost-note grooves, single-note melody, and three-note voicings creates variety without changing the harmonic foundation. Same chords, four different textures." },
        { text: "Record the full 5 minutes. Structure suggestion: (1) groove intro, 1 min; (2) groove + sparse melody, 1 min; (3) denser melody with groove, 1 min; (4) three-note voicing contrast section, 1 min; (5) return to full groove with melodic peak, 1 min. But follow your instincts — the structure is a suggestion, not a rule.", why: "A 5-minute performance with a deliberate arc proves you can think in sections and manage long-form musical ideas. This is the difference between 'practicing chords' and 'making music.' Listen back with pride — you've come a long way." }
      ],
      feel: "This should feel like a real performance — not a practice session. You're making music for someone to listen to. The groove should feel deep and pocketed, the melody should feel expressive, and the texture shifts should feel intentional. When you listen back, it should sound like a soul guitarist playing, not a student practicing.",
      wrong: "If it sounds like an exercise, you're thinking about technique instead of music. Close your eyes and PLAY. If you lose the groove when adding melody, simplify the melody to one note per 4 bars. If the 5 minutes feel like a long time, that's the point — musical endurance builds through extended jams, not 30-second exercises. End on something clean — a groove that sits perfectly in the pocket. Your last note is what your muscle memory carries forward.",
      sarah: "Gene, this is your first real extended soul performance. Everything from this level — Skinshape's 7ths, Dorian's warm color, ghost-note grooves, Khruangbin's three-note voicings — all flowing together into a single 5-minute piece that sounds like YOU. Will Holland would record 20 takes and keep the one that felt most effortless. Leon Bridges sings like he's barely trying. Mark Speer plays like there's no audience. That relaxed confidence is the final ingredient. You've learned the vocabulary. Now speak it naturally.",
      metronome: null,
      recorder: true,
      levelUp: "Record a 5-minute soul jam using a 7th chord progression with ghost-note grooves, Dorian melody lines, and at least one texture shift to three-note voicings — with a clear arc from simple groove to melodic peak."
    }
  ]
};
