import { getPitchRange } from "../appData.js";

export const level6 = {
  level: 6,
  title: "Creating Your First Songs",
  subtitle: "Chord tones become melodies. Melodies become songs.",
  description:
    "You can strum and sing individual notes. Now create original melodic phrases using the chord tones from Level 2. Start with 2-note phrases, grow to 4-note melodies, then string them into a simple song sketch. Everything is YOUR creation — no covers, no imitation. Based on Orff's 'create before you analyze' and Kratus's first improvisation level: exploration within constraints.",
  artists: "DOPE LEMON, Skinshape, Khruangbin",
  unlocks: "Rhythm & Feel (Level 7)",
  review: { label: "Level 4-5 Check-In", time: 5, exercises: ["ss-4-14", "ss-5-16"], prompt: "Combine two skills freely over a backing track (ss-4-14). Then sustain 5-minute freestyle over changes (ss-5-16). Both flowing? Move on." },
  exercises: [
    {
      id: "ss-6-1",
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
      id: "ss-6-2",
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
      id: "ss-6-3",
      time: 8,
      title: "Melody Over Changes",
      type: "song",
      drone: { mode: "cycle", preset: "cinematic-sky" },
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
      id: "ss-6-4",
      time: 8,
      title: "Add Simple Words",
      type: "song",
      what: "Take your favorite melody from ss-6-3 and add simple, descriptive words. No poetry, no cleverness — just describe what you see or feel. 'Sun is going down / water on the rocks / wind is getting warm.' Words turn melodies into songs.",
      steps: [
        { text: "Play your chord progression with your melody from ss-6-3. Hum it once through to lock it in.", why: "Reaffirming the melody before adding words ensures the pitch and rhythm are stable." },
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
      id: "ss-6-5",
      time: 6,
      title: "Object Writing Warm-Up",
      type: "record",
      what: "Pat Pattison's 7-sense exercise adapted for songwriters. Pick a songwriting-relevant object — wave, bonfire, highway at dusk — and free-write or speak for 5 minutes using all seven senses: sight, sound, smell, taste, touch, organic (internal body sensations), and kinesthetic (movement/muscle). No guitar needed. This builds the sensory vocabulary that makes lyrics vivid instead of generic.",
      steps: [
        { text: "Pick an object that connects to your lyric world — wave, bonfire, dust road, salt air, golden hour. Set a 5-minute timer. Don't overthink the choice.", why: "Songwriting-relevant objects prime your subconscious for lyrics. The timer removes perfectionism — you can't edit in 5 minutes, you can only generate." },
        { text: "Start with sight and sound — the easiest senses. Describe the object out loud or in writing. What does a bonfire look like at different distances? What does it sound like when a log shifts?", why: "Sight and sound are your dominant senses, so they're the on-ramp. Starting easy builds momentum before you reach the harder senses." },
        { text: "Push into smell, taste, and touch. What does the salt air taste like? What's the texture of warm sand under your feet? These senses live in the body, not the mind — they trigger emotion directly.", why: "Smell and taste bypass the analytical brain and connect straight to memory and emotion. Lyrics that use these senses feel intimate and real." },
        { text: "Now go deep: organic (what does your stomach do when the wave pulls you under?) and kinesthetic (the weight shift when you lean into wind). These are the senses most writers skip — and they're the most powerful.", why: "Organic and kinesthetic details are rare in lyrics, which makes them stand out. 'My chest tightened' is more vivid than 'I was scared.'" },
        { text: "When the timer ends, stop. Read or listen back. Circle or note any phrase that surprises you — those surprising phrases are future song seeds.", why: "The best material in object writing is what you didn't plan to say. Surprise = your subconscious contributing. That's where authentic lyrics live." }
      ],
      feel: "This should feel like a warm-up, not a performance. Speed matters more than quality. You're mining for raw material, not polishing gems.",
      wrong: "If you stop to edit or judge a phrase, you've switched from generating to evaluating. Keep the pen moving or keep talking. Editing comes later.",
      sarah: "Gene, your best lyrics already come from sensory places — ocean, warmth, golden hour, travel. This exercise gives you a method to go deeper into those worlds on demand. Think of it as stocking your lyric pantry.",
      recorder: true
    },
    {
      id: "ss-6-6",
      time: 7,
      title: "Title-First Song Seed",
      type: "song",
      what: "Andrea Stolpe's title-first method: generate 10 potential song titles, rate each for specificity, emotional resonance, and curiosity factor, then pick the strongest one and write a 4-bar melody that the title demands. The title constrains and directs the creative process — it's easier to write a song when the title tells you what it needs.",
      steps: [
        { text: "Brainstorm 10 potential song titles in 2 minutes. Pull from your world — places, feelings, images, overheard phrases. 'Saltwater Afternoon,' 'Dust on the Dashboard,' 'Last Wave Home.' Quantity over quality.", why: "Generating many titles quickly bypasses your inner critic. The best titles often come at position 6-10, after the obvious ideas are spent." },
        { text: "Rate each title on three criteria (1-5 scale): specificity (is it concrete or vague?), emotion (does it make you feel something?), curiosity (would you want to hear this song?). Add the scores.", why: "Rating forces you to evaluate objectively. A title like 'Love' scores low on specificity and curiosity. 'Saltwater Afternoon' scores higher because it paints a picture and raises questions." },
        { text: "Pick the highest-scoring title. Say it out loud 5 times. Notice where the emphasis falls, how many syllables it has, what rhythm it suggests. The title already contains a melodic seed.", why: "Spoken rhythm is the bridge between words and melody. The natural stress pattern of a title phrase often dictates the melodic rhythm." },
        { text: "Strum Am or G at 80 BPM. Sing the title as a 2-bar phrase, letting its natural rhythm guide the melody. Repeat and vary until it clicks. Then extend to 4 bars by adding a response phrase.", why: "Singing the title first anchors the song's hook. The response phrase creates a call-and-answer structure — the most natural melodic conversation." },
        { text: "Record your title melody. You now have a song seed with a built-in hook. File it — this is the starting point for a future complete song.", why: "Professional songwriters keep libraries of title melodies. Most songs aren't written in one sitting — they grow from seeds like this one." }
      ],
      feel: "The brainstorming phase should feel fast and playful. The melody phase should feel like discovery — the title already knows what melody it wants; you're just uncovering it.",
      wrong: "If all your titles are abstract ('Love,' 'Freedom,' 'Hope'), push for sensory specificity. Replace 'Freedom' with 'Windows Down on Highway 1.' Concrete beats abstract every time.",
      sarah: "Gene, think about the titles of songs you love — 'Hyptnotize' by DOPE LEMON, 'Maria También' by Khruangbin. Great titles make you curious before you hear a single note. Your titles can do the same.",
      metronome: 80,
      recorder: true
    },
    {
      id: "ss-6-7",
      time: 10,
      title: "Ugly First Draft",
      type: "song",
      what: "Write a complete song sketch in 10 minutes flat. Timer on. Two chords, hum until a melody appears, add whatever words come, create a chorus that lifts. Do NOT edit, restart, or judge. The goal is a finished ugly draft — because finished beats perfect. Creative confidence comes from velocity, not polish.",
      tracks: [{ name: "Khruangbin Style 80", src: "/khruangbin-style-80.mp3" }],
      steps: [
        { text: "Set a 10-minute timer. Pick two chords — Am and C, or G and Em. Start strumming. Hum over the chords until a melodic shape emerges. Don't wait for inspiration — just start making sound.", why: "Constraints accelerate creativity. Two chords eliminates harmonic decisions so your brain can focus entirely on melody and words. The timer kills perfectionism." },
        { text: "Once you have a 2-bar melodic phrase (even a rough one), add words. Any words. Describe what's in front of you, narrate your morning, say nonsense syllables that feel right. Keep strumming, keep singing.", why: "Words don't need to be good — they need to exist. Placeholder lyrics often contain accidental brilliance that you'd never find by trying to be clever." },
        { text: "By minute 5, commit to a verse melody and a chorus melody. The chorus should sit slightly higher or feel more open. If you can't decide, just pick one and move forward.", why: "The halfway point is decision time. Indecision is the enemy of drafts. Any committed choice is better than endless deliberation." },
        { text: "Minutes 6-10: sing the full structure twice — verse, chorus, verse, chorus. Add or change words on the fly. When the timer ends, STOP. Do not fix anything.", why: "Playing through the full form reveals what works and what doesn't — but fixing happens later, in revision. Right now you're building the habit of finishing." },
        { text: "Record the final pass. Label it 'Ugly Draft #1.' Congratulations — you have a complete song. It's rough. That's the point.", why: "Labeling it 'ugly' gives you permission to be imperfect. Professional songwriters write dozens of ugly drafts for every polished song. The ratio is the method." }
      ],
      feel: "This should feel slightly uncomfortable — like sprinting instead of jogging. The time pressure is intentional. You're building the muscle of finishing, not the muscle of perfecting.",
      wrong: "If you stopped and restarted, you broke the rule. The whole point is to push through the cringe and finish something imperfect. Restart the timer and try again — no restarts allowed.",
      sarah: "Gene, every Skinshape and DOPE LEMON track started as an ugly draft that someone had the guts to finish. Your first draft doesn't need to be good. It needs to be done. You can polish later — but you can't polish something that doesn't exist.",
      recorder: true
    },
    {
      id: "ss-6-8",
      time: 7,
      title: "Chord Tone Color Painting",
      type: "vocal",
      what: "Paint with chord tones as colors across a 2-chord progression. Root is earth (grounding, stable), 3rd is emotion (warm or cool depending on major/minor), 5th is sky (open, floating). Navigate Am to C feeling the palette shift as each chord's tones change role. This extends the 'notes as colors' concept from Level 3 into a songwriting context.",
      drone: { root: "A", octave: 2, texture: "warm" },
      steps: [
        { text: "Strum Am. Sing the root A — feel it as earth, the ground your song stands on. Now sing the minor 3rd C — feel the emotional weight, a soft ache. Now sing the 5th E — feel the openness, looking up.", why: "Assigning sensory metaphors to intervals helps you choose notes intentionally when writing melodies. Root for grounding, 3rd for feeling, 5th for space." },
        { text: "Switch to C major. The root is now C (new ground), the 3rd is E (but now it's warm and bright — major 3rd), the 5th is G (different sky). Notice how E changed character: it was Am's floating 5th, now it's C's warm emotional center.", why: "The same pitch changes meaning depending on its harmonic context. E over Am feels open; E over C feels intimate. This awareness is what makes melodies expressive over changes." },
        { text: "Alternate Am and C (4 bars each). On each chord, consciously choose which 'color' to emphasize. Want grounding? Lean on the root. Want emotion? Lean on the 3rd. Want air? Lean on the 5th. Paint your melody with intention.", why: "Deliberate tone selection transforms random note choice into compositional decision-making. You're not just singing chord tones — you're choosing emotional texture." },
        { text: "Create a 4-bar phrase that starts on earth (root of Am), moves through emotion (3rd of Am), shifts to the new ground (root of C), and ends on sky (5th of C). Record this 'color journey' melody.", why: "A melody that moves through different tonal colors across a chord change tells a micro-story: grounding → feeling → transition → release. That's songwriting." },
        { text: "Improvise freely for 2 minutes, thinking in colors rather than note names. Let your ear guide you toward the tones that feel right in the moment.", why: "Internalizing the color metaphor frees you from thinking about theory. When you feel 'I want more openness here,' you instinctively reach for the 5th. Intuition replaces calculation." }
      ],
      feel: "This should feel meditative and visual — like painting with your voice. Each tone has a texture and temperature. You're choosing colors, not calculating intervals.",
      wrong: "If you're thinking in note names (A, C, E) instead of feeling the tonal character, slow down. Sing each tone, hold it for 4 beats, and notice what it feels like in your body before moving on.",
      sarah: "Gene, this is how you'll eventually write melodies that give people chills — by knowing that a 3rd over a minor chord aches and a 5th over a major chord soars. You're building an emotional vocabulary, not a theoretical one.",
      referencePitches: getPitchRange("A2", "G4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-9",
      time: 8,
      title: "Song Deconstruction I",
      type: "listen",
      what: "Pick a DOPE LEMON or Skinshape track you love. Listen three times with three different focuses: (1) map the structure — where do sections start and end, (2) trace the melodic contour — does the chorus sit higher than the verse, (3) count phrasing density — how many words per bar in verse versus chorus. This is a lighter version of Level 5's full 5-layer analysis, focused on the three elements most relevant to your own songwriting right now.",
      steps: [
        { text: "Listen 1 — Structure Map: play the track and mark section boundaries. Is it verse-chorus-verse-chorus-bridge-chorus? AABA? Something else? Write or speak the map as you go. Note timestamps.", why: "Understanding form is the most immediately useful analytical skill for songwriting. Before you can build structure, you need to see how others build it." },
        { text: "Listen 2 — Melodic Contour: focus only on the vocal melody. Does the verse melody sit in a lower range than the chorus? Does the bridge go somewhere new? Hum along and notice where the melody lifts and where it settles.", why: "Range mapping reveals the architecture of emotional intensity. Most songs place their highest melody in the chorus — that's the lift you felt in ss-6-5 (Two-Section Song Sketch). Now see it in professional work." },
        { text: "Listen 3 — Phrasing Density: count roughly how many words or syllables land per bar in the verse versus the chorus. Is the verse wordy and the chorus spacious? Or the opposite?", why: "Phrasing density is a hidden lever of songwriting. Wordy verses that open into spacious choruses create a breathing sensation. The contrast in density IS part of the hook." },
        { text: "Write a one-paragraph summary: 'This song uses [form]. The verse melody sits around [range], the chorus lifts to [range]. Verse phrasing is [dense/sparse], chorus is [dense/sparse].' Record your observations.", why: "Articulating your observations makes them usable. Next time you write a song, you can deliberately apply or subvert these patterns." }
      ],
      feel: "This should feel like detective work — you're reverse-engineering something you love. Each listen reveals a new layer that was always there but you never noticed.",
      wrong: "If you're just passively enjoying the track, you're listening like a fan, not a songwriter. Force yourself to count, map, and describe. Analytical listening is a different mode.",
      sarah: "Gene, the artists you love — DOPE LEMON, Skinshape, Khruangbin — are your best teachers. But only if you listen like a songwriter, not just a listener. This exercise teaches you to steal like an artist.",
      recorder: true
    },
    {
      id: "ss-6-10",
      time: 8,
      title: "Melody Recycling",
      type: "song",
      what: "Take your best 2-bar melodic phrase from earlier exercises in this level. Build a 16-bar melody by repeating and varying it four ways: same phrase shifted up, same phrase with different rhythm, same phrase reversed, same phrase with one note changed. Repetition with variation is the engine of songwriting — one good idea, recycled intelligently, is all you need.",
      steps: [
        { text: "Pick your strongest 2-bar phrase from this level's exercises. Sing it 4 times to lock it in. This is your seed — the melodic DNA of a 16-bar melody.", why: "Starting from your best existing material is more efficient than inventing from scratch. Professional songwriters build entire songs from a single 2-bar motif." },
        { text: "Variation 1 — Shift Up: sing the same phrase starting a 3rd higher. Same rhythm, same contour, higher register. Bars 3-4.", why: "Transposition up creates a sense of development and forward motion. The listener recognizes the shape but feels it moving somewhere new." },
        { text: "Variation 2 — Rhythm Change: sing the original phrase (back to the original pitch) but change the rhythm. If it was even quarter notes, make it syncopated. If it was flowing, make it staccato. Bars 5-6.", why: "Rhythmic variation is the subtlest and most powerful tool. The melody is recognizable because the pitches are the same, but it feels fresh because the groove changed." },
        { text: "Variation 3 — Reverse or Invert: sing the phrase backward (last note first) or flip its direction (rising becomes falling). Bars 7-8. This might sound strange — that's fine. Let it be weird.", why: "Retrograde and inversion are classical composition techniques that pop songwriters use instinctively. The weirdness creates contrast, which makes the return to the original more satisfying." },
        { text: "Variation 4 — One Note Changed: sing the original phrase but change exactly one note. Replace it with a note that surprises you. Bars 9-10. Then repeat the original unaltered as bars 11-16 (home). Record the full 16 bars.", why: "Changing one note is the minimum edit that creates something new. The return to the unaltered original at the end creates resolution — the melody went on a journey and came home." }
      ],
      feel: "This should feel like sculpting — you have a block of marble (your phrase) and you're carving variations from it. Each variation reveals a different face of the same idea.",
      wrong: "If your variations sound completely unrelated to the original, you've changed too much. The listener should be able to hear the family resemblance. Pull back toward the original and change less.",
      sarah: "Gene, this is literally how Khruangbin builds songs — one melodic phrase, recycled and varied across the whole track. 'Maria También' is basically one idea with beautiful variations. You're learning their method.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      pitchContour: true,
      recorder: true
    },
    {
      id: "ss-6-11",
      time: 5,
      title: "Voice Memo Capture Practice",
      type: "record",
      what: "Generate 3 song seeds in 5 minutes: one melody fragment, one groove or strum idea, one lyric phrase. Record each into this app or your phone. Tag each with mood, feel, and date. This exercise builds the capture habit — prolific songwriters capture 5-10x more ideas than they ever finish, and the capturing itself keeps the creative pipeline flowing.",
      steps: [
        { text: "Seed 1 — Melody Fragment (90 seconds): hum or sing the first melodic idea that comes to mind. It can be 2 notes or 8 notes. Record it immediately. Don't develop it — just capture it.", why: "Melody fragments are the most perishable creative material. They evaporate in minutes if not captured. Speed of capture matters more than quality of the idea." },
        { text: "Seed 2 — Groove/Strum Idea (90 seconds): play a strum pattern or rhythmic idea on guitar. It doesn't need chords — even a muted rhythmic pattern counts. Record it.", why: "Grooves are independent song seeds. Many songs start from a rhythmic feel, not a melody. Your reggae chop, your surf jangle — each is a potential song foundation." },
        { text: "Seed 3 — Lyric Phrase (90 seconds): say or write a phrase that could be a lyric. Pull from your object writing, a conversation you overheard, a sign you saw. Record it.", why: "Lyric phrases captured in the wild are more authentic than lines crafted at a desk. The best songwriters are always collecting language." },
        { text: "Tag each recording: mood (chill / driving / melancholy / bright), feel (surf / reggae / desert / soul), and today's date. These tags make your seeds findable when you need inspiration later.", why: "An untagged voice memo is a lost voice memo. Tags turn a pile of recordings into a searchable song seed library." }
      ],
      feel: "This should feel like a creative sprint — fast, low-stakes, generative. You're filling a notebook, not writing a masterpiece. The value is in the habit, not any single seed.",
      wrong: "If you spent more than 90 seconds on any single seed, you're developing instead of capturing. Capture is fast and messy. Development is slow and intentional. This exercise is capture only.",
      sarah: "Gene, the difference between someone who writes songs and someone who talks about writing songs is the capture habit. Three seeds a day, five days a week — that's 750 song seeds a year. Even if 95% are trash, that's 37 usable ideas. Start the habit now.",
      recorder: true
    },
    {
      id: "ss-6-12",
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
      recorder: true,
      phraseForm: { pattern: "AABA", barsPerSection: 4, labels: { A: "Verse", B: "Chorus" } }
    },
    {
      id: "ss-6-13",
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
      levelUp: "Can create two original song sketches with contrasting A/B sections, sing chord-tone melodies with simple lyrics over strumming at 80-85 BPM, build sensory vocabulary through object writing, generate song seeds from titles, write complete ugly first drafts under time pressure, paint with chord tones as colors, deconstruct songs for structure and contour, recycle melodies through variation, and capture ideas habitually."
    }
  ]
};
