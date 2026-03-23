import { getPitchRange } from "../appData.js";

export const level9 = {
  num: 9, name: "Harmony & Layering", focus: "Self-harmonizing, 3rds/5ths, looper vocal stacking",
  duration: "35 min",
  setup: "Guitar. RC-505mkII optional but ideal. Headphones.",
  subtitle: "Singing With Yourself",
  description: "Elliott Smith sang 3-part harmonies with himself. Bob Marley's backing vocals were as iconic as his leads. Bon Iver builds entire songs from stacked vocal layers. This level teaches you to harmonize with yourself -- the essential skill for looper-based singer-songwriter performance. When you harmonize, the embodiment cycle doubles: you feel one melody in your body while hearing another in your ears, and the harmony interval between them creates a third sensation — a blend that resonates in a way neither voice alone could. The root grounds the chest, the third brightens the mask, and together they create a warmth that fills the whole skull. Your brain has a dual-stream auditory system: one stream tracks the melody you're hearing, the other tracks the melody you're singing. Training both streams to run simultaneously is the neural foundation for all self-harmony.",
  artists: "Bon Iver, Elliott Smith, Bob Marley",
  unlocks: "The Coordination Challenge (Level 10)",
  review: { label: "Level 7 Check-In", time: 5, exercises: ["v7e1", "v7e5"], prompt: "Perform whisper-to-full scale — smooth dynamic gradient (v7e1). Then toggle between breathy and full tone on the same phrase (v7e5). Dynamic control decays without drills." },
  exercises: [
    {
      id: "v9e0", time: 4, title: "Harmony Diagnostic", type: "vocal",
      what: "Can you harmonize with a recording of yourself? This diagnostic reveals your starting point. Most people find it surprisingly hard to sing a different note while hearing their own voice on playback -- your brain desperately wants to match the pitch it hears. This is called pitch interference, and it's the central challenge of self-harmony.",
      setup: "Phone for recording and playback. No guitar. Quiet room. Headphones with one ear on, one ear off.",
      referencePitches: getPitchRange("C3", "G3"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      recorder: true,
      steps: [
        { text: "Record yourself singing a simple 4-bar melody on 'la'. Keep it in the range C3 to G3. Simple, predictable, easy to remember.", why: "You need a melody you know cold. Any uncertainty in the melody will make harmonizing impossible -- your brain can't track two uncertain streams at once." },
        { text: "Play the recording back through one headphone ear. Sing along in unison first -- match your recording exactly.", why: "Unison singing with yourself calibrates your auditory system. Your brain needs to hear 'this is my voice from outside' and 'this is my voice from inside' as the same pitch before it can diverge." },
        { text: "Now try singing a 3rd above the recording. Don't worry about which notes -- just try to stay 'a step and a half above' the melody you hear.", why: "This is the diagnostic moment. If your voice snaps back to the melody every few notes, that's pitch interference -- your auditory cortex is pulling your motor output toward the perceived pitch. It's completely normal." },
        { text: "Notice where you succeed and where you fail. Are the long notes easier to harmonize than the moving ones? Do you lose the harmony when the melody changes direction?", why: "Sustained notes give your brain time to stabilize two streams. Moving notes require real-time parallel processing. Your failure pattern tells you exactly what to train." },
        { text: "Try singing a 3rd BELOW instead. For many people, harmonizing below is easier because the melody stays in your headphone while your voice drops underneath it.", why: "Below-harmonizing keeps the original melody as the 'top voice' in your perception. Your brain naturally tracks the highest pitch as the melody, so singing below feels less like fighting." },
        { text: "Rate yourself honestly: (1) Can't hold a different note at all, (2) Can hold it on sustained notes but lose it when melody moves, (3) Can track moving harmony but it takes intense concentration, (4) Harmony feels natural. Write down your number.", why: "This baseline lets you measure progress. Most guitar-playing singers start at level 2 or 3. By the end of this level, you should be at 4." }
      ],
      feel: "This diagnostic might feel frustrating -- hearing your own voice and trying to sing something different triggers a deep conflict in the auditory system. That conflict IS the thing you're training. Each session makes the two streams more independent.",
      wrong: "If you can't hold any harmony at all, simplify: hold one sustained note (like E3) while your recording plays a melody. Just holding a drone against a melody is the first step toward independent harmony.",
      sarah: "Everyone's brain fights them on this at first. The pitch interference effect is real neuroscience -- your auditory cortex literally tries to pull your voice toward whatever pitch it hears. The only way through is practice, and it happens faster than you'd expect.",
      levelUp: "Can sustain a harmony a 3rd above your recorded melody for at least 4 bars, with no more than 2 pitch-match slip-ups."
    },
    {
      id: "v9e1", time: 4, title: "Singing in 3rds", type: "vocal",
      pitchContour: true,
      what: "The most common harmony interval. Sing a melody, then sing the same melody a 3rd above. Elliott Smith and Bob Marley both relied on 3rd harmonies as their primary vocal layering tool. A diatonic 3rd follows the key signature, so sometimes it's a major 3rd (4 half steps) and sometimes a minor 3rd (3 half steps) -- your ear learns to feel which is right.",
      setup: "Guitar: C major scale reference. No backing track.",
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      recorder: true,
      steps: [
        { text: "Sing a simple melody: C-D-E-F-G (ascending major scale fragment). Sing it three times until it's completely automatic.", why: "Start with the simplest possible melody. You need to know it cold before adding harmony. The melody must live in procedural memory so your conscious attention can focus on the harmony." },
        { text: "Now sing a 3rd above each note: E-F-G-A-B. Same rhythm, same shape, 3 scale steps higher.", why: "A 3rd above follows the same contour but higher. Notice that C to E is a major 3rd (4 half steps) but D to F is a minor 3rd (3 half steps). You don't need to know the theory -- your ear adjusts automatically when you stay in the key." },
        { text: "Play C on guitar and sing both lines alternating: melody line, then harmony line. Check each harmony note against the guitar to make sure you're in key.", why: "The guitar serves as a tuning reference. If a harmony note sounds wrong, play it on the guitar to find the right diatonic 3rd." },
        { text: "Record the melody on your phone. Play it back and sing the harmony live over it.", why: "Hearing your melody while singing the harmony is the core skill. This simulates what a looper does. The dual-stream auditory processing kicks in here -- your brain tracks the playback melody in one stream and your live harmony in the other." },
        { text: "Try it on a real melody from ILTWYW or Sol Del Sur. Find the 3rd above the vocal line.", why: "Real melodies have more complex intervals. The 3rd harmony won't always be obvious -- some notes will want to go to a 4th or a 2nd depending on the chord underneath." },
        { text: "Sing the melody and harmony back to back without the recording -- from memory. Can you hold the harmony line in your head independently?", why: "Memorizing the harmony as its own melody (not just 'a 3rd above') builds independent melodic memory. Eventually, both lines should feel like separate songs you know." }
      ],
      feel: "When the 3rd harmony locks in, you'll hear a sweetness -- a fullness that neither voice alone has. It should sound like one voice with two layers, not two separate people singing.",
      wrong: "If the harmony sounds dissonant on certain notes, you might be singing a strict 3rd (always 4 half steps) instead of a diatonic 3rd (following the key). Stay in the key. If the note sounds wrong, adjust by a half step -- your ear will tell you which direction.",
      levelUp: "Sing a harmony a 3rd above a playback of your own melody through an entire verse, staying in key on every note."
    },
    {
      id: "v9e2", time: 4, title: "Singing in 5ths", type: "vocal",
      pitchContour: true,
      what: "Power harmony. Open, resonant, and less common than 3rds but iconic when used. 5ths create a hollow, powerful sound that works especially well in psych and folk music. Tinariwen's desert blues vocals often move in parallel 5ths -- it's the sound of wide open spaces.",
      setup: "Guitar: Am chord reference.",
      referencePitches: getPitchRange("A2", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      recorder: true,
      steps: [
        { text: "Sing A3. Now sing E4 (a 5th above). Feel how open and powerful the interval sounds. Sustain both notes for 4 seconds each.", why: "The 5th is the most consonant interval after the octave. It sounds ancient and strong because the frequency ratio is 3:2 -- the simplest ratio after 2:1 (the octave). Your brain processes it as deeply stable." },
        { text: "Play Am on guitar and sing the root (A3), then the 5th (E4). Now play C and sing C3, then G3. Play G and sing G3, then D4. 5th above each root.", why: "Practicing the 5th above each chord root trains your ear to find 5ths in any harmonic context. The interval 'shape' stays the same even as the pitch changes." },
        { text: "Sing a simple Am melody. Record it. Play back and try singing a 5th above.", why: "5th harmonies follow the same contour but create a very different feel than 3rds. The openness can sound medieval, powerful, or vast depending on context." },
        { text: "Compare: play back your melody and sing 3rds, then 5ths. Notice the different emotional quality.", why: "3rds are sweet and close -- they fill in the chord. 5ths are open and powerful -- they create space. Knowing both gives you emotional options that most singer-songwriters don't have." },
        { text: "Try a descending melody with 5th harmony. Start on E4 (melody) with B4 (harmony, if in range) or E3 with B3. Descend stepwise.", why: "Descending 5ths have a gravity to them -- like watching the sun set. The interval pulls downward with weight and dignity." },
        { text: "Try alternating: 3rds on the verse, 5ths on the chorus. Record both sections and listen back.", why: "This is a common arrangement technique. The 5ths give the chorus more power and width. Many great songs use close harmony (3rds) for intimacy in verses and open harmony (5ths) for impact in choruses." }
      ],
      feel: "5ths should feel like standing at the edge of a canyon. Big, open, resonant. Less intimate than 3rds, more epic. When you sustain a 5th interval, it should ring like a bell.",
      wrong: "If 5ths sound too hollow or empty, they might not suit the song. 5ths work best on sustained notes and simple melodies. Complex, fast-moving melodies usually want 3rds because 5ths can sound clunky when they move quickly.",
      levelUp: "Sing a 5th harmony over your recorded melody for a full verse, staying in key throughout."
    },
    {
      id: "v9e3", time: 4, title: "Minor vs. Major 3rd: Emotional Color", type: "vocal",
      pitchContour: true,
      what: "A major 3rd (4 half steps) sounds bright and resolved. A minor 3rd (3 half steps) sounds dark and yearning. Learning to choose between them gives you emotional control over your harmonies. DOPE LEMON uses minor 3rds for that hazy, melancholic vibe. Jack Johnson leans on major 3rds for brightness.",
      setup: "Guitar: C chord and Am chord for reference. Phone for recording.",
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      recorder: true,
      steps: [
        { text: "Play a C chord. Sing C3 and E3 together (or back to back). That's a major 3rd -- 4 half steps. Feel the brightness.", why: "The major 3rd is the interval that defines a major chord's character. It sounds resolved, happy, and complete. Your brain encodes it as 'safe landing.'" },
        { text: "Now play Am. Sing A3 and C4. That's a minor 3rd -- 3 half steps. Feel how the mood shifts to something more complex, more emotional.", why: "The minor 3rd is the sound of longing. One half step less than a major 3rd, but emotionally it's a completely different world. Most psych-surf and reggae songs live in minor keys, making this the more useful interval for your style." },
        { text: "Sing a simple melody on C major. Harmonize with major 3rds. Then play the same melody shape starting on A minor. Harmonize with minor 3rds. Compare the recordings.", why: "Hearing the same melodic shape with different 3rd qualities reveals how much the harmony color controls the emotional message. Same notes, different feel." },
        { text: "Try mixing: major 3rd on the first two bars, minor 3rd on the last two. Record it. This creates an emotional arc within the harmony itself.", why: "Mixed-quality harmonies create movement and tension. The shift from major to minor 3rd feels like a cloud passing over the sun. Elliott Smith did this constantly -- his harmonies shift color within a single phrase." },
        { text: "Sing a verse from ILTWYW or Sol Del Sur. Try harmonizing with all major 3rds, then all minor 3rds, then mixing them based on what feels right for each phrase.", why: "The 'right' 3rd quality depends on the chord underneath. Over a major chord, the diatonic 3rd will often be major. Over a minor chord, it will be minor. But sometimes breaking that rule creates beautiful tension." },
        { text: "Close your eyes and sing the melody from memory. Let your ear choose the harmony quality without thinking about theory. Record this 'intuitive' version.", why: "Your ear already knows more theory than you think. After practicing both qualities consciously, your subconscious processing (in the superior temporal gyrus) will start choosing the right 3rd quality automatically. Trust it." }
      ],
      feel: "Major 3rds should feel like sunlight. Minor 3rds should feel like moonlight. Both are beautiful, and knowing the difference gives you a painter's control over the emotional palette of your harmonies.",
      wrong: "If you can't hear the difference between major and minor 3rds, play them on guitar first: C-E (major) vs C-Eb (minor). Once you hear the difference on guitar, you'll start hearing it in your voice.",
      sarah: "This is one of those things that sounds like music theory but is actually just ear training in disguise. You don't need to count half steps -- you need to feel the difference between bright and dark. Your ear already knows. We're just making it conscious.",
      levelUp: "Can intentionally choose major or minor 3rd harmony over a melody, and a listener can hear the emotional difference between versions."
    },
    {
      id: "v9e4", time: 4, title: "Self-Harmony: Record & Stack", type: "vocal",
      pitchContour: true,
      volumeMeter: true,
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "Record a melody on your phone, play it back, and sing harmony live over it. This is the analog version of looper vocal stacking -- training the skill before involving technology. The pitch interference effect will fight you at first: your brain hears your own voice and tries to match it instead of harmonize.",
      setup: "Phone for recording and playback. Headphones recommended -- one ear on playback, one ear open for your live voice.",
      steps: [
        { text: "Record yourself singing a verse melody. Simple, clean, in tune. This is your foundation layer.", why: "This layer needs to be consistent because you'll be harmonizing over it. Any pitch wobble in the foundation will make the harmony sound wrong even if you're singing the right notes." },
        { text: "Play it back through a speaker or one headphone ear. Sing along in unison for one full pass. Get used to the sound of your recorded voice while you sing.", why: "Unison first calibrates your brain to the dual-stream situation. The playback stream and your live stream need to be perceptually separated before you can put different notes in them." },
        { text: "Now play it back again and sing a 3rd harmony over it. Start with just the first phrase -- don't try the whole verse yet.", why: "One phrase at a time lets your working memory focus. The dual-stream processing is cognitively expensive at first -- it gets cheaper with practice as the neural pathways strengthen." },
        { text: "If the 3rd works on the first phrase, extend to two phrases, then three. Build the harmony phrase by phrase.", why: "Progressive extension is how the brain learns complex motor sequences. Each successful repetition consolidates the neural pathway before adding more complexity." },
        { text: "When you can do the full verse in 3rds, try recording THAT harmony and playing both back while singing a 5th.", why: "Three voices: melody, 3rd, 5th. This is the Bon Iver / Elliott Smith sound. Three stacked voices create a full harmonic texture from one person." },
        { text: "Experiment with dynamics: melody loud, harmony quiet. Then try harmony louder than melody. Then try both at the same volume. Record each version and compare.", why: "Harmony balance changes the feel dramatically. Usually the melody leads, but some songs sound magical when the harmony is louder -- it creates a dreamy, underwater quality. DOPE LEMON does this constantly." }
      ],
      feel: "When all the voices align, it should feel like a choir in your head. The harmonies should feel like they were always meant to be there -- like uncovering something hidden in the melody.",
      wrong: "If the harmony drifts out of tune, focus on the problem notes. Often it's one or two intervals that need adjustment, not the whole line. If your voice keeps snapping back to the melody, you're experiencing pitch interference -- this is normal and fades with practice.",
      levelUp: "Clean 2-voice self-harmony (melody + 3rd) through a complete verse, recorded and listenable."
    },
    {
      id: "v9e5", time: 4, title: "Harmony by Ear", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("E3", "A4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "Find the harmony without knowing the interval. Trust your ear. This is the most musical approach to harmony -- instead of calculating 'a 3rd above,' you listen for the note that sounds right. Your auditory cortex does the math unconsciously, and it's faster and more accurate than conscious calculation.",
      setup: "Phone with a recording of yourself singing a melody. Guitar for checking. Headphones recommended.",
      steps: [
        { text: "Play back a recorded melody. Don't think about intervals. Just listen and sing whatever harmony 'sounds right' to you. It might be a 3rd, a 5th, a 6th, or something else entirely.", why: "Your auditory system has been absorbing harmony rules since birth. Every song you've ever heard trained your brain's harmony model. Trusting that model is more musical than calculating intervals." },
        { text: "Record your intuitive harmony. Play it back against the melody. Does it sound good? If yes, check with the guitar: what interval did you actually sing?", why: "Knowing what your ear naturally gravitates toward tells you about your harmonic instincts. Some people naturally hear 3rds. Some hear 6ths. Some mix intervals. There's no wrong answer." },
        { text: "Try a different section of the melody. Again, don't calculate -- just sing what sounds right. Notice: does your ear choose the same interval throughout, or does it change?", why: "The best harmonies are NOT parallel (same interval throughout). They move to whatever note sounds best for each moment. This is called oblique or contrary motion, and it's what makes professional harmonies sound alive." },
        { text: "Play the melody through a third time. This time, consciously try to sing a harmony that MOVES DIFFERENTLY from the melody. When the melody goes up, try going down or staying put.", why: "Contrary motion (voices moving in opposite directions) creates the most independent-sounding harmony. It's harder than parallel motion but sounds much more interesting. Think Simon & Garfunkel." },
        { text: "Compare your three versions: (1) intuitive first try, (2) intuitive second section, (3) contrary motion attempt. Which sounds best? Often the first intuitive attempt wins.", why: "Your first instinct is usually the most musical because it comes from the trained pattern-matching system in the temporal lobe, not from the slower, more error-prone conscious calculation system in the prefrontal cortex." },
        { text: "Final exercise: play the melody and improvise harmony freely, changing interval and contour as you go. Let your ear lead completely. Record the whole thing.", why: "Free-form harmony improvisation is the end goal of this exercise. When you can follow a melody with a complementary second voice without thinking, you've developed genuine harmony instinct." }
      ],
      feel: "This should feel like having a conversation with yourself. The melody says something and your harmony responds. Sometimes it agrees (parallel motion), sometimes it pushes back (contrary motion), sometimes it holds still while the melody moves.",
      wrong: "If every harmony you sing is exactly parallel (same interval throughout), you're calculating instead of listening. Close your eyes, forget about intervals, and sing the note that FEELS right. It will change from moment to moment.",
      sarah: "Ear-based harmony is the real skill. Knowing theory helps you understand what you did after the fact, but the singing has to come from the ear, not the brain. The best harmonists in history didn't think about intervals -- they just heard the note.",
      levelUp: "Can improvise a harmony part over a recorded melody that includes at least two different interval types, with all choices sounding musical."
    },
    {
      id: "v9e6", time: 4, title: "Harmony in Motion", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "Moving harmony lines that don't just follow the melody in parallel. Oblique motion (one voice holds while the other moves), contrary motion (voices move in opposite directions), and independent lines. This is what separates basic harmony from professional harmony -- the voices are individuals, not clones.",
      setup: "Phone with recorded melody. Guitar for checking. Headphones.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Record a simple 4-chord melody over the Khruangbin backing track. Am-C-G-D, one phrase per chord.", why: "The Khruangbin groove creates space for layered vocals. The sparse, dubby arrangement leaves room for harmony experiments." },
        { text: "Play it back. Sing a harmony that HOLDS ONE NOTE while the melody moves. Just pick a note (like E3) and sustain it through the first two chords while the melody moves around it.", why: "This is oblique motion -- one voice is a pedal tone while the other moves. It creates tension and release because the harmony is sometimes consonant and sometimes dissonant with the melody." },
        { text: "Now try contrary motion: when the melody goes up, you go down. When it descends, you ascend. Start with small steps -- one note up when melody goes one note down.", why: "Contrary motion is the most challenging but most beautiful type of two-voice writing. The voices diverge and converge like two birds circling each other. Bach built his entire career on this principle." },
        { text: "Try independent rhythm: melody sings quarter notes, your harmony sings half notes. Or vice versa. Different rhythms in each voice add complexity.", why: "Rhythmic independence adds a whole new dimension to harmony. When the voices have different rhythms, they create a composite pattern that's more complex than either alone. This is how Bob Marley's backing vocals worked -- rhythmically offset from the lead." },
        { text: "Combine: start with oblique motion, shift to parallel 3rds, then move to contrary motion. Each section of the melody gets a different harmony approach.", why: "Varying the harmony type across a song creates arrangement dynamics without any instruments. The harmony becomes an arrangement tool, not just a pitch-tracking exercise." },
        { text: "Record your best version. Listen back and identify: which moments sound like two independent voices, and which sound like one voice doubled? The independent moments are the goal.", why: "Two-voice independence is what makes self-harmony sound professional rather than karaoke-like. When both voices have their own melodic identity, the result sounds like a duo, not a single singer with a shadow." },
        { text: "Final pass: sing the harmony from memory without the playback. Can you remember the harmony line as its own melody? If yes, it's become truly independent.", why: "When you can sing the harmony as a standalone melody, it has its own identity in your memory. This is the neural signature of true two-voice independence -- both melodies live in separate memory traces." }
      ],
      feel: "Moving harmony should feel like a dance -- two partners who know each other's moves but are each doing their own thing. The interplay between voices should surprise you, even though you're creating both parts.",
      wrong: "If your harmony always moves in the same direction as the melody, you're stuck in parallel thinking. Try the opposite: force yourself to go down when the melody goes up, even if it sounds weird at first. Your ear will adjust.",
      sarah: "This is where harmony gets really creative. Parallel 3rds are beautiful, but they're just the starting point. When your voices move independently, you become a one-person choir with actual musical depth.",
      metronome: 80,
      levelUp: "Record a self-harmony that includes at least one section of contrary motion and one section of oblique motion, both sounding musical."
    },
    {
      id: "v9e7", time: 3, title: "Phone to DAW Bridge", type: "record",
      what: "Record a vocal take on your phone, then listen back critically. Write down: pitch issues, timing issues, tone issues. This is the self-assessment skill needed for harmony work -- you need to hear your own voice objectively, which means overcoming the brain's natural 'I sound weird on recordings' bias.",
      setup: "Phone with voice memo app. Pen and paper for notes. A song or exercise you know well.",
      steps: [
        { text: "Record yourself singing a full verse with harmony (melody first, then harmony over playback). Don't overthink it -- sing naturally.", why: "The recording needs to be representative of your real singing, not a hyper-focused 'best attempt'. Natural performance reveals the real issues." },
        { text: "Play it back. First listen: just notice your overall reaction. Do you like what you hear? Where do you wince?", why: "Your gut reaction is honest. The wince points are exactly where improvement will have the most impact. The anterior cingulate cortex -- your brain's error detector -- fires at these moments. Trust it." },
        { text: "Second listen with pen and paper. Write down specific issues: 'harmony goes sharp on the E3 in bar 2', 'harmony lags behind melody on the third phrase', 'blend gets thin on high notes'.", why: "Vague notes like 'sounds bad' don't help. Specific notes like 'flat on the word golden' give you actionable targets. Precision in self-assessment is what separates amateur from professional practice." },
        { text: "Categorize your notes: PITCH issues, TIMING issues, BLEND issues. Which category has the most entries?", why: "The dominant category tells you what to focus on. Pitch issues need more ear training. Timing issues need more rhythm work. Blend issues need dynamics and vowel matching." },
        { text: "Pick the number one issue from your notes. Sing the section again focusing only on that one thing. Record and compare.", why: "Targeted re-recording with a single focus is the fastest path to improvement. Trying to fix everything at once fixes nothing -- the brain can only modify one motor program at a time." },
        { text: "Compare your first and second recordings of the problem section side by side. Can you hear the improvement? If yes, move to the next issue. If no, the problem might require more fundamental work from earlier levels.", why: "Audible improvement between takes is your evidence that the practice is working. If a problem persists across multiple focused attempts, it usually means a prerequisite skill needs strengthening." }
      ],
      feel: "Like being your own vocal coach. The pen-and-paper review transforms passive listening into active analysis. You're building the critical ear that every good singer needs.",
      wrong: "If you can't hear any issues in your recording, you're not listening critically enough. Try listening at half volume -- imperfections become more obvious when the sound is quieter. If everything sounds terrible, you're being too harsh -- focus on what IS working, then identify one thing to improve.",
      sarah: "The ability to self-assess from a recording is the single most important skill for independent practice. A voice teacher isn't always in the room -- your recorded self has to be your teacher. And for harmony work specifically, the recording reveals blend issues that you can't hear while singing.",
      recorder: true,
      levelUp: "Written self-assessment of a recorded harmony take with at least 3 specific, actionable notes across pitch, timing, and blend."
    },
    {
      id: "v9e8", time: 4, title: "Looper Vocal Stack: Two Voices", type: "vocal",
      volumeMeter: true,
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "RC-505: melody on Track 1, harmony on Track 2. This is the technology-assisted version of self-harmony -- building the looper skill for live performance. The looper adds a new challenge: your harmony must be locked in time AND pitch, because the loop is unforgiving. Every tiny error repeats forever.",
      setup: "RC-505mkII. Mic connected. Quantize: MEASURE. 80 BPM. Headphones essential -- you need to hear the loop cleanly while singing the harmony.",
      metronome: 80,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Start the Deep Soul Groove backing track at 80 BPM. Set the RC-505 to sync. Record 4 bars of your melody on Track 1. Simple, in your sweet spot around E3 to A3. Let it loop.", why: "The melody loop is your foundation. It needs to be clean and in time. At 80 BPM with quantize on, the loop will snap to the beat -- but your performance within the loop still needs to be solid." },
        { text: "Listen to your melody loop for 2 full cycles before recording the harmony. Get used to the sound. Plan your harmony -- where will you sing 3rds? 5ths? Will you use any contrary motion?", why: "Planning the harmony before recording prevents the 'I'll figure it out as I go' trap. On a looper, hesitation is audible. You get one shot per track, so knowing your harmony before you record it saves time and frustration." },
        { text: "While Track 1 plays, record your 3rd harmony on Track 2. Breathe where the melody breathes. Match the phrasing exactly.", why: "Singing harmony while hearing your own melody played back is the core looper vocal skill. The phrasing match is crucial -- if the harmony starts or ends at different times than the melody, the blend falls apart." },
        { text: "Balance the two tracks with faders. Melody slightly louder than harmony. Listen for 4 cycles. Does the blend work?", why: "Standard vocal mix: lead vocal forward, harmony supporting. Fader control is part of the performance -- in a live looper set, you adjust levels between sections." },
        { text: "If the harmony sounds good, try muting and unmuting Track 2 at different points. Harmony in on the chorus, off on the verse -- this is how you arrange live.", why: "Track muting is the looper performer's arrangement tool. Bon Iver builds entire songs by layering and muting tracks. Learning when to add and remove harmony is as important as singing the harmony." },
        { text: "Listen to both together for 4-8 cycles. In tune? In time? Blend working? If not, clear Track 2 and try again. Good looper performance requires quick judgment and willingness to redo.", why: "Looper performance requires quick judgment: is this take good enough? If not, redo it fast. Professional looper performers clear and re-record without missing a beat. Speed of judgment is a skill." },
        { text: "When satisfied, record the full 2-voice stack playing back for 30 seconds on your phone. This is your reference for how 2-voice looper harmony should sound.", why: "A reference recording of your best 2-voice stack gives you a target to match in future sessions. Progress in looper performance is easiest to track through comparison recordings." }
      ],
      feel: "Hearing two versions of your voice harmonizing in real time is powerful. It should feel like you've doubled yourself -- like there are two of you in the room, locked in musical conversation.",
      wrong: "If the harmony track drifts out of time, your loop timing may be off. Focus on pressing record on beat 1 and stopping on beat 1. If the harmony is in time but out of tune, the problem is pitch, not looper technique -- go back to the ear-based exercises.",
      levelUp: "Clean 2-voice looper stack that plays back seamlessly for 8+ cycles with good blend and balance."
    },
    {
      id: "v9e9", time: 4, title: "Looper Vocal Stack: Three Voices", type: "vocal",
      volumeMeter: true,
      recorder: true,
      referencePitches: getPitchRange("C3", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "Bass (root) + melody + high harmony. The Bon Iver live setup. Three vocal layers create a full arrangement from your voice alone. This is where self-harmony becomes self-arranging -- you're building a complete harmonic texture with no instruments required.",
      setup: "RC-505mkII. 3 tracks available. 80 BPM. Headphones essential.",
      metronome: 80,
      tracks: [{ name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }],
      steps: [
        { text: "Track 1: Record a bass vocal -- root notes of the progression in low chest voice. Am = A2, C = C3, G = G2, D = D3. Long, sustained tones. This is the floor of your arrangement.", why: "The bass layer anchors everything harmonically. It's the foundation from earlier 'Sing the Bass Line' exercises. Low chest voice creates warmth and depth that defines the harmonic space." },
        { text: "Track 2: Record your melody over the bass loop. Keep it in your sweet spot, E3 to A3. The melody should feel completely natural and easy -- no strain.", why: "Melody over bass is the minimum viable arrangement. Listen: does it already sound like a song? The two voices create a harmonic frame that implies the full chord even without the middle voice." },
        { text: "Track 3: Record a high harmony (3rd or 5th above the melody). This is the hardest layer because you're now hearing TWO voices while trying to sing a THIRD.", why: "Three-stream auditory processing is exponentially harder than two-stream. Your brain must track: (1) the bass loop, (2) the melody loop, (3) your live harmony. This is peak dual-stream processing -- actually triple-stream. It's a workout for the superior temporal gyrus." },
        { text: "Balance all three with faders: bass at 60%, melody at 80%, harmony at 50%. Adjust to taste.", why: "Three voices need careful mixing. The melody should lead, bass should be felt more than heard, and the harmony adds shimmer on top. These percentages are starting points -- trust your ears." },
        { text: "Experiment with arrangement: mute the harmony for verses, bring it in for choruses. Mute the bass for a breakdown, bring everything back for the final section.", why: "Arrangement through muting and unmuting is the looper performer's superpower. The dynamics of adding and removing voices creates the same emotional arc as a full band -- quiet verse, full chorus, stripped-down bridge." },
        { text: "Try adding a rhythmic vocal layer on a fourth track: a beatbox pattern, a shaker sound with your mouth, or percussive syllables. Even a simple 'ch-ch' on beats 2 and 4.", why: "Adding rhythm transforms a harmony stack into a complete arrangement. Bob Marley's backing vocals often provided rhythm as well as harmony. The human voice can be percussion, bass, melody, and harmony simultaneously." },
        { text: "Record the best 3-voice (or 4-voice) playback on your phone for 1 minute. Compare it to your 2-voice reference from v9e8. Hear the difference that the third voice makes.", why: "The jump from 2 voices to 3 voices is dramatic. Two voices suggest the chord; three voices complete it. This comparison recording documents your growing arrangement skill." }
      ],
      feel: "Three voices from one person should sound like a small choir or a band. The fullness is surprising -- your voice fills the entire harmonic space. Bass grounds it, melody carries it, harmony lifts it.",
      wrong: "If it sounds like a mess, one of the layers is out of tune or out of time. Mute tracks one at a time to find the problem. Fix that one layer. Don't re-record everything -- isolate and fix.",
      levelUp: "Clean 3-voice looper stack: bass + melody + harmony, balanced, in tune, and arranged with at least one mute/unmute transition."
    },
    {
      id: "v9e10", time: 3, title: "Vocal Pad Technique", type: "vocal",
      drone: { root: "A", octave: 2, texture: "choir" },
      recorder: true,
      referencePitches: getPitchRange("A2", "E4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "Sustaining a chord with your voice and looper -- creating a vocal pad that sits underneath your lead singing. This is the ambient, atmospheric application of self-harmony. Think Bon Iver's 'Woods' or Imogen Heap's 'Hide and Seek'. The voices become an instrument, not a melody.",
      setup: "RC-505mkII. Headphones. No backing track -- voice only. 70 BPM or free time.",
      steps: [
        { text: "Record a sustained A2 on Track 1. Just the note, no melody. Hold it for 4 bars, let it loop. Use your deepest, warmest chest voice.", why: "The bass pad note is the harmonic foundation. A sustained low note creates a drone that everything else sits on top of. This is the same principle as the Indian tanpura or Australian didgeridoo." },
        { text: "On Track 2, record a sustained E3 over the A2 loop. A perfect 5th above the root. Let both notes ring together.", why: "Root + 5th creates an open, stable sound. It's the most consonant pairing possible and forms the foundation of most chord voicings. The two notes should blend so well they almost sound like one rich tone." },
        { text: "On Track 3, record a sustained C3 over the A2 and E3 loop. Root + minor 3rd + 5th = an Am chord, built entirely from your voice.", why: "You've just built a chord with three layers of your own voice. This is the vocal pad -- a sustained harmonic texture that you can sing melodies over." },
        { text: "Now sing a melody OVER the vocal pad. Don't record it on the looper -- sing it live. The pad provides the harmony; your live voice provides the melody.", why: "Singing over your own vocal pad is the most atmospheric form of self-harmony. The pad creates an ambient bed, and your melody floats on top. This is the sound of Bon Iver's live performances." },
        { text: "Try different pad chords: C major (C-E-G), G major (G-B-D), Em (E-G-B). Each pad color changes the entire emotional landscape for your live melody.", why: "Changing the pad chord underneath the same melody changes everything about how the melody feels. This is harmonic context in its purest form -- same notes, different emotional meaning." },
        { text: "Experiment with vowel sounds on the pad voices. 'Ooh' creates warmth. 'Ah' creates openness. 'Ee' creates brightness. Mix vowels across the three voices.", why: "The vowel sound of a sustained voice determines its tonal color. Professional choral arrangers specify vowels as carefully as notes. 'Ooh' on the bass, 'ah' on the middle, 'ee' on top creates a full spectral spread." }
      ],
      feel: "The vocal pad should feel like an environment, not a performance. You're creating a sonic space to inhabit — three layers of YOUR body's vibration, stacked into a living chord. The root sits in your chest memory, the fifth opens the space, and the third colors everything. When you sing a melody over it, you should feel like you're singing inside a cathedral built from your own voice. The embodiment cycle runs in a new way here: you feel the harmony not just in your current singing but in the resonance between your live voice and your recorded voices — a conversation between past and present bodies.",
      wrong: "If the pad sounds wobbly or unstable, your sustained notes need to be steadier. Practice holding a single pitch for 8 bars without pitch drift. If the pad sounds thin, check your fader balance -- the bass note needs to be present but not overwhelming.",
      sarah: "Vocal pads are the bridge between singing and sound design. You're using your voice as a synthesizer, building textures and atmospheres. This is a skill that most singer-songwriters never develop, but it transforms live looper performance from 'person with a loop pedal' to 'one-person sound world.'",
      levelUp: "Build a clean 3-voice vocal pad (root + 3rd + 5th) and sing an improvised melody over it for 30 seconds that sounds musical and cohesive."
    },
    {
      id: "v9e11", time: 4, title: "Full Harmonized Arrangement", type: "vocal",
      recorder: true,
      referencePitches: getPitchRange("A2", "A4"),
      pianoKeys: { notes: ["A3", "C4", "E4", "G4"], label: "Harmony", range: ["A3", "G4"] },
      what: "The integration exercise. Take a real song from your repertoire and build a full harmonized arrangement: bass, melody, harmony, and optional rhythm. This is the practical application of everything in Level 9 -- self-harmony as an arrangement and performance tool.",
      setup: "RC-505mkII. All tracks available. Guitar optional. Headphones. Choose ILTWYW or Sol Del Sur or any song you know well.",
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }, { name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "Choose a song and plan your arrangement before recording anything. Write down: verse = melody only. Pre-chorus = add bass. Chorus = add harmony. Bridge = vocal pad. Outro = all voices.", why: "Planning the arrangement is as important as singing it. A great arrangement has dynamics -- it doesn't start at maximum density. The gradual addition of voices creates the emotional arc of the song." },
        { text: "Record Track 1: the melody. The most important layer. It needs to be your best vocal take -- clean pitch, good timing, emotional delivery.", why: "Everything else supports the melody. If the melody is weak, no amount of harmony will save it. Take your time. Re-record if needed. This is the foundation." },
        { text: "Record Track 2: the bass line. Root notes of each chord, sustained in your low chest voice. Simple and steady.", why: "The bass provides harmonic context for everything above it. Simple bass notes let the melody and harmony do the expressive work." },
        { text: "Record Track 3: harmony. Use your best judgment -- 3rds where you want sweetness, 5ths where you want power, contrary motion where you want independence. Mix harmony types based on what each phrase needs.", why: "A great harmony part is not one interval throughout. It adapts to the melody and the emotional needs of each phrase. This is where all the ear training from this level comes together." },
        { text: "Set up your mute/unmute arrangement. Practice the transitions: mute harmony for verse, unmute for chorus. Bring the bass in at the pre-chorus. Build the arrangement dynamically.", why: "The mute/unmute pattern IS your arrangement. In a live performance, these transitions need to be smooth and musical. Practice them like you practice chord changes -- timing matters." },
        { text: "Perform the complete arrangement from top to bottom. Record the full performance (looper output + live singing) on your phone.", why: "The complete run-through is the integration test. Does the arrangement serve the song? Does it build emotionally? Does it sound like a complete performance, not a technical exercise?" },
        { text: "Listen back critically. Compare it to the original song. Where does your arrangement add something? Where does it clutter? Sometimes less is more -- consider cutting a layer if it doesn't serve the song.", why: "Critical listening after the performance reveals what's working and what isn't. The best arrangements often have moments of silence -- pulling voices OUT is as powerful as adding them." },
        { text: "Perform it one more time with any adjustments. This second performance should feel more confident, more musical, more like a real performance.", why: "The second pass benefits from all the learning of the first. Arrangement decisions are clearer, harmony choices are more intentional, and the overall performance has the confidence that comes from having done it once already." }
      ],
      feel: "This should feel like a complete musical performance. When it works, a single person singing into a looper should sound like a full vocal group performing a polished arrangement.",
      wrong: "If the arrangement sounds cluttered, you've probably added too many voices too early. The most common mistake is going to full density in the first verse. Hold back. Let the song breathe. The fullest moment should be the final chorus.",
      sarah: "This is the payoff for all the work in Level 9. You're not just harmonizing -- you're arranging, performing, and producing, all in real time. This is what separates a singer with a looper from a looper-based artist.",
      levelUp: "Complete a full harmonized arrangement of a real song with at least 3 vocal layers, dynamic muting, and an emotional arc from sparse to full."
    }
  ]
};
