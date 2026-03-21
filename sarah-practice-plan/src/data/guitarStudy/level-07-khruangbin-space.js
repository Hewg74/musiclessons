import { getPitchRange } from "../appData.js";

export const level7 = {
  level: 7,
  title: "Khruangbin Space",
  subtitle: "Maximum restraint. Every note must earn its place.",
  description:
    "Khruangbin's guitar approach is anti-guitar-hero: soft pick attack, behind-the-beat phrasing, global pentatonic flavors, and more silence than sound. Mark Speer treats the tone knob as an instrument, rolls between bright and warm constantly, and uses chromatic approach notes to add Eastern and global flavors. This level teaches restraint as a form of mastery — saying the most with the least.",
  artists: "Khruangbin, Tommy Guerrero, Skinshape",
  unlocks: "Soul & Extended Chords (Level 8)",
  review: { label: "Level 4 Check-In", time: 5, exercises: ["gs-4-1", "gs-4-12"], prompt: "Play a 2-minute reggae offbeat skank with ghost notes on Am7-Dm7 (gs-4-1). Then play the full reggae jam with chord changes and dub spaces (gs-4-12). The offbeat discipline and space awareness are both foundations for Khruangbin's approach — rhythm precision meets restraint." },
  exercises: [
    {
      id: "gs-7-1",
      time: 8,
      title: "Three-Note Voicings",
      type: "guitar",
      what: "Learn chord fragments on the top 3 strings with the root omitted. Am top 3 strings becomes A+C+E, Dm becomes A+D+F. These minimal voicings sound open, ambiguous, and modern — the Khruangbin harmonic palette. The bass player defines the chord; you add color.",
      steps: [
        { text: "Play Am as a full chord (x02210). Now strip it down to just the top 3 strings: play only the G, B, and E strings. You get the notes A (G string 2nd fret), C (B string 1st fret), E (open high E) — a complete Am triad in a compact, bright voicing.", why: "Removing the root makes the chord ambiguous — it could be several things depending on the bass note underneath. This openness is the Khruangbin sound. Mark Speer said: 'I'm not a guitar player — I play THAT guitar.' His influences are reggae and zouk guitarists, not rock players. He listens to singers more than guitarists. The bass player (Laura Lee) defines the chord; Mark Speer adds color — and that division of labor is the whole architecture." },
        { text: "Find 3-note voicings for Dm (top 3 strings of xx0231: A, D, F), Em (open G, open B, open E — the simplest voicing), G (top 3 strings of 320003: G, B, G), and C (top 3 strings of x32010: G, C, E). Each chord is just 2-3 unique notes.", why: "Three-note voicings are transparent — they suggest harmony without declaring it. This leaves room for the bass to define the chord and air to flow between the notes." },
        { text: "Play a progression using only these stripped-down voicings: Am-Dm-G-C with 3 notes each. Strum only the top 3 strings. Notice how airy and spacious it sounds compared to full chords.", why: "Full chords fill the sonic space like oil paint. Three-note voicings are watercolors — lighter, more transparent, more suggestive." },
        { text: "Try playing these voicings with a soft pick attack — barely touching the strings. Let the notes whisper. This is the dynamic foundation for everything in Level 7.", why: "Khruangbin's dynamics are crucial. Soft attack + open voicings = the spacious, floating sound that defines their guitar tone." }
      ],
      feel: "Three-note voicings should feel like watercolors compared to full chords — lighter, more transparent, more suggestive. The sound should float rather than pound.",
      wrong: "If the chords sound thin or weak, you might be muting strings accidentally — check your fretting. If they sound like full chords, you're including too many strings. If they sound empty, you're not letting the notes sustain long enough.",
      sarah: "Mark Speer said he thinks of his guitar as a melodic instrument, not a rhythm instrument. These voicings blur the line between chords and melody — that's the point. You're not strumming; you're painting.",
      metronome: 80,
      recorder: true,
      levelUp: "Play the Am-Dm-G-C progression using only 3-note voicings on the top 3 strings with soft pick attack. Each chord rings clearly with no muted strings. Recording confirms the sound is airy and transparent — not thin, not full."
    },
    {
      id: "gs-7-2",
      time: 8,
      title: "Soft Pick Attack — The Flatwound Feel",
      type: "guitar",
      what: "Transform your tone by changing your pick attack: pick further from the bridge, use a softer touch, and aim for a round, warm sound with no treble bite. Mark Speer uses flatwound strings for their smooth, warm tone. You can approximate that sound with technique alone.",
      setup: "Neck pickup if you have a pickup selector. Tone knob rolled back to about 50-60%. No overdrive — clean tone only.",
      steps: [
        { text: "Play an open A string with your normal picking position and force. Listen to the tone — you'll hear an initial 'tick' attack sound followed by the sustain. Now move your picking hand halfway between the bridge and the neck, and reduce your force by half. Pick the same string. The 'tick' vanishes; the note blooms.", why: "Picking position radically changes tone. Near the bridge is bright and snappy. Near the neck is warm and round. Soft force removes the transient attack, letting the note speak without shouting." },
        { text: "Play a full Am pentatonic phrase with this soft, neck-position attack. Compare it to the same phrase with your normal picking. It should sound like a completely different instrument.", why: "The same notes played with a different attack sound like two different guitars. Mark Speer's influences reveal why: he studied reggae and zouk guitarists — players who prioritize touch and groove over flash. He listens to singers more than guitarists, which is why his phrasing breathes like a vocal line. His tone starts with his hands, not his gear." },
        { text: "Try fingerpicking instead of using a pick. Thumb for bass notes, index and middle fingers for melody. This is the warmest possible tone — fingers are softer than any pick.", why: "Fingers produce almost no transient attack. Many Khruangbin-inspired tones are achieved with hybrid picking (pick + fingers) or pure fingerstyle." },
        { text: "Play a 2-minute improv using only soft attack. If you catch yourself picking hard, consciously pull back. The loudest note you play should be what would normally be your softest.", why: "Resetting your dynamic baseline is the point. You're training your hands to live in a softer world. Once this feels natural, you can choose to play loud — but your default becomes gentle and controlled." }
      ],
      feel: "The soft attack should feel like you're coaxing sound from the guitar, not forcing it. Notes should bloom — a slow, warm envelope instead of a sharp spike. It feels gentle, intimate, and controlled.",
      wrong: "If the notes are too quiet to hear, you've gone too soft — find the threshold where notes speak clearly but without any pick attack noise. If they still have that pick 'tick,' you're still too close to the bridge or picking too hard.",
      sarah: "Mark Speer uses flatwound strings, which have no brightness at all. You can get close to that sound with roundwound strings by changing your technique — pick position and attack do 80% of the work. The remaining 20% is the tone knob, which we'll get to next.",
      metronome: 80,
      volumeMeter: true,
      levelUp: "Play a 2-minute improv using only soft, neck-position pick attack. No pick 'tick' is audible on any note. Recording confirms every note blooms with a warm, round envelope — no transient spike. The loudest note would normally be your softest."
    },
    {
      id: "gs-7-3",
      time: 10,
      title: "40% Silence — The Space Rule",
      type: "guitar",
      recorder: true,
      volumeMeter: true,
      rhythmCells: ["rest", "rest", "note", "rest"],
      what: "Play a short phrase. Then wait twice as long as you want to before playing the next one. Record 2 minutes and listen back. Count the silence. Your target: at least 40% of the recording should be silence. This is calibrated to Khruangbin's actual recordings.",
      setup: "Record yourself. Any tone. Backing track optional.",
      steps: [
        { text: "Play a 3-4 note phrase using any scale you've learned. Then stop. Feel the urge to play again. Count how many seconds you want to wait.", why: "Your instinct will say 'play now!' — that urge to fill silence is what we're training against. Mark Speer (Khruangbin) said: 'Don't be afraid of space. You can spend your time filling up every section of the sonic void, or you can embrace that space.' Most guitar curricula teach you to play more. This exercise teaches you to play less — and that's harder." },
        { text: "Whatever your instinct says, double the wait time. If you want to wait 2 seconds, wait 4. If 4, wait 8. Sit in the silence. Let it become comfortable.", why: "Doubling your natural pause length pushes you into uncomfortable silence. That discomfort is growth." },
        { text: "Play another phrase. Not necessarily a response to the first one — a new thought, born from the silence that preceded it. Continue for 2 minutes.", why: "When silence is long enough, the next phrase isn't a reaction — it's a fresh idea. This creates spacious, meditative music rather than continuous chatter." },
        { text: "Stop recording. Listen back without your guitar in your hands. Count the seconds of silence vs. playing. Calculate the percentage: silence seconds divided by 120 total seconds.", why: "Recording reveals the truth: silence that felt eternal while playing sounds perfectly natural from the outside. And most players discover they left far less space than they thought." },
        { text: "If silence is less than 40% (less than 48 seconds of silence in 2 minutes), record again. This time, actively resist every urge to play. Silence is the exercise, not the pause between exercises.", why: "The 40% target is calibrated to Khruangbin's actual recordings. They play less than most people realize — the space is what makes the notes matter." }
      ],
      feel: "The silence should eventually feel charged — not empty, but full of potential. Each phrase should feel like it appeared at exactly the right moment, not a second too early.",
      wrong: "If you filled every gap with a note, you didn't trust the silence. If the recording sounds like random notes with awkward pauses, you need to commit more fully to the silence — own it, don't endure it. If you're at 70%+ silence, make sure the notes you DO play are meaningful.",
      sarah: "Miles Davis said 'It's not the notes you play, it's the notes you don't play.' Khruangbin took that literally. Their songs are more silence than sound, and the silence is what makes the notes matter.",
      silenceTarget: 0.4,
      levelUp: "Record a 2-minute passage where at least 40% of the time is silence (48+ seconds). Each phrase feels intentional — born from the silence, not filling it. The silence feels musical, not awkward."
    },
    {
      id: "gs-7-4",
      time: 10,
      title: "Behind the Beat",
      type: "guitar",
      recorder: true,
      rhythmCells: ["push", "drag", "pocket"],
      what: "Play deliberately behind the beat — placing every note slightly AFTER the metronome click or backing track pulse. This creates a lazy, floating, intentional feel that defines Khruangbin's rhythmic personality. Not late. Not sloppy. Fashionably behind.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Put on Khruangbin Style 80. First, play exactly on the beat for 4 bars using an Am pentatonic phrase. Lock in tight with the click. This is your reference point — 'on the beat' must be crystal clear before you can intentionally leave it.", why: "You need to feel 'on the beat' clearly before you can intentionally play behind it. Without the reference, 'behind' is just 'sloppy.'" },
        { text: "Now play the same phrase but place every note a tiny fraction AFTER the click. Not a whole beat late — just a breath behind. Imagine the click is your signal to BEGIN the motion that produces the note, not the moment the note sounds.", why: "This mental model naturally creates the slight delay. The click triggers your hand to move; the hand produces sound a moment later. The gap is measured in milliseconds — barely perceptible as 'late' but clearly 'groovy.'" },
        { text: "Sustain behind-the-beat playing for a full 2 minutes. Your body will naturally want to drift back on top of the beat. Resist. Every note arrives fashionably late.", why: "Sustaining the behind-the-beat feel is harder than starting it. Your internal clock fights to resync. The discipline of staying behind is what makes it a skill, not an accident." },
        { text: "Try combining behind-the-beat with soft pick attack. The two together create the ultimate Khruangbin guitar feel — gentle, unhurried, sinking into the groove like it's a warm bath.", why: "Behind the beat + soft attack is the complete package. It changes not just when and how hard you play, but the entire attitude of your guitar playing." }
      ],
      feel: "Behind the beat should feel languid and heavy — like the notes are settling into a warm bath. There's no rush, no urgency. The beat is the current and you're floating on it, not swimming against it.",
      wrong: "If you sound late or sloppy, you're too far behind. If you sound normal, you've drifted back on the beat. The sweet spot is extremely narrow — barely perceptible as 'late' but clearly 'groovy.' Record yourself and compare to the click — you should hear a tiny gap.",
      sarah: "Playing on the beat is a skill. Playing behind the beat on purpose is mastery. It requires knowing exactly where the beat is and choosing to arrive just after it. This is what separates good guitarists from captivating ones.",
      metronome: 80,
      levelUp: "Play behind the beat for 2 minutes straight over a backing track, consistently placing notes 20-50ms after the click. Recording confirms a laid-back, languid feel without sounding sloppy or late. Combined with soft attack, the result is unmistakably Khruangbin."
    },
    {
      id: "gs-7-5",
      time: 10,
      title: "Tone Knob as Instrument",
      type: "guitar",
      referencePitches: getPitchRange("A3", "E4"),
      what: "Learn to roll your guitar's tone knob while playing. Mark Speer does this constantly — bright tone for funky, percussive passages; rolled-off tone for warm, Eastern melodies. The tone knob is not a 'set and forget' control. It's a real-time expressive tool, like a wah pedal you control with your pinky.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Find your guitar's tone knob (usually the second or third knob, below the volume knob). Turn it fully clockwise — this is 'wide open,' maximum brightness. Play a phrase. Now roll it all the way counter-clockwise — this is fully rolled off, maximum warmth. Play the same phrase. The difference should be dramatic.", why: "Most guitarists set their tone knob once and forget it. Hearing the full range of what it does reveals an entire dimension of expression you've been ignoring." },
        { text: "Practice reaching the tone knob while playing. Your picking hand's pinky finger can curl down to turn the knob between phrases. Play a note, roll the knob, play another note. Get comfortable with the physical motion.", why: "The physical coordination of reaching the tone knob while playing is the main challenge. Your pinky needs to develop its own muscle memory for the knob position." },
        { text: "Put on Khruangbin Style 80. Play a funky, rhythmic phrase with the tone wide open (bright). Then roll the knob back halfway and play a warm, Eastern-sounding melody. Alternate between bright-funky and warm-Eastern every 4 bars.", why: "This bright/warm toggle is Mark Speer's secret weapon. Watch any Khruangbin live video — his pinky is constantly moving the tone knob. Bright for funk, warm for world music, middle for soul." },
        { text: "Try a slow, continuous tone roll during a sustained note: pick a note with the tone bright, then slowly roll it off while the note rings. The note transforms from glassy to dark in real time. This is the wah-without-a-wah technique.", why: "A slow tone roll on a sustained note creates a filter sweep effect — like a wah pedal in slow motion. It adds movement and life to notes that would otherwise be static." }
      ],
      feel: "The tone knob should feel like a second voice — you're not just choosing notes and rhythms, you're choosing the tonal color of each phrase. Bright passages should feel energetic and present. Warm passages should feel intimate and distant.",
      wrong: "If you can't reach the tone knob without stopping your playing, practice the physical motion separately until it's smooth. If the tonal changes sound random, commit to a plan — bright for rhythm, warm for melody, or vice versa. If you don't hear much difference, check that your tone knob is actually working (some guitars have subtle tone controls).",
      sarah: "This is the exercise that most guitar curricula never include. The tone knob is right there on your guitar, and it changes everything about your sound. Mark Speer treats it as seriously as his note choices — it's not setup, it's performance. Once you start using it, you'll wonder why you ever left it in one position.",
      metronome: 80,
      recorder: true,
      levelUp: "Play a 2-minute passage alternating between bright tone (knob fully open) for funky phrases and warm tone (knob rolled back to 40%) for melodic phrases. Tone changes happen mid-performance without stopping. Recording reveals two distinct tonal characters from one guitar."
    },
    {
      id: "gs-7-6",
      time: 10,
      title: "Chromatic Approach Notes",
      type: "guitar",
      recorder: true,
      pitchContour: true,
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      what: "Add chromatic approach notes to your pentatonic playing. 'Chromatic' means moving by half steps — one fret at a time. Before landing on a target note, approach it from one fret below. This adds an exotic, jazz-inflected flavor that Khruangbin uses constantly. Important: these are NOT scale degrees — they're chromatic neighbors. Approaching A from Ab (one fret below) is a chromatic lower approach, not a 'b2.' The b2 of A would be Bb, which is something different entirely.",
      steps: [
        { text: "Play an Am pentatonic phrase. Now, before landing on the A (root), play Ab (one fret below A — that's the 4th fret on the high E string) and slide up to A (5th fret). The Ab is a chromatic approach note — it's not part of any scale, it's just a half-step runway into your target.", why: "Chromatic approach notes create momentary tension that resolves instantly. The Ab wants to move to A — it pulls the listener's ear toward the resolution. This is how jazz musicians add sophistication to simple melodies." },
        { text: "Try approaching other pentatonic notes from below: before E, play Eb and slide up. Before D, play C# and slide up. Before G, play F# and slide up. Each approach note comes from exactly one fret below the target.", why: "Systematic practice of approach notes on each scale tone builds the muscle memory to deploy them spontaneously during improv. Each one adds a tiny moment of tension-and-release." },
        { text: "Now try approaching from ABOVE: before landing on A, play Bb (one fret above) and slide down. Before E, play F and slide down. Upper approach notes have a different flavor — they feel like the melody is descending into the note.", why: "Approach from below feels like reaching up. Approach from above feels like settling down. Both are valid. Mixing them creates unpredictable, interesting lines." },
        { text: "Play a 2-minute improv over Khruangbin Style 80. Use Am pentatonic as your base, but add chromatic approaches to 30-40% of your notes. Not every note — that would sound like a chromatic exercise. Just enough to add flavor.", why: "The key is restraint. Chromatic approaches are spice, not the main ingredient. Too many and the melody loses its pentatonic identity. Too few and you miss the sophistication." }
      ],
      feel: "Chromatic approach notes should feel like brief shadows passing over the melody — moments of tension that resolve before you fully register them. They add mystery and sophistication without changing the overall character of the phrase.",
      wrong: "If your playing sounds like a chromatic scale exercise, you're using too many approach notes. If the approaches sound like wrong notes, make them shorter — they should be grace notes, not featured pitches. If you called Ab the 'b2 of A,' correct yourself — the b2 of A is Bb. Ab is simply a half-step approach from below. Use the right terminology.",
      sarah: "Khruangbin's global sound comes partly from these chromatic approaches. The same Am pentatonic phrase sounds like blues, Thai funk, or Middle Eastern music depending on which approach notes you add and how you bend them. One technique, infinite flavors.",
      metronome: 80,
      levelUp: "Improvise for 2 minutes over Am pentatonic with chromatic approach notes on 30-40% of target notes. Approaches are audibly brief (grace-note length), resolve cleanly into scale tones, and add an exotic flavor without sounding like a chromatic exercise."
    },
    {
      id: "gs-7-7",
      time: 10,
      title: "Global Pentatonic Flavors",
      type: "guitar",
      recorder: true,
      what: "Same Am pentatonic foundation, three different cultural flavors created by different approach notes, bending techniques, and attitudes. Blues (bend into the b5), desert (use 2nd instead of b3 — your sus pentatonic from Level 5), and Thai/Middle Eastern (chromatic approaches from below). One scale, three worlds.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Blues flavor: Am pentatonic with bends into the b5 (Eb). Play 2 minutes of blues phrasing — half-step bends, vibrato, behind the beat. This is your home base from Level 1.", why: "Revisiting blues with fresh ears after learning space and dynamics shows how much your playing has matured. The same notes sound completely different with Khruangbin-level restraint." },
        { text: "Desert flavor: sus pentatonic (A-B-D-E-G). Repetitive phrases, patient, circular. Add quarter-tone bends on the B note. Imagine a drone underneath even if there isn't one.", why: "Desert flavor from Level 5 uses different note choice AND different attitude. Same fingers, different world. The patience carries over perfectly into Khruangbin's approach." },
        { text: "Thai/Middle Eastern flavor: Am pentatonic but approach notes from a half-step below. Before playing A, play Ab and slide up. Before E, play Eb and slide up. Use the tone knob rolled off for warmth. Play slower, more deliberately.", why: "Khruangbin's Thai and Middle Eastern flavors come from exactly this technique — chromatic lower approaches applied to pentatonic melodies. The rolled-off tone knob adds the warm, exotic quality." },
        { text: "Toggle between all three flavors every 4 bars over the Khruangbin Style 80 backing track. Then try blending two flavors in one phrase — a desert repetition with a blues bend, or a Thai approach note sliding into a blues lick.", why: "Having three flavors on the same scale gives you enormous range. Blending them is where YOUR personal style begins to emerge — no one else will blend them the way you do." }
      ],
      feel: "Each flavor should transport you to a different place — a smoky club, a vast desert, a Bangkok street market. The pentatonic is the same; the seasoning changes everything.",
      wrong: "If all three sound the same, you're not committing to the character of each flavor. Blues should bend. Desert should repeat with patience. Thai/Middle Eastern should use chromatic approaches with warm tone. Each has a distinct personality — exaggerate the differences.",
      sarah: "Khruangbin's genius is treating the pentatonic scale as a global language — adding different accents and idioms depending on the song. This exercise gives you the same superpower. You already know the scale. Now you know how to make it speak different languages.",
      levelUp: "Toggle between blues, desert, and Thai/Middle Eastern flavors every 4 bars over a backing track. Each flavor is immediately distinguishable — blues bends, desert repetition with quarter-tone bends on B, Thai chromatic approaches with warm tone. Then blend two flavors in one phrase at least twice."
    },
    {
      id: "gs-7-8",
      time: 12,
      title: "Song Study: Khruangbin Style",
      type: "guitar",
      recorder: true,
      phraseForm: { sections: ["Intro", "A", "B", "A", "Outro"], barsPerSection: 8 },
      what: "Build a complete Khruangbin-style piece: a short signature riff, soft attack, lots of space, behind-the-beat phrasing, tone knob work, and slight variation on each repeat. Reference 'Evan Finds the Third Room' or 'People Everywhere' as templates.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Create a short riff — 4-5 notes from Am pentatonic with a distinctive rhythm. Think of it as a signature melody that identifies your 'song.' Play it with soft attack and the tone knob at about 40% (slightly warm).", why: "Khruangbin songs are built on one riff. The riff IS the song. Everything else is variation. Mark Speer has said he thinks about melodies the way a singer would — singable, memorable, hummable. Your riff should pass the hum test: if you can't sing it away from the guitar, it's too complex for this style." },
        { text: "Play your riff. Leave 4-8 beats of silence. Play a variation — same rhythm, one note different. Silence again. The silence-variation-silence pattern is how Khruangbin structures their guitar parts.", why: "Space frames each statement like a picture frame. Without the space, the variations blur together. With it, each one feels like a deliberate artistic choice." },
        { text: "Put on Khruangbin Style 80. Place every note behind the beat. The riff should feel like it's settling into the groove, not driving it. Your guitar follows the bass and drums, sitting slightly behind — like a shadow.", why: "Khruangbin's guitar never leads — it follows. The bass (Laura Lee) drives the song. Mark Speer colors it. Feeling this follower role is essential to the style." },
        { text: "Over 5 minutes, develop the riff through tiny mutations. Occasionally roll the tone knob — bright for one variation, warm for the next. End with a version that's recognizably related to the original but distinctly different.", why: "This is real-time composition using the motif development technique. The tone knob changes add another dimension of variation beyond just notes and rhythm." },
        { text: "Add one global pentatonic flavor — a desert quarter-tone bend, a blues b5, or a chromatic approach note — as a brief departure before returning to the riff. Then return to the original. The departure makes the return sweeter.", why: "Khruangbin's music spans the globe. Brief stylistic departures within a song are their signature move — a moment of Thai funk in a soul song, a flash of desert blues in a disco groove." }
      ],
      feel: "This should feel cinematic — a soundtrack to a scene that hasn't been filmed. The riff is the theme. The variations are the story. The space is the atmosphere.",
      wrong: "If you're playing too much, you're not Khruangbin yet. If the riff isn't distinctive, it won't survive variation — make it more melodic or rhythmically unique. If everything is on the beat, push it all slightly back. If the tone never changes, use the knob.",
      sarah: "Khruangbin makes guitar music for people who don't normally listen to guitar music. Their secret is restraint. They play 10% of what they could play, and that 10% is chosen with extraordinary care. This exercise teaches you to think like Mark Speer.",
      levelUp: "Record a 5-minute Khruangbin-style piece built on one signature riff. The riff mutates through tiny variations, the tone knob shifts between bright and warm, at least one global flavor departure appears, and at least 40% of the recording is silence. The piece sounds like a song, not an exercise."
    },
    {
      id: "gs-7-9",
      time: 15,
      title: "Extended Space Jam",
      type: "guitar",
      recorder: true,
      phraseForm: { sections: ["Intro", "Theme", "Space", "Build", "Theme", "Fade"], barsPerSection: 8 },
      volumeContour: true,
      what: "15 minutes of maximum restraint improvisation. Every note must earn its place. Soft attack, behind the beat, global flavors, tone knob work, motif development, and silence as your primary instrument. This is the graduation exam for Level 7.",
      setup: "Record yourself. Neck pickup. Clean tone. Warm reverb if available. Tone knob accessible.",
      tracks: [{ name: "Khruangbin Style 80 BPM", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Put on Khruangbin Style 80. Listen for 16 beats — 4 full bars — before playing a single note. Let the groove establish itself without you. Your job is to join the music, not create it.", why: "Starting with extended listening sets the intention: you are a guest in this groove. The music exists without you. Your notes are offerings, not demands." },
        { text: "Play one note. Soft attack. Behind the beat. Let it ring until it fades completely. Then play another. For the first 3 minutes, never play more than one note at a time. Roll the tone knob between notes — bright for one, warm for the next.", why: "Single notes with full decay is the most restrained form of playing. Adding tone knob variation gives each note a different character, even at maximum simplicity." },
        { text: "Minutes 3-8: develop a motif from three notes. Evolve it slowly using everything from Level 7 — chromatic approaches, global flavors, space, tone changes. Never play more than 5-6 notes in a phrase. Always leave at least 4 beats between phrases.", why: "The middle section is where motif development happens. Tiny mutations over 5 minutes create a journey that the listener follows subconsciously." },
        { text: "Minutes 8-12: your most expressive playing. Still spacious, but allow yourself slightly more density. Add chromatic passing tones, behind-the-beat phrasing, dynamic variation, all three global flavors. This is your emotional peak — but even the peak is restrained.", why: "Even the climax of a Khruangbin-style piece is restrained by most standards. More expression, not more notes. Wider dynamics, not faster runs." },
        { text: "Minutes 12-15: return to single notes. Deconstruct the motif back to its simplest form. Roll the tone knob all the way off — warm, dark, fading. End on one sustained note that dissolves into silence.", why: "The return to simplicity creates symmetry with the opening. The piece breathes out and dissolves. The final silence is part of the music." }
      ],
      feel: "This should feel like the most mature playing you've done in the curriculum so far. Every note is a decision. Every silence is intentional. You're not showing off — you're communicating. When it's working, it feels effortless and profound.",
      wrong: "If you filled the 15 minutes with nonstop playing, Level 7 hasn't clicked yet. If the silence felt awkward instead of musical, you need more practice trusting the space. If every phrase sounded the same, incorporate more global flavors and tone knob variation. If you never touched the tone knob, you missed a core Level 7 skill.",
      sarah: "This is the summit of the first 7 levels. You started with blues scales and bends — now you're making music where silence matters as much as sound, where the tone knob is an instrument, and where restraint IS the technique. That's not just guitar technique. That's artistic maturity.",
      levelUp: "You can sustain a 15-minute session where restraint feels natural, space feels musical, every note serves the whole, and the tone knob adds color throughout. Your playing has a voice — quiet, global, and unmistakably yours."
    }
  ]
};
