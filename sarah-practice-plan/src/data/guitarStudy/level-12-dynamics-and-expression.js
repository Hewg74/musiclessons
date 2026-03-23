import { getPitchRange } from "../appData.js";

export const level12 = {
  level: 12,
  title: "Dynamics & Expression",
  subtitle: "Volume swells, the major→minor trick, and Phrygian spice. Making the guitar breathe.",
  description:
    "Level 11 gave you fingerpicking independence — thumb and fingers working as separate musicians. Now you learn the EXPRESSIVE tools: volume swells that make the guitar sound bowed, the major→minor chord shift that DOPE LEMON and modGlyders use for instant emotional depth, dynamic range from whisper to thunder, and Phrygian mode as a color note for Spanish darkness. This is where technique serves emotion — the guitar stops being an instrument and starts breathing.",
  artists: "Current Swell, Babe Rainbow, DOPE LEMON, modGlyders",
  unlocks: "The Full Palette (Level 13)",
  review: {
    label: "Level 11 Check-In",
    time: 5,
    exercises: ["gs-11-5", "gs-11-11"],
    prompt: "Play Travis picking with alternating thumb over G-Bm-Em-D (gs-11-5). Then play your extended fingerpicking piece (gs-11-11). Fingers are independent? Time to add dynamics."
  },
  exercises: [

    // ─── DYNAMIC CONTROL ───

    {
      id: "gs-12-1",
      time: 8,
      title: "Five Shades of Am — Dynamic Precision",
      type: "guitar",
      what: "Play the same Am chord at five distinct volume levels — from barely audible to full power. Most guitarists have two volumes: on and off. You're building a 5-position volume dial inside your picking hand. This precision is what lets Current Swell build from intimate whisper to stadium anthem within a single song.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Name your five levels out loud: 1 = ppp (ghost strum, pick barely touching — the strings barely move, the guitar body is almost silent against your chest), 2 = pp (soft, intimate, fingertips only — a faint warmth in the wood), 3 = mf (medium, conversational, your default — the guitar hums steadily against your ribcage), 4 = f (strong, projecting — the resonance fills your chest cavity), 5 = fff (full power, every string ringing — the guitar body shakes against you, the sound feels as much as it is heard). Strum Am at level 1 for 4 bars. Really commit — this should be barely audible, the guitar body nearly still against your body.", why: "Naming the levels with physical sensations makes them concrete in your body, not just your ears. Each level has a distinct chest-vibration signature — from barely-there to full-body buzz. Training yourself to monitor the resonance against your chest gives you a somatic volume meter that works even in loud rooms where your ears can't gauge accurately." },
        { text: "Step through each level in order: 4 bars at level 1, 4 bars at level 2, 4 bars at level 3, 4 bars at level 4, 4 bars at level 5. Each transition should be a clear step up, not a gradual ramp. Hold each level steady — no drifting.", why: "Stepped dynamics build precision. A gradual crescendo is actually easier than holding a specific level steady. When you can lock into level 2 and STAY there for 4 bars, your dynamic control is real, not accidental." },
        { text: "Reverse: start at level 5 and step down to level 1 over 20 bars (4 bars per level). The descent is harder than the climb — your arm wants to stay loud. Controlling the decrescendo requires conscious restraint.", why: "Decrescendo control is rarer than crescendo control. Any beginner can get louder — getting quieter while maintaining tone quality and rhythmic consistency is an advanced skill. This is how albums end songs with a fade that feels human." },
        { text: "Random jumps: play 2 bars at level 3, then jump to level 1 for 2 bars, then jump to level 5 for 2 bars, then level 2, then level 4. No gradual transitions — instant shifts. Your pick hand must switch modes immediately.", why: "Instant dynamic shifts are how Current Swell creates dramatic contrast in 'Marsha' — verse to chorus hits like a wave. If you can only transition gradually, your dynamic vocabulary is limited. Jump training builds instant access to any volume." },
        { text: "Final test: play Am for 16 bars. Choose a different dynamic level for each bar — plan the sequence in your head first, then execute. Record it and listen back. Can you hear five distinct levels, or does it collapse to three?", why: "Self-assessment through recording reveals the truth. Most beginners think they're playing five levels but are really playing three. The recording tells you where your gaps are — usually between levels 1-2 (both sound quiet) or levels 4-5 (both sound loud)." }
      ],
      feel: "Your pick hand should feel like a volume knob with five click-stops — each position distinct, each one requiring a different grip pressure and arm motion. Level 1 feels like holding a butterfly. Level 5 feels like throwing a punch (but relaxed).",
      wrong: "If levels 1 and 2 sound the same, your level 1 isn't quiet enough — the pick should barely whisper across the strings. If levels 4 and 5 sound the same, your level 5 isn't committed enough — really dig in, full arm swing, every string ringing. If you lose the metronome at extreme volumes, your technique is breaking down at the edges. Slow down and stay locked.",
      sarah: "Gene, Current Swell's 'Marsha' uses the full dynamic spectrum — the intro is intimate and close-mic'd, then it builds through the verse, and when the chorus hits with that D→Dm shift, the volume opens up like a window. That contrast IS the song. DOPE LEMON does the same thing — 'Dope & Smoke' lives at levels 1-3, and the moments where it touches level 4 feel enormous because of the context. You're building the same expressive range here.",
      metronome: 80,
      volumeMeter: true,
      volumeContour: true,
      levelUp: "Can play Am at five clearly distinct volume levels and jump between any two levels instantly without losing tempo or tone quality."
    },

    // ─── VOLUME SWELLS ───

    {
      id: "gs-12-2",
      time: 8,
      title: "Volume Swell — The Bowed Guitar",
      type: "guitar",
      what: "Turn your volume knob to zero. Strike a chord. Slowly roll the volume up. The pick attack disappears — what's left is pure sustain, like a bowed violin or a pedal steel. This technique turns the guitar into an ambient, orchestral instrument. No pedals needed — just your pinky on the volume knob.",
      setup: "Guitar with accessible volume knob. Metronome at 60 BPM. Reverb or delay helpful but optional.",
      steps: [
        { text: "Locate your volume knob. Practice rolling it from 0 to 10 and back with your picking-hand pinky while your other fingers hold the pick. Do this 20 times without playing any notes — just get the motor pattern. Your pinky curls in to turn down, extends to turn up.", why: "The volume knob roll is a new motor skill for your picking hand. Most guitarists never touch the volume knob while playing. Building the pinky independence first means you won't fumble when you add strings to the equation." },
        { text: "Volume at 0. Strike Am hard — you should hear nothing (or just the acoustic ghost of the strings vibrating under your fingers and against your chest, but no amplified sound). Now slowly roll the volume up over 3-4 seconds. Feel the guitar body's resonance grow from the purely physical vibration you felt into amplified sound — the chord blooms from silence into full, with no pick attack. The transition from feeling-only to hearing is visceral: your body knew the chord was ringing before your ears confirmed it. Hold the swell at full volume, then let it ring out. 4 repetitions.", why: "The pick attack is what makes a guitar sound like a guitar. Removing it by swelling in from zero creates a completely different instrument — warm, bowed, orchestral. The moment where you feel the strings vibrating but hear nothing is a pure somatic experience of the guitar — your body registers the chord before the amplifier does." },
        { text: "Practice the timing: strike the chord RIGHT as you start rolling up. Too early and the chord dies before the volume arrives. Too late and you hear the pick attack. The sweet spot is striking the strings at the exact moment your pinky begins its roll. 8 swells, each one smoother.", why: "Timing is everything with volume swells. The strike and the roll are one coordinated motion — like a drummer's stick hitting the cymbal while the other hand grabs it for a choke. It takes practice to synchronize two hands doing different things." },
        { text: "Chain swells together: swell Am up over 3 seconds, then roll the volume back to 0 while the chord still rings. Strike the next chord (D) at volume 0, swell up, roll back down. Continuous swells: Am... D... G... each one blooming and fading like a breath. 4 cycles.", why: "Chained swells create an ambient, cinematic landscape. Each chord blooms and fades like a slow-motion ocean wave. This technique is how post-rock bands (and cinematic guitar composers like Hermanos Gutiérrez) create atmosphere with a clean guitar and no pedals." },
        { text: "Swell with the metronome: set a slow tempo (60 BPM). Strike on beat 1 at volume 0, reach full volume by beat 3, hold through beat 4, roll back to 0 during the next bar's beats 1-2, strike a new chord on beat 3. Each swell takes 2 bars. Play through Am-D-Em-C, 2 bars each. Record it.", why: "Metronomic swells prove your timing is controlled, not random. When swells align with a tempo grid, they can be used inside real songs — building verses, creating tension before a chorus, or closing out a final chord." }
      ],
      feel: "Each swell should feel like a breath — inhale (silence to full) and exhale (full to silence). The guitar stops sounding like a plucked instrument and starts sounding like a bowed one. When the attack disappears, you should feel a shift in the room — something gentler, more cinematic, more atmospheric.",
      wrong: "If you hear the pick attack at the start of each swell, your volume isn't fully at 0 when you strike. Check the knob — it needs to be ALL the way down. If the swell sounds choppy instead of smooth, your pinky is jerking the knob instead of rolling it. Slow, continuous motion. If the chord dies before the volume arrives, you're rolling too slowly — strike and roll simultaneously.",
      sarah: "Gene, this technique is all over the cinematic, ambient side of your playlist — Hermanos Gutiérrez use volume swells and tape echo to create those vast desert landscapes. Even Khruangbin uses swells in quieter moments — Mark Speer rolls his volume knob constantly to control dynamics. This isn't a gimmick — it's a fundamental expressive tool. Once you have it, your guitar can sound like a string section.",
      metronome: 60,
      recorder: true,
      volumeMeter: true,
      volumeContour: true,
      levelUp: "Can chain 4 smooth volume swells (Am-D-Em-C) with no audible pick attack, each blooming and fading in sync with a 60 BPM metronome, recorded and verified."
    },

    // ─── MAJOR→MINOR SHIFT ───

    {
      id: "gs-12-3",
      time: 8,
      title: "The DOPE LEMON Trick — D to Dm",
      type: "guitar",
      what: "Play D major. Now play D minor. Only ONE note changed — F# dropped to F natural — but the entire emotional world shifted. Bright warmth becomes bittersweet ache. This is the classic parallel major-minor trick (Beatles, Motown, soul ballads) that DOPE LEMON uses constantly: oscillating between major and minor on the same root. The shift is tiny (one fret) but the feeling is enormous.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Play D major (xx0232). Hold it and strum 4 times. Feel the brightness — sunny, open, warm. Now play D minor (xx0231). Hold it and strum 4 times. Feel the shift — the brightness curls into something bittersweet, nostalgic, slightly sad. The only difference is one finger moving one fret: the high E string drops from fret 2 (F#) to fret 1 (F).", why: "Hearing the major→minor shift in isolation makes the emotional change undeniable. One semitone — F# to F — transforms the chord's personality completely. This is the smallest possible physical change with the biggest possible emotional impact." },
        { text: "Slow alternation: strum D for 4 bars, then Dm for 4 bars. Really sit in each one — don't rush. Feel how D is like sunlight and Dm is like sunlight through a window. Both warm, but one has a layer of glass between you and the warmth. 4 cycles.", why: "Extended time in each chord lets the emotional quality sink in. Rushing between them turns it into a mechanical exercise. The point is to FEEL the shift, not just hear it. When you can describe the emotional difference in your own words, you've internalized it." },
        { text: "Fast oscillation: D-Dm-D-Dm, one bar each. Feel the flicker — bright, ache, bright, ache. This oscillation is the DOPE LEMON sound. It creates a restlessness, a sense of beauty that can't decide if it's happy or sad. That ambiguity IS the vibe.", why: "Rapid oscillation between major and minor creates emotional ambiguity — the listener can't settle into happy or sad, so they feel BOTH simultaneously. This bittersweet quality is the emotional signature of DOPE LEMON, Cotton Jones, and half of Gene's playlist." },
        { text: "Add the progression: D (4 bars) → Dm (4 bars) → G (4 bars) → Gm (4 bars). Two major→minor pairs. Feel how the trick works the same way on G→Gm — the B drops to Bb, brightness becomes ache. The progression tells a story: hope, ache, hope, ache.", why: "Applying the major→minor trick to two different root chords proves it's a universal technique, not specific to D. Any major chord can become minor by lowering the 3rd by one semitone. Once you see the pattern, you can use it anywhere." },
        { text: "Play the full DOPE LEMON cycle: D → Dm → G → Gm, 2 bars each, looping. Behind the beat. Ghost strums on the upbeats. Let it breathe. This is the complete sound — the major→minor oscillation with the laid-back feel you learned in Level 2. Record 2 minutes.", why: "Combining the harmonic trick with the rhythmic feel creates the authentic DOPE LEMON sound. The behind-the-beat strumming makes the major→minor shifts feel even more emotional — like each chord is arriving with a gentle sigh." }
      ],
      feel: "The D→Dm shift should hit you in the chest — like watching a sunset and realizing it's ending. Not SAD exactly, but poignant. The oscillation should create a gentle ache, a beautiful restlessness. When you play the full cycle with behind-the-beat feel, the guitar should sound like it's narrating a memory.",
      wrong: "If D and Dm sound the same to you, check your fingering — the high E string must change from fret 2 to fret 1. If the shift feels mechanical rather than emotional, slow down and really listen to each chord ring. If the behind-the-beat feel drops out when you add the major→minor trick, you're putting too much mental energy on the chord change. Simplify: use all downstrokes until the shift feels automatic.",
      sarah: "Gene, Angus Stone (DOPE LEMON) built his entire sound on this trick. That warm, nostalgic, golden-hour feeling in 'Dope & Smoke' and 'Honey Bones'? It's the major→minor oscillation — D→Dm, G→Gm — layered with his behind-the-beat feel and lo-fi production. Cotton Jones does it in 'Chewing Gum' (Am→D→Dm7→Dm). modGlyders does it in 'Geneva Strange' (G→Gm). This one harmonic move connects half your playlist. Learn it here, hear it everywhere.",
      metronome: 80,
      chordVoicings: { chords: ["D", "Dm"] },
      recorder: true,
      levelUp: "Can play D→Dm→G→Gm (2 bars each) behind the beat with ghost strums, looping smoothly for 2 minutes, with the emotional shift audible on each major→minor transition."
    },
    {
      id: "gs-12-4",
      time: 7,
      title: "The G→Gm Shift — Same Trick, Deeper Color",
      type: "guitar",
      what: "The major→minor trick on G. G major (320003) → G minor (310033, or 355333 as a barre). The note that changes: B drops to Bb. Same emotional shift as D→Dm, but G→Gm has a darker, more cinematic quality. modGlyders' 'Geneva Strange' uses G→Gm to turn a sunny indie song into something haunted.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Play open G major (320003). Strum 4 times, feel the warmth — G major is the most resonant open chord on the guitar, all six strings ringing. Now play Gm. Option 1: first position (310033) — move your middle finger from fret 3 on the A string down to fret 1. Option 2: barre at fret 3 (355333). Try both, choose whichever feels easier for now.", why: "G→Gm has more voicing options than D→Dm, so you need to find your preferred fingering. The first position Gm preserves the open-string resonance; the barre Gm is more portable and has a fuller, darker sound. Both are valid — it's about which serves the song." },
        { text: "Slow alternation: G for 4 bars, Gm for 4 bars. Listen to the color shift. G major is golden and warm. Gm is cooler, more mysterious — like a cloud passing over the sun. Sit in each chord and describe the feeling to yourself.", why: "G→Gm has a different emotional quality than D→Dm because G is a more resonant chord. The shift feels larger, more dramatic. Where D→Dm is nostalgic, G→Gm is cinematic — like a film score pivoting from hope to uncertainty." },
        { text: "modGlyders' 'Geneva Strange' progression: G-C-D-Gm. Play it as 2 bars per chord, medium tempo. The G-C-D feels like a standard sunny progression, and then the Gm at the end twists it. That twist is the modGlyders signature — normal chords with a surprise minor at the end.", why: "Context matters for the major→minor trick. When Gm appears AFTER a sequence of major chords, the contrast is amplified. It's not just 'now it's minor' — it's 'everything was bright and now something shifted.' That surprise is what makes the trick work in songwriting." },
        { text: "Combine both shifts: D→Dm→G→Gm→D→Dm→G→Gm, one bar each. This is the full major→minor palette. Feel how the two pairs create a rocking motion — bright, ache, bright, ache, at two different pitch levels. The harmonic rhythm creates its own groove.", why: "Two root-level major→minor pairs played together create a progression that feels endlessly restless. Neither major nor minor wins — the music is suspended in perpetual golden-hour ambiguity. This is what gives DOPE LEMON songs their staying power." },
        { text: "Experiment: take any 4-chord progression you know (Am-G-C-Em, or D-A-Bm-G) and replace ONE major chord with its minor equivalent. How does it change the story? Try replacing different chords. The major→minor trick is a tool — use it where the song needs an emotional shift.", why: "Creative application proves you understand the principle, not just the specific chords. When you can hear WHERE a major→minor shift would serve a progression, you're thinking like a songwriter, not just executing an exercise." }
      ],
      feel: "G→Gm should feel like a scene change in a film — the lighting shifts, the mood deepens, the story takes a turn. The full D→Dm→G→Gm cycle should feel like watching clouds pass over a beach — sun, shadow, sun, shadow.",
      wrong: "If the Gm sounds buzzy or muffled, check your fingering — whether you're using first position or barre, every string that should ring needs to ring cleanly. If the emotional shift doesn't land, you're switching too fast. Hold each chord for at least 4 strums and listen to it decay before moving on.",
      sarah: "Gene, modGlyders' 'Geneva Strange' is the perfect vehicle for this — it's a sunny indie song that gets haunted by that Gm at the end of the progression. And once you hear it, you'll notice the same trick in Cotton Jones' 'Chewing Gum' (the Dm7 is doing the same job) and in Allah-Las' 'Catamaran' (D→Dm shift). This is a harmonic fingerprint across your entire playlist.",
      metronome: 80,
      chordVoicings: { chords: ["G", "Gm", "D", "Dm"] },
      levelUp: "Can play the modGlyders 'Geneva Strange' progression G-C-D-Gm at 80 BPM with clean chord changes and an audible emotional shift on the Gm."
    },

    // ─── SONG STUDY: MARSHA ───

    {
      id: "gs-12-5",
      time: 10,
      title: "Song Study: Marsha — Current Swell's Dynamic Masterclass",
      type: "guitar",
      songRef: {
        title: "Marsha — Current Swell",
        src: "/marsha.mp3",
        note: "Dynamic masterclass — verse whisper to chorus explosion. Listen for the D→Dm shift at the chorus."
      },
      what: "Current Swell's 'Marsha' is a 6-chord song (Dm-C-G-F-Bb) at 116 BPM with a distinctive intro riff and the D→Dm magic moment. The song starts intimate and builds to full band power — a complete dynamic arc in 4 minutes. You'll learn the chords, the intro riff, and most importantly, the dynamic shape that makes this song breathe.",
      setup: "Guitar. Metronome at 90 BPM (learn slow, target 116). Capo optional.",
      steps: [
        { text: "Learn the chord progression: F (133211) - G (320003) - Bb (x13331) - C (x32010) - D (xx0232) - Dm (xx0231). Play through all 6 chords slowly, one strum each, to locate each shape. Note: F and Bb are barre chords — you learned these in Level 5. D and Dm are your new friends from exercises 3-4.", why: "Six chords is a lot for one song, but you already know most of them. Mapping the chord shapes first means you can focus on dynamics and feel later, not on finding fingerings. The D→Dm transition should already feel natural from exercises 3-4." },
        { text: "The main progression: F-G-Bb-C, 2 bars each. Strum at medium volume with a relaxed, behind-the-beat feel. This is the verse — warm, conversational, intimate. Don't rush. Let each chord ring into the next.", why: "The verse of 'Marsha' is understated — the dynamics are at level 2-3. The warmth comes from letting the chords breathe and keeping the strum relaxed. Trying to sound impressive here would ruin the song. Less is more." },
        { text: "The magic moment: after the verse, play D for 4 bars, then Dm for 4 bars. Listen to the shift — everything you practiced in exercise 3 pays off here. The song pivots from major to minor on the same root, and the emotion deepens instantly. This is the heart of 'Marsha.'", why: "The D→Dm moment in 'Marsha' is the emotional climax of each verse cycle. Current Swell don't add louder strumming or more instruments — the harmonic shift alone creates the drama. When the chord change IS the arrangement, dynamics serve the harmony." },
        { text: "Dynamic arc: play the full progression (Dm-C-G-F-Bb) 3 times. First time at level 2 (quiet, intimate). Second time at level 3 (medium, conversational). Third time at level 4 (strong, opening up). Feel how the same progression tells a different story at each volume.", why: "Dynamic arcs across repetitions are how songs build without adding instruments. The first pass plants the idea. The second develops it. The third blooms. Current Swell use this exact approach — same chords, growing dynamics." },
        { text: "Learn the intro riff from tab (search 'Marsha Current Swell tab' on Ultimate Guitar — the intro is a distinctive melodic figure). Play it at 90 BPM until clean, then work up toward 116. The intro should sound like a voice calling out. Record the full song: intro → verse (quiet) → verse (medium) → verse (full) → D→Dm moment.", why: "The intro riff anchors the song — it's what makes 'Marsha' immediately recognizable. Learning it from tab rather than from chord shapes builds your ability to read and play specific melodic lines. The full song performance ties together everything in this level." }
      ],
      feel: "The verse should feel like telling a story to one person sitting next to you. The D→Dm moment should feel like the story reaching the part where your voice catches in your throat. The dynamic build should feel like the room slowly filling with people who came to hear the story.",
      wrong: "If all three dynamic passes sound the same volume, you're not committing to the quiet levels. The first pass should be almost whispered. If the D→Dm shift doesn't feel emotional, hold D for longer — really sit in the major brightness before letting it curl into minor. If the intro riff is too hard at tempo, stay at 90 BPM — accuracy over speed.",
      sarah: "Gene, Current Swell is from your island-vibes world — they're Canadian but their sound is pure coastal sunset. 'Marsha' is the perfect Level 12 vehicle because it combines everything: barre chords you learned in Level 5, the major→minor trick from this level, and a dynamic arc that goes from whisper to anthem. Scott Chicken's guitar playing is all about restraint — he holds back so the moments where he opens up feel massive. The actual strum pattern is D-D-U-U-D-U with continuous 16th-note right-hand motion. The solo acoustic intro (0:00-0:20) perfectly isolates this pattern — listen to those first 20 seconds on repeat and match it exactly before adding the full band feel. The song sits at about 108 BPM with dynamic contrast between softer verse and louder chorus. In Marsha, the guitar matches the vocal dynamics — softer and more muted during verses when the voice is intimate, louder and fuller during choruses when the voice opens up. This is dynamic sympathy: your guitar volume should follow the emotional arc of the melody. If you're going to sing over this, practice dialing your strum volume up and down to match imagined vocal phrases.",
      metronome: 90,
      chordVoicings: { chords: ["F", "G", "Bb", "C", "D", "Dm"] },
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      recorder: true,
      levelUp: "Can play 'Marsha' (Dm-C-G-F-Bb) from start to finish with a clear 3-level dynamic arc and an emotionally effective D→Dm shift, at 100+ BPM."
    },

    // ─── PHRYGIAN COLOR ───

    {
      id: "gs-12-6",
      time: 8,
      title: "Phrygian Spice — The Bb Over Am",
      type: "guitar",
      what: "A Phrygian mode = A-Bb-C-D-E-F-G. You already know Am pentatonic (A-C-D-E-G). The new note is Bb — one fret above A, a half-step that gives a Spanish, dark, exotic flavor. You're NOT learning a whole new scale system. You're adding ONE color note to your existing Am vocabulary. That Bb is like a drop of hot sauce — a little goes a long way.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Play the Am pentatonic scale you know from Level 1: A(5th fret low E) - C - D - E - G - A. Play it up and down 4 times. This is your home territory — comfortable, familiar, the sound of half your playlist.", why: "Starting from the known scale grounds you. The Phrygian color note is an ADDITION to your vocabulary, not a replacement. You need to feel the pentatonic as 'home' so the new note feels like a deliberate departure." },
        { text: "Now add Bb — one fret above A, at fret 6 on the low E string. Play: A-Bb-A. Feel how close these two frets are — barely a finger-width apart, the smallest distance on the fretboard. That physical closeness creates the MOST musical tension. The drone is vibrating A through the guitar body into your chest. When you play Bb, the resonance becomes restless, the guitar body's vibration turns slightly sour against your sternum. Come back to A — feel the resonance settle, your body relaxing with the resolution. That half-step creates friction, darkness, a Spanish flavor. Try it higher: E(12th fret)-F(13th fret)-E. Same half-step, same body-level tension and release. 8 repetitions at each position.", why: "The Phrygian b2 (Bb in A Phrygian) is the most distinctive interval in the mode. The somatic experience — body tension on the dissonance, body release on the resolution — is a faster feedback channel than conscious listening. Your chest tells you when to resolve before your theory brain does. Just touching it and resolving back to the root creates instant Spanish/North African flavor without learning a whole new scale." },
        { text: "Play Am pentatonic but substitute Bb for one of the approach notes: instead of G→A, try Bb→A (from above). Instead of jumping C→A, slide Bb→A on the way down. The Bb becomes a chromatic approach note — a dark doorway back to the root.", why: "Using Bb as an approach note (rather than a scale degree) integrates it into your existing vocabulary without disrupting your pentatonic foundation. You're adding spice, not changing the recipe." },
        { text: "Improvise over the drone: play Am pentatonic for 4 bars, then add ONE Bb touch, then 4 more bars of pentatonic. The Bb should appear like a flash of color — unexpected, dark, then gone. Don't overuse it. 2 minutes.", why: "Restraint is the key to color notes. If you play Bb constantly, it stops being special and starts sounding like you're playing in a different key. The power of the Phrygian b2 comes from its rarity — a drop of hot sauce, not the main course." },
        { text: "Listen to Tinariwen and Hermanos Gutiérrez while paying attention to the half-step tensions in their melodies. Those dark, Spanish-sounding moments? Often a Phrygian b2. Now improvise for 2 minutes: Am pentatonic with occasional Bb touches, over the drone. Channel the desert. Record it.", why: "Connecting the theoretical concept to music you already love makes it stick. When you hear the Phrygian b2 in Tinariwen, you'll feel ownership over the sound — it's not an abstract scale, it's a color you recognize and can now produce yourself. Color notes like the Phrygian b2 (Bb over Am) need time to settle into your ear. Practice hearing and playing it today, then sleep on it. The interval recognition consolidates overnight." }
      ],
      feel: "The Bb should feel like a shadow crossing the sun — brief, dark, atmospheric, then gone. Your pentatonic playing should feel like home, and the Bb should feel like stepping through a doorway into a Spanish courtyard and immediately stepping back. A moment of darkness that makes the light brighter.",
      wrong: "If you're playing Bb on every phrase, you're overdoing it — it should appear maybe once every 4-8 bars, not every bar. If the Bb sounds random rather than intentional, always RESOLVE it — Bb should almost always move to A (half step down). Unresolved Bb sounds like a wrong note; resolved Bb sounds like spice. If you can't find the Bb, it's fret 6 on the low E string, or fret 1 on the A string.",
      sarah: "Gene, this is the color that connects Tinariwen's desert blues to Hermanos Gutiérrez's cinematic guitar to the darker moments in Mystic Braves. The Phrygian b2 is North African, Spanish, Middle Eastern — it's the sound of Gene's global fusion palette. And it's just ONE note added to what you already know. Mark Speer uses this exact approach — mostly pentatonic, with Phrygian and Persian colors dropped in like spices.",
      drone: { root: "A", octave: 2, texture: "analog" },
      fretboard: { scale: "a-phrygian", position: 1, highlight: ["Bb"] },
      metronome: 75,
      recorder: true,
      levelUp: "Can improvise over an Am drone using pentatonic with Phrygian b2 color notes — Bb appears intentionally and resolves to A, creating Spanish flavor without overwhelming the pentatonic foundation."
    },

    // ─── SONG STUDY: PEACE BLOSSOM BOOGY ───

    {
      id: "gs-12-7",
      time: 8,
      title: "Song Study: Peace Blossom Boogy — Psych-Pop Boogaloo",
      type: "guitar",
      songRef: {
        title: "Peace Blossom Boogy — Babe Rainbow",
        src: "/peace-blossom-boogy.mp3",
        note: "Psych-pop boogaloo — only three chords but maximum sunshine energy. Byron Bay surf-garage."
      },
      what: "Babe Rainbow's 'Peace Blossom Boogy' is D-G7-A at ~112 BPM — three chords with a boogaloo shuffle feel. The G7 (instead of plain G) gives it a bluesy, psych-pop character. This song is all about rhythmic energy and dynamic contrast — quiet verses that explode into jangly, full-volume choruses.",
      setup: "Guitar. Metronome at 90 BPM (learn slow, target 112).",
      steps: [
        { text: "Learn the three chords: D (xx0232), G7 (320001), A (x02220). The G7 is key — it's a regular G shape with your pinky lifted off the high E string, letting the open E ring as the flat 7th (F note in G context). Strum each chord 4 times to lock the shapes.", why: "G7 is the chord that makes this song interesting. A plain G would sound like a thousand other songs; the flat 7th adds a bluesy, slightly unresolved quality. It's like the G chord has a question mark at the end." },
        { text: "The progression: D (4 bars) → G7 (2 bars) → A (2 bars). Strum with a boogaloo shuffle — not straight eighth notes but swung, like 'da-DUM da-DUM da-DUM.' Think of a 1950s rock 'n' roll rhythm with a psych-pop coat of paint. 80 BPM first, get the swing feel.", why: "The boogaloo shuffle feel is what makes Babe Rainbow sound vintage — they're channeling 1960s garage pop through a psychedelic lens. The swing turns a simple 3-chord progression into something that has a physical bounce. Your body should move." },
        { text: "Add dynamics: play the D section (verse) at level 2 — quiet, restrained, almost whispered. When the G7 arrives, bump to level 3. When the A lands, hit level 4. The progression has a built-in energy ramp: each chord gets louder. 4 cycles.", why: "Dynamic shape within a progression creates forward motion even when the tempo stays constant. The D→G7→A arc goes from contemplative to questioning to decisive — the volume should mirror that emotional journey." },
        { text: "Full Babe Rainbow energy: play the progression with the boogaloo feel at 100-112 BPM. Let the strumming get jangly and loose — open strings ringing, pick hand swinging freely. This should feel like a sunny afternoon at a backyard party. 2 minutes.", why: "Babe Rainbow's energy is infectious and unpolished — they're not trying to be perfect, they're trying to make you dance. Letting the guitar sound a little loose and jangly IS the production choice. Precision serves the feel, not the other way around." },
        { text: "Record a full performance: 4 cycles of D-G7-A. First cycle quiet (level 2). Second cycle medium (level 3). Third cycle full volume (level 4). Fourth cycle: drop back to level 2 suddenly, then build again. The dynamic drop-and-rebuild is a classic arrangement trick.", why: "The sudden dynamic drop after full volume creates a dramatic contrast — the listener thinks the song is building to a climax, and then it whispers again. This reset makes the NEXT build even more powerful. It's a songwriting trick, not just a guitar trick." }
      ],
      feel: "This should feel like a backyard party in Byron Bay — sunny, loose, danceable. The boogaloo shuffle makes your head bob. The G7 gives it a bluesy wink. The dynamics give it shape. When it's right, you can't help but smile.",
      wrong: "If the shuffle feels stiff, you're thinking about it too much. Tap your foot and let your arm swing naturally — the shuffle will emerge. If the G7 sounds the same as plain G, check that the high E string is open (not fretted at fret 3). If the dynamic arc is flat, commit harder to the quiet sections — level 2 should be barely audible.",
      sarah: "Gene, Babe Rainbow is straight from your Australian surf-garage world — they're from Byron Bay, they surf, they play psych-pop that sounds like sunshine in a bottle. 'Peace Blossom Boogy' is only three chords but the FEEL makes it special. That G7 instead of G? That's the difference between generic and groovy. And the dynamic arc — quiet to loud to quiet again — is how you make a simple song feel like a journey. The actual pattern is a syncopated 16th-note funk-lite groove: D-DU-xU-UDU where x is a muted 'chk' strum. Listen for the hammer-on on the D chord — high E from open to 2nd fret — and the signature intro riff with a sliding chordal embellishment around the open D shape.",
      metronome: 90,
      chordVoicings: { chords: ["D", "G7", "A"] },
      recorder: true,
      levelUp: "Can play 'Peace Blossom Boogy' (D-G7-A) with a boogaloo shuffle feel at 100+ BPM, with a clear 3-level dynamic arc over 4 cycles."
    },

    // ─── PReVaDe WITH DYNAMICS ───

    {
      id: "gs-12-8",
      time: 8,
      title: "PReVaDe With Dynamics — Same Notes, Different Volume",
      type: "guitar",
      what: "You learned PReVaDe in Level 3 as a motif development framework. Until now, the VARIATION step meant changing notes or rhythm. Now the variation is purely DYNAMIC — same notes, same rhythm, different volume. Present a motif quietly. Repeat it quietly. Vary it by playing it LOUDLY. Deconstruct by fading to silence. The motif never changes — only its intensity.",
      setup: "Guitar. Drone on A. Metronome at 75 BPM.",
      steps: [
        { text: "Create a simple 2-bar motif in Am pentatonic — just 3-4 notes. Something memorable and singable. Play it at medium volume (level 3). This is your PRESENT: the motif stated clearly, at conversational volume. 4 repetitions, exactly the same.", why: "A simple motif works best for dynamic PReVaDe because the variation is volume, not melody. If the motif is complex, the listener's attention goes to the notes. A simple motif puts the spotlight on DYNAMICS — which is the whole point of this exercise." },
        { text: "REPEAT: play the exact same motif 4 more times, still at level 3. The repetition declares 'this is the theme.' The listener's ear locks onto it. Nothing changes. Pure repetition. This phase establishes the baseline that makes the variation meaningful.", why: "Repetition without variation creates expectation. The listener's brain says 'I know what comes next.' That expectation is what makes the dynamic variation surprising and emotional. Without sufficient repetition, the volume change feels random." },
        { text: "VARY: before playing, close your eyes and hear the motif at full volume in your mind — audiate the INTENSITY, not just the notes. Feel what level 5 sounds like internally. Then play it: same notes, same rhythm, but now at level 5 (full power). The volume jump should feel dramatic because you pre-heard the intensity before your hands delivered it.", why: "Audiating dynamics — not just pitch — is an advanced form of inner hearing. You're pre-hearing the FEELING of full volume before executing it. This means your body commits fully to the dynamic shift because the intention preceded the action (Gordon Stage 6). Dynamic variation proves that volume IS content. The same melody at whisper volume and full volume tells two different stories. This is the core insight: dynamics are not decoration — they're meaning." },
        { text: "DECONSTRUCT: fade the motif from full volume back through each level — 5, 4, 3, 2, 1 — playing it once at each level. Each pass is quieter than the last. By the end, you're barely touching the strings. Then stop. Silence. The piece dissolves back to nothing.", why: "Deconstruction through dynamics (rather than note reduction) creates a fade-out that feels human, not mechanical. The motif doesn't simplify — it evaporates. The listener watches the idea dissolve like smoke. This is how great albums end." },
        { text: "Full PReVaDe cycle: P (4x at level 3) → R (4x at level 3) → V (4x at level 5) → D (5x, levels 5→4→3→2→1). Record the complete cycle over the drone. Listen back — does the volume variation create an emotional arc even though the notes never changed?", why: "The complete cycle proves that dynamics alone can tell a story. You presented an idea, established it, gave it power, and let it dissolve. No harmonic tricks, no rhythmic shifts — just volume as narrative. This is the most mature expression of PReVaDe so far." }
      ],
      feel: "The Present/Repeat phase should feel calm and meditative — stating a fact. The Vary phase should feel like the sun coming out from behind clouds — sudden warmth and power. The Deconstruct phase should feel like watching a bonfire die — beautiful, gradual, inevitable silence.",
      wrong: "If the Vary phase doesn't feel dramatically different, you're not committing to the volume jump. Level 3 to level 5 should be a SHOCK — not a gentle increase. If the Deconstruct feels like you're just getting tired and playing softer, be more intentional — each level is a conscious choice, not a drift. If you're changing the motif's notes during Vary, stop — the constraint is volume only.",
      sarah: "Gene, this is how Hermanos Gutiérrez build their cinematic guitar pieces — a simple melodic idea that grows and recedes in volume, creating drama without adding complexity. Tommy Guerrero does the same: a finger-picked phrase that starts quiet, blooms to full, and fades back. The notes are simple. The dynamics are the story.",
      drone: { root: "A", octave: 2, texture: "analog" },
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present (mf)", R: "Repeat (mf)", V: "Vary (fff)", D: "Deconstruct (fade)" } },
      metronome: 75,
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can perform a complete PReVaDe cycle where the ONLY variation is dynamics — same motif, same rhythm, volume goes from medium to full to silence — recorded and verified."
    },

    // ─── DYNAMIC CONTRAST IN SONG FORM ───

    {
      id: "gs-12-9",
      time: 8,
      title: "Dynamic Song Form — Quiet Verse, Loud Chorus, Whispered Bridge",
      type: "guitar",
      what: "Build a mini song structure using dynamics as the architecture. Verse (Am-D, level 2) → Chorus (G-Em, level 4) → Bridge (Dm-Am, level 1) → Chorus (G-Em, level 5). Same strumming pattern throughout. The dynamics ARE the arrangement — they tell the listener where they are in the song without a single word being sung.",
      setup: "Guitar. Metronome at 85 BPM.",
      steps: [
        { text: "Verse: Am (4 bars) → D (4 bars), level 2 (soft, intimate). Behind the beat, ghost strums, relaxed arm. This is the story being told — close, personal, quiet. Like talking to a friend. 2 passes through the verse.", why: "The quiet verse establishes the floor. Every other section will be measured against this baseline. If the verse is too loud, the chorus can't contrast enough. Start softer than feels natural — the contrast will justify it." },
        { text: "Chorus: G (4 bars) → Em (4 bars), level 4 (strong, projecting). Full strums, arm swinging wide, all strings ringing. This is the emotional release — the part where the song opens up. Transition from verse to chorus should feel like stepping from a room into sunlight. 2 passes.", why: "The chorus dynamic lift creates the emotional payoff that justifies the verse's restraint. The same chords at level 4 feel completely different than they would at level 2. Volume IS arrangement." },
        { text: "Bridge: Dm (4 bars) → Am (4 bars), level 1 (whispered). Almost inaudible — fingertips on strings, barely strumming. The bridge is the most intimate section, the private moment before the final chorus. It should feel like a secret.", why: "The bridge drops BELOW the verse in volume, creating a new floor. This makes the final chorus — which comes next — feel even MORE powerful because it's contrasting against the quietest section, not just the verse." },
        { text: "Final chorus: G (4 bars) → Em (4 bars), level 5 (full power). Everything you've got. This is the moment the whole song has been building to — the dynamic arc peaks here. The jump from level 1 bridge to level 5 chorus should feel like a wave breaking.", why: "The final chorus at level 5 (vs. level 4 for the first chorus) creates a sense of arrival. The song has gone: 2→4→1→5. That's a dynamic narrative — restraint, release, intimacy, explosion. No notes changed. Just volume." },
        { text: "Full performance: verse→chorus→verse→chorus→bridge→final chorus. Record the whole thing. Listen back for the dynamic arc — can you hear the story? Quiet setup, emotional release, quiet reset, emotional release, intimate confession, triumphant finale.", why: "A complete dynamic performance proves you can use volume as song architecture. When you write your own songs, this skill means you can arrange them for solo guitar by dynamics alone — no band needed, no overdubs, just one guitar telling a story." }
      ],
      feel: "This should feel like directing a film — each section has its own lighting, its own camera angle, its own emotional temperature. The transitions between sections should feel like jump-cuts: sudden and intentional, not gradual. The final chorus should feel like the sunrise after a long night.",
      wrong: "If all sections sound similar in volume, your level 1 isn't quiet enough and/or your level 5 isn't loud enough. Push the extremes. If the transitions feel awkward, practice each transition in isolation: verse→chorus 4 times, chorus→bridge 4 times, bridge→final chorus 4 times. If the metronome drops out during dynamic shifts, you're losing technique at the extremes. Slow down.",
      sarah: "Gene, this is exactly how your favorite songs are arranged. Current Swell's 'Marsha' does this arc. Jack Johnson's 'Breakdown' does it with fingerpicking dynamics. Even Khruangbin — their songs breathe from quiet verses to open choruses without changing complexity, just intensity. You're learning to be the entire arrangement department with one guitar and your right hand.",
      metronome: 85,
      chordVoicings: { chords: ["Am", "D", "G", "Em", "Dm"] },
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can perform a 5-section dynamic song form (verse-chorus-verse-chorus-bridge-chorus) with 4 clearly distinct volume levels, recorded and verified."
    },

    // ─── EXPRESSIVE DYNAMICS IMPROV ───

    {
      id: "gs-12-10",
      time: 8,
      title: "Expressive Improv — Dynamics as Language",
      type: "guitar",
      what: "Improvise over the soul backing track using Am pentatonic with Phrygian b2 color notes — but the primary expressive tool is DYNAMICS, not note choice. Play the same lick whispered, then screamed. Let the volume tell the story. A single note played at the right volume at the right moment is worth more than a flurry of notes at one volume.",
      setup: "Guitar. Backing track. Metronome off — let the groove guide you.",
      steps: [
        { text: "Start by playing single notes — just A and E — over the backing track at level 1 (whispered). Playing quietly means lighter touch — feel how the string barely moves under your fingertip, how the guitar body barely vibrates against your chest. Hear each note before you play it: close your eyes, audiate the pitch AND the volume level together, then execute. Hold each note for 2-4 beats. Leave enormous space. The track is doing the heavy lifting. You're adding color, not content. 2 minutes.", why: "Starting quiet forces you to LISTEN to the track rather than dominate it. The near-absence of vibration in your body is the physical version of musical restraint. Audiating both pitch and dynamics together (not just 'what note' but 'how loud') trains integrated inner hearing. At whisper volume, you're painting light brushstrokes on top of the groove." },
        { text: "Gradually introduce more notes from Am pentatonic — still quiet, still spacious. When you feel the urge to play something louder, pick ONE note and hit it at level 4. Just one. Then back to whispered. That single loud note should feel like a shout in a library — startling, meaningful, and brief.", why: "Dynamic contrast within an improvisation is what separates a musical statement from noodling. A single loud note surrounded by quiet ones creates a moment that the listener remembers. It's like a photographer using a single bright color in a muted palette." },
        { text: "Build: over the next 2 minutes, gradually let your dynamic range expand. Playing loudly means committed attack — feel the string snap back under your fingertip, the pick biting through with purpose, the guitar body resonating fully against your chest. More loud moments. Longer loud passages. But always return to quiet — feel your body settle, your arm lighten, the vibration subside. The quiet sections are the foundation — the loud moments are the peaks. The ratio should be about 70% quiet, 30% loud.", why: "The 70/30 ratio keeps the loud moments meaningful. The physical shift between quiet playing (minimal body engagement) and loud playing (full-body resonance) is your body's version of the dynamic arc the listener hears." },
        { text: "Add Phrygian color: drop in a Bb→A at a dramatic moment — play the Bb at level 4 and resolve to A at level 1. The dark note arrives with force and resolves into a whisper. That's an expressive gesture — two notes, two dynamic levels, one emotional statement.", why: "Combining the Phrygian b2 with dynamic contrast creates a signature gesture — dark tension at high volume resolving into quiet peace. This is the kind of personal vocabulary that becomes part of your sound." },
        { text: "Final 3-minute freestyle: full dynamic range, full Am pentatonic with Phrygian b2, over the backing track. Volume swells, loud accents, whispered passages, dramatic Bb→A gestures. Let the dynamics be your primary vocabulary. Record everything.", why: "Extended dynamic improvisation builds the habit of thinking in volume as well as pitch. When dynamics become as natural as note choice, your playing will have the emotional depth that distinguishes an artist from a technician." }
      ],
      feel: "This should feel like telling a story without words — the quiet passages are the narrator's soft voice, the loud moments are the plot twists, the Phrygian touches are the mysterious passages. The backing track is the setting. You're the storyteller.",
      wrong: "If everything is at one volume, you've forgotten the exercise's premise. Dynamics FIRST, notes second. If you're playing too many notes, remember: silence and space are your most powerful tools at low volume. If the Phrygian b2 sounds random, always resolve it — Bb→A, every time.",
      sarah: "Gene, this is the culmination of everything in Level 12 — dynamics, Phrygian color, volume control, expressive intent. Think of how Tommy Guerrero's instrumental pieces breathe — quiet sections that let the groove do the work, and then these moments where the guitar steps forward and says something. That contrast makes every note matter. You're building the same thing.",
      fretboard: { scale: "a-phrygian", position: 1, highlight: ["Bb"] },
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can improvise for 3 minutes over a backing track using dynamics as the primary expressive tool — recorded performance has clearly audible quiet sections, loud accents, and at least one Phrygian color moment."
    },

    // ─── EXTENDED DYNAMICS PIECE ───

    {
      id: "gs-12-11",
      time: 10,
      title: "Extended Dynamics Piece — Your Dynamic Arc",
      type: "guitar",
      what: "Compose and perform a 4-5 minute piece that uses EVERY dynamic tool from this level: volume swells, the D→Dm trick, Phrygian color, PReVaDe with dynamic variation, quiet-loud-quiet song form. This is your Level 12 capstone — a complete musical statement where dynamics tell the story. One guitar, one take, recorded.",
      setup: "Guitar. Backing track or drone — your choice. No metronome — play with rubato (flexible tempo).",
      steps: [
        { text: "Plan your arc (2 minutes): sketch a dynamic roadmap on paper or in your head. Example: Volume swell intro (30 sec) → quiet D→Dm meditation (60 sec) → Am pentatonic PReVaDe with dynamic variation (60 sec) → Phrygian color improv building to full volume (60 sec) → volume swell outro fading to silence (30 sec). Your arc should have a clear beginning, middle, climax, and ending.", why: "Planning the dynamic arc before playing prevents the piece from becoming aimless noodling. A musical structure — even a loose one — gives you permission to commit to each section fully. Professional musicians always know where a piece is going before they start." },
        { text: "Practice each section individually: the volume swell intro (smooth, no pick attack), the quiet D→Dm passage (behind the beat, level 2), the PReVaDe section (dynamic variation only), the building improv (level 1 to level 5 over 60 seconds), the volume swell outro. Get each section comfortable before chaining them.", why: "Sectional practice ensures each part of the piece is strong on its own. When you chain them together, transitions will be the only new challenge — not the content of each section." },
        { text: "First full run-through: play the entire piece from start to finish without stopping. Don't worry about mistakes — focus on the DYNAMIC ARC. Did the quiet sections feel quiet? Did the loud climax feel powerful? Did the ending dissolve properly? Note what worked and what didn't.", why: "A complete run-through reveals the shape of the piece. Individual sections might sound great in isolation but feel wrong in sequence — the first full pass shows you the flow." },
        { text: "Refine: play through again, adjusting the transitions that felt awkward. Maybe the volume swell intro needs more time to develop. Maybe the climax needs to peak later. Maybe the D→Dm section should be even quieter. Shape the arc until it feels natural — like a story with a beginning, middle, and end.", why: "Refinement is where the piece goes from exercise to art. Small adjustments to timing, dynamics, and transitions make the difference between a collection of techniques and a musical statement. This is the compositional process." },
        { text: "Final recording: one take, start to finish. Choose the backing track or drone that serves the piece best. Commit to every dynamic choice. If something goes wrong, keep going — the arc matters more than individual notes. Listen back. Does it tell a story? Does the dynamic journey make sense? This is your Level 12 portfolio piece.", why: "The one-take recording is the performance. All the practice converges here. The piece proves you can use dynamics as a storytelling tool — volume swells, major→minor harmony, Phrygian color, PReVaDe structure, and song-form dynamics in one continuous musical statement." }
      ],
      feel: "This should feel like conducting a one-person orchestra — you're simultaneously the performer and the arranger, deciding in real time how loud, how soft, how dramatic each moment should be. The piece should feel like watching a sunrise: slow, beautiful, building, peaking, and then gentle resolution.",
      wrong: "If the piece feels like a grab bag of techniques strung together, your transitions aren't smooth enough. Each section should LEAD to the next — the end of the volume swell naturally opens into the D→Dm meditation, which naturally leads to the PReVaDe section. If everything is at the same volume, you haven't committed to the quiet sections. If the recording sounds like a practice session rather than a performance, try one more take with full commitment. Before you record: what story are the dynamics telling? After: did the arc surprise you anywhere? Finish with something beautiful — close on the sound you want to carry into tomorrow.",
      sarah: "Gene, this is everything. The cinematic quality of Hermanos Gutiérrez, the dynamic breathing of Tommy Guerrero, the major→minor emotional depth of DOPE LEMON, the Phrygian darkness of Tinariwen, the PReVaDe structure that turns improvisation into composition. You're weaving your entire musical DNA into one piece — and the thread that holds it all together is dynamics. Volume as vocabulary. Expression as architecture. One guitar telling a whole story.",
      drone: { root: "A", octave: 2, texture: "warm" },
      tracks: [
        { name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" },
        { name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" },
        { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }
      ],
      volumeMeter: true,
      volumeContour: true,
      recorder: true,
      levelUp: "Can perform a 4-5 minute extended dynamics piece from memory that includes volume swells, major→minor harmony, Phrygian color, and a clear quiet→loud→quiet dynamic arc — one take, recorded, with at least 4 distinct dynamic levels audible."
    }
  ]
};
