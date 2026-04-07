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
      wrong: "If you 'mostly' passed but had a few hiccups, stay in Level 1. 'Mostly autopilot' isn't autopilot. The bar is zero breaks during the conversation. If this feels awkward, that's the growth zone — not a sign you can't do this.",
      sarah: "Gene, you've been working through Guitar Study, so your fretting hand has development. This test reveals whether that development has reached the autopilot stage. You're not learning to be a musician — you already ARE one. This is just calibrating where to focus next.",
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
      wrong: "If there's a gap between chords (silence where the change happens), your fingers are moving too slowly. If you have to look at your fretting hand, the shapes aren't in muscle memory yet. Slow down and build back up. If this feels clumsy, that's the growth zone — your fingers are building new pathways.",
      sarah: "Gene, you've been working through the Guitar Study — your fretting hand is developing. This level is about making open chords so automatic they become invisible. That's when singing gets possible. Worth trying: end each session on the transition that felt easiest — leave your fingers with a win.",
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
      wrong: "If you catch yourself stopping mid-sentence to focus on a chord change, or your strum pattern simplifies unconsciously, the guitar part hasn't reached autopilot yet. That's not failure — it's the growth zone. Your brain is building a new motor program, and that takes repetition across days, not hours.",
      sarah: "This is the most important exercise in the entire curriculum. Everything that follows depends on passing this test. Be honest with yourself — and remember, wherever you are right now is exactly the right starting point. The fact that you're here means you're already doing the work. One thing to notice while you do this: where do stressed words in your speech land relative to chord changes? That awareness becomes a powerful tool in Level 6.",
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
      feel: "The reggae chop should feel lazy and relaxed — behind the beat, not on top of it. Your right hand bounces off the strings. Think Pepper, Slightly Stoopid, The Hip Abduction. Always end on a rep that felt good — however small. Your brain encodes the ending and applies it to the whole session.",
      wrong: "If the chop sounds heavy or sustained, you're pressing too hard or holding the chord too long. It should be staccato — short, sharp, and bouncy. If your timing is stiff, you're thinking too much — let the metronome carry you.",
      sarah: "Gene, reggae is YOUR genre — this chop is going to be the easiest strum pattern to sing over because it only uses upstrokes on the offbeats. Your voice naturally fills the beats where the guitar is silent. Pick this track because it calls to you, not because it's assigned.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      metronome: 85,
      strumPattern: {
        notation: "_ x _ x _ x _ x",
        subdivision: "8ths",
        bpm: 85,
        description: "Pure offbeat chop — miss every downbeat, staccato upstroke on every upbeat. Fretting hand lifts immediately after each strum to create the classic reggae 'skank.' The silence on the downbeats is as important as the sound."
      },
      toneSettings: {
        pickup: "neck",
        effects: ["reverb:spring-medium"],
        capo: null,
        tuning: "standard",
        description: "Warm, dark neck pickup tone. Medium spring reverb for space. Roll tone knob back 30% for that dub warmth."
      }
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
      feel: "The jangle should shimmer — it sounds like sunlight on water. Your right hand is a pendulum, never stopping. The sound washes continuously, with chord changes flowing through without breaks. End each session on a moment that felt good — even just one bar of clean jangle.",
      wrong: "If the strumming sounds choppy or stops between chord changes, you're resetting your right hand at each change. The right hand NEVER stops — it's a perpetual motion machine. If it sounds aggressive, lighten your touch.",
      sarah: "This is the sound of your favorite music, Gene. When you can jangle on autopilot, you've got the right hand for everything from Allah-Las to Babe Rainbow to Sun Room.",
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      metronome: 120,
      strumPattern: {
        notation: "D U D U D U D U",
        subdivision: "8ths",
        bpm: 100,
        description: "Continuous down-up 8th notes — the pendulum never stops. Slight accent on beats 1 and 3. Chord changes happen inside the continuous strum without breaking the flow."
      },
      toneSettings: {
        pickup: "bridge-or-both",
        effects: ["reverb:heavy-spring", "tremolo:light"],
        capo: null,
        tuning: "standard",
        description: "Jangly, shimmering tone. Heavy spring reverb for that surf wash. Optional light tremolo for wobble. The reverb IS the texture."
      }
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
        { text: "End with one pass at 80 BPM. It should feel absurdly easy now. That easy feeling IS the win — let it be the last thing your hands remember.", why: "Coming back to 80 after 110 resets your baseline and proves the progress. Ending on something easy encodes the whole session positively in memory." }
      ],
      feel: "Each tempo should feel like a slightly different genre: 80 is dub-reggae, 90 is roots reggae, 100 is surf-pop, 110 is psych-rock. The feel shifts but the technique stays.",
      wrong: "If your body tenses up at higher tempos, you're fighting the speed instead of riding it. Relax your shoulders, breathe, and let the tempo carry you. If the last rep was messy, do one more easy version to finish.",
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
      feel: "This should feel effortless — like walking and talking at the same time. If it feels like juggling, you need more time at the earlier exercises. Always end on something that worked — if the last attempt broke, do one more easy rep to finish.",
      wrong: "If you catch yourself choosing simpler words or shorter sentences to protect the strum, your attention is still split. The strum must be truly invisible. If this feels hard, that's the adaptation edge — not a sign you can't do this.",
      sarah: "Gene, be honest here — and be kind to yourself. If the strum wavers, go back and drill. Everything in Levels 2-15 depends on this autopilot foundation. It's worth getting right. You're not trying to become a guitarist — you already ARE one. This is just deepening what your hands already know.",
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
        { text: "Before starting: breathe in for 4 counts, then hum-sigh out for 6 counts. Repeat 3 times. This isn't relaxation — it's preparing the instrument. Your vagus nerve directly controls your vocal folds; calming it literally loosens the larynx. Then strum G on autopilot — your preferred pattern from this level. Get it flowing for 30 seconds without thinking.", why: "The vagus nerve innervates the larynx. When the nervous system is activated, the throat tightens. The 4-in/6-out hum-sigh primes the laryngeal environment for voice. The guitar must be invisible before you add voice. If you're still thinking about the strum, it's not ready." },
        { text: "Before you hum, close your eyes and hear the note G forming in your mind. Wait until you can really hear it — not just think about it, but feel it gathering in your chest, a warm low hum waiting to be born. Then let your voice join the drone, matching what you already hear and feel inside. Notice where the vibration settles — G lives low, behind the sternum, a gentle rumble in the ribcage.", why: "This is pre-hearing paired with body awareness — your brain arrives at the pitch and your body locates it before your voice produces it. Even on this first sustained note, you're beginning the embodiment cycle that will guide everything: HEAR the note internally, FEEL where it lives in the body, then PRODUCE it. Zamorano 2025 found that body awareness predicts pitch accuracy even in non-singers (R²=0.41). One note is enough to start building this awareness." },
        { text: "If the strum breaks when you start humming, stop humming immediately. Re-establish the strum for 10 seconds. Then try the hum again, softer — feel it as a vibration in your chest rather than a sound from your throat.", why: "The guitar is always the priority. The voice learns to exist on top of a stable guitar, never at its expense. Thinking of the hum as a body vibration rather than a vocal effort keeps it light and integrated." },
        { text: "Try different vowels on the same G note: 'ooh,' 'ahh,' 'eee.' Notice how each vowel shifts where the vibration lives — 'ooh' stays warm and low in the chest, 'ahh' opens and spreads across the throat, 'eee' lifts the buzz toward the nose and cheekbones. Same pitch, different rooms in the body.", why: "Each vowel opens a different resonant chamber. Your body is already teaching you that pitch and placement are connected — the same note feels different depending on how you shape it. This is the beginning of the body map you'll build throughout the curriculum (Nummenmaa 2024, PNAS: body maps of resonance are cross-culturally universal)." },
        { text: "Now try on Em (hum E) and Am (hum A). One sustained note per chord, matching the root. As you move from G to E to A, notice how the vibration shifts — each root has its own body address, its own warmth. Strum each for 1 minute.", why: "Three chords, three drone notes, three body locations. This is the bridge between pure autopilot strumming and the voice integration of Level 2. You're planting the seeds of a somatic pitch map — every note you'll ever sing has a place in your body." }
      ],
      feel: "This should feel almost too easy — one note, one chord, nothing to think about. That simplicity is the point. But even in this simplicity, notice the vibration: G rumbles behind your sternum like a low tide. If it feels easy AND you can feel where the note lives in your body, your brain has bandwidth left over. That's the bandwidth singing will use.",
      wrong: "If you're trying to sing a melody or vary the pitch, you're jumping ahead. Stay on ONE note. The discipline of simplicity is what makes this exercise work. If the strum still breaks, go back to ss-1-7.",
      sarah: "Gene, this is the gentlest possible introduction to singing while playing. One note. One chord. If this feels comfortable, you're absolutely ready for Level 2. If it doesn't, that's valuable information — not a verdict on who you are. You're already a singer. This is just the first step in expanding what your voice can do.",
      metronome: 90,
      recorder: true,
      referencePitches: getPitchRange("G3", "G3")
    },
    {
      id: "ss-1-9",
      time: 6,
      title: "Anchor Point Discovery",
      type: "guitar",
      what: "While doing the conversation test, notice where STRESSED words naturally land relative to CHORD CHANGES. These collision points are 'anchor points' — where spoken emphasis aligns with harmonic shifts. They'll become the foundation of singing in Level 6. For now, just notice: while strumming G-C-D, speak 'the waves are rolling in today.' Does 'waves' land on the G or the change to C? Does 'rolling' land on C or the change to D? Awareness before skill.",
      setup: "Guitar. Metronome at 90 BPM. Same G-C-D-G progression from the conversation test.",
      steps: [
        { text: "Strum G-C-D-G on repeat at 90 BPM. Get it flowing on autopilot.", why: "The guitar must be invisible before you can notice anything about your speech." },
        { text: "Speak any phrase in rhythm: 'the waves are rolling in today, the sun is going down.' Say it naturally, not forced. Notice: where do the STRESSED syllables (waves, roll, sun, down) land relative to the chord changes?", why: "Stressed syllables are the peaks of your speech rhythm. Where they land on the chord rhythm creates 'anchor points' — places where voice and guitar naturally lock together. You don't need to place them deliberately yet — just notice where they fall." },
        { text: "Try different phrases. Some stressed words will land ON a chord change (strong anchor), some will land between changes (floating). Both are natural. Just observe.", why: "This awareness is the seed of the Isolation Protocol you'll learn in Level 6. For now, observation is the entire skill." },
        { text: "Speak one more phrase and deliberately place the strongest word on beat 1 of a chord change. How does that feel? Different from when it lands between changes?", why: "When a stressed syllable locks onto a chord change, you'll feel a physical alignment — a 'click' in the groove. That click is an anchor point. You'll learn to create these deliberately in Level 6." }
      ],
      feel: "This should feel like watching yourself in slow motion — noticing something that already happens naturally. No performance pressure, just curiosity.",
      wrong: "If you're trying to force words onto specific beats, you're working too hard. This is observation, not control. Speak naturally and just NOTICE.",
      sarah: "Gene, you're not singing yet — just listening to yourself speak over chords. Where do stressed words land? These collision points are anchor points, and they'll become your most powerful tool in Level 6. For now, awareness is the entire exercise.",
      metronome: 90,
      recorder: true
    },
    {
      id: "ss-1-10",
      time: 5,
      title: "The Escape Hatch",
      type: "guitar",
      what: "When strumming and speaking breaks down, drop to the simplest possible strum: ONE downstroke per bar on beat 1. This is the 'escape hatch' — the bottom rung of a coordination ladder you'll climb throughout this curriculum. Practice deliberately: full strum → break → one-per-bar → stabilize → climb back up.",
      setup: "Guitar. Metronome at 85 BPM.",
      steps: [
        { text: "Strum G-C-D-G with your normal pattern while describing your room. If the strum breaks, IMMEDIATELY drop to one downstroke per bar — just a single strum on beat 1 of each chord.", why: "The escape hatch removes all rhythmic complexity from the guitar, freeing maximum bandwidth for your voice. It's not a failure — it's a recovery tool." },
        { text: "Once one-per-bar feels stable with speech, climb one rung: two strums per bar (beats 1 and 3). Keep speaking.", why: "Each rung adds right-hand density. Your voice stays constant — the guitar climbs while the voice holds steady." },
        { text: "Climb again: four strums per bar (all beats). Then try your natural pattern. If it breaks again, drop back down.", why: "This is the strum complexity ladder in miniature. The method applies to every new song you'll ever learn: drop to the simplest guitar, get the voice stable, then add guitar complexity." },
        { text: "Practice the DELIBERATE drop three times: full pattern → break → one-per-bar → climb back. Make the recovery instinctive.", why: "Drilling the recovery move makes it automatic. When coordination breaks in a real performance, your hands will know where to go without thinking." }
      ],
      feel: "The escape hatch should feel like releasing pressure — the moment you drop to one strum, your voice suddenly has room to breathe. That relief is the bandwidth freeing up.",
      wrong: "If you resist dropping down when the strum breaks, you're fighting the method. The escape hatch is strength, not weakness. Every professional singer-songwriter uses this — they just don't name it.",
      sarah: "Gene, this is your safety net for the entire curriculum. Whenever voice + guitar coordination breaks — at any level, on any song — drop to one strum per bar. Your voice gets all the bandwidth. Then climb back up. This method works at every level, and you'll formalize it as the Strum Complexity Ladder in Level 6.",
      metronome: 85,
      recorder: true
    }
  ]
};
