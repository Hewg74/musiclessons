import { getPitchRange } from "../appData.js";

export const level11 = {
  level: 11,
  title: "Song Architecture",
  subtitle: "Verses tell stories. Choruses tell truths.",
  description:
    "You can create melodies and feel harmony. Now build complete songs with intentional structure — verse/chorus/bridge, dynamic arcs, intros and outros. Based on Berklee's songwriting sequence: melody and structure are taught together because they're inseparable. A great melody in a bad structure is a wasted melody.",
  artists: "DOPE LEMON, Nick Drake, Skinshape, BALTHVS",
  unlocks: "Lyrics & Songcraft (Level 12)",
  review: { label: "Level 9-10 Check-In", time: 5, exercises: ["ss-9-7", "ss-10-6"], prompt: "Play your complete original (ss-9-7). Then improvise over a new progression for 2 minutes (ss-10-6). Both confident? Move on." },
  exercises: [
    {
      id: "ss-11-1",
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
      feel: "Good verse writing should feel like telling a story to a friend — each section reveals something new, but the voice (melody) stays consistent. The listener leans in because the story progresses.",
      wrong: "If both verses are identical, add variation. If they sound unrelated, keep more of the original melody intact. The sweet spot is 'the same but different.'",
      sarah: "Gene, your verses should sound like you talking on the lanai — relaxed, descriptive, in no hurry. The porch register IS the verse voice.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "B3"),
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      recorder: true
    },
    {
      id: "ss-11-2",
      time: 8,
      title: "Chorus Lift",
      type: "song",
      what: "Create a chorus that LIFTS from the verse — higher melody, more energy, simpler lyrics, stronger groove. The chorus is the emotional peak. It should feel like the verse was building toward it. Use contrast in range, rhythm, and delivery.",
      steps: [
        { text: "Take your verse from ss-11-1. Identify its highest note. Your chorus should start at or above that note.", why: "Choruses lift above verses in range. Even a minor 3rd higher creates obvious sectional contrast." },
        { text: "Create a chorus melody with a simpler rhythm — longer notes, more repetition, more singable. Verses can be intricate; choruses must be memorable.", why: "Chorus simplicity is what makes them stick. The listener should be able to sing along after hearing it once." },
        { text: "Increase your strum intensity for the chorus. More volume, fuller strumming, maybe switch from fingerpick to strum or from chop to full strum.", why: "The guitar reinforces the dynamic shift. A louder, fuller guitar signals 'chorus' to the listener's subconscious." },
        { text: "Play verse → chorus → verse → chorus. The transition into the chorus should feel like a door opening into a bigger room.", why: "The verse-to-chorus transition is the most important moment in the song. It's the payoff for the setup." }
      ],
      feel: "The chorus should feel like taking a deep breath and letting it out. Expansive, released, open. If the verse is intimate conversation, the chorus is singing from a rooftop.",
      wrong: "If the chorus doesn't feel different from the verse, push the contrast harder. Sing louder, higher, with simpler words. If it feels forced, the range jump might be too large — bring it down a step.",
      sarah: "Gene, the chorus is where your voice opens up slightly from the porch register — still relaxed, but with more chest resonance and conviction. Not belting — just more present.",
      metronome: 85,
      referencePitches: getPitchRange("B3", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-11-3",
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
      feel: "The bridge should feel like stepping off the familiar path into the woods. Brief disorientation, then a new vista. When the chorus returns after the bridge, it should feel like reunion.",
      wrong: "If the bridge sounds like another verse, the chords and melody aren't different enough. Push further away from the song's established patterns. The bridge should feel like a different song for 8 bars.",
      sarah: "Gene, bridges are optional but powerful. Not every song needs one. But when you have one, it's usually the most interesting 8 bars in the song.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true
    },
    {
      id: "ss-11-4",
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
      id: "ss-11-5",
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
      feel: "A dynamically mapped song should feel like a complete emotional journey — arrival, building, peak, release, resolution. Like watching a sunset from start to finish.",
      wrong: "If the whole song is one volume, your dynamics aren't translating. Push the contrast harder. Whisper. Then project. Then whisper again. The range between soft and loud IS the performance.",
      sarah: "Gene, dynamics are the difference between someone who plays songs and someone who tells stories with music. This is where you become a performer.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-11-6",
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
      feel: "A fully arranged song should feel like a journey with a beginning, middle, and end. When you reach the outro, you should feel like you've been somewhere and returned.",
      wrong: "If the arrangement feels too long, cut the second verse or bridge. If it feels rushed, add 4 bars to the sections that need more space. Structure serves the song, not the other way around.",
      sarah: "Gene, this is album-quality songwriting. A fully arranged original with dynamics, structure, and intention. This is what performing singer-songwriters do.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      volumeMeter: true,
      checklist: true,
      recorder: true,
      phraseForm: { pattern: ["Intro", "V1", "Ch", "V2", "Ch", "Br", "Ch", "Outro"], barsPerSection: [4, 8, 8, 8, 8, 8, 8, 4], labels: { Intro: "Intro", V1: "Verse 1", V2: "Verse 2", Ch: "Chorus", Br: "Bridge", Outro: "Outro" } },
      volumeContour: true,
      levelUp: "Can compose and perform a fully arranged original song with verse/chorus/bridge structure, dynamic mapping, intentional intros/outros, and contrasting sections."
    }
  ]
};
