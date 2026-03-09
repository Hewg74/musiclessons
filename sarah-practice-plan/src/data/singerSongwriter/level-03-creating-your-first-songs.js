import { getPitchRange } from "../appData.js";

export const level3 = {
  level: 3,
  title: "Creating Your First Songs",
  subtitle: "Chord tones become melodies. Melodies become songs.",
  description:
    "You can strum and sing individual notes. Now create original melodic phrases using the chord tones from Level 2. Start with 2-note phrases, grow to 4-note melodies, then string them into a simple song sketch. Everything is YOUR creation — no covers, no imitation. Based on Orff's 'create before you analyze' and Kratus's first improvisation level: exploration within constraints.",
  artists: "DOPE LEMON, Skinshape, Khruangbin",
  unlocks: "Rhythm & Feel (Level 4)",
  review: { label: "Level 1-2 Check-In", time: 5, exercises: ["ss-1-7", "ss-2-3b"], prompt: "Quick check: strum G-Em-C-D while talking for 2 minutes (ss-1-7). Then sing root-5th on each chord at 85 BPM (ss-2-3b). If either feels shaky, revisit those levels." },
  exercises: [
    {
      id: "ss-3-1",
      time: 6,
      title: "Your First Phrase",
      type: "vocal",
      what: "Create a 4-beat melodic phrase using just the root and 5th of Am. Strum Am on autopilot, then sing a short phrase — A up to E, E back to A, or hold one and move to the other. This is your first original melody fragment.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am on autopilot. Sing the root A for 2 beats, then the 5th E for 2 beats. Just those two notes, back and forth.", why: "Two notes is the minimum for a melody. Starting here removes overwhelm — you can't play a wrong note." },
        { text: "Now vary the rhythm: try A (1 beat) - E (3 beats). Then A (3 beats) - E (1 beat). Same two notes, different durations. Notice how the feel changes.", why: "Rhythm transforms melody. The same two notes feel completely different depending on how long you hold each one." },
        { text: "Create YOUR phrase: pick a rhythm pattern for A and E that you like. Repeat it 4 times. That's a melodic motif — the seed of a song.", why: "Choosing a pattern you like is the first act of composition. You're not following instructions — you're making an aesthetic decision." },
        { text: "Sing your phrase on 'la' or 'ooh.' Record it. This 4-beat pattern is your first original melody fragment.", why: "Recording captures the idea before you forget it. Many songs start from a single 4-beat phrase exactly like this." }
      ],
      feel: "This should feel playful, not pressured. You're exploring two notes — there's no wrong answer. Any combination of A and E over Am sounds good.",
      wrong: "If you're overthinking or trying to make it 'good,' you're adding pressure that doesn't belong here. Just play. Two notes. Any rhythm. Whatever comes out IS your phrase.",
      sarah: "Gene, this is how songs start — not with grand inspiration, but with a tiny phrase that you repeat until it becomes something. Your phrase doesn't need to be clever. It needs to exist.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-2",
      time: 6,
      title: "Phrase Library",
      type: "vocal",
      what: "Create 4 different melodic phrases using root, 3rd, and 5th of Am (A-C-E). Each phrase is 4 beats. Vary rhythm and direction. By the end, you have a library of 4 phrases you created and can repeat.",
      steps: [
        { text: "Phrase 1: rising — sing A-C-E in any rhythm you like. One bar. Repeat until it's memorized.", why: "A rising phrase creates a sense of lift or question. It's one of the fundamental melodic gestures." },
        { text: "Phrase 2: falling — sing E-C-A in any rhythm. Memorize it.", why: "A falling phrase creates a sense of resolution or answer. Rising + falling = a complete melodic thought." },
        { text: "Phrase 3: arch — start low, go high, come back (A-C-E-C or A-E-C-A). Memorize it.", why: "Arch shapes are the most common melodic contour in all music. Most melodies are variations of the arch." },
        { text: "Phrase 4: your choice — any combination of A, C, E in any order with any rhythm. Make it feel like YOU.", why: "The fourth phrase is unconstrained. This is the first moment of genuine creative freedom in the curriculum." },
        { text: "Play all 4 back to back: Phrase 1 (1 bar) → Phrase 2 (1 bar) → Phrase 3 (1 bar) → Phrase 4 (1 bar). That's a 4-bar melody. Record it.", why: "Four phrases in sequence = a melody. You just composed 4 bars of original music." }
      ],
      feel: "Building a phrase library should feel like collecting tools. Each phrase is a color on your palette. The more phrases you can pull from, the freer your improvisation becomes.",
      wrong: "If all 4 phrases sound the same, push for contrast. Make one fast and one slow. Make one rising and one falling. Variety is the goal.",
      sarah: "Gene, 4 phrases over Am is a complete melodic vocabulary for one chord. Real songs use exactly this — a handful of melodic ideas recycled with variation.",
      metronome: 80,
      referencePitches: getPitchRange("A2", "E4"),
      recorder: true
    },
    {
      id: "ss-3-3",
      time: 8,
      title: "Melody Over Changes",
      type: "song",
      what: "Create melodic phrases that follow chord changes: Am → C → G → Em. On each chord, sing phrases using that chord's tones. Your melody adapts to the harmony — this is the foundation of songwriting.",
      setup: "Guitar. Metronome at 80 BPM.",
      steps: [
        { text: "Strum Am for 4 beats. Sing a phrase using A-C-E. When the chord changes to C, shift your phrase to use C-E-G.", why: "Following chord tones with your voice is how melodies and harmony stay connected. The melody 'outlines' the chords." },
        { text: "Continue: G chord, sing using G-B-D. Em chord, sing using E-G-B. One phrase per chord, 4 beats each.", why: "Each chord gives you three 'safe' notes. You always have options, and none of them clash." },
        { text: "Loop the progression 4 times. Try to make each pass slightly different — vary rhythm, direction, or which chord tone you emphasize.", why: "Variation on repetition is the engine of interesting melody. Same chords, evolving vocal line." },
        { text: "Find a phrase you love. Repeat it every time that chord comes around. Now you have a melodic hook.", why: "A hook is just a phrase you commit to repeating. The repetition makes it memorable." }
      ],
      feel: "Your melody should feel like it's being guided by the chords — pulled gently from one set of notes to the next. When voice and chords align, there's a physical 'click' of consonance.",
      wrong: "If your melody sounds random or disconnected from the chords, you're probably singing notes outside the chord tones. Stick to root-3rd-5th of each chord. Those notes always work.",
      sarah: "Gene, you're composing. Right now. A melody that follows chord changes is the definition of a song. It doesn't need lyrics yet — the melodic shape alone is music.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-3-4",
      time: 8,
      title: "Add Simple Words",
      type: "song",
      what: "Take your favorite melody from ss-3-3 and add simple, descriptive words. No poetry, no cleverness — just describe what you see or feel. 'Sun is going down / water on the rocks / wind is getting warm.' Words turn melodies into songs.",
      steps: [
        { text: "Play your chord progression with your melody from ss-3-3. Hum it once through to lock it in.", why: "Reaffirming the melody before adding words ensures the pitch and rhythm are stable." },
        { text: "Look around you. Describe what you see in short phrases: 'Morning light on the wall.' Fit each phrase into your melody's rhythm.", why: "Observation-based lyrics are the easiest to generate. You're describing reality, not inventing stories. Zero creative pressure." },
        { text: "Don't worry about rhyme or meaning. Just let words land on the melody. Some will fit perfectly. Some will need adjustment.", why: "Prosody — matching word stress to melodic stress — happens naturally when you speak freely over a melody. Don't force it." },
        { text: "Sing through 4 passes with different words each time. On the 5th pass, use your favorite words from all the passes.", why: "Multiple passes generate options. Selecting favorites from multiple attempts is how professional songwriters work." }
      ],
      feel: "Adding words should feel like decorating a sculpture — the melody is the shape, the words are the color. The melody came first; the words drape over it.",
      wrong: "If you're stuck trying to write 'good' lyrics, lower the bar dramatically. 'The dog is on the couch' is a fine lyric for practice. The goal is words + melody + guitar, not poetry.",
      sarah: "Gene, your lyric themes are ocean, travel, golden hour, warmth. Let those come naturally. If you're looking out the window and you see palm trees, sing about palm trees. Authenticity beats cleverness.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "D4"),
      recorder: true
    },
    {
      id: "ss-3-5",
      time: 8,
      title: "Two-Section Song Sketch",
      type: "song",
      what: "Create a song with two contrasting sections: Section A (lower, calmer) and Section B (higher, more energy). Same chord progression, but your melody and delivery shift. This is the seed of verse-chorus structure.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Section A: strum Am-C-G-Em at 80 BPM. Sing a melody in your low-to-mid range (E3-B3). Relaxed, conversational delivery. This is your verse.", why: "Verses sit lower and calmer. They're intimate and storytelling. Your porch register lives here." },
        { text: "Section B: same chords, but sing higher (B3-E4) with more energy. Open up your vowels, push slightly more volume. This is your chorus.", why: "Choruses lift. Even a small range shift (a 3rd higher) creates contrast. The energy difference IS the structure." },
        { text: "Play A-A-B-A: verse, verse, chorus, verse. The chorus should feel like an arrival — the moment the song opens up.", why: "AABA is the simplest song form. Two verses set up the chorus, then you return. It creates expectation and payoff." },
        { text: "Record the whole thing. Listen back. Can you hear the contrast between A and B? If they sound the same, push the range and energy difference wider.", why: "Contrast between sections is what makes a song feel like it goes somewhere. No contrast = one long section, not a song." }
      ],
      feel: "The shift from A to B should feel like sunrise — a gentle but unmistakable lift. When you return to A after B, it should feel like coming home.",
      wrong: "If your A and B sound identical, the contrast isn't strong enough. Try: sing A in a near-whisper and B at normal volume. Exaggerate until the difference is obvious, then dial back.",
      sarah: "Gene, this two-section structure is every song you love. DOPE LEMON, Allah-Las, Skinshape — they all work this way. Low/calm verse, lifted chorus, return. You just built that.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "E4"),
      volumeMeter: true,
      recorder: true
    },
    {
      id: "ss-3-6",
      time: 10,
      title: "Second Song Sketch",
      type: "song",
      what: "Create a SECOND song sketch in a different feel. If your first was in Am (minor, melancholic), try G-C-D-Em (major, brighter). Different strum pattern too — if you jangled, try reggae chop. Two originals proves you have a method, not a fluke.",
      tracks: [{ name: "Reggae One Drop 85", src: "/reggae-one-drop-85.mp3" }],
      steps: [
        { text: "Choose a different chord progression and strum pattern from your first sketch. Variety is deliberate — it forces you to apply the method in a new context.", why: "Creating in a different context proves the skill is transferable. One sketch could be luck. Two sketches is a method." },
        { text: "Apply the same process: create melodic phrases using chord tones, string them together, add simple words. But let this one have its own personality.", why: "Each song should sound different because the chords, tempo, and strum feel different. Let the backing guide the melody." },
        { text: "Create two contrasting sections (A and B). The A/B contrast can be different from your first sketch — maybe this one's contrast is rhythmic instead of range-based.", why: "There are many ways to create contrast: range, volume, rhythm, density of words, strum intensity. Exploring different contrast types builds your toolkit." },
        { text: "Record the full sketch: A-A-B-A. Listen back to back with your first sketch. Hear the different personalities.", why: "Two sketches side by side reveal your emerging style — the common threads that appear in both are your artistic DNA." }
      ],
      feel: "The second sketch should feel easier to CREATE than the first — not because the song is simpler, but because the creation process is becoming natural. You know what to do now.",
      wrong: "If your second sketch sounds exactly like your first, you're in a comfort zone. Change the tempo, the feel, or the key. Force yourself into unfamiliar territory.",
      sarah: "Gene, two original song sketches. You created both from scratch — no covers, no imitation. That's the foundation of everything that follows. Every level from here builds on this ability.",
      metronome: 85,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true,
      levelUp: "Can create two original song sketches with contrasting A/B sections, sing chord-tone melodies with simple lyrics over strumming at 80-85 BPM."
    }
  ]
};
