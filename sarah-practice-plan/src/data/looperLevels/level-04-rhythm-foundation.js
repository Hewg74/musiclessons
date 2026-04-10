export const level4 = {
  num: 4,
  name: "Rhythm Foundation",
  focus: "Body Percussion + Rhythmic Texture",
  duration: "55 min",
  setup: "RC-505mkII with guitar in INST 1, mic in MIC input. Mic gain adjusted for quiet sources. Quantize: MEASURE. Rhythm guide at 85-95 BPM.",
  exercises: [
    {
      id: "lo4e1",
      time: 8,
      title: "Guitar Body Percussion",
      type: "looper",
      checklist: true,
      what: "Three distinct percussion sounds from your guitar body: palm slap on bridge for kick, fingertip tap near bridge for snare, muted string scratch for hi-hat. Close-mic technique is critical — the mic needs to be 3-6 inches from the guitar body to capture these quiet sounds clearly. Input gain for percussive sources needs to be significantly HIGHER than for strumming — body hits are whisper-quiet compared to a full chord strum.",
      setup: "Guitar in lap position. Mic positioned 3-6 inches from the guitar body, angled toward the soundhole. No looper yet — learn the sounds first. Metronome at 85 BPM.",
      steps: [
        { text: "KICK: Palm slap on the guitar body — flat of your hand hits the side or top near the soundhole. Aim for a deep, resonant thump. Practice 8 in a row, one per beat.", why: "The palm slap excites the guitar's resonant chamber. Ed Sheeran built his entire loop career on this technique — his 2004 performance on Jools Holland used nothing but body percussion and loops. The bigger the contact area, the deeper the thump." },
        { text: "SNARE: Tap the bridge area with your fingertips — a sharp, bright crack. The bridge wood is denser, producing a higher-pitched attack. Practice 8 in a row, alternating with kick.", why: "Different locations on the guitar body produce different tones because the wood thickness and bracing vary. The bridge area is reinforced, giving a snappy, defined hit. This timbral difference is what makes body percussion sound like a real drum kit rather than random tapping." },
        { text: "HI-HAT: Lightly drag your fingers across muted strings — dampen the strings with your fretting hand and brush across them. Short brush = closed hat, longer drag = open hat.", why: "The sibilant string noise naturally occupies the frequency range of a hi-hat (2-8kHz). Varying the length and pressure gives you a full hi-hat vocabulary — tight 'tssk' for groove, longer 'tssssh' for fills." },
        { text: "Combine: kick-hat-snare-hat at 85 BPM (slap-scratch-tap-scratch). This is a basic rock beat on your guitar body. Practice until the pattern is automatic — no thinking about which hit comes next.", why: "Motor pattern automaticity (Fitts & Posner's autonomous stage) means the sequence runs without conscious attention. You need this because when you record it into a loop, you'll also be managing the RC-505mkII controls. If the percussion pattern still requires thought, your hands can't handle both tasks." },
        { text: "Close-mic check: have someone listen from 3 feet away while you play. Can they hear all three sounds distinctly? If not, adjust mic position or play harder.", why: "Body percussion that sounds great to you (you hear through bone conduction too) may be inaudible to the mic. The mic only captures air vibration, so close proximity and proper gain are essential. This gap between what you hear and what the mic captures is the #1 surprise for new loop percussionists." }
      ],
      feel: "Like discovering a drum kit hidden inside your guitar. Each hit should feel deliberate and musical — you're playing percussion, not smacking furniture. When the three sounds layer into the pattern, you should hear a groove emerge, not a collection of noises.",
      wrong: "If kick and snare sound identical, exaggerate the location difference: kick = center of the body for maximum resonance, snare = bridge area for brightness. If the hi-hat is inaudible, you're brushing too lightly — press slightly harder on the muted strings. If nothing sounds percussive, check your hand position: flat palm for kick, fingertips for snare.",
      metronome: 85,
      sarah: "Gene, your guitar is also a drum kit — Ed Sheeran figured this out busking on the streets of London, and it changed acoustic looping forever. Your psych-surf and reggae-rock genres both live and die on the groove, so building a rhythmic foundation from your guitar body means you'll never need a drum machine. The body of that guitar has been waiting to be a percussion instrument this whole time.",
      levelUp: "8 bars of kick-hat-snare-hat at 85 BPM where all three sounds are clearly distinguishable and the pattern grooves without conscious effort."
    },
    {
      id: "lo4e2",
      time: 8,
      title: "Record the Rhythm",
      type: "looper",
      checklist: true,
      what: "Loop your body percussion on Track 1. Close-mic placement is critical — angle the mic toward the soundhole for body resonance. Record a 2-bar pattern: kick(1)-hat(and)-snare(2)-hat(and)-kick(3)-hat(and)-snare(4)-hat(and). Then listen: does it groove when it comes back around?",
      setup: "Mic positioned 3-6 inches from guitar body, angled toward soundhole. Mic gain (knob [1]) set HIGH — body percussion needs 70-80% gain, much higher than strumming. Rhythm guide at 85 BPM. Track 1 empty.",
      steps: [
        { text: "Set mic input gain (knob [1]) to approximately 70-80%. Test: do a palm slap and watch the input meter. The hit should peak around -6dB on the meter. If it barely registers, increase gain.", why: "Body percussion generates far less acoustic energy than strumming — typically 15-20dB quieter. The input gain needs to compensate for this. If the gain is set for strumming levels, body percussion will be buried in the noise floor." },
        { text: "Record 2 bars on Track 1: kick(1)-hat(&)-snare(2)-hat(&)-kick(3)-hat(&)-snare(4)-hat(&). Press REC on beat 1, stop on beat 1 of bar 3. Let quantize handle the boundaries.", why: "Two bars gives you a rhythmic phrase that repeats naturally. The kick-hat-snare-hat pattern is the universal groove template — it works in rock, reggae, pop, and surf. Starting with a standard pattern means the loop will feel musical immediately." },
        { text: "Listen back for 4 cycles. Ask yourself: does it groove? Does my head nod? Are the hits clear and distinct? If the loop sounds like random thumping rather than a beat, clear and re-record.", why: "The loop reveals timing inconsistencies that are invisible during live playing. A loop is merciless — every rush, every drag, every weak hit plays back identically on every cycle. This feedback loop (literally) is the fastest way to improve your rhythmic precision." },
        { text: "Re-record until 3 out of 5 attempts groove. Don't settle for 'close enough' — a rhythm loop that doesn't groove will poison every layer you build on top of it.", why: "The percussion loop is the foundation of your entire arrangement. A shaky foundation means shaky everything. Professional loopers spend more time on the first loop than on all subsequent layers combined." },
        { text: "Once you have a groove, adjust the Track 1 fader to about 60%. Leave headroom for the layers coming in exercises 3 and 4.", why: "Gain staging from the first track prevents clipping when you stack layers. Setting T1 to 60% gives you 40% of headroom for chords, bass, and voice. This is production thinking applied to live performance." }
      ],
      feel: "The first time your body percussion loops back as a beat, it feels like magic — you created a drum machine from wood and strings. When the loop cycles and you hear a GROOVE, not just sounds, you've crossed a threshold. You ARE the rhythm section.",
      wrong: "If the loop sounds like random thumping, the pattern isn't tight enough — go back to exercise 1 and nail the pattern without the looper first. If the hits are barely audible in the loop, your mic gain is too low — body percussion needs significantly more gain than any other source you'll record. If there's a weird 'click' at the loop boundary, your stop press was slightly off — re-record with more attention to landing on beat 1.",
      metronome: 85,
      sarah: "Gene, rhythm is the heartbeat of every loop you'll ever build. This is the foundation that everything else rests on — chords, melody, voice, all of it sits on top of this groove. Your reggae and surf influences are ALL about the pocket, so getting this right means everything downstream feels effortless. Take your time here. A perfect 2-bar percussion loop is worth more than a sloppy 4-track arrangement.",
      levelUp: "3 out of 5 body percussion loops that genuinely groove — a listener would nod their head without being told to."
    },
    {
      id: "lo4e3",
      time: 5,
      title: "Subdivision Stacking",
      type: "looper",
      checklist: true,
      what: "Layer rhythmic subdivisions via overdub. Pass 1: quarter notes (kick on every beat). Pass 2: eighth notes (hi-hat on every and). Pass 3: snare on beats 2 and 4. Each overdub adds a rhythmic layer, building density gradually. Volume stacking warning: each layer adds volume, so record each subsequent layer slightly quieter.",
      setup: "Empty Track 1. Rhythm guide at 90 BPM. Mic gain set for body percussion (high).",
      steps: [
        { text: "Pass 1 — Record 2 bars of kick only: palm slap on beats 1, 2, 3, 4. Simple quarter notes. Let it loop.", why: "Starting with only kick establishes the pulse. Quarter notes are the skeleton of rhythm — everything else hangs off this framework. Recording the simplest possible pattern first ensures clean timing." },
        { text: "Pass 2 — Enter OVERDUB. Add hi-hat (muted string scratch) on every 'and' — the spaces between your kicks. You should hear kick(1)-hat(&)-kick(2)-hat(&)-kick(3)-hat(&)-kick(4)-hat(&).", why: "Eighth notes double the rhythmic density. The hi-hats fill the gaps between kicks, creating the 'tick-tock' pulse that drives pop and rock music. Overdubbing them separately means each layer has its own clean recording." },
        { text: "Pass 3 — Enter OVERDUB again. Add snare (bridge tap) on beats 2 and 4 ONLY. Play quietly — this is the third layer and volume is accumulating.", why: "Snare on 2 and 4 is the backbeat — the most fundamental rhythmic element in Western popular music. Playing it quietly prevents the overdub from pushing the total volume into clipping. Each overdub adds to the mix, so restraint is essential." },
        { text: "Listen to the full stack. You should hear a complete drum pattern built one layer at a time. If any layer is too loud or too quiet, you'll need to re-record (no per-layer volume control on overdubs).", why: "This additive approach to rhythm building teaches you how real drum patterns are constructed: pulse first, subdivision second, accents third. It also reveals the RC-505mkII's overdub volume behavior — each layer accumulates, so dynamics during recording matter." }
      ],
      feel: "Like watching a pointillist painting emerge dot by dot. Each layer adds rhythmic detail until a complete groove appears. The 16th-note layer should make you nod involuntarily — that's the sign of a real groove.",
      wrong: "If the stacked overdubs create a muddy mess, each layer is too loud. Record ghost notes VERY quietly — the mic is already set to high gain, so even gentle touches will register. If timing drifts between layers, the overdub isn't locking to the loop boundary — check that quantize is set to MEASURE.",
      metronome: 90,
      sarah: "Gene, this is like building a drumbeat one piece at a time — kick first, then hi-hat, then snare. It's exactly how a drum machine works, except you're the machine. The subdivision stacking connects directly to everything Sarah taught you about feeling 1-e-and-a. Now those subdivisions are becoming real music in your loops.",
      levelUp: "Three-layer subdivision stack where each layer is audible, the groove intensifies with each addition, and the total volume stays clean (no clipping)."
    },
    {
      id: "lo4e4",
      time: 10,
      title: "Rhythm + Chords Stack",
      type: "looper",
      checklist: true,
      volumeMeter: true,
      what: "Track 1: body percussion loop. Track 2: chord strum. Two tracks, two roles — you're building a one-person rhythm section. The critical skill here is gain staging between tracks: percussion (quiet source, high input gain) and strumming (loud source, lower input gain). You MUST switch input levels between recordings.",
      setup: "Clean body percussion loop on Track 1 at 90 BPM, fader at 50%. Guitar ready for strumming. You will need to reduce mic/input gain before recording Track 2.",
      steps: [
        { text: "Confirm Track 1 percussion loop is playing and fader is at 50%. The percussion should be felt more than heard — a subtle pulse underneath everything.", why: "Setting T1 to 50% before adding T2 prevents the combined output from clipping. Percussion's role in a mix is foundational — it drives the feel without dominating the frequency spectrum." },
        { text: "CRITICAL: Reduce input gain (knob [1]) before recording Track 2. Body percussion needed 70-80% gain; strumming needs only 30-40%. If you don't adjust, the chord strum will clip and distort.", why: "This is the most common mistake in multi-source looping: forgetting to adjust input gain between recordings. Percussion is 15-20dB quieter than strumming — the gain setting that works for one will destroy the other. Building the habit of checking gain before every recording is professional practice." },
        { text: "Record Track 2: island strum pattern (Am-C-G-D, one chord per bar, 4 bars). Fader at 70%. Listen to the blend — percussion under chords.", why: "The chord progression provides harmonic content while the percussion provides groove. Together they create a complete rhythm section. The Am-C-G-D cycle is the harmonic foundation of ILTWYW and hundreds of songs in your playlist." },
        { text: "Sing ILTWYW live over both tracks. Your voice is the third layer — live, not recorded. Adjust faders while singing: push T1 up for chorus energy, pull it back for verse intimacy.", why: "This is the core of acoustic looping: rhythm + chords + live voice. The fader adjustment during performance is your mixing desk — it creates dynamic variation that prevents the loop from feeling static. Ed Sheeran and Howie Day both use this exact three-layer architecture." },
        { text: "After the full performance, check the output meter. If it peaked above -3dB at any point, reduce Track 2's fader. The combined output should never clip.", why: "Gain staging discipline from the start prevents the cascading volume problems that plague most beginner loopers. Every track you add raises the overall level — if you don't manage it, by track 3 or 4 you'll be in distortion territory." }
      ],
      feel: "Like having a drummer and a guitarist backing you up — except both of them are you. The percussion-under-chords combination should feel like a full rhythm section, warm and supportive, giving your voice a bed to rest on.",
      wrong: "If the strummed chords distort or clip, you forgot to reduce input gain after recording percussion. This is THE mistake to train out of your workflow. If the percussion disappears under the chords, T1 fader is too low or the percussion recording was too quiet — re-record with higher gain or raise the fader. If your voice gets lost, both faders are too high — pull them both down 10%.",
      metronome: 90,
      sarah: "Gene, you're building a rhythm section by yourself — drums on one track, guitar on another, voice live on top. This is the Ed Sheeran architecture, the Howie Day architecture, the KT Tunstall architecture. Every acoustic looper in the world uses this exact stack. The gain staging between percussion and strumming is a skill you'll use in every single performance from now on.",
      levelUp: "Full verse + chorus of ILTWYW over rhythm + chord loops with dynamic fader adjustment and no clipping."
    },
    {
      id: "lo4e5",
      time: 5,
      title: "Tempo Drift Recovery",
      type: "looper",
      checklist: true,
      what: "Record a percussion loop at 90 BPM, then play guitar over it. Deliberately drift ahead and behind the loop's tempo. Feel the pull back into alignment. This exercise teaches you to recognize and correct timing drift — the loop is your anchor, and learning to feel 'ahead' vs 'behind' vs 'in the pocket' transforms your rhythmic awareness.",
      setup: "Any percussion or chord loop playing on Track 1. Rhythm guide OFF — the loop itself is your tempo reference.",
      steps: [
        { text: "Play along with your loop at tempo for 8 bars. Settle into the pocket — the place where your playing and the loop feel like one sound.", why: "Establishing the pocket first gives you a reference point. You need to know what 'in time' feels like before you can recognize 'out of time.' The pocket is a physical sensation — relaxation, flow, effortless synchronization." },
        { text: "Deliberately push ahead — play slightly faster than the loop for 4 bars. Feel the tension of being early. Your notes will land before the loop's beats, creating a rushing, anxious quality.", why: "Rushing is the most common timing error in live performance. Adrenaline speeds you up. By deliberately experiencing the 'ahead' feeling, you learn to recognize it instantly during a real performance — and correct before the audience notices." },
        { text: "Now deliberately drag — play slightly slower than the loop for 4 bars. Feel the tension of being late. Your notes will land after the loop's beats, creating a lazy, dragging quality.", why: "Dragging happens when your energy drops or you lose focus. The 'behind' feeling is distinct from the 'ahead' feeling — both are tension, but they pull in opposite directions. When you play behind the beat intentionally (as in reggae), it's a stylistic choice. When it happens accidentally, it's a problem." },
        { text: "Each time you drift, consciously re-lock to the loop's tempo. Listen for the moment it 'clicks' back in — that physical sensation of synchronization returning. Do this 3 times: push ahead, re-lock; drag behind, re-lock; push ahead, re-lock.", why: "The re-lock is the skill being trained. In performance, you WILL drift — guaranteed. The question isn't whether you'll drift, but how fast you recover. A 1-beat recovery is invisible to the audience. A 4-bar drift is a train wreck." },
        { text: "Notice: when you play behind the beat, it sounds like reggae. When you push ahead, it sounds urgent and driving. Both are valid musical choices — the key is that they're CHOICES, not accidents.", why: "The same timing drift that causes problems in sloppy playing becomes a tool in skilled playing. Reggae musicians play behind the beat on purpose. Punk musicians push ahead on purpose. Understanding this transforms timing from a problem to solve into a color to paint with." }
      ],
      feel: "Like driving a car with slight crosswinds — the drift is constant and gentle, and the correction should become automatic, not panicky. The moment of re-locking should feel like a satisfying 'click' — everything snaps back into place and the groove resumes.",
      wrong: "If you can't feel the drift at all, your rhythmic awareness needs calibration — turn off the rhythm guide and play with only the loop, no visual cues. The loop IS your tempo reference. If re-locking takes more than 2 beats, slow the loop tempo down and practice at 70 BPM until the correction becomes reflexive.",
      metronome: 90,
      sarah: "Gene, the loop reveals your timing tendencies — and that's valuable information. Every musician has a natural drift direction. Some rush, some drag, most do both depending on energy level. Your reggae-rock background means you probably sit comfortably behind the beat, which is actually a superpower in your genres. But knowing HOW to re-lock when you drift too far is what separates a vibe from a mess.",
      levelUp: "Deliberately drift and re-lock 3 times in a row, each recovery within 2 beats, while maintaining musical composure."
    },
    {
      id: "lo4e6",
      time: 8,
      title: "Beatbox Basics",
      type: "looper",
      checklist: true,
      what: "Vocal percussion: B (boots) = kick, Ts (cats) = hi-hat, Pf = snare. Your mouth is the most versatile percussion instrument you own. Close-mic technique: lips 1-2 inches from the mic. Practice each sound isolated, then combine into a simple pattern and record on Track 1.",
      setup: "Mic connected. Mic gain (knob [1]) set for close vocal work — approximately 50-60%. Lips 1-2 inches from the mic. Rhythm guide at 85 BPM.",
      steps: [
        { text: "KICK: Say 'B' with a deep chest punch — lips sealed, push air from your diaphragm. The sound should come from your chest, not your throat. Feel your sternum vibrate. Practice 8 kicks in a row at 85 BPM.", why: "The 'B' plosive creates a low-frequency transient that mimics a kick drum's attack. Diaphragm engagement produces chest resonance that adds the 'boom' of a real kick. Dub FX, Rahzel, and every beatboxer use this same fundamental — deep chest, sealed lips, explosive release." },
        { text: "HI-HAT: Say 'Ts' — tongue behind upper teeth, push air in a short burst. Short 'Ts' = closed hat, longer 'Tsss' = open hat. Practice 16 in a row (eighth notes at 85 BPM).", why: "The sibilant 'Ts' naturally occupies the 2-8kHz frequency range — exactly where a real hi-hat lives. The tongue position creates a natural high-pass filter, producing only high-frequency content. Varying the duration gives you the same closed/open vocabulary as a real hi-hat." },
        { text: "SNARE: Say 'Pf' — lips barely open, push air in a sharp burst. Or try 'K' from the back of your throat for a sharper, thinner snare. Practice 8 snares on beats 2 and 4.", why: "The 'Pf' creates a broad-spectrum burst that mimics a snare's noise component. The 'K' (glottal) gives a tighter, more defined hit. Having two snare sounds in your vocabulary gives you genre flexibility — 'Pf' for rock/pop, 'K' for hip-hop/electronic." },
        { text: "Combine: B-Ts-Pf-Ts at 85 BPM. This is the same kick-hat-snare-hat pattern from body percussion, but using your voice. Practice until the pattern flows without thinking about which sound comes next.", why: "The motor pattern is identical to body percussion — only the sound source changes. This means your rhythmic training transfers directly. The advantage of beatbox over body percussion: your hands are free to play guitar while the beatbox loop provides the rhythm." },
        { text: "Record the pattern on Track 1. Close-mic technique is essential — lips 1-2 inches from the mic, angled slightly off-axis to reduce plosive pops. Listen back: does it sound like a beat?", why: "Close proximity maximizes the proximity effect (bass boost from being near the mic), which deepens your kick sound. Angling slightly off-axis prevents the 'B' and 'Pf' plosives from overloading the mic capsule with a burst of air. This is standard vocal recording technique adapted for beatbox." }
      ],
      feel: "Like discovering that your mouth is a drum machine. It feels silly at first — making noises into a microphone like a kid — and then impressive very quickly when the loop plays back and it sounds like a real beat. The moment your beatbox loop grooves is a genuine thrill.",
      wrong: "If the beatbox sounds weak in the recording, it's a volume/proximity issue — get closer to the mic and push the sounds from your chest, not your throat. If plosive pops are ruining the recording, angle the mic 15-20 degrees off-axis (don't aim directly at it). If kick and snare sound identical, exaggerate the chest depth on the kick and the breathiness on the snare.",
      metronome: 85,
      sarah: "Gene, your mouth is the most versatile instrument you own — it can be a drum kit, a bass, a synth, whatever you need. The beatbox path is the Dub FX pathway — he built a global busking and festival career on vocal percussion + looping. For your psych-surf aesthetic, body percussion might be more natural, but having beatbox in your toolkit means you can build a groove anywhere, anytime, even without your guitar.",
      levelUp: "8 bars of B-Ts-Pf-Ts at 85 BPM that sounds like a beat, not someone making sounds with their mouth. The loop should groove."
    },
    {
      id: "lo4e7",
      time: 8,
      title: "Genre Rhythm Patterns",
      type: "looper",
      checklist: true,
      what: "Three genre-specific beatbox or body percussion patterns that match the music you actually listen to. Each genre has rhythmic DNA — a specific pattern of kicks, snares, and hats that makes it sound like THAT genre. Learn three patterns, record each as a loop, and hear how the same guitar chords feel completely different over each rhythm.",
      setup: "Mic positioned for body percussion or beatbox. Three empty tracks available. Rhythm guide ready at variable tempos.",
      steps: [
        { text: "REGGAE ONE-DROP (85 BPM): No kick on beat 1 — this is what makes it reggae. Kick hits on beat 3 ONLY. Rim click (light tap on guitar bridge) on the 'and' of beat 3. Hi-hat throughout on every eighth note. Record 2 bars on Track 1.", why: "The one-drop is reggae's signature: the ABSENCE of the kick on beat 1 creates a floating, hypnotic feel. This is the groove of Bob Marley, Lee Scratch Perry, and your reggae-one-drop-85 backing track. The empty beat 1 is the most powerful silence in popular music — it makes the listener lean forward." },
        { text: "SURF ROCK (100 BPM): Driving kick on beats 1 and 3, snare on 2 and 4 (standard backbeat), add 16th-note hi-hat or shaker pattern for energy. The surf groove is relentless and propulsive. Record 2 bars on Track 2.", why: "Surf rock's energy comes from the constant 16th-note subdivision on top of a standard rock beat. Think Dick Dale, The Ventures, and your surf-rock-120 backing track (we're practicing slower first). The 16th-note hi-hat creates a shimmering, driving pulse that carries the listener forward." },
        { text: "DESERT BLUES (95 BPM): Hypnotic circular pattern. Kick on beat 1 only — everything else flows in a relaxed, circular eighth-note pattern of alternating hat and ghost notes. Emphasis only on beat 1, beats 2-4 are equal weight. Record 2 bars on Track 3.", why: "Desert blues (Tinariwen, Ali Farka Toure, Bombino) uses a circular, trance-like rhythm where beat 1 is an anchor and everything else floats. The minimal kick pattern creates space for the guitar's hypnotic pentatonic lines. This groove should feel meditative, not driving." },
        { text: "Play the same Am-C-G-D chord progression live over each rhythm loop (one at a time). Notice how identical chords feel completely different — reggae chords skank, surf chords drive, desert blues chords float.", why: "This is the deepest lesson in rhythm: the groove defines the genre more than the chords or melody. The same four chords become three different genres just by changing the percussion pattern underneath. Rhythm is the DNA of genre." },
        { text: "Pick the genre that feels most natural. That's your default rhythm template for building loops. You can always switch, but having a home base groove speeds up every future performance.", why: "Your natural groove affinity reveals your musical center of gravity. For Gene, this is likely the reggae one-drop or desert blues — both align with your laid-back porch register and the artists you love. Knowing your default groove saves decision time in performance." }
      ],
      feel: "Like trying on three different musical identities. Each rhythm pattern should change your entire body language — reggae makes you sway, surf makes you bounce, desert blues makes you close your eyes and ride the wave. If you're not moving differently with each groove, the pattern isn't distinct enough.",
      wrong: "If all three patterns sound the same, the kick placement isn't distinct enough. Reggae = kick on 3 ONLY. Surf = kick on 1 and 3. Desert blues = kick on 1 ONLY. The kick defines the genre. If the desert blues groove feels too similar to reggae, reduce the hat pattern to straight eighths with no accents — desert blues is circular and even, reggae has the syncopated rim click.",
      metronome: 95,
      sarah: "Gene, each genre has a rhythmic DNA — learn it in your body and you can play anything. Your playlist spans all three of these grooves: Skinshape and reggae-rock for the one-drop, Allah-Las for the surf drive, Tinariwen for the desert blues trance. When you can switch between these rhythms on the 505, you're not just a looper — you're a one-person genre machine.",
      levelUp: "Three distinct genre rhythm loops that make the same chord progression sound like three different songs. A listener could identify each genre from the percussion alone."
    },
    {
      id: "lo4e8",
      time: 5,
      title: "Ghost Notes and Dynamics",
      type: "looper",
      checklist: true,
      what: "The quiet notes between the loud ones are what create groove. Record a percussion loop with deliberate dynamic variation — loud kick, medium snare, soft ghost notes on the and's. The RC-505mkII captures dynamics faithfully: what goes in comes out. If your percussion sounds flat and mechanical, the problem is missing dynamics.",
      setup: "Track 1 empty. Mic gain set for body percussion (high). Rhythm guide at 90 BPM.",
      steps: [
        { text: "Record a simple kick-snare pattern: kick on 1 and 3 (LOUD), snare on 2 and 4 (MEDIUM). Let it loop. Listen — it grooves, but it sounds stiff.", why: "A pattern with only two dynamic levels (loud and medium) sounds programmed. Real drummers play at dozens of dynamic levels simultaneously — the hi-hat is lighter than the snare, ghost notes are barely audible, accents jump out. This dynamic range is what separates a groove from a metronome." },
        { text: "Overdub: add ghost notes (VERY QUIET fingertip taps on the guitar body) on every 'and' and every 'e' and 'a' you can manage. These should be barely audible — 20% of the volume of your kick.", why: "Ghost notes are the secret ingredient of every great drummer. They fill the rhythmic gaps with subtle texture that the ear feels rather than consciously hears. Steve Jordan, Questlove, and DJ (Khruangbin's drummer) all master this: the spaces between the beats are filled with whispered rhythmic information." },
        { text: "Listen back. Compare the version with ghost notes to a version without. The ghost note version should feel warmer, more human, more alive — even though the notes are barely audible.", why: "Ghost notes activate the listener's rhythmic perception at a subconscious level. Studies in musical cognition show that micro-timing variations and dynamic range in percussion correlate directly with perceived groove quality. Perfectly uniform hits sound robotic; varied dynamics sound human." },
        { text: "Experiment with dynamics on the main hits too: make the kick on beat 1 slightly louder than the kick on beat 3. Add a tiny accent on the 'and' of beat 4 leading into the next bar. These micro-dynamics create forward motion.", why: "Dynamic variation across the bar creates a sense of phrase structure — the listener subconsciously feels where bar lines are because the pattern breathes. This is how music creates momentum without speeding up." }
      ],
      feel: "Like the difference between a drum machine and a real drummer. The ghost notes add warmth, breath, and humanity to your percussion loop. When you hear it with ghost notes, you'll never go back to flat dynamics. Groove lives in the quiet notes, not the loud ones.",
      wrong: "If your ghost notes are as loud as your main hits, you're not differentiating dynamics enough — they should be whisper-quiet, barely registering on the meter. If you can't hear any difference with ghost notes, your mic gain might be too low to capture them — increase gain slightly. If the overdub pushes the total volume too high, the ghost notes are too loud.",
      metronome: 90,
      sarah: "Gene, groove lives in the quiet notes, not the loud ones. DJ from Khruangbin is the absolute master of this — listen to how her hi-hat work is a conversation of dynamics, not a steady pulse. Every ghost note is a whispered invitation to nod your head. When your body percussion has this dynamic range, your loops will feel like a real drummer is in the room.",
      levelUp: "A percussion loop with audible dynamic variation — ghost notes that add warmth without adding volume, and accented hits that create phrase structure."
    },
    {
      id: "lo4e9",
      time: 5,
      title: "Mic Technique for Percussion",
      type: "looper",
      checklist: true,
      what: "RC-505mkII-specific input gain management for switching between percussion and vocal sources. The mic gain for beatbox needs to be set separately from vocal singing — and you'll be switching between these sources during every performance. Also: proximity effect (closer = more bass) and plosive management.",
      setup: "Mic connected. Two empty tracks. Switch between body percussion/beatbox and normal singing during this exercise.",
      steps: [
        { text: "GAIN SWITCHING DRILL: Set input gain (knob [1]) to 70% for body percussion. Record a 2-bar percussion loop on T1. Now — before recording vocals — reduce gain to 40%. Record a vocal melody on T2. Play both back together.", why: "If you forget to reduce gain between percussion and vocal recording, the vocal will clip and distort. This gain switching needs to become automatic — a reflex you perform between every recording. Write on a sticky note on the 505: 'CHECK GAIN BEFORE RECORDING.' You'll thank yourself in performance." },
        { text: "PROXIMITY EFFECT: Move your lips from 6 inches to 1 inch from the mic while beatboxing the kick. Hear how the kick gets deeper (more bass) as you get closer. This is the proximity effect — cardioid microphones naturally boost bass frequencies when the source is close.", why: "The proximity effect is your friend for kick sounds: getting close to the mic adds low-end weight that makes a 'B' sound like a real kick drum. Professional beatboxers exploit this constantly — swallowing the mic for kick, pulling back for hat." },
        { text: "PLOSIVE MANAGEMENT: Say 'B' directly into the mic — hear the pop? Now angle the mic 15-20 degrees off-axis and say 'B' again. The pop disappears but the kick sound stays. This off-axis technique is your pop filter.", why: "Plosive consonants (B, P) push a burst of air that overloads the mic capsule. Angling off-axis lets the air pass by while the sound still reaches the capsule. In a live looping performance, you don't have a pop filter — angle control IS your pop filter." },
        { text: "FULL WORKFLOW: Record beatbox on T1 (gain at 65%, close-mic). Reduce gain to 40%. Record singing on T2 (gain at 40%, 4-6 inches from mic). Both tracks should be clean with no clipping.", why: "This complete workflow — gain adjustment, mic distance adjustment, recording, gain adjustment, distance adjustment, recording — is the physical choreography of multi-source looping. Practicing it as a sequence builds the muscle memory you'll need in performance." }
      ],
      feel: "Like learning the control panel of a recording studio — except the studio is your RC-505mkII and the microphone technique is part of the instrument. When the gain switching becomes automatic, you'll feel like a professional engineer and performer simultaneously.",
      wrong: "If your vocal recording clips after recording percussion, you forgot to reduce gain — this is the #1 workflow error and it needs to be drilled until it's automatic. If your kick sounds thin, get closer to the mic (proximity effect). If you hear plosive pops in the recording, angle the mic off-axis. Every one of these problems has a specific physical solution.",
      metronome: 85,
      sarah: "Gene, the mic is part of the instrument — learning its sweet spots is 505 mastery. Professional loopers spend hours dialing in their mic technique because it determines the quality of EVERY loop they build. When you can switch between percussion and vocal gain without thinking about it, you've internalized the physical workflow that makes live looping feel effortless. This is the stuff that separates someone who owns a looper from someone who IS a looper.",
      levelUp: "Successfully record percussion (high gain) and vocals (lower gain) on separate tracks without any clipping, distortion, or plosive pops. The gain switch is performed without hesitation."
    },
    {
      id: "lo4e10",
      time: 5,
      title: "The Pocket Test",
      type: "looper",
      checklist: true,
      what: "Record a rhythm loop (body percussion or beatbox), then play guitar over it. Apply the one test that matters: does it make you nod? The pocket is physical, not intellectual. If your head nods involuntarily, the groove is right. If you have to think about where the beat is, re-record.",
      setup: "Clean rhythm loop playing on Track 1. Guitar in hand. No rhythm guide — the loop is the only reference.",
      steps: [
        { text: "Record your best percussion loop — body percussion or beatbox, whichever felt more natural. Let it cycle for 8 bars without playing along. Just listen. Does your head nod?", why: "The nod test bypasses intellectual analysis and goes straight to your body's groove response. Neuroscience research on rhythm perception shows that groove engages the motor cortex — your body literally wants to move when the rhythm is right. If the nod doesn't happen, the groove isn't there yet." },
        { text: "Play guitar over the loop — simple Am-C-G-D fingerpicking. Are you in the pocket? The pocket is the place where your playing and the loop feel like one unified thing, not two separate sources fighting for attention.", why: "The pocket is a two-way relationship: the loop provides a rhythmic framework, and your live playing locks to it. When both are in the pocket, they fuse into a single groove. When they're not, you hear two separate things happening at the same time — the musical equivalent of two people trying to walk through a doorway simultaneously." },
        { text: "Try playing BEHIND the beat — slightly late, lazy, relaxed. This is the reggae feel. Does the pocket change character? It should feel like golden hour — warm, slow, beautiful.", why: "Playing behind the beat is a deliberate stylistic choice in reggae, dub, and R&B. For Gene's aesthetic — DOPE LEMON, Skinshape, Khruangbin — the behind-the-beat feel is home. It creates a sense of unhurried confidence that defines the 'porch register' vibe." },
        { text: "Try playing ON TOP of the beat — right on time, precise, driving. This is the surf rock feel. Does the pocket change character? It should feel energetic and propulsive.", why: "Playing on top of the beat is the surf rock and punk approach — direct, energetic, no hesitation. For Gene's Allah-Las and surf-rock moments, this tighter pocket creates forward momentum. The same chords feel completely different just by shifting your timing relationship to the loop." },
        { text: "Find YOUR pocket — the timing relationship where playing over the loop feels most natural, most like YOUR music. That's your default. Remember it.", why: "Every musician has a natural timing tendency — a place on the beat where their playing feels most effortless. Identifying yours gives you a home base for all future performances. You can always shift for genre purposes, but knowing your default pocket is self-knowledge that serves every musical context." }
      ],
      feel: "The pocket is a physical sensation — relaxation, flow, synchronization without effort. When you're in the pocket, time seems to slow down and the music plays itself. When you're outside the pocket, everything feels like work. Chase the feeling where your head nods involuntarily.",
      wrong: "If your head never nods, the percussion loop itself might not groove — re-record it with more attention to dynamics and timing. If you can feel the groove but your guitar playing fights it, you're likely rushing. Slow your attack slightly and listen more than you play. If everything feels stiff, take a breath, relax your shoulders, and remember: Khruangbin's drummer DJ is the master of pocket because she plays with absolute physical relaxation.",
      metronome: 95,
      sarah: "Gene, the nod test is the only test that matters. You can analyze timing on a grid, read about subdivisions in a textbook, study drum patterns in music theory — but none of that tells you if it GROOVES. Your body knows. DJ from Khruangbin is the master of pocket because every hit is placed with intention and relaxation. When your loops make YOUR head nod, you've got it. Everything else is just decoration on top of groove.",
      levelUp: "A rhythm loop + live guitar performance where your head nods involuntarily, you can identify your natural pocket (behind, on, or ahead of the beat), and the combined sound feels like one unified groove."
    }
  ]
};
