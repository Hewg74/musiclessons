export const level5 = {
  level: 5,
  title: "Barre Chord World",
  subtitle: "One shape, every key. The barre chord unlocks the entire neck.",
  description:
    "Open chords got you through the first four levels — but they chain you to the first three frets. The barre chord breaks that chain. Your index finger becomes a moveable nut, and suddenly one shape played at different frets gives you every chord in every key. We start at fret 5 where the tension is forgiving, isolate the barre finger before adding the chord shape, and build toward Sun Room's Sol Del Sur — the barre chord anthem.",
  artists: "Sun Room, Billy Changer, levitation room",
  unlocks: "Jangle & Shimmer (Level 6)",
  review: {
    label: "Level 4 Check-In",
    time: 5,
    exercises: ["gs-4-1", "gs-4-4b"],
    prompt: "Play a clean reggae skank on ands-only for 60 seconds (gs-4-1). Then play B-F#-E (Jah Werx) with the offbeat chop (gs-4-4b). Skank is percussive and tight? Ready for barres."
  },
  exercises: [

    // ─── PHASE 1: THE BARRE FINGER ───

    {
      id: "gs-5-1",
      time: 8,
      title: "The Moveable Nut — Index Finger Isolation",
      type: "guitar",
      what: "Before you play a single barre chord, you need a clean barre. Your index finger laid flat across all six strings IS a capo — a moveable nut. This exercise isolates that finger at fret 5 (where string tension is forgiving) and fixes each buzzing string one at a time. Technique over strength: bony side of finger, thumb directly behind, elbow pulled slightly in.",
      setup: "Guitar. No metronome — this is slow, diagnostic work.",
      steps: [
        { text: "Place your index finger flat across all six strings at fret 5. Don't press yet — just lay it there. Feel the six strings pressing into your finger — six distinct lines of pressure, each a slightly different thickness. Now press down with moderate pressure and strum all six strings slowly, one at a time, from low E to high E. Feel how each string responds differently under your finger — the thick low E requires firm pressure, the thin high E barely needs anything. Listen for buzzes, mutes, dead notes. Mark which strings ring clean and which don't.", why: "Isolation before chord shapes means you fix the foundation first. The awareness of six distinct pressure points on one finger is the physical architecture of barre chords — your whole hand pressed against the neck is a physical commitment, every finger with a role. Most barre chord frustration comes from skipping this step and blaming strength — it's almost always technique, not muscle." },
        { text: "For each buzzing string: adjust your finger position slightly. Roll toward the bony side of your index finger (the side facing the headstock). The flat pad of your finger has a groove between the joints where strings fall into dead zones — the bony edge is harder and more even.", why: "The bony side of the index finger is flatter and firmer than the pad. This single adjustment fixes 70% of barre chord buzzing. It feels unnatural at first, but it's the technique every professional uses." },
        { text: "Check your thumb: it should be directly behind your index finger on the back of the neck, roughly centered. Not peeking over the top. Not way down at the bottom. Push your thumb forward into the neck as your fingers pull back — like a clamp. Pull your elbow slightly toward your body.", why: "Thumb placement is the hidden lever of barre chords. When the thumb is behind the barre finger, you create a pinch mechanism that requires far less grip strength. Elbow in angles your wrist to distribute pressure evenly across all strings." },
        { text: "Hold the clean barre at fret 5 for 30 seconds. Release completely — shake out your hand. Repeat 5 times. Each rep, place the finger and get all 6 strings ringing clean as fast as you can. Time yourself — how many seconds to get a clean barre?", why: "Timed reps build efficiency, not just strength. The goal isn't to squeeze harder — it's to find the clean position faster. 30-second holds with full releases train endurance without building tension." },
        { text: "Move the barre to fret 7 (easier — less tension). Get all 6 strings ringing. Then fret 3 (harder — more tension). Then fret 1 (hardest — maximum string tension). Each position requires slightly different pressure. Fret 1 is GRADUATION, not the starting point.", why: "Higher frets have less string tension and are physically easier. Starting at fret 5 and working down teaches your hand to adapt pressure to position. If fret 1 buzzes, go back to fret 5 — you haven't lost anything, you're building correctly." }
      ],
      feel: "This should feel like tuning an instrument — precise, patient, diagnostic. When all 6 strings ring clean, there's a satisfying shimmer, like a piano chord. The pressure should feel firm but not death-grip. If your hand cramps, you're squeezing too hard.",
      wrong: "If your hand cramps within 10 seconds, you're using brute force instead of technique. Check: is your thumb behind the barre? Are you using the bony side? Is your elbow pulled in? The cramping and buzzing are your hand adapting to a completely new position — this is proprioceptive learning, not failure. Every guitarist who plays barres today went through this exact phase. If strings still buzz after all adjustments, it might be your guitar's action — have a teacher or shop check the setup. If your finger can't hold all 6 strings clean after 10 minutes of focused practice, stop and try again tomorrow. Motor learning research shows 10-13% improvement happens during sleep, not during practice. Your brain is literally rewiring finger pressure control overnight.",
      sarah: "Gene, barre chords are the single biggest unlock on guitar. Every open chord you already know — Am, G, C, D — has a barre version that slides anywhere on the neck. This one exercise is the gateway to playing Sol Del Sur, Island Fever, and basically every Sun Room song. Don't rush it. Luke from Sun Room keeps it simple — three shapes moved around the neck. That's all you need.",
      recorder: true,
      levelUp: "All 6 strings ring clean at fret 5 within 5 seconds of placing the barre, and you can hold it for 30 seconds without hand cramping. Fret 3 is clean. Fret 1 is attempted."
    },

    // ─── PHASE 2: E-SHAPE AND A-SHAPE BARRES ───

    {
      id: "gs-5-2",
      time: 8,
      title: "The E-Shape Barre — Am Becomes Anything",
      type: "guitar",
      what: "The open Am chord shape — now slide it up the neck with your barre finger behind it. At fret 2, Am becomes Bm. At fret 4, it becomes C#m. At fret 5, Dm. One shape, every minor chord. This is the shape behind Sol Del Sur's C#m.",
      setup: "Guitar. No metronome yet — slow shape building first.",
      chordVoicings: { chords: ["Am", "Bm", "C#m"] },
      steps: [
        { text: "Play an open Am chord. Look at your finger positions: middle finger on string 4 fret 2, ring finger on string 3 fret 2, index on string 2 fret 1. Now imagine sliding that whole shape up 2 frets — but you need something to replace the nut. That's your barre finger.", why: "Understanding that the barre replaces the nut is the conceptual breakthrough. Every open chord you know can become a barre chord by adding the index finger as a moveable nut and shifting the shape up the neck." },
        { text: "Place your index finger barre at fret 2. Now add your ring finger on string 5 fret 4, pinky on string 4 fret 4, middle finger on string 3 fret 3. Strum strings 5 through 1 (skip the low E or include it — it's the root Bm either way). This is Bm — the same Am shape, moved up 2 frets.", why: "The fingering shifts from the open Am: what was index-middle-ring becomes middle-ring-pinky, because the index finger is now the barre. This new fingering feels awkward at first but becomes second nature." },
        { text: "Slide the same shape to fret 4. Now it's C#m — the main chord in Sol Del Sur. Strum it slowly. Fix any buzzes. Then slide to fret 5 — that's Dm. Fret 7 — Em. Same shape every time, different fret = different chord.", why: "Sliding the same shape to different frets is the 'moveable nut' concept in action. You don't learn new shapes — you learn new positions. The entire neck opens up with this single realization." },
        { text: "Practice the placement sequence for C#m at fret 4: barre first (get it clean), then add the other three fingers one at a time. Don't strum until all fingers are down. Then strum. Repeat 10 times — place, strum, release, shake out, place again.", why: "One-at-a-time finger placement builds clean muscle memory. Trying to slam all four fingers down at once leads to sloppy positioning and persistent buzzing. Barre first, then build the shape on top." },
        { text: "When C#m is consistent, try 10 clean strums in a row at fret 4. If any strum buzzes, restart the count from zero. This is the rep-with-reset method — it builds reliability, not just occasional success.", why: "10 clean reps in a row proves the chord is internalized, not lucky. Resetting the count on any error forces you to maintain quality across every repetition, not just get it right once and move on." }
      ],
      feel: "The barre chord should ring with the same fullness as an open chord — all strings vibrating, rich and resonant. C#m at fret 4 has a dark, moody warmth that's instantly recognizable if you know Sol Del Sur. When you slide the shape and hear the key change, it feels like magic.",
      wrong: "If the high E string is always dead, your barre finger isn't reaching across all 6 strings — roll slightly toward the bony edge and make sure the tip extends past the high E. If the chord sounds thin or muted, check your arch: the non-barre fingers must curl enough that their pads don't touch adjacent strings. The new finger arrangement feels wrong because your hand hasn't mapped it yet — trust the sound over the sensation. When it rings clean, THAT's what 'right' feels like.",
      sarah: "Gene, C#m at fret 4 IS Sol Del Sur. When Luke plays that opening chord — Jazzmaster through the Tubescreamer at low gain into the Deluxe Reverb — it's this exact shape. The beauty of Sun Room is that their entire catalog lives in maybe 5-6 barre shapes moved around the neck. Simple is better. That's Luke's whole philosophy.",
      metronome: 60,
      levelUp: "C#m barre chord at fret 4 rings clean on all strings, 10 consecutive clean strums with no buzzes. Can also play Bm (fret 2) and Dm (fret 5) using the same shape."
    },
    {
      id: "gs-5-3",
      time: 8,
      title: "The A-Shape Barre — The Second Moveable Shape",
      type: "guitar",
      what: "The E-shape barre covers minor chords rooted on string 6. The A-shape barre covers chords rooted on string 5 — and it's how you play B major and F# major, the other two chords in Sol Del Sur. Two shapes give you every chord on the neck.",
      setup: "Guitar. No metronome — shape building.",
      chordVoicings: { chords: ["A", "B", "F#"] },
      steps: [
        { text: "Play an open A major chord. Look at your fingers: all three crammed onto fret 2, strings 4-3-2. Now imagine sliding that shape up 2 frets with a barre behind it at fret 2 — that's B major. The barre covers fret 2, and the chord shape sits at fret 4.", why: "The A-shape barre is rooted on string 5 (the A string). Open A has its root on the open A string. When you barre at fret 2, the A string at fret 2 is B — so the chord is B major." },
        { text: "For B major: barre all strings at fret 2. Then place your ring finger as a mini-barre across strings 4-3-2 at fret 4. Or use three separate fingers if that's easier (ring on string 4, pinky on string 3, middle on string 2, all at fret 4). Strum strings 5 through 1.", why: "The A-shape barre has two common fingerings: ring finger mini-barre (faster to place, harder to get clean) or three individual fingers (slower, more precise). Try both and use whichever rings cleanest for you right now." },
        { text: "Slide the B shape up to fret 4 — that's C# major. Up to fret 9 — F# major. F# at fret 9 is one of the easier positions because the frets are close together and string tension is low. This is the F# in Sol Del Sur.", why: "F# major at fret 9 is easier than B major at fret 2 — shorter fret spacing means less stretch. But Sol Del Sur uses F# at fret 2 (A-shape) because it's closer to the C#m and B positions. You'll work up to that." },
        { text: "Alternative F# position: barre at fret 2 with the A-shape. This puts F# right next to B (also at fret 2 but rooted on string 5, fret 2 = B when including the barre). Practice placing B at fret 2, then F# at fret 2 — different string root, same fret.", why: "Having B and F# both accessible near fret 2 means minimal hand movement during Sol Del Sur. The C#m is at fret 4 (E-shape). The whole progression lives in a 3-fret zone. This is why barre chords are efficient — close positions, minimal travel." },
        { text: "Play all three Sol Del Sur chords in sequence: C#m (E-shape, fret 4) → B (A-shape, fret 2) → F# (A-shape, fret 2). Very slowly, one chord per 4 beats. Focus on clean transitions, not speed. If any chord buzzes, stop and fix it before moving on.", why: "This is the first time you're combining both barre shapes in a real song context. The transition from E-shape (C#m) to A-shape (B) is the hardest part — different hand positions, different string roots. Slow practice here pays dividends." }
      ],
      feel: "The A-shape barre feels more compact than the E-shape — your fingers are closer together, the chord is narrower. B major should ring with a bright, full sound. F# major has a warm, rich quality. When you play C#m → B → F# in sequence, even at glacial tempo, you should hear Sol Del Sur start to emerge.",
      wrong: "The most common A-shape problem is the high E string buzzing or being muted by the ring finger mini-barre. If using the mini-barre approach, make sure your ring finger arches enough to clear string 1. If it won't clear, switch to three individual fingers — there's no shame in that, many pros use individual fingers.",
      sarah: "Gene, B and F# are the other two chords in Sol Del Sur. With C#m from the last exercise, you now have the whole progression under your fingers. Sun Room's genius is that this entire song is three barre chords in a tiny zone of the neck — frets 2 through 4. Luke doesn't jump around. He keeps it tight and lets the strum do the talking.",
      metronome: 50,
      levelUp: "B major (A-shape, fret 2) and F# major (A-shape, fret 2 or fret 9) ring clean. Can play C#m → B → F# at 50 BPM, one chord per bar, with no dead strings."
    },

    // ─── PHASE 3: TRANSITIONS AND MOVEMENT ───

    {
      id: "gs-5-4",
      time: 7,
      title: "One-Minute Changes — Barre Pairs",
      type: "guitar",
      what: "The one-minute changes drill, now applied to barre chords. Set a timer. Pick two barre chords. Switch back and forth as fast as you can while keeping both clean. Count your changes. Write it down. Beat your count tomorrow. Target: 20 changes per minute means the pair is solid.",
      setup: "Guitar. Timer (phone). No metronome — go as fast as cleanness allows.",
      steps: [
        { text: "Pair 1: Bm (E-shape, fret 2) ↔ C#m (E-shape, fret 4). Same shape, different fret — the easiest barre transition. Set timer for 60 seconds. Switch back and forth, strumming once per chord. Count total changes. Write the number down.", why: "Same-shape sliding is the easiest barre transition because your hand maintains the same formation — only the position changes. This builds confidence before tackling cross-shape transitions." },
        { text: "Pair 2: C#m (E-shape, fret 4) ↔ B (A-shape, fret 2). Different shapes — this is the Sol Del Sur transition. Set timer, count changes. This will be fewer than Pair 1, and that's expected.", why: "Cross-shape transitions are harder because your hand must reform between chords. The C#m-to-B move requires lifting the barre, shifting down 2 frets, and switching from E-shape to A-shape. Slow is fine — you're building the neural pathway." },
        { text: "Pair 3: B (A-shape, fret 2) ↔ F# (A-shape, fret 2). Same fret, same shape family but different root string. Set timer, count. This should be faster than Pair 2 because the hand stays in roughly the same position.", why: "B to F# is the easiest transition in Sol Del Sur — both are A-shape barres near fret 2. Once this pair is fast, two-thirds of the song's transitions are handled." },
        { text: "Pair 4: Open Am ↔ Bm (E-shape barre, fret 2). This is the barre-to-open transition — lifting the barre and returning to open position. Set timer, count. This transition matters for songs that mix open and barre chords.", why: "Barre-to-open transitions test your ability to fully release the barre and relax into open chord position. Many players keep tension in their hand after a barre — this drill forces the release." },
        { text: "Record all four counts. Tomorrow, do the same four pairs and try to beat each count by 2-3 changes. The number always goes up if you practice daily. If you can't improve after 3 days, sleep on it — motor learning consolidates overnight.", why: "Tracking numbers turns practice into a game with measurable progress. The sleep consolidation tip is neuroscience-backed: motor skills often improve more between practice sessions (during sleep) than during the session itself." }
      ],
      feel: "This should feel athletic — like sprint intervals for your fretting hand. The switches should be as fast as you can go while still hearing clean chords. Sloppy-fast doesn't count. Clean-fast is the goal.",
      wrong: "If you're getting fewer than 8 changes per minute on any pair, you're probably re-forming the chord from scratch each time. Look for anchor points: when switching Bm to C#m, the hand shape stays the same — just slide. When switching C#m to B, your index finger barre stays in roughly the same zone.",
      sarah: "Gene, this is Justin Guitar's most effective exercise, adapted for barre chords. The numbers game makes it addictive — you'll want to beat your count every day. When Pair 2 (C#m ↔ B) hits 20 changes per minute, Sol Del Sur will feel effortless. That's the threshold.",
      levelUp: "All four pairs above 15 changes per minute. Pair 1 (same-shape slide) above 25. Pair 2 (Sol Del Sur transition) above 20."
    },
    {
      id: "gs-5-5",
      time: 6,
      title: "Sliding Barres — The Chromatic Escalator",
      type: "guitar",
      what: "Take one barre chord shape and slide it up the neck one fret at a time. Every fret = a half step = a new key. This is the 'chromatic escalator' — a physical demonstration that your barre finger IS a capo. You'll hear the key rise with each fret, feel the tension change in the strings, and internalize the entire neck as one continuous instrument.",
      setup: "Guitar. Metronome at 60 BPM.",
      steps: [
        { text: "Start with the E-shape minor barre at fret 1 (Fm). Strum 4 beats. Slide the whole shape up one fret to fret 2 (F#m) — feel the string tension ease slightly as you climb, the frets narrowing under your fingers. Strum 4 beats. Continue: Gm (fret 3), G#m (fret 4), Am (fret 5), and so on up to fret 12 (Fm again, one octave higher). Feel how the guitar's resonance changes at each position — the body vibrates differently as you climb the neck, the timbre brightening. Listen to the key rise with each fret.", why: "The chromatic escalator proves that every fret is a half step and every barre position is a valid chord. The changing tension and resonance at each fret is a physical map — your body learns that lower frets feel tight and dark, higher frets feel easy and bright. This kinesthetic geography teaches neck navigation more effectively than memorizing a fret chart." },
        { text: "Now descend: start at fret 12 and slide down one fret at a time, back to fret 1. Going down is slightly harder because you're moving toward higher string tension. Keep the chord clean at every position.", why: "Descending tests your ability to increase pressure as tension increases. The lowest frets require the most effort — if the chord gets muddy below fret 3, that's normal. You're building toward clean low-fret barres over time." },
        { text: "Do the same with the A-shape major barre. Start at fret 1 (Bb major). Slide up chromatically: B (fret 2), C (fret 3), C# (fret 4), D (fret 5), all the way up. Feel how the major shape has a brighter, more triumphant quality at each position.", why: "Repeating the exercise with the A-shape builds fluency in both barre shapes. Hearing major vs. minor at every fret reinforces the emotional difference between the two shapes." },
        { text: "Musical variation: instead of going chromatically, jump to specific positions. Play the C#m (fret 4), then jump to Am (fret 5 on E-shape = Am, but fret 5 of the A-shape = D major). Name each chord as you land. Can you find C#m, B, and F# without counting frets from the nut?", why: "Jumping between positions tests your fretboard knowledge. In a real song, you don't slide chromatically — you jump to specific chords. Naming them as you land connects the physical position to the musical name." }
      ],
      feel: "The chromatic escalator should feel like riding an elevator through keys — each floor has a slightly different color but the room (chord shape) is the same. The effortlessness of changing keys with one shape movement is the 'aha moment' of barre chords.",
      wrong: "If the chord gets increasingly muddy as you go down the neck, check your thumb: at lower frets you need MORE thumb pressure behind the barre to compensate for higher string tension. If your hand cramps during the full chromatic run, take a break at fret 7 — shake out, then continue.",
      sarah: "Gene, this is the exercise that makes the neck click. When you realize that sliding one shape gives you every key — C#m for Sol Del Sur, Fm for Island Fever, Bm for Just Yesterday — the guitar stops being a puzzle and starts being an instrument. One shape. Every key. That's the barre chord promise.",
      metronome: 60,
      levelUp: "Can play the E-shape minor barre at every fret from 1 to 12 (ascending and descending) with no dead strings. Can name at least 5 positions without counting from the nut."
    },

    // ─── PHASE 4: SONG STUDIES ───

    {
      id: "gs-5-6",
      time: 10,
      title: "Song Study: Sol Del Sur — The Barre Chord Anthem",
      type: "guitar",
      songRef: {
        title: "Sol Del Sur — Sun Room",
        src: "/sol-del-sur.mp3",
        note: "The barre chord anthem — F#m-A-E-B at 120 BPM. All barre shapes, no open chords."
      },
      what: "Sun Room's Sol Del Sur is a three-chord barre masterpiece: C#m-B-F# (i-bVII-IV in C# minor). The F# is major — borrowed from the parallel major key, creating that modal ambiguity that gives the song its restless, sun-drenched ache. Listen and ghost the chord shapes before touching the guitar. This is the anchor song of Level 5. Learn it, feel it, own it.",
      setup: "Guitar. Backing track: Sol Del Sur. Metronome starting at 70 BPM, target 100 BPM.",
      chordVoicings: { chords: ["C#m", "B", "F#"] },
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "Play C#m (E-shape, fret 4) → B (A-shape, fret 2) → F# (A-shape, fret 2) at 70 BPM. One chord per bar, 4 beats each. Simple downstrums on beats 1 and 3. Don't worry about the strum pattern yet — just get the chord changes clean and in time.", why: "Starting at 70% of song tempo with a simplified strum isolates the chord transitions. If you can't change chords cleanly at 70 BPM, the strum pattern will only mask the problem." },
        { text: "The harmonic secret: the F# is MAJOR in a minor key. C#m is i (home minor), B is bVII (the flattened seventh — dark and heavy), F# is IV — but IV in C# minor should be F#m. Sun Room uses F# major, borrowed from C# major. This creates the 'should I be sad or hopeful?' feeling. Play C#m → B → F#m (change the F# to minor) — hear how much darker and more resolved it sounds. Now switch back to F# major. THAT'S the Sol Del Sur sound.", why: "Understanding the borrowed chord (major IV in a minor key) is the harmonic insight that separates playing the right notes from understanding the music. This same trick appears across Gene's favorite artists — levitation room, The Lagoons, countless others." },
        { text: "Add the strum pattern: Down, Down-Up, Down-Up. NOT straight downstrokes. The second and third beats push with a down-up syncopation, with muted ghost strums between the clean hits. Play along with the backing track at 80 BPM.", why: "Sun Room's strum is reggae-adjacent — it has an offbeat push that gives the song its bounce. The muted ghost strums (hand relaxes on strings between clean hits) are what create the percussive texture. This connects directly to the offbeat work from Level 4." },
        { text: "Increase to 90 BPM. The chord changes should start feeling automatic — your hand knows where to go without looking. If a transition still stumbles, isolate that pair with the one-minute changes drill from gs-5-4 for 2 minutes, then return to the full progression.", why: "Speeding up reveals which transitions are automated and which still need conscious effort. Targeted isolation (drilling just the problem transition) is more efficient than playing the whole song slowly." },
        { text: "Full speed: 100 BPM with the backing track. Play through the entire song form — verse (C#m-B-F#) and chorus (E-F#). The chorus introduces open E into the barre sequence. Record a full play-through.", why: "Playing at full tempo with the backing track is the test. The E-F# chorus adds an open-to-barre transition that tests your ability to shift between chord types fluidly." }
      ],
      feel: "Sol Del Sur should feel sun-drenched and slightly melancholic — that golden-hour ache where you're savoring something beautiful that won't last. The syncopated strum should bounce, the chord changes should breathe, and the borrowed F# major should create a moment of unexpected warmth in the minor key darkness.",
      wrong: "If the strum sounds choppy and mechanical, your arm isn't maintaining constant motion. The arm swings like a pendulum on every 8th note — some swings hit strings, some miss (ghost strums). If the arm stops between strums, the groove dies. If the F# sounds wrong, make sure it's major (bright) not minor (dark).",
      sarah: "Gene, this is IT. Sol Del Sur is track #45 in your top 50, and it's the perfect barre chord vehicle. Luke from Sun Room plays a Jazzmaster with the Tubescreamer always on — low gain, just warming the signal, tone shaping. Through a Fender Deluxe Reverb. His philosophy is 'simple is better' — three chords, one syncopated strum, let the song breathe. That C#m-B-F# is the i-bVII-IV pattern you'll hear everywhere in psych-surf once you know to listen for it. The F# being major instead of minor is the secret ingredient — it's borrowed from the parallel major key, creating this modal ambiguity that makes the song restless and hopeful at the same time.\n\nThe emotional engine of Sol Del Sur is the verse-chorus dynamic contrast. In the verse, choke every barre chord staccato — squeeze the shape briefly, then immediately release pressure to kill the ring. Short, bouncy, percussive. Then when the chorus hits at 0:50, let the E and F# chords ring wide open. That staccato-to-legato shift is what makes the song breathe. Also: Luke's pick attack is hard and aggressive — don't be gentle with this one.",
      metronome: 70,
      speedLadder: { start: 50, end: 100, increment: 10, bars: 4 },
      recorder: true,
      levelUp: "Can play Sol Del Sur (C#m-B-F#) at 100 BPM with the syncopated strum pattern, no dead strings, chord changes on time. Recorded play-through sounds like the song."
    },
    {
      id: "gs-5-7",
      time: 8,
      title: "Song Study: Island Fever — Barre Chords in Fm",
      type: "guitar",
      songRef: {
        title: "Island Fever — Billy Changer",
        src: "/island-fever.mp3",
        note: "Chords are from Chordify auto-detect (Fm-Bb-Ab-Eb). Listen and verify — Bb might be Bbm."
      },
      what: "Billy Changer's Island Fever lives in Fm — a darker, dreamier barre world. The progression Fm-Bb-Ab-Eb uses all barre chords (Chordify source — hit play to verify). You can also capo at fret 1 and play Em-A-G-D. Slower (97 BPM) and more spacious than Sol Del Sur — let the chords ring.",
      setup: "Guitar. Listen to the song — verify chords. Metronome at 75 BPM.",
      chordVoicings: { chords: ["Fm", "Bb", "Ab", "Eb"] },
      tracks: [{ name: "Reggae Rock 100", src: "/reggae-rock-100.mp3" }],
      steps: [
        { text: "Full barre approach: Fm (E-shape, fret 1 — the hardest barre position), Bb (A-shape, fret 1), Ab (E-shape, fret 4), Eb (A-shape, fret 6). Play each chord, find the shapes, don't worry about tempo yet. This is the most demanding barre workout so far.", why: "Playing at fret 1 is the ultimate barre test — maximum string tension, widest fret spacing. If you can play Fm clean at fret 1, every other barre position will feel easy by comparison." },
        { text: "Capo shortcut: place a capo at fret 1. Now play Em-A-G-D — familiar open chords that sound like Fm-Bb-Ab-Eb. This is how many players actually perform this song. Play through the progression at 75 BPM with the capo.", why: "The capo approach lets you enjoy playing the song NOW while your barre strength develops. It also proves the 'moveable nut' concept — the capo does mechanically what your barre finger does manually." },
        { text: "Hybrid approach: capo at fret 1, but replace the open Em with a barre Em at fret 7 (which sounds like Fm). This mixes open and barre chords — a common real-world technique where you use whichever voicing sounds best.", why: "Mixing open and barre voicings is how most guitarists actually play. You don't have to commit to all-barre or all-open. Choosing the voicing that sounds best at each moment is a sign of musical maturity." },
        { text: "Focus on the feel: Island Fever is dreamy and spacious. Let each chord ring for a full bar before changing. The strum is gentler than Sol Del Sur — wider, more open, less percussive. Think surf reverb, not reggae chop.", why: "Different songs require different strum energy even when the chord shapes are similar. Island Fever's dreaminess comes from letting the chords sustain and bloom, not from rhythmic intensity." },
        { text: "Play through at 90 BPM (approaching song tempo of 97). Choose whichever approach — full barre, capo, or hybrid — lets you play the most musically. Record a full pass.", why: "Musical delivery matters more than technical purity. If the capo version sounds better because your barre at fret 1 still buzzes, use the capo. Come back to full barre as your technique develops." }
      ],
      feel: "Island Fever should feel languid and dreamy — like watching waves from a hammock. The Fm tonality is darker than Sol Del Sur's C#m, more introspective. Let the reverb in your mind fill the spaces between strums.",
      wrong: "If Fm at fret 1 is a wall of buzz, don't force it. Use the capo approach and revisit full barre Fm in a week. The fret 1 barre is genuinely the hardest position on guitar — it's graduation-level difficulty. If the song sounds rushed, slow down and let the chords breathe.",
      sarah: "Gene, Billy Changer is in your wheelhouse — dreamy, reverb-drenched, coastal. Island Fever at #35 in your top 50 is the perfect counterbalance to Sol Del Sur's energy. Where Sol Del Sur bounces, Island Fever floats. The Fm-Bb-Ab-Eb progression has a cinematic quality — it's the kind of progression Hermanos Gutiérrez might use if they played electric. No shame in using the capo for now. That barre at fret 1 is the final boss — you'll get there.",
      metronome: 75,
      recorder: true,
      levelUp: "Can play Island Fever (Fm-Bb-Ab-Eb or capo 1: Em-A-G-D) at 90 BPM with clean, sustained chords and a dreamy strum feel."
    },
    {
      id: "gs-5-8",
      time: 8,
      title: "Song Study: Just Yesterday — Surf-Pop Energy",
      type: "guitar",
      songRef: {
        title: "Just Yesterday — Sun Room",
        src: "/just-yesterday.mp3",
        note: "Surf-pop energy — E-G-A-Em at 130 BPM. Same band, completely different energy from Sol Del Sur."
      },
      what: "Sun Room's Just Yesterday shifts gears — E-G-A-Em at 130 BPM, faster and more energetic than Sol Del Sur. The E and Em are open chords, but G and A can be played as barres for fuller voicing. This song teaches you to mix open and barre chords at speed, choosing the voicing that serves the energy.",
      setup: "Guitar. Metronome at 100 BPM, target 130.",
      chordVoicings: { chords: ["E", "G", "A", "Em"] },
      tracks: [{ name: "Surf Rock 120", src: "/surf-rock-120.mp3" }, { name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Play E-G-A-Em using open chords only: open E, open G, open A, open Em. At 100 BPM, one chord per bar. These are familiar shapes from Level 1 — the challenge is the tempo, not the chords.", why: "Starting with open chords at moderate tempo establishes the song feel before introducing barre alternatives. You should be able to play this comfortably before adding complexity." },
        { text: "Now try the G as a barre chord (E-shape, fret 3) and the A as a barre chord (E-shape, fret 5). Keep E and Em as open. Play the progression: open E → barre G (fret 3) → barre A (fret 5) → open Em. Notice how the barre G and A have a thicker, fuller sound than their open versions.", why: "Barre voicings of G and A include lower bass notes that open voicings don't. The barre G has a low G on string 6 that the open G doesn't emphasize. This fullness is what Sun Room uses for their wall-of-strum sound." },
        { text: "Speed up to 120 BPM. The transitions between open and barre positions are the challenge — you're shifting hand formations rapidly. If the barre transitions are too slow, go back to all-open and increase speed gradually.", why: "Speed reveals transition weaknesses. The open-to-barre shift (E to barre G) requires going from relaxed open position to barre grip in less than a beat. This is a different motor skill than barre-to-barre transitions." },
        { text: "Full tempo: 130 BPM over the surf backing track. Downstroke-heavy strum — this is surf energy, not reggae bounce. The attack should be bright and driving, like the song is pushing forward. Record a pass.", why: "Just Yesterday's energy is surf-pop — bright, forward-moving, sun-blazing. The strum attack is different from Sol Del Sur's syncopated bounce. Learning to match strum energy to song feel is what separates competent players from musical ones." }
      ],
      feel: "Just Yesterday should feel like skateboarding downhill — momentum, wind, grinning. The tempo pushes you forward, the major key (E) is bright and open, and the energy is pure Sun Room summer. If your foot starts tapping, you're in the zone.",
      wrong: "If barre transitions kill the tempo, drop back to all-open chords at full speed. The SONG matters more than the chord voicing choice. Better to play open chords in time than barre chords late. If the strum sounds like Sol Del Sur (syncopated, bouncy), shift to straighter downstrokes — this is surf, not reggae.",
      sarah: "Gene, Just Yesterday (#34 in your top 50) is Sun Room at their most surf-pop — E-G-A-Em ripping at 130 BPM. This is the same band, same Jazzmaster, same Tubescreamer, but completely different energy than Sol Del Sur. Luke's playing proves that tone comes from the hands, not the gear. Same setup, different strum attack = different world. The verse has a driving surf energy, and there's a lead solo section that you'll tackle in later levels.",
      metronome: 100,
      recorder: true,
      levelUp: "Can play Just Yesterday (E-G-A-Em) at 130 BPM with at least two chords as barre voicings, clean transitions, and driving surf-pop strum energy."
    },
    {
      id: "gs-5-9",
      time: 8,
      title: "Song Study: Sunset Garage — Speed and Energy",
      type: "guitar",
      songRef: {
        title: "Sunset Garage — Sun Room",
        src: "/sunset-garage.mp3",
        note: "Listen to the energy — 142 BPM, all open chords, driving strum. This is Sun Room at full throttle. Match the urgency."
      },
      what: "Sun Room's Sunset Garage uses G-Em-C-D in the verse and C-D-G-Em in the chorus — all open chords, but at 142 BPM it's the fastest song in this level. Speed with clean transitions is the challenge. Your barre chord skills from Sol Del Sur prepare your hand for fast transitions — now apply that snap-and-release speed to open chord changes.",
      setup: "Guitar. Metronome at 110 BPM, target 142.",
      chordVoicings: { chords: ["G", "Em", "C", "D"] },
      tracks: [{ name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Play the verse: G-Em-C-D, each chord 2 beats (half a bar each at this tempo). At 110 BPM first. These are all open chords you know, but at speed the transitions have to be instantaneous. Use the anticipation technique: start moving your fingers DURING the last strum of each chord.", why: "At 142 BPM, you don't have time to 'think then move.' Your fingers must be pre-forming the next chord shape while the current chord is still ringing. This anticipation skill transfers to every fast song." },
        { text: "Focus on the G→Em transition — it's the fastest because you only need to lift two fingers (both drop to the A and D strings). And Em→C — middle finger stays planted on the D string as an anchor. Identify every anchor finger in this progression.", why: "Anchor fingers are the secret to fast chord changes. G→Em: ring and pinky lift, middle stays. Em→C: middle stays on D string. Finding these shortcuts is how professionals play at speed without thinking." },
        { text: "Chorus: C-D-G-Em. Same four chords, different order. Play verse into chorus: G-Em-C-D | C-D-G-Em. Feel the energy shift — the verse drives forward, the chorus opens up.", why: "The verse and chorus use identical chords in different order. The musical interest comes from the SEQUENCE, not the harmony. Chord order = emotional arc." },
        { text: "Push toward 142 BPM. Increase by 10 BPM at a time. Find your maximum clean tempo today and note it. If you can't hit 142, stop at your max and try again tomorrow. Sleep consolidation handles the last 10-15 BPM.", why: "142 BPM is genuinely fast for chord transitions. Your max clean tempo today is your baseline — speed gains come from overnight consolidation, not grinding through fatigue." }
      ],
      feel: "Sunset Garage is pure adrenaline — Sun Room at full throttle. The energy should feel barely contained. If it feels comfortable, you're not playing fast enough. Push the tempo until it's exciting.",
      wrong: "If transitions have gaps (silence between chords), you're reforming shapes from scratch. Pre-form the next chord DURING the last strum of the current one. If it falls apart above 120 BPM, that's your current ceiling — sleep on it and try again tomorrow.",
      sarah: "Gene, Sunset Garage (#28 in your top 50) is proof that you don't need barre chords to make intense music — four open chords at 142 BPM is a workout. Sun Room's Luke makes these simple shapes sound urgent through pure strumming energy. There's a lead solo section in this song that's waiting for you in later levels. For now, nail the rhythm at speed.\n\nSunset Garage is faster than you'd think — closer to 160 BPM. The signature sound is heavy left-hand muting creating a 'bop-bop-bop' staccato effect. At 1:28 there's an instrumental break with double stops sliding down the neck — that's a technique you'll explore in later levels, but listen for it now.",
      metronome: 110,
      recorder: true,
      levelUp: "Play Sunset Garage verse (G-Em-C-D) and chorus (C-D-G-Em) at 130+ BPM with clean transitions and no timing gaps."
    },

    // ─── PHASE 5: IMPROV AND CREATION ───

    {
      id: "gs-5-10",
      time: 9,
      title: "Barre Chord Improv — Build Your Own Loop",
      type: "guitar",
      what: "Pick any 3 barre chords. Any frets, any shapes. Create a loop. You now have the entire neck available — every major and minor chord in every key. The constraint is simple: all three chords must be barre chords, and the progression must loop smoothly. Find something that moves you, then loop it for 3 minutes.",
      setup: "Guitar. Drums-only backing track (key-neutral). Metronome at 90 BPM.",
      fretboard: { scale: "c#m-pentatonic", position: 1 },
      tracks: [{ name: "Drums — Reggae 85", src: "/drums-reggae-85.mp3" }, { name: "Drums — Surf 120", src: "/drums-surf-120.mp3" }],
      steps: [
        { text: "Before touching the fretboard, close your eyes and hear the kind of chord progression you want — dark and moody? Bright and uplifting? Floating and ambiguous? Don't worry about notes or positions. Just feel the MOOD. Hold that mood in your mind. Then open your eyes and start exploring.", why: "Audiating the emotional target before exploring creates a filter — your ear knows what it's looking for, so it recognizes matching chords faster. Without a target mood, exploration becomes random browsing. With one, it becomes intentional discovery. This is how songwriters work: feel first, chords second." },
        { text: "Exploration: slide an E-shape minor barre slowly up the neck, landing at random frets. Strum each chord for a few beats. Feel how the whole guitar's resonance shifts at each position — lower frets vibrate deep in the body, higher frets shimmer lighter against your chest. Listen. Which positions grab your ear AND your body? Mark 3-4 that sound good to you. Don't think about chord names — use your ear and the resonance in your ribcage.", why: "Ear-first exploration builds musical intuition. The chest resonance at each fret position is a second feedback channel — your body registers the chord's 'weight' before your conscious mind names it. Theory can tell you which chords 'should' work together, but your ear and body know which ones actually move YOU." },
        { text: "Pick 3 of your favorite positions. Try them in different orders: 1-2-3, 2-3-1, 3-1-2. One order will feel most natural — that's your loop. Play it at 90 BPM, 4 beats per chord, repeating.", why: "Chord order determines the emotional arc of a progression. The same three chords in different orders create different feelings — one order might feel like a question, another like an answer, another like a journey." },
        { text: "Try mixing E-shape and A-shape barres. If all your chords are E-shape (rooted on string 6), try replacing one with an A-shape (rooted on string 5) at a nearby fret. Hear how the different root string changes the bass character of the progression.", why: "Mixing barre shapes adds bass movement to your progression. E-shape roots are on string 6 (lower), A-shape roots on string 5 (slightly higher). The bass line created by the root notes IS a melody — make it interesting." },
        { text: "Once your loop is solid, experiment with strum patterns. Try the Sol Del Sur syncopated strum. Try straight downstrokes. Try a reggae skank. Same chords, different feel. Pick the strum that matches the mood of your progression.", why: "Strum pattern choice is the final creative decision. It transforms the same chords from surf to reggae to psych. Trying multiple patterns helps you discover which genre your progression naturally wants to be." },
        { text: "Record your final loop: 3 chords, your chosen strum pattern, 3 minutes. Let it hypnotize. This is YOUR progression — you created it from the infinite possibilities of the barre chord neck.", why: "Extended looping builds performance stamina and reveals whether your progression has lasting power. A good 3-chord loop should feel better at minute 3 than minute 1 — it should deepen, not bore." }
      ],
      feel: "This should feel like freedom — the entire neck is your playground. There's no wrong answer, only discoveries. When you land on a progression that makes you nod your head, you've found it. The loop should be hypnotic, something you could play for 10 minutes without getting tired of it.",
      wrong: "If every chord sounds random and unrelated, try keeping two chords close together on the neck (within 3 frets) and putting the third one further away. Proximity creates connection; distance creates contrast. If your loop sounds boring, add one chord from a different shape (E-shape among A-shapes, or vice versa).",
      sarah: "Gene, this is where barre chords become YOUR tool, not just a technique exercise. Every artist you love built their sound by finding chord combinations that moved them — Allah-Las found the Cmaj7-Dmaj7 float, Sun Room found C#m-B-F#, Skinshape found Gm7-C7-A7-Dm. Your loop might be the start of a song. Record it. Keep it. Come back to it.",
      metronome: 90,
      recorder: true,
      levelUp: "Created and recorded a 3-chord barre loop that sounds intentional (not random), with a matching strum pattern, sustained for 3 minutes."
    },
    {
      id: "gs-5-11",
      time: 10,
      title: "Extended Jam: Sol Del Sur Style",
      type: "guitar",
      what: "The level culmination. Play Sol Del Sur (C#m-B-F#) for 5+ minutes with the backing track. Start with the basic progression and syncopated strum from gs-5-6. Then explore: vary the strum intensity, try palm muting sections, add ghost strums, push the dynamics. Record the whole thing. This is your Sol Del Sur — not a cover, but your interpretation.",
      setup: "Guitar. Backing track: Sol Del Sur. Start at 90 BPM, settle into 100.",
      chordVoicings: { chords: ["C#m", "B", "F#"] },
      fretboard: { scale: "c#m-pentatonic", position: 1 },
      tracks: [{ name: "Sol Del Sur", src: "/sol-del-sur.mp3" }],
      steps: [
        { text: "Start clean: C#m-B-F# with the syncopated strum at 90 BPM. Let the groove establish. Play 8 bars of steady, clean rhythm. This is the foundation — nothing fancy, just locked-in time.", why: "Starting clean and steady gives you a baseline to depart from. If you start with variations, you have nothing to contrast against. The first 8 bars are your declaration: here's the groove, here's the pocket, here's home." },
        { text: "Dynamic shift: after 8 bars, drop to palm-muted ghost strums — same chords, same pattern, but barely audible. Feel the guitar body go quiet against your chest, your whole physical engagement pulling inward. Muted, percussive, all rhythm and no ring. Hold this for 8 bars. Then open up to full volume — feel the resonance flood back into the guitar body and your ribcage. The contrast is physical before it's musical.", why: "Dynamic contrast is what makes a 5-minute jam interesting. The whisper-to-roar shift creates dramatic arc without changing a single note. The physical sensation — from damped stillness to full-body resonance — is your body's experience of the dynamic arc the listener hears." },
        { text: "Rhythmic variation: try shifting the strum emphasis. Lean on the downbeats for 4 bars (driving feel), then shift to the upbeats for 4 bars (reggae bounce). Same chords, same tempo, totally different energy.", why: "Beat emphasis is the difference between surf rock and reggae. Both are your genres. Shifting between them within one jam proves your rhythmic fluency and keeps the groove alive over extended play." },
        { text: "If you're feeling adventurous, try single-note lines between chord changes — pick out notes from C#m pentatonic (C#-E-F#-G#-B) over the C#m chord. Just 2-3 notes between strums. This is the seed of lead playing over your own rhythm.", why: "Interleaving single notes with chord strums is how guitarist-singers add melody to rhythm parts. You're not soloing — you're decorating the chords with melodic fragments. Even 2 notes between chord changes adds sophistication." },
        { text: "Play for the full duration of the backing track (or 5+ minutes with metronome). Let the jam breathe. Some sections should be full-volume driving strum. Some should be whispered ghost strums. At least one section should be just you and the metronome — no backing track, naked. Record everything.", why: "Extended play is where muscle memory solidifies and musical ideas emerge spontaneously. The 5-minute duration is deliberate — short enough to maintain focus, long enough for the groove to sink into your body." }
      ],
      feel: "This should feel like a full Sun Room performance — energy builds and releases, dynamics shift, the groove is always moving but always anchored. You should lose track of time. When you finish, you should feel like you just PLAYED something, not just practiced something.",
      wrong: "If the jam sounds like a practice loop (same volume, same strum, same energy for 5 straight minutes), force yourself to change something every 8 bars. Louder, quieter, muted, open, downbeat emphasis, upbeat emphasis. The jam needs an arc — beginning, middle, climax, resolution. End on something clean and intentional — your final note should feel like a period, not an ellipsis.",
      sarah: "Gene, this is your Sol Del Sur. Luke from Sun Room would tell you the same thing he says in interviews: 'Simple is better. Find three chords, find a groove, and let the song breathe.' That Jazzmaster through the Tubescreamer at low gain — it's not a distortion sound, it's a warmth sound. The Tubescreamer is always on because it rounds the signal, adds body, makes the Deluxe Reverb sing. Three chords, one strum, five minutes. That's a set piece. That's YOUR version of Sol Del Sur. Keep this recording.",
      metronome: 90,
      recorder: true,
      levelUp: "Recorded a 5+ minute Sol Del Sur jam with dynamic contrast (at least one quiet section and one loud section), clean barre transitions throughout, and at least one rhythmic variation. Sounds like a performance, not a practice loop."
    }
  ]
};
