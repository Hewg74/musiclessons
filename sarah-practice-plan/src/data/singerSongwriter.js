import { getPitchRange } from "./appData.js";

// ─── SINGER-SONGWRITER CURRICULUM ─────────────────────────────────
// 7 levels, ~62 exercises. From autopilot strumming to original songs + free improvisation.
// Designed for Gene: tenor, passaggio ~A3, sweet spot E3-A4.
// Musical DNA: psych-surf, reggae, desert blues, Khruangbin, laid-back delivery.
// Research basis: motor learning stages, Berklee singer/songwriter sequence,
// dual-task interference, speak→hum→sing integration method.

export const SINGER_SONGWRITER_LEVELS = [
  // ─── LEVEL 1: Autopilot Strumming ──────────────────────────────────
  {
    level: 1,
    title: "Autopilot Strumming",
    subtitle: "Your hands must forget so your voice can think.",
    description:
      "Singing while playing guitar is a third skill — not just voice plus guitar. Your brain treats them as competing motor programs. Until strumming reaches procedural memory (autopilot), there's no spare bandwidth for singing. Start with the diagnostic — if you can already strum and hold a conversation, skip ahead. If not, this level gets your chord changes so automatic you can strum and talk without breaking rhythm.",
    artists: "DOPE LEMON, Allah-Las, Babe Rainbow",
    unlocks: "Voice Over Chords (Level 2)",
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
        metronome: 100
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
        metronome: 80
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
        sarah: "Gene, be ruthlessly honest here. If the strum wavers even once, go back and drill. Everything in Levels 2-7 depends on this autopilot foundation. It's worth getting right.",
        metronome: 90,
        levelUp: "Can strum G-Em-C-D at 90 BPM with jangle or offbeat chop while describing your surroundings for 3 full minutes without any strum breaks."
      }
    ]
  },

  // ─── LEVEL 2: Voice Over Chords ─────────────────────────────────────
  {
    level: 2,
    title: "Voice Over Chords",
    subtitle: "Speak before you sing. Hum before you sing. Sing last.",
    description:
      "The three-stage integration method: speaking rhythm over strumming builds the neural bridge between your hands and your voice. Humming adds pitch contour with less cognitive load than words. Only then does full singing succeed. This is how the brain learns to coordinate two independent motor programs.",
    artists: "DOPE LEMON, Skinshape, Babe Rainbow",
    unlocks: "Covers + First Originals (Level 3)",
    exercises: [
      {
        id: "ss-2-1",
        time: 8,
        title: "Speak-Over-Strum",
        type: "song",
        what: "Strum a simple chord progression and speak lyrics of a song you know in rhythm — no melody, just spoken words landing on the beats. This trains the timing bridge between your hands and your voice without the complexity of pitch.",
        setup: "Guitar. Lyrics to 'Sol Del Sur' by Sun Room or any simple song you know. Metronome at 85 BPM.",
        steps: [
          { text: "Start strumming your chord progression — G-C-D or whatever the song uses. Get it flowing.", why: "The guitar must be in autopilot mode before you add anything. If it's not automatic from Level 1, go back." },
          { text: "Speak the first line of lyrics in rhythm. Not singing — speaking, like you're reading a poem to a beat. The words land on beats and offbeats.", why: "Speaking removes pitch from the equation. You're only coordinating rhythm between hands and voice." },
          { text: "Keep going through the verse. If the strum breaks, stop speaking, re-establish the strum, and start the verse again.", why: "The guitar is the foundation — it never sacrifices for the voice. The voice must learn to exist on top of a stable guitar part." },
          { text: "Go through the whole song speaking in rhythm. Repeat twice. By the third time, the rhythmic coordination should feel natural.", why: "Repetition builds the neural pathway. Three passes is the minimum for initial coordination." }
        ],
        feel: "It should feel like rapping or spoken word over a beat. Your voice rides the rhythm of the strum. The words and the chords are in the same groove.",
        wrong: "If you're speaking in a monotone without rhythmic placement, you're just talking, not integrating. The words must align with the musical pulse. If the strum simplifies when you start speaking, you're still splitting attention.",
        sarah: "Gene, this feels weird at first — like talking to yourself while playing guitar. That's fine. It's training your brain to do two rhythmic things at once. The melody comes later.",
        metronome: 85
      },
      {
        id: "ss-2-2",
        time: 6,
        title: "Hum the Contour",
        type: "vocal",
        what: "Same chord progression, but now hum the melody contour — the rising and falling shape of the tune. Don't worry about exact pitches. Just follow the general direction: up when the melody goes up, down when it goes down.",
        setup: "Guitar. A song you spoke over in the previous exercise.",
        steps: [
          { text: "Start strumming. Hum the melody of the first line. Approximate — it doesn't need to be perfect pitch.", why: "Humming is easier than singing because there are no words to coordinate. You only need to manage pitch contour and strum simultaneously." },
          { text: "Focus on where the melody goes UP and where it goes DOWN. Exaggerate the contour if needed.", why: "The shape of the melody is more important than exact notes at this stage. You're building the pitch layer on top of the rhythm layer." },
          { text: "If the strum breaks, hum a single note (a drone) while strumming until it stabilizes. Then go back to the melody contour.", why: "A single-note hum is the easiest vocal task. It's your fallback when things get overwhelming." },
          { text: "Hum through the whole song. Repeat until the strum never wavers.", why: "Each pass makes the coordination more natural. You're training two motor programs to coexist." }
        ],
        feel: "The humming should feel lazy and loose — like you're humming along to a song on the radio. Not performative, just following the tune while your hands do their thing.",
        wrong: "If your hum is tense or forced, you're working too hard. Humming should be the most relaxed vocal production possible. If you lose the melody, just drone on one comfortable note and let the contour come back naturally.",
        sarah: "Gene, your vocal style is laid-back — think DOPE LEMON. This humming exercise is actually closer to your target vocal style than belting scales would be. Relax into it."
      },
      {
        id: "ss-2-3",
        time: 6,
        title: "Root Note Singing",
        type: "vocal",
        referencePitches: getPitchRange("E3", "G3"),
        what: "Strum your chord progression and sing only the root note of each chord as it changes. One note per chord. This is the absolute minimum vocal demand — and it teaches your ear to hear which note 'belongs' to each chord.",
        setup: "Guitar. Metronome at 85 BPM. Know the root notes: G chord = sing G, C chord = sing C, D chord = sing D, Em = sing E, Am = sing A.",
        steps: [
          { text: "Strum G. Sing the note G (the open G string gives you the pitch). Hold it for all 4 beats.", why: "One note, sustained, is the simplest possible singing task over strumming." },
          { text: "Change to C. Sing C. Change to D. Sing D. One sustained note per chord, matching the root.", why: "Your voice follows the bass movement. This is the harmonic foundation of every song." },
          { text: "Do the full progression: G (sing G) → C (sing C) → D (sing D) → G (sing G). Loop it.", why: "Looping builds the pattern into muscle memory. After 8 loops, the voice-follows-chord habit should feel natural." },
          { text: "Try it with eyes closed. Can you feel which note to sing without checking the guitar?", why: "Eyes closed forces your ear to guide your voice. This is the beginning of ear-driven singing." }
        ],
        feel: "Each root note should feel like it 'locks in' with the chord — a satisfying alignment between your voice and the guitar. When voice and chord match, you'll feel a physical resonance in your chest.",
        wrong: "If you're singing the wrong root (singing G over a C chord), you'll hear the clash immediately. Stop, play the chord, find the root on a single string, and match it with your voice before trying again.",
        sarah: "Gene, all the notes you're singing here (G2/G3, C3, D3, E3, A2/A3) are right in your comfortable chest voice range. No passaggio concerns — just easy, grounded notes.",
        metronome: 85
      },
      {
        id: "ss-2-4",
        time: 10,
        title: "Half-Tempo First Song",
        type: "song",
        what: "Pick one simple song — 'Sol Del Sur' by Sun Room, 'California' by Babe Rainbow, or anything from your 'Songs 2 Learn' playlist with 3-4 chords. Play it at HALF the normal tempo with all downstrokes. Sing the full lyrics.",
        setup: "Guitar. Lyrics in front of you (phone or printed). Metronome at half the song's normal tempo (e.g., if song is 100 BPM, set to 50).",
        tracks: [{ name: "Sol Del Sur — Reference", src: "/sol-del-sur.mp3" }],
        steps: [
          { text: "Learn or review the chord progression. Just the chords, no singing. Make sure the changes are clean at half tempo.", why: "Reaffirm autopilot at the slower speed. Half tempo feels weird but gives your brain extra processing time." },
          { text: "Switch to all-downstroke strumming. No up-strokes, no fancy patterns. Just one strum per beat, down.", why: "All downstrokes is the simplest possible strum pattern. It frees maximum cognitive bandwidth for singing." },
          { text: "Start strumming and singing. Read the lyrics if you need to. The tempo is deliberately slow — use the extra time between beats to prepare each word.", why: "Slow tempo is your friend. Every cognitive challenge (chord change, word placement, pitch matching) happens with extra time to process." },
          { text: "Get through the entire song. If you break, restart from the beginning of that section (verse or chorus), not from the top.", why: "Section-level restarts are more efficient than full-song restarts. You drill the problem spot without wasting time on parts that work." }
        ],
        feel: "Half-tempo feels strange — like slow motion. But it should also feel achievable. If it still feels impossible, the guitar part isn't automatic enough. Go back to Level 1.",
        wrong: "If you're rushing ahead of the metronome because the slow tempo feels unnatural, practice discipline. If you're singing the wrong melody because you don't know the song well enough, listen to the original 5 more times first.",
        sarah: "Gene, this is your first real song — guitar and voice together. It will be rough. That's completely normal. The half-tempo gives you training wheels. You'll speed up later.",
        metronome: 50,
        recorder: true
      },
      {
        id: "ss-2-5",
        time: 8,
        title: "Two-Bar Chunks & Glue Points",
        type: "song",
        what: "Break your half-tempo song into 2-bar chunks. Master each chunk (guitar + voice) before connecting them. Identify 'glue points' — the exact moments where chord changes and syllable stress align.",
        steps: [
          { text: "Take the first 2 bars of your song. Play and sing just those 2 bars. Repeat 5 times until they're solid.", why: "2 bars is a small enough chunk to perfect. It's usually one lyric phrase." },
          { text: "Move to bars 3-4. Same process. 5 repetitions until solid.", why: "Building block by block prevents the overwhelm of trying to do the whole song at once." },
          { text: "Now connect bars 1-2 to bars 3-4. The transition is the hard part — that's the glue point.", why: "Glue points are where both hands and voice must coordinate a change simultaneously. They need extra drilling." },
          { text: "Identify all glue points in the song. Write them down: 'On the word ___, my chord changes to ___.' Practice each one 10 times.", why: "Knowing exactly where the coordination demands peak lets you practice them surgically instead of hoping they work." }
        ],
        feel: "Each 2-bar chunk should feel comfortable and repeatable. The glue points should eventually feel like they click into place — voice, chord, and beat all landing together.",
        wrong: "If you're trying to do the whole song and consistently breaking at the same spot, that spot is a glue point you haven't drilled enough. Isolate it.",
        sarah: "Gene, this is how professional musicians learn new material — not by playing the whole thing over and over, but by isolating the hard transitions and drilling them."
      },
      {
        id: "ss-2-6",
        time: 8,
        title: "Full Song — Porch Register",
        type: "song",
        what: "Bring your half-tempo song up to 70-80% speed. Sing in your natural, laid-back register — no projection, no trying to sound good. Think: singing on your porch at sunset, nobody listening.",
        setup: "Guitar. Song you've been working on. Metronome at 70-80% of original tempo.",
        steps: [
          { text: "Start at the tempo you've been practicing (half speed). Play through once as a warm-up.", why: "One clean pass at the easy tempo primes your muscle memory." },
          { text: "Bump the metronome up 10 BPM. Play through again. Note any spots that break.", why: "Gradual tempo increase reveals which spots need more autopilot work." },
          { text: "Bump up another 10 BPM (now 70-80% of original). This is your target for today. Play through.", why: "70-80% is fast enough to feel like music but slow enough to maintain coordination." },
          { text: "Vocal approach: relaxed, breathy, behind the beat. Don't try to project or enunciate perfectly. Think Skinshape, DOPE LEMON — that lazy, stoned-afternoon delivery.", why: "Your target vocal style is actually easier than belting. Laid-back delivery requires less breath support and less precise pitch — it's forgiving." }
        ],
        feel: "This should feel like you're just hanging out, playing and singing for yourself. If it feels like performing, you're pushing too hard. The casual feel IS the style.",
        wrong: "If you're tensing up trying to hit notes perfectly, relax. Pitch accuracy matters less than rhythmic flow at this stage. If you're rushing, the tempo is too fast — drop 10 BPM.",
        sarah: "Gene, 'porch register' is your natural voice. Don't try to sound like a singer — just sound like yourself talking melodically. That's exactly the vocal style of your favorite artists.",
        metronome: 70,
        recorder: true
      },
      {
        id: "ss-2-7",
        time: 6,
        title: "Make Up a Melody",
        type: "song",
        referencePitches: getPitchRange("E3", "B3"),
        what: "Strum Em and G, 4 bars each, on repeat. Hum or sing any melody that comes — no words, no plan, just follow your ear. This is your first taste of creating, not reproducing. Record everything.",
        setup: "Guitar. Recorder ready. No lyrics, no reference track — just you.",
        steps: [
          { text: "Start strumming Em → G, 4 bars each. Simple downstrokes or jangle — whatever is most autopilot for you.", why: "Two chords = maximum creative freedom. The harmonic simplicity gives your voice room to wander." },
          { text: "Start humming. Any notes. Let your voice wander up and down. Some notes will feel right over Em, others over G. Follow the ones that feel right.", why: "You're not composing — you're discovering. Your ear already knows what sounds good. Let it lead." },
          { text: "If you find a phrase you like (a 4-5 note melody that feels good), repeat it. Then vary it. Then repeat the variation.", why: "Repetition with variation is the fundamental unit of melody. You're songwriting without knowing it." },
          { text: "Try 'ooh' or 'la' instead of humming. Open vowels carry more pitch and feel more like singing.", why: "Open vowels let you hear your pitch clearly and develop your melodic instinct." }
        ],
        feel: "This should feel playful and low-pressure. There's no wrong melody. If something sounds weird, just move to a different note. You're exploring, not performing.",
        wrong: "If you're sitting in silence trying to think of the 'right' melody, stop thinking and start making noise. Hum anything. The first few attempts will be awkward — that's normal.",
        sarah: "Gene, this is the most important exercise in Level 2. Covers teach you other people's music. This exercise teaches you that you can make your own. Even if it's just humming over two chords — that's creating.",
        metronome: 85,
        recorder: true
      },
      {
        id: "ss-2-8",
        time: 6,
        title: "First Full Integration",
        type: "song",
        what: "Play and sing your song from start to finish at 80% speed. Record it. Listen back. Don't judge — just notice what worked and what needs more drill.",
        steps: [
          { text: "Play through your song, guitar and voice, no stops. If you make a mistake, keep going — don't restart.", why: "Playing through mistakes builds performance resilience. In real life, you can't restart a song." },
          { text: "Record the whole thing on your phone or the in-app recorder.", why: "Recording is the mirror for musicians. You can't improve what you can't hear objectively." },
          { text: "Listen back. Note: (1) Where did guitar and voice align well? (2) Where did they fight? (3) Where did your pitch drift?", why: "Self-assessment is the skill that makes practice effective. Most problems you'll hear are timing, not pitch." },
          { text: "Pick the roughest spot. Drill it as a 2-bar chunk 10 times. Then play through the whole song again.", why: "Surgical improvement: identify the weak link, strengthen it, then reintegrate." }
        ],
        feel: "The full play-through will be imperfect. That's fine. What matters is that it exists — you played and sang a complete song. That's a milestone.",
        wrong: "If you stop and restart every time there's a mistake, you're practicing stopping, not playing. Push through. Save the surgical work for after the recording.",
        sarah: "Gene, listen to that recording. That's you, singing and playing guitar at the same time. Three weeks ago you couldn't do that. Progress isn't about perfection — it's about the gap between where you were and where you are.",
        recorder: true,
        levelUp: "Can play and sing one complete song at 80% tempo with stable rhythm, recognizable melody, and no full stops."
      },
      {
        id: "ss-2-9",
        time: 8,
        title: "Pentatonic Voice",
        type: "vocal",
        referencePitches: getPitchRange("A2", "A4"),
        what: "Sing the minor pentatonic scale — A, C, D, E, G — while strumming Am. These five notes are the foundation of all vocal improvisation in your genres. If you can sing these five notes over a chord, you can improvise forever.",
        setup: "Guitar. Metronome at 85 BPM.",
        tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
        steps: [
          { text: "Strum Am with your autopilot pattern. Sing each note of the pentatonic scale slowly: A... C... D... E... G. Use the guitar to find each note first, then match with your voice.", why: "The minor pentatonic is the most universal improvisation scale. It works over blues, reggae, psych-rock, desert blues — all of Gene's genres." },
          { text: "Sing the scale ascending (A-C-D-E-G) then descending (G-E-D-C-A). Loop it. Let the rhythm align with your strum.", why: "Ascending and descending trains your ear to navigate the scale in both directions. Real improv goes both ways." },
          { text: "Now skip around: A-D-G-E-C, or any random order. Can you land on any pentatonic note intentionally?", why: "Improvisation isn't just running up and down scales — it's jumping between notes. Random order builds the ear-voice connection for free improvisation." },
          { text: "Put on the backing track and sing pentatonic phrases over it — short 3-4 note melodies using only A, C, D, E, G. Leave space between phrases.", why: "Constraint breeds creativity. Five notes, short phrases, lots of space — this is the Khruangbin vocal approach. Sparse and intentional." }
        ],
        feel: "The pentatonic scale should feel safe — these five notes always sound right over a minor chord. No wrong notes. Once this clicks, improvisation stops being scary.",
        wrong: "If you're singing notes outside the pentatonic and they clash, you're leaving the five-note safe zone. Come back to A-C-D-E-G. If you can't find the notes by ear yet, use the guitar as a reference for each one.",
        sarah: "Gene, the minor pentatonic is the skeleton key of improvisation. Tinariwen, Khruangbin, Tommy Guerrero — they all live in this scale. Learn these five notes by ear and you can jam over anything.",
        metronome: 85,
        recorder: true
      }
    ]
  },

  // ─── LEVEL 3: Covers + First Originals ──────────────────────────────
  {
    level: 3,
    title: "Covers + First Originals",
    subtitle: "Learn their songs, then start yours.",
    description:
      "Build a repertoire of covers in your genres — reggae, surf-psych, desert blues — while beginning to write your own material. Covers build vocabulary; originals build voice. Even rough, 'bad' originals develop the composition muscle. Mix both from the start.",
    artists: "Pepper, Mystic Braves, Babe Rainbow, Khruangbin",
    unlocks: "Hearing Harmony (Level 4)",
    exercises: [
      {
        id: "ss-3-1",
        time: 5,
        title: "Song Selection",
        type: "listen",
        what: "Choose 3 songs to learn as full guitar+voice covers. Criteria: 3-5 chords, melody in Gene's tenor range (E3-A4), laid-back vocal delivery, songs you actually love.",
        steps: [
          { text: "Open your 'Songs 2 Learn' playlist. Listen to 5-6 candidates with guitar in hand — can you find the chords?", why: "If you can't find the chords within a minute, the song may be too harmonically complex for this level." },
          { text: "Hum the vocal melody. Does it sit in your comfortable range (roughly E3 to A4)? If it goes too high, can you sing it an octave lower?", why: "Range fit matters. Fighting your range while also coordinating guitar kills the integration." },
          { text: "Pick one reggae/ska song, one surf-psych song, and one that's pure vibes (your choice of genre).", why: "Genre variety trains different strum patterns and vocal feels. Reggae = offbeat chop. Surf = jangle. Vibes = whatever flows." },
          { text: "Write down the three songs. These are your covers for Level 3.", why: "Commitment makes practice intentional. Three songs is enough to build a mini-set but not so many that nothing gets polished." }
        ],
        feel: "Choosing songs should feel exciting — you're picking the music that represents you. Pick songs you'd actually want to play for someone.",
        wrong: "Don't pick songs because they're 'easy' if you don't love them. Motivation matters more than simplicity. Also, don't pick songs with complex fingerpicking or fast chord changes — those aren't autopilot-able yet.",
        sarah: "Gene, your taste IS the curriculum. Pick from Pepper, Mystic Braves, Babe Rainbow, DOPE LEMON, The Lagoons, Sun Room — whatever makes you want to pick up the guitar."
      },
      {
        id: "ss-3-2",
        time: 10,
        title: "Reggae Cover",
        type: "song",
        what: "Learn and perform your reggae song at full tempo. Use the offbeat chop from Level 1. Focus on the groove — reggae is feel, not precision.",
        setup: "Guitar. Lyrics. Metronome at song tempo (typically 80-90 BPM).",
        tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
        steps: [
          { text: "Learn the chord progression. Most reggae songs use 3-4 chords. Get the changes clean with your offbeat chop.", why: "Reggae guitar is rhythmically simple — the offbeat chop is the same every bar. The challenge is maintaining it while singing." },
          { text: "Speak the lyrics in rhythm over the chop. Feel where the words land relative to the offbeats.", why: "Reggae vocal rhythms are syncopated — words often land between the guitar chops. Speak-first training maps this." },
          { text: "Sing at full tempo. Laid-back delivery — slightly behind the beat, relaxed. Think Bob Marley's phrasing, not a pop star's precision.", why: "The behind-the-beat feel is essential to reggae. Your voice should drag slightly, like honey." },
          { text: "Play along with the backing track. Match the groove. Your chop should disappear into the track's guitar.", why: "Playing along with a track trains your timing and feel in context. If your chop clashes with the track, adjust." }
        ],
        feel: "Reggae should feel like swaying, not marching. Everything is relaxed — hands, voice, body. If you're stiff, the groove is wrong regardless of the notes.",
        wrong: "If your offbeat chop is landing on the beat instead of the 'and,' the reggae feel is inverted. Listen to the backing track and match the existing guitar pattern.",
        sarah: "Gene, reggae is in your blood — it's in your top genres across every time range. This should feel like coming home. Don't overthink the vocal — just ride the groove.",
        metronome: 85,
        recorder: true
      },
      {
        id: "ss-3-3",
        time: 10,
        title: "Surf-Psych Cover",
        type: "song",
        what: "Learn and perform your surf-psych song. Use the jangle strum from Level 1. The vocal delivery for psych-surf is dreamy, reverb-drenched, and slightly detached — like you're singing from inside a daydream.",
        setup: "Guitar (reverb helps if electric). Lyrics. Metronome at song tempo.",
        tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
        steps: [
          { text: "Learn the chord progression with your jangle strum. Most surf-psych uses open chords with lots of sustained ringing.", why: "The jangle texture is the sonic identity. The strumming should shimmer continuously." },
          { text: "Hum through the melody first while strumming. Get the pitch contour locked in.", why: "Surf-psych melodies are often simple but atmospheric. Humming first builds the contour before words add complexity." },
          { text: "Sing with a dreamy, slightly detached vocal quality. Don't enunciate crisply — let words blur at the edges.", why: "This is the Allah-Las, Mystic Braves vocal approach. The voice is another texture, not the center of attention." },
          { text: "Full song, start to finish. Record it.", why: "Recording lets you hear if you've captured the vibe. The feeling matters more than perfection." }
        ],
        feel: "Dreamy, sun-drenched, slightly hazy. Like looking at the ocean through squinted eyes. The vocal and guitar blend together into one warm wash.",
        wrong: "If your singing is too precise or projected, it fights the psych-surf aesthetic. Pull back. Sing softer. Let the guitar be louder than your voice.",
        sarah: "Gene, this is your #1 genre. The key to psych-surf vocal delivery is restraint — sing like you don't care if anyone's listening. That indifference IS the style.",
        metronome: 100,
        recorder: true
      },
      {
        id: "ss-3-4",
        time: 8,
        title: "Dynamic Control",
        type: "song",
        what: "Take one of your covers and practice dynamic contrast: soft verse, louder chorus. When you pull back the guitar, pull back the voice. When you open up the strum, open up the voice. Voice and guitar breathe together.",
        steps: [
          { text: "Play through your verse. Strum gently — light touch, fewer strings. Sing quietly, conversationally.", why: "The verse is the setup. Low energy creates space for the chorus to hit harder." },
          { text: "Hit the chorus. Strum harder — full strum, all strings. Sing with more body, more breath support.", why: "The contrast between verse and chorus is what makes songs feel like they have shape and momentum." },
          { text: "Go back to the verse. Drop back down. The drop should feel deliberate, not accidental.", why: "Controlling the drop is harder than the rise. It requires discipline to get quiet again after a loud chorus." },
          { text: "Play the whole song with these dynamics mapped. Verse = 5/10 volume. Chorus = 8/10. Bridge = 6/10 (somewhere between).", why: "Numeric targets give you something concrete to aim for. Over time, dynamics become instinctive." }
        ],
        feel: "The dynamic shifts should feel like breathing — in (quiet) and out (loud). The song has a pulse of intensity that rises and falls.",
        wrong: "If the whole song is one volume level, it sounds flat. If the dynamic shifts are jarring instead of smooth, practice the transition points — the last beat of a quiet verse leading into a loud chorus.",
        sarah: "Gene, this is where singing and playing starts to feel like performing. Dynamics are what separate someone who plays songs from someone who performs them.",
        volumeMeter: true,
        recorder: true
      },
      {
        id: "ss-3-5",
        time: 6,
        title: "Simplify to Survive",
        type: "guitar",
        what: "Learn the 'cognitive escape hatches' — ways to instantly simplify your guitar when singing gets hard. Drop to root notes only, switch to all downstrokes, or mute and just keep the rhythm. These are your emergency tools.",
        steps: [
          { text: "Play your hardest cover and sing it. Notice the exact moment where the guitar and voice fight each other.", why: "Identifying the overwhelm point is the first step. It usually happens at a chord change during a tricky lyric phrase." },
          { text: "At that moment, simplify: drop to just the root note of each chord. One note, strummed on beat 1. Keep singing.", why: "Root notes are the absolute minimum guitar part. If you can sing over root notes, the problem is guitar complexity, not voice ability." },
          { text: "Alternatively: keep the chords but switch to all downstrokes. Or keep the strum pattern but mute the strings (percussive rhythm only).", why: "You have three escape hatches: simplify notes (root only), simplify rhythm (downstrokes only), simplify sound (muted percussion). Pick whichever keeps the voice going." },
          { text: "Practice transitioning: full strum → escape hatch → full strum. Seamlessly, mid-song.", why: "The escape hatch must be deployable in real time, not just in practice. You need to slip in and out without the listener noticing." }
        ],
        feel: "Using an escape hatch should feel like taking a breath — a moment of reduced complexity that lets you reset. It's not failure; it's strategy.",
        wrong: "If you're using escape hatches for the entire song, your guitar part isn't automatic enough. Go back to Level 1 for that specific song's chord progression. Escape hatches are for brief moments, not permanent mode.",
        sarah: "Gene, every professional singer-songwriter has these tricks. Watch any live performance — artists simplify their guitar parts in the hard vocal sections all the time. It's invisible to the audience."
      },
      {
        id: "ss-3-6",
        time: 10,
        title: "Parasitic Songwriting",
        type: "song",
        what: "Take the chord progression from a cover you just learned. Write completely new lyrics and a new melody over the same chords. Same chords, your words, your melody. This is 'parasitic songwriting' — and it's how many legendary songwriters started.",
        setup: "Guitar. Notebook or phone for lyrics. Recorder.",
        steps: [
          { text: "Play the chord progression from one of your covers. Strum it on repeat — it should be deeply autopilot by now.", why: "Familiar chords = zero guitar cognitive load. All your brainpower goes to creating the melody and words." },
          { text: "Hum a NEW melody over the chords. Not the original song's melody — something completely different. Follow your ear.", why: "The same chords can support infinite melodies. Your job is to find one that feels like yours, not theirs." },
          { text: "Once you have a melody you like, add words. Start with the scene in front of you: what do you see, hear, smell? Describe it in rhythm over the melody.", why: "Present-tense observation is the easiest lyric source. No pressure to be poetic — just describe." },
          { text: "Shape it into a verse: 4 lines. Don't edit. Don't judge. Just get words to melody to chords. Record it.", why: "The first draft is never good. What matters is that it exists. You wrote a verse. That's real." }
        ],
        feel: "This should feel exciting and vulnerable. You're making something that didn't exist before. It will be rough — and that roughness is the beginning of every great song.",
        wrong: "If you're spending 10 minutes trying to think of the perfect first line, you're editing before creating. Just start. Say anything. You can fix it later.",
        sarah: "Gene, Paul Simon, Bob Marley, half the Beatles songs — they all started by borrowing chord progressions and writing new melodies over them. It's not cheating. It's how songwriting works.",
        recorder: true
      },
      {
        id: "ss-3-7",
        time: 8,
        title: "Two-Minute Song",
        type: "song",
        what: "Write a verse and a chorus about what you did today. No editing, no perfectionism. Strum and sing it. Time limit: 10 minutes to write, then perform and record. It will be rough. That's the entire point.",
        setup: "Guitar. Notebook. Timer set for 10 minutes. Recorder.",
        steps: [
          { text: "Pick 3 chords you like together. Any three. Strum them in a loop.", why: "Three chords is enough. Don't overthink the harmony — just pick what sounds good to your ear right now." },
          { text: "Write 4 lines about your day. What happened? What did you notice? Concrete details, not abstract feelings. Set a timer — 5 minutes max.", why: "Time pressure defeats perfectionism. You can't agonize over word choice in 5 minutes. You just write." },
          { text: "Write 2-4 lines for a chorus. This should be simpler, more repetitive, and summarize the feeling of the verse. 3 minutes max.", why: "Choruses are hooks — short, memorable, repeatable. The simplest line is usually the best." },
          { text: "Strum and sing it. Start to finish. Don't stop to fix anything. Record it.", why: "The first performance of an original song is a milestone. It doesn't matter if it's good — it matters that it exists." }
        ],
        feel: "This should feel fast, messy, and exhilarating. You wrote a song. It took 10 minutes. It's probably not great. But you DID IT.",
        wrong: "If you spent 30 minutes on this, you're not following the time limit. The constraint is the tool — it forces you to create instead of polishing. If you wrote nothing because nothing felt 'good enough,' lower your standards dramatically.",
        sarah: "Gene, your first dozen songs will be rough. Every songwriter's first dozen are rough. The ones who become great are the ones who wrote them anyway. This exercise builds the habit.",
        recorder: true
      },
      {
        id: "ss-3-8",
        time: 10,
        title: "Mini Set",
        type: "song",
        what: "Play a mini set: 2 covers and 1 rough original, back-to-back, no stopping between songs. This is your first 'performance' — even if the audience is your phone.",
        setup: "Guitar. Your 3 prepared songs (2 covers + 1 original from this level). Recorder. A chair if you want to sit.",
        steps: [
          { text: "Decide the order. Start with your strongest cover, then the original, then end with the other cover. Strong-vulnerable-strong.", why: "Starting and ending with covers gives you confidence bookends. The original sits in the protected middle." },
          { text: "Hit record. Take a breath. Start the first song.", why: "The record button adds just enough pressure to simulate performing. It makes everything a little more real." },
          { text: "Between songs, don't stop playing. Strum a few bars of the next song's progression as a transition. No dead air.", why: "Transitions are a performance skill. Filling the gaps keeps the energy alive and trains you to think ahead while finishing the current song." },
          { text: "Finish the third song. Stop. Breathe. You just played a set.", why: "This is a real milestone. Three songs, back to back, guitar and voice. That's a musician." }
        ],
        feel: "Nervous energy is normal and good. It means this matters to you. Channel it into the performance. The rough original will feel the most vulnerable — lean into it.",
        wrong: "If you stopped between songs to tune, restart, or apologize to yourself — play through next time. Real sets don't have pauses. If your original felt too rough to include, include it anyway. Rough originals get better through performing them, not hiding them.",
        sarah: "Gene, save this recording. In six months, listen back. You'll be amazed at how far you've come. This recording is the starting line.",
        recorder: true,
        levelUp: "Can perform a 3-song mini set (2 covers + 1 original) with stable guitar, recognizable vocals, and no full stops between songs."
      },
      {
        id: "ss-3-9",
        time: 8,
        title: "Call and Response",
        type: "song",
        what: "The oldest musical conversation: guitar calls, voice responds. Then voice calls, guitar responds. This trains the back-and-forth between your two instruments that's the foundation of jamming — listening and answering in real time.",
        setup: "Guitar. Metronome at 85 BPM. Recorder.",
        tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Guitar calls: play a 2-beat melodic riff on the guitar (just a few notes on one string). Then sing it back — match the rhythm and the pitch contour. Repeat with different riffs.", why: "Echoing the guitar with your voice builds the ear-voice connection. You're training instant pitch recognition and reproduction." },
          { text: "Voice calls: sing a short melodic phrase (3-4 notes). Then find those notes on the guitar and play them back. Repeat with different phrases.", why: "The reverse direction — voice to guitar — trains you to translate what you hear internally into fretboard positions. Essential for jamming." },
          { text: "Now alternate freely: play a riff, sing it back, sing a new phrase, play it back. Keep the conversation going for 2 minutes.", why: "Free alternation is the jam conversation. You're training the neural pathway between hearing, singing, and playing — all in real time." },
          { text: "Over the backing track: play a guitar phrase in the first 2 bars, sing a responding phrase in the next 2 bars. 4-bar call-and-response cycle.", why: "With a backing track, you're jamming in context — the harmonic structure gives you guardrails while you practice the conversation." }
        ],
        feel: "Call and response should feel like a conversation between two friends. The guitar says something, the voice agrees, disagrees, or elaborates. Neither dominates — they take turns.",
        wrong: "If your voice can't match the guitar riff, the riff is too complex. Simplify to 2-3 notes. If your guitar can't find what you sang, slow down and hunt for the notes one at a time.",
        sarah: "Gene, call and response is the foundation of West African music, blues, reggae — all genres in your DNA. Tinariwen and Khruangbin use this constantly. It's the oldest jam technique there is.",
        metronome: 85,
        recorder: true
      }
    ]
  },

  // ─── LEVEL 4: Hearing Harmony ───────────────────────────────────────
  {
    level: 4,
    title: "Hearing Harmony",
    subtitle: "Chords are not just shapes. They are sounds with names.",
    description:
      "The Nashville Number System, ear training, melodic improvisation, and your first real jams. When you stop thinking of chords as finger shapes and start hearing them as sounds with emotional character, your songwriting and improvisation transform. Genre-specific jam templates — reggae vamps, surf drones — let you apply harmony knowledge in real time.",
    artists: "Khruangbin, Tinariwen, Bill Withers, Curtis Mayfield",
    unlocks: "Song Architecture & Melody (Level 5)",
    exercises: [
      {
        id: "ss-4-1",
        time: 8,
        title: "Nashville Numbers: I-IV-V",
        type: "song",
        what: "Learn the Nashville Number System — every chord becomes a number relative to the key. G is '1', C is '4', D is '5' in the key of G. This one tool lets you transpose any song instantly and understand why chord progressions work.",
        setup: "Guitar. Notebook.",
        steps: [
          { text: "In the key of G: G=1, Am=2, Bm=3, C=4, D=5, Em=6. Write this out. This is the number system.", why: "Once you think in numbers, you can play in any key. The relationship between chords is more important than their letter names." },
          { text: "Play your reggae cover. Instead of thinking 'G, C, D,' think '1, 4, 5.' Say the numbers out loud as you play.", why: "Saying numbers rewires your brain from shapes to sounds. The progression 1-4-5 is the same in every key." },
          { text: "Now transpose: in the key of C, 1=C, 4=F, 5=G. Play the same song in C. Same numbers, different shapes.", why: "Transposition is the superpower of the number system. You can move any song to fit Gene's vocal range." },
          { text: "Transpose again to D: 1=D, 4=G, 5=A. Play and sing. Which key sits best in your voice?", why: "Finding the right key for your voice is one of the most practical skills a singer-songwriter needs. The numbers make it instant." }
        ],
        feel: "When the number system clicks, you'll feel a shift — chords stop being isolated shapes and start being part of a family. You'll start hearing '1-4-5' in every song on the radio.",
        wrong: "If you're memorizing 'in G the chords are...' for each key individually, you're not using the system. The point is to think in numbers and apply them to any key on the fly.",
        sarah: "Gene, most of your favorite songs are 1-4-5 or 1-5-6-4. Once you hear the numbers, you'll never listen to music the same way. You'll start predicting chord changes before they happen.",
        metronome: 90
      },
      {
        id: "ss-4-2",
        time: 8,
        title: "The Minor Magic: ii and vi",
        type: "song",
        what: "Add the minor chords to your number vocabulary. The '6-minor' (vi) is the emotional heart of pop music. The '2-minor' (ii) adds sophistication. Learn the two most important progressions in popular music: I-vi-IV-V (the '50s) and I-V-vi-IV (the 'pop').",
        steps: [
          { text: "In G: play the '50s progression' — G (1), Em (vi), C (IV), D (V). Loop it. Sing root notes.", why: "This progression is 'Stand By Me', 'Every Breath You Take', 'I Will Always Love You'. It's the emotional backbone of Western pop music." },
          { text: "Now play the 'pop progression' — G (I), D (V), Em (vi), C (IV). Loop it. Notice how different it feels from the same four chords in different order.", why: "Same chords, different emotional journey. The order changes everything. This is 'No Woman No Cry', 'Let It Be', 'Africa'." },
          { text: "Add the ii: Am (ii) in key of G. Play I-ii-IV-V (G-Am-C-D). This is smoother, jazzier.", why: "The ii chord adds a stepping-stone between I and IV. It's the sophistication chord — Khruangbin uses it constantly." },
          { text: "Play each progression and sing any melody over it. Which progression feels most like 'you'?", why: "Your harmonic preference is part of your artistic identity. Knowing which progressions resonate helps you write authentically." }
        ],
        feel: "The vi chord should feel bittersweet — not sad, but nostalgically warm. The ii chord should feel smooth and sophisticated. Together with I, IV, and V, you have 80% of popular music covered.",
        wrong: "If all progressions sound the same to you, play each one 10 times and sit with the emotional quality. They ARE different — your ear just needs more exposure to hear it.",
        sarah: "Gene, your top artists ALL live in these progressions. Khruangbin loves I-ii-IV. Pepper lives on I-IV-V. Allah-Las are all about I-vi-IV-V. These aren't random patterns — they're emotional templates."
      },
      {
        id: "ss-4-3",
        time: 8,
        title: "Chord Tone Singing",
        type: "vocal",
        referencePitches: getPitchRange("A2", "E4"),
        what: "Strum a chord and sing back its individual notes — root, 3rd, and 5th. This connects your voice to the harmony at a note-by-note level. When you can hear and sing the notes inside a chord, your melodies become richer.",
        setup: "Guitar. Quiet room.",
        steps: [
          { text: "Strum Am. Let it ring. Sing the root: A. Match it exactly to the open A string.", why: "The root is the anchor. Every chord tone is defined by its distance from the root." },
          { text: "Now sing the 3rd: C. Find it on the guitar (3rd fret B string or open C string). Match your voice to it.", why: "The 3rd defines whether the chord is major or minor. In Am, the minor 3rd (C) gives it that melancholic quality." },
          { text: "Sing the 5th: E. Find it on guitar. Match.", why: "Root-3rd-5th is the complete chord as individual notes. You're singing the chord in slow motion." },
          { text: "Strum Am, then sing A-C-E in sequence without checking guitar. Then try G major: G-B-D. Then C major: C-E-G.", why: "Training your ear to find chord tones without the guitar means you can write melodies that land on strong harmonic notes." }
        ],
        feel: "Each chord tone should 'lock in' with the chord — when your voice matches a chord tone, you'll feel a resonance, like the guitar and voice are vibrating together.",
        wrong: "If you're guessing and getting the wrong notes, slow down. Play the individual note on guitar, match it with your voice, then try without the guitar. Build the ear-voice connection deliberately.",
        sarah: "Gene, this is ear training that directly feeds your songwriting. When you can hear the 3rd of a chord, you can write melodies that sit inside the harmony instead of fighting it."
      },
      {
        id: "ss-4-4",
        time: 8,
        title: "Transcribe by Ear",
        type: "listen",
        what: "Pick one song from your top 50 that you haven't learned yet. Figure out the chords by ear — no tabs, no chord charts, no Google. Just listen and find the chords on your guitar.",
        setup: "Phone/speaker to play the song. Guitar. Patience.",
        steps: [
          { text: "Listen to the song all the way through. How many different chords do you hear? Most songs have 3-5.", why: "Getting the chord count narrows your search. If you hear 3 chords, you're looking for I-IV-V or similar." },
          { text: "Listen to the first chord. Is it major (bright) or minor (dark)? Strum chords on your guitar until you find one that matches.", why: "Major vs minor is the first filter. It cuts your options in half." },
          { text: "Find the next chord the same way. How does it relate to the first? Is it higher or lower? Is it the IV? The V?", why: "Using the Nashville numbers helps you predict — if the first chord is I, the next is probably IV or V." },
          { text: "Map the whole song. Write down the progression using numbers. Verify by playing along with the recording.", why: "Playing along is the ultimate test. If your chords clash with the recording, something's off — listen again." }
        ],
        feel: "Transcribing by ear is slow and sometimes frustrating, but when you land on the right chord, the satisfaction is immediate — the guitar and the recording align perfectly.",
        wrong: "If you're stuck on a chord, try the most common options first: I, IV, V, vi. Most songs are built from these four. If none work, the song might use 7th chords or borrowed chords — that's a Level 5+ challenge.",
        sarah: "Gene, this single skill — learning songs by ear — is what separates musicians who depend on tabs from musicians who can learn anything, anywhere, with just a guitar. It's hard at first. It gets easier every time you do it."
      },
      {
        id: "ss-4-5",
        time: 6,
        title: "Melodic Improvisation",
        type: "vocal",
        referencePitches: getPitchRange("E3", "A4"),
        what: "Strum a I-IV-V-I progression and sing improvised melodies over it — 'ooh,' 'la,' or any vowel. No words, no plan. Laid-back, behind the beat, Khruangbin-style sparse. Let your ear guide every note.",
        setup: "Guitar. Metronome at 85 BPM.",
        tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "Strum G-C-D-G, 2 bars each. Get it flowing. Total autopilot.", why: "The guitar must be invisible for this exercise. All your attention goes to your voice." },
          { text: "Sing 'ooh' on root notes for one pass — just G, C, D, G. Boring? Good. That's the foundation.", why: "Root notes are the safe landing pads. They always sound right. Start there." },
          { text: "On the next pass, let your voice wander away from the roots. Sing notes between the chord tones. Some will sound great. Some will clash. Follow the great ones.", why: "Improvisation is directed wandering. You're exploring the space between chord tones. Your ear is learning what works in real time." },
          { text: "Try singing behind the beat — start each phrase slightly late, lazy. Think Khruangbin's vocal delivery: sparse, unhurried, spacious.", why: "Behind-the-beat phrasing is Gene's vocal aesthetic. It's not sloppy — it's intentional ease." }
        ],
        feel: "Good improvisation feels like a conversation with the chords — they suggest, your voice responds. There should be space between phrases. Don't fill every moment.",
        wrong: "If you're singing nonstop without pauses, you're not improvising — you're rambling. Space is part of the melody. If everything sounds wrong, go back to root notes and venture out more gradually.",
        sarah: "Gene, Khruangbin's vocals are like this — a few perfectly placed notes over a groove, lots of space. That's your target. Less is more.",
        metronome: 85,
        recorder: true
      },
      {
        id: "ss-4-6",
        time: 8,
        title: "Sunset Progression",
        type: "song",
        what: "Create a chord progression that feels like sunset. Pick 3-4 chords, strum them in a loop. Sing a melody over it — no lyrics, just 'ooh' or 'la.' Record the progression and the melody. You just wrote a song skeleton.",
        setup: "Guitar. Golden hour helps but isn't required. Recorder.",
        steps: [
          { text: "Think about sunset. Warm, fading, golden, bittersweet. What chords feel like that to you? Try different combinations. There's no wrong answer.", why: "Connecting emotion to harmony is the core of songwriting. The chord progression IS the feeling." },
          { text: "Suggestions if you're stuck: Em-C-G-D (melancholic warmth), G-Em-Am-C (nostalgic), D-Bm-G-A (open, spacious). Try each and pick the one that resonates.", why: "These are starting points, not answers. Your ears will tell you which one feels like YOUR sunset." },
          { text: "Strum your chosen progression on repeat. Let a melody emerge. Hum, then sing 'ooh.' Follow the chord tones but wander between them.", why: "The melody is the story. The chords are the landscape. Let the melody walk through the landscape." },
          { text: "Record the progression and your melody. Label it 'Sunset' with today's date. This is a song seed.", why: "Song seeds are the raw material of songwriting. Most songs start as a progression and a melody fragment, exactly like this." }
        ],
        feel: "This should feel personal and contemplative. You're not performing — you're capturing a moment in music. The sunset is the prompt, but the emotion you encode is uniquely yours.",
        wrong: "If you're overthinking the chords ('is this technically correct?'), stop thinking and play. Your ear knows more than your theory brain at this stage. If you can't feel anything, try playing outside — natural light and fresh air change everything.",
        sarah: "Gene, this exercise is pure you — golden hour, ocean, warm feeling. You're not borrowing anyone else's chords or melody. This is the start of YOUR songs.",
        recorder: true
      },
      {
        id: "ss-4-7",
        time: 8,
        title: "Backing Track Improv",
        type: "song",
        referencePitches: getPitchRange("E3", "A4"),
        what: "Sing improvised melodies over a backing track — no guitar in your hands. Just voice and the track. This removes the dual-task challenge entirely and lets you explore your voice freely over professional-quality harmony.",
        tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Psych Rock 120", src: "/psych-rock-120.mp3" }, { name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
        steps: [
          { text: "Play the backing track. Listen for one full cycle without singing. Feel the chord changes, the groove, the tempo.", why: "Absorb the harmonic landscape before you try to navigate it. Your ear needs to map the terrain." },
          { text: "On the second cycle, hum along. Find the root notes of each chord. Lock in with the bass.", why: "Root notes are your anchor points. Even a melody that wanders always has safe notes to land on." },
          { text: "On the third cycle, sing 'ooh' or 'la' and let your melody wander. Start simple, add complexity. Leave space between phrases.", why: "Each pass gives you more freedom. By the third cycle, your ear knows the changes and can anticipate." },
          { text: "On the fourth cycle, try adding words. Describe what you see. Stream of consciousness. No filter.", why: "Improvised lyrics are the hardest integration — melody, rhythm, words, and harmonic awareness all at once. Even a few lines is a win." }
        ],
        feel: "Without the guitar, your voice is free. You can move, gesture, close your eyes. This is pure vocal expression over harmony. Enjoy the freedom.",
        wrong: "If you freeze when the track starts, just hum one note. Any note. Hold it until a better note occurs to you. Starting is the hardest part — once you start, momentum carries you.",
        sarah: "Gene, this exercise reveals what your voice wants to do when it's not fighting with the guitar. The melodies you find here — bring them back to the guitar in Level 5.",
        recorder: true,
        levelUp: "Can transpose a song to 3 keys using Nashville numbers and improvise a coherent vocal melody over a I-IV-V-I progression."
      },
      {
        id: "ss-4-8",
        time: 10,
        title: "Reggae Vamp Jam",
        type: "play",
        what: "The reggae vamp: two chords, offbeat chop, 10 minutes, no plan. Sing whatever comes — pentatonic melodies, improvised lyrics, hums, silence. This is your first real jam. The simplicity of reggae harmony gives your voice maximum freedom.",
        setup: "Guitar. Backing track or metronome at 85 BPM.",
        tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }, { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
        steps: [
          { text: "Set up a 2-chord vamp: Am to Dm, offbeat chop, 4 bars each. Let it groove. Don't think about what you'll sing — just ride the groove for a full minute first.", why: "The vamp must be so automatic it disappears. One minute of pure groove primes your body to stop thinking and start feeling." },
          { text: "Start with pentatonic hums — A, C, D, E, G. Short phrases, lots of space. Behind the beat. Let the melody float on top of the chop.", why: "Pentatonic over a minor vamp = zero wrong notes. You can explore freely without fear of clashing." },
          { text: "When a melody phrase feels good, repeat it. Vary it slightly. Then move on. Follow your ear, not your brain.", why: "Jamming is intuition, not composition. The good phrases announce themselves — they feel right in your body." },
          { text: "Try adding words. Describe the groove, the weather, anything. Stream of consciousness over the vamp. Don't filter.", why: "Improvised lyrics are the summit of singer-songwriter jamming — melody, harmony, rhythm, and words, all created in real time." },
          { text: "Jam for the full 10 minutes. Record all of it. Listen back later for any phrases worth keeping.", why: "Long jams are where magic happens — the first 3 minutes are warming up, minutes 4-7 are flow, minutes 8-10 are where the gems emerge." }
        ],
        feel: "A reggae vamp jam should feel meditative — the repetitive harmony creates a trance-like state where your voice can wander freely. Think Slightly Stoopid jam sections, Pepper live extended jams.",
        wrong: "If you're planning what to sing next, you're composing, not jamming. Let go of control. If nothing comes, just hum one note and wait. The melody will find you.",
        sarah: "Gene, this is the exercise that turns you from someone who plays songs into someone who jams. Reggae is the perfect jam foundation — simple harmony, deep groove, infinite vocal freedom.",
        metronome: 85,
        recorder: true
      },
      {
        id: "ss-4-9",
        time: 10,
        title: "Surf Drone Jam",
        type: "play",
        what: "The surf drone: one chord, jangle strum, let the reverb and overtones create a wall of sound. Sing over the drone — spacey, atmospheric, detached. This is the psych-surf jam: minimal harmony, maximum texture.",
        setup: "Guitar (reverb helps if electric). Metronome at 100 BPM.",
        tracks: [{ name: "Psych Rock 120", src: "/psych-rock-120.mp3" }],
        steps: [
          { text: "Strum Em with continuous 8th-note jangle. Just Em. Nothing else. Let the chord ring and shimmer for 2 full minutes.", why: "A single-chord drone creates a hypnotic foundation. Your voice can go anywhere — the harmony doesn't change, so nothing can clash dramatically." },
          { text: "Sing long, sustained notes over the drone — pick a note, hold it, let it fade, find a new note. Think of it as painting with your voice over a shimmering background.", why: "Long notes over a drone create atmosphere. This is the vocal approach of Mystic Braves, levitation room, GHOSTWOMAN." },
          { text: "Add a second chord — maybe Am or C. Alternate slowly: Em (8 bars) then Am (4 bars) then Em (8 bars). Your vocal melody should respond to the chord change.", why: "Introducing a second chord creates harmonic movement — a sense of journey. Your voice navigates the change in real time." },
          { text: "Try wordless vocals: 'ooh,' 'ahh,' extended vowels. Let the sounds blur with the guitar. You're not singing words — you're adding vocal texture.", why: "Psych-surf vocals are often textural, not lyrical. The voice is another instrument, not the center of attention." }
        ],
        feel: "This should feel cosmic and expansive — like floating in warm water. No urgency, no structure, just sound and vibration. Pure golden hour energy.",
        wrong: "If you're singing too many notes or too fast, pull back. The drone jam is about space and atmosphere, not speed or complexity. Less is more. Way less.",
        sarah: "Gene, this is your genre at its purest — psych-surf without structure, just vibes. Allah-Las jam sessions sound like this. Close your eyes and surf the sound.",
        metronome: 100,
        recorder: true
      }
    ]
  },

  // ─── LEVEL 5: Song Architecture & Melody ────────────────────────────
  {
    level: 5,
    title: "Song Architecture & Melody",
    subtitle: "Before you write, learn what songs are made of.",
    description:
      "Analyze the structure of songs you love, understand why verse-chorus-bridge works, and compose your own melodies using voice-first writing. The method: sing a melody before touching the guitar. This builds audiation — the ability to hear music in your inner ear — and prevents the trap of chord-driven cliches.",
    artists: "Nick Drake, Curtis Mayfield, Khruangbin, Tinariwen",
    unlocks: "Lyrics & Storytelling (Level 6)",
    exercises: [
      {
        id: "ss-5-1",
        time: 10,
        title: "Anatomy of 5 Songs",
        type: "listen",
        what: "Pick 5 songs from your top 50. Map the complete structure of each: intro, verse, pre-chorus, chorus, bridge, outro. Count bars. Note which section has the hook. Understand what songs are made of before you build your own.",
        steps: [
          { text: "Pick 5 songs you love. Mix genres — one reggae, one surf-psych, one chill/soul, two of whatever you want.", why: "Variety reveals patterns. Different genres use structure differently, but the fundamentals are universal." },
          { text: "For each song, listen and write the section map: 'Intro (4 bars) → Verse 1 (8 bars) → Chorus (8 bars) → Verse 2 (8 bars)...' etc.", why: "Most listeners never consciously notice structure. Making it explicit reveals the architecture that makes songs work." },
          { text: "Note: how long is each section? How many times does the chorus appear? Does the song have a bridge? What changes between Verse 1 and Verse 2?", why: "These patterns are templates you can use for your own songs. Most songs follow remarkably similar blueprints." },
          { text: "Look for the hook — the moment that makes you want to replay the song. Is it in the chorus? The intro riff? A lyric? Where in the structure does it sit?", why: "The hook is the reason the song exists. Understanding its placement teaches you where to put yours." }
        ],
        feel: "This is detective work. You're reverse-engineering songs you love. By the end, you should see the blueprints beneath the music — the scaffolding that holds it together.",
        wrong: "If every song seems to have the same structure, you're probably right — verse-chorus-verse-chorus-bridge-chorus is the most common form. That's not boring; it's proven. If you can't tell where sections change, listen for lyric repetition (chorus) vs new lyrics (verse).",
        sarah: "Gene, you've been listening to music your whole life. Now listen with songwriter ears. Every song you love was designed — this exercise reveals the design."
      },
      {
        id: "ss-5-2",
        time: 8,
        title: "Energy Map",
        type: "listen",
        what: "For your 5 analyzed songs, draw the energy curve: where is intensity lowest? Where is the peak? How does the bridge redirect? This IS song architecture — the emotional journey from start to finish.",
        steps: [
          { text: "Listen to one song. On paper, draw a line that goes up when energy rises and down when it drops. X-axis is time, Y-axis is intensity.", why: "The energy map makes the emotional journey visible. You can SEE the architecture." },
          { text: "Mark the sections on your line: verse (usually low), chorus (usually peak), bridge (usually a reset or pivot).", why: "Sections have energy jobs. Verse builds. Chorus delivers. Bridge redirects." },
          { text: "Look at the shape: does it build steadily? Does it have a single peak or multiple? Does it end high or low?", why: "Different shapes create different emotional effects. A single-peak song feels climactic. A rolling-peaks song feels driving." },
          { text: "Draw energy maps for all 5 songs. Compare them. What patterns do you see?", why: "Patterns across songs reveal the universal grammar of emotional architecture. These patterns inform your own writing." }
        ],
        feel: "Drawing energy maps should make songs feel more three-dimensional — not just a sequence of sounds but a designed experience with intentional rises and falls.",
        wrong: "If your energy map is a flat line, you're not listening dynamically. Pay attention to instrumentation changes, volume shifts, new elements entering and leaving. Those ARE the energy shifts.",
        sarah: "Gene, when you write your own songs, you'll draw the energy map FIRST, then build sections to match it. Architecture before notes."
      },
      {
        id: "ss-5-3",
        time: 8,
        title: "Voice-First Melody",
        type: "vocal",
        referencePitches: getPitchRange("E3", "A4"),
        what: "Put the guitar down. Sing a melody into the recorder — any melody. No chords, no instrument, no reference. Just your voice creating a tune from your inner ear. This is audiation: the most important songwriting skill.",
        setup: "No guitar. Just recorder. Quiet space.",
        steps: [
          { text: "Close your eyes. Think of a scene — ocean at sunset, driving with windows down, morning coffee on the lanai. Hold that image.", why: "The scene gives your melody emotional direction. You're not composing abstractly; you're scoring a moment." },
          { text: "Hum. Let a melody come. Don't force it — just wait for your inner ear to suggest something. Even 4 notes is enough.", why: "Audiation is like a whisper from your musical subconscious. It takes patience to hear it, but everyone has it." },
          { text: "Once you have a phrase, repeat it. Then vary it. Then repeat the variation. This is the fundamental unit of melody: statement, variation, return.", why: "All melodies are built from repetition and variation. You don't need to invent a 32-bar melody — just a 4-note phrase and its variations." },
          { text: "Sing it into the recorder. Multiple takes if needed. Save the one that feels most natural.", why: "The recorder captures what your inner ear created. This melody is yours — it came from inside, not from a chord shape." }
        ],
        feel: "This might feel uncomfortable — singing without the safety net of a guitar. That discomfort means you're developing a new skill. The melody will feel more personal because nothing else influenced it.",
        wrong: "If nothing comes, start with a single note and just move up or down by one step. Melody is just one note connecting to the next. If you're trying to compose a 'good' melody, stop — just make ANY melody. Quality comes from quantity.",
        sarah: "Gene, this is the exercise that separates singers who perform other people's songs from singers who write their own. Your voice knows melodies your guitar can't teach you.",
        recorder: true
      },
      {
        id: "ss-5-4",
        time: 8,
        title: "Find the Chords",
        type: "song",
        what: "Take the melody you just sang and pick up the guitar. Find chords that fit underneath it. The melody leads; the guitar follows. This is the opposite of how most beginners write (strum chords, hope a melody appears).",
        setup: "Guitar. Your recorded melody from ss-5-3.",
        steps: [
          { text: "Play back your melody recording. Sing along. Know the melody cold.", why: "You need the melody memorized so you can focus on finding chords, not remembering the tune." },
          { text: "Sing the first note of your melody. Find it on the guitar. What chord contains that note? Try a few — whichever sounds right, use it.", why: "There's no single correct chord for any note. The 'right' chord is the one that feels emotionally aligned." },
          { text: "Do this for each phrase of the melody. You'll end up with a chord progression that was born FROM the melody, not imposed onto it.", why: "Melody-first writing produces more unique, personal progressions. Chord-first writing tends to produce generic songs." },
          { text: "Play the full thing: strum and sing, melody with its chords. Record it.", why: "This is a complete musical idea — a melody with harmony. It's the kernel of a song." }
        ],
        feel: "Finding chords that fit your melody should feel like solving a puzzle — each correct chord clicks into place. When voice and guitar align, you'll feel it in your chest.",
        wrong: "If no chords seem to fit, your melody might be in a key you're not comfortable with. Try transposing the melody up or down until the chords are familiar open shapes.",
        sarah: "Gene, you just composed a piece of music: melody first, then harmony. That's the method of Stevie Wonder, Paul McCartney, and most of the greats. You're writing real songs now.",
        recorder: true
      },
      {
        id: "ss-5-5",
        time: 8,
        title: "Verse-Chorus Contrast",
        type: "song",
        what: "Write a 4-bar verse melody and a 4-bar chorus melody. The chorus should feel DIFFERENT from the verse — higher energy, wider range, more repetition, simpler rhythm. This contrast is what makes songs feel like they go somewhere.",
        steps: [
          { text: "Sing a verse melody: conversational, lower register, more words. Think 'telling a story to a friend.'", why: "Verses carry information. They're detailed, wordy, intimate. The melody reflects that — it moves in small steps." },
          { text: "Now sing a chorus melody: bigger, simpler, higher. Think 'the thing everyone sings along to.'", why: "Choruses carry emotion. They're broad, repetitive, memorable. The melody lifts — bigger intervals, longer notes." },
          { text: "Sing them back-to-back: verse → chorus. The transition should feel like a shift in gravity — from grounded to elevated.", why: "The contrast between verse and chorus IS the architecture of the song. Without contrast, there's no journey." },
          { text: "Find chords for both. Often the verse and chorus share some chords but in different order or with a different starting chord.", why: "Harmonic contrast supports melodic contrast. A new chord at the start of the chorus signals change to the listener." }
        ],
        feel: "The verse should feel intimate and storytelling. The chorus should feel like opening a window — more light, more air, more space.",
        wrong: "If your verse and chorus feel the same, push the contrast harder. Make the verse much quieter and the chorus much louder. Make the verse low in your range and the chorus high. Exaggerate until you can feel the difference.",
        sarah: "Gene, listen to your favorite songs with this lens: how does the chorus FEEL different from the verse? That feeling is what you're building here."
      },
      {
        id: "ss-5-6",
        time: 6,
        title: "The Bridge — Plot Twist",
        type: "song",
        what: "Write a bridge for your verse-chorus: a short section (4-8 bars) that goes somewhere NEW — a new chord (try the vi or ii), different rhythm, shift in perspective. The bridge is the plot twist of a song.",
        steps: [
          { text: "Play your verse-chorus. After the second chorus, you need something different. The listener is habituated — surprise them.", why: "The bridge breaks the pattern. Without it, verse-chorus repeats become monotonous." },
          { text: "Try a chord you haven't used yet. In the key of G, if you've been using G-C-D, try Em (vi) or Am (ii) to start your bridge.", why: "A new chord signals 'we're somewhere different.' The ear perks up at harmonic surprise." },
          { text: "Change the melody rhythm. If your verse and chorus are flowing, make the bridge choppy. Or vice versa.", why: "Rhythmic contrast reinforces the sense of newness. The bridge should feel like a different room in the same house." },
          { text: "Keep it short — 4 bars is enough. Then return to the chorus. The return should feel like arriving home.", why: "The bridge's purpose is to make the final chorus feel earned. It creates tension that the chorus resolves." }
        ],
        feel: "The bridge should feel like a detour that reveals something new. When the chorus returns after it, there should be a sense of satisfying return — 'ah, we're back.'",
        wrong: "If your bridge sounds like another verse, it's not different enough. Push further: change key, change rhythm, change register. A bridge that doesn't contrast isn't a bridge — it's a third verse.",
        sarah: "Gene, the bridge is where great songs become memorable. It's the moment of surprise in a familiar structure. Even 4 bars of 'something different' transforms the whole song."
      },
      {
        id: "ss-5-7",
        time: 8,
        title: "Complete Original with Structure",
        type: "song",
        what: "Take your best melody, progression, or song seed from Levels 3-4 and give it real structure: verse + chorus + bridge. Even with 'la la la' placeholder lyrics. Record the full structured song.",
        setup: "Guitar. Your song seeds and recordings from Levels 3-4. Recorder.",
        tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
        steps: [
          { text: "Pick your strongest musical idea from Levels 3-4. It might be the parasitic songwriting piece, the sunset progression, or the melody from the backing track improv.", why: "You've been generating raw material for two levels. Now you're assembling it into a real song." },
          { text: "Arrange it: verse (8 bars), chorus (4-8 bars), verse 2 (8 bars), chorus, bridge (4 bars), final chorus.", why: "This is the standard song template. It works because it balances repetition (choruses) with novelty (verses, bridge)." },
          { text: "Play through the full arrangement. Sing placeholder lyrics ('la la la') or your best attempt at real words.", why: "The structure matters more than the words right now. You're building the musical architecture." },
          { text: "Record the full song. Label it with a working title and today's date.", why: "This is a finished first draft of an original song. Rough, yes — but complete. That's the milestone." }
        ],
        feel: "Playing a complete original song from start to finish should feel like a real accomplishment. You wrote this. These chords, this melody, this structure — it's all you.",
        wrong: "If you're stuck trying to make it perfect before recording, stop. Record the rough version. Perfection comes from revision, and revision requires something to revise.",
        sarah: "Gene, this song will change as you grow. But right now, it exists. You're a songwriter. Not 'someday' — right now, with this recording.",
        recorder: true,
        levelUp: "Can analyze the structure of any song by ear, compose melodies voice-first, and have at least one complete original song with verse, chorus, and bridge."
      },
      {
        id: "ss-5-8",
        time: 8,
        title: "Syncopated Vocal Independence",
        type: "song",
        what: "The hardest dual-task challenge: sing ON the beats while your guitar plays OFFBEATS (reggae), then flip it — sing on the offbeats while strumming on the beats. This builds true rhythmic independence between voice and hands.",
        setup: "Guitar. Metronome at 80 BPM (slow for precision).",
        steps: [
          { text: "Reggae chop on Em — upstrokes on the 'and' of each beat. Now sing sustained notes landing on beats 1 and 3 only. Voice and guitar alternate: sing-chop-sing-chop.", why: "Voice on the beat, guitar between beats — they interlock like a zipper. This is the fundamental reggae vocal pattern." },
          { text: "Harder: sing on the offbeats ('and') while strumming downstrokes on the beats. This inverts the natural pattern and forces true independence.", why: "Most people default to singing and strumming at the same time. Offsetting them proves that your voice and hands are truly independent motor programs." },
          { text: "Try a reggae cover with intentional offbeat vocal phrasing — let your words land between the guitar chops, not on them.", why: "In real reggae, vocals weave around the guitar pattern. Bob Marley's phrasing sits between the offbeats. That weaving is rhythmic independence in action." },
          { text: "Ultimate test: strum an on-beat pattern while singing a syncopated melody that lands on different beats each bar. If both hold, you've achieved rhythmic independence.", why: "True independence means voice and guitar can do completely different rhythmic things simultaneously. This is the skill that enables freestyle jamming." }
        ],
        feel: "When voice and guitar are rhythmically independent, the music feels interlocking — like two gears meshing. Each one creates space for the other.",
        wrong: "If your voice keeps snapping to the guitar rhythm (or vice versa), slow the metronome way down — 60 BPM — and exaggerate the offset. Independence is hard-won. Don't rush it.",
        sarah: "Gene, this is the exercise that most singer-songwriters skip — and it's why most singer-songwriters sound rhythmically flat. Reggae demands this independence. Master it and your vocal phrasing opens up completely.",
        metronome: 80
      }
    ]
  },

  // ─── LEVEL 6: Lyrics & Storytelling ─────────────────────────────────
  {
    level: 6,
    title: "Lyrics & Storytelling",
    subtitle: "Show it. Don't say it. Sing it. Don't shout it.",
    description:
      "The craft of words set to music. Concrete imagery over abstract emotion. Rhyme that serves the song, not the other way around. Syllable stress aligned with musical stress. And the discipline of finishing: one rough song per week, because songwriting is a muscle that strengthens with use.",
    artists: "DOPE LEMON (conversational), Skinshape (imagery), Tommy Guerrero (mood)",
    unlocks: "Fingerpicking, Performance & Identity (Level 7)",
    exercises: [
      {
        id: "ss-6-1",
        time: 8,
        title: "Show Don't Tell",
        type: "song",
        what: "Take the emotion 'missing the ocean.' Write 4 lines that SHOW it without using the words 'ocean,' 'miss,' 'lonely,' or 'sad.' Use concrete, sensory images — things you can see, hear, smell, touch.",
        setup: "Notebook. No guitar yet — this is a writing exercise.",
        steps: [
          { text: "Close your eyes. Think about missing the ocean. What specific images come to mind? Not the feeling — the details.", why: "Abstract emotions are invisible. Concrete images are vivid. 'I'm sad' means nothing. 'Sand still in the car seat from September' means everything." },
          { text: "Write down sensory details: salt on skin, the sound of whitewash, empty wetsuit hanging, wax comb in the glovebox, tan lines fading in winter.", why: "Each detail is a potential lyric. Details are what make listeners feel — because they trigger their own memories and associations." },
          { text: "Pick the strongest 4 images. Arrange them into 4 lines that scan — that feel rhythmic when spoken aloud.", why: "Lyrics must work as spoken rhythm before they work as melody. Read your lines aloud and feel the natural stress pattern." },
          { text: "Now strum a chord progression and sing your 4 lines over it. Don't force them to fit — adjust the melody to match the words' natural rhythm.", why: "Good lyrics and good melody work together because the syllable stress of the words aligns with the beat stress of the music." }
        ],
        feel: "Good show-don't-tell lyrics should feel specific and personal, but evoke a universal emotion. The listener doesn't need to surf to feel 'sand in the car seat months later.'",
        wrong: "If your lines are 'I miss the waves' or 'the ocean is calling,' you're telling, not showing. Go more specific. More sensory. What do you SEE? HEAR? SMELL? FEEL?",
        sarah: "Gene, your life IS your lyric source. Surfing, ocean, travel, golden hour — these are your themes. Don't write about things you haven't experienced. Write about what you know so deeply it comes out in images, not statements.",
        recorder: true
      },
      {
        id: "ss-6-2",
        time: 6,
        title: "Syllable Stress Alignment",
        type: "song",
        what: "Learn to match lyric syllable stress to musical beat stress. Misaligned stress sounds amateurish — aligned stress sounds invisible (which means it's working perfectly).",
        steps: [
          { text: "Speak this line in natural speech: 'I WANT to GO to the BEACH.' Capitalize the syllables that naturally hit harder.", why: "English has natural stress patterns. 'I WANT to GO' — want and go are stressed. These must land on strong beats." },
          { text: "Now clap a 4/4 beat and speak the line in rhythm. Where do the stressed syllables land? They should land on beats 1 and 3 (the strong beats).", why: "When stress aligns with the beat, lyrics feel effortless. When they fight the beat, listeners feel uncomfortable without knowing why." },
          { text: "Try misaligning on purpose: 'i want TO go TO the beach.' Hear how awkward that sounds? That's stress misalignment.", why: "Hearing the wrong version helps you recognize it in your own writing. Many first drafts have stress problems you won't notice until you sing them." },
          { text: "Take a verse you've written. Sing it. Do any words land on the wrong beats? Rewrite those lines to align.", why: "Rewriting for stress alignment is a core editing skill. Sometimes it means swapping word order; sometimes it means changing the word entirely." }
        ],
        feel: "When stress aligns perfectly, the lyrics feel like they were always meant to be sung to that melody. They disappear into the music.",
        wrong: "If you can't hear the stress patterns, try exaggerating: speak the line VERY dramatically, almost parodying it. The stressed syllables will become obvious.",
        sarah: "Gene, DOPE LEMON and Skinshape have great syllable stress alignment — their lyrics feel effortless because the words ride the beat perfectly. Listen to how their syllables land on the strong beats."
      },
      {
        id: "ss-6-3",
        time: 8,
        title: "Rhyme Schemes",
        type: "song",
        what: "Write one verse in AABB rhyme (lines 1-2 rhyme, 3-4 rhyme), one in ABAB (lines 1-3 rhyme, 2-4 rhyme), and one in ABCB (only lines 2-4 rhyme). Sing each. Feel how the rhyme scheme changes the mood.",
        setup: "Notebook. Guitar for singing after writing.",
        steps: [
          { text: "Write 4 lines with AABB rhyme. Example: 'The sun goes down behind the reef (A) / The day fades out beyond belief (A) / The salt still drying on my face (B) / The current took me to this place (B)'.", why: "AABB feels contained and complete. Each couplet resolves immediately. It can feel playful or structured." },
          { text: "Write 4 lines with ABAB rhyme. Same topic, different scheme. Lines 1 and 3 rhyme, lines 2 and 4 rhyme.", why: "ABAB creates tension — you wait for the rhyme. The delay makes the resolution more satisfying. Feels more sophisticated." },
          { text: "Write 4 lines with ABCB rhyme. Only lines 2 and 4 rhyme. Lines 1 and 3 don't rhyme with anything.", why: "ABCB is the most natural-sounding scheme — closest to conversation. Most singer-songwriter lyrics use this. It feels effortless and unforced." },
          { text: "Sing all three over the same chord progression. Which feels most like your style?", why: "Your preferred rhyme scheme is part of your artistic voice. ABCB suits Gene's laid-back conversational style — but try all three." }
        ],
        feel: "Each scheme should feel distinctly different when sung. AABB: tidy. ABAB: structured. ABCB: natural. Your genre (psych-surf, reggae) tends toward ABCB — casual and flowing.",
        wrong: "If you're forcing rhymes that sound unnatural ('I went to the store / to buy some more'), the rhyme is controlling the words instead of serving them. A near-rhyme ('store/before') is better than a forced perfect rhyme.",
        sarah: "Gene, don't be a slave to rhyme. The best songwriters break rhyme when the meaning demands it. A perfect image with no rhyme beats a forced rhyme with no meaning, every time."
      },
      {
        id: "ss-6-4",
        time: 6,
        title: "Economy of Language",
        type: "song",
        what: "Take a paragraph about a surf session (or any experience). Cut it to 4 lines. Then cut those lines to their essential images. Every word must earn its place in a song.",
        steps: [
          { text: "Write a paragraph (5-7 sentences) describing a recent experience — a surf session, a sunset, a road trip. Include everything: details, feelings, thoughts.", why: "Starting with excess gives you raw material. You can't cut what doesn't exist." },
          { text: "Cut to 4 lines. What's essential? What's filler? Remove adjectives that don't add meaning. Remove any line that tells instead of shows.", why: "Songs are compressed. A 3-minute song has maybe 100-150 words of lyrics. Every word counts." },
          { text: "Cut further: can any 3-word phrase become 1 word? Can any line be split into two shorter, punchier lines?", why: "Economy isn't about being short — it's about density. Each word carries maximum meaning." },
          { text: "Sing your distilled 4 lines over a chord progression. Do they feel like they belong in a song?", why: "The final test is singability. Lines that work on paper might not work as lyrics. The melody reveals the truth." }
        ],
        feel: "Good lyric economy should feel like poetry — dense, precise, every word resonating. Not flowery, not overwrought — just clear and vivid.",
        wrong: "If your lines are still long and conversational, you haven't cut deep enough. If they're so short they're cryptic, you've cut too much. The sweet spot: instantly understood but emotionally resonant.",
        sarah: "Gene, look at DOPE LEMON's lyrics — simple, conversational, sparse. He says a lot with a few words. That's your target: golden hour mood with golden hour economy."
      },
      {
        id: "ss-6-5",
        time: 6,
        title: "Writer's Journal",
        type: "song",
        what: "Start a songwriter's journal practice. Capture everything: overheard phrases, images, feelings, titles, chord progressions. Right now, write 10 potential song titles. No filtering — just flow.",
        setup: "Notebook (physical is ideal — it's always accessible, no battery, no distractions).",
        steps: [
          { text: "Write 10 song titles. Right now. Don't think — just write. 'Salt Air.' 'Golden Hour Drive.' 'Wetsuit Weather.' 'Four Walls and a Window.' Anything.", why: "Titles are seeds. Some will grow into songs. Some won't. But having 10 seeds beats having zero." },
          { text: "Write 5 overheard phrases — things people said that stuck with you. 'I'll be there before the tide changes.' 'That was the summer everything felt possible.'", why: "Real speech is the best lyric source. It has natural rhythm, real emotion, and specific detail." },
          { text: "Write 3 images — things you've seen that had emotional weight. 'Board wax melting in the back seat.' 'The way the water looks at 6am.' 'Her sandals by the door.'", why: "Images are the building blocks of show-don't-tell lyrics. Collect them constantly." },
          { text: "Write 2 chord progressions or melody fragments — hum them and use shorthand notation (Nashville numbers or chord letters).", why: "Musical ideas are perishable. If you don't capture them, they vanish. Even rough notation is enough to reconstruct later." }
        ],
        feel: "The journal should feel like a net for catching ideas. Not organized, not neat — just a place where creative sparks land so they don't disappear.",
        wrong: "If you're editing while you write, stop. The journal is a capture tool, not a publishing tool. Bad ideas are welcome. Many bad ideas hide good ones underneath.",
        sarah: "Gene, carry this journal (or use your phone notes). Ideas come when you're surfing, driving, cooking, half-asleep. Your best song might start as 3 words scribbled on a napkin."
      },
      {
        id: "ss-6-6",
        time: 10,
        title: "One Song This Week",
        type: "song",
        what: "Write a complete rough song: lyrics + melody + chords + structure (verse-chorus-bridge). Time box: 30 minutes to write, then perform and record. Finish it. It doesn't need to be good. It needs to exist.",
        setup: "Guitar. Notebook. Timer (30 minutes). Recorder.",
        steps: [
          { text: "Pick a title from your journal, or write about what happened today. 30-minute timer starts now.", why: "The timer is non-negotiable. It defeats perfectionism and forces output. You can always revise later." },
          { text: "Write verse 1 (4 lines). Write the chorus (2-4 lines, simpler and more repetitive). Write verse 2 (4 different lines). Sketch a bridge (2-4 lines).", why: "Structure first: verse-chorus-verse-chorus-bridge-chorus. Fill in the words. Don't polish — just get words on paper." },
          { text: "Find chords that fit. Use what you know — 3-4 chords from the Nashville numbers. Don't compose the progression from scratch unless inspiration strikes.", why: "Borrowed progressions are fine. The melody and lyrics are what make it yours. Don't let chord-hunting eat your 30 minutes." },
          { text: "Timer goes off. Stop writing. Pick up the guitar and perform what you have. Record it. Even if it's incomplete.", why: "The recording is the deliverable. A rough demo is infinitely more valuable than a perfect song that stays in your head." }
        ],
        feel: "This should feel urgent and slightly chaotic. Thirty minutes isn't enough to write a great song — but it IS enough to write a real one. The constraint is the creative fuel.",
        wrong: "If you spent an hour and still don't have a recording, the timer wasn't strict enough. If the lyrics are 'bad,' that's expected. Rough songs become good songs through revision. Non-existent songs become nothing.",
        sarah: "Gene, write one song per week. Most will be rough. Some will be terrible. A few will surprise you. But the habit of finishing is what makes a songwriter.",
        recorder: true
      },
      {
        id: "ss-6-7",
        time: 8,
        title: "Rewrite & Polish",
        type: "song",
        what: "Take last week's rough song. Rewrite the weakest verse. Replace one abstract word with a concrete image. Cut one unnecessary line. This is the craft — transforming raw material into something polished.",
        setup: "Your recorded rough song from ss-6-6 (or any previous original). Guitar. Notebook.",
        steps: [
          { text: "Listen to your rough recording. Read the lyrics. Which verse is weakest? Which line makes you cringe? That's your target.", why: "Self-critique is a skill. Learning to identify weakness in your own work accelerates improvement." },
          { text: "Rewrite that verse. Keep the melody but change the words. Make every line show instead of tell. Use your journal for images.", why: "Rewriting is where mediocre songs become good. The first draft captures the idea; the rewrite refines it." },
          { text: "Find one abstract word ('love,' 'freedom,' 'happy') and replace it with a concrete image that evokes the same feeling.", why: "Abstract words are placeholders for real images. 'Happy' is nothing. 'Feet in warm sand' is something you can feel." },
          { text: "Cut one line that doesn't add meaning or imagery. If every line adds something, cut the one that adds the least.", why: "Cutting is harder than writing. Every cut makes what remains stronger. A great 12-line song beats a mediocre 16-line song." }
        ],
        feel: "Polishing should feel like sculpting — removing material to reveal the shape inside. The song gets better by getting leaner.",
        wrong: "If you're rewriting everything, you're starting over, not polishing. Keep the structure and melody — just improve the words. If you can't cut anything, you're too attached — step away for a day and come back with fresh ears.",
        sarah: "Gene, Leonard Cohen rewrote 'Hallelujah' over 80 times. You don't need 80 — but one serious revision pass transforms a rough song into a real one. This is the work.",
        recorder: true,
        levelUp: "Can write one complete original song per week with concrete imagery, natural syllable stress, and intentional rhyme scheme. Can self-critique and revise lyrics."
      },
      {
        id: "ss-6-8",
        time: 10,
        title: "Loop Jam",
        type: "play",
        what: "Build a song in real time using loops: record a chord progression, loop it, add a bass line, then improvise vocals over both layers. This connects to the Looper skill tab and teaches you to be your own band.",
        setup: "Use the Looper tool (see Looper skill tab) or a phone recording as a rough loop. Guitar.",
        tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
        steps: [
          { text: "Record a 4-bar chord loop: Am, C, G, D with your preferred strum pattern. Play it back on repeat.", why: "The loop becomes your backing band. Once it's playing, your hands and voice are free for new layers." },
          { text: "Over the loop, play a bass line — just root notes on the low strings. Record that as a second layer if your setup allows, or just play it live.", why: "Bass + chords creates a fuller sound that inspires better vocal melodies. You're building the arrangement in real time." },
          { text: "Now put the guitar down. Sing over your loop. Full vocal improv — pentatonic melodies, improvised lyrics, harmonies with yourself.", why: "Loops free you from the dual-task challenge entirely. Your voice gets 100% of your attention while the guitar part plays back." },
          { text: "Try building the whole thing live: strum then loop, add guitar texture, then sing. Start to finish, one take. This is live-looping performance.", why: "Live looping is a modern singer-songwriter performance skill. Ed Sheeran, Tash Sultana, and many artists perform entire songs this way." },
          { text: "Cross-reference: explore the Looper skill tab for deeper loop techniques and effects processing.", why: "The Looper tab has dedicated exercises for building loop layers. This exercise introduces the concept; the Looper tab goes deep." }
        ],
        feel: "Loop jamming should feel like building a sculpture in real time — each layer adds dimension. By the end, you've created a full arrangement from nothing.",
        wrong: "If your loop timing is off (it sounds like it skips or drags), the loop point wasn't clean. Practice getting a precise 4-bar loop before adding layers.",
        sarah: "Gene, loop jamming is where songwriting and improvisation merge. You can use loops to write (discover ideas by improvising over them) or to perform (build songs live for an audience). Both are powerful.",
        recorder: true
      }
    ]
  },

  // ─── LEVEL 7: Fingerpicking, Performance & Identity ─────────────────
  {
    level: 7,
    title: "Fingerpicking, Performance & Identity",
    subtitle: "New hands, full voice, your sound.",
    description:
      "Fingerpicking + singing is a new integration challenge — your right hand must build a new autopilot from scratch. Full dynamic arcs, live improvisation, jam circles, recording + self-critique, and the most important question: what kind of singer-songwriter are you becoming? Build your set, jam with others, find your voice, perform for someone.",
    artists: "Nick Drake, Tommy Guerrero, Khruangbin, your own voice",
    unlocks: "Your identity as a singer-songwriter",
    exercises: [
      {
        id: "ss-7-1",
        time: 10,
        title: "Fingerpicking Autopilot",
        type: "guitar",
        what: "Learn a basic fingerpicking pattern — thumb alternates on bass strings (4-5-6), index and middle fingers pick treble strings (1-2-3). Get it automatic on one chord before adding anything else. This is Level 1 again, for a new technique.",
        setup: "Guitar (nylon-string if available — Gene's texture preference). Metronome at 60 BPM.",
        steps: [
          { text: "Hold Am. Thumb plays A string (5), then index plays B string (2), then middle plays high E string (1). That's the pattern: thumb-index-middle, repeating.", why: "This is the Travis picking foundation. Thumb on bass, fingers on treble. The thumb is the anchor — like the foot-tap for strumming." },
          { text: "Loop this pattern at 60 BPM. One note per beat. Don't look at your right hand — feel the strings.", why: "Slow and clean builds the right-hand muscle memory. Each finger must find its string without looking." },
          { text: "Keep going for 3 minutes on Am. If you can zone out — think about surfing, your day, anything — the pattern is reaching autopilot.", why: "Same conversation test as Level 1. If thinking about something else breaks the pattern, it's not automatic yet." },
          { text: "Try the same pattern on C, then G, then Em. Same right-hand pattern, different left-hand chord. Thumb adjusts to the bass note of each chord.", why: "Each chord has a different bass string. Am=5th string, C=5th string, G=6th string, Em=6th string. The thumb must adapt." }
        ],
        feel: "Fingerpicking should feel delicate and rolling — a gentle cascade of notes instead of a strum. The nylon-string sound is warm and intimate. Think Nick Drake, Tommy Guerrero, Hermanos Gutierrez.",
        wrong: "If your fingers are catching on strings or producing uneven volume, slow down. Each note should ring clearly with equal volume. If your thumb keeps hitting the wrong bass string, watch it for a while — then close your eyes and feel.",
        sarah: "Gene, fingerpicking + singing is the hardest integration in this curriculum. Your right hand needs a completely new autopilot. Be patient with yourself — this is Level 1 all over again, just with different fingers.",
        metronome: 60
      },
      {
        id: "ss-7-2",
        time: 8,
        title: "Fingerpick + Speak → Hum → Sing",
        type: "song",
        what: "Apply the Level 2 integration method to fingerpicking: speak lyrics over the pattern, then hum, then sing. Same three stages, new motor challenge.",
        steps: [
          { text: "Fingerpick Am-C-G on repeat at 60 BPM. Solid? Now speak lyrics of a simple song you know while picking.", why: "Speaking is the easiest vocal task. If the picking breaks during speech, it's not automatic enough. Go back to ss-7-1." },
          { text: "Hum the melody contour over your fingerpicking. Keep the picking steady — let the humming ride on top.", why: "Humming adds pitch without words. It's the intermediate step between speaking and singing." },
          { text: "Sing the full lyrics at a relaxed tempo. Porch register. Don't project. Let the fingerpicking be louder than your voice.", why: "Fingerpicking + quiet voice is the Singer-Songwriter Aesthetic. Think Nick Drake — the guitar is prominent, the voice is intimate." },
          { text: "If the picking falls apart during singing, deploy escape hatch: simplify to thumb-only (bass notes) while singing. Then gradually add fingers back.", why: "The escape hatch for fingerpicking is reducing to just the thumb. One bass note per chord is the minimum. Build back up from there." }
        ],
        feel: "Fingerpicked songs feel more intimate and exposed than strummed songs. The notes are individual, clear, vulnerable. Your voice matches that vulnerability — soft, conversational, personal.",
        wrong: "If you're treating fingerpicking like strumming (loud, aggressive), pull back. Fingerpicking is gentle. If your singing overwhelms the picking, sing quieter. The balance should favor the guitar slightly.",
        sarah: "Gene, fingerpicking unlocks the nylon-string, Hermanos Gutierrez, Tommy Guerrero side of your taste. It's a different sound world from strumming — more intimate, more spacious.",
        metronome: 60
      },
      {
        id: "ss-7-3",
        time: 8,
        title: "Dynamic Arc",
        type: "song",
        what: "Play one of your originals with a full dynamic journey: fingerpicked intro (quiet), strummed verse (moderate), full strum chorus (loud), fingerpicked bridge (quiet), strummed final chorus (loudest). The song breathes.",
        steps: [
          { text: "Map the dynamics: Intro = fingerpick, pp. Verse 1 = gentle strum, mp. Chorus = full strum, f. Verse 2 = strum, mp. Chorus 2 = full, f. Bridge = fingerpick, p. Final Chorus = everything, ff.", why: "Dynamic mapping is like choreography for intensity. Planning it makes the performance intentional, not accidental." },
          { text: "Practice each transition: fingerpick → strum. Strum → fingerpick. The switch must be smooth, not jarring.", why: "Transitions are the hardest part of dynamic performance. They're where the technique changes and the mood shifts simultaneously." },
          { text: "Play through the full song with the dynamic map. Exaggerate the differences — whisper the quiet parts, almost shout the loud parts.", why: "Exaggeration in practice creates subtlety in performance. What feels extreme alone sounds natural to a listener." },
          { text: "Record it. Listen back. Can you hear the dynamic journey? Does the song build and breathe?", why: "The recording reveals whether your dynamics are audible or imagined. What feels dynamic when playing might sound flat on recording." }
        ],
        feel: "The full dynamic arc should feel like a complete emotional journey — arrival, building, peak, release, resolution. Like watching a sunset from start to finish. 'Beautiful day that you know will end' energy.",
        wrong: "If the whole song is one volume, your dynamics aren't translating. Push the contrast harder. Whisper. Then yell. Then whisper again. The range between soft and loud IS the performance.",
        sarah: "Gene, this is where you become a performer, not just a player. Dynamics are the difference between someone who plays songs and someone who tells stories with music.",
        volumeMeter: true,
        recorder: true
      },
      {
        id: "ss-7-4",
        time: 8,
        title: "Improvise Lyrics Live",
        type: "vocal",
        what: "Strum a I-IV-V progression and make up lyrics on the spot about what you see, hear, and feel. Not good — just flowing. No filter, no editing. This builds the live composition muscle.",
        tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }],
        steps: [
          { text: "Strum or play the backing track. Close your eyes (or look out a window). Start singing words — describe what you see. 'Morning light through the blinds, coffee getting cold...'", why: "Present-tense observation is the easiest improv source. You're reporting reality in melody. No imagination needed — just attention." },
          { text: "Don't stop. Even if you run out of things to describe, keep singing. Make up a story. Follow a thought. The words will come.", why: "Improvised lyrics train the instant connection between thought and voice. The filter disappears. What remains is authenticity." },
          { text: "If you get stuck, repeat a phrase and change one word each time. 'The water's warm today / The water's gone today / The summer's gone today.'", why: "Repetition with variation is a legitimate songwriting technique. Many great choruses are built exactly this way." },
          { text: "Do this for 5 full minutes. Record all of it. Later, listen for any phrases or melodies worth keeping.", why: "Improv sessions are gold mines. 95% is throwaway, but the 5% that works can seed real songs." }
        ],
        feel: "Lyric improv should feel vulnerable and freeing simultaneously. You're bypassing your inner critic. What comes out might surprise you — some of your most honest writing happens when you're not trying.",
        wrong: "If you're stopping to think between lines, you're not improvising — you're composing slowly. Keep the flow going even if the words are nonsense. Flow first, quality later.",
        sarah: "Gene, some of your best song ideas will come from these improv sessions. The conscious mind writes clever lyrics. The improvising mind writes honest ones.",
        recorder: true
      },
      {
        id: "ss-7-5",
        time: 10,
        title: "Record & Self-Critique",
        type: "record",
        what: "Record a full original song — your best one, performed with dynamics, intention, and the warm/analog aesthetic you love. Listen back with a notebook. Write: one thing that worked, one thing to improve. This replaces a teacher's feedback.",
        setup: "Guitar. Recorder. Notebook. Quiet room. If possible, add some reverb to your voice (even a bathroom has natural reverb).",
        steps: [
          { text: "Warm up: play through the song once without recording. Shake out any nerves.", why: "The warm-up pass primes your muscle memory and lets you make mistakes without pressure." },
          { text: "Record. Play the song from start to finish. Dynamic arc, vocal intention, the whole performance. Don't stop for mistakes.", why: "A full performance recording reveals the truth. It shows what works and what needs work in context." },
          { text: "Listen back immediately. With a notebook, write: (1) One specific thing that worked well — a vocal phrase, a chord transition, a dynamic moment. (2) One specific thing to improve.", why: "Self-critique is the most important meta-skill of a self-taught musician. Balanced feedback (positive + improvement) prevents both complacency and discouragement." },
          { text: "Work on the improvement area for 5 minutes. Then record the whole song again. Compare the two takes.", why: "Immediate recording-critique-improvement cycles are the fastest path to growth. Each take should be measurably better than the last." }
        ],
        feel: "Recording yourself is always slightly uncomfortable — you hear flaws you didn't notice while playing. That discomfort is the sound of growth. Embrace it.",
        wrong: "If you're doing 10 takes trying to get a 'perfect' one, you're missing the point. Two takes with a critique in between is better than 10 takes with no reflection.",
        sarah: "Gene, aim for that warm, lo-fi aesthetic you love — a little room reverb, relaxed delivery, imperfect but real. Your recordings don't need to sound like a studio. They need to sound like you.",
        recorder: true
      },
      {
        id: "ss-7-6",
        time: 6,
        title: "Build Your Set",
        type: "song",
        what: "Organize your repertoire: 3 originals + 3 covers = a 20-minute set. Sequence them for variety: alternate tempos, keys, and moods. This is your calling card as a singer-songwriter.",
        steps: [
          { text: "List all your performable songs — originals and covers. Which ones can you play start-to-finish without major breaks?", why: "A performable song is one you can play reliably, not just occasionally. Be honest about which songs are ready." },
          { text: "Pick 3 originals and 3 covers. Mix genres: one reggae, one surf-psych, one chill/soul. Variety keeps the set interesting.", why: "Genre variety shows range. Alternating covers and originals maintains audience trust (familiar) and interest (new)." },
          { text: "Sequence them: strong opener (a cover the audience might know), build to your best original in the middle, end with a crowd-pleaser.", why: "Set sequencing is a performance skill. The arc of the set mirrors the arc of a song — build, peak, resolve." },
          { text: "Write out the set list. Practice the transitions between songs. No dead air — strum the next song's intro while finishing the current one.", why: "Transitions are the connective tissue of a set. Smooth transitions create the illusion of one continuous musical experience." }
        ],
        feel: "Having a set list should feel official — like you're a real musician with a repertoire. Because you are. Six songs, twenty minutes. That's a set.",
        wrong: "If you don't have 3 performable originals yet, include 2 and make the 6th song another cover. The goal is a complete, performable set — adjust the ratio as your catalog grows.",
        sarah: "Gene, this set list is proof of everything you've built. From autopilot strumming to original songs to a complete performance. Write it on a piece of paper. Put it on your wall."
      },
      {
        id: "ss-7-7",
        time: 8,
        title: "Sing with Someone",
        type: "song",
        what: "Learn a song with Court (or a friend). Trade verses — you sing one, they sing one. Try a simple harmony on the chorus. Performing with another person unlocks a completely different dimension of music-making.",
        steps: [
          { text: "Pick a song you both know (or can learn quickly). Something from your 'Sing with Court' playlist or any shared favorite.", why: "A shared song creates immediate connection. You're not teaching — you're collaborating." },
          { text: "Divide it up: one person sings verse 1, the other sings verse 2. Both sing the chorus together, in unison first.", why: "Trading verses is the simplest duet format. It gives each person a spotlight and a rest." },
          { text: "On the chorus, try a simple harmony: one person sings the melody, the other sings a 3rd above or below. Start by holding one note while the other sings the melody.", why: "Harmony with another voice is one of the most beautiful sounds in music. Even a simple drone (one sustained note) underneath the melody sounds rich." },
          { text: "Perform the whole song together. Record it. The experience of singing with someone is fundamentally different from singing alone.", why: "Music is social at its core. Solo practice builds skill; performing with others builds musicianship and joy." }
        ],
        feel: "Singing with someone should feel like a conversation — you listen, they respond, you meet in the chorus. If it makes you both smile, you're doing it right.",
        wrong: "If you're both singing the same thing at the same volume, try contrast: one person pulls back while the other leads. Take turns being the lead and the support.",
        sarah: "Gene, your 'Sing with Court' playlist tells me this is something you're already drawn to. Lean into it. Duet performing is one of the deepest joys in music.",
        recorder: true
      },
      {
        id: "ss-7-8",
        time: 10,
        title: "The Golden Hour",
        type: "play",
        what: "Perform your full 6-song set for an audience of one — Court, a friend, a phone camera, or a mirror. No stopping, no apologizing, no restarting. This is performance. Start to finish.",
        tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
        steps: [
          { text: "Set up your space. Chair, guitar, water. Set up a recording device (phone camera is perfect). This is your stage.", why: "Creating a performance environment — even a living room — signals to your brain that this is real. It activates performance mode." },
          { text: "Tell your audience (even if it's a camera): 'I'm going to play six songs.' Then start. No preamble, no apologies.", why: "The moment you announce the set and begin, you're performing. The commitment is the performance." },
          { text: "Play all six songs. Transitions between songs. Dynamic arcs within songs. Eye contact with your audience if there is one. If you make a mistake, keep going.", why: "Playing through mistakes is the most important performance skill. The audience doesn't know what you planned — they only know what you played." },
          { text: "After the last song, stop. Breathe. You just performed a set. Thank your audience. Stop the recording.", why: "The ending matters. A clean ending with a moment of stillness is more powerful than trailing off." }
        ],
        feel: "The Golden Hour should feel like the culmination of everything — every level, every exercise, every rough song and awkward recording. Nervous energy channeled into performance. Vulnerability as strength.",
        wrong: "If you stop to restart a song, you've broken the performance contract. In a real set, you push through. If the nerves are overwhelming, start with your strongest cover — let momentum carry you into the harder songs.",
        sarah: "Gene, save this recording. Date it. This is your Golden Hour — the moment you went from 'learning guitar' to 'performing as a singer-songwriter.' Everything before was preparation. This is the thing itself.",
        recorder: true
      },
      {
        id: "ss-7-10",
        time: 10,
        title: "Jam Circle",
        type: "play",
        what: "The ultimate integration: jam with another musician (or backing tracks as your band). Trade roles — you comp while they solo, they comp while you solo. Trade fours: 4 bars of guitar, 4 bars of voice, alternating. This is real-time musical conversation.",
        setup: "Another musician (ideal) or backing tracks. Guitar. Recorder.",
        tracks: [{ name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }, { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
        steps: [
          { text: "With a partner: agree on a key and a groove (G major, reggae feel at 85 BPM). One person strums chords, the other improvises melody (singing or playing). Trade after 8 bars.", why: "Trading roles teaches you both sides of the jam — supporting and leading. A good jammer does both." },
          { text: "Trade fours: play a 4-bar guitar phrase, then sing a 4-bar vocal response. The voice and guitar take turns being the soloist. Keep the conversation going.", why: "Trading fours is how jazz musicians jam, adapted for singer-songwriters. It forces you to listen to what you just played and respond vocally." },
          { text: "Solo with backing track: play the track, strum along for the first cycle, then drop your guitar and improvise vocals for the next cycle. Alternate: guitar cycle, voice cycle.", why: "If you don't have a jam partner, backing tracks give you a band to jam with. The principle is the same — trade roles between voice and guitar." },
          { text: "Full free jam: no rules, no structure. Play guitar when it feels right, sing when it feels right, do both when it feels right. Follow the music wherever it goes. Record everything.", why: "Free jamming is the endpoint of all this training. Every skill — autopilot strumming, pentatonic singing, call and response, harmonic navigation — comes together here." }
        ],
        feel: "A good jam feels like flying — you stop planning and start reacting. The music leads and you follow. When voice, guitar, and groove all lock in, you'll know it in your body.",
        wrong: "If you're stuck playing safe patterns, push into unfamiliar territory. Try a note you haven't tried. Play a chord you don't usually use. Mistakes in jams become discoveries.",
        sarah: "Gene, this is what it all leads to — picking up the guitar and making music in the moment, with or without other people. Every exercise in this curriculum was building toward this freedom.",
        metronome: 85,
        recorder: true
      },
      {
        id: "ss-7-9",
        time: 5,
        title: "Your Musical Voice",
        type: "song",
        what: "Reflection exercise. Record a voice memo answering: What genres feel most like me? What do my songs want to say? What kind of singer-songwriter am I becoming? This isn't performing — it's discovering.",
        steps: [
          { text: "Put down the guitar. Just talk into the recorder. What music have you been drawn to throughout this curriculum?", why: "Your choices reveal your identity. The covers you picked, the melodies you improvised, the lyrics you wrote — they point somewhere." },
          { text: "What themes keep appearing in your lyrics? Ocean? Travel? Home? Loss? Joy? What does your music care about?", why: "Themes are your artistic territory. Knowing your themes helps you write more intentionally." },
          { text: "What does your voice want to sound like? Laid-back and warm? Raw and vulnerable? Playful? Atmospheric?", why: "Vocal identity is as important as lyric identity. Your delivery IS your brand." },
          { text: "One sentence: 'I am a singer-songwriter who ______.' Fill in the blank. Say it out loud.", why: "Declaring your identity makes it real. You're not becoming a singer-songwriter — you are one." }
        ],
        feel: "This should feel like a moment of recognition — looking back at the path and realizing how far you've come. From autopilot strumming to a personal artistic identity.",
        wrong: "If you can't answer these questions, that's data too. It means you haven't found your voice YET — and that's part of the journey. Keep writing, keep performing, keep listening.",
        sarah: "Gene, 'Coastal Psychedelic Omnivore' is your listening identity. Now you're building your creating identity. They don't have to be the same — but they're related. Your music comes from your taste, and your taste is uniquely yours.",
        recorder: true,
        levelUp: "You have a personal repertoire of originals and covers, can perform fingerpicked and strummed songs with dynamic range, and have begun to find your musical identity."
      }
    ]
  }
];
