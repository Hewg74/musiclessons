import { getPitchRange } from "../appData.js";

export const level1 = {
  level: 1,
  title: "Autopilot Strumming",
  subtitle: "Your hands must forget so your voice can think.",
  description:
    "Singing while playing guitar is a third skill — not just voice plus guitar. Your brain treats them as competing motor programs. Until strumming reaches procedural memory (autopilot), there's no spare bandwidth for singing. Start with the diagnostic — if you can already strum and hold a conversation, skip ahead. If not, this level gets your chord changes so automatic you can strum and talk without breaking rhythm.",
  artists: "DOPE LEMON, Allah-Las, Babe Rainbow",
  unlocks: "Voice Enters (Level 2)",
  exercises: [
    {
      id: "ss-1-0",
      time: 5,
      title: "Diagnostic Check",
      type: "guitar",
      what: "Quick assessment: can you already strum G-Em-C-D while holding a conversation? If yes, skip to Level 2. If not, this level gets you there. Either way, this 5-minute test tells you exactly where you stand.",
      setup: "Guitar. Metronome at 90 BPM.",
      steps: [
        { text: "Set metronome to 90 BPM. Strum G-Em-C-D, 2 bars each, with 8th-note jangle. Clean changes, no pauses.", why: "This tests your current chord-change fluency at the tempo where surf and reggae live." },
        { text: "While strumming, describe out loud what you did yesterday. Full sentences, natural pace. Can the strum survive?", why: "The conversation test is the gold standard for autopilot. If your strum holds while talking, your hands are ready for singing." },
        { text: "Switch to reggae offbeat chop on Em-Am, 4 bars each. Can you chop and talk simultaneously?", why: "Offbeat strumming uses different motor patterns. Testing both strum styles reveals your true readiness." },
        { text: "If both tests passed cleanly for 2+ minutes each: skip to Level 2. If either broke, work through Level 1 — the exercises below will get you there fast.", why: "Honest assessment saves time. Skipping when you're ready is smart. Skipping when you're not is costly." }
      ],
      feel: "This should feel like a checkup, not a test. There's no failure — just information about where to start.",
      wrong: "If you 'mostly' passed but had a few hiccups, stay in Level 1. 'Mostly autopilot' isn't autopilot. The bar is zero breaks during the conversation.",
      sarah: "Gene, you've been working through Guitar Study, so your fretting hand has development. This test reveals whether that development has reached the autopilot stage. Be honest with yourself.",
      metronome: 90
    },
    {
      id: "ss-1-1",
      time: 8,
      title: "The Five Chords",
      type: "guitar",
      what: "Get G, C, D, Em, and Am to clean, automatic changes at 90 BPM. These five chords cover the majority of songs in your genres. Every chord must ring clean — no muted strings, no buzzing.",
      setup: "Acoustic guitar, tuned. Metronome at 90 BPM.",
      steps: [
        { text: "Play each chord once, letting it ring. Check every string — any muted or buzzing notes? Fix finger placement.", why: "Clean chords are the foundation. Buzzy chords sound bad regardless of what you sing over them." },
        { text: "Set metronome to 90 BPM. Switch between G and C, one strum per beat, 4 bars each. No pauses between changes.", why: "90 BPM is the floor of your tempo range — surf and reggae live here. If you can't change chords cleanly at this speed, nothing else works." },
        { text: "Now G to D. Then D to Em. Then Em to Am. Then Am to C. Every pair, 4 bars each.", why: "Some transitions are harder than others (G to C is a big move). Every pair must be equally smooth." },
        { text: "Random order: have someone call out chords, or shuffle them in your head. Switch on beat 1 of each bar.", why: "Muscle memory must work for any transition, not just practiced sequences." }
      ],
      feel: "Each chord change should feel like stepping, not jumping. Your fingers move as a unit, not one at a time. The chord lands on the beat, not after it.",
      wrong: "If there's a gap between chords (silence where the change happens), your fingers are moving too slowly. If you have to look at your fretting hand, the shapes aren't in muscle memory yet. Slow down and build back up.",
      sarah: "Gene, you've been working through the Guitar Study — your fretting hand is developing. This level is about making open chords so automatic they become invisible. That's when singing gets possible.",
      metronome: 90,
      levelUp: "All five chord transitions clean at 90 BPM, random order, 4 times through without a missed change."
    },
    {
      id: "ss-1-2",
      time: 8,
      title: "Conversation Test",
      type: "guitar",
      what: "Strum a G-C-D pattern on repeat while holding a real conversation — talk about surfing, describe your day, narrate what you see out the window. If strumming breaks, the chords aren't autopilot yet.",
      setup: "Guitar. Someone to talk to, or talk to yourself out loud. Metronome at 90 BPM.",
      steps: [
        { text: "Set up a simple loop: G (4 beats) → C (4 beats) → D (4 beats) → G (4 beats). Repeat.", why: "This is the test pattern. Simple enough that it should be automatic." },
        { text: "While strumming, describe what you had for breakfast in full sentences. Out loud, not in your head.", why: "Speaking out loud uses the same verbal/motor pathways that singing will use. If speaking breaks the strum, singing will too." },
        { text: "If strumming breaks or hesitates while you're talking, stop. Go back to just strumming for 30 seconds. Then try again.", why: "The break tells you exactly where autopilot fails. That's the thing to drill." },
        { text: "Once you can talk and strum for 2 minutes straight, try describing something more complex — tell a story, explain how to catch a wave.", why: "More complex speech demands more cognitive load. If the strum holds, you're ready for voice integration." }
      ],
      feel: "When it works, the strumming feels like walking — you don't think about it. Your attention is on what you're saying, and your right hand just keeps going.",
      wrong: "If you catch yourself stopping mid-sentence to focus on a chord change, or your strum pattern simplifies unconsciously, the guitar part hasn't reached autopilot yet. That's not failure — it's information. Keep drilling the chord changes.",
      sarah: "This is the most important exercise in the entire curriculum. Everything that follows depends on passing this test. Be honest with yourself — don't fake it.",
      metronome: 90
    },
    {
      id: "ss-1-3",
      time: 6,
      title: "Foot-Tap Anchor",
      type: "rhythm",
      what: "Tap your foot on beat 1 while strumming. The foot becomes your internal metronome — a fixed reference point that both your hands and your voice will lock onto. This reduces dual-task interference by giving your brain a physical anchor.",
      setup: "Guitar. Seated or standing. Metronome at 90 BPM to verify.",
      steps: [
        { text: "Strum G with all downstrokes, one per beat. Tap your foot on every beat. Strum and tap must land together.", why: "Foot-tap is the training wheel for internal pulse. When foot and strum sync, your body has a rhythm engine." },
        { text: "Now tap only on beat 1 of each bar. Keep strumming every beat. The foot marks the top of each bar.", why: "Beat 1 tap is enough — it's an anchor point, not a second metronome. This is less cognitive load than tapping every beat." },
        { text: "Add chord changes: G → C → D → G, changing on beat 1 (when your foot taps). The foot-tap and chord change happen simultaneously.", why: "Linking the chord change to the foot-tap creates a physical trigger. Your foot tells your hand to change." },
        { text: "Turn off the metronome. Keep going with just your internal foot-tap. Can you maintain tempo for 2 minutes?", why: "The goal is internal pulse, not external reliance. The foot-tap IS your metronome." }
      ],
      feel: "The foot-tap should feel grounding — like a heartbeat for the music. When everything locks (foot, strum, chord change), you'll feel a physical click of alignment.",
      wrong: "If your foot drifts off beat or stops when you focus on chord changes, the foot-tap habit isn't strong enough yet. Practice the foot-tap alone first, then add strumming.",
      sarah: "Gene, this foot-tap is going to save you when singing enters the picture. It's the one thing that stays constant — your hands change chords, your voice changes notes, but your foot keeps the time.",
      metronome: 90
    },
    {
      id: "ss-1-4",
      time: 8,
      title: "Reggae Offbeat Chop",
      type: "guitar",
      what: "Learn the reggae offbeat strum — muted chords on the 'and' of each beat (the upstrokes). This is simpler than a full strum pattern and is the backbone of your reggae and ska songs. Get it on one chord until it's totally automatic.",
      setup: "Guitar. Metronome at 85 BPM.",
      steps: [
        { text: "Mute all strings with your fretting hand — lay your fingers flat across the strings without pressing down. Strum upstrokes on the 'and' of each beat: rest-chick-rest-chick.", why: "Starting muted removes the chord-change challenge entirely. Just get the rhythm." },
        { text: "Now hold an Em chord. Same pattern: rest on the beat, short sharp upstroke on the 'and.' Lift pressure slightly right after the strum to get that choppy sound.", why: "The chop comes from releasing pressure immediately after the strum. It's a quick touch, not a sustained strum." },
        { text: "Loop Em for 2 minutes. Don't think about it. Zone out. If you can daydream while chopping, it's autopilot.", why: "Reggae feel is all about relaxation. If you're tense or concentrating, the groove is wrong." },
        { text: "Now try Am. Then switch Em (4 bars) → Am (4 bars). The chop pattern doesn't change — only the chord shape does.", why: "The right hand stays constant while the left hand changes. This is the foundation of singing over reggae guitar." }
      ],
      feel: "The reggae chop should feel lazy and relaxed — behind the beat, not on top of it. Your right hand bounces off the strings. Think Pepper, Slightly Stoopid, The Hip Abduction.",
      wrong: "If the chop sounds heavy or sustained, you're pressing too hard or holding the chord too long. It should be staccato — short, sharp, and bouncy. If your timing is stiff, you're thinking too much — let the metronome carry you.",
      sarah: "Gene, reggae is your genre. This chop is going to be the easiest strum pattern to sing over because it only uses upstrokes on the offbeats. Your voice naturally fills the beats where the guitar is silent.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      metronome: 85
    },
    {
      id: "ss-1-5",
      time: 8,
      title: "Surf Jangle",
      type: "guitar",
      what: "Learn a jangly 8th-note strum pattern — continuous down-up alternating strums that create the shimmering sound of surf rock. This is the guitar texture of Allah-Las, Babe Rainbow, and most of your favorite psych-surf.",
      setup: "Guitar, preferably with some reverb if electric. Metronome at 100 BPM.",
      steps: [
        { text: "Strum G with steady 8th notes: down-up-down-up, every strum even in volume and timing. 4 bars.", why: "Even 8th notes are the engine of jangle. No accents yet — just smooth, continuous strumming." },
        { text: "Add a slight accent on beats 1 and 3 (the downstrokes on those beats hit a little harder). This creates the surf pulse.", why: "The accent gives the jangle shape without breaking the flow. It's subtle — listeners feel it more than hear it." },
        { text: "Switch to Em for 4 bars, same pattern. Then G (4) → Em (4) → C (4) → D (4). The jangle never stops.", why: "Chord changes happen inside the continuous strum. Your left hand moves while your right hand keeps going." },
        { text: "Zone-out test: can you jangle for 3 minutes without thinking about it? Put on an Allah-Las track and strum along.", why: "If you can match the feel of a recording while strumming, you've internalized the texture." }
      ],
      feel: "The jangle should shimmer — it sounds like sunlight on water. Your right hand is a pendulum, never stopping. The sound washes continuously, with chord changes flowing through without breaks.",
      wrong: "If the strumming sounds choppy or stops between chord changes, you're resetting your right hand at each change. The right hand NEVER stops — it's a perpetual motion machine. If it sounds aggressive, lighten your touch.",
      sarah: "This is the sound of your favorite music, Gene. When you can jangle on autopilot, you've got the right hand for everything from Allah-Las to Babe Rainbow to Sun Room.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      metronome: 120
    },
    {
      id: "ss-1-6",
      time: 6,
      title: "Speed Ladder",
      type: "guitar",
      what: "Run your chord changes through a tempo ladder: 80, 90, 100, 110 BPM. Only advance when the current tempo is perfectly clean. This maps your playing to the tempo range where surf and reggae actually live.",
      steps: [
        { text: "Start at 80 BPM. Play G-Em-C-D, 2 bars each, with your surf jangle pattern. No missed changes, no buzzy chords.", why: "80 is relaxed. If you can't do it clean here, faster tempos will be sloppy." },
        { text: "Move to 90 BPM. Same progression. If you fumble, drop back to 80 for one pass before trying 90 again.", why: "Speed ladders only work if you respect the rule: clean before fast." },
        { text: "Continue to 100, then 110 BPM. At 110, you're at the top of your listening sweet spot.", why: "110 BPM covers Khruangbin territory, Sun Room, most surf-rock. If you're clean here, you can play along to your playlists." },
        { text: "End with one pass at 80 BPM. It should feel absurdly easy now.", why: "Coming back to 80 after 110 resets your baseline and proves the progress." }
      ],
      feel: "Each tempo should feel like a slightly different genre: 80 is dub-reggae, 90 is roots reggae, 100 is surf-pop, 110 is psych-rock. The feel shifts but the technique stays.",
      wrong: "If your body tenses up at higher tempos, you're fighting the speed instead of riding it. Relax your shoulders, breathe, and let the tempo carry you.",
      sarah: "Gene, this ladder covers your entire Spotify universe. 80-110 BPM is where your music lives. Master this range and you can play along to almost anything in your library.",
      metronome: 80,
      speedLadder: { start: 80, end: 110, increment: 10, bars: 4 }
    },
    {
      id: "ss-1-7",
      time: 6,
      title: "Autopilot Audit",
      type: "song",
      what: "Final test: play G-Em-C-D with your preferred strum pattern while simultaneously describing your room, reciting a poem, or telling a story. If the strum holds perfectly for 3 minutes, you've passed Level 1.",
      steps: [
        { text: "Pick your most comfortable strum pattern — jangle, reggae chop, or simple downstrokes.", why: "Use whatever feels most natural. This test is about autopilot, not technique preference." },
        { text: "Start strumming G-Em-C-D, 2 bars each, on repeat.", why: "Familiar progression that covers all the chord transitions you've drilled." },
        { text: "While strumming, describe what you see out the window in full, detailed sentences. Or recite lyrics to a song you know. Speak at normal conversational pace.", why: "The verbal task demands cognitive resources. If the strum survives, those resources are free for singing." },
        { text: "3 minutes. No breaks, no simplification of the strum, no pausing your speech. If the strum breaks, note where and drill that transition.", why: "3 minutes is roughly one song. If autopilot holds for a song's length, you're ready for Level 2." }
      ],
      feel: "This should feel effortless — like walking and talking at the same time. If it feels like juggling, you need more time at the earlier exercises.",
      wrong: "If you catch yourself choosing simpler words or shorter sentences to protect the strum, your attention is still split. The strum must be truly invisible.",
      sarah: "Gene, be ruthlessly honest here. If the strum wavers even once, go back and drill. Everything in Levels 2-11 depends on this autopilot foundation. It's worth getting right.",
      metronome: 90,
      recorder: true,
      levelUp: "Can strum G-Em-C-D at 90 BPM with jangle or offbeat chop while describing your surroundings for 3 full minutes without any strum breaks."
    },
    {
      id: "ss-1-8",
      time: 5,
      title: "Drone Singing",
      type: "vocal",
      drone: { root: "G", octave: 2, texture: "analog" },
      what: "Hold a single G note (hum or 'ooh') while strumming a G chord. The absolute simplest voice+guitar combination — one sustained note over one chord. Based on Orff's 'sing on one pitch' principle: isolate voice integration to the bare minimum before adding any complexity.",
      setup: "Guitar. Metronome at 90 BPM.",
      steps: [
        { text: "Strum G on autopilot — your preferred pattern from this level. Get it flowing for 30 seconds without thinking.", why: "The guitar must be invisible before you add voice. If you're still thinking about the strum, it's not ready." },
        { text: "Before you hum, close your eyes and hear the note G in your mind. Wait until you can really hear it — not just think about it, but hear it internally. Then let your voice join the drone, matching what you already hear in your head.", why: "This is pre-hearing — your brain arrives at the pitch before your voice does. One note is the absolute minimum vocal demand, and imagining it first makes the match easier. If the strum breaks even with a single sustained hum, the autopilot foundation needs more work." },
        { text: "If the strum breaks when you start humming, stop humming immediately. Re-establish the strum for 10 seconds. Then try the hum again, softer.", why: "The guitar is always the priority. The voice learns to exist on top of a stable guitar, never at its expense." },
        { text: "Try different vowels on the same G note: 'ooh,' 'ahh,' 'eee.' Each vowel changes the vocal effort slightly but the pitch stays the same.", why: "Different vowels use different mouth shapes and breath patterns. Practicing them on one pitch isolates the vowel challenge from the pitch challenge." },
        { text: "Now try on Em (hum E) and Am (hum A). One sustained note per chord, matching the root. Strum each for 1 minute.", why: "Three chords, three drone notes. This is the bridge between pure autopilot strumming and the voice integration of Level 2." }
      ],
      feel: "This should feel almost too easy — one note, one chord, nothing to think about. That simplicity is the point. If it feels easy, your brain has bandwidth left over. That's the bandwidth singing will use.",
      wrong: "If you're trying to sing a melody or vary the pitch, you're jumping ahead. Stay on ONE note. The discipline of simplicity is what makes this exercise work. If the strum still breaks, go back to ss-1-7.",
      sarah: "Gene, this is the gentlest possible introduction to singing while playing. One note. One chord. If this feels comfortable, you're absolutely ready for Level 2. If it doesn't, that's valuable information — your autopilot needs a bit more time.",
      metronome: 90,
      recorder: true,
      referencePitches: getPitchRange("G3", "G3")
    }
  ]
};
