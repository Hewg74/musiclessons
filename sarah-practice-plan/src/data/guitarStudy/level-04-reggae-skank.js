export const level4 = {
  level: 4,
  title: "Reggae Skank",
  subtitle: "Flip your rhythm upside down. The offbeat changes everything.",
  description:
    "Reggae guitar is the ultimate rhythm discipline — you play on the offbeat while everything in your musical training screams 'downbeat.' The skank (short, muted chord stabs on the 'and') is deceptively simple and maddeningly difficult. Combined with ghost notes, barre chord voicings, and the vocabulary of different riddim feels, this level transforms your rhythm playing across every genre.",
  artists: "Bob Marley, Peter Tosh, Pepper, Slightly Stoopid, Skinshape",
  unlocks: "Desert Blues (Level 5)",
  review: { label: "Levels 1-2 Check-In", time: 5, exercises: ["gs-2-3", "gs-1-3"], prompt: "Play jangle-style tremolo picking for 30 seconds with even strokes (gs-2-3). Then play a clean blues bend phrase from Level 1 (gs-1-3). Both techniques feed into reggae — tremolo becomes the skank's precision, bends become lead breaks over the groove." },
  exercises: [
    {
      id: "gs-4-1",
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
      id: "gs-4-2",
      time: 8,
      title: "The Chop — Ghost Notes Defined",
      type: "guitar",
      what: "Create the percussive staccato 'tchk' sound of reggae guitar by coordinating both hands. A ghost note is a muted, percussive hit where you hear rhythm but no pitch — pure percussion from a guitar. This is the technique that turns your strumming hand into a drum.",
      steps: [
        { text: "First, understand what a ghost note is: lay your fretting hand lightly across all the strings without pressing them to the frets. Strum. You should hear a percussive 'tchk' with no discernible pitch. That dead, muted strum is a ghost note.", why: "Ghost notes are the rhythmic skeleton of reggae guitar. They fill the spaces between chord stabs with percussion, turning your guitar into both a harmonic and percussive instrument." },
        { text: "Now practice the chop: strum an Am chord normally, then immediately release the fretting hand pressure (don't lift off — just release). The strings go dead. Add the picking hand: after the strum, bring the palm edge onto the strings near the bridge. Two-handed muting is tighter than one hand alone.", why: "Releasing without lifting keeps the strings in contact with the frets but stops them from ringing. Double muting creates the ultra-tight 'tchk' that defines reggae guitar. One hand isn't enough." },
        { text: "Practice the sequence: strum-chop, strum-chop, strum-chop. Each strum should ring for only a split second before the chop kills it. The chop should be almost instantaneous.", why: "The shorter the ring time, the more percussive the skank sounds. Aim for the chord lasting less than an eighth note." },
        { text: "Put it on the offbeat at 80 BPM. Between the chord stabs, add ghost note strums on the downbeats — these are pure muted hits that keep your strumming hand in constant motion. Pattern: ghost-STAB-ghost-STAB-ghost-STAB-ghost-STAB.", why: "The ghost notes fill the silence between skanks with rhythmic texture. Your arm never stops moving — it's strumming continuously, but alternating between muted ghost hits and open chord stabs." }
      ],
      feel: "The chop should sound like a percussion instrument — tight, short, punchy. When both hands sync up, you'll hear a clean 'tchk' instead of a messy 'brrrng.' The ghost notes should be felt more than heard — a quiet rhythmic pulse underneath the skanks.",
      wrong: "If the chords ring too long, your muting is too slow. If you hear string buzz, you're pressing too hard when you should be releasing. If there's no discernible pitch in the chop, you're muting before the strum. If the ghost notes have pitch bleeding through, press lighter — you want zero pitch, pure percussion.",
      sarah: "Ghost notes are the secret ingredient most people miss when learning reggae guitar. They think the sound is just the offbeat stabs — but it's the muted hits in between that create the continuous groove. Your arm is a metronome. The chop-and-ghost combination is what separates 'strumming on the upbeat' from actual reggae.",
      metronome: 80
    },
    {
      id: "gs-4-3",
      time: 12,
      title: "Reggae Chord Voicings — Barre Chords Unlocked",
      type: "guitar",
      what: "Learn Am7, Dm7, Cmaj7, and Gm7 voicings. The first three use open shapes, but Gm7 requires a barre chord — so this exercise teaches you the barre technique from scratch, then applies it to reggae.",
      steps: [
        { text: "Am7: play x-0-2-0-1-0. From low to high, the notes are: A(open A string)-E(2nd fret D string)-G(open G string)-C(1st fret B string)-E(open high E). That's A-E-G-C-E — a full Am7 chord with the root, 5th, b7, b3, and 5th. Listen to how the added G (minor 7th) gives it a jazzy warmth compared to plain Am.", why: "Am7 is the most common reggae chord. The open voicing is compact and bright — perfect for skanking on the top strings." },
        { text: "Dm7: play x-x-0-2-1-1. Notes: D(open D string)-A(2nd fret G string)-C(1st fret B string)-F(1st fret high E). That's D-A-C-F — root, 5th, b7, b3. A complete Dm7.", why: "Dm7 is Am7's natural partner. The two chords share notes (A and C) which makes the transition smooth." },
        { text: "Cmaj7: play x-3-2-0-0-0. Notes: C(3rd fret A string)-E(2nd fret D string)-G(open G string)-B(open B string)-E(open high E). That's C-E-G-B-E — root, 3rd, 5th, major 7th, 3rd. The B gives it a dreamy, floating quality.", why: "Cmaj7 is the resolution chord in many reggae progressions. It sounds peaceful and wide open." },
        { text: "Now for Gm7 — this requires a barre chord. A barre chord means pressing one finger flat across multiple strings at the same fret. Here's how: lay your index finger FLAT across all 6 strings at the 3rd fret. Don't curl it — flatten it so the bony edge presses evenly. Your thumb goes behind the neck, directly opposite your index finger, pushing forward. This creates a clamp.", why: "The barre is the most important technique unlock in guitar. It lets you play any chord anywhere on the neck. Most beginners struggle because they curl the finger or place the thumb wrong. The flat finger + opposing thumb is the key." },
        { text: "With the barre at the 3rd fret, add your other fingers: ring finger on the 5th fret of the A string. Leave D, G, B, and E strings barred at the 3rd fret. This is Gm7: 3-5-3-3-3-3. Notes from low to high: G-D-F-Bb-D-G. That's root-5th-b7-b3-5th-root.", why: "Gm7 is a moveable shape — slide it to any fret and you get a different minor 7th chord. At fret 5 it becomes Am7 (barre version). This one shape unlocks the entire neck." },
        { text: "Troubleshooting the barre: play each string one at a time. If a string buzzes or is dead, adjust your index finger position. Common fixes: roll the finger slightly so the harder edge presses the strings; move the finger closer to the fret wire (not on top of it, just behind it); squeeze harder with the thumb, not the finger. Spend 2 minutes getting all 6 strings to ring clearly.", why: "A clean barre takes days or weeks to develop. The muscle and callus need time. Don't be discouraged if it's not perfect today — it will improve with each session." },
        { text: "Practice switching between all four chords: Am7-Dm7-Gm7-Cmaj7. For the first three, use the open voicings. For Gm7, jump to the barre. Aim for silent switches — no sound between chords.", why: "In reggae, chord changes happen on offbeats. Fumbled changes break the groove harder than in any other genre. The Gm7 barre jump is the challenge — practice it slowly until it's smooth." }
      ],
      feel: "7th chords feel more colorful than regular chords — richer, more complex, slightly jazzy. On the top strings, they sound bright and clear, perfect for skanking. The barre chord should feel like a stretch at first but eventually become natural.",
      wrong: "If the chords sound muddy, you're including too many bass strings. Reggae guitar stays high and clear — let the bass player handle the low end. If the barre chord buzzes, don't give up; adjust your finger angle and thumb position. If your hand cramps, take a break — barre strength builds over days, not minutes.",
      sarah: "Reggae chord voicings are deliberately small and bright. You're not strumming all six strings — you're playing a tight, precise instrument that locks with the hi-hat. And the barre chord is your graduation into moveable harmony. It's hard at first, but it unlocks every chord on every fret. Worth the struggle.",
      metronome: 80
    },
    {
      id: "gs-4-4",
      time: 10,
      title: "Reggae Progressions",
      type: "guitar",
      what: "Learn two essential reggae progressions and their correct theory. Progression 1: Am-D-Am-E (i-IV-i-V in A minor — the D major is a borrowed chord from the parallel major, the E major comes from harmonic minor). Progression 2: Am7-Dm7-G7-Cmaj7 (vi-ii-V-I in C major — this is NOT a ii-V-I; the Am7 is the vi chord).",
      tracks: [{ name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Progression 1: Am-D-Am-E. Play 1 bar of each chord, skanking on the offbeat. In A minor, Am is i (home), D major is IV (borrowed from A major — it adds brightness), and E major is V (the dominant, pulling you back to Am). This is the Bob Marley feel — raw, driving, three chords and the truth.", why: "The i-IV-i-V is rawer and more powerful than jazz-influenced progressions. It doesn't resolve smoothly, which gives it tension and forward motion. Most roots reggae uses this kind of simple, strong movement." },
        { text: "Progression 2: Am7-Dm7-G7-Cmaj7. Play 2 bars of each, skanking offbeats. Understanding the theory: in the key of C major, Am7 is the vi chord, Dm7 is the ii chord, G7 is the V chord, and Cmaj7 is the I chord. So this is vi-ii-V-I — a full circle that starts on the relative minor and resolves to the major.", why: "This progression cycles beautifully because each chord leads naturally to the next through voice leading. The resolution to Cmaj7 feels like arriving home. It underpins thousands of reggae, soul, and jazz songs." },
        { text: "Play each progression for 4 minutes with the Reggae One Drop 85 backing track. Focus entirely on the groove — make each repetition feel better than the last.", why: "Reggae progressions are short loops. The magic is in making each cycle groove deeper, not in playing more chords." },
        { text: "Try both progressions at different tempos: 75, 85, 95 BPM. Notice how the feel changes with tempo. Slower is roots/dub territory. Faster pushes toward dancehall energy.", why: "Same chords, different universes. Tempo is a compositional choice that changes the entire mood." }
      ],
      feel: "Both progressions should feel like they could cycle forever. Reggae grooves are circular — there's no dramatic ending, just deeper and deeper pocket.",
      wrong: "If the progression sounds like a pop song, you're probably playing on the downbeat instead of the offbeat. If it sounds stilted, your chops aren't tight enough. If it sounds too jazzy, simplify your voicings.",
      sarah: "Bob Marley used maybe 5 chord progressions his entire career. He never needed more because the groove and the message carried everything. The theory isn't the point — the groove is. But knowing vi-ii-V-I vs. i-IV-i-V means you understand what you're playing, not just where your fingers go.",
      metronome: 85
    },
    {
      id: "gs-4-5",
      time: 10,
      title: "Riddim Vocabulary: One-Drop, Rockers, Steppers",
      type: "guitar",
      what: "Three reggae rhythmic feels that define different eras and subgenres. Each one changes the relationship between your offbeat skank and the kick drum pattern underneath. Your guitar part stays the same — the kick pattern defines the riddim.",
      setup: "Guitar. Metronome at 85 BPM or backing tracks.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "One-Drop: the kick hits ONLY on beat 3. Skank the offbeats, feel the kick on 3 only. Count: 1-chk-2-chk-KICK-chk-4-chk. This is classic roots reggae — Bob Marley, Burning Spear. The empty beat 1 creates the floating, swaying feel that defines roots reggae.", why: "The one-drop is defined by the absence of kick on beat 1. That empty downbeat is what makes reggae feel like no other music — gravity is suspended." },
        { text: "Rockers: the kick drives on all four beats — 1, 2, 3, 4 — creating a relentless, forward-moving pulse. Your offbeat skank locks between each kick. Count: KICK-chk-KICK-chk-KICK-chk-KICK-chk. This is Sly & Robbie territory — more driving and insistent than one-drop. Pepper and Slightly Stoopid often use variations of this feel.", why: "Rockers adds urgency. The steady four-on-the-floor kick underneath your offbeat guitar creates a locked, propulsive groove. It bridges reggae toward rock energy, which is why SoCal reggae-rock bands gravitate toward it." },
        { text: "Steppers: similar to rockers with kick on every beat, but HEAVIER — each kick is emphasized equally with a marching, hypnotic quality. Think dub at its most trance-like — Lee Perry, late-era Marley ('Exodus' has a steppers feel). The difference from rockers is attitude: rockers drives forward, steppers pounds downward.", why: "Steppers is the most intense riddim. The heavy, even kicks plus offbeat guitar creates a wall of groove that's almost trance-inducing at slow tempos. It's the dub producer's favorite riddim because the hypnotic pulse creates space for effects and experimentation." },
        { text: "Play each riddim for 2 minutes using the Am7-Dm7 progression. Stomp your foot on the kick pattern for each riddim — that's how you internalize the difference. Your skank stays identical; your foot tells your body which riddim you're in.", why: "Your skank stays identical — the difference is in what you're locking to. In a band context, you'd match your energy to the drummer's riddim. Alone, you internalize all three feels through the foot stomp." },
        { text: "Switch between riddims: 4 bars one-drop, 4 bars rockers, 4 bars steppers. The skank stays the same — only your internal kick changes. Notice how the SAME chords and guitar pattern become three different songs.", why: "Switching riddims is a real-world skill — some reggae songs change feels between verse (one-drop) and chorus (rockers). Your foot-stomp trains the internal clock to shift gears." }
      ],
      feel: "One-drop feels like floating. Rockers feels like driving. Steppers feels like marching. Same guitar, three completely different energies.",
      wrong: "If all three feel the same, your foot isn't stomping the kick pattern — you're only tracking the guitar skank. The kick pattern IS the difference. Exaggerate the foot stomp until you feel the distinction in your body.",
      sarah: "Gene, you already love reggae — this exercise gives you the vocabulary to understand WHY different reggae songs feel different. Pepper uses rockers-style grooves. Marley uses one-drop. The skank is the same; the feel is the riddim.",
      metronome: 85
    },
    {
      id: "gs-4-6",
      time: 10,
      title: "The Bubble — 16th Note Offbeats",
      type: "guitar",
      recorder: true,
      what: "Double the offbeat density: instead of skanking on just the 'and' of each beat (8th notes), play muted ghost strums on the 'e' and 'a' of each beat too, with the chord stab still on the 'and.' This creates the 'bubble' — a shimmering, rapid-fire reggae rhythm used in dancehall and modern reggae.",
      metronome: 75,
      steps: [
        { text: "Set metronome to 75 BPM (slower than usual — this pattern is dense). Count 16th notes: '1-e-and-a-2-e-and-a-3-e-and-a-4-e-and-a.' Your strumming hand moves continuously in a down-up-down-up 16th note pattern — it never stops.", why: "The bubble requires constant arm motion at the 16th note subdivision. Your arm is a machine — it moves on every subdivision. What changes is which strums are muted and which ring out." },
        { text: "Mute everything except the 'and' — that's where your chord stabs live. Every other subdivision gets a ghost note (muted strum). So: ghost-ghost-STAB-ghost, ghost-ghost-STAB-ghost, repeating. Your arm does down-up-DOWN-up continuously.", why: "The ghost notes between the stabs create a rapid, bubbling texture that fills the rhythmic space. It sounds like a 16th note hi-hat pattern played on guitar — rapid and shimmering." },
        { text: "Practice with Am7 for 2 minutes. The stab should pop out of the ghost notes like a bubble rising to the surface — briefly visible, then gone. Keep the ghost notes very quiet and the stabs crisp.", why: "Dynamic contrast between ghost notes and stabs is essential. If they're the same volume, you lose the rhythmic definition. The stabs are the message; the ghost notes are the texture." },
        { text: "Add chord changes: Am7 for 2 bars, Dm7 for 2 bars. The bubble pattern should continue unbroken through the changes — your arm never pauses, only your fretting hand moves.", why: "Maintaining the bubble through chord changes is the real challenge. Your right arm is a metronome that never stops; your left hand changes shapes within that constant motion." }
      ],
      feel: "The bubble should feel like a sewing machine — rapid, even, and continuous. When it's working, it creates a shimmering, hypnotic effect that's distinctly different from the simpler 8th note skank.",
      wrong: "If the ghost notes are too loud, the pattern sounds like aggressive strumming instead of a bubble. If the stabs don't pop out, increase the dynamic contrast — softer ghosts, crisper stabs. If your arm tenses up, the tempo is too fast. Drop to 65 BPM.",
      sarah: "The bubble is what makes modern reggae guitar sound so intricate. It's actually simple — your arm does the same thing over and over. The skill is in the dynamic control between the ghosts and the stabs."
    },
    {
      id: "gs-4-7",
      time: 12,
      title: "SoCal Reggae-Rock",
      type: "guitar",
      recorder: true,
      what: "Play a Pepper/Slightly Stoopid style reggae-rock jam. The formula: offbeat skanks with a rockers-style energy, bright chord voicings, and the ability to flip between reggae rhythm and rock lead breaks. This is where Caribbean groove meets California beach.",
      tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Put on Surf Rock Beat 120. At this tempo, the offbeats are faster and more energetic — this is SoCal reggae-rock territory, not roots reggae. Skank Am on the offbeats with tight chops. The chops need to be even tighter at this speed.", why: "120 BPM offbeats transform reggae from laid-back roots into driving surf-reggae. The window between beats is smaller, so your chop timing needs to shrink proportionally." },
        { text: "Use a simple i-IV-V progression: Am-D-E. This is the Pepper workhorse — three chords, driving offbeats, pure SoCal energy. Play 2 bars of each chord, skanking continuously.", why: "SoCal reggae-rock favors simple progressions played with energy and precision. The drive comes from the rhythm, not the harmony." },
        { text: "After 8 bars of skanking, drop into a 2-bar lead break using the Am blues scale from Level 1. Bends, slides, bluesy attitude. Then snap back to skanking.", why: "The contrast between rhythm and lead is the Slightly Stoopid formula. The rhythm guitarist becomes lead guitarist and back — one person filling both roles." },
        { text: "Try skanking with Mixolydian-based chords instead of minor chords. G major, C major, D major with bright offbeat rhythm. This is the sunnier side of SoCal reggae.", why: "Changing the harmonic palette while keeping the reggae rhythm creates that uniquely Californian sound — reggae groove with surf-rock brightness." },
        { text: "Experiment with the blend: what ratio of skank to lead feels right? Pepper leans more reggae. Slightly Stoopid leans more rock. Your blend is your voice.", why: "There's no right answer. Finding where you sit on the reggae-to-rock spectrum is part of developing your style." }
      ],
      feel: "This should feel energetic and fun — the best of both worlds. The reggae bounce combined with surf drive creates something that makes you want to move.",
      wrong: "If the skanks fall apart at 120 BPM, the tempo is challenging your muting technique. Practice the chop at 100 BPM first, then work up. If the lead breaks sound disconnected from the skanks, you're not transitioning smoothly enough — the groove should continue through the lead.",
      sarah: "Pepper figured out that reggae and surf aren't opposites — they're both ocean music. One from the Caribbean, one from California. Same vibe, different expression. This is one of your core genres, Gene — SoCal reggae-rock is in your DNA.",
      metronome: 120
    },
    {
      id: "gs-4-8",
      time: 12,
      title: "Full Reggae Jam",
      type: "guitar",
      recorder: true,
      what: "Extended reggae jam combining skanks, ghost notes, chord changes, riddim switching, and lead breaks. Everything from Level 4 over a backing track. This is where exercises become music.",
      setup: "Record yourself. Clean tone, reverb optional.",
      tracks: [{ name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85 BPM", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Put on Reggae One Drop 85. Start with Am7 skank and ghost notes — establish the groove for 8 bars. Get deep in the pocket before adding anything.", why: "Every reggae song starts with the groove. Let the rhythm section settle before you add complexity." },
        { text: "Work through the Am7-Dm7-G7-Cmaj7 progression (vi-ii-V-I in C). Keep the skanks tight and the ghost notes pumping. Feel the harmonic movement beneath the rhythm.", why: "Chord progressions over a solid offbeat groove with ghost notes is the heart of reggae guitar." },
        { text: "Take a 2-bar lead break — blues scale, minimal notes, then back to skanking. Skinshape style — taste, not feast. Do this 3-4 times across the jam.", why: "Brief lead breaks add variety without abandoning the groove." },
        { text: "Drop out for 4 bars. Complete silence. Switch to the Dub Reggae 85 backing track and re-enter with a different chord than you left on.", why: "Dub spaces create drama. The re-entry chord change creates a moment of surprise." },
        { text: "Build to the end by layering: skank + occasional lead + chord changes. Then drop to a single muted ghost note chop on Am7 to finish.", why: "Ending on a simple, quiet skank after a full jam is deeply satisfying. Less is more." }
      ],
      feel: "A full reggae jam should feel like a meditation — repetitive, hypnotic, and deeply groovy. When it's working, you lose track of time and just ride the pocket.",
      wrong: "If you played lead the whole time, you missed the point. Reggae guitar is primarily rhythm. If the groove broke when you changed chords, slow down the changes. If the dub spaces felt awkward, you need to trust silence more.",
      sarah: "Reggae is the most disciplined genre in guitar. The discipline IS the art. When you can hold one groove for 12 minutes and make it feel deeper every bar, you've understood something most guitarists never learn.",
      metronome: 85,
      levelUp: "You can jam reggae for 12 minutes with solid offbeats, tight ghost notes, smooth chord changes, tasteful lead breaks, and intentional dub spaces."
    },
    {
      id: "gs-4-9",
      time: 12,
      title: "Dub Space — Adding the Third Dimension",
      type: "guitar",
      recorder: true,
      what: "Skank for 2 bars, then leave 2 bars of complete silence. When you re-enter, change something — the chord, the dynamics, the riddim feel. This is the dub concept of space: letting the rhythm section breathe while your guitar disappears and reappears transformed. If you have reverb or delay, this is where it becomes an instrument.",
      tracks: [{ name: "Dub Reggae 85 BPM", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Am7 skank with ghost notes for 2 bars (8 offbeats). Then stop completely for 2 bars. Hands off the strings. During the silent bars, keep counting internally — your foot should still tap the riddim.", why: "The silent bars are where dub magic happens. In a full band, the bass and drums fill the space. You're training yourself to trust the gaps. Rhythmic awareness during silence is harder than playing." },
        { text: "Re-enter on bar 3 exactly on the first offbeat. No hesitation, no early entry. Clean re-entry is a professional skill.", why: "If you lose count, the re-entry is a disaster. The audience feels the groove drop back in — or they feel you stumble." },
        { text: "Now vary the re-entry: come back softer one time, louder another. Change the chord — leave on Am7, return on Dm7. Change the riddim feel — leave on one-drop, return on steppers.", why: "How you come back from silence defines the emotional arc. It's not just absence — it's anticipation and surprise." },
        { text: "If you have reverb or delay effects (even a phone app running through a speaker), try this: play a single stab, then let the effect carry it through the silent bars. The echoes fill the space while you rest. This is dub production on guitar.", why: "Dub was invented by producers like Lee 'Scratch' Perry and King Tubby who used studio effects as instruments. Reverb and delay turn your gaps into music — the echoes are the third guitarist." },
        { text: "Build a 5-minute piece: 2 bars on, 2 bars off, with each re-entry introducing a change. Tell a story through what you add and subtract.", why: "Dub is the art of subtraction. You're composing by deciding what NOT to play. Each silence makes the next entry more meaningful." }
      ],
      feel: "The silence should feel intentional, not empty. When you re-enter, it should feel like a wave coming back — inevitable and satisfying. If you have effects, the reverb trails should feel like ghosts of the notes you played.",
      wrong: "If you can't resist filling the silent bars, you haven't internalized that silence is part of the music. If you re-enter on the wrong beat, your internal count is slipping. If the effect tails are muddy, use less reverb or pick more cleanly.",
      sarah: "Dub is the art of subtraction. Lee 'Scratch' Perry didn't add effects — he removed instruments and let the echoes fill the space. This is Skinshape territory, Gene — the spacious, reverb-drenched side of reggae that you love. Space is the most powerful sound in music.",
      metronome: 85
    }
  ]
};
