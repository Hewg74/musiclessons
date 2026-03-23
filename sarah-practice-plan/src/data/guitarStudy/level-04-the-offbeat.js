import { getPitchRange } from "../appData.js";

export const level4 = {
  level: 4,
  title: "The Offbeat",
  subtitle: "The reggae skank. Play on the \"ands.\" Make silence louder than sound.",
  description:
    "Everything you've strummed so far has lived on the downbeat — the strong beats your foot taps on. Now you flip it. The reggae skank plays ONLY on the upbeats, the \"ands\" between the beats, with an immediate palm mute after each stroke. It's the rhythmic backbone of reggae, ska, and half the SoCal surf-rock you love. This level teaches you to hear and feel the space between beats, to make silence as intentional as sound, and to control exactly how long a chord rings before your palm kills it.",
  artists: "The Elovaters, Susto, NO CIGAR, Baskervillain",
  unlocks: "Barre Chord World (Level 5)",
  review: {
    label: "Level 3 Check-In",
    time: 5,
    exercises: ["gs-3-2", "gs-3-7"],
    prompt: "Play palm-muted power chords (gs-3-2) at 100 BPM cleanly. Then play a PReVaDe cycle with a 4-note riff (gs-3-7). Both solid? The offbeat awaits."
  },
  exercises: [

    // ─── PHASE 1: ISOLATE THE SKANK ───

    {
      id: "gs-4-1",
      time: 8,
      title: "The Skank Isolation — Rhythm Before Chords",
      type: "guitar",
      what: "Before adding any chords, you need to feel the offbeat in your strumming arm. Mute all strings with your fretting hand (lay your fingers flat across the strings without pressing down). Now strum ONLY on the \"ands\" — the upbeats between the metronome clicks. Your arm swings on every eighth note, but you only let the pick hit strings on the upstrokes. This is the skank stripped to pure rhythm.",
      setup: "Guitar. Mute all strings with fretting hand. Metronome at 70 BPM.",
      steps: [
        { text: "Lay your fretting hand flat across all six strings — don't press down, just touch them lightly so they're completely muted. Strum down and up with constant arm motion at 70 BPM. Every stroke should produce a percussive \"chik\" with no pitch. Get comfortable with the muted sound — this IS the skank texture.", why: "Muting removes all pitch information so you can focus purely on rhythm and arm mechanics. The percussive \"chik\" is exactly what a reggae skank sounds like — short, sharp, rhythmic. You're learning the sound before the technique." },
        { text: "Now count out loud: \"1 AND 2 AND 3 AND 4 AND.\" Your foot taps on the numbers (1, 2, 3, 4). Your strum arm swings on every syllable (constant motion). But you only LET the pick contact strings on the \"AND\" syllables — the upstrokes. On the numbers, your arm swings past the strings without touching.", why: "Counting out loud while playing locks the rhythm into three systems simultaneously — voice, body (foot), and hands. The critical test: if your pick hits strings at the same time as your foot taps the floor, you're on the DOWNBEAT, which is wrong. Pick hits BETWEEN foot taps." },
        { text: "Close your eyes. Feel the gap between your foot tap and your strum. That gap IS the offbeat — feel it in your whole body: the foot pushes down, then the wrist snaps up. The bounce lives between those two motions. Think of it as an echo: foot... strum... foot... strum. Feel how your body naturally wants to sway with this syncopation — there's a physical bounce, a springiness in your posture. 2 minutes with eyes closed, muted strings.", why: "The offbeat is a physical sensation, not an intellectual concept. Closing your eyes removes visual distractions and forces you to feel the rhythmic relationship between foot and hand. The whole-body sway that emerges is your nervous system internalizing the groove — when the gap feels natural and your body moves without thinking, you've embodied it." },
        { text: "Speed test: increase the metronome to 80 BPM. Then 85. Then 90. At each tempo, play 8 bars of clean muted skanks. If you fall back onto the downbeat at higher tempos, drop back to 70 and rebuild.", why: "Higher tempos compress the gap between downbeat and upbeat, making it harder to stay on the \"ands.\" Building speed gradually ensures the offbeat feel stays solid rather than collapsing into downbeat strumming under pressure." },
        { text: "Final check: have someone watch your foot. Or record a video. Your foot should tap on 1-2-3-4 while your hand strikes BETWEEN those taps. If foot and hand land together, you're on the downbeat. The visual proof is unmistakable.", why: "Self-diagnosis is hard with rhythm. External feedback (video or a friend watching) catches the most common beginner error — accidentally syncing hand and foot on the same beat. Once you see it, you can't unsee it." }
      ],
      feel: "The skank should feel like a bouncy, springy rhythm — your hand pops off the strings on every upstroke like a rubber ball bouncing. There's a lightness to it, a lift. It should make your head bob on the offbeats, not the downbeats. If your body wants to sway, you've got it.",
      wrong: "If your strum lands at the same moment as your foot tap, you're on the downbeat — the most common error. Every guitarist's first offbeat attempt lands on the downbeat. That's your rhythm brain rewiring, not a flaw. Slow down to 60 BPM and exaggerate the gap. Another error: letting the muted strum ring too long. The skank is SHORT — hit and immediately return. Chik, not chhhhhh.",
      sarah: "Gene, this is the rhythm that makes your body move differently. Reggae doesn't hit you on the \"1\" like rock does — it catches you in the spaces between. The Elovaters, Susto, Pepper — every reggae and reggae-rock band you love lives on this upbeat pulse. Once your arm learns this bounce, it never forgets.",
      metronome: 70,
      speedLadder: { start: 70, end: 90, increment: 10, bars: 4 },
      levelUp: "16 bars of clean muted skanks at 85 BPM. Foot taps on downbeats, hand strikes on upbeats only. No accidental downbeat strums.",
      rhythmCells: [
        { name: "Offbeat Skank", pattern: [0.5, 0.5], description: "Strum on the ands only — rest on beats, hit on upbeats" },
        { name: "Constant Arm", pattern: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], description: "Arm swings on every eighth note — full bar of constant motion" }
      ]
    },
    {
      id: "gs-4-2",
      time: 8,
      title: "Adding Chords to the Skank — Am and Em",
      type: "guitar",
      what: "Now add real chords to the skank rhythm you just isolated. Start with Am — a chord you already know cold. The difference: instead of letting it ring, you immediately mute it with your palm after each upstroke. Strike on the \"and,\" kill the sound before the next downbeat. The chord should bark — short, sharp, rhythmic. Then switch to Em. Two chords, offbeat only.",
      setup: "Guitar. Metronome at 70 BPM.",
      chordVoicings: { chords: ["Am", "Em"] },
      steps: [
        { text: "Hold Am. Strum ONLY on the upbeats (the \"ands\") at 70 BPM with constant arm motion. After each upstroke, immediately bring the heel of your strumming hand down onto the strings near the bridge to kill the sound. Feel the chop in your wrist — a quick snap-and-catch, like catching a ball. The chord should last less than a quarter beat — a quick \"chak\" and then silence. The silence is physical: your palm rests on the muted strings, you feel them go still.", why: "The palm mute is what gives the skank its character. The chop is in your wrist, the mute is in your palm, the bounce is in your whole body. Without it, the chord rings into the next beat and the offbeat groove disappears. The mute creates the silence that makes the upbeat strum pop. Reggae is as much about the silence as the sound." },
        { text: "Focus on the mute timing: strike the strings on the \"and,\" then mute BEFORE the next downbeat arrives. The window is tiny at 70 BPM — your palm needs to land almost immediately after the strum. Practice this cycle: strum-mute-silence, strum-mute-silence. 16 bars.", why: "The speed of your palm mute determines the skank's texture. A fast mute = short, percussive chop (classic roots reggae). A slightly slower mute = more chord tone rings through (rocksteady feel). Right now, aim for fast — you can loosen it later." },
        { text: "Switch to Em — same skank rhythm, same immediate palm mute. Em is easier (two fingers), so your fretting hand can relax while your strumming hand focuses on the mute-and-release cycle. 8 bars of Em skank.", why: "Switching chords while maintaining the skank rhythm tests whether the rhythm is in your strumming arm (good) or in your brain (fragile). If the skank falls apart when you change chords, the rhythm isn't physical enough yet." },
        { text: "Alternate: 4 bars Am skank, 4 bars Em skank. Repeat 4 times. The chord change happens on beat 1, but your first strum doesn't land until the \"and\" of beat 1. That tiny silence after the change IS the reggae feel.", why: "The gap between the chord change (beat 1) and the first skank strum (\"and\" of 1) is one of reggae's most distinctive sounds. It creates a breathing space that makes the groove feel relaxed rather than rushed." },
        { text: "Record 8 bars: 4 bars Am, 4 bars Em. Listen back. Can you hear the palm mute cutting each chord short? Can you hear the silence between skanks? The silence should feel as loud as the chords.", why: "Self-listening reveals muting problems your hands can't feel. If the chords are ringing too long, your mute is late. If there's no audible chord tone at all, your mute is too early or too aggressive. The sweet spot is a crisp chord burst followed by clean silence." }
      ],
      feel: "Each skank should feel like a quick handclap — sharp, percussive, over before you know it. The silence between skanks should feel intentional, like a drummer's rest. Your strumming hand does two jobs: strike and kill. The groove bounces.",
      wrong: "If the chord rings past the next downbeat, your palm mute is too slow — bring your hand down faster. If there's no chord tone at all (just a muted thud), you're muting too early or pressing too hard with the palm. You need a brief moment of actual chord sound before the mute kills it. If the rhythm keeps collapsing onto downbeats, go back to gs-4-1 muted strings.",
      sarah: "Gene, listen to The Elovaters' Gimme Love — that clean chop on every upbeat is EXACTLY what you're building here. The chord barely has time to ring before it's silenced. That's not sloppiness — it's precision. The silence between skanks is what makes reggae breathe.",
      metronome: 70,
      recorder: true,
      levelUp: "8 bars alternating Am and Em skank at 80 BPM. Every chord is immediately palm-muted. No chord rings past the downbeat."
    },
    {
      id: "gs-4-3",
      time: 7,
      title: "The Mute-and-Release — Controlling Ring Time",
      type: "guitar",
      what: "The skank isn't just \"strum and mute\" — it's a spectrum. A super-short mute gives you the classic reggae chop. A slightly longer release (letting the chord ring for an eighth note before muting) gives you rocksteady warmth. An even longer release creates a half-skank feel used in reggae-rock. This exercise teaches you to control exactly how long the chord sings before your palm kills it.",
      setup: "Guitar. Am chord. Metronome at 75 BPM.",
      chordVoicings: { chords: ["Am"] },
      steps: [
        { text: "Play the Am skank at 75 BPM with the SHORTEST possible ring time — strum on the \"and\" and mute almost instantly. The chord should be a percussive click with the barest hint of pitch. This is the roots reggae chop — think early Bob Marley, Toots and the Maytals. 8 bars.", why: "The shortest ring time produces the most percussive skank — it's almost a drum hit that happens to have pitch. This is the traditional reggae sound, and it's the most disciplined form of the technique. Mastering the short chop first gives you control over everything longer." },
        { text: "Now lengthen the ring time: let the chord sound for about one eighth note (half the gap between beats) before muting. The chord has audible warmth now — you can hear the Am tonality before the palm kills it. This is rocksteady — smoother, warmer, more melodic. 8 bars.", why: "Rocksteady emerged from ska by slowing down and letting chords ring slightly longer. The extra ring time creates warmth without losing the offbeat groove. You're learning that the mute timing IS the style — same chords, same rhythm, different mute speed = different genre." },
        { text: "Even longer: let the chord ring for nearly a full beat before muting — the chord sounds almost sustained, but the mute still catches it before the next skank. This is the reggae-rock feel that Pepper and Slightly Stoopid use — more chord, less chop. 8 bars.", why: "SoCal reggae-rock pushes the ring time to the limit — the chord almost sustains fully, but the mute keeps it rhythmic rather than flowing. This longer ring time lets distortion and overdrive creep in, which is how reggae-rock gets its crunch." },
        { text: "Toggle between all three: 2 bars short chop, 2 bars rocksteady warmth, 2 bars reggae-rock sustain, 2 bars short chop. Feel how the same Am chord on the same offbeat rhythm produces three completely different textures just by changing your mute speed.", why: "Mute timing is your texture knob. Fast mute = percussive roots. Medium mute = warm rocksteady. Slow mute = punchy reggae-rock. You now control a continuous spectrum, not just on/off." },
        { text: "Choose your favorite of the three textures. Play 16 bars at that mute speed. This is your default skank feel — the one that matches your instinct. Record it.", why: "Your preferred mute speed reveals your natural reggae sub-genre affinity. There's no wrong answer — Gene, your playlist suggests you'll probably gravitate toward the rocksteady or reggae-rock end, but let your hands decide." }
      ],
      feel: "Short chop should feel tight and controlled — like snapping your fingers. Rocksteady should feel warm and groovy — like slow dancing. Reggae-rock should feel full and driving — like a car in second gear. Each texture should feel physically different in your strumming hand.",
      wrong: "If all three ring times sound the same, you're not differentiating enough. Exaggerate: make the short chop absurdly clipped (almost no sound) and the reggae-rock sustain nearly full (just barely muted). The extremes will help you find the middle. If the mute is inconsistent bar to bar, slow the tempo.",
      sarah: "Gene, this is the secret weapon. Most guitar players learn ONE skank and use it everywhere. You're learning a mute-speed spectrum — which means you can match any reggae sub-genre just by adjusting your palm. The Elovaters sit in the short chop zone. Pepper lives in the reggae-rock sustain zone. You get to pick your spot.",
      metronome: 75,
      recorder: true,
      levelUp: "Can clearly produce three distinct mute speeds (short chop, rocksteady warmth, reggae-rock sustain) on command at 80 BPM. A listener can hear the difference between all three."
    },

    // ─── PHASE 2: SONG STUDIES ───

    {
      id: "gs-4-4",
      time: 8,
      title: "Song Study: Gimme Love — The Elovaters (F-C-G)",
      type: "guitar",
      songRef: {
        title: "Gimme Love — The Elovaters",
        src: "/gimme-love.mp3",
        note: "Listen to the offbeat chop — light, bouncy, island vibes. Three open chords in the key of C. Match the feel."
      },
      what: "The Elovaters' Gimme Love is a three-chord reggae tune in the key of C: F-C-G. All open chords — no barres needed. Listen to the recording twice before playing — first time, feel the island bounce in your body. Second time, ghost the skank rhythm with your strumming arm. This is reggae with chords you already know from Level 1. The magic is applying the offbeat skank to familiar shapes.",
      setup: "Guitar. Metronome at 80 BPM (song is ~86, start slower). Listen to the song reference first.",
      chordVoicings: { chords: ["F", "C", "G"] },
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "You already know F (from Level 1, simplified version), C, and G. Play F-C-G-C as a loop, 4 beats each chord, with the offbeat skank you've been building. The arm swings on every eighth note; you only hit strings on the 'ands.'", why: "Gimme Love uses chords you already own — the new skill is applying the reggae rhythm to them. This proves that reggae isn't about special chords; it's about the rhythmic feel applied to ANY chords." },
        { text: "Listen to the song and match the feel: the skank is light and bouncy, not aggressive. The Elovaters have a more pop-reggae approach — the chop isn't as tight as roots reggae. Let the chords ring a little longer before muting.", why: "Different reggae artists use different mute speeds. The Elovaters are on the 'longer ring' end — the chord speaks for a moment before the mute kills it. This creates a warmer, more island-pop feel compared to the tight roots chop." },
        { text: "Put on the drums-only reggae track. Play F-C-G-C with the skank at 85 BPM. Feel how the kick drum and your guitar interlock — you take the ands, the kick takes beat 3.", why: "Playing with drums reveals how the skank fits in a band context. The one-drop kick (beat 3) is your rhythmic partner." },
        { text: "Sing along: hum the vocal melody of Gimme Love while maintaining the skank. The point is to keep the rhythm steady while your brain handles melody — this is performance multitasking.", why: "In a band, you'd be skanking while a singer delivers the melody. Being able to maintain the skank on autopilot while thinking about something else is essential." }
      ],
      feel: "Light, bouncy, island vibes — like swaying at a beach festival. The Elovaters' reggae is friendly and warm, not heavy. Your skank should match that energy — relaxed, smiling, unhurried.",
      wrong: "If the F chord is still buzzing, use the simplified version (top 4 strings only). If the skank feels stiff on these open chords, you might be gripping too hard — reggae requires a light touch so you can release quickly for the mute.",
      sarah: "Gene, Gimme Love is your #10 most-played track. It's beautiful proof that reggae works with the simplest chords — F, C, G in the key of C. You learned these shapes in Level 1. Now they're reggae. Same shapes, completely different world. That's what rhythm does to harmony.\n\nHere's something interesting — listening closely to the Elovaters recording, the guitar part sounds fingerpicked rather than strummed, with thumb bass on the downbeat, syncopated finger plucks, and percussive string slaps on beats 2 and 4. In Level 11, you'll explore a fingerpicked interpretation of this progression. For now, the strummed reggae version works perfectly as your offbeat technique vehicle — same chords, same groove, different right-hand approach.",
      metronome: 85,
      recorder: true,
      levelUp: "Play F-C-G-C skank at 85 BPM for 3 full cycles with clean offbeat rhythm, relaxed muting, and no downbeat slips."
    },

    {
      id: "gs-4-4b",
      time: 8,
      title: "Song Study: Jah Werx — Susto (B-F#-E)",
      type: "guitar",
      songRef: {
        title: "Jah Werx — Susto",
        src: "/jah-werx.mp3",
        note: "Listen to the reggae influence on an indie-rock band. B-F#-E with that offbeat bounce. These are barre chords — your first reggae barre workout."
      },
      what: "Susto's Jah Werx uses B-F#-E — three chords in the key of B, all requiring barre chord shapes. This is a step up from Gimme Love's open chords. B is a barre at fret 2, F# is a barre at fret 2 (E-shape), and E is your familiar open chord. The reggae rhythm is the same offbeat skank — now applied to barre shapes.",
      setup: "Guitar. Metronome at 80 BPM (song is ~85). Listen to the song reference first.",
      chordVoicings: { chords: ["B", "F#", "E"] },
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      steps: [
        { text: "Learn the barre shapes: B is x24442 (A-shape barre at fret 2). If the full barre is too hard, use B7 (x21202) — it works perfectly in reggae. F# is 244322 (E-shape barre at fret 2). E is your open 022100. Practice switching without rhythm first.", why: "B-F#-E requires barre chords, which is why this exercise follows the open-chord Gimme Love study. You're applying the same reggae rhythm to harder shapes." },
        { text: "Add the skank: B on offbeats for 4 bars, F# for 4 bars, E for 4 bars, back to B. The barre shapes are harder to mute cleanly — release pressure quickly after each strum for a tight chop.", why: "Barre chord skanks require faster pressure release than open chord skanks. Your hand clamps and releases on every eighth note — it's a workout, but it builds the hand endurance you need for Level 5." },
        { text: "Play along with the drums-only track at 85 BPM. B-F#-E-B with the skank. Feel the indie-reggae crossover — Susto gives the B-F#-E template an Americana twist.", why: "Susto proves that B-F#-E isn't just roots reggae — different artists bring different attitudes to the same chords. Same skeleton, different skin." },
        { text: "Compare: play Gimme Love (F-C-G, open chords, pop-reggae) for 2 cycles, then switch to Jah Werx (B-F#-E, barre chords, indie-reggae) for 2 cycles. Same skank rhythm, completely different chord feel.", why: "Switching between open and barre chord reggae in one session trains your hand to adapt. The skank stays constant; only the chord shapes change." }
      ],
      feel: "The B-F#-E skank should feel warm and unhurried — a lazy Sunday afternoon. The barre chords give it a thicker, more robust sound than the open-chord Gimme Love. If you're tense, you're gripping too hard.",
      wrong: "If barre chords buzz, focus on clean fretting before speed — a buzzy skank sounds worse than a slow clean one. If changes break the rhythm, hold each chord for 8 bars instead of 4. If B barre is impossible right now, use B7 and come back to the full barre after Level 5.",
      sarah: "Gene, Jah Werx is in your top 30. Susto takes the classic reggae template and gives it an indie twist — same B-F#-E that Bob Marley would recognize, but with Susto's rootsy energy. This exercise is your bridge between the open-chord reggae of Gimme Love and the barre-heavy reggae-rock of Level 7 (Pepper, Slightly Stoopid).\n\nFun fact — listen to the actual Susto recording and you'll hear something surprising. Jah Werx isn't a reggae skank at all. It's a driving acoustic tune at 114 BPM with continuous 16th notes and bright, jangly chords ringing fully into each other. You're learning the B-F#-E progression here as a reggae exercise because it teaches you the offbeat chop on barre chords — but in Level 7, you'll revisit these same chords at Susto's actual tempo and feel. Same three chords, completely different technique.",
      metronome: 85,
      recorder: true,
      levelUp: "Play B-F#-E-B skank at 85 BPM for 3 cycles with clean barre chords, consistent offbeat rhythm, and audible mutes. Can switch between this and Gimme Love (F-C-G) without stopping."
    },
    {
      id: "gs-4-5",
      time: 7,
      title: "Ghost Notes — Percussive Texture Between Skanks",
      type: "guitar",
      what: "Ghost notes are the secret ingredient that separates a stiff skank from a living one. They're muted strums (no chord, no pitch) that fill the rhythmic spaces between your skanks. Your arm is already swinging on every eighth note — ghost notes turn those \"miss\" swings into quiet percussive taps. The result: a constant rhythmic texture where the skanks POP out of a bed of muted clicks.",
      setup: "Guitar. Am chord. Metronome at 80 BPM.",
      steps: [
        { text: "Start with a basic Am skank: offbeat strums with palm mute, silence on the downbeats. Now, instead of letting your arm swing through air on the downbeats, let it lightly brush the muted strings — a quiet \"chk\" that's barely audible. These ghost strums fill the silence with rhythmic texture. 8 bars.", why: "Ghost notes transform dead silence into active silence. Your arm was already swinging on every eighth note (constant arm motion) — ghost notes make those swings audible at a very low volume. The skank becomes the LOUD event that pops out of a field of quiet percussion." },
        { text: "Adjust the dynamic balance: ghost notes should be at about 20% of the volume of your skanks. If the ghosts are too loud, they'll compete with the real skanks and the groove will flatten out. Think of it as: whisper (ghost), SPEAK (skank), whisper (ghost), SPEAK (skank). 8 bars.", why: "The volume contrast between ghost notes and skanks is what creates rhythmic depth. In mixing terms, ghosts are the reverb tail and skanks are the transient attack. The ear groups them into a single rhythmic texture with built-in dynamics." },
        { text: "Try a variation: add ghost notes on BOTH the downbeat AND immediately after the skank (before the next downbeat). Now every eighth note has SOME sound — alternating between ghost (quiet muted) and skank (loud chord). The rhythm becomes a continuous 16th-note-ish stream. 8 bars.", why: "Filling every rhythmic slot with either a ghost or a skank creates the dense, busy texture heard in ska and dancehall. The chords still pop on the upbeats, but the ghosts create a constant rhythmic propulsion underneath." },
        { text: "Now apply ghost notes to the B-F#-E progression from the previous exercise. Play B(4)-F#(4)-E(4)-B(4) with offbeat skanks AND ghost notes filling the downbeats. The chord changes should happen inside the ghost-note stream without breaking the rhythmic flow.", why: "Ghost notes during chord changes are the hardest moment — your fretting hand is moving to a new shape while your strumming hand needs to produce a quiet muted strum. The ghost note \"covers\" the transition, making the change sound seamless." },
        { text: "Record 16 bars: B-F#-E-B with skanks and ghost notes at 85 BPM. Listen back. Can you hear the ghost notes as a subtle texture underneath the skanks? They should be present but not dominant — like a quiet heartbeat under the music.", why: "Self-listening for ghost notes trains your dynamic awareness. In the recording, ghosts should be barely there — felt more than heard. If they jump out of the mix, reduce your ghost-strum intensity." }
      ],
      feel: "With ghost notes, the skank should feel like it has a pulse — a constant underlying heartbeat of muted taps with the chord skanks punching through on top. Your arm never stops, and EVERY swing produces some sound — the only question is loud (skank) or quiet (ghost).",
      wrong: "If ghost notes are as loud as your skanks, the groove goes flat — there's no dynamic contrast. Lighten the ghost strums until they're barely touching the strings. If ghost notes are disrupting your offbeat rhythm, drop them and go back to clean skanks until the upbeat timing is rock solid. Ghosts are decoration, not foundation.",
      sarah: "Gene, listen closely to any Elovaters or Stick Figure track — there's a constant rhythmic texture underneath the skanks. That's ghost notes. They're the difference between a guitarist who's \"playing reggae\" and one who GROOVES reggae. The ghost notes are what make your head move even when you're not conscious of them.",
      metronome: 80,
      chordVoicings: { chords: ["Am", "B", "F#", "E"] },
      recorder: true,
      levelUp: "B-F#-E-B at 85 BPM with audible ghost notes between skanks. Ghost notes are at least 50% quieter than skanks. Rhythm stays on the offbeat throughout."
    },
    {
      id: "gs-4-6",
      time: 10,
      title: "Song Study: 1999 — Laid-Back Reggae-Surf",
      type: "guitar",
      songRef: {
        title: "1999 — NO CIGAR",
        src: "/1999-no-cigar.mp3",
        note: "Laid-back reggae-surf. Listen for the offbeat skank and the coastal reverb haze."
      },
      what: "NO CIGAR's 1999 is a reggae-surf hybrid at 85 BPM here (the actual recording is closer to 108 BPM — we'll work up to that). The verified chords are E-B-F#-A (some tabs show G#m instead of A — both work, but A is the verified version). It's mellow, behind the beat, with a longer ring time on the skank. The A adds a bright, open quality that lifts the progression — it's the IV chord — the same role that E plays in Jah Werx (B-F#-E). This song teaches you that reggae can be dreamy and surf-inflected.",
      setup: "Guitar. Metronome at 80 BPM (target: 85).",
      chordVoicings: { chords: ["E", "B", "F#", "A"] },
      tracks: [{ name: "E Major Reggae 85", src: "/e-major-reggae-85.mp3" }],
      steps: [
        { text: "Learn the four shapes: E major (022100) — open, easy. B — barre at fret 2 (x24442) or B7 (x21202). F# — barre at fret 2 with E shape (244322). A — open (x02220). Three of these are shapes you already know. The F# barre is the challenging one — this is a gateway to Level 5's barre chord world.", why: "The A chord is open and easy, giving you a rest point in the progression. The real work is the F# barre at fret 2 — once you've got this E-shape barre, you can play any major chord anywhere on the neck by sliding the shape." },
        { text: "Practice the progression without rhythm: E-B-F#-A, hold each chord for 4 slow strums, focus on clean transitions. A is an open chord (x02220), so the trickiest change is F# barre to open A — releasing the barre cleanly while reforming the A shape. 4 cycles.", why: "Barre-to-open transitions require releasing the barre pressure and quickly reforming a new shape. This is the opposite of the barre-to-barre slide — it's a different muscle memory pattern that transfers directly to Level 5." },
        { text: "Add the skank: E(4 bars)-B(4)-F#(4)-A(4) with offbeat strums and medium mute speed (rocksteady feel). Start at 80 BPM. The vibe of 1999 is relaxed and behind the beat — don't rush to the next chord. Let the last skank of each chord ring slightly longer before transitioning.", why: "1999 has a laid-back, hazy quality — it's reggae filtered through a surf lens. The medium mute speed gives it warmth, and the slightly delayed chord changes create the behind-the-beat feel that defines this song." },
        { text: "Play along with the E Major Reggae backing track at 85 BPM. Feel how the E chord sits at home, B creates lift, F# builds tension, and A opens the sky before cycling back to E. The A is the IV chord — it adds a bright, warm quality that keeps the progression moving forward.", why: "Playing with a track in the right key (E major) reveals how your chords sit in a full musical context. The A (IV chord) adds warmth and lift — it's the same harmonic function as the F in a C major song. It wants to go somewhere, and that forward pull is what makes the loop feel alive." },
        { text: "Try adding ghost notes between skanks while playing the full progression over the backing track. If the ghost notes break your chord changes, drop them during the transition bar and add them back once you've landed on the new chord. Record a full play-through.", why: "Ghost notes during barre chord changes are advanced — your fretting hand is sliding to a new position while your strumming hand produces a quiet muted strum on strings that may not be fully fretted yet. Dropping ghosts during transitions and restarting them after landing is a practical, musical solution." }
      ],
      feel: "1999 should feel hazy and sun-bleached — like watching waves through half-closed eyes. The reggae skank provides the groove, but the surf influence softens everything. The A chord should feel like a warm lift — a bright, open moment before cycling back to E.",
      wrong: "If the F# barre is buzzing, check your technique: bony edge of the index finger, thumb behind the neck (not wrapped over), slight elbow tuck. If the chord changes are choppy, slow to 75 BPM and give each chord 8 bars instead of 4. If the feel is too stiff and precise, loosen up — reggae lives slightly behind the beat, not on top of it.",
      sarah: "Gene, 1999 is such a vibe — NO CIGAR takes that classic reggae bounce and drenches it in reverb and coastal haze. It's the perfect bridge between the roots reggae of Gimme Love and the more polished reggae-rock you'll get into later. The A chord lifts the progression with warmth — it keeps the energy moving forward without getting heavy.\n\nThe actual NO CIGAR recording is faster than you might expect — around 108 BPM with a funky 16th-note rhythm and heavy left-hand muting. The verses are tightly chopped and staccato, then the choruses open up slightly. There's even a melodic guitar solo with expressive whole-step bends. You're learning the offbeat foundation here, but this song has layers you'll come back to.",
      metronome: 85,
      recorder: true,
      levelUp: "E-B-F#-A skank progression at 85 BPM for 3 cycles with clean chord transitions, consistent offbeat rhythm, and ghost notes on at least 50% of the bars."
    },

    // ─── PHASE 3: EXPANDING THE FEEL ───

    {
      id: "gs-4-7",
      time: 8,
      title: "Reggae vs. Rock Feel — Same Chords, Different Universe",
      type: "guitar",
      what: "Here's the mind-bending part: take the E-B-F#-A progression from 1999 and play it as a ROCK song. Downbeat power strums, no palm mute, full ring. It sounds completely different — same chords, different rhythmic world. Then flip it back to reggae. This exercise proves that RHYTHM (not chords) defines genre. You'll toggle between rock and reggae on the same progression.",
      setup: "Guitar. Metronome at 85 BPM.",
      chordVoicings: { chords: ["E", "B", "F#", "A"] },
      steps: [
        { text: "Play E-B-F#-A as a ROCK song: downbeat strums (hit on 1-2-3-4), let chords ring fully, no palm mute. Strum hard, let it sustain. This is how a rock band would play these four chords — full, driving, forward. 4 bars per chord, 2 cycles.", why: "Playing the same chords in a rock style creates a visceral contrast. The chords haven't changed — E, B, F#, A — but the feel is utterly different. This proves that rhythm and muting technique define the genre, not the chord progression itself." },
        { text: "Without stopping, switch to REGGAE: same chords, same tempo, but now offbeat skanks with immediate palm mute. Feel the transformation — the energy shifts from pushing forward (rock) to bouncing sideways (reggae). Do 2 cycles.", why: "The instant switch from rock to reggae on the same chords trains your hands to think in rhythmic styles, not just chord shapes. This is how versatile players shift genre mid-song — the chords stay, the rhythm transforms." },
        { text: "Toggle: 2 bars rock, 2 bars reggae, 2 bars rock, 2 bars reggae. Same chord, same tempo. Your strumming hand is the ONLY thing that changes — fretting hand stays on the same chord. Feel how your body posture shifts: rock pushes forward, reggae leans back.", why: "Rapid toggling forces your strumming arm to switch between two completely different motor patterns. This builds the muscle memory for both styles simultaneously and makes the contrast physically tangible." },
        { text: "Try a third feel: REGGAE-ROCK HYBRID. Strum on the downbeat AND the upbeat, but mute the downbeat strum and let the upbeat ring. The downbeat becomes a ghost note, the upbeat is the skank. This is the Pepper/Slightly Stoopid approach — busier than roots reggae, groovier than straight rock. 8 bars.", why: "The reggae-rock hybrid is the bridge between the two worlds. It keeps the upbeat emphasis of reggae but adds the drive of rock through the busier strumming pattern. This is the exact feel of Stormtrooper's verses and half the SoCal reggae catalog." },
        { text: "Record all three back-to-back: 4 bars rock, 4 bars reggae, 4 bars hybrid. Listen for the contrast. Which one makes your head move most? That's your natural groove.", why: "Hearing the three feels in sequence reveals your rhythmic personality. Some players naturally lean toward the forward drive of rock, others toward the bounce of reggae, others toward the hybrid. All are valid — this exercise maps your instinct." }
      ],
      feel: "Rock should feel like leaning into the wind. Reggae should feel like swaying in a hammock. The hybrid should feel like bouncing on a trampoline — energetic but springy. The CHORDS are identical — only your body changes.",
      wrong: "If rock and reggae sound similar, you're not committing to either. Rock needs LOUD, sustained, downbeat-heavy strums. Reggae needs SHORT, muted, upbeat-only strums. Exaggerate both directions. If the toggle feels jerky, give yourself a full bar of silence between styles to reset your arm.",
      sarah: "Gene, this is how Pepper writes songs — they toggle between clean reggae verses and crunchy rock choruses using the SAME chord progressions. Stormtrooper literally does this: reggae skank verse, power chord chorus, back to skank. Now you can do it too. The chords don't change — your hands do.",
      metronome: 85,
      recorder: true,
      levelUp: "Can cleanly toggle between rock, reggae, and hybrid feels on E-B-F#-A at 85 BPM. A listener can identify which style you're playing without being told."
    },
    {
      id: "gs-4-8",
      time: 10,
      title: "Song Study: It's a Love — Upbeat Reggae-Ska",
      type: "guitar",
      songRef: {
        title: "It's a Love — Baskervillain",
        src: "/its-a-love.mp3",
        note: "Chords are from Chordify (A-E-C#m-F#-B) — listen and verify the progression order matches."
      },
      // UNVERIFIED — A-E-C#m-B-F# progression has not been confirmed against 2+ independent tab sources
      what: "Baskervillain's It's a Love is faster (112 BPM), brighter, and uses five chords: A-E-C#m-B-F# (Chordify source — hit play above to verify). The upbeat tempo pushes your skank into ska territory — faster skanks, shorter mute windows, more energy.",
      setup: "Guitar. Listen to the song — verify chords. Metronome at 100 BPM (build to 112).",
      chordVoicings: { chords: ["A", "E", "C#m", "B", "F#"] },
      tracks: [{ name: "Ska Upbeat 95", src: "/ska-upbeat-95.mp3" }],
      steps: [
        { text: "Learn the progression: A(2 bars)-E(2)-C#m(2)-E(2)-A(2)-C#m(2)-B(2)-F#(2). Practice the chord shapes without rhythm first. A and E are open chords you know. C#m is a barre at fret 4 (x46654), B at fret 2 (x24442), F# at fret 2 (244322). Get the barre shapes clean.", why: "Five chords with three barre shapes is a significant step up from three-chord reggae. Isolating the shapes first prevents the common trap of trying to learn chords AND rhythm AND tempo simultaneously — which usually means learning none of them well." },
        { text: "Add the skank at 100 BPM. Use the short chop mute — ska skanks are clipped and punchy, not warm and sustained like roots reggae. The faster tempo compresses everything: your arm swings faster, the mute window is shorter, the chord changes come quicker. Start with A-E only, 2 bars each, get the tempo locked.", why: "At 112 BPM, the upbeat arrives every 0.27 seconds — significantly faster than the 0.35 seconds at 85 BPM. Starting at 100 BPM gives you breathing room to lock the rhythm before pushing to full tempo." },
        { text: "Add C#m to the cycle: A(2)-E(2)-C#m(2)-E(2). The C#m change requires a quick slide from open chord territory up to fret 4. Use the ghost note on the transition bar to mask the shift. 4 cycles.", why: "The A→C#m transition is the hardest moment — you're jumping from an open chord to a barre at fret 4. The ghost note technique lets your fretting hand travel while your strumming hand maintains rhythmic continuity." },
        { text: "Full progression: A(2)-E(2)-C#m(2)-E(2)-A(2)-C#m(2)-B(2)-F#(2) at 105 BPM. Then push to 112 BPM — the actual song tempo. If chord changes break the rhythm, hold the simpler chords (A, E) longer and abbreviate the barre sections.", why: "112 BPM is uptempo for a skank — you're in ska territory now. The energy should feel brighter and more driving than the laid-back 85 BPM of Jah Werx. Your strumming arm will naturally tighten up — resist the urge to tense your shoulder. Loose arm, tight wrist." },
        { text: "Play along with the ska backing track. The tempo won't perfectly match (track is 95 BPM), but use it for the feel — the bright, bouncing energy of ska. If 112 BPM is too fast with the full progression, stay at 95-100 and work toward full speed over the next few days.", why: "Reggae-ska is higher energy than roots reggae — your body should reflect that. More bounce, more movement, brighter attack. The tempo difference between the track and the song is an opportunity to practice at a comfortable speed while feeling the ska groove." }
      ],
      feel: "It's a Love should feel bright, bouncy, and energetic — like the musical equivalent of running downhill. The faster skanks have more urgency than the relaxed 85 BPM roots feel. Your whole body should be moving — this isn't mellow hammock reggae, it's get-up-and-dance ska-reggae.",
      wrong: "If the skanks are mushy at 112 BPM (no clear mute, chords running into each other), your mute hand is too slow for the tempo. Drop to 95 BPM and practice the short-chop mute until it's instant. If barre chord changes are crashing the rhythm, simplify the progression to A-E-B (dropping C#m and F#) until the skank is solid, then add barres back one at a time.",
      sarah: "Gene, Baskervillain's vibe is upbeat reggae-ska with surf energy — it's the point where reggae meets the beach party. The five-chord progression gives it more harmonic sophistication than the three-chord templates, and the 112 BPM tempo puts real demands on your skank technique. This is the exercise where your skank has to WORK, not just cruise.\n\nThe secret of It's a Love is extreme dynamic contrast. The verse is sparse — slow downstrokes, individual string picking, clean tone with heavy chorus/vibrato modulation creating a wobbly, underwater sound. Then the chorus ERUPTS — driving aggressive 8th notes through thick fuzz. That clean-to-fuzz switch is the emotional engine. When you practice this, exaggerate the contrast: whisper in the verse, shout in the chorus.",
      metronome: 112,
      recorder: true,
      levelUp: "Full A-E-C#m-B-F# progression at 110+ BPM with clean skanks, immediate mutes, and no rhythmic collapse during barre chord transitions."
    },

    {
      id: "gs-4-8b",
      time: 8,
      title: "Song Study: Surf Hat — Dominant 7th Skank",
      type: "guitar",
      songRef: {
        title: "Surf Hat — Surf Hat",
        src: "/surf-hat.mp3",
        note: "Reggae/ska off-beat chops with dominant 7th voicings. Clean tone with chorus/vibrato effect and spring reverb. Listen for the tight left-hand muting."
      },
      what: "Surf Hat by Surf Hat uses E7-A7-B7-F#7 — all dominant 7th chords. These voicings add a bluesy, unresolved color to the reggae/ska off-beat chops you've been learning. The strum is the same offbeat skank, but the chord shapes are new.",
      setup: "Electric guitar. Clean tone with chorus or vibrato effect if available. Spring reverb. Metronome at 85 BPM.",
      chordVoicings: { chords: ["E7", "A7", "B7", "F#7"] },
      steps: [
        { text: "Learn the four dominant 7th shapes: E7 (020100), A7 (x02020), B7 (x21202), F#7 (242322). Play each one slowly, making sure every string rings clean.", why: "Dominant 7th chords add the flatted 7th scale degree, creating tension that never fully resolves. That's why they sound bluesy and restless — perfect for reggae and surf." },
        { text: "Play the off-beat skank on E7 only. Mute on the downbeat, strum on the 'and.' Focus on the left-hand squeeze-and-choke technique: press the chord to sound it, immediately relax to kill the ring.", why: "The squeeze-and-choke is what makes reggae guitar percussive. Surf Hat's rhythm guitarist chops every chord staccato — the chord barely rings before it's muted, creating tight 'chk' sounds." },
        { text: "Add ghost strums: play muted 'chukka' scratches on the downbeats between your voiced upbeat chords. Your right hand moves in continuous 8th notes — the downbeats are muted scratches, the upbeats are voiced chords.", why: "Ghost strums fill the rhythmic space between your chord stabs. They create a continuous percussive bed underneath the melody — the guitar becomes a rhythm instrument." },
        { text: "Chain all four chords: E7 (4 bars) → A7 (4 bars) → B7 (2 bars) → F#7 (2 bars) → E7. Maintain the staccato skank throughout. Every chord change should be immediate — slide into the new shape from one fret below if needed.", why: "The slide-into-chord technique (approaching from one fret below) is how reggae and ska guitarists make chord changes sound smooth even at speed. It also gives each chord a slight 'wah' attack." }
      ],
      feel: "Tight, percussive, and bouncy. Like a spring-loaded rhythm machine. The chorus effect adds a wobbly, underwater quality to the clean chops — surf meets reggae.",
      wrong: "If the chords ring out too long, you're not muting fast enough — squeeze and immediately release. If the ghost strums are louder than the voiced chords, lighten up on the downbeats. If the F#7 barre buzzes, check your index finger is rolling onto its bony side.",
      sarah: "Gene, Surf Hat is a psych-surf trio from Squamish, BC. Their self-titled track is the perfect bridge between the reggae skank you've been learning and the surf sound you love. The dom7 voicings (E7, A7, B7, F#7) give it that unresolved, bluesy tension that straight major/minor chords don't have. And listen for the lead guitar — tremolo picking and whammy bar dips over the rhythm chops. That's Level 10+ territory, but the rhythm part is yours right now.",
      metronome: 85,
      levelUp: "Play E7-A7-B7-F#7 skank at 85 BPM with clean chord changes, consistent ghost strums, and immediate left-hand muting on every chord. No ringing — every chord is chopped short."
    },

    // ─── PHASE 4: DEEPER RHYTHM & IMPROV ───

    {
      id: "gs-4-9",
      time: 7,
      title: "The One-Drop — Where the Kick Lives",
      type: "guitar",
      what: "In roots reggae, the kick drum hits ONLY on beat 3 — not 1, not 2, not 4. Just 3. This is the one-drop, and it creates a massive open space on beat 1 where most other genres have their strongest accent. Your skank lives on the upbeats; the kick lives on 3; beat 1 is EMPTY. Understanding the one-drop means understanding why reggae feels so spacious — almost nothing happens where your instinct says something should.",
      setup: "Guitar. Am chord. Drums-only reggae track at 85 BPM.",
      tracks: [{ name: "Drums Only — Reggae 85", src: "/drums-reggae-85.mp3" }],
      chordVoicings: { chords: ["Am"] },
      steps: [
        { text: "Play the drums-only reggae track. Close your eyes and listen for 30 seconds. Feel where the kick drum lands — it's on beat 3, and ONLY beat 3. Count along: 1...2...KICK...4...1...2...KICK...4. The hi-hat may play on other beats, but the kick is exclusively on 3.", why: "The one-drop kick on beat 3 is the rhythmic signature of roots reggae. Most Western music puts the kick on beats 1 and 3 (rock) or 1, 2, 3, 4 (dance). By putting it on 3 ONLY, reggae creates a rhythmic vacuum on beat 1 that gives the music its floating, spacious quality." },
        { text: "Tap your foot ONLY on beat 3, matching the kick drum. Let beats 1, 2, and 4 pass with no foot tap. This feels strange — your instinct is to tap on 1. Resist. Tap on 3 only. Do this for 1 minute.", why: "Tapping on 3 rewires your internal sense of where the \"strong\" beat lives. In rock, beat 1 is the anchor. In reggae, beat 3 is the anchor. This simple exercise shifts your rhythmic center of gravity." },
        { text: "Add the Am skank over the drums track. Your skank hits on all four upbeats (\"ands\"), the kick hits on beat 3, and your foot taps on 3. Feel how your skank and the kick drum interlock — they never land at the same time. The skank fills the upbeats; the kick punctuates beat 3. Together they make the full groove.", why: "The skank + one-drop kick is the complete reggae rhythm section in miniature. Guitar provides rhythmic continuity (upbeats), kick provides the anchor (beat 3). Everything else — bass, organ, horns — fills in around these two elements." },
        { text: "Try emphasizing your skank on the \"and\" of beat 3 — the upbeat right AFTER the kick. Make that particular skank slightly louder than the others. Feel how it creates a call-and-response with the kick: KICK (beat 3) → LOUD SKANK (and of 3). This accent pattern is a classic reggae guitar technique.", why: "Accenting the upbeat after the kick creates a rhythmic dialogue between guitar and drums. The kick says \"HERE\" and the guitar answers \"and HERE.\" This interplay is what makes live reggae feel so locked-in — the musicians are responding to each other in real time." },
        { text: "Nod your head on beat 3 instead of beat 1. This is the final test: if your body's main accent is on 3, you're hearing the one-drop correctly. Play 8 bars of Am skank over the drum track while nodding on 3. If your nod drifts back to 1, restart.", why: "Body alignment with the one-drop proves you've internalized reggae time-feel, not just the skank technique. When your body accents beat 3, everything you play will naturally sit in the reggae pocket." }
      ],
      feel: "The one-drop should feel like a wide-open field with a single tree in the middle. Beat 1 is empty sky. Beat 3 is the tree — the one grounding element. Your skank is the breeze that fills the space between. The overall sensation is spacious, unhurried, and deeply groovy.",
      wrong: "If you can't stop tapping your foot on beat 1, the rock instinct is overriding the reggae feel. Try this: clap on 3 only (no foot at all) while listening to the drum track. Once the clap feels natural on 3, transfer it to your foot. If your skank accidentally gets louder on beat 1's upbeat, consciously soften it — in one-drop reggae, beat 1 is the quietest moment.",
      sarah: "Gene, the one-drop is why reggae hits different. It's not just \"chill music\" — it's a fundamentally different relationship with time. Most music says \"HERE is the beat\" on beat 1. Reggae says \"you already know where 1 is — I'm not going to remind you.\" That trust between the musician and the listener is what creates the floating, meditative quality you love in roots reggae.",
      metronome: 85,
      levelUp: "Can identify the one-drop kick (beat 3) in the drum track instantly. Can play Am skank with accent on the \"and\" of 3 while nodding/tapping on beat 3, not beat 1."
    },
    {
      id: "gs-4-10",
      time: 8,
      title: "Reggae Skank Improv — Dynamic Variation Over a Track",
      type: "guitar",
      what: "You have the skank technique, the ghost notes, the mute-speed spectrum, and the one-drop feel. Now improvise. Over a backing track, play a reggae groove using everything you've learned — but add DYNAMIC variation. Loud skanks, quiet skanks, bars of only ghost notes, bars of full aggressive chops. The chord progression stays simple (Am for the whole thing); the creativity is in how you play, not what you play.",
      setup: "Guitar. Am chord. Backing track.",
      tracks: [
        { name: "Reggae One-Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }
      ],
      chordVoicings: { chords: ["Am"] },
      fretboard: { scale: "am-pentatonic", position: 1 },
      steps: [
        { text: "Start the Reggae One-Drop track. Play Am skank at medium volume for 4 bars. Then drop to ghost notes only for 4 bars — muted clicks, barely audible, just enough to keep the rhythm alive. Then come back to full skanks, slightly louder than before. Feel the contrast.", why: "Dynamic drops and returns are how reggae guitarists create tension and release within a single chord. Dropping to ghost notes creates a vacuum that makes the return to full skanks feel powerful. This is arrangement through dynamics, not harmony." },
        { text: "Try a volume swell: start each 8-bar phrase at whisper volume and gradually increase to full volume by bar 8. Then suddenly drop back to whisper. The chord never changes, the rhythm never changes — only volume. The effect is like waves building and crashing.", why: "Volume swells on a single chord with a constant rhythm create a hypnotic, trance-like quality — the same technique used in dub reggae. The repetition of the swell pattern induces a meditative state in both player and listener." },
        { text: "Switch between mute speeds: 4 bars of short roots chop, 4 bars of warm rocksteady ring, 4 bars of reggae-rock sustain. The chord is still Am, the rhythm is still offbeat skanks — but the TEXTURE shifts dramatically with each mute-speed change.", why: "Combining mute-speed variation with dynamic variation gives you a two-dimensional control surface: volume (loud/quiet) times texture (short/warm/sustained). This creates more variety on a single chord than most players achieve with four chords." },
        { text: "Switch to the Dub Reggae track. The dub feel is sparser, more spacious, more effects-heavy. Respond to the track: when the dub effects swell, pull back to ghost notes. When the effects drop out, fill the space with full skanks. Play AGAINST the track — your guitar fills the holes the production leaves.", why: "Playing responsively to a track (rather than just over it) is how session musicians think. Dub reggae is conversational — the effects and the guitar take turns occupying sonic space. This trains your listening as much as your playing." },
        { text: "Free reggae improv: 5 minutes over either track. Use everything — ghost notes, mute speed variation, dynamic swells, one-drop accents, silence. Stay on Am the entire time. Before each textural shift, hear the new texture in your mind first — imagine the ghost notes before you play them, feel the swell building in your forearm before your hand moves. Notice how your body shifts with each texture: tight and coiled during the short chop, loose and swaying during the sustained ring, barely present during the ghost-note passages. Let your inner ear and your body direct the arrangement together.", why: "Extended single-chord improv is the ultimate test of rhythmic creativity. Pre-hearing each textural shift activates auditory cortex before motor cortex (Gordon Stage 6), and the body-state awareness adds Zamorano's interoceptive channel — you're directing the arrangement from two sources: inner ear and body sensation. If you can make 5 minutes of Am skank interesting through dynamics, muting, and ghost notes — all directed by your inner ear and felt in your body — you've internalized the reggae guitarist's toolkit." }
      ],
      feel: "This should feel like being a DJ with one chord — you're mixing textures, volumes, and energies in real time. The backing track is your collaborator, and you're responding to it. The groove should feel alive and evolving even though the harmony never moves.",
      wrong: "If 5 minutes of Am feels boring, you're not using your tools. Force variety: change something every 4 bars. Volume, mute speed, ghost note density, accent placement — SOMETHING must shift. If it still feels monotonous, try adding small melodic touches (Am pentatonic single notes between skanks) to break the pure-rhythm texture.",
      sarah: "Gene, dub producers like Lee Perry and King Tubby used to take a finished reggae track and strip it to pieces in real time — fading instruments in and out, adding echo, creating space where there used to be sound. You're doing the same thing with your guitar. One chord, infinite variations. That's the dub mentality.",
      metronome: 85,
      recorder: true,
      levelUp: "5-minute Am skank improv that uses at least 4 different dynamic/textural variations (ghost notes, volume swells, mute speed changes, accent shifts). Recording sounds varied and musical, not repetitive."
    },
    {
      id: "gs-4-11",
      time: 10,
      title: "Extended Reggae Jam — Song-to-Song Flow",
      type: "guitar",
      what: "Your graduation exercise. Play 5 continuous minutes of reggae guitar, cycling through all four song progressions you've learned: F-C-G (Gimme Love), B-F#-E (Jah Werx), E-B-F#-A (1999), and A-E-C#m-B-F# (It's a Love). Switch between songs without stopping. Vary your dynamics, mute speed, and ghost note density across the set. This is your first mini-performance — proving the skank is in your body, not just your brain.",
      setup: "Guitar. Metronome at 85 BPM. No backing track — you ARE the track now.",
      chordVoicings: { chords: ["B", "F#", "E", "A", "C#m"] },
      steps: [
        { text: "Start with F-C-G (Gimme Love feel): 85 BPM, open chords, relaxed island vibe. Play 4 full cycles. Get locked into the groove. Then transition to B-F#-E (Jah Werx): switch from open to barre chords without stopping the skank.", why: "Starting with open chords ensures a confident beginning. The transition to barre chords mid-jam is a real-world skill — your hand has to jump from open to barre while the rhythm stays locked." },
        { text: "Without stopping, transition to E-B-F#-A (1999): shift to a longer mute time for the hazy surf-reggae feel. The transition chord is E — you're already playing E as part of B-F#-E, so use it as the bridge. Play 3 cycles.", why: "Smooth song-to-song transitions are a performance skill. Using a shared chord (E) as the pivot makes the transition seamless." },
        { text: "Without stopping, shift to A-E-C#m-B-F# (It's a Love feel): push the tempo slightly (not metronomically — just feel it speed up a bit). Tighten the mute for the ska-reggae energy. The transition chord is again E or B — both appear in the previous progression. Play 2 cycles.", why: "The tempo push mimics how a live band naturally builds energy through a set. Moving from 85 BPM roots feel to a brighter ska-adjacent energy creates a satisfying arc: mellow → dreamy → energetic." },
        { text: "Wind down: return to F-C-G (Gimme Love) at the original relaxed tempo. Drop your dynamics — play the last cycle quietly, with lots of ghost notes and gentle skanks. Let the jam dissolve naturally. End on a final F chord, let it ring.", why: "The wind-down proves you can control energy across a full set. Starting mellow, building energy, then returning to calm creates a musical arc. Ending on open chords after barre-heavy middle sections gives your hand a rest while sounding intentional." },
        { text: "Record the entire 5-minute jam from start to finish. Listen back. Note: where did the groove feel most locked? Where did chord changes disrupt the flow? Where did you get creative with dynamics? This recording is your Level 4 milestone.", why: "The recording captures your complete reggae vocabulary at this moment. Unlike individual exercises, a continuous jam reveals how well techniques integrate under real-time pressure. It's also deeply satisfying to hear yourself play 5 minutes of solid reggae." }
      ],
      feel: "This should feel like a mini concert — the first time you've played guitar continuously for 5 minutes with intentional dynamics, style shifts, and song changes. The overall arc should feel like a wave: building, cresting, releasing. Your body should be moving throughout.",
      wrong: "If the jam falls apart during song transitions, practice the transitions in isolation: last 2 bars of B-F#-E (Jah Werx) into first 2 bars of E-B-F#-A (1999). Repeat until smooth. If 5 minutes feels exhausting, your strumming arm is too tense — reggae is relaxed. Shake out your arm at the 2-minute mark if needed. If everything sounds the same (no dynamic variety), consciously force changes every 8 bars. Final 2 minutes: mix in a technique from Levels 2 or 3 — behind-the-beat feel or a palm mute. Interleaving old skills with new keeps everything fresh.",
      sarah: "Gene, this is your first real performance piece. Five minutes of continuous reggae guitar, flowing through three songs from your playlist, with intentional dynamics and energy shifts. This is what it feels like to be a guitarist, not just someone practicing guitar. The Elovaters, Susto, NO CIGAR, Baskervillain — their songs are in your hands now. Play them like they're yours.",
      metronome: 85,
      recorder: true,
      levelUp: "5-minute continuous reggae jam cycling through F-C-G (Gimme Love), B-F#-E (Jah Werx), E-B-F#-A (1999), and A-E-C#m-B-F# (It's a Love) with smooth transitions, audible dynamic variation, and no rhythmic collapse. The recording sounds like a musician playing, not a student practicing."
    }
  ]
};
