import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "The Improvisation Engine",
  subtitle: "Rhythm IS the solo. Motifs ARE the melody. Space IS the music.",
  description:
    "Improvisation isn't about knowing more notes — it's about using the notes you know with rhythmic intention, motivic development, and harmonic awareness. This level builds a complete improvisation toolkit using skills you already have: pentatonic scales, blues bends, offbeat rhythm, desert patience, and surf energy. Grounded in Kratus's improvisation stages (explore, process, product, flow) and the PReVaDe framework (Present, Repeat, Vary, Deconstruct). By the end, you'll improvise confidently over any backing track — not by playing fast, but by playing smart.",
  artists: "Khruangbin, Allah-Las, Skinshape, Slightly Stoopid, Tommy Guerrero",
  unlocks: "Khruangbin Space (Level 7)",
  review: { label: "Levels 4-5 Check-In", time: 5, exercises: ["gs-4-1", "gs-5-4"], prompt: "Play a 1-minute reggae offbeat skank on Am (gs-4-1). Then play a hypnotic 4-note desert blues phrase repeated 16 times (gs-5-4). Offbeat discipline and patient repetition are both foundations for improvisation — if either wobbles, revisit Levels 4-5." },
  exercises: [
    {
      id: "gs-6-1",
      time: 8,
      title: "Rhythm First, Notes Never",
      type: "guitar",
      what: "Improvise using ONLY ONE NOTE — A. All expression comes from rhythm: when you play the note, how long you hold it, where you place it relative to the beat, and how much silence you leave. This proves that rhythm IS the improvisation.",
      setup: "Any tone. Fret the A on the 5th fret, high E string.",
      metronome: 90,
      recorder: true,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      rhythmCells: [
        { name: "3-3-2", pattern: [0.75, 0.75, 0.5], description: "Afro-Cuban syncopation" },
        { name: "Displaced", pattern: [0.5, 1.5], description: "Off-beat accent" }
      ],
      steps: [
        { text: "Play ONLY the note A (5th fret, high E string). Set metronome to 90. Play A as quarter notes on every beat for 4 bars. Boring? Good. That's the baseline.", why: "PMC research on musical improvisation shows it simultaneously activates sensory processing, motor planning, memory retrieval, and real-time adaptability — more brain regions than almost any other activity. The baseline of 'one note, on the beat' is your control group. Everything you do after this is rhythmic improvisation — and the contrast with this boring version proves the power of rhythm." },
        { text: "Now displace: play A on the 'and' after beat 1, then silence for the rest of the bar. Repeat for 4 bars. Then try placing it on the 'and' of beat 3 only. One note per bar, different placement each time.", why: "Rhythmic displacement means shifting when a note lands within the bar. The same note on beat 1 feels stable. On the 'and' of 2 it feels funky. On beat 4 it feels like a pickup. Placement IS expression." },
        { text: "Explore groupings: play A in a 3-3-2 pattern (three eighth notes, three eighth notes, two eighth notes — a natural syncopation that fits inside 4/4). Accent the first note of each group.", why: "The 3-3-2 grouping creates a lopsided, swinging feel that sounds complex but uses only one note. This rhythmic cell appears in every genre you love — reggae, surf, desert blues." },
        { text: "Put on Groove Beat 90. Improvise with ONLY the note A for 2 minutes. Use everything: displacement, 3-3-2 groupings, long holds, short staccato jabs, silence. Record yourself.", why: "Julian Lage describes his 45-minute improv practice: 'Exhaust your vocabulary, then real creativity begins.' Two minutes of one-note improv forces you through that same threshold — when you run out of ideas, sit in silence and wait. A new rhythmic idea will come from a deeper place." }
      ],
      feel: "When a single note grooves, you'll feel the pocket — the note isn't just sitting on the beat, it's dancing around it. A single note with great rhythm sounds better than a hundred notes with bad rhythm.",
      wrong: "If it sounds boring, your rhythmic vocabulary is too limited — try syncopation, try placing the note on the 'and,' try leaving 4 beats of silence. If it sounds mechanical, you're playing patterns instead of phrases.",
      sarah: "Gene, this is the exercise that changes everything. Victor Wooten says rhythm is the only thing that can make one note sound like music. Your reggae offbeat training from Level 4 prepared you for this — now apply that rhythmic discipline to lead playing.",
      levelUp: "Record a 2-minute one-note improv (only A) over a groove track that sounds musical — syncopation, displacement, silence, and dynamic variety all present. A listener unfamiliar with the exercise hears a groove, not a drill."
    },
    {
      id: "gs-6-2",
      time: 8,
      title: "Percussive Chunking",
      type: "guitar",
      what: "Turn your guitar into a drum kit. Learn three percussive sounds — the slap (palm hits strings near bridge), the ghost scratch (muted strum), and the backbeat punch (choked chord stab on beat 2 and 4). Weave these between melodic notes to create rhythm guitar that IS a solo.",
      setup: "Any tone. Metronome at 85 BPM.",
      metronome: 85,
      recorder: true,
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "THE SLAP: with your picking hand, slap the strings near the bridge with your palm. You should hear a short, percussive 'thwack' with no pitch. Practice slapping on beats 2 and 4 while the metronome clicks on every beat.", why: "The slap is your snare drum. Placing it on 2 and 4 creates a backbeat — the rhythmic engine of rock, reggae, and funk." },
        { text: "THE GHOST SCRATCH: lay your fretting hand lightly across all strings (no pressure) and strum. You get a 'tchk' — the same ghost note from Level 4 reggae. Practice alternating: ghost-ghost-SLAP-ghost, repeating.", why: "Ghost scratches fill the space between accents with texture. Combined with the slap, you have a hi-hat (ghost) and snare (slap) on one guitar." },
        { text: "THE PUNCH: strum an Am chord hard on beat 2 or 4, then immediately mute with both hands. The chord rings for a split second — just enough harmony before it's choked.", why: "The punch adds melodic information to the percussive pattern. It's a chord flash — just enough harmony to set the context before returning to rhythm." },
        { text: "Put on Reggae One Drop 85. Build a pattern using all three sounds plus single pentatonic notes from Am. At least 50% percussive, not melodic. Record 2 minutes.", why: "Combining percussive sounds with melodic notes creates a self-accompanying solo. This is how Tommy Guerrero and Mark Speer make solo guitar sound like a full band." }
      ],
      feel: "When the percussive elements lock in with the groove, your guitar should feel like a one-person band — drums and melody from one instrument.",
      wrong: "If it sounds like random noise, your percussive hits aren't landing on consistent rhythmic positions. Simplify: slap on 2 and 4, ghost on every other eighth note, and add ONE melodic note per bar.",
      sarah: "Tommy Guerrero built a career on this — solo guitar that sounds like drums, bass, and lead all at once. Your reggae ghost notes from Level 4 are the foundation. Now they become improv tools.",
      levelUp: "Record a 2-minute passage that is at least 50% percussive (slaps, ghost scratches, punches) with pentatonic fills woven in. On playback, your guitar sounds like a one-person rhythm section — drums and melody from one instrument."
    },
    {
      id: "gs-6-3",
      time: 10,
      title: "Motif Seed — PReVaDe Intro",
      type: "guitar",
      what: "Learn the PReVaDe framework: Present a 3-4 note motif, Repeat it exactly, Vary one element (rhythm OR one note OR direction), then Deconstruct (fragment it to 1-2 notes). This is how Khruangbin and all melodic improvisers build solos — one idea, developed, not a stream of random notes.",
      setup: "Clean tone.",
      metronome: 90,
      recorder: true,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      referencePitches: getPitchRange("A3", "E4"),
      phraseForm: { pattern: "PRVD", barsPerSection: 4, labels: { P: "Present", R: "Repeat", V: "Vary", D: "Deconstruct" } },
      steps: [
        { text: "PRESENT: choose a 3-note motif from Am pentatonic. Keep it simple and singable — E-D-C, or A-C-D, or G-E-D. Play it once. Stop. Let the silence frame it.", why: "A motif is a musical seed. Research on improvisation (Pressing, 1998) shows expert improvisers work from short, memorable 'referents' — not long pre-planned phrases. The best motifs are short enough to remember and sing back. If you can't hum it, it's too complex. Julian Lage keeps his seeds to 3-4 notes: 'The simpler the idea, the more directions it can grow.'" },
        { text: "REPEAT: play the exact same motif 3 more times. Same notes, same rhythm, same dynamics. No variation yet. Repetition tells the listener 'this is important — remember this.'", why: "Repetition is not laziness — it's communication. When you repeat a motif, you're declaring it as the theme. The listener's brain locks onto it." },
        { text: "VARY: change exactly ONE thing. Keep the same rhythm but change one note. OR keep the same notes but change the rhythm. OR play it in a different octave. One variation. Repeat the variation twice.", why: "Single-element variation is the key discipline. Changing everything at once destroys the connection to the original. Changing one thing creates development." },
        { text: "DECONSTRUCT: take just the first 2 notes of your motif. Repeat them. Then just 1 note with the original rhythm. The motif dissolves back into rhythm.", why: "Deconstruction is how phrases end naturally. Instead of stopping abruptly, you gradually simplify until only the essence remains." },
        { text: "Put on Groove Beat 90. Run the full PReVaDe cycle 3 times with 3 different motifs. Record yourself. Which motif was most memorable?", why: "Running the cycle multiple times builds the habit. PReVaDe becomes your improv autopilot — when you don't know what to play, present a motif and develop it." }
      ],
      feel: "PReVaDe should feel like telling a short story: introduce the character (present), establish them (repeat), add a twist (vary), and bring it home (deconstruct).",
      wrong: "If you changed too many things during 'Vary,' you lost the thread. If the repetitions felt boring, your motif might be too simple. If you never deconstructed, you skipped the most important step.",
      sarah: "Listen to any Khruangbin song. Mark Speer does exactly this: a short phrase, repeated, slightly varied, then fragmented back to silence. PReVaDe isn't a theory exercise — it's literally how your favorite guitarist improvises.",
      levelUp: "Run 3 complete PReVaDe cycles on 3 different motifs over a backing track. Each cycle is audibly distinct — Present is recognizable, Repeat locks it in, Vary changes exactly one element, Deconstruct dissolves to 1-2 notes. A listener can follow the story of each motif."
    },
    {
      id: "gs-6-4",
      time: 10,
      title: "Chord-Tone Landing Pads",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      what: "Over a simple Am-G-C progression, always land on a chord tone (root, 3rd, or 5th) on beat 1 of each chord. Everything between landing pads is embellishment. This single rule transforms random scale-running into intentional, harmonically grounded improvisation.",
      metronome: 90,
      recorder: true,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      referencePitches: getPitchRange("A3", "G4"),
      steps: [
        { text: "Map the chord tones. Am = A, C, E. G = G, B, D. C = C, E, G. Find each in your Am pentatonic position — these are your landing pads.", why: "Knowing where the chord tones live on the fretboard is the prerequisite. Most of these notes are already in your pentatonic shape." },
        { text: "Play Am for 2 bars, G for 2 bars, C for 2 bars, repeat. On beat 1 of EVERY chord change, play the ROOT: A when Am starts, G when G starts, C when C starts. Between roots, play any pentatonic notes.", why: "Root targeting is the simplest version of chord-tone improvisation. It connects your melody to the harmony underneath." },
        { text: "Upgrade: target the 3rd on beat 1 instead. C over Am, B over G, E over C. The 3rd defines whether a chord is major or minor — landing on it proves you hear the harmony.", why: "Targeting 3rds is more sophisticated because the 3rd gives the chord its emotional character." },
        { text: "Upgrade again: target the 5th on beat 1. E over Am, D over G, G over C. Now you have three options per chord. Choose the one closest to your last note.", why: "Having three landing options means you can create smooth melodic motion instead of jumping to a distant root." },
        { text: "Improvise over Am-G-C: land on ANY chord tone on beat 1, play whatever you want in between. 3 minutes. Record it.", why: "Freeform improv with one rule (chord tone on beat 1) transforms your playing. Landing pads give structure. Space between them gives freedom." }
      ],
      feel: "When you land on the right chord tone, there's a feeling of clicking into place — the melody and harmony agree. Like stepping on solid ground after walking on sand.",
      wrong: "If landing notes clash with the chord, double-check your chord-tone map. If it sounds like a scale exercise, add more rhythm and space between landing pads.",
      sarah: "This is the single most important improvisation concept. Chord-tone targeting is what separates 'playing a scale over a progression' from 'improvising over the harmony.' Every note between targets is embellishment — the targets are the story.",
      levelUp: "Improvise over Am-G-C for 3 minutes, landing on a chord tone (root, 3rd, or 5th) on beat 1 of every chord change at least 80% of the time. Recording confirms your melody follows the harmony — not just the scale."
    },
    {
      id: "gs-6-5",
      time: 10,
      title: "Rhythmic Motif + Chord Tones",
      type: "guitar",
      what: "Combine PReVaDe motif development with chord-tone targeting. Present a rhythmic motif, repeat it, then VARY by changing the target notes to match the new chord while keeping the rhythm. The rhythm stays — the notes follow the harmony.",
      metronome: 85,
      recorder: true,
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      referencePitches: getPitchRange("A3", "E4"),
      steps: [
        { text: "Create a rhythmic motif using Am chord tones: for example, A (long) - C (short) - E (short), with a specific rhythm. The rhythm is more important than the notes.", why: "Starting with chord tones ensures your motif is harmonically grounded. The rhythm gives it character." },
        { text: "Over Am, repeat the motif 4 times. Then when the chord changes to G, keep the SAME RHYTHM but change the notes to G chord tones: G (long) - B (short) - D (short).", why: "Transposing a rhythmic motif to new chord tones is the core of harmonic improvisation. The rhythm provides continuity." },
        { text: "Continue: when C arrives, same rhythm, C chord tones (C-E-G). One rhythmic idea traveling through three chords.", why: "A rhythmic motif that follows chord changes creates the illusion of a carefully composed solo — one rhythm, three sets of chord tones." },
        { text: "Improvise for 3 minutes. Start with your rhythmic motif on chord tones, then gradually add passing tones. Chord tones on strong beats, passing tones on weak beats.", why: "Adding passing tones between chord-tone targets creates flowing melodic lines. This is the Hal Crook 'ladder' approach." }
      ],
      feel: "When rhythm and chord tones align, the solo should feel like it's writing itself. The rhythm drives forward and the notes fall into place.",
      wrong: "If it sounds like a scale exercise, the rhythm has gone flat — bring back the rhythmic motif. If chord changes throw you off, simplify to roots only on beat 1.",
      sarah: "Gene, this is where your reggae rhythmic training pays off. You already think rhythmically because of Level 4. Now that rhythmic vocabulary becomes your soloing vocabulary.",
      levelUp: "Improvise for 3 minutes where a single rhythmic motif travels through Am-G-C, changing notes to match chord tones while the rhythm stays recognizable. Passing tones appear on weak beats only."
    },
    {
      id: "gs-6-6",
      time: 10,
      title: "Play WITH the Track",
      type: "guitar",
      what: "Victor Wooten says: 'Never practice alone — immerse yourself with fluent speakers.' Play along with a backing track, but don't solo OVER it — play WITH it. Copy the FEEL of the track: its energy, dynamics, rhythmic personality. When the track is busy, leave space. When it breathes, fill in.",
      tracks: [
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Soul Funk Groove 90", src: "/soul-funk-groove-90.mp3" }
      ],
      recorder: true,
      volumeMeter: true,
      steps: [
        { text: "Put on Khruangbin Style 80. Listen for 16 beats without playing. Feel the groove. Where does the track breathe? Where is it busy?", why: "Listening first is the most important habit. You're joining a conversation, not starting one." },
        { text: "Enter with a SINGLE note placed in a gap — where the track leaves space. Then stop. Wait for the next gap. Enter with another note. You're filling holes, not building walls.", why: "Filling gaps is how ensemble musicians play. A drummer leaves space — you fill it. When everything is playing, you shut up." },
        { text: "Gradually add more: short motifs that respond to what the track does. If the bass walks up, your motif walks down. If there's a fill, you leave space.", why: "Responsive playing creates musical dialogue. The track speaks, you respond." },
        { text: "Switch to Soul Funk Groove 90. Notice how your playing changes automatically — the higher energy calls for different responses.", why: "Different backing tracks demand different vocabulary. The track shapes your playing — that's sensitivity, not weakness." },
        { text: "Record 2 minutes over each track. Listen back. Where did you lock in with the track vs. fight it?", why: "Moments of lock-in feel effortless on playback. Moments of fighting sound tense and disconnected." }
      ],
      feel: "When you're truly playing WITH the track, it feels like a conversation — you and the track are making music together. Your notes live inside the groove.",
      wrong: "If your playing sounds like it belongs on a different track, you're not listening enough. If you're playing nonstop, you're monologuing instead of conversing.",
      sarah: "Victor Wooten's advice changed everything for musicians who heard it. The backing track is your fluent speaker. Play WITH it, not over it.",
      metronome: 80,
      levelUp: "Record 2 minutes over each of two different backing tracks. On playback, your notes land in the track's gaps — when the track is busy you leave space, when it breathes you fill in. A listener hears one band, not guitar-over-track."
    },
    {
      id: "gs-6-7",
      time: 10,
      title: "Comping Variations",
      type: "guitar",
      what: "Improvise RHYTHM GUITAR — not lead. Take the Am-Dm-G progression and play it 8 times, each time with a different strumming pattern, voicing, or dynamic approach. Comping is the improv skill most guitarists ignore, and it's the one you'll use 90% of the time.",
      metronome: 85,
      recorder: true,
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }
      ],
      volumeContour: true,
      steps: [
        { text: "Put on Reggae One Drop 85. Play Am-Dm-G (2 bars each) with a basic offbeat skank. This is your baseline comping pattern.", why: "The baseline gives you a point of departure. Every variation will be measured against this." },
        { text: "Repeat 1: same chords, change the voicing. Use Am7 instead of Am, Dm7 instead of Dm, G7 instead of G. Rhythm stays identical — only chords get richer.", why: "Voicing variation is the simplest comping improvisation. Same rhythm, richer harmonic color." },
        { text: "Repeat 2: same chords, change the rhythm. Try 16th-note bubble for Am, straight eighth-note skank for Dm, syncopated stabs for G.", why: "Rhythmic variation is the most powerful comping tool. A boring chord becomes exciting in a syncopated pattern." },
        { text: "Repeat 3: dynamics only. Play Am whisper-quiet, Dm at medium, G at full voice. Same voicings, same rhythm — only intensity changes.", why: "Dynamic variation creates energy arcs within a static progression." },
        { text: "Improvise comping for 3 minutes — change something (voicing, rhythm, dynamic, or register) on every repeat. Never play it the same way twice. Record yourself.", why: "A guitarist who varies the accompaniment is a musician. A guitarist who plays the same pattern is a human loop pedal." }
      ],
      feel: "Good comping feels like supporting an imaginary vocalist. You're the foundation they stand on, constantly adjusting.",
      wrong: "If all repeats sounded the same, your vocabulary is too narrow. If variations disrupted the groove, they were too dramatic — subtlety is key.",
      sarah: "Gene, you'll spend 90% of your time in a band comping, not soloing. This exercise makes that 90% creative and alive. Skinshape's rhythm guitar is never the same twice.",
      levelUp: "Play the Am-Dm-G progression 8 times, each repeat audibly different — varied voicing, rhythm, dynamic, or register. No two passes sound the same. Recording confirms at least 5 distinct variations."
    },
    {
      id: "gs-6-8",
      time: 10,
      title: "Reggae Rhythmic Improv",
      type: "guitar",
      what: "Take the reggae skank and turn it from a fixed pattern into an improvised conversation. Vary the skank: displace the stab, add or remove ghost notes, throw in a single melodic note, change the muting intensity. The offbeat is your canvas, not your prison.",
      metronome: 85,
      recorder: true,
      tracks: [
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Dub Reggae 85", src: "/dub-reggae-85.mp3" }
      ],
      steps: [
        { text: "Start with a standard Am7 offbeat skank for 4 bars. Then vary: move one stab from the 'and' of beat 2 to the 'and' of beat 3. Just one displaced stab per bar.", why: "The smallest possible rhythmic variation shows that the skank can be improvised, not fixed." },
        { text: "Remove ghost notes for 2 bars (just bare stabs). Then double-density the ghost notes for 2 bars (16th-note scratches). Toggle between sparse and dense every 2 bars.", why: "Ghost note density is a texture control. Removing them creates drama. Adding them creates urgency." },
        { text: "Drop a single melodic note (from Am pentatonic) into the gap between two stabs. One fill per 2 bars maximum — a whisper, not a shout.", why: "A single melodic note within comping bridges rhythm and lead guitar. It's a wink, not a speech." },
        { text: "Switch to Dub Reggae 85. Full reggae rhythmic improv: vary everything — stab placement, ghost density, single melodic fills, dynamics. Record 3 minutes.", why: "Varied reggae rhythm playing sounds alive — like a real musician responding to the groove in real time." }
      ],
      feel: "Varied reggae skanking should feel like a conversation with the drum track — responsive, alive, and never robotic.",
      wrong: "If the groove broke during variations, the change was too large. Keep each change small — one element at a time.",
      sarah: "Pepper and Slightly Stoopid's guitarists never play the same skank twice. They're constantly micro-varying — that's what makes their rhythm guitar feel alive instead of programmed.",
      levelUp: "Record 3 minutes of reggae rhythmic improv where the skank varies every 2-4 bars — displaced stabs, ghost note density changes, single melodic fills, dynamic shifts. The groove never breaks, but it's never robotic."
    },
    {
      id: "gs-6-9",
      time: 10,
      title: "Surf Motif Development",
      type: "guitar",
      what: "Take a 4-note surf lick from your Mixolydian vocabulary and develop it through PReVaDe over a surf backing track. Present, repeat, transpose up a 4th, invert (reverse direction), fragment to 2 notes, rebuild. One lick becomes a complete surf solo.",
      recorder: true,
      metronome: 120,
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }],
      referencePitches: getPitchRange("G3", "C5"),
      phraseForm: { pattern: "PPVVFD", barsPerSection: 4, labels: { P: "Present", V: "Vary", F: "Fragment", D: "Develop" } },
      steps: [
        { text: "Choose a 4-note Mixolydian surf lick. Example: G-A-B-D (ascending). Play it with tremolo picking. Repeat it 4 times.", why: "Starting with a specific lick grounds the development. Repetition establishes it as the theme." },
        { text: "TRANSPOSE: move the same rhythm up a 4th. G-A-B-D becomes C-D-E-G. Same intervals, same rhythm, new starting point.", why: "Transposition preserves rhythmic identity while changing pitch. The Ventures used this constantly." },
        { text: "INVERT: take the original intervals and reverse direction. If G-A-B-D goes up, the inversion goes down from G: G-F-E-C.", why: "Inversion creates a complementary phrase — the listener hears a family resemblance without a copy." },
        { text: "FRAGMENT: take just the first 2 notes. Repeat them as an ostinato for 4 bars. Then rebuild to the full motif.", why: "Fragmentation reduces the motif to its essence. If the first 2 notes groove alone, your motif was well-chosen." },
        { text: "String it together: Present (4 bars) → Repeat (4 bars) → Transpose (4 bars) → Invert (4 bars) → Fragment (4 bars) → Rebuild (4 bars). That's a 24-bar solo from one lick. Record it.", why: "A complete PReVaDe cycle is a real, structured solo. You developed one idea into a coherent musical statement." }
      ],
      feel: "The solo should feel like it has a beginning, middle, and end — a narrative arc built from a single idea.",
      wrong: "If the transposition sounds disconnected, check the rhythm. If the inversion sounds random, verify the intervals. If the fragment is boring, your original motif needs a more syncopated rhythm.",
      sarah: "This is how The Ventures and Allah-Las build surf solos — one lick, developed through repetition and variation. Not shredding. Storytelling with 4 notes.",
      levelUp: "Build a 24-bar surf solo from one 4-note Mixolydian lick: Present (4 bars) → Repeat (4) → Transpose up a 4th (4) → Invert (4) → Fragment to 2 notes (4) → Rebuild (4). Record it — each section is recognizably connected to the original motif."
    },
    {
      id: "gs-6-10",
      time: 10,
      title: "Desert Drone Motif",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "tanpura" },
      what: "Combine desert blues drone technique with PReVaDe motif development. Open A string drone + a 3-note sus pentatonic motif. Develop over 5 minutes: present, repeat 8 times, vary one note, repeat 8 more, deconstruct to 1 note + drone. Desert patience meets motivic discipline.",
      setup: "Drop D tuning optional. Clean tone, slight reverb.",
      tracks: [{ name: "Desert Blues 75", src: "/desert-blues-75.mp3" }],
      metronome: 75,
      recorder: true,
      referencePitches: getPitchRange("A3", "E4"),
      steps: [
        { text: "Let the open A string ring as a drone on beats 1 and 3. On beats 2 and 4, play a 3-note motif from the sus pentatonic: B-D-E on the upper strings. This is your 'Present.'", why: "The drone provides harmonic anchor. The motif provides melodic interest. Separating them creates the interlocking texture of desert blues." },
        { text: "Repeat the motif exactly 8 times with the drone. Do NOT vary anything. Let the repetition become hypnotic.", why: "8 exact repetitions is longer than you think. By repetition 5, something shifts — you start hearing overtones and subtle resonances." },
        { text: "On repetition 9, vary ONE note: change B to A. Now the motif is A-D-E instead of B-D-E. Repeat 8 times. That single changed note should feel enormous.", why: "This is where desert patience and PReVaDe intersect. After 8 repetitions, the changed note is a revelation." },
        { text: "Deconstruct: reduce to just D-E (2 notes) with the drone. Then just D. Then just the drone alone. Let the music dissolve back to its origin.", why: "The deconstruction should feel like a sunset — gradual, inevitable, and beautiful." }
      ],
      feel: "The full arc should feel meditative and profound. 5 minutes of patient development over a drone creates a trance-like quality.",
      wrong: "If you got bored and added complexity too early, you short-circuited the process. The boredom is the point — push through it.",
      sarah: "Gene, this is Tinariwen's approach married to compositional craft. They've been doing PReVaDe for centuries without calling it that — repeating, slowly varying, dissolving back to the drone.",
      levelUp: "Sustain a 5-minute desert drone motif arc: 8 exact repetitions of a 3-note motif over an A drone, then vary one note for 8 more, then deconstruct to 1 note, then drone alone. The single changed note on repetition 9 sounds like a revelation, not a random edit."
    },
    {
      id: "gs-6-11",
      time: 8,
      title: "Wrong Note Recovery",
      type: "guitar",
      what: "Deliberately play a 'wrong' note (outside the scale), then recover: slide to the nearest chord tone, bend into it, or repeat the 'wrong' note with confidence until it becomes intentional. Recovery is a skill. Practicing it means you'll never fear mistakes again.",
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      referencePitches: getPitchRange("A3", "E4"),
      pitchContour: true,
      steps: [
        { text: "Play an Am pentatonic phrase over Groove Beat 90. At a random moment, play a note NOT in the scale — any fret between your pentatonic positions. Let it ring. DON'T panic.", why: "Most guitarists treat wrong notes as failures. This exercise reframes them as opportunities." },
        { text: "RECOVERY MOVE 1 — THE SLIDE: from the wrong note, slide one fret up or down to the nearest pentatonic note. The slide turns the 'mistake' into a chromatic approach.", why: "A half-step slide into a scale tone is the same technique as chromatic approach notes. The difference is you arrived by accident." },
        { text: "RECOVERY MOVE 2 — THE BEND: from the wrong note, bend toward the nearest scale tone. The bend creates a vocal, expressive quality that transforms a mistake into a blues gesture.", why: "Bending into the correct pitch is the most bluesy recovery. B.B. King 'recovered' from wrong notes this way so often people thought he was doing it on purpose. He was." },
        { text: "RECOVERY MOVE 3 — THE CONFIDENCE REPEAT: play the 'wrong' note again. And again. 3 times with conviction. Then resolve to a chord tone. A note played once sounds like a mistake. Played three times, it sounds like a choice.", why: "Repeating a dissonant note with confidence recontextualizes it. Jazz musicians call this 'playing outside' — the repeat-with-conviction move is how they make it work." },
        { text: "Improv for 2 minutes. Deliberately hit a 'wrong' note every 20-30 seconds and practice all three recovery moves. Record yourself. On playback, can you tell which were mistakes?", why: "The ultimate test: when wrong notes smoothly resolve, you've built a safety net that eliminates performance anxiety." }
      ],
      feel: "Recovery should feel empowering — every 'wrong' note is a doorway to an interesting phrase. No fear because you know three ways to turn any mistake into music.",
      wrong: "If you freeze after the wrong note, commit to a recovery move immediately. If recoveries sound like corrections, they're too tentative — sell the move.",
      sarah: "Gene, this exercise eliminates fear. Once you know you can recover from any wrong note, there's nothing to be afraid of. Improvisation anxiety comes from fear of mistakes. Kill the fear and the music flows.",
      metronome: 90,
      levelUp: "Improvise for 2 minutes, deliberately hitting a wrong note every 20-30 seconds. Use all 3 recovery moves (slide, bend, confidence repeat). On playback, at least 7 out of 10 recoveries sound intentional — a listener can't tell which notes were mistakes."
    },
    {
      id: "gs-6-12",
      time: 12,
      title: "Genre Improv Roulette",
      type: "guitar",
      what: "Switch between three genre-specific improv approaches every 4 bars: reggae rhythmic improv (varied skanks + melodic fills), surf motif development (PReVaDe over Mixolydian), and desert drone motif (patient repetition). Each genre demands different tools. Switching tests whether they're truly internalized.",
      recorder: true,
      metronome: 90,
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      phraseForm: { pattern: ["Reggae", "Surf", "Desert"], barsPerSection: 4, labels: { Reggae: "Reggae", Surf: "Surf", Desert: "Desert" } },
      steps: [
        { text: "Put on Groove Beat 90. Bars 1-4: reggae rhythmic improv. Offbeat skanks with ghost notes, varied — displaced stabs, single melodic fills, dynamic shifts. Think Skinshape.", why: "Reggae improv is rhythm-focused. Melodic notes are sparse and serve the groove." },
        { text: "Bars 5-8: surf motif development. Switch to Mixolydian, pick a 4-note motif, develop it — repeat, vary, transpose. Think Allah-Las.", why: "Surf improv is motif-focused. State a melodic idea and develop it. Different muscle than reggae." },
        { text: "Bars 9-12: desert drone motif. Let the open A ring, play a minimal sus pentatonic phrase, repeat with patience. Think Tinariwen.", why: "Desert improv is patience-focused. The motif barely changes. Repetition IS the variation." },
        { text: "Cycle through all three genres 3 times (36 bars). Each time, transitions should get smoother.", why: "Fluency across improv styles. When you can switch on demand, you have a complete toolkit." },
        { text: "On the 4th cycle, mix freely: play whatever genre feels right in the moment. No predetermined order. Record 12 minutes.", why: "Free-form genre mixing is the end goal. When the track calls for reggae, you play it. When it calls for patience, you wait." }
      ],
      feel: "The genre switches should feel like changing lenses on a camera — the same scene looks different through each one.",
      wrong: "If all three genres sounded the same, you're defaulting to one approach. Exaggerate the differences: reggae = mostly rhythm, surf = melodic and forward, desert = hypnotic and patient.",
      sarah: "This is where the whole curriculum converges. Reggae rhythm, surf melody, desert patience — three improv approaches from three levels, now unified.",
      levelUp: "Cycle through reggae rhythmic improv, surf motif development, and desert drone motif every 4 bars for 3 full rotations (36 bars). Each genre is immediately recognizable on playback — reggae is rhythmic, surf is melodic and forward, desert is hypnotic and patient. Transitions don't break the groove."
    },
    {
      id: "gs-6-13",
      time: 10,
      title: "Play With a Song",
      type: "guitar",
      what: "Put on a song from your playlist — an actual recording by Khruangbin, Skinshape, or Allah-Las. Play along, but not by learning the part. Add your own improv: fill spaces the guitarist leaves, echo their phrases with variations, comp when they solo, solo when they comp. You are the second guitarist in the band.",
      recorder: true,
      steps: [
        { text: "Choose a song you love with clear guitar parts. Khruangbin 'Evan Finds the Third Room' or Skinshape 'I Didn't Know' are ideal. Press play. Listen for 30 seconds without your guitar.", why: "Listening first maps the terrain — where are the guitar parts? Where are the gaps?" },
        { text: "FOLLOW THE VOCAL: when the singer is singing, play very quietly or not at all. When the vocal rests, that's your window. Fill vocal gaps with short phrases or chord stabs.", why: "Following the vocal is Rule #1. The singer is the star — your job is to enhance, not compete." },
        { text: "When the recording guitar plays a riff, ECHO it: play something similar but not identical. Same rhythm, different notes. Or same notes, different rhythm.", why: "Echoing creates musical dialogue. The recording speaks, you respond." },
        { text: "During instrumental sections, COMP: play rhythm underneath. Light, supportive, out of the way.", why: "Comping under someone else's solo is the most common improv scenario in bands." },
        { text: "Play the full song. Then play it again — the second time should feel more natural. Record the second pass.", why: "First pass is reconnaissance. Second is performance. By the second time, you've internalized the structure." }
      ],
      feel: "When locked in with a real recording, it feels like being in the band. Your guitar fills spaces that the recording left open.",
      wrong: "If you can't hear the recording over your playing, you're too loud. If your improv sounds disconnected, you're not listening — the song dictates your approach.",
      sarah: "Gene, this is what it feels like to be in a band. Khruangbin, Skinshape, Allah-Las — these are the musicians you want to jam with. Your playlist IS your practice partner.",
      levelUp: "Play along with a full song recording for its entire duration. Follow the vocal (quiet when singing, fill when resting), echo the recording's guitar phrases with variations, and comp during instrumental sections. Second pass recorded — your guitar sounds like it belongs in the mix."
    },
    {
      id: "gs-6-14",
      time: 15,
      title: "Extended Improv — All Systems Go",
      type: "guitar",
      what: "15-minute improvisation session integrating EVERY skill from this level: rhythmic improv, percussive chunking, PReVaDe motif development, chord-tone targeting, comping, genre switching, recovery moves, and playing with the track. No rules beyond: start quiet, build, peak, resolve.",
      setup: "Record yourself. Any tone. Start clean, add effects as you go if available.",
      recorder: true,
      volumeMeter: true,
      volumeContour: true,
      tracks: [
        { name: "Groove Beat 90", src: "/groove-beat-90.mp3" },
        { name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" },
        { name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" },
        { name: "Desert Blues 75", src: "/desert-blues-75.mp3" }
      ],
      phraseForm: { pattern: ["Seed", "Growth", "Convo", "Peak", "Resolve"], barsPerSection: [12, 16, 12, 12, 8], labels: { Seed: "The Seed", Growth: "Growth", Convo: "Conversation", Peak: "Peak", Resolve: "Resolve" } },
      steps: [
        { text: "Minutes 0-3: THE SEED. Choose one backing track. Start with a single note — rhythmic improv only. Find the groove. Add percussive chunking. Let rhythm establish itself before any melody appears.", why: "Starting with rhythm alone proves rhythm IS the improvisation. The melody will grow from the rhythmic foundation." },
        { text: "Minutes 3-7: THE GROWTH. Present a motif — 3-4 notes from the pentatonic. Develop it using PReVaDe. Target chord tones on strong beats. The improv should have harmonic awareness now.", why: "The middle section combines motif development with chord-tone targeting. Structured improvisation — free in expression, grounded in harmonic logic." },
        { text: "Minutes 7-10: THE CONVERSATION. Switch backing tracks if you want. Try comping for 4 bars, then soloing for 4. Switch genres. Use recovery moves when you hit wrong notes.", why: "The conversation section is where all skills converge. You're not thinking about techniques — you're making music." },
        { text: "Minutes 10-13: THE PEAK. Your most expressive playing. Longer phrases, bolder choices, wider dynamics. Let the energy build naturally.", why: "The peak should feel earned. Everything you've built converges into maximum expression." },
        { text: "Minutes 13-15: THE RESOLVE. Return to one note. Then rhythm only. Then silence. The improv dissolves back to its origin.", why: "Ending where you started creates a complete arc. The silence at the end should feel different from the silence at the beginning." }
      ],
      feel: "This should feel like the most complete musical experience in the curriculum so far. Every tool is available. When it's working, you stop thinking about tools and start thinking about music.",
      wrong: "If you only used one or two skills, challenge yourself to include all of them next time. If it felt like exercises stitched together, the transitions need work.",
      sarah: "Gene, you started this level improvising with one note. You're ending it with a 15-minute session that draws from every skill. You're not stuck in pentatonic boxes anymore. You have rhythm, motifs, chord tones, genre vocabulary, and the confidence to recover from anything. This is what it means to improvise.",
      levelUp: "Can sustain a 15-minute improvisation integrating rhythmic improv, PReVaDe motif development, chord-tone targeting, comping, genre switching, and wrong-note recovery. Your improvisation has structure, variety, and musical intention."
    }
  ]
};
