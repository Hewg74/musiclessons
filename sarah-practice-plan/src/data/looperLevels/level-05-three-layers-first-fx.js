export const level5 = {
  num: 5, name: "Three Layers + FX", focus: "Frequency Zones + First Effects",
  duration: "60 min",
  setup: "RC-505mkII with guitar in INST 1, mic in MIC input. 3+ tracks active. Input FX available. Quantize: MEASURE. Rhythm guide at 90-100 BPM.",
  exercises: [
    {
      id: "lo5e1", time: 8, title: "Frequency Zones", type: "looper",
      checklist: true,
      what: "Three tracks, three registers. Each track owns a frequency zone — no mud, no masking, no competition.",
      setup: "Guitar in INST 1. Three tracks ready. Rhythm guide at 95 BPM.",
      steps: [
        { text: "T1: Low register — open strings, bass notes on E and A strings (frets 0-3). Record a 4-bar bass line.", why: "The low end is the foundation. It should feel heavy and grounding. Think Tommy Guerrero's bass lines." },
        { text: "T2: Mid register — chord voicings in the middle of the neck (frets 3-7). Strum or arpeggiate.", why: "The mid-range carries the harmony. It fills the frequency space between bass and melody without crowding either." },
        { text: "T3: High register — single notes or partial chords above fret 7. Melody territory.", why: "The high end is where your ear goes first. Melody cuts through because it occupies an uncrowded frequency zone." },
        { text: "Play all three tracks together. Listen: can you hear each one distinctly? If any track is buried, the frequency zones overlap.", why: "Frequency separation is what makes a three-piece band (bass, guitar, drums) sound full rather than muddy. Your three tracks are three instruments." }
      ],
      feel: "Like hearing a band where every instrument has its own space. The bass rumbles, the chords shimmer, the melody sings — each in its own lane.",
      wrong: "If two tracks sound like they're fighting each other, they're in the same frequency range. Move one up or down the neck to create separation.",
      sarah: "Gene, this is orchestra thinking applied to your guitar. One instrument, three voices — each with its own register. Your surf-psych sound lives in this separation: low drone, mid shimmer, high melody.",
      metronome: 95,
      levelUp: "Three-track loop where each track is clearly audible and occupies its own frequency zone."
    },
    {
      id: "lo5e2", time: 10, title: "Bottom-Up Build", type: "looper",
      checklist: true,
      what: "Performance framework: add one layer at a time with 8-bar gaps. The build IS the performance.",
      setup: "RC-505mkII cleared. Rhythm guide at 95 BPM.",
      steps: [
        { text: "T1 plays alone for 8 bars. Let the audience hear just the foundation. Don't rush to add the next layer.", why: "Patience in the build creates anticipation. Each new layer should feel like a revelation, not an afterthought." },
        { text: "Add T2 on bar 9. Let T1+T2 play together for 8 bars. Listen to how they interact.", why: "Two tracks should sound fuller than one, not just louder. The second layer adds a new dimension." },
        { text: "Add T3 on bar 17. All three tracks now breathing together. Let them play for 8+ bars.", why: "The full arrangement should feel like arrival — like the song has reached its complete form." },
        { text: "The entire build takes 24+ bars (about 1 minute at 95 BPM). That's the minimum for a satisfying build.", why: "Slow builds create more powerful peaks. Ed Sheeran takes 30-60 seconds to build his loop arrangements. Marc Rebillet sometimes takes 2 minutes." }
      ],
      feel: "Like watching a sunrise — each new color adds to the whole. The build should feel inevitable, not rushed.",
      wrong: "If you add all three layers within 8 bars, the build is too fast. You're leaving emotional impact on the table. Slow down.",
      sarah: "Gene, the slow build is one of the most powerful tools in looping. It's what makes live loop performances feel like magic — the audience watches a song being born in real time.",
      metronome: 95,
      levelUp: "Three-layer build with 8-bar gaps between additions that creates a clear sense of arrival."
    },
    {
      id: "lo5e3", time: 8, title: "First Effects: Reverb + Tape Echo", type: "looper",
      checklist: true,
      what: "Your first Input FX — spring reverb and tape echo. These two effects define your psych-surf sound.",
      setup: "RC-505mkII. Navigate to Input FX: [MENU] > INPUT FX. Assign reverb to slot 1, tape echo to slot 2.",
      steps: [
        { text: "Assign Spring Reverb to Input FX slot 1. Settings: Time ~40, Level ~30. Record a chord strum with reverb.", why: "Spring reverb is the sound of surf music — from Dick Dale to Allah-Las. It adds space and shimmer." },
        { text: "Now add Tape Echo to Input FX slot 2. Settings: Time ~350ms, Feedback ~25, Level ~25. Record the same chord.", why: "Tape echo adds rhythmic depth. The repeats fill the space between your strums, creating a continuous wash." },
        { text: "CRITICAL: Input FX are PRINTED into the loop. The reverb and echo become part of the audio permanently. You cannot remove them later.", why: "This is the fundamental difference from Track FX (Level 7). Input FX = pen (permanent). Track FX = pencil (erasable). Know which you're using." },
        { text: "A/B test: record one loop DRY (no effects), one loop WET (with reverb + echo). Compare. The wet loop should sound like YOUR genre.", why: "The A/B comparison trains your ear for what effects actually do. Most beginners use too much — start subtle." }
      ],
      feel: "The first time you hear your guitar through spring reverb and tape echo in a loop, it sounds like a record. That's the psych-surf sound crystallizing.",
      wrong: "If the reverb makes everything washy and indistinct, the level is too high. Reverb should add space, not drown the guitar. Pull the level back to 20-25.",
      sarah: "Gene, spring reverb + tape echo IS the Allah-Las sound. IS the DOPE LEMON shimmer. This is where your guitar tone moves from 'practice room' to 'your sound.' Start subtle — you can always add more.",
      metronome: 95,
      levelUp: "A loop with spring reverb + tape echo that sounds like it belongs on a psych-surf record."
    },
    {
      id: "lo5e4", time: 5, title: "Real-Time Volume Rides", type: "looper",
      checklist: true,
      what: "Fader moves during playback as arrangement tool. Your faders are your live mixing desk.",
      setup: "Three-track arrangement playing. All faders at different levels.",
      steps: [
        { text: "Swell T3 (melody) from 0% to 80% over 8 bars. Slow fade up = gradual reveal.", why: "A slow swell is one of the most emotional moves in live looping. The melody appears like the sun through clouds." },
        { text: "Quick cut T2 to zero on beat 1 of a section change. Instant drop = dramatic impact.", why: "Sudden silence is as powerful as sudden sound. The absence of the middle layer creates tension." },
        { text: "Bring T2 back with a quick slam at the start of the next section. Instant return = payoff.", why: "The return of a layer after silence creates a sense of release. The audience feels it physically." },
        { text: "Practice the three moves in sequence: swell T3 in, cut T2 out, slam T2 back. This is a complete arrangement gesture.", why: "These three fader moves — swell, cut, slam — are your basic arrangement vocabulary. Everything else is a variation." }
      ],
      feel: "Like a DJ working the faders — each move shapes the music in real time. The faders are instruments, not just volume knobs.",
      wrong: "If your fader moves are jerky or mistimed, practice the physical motion without music first. Smooth is more important than fast.",
      sarah: "Gene, the fader swell is the looper's most cinematic tool. A slow reveal of the melody track over 8 bars — the audience holds their breath without knowing why.",
      metronome: 95,
      levelUp: "Three consecutive fader moves (swell, cut, slam) that feel musical and intentional."
    },
    {
      id: "lo5e5", time: 8, title: "The Subtractive Build", type: "looper",
      checklist: true,
      what: "The reverse of bottom-up: start FULL, then REMOVE layers for tension. Subtraction is as creative as addition.",
      setup: "Three-track arrangement already recorded and playing.",
      steps: [
        { text: "Start with all three tracks playing at full volume. This is your peak.", why: "Starting at maximum means every change is subtractive. Removing layers creates the arrangement." },
        { text: "Mute T3 (melody). Hear how the arrangement changes — it's simpler but still grounded.", why: "Removing the melody exposes the rhythm and harmony. The audience feels the absence." },
        { text: "Mute T2 (harmony). Now only T1 (bass/rhythm) is playing. Maximum simplicity.", why: "A single track after hearing all three creates powerful tension. The listener craves the return." },
        { text: "Bring T3 back (skip T2). Just bass + melody — a completely different texture from the full arrangement.", why: "Selective return creates surprise. The audience expects T2 back first, but you give them T3. Arrangement decisions ARE composition." }
      ],
      feel: "Like sculpting — you start with the full block and carve away to reveal the shape inside. Subtraction reveals the music.",
      wrong: "If every subtraction sounds like 'something is missing' rather than 'this is a new section,' the removed track was too central. Make sure each track can stand alone.",
      sarah: "Gene, subtractive arrangement is how Khruangbin builds their live sets — everything playing, then Mark drops the bass, and suddenly it's just guitar and drums. The simplicity hits harder BECAUSE of what came before.",
      metronome: 95,
      levelUp: "A subtractive arrangement where each layer removal creates a distinct musical section."
    },
    {
      id: "lo5e6", time: 5, title: "One-Shot Mode", type: "looper",
      checklist: true,
      what: "A track that plays ONCE and stops — doesn't loop. Perfect for fills, transitions, and one-time accents.",
      setup: "Set T5 to One-Shot mode: [MENU] > MEMORY > TRACK 5 > PLAY MODE > ONE SHOT.",
      steps: [
        { text: "Set Track 5 to ONE SHOT play mode via [MENU] > MEMORY > TRACK > PLAY MODE.", why: "One-Shot means the track plays its recorded audio once, then stops. No looping. It's a trigger, not a loop." },
        { text: "Record a short guitar fill or accent on T5 (1-2 bars). Something with energy — a strum flurry or a melodic run.", why: "One-shots should be punchy and distinctive. They mark transitions and section boundaries." },
        { text: "While your main loops play on T1-T3, press T5 at the end of an 8-bar section. The fill plays once and stops.", why: "A well-timed one-shot fill marks the section change. The audience feels the transition even if they can't name why." },
        { text: "Try different one-shot content: a reversed chord swell, a beatbox fill, a vocal 'hey!' — each serves a different moment.", why: "Build a library of one-shot options. Different moments call for different transitions." }
      ],
      feel: "Like a drummer's crash cymbal on beat 1 — it punctuates the moment and then it's gone. One-shots are musical punctuation.",
      wrong: "If you trigger the one-shot off-beat, it sounds like a mistake. Practice triggering on beat 1 of the target bar until it's automatic.",
      sarah: "Gene, one-shots are your accent marks. That reversed swell before a chorus, that vocal shout at the peak — they transform a loop from 'repeating' to 'performing.'",
      metronome: 95,
      levelUp: "A one-shot fill triggered at a section boundary that sounds like a planned transition."
    },
    {
      id: "lo5e7", time: 5, title: "Reverse Track Texture", type: "looper",
      checklist: true,
      what: "Reverse a track's playback for psychedelic atmosphere. Reversed audio creates sounds impossible to play forward.",
      setup: "Check mkII for reverse function: may be in [MENU] > MEMORY > TRACK > REVERSE or via Track FX.",
      steps: [
        { text: "Record a clean chord strum on T4. A sustained Am or Em with natural decay.", why: "Start with simple, recognizable audio so the reverse effect is dramatic." },
        { text: "Reverse T4's playback. The chord now swells INTO the attack instead of decaying away.", why: "Reversed audio inverts the amplitude envelope. Quiet becomes loud, decay becomes swell. It's unnatural — and beautiful." },
        { text: "Layer the reversed track under your normal loops on T1-T3. Pull the fader to 40-50%.", why: "Reversed audio works best as a subtle texture underneath — felt more than consciously heard." },
        { text: "Try reversing different source material: a melody line, a vocal phrase, a percussive pattern. Each creates a different texture.", why: "Reversed melody = mysterious. Reversed vocals = eerie. Reversed percussion = organic swells. Each has a mood." }
      ],
      feel: "Like looking at a reflection in water — familiar but transformed. Reversed audio is your psychedelic paintbrush.",
      wrong: "If the reversed track is too loud, it fights with the forward tracks. Keep it at 40-50% — it should add atmosphere, not compete.",
      sarah: "Gene, reversed guitar is the signature sound of psych rock. Tame Impala, Allah-Las, King Gizzard — they all use reversed textures. This is your genre's secret ingredient.",
      metronome: 95,
      levelUp: "A reversed guitar texture that adds psychedelic atmosphere without overpowering the main arrangement."
    },
    {
      id: "lo5e8", time: 10, title: "Effects Match: Your Sound", type: "looper",
      checklist: true,
      what: "Build Gene's signature Input FX chain. A/B test until it sounds like YOUR music.",
      setup: "Input FX configured: Spring Reverb + Tape Echo. Reference tracks on phone.",
      steps: [
        { text: "Start with: Spring Reverb (Time: 40, Level: 30) + Tape Echo (Time: 350ms, Feedback: 25, Level: 25). Record a 4-bar loop.", why: "These are starting-point settings. Your ears are the final judge." },
        { text: "Play a reference track from your playlist — Allah-Las, DOPE LEMON, Khruangbin. Listen to the guitar tone.", why: "Reference listening calibrates your ear. You're not trying to copy — you're identifying the tonal neighborhood." },
        { text: "A/B your loop against the reference. Too dry? Increase reverb level. Too washy? Decrease. Too much echo? Lower feedback.", why: "Small adjustments. Move one parameter at a time. Each change shifts the character." },
        { text: "When it sounds like it belongs on a record next to your reference, save these settings as your default Input FX chain.", why: "Your signature sound is a specific set of effect parameters. Finding it is trial and error — keeping it is saving the settings." }
      ],
      feel: "Like finding your voice — the moment the effects match your inner sound, the guitar stops sounding like 'a guitar with effects' and starts sounding like YOU.",
      wrong: "If you keep tweaking without deciding, you're in analysis paralysis. Pick settings that are 'good enough' and commit. You can refine later.",
      sarah: "Gene, this is the exercise where your 505 starts sounding like YOUR instrument. The settings you land on become your signature. Allah-Las has theirs, Khruangbin has theirs — now you're finding yours.",
      metronome: 100,
      levelUp: "A signature effects chain that sounds like Gene's music — saved and ready to recall."
    },
    {
      id: "lo5e9", time: 8, title: "Multi/Single Track Mode", type: "looper",
      checklist: true,
      what: "The 505's most powerful architectural feature: Multi mode (tracks play simultaneously) vs Single mode (only one track at a time).",
      setup: "Navigate to [MENU] > MEMORY > TRACK > PLAY MODE for each track.",
      steps: [
        { text: "Set T1 and T2 to MULTI mode. Record rhythm on T1 and bass on T2. Both play simultaneously — your persistent foundation.", why: "Multi mode is the default. Multiple tracks loop simultaneously. These tracks are your 'always on' layers." },
        { text: "Set T3, T4, T5 to SINGLE mode. Record a verse melody on T3 and a chorus melody on T4.", why: "Single mode means only ONE of these tracks plays at a time. Starting T4 automatically stops T3. This is how you switch between song sections." },
        { text: "While T1+T2 play continuously, press T3 for the verse. Then press T4 — T3 stops, T4 starts. You just changed sections.", why: "This is the professional loop performance architecture. Foundation layers (Multi) stay constant. Section layers (Single) alternate." },
        { text: "Record a bridge on T5. Now you have three sections: T3 = verse, T4 = chorus, T5 = bridge — all switchable with one button press.", why: "Three sections from three Single-mode tracks = a complete song structure, live, with one-button section changes." }
      ],
      feel: "Like having a band that automatically knows which section to play when you give the signal. One button = instant section change.",
      wrong: "If you're in Single mode and wonder why starting T4 killed T3 — that's the design. Single mode means 'only one at a time.' If you want both, switch to Multi.",
      sarah: "Gene, Multi/Single mode is THE feature that separates 'looping' from 'performing songs.' With this, you can build verse-chorus-bridge structures and switch between them live. This is how Ed Sheeran performs entire songs solo.",
      metronome: 95,
      levelUp: "A performance with Multi foundation tracks and Single section tracks, switching sections cleanly with one button press."
    },
    {
      id: "lo5e10", time: 5, title: "Wet Loop / Dry Live", type: "looper",
      checklist: true,
      what: "Record loops with heavy effects, then play live with NO effects. The contrast creates professional depth.",
      setup: "Input FX: heavy reverb + echo. Three tracks recorded with effects.",
      steps: [
        { text: "Record all loop tracks with Input FX on (reverb + echo). The loops are 'wet' — effects are baked in.", why: "Wet loops sit back in the mix. They sound distant, atmospheric, like a backing band in a large room." },
        { text: "Turn Input FX OFF. Play live guitar with NO effects — completely dry.", why: "Dry live playing sits forward in the mix. It sounds present, immediate, intimate — right in front of the listener." },
        { text: "The wet loops are the background. Your dry live playing is the foreground. The contrast creates a 3D sound.", why: "This wet/dry separation is a production technique used in every professional recording. You're doing it live." },
        { text: "Sing live (also dry). Your voice and live guitar occupy the 'front' while the loops occupy the 'back.' Professional depth from a simple technique.", why: "The human ear interprets reverb as distance. Wet = far away. Dry = close. Mixing both creates spatial depth." }
      ],
      feel: "Like standing in front of a wall of sound. The loops surround you; your live playing cuts through the center. It sounds bigger than one person.",
      wrong: "If the wet loops overpower your dry live playing, pull the loop faders down. The live element should always be the most present thing.",
      sarah: "Gene, this is why your loops will sound like a RECORD and not like 'a guy with a looper.' Wet background + dry foreground = professional spatial depth. Most beginners never figure this out.",
      metronome: 95,
      levelUp: "A performance where wet loops create atmosphere behind dry live playing that cuts through clearly."
    },
    {
      id: "lo5e11", time: 8, title: "Three-Layer Architecture", type: "looper",
      checklist: true,
      what: "Formalize the track role system. This architecture maps to ANY genre — the content changes, the structure doesn't.",
      setup: "Three tracks ready. Rhythm guide at your genre's tempo.",
      steps: [
        { text: "Reggae architecture (85 BPM): T1 = one-drop rhythm (kick on 3), T2 = bass (root notes), T3 = offbeat guitar chop. Build it.", why: "The reggae one-drop is: emphasis on beat 3, bass holds it down, offbeat guitar fills the spaces. Three tracks, one genre." },
        { text: "Surf architecture (100 BPM): T1 = driving beat (body percussion), T2 = tremolo chord sustain, T3 = clean delayed melody. Build it.", why: "Surf is: driving rhythm, shimmering chords, spacious melody. Same three-track structure, completely different content." },
        { text: "Desert blues architecture (95 BPM): T1 = circular hand drum pattern, T2 = open-string drone, T3 = pentatonic melody. Build it.", why: "Desert blues is: hypnotic rhythm, droning foundation, pentatonic melody. Same three-layer structure. One architecture, any genre." },
        { text: "Notice: every genre has rhythm (T1), harmony (T2), melody (T3). The architecture is universal. Only the content changes.", why: "Understanding this universal architecture means you can build any genre on the 505 without re-inventing the structure." }
      ],
      feel: "Like learning that every house has a foundation, walls, and roof — the architecture is the same even when the houses look completely different.",
      wrong: "If a genre arrangement sounds wrong, it's usually the CONTENT, not the structure. Check your rhythm pattern, chord voicing, and melody style against genre references.",
      sarah: "Gene, you just built three different genres on the same three-track architecture. Reggae, surf, desert blues — your three core genres, all following the same structure. The 505 doesn't care about genre — it cares about layers.",
      metronome: 95,
      levelUp: "Three different genre arrangements, each on three tracks, each sounding authentically genre-appropriate."
    },
    {
      id: "lo5e12", time: 10, title: "Three-Layer Song: ILTWYW", type: "looper",
      checklist: true,
      tracks: [{ name: "ILTWYW", src: "/iltwyw.mp3" }],
      what: "Full three-track ILTWYW with effects, build/peak/strip structure. Your first complete effected song.",
      setup: "Input FX: Spring Reverb + Tape Echo (your signature chain from lo5e8). Rhythm guide at 90 BPM.",
      steps: [
        { text: "T1: Fingerpicking foundation with light reverb. Am-C-G-D, 4 bars. This is the bedrock.", why: "The fingerpicking pattern from your practice, now with your signature reverb baked in." },
        { text: "T2: Bass notes on beat 1 of each chord change. Low register, minimal. Maybe add a slight echo.", why: "The bass grounds the harmony. Simple root notes on the chord changes." },
        { text: "T3: Vocal harmony pad — sustained 'ooh' on the root note of each chord. With echo for a choir-like wash.", why: "The vocal pad fills the mid-high frequency zone that guitar leaves empty. It adds warmth and presence." },
        { text: "Build: T1 alone (8 bars) → add T2 (8 bars) → add T3 (8 bars) → sing verse live → sing chorus live → strip to T1 → ending.", why: "The three-act structure applied to ILTWYW: build (layers add), peak (full + live vocal), resolution (layers strip)." }
      ],
      feel: "ILTWYW with three layers and effects sounds like a BAND, not a solo guitar. This is the payoff of Level 5 — your first full effected song performance.",
      wrong: "If the vocal pad on T3 clashes with the guitar, check pitch. The pad note should match the root of the current chord — A over Am, C over C, G over G, D over D.",
      sarah: "Gene, this is a milestone. ILTWYW with three layers, effects, build-peak-strip structure — it sounds like a real production. You built a full band arrangement by yourself. That never stops being amazing.",
      metronome: 90,
      levelUp: "Complete ILTWYW with three effected layers and build/peak/strip arrangement that sounds like a full band."
    }
  ]
};
