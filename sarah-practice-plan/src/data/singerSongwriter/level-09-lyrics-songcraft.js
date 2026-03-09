import { getPitchRange } from "../appData.js";

export const level9 = {
  level: 9,
  title: "Lyrics & Songcraft",
  subtitle: "Show, don't tell. Sing, don't explain.",
  description:
    "Your songs have structure and melody. Now craft the words. Based on Pat Pattison's Berklee lyric method: use concrete images instead of abstract emotions. Show the listener a scene and let them feel the feeling themselves. Strong lyrics are specific, sensory, and surprising. This level teaches observation, imagery, prosody, and the art of editing.",
  artists: "DOPE LEMON, Nick Drake, Khruangbin (instrumental as lyric), Angus Stone",
  unlocks: "Fingerpicking & Dynamics (Level 10)",
  review: { label: "Level 7-8 Check-In", time: 5, exercises: ["ss-7-3", "ss-8-6"], prompt: "Sing over G-C-D-G feeling tension and resolution (ss-7-3). Then play through your arranged song (ss-8-6). Both solid? Move on." },
  exercises: [
    {
      id: "ss-9-1",
      time: 8,
      title: "Observation Lyrics",
      type: "record",
      what: "Write lyrics by observing — describe what you see, hear, smell, and feel right now. No metaphors, no cleverness. Pure sensory description. 'Steam rising off the coffee. Fan clicking overhead. Gecko on the screen door.' Pat Pattison's rule: concrete before abstract.",
      setup: "Notebook or phone. Guitar optional. A window, a lanai, any view.",
      steps: [
        { text: "Look around you. Write down 10 specific things you observe. Not feelings — THINGS. 'Rust on the railing. Plumeria smell. Dog sleeping on tile.'", why: "Observation bypasses the inner critic. You're not trying to be creative — you're reporting. The creativity emerges from the specificity." },
        { text: "Pick your 4 best observations. Arrange them in an order that tells a micro-story — maybe moving from near to far, or from morning to evening.", why: "Sequence creates narrative. Even observations, arranged thoughtfully, tell a story. The reader/listener infers emotion from the sequence." },
        { text: "Set each observation to a simple melody over your chord progression. Let the natural stress of the words guide the rhythm.", why: "Prosody — matching word stress to melodic stress — happens naturally when you speak the words musically. Don't force it." },
        { text: "Record the 4-line verse. Listen back. Does it create a mood without ever stating the mood directly? That's the goal of observational lyrics.", why: "The best lyrics make you feel something without telling you what to feel. 'Coffee getting cold' implies someone lost in thought without saying 'I'm lost in thought.'" }
      ],
      feel: "Observation lyrics should feel effortless — you're not inventing, you're noticing. The best ones surprise you: you describe your coffee and accidentally describe your mood.",
      wrong: "If your lyrics jump to abstractions ('I feel lonely'), you've left observation. Come back to concrete images. 'Empty chair across the table' says 'lonely' without the word.",
      sarah: "Gene, your lyric instincts lean toward nature and warmth — ocean, golden hour, palm trees. Lean into that. Your observations ARE your style. Just describe your world.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-9-2",
      time: 8,
      title: "Sensory Writing",
      type: "record",
      what: "Engage all 5 senses in your lyrics — not just what you see. What do you hear? Smell? Feel on your skin? Taste? Multisensory lyrics create immersive experiences. The listener doesn't just hear your song — they enter it.",
      setup: "Notebook. Guitar. A place with sensory richness (the lanai, the beach, a coffee shop).",
      steps: [
        { text: "Write one line for each sense: 'I see the palms bending / I hear the trade winds pushing / I smell the salt coming in / I feel the warm tile under my feet / I taste the mango on my tongue.'", why: "Explicitly writing for each sense forces you past visual-only description. Most lyrics over-rely on sight. Sound, smell, touch, and taste create deeper immersion." },
        { text: "Now remove the 'I see / I hear' frames. Just the images: 'Palms bending / trade winds pushing / salt coming in / warm tile underfoot / mango on the tongue.'", why: "Removing the 'I' frames makes lyrics more immediate and universal. The listener enters the scene instead of watching you describe it." },
        { text: "Set these to melody. One sense per phrase. The melody can shift texture to match: low notes for touch, higher notes for sight.", why: "Matching melody to sensory content creates synesthesia — the music reinforces the imagery." },
        { text: "Record the sensory verse. This is some of the most immersive lyric writing you can do.", why: "Multisensory lyrics are used by the best songwriters in every genre. They create the feeling of being there." }
      ],
      feel: "Sensory lyrics should transport you to a specific place and time. If you can close your eyes and feel the scene while singing, the words are working.",
      wrong: "If all your lines are visual ('I see...'), push into other senses. What's the temperature? What sound is underneath the obvious one? What does the air taste like?",
      sarah: "Gene, your Hawaiian life is a sensory goldmine. The salt air, the warm rain, the plumeria, the gecko sounds at night. Nobody else has YOUR specific sensory world. Use it.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-9-3",
      time: 6,
      title: "Rhyme & Near-Rhyme",
      type: "vocal",
      what: "Explore rhyming tools beyond perfect rhyme. Perfect rhyme (moon/June) is satisfying but predictable. Near-rhyme (moon/room), assonance (moon/noon/soon — same vowel), and consonance (moon/mine — same ending consonant) are subtler and more modern. Your lyrics don't need to rhyme — but sound patterns create musicality.",
      steps: [
        { text: "Pick a word from one of your lyrics: say, 'water.' Find perfect rhymes: daughter, quarter. Then near-rhymes: wander, farther, harbor. Then assonance: fallen, bottle, copper.", why: "Near-rhymes sound fresh because they satisfy the ear partially. The listener feels the echo without predicting the exact word." },
        { text: "Write a 4-line verse using near-rhymes instead of perfect rhymes. Lines 1 and 3 rhyme loosely. Lines 2 and 4 rhyme loosely.", why: "ABAB near-rhyme is the most common lyric pattern. It creates structure without forcing word choices that sound clichéd." },
        { text: "Try internal rhyme: rhyming within a line, not just at the end. 'The salt and the sand on my hands.' The rhyme binds the line together.", why: "Internal rhyme adds musicality without the rigidity of end-rhyme. It makes lines feel crafted and flowing." },
        { text: "Sing your rhymed and near-rhymed verses over a chord progression. Notice how rhyme affects phrasing — rhymed words naturally land on strong beats.", why: "Rhyme and rhythm are deeply connected. Placing rhymed syllables on stressed beats reinforces both the musical and lyrical pattern." }
      ],
      feel: "Rhyme should feel like a gentle echo — a sense that the sounds are related without being identical. Near-rhyme feels more natural than perfect rhyme in conversational vocal styles.",
      wrong: "If you're forcing rhymes that twist the meaning ('I love the shore / I need much more'), the rhyme is controlling you. Meaning always trumps rhyme. Drop the rhyme before you drop the meaning.",
      sarah: "Gene, DOPE LEMON and Skinshape lyrics barely rhyme — they use assonance and vowel echoes instead. Your laid-back style works better with near-rhyme than with strict rhyming.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-9-4",
      time: 6,
      title: "Prosody",
      type: "song",
      what: "Match your lyric stress to your melodic stress. When stressed syllables land on strong beats and high notes, the words feel natural. When they're mismatched, the words sound awkward. Prosody is the invisible art that separates amateur from professional lyrics.",
      steps: [
        { text: "Speak a lyric line aloud: 'The WAVES are ROLL-ing IN to-DAY.' The capitalized syllables are naturally stressed. Mark them.", why: "English has natural stress patterns. Every word has stressed and unstressed syllables. Ignoring them makes lyrics sound wrong." },
        { text: "Now sing the line over your chord progression. Do the stressed syllables land on strong beats (1 and 3) and high notes? If so, the prosody is good.", why: "When stress and beat align, lyrics sound effortless. When they clash, the listener feels something's 'off' even if they can't say why." },
        { text: "Find a line in your lyrics where the prosody is wrong — where an unstressed syllable lands on a strong beat. Rewrite the melody or the words to fix it.", why: "Prosody fixes are the single most impactful edit you can make. A song with good prosody sounds professional even if the melody is simple." },
        { text: "Speak-sing test: if you can speak the lyrics naturally and the melody follows your speech rhythm, the prosody is perfect.", why: "The speak-sing test is the fastest prosody check. If the melody contradicts your natural speech, something needs to change." }
      ],
      feel: "Good prosody feels invisible — the words and melody seem like they were born together. Bad prosody feels like wearing shoes on the wrong feet.",
      wrong: "If you're stressed the wrong way, sometimes flipping two words fixes it: 'today the waves' → 'the waves today.' Small word-order changes can fix prosody without changing meaning.",
      sarah: "Gene, your conversational vocal style actually makes prosody easier. You naturally speak-sing. Just make sure the melody matches how you'd say the words in conversation.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-9-5",
      time: 8,
      title: "Image & Metaphor",
      type: "record",
      what: "Transform observations into metaphors: 'The palm trees bending' becomes 'the island bowing.' 'Coffee getting cold' becomes 'time I poured but didn't drink.' Metaphors compress complex feelings into vivid images. They're the advanced tool of lyric writing.",
      setup: "Notebook. Your observation lyrics from ss-9-1.",
      steps: [
        { text: "Take 3 observation lines from ss-9-1. For each one, ask: 'What else looks / sounds / feels like this?' A gecko on the screen = something watching from the edges. Rust on the railing = time making its mark.", why: "Metaphor is just asking 'what does this remind me of?' The connection between concrete image and abstract meaning creates depth." },
        { text: "Write the metaphorical version alongside the literal version. Sometimes the literal is better. Sometimes the metaphor elevates it. Choose the stronger one.", why: "Not every line needs a metaphor. The contrast between literal and figurative creates texture. A song that's ALL metaphor is exhausting." },
        { text: "Create a verse that mixes observation and metaphor: 2 literal lines + 2 metaphorical lines. The literal grounds the listener; the metaphor lifts them.", why: "The mix of literal and metaphorical is the mark of a skilled lyricist. Paul Simon, Joni Mitchell, and every great songwriter does this." },
        { text: "Set the verse to melody. Record it. Listen: does the metaphor feel natural or forced? If forced, go back to the literal version.", why: "Forced metaphors are worse than no metaphors. If a listener has to puzzle out your meaning, the metaphor has failed. Clarity always wins." }
      ],
      feel: "Good metaphors should feel like surprises that make instant sense — 'oh, I never thought of it that way, but yes.' If the listener needs an explanation, it's too clever.",
      wrong: "If your metaphors are clichés ('my heart is on fire'), dig deeper. What does YOUR heart feel like? 'My chest is a sun-warmed stone' is specific and surprising.",
      sarah: "Gene, your natural imagery — ocean, golden hour, warmth — already has metaphorical weight. 'The sun going down' is literally what you see AND a metaphor for ending. You don't have to reach far.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },
    {
      id: "ss-9-6",
      time: 6,
      title: "The Edit",
      type: "record",
      what: "Take one of your completed songs and CUT it — remove every word that isn't essential. If a line works without an adjective, remove the adjective. If a verse repeats what another verse said, cut it. Editing is where good songs become great songs. As Pat Pattison says: 'Don't bore us, get to the chorus.'",
      setup: "A completed song from Level 6-8. Notebook. Willingness to kill your darlings.",
      steps: [
        { text: "Write out all your lyrics. Read them without the music. Cross out any word you could remove without losing meaning.", why: "Words that serve no purpose dilute the impact of words that do. Every unnecessary word weakens the song." },
        { text: "Look for 'telling' lines that could be 'showing' lines. 'I'm sad' → cut. 'Empty glass on the table' → keep. The image does the work.", why: "Telling robs the listener of the experience of feeling. Showing lets them discover the emotion themselves — which is 10x more powerful." },
        { text: "Check: does every line earn its place? If you removed a line, would the song lose something important? If not, cut it.", why: "The best songs have zero waste. Every line advances the story, deepens the image, or serves the melody." },
        { text: "Sing the edited version. Compare it to the original recording. The shorter version almost always hits harder.", why: "Editing is the most underrated songwriting skill. The willingness to cut your own words separates professionals from amateurs." }
      ],
      feel: "Editing should feel ruthless but satisfying — like pruning a tree. You're not destroying; you're revealing the shape that was always there underneath the excess.",
      wrong: "If you can't cut anything, your inner editor is too attached. Show the lyrics to someone else and ask 'which lines could go?' Fresh eyes find waste instantly.",
      sarah: "Gene, your laid-back vocal style benefits enormously from sparse lyrics. Fewer words + more space = more impact. Think: each word is a wave. Space between waves lets each one land.",
      metronome: 80,
      recorder: true,
      levelUp: "Can write lyrics using observation, sensory detail, near-rhyme, and metaphor. Can match prosody to melody and edit songs for maximum impact."
    }
  ]
};
