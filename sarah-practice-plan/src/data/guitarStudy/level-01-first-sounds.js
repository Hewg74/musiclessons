import { getPitchRange } from "../appData.js";

export const level1 = {
  level: 1,
  title: "First Sounds",
  subtitle: "Your guitar journey starts with real songs, real grooves, and real improv — from day one.",
  description:
    "Everything begins here. You'll learn the Am pentatonic shape (the mother tongue of guitar), five open chords, the constant arm motion strumming principle, and your first improvisation — all grounded in songs you already love. By the end of this level, you'll play DOPE LEMON's Dope & Smoke, improvise call-and-response over a backing track, and understand why your strumming arm never stops moving.",
  artists: "DOPE LEMON, Father John Misty, The Polarity, Yasawa Group",
  unlocks: "Rhythm & Feel (Level 2)",
  exercises: [

    // ─── BASELINE ───

    {
      id: "gs-1-1",
      time: 8,
      title: "Where Are You Right Now? — Guitar Baseline",
      type: "guitar",
      recorder: true,
      what: "Before training anything, capture an honest snapshot of where your guitar playing is today. This recording is sacred — you'll come back to it after Level 14 and hear a different person. No judgment, no warm-up, just raw truth.",
      setup: "Guitar in tune. Recorder on. No warm-up — we want the unfiltered starting point.",
      steps: [
        { text: "Play the Am pentatonic scale ascending and descending at whatever speed feels comfortable. If you don't know the shape yet, play any notes that come to mind for 30 seconds.", why: "Your current scale fluency is the most objective baseline. Whether you nail it or fumble through, this is data — the honest starting line that makes future progress feel real." },
        { text: "Strum a chord progression — Am, C, G, D — 4 strums per chord. If you don't know these chords yet, strum any chords you know. If you don't know any, strum the open strings with a steady rhythm.", why: "This captures your current chord transitions, strumming feel, and rhythmic stability. The recording will reveal things your ears miss in real-time — timing wobbles, buzzing strings, uneven dynamics." },
        { text: "Improvise freely for 60 seconds. Play anything — no rules, no right or wrong. Just make sounds on the guitar that feel good to you.", why: "Creative freedom with zero training reveals your natural musical instincts. These instincts are your foundation. In 14 levels, you'll listen back and hear how your instincts have been refined, not replaced." },
        { text: "Say out loud into the recorder: 'I'm starting guitar training on [today's date]. My comfortable tempo is roughly [X] BPM. I feel [confident/nervous/excited] about this journey.'", why: "The spoken timestamp creates an emotional anchor. Hearing your own voice state the date and your feelings makes progress viscerally real when you revisit this recording months from now." },
        { text: "Save this recording. Label it 'Guitar Baseline — Level 1 Start.' You will need it at Level 14.", why: "The comparison between this recording and your Level 14 Golden Hour Set will be one of the most satisfying moments in your guitar journey. Protect this artifact." }
      ],
      feel: "This should feel like a doctor's checkup — neutral, observational, no performance pressure. You're gathering data, not auditioning. The worse it sounds right now, the more dramatic your transformation will be.",
      wrong: "If you find yourself trying to sound impressive, start over. The baseline only works if it captures your actual starting point. Faking a better baseline robs you of the satisfaction of real progress later. If it sounds rough, that's perfect — every guitarist you admire started here. The roughness is your starting line, not your ceiling.",
      sarah: "Gene, I do this with every new student. The recording is sacred — it's proof of where you started. Months from now you'll listen back and not believe it's the same person. Trust the process. Every guitarist you love — from Pedrum Siadatian of Allah-Las to Mark Speer of Khruangbin — started somewhere humbler than this.",
      levelUp: "Completed all recordings. You have a clear, honest baseline of your current guitar ability."
    },

    // ─── AM PENTATONIC ───

    {
      id: "gs-1-2",
      time: 10,
      title: "Am Pentatonic — The Mother Tongue",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      referencePitches: getPitchRange("A2", "A4"),
      fretboard: { scale: "am-pentatonic", position: 1 },
      what: "Learn the Am pentatonic scale in open/5th position — five notes (A-C-D-E-G) that form the foundation of every genre you love. This isn't music theory homework — it's learning to speak the language that DOPE LEMON, Khruangbin, Allah-Las, and Tinariwen all share. Every guitarist in your playlist uses this shape daily.",
      setup: "Clean tone, neck pickup. Drone on A. Metronome at 60 BPM.",
      steps: [
        { text: "Start on the low E string, 5th fret — that's A. Play it, say 'A' out loud. Feel the string tension under your fingertip — the fret wire is right there, a hard ridge you can sense. Move to the 8th fret — that's C. Play it, say 'C.' Notice how the string feels slightly softer here, the fret spacing narrower. Each fret is a different physical sensation under your finger. Do this 4 times, saying each note name.", why: "Saying note names out loud while playing creates three neural pathways simultaneously — auditory, motor, and linguistic. Edwin Gordon's audiation research shows this triples retention compared to silent playing. Adding tactile awareness of each fret creates a fourth pathway — proprioceptive. Most guitarists learn shapes without names, which means they can play the pattern but can't hear it internally." },
        { text: "Continue string by string: A string has D (5th fret) and E (7th fret). D string has G (5th fret) and A (7th fret). G string has C (5th fret). B string has D (3rd fret) and E (5th fret). High E string has E (5th fret) and G (8th fret). Say every note name as you play it. Take your time — accuracy over speed.", why: "Building the shape string by string makes it manageable. By the time you reach the high E string, your fingers have traced a map across the neck. This map is the same one Mark Speer navigates every night." },
        { text: "Play the full shape ascending (low A to high A), then descending (high A back to low A). One note per metronome click at 60 BPM. No rushing. If you miss a note, don't stop — just keep the metronome pace.", why: "Playing with a metronome from day one builds rhythmic discipline that separates good players from great ones. Speed is a byproduct of accuracy, not ambition. 60 BPM feels painfully slow — that's the point." },
        { text: "Play ascending and descending 4 times in a row without a wrong note. If you hit a wrong fret, restart the count from zero. No skipping. No fudging.", why: "The '4 clean passes with reset' method is from motor learning research — it ensures the correct movement pattern is the one your brain consolidates during sleep. One sloppy pass can undo three clean ones. If you're nailing every rep perfectly, increase the BPM — it's too easy. If you're failing more than 2 out of 10, slow down. The optimal learning zone is around 80% success — challenging enough to grow, achievable enough to build confidence." },
        { text: "Close your eyes and play it once, ascending and descending. Feel each note under your fingertip — the string tension changes as you move between frets, each position a different physical sensation. If you can navigate the shape by touch alone, it's in your fingers, not just your memory.", why: "Eyes-closed playing proves your hands have mapped the fretboard spatially. This is how scales become second nature — your fingers know the distances between frets the way your feet know the stairs in your house. The tactile map — string tension, fret spacing, finger stretch — becomes your navigation system." }
      ],
      feel: "The pentatonic should feel like a home base — a safe zone where every note sounds good against the drone. There are no wrong notes here. It should feel like a musical playground where everything works. When you hear the notes ring against the drone, you'll feel a warm resonance that tells you you're in the right place.",
      wrong: "If your fingers keep landing on wrong frets, slow down further and go note by note — wrong frets mean you're learning where the right frets AREN'T, which is useful data, not failure. If notes buzz or sound dead, press closer to the fret wire (not on top of it, just behind it). If it sounds 'off' against the drone, check your tuning — open strings should be E-A-D-G-B-E from low to high.",
      sarah: "Gene, this is the shape that unlocks YOUR music — every surf lick, every desert melody, every reggae fill you'll play starts here. This scale is your musical mother tongue. Every single guitarist you love uses this shape constantly — Pedrum Siadatian of Allah-Las plays psych-surf leads in this shape, Mark Speer of Khruangbin builds entire songs from it, Angus Stone of DOPE LEMON noodles in it between chords. Learn it once, use it forever. It's the skeleton key to your entire playlist.",
      metronome: 60,
      levelUp: "Play Am pentatonic ascending and descending 4 times at 60 BPM with zero wrong notes. Bonus: eyes closed. You can name every note (A-C-D-E-G) as you play it."
    },

    // ─── OPEN CHORDS ───

    {
      id: "gs-1-3",
      time: 10,
      title: "Open Chords — Am, C, G, D, Em",
      type: "guitar",
      chordVoicings: { chords: ["Am", "C", "G", "D", "Em"] },
      what: "Five open chord shapes that form the backbone of thousands of songs — including four you'll learn in this level. Each chord is a group of notes played simultaneously. You'll learn finger positions, which strings to strum, and the anchor finger concept that makes switching between chords feel effortless.",
      setup: "Guitar in tune. No metronome yet — focus on clean shapes first.",
      steps: [
        { text: "Am: index finger on B string fret 1, middle finger on D string fret 2, ring finger on G string fret 2. Strum strings 5 through 1 (skip the low E). Strum slowly and listen — every string should ring clearly. If any string buzzes or sounds dead, adjust that finger's position.", why: "Am is your home chord — the same key as your pentatonic scale. Starting here means your scale and your first chord live in the same musical neighborhood. A clean Am is the foundation for half of your favorite songs." },
        { text: "C: index on B string fret 1, middle on D string fret 2, ring on A string fret 3. Strum strings 5 through 1. Now look at your hand — notice that your index finger is STILL on B string fret 1, and your middle finger is STILL on D string fret 2? Those are your anchor fingers. When switching Am to C, the index and middle fingers stay planted. Only the ring finger moves (from G string fret 2 to A string fret 3).", why: "The anchor finger concept is the single biggest shortcut for chord transitions. Instead of lifting all fingers and rebuilding the shape from scratch, you keep fingers planted and the others reorganize around them. Am→C shares the index (B1) and middle (D2) fingers. This turns a three-finger move into a one-finger move." },
        { text: "G: middle finger on A string fret 2, index on low E string fret 2 (some people reverse these), ring finger on high E string fret 3. Strum all 6 strings. This is a big, open, resonant chord — let it ring.", why: "G major is the most resonant open chord on the guitar — all six strings ring. It's the key of Real Love Baby by Father John Misty and the landing chord of Dope & Smoke by DOPE LEMON. When you strum this chord and hear all six strings vibrate, that's the sound of a thousand songs." },
        { text: "D: index on G string fret 2, ring on B string fret 3, middle on high E string fret 2. Strum ONLY strings 4 through 1 — the D string is your bass note. The low E and A strings are muted or skipped.", why: "D is a smaller chord — only four strings. Learning to aim your strum at just the top four strings builds precision. The Am-D progression in Dope & Smoke uses this chord — later you'll add Am7 and D7 variations." },
        { text: "Em: middle finger on A string fret 2, ring finger on D string fret 2. That's it — just two fingers. Strum all 6 strings. This is the easiest chord shape and one of the most beautiful. Listen to how open and melancholy it sounds.", why: "Em is the gateway drug of guitar chords — two fingers, six strings, maximum payoff. It appears in Real Love Baby (D-Em-G-A7), Pattymanajaro (Am-G-C-Em), and hundreds of other songs in your playlist. Its minor quality gives it that golden-hour melancholy you love." }
      ],
      feel: "Each chord should ring out clearly — no buzzing, no dead strings, no muffled notes. When you strum and every string sings, there's a physical warmth that vibrates through the guitar body into your chest. That's the feeling you're chasing.",
      wrong: "The most common mistake is pressing too far from the fret wire — your fingertip should be just behind the metal fret, not in the middle of the space between frets. If a string buzzes, move your finger closer to the fret. If a string is muted, check that another finger isn't accidentally touching it. Curl your fingers so the fingertips press straight down, not flat across neighboring strings. Buzzing strings are your hand LEARNING the geography of the fretboard — every buzz tells you exactly what to adjust.",
      sarah: "Gene, these five chords unlock your entire Level 1 song list. DOPE LEMON's Dope & Smoke is Am-D (with Am7 and D7 variations). Father John Misty's Real Love Baby is D-Em-G-A7. The Polarity's Son of a Beach is F-G-C-Am (you'll get F later — for now, substitute Am and it still sounds great). Yasawa Group's Pattymanajaro is Am-G-C-Em. Five shapes, four songs, zero barre chords needed.",
      levelUp: "All five chords (Am, C, G, D, Em) ring cleanly with no buzzing strings. You can form each shape from scratch in under 3 seconds."
    },

    // ─── ONE-MINUTE CHANGES ───

    {
      id: "gs-1-4",
      time: 8,
      title: "One-Minute Changes — Building Chord Transitions",
      type: "guitar",
      chordVoicings: { chords: ["Am", "C", "G", "D", "Em"] },
      what: "The fastest way to make chord transitions feel automatic. Set a timer for 60 seconds, pick two chords, and switch back and forth as many times as possible. Count your changes. Write it down. Beat your count tomorrow. This is the drill that took Justin Guitar's students from 8 changes per minute to 60+ in weeks.",
      setup: "Guitar. Timer (phone works). No metronome — go at your own pace, as fast as accuracy allows.",
      steps: [
        { text: "Start with Am → C. Set a 60-second timer. Switch back and forth as many times as you can — Am, C, Am, C. Count each successful change. Don't worry about strumming yet — just land the chord shape cleanly. Write your count down.", why: "Am→C is the easiest transition because two anchor fingers stay planted (index on B1 and middle on D2). Starting with the easiest pair builds confidence and teaches the drill format before harder pairs." },
        { text: "Now try Am → Em. 60 seconds. Count. Both chords use the 2nd fret on adjacent strings, so the hand position stays similar. Am has three fingers down, Em has two — the shapes overlap in feel even though the specific fingers move.", why: "Discovering that chord pairs share fingers is the 'aha' moment. Once you see transitions as partial moves instead of full rebuilds, every chord change speeds up." },
        { text: "Now the harder one: G → D. 60 seconds. Count. This requires a full hand reshape — no shared fingers. It will be slower. That's expected. Write your count next to the others.", why: "The G→D transition reveals where you actually are — it has no anchor finger shortcut. Your count here is your honest transition speed. Under 10 changes means this pair needs daily practice. Over 30 means it's becoming automatic." },
        { text: "Try C → G and D → Em. 60 seconds each. Write every count down. Circle the pair with the lowest count — that's your daily homework until it catches up with the others.", why: "Identifying your weakest link and drilling it specifically is how deliberate practice works. Random practice feels productive but targeted practice gets results. Your lowest-count pair gets priority." },
        { text: "Do one final round of your weakest pair. Try to beat your first score by even 1 change. If you do, your brain is already consolidating the movement pattern.", why: "Immediate retry after a baseline establishes the improvement trajectory. Even gaining 1-2 changes in 5 minutes proves the drill works. If you can't beat your score after 10 minutes, stop and try tomorrow — sleep consolidation will do the rest." }
      ],
      feel: "This should feel like a competitive game against yourself — you're trying to beat your own high score. The excitement of watching your count climb over days is genuinely addictive. When a pair hits 30+ changes per minute, the transition feels invisible. Don't finish one exercise completely before starting the next. Practice in rotating sets of 3-5 exercises — play through exercises 1, 2, and 3 for one round, then cycle back. This 'interleaved practice' feels harder in the moment but builds stronger long-term retention than grinding one exercise until it's perfect. End each session on a pair you nailed — finish with confidence, even if it's the easiest pair. The last rep is the one your body carries into sleep.",
      wrong: "If you're landing chords with buzzing strings just to boost your count, you're cheating. Every change must be clean — all strings ringing. Sloppy fast transitions teach sloppy habits that are harder to unlearn than slow ones. Also: if your wrist or hand aches, stop immediately. Pain means tension, not weakness.",
      sarah: "Gene, this drill is boring and magical at the same time. It's boring because it's just two chords back and forth. It's magical because the results are undeniable — you'll feel the transitions getting smoother day by day. The Am-D progression in DOPE LEMON's Dope & Smoke will go from clunky to buttery in about two weeks of daily one-minute changes. Trust the grind.",
      levelUp: "Am→C: 30+ changes per minute. Am→Em: 30+ changes per minute. At least 3 of 5 chord pairs above 20 changes per minute."
    },

    // ─── CONSTANT ARM MOTION ───

    {
      id: "gs-1-5",
      time: 10,
      title: "Constant Arm Motion — The #1 Strumming Secret",
      type: "guitar",
      metronome: 70,
      what: "This is the single most important strumming concept you will ever learn. Your strumming arm swings like a pendulum on every eighth note — down on downbeats, up on upbeats. The arm NEVER STOPS. A strumming 'pattern' isn't about which direction you strum — it's about which swings actually HIT the strings and which swings MISS. Rests mean the arm keeps swinging but lifts slightly away from the strings.",
      setup: "Guitar. Metronome at 70 BPM. Strum Am — one chord for this entire exercise.",
      steps: [
        { text: "Set metronome to 70 BPM. Strum Am with ALL downstrokes on every click — just down, down, down, down. Your arm goes down on each beat, then lifts back up silently to reset. This is NOT constant arm motion yet — this is the mechanical starting point you're about to upgrade.", why: "Starting with isolated downstrokes establishes the baseline: most beginners strum like this — stop, lift, stop, lift. It works, but it sounds rigid and robotic. You're about to discover why." },
        { text: "Now keep your arm swinging in BOTH directions on every eighth note: down-up-down-up-down-up-down-up. Every swing hits the strings. Feel the pendulum — the rhythm lives in your forearm, not just your hand. Your entire arm is a metronome within the metronome, and the guitar body vibrates against your chest with each strum. The arm never pauses, never hesitates.", why: "This is the fundamental shift. Your arm is now a constant engine, and the guitar is just something in its path. This continuous motion is what gives strumming its groove — the arm provides the rhythmic framework, not the hand deciding when to move. The chest vibration from each strum is a whole-body feedback loop." },
        { text: "Here's the magic: keep the arm swinging in that same constant down-up pattern, but on the UPSTROKES of beats 2 and 4, lift your hand slightly so it MISSES the strings. The arm still swings up — it just doesn't make contact. You've just created a pattern: D-DU-D-DU.", why: "THIS is constant arm motion. The arm never stops — it swings on every eighth note like clockwork. The 'pattern' is simply which swings connect and which ones miss. Your arm is the engine, and you're steering which beats make sound. This is how every professional guitarist strums." },
        { text: "Try another pattern: miss the downstroke on beat 3. Your arm still swings down on beat 3, but it passes over the strings silently. The rhythm changes, but the arm motion stays identical. Same engine, different pattern.", why: "When you realize that EVERY strum pattern is just the same constant arm motion with different 'misses,' the entire world of rhythm opens up. You'll never have to learn a new arm movement for a new song — just learn which swings to skip." },
        { text: "Vocalize the pattern before playing: say 'DOWN-down-UP-DOWN-down-UP' out loud while your arm swings. Then add the guitar back. If the vocal and the strum match, you've internalized the pattern.", why: "Vocalizing strum patterns is how session musicians learn new rhythms in seconds. The voice locks the pattern into memory faster than the hand alone. If you can say it, you can play it." }
      ],
      feel: "Your arm should feel like a pendulum on a clock — smooth, continuous, effortless. The motion is in the forearm and wrist, not the whole arm. When the pattern clicks, strumming stops feeling like a series of individual decisions and starts feeling like a flowing river with rocks (the misses) creating the texture.",
      wrong: "The number one mistake is stopping the arm between strums. If your arm pauses at the top or bottom of any swing, the groove dies. Think of it this way: a windshield wiper doesn't stop between sweeps. Your arm is that wiper. If the pattern sounds choppy and robotic, your arm is stopping — that's not a flaw in you, it's your arm unlearning the start-stop habit. Keep at it. Also: if your pick keeps flying out of your hand, you're gripping too tight. Hold the pick like you'd hold an egg — firm enough not to drop, loose enough not to crack.",
      sarah: "Gene, THIS is the difference between sounding like a beginner and sounding like Angus Stone from DOPE LEMON strumming Am-D on Dope & Smoke. He's not thinking about which direction to strum — his arm is a constant pendulum, and the pattern happens by which swings connect. Once this clicks, every song in your playlist becomes learnable because every strum pattern is the same arm motion with different skips.",
      levelUp: "Can maintain constant arm motion (continuous down-up swing) through a full 4-bar cycle at 70 BPM while deliberately missing specific upstrokes to create a D-DU-D-DU pattern. The arm never stops between any two strums."
    },

    // ─── MUTED RHYTHM ───

    {
      id: "gs-1-6",
      time: 6,
      title: "Rhythm Before Notes — Muted String Percussion",
      type: "guitar",
      metronome: 80,
      tracks: [{ name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      what: "Press your fretting hand lightly across all strings — don't fret any notes, just mute everything. Now strum with constant arm motion. The guitar becomes a percussion instrument. This isolates rhythm from pitch entirely, letting you focus 100% on groove, dynamics, and timing without worrying about chord shapes.",
      setup: "Guitar. Fretting hand lightly across all strings (muted). Metronome at 80 BPM. Optional drums backing track.",
      steps: [
        { text: "Lay your fretting hand flat across all six strings around the 7th fret — light pressure, enough to mute but not enough to fret any notes. Strum with constant arm motion, all swings hitting the strings. You should hear a chunky, percussive 'chick-chick-chick-chick' with no pitched notes.", why: "Muted strumming isolates the rhythmic element of guitar playing. With no pitch information, your ear focuses entirely on groove, timing, and dynamics. This is the same principle as body percussion in Dalcroze eurhythmics — rhythm through the body first." },
        { text: "With the muted strings, practice the D-DU-D-DU pattern from the previous exercise. The muted sound makes it easier to hear whether your misses are clean — a miss should be completely silent, not a half-hit.", why: "Muted strings amplify rhythmic accuracy because every imperfection is obvious. A sloppy 'miss' on an open chord might go unnoticed, but on muted strings, you'll hear the difference between a clean skip and a brushed string." },
        { text: "Try accenting beats 2 and 4 — strum harder on those beats, softer on 1 and 3. This is the backbeat, the foundation of reggae, soul, funk, and rock. Feel how the groove shifts when the emphasis moves off the downbeat.", why: "Backbeat accenting is the rhythmic backbone of every genre in Gene's playlist. Reggae lives on the offbeat. Soul lives on 2 and 4. Even psych-rock has the backbeat underneath. Learning to accent on muted strings means the dynamic skill transfers directly to real chords." },
        { text: "Start the drums backing track. Mute strum along with it — try to lock your strumming arm to the drum groove. When your muted strums and the drums feel like one instrument, you've found the pocket.", why: "Playing with a drum track teaches you to listen and react, not just follow a click. The pocket — that magical feeling of being perfectly locked with the rhythm section — is the difference between playing guitar and playing music." },
        { text: "Strum the muted strings for 2 full minutes without stopping, varying your dynamics (loud, quiet, medium) and accent placement. Keep constant arm motion the entire time. When 2 minutes feels effortless, the motion is becoming automatic.", why: "Two uninterrupted minutes of constant arm motion builds the muscle memory that makes strumming unconscious. Once the arm motion is automatic, your brain is freed up to think about chords, melody, and feel — which is where the real music lives." }
      ],
      feel: "This should feel like drumming on a guitar. Your fretting hand is doing nothing musical — it's just a mute. All the music comes from your strumming arm's rhythm and dynamics. When the chunky, percussive groove locks with the backing track, it feels like you're part of a band even though you're playing no notes.",
      wrong: "If you hear pitched notes ringing through, your fretting hand is pressing too hard — lighten up until everything is fully muted. If your arm starts stopping between strums, go back to the pendulum exercise. If the dynamics all sound the same (no difference between accented and unaccented strums), exaggerate — make the loud strums LOUD and the soft strums barely a whisper.",
      sarah: "Gene, this exercise is inspired by how reggae musicians learn — muted percussion first, then add chords. The Elovaters, Pepper, The Hip Abduction — all those reggae-rock bands in your playlist started with this same percussive foundation. When you can groove on muted strings, adding chords is just the icing.",
      levelUp: "Can maintain muted-string constant arm motion for 2 minutes straight with clear dynamic accents on beats 2 and 4. Arm never stops."
    },

    // ─── ONE-NOTE GROOVE ───

    {
      id: "gs-1-7",
      time: 8,
      title: "One-Note Groove — All Rhythm, No Melody",
      type: "guitar",
      metronome: 80,
      drone: { root: "A", octave: 2, texture: "analog" },
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }, { name: "Drums Only — Soul/Funk 90", src: "/drums-soul-funk-90.mp3" }],
      recorder: true,
      what: "Play ONLY the open A string. Nothing else. Vary everything EXCEPT the note — rhythm, dynamics, palm muting, letting it ring, dead stops. One note with infinite rhythmic variations. This exercise proves that groove lives in rhythm, not in note choice. Constraint-based improv from day one.",
      setup: "Guitar. Drone on A. Metronome at 80 BPM. Optional backing track.",
      steps: [
        { text: "Pick the open A string in steady quarter notes — one per metronome click. Let each note ring until the next one. Listen to how it locks with the drone, and feel the guitar body buzz against your chest — that low A vibrates through the wood into your ribcage. This is your home base — one note, steady pulse, zero decisions, maximum resonance.", why: "Starting with the simplest possible musical act — one note, steady rhythm — strips away all complexity. The chest vibration from the open A is your body's way of confirming you're in tune with the drone. From here, every variation you add is a conscious creative choice, not a scramble for notes." },
        { text: "Now vary the rhythm: play the A string as eighth notes (two per click), then dotted rhythms (long-short, long-short), then syncopated hits between the beats. The note never changes — only when you hit it.", why: "One pitch with varied rhythm proves that groove doesn't need melody. Think of a kick drum — it's one note, and it drives the entire song. Your A string is a kick drum right now." },
        { text: "Add dynamics: play some hits hard (accent), some barely audible (ghost notes). Try accenting beats 2 and 4 while ghosting 1 and 3. Then reverse. Feel how the same rhythm transforms when the accents move.", why: "Ghost notes and accents are how pro musicians create groove out of simple parts. A flat, even rhythm is mechanical. A rhythm with dynamics breathes and grooves. This is the secret ingredient in every Khruangbin bass line." },
        { text: "Add palm muting: rest the edge of your picking hand lightly on the strings near the bridge. The A string becomes a thuddy, percussive thump instead of an open ring — feel how the vibration against your chest changes from a warm buzz to a tight pulse. Alternate: 2 muted hits, 2 open hits. Feel the contrast in your body: tight (muted, chest goes quiet) and open (ringing, chest buzzes deep).", why: "Palm muting adds a timbral dimension — now you have THREE variables on one note: rhythm, dynamics, and tone (muted vs. open). Three variables on one note is more creative freedom than most beginners ever discover. The body-level feedback — feeling the resonance change in your chest — is a faster signal than listening alone." },
        { text: "2-minute freestyle on the A string only: combine rhythm, dynamics, and palm muting in any way that grooves. Play along with the backing track. Record it. When you listen back, notice the moments that made you nod your head — that's the groove.", why: "Extended single-note improvisation builds the rhythmic vocabulary that will power everything you play. When you eventually add more notes, this rhythmic confidence will already be there. The constraint IS the creative engine." }
      ],
      feel: "This should feel like being a bass player locked into a groove — one note, all pocket. When the rhythm clicks with the backing track and your head starts nodding involuntarily, you've found it. The note A should feel like bedrock — heavy, stable, unmovable.",
      wrong: "If you catch yourself moving to other strings or frets, come back to A. The constraint IS the exercise. If everything sounds flat and ungroovy, you're not varying dynamics enough — make the loud hits loud enough to rattle the guitar and the ghost notes barely audible. If the rhythm feels stiff, loosen your wrist and let the pick bounce naturally off the string.",
      sarah: "Gene, Khruangbin's bass player Laura Lee does exactly this — she'll ride one note for 16 bars and make it groove harder than most guitarists playing full chords. Tommy Guerrero builds entire instrumentals on single-note bass grooves with just rhythm and dynamics. You're learning their language — one note, all feel, pure groove.",
      levelUp: "Can play a 2-minute groove on the open A string that includes rhythmic variation, dynamic accents, ghost notes, and palm muting — and it sounds musical, not mechanical."
    },

    // ─── BLUES SCALE ───

    {
      id: "gs-1-8",
      time: 8,
      title: "The Blues Scale — Adding the Blue Note",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      fretboard: { scale: "am-pentatonic", position: 1 },
      referencePitches: getPitchRange("A2", "A4"),
      metronome: 60,
      what: "You already know Am pentatonic (A-C-D-E-G). Now add ONE note — Eb (the flat 5th, 'blue note') — and the entire scale transforms from pleasant to soulful. The blue note creates tension, grit, and that unmistakable blues ache. It sits between D and E on every string, and it WANTS to resolve — it's the musical equivalent of a sigh.",
      setup: "Guitar. Drone on A. Metronome at 60 BPM. Fretboard diagram for reference.",
      steps: [
        { text: "Play your Am pentatonic ascending. Now stop on the D (A string, 5th fret → D string, 5th fret zone). Between D and E, there's a note hiding at the 6th fret of the A string — that's Eb, the blue note. Play D, then Eb, then E. Hear the chromatic climb: stable → tense → resolved.", why: "The blue note is the one note that DOESN'T belong in the pentatonic scale — and that's exactly what makes it powerful. It creates tension that the ear WANTS resolved. Every blues, rock, and soul guitarist uses this note as an emotional weapon." },
        { text: "Play the full blues scale ascending: A (5th fret low E) → C → D → Eb → E → G → A. The Eb appears once on each octave. Say 'blue' when you hit it. Descending: A → G → E → Eb → D → C → A.", why: "Naming the blue note as you play it trains your ear to recognize its unique tension. The blue note isn't just another fret — it's a mood shift. Saying 'blue' creates a mental flag that your ear will eventually hear automatically." },
        { text: "Improvise using ONLY D, Eb, and E — three adjacent notes with the blue note in the middle. Play them in any order, any rhythm. Try bending from D up toward Eb (a subtle quarter-tone bend). Feel the tension of the blue note and how it pulls toward resolution on either side.", why: "Isolating the blue note with its neighbors lets you feel its gravitational pull. It wants to go up to E or down to D. That pull IS the blues. Bending into it rather than fretting it cleanly adds the vocal quality that makes blues guitar sound like it's singing." },
        { text: "Play the full blues scale over the drone. Spend extra time on the blue note — linger on it, bend into it, let it ache. Then resolve to E or D. The longer you hold the tension, the sweeter the resolution.", why: "Learning to sit in tension and delay resolution is one of the most powerful musical skills. Every great guitarist — B.B. King, Mark Speer, Ali Farka Touré — knows that the magic is in the moment BEFORE the resolution, not the resolution itself." },
        { text: "Play the blues scale ascending and descending 4 clean times at 60 BPM. Include the blue note (Eb) on every pass. When it's automatic, try it at 70 BPM.", why: "Making the blues scale as automatic as the pentatonic gives you two scales in the same position. The pentatonic is 'safe' — every note sounds good. The blues scale adds one note of tension. Now you have a choice: play safe or play with fire." }
      ],
      feel: "The blue note should feel like a thorn in silk — one sharp point of tension against the smooth pentatonic. When you linger on it, it aches. When you resolve to E, it sighs with relief. That ache-and-release cycle IS the blues, and it's the emotional engine of half the music you love.",
      wrong: "If the blue note sounds just like any other note to you, you're moving through it too fast. STOP on Eb and hold it against the drone for 4 beats. Feel the friction, the slight dissonance. It should sound 'wrong' in a way that feels right — that's the blue note's magic. If you're losing the pentatonic shape trying to add Eb, go back and drill the pentatonic alone first.",
      sarah: "Gene, the blue note is what separates the pentatonic from the blues — and the blues runs through everything you love. Skinshape's guitar leads bend into the blue note constantly. DOPE LEMON's laid-back solos linger on it. Even Tinariwen's desert blues uses a similar 'tension note' that sits between the stable scale tones. This one added note transforms your vocabulary from 'nice' to 'soulful.'",
      levelUp: "Play the Am blues scale (A-C-D-Eb-E-G-A) ascending and descending 4 times cleanly at 60 BPM. Can identify the blue note by ear when you hear it. Retrieval check: set the guitar down for 60 seconds, then play the blues scale from memory without looking at the diagram."
    },

    // ─── BENDING & EXPRESSION ───

    {
      id: "gs-1-9",
      time: 6,
      title: "Bending & Vibrato — Making the Guitar Sing",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      fretboard: { scale: "am-pentatonic", position: 1 },
      metronome: 60,
      what: "Notes on a guitar don't have to be fixed pitches — you can bend strings to slide between notes, and add vibrato to make held notes shimmer. These two techniques are what make the guitar sound like a human voice. You'll learn half-step bends (one fret up) and basic vibrato using the Am pentatonic.",
      setup: "Guitar. Drone on A. Clean or slightly overdriven tone.",
      steps: [
        { text: "Place your ring finger on the B string, 8th fret (G note). Feel the string pressing into your fingertip — that pressure is a conversation between you and the instrument. Now push the string upward (toward the ceiling) while keeping pressure on the fret. Feel the resistance build in your fingertip as the string stretches, the tension climbing through your hand into your forearm. The pitch should rise. Push until it sounds like the note at the 9th fret (Ab). Use your middle and index fingers behind the ring finger for support — all three fingers push together.", why: "Supporting fingers behind the bending finger is the #1 technique tip. One finger alone doesn't have enough strength or control. Three fingers working together give you power and pitch accuracy. The physical sensation of string tension climbing through your hand is your body's pitch gauge — you'll eventually feel the correct bend distance before you hear it." },
        { text: "Play the target note first: press the 9th fret normally and hear Ab. Now go back to the 8th fret and bend up to match that pitch. Did you hit it? Most beginners under-bend — they stop halfway. Over-bend first (push too far), then calibrate down until the pitches match.", why: "Training your ear to recognize the target pitch BEFORE bending to it is essential. Without a target, bends are just random pitch wobbles. The 'play target first, then bend to match' method is how blues guitarists train pitch accuracy." },
        { text: "Now try vibrato: fret the B string at the 8th fret. Instead of bending and holding, rapidly alternate between the natural note and a tiny bend — a controlled wobble of pitch. It should sound like a singer's vibrato, not a trembling earthquake.", why: "Vibrato is what makes a held note come alive instead of just sitting there flat and dead. It's the vocal quality of the guitar. Every guitarist you love uses vibrato — Mark Speer's slow, wide vibrato is a signature of Khruangbin's sound." },
        { text: "Apply vibrato to different notes in the Am pentatonic: try it on the D string 7th fret (E), the G string 5th fret (C), the B string 5th fret (E). Not every string bends the same way — the thicker strings require more force, the thinner strings need a lighter touch.", why: "Vibrato feels different on every string and at every fret position. Learning this variation now means your vibrato will be musical (matching the string's response) rather than mechanical (same motion regardless of context)." },
        { text: "End with a 'vocal phrase': play 3-4 notes from the pentatonic, bend the last note up a half step, and add vibrato while holding the bend. This is how guitarists make the instrument sing — a phrase ending with a bent, vibrating note sounds like a voice trailing off.", why: "Combining pentatonic notes with bending and vibrato transforms scale practice into musical expression. You're no longer playing notes — you're making the guitar talk. This is the technique behind every emotional guitar solo you've ever loved." }
      ],
      feel: "Bending should feel like stretching a rubber band — controlled resistance with a clear target. Vibrato should feel like gently shaking water off your fingertip — a subtle, controlled oscillation. When both techniques work together, the guitar stops sounding like a series of fixed pitches and starts sounding like a human voice.",
      wrong: "If your bends sound wimpy or don't reach the target pitch, you're not using supporting fingers — press with ring, middle, AND index fingers together. If your vibrato sounds like a frightened wobble, slow it down and make each oscillation wider and more deliberate. Speed comes later; control comes first. If bending hurts your fingertips, you're pressing too hard into the fretboard — the motion is sideways (pushing the string), not downward.",
      sarah: "Gene, bending and vibrato are what separate a guitarist who plays notes from a guitarist who speaks through the instrument. Listen to how Mark Speer from Khruangbin bends into notes — it's slow, deliberate, and dripping with emotion. He doesn't just land on a note; he arrives at it like a conversation trailing to a thoughtful pause. Angus Stone from DOPE LEMON uses lazy, behind-the-beat bends that sound like a yawn in the afternoon sun. Your bends will develop their own personality over time.",
      levelUp: "Can execute a clean half-step bend on the B string (8th fret to 9th fret pitch) with supporting fingers, hitting the target pitch accurately. Can add basic vibrato to a held note that sounds controlled, not shaky."
    },

    // ─── SONG STUDY: DOPE LEMON ───

    {
      id: "gs-1-10",
      time: 10,
      title: "Song Study: Dope & Smoke — DOPE LEMON",
      type: "guitar",
      metronome: 90,
      chordVoicings: { chords: ["Am", "D", "Am7", "D7"], defaultChord: "Am" },
      songRef: {
        title: "Dope & Smoke — DOPE LEMON",
        src: "/dope-and-smoke.mp3",
        note: "Listen to the lazy strum feel — it's just Am and D alternating with Am7 and D7 creeping in. No G chord. Two chord families, maximum vibe."
      },
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      what: "Your first complete song. DOPE LEMON's Dope & Smoke alternates between two chord families — Am/Am7 and D/D7 — at ~94 BPM with a mellow, behind-the-beat strumming feel. It's a two-chord song. The magic is in the lazy feel and the subtle shift from plain Am to Am7, plain D to D7. Hit play above and listen twice before touching the guitar — first time, just absorb the vibe. Second time, let your fretting hand ghost the chord changes without pressing the strings. Your motor system rehearses during focused listening.",
      setup: "Guitar. Metronome at 90 BPM (slow it down — original is ~94 BPM). Dark-warm tone: roll your tone knob back halfway, add reverb (spring or plate) generously. The guitar sound is clean but saturated, like it was recorded to tape. Listen to the song reference first.",
      steps: [
        { text: "Play the core loop: Am (4 beats) → D (4 beats), repeating. Just these two chords, back and forth. Use all downstrokes first, one per beat. Focus ONLY on clean transitions between Am and D.", why: "Dope & Smoke is built on Am-D alternation — that's it. There's no G chord. Separating chord changes from strumming pattern is the 'one focal point' principle. Master the Am-D switch first." },
        { text: "Once Am-D is smooth, add the 7th variations: Am7 — lift your index finger off the B string 1st fret so the open B rings. D7 — move your index finger from G string 2nd fret to high E string 1st fret. Alternate Am-D for 4 bars, then Am7-D7 for 4 bars. Feel the warmth the 7ths add.", why: "Am7 and D7 add harmonic color without adding new chord shapes — one finger moves in each case. The 7th creates a warmer, hazier quality that IS the DOPE LEMON sound." },
        { text: "Add constant arm motion: down-up-down-up on eighth notes. Hit all strums first — no pattern. Feel how the continuous motion smooths out the Am-D transitions.", why: "Constant arm motion HELPS chord transitions because momentum carries your hand. Isolated downstrokes make each transition a separate event. Continuous motion makes transitions happen inside a flow." },
        { text: "Shape the strum pattern: the core groove is 'Down...(mute-mute)...Up-Down-Up' — a downstroke, two left-hand muted scratches (your fretting hand relaxes to deaden the strings while your arm keeps swinging), then Up-Down-Up to finish the bar. The accents fall on beats 2 and 4 with rhythmic scratches filling the gaps. Mix Am and Am7 freely — switch whenever it feels right. Same with D and D7. Listen to the song and match the feel.", why: "This strum pattern — with the muted scratches between chord strikes — is what gives Dope & Smoke its percussive, breathing quality. The scratches are NOT silence; they're rhythmic texture. Your right hand never stops moving, and your left hand controls whether the strings ring or choke." },
        { text: "Play for 8 full cycles at 90 BPM. No stopping. If you miss a change, keep strumming and catch the next one. Then try the original tempo (~94 BPM). If you can't get past 100 today, stop and try tomorrow — your brain consolidates overnight.", why: "Playing through mistakes is a critical skill. Speed increases should feel like graduating, not struggling. Sleep consolidation is real — 10-13% improvement happens overnight." }
      ],
      feel: "This should feel lazy and warm — like strumming on a porch at sunset with nowhere to be. DOPE LEMON's sound is the opposite of urgent. The groove should sit slightly behind the beat, like dragging your feet through warm sand. If it feels rushed, slow down.",
      wrong: "If the chord transitions interrupt the strum, let the transition be slightly messy — a brief muted moment between chords is natural and adds groove. If the 7th chords sound clunky, start with plain Am-D and add 7ths after the basic loop is solid. Don't force them.",
      sarah: "Gene, Dope & Smoke is your #2 most-played track. Angus Stone plays simple chords with a feel that sounds like he just woke up from a nap — that's intentional behind-the-beat placement. The whole song is Am and D with 7th variations drifting in and out. Two chord families, zero flash, all feel. Listen closely and you'll hear a signature move: a rhythmic slide from the 4th fret into the 5th fret Am barre chord shape on the downbeat, followed by a staccato chop. That slide-and-chop is a preview of barre chord technique you'll build in Level 5. The guitar is highly staccato throughout — chords are squeezed briefly then released so the left hand deadens the strings, creating percussive 'chucks' between the ringing notes. The drenched reverb makes each chopped chord trail off into space. His major→minor trick (D-Dm, G-Gm) appears in other DOPE LEMON songs — you'll explore that in Level 12. For now, just Am-D-Am7-D7 with that sleepy, reverb-drenched vibe. The guitar in Dope & Smoke is a hypnotic, constant drone underneath the vocal — it never drops out, never changes. Angus Stone's voice floats above the choppy, percussive guitar bed. When you eventually sing over this, the guitar stays exactly the same. The voice is free BECAUSE the guitar is locked.",
      levelUp: "Play the Am-D / Am7-D7 progression (Dope & Smoke) with constant arm strum at 100+ BPM for 8 cycles without stopping. 7th variations appear naturally, not forced."
    },

    // ─── SONG STUDY: SON OF A BEACH / REAL LOVE BABY ───

    {
      id: "gs-1-11",
      time: 10,
      title: "Song Study: Real Love Baby — Father John Misty (D-Em-G-A7)",
      type: "guitar",
      metronome: 80,
      chordVoicings: { chords: ["D", "Em", "G", "A7"], defaultChord: "D" },
      songRef: {
        title: "Real Love Baby — Father John Misty",
        src: "/real-love-baby.mp3",
        note: "Listen to the D-Em-G progression with the hammer-on embellishments on D. Upbeat, sunny energy — contrast with Dope & Smoke."
      },
      what: "Your second song uses three chords you already know (D-Em-G) plus one new one (A7). Father John Misty's Real Love Baby is 102 BPM with hammer-on embellishments and a warm, upbeat energy. A7 adds a bluesy tension that pulls you back to D — it's the chord that makes the loop feel alive instead of static. Listen to the recording twice before playing — first time let the energy wash over you, second time ghost the chord changes with your fretting hand.",
      setup: "Guitar. Metronome at 80 BPM (slower than the 102 BPM original). Build up.",
      steps: [
        { text: "Play the progression: D (4 beats) → Em (4 beats) → G (4 beats) → A7 (4 beats). All downstrokes first. A7 is a new chord: index on D string fret 2, middle on B string fret 2. Strum strings 5 through 1. It's like a C shape but shifted — only two fingers.", why: "A7 introduces a two-finger chord that creates bluesy tension pulling back to D. Every song you learn should start with the question: 'Which fingers stay planted between these chords?' This becomes automatic over time." },
        { text: "Add constant arm motion. This time, try a slightly different pattern than Dope & Smoke: D-DU-UDU — a continuous 16th-note pendulum motion where your arm never stops. The first beat gets a strong downstroke, then the pattern flows in a rolling down-up-up-down-up cycle. This gives a more driving, upbeat feel that matches Father John Misty's energy.", why: "Different strum patterns over the same arm motion demonstrates the principle: the engine (constant arm motion) is always the same — only the pattern of hits and misses changes. Two songs, two feels, same fundamental technique." },
        { text: "Add a hammer-on embellishment to the D chord: fret D but leave the high E string open, then strum and quickly hammer your middle finger onto the high E string 2nd fret. You'll hear the high E jump from open (E) to fretted (F#) — a quick melodic flick within the chord. This ornament adds a sparkle that's characteristic of the song.", why: "Hammer-ons add movement and life to static chord strumming. This open-to-fretted hammer-on on the high E string is one of the most common guitar embellishments — it appears in thousands of folk, pop, and rock songs. Learning it on D gives you a tool you'll use on other chords too." },
        { text: "Play 8 full cycles at 80 BPM with the strum pattern and hammer-on embellishment. Then try 90 BPM. Then 102 (the real tempo). Same rule as Dope & Smoke — only speed up when the current tempo feels effortless.", why: "Building up speed in 10-BPM increments prevents the common trap of jumping to performance tempo too soon. Each speed increase should feel like a small, manageable step, not a leap." },
        { text: "Now play Dope & Smoke (Am-D) for 4 cycles, then immediately switch to Real Love Baby (D-Em-G-A7) for 4 cycles. Feel how the D chord appears in both but creates different musical worlds depending on context — after Am it feels warm, after Em it feels bright. That's the power of chord order and feel.", why: "Switching between songs using overlapping chords teaches harmonic context — D after Am feels different from D after G. You're learning that chords aren't just shapes; they're characters in a story, and their meaning changes depending on what comes before and after." }
      ],
      feel: "This should feel brighter and more upbeat than Dope & Smoke — like driving down the coast with the windows open. Where DOPE LEMON is a sunset porch, Father John Misty is a sunny afternoon. The hammer-on embellishment should add a little sparkle, like sunlight glinting off the ocean.",
      wrong: "If the hammer-on sounds weak or doesn't ring, you're not hammering hard enough. The fretting finger should snap down like a tiny hammer — firm and fast. If it mutes the string, make sure your other fingers aren't shifting when you hammer on. If the strum pattern sounds identical to Dope & Smoke, focus on the accent placement — beat 1 accent for this song, beats 2 and 4 for DOPE LEMON.",
      sarah: "Gene, Father John Misty is a master of simple chords with emotional delivery — Real Love Baby is D-Em-G-A7 and it's one of the most joyful songs in your rotation. The A7 is the secret — it creates that bluesy pull back to D that makes you want to keep looping. FJM's trick is conviction — he plays four chords like he means every single one. That conviction comes from the strum feel and the hammer-on embellishments, not from chord complexity.",
      levelUp: "Can play D-Em-G-A7 (Real Love Baby) at 100 BPM with constant arm motion, hammer-on embellishment on D, and smooth transitions. Can switch between this song and Dope & Smoke without stopping."
    },

    // ─── FIRST IMPROV ───

    {
      id: "gs-1-12",
      time: 9,
      title: "First Improv — Call & Response Over a Backing Track",
      type: "guitar",
      drone: { root: "A", octave: 2, texture: "analog" },
      fretboard: { scale: "am-pentatonic", position: 1 },
      metronome: 80,
      tracks: [{ name: "Deep Soul Groove 80", src: "/deep-soul-groove-80.mp3" }, { name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      recorder: true,
      what: "Your first real improvisation. Play the backing track. Play a short phrase (2-4 notes from the Am pentatonic or blues scale). Then STOP and listen — let the backing track 'answer.' Then play another phrase. This call-and-response approach means you're making music with the track, not just playing over it. You're having a conversation.",
      setup: "Guitar. Backing track playing. Drone on A optional. Recorder on.",
      steps: [
        { text: "Start the backing track (Deep Soul Groove 80 BPM). Listen for 8 beats without playing — just absorb the groove, feel the tempo, find the pulse in your body. Nod your head, tap your foot. Don't touch the guitar until the groove is in your body.", why: "Listening before playing is the most underrated musical skill. Professional musicians listen for the groove before they enter. Jumping in immediately leads to playing AT the track instead of WITH it. 8 beats of listening transforms your first phrase from random notes into a musical response." },
        { text: "Before you play your first phrase, try this: hear a note in your head. Any note from the Am pentatonic. Can you imagine what it sounds like before your fingers touch the string? Hum it quietly. Now feel where that note lives on the fretboard — your hand knows the distance, the string, the fret. Choose what it will express: is it a question? An answer? A sigh? Then play it. That note was YOUR choice — heard, felt, chosen, then played.", why: "This is the seed of the hear-feel-choose-play cycle. Hearing the note internally (audiation), feeling where it lives on the fretboard (proprioceptive mapping), choosing its expression (intention), and then playing it — this four-step chain is how every great improviser works. Gordon's research shows musicians who hear before they play develop 3x faster than those who let fingers lead. You don't need to do this for every note yet — just starting with ONE intentional note sets the right foundation." },
        { text: "Play a 2-note phrase from the Am pentatonic — just two notes, any two. Then STOP. Leave 4 beats of silence. Let the backing track fill the space. Then play another 2-note phrase. Short bursts with lots of space.", why: "Space is the beginner improviser's best friend. Two notes with space sounds intentional and musical. Twelve notes crammed together sounds nervous and scattered. Every guitarist you admire — Mark Speer, Tommy Guerrero — leaves more silence than sound." },
        { text: "Gradually expand: try 3-note phrases, then 4-note phrases. But always leave at least 2 beats of silence between phrases. The silence is not 'dead air' — it's part of the music. The backing track fills it.", why: "Building phrase length gradually prevents the common trap of 'note diarrhea' — playing everything you know as fast as possible. Your phrases should be like sentences in a conversation: say something meaningful, then breathe." },
        { text: "Try using the blue note (Eb) in one of your phrases. Bend into it from D — feel the string resistance build under your fingertip as the pitch rises. Hold the tension for a beat. Notice how your body tenses slightly with the dissonance, the guitar's vibration against your chest becoming restless. Then resolve to E — and feel the release, both in the string and in your body.", why: "Introducing the blue note into improvisation is where the blues scale earns its name. The tension-resolution cycle gives your phrases emotional arc — they go somewhere instead of just existing. The physical tension you feel in your fingers and body mirrors the musical tension the listener hears. This is the difference between playing notes and telling a story." },
        { text: "Record a 2-minute improvisation. Rules: Am pentatonic or blues scale only. Maximum 4-note phrases. Minimum 2 beats of silence between phrases. When you listen back, notice which phrases you like best — those are YOUR voice emerging.", why: "Recording and self-listening closes the feedback loop. You'll hear things you didn't notice while playing — a phrase that grooved, a moment that dragged, a blue note that hit perfectly. This is how your musical voice develops: play, listen, learn, repeat." }
      ],
      feel: "This should feel like a conversation with a friend who happens to be a backing track. You say something short, they respond with groove, you reply. Relaxed, unhurried, with plenty of comfortable silence. If it feels frantic or you feel pressure to 'fill the space,' play fewer notes. The space IS the music. Before you play your first note, ask yourself: what will I listen for? After the 2 minutes: what did I notice about my phrasing?",
      wrong: "The number one mistake is playing too many notes with no space. If you're playing constantly without breaks, you're monologuing, not conversing. Force yourself to count 4 beats of silence between every phrase. The second mistake is ignoring the backing track — your phrases should respond to the groove, not ignore it. If your notes sound random, simplify: use only A and E (root and 5th) until the rhythm locks in, then add more notes.",
      sarah: "Gene, THIS is what it's all about. You're improvising on day one — not after months of scale drills and theory homework. Mark Speer from Khruangbin improvises like this: short phrases, ocean of space, every note intentional. He plays maybe 30% of the time and leaves 70% silence. That's not empty playing — that's sophisticated restraint. Tommy Guerrero does the same thing with his finger-picked instrumentals. Your first improv doesn't need to be virtuosic. It just needs to groove and breathe.",
      levelUp: "Can improvise over a backing track for 2 minutes using Am pentatonic/blues scale, playing phrases of 2-4 notes with at least 2 beats of silence between each phrase. The phrases respond to the groove rather than ignoring it."
    },

    // ─── SELF-CHECK ───

    {
      id: "gs-1-13",
      time: 6,
      title: "Self-Check: Can You Sing It?",
      type: "guitar",
      recorder: true,
      metronome: 90,
      chordVoicings: { chords: ["Am", "D", "Am7", "D7", "Em"] },
      tracks: [{ name: "Groove Beat 90", src: "/groove-beat-90.mp3" }],
      what: "The ultimate test of musical internalization: can you sing what you play? Hum the Am pentatonic ascending. Sing the chord roots of Dope & Smoke (A... D...) while strumming. If you can sing it, you've truly learned it — it's in your ear, not just in your fingers. This is audiation — the ability to hear music internally.",
      setup: "Guitar. Recorder on. Metronome at 90 BPM.",
      steps: [
        { text: "Without the guitar, hum the Am pentatonic ascending: A-C-D-E-G-A. Can you hear it in your head? Can your voice reproduce it? Don't worry about perfect pitch — relative pitch (the intervals between notes) is what matters.", why: "Singing the scale without the guitar proves it's in your ear, not just in your muscle memory. Gordon's audiation research shows that musicians who can sing what they play learn 3x faster than those who rely on finger patterns alone." },
        { text: "Now play the scale on guitar and sing along — match each note with your voice as you fret it. If your voice wobbles on a note, play it again and let your ear recalibrate. The voice follows the guitar until the voice can lead.", why: "Unison singing with the guitar calibrates the connection between your ear and your fingers. When voice and guitar play the same note, you feel a physical lock — a resonance that confirms you're hearing correctly." },
        { text: "Strum Dope & Smoke (Am-D) and sing the root note of each chord: sing 'A' while strumming Am, 'D' while strumming D. Alternate back and forth. Keep the strum pattern going while you sing — this is multi-tasking.", why: "Singing chord roots while strumming is the bridge between guitarist and singer-songwriter. If you can strum and sing the root, you can eventually strum and sing a melody. This dual-task is harder than it sounds — and it's the fundamental skill of every singer-songwriter." },
        { text: "Play a short pentatonic phrase on guitar (3-4 notes). Now put the guitar down and sing the same phrase from memory. Did your voice match? Try 3 different phrases. The goal is to hear the phrase internally before singing it.", why: "Playing a phrase, then singing it from memory, is the purest test of audiation. If you can do this, you can eventually hear phrases in your head BEFORE playing them — which is how improvisation becomes intentional instead of random." },
        { text: "Final check: record yourself doing all of the above. Compare to your Level 1 baseline recording. You've been at this for a while now — is the difference audible? It should be.", why: "Periodic comparison to your baseline is how you track real progress. Small daily improvements are invisible in the moment but dramatic over weeks. The recording doesn't lie." }
      ],
      feel: "This should feel like a graduation exam — a chance to prove to yourself that you've internalized everything in Level 1. It should feel slightly challenging but achievable. If you can sing the pentatonic and the chord roots while strumming, you're ready for Level 2.",
      wrong: "If you can't hum the pentatonic without the guitar, spend more time with the drone — play each note, sing it, hold it, feel it. If singing while strumming breaks your strum pattern, simplify: strum all downstrokes while singing. The strum can be simple; the singing is what matters. If nothing sounds familiar when you try to sing it, you may need more time with Level 1 — and that's completely fine. End this session on something clean — even if it's just strumming an open Am chord that rings beautifully. Close with confidence — your last sound is the one that sticks.",
      sarah: "Gene, this exercise is the bridge between guitar player and musician. Every artist you love — from Father John Misty's confessional folk to DOPE LEMON's hazy grooves to The Polarity's upbeat indie — they can all sing what they play. It's the foundation of songwriting. When your ear and your fingers speak the same language, you stop being someone who plays guitar and start being someone who makes music. That's Level 1 complete.",
      levelUp: "Can hum the Am pentatonic scale without the guitar. Can sing chord roots (A, D) while strumming the Dope & Smoke progression at 90 BPM. Can play a 3-note guitar phrase, put the guitar down, and sing it back accurately."
    }
  ]
};
