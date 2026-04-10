export const level2 = {
  num: 2, name: "Loop + Voice", focus: "Minimum Viable Performance",
  duration: "50 min",
  setup: "RC-505mkII with guitar in INST 1, mic in MIC input. Input levels at -6dB. Quantize: MEASURE. Rhythm guide at 80-90 BPM.",
  exercises: [
    {
      id: "lo2e1", time: 10, title: "Sing Over Your Loop", type: "looper",
      checklist: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }],
      what: "The minimum viable loop performance: chord loop + singing live over it. This is the KT Tunstall / Howie Day paradigm — record your accompaniment, then perform as a vocalist over your own backing track. The loop is your band. You are the frontperson.",
      setup: "Record Am-C-G-D fingerpicking loop (4 bars) on Track 1 at 90 BPM. Mic connected but you're singing live, NOT recording voice into a loop.",
      steps: [
        { text: "Record a clean Am-C-G-D fingerpicking loop on Track 1. Let it play back and listen for one full cycle to confirm it's clean.", why: "This is your backing band. Same progression you've been practicing in guitar study. A clean foundation loop is essential — any artifact in the loop will distract you every 4 bars while you're trying to sing." },
        { text: "Sing the ILTWYW melody live over the loop — NOT recorded into a loop, just live through the mic/monitors. Start with the verse.", why: "Singing live (not into a loop) is the simplest performance mode. Loop = band, you = vocalist. By keeping the voice live, you can adjust phrasing, dynamics, and timing in real time without committing anything to the loop." },
        { text: "Make it through one full verse without losing your place in the melody. If you get lost, listen for the Am chord returning — that's your anchor point, the top of the cycle.", why: "The loop cycles every 4 bars. Your vocal phrases need to align with the cycle. The Am chord (the 'one') is your landmark — every time you hear it, you know exactly where you are in the form." },
        { text: "Now try the chorus. Notice how the energy shift feels over the same chord loop — same chords, different vocal intensity.", why: "Same chords, different vocal energy. This is how simple loop performances create dynamics without changing the loop. The audience perceives a section change because YOUR energy changed, even though the accompaniment didn't." }
      ],
      feel: "Like singing with a backing track, except YOU made the backing track 30 seconds ago. That ownership changes how you sing — you're not following someone else's arrangement, you're building on your own foundation. It feels like the first time you realized you could sing and play guitar simultaneously, but easier.",
      wrong: "If you keep losing your place in the song, simplify: just hum the melody first. Add words once the melodic rhythm is locked to the loop cycle. If the loop feels too fast for singing, drop to 80 BPM. There's no award for struggling at the wrong tempo.",
      sarah: "Gene, this is where your voice and your looper meet for the first time. You've been singing ILTWYW in our sessions — now sing it over a loop YOU built. It's the same song, but the feeling is completely different when you're the band AND the singer. Your laid-back porch tenor is perfect for this — don't try to belt or push. Just let your voice sit on top of the loop like it belongs there. Because it does.",
      metronome: 90,
      levelUp: "Complete one full verse + chorus of ILTWYW while the loop plays, without losing your place in the melody or the chord cycle."
    },
    {
      id: "lo2e2", time: 5, title: "Volume Staging Basics", type: "looper",
      checklist: true,
      volumeMeter: true,
      what: "Set your loop quieter than max so there's room for voice and future layers. The foundational mixing concept: headroom. If your first loop is at 100%, everything you add on top causes distortion. Professional sound starts here.",
      setup: "Loop playing on Track 1. Mic connected if available.",
      steps: [
        { text: "Set Track 1 fader to 70-80% (not max). This is your loop volume ceiling. Watch the output meter as you adjust.", why: "If the first loop is at 100%, adding anything else — voice, overdub, second track — causes the combined signal to exceed maximum and distort. Leaving 20-30% fader headroom is how every professional mixer works." },
        { text: "Sing or play at your normal performance volume. Watch the master output meter (near knob [3]).", why: "The combined output of loop + live should peak at -6dB or below. This gives you headroom for dynamic moments — when you sing louder on the chorus, the meter can go up without hitting red." },
        { text: "If the master meter hits red, pull Track 1 fader down 10%. Re-check. Keep adjusting until the combined signal stays in the green zone.", why: "Red = clipping = digital distortion. Unlike analog distortion (which can sound warm), digital clipping sounds harsh and brittle. It's the #1 most common beginner looper mistake, and it's easily preventable." },
        { text: "Find the balance point: loop is audible and present as a foundation, but your live voice or guitar sits on top clearly and is always the loudest element.", why: "The live element should always be the loudest thing in the mix. The audience is watching you perform live — the loop is supporting you, not competing with you. Think of it like a singer in front of a band: the band is quieter than the singer." }
      ],
      feel: "Like mixing a record — the loop is the rhythm section sitting back in the mix, your voice is the lead vocal sitting forward. The lead should be upfront, clear, and present. The backing should support without competing.",
      wrong: "If you can't hear the loop under your voice, it's too quiet — bring the fader up. If your voice is buried under the loop, the loop is too loud — bring the fader down. Aim for 'comfortable conversation volume' balance where you can hear both clearly. If you're compensating by cranking the master output, the problem is at the fader stage — fix it there.",
      sarah: "Gene, this is mixing in real time — a skill most musicians never learn because they leave it to the sound engineer. But as a looper, YOU are the sound engineer. The good news: it's not complicated. Just make sure you can always hear your voice clearly over the loop. If you can't, the fader comes down. That's it. That's mixing.",
      metronome: 90,
      levelUp: "Loop + live voice with no clipping (master meter stays green) and clear vocal presence. You can hear both elements distinctly."
    },
    {
      id: "lo2e3", time: 5, title: "The Undo Drill", type: "looper",
      checklist: true,
      what: "Practice recovering from a bad overdub. UNDO removes the last thing you added to a track, restoring the clean version underneath. This is your Ctrl-Z — make it instant.",
      setup: "Clean loop playing on Track 1. Rhythm guide at 80 BPM.",
      steps: [
        { text: "Press Track 1 to enter overdub mode (LED goes AMBER). This means anything you play now gets added ON TOP of the existing loop.", why: "Overdub adds to the existing loop without erasing it. When the overdub goes wrong — wrong note, bad timing, accidental noise — you need to remove just that layer." },
        { text: "Record something deliberately wrong — random noise, wrong notes, off-rhythm playing. Make it obviously bad.", why: "You're practicing recovery, not music. Make the mistake on purpose and egregiously so you can hear the contrast when you undo it. Training with intentional mistakes builds confident recovery." },
        { text: "Press UNDO. On the mkII, check your manual for the exact button — it may be a dedicated UNDO button, or assigned to a CTL button or footswitch.", why: "UNDO removes the last overdub layer. Your original clean loop should return instantly. The first time this works, it feels like magic — your mistake vanishes and the clean loop is back as if nothing happened." },
        { text: "Verify: is the original loop clean again? If yes, your UNDO worked. Now do the full cycle 5 times: overdub something bad > UNDO > verify clean. Goal: the full cycle takes under 2 seconds.", why: "In performance, 2 seconds of bad audio is barely noticeable — the audience might think it was intentional. 10 seconds of bad audio layered on top of your loop is a disaster that compounds every cycle. Speed matters." }
      ],
      feel: "Like having Ctrl-Z for live music. The moment you internalize that UNDO exists and works instantly, you become braver about trying things. Failed experiments cost nothing. That safety net transforms your relationship with risk during performance.",
      wrong: "If UNDO doesn't seem to work, check that you're in the right mode. UNDO only removes the most recent overdub layer, not the original recording. If you've done multiple overdubs, each UNDO peels back one layer. If you accidentally UNDO the original recording, you may need to re-record it.",
      sarah: "Gene, UNDO is the single most liberating button on the 505. Once you know it works and you can hit it fast, you'll start trying things you'd never attempt otherwise — a weird harmony, an experimental rhythm, a vocal sound you're not sure about. Try it, and if it doesn't work, UNDO. Two seconds and it's gone. That freedom to experiment without consequence is how creative breakthroughs happen.",
      metronome: 80,
      levelUp: "Overdub, hear the mistake, UNDO — all within 2 seconds, without looking at the unit. 5 consecutive successful recoveries."
    },
    {
      id: "lo2e4", time: 10, title: "Overdub Technique", type: "looper",
      checklist: true,
      what: "Add a bass note overdub to your existing chord loop. This is constructive layering — adding a new musical element on top of an existing loop to create depth. The key lesson: overdubs stack volume, so gain staging starts here.",
      setup: "Clean chord loop playing on Track 1 at 80 BPM.",
      steps: [
        { text: "Press Track 1 to enter overdub mode (AMBER). Play a single bass note — low E or A string, open or fretted — on beat 1 of each bar. Keep it simple: one note, one beat, four bars.", why: "A simple addition that thickens the loop without cluttering it. The bass note anchors the harmony and adds a low-frequency foundation that wasn't in the fingerpicking. One note per bar is enough — less is more with overdubs." },
        { text: "Press Track 1 again to exit overdub (back to GREEN/play). Listen to the combined result.", why: "The bass note is now permanently part of the loop. Does it blend naturally with the fingerpicking? Does it add depth or does it clash? Critical listening after each overdub is how you develop good judgment about what to add." },
        { text: "Listen for volume: is the overdub section louder than the original? Each overdub ADDS signal volume to the existing loop. Two layers are louder than one.", why: "Key lesson: overdubs don't replace — they stack. Every layer adds volume. Three overdubs can easily push a loop from -6dB to clipping territory. This is why gain staging matters from layer one. Record each layer slightly quieter than you think you need." },
        { text: "If the combined loop is too hot (meter hitting red), pull the fader down. If the balance is wrong (bass too loud or too quiet), re-record the overdub at a different input level using knob [2].", why: "Better to record quieter and turn up the fader than to clip from stacked overdubs. You can always add volume with the fader — you can't remove distortion once it's baked into the loop." }
      ],
      feel: "Like adding a bass player to your band, one note at a time. A single bass note per bar transforms a simple fingerpicking loop into something with weight and foundation. Simple additions have outsized musical impact.",
      wrong: "If the overdub makes the loop muddy or distorted, your input level is too high for the overdub layer. Drop knob [2] by 10-15% and re-record the overdub. If the bass note clashes harmonically, make sure you're playing the root of the chord — A over Am, C over C, etc.",
      sarah: "Gene, overdubs are where looping gets addictive. That bass note you just added? It turned a solo fingerpicker into a duo. And you did it by playing one note per bar. The temptation is to add too much too fast — resist it. Each overdub should earn its place. If one bass note makes the loop better, don't add a second bass note. Add something in a different register or a different rhythm. Quality over quantity, always.",
      metronome: 80,
      levelUp: "Clean overdub with bass notes that blend naturally — no volume spike, no distortion, no harmonic clash. The combined loop sounds richer than the original."
    },
    {
      id: "lo2e5", time: 5, title: "Chord Cycle Loops", type: "looper",
      checklist: true,
      what: "Record loops with internal chord changes — Am to C within a single loop. Then test your 'clean ceiling' by increasing tempo until the chord change gets sloppy. Knowing your ceiling lets you set realistic tempos for performance.",
      setup: "Rhythm guide running. Quantize: MEASURE.",
      steps: [
        { text: "Record a 4-bar loop: Am (2 bars) then C (2 bars). The chord change happens INSIDE the loop, mid-recording.", why: "Real songs have chord changes. Your loops need to capture them cleanly. The transition from Am to C within the loop is a new challenge — you can't pause or adjust between chords." },
        { text: "Test at 70 BPM. Is the chord change clean? No stumble, no gap, no rhythmic hiccup? Try 80. Clean? Try 90. Try 100.", why: "Find where your chord changes start getting sloppy inside a loop. That's your 'clean ceiling' — the fastest tempo at which you can reliably record a clean chord-change loop." },
        { text: "Listen to the chord change point in the loop as it cycles. Is the transition rhythmically tight, or is there a stumble every time it comes around?", why: "The transition between chords is where loops expose timing issues. In normal playing, a tiny hesitation passes. In a loop, that hesitation repeats every 4 bars forever. The loop is an unforgiving mirror." },
        { text: "Record the same Am-to-C loop 3 times at your clean ceiling tempo. Keep the best one. Rate each 1-5.", why: "Consistency at your ceiling is the goal before pushing the ceiling higher. If you get one great loop out of three, your ceiling is right. If all three are great, push the tempo up 5-10 BPM." }
      ],
      feel: "Like a pilot testing at different altitudes — you need to know your current safe ceiling so you can systematically raise it. There's no shame in a 70 BPM ceiling. There's shame in performing at 100 BPM with sloppy changes because you never tested your limits.",
      wrong: "If chord changes are sloppy at 80 BPM, don't push to 100. Master 80 first. A sloppy loop sounds sloppy FOREVER — it repeats every 4 bars for the entire performance. One clean loop at 80 beats ten sloppy loops at 100.",
      sarah: "Gene, the clean ceiling concept is one of the most honest self-assessments in music. Most musicians avoid knowing their limits because it feels deflating. But knowing your ceiling gives you power — you can perform confidently at any tempo below it, and you have a specific target for practice. Your ceiling will rise naturally as your chord transitions get smoother. For your psych-surf-reggae style, 90 BPM is a great target — most of your genre sits right there.",
      metronome: 70,
      levelUp: "Clean internal Am-to-C chord change in a loop at your ceiling tempo, consistently rated 4+ across 3 recordings."
    },
    {
      id: "lo2e6", time: 5, title: "First Loop Rule", type: "looper",
      checklist: true,
      what: "The master clock concept: your first recorded loop sets the tempo AND the length for ALL subsequent tracks on the 505. Every timing error in loop 1 multiplies through everything else. This is the single most important concept in looping — your first loop is the foundation that everything else builds on.",
      setup: "All tracks empty. Rhythm guide at 90 BPM. Quantize: MEASURE.",
      steps: [
        { text: "Record a 4-bar Am fingerpicking loop on Track 1 with maximum precision. This is your foundation. Count yourself in, lock to the click, and press on beat 1 of bar 5.", why: "Track 1 becomes the master clock. Its length defines the cycle that all subsequent tracks follow. If Track 1 is slightly long or short, every other track will feel slightly wrong — the error compounds with each layer." },
        { text: "Without clearing Track 1, record a chord strum on Track 2. Notice how Track 2 automatically matches Track 1's length (with Loop Sync ON).", why: "Loop Sync forces Track 2 to be the same length (or an integer multiple) of Track 1. This means Track 1's timing accuracy determines Track 2's timing feel. A sloppy Track 1 = sloppy everything." },
        { text: "Listen to both tracks together. If Track 1 has even a tiny timing error at the boundary, you'll hear it doubled — once from T1 and once from T2's aligned boundary.", why: "Error multiplication is why the first loop matters more than any other. Two tracks with the same boundary error sound twice as bad. Five tracks with the same error sound five times as bad. Fix it at the source." },
        { text: "Clear everything and re-record Track 1 until it's rated 5/5. Then and only then add Track 2. This discipline — perfect foundation first, layers second — will define your looping quality.", why: "The discipline of nailing your first loop before moving on is what separates polished loopers from messy ones. It feels slow in practice. It saves enormous time in performance because you never have to rebuild from a bad foundation." }
      ],
      feel: "Like laying the foundation of a house — if the foundation is level, every wall and roof sits perfectly. If the foundation is crooked, everything built on top of it is crooked too. And unlike a house, your loop foundation cycles every 4 bars, so a crooked foundation is visible every few seconds.",
      wrong: "If you're rushing to add layers without perfecting Track 1, you're building on sand. Every artifact in Track 1 gets amplified with each new layer. The temptation to 'good enough' your first loop and move on is the #1 source of frustrating performances. Resist it.",
      sarah: "Gene, this is why all our rhythm training matters so much. The first loop rule means that your ability to press a button precisely on beat 1, to fingerpick with steady tempo, to maintain consistent volume — all of that determines the quality ceiling for your entire performance. A perfect first loop makes everything after it easier. A mediocre first loop makes everything after it harder. You've built the skills. Now apply them where they matter most.",
      metronome: 90,
      levelUp: "Can explain the first loop rule to someone else and demonstrate it: record a perfect Track 1, then add Track 2 that sounds seamlessly integrated."
    },
    {
      id: "lo2e7", time: 5, title: "Loop Length Design", type: "looper",
      checklist: true,
      what: "How loop length shapes musical feel. A 2-bar loop repeats quickly and feels hypnotic but can become monotonous. A 4-bar loop has room for chord changes and feels like a song section. An 8-bar loop has space for musical development but is harder to record perfectly. Choose your length deliberately.",
      setup: "Rhythm guide at 90 BPM. Quantize: MEASURE.",
      steps: [
        { text: "Record the Am-C progression as a 2-bar loop: Am for 1 bar, C for 1 bar. Listen to it cycle 8 times.", why: "Short loops repeat frequently, creating a hypnotic, meditative feel. Great for ambient and repetitive genres. But the chord change comes around very quickly — it can feel rushed or monotonous over a full performance." },
        { text: "Record the same Am-C progression as a 4-bar loop: Am for 2 bars, C for 2 bars. Listen to it cycle 8 times.", why: "4 bars is the sweet spot for most popular music. Each chord gets breathing room, the cycle feels like a natural phrase, and there's enough space for vocal melody to develop. This is the default length for most loop performances." },
        { text: "Record the Am-C-G-D progression as an 8-bar loop: 2 bars each chord. Listen to it cycle 4 times.", why: "Longer loops have more harmonic variety — four chords instead of two — and feel more like a complete song section. But they're harder to record perfectly because you have to maintain consistent timing and touch for twice as long." },
        { text: "Compare all three. Which one feels most natural for singing over? Which one feels most like a complete song? For Gene's psych-surf-reggae style, 4 bars is typically the sweet spot.", why: "Loop length is a design choice, not an accident. Knowing how each length changes the feel lets you choose deliberately. Short loops for vamps and grooves. Medium loops for songs. Long loops for through-composed sections." }
      ],
      feel: "Like choosing the canvas size before painting — a small canvas forces compression and density, a large canvas allows sprawl and development. Neither is wrong. The choice serves the music you're making.",
      wrong: "If 8-bar loops consistently have timing errors or lose their groove by bar 6, you're not ready for 8 bars yet. Master 4 bars first. A perfect 4-bar loop is infinitely better than a shaky 8-bar loop. The number of bars is less important than the quality of the loop.",
      sarah: "Gene, 4 bars is your default — it's the length that most of your favorite music lives in. Khruangbin songs are built on 4-bar loops. DOPE LEMON grooves cycle every 4 bars. Skinshape riffs repeat every 4 bars. Learn when to break the rule (2 bars for a hypnotic Tinariwen-style desert vamp, 8 bars for a full verse-length section), but always come back to 4 as your home base.",
      metronome: 90,
      levelUp: "Can record clean loops at 2, 4, and 8 bars and articulate when each length serves the music best."
    },
    {
      id: "lo2e8", time: 8, title: "Vocal Overdub", type: "looper",
      checklist: true,
      what: "Record a vocal harmony INTO the loop for the first time. Unlike singing live over the loop (exercise 1), this commits your voice to the loop — it plays back every cycle. This is a milestone: your voice becomes part of the arrangement, not just the performance layer.",
      setup: "Clean Am fingerpicking loop on Track 1 at 90 BPM. Mic in MIC input, level set at -6dB (knob [1]).",
      steps: [
        { text: "Set mic input level: sing your loudest comfortable note, adjust knob [1] until the mic meter peaks at -6dB. Not red, not barely green — solidly green.", why: "Too hot and your vocal overdub will distort every cycle. Too quiet and it'll be buried under the guitar. -6dB gives you a clean, present vocal that sits well in the mix." },
        { text: "Press Track 1 to enter overdub (AMBER). Sing a sustained root note — 'ooh' on A3 — for the full 4-bar cycle. Hold it steady, on pitch, at consistent volume.", why: "A sustained root note is the simplest vocal overdub. It adds warmth and harmonic foundation without competing with the guitar melody. Your tenor A3 will fill the mid-frequency space that fingerpicking leaves empty." },
        { text: "Exit overdub (press Track 1 again to GREEN). Listen to the combined loop: guitar + vocal. Is the vocal on pitch? Is the volume balanced? Does it enhance or distract?", why: "Vocal loops are unforgiving — pitch issues repeat every cycle. A slightly flat note that's barely noticeable once becomes obviously flat after 8 repetitions. Your ear training from Sarah's lessons is critical here." },
        { text: "If the vocal isn't right, UNDO and re-record. Practice the vocal part 3 times without recording before committing to the overdub.", why: "Rehearsal before recording is a professional habit. Sing the part over the loop 3 times to nail the pitch and timing, THEN press overdub. Saves UNDO cycles and builds confidence." },
        { text: "Listen for guitar bleed in the mic — the mic picks up sound from the guitar body as well as your voice. If the guitar is loud in the vocal overdub, move the mic closer to your mouth and farther from the guitar, or angle it away from the sound hole.", why: "Mic placement is a real-world skill that affects every vocal loop you'll ever record. The closer the mic to your mouth and the farther from the guitar, the cleaner the vocal isolation. This is basic recording engineering, and as a looper, you're the recording engineer." }
      ],
      feel: "The first time your voice plays back as part of the loop — cycling alongside your guitar, integrated into the arrangement — it's a different kind of magic than singing live. Your voice is now INSIDE the music, not on top of it. It's the moment you go from performer to producer.",
      wrong: "If the vocal loop is pitchy, UNDO and try again. Don't leave a pitchy vocal in the loop because it 'took courage to try.' A pitchy vocal that repeats every 4 bars is painful for everyone, including you. If you can't get a clean vocal on pitch, try a lower note — G3 or E3 might sit more comfortably than A3 in your range. If guitar bleed is a problem, try singing louder relative to the guitar (dynamic mic technique) rather than turning up the mic input.",
      sarah: "Gene, your voice entering the loop for the first time is a milestone. It means your guitar isn't doing all the work anymore — your voice is part of the architecture, part of the foundation. Start with that sustained 'ooh' on A — right in your sweet spot. Your tenor sits perfectly in the mid-range gap that guitar fingerpicking doesn't fill. When you hear it cycle back, you'll hear how your voice adds warmth that the guitar alone can't provide. That's YOUR sound starting to form.",
      metronome: 90,
      levelUp: "A clean vocal overdub (on pitch, balanced volume, minimal guitar bleed) that enhances the loop. Rated 4+ after 8 cycles of listening."
    },
    {
      id: "lo2e9", time: 5, title: "Input Level Balancing", type: "looper",
      checklist: true,
      volumeMeter: true,
      what: "505-specific skill: balance MIC input (knob [1]) and INST input (knob [2]) so both signals sit cleanly in the green. When both inputs are active simultaneously, the combined level must not clip. This is real-time mixing at the input stage — a skill most musicians never learn because they never have to.",
      setup: "Guitar in INST 1 and mic in MIC input. Both active. Rhythm guide at 90 BPM.",
      steps: [
        { text: "With only guitar playing (no singing), set knob [2] (instrument input) so the meter peaks at -9dB. This is slightly quieter than your usual -6dB setting.", why: "When two inputs are active, each one needs to be slightly quieter than if it were alone. -9dB per input leaves room for their combined signal to sit at -6dB total. This is additive mixing — the signals sum together." },
        { text: "With only voice (no guitar), set knob [1] (mic input) so the meter peaks at -9dB. Sing at your normal performance volume.", why: "Both inputs at -9dB means their combined output approaches -6dB, which is your target headroom. If either input is set too high, the combined signal clips even though each one looks fine individually." },
        { text: "Now play guitar AND sing simultaneously. Watch the master output meter. Does the combined signal stay in the green? If it hits red, reduce both inputs proportionally.", why: "The combined signal test is the real test. Individual levels can look perfect but sum to distortion. This is the audio equivalent of two speakers in a room who are each at a comfortable volume but together are too loud." },
        { text: "Record a guitar loop on Track 1, then overdub voice on the same track. Listen for balance: can you hear both clearly? If the voice is buried or the guitar is overpowered, adjust the input levels and re-record.", why: "Balanced input levels mean balanced loops. If you record guitar at -3dB and voice at -12dB, the voice will always be buried in the loop. Fix the balance at the input stage, not with the fader after recording." }
      ],
      feel: "Like being a sound engineer running a live console — adjusting two channels to sit together without fighting. It's technical but deeply satisfying when the balance clicks. You'll know it when guitar and voice each have their own space in the mix and neither dominates the other.",
      wrong: "If you set both inputs to -6dB individually, the combined signal will peak around -3dB — dangerously close to clipping. The mistake is testing each input in isolation and assuming the combined level will be the same. Always test inputs together at performance volume. If voice is consistently buried, the mic might need repositioning (closer to mouth) rather than more gain.",
      sarah: "Gene, this is mixing in real time — balancing two sound sources so they sit together cleanly. Most musicians hand this job to a sound engineer and never learn it. As a looper, you ARE the sound engineer, the musician, and the producer, all at once. The good news: once you find your input balance (guitar at X, voice at Y), those settings stay consistent session to session as long as you're using the same mic placement and singing at the same volume. Find it once, remember it always.",
      metronome: 90,
      levelUp: "Both inputs active, combined signal peaks at -6dB, no clipping. Recorded loop with both guitar and voice where each element is clearly audible."
    },
    {
      id: "lo2e10", time: 10, title: "The Minimum Viable Performance", type: "looper",
      checklist: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }],
      what: "Combine everything from this level into one complete performance: record a loop, sing over it, mix with the fader, and end cleanly. Record it on video. This is KT Tunstall on Jools Holland — one loop, one voice, one performance. It doesn't have to be perfect. It has to be finished.",
      setup: "Phone propped up to record video. RC-505mkII ready with guitar and mic. Rhythm guide at 90 BPM. Fresh memory slot.",
      steps: [
        { text: "Start recording video on your phone. The camera changes how you perform — it adds just enough pressure to simulate having an audience.", why: "Recording changes your relationship with the performance. You'll try harder, feel more nervous, and learn what it's like to perform 'for real.' This practice pressure is essential preparation for performing for actual people." },
        { text: "Record a clean Am-C-G-D chord loop on Track 1. Take your time — remember the first loop rule. This foundation determines everything.", why: "Your foundation. Same progression you've practiced in every previous exercise. But now it matters more because everything builds on it. Give yourself a count-in, lock to the click, and nail the boundary." },
        { text: "Sing a full verse and chorus of ILTWYW over the loop. Live, not recorded into the loop. Let your voice ride on top of the guitar accompaniment.", why: "The minimum viable performance is one loop + one voice. No overdubs, no second track, no effects. Just you and your loop. KT Tunstall launched her career with exactly this format — 'Black Horse and the Cherry Tree' on Jools Holland was one loop and one voice." },
        { text: "Adjust the Track 1 fader at least once during the performance — pull it down for the verse (voice forward), push it up for the chorus (fuller sound).", why: "Dynamic fader movement makes it a performance, not just a demo. Even one fader move shows musical intentionality — you're making real-time mixing decisions as a performer. The audience may not notice the fader move, but they'll feel the dynamic shift." },
        { text: "End cleanly: either fade the fader to zero (gentle ending) or press the Track 1 button to stop the loop on beat 1 (decisive ending). Let the last note ring or cut it — either is valid. Do not let the loop keep playing after you stop singing.", why: "A clean ending is as important as a clean start. An abrupt stop or a loop that keeps playing after the performance is over signals 'I don't know how to end this.' Both fade and stop endings work — pick one and commit to it." },
        { text: "Watch the video back. One viewing for overall impression — did it feel like a performance? One viewing for technical details — loop quality, vocal timing, fader move, ending. Rate yourself 1-5.", why: "Self-review is how performers improve between sessions. The video shows you things your memory filters out — facial expressions, timing hesitations, fader fumbles. Watch it honestly, note one thing to improve, and move on." }
      ],
      feel: "This IS a performance. One loop, one voice, one clean ending. It's not a practice session — it's a complete musical moment captured on video. The imperfections are part of the performance. Live music is supposed to breathe, wobble, and surprise. If everything were perfect, it would sound like a recording — and you're not making a recording, you're performing.",
      wrong: "If you keep restarting because it's 'not perfect,' you're missing the point. Record one complete take, imperfections and all. You can record another take after, but the first one must be finished. Perfectionism kills loop performances — the audience wants authenticity and energy, not surgical precision. If the loop goes badly, recover (you practiced this!) and keep going. A recovered performance is more impressive than a restart.",
      sarah: "Gene, this is your first complete loop performance. Take a breath before you start. You have all the skills: clean loops from Level 1, singing over loops from this level, fader moves, clean endings. Now put them together. One take, start to finish. It doesn't matter if your voice cracks on the chorus or the fader move is a beat late. What matters is that you START it and FINISH it. That's the whole game. Every professional looper's first recorded performance was rougher than this one will be. I promise.",
      metronome: 90,
      levelUp: "A recorded performance you'd show a friend. Not perfect — just complete and confident. Video saved for future reference."
    }
  ]
};
