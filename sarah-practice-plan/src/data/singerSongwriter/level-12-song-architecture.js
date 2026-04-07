import { getPitchRange } from "../appData.js";

export const level12 = {
  level: 12,
  title: "Song Architecture",
  subtitle: "Verses tell stories. Choruses tell truths.",
  description:
    "You can create melodies and feel harmony. Now build complete songs with intentional structure — verse/chorus/bridge, dynamic arcs, intros and outros. Based on Berklee's songwriting sequence: melody and structure are taught together because they're inseparable. A great melody in a bad structure is a wasted melody. Embodied truth: song sections have body arcs. The verse sits in the chest — grounded, storytelling, conversational. The chorus rises to the mask — open, projecting, communal. The bridge might go to the head — intimate, vulnerable, unexpected. Your body tells you when the form needs to shift: there's a physical sensation of needing to rise or ground, and that sensation IS your structural instinct.",
  artists: "DOPE LEMON, Nick Drake, Skinshape, BALTHVS",
  unlocks: "Lyrics & Songcraft (Level 12)",
  review: { label: "Level 10-11 Check-In", time: 5, exercises: ["ss-10-7", "ss-11-6"], prompt: "Play your complete original (ss-10-7). Then improvise over a new progression for 2 minutes (ss-11-6). Both confident? Move on." },
  exercises: [
    {
      id: "ss-12-1",
      time: 8,
      title: "Verse Craft",
      type: "song",
      what: "Write two different verses for the same song. Same chord progression, same melody shape — but different enough to keep the listener engaged. Verses tell the story; each one reveals new information while maintaining familiarity.",
      steps: [
        { text: "Pick a chord progression and create a verse melody in your lower range. Feel it settle into your chest — the verse lives behind the sternum, grounded, intimate. Sing it with 'la' to establish the shape. Before each phrase, hear it forming and feel which body station it wants to occupy. The verse melody should feel like warm breath in the chest.", why: "The verse melody is the narrative vehicle. It sits low and intimate in the chest's deepest body addresses — the resonance of honest conversation. When the verse melody maps to the lower body stations, the lyrics carry the physical warmth of the body behind them (Zamorano 2025: body awareness predicts pitch accuracy, R²=0.41)." },
        { text: "Create Verse 2: same melody shape, but vary 2-3 notes. Hear the variation internally before singing — maybe the ending rises instead of falls, and you feel the resonance lift slightly at the end of the phrase. Or one phrase adds an extra note that the body reaches for.", why: "Verse variation keeps the listener interested. Too much repetition = boring. Too much change = confusing. Change 20-30% and keep 70-80%." },
        { text: "Add different words to each verse. Verse 1 sets the scene — feel the words grounding in the chest. Verse 2 develops it — adds detail, a character, or a shift in perspective. Notice if the new words want to sit in a slightly different body place.", why: "Lyric development across verses creates narrative motion. The song goes somewhere. Each verse adds a new piece to the puzzle." },
        { text: "Play V1 → V2 back to back. Can you hear the familiarity AND the freshness? The melody should feel like the same speaker telling a continuing story.", why: "The balance of familiar and fresh is the art of verse writing. Too much repetition and the ear tunes out. Too much novelty and it feels like two different songs." }
      ],
      feel: "Good verse writing should feel like telling a story to a friend — each section reveals something new, but the voice stays consistent. The verse lives in your chest: grounded, intimate, the resonance of someone speaking honestly. Your body should feel settled, weight in the chair, breathing low and easy. When the verse melody sits in its natural chest register, the words carry the warmth of the body behind them.",
      wrong: "If both verses are identical, add variation. If they sound unrelated, keep more of the original melody intact. The sweet spot is 'the same but different.' Before you begin: what ONE thing will you listen for? Maybe: 'I want the verse melody to feel like speech.' After: what did you notice? What surprised you? This plan-practice-reflect cycle improves outcomes by 23%.",
      sarah: "Gene, your verses should sound like you talking on the lanai — relaxed, descriptive, in no hurry. The porch register IS the verse voice.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "B3"),
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true,
      songStructure: [
        { name: "Verse 1", bars: 8, chords: ["Am", "C", "G", "Em", "Am", "C", "G", "Em"] },
        { name: "Verse 2", bars: 8, chords: ["Am", "C", "G", "Em", "Am", "C", "G", "Em"] }
      ],
      strumPattern: {
        notation: "D _ D U _ U",
        subdivision: "8ths",
        bpm: 80,
        description: "Simple verse strum — gentle, conversational, not driving. Supports storytelling without competing."
      },
      dynamicArc: [
        { section: "Verse 1", intensity: "soft-medium", notes: "Establishing story. Voice in porch register (E3-B3). Guitar quiet underneath." },
        { section: "Verse 2", intensity: "medium", notes: "Story develops. 2-3 notes vary from V1 melody. More conviction." }
      ],
      toneSettings: {
        pickup: "neck",
        effects: ["reverb:light-room"],
        capo: null,
        tuning: "standard",
        description: "Intimate, warm. The verse tone should sound like a conversation on the lanai — close, not projected."
      }
    },
    {
      id: "ss-12-2",
      time: 8,
      title: "Chorus Lift",
      type: "song",
      what: "Create a chorus that LIFTS from the verse — higher melody, more energy, simpler lyrics, stronger groove. The chorus is the emotional peak. It should feel like the verse was building toward it. Use contrast in range, rhythm, and delivery.",
      steps: [
        { text: "Take your verse from ss-12-1. Identify its highest note. Your chorus should start at or above that note. Hear the first chorus note internally — feel it forming in the mask rather than the chest, brighter and more open.", why: "Choruses lift above verses in range. Even a minor 3rd higher creates obvious sectional contrast." },
        { text: "Create a chorus melody with a simpler rhythm — longer notes, more repetition, more singable. Feel how sustained notes open the body wider than quick ones. The resonance expands from the narrow chest of the verse into the full mask and cheekbones.", why: "Chorus simplicity is what makes them stick. The listener should be able to sing along after hearing it once." },
        { text: "Increase your strum intensity for the chorus. More volume, fuller strumming, maybe switch from fingerpick to strum or from chop to full strum. Feel the whole body expand with the guitar — shoulders open, posture lifts.", why: "The guitar reinforces the dynamic shift. A louder, fuller guitar signals 'chorus' to the listener's subconscious." },
        { text: "Play verse → chorus → verse → chorus. The transition into the chorus should feel like a door opening into a bigger room.", why: "The verse-to-chorus transition is the most important moment in the song. It's the payoff for the setup." }
      ],
      feel: "The chorus should feel like taking a deep breath and letting it out — the resonance lifts from the chest into the mask. Your posture opens: shoulders back, chin slightly up, the body expanding. If the verse is intimate conversation grounded in the chest, the chorus is singing from a rooftop with the sound vibrating behind your cheekbones. That physical lift IS the chorus. Your body migrates upward, and the song follows.",
      wrong: "If the chorus doesn't feel different from the verse, push the contrast harder. Sing louder, higher, with simpler words. If it feels forced, the range jump might be too large — bring it down a step.",
      sarah: "Gene, the chorus is where your voice opens up slightly from the porch register — still relaxed, but with more chest resonance and conviction. Not belting — just more present. Try the DOPE LEMON major→minor trick for emotional shift between sections: D→Dm, G→Gm — the major version for the hopeful verse, the minor version for the bittersweet chorus. Same chord, one fret changes the 3rd. The emotional effect is like sunset — beautiful but ending. Use this to create a verse→chorus emotional shift that the listener feels in their gut.",
      metronome: 85,
      referencePitches: getPitchRange("B3", "E4"),
      volumeMeter: true,
      recorder: true,
      dynamicArc: [
        { section: "Chorus", intensity: "full", notes: "Voice lifts to mask register (B3-E4). Guitar strumming fuller, more present. The chorus is the emotional peak — the body opens." }
      ],
      toneSettings: {
        pickup: "both",
        effects: ["reverb:medium-room"],
        capo: null,
        tuning: "standard",
        description: "Fuller than the verse — slightly more volume, more open strumming. The chorus tone should sound like stepping from a room into the open air."
      }
    },
    {
      id: "ss-12-3",
      time: 8,
      title: "Bridge: The Departure",
      type: "song",
      what: "Write a bridge — the section that's DIFFERENT from both verse and chorus. New chords, new melody, new perspective. The bridge is the 'plot twist' of the song. It creates contrast that makes the final chorus feel earned.",
      steps: [
        { text: "If your verse/chorus uses G-C-D-Em, try bridge chords that haven't appeared yet: Am-F-Dm-G, or just Am for 8 bars. As the new chords land, feel your body shift — the bridge lives in an unfamiliar resonance, neither the grounded chest of the verse nor the open mask of the chorus.", why: "New chords signal 'something different is happening.' The bridge breaks the pattern the listener has learned, creating surprise." },
        { text: "Bridge melody: use a different contour from both verse and chorus. Hear the bridge melody forming in a different body location — maybe the throat or the head, somewhere you haven't sung from yet. If verse descends and chorus rises, make the bridge zigzag or stay flat.", why: "Contour contrast makes the bridge unmistakable. The listener's ear recognizes it as new territory immediately." },
        { text: "Bridge lyrics should shift perspective: if verses are observational ('I see...'), the bridge reflects ('I wonder...'). Feel the body change too — the reflective voice often narrows, becoming more interior, more intimate, the resonance retreating from the mask to a private place in the throat.", why: "The lyric shift reinforces the musical departure. Bridge lyrics often contain the song's deepest insight or most vulnerable admission." },
        { text: "Full form: V1 → Chorus → V2 → Chorus → Bridge → Final Chorus. The bridge makes the final chorus hit harder.", why: "The departure-return is the most powerful structure in music. Leaving home (bridge) makes coming home (final chorus) feel triumphant." }
      ],
      feel: "The bridge should feel like stepping off the familiar path into the woods — the resonance might move to the head voice, or narrow into the throat, or settle into an unfamiliar part of the body. Brief disorientation: where does this section live? Not in the chest (verse) or the mask (chorus), but somewhere unexpected. When the chorus returns after the bridge, your body migrates back to the mask and the reunion is physical — you can feel the homecoming in your posture.",
      wrong: "If the bridge sounds like another verse, the chords and melody aren't different enough. Push further away from the song's established patterns. The bridge should feel like a different song for 8 bars.",
      sarah: "Gene, bridges are optional but powerful. Not every song needs one. But when you have one, it's usually the most interesting 8 bars in the song.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      dynamicArc: [
        { section: "Bridge", intensity: "medium-different", notes: "New chords, new body location. The bridge is departure — unfamiliar resonance, neither chest nor mask but somewhere unexpected." }
      ]
    },
    {
      id: "ss-12-4",
      time: 7,
      title: "Pre-Chorus: The Ramp",
      type: "song",
      what: "The 2-4 bar section between verse and chorus that builds anticipation. Rising melody, building dynamics, harmonic tension — often landing on the V chord. Write a pre-chorus for one of your L9 songs. The pre-chorus makes the chorus arrival feel inevitable and earned.",
      steps: [
        { text: "Take your verse and chorus from ss-12-1/ss-12-2. Sing the last line of the verse, then jump straight into the chorus. Notice the gap — the verse ends intimate, the chorus starts big. The pre-chorus fills that gap.", why: "Without a pre-chorus, the verse-to-chorus transition can feel abrupt. The ramp smooths the dynamic shift and builds anticipation — like a plane accelerating before takeoff." },
        { text: "Write 2-4 bars of melody that sit BETWEEN the verse's low range and the chorus's high range. Feel the resonance migrating from chest toward mask as you sing — the body is in transit. Start near the verse's top note and rise toward the chorus's starting note. Shorter, more urgent phrases. The body leans forward.", why: "The pre-chorus melody creates a literal pitch ramp. Rising pitch triggers anticipation in the listener's brain — they can feel the chorus coming before it arrives." },
        { text: "Harmonically, move toward the V chord (D if you're in G, E if you're in Am). The V chord creates tension that resolves when the chorus lands on I. Try: pre-chorus ends on V... pause... chorus explodes on I.", why: "The dominant chord is the most tension-heavy chord in the key. Ending the pre-chorus on V is like pulling back a slingshot — the chorus is the release." },
        { text: "Build dynamics through the pre-chorus: start at the verse's mp volume and crescendo to the chorus's f. Increase strum intensity bar by bar. Record the full V → Pre-Chorus → Chorus sequence.", why: "Dynamic building reinforces the melodic and harmonic ramp. All three dimensions — pitch, harmony, volume — should point toward the chorus like arrows." }
      ],
      feel: "The pre-chorus should feel like the moment on a roller coaster when you're climbing the hill — your body is migrating from the chest (verse) toward the mask (chorus), and you can feel the transition happening in real time. The resonance rises, the breath deepens in preparation, the body leans forward. The anticipation is physical: your whole body knows the chorus is about to arrive before the chord change confirms it.",
      wrong: "If the pre-chorus sounds like another verse, the melody isn't rising enough. If it sounds like an early chorus, it's too high and too loud too soon. The ramp must be clearly between verse and chorus energy.",
      sarah: "Gene, pre-choruses are the secret weapon in psych-surf and reggae-rock. That 2-bar ramp before the chorus drops — Allah-Las do this constantly. It's what makes their choruses hit so hard.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true,
      dynamicArc: [
        { section: "Pre-Chorus", intensity: "building", notes: "Rising from verse volume (mp) to chorus volume (f). Melody climbs, breath deepens, body leans forward. The ramp IS the anticipation." }
      ]
    },
    {
      id: "ss-12-5",
      time: 7,
      title: "Hook Inventory",
      type: "song",
      what: "Four types of hooks: melodic (catchy tune), rhythmic (infectious pattern), lyric (memorable phrase), guitar (signature riff). Take one of your songs and identify which hook type each section relies on. A great song needs at least one STRONG hook. Write a new hook for the weakest section.",
      steps: [
        { text: "Play through one of your originals and label each section's primary hook type. Verse hook: is it the melody, the rhythm, a lyric phrase, or a guitar figure? Do the same for chorus and bridge.", why: "Most songwriters accidentally rely on one hook type everywhere. Identifying what you're doing makes you intentional about what's catching the listener's ear." },
        { text: "Rate each hook 1-5 for 'stickiness' — could someone hum or repeat it after one listen? A 5 is 'stuck in your head all day.' A 1 is 'I can't remember how it goes.' Be honest.", why: "Stickiness is the objective measure of a hook's effectiveness. If YOU can't remember your own hook after a day, a listener has no chance." },
        { text: "Find the weakest section (lowest stickiness score). Hear a new hook internally — feel where it wants to live in the body. A melodic hook might buzz in the mask; a rhythmic hook might pulse in the chest. Try a DIFFERENT hook type than the section currently uses. If the verse has a weak melodic hook, try a rhythmic hook instead.", why: "Switching hook types forces creative thinking. A section that fails as a melody might succeed as a rhythm. Cross-pollinating hook types strengthens the whole song." },
        { text: "Play the full song with the new hook integrated. Record it. Does the weakest section now pull its weight? The song should have no 'dead zones' where the listener's attention drifts.", why: "A song is only as strong as its weakest section. Audiences don't remember the best moment — they remember the moment they stopped paying attention." }
      ],
      feel: "A hook-rich song should feel magnetic — every section has something that grabs. Like walking through a market where every stall has something that catches your eye.",
      wrong: "If you can't identify any hooks, the song may be too meandering. Every section needs at least one repeating element that the ear latches onto. If everything is a hook, nothing is — pick the strongest and let it shine.",
      sarah: "Gene, Khruangbin is basically a masterclass in hook stacking — melodic bass hook, rhythmic guitar hook, and that groove underneath. Your songs have natural hooks in them; this exercise makes you find and sharpen them.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-12-6",
      time: 8,
      title: "Song Deconstruction III: Architecture",
      type: "listen",
      what: "Full architectural analysis of a DOPE LEMON or Skinshape song: section lengths (are verses longer than choruses?), dynamic arc (where's the peak?), hook placement (when does the hook first appear?), harmonic rhythm per section (does the chorus change chords faster?). Map the blueprint, then compare to YOUR songs.",
      steps: [
        { text: "Choose a DOPE LEMON or Skinshape track. Listen once without analyzing — just feel it. Then listen again with a timer. Write down every section boundary and its length in bars or seconds.", why: "Timing reveals structural decisions. Most listeners never notice that the first verse is often longer than the second, or that the chorus is half the length of the verse. These are deliberate choices." },
        { text: "Map the dynamic arc: rate each section 1-10 for intensity. Where is the peak? How quickly does the song build to it? How does it come down? Draw the intensity curve.", why: "Professional songs have carefully shaped dynamic arcs. The peak is almost never at the beginning or end — it's usually 60-75% through the song. This is the 'golden section' of arrangement." },
        { text: "Identify the hook's first appearance. How many seconds in? Does it appear in the intro, or is it withheld until the chorus? Count how many times the hook repeats across the whole song.", why: "Hook placement is strategic. Some songs front-load the hook (verse 1 contains it). Others withhold it (chorus only). Both approaches work — but the choice should be intentional." },
        { text: "Compare to one of YOUR songs: are your sections similar lengths? Is your dynamic arc as shaped? Does your hook appear at the right moment? Write down one structural change you'd make to your song based on what you learned.", why: "Comparing your instincts to professional choices reveals your blind spots. Most developing songwriters make all sections the same length and have flat dynamic arcs. This exercise calibrates your structural sense." }
      ],
      feel: "This should feel like X-raying a building — you're seeing the steel beams behind the beautiful facade. Once you see the structure, you can't un-see it. Every song becomes a lesson.",
      wrong: "If you're just vibing to the song without counting bars and noting dynamics, you're listening for pleasure, not analysis. Use a stopwatch. Write things down. Analysis requires precision.",
      sarah: "Gene, DOPE LEMON songs sound effortless but they're meticulously structured. Angus Stone knows exactly when to drop the hook, when to peak, when to pull back. Steal his blueprints. Try deconstructing Sol Del Sur: 16-bar syncopated intro with the C#m-B-F# cycle, then staccato verses with left-hand choking on the offbeats, then the wide-open legato chorus at 0:50 where the E chord appears for the first time creating lift, then an instrumental break with a surf-rock lead riff, then the final chorus. The architecture IS the dynamics — the contrast between choking and letting ring is the whole song.",
      checklist: true,
      phraseForm: { pattern: ["V", "V", "Ch", "V", "Ch", "Br", "Ch"], barsPerSection: [8, 8, 8, 8, 8, 4, 8] }
    },
    {
      id: "ss-12-7",
      time: 8,
      title: "Contrast Toolkit",
      type: "song",
      what: "Six dimensions of contrast between verse and chorus: (1) melodic range, (2) rhythmic density, (3) harmonic rhythm, (4) guitar texture (strum vs pick), (5) dynamics, (6) lyric density. Take a song and toggle ONE dimension at a time. Then stack three dimensions. The more dimensions you contrast, the stronger the section shift feels.",
      steps: [
        { text: "Play your verse and chorus back to back. Rate each of the 6 dimensions on a 1-5 scale for contrast: 1 = verse and chorus are identical on that dimension, 5 = they're opposites. Write down all 6 scores.", why: "Quantifying contrast reveals where your sections differentiate and where they blend together. Most songs lean on 1-2 dimensions and ignore the rest — that's leaving tools on the table." },
        { text: "Pick the lowest-scoring dimension. Change ONLY that one dimension between verse and chorus. If rhythmic density is low-contrast, make the verse sparse (whole notes) and chorus dense (eighth notes). Keep everything else the same.", why: "Isolating one dimension lets you hear exactly what that contrast contributes. Changing everything at once is overwhelming. One variable at a time teaches your ear what each dimension does." },
        { text: "Now stack three high-contrast dimensions together. For example: verse = low range + fingerpick + quiet. Chorus = high range + strum + loud. Play the transition. Feel the body transform: verse sits low in the chest, still and intimate. Chorus lifts the resonance to the mask, the posture opens, the breath deepens. The body migration IS the contrast.", why: "Stacking contrast dimensions creates multiplicative impact. One dimension of contrast sounds subtle. Three dimensions sounds like a different song section. This is what makes professional chorus arrivals hit hard." },
        { text: "Record the full verse-chorus sequence with 3 stacked dimensions of contrast. Listen back. Can you hear each dimension contributing? The transition should feel like walking from a dim room into sunlight.", why: "The recording test is honest. If the contrast isn't audible on playback, it's in your head, not in the performance. Push each dimension further until the playback reveals it clearly." }
      ],
      feel: "Stacking contrast should feel like flipping a switch — the song transforms. Verse and chorus should feel like two sides of the same coin: related but unmistakably different.",
      wrong: "If the verse and chorus still sound the same after toggling dimensions, you're not pushing far enough. Exaggerate each dimension until it's almost comical, then dial it back 20%. The 'too much' point teaches you where 'just right' lives.",
      sarah: "Gene, the Allah-Las are masters of subtle multi-dimensional contrast — their verses and choruses share the same vibe but the shift is unmistakable. It's not one big change, it's five small ones stacking up. And here's a power move for your toolkit: the major→minor trick. DOPE LEMON's 'Honey Bones' uses D-Dm-G-Gm — shifting one note (the 3rd) from major to minor within the progression. It creates a 'sunset' feeling — beautiful but ending. modGlyders' 'Geneva Strange' does the same with G→Gm. Try this in your own songs: verse in major, chorus shifts one chord to its minor version. That single changed note transforms the emotional landscape.",
      metronome: 80,
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-12-8",
      time: 6,
      title: "Intro & Outro Framing",
      type: "guitar",
      what: "Create intros and outros that frame your songs — the first and last impression. An intro sets the mood before the voice arrives. An outro lets the feeling linger after the words stop. Based on the 'primacy-recency effect': listeners remember beginnings and endings most vividly.",
      steps: [
        { text: "Create an intro: 4-8 bars of guitar only. Use the chorus chords at a softer dynamic. Let the body settle into the groove before the voice enters — feel the guitar establishing a physical space in the lower belly, grounding and warming.", why: "The intro is a promise — it tells the listener what kind of experience is coming. A gentle fingerpicked intro promises intimacy. A driving jangle promises energy." },
        { text: "The intro can preview the chorus melody on guitar (no singing) or just establish the groove. Both approaches work — choose what fits the song.", why: "A melodic intro gives the chorus melody an extra repetition, making it more memorable. A groove intro lets the listener settle into the feel." },
        { text: "Create an outro: after the final chorus, continue strumming but gradually decrease volume. Or repeat the last melody phrase, getting softer each time.", why: "The outro is an emotional release valve. It lets the energy dissipate naturally instead of stopping abruptly. Think sunset — gradual, beautiful, inevitable." },
        { text: "Try an alternative outro: stop singing but keep playing the intro guitar part. The song ends where it began — a satisfying circle.", why: "The bookend technique (ending with the intro) creates structural symmetry. It feels complete and intentional." }
      ],
      feel: "A good intro makes you want to hear more. A good outro makes you want to hear it again. Together, they frame the song like a picture frame — the song is the art, the framing is the presentation.",
      wrong: "If the intro is too long (>8 bars), the listener gets impatient. If the outro cuts off abruptly, the emotional experience is interrupted. Keep intros 4-8 bars. Keep outros 4-8 bars.",
      sarah: "Gene, intros and outros are the professional touch. They transform a song from 'I started playing and I stopped' into 'here's a composed piece of music with intention.'",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-12-9",
      time: 8,
      title: "Dynamic Mapping",
      type: "song",
      what: "Plan the intensity arc of a complete song: where does it whisper? Where does it shout? Dynamic mapping is the choreography of volume, energy, and emotional intensity across the entire song form.",
      steps: [
        { text: "Draw a dynamic map for your song: intro (pp) → V1 (mp) → Chorus (f) → V2 (mp) → Chorus (f) → Bridge (p) → Final Chorus (ff) → Outro (pp). Write it down.", why: "Explicit dynamic planning makes your performance intentional. Most amateur performances are one volume throughout — dynamic mapping is the professional difference." },
        { text: "Practice each dynamic level separately: play just the intro at pp — feel the resonance as a private hum deep in the belly. Just the chorus at f — feel the body open, the mask vibrating. Just the bridge at p — feel the resonance retreat to an interior place. Get comfortable at each volume's body state.", why: "Each dynamic level requires different strum technique, breath support, and vocal delivery. Practice them individually before combining." },
        { text: "Play the full song following your dynamic map. Exaggerate the differences — whisper the quiet parts (body still, resonance interior), project the loud parts (body open, resonance radiating). Feel the body journey through its own geography.", why: "Exaggeration in practice creates subtlety in performance. What feels dramatic alone sounds natural to a listener." },
        { text: "Record it. Listen back. Can you hear the dynamic journey? The song should breathe — expanding and contracting like a living thing.", why: "The recording reveals whether your dynamics are audible or imagined. If the loud and quiet parts sound similar, push the contrast further." },
        { text: "Consider 'implied tension': what happens if you REMOVE an element before the climax? Drop the guitar for 2 bars before the final chorus. Stop singing for a bar. The silence creates more anticipation than adding more sound. Absence is a dynamic tool.", why: "Implied tension \u2014 removing elements to create anticipation \u2014 is the most underused dynamic tool for solo performers. Holistic Songwriting\u2019s Friedemann Findeisen identifies this as the key to making solo arrangements sound like full productions." }
      ],
      feel: "A dynamically mapped song should feel like a complete emotional journey through the body — the quiet intro in the low belly, the verse warming through the chest, the chorus blazing in the mask, the bridge retreating to a private interior space, the final chorus opening the whole body. The dynamic map IS a body map. Each volume level lives in a different physical space, and the journey through dynamics is a journey through your own resonance.",
      wrong: "If the whole song is one volume, your dynamics aren't translating. Push the contrast harder. Whisper. Then project. Then whisper again. The range between soft and loud IS the performance.",
      sarah: "Gene, dynamics are the difference between someone who plays songs and someone who tells stories with music. This is where you become a performer.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-12-10",
      time: 8,
      title: "The 48-Hour Rewrite",
      type: "song",
      what: "Take a song from L9 you haven't touched in 48+ hours. Play it once. Listen to the recording. Now rewrite: change one melody note per section, tighten one lyric line, adjust one dynamic moment. Fresh ears hear what writing-mode ears miss. The 'distance rule': always wait before revising.",
      steps: [
        { text: "Pick a song you wrote at least 2 days ago. Don't look at notes or recordings first. Play it from memory — whatever you remember IS the song. Notice which phrases your body recalls first: the ones that had a clear body address (a melody that lived in the chest, a hook that buzzed in the mask) survived. What you forgot wasn't memorable enough.", why: "Memory is the first editor. If you can't remember a phrase after 48 hours, the listener won't remember it after 48 seconds. What sticks is what works." },
        { text: "Now listen to your original recording. Compare what you remembered to what you recorded. Note the differences — the parts you forgot, the parts you changed unconsciously. These are revision targets.", why: "The gap between memory and recording reveals the song's weak spots. Your brain already edited it while you weren't looking — trust those instincts." },
        { text: "Make exactly three changes: (1) one melody note per section — find the note that feels predictable and make it surprising. (2) One lyric line — find the weakest line and rewrite it tighter. (3) One dynamic moment — find where the energy sags and fix it.", why: "Limiting changes to three prevents over-revision. Rewriting everything destroys what worked. Surgical editing — three precise cuts — improves the song without killing its spirit." },
        { text: "Record the revised version. Compare it to the original. The three changes should be audible improvements. If any change made the song worse, revert it. Not every edit is an improvement.", why: "The comparison test keeps revision honest. Sometimes the original was better. Having both recordings lets you choose the strongest version of each moment." }
      ],
      feel: "Revision should feel like polishing — the song is already there, you're just removing the rough edges. Not rebuilding, not second-guessing. Refining.",
      wrong: "If you're rewriting the entire song, you're not revising — you're starting over. Limit yourself to three changes. If the song needs more than that, it might need to be shelved, not fixed.",
      sarah: "Gene, every great songwriter revises. The first draft is discovery. The rewrite is craft. Angus Stone doesn't release first takes — he lets songs sit, then comes back with fresh ears and a sharper knife.",
      checklist: true,
      recorder: true
    },
    {
      id: "ss-12-11",
      time: 7,
      title: "Alternative Song Forms",
      type: "song",
      what: "Beyond verse-chorus: (1) AAA (strophic \u2014 same melody, different lyrics each verse, like folk and blues), (2) ABAC (verse-chorus-verse-different chorus), (3) Through-composed (no repeated sections \u2014 a journey), (4) One-section loop (Tinariwen: one groove, evolving lyrics). Write a short piece in a non-standard form. Also explore AABA (32-bar form): Say \u2192 Say again \u2192 Change \u2192 Return. The B section changes the meaning of A when it comes back. See ss-12-17 for a dedicated AABA composition exercise.",
      steps: [
        { text: "Write a 3-verse AAA song: same chord progression, same melody, three different sets of lyrics. No chorus. The melody stays in the chest — same body address each verse, intimate and grounded. Let the lyrics do the traveling while the body stays home. Think Dylan, Nick Drake, desert blues.", why: "Strophic form is the oldest song structure — it trusts the melody and lyrics completely. Without a chorus to lean on, every verse must be compelling. This builds lyric-writing muscle." },
        { text: "Now try a one-section loop: one 4-8 bar progression that repeats for 2-3 minutes. The groove never changes. Let the resonance settle deep in the belly and stay there. Instead, evolve the lyrics — start simple, add detail, build intensity, resolve. The body is still; the words move. Like Tinariwen or early reggae.", why: "The loop form teaches you that repetition isn't boring — it's hypnotic. When the music stays constant, small changes in lyrics, delivery, or dynamics become magnified. Less structure, more presence." },
        { text: "Try through-composed: write 4 sections where each one has a different melody and different chords. No section repeats. The song moves forward like a story with no refrain. This is the hardest form.", why: "Through-composed forces constant invention. Without repetition to anchor the listener, every section must be strong enough to stand alone. It builds compositional endurance." },
        { text: "Choose the form that felt most natural. Expand it to a full 2-3 minute piece. Record it. Some songs want to be verse-chorus. Others want to be loops or journeys. The form should serve the song's emotional truth.", why: "Different emotions call for different forms. Longing suits AAA (the same feeling, different words). Joy suits verse-chorus (the hook returns). Restlessness suits through-composed (always moving). Matching form to feeling is artistry." }
      ],
      feel: "Alternative forms should feel liberating — like discovering you can paint without a canvas. Not every song needs a chorus. Not every song needs sections. Some songs just need a groove and a voice.",
      wrong: "If the alternative form feels random or structureless, you've gone too far. Even AAA and loop forms have internal logic — repetition, variation, arc. Structure exists in every form; it's just expressed differently.",
      sarah: "Gene, your psych-surf and desert blues influences are BUILT on non-standard forms. Tinariwen loops one riff for 7 minutes. Tommy Guerrero barely uses choruses. These forms are in your DNA — lean into them.",
      phraseForm: { pattern: ["A", "A", "A"], barsPerSection: 8 },
      recorder: true
    },
    {
      id: "ss-12-12",
      time: 8,
      title: "Arranging for Emotional Arc",
      type: "song",
      what: "Four-pass arrangement refinement of your best song: Pass 1 — melody contour (does each section have a distinct shape?). Pass 2 — dynamics (verse quiet, chorus full, bridge stripped). Pass 3 — guitar texture (verse fingerpick, chorus strum). Pass 4 — vocal delivery (verse intimate, chorus projected). One element per pass prevents overwhelm.",
      steps: [
        { text: "Pass 1 — Melody contour: Play through your song and draw the melody shape of each section. Verse should descend or stay flat. Chorus should rise. Bridge should zigzag. If two sections have the same contour, rewrite one.", why: "Distinct melodic contours make sections instantly recognizable. The listener's ear tracks the shape of the melody before it tracks the notes. Different shapes = different sections = clear architecture." },
        { text: "Pass 2 — Dynamics: Play the song focusing ONLY on volume. Verse at mp. Pre-chorus crescendo. Chorus at f. Bridge drops to p. Final chorus at ff. Ignore melody refinement — just nail the dynamic map.", why: "Isolating dynamics from melody lets you focus on one dimension of the arrangement. When dynamics are right, the song breathes naturally — expanding and contracting like a living thing." },
        { text: "Pass 3 — Guitar texture: Play the song focusing ONLY on how you play the guitar. Verse: fingerpick or gentle strum. Chorus: full strum or aggressive rhythm. Bridge: arpeggios or silence. Each section gets a distinct guitar voice.", why: "Guitar texture is the most underused arrangement tool for singer-songwriters. Changing HOW you play the guitar between sections is as powerful as changing WHAT you play." },
        { text: "Pass 4 — Vocal delivery: Sing the song focusing ONLY on how your voice sounds. Verse: intimate, the resonance sitting in the chest, the voice close and conversational. Chorus: open, the vibration lifting to the mask, projected. Bridge: vulnerable, the voice retreating to the throat, uncertain. Hear each section's delivery in the body before you begin it. Record the full four-pass refined arrangement.", why: "Vocal delivery is the final layer. When melody, dynamics, texture, and delivery all shift between sections, the song transforms from a sequence of chords into a performed piece of art." }
      ],
      feel: "Each pass should feel like adding a layer of awareness to the body's experience of the song. After four passes, the arrangement should feel rich, intentional, and physically alive — the verse sits differently in your body than the chorus, the bridge inhabits a different resonance than either. Every section distinct, every transition a body migration.",
      wrong: "If you're trying to fix everything at once, you're ignoring the pass system. ONE element per pass. The power is in isolation — when you focus on dynamics alone, you hear things you miss when juggling everything.",
      sarah: "Gene, this is how producers think. They don't build a mix all at once — they do passes. Melody pass. Dynamics pass. Texture pass. Each pass makes the song 25% better. Four passes and you've got a professional arrangement.",
      volumeContour: true,
      checklist: true,
      recorder: true
    },
    {
      id: "ss-12-13",
      time: 10,
      title: "Complete Arranged Song",
      type: "song",
      what: "Build a fully arranged original song: intro, V1, chorus, V2, chorus, bridge, final chorus, outro. With dynamic mapping, contrasting sections, and intentional transitions. This is a professional-quality song structure.",
      tracks: [{ name: "Cinematic Western 80", src: "/cinematic-western-80.mp3" }],
      steps: [
        { text: "Choose your best original from Level 9 or write a new one. Map the full structure: intro (4 bars) → V1 (8) → Chorus (8) → V2 (8) → Chorus (8) → Bridge (8) → Final Chorus (8) → Outro (4).", why: "A full arrangement plan keeps you from getting lost. 56 bars total, about 3 minutes at 80 BPM. That's a complete song." },
        { text: "Mark the dynamic arc on your structure: pp → mp → f → mp → f → p → ff → pp. Each dynamic level has a body address — pp lives in the low belly, mp warms the chest, f opens the mask, ff fills the whole body. Practice each transition as a body migration.", why: "Dynamics and structure work together. The bridge's drop to p makes the final chorus ff feel earned." },
        { text: "Practice transitions: verse → chorus (feel the resonance lift from chest to mask). Chorus → verse (feel it settle back down). Verse → bridge (feel it move to an unfamiliar place). Bridge → final chorus (feel the homecoming in the mask). Each transition is a body migration.", why: "Transitions are where songs fall apart or come alive. Smooth transitions create flow; jarring ones break immersion." },
        { text: "Perform the complete song 3 times. Record the 3rd take. Listen back. This is a fully arranged, dynamically mapped original song.", why: "The third take benefits from two warm-up passes. It's usually the take where technique and emotion align." }
      ],
      feel: "A fully arranged song should feel like a journey through the body's geography — the intro grounds you in the low belly, the verses warm the chest, the choruses open the mask, the bridge ventures somewhere unfamiliar, and the outro returns you to the quiet place where you started. When you reach the final bars, you should feel like your whole body has been somewhere and returned. The song's form IS the body's arc.",
      wrong: "If the arrangement feels too long, cut the second verse or bridge. If it feels rushed, add 4 bars to the sections that need more space. Structure serves the song, not the other way around.",
      sarah: "Gene, this is album-quality songwriting. A fully arranged original with dynamics, structure, and intention. This is what performing singer-songwriters do.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      checklist: true,
      recorder: true,
      phraseForm: { pattern: ["Intro", "V1", "Ch", "V2", "Ch", "Br", "Ch", "Outro"], barsPerSection: [4, 8, 8, 8, 8, 8, 8, 4], labels: { Intro: "Intro", V1: "Verse 1", V2: "Verse 2", Ch: "Chorus", Br: "Bridge", Outro: "Outro" } },
      volumeContour: true,
    },

    // ─── ENRICHMENT — PRE-CHORUS DEPTH, HOOK ANATOMY, DIMENSIONAL CONTRAST ───

    {
      id: "ss-12-14",
      time: 8,
      title: "The Pre-Chorus — Building the Bridge to Liftoff",
      type: "song",
      what: "The pre-chorus is the 'lean forward' moment between verse and chorus — 2-4 bars of mounting anticipation that make the chorus arrival feel inevitable. It builds tension through rising melody, growing dynamics, harmonic suspension, rhythmic acceleration, or all four at once. Without a pre-chorus, the verse-to-chorus jump can feel like a gap. With one, it feels like a ramp. Based on Huron's ITPRA theory: anticipation (the 'A') is the most emotionally potent phase of musical expectation, and the pre-chorus IS pure anticipation.",
      setup: "Guitar in standard tuning. Have your verse and chorus from ss-12-1/ss-12-2 ready (or any original with a clear verse-chorus structure). Voice check: hum your verse melody, then your chorus melody. Feel the gap between them — the pre-chorus will fill it.",
      steps: [
        { text: "Sing your verse melody (4 bars, settled, in the chest — the resonance grounded behind the sternum, conversational). Then jump straight to your chorus (4 bars, lifted, in the mask — the resonance open, projected). Feel the gap. The jump is abrupt — the body has to lurch from chest to mask with no transition. That lurch is what the pre-chorus eliminates.", why: "Experiencing the gap before filling it makes the pre-chorus's function visceral. The body feels the missing transition as an awkward moment — the resonance doesn't have time to migrate smoothly from chest to mask. Huron's ITPRA theory: without anticipation, the reaction phase (chorus arrival) lacks emotional preparation, reducing its impact by up to 40%." },
        { text: "Now insert a 2-bar pre-chorus between them. Approach A: RISING MELODY. Start at the verse's highest note and climb toward the chorus's starting note. Feel the resonance migrate upward through the chest — through the throat — approaching the mask. Shorter phrases. More urgency. The body is in transit, leaning forward.", why: "Rising melody is the most intuitive pre-chorus technique. Ascending pitch triggers anticipation in the listener's autonomic nervous system — heart rate increases, breath shallows, the body physically leans forward. This is the body's flight preparation response repurposed for music (PMC5608010: ascending pitch contours activate sympathetic nervous system)." },
        { text: "Approach B: RHYTHMIC ACCELERATION. Keep the melody at the same pitch level but increase rhythmic density — where the verse had whole and half notes, the pre-chorus has quarters and eighths. The words come faster. The strum pattern intensifies. Feel the pulse quicken in the chest and belly, the body's internal metronome speeding up.", why: "Rhythmic acceleration creates urgency without melodic change. It's the musical equivalent of a quickening heartbeat. The body responds to rhythmic density with increased arousal — faster breathing, tensed muscles, forward lean. When the chorus arrives and the rhythm settles into a groove, the relief is physical." },
        { text: "Approach C: HARMONIC SUSPENSION. End the pre-chorus on the V chord (dominant) and HOLD IT — let the tension sit for a full bar. The V chord leans your whole body forward at the chest, pulling toward resolution. Then the chorus EXPLODES on the I chord. The held dominant is a slingshot: the longer you hold it, the harder the chorus arrives.", why: "The dominant chord creates the strongest harmonic tension in any key. Sustaining it builds expectation to a breaking point — Narmour's implication-realization model predicts that delayed resolution intensifies the resolution's emotional impact proportionally. The body's forward lean on V is measurable — posture shifts toward the sound source during unresolved dominant chords (Nummenmaa 2024)." },
        { text: "Play all three versions back to back: Verse → Pre-Chorus A (rising) → Chorus. Then Verse → Pre-Chorus B (rhythmic) → Chorus. Then Verse → Pre-Chorus C (harmonic suspension) → Chorus. Which pre-chorus makes the chorus arrival feel most powerful? Which one does your BODY respond to most strongly? Record all three versions.", why: "Comparing approaches side by side reveals which technique works best for your specific song and your specific voice. There's no universal 'best' pre-chorus — it depends on the verse's energy, the chorus's energy, and the gap between them. Your body is the judge: the pre-chorus that creates the strongest forward lean wins." },
        { text: "Now try combining two approaches: rising melody + harmonic suspension. Or rhythmic acceleration + rising melody. Stack the anticipation techniques. Feel how stacking multiplies the effect — the body doesn't just lean forward; it PULLS forward, the resonance migrating urgently toward the mask.", why: "Stacking anticipation techniques creates exponential impact. Professional pre-choruses almost always combine multiple approaches — Coldplay's pre-choruses use rising melody + rhythmic acceleration + harmonic suspension simultaneously. The body's anticipation response compounds with each added dimension." },
        { text: "End-of-exercise retrieval: guitar down. Audiate your best pre-chorus internally — feel the anticipation building in your body without external sound. Then audiate the chorus arriving. Can you feel the liftoff in your inner ear? The pre-chorus should create physical anticipation even in audiation.", why: "Audiating the pre-chorus-to-chorus transition proves that the anticipation lives in your body, not just in the guitar. When the forward lean and chest-to-mask migration happen during audiation, the pre-chorus has been internalized as a body event. This is the goal: structural awareness that operates somatically." }
      ],
      feel: "The pre-chorus should feel like the moment on a roller coaster when you're cresting the hill — the body migrating from the grounded chest (verse) toward the open mask (chorus), the breath deepening in preparation, the resonance rising through the throat. Everything points forward: the melody climbs, the rhythm quickens, the harmony leans. Your body knows the chorus is coming before the chord change confirms it. The anticipation IS the pre-chorus — it's not a section, it's a physical state of mounting arrival.",
      wrong: "If the pre-chorus sounds like another verse, the melody isn't rising enough or the rhythm isn't intensifying. Push harder — the pre-chorus should feel DISTINCTLY transitional, like walking faster as you approach a destination. If it sounds like an early chorus, it's too high and too loud too soon — the ramp must be clearly BETWEEN verse and chorus energy, not AT chorus energy. VOCAL TIP: if your voice strains during the rising melody, you're pushing into the chorus range too early. Keep the pre-chorus in the 'transition zone' between verse range and chorus range — throat resonance, not full mask.",
      sarah: "Gene, pre-choruses are the secret weapon in psych-surf and reggae-rock. That 2-bar ramp before the chorus drops — Allah-Las do this constantly. Skinshape's songs often have a subtle pre-chorus that's just the guitar pattern intensifying for 2 bars before the vocal hook lands. And here's a pro move: try a 'drop pre-chorus' — instead of building UP, strip everything DOWN to just voice for 2 bars, then explode into the full-band chorus. The silence before the storm. BALTHVS does this — whispered vocal, no guitar, then BOOM. The contrast makes the chorus feel enormous.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-12-15",
      time: 8,
      title: "Hook Anatomy — 4 Types of Hook",
      type: "song",
      what: "Hooks come in 4 flavors: MELODY hook (singable riff that sticks in the ear), RHYTHMIC hook (distinctive beat pattern that the body remembers), LYRIC hook (memorable phrase that works as a song title), and GUITAR hook (signature riff or texture). Most hit songs use 2-3 types simultaneously — the hooks stack and reinforce each other. This exercise teaches you to create and combine all 4 types, transforming your songs from 'nice' to 'unforgettable.' Based on Halpern & Bartlett (2011): involuntary musical imagery ('earworms') correlates with melodic simplicity, rhythmic distinctiveness, and lyric memorability — the three most sticky hook types.",
      setup: "Guitar in standard tuning. Voice check: hum the hookiest melody you can think of (from any song). Notice what makes it stick — simplicity? Rhythm? A specific interval jump? That stickiness is what you'll learn to create.",
      steps: [
        { text: "Create a MELODY hook — a 1-2 bar riff that's instantly singable. The test: sing it once, wait 60 seconds in silence, then try to recall it. If you can hum it back accurately, it's sticky. Feel where it lives in the body — the best melody hooks buzz in the mask, the resonance bright and forward, the intervals singable (mostly steps with one memorable leap). Simple. Repetitive. Memorable.", why: "Melody hooks work through contour simplicity and interval predictability with one surprise. Halpern & Bartlett (2011) found that earworm melodies have higher melodic simplicity scores than non-earworm melodies. The body remembers melody hooks in the mask because they're designed to be sung — the resonance is projected, communal, shareable. If it doesn't live in the mask, it's not hooky enough." },
        { text: "Create a RHYTHMIC hook — a distinctive rhythmic pattern on just 1-2 notes. The rhythm IS the hook, not the pitch. Tap it on your guitar body first. Then sing it on a single note. Feel it pulse in the chest and belly — rhythmic hooks are body-centered, not voice-centered. Think reggae toasting (one note, infectious rhythm), or Bo Diddley's shave-and-a-haircut. The test: can someone tap the rhythm on a table and you'd recognize the song?", why: "Rhythmic hooks bypass melody entirely and embed in the body's motor system. They create involuntary foot-tapping, head-nodding, body-swaying — the hook lives in the muscles, not the ear. The body remembers rhythmic hooks in the chest and belly because rhythm activates the motor cortex and vestibular system (Grahn & Brett 2007). Reggae and funk rely almost entirely on rhythmic hooks." },
        { text: "Create a LYRIC hook — a memorable phrase that works as a title. 3-5 words maximum. It should be emotionally resonant, slightly ambiguous, and euphonious (the words SOUND good together). 'Three Little Birds.' 'Is This Love.' 'Honey Bones.' 'Beautiful Day.' Test: say the phrase to someone. Would they want to know more?", why: "Lyric hooks work through semantic compression — maximum meaning in minimum words. The best lyric hooks are titles that double as choruses. They're memorable because they combine emotional resonance (the phrase MEANS something) with phonetic pleasure (the words feel good in the mouth). Open vowels carry better: 'love,' 'day,' 'sky,' 'home' — these are your hook vowels." },
        { text: "Combine 2 types: take your melody hook and your lyric hook. Can the lyric phrase FIT the melody contour? Adjust one or both until they lock together — the melody makes the words singable, the words make the melody meaningful. Then add the rhythmic hook underneath as the strum pattern. Feel how stacking hooks creates a MAGNETIC effect — the body responds on multiple channels simultaneously: mask (melody), chest (rhythm), throat (words).", why: "Hook stacking is the professional songwriting technique. When melody, rhythm, and lyrics all hook simultaneously, the song becomes multi-channel sticky — the listener's body, ear, and language brain are all engaged at once. Halpern & Bartlett (2011): earworms are more likely when melodic AND lyric hooks coincide. Two hooks are additive; three hooks are multiplicative." },
        { text: "Apply hook stacking to a verse-chorus structure: the verse has a subtle RHYTHMIC hook (the strum pattern creates a groove the body picks up). The chorus has a MELODY + LYRIC hook (the singable riff with the memorable phrase). The hook density INCREASES from verse to chorus — sparse to saturated. Feel the contrast: the verse grooves in the belly; the chorus blazes in the mask with words you can't forget.", why: "Hook density as a structural tool creates natural section contrast. Low hook density in verses keeps the listener grounded and curious. High hook density in choruses delivers the payoff — the cathartic, singable, memorable moment. This density gradient is what makes choruses feel like arrivals: more hooks land at once." },
        { text: "Record a verse-chorus with your stacked hooks. Listen back after 5 minutes. Which hooks stuck? Which ones did you forget? The hooks that survived 5 minutes of silence are the keepers. The ones that faded need strengthening — simpler melody, more distinctive rhythm, tighter lyric phrase.", why: "The 5-minute silence test is the most honest hook assessment. Short-term memory retains hooks proportional to their stickiness. If the melody hook survived but the rhythmic hook didn't, the rhythm needs more distinction. If the lyric hook survived but the melody didn't, the melody is serving the words but not earning its own space." },
        { text: "End-of-exercise retrieval: set everything down. Wait 2 full minutes in silence. Then, from nothing, try to recall ALL your hooks — melody, rhythm, lyric. Sing them, tap them, say them. What survived the silence? That's your song's actual sticking power. Write down what you remembered and what you lost.", why: "Retrieval practice after silence is the most accurate predictor of listener experience. The hooks that live in your body after 2 minutes of nothing will live in a listener's body after hearing your song once. This is the ultimate hook test: not 'does it sound good while playing?' but 'does it STAY after the music stops?'" }
      ],
      feel: "A hook-rich song should feel magnetic from multiple directions — the melody pulls the mask forward (you want to sing it), the rhythm moves the belly and hips (you want to groove), the lyric phrase sits on the tongue (you want to say it). When all three channels fire simultaneously in the chorus, the effect is physical: the whole body engages at once, multiple resonance centers activated. That full-body engagement IS stickiness. The hook doesn't just catch the ear — it catches the body.",
      wrong: "If you can't create a hook that sticks, you're probably making it too complex. The #1 rule of hooks: SIMPLIFY. Cut notes, shorten phrases, repeat more. A 2-note hook with a distinctive rhythm beats an 8-note melody every time. If everything sounds like a hook, nothing is — pick the STRONGEST element in each section and build around it. Let the hook breathe; don't bury it in busy arrangement. VOCAL TIP: sing the hook louder and more forward than the surrounding melody. The hook should POP — the resonance shifts to the mask, the projection increases, the body opens. The listener's ear goes where the energy goes.",
      sarah: "Gene, Khruangbin is basically a masterclass in hook stacking — Laura Lee's bass is a melodic hook, Mark's guitar is a rhythmic hook, and the sparse lyrics are lyric hooks. Three hooks from three instruments. Your favorite reggae tracks work the same way: the offbeat strum is a rhythmic hook, the vocal melody is a melody hook, and 'every little thing gonna be all right' is one of the greatest lyric hooks ever written. Now here's the advanced move: the ANTI-hook. Tinariwen and Tommy Guerrero barely use traditional hooks — their music hypnotizes through GROOVE rather than catchiness. That's a valid choice too. But know the rules before you break them.",
      checklist: true,
      recorder: true,
      metronome: 85
    },
    {
      id: "ss-12-16",
      time: 8,
      title: "The 6 Dimensions of Contrast",
      type: "song",
      what: "Verse and chorus must CONTRAST to create drama — but contrast isn't just 'louder chorus.' There are 6 independent dimensions you can dial: (1) pitch range, (2) rhythmic density, (3) dynamic level, (4) vowel openness, (5) harmonic tension, (6) lyric specificity. Each dimension is a separate knob. Turning all 6 creates maximum contrast; turning only 2-3 creates subtle, sophisticated contrast. The art is choosing WHICH dimensions to turn for each song. Based on Meyer (1956) and Huron (2006): emotional impact in music scales with the number of simultaneous contrasting parameters.",
      setup: "Guitar in standard tuning. Have a verse and chorus ready (from ss-12-1/ss-12-2 or any original). Voice check: sing your verse, then your chorus. Rate the current contrast 1-10. This exercise will push it to 8+.",
      steps: [
        { text: "Dimension 1: PITCH RANGE. Sing your verse in your low-to-mid range (E3-B3, chest voice — the resonance grounded behind the sternum). Sing your chorus in your mid-to-upper range (B3-E4, chest-to-mask — the resonance lifting and opening). Feel the body migration: verse grounds you in the belly, chorus lifts you to the cheekbones. Map the pitch range contrast as a physical journey.", why: "Pitch range is the most obvious contrast dimension and the most directly embodied. Higher pitch = higher body resonance = more projected, more communal, more 'chorus.' Lower pitch = lower body resonance = more intimate, more personal, more 'verse.' The body's resonance map IS the section map. Zamorano (2025): pitch height correlates with body-mapped sensation height (R²=0.41)." },
        { text: "Dimension 2: RHYTHMIC DENSITY. Sing your verse SPARSE — few notes, long sustained tones, plenty of silence between phrases. Then sing your chorus DENSE — more notes per bar, shorter values, less silence. Feel the contrast in the chest and belly: sparse rhythm lets the body settle, each note a complete event. Dense rhythm energizes the body, the internal pulse quickening.", why: "Rhythmic density controls perceived energy independently of volume or pitch. A sparse verse at medium volume feels intimate. A dense chorus at the same volume feels energetic. The body responds to rhythmic density through motor cortex activation — denser rhythms create more involuntary body movement (Grahn & Brett 2007)." },
        { text: "Dimension 3: DYNAMIC LEVEL. Sing your verse at piano (p) — soft, interior, the resonance a private hum in the chest. Sing your chorus at forte (f) — full, projected, the resonance filling the mask and radiating outward. The volume contrast should be DRAMATIC. Use the volumeMeter to verify — the chorus should be at least 6-10 dB louder than the verse.", why: "Dynamics are the most underused contrast dimension in amateur songwriting. Professional recordings have 10-15 dB of dynamic range between verse and chorus. The body experiences this as an expansion — quiet sections contract the body inward (intimate posture), loud sections expand it outward (open posture). The physical expansion IS the emotional opening of the chorus." },
        { text: "Now try turning ALL 6 dimensions at once: Verse = LOW range, SPARSE rhythm, QUIET dynamics, CLOSED vowels (ee, oo — lips narrowed, resonance interior), RESOLVED chords (I and IV — stable, grounded), SPECIFIC lyrics (concrete images, 'the blue door, the salt air'). Chorus = HIGH range, DENSE rhythm, LOUD dynamics, OPEN vowels (ah, oh — mouth wide, resonance radiating), TENSE chords (V, vi, borrowed chords — leaning, unresolved), UNIVERSAL lyrics (abstract feelings, 'everything shines, we're alive'). Play the full verse-chorus. Feel the TOTAL body transformation.", why: "All 6 dimensions simultaneously creates maximum section contrast — the verse and chorus become two completely different physical experiences. The body migrates from contracted/interior/low (verse) to expanded/radiant/high (chorus). Meyer (1956): emotional response scales with the number of simultaneously contrasting parameters. Six dimensions = maximum emotional impact." },
        { text: "Now try turning ONLY 2-3 dimensions while keeping the others constant. Version A: change only pitch range and dynamics (high chorus, loud chorus, but same rhythm and vowels). Version B: change only rhythmic density and vowel openness (dense chorus, open vowels, but same pitch and volume). Version C: change only harmonic tension and lyric specificity (tenser chords, more universal words, but same range and dynamics). Play all three versions.", why: "Selective contrast is more sophisticated than full contrast. When only 2-3 dimensions shift, the contrast is subtle but unmistakable — the listener feels the section change without being overwhelmed. This is the difference between a rock anthem (all 6 dimensions) and an indie-folk song (2-3 dimensions). Both are valid; the art is choosing." },
        { text: "Which 2-3 dimension combination created the most effective contrast for YOUR voice and YOUR songs? Some voices thrive on pitch contrast (wide range). Others thrive on dynamic contrast (whisper to belt). Others on rhythmic contrast (sparse to dense). Find your signature contrast palette — the dimensions that YOUR body responds to most powerfully.", why: "Every artist has a natural contrast palette. Khruangbin's contrast is mainly rhythmic density and guitar texture (2 dimensions). DOPE LEMON's is dynamics and vowel openness (2 dimensions). Hermanos Gutiérrez is harmonic tension and pitch range (2 dimensions). Finding YOUR palette — the 2-3 dimensions that create the most natural, powerful contrast in your specific voice — is finding your artistic identity as a songwriter." },
        { text: "Record your best verse-chorus with your chosen contrast palette. Listen back. Can you hear each dimension contributing? The transition should feel like a room changing — same space, different light. End-of-exercise: from silence, audiate the verse body state (where it lives in the body), then audiate the chorus body state. Feel the migration between them. That migration IS your song's emotional arc.", why: "The recording test keeps contrast honest — if the shift isn't audible on playback, it's in your head, not in the performance. Push each dimension further until playback reveals it. Then audiation confirms embodiment: when you can feel the section change in your body without external sound, the contrast lives in you, not just in the guitar." }
      ],
      feel: "Stacking contrast dimensions should feel like a full-body transformation between sections — the verse contracts the body inward (low, quiet, sparse, closed, resolved, specific) and the chorus expands it outward (high, loud, dense, open, tense, universal). The transition between them is a physical event: posture opens, breath deepens, resonance migrates from belly to mask. When all 6 dimensions shift simultaneously, the body literally changes shape between verse and chorus. When only 2-3 shift, the change is subtler but still physically real — a warmth spreading, a lift arriving, an opening that wasn't there before.",
      wrong: "If the verse and chorus still sound the same after toggling dimensions, you're not pushing far enough. Exaggerate each dimension until it feels almost comical: whisper the verse, shout the chorus. Sing the verse on one note, the chorus across an octave. Then dial it back 20%. The 'too much' point teaches you where 'just right' lives. VOCAL TIP: the vowel dimension is the most overlooked — try singing a verse entirely on 'oo' (closed, interior) and a chorus entirely on 'ah' (open, radiating). Feel the body difference. Then apply that vowel awareness to real lyrics: choose words with closed vowels for verses and open vowels for choruses.",
      sarah: "Gene, the Allah-Las are masters of subtle multi-dimensional contrast — their verses and choruses share the same laid-back vibe, but the shift is unmistakable because they turn 2-3 dimensions simultaneously. Your porch-register voice has incredible dynamic range that you don't always use — the difference between your quiet storytelling voice and your full-chest projection is at least 2 dimensions of contrast right there. And here's the advanced move for vowels: your best chorus melodies should land on OPEN vowels. 'Ah,' 'oh,' 'ay' — these vowels project from the mask. Words like 'sky,' 'home,' 'ride,' 'day' are chorus words. Words like 'still,' 'beneath,' 'murmur,' 'drift' are verse words. Choose your lyrics for their vowel colors, not just their meaning.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      pitchContour: true,
      recorder: true,
      levelUp: "Can compose and perform a fully arranged original song with verse/chorus/bridge structure, dynamic mapping, intentional intros/outros, and contrasting sections. Can build pre-choruses using rising melody, rhythmic acceleration, and harmonic suspension (individually and stacked) to create anticipation. Can identify, create, and combine 4 types of hooks (melody, rhythm, lyric, guitar) for maximum stickiness. Can manipulate 6 independent dimensions of contrast (pitch range, rhythmic density, dynamics, vowel openness, harmonic tension, lyric specificity) to create sophisticated verse-chorus differentiation. Can deconstruct professional songs architecturally, rewrite with fresh ears after 48 hours, compose in non-standard forms, and refine arrangements through systematic multi-pass editing."
    },
    {
      id: "ss-12-17",
      time: 8,
      title: "AABA Composition",
      type: "song",
      what: "Write a 32-bar AABA tune: Say something (A), say it again (A), change (B), return (A). The B section changes the MEANING of A when it comes back. This is the form behind Nick Drake\u2019s \u2018Pink Moon,\u2019 most jazz standards, and half of James Taylor\u2019s catalog. It\u2019s circular \u2014 it returns home, but the journey changes what home means.",
      setup: "Guitar. Any chord progression. Recorder ready.",
      steps: [
        { text: "Write an 8-bar A section: a verse with melody and simple lyrics. Keep it conversational \u2014 you\u2019re telling someone something.", why: "The A section establishes the musical and lyrical world. It should feel complete enough to stand alone but open enough to repeat without feeling redundant." },
        { text: "Play A again with different lyrics. Same melody, same chords, new words. The second A should deepen the first \u2014 a new angle on the same feeling.", why: "The repeated A with new lyrics creates the illusion of exploration within a stable framework. The listener feels safe (same melody) while being drawn deeper (new words)." },
        { text: "Write a B section: 8 bars with DIFFERENT chords, DIFFERENT melody, DIFFERENT emotional register. If A is intimate, B is expansive. If A is grounded, B takes flight. The B section should surprise.", why: "The B section\u2019s function is to change the meaning of A when it returns. If A says \u2018I\u2019m content,\u2019 B might reveal \u2018but I wasn\u2019t always\u2019 \u2014 so when A returns, \u2018I\u2019m content\u2019 now carries the weight of what came before." },
        { text: "Return to A: play it one more time. Listen to how the B section changed its meaning. The same melody, the same chords \u2014 but they sound different now. Record the full AABA. Does the return feel like coming home after a journey?", why: "The final A is the test of the form. If it feels exactly like the first A, the B section didn\u2019t do its job. If it feels transformed \u2014 warmer, sadder, deeper, more knowing \u2014 the AABA structure is working." }
      ],
      feel: "AABA should feel circular, like a meditation. A-A builds comfort. B creates surprise. The final A resolves with new understanding.",
      wrong: "If the B section sounds like another verse, you haven\u2019t departed far enough. Change the key, change the register, change the emotional direction. The B section must feel like stepping into a different room.",
      sarah: "Gene, AABA is the form behind half of Nick Drake\u2019s songs and most jazz standards. It\u2019s circular like your desert blues loops but with a plot twist in the middle. \u2018Pink Moon\u2019 is a perfect example \u2014 the same gentle phrase keeps returning, but each time it means something slightly different.",
      phraseForm: { pattern: ["A", "A", "B", "A"], barsPerSection: 8, labels: { A: "Verse", B: "Bridge" } },
      recorder: true
    },
    {
      id: "ss-12-18",
      time: 8,
      title: "Energy Arc Mapping",
      type: "song",
      what: "BEFORE writing a note, draw the energy curve of your song on paper. X-axis = time (sections from intro through outro). Y-axis = intensity (1-10). Plot where tension builds (rising line), where it releases (falling), and where elements are REMOVED to create implied tension (dotted line \u2014 removing instruments or simplifying creates anticipation through absence). Then compose to match the curve. The visual blueprint prevents the \u2018flat energy\u2019 trap where every section sounds the same.",
      setup: "Paper and pen. Guitar. One of your existing songs from L9-L11.",
      steps: [
        { text: "Draw an energy arc for a reference song you love \u2014 one of Gene\u2019s playlist favorites. X-axis: Intro, V1, Ch1, V2, Ch2, Bridge, Ch3, Outro. Y-axis: 1-10 intensity. Plot each section. Notice: where is the peak? Where does energy DIP before the peak? The dip before the peak is \u2018implied tension.\u2019", why: "Analyzing a reference song visually reveals structural patterns that listening alone misses. The Holistic Songwriting method (Friedemann Findeisen, 400K+ YouTube subscribers) treats energy mapping as the FIRST step of composition." },
        { text: "Now draw the energy arc for YOUR song. Be honest about where it is now. If the curve is flat (everything at the same level), that\u2019s the problem this exercise solves.", why: "Most first-draft songs have flat energy \u2014 every section at 5/10. The visual reveals this immediately, while listening can mask it because the songwriter hears the song they imagined, not the song that exists." },
        { text: "Identify tools for each segment of your arc. RISING energy: add strum density, vocal intensity, higher register, louder dynamics. FALLING energy: simplify guitar, drop volume, lower register. IMPLIED TENSION: remove elements (stop strumming, just voice; stop singing, just guitar). Absence creates anticipation.", why: "Implied tension is the most underused tool for solo performers. When you REMOVE the guitar for 2 bars, the silence creates more anticipation than adding another instrument would. The listener\u2019s brain fills the gap with expectation." },
        { text: "Perform the song following your drawn arc. Compare: does the performance match the blueprint? Record and listen back against the drawing. The visual and the audio should tell the same story.", why: "The gap between the blueprint and the performance reveals where your habits override your intentions. If you drew a dip before the final chorus but performed it at full intensity, that\u2019s a coordination gap between vision and execution." }
      ],
      feel: "Energy arc mapping should feel like being a film director \u2014 you\u2019re deciding where the camera lingers, where it cuts, where the music swells. You\u2019re an architect before you\u2019re a performer.",
      wrong: "If you skip the drawing and just \u2018feel it,\u2019 you\u2019ll default to flat energy. The visual forces deliberate choices. Don\u2019t resist the pen \u2014 it\u2019s a tool, not a constraint.",
      sarah: "Gene, this is the visual method from Holistic Songwriting. Your Dynamic Mapping exercise (ss-12-9) planned dynamics after writing. This exercise plans the energy FIRST and lets it guide the composition. It\u2019s the difference between navigating by feel and navigating with a map \u2014 both can work, but the map gets you there faster.",
      recorder: true,
      volumeMeter: true
    },
    {
      id: "ss-12-19",
      time: 7,
      title: "Fingerpick Verses, Strum Choruses",
      type: "song",
      what: "The solo performer\u2019s arrangement trick: fingerpick your verses (intimate, delicate, close), strum your choruses (energy, fullness, open). The texture change IS the section change \u2014 your guitar becomes two different instruments. One guitar, two sounds, two emotional worlds. Add: tap the guitar body on beats 2 and 4 during verses for percussion, then STOP tapping in choruses. The contrast creates a dynamic shift without a band.",
      setup: "Guitar. One of your songs with a clear verse-chorus structure.",
      steps: [
        { text: "Play your verse with simple fingerpicking: thumb on bass strings, index/middle on treble. Keep it sparse \u2014 let the notes breathe. Sing in your porch register (E3-B3). The verse should feel intimate, like a whispered secret.", why: "Fingerpicking creates a completely different sonic texture than strumming. The notes are separated, each one audible. This intimacy draws the listener in." },
        { text: "When the chorus arrives, switch to strumming. Full chords, more volume, higher vocal register (B3-E4). Feel the energy lift \u2014 not because you\u2019re trying harder, but because the guitar texture changed.", why: "The texture change creates the section change. No band needed. The shift from fingerpicking to strumming is the acoustic equivalent of a full arrangement change." },
        { text: "Add body percussion to the verses: tap the guitar body with your fingertips on beats 2 and 4, between fingerpicked notes. This adds a subtle rhythmic pulse. In the chorus, STOP tapping \u2014 the strum provides its own rhythm.", why: "Body percussion in verses adds rhythmic interest without volume. Stopping it in the chorus creates another layer of contrast \u2014 the absence of the tap is felt even if the listener can\u2019t name it." },
        { text: "Play the full song: verse (fingerpick + body tap) \u2192 chorus (strum, no tap) \u2192 verse \u2192 chorus. Record and listen back. The texture changes should create a clear dynamic arc without you changing volume at all.", why: "If you can hear the sections without looking at lyrics, the texture arrangement is working. The guitar is doing the arranging that a band would normally do." }
      ],
      feel: "Verses should feel like sitting beside someone on a porch. Choruses should feel like standing up and opening your arms. Same guitar, same player \u2014 different energy.",
      wrong: "If your fingerpicking sounds labored, simplify to thumb-only alternating bass (you\u2019ll learn full fingerpicking technique in Level 14). The texture contrast matters more than technique.",
      sarah: "Gene, this is how Jack Johnson makes one acoustic guitar sound like a full arrangement. Angus Stone does the same thing on DOPE LEMON\u2019s quieter tracks \u2014 fingerpicked verses that bloom into strummed choruses. You don\u2019t need a band. You need two textures.",
      volumeMeter: true,
      recorder: true
    }
  ]
};
