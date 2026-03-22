import { getPitchRange } from "../appData.js";

export const level13 = {
  level: 13,
  title: "Lyrics & Songcraft",
  subtitle: "Show, don't tell. Sing, don't explain.",
  description:
    "Your songs have structure and melody. Now craft the words. Based on Pat Pattison's Berklee lyric method: use concrete images instead of abstract emotions. Show the listener a scene and let them feel the feeling themselves. Strong lyrics are specific, sensory, and surprising. This level teaches observation, imagery, prosody, and the art of editing.",
  artists: "DOPE LEMON, Nick Drake, Khruangbin (instrumental as lyric), Angus Stone",
  unlocks: "Fingerpicking & Dynamics (Level 13)",
  review: { label: "Level 11-12 Check-In", time: 5, exercises: ["ss-11-3", "ss-12-6"], prompt: "Sing over G-C-D-G feeling tension and resolution (ss-11-3). Then play through your arranged song (ss-12-6). Both solid? Move on." },
  exercises: [
    {
      id: "ss-13-1",
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
      id: "ss-13-2",
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

    // ─── NEW: OBJECT WRITING DAILY ───

    {
      id: "ss-13-3",
      time: 6,
      title: "Object Writing Daily",
      type: "record",
      what: "Pat Pattison's 10-minute timed exercise to a sense-trigger word. Today's words: 'salt,' 'rust,' 'tide,' 'ember.' Pick one. Timer on. Write or speak using all 7 senses (sight, sound, smell, taste, touch, organic/body, kinesthetic/motion). Don't stop, don't edit. Circle the vivid surprises after. Do this every day — it's the #1 lyric muscle builder.",
      setup: "Timer set to 10 minutes. Notebook or recorder. One trigger word chosen.",
      steps: [
        { text: "Pick one trigger word: salt, rust, tide, or ember. Set a 10-minute timer. Start writing or speaking — describe everything the word brings up across all 7 senses. Don't stop. Don't cross anything out. Let the associations flow, even when they get weird.", why: "Timed writing disables the inner editor. The constraint of the clock forces raw output. Pattison calls this 'writing past your censor' — the best material often comes after the obvious stuff runs out around minute 4." },
        { text: "When the timer stops, STOP. Read or listen back. Circle any phrase that surprises you — something you didn't expect to write. These surprises are your lyric gold.", why: "The surprises are where your subconscious voice lives. Expected phrases ('the salty sea') are cliches. Unexpected connections ('salt on the rim of a glass I never ordered') are original lyrics waiting to happen." },
        { text: "Take your 2-3 best circled phrases and speak them aloud with rhythm. Do any of them want to become a verse? A chorus hook? Just notice — don't force it yet.", why: "Object writing is raw material, not finished lyrics. The goal is to fill a well you draw from later. Some phrases will haunt you for days and find their way into songs naturally." },
        { text: "Record yourself reading your best lines. Save them. Tomorrow, pick a new trigger word and do it again. The daily habit matters more than any single session.", why: "Pattison assigns this daily at Berklee for a reason — lyric writing is a muscle. Ten minutes a day builds a sensory vocabulary that makes every future song richer." }
      ],
      feel: "Object writing should feel like a faucet that starts rusty and then runs clear. The first minute is cliches. Minutes 4-10 are where the real material lives. Trust the timer.",
      wrong: "If you're editing as you go — crossing out words, restarting sentences — you're defeating the purpose. The rule is: don't stop writing until the timer stops. Quality control comes AFTER, not during.",
      sarah: "Gene, your trigger words are chosen for your world — salt is the ocean, rust is the old trucks and railings, tide is the rhythm of island life, ember is the fire pit at sunset. These aren't random. They're YOUR sensory anchors. Your lyric DNA from your top 50 songs is ocean, golden hour, travel, warmth, and coastline. Your aesthetic archetype: 'a beautiful day that you know will end.' Use these as trigger words too: sunset, warm rain, golden hour, plumeria, porch, dusk. These aren't just images — they're the emotional vocabulary your music already speaks.",
      recorder: true
    },

    // ─── NEW: POINT OF VIEW ───

    {
      id: "ss-13-4",
      time: 7,
      title: "Point of View",
      type: "record",
      what: "Write the same scene three ways: 1st person ('I watch the tide...'), 2nd person ('You watch the tide...'), 3rd person ('She watches the tide...'). Each POV changes emotional distance and intimacy. 1st = confessional. 2nd = accusatory or intimate. 3rd = cinematic. POV is one of the most powerful and least discussed tools in songwriting.",
      setup: "Notebook. A scene in mind — real or imagined. Something with sensory detail you can describe.",
      steps: [
        { text: "Pick a scene: maybe watching the sunset from the lanai, or driving the coast road. Write 4 lines in 1st person: 'I lean against the railing. I watch the colors bleed. I hear the ice shift in my glass. I don't want to leave.'", why: "1st person is the default in songwriting — confessional, direct, emotionally close. The listener becomes you. It's powerful but also the most expected POV." },
        { text: "Rewrite the same scene in 2nd person: 'You lean against the railing. You watch the colors bleed.' Notice how the emotional tone shifts — it can feel intimate (talking to someone) or accusatory (pointing a finger) or even self-addressed (talking to yourself).", why: "2nd person is the most versatile and underused POV. 'You' can mean a lover, the listener, or yourself. That ambiguity creates emotional depth. Think of how 'You don't know what you've got till it's gone' works on multiple levels." },
        { text: "Rewrite again in 3rd person: 'She leans against the railing. She watches the colors bleed.' Now you're a camera operator. The scene becomes cinematic, with emotional distance that lets the listener observe rather than feel directly.", why: "3rd person creates narrative distance — the listener watches a character instead of becoming one. It works for storytelling songs and adds a filmic quality. Khruangbin instrumentals feel like 3rd person — observing a scene from the outside." },
        { text: "Read all three versions aloud. Which one feels most natural for this scene? Which one surprises you? Record the strongest version. The 'right' POV depends on the song — now you can choose deliberately.", why: "Most songwriters default to 1st person without considering alternatives. Having POV as a conscious choice means you can match the emotional distance to the song's needs." }
      ],
      feel: "Each POV should feel like adjusting a camera lens — 1st person is a close-up, 2nd person is eye-to-eye, 3rd person is a wide shot. Same scene, completely different emotional experience.",
      wrong: "If all three versions feel the same, you're not leaning into the POV shift enough. 1st person should feel intimate and vulnerable. 3rd person should feel detached and observational. If they blend together, exaggerate the differences.",
      sarah: "Gene, your natural voice is probably 1st person — that porch-storyteller, conversational delivery. But try 2nd person for your love songs. 'You' aimed at someone specific creates incredible intimacy with your laid-back vocal tone.",
      recorder: true
    },

    // ─── NEW: LYRIC DENSITY MAPPING ───

    {
      id: "ss-13-5",
      time: 7,
      title: "Lyric Density Mapping",
      type: "song",
      what: "Take a finished song and count syllables per beat in each section. High density (many syllables per beat) = storytelling, conversational, urgent. Low density (few syllables per beat) = declarative, emotional weight, space. The CONTRAST between sections is the tool. Many great songs have dense verses and sparse choruses.",
      setup: "A finished or in-progress song. Guitar. Metronome at 80 BPM. Notebook to mark density.",
      steps: [
        { text: "Sing through your verse. Count how many syllables you're singing per bar. A line like 'I was driving down the highway when the sun started going down' might pack 16 syllables into 2 bars — that's high density, storytelling mode.", why: "Density is a compositional tool most songwriters use unconsciously. Making it conscious lets you control pacing and emotional weight deliberately." },
        { text: "Now sing through your chorus. Count syllables per bar again. If your chorus is also high density, you've found a problem — there's no contrast. The listener's ear needs the texture to shift between sections.", why: "Contrast is what makes sections feel different. If your verse and chorus have the same syllable density, they'll feel like one long section regardless of chord changes or melody shifts." },
        { text: "Rewrite your chorus (or verse) to create density contrast. If the verse is dense, strip the chorus to fewer, longer syllables: 'Golden hour' instead of 'When the light turns gold across the water.' Let the space carry the weight.", why: "Low-density lines create emotional gravity. When you've been telling a story at high speed and suddenly slow to three words, those words land like stones. Think of how 'Let it be' works after dense Beatles verses." },
        { text: "Sing the revised version with the density contrast. Record it. The song should now breathe differently between sections — storytelling verses, spacious choruses (or vice versa).", why: "Density mapping is one of the fastest ways to improve a song that feels 'flat' or 'same-y.' The fix is often not better words — it's fewer words in one section and more in another." }
      ],
      feel: "Density contrast should feel like the difference between walking through a forest (dense, detailed, immersive) and stepping out onto a cliff edge (open, spacious, breathtaking). Both are beautiful. The transition between them is the magic.",
      wrong: "If your whole song runs at one density level — all dense or all sparse — there's no dynamic shape. Even spoken conversation naturally alternates between detailed stories and short emotional statements. Your lyrics should too.",
      sarah: "Gene, your conversational porch delivery naturally runs high-density — lots of syllables, storytelling mode. That's great for verses. But your choruses need SPACE. Think of DOPE LEMON's hooks — they're almost always short, simple, and surrounded by air.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── RHYME & NEAR-RHYME (was ss-13-3) ───

    {
      id: "ss-13-6",
      time: 6,
      title: "Rhyme & Near-Rhyme",
      type: "vocal",
      what: "Explore rhyming tools beyond perfect rhyme. Perfect rhyme (moon/June) is satisfying but predictable. Near-rhyme (moon/room), assonance (moon/noon/soon — same vowel), and consonance (moon/mine — same ending consonant) are subtler and more modern. Your lyrics don't need to rhyme — but sound patterns create musicality.",
      steps: [
        { text: "Pick a word from one of your lyrics: say, 'water.' Find perfect rhymes: daughter, quarter. Then near-rhymes: wander, farther, harbor. Then assonance: fallen, bottle, copper.", why: "Near-rhymes sound fresh because they satisfy the ear partially. The listener feels the echo without predicting the exact word." },
        { text: "Write a 4-line verse using near-rhymes instead of perfect rhymes. Lines 1 and 3 rhyme loosely. Lines 2 and 4 rhyme loosely.", why: "ABAB near-rhyme is the most common lyric pattern. It creates structure without forcing word choices that sound cliched." },
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

    // ─── PROSODY (was ss-13-4) ───

    {
      id: "ss-13-7",
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
      wrong: "If you're stressed the wrong way, sometimes flipping two words fixes it: 'today the waves' -> 'the waves today.' Small word-order changes can fix prosody without changing meaning.",
      sarah: "Gene, your conversational vocal style actually makes prosody easier. You naturally speak-sing. Just make sure the melody matches how you'd say the words in conversation.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: PATTISON'S STABLE/UNSTABLE ───

    {
      id: "ss-13-8",
      time: 7,
      title: "Pattison's Stable/Unstable",
      type: "song",
      what: "Every line has an emotional quality: stable (resolved, statement, closure) or unstable (open, questioning, tension). Masculine endings (stress on the final syllable: 'the sea') feel stable. Feminine endings (unstressed final syllable: 'the ocean') feel unstable. Match stability to section function: unstable in verses (unresolved), stable in choruses (resolved).",
      setup: "Guitar. A song in progress or a finished song to analyze. Notebook for marking line endings.",
      steps: [
        { text: "Take a verse you've written. Read each line aloud and mark the final word: does it end on a stressed syllable (masculine/stable) or an unstressed syllable (feminine/unstable)? 'I walked down to the sea' = stable. 'I walked down to the ocean' = unstable.", why: "Pattison's stable/unstable framework explains why some lines feel like they land and others feel like they float. It's not random — it's the stress pattern of the final word creating resolution or tension." },
        { text: "Check your verse: are most line endings unstable (feminine)? Good — verses should feel unresolved, like they're searching for the chorus. If your verse lines all end stable, the verse feels too settled and the chorus has nowhere to go.", why: "Unstable verse endings create forward motion — the listener feels the verse leaning toward something. This is the pull that makes them want to hear the chorus." },
        { text: "Now check your chorus: are the line endings stable (masculine)? They should be. The chorus is the emotional arrival. 'Let it be' — stable. 'Redemption song' — stable. These endings feel like landing after a journey.", why: "Stable chorus endings create the feeling of resolution and home. The verse wanders (unstable), the chorus arrives (stable). This stability contrast is one of the deepest structural tools in songwriting." },
        { text: "Rewrite any lines that fight their section's function. If a verse line feels too resolved, swap the final word for a feminine ending. If a chorus line feels unresolved, find a masculine ending. Record the revised version.", why: "This is a surgical tool — changing one word at the end of a line can shift its entire emotional quality. It's the kind of craft that listeners feel but can't articulate." }
      ],
      feel: "Stable lines should feel like setting something down on a table — settled, arrived, done. Unstable lines should feel like reaching for something just out of grasp — open, searching, unfinished.",
      wrong: "If your whole song feels emotionally flat, check whether every line has the same stability. A song that's all stable feels static. A song that's all unstable feels aimless. The contrast between them creates emotional shape.",
      sarah: "Gene, your porch delivery naturally gravitates toward stable endings — short, declarative phrases. That's perfect for choruses. For verses, try letting lines trail off with unstressed endings — 'driving,' 'fading,' 'somewhere' — to create that searching, unresolved quality before the chorus lands.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: RHYME HIERARCHY ───

    {
      id: "ss-13-9",
      time: 6,
      title: "Rhyme Hierarchy",
      type: "vocal",
      what: "Write the same couplet using 4 rhyme levels: (1) Perfect rhyme (fire/desire) = strong resolution, (2) Family rhyme (stone/home) = near-resolution, (3) Assonance (time/mind) = open, longing, (4) Consonance (sick/back) = tension, unease. Each rhyme type creates a different emotional 'click.' Don't default to perfect rhyme everywhere — choose your rhyme level to match the feeling.",
      setup: "Notebook. A couplet or two-line phrase to experiment with.",
      steps: [
        { text: "Write a simple couplet with perfect rhyme: 'I watch the waves come rolling in / I feel the salt against my skin.' Notice the strong sense of closure — the rhyme clicks shut like a lock.", why: "Perfect rhyme creates maximum resolution. It's satisfying and memorable, which is why it works in choruses and hooks. But it can also sound predictable — the listener hears 'in' and already guesses 'skin.'" },
        { text: "Rewrite with family rhyme (same vowel, different consonant): 'I watch the waves come rolling in / I feel the salt against my limbs.' The rhyme echoes but doesn't fully close. It feels related but open.", why: "Family rhyme (also called slant rhyme) gives 80% of the satisfaction with none of the predictability. It's the workhorse rhyme of modern songwriting — Bon Iver, Phoebe Bridgers, and your psych-surf artists use it constantly." },
        { text: "Rewrite with assonance (same vowel sound, different surrounding consonants): 'I watch the waves come rolling in / I feel the light begin to dim.' The vowel 'i' connects 'in' and 'dim' but softly, like a whisper.", why: "Assonance creates the feeling of longing and openness — the sounds reach for each other without meeting. It's the rhyme level that feels most like yearning, which is why it works in melancholic or bittersweet lyrics." },
        { text: "Rewrite with consonance (same consonant, different vowel): 'I watch the waves come rolling in / I feel the weight of what's been done.' The 'n' connects 'in' and 'done' but the vowels fight. It feels tense, unresolved. Record all four versions and compare the emotional landing of each.", why: "Consonance creates tension and dissonance. The sounds share a skeleton but not a soul. Use it sparingly for moments of unease, conflict, or emotional complexity." }
      ],
      feel: "This exercise should feel like tuning a dial — from fully resolved (perfect rhyme) to fully tense (consonance). Each level is a tool. The right rhyme level for a line depends on whether you want the listener to feel settled, searching, or uneasy.",
      wrong: "If all four versions sound the same to you, sing them rather than read them. The differences are more obvious when the words are carried by melody. Also, slow down — rhyme effects are subtle and reward careful listening.",
      sarah: "Gene, your vibe lives in the family rhyme and assonance zone — those middle levels that feel warm and open without being too polished. Perfect rhyme can sound too 'written' for your conversational style. Save it for chorus hooks where you want that click.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: THE REWRITE ───

    {
      id: "ss-13-10",
      time: 8,
      title: "The Rewrite: One Element Per Pass",
      type: "record",
      what: "Take a song you've written and run four focused editing passes. Pass 1: rhyme only (are rhymes earned or forced?). Pass 2: prosody only (do speech stresses match melodic beats?). Pass 3: specificity only (replace generic words with specific ones). Pass 4: emotional arc (does each verse advance the feeling?). One element per pass prevents overwhelm.",
      setup: "A completed song from Level 9-11. Notebook. Four different colored pens if you have them — one per pass.",
      steps: [
        { text: "Pass 1 — Rhyme: Read through your lyrics and circle every rhyme. For each one, ask: did I choose this word because it's the RIGHT word, or because it rhymes? If the rhyme forced a word choice that weakened the meaning, either find a near-rhyme that serves the meaning or drop the rhyme entirely.", why: "Forced rhymes are the #1 sign of amateur lyrics. 'I walked along the shore / I couldn't take it anymore' — 'anymore' was chosen for the rhyme, not the meaning. 'I walked along the shore / the tide was pulling out' serves the image better." },
        { text: "Pass 2 — Prosody: Speak each line aloud and mark the stressed syllables. Then sing it. Do the stressed syllables land on strong beats? Fix any line where the melody fights the natural speech rhythm. Sometimes swapping two words is all it takes.", why: "Prosody is the fastest way to make lyrics sound professional. A single misplaced stress ('to-DAY I walked' when the melody stresses 'to') makes the whole line feel awkward." },
        { text: "Pass 3 — Specificity: Find every generic word and replace it with a specific one. Not 'car' but 'Dodge.' Not 'song' but 'the track on the stereo when I drove away.' Not 'drink' but 'the last of the guava juice.' Specific details are what make listeners see YOUR world.", why: "Specificity is the difference between a lyric that could be anyone's and a lyric that could only be yours. 'Walking on the beach' is generic. 'Sand sticking to the board wax on my feet' is Gene's beach and nobody else's." },
        { text: "Pass 4 — Emotional arc: Read the lyrics as a story. Does verse 1 set up a situation? Does verse 2 deepen or complicate it? Does the chorus distill the emotional core? Does the bridge shift perspective? If any section repeats the same emotional level as another, rewrite it to advance the arc. Record the final version.", why: "Songs that feel 'stuck' usually have verses that repeat the same emotional state instead of progressing. Each section should feel like a step on a journey — even a subtle one." }
      ],
      feel: "Each pass should feel like polishing a different facet of the same gem. After four passes, the song should feel tighter, more natural, more vivid, and more emotionally shaped — without having been 'rewritten' from scratch.",
      wrong: "If you're trying to fix everything at once, you'll fix nothing well. The one-element-per-pass rule is sacred. When you're on the rhyme pass, ignore prosody. When you're on prosody, ignore specificity. Each pass has blinders on.",
      sarah: "Gene, Pass 3 is your superpower pass. Your world — Hawaii, the ocean, the porch, the golden hour — is incredibly specific. Lean into those details. When a listener hears 'plumeria on the trade wind,' they're IN your world. Generic words keep them outside.",
      recorder: true
    },

    // ─── IMAGE & METAPHOR (was ss-13-5) ───

    {
      id: "ss-13-11",
      time: 8,
      title: "Image & Metaphor",
      type: "record",
      what: "Transform observations into metaphors: 'The palm trees bending' becomes 'the island bowing.' 'Coffee getting cold' becomes 'time I poured but didn't drink.' Metaphors compress complex feelings into vivid images. They're the advanced tool of lyric writing.",
      setup: "Notebook. Your observation lyrics from ss-13-1.",
      steps: [
        { text: "Take 3 observation lines from ss-13-1. For each one, ask: 'What else looks / sounds / feels like this?' A gecko on the screen = something watching from the edges. Rust on the railing = time making its mark.", why: "Metaphor is just asking 'what does this remind me of?' The connection between concrete image and abstract meaning creates depth." },
        { text: "Write the metaphorical version alongside the literal version. Sometimes the literal is better. Sometimes the metaphor elevates it. Choose the stronger one.", why: "Not every line needs a metaphor. The contrast between literal and figurative creates texture. A song that's ALL metaphor is exhausting." },
        { text: "Create a verse that mixes observation and metaphor: 2 literal lines + 2 metaphorical lines. The literal grounds the listener; the metaphor lifts them.", why: "The mix of literal and metaphorical is the mark of a skilled lyricist. Paul Simon, Joni Mitchell, and every great songwriter does this." },
        { text: "Set the verse to melody. Record it. Listen: does the metaphor feel natural or forced? If forced, go back to the literal version.", why: "Forced metaphors are worse than no metaphors. If a listener has to puzzle out your meaning, the metaphor has failed. Clarity always wins." }
      ],
      feel: "Good metaphors should feel like surprises that make instant sense — 'oh, I never thought of it that way, but yes.' If the listener needs an explanation, it's too clever.",
      wrong: "If your metaphors are cliches ('my heart is on fire'), dig deeper. What does YOUR heart feel like? 'My chest is a sun-warmed stone' is specific and surprising.",
      sarah: "Gene, your natural imagery — ocean, golden hour, warmth — already has metaphorical weight. 'The sun going down' is literally what you see AND a metaphor for ending. You don't have to reach far.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── NEW: CONVERSATIONAL VS ELEVATED REGISTER ───

    {
      id: "ss-13-12",
      time: 7,
      title: "Conversational vs Elevated Register",
      type: "song",
      what: "Two lyric registers: conversational ('I'm walking down the beach') vs elevated ('the tide reclaims the shore'). Both are valid. Gene's natural register is conversational — matching his porch delivery. But elevated language creates moments of beauty. Practice: write a verse in each register, then blend — mostly conversational with one elevated line per verse.",
      setup: "Guitar. Notebook. A scene or theme to write about.",
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }],
      steps: [
        { text: "Write a 4-line verse in pure conversational register: 'I'm sitting on the porch again / the dog is at my feet / the sun is going down I think / I should probably eat.' Natural, spoken, zero poetry.", why: "Conversational register is the foundation of your vocal style. It sounds honest and unforced. Listeners trust a conversational singer because it doesn't sound like performance — it sounds like truth." },
        { text: "Write the same scene in pure elevated register: 'The lanai holds the last of the light / a companion curls at the threshold / the horizon drinks the gold / and hunger stirs beneath the ribs.' Same scene, completely different language.", why: "Elevated register creates beauty, weight, and memorability. It sounds 'written' — which is why a whole song in elevated register can feel pretentious. But individual elevated lines create moments of poetry that stick." },
        { text: "Now blend: mostly conversational, with one elevated line per verse. 'I'm sitting on the porch again / the dog is at my feet / the horizon drinks the gold / I should probably eat.' That third line lifts the whole verse.", why: "The blend is where the magic lives. Conversational lines build trust and ease. One elevated line per verse creates a moment of beauty that lands harder BECAUSE it's surrounded by plain speech. It's the poetic equivalent of a melodic peak." },
        { text: "Sing the blended version over the backing track. The elevated line should naturally get more vocal weight — hold the notes longer, let the melody rise slightly. Record it.", why: "Register and melody reinforce each other. Conversational lines want a speak-sing delivery. The elevated line wants the melody to open up. The contrast in both language and melody creates the emotional shape of the verse." }
      ],
      feel: "The blend should feel like mostly talking to a friend, with one moment per verse where the language catches the light and becomes something more. That moment should surprise even you.",
      wrong: "If every line is elevated, it sounds pretentious. If every line is conversational, it sounds flat. The ratio matters: 3 conversational to 1 elevated is the sweet spot. Don't overdo the poetry.",
      sarah: "Gene, this is YOUR exercise. Your speaking voice IS your singing voice — that's your superpower. The conversational register is your home base. You just need permission to be poetic for one line per verse. That one line is where your songs become art. Look at the lyric styles of your favorite artists: DOPE LEMON uses simple, poetic language — mostly one-syllable words. Skinshape's lyrics are minimal and warm. Allah-Las narrate through imagery, not confession. Your lyric voice should match your musical voice: warm, spacious, observational.",
      metronome: 80,
      referencePitches: getPitchRange("E3", "A4"),
      recorder: true
    },

    // ─── THE EDIT / CAPSTONE (was ss-13-6) ───

    {
      id: "ss-13-13",
      time: 6,
      title: "The Edit",
      type: "record",
      what: "Take one of your completed songs and CUT it — remove every word that isn't essential. If a line works without an adjective, remove the adjective. If a verse repeats what another verse said, cut it. Editing is where good songs become great songs. As Pat Pattison says: 'Don't bore us, get to the chorus.'",
      setup: "A completed song from Level 9-11. Notebook. Willingness to kill your darlings.",
      steps: [
        { text: "Write out all your lyrics. Read them without the music. Cross out any word you could remove without losing meaning.", why: "Words that serve no purpose dilute the impact of words that do. Every unnecessary word weakens the song." },
        { text: "Look for 'telling' lines that could be 'showing' lines. 'I'm sad' -> cut. 'Empty glass on the table' -> keep. The image does the work.", why: "Telling robs the listener of the experience of feeling. Showing lets them discover the emotion themselves — which is 10x more powerful." },
        { text: "Check: does every line earn its place? If you removed a line, would the song lose something important? If not, cut it.", why: "The best songs have zero waste. Every line advances the story, deepens the image, or serves the melody." },
        { text: "Sing the edited version. Compare it to the original recording. The shorter version almost always hits harder.", why: "Editing is the most underrated songwriting skill. The willingness to cut your own words separates professionals from amateurs." }
      ],
      feel: "Editing should feel ruthless but satisfying — like pruning a tree. You're not destroying; you're revealing the shape that was always there underneath the excess.",
      wrong: "If you can't cut anything, your inner editor is too attached. Show the lyrics to someone else and ask 'which lines could go?' Fresh eyes find waste instantly.",
      sarah: "Gene, your laid-back vocal style benefits enormously from sparse lyrics. Fewer words + more space = more impact. Think: each word is a wave. Space between waves lets each one land.",
      metronome: 80,
      recorder: true,
      levelUp: "Can write lyrics using observation, sensory detail, near-rhyme, and metaphor. Can build sensory vocabulary through daily object writing, choose POV deliberately for emotional distance, map lyric density as section contrast, apply Pattison's stable/unstable framework, select rhyme types for emotional effect, edit systematically one element per pass, and blend conversational and elevated lyric registers. Can match prosody to melody and edit songs for maximum impact."
    }
  ]
};
