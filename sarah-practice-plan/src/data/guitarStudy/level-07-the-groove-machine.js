import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "The Groove Machine",
  subtitle: "Clean skank to crunchy power chords. The SoCal reggae-rock switch.",
  description:
    "SoCal reggae-rock is built on one move: clean reggae skank for the verse, distorted power chords for the chorus, back to clean skank. Pepper, Slightly Stoopid, Iration, The Hip Abduction — they all do this. This level teaches you the switch, adds overdrive to your skank, puts a rock solo over a reggae groove, and builds toward a full SoCal-structured jam. If Level 4 was roots reggae, this is reggae that grew up going to punk shows.",
  artists: "Pepper, levitation room, Slightly Stoopid, Iration",
  unlocks: "Desert & Drone (Level 8)",
  review: {
    label: "Level 6 Check-In",
    time: 5,
    exercises: ["gs-6-3", "gs-6-11"],
    prompt: "Play the Cmaj7→Dmaj7 float with open strings ringing (gs-6-3). Then play your own jangle chord progression (gs-6-11). Shimmer is in your fingers? Time for some grit."
  },
  exercises: [

    // ─── THE SOCAL SWITCH ───

    {
      id: "gs-7-1",
      time: 8,
      title: "The SoCal Switch — Clean to Crunch",
      type: "guitar",
      what: "The signature move of SoCal reggae-rock: 4 bars of clean reggae skank, then flip to 4 bars of distorted power chords. This is the verse-to-chorus engine that drives Pepper, Slightly Stoopid, and The Hip Abduction. You already know the skank from Level 4 and power chords from Level 3 — now you combine them into one dynamic machine.",
      setup: "Guitar. Clean channel AND overdrive/distortion (pedal, amp gain, or software). Metronome at 90 BPM. Practice the channel switch before starting.",
      steps: [
        { text: "Set up two sounds: clean (for skank) and distorted (for power chords). If you have a pedal, stomp it. If using an amp, use the channel switch. If software, have both presets ready. Practice flipping between them 5 times without playing — just switching. The switch needs to be instant.", why: "The SoCal switch is a PERFORMANCE move. If you fumble the transition — stepping on the pedal late, turning a knob mid-bar — the energy collapses. The switch has to be as automatic as a chord change." },
        { text: "Clean channel. Play a reggae skank on Am for 4 bars — offbeat chops, muted and percussive, just like Level 4. Count: 1-AND-2-AND-3-AND-4-AND, strum on the ANDs. Keep it tight and short.", why: "The clean skank is the cool, laid-back verse. It draws the listener in, creates the pocket. The contrast with what comes next is what makes the chorus hit." },
        { text: "On beat 1 of bar 5, stomp the distortion and slam into power chords: A5 for 2 bars, then D5 for 2 bars. Full downstrokes, palm-muted but letting each hit ring slightly longer than the skank. Feel the energy shift — from whisper to shout.", why: "The power chord section is the RELEASE. All the tension the skank built gets unleashed. Palm muting keeps it controlled — you're not thrashing, you're driving. Think Pepper's Stormtrooper when the chorus hits." },
        { text: "Loop: 4 bars clean skank → 4 bars distorted power chords → repeat. Do 4 full cycles. The switch should get smoother each time. By cycle 4, the transition should feel like one continuous thing, not two separate things stitched together.", why: "Repetition builds the muscle memory for the switch. By the 4th cycle, your foot knows when to stomp, your arm knows how to shift from choppy upstrokes to driving downstrokes, and your ear knows the contrast." },
        { text: "Now try the full SoCal structure: 8 bars skank (verse) → 4 bars power chords (chorus) → 8 bars skank (verse 2) → 4 bars power chords (chorus 2) → 2 bars power chords building (bridge) → 4 bars skank (outro, fading). Record the whole thing.", why: "A full song structure puts the switch in context. The uneven sections (8 bars verse, 4 bars chorus) create the natural push-pull that makes SoCal reggae-rock feel alive — the verse breathes, the chorus punches, the outro winds down." }
      ],
      feel: "The skank should feel cool and collected — you're the bassist holding the pocket. The power chords should feel like kicking down a door — sudden energy, full commitment. The SWITCH should feel like a gear change in a car: smooth, decisive, satisfying.",
      wrong: "If the switch is sloppy — late pedal stomp, hesitation on beat 1 of the chorus — practice ONLY the transition: last bar of skank into first bar of power chords, 10 times in a row. If the power chords sound thin, check your palm mute — it should be light, not choking the strings.",
      sarah: "Gene, this is the entire Pepper formula. Stormtrooper, Stitches, Give It Up — they ALL do this switch. The Hip Abduction too. It's the same move you hear in Slightly Stoopid's live sets when they shift from mellow island vibes to full rock energy. You already have both halves — the skank from Level 4, the power chords from Level 3. This exercise welds them together.",
      metronome: 90,
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      recorder: true,
      levelUp: "Can play the SoCal switch — 4 bars clean skank to 4 bars distorted power chords — at 90 BPM with an instant, clean tone transition on beat 1. No hesitation, no fumbled pedal stomps."
    },
    {
      id: "gs-7-2",
      time: 8,
      title: "Stormtrooper Power Chord Riff",
      type: "guitar",
      what: "Pepper's Stormtrooper opens with a power chord riff that hits HARD before dropping into reggae. The progression is D#5–A#5–F#5 — three power chords sliding down the neck. Learn this riff at half speed, then bring it up to tempo. This is the gateway to SoCal reggae-rock songwriting.",
      setup: "Guitar with distortion. Metronome at 75 BPM (half the song's 150 BPM). Fret positions: D#5 (fret 11), A#5 (fret 6), F#5 (fret 2).",
      steps: [
        { text: "Learn the three shapes: D#5 at fret 11 (power chord on strings 5-4), A#5 at fret 6 (same shape), F#5 at fret 2 (same shape). Just hold each one, strum it, make sure it rings clean. These are the same power chord shape from Level 3, just in three positions.", why: "Power chords are moveable shapes — same two fingers, different frets. The riff is really about SLIDING one shape to three positions. Understanding this means you can write your own power chord riffs by choosing any three frets." },
        { text: "At 75 BPM, play the sequence: D#5 (2 hits) → A#5 (2 hits) → F#5 (2 hits, let ring). Downstrokes only, palm muted on the hits, lift the mute on the last F#5 to let it sustain. The slide from fret 11 down to fret 2 should feel like a controlled descent.", why: "Starting at half speed lets you nail the slides. The distance from fret 11 to fret 6 to fret 2 is big — your hand travels the whole neck. At half speed, you build the spatial memory for where each chord lives." },
        { text: "Bump to 100 BPM. Same pattern but tighter — the slides need to be faster, the hits sharper. Add a slight accent on the first hit of each power chord. The rhythm should start to feel punchy and aggressive.", why: "100 BPM is closer to the feel — the riff starts to have momentum. The accents create the rhythmic contour that makes it recognizable as a riff, not just three chords." },
        { text: "At 120 BPM, add the transition: play the riff twice (D#5–A#5–F#5, D#5–A#5–F#5), then drop into a clean skank on E for 4 bars. This is the Stormtrooper structure — crunchy intro into reggae verse.", why: "The riff-to-skank transition is the Stormtrooper moment. The drop from heavy distortion to clean skank creates a massive dynamic contrast — it's the reason the song works live." },
        { text: "Target tempo: 140-150 BPM. Only attempt this after you can play it cleanly at 120. At full speed, the riff becomes a burst of energy — quick, aggressive, then the relief of the reggae groove. Record your best take.", why: "150 BPM is fast for a power chord riff with big slides. If you can play it clean at 140, you're there — the last 10 BPM is feel, not fundamentals. If you plateau at a certain BPM, stop and sleep on it. This isn't a figure of speech — motor learning research shows that fast riff accuracy improves 10-13% overnight. Your brain consolidates the finger patterns during sleep. Practice, sleep, test tomorrow." }
      ],
      feel: "The riff should feel EXPLOSIVE — like a wave crashing. Three quick punches down the neck, each one lower and heavier. When you drop into the clean skank afterward, it should feel like surfacing from underwater — sudden calm after intensity.",
      wrong: "If the slides are sloppy (buzzing, landing on wrong frets), slow WAY down. The most common error is not lifting your fingers enough during the slide — they drag on the frets and create noise. Lift slightly, slide, plant firmly. If you can't get it clean at 75 BPM, spend a full session there before speeding up.",
      sarah: "Gene, Stormtrooper is in your top 5 tracks right now. This is the riff that opens the song and sets the whole mood — those power chords sliding down the neck are the fist-pump moment before the reggae groove kicks in. Pepper's guitarist keeps it simple: same shape, three positions, all attitude. That's the SoCal way — nothing fancy, all energy.",
      metronome: 75,
      speedLadder: { start: 75, end: 150, increment: 15, bars: 4 },
      chordVoicings: { chords: ["E5", "A5", "D5", "B5"] },
      recorder: true,
      levelUp: "Can play the Stormtrooper power chord riff (D#5→A#5→F#5) cleanly at 140+ BPM and transition into a clean skank on E without hesitation."
    },
    {
      id: "gs-7-3",
      time: 7,
      title: "The Distorted Skank",
      type: "guitar",
      what: "Not all skanks are clean. SoCal reggae-rock often adds mild overdrive to the offbeat chop — the skank gets gritty and crunchy but stays short and percussive. This is a different animal from clean roots reggae: it's reggae that went to a punk show and came back with an edge.",
      setup: "Guitar. Overdrive pedal at LOW gain (not full distortion — think warm crunch, not metal). Metronome at 85 BPM.",
      steps: [
        { text: "Start clean. Play a reggae skank on A (A major open chord or A5 power chord) for 4 bars — offbeat chops, short and muted. This is your Level 4 skank. Get it locked in and tight.", why: "Clean skank first establishes the baseline. You need to hear the clean version in your muscle memory so that when you add overdrive, you can feel exactly what changed and control it." },
        { text: "Engage mild overdrive. Play the same skank pattern on A. Notice how the overdrive thickens the chop — it has more body, more grit. BUT the note should still be SHORT. Mute immediately after each chop. The overdrive makes sustain easier, so you have to mute HARDER.", why: "Overdrive amplifies sustain — which is the enemy of a good skank. The skank's power is its brevity: chop-mute, chop-mute. With overdrive, your muting hand has to work twice as hard to keep each hit short. This is the key skill." },
        { text: "Experiment with gain levels. Turn the overdrive up slightly — when does the skank start to lose its percussive quality and become muddy? Find the sweet spot: enough grit to feel aggressive, but short enough to keep the reggae bounce. Mark that gain level.", why: "Finding your gain sweet spot is a personal discovery — it depends on your guitar, your amp, your pickups. Too little gain and there's no point. Too much and the skank becomes a wall of noise. The sweet spot lives in between." },
        { text: "Alternate: 4 bars clean skank → 4 bars distorted skank → repeat. Same chord, same pattern, different gain. Feel how the distorted version adds urgency and edge while keeping the same groove.", why: "This alternation is a subtler version of the SoCal switch — instead of going from skank to power chords, you're going from polite skank to aggressive skank. Some SoCal bands use this within verses to build intensity gradually." },
        { text: "Try the distorted skank with palm-muted power chords (A5) instead of open chords. The power chord skank is even more aggressive — it's where reggae meets punk. Chop on the offbeat, but with a thicker, darker sound. Record both versions and compare.", why: "Power chord skank is the bridge between reggae and punk — it's how Sublime, Slightly Stoopid, and early Pepper get their edge. The two-note voicing cuts through a mix better than open chords, and the distortion adds the grit." }
      ],
      feel: "The distorted skank should feel dangerous — like the clean skank's rebellious sibling. Still bouncy, still percussive, but with an undercurrent of aggression. Your muting hand should be working hard to keep each chop tight.",
      wrong: "If the skank becomes a sustained chord wash (no percussive chop), your mute is too slow. The instant you strum, your fretting hand should relax to mute the strings. With overdrive, this has to happen FASTER than clean because the sustain fights you. If it sounds like punk and not reggae, check your timing — are you on the offbeats?",
      sarah: "Gene, this is Slightly Stoopid's secret ingredient. Their verses aren't clean reggae — they have this gritty, crunchy skank that sits between reggae and punk. It's what separates SoCal reggae-rock from actual roots reggae. Same offbeat, same bounce, but with teeth. You've got the skank from Level 4 — now give it an edge.",
      metronome: 85,
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      levelUp: "Can play a reggae skank with overdrive at 85 BPM where each chop stays short and percussive — no sustained chord wash — and an experienced listener would call it 'reggae with teeth, not punk with offbeats.'"
    },

    // ─── SONG STUDIES ───

    {
      id: "gs-7-4",
      time: 10,
      title: "Song Study: Stormtrooper Feel",
      type: "guitar",
      what: "Put the pieces together into a full Stormtrooper-style arrangement. Power chord intro (gs-7-2), drop into clean reggae skank for the verse, distorted power chords for the chorus, clean skank outro. This is a full song structure built from the techniques you've been drilling.",
      setup: "Guitar. Clean + distortion ready to switch. Metronome at 100 BPM (building toward 150).",
      steps: [
        { text: "Structure the song: Intro (power chord riff D#5–A#5–F#5 x2) → Verse (clean skank on E, 8 bars) → Chorus (power chords E5–A5–B5, 4 bars) → Verse 2 (clean skank, 8 bars) → Chorus 2 (power chords, 4 bars) → Outro (clean skank, 4 bars fading). Write it down on paper before you play.", why: "Mapping the full structure before playing prevents getting lost mid-song. SoCal reggae-rock songs are simple structures — the magic is in the transitions, not the complexity. Writing it down makes the form conscious." },
        { text: "At 100 BPM, walk through the full structure SLOWLY. Don't worry about nailing every transition — just get through the whole thing start to finish. Count bars out loud if needed. Feel the rise and fall of energy across the song.", why: "A slow walkthrough builds the roadmap in your body. You're training your sense of form — knowing where you are in the song without counting. The energy arc (chill verse, explosive chorus, chill again) should feel natural." },
        { text: "Now drill the transitions in isolation: last 2 bars of verse → first 2 bars of chorus. This is where the magic happens. Practice the pedal stomp (or gain switch) landing EXACTLY on beat 1 of the chorus. 5 clean transitions in a row.", why: "The transition IS the song. A sloppy transition kills the energy. A clean transition — where the distortion hits right on beat 1 and the power chord lands with authority — is what makes the crowd lose their minds at a Pepper show." },
        { text: "Increase tempo to 120, then 140 BPM. At each tempo, play the full structure once. The power chord riff in the intro will get faster and more intense. The skank will get bouncier. The transitions will need to be tighter.", why: "Building tempo gradually ensures each speed level is solid before you move on. Jumping straight to 150 would sacrifice all the feel you built at slower tempos." },
        { text: "Full send at your best tempo (aim for 140-150 but 120 is solid). Record the entire thing — intro through outro. Listen back. Does the energy arc feel right? Does the verse-chorus contrast hit? This is your first SoCal arrangement.", why: "Recording and listening back is essential for arrangement work. You're not just checking notes — you're checking the emotional journey of the song. The verse should feel like tension building, the chorus should feel like release." }
      ],
      feel: "This should feel like playing a real song at a beach party. The intro grabs attention, the verse pulls people in, the chorus makes them jump, the outro lets them breathe. The whole thing should feel like a controlled explosion of energy.",
      wrong: "If the song falls apart during transitions, isolate the weak transition and drill it 10 times. If the skank feels too stiff at higher tempos, loosen your wrist — the skank should come from the wrist, not the forearm. If the power chords sound thin at speed, check that you're hitting strings 5 and 4 cleanly.",
      sarah: "Gene, you've been listening to Stormtrooper on repeat — now you're PLAYING the structure. This isn't a transcription — you're building a song that FEELS like Stormtrooper using the same techniques Pepper uses. Power chord riff intro, skank verse, power chord chorus. Simple structure, maximum impact. That's the SoCal way.",
      metronome: 100,
      speedLadder: { start: 100, end: 150, increment: 10, bars: 8 },
      chordVoicings: { chords: ["E5", "A5", "B5"] },
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      recorder: true,
      levelUp: "Can play the full Stormtrooper-style structure (intro → verse → chorus → verse → chorus → outro) at 130+ BPM with clean transitions and strong dynamic contrast between skank and power chord sections."
    },
    {
      id: "gs-7-5",
      time: 8,
      title: "Song Study: Warmth of the Sun — Shoegaze Reverb",
      type: "guitar",
      what: "levitation room's Warmth of the Sun is a different flavor of psych — reverb-drenched, dreamy, with a progression that floats between major and minor (E–D–A–Bm). This is the counterpoint to Pepper's aggression: where Stormtrooper punches, Warmth of the Sun washes over you. The chords are open and ringing, the strum is slow and atmospheric.",
      setup: "Guitar with reverb (spring reverb ideal — use whatever you have, or even a reverb app). Metronome at 60 BPM (half of 122 — learn slow, then bring up).",
      steps: [
        { text: "Learn the four chords: E (open), D (open), A (open), Bm (barre at fret 2 or x24432). Play each chord and let it ring for 4 beats with heavy reverb. The reverb should make each chord bloom and sustain — let the sound fill the room.", why: "Warmth of the Sun lives in the reverb. Each chord needs to sustain and wash into the next. Playing them slowly with heavy reverb trains your ear for the shoegaze/psych approach where chords are textures, not rhythmic hits." },
        { text: "At 60 BPM, play the progression: E (4 beats) → D (4 beats) → A (4 beats) → Bm (4 beats). Strum gently — downstrokes only, slow and full. Let each chord ring into the next. Don't mute between chords; let them overlap slightly.", why: "The wash between chords is intentional. In shoegaze/psych guitar, overlapping sustain creates harmonic complexity — the tail of the E chord mingles with the beginning of the D chord. This 'smearing' is the sound of levitation room." },
        { text: "Notice the harmonic movement: E (major, bright) → D (major, warm) → A (major, open) → Bm (minor, wistful). Three major chords building warmth, then one minor chord adding a shadow. That shadow IS the feeling of warmth fading — warmth of the sun as it sets.", why: "The major-major-major-minor arc is emotionally powerful. Three chords of light followed by one chord of dusk. This is the kind of harmonic storytelling that happens in levitation room's music — the title IS the progression's emotional journey." },
        { text: "Bring the tempo to 100, then 122 BPM. As the tempo increases, shift from whole-note strums to a gentle down-up pattern. Keep the reverb high. The strum should still feel loose and atmospheric, not percussive.", why: "At full tempo, the strum needs to be rhythmic but gentle — think waves lapping, not crashing. levitation room's rhythm section drives; the guitar floats on top. Your strum is texture, not timekeeping." },
        { text: "Record a full 2-minute pass at your best tempo. Close your eyes, let the reverb carry you, feel the warmth-to-shadow arc in the progression. This is psych-rock as meditation.", why: "Extended playing with eyes closed builds the emotional connection to the progression. You're not just executing chords — you're inhabiting a mood. That's what makes levitation room's music work." }
      ],
      feel: "This should feel like floating in warm water at sunset — each chord is a gentle wave, the reverb is the ocean, the Bm is the moment you realize the light is fading. Everything is soft, sustained, immersive.",
      wrong: "If it sounds choppy or percussive, you're strumming too hard and muting too much. Lighten your touch, let the strings sustain, and turn up the reverb. If the Bm barre chord buzzes, use the open Bm shape (x24432) or substitute Bm7 (x20202) — the 7th adds even more dreaminess.",
      sarah: "Gene, levitation room is in your top 10 artists all year. Warmth of the Sun is pure LA psych — Julian Porte drowns everything in reverb and lets the chords shimmer. After the aggression of Stormtrooper, this is the other side of your coin: gentle, dreamy, golden hour. Both live in you — Pepper's punch and levitation room's float.",
      metronome: 60,
      chordVoicings: { chords: ["E", "D", "A", "Bm"] },
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      recorder: true,
      levelUp: "Can play E-D-A-Bm at 100+ BPM with heavy reverb, letting chords wash into each other, with the Bm adding an audible emotional shadow to the major chords — confirmed by recording playback."
    },

    // ─── LEAD PLAYING & SOLOING ───

    {
      id: "gs-7-6",
      time: 8,
      title: "Rock Lead Over Reggae Groove",
      type: "guitar",
      what: "The SoCal move that blows minds: play a pentatonic rock solo OVER a reggae backing track. The groove is mellow and bouncy; your lead is bluesy and aggressive. The contrast creates something neither genre has alone. This is what Slightly Stoopid does when they let the guitar player loose over a dub groove.",
      setup: "Guitar with mild overdrive. Backing track: Reggae Rock 100 or Drums Only Reggae 85. A minor pentatonic position 1 (frets 5-8).",
      steps: [
        { text: "Start the reggae backing track. For 2 minutes, just LISTEN. Feel the groove. Nod your head. Tap your foot on 2 and 4 (the backbeat). Let the groove enter your body before you play a single note.", why: "Playing lead over reggae requires feeling the groove FIRST. If you start soloing immediately, you'll play over the groove instead of with it. The groove is the foundation — your solo sits on top, not against." },
        { text: "Play ONE note from Am pentatonic (position 1, fret 5 on the high E string — the note A). Hold it over the groove. Bend it slightly. Let it sit in the pocket. Add a second note (C, fret 8). Just two notes, feeling how they interact with the reggae groove underneath.", why: "Starting with one note over the groove forces you to play WITH the rhythm, not against it. The bend adds blues character. Two notes over a reggae groove already sounds like Slightly Stoopid — it's the combination that creates the magic." },
        { text: "Expand to the full Am pentatonic box (frets 5-8, all strings). Play short phrases — 3-5 notes, then space. Let the groove breathe between your phrases. Think of your solo as a conversation WITH the reggae rhythm section, not a monologue over it.", why: "Space is essential when soloing over reggae. The groove has its own melodic content (bass line, rhythm guitar skank). Your lead needs to leave room for those elements to be heard. Short phrases with space = the groove stays alive." },
        { text: "Try the 'call and response' approach: play a 2-beat phrase, then rest for 2 beats. The reggae groove fills your rests. Alternate: solo phrase, groove fills, solo phrase, groove fills. Feel how the conversation creates more energy than continuous playing.", why: "Call-and-response soloing is the most effective way to solo over any groove-based music. The rests let the listener hear the groove, which makes your next phrase hit harder. It's the same principle as a good conversation — listen as much as you speak." },
        { text: "Full 2-minute solo. Start sparse (one or two notes with lots of space), gradually build density (faster phrases, wider intervals, bends), then bring it back down to sparse. The solo should have an arc — it should tell a story. Record it.", why: "Solo arc is what separates a guitar solo from noodling. Build-and-release over 2 minutes trains you to think in musical paragraphs, not individual notes. The sparse-to-dense-to-sparse shape is the most natural and effective solo structure." }
      ],
      feel: "This should feel like surfing — the reggae groove is the wave, your solo rides on top of it. When you lock into the groove, the notes choose themselves. When you fight the groove, everything sounds wrong.",
      wrong: "If your solo sounds disconnected from the groove, you're not listening to the backing track. Stop playing, listen for 30 seconds, then re-enter with ONE note that locks into the rhythm. If you're playing too many notes (shredding), simplify — the reggae groove doesn't want a metal solo. It wants space, feel, and blues bends.",
      sarah: "Gene, Slightly Stoopid's live sets are built on this — Kyle McDonald rips bluesy pentatonic solos over dub grooves, and the crowd goes wild because the COMBINATION is unexpected. Rock lead + reggae groove = something neither genre has alone. You've got the pentatonic chops from Level 1, and the reggae feel from Level 4. Now they meet.",
      metronome: 100,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }, { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      recorder: true,
      levelUp: "Can play a 2-minute Am pentatonic solo over a reggae groove with at least 40% silence between phrases, an audible build-and-release arc, and no note that fights the groove."
    },

    // ─── DYNAMICS & FEEL ───

    {
      id: "gs-7-7",
      time: 7,
      title: "Dynamic Contrast: Whisper Verse → Shout Chorus",
      type: "guitar",
      what: "SoCal reggae-rock lives and dies on dynamic contrast. The verse whispers (clean skank, low volume, laid back). The chorus SHOUTS (distorted power chords, full attack, forward energy). This exercise isolates the dynamic shift — not just switching sounds, but switching your entire physical approach to the guitar.",
      setup: "Guitar. Clean + distortion. Metronome at 95 BPM.",
      steps: [
        { text: "Play 4 bars of clean skank on Am as QUIETLY as possible. Barely brush the strings. The skank should be felt more than heard — ghostly, intimate, like whispering a secret. Your strumming hand should barely move.", why: "Learning to play extremely quietly is harder than playing loud. The quiet skank creates intimacy and draws the listener in. When the chorus hits, the contrast is massive — but only if the verse was truly quiet." },
        { text: "On bar 5, hit A5 power chord with distortion at FULL attack. Not just louder — physically different. Your whole arm engages. The strum is aggressive, from the elbow not the wrist. Let the volume and energy shock you.", why: "The physical shift from wrist-based quiet skank to elbow-based power chord attack is the key. Dynamic contrast isn't just volume — it's a total body reconfiguration. Your posture, your grip, your breathing all change." },
        { text: "Alternate: 4 bars whisper skank → 4 bars shout power chords → repeat. Exaggerate the contrast. The whisper should be TOO quiet, the shout should be TOO loud. Find the extremes first, then find the sweet spot.", why: "Exaggeration is how you expand your dynamic range. Most players exist in a narrow volume band because they've never explored the extremes. Push both ends, then the 'normal' range becomes wider and more expressive." },
        { text: "Add a TRANSITION bar: the last bar of the verse should slightly crescendo (getting a tiny bit louder, strum getting slightly more aggressive) to set up the chorus. And the first bar of the chorus should start at full power then settle slightly by bar 2. The transitions have shape.", why: "Smooth transitions are more musical than abrupt ones. The slight crescendo in the last verse bar is a runway — it prepares the listener's ear for what's coming. The slight settling in bar 2 of the chorus prevents the high energy from being fatiguing." },
        { text: "Full 16-bar piece: 8 bars whisper verse (with crescendo in bar 8) → 4 bars shout chorus (with settle in bar 2) → 4 bars whisper outro. Record it. Listen for the dynamic arc — does the chorus feel like a true release?", why: "The full dynamic arc in a short piece trains your ear for song-level dynamics. A 4-bar chorus feels like an explosion after an 8-bar whisper verse. This ratio (2:1 verse-to-chorus) is common in SoCal reggae-rock." }
      ],
      feel: "The verse should feel like holding your breath. The chorus should feel like exhaling with force. The contrast should feel physical — your body should actually tense up during the transition and release during the chorus.",
      wrong: "If the verse and chorus sound similar in volume, your verse is too loud. Pull WAY back on the verse — if you can't hear yourself over the backing track, that's actually close to right. The chorus should be a genuine surprise every time. If your quiet skank loses rhythm, practice it alone until the groove is solid at low volume.",
      sarah: "Gene, think about how Iration's live shows work — the verses are these smooth, chill reggae pockets and then the chorus just HITS. The crowd goes from swaying to jumping. That dynamic arc is what makes the music physical. You're building the same thing in your playing — the ability to go from a whisper to a shout and make both feel intentional.",
      metronome: 95,
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      volumeMeter: true,
      recorder: true,
      levelUp: "Can play an 8-bar whisper verse and 4-bar shout chorus where the volume difference between sections is at least 3x — confirmed by the volume meter showing a dramatic spike at the chorus entry."
    },
    {
      id: "gs-7-8",
      time: 7,
      title: "Four-on-the-Floor vs One-Drop",
      type: "guitar",
      what: "SoCal reggae-rock and roots reggae use DIFFERENT kick drum patterns, and your guitar feel should match. Four-on-the-floor (kick on every beat) drives forward — it's the punk influence in SoCal. One-drop (kick only on beat 3) creates space — it's the heart of roots reggae. Learn to feel both and switch between them, because the kick pattern changes everything about how your skank sits.",
      setup: "Guitar. Two backing tracks: Reggae Rock 100 (four-on-the-floor) and Reggae One-Drop 85 (one-drop). Metronome at 85 BPM.",
      steps: [
        { text: "Play the one-drop backing track. Listen for the kick drum — it only hits on beat 3. Count: 1 (no kick) 2 (no kick) 3 (KICK) 4 (no kick). Feel how spacious it is. Now play a clean skank over it. Your offbeat chops should sit between these sparse kicks. Notice how the groove feels relaxed, island, meditative.", why: "One-drop reggae has a unique feel — the missing kick on beat 1 creates a floating sensation. Your skank sits in a wide-open rhythmic space. Understanding this feel is essential because SoCal reggae-rock DELIBERATELY replaced it with something more driving." },
        { text: "Switch to the reggae-rock backing track. Listen for the kick — it hits on EVERY beat (1-2-3-4), like a rock song. Count: 1 (kick) 2 (kick) 3 (kick) 4 (kick). Play the same skank over it. Feel how the groove pushes forward, more urgent, more energetic. Same guitar part, completely different feel.", why: "Four-on-the-floor kick is the punk/rock influence in SoCal reggae. It makes the same skank feel more aggressive and driving. This is why Pepper and Slightly Stoopid feel different from Bob Marley — it's the kick pattern more than anything." },
        { text: "Alternate: 4 bars over one-drop → 4 bars over four-on-the-floor → repeat. Use the SAME skank pattern. Feel how the underlying kick changes your perception of what you're playing. The guitar doesn't change — the context does.", why: "This comparison teaches you that groove is a RELATIONSHIP between instruments, not a property of any single part. Your skank is the same, but it means something different over each kick pattern. This awareness makes you a better ensemble player." },
        { text: "Now adapt your skank to each groove: over one-drop, play SPARSER — fewer chops, more space, let the openness breathe. Over four-on-the-floor, play DENSER — tighter chops, less space, ride the driving energy. The skank should serve the groove, not ignore it.", why: "Matching your density to the kick pattern is what great rhythm guitarists do instinctively. Sparse over one-drop = authentic roots feel. Dense over four-on-the-floor = authentic SoCal feel. Playing the wrong density sounds like a genre mismatch." },
        { text: "Final exercise: play 8 bars of one-drop roots skank, then 8 bars of four-on-the-floor SoCal skank, switching backing tracks if possible (or just imagining the switch). Feel the genre shift in your body. Record both and listen for the difference.", why: "Being able to switch between roots and SoCal reggae feel on demand means you can draw from both traditions when writing or jamming. Most SoCal bands borrow from roots reggae when they want to cool down — you need both in your toolkit." }
      ],
      feel: "One-drop should feel like floating in a calm ocean — gentle, spacious, no urgency. Four-on-the-floor should feel like surfing — forward momentum, energy, drive. Same water, different relationship to it.",
      wrong: "If you can't feel the difference between the two kick patterns, listen to ONLY the backing tracks (no guitar) for 2 minutes each. Tap your foot. The one-drop foot tap should feel lopsided (heavy on 3). The four-on-the-floor tap should feel even and driving. If both feel the same, slow down and count out loud.",
      sarah: "Gene, this is the fork in the road that defines your taste. You love BOTH — Bob Marley's one-drop AND Pepper's four-on-the-floor. Now you understand WHY they feel different, and you can choose which one to channel. Most SoCal reggae bands switch between them within a single set — roots vibes for the verse, punk energy for the chorus.",
      metronome: 85,
      tracks: [
        { name: "Reggae One-Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }
      ],
      levelUp: "Can play a clean skank over both one-drop and four-on-the-floor backing tracks, matching density to each groove — sparse over one-drop, dense over four-on-the-floor — and articulate the difference."
    },

    // ─── PUTTING IT ALL TOGETHER ───

    {
      id: "gs-7-9",
      time: 8,
      title: "The Full SoCal Toolkit — Skank + Power + Solo",
      type: "guitar",
      what: "Combine everything: clean skank verse, distorted power chord chorus, AND a pentatonic solo break over the groove. This is the full SoCal formula in one piece — verse (skank) → chorus (power chords) → solo break (lead over groove) → final chorus. Three roles in one song: rhythm guitarist, power chord player, lead guitarist.",
      setup: "Guitar. Clean + distortion. Am pentatonic position 1. Reggae Rock 100 backing track. Metronome at 100 BPM.",
      steps: [
        { text: "Map the structure on paper: Intro (4 bars skank) → Verse (8 bars clean skank on Am) → Chorus (4 bars power chords A5-D5-E5) → Verse 2 (8 bars skank) → Solo Break (8 bars Am pentatonic lead over groove) → Final Chorus (4 bars power chords) → Outro (4 bars skank, fade). Write it down.", why: "A 40-bar piece with three distinct guitar roles is complex. Writing the roadmap prevents getting lost and lets you focus on PLAYING rather than remembering what comes next." },
        { text: "Walk through at 80 BPM. Don't aim for perfection — aim for continuity. Get through the whole thing without stopping, even if transitions are rough. The goal is to feel the full arc: chill → chill → explosive → chill → soaring → explosive → chill.", why: "Continuity at slow tempo builds confidence in the form. You need to trust the structure before you can inhabit it. A rough full pass is more valuable than a perfect 8 bars." },
        { text: "Drill the two hardest transitions: (1) last bar of verse into first bar of chorus (clean → distorted), and (2) last bar of chorus into first bar of solo break (distorted power chords → clean lead). Each transition 5 times clean in a row.", why: "The solo break transition is new — going from aggressive power chords to expressive lead playing requires a complete shift in energy and technique. Your right hand goes from driving downstrokes to precise single-note picking. This shift needs drilling." },
        { text: "At 100 BPM with the backing track, play the full structure. During the solo break, keep it SIMPLE — 3-5 note phrases with space. The solo doesn't need to shred; it needs to breathe with the groove. Record the whole thing.", why: "The backing track provides the groove context that makes everything feel real. Simple soloing over reggae is more effective than complex soloing — the groove does the heavy lifting, your lead adds color." },
        { text: "Listen back to your recording. Rate each section: did the verse groove? Did the chorus hit? Did the solo breathe? Pick the weakest section and spend 5 minutes on it alone. Then do one final full take.", why: "Self-assessment after recording is how you improve efficiently. The weakest section gets focused attention, and the final take benefits from that targeted work. This is the interleaved practice principle in action." }
      ],
      feel: "This should feel like being in a SoCal reggae-rock band — you're the whole guitar section. The verse is your rhythm guitarist, the chorus is your power chord player, the solo is your lead guitarist. Three identities, one person, one song.",
      wrong: "If the transitions are killing the flow, simplify the sections. Use one chord for the skank (Am only), one power chord pattern (A5 only), and three notes for the solo (A, C, E only). Complexity can come later — right now the FORM matters more than the content of each section.",
      sarah: "Gene, this is a Slightly Stoopid set in miniature — the way they flow from mellow reggae vibes to heavy rock energy to extended solos and back. You're building the same versatility. Most guitarists can do ONE of these things. Doing all three in one piece, with clean transitions? That's the full SoCal toolkit.",
      metronome: 100,
      fretboard: { scale: "am-pentatonic", position: 1, highlight: [] },
      chordVoicings: { chords: ["A5", "D5", "E5"] },
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      recorder: true,
      levelUp: "Can play a full 40-bar SoCal piece (skank verse → power chord chorus → pentatonic solo break → final chorus → skank outro) at 100 BPM with clean transitions between all three roles — recorded in one take."
    },
    {
      id: "gs-7-11",
      time: 8,
      title: "Jah Werx Revisited — Driving Acoustic 16ths",
      type: "guitar",
      songRef: {
        title: "Jah Werx — Susto",
        src: "/jah-werx.mp3",
        note: "BPM 114. Driving continuous 16th notes — NOT reggae despite sharing the B-F#-E progression from Level 4."
      },
      what: "In Level 4, you learned Susto's B-F#-E as a reggae skank. Now hear what the actual recording sounds like: driving continuous 16th notes at 114 BPM, with chords ringing fully into each other. Same three chords, completely different technique. This is the power of feel — the chord progression doesn't change, but the rhythmic approach transforms it from chill reggae to urgent indie rock.",
      setup: "Acoustic guitar (preferred) or electric clean with bright tone. Metronome at 90 BPM to start.",
      steps: [
        { text: "Start the continuous 16th-note strum: D-U-D-U-D-U-D-U, every note even. Your arm moves in a constant, rapid pendulum. No pauses, no ghost strums — every stroke hits the strings. Play on B major only until the motion is automatic.", why: "This is the opposite of reggae. In Level 4, you learned to strum ONLY on upbeats with muting between. Here, every single 16th note is voiced. The arm never stops and never misses. This continuous motion is the foundation of driving acoustic rock." },
        { text: "Add dynamic accents: while maintaining the constant 16th-note strum, hit beats 1 and 3 harder. The upbeats stay lighter. Accent > light > light > light, accent > light > light > light. The strumming arm keeps the same speed — only the FORCE changes.", why: "Accenting the downbeats within a constant 16th-note strum creates the driving, urgent feel of Jah Werx. This is how Susto builds energy without changing the pattern — the contrast between loud and soft within the same motion." },
        { text: "Now let the chords RING. Unlike the reggae chop where you mute immediately, here you hold the B shape and let it sustain fully until the F# arrives. The chords overlap slightly — the tail of B bleeds into the start of F#. That legato overlap is the warmth.", why: "Legato chord transitions create a flowing, connected sound. In reggae, each chord is an isolated stab. In driving acoustic, the chords form a continuous wall of sound. Same progression, opposite philosophy." },
        { text: "Chain B-F#-E at 90 BPM with continuous 16ths and accented downbeats. Then increase to 100, then 110, aiming for the recording's 114 BPM. Record yourself and compare to the original.", why: "The recording is bright, jangly, and aggressive. If yours sounds muddy, try pressing harder on the barre shapes. If it sounds mechanical, vary the accent dynamics slightly — let beats 2 and 4 breathe a little more." }
      ],
      feel: "Urgent and driving, like running downhill. Your arm is a constant engine. The chords flow into each other in a warm, legato wash. This should feel completely different from the same chords in Level 4.",
      wrong: "If it sounds choppy and percussive, you're still muting like reggae — let the chords ring. If your arm gets tired before 60 seconds, you're gripping the pick too hard — relax your wrist. If the F# barre buzzes at speed, isolate that transition at half tempo.",
      sarah: "Gene, this is one of the most powerful lessons in the curriculum: same three chords, completely different song. In Level 4, B-F#-E was a chill reggae groove. Here it's a driving acoustic anthem. Susto plays it with aggressive, jangly energy — bright acoustic tone, every 16th note voiced, chords ringing and overlapping. The warm overdrive with medium spring reverb gives it body without muddiness. The difference isn't the chords — it's the FEEL. This is why feel matters more than harmony.",
      metronome: 90,
      levelUp: "Play B-F#-E with continuous 16th-note strumming at 110+ BPM for 2 minutes without stopping, with clear dynamic accents on beats 1 and 3, and legato chord transitions where each chord rings fully.",
      recorder: true,
      speedLadder: { start: 90, end: 114, increment: 8, bars: 4 },
      chordVoicings: { chords: ["B", "F#", "E"] }
    },
    {
      id: "gs-7-10",
      time: 10,
      title: "Extended SoCal Jam — Full Song, Recorded",
      type: "guitar",
      what: "Your Level 7 capstone. Build a 3-4 minute SoCal reggae-rock piece from scratch using everything you've learned: clean skank, distorted skank, power chord riff, pentatonic solo, dynamic contrast, and the SoCal switch. Record the whole thing as one take. This is YOUR reggae-rock song.",
      setup: "Guitar. Full rig (clean + distortion). Backing track or metronome at your chosen tempo (90-110 BPM recommended). Recording ready.",
      steps: [
        { text: "Design your song structure. Pick from these ingredients: clean skank, distorted skank, power chord riff, power chord chorus, pentatonic solo, breakdown (drums only), build (crescendo into chorus). Arrange them into a structure that has at least 3 sections and one surprise moment. Write it on paper.", why: "You're not just executing a preset structure — you're COMPOSING. Choosing which ingredients to use and how to arrange them is songwriting. The 'surprise moment' could be an unexpected solo break, a sudden silence, or a key change." },
        { text: "Choose your key. Am is comfortable, but E lets you use open power chords (E5 is the lowest, heaviest power chord on guitar). D is warm. Pick one key and build all your sections in it.", why: "Key choice affects the feel of power chords. Lower keys (D, E) feel heavier and more aggressive. Higher keys (A, B) feel brighter. For SoCal reggae-rock, E or A are the sweet spots — heavy enough for power chords, bright enough for skanks." },
        { text: "Rehearse: play through your structure 3 times. Each pass should be smoother than the last. Focus on transitions — the moments between sections are where songs succeed or fail. By pass 3, you should be able to play the whole thing without stopping.", why: "Three rehearsal passes with increasing fluency is the minimum for a solid recording take. The first pass identifies problems, the second fixes them, the third confirms the fixes. Don't record before pass 3." },
        { text: "Add one expressive touch you haven't planned: maybe a bend in the solo, a volume swell at the start, a sudden stop before the last chorus. Something that makes this YOUR version, not a template. Practice it 3 times.", why: "Planned spontaneity sounds contradictory, but it's how great performances work. You practice the 'spontaneous' moment so it's reliable, then it feels genuine in the recording. This is your artistic signature." },
        { text: "Record the full piece in one take. If you make a mistake, keep playing — a recovered mistake sounds more live and human than a stopped recording. Listen back when you're done. This is your Level 7 graduation piece.", why: "One-take recording builds performance confidence. In a live setting, you can't stop and restart. Learning to recover from mistakes and keep the groove going is a critical skill — and often the mistakes become the most interesting moments." }
      ],
      feel: "This should feel like performing at a beach show — the kind of set that makes people look up from their drinks. Confident, dynamic, expressive. Your song should have a journey: a beginning that draws people in, a middle that builds energy, and an ending that leaves them wanting more.",
      wrong: "If the piece feels mechanical or like a checklist of techniques, you're over-thinking. Close your eyes, feel the groove, and let the sections flow into each other naturally. If a section isn't working, cut it — a simple 2-section song played with conviction beats a complex 5-section song played nervously.",
      sarah: "Gene, this is where it all comes together. You've got Pepper's power chord aggression, Slightly Stoopid's solo-over-reggae trick, Iration's dynamic contrast, and levitation room's atmospheric touch. Mix them YOUR way. Nobody else has this specific combination of influences — when you play this piece, it should sound like YOU, not like any one of those bands. That's how genres evolve: someone takes pieces from everywhere and makes something new. Record it. This is your SoCal reggae-rock debut.",
      metronome: 100,
      tracks: [
        { name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" },
        { name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }
      ],
      recorder: true,
      levelUp: "Can design and perform a 3+ minute SoCal reggae-rock piece from scratch that includes clean skank, distorted power chords, a pentatonic solo break, and at least two dynamic transitions — recorded in one take with no full stops."
    }
  ]
};
