export const level10 = {
  level: 10,
  title: "Full Integration",
  subtitle: "Everything comes together. The Golden Hour Set.",
  description:
    "Style switching, mood matching, transcription, arrangement building, and extended golden hour sets that draw from every level. This is graduation — your guitar vocabulary is complete. Every scale, every style, every technique from Levels 1-9 becomes one unified musical voice.",
  artists: "All artists from Levels 1-9",
  unlocks: "Complete musical voice — you've mastered the full curriculum",
  review: { label: "Level 9 Check-In", time: 5, exercises: ["gs-9-1", "gs-8-9"], prompt: "Play the PIMA fingerpicking pattern on Am-C-G with smooth transitions (gs-9-1). Then play a BALTHVS-style soul groove with ghost notes and extended chords (gs-8-9). Fingerpicking and soul groove should both feel natural." },
  exercises: [
    {
      id: "gs-10-1",
      time: 10,
      title: "Style Switching Drill",
      type: "guitar",
      recorder: true,
      what: "Cycle through blues (Level 1), surf (Level 2), psych-garage (Level 3), reggae (Level 4), desert (Level 5), Khruangbin space (Level 7), soul (Level 8), and cinematic (Level 9) every 4 bars. Every style you've learned, on demand.",
      tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }],
      steps: [
        { text: "Start with Surf Rock Beat 120. Bars 1-4: surf tremolo picking (Level 2) — bright Mixolydian, fast picking, forward energy. Bars 5-8: blues bends and pentatonic (Level 1) — dark, behind the beat. Bars 9-12: reggae offbeat skanks (Level 4) — tight chops, offbeat discipline. Keep switching every 4 bars.", why: "Style switching tests whether you've truly internalized each style or just memorized exercises. If you can switch instantly, the style is in your body, not just your head." },
        { text: "Continue the rotation: bars 13-16: desert blues (Level 5) — sus pentatonic, drone, repetition. Bars 17-20: Khruangbin space (Level 7) — sparse, behind the beat, soft attack. Bars 21-24: cinematic (Level 9) — fingerpicked arpeggios, Phrygian drama, dynamics.", why: "Adding more styles to the rotation demands faster mental switching. Each style requires a completely different physical approach — pick attack, hand position, rhythmic feel, scale choice." },
        { text: "Complete the cycle: bars 25-28: soul groove (Level 8) — extended chords, ghost notes, Dorian fills. Then restart from surf. Cycle through the full 8-style rotation twice.", why: "By Level 10, you should have at least 8 distinct approaches to playing over any backing track. This drill tests your fluency in all of them." },
        { text: "Challenge: write style names on cards and flip one every 4 bars. Random order removes the safety of a predictable sequence. If you hesitate on a style, that's where you need more practice.", why: "Random calling simulates real musical situations where you need to access any style at any moment. The styles that feel foreign under pressure reveal your blind spots." }
      ],
      feel: "You should feel like a musical chameleon — completely at home in any style. The switches should feel like changing language, not like starting over.",
      wrong: "If some styles feel foreign or forced, they need more practice in their respective levels. If all the styles sound the same, you're defaulting to one approach — commit more fully to each style's unique character.",
      sarah: "This drill reveals your strengths and weaknesses. The styles that feel easy are your comfort zone. The ones that feel awkward are where you need work. Both are valuable information.",
      phraseForm: { sections: ["Style 1", "Style 2", "Style 3", "Style 4"], barsPerSection: 8 },
      rhythmCells: ["surf", "reggae", "desert", "soul"]
    },
    {
      id: "gs-10-2",
      time: 10,
      title: "Mood Matching",
      type: "guitar",
      what: "Listen to a backing track and choose the right style, scale, and feel instinctively. No instructions — just respond to what you hear. This tests whether your musical vocabulary is truly integrated.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }, { name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }, { name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }, { name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Put on any backing track. Don't plan anything. Listen for 8 beats, then play whatever feels right. Don't think about which level or scale — just respond to the music.", why: "Instinctive response reveals what you've truly internalized. If you have to think about which scale to use, the scales aren't in your ears yet — they're still in your head." },
        { text: "After 2 minutes, switch to a different backing track. Notice how your playing changes automatically. The desert track might pull out sus pentatonic. The soul track might pull out extended chords. Trust your instincts.", why: "When your vocabulary is integrated, the music tells you what to play. You don't choose a scale — the scale chooses you based on what you hear. That's musical fluency." },
        { text: "Try each of the 4 backing tracks for 2 minutes each. After all four, reflect: which track was easiest to respond to? Which felt awkward? The easy ones are your natural home. The awkward ones reveal growth areas.", why: "Self-awareness about your instinctive responses is advanced musicianship. Knowing where you default and where you struggle lets you practice with intention." },
        { text: "Replay the track that felt most awkward. This time, deliberately choose tools that fit — if the cinematic track felt hard, use fingerpicking, Phrygian, dynamics. Practice matching the mood until it feels natural.", why: "Targeted practice on your weakest mood-matching scenarios turns gaps into strengths. The goal is equal comfort across all moods." }
      ],
      feel: "When mood matching works, it feels like the music is playing through you — you're not choosing notes, you're channeling the vibe. The backing track and your guitar become one conversation.",
      wrong: "If you played the same style over every backing track, your vocabulary isn't integrated — each track should evoke a different response. If nothing felt instinctive, you may need more time with individual levels before integration.",
      sarah: "This is the most important exercise in the curriculum. Technique serves expression. If you can make someone feel something specific with your guitar, you've mastered the instrument."
    },
    {
      id: "gs-10-3",
      title: "The 5 Core Concepts",
      type: "guitar",
      time: 12,
      what: "A deliberate practice round that isolates each of the 5 cross-pollinated concepts from the curriculum: rhythm-first improv, PReVaDe motif development, chord-tone targeting, dynamic shaping, and recovery. One focused pass through each.",
      steps: [
        { text: "Rhythm-first (2 min): Mute strings. Create a compelling rhythm pattern using only percussion on the guitar body and muted strums. No pitch.", why: "Rhythm is always the foundation — isolating it reminds you that groove comes first." },
        { text: "PReVaDe (2 min): Play a 4-note motif. Present it, Repeat it, Vary it (change one note), Deconstruct it (extract the rhythm only). Full cycle.", why: "The motif development engine that turns a lick into a solo." },
        { text: "Chord-tone targeting (2 min): Over Am-C-G-Em, land on the 3rd of each chord on beat 1. Navigate between targets by step.", why: "Targeting chord tones on strong beats is the skeleton of melodic improv." },
        { text: "Dynamic shaping (2 min): Play any passage. Shape it: pp → mp → ff → pp. Focus only on volume as expressive tool.", why: "Dynamics turn patterns into music — the same notes at different volumes tell different stories." },
        { text: "Recovery (2 min): Deliberately play a 'wrong' note. Recover by sliding to the nearest chord tone, bending into it, or repeating it with confidence.", why: "Recovery skills turn mistakes into features. Every great improviser has this." }
      ],
      feel: "Like a warmup for your musical brain — each concept gets its own spotlight before you combine them all.",
      wrong: "Rushing through each concept. Give each one its full 2 minutes.",
      sarah: "This is your toolkit check. If any of these 5 feels shaky, go back to the level that teaches it. If they all feel natural, you're ready for anything.",
      metronome: 90,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      rhythmCells: ["mute-strum", "ghost", "accent", "rest"],
      phraseForm: { pattern: "PRVD", barsPerSection: 4 },
      volumeContour: true,
      pitchContour: true,
      recorder: true
    },
    {
      id: "gs-10-4",
      time: 10,
      title: "Ear Training & Intervals",
      type: "guitar",
      recorder: true,
      what: "Basic interval recognition — hear a 3rd vs a 5th vs a 7th. This prepares you for transcription by training the most fundamental musical skill: hearing the distance between two notes.",
      steps: [
        { text: "Play A (open 5th string), then play each interval above it. Minor 3rd: C (3rd fret, A string). Perfect 5th: E (7th fret, A string). Minor 7th: G (10th fret, A string). Play each pair 3 times: root, then interval. Sing both notes.", why: "Hearing intervals is the foundation of all ear training. If you can recognize a 3rd vs a 5th by sound alone, you can start figuring out melodies and chords by ear." },
        { text: "Use songs to anchor intervals. Minor 3rd = first two notes of 'Hey Jude' (descending) or 'Smoke on the Water' riff. Perfect 5th = 'Star Wars' theme opening. Minor 7th = 'Somewhere' from West Side Story (ascending).", why: "Song references give your ear a shortcut. Instead of calculating intervals, you hear the familiar song fragment and know instantly which interval it is." },
        { text: "Test yourself: play one of the three intervals without looking at the fretboard. Can you identify which one it is by ear alone? Do 10 rounds. Track your accuracy.", why: "Active testing with feedback is how ear training works. Passive listening builds familiarity but not reliability. You need to guess, check, and calibrate." },
        { text: "Extend to more intervals: Major 3rd (A to C#), Perfect 4th (A to D), Major 7th (A to G#). Add these to your test. Now you have 6 intervals to recognize.", why: "Six intervals covers most of what you'll encounter in the music you love. Each new interval expands your transcription ability proportionally." }
      ],
      feel: "Interval recognition should feel like recognizing faces — instant, intuitive, and confident. When you hear a 5th, you should know it's a 5th the way you know a friend's face in a crowd.",
      wrong: "If all intervals sound the same, start with just two (3rd vs 5th) until you can distinguish them reliably. If the song references don't help, find songs YOU know that start with those intervals.",
      sarah: "Ear training isn't glamorous, but it's the skill that unlocks everything else. A guitarist with great ears and basic technique will always outplay a guitarist with great technique and deaf ears."
    },
    {
      id: "gs-10-5",
      time: 12,
      title: "Chord Tone Targeting",
      type: "guitar",
      drone: { mode: "cycle", preset: "coastal-soul" },
      fretboard: { scale: "a-dorian", position: 1 },
      what: "Over the Am9→Dm7→G9→Cmaj7 progression, target chord tones on downbeats: 3rds and 7ths first, then extensions. This is how jazz musicians think — and it's what makes solos sound 'inside' the changes instead of just running scales on top of them.",
      tracks: [{ name: "Deep Soul Groove 80 BPM", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Play over Am9→Dm7→G9→Cmaj7 (Deep Soul Groove 80). On beat 1 of each chord, land on the 3rd: C over Am9, F over Dm7, B over G9, E over Cmaj7. Use Dorian notes to walk between these targets.", why: "The 3rd defines whether a chord is major or minor. Landing on 3rds proves you're hearing the harmony. The walking notes between targets create smooth, connected melodic lines." },
        { text: "Now target the 7ths: G over Am9, C over Dm7, F over G9, B over Cmaj7. These notes define the chord's extension quality — they're what make 7th chords sound different from triads.", why: "7ths are 'guide tones' that define chord quality more than any other note. Targeting them makes your solo sound harmonically aware — like you're inside the chords, not just over them." },
        { text: "Graduate to targeting extensions: B (9th) over Am9, C (7th) over Dm7, A (9th) over G9, B (7th) over Cmaj7. Now your solo literally outlines what makes each chord special.", why: "Targeting extensions is the most advanced version. When you land on the 9th of Am9, you're proving you hear the specific chord quality — not just 'Am' but specifically 'Am9.' That's deep harmonic awareness." },
        { text: "Finally, mix all targets freely. On one pass, target the 3rd of Am9, the 7th of Dm7, the 9th of G9, the 3rd of Cmaj7. Vary which tone you aim for on each chord, each time through the progression.", why: "Mixing targets makes your solos unpredictable and organic. Each pass through the progression sounds different because you're choosing different harmonic highlights." }
      ],
      feel: "Your solo should feel like it's inside the chords rather than on top of them. Each phrase should feel inevitable — guided by the harmony rather than by scale patterns.",
      wrong: "If it sounds like an exercise (too predictable), add rhythmic variation and space between targets. If your targets sound wrong, verify: Am9 3rd = C, 7th = G, 9th = B. Dm7 3rd = F, 7th = C. G9 3rd = B, 7th = F, 9th = A. Cmaj7 3rd = E, 7th = B.",
      sarah: "This is the technique that separates noodling from improvising. When every phrase connects to the harmony, your solo tells the same story as the chords. That's real music.",
      pitchContour: true,
      phraseForm: { sections: ["Am", "C", "G", "Em"], barsPerSection: 4 }
    },
    {
      id: "gs-10-6",
      time: 12,
      title: "Transcription",
      type: "guitar",
      what: "Pick a short passage from a favorite artist — 4-8 bars of guitar — and figure it out by ear. No tabs, no YouTube tutorials. Just your ears and your instrument. This is the ultimate musical skill.",
      steps: [
        { text: "Choose a song you love with a clear guitar part. Start simple — a Khruangbin riff, a Hermanos Gutiérrez arpeggio, a Skinshape melody. Listen to a 4-8 bar section 3 times without your guitar. Hum the melody.", why: "Active listening without your instrument forces your ear to do the work. Humming proves you've internalized the melody before you try to find it on the fretboard." },
        { text: "Pick up your guitar. Find the first note by trial and error — play notes until one matches. Then the second. Work note by note. This is slow — that's normal. 8 bars might take the full 12 minutes.", why: "Transcription is hard because it requires translating what you hear into fretboard positions. This builds the ear-to-hand connection that defines great musicians." },
        { text: "Focus on getting the melody right first. Rhythm second. Exact voicings third. If you can play the right notes in roughly the right rhythm, that's a success for your first transcription.", why: "Prioritizing melody over precision keeps you from getting frustrated. Even an approximate transcription teaches your ear more than reading perfect tabs." },
        { text: "Compare your version to the original. What did you get right? What did you miss? The mistakes reveal specific ear training gaps: if you missed the rhythm, practice rhythmic dictation. If you missed the notes, practice intervals (gs-10-4).", why: "Self-evaluation after transcription shows you exactly where your ear is strong and where it needs work. Every transcription makes the next one easier. The first one is always the hardest." }
      ],
      feel: "This should feel like detective work — slow, satisfying, and occasionally frustrating. Each note you find should feel like a small victory. The complete transcription should feel like solving a puzzle.",
      wrong: "If you gave up and looked up tabs, try again with an easier passage — maybe just 2 bars. If it took less than 5 minutes, choose something more challenging. If you couldn't find a single note, start by identifying just the key (is it major or minor? What root?).",
      sarah: "Transcription is how every great musician learned. Before tabs and YouTube, you had to figure it out. There's no shortcut to developing your ear — but there's no more valuable skill either."
    },
    {
      id: "gs-10-7",
      time: 12,
      title: "Arrangement Building",
      type: "guitar",
      recorder: true,
      what: "Record layers: rhythm, lead, and texture. Build a 1-minute piece using skills from all levels. This is arranging — thinking about how parts fit together. Requires a looper pedal, multi-track app (GarageBand), or simply recording and playing along.",
      setup: "Phone or recording device with overdub capability. A looper pedal is ideal but not required.",
      steps: [
        { text: "Record Layer 1 — Rhythm: a chord progression using extended voicings (Level 8) with ghost note rhythm (Level 4/8). Am9→Dm7→G9→Cmaj7, 2 bars each, 1 minute total. Steady tempo. This is your foundation.", why: "The rhythm part is the foundation of any arrangement. Using extended chords with ghost notes gives it sophistication and groove simultaneously." },
        { text: "Record Layer 2 — Lead: over your rhythm track, play a melodic part using A Dorian. Simple phrases, spacious, behind the beat (Level 7 approach). This is your melody voice.", why: "The lead should complement the rhythm, not compete with it. Using the spacious Khruangbin approach ensures the parts breathe together." },
        { text: "Record Layer 3 — Texture: fingerpicked cinematic arpeggios (Level 9) in the upper register of the neck. This part fills the spaces between rhythm and lead with atmosphere.", why: "The texture layer is the glue that holds an arrangement together. It adds depth without taking focus from the rhythm and melody." },
        { text: "Listen to all three layers together. Does it sound like a song? Adjust volumes if one layer dominates. Try removing one layer at a time — each layer should be missed when it's gone.", why: "Listening to your arrangement critically develops your producer's ear. You're learning to hear how parts interact — a skill that goes beyond guitar playing into musicianship." }
      ],
      feel: "You should feel like a producer — layering parts that serve the whole. Each layer should add something essential, and removing any one layer should feel like something is missing.",
      wrong: "If all three layers sound like the same part, you need more contrast: different registers, different rhythmic density, different techniques. If one layer drowns the others, simplify it.",
      sarah: "This exercise proves you're not just a guitarist — you're a musician. You can think in layers, serve the song, and build something bigger than any single part.",
      phraseForm: { sections: ["Intro", "Verse", "Chorus", "Bridge", "Outro"], barsPerSection: 8 }
    },
    {
      id: "gs-10-8",
      time: 15,
      title: "Golden Hour Set 1: Surf-Psych",
      type: "guitar",
      recorder: true,
      what: "15 minutes of surf tremolo picking flowing into jangly chords flowing into psych fuzz energy, all connected into one continuous performance. This is your surf-psych graduation concert.",
      tracks: [{ name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Psych Rock 120 BPM", src: "/psych-rock-120.mp3" }],
      steps: [
        { text: "Minutes 0-5: Surf Rock Beat 120. Open with surf tremolo picking in G Mixolydian (Level 2) — bright, driving, energetic. Build from single-note tremolo melodies to double stops. This is the sun-bleached opening.", why: "Starting with surf basics honors where the curriculum began. It also sets a high-energy foundation that the rest of the set can build from." },
        { text: "Minutes 5-10: transition to jangle territory. Switch to arpeggiated sus2 voicings (Dsus2, Asus2, Csus2). Let open strings ring. The energy shifts from driving to shimmering. If you can, blend in some blues bends — surf meets psychedelia.", why: "The transition from pure surf to jangle-psych is where styles begin to merge. Don't stop between styles — let one flow into the other through shared elements." },
        { text: "Minutes 10-14: Switch to Psych Rock Beat 120. Full garage rock energy — power chords, fuzz (if available), Phrygian Dominant riffs (A-Bb-C#-D). Play ON TOP of the beat. Push the intensity to its peak.", why: "The climax should feel like the song has been building to this moment. All the shimmer and surf energy transforms into raw psych power." },
        { text: "Minutes 14-15: cool down. Return to clean jangle arpeggios. Reduce volume. Let the open strings ring into silence. The circle closes — you end where you started, but transformed.", why: "Returning to the opening mood creates a satisfying arc. The quiet ending after the climax is more powerful than ending at full volume." }
      ],
      feel: "This should feel like performing a complete set — with a beginning, middle, climax, and resolution. 15 minutes of total immersion in the surf-psych world.",
      wrong: "If all 15 minutes sound the same, you need more contrast between sections. If the transitions are jarring, spend more time on the handoffs — use shared notes and scales as bridges.",
      sarah: "You're playing a full surf-psych set. Opening act: bright surf. Headliner: dark psych. Encore: shimmer jangle. You are the festival.",
      phraseForm: { sections: ["Surf", "Psych", "Jangle", "Garage"], barsPerSection: 16 },
      volumeContour: true,
      rhythmCells: ["tremolo", "jangle", "power"]
    },
    {
      id: "gs-10-9",
      time: 15,
      title: "Golden Hour Set 2: Groove",
      type: "guitar",
      recorder: true,
      what: "15 minutes flowing from reggae offbeat skanks (Level 4) into Khruangbin space (Level 7) into soul groove with extended chords (Level 8). The rhythm-focused golden hour.",
      tracks: [{ name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }, { name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }, { name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }],
      steps: [
        { text: "Minutes 0-5: Reggae One Drop 85. Open with reggae skanks on Am7→Dm7 (Level 4). Tight chops, clean offbeat, deep in the pocket. Add brief lead breaks in the Skinshape style — taste, not feast.", why: "Starting with reggae establishes the groove as king. Everything in this set serves the pocket." },
        { text: "Minutes 5-10: transition to the Khruangbin Style 80. Shift from reggae rhythm to Khruangbin space — softer attack, behind the beat, sparse pentatonic phrases with global flavors (Level 7). The energy gets more introspective.", why: "The transition from reggae drive to Khruangbin float should feel like the sun setting — the energy doesn't drop, it transforms from external to internal." },
        { text: "Minutes 10-14: switch to Soul Funk Groove 90. Bring in extended chords (Am9, G9, Cmaj7) with ghost note rhythm and Dorian fills (Level 8). The groove deepens with harmonic sophistication.", why: "The soul section is the harmonic climax — same groove sensibility as reggae and Khruangbin, but with richer chords and more melodic fills." },
        { text: "Minutes 14-15: strip back to a single Am7 skank on the offbeat. No fills, no extensions — just the pure reggae groove you started with. Fade to silence.", why: "Ending with the simplest possible groove after all that complexity is deeply satisfying. The arc is: simple → spacious → sophisticated → simple." }
      ],
      feel: "This should feel deeper and more introspective than the surf-psych set — like a late-night session rather than a beach party. The energy is internal, not external.",
      wrong: "If it sounded like three separate exercises, work on the transitions between styles. If one style dominated, balance your time more evenly. If the groove broke during transitions, simplify.",
      sarah: "The groove set is about depth and feel. Reggae is the heartbeat. Khruangbin is the breath. Soul is the mind. Together, they're the complete groove experience.",
      phraseForm: { sections: ["Soul", "Reggae", "Khruangbin", "Desert"], barsPerSection: 16 },
      volumeContour: true,
      rhythmCells: ["skank", "ghost", "behind-beat"]
    },
    {
      id: "gs-10-10",
      time: 15,
      title: "Golden Hour Set 3: Cinematic",
      type: "guitar",
      recorder: true,
      volumeMeter: true,
      what: "15 minutes flowing from desert blues drone (Level 5) into cinematic fingerpicked arpeggios (Level 9) into Phrygian drama (Level 9) and finally into silence. The most atmospheric golden hour set.",
      tracks: [{ name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }, { name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Minutes 0-5: Desert Blues 75. Drop D tuning. Start with the open D drone and a simple sus pentatonic melody (A-B-D-E-G). Hypnotic repetition from Level 5. Let the phrase cycle and evolve glacially.", why: "The desert opening establishes patience and atmosphere. One phrase, repeating, slowly mutating. The listener enters a trance state before the cinematic drama begins." },
        { text: "Minutes 5-10: transition to the Cinematic Western Beat 80. Shift from drone-based playing to fingerpicked arpeggios (Level 9) — Am→Dm→Em. Build dynamics from Level 2 to Level 4. The desert becomes a canyon — same vastness, but with more movement and color.", why: "The transition from desert to cinematic should feel like a camera slowly pulling back to reveal a larger landscape. Same mood, wider scope." },
        { text: "Minutes 10-13: full Phrygian drama. Spaghetti Western melodies with the Bb→A resolution. Tremolo effect on sustained notes. Build to the dynamic peak — Level 5 volume. This is the dramatic climax of the entire set.", why: "The Phrygian section is the emotional peak — maximum drama, maximum intensity, maximum cinematic power. Everything you've built across 13 minutes pays off here." },
        { text: "Minutes 13-15: dissolve. Strip away layers. Return to single notes. Fade from Level 5 dynamics to Level 1. End on a single open D drone ringing into complete silence. Don't touch the guitar until the string stops vibrating.", why: "The dissolution is the most cinematic moment — the story ends, the credits roll, and the final sustained note is the last shot before black." }
      ],
      feel: "This should feel like a film score in miniature — vast, dramatic, and deeply atmospheric. The desert drone, the cinematic arpeggios, the Phrygian drama, the final silence — each section serves a narrative purpose.",
      wrong: "If it sounded like practicing, you weren't committed to the storytelling. If there was no dynamic contrast, reread exercise 9-5 and exaggerate the volume changes. If the Phrygian section felt awkward, practice exercise 9-4 more.",
      sarah: "This set is your inner film composer. Most guitarists never think about scoring scenes — they think about playing songs. You're beyond songs. You're creating worlds.",
      phraseForm: { sections: ["Cinematic", "Western", "Tremolo", "Fingerpicked"], barsPerSection: 16 },
      volumeContour: true
    },
    {
      id: "gs-10-11",
      time: 30,
      title: "The Full Golden Hour",
      type: "guitar",
      recorder: true,
      what: "30-minute set combining ALL styles, building from quiet to peak to resolution. No stopping. No planning beyond the general arc. This is graduation — the final exercise in the entire curriculum.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }, { name: "Desert Blues 75 BPM", src: "/desert-blues-75.mp3" }, { name: "Reggae One Drop 85 BPM", src: "/reggae-one-drop-85.mp3" }, { name: "Surf Rock 120 BPM", src: "/surf-rock-120.mp3" }, { name: "Soul Funk Groove 90 BPM", src: "/soul-funk-groove-90.mp3" }, { name: "Cinematic Western 80 BPM", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Minutes 0-5: THE DAWN. Start with no backing track. Just you and your guitar. Quiet fingerpicked arpeggios. A single sustained note. Space. Silence. The golden hour begins at first light.", why: "Starting without a backing track is the bravest choice. No safety net. Just your musical instincts and the skills from 10 levels of study. The silence is part of the music." },
        { text: "Minutes 5-10: THE WARMTH. Fade in a mellow backing track (Khruangbin Style 80 or Desert Blues 75). Let the groove join you — not the other way around. Play behind the beat. Dorian warmth. Extended chords. The sun is rising.", why: "The backing track arrival should feel like dawn breaking — gradual, inevitable, and warm. Your playing transitions from solo meditation to groove-locked expression." },
        { text: "Minutes 10-17: THE JOURNEY. Move through styles as the music calls for them. Reggae skanks into blues bends into desert drones into Khruangbin space. Switch backing tracks if you want. Let the music guide you — don't force transitions.", why: "The middle section is your full vocabulary on display. Each style appears when the music needs it. You're not performing exercises — you're making choices. This is improvisation at its deepest." },
        { text: "Minutes 17-24: THE PEAK. Build energy. Surf tremolo over driving beats. Phrygian Dominant riffs. Garage rock intensity. Soul groove with extended chords and bold Dorian fills. This is where you unleash everything. Dynamics at Level 5. Full commitment.", why: "The climax of the golden hour should be undeniable — the moment when all your skills converge into maximum musical expression. Hold nothing back." },
        { text: "Minutes 24-30: THE RESOLUTION. Slow the energy. Cinematic arpeggios, fingerpicked, fading dynamics. Return to space and silence. End the way you started: alone with your guitar, a single note, a breath, then nothing. The golden hour ends.", why: "The return to silence after 30 minutes of music is the most powerful moment. You end where you began — but you've traveled through every musical world you know. The silence at the end is different from the silence at the start. You've changed it." }
      ],
      feel: "This should feel like a complete musical life — dawn to dusk, quiet to loud to quiet, simple to complex to simple. 30 minutes of everything you've learned, expressed as one continuous musical thought. When it's working, you lose track of time. The music plays itself through you.",
      wrong: "There is no 'wrong' in this exercise. Whatever you played is your musical voice in this moment. If it felt uncomfortable, that discomfort is growth. If it felt natural, you've arrived. If some sections felt weak, you know where to focus next.",
      sarah: "You started this curriculum learning where to put your fingers for a blues scale. You're ending it performing a 30-minute set that spans continents, genres, and emotional worlds. The guitar is no longer an instrument you play — it's a voice you speak with. The golden hour never ends. Keep playing. Keep growing. Congratulations.",
      levelUp: "You have completed the Guitar Study curriculum. Your musical voice is uniquely yours — informed by blues, surf, reggae, desert, Khruangbin, cinematic, soul, and everything in between. Keep playing. Keep growing. The golden hour never ends.",
      phraseForm: { sections: ["Surf-Psych", "Groove", "Cinematic", "Free"], barsPerSection: 32 },
      volumeContour: true,
      rhythmCells: ["all-styles"]
    }
  ]
};
