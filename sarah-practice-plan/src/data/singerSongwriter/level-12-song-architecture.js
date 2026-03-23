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
        { text: "Pick a chord progression and create a verse melody in your lower range. Sing it with 'la' to establish the shape. This is Verse 1's melody.", why: "The verse melody is the narrative vehicle. It sits low and intimate, allowing lyrics to be heard clearly." },
        { text: "Create Verse 2: same melody shape, but vary 2-3 notes. Maybe the ending rises instead of falls, or one phrase adds an extra note.", why: "Verse variation keeps the listener interested. Too much repetition = boring. Too much change = confusing. Change 20-30% and keep 70-80%." },
        { text: "Add different words to each verse. Verse 1 sets the scene. Verse 2 develops it — adds detail, a character, or a shift in perspective.", why: "Lyric development across verses creates narrative motion. The song goes somewhere. Each verse adds a new piece to the puzzle." },
        { text: "Play V1 → V2 back to back. Can you hear the familiarity AND the freshness? The melody should feel like the same speaker telling a continuing story.", why: "The balance of familiar and fresh is the art of verse writing. Too much repetition and the ear tunes out. Too much novelty and it feels like two different songs." }
      ],
      feel: "Good verse writing should feel like telling a story to a friend — each section reveals something new, but the voice stays consistent. The verse lives in your chest: grounded, intimate, the resonance of someone speaking honestly. Your body should feel settled, weight in the chair, breathing low and easy. When the verse melody sits in its natural chest register, the words carry the warmth of the body behind them.",
      wrong: "If both verses are identical, add variation. If they sound unrelated, keep more of the original melody intact. The sweet spot is 'the same but different.'",
      sarah: "Gene, your verses should sound like you talking on the lanai — relaxed, descriptive, in no hurry. The porch register IS the verse voice.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "B3"),
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-12-2",
      time: 8,
      title: "Chorus Lift",
      type: "song",
      what: "Create a chorus that LIFTS from the verse — higher melody, more energy, simpler lyrics, stronger groove. The chorus is the emotional peak. It should feel like the verse was building toward it. Use contrast in range, rhythm, and delivery.",
      steps: [
        { text: "Take your verse from ss-12-1. Identify its highest note. Your chorus should start at or above that note.", why: "Choruses lift above verses in range. Even a minor 3rd higher creates obvious sectional contrast." },
        { text: "Create a chorus melody with a simpler rhythm — longer notes, more repetition, more singable. Verses can be intricate; choruses must be memorable.", why: "Chorus simplicity is what makes them stick. The listener should be able to sing along after hearing it once." },
        { text: "Increase your strum intensity for the chorus. More volume, fuller strumming, maybe switch from fingerpick to strum or from chop to full strum.", why: "The guitar reinforces the dynamic shift. A louder, fuller guitar signals 'chorus' to the listener's subconscious." },
        { text: "Play verse → chorus → verse → chorus. The transition into the chorus should feel like a door opening into a bigger room.", why: "The verse-to-chorus transition is the most important moment in the song. It's the payoff for the setup." }
      ],
      feel: "The chorus should feel like taking a deep breath and letting it out — the resonance lifts from the chest into the mask. Your posture opens: shoulders back, chin slightly up, the body expanding. If the verse is intimate conversation grounded in the chest, the chorus is singing from a rooftop with the sound vibrating behind your cheekbones. That physical lift IS the chorus. Your body migrates upward, and the song follows.",
      wrong: "If the chorus doesn't feel different from the verse, push the contrast harder. Sing louder, higher, with simpler words. If it feels forced, the range jump might be too large — bring it down a step.",
      sarah: "Gene, the chorus is where your voice opens up slightly from the porch register — still relaxed, but with more chest resonance and conviction. Not belting — just more present. Try the DOPE LEMON major→minor trick for emotional shift between sections: D→Dm, G→Gm — the major version for the hopeful verse, the minor version for the bittersweet chorus. Same chord, one fret changes the 3rd. The emotional effect is like sunset — beautiful but ending. Use this to create a verse→chorus emotional shift that the listener feels in their gut.",
      metronome: 85,
      referencePitches: getPitchRange("B3", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-12-3",
      time: 8,
      title: "Bridge: The Departure",
      type: "song",
      what: "Write a bridge — the section that's DIFFERENT from both verse and chorus. New chords, new melody, new perspective. The bridge is the 'plot twist' of the song. It creates contrast that makes the final chorus feel earned.",
      steps: [
        { text: "If your verse/chorus uses G-C-D-Em, try bridge chords that haven't appeared yet: Am-F-Dm-G, or just Am for 8 bars.", why: "New chords signal 'something different is happening.' The bridge breaks the pattern the listener has learned, creating surprise." },
        { text: "Bridge melody: use a different contour from both verse and chorus. If verse descends and chorus rises, make the bridge zigzag or stay flat.", why: "Contour contrast makes the bridge unmistakable. The listener's ear recognizes it as new territory immediately." },
        { text: "Bridge lyrics should shift perspective: if verses are observational ('I see...'), the bridge reflects ('I wonder...'). Or the bridge reveals something the verses hid.", why: "The lyric shift reinforces the musical departure. Bridge lyrics often contain the song's deepest insight or most vulnerable admission." },
        { text: "Full form: V1 → Chorus → V2 → Chorus → Bridge → Final Chorus. The bridge makes the final chorus hit harder.", why: "The departure-return is the most powerful structure in music. Leaving home (bridge) makes coming home (final chorus) feel triumphant." }
      ],
      feel: "The bridge should feel like stepping off the familiar path into the woods — the resonance might move to the head voice, or narrow into the throat, or settle into an unfamiliar part of the body. Brief disorientation: where does this section live? Not in the chest (verse) or the mask (chorus), but somewhere unexpected. When the chorus returns after the bridge, your body migrates back to the mask and the reunion is physical — you can feel the homecoming in your posture.",
      wrong: "If the bridge sounds like another verse, the chords and melody aren't different enough. Push further away from the song's established patterns. The bridge should feel like a different song for 8 bars.",
      sarah: "Gene, bridges are optional but powerful. Not every song needs one. But when you have one, it's usually the most interesting 8 bars in the song.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true
    },
    {
      id: "ss-12-4",
      time: 7,
      title: "Pre-Chorus: The Ramp",
      type: "song",
      what: "The 2-4 bar section between verse and chorus that builds anticipation. Rising melody, building dynamics, harmonic tension — often landing on the V chord. Write a pre-chorus for one of your L9 songs. The pre-chorus makes the chorus arrival feel inevitable and earned.",
      steps: [
        { text: "Take your verse and chorus from ss-12-1/ss-12-2. Sing the last line of the verse, then jump straight into the chorus. Notice the gap — the verse ends intimate, the chorus starts big. The pre-chorus fills that gap.", why: "Without a pre-chorus, the verse-to-chorus transition can feel abrupt. The ramp smooths the dynamic shift and builds anticipation — like a plane accelerating before takeoff." },
        { text: "Write 2-4 bars of melody that sit BETWEEN the verse's low range and the chorus's high range. Start near the verse's top note and rise toward the chorus's starting note. Use shorter, more urgent phrases.", why: "The pre-chorus melody creates a literal pitch ramp. Rising pitch triggers anticipation in the listener's brain — they can feel the chorus coming before it arrives." },
        { text: "Harmonically, move toward the V chord (D if you're in G, E if you're in Am). The V chord creates tension that resolves when the chorus lands on I. Try: pre-chorus ends on V... pause... chorus explodes on I.", why: "The dominant chord is the most tension-heavy chord in the key. Ending the pre-chorus on V is like pulling back a slingshot — the chorus is the release." },
        { text: "Build dynamics through the pre-chorus: start at the verse's mp volume and crescendo to the chorus's f. Increase strum intensity bar by bar. Record the full V → Pre-Chorus → Chorus sequence.", why: "Dynamic building reinforces the melodic and harmonic ramp. All three dimensions — pitch, harmony, volume — should point toward the chorus like arrows." }
      ],
      feel: "The pre-chorus should feel like the moment on a roller coaster when you're climbing the hill — your body is migrating from the chest (verse) toward the mask (chorus), and you can feel the transition happening in real time. The resonance rises, the breath deepens in preparation, the body leans forward. The anticipation is physical: your whole body knows the chorus is about to arrive before the chord change confirms it.",
      wrong: "If the pre-chorus sounds like another verse, the melody isn't rising enough. If it sounds like an early chorus, it's too high and too loud too soon. The ramp must be clearly between verse and chorus energy.",
      sarah: "Gene, pre-choruses are the secret weapon in psych-surf and reggae-rock. That 2-bar ramp before the chorus drops — Allah-Las do this constantly. It's what makes their choruses hit so hard.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
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
        { text: "Find the weakest section (lowest stickiness score). Now write a new hook for it using a DIFFERENT hook type than the section currently uses. If the verse has a weak melodic hook, try a rhythmic hook instead.", why: "Switching hook types forces creative thinking. A section that fails as a melody might succeed as a rhythm. Cross-pollinating hook types strengthens the whole song." },
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
        { text: "Now stack three high-contrast dimensions together. For example: verse = low range + fingerpick + quiet. Chorus = high range + strum + loud. Play the transition. Feel how multiple dimensions amplify the shift.", why: "Stacking contrast dimensions creates multiplicative impact. One dimension of contrast sounds subtle. Three dimensions sounds like a different song section. This is what makes professional chorus arrivals hit hard." },
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
        { text: "Create an intro: 4-8 bars of guitar only. Use the chorus chords at a softer dynamic. Establish the feel, tempo, and mood before you sing.", why: "The intro is a promise — it tells the listener what kind of experience is coming. A gentle fingerpicked intro promises intimacy. A driving jangle promises energy." },
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
        { text: "Practice each dynamic level separately: play just the intro at pp, just the chorus at f, just the bridge at p. Get comfortable at each volume.", why: "Each dynamic level requires different strum technique, breath support, and vocal delivery. Practice them individually before combining." },
        { text: "Play the full song following your dynamic map. Exaggerate the differences — whisper the quiet parts, project the loud parts.", why: "Exaggeration in practice creates subtlety in performance. What feels dramatic alone sounds natural to a listener." },
        { text: "Record it. Listen back. Can you hear the dynamic journey? The song should breathe — expanding and contracting like a living thing.", why: "The recording reveals whether your dynamics are audible or imagined. If the loud and quiet parts sound similar, push the contrast further." }
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
        { text: "Pick a song you wrote at least 2 days ago. Don't look at notes or recordings first. Play it from memory — whatever you remember IS the song. What you forgot wasn't memorable enough.", why: "Memory is the first editor. If you can't remember a phrase after 48 hours, the listener won't remember it after 48 seconds. What sticks is what works." },
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
      what: "Beyond verse-chorus: (1) AAA (strophic — same melody, different lyrics each verse, like folk and blues), (2) ABAC (verse-chorus-verse-different chorus), (3) Through-composed (no repeated sections — a journey), (4) One-section loop (Tinariwen: one groove, evolving lyrics). Write a short piece in a non-standard form.",
      steps: [
        { text: "Write a 3-verse AAA song: same chord progression, same melody, three different sets of lyrics. No chorus. The melody carries the song; the lyrics tell a story across three verses. Think Dylan, Nick Drake, desert blues.", why: "Strophic form is the oldest song structure — it trusts the melody and lyrics completely. Without a chorus to lean on, every verse must be compelling. This builds lyric-writing muscle." },
        { text: "Now try a one-section loop: one 4-8 bar progression that repeats for 2-3 minutes. The groove never changes. Instead, evolve the lyrics — start simple, add detail, build intensity, resolve. Like Tinariwen or early reggae.", why: "The loop form teaches you that repetition isn't boring — it's hypnotic. When the music stays constant, small changes in lyrics, delivery, or dynamics become magnified. Less structure, more presence." },
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
        { text: "Pass 4 — Vocal delivery: Sing the song focusing ONLY on how your voice sounds. Verse: intimate, close, conversational. Chorus: open, projected, confident. Bridge: vulnerable, uncertain. Record the full four-pass refined arrangement.", why: "Vocal delivery is the final layer. When melody, dynamics, texture, and delivery all shift between sections, the song transforms from a sequence of chords into a performed piece of art." }
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
        { text: "Mark the dynamic arc on your structure: pp → mp → f → mp → f → p → ff → pp. Practice each transition.", why: "Dynamics and structure work together. The bridge's drop to p makes the final chorus ff feel earned." },
        { text: "Practice transitions: verse → chorus (the lift). Chorus → verse (the settle). Verse → bridge (the departure). Bridge → final chorus (the arrival). Each transition is a mini-performance.", why: "Transitions are where songs fall apart or come alive. Smooth transitions create flow; jarring ones break immersion." },
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
      levelUp: "Can compose and perform a fully arranged original song with verse/chorus/bridge structure, dynamic mapping, intentional intros/outros, and contrasting sections. Can build pre-choruses that create anticipation, identify and strengthen hooks across 4 types, deconstruct professional songs architecturally, use 6 dimensions of contrast between sections, rewrite with fresh ears after 48 hours, compose in non-standard forms, and refine arrangements through systematic multi-pass editing."
    }
  ]
};
